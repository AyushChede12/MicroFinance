// Loan Document Print Management Script (Full End-to-End Implementation)

$(document).ready(function() {
	initLoanIdDropdown();
	initEventHandlers();
});

function initLoanIdDropdown() {
	$.ajax({
		url: "api/loans/printable-loan-ids",
		type: "GET",
		dataType: "json",
		success: function(response) {
			if (response && response.data && Array.isArray(response.data)) {
				const $dropdown = $("#loanId");
				$dropdown.empty();
				$dropdown.append('<option value="" disabled selected>SELECT LOAN ID</option>');

				response.data.forEach(function(id) {
					$dropdown.append(`<option value="${id}">${id}</option>`);
				});
			} else {
				fallbackLoadLoanIds();
			}
		},
		error: function(xhr) {
			console.warn("Could not load printable loan IDs, trying fallback...", xhr);
			fallbackLoadLoanIds();
		}
	});
}

function fallbackLoadLoanIds() {
	$.ajax({
		url: "api/loanmanegment/getStatementLoanId",
		type: "GET",
		dataType: "json",
		success: function(response) {
			if (response && response.data && Array.isArray(response.data)) {
				const $dropdown = $("#loanId");
				$dropdown.empty();
				$dropdown.append('<option value="" disabled selected>SELECT LOAN ID</option>');
				response.data.forEach(function(id) {
					$dropdown.append(`<option value="${id}">${id}</option>`);
				});
			}
		}
	});
}

function initEventHandlers() {
	// 1. On Loan ID Selection
	$("#loanId").on("change", function() {
		const selectedLoanId = $(this).val();
		if (!selectedLoanId) return;

		$("#previewDocBtn").prop("disabled", true);
		$("#generateDocBtn").prop("disabled", true);
		$("#loanDocument").prop("disabled", true).html('<option value="" disabled selected>Loading available documents...</option>');

		loadLoanDetails(selectedLoanId);
		loadAvailableDocuments(selectedLoanId);
		loadDocumentLogs(selectedLoanId);
	});

	// 2. On Document Type Selection
	$("#loanDocument").on("change", function() {
		const docType = $(this).val();
		if (docType) {
			// Enable both Preview and Generate Doc buttons immediately!
			$("#previewDocBtn").prop("disabled", false);
			$("#generateDocBtn").prop("disabled", false);
		} else {
			$("#previewDocBtn").prop("disabled", true);
			$("#generateDocBtn").prop("disabled", true);
		}
	});

	// 3. On Preview Button Click
	$("#previewDocBtn").on("click", function(e) {
		e.preventDefault();
		const loanId = $("#loanId").val();
		const docType = $("#loanDocument").val();

		if (!loanId) {
			alert("Please select a Loan ID first.");
			return;
		}
		if (!docType) {
			alert("Please select a Document Type to preview.");
			return;
		}

		openDocumentPreview(loanId, docType);
	});

	// 4. On Generate Doc Button Click (Main or inside Modal)
	$("#generateDocBtn, #modalGenerateBtn").on("click", function(e) {
		e.preventDefault();
		const loanId = $("#loanId").val();
		const docType = $("#loanDocument").val();

		if (!loanId) {
			alert("Please select a Loan ID first.");
			return;
		}
		if (!docType) {
			alert("Please select a Document Type to generate.");
			return;
		}

		generateAndDownloadPdf(loanId, docType);
	});

	// 5. Reset Button
	$("#resetBtn").on("click", function(e) {
		e.preventDefault();
		$("#loanDocForm")[0].reset();
		$("#loanDocument").prop("disabled", true).html('<option value="" disabled selected>-- Select Loan ID First --</option>');
		$("#previewDocBtn").prop("disabled", true);
		$("#generateDocBtn").prop("disabled", true);
		$("#docLogsBody").html('<tr><td colspan="6" class="text-center py-4 text-muted">Please select a Loan ID to view generated document history.</td></tr>');
		$("#auditCountBadge").text("0 Documents");
	});
}

function loadLoanDetails(loanId) {
	$.ajax({
		url: "api/loans/" + encodeURIComponent(loanId) + "/details",
		type: "GET",
		dataType: "json",
		success: function(response) {
			if (response && response.data) {
				const d = response.data;
				$("#loanDate").val(d.loanDate || "--");
				$("#loanPlanName").val(d.loanPlanName || "--");
				$("#typeOfLoan").val(d.typeOfLoan || "--");
				$("#memberIdAndName").val((d.memberId ? d.memberId + " - " : "") + (d.memberName || "--"));
				$("#relativeDetails").val(d.relativeDetails || "--");
				$("#contactNo").val(d.contactNo || "--");
				$("#loanAmount").val(d.loanAmount ? formatCurrency(d.loanAmount) : "--");
				$("#rateOfInterest").val(d.rateOfInterest ? d.rateOfInterest + "% p.a." : "--");
				$("#loanTerm").val(d.loanTerm ? d.loanTerm + " Months" : "--");
				$("#interestType").val(d.interestType || "--");
				$("#loanMode").val(d.loanMode || "--");
				$("#emiPayment").val(d.emiPayment ? formatCurrency(d.emiPayment) : "--");
				$("#loanStatus").val(d.loanStatus || "--");
				$("#approvalDate").val(d.approvalDate || "--");
				$("#netDisbursementAmount").val(d.netDisbursementAmount ? formatCurrency(d.netDisbursementAmount) : "--");

				var gInfo = "--";
				if (d.guarantorIdentity) {
					gInfo = d.guarantorIdentity + (d.guarantorMemberId ? " (" + d.guarantorMemberId + ")" : "");
				} else if (d.coApplicantIdentity) {
					gInfo = "Co-App: " + d.coApplicantIdentity;
				}
				$("#guarantorName").val(gInfo);
			}
		},
		error: function(xhr) {
			console.error("Error fetching loan details:", xhr);
			alert("Error loading loan details: " + (xhr.responseJSON?.message || xhr.statusText));
		}
	});
}

function loadAvailableDocuments(loanId) {
	$.ajax({
		url: "api/loans/" + encodeURIComponent(loanId) + "/available-documents",
		type: "GET",
		dataType: "json",
		success: function(response) {
			const $dropdown = $("#loanDocument");
			$dropdown.empty();
			$dropdown.append('<option value="" disabled selected>SELECT DOCUMENT TO PRINT</option>');

			if (response && response.data && Array.isArray(response.data)) {
				response.data.forEach(function(doc) {
					if (doc.available) {
						$dropdown.append(`<option value="${doc.docType}">✓ ${doc.name}</option>`);
					} else {
						$dropdown.append(`<option value="${doc.docType}" disabled style="color:#888;">✕ ${doc.name} (Gated: ${doc.reason})</option>`);
					}
				});
				$dropdown.prop("disabled", false);
			}
		},
		error: function(xhr) {
			console.error("Error loading available documents:", xhr);
			$("#loanDocument").html('<option value="" disabled selected>Error loading documents</option>');
		}
	});
}

function loadDocumentLogs(loanId) {
	$.ajax({
		url: "api/loans/" + encodeURIComponent(loanId) + "/document-logs",
		type: "GET",
		dataType: "json",
		success: function(response) {
			const $tbody = $("#docLogsBody");
			$tbody.empty();

			if (response && response.data && response.data.length > 0) {
				$("#auditCountBadge").text(response.data.length + " Documents");
				response.data.forEach(function(log, idx) {
					const row = `
                        <tr>
                            <td class="ps-3 font-weight-bold text-muted">${idx + 1}</td>
                            <td><i class="bi bi-calendar3 mr-1 text-muted"></i> ${log.generatedAt || '--'}</td>
                            <td><span class="badge badge-light border text-primary">${log.documentName || log.documentType}</span></td>
                            <td><i class="bi bi-person mr-1 text-muted"></i> ${log.generatedByUserId || 'ADMIN'}</td>
                            <td><code>${log.fileReference || '--'}</code></td>
                            <td class="text-center">
                                <button type="button" class="btn btn-sm btn-outline-primary py-0 px-2" 
                                    onclick="generateAndDownloadPdf('${log.loanId}', '${log.documentType}')" title="Re-download PDF">
                                    <i class="bi bi-download mr-1"></i> Download
                                </button>
                            </td>
                        </tr>
                    `;
					$tbody.append(row);
				});
			} else {
				$("#auditCountBadge").text("0 Documents");
				$tbody.html('<tr><td colspan="6" class="text-center py-4 text-muted">No documents have been generated yet for this loan.</td></tr>');
			}
		},
		error: function(xhr) {
			console.error("Error fetching document logs:", xhr);
		}
	});
}

function showModalCompat() {
	if (typeof $ !== 'undefined' && $('#docPreviewModal').modal) {
		$('#docPreviewModal').modal('show');
	} else if (window.bootstrap && bootstrap.Modal) {
		var m = bootstrap.Modal.getOrCreateInstance(document.getElementById('docPreviewModal'));
		m.show();
	} else {
		$('#docPreviewModal').show().addClass('show').css('display', 'block');
	}
}

function hideModalCompat() {
	if (typeof $ !== 'undefined' && $('#docPreviewModal').modal) {
		$('#docPreviewModal').modal('hide');
	} else if (window.bootstrap && bootstrap.Modal) {
		var m = bootstrap.Modal.getInstance(document.getElementById('docPreviewModal'));
		if (m) m.hide();
	} else {
		$('#docPreviewModal').hide().removeClass('show').css('display', 'none');
	}
}

function openDocumentPreview(loanId, docType) {
	const previewUrl = "api/loans/" + encodeURIComponent(loanId) + "/documents/" + encodeURIComponent(docType) + "/preview";
	const $container = $("#previewContainer");

	$container.html(`
        <div class="text-center p-5">
            <div class="spinner-border text-primary" role="status" style="width: 2.5rem; height: 2.5rem;"></div>
            <p class="mt-3 text-muted">Rendering document preview...</p>
        </div>
    `);

	// Show modal safely for Bootstrap 4 and Bootstrap 5
	showModalCompat();

	$.ajax({
		url: previewUrl,
		type: "GET",
		dataType: "html",
		success: function(htmlContent) {
			$container.html(htmlContent);
			$("#generateDocBtn").prop("disabled", false);
		},
		error: function(xhr) {
			$container.html(`
                <div class="alert alert-danger m-4">
                    <h5 class="font-weight-bold"><i class="bi bi-exclamation-triangle-fill mr-2"></i> Preview Error</h5>
                    <p>${xhr.responseText || "Unable to render document preview."}</p>
                </div>
            `);
		}
	});
}

function generateAndDownloadPdf(loanId, docType) {
	const $btn = $("#generateDocBtn");
	const $spinner = $("#generateSpinner");
	const $icon = $("#generateIcon");

	$btn.prop("disabled", true);
	$spinner.removeClass("d-none");
	$icon.addClass("d-none");

	const generateUrl = "api/loans/" + encodeURIComponent(loanId) + "/documents/" + encodeURIComponent(docType) + "/generate";

	fetch(generateUrl, {
		method: "POST"
	})
		.then(function(response) {
			if (!response.ok) {
				return response.text().then(function(text) {
					throw new Error(text || "Failed to generate document");
				});
			}
			return response.blob();
		})
		.then(function(blob) {
			// Create download link
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.style.display = "none";
			a.href = url;
			a.download = docType + "_" + loanId + ".pdf";
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			a.remove();

			// Close modal if open
			hideModalCompat();

			// Refresh generation logs
			loadDocumentLogs(loanId);

			// Feedback alert
			showToastAlert("PDF document generated and downloaded successfully!", "success");
		})
		.catch(function(err) {
			console.error("PDF generation failed:", err);
			alert("Error generating document: " + err.message);
		})
		.finally(function() {
			$spinner.addClass("d-none");
			$icon.removeClass("d-none");
			$btn.prop("disabled", false);
		});
}

function formatCurrency(val) {
	const num = Number(val) || 0;
	return '₹ ' + num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function showToastAlert(msg, type) {
	const alertDiv = $(`
        <div class="alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show shadow position-fixed" 
             style="top: 20px; right: 20px; z-index: 99999; min-width: 300px;" role="alert">
            <i class="bi bi-check-circle-fill mr-2"></i> ${msg}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `);
	$("body").append(alertDiv);
	setTimeout(function() {
		alertDiv.alert('close');
	}, 4000);
}