$(document).ready(function () {
	// 1. Preload Company Details via ReportPrintUtil
	ReportPrintUtil.getCompanyDetails(function (c) {
		console.log("COMPANY DETAILS LOADED FOR INCENTIVE SUMMARY:", c.companyName);
	});

	// 2. Load Branch dropdown
	$.ajax({
		url: "api/preference/getAllBranchModule",
		type: "GET",
		success: function (response) {
			const branchDropdown = $('#branch');
			branchDropdown.empty().append('<option value="">ALL BRANCHES</option>');

			let list = [];
			if (response && response.data && Array.isArray(response.data)) {
				list = response.data;
			} else if (Array.isArray(response)) {
				list = response;
			}

			list.forEach(function (b) {
				if (b && b.branchName) {
					const bName = b.branchName.toUpperCase();
					branchDropdown.append(`<option value="${bName}">${bName}</option>`);
				}
			});
		},
		error: function (xhr) {
			console.error("FAILED TO LOAD BRANCHES:", xhr);
		}
	});

	// Default Dates (First day of month to today)
	const now = new Date();
	const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
	const today = now.toISOString().split('T')[0];
	$('#fDate').val(firstDay);
	$('#tDate').val(today);

	// Initial load
	loadSummaryData();

	// Find button
	$('#findBtn').click(function () {
		const branch = $('#branch').val();
		loadSummaryData(branch);
	});

	// Reset button
	$('#resetBtn').click(function () {
		$('#branch').val('');
		$('#fDate').val(firstDay);
		$('#tDate').val(today);
		loadSummaryData();
	});

	// Print button
	$('#printBtn').click(function () {
		printReport();
	});

	// Row Print Button Click
	$(document).off("click", ".printIncentiveBtn").on("click", ".printIncentiveBtn", function(e) {
		e.preventDefault();
		let idx = $(this).data("index");
		let dataList = window.cachedSummaryList || [];
		let item = dataList[idx];
		if (!item) {
			alert("INCENTIVE RECORD NOT FOUND");
			return;
		}

		const earnings = parseFloat(item.totalEarnings) || 0;
		const tax = parseFloat(item.taxDeducted) || 0;
		const service = parseFloat(item.serviceDeduction) || 0;
		const totalDed = tax + service;
		const payout = parseFloat(item.finalPayout) || (earnings - totalDed);

		let html = `
			<table class="table table-bordered text-uppercase" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
				<thead class="table-dark">
					<tr>
						<th colspan="4" style="padding: 10px; font-size: 14px; text-align: center;">
							FINANCIAL CONSULTANT INCENTIVE PAY VOUCHER
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th style="width: 25%;">ADVISOR CODE</th>
						<td style="width: 25%; font-weight: bold; color: #002147;">${(item.teamCode || "-").toUpperCase()}</td>
						<th style="width: 25%;">INCENTIVE MONTH</th>
						<td style="width: 25%; font-weight: bold;">${(item.incentiveMonth || "").toUpperCase()}</td>
					</tr>
					<tr>
						<th>ADVISOR NAME</th>
						<td><strong>${(item.teamName || "").toUpperCase()}</strong></td>
						<th>DESIGNATION</th>
						<td>${(item.designation || "-").toUpperCase()}</td>
					</tr>
					<tr>
						<th>BRANCH</th>
						<td>${(item.branchName || "-").toUpperCase()}</td>
						<th>STATUS</th>
						<td><span class="badge bg-success">${(item.status || "PAID").toUpperCase()}</span></td>
					</tr>
					<tr>
						<th>TOTAL GROSS EARNINGS</th>
						<td style="font-weight: bold; color: green;">₹${earnings.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
						<th>TDS DEDUCTION</th>
						<td style="color: red;">₹${tax.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					</tr>
					<tr>
						<th>SERVICE CHARGES</th>
						<td style="color: red;">₹${service.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
						<th>TOTAL DEDUCTIONS</th>
						<td style="font-weight: bold; color: red;">₹${totalDed.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					</tr>
					<tr>
						<th>NET PAYOUT AMOUNT</th>
						<td colspan="3" style="font-size: 16px; font-weight: bold; color: green;">₹${payout.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					</tr>
				</tbody>
			</table>
		`;

		ReportPrintUtil.printHtml("ADVISOR INCENTIVE PAY VOUCHER", html);
	});

});

function loadSummaryData(branch) {
	let url = "api/incentive/getIncentiveSummaryReport";
	if (branch) {
		url += "?branchName=" + encodeURIComponent(branch);
	}

	$.ajax({
		url: url,
		type: "GET",
		success: function (response) {
			const data = (response && response.data) ? response.data : [];
			window.cachedSummaryList = data;
			renderTable(data);
		},
		error: function (xhr) {
			console.error("FAILED TO LOAD INCENTIVE SUMMARY:", xhr);
			$("#summaryTableBody").empty().append("<tr><td colspan='11' class='text-center text-danger fw-bold'>ERROR LOADING INCENTIVE SUMMARY</td></tr>");
		}
	});
}

function renderTable(dataList) {
	const tbody = $("#summaryTableBody");
	tbody.empty();

	if (!dataList || dataList.length === 0) {
		tbody.append("<tr><td colspan='11' class='text-center text-danger fw-bold'>NO INCENTIVE RECORDS FOUND</td></tr>");
		return;
	}

	$.each(dataList, function (index, item) {
		const statusBadge = (item.status === "PAID")
			? `<span class="badge bg-success">PAID</span>`
			: `<span class="badge bg-warning text-dark">GENERATED</span>`;

		const earnings = parseFloat(item.totalEarnings) || 0;
		const tax = parseFloat(item.taxDeducted) || 0;
		const service = parseFloat(item.serviceDeduction) || 0;
		const totalDed = tax + service;
		const payout = parseFloat(item.finalPayout) || 0;

		const row = `
			<tr>
				<td class="text-center font-monospace">${index + 1}</td>
				<td>${(item.branchName || "-").toUpperCase()}</td>
				<td class="fw-bold">${(item.incentiveMonth || "").toUpperCase()}</td>
				<td>${(item.teamCode || "").toUpperCase()}</td>
				<td class="fw-semibold">${(item.teamName || "").toUpperCase()}</td>
				<td>${(item.designation || "-").toUpperCase()}</td>
				<td class="text-success fw-bold">₹${earnings.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
				<td class="text-danger">₹${totalDed.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
				<td class="fw-bold">₹${payout.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
				<td>${statusBadge}</td>
				<td class="text-center no-print">
					<button class="btn btn-sm btn-outline-primary printIncentiveBtn" data-index="${index}" title="PRINT VOUCHER">
						<i class="bi bi-printer"></i> PRINT
					</button>
				</td>
			</tr>
		`;
		tbody.append(row);
	});
}

function printReport() {
	const branch = $('#branch').val() || 'ALL BRANCHES';
	const fDate = $('#fDate').val() || 'START';
	const tDate = $('#tDate').val() || 'TODAY';
	const subTitle = `FILTERS: BRANCH: ${branch} | PERIOD: ${fDate} TO ${tDate}`;
	ReportPrintUtil.printTable('.datatable', 'INCENTIVE PAYMENT SUMMARY REPORT', subTitle);
}
