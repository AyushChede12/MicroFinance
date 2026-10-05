<div class="pagetitle">
	<h1>LOAN MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-cash-coin"></i>
			</a></li>
			<li class="breadcrumb-item action">LOAN APPROVAL</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div class="">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-5">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">FIND LOAN BY ID</label> <select id="findByLoanId"
							name="findByLoanId" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT LOAN ID</option>
							<span id="star">*</span>
						</select> <small id="chkloanid" style="color: red;"></small>
					</div>
				</div>
			</div>
		</div>
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">LOAN DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">DATE OF LOAN </label> <input type="date"
							name="loanDate" id="loanDate" required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">MEMBER SEARCH</label> <input type="text"
							name="memberId" id="memberId" required="required"
							readonly="readonly" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">FAMILY MEMBER NAME</label> <input
							type="text" name="relativeDetails" id="relativeDetails"
							required="required" placeholder="ENTER FAMILY MEMBER NAME"
							readonly="readonly" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">DATE OF BIRTH</label> <input type="date"
							name="dateOfBirth" id="dateOfBirth" required="required"
							readonly="readonly" placeholder=""
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">AGE </label> <input type="text" name="age" id="age"
							readonly="readonly" required="required" placeholder="Enter Age" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">CONTACT NO.</label> <input type="text"
							name="contactNo" id="contactNo" required="required"
							readonly="readonly" placeholder="ENTER MOBILE NUMBER" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">MESSAGE STATUS</label> <input type="text"
							name="messageStatus" id="messageStatus" required="required"
							readonly="readonly" placeholder=" MESSAGE STATUS" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">ADDRESS</label>
						<textarea name="address" id="address"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"></textarea>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="loanName">PIN CODE</label> <input type="text"
							name="pinCode" id="pinCode" required="required"
							readonly="readonly" placeholder="ENTER PIN CODE"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">BRANCH ADDRESS</label> <input type="text"
							name="branchName" id="branchName" required="required"
							readonly="readonly" placeholder="ENTER BRANCH NAME"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN PLAN NAME</label> <input type="text"
							name="loanPlanName" id="loanPlanName" required="required"
							readonly="readonly" placeholder="ENTER LOAN PLAN NAME"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">TYPE OF PLAN</label> <input type="text"
							name="typeOfLoan" id="typeOfLoan" required="required"
							readonly="readonly" placeholder=" ENTER TYPE OF LOAN "
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN TERM</label> <input type="text" name="loanTerm"
							id="loanTerm" required="required" readonly="readonly"
							placeholder="ENTER PLAN DURATION"
							style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN MODE</label> <input type="text" name="loanMode"
							id="loanMode" required="required" readonly="readonly"
							placeholder=" ENTER LOAN MODE" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">RATE OF INTEREST (%PA.) </label> <input type="text"
							name="rateOfInterest" id="rateOfInterest" required="required"
							readonly="readonly" placeholder="ENTER LOAN ROI"
							style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">AMOUNT OF LOAN</label> <input type="text"
							name="loanAmount" id="loanAmount" required="required"
							readonly="readonly" placeholder="ENTER AMOUNT OF LOAN"
							style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for=""> INTEREST TYPE </label> <input type="text"
							name="interestType" id="interestType" required="required"
							readonly="readonly" placeholder="ENTER INTEREST TYPE"
							style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">EMI PAYMENT</label> <input type="text"
							name="emiPayment" id="emiPayment" required="required"
							readonly="readonly" placeholder="ENTER EMI PAYMENT"
							style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">PURPOSE OF LOAN</label> <input type="text"
							name="purposeOfLoan" id="purposeOfLoan" required="required"
							readonly="readonly" placeholder="ENTER PURPOSE OF LOAN"
							style="text-transform: uppercase;" />
					</div>
				</div>

			</div>
		</div>


		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">GURANTOR DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">MEMBER ID</label> <input type="text"
							name="guarantorMemberId" id="guarantorMemberId"
							required="required" readonly="readonly"
							placeholder="ENTER MEMBER ID" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">GURANTOR IDENTITY</label> <input type="text"
							name="guarantorIdentity" id="guarantorIdentity"
							required="required" readonly="readonly"
							placeholder="ENTER GURANTOR IDENTITY" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">ADDRESS</label>
						<textarea name="guarantorAddress" id="guarantorAddress"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"></textarea>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">PIN CODE</label> <input type="number"
							name="guarantorPinCode" id="guarantorPinCode" required="required"
							readonly="readonly" placeholder="ENTER PIN CODE" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">GURANTOR CONTACT NO.</label> <input type="text"
							name="guarantorContactNo" id="guarantorContactNo"
							required="required" readonly="readonly"
							placeholder="ENTER GURANTOR CONTACT NO." />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">SECURITY TYPE</label> <input type="text"
							name="guarantorSecurityType" id="guarantorSecurityType"
							required="required" readonly="readonly"
							placeholder="ENTER SECURITY TYPE" />
					</div>
				</div>
			</div>


		</div>

		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">CO-APPLICANT DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">

						<div class="position-relative">
							<div class="d-flex flex-column formFields mb-4">
								<label for="">MEMBER ID </label> <input type="text"
									name="coApplicantMemberId" id="coApplicantMemberId"
									required="required" readonly="readonly"
									placeholder="ENTER MEMBER ID" />
							</div>
						</div>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CO-APPLICANT IDENTITY</label>
						<input type="text" name="coApplicantIdentity"
							id="coApplicantIdentity" required="required" readonly="readonly"
							placeholder="ENTER GURANTOR IDENTITY" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">ADDRESS</label>
						<textarea name="coApplicantAddress" id="coApplicantAddress"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"></textarea>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">PIN CODE</label> <input type="text"
							name="coApplicantPinCode" id="coApplicantPinCode"
							required="required" readonly="readonly"
							placeholder="ENTER PIN CODE" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">GURANTOR CONTACT NO.</label> <input type="text"
							name="coApplicantContactNo" id="coApplicantContactNo"
							required="required" readonly="readonly"
							placeholder="ENTER GURANTOR CONTACT NO." />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">SECURITY TYPE</label> <input type="text"
							name="coApplicantSecurityType" id="coApplicantSecurityType"
							required="required" readonly="readonly"
							placeholder="ENTER SECURITY TYPE" />
					</div>
				</div>

			</div>



		</div>

		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">DEDUCTION DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">

					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">PROCESSING FEE(%) </label> <input
							type="text" name="processingFee" id="processingFee"
							required="required" readonly="readonly"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">LEGAL CHARGES(%)</label> <input type="text"
							name="legalCharges" id="legalCharges" required="required"
							readonly="readonly" style="text-transform: uppercase;" />
					</div>
				</div>





				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="loanName">INSURANCE FEE</label> <input type="text"
							name="insuranceFee" id="insuranceFee" required="required"
							readonly="readonly" placeholder="ENTER INSURANCE FEES"
							style="text-transform: uppercase;" />
					</div>
				</div>




				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4"
						style="margin-bottom: 30px">
						<label> FINANCIAL CONSULTANT ID</label>
						<div class="d-flex flex-column formFields mb-4">
							<input type="text" name="financialConsultantId"
								id="financialConsultantId" required="required"
								readonly="readonly" placeholder="ENTER FINANCIAL CONSULTANT ID" />
						</div>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">FINANCIAL CONSULTANT NAME</label> <input type="text"
							name="financialConsultantName" id="financialConsultantName"
							required="required" readonly="readonly"
							placeholder="ENTER CONSULTANT NAME"
							style="text-transform: uppercase;" />
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
						<img src="Uploads/upload.png" alt="photo" id="photoPreview" /> <input
							type="hidden" id="photoHidden" name="photoHidden">

					</div>
				</label>
			</div>


			<div class="col-lg-3 mb-5">
				<label for=""
					style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">UPLOAD
					SIGNATURE <span id="star">*</span>
				</label> <label for="signature" id="drop-area"> <input type="file"
					accept="image/*" name="signature" id="signature" hidden="hidden"
					onchange=""
					style="background-size: cover; background-repeat: no-repeat" />
					<div id="img-view">
						<img src="Uploads/upload.png" alt="signature"
							id="signaturePreview" /> <input type="hidden"
							id="signatureHidden" name="signatureHidden">

					</div>
				</label>
			</div>

		</div>
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">APPROVAL DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">

					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">Date Of Approval </label> <input type="date"
							name="approvalDate" id="approvalDate" required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">Approval Status</label> <input type="text"
							id="approvalStatus" name="approvalStatus" class="form-control"
							readonly
							style="font-size: 12px; font-weight: bold; text-transform: uppercase;" />

					</div>
				</div>

				<div class="col-12 text-center">
					<button id="approveBtn" class="btnStyle" name="approveBtn"
						style="background-color: #FFA500;">Approve It</button>
					<!-- <button id="saveBtn" class="btnStyle" style="background-color: #FFA500;">Update</button>
                            <button id="saveBtn" class="btnStyle bg-primary">Print</button> -->
				</div>

			</div>
		</div>


	</form>
	<script
		src="${pageContext.request.contextPath}/js/LoanManagment/loanApproval.js"></script>