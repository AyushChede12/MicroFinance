// =========================================================================
// CUSTOMER SAVINGS RECORD BOOK & PASSBOOK JS
// Dynamic Company Administration details & Image Logo binding
// =========================================================================

let cachedCompanyDetails = null;
let cachedCompanyLogoUrl = null;
let isFetchingTransactions = false;

$(document).ready(function () {
	// 1. Fetch & Bind Company Administration details and Logo
	loadCompanyAdministrationDetails();

	// 2. Auto-fetch account numbers on load
	const initialType = $("#accountType").val() || "savingaccount";
	if (!$("#accountType").val()) {
		$("#accountType").val("savingaccount");
	}
	fetchAccountNumbers($("#accountType").val() || "");

	$("#accountType").on("change", function () {
		const selectedType = $(this).val() || "";
		fetchAccountNumbers(selectedType);
	});
});

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
		success: function (company) {
			if (company) {
				cachedCompanyDetails = company;

				// Fetch company images using company.id
				if (company.id) {
					$.ajax({
						type: "GET",
						url: "api/preference/images/" + company.id,
						dataType: "json",
						success: function (response) {
							let images = Array.isArray(response) ? response : (response && Array.isArray(response.data) ? response.data : []);
							let logoImg = null;

							if (images && images.length > 0) {
								// Find logo by name or filename
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
						error: function (xhr) {
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
		error: function (xhr) {
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
// HELPER FUNCTIONS
// =========================================================================
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

// Fetch account numbers into dropdown
function fetchAccountNumbers(accountType) {
	$.ajax({
		type: "GET",
		url: "api/customersavings/fetchAccountNumbers",
		data: { accountType: accountType || "" },
		success: function (response) {
			const $dropdown = $("#accountNumber");
			$dropdown.empty().append('<option value="">--SELECT ACCOUNT NO--</option>');

			if (response.status === "OK" && Array.isArray(response.data)) {
				response.data.forEach(function (accNo) {
					$dropdown.append(`<option value="${accNo}">${accNo}</option>`);
				});
			}
		},
		error: function (xhr) {
			console.error("Error fetching account numbers: ", xhr.responseText);
		}
	});
}

// =========================================================================
// RECORD BOOK VIEW (Search Button)
// Shows Account Details Record Book & also loads transactions
// =========================================================================
function displayTransactionDataList() {
	let accountNumber = ($("#accountNumber").val() || "").trim();
	if (!accountNumber) {
		alert("Please select an Account Number.");
		return;
	}

	$.ajax({
		type: "GET",
		url: "api/customersavings/getDataByAccountNumber",
		data: { accountNumber: accountNumber },
		success: function (response) {
			if (response.status === "OK" && response.data) {
				const data = response.data;
				let branch = "";

				if (data.branchName != null) {
					branch = data.branchName.branchName || "";
				}

				let fullAddr = `${data.address || ''}, ${data.district || ''}, ${data.state || ''}, ${data.pinCode || ''}`.replace(/^,\s*|,\s*$/g, '');

				// Inject Record Book row
				$("#customerDetails").html(`
					<tr>
						<td>1</td>
						<td>${branch ? branch.toUpperCase() : '-'}</td>
						<td class="fw-bold">${data.accountNumber || ''}</td>
						<td>${(data.enterCustomerName || '').toUpperCase()}</td>
						<td>${data.selectByCustomer || '-'}</td>
						<td>${data.contactNumber || '-'}</td>
						<td>${(fullAddr || data.address || '-').toUpperCase()}</td>
						<td>${formatDateDisplay(data.openingDate) || '-'}</td>
						<td class="fw-bold text-success">${formatCurrency(data.balance)}</td>
					</tr>
				`);

				// Ensure company details are bound
				if (cachedCompanyDetails) {
					bindCompanyDetailsToUI(cachedCompanyDetails, cachedCompanyLogoUrl);
				} else {
					loadCompanyAdministrationDetails();
				}

				// Display ONLY Record Book section
				$("#tableSection").show();
				$('#printbtnSection').show();
				$('#passbookSection').hide();
				$('#TransactionSection').hide();
				$("#headingSection").hide();
			} else {
				alert("No data found for this account.");
				$("#customerDetails").empty();
			}
		},
		error: function (xhr) {
			alert("Error fetching account: " + (xhr.responseJSON?.error || xhr.responseText || xhr.statusText));
			$("#customerDetails").empty();
		}
	});
}

// =========================================================================
// PASSBOOK FRONT PAGE VIEW (Front Page Button)
// =========================================================================
function displaySavingfrontPage() {
	let accountNumber = ($("#accountNumber").val() || "").trim();

	if (!accountNumber) {
		alert("Please select an account number!");
		return;
	}

	$.ajax({
		type: "GET",
		url: "api/customersavings/getDataByAccountNumber",
		data: { accountNumber: accountNumber },
		success: function (response) {
			if (response.status === "OK" && response.data) {
				const data = response.data;
				let branch = "";

				if (data.branchName != null) {
					branch = data.branchName.branchName || "";
				}
				let fullAddress = `${data.address || ''}, ${data.district || ''}, ${data.state || ''}, ${data.pinCode || ''}`.replace(/^,\s*|,\s*$/g, '');

				$("#customerNo").text(data.selectByCustomer || '-');
				$("#accountNo").text(data.accountNumber || '-');
				$("#customerName").text((data.enterCustomerName || '-').toUpperCase());
				$("#familyDetails").text((data.familyDetails || '-').toUpperCase());
				$("#dateOfBirth").text(formatDateDisplay(data.dateOfBirth) || '-');
				$("#contactNo").text(data.contactNumber || '-');
				$("#emailId").text((data.emailId || '-').toUpperCase());
				$("#operationType").text((data.operationType || 'Single').toUpperCase());
				$("#aadharNo").text(data.aadharNo || '-');
				$("#address").text(fullAddress.toUpperCase() || '-');
				$("#dateOfIssue").text(formatDateDisplay(data.openingDate) || '-');
				$("#typeofaccount").text((data.typeofaccount || 'Saving Account').toUpperCase());
				$("#branchName").text(branch.toUpperCase() || '-');
				$("#upi").text(data.upi || '-');

				// Bind Company Details
				if (cachedCompanyDetails) {
					bindCompanyDetailsToUI(cachedCompanyDetails, cachedCompanyLogoUrl);
				} else {
					loadCompanyAdministrationDetails();
				}

				$("#tableSection").hide();
				$('#printbtnSection').show();
				$('#passbookSection').show();
				$("#headingSection").hide();
				$("#TransactionSection").hide();
			} else {
				alert("No account data found.");
			}
		},
		error: function (xhr) {
			alert("Error fetching data: " + (xhr.responseJSON?.error || xhr.statusText));
		}
	});
}

// =========================================================================
// HEADING VIEW (Heading Button)
// =========================================================================
function displayHeadingSA() {
	if (cachedCompanyDetails) {
		bindCompanyDetailsToUI(cachedCompanyDetails, cachedCompanyLogoUrl);
	} else {
		loadCompanyAdministrationDetails();
	}

	$("#tableSection").hide();
	$('#printbtnSection').show();
	$('#passbookSection').hide();
	$("#headingSection").show();
	$("#TransactionSection").hide();
}

// =========================================================================
// TRANSACTION LEDGER VIEW (Transaction Button)
// =========================================================================
function displaySavingTransaction() {
	if (isFetchingTransactions) return;

	let accountNumber = ($("#accountNumber").val() || "").trim();
	if (!accountNumber) {
		alert("Please select an Account Number.");
		return;
	}

	isFetchingTransactions = true;

	// 1. Fetch Account Details to populate header
	$.ajax({
		type: "GET",
		url: "api/customersavings/getDataByAccountNumber",
		data: { accountNumber: accountNumber },
		success: function (accRes) {
			if (accRes && accRes.status === "OK" && accRes.data) {
				const acc = accRes.data;
				let branch = (acc.branchName && acc.branchName.branchName) ? acc.branchName.branchName : "";

				$("#txnHdrAccountNo").text("A/C: " + (acc.accountNumber || accountNumber));
				$("#txnHdrCustName").text((acc.enterCustomerName || "-").toUpperCase());
				$("#txnHdrMemberCode").text(acc.selectByCustomer || "-");
				$("#txnHdrBranch").text(branch.toUpperCase() || "-");
				$("#txnHdrMobile").text(acc.contactNumber || "-");
				$("#txnHdrAccType").text((acc.typeofaccount || "SAVING ACCOUNT").toUpperCase());
				const bal = parseFloat(acc.balance) || 0;
				$("#txnHdrCurrentBal").text(formatCurrency(bal));
			}

			// 2. Fetch all transactions
			fetchTransactionRecords(accountNumber);
		},
		error: function () {
			// Fallback: fetch transactions anyway
			fetchTransactionRecords(accountNumber);
		}
	});
}

function fetchTransactionRecords(accountNumber) {
	$.ajax({
		type: "GET",
		url: "api/customersavings/getsavingaccountactivity",
		data: { accountNumber: accountNumber },
		success: function (response) {
			isFetchingTransactions = false;

			let data = (response && response.data && Array.isArray(response.data)) ? response.data : [];
			let tableBody = $("#tableBody1");
			tableBody.empty();

			if (data.length > 0) {
				data.forEach((item, index) => {
					let tType = (item.transactionType || "").toUpperCase();
					let amt = parseFloat(item.transactionAmount) || 0;
					let isDeposit = tType.includes("DEPOSIT") || tType.includes("CREDIT");
					let isWithdrawal = tType.includes("WITHDRAW") || tType.includes("DEBIT");

					let crText = isDeposit ? `<span class="text-success fw-bold">${formatCurrency(amt)}</span>` : '-';
					let drText = isWithdrawal ? `<span class="text-danger fw-bold">${formatCurrency(amt)}</span>` : '-';
					let balText = item.averageBalance ? formatCurrency(item.averageBalance) : '-';
					let particulars = item.comments || item.transactionFor || "Account Transaction";
					let payMode = item.payBy || "Cash";

					let row = `<tr>
						<td class="text-center">${index + 1}</td>
						<td class="text-center text-nowrap">${formatDateDisplay(item.transactionDate)}</td>
						<td class="text-start">${particulars}</td>
						<td class="text-center"><span class="badge bg-secondary">${payMode}</span></td>
						<td class="text-end">${crText}</td>
						<td class="text-end">${drText}</td>
						<td class="text-end fw-bold">${balText}</td>
					</tr>`;
					tableBody.append(row);
				});
			} else {
				tableBody.append(`<tr><td colspan="7" class="text-center text-muted p-4">No transactions found for account ${accountNumber}.</td></tr>`);
			}

			// Ensure company details are applied
			if (cachedCompanyDetails) {
				bindCompanyDetailsToUI(cachedCompanyDetails, cachedCompanyLogoUrl);
			} else {
				loadCompanyAdministrationDetails();
			}

			$('#printbtnSection').show();
			$('#passbookSection').hide();
			$("#headingSection").hide();
			$("#tableSection").hide();
			$("#TransactionSection").show();
		},
		error: function (xhr) {
			isFetchingTransactions = false;
			alert("Error fetching transactions: " + (xhr.responseJSON?.message || xhr.statusText || "Server error"));
			$('#TransactionSection').hide();
		}
	});
}

// =========================================================================
// UNIVERSAL PRINT BUTTON HANDLER (Print Passbook, Record Book, Transactions, Heading)
// =========================================================================
function printTransactionSection1() {
	let visibleSection = null;
	let title = "Print";

	if ($("#passbookSection").is(":visible")) {
		visibleSection = document.getElementById("passbookSection");
		title = "Customer Passbook Front Page";
	} else if ($("#TransactionSection").is(":visible")) {
		visibleSection = document.getElementById("TransactionSection");
		title = "Customer Savings Passbook Ledger";
	} else if ($("#headingSection").is(":visible")) {
		visibleSection = document.getElementById("headingSection");
		title = "Passbook Header";
	} else if ($("#tableSection").is(":visible")) {
		visibleSection = document.getElementById("tableSection");
		title = "Savings Record Book - Account Details";
	} else {
		alert("No section is currently visible to print.");
		return;
	}

	const companyName = (cachedCompanyDetails && (cachedCompanyDetails.companyName || cachedCompanyDetails.shortName))
		? cachedCompanyDetails.companyName.trim()
		: "MICROFINANCE";

	const printWindow = window.open('', '', 'width=1150,height=850');

	printWindow.document.write(`
		<!DOCTYPE html>
		<html>
		<head>
			<title>${title} - ${companyName}</title>
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
			<style>
				* {
					-webkit-print-color-adjust: exact !important;
					print-color-adjust: exact !important;
				}
				body {
					margin: 20px;
					font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
					color: #111;
					background: #fff;
				}
				.card {
					box-shadow: none !important;
					border: none !important;
				}
				.company-header-box {
					border-bottom: 2px solid #0d6efd !important;
					padding-bottom: 12px;
					margin-bottom: 18px;
					text-align: center;
				}
				.company-name-val {
					font-weight: 800;
					font-size: 24px;
					color: #1a237e !important;
				}
				.company-logo-img {
					max-height: 70px;
					max-width: 130px;
					object-fit: contain;
				}
				table {
					width: 100%;
					border-collapse: collapse !important;
					margin-top: 10px;
				}
				th, td {
					border: 1px solid #333 !important;
					padding: 6px 8px;
					font-size: 12px;
				}
				th {
					background-color: #212529 !important;
					color: #fff !important;
					font-weight: bold;
				}
				.badge {
					border: 1px solid #666;
					color: #000;
					background: transparent !important;
				}
				@media print {
					@page {
						margin: 10mm;
						size: auto;
					}
					body {
						margin: 0;
					}
				}
			</style>
		</head>
		<body>
			${visibleSection.outerHTML}
		</body>
		</html>
	`);

	printWindow.document.close();

	// Allow rendering & image loading before printing
	setTimeout(function () {
		printWindow.focus();
		printWindow.print();
		printWindow.close();
	}, 500);
}