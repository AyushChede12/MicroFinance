$(document).ready(function() {
	let allTds = [];

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

	function loadTds() {
		$.ajax({
			url: "api/incentive/getIncentiveSummaryReport",
			type: "GET",
			success: function(response) {
				allTds = response && response.data ? response.data : [];
				renderTable(allTds);
			},
			error: function() {
				$("#tdsTableBody").html("<tr><td colspan='10' class='text-center text-danger fw-bold'>NO TDS SUMMARY RECORDS FOUND</td></tr>");
			}
		});
	}

	function renderTable(data) {
		let tbody = $("#tdsTableBody");
		tbody.empty();

		if (!data || !data.length) {
			tbody.html("<tr><td colspan='10' class='text-center text-danger fw-bold'>NO TDS SUMMARY RECORDS FOUND</td></tr>");
			return;
		}

		data.forEach((item, idx) => {
			let earnings = parseFloat(item.totalEarnings || 0);
			let tax = parseFloat(item.taxDeducted || 0);
			let payout = parseFloat(item.finalPayout || (earnings - tax));
			let rate = earnings > 0 ? ((tax / earnings) * 100).toFixed(1) : "5.0";

			let row = `
				<tr>
					<td class="text-center font-monospace">${idx + 1}</td>
					<td class="fw-bold">${(item.teamCode || '-').toUpperCase()}</td>
					<td class="fw-semibold">${(item.teamName || '-').toUpperCase()}</td>
					<td class="fw-bold">${(item.panNo || 'MFCAS1245W').toUpperCase()}</td>
					<td>${(item.branchName || '-').toUpperCase()}</td>
					<td class="text-success fw-bold">₹${earnings.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td class="text-center">${rate}%</td>
					<td class="text-danger fw-bold">₹${tax.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td class="fw-bold">₹${payout.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td><span class="badge bg-success">DEPOSITED</span></td>
				</tr>
			`;
			tbody.append(row);
		});
	}

	$("#findBtn").click(function(e) {
		e.preventDefault();
		let b = ($("#branch").val() || "").toUpperCase();
		let code = ($("#financialCode").val() || "").toUpperCase();

		let filtered = allTds.filter(item => {
			let bMatch = !b || (item.branchName || "").toUpperCase().includes(b);
			let cMatch = !code || (item.teamCode || "").toUpperCase().includes(code) || (item.teamName || "").toUpperCase().includes(code);
			return bMatch && cMatch;
		});

		renderTable(filtered);
	});

	$("#resetBtn").click(function(e) {
		e.preventDefault();
		$("#branch").val("");
		$("#financialCode").val("");
		renderTable(allTds);
	});

	$("#printFullReportBtn").click(function(e) {
		e.preventDefault();
		let b = $("#branch").val() || "ALL BRANCHES";
		let fy = $("#financialYear").val();
		let subTitle = `FILTERS: BRANCH: ${b} | FINANCIAL YEAR: ${fy}`;
		ReportPrintUtil.printTable('.datatable', 'TAX DEDUCTED AT SOURCE (TDS) SUMMARY REPORT', subTitle);
	});

	loadTds();
});
