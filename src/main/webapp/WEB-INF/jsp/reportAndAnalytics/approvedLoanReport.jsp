
<div class="pagetitle">
	<h1>REPORTS & ANALYTICS</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-file-earmark-text"></i>
			</a></li>
			<li class="breadcrumb-item action">APPROVED LOAN REPORT</li>
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
						<label for="branchName1">BRANCH </label> <select id="branchName1"
							name="branchName" required="required"
							class="form-control selectField">
							<option value="">SELECT BRANCH</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">FROM DATE :</label> <input type="date"
							name="fromDate" id="fromDate" required="required"
							placeholder="ENTER FDATE" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">TO DATE :</label> <input type="date" name="toDate"
							id="toDate" required="required" placeholder="ENTER TDATE"
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
					<h5 class="card-title">FIND RESULT</h5>

					<h6 class="card-title" style="text-align: center; color: black;">
						APPROVED LOAN</h6>



					<div style="overflow-x: auto; white-space: nowrap;">
						<table class="table table-borderless datatable">
							<thead class="table-light">
								<tr style="font-family: 'Poppins', sans-serif;">
									<th scope="col">SN</th>
									<th scope="col">LOAN ID</th>
									<th scope="col">LOAN NAME</th>
									<th scope="col">INTEREST TYPE</th>
									<th scope="col">LOAN DATE</th>
									<th scope="col">LOAN AMOUNT</th>
									<th scope="col">CONTACT NO.</th>
									<th scope="col">BRANCH NAME</th>
									<th scope="col">APPROVAL STATUS</th>
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

</div>


<!-- Modal -->
<div class="modal fade" id="printModal" tabindex="-1"
	aria-labelledby="printModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-xl modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="printModalLabel">Loan Details</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal"
					aria-label="Close"></button>
			</div>
			<div class="modal-body" id="modalDataContainer">
				<!-- Policy details will be populated here -->
			</div>
			<div class="modal-footer">
				<button type="button" id="printBtn" class="btn btn-primary">Print</button>
				<button type="button" id="downloadBtn" class="btn btn-success">Download
					PDF</button>
				<button type="button" class="btn btn-secondary"
					data-bs-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script
	src="${pageContext.request.contextPath}/js/ReportsAndAnalytics/ApprovedLoanReport.js"></script>
	
