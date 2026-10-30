
<div class="pagetitle">
	<h1>REQUEST APPROVAL</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-check-circle"></i>
			</a></li>
			<li class="breadcrumb-item action">APPROVE SAVING TRANSACTIONS </li>
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
						<label for="">BRANCH NAME</label> <select id="branchName"
							name="branchName" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT BRANCH NAME</option>
						</select>
					</div>
				</div>

				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">DATE FROM</label> <input type="date"
							name="fromDate" id="fromDate" required="required"
							placeholder="ENTER FROM DATE" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">DATE TO</label> <input type="date"
							name="toDate" id="toDate" required="required"
							placeholder="ENTER TO DATE" style="text-transform: uppercase;" />
					</div>
				</div>
			</div>
		</div>
</div>

<div class="row">
	<div class="col-12 text-center mt-3">
		<button id="findsavingTransactionBtn" class="btnStyle"
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
								<th></th>
								<th scope="col">SR NO.</th>
								<th scope="col">ACCOUNT NUMBER</th>
								<th scope="col">CUSTOMER NAME</th>
								<th scope="col">OPENING DATE</th>
								<th scope="col">PHONE NO.</th>
								<th scope="col">CUSTOMER CODE</th>
								<th scope="col">BRANCH NAME</th>
								<th scope="col">OPENING AMOUNT</th>
								<th scope="col">MODE OF PAYMENT</th>
							</tr>
						</thead>
						<tbody id="searchSavingTransaction">
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="row">
	<div class="col-12 text-center mt-3" style="justify-content: end">
		<button id="approveSavingTransactionBtn" class="btnStyle"
			style="background-color: #FFA500;">APPROVE</button>
	</div>
</div>
</div>

<!-- <script src="js/chartScript.js"></script> -->
<script src="./js/adminscript.js"></script>
<script src="./js/RequestApproval/ApproveSavingTransaction.js"></script>
<script>
	$(document).ready(function() {
		searchInTheSavingTransaction();
		branchNameDropdown();

		// Button click filter
		$('#findsavingTransactionBtn').on('click', function(e) {
			e.preventDefault(); // Prevent form submission
			filterByBranchName();
		});

		// Button click Approve
		$('#approveSavingTransactionBtn').on('click', function(e) {
			e.preventDefault();
			const selectedIds = [];
			$('.member-checkbox:checked').each(function() {
				const id = $(this).val();
				if (id) selectedIds.push(id);
			});

			if (selectedIds.length === 0) {
				alert("PLEASE SELECT AT LEAST ONE ROW TO APPROVE.");
				return;
			}

			const requests = selectedIds.map(function(id) {
				return $.ajax({
					url: "api/requestapproval/approvedSavingTransactionData",
					type: "POST",
					data: { id: id, isApproved: true }
				});
			});

			$.when.apply($, requests)
				.done(function() {
					alert("SAVING TRANSACTIONS APPROVED SUCCESSFULLY!");
					location.reload();
				})
				.fail(function(xhr) {
					console.error("ERROR APPROVING SAVING TRANSACTIONS:", xhr);
					alert("FAILED TO APPROVE SELECTED TRANSACTIONS.");
				});
		});

	});
</script>
