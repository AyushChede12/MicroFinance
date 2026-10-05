
<div class="pagetitle">
	<h1>LOAN MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-cash-coin"></i>
			</a></li>
			<li class="breadcrumb-item action">SETTLE LOAN RECORDS</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div class="">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">FIND BY LOAN ID</label> <select id="closedLoanIds"
							name="closedLoanIds" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT LOAN ID</option>

						</select>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12 text-center">
				<button id="searchBtn" class="btnStyle"
					style="background-color: #FFA500;">SEARCH</button>
			</div>
		</div>

	</form>
	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">
				<div class="table-responsive">
					<table class="table table-borderless datatable">
						<thead class="table-light">
							<tr
								style="font-family: 'Poppins', sans-serif; white-space: nowrap;">
								<th scope="col">SR NO.</th>
								<th scope="col">LOAN ID</th>
								<th scope="col">LOAN DATE</th>
								<th scope="col">MEMBER ID</th>
								<th scope="col">MEMBER NAME</th>
								<th scope="col">CONTACT NO.</th>
								<th scope="col">ADDRESS</th>
								<th scope="col">BRANCH NAME</th>
								<th scope="col">LOAN PLAN NAME</th>
								<th scope="col">TYPE OF LOAN</th>
								<th scope="col">LOAN MODE</th>
								<th scope="col">LOAN TERM</th>
								<th scope="col">RATE OF INTEREST</th>
								<th scope="col">LOAN AMOUNT</th>
								<th scope="col">INTEREST TYPE</th>
								<th scope="col">EMI PAYMENT</th>
								<th scope="col">TOTAL INTEREST OF LOAN</th>
								<th scope="col">SANCTIONED AMOUNT</th>
								<th scope="col">TOTAL PAYABLE OF LOAN</th>
								<th scope="col">INTEREST DUE</th>
								<th scope="col">PRINCIPAL DUE</th>
								<th scope="col">AMOUNT PAID</th>
								<th scope="col">BALANCE LOAN AMOUNT</th>
								<th scope="col">NO OF INSTALLMENTS</th>
								<th scope="col">PAYMENT DATE</th>
								<th scope="col">FINANCIAL CONSULTANT NAME</th>
								<th scope="col">LOAN STATUS</th>
							</tr>
						</thead>
						<tbody id="loanClosureTableBody">
							<!-- Data rows will be dynamically inserted here -->
						</tbody>
					</table>
				</div>

			</div>
		</div>
	</div>

</div>
<script
	src="${pageContext.request.contextPath}/js/LoanManagment/SettledLoanRecord.js"></script>