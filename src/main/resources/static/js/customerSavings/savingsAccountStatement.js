$(document).ready(function() {
	$.ajax({
		url: "api/reports/getApprovedSavingAccount",
		type: "GET",
		success: function(response) {
			console.log("API response:", response);
			var dropdown1 = $('#accountNumber');
			dropdown1.empty();
			dropdown1.append('<option value="">--SELECT ACCOUNT NO--</option>');

			if (response.status === "OK" && response.data) {
				$.each(response.data, function(index, item) {
					dropdown1.append('<option value="' + item.accountNumber + '">' + item.accountNumber + '</option>');
				});
			} else {
				dropdown1.append('<option value="">No Account Number found</option>');
			}
		},
		error: function() {
			alert("Failed to fetch accountNumber.");
		}
	});
});

//janvi fetch by account number
//fetch saving account details by account number
$(document).ready(function() {
	$('#searchByAccNo').click(function() {
		let accountNumber = $('#accountNumber').val().trim();

		if (accountNumber === "") {
			alert("Please select an account number first.");
			return;
		}

		// Disable button and show loading state
		$('#searchByAccNo').prop('disabled', true).text('Searching...');

		// Fetch customer details
		$.ajax({
			url: 'api/customersavings/getallbyaccountnumber',
			type: 'GET',
			data: { accountNumber: accountNumber },
			success: function(response) {
				console.log("Customer Details Response:", response);

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
					alert('No customer data found.');
				}
			},
			error: function(xhr) {
				console.error("Customer fetch error:", xhr);
				alert('Error fetching customer data. Maybe account is not approved.');
				if (typeof clearAccountForm === 'function') {
					clearAccountForm(); // Optional, only if you have defined this
				}
			},
			complete: function() {
				// Re-enable button after customer fetch
				$('#searchByAccNo').prop('disabled', false).text('Search');
			}
		});

		// Fetch account transaction activity
		$.ajax({
			url: "api/customersavings/getsavingaccountactivity",
			type: "GET",
			data: { accountNumber: accountNumber },
			success: function(response) {

				if (response.status && response.status.toUpperCase() === "OK") {

					let data = response.data;
					let tableBody = $("#tableSavingAcc");
					tableBody.empty();

					// 🔴 IMPORTANT: Opening Balance
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
					alert("No transactions found.");
					$("#tableSavingAcc").empty();
				}
			},
			error: function() {
				alert("Error fetching transaction data.");
			}
		});

	});
});
