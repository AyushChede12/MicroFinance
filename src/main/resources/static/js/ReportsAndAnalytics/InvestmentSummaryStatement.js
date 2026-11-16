$(document).ready(function() {
	let branchData = [];
	let currentFilteredBranch = [];

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

				currentFilteredBranch = branchData;
				renderSummary(branchData);
			},
			error: function() {
				$("#summaryTableBody").html("<tr><td colspan='9' class='text-center text-muted'>NO INVESTMENT RECORDS FOUND</td></tr>");
			}
		});
	}

	function renderSummary(data) {
		let tbody = $("#summaryTableBody");
		tbody.empty();
		if (!data || !data.length) {
			tbody.html("<tr><td colspan='9' class='text-center text-danger fw-bold'>NO INVESTMENT RECORDS FOUND</td></tr>");
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
					<td class="text-center no-print">
						<button class="btn btn-sm btn-outline-primary printBranchSummaryBtn" data-index="${idx}" title="PRINT BRANCH STATEMENT">
							<i class="bi bi-printer"></i> PRINT
						</button>
					</td>
				</tr>
			`;
			tbody.append(row);
		});
	}

	$("#searchBtn").click(function(e) {
		e.preventDefault();
		let bVal = ($("#branch").val() || "").toUpperCase();
		let filtered = branchData.filter(d => !bVal || d.branchName.includes(bVal));
		currentFilteredBranch = filtered;
		renderSummary(filtered);
	});

	$("#resetBtn").click(function(e) {
		e.preventDefault();
		$("#branch").val("");
		$("#fDate").val("");
		$("#tDate").val("");
		currentFilteredBranch = branchData;
		renderSummary(branchData);
	});

	$("#printFullReportBtn").click(function(e) {
		e.preventDefault();
		const branch = $("#branch").val() || "ALL BRANCHES";
		const subTitle = `FILTERS: BRANCH: ${branch}`;
		ReportPrintUtil.printTable('.datatable', 'INVESTMENT SUMMARY STATEMENT', subTitle);
	});

	$(document).off("click", ".printBranchSummaryBtn").on("click", ".printBranchSummaryBtn", function(e) {
		e.preventDefault();
		let idx = $(this).data("index");
		let item = currentFilteredBranch[idx] || branchData[idx];
		if (!item) {
			alert("BRANCH RECORD NOT FOUND");
			return;
		}

		let html = `
			<table class="table table-bordered text-uppercase" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
				<thead class="table-dark">
					<tr>
						<th colspan="2" style="padding: 10px; font-size: 14px; text-align: center;">
							BRANCH INVESTMENT SUMMARY STATEMENT
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th style="width: 40%;">BRANCH CODE</th>
						<td><strong>${item.branchCode}</strong></td>
					</tr>
					<tr>
						<th>BRANCH NAME</th>
						<td><strong>${item.branchName}</strong></td>
					</tr>
					<tr>
						<th>NEW BUSINESS COLLECTION</th>
						<td style="color: green; font-weight: bold;">₹${item.newBusiness.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					</tr>
					<tr>
						<th>FEES & OTHER CHARGES</th>
						<td>₹${item.fees.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					</tr>
					<tr>
						<th>RENEWAL BUSINESS COLLECTION</th>
						<td style="color: blue; font-weight: bold;">₹${item.renewBusiness.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					</tr>
					<tr>
						<th>LATE FINE PENALTY</th>
						<td style="color: red;">₹${item.lateFine.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					</tr>
					<tr>
						<th>TOTAL COLLECTION AMOUNT</th>
						<td style="font-size: 16px; font-weight: bold; color: green;">₹${item.total.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					</tr>
				</tbody>
			</table>
		`;

		ReportPrintUtil.printHtml("BRANCH INVESTMENT STATEMENT", html);
	});

	loadInvestmentSummary();
});
