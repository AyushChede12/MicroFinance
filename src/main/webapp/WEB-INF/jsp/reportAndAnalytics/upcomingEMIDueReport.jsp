
<div class="pagetitle">
	<h1>REPORTS & ANALYTICS</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-file-earmark-text"></i>
			</a></li>
			<li class="breadcrumb-item action">UPCOMING EMI DUE REPORT</li>
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
						<label for="loanPlanName">PLAN NAME</label> <select
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
							style="text-transform: uppercase;" />
					</div>
				</div>

			</div>

			<div class="row">
				<div class="col-4 text-start mt-3">
					<button id="findBtn" class="btn btn-dark">FIND</button>
				</div>
			</div>

		</div>

	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">UPCOMING EMI DUE REPORT</h5>

					<h6 class="card-title" style="text-align: center; color: black;">
						LOAN EMI DUE REPORT</h6>



					<div style="overflow-x: auto; white-space: nowrap;">
						<table class="table table-borderless datatable">
							<thead class="table-light">
								<tr style="font-family: 'Poppins', sans-serif;">
									<th scope="col">SN</th>
									<th scope="col">LOAN ID</th>
									<th scope="col">CUSTOMER CODE</th>
									<th scope="col">CUSTOMER NAME</th>
									<th scope="col">BRANCH</th>
									<th scope="col">LOAN TYPE</th>
									<th scope="col">MOBILE NO</th>
									<th scope="col">LOAN AMOUNT</th>
									<th scope="col">EMI AMOUNT</th>
									<th scope="col">DUE DATE</th>
									<th scope="col">OUTSTANDING AMOUNT</th>
									<th scope="col">STATUS</th>
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
	src="${pageContext.request.contextPath}/js/ReportsAndAnalytics/upcomingLoanReport.js"></script>
	