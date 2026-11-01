$(document).ready(function() {
	let branchData = [];

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

	function loadInvestmentSummary() {
		$.ajax({
			url: "api/reports/investment-transactions",
			type: "GET",
			success: function(response) {
				let txns = response && response.data ? response.data : (Array.isArray(response) ? response : []);
				let branchMap = {};

				txns.forEach(t => {
					let bName = (t.branchName || "HEAD OFFICE").toUpperCase();
					let amt = parseFloat(t.amount || 0);
					if (!branchMap[bName]) {
						branchMap[bName] = { code: t.branchCode || "B001", newBiz: 0, fees: 0, renewBiz: 0, fine: 0 };
					}
					let status = (t.status || "").toUpperCase();
					if (status.includes("RENEW")) {
						branchMap[bName].renewBiz += amt;
					} else {
						branchMap[bName].newBiz += amt;
					}
				});

				branchData = Object.keys(branchMap).map(k => ({
					branchName: k,
					branchCode: branchMap[k].code,
					newBusiness: branchMap[k].newBiz,
					fees: branchMap[k].fees,
					renewBusiness: branchMap[k].renewBiz,
					lateFine: branchMap[k].fine,
					total: branchMap[k].newBiz + branchMap[k].fees + branchMap[k].renewBiz + branchMap[k].fine
				}));

				renderSummary(branchData);
			},
			error: function() {
				$("#summaryTableBody").html("<tr><td colspan='8' class='text-center text-muted'>NO INVESTMENT RECORDS FOUND</td></tr>");
			}
		});
	}

	function renderSummary(data) {
		let tbody = $("#summaryTableBody");
		tbody.empty();
		if (!data || !data.length) {
			tbody.html("<tr><td colspan='8' class='text-center text-danger fw-bold'>NO INVESTMENT RECORDS FOUND</td></tr>");
			return;
		}

		data.forEach((item, idx) => {
			let row = `
				<tr>
					<td class="text-center font-monospace">${idx + 1}</td>
					<td class="fw-bold">${(item.branchCode || 'B001').toUpperCase()}</td>
					<td class="fw-semibold">${item.branchName}</td>
					<td class="text-success fw-bold">₹${item.newBusiness.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td>₹${item.fees.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td class="text-primary fw-bold">₹${item.renewBusiness.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td class="text-danger">₹${item.lateFine.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td class="fw-bold">₹${item.total.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
				</tr>
			`;
			tbody.append(row);
		});
	}

	$("#searchBtn").click(function(e) {
		e.preventDefault();
		let bVal = ($("#branch").val() || "").toUpperCase();
		let filtered = branchData.filter(d => !bVal || d.branchName.includes(bVal));
		renderSummary(filtered);
	});

	$("#resetBtn").click(function(e) {
		e.preventDefault();
		$("#branch").val("");
		$("#fDate").val("");
		$("#tDate").val("");
		renderSummary(branchData);
	});

	$("#printFullReportBtn").click(function(e) {
		e.preventDefault();
		const branch = $("#branch").val() || "ALL BRANCHES";
		const subTitle = `FILTERS: BRANCH: ${branch}`;
		ReportPrintUtil.printTable('.datatable', 'INVESTMENT SUMMARY STATEMENT', subTitle);
	});

	loadInvestmentSummary();
});
