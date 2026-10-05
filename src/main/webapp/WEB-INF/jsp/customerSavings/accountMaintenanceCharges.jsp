
<div class="pagetitle">
	<h1>Customer Saving</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="home"><i
					class="bi bi-bank text-blue"></i></a></li>
			<li class="breadcrumb-item action">Service Charges Deduction</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">

		<!-- Search Box Title -->
		<nav>
			<ol class="breadcrumb breadcrumb-title">
				<li class="breadcrumb-item action">Search Box</li>
			</ol>
		</nav>

		<!-- By Date -->
		<div class="row">
			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="byDate">By Date</label> <select id="byDate"
						class="form-control selectField" style="height: 45px;">
						<option value="">Select</option>
						<option value="today">Today</option>
						<option value="yesterday">Yesterday</option>
						<option value="last7">Last 7 Days</option>
						<option value="last30">Last 30 Days</option>
						<option value="thisMonth">This Month</option>
						<option value="lastMonth">Last Month</option>
					</select>
				</div>
			</div>
		</div>

		<!-- Search Button -->
		<div class="row">
			<div class="col-12 text-center">
				<button type="button" id="searchServiceChargeBtn" class="btnStyle"
					style="background-color: #FFA500;">Search</button>
			</div>
		</div>

		<!-- Table -->
		<div class="row mt-5" style="margin-bottom: 50px;">
			<div class="col-12">
				<div class="card recent-sales">
					<div class="card-body table-responsive">
						<h5 class="card-title">Account List</h5>
						<table class="table table-borderless datatable overflow-scroll">
							<thead class="table-light">
								<tr style="font-family: 'Poppins', sans-serif;">
									<th>Sr. No.</th>
									<th>Account Number</th>
									<th>Opening Date</th>
									<th>Balance</th>
									<th>SMS Status</th>
									<th>Apply Service Charge</th>
								</tr>
							</thead>
							<tbody id="serviceTableBody"></tbody>
						</table>
					</div>
				</div>
			</div>
		</div>

	</form>
</div>
<script
	src="${pageContext.request.contextPath}/js/customerSavings/ServiceCharge.js"></script>

