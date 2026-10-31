// =========================================================================
// IRREGULAR INSTALLMENT PAYMENT SCRIPT
// BANKING STANDARD IMPLEMENTATION - ALL TEXT & ALERTS IN UPPERCASE
// =========================================================================

let currentLoanData = null;
let currentPaymentsData = [];
let lastPaymentReceipt = null;
let companyDetails = null;

$(document).ready(function() {
	loadCompanyDetails();
	initPaymentDate();
	populateLoanDropdowns();
	bindEventHandlers();
});

function loadCompanyDetails() {
	$.ajax({
		url: "api/preference/getCompanyDetails",
		type: "GET",
		dataType: "json",
		success: function(resp) {
			if (resp && resp.status === "OK" && resp.data) {
				companyDetails = resp.data;
			} else if (resp && resp.companyName) {
				companyDetails = resp;
			}
		},
		error: function(err) {
			console.warn("COULD NOT LOAD COMPANY DETAILS", err);
		}
	});
}

function initPaymentDate() {
	const today = new Date().toISOString().split('T')[0];
	$('#date1').val(today);
	$('#duedate2').val(today);
}

function populateLoanDropdowns() {
	$.ajax({
		url: 'api/loanmanegment/getApprovedLoanIds',
		type: 'GET',
		dataType: 'json',
		success: function(response) {
			const $dropdown1 = $('#loanId');
			const $dropdown2 = $("select[name='loanId & name']");

			$dropdown1.empty().append('<option value="" disabled selected>SELECT LOAN ID</option>');
			$dropdown2.empty().append('<option value="" disabled selected>SELECT LOAN ID</option>');

			if (response && response.status === 'OK' && Array.isArray(response.data)) {
				response.data.forEach(function(id) {
					$dropdown1.append(`<option value="${id}">${id}</option>`);
					$dropdown2.append(`<option value="${id}">${id}</option>`);
				});
			} else {
				console.warn("NO APPROVED LOAN IDS FOUND.");
			}
		},
		error: function(xhr) {
			console.error("ERROR FETCHING LOAN IDS:", xhr.responseText);
		}
	});
}

function bindEventHandlers() {
	// Sync duplicate dropdown if user changes either
	$('#loanId').on('change', function() {
		const val = $(this).val();
		$("select[name='loanId & name']").val(val);
		if (val) loadLoanDetails(val);
	});

	$("select[name='loanId & name']").on('change', function() {
		const val = $(this).val();
		$('#loanId').val(val);
		if (val) loadLoanDetails(val);
	});

	// Recalculate Net Amount when Payment Amount changes
	$('#amountPayment2').on('input change', function() {
		const payVal = parseFloat($(this).val()) || 0;
		$('#amountNet').val(payVal > 0 ? payVal.toFixed(2) : '0.00');
	});

	// Save Button Click
	$('#saveBtn').on('click', function(e) {
		e.preventDefault();
		processIrregularPayment();
	});

	// Update Button Click (alias for re-save/re-verify)
	$('#updateBtn').on('click', function(e) {
		e.preventDefault();
		const loanId = $('#loanId').val();
		if (!loanId) {
			alert("PLEASE SELECT A LOAN ID TO UPDATE DETAILS.");
			return;
		}
		loadLoanDetails(loanId);
		alert("LOAN DETAILS REFRESHED SUCCESSFULLY!");
	});

	// Print Button Click
	$('#printBtn').on('click', function(e) {
		e.preventDefault();
		printPaymentReceipt();
	});
}

function loadLoanDetails(loanId) {
	$.ajax({
		url: 'api/loanmanegment/getLoanById',
		type: 'GET',
		data: { loanId: loanId },
		dataType: 'json',
		success: function(response) {
			if (response && response.status === 'OK' && response.data) {
				const d = response.data;
				currentLoanData = d;

				$('#loanDate').val(d.loanDate || '');
				$('#planName').val((d.loanPlanName || d.typeOfLoan || '').toUpperCase());
				$('#typeIntrest').val((d.interestType || '').toUpperCase());
				$('#fullNume').val(((d.memberId ? d.memberId + " - " : "") + (d.memberName || "")).toUpperCase());
				$('#duration').val((d.loanTerm ? d.loanTerm + " MONTHS" : '').toUpperCase());
				$('#paymentEmi').val(d.emiPayment ? parseFloat(d.emiPayment).toFixed(2) : '0.00');
				$('#memmberName').val((d.guarantorIdentity || d.relativeDetails || d.coApplicantIdentity || '-').toUpperCase());
				$('#laonCategory').val((d.typeOfLoan || '-').toUpperCase());
				$('#totalIntrestLoan').val(d.totalinterestofLoan ? parseFloat(d.totalinterestofLoan).toFixed(2) : '0.00');
				$('#contactNo\\.').val(d.contactNo || '-');
				$('#loanAmount2').val(d.loanAmount ? parseFloat(d.loanAmount).toFixed(2) : '0.00');
				$('#principalLoan2').val(d.sanctionedAmount || d.loanAmount ? parseFloat(d.sanctionedAmount || d.loanAmount).toFixed(2) : '0.00');
				$('#branchAddres').val((d.branchName || '-').toUpperCase());
				$('#rateIntrest').val(d.rateOfInterest ? d.rateOfInterest + " %" : '0 %');
				$('#totalLoanPayable').val(d.totalPayableofLoan ? parseFloat(d.totalPayableofLoan).toFixed(2) : '0.00');

				$('#advisorId').val((d.financialConsultantId || '-').toUpperCase());
				$('#fullnameAdvisor').val((d.financialConsultantName || '-').toUpperCase());

				// Now fetch payment history to calculate dues
				calculateInstallmentDues(loanId, d);
			} else {
				alert("LOAN DATA NOT FOUND FOR THIS LOAN ID.");
			}
		},
		error: function(xhr) {
			alert("ERROR FETCHING LOAN DETAILS: " + (xhr.responseText ? xhr.responseText.toUpperCase() : "SERVER ERROR"));
		}
	});
}

function calculateInstallmentDues(loanId, loanData) {
	$.ajax({
		url: 'api/loanmanegment/fetchLoanPaymentsByLoanId',
		type: 'GET',
		data: { loanId: loanId },
		dataType: 'json',
		success: function(res) {
			let payments = (res && Array.isArray(res.data)) ? res.data : [];
			currentPaymentsData = payments;

			const sanctioned = parseFloat(loanData.sanctionedAmount || loanData.loanAmount) || 0;
			const totalPayable = parseFloat(loanData.totalPayableofLoan) || sanctioned;
			const emi = parseFloat(loanData.emiPayment) || 0;

			let totalPaidSoFar = 0;
			payments.forEach(function(p) {
				const amt = parseFloat(p.paymentAmount) || 0;
				totalPaidSoFar += amt;
			});

			const balanceDue = Math.max(0, totalPayable - totalPaidSoFar);
			const rate = parseFloat(loanData.rateOfInterest) || 0;

			// Rough monthly interest allocation
			const monthlyInterest = (sanctioned * (rate / 100)) / 12;
			const principalComponent = Math.max(0, emi - monthlyInterest);

			const interestDue = Math.min(balanceDue, monthlyInterest);
			const principalDue = Math.min(balanceDue - interestDue, principalComponent);

			$('#dueIntrest2').val(interestDue.toFixed(2));
			$('#duePrinciple2').val(principalDue.toFixed(2));
			$('#dueTotalAmount').val(balanceDue.toFixed(2));

			// Default payment amount to EMI or remaining balance
			const defaultPayment = (balanceDue < emi && balanceDue > 0) ? balanceDue : emi;
			$('#amountPayment2').val(defaultPayment.toFixed(2));
			$('#amountNet').val(defaultPayment.toFixed(2));
		},
		error: function() {
			const emi = parseFloat(loanData.emiPayment) || 0;
			$('#amountPayment2').val(emi.toFixed(2));
			$('#amountNet').val(emi.toFixed(2));
		}
	});
}

function processIrregularPayment() {
	const loanId = $('#loanId').val();
	if (!loanId) {
		alert("PLEASE SELECT A LOAN ID FIRST.");
		$('#loanId').focus();
		return;
	}

	const paymentAmount = parseFloat($('#amountPayment2').val()) || 0;
	if (paymentAmount <= 0) {
		alert("PLEASE ENTER A VALID PAYMENT AMOUNT GREATER THAN ZERO.");
		$('#amountPayment2').focus();
		return;
	}

	const paymentDate = $('#date1').val();
	if (!paymentDate) {
		alert("PLEASE SELECT REGISTRATION / PAYMENT DATE.");
		$('#date1').focus();
		return;
	}

	const paymentSource = $('#paymentSource').val();
	if (!paymentSource) {
		alert("PLEASE SELECT PAYMENT SOURCE.");
		$('#paymentSource').focus();
		return;
	}

	const remarks = ($('#sectionRemark').val() || "IRREGULAR INSTALLMENT PAYMENT").toUpperCase();

	const reqData = {
		loanId: loanId,
		paymentMode: paymentSource,
		paymentDate: paymentDate,
		paymentAmount: paymentAmount,
		penaltyAmount: "0.00",
		remarks: remarks
	};

	$('#saveBtn').prop('disabled', true).text('PROCESSING...');

	$.ajax({
		url: 'api/loanmanegment/payRegularInstallment',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(reqData),
		success: function(response) {
			$('#saveBtn').prop('disabled', false).text('SAVE');

			if (response && (response.status === 'OK' || response.status === 'CREATED')) {
				const msg = (response.message || "IRREGULAR INSTALLMENT PAYMENT RECORDED SUCCESSFULLY!").toUpperCase();
				alert("✓ " + msg);

				// Prepare last receipt
				lastPaymentReceipt = {
					receiptNo: "REC-" + Date.now().toString().slice(-6),
					loanId: loanId,
					customerName: ($('#fullNume').val() || "-").toUpperCase(),
					paymentDate: paymentDate,
					paymentMode: paymentSource.toUpperCase(),
					paymentAmount: paymentAmount.toFixed(2),
					remarks: remarks,
					advisor: ($('#fullnameAdvisor').val() || "-").toUpperCase()
				};

				generateReceiptHtml(lastPaymentReceipt);
				$('#receiptArea').show();
			} else {
				const errMsg = (response.message || "FAILED TO PROCESS PAYMENT").toUpperCase();
				alert("❌ " + errMsg);
			}
		},
		error: function(xhr) {
			$('#saveBtn').prop('disabled', false).text('SAVE');
			let errMsg = "FAILED TO PROCESS PAYMENT";
			if (xhr.responseJSON && xhr.responseJSON.message) {
				errMsg = xhr.responseJSON.message;
			} else if (xhr.responseText) {
				try {
					const parsed = JSON.parse(xhr.responseText);
					if (parsed.message) errMsg = parsed.message;
				} catch (e) {
					errMsg = xhr.responseText;
				}
			}
			alert("❌ ERROR: " + errMsg.toUpperCase());
		}
	});
}

function generateReceiptHtml(r) {
	const html = `
        <div class="card p-4 border shadow-sm" style="background: #ffffff; border-radius: 8px;">
            <div class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                <h5 class="fw-bold mb-0 text-success"><i class="bi bi-check-circle-fill me-2"></i>PAYMENT RECEIPT VOUCHER</h5>
                <button type="button" onclick="printPaymentReceipt()" class="btn btn-outline-primary btn-sm fw-bold">
                    <i class="bi bi-printer me-1"></i> PRINT RECEIPT
                </button>
            </div>
            <div class="row g-2 mb-3" style="font-size: 13px;">
                <div class="col-md-6"><strong>RECEIPT NO:</strong> <span>${r.receiptNo}</span></div>
                <div class="col-md-6 text-md-end"><strong>PAYMENT DATE:</strong> <span>${r.paymentDate}</span></div>
                <div class="col-md-6"><strong>LOAN ID:</strong> <span>${r.loanId}</span></div>
                <div class="col-md-6 text-md-end"><strong>CUSTOMER:</strong> <span>${r.customerName}</span></div>
                <div class="col-md-6"><strong>PAYMENT SOURCE:</strong> <span>${r.paymentMode}</span></div>
                <div class="col-md-6 text-md-end"><strong>ADVISOR:</strong> <span>${r.advisor}</span></div>
            </div>
            <table class="table table-bordered table-sm mb-3" style="font-size: 13px;">
                <thead class="table-light">
                    <tr>
                        <th>DESCRIPTION</th>
                        <th class="text-end">AMOUNT (₹)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>IRREGULAR LOAN REPAYMENT / INSTALLMENT</td>
                        <td class="text-end fw-bold text-success">₹ ${r.paymentAmount}</td>
                    </tr>
                    <tr class="table-secondary fw-bold">
                        <td>TOTAL NET RECEIVED</td>
                        <td class="text-end">₹ ${r.paymentAmount}</td>
                    </tr>
                </tbody>
            </table>
            <div class="d-flex justify-content-between pt-2 border-top text-muted small">
                <span>STATUS: <strong>PAID & VERIFIED</strong></span>
                <span>AUTHORIZED BANK SIGNATORY</span>
            </div>
        </div>
    `;
	$('#receiptArea').html(html);
}

function printPaymentReceipt() {
	if (!lastPaymentReceipt) {
		const loanId = $('#loanId').val();
		const amt = $('#amountPayment2').val();
		if (!loanId || !amt) {
			alert("PLEASE EXECUTE PAYMENT OR SELECT A VALID LOAN RECORD TO PRINT.");
			return;
		}
		lastPaymentReceipt = {
			receiptNo: "REC-" + Date.now().toString().slice(-6),
			loanId: loanId,
			customerName: ($('#fullNume').val() || "-").toUpperCase(),
			paymentDate: $('#date1').val() || new Date().toISOString().split('T')[0],
			paymentMode: ($('#paymentSource').val() || "CASH").toUpperCase(),
			paymentAmount: parseFloat(amt || 0).toFixed(2),
			remarks: ($('#sectionRemark').val() || "IRREGULAR INSTALLMENT PAYMENT").toUpperCase(),
			advisor: ($('#fullnameAdvisor').val() || "-").toUpperCase()
		};
		generateReceiptHtml(lastPaymentReceipt);
	}

	const content = document.getElementById("receiptArea").innerHTML;
	const compName = (companyDetails && companyDetails.companyName ? companyDetails.companyName : "CO OPERATIVE SOCIETY LTD NAGPUR").trim().toUpperCase();
	const compAddress = (companyDetails && companyDetails.address ? companyDetails.address : "").trim().toUpperCase();
	const compCin = (companyDetails && companyDetails.cinNo ? "CIN: " + companyDetails.cinNo : "").trim().toUpperCase();
	const compPhone = (companyDetails && companyDetails.helplineNo ? "HELPLINE: " + companyDetails.helplineNo : "").trim().toUpperCase();

	const win = window.open('', '', 'height=650,width=850');
	win.document.write(`
        <html>
        <head>
            <title>PAYMENT RECEIPT</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body { font-family: Arial, sans-serif; padding: 30px; color: #111; }
                button { display: none !important; }
                .table th, .table td { padding: 8px; font-size: 13px; }
            </style>
        </head>
        <body>
            <div class="text-center mb-4">
                <h3 class="fw-bold m-0 text-primary">${compName}</h3>
                ${compAddress ? `<p class="text-muted small mb-0">${compAddress}</p>` : ''}
                ${(compCin || compPhone) ? `<small class="text-muted">${[compCin, compPhone].filter(Boolean).join(' | ')}</small>` : ''}
                <div class="mt-2"><span class="badge bg-secondary">LOAN REPAYMENT RECEIPT</span></div>
            </div>
            ${content}
        </body>
        </html>
    `);
	win.document.close();
	setTimeout(function() {
		win.print();
	}, 250);
}

