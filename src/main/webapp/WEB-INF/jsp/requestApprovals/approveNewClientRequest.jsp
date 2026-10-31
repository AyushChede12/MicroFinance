
<div class="pagetitle">
	<h1>REQUEST APPROVALS</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-check-circle"></i>
			</a></li>
			<li class="breadcrumb-item action">APPROVE CUSTOMER REQUEST</li>
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
				<!-- <div class="col-lg-4">
							<div class="d-flex flex-column formFields">
								<label for="">BRANCH NAME</label> <select id="branchName" name="branchName"
									required="required" class="form-control selectField"
									style="height: 30px;">


									<option value="">SELECT BRANCH</option>
									

								</select>
							</div>
						</div> -->

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">BRANCH NAME</label> <select id="branchName"
							name="branchName" required="required"
							class="form-control selectField" style="height: 30px;">
						</select>
					</div>

				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">ACCOUNT NUMBER</label> <input type="number"
							id="accountNumber" name="accountNumber" required="required"
							class="form-control" style="height: 30px;"
							placeholder="ENTER ACCOUNT NO...">
					</div>

				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">DATE FROM</label> <input type="date"
							name="fromDate" id="fromDate" required="required"
							placeholder="ENTER FROM DATE" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
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
								<th scope="col"></th>
								<th scope="col">SR NO.</th>
								<th scope="col">CUSTOMER NAME</th>
								<th scope="col">CUSTOMER CODE</th>
								<th scope="col">ACCOUNT NUMBER</th>
								<th scope="col">BRANCH NAME</th>
								<th scope="col">DATE OF BIRTH</th>
								<th scope="col">AGE</th>
								<th scope="col">GENDER</th>
								<th scope="col">ADDRESS</th>
								<th scope="col">CONTACT NO</th>
								<th scope="col">EMAIL ID</th>

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

<!-- <script src="js/chartScript.js"></script> -->
<script src="./js/adminscript.js"></script>
<script src="./js/RequestApproval/ApprovalNewClientRequest.js"></script>
<script>
	$(document).ready(function() {

		// Get today's date in YYYY-MM-DD format
		const today = new Date().toISOString().split('T')[0];
		$('#applicationDate').val(today);
		$('#fromDate').val(today);
		$('#toDate').val(today);
		$('#approvalDate').val(today);
		$('#openingDate').val(today);

	});
</script>
