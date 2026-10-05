
<div class="pagetitle">
	<h1>ACCOUNT MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="home"> <i
					class="bi bi-wallet2"></i>
			</a></li>
			<li class="breadcrumb-item action">LEDGER SUMMARY REPORT</li>
		</ol>
	</nav>
</div>

<div>
	<form id="ledgerSummaryForm">

		<nav>
			<ol class="breadcrumb breadcrumb-title">
				<li class="breadcrumb-item action">SEARCH INFORMATION</li>
			</ol>
		</nav>
		<div class="row">
			<div class="col-lg-3">
				<label>BRANCH NAME</label> <select id="branchName" name="branchName"
					required class="form-control selectField" style="height: 30px;">
					<option value="">--SELECT BRANCH NAME--</option>
				</select>
			</div>

			<div class="col-lg-3">
				<label>LEDGER NAME</label> <select id="ledgerName" name="ledgerName"
					required class="form-control selectField" style="height: 30px;">
					<option value="">--SELECT LEDGER--</option>
				</select>
			</div>

			<div class="col-lg-3">
				<label>START DATE</label> <input type="date" name="startDate"
					id="startDate" class="form-control" required />
			</div>

			<div class="col-lg-3">
				<label>END DATE</label> <input type="date" name="endDate"
					id="endDate" class="form-control" required />
			</div>
		</div>

		<div class="row mt-3">
			<div class="col text-center">
				<button type="submit" id="viewBtn"
					class="btn btn-warning text-white px-4">VIEW</button>
			</div>
		</div>
	</form>
</div>
<!-- Ledger Summary Table -->
<div class="row mt-5">
	<div class="col-12">
		<div id="summaryInfo" class="mb-3"></div>

		<div class="card recent-sales">
			<div class="card-body table-responsive">
				<table class="table table-borderless datatable">
					<thead class="table-light">
						<tr>
							<th>DATE</th>
							<th>VOUCHER ID</th>
							<th>REMARKS</th>
							<th>ACCOUNT CODE</th>
							<th>DEBIT</th>
							<th>CREDIT</th>
						</tr>
					</thead>
					<tbody id="ledgerSummaryBody">
						<!-- Data rows will be inserted here -->
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<script
	src="${pageContext.request.contextPath}/js/account-management/ledgerSummaryReport.js"></script>
<script>
	$(document).ready(function() {
		BranchNameDropdown();
		LedgerDropdown()

	});
</script>
