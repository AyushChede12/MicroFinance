// GOLD LOAN DOCUMENT PRINT & PREVIEW HANDLER
// BANKING STANDARD IMPLEMENTATION - ALL TEXT & ALERTS IN UPPERCASE
// DYNAMIC COMPANY HEADINGS FROM CompanyAdministration

let goldDocCompanyDetails = null;

$(document).ready(function() {
	loadCompanyDetails();
	loadGoldCustomersDropdown();
	bindDocumentEvents();
});

function loadCompanyDetails() {
	$.ajax({
		url: "api/preference/getCompanyDetails",
		type: "GET",
		dataType: "json",
		success: function(resp) {
			if (resp && resp.status === "OK" && resp.data) {
				goldDocCompanyDetails = resp.data;
			} else if (resp && resp.companyName) {
				goldDocCompanyDetails = resp;
			}
		},
		error: function(err) {
			console.warn("COULD NOT LOAD COMPANY DETAILS", err);
		}
	});
}

function loadGoldCustomersDropdown() {
	$.ajax({
		url: "api/securedGoldLoan/getAllGoldLoanCustomer",
		type: "GET",
		success: function(response) {
			if (!(response && response.data && Array.isArray(response.data))) {
				alert("NO GOLD DATA FOUND.");
				return;
			}

			let distinctMap = new Map();
			response.data.forEach(function(item) {
				let goldId = item.goldID || item.goldId;
				if (goldId && goldId.trim() !== "") {
					distinctMap.set(goldId.trim(), (item.customerName || "-").toUpperCase());
				}
			});

			let customerOptions = [];
			distinctMap.forEach((customerName, goldId) => {
				customerOptions.push({
					id: goldId,
					text: goldId + " - " + customerName
				});
			});

			$("#findByGoldLoanId").select2({
				placeholder: "-- SEARCH GOLD ID OR NAME --",
				data: customerOptions,
				matcher: function(params, data) {
					if ($.trim(params.term) === "") return data;
					if (typeof data.text === "undefined") return null;
					const term = params.term.toLowerCase();
					const text = data.text.toLowerCase();
					return text.includes(term) ? data : null;
				}
			});
		},
		error: function(xhr, status, error) {
			console.error("Error fetching Gold Data:", error);
			alert("FAILED TO LOAD GOLD ID.");
		}
	});
}

function bindDocumentEvents() {
	$("#findByGoldLoanId").change(function() {
		let findByGoldLoanId = $("#findByGoldLoanId").val();
		if (findByGoldLoanId !== "") {
			$.ajax({
				url: "api/securedGoldLoan/getByGoldIDforApproval",
				type: "POST",
				contentType: "application/json",
				data: JSON.stringify({
					goldID: findByGoldLoanId
				}),
				success: function(response) {
					if (response.status == "OK" && response.data && response.data.length > 0) {
						let data = response.data[0];
						$("#loanDate").val(data.loanDate || "");
						$("#customerCode").val(data.memberCode || "");
						$("#customerName").val((data.customerName || "").toUpperCase());
						$("#contactNo").val(data.contactNo || "");
						$("#loanPlanName").val((data.loanPlanName || "").toUpperCase());
						$("#loanMode").val((data.loanMode || "").toUpperCase());
						$("#loanTerm").val((data.loanTerm || "").toUpperCase());
						$("#rateOfInterest").val(data.rateOfInterest || "");
						$("#loanAmount").val(data.loanAmount || "");
						$("#interestType").val((data.interestType || "").toUpperCase());
						$("#emiPayment").val((data.emiPayment || "").toUpperCase());

						// Gold Details
						$("#karat").val((data.karat || "").toUpperCase());
						$("#itemType").val((data.itemType || "").toUpperCase());
						$("#custgoldRate").val((data.custgoldRate || "").toUpperCase());
						$("#itemName").val((data.itemName || "").toUpperCase());
						$("#lockerBranch").val((data.lockerBranch || "").toUpperCase());
						$("#purity").val(data.purity || "");
						$("#itemQty").val(data.itemQty || "");
						$("#itemWt").val(data.itemWt || "");
						$("#grossWt").val(data.grossWt || "");
						$("#stoneWt").val(data.stoneWt || "");
						$("#netWt").val(data.netWt || "");
						$("#marketValuation").val(data.marketValuation || "");
						$("#eligibleLoan").val(data.eligibleLoan || "");

						// Guarantor Details
						$("#guarantorcustomerCode").val(data.guarantorcustomerCode || "");
						$("#guarantorIdentity").val((data.guarantorIdentity || "").toUpperCase());
						$("#guarantorAddress").val((data.guarantorAddress || "").toUpperCase());
						$("#guarantorPinCode").val(data.guarantorPinCode || "");
						$("#guarantorContactNo").val(data.guarantorContactNo || "");
						$("#guarantorSecurityType").val((data.guarantorSecurityType || "").toUpperCase());

						// CoApplicant Details
						$("#coApplicantMemberId").val(data.coApplicantMemberId || "");
						$("#coApplicantIdentity").val((data.coApplicantIdentity || "").toUpperCase());
						$("#coApplicantAddress").val((data.coApplicantAddress || "").toUpperCase());
						$("#coAge").val(data.coAge || "");
						$("#coApplicantContactNo").val(data.coApplicantContactNo || "");
						$("#securityDetails").val((data.securityDetails || "").toUpperCase());

						// Deduction Details
						$("#processingFee").val(data.processingFee || "0.00");
						$("#legalCharges").val(data.legalCharges || "0.00");
						$("#stampDuty").val(data.stampDuty || "0.00");
						$("#smsCharges").val(data.smsCharges || "0.00");
						$("#mainCharges").val(data.mainCharges || "0.00");
						$("#stationaryFee").val(data.stationaryFee || "0.00");
						$("#gst").val(data.gst || "0.00");
						$("#insuFee").val(data.insuFee || "0.00");
						$("#penaltyCharge").val(data.penaltyCharge || "0.00");
						$("#valuationFees").val(data.valuationFees || "0.00");
						$("#overCharge").val(data.overCharge || "0.00");
						$("#collectionCharge").val(data.collectionCharge || "0.00");
						$("#financialConsultantId").val(data.financialConsultantId || "");
						$("#financialConsultantName").val((data.financialConsultantName || "").toUpperCase());

						if (data.approvalStatus === true || data.approvalStatus === 1 || data.approvalStatus === "1") {
							$("#approvalStatus").val("APPROVED").css("color", "green");
						} else {
							$("#approvalStatus").val("NOT APPROVED").css("color", "red");
						}

					} else {
						alert("NO CUSTOMER FOUND FOR THIS MEMBER CODE.");
					}
				},
				error: function() {
					alert("MEMBER NOT FOUND OR SERVER ERROR.");
				}
			});
		}
	});

	$("#generateDoc").click(function(e) {
		e.preventDefault();

		const goldId = $("#findByGoldLoanId").val();
		const docType = $("#loanDocument").val();

		if (!goldId) {
			alert("PLEASE SELECT A GOLD LOAN ID");
			return;
		}
		if (!docType) {
			alert("PLEASE SELECT A DOCUMENT TYPE TO PRINT");
			return;
		}

		$.ajax({
			url: "api/securedGoldLoan/getByGoldIDforApproval",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify({ goldID: goldId }),
			success: function(result) {
				if (result && result.data && result.data.length > 0) {
					const goldData = result.data[0];
					const c = goldDocCompanyDetails || {};
					const companyName = (c.companyName ? c.companyName : "CO OPERATIVE SOCIETY LTD NAGPUR").trim().toUpperCase();
					const address = (c.address ? c.address : "ADMINISTRATIVE HEAD OFFICE").trim().toUpperCase();
					const cin = (c.cinNo ? "CIN: " + c.cinNo : "").trim().toUpperCase();
					const helpline = (c.helplineNo ? "HELPLINE: " + c.helplineNo : "").trim().toUpperCase();
					const email = (c.emailId ? "EMAIL: " + c.emailId : "").trim().toUpperCase();
					const metaSub = [cin, helpline, email].filter(Boolean).join(" | ");
					const branchName = (goldData.branchName || "HEAD OFFICE").toUpperCase();

					function formatInr(val) {
						const n = Number(val) || 0;
						return '₹ ' + n.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
					}

					let headerHtml = `
						<div style="text-align:center; border-bottom:2px solid #0d6efd; padding-bottom:10px; margin-bottom:18px;">
							<h2 style="margin:0; font-size:20px; font-weight:bold; color:#0d6efd; letter-spacing:0.5px;">${companyName}</h2>
							<p style="margin:3px 0; font-size:11.5px; color:#555;">${address}</p>
							${metaSub ? `<p style="margin:0; font-size:11px; color:#666;">${metaSub}</p>` : ""}
							<h4 style="margin:4px 0 0 0; font-size:12px; font-weight:600; color:#333;">BRANCH: ${branchName}</h4>
						</div>
					`;

					let content = "";

					// 1. APPLICANT FORM
					if (docType === "applicantForm") {
						content = `
						<div style="padding:25px; font-family:Arial, sans-serif; border:2px solid #222; background:#fff; line-height:1.5;">
							${headerHtml}
							<h3 style="text-align:center; text-decoration:underline; font-size:16px; font-weight:bold; margin-bottom:15px;">GOLD LOAN APPLICATION FORM</h3>

							<h5 style="margin:10px 0 6px 0; font-weight:bold; font-size:13px; color:#0d6efd;">1. CUSTOMER &amp; MEMBERSHIP DETAILS</h5>
							<table style="width:100%; border-collapse:collapse; margin-bottom:14px;" border="1" cellpadding="6">
								<tr style="background:#f8f9fa;">
									<td style="width:25%;"><b>CUSTOMER NAME</b></td><td style="width:25%;">${(goldData.customerName || "-").toUpperCase()}</td>
									<td style="width:25%;"><b>MEMBER CODE / ID</b></td><td style="width:25%;">${(goldData.memberCode || "-").toUpperCase()}</td>
								</tr>
								<tr>
									<td><b>CONTACT NUMBER</b></td><td>${goldData.contactNo || "-"}</td>
									<td><b>APPLICATION DATE</b></td><td>${goldData.loanDate || "-"}</td>
								</tr>
								<tr>
									<td><b>RESIDENTIAL ADDRESS</b></td><td colspan="3">${(goldData.address || "-").toUpperCase()} - ${goldData.pinCode || ""}</td>
								</tr>
							</table>

							<h5 style="margin:10px 0 6px 0; font-weight:bold; font-size:13px; color:#0d6efd;">2. PLEDGED GOLD / SILVER SECURITY DETAILS</h5>
							<table style="width:100%; border-collapse:collapse; margin-bottom:14px;" border="1" cellpadding="6">
								<tr style="background:#f8f9fa;">
									<td style="width:25%;"><b>GOLD ACCOUNT ID</b></td><td style="width:25%;"><b>${goldData.goldID || "-"}</b></td>
									<td style="width:25%;"><b>ARTICLE / ITEM NAME</b></td><td style="width:25%;">${(goldData.itemName || "-").toUpperCase()}</td>
								</tr>
								<tr>
									<td><b>GROSS WEIGHT</b></td><td>${goldData.grossWt || "-"} G</td>
									<td><b>NET PURITY WEIGHT</b></td><td>${goldData.netWt || "-"} G</td>
								</tr>
								<tr>
									<td><b>PURITY / KARAT</b></td><td>${(goldData.karat || "-").toUpperCase()} (${goldData.purity || "-"}%)</td>
									<td><b>TODAY'S RATE (PER G)</b></td><td>${formatInr(goldData.custgoldRate)}</td>
								</tr>
								<tr>
									<td><b>APPRAISED VALUATION</b></td><td><b>${formatInr(goldData.marketValuation)}</b></td>
									<td><b>LOAN AMOUNT APPLIED</b></td><td><strong style="color:#0d6efd;">${formatInr(goldData.loanAmount)}</strong></td>
								</tr>
							</table>

							<h5 style="margin:10px 0 6px 0; font-weight:bold; font-size:13px; color:#0d6efd;">3. UNDERWRITING &amp; APPROVAL STATUS</h5>
							<table style="width:100%; border-collapse:collapse; margin-bottom:14px;" border="1" cellpadding="6">
								<tr style="background:#f8f9fa;">
									<td style="width:25%;"><b>APPROVAL DATE</b></td><td style="width:25%;">${goldData.approvalDate || "--"}</td>
									<td style="width:25%;"><b>APPROVAL STATUS</b></td>
									<td style="width:25%;"><strong style="color:${goldData.approvalStatus == 1 ? 'green' : 'red'};">${goldData.approvalStatus == 1 ? 'APPROVED' : 'PENDING'}</strong></td>
								</tr>
							</table>

							<table style="width:100%; margin-top:40px; border:none;">
								<tr>
									<td style="width:50%; text-align:left; border:none;">
										____________________________<br>
										<b>APPLICANT SIGNATURE</b>
									</td>
									<td style="width:50%; text-align:right; border:none;">
										FOR <b>${companyName}</b><br><br>
										____________________________<br>
										<b>GOLD APPRAISER / BRANCH OFFICER</b>
									</td>
								</tr>
							</table>
						</div>`;
					}

					// 2. SANCTION LETTER
					else if (docType === "sanctionLetter") {
						content = `
						<div style="padding:25px; font-family:Arial, sans-serif; border:2px solid #222; background:#fff; line-height:1.5;">
							${headerHtml}
							<h3 style="text-align:center; text-decoration:underline; font-size:16px; font-weight:bold; margin-bottom:15px;">OFFICIAL GOLD LOAN SANCTION LETTER</h3>

							<div style="display:flex; justify-content:space-between; margin-bottom:15px; font-size:12.5px;">
								<div><b>REF NO:</b> SANCT-${goldData.goldID}</div>
								<div><b>SANCTION DATE:</b> ${goldData.approvalDate || goldData.loanDate || "-"}</div>
							</div>

							<p style="font-size:13px;">DEAR <b>${(goldData.customerName || "-").toUpperCase()}</b> (MEMBER CODE: <b>${(goldData.memberCode || "-").toUpperCase()}</b>),<br>
							WE ARE PLEASED TO INFORM YOU THAT YOUR APPLICATION FOR SECURED GOLD LOAN HAS BEEN SANCTIONED AS PER THE FOLLOWING TERMS:</p>

							<table style="width:100%; border-collapse:collapse; margin-bottom:15px;" border="1" cellpadding="6">
								<tr style="background:#f8f9fa;"><td style="width:30%;"><b>GOLD LOAN ID</b></td><td><b>${goldData.goldID}</b></td></tr>
								<tr><td><b>LOAN PRODUCT / SCHEME</b></td><td>${(goldData.loanPlanName || "GOLD SECURE LOAN").toUpperCase()}</td></tr>
								<tr><td><b>PLEDGED COLLATERAL ARTICLE</b></td><td>${(goldData.itemName || "-").toUpperCase()} (${goldData.netWt || "-"} G NET, ${goldData.karat || "-"} K)</td></tr>
								<tr><td><b>APPRAISED MARKET VALUATION</b></td><td>${formatInr(goldData.marketValuation)}</td></tr>
								<tr style="background:#eef5fc;"><td><b>SANCTIONED PRINCIPAL AMOUNT</b></td><td><strong style="color:#0d6efd; font-size:14px;">${formatInr(goldData.loanAmount)}</strong></td></tr>
								<tr><td><b>RATE OF INTEREST</b></td><td>${goldData.rateOfInterest || "-"}% P.A. (${(goldData.interestType || "FLAT").toUpperCase()})</td></tr>
								<tr><td><b>TENURE (MONTHS)</b></td><td>${goldData.loanTerm || "-"} MONTHS</td></tr>
								<tr><td><b>EQUATED MONTHLY INSTALLMENT (EMI)</b></td><td><strong>${formatInr(goldData.emiPayment)}</strong></td></tr>
								<tr><td><b>REPAYMENT MODE</b></td><td>${(goldData.loanMode || "MONTHLY").toUpperCase()}</td></tr>
							</table>

							<p style="font-size:12px; color:#444;">NOTE: KINDLY EXECUTE THE LOAN AGREEMENT AND DELIVER THE PLEDGED ARTICLES TO THE LOCKER CUSTODIAN TO AVAIL IMMEDIATE DISBURSEMENT.</p>

							<table style="width:100%; margin-top:40px; border:none;">
								<tr>
									<td style="width:50%; text-align:left; border:none;">
										____________________________<br>
										<b>BORROWER ACCEPTANCE</b>
									</td>
									<td style="width:50%; text-align:right; border:none;">
										FOR <b>${companyName}</b><br><br>
										____________________________<br>
										<b>AUTHORIZED SIGNATORY / BRANCH MANAGER</b>
									</td>
								</tr>
							</table>
						</div>`;
					}

					// 3. LOAN AGREEMENT
					else if (docType === "loanAgreement") {
						content = `
						<div style="padding:25px; font-family:Arial, sans-serif; border:2px solid #222; background:#fff; line-height:1.6;">
							${headerHtml}
							<h3 style="text-align:center; text-decoration:underline; font-size:16px; font-weight:bold; margin-bottom:15px;">SECURED GOLD LOAN AGREEMENT &amp; PLEDGE DEED</h3>

							<p style="font-size:12.5px;">THIS AGREEMENT IS ENTERED INTO ON THIS DATE <b>${goldData.loanDate || new Date().toISOString().split("T")[0]}</b> BY AND BETWEEN:</p>
							<p style="font-size:12.5px;">
								<b>1. THE LENDER:</b> <b>${companyName}</b>, HAVING ITS REGISTERED/ADMINISTRATIVE OFFICE AT ${address} (HEREINAFTER CALLED THE 'SOCIETY').<br>
								<b>2. THE BORROWER:</b> <b>${(goldData.customerName || "-").toUpperCase()}</b>, MEMBER CODE: <b>${(goldData.memberCode || "-").toUpperCase()}</b>, RESIDING AT ${(goldData.address || "-").toUpperCase()}.
							</p>

							<h5 style="margin:12px 0 6px 0; font-weight:bold; font-size:13px; text-decoration:underline;">SCHEDULE OF PLEDGED GOLD ARTICLES</h5>
							<table style="width:100%; border-collapse:collapse; margin-bottom:12px;" border="1" cellpadding="6">
								<tr style="background:#f8f9fa;">
									<td><b>ITEM DESCRIPTION</b></td><td>${(goldData.itemName || "-").toUpperCase()}</td>
									<td><b>PURITY / KARAT</b></td><td>${(goldData.karat || "-").toUpperCase()}</td>
								</tr>
								<tr>
									<td><b>GROSS WEIGHT</b></td><td>${goldData.grossWt || "-"} G</td>
									<td><b>NET PURE WEIGHT</b></td><td>${goldData.netWt || "-"} G</td>
								</tr>
								<tr>
									<td><b>APPRAISED VALUE</b></td><td>${formatInr(goldData.marketValuation)}</td>
									<td><b>LOCKER CUSTODY BRANCH</b></td><td>${(goldData.lockerBranch || branchName).toUpperCase()}</td>
								</tr>
							</table>

							<h5 style="margin:12px 0 6px 0; font-weight:bold; font-size:13px; text-decoration:underline;">KEY TERMS &amp; COVENANTS</h5>
							<ol style="font-size:12px; padding-left:20px; margin:0 0 15px 0;">
								<li>THE BORROWER ACKNOWLEDGES RECEIPT OF SANCTIONED AMOUNT OF <b>${formatInr(goldData.loanAmount)}</b> AT AN ROI OF <b>${goldData.rateOfInterest || "-"}% P.A.</b> FOR A PERIOD OF <b>${goldData.loanTerm || "-"} MONTHS</b>.</li>
								<li>THE BORROWER AGREES TO TIMELY REPAY MONTHLY EMI OF <b>${formatInr(goldData.emiPayment)}</b> OR BULLET PAYMENT AS MUTUALLY CONTRACTED.</li>
								<li>THE PLEDGED ARTICLES SHALL REMAIN IN THE SECURE SAFE CUSTODY OF <b>${companyName}</b> UNTIL FULL REPAYMENT AND LIQUIDATION OF DUES.</li>
								<li>THE BORROWER CERTIFIES ABSOLUTE SOLE OWNERSHIP OF PLEDGED SECURITY WITH NO ENCUMBRANCE OR THIRD PARTY CLAIM.</li>
							</ol>

							<table style="width:100%; margin-top:35px; border:none;">
								<tr>
									<td style="width:50%; text-align:left; border:none;">
										____________________________<br>
										<b>BORROWER SIGNATURE</b>
									</td>
									<td style="width:50%; text-align:right; border:none;">
										FOR <b>${companyName}</b><br><br>
										____________________________<br>
										<b>AUTHORIZED SIGNATORY</b>
									</td>
								</tr>
							</table>
						</div>`;
					}

					// 4. REPAYMENT SCHEDULE
					else if (docType === "repaymentSchedule") {
						content = `
						<div style="padding:25px; font-family:Arial, sans-serif; border:2px solid #222; background:#fff; line-height:1.5;">
							${headerHtml}
							<h3 style="text-align:center; text-decoration:underline; font-size:16px; font-weight:bold; margin-bottom:15px;">GOLD LOAN REPAYMENT SCHEDULE</h3>

							<table style="width:100%; border-collapse:collapse; margin-bottom:15px;" border="1" cellpadding="6">
								<tr style="background:#f8f9fa;">
									<td><b>GOLD ID</b></td><td><b>${goldData.goldID}</b></td>
									<td><b>CUSTOMER NAME</b></td><td>${(goldData.customerName || "-").toUpperCase()}</td>
								</tr>
								<tr>
									<td><b>SANCTIONED AMOUNT</b></td><td><b>${formatInr(goldData.loanAmount)}</b></td>
									<td><b>TENURE (MONTHS)</b></td><td>${goldData.loanTerm || "-"} MONTHS</td>
								</tr>
								<tr>
									<td><b>INTEREST RATE</b></td><td>${goldData.rateOfInterest || "-"}% P.A.</td>
									<td><b>ESTIMATED MONTHLY EMI</b></td><td><b style="color:#0d6efd;">${formatInr(goldData.emiPayment)}</b></td>
								</tr>
							</table>

							<div class="alert alert-info py-2" style="font-size:12px;">
								MONTHLY INSTALLMENTS ARE PAYABLE ON OR BEFORE THE SCHEDULED DUE DATE EVERY MONTH.
							</div>

							<table style="width:100%; margin-top:35px; border:none;">
								<tr>
									<td style="width:50%; text-align:left; border:none;">
										____________________________<br>
										<b>BORROWER ACKNOWLEDGMENT</b>
									</td>
									<td style="width:50%; text-align:right; border:none;">
										FOR <b>${companyName}</b><br><br>
										____________________________<br>
										<b>AUTHORIZED SIGNATORY</b>
									</td>
								</tr>
							</table>
						</div>`;
					}

					// 5. DISBURSEMENT RECEIPT
					else if (docType === "disbursementReceipt") {
						let gross = Number(goldData.loanAmount) || 0;
						let proc = Number(goldData.processingFee) || 0;
						let legal = Number(goldData.legalCharges) || 0;
						let gst = Number(goldData.gst) || 0;
						let val = Number(goldData.valuationFees) || 0;
						let totalDed = proc + legal + gst + val;
						let net = gross - totalDed;
						if (net <= 0) net = gross;

						content = `
						<div style="padding:25px; font-family:Arial, sans-serif; border:2px solid #222; background:#fff; line-height:1.5;">
							${headerHtml}
							<h3 style="text-align:center; text-decoration:underline; font-size:16px; font-weight:bold; margin-bottom:15px;">GOLD LOAN DISBURSEMENT RECEIPT</h3>

							<table style="width:100%; border-collapse:collapse; margin-bottom:15px;" border="1" cellpadding="6">
								<tr style="background:#f8f9fa;">
									<td><b>RECEIPT NO.</b></td><td>DISB-${goldData.goldID}</td>
									<td><b>DISBURSEMENT DATE</b></td><td>${goldData.approvalDate || goldData.loanDate || "-"}</td>
								</tr>
								<tr>
									<td><b>BORROWER NAME</b></td><td>${(goldData.customerName || "-").toUpperCase()}</td>
									<td><b>MEMBER CODE</b></td><td>${(goldData.memberCode || "-").toUpperCase()}</td>
								</tr>
								<tr>
									<td><b>GROSS SANCTIONED AMOUNT</b></td><td><b>${formatInr(gross)}</b></td>
									<td><b>DISBURSEMENT MODE</b></td><td>DIRECT BANK / SAVINGS ACCOUNT</td>
								</tr>
								<tr>
									<td><b>PROCESSING &amp; VALUATION CHARGES</b></td><td>${formatInr(totalDed)}</td>
									<td><b>NET DISBURSED AMOUNT</b></td><td><strong style="color:#0d6efd; font-size:14px;">${formatInr(net)}</strong></td>
								</tr>
							</table>

							<p style="font-size:12px;">I HEREBY ACKNOWLEDGE THE RECEIPT OF THE NET DISBURSED AMOUNT AS SPECIFIED ABOVE FOR GOLD LOAN ACCOUNT <b>${goldData.goldID}</b>.</p>

							<table style="width:100%; margin-top:35px; border:none;">
								<tr>
									<td style="width:50%; text-align:left; border:none;">
										____________________________<br>
										<b>BORROWER SIGNATURE</b>
									</td>
									<td style="width:50%; text-align:right; border:none;">
										FOR <b>${companyName}</b><br><br>
										____________________________<br>
										<b>CASHIER / DISBURSEMENT OFFICER</b>
									</td>
								</tr>
							</table>
						</div>`;
					}

					// 6. GUARANTOR DECLARATION
					else if (docType === "guarantorDeclaration") {
						content = `
						<div style="padding:25px; font-family:Arial, sans-serif; border:2px solid #222; background:#fff; line-height:1.6;">
							${headerHtml}
							<h3 style="text-align:center; text-decoration:underline; font-size:16px; font-weight:bold; margin-bottom:15px;">GUARANTOR / CO-APPLICANT UNDERTAKING</h3>

							<p style="font-size:13px;">TO: <b>${companyName}</b></p>
							<p style="font-size:12.5px;">IN CONSIDERATION OF YOUR GRANTING A SECURED GOLD LOAN FACILITY OF <b>${formatInr(goldData.loanAmount)}</b> TO THE BORROWER <b>${(goldData.customerName || "-").toUpperCase()}</b> UNDER ACCOUNT ID <b>${goldData.goldID}</b>, I/WE HEREBY DECLARE:</p>

							<table style="width:100%; border-collapse:collapse; margin-bottom:15px;" border="1" cellpadding="6">
								<tr style="background:#f8f9fa;">
									<td><b>GUARANTOR NAME</b></td><td>${(goldData.guarantorIdentity || "-").toUpperCase()}</td>
									<td><b>GUARANTOR CODE</b></td><td>${(goldData.guarantorcustomerCode || "-").toUpperCase()}</td>
								</tr>
								<tr>
									<td><b>GUARANTOR CONTACT</b></td><td>${goldData.guarantorContactNo || "-"}</td>
									<td><b>ADDRESS</b></td><td>${(goldData.guarantorAddress || "-").toUpperCase()}</td>
								</tr>
							</table>

							<p style="font-size:12px;">I/WE HEREBY UNDERTAKE TO BE JOINTLY AND SEVERALLY LIABLE FOR THE SATISFACTORY REPAYMENT OF ALL OUTSTANDING DUES UNDER THIS ACCOUNT.</p>

							<table style="width:100%; margin-top:35px; border:none;">
								<tr>
									<td style="width:50%; text-align:left; border:none;">
										____________________________<br>
										<b>GUARANTOR SIGNATURE</b>
									</td>
									<td style="width:50%; text-align:right; border:none;">
										FOR <b>${companyName}</b><br><br>
										____________________________<br>
										<b>AUTHORIZED SIGNATORY</b>
									</td>
								</tr>
							</table>
						</div>`;
					}

					// 7. NOC
					else if (docType === "noc") {
						content = `
						<div style="padding:25px; font-family:Arial, sans-serif; border:2px solid #222; background:#fff; line-height:1.6;">
							${headerHtml}
							<h3 style="text-align:center; text-decoration:underline; font-size:16px; font-weight:bold; margin-bottom:15px;">NO OBJECTION CERTIFICATE (NOC) / LOAN CLEARANCE</h3>

							<p style="font-size:13px;">DATE: <b>${new Date().toISOString().split("T")[0]}</b></p>
							<p style="font-size:13px; text-align:justify;">THIS IS TO CERTIFY THAT SECURED GOLD LOAN ACCOUNT <b>${goldData.goldID}</b> HELD BY <b>${(goldData.customerName || "-").toUpperCase()}</b> (MEMBER ID: <b>${(goldData.memberCode || "-").toUpperCase()}</b>) HAS BEEN FULLY REPAID, CLOSED, AND SETTLED IN THE RECORDS OF <b>${companyName}</b>.</p>
							<p style="font-size:13px;">THERE ARE NO OUTSTANDING DUES AGAINST THIS LOAN ACCOUNT AND PLEDGED SECURITY HAS BEEN RELEASED.</p>

							<table style="width:100%; margin-top:40px; border:none;">
								<tr>
									<td style="width:50%; text-align:left; border:none;">
										____________________________<br>
										<b>BORROWER ACKNOWLEDGMENT</b>
									</td>
									<td style="width:50%; text-align:right; border:none;">
										FOR <b>${companyName}</b><br><br>
										____________________________<br>
										<b>BRANCH MANAGER / AUTHORIZED SIGNATORY</b>
									</td>
								</tr>
							</table>
						</div>`;
					}

					$("#receiptArea").html(content);
					$("#printBtn").show();
				} else {
					alert("NO GOLD LOAN DATA FOUND FOR SELECTED ID");
					$("#receiptArea").html("");
					$("#printBtn").hide();
				}
			},
			error: function() {
				alert("ERROR FETCHING GOLD LOAN DATA");
			}
		});
	});
}

function printDocument() {
	const content = document.getElementById("receiptArea").innerHTML;
	const win = window.open("", "", "height=750,width=950");
	win.document.write(`
        <html>
        <head>
            <title>GOLD LOAN DOCUMENT PRINT</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body { font-family: Arial, sans-serif; padding: 25px; color: #111; }
                button { display: none !important; }
                @media print {
                    button { display: none !important; }
                }
            </style>
        </head>
        <body>
            ${content}
        </body>
        </html>
    `);
	win.document.close();
	setTimeout(function() {
		win.print();
	}, 250);
}
