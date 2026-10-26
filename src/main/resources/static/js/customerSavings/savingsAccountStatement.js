// =========================================================================
// CUSTOMER SAVINGS ACCOUNT STATEMENT JS
// Dynamic Company Administration details & Image Logo binding
// =========================================================================

let cachedCompanyDetails = null;
let cachedCompanyLogoUrl = null;

function formatCurrency(num) {
	const val = parseFloat(num) || 0;
	return '\u20B9 ' + val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDateDisplay(dateStr) {
	if (!dateStr) return '-';
	const parts = dateStr.split('-');
	if (parts.length === 3) {
		return parts[2] + '-' + parts[1] + '-' + parts[0];
	}
	return dateStr;
}

// =========================================================================
// COMPANY ADMINISTRATION & LOGO FETCHING (PreferenceController APIs)
// 1. GET api/preference/getCompanyDetails
// 2. GET api/preference/images/{companyId}
// =========================================================================
function loadCompanyAdministrationDetails(callback) {
	if (cachedCompanyDetails) {
		bindCompanyDetailsToUI(cachedCompanyDetails, cachedCompanyLogoUrl);
		if (typeof callback === "function") callback(cachedCompanyDetails, cachedCompanyLogoUrl);
		return;
	}

	$.ajax({
		type: "GET",
		url: "api/preference/getCompanyDetails",
		dataType: "json",
		success: function(company) {
			if (company) {
				cachedCompanyDetails = company;

				// Fetch company images using company.id
				if (company.id) {
					$.ajax({
						type: "GET",
						url: "api/preference/images/" + company.id,
						dataType: "json",
						success: function(response) {
							let images = Array.isArray(response) ? response : (response && Array.isArray(response.data) ? response.data : []);
							let logoImg = null;

							if (images && images.length > 0) {
								logoImg = images.find(img => img.name && String(img.name).toLowerCase().includes("logo"))
								       || images.find(img => img.originalFileName && String(img.originalFileName).toLowerCase().includes("logo"))
								       || images[0];
							}

							if (logoImg && logoImg.fileName) {
								let base = window.location.pathname.startsWith("/MicroFinance") ? "/MicroFinance" : "";
								cachedCompanyLogoUrl = base + "/Uploads/company/" + company.id + "/" + logoImg.fileName;
							} else {
								cachedCompanyLogoUrl = null;
							}

							bindCompanyDetailsToUI(cachedCompanyDetails, cachedCompanyLogoUrl);
							if (typeof callback === "function") callback(cachedCompanyDetails, cachedCompanyLogoUrl);
						},
						error: function(xhr) {
							console.warn("Could not fetch company images:", xhr.statusText);
							cachedCompanyLogoUrl = null;
							bindCompanyDetailsToUI(cachedCompanyDetails, null);
							if (typeof callback === "function") callback(cachedCompanyDetails, null);
						}
					});
				} else {
					bindCompanyDetailsToUI(cachedCompanyDetails, null);
					if (typeof callback === "function") callback(cachedCompanyDetails, null);
				}
			}
		},
		error: function(xhr) {
			console.error("Error fetching company details:", xhr.responseText || xhr.statusText);
		}
	});
}

function bindCompanyDetailsToUI(company, logoUrl) {
	if (!company) return;

	// 1. Company Name
	const companyName = (company.companyName || company.shortName || "MICROFINANCE").trim();
	$(".company-name-val").text(companyName.toUpperCase());

	// 2. Full Address
	let addrParts = [];
	if (company.address) addrParts.push(company.address.trim());
	if (company.city) addrParts.push(company.city.trim());

	let statePin = "";
	if (company.state) statePin += company.state.trim();
	if (company.pinCode) statePin += (statePin ? " (" + company.pinCode.trim() + ")" : company.pinCode.trim());
	if (statePin) addrParts.push(statePin);

	const fullAddress = addrParts.filter(Boolean).join(", ");
	if (fullAddress) {
		$(".company-address-val").text("ADDRESS : " + fullAddress.toUpperCase());
	} else {
		$(".company-address-val").text("");
	}

	// 3. Registration & Tax Details
	$(".company-cin-val").text(company.cinNo || "-");
	$(".company-gstin-val").text(company.gstin || "-");
	$(".company-pan-val").text(company.pan || "-");

	// 4. Contact & Support Details
	const helpline = company.helplineNo || company.branchManagerContactNo || "-";
	$(".company-helpline-val").text(helpline);
	$(".company-email-val").text(company.emailId ? company.emailId.toUpperCase() : "-");

	// 5. Company Logo
	if (logoUrl) {
		$(".company-logo-img").attr("src", logoUrl);
		$(".company-logo-wrapper").show();
	} else {
		$(".company-logo-wrapper").hide();
	}
}

// =========================================================================
// LOAD ACCOUNT NUMBERS
// =========================================================================
function loadStatementAccountNumbers() {
	var dropdown1 = $('#accountNumber');
	dropdown1.empty().append('<option value="">--SELECT ACCOUNT NO--</option>');

	$.ajax({
		url: "api/reports/getApprovedSavingAccount",
		type: "GET",
		success: function(response) {
			var list = (response && response.data) ? response.data : [];

			if (list.length > 0) {
				$.each(list, function(index, item) {
					if (item && item.accountNumber) {
						var label = item.accountNumber + (item.enterCustomerName ? ' - ' + item.enterCustomerName : '');
						dropdown1.append('<option value="' + item.accountNumber + '">' + label + '</option>');
					}
				});
			} else {
				fetchAccountNumbersFallback();
			}
		},
		error: function() {
			fetchAccountNumbersFallback();
		}
	});
}

function fetchAccountNumbersFallback() {
	var dropdown1 = $('#accountNumber');
	$.ajax({
		url: "api/customersavings/fetchAccountNumbers",
		type: "GET",
		success: function(response) {
			if (response && response.data && response.data.length > 0) {
				dropdown1.empty().append('<option value="">--SELECT ACCOUNT NO--</option>');
				$.each(response.data, function(index, accNo) {
					dropdown1.append('<option value="' + accNo + '">' + accNo + '</option>');
				});
			}
		}
	});
}

// =========================================================================
// DOCUMENT READY
// =========================================================================
$(document).ready(function() {
	// 1. Preload Company Details and Logo
	loadCompanyAdministrationDetails();

	// 2. Load Account Numbers
	loadStatementAccountNumbers();

	// Search Button Click
	$('#searchByAccNo').click(function(e) {
		e.preventDefault();
		searchSavingsStatement();
	});

	// Reset Button Click
	$('#resetBtn').click(function() {
		$('#accountNumber').val('');
		$('#startDate').val('');
		$('#endDate').val('');
		$('#statementCard').hide();
		$('#downloadPdfBtn').hide();
		$('#printStatementBtn').hide();
		$('#tableSavingAcc').empty();
	});

	// Download PDF Button Click
	$('#downloadPdfBtn').click(function() {
		downloadStatementPdf();
	});

	// Print Statement Button Click
	$('#printStatementBtn').click(function() {
		window.print();
	});
});

// =========================================================================
// SEARCH & RENDER SAVINGS STATEMENT
// =========================================================================
function searchSavingsStatement() {
	const accountNumber = ($('#accountNumber').val() || "").trim();
	const startDate = ($('#startDate').val() || "").trim();
	const endDate = ($('#endDate').val() || "").trim();

	if (!accountNumber) {
		alert("Please select an Account Number first.");
		return;
	}

	const searchBtn = $('#searchByAccNo');
	const origText = searchBtn.html();
	searchBtn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-1"></span> Searching...');

	// 1. Fetch Customer Account Master Details
	$.ajax({
		url: 'api/customersavings/getallbyaccountnumber',
		type: 'GET',
		data: { accountNumber: accountNumber },
		success: function(custRes) {
			if (custRes && custRes.data && custRes.data.length > 0) {
				const customer = custRes.data[0];
				let branch = "";
				if (customer.branchName) {
					branch = customer.branchName.branchName || "";
				}

				let fullAddress = customer.address || "";
				if (customer.district) fullAddress += (fullAddress ? ", " : "") + customer.district;
				if (customer.state) fullAddress += (fullAddress ? ", " : "") + customer.state;
				if (customer.pinCode) fullAddress += (fullAddress ? " - " : "") + customer.pinCode;

				$('#accountNoDisplay').text(customer.accountNumber || accountNumber);
				$('#memberName').text((customer.enterCustomerName || '').toUpperCase());
				$('#relativeDetails').text((customer.familyDetails || '-').toUpperCase());
				$('#address').text((fullAddress || '-').toUpperCase());
				$('#opDate').text(formatDateDisplay(customer.openingDate));
				$('#selectMember').text(customer.selectByCustomer || '-');
				$('#modeOfOp').text((customer.operationType || 'Single').toUpperCase());
				$('#BranchName').text((branch || 'Main Branch').toUpperCase());

				const currentBalance = parseFloat(customer.balance) || 0;

				// Ensure Company Details are bound
				if (cachedCompanyDetails) {
					bindCompanyDetailsToUI(cachedCompanyDetails, cachedCompanyLogoUrl);
				} else {
					loadCompanyAdministrationDetails();
				}

				// 2. Fetch Activity Transactions
				fetchStatementTransactions(accountNumber, startDate, endDate, currentBalance);
			} else {
				alert('No customer details found for account ' + accountNumber);
				searchBtn.prop('disabled', false).html(origText);
			}
		},
		error: function(xhr) {
			console.error("Customer fetch error:", xhr);
			alert('Error fetching customer data: ' + (xhr.responseJSON?.message || xhr.statusText));
			searchBtn.prop('disabled', false).html(origText);
		}
	});
}

function fetchStatementTransactions(accountNumber, startDate, endDate, mainAccBalance) {
	const searchBtn = $('#searchByAccNo');
	const origText = '<i class="bi bi-search me-1"></i> SEARCH';

	$.ajax({
		url: "api/customersavings/getsavingaccountactivity",
		type: "GET",
		data: { accountNumber: accountNumber },
		success: function(response) {
			searchBtn.prop('disabled', false).html(origText);

			let allTxns = (response && response.data && Array.isArray(response.data)) ? response.data : [];

			// Sort transactions chronologically by transactionDate and id
			allTxns.sort(function(a, b) {
				const d1 = new Date(a.transactionDate || 0);
				const d2 = new Date(b.transactionDate || 0);
				if (d1.getTime() !== d2.getTime()) return d1.getTime() - d2.getTime();
				return (a.id || 0) - (b.id || 0);
			});

			// Filter by Date Range if specified
			let filteredTxns = allTxns.filter(function(item) {
				if (!item.transactionDate) return true;
				if (startDate && item.transactionDate < startDate) return false;
				if (endDate && item.transactionDate > endDate) return false;
				return true;
			});

			// Calculate Totals
			let totalDeposit = 0;
			let totalWithdrawal = 0;

			filteredTxns.forEach(function(item) {
				const amt = parseFloat(item.transactionAmount) || 0;
				const type = (item.transactionType || "").toUpperCase();
				if (type === "DEPOSIT" || type === "CREDIT") {
					totalDeposit += amt;
				} else if (type === "WITHDRAW" || type === "WITHDRAWAL" || type === "DEBIT") {
					totalWithdrawal += amt;
				}
			});

			let initialOpeningBal = 0;
			if (allTxns.length > 0 && allTxns[0].averageBalance) {
				initialOpeningBal = parseFloat(allTxns[0].averageBalance) || 0;
			}
			const closingBal = mainAccBalance;

			// Update Summary Statistics
			$('#summaryOpeningBal').text(formatCurrency(initialOpeningBal));
			$('#summaryTotalDeposit').text(formatCurrency(totalDeposit));
			$('#summaryTotalWithdraw').text(formatCurrency(totalWithdrawal));
			$('#summaryClosingBal').text(formatCurrency(closingBal));

			// Period display
			let periodText = "Period: ";
			if (startDate && endDate) {
				periodText += formatDateDisplay(startDate) + " to " + formatDateDisplay(endDate);
			} else if (startDate) {
				periodText += "From " + formatDateDisplay(startDate);
			} else if (endDate) {
				periodText += "Up to " + formatDateDisplay(endDate);
			} else {
				periodText += "All Recorded Transactions";
			}
			$('#statementPeriodDisplay').text(periodText);

			// Generated timestamp
			const now = new Date();
			$('#generatedTimestamp').text(now.toLocaleString('en-IN', {
				day: '2-digit', month: '2-digit', year: 'numeric',
				hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
			}));

			// Render Table
			const tbody = $('#tableSavingAcc');
			tbody.empty();

			if (filteredTxns.length === 0) {
				tbody.html('<tr><td colspan="7" class="text-center py-4 text-muted">No transactions found for this date range.</td></tr>');
			} else {
				let runningBal = initialOpeningBal;

				filteredTxns.forEach(function(item, idx) {
					const amt = parseFloat(item.transactionAmount) || 0;
					const type = (item.transactionType || "").toUpperCase();
					let credit = 0;
					let debit = 0;

					if (type === "DEPOSIT" || type === "CREDIT") {
						credit = amt;
						runningBal += credit;
					} else if (type === "WITHDRAW" || type === "WITHDRAWAL" || type === "DEBIT") {
						debit = amt;
						runningBal -= debit;
					}

					let rowBal = item.averageBalance ? parseFloat(item.averageBalance) : runningBal;

					const rowHtml = `
						<tr>
							<td class="text-center text-muted">${idx + 1}</td>
							<td class="text-center fw-semibold">${formatDateDisplay(item.transactionDate)}</td>
							<td>${(item.comments || item.transactionFor || 'Transfer / Cash').toUpperCase()}</td>
							<td class="text-center"><span class="badge bg-light text-dark border">${(item.payBy || 'Cash').toUpperCase()}</span></td>
							<td class="text-end fw-bold text-success">${credit > 0 ? '+ ' + formatCurrency(credit) : '-'}</td>
							<td class="text-end fw-bold text-danger">${debit > 0 ? '- ' + formatCurrency(debit) : '-'}</td>
							<td class="text-end fw-bold text-primary">${formatCurrency(rowBal)}</td>
						</tr>
					`;
					tbody.append(rowHtml);
				});
			}

			// Show Statement Card & Buttons
			$('#statementCard').slideDown(250);
			$('#downloadPdfBtn').show();
			$('#printStatementBtn').show();

			// Smooth scroll down to statement
			$('html, body').animate({
				scrollTop: $("#statementCard").offset().top - 20
			}, 300);
		},
		error: function(xhr) {
			searchBtn.prop('disabled', false).html(origText);
			console.error("Activity fetch error:", xhr);
			alert("Error loading transaction activity: " + (xhr.responseJSON?.message || xhr.statusText));
		}
	});
}

// =========================================================================
// DOWNLOAD PDF
// =========================================================================
function downloadStatementPdf() {
	const accountNumber = ($('#accountNumber').val() || "").trim();
	const element = document.getElementById('printableStatement');

	if (!element) {
		alert("No statement available to download.");
		return;
	}

	const btn = $('#downloadPdfBtn');
	const origHtml = btn.html();
	btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-1"></span> Generating PDF...');

	const opt = {
		margin: [8, 8, 8, 8],
		filename: 'Savings_Statement_' + accountNumber + '.pdf',
		image: { type: 'jpeg', quality: 0.98 },
		html2canvas: {
			scale: 2,
			useCORS: true,
			logging: false
		},
		jsPDF: {
			unit: 'mm',
			format: 'a4',
			orientation: 'portrait'
		}
	};

	html2pdf().set(opt).from(element).save().then(function() {
		btn.prop('disabled', false).html(origHtml);
	}).catch(function(err) {
		console.error("PDF generation error:", err);
		btn.prop('disabled', false).html(origHtml);
		alert("Failed to generate PDF. You can also use the PRINT button to Save as PDF.");
	});
}