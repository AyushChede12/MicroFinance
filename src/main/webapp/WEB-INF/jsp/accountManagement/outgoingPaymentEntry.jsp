
<div class="pagetitle">
	<h1>ACCOUNT MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="home"> <i
					class="bi bi-wallet2"></i>
			</a></li>
			<li class="breadcrumb-item action">OUTGOING PAYMENT ENTRY</li>
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
				<label for="">BRANCH NAME <span class="star">*</span></label> <select
					id="searchBranchName" name="searchBranchName"
					class="form-control selectField" style="height: 30px;">
					<option value="">--SELECT BRANCH NAME--</option>
				</select>
			</div>

		</div>

		<div class="col-lg-4">
			<div class="d-flex flex-column formFields">
				<label for="vehicalNo">START DATE <span class="star">*</span></label>
				<input type="date" name="startDate" id="startDate" />
			</div>
		</div>

		<div class="col-lg-4">
			<div class="d-flex flex-column formFields">
				<label for="vehicalNo"> END DATE <span class="star">*</span></label>
				<input type="date" name="endDate" id="endDate" />
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
					id="entryBranchName" name="entryBranchName"
					class="form-control selectField" style="height: 30px;">
					<option value="">--SELECT BRANCH NAME--</option>
				</select>
			</div>

		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="">VOUCHER ID <span class="star">*</span>
				</label> <input type="text" name="voucherID" id="voucherID"
					placeholder="ENTER VOUCHER ID" disabled />

			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="">DATE OF ENTRY <span class="star">*</span></label> <input
					type="date" name="dateOfEntry" id="dateOfEntry" />
			</div>
		</div>

		<!-- Credit Ledger (Cash/Bank only) -->
		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="creditLedger">CREDIT LEDGER (SOURCE)<span
					class="star">*</span></label> <select id="creditLedger" name="creditLedger"
					class="form-control selectField" style="height: 30px;">
					<option value="">--SELECT CREDIT LEDGER--</option>
					<!-- Populate only Cash/Bank accounts of branch -->
				</select>
			</div>
		</div>
		<!-- Debit Ledger (Destination) -->
		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="debitLedger">DEBIT LEDGER (DESTINATION)<span
					class="star">*</span></label> <select id="debitLedger" name="debitLedger"
					class="form-control selectField" style="height: 30px;">
					<option value="">--SELECT DEBIT LEDGER--</option>
					<!-- Populate Liabilities, Expenses, Equity (no Income) -->
				</select>
			</div>
		</div>


		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="">TRANSFER MODE <span class="star">*</span></label> <select
					id="transferMode" name="transferMode"
					class="form-control selectField" style="height: 30px;"
					onchange="toggleTransferFields(this.value)">
					<option value="">--SELECT TRANSFER MODE--</option>
					<option value="Cash">CASH</option>
					<option value="Bank">BANK</option>
					<option value="UPI">UPI</option>
					<option value="Cheque">CHEQUE</option>
				</select>

			</div>
		</div>

		<!-- Cheque Fields (hidden by default) -->
		<div class="col-lg-3 chequeFields d-none">
			<div class="d-flex flex-column formFields">
				<label for="">CHEQUE NO <span class="star">*</span></label> <input
					type="text" name="chequeNo" id="chequeNo"
					placeholder="ENTER CHEQUE NO" />
			</div>
		</div>

		<div class="col-lg-3 chequeFields d-none">
			<div class="d-flex flex-column formFields">
				<label for="">CHEQUE DATE <span class="star">*</span></label> <input
					type="date" name="chequeDate" id="chequeDate" />
			</div>
		</div>

		<div class="col-lg-3 chequeFields d-none">
			<div class="d-flex flex-column formFields">
				<label for="">BANK NAME <span class="star">*</span></label> <input
					type="text" name="bankName" id="bankName"
					placeholder="ENTER BANK NAME" />
			</div>
		</div>

		<!-- Online Transfer Field (hidden by default) -->
		<div class="col-lg-3 onlineFields d-none">
			<div class="d-flex flex-column formFields">
				<label for="">TRANSACTION REF NO <span class="star">*</span></label>
				<input type="text" name="transactionRef" id="transactionRef"
					placeholder="ENTER TRANSACTION REFERENCE NO" />
			</div>
		</div>


		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="">TRANSACTION AMOUNT <span class="star">*</span></label>
				<input type="number" name="transactionAmount" id="transactionAmount"
					placeholder="ENTER AMOUNT" />

			</div>

		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="">REMARKS</label>
				<textarea name="remarks" id="remarks"
					style="text-transform: uppercase;"
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
				<h5 class="card-title">OUTGOING RESULT</h5>

				<table class="table table-borderless datatable overflow-scroll">
					<thead class="table-light">
						<tr style="font-family: 'Poppins', sans-serif;">
							<th style="white-space: nowrap;">ID</th>
							<th style="white-space: nowrap;">BRANCH</th>
							<th style="white-space: nowrap;">VOUCHER ID</th>
							<th style="white-space: nowrap;">DATE</th>
							<th style="white-space: nowrap;">CREDIT LEDGER</th>
							<th style="white-space: nowrap;">DEBIT LEDGER</th>
							<th style="white-space: nowrap;">MODE</th>
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
	src="${pageContext.request.contextPath}/js/account-management/outgoingPaymentEntry.js"></script>
<script>
	$(document).ready(function() {
		BranchNameDropdown();
		LedgerDropdown()
	});
</script>
