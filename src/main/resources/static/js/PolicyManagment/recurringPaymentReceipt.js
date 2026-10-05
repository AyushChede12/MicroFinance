$(document).ready(function() {

	// =========================================================
	// LOAD POLICY DROPDOWN
	// =========================================================

	$.ajax({
		url: "api/Policymangment/getAllRDPolicies",
		type: "GET",
		dataType: "json",

		success: function(response) {

			console.log("All RD Policies Response:", response);

			const policySelect = $("#policyCode");

			policySelect.find("option:not(:first)").remove();

			if (
				response &&
				response.status === "OK" &&
				Array.isArray(response.data)
			) {

				response.data.forEach(function(policy) {

					const customerName =
						policy.customerName || "";

					const optionText =
						(policy.policyCode || "") +
						" - " +
						customerName.toUpperCase();

					policySelect.append(
						$("<option>", {
							value: policy.policyCode || "",
							text: optionText
						})
					);
				});

			} else {

				console.warn("No RD policy data found.");

			}
		},

		error: function(xhr, status, error) {

			console.error(
				"Error loading RD policies:",
				xhr,
				status,
				error
			);

			alert("Failed to load policies.");
		}
	});


	// =========================================================
	// COMMON FUNCTION - CREATE POLICY TABLE
	// =========================================================

	function loadPolicyTable(data) {

		const tbody = $("#policyTableBody");

		tbody.empty();

		const policies = Array.isArray(data)
			? data
			: (data ? [data] : []);


		// =====================================================
		// NO DATA
		// =====================================================

		if (policies.length === 0) {

			tbody.html(`
                <tr>
                    <td colspan="13" class="text-center">
                        No data available
                    </td>
                </tr>
            `);

			return;
		}


		// =====================================================
		// CREATE TABLE ROWS
		// =====================================================

		policies.forEach(function(item, index) {

			const policyCode =
				item.policyCode || "";

			const customerName =
				item.customerName || "";

			const lastPaymentDate =
				item.lastPaymentDate || "";

			const policyAmount =
				item.policyAmount || "";

			const schemeCode =
				item.schemeCode || "";

			const maturityDate =
				item.maturityDate || "";

			const maturityAmount =
				item.maturityAmount || "";

			const schemeTerm =
				item.schemeTerm || "";

			const branchName =
				item.branchName || "";

			const modeOfPayment =
				item.modeOfPayment || "";


			const newRow = `
                <tr style="font-family: 'Poppins', sans-serif;">

                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        ${policyCode}
                    </td>

                    <td>
                        ${customerName.toUpperCase()}
                    </td>

                    <td>
                        ${lastPaymentDate}
                    </td>

                    <td>
                        ${policyAmount}
                    </td>

                    <td>
                        ${schemeCode}
                    </td>

                    <td>
                        ${maturityDate}
                    </td>

                    <td>
                        ${maturityAmount}
                    </td>

                    <td>
                        ${schemeTerm}
                    </td>

                    <td>
                        ${branchName.toUpperCase()}
                    </td>

                    <td>
                        ${modeOfPayment.toUpperCase()}
                    </td>

                    <td>
                        <a href="#"
                           class="print-btn"
                           data-policy-code="${policyCode}"
                           style="color: green;">

                            <i class="bi bi-printer-fill"></i>

                        </a>
                    </td>

                </tr>
            `;

			tbody.append(newRow);
		});
	}


	// =========================================================
	// LOAD ALL RD POLICIES INTO TABLE
	// =========================================================

	$.ajax({

		url: "api/Policymangment/getAllRDPolicies",
		type: "GET",
		dataType: "json",

		success: function(response) {

			console.log(
				"RD Policy Table Response:",
				response
			);

			if (
				response &&
				response.status === "OK" &&
				Array.isArray(response.data)
			) {

				loadPolicyTable(response.data);

			} else {

				$("#policyTableBody").html(`
                    <tr>
                        <td colspan="13"
                            class="text-center">
                            No data available
                        </td>
                    </tr>
                `);
			}
		},

		error: function(xhr, status, error) {

			console.error(
				"Error fetching RD policies:",
				xhr,
				status,
				error
			);

			alert("Failed to load policy data.");
		}
	});


	// =========================================================
	// FIND POLICY BY POLICY CODE
	// =========================================================

	$("#findBtn").click(function(e) {

		e.preventDefault();

		const policyCode =
			$("#policyCode").val();

		if (!policyCode) {

			alert(
				"Please select Policy Code."
			);

			$("#policyTableBody").empty();

			return;
		}


		// =====================================================
		// LOAD ALL RD POLICIES
		// THEN FILTER SELECTED POLICY
		// =====================================================

		$.ajax({

			url: "api/Policymangment/getAllRDPolicies",
			type: "GET",
			dataType: "json",

			success: function(response) {

				console.log(
					"Find Policy Response:",
					response
				);


				if (
					!response ||
					response.status !== "OK" ||
					!Array.isArray(response.data)
				) {

					alert(
						"No policy data found."
					);

					$("#policyTableBody").empty();

					return;
				}


				// =================================================
				// FILTER SELECTED POLICY
				// =================================================

				const filteredPolicy =
					response.data.filter(function(item) {

						return String(
							item.policyCode || ""
						).trim() === String(
							policyCode
						).trim();

					});


				if (filteredPolicy.length === 0) {

					alert(
						"No data found for selected policy."
					);

					$("#policyTableBody").empty();

					return;
				}


				// =================================================
				// SHOW SELECTED POLICY
				// =================================================

				loadPolicyTable(filteredPolicy);

			},

			error: function(xhr, status, error) {

				console.error(
					"Find Policy Error:",
					xhr,
					status,
					error
				);

				alert(
					"Error while fetching policy data."
				);
			}
		});
	});

	// =========================================================
	// PRINT BUTTON - BANK STYLE RD PAYMENT RECEIPT
	// SINGLE PAGE A4 RECEIPT
	// SAME API - NO BACKEND CHANGE
	// =========================================================

	$("#policyTableBody").on(
		"click",
		".print-btn",
		function(e) {

			e.preventDefault();

			const policyCode =
				$(this).attr("data-policy-code");

			if (!policyCode) {

				alert("Policy Code not found!");

				return;
			}

			console.log(
				"Printing RD Payment Receipt:",
				policyCode
			);


			// =====================================================
			// FETCH POLICY DATA
			// SAME EXISTING API
			// =====================================================

			$.ajax({

				url: "api/Policymangment/getPolicyByPolicyCode",

				type: "GET",

				data: {
					policyCode: policyCode
				},

				dataType: "json",

				success: function(response) {

					console.log(
						"RD Payment Receipt Response:",
						response
					);


					if (
						!response ||
						!response.data
					) {

						alert(
							"Policy data not found!"
						);

						return;
					}


					const policy =
						response.data;


					// =================================================
					// FETCH COMPANY DETAILS
					// SAME EXISTING API
					// =================================================

					$.ajax({

						url:
							"api/preference/getCompanyDetails",

						type: "GET",

						dataType: "json",

						success: function(companyResponse) {

							console.log(
								"Company Response:",
								companyResponse
							);


							const company =
								companyResponse.data ||
								companyResponse;


							if (!company) {

								alert(
									"Company details not found!"
								);

								return;
							}


							// =================================================
							// SAFE FUNCTIONS
							// =================================================

							function safe(value) {

								if (
									value === null ||
									value === undefined ||
									value === ""
								) {

									return "-";
								}

								return value;
							}


							function upper(value) {

								return safe(value)
									.toString()
									.toUpperCase();
							}


							function num(value) {

								const n =
									parseFloat(value);

								return isNaN(n)
									? 0
									: n;
							}


							function money(value) {

								return "₹ " +
									num(value).toLocaleString(
										"en-IN",
										{
											minimumFractionDigits: 2,
											maximumFractionDigits: 2
										}
									);
							}


							function escapeHtml(value) {

								return safe(value)
									.toString()
									.replace(/&/g, "&amp;")
									.replace(/</g, "&lt;")
									.replace(/>/g, "&gt;")
									.replace(/"/g, "&quot;")
									.replace(/'/g, "&#039;");
							}


							// =================================================
							// COMPANY
							// =================================================

							const companyName =
								upper(
									company.companyName ||
									"MICROFINANCE SERVICES"
								);


							const addressParts = [];


							if (company.address) {

								addressParts.push(
									company.address
								);
							}


							if (company.city) {

								addressParts.push(
									company.city
								);
							}


							if (company.state) {

								addressParts.push(
									company.state
								);
							}


							if (company.pinCode) {

								addressParts.push(
									company.pinCode
								);
							}


							const companyAddress =
								addressParts.length
									? addressParts.join(", ")
									: "-";


							const contactNumber =
								safe(
									company.helplineNo
								);


							const gstin =
								safe(
									company.gstin
								);


							// =================================================
							// CURRENT DATE / TIME
							// =================================================

							const currentDate =
								new Date();


							const receiptDate =
								currentDate.toLocaleDateString(
									"en-IN",
									{
										day: "2-digit",
										month: "2-digit",
										year: "numeric"
									}
								);


							const receiptTime =
								currentDate.toLocaleTimeString(
									"en-IN",
									{
										hour: "2-digit",
										minute: "2-digit"
									}
								);


							// =================================================
							// RECEIPT NUMBER
							// =================================================

							const receiptNumber =
								"RD-" +
								String(
									policyCode
								).replace(
									/[^a-zA-Z0-9]/g,
									""
								) +
								"-" +
								currentDate.getTime();


							// =================================================
							// CUSTOMER DETAILS
							// =================================================

							const customerName =
								upper(
									policy.customerName
								);


							const customerCode =
								safe(
									policy.memberSelection
								);


							const contactNo =
								safe(
									policy.contactNo
								);


							const address =
								upper(
									policy.address
								);


							// =================================================
							// RD DETAILS
							// =================================================

							const rdAccountNo =
								safe(
									policy.policyCode
								);


							const schemeName =
								upper(
									policy.schemeName
								);


							const schemeCode =
								upper(
									policy.schemeCode
								);


							const schemeMode =
								upper(
									policy.schemeMode ||
									"MONTHLY"
								);


							const schemeTerm =
								safe(
									policy.schemeTerm
								);


							const roi =
								safe(
									policy.roi
								);


							const policyStartDate =
								safe(
									policy.policyStartDate
								);


							const maturityDate =
								safe(
									policy.maturityDate
								);


							// =================================================
							// PAYMENT DETAILS
							// =================================================

							const installmentAmount =
								num(
									policy.depositAmount
								);


							const totalPaid =
								num(
									policy.paidAmount
								);


							const balance =
								num(
									policy.balance
								);


							const amountDue =
								num(
									policy.amountDue
								);


							const installmentNo =
								safe(
									policy.lastInstPaid
								);


							const totalInstallments =
								safe(
									policy.noOfInstallments
								);


							const paymentDate =
								safe(
									policy.lastPaymentDate
								);


							const nextDueDate =
								safe(
									policy.dueDate
								);


							const modeOfPayment =
								upper(
									policy.modeOfPayment
								);


							const paymentBy =
								upper(
									policy.paymentBy
								);


							const branchName =
								upper(
									policy.branchName
								);


							const agent =
								upper(
									policy.agent
								);


							const remark =
								upper(
									policy.remark
								);


							// =================================================
							// CURRENT INSTALLMENT AMOUNT
							// =================================================
							//
							// If API provides current payment amount,
							// use it.
							//
							// Otherwise RD installment amount is used.
							// =================================================

							let currentPayment = 0;


							if (
								policy.currentPaymentAmount !==
								undefined &&
								policy.currentPaymentAmount !==
								null
							) {

								currentPayment =
									num(
										policy.currentPaymentAmount
									);

							} else if (
								policy.paymentAmount !==
								undefined &&
								policy.paymentAmount !==
								null
							) {

								currentPayment =
									num(
										policy.paymentAmount
									);

							} else if (
								policy.lastPaymentAmount !==
								undefined &&
								policy.lastPaymentAmount !==
								null
							) {

								currentPayment =
									num(
										policy.lastPaymentAmount
									);

							} else {

								currentPayment =
									installmentAmount;
							}


							// =================================================
							// INSTALLMENT TEXT
							// =================================================

							let installmentText = "-";


							if (
								installmentNo !== "-" &&
								totalInstallments !== "-"
							) {

								installmentText =
									installmentNo +
									" / " +
									totalInstallments;

							} else if (
								installmentNo !== "-"
							) {

								installmentText =
									installmentNo;
							}


							// =================================================
							// PRINT WINDOW
							// =================================================

							const printWindow =
								window.open(
									"",
									"_blank",
									"width=850,height=900"
								);


							if (!printWindow) {

								alert(
									"Please allow pop-ups for this website."
								);

								return;
							}


							// =================================================
							// BANK STYLE RD RECEIPT
							// =================================================

							const receipt = `

	<!DOCTYPE html>

	<html>

	<head>

	<meta charset="UTF-8">

	<title>
	RD Payment Receipt - ${escapeHtml(policyCode)}
	</title>


	<style>

	/* =====================================================
	   GLOBAL
	   ===================================================== */

	* {
	    box-sizing: border-box;
	}


	@page {

	    size: A4 portrait;

	    margin: 7mm;
	}


	html,
	body {

	    margin: 0;

	    padding: 0;

	    width: 100%;

	    background: #ffffff;

	    font-family:
	        Arial,
	        Helvetica,
	        sans-serif;

	    color: #111;

	    font-size: 10px;

	}


	/* =====================================================
	   RECEIPT CONTAINER
	   ===================================================== */

	.receipt {

	    width: 100%;

	    max-width: 196mm;

	    min-height: 0;

	    margin: 0 auto;

	    border: 1.5px solid #222;

	    background: #fff;

	    padding: 6mm;

	}


	/* =====================================================
	   HEADER
	   ===================================================== */

	.header {

	    text-align: center;

	    padding-bottom: 6px;

	    border-bottom: 1.5px solid #222;

	}


	.company-name {

	    font-size: 19px;

	    font-weight: 800;

	    text-transform: uppercase;

	    letter-spacing: 0.5px;

	}


	.company-address {

	    font-size: 8px;

	    margin-top: 2px;

	}


	.company-contact {

	    font-size: 8px;

	    margin-top: 2px;

	}


	.company-gstin {

	    font-size: 7px;

	    margin-top: 1px;

	    color: #555;

	}


	/* =====================================================
	   RECEIPT TITLE
	   ===================================================== */

	.title-area {

	    text-align: center;

	    padding: 7px 0 6px 0;

	}


	.receipt-title {

	    font-size: 16px;

	    font-weight: 800;

	    letter-spacing: 0.7px;

	}


	.receipt-subtitle {

	    font-size: 7px;

	    margin-top: 2px;

	    color: #666;

	    text-transform: uppercase;

	}


	/* =====================================================
	   TOP INFO
	   ===================================================== */

	.top-info {

	    display: grid;

	    grid-template-columns:
	        1fr 1fr 1fr;

	    border: 1px solid #555;

	}


	.top-box {

	    padding: 5px;

	    border-right: 1px solid #aaa;

	}


	.top-box:last-child {

	    border-right: none;

	}


	.top-label {

	    font-size: 7px;

	    color: #666;

	    font-weight: 700;

	    display: block;

	    margin-bottom: 2px;

	}


	.top-value {

	    font-size: 9px;

	    font-weight: 800;

	}


	/* =====================================================
	   SECTION
	   ===================================================== */

	.section {

	    margin-top: 7px;

	    border: 1px solid #888;

	}


	.section-header {

	    background: #eeeeee;

	    border-bottom: 1px solid #888;

	    padding: 4px 6px;

	    font-size: 8px;

	    font-weight: 800;

	    text-transform: uppercase;

	    letter-spacing: 0.3px;

	}


	/* =====================================================
	   CUSTOMER TABLE
	   ===================================================== */

	.info-table {

	    width: 100%;

	    border-collapse: collapse;

	}


	.info-table td {

	    border-bottom: 1px solid #ddd;

	    padding: 4px 6px;

	    font-size: 8.5px;

	}


	.info-table tr:last-child td {

	    border-bottom: none;

	}


	.info-label {

	    width: 25%;

	    font-weight: 700;

	    color: #555;

	}


	.info-value {

	    width: 25%;

	    font-weight: 700;

	}


	/* =====================================================
	   PAYMENT HIGHLIGHT
	   ===================================================== */

	.payment-box {

	    margin-top: 8px;

	    border: 2px solid #222;

	    text-align: center;

	    padding: 8px;

	}


	.payment-heading {

	    font-size: 8px;

	    font-weight: 800;

	    letter-spacing: 0.6px;

	}


	.payment-amount {

	    font-size: 23px;

	    font-weight: 900;

	    margin-top: 3px;

	}


	.payment-word {

	    font-size: 7px;

	    color: #555;

	    margin-top: 2px;

	}


	/* =====================================================
	   PAYMENT TABLE
	   ===================================================== */

	.payment-table {

	    width: 100%;

	    border-collapse: collapse;

	}


	.payment-table th {

	    background: #eeeeee;

	    border: 1px solid #999;

	    padding: 4px;

	    font-size: 7.5px;

	    text-align: left;

	}


	.payment-table td {

	    border: 1px solid #bbb;

	    padding: 5px;

	    font-size: 8.5px;

	    font-weight: 600;

	}


	.payment-table .amount-cell {

	    text-align: right;

	    font-weight: 800;

	}


	/* =====================================================
	   SUMMARY
	   ===================================================== */

	.summary {

	    display: grid;

	    grid-template-columns:
	        1fr 1fr 1fr;

	    gap: 5px;

	    margin-top: 7px;

	}


	.summary-box {

	    border: 1px solid #888;

	    text-align: center;

	    padding: 6px;

	}


	.summary-label {

	    font-size: 7px;

	    font-weight: 700;

	    color: #666;

	}


	.summary-value {

	    font-size: 11px;

	    font-weight: 900;

	    margin-top: 2px;

	}


	/* =====================================================
	   FOOTER
	   ===================================================== */

	.footer {

	    display: grid;

	    grid-template-columns:
	        1fr 1fr;

	    margin-top: 10px;

	    align-items: end;

	}


	.footer-left {

	    font-size: 7.5px;

	    line-height: 1.6;

	}


	.signature {

	    width: 120px;

	    margin-left: auto;

	    text-align: center;

	    border-top: 1px solid #222;

	    padding-top: 20px;

	    font-size: 7.5px;

	    font-weight: 800;

	}


	/* =====================================================
	   FOOT NOTE
	   ===================================================== */

	.thank-you {

	    text-align: center;

	    border-top: 1px solid #ddd;

	    margin-top: 8px;

	    padding-top: 5px;

	    font-size: 8px;

	    font-weight: 700;

	}


	.note {

	    text-align: center;

	    margin-top: 3px;

	    font-size: 6.5px;

	    color: #777;

	}


	/* =====================================================
	   PRINT CONTROL
	   ===================================================== */

	@media print {

	    html,
	    body {

	        width: 210mm;

	        height: 297mm;

	        margin: 0;

	        padding: 0;

	        overflow: hidden;

	    }


	    .receipt {

	        width: 196mm;

	        max-width: 196mm;

	        margin: 0;

	        padding: 5mm;

	        border: 1.5px solid #222;

	        page-break-after: avoid;

	        page-break-before: avoid;

	        page-break-inside: avoid;

	    }


	    .section,
	    .payment-box,
	    .summary,
	    .footer {

	        page-break-inside: avoid;

	    }


	    * {

	        -webkit-print-color-adjust: exact;

	        print-color-adjust: exact;

	    }

	}

	</style>

	</head>


	<body>


	<div class="receipt">


	    <!-- =============================================
	         COMPANY HEADER
	         ============================================= -->

	    <div class="header">

	        <div class="company-name">
	            ${escapeHtml(companyName)}
	        </div>

	        <div class="company-address">
	            ${escapeHtml(upper(companyAddress))}
	        </div>

	        <div class="company-contact">
	            CONTACT: ${escapeHtml(contactNumber)}
	        </div>

	        <div class="company-gstin">
	            GSTIN: ${escapeHtml(gstin)}
	        </div>

	    </div>


	    <!-- =============================================
	         TITLE
	         ============================================= -->

	    <div class="title-area">

	        <div class="receipt-title">
	            RECURRING DEPOSIT (RD)
	            PAYMENT RECEIPT
	        </div>

	        <div class="receipt-subtitle">
	            Payment acknowledgement / customer copy
	        </div>

	    </div>


	    <!-- =============================================
	         RECEIPT INFORMATION
	         ============================================= -->

	    <div class="top-info">


	        <div class="top-box">

	            <span class="top-label">
	                RECEIPT NO.
	            </span>

	            <span class="top-value">
	                ${escapeHtml(receiptNumber)}
	            </span>

	        </div>


	        <div class="top-box">

	            <span class="top-label">
	                RECEIPT DATE
	            </span>

	            <span class="top-value">
	                ${escapeHtml(receiptDate)}
	            </span>

	        </div>


	        <div class="top-box">

	            <span class="top-label">
	                RECEIPT TIME
	            </span>

	            <span class="top-value">
	                ${escapeHtml(receiptTime)}
	            </span>

	        </div>


	    </div>


	    <!-- =============================================
	         CUSTOMER DETAILS
	         ============================================= -->

	    <div class="section">

	        <div class="section-header">
	            Customer Details
	        </div>


	        <table class="info-table">


	            <tr>

	                <td class="info-label">
	                    Customer Name
	                </td>

	                <td class="info-value">
	                    ${escapeHtml(customerName)}
	                </td>


	                <td class="info-label">
	                    Customer ID
	                </td>

	                <td class="info-value">
	                    ${escapeHtml(customerCode)}
	                </td>

	            </tr>


	            <tr>

	                <td class="info-label">
	                    Contact No.
	                </td>

	                <td class="info-value">
	                    ${escapeHtml(contactNo)}
	                </td>


	                <td class="info-label">
	                    RD Account / Policy No.
	                </td>

	                <td class="info-value">
	                    ${escapeHtml(rdAccountNo)}
	                </td>

	            </tr>


	            <tr>

	                <td class="info-label">
	                    Address
	                </td>

	                <td class="info-value" colspan="3">
	                    ${escapeHtml(address)}
	                </td>

	            </tr>


	        </table>

	    </div>


	    <!-- =============================================
	         RD ACCOUNT DETAILS
	         ============================================= -->

	    <div class="section">

	        <div class="section-header">
	            RD Account Details
	        </div>


	        <table class="info-table">


	            <tr>

	                <td class="info-label">
	                    Scheme Name
	                </td>

	                <td class="info-value">
	                    ${escapeHtml(schemeName)}
	                </td>


	                <td class="info-label">
	                    Scheme Code
	                </td>

	                <td class="info-value">
	                    ${escapeHtml(schemeCode)}
	                </td>

	            </tr>


	            <tr>

	                <td class="info-label">
	                    Deposit Frequency
	                </td>

	                <td class="info-value">
	                    ${escapeHtml(schemeMode)}
	                </td>


	                <td class="info-label">
	                    Interest Rate
	                </td>

	                <td class="info-value">
	                    ${escapeHtml(roi)} %
	                </td>

	            </tr>


	            <tr>

	                <td class="info-label">
	                    Deposit Start Date
	                </td>

	                <td class="info-value">
	                    ${escapeHtml(policyStartDate)}
	                </td>


	                <td class="info-label">
	                    Maturity Date
	                </td>

	                <td class="info-value">
	                    ${escapeHtml(maturityDate)}
	                </td>

	            </tr>


	            <tr>

	                <td class="info-label">
	                    RD Term
	                </td>

	                <td class="info-value">
	                    ${escapeHtml(schemeTerm)}
	                </td>


	                <td class="info-label">
	                    Installment
	                </td>

	                <td class="info-value">
	                    ${money(installmentAmount)}
	                </td>

	            </tr>


	        </table>

	    </div>


	    <!-- =============================================
	         PAYMENT RECEIVED
	         ============================================= -->

	    <div class="payment-box">

	        <div class="payment-heading">
	            INSTALLMENT PAYMENT RECEIVED
	        </div>

	        <div class="payment-amount">
	            ${money(currentPayment)}
	        </div>

	        <div class="payment-word">
	            Amount received towards the above RD account
	        </div>

	    </div>


	    <!-- =============================================
	         PAYMENT DETAILS
	         ============================================= -->

	    <div class="section">

	        <div class="section-header">
	            Payment Details
	        </div>


	        <table class="payment-table">

	            <thead>

	                <tr>

	                    <th>
	                        Payment Date
	                    </th>

	                    <th>
	                        Installment No.
	                    </th>

	                    <th>
	                        Payment Mode
	                    </th>

	                    <th>
	                        Payment By
	                    </th>

	                    <th style="text-align:right;">
	                        Amount Received
	                    </th>

	                </tr>

	            </thead>


	            <tbody>

	                <tr>

	                    <td>
	                        ${escapeHtml(paymentDate)}
	                    </td>

	                    <td>
	                        ${escapeHtml(installmentText)}
	                    </td>

	                    <td>
	                        ${escapeHtml(modeOfPayment)}
	                    </td>

	                    <td>
	                        ${escapeHtml(paymentBy)}
	                    </td>

	                    <td class="amount-cell">
	                        ${money(currentPayment)}
	                    </td>

	                </tr>

	            </tbody>

	        </table>

	    </div>


	    <!-- =============================================
	         ACCOUNT SUMMARY
	         ============================================= -->

	    <div class="summary">


	        <div class="summary-box">

	            <div class="summary-label">
	                TOTAL PAID TO DATE
	            </div>

	            <div class="summary-value">
	                ${money(totalPaid)}
	            </div>

	        </div>


	        <div class="summary-box">

	            <div class="summary-label">
	                CURRENT AMOUNT DUE
	            </div>

	            <div class="summary-value">
	                ${money(amountDue)}
	            </div>

	        </div>


	        <div class="summary-box">

	            <div class="summary-label">
	                BALANCE
	            </div>

	            <div class="summary-value">
	                ${money(balance)}
	            </div>

	        </div>


	    </div>


	    <!-- =============================================
	         NEXT PAYMENT
	         ============================================= -->

	    <div class="section">

	        <div class="section-header">
	            Next Payment / Account Information
	        </div>


	        <table class="info-table">


	            <tr>

	                <td class="info-label">
	                    Next Due Date
	                </td>

	                <td class="info-value">
	                    ${escapeHtml(nextDueDate)}
	                </td>


	                <td class="info-label">
	                    Next Installment
	                </td>

	                <td class="info-value">
	                    ${money(installmentAmount)}
	                </td>

	            </tr>


	            <tr>

	                <td class="info-label">
	                    Branch
	                </td>

	                <td class="info-value">
	                    ${escapeHtml(branchName)}
	                </td>


	                <td class="info-label">
	                    Agent / Collector
	                </td>

	                <td class="info-value">
	                    ${escapeHtml(agent)}
	                </td>

	            </tr>


	            <tr>

	                <td class="info-label">
	                    Remarks
	                </td>

	                <td class="info-value" colspan="3">
	                    ${escapeHtml(remark)}
	                </td>

	            </tr>


	        </table>

	    </div>


	    <!-- =============================================
	         FOOTER
	         ============================================= -->

	    <div class="footer">


	        <div class="footer-left">

	            <strong>
	                Policy Status:
	            </strong>

	            ${policy.isApproved === true
									? "APPROVED"
									: "PENDING"
								}

	            <br>

	            <strong>
	                Receipt Type:
	            </strong>

	            RD INSTALLMENT PAYMENT

	            <br>

	            <strong>
	                Branch:
	            </strong>

	            ${escapeHtml(branchName)}

	        </div>


	        <div class="signature">

	            AUTHORIZED SIGNATURE

	        </div>


	    </div>


	    <div class="thank-you">

	        PAYMENT RECEIVED SUCCESSFULLY

	    </div>


	    <div class="note">

	        This is a system-generated receipt.
	        Please preserve this receipt for your records.

	    </div>


	</div>


	<script>

	window.onload = function () {

	    setTimeout(function () {

	        window.print();

	    }, 300);

	};


	window.onafterprint = function () {

	    setTimeout(function () {

	        window.close();

	    }, 200);

	};

	</script>


	</body>

	</html>

	`;


							// =================================================
							// WRITE HTML
							// =================================================

							printWindow.document.open();

							printWindow.document.write(
								receipt
							);

							printWindow.document.close();

						},


						error: function(
							xhr,
							status,
							error
						) {

							console.error(
								"Company API Error:",
								xhr,
								status,
								error
							);

							alert(
								"Unable to fetch company details."
							);
						}

					});

				},


				error: function(
					xhr,
					status,
					error
				) {

					console.error(
						"Policy API Error:",
						xhr,
						status,
						error
					);

					alert(
						"Unable to fetch policy details."
					);
				}

			});

		}
	);


});
