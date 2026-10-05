$(document).ready(function() {

	// =========================
	// LOAD TRANSFER HISTORY
	// =========================

	loadTransferHistory();

	// =========================
	// TRANSFER BUTTON CLICK
	// =========================

	$("#transferBtn").click(function(e) {

		e.preventDefault();

		// =========================
		// GET FORM VALUES
		// =========================

		let transactionDate = $("#startDate").val();

		let sourceBranch = $("#sourceBranch").val();

		let receivingBranch = $("#receivingBranch").val();

		let amount = $("#totalAmount").val();

		// =========================
		// VALIDATIONS
		// =========================

		if (transactionDate === "") {

			alert("Please select transaction date");

			return;
		}

		if (sourceBranch === "") {

			alert("Please select source branch");

			return;
		}

		if (receivingBranch === "") {

			alert("Please select receiving branch");

			return;
		}

		if (sourceBranch === receivingBranch) {

			alert("Source and Receiving Branch cannot be same");

			return;
		}

		if (amount === "" || parseFloat(amount) <= 0) {

			alert("Please enter valid amount");

			return;
		}

		// =========================
		// REQUEST JSON
		// =========================

		let requestData = {

			transactionDate: transactionDate,

			sourceBranch: sourceBranch,

			receivingBranch: receivingBranch,

			accountCode: "101",

			amount: parseFloat(amount)

		};

		console.log(requestData);

		// =========================
		// SAVE API
		// =========================

		$.ajax({

			url: "accountManagement/inter-branch-transfer",

			type: "POST",

			contentType: "application/json",

			data: JSON.stringify(requestData),

			success: function(response) {

				alert(response.message);

				// =========================
				// RESET FORM
				// =========================

				$("#formid")[0].reset();

				// =========================
				// RELOAD TABLE
				// =========================

				loadTransferHistory();

			},

			error: function(xhr) {

				console.log(xhr);

				if (xhr.responseJSON != null) {

					alert(xhr.responseJSON.message);

				} else {

					alert("Transfer Failed");

				}

			}

		});

	});

});

// =========================
// LOAD TRANSFER HISTORY
// =========================

function loadTransferHistory() {

	$.ajax({

		url: "accountManagement/get-inter-branch-transfers",

		type: "GET",

		success: function(response) {

			let data = response.data;

			let tableData = "";

			// =========================
			// NO DATA
			// =========================

			if (data == null || data.length === 0) {

				tableData = `

					<tr>

						<td colspan="3"
							class="text-center">

							No Transfer History Found

						</td>

					</tr>

				`;

			}

			// =========================
			// TABLE DATA
			// =========================

			$.each(data, function(index, item) {

				tableData += `

				    <tr>

				        <td>

				            ${item.transactionDate}

				        </td>

				        <td>

				            ${item.branchName}

				        </td>

				        <td>

				            ${item.narration.replace("Cash Transfer To ", "")}

				        </td>

				        <td>

				            ${item.credit}

				        </td>

				    </tr>

				`;

			});

			$("table tbody").html(tableData);

		},

		error: function(xhr) {

			console.log(xhr);

			alert("Failed to load transfer history");

		}

	});

}