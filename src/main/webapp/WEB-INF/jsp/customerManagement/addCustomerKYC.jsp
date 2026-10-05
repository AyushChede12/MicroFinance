
<style>
#img-view {
	width: 100%;
	height: 200px; /* adjust to your preferred box height */
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px dashed #ccc; /* optional: border like upload box */
	border-radius: 10px;
	overflow: hidden; /* ensures image stays inside box */
	background: #f9f9f9; /* optional light background */
}

#photoPreview, #signaturePreview {
	max-width: 100%;
	max-height: 100%;
	object-fit: contain; /* keeps whole image visible */
}
</style>

<div class="pagetitle">
	<h1>CUSTOMER MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-people-fill"></i>
			</a></li>
			<li class="breadcrumb-item action">ADD CUSTOMER KYC</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">CUSTOMER DETAILS</li>
				</ol>
			</nav>

			<div class="row">
				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="customerCode" id="customerSelection">CUSTOMER
							SELECTION </label> <select id="selectByCode" name="selectByCode"
							class="form-control selectField" style="width: 100%;">
							<option value="">-- SEARCH CUSTOMER CODE --</option>
						</select>
					</div>
				</div>


				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="">KYC AUTHENTICATE BY</label> <label>0</label>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-lg-12">
					<nav>
						<ol class="breadcrumb breadcrumb-title">
							<li class="breadcrumb-item action mt-3">CUSTOMER DETAILS</li>
						</ol>
					</nav>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CUSTOMER NAME</label> <input type="text"
							name="customerName" id="customerName" required="required"
							placeholder="ENTER CUSTOMER NAME" disabled />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CUSTOMER CODE</label> <input type="text"
							name="memberCode" id="memberCode" required="required"
							placeholder="ENTER CUSTOMER CODE" disabled />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CONTACT NO.</label> <input type="text"
							name="contactNo" id="contactNo" required="required"
							placeholder="ENTER CONTACT NO" disabled />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">Sign-up Date</label> <input type="date"
							name="singupDate" id="singupDate" required="required" disabled />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">AADHAR NO.</label> <input type="text"
							name="aadharNo" id="aadharNo" required="required"
							placeholder="ENTER AADHAR NO" disabled />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">PAN</label> <input type="text" name="pan" id="pan"
							required="required" placeholder="ENTER PAN" disabled />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">VOTER NO.</label> <input type="text" name="voterNo"
							id="voterNo" required="required" placeholder="ENTER VOTER NO"
							disabled />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">DRIVING LICENSE NO.</label> <input type="text"
							name="drivingLicenceNo" id="drivingLicenceNo" required="required"
							placeholder="ENTER DRIVING LICENSE NO." disabled />
					</div>
				</div>
			</div>
			<div class="row mt-3">


				<div class="col-3 text-center">
					<button type="button" id="saveBtn"
						style="background-color: red; border: none; outline: none; color: #fff; font-weight: bold; border-radius: 5px; padding: 8px 15px; cursor: pointer;"
						onclick="verifyFetchedData();">CLICK HERE TO AUTHENTICATE
						COMPLETE</button>
				</div>
			</div>

			<div class="row mt-4">
				<!-- Customer Photo -->
				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">
						CUSTOMER PHOTO <span class="star">*</span>
					</label> <label for="signature" id="drop-area"> <input type="file"
						accept="image/*" name="photo" id="photo" hidden="hidden"
						onchange="photoUpload();"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="Uploads/upload.png" alt="upload_icon"
								id="photoPreview" /><input type="hidden" name="photoHidden"
								id="photoHidden">

						</div>
					</label> <small id="chksignature" style="color: red;"></small>
				</div>

				<!-- Signature -->
				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">
						CUSTOMER SIGNATURE <span class="star">*</span>
					</label> <label for="signature" id="drop-area"> <input type="file"
						accept="image/*" name="signature" id="signature" hidden="hidden"
						onchange="signatureUpload();"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="Uploads/upload.png" alt="upload_icon"
								id="signaturePreview" /><input type="hidden"
								name="signatureHidden" id="signatureHidden">

						</div>
					</label> <small id="chksignature" style="color: red;"></small>
				</div>
				
				<!-- <div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">
						AADHAR CARD <span class="star">*</span>
					</label> <label for="signature" id="drop-area"> <input type="file"
						accept="image/*" name="photo" id="photo" hidden="hidden"
						onchange="photoUpload();"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="../images/upload/upload.png" alt="upload_icon"
								id="photoPreview" /><input type="hidden" name="photoHidden"
								id="photoHidden">

						</div>
					</label> <small id="chksignature" style="color: red;"></small>
				</div>

				Signature
				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">
						PAN CARD <span class="star">*</span>
					</label> <label for="signature" id="drop-area"> <input type="file"
						accept="image/*" name="signature" id="signature" hidden="hidden"
						onchange="signatureUpload();"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="../images/upload/upload.png" alt="upload_icon"
								id="signaturePreview" /><input type="hidden"
								name="signatureHidden" id="signatureHidden">

						</div>
					</label> <small id="chksignature" style="color: red;"></small>
				</div>
				
				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">
						VOTER ID <span class="star">*</span>
					</label> <label for="voterId" id="drop-area"> <input type="file"
						accept="image/*" name="voterId" id="voterId" hidden="hidden"
						onchange="voterUpload();"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="../images/upload/upload.png" alt="upload_icon"
								id="voterPreview" /><input type="hidden"
								name="voterHidden" id="voterHidden">

						</div>
					</label> <small id="chkvoter" style="color: red;"></small>
				</div>
				
				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">
						DRIVING LICENSE <span class="star">*</span>
					</label> <label for="drivingLicense" id="drop-area"> <input type="file"
						accept="image/*" name="drivingLicense" id="drivingLicense" hidden="hidden"
						onchange="licenseUpload();"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="../images/upload/upload.png" alt="upload_icon"
								id="licensePreview" /><input type="hidden"
								name="licenseHidden" id="licenseHidden">

						</div>
					</label> <small id="chklicense" style="color: red;"></small>
				</div>
 -->

			</div>
		</div>


		<!-- <div class="mt-5">
					<nav>
						<ol class="breadcrumb breadcrumb-title">
							<li class="breadcrumb-item action">Bank Details</li>
						</ol>
					</nav>
					<div class="row">
						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">Bank Name </label> <input type="text"
									name="bankName" id="bankName" required="required"
									placeholder="Enter Location" />
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">Bank Branch </label> <input type="text"
									name="bankBranch" id="bankBranch" required="required"
									placeholder="Enter Location" />
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">Account No. </label> <input type="text"
									name="acountNo" id="acountNo" required="required"
									placeholder="Enter Location" />
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">IFSC Code </label> <input type="text"
									name="ifscCode" id="ifscCode" required="required"
									placeholder="Enter Location" />
							</div>
						</div>
					</div>

				</div>

				<div class="row">
					<div class="col-12 text-right mt-3">
						<button id="saveBtN" class="btnStyle"
							style="background-color: #FFA500;">Save</button>
					</div>
				</div> -->
	</form>

</div>


<script
	src="${pageContext.request.contextPath}/js/customerManagement/addMemberKyc.js"></script>