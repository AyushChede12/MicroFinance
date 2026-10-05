$(document).ready(function() {
	$.ajax({
		url: 'api/securedGoldLoan/getAllGoldLoanCustomer',
		type: 'GET',
		success: function(response) {
			// Check data
			if (!(response && response.data && Array.isArray(response.data))) {
				alert("No Gold Data found.");
				return;
			}

			// 👉 Step 1: Distinct Set banaye
			let distinctMap = new Map();
			// Map use kiya taaki GoldID ke hisab se latest/first customerName bhi mil jaye

			response.data.forEach(function(item) {
				let goldId = item.goldID || item.goldId;
				if (goldId && goldId.trim() !== "") {
					distinctMap.set(goldId.trim(), item.customerName);
				}
			});

			// 👉 Step 2: Select2 ke liye data convert
			let customerOptions = [];
			distinctMap.forEach((customerName, goldId) => {
				customerOptions.push({
					id: goldId,
					text: goldId + " - " + customerName
				});
			});

			// 👉 Step 3: Select2 Initialize (distinct data)
			$('#findByGoldLoanId').select2({
				placeholder: '-- Search Gold ID or Name --',
				data: customerOptions,
				matcher: function(params, data) {
					if ($.trim(params.term) === '') return data;
					if (typeof data.text === 'undefined') return null;

					const term = params.term.toLowerCase();
					const text = data.text.toLowerCase();
					return text.includes(term) ? data : null;
				}
			});
		},
		error: function(xhr, status, error) {
			console.error("Error fetching Gold Data:", error);
			alert("Failed to load Gold ID.");
		}
	});

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
					if (response.status == "OK") {
						let data = response.data[0];
						$("#loanDate").val(data.loanDate);
						$("#customerCode").val(data.memberCode);
						$("#customerName").val(data.customerName.toUpperCase());
						$("#contactNo").val(data.contactNo);
						$("#loanPlanName").val(data.loanPlanName.toUpperCase());
						$("#loanMode").val(data.loanMode.toUpperCase());
						$("#loanTerm").val(data.loanTerm.toUpperCase());
						$("#rateOfInterest").val(data.rateOfInterest);
						$("#loanAmount").val(data.loanAmount);
						$("#interestType").val(data.interestType.toUpperCase());
						$("#emiPayment").val(data.emiPayment.toUpperCase());

						//Gold Details
						$("#karat").val(data.karat.toUpperCase());
						$("#itemType").val(data.itemType);
						$("#custgoldRate").val(data.custgoldRate.toUpperCase());
						$("#itemName").val(data.itemName.toUpperCase());
						$("#lockerBranch").val(data.lockerBranch.toUpperCase());
						$("#purity").val(data.purity);
						$("#itemQty").val(data.itemQty);
						$("#itemWt").val(data.itemWt);
						$("#grossWt").val(data.grossWt);
						$("#stoneWt").val(data.stoneWt);
						$("#netWt").val(data.netWt);
						$("#marketValuation").val(data.marketValuation);
						$("#eligibleLoan").val(data.eligibleLoan);

						//Guarantor Details
						$("#guarantorcustomerCode").val(data.guarantorcustomerCode);
						$("#guarantorIdentity").val(data.guarantorIdentity);
						$("#guarantorAddress").val(data.guarantorAddress);
						$("#guarantorPinCode").val(data.guarantorPinCode);
						$("#guarantorContactNo").val(data.guarantorContactNo);
						$("#guarantorSecurityType").val(data.guarantorSecurityType);

						//CoApplicant Details
						$("#coApplicantMemberId").val(data.coApplicantMemberId);
						$("#coApplicantIdentity").val(data.coApplicantIdentity);
						$("#coApplicantAddress").val(data.coApplicantAddress);
						$("#coAge").val(data.coAge);
						$("#coApplicantContactNo").val(data.coApplicantContactNo);
						$("#securityDetails").val(data.securityDetails);

						//Deduction Details
						$("#processingFee").val(data.processingFee);
						$("#legalCharges").val(data.legalCharges);
						$("#stampDuty").val(data.stampDuty);
						$("#smsCharges").val(data.smsCharges);
						$("#mainCharges").val(data.mainCharges);
						$("#stationaryFee").val(data.stationaryFee);
						$("#gst").val(data.gst);
						$("#insuFee").val(data.insuFee);
						$("#penaltyCharge").val(data.penaltyCharge);
						$("#valuationFees").val(data.valuationFees);
						$("#overCharge").val(data.overCharge);
						$("#collectionCharge").val(data.collectionCharge);
						$("#financialConsultantId").val(data.financialConsultantId);
						$("#financialConsultantName").val(data.financialConsultantName);

						if (data.approvalStatus === true || data.approvalStatus === 1 || data.approvalStatus === "1") {
							$('#approvalStatus').val("Approved").css('color', 'green');
						} else {
							$('#approvalStatus').val("Not Approved").css('color', 'red');
						}

					} else {
						alert("No customer found for this member code.");
					}
				},
				error: function() {
					alert("Member not found or server error.");
				}
			});
		}
	});

	$("#generateDoc").click(function(e) {
		e.preventDefault();

		const goldId = $("#findByGoldLoanId").val();
		const docType = $("#loanDocument").val();

		if (!goldId) {
			alert("Please select a Gold Loan ID");
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
					let content = "";

					// BIND Item Name
					$("#itemName").val(goldData.itemName || "-");

					// --------------------- APPLICANT FORM (GOLD LOAN) ---------------------
					if (docType === "applicantForm") {
						content = `
	                    <div style="padding:20px; font-family:Arial; border:2px solid #000;">
	                        <h2 style="text-align:center;">Microfinance Cooperative Bank Ltd.</h2>
	                        <h4 style="text-align:center;">Branch: ${goldData.branchName || "-"}</h4>
	                        <h3 style="text-align:center; text-decoration:underline;">Gold Loan Application Form</h3>

	                        <h4>1. CUSTOMER DETAILS</h4>
	                        <table style="width:100%;" border="1" cellpadding="8">
	                            <tr>
	                                <td><b>Name</b></td><td>${goldData.customerName || "-"}</td>
	                                <td><b>Member ID</b></td><td>${goldData.memberCode || "-"}</td>
	                            </tr>
	                            <tr>
	                                <td><b>Address</b></td><td>${goldData.address || "-"}</td>
	                                <td><b>Mobile No.</b></td><td>${goldData.contactNo || "-"}</td>
	                            </tr>
	                        </table>

	                        <br>
	                        <h4>2. GOLD DETAILS</h4>
	                        <table style="width:100%;" border="1" cellpadding="8">
	                            <tr>
	                                <td><b>Gold ID</b></td><td>${goldData.goldID || "-"}</td>
	                                <td><b>Item Name</b></td><td>${goldData.itemName || "-"}</td>
	                            </tr>
	                            <tr>
	                                <td><b>Gross Weight</b></td><td>${goldData.grossWt || "-"}</td>
	                                <td><b>Net Weight</b></td><td>${goldData.netWt || "-"}</td>
	                            </tr>
	                            <tr>
	                                <td><b>Purity</b></td><td>${goldData.purity || "-"}</td>
	                                <td><b>Gold Rate</b></td><td>${goldData.custgoldRate || "-"}</td>
	                            </tr>
	                            <tr>
	                                <td><b>Valuation Amount</b></td>
	                                <td style="color:red;"><b>${goldData.marketValuation || "-"}</b></td>
	                                <td><b>Eligible Loan Amount</b></td>
	                                <td style="color:red;"><b>${goldData.loanAmount || "-"}</b></td>
	                            </tr>
	                        </table>

	                        <br>
	                        <h4>3. APPROVAL DETAILS</h4>
	                        <table style="width:100%;" border="1" cellpadding="8">
	                            <tr>
	                                <td><b>Approval Date</b></td><td>${goldData.approvalDate || "-"}</td>
	                                <td><b>Approval Status</b></td>
	                                <td style="color:red;font-weight:bold;">
	                                    ${goldData.approvalStatus == 1 ? "Approved" : "Not Approved"}
	                                </td>
	                            </tr>
	                        </table>

	                        <br><br>
	                        <div style="display:flex; justify-content:space-between;">
	                            <div>
	                                <p>________________________</p>
	                                <p>Applicant Signature</p>
	                            </div>
	                            <div>
	                                <p>________________________</p>
	                                <p>Bank Officer Signature</p>
	                            </div>
	                        </div>
	                    </div>`;
					}

					// --------------------- SANCTION LETTER (GOLD LOAN) ---------------------
					else if (docType === "sanctionLetter") {
						content = `
	                    <div style="padding:20px; font-family:Arial; border:2px solid #000;">
	                        <h2 style="text-align:center;">Microfinance Cooperative Bank Ltd.</h2>
	                        <h4 style="text-align:center;">Branch: ${goldData.branchName || "-"}</h4>
	                        <h3 style="text-align:center; text-decoration:underline;">Gold Loan Sanction Letter</h3>

	                        <p><b>Gold Loan ID:</b> ${goldData.goldID}</p>
	                        <p><b>Approval Date:</b> ${goldData.approvalDate}</p>

	                        <p><b>Dear ${goldData.customerName},</b><br>
	                        Your Gold Loan has been sanctioned with the following details:</p>

	                        <table style="width:100%;" border="1" cellpadding="8">
	                            <tr><td><b>Item Name</b></td><td>${goldData.itemName}</td></tr>
	                            <tr><td><b>Net Weight</b></td><td>${goldData.netWt}</td></tr>
	                            <tr><td><b>Purity</b></td><td>${goldData.purity}</td></tr>
	                            <tr><td><b>Valuation Amount</b></td><td>${goldData.marketValuation}</td></tr>
	                            <tr><td><b>Sanctioned Amount</b></td><td style="color:red;"><b>${goldData.loanAmount}</b></td></tr>
	                            <tr><td><b>Loan Term</b></td><td>${goldData.loanTerm}</td></tr>
	                            <tr><td><b>Rate of Interest</b></td><td>${goldData.rateOfInterest}</td></tr>
	                            <tr><td><b>EMI Amount</b></td><td>${goldData.emiPayment}</td></tr>
	                        </table>

	                        <br><br>
	                        <div style="display:flex; justify-content:space-between;">
	                            <div>
	                                <p>________________________</p>
	                                <p>Applicant Signature</p>
	                            </div>
	                            <div>
	                                <p>________________________</p>
	                                <p>Manager/Officer Signature</p>
	                            </div>
	                        </div>
	                    </div>`;
					}

					// --------------------- LOAN AGREEMENT (GOLD LOAN) ---------------------
					else if (docType === "loanAgreement") {
						content = `
					        <div style="padding:20px; font-family:Arial; border:2px solid #000; background:#fdfdfd;">
					            <h2 style="text-align:center; margin:0;">Microfinance Cooperative Bank Ltd.</h2>
					            <h4 style="text-align:center; margin:0;">Branch: ${goldData.branchName || "-"}</h4>
					            <h3 style="text-align:center; margin:15px 0; text-decoration:underline;">Gold Loan Agreement</h3>

					            <p><b>Date:</b> ${new Date().toLocaleDateString('en-GB')}</p>
					            <p><b>Gold Loan Reference No:</b> ${goldData.goldID || "-"}</p>

					            <p><b>This Gold Loan Agreement is executed on the date mentioned above, between Microfinance Cooperative Bank Ltd.
					             and Mr./Ms. ${goldData.customerName || "________"}.</b></p>

					            <p>
					                <b>Lender:</b> Microfinance Cooperative Bank Ltd., ${goldData.branchName || "-"}.<br>
					                <b>Borrower:</b> ${goldData.customerName || "-"}, residing at ${goldData.address || "-"}.
					            </p>

					            <h4 style="margin-top:20px; text-decoration:underline;">Gold Details</h4>
					            <table style="width:100%; border-collapse:collapse;" border="1">
					                <tr>
					                    <td><b>Item Name</b></td>
					                    <td>${goldData.itemName || "-"}</td>
					                </tr>
					                <tr>
					                    <td><b>Gold Purity</b></td>
					                    <td>${goldData.purity || "-"}</td>
					                </tr>
					                <tr>
					                    <td><b>Gold Weight</b></td>
					                    <td>${goldData.itemWt || "-"}</td>
					                </tr>
					                <tr>
					                    <td><b>Gold Rate (per gram)</b></td>
					                    <td>${goldData.custgoldRate || "-"}</td>
					                </tr>
					                <tr>
					                    <td><b>Net Worth (75%)</b></td>
					                    <td style="color:red; font-weight:bold;">${goldData.netWt || "-"}</td>
					                </tr>
					                <tr>
					                    <td><b>Item Type</b></td>
					                    <td>${goldData.itemType || "-"}</td>
					                </tr>
					            </table>

					            <h4 style="margin-top:20px; text-decoration:underline;">Loan Terms & Conditions</h4>
					            <ol style="padding-left:20px; margin-left:20px;">
					                <li>The Borrower agrees to repay the Gold Loan amount of 
					                    <b style="color:red">${goldData.loanAmount || "-"} Rs.</b> sanctioned on 
					                    <b>${goldData.dateOfLoan || "-"}</b> within a tenure of 
					                    <b>${goldData.loanTerm || "-"} months</b>.
					                </li>

					                <li>The Gold Loan carries an interest rate of 
					                    <b>${goldData.rateOfInterest || "-"}%</b> per annum, calculated as per 
					                    ${goldData.interestType || "the agreed"} method.
					                </li>

					                <li>The Borrower agrees to pay monthly EMI of 
					                    <b style="color:red">${goldData.emi || "-"} Rs.</b> or follow bullet repayment method (if applicable).
					                </li>

					                <li>The Borrower agrees to pay applicable charges including:
					                    <ul>
					                        <li>Processing Fee: <b>${goldData.processingFee || "-"} Rs.</b></li>
					                        <li>Valuation Charge: <b>${goldData.marketValuation || "-"} Rs.</b></li>
					                        <li>GST: <b>${goldData.gst || "-"} Rs.</b></li>
					                    </ul>
					                </li>

					                <li>The pledged gold ornaments will remain in the custody of the Bank until full loan repayment.</li>

					                <li>In case of default, the Bank reserves the right to sell the pledged gold to recover dues.</li>

					                <li>The Borrower declares that the gold pledged is self-owned and not stolen or disputed property.</li>
					            </ol>

					            <p style="margin-top:20px;">
					                Both parties hereby agree to abide by the terms and conditions mentioned above. 
					                This Agreement is executed in duplicate, with one copy each for the Borrower and the Bank.
					            </p>

					            <br><br>
					            <div style="display:flex; justify-content:space-between; margin-top:40px;">
					                <div>
					                    <p>________________________</p>
					                    <p>Borrower Signature</p>
					                </div>
					                <div>
					                    <p>________________________</p>
					                    <p>Authorized Signatory (Bank)</p>
					                </div>
					            </div>
					        </div>
					    `;
					}


					// FINAL STEP – DISPLAY CONTENT
					$("#receiptArea").html(content);
					$("#printBtn").show();
				}

				else {
					alert("No Gold Loan found");
					$("#receiptArea").html("");
				}
			},

			error: function() {
				alert("Error fetching gold loan data");
			}
		});
	});

});

function printDocument() {

	var content = document.getElementById("receiptArea").innerHTML;

	var printWindow = window.open("", "", "height=700,width=900");
	printWindow.document.write("<html><head><title>Print Document</title>");
	printWindow.document.write("</head><body >");
	printWindow.document.write(content);
	printWindow.document.write("</body></html>");
	printWindow.document.close();

	printWindow.print();
}