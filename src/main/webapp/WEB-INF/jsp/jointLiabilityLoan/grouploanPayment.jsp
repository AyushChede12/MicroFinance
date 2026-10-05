
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
							required="required" placeholder="Emi" />
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

			<div class="row">
				<div class="col-12 text-center">
					<button id="groupPaymentBtn" class="btnStyle bg-success"
						style="margin-left: 80%">PAYMENT</button>

				</div>
			</div>
		</div>
	</form>

</div>

<script
	src="${pageContext.request.contextPath}/js/Joinlibiliy/GroupLoanPayment.js"></script>
