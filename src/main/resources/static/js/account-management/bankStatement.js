$(document).ready(function() {

	// =====================================================
	// INITIAL UI STATE
	// =====================================================

	$("#statementSection").hide();


	// =====================================================
	// LOAD COMPANY DETAILS
	// =====================================================

	loadCompanyDetails();


	// =====================================================
	// LOAD SAVING ACCOUNT NUMBERS
	// =====================================================

	loadSavingAccounts();


	// =====================================================
	// SEARCH BUTTON CLICK
	// =====================================================

	$("#searchbtn").click(function(e) {

		e.preventDefault();

		searchStatement();
	});


	// =====================================================
	// CLEAR BUTTON
	// =====================================================

	$("#clearbtn").click(function(e) {

		e.preventDefault();

		clearStatement();
	});


	// =====================================================
	// ACCOUNT CHANGE
	// =====================================================

	$("#accountNumber").change(function() {

		$("#statementSection").hide();

		$(".datatable tbody").empty();
	});

});


// =========================================================
// LOAD COMPANY DETAILS
// =========================================================

function loadCompanyDetails() {

	$.ajax({

		url: "api/preference/getCompanyDetails",

		type: "GET",

		dataType: "json",

		success: function(response) {

			console.log("Company Details:", response);


			// =================================================
			// COMPANY NAME
			// =================================================

			$("#companyName").text(
				response.companyName || "Company Name"
			);


			// =================================================
			// GST NUMBER
			// =================================================

			$("#companyGST").text(
				response.gstNumber ||
				response.gstin ||
				response.GSTNumber ||
				"-"
			);


			// =================================================
			// COMPANY ADDRESS
			// =================================================

			$("#companyAddress").text(
				response.address ||
				response.companyAddress ||
				"-"
			);


			// =================================================
			// CONTACT NUMBER
			// =================================================

			$("#companyContact").text(
				response.contactNo ||
				response.branchManagerContactNo ||
				response.mobileNo ||
				"-"
			);


			// =================================================
			// EMAIL
			// =================================================

			$("#companyEmail").text(
				response.email ||
				response.emailId ||
				"-"
			);


			// =================================================
			// WEBSITE
			// =================================================

			/*$("#companyWebsite").text(
				response.website ||
				response.webSite ||
				"-"
			);*/


			// =================================================
			// OPTIONAL COMPANY LOGO
			// =================================================

			/*
			 * Agar CompanyAdministration mein logo/image
			 * ka URL available hai to yahan use kar sakte ho.
			 *
			 * Example:
			 * response.logo
			 * response.companyLogo
			 */

			if (response.logo) {

				$("#companyLogo")
					.attr("src", response.logo)
					.show();

			} else if (response.companyLogo) {

				$("#companyLogo")
					.attr("src", response.companyLogo)
					.show();

			} else {

				$("#companyLogo").hide();
			}

		},


		error: function(xhr) {

			console.error(
				"Company Details Error:",
				xhr.responseText
			);

			$("#companyName").text("Company Name");
			$("#companyGST").text("-");
			$("#companyAddress").text("-");
			$("#companyContact").text("-");
			$("#companyEmail").text("-");

			$("#companyLogo").hide();
		}
	});
}


// =========================================================
// LOAD SAVING ACCOUNTS
// =========================================================

function loadSavingAccounts() {

	$.ajax({

		url: "api/customersavings/getAllSavingAccountData",

		type: "GET",

		dataType: "json",

		success: function(response) {

			let dropdown = $("#accountNumber");

			dropdown.empty();

			dropdown.append(
				'<option value="">-- SELECT ACCOUNT NUMBER --</option>'
			);


			if (
				(response.status === "OK" ||
					response.status === "FOUND") &&
				response.data &&
				response.data.length > 0
			) {

				$.each(response.data, function(index, acc) {

					if (acc.accountNumber) {

						dropdown.append(`
                            <option value="${escapeHtml(
							acc.accountNumber
						)}">
                                ${escapeHtml(
							acc.accountNumber
						)}
                            </option>
                        `);
					}

				});

			} else {

				dropdown.append(
					'<option value="">No Saving Account Found</option>'
				);

				console.warn(
					"No Saving Account Found"
				);
			}
		},


		error: function(xhr) {

			console.error(
				"Account dropdown error:",
				xhr.responseText
			);

			alert(
				"Unable to load saving account numbers"
			);
		}
	});
}


// =========================================================
// SEARCH BANK STATEMENT
// =========================================================

function searchStatement() {

	let accountNumber = $("#accountNumber").val();
	let startDate = $("#startDate").val();
	let endDate = $("#endDate").val();


	// =====================================================
	// VALIDATION
	// =====================================================

	if (!accountNumber) {

		alert("Please select Account Number");

		$("#accountNumber").focus();

		return;
	}


	if (!startDate) {

		alert("Please select Start Date");

		$("#startDate").focus();

		return;
	}


	if (!endDate) {

		alert("Please select End Date");

		$("#endDate").focus();

		return;
	}


	if (startDate > endDate) {

		alert(
			"Start Date cannot be greater than End Date"
		);

		$("#startDate").focus();

		return;
	}


	// =====================================================
	// SEARCH BUTTON LOADING
	// =====================================================

	let searchButton = $("#searchbtn");

	let originalButtonText =
		searchButton.html();


	searchButton
		.prop("disabled", true)
		.html(
			'<i class="fa fa-spinner fa-spin"></i> Generating Statement...'
		);


	// =====================================================
	// CLEAR OLD DATA
	// =====================================================

	$(".datatable tbody").empty();

	$("#statementSection").hide();


	// =====================================================
	// BANK STATEMENT API
	// =====================================================

	$.ajax({

		url: "accountManagement/bank-statement",

		type: "GET",

		dataType: "json",

		data: {

			accountNumber: accountNumber,

			startDate: startDate,

			endDate: endDate
		},


		success: function(response) {

			let tbody =
				$(".datatable tbody");


			tbody.empty();


			// =================================================
			// NO DATA CASE
			// =================================================
			if (
				response.status === "NOT_FOUND" ||
				!response.data ||
				response.data.length === 0
			) {

				$("#statementSection").show();


				// ---------------------------------------------
				// ACCOUNT DETAILS
				// ---------------------------------------------

				$("#statementBankName").text("-");

				$("#statementBranchName").text("-");

				$("#statementAccountNumber")
					.text(accountNumber);

				$("#statementStartDate")
					.text(formatDate(startDate));

				$("#statementEndDate")
					.text(formatDate(endDate));


				// ---------------------------------------------
				// BALANCES
				// ---------------------------------------------

				$("#openingBalance")
					.text("₹ 0.00");

				$("#closingBalance")
					.text("₹ 0.00");

				$("#totalCredit")
					.text("₹ 0.00");

				$("#totalDebit")
					.text("₹ 0.00");


				// ---------------------------------------------
				// NO TRANSACTION MESSAGE
				// ---------------------------------------------

				tbody.html(`
                    <tr>

                        <td colspan="8"
                            class="text-center"
                            style="
                                padding:30px;
                                font-size:16px;
                                color:#6c757d;
                            ">

                            <i class="fa fa-info-circle"></i>

                            ${escapeHtml(
					response.message ||
					"No Transactions Found For Selected Period"
				)
					}

                        </td>

                    </tr>
                `);

				return;
			}


			// =================================================
			// GET STATEMENT DATA
			// =================================================

			let data = response.data;


			let firstTransaction = data[0];

			let lastTransaction =
				data[data.length - 1];


			// =================================================
			// BANK / ACCOUNT DETAILS
			// =================================================

			$("#statementBankName").text(
				firstTransaction.bankName || "-"
			);


			$("#statementBranchName").text(
				firstTransaction.branchName || "-"
			);


			$("#statementAccountNumber").text(
				firstTransaction.accountNumber ||
				accountNumber
			);


			$("#statementStartDate").text(
				formatDate(startDate)
			);


			$("#statementEndDate").text(
				formatDate(endDate)
			);


			// =================================================
			// OPENING BALANCE
			// =================================================

			let openingBalance =
				Number(
					firstTransaction.openingBalance || 0
				);


			$("#openingBalance").text(
				"₹ " +
				formatAmount(openingBalance)
			);


			// =================================================
			// TOTAL CREDIT / DEBIT
			// =================================================

			let totalCredit = 0;

			let totalDebit = 0;


			$.each(data, function(index, txn) {

				totalCredit +=
					Number(txn.credit || 0);

				totalDebit +=
					Number(txn.debit || 0);

			});


			$("#totalCredit").text(
				"₹ " +
				formatAmount(totalCredit)
			);


			$("#totalDebit").text(
				"₹ " +
				formatAmount(totalDebit)
			);


			// =================================================
			// CLOSING BALANCE
			// =================================================

			let closingBalance =
				Number(
					lastTransaction.closingBalance ||
					lastTransaction.balance ||
					0
				);


			$("#closingBalance").text(
				"₹ " +
				formatAmount(closingBalance)
			);


			// =================================================
			// GENERATION DATE/TIME
			// =================================================

			$("#generatedDate").text(
				new Date().toLocaleString("en-IN")
			);


			// =================================================
			// SHOW STATEMENT
			// =================================================

			$("#statementSection").show();


			// =================================================
			// TRANSACTION TABLE
			// =================================================

			$.each(data, function(index, txn) {

				let creditAmount =
					Number(txn.credit || 0);


				let debitAmount =
					Number(txn.debit || 0);


				let balanceAmount =
					Number(txn.balance || 0);


				let transactionType =
					txn.transactionType || "-";


				let transactionBadge =
					getTransactionBadge(
						transactionType
					);


				let row = `

                    <tr>

                        <!-- S.NO -->

                        <td class="text-center">

                            ${index + 1}

                        </td>


                        <!-- DATE -->

                        <td class="text-center">

                            ${formatDate(txn.date)}

                        </td>


                        <!-- NARRATION -->

                        <td class="text-center">

                            ${escapeHtml(
					txn.narration.toUpperCase() || "-"
				)}

                        </td>


                        <!-- REFERENCE NUMBER -->

                        <td class="text-center">

                            ${escapeHtml(
					txn.referenceNo.toUpperCase() || "-"
				)}

                        </td>


                        <!-- CREDIT -->

                        <td class="text-center">

                            ${creditAmount > 0
						? "₹ " +
						formatAmount(
							creditAmount
						)
						: "-"
					}

                        </td>


                        <!-- DEBIT -->

                        <td class="text-center">

                            ${debitAmount > 0
						? "₹ " +
						formatAmount(
							debitAmount
						)
						: "-"
					}

                        </td>


                        <!-- RUNNING BALANCE -->

                        <td class="text-center">

                            ₹
                            ${formatAmount(
						balanceAmount
					)}

                        </td>

                    </tr>

                `;


				tbody.append(row);

			});


			// =================================================
			// SCROLL TO STATEMENT
			// =================================================

			$("html, body").animate({

				scrollTop:
					$("#statementSection")
						.offset()
						.top - 80

			}, 500);

		},


		// =====================================================
		// ERROR
		// =====================================================

		error: function(xhr) {

			console.error(
				"Error fetching bank statement:",
				xhr.responseText
			);


			let message =
				"Unable to generate Bank Statement";


			if (
				xhr.responseJSON &&
				xhr.responseJSON.message
			) {

				message =
					xhr.responseJSON.message;
			}


			alert(message);


			$("#statementSection").show();


			$(".datatable tbody").html(`

                <tr>

                    <td colspan="8"
                        class="text-center"
                        style="
                            color:red;
                            padding:25px;
                        ">

                        <i class="fa fa-exclamation-triangle"></i>

                        ${escapeHtml(message)}

                    </td>

                </tr>

            `);
		},


		// =====================================================
		// COMPLETE
		// =====================================================

		complete: function() {

			searchButton
				.prop("disabled", false)
				.html(originalButtonText);
		}

	});
}


// =========================================================
// FORMAT AMOUNT
// =========================================================

function formatAmount(amount) {

	return Number(amount || 0).toLocaleString(
		"en-IN",
		{
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}
	);
}


// =========================================================
// FORMAT DATE
// =========================================================

function formatDate(dateValue) {

	if (!dateValue) {

		return "-";
	}


	let parts =
		dateValue.split("-");


	if (parts.length === 3) {

		return (
			parts[2] +
			"-" +
			parts[1] +
			"-" +
			parts[0]
		);
	}


	return dateValue;
}


// =========================================================
// TRANSACTION TYPE BADGE
// =========================================================

function getTransactionBadge(transactionType) {

	if (!transactionType) {

		return "-";
	}


	let type =
		transactionType.toUpperCase();


	if (
		type === "DEPOSIT" ||
		type === "CREDIT"
	) {

		return `
            <span class="badge bg-success">
                ${escapeHtml(transactionType)}
            </span>
        `;
	}


	if (
		type === "WITHDRAW" ||
		type === "DEBIT"
	) {

		return `
            <span class="badge bg-danger">
                ${escapeHtml(transactionType)}
            </span>
        `;
	}


	return `
        <span class="badge bg-secondary">
            ${escapeHtml(transactionType)}
        </span>
    `;
}


// =========================================================
// ESCAPE HTML
// =========================================================

function escapeHtml(value) {

	if (
		value === null ||
		value === undefined
	) {

		return "-";
	}


	return $("<div>")
		.text(value)
		.html();
}


// =========================================================
// CLEAR STATEMENT
// =========================================================

function clearStatement() {

	$("#accountNumber").val("");

	$("#startDate").val("");

	$("#endDate").val("");

	$("#statementSection").hide();

	$(".datatable tbody").empty();


	$("#statementBankName").text("-");

	$("#statementBranchName").text("-");

	$("#statementAccountNumber").text("-");

	$("#statementStartDate").text("-");

	$("#statementEndDate").text("-");

	$("#openingBalance").text("₹ 0.00");

	$("#totalCredit").text("₹ 0.00");

	$("#totalDebit").text("₹ 0.00");

	$("#closingBalance").text("₹ 0.00");
}

function printBankStatement() {

	const statementSection = document.getElementById("statementSection");

	if (!statementSection) {
		alert("Bank Statement is not available.");
		return;
	}

	// Open print window
	const printWindow = window.open(
		"",
		"_blank",
		"width=1200,height=900,scrollbars=yes"
	);

	if (!printWindow) {
		alert("Please allow pop-ups to print the Bank Statement.");
		return;
	}

	// Clone statement content
	const statementContent = statementSection.cloneNode(true);

	// Remove print button from cloned content
	const printButton = statementContent.querySelector(".print-button-section");

	if (printButton) {
		printButton.remove();
	}

	// Remove responsive wrapper behavior for printing
	statementContent.querySelectorAll(".table-responsive").forEach(function(element) {
		element.classList.remove("table-responsive");
	});

	// Get company logo
	const companyLogo = statementContent.querySelector("#companyLogo");

	if (companyLogo) {
		companyLogo.style.display = "block";
		companyLogo.style.margin = "0 auto 10px auto";
	}

	// Professional print HTML
	const printHTML = `

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Bank Account Statement</title>

<style>

    /* =========================================================
       PAGE SETTINGS
    ========================================================= */

    @page {
        size: A4 portrait;
        margin: 12mm;
    }

    * {
        box-sizing: border-box;
    }

    html,
    body {
        margin: 0;
        padding: 0;
        background: #ffffff !important;
        font-family: Arial, Helvetica, sans-serif;
        color: #222222;
        font-size: 11px;
    }

    body {
        width: 100%;
    }


    /* =========================================================
       MAIN STATEMENT CONTAINER
    ========================================================= */

    #statementSection {
        display: block !important;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    #statementSection .card {
        border: none !important;
        box-shadow: none !important;
        margin: 0 !important;
        padding: 0 !important;
    }

    #statementSection .card-body {
        padding: 0 !important;
        margin: 0 !important;
    }


    /* =========================================================
       COMPANY HEADER
    ========================================================= */

    #statementSection .text-center {
        text-align: center !important;
    }

    #companyLogo {
        max-height: 65px !important;
        max-width: 170px !important;
        object-fit: contain !important;
        margin: 0 auto 8px auto !important;
    }

    #companyName {
        font-size: 21px !important;
        font-weight: 700 !important;
        letter-spacing: 0.3px;
        margin: 0 0 4px 0 !important;
        color: #111111 !important;
    }

    #companyAddress {
        font-size: 10.5px !important;
        color: #555555 !important;
        margin-bottom: 4px !important;
    }

    #companyContact,
    #companyEmail,
    #companyGST {
        font-size: 10px !important;
        color: #444444 !important;
    }


    /* =========================================================
       MAIN TITLE
    ========================================================= */

    #statementSection h4 {
        font-size: 15px !important;
        font-weight: 700 !important;
        letter-spacing: 1.2px !important;
        margin: 12px 0 10px 0 !important;
        color: #111111 !important;
    }

    #statementSection hr {
        border: none !important;
        border-top: 1px solid #999999 !important;
        margin: 10px 0 !important;
    }


    /* =========================================================
       ACCOUNT INFORMATION
    ========================================================= */

    #statementSection .row {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        margin-left: 0 !important;
        margin-right: 0 !important;
    }

    #statementSection .col-md-4 {
        width: 33.333333%;
        padding: 0 8px !important;
    }

    #statementSection .col-md-12 {
        width: 100%;
    }

    #statementSection .row.mb-4:first-of-type {

        border: 1px solid #cfcfcf !important;
        border-radius: 5px !important;

        padding: 11px 7px !important;

        margin-top: 8px !important;
        margin-bottom: 14px !important;

        background: #fafafa !important;
    }

    #statementSection small {
        font-size: 9px !important;
        color: #666666 !important;
        letter-spacing: 0.4px;
    }

    #statementSection #statementAccountNumber,
    #statementSection #statementBankName,
    #statementSection #statementBranchName,
    #statementSection #statementStartDate,
    #statementSection #statementEndDate,
    #statementSection #generatedDate {
        font-size: 11px !important;
        font-weight: 600 !important;
        color: #111111 !important;
        margin-top: 3px;
    }


    /* =========================================================
       BALANCE SUMMARY
    ========================================================= */

    #statementSection .row.mb-4 {

        margin-bottom: 14px !important;
    }

    #statementSection .col-md-3 {
        width: 25%;
        padding: 0 5px !important;
    }

    #statementSection .col-md-3 > div {

        border: 1px solid #d2d2d2 !important;
        border-radius: 4px !important;

        padding: 9px !important;

        min-height: 55px;

        background: #ffffff !important;
    }

    #statementSection .col-md-3 h5 {

        font-size: 11.5px !important;
        font-weight: 700 !important;

        margin-top: 5px !important;
        margin-bottom: 0 !important;

        color: #111111 !important;
    }


    /* =========================================================
       TRANSACTION TABLE
    ========================================================= */

    #statementSection table {

        width: 100% !important;

        border-collapse: collapse !important;

        border-spacing: 0 !important;

        margin: 0 !important;

        font-size: 9.5px !important;

        table-layout: auto;
    }

    #statementSection thead {

        display: table-header-group !important;
    }

    #statementSection th {

        background: #f1f1f1 !important;

        color: #111111 !important;

        border: 1px solid #999999 !important;

        padding: 7px 5px !important;

        text-align: center !important;

        font-size: 9px !important;

        font-weight: 700 !important;

        letter-spacing: 0.2px;
    }

    #statementSection td {

        border: 1px solid #cccccc !important;

        padding: 6px 5px !important;

        font-size: 9.5px !important;

        color: #222222 !important;

        vertical-align: middle !important;

        background: #ffffff !important;
    }

    #statementSection tbody tr {

        page-break-inside: avoid !important;
    }


    /* =========================================================
       TABLE ALIGNMENT
    ========================================================= */

    #statementSection th:nth-child(1),
    #statementSection td:nth-child(1) {

        width: 6%;
        text-align: center !important;
    }

    #statementSection th:nth-child(2),
    #statementSection td:nth-child(2) {

        width: 10%;
        text-align: center !important;
        white-space: nowrap;
    }

    #statementSection th:nth-child(3),
    #statementSection td:nth-child(3) {

        width: 25%;
        text-align: left !important;
    }

    #statementSection th:nth-child(4),
    #statementSection td:nth-child(4) {

        width: 15%;
        text-align: center !important;
    }

    #statementSection th:nth-child(5),
    #statementSection td:nth-child(5),
    #statementSection th:nth-child(6),
    #statementSection td:nth-child(6),
    #statementSection th:nth-child(7),
    #statementSection td:nth-child(7) {

        width: 12%;
        text-align: right !important;
        white-space: nowrap;
    }

    #statementSection th:nth-child(8),
    #statementSection td:nth-child(8) {

        width: 8%;
        text-align: center !important;
    }


    /* =========================================================
       FOOTER
    ========================================================= */

    #statementSection .row.mt-3 {

        border-top: 1px solid #999999 !important;

        padding-top: 9px !important;

        margin-top: 12px !important;
    }

    #statementSection .row.mt-3 small {

        font-size: 8.5px !important;

        color: #666666 !important;

        letter-spacing: 0.3px;
    }


    /* =========================================================
       PAGE BREAK CONTROL
    ========================================================= */

    .card,
    table,
    .row {

        page-break-inside: avoid;
    }

    tr {

        page-break-inside: avoid;
    }


    /* =========================================================
       PRINT ONLY
    ========================================================= */

    @media print {

        html,
        body {

            width: 100%;

            background: #ffffff !important;
        }

        #statementSection {

            display: block !important;
        }

        .print-button-section {

            display: none !important;
        }

    }

</style>

</head>

<body>

${statementContent.outerHTML}

</body>

</html> `;

	// Write content
	printWindow.document.open();

	printWindow.document.write(printHTML);

	printWindow.document.close();


	// Wait for images / logo
	const images = printWindow.document.images;

	let imagesLoaded = 0;

	if (images.length === 0) {

		startPrinting();

	} else {

		Array.from(images).forEach(function(image) {

			if (image.complete) {

				imagesLoaded++;

			} else {

				image.onload = function() {

					imagesLoaded++;

					if (imagesLoaded === images.length) {
						startPrinting();
					}

				};

				image.onerror = function() {

					imagesLoaded++;

					if (imagesLoaded === images.length) {
						startPrinting();
					}

				};

			}

		});

		if (imagesLoaded === images.length) {
			startPrinting();
		}
	}


	// Start printing
	function startPrinting() {

		setTimeout(function() {

			printWindow.focus();

			printWindow.print();

		}, 500);
	}


	// Close print window after printing
	printWindow.onafterprint = function() {

		setTimeout(function() {

			printWindow.close();

		}, 300);

	};

}
