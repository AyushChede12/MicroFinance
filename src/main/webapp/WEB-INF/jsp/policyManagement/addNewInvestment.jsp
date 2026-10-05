
<div class="pagetitle">
	<h1>POLICY MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-piggy-bank"></i>
			</a></li>
			<li class="breadcrumb-item action">ADD NEW INVESTMENT</li>
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
				<input type="hidden" name="hiddenSchemeCode" id="hiddenSchemeCode">

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<input name="policyCode" id="policyCode" class="form-control"
							type="hidden" required /> <label for="">POLICY START
							DATE <span class="star">*</span>
						</label> <input type="date" name="policyStartDate" id="policyStartDate"
							required="required" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="branchName">CUSTOMER SELECTION <span
							class="star">*</span></label> <select id="selectCustomer"
							name="selectCustomer" required class="form-control selectField"
							style="height: 30px;">
							<!-- Add options here -->
						</select>
					</div>
				</div>




				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">CUSTOMER NAME <span class="star">*</span></label> <input
							type="text" name="customerName" id="customerName"
							style="text-transform: uppercase;" required="required"
							placeholder="ENTER CUSTOMER NAME" disabled />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>DATE OF BIRTH <span class="star">*</span></label> <input
							type="date" name="dateofBirth" id="dateofBirth"
							required="required" style="text-transform: uppercase;" disabled />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">RELATION DETAILS <span class="star">*</span></label>
						<input type="text" name="relationDetails" id="relationDetails"
							style="text-transform: uppercase;" required="required"
							placeholder="ENTER RELATIVE NAME" disabled />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">CONTACT NO <span class="star">*</span></label> <input
							type="text" name="contactNo" id="contactNo" required="required"
							placeholder="ENTER CONTACT NO." disabled />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">SUGGESTED NOMINEE <span class="star">*</span></label>
						<input type="text" name="suggestedNominee" id="suggestedNominee"
							style="text-transform: uppercase;" required="required"
							placeholder="ENTER SUGGESTED NOMINEE" disabled />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>AGE OF NOMINEE <span class="star">*</span></label> <input
							type="text" name="ageOfNominee" id="ageOfNominee"
							required="ageOfNominee" placeholder="ENTER AGE" disabled />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>RELATION <span class="star">*</span></label> <input
							type="text" name="relation" id="relation" required="required"
							style="text-transform: uppercase;" placeholder="ENTER RELATION"
							disabled />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">ADDRESS <span class="star">*</span></label>
						<textarea name="address" id="address" placeholder="ENTER ADDRESS"
							style="text-transform: uppercase;" disabled
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"></textarea>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">DISTRICT <span class="star">*</span></label> <input
							type="text" name="district" id="district" required="required"
							style="text-transform: uppercase;" placeholder="ENTER DISTRICT"
							disabled />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">STATE <span class="star">*</span></label> <input
							type="text" name="state" id="state" required="required"
							style="text-transform: uppercase;" placeholder="ENTER STATE"
							disabled />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">PIN CODE <span class="star">*</span></label> <input
							type="text" name="pinCode" id="pinCode" required="required"
							placeholder="ENTER PIN CODE" disabled />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="branchName">BRANCH NAME <span class="star">*</span></label>
						<input type="text" name="branchName" id="branchName"
							required="required" placeholder="ENTER BRANCH" disabled /> <small
							id="chkbranchname" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">TDS <span class="star">*</span></label> <input
							type="text" name="tds" id="tds" required="required"
							placeholder="ENTER TDS" disabled />
					</div>
				</div>


				<div class="col-lg-3 mb-4 ">
					<div class="d-flex flex-column formFields">
						<label for="">MODE OF OPERATION <span class="star">*</span></label>
						<select id="ModeOfOperation" name="ModeOfOperation"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="joint">JOINT</option>
							<option value="single">SINGLE</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">POLICY JOINT NAME <span class="star">*</span></label>
						<input type="text" name="jointName" id="jointName"
							style="text-transform: uppercase;" required="required"
							placeholder="ENTER POLICY JOINT NAME  " />
					</div>
				</div>


				<div class="col-lg-3 mb-4 ">
					<div class="d-flex flex-column formFields">
						<label for="">SCHEME TYPE <span class="star">*</span></label> <select
							id="schemeType" name="schemeType" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT SCHEME TYPE</option>
							<option value="DRD">DRD</option>
							<option value="RD">RD</option>
							<option value="FD">FD</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3 mb-4 ">
					<div class="d-flex flex-column formFields">
						<label for="">SCHEME NAME <span class="star">*</span></label> <select
							id="schemeName" name="schemeName" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT SCHEME NAME</option>

						</select>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">SCHEME TERM<span class="star">*</span></label> <input
							type="text" name="schemeTerm" id="schemeTerm" required="required"
							placeholder="ENTER SCHEME TERM" />
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">RATE OF INTEREST <span class="star">*</span></label>
						<input type="text" name="roi" id="roi" required="required"
							placeholder="ENTER RATE OF INTEREST" />
					</div>
				</div>

				<div class="col-lg-3 mb-4 ">
					<div class="d-flex flex-column formFields">
						<label for="">SCHEME MODE <span class="star">*</span></label> <select
							id="schemeMode" name="schemeMode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT SCHEME MODE</option>

						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">MATURITY DATE <span class="star">*</span></label> <input
							type="date" name="maturityDate" id="maturityDate"
							required="required" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">POLICY AMOUNT <span class="star">*</span></label> <input
							type="text" name="policyAmount" id="policyAmount"
							required="required" placeholder="ENTER POLICY AMOUNT" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">TOTAL POLICY AMOUNT <span class="star">*</span></label>
						<input type="text" name="fdTotalPolicyAmount"
							id="fdTotalPolicyAmount" required="required" readonly="readonly"
							placeholder="ENTER TOTAL POLICY AMOUNT" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">DEPOSIT AMOUNT <span class="star">*</span></label> <input
							type="text" name="depositAmount" id="depositAmount"
							readonly="readonly" required="required"
							placeholder="ENTER DEPOSIT AMOUNT " />
					</div>
				</div>

				<div class="col-lg-12" id="fdSplitSection">

					<div class="card mt-3 mb-3">

						<div class="card-header">
							<strong>FD SPLIT DETAILS</strong>
						</div>

						<div class="card-body">

							<!-- FD SPLIT ROWS -->
							<div id="fdSplitContainer">

								<div class="row fd-split-row mb-2">

									<div class="col-lg-8">

										<label> FD AMOUNT </label> <input type="number"
											class="form-control fd-amount" placeholder="ENTER FD AMOUNT"
											min="1" step="0.01" />

									</div>

									<div class="col-lg-4 d-flex align-items-end">

										<button type="button" class="btn btn-danger remove-fd">
											REMOVE</button>

									</div>

								</div>

							</div>


							<!-- ADD FD -->
							<div class="mt-3">

								<button type="button" id="addFDButton" class="btn btn-primary">
									+ ADD FD</button>

							</div>


							<hr>


							<!-- FD TOTAL INFORMATION -->
							<div class="row mt-3">

								<div class="col-lg-4">

									<div class="d-flex flex-column formFields">

										<label> ALLOCATED AMOUNT </label> <input type="text"
											id="fdAllocatedAmount" class="form-control" readonly />

									</div>

								</div>


								<div class="col-lg-4">

									<div class="d-flex flex-column formFields">

										<label> REMAINING AMOUNT </label> <input type="text"
											id="fdRemainingAmount" class="form-control" readonly />

									</div>

								</div>

							</div>


							<!-- STATUS -->
							<div class="row mt-3">

								<div class="col-lg-12">

									<div id="fdSplitMessage" class="alert" style="display: none;">
									</div>

								</div>

							</div>

						</div>

					</div>

				</div>


				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="Agent">AGENT <span class="star">*</span></label> <select
							id="Agent" name="Agent" required class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT AGENT</option>
						</select>
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">MATURITY AMOUNT <span class="star">*</span></label>
						<input type="text" name="maturityAmount" id="maturityAmount"
							readonly="readonly" required="required"
							placeholder="ENTER MATURITY AMOUNT" />
					</div>
				</div>

				<!-- <div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">MIS INTEREST <span class="star">*</span></label> <input
							type="text" name="MISInterest" id="MISInterest"
							required="required" placeholder="ENTER MIS INTEREST" />
					</div>
				</div>
 -->

			</div>
			<div class="row mt-4">
				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">UPLOAD
						PHOTO</label> <label for="image1" id="drop-area"> <input
						accept="image/*" name="image1" id="image1" hidden="hidden"
						onchange="photopreview();"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="Uploads/upload.png" alt="upload_icon" id="photoPreview" /><input
								type="hidden" name="photoHidden" id="photoHidden">

						</div>
					</label>
				</div>

				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">UPLOAD
						SIGNATURE</label> <label for="image2" id="drop-area"> <input
						accept="image/*" name="image2" id="image2" hidden="hidden"
						onchange="signpreview();"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="Uploads/upload.png" alt="upload_icon"
								id="signaturePreview" /><input type="hidden"
								name="signatureHidden" id="signatureHidden">

						</div>
					</label>
				</div>

			</div>

			<div class="mt-5">
				<nav>
					<ol class="breadcrumb breadcrumb-title">
						<li class="breadcrumb-item action">PAYMENT INFORMATION</li>
					</ol>
				</nav>

				<div class="row">
					<!-- Payment By -->
					<div class="col-lg-3 mb-4">
						<div class="d-flex flex-column formFields">
							<label for="branchName">PAYMENT BY <span class="star">*</span></label>
							<select id="paymentBy" name="paymentBy" required
								class="form-control selectField" style="height: 30px;">
								<option value="">SELECT PAYMENT BY</option>
								<option value="cash">CASH</option>
								<option value="online">ONLINE</option>

								<!-- Add options here -->
							</select>
						</div>
					</div>

					<!-- Remark -->
					<div class="col-lg-3 mb-4">
						<div class="d-flex flex-column formFields">
							<label for="remark">REMARK <span class="star">*</span></label>
							<textarea id="remark" name="remark" required
								placeholder="ENTER REMARK" style="text-transform: uppercase;"
								style="border: 1px solid #e0e0e0; border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"></textarea>
						</div>
					</div>

					<div class="col-lg-3">
						<div
							class=" h-100 d-flex justify-content-start align-items-center"
							style="margin-bottom: 30px;">
							<div
								class="d-flex justify-content-start align-items-center  formFields">
								<label style="margin-left: 20px;" class="mb-2">SMS SEND
									&nbsp;</label>
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
			</div>


		</div>

		<div class="row">
			<div class="col-12 text-center">
				<button id="saveBtn" class="btn btn-info">SAVE</button>

			</div>
		</div>
	</form>

</div>

<script
	src="${pageContext.request.contextPath}/js/PolicyManagment/addInvestment.js"></script>
