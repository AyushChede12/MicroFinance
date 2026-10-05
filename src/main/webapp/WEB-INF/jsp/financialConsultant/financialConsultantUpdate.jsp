
<div class="pagetitle">
	<h1>Financial Consultant</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-briefcase"></i>
			</a></li>
			<li class="breadcrumb-item action">Add Financial Consultant</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">Financial Consultant
						Details</li>
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
					<input type="hidden" id="id" name="id"> <input
						type="hidden" id="financialCode" name="financialCode"
						value="${financialCode }">
					<div class="d-flex flex-column formFields">
						<label for="joiningDate">Joining Date<span id="star">*</span></label>
						<input type="date" name="joiningDate" id="joiningDate" required
							placeholder="Enter Joining Date"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>Financial Code<span id="star">*</span></label> <input
							type="text" name="financialCode" id="financialCode1"
							required="required" readonly="readonly"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<!-- <div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="selectCustomer">Select Customer Code<span
									id="star">*</span></label> <input type="text" id="memberCode"
									name="memberCode" required="required"
									class="form-control selectField" style="height: 30px;">
							</div>
						</div> -->


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label for="customerName">Financial Name <span
							class="star">*</span></label> <input type="text" name="financialName"
							id="financialName" required="required"
							placeholder="Enter Financial Name"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="dob">Date of Birth <span id="star">*</span></label> <input
							type="date" name="dob" id="dob" required="required"
							placeholder="Enter Date Of Birth"
							style="text-transform: uppercase;" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>Age <span id="star">*</span></label> <input type="text"
							name="age" id="age" required="required" placeholder="Enter Age"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<!-- <div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="guardianName">Family Customer Name <span
									id="star">*</span></label> <input type="text" name="guardianName"
									id="guardianName" required="required"
									placeholder="Enter Family Customer Name" />
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields"
								style="margin-bottom: 30px">
								<label>Relation to Applicant <span id="star">*</span></label> <input
									type="text" id="relationToApplicant" name="relationToApplicant"
									required="required" class="form-control selectField"
									style="height: 30px;">

							</div>
						</div>
 -->

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label for="contactNo">Contact No <span id="star">*</span></label>
						<input type="text" name="contactNo" id="contactNo"
							required="required" placeholder="Enter Contact No" />
					</div>
				</div>
				<!-- 
						<div class="col-lg-3">
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
						<label>Branch Name <span id="star">*</span></label> <input
							type="text" id="branchName" name="branchName" required="required"
							class="form-control selectField" style="height: 30px;">

					</div>
				</div>

				<!-- <div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="nomineeAge">Nominee Age <span id="star">*</span></label>
								<input type="text" name="nomineeAge" id="nomineeAge"
									required="required" placeholder="Enter Nominee Age" />
							</div>
						</div> -->

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>Address <span id="star">*</span></label>
						<textarea name="address" id="address"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"></textarea>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="district">District <span id="star">*</span></label> <input
							type="text" name="district" id="district" required="required"
							placeholder="Enter District" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="state">State <span id="star">*</span></label> <input
							type="text" name="state" id="state" required="required"
							placeholder="Enter State" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="pinCode">Pin Code <span id="star">*</span></label> <input
							type="text" name="pinCode" id="pinCode" required="required"
							placeholder="Enter Pincode" />
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>Profession <span id="star">*</span></label> <input
							type="text" name="profession" id="profession" required="required"
							placeholder="Enter Profession" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="academicBackground">Academic Background <span
							id="star">*</span></label> <input type="text" name="academicBackground"
							id="academicBackground" required="required"
							placeholder="Enter Academic Background" />
					</div>
				</div>
			</div>

			<div class="row mt-4">
				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">Upload
						Photo <span class="star">*</span>
					</label> <label for="photo" id="drop-area"> <input type="file"
						accept="image/*" name="financialPhoto" id="photo" hidden="hidden"
						onchange="photoUpload();"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="../images/upload/upload.png" alt="upload_icon"
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
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">Upload
						Signature <span class="star">*</span>
					</label> <label for="signature" id="drop-area"> <input type="file"
						accept="image/*" name="finnacialSignature" id="signature"
						hidden="hidden" onchange="signatureUpload();"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="../images/upload/upload.png" alt="upload_icon"
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
					<li class="breadcrumb-item action">Introducer Details</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>Select Position <span id="star">*</span></label> <input
							type="text" name="selectPosition" id="selectPosition"
							required="required" placeholder="Enter Position"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="referenceCode">Reference Code <span id="star">*</span></label>
						<input type="text" name="referralCode" id="referralCode"
							required="required" placeholder="Enter Reference Code"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>Reference Name <span id="star">*</span></label> <input
							type="text" name="referralName" id="referralName"
							required="required" placeholder="Enter Reference Name"
							style="text-transform: uppercase;" />
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
						<li class="breadcrumb-item action">Payment Details</li>
					</ol>
				</nav>
				<div class="row">
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>Fees(If Any) <span id="star">*</span></label> <input
								type="text" name="fees" id="fees" required="required"
								placeholder="Enter Fees" style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="referenceCode">Mode of Payment <span
								id="star">*</span></label> <select onchange="displayDetails()"
								id="modeofPayment" name="modeofPayment" required="required"
								class="form-control selectField" style="height: 30px;">
								<option value="">Enter Mode of Payment</option>
								<option value="Cash">CASH</option>
								<option value="Online">Online</option>
								<option value="Cheque">Cheque</option>
								<option value="NEFT">NEFT</option>


							</select>
						</div>
					</div>

					<div class="col-lg-3" id="displayCheque">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>Cheque Number <span id="star">*</span></label> <input
								type="text" name="chequeNo" id="chequeNo" required="required"
								placeholder="Enter Cheque No" style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3" id="displaycheqdate">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>Cheque Date <span id="star">*</span></label> <input
								type="date" name="chequeDate" id="chequeDate"
								required="required" placeholder="Enter Cheque Date"
								style="text-transform: uppercase;" />
						</div>
					</div>


					<div class="col-lg-3" id="displaydeposit">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>Deposit Account <span id="star">*</span></label> <input
								type="text" name="depositAccount" id="depositAccount"
								required="required" placeholder="Enter Deposit Account"
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
							<label for="">Ref Number/UPI ID</label>
							<div class="row">
								<div class="col-lg-9">
									<input type="text" name="refNo" id="refNo" required="required"
										placeholder="Enter Ref Number" />
								</div>
								<div class="col-lg-3">
									<button class="btn btn-primary" type="button" id="verifyUpiBtn"
										style="padding: 4px 8px; font-size: 11px;">Verify</button>

								</div>
							</div>
						</div>
					</div>


					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>Comments<span id="star">*</span></label> <input
								type="text" name="comments" id="comments" required="required"
								placeholder="Enter Comments " style="text-transform: uppercase;" />
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-3">
						<div class="h-100">
							<div class="formFields d-flex flex-column">
								<label>Financial Status</label>
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
								<label>SMS Send</label>
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
					<button id="updateBtn" name="updateBtn" class="btnStyle bg-success">Update</button>
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

<script
	src="${pageContext.request.contextPath}/js/FinancialConsultant/consultantDownlineView.js"></script>