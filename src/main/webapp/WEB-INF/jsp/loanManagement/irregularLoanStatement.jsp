<div class="pagetitle">
	<h1>LOAN MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-cash-coin"></i>
			</a></li>
			<li class="breadcrumb-item action">IRREGULAR LOAN STATEMENT</li>
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
						<label for="loanid">FIND LOAN ID &amp; NAME</label>
						<select id="loanid" name="loanid" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT LOAN ID</option>
						</select>
					</div>
				</div>
			</div>
		</div>

		<div class="row mt-4">
			<div class="col-12 text-center">
				<button type="button" id="searchLoanStatement" class="btnStyle bg-success">SEARCH</button>
			</div>
		</div>
	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales" id="statementArea"></div>
		</div>
	</div>

</div>

<script src="${pageContext.request.contextPath}/js/LoanManagment/irregularLoanStatement.js"></script>
