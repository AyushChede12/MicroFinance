
<div class="pagetitle">
	<h1>FINANCIAL CONSULTANT </h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-briefcase"></i>
			</a></li>
			<li class="breadcrumb-item action">ADD FINANCIAL CONSULTANT</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">FINANCIAL CONSULTANT
						DEATILS</li>
				</ol>
			</nav>
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
					<%-- <input type="hidden" id="id" name="id"> <input
								type="hidden" id="financialCode" name="financialCode"
								value="${financialCode }"> --%>
					<div class="d-flex flex-column formFields">
						<label for="joiningDate">JOINING DATE<span class="star">*</span></label>
						<input type="date" name="joiningDate" id="joiningDate" required
							placeholder="ENTER J DATE"
							style="text-transform: uppercase;" /> <small id="chkjoiningDate"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="selectCustomer">FINANCIAl CODE</label> <input
							type="text" id="financialCode" name="financialCode"
							required="required" class="form-control selectField"
							value="${financialCode }" style="height: 30px;"
							readonly="readonly">
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label for="financialName">FINANCIAL NAME <span
							class="star">*</span></label> <input type="text" name="financialName"
							id="financialName" required="required"
							placeholder="ENTER FINANCIAL NAME"
							style="text-transform: uppercase;" /> <small
							id="chkfinancialName" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="dob">DATE OF BIRTH <span class="star">*</span></label>
						<input type="date" name="dob" id="dob" required="required"
							placeholder="ENTER DATE OF BIRTH "
							style="text-transform: uppercase;" /> <small id="chkdob"
							style="color: red;"></small>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>AGE <span class="star">*</span></label> <input type="text"
							name="age" id="age" required="required" placeholder="ENTER AGE"
							style="text-transform: uppercase;" /> <small id="chkage"
							style="color: red;"></small>
					</div>
				</div>

				<!-- <div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="guardianName">Family Customer Name <span
									id="star">*</span></label> <input type="text" name="guardianName"
									id="guardianName" required="required"
									placeholder="Enter Family Customer Name" />
							</div>
						</div> -->

				<!-- <div class="col-lg-3">
							<div class="d-flex flex-column formFields"
								style="margin-bottom: 30px">
								<label>Relation to Applicant <span id="star">*</span></label> <select
									id="relationToApplicant" name="relationToApplicant"
									required="required" class="form-control selectField"
									style="height: 30px;">
									<option value="">Enter Relation to Applicant</option>
									
								</select>
							</div>
						</div> -->


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label for="contactNo">CONTACT NO <span class="star">*</span></label>
						<input type="text" name="contactNo" id="contactNo"
							required="required" placeholder="ENTER CONTACT NO." /> <small
							id="chkcontactNo" style="color: red;"></small>
					</div>
				</div>

				<!-- <div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="nomineeName">Nominee Name <span class="star">*</span></label>
								<input type="text" name="nomineeName" id="nomineeName"
									required="required" placeholder="Enter Nominee Name" />
							</div>
						</div> -->

				<!-- <div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">Relation</label> <select id="colour" name="colour"
									required="required" class="form-control selectField"
									style="height: 30px;">
									<option value="">Select Relative Relation</option>
									<option value="Blue">Blue</option>
								</select>
							</div>
						</div> -->

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>BRANCH NAME<span class="star">*</span></label> <select
							id="branchName" name="branchName" required="required"
							class="form-control selectField" style="height: 30px;">

						</select> <small id="chkbranchName" style="color: red;"></small>
					</div>
				</div>

				<!-- <div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="nomineeAge">Age <span id="star">*</span></label>
								<input type="text" name="nomineeAge" id="nomineeAge"
									required="required" placeholder="Enter Nominee Age" />
							</div>
						</div> -->

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>ADDRESS <span class="star">*</span></label>
						<textarea name="address" id="address"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"></textarea>
						<small id="chkaddress" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="district">DISTRICT <span class="star">*</span></label>
						<input type="text" name="district" id="district"
							required="required" placeholder="ENTER DISTRICT" /> <small
							id="chkdistict" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="state">STATE <span class="star">*</span></label> <input
							type="text" name="state" id="state" required="required"
							placeholder="ENTER STATE" /> <small id="chkstate"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="pinCode">PIN CODE <span class="star">*</span></label>
						<input type="text" name="pinCode" id="pinCode" required="required"
							placeholder="ENTER PINCODE" /> <small id="chkpinCode"
							style="color: red;"></small>
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>PROFESSION <span class="star">*</span></label> <input
							type="text" name="profession" id="profession" required="required"
							placeholder="ENTER PROFESSION" /> <small id="chkprofession"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="academicBackground">ACADEMIC BACKGROUND<span
							class="star">*</span></label> <input type="text"
							name="academicBackground" id="academicBackground"
							required="required" placeholder="ENTER ACADEMIC BACKGROUND " /> <small
							id="chkacademicBackground" style="color: red;"></small>
					</div>
				</div>
				
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>Team Member Code<span class="star">*</span></label> <select
							id="teamMemberCode" name="teamMemberCode" required="required"
							class="form-control selectField" style="height: 30px;">

						</select> <small id="chkteammembercode" style="color: red;"></small>
					</div>
				</div>
				
			</div>

			<div class="row mt-4">
				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">UPLOAD
						PHOTO <span class="star">*</span>
					</label> <label for="photo" id="drop-area"> <input type="file"
						accept="image/*" name="financialPhoto" id="photo" hidden="hidden"
						onchange="photoUpload();"
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
					</label> <label for="signature" id="drop-area"> <input type="file"
						accept="image/*" name="finnacialSignature" id="signature"
						hidden="hidden" onchange="signatureUpload();"
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
					<li class="breadcrumb-item action">INTRODUCER DETAILS </li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>SELECT POSITION <span class="star">*</span></label> <input
							type="text" name="selectPosition" id="selectPosition"
							required="required" placeholder="ENTER POSITION"
							style="text-transform: uppercase;" /> <small id="chkposition"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="referenceCode">REFERENCE CODE <span
							class="star">*</span></label> <input type="text" name="referralCode"
							id="referralCode" required="required"
							placeholder="ENTER REFERENCE CODE"
							style="text-transform: uppercase;" /> <small
							id="chkreferralCode" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>REFERENCE NAME <span class="star">*</span></label> <input
							type="text" name="referralName" id="referralName"
							required="required" placeholder="ENTER REFERENCE NAME "
							style="text-transform: uppercase;" /> <small
							id="chkrefferalName" style="color: red;"></small>
					</div>
				</div>

				<!-- <div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="position">Position <span id="star">*</span></label> <input type="text"
									name="position" id="position" required="required"
									placeholder="Enter Position" />
							</div>
						</div> -->

			</div>

			<div class="mt-5">
				<nav>
					<ol class="breadcrumb breadcrumb-title">
						<li class="breadcrumb-item action">PAYMENT DETAILS </li>
					</ol>
				</nav>
				<div class="row">
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>FEES(IF YES)</label> <input type="text" name="fees"
								id="fees" required="required" placeholder="Enter Fees"
								style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="referenceCode">MODE OF PAYMENT<span
								class="star">*</span></label> <select onchange="displayDetails()"
								id="modeofPayment" name="modeofPayment" required="required"
								class="form-control selectField" style="height: 30px;">
								<option value="">ENTER MODE OF PAYMENT </option>
								<option value="Cash">CASH</option>
								<option value="Online">ONLINE</option>
								<option value="Cheque">CHEQUE</option>
								<option value="NEFT">NEFT</option>


							</select> <small id="chkmodeofPayment" style="color: red;"></small>
						</div>
					</div>

					<div class="col-lg-3" id="displayCheque">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>CHEQUE NUMBER</label> <input type="text" name="chequeNo"
								id="chequeNo" required="required" placeholder="ENTER CHEQUE NO "
								style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3" id="displaycheqdate">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>CHEQUE DATE</label> <input type="date" name="chequeDate"
								id="chequeDate" required="required"
								placeholder="ENTER CHEQUE DATE "
								style="text-transform: uppercase;" />
						</div>
					</div>


					<div class="col-lg-3" id="displaydeposit">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>DEPOSIT ACCOUNT </label> <input type="text"
								name="depositAccount" id="depositAccount" required="required"
								placeholder="ENTER DEPOSITE ACCOUNT "
								style="text-transform: uppercase;" />
						</div>
					</div>

					<!-- <div class="col-lg-3" id="displayRef">
								<div class="d-flex flex-column formFields"
									style="margin-bottom: 30px">
									<label>Ref Number/UPI ID <span id="star">*</span></label> <input
										type="text" name="refNo" id="refNo" required="required"
										placeholder="Enter Ref No" style="text-transform: uppercase;" />
									<button type="button" class="btn btn-success" id="verifyUpiBtn"
										style="margin-left: 5px;">Verify</button>
								</div>
								<small id="upiStatus" style="margin-top: 5px;"></small>
							</div> -->

					<div class="col-lg-3" id="displayRef">
						<div class="d-flex flex-column formFields">
							<label for="">REF NUMBER/UPI ID </label>
							<div class="row">
								<div class="col-lg-9">
									<input type="text" name="refNo" id="refNo" required="required"
										placeholder="ENTER REF NUMBER" />
								</div>
								<div class="col-lg-3">
									<button class="btn btn-primary" type="button" id="verifyUpiBtn"
										style="padding: 4px 8px; font-size: 11px;">VERIFY</button>

								</div>
							</div>
						</div>
					</div>


					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>COMMENTS</label> <input type="text" name="comments"
								id="comments" required="required" placeholder="ENTER COMMENTS  "
								style="text-transform: uppercase;" />
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-3">
						<div class="h-100">
							<div class="formFields d-flex flex-column">
								<label>FINANCIAL STATUS</label>
								<div class="cont">
									<div class="toggle">
										<input type="checkbox" id="financialStatus"
											class="toggle__input" data-toggle-type="financial-status">
										<label for="financialStatus" class="toggle__label"></label>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="col-lg-3">
						<div class="h-100">
							<div class="formFields d-flex flex-column">
								<label>SMS SEND </label>
								<div class="cont">
									<div class="toggle">
										<input type="checkbox" id="smsSend" class="toggle__input"
											data-toggle-type="sms-send"> <label for="smsSend"
											class="toggle__label"></label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- <div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="position">Position <span id="star">*</span></label> <input type="text"
									name="position" id="position" required="required"
									placeholder="Enter Position" />
							</div>
						</div> -->

			</div>






			<div class="row">
				<div class="col-12 text-center">
					<button id="saveBtnFinacial" name="saveBtn"
						class="btnStyle bg-success">SAVE</button>
					<button id="printBtn" class="btnStyle bg-primary"
						onclick="printTable()">PRINT</button>
				</div>
			</div>
		</div>


	</form>

	<!-- <div class="row mt-5">
        <div class="col-12">
          <div class="card recent-sales">

            <div class="card-body table-responsive">
              <h5 class="card-title">
                Recent Sales <span>| Today</span>
              </h5>

              <table class="table table-borderless datatable overflow-scroll">
                <thead class="table-light">
                  <tr style="font-family: 'Poppins', sans-serif;">
                    <th scope="col">#</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="font-family: 'Poppins', sans-serif;">
                    <th scope="row">
                      <a href="#">1</a>
                    </th>
                    <td>Arun Kumar</td>
                    <td>
                      <a href="#" className="text-primary">Milk</a>
                    </td>
                    <td>$29</td>
                    <td>
                      <span class="badge bg-success text-white">Approved</span>
                    </td>
                    <td class="d-flex" style="gap: .7rem;">
                      <button class="iconbutton"><i class="fa-solid fa-pen-to-square text-success"></i></button>
                      <button class="iconbutton"><i class="fa-solid fa-eye text-primary"></i></button>
                      <button class="iconbutton"><i class="fa-solid fa-trash text-danger"></i></button>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <a href="#">2</a>
                    </th>
                    <td>Deepak Dalwe</td>
                    <td>
                      <a href="#" className="text-primary">Ghee</a>
                    </td>
                    <td>$16.5</td>
                    <td>
                      <span class="badge bg-danger text-white">Rejected</span>
                    </td>
                    <td class="d-flex" style="gap: .7rem;">
                      <button class="iconbutton"><i class="fa-solid fa-pen-to-square text-success"></i></button>
                      <button class="iconbutton"><i class="fa-solid fa-eye text-primary"></i></button>
                      <button class="iconbutton"><i class="fa-solid fa-trash text-danger"></i></button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <a href="#">2</a>
                    </th>
                    <td>Deepak Dalwe</td>
                    <td>
                      <a href="#" className="text-primary">Ghee</a>
                    </td>
                    <td>$16.5</td>
                    <td>
                      <span class="badge bg-danger text-white">Rejected</span>
                    </td>
                    <td class="d-flex" style="gap: .7rem;">
                      <button class="iconbutton"><i class="fa-solid fa-pen-to-square text-success"></i></button>
                      <button class="iconbutton"><i class="fa-solid fa-eye text-primary"></i></button>
                      <button class="iconbutton"><i class="fa-solid fa-trash text-danger"></i></button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <a href="#">2</a>
                    </th>
                    <td>Deepak Dalwe</td>
                    <td>
                      <a href="#" className="text-primary">Ghee</a>
                    </td>
                    <td>$16.5</td>
                    <td>
                      <span class="badge bg-danger text-white">Rejected</span>
                    </td>
                    <td class="d-flex" style="gap: .7rem;">
                      <button class="iconbutton"><i class="fa-solid fa-pen-to-square text-success"></i></button>
                      <button class="iconbutton"><i class="fa-solid fa-eye text-primary"></i></button>
                      <button class="iconbutton"><i class="fa-solid fa-trash text-danger"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div> -->

</div>

<div class="row mt-5">
	<div class="col-12">
		<div class="card recent-sales">

			<div class="card-body table-responsive">
				<h5 class="card-title">FINANCIAL CONSULTANT DETAILS</h5>


				<div style="overflow-x: auto; white-space: nowrap;">
					<table class="table table-borderless datatable" id="tabl">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">Sl No.</th>
								<th scope="col">Financial Code</th>
								<th scope="col">Financial Name</th>
								<th scope="col">Contact No</th>
								<th scope="col">Branch</th>
								<th scope="col">Address</th>
								<th scope="col">District</th>
								<th scope="col">State</th>
								<th scope="col">Pin Code</th>
								<th scope="col">Profession</th>
								<th scope="col">Financial Status</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>


</main>


<script>
	function photoUpload() {
		const file = document.getElementById("photo").files[0];
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = function(e) {
				document.getElementById("photoPreview").src = e.target.result;
				const previewimg = document.getElementById("photoPreview");
				document.getElementById("photoPreview").src = e.target.result;
				previewimg.style.width = "100%";
				previewimg.style.height = "100%";
				previewimg.style.objectFit = "cover"
				previewimg.style.overflow = "hidden"
				previewimg.style.borderRadius = "20px"
			};
			reader.readAsDataURL(file);
		} else {
			alert("Please upload a valid image file for photo.");
		}
	}

	function signatureUpload() {
		const file = document.getElementById("signature").files[0];
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = function(e) {
				document.getElementById("signaturePreview").src = e.target.result;
				const previewimg = document.getElementById("signaturePreview");
				document.getElementById("signaturePreview").src = e.target.result;
				previewimg.style.width = "100%";
				previewimg.style.height = "100%";
				previewimg.style.objectFit = "cover"
				previewimg.style.overflow = "hidden"
				previewimg.style.borderRadius = "20px"
			};
			reader.readAsDataURL(file);
		} else {
			alert("Please upload a valid image file for signature.");
		}
	}
</script>

<script
	src="${pageContext.request.contextPath}/js/FinancialConsultant/addFinancialConsultant.js"></script>
