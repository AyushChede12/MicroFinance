$(document).ready(function() {
	let allProjections = [];

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

	function loadProjections() {
		$.ajax({
			url: "api/Maturitymanagement/getApplymaturitydetails",
			type: "GET",
			success: function(response) {
				allProjections = response && response.data ? response.data : [];
				let plans = new Set();
				allProjections.forEach(p => {
					if (p.schemeName) plans.add(p.schemeName.trim().toUpperCase());
				});
				let pSel = $("#policyName");
				pSel.html("<option value=''>ALL PLANS</option>");
				plans.forEach(pl => pSel.append(`<option value="${pl}">${pl}</option>`));
				renderTable(allProjections);
			},
			error: function() {
				$("#projectionTableBody").html("<tr><td colspan='9' class='text-center text-danger fw-bold'>NO INVESTMENT PROJECTION RECORDS FOUND</td></tr>");
			}
		});
	}

	function renderTable(data) {
		let tbody = $("#projectionTableBody");
		tbody.empty();

		if (!data || !data.length) {
			tbody.html("<tr><td colspan='9' class='text-center text-danger fw-bold'>NO INVESTMENT PROJECTION RECORDS FOUND</td></tr>");
			return;
		}

		data.forEach((p, idx) => {
			let pAmt = parseFloat(p.policyAmount || 0);
			let mAmt = parseFloat(p.maturityAmount || 0);

			let row = `
				<tr>
					<td class="text-center font-monospace">${idx + 1}</td>
					<td class="fw-bold">${(p.policyCode || '-').toUpperCase()}</td>
					<td>${(p.branchName || '-').toUpperCase()}</td>
					<td class="fw-semibold">${(p.customerName || '-').toUpperCase()}</td>
					<td>${(p.schemeName || '-').toUpperCase()}</td>
					<td class="fw-bold">₹${pAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td>${(p.startDate || '-').toUpperCase()}</td>
					<td class="fw-bold">${(p.maturityDate || '-').toUpperCase()}</td>
					<td class="text-success fw-bold">₹${mAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
				</tr>
			`;
			tbody.append(row);
		});
	}

	$("#findBtn").click(function(e) {
		e.preventDefault();
		let b = ($("#branch").val() || "").toUpperCase();
		let plan = ($("#policyName").val() || "").toUpperCase();
		let fDate = $("#fromDate").val();
		let tDate = $("#toDate").val();

		let filtered = allProjections.filter(p => {
			let bMatch = !b || (p.branchName || "").toUpperCase().includes(b);
			let pMatch = !plan || (p.schemeName || "").toUpperCase().includes(plan);
			let mDate = p.maturityDate || "";
			let matchFrom = !fDate || mDate >= fDate;
			let matchTo = !tDate || mDate <= tDate;
			return bMatch && pMatch && matchFrom && matchTo;
		});

		renderTable(filtered);
	});

	$("#resetBtn").click(function(e) {
		e.preventDefault();
		$("#branch").val("");
		$("#policyName").val("");
		$("#fromDate").val("");
		$("#toDate").val("");
		renderTable(allProjections);
	});

	$("#printFullReportBtn").click(function(e) {
		e.preventDefault();
		let b = $("#branch").val() || "ALL BRANCHES";
		let plan = $("#policyName").val() || "ALL PLANS";
		let subTitle = `FILTERS: BRANCH: ${b} | PLAN: ${plan}`;
		ReportPrintUtil.printTable('.datatable', 'INVESTMENT PROJECTION REPORT', subTitle);
	});

	loadProjections();
});
