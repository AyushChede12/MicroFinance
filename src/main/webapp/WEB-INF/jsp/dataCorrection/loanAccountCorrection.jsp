
<div class="pagetitle">
	<h1>DATA CCORRECTION</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-pencil-square"></i>
			</a></li>
			<li class="breadcrumb-item action">LOAN ACCOUNT CORRECTION </li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<nav>
			<ol class="breadcrumb breadcrumb-title">
				<li class="breadcrumb-item action">SEARCH DETAILS </li>
			</ol>
		</nav>
		<div class="row">
			<div class="col-lg-5">
				<input type="hidden" name="id" id="id">
				<div class="d-flex flex-column formFields"
					style="margin-bottom: 20px;">
					<label for="loanId">SELECT LOAN ID</label> <select id="loanId"
						name="loanId" required="required" class="form-control selectField"
						style="height: 30px;">
						<option value="">-- SEARCH LOAN ID --</option>
					</select>
				</div>
			</div>

		</div>
	</form>

	<hr>
</div>




<div>
	<nav>
		<ol class="breadcrumb breadcrumb-title">
			<li class="breadcrumb-item action">LOAN DETAILS</li>
		</ol>
	</nav>
	<div class="row">
		<div class="col-lg-3">
			<div class="d-flex flex-column formFields"
				style="margin-bottom: 20px;">
				<label for="loanDate">LOAN DATE</label> <input type="date"
					name="loanDate" id="loanDate" required="required"
					style="text-transform: uppercase;" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="memberId">SEARCH CUSTOMER </label> <select id="memberId"
					name="memberId" required="required"
					class="form-control selectField" style="height: 30px;">
					<option value="">SELECT CUSTOMER NAME</option>

				</select>
			</div>
		</div>

		<div class="col-lg-3">

			<div class="d-flex flex-column formFields">
				<label for="relativeDetails">RELATIVE DETAILS </label> <input
					type="text" name="relativeDetails" id="relativeDetails"
					required="required" placeholder="ENTER REALTIVE NAME & RELATION"
					style="text-transform: uppercase;" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields"
				style="margin-bottom: 30px">
				<label>Date of Birth </label> <input type="date" name="dateOfBirth"
					id="dateOfBirth" required="required"
					style="text-transform: uppercase;" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields"
				style="margin-bottom: 30px">
				<label>AGE</label> <input type="text" name="age" id="age"
					required="required" placeholder="ENTER AGE"
					style="text-transform: uppercase;" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="contactNo">CONTACT NO</label> <input type="text"
					name="contactNo" id="contactNo" required="required"
					placeholder="ENTER CONTACT NO." />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="address">ADDRESS</label>
				<textarea name="address" id="address"
					style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"></textarea>
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields"
				style="margin-bottom: 30px">
				<label>PIN CODE </label> <input type="text" name="pinCode"
					id="pinCode" required="required" placeholder="ENTER PINCODE" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="branchName">BRANCH NAME</label> <select id="branchName"
					name="branchName" required="required"
					class="form-control selectField" style="height: 30px;">
					<option value="">SELECT BRANCH</option>
					
				</select>
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="loanPlanName">LOAN POLICY NAME </label> <select
					id="loanPlanName" name="loanPlanName" required="required"
					class="form-control selectField" style="height: 30px;">
					<option value="">SELECT LOAN POLICY NAME </option>
					<option value="Home Loan">HOME LOAN</option>
					<option value="Vehicle Loan">VEHICAL LOAN</option>
					<option value="Bharti">BHARTI</option>

				</select>
			</div>
		</div>

		<div class="col-lg-3">

			<div class="d-flex flex-column formFields">
				<label for="typeOfLoan">TYPE OF LOAN</label> <input type="text"
					name="typeOfLoan" id="typeOfLoan" required="required"
					placeholder="ENTER TYPE OF LOAN" style="text-transform: uppercase;" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields"
				style="margin-bottom: 30px;">
				<label for="loanMode">LOAN MODE</label> <input type="text"
					name="loanMode" id="loanMode" required="required"
					placeholder="ENTER LOAN MODE" style="text-transform: uppercase;" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="loanTerm">LOAN TREM </label> <input type="text"
					name="loanTerm" id="loanTerm" required="required"
					placeholder="ENTER LOAN TERM" style="text-transform: uppercase;" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="rateOfInterest">INTEREST RATE </label> <input type="text"
					name="rateOfInterest" id="rateOfInterest" required="required"
					placeholder="ENTER INTEREST RATE"
					style="text-transform: uppercase;" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="loanAmount">LOAN AMOUNT</label> <input type="text"
					name="loanAmount" id="loanAmount" required="required"
					placeholder="ENTER LOAN AMOUNT" style="text-transform: uppercase;" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields"
				style="margin-bottom: 30px;">
				<label for="interestType">TYPE OF INTEREST</label> <input
					type="text" name="interestType" id="interestType"
					required="required" placeholder="ENTER INTEREST TYPE"
					style="text-transform: uppercase;" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="emiPayment">EMI PAYMNETS</label> <input type="text"
					name="emiPayment" id="emiPayment" required="required"
					placeholder="ENTER EMI PAYMENTS" style="text-transform: uppercase;" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="purposeOfLoan">PIRPOSE OF LOAN</label> <input
					type="text" name="purposeOfLoan" id="purposeOfLoan"
					required="required" placeholder="ENTER PURPOSE LOAN"
					style="text-transform: uppercase;" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class=" h-100 d-flex justify-content-start align-items-center"
				style="margin-bottom: 30px;">
				<div
					class="d-flex justify-content-start align-items-center  formFields">
					<label style="margin-left: 20px;" class="mb-2">SMS SEND</label>
					<div class="cont">
						<div class="toggle">
							<input type="checkbox" id="toggle-sms-send" name="messageStatus"
								class="toggle__input" data-toggle-type="sms-send"> <label
								for="toggle-sms-send" class="toggle__label"></label>
						</div>
					</div>
				</div>
			</div>
		</div>





	</div>


	<div class="row mt-4">
		<div class="col-lg-3 mb-5">
			<label for=""
				style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">UPLOAD
				PHOTO <span class="star">*</span>
			</label> <label for="photo" id="drop-area"> <input accept="image/*"
				name="photo" id="photo" hidden="hidden"
				style="background-size: cover; background-repeat: no-repeat" />
				<div id="img-view">
					<img src="Uploads/upload.png" alt="upload_icon"
						id="photoPreview" /><input type="hidden" name="photoHidden"
						id="photoHidden">

					<!-- <p id="upload-text"
                    style="font-size: 12px; margin-top: 15px"
                    class="text-muted"
                  >
                    Drag and drop or Choose File to upload the image
                  </p> -->
				</div>
			</label> <small id="chkphoto" style="color: red;"></small>
		</div>

		<div class="col-lg-3 mb-5">
			<label for=""
				style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">UPLOAD
				SIGNATURE <span class="star">*</span>
			</label> <label for="signature" id="drop-area"> <input
				accept="image/*" name="signature" id="signature" hidden="hidden"
				style="background-size: cover; background-repeat: no-repeat" />
				<div id="img-view">
					<img src="Uploads/upload.png" alt="upload_icon"
						id="signaturePreview" /><input type="hidden"
						name="signatureHidden" id="signatureHidden">
					<!-- <p
                    style="font-size: 12px; margin-top: 15px"
                    class="text-muted"
                  >
                    Drag and drop or Choose File to upload the image
                  </p> -->
				</div>
			</label> <small id="chksignature" style="color: red;"></small>
		</div>



	</div>

</div>


<div class="mt-5">
	<nav>
		<ol class="breadcrumb breadcrumb-title">
			<li class="breadcrumb-item action">GURANTOR DEATILS</li>
		</ol>
	</nav>
	<div class="row">
		<div class="col-lg-3">
			<div class="d-flex flex-column formFields"
				style="margin-bottom: 30px">
				<label>CUSTOMER CODE </label> <select id="guarantorMemberId"
					name="guarantorMemberId" required="required"
					class="form-control selectField" style="height: 30px;">

				</select>
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="guarantorIdentity">LOAN GUARANTOR</label> <input
					type="text" name="guarantorIdentity" id="guarantorIdentity"
					required="required" placeholder="ENTER NAME"
					text-transform: uppercase;" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields"
				style="margin-bottom: 30px">
				<label>GUARANTOR ADDRESS</label> <input type="text"
					name="guarantorAddress" id="guarantorAddress" required="required"
					placeholder="ENTER ADDRESS" style="text-transform: uppercase;" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="guarantorPinCode">PIN CODE </label> <input type="text"
					name="guarantorPinCode" id="guarantorPinCode" required="required"
					placeholder="ENTER PIN CODE" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="guarantorContactNo">CONTACT NO. </label> <input
					type="text" name="guarantorContactNo" id="guarantorContactNo"
					required="required" placeholder="ENTER CONTACT NO." />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="guarantorSecurityType">AUTHENTICATION TYPE  </label> <select
					id="guarantorSecurityType" name="guarantorSecurityType"
					required="required" class="form-control selectField"
					style="height: 30px;">
					<option value="">SELECT</option>
					<option value="Blue">124500</option>
					<option value="Blue">12450</option>

				</select>
			</div>
		</div>
	</div>

</div>

<div class="mt-5">
	<nav>
		<ol class="breadcrumb breadcrumb-title">
			<li class="breadcrumb-item action">CO-APPLICATION DETAILS </li>
		</ol>
	</nav>
	<div class="row">
		<div class="col-lg-3">
			<div class="d-flex flex-column formFields"
				style="margin-bottom: 30px">
				<label>CUSTOMER CODE </label> <select id="coApplicantMemberId"
					name="coApplicantMemberId" required="required"
					class="form-control selectField" style="height: 30px;">

				</select>
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="coApplicantIdentity">NAME</label> <input type="text"
					name="coApplicantIdentity" id="coApplicantIdentity"
					required="required" placeholder="ENTER NAME"
					style="text-transform: uppercase;" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields"
				style="margin-bottom: 30px">
				<label>CO-APPLICATION ADDRESS</label> <input type="text"
					name="coApplicantAddress" id="coApplicantAddress"
					required="required" placeholder="ENTER ADDRESS"
					style="text-transform: uppercase;" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="coApplicantPinCode">PIN CODE </label> <input type="text"
					name="coApplicantPinCode" id="coApplicantPinCode"
					required="required" placeholder="ENTER PIN CODE" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="coApplicantContactNo">PHONE </label> <input type="text"
					name="coApplicantContactNo" id="coApplicantContactNo"
					required="required" placeholder="ENTER PHONE" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="coApplicantSecurityType">AUTHENTICATION DETAILS 
				</label> <input type="text" name="coApplicantSecurityType"
					id="coApplicantSecurityType" required="required"
					placeholder="ENTER AUTHENTICATION DETAILS  " />
			</div>
		</div>
	</div>

</div>

<div class="mt-5">
	<nav>
		<ol class="breadcrumb breadcrumb-title">
			<li class="breadcrumb-item action">DEDUCTION DEATILS</li>
		</ol>
	</nav>
	<div class="row">
		<div class="col-lg-3">
			<div class="d-flex flex-column formFields"
				style="margin-bottom: 30px">
				<label>PROCESSING CHARGES</label> <input type="text"
					name="processingFee" id="processingFee" required="required"
					placeholder="ENTER CHRAGES" style="text-transform: uppercase;" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="legalCharges">LEAGL AMOUNT</label> <input type="text"
					name="legalCharges" id="legalCharges" required="required"
					placeholder="ENTER LEGAL AMOUNT" style="text-transform: uppercase;" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="gst">GST </label> <input type="text" name="gst" id="gst"
					required="required" placeholder="ENTER GST" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="insuranceFee">INSURANCE AMOUNT </label> <input
					type="text" name="insuranceFee" id="insuranceFee"
					required="required" placeholder="ENTER INSURANCE AMOUNT" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="valuationFees">VALUATION FEE </label> <input type="text"
					name="valuationFees" id="valuationFees" required="required"
					placeholder="ENTER VALUATION FEE" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="stationaryFee">STATIONARY CHARGE </label> <input
					type="text" name="stationaryFee" id="stationaryFee"
					required="required" placeholder="ENTER INSURANCE AMOUNT " />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields"
				style="margin-bottom: 30px">
				<label>FINANCIAL CONSULTANT CODE </label> <input type="text"
					name="financialConsultantId" id="financialConsultantId"
					required="required" placeholder="ENTER FINANCIAL CONSULTANT CODE"
					style="text-transform: uppercase;" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="financialConsultantName">FINANCIAL CONSULTANT
					Name </label> <input type="text" name="financialConsultantName"
					id="financialConsultantName" required="required"
					placeholder="ENTER FINANCIAL CONSULTANT NAME" />
			</div>
		</div>

	</div>

</div>

<div class="mt-5">
	<div class="row">
		<div class="col-12 text-center" style="margin-top: 30px;">
			<button type="button" id="updateBtn" class="btnStyle bg-warning">UPDATE</button>
			<button type="button" id="newBtn" class="btnStyle bg-primary"
				style="background-color: #FFA500;">NEW</button>
			<button type="button" id="deleteBtn" class="btnStyle bg-danger">DELETE</button>
		</div>
	</div>

</div>


<script
	src="${pageContext.request.contextPath}/js/dataCorrection/loanAccount.js"></script>
