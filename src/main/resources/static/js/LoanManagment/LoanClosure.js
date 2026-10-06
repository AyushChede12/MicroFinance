// ✅ Js for populating the loanid in the dropdown (Vaibhav)
$(document).ready(function() {
	populateapprovedLoanIdDropdown();
});

function populateapprovedLoanIdDropdown() {

	$.ajax({
		url: "api/loanmanegment/getApprovedLoanIds",
		type: "GET",
		dataType: "json",
		success: function(response) {
			console.log("Loan ID response:", response); // for debugging

			if (response.status === "OK" && Array.isArray(response.data)) {
				const $dropdown = $("#earlyLoanclosureId"); // Make sure this matches your HTML ID exactly
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

$(document).ready(function() {
	$("#earlyLoanclosureId").on("change", function() {
		const selectedLoanId = $(this).val();
		if (!selectedLoanId) {
			console.error("Loan ID is required.");
			return;
		}

		// 🔹 Step 1: Get Installment Count
		fetchInstallmentCount(selectedLoanId, function(count) {
			console.log("Installment Count:", count);

			// 🔹 Step 2: Fetch Loan Details and Pass the Count
			fetchLoanDetails(selectedLoanId, count);
		});
	});
});

// 🔹 Function to fetch installment count
function fetchInstallmentCount(loanId, callback) {
	$.ajax({
		url: `api/loanmanegment/fetchLoanPaymentsByLoanId?loanId=${loanId}`,
		type: "GET",
		dataType: "json",
		success: function(response) {
			let count = 0;
			if (response && response.data && Array.isArray(response.data)) {
				count = response.data.length;
			} else {
				console.warn("No payments found for this Loan ID");
			}
			callback(count); // ✅ Send count back
		},
		error: function(xhr) {
			console.error("Error fetching installments count:", xhr.responseText);
			callback(0); // Return 0 if error
		}
	});
}

function fetchLoanDetails(loanId, installmentCount) {
	$.ajax({
		url: "api/loanmanegment/getLoanById",
		type: "GET",
		data: { loanId: loanId },
		dataType: "json",
		success: function(response) {
			if (response.status === "OK" && response.data) {
				const data = response.data;

				// ✅ Populate basic loan fields
				$("#dateofLoan").val(data.loanDate);
				$("#memberId").val(`${data.memberId} - ${data.memberName || "-"}`);
				$("#relativeDetails").val(data.relativeDetails || "");
				$("#branchName").val(data.branchName || "");
				$("#contactNo").val(data.contactNo || "");
				$("#loanPlanName").val(data.loanPlanName || data.typeOfLoan || "");
				$("#typeOfLoan").val(data.typeOfLoan || "");
				$("#totalprincipalloan").val(data.sanctionedAmount || data.loanAmount || "0");
				$("#loanAmount").val(data.loanAmount || "0");
				$("#rateOfInterest").val(data.rateOfInterest || "0");
				$("#loanTerm").val(data.loanTerm || "0");
				$("#loanMode").val(data.loanMode || "Monthly");
				$("#interestType").val(data.interestType || "Reducing Interest");
				$("#sanctionedAmount").val(data.sanctionedAmount || data.loanAmount || "0");
				$("#noOfInst").val(installmentCount + " INSTALLMENTS");
				$("#financialConsultantId").val(data.financialConsultantId || "");
				$("#financialConsultantName").val(data.financialConsultantName || "");

				// ✅ Numerical variables
				let loanAmount = parseFloat(data.loanAmount) || 0;
				let rateOfInterest = parseFloat(data.rateOfInterest) || 0;
				let loanTerm = parseFloat(data.loanTerm) || 0;
				let loanMode = (data.loanMode || "").trim().toLowerCase();
				let interestType = (data.interestType || "").trim().toLowerCase();
				let emiPayment = parseFloat(data.emiPayment) || 0;

				// ✅ Determine payments per year
				let paymentsPerYear = 12;
				if (loanMode === "daily") paymentsPerYear = 365;
				else if (loanMode === "weekly") paymentsPerYear = 52;
				else if (loanMode === "fortnightly") paymentsPerYear = 26;
				else if (loanMode === "monthly") paymentsPerYear = 12;
				else if (loanMode === "quarterly") paymentsPerYear = 4;
				else if (loanMode === "yearly") paymentsPerYear = 1;

				// ✅ Total installments count is loanTerm (e.g. 60 months = 60 installments)
				let totalPayments = loanTerm > 0 ? loanTerm : 1;
				let termInYears = totalPayments / paymentsPerYear;

				let totalinterestofLoan = 0;
				let emi = 0;

				if (interestType.includes("flat")) {
					// Flat Interest: Total Interest = (P * R * T_years) / 100
					totalinterestofLoan = (loanAmount * rateOfInterest * termInYears) / 100;
					emi = totalPayments > 0 ? ((loanAmount + totalinterestofLoan) / totalPayments) : 0;
				} else {
					// Reducing Balance: Standard Amortization formula
					let periodicRate = (rateOfInterest / paymentsPerYear) / 100;
					if (periodicRate > 0) {
						let compound = Math.pow(1 + periodicRate, totalPayments);
						emi = (loanAmount * periodicRate * compound) / (compound - 1);
					} else {
						emi = totalPayments > 0 ? (loanAmount / totalPayments) : 0;
					}

					// If the loan application already stored an EMI (e.g. 1365.18), use it to reconcile exact cents
					if (emiPayment > 0 && Math.abs(emiPayment - emi) < 1.0) {
						emi = emiPayment;
					}
					totalinterestofLoan = (emi * totalPayments) - loanAmount;
				}

				if (emiPayment > 0 && Math.abs(emiPayment - emi) < 1.0) {
					emi = emiPayment;
				}

				let totalPayableofLoan = loanAmount + totalinterestofLoan;

				$("#emiPayment").val(emi.toFixed(2));
				$("#totalinterestofLoan").val(totalinterestofLoan.toFixed(2));
				$("#totalPayableofLoan").val(totalPayableofLoan.toFixed(2));

				// 🔹 Installments Paid so far
				let paidCount = parseInt(installmentCount) || 0;
				let amountPaid = emi * paidCount;

				// 🔹 Calculate Interest Due & Principal Due
				let principaldue = loanAmount;
				let interestDue = totalinterestofLoan;

				if (interestType.includes("flat")) {
					let principalPerInst = totalPayments > 0 ? (loanAmount / totalPayments) : 0;
					let interestPerInst = totalPayments > 0 ? (totalinterestofLoan / totalPayments) : 0;
					principaldue = Math.max(0, loanAmount - (principalPerInst * paidCount));
					interestDue = Math.max(0, totalinterestofLoan - (interestPerInst * paidCount));
				} else {
					// Reducing balance amortization schedule up to paidCount
					let periodicRate = (rateOfInterest / paymentsPerYear) / 100;
					let runningPrincipal = loanAmount;
					let totalInterestAccrued = 0;
					for (let i = 1; i <= paidCount; i++) {
						let intPart = runningPrincipal * periodicRate;
						let prinPart = emi - intPart;
						if (prinPart > runningPrincipal) prinPart = runningPrincipal;
						if (prinPart < 0) prinPart = 0;
						runningPrincipal -= prinPart;
						totalInterestAccrued += intPart;
						if (runningPrincipal <= 0) {
							runningPrincipal = 0;
							break;
						}
					}
					principaldue = runningPrincipal;
					interestDue = Math.max(0, totalinterestofLoan - totalInterestAccrued);
				}

				// 🔹 Balance Loan Amount
				let balanceLoanAmount = Math.max(0, totalPayableofLoan - amountPaid);

				// ✅ Bind values
				$("#interestDue").val(interestDue.toFixed(2));
				$("#principaldue").val(principaldue.toFixed(2));
				$("#amountPaid").val(amountPaid.toFixed(2));
				$("#balanceLoanAmount").val(balanceLoanAmount.toFixed(2));

				// Auto-fill payment amount & net amount
				let fineAmt = parseFloat($("#deeductfienamount").val()) || 0;
				let netToPay = balanceLoanAmount + fineAmt;
				$("#paymentamount").val(balanceLoanAmount.toFixed(2));
				$("#netamount").val(netToPay.toFixed(2));

				console.log("Installments Paid:", paidCount);
				console.log("Total Interest:", totalinterestofLoan);
				console.log("Total Payable:", totalPayableofLoan);
				console.log("Interest Due:", interestDue);
				console.log("Principal Due:", principaldue);
				console.log("Amount Paid:", amountPaid);
				console.log("Balance Loan Amount:", balanceLoanAmount);

			} else {
				alert("Loan data not found.");
			}
		},
		error: function(xhr) {
			alert("Error fetching loan data: " + xhr.responseText);
		}
	});
}

$(document).ready(function() {
	// Initialize Payment Date to today
	const today = new Date().toISOString().split('T')[0];
	if (!$("#paymentDate").val()) {
		$("#paymentDate").val(today);
	}

	// Recalculate Net Amount on Payment Amount or Fine change
	$("#paymentamount, #deeductfienamount").on("input change", function() {
		let pay = parseFloat($("#paymentamount").val()) || 0;
		let fine = parseFloat($("#deeductfienamount").val()) || 0;
		$("#netamount").val((pay + fine).toFixed(2));
	});

	// Toggle Deduct Fine
	$("#deductfine").on("change", function() {
		if ($(this).val() !== "YES" && $(this).val() !== "Blue") {
			$("#deeductfienamount").val("0");
		}
		let pay = parseFloat($("#paymentamount").val()) || 0;
		let fine = parseFloat($("#deeductfienamount").val()) || 0;
		$("#netamount").val((pay + fine).toFixed(2));
	});

	// Submit Loan Closure
	$("#closeLoanBtn").on("click", function(e) {
		e.preventDefault();

		const loanId = $("#earlyLoanclosureId").val();
		if (!loanId) {
			alert("Please select a Loan ID first.");
			return;
		}

		// Collect data with fallback IDs to match both JSP naming conventions
		const loanClosureData = {
			loanId: loanId,
			loanDate: $("#dateofLoan").val() || $("#loanDate").val(),
			memberId: $("#memberId").val(),
			memberName: $("#memberName").val(),
			relativeDetails: $("#relativeDetails").val(),
			contactNo: $("#contactNo").val(),
			branchName: $("#branchName").val(),
			loanPlanName: $("#loanPlanName").val(),
			typeOfLoan: $("#typeOfLoan").val(),
			loanMode: $("#loanMode").val(),
			loanTerm: $("#loanTerm").val(),
			rateOfInterest: $("#rateOfInterest").val(),
			loanAmount: $("#loanAmount").val(),
			interestType: $("#interestType").val(),
			emiPayment: $("#emiPayment").val(),
			totalinterestofLoan: $("#totalinterestofLoan").val(),
			sanctionedAmount: $("#sanctionedAmount").val(),
			totalPayableofLoan: $("#totalPayableofLoan").val(),
			noOfInst: $("#noOfInst").val(),

			interestDue: $("#interestDue").val(),
			principaldue: $("#principaldue").val(),
			amountPaid: $("#amountPaid").val(),
			balanceLoanAmount: $("#balanceLoanAmount").val(),
			dueDate: $("#dueDate").val(),
			paymentBranch: $("#paymentBranch").val(),
			fine: $("#deeductfienamount").val() || $("#fine").val() || "0",
			paymentAmount: $("#paymentamount").val() || $("#paymentAmount").val(),
			netAmount: $("#netamount").val() || $("#netAmount").val(),

			paymentDate: $("#paymentDate").val(),
			paymentMode: $("#paymentMode").val() || $("#modeofPayment").val(),
			ref_UpiId: $("#refNo").val() || $("#ref_UpiId").val(),
			charges: $("#charges").val() || "0.00",
			remarks: $("#remark").val() || $("#remarks").val(),
			chequeDate: $("#chequeDate").val(),
			chequeNo: $("#chequeNo").val(),

			financialConsultantId: $("#financialConsultantId").val(),
			financialConsultantName: $("#financialConsultantName").val(),
			loanStatus: "CLOSED"
		};

		console.log("Loan Closure Payload:", loanClosureData);

		// Send to backend
		$.ajax({
			url: "api/loanmanegment/closeLoan",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(loanClosureData),
			success: function(response) {
				alert(response.message || "Loan closed successfully!");
				location.reload();
			},
			error: function(xhr) {
				console.error("Error:", xhr.responseText);
				let errMsg = "Something went wrong while closing the loan!";
				try {
					const res = JSON.parse(xhr.responseText);
					if (res && res.message) errMsg = res.message;
				} catch (e) {
					if (xhr.statusText) errMsg = xhr.statusText;
				}
				alert(errMsg);
			}
		});
	});

	// ✅ Payment Mode Display Toggle (support #paymentMode and #modeofPayment)
	$('#displayCheque, #displaycheqdate, #displaydeposit, #displayRef').hide();

	$('#paymentMode, #modeofPayment').on('change', function() {
		const paymentMode = $(this).val();
		if (paymentMode === 'Cash') {
			$('#displayCheque, #displaycheqdate, #displaydeposit, #displayRef').hide();
		} else if (paymentMode === 'Cheque') {
			$('#displayCheque, #displaycheqdate, #displaydeposit').show();
			$('#displayRef').hide();
		} else if (paymentMode === 'Online' || paymentMode === 'NEFT') {
			$('#displayCheque, #displaycheqdate').hide();
			$('#displaydeposit, #displayRef').show();
		}
	});
});