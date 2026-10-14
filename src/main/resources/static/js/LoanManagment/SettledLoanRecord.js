$(document).ready(function() {
	populateDropdown();
	$('#searchBtn').click(function(e) {
		e.preventDefault(); // Prevent the form from submitting and reloading the page
		//fetchLoanClosuresByLoanId(); // Call the function to fetch and display data
		fetchLoanClosureDetails();
	});
});

function populateDropdown() {
	$.ajax({
		url: "api/loanmanegment/getClosedLoanIds",
		type: "GET",
		dataType: "json",
		success: function(response) {
			console.log("Loan ID response:", response);

			const $dropdown = $("#closedLoanIds");
			$dropdown.empty(); // Clear previous entries

			if (response.status === "OK" && Array.isArray(response.data) && response.data.length > 0) {
				$dropdown.append('<option value="" disabled selected>SELECT LOAN ID</option>');
				response.data.forEach(function(id) {
					$dropdown.append(`<option value="${id}">${id}</option>`);
				});
			} else {
				$dropdown.append('<option value="" disabled selected>NO CLOSED LOANS AVAILABLE</option>');
				console.warn("No closed loan IDs found.");
			}
		},
		error: function(xhr, status, error) {
			console.error("Error fetching closed loan IDs:", error);
			const $dropdown = $("#closedLoanIds");
			$dropdown.empty();
			$dropdown.append('<option value="" disabled selected>ERROR LOADING LOAN IDS</option>');
		}
	});
}

function fetchLoanClosureDetails() {
	const loanId = $('#closedLoanIds').val(); // Get the loan ID from input

	if (!loanId) {
		alert("PLEASE ENTER A LOAN ID");
		return;
	}

	$.ajax({
		url: "api/loanmanegment/getLoanClosuresByLoanId",
		type: "GET",
		data: { loanId: loanId },
		dataType: "json",
		success: function(response) {
			console.log("Loan closure data:", response);

			const $tbody = $("#loanClosureTableBody");
			$tbody.empty(); // Clear any existing rows

			if (response.status === "OK" && Array.isArray(response.data) && response.data.length > 0) {
				let serial = 1;
				response.data.forEach(function(closure) {
					const row = `
                       <tr style="white-space: nowrap;">
                           <td>${serial++}</td>
                           <td>${closure.loanId || ''}</td>
                           <td>${closure.loanDate || ''}</td>
                           <td>${closure.memberId || ''}</td>
                           <td>${closure.memberName || ''}</td>
                           <td>${closure.contactNo || ''}</td>
                           <td>${closure.address || ''}</td>
                           <td>${closure.branchName || ''}</td>
                           <td>${closure.loanPlanName || ''}</td>
                           <td>${closure.typeOfLoan || ''}</td>
                           <td>${closure.loanMode || ''}</td>
                           <td>${closure.loanTerm || ''}</td>
                           <td>${closure.rateOfInterest || ''}</td>
                           <td>${closure.loanAmount || ''}</td>
                           <td>${closure.interestType || ''}</td>
                           <td>${closure.emiPayment || ''}</td>
                           <td>${closure.totalinterestofLoan || ''}</td>
                           <td>${closure.sanctionedAmount || ''}</td>
                           <td>${closure.totalPayableofLoan || ''}</td>
                           <td>${closure.interestDue || ''}</td>
                           <td>${closure.principaldue || ''}</td>
                           <td>${closure.amountPaid || ''}</td>
                           <td>${closure.balanceLoanAmount || ''}</td>
                           <td>${closure.noOfInst || ''}</td>
                           <td>${closure.paymentDate || ''}</td>
                           <td>${closure.financialConsultantName || ''}</td>
                           <td>${closure.loanStatus || ''}</td>
                       </tr>
                   `;
					$tbody.append(row);
				});
			} else {
				$tbody.append('<tr><td colspan="41" class="text-center">NO LOAN CLOSURE RECORDS FOUND FOR THIS LOAN ID.</td></tr>');
			}
		},
		error: function(xhr, status, error) {
			console.error("Error fetching loan closure data:", error);
			const $tbody = $("#loanClosureTableBody");
			$tbody.empty();
			$tbody.append('<tr><td colspan="41" class="text-center text-danger">ERROR LOADING DATA.</td></tr>');
		}
	});
}


/*function fetchLoanClosureDetails() {
	const loanId = $('#closedLoanIds').val();

	if (!loanId) {
		alert("PLEASE ENTER A LOAN ID");
		return;
	}

	$.ajax({
		url: "api/loanmanegment/getLoanClosuresByLoanId",
		type: "GET",
		data: { loanId: loanId },
		dataType: "json",
		success: function(response) {

			const $section = $("#loanClosureDetailsSection");
			const $tbody = $("#loanClosureDetailsBody");
			$tbody.empty();
			if (response.status === "OK" && Array.isArray(response.data) && response.data.length > 0) {
				const closure = response.data[0];

				$section.removeClass("d-none");

				const details = {
					"LOAN ID": closure.loanId || '',
					"LOAN DATE": closure.loanDate || '',
					"MEMBER ID": closure.memberId || '',
					"MEMBER NAME": closure.memberName || '',
					"RELATIVE DETAILS": closure.relativeDetails || '',
					"CONTACT NO": closure.contactNo || '',
					"BRANCH NAME": closure.branchName || '',
					"LOAN PLAN NAME": closure.loanPlanName || '',
					"TYPE OF LOAN": closure.typeOfLoan || '',
					"LOAN MODE": closure.loanMode || '',
					"LOAN TERM": closure.loanTerm || '',
					"RATE OF INTEREST": closure.rateOfInterest || '',
					"LOAN AMOUNT": closure.loanAmount || '',
					"INTEREST TYPE": closure.interestType || '',
					"EMI PAYMENT": closure.emiPayment || '',
					"TOTAL INTEREST OF LOAN": closure.totalinterestofLoan || '',
					"SANCTIONED AMOUNT": closure.sanctionedAmount || '',
					"TOTAL PAYABLE OF LOAN": closure.totalPayableofLoan || '',
					"INTEREST DUE": closure.interestDue || '',
					"PRINCIPAL DUE": closure.principaldue || '',
					"AMOUNT PAID": closure.amountPaid || '',
					"BALANCE LOAN AMOUNT": closure.balanceLoanAmount || '',
					"DUE DATE": closure.dueDate || '',
					"PAYMENT BRANCH": closure.paymentBranch || '',
					"FINE": closure.fine || '',
					"NET AMOUNT": closure.netAmount || '',
					"NO OF INSTALLMENTS": closure.noOfInst || '',
					"PAYMENT DATE": closure.paymentDate || '',
					"PAYMENT MODE": closure.paymentMode || '',
					"REF UPI ID": closure.ref_UpiId || '',
					"CHARGES": closure.charges || '',
					"REMARKS": closure.remarks || '',
					"CHEQUE DATE": closure.chequeDate || '',
					"CHEQUE NO": closure.chequeNo || '',
					"FINANCIAL CONSULTANT ID": closure.financialConsultantId || '',
					"FINANCIAL CONSULTANT NAME": closure.financialConsultantName || '',
					"LOAN STATUS": closure.loanStatus || ''
				};

				// Generate table rows (4 columns)
				const keys = Object.keys(details);
				for (let i = 0; i < keys.length; i += 4) {
					const rowKeys = keys.slice(i, i + 4);
					let rowHtml = '<tr>';
					rowKeys.forEach(key => {
						rowHtml += `<th>${key}</th><td>${details[key]}</td>`;
					});
					// Fill empty cells if less than 4 in last row
					const emptyCells = 4 - rowKeys.length;
					for (let j = 0; j < emptyCells; j++) {
						rowHtml += '<th></th><td></td>';
					}
					rowHtml += '</tr>';
					$tbody.append(rowHtml);
				}

			} else {
				$section.addClass("d-none");
				alert("NO LOAN CLOSURE RECORD FOUND.");
			}
		},
		error: function(xhr, status, error) {
			console.error("Error fetching loan closure data:", error);
			const $section = $("#loanClosureDetailsSection");
			const $tbody = $("#loanClosureDetailsBody");
			$tbody.empty();
			$section.addClass("d-none");
			alert("ERROR LOADING DATA.");
		}
	});
}
*/