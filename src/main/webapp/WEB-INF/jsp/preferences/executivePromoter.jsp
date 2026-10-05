
<div class="pagetitle">
	<h1>Preferences</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-gear"></i>
			</a></li>
			<li class="breadcrumb-item action">EXECUTIVE/FOUNDER</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">EXECUTIVE/FOUNDER DETAILS</li>
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
					<input type="hidden" name="id" id="id">
					<div class="d-flex flex-column formFields">
						<label for="">TYPE <span class="star">*</span></label> <select
							id="type" name="type" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT TYPE</option>
							<option value="Blue">FOUNDER</option>
							<option value="Blue">CO-FOUNDER</option>
							<option value="Blue">CEO</option>
							<option value="Blue">MD</option>
							<option value="Blue">CHAIRMAN</option>
						</select> <small id="chkexetype" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">BRANCH NAME <span class="star">*</span></label>
						<select id="branchName" name="branchName" required="required"
							class="form-control selectField" style="height: 30px;">
						</select> <small id="chkbranchname" style="color: red;"></small>
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">FULL NAME <span class="star">*</span></label> <input
							type="text" name="fullName" id="fullName" required="required"
							placeholder="ENTER FULL NAME" style="text-transform: uppercase;" />
						<small id="chkfullname" style="color: red;"></small>
					</div>
				</div>




				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">DATE OF BIRTH <span class="star">*</span></label> <input
							type="date" name="dateOfBirth" id="dateOfBirth"
							required="required" /> <small id="chkdateofbirth"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3 mt-4">
					<div class="d-flex flex-column formFields">
						<label for="">DIN/PROMOTER NO <span class="star">*</span></label>
						<input type="text" name="promoterNo" id="promoterNo"
							required="required" placeholder="ENTER PROMOTER NO"
							style="text-transform: uppercase;" /> <small id="chkpromoterno"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3 mt-4">
					<div class="d-flex flex-column formFields">
						<label for="">APPOINTMENT DATE <span class="star">*</span></label>
						<input type="date" name="appointmentDate" id="appointmentDate"
							required="required" /> <small id="chkappointmentdate"
							style="color: red;"></small>
					</div>
				</div>


				<div class="col-lg-3 mt-4">
					<div class="d-flex flex-column formFields">
						<label for="">NOMINEE NAME <span class="star">*</span></label> <input
							type="text" name="relationName" id="relationName"
							required="required" placeholder="ENTER NOMINEE NAME"
							style="text-transform: uppercase;" /> <small
							id="chkrelationname" style="color: red;"></small>
					</div>
				</div>


				<div class="col-lg-3 mt-4">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>Relation to Applicant <span class="star">*</span></label> <select
							id="relationToApplicant" name="relationToApplicant"
							required="required" class="form-control selectField"
							style="height: 30px;">
						</select> <small id="chkrelationtoapplicant" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3 ">
					<div class="d-flex flex-column formFields">
						<label for="">Address <span class="star">*</span></label>
						<textarea name="address" id="address"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px; text-transform: uppercase;'"></textarea>
						<small id="chkaddress" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>STATE <span class="star">*</span></label> <select
							id="state" name="state" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT STATE</option>
						</select> <small id="chkstate" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>DISTRICT <span class="star">*</span></label> <select
							id="district" name="district" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT DISTRICT</option>
						</select> <small id="chkstate" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">PIN CODE <span class="star">*</span></label> <input
							type="text" name="pinCode" id="pinCode" required="required"
							placeholder="ENTER PIN CODE" style="text-transform: uppercase;" />
						<small id="chkpincode" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">AADHAR NO <span class="star">*</span></label> <input
							type="text" name="aadharNo" id="aadharNo" required="required"
							placeholder="ENTER AADHAR NO" style="text-transform: uppercase;" />
						<small id="chkaadharno" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3 ">
					<div class="d-flex flex-column formFields">
						<label for="">PAN NO <span class="star">*</span></label> <input
							type="text" name="panNo" id="panNo" required="required"
							placeholder="ENTER PAN NO" style="text-transform: uppercase;" />
						<small id="chkpanno" style="color: red;"></small>
					</div>
				</div>




				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">CONTACT NO <span class="star">*</span></label> <input
							type="text" name="contactNo" id="contactNo" required="required"
							placeholder="ENTER CONTACT NO" style="text-transform: uppercase;" />
						<small id="chkcontactno" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3 ">
					<div class="d-flex flex-column formFields">
						<label for="">EMAIL ID <span class="star">*</span></label> <input
							type="text" name="emailId" id="emailId" required="required"
							placeholder="ENTER EMAIL ID" style="text-transform: uppercase;" />
						<small id="chkemailid" style="color: red;"></small>
					</div>
				</div>



				<div class="col-lg-3 mt-4">
					<div class="d-flex flex-column formFields">
						<label for="">BASE VALUE</label> <input type="text"
							name="baseValue" id="baseValue" required="required"
							placeholder="ENTER BASE VALUE" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3 mt-4">
					<div class="d-flex flex-column formFields">
						<label for="">SHARES COUNT</label> <input type="text"
							name="shareCount" id="shareCount" required="required"
							placeholder="ENTER SHARES COUNT"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3 mt-4">
					<div class="d-flex flex-column formFields">
						<label for="">SHARE AMOUNT</label> <input type="text"
							readonly="readonly" name="shareAmount" id="shareAmount"
							required="required" placeholder="ENTER SHARE AMOUNT"
							style="text-transform: uppercase;" />
					</div>
				</div>




			</div>

			<div class="row mt-5">
				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">
						PHOTO <span class="star">*</span>
					</label> <label for="photo" id="drop-area"> <input type="file"
						accept="image/*" name="photo" id="photo" hidden="hidden"
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
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">
						SIGNATURE <span class="star">*</span>
					</label> <label for="signature" id="drop-area"> <input type="file"
						accept="image/*" name="signature" id="signature" hidden="hidden"
						onchange="signatureUpload();"
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

				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">
						AADHAR CARD<span class="star">*</span>
					</label> <label for="aadharCard" id="drop-area"> <input type="file"
						accept="image/*" name="aadharCard" id="aadharCard" hidden="hidden"
						onchange="aadharUpload();"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="Uploads/upload.png" alt="upload_icon"
								id="aadharPreview" /><input type="hidden" name="aadharHidden"
								id="aadharHidden">

							<!-- <p id="upload-text"
                    style="font-size: 12px; margin-top: 15px"
                    class="text-muted"
                  >
                    Drag and drop or Choose File to upload the image
                  </p> -->
						</div>
					</label> <small id="chkaadhar" style="color: red;"></small>
				</div>

				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">
						PAN CARD <span class="star">*</span>
					</label> <label for="panCard" id="drop-area"> <input type="file"
						accept="image/*" name="panCard" id="panCard" hidden="hidden"
						onchange="panUpload();"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="Uploads/upload.png" alt="upload_icon"
								id="panPreview" /><input type="hidden" name="panHidden"
								id="panHidden">
							<!-- <p
                    style="font-size: 12px; margin-top: 15px"
                    class="text-muted"
                  >
                    Drag and drop or Choose File to upload the image
                  </p> -->
						</div>
					</label> <small id="chkpan" style="color: red;"></small>
				</div>

				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px; margin-top: 30px;">
						CHEQUE <span class="star">*</span>
					</label> <label for="cheque" id="drop-area"> <input type="file"
						accept="image/*" name="cheque" id="cheque" hidden="hidden"
						onchange="chequeUpload();"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="Uploads/upload.png" alt="upload_icon"
								id="chequePreview" /><input type="hidden" name="chequeHidden"
								id="chequeHidden">
							<!-- <p
                    style="font-size: 12px; margin-top: 15px"
                    class="text-muted"
                  >
                    Drag and drop or Choose File to upload the image
                  </p> -->
						</div>
					</label> <small id="chkcheque" style="color: red;"></small>
				</div>

			</div>
		</div>


		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">BANK DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<!-- <div class="col-lg-3">
							<div class="d-flex flex-column formFields"
								style="margin-bottom: 30px">
								<label>Deposit Acc <span class="star">*</span></label> <select
									id="depositAcc" name="depositAcc" required="required"
									class="form-control selectField" style="height: 30px;">
									<option value="">Select Deposit Acc</option>
									<option value="Blue">9542512445211</option>
								</select> <small id="chkdepositacc" style="color: red;"></small>
							</div>
						</div> -->

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="bankName">BANK NAME <span class="star">*</span></label>
						<input type="text" name="bankName" id="bankName"
							required="required" placeholder="ENTER BANK NAME"
							style="text-transform: uppercase;" /> <small id="chkbankname"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="ifscCode">IFSC CODE <span class="star">*</span></label>
						<input type="text" name="ifscCode" id="ifscCode"
							required="required" placeholder="ENTER IFSC CODE"
							style="text-transform: uppercase;" /> <small id="chkifsccode"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3" style="margin-bottom: 30px;">
					<div class="d-flex flex-column formFields">
						<label for="micrCode">MICR CODE <span class="star">*</span></label>
						<input type="text" name="micrCode" id="micrCode"
							required="required" placeholder="ENTER MICR CODE"
							style="text-transform: uppercase;" /> <small id="chkmicrcode"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="accountNo">ACCOUNT NUMBER <span class="star">*</span></label>
						<input type="text" name="accountNo" id="accountNo"
							required="required" placeholder="ENTER ACCOUNT NUMBER"
							style="text-transform: uppercase;" /> <small id="chkaccountno"
							style="color: red;"></small>
					</div>
				</div>


			</div>
			<div class="row" style="margin-top: 30px;">
				<div class="col-12 text-center">
					<button type="button" id="showBtn" class="btnStyle bg-primary"
						onclick="showTableData()">SHOW</button>
					<button type="button" id="hideBtn" class="btnStyle bg-success"
						onclick="hideTableData()">HIDE</button>
					<button type="button" id="saveBtn" class="btnStyle bg-warning">SAVE</button>
					<button type="button" id="updateBtn" class="btnStyle bg-success">UPDATE</button>
				</div>
			</div>
	</form>


</div>
</div>

</div>

<div class="row mt-5">
	<div class="col-12">
		<div class="card recent-sales">

			<div class="card-body table-responsive">
				<h5 class="card-title">
					EXECUTIVE FOUNDER DATA <span>| TABLE VIEW</span>
				</h5>

				<table
					class="table table-borderless table-hover align-middle text-center text-nowrap datatable overflow-scroll">
					<thead class="table-light">
						<tr style="font-family: 'Poppins', sans-serif;">
							<th scope="col">SR NO</th>
							<th scope="col">NAME</th>
							<th scope="col">BRANCH NAME</th>
							<th scope="col">APPOINTMENT DATE</th>
							<th scope="col">ADDRESS</th>
							<th scope="col">EMAIL</th>
							<th scope="col">CONTACT</th>
							<th scope="col">EDIT</th>
							<th scope="col">DELETE</th>
						</tr>
					</thead>
					<tbody>

					</tbody>
				</table>
				<div class="mt-2 text-center">
					<button id="prevBtn" class="btn btn-sm btn-primary">
						<i class="bi bi-chevron-double-left"></i>
					</button>
					<span id="pageInfo" class="mx-2"></span>
					<button id="nextBtn" class="btn btn-sm btn-primary">
						<i class="bi bi-chevron-double-right"></i>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

<script
	src="${pageContext.request.contextPath}/js/preferences/executivePromoter.js"></script>