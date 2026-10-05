
function approvedLoanIdDropdown() {

	$.ajax({
		url: "api/loanmanegment/getApprovedLoanIds",
		type: "GET",
		dataType: "json",
		success: function(response) {
			console.log("Loan ID response:", response); // for debugging

			if (response.status === "OK" && Array.isArray(response.data)) {
				const $dropdown = $("#loanID"); // Make sure this matches your HTML ID exactly
				$dropdown.empty(); // Clear existing options

				// ✅ Wrap your <option> in quotes!
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

$(document).ready(function() {
	
	//Load loan IDs
	approvedLoanIdDropdown();
	
	$("#loanID").on("change", function() {
		const selectedLoanId = $(this).val();

		if (selectedLoanId) {

			// First AJAX - Loan Details
			$.ajax({
				url: "api/loanmanegment/getLoanById",
				type: "GET",
				data: { loanId: selectedLoanId },
				dataType: "json",
				success: function(response) {
					if (response.status === "OK" && response.data) {
						const data = response.data;

						// Populate form fields
						$("#date").val(data.loanDate);
						$("#customercode").val(data.memberId);
						$("#familyMembername").val(data.relativeDetails);
						$("#contact").val(data.contactNo);
						$("#BranchAddress").val(data.address);
						$("#branchName").val(data.branchName);
						$("#loanplanname").val(data.loanPlanName);
						$("#typeOfLoan").val(data.typeOfLoan);
						$("#loanmode").val(data.loanMode);
						$("#term").val(data.loanTerm);
						$("#rateofinterest").val(data.rateOfInterest);
						$("#amountLoan").val(data.loanAmount);
						$("#intesteType").val(data.interestType);
						$("#paymnetEmi").val(data.emiPayment);
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

			$.ajax({
				url: "api/loanmanegment/fetchLoanPaymentsByLoanId",
				type: "GET",
				data: { loanId: selectedLoanId },
				dataType: "json",
				success: function(response) {
					if (response.status === "OK" && response.data) {
						const payments = response.data;

						let dropdown = $("#installment");
						dropdown.empty();

						dropdown.append('<option value="">Select Installment</option>');

						payments.forEach(payment => {
							dropdown.append(`<option value="${payment.remarks}">${payment.remarks}</option>`);
						});
					} else {
						alert("No payments found for this loan.");
					}
				},
				error: function(xhr) {
					alert("Error fetching Payment Data: " + xhr.responseText);
				}
			});
		}	
		
		});
		});
		
			$("#installment").on("change", function () {
			    const selectedInstallment = $(this).val();
			    const loanId = $("#loanID").val(); 

			    if (loanId && selectedInstallment) {
			        $.ajax({
			            url: "api/loanmanegment/fetchLoanPaymentByLoanIdAndInst",
			            type: "GET",
			            data: { 
			                loanId: loanId, 
			                remarks: selectedInstallment 
			            },
			            dataType: "json",
			            success: function (response) {
			                if (response.status === "OK" && response.data) {
			                    const installmentData = response.data; 

			                    // Populate Payment Details form
			                    $("#dueInterest").val(installmentData.interestDue || "");
			                    $("#duePrincipal").val(installmentData.principalDue || "");
			                    $("#dueAmounttotal").val(installmentData.amountDue || "");
			                    $("#paymentAmount").val(installmentData.emiPayment || "");
			                    $("#netAmount").val(installmentData.loanAmount || "");
			                    $("#PaymentDate").val(installmentData.paymentDate || "");
			                    $("#registrationDate").val(installmentData.loanDate || "");

			                } else {
			                    alert("Loan payment data not found.");
			                }
			            },
			            error: function (xhr) {
			                alert("Error fetching installment data: " + xhr.responseText);
			            }
			        });
			    }
			});
