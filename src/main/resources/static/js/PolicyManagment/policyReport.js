$(document).ready(function() {
	const $policyDropdown = $('#findByPolicyNumber');

	// Clear and set default option
	$policyDropdown.empty().append('<option value="">SELECT POLICY CODE</option>');

	// Fetch approved policy data
	fetchApprovedPolicies();

	function fetchApprovedPolicies() {
		$.ajax({
			url: 'api/Policymangment/getApprovedPolicies',
			method: 'GET',
			success: function(response) {
				if (response.status === 'OK' && Array.isArray(response.data)) {
					response.data.forEach(item => {
						const policyNumber = (item.policyCode || item.policyNumber || '').trim();
						const clientName = (item.clientName || item.customerName.toUpperCase() || 'Unknown').trim();


						if (policyNumber) {
							$policyDropdown.append(
								`<option value="${policyNumber}">
                                    ${policyNumber} - ${clientName}
                                </option>`
							);
						}
					});
				} else {
					console.warn('No approved policies found.');
				}
			},
			error: function(xhr, status, error) {
				console.error('Error fetching approved policies:', error);
			}
		});
	}
});


function toggleTransaction() {

	const policyCode = document.getElementById("findByPolicyNumber").value;

	if (!policyCode) {

		alert("Please select a Policy Code first.");

		return;
	}

	fetch(`api/Policymangment/getPolicyByPolicyCode?policyCode=${policyCode}`)
		.then(response => {

			if (!response.ok) {

				throw new Error("Policy not found");
			}

			return response.json();
		})

		.then(data => {

			const policy = data.data;

			// Fill all the spans with policy data

			document.getElementById("branchCodeSpan").textContent = policy.branchName || "";
			document.getElementById("docSpan").textContent = policy.policyStartDate || "";
			document.getElementById("policyNoSpan").textContent = policy.policyCode || "";
			document.getElementById("memberCodeSpan").textContent = policy.memberSelection || "";
			document.getElementById("applicantNameSpan").textContent = policy.customerName ? policy.customerName.toUpperCase() : "";
			document.getElementById("fatherNameSpan").textContent = policy.relationDetails || "";
			document.getElementById("nomineeNameSpan").textContent = policy.suggestedNominee ? policy.suggestedNominee.toUpperCase() : "";
			document.getElementById("addressSpan").textContent = policy.address ? policy.address.toUpperCase() : "";
			document.getElementById("schemeSpan").textContent = policy.schemeType || "";
			document.getElementById("planSpan").textContent = policy.schemeCode || "";
			document.getElementById("relationshipSpan").textContent = policy.relation || "";
			document.getElementById("roiSpan").textContent = policy.roi || "";
			document.getElementById("modeSpan").textContent = policy.schemeMode ? policy.schemeMode.toUpperCase() : "";
			document.getElementById("maturitySpan").textContent = policy.maturityAmount || "";
			document.getElementById("renewalAmountSpan").textContent = policy.paidAmount || "";
			document.getElementById("totalValueSpan").textContent = policy.depositAmount || "";
			document.getElementById("termSpan").textContent = policy.schemeTerm || "";
			document.getElementById("balance").textContent = policy.balance || "";
			document.getElementById("maturityDateSpan").textContent = policy.maturityDate || "";
			document.getElementById("mobileSpan").textContent = policy.contactNo || "";
			document.getElementById("collectorSpan").textContent = policy.agent || "";

			// ------------------------------------------------
			// Fetch Company Details
			// ------------------------------------------------

			return fetch("api/preference/getCompanyDetails");

		})

		.then(response => {

			if (!response.ok) {

				throw new Error("Company details not found");
			}

			return response.json();
		})

		.then(company => {

			// Set Company Name
			document.querySelector("#transactionSection h1").textContent =
				company.companyName ? company.companyName.toUpperCase() : "MICROFINANCE SERVICES";

			// Set Company Address
			document.querySelector("#transactionSection h1 + p").textContent =
				company.address ? "ADDRESS : " + company.address.toUpperCase() : "";

			// Show the transaction section
			document.getElementById("transactionSection").style.display = "block";

		})

		.catch(error => {

			alert("Error fetching data: " + error.message);

			console.error("Error:", error);
		});
}



function printTransactionSection() {
	const content = document.getElementById("transactionSection").innerHTML;

	const printWindow = window.open('', '', 'height=800,width=1000');
	printWindow.document.write('<html><head><title>Transaction Receipt</title>');

	// Optional styling for print
	printWindow.document.write(`
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 20px;
            }
            p {
                margin: 5px 0;
            }
            h1 {
                text-align: center;
            }
            hr {
                margin: 10px 0;
                border: 1px solid black;
            }
            .d-flex {
                display: flex;
                justify-content: space-between;
            }
        </style>
    `);

	printWindow.document.write('</head><body>');
	printWindow.document.write(content);
	printWindow.document.write('</body></html>');

	printWindow.document.close();
	printWindow.focus();

	printWindow.onload = function() {
		printWindow.print();
		printWindow.close();
	};
}


$(document).ready(function() {
	const $policyDropdown = $('#findPolicyNumber');

	// Clear and set default option
	$policyDropdown.empty().append('<option value="">SELECT POLICY CODE</option>');

	// Fetch approved policy data
	fetchApprovedPolicies();

	function fetchApprovedPolicies() {
		$.ajax({
			url: 'api/Policymangment/getApprovedPolicies',
			method: 'GET',
			success: function(response) {
				if (response.status === 'OK' && Array.isArray(response.data)) {
					response.data.forEach(item => {
						const policyNumber = (item.policyCode || item.policyNumber || '').trim();
						const clientName = (item.customerName.toUpperCase() || 'Unknown').trim();


						if (policyNumber) {
							$policyDropdown.append(
								`<option value="${policyNumber}">
                                    ${policyNumber} - ${clientName}
                                </option>`
							);
						}
					});
				} else {
					console.warn('No approved policies found.');
				}
			},
			error: function(xhr, status, error) {
				console.error('Error fetching approved policies:', error);
			}
		});
	}
});

$(document).ready(function() {

	$('#policyTableBody').on('click', '.print-btn', function(e) {

		e.preventDefault();

		const $button = $(this);
		const $row = $button.closest('tr');

		const policyCode = $.trim(
			$row.find('td:eq(0)').text()
		);

		if (!policyCode) {
			alert("Policy Code not found!");
			return;
		}

		$button
			.prop('disabled', true)
			.html('<i class="fa fa-spinner fa-spin"></i> Loading...');

		$.ajax({

			url: 'api/Policymangment/getPolicyByPolicyCode',
			type: 'GET',
			data: {
				policyCode: policyCode
			},
			dataType: 'json'

		}).done(function(policyResponse) {

			console.log("Policy Response:", policyResponse);

			if (!policyResponse || !policyResponse.data) {
				alert("Policy data not found!");
				return;
			}

			const policy = policyResponse.data;

			$.ajax({

				url: 'api/preference/getCompanyDetails',
				type: 'GET',
				dataType: 'json'

			}).done(function(companyResponse) {

				console.log("Company Response:", companyResponse);

				const company =
					companyResponse.data ||
					companyResponse;

				if (!company) {
					alert("Company details not found!");
					return;
				}

				function safe(value) {

					return value !== null &&
						value !== undefined &&
						value !== ""
						? value
						: "-";
				}

				function upper(value) {

					return safe(value)
						.toString()
						.toUpperCase();

				}

				function amount(value) {

					const num = parseFloat(value);

					if (isNaN(num)) {
						return "₹ 0.00";
					}

					return "₹ " +
						num.toLocaleString(
							"en-IN",
							{
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							}
						);

				}

				const companyAddressParts = [];

				if (company.address) {
					companyAddressParts.push(
						company.address
					);
				}

				if (company.city) {
					companyAddressParts.push(
						company.city
					);
				}

				if (company.state) {
					companyAddressParts.push(
						company.state
					);
				}

				if (company.pinCode) {
					companyAddressParts.push(
						company.pinCode
					);
				}

				const companyAddress =
					companyAddressParts.length > 0
						? companyAddressParts.join(", ")
						: "-";

				const companyName =
					upper(
						company.companyName ||
						"MICROFINANCE SERVICES"
					);

				const contactNumber =
					safe(company.helplineNo);

				const gstin =
					safe(company.gstin);

				const customerName =
					upper(policy.customerName);

				const memberCode =
					safe(policy.memberSelection);

				const contactNo =
					safe(policy.contactNo);

				const address =
					upper(policy.address);

				const nominee =
					upper(policy.suggestedNominee);

				const relationship =
					upper(policy.relation);

				const branchName =
					upper(policy.branchName);

				const agent =
					upper(policy.agent);

				const schemeType =
					upper(policy.schemeType);

				const schemeName =
					upper(policy.schemeName);

				const schemeCode =
					upper(policy.schemeCode);

				const schemeMode =
					upper(policy.schemeMode);

				const policyStartDate =
					safe(policy.policyStartDate);

				const maturityDate =
					safe(policy.maturityDate);

				const schemeTerm =
					safe(policy.schemeTerm);

				const roi =
					safe(policy.roi);

				const paymentBy =
					upper(policy.paymentBy);

				const modeOfPayment =
					upper(policy.modeOfPayment);

				const policyAmount =
					amount(policy.policyAmount);

				const depositAmount =
					amount(policy.depositAmount);

				const paidAmount =
					amount(policy.paidAmount);

				const maturityAmount =
					amount(policy.maturityAmount);

				const balance =
					amount(policy.balance);

				const amountDue =
					amount(policy.amountDue);

				const noOfInstallments =
					safe(policy.noOfInstallments);

				const lastInstPaid =
					safe(policy.lastInstPaid);

				const lastPaymentDate =
					safe(policy.lastPaymentDate);

				const dueDate =
					safe(policy.dueDate);

				const remark =
					upper(policy.remark);

				let fdSplitHtml = "";

				if (
					schemeType === "FD" &&
					policy.fdSplitAmounts
				) {

					try {

						let splitAmounts =
							policy.fdSplitAmounts;

						if (
							typeof splitAmounts ===
							"string"
						) {

							splitAmounts =
								JSON.parse(
									splitAmounts
								);

						}

						if (
							Array.isArray(splitAmounts) &&
							splitAmounts.length > 0
						) {

							fdSplitHtml = `

	                            <div class="section-title">
	                                FD SPLIT DETAILS
	                            </div>

	                            <table class="details-table fd-table">

	                                <thead>

	                                    <tr>

	                                        <th>
	                                            FD NO.
	                                        </th>

	                                        <th>
	                                            FD AMOUNT
	                                        </th>

	                                    </tr>

	                                </thead>

	                                <tbody>

	                                    ${splitAmounts.map(
								function(fdAmount, index) {

									return `

	                                                <tr>

	                                                    <td>
	                                                        FD ${index + 1}
	                                                    </td>

	                                                    <td class="amount">
	                                                        ${amount(fdAmount)}
	                                                    </td>

	                                                </tr>

	                                            `;

								}
							).join("")}

	                                </tbody>

	                            </table>

	                        `;

						}

					} catch (error) {

						console.error(
							"FD Split Parse Error:",
							error
						);

					}

				}

				const printWindow =
					window.open(
						"",
						"_blank",
						"width=900,height=900"
					);

				if (!printWindow) {

					alert(
						"Please allow pop-ups for this website."
					);

					return;
				}

				const slip = `

	<!DOCTYPE html>

	<html>

	<head>

	<meta charset="UTF-8">

	<title>
	Investment Transaction Slip - ${safe(policy.policyCode)}
	</title>

	<style>

	* {
	    box-sizing: border-box;
	}

	@page {
	    size: A4 portrait;
	    margin: 6mm;
	}

	html,
	body {
	    margin: 0;
	    padding: 0;
	    width: 100%;
	    background: #fff;
	    font-family: Arial, Helvetica, sans-serif;
	    color: #222;
	    font-size: 10px;
	}

	.slip {
	    width: 100%;
	    max-width: 100%;
	    height: 283mm;
	    max-height: 283mm;
	    margin: 0 auto;
	    padding: 10px;
	    background: #fff;
	    border: 1px solid #222;
	    overflow: hidden;
	}

	/* HEADER */

	.header {
	    text-align: center;
	    border-bottom: 2px solid #222;
	    padding-bottom: 6px;
	    margin-bottom: 6px;
	}

	.company-name {
	    font-size: 18px;
	    font-weight: 700;
	    text-transform: uppercase;
	    letter-spacing: 0.5px;
	    margin-bottom: 2px;
	}

	.company-address {
	    font-size: 8px;
	    margin-bottom: 2px;
	    color: #555;
	}

	.company-contact {
	    font-size: 8px;
	    color: #555;
	}

	.company-gstin {
	    font-size: 8px;
	    margin-top: 2px;
	    color: #555;
	}

	/* TITLE */

	.slip-title {
	    text-align: center;
	    font-size: 13px;
	    font-weight: 700;
	    letter-spacing: 0.5px;
	    margin: 6px 0 2px;
	    text-transform: uppercase;
	}

	.slip-subtitle {
	    text-align: center;
	    font-size: 7px;
	    color: #666;
	    margin-bottom: 6px;
	}

	/* POLICY INFO */

	.policy-info {
	    display: grid;
	    grid-template-columns: 1fr 1fr 1fr;
	    border: 1px solid #777;
	    margin-bottom: 6px;
	}

	.policy-info-item {
	    padding: 5px;
	    border-right: 1px solid #aaa;
	}

	.policy-info-item:last-child {
	    border-right: none;
	}

	.label {
	    display: block;
	    font-size: 7px;
	    color: #666;
	    font-weight: 600;
	    margin-bottom: 1px;
	    text-transform: uppercase;
	}

	.value {
	    font-size: 9px;
	    font-weight: 700;
	}

	/* SECTION */

	.section-title {
	    background: #222;
	    color: #fff;
	    padding: 4px 6px;
	    font-size: 8px;
	    font-weight: 700;
	    letter-spacing: 0.3px;
	    text-transform: uppercase;
	    margin-top: 5px;
	}

	/* TABLE */

	.details-table {
	    width: 100%;
	    border-collapse: collapse;
	    margin-bottom: 2px;
	}

	.details-table td {
	    border: 1px solid #ccc;
	    padding: 3px 5px;
	    font-size: 8px;
	    line-height: 1.15;
	    vertical-align: middle;
	}

	.details-table td:first-child {
	    width: 35%;
	    font-weight: 700;
	    background: #f6f6f6;
	    text-transform: uppercase;
	}

	.details-table th {
	    border: 1px solid #aaa;
	    padding: 3px 5px;
	    background: #f2f2f2;
	    font-size: 7px;
	    text-align: left;
	    text-transform: uppercase;
	}

	.details-table .amount {
	    font-weight: 700;
	}

	/* FD TABLE */

	.fd-table {
	    margin-bottom: 2px;
	}

	.fd-table td,
	.fd-table th {
	    padding: 3px 5px;
	}

	/* SUMMARY */

	.summary {
	    display: grid;
	    grid-template-columns: repeat(3, 1fr);
	    gap: 5px;
	    margin-top: 5px;
	}

	.summary-box {
	    border: 1px solid #888;
	    padding: 5px;
	    text-align: center;
	}

	.summary-label {
	    font-size: 7px;
	    font-weight: 600;
	    color: #666;
	    text-transform: uppercase;
	    margin-bottom: 2px;
	}

	.summary-value {
	    font-size: 10px;
	    font-weight: 700;
	}

	/* PAYMENT */

	.payment-details {
	    display: grid;
	    grid-template-columns: 1fr 1fr;
	    gap: 0;
	    border: 1px solid #ccc;
	}

	.payment-item {
	    padding: 4px 6px;
	    border-bottom: 1px solid #ddd;
	}

	.payment-item:nth-child(odd) {
	    border-right: 1px solid #ddd;
	}

	.payment-label {
	    font-size: 7px;
	    color: #666;
	    font-weight: 600;
	    text-transform: uppercase;
	}

	.payment-value {
	    font-size: 8px;
	    font-weight: 700;
	    margin-top: 1px;
	}

	/* FOOTER */

	.footer {
	    margin-top: 8px;
	    display: flex;
	    justify-content: space-between;
	    align-items: flex-end;
	}

	.footer-left {
	    font-size: 7px;
	    line-height: 1.4;
	}

	.signature {
	    width: 140px;
	    text-align: center;
	    padding-top: 22px;
	    border-top: 1px solid #222;
	    font-size: 8px;
	    font-weight: 700;
	}

	.thank-you {
	    text-align: center;
	    margin-top: 7px;
	    padding-top: 4px;
	    border-top: 1px solid #ddd;
	    font-size: 7px;
	    font-weight: 600;
	    letter-spacing: 0.3px;
	}

	.official {
	    text-align: center;
	    margin-top: 2px;
	    font-size: 6px;
	    color: #777;
	}

	/* PRINT */

	@media print {

	    html,
	    body {
	        width: 210mm;
	        height: 297mm;
	        margin: 0;
	        padding: 0;
	        background: #fff;
	        overflow: hidden !important;
	    }

	    .slip {
	        width: 198mm;
	        height: 285mm;
	        max-width: 198mm;
	        max-height: 285mm;
	        margin: 0;
	        padding: 8px;
	        border: 1px solid #222;
	        overflow: hidden !important;
	        page-break-after: avoid !important;
	        page-break-before: avoid !important;
	        break-after: avoid !important;
	        break-before: avoid !important;
	    }

	    .section-title {
	        background: #222 !important;
	        color: #fff !important;
	        -webkit-print-color-adjust: exact !important;
	        print-color-adjust: exact !important;
	        page-break-after: avoid !important;
	        break-after: avoid !important;
	    }

	    .details-table td:first-child {
	        background: #f6f6f6 !important;
	        -webkit-print-color-adjust: exact !important;
	        print-color-adjust: exact !important;
	    }

	    .details-table th {
	        background: #f2f2f2 !important;
	        -webkit-print-color-adjust: exact !important;
	        print-color-adjust: exact !important;
	    }

	    table,
	    .summary,
	    .payment-details,
	    .footer {
	        page-break-inside: avoid !important;
	        break-inside: avoid !important;
	    }
	}


	</style>

	</head>

	<body>

	<div class="slip">

	    <div class="header">

	        <div class="company-name">
	            ${companyName}
	        </div>

	        <div class="company-address">
	            ${upper(companyAddress)}
	        </div>

	        <div class="company-contact">
	            CONTACT: ${contactNumber}
	        </div>

	        <div class="company-gstin">
	            GSTIN: ${gstin}
	        </div>

	    </div>

	    <div class="slip-title">
	        INVESTMENT TRANSACTION SLIP
	    </div>

	    <div class="slip-subtitle">
	        OFFICIAL INVESTMENT / POLICY TRANSACTION RECORD
	    </div>

	    <div class="policy-info">

	        <div class="policy-info-item">

	            <span class="label">
	                Policy Code
	            </span>

	            <span class="value">
	                ${safe(policy.policyCode)}
	            </span>

	        </div>

	        <div class="policy-info-item">

	            <span class="label">
	                Policy Start Date
	            </span>

	            <span class="value">
	                ${policyStartDate}
	            </span>

	        </div>

	        <div class="policy-info-item">

	            <span class="label">
	                Transaction Date
	            </span>

	            <span class="value">
	                ${lastPaymentDate}
	            </span>

	        </div>

	    </div>

	    <div class="section-title">
	        CUSTOMER DETAILS
	    </div>

	    <table class="details-table">

	        <tr>
	            <td>Customer Name</td>
	            <td>${customerName}</td>
	        </tr>

	        <tr>
	            <td>Member / Customer Code</td>
	            <td>${memberCode}</td>
	        </tr>

	        <tr>
	            <td>Contact Number</td>
	            <td>${contactNo}</td>
	        </tr>

	        <tr>
	            <td>Address</td>
	            <td>${address}</td>
	        </tr>

	        <tr>
	            <td>Nominee Name</td>
	            <td>${nominee}</td>
	        </tr>

	        <tr>
	            <td>Relationship</td>
	            <td>${relationship}</td>
	        </tr>

	    </table>

	    <div class="section-title">
	        INVESTMENT DETAILS
	    </div>

	    <table class="details-table">

	        <tr>
	            <td>Scheme Type</td>
	            <td>${schemeType}</td>
	        </tr>

	        <tr>
	            <td>Scheme Name</td>
	            <td>${schemeName}</td>
	        </tr>

	        <tr>
	            <td>Scheme Code / Plan</td>
	            <td>${schemeCode}</td>
	        </tr>

	        <tr>
	            <td>Scheme Mode</td>
	            <td>${schemeMode}</td>
	        </tr>

	        <tr>
	            <td>Policy Amount</td>
	            <td class="amount">${policyAmount}</td>
	        </tr>

	        <tr>
	            <td>Deposit Amount</td>
	            <td class="amount">${depositAmount}</td>
	        </tr>

	        <tr>
	            <td>Rate Of Interest</td>
	            <td>${roi} %</td>
	        </tr>

	        <tr>
	            <td>Scheme Term</td>
	            <td>${schemeTerm}</td>
	        </tr>

	        <tr>
	            <td>Maturity Date</td>
	            <td>${maturityDate}</td>
	        </tr>

	        <tr>
	            <td>Maturity Amount</td>
	            <td class="amount">${maturityAmount}</td>
	        </tr>

	    </table>

	    ${fdSplitHtml}

	    <div class="section-title">
	        PAYMENT SUMMARY
	    </div>

	    <div class="summary">

	        <div class="summary-box">

	            <div class="summary-label">
	                Paid Amount
	            </div>

	            <div class="summary-value">
	                ${paidAmount}
	            </div>

	        </div>

	        <div class="summary-box">

	            <div class="summary-label">
	                Amount Due
	            </div>

	            <div class="summary-value">
	                ${amountDue}
	            </div>

	        </div>

	        <div class="summary-box">

	            <div class="summary-label">
	                Balance
	            </div>

	            <div class="summary-value">
	                ${balance}
	            </div>

	        </div>

	    </div>

	    <div class="section-title">
	        PAYMENT INFORMATION
	    </div>

	    <div class="payment-details">

	        <div class="payment-item">

	            <div class="payment-label">
	                Payment By
	            </div>

	            <div class="payment-value">
	                ${paymentBy}
	            </div>

	        </div>

	        <div class="payment-item">

	            <div class="payment-label">
	                Mode Of Payment
	            </div>

	            <div class="payment-value">
	                ${modeOfPayment}
	            </div>

	        </div>

	        <div class="payment-item">

	            <div class="payment-label">
	                Installments Paid
	            </div>

	            <div class="payment-value">
	                ${lastInstPaid}
	            </div>

	        </div>

	        <div class="payment-item">

	            <div class="payment-label">
	                Total Installments
	            </div>

	            <div class="payment-value">
	                ${noOfInstallments}
	            </div>

	        </div>

	        <div class="payment-item">

	            <div class="payment-label">
	                Last Payment Date
	            </div>

	            <div class="payment-value">
	                ${lastPaymentDate}
	            </div>

	        </div>

	        <div class="payment-item">

	            <div class="payment-label">
	                Next Due Date
	            </div>

	            <div class="payment-value">
	                ${dueDate}
	            </div>

	        </div>

	    </div>

	    <div class="section-title">
	        REMARK
	    </div>

	    <table class="details-table">

	        <tr>

	            <td>
	                Remark
	            </td>

	            <td>
	                ${remark}
	            </td>

	        </tr>

	    </table>

	    <div class="footer">

	        <div class="footer-left">

	            <strong>
	                BRANCH:
	            </strong>

	            ${branchName}

	            <br>

	            <strong>
	                AGENT / COLLECTOR:
	            </strong>

	            ${agent}

	            <br>

	            <strong>
	                POLICY STATUS:
	            </strong>

	            ${policy.isApproved === true
						? "APPROVED"
						: "PENDING"
					}

	        </div>

	        <div class="signature">
	            AUTHORIZED SIGNATURE
	        </div>

	    </div>

	    <div class="thank-you">
	        THANK YOU FOR YOUR INVESTMENT
	    </div>

	    <div class="official">
	        This is a system generated Investment Transaction Slip.
	    </div>

	</div>

	<script>

	window.onload = function () {

	    setTimeout(function () {

	        window.print();

	    }, 300);

	};

	window.onafterprint = function () {

	    window.close();

	};

	</script>

	</body>

	</html>

	            `;

				printWindow.document.open();

				printWindow.document.write(slip);

				printWindow.document.close();

			}).fail(function(xhr) {

				console.error(
					"Company API Error:",
					xhr
				);

				alert(
					"Unable to fetch company details."
				);

			});

		}).fail(function(xhr) {

			console.error(
				"Policy API Error:",
				xhr
			);

			alert(
				"Unable to fetch policy details."
			);

		}).always(function() {

			$button
				.prop('disabled', false)
				.html(
					'<i class="fa fa-print"></i> Print'
				);

		});

	});


});

$("#findBtn").click(function() {

	const policyCode = $("#findPolicyNumber").val().trim();

	if (!policyCode) {
		alert("Please enter Policy Code.");
		$("#policyTableBody").empty();
		return;
	}

	$.ajax({
		url: "api/Policymangment/getPolicyByPolicyCode",
		type: "GET",
		data: {
			policyCode: policyCode
		},
		dataType: "json",

		success: function(response) {

			console.log("Full API Response:", response);
			console.log("Response Data:", response ? response.data : null);

			$("#policyTableBody").empty();

			if (!response || !response.data) {
				alert(
					response && response.message
						? response.message
						: "No data found for Policy Code: " + policyCode
				);
				return;
			}

			const data = response.data;

			console.log("Policy Object:", data);

			const policyCodeValue = data.policyCode || "";
			const customerName = data.customerName || "";
			const policyAmount = data.policyAmount || "0.00";
			const lastPaymentDate = data.lastPaymentDate || "";
			const schemeType = data.schemeType || "";
			const maturityAmount = data.maturityAmount || "0.00";
			const paidAmount = data.paidAmount || "0.00";
			const policyStartDate = data.policyStartDate || "";
			const schemeTerm = data.schemeTerm || "";
			const maturityDate = data.maturityDate || "";
			const memberSelection = data.memberSelection || "";
			const contactNo = data.contactNo || "";
			const depositAmount = data.depositAmount || "0.00";
			const balance = data.balance || "0.00";
			const noOfInstallments = data.noOfInstallments || "0";
			const branchName = data.branchName || "";
			const lastInstPaid = data.lastInstPaid || "";

			const isApproved =
				data.isApproved === true
					? "YES"
					: "NO";

			const newRow = `
                <tr>

                    <td>
                        ${policyCodeValue}
                    </td>

                    <td>
                        ${customerName.toUpperCase()}
                    </td>

                    <td>
                        ${policyAmount}
                    </td>

                    <td>
                        ${lastPaymentDate}
                    </td>

                    <td>
                        ${schemeType.toUpperCase()}
                    </td>

                    <td>
                        ${maturityAmount}
                    </td>

                    <td>
                        ${paidAmount}
                    </td>

                    <td>
                        ${policyStartDate}
                    </td>

                    <td>
                        ${schemeTerm}
                    </td>

                    <td>
                        ${maturityDate}
                    </td>

                    <td>
                        ${memberSelection}
                    </td>

                    <td>
                        ${contactNo}
                    </td>

                    <td>
                        ${depositAmount}
                    </td>

                    <td>
                        ${balance}
                    </td>

                    <td>
                        ${noOfInstallments}
                    </td>
					
					<td>
					     ${lastInstPaid}
					</td>

                    <td>
                        ${isApproved}
                    </td>

                    <td>
                        ${branchName.toUpperCase()}
                    </td>

                    <td>
                        <button
                            type="button"
                            class="btn btn-primary print-btn"
                            data-policy-code="${policyCodeValue}">

                            <i class="fa fa-print"></i>
                            Print

                        </button>
                    </td>

                </tr>
            `;

			$("#policyTableBody").append(newRow);

			console.log("Table row added successfully.");

		},

		error: function(xhr) {

			console.error(
				"Error while fetching policy:",
				xhr
			);

			$("#policyTableBody").empty();

			let message =
				"Error while fetching policy data.";

			if (
				xhr.responseJSON &&
				xhr.responseJSON.message
			) {
				message =
					xhr.responseJSON.message;
			}

			alert("❌ " + message);
		}
	});

});


