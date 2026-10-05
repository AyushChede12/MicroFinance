$(document).ready(function () {
	let allApprovedData = [];

	// ✅ 1. Fetch all approved loan applications on page load
	$.ajax({
		url: "api/reports/getUnapprovedLoanApplication",
		method: "GET",
		success: function (response) {
			console.log("API Response:", response);

			if (response && response.data && Array.isArray(response.data)) {
				allApprovedData = response.data;

				// ✅ Fill branch dropdown
				let branches = new Set();
				allApprovedData.forEach(loan => {
					if (loan.branchName) branches.add(loan.branchName);
				});
				branches.forEach(branch => {
					$('#branchName1').append(`<option value="${branch}">${branch}</option>`);
				});

				// ✅ Render full table initially
				renderTable(allApprovedData);
			} else {
				$(".datatable tbody").html("<tr><td colspan='10'>No Notapproved loans found.</td></tr>");
			}
		},
		error: function () {
			alert("Error while fetching loan data.");
		}
	});

	// ✅ 2. Filter on Find button click
	$('#findBtn').click(function (e) {
		e.preventDefault();

		const selectedBranch = $('#branchName1').val();
		const fromDate = $('#fromDate').val();
		const toDate = $('#toDate').val();

		if (!fromDate || !toDate) {
			alert("Please select both From and To dates.");
			return;
		}

		const filtered = allApprovedData.filter(loan => {
			const loanDate = loan.loanDate;
			return (
				(!selectedBranch || loan.branchName === selectedBranch) &&
				loanDate >= fromDate &&
				loanDate <= toDate
			);
		});

		renderTable(filtered);
	});

	// ✅ 3. Render the table and handle print popup
	function renderTable(data) {
		let tableBody = $(".datatable tbody");
		tableBody.empty();

		if (!data.length) {
			tableBody.append("<tr><td colspan='10'>No matching Loan Applications found.</td></tr>");
			return;
		}

		data.forEach((loan, index) => {
			let row = `
				<tr>
					<td>${index + 1}</td>
					<td>${loan.loanId || ''}</td>
					<td>${loan.loanPlanName || ''}</td>
					<td>${loan.interestType || ''}</td>
					<td>${loan.loanDate || ''}</td>
					<td>${loan.loanAmount || ''}</td>
					<td>${loan.contactNo || ''}</td>
					<td>${loan.branchName || ''}</td>
					<td>${loan.approvalStatus ? 'Yes' : 'No'}</td>
					<td>
						<button class="iconbutton printPopupBtn" data-id="${loan.id}" data-bs-toggle="modal" data-bs-target="#printModal">
							<i class="bi bi-printer" style="color: green;"></i>
						</button>
					</td>
				</tr>
			`;
			tableBody.append(row);
		});

		// ✅ Handle print popup
		$(".printPopupBtn").click(function () {
			const id = $(this).data("id");
			const selectedPolicy = allApprovedData.find(p => p.id === id);

			if (selectedPolicy) {
				let html = `
					<h4 class="text-center mb-4">Loan Application Full Details</h4>
					<div class="row">
						${createField("Loan ID", selectedPolicy.loanId)}
						${createField("Loan Date", selectedPolicy.loanDate)}
						${createField("Member ID", selectedPolicy.memberId)}
						${createField("Relative Details", selectedPolicy.relativeDetails)}
						${createField("Date of Birth", selectedPolicy.dateOfBirth)}
						${createField("Age", selectedPolicy.age)}
						${createField("Contact No", selectedPolicy.contactNo)}
						${createField("Message Status", selectedPolicy.messageStatus)}
						${createField("Address", selectedPolicy.address)}
						${createField("Pin Code", selectedPolicy.pinCode)}
						${createField("Branch Name", selectedPolicy.branchName)}
						${createField("Loan Plan Name", selectedPolicy.loanPlanName)}
						${createField("Type Of Loan", selectedPolicy.typeOfLoan)}
						${createField("Loan Mode", selectedPolicy.loanMode)}
						${createField("Loan Term", selectedPolicy.loanTerm)}
						${createField("Rate Of Interest", selectedPolicy.rateOfInterest)}
						${createField("Loan Amount", selectedPolicy.loanAmount)}
						${createField("Interest Type", selectedPolicy.interestType)}
						${createField("EMI Payment", selectedPolicy.emiPayment)}
						${createField("Purpose Of Loan", selectedPolicy.purposeOfLoan)}
						${createField("Guarantor Member ID", selectedPolicy.guarantorMemberId)}
						${createField("Guarantor Identity", selectedPolicy.guarantorIdentity)}
						${createField("Guarantor Address", selectedPolicy.guarantorAddress)}
						${createField("Guarantor Pin Code", selectedPolicy.guarantorPinCode)}
						${createField("Guarantor Contact No", selectedPolicy.guarantorContactNo)}
						${createField("Guarantor Security Type", selectedPolicy.guarantorSecurityType)}
						${createField("Co-Applicant Member ID", selectedPolicy.coApplicantMemberId)}
						${createField("Co-Applicant Identity", selectedPolicy.coApplicantIdentity)}
						${createField("Co-Applicant Address", selectedPolicy.coApplicantAddress)}
						${createField("Co-Applicant Pin Code", selectedPolicy.coApplicantPinCode)}
						${createField("Co-Applicant Contact No", selectedPolicy.coApplicantContactNo)}
						${createField("Co-Applicant Security Type", selectedPolicy.coApplicantSecurityType)}
						${createField("Processing Fee", selectedPolicy.processingFee)}
						${createField("Legal Charges", selectedPolicy.legalCharges)}
						${createField("GST", selectedPolicy.gst)}
						${createField("Insurance Fee", selectedPolicy.insuranceFee)}
						${createField("Valuation Fees", selectedPolicy.valuationFees)}
						${createField("Stationary Fee", selectedPolicy.stationaryFee)}
						${createField("Financial Consultant ID", selectedPolicy.financialConsultantId)}
						${createField("Financial Consultant Name", selectedPolicy.financialConsultantName)}
						${createField("Approval Date", selectedPolicy.approvalDate)}
						${createField("Approval Status", selectedPolicy.approvalStatus ? "Yes" : "No")}
						${createField("Photo", selectedPolicy.photo)}
						${createField("Signature", selectedPolicy.signature)}
						${createField("Payment Date", selectedPolicy.paymentDate)}
						${createField("Payment Status", selectedPolicy.paymentStatus)}
						${createField("Payment Mode", selectedPolicy.paymentMode)}
						${createField("Account No", selectedPolicy.accountNo)}
						${createField("Ref/UPI ID", selectedPolicy.ref_UpiId)}
						${createField("Charges", selectedPolicy.charges)}
						${createField("Remarks", selectedPolicy.remarks)}
						${createField("Cheque Date", selectedPolicy.chequeDate)}
						${createField("Cheque No", selectedPolicy.chequeNo)}
					</div>
				`;
				$("#modalDataContainer").html(html);
			}
		});
	}

	// ✅ Helper to render label-value field
	function createField(label, value) {
		return `
			<div class="col-md-6 mb-3">
				<strong>${label}:</strong> <span>${value || ''}</span>
			</div>
		`;
	}

	// ✅ 4. Print modal data
	$("#printBtn").click(function () {
		const content = document.getElementById("modalDataContainer").innerHTML;
		const printWindow = window.open('', '', 'width=900,height=700');

		printWindow.document.write(`
			<html>
			<head>
				<title>Print</title>
				<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
				<style>
					body { font-family: Arial; padding: 30px; background: #fff; color: #000; }
					.print-container { width: 100%; margin: auto; }
					.heading { text-align: center; margin-bottom: 30px; font-size: 24px; font-weight: bold; border-bottom: 2px solid #000; padding-bottom: 10px; }
					.row { display: flex; flex-wrap: wrap; }
					.col-md-6 { width: 50%; padding: 10px 15px; box-sizing: border-box; }
				</style>
			</head>
			<body>
				<div class="print-container">
					<div class="heading">Loan Application Full Details</div>
					${content}
				</div>
			</body>
			</html>
		`);
		printWindow.document.close();
		printWindow.focus();
		printWindow.print();
		printWindow.close();
	});

	// ✅ 5. Download as PDF
	$("#downloadBtn").click(function () {
		const { jsPDF } = window.jspdf;
		const doc = new jsPDF({
			orientation: "portrait",
			unit: "pt",
			format: "a4"
		});
		const content = document.getElementById("modalDataContainer");

		doc.html(content, {
			callback: function (doc) {
				doc.save("LoanApplicationDetails.pdf");
			},
			x: 10,
			y: 10,
			autoPaging: 'text',
			html2canvas: { scale: 0.5 }
		});
	});
});
