
<div class="pagetitle">
	<h1>LOAN MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-cash-coin"></i>
			</a></li>
			<li class="breadcrumb-item action">LOAN PAYMENT</li>
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
						</select>
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
						<label for="loanName">DATE OF LOAN</label> <input type="date"
							name="loanPaymentDate" id="loanPaymentDate" required="required"
							style="text-transform: uppercase;" readonly/>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">MEMBER SEARCH</label> <input type="text"
							name="memberId" id="memberId" required="required"
							style="text-transform: uppercase;" readonly/>
					</div>
				</div>

				<input type="hidden" id="memberName" name="memberName">


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">FAMILY MEMBER NAME</label> <input
							type="text" name="relativeDetails" id="relativeDetails"
							required="required" placeholder="ENTER FAMILY MEMBER NAME"
							style="text-transform: uppercase;" readonly/>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">DATE OF BIRTH</label> <input type="date"
							name="dateOfBirth" id="dateOfBirth" required="required"
							placeholder="" style="text-transform: uppercase;" readonly/>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for=""> AGE </label> <input type="text" name="age" id="age"
							required="required" placeholder="ENTER AGE" readonly/>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">CONTACT NO.</label> <input type="text"
							name="contactNo" id="contactNo" required="required"
							placeholder="ENTER CONTACT NO." readonly/>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">MESSAGE STATUS</label> <input type="text"
							name="messageStatus" id="messageStatus" required="required"
							placeholder="SMS NOTIFICATION" readonly/>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">ADDRESS</label>
						<textarea name="address" id="address"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"readonly></textarea>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="loanName">PIN CODE</label> <input type="text"
							name="pinCode" id="pinCode" required="required"
							placeholder="ENTER PIN CODE" style="text-transform: uppercase;" readonly/>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">BRANCH NAME</label> <input type="text"
							name="branchName" id="branchName" required="required"
							placeholder="ENTER BRANCH ADDRESS"
							style="text-transform: uppercase;" readonly/>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN PLAN NAME</label> <input type="text"
							name="loanPlanName" id="loanPlanName" required="required"
							placeholder="ENTER LOAN PLAN NAME"
							style="text-transform: uppercase;" readonly/>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">TYPE OF LOAN</label> <input type="text"
							name="typeOfLoan" id="typeOfLoan" required="required"
							placeholder=" ENTER TYPE OF LOAN "
							style="text-transform: uppercase;" readonly/>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN TERM</label> <input type="text" name="loanTerm"
							id="loanTerm" required="required"
							placeholder="ENTER LOAN TERM"
							style="text-transform: uppercase;" readonly/>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN MODE</label> <input type="text" name="loanMode"
							id="loanMode" required="required" placeholder="LOAN MODE"
							style="text-transform: uppercase;" readonly/>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">RATE OF INTEREST (%PA.)</label> <input type="text"
							name="rateOfInterest" id="rateOfInterest" required="required"
							placeholder="ENTER LOAN RATE OF INTEREST"
							style="text-transform: uppercase;" readonly/>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">AMOUNT OF LOAN</label> <input type="text"
							name="loanAmount" id="loanAmount" required="required"
							placeholder="ENTER AMOUNT OF LOAN"
							style="text-transform: uppercase;" readonly/>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">INTEREST TYPE</label> <input type="text"
							name="interestType" id="interestType" required="required"
							placeholder="ENTER INTEREST TYPE"
							style="text-transform: uppercase;" readonly/>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">EMI PAYMENT</label> <input type="text"
							name="emiPayment" id="emiPayment" required="required"
							placeholder="ENTER EMI PAYMENT"
							style="text-transform: uppercase;" readonly/>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">PURPOSE OF LOAN</label> <input type="text"
							name="purposeOfLoan" id="purposeOfLoan" required="required"
							placeholder="ENTER PURPOSE OF LOAN"
							style="text-transform: uppercase;" readonly/>
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
							required="required" placeholder="ENTER MEMBER ID" readonly/>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">GURANTOR IDENTITY</label> <input type="text"
							name="guarantorIdentity" id="guarantorIdentity"
							required="required" placeholder="ENTER GURANTOR IDENTITY" readonly/>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">ADDRESS</label>
						<textarea name="guarantorAddress" id="guarantorAddress"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;" readonly></textarea>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">PIN CODE</label> <input type="text"
							name="guarantorPinCode" id="guarantorPinCode" required="required"
							placeholder="ENTER PIN CODE" readonly/>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">GURANTOR CONTACT NO.</label> <input type="text"
							name="guarantorContactNo" id="guarantorContactNo"
							required="required" placeholder="ENTER GURANTOR CONTACT NO" readonly/>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">SECURITY TYPE</label> <input type="text"
							name="guarantorSecurityType" id="guarantorSecurityType"
							required="required" placeholder="ENTER SECURITY TYPE" readonly/>
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
					<div class="d-flex flex-column formFields mb-4">
						<label for="">MEMBER ID</label> <input type="text"
							name="coApplicantMemberId" id="coApplicantMemberId"
							required="required" placeholder="ENTER GURANTOR ID" readonly/>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CO-APPLICANT IDENTITY </label> <input type="text"
							name="coApplicantIdentity" id="coApplicantIdentity"
							required="required" placeholder="ENTER GURANTOR IDENTITY" readonly/>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">ADDRESS</label>
						<textarea name="coApplicantAddress" id="coApplicantAddress"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"readonly></textarea>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">PIN CODE</label> <input type="text"
							name="coApplicantPinCode" id="coApplicantPinCode"
							required="required" placeholder="ENTER PIN CODE" readonly/>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">GURANTOR CONTACT NO.</label> <input type="text"
							name="coApplicantContactNo" id="coApplicantContactNo"
							required="required" placeholder="ENTER GURANTOR CONTACT NO" readonly/>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">SECURITY TYPE</label> <input type="text"
							name="coApplicantSecurityType" id="coApplicantSecurityType"
							required="required" placeholder="ENTER SECURITY TYPE" readonly/>
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
						<label for="loanName">PROCESSING FEE(%)</label> <input type="text"
							name="processingFee" id="processingFee" required="required"
							style="text-transform: uppercase;" readonly/>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">LEGAL CHARGES(%)</label> <input type="text"
							name="legalCharges" id="legalCharges" required="required"
							style="text-transform: uppercase;" readonly/>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="loanName">INSURANCE FEE(%)</label> <input type="text"
							name="insuranceFee" id="insuranceFee" required="required"
							placeholder="ENTER INSURANCE FEE"
							style="text-transform: uppercase;" readonly/>
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4"
						style="margin-bottom: 30px">
						<label> FINANCIAL CONSULTANT ID</label>
						<div class="d-flex flex-column formFields mb-4">
							<input type="text" name="financialConsultantId"
								id="financialConsultantId" required="required"
								placeholder="ENTER CONSULTANT ID" readonly/>
						</div>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">FINANCIAL CONSULTANT NAME</label> <input type="text"
							name="financialConsultantName" id="financialConsultantName"
							required="required" placeholder="ENTER COLLECTOR NAME"
							style="text-transform: uppercase;" readonly/>
					</div>
				</div>




			</div>
		</div>
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">PAYMENT DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">

					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName"> DATE OF PAYMENT </label> <input type="date"
							name="paymentDate" id="paymentDate" required="required"
							style="text-transform: uppercase;" readonly/>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">PAYMENT STATUS</label> <input type="text"
							value="Paid" name="paymentStatus" id="paymentStatus" readonly
							style="color: red; font-weight: bold; font-size: 12px; text-transform: uppercase;"
							required="required" readonly/>


					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="referenceCode">MODE OF PAYMENT<span id="star">*</span></label>
						<select id="paymentMode" name="paymentMode" required="required"
							class="form-control selectField" style="height: 30px;" >
							<option value="">ENTER MODE OF PAYMENT</option>
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
							placeholder="ENTER CHEQUE NO" style="text-transform: uppercase;"/>
					</div>
				</div>

				<div class="col-lg-3" id="displaycheqdate">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>CHEQUE DATE <span id="star">*</span></label> <input
							type="date" name="chequeDate" id="chequeDate" required="required"
							placeholder="ENTER CHEQUE DATE"
							style="text-transform: uppercase;" />
					</div>
				</div>


				<div class="col-lg-3" id="displaydeposit">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>DEPOSIT ACCOUNT <span id="star">*</span></label> <input
							type="text" name="accountNo" id="accountNo" required="required"
							placeholder="ENTER DEPOSIT ACCOUNT"
							style="text-transform: uppercase;" />
					</div>
				</div>
				<input type="hidden" id="noOfInst" name="noOfInst">

				<div class="col-lg-3" id="displayRef">
					<div class="d-flex flex-column formFields">
						<label for="">REF NUMBER/UPI ID</label> <input type="text"
							name="ref_UpiId" id="ref_UpiId" required="required"
							placeholder="ENTER UPI ID"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CHRG. DEDUCT CASH</label> <select id="charges"
							name="charges" required="required"
							class="form-control selectField" style="height: 30px;" >
							<option value="">SELECT YES/NO</option>
							<option value="YES">YES</option>
							<option value="NO">NO</option>
						</select>
					</div>
				</div>
			</div>

			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="loanName">REMARKS</label> <input type="text"
						name="remarks" id="remarks" required="required"
						style="text-transform: uppercase;" 	/>
				</div>
			</div>

			<div class="col-12 text-center">
				<button id="paymentBtn" class="btnStyle"
					style="background-color: #FFA500;">PAYMENT</button>

			</div>

		</div>
	</form>
	<script
		src="${pageContext.request.contextPath}/js/LoanManagment/loanPayment.js"></script>