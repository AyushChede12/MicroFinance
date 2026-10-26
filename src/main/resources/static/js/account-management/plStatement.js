
$(document).ready(function() {

	// Load Branch Dropdown
	BranchNameDropdown();

	// Search Button Click
	$("#searchBtn").on("click", function(e) {
		e.preventDefault();
		searchPLStatement();
	});

	// Prevent Form Submission Reload
	$("#formid").on("submit", function(e) {
		e.preventDefault();
		searchPLStatement();
	});

	// End Date cannot be earlier than Start Date
	$("#startDate").on("change", function() {
		const startDate = $(this).val();

		$("#endDate").attr("min", startDate);

		if ($("#endDate").val() && $("#endDate").val() < startDate) {
			$("#endDate").val("");
		}
	});

	// Start Date cannot be later than End Date
	$("#endDate").on("change", function() {
		const endDate = $(this).val();

		$("#startDate").attr("max", endDate);
	});

});


// =====================================================
// LOAD BRANCH NAME DROPDOWN
// =====================================================
function BranchNameDropdown() {

	$.ajax({
		type: "GET",
		url: "api/preference/getAllBranchModule",
		dataType: "json",

		success: function(response) {

			const branchDropdown = $("#branchName");

			branchDropdown.empty();
			branchDropdown.append(
				'<option value="">--SELECT BRANCH--</option>'
			);

			const branches = Array.isArray(response)
				? response
				: (Array.isArray(response?.data) ? response.data : []);

			branches.forEach(function(branch) {

				if (!branch.branchName) {
					return;
				}

				const branchName = branch.branchName;

				branchDropdown.append(
					$("<option>", {
						value: branchName,
						text: branchName.toUpperCase()
					})
				);
			});
		},

		error: function(xhr) {

			console.error(
				"Failed to load branch names:",
				xhr.responseText
			);

			alert("FAILED TO LOAD BRANCH NAMES.");
		}
	});

}


// =====================================================
// SEARCH PROFIT & LOSS STATEMENT
// API: GET /accountManagement/pl-statementData
// =====================================================
function searchPLStatement() {

	const branchName = $("#branchName").val();
	const startDate = $("#startDate").val();
	const endDate = $("#endDate").val();

	const tbody = $(".datatable tbody");

	// Clear Previous Results
	tbody.empty();

	// Validate Required Fields
	if (!branchName || !startDate || !endDate) {

		alert(
			"PLEASE SELECT BRANCH NAME, START DATE AND END DATE."
		);

		return;
	}

	// Validate Date Range
	if (startDate > endDate) {

		alert("START DATE CANNOT BE GREATER THAN END DATE.");

		return;
	}

	// Show Loading Message
	tbody.html(
		'<tr><td colspan="5">LOADING P&L STATEMENT...</td></tr>'
	);

	$.ajax({
		type: "GET",

		url: "accountManagement/pl-statementData",

		data: {
			branchName: branchName,
			startDate: startDate,
			endDate: endDate
		},

		dataType: "json",

		success: function(response) {

			tbody.empty();

			console.log("P&L Statement API Response:", response);

			// Handle ApiResponse wrapper
			const plData = Array.isArray(response)
				? response
				: (
					Array.isArray(response?.data)
						? response.data
						: []
				);

			// Handle Empty Results
			if (plData.length === 0) {

				tbody.append(`
                    <tr>
                        <td colspan="5">
                            NO P&L RECORDS FOUND FOR THE SELECTED PERIOD.
                        </td>
                    </tr>
                `);

				return;
			}

			// Display P&L Records
			plData.forEach(function(item) {

				const date = item.date ?? "";
				const branch = item.branchName ?? "";

				const totalIncome = Number(item.totalIncome ?? 0);
				const totalExpense = Number(item.totalExpense ?? 0);
				const profitOrLoss = Number(item.profitOrLoss ?? 0);

				const formattedIncome = formatAmount(totalIncome);
				const formattedExpense = formatAmount(totalExpense);
				const formattedProfitLoss = formatAmount(profitOrLoss);

				const profitLossLabel = profitOrLoss > 0
					? "PROFIT"
					: profitOrLoss < 0
						? "LOSS"
						: "NO PROFIT / NO LOSS";

				const profitLossClass = profitOrLoss > 0
					? "text-success"
					: profitOrLoss < 0
						? "text-danger"
						: "";

				const row = $("<tr>");

				row.append(
					$("<td>").text(date)
				);

				row.append(
					$("<td>").text(branch.toUpperCase())
				);

				row.append(
					$("<td>").text(formattedIncome)
				);

				row.append(
					$("<td>").text(formattedExpense)
				);

				const profitLossCell = $("<td>")
					.addClass(profitLossClass)
					.css("font-weight", "600")
					.text(
						formattedProfitLoss +
						" (" + profitLossLabel + ")"
					);

				row.append(profitLossCell);

				tbody.append(row);
			});

		},

		error: function(xhr) {

			tbody.empty();

			console.error(
				"P&L Statement API Error:",
				xhr.status,
				xhr.responseText
			);

			let errorMessage = "FAILED TO FETCH P&L STATEMENT.";

			if (xhr.status === 404) {
				errorMessage =
					"P&L API NOT FOUND. PLEASE CHECK THE API URL.";
			} else if (xhr.status === 400) {
				errorMessage =
					"INVALID SEARCH PARAMETERS. PLEASE CHECK THE DATES.";
			} else if (xhr.status === 500) {
				errorMessage =
					"SERVER ERROR WHILE FETCHING P&L STATEMENT.";
			}

			tbody.append(`
                <tr>
                    <td colspan="5" class="text-danger">
                        ${errorMessage}
                    </td>
                </tr>
            `);

			alert(errorMessage);
		}
	});

}


// =====================================================
// FORMAT AMOUNT
// =====================================================
function formatAmount(amount) {

	return Number(amount).toLocaleString("en-IN", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
}
