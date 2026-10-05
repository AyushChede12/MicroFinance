$(document).ready(function() {

	// 🔹 Form submit handle
	$("#searchBtn").on("click", function(e) {
		alert("button");
		e.preventDefault();

		let branchName = $("#branchName").val();
		let startDate = $("#startDate").val();
		let endDate = $("#endDate").val();

		// ✅ Validation
		if (!startDate || !endDate) {
			alert("Please select start and end date");
			return;
		}

		// 🔥 API CALL
		$.ajax({
			url: "accountManagement/pl-statementData",
			type: "GET",
			data: {
				branchName: branchName,
				startDate: startDate,
				endDate: endDate
			},
			success: function(response) {

				let tableBody = $(".datatable tbody");
				tableBody.empty();

				let data = response.data;

				// ❌ No Data
				if (!data || data.length === 0) {
					tableBody.append(`
                        <tr>
                            <td colspan="5" style="text-align:center;">No Data Found</td>
                        </tr>
                    `);
					return;
				}

				let totalIncome = 0;
				let totalExpense = 0;
				let totalProfit = 0;

				// 🔁 Loop Data
				$.each(data, function(index, item) {

					totalIncome += item.totalIncome;
					totalExpense += item.totalExpense;
					totalProfit += item.profitOrLoss;

					let row = `
                        <tr>
                            <td>${item.date}</td>
                            <td>${item.branchName}</td>
                            <td>${item.totalIncome}</td>
                            <td>${item.totalExpense}</td>
                            <td style="color:${item.profitOrLoss >= 0 ? 'green' : 'red'};">
                                ${item.profitOrLoss}
                            </td>
                        </tr>
                    `;

					tableBody.append(row);
				});

				// 🔥 TOTAL ROW
				let totalRow = `
                    <tr style="font-weight:bold; background:#f2f2f2;">
                        <td colspan="2">TOTAL</td>
                        <td>${totalIncome}</td>
                        <td>${totalExpense}</td>
                        <td style="color:${totalProfit >= 0 ? 'green' : 'red'};">
                            ${totalProfit}
                        </td>
                    </tr>
                `;

				tableBody.append(totalRow);
			},

			error: function(xhr) {
				console.error(xhr);
				alert("Error fetching P&L data");
			}
		});
	});

});
