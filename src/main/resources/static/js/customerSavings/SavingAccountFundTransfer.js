//JANVI : CUSTOMER ACCOUNT NO. LIST FETCH
$(document).ready(function() {
	$.ajax({
		url: "api/reports/getApprovedSavingAccount",
		type: "GET",
		success: function(response) {
			console.log("API RESPONSE:", response);
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
				dropdown1.append('<option value="">NO ACCOUNT NUMBER FOUND</option>');
				dropdown2.append('<option value="">NO ACCOUNT NUMBER FOUND</option>');
			}
		},
		error: function() {
			alert("FAILED TO FETCH POLICYNAME.");
		}
	});
});


$('#debitAccountNumber').on('change', function() {
	let accountNumber = $(this).val();

	if (accountNumber !== "") {
		$.ajax({
			url: 'api/customersavings/getallbyaccountnumber', // PASS AS QUERY PARAM
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
					alert('NO DATA FOUND!');
					$('#debitCustomerCode').val('');
				}
			},
			error: function() {
				alert('ERROR WHILE FETCHING DATA!');
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
			url: 'api/customersavings/getallbyaccountnumber', // PASS AS QUERY PARAM
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
					alert('NO DATA FOUND!');
					$('#debitCustomerCode').val('');
				}
			},
			error: function() {
				alert('ERROR WHILE FETCHING DATA!');
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

		console.log("SENDING TRANSFER DATA:", accountData);


		/* =========================================================
		   BASIC VALIDATION
		   ========================================================= */

		if (!accountData.debitAccountNumber) {
			alert("PLEASE SELECT DEBIT ACCOUNT NUMBER");
			return;
		}

		if (!accountData.creditAccountNumber) {
			alert("PLEASE SELECT CREDIT ACCOUNT NUMBER");
			return;
		}

		if (accountData.debitAccountNumber === accountData.creditAccountNumber) {
			alert("DEBIT ACCOUNT AND CREDIT ACCOUNT CANNOT BE SAME");
			return;
		}

		if (!accountData.transferDate) {
			alert("PLEASE SELECT TRANSFER DATE");
			return;
		}

		if (!accountData.amount || parseFloat(accountData.amount) <= 0) {
			alert("PLEASE ENTER A VALID TRANSFER AMOUNT");
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


		console.log("TRANSFER REFERENCE NO:", referenceNo);


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

				console.log("TRANSFER API RESPONSE:", response);


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
					"SAVING DEBIT TRANSACTION:",
					debitTransaction
				);


				$.ajax({

					url: 'accountManagement/saveAccountTransaction',

					type: 'POST',

					contentType: 'application/json',

					data: JSON.stringify(debitTransaction),

					success: function(debitResponse) {

						console.log(
							"DEBIT TRANSACTION SAVED:",
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
							"SAVING CREDIT TRANSACTION:",
							creditTransaction
						);


						$.ajax({

							url: 'accountManagement/saveAccountTransaction',

							type: 'POST',

							contentType: 'application/json',

							data: JSON.stringify(creditTransaction),

							success: function(creditResponse) {

								console.log(
									"CREDIT TRANSACTION SAVED:",
									creditResponse
								);

								alert(
									"FUND TRANSFER SUCCESSFUL AND TRANSACTION SAVED SUCCESSFULLY."
								);

								location.reload();

							},

							error: function(xhr, status, error) {

								console.error(
									"CREDIT TRANSACTION ERROR:",
									xhr.responseText
								);

								let errorMessage =
									xhr.responseJSON?.message ||
									"CREDIT TRANSACTION COULD NOT BE SAVED.";

								alert(errorMessage.toUpperCase());

							}

						});

					},

					error: function(xhr, status, error) {

						console.error(
							"DEBIT TRANSACTION ERROR:",
							xhr.responseText
						);

						let errorMessage =
							xhr.responseJSON?.message ||
							"DEBIT TRANSACTION COULD NOT BE SAVED.";

						alert(errorMessage.toUpperCase());

					}

				});

			},

			error: function(xhr, status, error) {

				console.error("FUND TRANSFER ERROR:", xhr.responseText);
				console.error("HTTP STATUS:", xhr.status);
				console.error("STATUS TEXT:", status);
				console.error("ERROR:", error);

				let errorMessage = "TRANSFER FAILED.";

				if (xhr.responseJSON && xhr.responseJSON.message) {

					errorMessage = xhr.responseJSON.message;

				} else if (xhr.responseText) {

					errorMessage = xhr.responseText;

				}
				alert("LLL");
				alert(errorMessage.toUpperCase());
			}

		});

	});
});