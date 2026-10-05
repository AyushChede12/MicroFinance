// =========================================================================
// EARLY LOAN CLOSURE (FORECLOSURE) CONTROLLER
// =========================================================================

let currentSettlementData = null;

$(document).ready(function() {
	populateApprovedLoanIds();
	populateFinancialConsultants();
	initializeDateDefaults();
	bindEventHandlers();
});

// 1. Initialize today's date on payment and due date fields
function initializeDateDefaults() {
	const today = new Date().toISOString().split('T')[0];
	$('#paymentDate').val(today);
	$('#dueDate').val(today);
	$('#chequeDate').val(today);
}

// 2. Fetch all active/approved loan IDs for dropdown
function populateApprovedLoanIds() {
	$.ajax({
		url: "api/loanmanegment/getApprovedLoanIds",
		type: "GET",
		dataType: "json",
		success: function(response) {
			const $dropdown = $("#earlyLoanclosureId");
			$dropdown.empty().append('<option value="" disabled selected>-- SELECT ACTIVE LOAN ID --</option>');

			if (response && response.status === "OK" && Array.isArray(response.data)) {
				response.data.forEach(function(id) {
					$dropdown.append(`<option value="${id}">${id}</option>`);
				});
			} else {
				console.warn("No active loan IDs found.");
			}
		},
		error: function(xhr) {
			console.error("Error fetching Loan IDs:", xhr.responseText);
		}
	});
}

// 3. Fetch Financial Consultants from Staff Registry module
function populateFinancialConsultants() {
	$.ajax({
		url: 'api/financialconsultant/getAllFinancialConsultantDetails',
		type: 'POST',
		dataType: 'json',
		success: function(response) {
			const $dropdown = $('#financialConsultantId');
			$dropdown.empty().append('<option value="">-- SELECT CONSULTANT ID --</option>');

			if (response && response.data && Array.isArray(response.data)) {
				response.data.forEach(function(c) {
					const code = c.financialCode || '';
					const name = c.financialName || '';
					$dropdown.append(`<option value="${code}">${code} - ${name}</option>`);
				});

				if (currentSettlementData && currentSettlementData.financialConsultantId) {
					$dropdown.val(currentSettlementData.financialConsultantId);
					$('#financialConsultantName').val(currentSettlementData.financialConsultantName || '');
				}
			}
		},
		error: function(xhr) {
			console.error("Error loading financial consultants:", xhr.responseText);
		}
	});
}

// 4. Bind all UI Event Handlers
function bindEventHandlers() {
	// Consultant selection -> auto-fill consultant name
	$('#financialConsultantId').on('change', function() {
		const code = $(this).val();
		if (!code) {
			$('#financialConsultantName').val('');
			return;
		}
		$.ajax({
			url: 'api/financialconsultant/getfinancialHierarchyByFinancialCode',
			type: 'GET',
			data: { financialCode: code },
			success: function(res) {
				if (res && res.data && res.data[0]) {
					$('#financialConsultantName').val(res.data[0].financialName || '');
				}
			}
		});
	});

	// Loan ID selection -> fetch full foreclosure settlement from backend
	$('#earlyLoanclosureId').on('change', function() {
		const selectedLoanId = $(this).val();
		if (!selectedLoanId) return;

		fetchForeclosureSettlement(selectedLoanId);
	});

	// Deduct Fine toggle
	$('#deductfine').on('change', function() {
		if ($(this).val() === 'NO') {
			$('#deductFineAmount').val('0.00');
		} else {
			if (currentSettlementData && currentSettlementData.pendingPenalties > 0) {
				$('#deductFineAmount').val(currentSettlementData.pendingPenalties.toFixed(2));
			}
		}
		recalculateNetSettlement();
	});

	// Real-time calculation listeners
	$('#deductFineAmount, #waiver').on('input change', function() {
		recalculateNetSettlement();
	});

	// Reason for Closure selection
	$('#reasonForClosure').on('change', function() {
		if ($(this).val() === 'Other') {
			$('#remarksReqStar').show();
			$('#remarks').attr('required', 'required');
		} else {
			$('#remarksReqStar').hide();
			$('#remarks').removeAttr('required');
		}
	});

	// Payment Mode toggle
	$('#paymentMode').on('change', function() {
		handlePaymentModeChange($(this).val());
	});

	// Main Close Loan Button Click -> Validate & open confirmation modal
	$('#closeLoanBtn').on('click', function(e) {
		e.preventDefault();
		initiateClosureConfirmation();
	});

	// Final Confirm Button in Modal -> Submit Transaction
	$('#confirmProceedCloseBtn').on('click', function() {
		executeLoanClosure();
	});

	// Post-Closure Action Buttons
	$('#printReceiptBtn').on('click', function() {
		printForeclosureReceipt();
	});

	// Modal dismiss buttons click handler
	$(document).on('click', '[data-dismiss="modal"], [data-bs-dismiss="modal"], .close', function() {
		hideModal('#closureConfirmModal');
		hideModal('#closureSuccessModal');
	});
}

// 5. Fetch server-side foreclosure settlement calculation
function fetchForeclosureSettlement(loanId) {
	$('#settlementSummaryCard').slideUp(200);

	$.ajax({
		url: `api/loanmanegment/calculateForeclosure?loanId=${encodeURIComponent(loanId)}`,
		type: "GET",
		dataType: "json",
		success: function(response) {
			if (response.status !== "OK" || !response.data) {
				alert("Failed to calculate foreclosure: " + (response.message || "Unknown error"));
				return;
			}

			const d = response.data;
			currentSettlementData = d;

			// Populate Read-Only Loan Details
			$('#loanDate').val(d.loanDate || '');
			$('#memberId').val(`${d.memberId || ''} - ${d.memberName || ''}`);
			$('#memberName').val(d.memberName || '');
			$('#relativeDetails').val(d.relativeDetails || '--');
			$('#contactNo').val(d.contactNo || '');
			$('#branchName').val(d.branchName || '');
			$('#paymentBranch').val(d.branchName || '');
			$('#loanPlanName').val(d.loanPlanName || d.typeOfLoan || 'Standard Plan');
			$('#loanTerm').val(d.loanTerm || '');
			$('#loanMode').val(d.loanMode || '');
			$('#loanAmount').val(d.sanctionedPrincipal ? d.sanctionedPrincipal.toFixed(2) : (d.loanAmount || '0.00'));
			$('#rateOfInterest').val(d.rateOfInterest || '');
			$('#interestType').val(d.interestType || '');
			$('#emiPayment').val(d.emiPayment || '');
			$('#sanctionedAmount').val(d.sanctionedPrincipal ? d.sanctionedPrincipal.toFixed(2) : (d.loanAmount || '0.00'));
			$('#typeOfLoan').val(d.typeOfLoan || '');
			$('#totalinterestofLoan').val(d.totalInterest ? parseFloat(d.totalInterest).toFixed(2) : '0.00');
			$('#totalPayableofLoan').val(d.totalPayableAmount ? parseFloat(d.totalPayableAmount).toFixed(2) : '0.00');

			// Auto-select financial consultant if available
			if (d.financialConsultantId) {
				$('#financialConsultantId').val(d.financialConsultantId);
				$('#financialConsultantName').val(d.financialConsultantName || '');
			}

			// Populate Repayment & Due Breakdown
			$('#noOfInst').val(`${d.paidInstallments || 0} / ${d.totalInstallments || 0} Paid`);
			$('#principalDue').val((d.principalOutstanding || 0).toFixed(2));
			$('#interestDue').val((d.accruedInterestTillDate || 0).toFixed(2));
			$('#amountPaid').val((d.totalPrincipalPaid || 0).toFixed(2));
			$('#balanceLoanAmount').val((d.principalOutstanding || 0).toFixed(2));
			$('#foreclosureFee').val((d.foreclosureFeeAmount || 0).toFixed(2));

			const arrearsTotal = (d.overdueArrears || 0) + (d.pendingPenalties || 0);
			if (arrearsTotal > 0) {
				$('#deductfine').val('YES');
				$('#deductFineAmount').val((d.pendingPenalties || 0).toFixed(2));
			} else {
				$('#deductfine').val('NO');
				$('#deductFineAmount').val('0.00');
			}
			$('#waiver').val('0.00');

			// Populate Net Payoff
			const netPayoff = d.netPayoffAmount || 0;
			$('#paymentAmount').val(netPayoff.toFixed(2));
			$('#netAmount').val(netPayoff.toFixed(2));

			// Update Summary Card
			$('#summaryLoanIdBadge').text(d.loanId);
			$('#summarySanctioned').text(`₹${(d.sanctionedPrincipal || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`);
			$('#summaryPrincipalPaid').text(`₹${(d.totalPrincipalPaid || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`);
			$('#summaryPrincipalDue').text(`₹${(d.principalOutstanding || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`);
			$('#summaryAccruedInterest').text(`₹${(d.accruedInterestTillDate || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`);
			$('#summaryElapsedDays').text(`(${d.elapsedDaysSinceLastPayment || 0} days accrued)`);
			$('#summaryArrearsFines').text(`₹${arrearsTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`);
			$('#summaryNetPayoff').text(`₹${netPayoff.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`);

			// Collateral Badge
			$('#collateralStatusBadgeContainer').show();
			if (d.hasCollateral) {
				$('#collateralStatusBadge')
					.removeClass('badge-collateral-none')
					.addClass('badge-collateral-active')
					.html('<i class="bi bi-shield-lock me-1"></i> LINKED COLLATERAL / LIEN ATTACHED');
				$('#collateralDetailText').text(d.collateralDetails || '');
			} else {
				$('#collateralStatusBadge')
					.removeClass('badge-collateral-active')
					.addClass('badge-collateral-none')
					.html('<i class="bi bi-shield me-1"></i> NO LINKED COLLATERAL');
				$('#collateralDetailText').text('');
			}

			// Store savings account details if available
			if (d.savingsAccountNumber) {
				$('#accountNo').val(`${d.savingsAccountNumber} (Bal: ₹${(d.savingsAccountBalance || 0).toFixed(2)})`);
			} else {
				$('#accountNo').val('');
			}

			$('#settlementSummaryCard').slideDown(300);
		},
		error: function(xhr) {
			console.error("Foreclosure calculation error:", xhr.responseText);
			alert("Error calculating foreclosure settlement: " + (xhr.responseJSON?.message || xhr.statusText));
		}
	});
}

// 6. Dynamic Recalculation of Net Settlement Payoff
function recalculateNetSettlement() {
	if (!currentSettlementData) return;

	const principalDue = parseFloat($('#principalDue').val()) || 0;
	const interestDue = parseFloat($('#interestDue').val()) || 0;
	const fineAmount = parseFloat($('#deductFineAmount').val()) || 0;
	const feeAmount = parseFloat($('#foreclosureFee').val()) || 0;
	const waiver = parseFloat($('#waiver').val()) || 0;

	// Formula: Net = (Principal + Interest + Fine + ForeclosureFee) - Waiver
	let net = (principalDue + interestDue + fineAmount + feeAmount) - waiver;
	if (net < 0) net = 0;

	$('#netAmount').val(net.toFixed(2));
	$('#paymentAmount').val(net.toFixed(2));
	$('#summaryNetPayoff').text(`₹${net.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`);
}

// 7. Payment Mode field visibility & validation
function handlePaymentModeChange(mode) {
	$('#displayCheque, #displaycheqdate, #displaydeposit, #displayRef, #displaySavingsAccount').hide();
	$('#chequeNo, #chequeDate, #ref_UpiId').removeAttr('required');

	if (mode === 'Cheque') {
		$('#displayCheque, #displaycheqdate, #displaydeposit').show();
		$('#chequeNo, #chequeDate').attr('required', 'required');
	} else if (mode === 'Online' || mode === 'NEFT') {
		$('#displayRef, #displaydeposit').show();
		$('#ref_UpiId').attr('required', 'required');
	} else if (mode === 'Saving Account') {
		$('#displaySavingsAccount').show();
		if (currentSettlementData && currentSettlementData.savingsAccountNumber) {
			const bal = currentSettlementData.savingsAccountBalance || 0;
			const net = parseFloat($('#netAmount').val()) || 0;
			if (bal < net) {
				alert(`Warning: Member's savings balance (₹${bal.toFixed(2)}) is insufficient for payoff amount (₹${net.toFixed(2)})!`);
			}
		} else {
			alert("Warning: No active Savings Account found for this borrower to execute auto-debit.");
		}
	}
}

// 8. Form Validation & Open Confirmation Modal
function initiateClosureConfirmation() {
	const loanId = $('#earlyLoanclosureId').val();
	if (!loanId) {
		alert("Please select a Loan ID first.");
		$('#earlyLoanclosureId').focus();
		return;
	}

	const branch = $('#paymentBranch').val();
	if (!branch) {
		alert("Payment Branch is required.");
		$('#paymentBranch').focus();
		return;
	}

	const consultantId = $('#financialConsultantId').val();
	if (!consultantId) {
		alert("Please select an approving Financial Consultant.");
		$('#financialConsultantId').focus();
		return;
	}

	const payMode = $('#paymentMode').val();
	if (!payMode) {
		alert("Please select a Mode of Payment.");
		$('#paymentMode').focus();
		return;
	}

	if (payMode === 'Cheque') {
		if (!$('#chequeNo').val() || !$('#chequeDate').val()) {
			alert("Cheque Number and Cheque Date are required for Cheque payment.");
			return;
		}
	} else if (payMode === 'Online' || payMode === 'NEFT') {
		if (!$('#ref_UpiId').val()) {
			alert("Reference Number / UPI ID is required for Online/NEFT payment.");
			return;
		}
	} else if (payMode === 'Saving Account') {
		if (currentSettlementData) {
			const bal = currentSettlementData.savingsAccountBalance || 0;
			const net = parseFloat($('#netAmount').val()) || 0;
			if (bal < net) {
				alert(`Cannot proceed: Insufficient balance in Savings Account (Available: ₹${bal.toFixed(2)}, Required: ₹${net.toFixed(2)}).`);
				return;
			}
		}
	}

	const reason = $('#reasonForClosure').val();
	if (reason === 'Other' && !$('#remarks').val().trim()) {
		alert("Remarks are mandatory when 'Other' is selected as reason for closure.");
		$('#remarks').focus();
		return;
	}

	const submittedAmount = parseFloat($('#paymentAmount').val()) || 0;
	const requiredPayoff = parseFloat($('#netAmount').val()) || 0;
	if (submittedAmount < (requiredPayoff - 0.50)) {
		alert(`Payment amount (₹${submittedAmount.toFixed(2)}) cannot be less than the required net payoff amount (₹${requiredPayoff.toFixed(2)}).`);
		return;
	}

	// Populate Confirmation Modal
	$('#modalConfLoanId').text(loanId);
	$('#modalConfBorrower').text($('#memberId').val());
	$('#modalConfPayMode').text(payMode);
	$('#modalConfPayoff').text(`₹${submittedAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`);
	$('#modalConfReason').text(reason);

	showModal('#closureConfirmModal');
}

// Modal Helper Functions (compatible with Bootstrap 4 & 5 and pure DOM fallback)
function showModal(selector) {
	const $m = $(selector);
	if (typeof $m.modal === 'function') {
		$m.modal('show');
	} else if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
		const inst = bootstrap.Modal.getOrCreateInstance($m[0]);
		inst.show();
	} else {
		$m.addClass('show').css('display', 'block').removeAttr('aria-hidden');
		if ($('.modal-backdrop').length === 0) {
			$('body').append('<div class="modal-backdrop fade show"></div>');
		}
		$('body').addClass('modal-open');
	}
}

function hideModal(selector) {
	const $m = $(selector);
	if (typeof $m.modal === 'function') {
		try { $m.modal('hide'); } catch (e) { }
	}
	if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
		try {
			const inst = bootstrap.Modal.getInstance($m[0]);
			if (inst) inst.hide();
		} catch (e) { }
	}
	$m.removeClass('show').css('display', 'none').attr('aria-hidden', 'true');
	$('.modal-backdrop').remove();
	$('body').removeClass('modal-open').css('padding-right', '');
}

// Reset entire form and restore clean state
function resetEarlyClosureForm() {
	currentSettlementData = null;
	const $form = $('#formid');
	if ($form.length > 0 && $form[0]) {
		$form[0].reset();
	}
	$('#earlyLoanclosureId').val('');
	$('#loanDate, #memberId, #memberName, #relativeDetails, #contactNo, #branchName, #paymentBranch, #loanPlanName, #loanTerm, #loanMode, #loanAmount, #rateOfInterest, #interestType, #emiPayment, #sanctionedAmount, #totalinterestofLoan, #totalPayableofLoan, #typeOfLoan, #noOfInst, #principalDue, #interestDue, #amountPaid, #balanceLoanAmount, #foreclosureFee, #deductFineAmount, #waiver, #paymentAmount, #netAmount, #accountNo, #chequeNo, #ref_UpiId, #remarks, #financialConsultantName').val('');
	$('#financialConsultantId').val('');
	$('#reasonForClosure').val('Foreclosure / Early Settlement');
	$('#deductfine').val('NO');
	$('#paymentMode').val('');

	$('#displayCheque, #displaycheqdate, #displaydeposit, #displayRef, #displaySavingsAccount').hide();
	$('#remarksReqStar').hide();
	$('#remarks').removeAttr('required');

	$('#settlementSummaryCard').slideUp(200);
	$('#collateralStatusBadgeContainer').hide();
	$('#summaryLoanIdBadge').text('');
	$('#summarySanctioned, #summaryPrincipalPaid, #summaryPrincipalDue, #summaryAccruedInterest, #summaryArrearsFines, #summaryNetPayoff').text('₹0.00');
	$('#summaryElapsedDays').text('');

	initializeDateDefaults();
}

// 9. Execute Loan Closure via AJAX POST
function executeLoanClosure() {
	const $btn = $('#confirmProceedCloseBtn');
	$btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2"></span>Processing...');

	// Collect Payload
	const payload = {
		loanId: $('#earlyLoanclosureId').val(),
		loanDate: $('#loanDate').val(),
		memberId: currentSettlementData ? currentSettlementData.memberId : '',
		memberName: $('#memberName').val(),
		relativeDetails: $('#relativeDetails').val(),
		contactNo: $('#contactNo').val(),
		branchName: $('#branchName').val(),
		loanPlanName: $('#loanPlanName').val(),
		typeOfLoan: $('#typeOfLoan').val(),
		loanMode: $('#loanMode').val(),
		loanTerm: $('#loanTerm').val(),
		rateOfInterest: $('#rateOfInterest').val(),
		loanAmount: $('#loanAmount').val(),
		interestType: $('#interestType').val(),
		emiPayment: $('#emiPayment').val(),
		sanctionedAmount: $('#sanctionedAmount').val(),
		noOfInst: $('#noOfInst').val(),

		principaldue: $('#principalDue').val(),
		interestDue: $('#interestDue').val(),
		amountPaid: $('#amountPaid').val(),
		balanceLoanAmount: "0.00",
		dueDate: $('#dueDate').val(),
		paymentBranch: $('#paymentBranch').val(),
		paymentDate: $('#paymentDate').val(),

		fine: $('#deductFineAmount').val(),
		waiver: $('#waiver').val(),
		foreclosureFee: $('#foreclosureFee').val(),
		paymentAmount: $('#paymentAmount').val(),
		netAmount: $('#netAmount').val(),
		reasonForClosure: $('#reasonForClosure').val(),

		paymentMode: $('#paymentMode').val(),
		accountNo: currentSettlementData ? currentSettlementData.savingsAccountNumber : '',
		chequeNo: $('#chequeNo').val(),
		chequeDate: $('#chequeDate').val(),
		ref_UpiId: $('#ref_UpiId').val(),
		charges: $('#charges').val() || "0.00",
		remarks: $('#remarks').val(),

		financialConsultantId: $('#financialConsultantId').val(),
		financialConsultantName: $('#financialConsultantName').val(),
		loanStatus: "CLOSED"
	};

	console.log("Submitting Loan Foreclosure:", payload);

	$.ajax({
		url: "api/loanmanegment/closeLoan",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(payload),
		success: function(response) {
			$btn.prop('disabled', false).html('<i class="bi bi-check-circle me-1"></i> YES, EXECUTE CLOSURE');

			// 1. Hide confirmation modal immediately
			hideModal('#closureConfirmModal');
			hideModal('#closureSuccessModal');

			const successMessage = (response && response.message) ? response.message : `Loan ${payload.loanId} closed and settled successfully.`;

			// 2. Alert popup as requested by user
			alert(successMessage);

			// 3. Ensure modals and lingering backdrops are completely removed from screen
			hideModal('#closureConfirmModal');
			hideModal('#closureSuccessModal');
			$('.modal-backdrop').remove();
			$('body').removeClass('modal-open').css('padding-right', '');

			// 4. Reset form inputs and refresh approved active loan list
			resetEarlyClosureForm();
			populateApprovedLoanIds();
		},
		error: function(xhr) {
			$btn.prop('disabled', false).html('<i class="bi bi-check-circle me-1"></i> YES, EXECUTE CLOSURE');
			hideModal('#closureConfirmModal');
			console.error("Closure error:", xhr.responseText);
			let errMsg = "Failed to close loan.";
			try {
				const res = JSON.parse(xhr.responseText);
				if (res && res.message) errMsg = res.message;
			} catch (e) {
				if (xhr.statusText) errMsg = xhr.statusText;
			}
			alert(errMsg);
		}
	});
}

// 10. Print Foreclosure Settlement Receipt
function printForeclosureReceipt() {
	const printContents = document.getElementById('printableReceiptArea').innerHTML;
	const win = window.open('', '_blank', 'height=600,width=800');
	win.document.write('<html><head><title>Loan Foreclosure Settlement Receipt</title>');
	win.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">');
	win.document.write('<style>body { padding: 30px; font-family: Courier, monospace; }</style>');
	win.document.write('</head><body>');
	win.document.write(printContents);
	win.document.write('</body></html>');
	win.document.close();
	win.focus();
	setTimeout(function() {
		win.print();
		win.close();
	}, 500);
}