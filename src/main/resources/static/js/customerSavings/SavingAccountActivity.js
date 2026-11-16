/**
 * SavingAccountActivity.js
 * Comprehensive client-side logic for Savings & Current Account Transactions
 * (Deposit & Withdrawal), Running Balance Synchronization, Cash Denomination Calculator,
 * and Transaction Ledger Audit Trail.
 * Everything strictly in UPPERCASE.
 */

let currentSelectedAccount = null;

$(document).ready(function() {
	// Force all text input typing to UPPERCASE
	$(document).on('input', 'input[type="text"], textarea', function() {
		this.value = this.value.toUpperCase();
	});

	// Default transaction date to today
	if (!$('#transactionDate').val()) {
		const today = new Date().toISOString().split('T')[0];
		$('#transactionDate').val(today);
	}

	// Load Account Numbers Dropdown
	loadAccountNumberDropdown();

	// Payment mode change listener
	$('#payBy').on('change', handlePaymentModeChange);
	handlePaymentModeChange();

	// Transaction type change listener
	$('#transactionType').on('change', handleTransactionTypeChange);
	handleTransactionTypeChange();

	// Account Number selection listener
	$('#accountNumber').on('change', handleAccountSelection);

	// Denomination calculator listeners
	$('#btnToggleDenomination').on('click', function(e) {
		e.stopPropagation();
		$('#memberFeesTable').toggle();
	});

	$('#btnCloseDenomination').on('click', function(e) {
		e.stopPropagation();
		$('#memberFeesTable').hide();
	});

	$('#memberFeesTable').on('click', function(e) {
		e.stopPropagation();
	});

	$(document).on('click', function() {
		$('#memberFeesTable').hide();
	});

	$('#btnApplyDenomination').on('click', function(e) {
		e.preventDefault();
		const total = parseFloat($('#totalFee').text()) || 0;
		if (total > 0) {
			$('#transactionAmount').val(total.toFixed(2));
			$('#memberFeesTable').hide();
			validateLiveBalance();
		} else {
			if (typeof Swal !== 'undefined') {
				Swal.fire({ icon: 'warning', title: 'DENOMINATION EMPTY', text: 'PLEASE ENTER NOTE QUANTITIES BEFORE APPLYING.' });
			} else {
				alert('PLEASE ENTER NOTE QUANTITIES BEFORE APPLYING.');
			}
		}
	});

	// Live balance validation as user types amount
	$('#transactionAmount').on('input', validateLiveBalance);

	// Save button click
	$('#saveBtn').on('click', submitTransaction);

	// Reset button click
	$('#resetBtn').on('click', clearAccountForm);

	// Refresh table button click
	$('#btnRefreshTable').on('click', function() {
		const accNo = $('#accountNumber').val();
		if (accNo) {
			reloadTransactionTable(accNo);
		} else {
			if (typeof Swal !== 'undefined') {
				Swal.fire({ icon: 'info', title: 'SELECT ACCOUNT', text: 'PLEASE SELECT AN ACCOUNT NUMBER FIRST.' });
			} else {
				alert('PLEASE SELECT AN ACCOUNT NUMBER FIRST.');
			}
		}
	});
});

// ==========================================
// 1. LOAD ACCOUNT NUMBERS DROPDOWN
// ==========================================
function loadAccountNumberDropdown() {
	const $dropdown = $('#accountNumber');
	$dropdown.empty().append('<option value="">-- LOADING ACCOUNTS... --</option>');

	$.ajax({
		url: "api/customersavings/getAllSavingAccountData",
		type: "GET",
		dataType: "json",
		success: function(response) {
			$dropdown.empty().append('<option value="">-- SELECT ACCOUNT NUMBER --</option>');
			const accounts = (response && response.data && Array.isArray(response.data)) ? response.data : [];

			if (accounts.length > 0) {
				accounts.forEach(function(acc) {
					if (acc.accountNumber) {
						const accNo = acc.accountNumber.trim().toUpperCase();
						const custName = (acc.enterCustomerName || 'CUSTOMER').trim().toUpperCase();
						const accType = ((acc.typeofaccount || acc.accountType || 'SAVING') + '').toUpperCase();
						const label = accNo + " - " + custName + " (" + accType + ")";
						$dropdown.append('<option value="' + accNo + '">' + label + '</option>');
					}
				});
			} else {
				fallbackCustomerApproved();
			}
		},
		error: function() {
			fallbackCustomerApproved();
		}
	});
}

function fallbackCustomerApproved() {
	const $dropdown = $('#accountNumber');
	$.ajax({
		url: "api/customermanagement/approved",
		type: "GET",
		dataType: "json",
		success: function(response) {
			$dropdown.empty().append('<option value="">-- SELECT ACCOUNT NUMBER --</option>');
			const custs = (response && response.data && Array.isArray(response.data)) ? response.data : [];
			custs.forEach(function(c) {
				const accNo = (c.accountNumber || c.memberCode || '').trim().toUpperCase();
				if (accNo) {
					const name = [c.firstName, c.lastName].filter(Boolean).join(' ').trim().toUpperCase() || 'MEMBER';
					$dropdown.append('<option value="' + accNo + '">' + accNo + " - " + name + '</option>');
				}
			});
		},
		error: function() {
			$dropdown.empty().append('<option value="">-- NO ACCOUNTS AVAILABLE --</option>');
		}
	});
}

// ==========================================
// 2. ACCOUNT SELECTION HANDLER
// ==========================================
function handleAccountSelection() {
	const accountNumber = $(this).val().trim().toUpperCase();

	if (!accountNumber) {
		clearAccountForm();
		return;
	}

	$.ajax({
		url: "api/customersavings/getallbyaccountnumber",
		type: "GET",
		data: { accountNumber: accountNumber },
		dataType: "json",
		success: function(response) {
			if ((response.status === "OK" || response.status === "FOUND") && response.data && response.data.length > 0) {
				const customer = response.data[0];
				currentSelectedAccount = customer;

				let branch = "";
				if (customer.branchName != null) {
					branch = typeof customer.branchName === 'object'
						? (customer.branchName.branchName || "")
						: customer.branchName;
				}

				const custCode = (customer.selectByCustomer || '').toUpperCase();
				const custName = (customer.enterCustomerName || '').toUpperCase();
				const contact = customer.contactNumber || '';
				const isCurrentAcc = (customer.typeofaccount === 'currentaccount' || customer.accountType === 'CURRENT');
				const plan = isCurrentAcc ? 'CURRENT ACCOUNT' : 'SAVING ACCOUNT';
				const balance = (customer.balance !== undefined && customer.balance !== null && customer.balance !== "")
					? parseFloat(customer.balance).toFixed(2)
					: (parseFloat(customer.openingFees) || 0).toFixed(2);

				$('#customerCode').val(custCode);
				$('#customerName').val(custName);
				$('#contactNumber').val(contact);
				$('#jointHolderName').val(joint);
				$('#savingPlanName').val(plan);
				$('#averageBalance').val(balance);
				$('#selectBranchName').val(branch.toUpperCase());

				// Update Live Banner
				$('#bannerCustomerName').text(custName || 'CUSTOMER');
				$('#bannerAccountNo').text(accountNumber);
				$('#bannerCustomerCode').text(custCode || 'N/A');
				$('#bannerBranch').text(branch.toUpperCase() || 'MAIN');
				$('#bannerPlan').text(plan);
				$('#bannerBalance').text('₹ ' + parseFloat(balance).toLocaleString('en-IN', { minimumFractionDigits: 2 }));
				$('#accOverviewBanner').slideDown(250);

				// Reload Transaction History
				reloadTransactionTable(accountNumber);

			} else {
				if (typeof Swal !== 'undefined') {
					Swal.fire({ icon: 'warning', title: 'ACCOUNT NOT FOUND', text: 'NO ACCOUNT FOUND FOR: ' + accountNumber });
				} else {
					alert('NO ACCOUNT FOUND FOR: ' + accountNumber);
				}
				clearAccountForm();
			}
		},
		error: function() {
			if (typeof Swal !== 'undefined') {
				Swal.fire({ icon: 'error', title: 'ERROR', text: 'UNABLE TO FETCH ACCOUNT DETAILS FROM SERVER.' });
			} else {
				alert('UNABLE TO FETCH ACCOUNT DETAILS FROM SERVER.');
			}
			clearAccountForm();
		}
	});
}

// ==========================================
// 3. PAYMENT MODE & TRANSACTION TYPE
// ==========================================
function handlePaymentModeChange() {
	const mode = $('#payBy').val();

	$('#chequeInputs').hide();
	$('#onlineInputs').hide();
	$('#neftInputs').hide();

	if (mode === 'Cheque') {
		$('#chequeInputs').slideDown(200);
		if (!$('#chequeDate').val()) {
			$('#chequeDate').val(new Date().toISOString().split('T')[0]);
		}
	} else if (mode === 'Online') {
		$('#onlineInputs').slideDown(200);
	} else if (mode === 'NEFT') {
		$('#neftInputs').slideDown(200);
	}
}

function handleTransactionTypeChange() {
	const type = $('#transactionType').val();
	const $comments = $('#comments');
	$comments.empty().append('<option value="">-- SELECT NARRATION --</option>');

	if (type === 'Deposit') {
		$comments.append('<option value="BY CASH" selected>BY CASH DEPOSIT</option>');
		$comments.append('<option value="BY TRANSFER">BY FUND TRANSFER</option>');
		$comments.append('<option value="BY ONLINE / UPI">BY ONLINE / UPI PAYMENT</option>');
		$comments.append('<option value="BY CHEQUE">BY CHEQUE CLEARANCE</option>');
		$comments.append('<option value="BY LOAN DISBURSEMENT">BY LOAN DISBURSEMENT CREDIT</option>');
		$comments.append('<option value="INTEREST CREDIT">BY SAVINGS INTEREST CREDIT</option>');
		if (!$('#transactionFor').val() || $('#transactionFor').val().startsWith('WITHDRAW')) {
			$('#transactionFor').val('CASH DEPOSIT');
		}
	} else if (type === 'Withdraw') {
		$comments.append('<option value="TO CASH" selected>TO CASH WITHDRAWAL</option>');
		$comments.append('<option value="TO TRANSFER">TO FUND TRANSFER DEBIT</option>');
		$comments.append('<option value="TO CHEQUE">TO CHEQUE PAYMENT</option>');
		$comments.append('<option value="TO LOAN EMI RECOVERY">TO LOAN EMI RECOVERY</option>');
		$comments.append('<option value="SERVICE CHARGES">TO ACCOUNT SERVICE CHARGES</option>');
		if (!$('#transactionFor').val() || $('#transactionFor').val().startsWith('CASH DEPOSIT')) {
			$('#transactionFor').val('CASH WITHDRAWAL');
		}
	}

	validateLiveBalance();
}

// ==========================================
// 4. LIVE BALANCE VALIDATION
// ==========================================
function validateLiveBalance() {
	const tType = $('#transactionType').val();
	const amtStr = $('#transactionAmount').val();
	const currentBal = parseFloat($('#averageBalance').val()) || 0;
	const amt = parseFloat(amtStr) || 0;

	$('#balanceError').text('');

	if (tType === 'Withdraw' && amt > 0) {
		if (amt > currentBal) {
			$('#balanceError').text('* INSUFFICIENT BALANCE FOR WITHDRAWAL (CURRENT: ₹ ' + currentBal.toFixed(2) + ')');
			return false;
		}
	}
	return true;
}

// ==========================================
// 5. SUBMIT TRANSACTION
// ==========================================
function submitTransaction(e) {
	e.preventDefault();
	$('#balanceError').text('');

	const accountNumber = ($('#accountNumber').val() || '').trim().toUpperCase();
	const transactionDate = $('#transactionDate').val();
	const transactionType = $('#transactionType').val();
	const transactionAmount = parseFloat($('#transactionAmount').val());
	let currentBalance = parseFloat($('#averageBalance').val()) || 0;
	const payBy = ($('#payBy').val() || 'Cash').trim();

	// Validations
	if (!accountNumber) {
		showAlert('PLEASE SELECT AN ACCOUNT NUMBER', 'warning');
		return;
	}
	if (!transactionDate) {
		showAlert('TRANSACTION DATE IS REQUIRED', 'warning');
		return;
	}
	if (!transactionType) {
		showAlert('PLEASE SELECT TRANSACTION TYPE (DEPOSIT OR WITHDRAWAL)', 'warning');
		return;
	}
	if (isNaN(transactionAmount) || transactionAmount <= 0) {
		showAlert('PLEASE ENTER A VALID TRANSACTION AMOUNT GREATER THAN ZERO', 'warning');
		return;
	}

	// Calculate resulting balance
	let newBalance = currentBalance;
	if (transactionType === 'Deposit') {
		newBalance += transactionAmount;
	} else if (transactionType === 'Withdraw') {
		if (transactionAmount > currentBalance) {
			$('#balanceError').text('* INSUFFICIENT BALANCE FOR WITHDRAWAL');
			showAlert('INSUFFICIENT BALANCE! CURRENT AVAILABLE: ₹ ' + currentBalance.toFixed(2), 'error');
			return;
		}
		newBalance -= transactionAmount;
	}

	// Validate Mode Specific Fields
	if (payBy === 'Cheque') {
		if (!$('#chequeNo').val().trim() || !$('#chequeDate').val() || !$('#depositAcc1').val().trim()) {
			showAlert('PLEASE FILL ALL CHEQUE CLEARANCE DETAILS', 'warning');
			return;
		}
	} else if (payBy === 'Online') {
		if (!$('#refNumber1').val().trim()) {
			showAlert('ONLINE UPI / REFERENCE NUMBER IS REQUIRED', 'warning');
			return;
		}
	} else if (payBy === 'NEFT') {
		if (!$('#refNumber2').val().trim()) {
			showAlert('NEFT / RTGS UTR NUMBER IS REQUIRED', 'warning');
			return;
		}
	}

	const customerName = ($('#customerName').val() || '').trim().toUpperCase();

	const accountData = {
		selectSavingTransactionId: ($('#selectSavingTransactionId').val() || '').trim().toUpperCase(),
		transactionDate: transactionDate,
		selectBranchName: ($('#selectBranchName').val() || '').trim().toUpperCase(),
		accountNumber: accountNumber,
		customerCode: ($('#customerCode').val() || '').trim().toUpperCase(),
		customerName: customerName,
		contactNumber: ($('#contactNumber').val() || '').trim(),
		jointHolderName: ($('#jointHolderName').val() || '').trim().toUpperCase(),
		savingPlanName: ($('#savingPlanName').val() || '').trim().toUpperCase(),
		averageBalance: newBalance.toFixed(2),
		transactionFor: ($('#transactionFor').val() || '').trim().toUpperCase(),
		comments: ($('#comments').val() || '').trim().toUpperCase(),
		transactionType: transactionType.toUpperCase(),
		transactionAmount: transactionAmount.toFixed(2),
		payBy: payBy.toUpperCase(),
		chequeNo: ($('#chequeNo').val() || '').trim().toUpperCase(),
		chequeDate: $('#chequeDate').val() || '',
		depositAcc1: ($('#depositAcc1').val() || '').trim().toUpperCase(),
		depositAcc2: ($('#depositAcc2').val() || '').trim().toUpperCase(),
		depositAcc3: ($('#depositAcc3').val() || '').trim().toUpperCase(),
		refNumber1: ($('#refNumber1').val() || '').trim().toUpperCase(),
		refNumber2: ($('#refNumber2').val() || '').trim().toUpperCase(),
		createdBy: (sessionStorage.getItem("username") || "ADMIN").toUpperCase()
	};

	const $btn = $('#saveBtn');
	$btn.prop('disabled', true).html('<i class="bi bi-hourglass-split"></i> PROCESSING TRANSACTION...');

	$.ajax({
		url: "api/customersavings/savesavingaccountactivity",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(accountData),
		success: function(response) {
			$btn.prop('disabled', false).html('<i class="bi bi-check-circle-fill"></i> POST TRANSACTION');

			if (response && (response.status === 'CREATED' || response.status === 'OK')) {
				const successMsg = "TRANSACTION POSTED SUCCESSFULLY! NEW BALANCE: ₹ " + newBalance.toFixed(2);
				showAlert(successMsg, 'success');

				// Update fields and banner with new balance
				$('#averageBalance').val(newBalance.toFixed(2));
				$('#bannerBalance').text('₹ ' + newBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 }));

				// Generate new transaction ID for next transaction
				const prefix = "TXN";
				const now = new Date();
				const pad = (n) => n.toString().padStart(2, '0');
				const ts = now.getFullYear() + pad(now.getMonth()+1) + pad(now.getDate()) + pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds());
				const rnd = Math.floor(1000 + Math.random() * 9000);
				$('#selectSavingTransactionId').val(prefix + ts + rnd);

				// Reset transaction amount and denomination sheet
				$('#transactionAmount').val('');
				resetDenominationSheet();

				// Reload table
				reloadTransactionTable(accountNumber);

				// Post Account Transaction for Cash Book if PayBy is Cash
				if (payBy.toUpperCase() === 'CASH') {
					postCashBookTransaction(accountNumber, customerName, transactionDate, transactionType, transactionAmount);
				}

			} else {
				showAlert(response.message || "FAILED TO SAVE TRANSACTION.", 'error');
			}
		},
		error: function(xhr) {
			$btn.prop('disabled', false).html('<i class="bi bi-check-circle-fill"></i> POST TRANSACTION');
			showAlert("SERVER ERROR OCCURRED WHILE PROCESSING TRANSACTION.", 'error');
		}
	});
}

// Cash Book Synchronization
function postCashBookTransaction(accountNumber, customerName, transactionDate, transactionType, transactionAmount) {
	const isDeposit = (transactionType === 'Deposit' || transactionType === 'DEPOSIT');
	const accountTransactionData = {
		branchName: ($('#selectBranchName').val() || '').trim().toUpperCase(),
		accountCode: "CASH",
		customerName: customerName,
		accountNumber: accountNumber,
		transactionDate: transactionDate,
		narration: "SAVING ACCOUNT " + transactionType.toUpperCase() + " - " + accountNumber + " - " + ($('#customerCode').val() || ''),
		credit: isDeposit ? Number(transactionAmount.toFixed(2)) : 0,
		debit: !isDeposit ? Number(transactionAmount.toFixed(2)) : 0,
		transactionType: isDeposit ? "SAVING_DEPOSIT" : "SAVING_WITHDRAW",
		referenceNo: accountNumber + "-" + transactionDate + "-" + transactionType.toUpperCase(),
		status: "SUCCESS",
		createdBy: (sessionStorage.getItem("username") || "ADMIN").toUpperCase()
	};

	$.ajax({
		url: "accountManagement/saveAccountTransaction",
		type: "POST",
		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify(accountTransactionData),
		success: function() {
			console.log("CASH BOOK SYNCHRONIZATION SUCCESSFUL.");
		},
		error: function(err) {
			console.warn("CASH BOOK TRANSACTION RECORD FAILED (NON-FATAL):", err);
		}
	});
}

// ==========================================
// 6. RELOAD TRANSACTION TABLE
// ==========================================
function reloadTransactionTable(accountNumber) {
	const $tbody = $('#tbody');
	$tbody.html('<tr><td colspan="11" class="text-center py-3 text-muted"><i class="bi bi-hourglass-split"></i> LOADING TRANSACTIONS...</td></tr>');

	$.ajax({
		type: "GET",
		url: "api/customersavings/getsavingaccountactivity",
		data: { accountNumber: accountNumber },
		dataType: "json",
		success: function(response) {
			$tbody.empty();
			const transactions = (response && response.data && Array.isArray(response.data)) ? response.data : [];

			if (transactions.length > 0) {
				$('#recordCount').text(transactions.length + ' TRANSACTIONS');

				transactions.forEach(function(txn, index) {
					const tTypeRaw = (txn.transactionType || '').trim().toUpperCase();
					const isCredit = (tTypeRaw.includes('DEPOSIT') || tTypeRaw.includes('CREDIT'));

					let typeBadge = '';
					let amountFormatted = '';

					if (isCredit) {
						typeBadge = '<span class="badge-credit"><i class="bi bi-arrow-down-left"></i> DEPOSIT</span>';
						amountFormatted = '<span class="text-success fw-bold">+₹ ' + (parseFloat(txn.transactionAmount) || 0).toLocaleString('en-IN', {minimumFractionDigits: 2}) + '</span>';
					} else {
						typeBadge = '<span class="badge-debit"><i class="bi bi-arrow-up-right"></i> WITHDRAWAL</span>';
						amountFormatted = '<span class="text-danger fw-bold">-₹ ' + (parseFloat(txn.transactionAmount) || 0).toLocaleString('en-IN', {minimumFractionDigits: 2}) + '</span>';
					}

					const balFormatted = (parseFloat(txn.averageBalance) || 0).toLocaleString('en-IN', {minimumFractionDigits: 2});
					const txnId = (txn.selectSavingTransactionId || 'TXN-' + txn.id).toUpperCase();
					const branch = (txn.selectBranchName || '').toUpperCase();
					const payMode = (txn.payBy || 'CASH').toUpperCase();
					const comments = (txn.comments || txn.transactionFor || '--').toUpperCase();
					const createdBy = (txn.createdBy || 'ADMIN').toUpperCase();

					const row = `
						<tr>
							<td class="text-center fw-bold" style="font-size: 11px;">${index + 1}</td>
							<td><span class="badge bg-light text-dark font-monospace" style="font-size: 11px; text-transform: uppercase;">${txnId}</span></td>
							<td style="white-space: nowrap; font-size: 12px;">${txn.transactionDate || '--'}</td>
							<td style="font-size: 12px; text-transform: uppercase;">${branch}</td>
							<td class="fw-bold" style="font-size: 12px;">${txn.accountNumber}</td>
							<td>${typeBadge}</td>
							<td style="font-size: 13px;">${amountFormatted}</td>
							<td class="fw-bold text-dark" style="font-size: 13px;">₹ ${balFormatted}</td>
							<td><span class="badge-mode">${payMode}</span></td>
							<td style="font-size: 12px; max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${comments}">${comments}</td>
							<td style="font-size: 11px; text-transform: uppercase;"><i class="bi bi-person"></i> ${createdBy}</td>
						</tr>
					`;
					$tbody.append(row);
				});

			} else {
				$('#recordCount').text('0 TRANSACTIONS');
				$tbody.html('<tr><td colspan="11" class="text-center py-4 text-muted" style="text-transform: uppercase;"><i class="bi bi-inbox fs-4 d-block mb-1"></i> NO TRANSACTIONS FOUND FOR THIS ACCOUNT.</td></tr>');
			}
		},
		error: function() {
			$('#recordCount').text('ERROR');
			$tbody.html('<tr><td colspan="11" class="text-center py-4 text-danger" style="text-transform: uppercase;"><i class="bi bi-exclamation-triangle"></i> FAILED TO LOAD TRANSACTIONS.</td></tr>');
		}
	});
}

// ==========================================
// 7. CLEAR FORM
// ==========================================
function clearAccountForm() {
	$('#formid')[0].reset();
	$('#customerCode, #customerName, #contactNumber, #jointHolderName, #savingPlanName, #averageBalance, #selectBranchName').val('');
	$('#balanceError').text('');
	$('#accOverviewBanner').slideUp(200);

	// Default opening date
	const today = new Date().toISOString().split('T')[0];
	$('#transactionDate').val(today);

	// Reset payment mode & transaction type
	$('#payBy').val('Cash');
	handlePaymentModeChange();
	$('#transactionType').val('');
	handleTransactionTypeChange();

	// Reset denomination sheet
	resetDenominationSheet();

	// Reset table view
	$('#tbody').html('<tr><td colspan="11" class="text-center py-4 text-muted" style="text-transform: uppercase;"><i class="bi bi-inbox fs-4 d-block mb-1"></i> SELECT AN ACCOUNT NUMBER TO VIEW TRANSACTION HISTORY.</td></tr>');
	$('#recordCount').text('0 TRANSACTIONS');
}

// ==========================================
// 8. CASH DENOMINATIONS HELPER
// ==========================================
function calcOpeningFees() {
	const n2000 = (parseInt($('#qty2000').val()) || 0) * 2000;
	const n500  = (parseInt($('#qty500').val())  || 0) * 500;
	const n200  = (parseInt($('#qty200').val())  || 0) * 200;
	const n100  = (parseInt($('#qty100').val())  || 0) * 100;
	const n50   = (parseInt($('#qty50').val())   || 0) * 50;
	const n20   = (parseInt($('#qty20').val())   || 0) * 20;
	const n10   = (parseInt($('#qty10').val())   || 0) * 10;
	const n5    = (parseInt($('#qty5').val())    || 0) * 5;

	$('#res2000').text(n2000);
	$('#res500').text(n500);
	$('#res200').text(n200);
	$('#res100').text(n100);
	$('#res50').text(n50);
	$('#res20').text(n20);
	$('#res10').text(n10);
	$('#res5').text(n5);

	const total = n2000 + n500 + n200 + n100 + n50 + n20 + n10 + n5;
	$('#totalFee').text(total);
}

function resetDenominationSheet() {
	$('#qty2000, #qty500, #qty200, #qty100, #qty50, #qty20, #qty10, #qty5').val(0);
	$('#res2000, #res500, #res200, #res100, #res50, #res20, #res10, #res5, #totalFee').text(0);
	$('#memberFeesTable').hide();
}

// Alert helper
function showAlert(message, icon) {
	if (typeof Swal !== 'undefined') {
		Swal.fire({
			icon: icon || 'info',
			title: (icon || 'NOTIFICATION').toUpperCase(),
			text: (message || '').toUpperCase(),
			confirmButtonColor: '#0d6efd'
		});
	} else {
		alert((message || '').toUpperCase());
	}
}