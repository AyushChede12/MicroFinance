$(document).ready(function() {

	// Load Ledger Dropdown
	loadLedger();

	// Search button click
	$("#serachBtn").click(function(e) {
		e.preventDefault();
		loadTransactions();
	});

	// Customer Name Search
	$("#transactionSearch").on("keyup", function() {

		let searchValue =
			$(this).val().toUpperCase().trim();

		let visibleRows = 0;

		// Remove previous "No Records Found" row
		$("#noSearchResult").remove();


		$(".datatable tbody tr").each(function() {

			// Ignore no-data / loading rows
			if ($(this).attr("id") === "noSearchResult") {
				return;
			}

			if ($(this).find("td").length === 1) {
				return;
			}


			let customerName =
				$(this).attr("data-customer-name") || "";


			// If search is empty, show all records
			if (searchValue === "") {

				$(this).show();
				visibleRows++;

			}

			// Search Customer Name
			else if (
				customerName
					.toUpperCase()
					.includes(searchValue)
			) {

				$(this).show();
				visibleRows++;

			}

			else {

				$(this).hide();

			}

		});


		// ============================================
		// NO MATCHING RECORD
		// ============================================

		if (
			searchValue !== "" &&
			visibleRows === 0
		) {

			$(".datatable tbody").append(`

	            <tr id="noSearchResult">

	                <td colspan="8"
	                    class="text-center text-muted">

	                    No Records Found

	                </td>

	            </tr>

	        `);

		}

	});

});


// =====================================================
// LOAD LEDGER DROPDOWN
// =====================================================

function loadLedger() {

	$.ajax({

		url: "accountManagement/getUniqueLedgerDropdown",
		type: "GET",

		success: function(response) {

			let options =
				'<option value="">--SELECT LEDGER--</option>';

			if (response && response.data) {

				response.data.forEach(function(item) {

					let accountCode = item.accountCode || "";
					let accountTitle = item.accountTitle || "";

					options += `
                        <option value="${accountCode}">
                            ${accountCode} - ${accountTitle.toUpperCase()}
                        </option>
                    `;

				});

			}

			$("#chooseLedger").html(options);

		},

		error: function(xhr) {

			console.error("Ledger Dropdown Error:", xhr);

			$("#chooseLedger").html(
				'<option value="">--ERROR LOADING LEDGER--</option>'
			);

			alert("❌ Error loading ledger dropdown");

		}

	});

}


// =====================================================
// LOAD DAILY TRANSACTIONS
// =====================================================

function loadTransactions() {

	let branchName = $("#branchName").val();
	let accountCode = $("#chooseLedger").val();
	let startDate = $("#startDate").val();
	let endDate = $("#endDate").val();


	// =================================================
	// VALIDATION
	// =================================================

	if (!branchName) {

		alert("⚠ Please select Branch Name");
		return;

	}

	if (!accountCode) {

		alert("⚠ Please select Ledger");
		return;

	}

	if (!startDate) {

		alert("⚠ Please select Start Date");
		return;

	}

	if (!endDate) {

		alert("⚠ Please select End Date");
		return;

	}


	// Start date cannot be greater than end date

	if (startDate > endDate) {

		alert("⚠ Start Date cannot be greater than End Date");
		return;

	}


	// Clear Customer Search

	$("#transactionSearch").val("");


	// =================================================
	// SHOW LOADING
	// =================================================

	$(".datatable tbody").html(`
        <tr>
            <td colspan="8" class="text-center text-muted">
                Loading...
            </td>
        </tr>
    `);


	// =================================================
	// API CALL
	// =================================================

	$.ajax({

		url: "accountManagement/daily-transaction",

		type: "GET",

		data: {

			branchName: branchName,
			accountCode: accountCode,
			startDate: startDate,
			endDate: endDate

		},


		// =================================================
		// SUCCESS
		// =================================================

		success: function(response) {

			console.log("Daily Transaction Response:", response);


			let tableBody = "";
			let count = 1;


			// =================================================
			// CHECK RESPONSE
			// =================================================

			if (
				response &&
				response.status === "OK" &&
				response.data &&
				response.data.length > 0
			) {


				// =================================================
				// LOOP TRANSACTIONS
				// =================================================

				response.data.forEach(function(txn) {


					// -----------------------------------------
					// BASIC DATA
					// -----------------------------------------

					let transactionId =
						txn.id != null ? txn.id : "-";


					let transactionDate =
						txn.transactionDate || "-";


					let ledger =
						txn.accountCode || "-";


					let description =
						txn.narration || "-";


					let customerName =
						txn.customerName || "";


					// -----------------------------------------
					// DEBIT
					// -----------------------------------------

					let debit =
						txn.debit != null
							? parseFloat(txn.debit)
							: 0;


					// -----------------------------------------
					// CREDIT
					// -----------------------------------------

					let credit =
						txn.credit != null
							? parseFloat(txn.credit)
							: 0;


					// -----------------------------------------
					// BALANCE
					// -----------------------------------------

					let balance =
						txn.balance != null
							? parseFloat(txn.balance)
							: 0;


					// -----------------------------------------
					// SAFETY FOR NaN
					// -----------------------------------------

					if (isNaN(debit)) {
						debit = 0;
					}

					if (isNaN(credit)) {
						credit = 0;
					}

					if (isNaN(balance)) {
						balance = 0;
					}


					// =================================================
					// CREATE TABLE ROW
					// =================================================

					tableBody += `

                        <tr data-customer-name="${escapeHtml(customerName)}">

                            <td class="text-center">
                                ${count++}
                            </td>

                            <td class="text-center">
                                ${escapeHtml(transactionDate)}
                            </td>

                            <td class="text-center">
                                ${escapeHtml(String(transactionId))}
                            </td>

                            <td>
                                ${escapeHtml(ledger)}
                            </td>

                            <td>
                                ${escapeHtml(description.toUpperCase())}
                            </td>

                            <td class="text-end">
                                ${debit.toFixed(2)}
                            </td>

                            <td class="text-end">
                                ${credit.toFixed(2)}
                            </td>

                            <td class="text-end">
                                ${balance.toFixed(2)}
                            </td>

                        </tr>

                    `;

				});


			} else {

				// =================================================
				// NO DATA
				// =================================================

				tableBody = `

                    <tr>
                        <td colspan="8"
                            class="text-center text-danger">

                            No Data Found

                        </td>
                    </tr>

                `;

			}


			// =================================================
			// PUT DATA INTO TABLE
			// =================================================

			$(".datatable tbody").html(tableBody);

		},


		// =================================================
		// ERROR
		// =================================================

		error: function(xhr) {

			console.error(
				"Daily Transaction API Error:",
				xhr
			);


			let message =
				"Error fetching daily transactions";


			if (
				xhr.responseJSON &&
				xhr.responseJSON.message
			) {

				message =
					xhr.responseJSON.message;

			}


			$(".datatable tbody").html(`

                <tr>

                    <td colspan="8"
                        class="text-center text-danger">

                        ${escapeHtml(message)}

                    </td>

                </tr>

            `);

		}

	});

}


// =====================================================
// HTML ESCAPE
// =====================================================

function escapeHtml(value) {

	if (value === null || value === undefined) {
		return "";
	}

	return String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");

}


// =====================================================
// EXPORT TO EXCEL
// =====================================================

function exportToExcel() {

	let table =
		document.querySelector(".datatable");


	if (!table) {

		alert("⚠ Transaction table not found");
		return;

	}


	// Check no data

	let rows =
		table.querySelectorAll("tbody tr");


	if (
		rows.length === 0 ||
		(
			rows.length === 1 &&
			rows[0].innerText
				.toUpperCase()
				.includes("NO DATA")
		)
	) {

		alert("⚠ No data to export");
		return;

	}


	// Create workbook

	let wb =
		XLSX.utils.book_new();


	// Convert table to worksheet

	let ws =
		XLSX.utils.table_to_sheet(table);


	// Add worksheet

	XLSX.utils.book_append_sheet(
		wb,
		ws,
		"Transactions"
	);


	// File name

	let today =
		new Date()
			.toISOString()
			.slice(0, 10);


	XLSX.writeFile(
		wb,
		"Daily_Transaction_" + today + ".xlsx"
	);

}


// =====================================================
// PRINT REPORT
// =====================================================

function printReport() {

	let tableElement =
		document.querySelector(".datatable");


	if (!tableElement) {

		alert("⚠ Transaction table not found");
		return;

	}


	let rows =
		tableElement.querySelectorAll("tbody tr");


	// Check no data

	if (
		rows.length === 0 ||
		(
			rows.length === 1 &&
			rows[0].innerText
				.toUpperCase()
				.includes("NO DATA")
		)
	) {

		alert("⚠ No data available for printing");
		return;

	}


	let table =
		tableElement.outerHTML;


	let branch =
		$("#branchName option:selected").text();


	let ledger =
		$("#chooseLedger option:selected").text();


	let startDate =
		$("#startDate").val();


	let endDate =
		$("#endDate").val();


	let printWindow =
		window.open(
			"",
			"",
			"width=900,height=700"
		);


	if (!printWindow) {

		alert(
			"⚠ Please allow pop-ups to print the report"
		);

		return;

	}


	printWindow.document.write(`

        <html>

        <head>

            <title>Daily Transaction Report</title>

            <style>

                body {

                    font-family: Arial, sans-serif;

                    padding: 20px;

                }

                h2 {

                    text-align: center;

                    margin-bottom: 15px;

                }

                .info {

                    margin-bottom: 20px;

                    line-height: 1.8;

                }

                table {

                    width: 100%;

                    border-collapse: collapse;

                }

                table,
                th,
                td {

                    border: 1px solid #000;

                }

                th,
                td {

                    padding: 8px;

                    text-align: center;

                }

                .text-end {

                    text-align: right;

                }

            </style>

        </head>


        <body>


            <h2>
                DAILY TRANSACTION REPORT
            </h2>


            <div class="info">

                <b>Branch:</b>
                ${escapeHtml(branch)}

                <br>


                <b>Ledger:</b>
                ${escapeHtml(ledger)}

                <br>


                <b>From:</b>
                ${escapeHtml(startDate)}

                &nbsp;&nbsp;


                <b>To:</b>
                ${escapeHtml(endDate)}

            </div>


            ${table}


        </body>

        </html>

    `);


	printWindow.document.close();

	printWindow.focus();


	// Allow rendering

	setTimeout(function() {

		printWindow.print();

		printWindow.close();

	}, 500);

}