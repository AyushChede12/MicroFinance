$(document).ready(function() {

	let accountsData = [];

	/* =============================================
	   HELPER FUNCTIONS
	   ============================================= */
	function parseFlexibleDate(dateStr) {
		if (!dateStr || typeof dateStr !== 'string') return null;
		dateStr = dateStr.trim();
		if (!dateStr) return null;

		// Format: YYYY-MM-DD
		if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
			const parts = dateStr.split('-');
			return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
		}
		// Format: DD-MM-YYYY
		if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
			const parts = dateStr.split('-');
			return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
		}
		// Format: DD/MM/YYYY
		if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
			const parts = dateStr.split('/');
			return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
		}

		const parsed = new Date(dateStr);
		return isNaN(parsed.getTime()) ? null : parsed;
	}

	function formatDateToDisplay(dateObj) {
		if (!dateObj || isNaN(dateObj.getTime())) return '-';
		const d = String(dateObj.getDate()).padStart(2, '0');
		const m = String(dateObj.getMonth() + 1).padStart(2, '0');
		const y = dateObj.getFullYear();
		return `${d}-${m}-${y}`;
	}

	function formatDateToIso(dateObj) {
		if (!dateObj || isNaN(dateObj.getTime())) return '';
		const y = dateObj.getFullYear();
		const m = String(dateObj.getMonth() + 1).padStart(2, '0');
		const d = String(dateObj.getDate()).padStart(2, '0');
		return `${y}-${m}-${d}`;
	}

	function formatCurrency(num) {
		const val = parseFloat(num) || 0;
		return val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	}

	function addMonths(dateObj, months) {
		if (!dateObj || isNaN(dateObj.getTime())) return new Date();
		const d = new Date(dateObj.getTime());
		const targetDay = d.getDate();
		d.setDate(1);
		d.setMonth(d.getMonth() + months);
		const maxDaysInTargetMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
		d.setDate(Math.min(targetDay, maxDaysInTargetMonth));
		return d;
	}

	function daysBetween(d1, d2) {
		const t1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
		const t2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()).getTime();
		return Math.round((t2 - t1) / (1000 * 60 * 60 * 24));
	}

	/* =============================================
	   CALCULATE QUARTERLY INTEREST PER CUSTOMER'S JOINING DATE
	   ============================================= */
	function calculateCustomerCycle(acc) {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		// Fixed Quarterly: 3 months
		const cycleMonths = 3;

		// Determine cycle start date:
		// Starts from lastInterestTransferDate if previous transfer exists,
		// otherwise starts from customer's individual account opening / joining date!
		let cycleStartDate = null;
		if (acc.lastInterestTransferDate) {
			cycleStartDate = parseFlexibleDate(acc.lastInterestTransferDate);
		}
		if (!cycleStartDate && acc.openingDate) {
			cycleStartDate = parseFlexibleDate(acc.openingDate);
		}
		if (!cycleStartDate) {
			cycleStartDate = addMonths(today, -cycleMonths);
		}
		cycleStartDate.setHours(0, 0, 0, 0);

		// Customer's individual quarterly due date:
		// e.g. Niraj (1 July 2026) -> 1 Oct 2026
		// Rahul (3 July 2026) -> 3 Oct 2026
		const cycleDueDate = addMonths(cycleStartDate, cycleMonths);
		cycleDueDate.setHours(0, 0, 0, 0);

		// Check if due
		const isDue = today.getTime() >= cycleDueDate.getTime();
		const daysUntilDue = Math.ceil((cycleDueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

		let days = daysBetween(cycleStartDate, cycleDueDate);
		if (days <= 0) days = 90;

		// Interest Calculation: (Balance * Rate * Days) / 36500
		const balance = parseFloat(acc.balance) || 0;
		const rate = (acc.interestPercent !== undefined && acc.interestPercent !== null && acc.interestPercent !== '')
			? parseFloat(acc.interestPercent) || 0
			: 0;

		let interestAmount = 0;
		if (balance > 0 && rate > 0 && days > 0) {
			interestAmount = (balance * rate * days) / 36500;
			interestAmount = Math.round(interestAmount * 100) / 100;
		}

		const newBalance = Math.round((balance + interestAmount) * 100) / 100;

		return {
			cycleStartDate: cycleStartDate,
			cycleDueDate: cycleDueDate,
			fromDateIso: formatDateToIso(cycleStartDate),
			toDateIso: formatDateToIso(cycleDueDate),
			fromDateDisplay: formatDateToDisplay(cycleStartDate),
			toDateDisplay: formatDateToDisplay(cycleDueDate),
			cycleDueDateDisplay: formatDateToDisplay(cycleDueDate),
			isDue: isDue,
			daysUntilDue: daysUntilDue,
			days: days,
			balance: balance,
			rate: rate,
			interestAmount: interestAmount,
			newBalance: newBalance
		};
	}

	/* =============================================
	   LOAD DATA FROM API
	   ============================================= */
	function loadCustomerTable() {
		$('#interestCustomerBody').html(
			'<tr><td colspan="13" class="text-center py-4">' +
			'<span class="spinner-border spinner-border-sm me-2"></span>Loading customer accounts...</td></tr>'
		);
		$('#transferInterestBtn').prop('disabled', true);
		$('#selectAll').prop('checked', true);

		$.ajax({
			url: "api/customersavings/getAllSavingAccountData",
			type: "GET",
			dataType: "json",
			success: function(response) {
				accountsData = response.data || [];
				renderTable();
			},
			error: function(xhr) {
				console.error("Failed to load customers:", xhr.responseText);
				$('#interestCustomerBody').html(
					'<tr><td colspan="13" class="text-center py-4 text-danger">' +
					'<i class="bi bi-exclamation-triangle me-2"></i>Failed to load customer accounts. Please try again.</td></tr>'
				);
			}
		});
	}

	/* =============================================
	   RENDER TABLE
	   ============================================= */
	function renderTable() {
		const tbody = $('#interestCustomerBody');
		tbody.empty();

		if (accountsData.length === 0) {
			tbody.html('<tr><td colspan="13" class="text-center py-4 text-muted">No saving accounts found.</td></tr>');
			updateSummaryStats();
			return;
		}

		let rowsHtml = '';

		accountsData.forEach(function(acc, i) {
			try {
				const calc = calculateCustomerCycle(acc);

				const joiningDisplay = acc.openingDate
					? formatDateToDisplay(parseFlexibleDate(acc.openingDate))
					: '<span class="text-muted">N/A</span>';

				const statusBadge = calc.isDue
					? `<span class="badge-due"><i class="bi bi-check-circle-fill me-1"></i>DUE</span>`
					: `<span class="badge-upcoming" title="Due in ${calc.daysUntilDue} days"><i class="bi bi-clock me-1"></i>Due in ${calc.daysUntilDue}d</span>`;

				rowsHtml += `
					<tr id="row-${i}" data-index="${i}">
						<td class="text-center">
							<input type="checkbox" class="rowCheckbox" data-index="${i}" value="${acc.accountNumber || ''}" checked />
						</td>
						<td class="text-center text-muted">${i + 1}</td>
						<td><strong>${acc.accountNumber || '-'}</strong></td>
						<td>${acc.enterCustomerName || '-'}</td>
						<td class="text-center fw-semibold text-primary">${joiningDisplay}</td>
						<td class="text-center">
							<span class="badge-cycle">${calc.fromDateDisplay} &rarr; ${calc.toDateDisplay}</span>
						</td>
						<td class="text-center fw-bold">${calc.cycleDueDateDisplay}</td>
						<td class="text-end fw-bold">₹ ${formatCurrency(calc.balance)}</td>
						<td class="text-center">
							<input type="number" step="0.1" min="0" max="100" class="interest-rate-input form-control form-control-sm d-inline-block"
								data-index="${i}" value="${calc.rate}" title="Customer interest % (editable)" /> %
						</td>
						<td class="text-center"><span class="badge bg-secondary">${calc.days} days</span></td>
						<td class="text-end highlight-interest">+ ₹ ${formatCurrency(calc.interestAmount)}</td>
						<td class="text-end highlight-newbalance">₹ ${formatCurrency(calc.newBalance)}</td>
						<td class="text-center">${statusBadge}</td>
					</tr>
				`;
			} catch (err) {
				console.error("Error rendering account row " + i, err);
			}
		});

		tbody.html(rowsHtml);
		updateSummaryStats();
	}

	/* =============================================
	   UPDATE SUMMARY STATS
	   ============================================= */
	function updateSummaryStats() {
		const totalAccounts = accountsData.length;
		$('#statTotalAccounts').text(totalAccounts);

		let selectedCount = 0;
		let selectedBalance = 0;
		let totalInterest = 0;

		$('.rowCheckbox:checked').each(function() {
			selectedCount++;
			const idx = $(this).data('index');
			const acc = accountsData[idx];
			if (acc) {
				const calc = calculateCustomerCycle(acc);
				selectedBalance += calc.balance;
				totalInterest += calc.interestAmount;
			}
		});

		$('#statSelectedAccounts').text(selectedCount);
		$('#selectedCount').text(selectedCount);
		$('#statSelectedBalance').text('₹ ' + formatCurrency(selectedBalance));
		$('#statTotalInterest').text('₹ ' + formatCurrency(totalInterest));

		$('#transferInterestBtn').prop('disabled', selectedCount === 0);

		const visibleCheckboxes = $('.rowCheckbox').length;
		$('#selectAll').prop('checked', visibleCheckboxes > 0 && selectedCount === visibleCheckboxes);
	}

	/* =============================================
	   EVENT LISTENERS
	   ============================================= */
	$('#refreshBtn').on('click', function() {
		loadCustomerTable();
	});

	$('#selectAll').on('change', function() {
		const isChecked = $(this).is(':checked');
		$('.rowCheckbox').prop('checked', isChecked);
		updateSummaryStats();
	});

	$(document).on('change', '.rowCheckbox', function() {
		updateSummaryStats();
	});

	// Inline Interest Rate change
	$(document).on('input change', '.interest-rate-input', function() {
		const idx = $(this).data('index');
		const newRate = parseFloat($(this).val()) || 0;
		if (accountsData[idx]) {
			accountsData[idx].interestPercent = newRate;
			const calc = calculateCustomerCycle(accountsData[idx]);

			const row = $(`#row-${idx}`);
			row.find('.highlight-interest').text('+ ₹ ' + formatCurrency(calc.interestAmount));
			row.find('.highlight-newbalance').text('₹ ' + formatCurrency(calc.newBalance));

			updateSummaryStats();
		}
	});

	/* =============================================
	   TRANSFER INTEREST: BATCH AT ONE TIME (BUTTON AT BOTTOM)
	   ============================================= */
	$('#transferInterestBtn').on('click', function() {
		const selectedCheckboxes = $('.rowCheckbox:checked');
		if (selectedCheckboxes.length === 0) {
			alert("Please select at least one customer account to transfer interest.");
			return;
		}

		const payloadList = [];
		let totalInterest = 0;

		selectedCheckboxes.each(function() {
			const idx = $(this).data('index');
			const acc = accountsData[idx];
			if (acc) {
				const calc = calculateCustomerCycle(acc);
				totalInterest += calc.interestAmount;
				payloadList.push({
					accountNumber: acc.accountNumber,
					customerName: acc.enterCustomerName,
					accountType: acc.typeofaccount || 'savingaccount',
					currentBalance: calc.balance,
					interestType: 'quarterly',
					interestRate: calc.rate,
					fromDate: calc.fromDateIso,
					toDate: calc.toDateIso,
					totalDays: calc.days,
					interestAmount: calc.interestAmount,
					newBalance: calc.newBalance
				});
			}
		});

		const confirmMsg = `Confirm Quarterly Interest Transfer:\n\n` +
			`Accounts to Credit: ${payloadList.length}\n` +
			`Total Interest to Credit: ₹${formatCurrency(totalInterest)}\n\n` +
			`Each customer's interest is calculated quarterly according to their individual Account Opening / Joining Date.\n\n` +
			`Proceed with transferring interest now?`;

		if (!confirm(confirmMsg)) return;

		const btn = $('#transferInterestBtn');
		const origText = btn.html();
		btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2"></span> Processing Transfer...');

		$.ajax({
			url: "api/customersavings/transferInterestBatch",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(payloadList),
			success: function(res) {
				const data = res.data || {};
				const successCount = data.successCount || 0;
				const failedCount = data.failedCount || 0;
				const credited = data.totalInterestTransferred || totalInterest;

				let alertMsg = `🎉 Quarterly Interest Transfer Completed!\n\n` +
					`Successfully Credited: ${successCount} accounts\n` +
					`Total Interest Credited: ₹${formatCurrency(credited)}\n`;

				if (failedCount > 0) {
					alertMsg += `Skipped: ${failedCount} accounts (interest already transferred for this quarterly cycle)\n`;
					if (data.errors && data.errors.length > 0) {
						alertMsg += `\nDetails:\n` + data.errors.slice(0, 5).join('\n');
					}
				}

				alert(alertMsg);
				btn.prop('disabled', false).html(origText);
				loadCustomerTable();
			},
			error: function(xhr) {
				console.error("Batch transfer failed:", xhr.responseText);
				const errorMsg = xhr.responseJSON?.message || "Failed to complete interest transfer.";
				alert(`❌ Error: ${errorMsg}`);
				btn.prop('disabled', false).html(origText);
			}
		});
	});

	// Initial load
	loadCustomerTable();

});