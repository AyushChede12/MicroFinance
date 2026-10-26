/**
 * SavingAccountFundTransfer.js
 * Comprehensive client-side logic for Unified Saving & Current Account-to-Account Fund Transfers,
 * Real-time Overdraft & Balance validation, Dynamic Route Detection, and Audit History.
 * All UI labels, badges, alerts, and records strictly in UPPERCASE.
 */

let allAccounts = [];
let accountsMap = {};
let allTransfers = [];

// ==========================================
// 1. INITIALIZATION & DATA LOADING
// ==========================================
$(document).ready(function () {
	// Automatically convert any text typing to UPPERCASE
	$(document).on('input', 'input[type="text"], textarea', function () {
		this.value = this.value.toUpperCase();
	});

	// Default transfer date to today if empty
	if (!$('#transferDate').val()) {
		const today = new Date().toISOString().split('T')[0];
		$('#transferDate').val(today);
	}

	// Load Accounts for Debit & Credit dropdowns
	loadAccountsDropdowns();

	// Load Recent Fund Transfers History
	loadFundTransfersHistory();

	// Real-time amount input validation & live balance preview
	$('#amount').on('input change', function () {
		updateBalancePreview();
	});

	// Save Transfer Handler
	$('#saveBtn').on('click', function (e) {
		e.preventDefault();
		processFundTransfer();
	});
});

// Helper: Check if account is CURRENT account
function isCurrentAcc(acc) {
	if (!acc) return false;
	const accType = (acc.accountType || '').trim().toUpperCase();
	const typeOfAcc = (acc.typeofaccount || '').trim().toLowerCase();
	return accType === 'CURRENT' || typeOfAcc === 'currentaccount' || typeOfAcc === 'current';
}

// Helper: Parse numerical balance / limit safely
function parseNum(val) {
	if (val === null || val === undefined) return 0;
	const clean = (val + '').replace(/[^0-9.-]/g, '');
	const num = parseFloat(clean);
	return isNaN(num) ? 0 : num;
}

// Load Accounts into Debit & Credit select dropdowns
function loadAccountsDropdowns() {
	$.ajax({
		url: "api/customersavings/getAllSavingAccountData",
		type: "GET",
		success: function (response) {
			const data = (response && response.data) ? response.data : (Array.isArray(response) ? response : []);
			allAccounts = data;
			accountsMap = {};

			const $dr = $('#debitAccountNumber');
			const $cr = $('#creditAccountNumber');
			$dr.empty().append('<option value="">-- SELECT DEBIT ACCOUNT --</option>');
			$cr.empty().append('<option value="">-- SELECT CREDIT ACCOUNT --</option>');

			data.forEach(function (acc) {
				if (acc && acc.accountNumber) {
					const accNo = acc.accountNumber.trim();
					accountsMap[accNo] = acc;

					const isCurr = isCurrentAcc(acc);
					const typeLabel = isCurr ? "CURRENT" : "SAVING";
					const name = (acc.enterCustomerName || acc.selectByCustomer || '').toUpperCase();
					const labelText = accNo + " - " + (name ? name + " " : "") + "[" + typeLabel + " A/C]";

					$dr.append('<option value="' + accNo + '">' + labelText + '</option>');
					$cr.append('<option value="' + accNo + '">' + labelText + '</option>');
				}
			});
		},
		error: function (err) {
			console.error("Failed to fetch accounts list:", err);
			alert("FAILED TO LOAD ACCOUNTS FOR FUND TRANSFER. PLEASE REFRESH THE PAGE.");
		}
	});
}

// ==========================================
// 2. ACCOUNT CHANGE HANDLERS
// ==========================================
$('#debitAccountNumber').on('change', function () {
	const accNo = $(this).val();
	$('#chkdebitAccountNumber').text('');

	if (!accNo) {
		clearDebitFields();
		updateRouteDisplay();
		updateBalancePreview();
		return;
	}

	const acc = accountsMap[accNo];
	if (acc) {
		populateDebitFields(acc);
	} else {
		// Fallback to fetch single account
		$.ajax({
			url: 'api/customersavings/getallbyaccountnumber',
			type: 'GET',
			data: { accountNumber: accNo },
			success: function (res) {
				if (res && res.data && res.data.length > 0) {
					const fetched = res.data[0];
					accountsMap[accNo] = fetched;
					populateDebitFields(fetched);
				} else {
					clearDebitFields();
				}
			},
			error: function () {
				clearDebitFields();
			}
		});
	}
});

function populateDebitFields(acc) {
	const isCurr = isCurrentAcc(acc);
	const balance = parseNum(acc.balance);
	const odLimit = isCurr ? parseNum(acc.overdraftLimit) : 0;
	const maxAvailable = balance + odLimit;

	$('#debitCustomerCode').val((acc.selectByCustomer || '').toUpperCase());
	$('#debitCustomerName').val((acc.enterCustomerName || '').toUpperCase());

	const branch = typeof acc.branchName === 'object' ? (acc.branchName?.branchName || '') : (acc.branchName || '');
	$('#debitAccountBranch').val(branch.toString().toUpperCase());

	$('#debitAverageBalance').val('₹ ' + balance.toFixed(2));
	$('#debitContactNumber').val(acc.contactNumber || '—');

	if (isCurr) {
		$('#debitOverdraftLimit').val('₹ ' + odLimit.toFixed(2));
		$('#debitMaxAvailable').val('₹ ' + maxAvailable.toFixed(2));
		$('#debitAccountTypeBadge').html('<span class="badge-current"><i class="bi bi-briefcase-fill"></i> CURRENT ACCOUNT</span>');
	} else {
		$('#debitOverdraftLimit').val('N/A (SAVING A/C)');
		$('#debitMaxAvailable').val('₹ ' + balance.toFixed(2));
		$('#debitAccountTypeBadge').html('<span class="badge-saving"><i class="bi bi-piggy-bank-fill"></i> SAVING ACCOUNT</span>');
	}

	// Status badge
	if ((acc.accountFreeze || '') == '1') {
		$('#debitStatusBadge').html('<span class="badge bg-danger">FROZEN</span>');
	} else if ((acc.accountStatus || '') == '0') {
		$('#debitStatusBadge').html('<span class="badge bg-secondary">INACTIVE</span>');
	} else {
		$('#debitStatusBadge').html('<span class="badge bg-success">ACTIVE</span>');
	}

	updateRouteDisplay();
	updateBalancePreview();
}

function clearDebitFields() {
	$('#debitCustomerCode').val('');
	$('#debitCustomerName').val('');
	$('#debitAccountBranch').val('');
	$('#debitAverageBalance').val('');
	$('#debitContactNumber').val('');
	$('#debitOverdraftLimit').val('');
	$('#debitMaxAvailable').val('');
	$('#debitAccountTypeBadge').empty();
	$('#debitStatusBadge').empty();
}

$('#creditAccountNumber').on('change', function () {
	const accNo = $(this).val();
	$('#chkcreditAccountNumber').text('');

	if (!accNo) {
		clearCreditFields();
		updateRouteDisplay();
		updateBalancePreview();
		return;
	}

	const acc = accountsMap[accNo];
	if (acc) {
		populateCreditFields(acc);
	} else {
		$.ajax({
			url: 'api/customersavings/getallbyaccountnumber',
			type: 'GET',
			data: { accountNumber: accNo },
			success: function (res) {
				if (res && res.data && res.data.length > 0) {
					const fetched = res.data[0];
					accountsMap[accNo] = fetched;
					populateCreditFields(fetched);
				} else {
					clearCreditFields();
				}
			},
			error: function () {
				clearCreditFields();
			}
		});
	}
});

function populateCreditFields(acc) {
	const isCurr = isCurrentAcc(acc);
	const balance = parseNum(acc.balance);

	$('#creditCustomerCode').val((acc.selectByCustomer || '').toUpperCase());
	$('#creditCustomerName').val((acc.enterCustomerName || '').toUpperCase());

	const branch = typeof acc.branchName === 'object' ? (acc.branchName?.branchName || '') : (acc.branchName || '');
	$('#creditAccountBranch').val(branch.toString().toUpperCase());

	$('#creditAverageBalance').val('₹ ' + balance.toFixed(2));
	$('#creditContactNumber').val(acc.contactNumber || '—');

	if (isCurr) {
		$('#creditAccountTypeBadge').html('<span class="badge-current"><i class="bi bi-briefcase-fill"></i> CURRENT ACCOUNT</span>');
	} else {
		$('#creditAccountTypeBadge').html('<span class="badge-saving"><i class="bi bi-piggy-bank-fill"></i> SAVING ACCOUNT</span>');
	}

	// Status badge
	if ((acc.accountFreeze || '') == '1') {
		$('#creditStatusBadge').html('<span class="badge bg-danger">FROZEN</span>');
	} else if ((acc.accountStatus || '') == '0') {
		$('#creditStatusBadge').html('<span class="badge bg-secondary">INACTIVE</span>');
	} else {
		$('#creditStatusBadge').html('<span class="badge bg-success">ACTIVE</span>');
	}

	updateRouteDisplay();
	updateBalancePreview();
}

function clearCreditFields() {
	$('#creditCustomerCode').val('');
	$('#creditCustomerName').val('');
	$('#creditAccountBranch').val('');
	$('#creditAverageBalance').val('');
	$('#creditContactNumber').val('');
	$('#creditAccountTypeBadge').empty();
	$('#creditStatusBadge').empty();
}

// Update Dynamic Route Pill: e.g. "SAVING ➔ CURRENT"
function updateRouteDisplay() {
	const drNo = $('#debitAccountNumber').val();
	const crNo = $('#creditAccountNumber').val();

	if (!drNo || !crNo) {
		$('#transferRouteDisplay').html('<i class="bi bi-arrow-repeat"></i> SELECT ACCOUNTS');
		return;
	}

	const drAcc = accountsMap[drNo];
	const crAcc = accountsMap[crNo];

	const drType = (drAcc && isCurrentAcc(drAcc)) ? "CURRENT" : "SAVING";
	const crType = (crAcc && isCurrentAcc(crAcc)) ? "CURRENT" : "SAVING";

	$('#transferRouteDisplay').html(
		'<i class="bi bi-arrow-right-circle-fill"></i> ' + drType + ' A/C &nbsp;➔&nbsp; ' + crType + ' A/C'
	);
}

// Dynamic Real-time Projected Balance Preview
function updateBalancePreview() {
	const drNo = $('#debitAccountNumber').val();
	const crNo = $('#creditAccountNumber').val();
	const amtStr = $('#amount').val();
	const amount = parseNum(amtStr);

	if (!drNo || !crNo || amount <= 0) {
		$('#balancePreviewCard').hide();
		$('#chkamount').text('');
		return;
	}

	const drAcc = accountsMap[drNo];
	const crAcc = accountsMap[crNo];

	if (!drAcc || !crAcc) {
		$('#balancePreviewCard').hide();
		return;
	}

	const drBalance = parseNum(drAcc.balance);
	const crBalance = parseNum(crAcc.balance);
	const isCurr = isCurrentAcc(drAcc);
	const odLimit = isCurr ? parseNum(drAcc.overdraftLimit) : 0;
	const maxAvailable = drBalance + odLimit;

	const debitAfter = drBalance - amount;
	const creditAfter = crBalance + amount;

	if (amount > maxAvailable) {
		if (isCurr) {
			$('#chkamount').text('* AMOUNT EXCEEDS AVAILABLE FUNDS WITH OVERDRAFT (MAX: ₹ ' + maxAvailable.toFixed(2) + ')');
		} else {
			$('#chkamount').text('* INSUFFICIENT BALANCE IN SAVING ACCOUNT (AVAILABLE: ₹ ' + drBalance.toFixed(2) + ')');
		}
	} else {
		$('#chkamount').text('');
	}

	// Projected balance styling
	let drHtml = '';
	if (debitAfter < 0) {
		drHtml = '<span class="text-danger fw-bold">₹ ' + debitAfter.toFixed(2) + ' (OD UTILIZED: ₹ ' + Math.abs(debitAfter).toFixed(2) + ')</span>';
	} else {
		drHtml = '<span class="text-primary fw-bold">₹ ' + debitAfter.toFixed(2) + '</span>';
	}

	$('#previewDebitAfter').html(drHtml);
	$('#previewCreditAfter').html('₹ ' + creditAfter.toFixed(2));
	$('#balancePreviewCard').fadeIn(200);
}

// ==========================================
// 3. PROCESS FUND TRANSFER
// ==========================================
function processFundTransfer() {
	// Clear errors
	$("[id^='chk']").text('');

	const debitAccNo = ($('#debitAccountNumber').val() || '').trim();
	const creditAccNo = ($('#creditAccountNumber').val() || '').trim();
	const transferDate = $('#transferDate').val();
	const amountStr = ($('#amount').val() || '').trim();
	const comment = ($('#comment').val() || '').trim().toUpperCase();

	let isValid = true;

	if (!debitAccNo) {
		$('#chkdebitAccountNumber').text('* PLEASE SELECT DEBIT ACCOUNT');
		isValid = false;
	}

	if (!creditAccNo) {
		$('#chkcreditAccountNumber').text('* PLEASE SELECT CREDIT ACCOUNT');
		isValid = false;
	}

	if (debitAccNo && creditAccNo && debitAccNo.toUpperCase() === creditAccNo.toUpperCase()) {
		$('#chkcreditAccountNumber').text('* DEBIT ACCOUNT AND CREDIT ACCOUNT CANNOT BE THE SAME');
		isValid = false;
	}

	if (!transferDate) {
		$('#chktransferDate').text('* PLEASE SELECT TRANSFER DATE');
		isValid = false;
	}

	const amount = parseNum(amountStr);
	if (!amountStr || isNaN(amount) || amount <= 0) {
		$('#chkamount').text('* PLEASE ENTER A VALID TRANSFER AMOUNT (GREATER THAN ₹ 0.00)');
		isValid = false;
	}

	if (!isValid) return;

	const drAcc = accountsMap[debitAccNo];
	const crAcc = accountsMap[creditAccNo];

	// Validate status
	if (drAcc) {
		if ((drAcc.accountFreeze || '') == '1') {
			alert("DEBIT ACCOUNT IS FROZEN. DEBIT TRANSACTIONS ARE PROHIBITED.");
			return;
		}
		if ((drAcc.accountStatus || '') == '0') {
			alert("DEBIT ACCOUNT IS INACTIVE. TRANSACTION CANNOT BE PROCESSED.");
			return;
		}

		// Overdraft vs Saving Balance Check
		const isCurr = isCurrentAcc(drAcc);
		const balance = parseNum(drAcc.balance);
		const odLimit = isCurr ? parseNum(drAcc.overdraftLimit) : 0;
		const maxAvailable = balance + odLimit;

		if (amount > maxAvailable) {
			if (isCurr) {
				alert("INSUFFICIENT FUNDS IN CURRENT ACCOUNT.\nMAXIMUM WITHDRAWAL WITH OVERDRAFT FACILITY: ₹ " + maxAvailable.toFixed(2));
			} else {
				alert("INSUFFICIENT BALANCE IN SAVING ACCOUNT.\nAVAILABLE BALANCE: ₹ " + balance.toFixed(2) + ".\nOVERDRAFT IS NOT PERMITTED FOR SAVING ACCOUNTS.");
			}
			return;
		}
	}

	if (crAcc) {
		if ((crAcc.accountFreeze || '') == '1') {
			alert("CREDIT ACCOUNT IS FROZEN. CREDIT TRANSACTIONS ARE PROHIBITED.");
			return;
		}
		if ((crAcc.accountStatus || '') == '0') {
			alert("CREDIT ACCOUNT IS INACTIVE. TRANSACTION CANNOT BE PROCESSED.");
			return;
		}
	}

	// Confirm Transfer
	const confirmMsg =
		"CONFIRM FUND TRANSFER?\n\n" +
		"• DEBIT FROM: A/C " + debitAccNo + "\n" +
		"• CREDIT TO:  A/C " + creditAccNo + "\n" +
		"• AMOUNT:     ₹ " + amount.toFixed(2) + "\n" +
		"• DATE:       " + transferDate + "\n\n" +
		"PROCEED WITH TRANSACTION?";

	if (!confirm(confirmMsg)) {
		return;
	}

	const transferPayload = {
		debitAccountNumber: debitAccNo,
		debitCustomerCode: ($('#debitCustomerCode').val() || '').toUpperCase(),
		debitAccountBranch: ($('#debitAccountBranch').val() || '').toUpperCase(),
		debitAverageBalance: $('#debitAverageBalance').val(),
		debitContactNumber: $('#debitContactNumber').val(),
		creditAccountNumber: creditAccNo,
		creditCustomerCode: ($('#creditCustomerCode').val() || '').toUpperCase(),
		creditAccountBranch: ($('#creditAccountBranch').val() || '').toUpperCase(),
		creditAverageBalance: $('#creditAverageBalance').val(),
		creditContactNumber: $('#creditContactNumber').val(),
		transferDate: transferDate,
		amount: amount.toString(),
		comment: comment
	};

	const $btn = $('#saveBtn');
	$btn.prop('disabled', true).html('<i class="bi bi-hourglass-split"></i> PROCESSING TRANSFER...');

	$.ajax({
		url: 'api/customersavings/transferAmount',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(transferPayload),
		success: function (res) {
			$btn.prop('disabled', false).html('<i class="bi bi-send-check"></i> PROCESS FUND TRANSFER');

			const saved = res || {};
			const refId = saved.id ? "FT-" + saved.id : "FT-" + Date.now();

			// Generate and show receipt advice
			showReceiptModal({
				refId: refId,
				transferDate: transferDate,
				debitAccNo: debitAccNo,
				debitName: $('#debitCustomerName').val(),
				debitBranch: $('#debitAccountBranch').val(),
				debitType: (drAcc && isCurrentAcc(drAcc)) ? "CURRENT ACCOUNT" : "SAVING ACCOUNT",
				creditAccNo: creditAccNo,
				creditName: $('#creditCustomerName').val(),
				creditBranch: $('#creditAccountBranch').val(),
				creditType: (crAcc && isCurrentAcc(crAcc)) ? "CURRENT ACCOUNT" : "SAVING ACCOUNT",
				amount: amount.toFixed(2),
				comment: comment || "INTERNAL FUND TRANSFER"
			});

			alert("FUND TRANSFER OF ₹ " + amount.toFixed(2) + " PROCESSED SUCCESSFULLY!");

			resetTransferForm();
			loadAccountsDropdowns();
			loadFundTransfersHistory();
		},
		error: function (xhr) {
			$btn.prop('disabled', false).html('<i class="bi bi-send-check"></i> PROCESS FUND TRANSFER');

			let errMsg = "FUND TRANSFER FAILED. PLEASE VERIFY DETAILS.";
			if (xhr.responseJSON && xhr.responseJSON.message) {
				errMsg = xhr.responseJSON.message.toUpperCase();
			} else if (xhr.responseText) {
				try {
					const parsed = JSON.parse(xhr.responseText);
					if (parsed && parsed.message) errMsg = parsed.message.toUpperCase();
				} catch (e) { }
			}
			alert(errMsg);
		}
	});
}

function resetTransferForm() {
	$('#formid')[0].reset();
	clearDebitFields();
	clearCreditFields();
	$("[id^='chk']").text('');
	$('#transferRouteDisplay').html('<i class="bi bi-arrow-repeat"></i> SELECT ACCOUNTS');
	$('#balancePreviewCard').hide();

	const today = new Date().toISOString().split('T')[0];
	$('#transferDate').val(today);
}

// ==========================================
// 4. FUND TRANSFERS HISTORY & KPI STATS
// ==========================================
function loadFundTransfersHistory() {
	$.ajax({
		url: 'api/customersavings/getAllFundTransfers',
		type: 'GET',
		success: function (res) {
			const data = (res && res.data) ? res.data : (Array.isArray(res) ? res : []);
			allTransfers = data;
			updateTransferKPIStats(allTransfers);
			renderTransfersTable(allTransfers);
		},
		error: function () {
			$('#fundTransferTableBody').html(
				'<tr><td colspan="11" class="text-center text-danger py-4" style="text-transform:uppercase;">' +
				'<i class="bi bi-exclamation-triangle"></i> FAILED TO LOAD FUND TRANSFER AUDIT RECORDS.</td></tr>'
			);
		}
	});
}

function updateTransferKPIStats(data) {
	const total = data.length;
	let totalVolume = 0;
	let savingCount = 0;
	let currentCount = 0;

	data.forEach(function (t) {
		const amt = parseNum(t.amount);
		totalVolume += amt;

		const drType = (t.debitAccountType || '').toUpperCase();
		const crType = (t.creditAccountType || '').toUpperCase();

		if (drType === 'SAVING' || crType === 'SAVING') savingCount++;
		if (drType === 'CURRENT' || crType === 'CURRENT') currentCount++;
	});

	$('#statTotalTransfers').text(total);
	$('#statTotalVolume').text('₹ ' + totalVolume.toLocaleString('en-IN', { minimumFractionDigits: 2 }));
	$('#statSavingTransfers').text(savingCount);
	$('#statCurrentTransfers').text(currentCount);
}

function renderTransfersTable(data) {
	const tbody = $('#fundTransferTableBody');
	tbody.empty();

	if (!data || data.length === 0) {
		tbody.html(
			'<tr><td colspan="11" class="text-center py-4 text-muted" style="text-transform:uppercase;">' +
			'<i class="bi bi-inbox"></i> NO FUND TRANSFER TRANSACTIONS FOUND.</td></tr>'
		);
		$('#transferRecordCount').text('0 TRANSFERS FOUND');
		return;
	}

	data.forEach(function (t, idx) {
		const amt = parseNum(t.amount);
		const drNo = (t.debitAccountNumber || '—').toUpperCase();
		const crNo = (t.creditAccountNumber || '—').toUpperCase();
		const drType = (t.debitAccountType || 'SAVING').toUpperCase();
		const crType = (t.creditAccountType || 'SAVING').toUpperCase();

		// Badge for Route
		const routeBadge =
			'<span style="font-weight:700; font-size:10px; text-transform:uppercase;">' +
			(drType === 'CURRENT' ? '<span class="badge-current">CURRENT</span>' : '<span class="badge-saving">SAVING</span>') +
			' &nbsp;➔&nbsp; ' +
			(crType === 'CURRENT' ? '<span class="badge-current">CURRENT</span>' : '<span class="badge-saving">SAVING</span>') +
			'</span>';

		const drBalAfter = t.debitAverageBalance ? '₹ ' + parseNum(t.debitAverageBalance).toFixed(2) : '—';
		const crBalAfter = t.creditAverageBalance ? '₹ ' + parseNum(t.creditAverageBalance).toFixed(2) : '—';

		const row = `
			<tr style="text-transform:uppercase; font-size:12px;">
				<td class="text-center">${idx + 1}</td>
				<td style="white-space:nowrap;"><strong>${t.transferDate || '—'}</strong></td>
				<td>
					<strong>${drNo}</strong><br>
					<small class="text-muted">${(t.debitCustomerCode || '').toUpperCase()} [${drType}]</small>
				</td>
				<td>
					<strong>${crNo}</strong><br>
					<small class="text-muted">${(t.creditCustomerCode || '').toUpperCase()} [${crType}]</small>
				</td>
				<td class="text-center">${routeBadge}</td>
				<td class="text-end" style="font-weight:700; color:#0f766e;">₹ ${amt.toFixed(2)}</td>
				<td class="text-end text-danger">${drBalAfter}</td>
				<td class="text-end text-success">${crBalAfter}</td>
				<td class="text-center">
					<span class="badge bg-success" style="font-size:10px;">SUCCESS</span>
				</td>
				<td><small>${(t.comment || 'INTERNAL TRANSFER').toUpperCase()}</small></td>
				<td class="text-center">
					<button type="button" class="action-btn text-primary" title="VIEW ADVICE RECEIPT" onclick="viewTransferAdvice(${t.id})">
						<i class="bi bi-receipt"></i>
					</button>
				</td>
			</tr>
		`;
		tbody.append(row);
	});

	$('#transferRecordCount').text(data.length + ' TRANSFERS FOUND');
}

function filterTransfersTable() {
	const search = ($('#searchTransferInput').val() || '').trim().toLowerCase();
	const typeFilter = $('#filterTransferType').val();
	const dateFilter = $('#filterTransferDate').val();

	const filtered = allTransfers.filter(function (t) {
		const matchSearch = !search
			|| (t.debitAccountNumber || '').toLowerCase().includes(search)
			|| (t.creditAccountNumber || '').toLowerCase().includes(search)
			|| (t.debitCustomerCode || '').toLowerCase().includes(search)
			|| (t.creditCustomerCode || '').toLowerCase().includes(search)
			|| (t.comment || '').toLowerCase().includes(search);

		let matchType = true;
		const drType = (t.debitAccountType || 'SAVING').toUpperCase();
		const crType = (t.creditAccountType || 'SAVING').toUpperCase();

		if (typeFilter === 'SAVING_TO_SAVING') matchType = (drType === 'SAVING' && crType === 'SAVING');
		else if (typeFilter === 'SAVING_TO_CURRENT') matchType = (drType === 'SAVING' && crType === 'CURRENT');
		else if (typeFilter === 'CURRENT_TO_SAVING') matchType = (drType === 'CURRENT' && crType === 'SAVING');
		else if (typeFilter === 'CURRENT_TO_CURRENT') matchType = (drType === 'CURRENT' && crType === 'CURRENT');

		const matchDate = !dateFilter || (t.transferDate === dateFilter);

		return matchSearch && matchType && matchDate;
	});

	renderTransfersTable(filtered);
}

function clearTransferFilters() {
	$('#searchTransferInput').val('');
	$('#filterTransferType').val('');
	$('#filterTransferDate').val('');
	renderTransfersTable(allTransfers);
}

// ==========================================
// 5. RECEIPT / ADVICE MODAL & PRINT
// ==========================================
function viewTransferAdvice(id) {
	const record = allTransfers.find(t => t.id == id);
	if (!record) {
		alert("TRANSFER RECORD NOT FOUND.");
		return;
	}

	const drAcc = accountsMap[record.debitAccountNumber] || {};
	const crAcc = accountsMap[record.creditAccountNumber] || {};

	showReceiptModal({
		refId: "FT-" + (record.id || Date.now()),
		transferDate: record.transferDate || new Date().toISOString().split('T')[0],
		debitAccNo: record.debitAccountNumber,
		debitName: drAcc.enterCustomerName || record.debitCustomerCode || '—',
		debitBranch: record.debitAccountBranch || '—',
		debitType: (record.debitAccountType || 'SAVING') + ' ACCOUNT',
		creditAccNo: record.creditAccountNumber,
		creditName: crAcc.enterCustomerName || record.creditCustomerCode || '—',
		creditBranch: record.creditAccountBranch || '—',
		creditType: (record.creditAccountType || 'SAVING') + ' ACCOUNT',
		amount: parseNum(record.amount).toFixed(2),
		comment: record.comment || 'INTERNAL FUND TRANSFER'
	});
}

function showReceiptModal(data) {
	const html = `
		<div style="font-family:'Poppins',sans-serif; text-transform:uppercase;">
			<div class="text-center pb-3 mb-3" style="border-bottom: 2px dashed #cbd5e1;">
				<h4 class="fw-bold mb-1" style="color: #0d6efd; letter-spacing: 0.5px;">MICROFINANCE BANKING SYSTEM</h4>
				<div style="font-size: 11px; color: #64748b; font-weight: 600;">OFFICIAL FUND TRANSFER TRANSACTION ADVICE / VOUCHER</div>
				<div class="mt-2">
					<span class="badge bg-primary" style="font-size: 11px;">REF NO: ${data.refId}</span>
					<span class="badge bg-secondary ms-1" style="font-size: 11px;">DATE: ${data.transferDate}</span>
				</div>
			</div>

			<div class="row g-3 mb-3">
				<div class="col-6">
					<div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:12px;">
						<div style="font-size:11px; font-weight:700; color:#1e40af; margin-bottom:4px;">
							<i class="bi bi-box-arrow-up-right me-1"></i> REMITTER (DEBIT DETAILS)
						</div>
						<div style="font-size:12px;"><strong>A/C NO:</strong> ${data.debitAccNo}</div>
						<div style="font-size:12px;"><strong>NAME:</strong> ${data.debitName}</div>
						<div style="font-size:12px;"><strong>TYPE:</strong> ${data.debitType}</div>
						<div style="font-size:12px;"><strong>BRANCH:</strong> ${data.debitBranch}</div>
					</div>
				</div>

				<div class="col-6">
					<div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:12px;">
						<div style="font-size:11px; font-weight:700; color:#166534; margin-bottom:4px;">
							<i class="bi bi-box-arrow-in-down-left me-1"></i> BENEFICIARY (CREDIT DETAILS)
						</div>
						<div style="font-size:12px;"><strong>A/C NO:</strong> ${data.creditAccNo}</div>
						<div style="font-size:12px;"><strong>NAME:</strong> ${data.creditName}</div>
						<div style="font-size:12px;"><strong>TYPE:</strong> ${data.creditType}</div>
						<div style="font-size:12px;"><strong>BRANCH:</strong> ${data.creditBranch}</div>
					</div>
				</div>
			</div>

			<div class="p-3 mb-3 text-center" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px;">
				<div style="font-size:11px; color:#64748b; font-weight:600;">AMOUNT TRANSFERRED</div>
				<div style="font-size:24px; font-weight:800; color:#0f766e;">₹ ${data.amount}</div>
				<div style="font-size:11px; color:#475569; margin-top:2px;">STATUS: <strong>SUCCESS / SETTLED</strong></div>
			</div>

			<div class="p-2 mb-3" style="background:#fafbfc; border-radius:6px; font-size:11px;">
				<strong>REMARKS / PURPOSE:</strong> ${data.comment}
			</div>

			<div class="pt-3 text-muted" style="border-top:1px dashed #e2e8f0; font-size:10px; display:flex; justify-content:space-between;">
				<span>COMPUTER GENERATED ADVICE — NO SIGNATURE REQUIRED</span>
				<span>GENERATED AT: ${new Date().toLocaleTimeString()}</span>
			</div>
		</div>
	`;

	$('#printableReceiptArea').html(html);
	const modalEl = document.getElementById('receiptModal');
	if (modalEl) {
		const modal = new bootstrap.Modal(modalEl);
		modal.show();
	}
}

function printReceipt() {
	window.print();
}