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
						$("#relativeDetails").val(data.relativeDetails);
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
						$("#guarantorSecurityType").val(data.guarantorSecurityType);

						// Co-Applicant Details
						$("#coApplicantMemberId").val(data.coApplicantMemberId);
						$("#coApplicantIdentity").val(data.coApplicantIdentity);
						$("#coApplicantAddress").val(data.coApplicantAddress);
						$("#coApplicantPinCode").val(data.coApplicantPinCode);
						$("#coApplicantContactNo").val(data.coApplicantContactNo);
						$("#coApplicantSecurityType").val(data.coApplicantSecurityType);

						// Deductions
						$("#processingFee").val(data.processingFee);
						$("#legalCharges").val(data.legalCharges);
						$("#insuranceFee").val(data.insuranceFee);
						$("#financialConsultantId").val(data.financialConsultantId);
						$("#financialConsultantName").val(data.financialConsultantName);


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

// ✅ Payment Mode Display
$('#displayCheque').hide();
$('#displaycheqdate').hide();
$('#displaydeposit').hide();
$('#displayRef').hide();

$('#paymentMode').change(function() {
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

$('#paymentBtn').click(function(e) {
	e.preventDefault();

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
		ref_UpiId: $('#ref_UpiId').val(),
		charges: $('#charges').val(),
		remarks: $('#remarks').val(),
		chequeDate: $('#chequeDate').val(),
		chequeNo: $('#chequeNo').val(),
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
					$('#paymentBtn').prop('disabled', true); // Optional: disable further payments
				}

				location.reload();
			} else {
				alert("❌ Something went wrong.");
			}
		},
		error: function(xhr) {
			const errorMsg = xhr.responseJSON?.message || "Unknown error occurred";
			alert("❌ Payment failed: " + errorMsg);
		}
	});
});









