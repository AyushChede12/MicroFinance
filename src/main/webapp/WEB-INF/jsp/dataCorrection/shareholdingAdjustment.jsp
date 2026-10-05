
<div class="pagetitle">
	<h1>DATA CORRECTION</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-pencil-square"></i>
			</a></li>
			<li class="breadcrumb-item action">SHAREHOLDING ADJUSTMENT </li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">

		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SHARE DETAILS</li>
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
						<label for="">FIND BY CODE</label> <select id="findByCode"
							name="findByCode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">-- SEARCH CUSTOMER CODE --</option>

						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="customerName">CUSTOMER NAME</label> <input type="text"
							name="customerName" id="customerName" required="required"
							placeholder="ENTER CUSTOMER NAME"
							style="text-transform: uppercase;" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>START DATE</label> <input type="date" name="startDate"
							id="startDate" required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="previousAccountBalance">PREVIOUS ACCOUNT 
						BALANCE </label> <input type="text" name="previousAccountBalance"
							id="previousAccountBalance" required="required"
							placeholder="Enter Previous Balance"
							style="text-transform: uppercase;" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>PREVIOUS SHARE COUNT</label> <input type="text"
							name="previousShareCount" id="previousShareCount"
							required="required" placeholder="Enter Previous No Of Share"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">BASE VALUE</label> <input type="text"
							name="baseValue" id="baseValue" required="required"
							placeholder="ENTER FACE VALUE" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>BRANCH</label> <select id="branchName" name="branchName"
							required="required" class="form-control selectField"
							style="height: 30px;">
						</select>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label for="">DATE OF TRANSFER</label> <input type="date"
							name="dateOfTransfer" id="dateOfTransfer" required="required"
							placeholder="" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">Shares Issued By</label> <select id="shareIssuedBy"
							name="shareIssuedBy" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">Select Shares Issued By</option>
							<option value="Tata Motors Ltd.">Tata Motors Ltd.</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">SHARE COUNT</label> <input type="text"
							name="noOfShare" id="noOfShare" required="required"
							placeholder="ENTER SHARE COUNT " />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>TRANSFER AMOUNT</label> <input type="text"
							name="amountTransferred" id="amountTransferred"
							required="required" placeholder="ENTER TRANSFER AMOUNT" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">BALANCE SHARE</label> <input type="text"
							name="balanceShares" id="balanceShares" required="required"
							placeholder="ENTER BALANCE SHARES " />
					</div>
				</div>

			</div>


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
						<label>MODE OF PAYMENT </label> <select id="modeOfPayment"
							name="modeOfPayment" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT MODE OF PAYMENT </option>
							<option value="Cash">CASH</option>
							<option value="Online">ONLINE</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">COMMENTS</label>
						<textarea name="comments" id="comments"
							placeholder="ENTER COMMENTS IF ANY "
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"></textarea>
					</div>
				</div>

			</div>

		</div>
		<div class="row">
			<div class="col-12 text-center" style="margin-top: 30px;">
				<button type="button" id="printBtn" class="btn btn-warning">PRINT</button>
				<button type="button" id="updateBtn" class="btn btn-success">UPDATE</button>
				<button type="button" id="deleteBtn" class="btn btn-danger">DELETE</button>
			</div>
		</div>

	</form>

</div>

<script
	src="${pageContext.request.contextPath}/js/dataCorrection/shareHoldingUpdate.js"></script>
