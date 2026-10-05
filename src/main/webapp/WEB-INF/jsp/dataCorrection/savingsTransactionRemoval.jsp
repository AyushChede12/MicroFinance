
<div class="pagetitle">
	<h1>DATA CORRECTION</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-pencil-square"></i>
			</a></li>
			<li class="breadcrumb-item action">SAVING TRANSACTION REMOVAL</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">ACCOUNT DETAILS</li>
				</ol>
			</nav>

			<div class="row">
				<input type="hidden" name="id" id="id">

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>SELECT ACCOUNT NO.</label> <select id="accountNumber"
							name="accountNumber" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">-- SEARCH ACCOUNT NO --</option>
						</select>
					</div>
				</div>

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
					<div class="d-flex flex-column formFields">
						<label for="">TRANSACTION DATE</label> <input type="date"
							name="transactionDate" id="transactionDate" required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">TRANSACTION ID</label> <input type="text"
							name="selectSavingTransactionId" id="selectSavingTransactionId"
							required="required" placeholder="ENTER TRANSACTION ID"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="branchName">BRANCH NAME</label> <select
							id="branchName" name="branchName" required="required"
							class="form-control selectField" style="height: 30px;">
						</select>
					</div>
				</div>




				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">CUSTOMER CODE</label> <input type="text"
							name="customerCode" id="customerCode" required="required"
							placeholder="ENTER CUSTOMER CODE"
							style="text-transform: uppercase;" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>NAME</label> <input type="text" name="customerName"
							id="customerName" required="required"
							placeholder="ENTER A/C HOLDER NAME "
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">CONTACT NO</label> <input type="text"
							name="contactNumber" id="contactNumber" required="required"
							placeholder="ENTER CONTACT NO " style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>CO-HOLDER </label> <input type="text" name="jointHolderName"
							id="jointHolderName" required="required"
							placeholder="JOINT CO-HOLDER NAME"
							style="text-transform: uppercase;" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label for="">SB POLICY TYPE</label> <input type="text"
							name="savingPlanName" id="savingPlanName" required="required"
							placeholder="ENTER POLICY TYPE " />
					</div>
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
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>AVAILABLE BALANCE</label> <input type="text"
							name="averageBalance" id="averageBalance" required="required"
							placeholder="ENTER AVAILABLE BALANCE"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">PAYMENT REASON</label> <input type="text"
							name="transactionFor" id="transactionFor" required="required"
							placeholder="ENTER PAYMENT REASON"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>COMMENTS</label> <input type="text" name="comments"
							id="comments" required="required" placeholder="ENTER COMMENTS"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">TRANSACTION TYPE  </label><select
							id="transactionType" name="transactionType" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT</option>
							<option value="Deposit">DEPOSITE</option>
							<option value="Withdraw">WITHDRAW</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">AMOUNT</label> <input type="text"
							name="transactionAmount" id="transactionAmount"
							required="required" placeholder="ENTER  AMOUNT" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">MODE OF PAYMENT </label> <select id="payBy"
							name="payBy" required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT PAYMENT BY</option>
							<option value="Cash">CASH</option>
							<option value="Online">ONLINE</option>
						</select>
					</div>
				</div>
			</div>

		</div>

		<div class="mt-5">
			<div class="row">
				<div class="col-12 text-center" style="margin-top: 30px;">
					<button type="button" id="deleteBtn" class="btnStyle bg-danger"
						style="background-color: #FFA500;">DELETE</button>
				</div>
			</div>

		</div>

	</form>

</div>

<script
	src="${pageContext.request.contextPath}/js/dataCorrection/savingTransactionRemoval.js"></script>

