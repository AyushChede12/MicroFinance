
<div class="pagetitle">
	<h1>LOAN MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-cash-coin"></i>
			</a></li>
			<li class="breadcrumb-item action">GENERATE NOC CERTIFICATE</li>
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

	<script
		src="${pageContext.request.contextPath}/js/LoanManagment/Nocgeneration.js"></script>