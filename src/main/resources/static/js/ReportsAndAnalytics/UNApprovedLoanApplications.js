let allUnapprovedLoans = [];

$(document).ready(function() {
	loadUnapprovedLoans();

	// ================= FIND FILTER =================
	$("#findBtn").click(function(e) {
		e.preventDefault();
		filterUnapprovedLoans();
	});

	// ================= RESET FILTER =================
	$("#resetBtn").click(function(e) {
		e.preventDefault();
		$("#branchName1").val('');
		$("#fromDate").val('');
		$("#toDate").val('');
		renderTable(allUnapprovedLoans);
	});

	// ================= PRINT FULL REPORT =================
	$("#printFullReportBtn").click(function(e) {
		e.preventDefault();
		const branch = $("#branchName1").val() || 'ALL BRANCHES';
		const fromDate = $("#fromDate").val() || 'START';
		const toDate = $("#toDate").val() || 'TODAY';
		const subTitle = `FILTERS: BRANCH: ${branch} | APPLICATION PERIOD: ${fromDate} TO ${toDate}`;
		ReportPrintUtil.printTable('.datatable', 'UNAPPROVED LOAN APPLICATIONS REPORT', subTitle);
	});

	// ================= FETCH DATA =================
	function loadUnapprovedLoans() {
		$.ajax({
			url: "api/reports/getUnapprovedLoanApplication",
			type: "GET",
			success: function(response) {
				if (response && response.data && Array.isArray(response.data)) {
					allUnapprovedLoans = response.data;
					populateBranchDropdown(allUnapprovedLoans);
					renderTable(allUnapprovedLoans);
				} else {
					renderTable([]);
				}
			},
			error: function() {
				// 404 or empty returns clean empty table
				renderTable([]);
			}
		});
	}

	function populateBranchDropdown(loans) {
		let branches = new Set();
		loans.forEach(p => {
			if (p.branchName) branches.add(p.branchName.trim().toUpperCase());
		});

		$("#branchName1").html("<option value=''>ALL BRANCHES</option>");
		branches.forEach(branch => {
			$("#branchName1").append(`<option value="${branch}">${branch}</option>`);
		});
	}

	function filterUnapprovedLoans() {
		let branch = ($("#branchName1").val() || '').trim().toUpperCase();
		let fromDate = $("#fromDate").val();
		let toDate = $("#toDate").val();

		let filtered = allUnapprovedLoans.filter(loan => {
			let itemBranch = (loan.branchName || '').toUpperCase();
			let loanDate = loan.loanDate || loan.applicationDate || '';

			let matchBranch = !branch || itemBranch.includes(branch);
			let matchFrom = !fromDate || loanDate >= fromDate;
			let matchTo = !toDate || loanDate <= toDate;

			return matchBranch && matchFrom && matchTo;
		});

		renderTable(filtered);
	}

	// ================= RENDER TABLE =================
	function renderTable(data) {
		let tbody = $(".datatable tbody");
		tbody.empty();

		if (!data || !data.length) {
			tbody.append("<tr><td colspan='11' class='text-center text-danger fw-bold'>NO UNAPPROVED LOAN APPLICATIONS FOUND</td></tr>");
			return;
		}

		data.forEach(function(loan, index) {
			let loanAmt = parseFloat(loan.loanAmount || 0);
			let status = (loan.approvalStatus === false || loan.loanStatus === 'REJECTED') ? 'UNAPPROVED / PENDING' : (loan.loanStatus || 'PENDING APPROVAL').toUpperCase();

			let row = `
			<tr>
				<td class="text-center font-monospace">${index + 1}</td>
				<td class="fw-bold">${(loan.loanId || '').toUpperCase()}</td>
				<td class="fw-semibold">${(loan.memberName || '').toUpperCase()}</td>
				<td>${(loan.loanPlanName || loan.typeOfLoan || '').toUpperCase()}</td>
				<td>${(loan.interestType || '').toUpperCase()}</td>
				<td>${(loan.loanDate || '').toUpperCase()}</td>
				<td class="fw-bold">₹${loanAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
				<td>${(loan.contactNo || '').toUpperCase()}</td>
				<td>${(loan.branchName || '').toUpperCase()}</td>
				<td><span class="badge bg-danger">${status}</span></td>
				<td class="text-center no-print">
					<button class="btn btn-sm btn-outline-primary printPopupBtn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#printModal">
						<i class="bi bi-printer"></i> VIEW
					</button>
				</td>
			</tr>
			`;

			tbody.append(row);
		});

		// Modal click handler
		$(".printPopupBtn").off("click").on("click", function() {
			let idx = $(this).data("index");
			let loan = data[idx];
			if (!loan) return;

			let loanAmt = parseFloat(loan.loanAmount || 0);
			let emiAmt = parseFloat(loan.emiPayment || 0);

			let html = `
				<div class="table-responsive">
					<table class="table table-bordered text-uppercase">
						<thead class="table-dark">
							<tr><th style="width: 40%;">PARAMETER</th><th style="width: 60%;">DETAILS</th></tr>
						</thead>
						<tbody>
							<tr><td class="fw-bold">LOAN APPLICATION ID</td><td class="fw-bold">${(loan.loanId || '').toUpperCase()}</td></tr>
							<tr><td>MEMBER / BORROWER CODE</td><td>${(loan.memberId || '').toUpperCase()}</td></tr>
							<tr><td>APPLICANT NAME</td><td class="fw-bold">${(loan.memberName || '').toUpperCase()}</td></tr>
							<tr><td>CONTACT NUMBER</td><td>${(loan.contactNo || '').toUpperCase()}</td></tr>
							<tr><td>RESIDENTIAL ADDRESS</td><td>${(loan.address || 'N/A').toUpperCase()}</td></tr>
							<tr><td>BRANCH NAME</td><td>${(loan.branchName || '').toUpperCase()}</td></tr>
							<tr><td>LOAN PLAN NAME</td><td>${(loan.loanPlanName || loan.typeOfLoan || '').toUpperCase()}</td></tr>
							<tr><td>INTEREST TYPE</td><td>${(loan.interestType || '').toUpperCase()}</td></tr>
							<tr><td>RATE OF INTEREST</td><td>${loan.rateOfInterest || 0}%</td></tr>
							<tr><td>TENURE / TERM</td><td>${(loan.loanTerm || 0)} MONTHS</td></tr>
							<tr><td>REQUESTED LOAN AMOUNT</td><td class="fw-bold text-primary">₹${loanAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
							<tr><td>EXPECTED EMI PAYMENT</td><td>₹${emiAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
							<tr><td>APPLICATION DATE</td><td>${(loan.loanDate || '').toUpperCase()}</td></tr>
							<tr><td>FINANCIAL CONSULTANT</td><td>${(loan.financialConsultantName || loan.financialConsultantId || 'DIRECT').toUpperCase()}</td></tr>
							<tr><td>GUARANTOR DETAILS</td><td>${(loan.guarantorIdentity || loan.guarantorMemberId || 'N/A').toUpperCase()}</td></tr>
							<tr><td>CURRENT STATUS</td><td><span class="badge bg-danger">UNAPPROVED / PENDING SCRUTINY</span></td></tr>
							<tr><td>REMARKS / REASON</td><td>${(loan.remarks || 'APPLICATION PENDING FINAL BOARD SANCTION').toUpperCase()}</td></tr>
						</tbody>
					</table>
				</div>
			`;

			$("#modalDataContainer").html(html);
		});
	}

	// Modal Print Button
	$("#modalPrintBtn").off("click").on("click", function() {
		let content = $("#modalDataContainer").html();
		ReportPrintUtil.printHtml("UNAPPROVED LOAN APPLICATION DOSSIER", content);
	});
});
