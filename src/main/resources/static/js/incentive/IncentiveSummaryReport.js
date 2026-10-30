// INCENTIVE SUMMARY REPORT JAVASCRIPT
// BANK PURPOSE INCENTIVE PERFORMANCE AUDIT & EXECUTIVE REPORTING

let cachedReportList = [];

const monthsListReport = [
	"JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
	"JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];

$(document).ready(function() {

	// 1. Populate Months
	const monthSelect = $('#reportMonth');
	monthSelect.empty().append('<option value="">-- ALL MONTHS --</option>');
	monthsListReport.forEach(month => {
		monthSelect.append(`<option value="${month}">${month}</option>`);
	});

	// 2. Populate Branches
	loadBranches();

	// 3. Initial Load
	loadSummaryReport('', '', '');

	// 4. Find Button
	$('#findBtn').on('click', function(e) {
		e.preventDefault();
		const month = $('#reportMonth').val();
		const branch = $('#reportBranch').val();
		const code = $('#reportCode').val().trim().toUpperCase();
		loadSummaryReport(month, branch, code);
	});

	// 5. Reset Button
	$('#resetBtn').on('click', function() {
		$('#reportMonth').val('');
		$('#reportBranch').val('');
		$('#reportCode').val('');
		loadSummaryReport('', '', '');
	});

	// 6. Print Report Button
	$('#printReportBtn').on('click', function() {
		printSummaryReport();
	});

	// 7. Export CSV Button
	$('#exportCsvBtn').on('click', function() {
		exportTableToCSV('INCENTIVE_SUMMARY_REPORT.csv');
	});

	// 8. Enter Key in Code Input
	$('#reportCode').on('keypress', function(e) {
		if (e.which === 13) {
			e.preventDefault();
			$('#findBtn').trigger('click');
		}
	});

});

// Load Branches Dropdown
function loadBranches() {
	$.ajax({
		url: 'api/incentive/getAllBranchModules',
		type: 'GET',
		success: function(response) {
			const branchSelect = $('#reportBranch');
			branchSelect.empty().append('<option value="">-- ALL BRANCHES --</option>');

			let branches = [];
			if (response && response.data) {
				branches = response.data;
			} else if (Array.isArray(response)) {
				branches = response;
			}

			branches.forEach(function(b) {
				if (b && b.branchName) {
					const name = b.branchName.toUpperCase();
					branchSelect.append(`<option value="${name}">${name}</option>`);
				}
			});
		},
		error: function(err) {
			console.error('ERROR LOADING BRANCHES:', err);
		}
	});
}

// Load Summary Report and Stats
function loadSummaryReport(month, branch, code) {
	let url = 'api/incentive/getIncentiveSummaryReport';
	const params = [];
	if (month && month.trim() !== '') {
		params.push(`incentiveMonth=${encodeURIComponent(month.toUpperCase())}`);
	}
	if (branch && branch.trim() !== '' && branch !== 'ALL') {
		params.push(`branchName=${encodeURIComponent(branch.toUpperCase())}`);
	}
	if (code && code.trim() !== '') {
		params.push(`code=${encodeURIComponent(code.toUpperCase())}`);
	}
	if (params.length > 0) {
		url += '?' + params.join('&');
	}

	$.ajax({
		url: url,
		type: 'GET',
		success: function(response) {
			if (response && response.data) {
				cachedReportList = response.data;
			} else if (Array.isArray(response)) {
				cachedReportList = response;
			} else {
				cachedReportList = [];
			}
			renderReportTable(cachedReportList);
			loadSummaryStats(month, branch, code);
		},
		error: function(xhr) {
			console.error('ERROR LOADING REPORT:', xhr);
			$('#summaryReportTableBody').empty()
				.append('<tr><td colspan="16" class="text-center text-danger">ERROR LOADING INCENTIVE SUMMARY REPORT</td></tr>');
		}
	});
}

// Load Summary Statistics for KPI Cards
function loadSummaryStats(month, branch, code) {
	let url = 'api/incentive/getIncentiveSummaryStats';
	const params = [];
	if (month && month.trim() !== '') {
		params.push(`incentiveMonth=${encodeURIComponent(month.toUpperCase())}`);
	}
	if (branch && branch.trim() !== '' && branch !== 'ALL') {
		params.push(`branchName=${encodeURIComponent(branch.toUpperCase())}`);
	}
	if (code && code.trim() !== '') {
		params.push(`code=${encodeURIComponent(code.toUpperCase())}`);
	}
	if (params.length > 0) {
		url += '?' + params.join('&');
	}

	$.ajax({
		url: url,
		type: 'GET',
		success: function(response) {
			if (response && response.data) {
				const stats = response.data;
				$('#kpiMembers').text(stats.totalMembers || '0');
				$('#kpiSales').text(stats.totalOverallSales || '0.00');
				$('#kpiEarnings').text(stats.totalEarnings || '0.00');
				$('#kpiPayout').text(stats.totalPayout || '0.00');
				$('#kpiPaid').text(stats.paidCount || '0');
				$('#kpiPending').text(stats.pendingCount || '0');
			}
		},
		error: function(xhr) {
			console.error('ERROR LOADING STATS:', xhr);
		}
	});
}

// Render Report Table
function renderReportTable(list) {
	const tbody = $('#summaryReportTableBody');
	tbody.empty();

	let totalPersonal = 0.0;
	let totalGroup = 0.0;
	let totalOverall = 0.0;
	let totalEarnings = 0.0;
	let totalTax = 0.0;
	let totalService = 0.0;
	let totalAllowance = 0.0;
	let totalPayout = 0.0;

	if (list && list.length > 0) {
		list.forEach(function(item, index) {
			const pSales = parseFloat(item.personalSales || 0);
			const gSales = parseFloat(item.groupSales || 0);
			const oSales = parseFloat(item.overallSales || 0);
			const tEarn = parseFloat(item.totalEarnings || 0);
			const tax = parseFloat(item.taxDeducted || 0);
			const sDed = parseFloat(item.serviceDeduction || 0);
			const allow = parseFloat(item.extraAllowance || 0);
			const payout = parseFloat(item.finalPayout || 0);

			totalPersonal += pSales;
			totalGroup += gSales;
			totalOverall += oSales;
			totalEarnings += tEarn;
			totalTax += tax;
			totalService += sDed;
			totalAllowance += allow;
			totalPayout += payout;

			const isPaid = (item.status && item.status.toUpperCase() === 'PAID');
			const statusBadge = isPaid
				? '<span class="badge bg-success">PAID</span>'
				: '<span class="badge bg-warning text-dark">GENERATED</span>';

			const row = `
				<tr>
					<td>${index + 1}</td>
					<td><strong>${(item.incentiveMonth || '').toUpperCase()}</strong></td>
					<td>${(item.branchName || '-').toUpperCase()}</td>
					<td><strong>${(item.teamCode || '').toUpperCase()}</strong></td>
					<td>${(item.teamName || '').toUpperCase()}</td>
					<td>${(item.designation || '-').toUpperCase()}</td>
					<td class="text-end">${pSales.toFixed(2)}</td>
					<td class="text-end">${gSales.toFixed(2)}</td>
					<td class="text-end fw-bold">${oSales.toFixed(2)}</td>
					<td class="text-end text-success fw-bold">${tEarn.toFixed(2)}</td>
					<td class="text-end text-danger">${tax.toFixed(2)}</td>
					<td class="text-end text-danger">${sDed.toFixed(2)}</td>
					<td class="text-end text-success">${allow.toFixed(2)}</td>
					<td class="text-end text-primary fw-bold" style="font-size: 14px;">${payout.toFixed(2)}</td>
					<td class="text-center">${statusBadge}</td>
					<td class="text-center">${item.generatedDate || '-'}</td>
				</tr>
			`;
			tbody.append(row);
		});

		$('#summaryReportTableFooter').show();
		$('#repFootPersonalSales').text(totalPersonal.toFixed(2));
		$('#repFootGroupSales').text(totalGroup.toFixed(2));
		$('#repFootOverallSales').text(totalOverall.toFixed(2));
		$('#repFootTotalEarnings').text(totalEarnings.toFixed(2));
		$('#repFootTaxDed').text(totalTax.toFixed(2));
		$('#repFootServiceDed').text(totalService.toFixed(2));
		$('#repFootAllowance').text(totalAllowance.toFixed(2));
		$('#repFootNetPayout').text(totalPayout.toFixed(2));

	} else {
		tbody.append('<tr><td colspan="16" class="text-center">NO INCENTIVE SUMMARY DATA FOUND FOR SELECTED CRITERIA.</td></tr>');
		$('#summaryReportTableFooter').hide();
	}
}

// Print Summary Report
function printSummaryReport() {
	const printContents = document.getElementById('summaryReportPrintArea').innerHTML;
	const month = $('#reportMonth').val() || 'ALL';
	const branch = $('#reportBranch').val() || 'ALL';

	const printWindow = window.open('', '_blank', 'width=1150,height=750');
	printWindow.document.write(`
		<html>
			<head>
				<title>INCENTIVE SUMMARY REPORT</title>
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
				<style>
					body { font-family: 'Poppins', sans-serif; padding: 20px; text-transform: uppercase; }
					table { width: 100%; border-collapse: collapse; font-size: 11px; }
					th, td { border: 1px solid #333 !important; padding: 5px; }
				</style>
			</head>
			<body onload="window.print(); window.close();">
				<div class="text-center mb-3">
					<h3 class="fw-bold">MICROFINANCE BANKING SYSTEM</h3>
					<h5>OFFICIAL INCENTIVE SUMMARY REPORT</h5>
					<p class="mb-1"><small>FILTER: MONTH = ${month} | BRANCH = ${branch} | PRINT DATE = ${new Date().toLocaleDateString()}</small></p>
				</div>
				${printContents}
			</body>
		</html>
	`);
	printWindow.document.close();
}

// Export Table Data to CSV
function exportTableToCSV(filename) {
	if (!cachedReportList || cachedReportList.length === 0) {
		alert('NO DATA AVAILABLE TO EXPORT!');
		return;
	}

	const headers = [
		"S/N", "MONTH", "BRANCH", "MEMBER CODE", "MEMBER NAME", "DESIGNATION",
		"PERSONAL SALES", "GROUP SALES", "TOTAL SALES", "GROSS EARNINGS",
		"TDS", "SERVICE DEDUCTION", "ALLOWANCE", "NET PAYOUT", "STATUS", "GENERATED DATE"
	];

	const csvRows = [];
	csvRows.push(headers.join(","));

	cachedReportList.forEach((item, index) => {
		const row = [
			index + 1,
			`"${(item.incentiveMonth || '').toUpperCase()}"`,
			`"${(item.branchName || '').toUpperCase()}"`,
			`"${(item.teamCode || '').toUpperCase()}"`,
			`"${(item.teamName || '').toUpperCase()}"`,
			`"${(item.designation || '').toUpperCase()}"`,
			parseFloat(item.personalSales || 0).toFixed(2),
			parseFloat(item.groupSales || 0).toFixed(2),
			parseFloat(item.overallSales || 0).toFixed(2),
			parseFloat(item.totalEarnings || 0).toFixed(2),
			parseFloat(item.taxDeducted || 0).toFixed(2),
			parseFloat(item.serviceDeduction || 0).toFixed(2),
			parseFloat(item.extraAllowance || 0).toFixed(2),
			parseFloat(item.finalPayout || 0).toFixed(2),
			`"${(item.status || '').toUpperCase()}"`,
			`"${(item.generatedDate || '')}"`
		];
		csvRows.push(row.join(","));
	});

	const csvString = csvRows.join("\n");
	const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
	const link = document.createElement("a");
	const url = URL.createObjectURL(blob);
	link.setAttribute("href", url);
	link.setAttribute("download", filename);
	link.style.visibility = 'hidden';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
