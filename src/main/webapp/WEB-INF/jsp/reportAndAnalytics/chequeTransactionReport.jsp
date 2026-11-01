<style>
.formFields input, .formFields select {
	text-transform: uppercase;
}
@media print {
	.pagetitle, #formid, .btnStyle, .no-print {
		display: none !important;
	}
}
</style>

<div class="pagetitle no-print">
	<h1>REPORTS & ANALYTICS</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i class="bi bi-file-earmark-text"></i></a></li>
			<li class="breadcrumb-item action">CHEQUE TRANSACTION REPORT</li>
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
						<label for="type">CHEQUE TYPE</label>
						<select id="type" name="type" class="form-control selectField" style="height: 30px;">
							<option value="">ALL TYPES</option>
							<option value="ISSUED">CHEQUE ISSUED</option>
							<option value="RECEIVED">CHEQUE RECEIVED</option>
							<option value="CLEARED">CLEARED CHEQUE</option>
							<option value="BOUNCED">BOUNCED CHEQUE</option>
							<option value="PENDING">PENDING CHEQUE</option>
							<option value="CANCELLED">CANCELLED CHEQUE</option>
							<option value="TRANSFERRED">TRANSFERRED CHEQUE</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 20px;">
						<label for="branchName">BRANCH</label> 
						<select id="branchName" name="branchName" class="form-control selectField" style="height: 30px;">
							<option value="">ALL BRANCHES</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="fDate">FROM DATE :</label> 
						<input type="date" name="fDate" id="fDate" placeholder="ENTER FROM DATE" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="tDate">TO DATE :</label> 
						<input type="date" name="tDate" id="tDate" placeholder="ENTER TO DATE" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 20px;">
						<label for="chequeNo">CHEQUE NUMBER</label> 
						<input type="text" id="chequeNo" name="chequeNo" style="height: 30px; text-transform: uppercase;" placeholder="ENTER CHEQUE NO.">
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
				<h5 class="card-title text-uppercase" style="font-weight: 700;">CHEQUE TRANSACTION DETAILS</h5>

				<div style="overflow-x: auto; white-space: nowrap;">
					<table class="table table-bordered table-hover datatable align-middle" style="text-align: center;">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">SR. NO</th>
								<th scope="col">ACCOUNT HOLDER NAME</th>
								<th scope="col">TRANSACTION DATE</th>
								<th scope="col">CHEQUE NUMBER</th>
								<th scope="col">BRANCH</th>
								<th scope="col">SOURCE MODULE</th>
								<th scope="col">CHEQUE STATUS</th>
								<th scope="col" class="no-print">PRINT</th>
							</tr>
						</thead>
						<tbody>
							<tr><td colspan="8" class="text-center text-muted">LOADING CHEQUE TRANSACTIONS...</td></tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<script>
	var contextPath = "${pageContext.request.contextPath}";
</script>
<script src="${pageContext.request.contextPath}/js/ReportsAndAnalytics/ReportPrintUtil.js"></script>
<script src="${pageContext.request.contextPath}/js/ReportsAndAnalytics/ChequeTransactionReport.js"></script>
