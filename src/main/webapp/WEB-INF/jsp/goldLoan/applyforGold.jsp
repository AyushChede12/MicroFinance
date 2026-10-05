
<div class="pagetitle">
	<h1>SECURED GOLD LOAN</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-coin"></i>
			</a></li>
			<li class="breadcrumb-item action">APPLY FOR GOLD</li>
		</ol>
	</nav>
</div>

<div>
	<form>
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">LOAN DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<input type="hidden" id="goldID" name="goldID" value="${goldID}">
				<input type="hidden" id="memberName" name="memberName">

				<div class="col-lg-3">

					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">LOAN DATE</label> <input type="date"
							name="loanDate" id="loanDate" required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>FIND CUSTOMERS</label> <select id="memberCode"
							name="memberCode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT CUSTOMER CODE</option>
						</select> <small id="vmemberCode" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="custName">CUSTOMER NAME</label> <input type="text"
							name="customerName" id="customerName" required="required"
							placeholder="ENTER CUSTOMER NAME"
							style="text-transform: uppercase;" readonly="readonly" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="dateOfBirth">DATE OF BIRTH </label> <input type="date"
							name="dateOfBirth" id="dateOfBirth" required="required"
							readonly="readonly" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">AGE </label> <input type="text" name="age" id="age"
							required="required" placeholder="ENTER AGE" readonly="readonly" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CONTACT NO.</label> <input type="text"
							name="contactNo" id="contactNo" required="required"
							placeholder="ENTER CONTACT NO" readonly="readonly" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">ADDRESS</label>
						<textarea name="address" id="address" placeholder="ENTER ADDRESS"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"
							readonly="readonly"></textarea>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="pinCode">PIN CODE</label> <input type="number"
							name="pinCode" id="pinCode" required="required"
							placeholder="Enter Pin Code" style="text-transform: uppercase;"
							readonly="readonly" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">BRANCH NAME</label> <input type="text"
							name="branchName" id="branchName" required="required"
							placeholder="ENTER BRANCH NAME" readonly="readonly" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>LOAN PLAN NAME</label> <input type="text" id="loanPlanName"
							name="loanPlanName" required="required"
							class="form-control selectField" style="height: 30px;"
							readonly="readonly">
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">TYPE OF LOAN</label> <input type="text"
							name="typeOfLoan" id="typeOfLoan" required="required"
							placeholder="ENTER TYPE OF LOAN"
							style="text-transform: uppercase;" readonly="readonly" />

					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN MODE</label> <input type="text" name="loanMode"
							id="loanMode" required="required" placeholder="ENTER LOAN MODE"
							style="text-transform: uppercase;" readonly="readonly" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN TERM</label> <input type="text" name="loanTerm"
							id="loanTerm" required="required" placeholder="ENTER LOAN TERM"
							style="text-transform: uppercase;" readonly="readonly" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">RATE OF INTEREST(%)</label> <input type="text"
							name="rateOfInterest" id="rateOfInterest" required="required"
							placeholder="ENTER RATE OF INTEREST"
							style="text-transform: uppercase;" readonly="readonly" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">AMOUNT OF LOAN </label> <input type="text"
							name="loanAmount" id="loanAmount" required="required"
							placeholder="ENTER AMOUNT OF LOAN"
							style="text-transform: uppercase;" readonly="readonly" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">INTEREST TYPE</label> <input type="text"
							name="interestType" id="interestType" required="required"
							placeholder="ENTER INTEREST TYPE"
							style="text-transform: uppercase;" readonly="readonly" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">EMI PAYMENT</label> <input type="text"
							onclick="calculateEMI()" name="emiPayment" id="emiPayment"
							required="required" placeholder="ENTER EMI PAYMENT"
							style="text-transform: uppercase;" readonly="readonly" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">PURPOSE OF LOAN </label> <input type="text"
							name="purposeOfLoan" id="purposeOfLoan" required="required"
							placeholder="ENTER PURPOSE OF LOAN"
							style="text-transform: uppercase;" /> <small id="vpurposeOfLoan"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="h-100 d-flex justify-content-start align-items-center">
						<div
							class="d-flex justify-content-start align-items-center formFields">
							<label for="messageStatus" style="margin-left: 20px;"
								class="mb-2">MESSAGE STATUS</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<div class="cont">
								<div class="toggle">
									<input type="checkbox" id="toggle-sms-send" name="smsSend"
										class="toggle__input" data-toggle-type="smsSend"> <label
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
						PHOTO <span id="star">*</span>
					</label> <label for="signature" id="drop-area"> <input type="file"
						accept="image/*" name="photo" id="photo" hidden="hidden"
						onchange="photoUpload();"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="Uploads/upload.png" alt="upload_icon"
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
							<img src="Uploads/upload.png" alt="upload_icon"
								id="signaturePreview" /> <input type="hidden"
								id="signatureHidden" name="signatureHidden">

						</div>
					</label>
				</div>

			</div>
		</div>



		<!-- Gold/Silver Details -->
		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">GOLD DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label> KARAT </label>
						<div class="position-relative">
							<input type="text" id="karat" name="karat" required="required"
								class="form-control selectField" style="height: 30px;"
								readonly="readonly">

						</div>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">ITEM TYPE</label> <input type="text" id="itemType"
							name="itemType" required="required"
							class="form-control selectField" style="height: 30px;"
							readonly="readonly">
					</div>
				</div>

				<input type="hidden" id="marketValue">


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CUSTOMER KARAT RATE</label> <input type="text"
							name="custgoldRate" id="custgoldRate" required="required"
							placeholder="ENTER CUSTOMER KARAT RATE" readonly="readonly">
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="itemName">ITEM NAME</label> <input type="text"
							id="itemName" name="itemName" required="required"
							placeholder="ENTER ITEM NAME" readonly="readonly">
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOCKER BRANCH</label> <input type="text"
							id="lockerBranch" name="lockerBranch" required="required"
							class="form-control selectField" style="height: 30px;"
							readonly="readonly">

					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">PURITY</label> <input type="text" id="purity"
							name="purity" required="required"
							class="form-control selectField" style="height: 30px;"
							readonly="readonly">

					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">ITEM QUANTITY</label> <input type="text"
							name="itemQty" id="itemQty" required="required"
							placeholder="ENTER QUANTITY" /> <small id="vitemQty"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">ITEM WEIGHT</label> <input type="text" name="itemWt"
							id="itemWt" required="required" placeholder="ENTER ITEM WEIGHT" />
						<small id="vitemWt" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">GROSS WEIGHT</label> <input type="text"
							name="grosswt" id="grossWt" required="required"
							placeholder="ENTER GROSS WEIGHT" readonly="readonly" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">STONE WEIGHT</label> <input type="text"
							name="stoneWt" id="stoneWt" required="required"
							placeholder="ENTER STONE WEIGHT" /> <small id="vstoneWt"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">NET WEIGHT</label> <input type="text" name="netWt"
							id="netWt" required="required" placeholder="ENTER NET WEIGHT"
							readonly="readonly" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">MARKET VALUATION</label> <input type="text"
							name="marketValuatiion" id="marketValuation" required="required"
							placeholder="ENTER MARKET VALUATION" readonly="readonly" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">ELIGIBLE LOAN</label> <input type="text"
							name="eligibleLoan" id="eligibleLoan" required="required"
							placeholder="ENTER ELIGIBLE LOAN" readonly="readonly" />
					</div>
				</div>

			</div>
		</div>




		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">Guarantor Details</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>GUARANTOR CUSTOMER CODE </label>
						<div class="position-relative">
							<select id="guarantorcustomerCode" name="guarantorcustomerCode"
								required="required" class="form-control selectField"
								style="height: 30px;">
								<option value="">SELECT CUSTOMER CODE</option>

							</select>
						</div>
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">GUARANTOR IDENTITY</label> <select
							id="gurantorIdentity" name="guarantorIdentity"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT</option>
							<option value="Aadhar">AADHAR</option>
							<option value="PAN">PAN</option>
						</select> <small id="vgurantorIdentity" style="color: red;"></small>

					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">GUARANTOR ADDRESS</label>
						<textarea name="guarantorAddress" id="guarantorAddress"
							placeholder="ENTER ADDRESS"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"
							readonly="readonly"></textarea>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">GUARANTOR PIN CODE</label> <input type="text"
							name="guarantorPinCode" id="guarantorPinCode" required="required"
							placeholder="ENTER PIN CODE" readonly="readonly" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">GUARANTOR CONTACT NO.</label> <input type="text"
							name="guarantorContactNo" id="guarantorContactNo"
							required="required" placeholder="ENTER GUARANTOR CONTACT NO."
							readonly="readonly" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">GUARANTOR SECURITY TYPE</label> <select
							id="guarantorSecurityType" name="guarantorSecurityType"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="Gold">GOLD</option>
						</select>
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
						<label>CO-APPLICANT CUSTOMER CODE </label>
						<div class="position-relative">
							<select id="coApplicantMemberId" name="coApplicantMemberId"
								required="required" class="form-control selectField"
								style="height: 30px;">
								<option value="">CUSTOMER CODE</option>

							</select>
						</div>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CO-APPLICANT IDENTITY</label> <Select
							id="coApplicantIdentity" name="coApplicantIdentity"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value=" ">Select</option>
							<option value="Aadhar">AADHAR</option>
							<option value="PAN">PAN</option>
						</Select> <small id="vcoApplicantIdentity" style="color: red;"></small>

					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">CO-APPLICANT Address</label>
						<textarea name="coApplicantAddress" id="coApplicantAddress"
							placeholder="ENTER ADDRESS"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"
							readonly="readonly"></textarea>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CO-APPLICANT AGE</label> <input type="text" name="coAge"
							id="coAge" required="required" placeholder="ENTER AGE"
							readonly="readonly" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">CO-APPLICANT CONTACT NO.</label> <input type="text"
							name="coApplicantContactNo" id="coApplicantContactNo"
							required="required" placeholder="ENTER CO-APPLICANT CONTACT NO."
							readonly="readonly" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CO-APPLICANT SECURITY TYPE</label> <select id="securityDetails"
							name="securityDetails" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="Gold">GOLD</option>

						</select>
					</div>
				</div>

			</div>
		</div>
		<br> <br>

		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">DEDUCTION DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">

					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">PROCESSING FEE </label> <input type="text"
							name="processingFee" id="processingFee" required="required"
							style="text-transform: uppercase;"
							placeholder="ENTER PROCESSING FEE" /> <small id="vprocessingFee"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">LEGAL CHARGES </label> <input type="text"
							name="legalCharges" id="legalCharges" required="required"
							style="text-transform: uppercase;"
							placeholder="ENTER LEGAL CHARGES" /> <small id="vlegalCharges"
							style="color: red;"></small>
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="stampDuty">STAMP DUTY</label> <input type="text"
							name="stampDuty" id="stampDuty" required="required"
							placeholder="ENTER STAMP DUTY FEE"
							style="text-transform: uppercase;" /> <small id="vstampDuty"
							style="color: red;"></small>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="loanName">SMS CHARGES</label> <input type="text"
							name="smsCharges" id="smsCharges" required="required"
							placeholder="ENTER SMS CHARGES FEE"
							style="text-transform: uppercase;" /> <small id="vsmsCharges"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="MainCharges">MAINTAINANCE CHARGES</label> <input
							type="text" name="mainCharges" id="mainCharges"
							required="required" placeholder="ENTER MAINTAINANCE CHARGES"
							style="text-transform: uppercase;" /> <small id="vmainCharges"
							style="color: red;"></small>
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">STATIONARY CHARGES FEE</label> <input type="text"
							name="stationaryFee" id="stationaryFee" required="required"
							placeholder="ENTER STATIONARY CHARGES FEE" /> <small
							id="vstationaryFee" style="color: red;"></small>
					</div>
				</div>




				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">GST</label> <input type="text" name="gst" id="gst"
							required="required" placeholder="ENTER GST"
							style="text-transform: uppercase;" /> <small id="vgst"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">INSURANCE FEES</label> <input type="text"
							name="insuFee" id="insuFee" required="required"
							placeholder="ENTER INSURANCE FEES"
							style="text-transform: uppercase;" /> <small id="vinsuFee"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">PENALTY CHARGE</label> <input type="text"
							name="penaltyCharge" id="penaltyCharge" required="required"
							placeholder="ENTER PENALTY CHARGE"
							style="text-transform: uppercase;" /> <small id="vpenaltyCharge"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">VALUATION FEES</label> <input type="text"
							name="valuationFees" id="valuationFees" required="required"
							placeholder="ENTER VALUATION FEES"
							style="text-transform: uppercase;" /> <small id="vvaluationFees"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">OVERDUE INTEREST CHARGE</label> <input type="text"
							name="overCharge" id="overCharge" required="required"
							placeholder="ENTER OVERDUE INTEREST CHARGE"
							style="text-transform: uppercase;" /> <small id="voverCharge"
							style="color: red;"></small>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">COLLECTION CHARGE</label> <input type="text"
							name="collectionCharge" id="collectionCharge" required="required"
							placeholder="ENTER COLLECTION CHARGE"
							style="text-transform: uppercase;" /> <small
							id="vcollectionCharge" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4"
						style="margin-bottom: 30px">
						<label> FINANCIAL CONSULTANT ID</label>
						<div class="position-relative">
							<select id="financialConsultantId" name="financialConsultantId"
								required="required" class="form-control selectField"
								style="height: 30px;">
								<option value=""></option>
							</select> <small id="vfinancialConsultantId" style="color: red;"></small>
						</div>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">FINANCIAL CONSULTANT NAME</label> <input type="text"
							name="financialConsultantName" id="financialConsultantName"
							required="required" placeholder="ENTER FINANCIAL CONSULTANT NAME"
							style="text-transform: uppercase;" />
					</div>
				</div>



			</div>
		</div>

		<div class="row">
			<div class="col-12 text-center">
				<button type="button" id="saveBtn" class="btnStyle bg-success"
					onclick="saveGoldapplication()">SAVE</button>
				<!-- <button id="saveBtn" class="btnStyle" style="background-color: #FFA500;">Update</button>
                        <button id="saveBtn" class="btnStyle bg-primary">Print</button> -->
			</div>
		</div>
	</form>
</div>
<script src="./js/SecuredGoldLoan/ApplyForGold.js"></script>

<script>
document.addEventListener('DOMContentLoaded', function () {
	const toggles = document.querySelectorAll('.toggle__input');
	
	toggles.forEach((toggle) => {
		updateToggleColor(toggle);

		toggle.addEventListener('change', () => {
			updateToggleColor(toggle);
			console.log(`${toggle.dataset.toggleType} is now ${toggle.checked}`);
		});
	});

	function updateToggleColor(input) {
		const label = input.nextElementSibling;
		if (label) {
			label.style.backgroundColor = input.checked ? '#28a745' : '#ccc';
		}
	}
});
</script>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        const LOAN_PERCENTAGE = 0.75; // 75%

        const karatRate = document.getElementById("karatRate");
        const grossWt = document.getElementById("grossWt");
        const stoneWt = document.getElementById("stoneWt");
        const netWt = document.getElementById("netWr");
        const marketValuation = document.getElementById("marketValuation");
        const eligibleLoan = document.getElementById("eligibleLoan");

        function calculateValues() {
            let gross = parseFloat(grossWt.value) || 0;
            let stone = parseFloat(stoneWt.value) || 0;
            let rate = parseFloat(karatRate.value) || 0;

            let net = gross - stone;
            if (net < 0) net = 0;

            let valuation = net * rate;
            let loan = valuation * LOAN_PERCENTAGE;

            netWt.value = net.toFixed(2);
            marketValuation.value = valuation.toFixed(2);
            eligibleLoan.value = loan.toFixed(2);
        }

        [karatRate, grossWt, stoneWt].forEach(input => {
            input.addEventListener("input", calculateValues);
        });
    });
    
    $("select option").each(function() {
        $(this).text($(this).text().toUpperCase());
    });

  </script>
<script
	src="${pageContext.request.contextPath}/js/SecuredGoldLoan/ApplyForGold.js"></script>