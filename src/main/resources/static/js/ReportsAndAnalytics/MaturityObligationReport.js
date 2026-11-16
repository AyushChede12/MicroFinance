$(document).ready(function() {
	let allObligations = [];
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

	function loadObligations() {
		$.ajax({
			url: "api/Maturitymanagement/getApplymaturitydetails",
			type: "GET",
			success: function(response) {
				allObligations = response && response.data ? response.data : [];
				currentFilteredData = allObligations;
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
				$("#obligationTableBody").html("<tr><td colspan='11' class='text-center text-danger fw-bold'>NO MATURITY OBLIGATION RECORDS FOUND</td></tr>");
			}
		});
	}

	function renderTable(data) {
		currentFilteredData = data || [];
		let tbody = $("#obligationTableBody");
		tbody.empty();

		if (!data || !data.length) {
			tbody.html("<tr><td colspan='11' class='text-center text-danger fw-bold'>NO MATURITY OBLIGATION RECORDS FOUND</td></tr>");
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
					<td class="text-center no-print">
						<button type="button" class="btn btn-sm btn-outline-primary printObligationVoucherBtn" data-index="${idx}">
							<i class="bi bi-printer"></i> PRINT
						</button>
					</td>
				</tr>
			`;
			tbody.append(row);
		});
	}

	$(document).off("click", ".printObligationVoucherBtn").on("click", ".printObligationVoucherBtn", function(e) {
		e.preventDefault();
		let idx = $(this).data("index");
		let p = (currentFilteredData && currentFilteredData[idx]) ? currentFilteredData[idx] : allObligations[idx];
		if (!p) {
			alert("RECORD NOT FOUND FOR PRINTING");
			return;
		}

		let pAmt = parseFloat(p.policyAmount || 0);
		let depAmt = parseFloat(p.depositAmount || 0);
		let mAmt = parseFloat(p.maturityAmount || 0);

		let voucherHtml = `
			<table class="table table-bordered text-uppercase">
				<thead class="table-dark">
					<tr><th colspan="2" class="text-center">BANK MATURITY OBLIGATION STATEMENT</th></tr>
				</thead>
				<tbody>
					<tr><td style="width:40%;" class="fw-bold">POLICY CODE</td><td class="fw-bold">${(p.policyCode || '-').toUpperCase()}</td></tr>
					<tr><td class="fw-bold">APPLICANT / BENEFICIARY</td><td class="fw-bold">${(p.customerName || '-').toUpperCase()}</td></tr>
					<tr><td>BRANCH CODE & NAME</td><td>${(p.branchName || '-').toUpperCase()}</td></tr>
					<tr><td>FINANCIAL CONSULTANT</td><td>${(p.advisorCode || p.memberId || '-').toUpperCase()} - ${(p.advisorName || 'DIRECT').toUpperCase()}</td></tr>
					<tr><td>INVESTMENT SCHEME</td><td>${(p.schemeName || '-').toUpperCase()}</td></tr>
					<tr><td>INVESTED PRINCIPAL AMOUNT</td><td>₹${pAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
					<tr><td>CUMULATIVE DEPOSIT RECEIVED</td><td class="text-primary fw-bold">₹${depAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
					<tr><td>POLICY START DATE</td><td>${(p.startDate || '-').toUpperCase()}</td></tr>
					<tr><td class="fw-bold">MATURITY SETTLEMENT DATE</td><td class="fw-bold text-danger">${(p.maturityDate || '-').toUpperCase()}</td></tr>
					<tr><td class="fw-bold text-success fs-6">NET MATURITY LIABILITY PAYABLE</td><td class="text-success fw-bold fs-5">₹${mAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
					<tr><td>OBLIGATION SETTLEMENT STATUS</td><td><span class="badge bg-warning text-dark">${(p.status || 'DUE FOR DISBURSEMENT').toUpperCase()}</span></td></tr>
				</tbody>
			</table>
			<div class="row mt-4 pt-4 text-uppercase">
				<div class="col-6 text-center">
					<div style="border-top: 1px solid #333; display: inline-block; width: 220px; padding-top: 5px; font-weight: bold; font-size: 12px;">
						ACCOUNTS AUDITOR
					</div>
				</div>
				<div class="col-6 text-center">
					<div style="border-top: 1px solid #333; display: inline-block; width: 220px; padding-top: 5px; font-weight: bold; font-size: 12px;">
						BRANCH MANAGER / AUTHORIZED SIGNATORY
					</div>
				</div>
			</div>
		`;

		ReportPrintUtil.printHtml("MATURITY OBLIGATION STATEMENT", voucherHtml);
	});

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
