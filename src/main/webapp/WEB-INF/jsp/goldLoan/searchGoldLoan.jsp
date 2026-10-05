
<style>
.table tbody td {
	white-space: nowrap;
	font-size: 14px;
	padding: 8px;
}
</style>

<div class="pagetitle">
	<h1>SECURED GOLD LOAN</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-house-door"></i>
			</a></li>
			<li class="breadcrumb-item action">SEARCH GOLD LOAN</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div class="row">


			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="findByGoldLoanId" id="goldSelection">FIND BY
						GOLD ID </label> <select id="findByGoldLoanId" name="findByGoldLoanId"
						class="form-control selectField" style="width: 100%;">
						<option value="">-- SELECT GOLD ID --</option>
					</select>
				</div>
			</div>
			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="fromDate"> BEGINNING DATE </label> <input type="date"
						name="fromDate" id="fromDate" required="required" placeholder=""
						style="text-transform: uppercase;" />
				</div>
			</div>
			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="toDate">FINAL DATE</label> <input type="date"
						name="toDate" id="toDate" required="required" placeholder=""
						style="text-transform: uppercase;" />
				</div>
			</div>

			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="customerName">CUSTOMER NAME </label> <input type="text"
						name="customerName" id="customerName" required="required"
						placeholder="ENTER CUSTOMER NAME " />
				</div>
			</div>

			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="customerCode">CUSTOMER CODE </label> <input type="text"
						name="customerCode" id="customerCode" required="required"
						placeholder="ENTER CUSTOMER CODE " />
				</div>
			</div>
			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="">LOAN PLAN NAME : </label> <input type="text"
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
							placeholder="ENTER MEMBER ID" />
					</div>
				</div>
			</div>
			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="">FINANCIAL CONSULTANT NAME</label> <input type="text"
						name="financialConsultantName" id="financialConsultantName"
						required="required" placeholder="ENTER FINANCIAL NAME "
						style="text-transform: uppercase;" />
				</div>
			</div>
		</div>
	</form>
	<div class="row">
		<div class="col-12 text-center">

			<button type="button" id="searchButtonGold" class="btnStyle"
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
								<th scope="col">GOLD ID</th>
								<th scope="col">CUSTOMER NAME</th>
								<th scope="col">CUSTOMER CODE</th>
								<th scope="col">CONTACT NO</th>
								<th scope="col">ADDRESS</th>
								<th scope="col">BRANCH</th>
								<th scope="col">LOAN PLAN NAME</th>
								<th scope="col">TYPE OF LOAN</th>
								<th scope="col">LOAN MODE</th>
								<th scope="col">LOAN DATE</th>
								<th scope="col">DURATION</th>
								<th scope="col">LOAN AMOUNT</th>
								<th scope="col">EMI (PER MONTH)</th>
								<th scope="col">CUSTOMER ITEM</th>
								<th scope="col">LOAN  PURPOSE</th>
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

<script
	src="${pageContext.request.contextPath}/js/SecuredGoldLoan/SearchGoldLoan.js"></script>
