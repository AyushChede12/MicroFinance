// ✅ JS FOR POPULATING THE APPROVED LOANID IN THE DROPDOWN (Vaibhav)
$(document).ready(function() {
	populateDropdown();
});

function populateDropdown() {

	$.ajax({
		url: "api/joinliability/getApprovedGroupLoanIds",
		type: "GET",
		dataType: "json",
		success: function(response) {
			console.log("Loan ID response:", response); // for debugging

			if (response.status === "OK" && Array.isArray(response.data)) {
				const $dropdown = $("#groupid"); // Make sure this matches your HTML ID exactly
				$dropdown.empty(); // Clear existing options

				// ✅ Wrap your <option> in quotes!
				$dropdown.append('<option value="" disabled selected>SELECT LOAN ID</option>');

				response.data.forEach(function(id) {
					$dropdown.append(`<option value="${id}">${id}</option>`);
				});
			} else {
				console.warn("NO LOAN IDS FOUND IN RESPONSE.");
			}
		},
		error: function(xhr, status, error) {
			console.error("ERROR FETCHING LOAN IDS:", error);
		}
	});
}

// JS FOR BINDING THE DATA IN THE TEXTFIELDS (Vaibhav)
$('#groupid').on('change', function() {
	let selectedCode = $(this).val(); // selected group code from dropdown

	if (selectedCode !== "") {
		$.ajax({
			url: `api/joinliability/fetchGroupLoanPayment?groupID=${selectedCode}`,
			type: 'GET',
			dataType: 'json',
			success: function(response) {
				console.log("Response:", response);

				if (response.status === "FOUND") {
					let loan = response.data[0]; // assuming you want the first record

					// ✅ Bind backend data into text fields
					$('#loanDate').val(loan.openingDate);
					$('#communityName').val(loan.communityName);
					$('#branchName').val(loan.branchName);
					$('#loanSchemeName').val(loan.loanSchemeName);
					$('#communityAddress').val(loan.communityAddress);
					$('#contactNumber').val(loan.contactNumber);
					$('#loanpurpose').val(loan.loanPurpose);
					$('#emiType').val(loan.emiType);
					$('#term').val(loan.term);
					$('#rateOfInterest').val(loan.rateOfInterest);
					$('#interestType').val(loan.interestType);
					$('#loanAmount').val(loan.loanAmount);
					$('#loanEmi').val(loan.loanEmi);

					const loanEmi = parseFloat($("#loanEmi").val()) || 0;
					const loanAmount = parseFloat($("#loanAmount").val()) || 0;
					const totalPayable = loanAmount + loanEmi;
					$("#totalPayable").val(totalPayable.toFixed(2));

					$('#financialConsultantName').val(loan.financialConsultantName);
					$('#financialConsultantId').val(loan.financialConsultantId);
					console.log("PERCENTAGES STORED:", deductionPercents);

				} else {
					alert("❌ " + response.message.toUpperCase());
					clearFields();
				}
			},
			error: function(xhr, status, error) {
				console.error("ERROR FETCHING GROUP LOAN DATA:", error);
				alert("SOMETHING WENT WRONG.");
				clearFields();
			}
		});
	}
});

// JS FOR HIDING THE FIELDS (Vaibhav)
$(document).ready(function() {
	// Hide all fields initially
	$('#displayCheque, #displaycheqdate, #displaydeposit, #displayRef').hide();

	$('#paymentMode').on('change', function() {
		const paymentMode = $(this).val().toLowerCase(); // ✅ Convert to lowercase for reliable matching

		// Hide all sections first
		$('#displayCheque, #displaycheqdate, #displaydeposit, #displayRef').hide();

		if (paymentMode === 'cash') {
			// Only Cash → hide everything
		}
		else if (paymentMode === 'cheque') {
			// ✅ Show cheque-related fields
			$('#displayCheque').show();
			$('#displaycheqdate').show();
			$('#displaydeposit').show();
		}
		else if (paymentMode === 'online' || paymentMode === 'neft') {
			// ✅ Show deposit + reference fields
			$('#displaydeposit').show();
			$('#displayRef').show();
		}
	});
});