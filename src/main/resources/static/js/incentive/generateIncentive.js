// GENERATE INCENTIVE PAYMENTS JAVASCRIPT
// BANK PURPOSE INCENTIVE CALCULATION & AUDIT VIEW

let cachedGeneratedList = [];

const monthsList = [
	"JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
	"JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];

$(document).ready(function() {

	// 1. Initialize Month Dropdowns
	const monthDropdown = $('#incentiveMonth');
	const filterDropdown = $('#tableMonthFilter');

	monthDropdown.empty().append('<option value="">-- SELECT INCENTIVE MONTH --</option>');
	filterDropdown.empty().append('<option value="">-- ALL MONTHS --</option>');

	monthsList.forEach((month, index) => {
		monthDropdown.append(`<option value="${month}">${month}</option>`);
		filterDropdown.append(`<option value="${month}">${month}</option>`);
	});

	// Auto-fill Date From and Date To when Month is selected
	monthDropdown.on('change', function() {
		const selectedMonthName = $(this).val();
		const selectedMonthIndex = monthsList.indexOf(selectedMonthName);
		const currentYear = new Date().getFullYear();

		if (selectedMonthIndex >= 0) {
			const monthNum = String(selectedMonthIndex + 1).padStart(2, '0');
			const lastDay = new Date(currentYear, selectedMonthIndex + 1, 0).getDate();
			const lastDayStr = String(lastDay).padStart(2, '0');

			$('#dateFrom').val(`${currentYear}-${monthNum}-01`);
			$('#dateTo').val(`${currentYear}-${monthNum}-${lastDayStr}`);
		} else {
			$('#dateFrom').val('');
			$('#dateTo').val('');
		}
	});

	// Default Date From and Date To
	const currentMonthIndex = new Date().getMonth();
	const defaultMonthName = monthsList[currentMonthIndex];
	monthDropdown.val(defaultMonthName).trigger('change');

	// 2. Fetch Team Members
	loadTeamMembers();

	// 3. Load Generated Payments
	loadGeneratedPayments();

	// 4. Handle Month Filter Change on Table
	filterDropdown.on('change', function() {
		const selected = $(this).val();
		renderGeneratedTable(selected);
	});

	// 5. Generate Button Click
	$('#generateBtn').on('click', function(e) {
		e.preventDefault();

		const incentiveMonth = $('#incentiveMonth').val();
		const teamCode = $('#teamCode').val();
		const dateFrom = $('#dateFrom').val();
		const dateTo = $('#dateTo').val();

		if (!incentiveMonth) {
			alert('PLEASE SELECT INCENTIVE MONTH!');
			return;
		}

		if (!dateFrom || !dateTo) {
			alert('PLEASE ENTER DATE FROM AND DATE TO!');
			return;
		}

		const btn = $(this);
		btn.prop('disabled', true).html('<i class="bi bi-hourglass-split me-1"></i> GENERATING INCENTIVES...');

		const payload = {
			teamCode: teamCode || '',
			incentiveMonth: incentiveMonth.toUpperCase(),
			dateFrom: dateFrom,
			dateTo: dateTo
		};

		$.ajax({
			url: 'api/incentive/generateIncentives',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(payload),
			success: function(response) {
				btn.prop('disabled', false).html('<i class="bi bi-gear-fill me-1"></i> GENERATE INCENTIVES');
				if (response.status === 'OK' || response.status == 200) {
					alert('INCENTIVES GENERATED SUCCESSFULLY!');
					if (response.data && response.data.length > 0) {
						cachedGeneratedList = response.data;
						$('#tableMonthFilter').val(incentiveMonth);
						renderGeneratedTable(incentiveMonth);
					} else {
						loadGeneratedPayments(incentiveMonth);
					}
				} else {
					alert('FAILED TO GENERATE INCENTIVES: ' + (response.message || '').toUpperCase());
				}
			},
			error: function(xhr) {
				btn.prop('disabled', false).html('<i class="bi bi-gear-fill me-1"></i> GENERATE INCENTIVES');
				console.error('GENERATE ERROR:', xhr);
				let msg = 'ERROR WHILE GENERATING INCENTIVE PAYMENTS.';
				if (xhr.responseJSON && xhr.responseJSON.message) {
					msg = xhr.responseJSON.message.toUpperCase();
				}
				alert(msg);
			}
		});
	});

	// 6. Refresh Button Click
	$('#refreshBtn').on('click', function() {
		loadGeneratedPayments($('#tableMonthFilter').val());
	});

});

// Load Team Members into Dropdown
function loadTeamMembers() {
	$.ajax({
		url: 'api/incentive/getAllTeamMember',
		type: 'GET',
		success: function(response) {
			const dropdown = $('#teamValue');
			dropdown.empty().append('<option value="">-- ALL TEAM MEMBERS --</option>');

			let members = [];
			if (response && response.data) {
				members = response.data;
			} else if (Array.isArray(response)) {
				members = response;
			}

			members.forEach(function(member) {
				if (member && member.teamMemberCode) {
					const code = (member.teamMemberCode || '').toUpperCase();
					const name = (member.teamMemberName || '').toUpperCase();
					const branch = member.branchName ? ` (${member.branchName.toUpperCase()})` : '';
					dropdown.append(`<option value="${code}">${code} - ${name}${branch}</option>`);
				}
			});

			dropdown.on('change', function() {
				const selectedCode = $(this).val();
				$('#teamCode').val(selectedCode);
				if (selectedCode) {
					const selectedText = $(this).find('option:selected').text();
					$('#teamName').val(selectedText);
				} else {
					$('#teamName').val('');
				}
			});
		},
		error: function(err) {
			console.error('ERROR FETCHING TEAM MEMBERS:', err);
		}
	});
}

// Load All Generated Payments
function loadGeneratedPayments(filterMonth) {
	$.ajax({
		url: 'api/incentive/getAllGeneratedPayments',
		type: 'GET',
		success: function(response) {
			if (response && response.data) {
				cachedGeneratedList = response.data;
			} else if (Array.isArray(response)) {
				cachedGeneratedList = response;
			} else {
				cachedGeneratedList = [];
			}
			renderGeneratedTable(filterMonth);
		},
		error: function(xhr) {
			console.error('ERROR LOADING GENERATED PAYMENTS:', xhr);
			$('#generatedIncentiveTableBody').empty()
				.append('<tr><td colspan="16" class="text-center text-danger">ERROR LOADING GENERATED INCENTIVES</td></tr>');
		}
	});
}

// Render Table with Filter
function renderGeneratedTable(monthFilter) {
	const tbody = $('#generatedIncentiveTableBody');
	tbody.empty();

	let filtered = cachedGeneratedList;
	if (monthFilter && monthFilter.trim() !== '') {
		filtered = cachedGeneratedList.filter(item =>
			item.incentiveMonth && item.incentiveMonth.toUpperCase() === monthFilter.toUpperCase()
		);
	}

	let totalRecords = 0;
	let totalPersonal = 0.0;
	let totalGroup = 0.0;
	let totalOverall = 0.0;
	let totalEarnings = 0.0;
	let totalTax = 0.0;
	let totalService = 0.0;
	let totalAllowance = 0.0;
	let totalPayout = 0.0;

	if (filtered && filtered.length > 0) {
		filtered.forEach(function(item, index) {
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
				: `<button type="button" class="btn btn-sm btn-success" onclick="payGeneratedIncentive(${item.id}, '${escapeHtml(item.teamName || item.teamCode)}', '${payout.toFixed(2)}')"><i class="bi bi-cash-stack"></i> PAY NOW</button>`;

			const printActionBtn = `<button type="button" class="btn btn-sm btn-outline-dark ms-1" onclick="viewPaySlip(${item.id})"><i class="bi bi-printer"></i> SLIP</button>`;

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
					<td class="text-center" style="white-space: nowrap;">${payActionBtn} ${printActionBtn}</td>
				</tr>
			`;
			tbody.append(row);
		});

		$('#tableSummaryFooter').show();
		$('#footPersonalSales').text(totalPersonal.toFixed(2));
		$('#footGroupSales').text(totalGroup.toFixed(2));
		$('#footOverallSales').text(totalOverall.toFixed(2));
		$('#footTotalEarnings').text(totalEarnings.toFixed(2));
		$('#footTaxDed').text(totalTax.toFixed(2));
		$('#footServiceDed').text(totalService.toFixed(2));
		$('#footExtraAllow').text(totalAllowance.toFixed(2));
		$('#footFinalPayout').text(totalPayout.toFixed(2));

	} else {
		tbody.append('<tr><td colspan="16" class="text-center">NO GENERATED INCENTIVES FOUND FOR SELECTED FILTER.</td></tr>');
		$('#tableSummaryFooter').hide();
	}

	// Update Top KPI Cards
	$('#totalRecordsCount').text(totalRecords);
	$('#totalBusinessAmount').text(totalOverall.toFixed(2));
	$('#totalPayoutAmount').text(totalPayout.toFixed(2));
}

// Pay Generated Incentive directly
function payGeneratedIncentive(id, memberName, amount) {
	if (confirm(`CONFIRM INCENTIVE PAYMENT OF ₹${amount} FOR ${memberName.toUpperCase()}?`)) {
		const today = new Date().toISOString().split('T')[0];
		$.ajax({
			url: `api/incentive/payIncentive?id=${id}&paymentMode=CASH&paymentDate=${today}`,
			type: 'POST',
			success: function(response) {
				alert('INCENTIVE PAYMENT MARKED AS PAID SUCCESSFULLY!');
				loadGeneratedPayments($('#tableMonthFilter').val());
			},
			error: function(xhr) {
				console.error('PAYMENT ERROR:', xhr);
				alert('FAILED TO PROCESS INCENTIVE PAYMENT.');
			}
		});
	}
}

// View and Print Pay Slip Modal
function viewPaySlip(id) {
	const item = cachedGeneratedList.find(x => x.id === id);
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

// Print Voucher Slip
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

function escapeHtml(text) {
	if (!text) return '';
	return text.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}
