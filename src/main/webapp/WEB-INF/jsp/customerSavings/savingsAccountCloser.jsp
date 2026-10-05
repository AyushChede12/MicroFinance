
<div class="pagetitle">
	<h1>SAVING / CURRENT ACCOUNT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-bank text-blue"></i>
			</a></li>
			<li class="breadcrumb-item action"> SAVING ACCOUNT CLOSER</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SAVING DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">ACCOUNT NUMBER</label> <select
							id="accountNumber" name="accountNumber" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">--SELECT ACCOUNT NO--</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CUSTOMER CODE </label> <input type="text" readonly="readonly"
							name="customerCode" id="customerCode" required="required"
							placeholder="ENTER CUSTOMER CODE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CUSTOMER NAME </label> <input type="text" readonly="readonly"
							name="customerName" id="customerName" required="required"
							placeholder="ENTER CUSTOMER NAME" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CONTACT NUMBER</label> <input type="text" readonly="readonly"
							name="contactNumber" id="contactNumber" required="required"
							placeholder="ENTER CONTACT NUMBER" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">OPENING BRANCH</label> <input type="text" readonly="readonly"
							name="branchName" id="branchName" required="required"
							placeholder="ENTER OPENING BRANCH" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">OPENING DATE</label> <input type="text" readonly="readonly"
							name="openingDate" id="openingDate" required="required"
							placeholder="ENTER OPENING DATE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CURRENT BALANCE</label> <input type="text" readonly="readonly"
							name="currentBalance" id="currentBalance" required="required"
							placeholder="ENTER CURRENT BALANCE" />
					</div>
				</div>

				<!-- <div class="col-lg-3">
							<div class="d-flex flex-column formFields mb-4">
								<label for="">Interest Disbursement</label> <input type="text"
									name="interestDisbursement" id="interestDisbursement" required="required" placeholder="" />
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields mb-4">
								<label for="">Outstanding Interest</label> <input type="text"
									name="outstandingInterest" id="outstandingInterest" required="required" placeholder="" />
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields mb-4">
								<label for="">Net Balance</label> <input type="text" name="netBalance"
									id="netBalance" required="required" placeholder="" />
							</div>
						</div> -->

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
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CLOSING BRANCH</label> <select
							id="closingbranchName" name="closingbranchName"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT BRANCH</option>

						</select>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">CLOSING DATE</label> <input type="date"
							name="closingDate" id="closingDate" required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">PAY BY</label> <select id="payBy" name="payBy"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT</option>
							<option value="Blue">CASH</option>
						</select>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">COMMENTS</label> <input type="text" name="comments"
							id="comments" required="required" placeholder="ENTER COMMENTS" />
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-12 text-center">
					<button id="saveAccountCloseBtn" class="btnStyle"
						style="background-color: #FFA500; margin-left: 80%;">CLOSE
						ACCOUNT</button>
				</div>
			</div>

			<div class="row mt-4">
				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">
						PHOTO <span class="star">*</span>
					</label> <label for="photo" id="drop-area"> <img id="photo"
						src="../images/upload/upload.png" alt="Photo Preview"
						style="width: 250px; height: 200px"> <input type="hidden"
						id="photoHidden" name="photo" value="">
					</label> <small id="chkphoto" style="color: red;"></small>
				</div>

				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">
						SIGNATURE<span class="star">*</span>
					</label> <label for="signature" id="drop-area"> <img id="signature"
						src="../images/upload/upload.png" alt="signature Preview"
						style="width: 250px; height: 200px"> <input type="hidden"
						id="signatureHidden" name="photo" value="">
					</label> <small id="chksignature" style="color: red;"></small>
				</div>

			</div>
		</div>
	</form>

</div>
<script
	src="${pageContext.request.contextPath}/js/customerSavings/savingsAccountCloser.js"></script>
