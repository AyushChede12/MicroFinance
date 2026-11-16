<div class="pagetitle">
	<h1>FINANCIAL CONSULTANT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i class="bi bi-briefcase"></i>
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
					<li class="breadcrumb-item action">FINANCIAL CONSULTANT DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="joiningDate">JOINING DATE <span class="star">*</span></label>
						<input type="date" name="joiningDate" id="joiningDate" required placeholder="ENTER JOINING DATE"
							style="text-transform: uppercase;" /> <small id="chkjoiningDate"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="financialCode">FINANCIAL CODE <span class="star">*</span></label> <input type="text"
							id="financialCode" name="financialCode" required="required" class="form-control selectField"
							value="${financialCode}" style="height: 30px; text-transform: uppercase;"
							readonly="readonly">
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="financialName">FINANCIAL NAME <span class="star">*</span></label> <input type="text"
							name="financialName" id="financialName" required="required"
							placeholder="ENTER FINANCIAL NAME" style="text-transform: uppercase;" /> <small
							id="chkfinancialName" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="dob">DATE OF BIRTH <span class="star">*</span></label>
						<input type="date" name="dob" id="dob" required="required" placeholder="ENTER DATE OF BIRTH"
							style="text-transform: uppercase;" /> <small id="chkdob" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label>AGE <span class="star">*</span></label> <input type="text" name="age" id="age"
							required="required" placeholder="ENTER AGE" style="text-transform: uppercase;" /> <small
							id="chkage" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="contactNo">CONTACT NO. <span class="star">*</span></label>
						<input type="text" name="contactNo" id="contactNo" required="required"
							placeholder="ENTER CONTACT NO." style="text-transform: uppercase;" /> <small
							id="chkcontactNo" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label>BRANCH NAME <span class="star">*</span></label> <select id="branchName" name="branchName"
							required="required" class="form-control selectField"
							style="height: 30px; text-transform: uppercase;">
						</select> <small id="chkbranchName" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label>ADDRESS <span class="star">*</span></label>
						<textarea name="address" id="address" placeholder="ENTER ADDRESS"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px; text-transform: uppercase;"></textarea>
						<small id="chkaddress" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="district">DISTRICT <span class="star">*</span></label>
						<input type="text" name="district" id="district" required="required"
							placeholder="ENTER DISTRICT" style="text-transform: uppercase;" /> <small id="chkdistict"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="state">STATE <span class="star">*</span></label> <input type="text" name="state"
							id="state" required="required" placeholder="ENTER STATE"
							style="text-transform: uppercase;" /> <small id="chkstate" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="pinCode">PIN CODE <span class="star">*</span></label>
						<input type="text" name="pinCode" id="pinCode" required="required" placeholder="ENTER PIN CODE"
							style="text-transform: uppercase;" /> <small id="chkpinCode" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label>PROFESSION <span class="star">*</span></label> <input type="text" name="profession"
							id="profession" required="required" placeholder="ENTER PROFESSION"
							style="text-transform: uppercase;" /> <small id="chkprofession" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="academicBackground">ACADEMIC BACKGROUND <span class="star">*</span></label> <input
							type="text" name="academicBackground" id="academicBackground" required="required"
							placeholder="ENTER ACADEMIC BACKGROUND" style="text-transform: uppercase;" /> <small
							id="chkacademicBackground" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label>TEAM MEMBER CODE <span class="star">*</span></label> <select id="teamMemberCode"
							name="teamMemberCode" required="required" class="form-control selectField"
							style="height: 30px; text-transform: uppercase;">
						</select> <small id="chkteammembercode" style="color: red;"></small>
					</div>
				</div>

			</div>

			<div class="row mt-4">
				<div class="col-lg-3 mb-5">
					<label
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">UPLOAD
						PHOTO <span class="star">*</span>
					</label> <label for="photo" id="drop-area"> <input type="file" accept="image/*"
							name="financialPhoto" id="photo" hidden="hidden" onchange="photoUpload();"
							style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="Uploads/upload.png" alt="UPLOAD ICON" id="photoPreview" /><input type="hidden"
								name="photoHidden" id="photoHidden">
						</div>
					</label> <small id="chkphoto" style="color: red;"></small>
				</div>

				<div class="col-lg-3 mb-5">
					<label
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">UPLOAD
						SIGNATURE <span class="star">*</span>
					</label> <label for="signature" id="drop-area"> <input type="file" accept="image/*"
							name="finnacialSignature" id="signature" hidden="hidden" onchange="signatureUpload();"
							style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="Uploads/upload.png" alt="UPLOAD ICON" id="signaturePreview" /><input type="hidden"
								name="signatureHidden" id="signatureHidden">
						</div>
					</label> <small id="chksignature" style="color: red;"></small>
				</div>

			</div>
		</div>

		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">INTRODUCER DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label>SELECT POSITION <span class="star">*</span></label> <input type="text"
							name="selectPosition" id="selectPosition" required="required"
							placeholder="ENTER POSITION (E.G. CONSULTANT / SENIOR ADVISOR)"
							style="text-transform: uppercase;" /> <small id="chkposition" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="referralCode">REFERENCE CODE <span class="star">*</span></label> <input type="text"
							name="referralCode" id="referralCode" required="required" placeholder="ENTER REFERENCE CODE"
							style="text-transform: uppercase;" /> <small id="chkreferralCode"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label>REFERENCE NAME <span class="star">*</span></label> <input type="text" name="referralName"
							id="referralName" required="required" placeholder="ENTER REFERENCE NAME"
							style="text-transform: uppercase;" /> <small id="chkrefferalName"
							style="color: red;"></small>
					</div>
				</div>
			</div>

			<div class="mt-5">
				<nav>
					<ol class="breadcrumb breadcrumb-title">
						<li class="breadcrumb-item action">PAYMENT DETAILS</li>
					</ol>
				</nav>
				<div class="row">
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
							<label>FEES (IF ANY)</label> <input type="text" name="fees" id="fees"
								placeholder="ENTER FEES" style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="modeofPayment">MODE OF PAYMENT <span class="star">*</span></label> <select
								onchange="displayDetails()" id="modeofPayment" name="modeofPayment" required="required"
								class="form-control selectField" style="height: 30px; text-transform: uppercase;">
								<option value="">-- SELECT MODE OF PAYMENT --</option>
								<option value="Cash">CASH</option>
								<option value="Online">ONLINE</option>
								<option value="Cheque">CHEQUE</option>
								<option value="NEFT">NEFT</option>
							</select> <small id="chkmodeofPayment" style="color: red;"></small>
						</div>
					</div>

					<div class="col-lg-3" id="displayCheque">
						<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
							<label>CHEQUE NUMBER</label> <input type="text" name="chequeNo" id="chequeNo"
								placeholder="ENTER CHEQUE NO." style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3" id="displaycheqdate">
						<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
							<label>CHEQUE DATE</label> <input type="date" name="chequeDate" id="chequeDate"
								placeholder="ENTER CHEQUE DATE" style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3" id="displaydeposit">
						<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
							<label>DEPOSIT ACCOUNT</label> <input type="text" name="depositAccount" id="depositAccount"
								placeholder="ENTER DEPOSIT ACCOUNT" style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3" id="displayRef">
						<div class="d-flex flex-column formFields">
							<label>REF NUMBER / UPI ID</label>
							<div class="row">
								<div class="col-lg-9">
									<input type="text" name="refNo" id="refNo" placeholder="ENTER REF NUMBER / UPI ID"
										style="text-transform: uppercase;" />
								</div>
								<div class="col-lg-3">
									<button class="btn btn-primary" type="button" id="verifyUpiBtn"
										style="padding: 4px 8px; font-size: 11px;">VERIFY</button>
								</div>
							</div>
							<small id="upiStatus" style="margin-top: 5px;"></small>
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
							<label>COMMENTS</label> <input type="text" name="comments" id="comments"
								placeholder="ENTER COMMENTS" style="text-transform: uppercase;" />
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
										<input type="checkbox" id="financialStatus" class="toggle__input"
											data-toggle-type="financial-status" checked="checked">
										<label for="financialStatus" class="toggle__label"></label>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="col-lg-3">
						<div class="h-100">
							<div class="formFields d-flex flex-column">
								<label>SMS SEND</label>
								<div class="cont">
									<div class="toggle">
										<input type="checkbox" id="smsSend" class="toggle__input"
											data-toggle-type="sms-send" checked="checked"> <label for="smsSend"
											class="toggle__label"></label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>

			<div class="row mt-4">
				<div class="col-12 text-center">
					<button id="saveBtnFinacial" name="saveBtn" type="button" class="btnStyle bg-success">SAVE</button>
					<button id="printBtn" type="button" class="btnStyle bg-primary"
						onclick="printTable()">PRINT</button>
				</div>
			</div>
		</div>

	</form>

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
								<th scope="col">SL NO.</th>
								<th scope="col">FINANCIAL CODE</th>
								<th scope="col">FINANCIAL NAME</th>
								<th scope="col">CONTACT NO.</th>
								<th scope="col">BRANCH</th>
								<th scope="col">ADDRESS</th>
								<th scope="col">DISTRICT</th>
								<th scope="col">STATE</th>
								<th scope="col">PIN CODE</th>
								<th scope="col">PROFESSION</th>
								<th scope="col">FINANCIAL STATUS</th>
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

<script>
	function photoUpload() {
		const file = document.getElementById("photo").files[0];
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = function (e) {
				const previewimg = document.getElementById("photoPreview");
				previewimg.src = e.target.result;
				previewimg.style.width = "100%";
				previewimg.style.height = "100%";
				previewimg.style.objectFit = "cover";
				previewimg.style.overflow = "hidden";
				previewimg.style.borderRadius = "20px";
			};
			reader.readAsDataURL(file);
		} else {
			alert("PLEASE UPLOAD A VALID IMAGE FILE FOR PHOTO.");
		}
	}

	function signatureUpload() {
		const file = document.getElementById("signature").files[0];
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = function (e) {
				const previewimg = document.getElementById("signaturePreview");
				previewimg.src = e.target.result;
				previewimg.style.width = "100%";
				previewimg.style.height = "100%";
				previewimg.style.objectFit = "cover";
				previewimg.style.overflow = "hidden";
				previewimg.style.borderRadius = "20px";
			};
			reader.readAsDataURL(file);
		} else {
			alert("PLEASE UPLOAD A VALID IMAGE FILE FOR SIGNATURE.");
		}
	}
</script>

<script src="${pageContext.request.contextPath}/js/FinancialConsultant/addFinancialConsultant.js"></script>