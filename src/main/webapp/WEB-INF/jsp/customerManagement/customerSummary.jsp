
<div class="pagetitle">
	<h1>CUSTOMER MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-people-fill"></i>
			</a></li>
			<li class="breadcrumb-item action">CUSTOMER SUMMARY</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<div class="row">
				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="selectMember" id="customerSelection">CUSTOMER
							SELECTION </label> <select id="selectMember" name="selectMember"
							class="form-control selectField" style="width: 100%;">
							<option value="">-- SEARCH CUSTOMER CODE --</option>
						</select>
					</div>
				</div>
				<div class="col-lg-12">
					<nav>
						<ol class="breadcrumb breadcrumb-title">
							<li class="breadcrumb-item action mt-3">CUSTOMER DETAILS</li>
						</ol>
					</nav>
				</div>




				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CUSTOMER CODE</label> <input type="text"
							name="customerCode" id="customerCode" required="required"
							placeholder="ENTER CUSTOMER CODE" disabled />
					</div>
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
						<label for="">SIGN-UP DATE</label> <input type="date"
							name="singupDate" id="singupDate" required="required" disabled />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">RELATIVE NAME</label> <input type="text"
							name="guardianName" id="guardianName" required="required"
							placeholder="ENTER RELATIVE NAME" disabled />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">ADDRESS</label> <input type="text"
							name="customerAddress" id="customerAddress" required="required"
							placeholder="ENTER ADDRESS" disabled />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for=""> PINCODE</label> <input type="text" name="pinCode"
							id="pinCode" required="required" placeholder="ENTER PINCODE"
							disabled />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">STATE</label> <input type="text" name="state"
							id="state" required="required" placeholder="ENTER STATE" disabled />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">MOBILE NO.</label> <input type="text"
							name="contactNo" id="contactNo" required="required"
							placeholder="ENTER MOBILE NO" disabled />
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
					<div class="d-flex flex-column formFields mb-4">
						<label for="">NOMINEE NAME</label> <input type="text"
							name="nomineeName" id="nomineeName" required="required"
							placeholder="ENTER NOMINEE NAME" disabled />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">EMAIL ID</label> <input type="text" name="emailId"
							id="emailId" required="required" placeholder="ENTER EMAIL ID"
							disabled />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">DOB</label> <input type="text" name="dob" id="dob"
							required="required" placeholder="ENTER DOB" disabled />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">AGE</label> <input type="text" name="customerAge"
							id="customerAge" required="required" placeholder="ENTER AGE"
							disabled />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">BRANCH CODE</label> <input type="text"
							name="branchName" id="branchName" required="required"
							placeholder="ENTER BRANCH CODE" disabled />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">GENDER</label> <input type="text"
							name="customerGender" id="customerGender" required="required"
							placeholder="ENTER GENDER" disabled />
					</div>
				</div>

			</div>

			<div class="row mt-4">
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

				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">
						NEWLY ADDED IMAGE
					</label> <label for="newlyAddedImage" id="drop-area"> <input type="file"
						accept="image/*" name="newlyAddedImage" id="newlyAddedImage" hidden="hidden"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="Uploads/upload.png" alt="upload_icon"
								id="newlyAddedImagePreview" /><input type="hidden" name="newlyAddedImageHidden"
								id="newlyAddedImageHidden">

						</div>
					</label>
				</div>

			</div>

			<!-- CUSTOMER IMAGE UPLOAD SECTION -->
			<div class="container mt-4" id="customerImageUploadSection" style="display: none;">
				<div class="row">
					<div class="col-lg-12">
						<h4 class="mt-4">CUSTOMER IMAGE UPLOAD</h4>
						<div id="fieldContainer">
							<div class="textUploadSet mb-4">
								<input type="text" class="form-control nameField"
									placeholder="ENTER IMAGE NAME..." style="text-transform: uppercase;">
								<div class="uploadContainer"></div>
							</div>
						</div>

						<button type="button" id="addFieldBtn" class="btn btn-primary mt-2">ADD +</button>
						<button type="button" id="uploadAllBtn" class="btn btn-success mt-2">UPLOAD ALL</button>
						<button type="button" id="reloadDataBtn" class="btn btn-info mt-2">RELOAD</button>

						<div id="storedImages" class="mt-4"></div>
					</div>
				</div>
			</div>
		</div>
	</form>

</div>
<script
	src="${pageContext.request.contextPath}/js/customerManagement/customerSummary.js"></script>