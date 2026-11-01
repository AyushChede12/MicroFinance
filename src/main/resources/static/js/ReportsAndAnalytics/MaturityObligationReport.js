$(document).ready(function() {
	let allObligations = [];

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

	function loadObligations() {
		$.ajax({
			url: "api/Maturitymanagement/getApplymaturitydetails",
			type: "GET",
			success: function(response) {
				allObligations = response && response.data ? response.data : [];
				let plans = new Set();
				allObligations.forEach(p => {
					if (p.schemeName) plans.add(p.schemeName.trim().toUpperCase());
				});
				let pSel = $("#planName");
				pSel.html("<option value=''>ALL PLANS</option>");
				plans.forEach(pl => pSel.append(`<option value="${pl}">${pl}</option>`));
				renderTable(allObligations);
			},
			error: function() {
				$("#obligationTableBody").html("<tr><td colspan='10' class='text-center text-danger fw-bold'>NO MATURITY OBLIGATION RECORDS FOUND</td></tr>");
			}
		});
	}

	function renderTable(data) {
		let tbody = $("#obligationTableBody");
		tbody.empty();

		if (!data || !data.length) {
			tbody.html("<tr><td colspan='10' class='text-center text-danger fw-bold'>NO MATURITY OBLIGATION RECORDS FOUND</td></tr>");
			return;
		}

		data.forEach((p, idx) => {
			let pAmt = parseFloat(p.policyAmount || 0);
			let depAmt = parseFloat(p.depositAmount || 0);
			let mAmt = parseFloat(p.maturityAmount || 0);

			let row = `
				<tr>
					<td class="text-center font-monospace">${idx + 1}</td>
					<td class="fw-bold">${(p.policyCode || '-').toUpperCase()}</td>
					<td class="fw-semibold">${(p.customerName || '-').toUpperCase()}</td>
					<td>${(p.branchName || '-').toUpperCase()}</td>
					<td>${(p.advisorCode || p.memberId || '-').toUpperCase()}</td>
					<td class="fw-bold">${(p.maturityDate || '-').toUpperCase()}</td>
					<td>${(p.schemeName || '-').toUpperCase()}</td>
					<td>₹${pAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td class="text-primary">₹${depAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td class="text-success fw-bold">₹${mAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
				</tr>
			`;
			tbody.append(row);
		});
	}

	$("#findBtn").click(function(e) {
		e.preventDefault();
		let b = ($("#branch").val() || "").toUpperCase();
		let plan = ($("#planName").val() || "").toUpperCase();
		let fDate = $("#fromDate").val();
		let tDate = $("#toDate").val();

		let filtered = allObligations.filter(p => {
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
		$("#planName").val("");
		$("#fromDate").val("");
		$("#toDate").val("");
		renderTable(allObligations);
	});

	$("#printFullReportBtn").click(function(e) {
		e.preventDefault();
		let b = $("#branch").val() || "ALL BRANCHES";
		let plan = $("#planName").val() || "ALL PLANS";
		let subTitle = `FILTERS: BRANCH: ${b} | PLAN: ${plan}`;
		ReportPrintUtil.printTable('.datatable', 'MATURITY OBLIGATION REPORT', subTitle);
	});

	loadObligations();
});
