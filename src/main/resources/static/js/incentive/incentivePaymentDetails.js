// INCENTIVE PAYMENT DETAILS JAVASCRIPT
// BANK PURPOSE INCENTIVE AUDIT, STATEMENT & PAY SLIP PRINTING

let cachedDetailsList = [];

const monthsListDetails = [
	"JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
	"JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];

$(document).ready(function() {

	// 1. Populate Months
	const monthSelect = $('#searchMonth');
	monthSelect.empty().append('<option value="">-- ALL MONTHS --</option>');
	monthsListDetails.forEach(month => {
		monthSelect.append(`<option value="${month}">${month}</option>`);
	});

	// 2. Initial Load
	loadPaymentDetails('', '');

	// 3. Search Button
	$('#searchBtn').on('click', function(e) {
		e.preventDefault();
		const month = $('#searchMonth').val();
		const code = $('#searchCode').val().trim().toUpperCase();
		loadPaymentDetails(month, code);
	});

	// 4. Reset Button
	$('#resetBtn').on('click', function() {
		$('#searchMonth').val('');
		$('#searchCode').val('');
		loadPaymentDetails('', '');
	});

	// 5. Print Entire Statement Button
	$('#printStatementBtn').on('click', function() {
		printStatementSection();
	});

	// 6. Enter key in code input
	$('#searchCode').on('keypress', function(e) {
		if (e.which === 13) {
			e.preventDefault();
			$('#searchBtn').trigger('click');
		}
	});

});

// Load Payment Details from API
function loadPaymentDetails(month, code) {
	let url = 'api/incentive/getIncentivePaymentDetails';
	const params = [];
	if (month && month.trim() !== '') {
		params.push(`incentiveMonth=${encodeURIComponent(month.toUpperCase())}`);
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
				cachedDetailsList = response.data;
			} else if (Array.isArray(response)) {
				cachedDetailsList = response;
			} else {
				cachedDetailsList = [];
			}
			renderDetailsTable(cachedDetailsList);
		},
		error: function(xhr) {
			console.error('ERROR LOADING PAYMENT DETAILS:', xhr);
			$('#paymentDetailsTableBody').empty()
				.append('<tr><td colspan="16" class="text-center text-danger">ERROR LOADING INCENTIVE PAYMENT DETAILS</td></tr>');
		}
	});
}

// Render Table
function renderDetailsTable(list) {
	const tbody = $('#paymentDetailsTableBody');
	tbody.empty();

	let totalRecords = 0;
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
			totalRecords++;

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

			const payActionBtn = isPaid
				? '<button type="button" class="btn btn-sm btn-outline-success" disabled><i class="bi bi-check-circle"></i> PAID</button>'
				: `<button type="button" class="btn btn-sm btn-success" onclick="payDetailsIncentive(${item.id}, '${escapeHtml(item.teamName || item.teamCode)}', '${payout.toFixed(2)}')"><i class="bi bi-cash-stack"></i> PAY NOW</button>`;

			const printActionBtn = `<button type="button" class="btn btn-sm btn-outline-dark ms-1" onclick="viewDetailsPaySlip(${item.id})"><i class="bi bi-printer"></i> PRINT SLIP</button>`;

			const row = `
				<tr>
					<td>${index + 1}</td>
					<td><strong>${(item.teamCode || '').toUpperCase()}</strong></td>
					<td>${(item.teamName || '').toUpperCase()}</td>
					<td>${(item.designation || '-').toUpperCase()}</td>
					<td>${(item.branchName || '-').toUpperCase()}</td>
					<td><strong>${(item.incentiveMonth || '').toUpperCase()}</strong></td>
					<td class="text-end">${pSales.toFixed(2)}</td>
					<td class="text-end">${gSales.toFixed(2)}</td>
					<td class="text-end fw-bold">${oSales.toFixed(2)}</td>
					<td class="text-end text-success fw-bold">${tEarn.toFixed(2)}</td>
					<td class="text-end text-danger">${tax.toFixed(2)}</td>
					<td class="text-end text-danger">${sDed.toFixed(2)}</td>
					<td class="text-end text-success">${allow.toFixed(2)}</td>
					<td class="text-end text-primary fw-bold" style="font-size: 14px;">${payout.toFixed(2)}</td>
					<td class="text-center">${statusBadge}</td>
					<td class="text-center no-print" style="white-space: nowrap;">${payActionBtn} ${printActionBtn}</td>
				</tr>
			`;
			tbody.append(row);
		});

		$('#detailsTableSummaryFooter').show();
		$('#detailsFootPersonalSales').text(totalPersonal.toFixed(2));
		$('#detailsFootGroupSales').text(totalGroup.toFixed(2));
		$('#detailsFootOverallSales').text(totalOverall.toFixed(2));
		$('#detailsFootTotalEarnings').text(totalEarnings.toFixed(2));
		$('#detailsFootTaxDed').text(totalTax.toFixed(2));
		$('#detailsFootServiceDed').text(totalService.toFixed(2));
		$('#detailsFootExtraAllow').text(totalAllowance.toFixed(2));
		$('#detailsFootFinalPayout').text(totalPayout.toFixed(2));

	} else {
		tbody.append('<tr><td colspan="16" class="text-center">NO INCENTIVE PAYMENT DETAILS FOUND FOR SELECTED CRITERIA.</td></tr>');
		$('#detailsTableSummaryFooter').hide();
	}

	$('#totalRecordsBadge').text(`TOTAL RECORDS: ${totalRecords}`);
}

// Pay Generated Incentive directly
function payDetailsIncentive(id, memberName, amount) {
	if (confirm(`CONFIRM INCENTIVE PAYMENT OF ₹${amount} FOR ${memberName.toUpperCase()}?`)) {
		const today = new Date().toISOString().split('T')[0];
		$.ajax({
			url: `api/incentive/payIncentive?id=${id}&paymentMode=CASH&paymentDate=${today}`,
			type: 'POST',
			success: function(response) {
				alert('INCENTIVE PAYMENT MARKED AS PAID SUCCESSFULLY!');
				const month = $('#searchMonth').val();
				const code = $('#searchCode').val().trim().toUpperCase();
				loadPaymentDetails(month, code);
			},
			error: function(xhr) {
				console.error('PAYMENT ERROR:', xhr);
				alert('FAILED TO PROCESS INCENTIVE PAYMENT.');
			}
		});
	}
}

// View and Print Pay Slip Modal
function viewDetailsPaySlip(id) {
	const item = cachedDetailsList.find(x => x.id === id);
	if (!item) {
		alert('RECORD NOT FOUND!');
		return;
	}

	const pSales = parseFloat(item.personalSales || 0);
	const gSales = parseFloat(item.groupSales || 0);
	const oSales = parseFloat(item.overallSales || 0);
	const tEarn = parseFloat(item.totalEarnings || 0);
	const tax = parseFloat(item.taxDeducted || 0);
	const sDed = parseFloat(item.serviceDeduction || 0);
	const allow = parseFloat(item.extraAllowance || 0);
	const payout = parseFloat(item.finalPayout || 0);

	$('#slipTeamCode').text((item.teamCode || '').toUpperCase());
	$('#slipTeamName').text((item.teamName || '').toUpperCase());
	$('#slipDesignation').text((item.designation || '-').toUpperCase());
	$('#slipBranchName').text((item.branchName || '-').toUpperCase());
	$('#slipMonth').text((item.incentiveMonth || '').toUpperCase());
	$('#slipPeriod').text(`${(item.dateFrom || '')} TO ${(item.dateTo || '')}`);
	$('#slipStatus').text((item.status || 'GENERATED').toUpperCase());
	$('#slipGeneratedDate').text(item.generatedDate || new Date().toISOString().split('T')[0]);

	$('#slipPersonalSales').text(pSales.toFixed(2));
	$('#slipGroupSales').text(gSales.toFixed(2));
	$('#slipOverallSales').text(oSales.toFixed(2));
	$('#slipTotalEarnings').text(tEarn.toFixed(2));
	$('#slipTaxDed').text(tax.toFixed(2));
	$('#slipServiceDed').text(sDed.toFixed(2));
	$('#slipExtraAllow').text(allow.toFixed(2));
	$('#slipFinalPayout').text(payout.toFixed(2));

	if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
		try {
			const slipModal = new bootstrap.Modal(document.getElementById('paySlipModal'));
			slipModal.show();
		} catch (err) {
			$('#paySlipModal').modal('show');
		}
	} else {
		$('#paySlipModal').modal('show');
	}
}

// Print Pay Slip Area
function printPaySlipArea() {
	const printContents = document.getElementById('paySlipPrintArea').innerHTML;
	const printWindow = window.open('', '_blank', 'width=900,height=650');
	printWindow.document.write(`
		<html>
			<head>
				<title>INCENTIVE PAYMENT VOUCHER</title>
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
				<style>
					body { font-family: 'Poppins', sans-serif; padding: 25px; text-transform: uppercase; }
					table { width: 100%; border-collapse: collapse; }
					th, td { border: 1px solid #333 !important; padding: 8px; }
				</style>
			</head>
			<body onload="window.print(); window.close();">
				${printContents}
			</body>
		</html>
	`);
	printWindow.document.close();
}

// Print Entire Statement
function printStatementSection() {
	const printContents = document.getElementById('statementPrintSection').innerHTML;
	const printWindow = window.open('', '_blank', 'width=1100,height=750');
	printWindow.document.write(`
		<html>
			<head>
				<title>INCENTIVE PAYMENT DETAILS STATEMENT</title>
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
				<style>
					body { font-family: 'Poppins', sans-serif; padding: 20px; text-transform: uppercase; }
					.no-print { display: none !important; }
					table { width: 100%; border-collapse: collapse; font-size: 11px; }
					th, td { border: 1px solid #333 !important; padding: 5px; }
				</style>
			</head>
			<body onload="window.print(); window.close();">
				<div class="text-center mb-3">
					<h3 class="fw-bold">MICROFINANCE BANKING SYSTEM</h3>
					<h5>OFFICIAL INCENTIVE PAYMENT DETAILS STATEMENT</h5>
				</div>
				${printContents}
			</body>
		</html>
	`);
	printWindow.document.close();
}

function escapeHtml(text) {
	if (!text) return '';
	return text.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}
