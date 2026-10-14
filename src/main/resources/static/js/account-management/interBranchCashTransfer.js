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

			alert("PLEASE SELECT TRANSACTION DATE");

			return;
		}

		if (sourceBranch === "") {

			alert("PLEASE SELECT SOURCE BRANCH");

			return;
		}

		if (receivingBranch === "") {

			alert("PLEASE SELECT RECEIVING BRANCH");

			return;
		}

		if (sourceBranch === receivingBranch) {

			alert("SOURCE AND RECEIVING BRANCH CANNOT BE SAME");

			return;
		}

		if (amount === "" || parseFloat(amount) <= 0) {

			alert("PLEASE ENTER VALID AMOUNT");

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

					alert("TRANSFER FAILED");

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

                            NO TRANSFER HISTORY FOUND

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

			alert("FAILED TO LOAD TRANSFER HISTORY");

		}

	});

}