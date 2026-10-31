<style>
.formFields input, .formFields select {
	text-transform: uppercase;
}
.formFields input::placeholder {
	text-transform: uppercase;
}
@media print {
	.pagetitle, #formid, .btnStyle, .modal, .no-print {
		display: none !important;
	}
	.card {
		border: none !important;
		box-shadow: none !important;
	}
}
</style>

<div class="pagetitle no-print">
	<h1>TEAM MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-person-workspace"></i>
			</a></li>
			<li class="breadcrumb-item action">TEAM SEARCH & HIERARCHY</li>
		</ol>
	</nav>
</div>

<div class="no-print">
	<form id="formid" autocomplete="off">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH FILTERS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 20px;">
						<label for="branchName">BRANCH</label> 
						<select id="branchName" name="branchName" class="form-control selectField" style="height: 30px;">
							<option value="">ALL BRANCHES</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="dateFrom">DATE FROM :</label> 
						<input type="date" name="dateFrom" id="dateFrom" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="dateTo">DATE TO :</label> 
						<input type="date" name="dateTo" id="dateTo" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="teamMemberName">TEAM MEMBER NAME</label> 
						<input type="text" name="teamMemberName" id="teamMemberName"
							placeholder="ENTER MEMBER NAME" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="teamMemberCode">TEAM MEMBER CODE</label> 
						<input type="text" name="teamMemberCode" id="teamMemberCode"
							placeholder="ENTER MEMBER CODE" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="contactNo">CONTACT NUMBER</label> 
						<input type="text" name="contactNo" id="contactNo"
							placeholder="ENTER CONTACT NUMBER" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="designation">DESIGNATION</label> 
						<select id="designation" name="designation" class="form-control selectField" style="height: 30px;">
							<option value="">ALL DESIGNATIONS</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="department">DEPARTMENT</label> 
						<select id="department" name="department" class="form-control selectField" style="height: 30px;">
							<option value="">ALL DEPARTMENTS</option>
						</select>
					</div>
				</div>
			</div>

			<div class="row mt-3 mb-2">
				<div class="col-12 text-start">
					<button type="button" id="searchBtn" class="btnStyle bg-warning">
						<i class="bi bi-search"></i> SEARCH
					</button>
					<button type="button" id="resetBtn" class="btnStyle bg-secondary text-white">
						<i class="bi bi-arrow-counterclockwise"></i> RESET
					</button>
					<button type="button" id="printBtn" class="btnStyle bg-primary text-white" onclick="window.print();">
						<i class="bi bi-printer"></i> PRINT
					</button>
				</div>
			</div>
		</div>
	</form>
</div>

<div class="row mt-4">
	<div class="col-12">
		<div class="card recent-sales">
			<div class="card-body table-responsive">
				<h5 class="card-title" style="font-weight: 700; text-transform: uppercase;">TEAM MEMBER SEARCH RESULTS</h5>

				<table class="table table-bordered table-hover align-middle">
					<thead class="table-light">
						<tr style="font-family: 'Poppins', sans-serif;">
							<th scope="col">S/N</th>
							<th scope="col">MEMBER CODE</th>
							<th scope="col">MEMBER NAME</th>
							<th scope="col">BRANCH</th>
							<th scope="col">DESIGNATION</th>
							<th scope="col">DEPARTMENT</th>
							<th scope="col">JOINING DATE</th>
							<th scope="col">PHONE NO.</th>
							<th scope="col">BANK ACCOUNT</th>
							<th scope="col">STATUS</th>
							<th scope="col" class="no-print">ACTIONS</th>
						</tr>
					</thead>
					<tbody id="searchTeamMember">
						<tr>
							<td colspan="11" class="text-center text-muted">LOADING TEAM MEMBERS...</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<!-- Modal: Connected Financial Consultants Under Team Member -->
<div class="modal fade" id="consultantsModal" tabindex="-1" aria-labelledby="consultantsModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header bg-primary text-white">
				<h5 class="modal-title" id="consultantsModalLabel" style="text-transform: uppercase;">
					<i class="bi bi-people-fill me-2"></i>CONNECTED FINANCIAL CONSULTANTS
				</h5>
				<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="alert alert-info py-2" id="modalMemberInfo" style="text-transform: uppercase; font-weight: 600;">
					REPORTING CONSULTANTS FOR: <span id="modalTeamMemberName">—</span> (<span id="modalTeamMemberCode">—</span>)
				</div>
				<div class="table-responsive">
					<table class="table table-bordered table-striped align-middle">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th>S/N</th>
								<th>CONSULTANT CODE</th>
								<th>CONSULTANT NAME</th>
								<th>POSITION</th>
								<th>BRANCH</th>
								<th>CONTACT NO.</th>
								<th>JOINING DATE</th>
								<th>STATUS</th>
							</tr>
						</thead>
						<tbody id="modalConsultantsTableBody">
							<tr>
								<td colspan="8" class="text-center text-muted">NO CONSULTANTS TO DISPLAY</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary text-uppercase" data-bs-dismiss="modal">CLOSE</button>
			</div>
		</div>
	</div>
</div>

<script src="${pageContext.request.contextPath}/js/TeamManagement/SearchTeamMember.js"></script>
