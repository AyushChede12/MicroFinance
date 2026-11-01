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
			<li class="breadcrumb-item action">FINANCIAL CONSULTANT TEAM COLLECTION REPORT</li>
		</ol>
	</nav>
</div>

<div class="no-print">
	<form id="formid" autocomplete="off">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH TEAM COLLECTION</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 20px;">
						<label for="advisorCode">FINANCIAL CONSULTANT CODE <span class="star text-danger">*</span></label> 
						<input type="text" id="advisorCode" name="advisorCode" class="form-control selectField" style="height: 30px; text-transform: uppercase;" placeholder="ENTER FINANCIAL CODE">
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="fDate">FROM DATE :</label> 
						<input type="date" name="fDate" id="fDate" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="tDate">TO DATE :</label> 
						<input type="date" name="tDate" id="tDate" style="text-transform: uppercase;" />
					</div>
				</div>
			</div>

			<div class="row mt-3 mb-2">
				<div class="col-12 text-start">
					<button id="findBtn" type="button" class="btn btn-dark">
						<i class="bi bi-search"></i> FIND COLLECTION
					</button>
					<button id="resetBtn" type="button" class="btn btn-secondary ms-2">
						<i class="bi bi-arrow-counterclockwise"></i> RESET
					</button>
					<button id="printFullReportBtn" type="button" class="btn btn-primary ms-2">
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
				<h5 class="card-title text-uppercase" style="font-weight: 700;">FINANCIAL CONSULTANT TEAM COLLECTION RECORDS</h5>

				<div style="overflow-x: auto; white-space: nowrap;">
					<table class="table table-bordered table-hover datatable align-middle">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">SR NO.</th>
								<th scope="col">TEAM / SELF</th>
								<th scope="col">DATE</th>
								<th scope="col">POLICY NO.</th>
								<th scope="col">INST NO.</th>
								<th scope="col">APPLICANT NAME</th>
								<th scope="col">PLAN CODE</th>
								<th scope="col">ADVISOR CODE</th>
								<th scope="col">COLLECTED AMOUNT</th>
								<th scope="col">CLEARED AMOUNT</th>
								<th scope="col">UNCLEARED AMOUNT</th>
								<th scope="col">PAY MODE</th>
								<th scope="col">CHEQUE NO.</th>
							</tr>
						</thead>
						<tbody id="collectionTableBody">
							<tr><td colspan="13" class="text-center text-muted">ENTER FINANCIAL CONSULTANT CODE TO VIEW COLLECTION RECORDS</td></tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="${pageContext.request.contextPath}/js/ReportsAndAnalytics/ReportPrintUtil.js"></script>
<script src="${pageContext.request.contextPath}/js/ReportsAndAnalytics/FinancialConsultantTeamCollectionReport.js"></script>
