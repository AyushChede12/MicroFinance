
<div class="pagetitle">
	<h1>ACCOUNT MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="home"> <i
					class="bi bi-wallet2"></i>
			</a></li>
			<li class="breadcrumb-item action">DAILY TRANSACTION BOOK</li>
		</ol>
	</nav>
</div>

<form id="formid">
	<div>
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH INFORMATION</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">BRANCH NAME</label> <select id="branchName"
							name="branchName" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">--SELECT BRANCH--</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">CHOOSE LEDGER</label> <select id="chooseLedger"
							name="chooseLedger" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">--SELECT LEDGER--</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">START DATE</label> <input type="date"
							name="startDate" id="startDate" required="required" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">END DATE</label> <input type="date"
							name="endDate" id="endDate" required="required" />
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-12 text-center mt-3">
			<button type="button" id="serachBtn" class="btnStyle"
				style="background-color: #FFA500;">SEARCH</button>
		</div>
	</div>
</form>

<div class="row mt-4">
	<div class="col-12">

		<div class="card">

			<div
				class="card-header d-flex justify-content-between align-items-center">
				<h5 class="mb-0">SEARCH RESULT</h5>

				<div class="d-flex align-items-center gap-2">
					<!-- Search Input -->
					<input type="text" id="transactionSearch"
						class="form-control form-control-sm"
						placeholder="Search Customer Name..."
						style="width: 250px; text-transform: uppercase;">
				</div>
			</div>

			<div class="card-body table-responsive">

				<table
					class="table table-bordered datatable table-striped table-hover">
					<thead class="table-light">
						<tr>
							<th style="text-align: center;">SR NO</th>
							<th style="text-align: center;">DATE</th>
							<th style="text-align: center;">TRANSACTION ID</th>
							<th style="text-align: center;">LEDGER</th>
							<th style="text-align: center;">DESCRIPTION</th>
							<th style="text-align: center;" class="text-end">DEBIT</th>
							<th style="text-align: center;" class="text-end">CREDIT</th>
							<th style="text-align: center;" class="text-end">BALANCE</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<td colspan="8" class="text-center text-muted">NO DATA
								AVAILABLE</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<style>
.selectField {
	height: 38px;
}

table th, table td {
	vertical-align: middle !important;
}

.table-hover tbody tr:hover {
	background-color: #f5f5f5;
}

.text-end {
	text-align: right;
}
</style>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
<script
	src="${pageContext.request.contextPath}/js/account-management/dailyTransactionBook.js"></script>