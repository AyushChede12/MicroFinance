<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="pagetitle">
	<h1>SAVING / CURRENT ACCOUNT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-bank text-blue"></i>
			</a></li>
			<li class="breadcrumb-item action">SAVING ACCOUNT ACTIVITY</li>
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

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">SAVING TRANSACTION ID</label> <input type="text"
							name="selectSavingTransactionId" id="selectSavingTransactionId"
							readonly="readonly" required="required"
							value="${transactionCode}" placeholder=" " />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="vehicalNo">TRANSACTION DATE</label> <input type="date"
							name="transactionDate" id="transactionDate" required="required" " />
					</div>
				</div>

				<div class="col-lg-3">
					<!-- width badhane ke liye 6 -->
					<div class="d-flex flex-column formFields mb-4">
						<label for="accountNumber">ACCOUNT NUMBER</label> <select
							id="accountNumber" name="accountNumber"
							class="form-control selectField account-select" required>
							<option value="">--SELECT ACCOUNT NUMBER--</option>
						</select>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">BRANCH NAME</label> <input type="text"
							readonly="readonly" name="selectBranchName" id="selectBranchName"
							required="required" placeholder="ENTER BRANCH NAME" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CUSTOMER CODE</label> <input type="text"
							readonly="readonly" name="customerCode" id="customerCode"
							required="required" placeholder=" ENTER CUSTOMER CODE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CUSTOMER NAME</label> <input type="text"
							readonly="readonly" name="customerName" id="customerName"
							required="required" placeholder="ENTER CUSTOMER NAME" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CONTACT NUMBER</label> <input type="text"
							readonly="readonly" name="contactNumber" id="contactNumber"
							required="required" placeholder="ENTER CONTACT NUMBER" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">JOINT HOLDER NAME</label> <input type="text"
							readonly="readonly" name="jointHolderName" id="jointHolderName"
							required="required" placeholder="ENTER JOINT HOLDER NAME" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">SAVING PLAN NAME</label> <input type="text"
							readonly="readonly" name="savingPlanName" id="savingPlanName"
							required="required" placeholder="ENTER SAVING PLAN NAME" />
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
					<div class="d-flex flex-column formFields mb-4">
						<label for="">AVERAGE BALANCE</label> <input type="text"
							name="averageBalance" id="averageBalance" required="required"
							placeholder="ENTER AVERAGE BALANCE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">TRANSACTION FOR</label> <input type="text"
							style="text-transform: uppercase;" name="transactionFor"
							id="transactionFor" required="required"
							placeholder="ENTER TRANSACTION FOR" />
					</div>
				</div>

				<div class="col-lg-3">

					<div class="d-flex flex-column formFields mb-4">
						<label for="">TRANSACTION TYPE</label> <select
							id="transactionType" name="transactionType" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">--SELECT TYPE--</option>
							<option value="Deposit">DEPOSIT</option>
							<option value="Withdraw">WITHDRAW</option>

						</select>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">COMMENTS</label> <select id="comments"
							name="comments" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">--SELECT--</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">TRANSACTION AMOUNT</label> <input type="text"
							name="transactionAmount" id="transactionAmount"
							required="required" placeholder="ENTER TRANSACTION AMOUNT" />
							<span id="balanceError" style="color:red; font-size:13px;"></span>
					</div>
					<table id="memberFeesTable" class="table table-bordered"
						style="font-size: 10px; position: absolute; bottom: 40px; left: 0; width: 90%; display: none; background: #fff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2); z-index: 1000; table-layout: fixed;">

						<thead>
							<tr style="height: 26px;">
								<th style="padding: 3px; width: 28%;">Input</th>
								<th style="padding: 3px; width: 34%;">Qty</th>
								<th style="padding: 3px; width: 38%;">Result</th>
							</tr>
						</thead>

						<tbody>

							<tr style="height: 26px;">
								<td style="padding: 4px 2px;">₹2000</td>
								<td><input type="number" id="qty2000" min="0" value="0"
									class="form-control" oninput="calcOpeningFees()"
									style="height: 22px; font-size: 10px; padding: 2px;"></td>
								<td style="padding: 4px 2px;">₹<span id="res2000">0</span></td>
							</tr>

							<tr style="height: 26px;">
								<td style="padding: 4px 2px;">₹500</td>
								<td><input type="number" id="qty500" min="0" value="0"
									class="form-control" oninput="calcOpeningFees()"
									style="height: 22px; font-size: 10px; padding: 2px;"></td>
								<td style="padding: 4px 2px;">₹<span id="res500">0</span></td>
							</tr>

							<tr style="height: 26px;">
								<td style="padding: 4px 2px;">₹200</td>
								<td><input type="number" id="qty200" min="0" value="0"
									class="form-control" oninput="calcOpeningFees()"
									style="height: 22px; font-size: 10px; padding: 2px;"></td>
								<td style="padding: 4px 2px;">₹<span id="res200">0</span></td>
							</tr>

							<tr style="height: 26px;">
								<td style="padding: 4px 2px;">₹100</td>
								<td><input type="number" id="qty100" min="0" value="0"
									class="form-control" oninput="calcOpeningFees()"
									style="height: 22px; font-size: 10px; padding: 2px;"></td>
								<td style="padding: 4px 2px;">₹<span id="res100">0</span></td>
							</tr>

							<tr style="height: 26px;">
								<td style="padding: 4px 2px;">₹50</td>
								<td><input type="number" id="qty50" min="0" value="0"
									class="form-control" oninput="calcOpeningFees()"
									style="height: 22px; font-size: 10px; padding: 2px;"></td>
								<td style="padding: 4px 2px;">₹<span id="res50">0</span></td>
							</tr>

							<tr style="height: 26px;">
								<td style="padding: 4px 2px;">₹20</td>
								<td><input type="number" id="qty20" min="0" value="0"
									class="form-control" oninput="calcOpeningFees()"
									style="height: 22px; font-size: 10px; padding: 2px;"></td>
								<td style="padding: 4px 2px;">₹<span id="res20">0</span></td>
							</tr>

							<tr style="height: 26px;">
								<td style="padding: 4px 2px;">₹10</td>
								<td><input type="number" id="qty10" min="0" value="0"
									class="form-control" oninput="calcOpeningFees()"
									style="height: 22px; font-size: 10px; padding: 2px;"></td>
								<td style="padding: 4px 2px;">₹<span id="res10">0</span></td>
							</tr>

							<tr style="height: 26px;">
								<td style="padding: 4px 2px;">₹5</td>
								<td><input type="number" id="qty5" min="0" value="0"
									class="form-control" oninput="calcOpeningFees()"
									style="height: 22px; font-size: 10px; padding: 2px;"></td>
								<td style="padding: 4px 2px;">₹<span id="res5">0</span></td>
							</tr>

							<tr style="height: 30px;">
								<th colspan="2" style="padding: 4px 2px;">Total Member Fees</th>
								<th style="padding: 4px 2px;">₹<span id="totalFee">0</span></th>
							</tr>

						</tbody>
					</table>
				</div>

				<div class="col-lg-3">

					<div class="d-flex flex-column formFields mb-4">
						<label for="">PAY BY</label> <select id="payBy" name="payBy"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option selected="selected" value="">SELECT</option>
							<option value="Cash">CASH</option>
							<option value="Cheque">CHEQUE</option>
							<option value="Online">ONLINE</option>
							<option value="NEFT">NEFT</option>
						</select>
					</div>
				</div>
			</div>
			<!-- Cheque input fields -->
			<div id="chequeInputs" style="display: none;">
				<div class="row">
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="">CHEQUE NO. </label> <input type="text"
								name="chequeNo" id="chequeNo" required="required"
								placeholder="Enter Cheque No." />
						</div>
					</div>
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="">CHEQUE DATE </label> <input type="Date"
								name="chequeDate" id="chequeDate" required="required"
								placeholder="Enter Cheque Date" />
						</div>
					</div>
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="">DEPOSIT A/C </label> <input type="text"
								name="depositAcc1" id="depositAcc1" required="required"
								placeholder="Enter Deposite A/C No." />
						</div>
					</div>
				</div>
			</div>
			<!-- Online input fields -->
			<div id="onlineInputs" style="display: none;">
				<div class="row">
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="">DEPOSIT A/C </label> <input type="text"
								name="depositAcc2" id="depositAcc2" required="required"
								placeholder="Enter Deposite A/C No." />
						</div>
					</div>
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="">Ref Number </label> <input type="text"
								name="refNumber1" id="refNumber1" required="required"
								placeholder="Enter Deposite Ref No." />
						</div>
					</div>
				</div>
			</div>
			<!-- NEFT input fields -->
			<div id="neftInputs" style="display: none;">
				<div class="row">
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="">Deposit A/C </label> <input type="text"
								name="depositAcc3" id="depositAcc3" required="required"
								placeholder="Enter Deposite A/C No." />
						</div>
					</div>
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="">REF NUMBER </label> <input type="text"
								name="refNumber2" id="refNumber2" required="required"
								placeholder="Enter Deposite Ref No." />
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-12 text-center">
				<button type="button" id="saveBtn" class="btn btn-warning"
					style="margin-left: 80%;">Save</button>

			</div>
		</div>
	</form>

</div>
<div class="row mt-5">
	<div class="col-12">
		<div class="card recent-sales">

			<div class="card-body table-responsive">
				<h5 class="card-title">
					SAVING ACCOUNT DATA <span>| TABLE VIEW</span>
				</h5>

				<table class="table table-borderless datatable overflow-scroll">
					<thead class="table-light">
						<tr style="font-family: 'Poppins', sans-serif;">
							<th style="white-space: nowrap;">SR NO</th>
							<th style="white-space: nowrap;">BRANCH NAME</th>
							<th style="white-space: nowrap;">OPENING DATE</th>
							<th style="white-space: nowrap;">ACCOUNT NUMBER</th>
							<th style="white-space: nowrap;">TRANSACTION TYPE</th>
							<th style="white-space: nowrap;">CREDIT/DEBIT</th>
							<th style="white-space: nowrap;">BALANCE</th>
							<th style="white-space: nowrap;">PAY MODE</th>
							<th style="white-space: nowrap;">REMARKS</th>
							<th style="white-space: nowrap;">TXN ID</th>
							<th style="white-space: nowrap;">USER ID</th>
						</tr>
					</thead>
					<tbody id="tbody">

					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>


<script>
	document.getElementById('payBy').addEventListener('change', function() {
		// Get the selected payment mode
		let mode = this.value;

		// Define all input field sections
		const chequeInputs = document.getElementById('chequeInputs');
		const onlineInputs = document.getElementById('onlineInputs');
		const neftInputs = document.getElementById('neftInputs');

		// Reset the display of all sections
		chequeInputs.style.display = 'none';
		onlineInputs.style.display = 'none';
		neftInputs.style.display = 'none';

		// Show the section corresponding to the selected payment mode
		if (mode === 'Cheque') {
			chequeInputs.style.display = 'block';
		} else if (mode === 'Online') {
			onlineInputs.style.display = 'block';
		} else if (mode === 'NEFT') {
			neftInputs.style.display = 'block';
		}
	});
</script>
<script
	src="${pageContext.request.contextPath}/js/customerSavings/SavingAccountActivity.js"></script>
