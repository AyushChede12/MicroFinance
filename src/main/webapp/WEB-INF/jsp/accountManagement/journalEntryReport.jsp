
<div class="pagetitle">
	<h1>ACCOUNT MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="home"> <i
					class="bi bi-wallet2"></i>
			</a></li>
			<li class="breadcrumb-item action">JOURNAL ENTRY REPORT</li>
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
					<label>BRANCH NAME</label> <select id="branchName"
						name="branchName" required class="form-control selectField"
						style="height: 30px;">
						<option value="">--SELECT BRANCH--</option>
					</select>
				</div>

				<div class="col-lg-3">
					<label>VOUCHER TYPE</label> <select id="voucherType"
						name="voucherType" required class="form-control selectField"
						style="height: 30px;">
						<option value="">--SELECT TYPE--</option>
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
		</div>
</div>

</form>

<div class="row mt-5">
	<div class="col-12">
		<div class="card recent-sales">

			<div class="card-body table-responsive">
				<h5 class="card-title">SEARCH RESULT</h5>

				<table class="table table-borderless datatable overflow-scroll">
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
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<script
	src="${pageContext.request.contextPath}/js/account-management/journalEntryReport.js"></script>
