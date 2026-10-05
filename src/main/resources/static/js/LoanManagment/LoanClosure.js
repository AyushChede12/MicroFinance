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

				// ✅ Populate fields
				$("#dateofLoan").val(data.loanDate);
				$("#memberId").val(`${data.memberId} - ${data.memberName || "-"}`);
				$("#relativeDetails").val(data.relativeDetails);
				$("#branchName").val(data.branchName);
				$("#contactNo").val(data.contactNo);
				$("#loanPlanName").val(data.loanPlanName);
				$("#typeOfLoan").val(data.typeOfLoan);
				$("#emiPayment").val(data.emiPayment);
				$("#totalprincipalloan").val(data.sanctionedAmount);
				$("#loanAmount").val(data.loanAmount);
				$("#rateOfInterest").val(data.rateOfInterest);
				$("#loanTerm").val(data.loanTerm);
				$("#loanMode").val(data.loanMode);
				$("#interestType").val(data.interestType);
				$("#sanctionedAmount").val(data.sanctionedAmount);
				$("#noOfInst").val(installmentCount + " INSTALLMENTS");
				$("#financialConsultantId").val(data.financialConsultantId);
				$("#financialConsultantName").val(data.financialConsultantName);

				// ✅ Variables
				let loanAmount = parseFloat(data.loanAmount) || 0;
				let rateOfInterest = parseFloat(data.rateOfInterest) || 0;
				let loanTerm = parseFloat(data.loanTerm) || 0;
				let loanMode = (data.loanMode || "").toLowerCase();
				let interestType = (data.interestType || "").toLowerCase();
				let emiPayment = parseFloat(data.emiPayment) || 0;

				// ✅ Determine payments per year
				let paymentsPerYear = 1;
				if (loanMode === "daily") paymentsPerYear = 365;
				else if (loanMode === "weekly") paymentsPerYear = 52;
				else if (loanMode === "monthly") paymentsPerYear = 12;
				else if (loanMode === "quarterly") paymentsPerYear = 4;
				else if (loanMode === "yearly") paymentsPerYear = 1;

				// ✅ Convert term to years
				let termInYears = loanTerm;
				if (loanMode === "daily") termInYears = loanTerm / 365;
				else if (loanMode === "weekly") termInYears = loanTerm / 52;
				else if (loanMode === "monthly") termInYears = loanTerm / 12;
				else if (loanMode === "quarterly") termInYears = loanTerm / 4;

				// ✅ Total installments
				let totalPayments = loanTerm;

				// ✅ Calculate total interest
				let totalinterestofLoan = 0;
				let emi = 0;

				if (interestType === "flat interest") {
					totalinterestofLoan = (loanAmount * rateOfInterest * termInYears) / 100;
				} else if (interestType === "reducing interest") {
					totalPayments = loanTerm * paymentsPerYear;
					let periodicRate = rateOfInterest / paymentsPerYear / 100;
					emi = (loanAmount * periodicRate * Math.pow(1 + periodicRate, totalPayments)) /
						(Math.pow(1 + periodicRate, totalPayments) - 1);
					totalinterestofLoan = emi * totalPayments - loanAmount;
				}

				$("#totalinterestofLoan").val(totalinterestofLoan.toFixed(2));

				let totalPayableofLoan = (loanAmount + totalinterestofLoan).toFixed(2);
				$("#totalPayableofLoan").val(totalPayableofLoan);

				// 🔹 Calculate Interest Due
				let interestDue = 0;
				if (interestType === "flat interest") {
					let interestPerInstallment = totalinterestofLoan / totalPayments;
					interestDue = totalinterestofLoan - (interestPerInstallment * installmentCount);
				} else if (interestType === "reducing interest") {
					let interestPerInstallment = totalinterestofLoan / totalPayments;
					interestDue = totalinterestofLoan - (interestPerInstallment * installmentCount);
				}

				// 🔹 Calculate Principal Due
				let principalPerInstallment = loanAmount / totalPayments;
				let principalPaid = principalPerInstallment * installmentCount;
				let principaldue = loanAmount - principalPaid;

				// 🔹 Calculate Total Amount Due
				let amountPaid = emiPayment * installmentCount;
				let balanceLoanAmount = totalPayableofLoan - amountPaid;

				// ✅ Bind values
				$("#interestDue").val(interestDue.toFixed(2));
				$("#principaldue").val(principaldue.toFixed(2));
				$("#amountPaid").val(amountPaid.toFixed(2));
				$("#balanceLoanAmount").val(balanceLoanAmount.toFixed(2));

				console.log("Installments Paid:", installmentCount);
				console.log("Interest Due:", interestDue);
				console.log("Principal Due:", principaldue);
				console.log("Total Amount Due:", amountPaid);

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
	$("#closeLoanBtn").on("click", function(e) {
		e.preventDefault();

		// Collect data
		const loanClosureData = {
			loanId: $("#earlyLoanclosureId").val(),
			loanDate: $("#loanDate").val(),
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
			fine: $("#fine").val(),
			netAmount: $("#netAmount").val(),

			paymentDate: $("#paymentDate").val(),
			paymentMode: $("#paymentMode").val(),
			ref_UpiId: $("#ref_UpiId").val(),
			charges: $("#charges").val(),
			remarks: $("#remarks").val(),
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
				alert(xhr.responseText || "Something went wrong while closing the loan!");
			}
		});
	});
});


// ✅ Payment Mode Display
$('#displayCheque').hide();
$('#displaycheqdate').hide();
$('#displaydeposit').hide();
$('#displayRef').hide();

$('#modeofPayment').change(function() {
	const paymentMode = $(this).val();
	if (paymentMode === 'Cash') {
		$('#displayCheque').hide();
		$('#displaycheqdate').hide();
		$('#displaydeposit').hide();
		$('#displayRef').hide();
	} else if (paymentMode === 'Cheque') {
		$('#displayCheque').show();
		$('#displaycheqdate').show();
		$('#displaydeposit').show();
		$('#displayRef').hide();
	} else if (paymentMode === 'Online' || paymentMode === 'NEFT') {
		$('#displayCheque').hide();
		$('#displaycheqdate').hide();
		$('#displaydeposit').show();
		$('#displayRef').show();
	}
});
