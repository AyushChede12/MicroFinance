
<div class="pagetitle">
	<h1>SAVING / CURRENT ACCOUNT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-bank text-blue"></i>
			</a></li>

			<li class="breadcrumb-item action">SAVINGS ACCOUNT INTEREST
				TRANSFER</li>
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
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">ACCOUNT NO</label> <select id="accountNumber" name="accountNumber"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT ACCOUNT NO</option>
						</select>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="customerName">CUSTOMER NAME</label> <input type="text"
							name="customerName" id="customerName" required="required"
							readonly="readonly" placeholder="ENTER CUSTOMER NAME"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="accountType">ACCOUNT TYPE</label> <input type="text"
							name="accountType" id="accountType" required="required"
							readonly="readonly" placeholder="ENTER ACCOUNT TYPE"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="currentBalance">CURRENT BALANCE</label> <input
							type="text" name="currentBalance" id="currentBalance"
							readonly="readonly" required="required"
							placeholder="ENTER CURRENT BALANCE"
							style="text-transform: uppercase;" />
					</div>
				</div>

			</div>
		</div>


		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">INTEREST DETAILS</li>
				</ol>
			</nav>
			<div class="row">

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">INTEREST TYPE</label> <select id="interestType"
							name="interestType" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">--SELECT INTEREST TYPE--</option>
							<option value="monthly">MONTHLY</option>
							<option value="quaterly">QUATERLY</option>
							<option value="yearly">YEARLY</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="interestRate">INTEREST RATE</label> <input type="number"
							name="interestRate" id="interestRate" required="required"
							placeholder="ENTER INTEREST RATE"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="fromDate">FROM DATE</label> <input type="date"
							name="fromDate" id="fromDate" required="required" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="toDate">TO DATE</label> <input type="date"
							name="toDate" id="toDate" required="required" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="totalDays">TOTAL DAYS</label> <input type="text"
							name="totalDays" id="totalDays" required="required" readonly="readonly"
							placeholder="ENTER TOTAL DAYS" style="text-transform: uppercase;" />
					</div>
				</div>
			</div>
		</div>

		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">CALCULATION PREVIEW</li>
				</ol>
			</nav>
			<div class="row">

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="interestAmount">CALCULATED INTEREST AMOUNT</label> <input
							type="text" name="interestAmount" id="interestAmount"
							required="required" placeholder="INTEREST AMOUNT"
							readonly="readonly" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="newBalance">NEW BALANCE</label> <input type="text"
							name="newBalance" id="newBalance" required="required"
							readonly="readonly" placeholder="NEW BALANCE"
							style="text-transform: uppercase;" />
					</div>
				</div>

			</div>
		</div>

		<div class="row">
			<div class="col-12 d-flex justify-content-center gap-3">
				<button id="generateInterestBtn" class="btn btn-warning">
					GENERATE INTEREST</button>

				<button id="transferInterestBtn" class="btn btn-warning" style="margin-left: 20px;">TRANSFER
					INTEREST</button>
			</div>
		</div>

	</form>

</div>
<script
	src="${pageContext.request.contextPath}/js/customerSavings/SBInterestTransfer.js"></script>