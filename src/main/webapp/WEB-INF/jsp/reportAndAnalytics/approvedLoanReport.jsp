<style>
.formFields input, .formFields select {
	text-transform: uppercase;
}
@media print {
	.pagetitle, #formid, .btnStyle, .modal-footer, .no-print {
		display: none !important;
	}
}
</style>

<div class="pagetitle no-print">
	<h1>REPORTS & ANALYTICS</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i class="bi bi-file-earmark-text"></i></a></li>
			<li class="breadcrumb-item action">APPROVED LOAN REPORT</li>
		</ol>
	</nav>
</div>

<div class="no-print">
	<form id="formid" autocomplete="off">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH FILTERS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 20px;">
						<label for="branchName1">BRANCH</label> 
						<select id="branchName1" name="branchName" class="form-control selectField">
							<option value="">ALL BRANCHES</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="fromDate">FROM DATE :</label> 
						<input type="date" name="fromDate" id="fromDate" placeholder="ENTER FROM DATE" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="toDate">TO DATE :</label> 
						<input type="date" name="toDate" id="toDate" placeholder="ENTER TO DATE" style="text-transform: uppercase;" />
					</div>
				</div>
			</div>

			<div class="row mt-3 mb-2">
				<div class="col-12 text-start">
					<button type="button" id="findBtn" class="btn btn-dark">
						<i class="bi bi-search"></i> FIND
					</button>
					<button type="button" id="resetBtn" class="btn btn-secondary ms-2">
						<i class="bi bi-arrow-counterclockwise"></i> RESET
					</button>
					<button type="button" id="printFullReportBtn" class="btn btn-primary ms-2">
						<i class="bi bi-printer"></i> PRINT FULL REPORT
					</button>
				</div>
			</div>
		</div>
	</form>
</div>

<div class="row mt-4">
	<div class="col-12">
		<div class="card recent-sales">
			<div class="card-body table-responsive">
				<h5 class="card-title text-uppercase" style="font-weight: 700;">APPROVED LOAN APPLICATIONS</h5>

				<div style="overflow-x: auto; white-space: nowrap;">
					<table class="table table-bordered table-hover datatable align-middle">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">SR NO.</th>
								<th scope="col">LOAN ID</th>
								<th scope="col">PLAN NAME</th>
								<th scope="col">INTEREST TYPE</th>
								<th scope="col">SANCTION DATE</th>
								<th scope="col">LOAN AMOUNT</th>
								<th scope="col">CONTACT NUMBER</th>
								<th scope="col">BRANCH</th>
								<th scope="col">APPROVAL STATUS</th>
								<th scope="col" class="no-print">PRINT</th>
							</tr>
						</thead>
						<tbody>
							<tr><td colspan="10" class="text-center text-muted">LOADING APPROVED LOANS...</td></tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Print Modal -->
<div class="modal fade" id="printModal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog modal-lg modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header bg-primary text-white">
				<h5 class="modal-title text-uppercase"><i class="bi bi-printer me-2"></i>LOAN SANCTION & APPLICATION DOSSIER</h5>
				<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
			</div>
			<div class="modal-body p-4" id="modalDataContainer">
			</div>
			<div class="modal-footer">
				<button type="button" id="printBtn" class="btn btn-success text-uppercase">
					<i class="bi bi-printer"></i> PRINT SANCTION LETTER
				</button>
				<button type="button" class="btn btn-secondary text-uppercase" data-bs-dismiss="modal">CLOSE</button>
			</div>
		</div>
	</div>
</div>

<script src="${pageContext.request.contextPath}/js/ReportsAndAnalytics/ReportPrintUtil.js"></script>
<script src="${pageContext.request.contextPath}/js/ReportsAndAnalytics/ApprovedLoanReport.js"></script>
