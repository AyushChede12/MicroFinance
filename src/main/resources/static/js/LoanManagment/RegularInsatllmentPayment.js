let customerSavingsAccounts = [];
let currentLoanData = null;
let currentLoanPayments = [];

function approvedLoanIdDropdown() {
	$.ajax({
		url: "api/loanmanegment/getApprovedLoanIds",
		type: "GET",
		dataType: "json",
		success: function(response) {
			if (response.status === "OK" && Array.isArray(response.data)) {
				const $dropdown = $("#loanID");
				$dropdown.empty();
				$dropdown.append('<option value="" disabled selected>Select Loan ID</option>');
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

function loadSavingsAccounts(memberId) {
	customerSavingsAccounts = [];
	const $accDropdown = $("#savingAccountNo");
	$accDropdown.empty().append('<option value="">Loading accounts...</option>');
	$("#savingBalance").val("Fetching balance...").css({ "background": "#f9f9f9", "color": "#555" });

	if (!memberId) {
		memberId = $("#customercode").val();
	}

	if (!memberId) {
		$accDropdown.empty().append('<option value="">Please select Loan ID first</option>');
		$("#savingBalance").val("No Customer Selected").css({ "background": "#f9f9f9", "color": "#757575" });
		return;
	}

	$.ajax({
		url: "api/customersavings/getAccountNumbersByCode",
		type: "GET",
		data: { selectByCustomer: memberId },
		dataType: "json",
		success: function(response) {
			$accDropdown.empty();
			if (response.status === "FOUND" && Array.isArray(response.data) && response.data.length > 0) {
				customerSavingsAccounts = response.data;
				$accDropdown.append('<option value="" disabled>Select Account</option>');
				customerSavingsAccounts.forEach(function(acc) {
					$accDropdown.append(`<option value="${acc.accountNumber}">${acc.accountNumber}</option>`);
				});

				// Auto-select first account
				const firstAcc = customerSavingsAccounts[0];
				$accDropdown.val(firstAcc.accountNumber);
				updateBalanceDisplay(firstAcc);
			} else {
				$accDropdown.append('<option value="">No Savings Account Found</option>');
				$("#savingBalance").val("No Account Found").css({ "background": "#f9f9f9", "color": "#757575" });
			}
		},
		error: function(xhr, status, error) {
			console.error("Error fetching savings accounts:", error);
			$accDropdown.empty().append('<option value="">Error Loading Accounts</option>');
			$("#savingBalance").val("Error Fetching Balance").css({ "background": "#ffebee", "color": "#c62828" });
		}
	});
}

function updateBalanceDisplay(acc) {
	if (!acc) {
		$("#savingBalance").val("Rs. 0.00").css({ "background": "#e8f5e9", "color": "#1b5e20" });
		return;
	}

	const rawBal = acc.balance;
	const bal = parseFloat(rawBal || 0);
	const formattedBal = "Rs. " + bal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	$("#savingBalance").val(formattedBal);

	const dueAmt = parseFloat($("#paymentAmount").val()) || parseFloat($("#dueAmounttotal").val()) || 0;
	if (dueAmt > 0 && bal < dueAmt) {
		$("#savingBalance").css({ "background": "#ffebee", "color": "#c62828" });
	} else {
		$("#savingBalance").css({ "background": "#e8f5e9", "color": "#1b5e20" });
	}
}

let hasAlertedMatch = false;

function calculateDenomination() {
	const c500 = parseInt($("#denom500").val()) || 0;
	const c200 = parseInt($("#denom200").val()) || 0;
	const c100 = parseInt($("#denom100").val()) || 0;
	const c50 = parseInt($("#denom50").val()) || 0;
	const c20 = parseInt($("#denom20").val()) || 0;
	const c10 = parseInt($("#denom10").val()) || 0;
	const c5 = parseInt($("#denom5").val()) || 0;
	const c2 = parseInt($("#denom2").val()) || 0;
	const c1 = parseInt($("#denom1").val()) || 0;

	const s500 = c500 * 500;
	const s200 = c200 * 200;
	const s100 = c100 * 100;
	const s50 = c50 * 50;
	const s20 = c20 * 20;
	const s10 = c10 * 10;
	const s5 = c5 * 5;
	const s2 = c2 * 2;
	const s1 = c1 * 1;

	$("#denomSub500").text("Rs. " + s500.toLocaleString('en-IN'));
	$("#denomSub200").text("Rs. " + s200.toLocaleString('en-IN'));
	$("#denomSub100").text("Rs. " + s100.toLocaleString('en-IN'));
	$("#denomSub50").text("Rs. " + s50.toLocaleString('en-IN'));
	$("#denomSub20").text("Rs. " + s20.toLocaleString('en-IN'));
	$("#denomSub10").text("Rs. " + s10.toLocaleString('en-IN'));
	$("#denomSub5").text("Rs. " + s5.toLocaleString('en-IN'));
	$("#denomSub2").text("Rs. " + s2.toLocaleString('en-IN'));
	$("#denomSub1").text("Rs. " + s1.toLocaleString('en-IN'));

	const totalNotes = c500 + c200 + c100 + c50 + c20 + c10 + c5 + c2 + c1;
	const grandTotal = s500 + s200 + s100 + s50 + s20 + s10 + s5 + s2 + s1;

	$("#totalNotesCount").text(totalNotes);
	$("#denominationGrandTotal").text("Rs. " + grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

	const expectedAmt = parseFloat($("#paymentAmount").val()) || parseFloat($("#dueAmounttotal").val()) || 0;
	const $badge = $("#denominationMatchBadge");
	const $alertBox = $("#denominationAlertMsg");

	if (expectedAmt > 0 && grandTotal > 0) {
		$badge.show();
		$alertBox.show();
		const diff = Math.round((grandTotal - expectedAmt) * 100) / 100;
		if (Math.abs(diff) < 0.01) {
			$badge.text("✓ Exact Match").css({ "background": "#d1fae5", "color": "#065f46" });
			$alertBox.html('<i class="bi bi-check-circle-fill" style="margin-right: 6px;"></i> Cash Note Denomination Total (Rs. ' + grandTotal.toFixed(2) + ') matches Payment Amount successfully!')
				.css({ "background": "#d1fae5", "color": "#065f46", "border": "1px solid #6ee7b7" });

			if (!hasAlertedMatch) {
				hasAlertedMatch = true;
				setTimeout(function() {
					alert("✓ Cash Note Denomination Total (Rs. " + grandTotal.toFixed(2) + ") matches Payment Amount successfully!");
				}, 80);
			}
		} else {
			hasAlertedMatch = false;
			if (diff > 0) {
				$badge.text("+ Rs. " + diff.toFixed(2) + " Extra").css({ "background": "#fef3c7", "color": "#92400e" });
				$alertBox.html('<i class="bi bi-exclamation-triangle-fill" style="margin-right: 6px;"></i> Cash Denomination (Rs. ' + grandTotal.toFixed(2) + ') exceeds Payment Amount (Rs. ' + expectedAmt.toFixed(2) + ') by Rs. ' + diff.toFixed(2))
					.css({ "background": "#fef3c7", "color": "#92400e", "border": "1px solid #fcd34d" });
			} else {
				$badge.text("- Rs. " + Math.abs(diff).toFixed(2) + " Short").css({ "background": "#fee2e2", "color": "#991b1b" });
				$alertBox.html('<i class="bi bi-exclamation-circle-fill" style="margin-right: 6px;"></i> Cash Denomination (Rs. ' + grandTotal.toFixed(2) + ') is short by Rs. ' + Math.abs(diff).toFixed(2) + ' (Payment Amount: Rs. ' + expectedAmt.toFixed(2) + ')')
					.css({ "background": "#fee2e2", "color": "#991b1b", "border": "1px solid #fca5a5" });
			}
		}
	} else {
		hasAlertedMatch = false;
		$badge.hide();
		$alertBox.hide();
	}
}

function resetDenominations() {
	hasAlertedMatch = false;
	$(".denom-count").val("");
	$("#denomSub500, #denomSub200, #denomSub100, #denomSub50, #denomSub20, #denomSub10, #denomSub5, #denomSub2, #denomSub1").text("Rs. 0");
	$("#totalNotesCount").text("0");
	$("#denominationGrandTotal").text("Rs. 0.00");
	$("#denominationMatchBadge").hide();
	$("#denominationAlertMsg").hide();
}

function recalculatePenalty() {
	const emiDueDateVal = $("#emiDueDate").val();
	const payDateVal = $("#PaymentDate").val();
	const emiAmt = parseFloat($("#paymentAmount").val()) || parseFloat($("#paymnetEmi").val()) || 0;

	if (!emiDueDateVal || !payDateVal) {
		$("#penaltyAmount").val("Rs. 0.00");
		return;
	}

	const emiDue = new Date(emiDueDateVal);
	const payDate = new Date(payDateVal);
	const graceDays = 5;

	// Deadline = due date + 5 days grace
	const deadline = new Date(emiDue);
	deadline.setDate(deadline.getDate() + graceDays);

	const diffTime = payDate.getTime() - deadline.getTime();
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	const daysLate = Math.max(0, diffDays);

	if (daysLate > 0) {
		const penaltyRate = 0.02; // 2% penalty
		const penalty = Math.round(emiAmt * penaltyRate * 100) / 100;
		$("#penaltyAmount").val("Rs. " + penalty.toFixed(2)).css("color", "#c62828");
	} else {
		$("#penaltyAmount").val("Rs. 0.00").css("color", "#2e7d32");
	}
}

function getPeriodDays(mode) {
	switch (mode) {
		case "Daily": return 1;
		case "Weekly": return 7;
		case "Fortnightly": return 14;
		case "Quarterly": return 91;
		default: return 30; // Monthly
	}
}

function calculateDueDate(baseDateStr, instNum, mode) {
	if (!baseDateStr) return "";
	try {
		const base = new Date(baseDateStr);
		const periodDays = getPeriodDays(mode);
		base.setDate(base.getDate() + (instNum * periodDays));
		return base.toISOString().split('T')[0];
	} catch (e) {
		return "";
	}
}

$(document).ready(function() {
	// Default Payment Date to today
	const todayStr = new Date().toISOString().split('T')[0];
	$("#PaymentDate").val(todayStr);

	// Load loan IDs
	approvedLoanIdDropdown();

	// Load Financial Consultants (Codes and Names)
	function loadFinancialConsultants(selectedCode) {
		$.ajax({
			url: 'api/financialconsultant/getAllFinancialConsultantDetails',
			type: 'GET',
			dataType: 'json',
			success: function(response) {
				const $dropdown = $('#financialConsultantId');
				$dropdown.empty().append('<option value="">-- SELECT FINANCIAL CONSULTANT --</option>');
				if (response && response.data && Array.isArray(response.data)) {
					response.data.forEach(function(c) {
						const code = c.financialCode || '';
						const name = (c.financialName || '').toUpperCase();
						if (code) {
							$dropdown.append(`<option value="${code}" data-name="${name}">${code} - ${name}</option>`);
						}
					});
					if (selectedCode) {
						$dropdown.val(selectedCode).trigger('change');
					}
				}
			},
			error: function(xhr) {
				console.error("Error loading financial consultants:", xhr);
			}
		});
	}

	loadFinancialConsultants();

	// Auto-populate Financial Consultant Name on Code Selection
	$("#financialConsultantId").on("change", function() {
		const selectedOpt = $(this).find("option:selected");
		const name = selectedOpt.data("name") || "";
		if (name) {
			$("#financialConsultantName").val(name);
		}
	});

	$("#PaymentDate").on("change", function() {
		recalculatePenalty();
	});

	// Note Denomination input listeners
	$(document).on("input change", ".denom-count", function() {
		calculateDenomination();
	});

	// Mode of payment change: toggle Cash Denomination OR Savings Account number & balance
	$("#sourcePayment").on("change", function() {
		const mode = $(this).val();
		if (mode === "Cash") {
			$("#cashDenominationWrapper").slideDown(200);
			$("#savingAccountWrapper").hide();
			$("#savingBalanceWrapper").hide();
			$("#savingAccountNo").empty().append('<option value="">SELECT ACCOUNT</option>');
			$("#savingBalance").val("");
			calculateDenomination();
		} else if (mode === "Saving Account") {
			$("#cashDenominationWrapper").hide();
			resetDenominations();
			$("#savingAccountWrapper").show();
			$("#savingBalanceWrapper").show();
			const memberId = $("#customercode").val();
			loadSavingsAccounts(memberId);
		} else {
			$("#cashDenominationWrapper").hide();
			resetDenominations();
			$("#savingAccountWrapper").hide();
			$("#savingBalanceWrapper").hide();
			$("#savingAccountNo").empty().append('<option value="">SELECT ACCOUNT</option>');
			$("#savingBalance").val("");
		}
	});

	// When savings account dropdown changes, display its balance
	$("#savingAccountNo").on("change", function() {
		const selAccNo = $(this).val();
		const matched = customerSavingsAccounts.find(a => a.accountNumber === selAccNo);
		updateBalanceDisplay(matched);
	});

	// When Loan ID changes:
	$("#loanID").on("change", function() {
		const selectedLoanId = $(this).val();

		if (!selectedLoanId) return;

		// 1. Fetch Loan Details
		$.ajax({
			url: "api/loanmanegment/getLoanById",
			type: "GET",
			data: { loanId: selectedLoanId },
			dataType: "json",
			success: function(response) {
				if (response.status === "OK" && response.data) {
					currentLoanData = response.data;
					const data = currentLoanData;

					// Populate loan details form fields
					$("#date").val(data.loanDate || "");
					$("#customercode").val(data.memberId || "");
					$("#customerName").val(data.memberName || "");
					$("#contact").val(data.contactNo || "");
					$("#BranchAddress").val(data.address || "");
					$("#branchName").val(data.branchName || "");
					$("#typeOfLoan").val(data.typeOfLoan || "");
					$("#loanmode").val(data.loanMode || "");
					$("#term").val(data.loanTerm || "");
					$("#rateofinterest").val(data.rateOfInterest || "");
					$("#amountLoan").val(data.loanAmount || "");
					$("#intesteType").val(data.interestType || "");
					$("#paymnetEmi").val(data.emiPayment || "");
					if (data.financialConsultantId) {
						$("#financialConsultantId").val(data.financialConsultantId).trigger('change');
					}
					if (data.financialConsultantName) {
						$("#financialConsultantName").val(data.financialConsultantName);
					}

					// Reset payment mode to prompt by default
					$("#sourcePayment").val("");
					$("#savingAccountWrapper").hide();
					$("#savingBalanceWrapper").hide();
					$("#cashDenominationWrapper").hide();
					resetDenominations();
					$("#savingAccountNo").empty().append('<option value="">SELECT ACCOUNT</option>');
					$("#savingBalance").val("");

					// 2. Fetch existing payments to build full installment schedule
					function renderInstallmentDropdown(paymentList, loanInfo) {
						const dropdown = $("#installment");
						dropdown.empty();

						const allRows = Array.isArray(paymentList) ? paymentList : [];
						currentLoanPayments = allRows.filter(p => {
							const rem = (p.remarks || '').toLowerCase();
							return !rem.includes('disbursement') && p.noOfInst !== '0';
						});
						const paidCount = currentLoanPayments.length;
						const totalTerm = parseInt(loanInfo.loanTerm) || 12;

						dropdown.append('<option value="" disabled>Select Installment</option>');

						// Add already paid installments
						currentLoanPayments.forEach((p, idx) => {
							const instNum = idx + 1;
							const label = (p.remarks || `Installment ${instNum}`) + " (PAID)";
							dropdown.append(`<option value="paid_${p.remarks || instNum}" data-paid="true" data-index="${idx}">${label}</option>`);
						});

						// Add next due installment (auto-selected!)
						const nextInstNum = paidCount + 1;
						if (nextInstNum <= totalTerm) {
							const nextLabel = `Installment ${nextInstNum} (DUE FOR PAYMENT)`;
							dropdown.append(`<option value="Installment ${nextInstNum}" data-paid="false" data-instnum="${nextInstNum}" selected>${nextLabel}</option>`);
						}

						// Add remaining future installments
						for (let i = nextInstNum + 1; i <= totalTerm; i++) {
							dropdown.append(`<option value="Installment ${i}" data-paid="false" data-instnum="${i}">Installment ${i}</option>`);
						}

						// Trigger change on installment to populate payment fields
						dropdown.trigger("change");
					}

					$.ajax({
						url: "api/loanmanegment/fetchLoanPaymentsByLoanId",
						type: "GET",
						data: { loanId: selectedLoanId },
						dataType: "json",
						success: function(payResp) {
							const rows = (payResp && payResp.status === "OK" && Array.isArray(payResp.data)) ? payResp.data : [];
							renderInstallmentDropdown(rows, data);
						},
						error: function() {
							// If 0 payments or error returned, still populate schedule with Installment 1 due!
							renderInstallmentDropdown([], data);
						}
					});
				} else {
					alert("Loan data not found.");
				}
			},
			error: function(xhr) {
				alert("Error fetching loan data: " + xhr.responseText);
			}
		});
	});

	// When Installment changes:
	$("#installment").on("change", function() {
		const $selectedOpt = $(this).find("option:selected");
		const isPaid = $selectedOpt.data("paid");
		const selectedVal = $(this).val();

		if (!currentLoanData) return;

		const todayStr = new Date().toISOString().split('T')[0];
		if (!$("#PaymentDate").val()) {
			$("#PaymentDate").val(todayStr);
		}
		$("#registrationDate").val(currentLoanData.loanDate || "");
		$("#netAmount").val(currentLoanData.loanAmount || "");

		if (isPaid === true) {
			// This installment is ALREADY paid -> View details in readonly mode
			const paidIdx = parseInt($selectedOpt.data("index"));
			const paidPayment = currentLoanPayments[paidIdx];

			if (paidPayment) {
				$("#dueAmounttotal").val(paidPayment.amountDue || "0.00");
				$("#paymentAmount").val(paidPayment.emiPayment || currentLoanData.emiPayment);
				$("#emiDueDate").val(paidPayment.dueDate || "");
				$("#PaymentDate").val(paidPayment.paymentDate || todayStr);
				$("#sourcePayment").val(paidPayment.paymentMode || "");
				$("#penaltyAmount").val(paidPayment.penaltyAmount ? ("Rs. " + paidPayment.penaltyAmount) : "Rs. 0.00");
				$("#sectionRemARK").val(paidPayment.remarks || "PAID");

				// Update pay button to indicate already paid
				$("#payEmiBtn").prop("disabled", true).removeClass("btn-success").addClass("btn-secondary")
					.html('<i class="bi bi-check-all"></i> ALREADY PAID');
			}
		} else {
			// This installment is DUE FOR PAYMENT -> Enable Pay button and populate fresh values
			$("#payEmiBtn").prop("disabled", false).removeClass("btn-secondary").addClass("btn-success")
				.html('<i class="bi bi-credit-card-2-front"></i> PAY EMI');

			// Determine installment number
			let instNum = parseInt($selectedOpt.data("instnum"));
			if (!instNum) {
				const digits = (selectedVal || "").replace(/\D/g, '');
				instNum = digits ? parseInt(digits, 10) : (currentLoanPayments.length + 1);
			}

			// EMI amount
			const emiAmt = currentLoanData.emiPayment || "0.00";
			$("#paymentAmount").val(emiAmt);

			// Calculate remaining amount due
			let lastDue = parseFloat(currentLoanData.loanAmount || 0);
			if (currentLoanPayments.length > 0) {
				const lastPayment = currentLoanPayments[currentLoanPayments.length - 1];
				if (lastPayment.amountDue) {
					lastDue = parseFloat(lastPayment.amountDue);
				}
			}
			$("#dueAmounttotal").val(lastDue.toFixed(2));

			// Calculate EMI Due Date
			const calculatedDue = calculateDueDate(currentLoanData.loanDate, instNum, currentLoanData.loanMode);
			$("#emiDueDate").val(calculatedDue);

			// Recalculate penalty
			recalculatePenalty();
		}
	});

	// ==========================================
	// ⭐ PAY EMI BUTTON SUBMIT HANDLER
	// ==========================================
	$("#payEmiBtn").on("click", function(e) {
		e.preventDefault();

		const loanId = $("#loanID").val();
		if (!loanId) {
			alert("⚠️ Please select a Loan ID first.");
			$("#loanID").focus();
			return;
		}

		const installment = $("#installment").val();
		if (!installment) {
			alert("⚠️ Please select an installment to pay.");
			$("#installment").focus();
			return;
		}

		const isPaid = $("#installment").find("option:selected").data("paid");
		if (isPaid === true) {
			alert("⚠️ This installment is already paid. Please select the next due installment.");
			return;
		}

		const paymentMode = $("#sourcePayment").val();
		if (!paymentMode) {
			alert("⚠️ Please select Mode of Payment (Cash or Saving Account).");
			$("#sourcePayment").focus();
			return;
		}

		const paymentAmt = parseFloat($("#paymentAmount").val()) || 0;
		if (paymentAmt <= 0) {
			alert("⚠️ Invalid Payment Amount.");
			return;
		}

		let penaltyAmt = 0;
		const rawPenalty = $("#penaltyAmount").val() || "";
		const cleanPenalty = rawPenalty.replace(/[^0-9.]/g, '');
		if (cleanPenalty) {
			penaltyAmt = parseFloat(cleanPenalty) || 0;
		}
		const totalPayable = paymentAmt + penaltyAmt;

		// Validation for Cash Mode: check denominations
		if (paymentMode === "Cash") {
			const grandTotalText = $("#denominationGrandTotal").text().replace(/[^0-9.]/g, '');
			const denomTotal = parseFloat(grandTotalText) || 0;

			if (denomTotal > 0) {
				const diff = Math.abs(denomTotal - paymentAmt);
				if (diff > 0.01) {
					alert(`⚠️ Cash Denomination Total (Rs. ${denomTotal.toFixed(2)}) does not match Payment Amount (Rs. ${paymentAmt.toFixed(2)}). Please adjust note/coin counts.`);
					return;
				}
			}
		}

		// Validation for Saving Account Mode
		let accountNo = $("#savingAccountNo").val();
		if (paymentMode === "Saving Account") {
			if (!accountNo) {
				alert("⚠️ Please select customer's Savings Account.");
				$("#savingAccountNo").focus();
				return;
			}

			const rawBalText = $("#savingBalance").val() || "";
			const currentBal = parseFloat(rawBalText.replace(/[^0-9.]/g, '')) || 0;
			if (currentBal < totalPayable) {
				alert(`❌ Insufficient Savings Account Balance!\nRequired: Rs. ${totalPayable.toFixed(2)}\nAvailable: Rs. ${currentBal.toFixed(2)}`);
				return;
			}
		}

		// Confirm before submitting
		const confirmMsg = `Are you sure you want to process EMI Payment?\n\nLoan ID: ${loanId}\nInstallment: ${installment}\nEMI Amount: Rs. ${paymentAmt.toFixed(2)}\nPenalty: Rs. ${penaltyAmt.toFixed(2)}\nTotal: Rs. ${totalPayable.toFixed(2)}\nMode: ${paymentMode}`;
		if (!confirm(confirmMsg)) {
			return;
		}

		const $btn = $("#payEmiBtn");
		$btn.prop("disabled", true).html('<i class="bi bi-hourglass-split"></i> PROCESSING PAYMENT...');

		const payload = {
			loanId: loanId,
			installmentNo: installment,
			paymentDate: $("#PaymentDate").val() || todayStr,
			paymentMode: paymentMode,
			accountNo: accountNo || "",
			paymentAmount: paymentAmt,
			penaltyAmount: penaltyAmt,
			emiDueDate: $("#emiDueDate").val(),
			financialConsultantId: $("#financialConsultantId").val(),
			financialConsultantName: $("#financialConsultantName").val(),
			remarks: $("#sectionRemARK").val() || ("EMI " + installment)
		};

		$.ajax({
			url: "api/loanmanegment/payRegularInstallment",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(payload),
			success: function(res) {
				$btn.prop("disabled", false).html('<i class="bi bi-credit-card-2-front"></i> PAY EMI');
				if (res.status === "OK") {
					alert("✓ " + res.message);
					if (res.data && res.data.isLoanClosed) {
						alert("🎉 Congratulations! This loan is now completely CLOSED.");
					}
					// Re-trigger loan change to refresh the installment list and select next due installment
					$("#loanID").trigger("change");
				} else {
					alert("❌ " + (res.message || "Failed to process payment."));
				}
			},
			error: function(xhr) {
				$btn.prop("disabled", false).html('<i class="bi bi-credit-card-2-front"></i> PAY EMI');
				const errMsg = xhr.responseJSON?.message || xhr.responseText || "Server error";
				alert("❌ Payment Failed: " + errMsg);
			}
		});
	});

	// Reset button handler
	$("#resetBtn").on("click", function() {
		if (confirm("Reset the payment form?")) {
			$("#formid")[0].reset();
			resetDenominations();
			$("#savingAccountWrapper").hide();
			$("#savingBalanceWrapper").hide();
			$("#cashDenominationWrapper").hide();
			$("#loanID").val("");
		}
	});
});