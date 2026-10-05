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
	<form id="formid" onsubmit="return false;">
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
					<div class="d-flex flex-column formFields mb-4">
						<label for="typeOfLoan">TYPE OF LOAN <span class="star">*</span></label>
						<input list="typeOfLoanList" id="typeOfLoan" name="typeOfLoan" required="required"
							class="form-control" style="height: 30px; font-size: 12px; text-transform: uppercase;"
							placeholder="SELECT OR ENTER TYPE OF LOAN" />
						<datalist id="typeOfLoanList">
							<option value="Personal Loan">PERSONAL LOAN</option>
							<option value="Business Loan">BUSINESS LOAN</option>
							<option value="TW Loan">TW LOAN</option>
							<option value="TW Refinance Loan">TW REFINANCE LOAN</option>
							<option value="CDL Loan">CDL LOAN</option>
							<option value="Loan Against FD/RD/DRD">LOAN AGAINST FD/RD/DRD</option>
						</datalist>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanMode">LOAN MODE</label>
						<input list="loanModeList" type="text" name="loanMode"
							id="loanMode" required="required" placeholder="ENTER LOAN MODE"
							class="form-control" style="height: 30px; font-size: 12px; text-transform: uppercase;" />
						<datalist id="loanModeList">
							<option value="Daily">DAILY</option>
							<option value="Weekly">WEEKLY</option>
							<option value="Fortnightly">FORTNIGHTLY</option>
							<option value="Monthly">MONTHLY</option>
							<option value="Quarterly">QUARTERLY</option>
							<option value="Half-Yearly">HALF-YEARLY</option>
							<option value="Yearly">YEARLY</option>
						</datalist>
					</div>
				</div>


<style>
	.border-warning-range {
		border: 1.5px solid #f59e0b !important;
		box-shadow: 0 0 0 0.2rem rgba(245, 158, 11, 0.25) !important;
	}
</style>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanTerm" id="loanTermLabel">LOAN TERM (MONTHS)</label> <input type="number" name="loanTerm"
							id="loanTerm" required="required" placeholder="ENTER LOAN TERM (MONTHS)"
							class="form-control" style="height: 30px; font-size: 12px; text-transform: uppercase;" />
						<small id="loanTermHelper" class="form-text text-muted" style="font-size: 11px; margin-top: 3px;"></small>
						<small id="loanTermWarning" class="form-text" style="color: #d97706; font-size: 11px; margin-top: 2px; display: none; font-weight: 600;">Outside typical range for this mode</small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="rateOfInterest" id="rateOfInterestLabel">RATE OF INTEREST(%)</label> <input type="number"
							step="0.01" min="0" name="rateOfInterest" id="rateOfInterest" required="required"
							placeholder="ENTER RATE OF INTEREST" class="form-control"
							style="height: 30px; font-size: 12px; text-transform: uppercase;" />
						<small id="roiHelper" class="form-text text-muted" style="font-size: 11px; margin-top: 3px;"></small>
						<small id="roiWarning" class="form-text" style="color: #d97706; font-size: 11px; margin-top: 2px; display: none; font-weight: 600;">Outside typical range for this mode</small>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<input type="hidden" id="hiddenLoanAmount"> <label for="loanAmount">AMOUNT
							OF LOAN </label> <input type="number" step="0.01" min="0" name="loanAmount" id="loanAmount"
							required="required" placeholder="ENTER AMOUNT OF LOAN"
							class="form-control" style="height: 30px; font-size: 12px; text-transform: uppercase;" />
						<small id="chkloanamount" style="color: red;"></small>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="interestType">INTEREST TYPE <span class="star" style="color: red;">*</span></label>
						<input list="interestTypeList" type="text"
							name="interestType" id="interestType" required="required"
							placeholder="SELECT OR ENTER INTEREST TYPE" class="form-control"
							style="height: 30px; font-size: 12px; text-transform: uppercase;" />
						<datalist id="interestTypeList">
							<option value="Reducing Interest">REDUCING INTEREST</option>
							<option value="Flat Interest">FLAT INTEREST</option>
							<option value="Rule 78">RULE 78</option>
							<option value="Reducing">REDUCING</option>
							<option value="Flat">FLAT</option>
						</datalist>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="emiPayment">EMI PAYMENT (&#8377;)</label> <input type="number"
							step="0.01" min="0" name="emiPayment" id="emiPayment" required="required"
							class="form-control" placeholder="ENTER EMI PAYMENT"
							style="height: 30px; font-size: 12px; font-weight: bold; text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="totalInterest">TOTAL INTEREST (&#8377;)</label> <input type="text"
							name="totalInterest" id="totalInterest" readonly
							class="form-control" placeholder="TOTAL INTEREST"
							style="height: 30px; font-size: 12px; font-weight: bold; background: #f0f7ff; color: #0369a1;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="totalPayableAmount">TOTAL AMOUNT TO PAY (&#8377;)</label> <input type="text"
							name="totalPayableAmount" id="totalPayableAmount" readonly
							class="form-control" placeholder="TOTAL AMOUNT TO PAY"
							style="height: 30px; font-size: 12px; font-weight: bold; background: #e8f5e9; color: #047857;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="purposeOfLoan">PURPOSE OF LOAN </label> <input type="text"
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

				<!-- Visual Repayment & Interest Summary Banner -->
				<div class="col-12" id="repaymentBreakdownBox" style="display: none; margin-top: 5px; margin-bottom: 20px;">
					<div style="background: linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%); border: 1px solid #cbd5e1; border-left: 4px solid #0284c7; border-radius: 8px; padding: 12px 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
						<div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
							<div>
								<span style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Loan Principal:</span>
								<span id="summaryPrincipalText" style="font-size: 13px; font-weight: 700; color: #1e293b; margin-left: 5px;">&#8377; 0.00</span>
							</div>
							<div style="font-size: 14px; color: #94a3b8; font-weight: bold;">+</div>
							<div>
								<span style="font-size: 11px; font-weight: 700; color: #0284c7; text-transform: uppercase;">Total Interest:</span>
								<span id="summaryInterestText" style="font-size: 13px; font-weight: 700; color: #0369a1; margin-left: 5px;">&#8377; 0.00</span>
							</div>
							<div style="font-size: 14px; color: #94a3b8; font-weight: bold;">=</div>
							<div>
								<span style="font-size: 11px; font-weight: 700; color: #059669; text-transform: uppercase;">Total Amount to Pay:</span>
								<span id="summaryPayableText" style="font-size: 14px; font-weight: 800; color: #047857; margin-left: 5px;">&#8377; 0.00</span>
							</div>
							<div style="border-left: 1px solid #cbd5e1; padding-left: 15px;">
								<span style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">EMI Breakdown:</span>
								<span id="summaryEmiText" style="font-size: 12px; font-weight: 700; color: #475569; margin-left: 5px;">-</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Dynamic Loan Fields Container -->
			<div id="dynamicLoanFields" class="row"></div>

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
						<label for="guarantorIdentity">GUARANTOR IDENTITY</label> <select
							id="guarantorIdentity" name="guarantorIdentity"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">-- SELECT GUARANTOR IDENTITY --</option>
							<option value="Aadhar">AADHAR</option>
							<option value="Pan Card">PAN CARD</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3" id="guarantorIdentityNoContainer" style="display: none;">
					<div class="d-flex flex-column formFields mb-4">
						<label for="guarantorIdentityNo" id="guarantorIdentityNoLabel">AADHAR NUMBER</label>
						<input type="text" name="guarantorIdentityNo" id="guarantorIdentityNo"
							placeholder="ENTER AADHAR NUMBER" style="text-transform: uppercase;" />
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
					<div class="d-flex flex-column formFields mb-4">
						<label for="">GUARANTOR CONTACT NO.</label> <input type="text"
							name="guarantorContactNo" id="guarantorContactNo"
							readonly="readonly" required="required"
							placeholder="ENTER GUARANTOR CONTACT NO." />
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
						<label for="coApplicantIdentity">CO-APPLICANT IDENTITY</label> <select
							id="coApplicantIdentity" name="coApplicantIdentity"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">-- SELECT CO-APPLICANT IDENTITY --</option>
							<option value="Aadhar">AADHAR</option>
							<option value="Pan Card">PAN CARD</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3" id="coApplicantIdentityNoContainer" style="display: none;">
					<div class="d-flex flex-column formFields mb-4">
						<label for="coApplicantIdentityNo" id="coApplicantIdentityNoLabel">AADHAR NUMBER</label>
						<input type="text" name="coApplicantIdentityNo" id="coApplicantIdentityNo"
							placeholder="ENTER AADHAR NUMBER" style="text-transform: uppercase;" />
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
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CO-APPLICANT CONTACT NO.</label> <input type="text"
							name="coApplicantContactNo" id="coApplicantContactNo"
							readonly="readonly" required="required"
							placeholder="ENTER GUARANTOR CONTACT NO." />
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
							for="processingFee">PROCESSING FEE </label> <input type="number"
							step="0.01" min="0" name="processingFee" id="processingFee"
							placeholder="ENTER PROCESSING FEE" class="form-control"
							style="height: 30px; font-size: 12px;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<input type="hidden" id="hiddenLegalCharges"> <label
							for="legalCharges">LEGAL CHARGES </label> <input type="number"
							step="0.01" min="0" name="legalCharges" id="legalCharges"
							placeholder="ENTER LEGAL CHARGES" class="form-control"
							style="height: 30px; font-size: 12px;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<input type="hidden" id="hiddenGST"> <label for="gst">GST (18%)</label>
						<input type="number" step="0.01" min="0" name="gst" id="gst"
							placeholder="ENTER GST" class="form-control"
							style="height: 30px; font-size: 12px;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<input type="hidden" id="hiddenInsuranceFee"> <label
							for="insuranceFee">INSURANCE FEE</label> <input type="number"
							step="0.01" min="0" name="insuranceFee" id="insuranceFee"
							placeholder="ENTER INSURANCE FEE" class="form-control"
							style="height: 30px; font-size: 12px;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<input type="hidden" id="hiddenValuationFees"> <label
							for="valuationFees">VALUATION FEES</label> <input type="number"
							step="0.01" min="0" name="valuationFees" id="valuationFees"
							placeholder="ENTER VALUATION FEES" class="form-control"
							style="height: 30px; font-size: 12px;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<input type="hidden" id="hiddenStationaryCharge"> <label
							for="stationaryFee">STATIONARY CHARGES FEE</label> <input type="number"
							step="0.01" min="0" name="stationaryFee" id="stationaryFee"
							placeholder="ENTER STATIONARY CHARGES FEE" class="form-control"
							style="height: 30px; font-size: 12px;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4"
						style="margin-bottom: 30px">
						<label> EMPLOYEE ID</label>
						<div class="position-relative">
							<select id="financialConsultantId" name="financialConsultantId"
								class="form-control selectField" style="height: 30px;">
								<option value="">SELECT EMPLOYEE ID</option>

							</select>
						</div>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">EMPLOYEE NAME</label> <input type="text"
							readonly="readonly" name="financialConsultantName"
							id="financialConsultantName"
							placeholder="ENTER EMPLOYEE NAME"
							style="text-transform: uppercase;" />
					</div>
				</div>
			</div>
		</div>

		<!-- Deduction Summary Panel -->
		<div class="row mt-3 mb-4">
			<div class="col-12">
				<div class="card border shadow-sm" style="background: #f8fafc; border-radius: 8px;">
					<div class="card-body p-3">
						<div class="row text-center align-items-center">
							<div class="col-md-4 mb-2 mb-md-0 border-end">
								<div class="text-muted small text-uppercase font-weight-bold">Loan Amount</div>
								<h5 class="mb-0 font-weight-bold text-dark">&#8377;<span id="summaryLoanAmount">0.00</span></h5>
							</div>
							<div class="col-md-4 mb-2 mb-md-0 border-end">
								<div class="text-muted small text-uppercase font-weight-bold">Total Deductions</div>
								<h5 class="mb-0 font-weight-bold text-secondary">&#8377;<span id="summaryTotalDeductions">0.00</span></h5>
							</div>
							<div class="col-md-4">
								<div class="text-muted small text-uppercase font-weight-bold">Net Disbursement Amount</div>
								<h5 class="mb-0 font-weight-bold" id="summaryNetDisbursementWrapper" style="color: #16a34a;">
									&#8377;<span id="summaryNetDisbursement">0.00</span>
								</h5>
							</div>
						</div>
						<div id="deductionWarning" class="alert alert-danger mt-3 mb-0 py-2 d-none text-center font-weight-bold" role="alert"></div>
					</div>
				</div>
				<input type="hidden" id="netDisbursementAmount" name="netDisbursementAmount" value="0.00" />
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
	src="${pageContext.request.contextPath}/js/LoanManagment/loanTypeFieldsConfig.js?v=<%= System.currentTimeMillis() %>"></script>
<script
	src="${pageContext.request.contextPath}/js/LoanManagment/NewLoanApplicationjs.js?v=<%= System.currentTimeMillis() %>"></script>