// =====================================================
// GET CASH BOOK TRANSACTIONS
// =====================================================

function getCashBook() {

	let branchName = $("#branchName").val();
	let startDate = $("#startDate").val();
	let endDate = $("#endDate").val();

	// ================= VALIDATION =================

	if (!branchName) {
		alert("Please select Branch");
		return;
	}

	if (!startDate) {
		alert("Please select Start Date");
		return;
	}

	if (!endDate) {
		alert("Please select End Date");
		return;
	}

	// Start date should not be greater than end date
	if (startDate > endDate) {
		alert("Start Date cannot be greater than End Date");
		return;
	}

	// ================= BUTTON LOADING =================

	$("#showDetilsBtn")
		.prop("disabled", true)
		.text("Loading...");

	// Clear old data
	$("#cashBookTableBody").html(
		'<tr><td colspan="8" class="text-center">Loading...</td></tr>'
	);

	// Reset totals
	$("#totalDebit").text("₹0.00");
	$("#totalCredit").text("₹0.00");
	$("#closingBalance").text("₹0.00");

	// ================= AJAX =================

	$.ajax({

		url: "accountManagement/getCashBookTransaction",

		type: "GET",

		data: {
			branchName: branchName,
			startDate: startDate,
			endDate: endDate
		},

		success: function(response) {

			console.log("CashBook Response:", response);

			// ================= SUCCESS =================

			if (response.status === "OK") {

				if (response.data && response.data.length > 0) {

					bindCashBookTable(response.data);

				} else {

					showNoCashBookRecords();
				}

			} else {

				showNoCashBookRecords();

				alert(response.message || "No CashBook Records Found");
			}
		},

		error: function(xhr, status, error) {

			console.error("CashBook Error:", error);
			console.error("Response:", xhr.responseText);

			showNoCashBookRecords();

			alert("Error fetching CashBook data");
		},

		complete: function() {

			// ================= ENABLE BUTTON =================

			$("#showDetilsBtn")
				.prop("disabled", false)
				.text("SHOW DETAILS");
		}
	});
}


// =====================================================
// BIND CASH BOOK TABLE
// =====================================================

function bindCashBookTable(data) {
	let rows = "";

	let totalDebit = 0;
	let totalCredit = 0;

	// CashBook opening/running balance
	let runningBalance = 0;

	if (!data || data.length === 0) {

		showNoCashBookRecords();
		return;
	}

	// =================================================
	// LOOP TRANSACTIONS
	// =================================================

	data.forEach(function(item, index) {

		// Convert values safely to number
		let debit = parseFloat(item.debit) || 0;
		let credit = parseFloat(item.credit) || 0;

		// ================= TOTALS =================

		totalDebit += debit;
		totalCredit += credit;

		// =================================================
		// RUNNING CASH BALANCE
		//
		// Cash Received  = Credit
		// Cash Paid      = Debit
		//
		// Balance = Credit - Debit
		// =================================================

		runningBalance += (credit - debit);

		// ================= DATE =================

		let transactionDate = item.transactionDate
			? item.transactionDate
			: "-";

		// ================= CUSTOMER NAME =================

		let customerName = item.customerName
			? item.customerName
			: "-";

		// ================= REFERENCE =================

		let referenceNo = item.referenceNo
			? item.referenceNo
			: "-";

		// ================= ACCOUNT NUMBER =================

		let accountNumber = item.accountNumber
			? item.accountNumber
			: "-";

		// ================= NARRATION =================

		let narration = item.narration
			? item.narration
			: "-";

		// =================================================
		// TABLE ROW
		// =================================================

		rows += `
            <tr>

                <td class="text-center">
                    ${index + 1}
                </td>

                <td class="text-center">
                    ${transactionDate}
                </td>
				
				<td class="text-center">
				    ${customerName.toUpperCase()}
				</td>

                <td class="text-center">
                    ${referenceNo}
                </td>

                <td class="text-center">
                    ${accountNumber}
                </td>

                <td>
                    ${narration.toUpperCase()}
                </td>

                <td class="text-end">
                    ₹${debit.toFixed(2)}
                </td>

                <td class="text-end">
                    ₹${credit.toFixed(2)}
                </td>

                <td class="text-end">
                    ₹${runningBalance.toFixed(2)}
                </td>

            </tr>
        `;
	});

	// =================================================
	// SET TABLE DATA
	// =================================================

	$("#cashBookTableBody").html(rows);

	// =================================================
	// SET TOTALS
	// =================================================

	$("#totalDebit").text(
		"₹" + totalDebit.toFixed(2)
	);

	$("#totalCredit").text(
		"₹" + totalCredit.toFixed(2)
	);

	$("#closingBalance").text(
		"₹" + runningBalance.toFixed(2)
	);
}


// =====================================================
// NO RECORDS
// =====================================================

function showNoCashBookRecords() {

	$("#cashBookTableBody").html(`
        <tr>
            <td colspan="8" class="text-center">
                No CashBook Records Found
            </td>
        </tr>
    `);

	$("#totalDebit").text("₹0.00");
	$("#totalCredit").text("₹0.00");
	$("#closingBalance").text("₹0.00");
}


// =====================================================
// FORMAT CURRENCY
// =====================================================

function formatCurrency(amount) {

	amount = parseFloat(amount) || 0;

	return "₹" + amount.toFixed(2);
}


// =====================================================
// EXPORT TO EXCEL
// =====================================================

function exportToExcel() {

	let table = document.querySelector(".datatable");

	if (!table) {
		alert("CashBook table not found");
		return;
	}

	// Check actual transaction rows
	let transactionRows =
		$("#cashBookTableBody tr").filter(function() {
			return $(this).find("td").length === 8;
		});

	if (transactionRows.length === 0) {

		alert("No data to export");
		return;
	}

	// =================================================
	// CREATE EXCEL WORKBOOK
	// =================================================

	let wb = XLSX.utils.book_new();

	let ws = XLSX.utils.table_to_sheet(table);

	XLSX.utils.book_append_sheet(
		wb,
		ws,
		"Cash Book"
	);

	// =================================================
	// EXPORT FILE
	// =================================================

	XLSX.writeFile(
		wb,
		"Cash_Book_Report.xlsx"
	);
}


// =====================================================
// PRINT CASH BOOK REPORT
// =====================================================

function printReport() {

	let tableElement =
		document.querySelector(".datatable");

	if (!tableElement) {
		alert("CashBook table not found");
		return;
	}

	// =================================================
	// CHECK DATA
	// =================================================

	let transactionRows =
		$("#cashBookTableBody tr").filter(function() {
			return $(this).find("td").length === 8;
		});

	if (transactionRows.length === 0) {

		alert("No data available for printing");
		return;
	}

	// =================================================
	// GET FILTER VALUES
	// =================================================

	let branch =
		$("#branchName option:selected").text();

	let startDate =
		$("#startDate").val();

	let endDate =
		$("#endDate").val();

	let totalDebit =
		$("#totalDebit").text();

	let totalCredit =
		$("#totalCredit").text();

	let closingBalance =
		$("#closingBalance").text();

	// =================================================
	// TABLE HTML
	// =================================================

	let table =
		tableElement.outerHTML;

	// =================================================
	// OPEN PRINT WINDOW
	// =================================================

	let printWindow =
		window.open(
			"",
			"",
			"width=1000,height=700"
		);

	if (!printWindow) {

		alert("Please allow pop-ups to print the report");
		return;
	}

	// =================================================
	// PRINT HTML
	// =================================================

	printWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>Cash Book Report</title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    padding: 30px;
                    color: #000;
                }

                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }

                .header h2 {
                    margin: 0;
                    font-size: 24px;
                }

                .header p {
                    margin: 5px 0;
                    font-size: 14px;
                }

                .details {
                    margin-bottom: 20px;
                    font-size: 14px;
                    line-height: 1.8;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                }

                table,
                th,
                td {
                    border: 1px solid #000;
                }

                th {
                    background: #f2f2f2;
                    font-weight: bold;
                }

                th,
                td {
                    padding: 8px;
                    font-size: 12px;
                }

                .text-center {
                    text-align: center;
                }

                .text-end {
                    text-align: right;
                }

                tfoot th {
                    font-weight: bold;
                    background: #f2f2f2;
                }

                .summary {
                    margin-top: 20px;
                    text-align: right;
                    font-size: 14px;
                    line-height: 2;
                }

                .summary strong {
                    display: inline-block;
                    min-width: 160px;
                }

                .footer {
                    margin-top: 40px;
                    text-align: center;
                    font-size: 11px;
                }

                @media print {

                    body {
                        padding: 10px;
                    }

                    .no-print {
                        display: none;
                    }

                    table {
                        page-break-inside: auto;
                    }

                    tr {
                        page-break-inside: avoid;
                        page-break-after: auto;
                    }

                }

            </style>

        </head>

        <body>

            <!-- ================= HEADER ================= -->

            <div class="header">

                <h2>
                    CASH BOOK REPORT
                </h2>

                <p>
                    Cash Transaction Statement
                </p>

            </div>


            <!-- ================= REPORT DETAILS ================= -->

            <div class="details">

                <strong>Branch:</strong>
                ${branch}
                <br>

                <strong>From Date:</strong>
                ${startDate}

                &nbsp;&nbsp;&nbsp;&nbsp;

                <strong>To Date:</strong>
                ${endDate}

            </div>


            <!-- ================= TABLE ================= -->

            ${table}


            <!-- ================= SUMMARY ================= -->

            <div class="summary">

                <div>
                    <strong>Total Debit:</strong>
                    ${totalDebit}
                </div>

                <div>
                    <strong>Total Credit:</strong>
                    ${totalCredit}
                </div>

                <div>
                    <strong>Closing Balance:</strong>
                    ${closingBalance}
                </div>

            </div>


            <!-- ================= FOOTER ================= -->

            <div class="footer">

                Cash Book Report

            </div>

        </body>

        </html>

    `);

	// =================================================
	// CLOSE DOCUMENT
	// =================================================

	printWindow.document.close();

	// =================================================
	// PRINT
	// =================================================

	setTimeout(function() {

		printWindow.focus();

		printWindow.print();

		printWindow.close();

	}, 500);
}

$("#cashBookSearch").on("keyup", function () {

    let value = $(this).val().toLowerCase();

    $("#cashBookTableBody tr").filter(function () {

        $(this).toggle(
            $(this).text().toLowerCase().indexOf(value) > -1
        );

    });

});