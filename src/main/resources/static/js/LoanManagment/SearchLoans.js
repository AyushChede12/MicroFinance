//js for populating the loan id's in the dropdown(Vaibhav)
$(document).ready(function() {
	populateLoanIdDropdown();
});

//js for populating the loan id's in the dropdown(Vaibhav) 
function populateLoanIdDropdown() {
	$.ajax({
		url: "api/loanmanegment/getStatementLoanId",
		type: "GET",
		dataType: "json",
		success: function(response) {
			console.log("Loan ID response:", response); // for debugging

			if (response.status === "OK" && Array.isArray(response.data)) {
				const $dropdown = $("#loanId"); // Make sure this matches your HTML ID exactly
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
	$("#loanId").on("change", function() {
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
						$("#DateofLoan").val(data.loanDate);
						$("#memberId").val(data.memberId);
						$("#memberName").val(data.memberName || "-");
						$("#loanPlanName").val(data.loanPlanName);
						$("#typeOfLoan").val(data.typeOfLoan);
						$("#loanMode").val(data.loanMode);
						$("#loanTerm").val(data.loanTerm);


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



// Function to fetch loan details and populate the table
function fetchLoanDetails() {
	const loanId = $("#loanId").val(); // Assume you have an input with this ID

	if (!loanId) {
		alert("Please enter Loan ID");
		return;
	}

	$.ajax({
		url: "api/loanmanegment/getLoanById",
		type: "GET",
		data: { loanId: loanId },
		success: function(response) {
			if (response && response.data) {
				const loan = response.data;
				const tbody = $(".datatable tbody");
				tbody.empty(); // Clear previous results

				let serialNumber = 1; // Initialize once globally or inside your function

				// When appending rows:
				const row = `
                        <tr>
                        <td>${serialNumber++}</td>
                    	<td>${loan.memberId || "-"}</td>
                        <td>${loan.memberName || "-"}</td>
                        <td>${loan.dateOfBirth || "-"}</td>
                        <td>${loan.age || "-"}</td>
                        <td>${loan.contactNo || "-"}</td>
                        <td>${loan.address || "-"}</td>
                        <td>${loan.loanPlanName || "-"}</td>
                        <td>${loan.loanDate || "-"}</td>
                        <td>${loan.loanAmount || "-"}</td>
                        <td>${loan.purposeOfLoan || "-"}</td>
                    </tr>
                `;
				tbody.append(row);
			} else {
				alert("No loan data found");
			}
		},
		error: function(xhr, status, error) {
			console.error("Error fetching loan details:", error);
			alert("Failed to fetch loan details");
		}
	});
}

// Example: Bind this function to a button click
$("#searchButton").click(function(e) {
	e.preventDefault();
	fetchLoanDetails();
});

