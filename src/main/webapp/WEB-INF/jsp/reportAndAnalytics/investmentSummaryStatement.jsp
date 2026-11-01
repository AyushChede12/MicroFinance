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
			<li class="breadcrumb-item action">INVESTMENT SUMMARY STATEMENT</li>
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
						<label for="branch">BRANCH</label> 
						<select id="branch" name="branch" class="form-control selectField" style="height: 30px;">
							<option value="">ALL BRANCHES</option>
						</select>
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
					<button type="button" id="searchBtn" class="btn btn-dark">
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
				<h5 class="card-title text-uppercase" style="font-weight: 700;">BRANCH INVESTMENT SUMMARY STATEMENT</h5>

				<div style="overflow-x: auto; white-space: nowrap;">
					<table class="table table-bordered table-hover datatable align-middle">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">SR NO.</th>
								<th scope="col">BRANCH CODE</th>
								<th scope="col">BRANCH NAME</th>
								<th scope="col">NEW BUSINESS (₹)</th>
								<th scope="col">FEES & CHARGES (₹)</th>
								<th scope="col">RENEWAL BUSINESS (₹)</th>
								<th scope="col">LATE PENALTY (₹)</th>
								<th scope="col">TOTAL COLLECTION (₹)</th>
								<th scope="col" class="no-print">ACTION</th>
							</tr>
						</thead>
						<tbody id="summaryTableBody">
							<tr><td colspan="9" class="text-center text-muted">LOADING INVESTMENT SUMMARY...</td></tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="${pageContext.request.contextPath}/js/ReportsAndAnalytics/ReportPrintUtil.js"></script>
<script src="${pageContext.request.contextPath}/js/ReportsAndAnalytics/InvestmentSummaryStatement.js"></script>
