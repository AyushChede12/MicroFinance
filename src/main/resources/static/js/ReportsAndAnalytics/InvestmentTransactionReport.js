$(document).ready(function() {

	// 🔒 PREVENT MULTIPLE EXECUTION
	if (window.investmentTxnReportLoaded) {
		console.warn("JS already initialized, skipping...");
		return;
	}
	window.investmentTxnReportLoaded = true;

	let allPolicies = [];

	// ================= LOAD APPROVED POLICIES =================
	fetchApprovedPolicies();

	function fetchApprovedPolicies() {
		$.ajax({
			url: "api/Policymangment/getApprovedPolicies",
			type: "GET",
			success: function(response) {

				if (response && Array.isArray(response.data)) {
					allPolicies = response.data;
					buildBranchDropdown(allPolicies);
					fillTable(allPolicies); // ✅ INITIAL LOAD (LIKE FIRST TABLE)
				} else {
					$("table tbody").html(
						"<tr><td colspan='10'>NO APPROVED POLICIES FOUND</td></tr>"
					);
				}
			},
			error: function() {
				alert("ERROR WHILE FETCHING POLICY DATA");
			}
		});
	}

	// ================= NORMALIZE =================
	function normalize(value) {
		return value
			?.toString()
			.replace(/[\n\r\t]/g, "")
			.replace(/\s+/g, " ")
			.trim()
			.toUpperCase();
	}

	// ================= BRANCH DROPDOWN =================
	function buildBranchDropdown(data) {

		let $branch = $("#branchName2");
		$branch.empty().append('<option value="">SELECT</option>');

		let branchSet = new Set();

		data.forEach(p => {
			let branch =
				p.branchName ||
				(p.branch && p.branch.branchName) ||
				"";

			if (branch) {
				branchSet.add(normalize(branch));
			}
		});

		[...branchSet].sort().forEach(b => {
			$branch.append(`<option value="${b}">${b}</option>`);
		});
	}

	// ================= DATE PARSER =================
	function parseDate(dateStr) {
		if (!dateStr) return null;
		let d = new Date(dateStr);
		return isNaN(d) ? null : d;
	}

	// ================= FIND BUTTON =================
	$("#findBtn").on("click", function(e) {
		e.preventDefault();

		let branch = $("#branchName2").val();
		let fromDate = $("#fromDate").val();
		let toDate = $("#toDate").val();

		let filtered = allPolicies;

		if (branch) {
			filtered = filtered.filter(p => {
				let b =
					p.branchName ||
					(p.branch && p.branch.branchName) ||
					"";
				return normalize(b) === normalize(branch);
			});
		}

		if (fromDate && toDate) {
			let from = new Date(fromDate);
			let to = new Date(toDate);
			to.setHours(23, 59, 59, 999);

			filtered = filtered.filter(p => {
				let d = parseDate(
					p.policyStartDate ||
					p.policyDate ||
					p.createdDate ||
					p.investmentDate
				);
				return d && d >= from && d <= to;
			});
		}

		fillTable(filtered);
	});

	// ================= TABLE RENDER =================
	function fillTable(data) {

		let $tbody = $("table tbody");
		$tbody.empty();

		if (!data || data.length === 0) {
			$tbody.append(`
                <tr>
                    <td colspan="10" class="text-center text-danger">
                        NO MATCHING DATA FOUND
                    </td>
                </tr>
            `);
			return;
		}

		data.forEach((p, i) => {

			let branch =
				p.branchName ||
				(p.branch && p.branch.branchName) ||
				"-";

			let policyDate =
				p.policyStartDate ||
				p.policyDate ||
				"-";

			let approvedStatus =
				p.approved === true
					? '<span class="badge bg-success">APPROVED</span>'
					: '<span class="badge bg-danger">NOT APPROVED</span>';

			$tbody.append(`
                <tr>
                    <td>${i + 1}</td>
                    <td>${p.policyCode || "-"}</td>
                    <td>${(p.customerName || "-").toUpperCase()}</td>
                    <td>${p.schemeType || "-"}</td>
                    <td>${policyDate}</td>
                    <td>${p.policyAmount || "-"}</td>
                    <td>${p.contactNo || "-"}</td>
                    <td>${branch.toUpperCase()}</td>
                    <td>${approvedStatus}</td>
                    <td>
                        <button class="btn btn-sm btn-primary"
                            onclick="openPrintModal(${p.id})">
                            <i class="bi bi-printer"></i>
                        </button>
                    </td>
                </tr>
            `);
		});
	}

});

function openPrintModal(id) {

	if (!id) {
		alert("INVALID POLICY ID");
		return;
	}

	$.ajax({
		url: "api/reports/getPolicyForPrint/" + id,
		type: "GET",
		success: function(data) {

			// ================= HEADER =================
			$("#bankName").text("MICROFINANCE BANK");
			$("#reportTitle").text("INVESTMENT STATEMENT");
			$("#accountNumber").text(data.policyCode || "-");
			$("#periodCovered").text(data.policyStartDate || "-");

			// ================= CUSTOMER =================
			$("#customerName").text(data.customerName || "-");
			$("#customerAddress1").text(data.address || "-");
			$("#customerAddress2").text(data.city || "-");

			// ================= SUMMARY =================
			$("#startingBalance").text("0");
			$("#incomeAmount").text(data.policyAmount || "0");
			$("#expensesAmount").text("0");
			$("#closingBalance").text(data.policyAmount || "0");

			// ================= TABLE =================
			let row = `
                <tr>
                    <td>${data.policyCode || "-"}</td>
                    <td>${data.policyStartDate || "-"}</td>
                    <td>${data.policyAmount || "-"}</td>
                    <td>${data.schemeType || "-"}</td>
                    <td>${data.paymentMode || "-"}</td>
                </tr>
            `;
			$("#transactionTableBody").html(row);

			// ================= OPEN MODAL (BOOTSTRAP 5) =================
			const modal = new bootstrap.Modal(
				document.getElementById('bankReportModal')
			);
			modal.show();
		},
		error: function() {
			alert("FAILED TO LOAD PRINT DATA");
		}
	});
}

function openPrintModal(id) {

	if (!id) {
		alert("INVALID POLICY ID");
		return;
	}

	$.ajax({
		url: "api/reports/getPolicyForPrint/" + id,
		type: "GET",
		success: function(data) {

			let printWindow = window.open('', '', 'width=900,height=700');

			printWindow.document.write(`

<html>
<head>
<title>POLICY REPORT</title>

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

.hr{
border-top:2px solid black;
margin:15px 0 25px;
}

.title{
text-align:center;
font-size:18px;
font-weight:bold;
margin-bottom:25px;
}

.section{
font-size:16px;
font-weight:bold;
margin:20px 0 10px;
}

table{
width:100%;
border-collapse:collapse;
margin-bottom:20px;
}

td,th{
border:1px solid #000;
padding:8px;
font-size:14px;
}

.label{
font-weight:bold;
background:#f3f3f3;
width:220px;
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
CIN : ASJ#567 | EMAIL : example@gmail.com | HELPLINE : 9566200223
</div>

</div>

<div class="hr"></div>

<div class="title">
POLICY INVESTMENT REPORT
</div>


<div class="section">CUSTOMER DETAILS</div>

<table>

<tr>
<td class="label">CUSTOMER NAME</td>
<td>${data.customerName || "-"}</td>
</tr>

<tr>
<td class="label">CONTACT NUMBER</td>
<td>${data.contactNo || "-"}</td>
</tr>

<tr>
<td class="label">ADDRESS</td>
<td>${data.address || "-"}</td>
</tr>

<tr>
<td class="label">CITY</td>
<td>${data.city || "-"}</td>
</tr>

</table>



<div class="section">POLICY DETAILS</div>

<table>

<tr>
<td class="label">POLICY CODE</td>
<td>${data.policyCode || "-"}</td>
</tr>

<tr>
<td class="label">POLICY DATE</td>
<td>${data.policyStartDate || "-"}</td>
</tr>

<tr>
<td class="label">SCHEME TYPE</td>
<td>${data.schemeType || "-"}</td>
</tr>

<tr>
<td class="label">POLICY AMOUNT</td>
<td>₹ ${data.policyAmount || "0"}</td>
</tr>

<tr>
<td class="label">PAYMENT MODE</td>
<td>${data.paymentMode || "-"}</td>
</tr>

</table>



<div class="section">TRANSACTION SUMMARY</div>

<table>

<thead>
<tr>
<th>POLICY CODE</th>
<th>DATE</th>
<th>AMOUNT</th>
<th>SCHEME</th>
<th>PAYMENT MODE</th>
</tr>
</thead>

<tbody>

<tr>
<td>${data.policyCode || "-"}</td>
<td>${data.policyStartDate || "-"}</td>
<td>${data.policyAmount || "-"}</td>
<td>${data.schemeType || "-"}</td>
<td>${data.paymentMode || "-"}</td>
</tr>

</tbody>

</table>



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
		},
		error: function() {
			alert("FAILED TO LOAD PRINT DATA");
		}
	});
}