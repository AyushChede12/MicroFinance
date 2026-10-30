<div class="pagetitle">
	<h1>REQUEST APPROVAL</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-check-circle"></i>
			</a></li>
			<li class="breadcrumb-item action">APPROVE MANUAL PAYMENT ENTRIES</li>
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
				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="branchName">BRANCH NAME</label> <select id="branchName"
							name="branchName" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT BRANCH</option>
						</select>
					</div>
				</div>

				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="fromDate">DATE FROM</label> <input type="date"
							name="fromDate" id="fromDate" required="required"
							placeholder="ENTER FROM DATE" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="toDate">DATE TO</label> <input type="date"
							name="toDate" id="toDate" required="required"
							placeholder="ENTER TO DATE" style="text-transform: uppercase;" />
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-12 text-center mt-3">
				<button id="findBtn" class="btnStyle"
					style="background-color: #FFA500;">FIND</button>
			</div>
		</div>
	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">
				<div class="card-body table-responsive">
					<h5 class="card-title">SEARCH RESULT</h5>

					<div style="overflow-x: auto; white-space: nowrap;">
						<table class="table table-borderless datatable">
							<thead class="table-light">
								<tr style="font-family: 'Poppins', sans-serif;">
									<th scope="col"><input type="checkbox" id="selectAll" /></th>
									<th scope="col">SR NO.</th>
									<th scope="col">VOUCHER ID</th>
									<th scope="col">DATE OF ENTRY</th>
									<th scope="col">BRANCH NAME</th>
									<th scope="col">CREDIT LEDGER</th>
									<th scope="col">DEBIT LEDGER</th>
									<th scope="col">TRANSACTION AMOUNT</th>
									<th scope="col">TRANSFER MODE</th>
									<th scope="col">BANK NAME</th>
									<th scope="col">CHEQUE / REF NO.</th>
									<th scope="col">STATUS</th>
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

	<div class="row">
		<div class="col-12 text-center mt-3">
			<button id="approvedBtn" class="btnStyle"
				style="background-color: #FFA500;">APPROVE</button>
		</div>
	</div>
</div>

<script src="./js/adminscript.js"></script>
<script src="./js/RequestApproval/ApproveManualPaymentEntries.js"></script>
