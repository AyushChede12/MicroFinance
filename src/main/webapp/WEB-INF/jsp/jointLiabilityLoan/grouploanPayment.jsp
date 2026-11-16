
<div class="pagetitle">
	<h1>JOINT LIABILITY LOAN</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-person-bounding-box"></i>
			</a></li>
			<li class="breadcrumb-item action">GROUP LOAN PAYMENT</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">LOAN SEARCH DETAILS</li>
				</ol>
			</nav>

			<div class="col-lg-3" style="margin-left: -15px;">
				<div class="d-flex flex-column formFields mb-4">
					<label for="">SELECT BY GROUP ID*</label> <select id="groupid"
						name="groupid" required="required"
						class="form-control selectField" style="height: 30px;">
						<option value="">SELECT GROUP ID</option>

					</select>
				</div>
			</div>
		</div>


		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">LOAN INFO</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3 mb-4 ">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo"> OPENING DATE</label> <input type="date"
							name="openingDate" id="openingDate" required="required"
							readonly="readonly" placeholder=""
							style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3  mb-4">
					<div class="d-flex flex-column formFields">
						<label for="">COMMUNITY NAME</label> <input type="text"
							readonly="readonly" name="communityName" id="communityName"
							required="required" placeholder="ENTER COMMUNITY NAME " />
					</div>
				</div>

				<div class="col-lg-3  mb-4">
					<div class="d-flex flex-column formFields">
						<label for="">BRANCH NAME*</label> <input type="text"
							readonly="readonly" name="branchname" id="branchname"
							required="required" placeholder="ENTER BRANCH NAME" />
					</div>
				</div>

				<div class="col-lg-3  mb-4">
					<div class="d-flex flex-column formFields">
						<label for="">LOAN SCHEME NAME*</label> <input type="text"
							readonly="readonly" name="loanSchemeName" id="loanSchemeName"
							required="required" placeholder="ENTER LOAN SCHEME NAME" />
					</div>
				</div>

				<div class="col-lg-3  mb-4">
					<div class="d-flex flex-column formFields">
						<label for="">COMMUNITY ADDRESS * </label> <input type="text"
							readonly="readonly" name="communityAddress" id="communityAddress"
							required="required" placeholder="ENTER ADDRESS" />
					</div>
				</div>
				<div class="col-lg-3  mb-4">
					<div class="d-flex flex-column formFields">
						<label for="">CONTACT NUMBER,* </label> <input type="text"
							readonly="readonly" name="contactNumber" id="contactNumber"
							required="required" placeholder="ENTER NUMBER" />
					</div>
				</div>
				<div class="col-lg-3  mb-4">
					<div class="d-flex flex-column formFields">
						<label for=""> LOAN PURPOSE* </label> <input type="text"
							name="loanpurpose" id="loanpurpose" required="required"
							placeholder="ENTER LOAN PURPOSE" />
					</div>
				</div>
				<div class="col-lg-3  mb-4">
					<div class="d-flex flex-column formFields">
						<label for=""> EMI MODE* </label> <input type="text"
							readonly="readonly" name="emiType" id="emiType"
							required="required" placeholder="ENTER EMI MODE" />
					</div>
				</div>

				<div class="col-lg-3  mb-4">
					<div class="d-flex flex-column formFields">
						<label for=""> TERM* </label> <input type="text" name="term"
							readonly="readonly" id="term" required="required"
							placeholder="ENTER TERM" />
					</div>
				</div>
				<div class="col-lg-3  mb-4">
					<div class="d-flex flex-column formFields">
						<label for=""> RATE OF INTEREST(%)* </label> <input type="text"
							readonly="readonly" name="rateOfInterest" id="rateOfInterest"
							required="required" placeholder="ENTER RATE OF INTEREST" />
					</div>
				</div>
				<div class="col-lg-3  mb-4">
					<div class="d-flex flex-column formFields">
						<label for=""> INTEREST TYPE* </label> <input type="text"
							readonly="readonly" name="interestType" id="interestType"
							required="required" placeholder="ENTER  INTEREST TYPE" />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label style="color: red; font-weight: bold;">LOAN AMOUNT*</label>
						<input type="text" id="loanAmount" name="loanAmount"
							required="required" placeholder="ENTER LOAN AMOUNT"
							style="color: red; font-weight: bold; font-size: 12px; text-transform: uppercase;" />
					</div>
				</div>



				<div class="col-lg-3  mb-4">
					<div class="d-flex flex-column formFields">
						<label for=""> EMI AMOUNT* </label> <input type="text"
							readonly="readonly" name="loanEmi" id="loanEmi"
							required="required" placeholder="EMI" />
					</div>
				</div>






			</div>
		</div>

		<div class="row mt-4">
			<div class="col-lg-3 mb-5">
				<label for=""
					style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">UPLOAD
					PHOTO <span id="star">*</span>
				</label> <label for="Photo" id="drop-area"> <input type="file"
					accept="image/*" name="photo" id="photo" hidden="hidden"
					onchange=""
					style="background-size: cover; background-repeat: no-repeat" />
					<div id="img-view">
						<img src="Uploads/upload.png" alt="photo"
							id="photoPreview" /> <input type="hidden" id="photoHidden"
							name="photoHidden">

					</div>
				</label>
			</div>


			<div class="col-lg-3 mb-5">
				<label for=""
					style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">UPLOAD
					SIGNATURE <span id="star">*</span>
				</label> <label for="signature" id="drop-area"> <input type="file"
					accept="image/*" name="signature" id="signature" hidden="hidden"
					onchange="signatureUpload();"
					style="background-size: cover; background-repeat: no-repeat" />
					<div id="img-view">
						<img src="Uploads/upload.png" alt="signature"
							id="signaturePreview" /> <input type="hidden"
							id="signatureHidden" name="signatureHidden">

					</div>
				</label>
			</div>

		</div>

		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">DEDUCTION DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3  mb-4">
					<div class="d-flex flex-column formFields">
						<label for="">PROCESSING CHARGES * </label> <input type="text"
							readonly="readonly" name="processingFee" id="processingFee"
							required="required" placeholder="ENTER PROCESSING CHARGES " />
					</div>
				</div>
				<div class="col-lg-3  mb-4">
					<div class="d-flex flex-column formFields">
						<label for=""> GST VALUE* </label> <input type="text"
							readonly="readonly" name="gstPercentage" id="gstPercentage"
							required="required" placeholder="ENTER GST VALUE" />
					</div>
				</div>
				<div class="col-lg-3  mb-4">
					<div class="d-flex flex-column formFields">
						<label for=""> LEGAL CHARGES* </label> <input type="text"
							readonly="readonly" name="legalCharges" id="legalCharges"
							required="required" placeholder="ENTER LEGAL CHARGES" />
					</div>
				</div>
				<div class="col-lg-3  mb-4">
					<div class="d-flex flex-column formFields">
						<label for=""> INSURENCE AMOUNT* </label> <input type="text"
							readonly="readonly" name="insuranceFee" id="insuranceFee"
							required="required" placeholder="ENTER INSURENCE AMOUNT" />
					</div>
				</div>
				<div class="col-lg-3  ">
					<div class="d-flex flex-column formFields">
						<label for=""> VALUATION CHARGES* </label> <input type="text"
							readonly="readonly" name="valuationFee" id="valuationFee"
							required="required" placeholder="ENTER  VALUATION CHARGES" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4"
						style="margin-bottom: 30px">
						<label> FINANCILA CONSULTANT ID</label>
						<div class="position-relative">
							<select id="financialConsultantId" name="financialConsultantId"
								required="required" class="form-control selectField"
								style="height: 30px;">
								<option value=""></option>

							</select>
						</div>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">FINANCIAL CONSULTANT NAME</label> <input type="text"
							name="financialConsultantName" readonly="readonly"
							id="financialConsultantName" required="required" placeholder=""
							style="text-transform: uppercase;" />
					</div>
				</div>



			</div>




			<div class="mt-5">
				<nav>
					<ol class="breadcrumb breadcrumb-title">
						<li class="breadcrumb-item action">PAYMENT DETAILS</li>
					</ol>
				</nav>
				<div class="row">
					<div class="col-lg-3">

						<div class="d-flex flex-column formFields mb-4">
							<label for="loanName"> DATE OF PAYMENT </label> <input
								type="date" name="paymentDate" id="paymentDate"
								required="required" style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields mb-4">
							<label for="loanName">PAYMENT STATUS</label> <input type="text"
								value="" name="paymentStatus" id="paymentStatus"
								style="color: red; font-weight: bold; font-size: 12px; text-transform: uppercase;"
								required="required" />


						</div>
					</div>
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="referenceCode">MODE OF PAYMENT <span
								id="star">*</span></label> <select id="paymentMode" name="paymentMode"
								required="required" class="form-control selectField"
								style="height: 30px;">
								<option value="">ENTER MMODE OF PAYMENT</option>
								<option value="Cash">CASH</option>
								<option value="Online">ONLINE</option>
								<option value="Cheque">CHEQUE</option>
								<option value="NEFT">NEFT</option>


							</select>
						</div>
					</div>


					<div class="col-lg-3" id="displayCheque">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>CHEQUE NUMBER <span id="star">*</span></label> <input
								type="text" name="chequeNo" id="chequeNo" required="required"
								placeholder="ENTER CHEQUE NO" style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3" id="displaycheqdate">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>CHEQUE DATE <span id="star">*</span></label> <input
								type="date" name="chequeDate" id="chequeDate"
								required="required" placeholder="ENTER CHEQUE DATE"
								style="text-transform: uppercase;" />
						</div>
					</div>


					<div class="col-lg-3" id="displaydeposit">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>DEPOSITE ACCOUNT <span id="star">*</span></label> <input
								type="text" name="accountNo" id="accountNo" required="required"
								placeholder="ENTER DEPOSITE ACCOUNT"
								style="text-transform: uppercase;" />
						</div>
					</div>
					<input type="hidden" id="noOfInst" name="noOfInst">

					<div class="col-lg-3" id="displayRef">
						<div class="d-flex flex-column formFields">
							<label for="">GEF NUMBER/UPI ID</label> <input type="text"
								name="ref_UpiId" id="ref_UpiId" required="required"
								placeholder="ENTER UPI ID"
								style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields mb-4">
							<label for="">CHRG. DEDUCT CASH</label> <select id="charges"
								name=charges required="required"
								class="form-control selectField" style="height: 30px;">
								<option value="">SELECT YES/NO</option>
								<option value="YES">YES</option>
								<option value="NO">NO</option>
							</select>
						</div>
					</div>
				</div>

			</div>

			<div class="row mt-4">
				<div class="col-12 text-center d-flex justify-content-end align-items-center gap-2">
					<button type="button" id="printDisbursementBtn" class="btn btn-primary" style="display: none; height: 35px; min-width: 220px; font-weight: 600; text-transform: uppercase;">
						<i class="bi bi-printer"></i> PRINT DISBURSEMENT ADVICE
					</button>
					<button id="groupPaymentBtn" type="button" class="btnStyle bg-success" style="height: 35px; min-width: 140px; font-weight: 600; text-transform: uppercase;">PAYMENT</button>
				</div>
			</div>
		</div>
	</form>

	<!-- Printable Disbursement Advice Area -->
	<div id="printableDisbursementArea" style="display: none;">
		<div style="font-family: Arial, sans-serif; padding: 25px; color: #000; line-height: 1.4;">
			<div style="text-align: center; margin-bottom: 20px;">
				<h2 id="disbCompName" style="margin: 0; font-size: 22px; font-weight: bold; color: #0d6efd; letter-spacing: 0.5px; text-transform: uppercase;"></h2>
				<p id="disbCompAddress" style="margin: 4px 0 2px 0; font-size: 12px; color: #444; text-transform: uppercase;"></p>
				<p id="disbCompRegLine" style="margin: 2px 0; font-size: 11px; color: #555; text-transform: uppercase;"></p>
				<p id="disbCompContact" style="margin: 2px 0; font-size: 11px; color: #555; text-transform: uppercase;"></p>
				<hr style="border: 0; border-top: 2px solid #000; margin: 12px 0 16px 0;">
				<h3 style="margin: 5px 0; font-size: 16px; font-weight: bold; text-decoration: underline; text-transform: uppercase;">
					JOINT LIABILITY GROUP LOAN DISBURSEMENT ADVICE / SANCTION RECEIPT
				</h3>
			</div>

			<table style="width: 100%; font-size: 12px; margin-bottom: 15px; border-collapse: collapse;">
				<tr>
					<td style="width: 20%; padding: 4px 0;"><b>GROUP ID / CODE:</b></td>
					<td style="width: 30%; padding: 4px 0;"><span id="disbGroupId"></span></td>
					<td style="width: 20%; padding: 4px 0;"><b>DISBURSEMENT DATE:</b></td>
					<td style="width: 30%; padding: 4px 0;"><span id="disbPaymentDate"></span></td>
				</tr>
				<tr>
					<td style="padding: 4px 0;"><b>COMMUNITY / GROUP NAME:</b></td>
					<td style="padding: 4px 0;"><span id="disbCommunityName"></span></td>
					<td style="padding: 4px 0;"><b>BRANCH NAME:</b></td>
					<td style="padding: 4px 0;"><span id="disbBranchName"></span></td>
				</tr>
				<tr>
					<td style="padding: 4px 0;"><b>COMMUNITY ADDRESS:</b></td>
					<td style="padding: 4px 0;"><span id="disbCommunityAddress"></span></td>
					<td style="padding: 4px 0;"><b>CONTACT NUMBER:</b></td>
					<td style="padding: 4px 0;"><span id="disbContactNumber"></span></td>
				</tr>
				<tr>
					<td style="padding: 4px 0;"><b>LOAN SCHEME:</b></td>
					<td style="padding: 4px 0;"><span id="disbLoanScheme"></span></td>
					<td style="padding: 4px 0;"><b>LOAN PURPOSE:</b></td>
					<td style="padding: 4px 0;"><span id="disbLoanPurpose"></span></td>
				</tr>
			</table>

			<h4 style="font-size: 13px; font-weight: bold; margin: 15px 0 8px 0; border-bottom: 1px solid #ccc; padding-bottom: 3px; text-transform: uppercase;">
				SANCTION & REPAYMENT TERMS
			</h4>
			<table style="width: 100%; font-size: 12px; margin-bottom: 15px; border-collapse: collapse;" border="1" cellpadding="5">
				<tr style="background-color: #f2f2f2; text-transform: uppercase;">
					<th>SANCTIONED AMOUNT</th>
					<th>RATE OF INTEREST (%)</th>
					<th>INTEREST TYPE</th>
					<th>TENURE / TERM</th>
					<th>EMI MODE</th>
					<th>INSTALLMENT (EMI)</th>
				</tr>
				<tr style="text-align: center; text-transform: uppercase;">
					<td><b>₹ <span id="disbLoanAmount"></span></b></td>
					<td><span id="disbRoi"></span>%</td>
					<td><span id="disbInterestType"></span></td>
					<td><span id="disbTerm"></span></td>
					<td><span id="disbEmiType"></span></td>
					<td><b>₹ <span id="disbEmiAmount"></span></b></td>
				</tr>
			</table>

			<h4 style="font-size: 13px; font-weight: bold; margin: 15px 0 8px 0; border-bottom: 1px solid #ccc; padding-bottom: 3px; text-transform: uppercase;">
				DEDUCTIONS & DISBURSEMENT SUMMARY
			</h4>
			<table style="width: 100%; font-size: 12px; margin-bottom: 15px; border-collapse: collapse;" border="1" cellpadding="5">
				<tr style="background-color: #f2f2f2; text-transform: uppercase;">
					<th>PROCESSING FEE</th>
					<th>GST AMOUNT</th>
					<th>LEGAL CHARGES</th>
					<th>INSURANCE CHARGES</th>
					<th>VALUATION CHARGES</th>
					<th>TOTAL DEDUCTIONS</th>
					<th>NET DISBURSED AMOUNT</th>
				</tr>
				<tr style="text-align: center; text-transform: uppercase;">
					<td>₹ <span id="disbProcessing"></span></td>
					<td>₹ <span id="disbGst"></span></td>
					<td>₹ <span id="disbLegal"></span></td>
					<td>₹ <span id="disbInsurance"></span></td>
					<td>₹ <span id="disbValuation"></span></td>
					<td>₹ <span id="disbTotalDeduction"></span></td>
					<td><b>₹ <span id="disbNetPayable"></span></b></td>
				</tr>
			</table>

			<table style="width: 100%; font-size: 12px; margin-bottom: 25px; border-collapse: collapse;">
				<tr>
					<td style="width: 25%; padding: 4px 0;"><b>PAYMENT MODE:</b></td>
					<td style="width: 25%; padding: 4px 0;"><span id="disbPaymentMode"></span></td>
					<td style="width: 25%; padding: 4px 0;"><b>ACCOUNT / CHEQUE NO:</b></td>
					<td style="width: 25%; padding: 4px 0;"><span id="disbAccountCheque"></span></td>
				</tr>
				<tr>
					<td style="padding: 4px 0;"><b>FINANCIAL CONSULTANT:</b></td>
					<td style="padding: 4px 0;"><span id="disbConsultant"></span></td>
					<td style="padding: 4px 0;"><b>DEDUCTED IN CASH:</b></td>
					<td style="padding: 4px 0;"><span id="disbChargesCash"></span></td>
				</tr>
			</table>

			<div style="margin-top: 60px; display: flex; justify-content: space-between; font-size: 12px; text-align: center; text-transform: uppercase;">
				<div style="width: 30%;">
					<div style="border-top: 1px solid #000; padding-top: 5px;">
						<b>GROUP LEADER / BORROWER</b><br>
						<span>SIGNATURE / THUMB IMPRESSION</span>
					</div>
				</div>
				<div style="width: 30%;">
					<div style="border-top: 1px solid #000; padding-top: 5px;">
						<b>LOAN OFFICER / PREPARED BY</b><br>
						<span>SIGNATURE</span>
					</div>
				</div>
				<div style="width: 30%;">
					<div style="border-top: 1px solid #000; padding-top: 5px;">
						<b>AUTHORIZED SIGNATORY</b><br>
						<span>BRANCH MANAGER</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script
	src="${pageContext.request.contextPath}/js/Joinlibiliy/GroupLoanPayment.js"></script>
