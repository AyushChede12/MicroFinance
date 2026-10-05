
<div class="pagetitle">
	<h1>SECURED GOLD LOAN</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-house-door"></i>
			</a></li>
			<li class="breadcrumb-item action">GOLD LOAN STATEMENT</li>
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
						<label for="findByGoldLoanId" id="goldSelection">GOLD ID </label>
						<select id="findByGoldLoanId" name="findByGoldLoanId"
							class="form-control selectField" style="width: 100%;">
							<option value="">-- SEARCH GOLD ID --</option>
						</select>
					</div>
				</div>

			</div>
		</div>

		<div class="row mt-4">
			<div class="col-12 text-center">
				<button type="button" id="searchGoldStatement"
					class="btnStyle bg-success">SEARCH</button>

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
	src="${pageContext.request.contextPath}/js/SecuredGoldLoan/goldLoanStatement.js"></script>
