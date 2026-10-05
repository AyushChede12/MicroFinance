
<div class="pagetitle">
	<h1>SECURED GOLD LOAN</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-cash-coin"></i>
			</a></li>
			<li class="breadcrumb-item action">PRINT NOC</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div class="">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH DETAILS FOR PRINT</li>
				</ol>
			</nav>
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
			</div>
		</div>
		<div class="row">
			<div class="col-12 text-center">

				<button class="btnStyle" style="background-color: #FFA500;"
					id="generateNoc">GENERATE NOC</button>

			</div>
		</div>

	</form>
	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales" id="receiptArea"></div>
		</div>
	</div>

	<!-- Print Button (hidden by default) -->
	<div style="text-align: center; margin-top: 20px;">
		<button id="printBtn" onclick="printDocument()"
			style="display: none; padding: 8px 20px; font-size: 16px; font-weight: bold; background: #007bff; color: #fff; border: none; border-radius: 6px; cursor: pointer;">
			PRINT</button>
	</div>
</div>

<script
	src="${pageContext.request.contextPath}/js/SecuredGoldLoan/NocgenerationGold.js"></script>