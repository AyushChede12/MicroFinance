$(document).ready(function() {
	let allLoans = [];

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
				renderTable(allLoans);
			},
			error: function() {
				$("#irregularityTableBody").html("<tr><td colspan='11' class='text-center text-danger fw-bold'>NO IRREGULARITY RECORDS FOUND</td></tr>");
			}
		});
	}

	function renderTable(data) {
		let tbody = $("#irregularityTableBody");
		tbody.empty();

		if (!data || !data.length) {
			tbody.html("<tr><td colspan='11' class='text-center text-danger fw-bold'>NO IRREGULAR EMI ACCOUNTS FOUND</td></tr>");
			return;
		}

		let sn = 1;
		data.forEach((item) => {
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
				</tr>
			`;
			tbody.append(row);
		});
	}

	$("#findBtn").click(function(e) {
		e.preventDefault();
		let branch = ($("#branch").val() || "").toUpperCase();
		let filtered = allLoans.filter(l => !branch || (l.branchName || "").toUpperCase().includes(branch));
		renderTable(filtered);
	});

	$("#resetBtn").click(function(e) {
		e.preventDefault();
		$("#branch").val("");
		$("#fDate").val("");
		$("#tDate").val("");
		renderTable(allLoans);
	});

	$("#printFullReportBtn").click(function(e) {
		e.preventDefault();
		let branch = $("#branch").val() || "ALL BRANCHES";
		let subTitle = `FILTERS: BRANCH: ${branch}`;
		ReportPrintUtil.printTable('.datatable', 'LOAN EMI IRREGULARITY STATEMENT', subTitle);
	});

	loadIrregularity();
});
