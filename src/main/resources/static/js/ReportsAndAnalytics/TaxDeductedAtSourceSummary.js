$(document).ready(function() {
	let allTds = [];
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

	function loadTds() {
		$.ajax({
			url: "api/incentive/getIncentiveSummaryReport",
			type: "GET",
			success: function(response) {
				allTds = response && response.data ? response.data : [];
				currentFilteredData = allTds;
				renderTable(allTds);
			},
			error: function() {
				$("#tdsTableBody").html("<tr><td colspan='11' class='text-center text-danger fw-bold'>NO TDS SUMMARY RECORDS FOUND</td></tr>");
			}
		});
	}

	function renderTable(data) {
		currentFilteredData = data || [];
		let tbody = $("#tdsTableBody");
		tbody.empty();

		if (!data || !data.length) {
			tbody.html("<tr><td colspan='11' class='text-center text-danger fw-bold'>NO TDS SUMMARY RECORDS FOUND</td></tr>");
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
					<td class="text-center no-print">
						<button type="button" class="btn btn-sm btn-outline-primary printTdsCertBtn" data-index="${idx}">
							<i class="bi bi-printer"></i> PRINT
						</button>
					</td>
				</tr>
			`;
			tbody.append(row);
		});
	}

	$(document).off("click", ".printTdsCertBtn").on("click", ".printTdsCertBtn", function(e) {
		e.preventDefault();
		let idx = $(this).data("index");
		let item = (currentFilteredData && currentFilteredData[idx]) ? currentFilteredData[idx] : allTds[idx];
		if (!item) {
			alert("RECORD NOT FOUND FOR PRINTING");
			return;
		}

		let fy = $("#financialYear").val() || "2024-2025";
		let earnings = parseFloat(item.totalEarnings || 0);
		let tax = parseFloat(item.taxDeducted || 0);
		let payout = parseFloat(item.finalPayout || (earnings - tax));
		let rate = earnings > 0 ? ((tax / earnings) * 100).toFixed(1) : "5.0";

		let certHtml = `
			<table class="table table-bordered text-uppercase">
				<thead class="table-dark">
					<tr><th colspan="2" class="text-center">TAX DEDUCTED AT SOURCE (TDS) CERTIFICATE</th></tr>
				</thead>
				<tbody>
					<tr><td style="width:40%;" class="fw-bold">FINANCIAL YEAR / ASSESSMENT YEAR</td><td class="fw-bold">${fy}</td></tr>
					<tr><td class="fw-bold">ADVISOR / DEDUCTEE CODE</td><td class="fw-bold">${(item.teamCode || '-').toUpperCase()}</td></tr>
					<tr><td class="fw-bold">ADVISOR / DEDUCTEE NAME</td><td class="fw-bold">${(item.teamName || '-').toUpperCase()}</td></tr>
					<tr><td class="fw-bold">PAN NUMBER</td><td class="fw-bold text-primary">${(item.panNo || 'MFCAS1245W').toUpperCase()}</td></tr>
					<tr><td>BRANCH JURISDICTION</td><td>${(item.branchName || '-').toUpperCase()}</td></tr>
					<tr><td>SECTION UNDER I.T. ACT</td><td class="fw-bold">SECTION 194H (COMMISSION / BROKERAGE)</td></tr>
					<tr><td class="fw-bold">GROSS COMMISSION EARNINGS</td><td class="text-success fw-bold">₹${earnings.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
					<tr><td>APPLICABLE TDS RATE</td><td class="fw-bold">${rate}%</td></tr>
					<tr><td class="fw-bold text-danger">TOTAL TDS DEDUCTED & DEPOSITED</td><td class="text-danger fw-bold fs-6">₹${tax.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
					<tr><td class="fw-bold text-success fs-6">NET COMMISSION DISBURSED</td><td class="text-success fw-bold fs-5">₹${payout.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
					<tr><td>CENTRAL GOVT. CHALLAN STATUS</td><td><span class="badge bg-success">TAX CREDITED TO GOVT. A/C</span></td></tr>
				</tbody>
			</table>
			<div class="row mt-4 pt-4 text-uppercase">
				<div class="col-6 text-center">
					<div style="border-top: 1px solid #333; display: inline-block; width: 220px; padding-top: 5px; font-weight: bold; font-size: 12px;">
						TAXATION OFFICER
					</div>
				</div>
				<div class="col-6 text-center">
					<div style="border-top: 1px solid #333; display: inline-block; width: 220px; padding-top: 5px; font-weight: bold; font-size: 12px;">
						PRINCIPAL OFFICER / AUTHORIZED SIGNATORY
					</div>
				</div>
			</div>
		`;

		ReportPrintUtil.printHtml("TDS DEDUCTION CERTIFICATE", certHtml);
	});

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
