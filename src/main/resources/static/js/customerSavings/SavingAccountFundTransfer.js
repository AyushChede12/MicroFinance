//janvi : Customer Account no. list fetch
$(document).ready(function() {
	$.ajax({
		url: "api/reports/getApprovedSavingAccount",
		type: "GET",
		success: function(response) {
			console.log("API response:", response);
			var dropdown1 = $('#debitAccountNumber');
			var dropdown2 = $('#creditAccountNumber');
			dropdown1.empty();
			dropdown1.append('<option value="">--SELECT ACCOUNT NO--</option>');
			dropdown2.empty();
			dropdown2.append('<option value="">--SELECT ACCOUNT NO--</option>');


			if (response.status === "OK" && response.data) {
				$.each(response.data, function(index, item) {
					dropdown1.append('<option value="' + item.accountNumber + '">' + item.accountNumber + '</option>');
					dropdown2.append('<option value="' + item.accountNumber + '">' + item.accountNumber + '</option>');
				});
			} else {
				dropdown1.append('<option value="">No Account Number found</option>');
				dropdown2.append('<option value="">No Account Number found</option>');
			}
		},
		error: function() {
			alert("Failed to fetch Policyname.");
		}
	});
});


$('#debitAccountNumber').on('change', function() {
	let accountNumber = $(this).val();

	if (accountNumber !== "") {
		$.ajax({
			url: 'api/customersavings/getallbyaccountnumber', // Pass as query param
			type: 'GET',
			data: { accountNumber: accountNumber },
			success: function(response) {
				if (response.data && response.data.length > 0) {
					let customer = response.data[0];
					let branch = "";

					if (customer.branchName != null) {
						branch = customer.branchName.branchName || "";
					}
					$('#debitCustomerCode').val(customer.selectByCustomer);
					$('#debitAccountBranch').val(branch);
					$('#debitAverageBalance').val(customer.balance);
					$('#debitContactNumber').val(customer.contactNumber);
				} else {
					alert('No data found!');
					$('#debitCustomerCode').val('');
				}
			},
			error: function() {
				alert('Error while fetching data!');
				$('#debitCustomerCode').val('');
			}
		});
	} else {
		$('#debitCustomerCode').val('');
	}
});

$('#creditAccountNumber').on('change', function() {
	let accountNumber = $(this).val();

	if (accountNumber !== "") {
		$.ajax({
			url: 'api/customersavings/getallbyaccountnumber', // Pass as query param
			type: 'GET',
			data: { accountNumber: accountNumber },
			success: function(response) {
				if (response.data && response.data.length > 0) {
					let customer = response.data[0];
					let branch = "";

					if (customer.branchName != null) {
						branch = customer.branchName.branchName || "";
					}
					$('#creditCustomerCode').val(customer.selectByCustomer);
					$('#creditAccountBranch').val(branch);
					$('#creditAverageBalance').val(customer.balance);
					$('#creditContactNumber').val(customer.contactNumber);
				} else {
					alert('No data found!');
					$('#debitCustomerCode').val('');
				}
			},
			error: function() {
				alert('Error while fetching data!');
				$('#debitCustomerCode').val('');
			}
		});
	} else {
		$('#debitCustomerCode').val('');
	}
});

$(document).ready(function() {
	$('#saveBtn').click(function(e) {

		e.preventDefault();

		const accountData = {

			debitAccountNumber: $('#debitAccountNumber').val(),

			debitCustomerCode: $('#debitCustomerCode').val(),

			debitAccountBranch: $('#debitAccountBranch').val(),

			debitAverageBalance: $('#debitAverageBalance').val(),

			debitContactNumber: $('#debitContactNumber').val(),

			creditAccountNumber: $('#creditAccountNumber').val(),

			creditCustomerCode: $('#creditCustomerCode').val(),

			creditAccountBranch: $('#creditAccountBranch').val(),

			creditAverageBalance: $('#creditAverageBalance').val(),

			creditContactNumber: $('#creditContactNumber').val(),

			transferDate: $('#transferDate').val(),

			amount: $('#amount').val(),

			comment: $('#comment').val()

		};

		console.log("Sending Transfer Data:", accountData);


		/* =========================================================
		   BASIC VALIDATION
		   ========================================================= */

		if (!accountData.debitAccountNumber) {
			alert("Please select Debit Account Number");
			return;
		}

		if (!accountData.creditAccountNumber) {
			alert("Please select Credit Account Number");
			return;
		}

		if (accountData.debitAccountNumber === accountData.creditAccountNumber) {
			alert("Debit Account and Credit Account cannot be same");
			return;
		}

		if (!accountData.transferDate) {
			alert("Please select Transfer Date");
			return;
		}

		if (!accountData.amount || parseFloat(accountData.amount) <= 0) {
			alert("Please enter a valid transfer amount");
			return;
		}


		const amount = parseFloat(accountData.amount);


		/* =========================================================
		   GENERATE COMMON TRANSFER REFERENCE NUMBER
		   ========================================================= */

		const now = new Date();

		const referenceNo =
			"FT-" +
			now.getFullYear() +
			String(now.getMonth() + 1).padStart(2, '0') +
			String(now.getDate()).padStart(2, '0') +
			"-" +
			String(now.getHours()).padStart(2, '0') +
			String(now.getMinutes()).padStart(2, '0') +
			String(now.getSeconds()).padStart(2, '0');


		console.log("Transfer Reference No:", referenceNo);


		/* =========================================================
		   STEP 1
		   EXISTING FUND TRANSFER API
		   ========================================================= */

		$.ajax({

			url: 'api/customersavings/transferAmount',

			type: 'POST',

			contentType: 'application/json',

			data: JSON.stringify(accountData),

			success: function(response) {

				console.log("Transfer API Response:", response);


				/* =====================================================
				   STEP 2
				   SAVE DEBIT ACCOUNT TRANSACTION
				   ===================================================== */

				const debitTransaction = {

					branchName: accountData.debitAccountBranch,

					accountCode: "ONLINE",

					customerName: "",

					accountNumber: accountData.debitAccountNumber,

					transactionDate: accountData.transferDate,

					narration: accountData.comment
						? accountData.comment
						: "FUND TRANSFER TO " + accountData.creditAccountNumber,

					credit: 0.0,

					debit: amount,

					transactionType: "TRANSFER",

					referenceNo: referenceNo,

					status: "SUCCESS",

					loanId: null,

					policyId: null,

					createdBy: null

				};


				console.log(
					"Saving Debit Transaction:",
					debitTransaction
				);


				$.ajax({

					url: 'accountManagement/saveAccountTransaction',

					type: 'POST',

					contentType: 'application/json',

					data: JSON.stringify(debitTransaction),

					success: function(debitResponse) {

						console.log(
							"Debit Transaction Saved:",
							debitResponse
						);


						/* =================================================
						   STEP 3
						   SAVE CREDIT ACCOUNT TRANSACTION
						   ================================================= */

						const creditTransaction = {

							branchName: accountData.creditAccountBranch,

							accountCode: accountData.creditCustomerCode,

							customerName: "",

							accountNumber: accountData.creditAccountNumber,

							transactionDate: accountData.transferDate,

							narration: accountData.comment
								? accountData.comment
								: "FUND TRANSFER FROM " + accountData.debitAccountNumber,

							credit: amount,

							debit: 0.0,

							transactionType: "TRANSFER",

							referenceNo: referenceNo,

							status: "SUCCESS",

							loanId: null,

							policyId: null,

							createdBy: null

						};

						console.log(
							"Saving Credit Transaction:",
							creditTransaction
						);


						$.ajax({

							url: 'accountManagement/saveAccountTransaction',

							type: 'POST',

							contentType: 'application/json',

							data: JSON.stringify(creditTransaction),

							success: function(creditResponse) {

								console.log(
									"Credit Transaction Saved:",
									creditResponse
								);

								alert(
									"Fund Transfer successful and transaction saved successfully."
								);

								location.reload();

							},

							error: function(xhr, status, error) {

								console.error(
									"Credit Transaction Error:",
									xhr.responseText
								);

								let errorMessage =
									xhr.responseJSON?.message ||
									"Credit transaction could not be saved.";

								alert(errorMessage);

							}

						});

					},

					error: function(xhr, status, error) {

						console.error(
							"Debit Transaction Error:",
							xhr.responseText
						);

						let errorMessage =
							xhr.responseJSON?.message ||
							"Debit transaction could not be saved.";

						alert(errorMessage);

					}

				});

			},

			error: function(xhr, status, error) {

				console.error("Fund Transfer Error:", xhr.responseText);
				console.error("HTTP Status:", xhr.status);
				console.error("Status Text:", status);
				console.error("Error:", error);

				let errorMessage = "Transfer failed.";

				if (xhr.responseJSON && xhr.responseJSON.message) {

					errorMessage = xhr.responseJSON.message;

				} else if (xhr.responseText) {

					errorMessage = xhr.responseText;

				}
alert("lll");
				alert(errorMessage);
			}

		});

	});
});


