// ✅ Js for populating the approved loanid in the dropdown (Vaibhav)
$(document).ready(function() {
	populateDropdown();
});

function populateDropdown() {

	$.ajax({
		url: "api/loanmanegment/getApprovedLoanIds",
		type: "GET",
		dataType: "json",
		success: function(response) {
			console.log("Loan ID response:", response); // for debugging

			if (response.status === "OK" && Array.isArray(response.data)) {
				const $dropdown = $("#findByLoanId"); // Make sure this matches your HTML ID exactly
				$dropdown.empty(); // Clear existing options

				// ✅ Wrap your <option> in quotes!
				$dropdown.append('<option value="" disabled selected>SELECT LOAN ID</option>');

				response.data.forEach(function(id) {
					$dropdown.append(`<option value="${id}">${id}</option>`);
				});
			} else {
				console.warn("No Loan IDs found in response.");
			}
		},
		error: function(xhr, status, error) {
			console.error("Error fetching Loan IDs:", error);
		}
	});
}


// Js for binding data in textfields (Vaibhav)
$(document).ready(function() {
	$("#findByLoanId").on("change", function() {
		const selectedLoanId = $(this).val();

		if (selectedLoanId) {
			$.ajax({
				url: "api/loanmanegment/getLoanById", // your GET API
				type: "GET",
				data: { loanId: selectedLoanId }, // sending as query param
				dataType: "json",
				success: function(response) {
					if (response.status === "OK" && response.data) {
						const data = response.data;

						// Now populate the form fields with received data
						$("#loanPaymentDate").val(data.loanDate);
						$("#memberId").val(data.memberId);
						$("#memberName").val(data.memberName || "-");
						$("#dateOfBirth").val(data.dateOfBirth);
						$("#age").val(data.age);
						$("#contactNo").val(data.contactNo);
						$("#messageStatus").val(data.messageStatus);
						$("#address").val(data.address);
						$("#pinCode").val(data.pinCode);
						$("#branchName").val(data.branchName);

						$("#loanPlanName").val(data.loanPlanName);
						$("#typeOfLoan").val(data.typeOfLoan);
						$("#loanMode").val(data.loanMode);
						$("#loanTerm").val(data.loanTerm);
						$("#rateOfInterest").val(data.rateOfInterest);
						$("#loanAmount").val(data.loanAmount);
						$("#interestType").val(data.interestType);
						$("#emiPayment").val(data.emiPayment);
						$("#purposeOfLoan").val(data.purposeOfLoan);

						// Guarantor Details
						$("#guarantorMemberId").val(data.guarantorMemberId);
						$("#guarantorIdentity").val(data.guarantorIdentity);
						$("#guarantorAddress").val(data.guarantorAddress);
						$("#guarantorPinCode").val(data.guarantorPinCode);
						$("#guarantorContactNo").val(data.guarantorContactNo);

						// Co-Applicant Details
						$("#coApplicantMemberId").val(data.coApplicantMemberId);
						$("#coApplicantIdentity").val(data.coApplicantIdentity);
						$("#coApplicantAddress").val(data.coApplicantAddress);
						$("#coApplicantPinCode").val(data.coApplicantPinCode);
						$("#coApplicantContactNo").val(data.coApplicantContactNo);

						// Deductions
						$("#processingFee").val(data.processingFee);
						$("#legalCharges").val(data.legalCharges);
						$("#insuranceFee").val(data.insuranceFee);
						$("#financialConsultantId").val(data.financialConsultantId);
						$("#financialConsultantName").val(data.financialConsultantName);

						// Disbursement status: default to UNPAID initially
						const disburseStatus = (data.paymentStatus && data.paymentStatus.trim()) ? data.paymentStatus : "UNPAID";
						$("#paymentStatus").val(disburseStatus);
						if (disburseStatus.toUpperCase() === "PAID") {
							$("#paymentStatus").css("color", "green");
						} else {
							$("#paymentStatus").css("color", "red");
						}

						// Fetch customer savings account for disbursement
						loadCustomerSavingAccount(data.memberId);

						// Ensure paymentDate has today's date if empty
						if (!$("#paymentDate").val()) {
							const today = new Date().toISOString().split('T')[0];
							$("#paymentDate").val(today);
						}
						// Automatically fetch and show penalty amount preview
						fetchPenaltyPreview();
					} else {
						alert("Loan data not found.");
					}
				},
				error: function(xhr) {
					alert("Error fetching data: " + xhr.responseText);
				}
			});
		}
	});
});

let currentCustomerSavingAccount = null;

function loadCustomerSavingAccount(memberId) {
	currentCustomerSavingAccount = null;
	$("#accountNo").val("");
	if (!memberId) return;

	$.ajax({
		url: "api/customersavings/getAccountNumbersByCode",
		type: "GET",
		data: { selectByCustomer: memberId },
		dataType: "json",
		success: function(response) {
			if (response.status === "FOUND" && Array.isArray(response.data) && response.data.length > 0) {
				currentCustomerSavingAccount = response.data[0];
				if ($("#paymentMode").val() === "Saving Account") {
					$("#accountNo").val(currentCustomerSavingAccount.accountNumber || "");
				}
			} else {
				currentCustomerSavingAccount = null;
			}
		},
		error: function() {
			currentCustomerSavingAccount = null;
		}
	});
}

// ✅ Mode of Disbursement Toggle
$('#paymentMode').change(function() {
	const paymentMode = $(this).val();
	if (paymentMode === 'Saving Account') {
		$('#displaydeposit').show();
		if (currentCustomerSavingAccount && currentCustomerSavingAccount.accountNumber) {
			$('#accountNo').val(currentCustomerSavingAccount.accountNumber);
		} else {
			const memberId = $('#memberId').val();
			if (memberId) {
				loadCustomerSavingAccount(memberId);
			}
		}
	} else {
		// Cash or empty
		$('#displaydeposit').hide();
		$('#accountNo').val('');
	}
});

$('#paymentBtn').click(function(e) {
	e.preventDefault();

	const loanId = $('#findByLoanId').val();
	if (!loanId) {
		alert("Please select a Loan ID first.");
		$('#findByLoanId').focus();
		return;
	}

	const paymentMode = $('#paymentMode').val();
	if (!paymentMode) {
		alert("Please select Mode of Disbursement (Cash or Saving Account).");
		$('#paymentMode').focus();
		return;
	}

	if (paymentMode === 'Saving Account') {
		const accountNo = $('#accountNo').val();
		if (!accountNo && !currentCustomerSavingAccount) {
			alert("⚠️ No active Savings Account found for Member ID: " + $('#memberId').val() + ". Cannot disburse to Saving Account.");
			return;
		}
	}

	const paymentData = {
		loanId: $('#findByLoanId').val(),
		loanDate: $('#loanPaymentDate').val(),
		memberId: $('#memberId').val(),
		memberName: $('#memberName').val(),
		loanPlanName: $('#loanPlanName').val(),
		typeOfLoan: $('#typeOfLoan').val(),
		loanMode: $('#loanMode').val(),
		loanTerm: $('#loanTerm').val(),
		rateOfInterest: $('#rateOfInterest').val(),
		loanAmount: $('#loanAmount').val(),
		interestType: $('#interestType').val(),
		emiPayment: $('#emiPayment').val(),
		processingFee: $('#processingFee').val(),
		legalCharges: $('#legalCharges').val(),
		insuranceFee: $('#insuranceFee').val(),
		financialConsultantId: $('#financialConsultantId').val(),
		financialConsultantName: $('#financialConsultantName').val(),
		paymentDate: $('#paymentDate').val(),
		paymentStatus: $('#paymentStatus').val(),
		paymentMode: $('#paymentMode').val(),
		accountNo: $('#accountNo').val(),
		ref_UpiId: $('#ref_UpiId').val() || "",
		charges: $('#charges').val(),
		remarks: $('#remarks').val(),
		chequeDate: $('#chequeDate').val() || "",
		chequeNo: $('#chequeNo').val() || "",
		noOfInst: $('#noOfInst').val() || "1"
	};

	$.ajax({
		type: 'POST',
		url: 'api/loanmanegment/payEmi',
		contentType: 'application/json',
		data: JSON.stringify(paymentData),
		success: function(response) {
			if (response.status === "OK") {
				alert(response.message);

				if (response.data && response.data.loanStatus === "CLOSED") {
					alert("This was your last installment. The loan is now CLOSED.");
					$('#paymentBtn').prop('disabled', true);
				}

				location.reload();
			} else {
				alert("❌ " + (response.message || "Something went wrong."));
			}
		},
		error: function(xhr) {
			const errorMsg = xhr.responseJSON?.message || xhr.responseJSON?.data?.error || "Unknown error occurred";
			alert("❌ Disbursement failed: " + errorMsg);
		}
	});
});




// ── Penalty Preview ───────────────────────────────────────────────────────────

/**
 * Calls the penalty preview API and populates the penalty section.
 * Always shows the section during loan payment with clear penalty details.
 */
function fetchPenaltyPreview() {
	const loanId = $('#findByLoanId').val();
	let paymentDate = $('#paymentDate').val();

	if (!loanId) {
		hidePenaltySection();
		return;
	}

	if (!paymentDate) {
		paymentDate = new Date().toISOString().split('T')[0];
		$('#paymentDate').val(paymentDate);
	}

	$.ajax({
		url: 'api/loanmanegment/calculatePenaltyPreview',
		type: 'GET',
		data: { loanId: loanId, paymentDate: paymentDate },
		dataType: 'json',
		success: function(response) {
			if (response.status === 'OK' && response.data) {
				const d = response.data;
				const daysLate = parseInt(d.daysLate) || 0;
				const penaltyAmt = parseFloat(d.penaltyAmount) || 0;
				const emiAmt = parseFloat(d.emiAmount) || 0;
				const totalPayable = parseFloat(d.totalPayable) || (emiAmt + penaltyAmt);

				const dueDateVal = d.dueDate || d.emiDueDate || '-';
				$('#penaltyDueDate').val(dueDateVal);
				$('#penaltyModeDisplay').val(d.penaltyMode || 'Flat');
				$('#penaltyAmountDisplay').val('₹ ' + penaltyAmt.toFixed(2));
				$('#totalPayableDisplay').val('₹ ' + totalPayable.toFixed(2));

				// Always show the penalty section during loan payment
				$('#penaltySectionWrapper').slideDown(250);

				if (daysLate > 0) {
					$('#penaltyHeaderTitle').html('⚠ LATE PAYMENT PENALTY (' + daysLate + ' DAY' + (daysLate > 1 ? 'S' : '') + ' LATE)').css('color', '#e53935');
					$('#penaltyBoxContainer').css({ 'background': '#fff8f8', 'border-color': '#ffcdd2' });
					$('#penaltyDaysLate').val(daysLate + ' day(s) late').css({ 'color': '#c62828', 'background': '#ffebee' });
					$('#penaltyAmountDisplay').css({ 'color': '#c62828', 'background': '#ffebee' });
					// Flash effect for attention
					setTimeout(function() {
						$('#penaltyAmountDisplay').css('background', '#ffcdd2');
						setTimeout(function() {
							$('#penaltyAmountDisplay').css('background', '#ffebee');
						}, 400);
					}, 50);
				} else {
					$('#penaltyHeaderTitle').html('✓ EMI & PENALTY STATUS (ON TIME - NO PENALTY)').css('color', '#2e7d32');
					$('#penaltyBoxContainer').css({ 'background': '#f1f8e9', 'border-color': '#c8e6c9' });
					$('#penaltyDaysLate').val('0 days (On Time)').css({ 'color': '#2e7d32', 'background': '#e8f5e9' });
					$('#penaltyAmountDisplay').css({ 'color': '#2e7d32', 'background': '#e8f5e9' });
				}
			} else {
				hidePenaltySection();
			}
		},
		error: function() {
			hidePenaltySection();
		}
	});
}

function hidePenaltySection() {
	$('#penaltySectionWrapper').slideUp(200);
	$('#penaltyDueDate').val('');
	$('#penaltyDaysLate').val('');
	$('#penaltyModeDisplay').val('');
	$('#penaltyAmountDisplay').val('');
	$('#totalPayableDisplay').val('');
}

// Trigger preview when payment date changes
$(document).ready(function() {
	$(document).on('change', '#paymentDate', function() {
		fetchPenaltyPreview();
	});

	$(document).on('change', '#findByLoanId', function() {
		fetchPenaltyPreview();
	});
});