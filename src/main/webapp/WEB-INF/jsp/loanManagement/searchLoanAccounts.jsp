
<style>
.table tbody td {
	white-space: nowrap;
	font-size: 14px;
	padding: 8px;
}
</style>

<div class="pagetitle">
	<h1>LOAN MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-house-door"></i>
			</a></li>
			<li class="breadcrumb-item action">SEARCH LOAN ACCOUNTS</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div class="row">


			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for=""> LOAN ID</label> <select id="loanId"
						name="loanId" required="required" class="form-control selectField"
						style="height: 30px;">
						<option value="">SELECT LOAN ID</option>

					</select>
				</div>
			</div>
			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="loanName"> BEGINNING DATE</label> <input type="date"
						name="DateofLoan" id="DateofLoan" required="required"
						placeholder="ENTER BEGINNING DATE" style="text-transform: uppercase;" />
				</div>
			</div>
			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="loanName">FINAL DATE</label> <input type="date"
						name="finaldate" id="finaldate" required="required" placeholder="ENTER FINAL DATE"
						style="text-transform: uppercase;" />
				</div>
			</div>

			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="">MEMBER NAME </label> <input type="text"
						name="memberName" id="memberName" required="required"
						placeholder="ENTER MEMBER NAME" />
				</div>
			</div>

			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="">MEMBER ID: </label> <input type="text"
						name="memberId" id="memberId" required="required"
						placeholder="ENTER MEMBER CODE" />
				</div>
			</div>
			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="">LOAN PLAN NAME: </label> <input type="text"
						name="loanPlanName" id="loanPlanName" required="required"
						placeholder="ENTER PLAN NAME" />
				</div>
			</div>
			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4"
					style="margin-bottom: 30px">
					<label> FINANCIAL CONSULTANT ID</label>
					<div class="d-flex flex-column formFields mb-4">
						<input type="text" name="financialConsultantId"
							id="financialConsultantId" required="required"
							placeholder="ENTER FINANCIAL CONSULTANT ID" />
					</div>
				</div>
			</div>
			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="">FINANCIAL CONSULTANT NAME</label> <input type="text"
						name="financialConsultantName" id="financialConsultantName"
						required="required" placeholder="ENTER CONSULTANT NAME"
						style="text-transform: uppercase;" />
				</div>
			</div>
		</div>
	</form>
	<div class="row">
		<div class="col-12 text-center">

			<button id="searchButton" class="btnStyle"
				style="background-color: #FFA500;">SEARCH</button>
		</div>
	</div>
</div>


<div class="row mt-5">
	<div class="col-12">
		<div class="card recent-sales">

			<div class="card-body table-responsive">
				<h5 class="card-title">LOAN RECORDS</h5>

				<div class="table-responsive">
					<table class="table table-borderless datatable">
						<thead class="table-light">
							<tr
								style="font-family: 'Poppins', sans-serif; white-space: nowrap;">
								<th scope="col">SR NO.</th>
								<th scope="col">MEMBER ID</th>
								<th scope="col">MEMBER NAME</th>
								<th scope="col">DOB</th>
								<th scope="col">AGE</th>
								<th scope="col">PHONE NO.</th>
								<th scope="col">ADDRESS</th>
								<th scope="col">LOAN PLAN NAME</th>
								<th scope="col">LOAN DATE</th>
								<th scope="col">LOAN AMOUNT</th>
								<th scope="col">LOAN PURPOSE</th>
							</tr>
						</thead>
						<tbody>
							<!-- rows go here -->
						</tbody>
					</table>
				</div>

			</div>
		</div>
	</div>
</div>

<script src="./js/LoanManagment/SearchLoans.js"></script>
<script
	src="${pageContext.request.contextPath}/js/LoanManagment/EarlyLoanClosure.js"></script>
