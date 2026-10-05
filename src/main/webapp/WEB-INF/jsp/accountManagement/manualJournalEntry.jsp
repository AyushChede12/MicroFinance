
<div class="pagetitle">
	<h1>ACCOUNT MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="home"> <i
					class="bi bi-wallet2"></i>
			</a></li>
			<li class="breadcrumb-item action">MANUAL JOURNAL ENTRY</li>
		</ol>
	</nav>
</div>


<form id="searchForm">
	<nav>
		<ol class="breadcrumb breadcrumb-title">
			<li class="breadcrumb-item action">SEARCH BOX</li>
		</ol>
	</nav>
	<div class="row">
		<div class="col-lg-4">
			<div class="d-flex flex-column formFields">
				<label for=""> BRANCH NAME <span class="star">*</span></label> <select
					id="searchBranchName" name="searchBranchName" required="required"
					class="form-control selectField" style="height: 30px;">
					<option value="">--SELECT BRANCH NAME--</option>
				</select>
			</div>
		</div>

		<div class="col-lg-4">
			<div class="d-flex flex-column formFields">
				<label for="vehicalNo">START DATE <span class="star">*</span></label>
				<input type="date" name="startDate" id="startDate"
					required="required" />
			</div>
		</div>

		<div class="col-lg-4">
			<div class="d-flex flex-column formFields">
				<label for="vehicalNo">END DATE <span class="star">*</span></label>
				<input type="date" name="endDate" id="endDate" required="required" />
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-12 text-center mt-3">
			<button id="searchBtn" class="btnStyle"
				style="background-color: #FFA500;">SEARCH</button>
		</div>
	</div>
</form>

<form id="formid">

	<div class="row">
		<div class="col-lg-12">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action mt-3">ENTRY DETAILS</li>
				</ol>
			</nav>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="">BRANCH NAME <span class="star">*</span></label> <select
					id="entryBranchName" name="entryBranchName" required="required"
					class="form-control selectField" style="height: 30px;">
					<option value="">--SELECT BRANCH NAME--</option>
				</select>
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="">VOUCHER ID <span class="star">*</span></label> <input
					type="text" name="voucherID" id="voucherID" required="required"
					placeholder="ENTER VOUCHER ID" disabled />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="">DATE OF ENTRY <span class="star">*</span></label> <input
					type="date" name="dateOfEntry" id="dateOfEntry" required="required" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="">CREDIT LEDGER (SOURCE) <span class="star">*</span></label>
				<select id="creditLedger" name="creditLedger" required="required"
					class="form-control selectField" style="height: 30px;">
					<option value="">--SELECT CREDIT LEDGER--</option>
				</select>
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="">DEBIT LEDGER (DESTINATION) <span class="star">*</span></label>
				<select id="debitLedger" name="debitLedger" required="required"
					class="form-control selectField" style="height: 30px;">
					<option value="">--SELECT DEBIT LEDGER--</option>
				</select>
			</div>
		</div>


		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="">TRANSACTION AMOUNT <span class="star">*</span></label>
				<input type="number" name="transactionAmount" id="transactionAmount"
					required="required" placeholder="ENTER AMOUNT" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="">REMARKS</label>
				<textarea name="remarks" id="remarks" style="text-transform: uppercase;"
					style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"></textarea>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-12 text-center mt-3">
			<button id="saveBtn" class="btnStyle"
				style="background-color: #FFA500;">SAVE</button>
			<button type="button" id="toggleBtn" class="btnStyle bg-primary"
				onclick="showTableData()">SHOW</button>
		</div>
	</div>

</form>

<div class="row mt-5">
	<div class="col-12">
		<div class="card recent-sales">

			<div class="card-body table-responsive">
				<h5 class="card-title">MANUAL JOURNAL ENTRY RESULT</h5>

				<table class="table table-borderless datatable overflow-scroll">
					<thead class="table-light">
						<tr style="font-family: 'Poppins', sans-serif;">
							<th style="white-space: nowrap;">ID.</th>
							<th style="white-space: nowrap;">BRANCH</th>
							<th style="white-space: nowrap;">VOUCHER ID</th>
							<th style="white-space: nowrap;">DATE</th>
							<th style="white-space: nowrap;">CREDIT LEDGER</th>
							<th style="white-space: nowrap;">DEBIT LEDGER</th>
							<th style="white-space: nowrap;">AMOUNT</th>
							<th style="white-space: nowrap;">REMARKS</th>
							<th style="white-space: nowrap;">VIEW</th>
							<th style="white-space: nowrap;">DELETE</th>
						</tr>
					</thead>
					<tbody id="tableBody">
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<script
	src="${pageContext.request.contextPath}/js/account-management/manualJournalEntry.js"></script>
<script>
	$(document).ready(function() {
		BranchNameDropdown();
		LedgerDropdown()
	});
</script>
