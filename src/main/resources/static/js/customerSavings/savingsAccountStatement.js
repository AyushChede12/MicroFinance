$(document).ready(function() {
	$.ajax({
		url: "api/reports/getApprovedSavingAccount",
		type: "GET",
		success: function(response) {
			console.log("API RESPONSE:", response);
			var dropdown1 = $('#accountNumber');
			dropdown1.empty();
			dropdown1.append('<option value="">--SELECT ACCOUNT NO--</option>');

			if (response.status === "OK" && response.data) {
				$.each(response.data, function(index, item) {
					dropdown1.append('<option value="' + item.accountNumber + '">' + item.accountNumber + '</option>');
				});
			} else {
				dropdown1.append('<option value="">NO ACCOUNT NUMBER FOUND</option>');
			}
		},
		error: function() {
			alert("FAILED TO FETCH ACCOUNTNUMBER.");
		}
	});
});

//JANVI FETCH BY ACCOUNT NUMBER
//FETCH SAVING ACCOUNT DETAILS BY ACCOUNT NUMBER
$(document).ready(function() {
	$('#searchByAccNo').click(function() {
		let accountNumber = $('#accountNumber').val().trim();

		if (accountNumber === "") {
			alert("PLEASE SELECT AN ACCOUNT NUMBER FIRST.");
			return;
		}

		// DISABLE BUTTON AND SHOW LOADING STATE
		$('#searchByAccNo').prop('disabled', true).text('SEARCHING...');

		// FETCH CUSTOMER DETAILS
		$.ajax({
			url: 'api/customersavings/getallbyaccountnumber',
			type: 'GET',
			data: { accountNumber: accountNumber },
			success: function(response) {
				console.log("CUSTOMER DETAILS RESPONSE:", response);

				if (response.data && response.data.length > 0) {
					let customer = response.data[0];
					let branch = "";

					if (customer.branchName != null) {
						branch = customer.branchName.branchName || "";
					}

					$('#accountNoDisplay').text(customer.accountNumber || '');
					$('#memberName').text((customer.enterCustomerName || '').toUpperCase());
					$('#relativeDetails').text(customer.familyDetails || '');
					$('#address').text((customer.state || '').toUpperCase());
					$('#opDate').text(customer.openingDate || '');
					$('#selectMember').text(customer.selectByCustomer || '');
					$('#modeOfOp').text((customer.operationType || '').toUpperCase());
					$('#BranchName').text(branch.toUpperCase() || '');
				} else {
					alert('NO CUSTOMER DATA FOUND.');
				}
			},
			error: function(xhr) {
				console.error("CUSTOMER FETCH ERROR:", xhr);
				alert('ERROR FETCHING CUSTOMER DATA. MAYBE ACCOUNT IS NOT APPROVED.');
				if (typeof clearAccountForm === 'function') {
					clearAccountForm(); // OPTIONAL, ONLY IF YOU HAVE DEFINED THIS
				}
			},
			complete: function() {
				// RE-ENABLE BUTTON AFTER CUSTOMER FETCH
				$('#searchByAccNo').prop('disabled', false).text('SEARCH');
			}
		});

		// FETCH ACCOUNT TRANSACTION ACTIVITY
		$.ajax({
			url: "api/customersavings/getsavingaccountactivity",
			type: "GET",
			data: { accountNumber: accountNumber },
			success: function(response) {

				if (response.status && response.status.toUpperCase() === "OK") {

					let data = response.data;
					let tableBody = $("#tableSavingAcc");
					tableBody.empty();

					// 🔴 IMPORTANT: OPENING BALANCE
					let runningBalance = parseFloat(data[0].openingBalance || 0);

					data.forEach((item) => {

						let credit = 0.00;
						let debit = 0.00;

						if (item.transactionType) {
							if (item.transactionType.toUpperCase() === "DEPOSIT") {
								credit = parseFloat(item.transactionAmount || 0);
								runningBalance += credit;
							}
							else if (item.transactionType.toUpperCase() === "WITHDRAW") {
								debit = parseFloat(item.transactionAmount || 0);
								runningBalance -= debit;
							}
						}

						let row = `
						<tr>
							<td>${item.accountNumber || ''}</td>
							<td>${item.transactionDate || ''}</td>
							<td style="color:green;">${credit.toFixed(2)}</td>
							<td style="color:red;">${debit.toFixed(2)}</td>
							<td>${runningBalance.toFixed(2)}</td>
							<td>${item.payBy || ''}</td>
							<td>${(item.selectBranchName || '').toUpperCase()}</td>
							<td>${(item.comments || '').toUpperCase()}</td>
						</tr>`;

						tableBody.append(row);
					});

				} else {
					alert("NO TRANSACTIONS FOUND.");
					$("#tableSavingAcc").empty();
				}
			},
			error: function() {
				alert("ERROR FETCHING TRANSACTION DATA.");
			}
		});

	});
});