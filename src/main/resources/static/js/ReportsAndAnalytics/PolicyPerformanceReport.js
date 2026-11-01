$(document).ready(function() {
	let allPolicies = [];

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

	function loadPerformance() {
		$.ajax({
			url: "api/Maturitymanagement/getApplymaturitydetails",
			type: "GET",
			success: function(response) {
				allPolicies = response && response.data ? response.data : [];
				renderTable(allPolicies);
			},
			error: function() {
				$("#performanceTableBody").html("<tr><td colspan='12' class='text-center text-danger fw-bold'>NO POLICY PERFORMANCE RECORDS FOUND</td></tr>");
			}
		});
	}

	function renderTable(data) {
		let tbody = $("#performanceTableBody");
		tbody.empty();

		if (!data || !data.length) {
			tbody.html("<tr><td colspan='12' class='text-center text-danger fw-bold'>NO POLICY PERFORMANCE RECORDS FOUND</td></tr>");
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
					<td>${(p.advisorName || 'DIRECT').toUpperCase()}</td>
					<td>${(p.schemeName || '-').toUpperCase()}</td>
					<td class="fw-bold">₹${pAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td class="text-primary fw-bold">₹${depAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td>${(p.maturityDate || '-').toUpperCase()}</td>
					<td class="text-success fw-bold">₹${mAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td><span class="badge bg-success">${(p.status || 'ACTIVE / PERFORMING').toUpperCase()}</span></td>
				</tr>
			`;
			tbody.append(row);
		});
	}

	$("#findBtn").click(function(e) {
		e.preventDefault();
		let code = ($("#policyNo").val() || "").trim().toUpperCase();
		let b = ($("#branch").val() || "").toUpperCase();

		let filtered = allPolicies.filter(p => {
			let cMatch = !code || (p.policyCode || "").toUpperCase().includes(code);
			let bMatch = !b || (p.branchName || "").toUpperCase().includes(b);
			return cMatch && bMatch;
		});

		renderTable(filtered);
	});

	$("#resetBtn").click(function(e) {
		e.preventDefault();
		$("#policyNo").val("");
		$("#branch").val("");
		renderTable(allPolicies);
	});

	$("#printFullReportBtn").click(function(e) {
		e.preventDefault();
		let code = $("#policyNo").val() || "ALL POLICIES";
		let b = $("#branch").val() || "ALL BRANCHES";
		let subTitle = `FILTERS: POLICY: ${code} | BRANCH: ${b}`;
		ReportPrintUtil.printTable('.datatable', 'POLICY PERFORMANCE REPORT', subTitle);
	});

	loadPerformance();
});
