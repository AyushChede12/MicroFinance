$(document).ready(function() {
	let allLoanData = [];

	// ==============================
	// Load Dropdowns & Initial Data
	// ==============================
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
				uniqueBranches.forEach(branchName => {
					$("#branchName1").append(`<option value="${branchName}">${branchName}</option>`);
				});

				$("#loanPlanName").html("<option value=''>ALL PLANS</option>");
				uniquePlans.forEach(planName => {
					$("#loanPlanName").append(`<option value="${planName}">${planName}</option>`);
				});

				bindLoanTable(allLoanData);
			} else {
				alert("ERROR: " + (response.message || "FAILED TO LOAD DROPDOWN DATA"));
			}
		},
		error: function(xhr) {
			console.error("Error loading approved loans:", xhr.responseText);
			alert("FAILED TO LOAD DROPDOWN DATA.");
		}
	});

	// ==============================
	// Find Button Click
	// ==============================
	$('#findBtn').click(function(e) {
		e.preventDefault();
		filterLoans();
	});

	// ==============================
	// Reset Button Click
	// ==============================
	$('#resetBtn').click(function(e) {
		e.preventDefault();
		$('#branchName1').val('');
		$('#loanPlanName').val('');
		$('#financialCode').val('');
		$('#toDate').val('');
		bindLoanTable(allLoanData);
	});

	// ==============================
	// Print Full Report
	// ==============================
	$('#printFullReportBtn').click(function(e) {
		e.preventDefault();
		const branch = $('#branchName1').val() || 'ALL BRANCHES';
		const plan = $('#loanPlanName').val() || 'ALL PLANS';
		const finCode = $('#financialCode').val() || 'ALL';
		const toDate = $('#toDate').val() || 'ALL DATES';
		const subTitle = `FILTERS: BRANCH: ${branch} | PLAN: ${plan} | ADVISOR: ${finCode} | UP TO DATE: ${toDate}`;
		ReportPrintUtil.printTable('.datatable', 'LOAN INSTALLMENT PENDING REPORT', subTitle);
	});

	function filterLoans() {
		let branch = ($('#branchName1').val() || '').trim().toUpperCase();
		let policy = ($('#loanPlanName').val() || '').trim().toUpperCase();
		let financialCode = ($('#financialCode').val() || '').trim().toUpperCase();
		let toDate = $('#toDate').val();

		let filtered = allLoanData.filter(item => {
			const itemBranch = (item.branchName || '').toUpperCase();
			const itemPlan = (item.loanPlanName || item.typeOfLoan || '').toUpperCase();
			const itemFin = (item.financialConsultantId || item.financialConsultantName || '').toUpperCase();

			const branchMatch = !branch || itemBranch.includes(branch);
			const planMatch = !policy || itemPlan.includes(policy);
			const codeMatch = !financialCode || itemFin.includes(financialCode);

			let dateMatch = true;
			if (toDate) {
				let loanDate = parseDate(item.loanDate || item.approvalDate);
				let tDate = new Date(toDate);
				if (loanDate && !isNaN(loanDate.getTime())) {
					dateMatch = loanDate <= tDate;
				}
			}

			return branchMatch && planMatch && codeMatch && dateMatch;
		});

		bindLoanTable(filtered);
	}

	// =============================================
	// Bind Data To Table
	// =============================================
	function bindLoanTable(data) {
		let tbody = $('.datatable tbody');
		tbody.empty();

		if (!data || data.length === 0) {
			tbody.append(`<tr><td colspan="15" class="text-center text-danger fw-bold">NO PENDING INSTALLMENT RECORDS FOUND</td></tr>`);
			return;
		}

		let sn = 1;
		data.forEach(item => {
			let loanAmount = parseFloat(item.loanAmount || 0);
			let roi = parseFloat(item.rateOfInterest || 0);
			let loanTerm = parseInt(item.loanTerm || 1);

			let monthlyInterest = (loanAmount * roi / 100) / loanTerm;
			let installmentAmount = (loanAmount / loanTerm) + monthlyInterest;

			let totalInstallments = loanTerm;
			let paidInstallments = (item.paymentStatus && item.paymentStatus.toLowerCase() === "paid")
				? totalInstallments
				: Math.floor(totalInstallments / 2);

			let pendingInstallments = totalInstallments - paidInstallments;
			let outstandingBalance = pendingInstallments * installmentAmount;
			let lastPaymentDate = (item.paymentDate || item.loanDate || "-").toUpperCase();
			let loanStatus = (item.loanStatus || 'ACTIVE').toUpperCase();
			let remarks = (item.remarks || 'INSTALLMENT SCHEDULE REGULAR').toUpperCase();

			let statusBadge = `<span class="badge bg-success">${loanStatus}</span>`;
			if (loanStatus.includes('PEND') || pendingInstallments > 0) {
				statusBadge = `<span class="badge bg-warning text-dark">${loanStatus}</span>`;
			}

			let row = `
			<tr>
				<td class="text-center font-monospace">${sn++}</td>
				<td class="fw-bold">${(item.loanId || '').toUpperCase()}</td>
				<td>${(item.branchName || '').toUpperCase()}</td>
				<td class="fw-semibold">${(item.memberName || '').toUpperCase()}</td>
				<td>${(item.financialConsultantId || '-').toUpperCase()}</td>
				<td>₹${loanAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
				<td class="text-primary fw-bold">₹${installmentAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
				<td class="text-center">${totalInstallments}</td>
				<td class="text-center text-success fw-bold">${paidInstallments}</td>
				<td class="text-center text-danger fw-bold">${pendingInstallments}</td>
				<td class="text-danger fw-bold">₹${outstandingBalance.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
				<td>${lastPaymentDate}</td>
				<td>${statusBadge}</td>
				<td>${remarks}</td>
				<td class="text-center no-print">
					<button class="btn btn-sm btn-outline-primary printBtn">
						<i class="bi bi-printer"></i> PRINT
					</button>
				</td>
			</tr>
			`;

			tbody.append(row);
		});
	}

	// =============================================
	// PRINT SINGLE RECORD
	// =============================================
	$(document).on("click", ".printBtn", function() {
		let row = $(this).closest("tr");

		let loanId = row.find("td:eq(1)").text();
		let branch = row.find("td:eq(2)").text();
		let customer = row.find("td:eq(3)").text();
		let financialCode = row.find("td:eq(4)").text();
		let loanAmount = row.find("td:eq(5)").text();
		let installmentAmount = row.find("td:eq(6)").text();
		let totalInst = row.find("td:eq(7)").text();
		let paidInst = row.find("td:eq(8)").text();
		let pendingInst = row.find("td:eq(9)").text();
		let outstandingBalance = row.find("td:eq(10)").text();
		let lastPaymentDate = row.find("td:eq(11)").text();
		let status = row.find("td:eq(12)").text();

		let html = `
			<table class="table table-bordered text-uppercase">
				<thead class="table-dark">
					<tr><th style="width:40%;">PARAMETER</th><th style="width:60%;">DETAILS</th></tr>
				</thead>
				<tbody>
					<tr><td class="fw-bold">LOAN ID</td><td class="fw-bold">${loanId}</td></tr>
					<tr><td>BRANCH NAME</td><td>${branch}</td></tr>
					<tr><td>CUSTOMER NAME</td><td class="fw-bold">${customer}</td></tr>
					<tr><td>FINANCIAL CONSULTANT CODE</td><td>${financialCode}</td></tr>
					<tr><td>TOTAL LOAN AMOUNT</td><td class="fw-bold">${loanAmount}</td></tr>
					<tr><td>MONTHLY INSTALLMENT</td><td class="text-primary fw-bold">${installmentAmount}</td></tr>
					<tr><td>TOTAL INSTALLMENTS</td><td>${totalInst}</td></tr>
					<tr><td>PAID INSTALLMENTS</td><td class="text-success fw-bold">${paidInst}</td></tr>
					<tr><td>PENDING INSTALLMENTS</td><td class="text-danger fw-bold">${pendingInst}</td></tr>
					<tr><td>OUTSTANDING BALANCE</td><td class="text-danger fw-bold">${outstandingBalance}</td></tr>
					<tr><td>LAST PAYMENT DATE</td><td>${lastPaymentDate}</td></tr>
					<tr><td>STATUS</td><td>${status}</td></tr>
				</tbody>
			</table>
		`;

		ReportPrintUtil.printHtml("LOAN INSTALLMENT PENDING NOTICE", html);
	});

	// =============================================
	// Date Parser
	// =============================================
	function parseDate(dateStr) {
		if (!dateStr) return null;
		let str = String(dateStr).trim();
		if (str.includes('/')) {
			let parts = str.split('/');
			if (parts.length === 3) return new Date(parts[2], parts[1] - 1, parts[0]);
		} else if (str.includes('-')) {
			let parts = str.split('-');
			if (parts.length === 3) {
				if (parts[0].length === 4) return new Date(str);
				return new Date(parts[2], parts[1] - 1, parts[0]);
			}
		}
		return new Date(str);
	}
});
