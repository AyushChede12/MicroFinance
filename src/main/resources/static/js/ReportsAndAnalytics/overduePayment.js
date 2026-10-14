$(document).ready(function() {

	/* ------------------ LOAD DROPDOWNS ------------------ */

	$.ajax({
		url: "api/datacorrection/fetchAllApprovedLoanApplications",
		type: "GET",
		success: function(response) {

			if (response.status === "OK") {

				const list = response.data;

				const uniqueBranches = new Set();
				const uniquePlans = new Set();

				list.forEach(item => {

					if (item.branchName) {
						uniqueBranches.add(item.branchName.trim());
					}

					if (item.loanPlanName) {
						uniquePlans.add(item.loanPlanName.trim());
					}

				});

				/* Branch */

				$("#branchName1").empty();
				$("#branchName1").append("<option value=''>-- SELECT BRANCH NAME --</option>");

				uniqueBranches.forEach(branch => {
					$("#branchName1").append(`<option value="${branch}">${branch}</option>`);
				});


				/* Loan Plan */

				$("#loanPlanName").empty();
				$("#loanPlanName").append("<option value=''>-- SELECT LOAN NAME --</option>");

				uniquePlans.forEach(plan => {
					$("#loanPlanName").append(`<option value="${plan}">${plan}</option>`);
				});

			}

		},
		error: function(xhr) {

			console.log(xhr);
			alert("DROPDOWN LOADING FAILED");

		}
	});


	/* ------------------ INITIAL TABLE LOAD ------------------ */

	loadApprovedLoanApplications();


	/* ------------------ FIND BUTTON ------------------ */

	$('#findBtn').click(function(e) {

		e.preventDefault();

		let branch = $('#branchName1').val();
		let policy = $('#loanPlanName').val();
		let financialCode = $('#financialCode').val().trim().toUpperCase();
		let toDate = $('#toDate').val();

		loadApprovedLoanApplications(branch, policy, financialCode, toDate);

	});

});


/* ------------------ FETCH DATA ------------------ */

function loadApprovedLoanApplications(branch = '', policy = '', financialCode = '', toDate = '') {

	$.ajax({
		url: 'api/datacorrection/fetchAllApprovedLoanApplications',
		method: 'GET',
		dataType: 'json',

		success: function(response) {

			if (response && response.data) {

				let filteredData = response.data;

				if (branch) {
					filteredData = filteredData.filter(item => item.branchName === branch);
				}

				if (policy) {
					filteredData = filteredData.filter(item => item.loanPlanName === policy);
				}

				if (financialCode) {
					filteredData = filteredData.filter(item =>
						item.financialConsultantId &&
						item.financialConsultantId.toUpperCase().includes(financialCode)
					);
				}

				if (toDate) {

					filteredData = filteredData.filter(item => {

						let approvalDate = parseDate(item.approvalDate);
						let tDate = new Date(toDate);

						return approvalDate <= tDate;

					});

				}

				bindLoanTable(filteredData);

			}

		},

		error: function() {

			$('table tbody').html(`<tr>
                <td colspan="12" class="text-center text-danger">
                    ERROR FETCHING DATA
                </td>
            </tr>`);

		}

	});

}


/* ------------------ BIND TABLE ------------------ */

function bindLoanTable(data) {

	let tbody = $('.datatable tbody');
	tbody.empty();

	if (!data || data.length === 0) {

		tbody.append(`<tr>
            <td colspan="12" class="text-center text-danger">
                NO RECORDS FOUND
            </td>
        </tr>`);

		return;

	}

	let sn = 1;

	data.forEach(item => {

		let loanAmount = parseFloat(item.loanAmount || 0);
		let totalPaid = parseFloat(item.sanctionedAmount || 0);
		let emiPayment = parseFloat(item.emiPayment || 0);

		let overdue = (loanAmount - totalPaid) > 0
			? (loanAmount - totalPaid).toFixed(2)
			: '0.00';

		let currentDue = emiPayment.toFixed(2);

		let row = `
        <tr>
            <td>${sn++}</td>
            <td>${item.loanId || ''}</td>
            <td>${item.memberId || ''}</td>
            <td>${item.memberName || ''}</td>
            <td>${item.loanDate || ''}</td>
            <td>${item.branchName || ''}</td>
            <td>${item.contactNo || ''}</td>
            <td>${item.loanPlanName || ''}</td>
            <td>${totalPaid}</td>
            <td>${overdue}</td>
            <td>${currentDue}</td>
            <td>
                <button class="btn btn-sm btn-primary printBtn">
                    PRINT
                </button>
            </td>
        </tr>`;

		tbody.append(row);

	});

}


/* ------------------ PRINT BUTTON ------------------ */

$(document).on("click", ".printBtn", function() {

	let row = $(this).closest("tr");

	let loanId = row.find("td:eq(1)").text();
	let memberCode = row.find("td:eq(2)").text();
	let memberName = row.find("td:eq(3)").text();
	let loanDate = row.find("td:eq(4)").text();
	let branch = row.find("td:eq(5)").text();
	let mobile = row.find("td:eq(6)").text();
	let loanName = row.find("td:eq(7)").text();
	let totalPaid = row.find("td:eq(8)").text();
	let overdue = row.find("td:eq(9)").text();
	let currentDue = row.find("td:eq(10)").text();

	let printWindow = window.open('', '', 'width=900,height=700');

	printWindow.document.write(`
        <html>
        <head>
            <title>LOAN REPORT</title>
            <style>
                body{font-family:Arial;padding:20px}
                h2{text-align:center;margin-bottom:5px}
                h4{text-align:center;margin-top:0}
                p{text-align:center;margin:2px}
                table{width:100%;border-collapse:collapse;margin-top:20px}
                td,th{border:1px solid #000;padding:8px;text-align:left}
            </style>
        </head>
        <body>

            <h2>CO OPERATIVE SOCIETY LTD NAGPUR</h2>
            <p>PLOT NO 497 NEW NANDANWAN</p>
            <p>MAHARASHTRA - 440024</p>
            <p>CIN : ASJ#567 | EMAIL : example@gmail.com | HELPLINE : 9566200223</p>

            <h4>LOAN OVERDUE REPORT</h4>

            <table>
                <tr><th>LOAN ID</th><td>${loanId}</td></tr>
                <tr><th>MEMBER CODE</th><td>${memberCode}</td></tr>
                <tr><th>MEMBER NAME</th><td>${memberName}</td></tr>
                <tr><th>LOAN DATE</th><td>${loanDate}</td></tr>
                <tr><th>BRANCH</th><td>${branch}</td></tr>
                <tr><th>MOBILE</th><td>${mobile}</td></tr>
                <tr><th>LOAN NAME</th><td>${loanName}</td></tr>
                <tr><th>TOTAL PAID</th><td>${totalPaid}</td></tr>
                <tr><th>OVER DUE</th><td>${overdue}</td></tr>
                <tr><th>CURRENT DUE</th><td>${currentDue}</td></tr>
            </table>

        </body>
        </html>
    `);

	printWindow.document.close();
	printWindow.print();

});


/* ------------------ DATE PARSER ------------------ */

function parseDate(dateStr) {

	if (!dateStr) return new Date('');

	let parts = dateStr.split('/');

	if (parts.length === 3) {

		return new Date(parts[2], parts[1] - 1, parts[0]);

	}

	return new Date(dateStr);

}