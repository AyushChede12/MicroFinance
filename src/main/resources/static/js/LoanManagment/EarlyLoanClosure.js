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

			if (response.status !== "OK" || !response.data) {
				alert("Loan data not found");
				return;
			}

			const d = response.data;

			// ===============================
			// 1️⃣ Populate Loan Info
			// ===============================
			$("#dateofLoan").val(d.loanDate);
			$("#memberId").val(d.memberId + " - " + d.memberName);
			$("#loanPlanName").val(d.loanPlanName);
			$("#loanMode").val(d.loanMode);
			$("#loanTerm").val(d.loanTerm);
			$("#interestType").val(d.interestType);
			$("#emiPayment").val(d.emiPayment);
			$("#rateOfInterest").val(d.rateOfInterest);
			$("#loanAmount").val(d.loanAmount);
			$("#sanctionedAmount").val(d.sanctionedAmount);

			$("#noOfInst").val(installmentCount + " INSTALLMENTS");

			// ===============================
			// 2️⃣ Variables
			// ===============================
			let principal = parseFloat(d.loanAmount);
			let roi = parseFloat(d.rateOfInterest);
			let emi = parseFloat(d.emiPayment);
			let totalInst = parseInt(d.loanTerm);
			let paidInst = installmentCount;

			let monthlyRate = roi / 12 / 100;

			let outstandingPrincipal = principal;
			let interestPaid = 0;
			let principalPaid = 0;

			// ===============================
			// 3️⃣ REDUCING BALANCE EMI LOOP
			// ===============================
			for (let i = 1; i <= paidInst; i++) {
				let interest = outstandingPrincipal * monthlyRate;
				let principalComponent = emi - interest;

				interestPaid += interest;
				principalPaid += principalComponent;
				outstandingPrincipal -= principalComponent;
			}

			// ===============================
			// 4️⃣ EARLY CLOSURE CALCULATION
			// ===============================
			let interestDueCurrentMonth = outstandingPrincipal * monthlyRate;

			// EARLY closure me future interest NOT waived
			let earlyClosureAmount =
				outstandingPrincipal + interestDueCurrentMonth;

			// ===============================
			// 5️⃣ Bind Values
			// ===============================
			$("#interestDue").val(interestDueCurrentMonth.toFixed(2));
			$("#principaldue").val(outstandingPrincipal.toFixed(2));
			$("#amountPaid").val((emi * paidInst).toFixed(2));
			$("#balanceLoanAmount").val(earlyClosureAmount.toFixed(2));
			$("#totalPayableofLoan").val(earlyClosureAmount.toFixed(2));

			console.log("Paid EMI:", paidInst);
			console.log("Outstanding Principal:", outstandingPrincipal);
			console.log("Interest Due (Current):", interestDueCurrentMonth);
			console.log("Early Closure Amount:", earlyClosureAmount);
		},

		error: function(xhr) {
			alert("Error fetching loan data");
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
