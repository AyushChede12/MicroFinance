$(document).ready(function() {
	let allApprovedData = [];

	// ✅ 1. Fetch all approved loan applications on page load
	$.ajax({
		url: "api/datacorrection/fetchAllApprovedLoanApplications",
		method: "GET",
		success: function(response) {
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
				$(".datatable tbody").html("<tr><td colspan='10'>NO APPROVED LOANS FOUND.</td></tr>");
			}
		},
		error: function() {
			alert("ERROR WHILE FETCHING LOAN DATA.");
		}
	});

	// ✅ 2. Filter on Find button click
	$('#findBtn').click(function(e) {
		e.preventDefault();

		const selectedBranch = $('#branchName1').val();
		const fromDate = $('#fromDate').val();
		const toDate = $('#toDate').val();

		if (!fromDate || !toDate) {
			alert("PLEASE SELECT BOTH FROM AND TO DATES.");
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
			tableBody.append("<tr><td colspan='10'>NO MATCHING LOAN APPLICATIONS FOUND.</td></tr>");
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
					<td>${loan.approvalStatus ? 'YES' : 'NO'}</td>
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
			const selectedPolicy = allApprovedData.find(p => p.id === id);

			if (selectedPolicy) {
				let html = `
					<h4 class="text-center mb-4">LOAN APPLICATION FULL DETAILS</h4>

					<table class="table table-bordered">
						<tr><th>FIELD</th><th>DETAILS</th></tr>

						<tr><td>LOAN ID</td><td>${selectedPolicy.loanId || ''}</td></tr>
						<tr><td>LOAN DATE</td><td>${selectedPolicy.loanDate || ''}</td></tr>
						<tr><td>MEMBER ID</td><td>${selectedPolicy.memberId || ''}</td></tr>
						<tr><td>RELATIVE DETAILS</td><td>${selectedPolicy.relativeDetails || ''}</td></tr>
						<tr><td>DATE OF BIRTH</td><td>${selectedPolicy.dateOfBirth || ''}</td></tr>
						<tr><td>AGE</td><td>${selectedPolicy.age || ''}</td></tr>
						<tr><td>CONTACT NO</td><td>${selectedPolicy.contactNo || ''}</td></tr>
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

						<tr><td>APPROVAL DATE</td><td>${selectedPolicy.approvalDate || ''}</td></tr>
						<tr><td>APPROVAL STATUS</td><td>${selectedPolicy.approvalStatus ? "YES" : "NO"}</td></tr>

						<tr><td>PAYMENT MODE</td><td>${selectedPolicy.paymentMode || ''}</td></tr>
						<tr><td>ACCOUNT NO</td><td>${selectedPolicy.accountNo || ''}</td></tr>
						<tr><td>REF/UPI ID</td><td>${selectedPolicy.ref_UpiId || ''}</td></tr>
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
	$("#printBtn").click(function() {
		const content = document.getElementById("modalDataContainer").innerHTML;
		const printWindow = window.open('', '', 'width=900,height=700');

		printWindow.document.write(`
			<html>
			<head>
				<title>PRINT</title>
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
					<div class="heading">LOAN APPLICATION FULL DETAILS</div>
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
	$("#downloadBtn").click(function() {
		const { jsPDF } = window.jspdf;
		const doc = new jsPDF({
			orientation: "portrait",
			unit: "pt",
			format: "a4"
		});
		const content = document.getElementById("modalDataContainer");

		doc.html(content, {
			callback: function(doc) {
				doc.save("LoanApplicationDetails.pdf");
			},
			x: 10,
			y: 10,
			autoPaging: 'text',
			html2canvas: { scale: 0.5 }
		});
	});
});
$("#printBtn").click(function() {

	const selectedPolicyHTML = document.getElementById("modalDataContainer").innerHTML;

	const printWindow = window.open('', '', 'width=1000,height=800');

	printWindow.document.write(`

<html>
<head>
<title>LOAN APPLICATION REPORT</title>

<style>

body{
font-family: Arial;
padding:40px;
color:#000;
}

.header{
text-align:center;
line-height:1.6;
}

.company{
font-size:24px;
font-weight:bold;
}

.address{
font-size:14px;
}

.title{
text-align:center;
margin-top:20px;
font-size:18px;
font-weight:bold;
}

hr{
margin:20px 0;
border:1px solid #000;
}

.section{
font-size:16px;
font-weight:bold;
margin:20px 0 10px;
}

table{
width:100%;
border-collapse:collapse;
margin-bottom:15px;
}

td,th{
border:1px solid #000;
padding:8px;
font-size:14px;
}

.label{
font-weight:bold;
background:#f2f2f2;
width:250px;
}

.footer{
margin-top:60px;
display:flex;
justify-content:space-between;
}

.sign{
text-align:center;
width:200px;
}

</style>

</head>

<body>


<div class="header">

<div class="company">
CO OPERATIVE SOCIETY LTD NAGPUR
</div>

<div class="address">
PLOT NO 497 NEW NANDANWAN
</div>

<div class="address">
MAHARASHTRA - 440024
</div>

<div class="address">
HELPLINE : 9566200223
</div>

</div>

<hr>

<div class="title">
LOAN APPLICATION REPORT
</div>


<div class="section">APPLICATION DETAILS</div>

${selectedPolicyHTML}


<div class="footer">

<div class="sign">
______________________ 
BRANCH MANAGER
</div>

<div class="sign">
______________________ 
AUTHORIZED SIGNATORY
</div>

</div>

<script>
window.print();
</script>

</body>
</html>

`);

	printWindow.document.close();
	printWindow.focus();

});