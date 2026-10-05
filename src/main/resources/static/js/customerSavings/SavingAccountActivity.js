// =========================================
// CLEAR FORM FUNCTION
// =========================================
function clearAccountForm() {
	$('#customerCode, #customerName, #contactNumber, #jointHolderName, #savingPlanName, #averageBalance, #selectBranchName')
		.val('')
		.prop("readonly", false);

	$('#tbody').empty();
}

// =========================================
// FETCH ACCOUNT DETAILS ON ACCOUNT CHANGE
// =========================================
// =========================================
// LOAD ACCOUNT NUMBER DROPDOWN
// =========================================
$(document).ready(function() {
	loadAccountNumberDropdown();
});

function loadAccountNumberDropdown() {

	$.ajax({
		url: "api/customersavings/getAllSavingAccountData",
		type: "GET",
		dataType: "json",
		success: function(response) {

			let dropdown = $('#accountNumber');
			dropdown.empty();

			// default option
			dropdown.append('<option value="">--SELECT ACCOUNT NUMBER--</option>');

			if ((response.status === "OK" || response.status === "FOUND")
				&& response.data && response.data.length > 0) {

				$.each(response.data, function(index, acc) {

					// ⚠️ backend field name confirm karo
					dropdown.append(
						`<option value="${acc.accountNumber}">
                            ${acc.accountNumber}
                         </option>`
					);
				});

			} else {
				alert("No Saving Account Found");
			}
		},
		error: function(xhr) {
			console.error("Account dropdown error:", xhr.responseText);
			alert("Unable to load account numbers");
		}
	});
}

$('#accountNumber').on('change', function() {

	let accountNumber = $(this).val().trim();

	if (accountNumber === "") {
		clearAccountForm();
		return;
	}

	$.ajax({
		url: "api/customersavings/getallbyaccountnumber",
		type: "GET",
		data: { accountNumber: accountNumber },
		dataType: "json",

		success: function(response) {

			console.log("Full Response:", response);

			if ((response.status === "OK" || response.status === "FOUND")
				&& response.data && response.data.length > 0) {

				let customer = response.data[0];

				console.log("Customer:", customer);
				console.log("Branch Object:", customer.branchName);

				let branch = "";

				if (customer.branchName != null) {
					branch = customer.branchName.branchName || "";
				}

				$('#customerCode').val(customer.selectByCustomer || '');
				$('#customerName').val(customer.enterCustomerName ? customer.enterCustomerName.toUpperCase() : '');
				$('#contactNumber').val(customer.contactNumber || '');
				$('#jointHolderName').val(customer.jointSurvivorCode ? customer.jointSurvivorCode.toUpperCase() : '');
				$('#savingPlanName').val(customer.selectPlan ? customer.selectPlan.toUpperCase() : '');
				$('#averageBalance').val(customer.openingFees || '');
				$('#selectBranchName').val(branch ? branch.toUpperCase() : '');

				$('#customerCode, #customerName, #contactNumber, #jointHolderName, #savingPlanName, #averageBalance, #selectBranchName')
					.prop("readonly", true);

				reloadTransactionTable(accountNumber);

			} else {
				alert("No account found!");
				clearAccountForm();
			}
		},

		error: function(xhr, status, error) {
			console.error("Error fetching account details:", xhr.responseText);
			alert("Server error while fetching account data");
			clearAccountForm();
		}
	});
});

// =========================================
// SAVE TRANSACTION
// =========================================
$(document).ready(function() {

	$('#saveBtn').click(function(event) {

		event.preventDefault();

		// Clear previous error message
		$('#balanceError').text("");

		const transactionDate = $('#transactionDate').val();

		const accountNumber = $('#accountNumber').val();

		const transactionType = $('#transactionType').val();

		const transactionAmount =
			parseFloat($('#transactionAmount').val());

		let avgBalance =
			parseFloat($('#averageBalance').val()) || 0;


		// Required field validation
		if (
			!transactionDate ||
			!accountNumber ||
			!transactionType ||
			isNaN(transactionAmount)
		) {

			alert("Please fill all required fields");

			return;
		}


		// ===== Update average balance =====

		if (transactionType === 'Deposit') {

			avgBalance += transactionAmount;

		}

		else if (transactionType === 'Withdraw') {

			avgBalance -= transactionAmount;
		}


		// ===== Balance negative check =====

		if (avgBalance < 0) {

			$('#balanceError').text("Balance is low");

			return;
		}


		// Update balance field

		$('#averageBalance').val(
			avgBalance.toFixed(2)
		);


		// ===== Prepare data =====
		var customerName = $('#customerName').val();

		const accountData = {

			selectSavingTransactionId:
				$('#selectSavingTransactionId').val(),

			transactionDate:
				transactionDate,

			selectBranchName:
				$('#selectBranchName').val(),

			accountNumber:
				accountNumber,

			customerCode:
				$('#customerCode').val(),

			customerName:
				customerName,

			contactNumber:
				$('#contactNumber').val(),

			jointHolderName:
				$('#jointHolderName').val(),

			savingPlanName:
				$('#savingPlanName').val(),

			averageBalance:
				avgBalance.toFixed(2),

			transactionFor:
				$('#transactionFor').val(),

			comments:
				$('#comments').val(),

			transactionType:
				transactionType,

			transactionAmount:
				transactionAmount.toFixed(2),

			payBy:
				$('#payBy').val(),

			chequeNo:
				$('#chequeNo').val(),

			chequeDate:
				$('#chequeDate').val(),

			depositAcc1:
				$('#depositAcc1').val(),

			depositAcc2:
				$('#depositAcc2').val(),

			refNumber1:
				$('#refNumber1').val(),

			depositAcc3:
				$('#depositAcc3').val(),

			refNumber2:
				$('#refNumber2').val()
		};


		// ===== Save API =====

		$.ajax({

			url:
				"api/customersavings/savesavingaccountactivity",

			type:
				"POST",

			contentType:
				"application/json",

			data:
				JSON.stringify(accountData),

			success:
				function(response) {

					alert(
						"Transaction saved successfully"
					);


					// Update main balance
					updateMainAccountBalance(
						accountNumber,
						avgBalance
					);


					// Reload transaction table
					reloadTransactionTable(
						accountNumber
					);


					// Clear error after successful save
					$('#balanceError').text("");


					// =====================================================
					// SAVE ACCOUNT TRANSACTION
					// ONLY FOR CASH TRANSACTION
					// =====================================================

					const payBy =
						($('#payBy').val() || "")
							.toUpperCase();

					// =================================================
					// DEPOSIT = CREDIT
					// WITHDRAW = DEBIT
					// =================================================

					let creditAmount = 0;

					let debitAmount = 0;


					if (
						transactionType === "Deposit"
					) {

						creditAmount =
							Number(
								transactionAmount.toFixed(2)
							);

					}

					else if (
						transactionType === "Withdraw"
					) {

						debitAmount =
							Number(
								transactionAmount.toFixed(2)
							);
					}


					// =================================================
					// ACCOUNT TRANSACTION DATA
					// =================================================

					const accountTransactionData = {

						branchName:
							$('#selectBranchName').val() || "",

						accountCode:
							payBy,

						customerName:
							customerName,

						accountNumber:
							accountNumber,

						transactionDate:
							transactionDate,

						narration:
							"Saving Account " +
							transactionType +
							" - " +
							accountNumber +
							" - " +
							(
								$('#customerCode').val() || ""
							),

						credit:
							creditAmount,

						debit:
							debitAmount,

						transactionType:
							transactionType === "Deposit"
								?
								"SAVING_DEPOSIT"
								:
								"SAVING_WITHDRAW",

						referenceNo:
							accountNumber +
							"-" +
							transactionDate +
							"-" +
							transactionType,

						status:
							"SUCCESS",

						loanId:
							null,

						policyId:
							null,

						createdBy:
							"ADMIN"
					};


					console.log(
						"Saving Account Cash Transaction:",
						accountTransactionData
					);


					// =================================================
					// SAVE ACCOUNT TRANSACTION API
					// =================================================

					$.ajax({

						url:
							"accountManagement/saveAccountTransaction",

						type:
							"POST",

						contentType:
							"application/json",

						dataType:
							"json",

						data:
							JSON.stringify(
								accountTransactionData
							),

						success:
							function(
								accountResponse
							) {

								console.log(
									"Account Transaction Response:",
									accountResponse
								);


								if (
									accountResponse &&
									accountResponse.status === "CREATED"
								) {

									console.log(
										"Cash Book transaction saved successfully."
									);

								}

								else {

									console.warn(
										"Saving Account transaction saved, but Cash Book transaction could not be saved.",
										accountResponse
									);

									alert(
										"⚠️ Saving Account transaction saved, but Cash Book transaction could not be saved."
									);
								}
							},


						error:
							function(
								accountXhr,
								accountStatus,
								accountError
							) {

								console.error(
									"Account Transaction Error:",
									accountXhr.responseText
								);


								alert(
									"⚠️ Saving Account transaction saved, but Cash Book transaction could not be saved."
								);
							}
					});

				},


			error:
				function(
					xhr,
					status,
					error
				) {

					console.error(
						"Error saving transaction:",
						xhr.responseText
					);

					alert(
						"Failed to save transaction"
					);
				}
		});

	});

});


// =========================================
// LOAD TRANSACTION TABLE
// =========================================
function reloadTransactionTable(accountNumber) {
	$.ajax({
		type: "GET",
		url: "api/customersavings/getsavingaccountactivity",
		data: { accountNumber: accountNumber },
		dataType: "json",
		success: function(response) {

			let tbody = $('.datatable tbody');
			tbody.empty();

			if (response.data && response.data.length > 0) {

				$.each(response.data, function(index, txn) {

					let row = `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${(txn.selectBranchName || '').toUpperCase()}</td>
                            <td>${txn.transactionDate || ''}</td>
                            <td>${txn.accountNumber || ''}</td>
                            <td>${(txn.transactionType || '').toUpperCase()}</td>
                            <td>${txn.transactionAmount || ''}</td>
                            <td>${txn.averageBalance || ''}</td>
                            <td>${(txn.payBy || '').toUpperCase()}</td>
                            <td>${(txn.comments || '').toUpperCase()}</td>
                            <td>${txn.selectSavingTransactionId || ''}</td>
                            <td>${txn.createdBy || 'ADMIN'}</td>
                        </tr>
                    `;

					tbody.append(row);
				});

			} else {
				tbody.append(`<tr><td colspan="11" class="text-center">No Data Found</td></tr>`);
			}
		},
		error: function(xhr, status, error) {
			console.error("Error fetching transactions:", xhr.responseText);
			alert("Failed to load table data");
		}
	});
}

// =========================================
// UPDATE MAIN ACCOUNT BALANCE
// =========================================
function updateMainAccountBalance(accountNumber, newBalance) {

	$.ajax({
		type: "POST",
		url: "api/customersavings/updateaveragebalance",
		contentType: "application/json",
		data: JSON.stringify({
			accountNumber: accountNumber,
			balance: newBalance
		}),
		success: function(response) {
			alert(response.message || "Balance updated successfully");
		},
		error: function(xhr, status, error) {
			console.error("Error updating balance:", xhr.responseText);
			alert("Failed to update main balance");
		}
	});
}

// =========================================
// UPDATE COMMENTS DROPDOWN BASED ON TRANSACTION TYPE
// =========================================
document.getElementById("transactionType").addEventListener("change", function() {
	var transactionType = this.value;
	var commentsDropdown = document.getElementById("comments");

	// clear old options
	commentsDropdown.innerHTML = '<option value="">--SELECT--</option>';

	if (transactionType === "Deposit") {
		addOption(commentsDropdown, "BY CASH");
		addOption(commentsDropdown, "BY TRANSFER");
		addOption(commentsDropdown, "BY ONLINE");
		addOption(commentsDropdown, "BY CHEQUE");
	}
	else if (transactionType === "Withdraw") {
		addOption(commentsDropdown, "TO CASH");
		addOption(commentsDropdown, "TO TRANSFER");
		addOption(commentsDropdown, "TO CHEQUE");
	}
});

function addOption(selectBox, text) {
	var option = document.createElement("option");
	option.value = text;
	option.text = text;
	selectBox.appendChild(option);
}


document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("memberFeesTable").style.display = "none";


});

document.getElementById("transactionAmount").addEventListener("click", function(event) {
	event.stopPropagation();

	let table = document.getElementById("memberFeesTable");
	table.style.display = (table.style.display === "none" || table.style.display === "")
		? "block" : "none";
});


document.getElementById("memberFeesTable").addEventListener("click", function(event) {
	event.stopPropagation();
});


document.addEventListener("click", function() {
	document.getElementById("memberFeesTable").style.display = "none";
});


function calcOpeningFees() {

	let n2000 = (document.getElementById("qty2000").value || 0) * 2000;
	let n500 = (document.getElementById("qty500").value || 0) * 500;
	let n200 = (document.getElementById("qty200").value || 0) * 200;
	let n100 = (document.getElementById("qty100").value || 0) * 100;
	let n50 = (document.getElementById("qty50").value || 0) * 50;
	let n20 = (document.getElementById("qty20").value || 0) * 20;
	let n10 = (document.getElementById("qty10").value || 0) * 10;
	let n5 = (document.getElementById("qty5").value || 0) * 5;

	document.getElementById("res2000").innerText = n2000;
	document.getElementById("res500").innerText = n500;
	document.getElementById("res200").innerText = n200;
	document.getElementById("res100").innerText = n100;
	document.getElementById("res50").innerText = n50;
	document.getElementById("res20").innerText = n20;
	document.getElementById("res10").innerText = n10;
	document.getElementById("res5").innerText = n5;

	let total = n2000 + n500 + n200 + n100 + n50 + n20 + n10 + n5;

	document.getElementById("totalFee").innerText = total;
	document.getElementById("transactionAmount").value = total;
}