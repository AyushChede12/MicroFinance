$(document).ready(function() {
	let allPaymentData = [];

	// ✅ 1. Fetch all approved loan applications on page load
	$.ajax({
		url: "api/reports/getLoanPaymentReport",
		method: "GET",
		success: function(response) {
			console.log("API Response:", response);

			if (response && response.data && Array.isArray(response.data)) {
				allPaymentData = response.data;

				// ✅ Fill branch dropdown
				let loanId = new Set();
				allPaymentData.forEach(loan => {
					if (loan.loanId) loanId.add(loan.loanId);
				});
				loanId.forEach(loanId => {
					$('#loanId').append(`<option value="${loanId}">${loanId}</option>`);
				});

				// ✅ Render full table initially
				renderTable(allPaymentData);
			} else {
				$(".datatable tbody").html("<tr><td colspan='10'>NO LOAN PAYMENT FOUND.</td></tr>");
			}
		},
		error: function() {
			alert("ERROR WHILE FETCHING LOAN PAYMENT.");
		}
	});

	// ✅ 2. Filter on Find button click
	$('#findBtn').click(function(e) {
		e.preventDefault();

		const loanId = $('#loanId').val();
		const fromDate = $('#fromDate').val();
		const toDate = $('#toDate').val();

		if (!fromDate || !toDate) {
			alert("PLEASE SELECT BOTH FROM AND TO DATES.");
			return;
		}

		const filtered = allPaymentData.filter(loan => {
			const paymentDate = loan.paymentDate;
			return (
				(!loanId || loan.loanId === loanId) &&
				paymentDate >= fromDate &&
				paymentDate <= toDate
			);
		});

		renderTable(filtered);
	});

	// ✅ 3. Render the table and handle print popup
	function renderTable(data) {
		let tableBody = $(".datatable tbody");
		tableBody.empty();

		if (!data.length) {
			tableBody.append("<tr><td colspan='10'>NO MATCHING LOAN APPLICATIONS FOUND.</td></tr>");
			return;
		}

		data.forEach((loan, index) => {
			let row = `
				<tr>
					<td>${index + 1}</td>
					<td>${loan.loanId || ''}</td>
					<td>${loan.loanPlanName || ''}</td>
					<td>${loan.loanAmount || ''}</td>
					<td>${loan.emiPayment || ''}</td>
					<td>${loan.paymentDate || ''}</td>
					<td>${loan.paymentStatus || ''}</td>
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
		$(".printPopupBtn").click(function() {
			const id = $(this).data("id");
			const selectedPolicy = allPaymentData.find(p => p.id === id);

			if (selectedPolicy) {
				let html = `
					<h4 class="text-center mb-4">LOAN PAYMENT FULL DETAILS</h4>

					<table class="table table-bordered table-striped">
						<tr>
							<th>FIELD</th>
							<th>DETAILS</th>
						</tr>

						<tr><td>LOAN ID</td><td>${selectedPolicy.loanId || ''}</td></tr>
						<tr><td>LOAN DATE</td><td>${selectedPolicy.loanDate || ''}</td></tr>
						<tr><td>MEMBER ID</td><td>${selectedPolicy.memberId || ''}</td></tr>
						<tr><td>RELATIVE DETAILS</td><td>${selectedPolicy.relativeDetails || ''}</td></tr>
						<tr><td>DATE OF BIRTH</td><td>${selectedPolicy.dateOfBirth || ''}</td></tr>
						<tr><td>AGE</td><td>${selectedPolicy.age || ''}</td></tr>
						<tr><td>CONTACT NO</td><td>${selectedPolicy.contactNo || ''}</td></tr>
						<tr><td>MESSAGE STATUS</td><td>${selectedPolicy.messageStatus || ''}</td></tr>
						<tr><td>ADDRESS</td><td>${selectedPolicy.address || ''}</td></tr>
						<tr><td>PIN CODE</td><td>${selectedPolicy.pinCode || ''}</td></tr>
						<tr><td>BRANCH NAME</td><td>${selectedPolicy.branchName || ''}</td></tr>

						<tr><td>LOAN PLAN NAME</td><td>${selectedPolicy.loanPlanName || ''}</td></tr>
						<tr><td>TYPE OF LOAN</td><td>${selectedPolicy.typeOfLoan || ''}</td></tr>
						<tr><td>LOAN MODE</td><td>${selectedPolicy.loanMode || ''}</td></tr>
						<tr><td>LOAN TERM</td><td>${selectedPolicy.loanTerm || ''}</td></tr>
						<tr><td>RATE OF INTEREST</td><td>${selectedPolicy.rateOfInterest || ''}</td></tr>
						<tr><td>LOAN AMOUNT</td><td>${selectedPolicy.loanAmount || ''}</td></tr>
						<tr><td>INTEREST TYPE</td><td>${selectedPolicy.interestType || ''}</td></tr>
						<tr><td>EMI PAYMENT</td><td>${selectedPolicy.emiPayment || ''}</td></tr>

						<tr><td>GUARANTOR MEMBER ID</td><td>${selectedPolicy.guarantorMemberId || ''}</td></tr>
						<tr><td>GUARANTOR IDENTITY</td><td>${selectedPolicy.guarantorIdentity || ''}</td></tr>
						<tr><td>GUARANTOR ADDRESS</td><td>${selectedPolicy.guarantorAddress || ''}</td></tr>
						<tr><td>GUARANTOR CONTACT</td><td>${selectedPolicy.guarantorContactNo || ''}</td></tr>

						<tr><td>CO-APPLICANT MEMBER ID</td><td>${selectedPolicy.coApplicantMemberId || ''}</td></tr>
						<tr><td>CO-APPLICANT IDENTITY</td><td>${selectedPolicy.coApplicantIdentity || ''}</td></tr>
						<tr><td>CO-APPLICANT ADDRESS</td><td>${selectedPolicy.coApplicantAddress || ''}</td></tr>

						<tr><td>PROCESSING FEE</td><td>${selectedPolicy.processingFee || ''}</td></tr>
						<tr><td>LEGAL CHARGES</td><td>${selectedPolicy.legalCharges || ''}</td></tr>
						<tr><td>GST</td><td>${selectedPolicy.gst || ''}</td></tr>

						<tr><td>FINANCIAL CONSULTANT</td><td>${selectedPolicy.financialConsultantName || ''}</td></tr>

						<tr><td>PAYMENT DATE</td><td>${selectedPolicy.paymentDate || ''}</td></tr>
						<tr><td>PAYMENT STATUS</td><td>${selectedPolicy.paymentStatus || ''}</td></tr>
						<tr><td>PAYMENT MODE</td><td>${selectedPolicy.paymentMode || ''}</td></tr>

						<tr><td>ACCOUNT NO</td><td>${selectedPolicy.accountNo || ''}</td></tr>
						<tr><td>UPI REF</td><td>${selectedPolicy.ref_UpiId || ''}</td></tr>

						<tr><td>REMARKS</td><td>${selectedPolicy.remarks || ''}</td></tr>
						<tr><td>CHEQUE DATE</td><td>${selectedPolicy.chequeDate || ''}</td></tr>
						<tr><td>CHEQUE NO</td><td>${selectedPolicy.chequeNo || ''}</td></tr>

					</table>
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
	$(document).off("click", "#printBtn").on("click", "#printBtn", function() {

		const content = document.getElementById("modalDataContainer").innerHTML;

		const printWindow = window.open('', '', 'width=1000,height=800');

		printWindow.document.write(`
		<html>
		<head>
		<title>LOAN PAYMENT REPORT</title>

		<style>

		body{
			font-family: Arial;
			padding:30px;
			background:#fff;
		}

		.company{
			text-align:center;
			margin-bottom:20px;
		}

		.company h2{
			margin:0;
			font-size:24px;
		}

		.company p{
			margin:2px;
			font-size:14px;
		}

		.title{
			text-align:center;
			font-size:18px;
			font-weight:bold;
			margin:20px 0;
			border-bottom:2px solid black;
			padding-bottom:5px;
		}

		/* 🔥 IMPORTANT TABLE FIX */
		table{
			width:100%;
			border-collapse:collapse;
			margin-top:10px;
		}

		th, td{
			border:1px solid black !important;
			padding:8px;
			text-align:left;
			font-size:14px;
		}

		th{
			background:#f2f2f2;
		}

		.signArea{
			margin-top:40px;
			display:flex;
			justify-content:space-between;
		}

		.sign{
			width:200px;
			text-align:center;
			border-top:1px solid black;
			padding-top:5px;
		}

		</style>
		</head>

		<body>

		<div class="company">
			<h2>CO OPERATIVE SOCIETY LTD NAGPUR</h2>
			<p>PLOT NO 497 NEW NANDANWAN</p>
			<p>MAHARASHTRA - 440024</p>
			<p>HELPLINE : 9566200223</p>
		</div>

		<div class="title">LOAN PAYMENT DETAILS</div>

		${content}

		<div class="signArea">
			<div class="sign">CUSTOMER SIGNATURE</div>
			<div class="sign">MANAGER SIGNATURE</div>
		</div>

		</body>
		</html>
		`);

		printWindow.document.close();
		printWindow.focus();
		printWindow.print();

	});
});