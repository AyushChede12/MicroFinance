$(document).ready(function() {
	let allLoans = [];
	let currentFilteredLoans = [];

	$.ajax({
		url: "api/preference/getAllBranchModule",
		type: "GET",
		success: function(response) {
			let list = response && response.data ? response.data : (Array.isArray(response) ? response : []);
			let sel = $("#branch");
			sel.html("<option value=''>ALL BRANCHES</option>");
			list.forEach(b => {
				if (b && b.branchName) {
					let name = b.branchName.trim().toUpperCase();
					sel.append(`<option value="${name}">${name}</option>`);
				}
			});
		}
	});

	function loadIrregularity() {
		$.ajax({
			url: "api/datacorrection/fetchAllApprovedLoanApplications",
			type: "GET",
			success: function(response) {
				allLoans = response && response.data ? response.data : [];
				currentFilteredLoans = allLoans;
				renderTable(allLoans);
			},
			error: function() {
				$("#irregularityTableBody").html("<tr><td colspan='12' class='text-center text-danger fw-bold'>NO IRREGULARITY RECORDS FOUND</td></tr>");
			}
		});
	}

	function renderTable(data) {
		let tbody = $("#irregularityTableBody");
		tbody.empty();

		if (!data || !data.length) {
			tbody.html("<tr><td colspan='12' class='text-center text-danger fw-bold'>NO IRREGULAR EMI ACCOUNTS FOUND</td></tr>");
			return;
		}

		let sn = 1;
		data.forEach((item, index) => {
			let loanAmt = parseFloat(item.loanAmount || 0);
			let totalPaid = parseFloat(item.sanctionedAmount || item.totalPaid || 0);
			let emiAmt = parseFloat(item.emiPayment || 0);
			let overdue = (loanAmt - totalPaid) > 0 ? (loanAmt - totalPaid) : 0;
			let statusBadge = overdue > 0
				? `<span class="badge bg-danger">DEFAULT / OVERDUE</span>`
				: `<span class="badge bg-success">REGULAR</span>`;

			let row = `
				<tr>
					<td class="text-center font-monospace">${sn++}</td>
					<td class="fw-bold">${(item.loanId || '-').toUpperCase()}</td>
					<td>${(item.memberId || '-').toUpperCase()}</td>
					<td class="fw-semibold">${(item.memberName || '-').toUpperCase()}</td>
					<td>${(item.branchName || '-').toUpperCase()}</td>
					<td>${(item.loanPlanName || item.typeOfLoan || '-').toUpperCase()}</td>
					<td>₹${loanAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td class="text-success fw-bold">₹${totalPaid.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td class="text-danger fw-bold">₹${overdue.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td class="fw-bold">₹${emiAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td>${statusBadge}</td>
					<td class="text-center no-print">
						<button class="btn btn-sm btn-outline-danger printDefaultNoticeBtn" data-index="${index}" title="PRINT NOTICE">
							<i class="bi bi-printer"></i> PRINT
						</button>
					</td>
				</tr>
			`;
			tbody.append(row);
		});
	}

	$("#findBtn").click(function(e) {
		e.preventDefault();
		let branch = ($("#branch").val() || "").toUpperCase();
		let filtered = allLoans.filter(l => !branch || (l.branchName || "").toUpperCase().includes(branch));
		currentFilteredLoans = filtered;
		renderTable(filtered);
	});

	$("#resetBtn").click(function(e) {
		e.preventDefault();
		$("#branch").val("");
		$("#fDate").val("");
		$("#tDate").val("");
		currentFilteredLoans = allLoans;
		renderTable(allLoans);
	});

	$("#printFullReportBtn").click(function(e) {
		e.preventDefault();
		let branch = $("#branch").val() || "ALL BRANCHES";
		let subTitle = `FILTERS: BRANCH: ${branch}`;
		ReportPrintUtil.printTable('.datatable', 'LOAN EMI IRREGULARITY STATEMENT', subTitle);
	});

	$(document).off("click", ".printDefaultNoticeBtn").on("click", ".printDefaultNoticeBtn", function(e) {
		e.preventDefault();
		let idx = $(this).data("index");
		let item = currentFilteredLoans[idx] || allLoans[idx];
		if (!item) {
			alert("LOAN RECORD NOT FOUND");
			return;
		}

		let loanAmt = parseFloat(item.loanAmount || 0);
		let totalPaid = parseFloat(item.sanctionedAmount || item.totalPaid || 0);
		let emiAmt = parseFloat(item.emiPayment || 0);
		let overdue = (loanAmt - totalPaid) > 0 ? (loanAmt - totalPaid) : 0;

		let html = `
			<table class="table table-bordered text-uppercase" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
				<thead class="table-dark">
					<tr>
						<th colspan="4" style="padding: 10px; font-size: 14px; text-align: center;">
							LOAN EMI DEFAULT & IRREGULARITY NOTICE
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th style="width: 25%;">LOAN ACCOUNT ID</th>
						<td style="width: 25%; font-weight: bold; color: #002147;">${(item.loanId || '-').toUpperCase()}</td>
						<th style="width: 25%;">MEMBER CODE</th>
						<td style="width: 25%; font-weight: bold;">${(item.memberId || '-').toUpperCase()}</td>
					</tr>
					<tr>
						<th>BORROWER NAME</th>
						<td><strong>${(item.memberName || '-').toUpperCase()}</strong></td>
						<th>BRANCH</th>
						<td>${(item.branchName || '-').toUpperCase()}</td>
					</tr>
					<tr>
						<th>SCHEME / PLAN</th>
						<td>${(item.loanPlanName || item.typeOfLoan || '-').toUpperCase()}</td>
						<th>SANCTION AMOUNT</th>
						<td>₹${loanAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					</tr>
					<tr>
						<th>TOTAL PAID PRINCIPAL</th>
						<td style="color: green;">₹${totalPaid.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
						<th>CURRENT MONTH EMI</th>
						<td>₹${emiAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					</tr>
					<tr>
						<th>OVERDUE AMOUNT</th>
						<td colspan="3" style="font-size: 16px; font-weight: bold; color: red;">₹${overdue.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					</tr>
					<tr>
						<th>IRREGULARITY STATUS</th>
						<td colspan="3"><span class="badge bg-danger">OVERDUE / IRREGULAR REPAYMENT</span></td>
					</tr>
				</tbody>
			</table>
		`;

		ReportPrintUtil.printHtml("LOAN EMI DEFAULT NOTICE", html);
	});

	loadIrregularity();
});
