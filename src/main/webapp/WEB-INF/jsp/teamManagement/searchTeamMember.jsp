
<div class="pagetitle">
	<h1>TEAM MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-person-workspace"></i>
			</a></li>
			<li class="breadcrumb-item action">TEAM SEARCH </li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH BOX </li>
				</ol>
			</nav>
			<div class="row">

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px;">
						<label for="">BRANCH </label> <select id="branchName"
							name="branchName" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT BRANCH </option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">DATE FROM :</label> <input type="date"
							name="dateFrom" id="dateFrom" required="required"
							placeholder="ENTER FDATE" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">DATE TO :</label> <input type="date"
							name="dateTo" id="dateTo" required="required"
							placeholder="ENTER TDATE" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">Team Member Name </label> <input type="text"
							name="teamMemberName" id="teamMemberName" required="required"
							placeholder="Enter Employee Name" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">TEAM MEMBER CODE </label> <input type="text"
							name="teamMamberCode" id="teamMamberCode" required="required"
							placeholder="ENTER EMPLOYEE CODE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">CONTACT NUMBER </label> <input type="text"
							name="contactNo" id="contactNo" required="required"
							placeholder="ENTER EMPLOYEE NAME" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">DESIGANATION </label> <select id="designation"
							name="designation" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT DESIGNATION </option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">DEPARTMENT </label> <select id="department"
							name="department" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT DEPARTMENT</option>
						</select>
					</div>
				</div>

			</div>

			<!-- <div class="row">
						<div class="col-4 text-start mt-3">
							<button id="searchBtn" class="btnStyle bg-warning">Search</button>
							<button id="printBtn" class="btnStyle bg-primary">Print</button>
						</div>
					</div> -->

		</div>

	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">SEARCH RESULT</h5>

					<table class="table table-borderless datatable overflow-scroll">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">S/N</th>
								<th scope="col">Employee Name</th>
								<th scope="col">DOB</th>
								<th scope="col">Bank Account</th>
								<th scope="col">DOJ</th>
								<th scope="col">Phone No</th>
								<th scope="col">Branch Name</th>
								<th scope="col">Team Member Code</th>
								<th scope="col">Designation</th>
								<th scope="col">Department</th>
							</tr>
						</thead>
						<tbody id="searchTeamMember">

						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

</div>
<script
	src="${pageContext.request.contextPath}/js/teamManagement/SearchTeamMember.js"></script>