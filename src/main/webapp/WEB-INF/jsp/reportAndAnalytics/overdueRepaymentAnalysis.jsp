
<div class="pagetitle">
	<h1>REPORTS & ANALYTICS</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-file-earmark-text"></i>
			</a></li>
			<li class="breadcrumb-item action">OVERDUE RE-PAYMENT ANALYSIS</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">FIND BOX</li>
				</ol>
			</nav>
			<div class="row">


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px;">
						<label for="branchName">BRANCH </label> <select id="branchName1"
							name="branchName" required="required"
							class="form-control selectField" style="height: 30px;">
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px;">
						<label for="loanPlanName">PLAN NAME </label> <select
							id="loanPlanName" name="loanPlanName" required="required"
							class="form-control selectField" style="height: 30px;">
						</select>
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="financialCode">FINANCIAL CODE </label> <input
							type="text" name="financialCode" id="financialCode"
							required="required" placeholder="ENTER FINANCIAL CODE"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="toDate">TO DATE</label> <input type="date"
							name="toDate" id="toDate" required="required"
							placeholder="ENTER TDATE" style="text-transform: uppercase;" />
					</div>
				</div>

			</div>

			<div class="row">
				<div class="col-4 text-start mt-3">
					<button type="button" id="findBtn" class="btn btn-dark">FIND</button>
				</div>
			</div>

		</div>

	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">LOAN OVERDUE REPORT</h5>

					<h6 class="card-title" style="text-align: center; color: black;">
						OUTSTANDING EMI REPORT </h6>



					<div style="overflow-x: auto; white-space: nowrap;">
						<table class="table table-borderless datatable">
							<thead class="table-light">
								<tr style="font-family: 'Poppins', sans-serif;">
									<th scope="col">SN</th>
									<th scope="col">LOAN ID</th>
									<th scope="col">Member Code</th>
									<th scope="col">Member Name</th>
									<th scope="col">Loan Date</th>
									<th scope="col">Branch</th>
									<th scope="col">Mobile No.</th>
									<th scope="col">Loan Name</th>
									<th scope="col">Total Paid</th>
									<th scope="col">Over Due</th>
									<th scope="col">Current Due</th>
									<th scope="col">Print</th>
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

</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script
	src="${pageContext.request.contextPath}/js/ReportsAndAnalytics/overduePayment.js"></script>
	