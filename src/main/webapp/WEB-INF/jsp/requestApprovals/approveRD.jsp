
<div class="pagetitle">
	<h1>REQUEST APPROVAL</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-check-circle"></i>
			</a></li>
			<li class="breadcrumb-item action">APPROVE RD</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH BOX</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="branchName">BRANCH NAME</label> <select
							id="branchName" name="branchName" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT BRANCH</option>

						</select>
					</div>
				</div>

				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="fromDate">DATE FROM</label> <input type="date"
							name="fromDate" id="fromDate" required="required"
							placeholder="Enter From Date" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="toDate">DATE TO</label> <input type="date"
							name="toDate" id="toDate" required="required"
							placeholder="Enter To Date" style="text-transform: uppercase;" />
					</div>
				</div>
			</div>
		</div>
</div>

<div class="row">
	<div class="col-12 text-center mt-3">
		<button id="saveBtn" class="btnStyle"
			style="background-color: #FFA500;">FIND</button>
	</div>
</div>
</form>

<div class="row mt-5">
	<div class="col-12">
		<div class="card recent-sales">

			<div class="card-body table-responsive">
				<h5 class="card-title">SERACH RESULT</h5>

				<table class="table table-borderless datatable style="white-space:nowrap;">
					<thead class="table-light">
						<tr style="font-family: 'Poppins', sans-serif;">
							<th scope="col"></th>
							<th scope="col" style="white-space: nowrap;">SR.NO</th>
							<th scope="col" style="white-space: nowrap;">POLICY CODE</th>
							<th scope="col" style="white-space: nowrap;">POLICY DATE</th>
							<th scope="col" style="white-space: nowrap;">CUSTOMER NAME</th>
							<th scope="col" style="white-space: nowrap;">POLICY AMOUNT </th>
							<th scope="col" style="white-space: nowrap;">MATURITY DATE</th>
							<th scope="col" style="white-space: nowrap;">CLIENT NAME</th>
							<th scope="col" style="white-space: nowrap;">CONTACT NO</th>
							<th scope="col" style="white-space: nowrap;">RENEWAL DATE</th>
							<th scope="col" style="white-space: nowrap;">BRANCH NAME</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<div class="row">
	<div class="col-12 text-center mt-3">
		<button id="approvedBtn" class="btnStyle"
			style="background-color: #FFA500;">APPROVED</button>
	</div>
</div>


<!-- <script src="js/chartScript.js"></script> -->
<script src="./js/adminscript.js"></script>
<script src="./js/RequestApproval/ApprovalRD.js"></script>
