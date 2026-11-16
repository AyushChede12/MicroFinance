$(document).ready(function() {
	let allProjections = [];
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

	function loadProjections() {
		$.ajax({
			url: "api/Maturitymanagement/getApplymaturitydetails",
			type: "GET",
			success: function(response) {
				allProjections = response && response.data ? response.data : [];
				currentFilteredData = allProjections;
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
				$("#projectionTableBody").html("<tr><td colspan='10' class='text-center text-danger fw-bold'>NO INVESTMENT PROJECTION RECORDS FOUND</td></tr>");
			}
		});
	}

	function renderTable(data) {
		currentFilteredData = data || [];
		let tbody = $("#projectionTableBody");
		tbody.empty();

		if (!data || !data.length) {
			tbody.html("<tr><td colspan='10' class='text-center text-danger fw-bold'>NO INVESTMENT PROJECTION RECORDS FOUND</td></tr>");
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
					<td class="text-center no-print">
						<button type="button" class="btn btn-sm btn-outline-primary printProjectionCertBtn" data-index="${idx}">
							<i class="bi bi-printer"></i> PRINT
						</button>
					</td>
				</tr>
			`;
			tbody.append(row);
		});
	}

	$(document).off("click", ".printProjectionCertBtn").on("click", ".printProjectionCertBtn", function(e) {
		e.preventDefault();
		let idx = $(this).data("index");
		let p = (currentFilteredData && currentFilteredData[idx]) ? currentFilteredData[idx] : allProjections[idx];
		if (!p) {
			alert("RECORD NOT FOUND FOR PRINTING");
			return;
		}

		let pAmt = parseFloat(p.policyAmount || 0);
		let depAmt = parseFloat(p.depositAmount || 0);
		let mAmt = parseFloat(p.maturityAmount || 0);
		let roi = p.interestRate || p.roi || "8.50";

		let voucherHtml = `
			<table class="table table-bordered text-uppercase">
				<thead class="table-dark">
					<tr><th colspan="2" class="text-center">INVESTMENT PROJECTION CERTIFICATE</th></tr>
				</thead>
				<tbody>
					<tr><td style="width:40%;" class="fw-bold">POLICY CODE / NUMBER</td><td class="fw-bold">${(p.policyCode || '-').toUpperCase()}</td></tr>
					<tr><td class="fw-bold">INVESTOR / MEMBER NAME</td><td class="fw-bold">${(p.customerName || '-').toUpperCase()}</td></tr>
					<tr><td>BRANCH OFFICE</td><td>${(p.branchName || '-').toUpperCase()}</td></tr>
					<tr><td>FINANCIAL ADVISOR</td><td>${(p.advisorCode || p.memberId || '-').toUpperCase()} - ${(p.advisorName || 'DIRECT').toUpperCase()}</td></tr>
					<tr><td>SCHEME / PLAN NAME</td><td class="fw-bold">${(p.schemeName || '-').toUpperCase()}</td></tr>
					<tr><td>SANCTIONED POLICY AMOUNT</td><td class="fw-bold">₹${pAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
					<tr><td>CURRENT TOTAL DEPOSIT</td><td class="text-primary fw-bold">₹${depAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
					<tr><td>INVESTMENT START DATE</td><td>${(p.startDate || '-').toUpperCase()}</td></tr>
					<tr><td>PROJECTED MATURITY DATE</td><td class="fw-bold">${(p.maturityDate || '-').toUpperCase()}</td></tr>
					<tr><td>PROJECTED RATE OF RETURN</td><td>${roi}% P.A.</td></tr>
					<tr><td class="fw-bold text-success">PROJECTED MATURITY VALUE</td><td class="text-success fw-bold fs-5">₹${mAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
					<tr><td>PROJECTION STATUS</td><td><span class="badge bg-success">${(p.status || 'ACTIVE - REGULAR').toUpperCase()}</span></td></tr>
				</tbody>
			</table>
			<div class="row mt-4 pt-4 text-uppercase">
				<div class="col-6 text-center">
					<div style="border-top: 1px solid #333; display: inline-block; width: 220px; padding-top: 5px; font-weight: bold; font-size: 12px;">
						ACCOUNTANT / CASHIER
					</div>
				</div>
				<div class="col-6 text-center">
					<div style="border-top: 1px solid #333; display: inline-block; width: 220px; padding-top: 5px; font-weight: bold; font-size: 12px;">
						BRANCH MANAGER / AUTHORIZED SIGNATORY
					</div>
				</div>
			</div>
		`;

		ReportPrintUtil.printHtml("INVESTMENT PROJECTION CERTIFICATE", voucherHtml);
	});

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
