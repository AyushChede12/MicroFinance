$(document).ready(function() {
	let allLoanData = [];

	/* ------------------ LOAD DROPDOWNS ------------------ */
	$.ajax({
		url: "api/datacorrection/fetchAllApprovedLoanApplications",
		type: "GET",
		success: function(response) {
			if (response.status === "OK" || response.status === "SUCCESS" || Array.isArray(response.data)) {
				allLoanData = response.data || [];

				const uniqueBranches = new Set();
				const uniquePlans = new Set();

				allLoanData.forEach(item => {
					if (item.branchName) uniqueBranches.add(item.branchName.trim().toUpperCase());
					if (item.loanPlanName) uniquePlans.add(item.loanPlanName.trim().toUpperCase());
					if (item.typeOfLoan) uniquePlans.add(item.typeOfLoan.trim().toUpperCase());
				});

				$("#branchName1").html("<option value=''>ALL BRANCHES</option>");
				uniqueBranches.forEach(branch => {
					$("#branchName1").append(`<option value="${branch}">${branch}</option>`);
				});

				$("#loanPlanName").html("<option value=''>ALL PLANS</option>");
				uniquePlans.forEach(plan => {
					$("#loanPlanName").append(`<option value="${plan}">${plan}</option>`);
				});

				bindLoanTable(allLoanData);
			} else {
				alert("ERROR: " + (response.message || "DROPDOWN LOADING FAILED"));
			}
		},
		error: function(xhr) {
			console.log(xhr);
			alert("DROPDOWN LOADING FAILED");
		}
	});

	/* ------------------ FIND BUTTON ------------------ */
	$('#findBtn').click(function(e) {
		e.preventDefault();
		filterData();
	});

	/* ------------------ RESET BUTTON ------------------ */
	$('#resetBtn').click(function(e) {
		e.preventDefault();
		$('#branchName1').val('');
		$('#loanPlanName').val('');
		$('#financialCode').val('');
		$('#toDate').val('');
		bindLoanTable(allLoanData);
	});

	/* ------------------ PRINT FULL REPORT ------------------ */
	$('#printFullReportBtn').click(function(e) {
		e.preventDefault();
		const branch = $('#branchName1').val() || 'ALL BRANCHES';
		const plan = $('#loanPlanName').val() || 'ALL PLANS';
		const finCode = $('#financialCode').val() || 'ALL';
		const toDate = $('#toDate').val() || 'ALL DATES';
		const subTitle = `FILTERS: BRANCH: ${branch} | PLAN: ${plan} | ADVISOR: ${finCode} | AS OF DATE: ${toDate}`;
		ReportPrintUtil.printTable('.datatable', 'OVERDUE RE-PAYMENT ANALYSIS REPORT', subTitle);
	});

	function filterData() {
		const branch = ($('#branchName1').val() || '').trim().toUpperCase();
		const policy = ($('#loanPlanName').val() || '').trim().toUpperCase();
		const financialCode = ($('#financialCode').val() || '').trim().toUpperCase();
		const toDate = $('#toDate').val();

		const filtered = allLoanData.filter(item => {
			const itemBranch = (item.branchName || '').toUpperCase();
			const itemPlan = (item.loanPlanName || item.typeOfLoan || '').toUpperCase();
			const itemFin = (item.financialConsultantId || item.financialConsultantName || '').toUpperCase();

			const matchesBranch = !branch || itemBranch.includes(branch);
			const matchesPlan = !policy || itemPlan.includes(policy);
			const matchesFin = !financialCode || itemFin.includes(financialCode);

			let matchesDate = true;
			if (toDate) {
				const approvalDate = parseDate(item.approvalDate || item.loanDate);
				const tDate = new Date(toDate);
				if (approvalDate && !isNaN(approvalDate.getTime())) {
					matchesDate = approvalDate <= tDate;
				}
			}

			return matchesBranch && matchesPlan && matchesFin && matchesDate;
		});

		bindLoanTable(filtered);
	}

	/* ------------------ BIND TABLE ------------------ */
	function bindLoanTable(data) {
		let tbody = $('.datatable tbody');
		tbody.empty();

		if (!data || data.length === 0) {
			tbody.append(`<tr>
				<td colspan="12" class="text-center text-danger fw-bold">
					NO OVERDUE RECORDS FOUND
				</td>
			</tr>`);
			return;
		}

		let sn = 1;
		data.forEach(item => {
			let loanAmount = parseFloat(item.loanAmount || 0);
			let totalPaid = parseFloat(item.sanctionedAmount || item.totalPaid || 0);
			let emiPayment = parseFloat(item.emiPayment || 0);

			let overdue = (loanAmount - totalPaid) > 0 ? (loanAmount - totalPaid) : 0;
			let currentDue = emiPayment;

			let row = `
			<tr>
				<td class="text-center font-monospace">${sn++}</td>
				<td class="fw-bold">${(item.loanId || '').toUpperCase()}</td>
				<td>${(item.memberId || '').toUpperCase()}</td>
				<td class="fw-semibold">${(item.memberName || '').toUpperCase()}</td>
				<td>${(item.loanDate || '').toUpperCase()}</td>
				<td>${(item.branchName || '').toUpperCase()}</td>
				<td>${(item.contactNo || '').toUpperCase()}</td>
				<td>${(item.loanPlanName || item.typeOfLoan || '').toUpperCase()}</td>
				<td class="text-success fw-bold">₹${totalPaid.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
				<td class="text-danger fw-bold">₹${overdue.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
				<td class="fw-bold">₹${currentDue.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
				<td class="text-center no-print">
					<button class="btn btn-sm btn-outline-primary printBtn" data-loan-id="${item.loanId || ''}">
						<i class="bi bi-printer"></i> PRINT
					</button>
				</td>
			</tr>`;
			tbody.append(row);
		});
	}

	/* ------------------ PRINT SINGLE OVERDUE DOSSIER ------------------ */
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

		let html = `
			<table class="table table-bordered text-uppercase">
				<thead class="table-dark">
					<tr><th style="width:40%;">PARAMETER</th><th style="width:60%;">DETAILS</th></tr>
				</thead>
				<tbody>
					<tr><td class="fw-bold">LOAN ID</td><td class="fw-bold">${loanId}</td></tr>
					<tr><td>MEMBER CODE</td><td>${memberCode}</td></tr>
					<tr><td>MEMBER NAME</td><td class="fw-bold">${memberName}</td></tr>
					<tr><td>LOAN DATE</td><td>${loanDate}</td></tr>
					<tr><td>BRANCH</td><td>${branch}</td></tr>
					<tr><td>MOBILE NO.</td><td>${mobile}</td></tr>
					<tr><td>PLAN NAME</td><td>${loanName}</td></tr>
					<tr><td>TOTAL PRINCIPAL PAID</td><td class="text-success fw-bold">${totalPaid}</td></tr>
					<tr><td>OVERDUE AMOUNT</td><td class="text-danger fw-bold">${overdue}</td></tr>
					<tr><td>CURRENT MONTH DUE</td><td class="fw-bold">${currentDue}</td></tr>
				</tbody>
			</table>
		`;

		ReportPrintUtil.printHtml("LOAN OVERDUE RE-PAYMENT NOTICE", html);
	});

	/* ------------------ DATE PARSER ------------------ */
	function parseDate(dateStr) {
		if (!dateStr) return new Date('');
		let str = String(dateStr).trim();
		if (str.includes('/')) {
			let parts = str.split('/');
			if (parts.length === 3) {
				return new Date(parts[2], parts[1] - 1, parts[0]);
			}
		} else if (str.includes('-')) {
			let parts = str.split('-');
			if (parts.length === 3) {
				if (parts[0].length === 4) {
					return new Date(str);
				} else {
					return new Date(parts[2], parts[1] - 1, parts[0]);
				}
			}
		}
		return new Date(str);
	}
});
