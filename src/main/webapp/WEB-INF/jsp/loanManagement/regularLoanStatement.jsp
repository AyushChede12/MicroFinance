
<div class="pagetitle">
	<h1>LOAN MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-house-door"></i>
			</a></li>
			<li class="breadcrumb-item action">REGULAR LOAN STATEMENT</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH DETAILS</li>
				</ol>
			</nav>
			<div class="row">

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">SELECT LOAN TYPE</label> <select id="loanId&Name"
							name="loanId&Name" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT LOAN TYPE</option>
							<option value="Regular">REGULAR LOAN STATEMENT</option>
							<option value="Irregular">IRREGULAR LOAN STATEMENT</option>
						</select>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN ID</label> <select id="loanStatementID"
							name="loanStatementID" required="required"
							class="form-control selectField" style="height: 30px;">

						</select>
					</div>
				</div>

			</div>
		</div>

		<div class="row mt-4">
			<div class="col-12 text-center">
				<button id="searchLoanStatement" class="btnStyle bg-success">SEARCH</button>

			</div>
		</div>
	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales" id="receiptArea"></div>
		</div>
	</div>

</div>

<script
	src="${pageContext.request.contextPath}/js/LoanManagment/LoanStatement.js"></script>
