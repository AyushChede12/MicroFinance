<div class="pagetitle">
	<h1>SAVINGS / CURRENT ACCOUNT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"><i
					class="bi bi-bank text-blue"></i></a></li>
			<li class="breadcrumb-item action">SAVINGS SCHEME CATALOG</li>
		</ol>
	</nav>
</div>


<!-- ************** FORM START ************** -->
<form id="savingForm">

	<!-- Hidden ID -->
	<input type="hidden" id="savingAccountId" />

	<nav>
		<ol class="breadcrumb breadcrumb-title">
			<li class="breadcrumb-item action">SAVING PLAN DETAILS</li>
		</ol>
	</nav>

	<div class="row">

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>PLAN NAME</label>
				<input type="text" id="policyName" class="form-control" style="text-transform: uppercase;"
					placeholder="ENTER PLAN NAME" required />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>YEARLY ROI (%)</label>
				<input type="number" id="yearlyROI" class="form-control";
					placeholder="ENTER YEARLY ROI" step="0.01" required />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>CUSTOMER NAME</label>
				<input type="text" id="customerName" class="form-control" style="text-transform: uppercase";
					placeholder="ENTER CUSTOMER NAME" required />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>INITIAL DEPOSIT</label>
				<input type="number" id="initialDeposit" class="form-control"
					placeholder="ENTER INITIAL DEPOSIT" required />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>MINIMUM OPENING BALANCE</label>
				<input type="number" id="minimumOpeningBalance"
					class="form-control"
					placeholder="ENTER MINIMUM OPENING BALANCE" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>RESERVED FUNDS</label>
				<input type="number" id="reservedFunds" class="form-control"
					placeholder="ENTER RESERVED FUNDS" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>MESSAGING FEES</label>
				<select id="messagingFees" class="form-control" required>
					<option value="">SELECT</option>
					<option value="YES">YES</option>
					<option value="NO">NO</option>
				</select>
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>MESSAGING INTERVAL</label>
				<select id="messagingInterval" class="form-control">
					<option value="">SELECT</option>
					<option value="MONTHLY">MONTHLY</option>
				</select>
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>MONTHLY FREE IFSC</label>
				<input type="number" id="monthlyFreeIFSC"
					class="form-control"
					placeholder="ENTER MONTHLY FREE IFSC" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>FREE MONEY TRANSFERS</label>
				<input type="number" id="freeMoneyTransfers"
					class="form-control"
					placeholder="ENTER FREE MONEY TRANSFERS" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>LIMIT PER TRANSACTION</label>
				<input type="number" id="limitPerTransaction"
					class="form-control"
					placeholder="ENTER LIMIT PER TRANSACTION" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>DAILY LIMIT</label>
				<input type="number" id="dailyLimit" class="form-control"
					placeholder="ENTER DAILY LIMIT" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>WEEKLY LIMIT</label>
				<input type="number" id="weeklyLimit" class="form-control"
					placeholder="ENTER WEEKLY LIMIT" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>MONTHLY LIMIT</label>
				<input type="number" id="monthlyLimit" class="form-control"
					placeholder="ENTER MONTHLY LIMIT" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>SERVICE FEE</label>
				<input type="number" id="serviceFee" class="form-control"
					placeholder="ENTER SERVICE FEE" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>BILLING CYCLE</label>
				<select id="billingCycle" class="form-control">
					<option value="">SELECT</option>
					<option value="DAILY">DAILY</option>
					<option value="WEEKLY">WEEKLY</option>
					<option value="MONTHLY">MONTHLY</option>
					<option value="YEARLY">YEARLY</option>
				</select>
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>CARD FEE</label>
				<input type="number" id="cardFee" class="form-control"
					placeholder="ENTER CARD FEE" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>MONTHLY CARD LIMIT</label>
				<input type="number" id="monthlyCardLimit"
					class="form-control"
					placeholder="MONTHLY CARD LIMIT" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>YEARLY CARD LIMIT</label>
				<input type="number" id="yearlyCardLimit"
					class="form-control"
					placeholder="YEARLY CARD LIMIT" />
			</div>
		</div>

	</div>

	<div class="row mt-4">
		<div class="col-12 text-center">
			<button type="button" id="saveBtn" class="btn btn-warning">SAVE</button>
			<button type="button" id="updateBtn" class="btn btn-success ml-3">UPDATE</button>
		</div>
	</div>

</form>

<!-- ************** FORM END ************** -->


<div class="row mt-5">
	<div class="col-12">
		<div class="card recent-sales">
			<div class="card-body table-responsive">
				<h5 class="card-title">
					SAVING SCHEME CATALOG DATA <span>| TABLE VIEW</span>
				</h5>

				<table class="table table-borderless datatable">
					<thead class="table-light">
						<tr>
							<th>SR</th>
							<th>PLAN</th>
							<th>CUSTOMER</th>
							<th>INITIAL</th>
							<th>OPENING</th>
							<th>DAILY</th>
							<th>MONTHLY CARD</th>
							<th>YEARLY CARD</th>
							<th>EDIT</th>
							<th>DELETE</th>
						</tr>
					</thead>
					<tbody id="tbody"></tbody>
				</table>

			</div>
		</div>
	</div>
</div>
<style>
    /* Make all form inputs and selects uniform with slightly smaller size */
    #savingForm input,
    #savingForm select {
        width: 100%;        /* Full width of their column */
        height: 36px;       /* Slightly smaller height */
        padding: 5px 10px;  /* Adjust padding for smaller height */
        box-sizing: border-box; /* Include padding in width */
        font-size: 0.9rem;  /* Keep text readable */
    }

    /* Optional: make placeholders consistent */
    #savingForm input::placeholder {
        font-size: 0.85rem;
    }
</style>


<script
	src="${pageContext.request.contextPath}/js/customerSavings/SavingScemeCatalog.js"></script>