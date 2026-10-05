
<div class="pagetitle">
	<h1>REQUEST APPROVAL</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-check-circle"></i>
			</a></li>
			<li class="breadcrumb-item action">APPROVE FINANCE ONBORDING </li>
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
</div>

<div class="row">
	<div class="col-12 text-center mt-3">
		<button id="findfinanceConsultantBtn" class="btnStyle"
			style="background-color: #FFA500;">FIND</button>
	</div>
</div>
</form>

<div class="row mt-5">
	<div class="col-12">
		<div class="card recent-sales">

			<div class="card-body table-responsive">
				<h5 class="card-title">SERACH RESULT</h5>

				<div style="overflow-x: auto; white-space: nowrap;">
					<table class="table table-borderless datatable">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th></th>
								<th scope="col">SR NO.</th>
								<th scope="col">FINANCIAL NAME</th>
								<th scope="col">FINANCIAL CODE</th>
								<th scope="col">DATE OF BIRTH</th>
								<th scope="col">ACADEMIC BACKGROUND</th>
								<th scope="col">CONTACT NO.</th>
								<th scope="col">PROFESSION</th>
								<th scope="col">START DATE</th>
								<th scope="col">START MODE</th>
								<th scope="col">BRANCH NAME</th>
							</tr>
						</thead>
						<tbody id="searchFinanceOnboarding">
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="row">
	<div class="col-12 text-center mt-3" style="justify-content: end">
		<button id="approveFinanceConsultantBtn" class="btnStyle"
			style="background-color: #FFA500;">APPROVED</button>
	</div>
</div>


<!-- <script src="js/chartScript.js"></script> -->
<script src="./js/adminscript.js"></script>
<script src="./js/RequestApproval/ApproveFinanceOnboarding.js"></script>
<script>
	$(document).ready(function() {
		searchInTheFinanceOnboarding();
		branchNameDropdown();

		// Button click filter
		$('#findfinanceConsultantBtn').on('click', function(e) {
			e.preventDefault(); // Prevent form submission
			filterBranchNameData();
		});

		// Button click Approve
		$('#approveFinanceConsultantBtn').on('click', function(e) {
			e.preventDefault(); // Prevent form submission

			// Get all checked checkboxes
			$('.member-checkbox:checked').each(function() {
				const id = $(this).val();
				updateMemberApprovalStatus(id, true);
			});
		});

	});
</script>
