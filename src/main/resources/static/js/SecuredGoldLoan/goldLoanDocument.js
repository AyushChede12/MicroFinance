$(document).ready(function() {
	$.ajax({
		url: 'api/securedGoldLoan/getAllGoldLoanCustomer',
		type: 'GET',
		success: function(response) {
			// Check data
			if (!(response && response.data && Array.isArray(response.data))) {
				alert("NO GOLD DATA FOUND.");
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
				placeholder: '-- SEARCH GOLD ID OR NAME --',
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
			alert("FAILED TO LOAD GOLD ID.");
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
							$('#approvalStatus').val("APPROVED").css('color', 'green');
						} else {
							$('#approvalStatus').val("NOT APPROVED").css('color', 'red');
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
                        <h2 style="text-align:center;">MICROFINANCE COOPERATIVE BANK LTD.</h2>
                        <h4 style="text-align:center;">BRANCH: ${goldData.branchName || "-"}</h4>
                        <h3 style="text-align:center; text-decoration:underline;">GOLD LOAN APPLICATION FORM</h3>

                        <h4>1. CUSTOMER DETAILS</h4>
                        <table style="width:100%;" border="1" cellpadding="8">
                            <tr>
                                <td><b>NAME</b></td><td>${goldData.customerName || "-"}</td>
                                <td><b>MEMBER ID</b></td><td>${goldData.memberCode || "-"}</td>
                            </tr>
                            <tr>
                                <td><b>ADDRESS</b></td><td>${goldData.address || "-"}</td>
                                <td><b>MOBILE NO.</b></td><td>${goldData.contactNo || "-"}</td>
                            </tr>
                        </table>

                        <br>
                        <h4>2. GOLD DETAILS</h4>
                        <table style="width:100%;" border="1" cellpadding="8">
                            <tr>
                                <td><b>GOLD ID</b></td><td>${goldData.goldID || "-"}</td>
                                <td><b>ITEM NAME</b></td><td>${goldData.itemName || "-"}</td>
                            </tr>
                            <tr>
                                <td><b>GROSS WEIGHT</b></td><td>${goldData.grossWt || "-"}</td>
                                <td><b>NET WEIGHT</b></td><td>${goldData.netWt || "-"}</td>
                            </tr>
                            <tr>
                                <td><b>PURITY</b></td><td>${goldData.purity || "-"}</td>
                                <td><b>GOLD RATE</b></td><td>${goldData.custgoldRate || "-"}</td>
                            </tr>
                            <tr>
                                <td><b>VALUATION AMOUNT</b></td>
                                <td style="color:red;"><b>${goldData.marketValuation || "-"}</b></td>
                                <td><b>ELIGIBLE LOAN AMOUNT</b></td>
                                <td style="color:red;"><b>${goldData.loanAmount || "-"}</b></td>
                            </tr>
                        </table>

                        <br>
                        <h4>3. APPROVAL DETAILS</h4>
                        <table style="width:100%;" border="1" cellpadding="8">
                            <tr>
                                <td><b>APPROVAL DATE</b></td><td>${goldData.approvalDate || "-"}</td>
                                <td><b>APPROVAL STATUS</b></td>
                                <td style="color:red;font-weight:bold;">
                                    ${goldData.approvalStatus == 1 ? "APPROVED" : "NOT APPROVED"}
                                </td>
                            </tr>
                        </table>

                        <br><br>
                        <div style="display:flex; justify-content:space-between;">
                            <div>
                                <p>________________________</p>
                                <p>APPLICANT SIGNATURE</p>
                            </div>
                            <div>
                                <p>________________________</p>
                                <p>BANK OFFICER SIGNATURE</p>
                            </div>
                        </div>
                    </div>`;
					}

					// --------------------- SANCTION LETTER (GOLD LOAN) ---------------------
					else if (docType === "sanctionLetter") {
						content = `
                    <div style="padding:20px; font-family:Arial; border:2px solid #000;">
                        <h2 style="text-align:center;">MICROFINANCE COOPERATIVE BANK LTD.</h2>
                        <h4 style="text-align:center;">BRANCH: ${goldData.branchName || "-"}</h4>
                        <h3 style="text-align:center; text-decoration:underline;">GOLD LOAN SANCTION LETTER</h3>

                        <p><b>GOLD LOAN ID:</b> ${goldData.goldID}</p>
                        <p><b>APPROVAL DATE:</b> ${goldData.approvalDate}</p>

                        <p><b>DEAR ${goldData.customerName},</b><br>
                        YOUR GOLD LOAN HAS BEEN SANCTIONED WITH THE FOLLOWING DETAILS:</p>

                        <table style="width:100%;" border="1" cellpadding="8">
                            <tr><td><b>ITEM NAME</b></td><td>${goldData.itemName}</td></tr>
                            <tr><td><b>NET WEIGHT</b></td><td>${goldData.netWt}</td></tr>
                            <tr><td><b>PURITY</b></td><td>${goldData.purity}</td></tr>
                            <tr><td><b>VALUATION AMOUNT</b></td><td>${goldData.marketValuation}</td></tr>
                            <tr><td><b>SANCTIONED AMOUNT</b></td><td style="color:red;"><b>${goldData.loanAmount}</b></td></tr>
                            <tr><td><b>LOAN TERM</b></td><td>${goldData.loanTerm}</td></tr>
                            <tr><td><b>RATE OF INTEREST</b></td><td>${goldData.rateOfInterest}</td></tr>
                            <tr><td><b>EMI AMOUNT</b></td><td>${goldData.emiPayment}</td></tr>
                        </table>

                        <br><br>
                        <div style="display:flex; justify-content:space-between;">
                            <div>
                                <p>________________________</p>
                                <p>APPLICANT SIGNATURE</p>
                            </div>
                            <div>
                                <p>________________________</p>
                                <p>MANAGER/OFFICER SIGNATURE</p>
                            </div>
                        </div>
                    </div>`;
					}

					// --------------------- LOAN AGREEMENT (GOLD LOAN) ---------------------
					else if (docType === "loanAgreement") {
						content = `
				        <div style="padding:20px; font-family:Arial; border:2px solid #000; background:#fdfdfd;">
				            <h2 style="text-align:center; margin:0;">MICROFINANCE COOPERATIVE BANK LTD.</h2>
				            <h4 style="text-align:center; margin:0;">BRANCH: ${goldData.branchName || "-"}</h4>
				            <h3 style="text-align:center; margin:15px 0; text-decoration:underline;">GOLD LOAN AGREEMENT</h3>

				            <p><b>DATE:</b> ${new Date().toLocaleDateString('en-GB')}</p>
				            <p><b>GOLD LOAN REFERENCE NO:</b> ${goldData.goldID || "-"}</p>

				            <p><b>THIS GOLD LOAN AGREEMENT IS EXECUTED ON THE DATE MENTIONED ABOVE, BETWEEN MICROFINANCE COOPERATIVE BANK LTD.
				             AND MR./MS. ${goldData.customerName || "________"}.</b></p>

				            <p>
				                <b>LENDER:</b> MICROFINANCE COOPERATIVE BANK LTD., ${goldData.branchName || "-"}.<br>
				                <b>BORROWER:</b> ${goldData.customerName || "-"}, RESIDING AT ${goldData.address || "-"}.
				            </p>

				            <h4 style="margin-top:20px; text-decoration:underline;">GOLD DETAILS</h4>
				            <table style="width:100%; border-collapse:collapse;" border="1">
				                <tr>
				                    <td><b>ITEM NAME</b></td>
				                    <td>${goldData.itemName || "-"}</td>
				                </tr>
				                <tr>
				                    <td><b>GOLD PURITY</b></td>
				                    <td>${goldData.purity || "-"}</td>
				                </tr>
				                <tr>
				                    <td><b>GOLD WEIGHT</b></td>
				                    <td>${goldData.itemWt || "-"}</td>
				                </tr>
				                <tr>
				                    <td><b>GOLD RATE (PER GRAM)</b></td>
				                    <td>${goldData.custgoldRate || "-"}</td>
				                </tr>
				                <tr>
				                    <td><b>NET WORTH (75%)</b></td>
				                    <td style="color:red; font-weight:bold;">${goldData.netWt || "-"}</td>
				                </tr>
				                <tr>
				                    <td><b>ITEM TYPE</b></td>
				                    <td>${goldData.itemType || "-"}</td>
				                </tr>
				            </table>

				            <h4 style="margin-top:20px; text-decoration:underline;">LOAN TERMS & CONDITIONS</h4>
				            <ol style="padding-left:20px; margin-left:20px;">
				                <li>THE BORROWER AGREES TO REPAY THE GOLD LOAN AMOUNT OF&#x20;
				                    <b style="color:red">${goldData.loanAmount || "-"} RS.</b> SANCTIONED ON&#x20;
				                    <b>${goldData.dateOfLoan || "-"}</b> WITHIN A TENURE OF&#x20;
				                    <b>${goldData.loanTerm || "-"} MONTHS</b>.
				                </li>

				                <li>THE GOLD LOAN CARRIES AN INTEREST RATE OF&#x20;
				                    <b>${goldData.rateOfInterest || "-"}%</b> PER ANNUM, CALCULATED AS PER&#x20;
				                    ${goldData.interestType || "THE AGREED"} METHOD.
				                </li>

				                <li>THE BORROWER AGREES TO PAY MONTHLY EMI OF&#x20;
				                    <b style="color:red">${goldData.emi || "-"} RS.</b> OR FOLLOW BULLET REPAYMENT METHOD (IF APPLICABLE).
				                </li>

				                <li>THE BORROWER AGREES TO PAY APPLICABLE CHARGES INCLUDING:
				                    <ul>
				                        <li>PROCESSING FEE: <b>${goldData.processingFee || "-"} RS.</b></li>
				                        <li>VALUATION CHARGE: <b>${goldData.marketValuation || "-"} RS.</b></li>
				                        <li>GST: <b>${goldData.gst || "-"} RS.</b></li>
				                    </ul>
				                </li>

				                <li>THE PLEDGED GOLD ORNAMENTS WILL REMAIN IN THE CUSTODY OF THE BANK UNTIL FULL LOAN REPAYMENT.</li>

				                <li>IN CASE OF DEFAULT, THE BANK RESERVES THE RIGHT TO SELL THE PLEDGED GOLD TO RECOVER DUES.</li>

				                <li>THE BORROWER DECLARES THAT THE GOLD PLEDGED IS SELF-OWNED AND NOT STOLEN OR DISPUTED PROPERTY.</li>
				            </ol>

				            <p style="margin-top:20px;">
				                BOTH PARTIES HEREBY AGREE TO ABIDE BY THE TERMS AND CONDITIONS MENTIONED ABOVE.&#x20;
				                THIS AGREEMENT IS EXECUTED IN DUPLICATE, WITH ONE COPY EACH FOR THE BORROWER AND THE BANK.
				            </p>

				            <br><br>
				            <div style="display:flex; justify-content:space-between; margin-top:40px;">
				                <div>
				                    <p>________________________</p>
				                    <p>BORROWER SIGNATURE</p>
				                </div>
				                <div>
				                    <p>________________________</p>
				                    <p>AUTHORIZED SIGNATORY (BANK)</p>
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
					alert("NO GOLD LOAN FOUND");
					$("#receiptArea").html("");
				}
			},

			error: function() {
				alert("ERROR FETCHING GOLD LOAN DATA");
			}
		});
	});

});

function printDocument() {

	var content = document.getElementById("receiptArea").innerHTML;

	var printWindow = window.open("", "", "height=700,width=900");
	printWindow.document.write("<html><head><title>PRINT DOCUMENT</title>");
	printWindow.document.write("</head><body >");
	printWindow.document.write(content);
	printWindow.document.write("</body></html>");
	printWindow.document.close();

	printWindow.print();
}