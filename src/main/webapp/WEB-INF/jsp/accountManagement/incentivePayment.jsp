
<div class="pagetitle">
	<h1>ACCOUNT MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="home"> <i
					class="bi bi-wallet2"></i>
			</a></li>
			<li class="breadcrumb-item action">INCENTIVE PAYMENT</li>
		</ol>
	</nav>
</div>

<div>
	<form>
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH BOX</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">INCENTIVE MONTH</label> <select id="month"
							name="month" required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">--SELECT MONTH--</option>
							<option value="january">JANUARY</option>
							<option value="february">FEBRUARY</option>
							<option value="march">MARCH</option>
							<option value="april">APRIL</option>
							<option value="may">MAY</option>
							<option value="june">JUNE</option>
							<option value="july">JULY</option>
							<option value="august">AUGUST</option>
							<option value="september">SEPTEMBER</option>
							<option value="october">OCTOBER</option>
							<option value="november">NOVEMBER</option>
							<option value="december">DECEMBER</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">AGENT CODE</label> <input type="text"
							style="text-transform: uppercase;" name="agentCode"
							id="agentCode" required="required" placeholder="ENTER CODE" />
					</div>
				</div>

				<div class="col-3 text-left mt-3">
					<button type="button" id="searchBtn" class="btnStyle"
						style="background-color: #FFA500;">SEARCH</button>
				</div>
			</div>
		</div>
	</form>
</div>

<div class="row">
	<div class="col-lg-12">
		<nav>
			<ol class="breadcrumb breadcrumb-title">
				<li class="breadcrumb-item action mt-3">TEAM MEMBER DETAILS</li>
			</ol>
		</nav>
	</div>

	<div class="col-lg-3">
		<div class="d-flex flex-column formFields mb-4">
			<label for="">FULL NAME</label> <input type="text" name="fullName"
				style="text-transform: uppercase;" readonly="readonly" id="fullName"
				required="required" placeholder="ENTER FULL NAME" />
		</div>
	</div>

	<div class="col-lg-3">
		<div class="d-flex flex-column formFields mb-4">
			<label for="">DESIGNATION</label> <input type="text"
				style="text-transform: uppercase;" readonly="readonly"
				name="designation" id="designation" required="required"
				placeholder="ENTER DESIGNATION" />
		</div>
	</div>

</div>

<div class="row">
	<div class="col-lg-12">
		<nav>
			<ol class="breadcrumb breadcrumb-title">
				<li class="breadcrumb-item action mt-3">INCENTIVE DETAILS</li>
			</ol>
		</nav>
	</div>



	<div class="col-lg-3">
		<div class="d-flex flex-column formFields mb-4">
			<label for="">PERSONAL SALES</label> <input type="text"
				readonly="readonly" name="personalSales" id="personalSales"
				required="required" placeholder="ENTER PERSONAL SALES" />
		</div>
	</div>

	<div class="col-lg-3">
		<div class="d-flex flex-column formFields mb-4">
			<label for=""> GROUP SALES</label> <input type="text"
				readonly="readonly" name="groupSales" id="groupSales"
				required="required" placeholder="ENTER GROUP SALES" />
		</div>
	</div>

	<div class="col-lg-3">
		<div class="d-flex flex-column formFields mb-4">
			<label for="">OVERALL SALES</label> <input type="text"
				readonly="readonly" name="overallSales" id="overallSales"
				required="required" placeholder="ENTER OVERALL SALES" />
		</div>
	</div>


	<div class="col-lg-3">
		<div class="d-flex flex-column formFields mb-4">
			<label for="">TOTAL EARNINGS</label> <input type="text"
				readonly="readonly" name="totalEarnings" id="totalEarnings"
				required="required" placeholder="ENTER TOTAL EARNINGS" />
		</div>
	</div>

	<div class="col-lg-3">
		<div class="d-flex flex-column formFields mb-4">
			<label for="">TAX DEDUCTED</label> <input type="text"
				readonly="readonly" name="taxDeducted" id="taxDeducted"
				required="required" placeholder="ENTER TAX DEDUCTED" />
		</div>
	</div>

	<div class="col-lg-3">
		<div class="d-flex flex-column formFields mb-4">
			<label for="">SERVICE DEDUCTION</label> <input type="text"
				readonly="readonly" name="serviceDeduction" id="serviceDeduction"
				required="required" placeholder="ENTER SERVICE DEDUCTION" />
		</div>
	</div>

	<div class="col-lg-3">
		<div class="d-flex flex-column formFields mb-4">
			<label for="">EXTRA ALLOWANCE</label> <input type="text"
				readonly="readonly" name="extraAllowance" id="extraAllowance"
				required="required" placeholder="ENTER EXTRA ALLOWANCE" />
		</div>
	</div>

	<div class="col-lg-3">
		<div class="d-flex flex-column formFields mb-4">
			<label for="">FINAL PAYOUT</label> <input type="FinalPayout"
				readonly="readonly" name="finalPayout" id="finalPayout"
				required="required" placeholder="ENTER FINAL PAYOUT" />
		</div>
	</div>
</div>
<div class="row">
	<div class="col-lg-12">
		<nav>
			<ol class="breadcrumb breadcrumb-title">
				<li class="breadcrumb-item action mt-3">PAYMENT DETAILS</li>
			</ol>
		</nav>
	</div>

	<div class="col-lg-3">
		<div class="d-flex flex-column formFields">
			<label for="">PAYMENT BRANCH</label> <select id="paymentBranch"
				name="paymentBranch" required="required"
				class="form-control selectField" style="height: 30px;">
				<option value="">--SELECT BRANCH--</option>
			</select>
		</div>
	</div>

	<div class="col-lg-3">
		<div class="d-flex flex-column formFields mb-4">
			<label for=""> DATE OF PAYMENT</label> <input type="date"
				name="paymentDate" id="paymentDate" required="required" />
		</div>
	</div>

	<div class="col-lg-3">
		<div class="d-flex flex-column formFields">
			<label for="">MODE OF PAYMENT</label> <select id="paymentMode"
				name="paymentMode" required="required"
				class="form-control selectField" style="height: 30px;">
				<option value="">--SELECT PAYMENT MODE--</option>
				<option value="Cash">CASH</option>
			</select>
		</div>
	</div>

	<div class="col-lg-3">
		<div class="d-flex flex-column formFields">
			<label for="">PAYMENT FROM</label> <select id="paymentFrom"
				name="paymentFrom" required="required"
				class="form-control selectField" style="height: 30px;">
				<option value="">--SELECT PAYMENT FROM--</option>
			</select>
		</div>
	</div>

</div>
<div class="row">
	<div class="col-6 text-right mt-3">
		<button type="button" id="payBtn" class="btnStyle"
			style="background-color: #FFA500;">PAY</button>
	</div>
</div>

<script
	src="${pageContext.request.contextPath}/js/account-management/incentivePayment.js"></script>