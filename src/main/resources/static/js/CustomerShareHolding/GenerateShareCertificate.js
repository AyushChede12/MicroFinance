$('html, body').animate({
	scrollTop: $("#certificateSection").offset().top
}, 500);

$(document).ready(function() {
	// 1. Load dropdown data on page load
	$.ajax({
		url: "api/customershareholdingcontroller/getAllTransferShare",
		type: "GET",
		success: function(response) {
			var dropdown = $('#referralCodeEntry');
			dropdown.empty();
			dropdown.append('<option value="">SELECT</option>');

			if (response.status === "OK" && response.data) {
				$.each(response.data, function(index, customer) {
					dropdown.append('<option value="' + customer.findByCode + '">' + customer.findByCode + " - " + customer.customerName + '</option>'
					);
				});
			} else {
				dropdown.append('<option value="">NO CUSTOMERS FOUND</option>');
			}
		},
		error: function(error) {
			console.error("DROPDOWN LOAD ERROR:", error);
			alert("ERROR LOADING REFERRAL CODES.");
		}
	});
});


// 2. Fetch and display table data on dropdown change
$('#referralCodeEntry').on('change', function() {
	var selectedCode = $(this).val();

	if (selectedCode === "") {
		alert("PLEASE SELECT A REFERRAL CODE.");
		return;
	}

	$.ajax({
		type: "POST",
		url: "api/customershareholdingcontroller/fetchByCertificateNo",
		data: { findByCode: selectedCode },
		success: function(response) {
			if (response.status === "FOUND" && response.data) {
				var tableBody = "";
				$.each(response.data, function(index, share) {
					tableBody += `
                        <tr data-model='${JSON.stringify(share)}'>
                            <td><input type="checkbox" value="${index}" /></td>
                            <td>${index + 1}</td>
                            <td>${share.findByCode || ''}</td>
                            <td>${share.customerName || ''}</td>
                            <td>${share.balanceShares || ''}</td>
                            <td>${share.noOfShare || ''}</td>
                            <td>${share.certificateNo || ''}</td>
                        </tr>`;
				});
				$('.datatable tbody').html(tableBody);
			} else {
				$('.datatable tbody').html('');
				alert("NO SHARE DATA FOUND FOR THE SELECTED REFERRAL CODE.");
			}
		},
		error: function(xhr) {
			console.error("FETCH ERROR:", xhr);
			alert("ERROR FETCHING SHARE DATA.");
		}
	});
});


// print button
$('#printCertificateBtn').on('click', function() {
	var selectedCheckbox = $('.datatable tbody input[type="checkbox"]:checked');

	if (selectedCheckbox.length === 0) {
		alert("PLEASE SELECT A ROW TO PRINT THE CERTIFICATE.");
		$('#certificateSection').hide();
		return;
	}

	// Get the selected row
	var selectedRow = selectedCheckbox.closest('tr').data('model'); // <-- get model object from row data

	// Fill certificate fields using model object
	$('#customeridandName').text(`${selectedRow.findByCode} - ${selectedRow.customerName}`);
	$('#certificateno').text(selectedRow.certificateNo);
	$('#numberofshare').text(selectedRow.noOfShare);
	$('#amounttransferred').text(selectedRow.amountTransferred);
	$('#branchname').text(selectedRow.branch);
	$('#startdate').text(selectedRow.startDate);
	$('#balanceshare').text(selectedRow.balanceShares);
	$('#shareissuedby').text(selectedRow.shareIssuedBy);
	$('#dataoftransfer').text(selectedRow.dateOfTransfer);
	$('#modeofpayement').text(selectedRow.modeOfPayment);

	$('#certificateSection').show();
});

// print Code
$("#printBtn").on("click", function(e) {
	e.preventDefault();

	// Clone the form
	const $formClone = $("#cetificateId").clone();

	/*// Remove the button row from cloned form
	$formClone.find("#editmember").remove();
	$formClone.find("#printBtn").remove();
	$formClone.find("#updateBtn").remove();
	$formClone.find("#deleteBtn").remove();*/

	// Optional: remove any row that holds the buttons
	$formClone.find(".text-center").each(function() {
		if ($(this).find("button").length > 0) {
			$(this).remove();
		}
	});

	// Open print window
	const printWindow = window.open("", "_blank");

	if (printWindow) {
		printWindow.document.open();
		printWindow.document.write(`
            <html>
            <head>
                <title>PRINT - CUSTOMER FORM</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                    }
                    .formFields {
                        margin-bottom: 15px;
                    }
                    label {
                        font-weight: bold;
                    }
                    input, select, textarea {
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        padding: 5px;
                        width: 100%;
                    }
                    .toggle {
                        pointer-events: none;
                    }
                </style>
            </head>
            <body onload="window.print(); window.close();">
                <h3 class="text-center mb-4">CUSTOMER INFORMATION</h3>
                ${$formClone[0].outerHTML}
            </body>
            </html>
        `);
		printWindow.document.close();
	} else {
		alert("POPUP BLOCKED. PLEASE ALLOW POPUPS FOR THIS WEBSITE.");
	}
});

// Download Code
$("#downloadBtn").on("click", function(e) {
	e.preventDefault();

	// Clone the certificate content
	const $formClone = $("#cetificateId").clone();

	// Optional: remove buttons or specific rows containing buttons
	$formClone.find(".text-center").each(function() {
		if ($(this).find("button").length > 0) {
			$(this).remove();
		}
	});

	// Create the full HTML document
	const htmlContent = `
        <html>
        <head>
            <title>DOWNLOAD - CUSTOMER CERTIFICATE</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                }
                .formFields {
                    margin-bottom: 15px;
                }
                label {
                    font-weight: bold;
                }
                input, select, textarea {
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 5px;
                    width: 100%;
                }
                .toggle {
                    pointer-events: none;
                }
            </style>
        </head>
        <body>
            <h3 class="text-center mb-4">CUSTOMER INFORMATION</h3>
            ${$formClone[0].outerHTML}
        </body>
        </html>
    `;

	// Create a Blob from HTML content
	const blob = new Blob([htmlContent], { type: "text/html" });

	// Create a temporary download link
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = "Customer_Certificate.html"; // Filename for download
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
});