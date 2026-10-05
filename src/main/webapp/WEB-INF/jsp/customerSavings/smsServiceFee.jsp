
<div class="pagetitle">
	<h1>SAVING / CURRENT ACCOUNT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="home"><i
					class="bi bi-bank text-blue"></i></a></li>
			<li class="breadcrumb-item action">SMS SERVICE FEE</li>
		</ol>
	</nav>
</div>

<form id="currentForm">

	<!-- Search Box Title -->
	<nav>
		<ol class="breadcrumb breadcrumb-title">
			<li class="breadcrumb-item action">SEARCH DATA</li>
		</ol>
	</nav>

	<div class="row">

		<!-- BY DATE -->
		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>BY DATE</label>
				<select id="byDate" class="form-control selectField" style="height: 45px;">
					<option value="">--SELECT DURATION--</option>
					<option value="today">TODAY</option>
					<option value="yesterday">YESTERDAY</option>
					<option value="last7">LAST 7 DAYS</option>
					<option value="last30">LAST 30 DAYS</option>
					<option value="lastMonth">LAST MONTH</option>
				</select>
			</div>
		</div>

		<!-- ACCOUNT TYPE -->
		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>ACCOUNT TYPE</label>
				<select id="accountType" class="form-control selectField" style="height: 45px;">
					<option value="">--SELECT ACCOUNT TYPE--</option>
					<option value="SAVINGS">SAVINGS</option>
					<option value="CURRENT">CURRENT</option>
				</select>
			</div>
		</div>

		<!-- CHARGE TYPE -->
		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>CHARGE TYPE</label>
				<select id="chargeType" class="form-control selectField" style="height: 45px;">
					<option value="">--SELECT CHARGE TYPE--</option>
					<option value="SMS">SMS CHARGE</option>
					<option value="SERVICE">SERVICE CHARGE</option>
					<option value="ATM">ATM CHARGE</option>
				</select>
			</div>
		</div>

		<!-- AMOUNT -->
		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label>AMOUNT</label>
				<input type="number" id="amount" name="amount"
					class="form-control"
					placeholder="ENTER AMOUNT"
					min="0" step="0.01">
			</div>
		</div>

	</div>

	<!-- SEARCH BUTTON -->
	<div class="row">
		<div class="col-12 d-flex justify-content-center">
			<button type="button" id="searchBtn" class="btnStyle"
				style="background-color:#FFA500;">
				SEARCH
			</button>
		</div>
	</div>

	<!-- TABLE -->
	<div class="row mt-5 mb-5">
		<div class="col-12">
			<div class="card recent-sales">
				<div class="card-body table-responsive">
					<h5 class="card-title">SMS CHARGES ACCOUNT RECORDS</h5>
					<table class="table table-borderless datatable">
						<thead class="table-light">
							<tr>
								<th></th>
								<th>SR. NO.</th>
								<th>ACCOUNT NUMBER</th>
								<th>OPENING DATE</th>
								<th>BALANCE</th>
								<th>SMS STATUS</th>
							</tr>
						</thead>
						<tbody id="tbody"></tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
<!-- APPLY BUTTON -->
<div class="row mt-3">
    <div class="col-12 d-flex justify-content-center">
        <button type="button" id="applyBtn" class="btnStyle"
            style="background-color:#28a745;">
            APPLY
        </button>
    </div>
</div>


</form>

</div>
<script src="jquery.min.js"></script>
<script src="${pageContext.request.contextPath}/js/customerSavings/SMSServiceFee.js"></script>
	
	
