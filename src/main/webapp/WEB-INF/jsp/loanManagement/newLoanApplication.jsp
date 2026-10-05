<div class="pagetitle">
	<h1>LOAN MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-cash-coin"></i>
			</a></li>
			<li class="breadcrumb-item action">NEW LOAN APPLICATION</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">NEW LOAN DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<input type="hidden" id="loanId" name="loanId" value="${loanCode}">
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
						<label>FIND CUSTOMER</label> <select id="memberId" name="memberId"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">--SELECT CUSTOMERS--</option>

						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">RELATIVE DETAILS </label> <input type="text"
							name="relativeDetails" id="relativeDetails" required="required"
							placeholder="ENTER RELATIVE DETAILS" readonly="readonly"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">DATE OF BIRTH </label> <input type="date"
							name="dateOfBirth" id="dateOfBirth" required="required"
							placeholder="ENTER DATE OF BIRTH" readonly="readonly"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">AGE</label> <input type="text" name="age" id="age"
							required="required" placeholder="ENTER AGE" readonly="readonly" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CONTACT NO.</label> <input type="text"
							name="contactNo" id="contactNo" required="required"
							placeholder="ENTER CONTACT NO." readonly="readonly" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">ADDRESS</label>
						<textarea name="address" id="address" readonly="readonly"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"></textarea>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">PIN CODE</label> <input type="number"
							name="pinCode" id="pinCode" required="required"
							readonly="readonly" placeholder="ENTER PIN CODE"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">BRANCH NAME </label> <input type="text"
							name="branchName" id="branchName" required="required"
							readonly="readonly" placeholder=" ENTER BRANCH NAME" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>LOAN PLAN NAME</label> <select id="loanPlanName"
							name="loanPlanName" required="required"
							class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT LOAN PLAN</option>

						</select>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">TYPE OF LOAN</label> <input type="text"
							name="typeOfLoan" id="typeOfLoan" required="required"
							readonly="readonly" placeholder="ENTER TYPE OF PLAN"
							style="text-transform: uppercase;" />

					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN MODE</label> <input type="text" name="loanMode"
							id="loanMode" required="required" placeholder="ENTER LOAN MODE"
							readonly="readonly" style="text-transform: uppercase;" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN TERM</label> <input type="text" name="loanTerm"
							id="loanTerm" required="required" placeholder="ENTER LOAN TERM"
							readonly="readonly" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">RATE OF INTEREST(%)</label> <input type="text"
							name="rateOfInterest" id="rateOfInterest" required="required"
							readonly="readonly" placeholder="ENTER RATE OF INTEREST"
							style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<input type="hidden" id="hiddenLoanAmount"> <label for="">AMOUNT
							OF LOAN </label> <input type="text" name="loanAmount" id="loanAmount"
							required="required" placeholder="ENTER AMOUNT OF LOAN"
							oninput="calculateNewFees()" style="text-transform: uppercase;" />
						<small id="chkloanamount" style="color: red;"></small>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">INTEREST TYPE</label> <input type="text"
							name="interestType" id="interestType" required="required"
							placeholder="ENTER INTEREST TYPE" readonly="readonly"
							style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">EMI PAYMENT</label> <input type="number"
							name="emiPayment" id="emiPayment" required="required"
							class="form-control" placeholder="ENTER EMI PAYMENT"
							style="text-transform: uppercase;" 	readonly/>

					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">PURPOSE OF LOAN </label> <input type="text"
							name="purposeOfLoan" id="purposeOfLoan" required="required"
							placeholder="ENTER PURPOSE OF LOAN"
							style="text-transform: uppercase;" />
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
									<input type="checkbox" id="messageStatus" name="messageStatus"
										class="toggle__input" data-toggle-type="member-status">
									<label for="messageStatus" class="toggle__label"></label>
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
					</label> <label for="Photo" id="drop-area"> <input accept="image/*"
						name="photo" id="photo" hidden="hidden" onchange=""
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
					</label> <label for="signature" id="drop-area"> <input
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


		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">GUARANTOR DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>CUSTOMER ID</label>
						<div class="position-relative">
							<select id="guarantorMemberId" name="guarantorMemberId"
								required="required" class="form-control selectField"
								style="height: 30px;">
								<option value="">SELECT CUSTOMER ID</option>

							</select>
						</div>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">GUARANTOR IDENTITY</label> <select
							id="guarantorIdentity" name="guarantorIdentity"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">-- SELECT GUARANTOR IDENTITY --</option>
							<option value="Aadhar">AADHAR</option>
							<option value="Pan Card">PAN CARD</option>
						</select>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">ADDRESS</label>
						<textarea name="guarantorAddress" id="guarantorAddress"
							readonly="readonly"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"></textarea>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">PIN CODE</label> <input type="text"
							name="guarantorPinCode" id="guarantorPinCode" required="required"
							readonly="readonly" placeholder="ENTER PIN CODE" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">GUARANTOR CONTACT NO.</label> <input type="text"
							name="guarantorContactNo" id="guarantorContactNo"
							readonly="readonly" required="required"
							placeholder="ENTER GUARANTOR CONTACT NO." />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">SECURITY TYPE</label> <select
							id="guarantorSecurityType" name="guarantorSecurityType"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">-- SELECT SECURITY TYPE --</option>
							<option value="Pledge">PLEDGE</option>
							<option value="Mortgage">MORTGAGE</option>
							<option value="Property">PROPERTY</option>
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
						<label> CUSTOMER ID </label>
						<div class="position-relative">
							<select id="coApplicantMemberId" name="coApplicantMemberId"
								required="required" class="form-control selectField"
								style="height: 30px;">
								<option value="">SELECT CUSTOMER ID</option>

							</select>
						</div>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CO-APPLICANT IDENTITY</label> <select
							id="coApplicantIdentity" name="coApplicantIdentity"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">-- SELECT CO-APPLICANT IDENTITY --</option>
							<option value="Aadhar">AADHAR</option>
							<option value="Pan Card">PAN CARD</option>
						</select>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">ADDRESS</label>
						<textarea name="coApplicantAddress" id="coApplicantAddress"
							readonly="readonly"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"></textarea>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">PIN CODE</label> <input type="text"
							name="coApplicantPinCode" id="coApplicantPinCode"
							readonly="readonly" required="required"
							placeholder="ENTER PIN CODE" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">CO-APPLICANT CONTACT NO.</label> <input type="text"
							name="coApplicantContactNo" id="coApplicantContactNo"
							readonly="readonly" required="required"
							placeholder="ENTER GUARANTOR CONTACT NO." />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">SECURITY TYPE</label> <select
							id="coApplicantSecurityType" name="coApplicantSecurityType"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">-- SELECT SECURITY TYPE --</option>
							<option value="Pledge">PLEDGE</option>
							<option value="Mortgage">MORTGAGE</option>
							<option value="Property">PROPERTY</option>
							<option value="Gold">GOLD</option>
						</select>
					</div>
				</div>

			</div>
		</div>


		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">DEDUCTION DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">

					<div class="d-flex flex-column formFields mb-4">
						<input type="hidden" id="hiddenProcessingFee"> <label
							for="loanName">PROCESSING FEE </label> <input type="text"
							name="processingFee" id="processingFee" required="required"
							readonly="readonly" placeholder="ENTER PROCESSING FEE"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<input type="hidden" id="hiddenLegalCharges"> <label
							for="loanName">LEGAL CHARGES </label> <input type="text"
							name="legalCharges" id="legalCharges" required="required"
							readonly="readonly" placeholder="ENTER LEGAL CHARGES"
							style="text-transform: uppercase;" />
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<input type="hidden" id="hiddenGST"> <label for="loanName">GST</label>
						<input type="text" name="gst" id="gst" required="required"
							readonly="readonly" placeholder="ENTER STAMP DUTY FEE"
							placeholder="ENTER GST" style="text-transform: uppercase;" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<input type="hidden" id="hiddenInsuranceFee"> <label
							for="loanName">INSURANCE FEE</label> <input type="text"
							name="insuranceFee" id="insuranceFee" required="required"
							readonly="readonly" placeholder="ENTER INSURANCE FEE"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<input type="hidden" id="hiddenValuationFees"> <label
							for="loanName">VALUATION FEES</label> <input type="text"
							name="valuationFees" id="valuationFees" required="required"
							readonly="readonly" placeholder="ENTER INTEREST CHARGE"
							style="text-transform: uppercase;" />
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<input type="hidden" id="hiddenStationaryCharge"> <label
							for="">STATIONARY CHARGES FEE</label> <input type="text"
							name="stationaryFee" id="stationaryFee" required="required"
							readonly="readonly" placeholder="ENTER STATIONARY CHARGES FEE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4"
						style="margin-bottom: 30px">
						<label> FINANCIAL CONSULTANT ID</label>
						<div class="position-relative">
							<select id="financialConsultantId" name="financialConsultantId"
								class="form-control selectField" style="height: 30px;">
								<option value="">ENTER FINANCIAL CONSULTANT ID</option>

							</select>
						</div>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">FINANCIAL CONSULTANT NAME</label> <input type="text"
							readonly="readonly" name="financialConsultantName"
							id="financialConsultantName"
							placeholder="ENTER FINANCIAL CONSULTANT NAME"
							style="text-transform: uppercase;" />
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-12 text-center">
				<button type="button" id="saveBtn" class="btnStyle bg-success">SAVE</button>
				<!-- <button id="saveBtn" class="btnStyle" style="background-color: #FFA500;">Update</button>
                        <button id="saveBtn" class="btnStyle bg-primary">Print</button> -->
			</div>
		</div>
	</form>
</div>
<script>
	document.addEventListener('DOMContentLoaded', () => {
		const toggles = document.querySelectorAll('.toggle__input');

		toggles.forEach((toggle) => {
			// Initialize colors
			updateToggleColor(toggle);

			// console.log("updated toggle" , toggle)

			// Add change event listener
			toggle.addEventListener('change', () => {
				updateToggleColor(toggle);
				// console.log(${ toggle.dataset.toggleType } is now ${ toggle.checked });
			});
		});

		function updateToggleColor(input) {
			const label = input.nextElementSibling;
			if (input.checked) {
				label.style.backgroundColor = '#28a745'; // Green ON
			} else {
				label.style.backgroundColor = '#ccc'; // Gray OFF
			}
		}
	}); 
</script>
<script
	src="${pageContext.request.contextPath}/js/LoanManagment/NewLoanApplicationjs.js"></script>