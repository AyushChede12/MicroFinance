
<div class="pagetitle">
	<h1>DATA CORRECTION</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-pencil-square"></i>
			</a></li>
			<li class="breadcrumb-item action">CUSTOMER DATA UPDATE</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action" id="editmember">EDIT MEMBER</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-5">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 20px;">
						<label for="customerCode" id="customerSelection">CUSTOMER
							SELECTION </label> <select id="customerCode" name="customerCode"
							class="form-control selectField" style="width: 100%;">
							<option value="">-- SEARCH CUSTOMER CODE --</option>
						</select>
					</div>
				</div>
			</div>

			<hr>
			<div class="row">
				<div class="col-lg-3">
					<!-- <div class="d-flex flex-column formFields" style="margin-bottom: 30px">
                <label>Verify With</label>
                <div class="position-relative">
                  <div class="select-btn1" style="cursor: pointer;">
                    <span name="cityName" id="cityNameId" style="font-size: 12px;">Select</span> <i
                      class="fa-solid fa-angle-down"></i>
                  </div>
                  <div class="content" id="contentCityName" style="display: none;">
                    <div class="search">
                      <input type="text" id="city-search" class="m-0" placeholder="Search City" />
                    </div>
                    <ul class="options" id="city-options">
                      <li>ABC</li>
                      <li>ABC</li>
                      <li>ABC</li>
                      <li>ABC</li>
                      <li>ABC</li>
                      <li>ABC</li>
                    </ul>
                  </div>
                </div>
              </div> -->
					<input type="hidden" id="id" name="id">
					<div class="d-flex flex-column formFields">
						<label for="">SIGN-UP DATE</label> <input type="date"
							name="signupDate" id="signupDate" required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="major">AUTHENTICATION FOR </label>
						<!-- <select
									id="major" name="major" required="required"
									class="form-control selectField" style="height: 30px;">
									<option value="">Select</option>
									<option value="Mr.">Mr.</option>
									<option value="Ms.">Ms.</option>
									<option value="Other">Other</option>
								</select> -->
						<input type="text" name="authenticateFor" id="authenticateFor"
							required="required" placeholder="ENTER MAJOR "
							style="text-transform: uppercase;" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>CUSTOMER NAME</label> <input type="text"
							name="customerName" id="customerName" required="required"
							placeholder="ENTER CUSTOMER NAME"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>RELATION TO APPLICANT</label>
						<!-- <select
									id="relationToApplicant" name="relationToApplicant"
									required="required" class="form-control selectField"
									style="height: 30px;"> -->
						<input type="text" name="relationToApplicant"
							id="relationToApplicant" required="required"
							placeholder="ENTER RELATION " style="text-transform: uppercase;" />
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">GENDER</label>
						<!-- <select id="customerGender"
									name="customerGender" required="required"
									class="form-control selectField" style="height: 30px;">
									<option value="">Select Gender</option>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
									<option value="Other">Other</option>
								</select> -->
						<input type="text" name="customerGender" id="customerGender"
							required="required" placeholder="ENTER GENDER " />

					</div>
				</div>

				<div class="col-lg-3 mb-4" id="guardianDetails">
					<div class="d-flex flex-column formFields">
						<label for="guardianName">GUARDIAN NAME <span class="star">*</span></label>
						<input type="text" name="guardianName" id="guardianName"
							required="required" placeholder="ENTER GUARDIAN NAME" /> <small
							id="chkguardianname" style="color: red;"></small>

					</div>
				</div>

				<div class="col-lg-3 mb-4" "
					id="guardianAccountNo">
					<div class="d-flex flex-column formFields">
						<label for="guardianAccNo">GUARDIAN ACCOUNT NO <span
							class="star">*</span></label> <input type="text" name="guardianAccountNo"
							id="guardianAccNo" placeholder="ENTER ACCOUNT NO" /> <small
							id="chkguardianaccno" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>DATE OF BIRTH </label> <input type="date" name="dob"
							id="dob" required="required" placeholder="ENTER RELATIVE NAME "
							style="text-transform: uppercase;" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label for="">AGE</label> <input type="number" name="customerAge"
							id="customerAge" required="required" placeholder="ENTER AGE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">REALTIONSHIP STATUS </label>
						<!-- <select
									id="relationshipStatus" name="relationshipStatus"
									required="required" class="form-control selectField"
									style="height: 30px;">
									<option value="">Select Marital Status</option>
									<option value="Married">Married</option>
									<option value="Unmarried">Unmarried</option>
									<option value="Divorced">Divorced</option>
									<option value="Single">Single</option>
								</select> -->
						<input type="text" name="relationshipStatus"
							id="relationshipStatus" required="required"
							placeholder="ENTER RELATIONSHIP STATUS " />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">ADDRESS</label>
						<textarea name="customerAddress" id="customerAddress"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"></textarea>
					</div>
				</div>

				<div class="col-lg-3 mb-3">
					<div class="d-flex flex-column formFields">
						<label for="">CATEGORY <span class="star">*</span></label><input
							type="text" name="category" id="category" required="required"
							placeholder="ENTER CATEGORY " /> <small id="chkcategory"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3 mb-3">
					<div class="d-flex flex-column formFields">
						<label for="">CASTE <span class="star">*</span></label><input
							type="text" name="caste" id="caste" required="required"
							placeholder="ENTER CASTE " /> <small id="chkcaste"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>DISTRICT</label> <input type="text" name="district"
							id="district" required="required" placeholder="ENTER DISTRICT " />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">STATE</label> <input type="text" name="state"
							id="state" required="required" placeholder="ENTER STATE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">BRANCH NAME </label>
						<!-- <select id="branchName"
									name="branchName" required="required"
									class="form-control selectField" style="height: 30px;">

								</select> -->
						<input type="text" name="branchName" id="branchName"
							required="required" placeholder="ENTER BRANCH" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>PIN CODE </label> <input type="number" name="pinCode"
							id="pinCode" required="required" placeholder="ENTER PINCODE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">AADHAR NO</label> <input type="text" name="aadharNo"
							id="aadharNo" required="required" placeholder="ENTER AADHAR NO" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">PAN NO</label> <input type="text" name="panNo"
							id="panNo" required="required" placeholder="ENTER PAN NO" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>VOTOR NO</label> <input type="text" name="voterNo"
							id="voterNo" required="required" placeholder="ENTER VOTOR NO" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px;">
						<label for="">DRIVING LICENSE NO <span class="star">*</span></label>
						<input type="text" name="drivingLicenceNo" id="drivingLicenceNo"
							style="text-transform: uppercase;" required="required"
							placeholder="ENTER LICENSE NO" /> <small
							id="chkdrivinglicenseno" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">CONTACT NO</label> <input type="number"
							name="contactNo" id="contactNo" required="required"
							placeholder="ENTER CONTACT NO" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">EMAIL ID</label> <input type="text" name="emailId"
							id="emailId" required="required" placeholder="ENTER EMAIL ID" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">PROFESSION </label> <input type="text"
							name="profession" id="profession" required="required"
							placeholder="ENTER PROFESSION" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px;">
						<label for="">ACADEMIC BACKGROUND </label> <input type="text"
							name="academicBackground" id="academicBackground"
							required="required" placeholder="ENTER ACADEMIC BACKGROUND " />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label>REFERRAL CODE</label> <input type="text"
							name="referralCode" id="referralCode" required="required"
							placeholder="ENTER INTRO REFERRAL CODE " />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label>REFERRAL NAME</label> <input type="text"
							name="referralName" id="referralName" required="required"
							placeholder="ENTER INTRO REFERRAL NAME " />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="shareValue">SHARE VALUE</label> <input type="text"
							style="text-transform: uppercase;" name="shareValue"
							id="shareValue" required="required"
							placeholder="ENTER SHARE VALUE" />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="noOfShare">NO OF SHARE</label> <input type="text"
							style="text-transform: uppercase;" name="noOfShare"
							id="noOfShare" required="required"
							placeholder="ENTER NO OF SHARE" />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="shareAmount">SHARE AMOUNT</label> <input type="text"
							style="text-transform: uppercase;" name="shareAmount"
							id="shareAmount" required="required"
							placeholder="ENTER SHARE AMOUNT" readonly />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="lightBill">LIGHT BILL</label> <input type="text"
							style="text-transform: uppercase;" name="lightBill"
							id="lightBill" required="required"
							placeholder="ENTER LIGHT BILL NO" />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="taxBill">TAX BILL</label> <input type="text"
							style="text-transform: uppercase;" name="taxBill" id="taxBill"
							required="required" placeholder="ENTER TAX BILL NO" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label>IS Minor</label> <input type="text" name="minor" id="minor"
							required="required" placeholder="ENTER MINOR" />
					</div>
				</div>

			</div>

			<div class="row mt-4">

				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">AADHAR
						CARD</label> <label for="customerPhoto" id="drop-area"> <input
						type="file" accept="image/*" name="customerPhoto" id="customerPhoto"
						hidden="hidden" onchange="photoUpload();"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="Uploads/upload.png" alt="upload_icon" id="photoPreview" /><input
								type="hidden" name="photoHidden" id="photoHidden">

						</div>
					</label>
				</div>

				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">PAN
						CARD <span class="star">*</span>
					</label> <label for="customerSignature" id="drop-area"> <input
						type="file" accept="image/*" name="customerSignature"
						id="customerSignature" hidden="hidden"
						onchange="signatureUpload();"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="Uploads/upload.png" alt="upload_icon"
								id="signaturePreview" /><input type="hidden"
								name="signatureHidden" id="signatureHidden">

						</div>
					</label>
				</div>

				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">VOTER
						ID <span class="star">*</span>
					</label> <label for="customerVoter" id="drop-area"> <input
						type="file" accept="image/*" name="customerVoter"
						id="customerVoter" hidden="hidden" onchange="voterUpload();"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="Uploads/upload.png" alt="upload_icon" id="voterPreview" /><input
								type="hidden" name="voterHidden" id="voterHidden">

						</div>
					</label>
				</div>

				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">DRIVING
						LICENSE <span class="star">*</span>
					</label> <label for="customerDriving" id="drop-area"> <input
						type="file" accept="image/*" name="customerDriving"
						id="customerDriving" hidden="hidden" onchange="drivingUpload();"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="Uploads/upload.png" alt="upload_icon"
								id="drivingPreview" /><input type="hidden" name="drivingHidden"
								id="drivingHidden">

						</div>
					</label>
				</div>

				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">NEWLY
						ADDED IMAGE<span class="star">*</span>
					</label> <label for="newlyAddedImage" id="drop-area"> <input
						type="file" accept="image/*" name="newlyAddedImage"
						id="newlyAddedImage" hidden="hidden"
						onchange="newlyAddedUpload();"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="Uploads/upload.png" alt="upload_icon"
								id="newlyAddedPreview" /><input type="hidden"
								name="newlyAddedHidden" id="newlyAddedHidden">

						</div>
					</label>
				</div>

			</div>


			<div class="mt-5">
				<nav>
					<ol class="breadcrumb breadcrumb-title">
						<li class="breadcrumb-item action">NOMINEE DETAILS</li>
					</ol>
				</nav>
				<div class="row">
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>SUGGESTED NOMINEE </label> <input type="text"
								name="nomineeName" id="nomineeName" required="required"
								placeholder="ENTER NOMINEE NAME "
								style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="relationToApplicant">NOMINEE RELATION </label>
							<!-- <select
									id="nomineeRelationToApplicant"
									name="nomineeRelationToApplicant" required="required"
									class="form-control selectField" style="height: 30px;">

								</select> -->
							<input type="text" name="nomineeRelationToApplicant"
								id="nomineeRelationToApplicant" required="required"
								placeholder="ENTER NOMINEE RELATION "
								style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3 mb-4">
						<div class="d-flex flex-column formFields">
							<label for="nomineeDOB"> NOMINEE DOB <span class="star">*</span></label>
							<input type="date" name="nomineeDOB" id="nomineeDOB"
								required="required" /> <small id="chknomineedob"
								style="color: red;"></small>
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>NOMINEE ADDRESS</label> <input type="text"
								name="nomineeAddress" id="nomineeAddress" required="required"
								placeholder="ENTER NOMINEE ADDRESS"
								style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px;">
							<label for="">NOMINEE KYC ID </label> <input type="text"
								name="nomineeKycNo" id="nomineeKycNo" required="required"
								placeholder="ENTER NOMINEE KYC" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="">NOMINEE CONTACT NO. </label> <input type="text"
								name="nomineeMobileNo" id="nomineeMobileNo" required="required"
								placeholder="ENTER NOMINEE NO" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="">AGE OF NOMINEE </label> <input type="text"
								name="nomineeAge" id="nomineeAge" required="required"
								placeholder="ENTER NOMINEE AGE" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="">NOMINEE PAN NO. </label> <input type="text"
								name="nomineePanNo" id="nomineePanNo" required="required"
								placeholder="ENTER PAN NO" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="">NOMINEE KYC TYPE </label>
							<!-- <select
									id="nomineeKycType" name="nomineeKycType" required="required"
									class="form-control selectField" style="height: 30px;">
									<option value="">Select</option>
									<option value="Saving">Saving</option>
									<option value="Current">Current</option>

								</select> -->
							<input type="text" name="nomineeKycType" id="nomineeKycType"
								required="required" placeholder="ENTER NOMINEE KYC TYPE"
								style="text-transform: uppercase;" />
						</div>
					</div>

				</div>

			</div>

			<!-- Nominee Signature Upload -->
			<div class="row mt-4">

				<!-- Nominee Aadhar Upload -->
				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">
						NOMINEE AADHAR <span class="star">*</span>
					</label> <label for="nomineAadhar" id="drop-area"> <input
						type="file" accept="image/*" name="nomineAadhar" id="nomineAadhar"
						hidden="hidden" onchange="nomineAadharUpload();" />

						<div id="img-view">
							<img src="Uploads/upload.png" alt="upload_icon"
								id="nomineAadharPreview" /><input type="hidden"
								name="nomineAadharHidden" id="nomineAadharHidden">
						</div>
					</label>
				</div>
				<div class="col-lg-3 mb-5">
					<label
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">
						NOMINEE SIGNATURE <span class="star">*</span>
					</label> <label for="nomineSignature" id="drop-area"> <input
						type="file" accept="image/*" name="nomineSignature"
						id="nomineSignature" hidden="hidden"
						onchange="nomineSignatureUpload();" />

						<div id="img-view">
							<img src="Uploads/upload.png" alt="upload_icon"
								id="nomineSignaturePreview" /><input type="hidden"
								name="nomineSignatureHidden" id="nomineSignatureHidden">
						</div>
					</label>
				</div>

			</div>

		</div>

		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">FEES DETAILS</li>
				</ol>
			</nav>
			<!-- Always Visible Fields -->
			<!-- Always Visible Fields -->
			<div class="row">
				<!-- <div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label>Member Fees</label> <input type="text" id="memberFees"
									name="memberFees" placeholder="Enter Fees" />
							</div>
						</div> -->

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="position: relative; margin-bottom: 1rem;">
						<label for="memberFees">MEMBER FEES</label> <input type="text"
							style="text-transform: uppercase;" name="memberFees"
							id="memberFees" class="form-control mb-3"
							placeholder="ENTER MEMBER FEES" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label>BUILDING FUND</label> <input type="text" id="buildingFund"
							style="text-transform: uppercase;" name="buildingFund"
							placeholder="ENTER BUILDING FUND" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label>ADMIN CHARGE</label> <input type="text" id="adminCharge"
							style="text-transform: uppercase;" name="adminCharge"
							placeholder="ENTER ADMIN CHARGE" />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label>DOCUMENT CHARGE</label> <input type="text"
							style="text-transform: uppercase;" id="documentCharge"
							name="documentCharge" placeholder="ENTER DOCUMENT CHARGE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label>ENTRY FEE</label> <input type="text" id="entryFee"
							style="text-transform: uppercase;" name="entryFee"
							placeholder="ENTER ENTRY FEE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label>OTHER CHARGE</label> <input type="text" id="otherCharge"
							style="text-transform: uppercase;" name="otherCharge"
							placeholder="ENTER OTHER CHARGE" value="ADARSH UPAVIDHI"
							readonly="readonly" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label>PAYMENT BY</label> <select id="paymentBy" name="paymentBy"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT</option>
							<option value="cash">CASH</option>
							<option value="online">ONLINE</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label>REMARKS</label> <input type="text" id="remarks"
							style="text-transform: uppercase;" name="remarks"
							placeholder="ENTER REMARKS" />
					</div>
				</div>
			</div>

			<!-- Conditionally Displayed Fields -->
			<div class="row">
				<!-- Cheque No -->
				<div class="col-lg-3" id="chequeNoDiv" style="display: none;">
					<div class="d-flex flex-column formFields">
						<label>CHEQUE NO</label> <input type="text" id="chequeNo"
							name="chequeNo" placeholder="ENTER CHEQUE NO" />
					</div>
				</div>

				<!-- Cheque Date -->
				<div class="col-lg-3" id="chequeDateDiv" style="display: none;">
					<div class="d-flex flex-column formFields">
						<label>CHEQUE DATE</label> <input type="date" id="chequeDate"
							name="chequeDate" />
					</div>
				</div>

				<!-- Deposit A/C -->
				<div class="col-lg-3" id="depositAccountDiv" style="display: none;">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px;">
						<label>DEPOSIT A/C</label> <select id="depositAccount"
							name="depositAcNo" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT</option>
							<!-- options will be filled dynamically -->
						</select>
					</div>
				</div>

				<!-- Reference No -->
				<div class="col-lg-3 mb-4" id="refNoDiv" style="display: none;">
					<div class="d-flex flex-column formFields">
						<label>REFERENCE NO</label> <input type="text" id="referenceNo"
							name="referenceNo" placeholder="ENTER REFERENCE NO" />
					</div>
				</div>
			</div>

		</div>

		<div class="mt-5">

			<div class="row">
				<div class="col-lg-3">
					<div class=" h-100 d-flex justify-content-start align-items-center">
						<div
							class="d-flex justify-content-start align-items-center  formFields">
							<label style="margin-left: 20px;" class="mb-2">
								Membership Status</label>
							<div class="cont">
								<div class="toggle">
									<input type="checkbox" id="toggle-member-status"
										name="memberStatus" class="toggle__input"
										data-toggle-type="member-status"> <label
										for="toggle-member-status" class="toggle__label"></label>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-lg-3">
					<div class=" h-100 d-flex justify-content-start align-items-center">
						<div
							class="d-flex justify-content-start align-items-center  formFields">
							<label style="margin-left: 20px;" class="mb-2">MOBILE
								BANK ACCESS</label>
							<div class="cont">
								<div class="toggle">
									<input type="checkbox" id="toggle-mobile-banking"
										name="memberBanking" class="toggle__input"
										data-toggle-type="mobile-banking"> <label
										for="toggle-mobile-banking" class="toggle__label"></label>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-lg-3">
					<div class=" h-100 d-flex justify-content-start align-items-center">
						<div
							class="d-flex justify-content-start align-items-center  formFields">
							<label style="margin-left: 20px;" class="mb-2">NET
								BANKING</label>
							<div class="cont">
								<div class="toggle">
									<input type="checkbox" id="toggle-net-banking"
										name="netBanking" class="toggle__input"
										data-toggle-type="net-banking"> <label
										for="toggle-net-banking" class="toggle__label"></label>
								</div>
							</div>
						</div>
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
									<input type="checkbox" id="toggle-sms-send" name="smsSend"
										class="toggle__input" data-toggle-type="sms-send"> <label
										for="toggle-sms-send" class="toggle__label"></label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-12 text-center" style="margin-top: 30px;">
					<button id="printBtn" class="btn btn-warning">PRINT</button>
					<button id="updateBtn" class="btn btn-success">UPDATE</button>
					<button id="deleteBtn" class="btn btn-danger">DELETE</button>
				</div>
			</div>
		</div>
	</form>

</div>

<script
	src="${pageContext.request.contextPath}/js/dataCorrection/customerDataUpdate.js"></script>
