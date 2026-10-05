
<div class="pagetitle">
	<h1>REPORTS & ANALYTICS</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-file-earmark-text"></i>
			</a></li>
			<li class="breadcrumb-item action">MATURITY STATUS REPORT </li>
		</ol>
	</nav>
</div>
<div>
	<nav>
		<ol class="breadcrumb breadcrumb-title">
			<li class="breadcrumb-item action">FIND BOX</li>
		</ol>
	</nav>
	<div class="row">
		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="branchName">BRANCH:</label> <select id="branchName"
					name="branchName" required="required"
					class="form-control selectField mb-4" style="height: 30px;">
				</select>
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="fromDate">FROM DATE</label> <input type="date"
					name="fromDate" id="fromDate" required="required"
					style="text-transform: uppercase;" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="toDate">TO DATE</label> <input type="date" name="toDate"
					id="toDate" required="required" style="text-transform: uppercase;" />
			</div>
		</div>

	</div>
</div>
<div class="row">
	<div class="col-4 text-start mt-3">
		<button type="button" id="findBtn" class="btn btn-dark">FIND</button>
	</div>
</div>

<div class="row mt-5">
	<div class="col-12">
		<div class="card recent-sales">
			<div class="card-body table-responsive">
				<div class="d-flex justify-content-between align-items-center">
					<h5 class="card-title">
						MATURITY STATUS REPORT  <span>| TABLE VIEW</span>
					</h5>
				</div>
				<div style="overflow-x: auto; white-space: nowrap;">
					<table class="table table-borderless datatable">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">SR NO</th>
								<th scope="col">CUSTOMER NAME</th>
								<th scope="col">BRANCH NAME</th>
								<th scope="col">POLICY CODE</th>
								<th scope="col">POLICY AMOUNT</th>
								<th scope="col">MATURITY DATE</th>
								<th scope="col">MATURITY AMOUNT</th>
								<th scope="col">TOTAL DEPOSIT</th>
								<th scope="col">SCHEME NAME</th>
								<th scope="col">PRINT</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script
	src="${pageContext.request.contextPath}/js/ReportsAndAnalytics/maturityStatus.js"></script>
	
