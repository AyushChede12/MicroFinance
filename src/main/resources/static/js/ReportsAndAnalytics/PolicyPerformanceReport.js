$(document).ready(function() {
	let allPolicies = [];
	let currentFilteredData = [];

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
				currentFilteredData = allPolicies;
				renderTable(allPolicies);
			},
			error: function() {
				$("#performanceTableBody").html("<tr><td colspan='13' class='text-center text-danger fw-bold'>NO POLICY PERFORMANCE RECORDS FOUND</td></tr>");
			}
		});
	}

	function renderTable(data) {
		currentFilteredData = data || [];
		let tbody = $("#performanceTableBody");
		tbody.empty();

		if (!data || !data.length) {
			tbody.html("<tr><td colspan='13' class='text-center text-danger fw-bold'>NO POLICY PERFORMANCE RECORDS FOUND</td></tr>");
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
					<td class="text-center no-print">
						<button type="button" class="btn btn-sm btn-outline-primary printPolicyDossierBtn" data-index="${idx}">
							<i class="bi bi-printer"></i> PRINT
						</button>
					</td>
				</tr>
			`;
			tbody.append(row);
		});
	}

	$(document).off("click", ".printPolicyDossierBtn").on("click", ".printPolicyDossierBtn", function(e) {
		e.preventDefault();
		let idx = $(this).data("index");
		let p = (currentFilteredData && currentFilteredData[idx]) ? currentFilteredData[idx] : allPolicies[idx];
		if (!p) {
			alert("RECORD NOT FOUND FOR PRINTING");
			return;
		}

		let pAmt = parseFloat(p.policyAmount || 0);
		let depAmt = parseFloat(p.depositAmount || 0);
		let mAmt = parseFloat(p.maturityAmount || 0);

		let dossierHtml = `
			<table class="table table-bordered text-uppercase">
				<thead class="table-dark">
					<tr><th colspan="2" class="text-center">POLICY ACCOUNT PERFORMANCE DOSSIER</th></tr>
				</thead>
				<tbody>
					<tr><td style="width:40%;" class="fw-bold">POLICY ACCOUNT CODE</td><td class="fw-bold">${(p.policyCode || '-').toUpperCase()}</td></tr>
					<tr><td class="fw-bold">POLICY HOLDER NAME</td><td class="fw-bold">${(p.customerName || '-').toUpperCase()}</td></tr>
					<tr><td>BRANCH CODE & NAME</td><td>${(p.branchName || '-').toUpperCase()}</td></tr>
					<tr><td>FINANCIAL ADVISOR CODE</td><td>${(p.advisorCode || p.memberId || '-').toUpperCase()}</td></tr>
					<tr><td>FINANCIAL ADVISOR NAME</td><td>${(p.advisorName || 'DIRECT').toUpperCase()}</td></tr>
					<tr><td>INVESTMENT SCHEME</td><td class="fw-bold">${(p.schemeName || '-').toUpperCase()}</td></tr>
					<tr><td>TOTAL SUM ASSURED / POLICY VALUE</td><td class="fw-bold">₹${pAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
					<tr><td class="fw-bold">TOTAL ACCUMULATED DEPOSITS</td><td class="text-primary fw-bold fs-6">₹${depAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
					<tr><td>COMMENCEMENT DATE</td><td>${(p.startDate || '-').toUpperCase()}</td></tr>
					<tr><td>SCHEDULED MATURITY DATE</td><td class="fw-bold">${(p.maturityDate || '-').toUpperCase()}</td></tr>
					<tr><td class="fw-bold text-success">PROJECTED / SETTLED MATURITY VALUE</td><td class="text-success fw-bold fs-5">₹${mAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
					<tr><td>ACCOUNT PERFORMANCE STATUS</td><td><span class="badge bg-success">${(p.status || 'ACTIVE / PERFORMING').toUpperCase()}</span></td></tr>
				</tbody>
			</table>
			<div class="row mt-4 pt-4 text-uppercase">
				<div class="col-6 text-center">
					<div style="border-top: 1px solid #333; display: inline-block; width: 220px; padding-top: 5px; font-weight: bold; font-size: 12px;">
						PORTFOLIO MANAGER
					</div>
				</div>
				<div class="col-6 text-center">
					<div style="border-top: 1px solid #333; display: inline-block; width: 220px; padding-top: 5px; font-weight: bold; font-size: 12px;">
						AUTHORIZED SIGNATORY / BRANCH HEAD
					</div>
				</div>
			</div>
		`;

		ReportPrintUtil.printHtml("POLICY ACCOUNT PERFORMANCE DOSSIER", dossierHtml);
	});

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
