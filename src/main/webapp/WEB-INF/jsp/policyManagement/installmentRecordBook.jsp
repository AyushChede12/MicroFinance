
<div class="pagetitle">
	<h1>POLICY MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"><i
					class="bi bi-piggy-bank"></i></a></li>
			<li class="breadcrumb-item active">INSTALLMENT RECORD BOOK</li>
		</ol>
	</nav>
</div>

<!-- Main Form -->
<form id="formid">
	<div>
		<nav>
			<ol class="breadcrumb breadcrumb-title">
				<li class="breadcrumb-item active">PRINT SEARCH RESULT</li>
			</ol>
		</nav>

		<!-- Combined Row with Dropdown and Buttons -->
		<div class="row align-items-center mb-4">
			<!-- Dropdown -->
			<div class="col-md-6 d-flex align-items-center">
				<label class="mr-2 mb-0">FIND BY POLICY CODE*</label> <select
					id="findByPolicyNumber" name="findByPolicyNumber"
					class="form-control w-50">
					<option value="">SLECT POLICY CODE</option>
				</select>
			</div>

			<!-- Buttons -->
			<!-- <div class="col-md-6 text-right"> -->
			<div class="col-md-6 d-flex justify-content-center">


				<button type="button" class="btn btn-dark mr-2"
					onclick="toggleTransaction()">TRANSCATION</button>

				<button type="button" class="btn btn-dark"
					onclick="printTransactionSection()">
					<i class="bi bi-download"></i>
				</button>

			</div>
		</div>
	</div>
</form>

<!-- Transaction Section (Initially Hidden) -->
<div id="transactionSection" class="transaction-section"
	style="display: none;">

	<div style="width: 70%; margin: auto">

		<h1>MICROFINANCE SERVICES</h1>

		<p>ADDRESS : NAGPUR(440024) - MAHRASHTRA</p>

		<hr />

		<div class="d-flex justify-content-between">

			<p>
				BRANCH AND CODE: <span id="branchCodeSpan"
					style="width: 12vw; display: inline-block;"></span>
			</p>

			<p>
				DOC: <span id="docSpan" style="width: 15vw; display: inline-block;"></span>
			</p>

		</div>


		<div class="d-flex justify-content-between">

			<p>
				POLICY NO.: <span id="policyNoSpan"
					style="width: 12vw; display: inline-block;"></span>
			</p>

			<p>
				MEMBER CODE: <span id="memberCodeSpan"
					style="width: 12vw; display: inline-block;"></span>
			</p>

		</div>


		<p>
			APPLICANT NAME: <span id="applicantNameSpan"></span>
		</p>


		<p>
			FATHER/HUSBAND NAME: <span id="fatherNameSpan"
				style="width: 12vw; display: inline-block;"></span>
		</p>


		<p>
			NOMINEE NAME: <span id="nomineeNameSpan"></span>
		</p>


		<p>
			ADDRESS: <span id="addressSpan"></span>
		</p>


		<div class="d-flex justify-content-between">

			<p>
				SCHEME: <span id="schemeSpan"
					style="width: 12vw; display: inline-block;"></span>
			</p>

			<p>
				PLAN: <span id="planSpan"
					style="width: 12vw; display: inline-block;"></span>
			</p>

			<p>
				RELATIONSHIP: <span id="relationshipSpan"
					style="width: 12vw; display: inline-block;"></span>
			</p>

		</div>


		<div class="d-flex justify-content-between">

			<p>
				ROI: <span id="roiSpan" style="width: 12vw; display: inline-block;"></span>
			</p>

			<p>
				MODE: <span id="modeSpan"
					style="width: 12vw; display: inline-block;"></span>
			</p>

			<p>
				MATURITY: <span id="maturitySpan"
					style="width: 12vw; display: inline-block;"></span>
			</p>

		</div>


		<div class="d-flex justify-content-between">

			<p>
				RENEWAL AMOUNT: <span id="renewalAmountSpan"
					style="width: 12vw; display: inline-block;"></span>
			</p>

			<p>
				TOTAL VALUE: <span id="totalValueSpan"
					style="width: 12vw; display: inline-block;"></span>
			</p>

			<p>
				TERM: <span id="termSpan"
					style="width: 12vw; display: inline-block;"></span>
			</p>

		</div>


		<!-- CUSTOMER BALANCE -->

		<p>
			CUSTOMER BALANCE: <span id="balance"
				style="width: 12vw; display: inline-block;"></span>
		</p>


		<div class="d-flex justify-content-between">

			<p>
				MATURITY DATE: <span id="maturityDateSpan"
					style="width: 12vw; display: inline-block;"></span>
			</p>

			<p>
				MOBILE NO: <span id="mobileSpan"
					style="width: 12vw; display: inline-block;"></span>
			</p>

		</div>


		<p>
			COLLECTOR NAME: <span id="collectorSpan"
				style="width: 12vw; display: inline-block;"></span>
		</p>


		<div class="d-flex justify-content-end">

			<hr style="border-color: black; width: 20vw;">

			<p style="position: relative; top: 23px; right: 17rem">
				AUTHORIZED SIGNATURE</p>

		</div>

	</div>

</div>


<!-- Toggle Script -->


<script>
	function onFrontPageClick() {
		const selectedPolicyCode = $("#policyCodeDropdown").val();
		fetchPolicyData(selectedPolicyCode);
	}
</script>


<script
	src="${pageContext.request.contextPath}/js/PolicyManagment/policyReport.js"></script>