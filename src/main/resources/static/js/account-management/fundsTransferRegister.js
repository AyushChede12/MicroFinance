$(document).ready(function() {

	// ================= SHOW DETAILS =================
	$("#showBtn").click(function() {

		let branchName = $("#branchName").val();
		let startDate = $("#startDate").val();
		let endDate = $("#endDate").val();

		if (!branchName || !startDate || !endDate) {
			alert("Please select all fields");
			return;
		}

		$("#showBtn")
			.prop("disabled", true)
			.text("Loading...");

		$.ajax({

			url: "accountManagement/fund-transfer",

			type: "GET",

			data: {
				branchName: branchName,
				startDate: startDate,
				endDate: endDate
			},

			success: function(response) {

				if (response.status === "OK") {

					bindTable(response.data);

				} else {

					alert(response.message || "No Records Found");

					bindTable([]);

				}

				$("#showBtn")
					.prop("disabled", false)
					.text("SHOW DETAILS");
			},

			error: function(xhr) {

				console.error(
					"Fund Transfer Fetch Error:",
					xhr
				);

				alert("Error fetching data");

				$("#showBtn")
					.prop("disabled", false)
					.text("SHOW DETAILS");
			}
		});
	});


	// =====================================================
	// FRONTEND CUSTOMER NAME SEARCH
	// =====================================================
	$("#transactionSearch").on("keyup input", function() {

		let searchValue = $(this)
			.val()
			.trim()
			.toLowerCase();

		let visibleRows = 0;

		$(".datatable tbody tr").each(function() {

			let customerName = $(this)
				.find("td:eq(3)")
				.text()
				.trim()
				.toLowerCase();

			/*
			 * Customer Name column:
			 * 0 = SR NO
			 * 1 = DATE
			 * 2 = TRANSACTION ID
			 * 3 = CUSTOMER NAME
			 */

			if (customerName.indexOf(searchValue) !== -1) {

				$(this).show();
				visibleRows++;

			} else {

				$(this).hide();
			}
		});


		// ================= NO SEARCH RESULT =================

		$("#noSearchResult").remove();

		if (searchValue !== "" && visibleRows === 0) {

			$(".datatable tbody").append(`
                <tr id="noSearchResult">
                    <td colspan="9" class="text-center">
                        No Customer Found
                    </td>
                </tr>
            `);
		}
	});

});


// =====================================================
// TABLE BIND
// =====================================================

function bindTable(data) {

	let rows = "";

	let totalDebit = 0;
	let totalCredit = 0;
	let closingBalance = 0;


	// ================= NO DATA =================

	if (!data || data.length === 0) {

		rows = `
            <tr>
                <td colspan="9" class="text-center">
                    No Records Found
                </td>
            </tr>
        `;

	} else {

		data.forEach(function(item, index) {

			let debit =
				parseFloat(item.debit || 0);

			let credit =
				parseFloat(item.credit || 0);

			totalDebit += debit;
			totalCredit += credit;

			closingBalance =
				parseFloat(item.balance || 0);


			// ================= SAFE CUSTOMER NAME =================

			let customerName =
				item.customerName
					? String(item.customerName).toUpperCase()
					: "-";


			// ================= SAFE NARRATION =================

			let narration =
				item.narration
					? String(item.narration).toUpperCase()
					: "-";


			rows += `

                <tr>

                    <td>${index + 1}</td>

                    <td>
                        ${item.transactionDate || "-"}
                    </td>

                    <td>
                        ${item.referenceNo || "-"}
                    </td>

                    <td>
                        ${customerName}
                    </td>

                    <td>
                        ${item.accountNumber || "-"}
                    </td>

                    <td>
                        ${narration}
                    </td>

                    <td class="text-end">
                        ${debit.toFixed(2)}
                    </td>

                    <td class="text-end">
                        ${credit.toFixed(2)}
                    </td>

                    <td class="text-end">
                        ${closingBalance.toFixed(2)}
                    </td>

                </tr>

            `;
		});
	}


	// ================= SET TABLE =================

	$(".datatable tbody").html(rows);


	// ================= TOTALS =================

	$("#totalDebit")
		.text(totalDebit.toFixed(2));

	$("#totalCredit")
		.text(totalCredit.toFixed(2));

	$("#closingBalance")
		.text(closingBalance.toFixed(2));


	// ================= CLEAR SEARCH =================

	$("#transactionSearch").val("");

	$("#noSearchResult").remove();
}


// =====================================================
// EXPORT TO EXCEL
// =====================================================

function exportToExcel() {

	let table =
		document.querySelector(".datatable");

	let rows =
		$(".datatable tbody tr:visible")
			.not("#noSearchResult");

	if (rows.length === 0) {

		alert("No data to export");
		return;
	}


	let wb =
		XLSX.utils.book_new();

	let ws =
		XLSX.utils.table_to_sheet(table);


	XLSX.utils.book_append_sheet(
		wb,
		ws,
		"Fund Transfer"
	);


	XLSX.writeFile(
		wb,
		"Fund_Transfer_Report.xlsx"
	);
}


// =====================================================
// PRINT
// =====================================================

function printReport() {

	let table =
		document.querySelector(".datatable").outerHTML;

	let branch =
		$("#branchName option:selected").text();

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


	printWindow.document.write(`

        <html>

        <head>

            <title>Fund Transfer Report</title>

            <style>

                body {
                    font-family: Arial;
                    padding: 20px;
                }

                h2 {
                    text-align: center;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                table,
                th,
                td {
                    border: 1px solid black;
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
                FUND TRANSFER REPORT
            </h2>


            <p>

                <b>Branch:</b>
                ${branch}

                <br>

                <b>From:</b>
                ${startDate}

                &nbsp;&nbsp;

                <b>To:</b>
                ${endDate}

            </p>


            ${table}


            <br>


            <p style="text-align:right;">

                <b>Total Debit:</b>
                ${$("#totalDebit").text()}

                |

                <b>Total Credit:</b>
                ${$("#totalCredit").text()}

                |

                <b>Closing Balance:</b>
                ${$("#closingBalance").text()}

            </p>


        </body>

        </html>

    `);


	printWindow.document.close();


	setTimeout(function() {

		printWindow.print();

		printWindow.close();

	}, 500);
}
