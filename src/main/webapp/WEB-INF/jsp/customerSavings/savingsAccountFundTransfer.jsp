

<div class="pagetitle">
	<h1>SAVING / CURRENT ACCOUNT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-bank text-blue"></i>
			</a></li>
			<li class="breadcrumb-item action">SAVINGS ACCOUNT FUND TRANSFER</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">DEBIT ACCOUNT DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">SELECT ACCOUNT NUMBER</label> <select
							id="debitAccountNumber" name="debitAccountNumber"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">--SELECT ACCOUNT NO--</option>

						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CUSTOMER CODE</label> <input type="text"
							name="debitCustomerCode" id="debitCustomerCode"
							readonly="readonly" required="required"
							placeholder="ENTER CUSTOMER CODE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">ACCOUNT BRANCH</label> <input type="text"
							name="debitAccountBranch" id="debitAccountBranch"
							readonly="readonly" required="required"
							placeholder="ENTER ACCOUNT BRANCH" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">AVERAGE BALANCE</label> <input type="text"
							name="debitAverageBalance" id="debitAverageBalance"
							readonly="readonly" required="required"
							placeholder="ENTER AVERAGE BALANCE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CONTACT NUMBER</label> <input type="text"
							name="debitContactNumber" id="debitContactNumber"
							readonly="readonly" required="required"
							placeholder="ENTER CONTACT NUMBER" />
					</div>
				</div>
			</div>

		</div>


		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">CREDIT ACCOUNT DETAILS</li>
				</ol>
			</nav>
			<div class="row">

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">SELECT ACCOUNT NUMBER</label> <select
							id="creditAccountNumber" name="creditAccountNumber"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT</option>

						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CUSTOMER CODE</label> <input type="text"
							name="creditCustomerCode" id="creditCustomerCode"
							readonly="readonly" required="required"
							placeholder="ENTER CUSTOMER CODE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">ACCOUNT BRANCH</label> <input type="text"
							name="creditAccountBranch" id="creditAccountBranch"
							readonly="readonly" required="required"
							placeholder="ENTER ACCOUNT BRANCH" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">AVERAGE BALANCE</label> <input type="text"
							name="creditAverageBalance" id="creditAverageBalance"
							readonly="readonly" required="required"
							placeholder="ENTER AVERAGE BALANCE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CONTACT NUMBER</label> <input type="text"
							name="creditContactNumber" id="creditContactNumber"
							readonly="readonly" required="required"
							placeholder="ENTER CONTACT NUMBER" />
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
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">TRANSFER DATE</label> <input type="date"
							name="transferDate" id="transferDate" required="required"
							placeholder="Enter Vehicle No" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">AMOUNT</label> <input type="text" name="amount"
							id="amount" required="required" placeholder="ENTER AMOUNT" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">COMMENT</label>
						<textarea name="comment" id="comment" style="text-transform: uppercase;"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"></textarea>
					</div>
				</div>

			</div>
		</div>
		<br>
		<div class="row">
			<div class="col-7 text-center">
				<button id="saveBtn" class="btn btn-warning"
					style="margin-left: 80%;">SAVE</button>
			</div>
		</div>
	</form>

</div>
<script
	src="${pageContext.request.contextPath}/js/customerSavings/SavingAccountFundTransfer.js"></script>