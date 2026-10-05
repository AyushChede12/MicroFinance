
<div class="pagetitle">
	<h1>DATA CORRECTION </h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-pencil-square"></i>
			</a></li>
			<li class="breadcrumb-item action">POLICY DETAILS</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">EDIT INVESTMENT</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-5">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 20px;">
						<label for="policyCode">SELECT BY POLICY CODE </label> <select
							id="policyCode" name="policyCode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">-- SEARCH POLICY CODE --</option>
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
                  </div>:Member Selection        
                </div>
              </div> -->
					<input type="hidden" name="id" id="id">
					<div class="d-flex flex-column formFields">
						<label for="policyStartDate">POLICY DATE</label> <input
							type="date" name="policyStartDate" id="policyStartDate"
							required="required" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="memberSelection">CUSTOMER SELECTION</label> <select
							id="memberSelection" name="memberSelection" required="required"
							class="form-control selectField" style="height: 30px;">
						</select>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label for="customerName">CUSTOMER NAME</label> <input type="text"
							name="customerName" id="customerName" required="required"
							placeholder="ENTER CUSTOMER NAME "
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="dateofBirth">DATE OF BIRTH  </label> <input type="date"
							name="dateofBirth" id="dateofBirth" required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>RELATIVE DETAILS </label> <input type="text"
							name="relationDetails" id="relationDetails"
							placeholder="ENTER RELATIVE NAME " required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">CONTACT NO</label> <input type="text"
							name="contactNo" id="contactNo" required="required"
							placeholder="ENTER CONTACT NO " style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>SUGGESTED NOMINEE </label> <input type="text"
							name="suggestedNominee" id="suggestedNominee" required="required"
							placeholder="ENTER SUGGESTED NOMINEE"            
							style="text-transform: uppercase;" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label for="">RELATION</label> <select id="relationToApplicant"
							name="relationToApplicant" required="required"
							class="form-control selectField" style="height: 30px;">
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="address">ADDRESS</label>
						<textarea name="address" id="address"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"></textarea>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>DISTRICT</label> <input type="text" name="district"
							id="district" required="required" placeholder="ENTER DISTRICT" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="state">STATE</label> <input type="text" name="state"
							id="state" required="required" placeholder="ENTER STATE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>PIN CODE</label> <input type="text" name="pinCode"
							id="pinCode" required="required" placeholder="ENTER PINCODE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="branchName">BRANCH NAME</label><select id="branchName"
							name="branchName" required="required"
							class="form-control selectField" style="height: 30px;">
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="ModeOfOperation">MODE OF OPEARTION of Operation </label> <select
							id="ModeOfOperation" name="ModeOfOperation" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT MODE</option>
							<option value="Single">SINGLE</option>
							<option value="Joint">JOINT</option>

						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="maturityDate">PAYOFF DATE</label> <input type="date"
							name="maturityDate" id="maturityDate" required="required" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label> POLICY TYPE </label> <select id="schemeType"
							name="schemeType" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT</option>
							<option value="RD">RD</option>


						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="schemeTerm">POLICY TERM  </label> <input type="text"
							name="schemeTerm" id="schemeTerm" required="required"
							placeholder="ENTER POLICY TERM " />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="schemeMode">POLICY MODE</label> <select
							id="schemeMode" name="schemeMode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT MODE</option>
							<option value="Daily">DAILY</option>
							<option value="Monthly">MONTHLY</option>
							<option value="Quarterly">QUARTERLY </option>
							<option value="Yearly">YEARLY</option>


						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px;">
						<label for="policyAmount">POLICY AMOUNT</label> <input type="text"
							name="policyAmount" id="policyAmount" required="required"
							placeholder="ENTER POLICY AMOUNT" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label>DEPOSITE AMOUNT</label> <input type="text"
							name="depositAmount" id="depositAmount" required="required"
							placeholder="ENTER DEPOSITE AMOUNT" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label>MATURITY AMOUNT</label> <input type="text"
							name="maturityAmount" id="maturityAmount" required="required"
							placeholder="ENTER MATURITY AMOUNT" />
					</div>
				</div>

			</div>

		</div>


		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">PAYMNET DETAILS </li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>MODE OF PAYMENT  </label> <select id="paymentBy"
							name="paymentBy" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT</option>
							<option value="Cash">CASH</option>
							<option value="Online">ONLINE</option>

						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="remark">COMMENT</label>
						<textarea name="remark" id="remark" placeholder="ENTER REMARKS"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"></textarea>
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
					<button type="button" id="printBtn" class="btnStyle bg-primary">PRINT</button>
					<button type="button" id="deleteBtn" class="btnStyle bg-danger"
						style="background-color: #FFA500;">DELETE</button>
					<button type="button" id="updateBtn" class="btnStyle bg-warning">UPDATE</button>
				</div>
			</div>

		</div>

	</form>

</div>

<script
	src="${pageContext.request.contextPath}/js/dataCorrection/policyDetailsUpdate.js"></script>
