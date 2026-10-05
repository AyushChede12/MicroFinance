
<div class="pagetitle">
	<h1>ACCOUNT MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="home"><i
					class="bi bi-wallet2"></i> </a></li>
			<li class="breadcrumb-item action">BANK STATEMENT</li>
		</ol>
	</nav>
</div>
<form id="formid">
	<div>

		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH BOX</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="">ACCOUNT NUMBER</label> <select id="accountNumber"
							name="accountNumber" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">--SELECT ACCOUNT NO--</option>
						</select>
					</div>
				</div>

				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">START DATE</label> <input type="date"
							name="startDate" id="startDate" required="required" />
					</div>
				</div>

				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">END DATE</label> <input type="date"
							name="endDate" id="endDate" required="required" />
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-12 text-center mt-3">
			<button type="button" id="searchbtn" class="btnStyle"
				style="background-color: #FFA500;">SEARCH</button>
		</div>
	</div>
</form>

<!-- <div class="row mt-5">
	<div class="col-12">
		<div class="card recent-sales">

			<div class="card-body table-responsive">
				<h5 class="card-title">STATEMENT DETAILS</h5>

				<table class="table table-borderless datatable overflow-scroll">
					<thead class="table-light">
						<tr style="font-family: 'Poppins', sans-serif;">
							<th style="white-space: nowrap;">SR NO.</th>
							<th style="white-space: nowrap;">BANK</th>
							<th style="white-space: nowrap;">ACCOUNT NO.</th>
							<th style="white-space: nowrap;">DATE</th>
							<th style="white-space: nowrap;">NARATION</th>
							<th style="white-space: nowrap;">CREDIT CR.</th>
							<th style="white-space: nowrap;">DEBIT DR.</th>
							<th style="white-space: nowrap;">BALANCE</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
 -->

<!-- ========================================================= -->
<!-- BANK STATEMENT SECTION                                   -->
<!-- ========================================================= -->

<div id="statementSection" style="display: none;">

	<div class="card mt-4">

		<div class="card-body">


			<!-- ================================================= -->
			<!-- COMPANY HEADER                                   -->
			<!-- ================================================= -->

			<div class="text-center mb-4">

				<!-- COMPANY LOGO -->

				<div class="mb-2">

					<img id="companyLogo" src="" alt="Company Logo"
						style="max-height: 80px; max-width: 180px; display: none; object-fit: contain;">

				</div>


				<!-- COMPANY NAME -->

				<h2 id="companyName" style="margin-bottom: 5px; font-weight: 700;">
					COMPANY NAME</h2>


				<!-- COMPANY ADDRESS -->

				<div id="companyAddress"
					style="font-size: 14px; color: #555; margin-bottom: 5px;">-</div>


				<!-- COMPANY CONTACT -->

				<div style="font-size: 14px; color: #555;">

					<span> <strong>CONTACT:</strong> <span id="companyContact">
							- </span>

					</span> &nbsp; | &nbsp; <span> <strong>EMAIL:</strong> <span
						id="companyEmail"> - </span>

					</span>

				</div>


				<!-- GST -->

				<div style="font-size: 14px; color: #555; margin-top: 3px;">

					<strong>GSTIN:</strong> <span id="companyGST"> - </span> &nbsp;

				</div>

			</div>


			<!-- ================================================= -->
			<!-- SEPARATOR                                        -->
			<!-- ================================================= -->

			<hr>


			<!-- ================================================= -->
			<!-- STATEMENT TITLE                                  -->
			<!-- ================================================= -->

			<div class="text-center mb-4">

				<h4
					style="font-weight: 700; letter-spacing: 1px; margin-bottom: 5px;">
					BANK ACCOUNT STATEMENT</h4>


				<!-- <small style="color: #6c757d;"> ACCOUNT TRANSACTION
					STATEMENT </small> -->

			</div>


			<!-- ================================================= -->
			<!-- ACCOUNT INFORMATION                              -->
			<!-- ================================================= -->

			<div class="row mb-4"
				style="border: 1px solid #dee2e6; padding: 15px; border-radius: 5px;">

				<!-- ACCOUNT NUMBER -->

				<div class="col-md-4">

					<div>

						<small class="text-muted"> ACCOUNT NUMBER </small>

						<div id="statementAccountNumber"
							style="font-weight: 600; font-size: 16px;">-</div>

					</div>

				</div>


				<!-- BANK -->

				<div class="col-md-4">

					<div>

						<small class="text-muted"> BANK </small>

						<div id="statementBankName"
							style="font-weight: 600; font-size: 16px;">-</div>

					</div>

				</div>


				<!-- BRANCH -->

				<div class="col-md-4">

					<div>

						<small class="text-muted"> BRANCH </small>

						<div id="statementBranchName"
							style="font-weight: 600; font-size: 16px;">-</div>

					</div>

				</div>


				<!-- DATE FROM -->

				<div class="col-md-4 mt-3">

					<div>

						<small class="text-muted"> STATEMENT FROM </small>

						<div id="statementStartDate" style="font-weight: 600;">-</div>

					</div>

				</div>


				<!-- DATE TO -->

				<div class="col-md-4 mt-3">

					<div>

						<small class="text-muted"> STATEMENT TO </small>

						<div id="statementEndDate" style="font-weight: 600;">-</div>

					</div>

				</div>


				<!-- GENERATED DATE -->

				<div class="col-md-4 mt-3">

					<div>

						<small class="text-muted"> GENERATED ON </small>

						<div id="generatedDate" style="font-weight: 600;">-</div>

					</div>

				</div>

			</div>


			<!-- ================================================= -->
			<!-- BALANCE SUMMARY                                  -->
			<!-- ================================================= -->

			<div class="row mb-4">


				<!-- OPENING BALANCE -->

				<div class="col-md-3 mb-2">

					<div
						style="border: 1px solid #dee2e6; border-radius: 5px; padding: 15px;">

						<small class="text-muted"> OPENING BALANCE </small>

						<h5 id="openingBalance"
							style="margin-top: 7px; margin-bottom: 0; font-weight: 700;">
							₹ 0.00</h5>

					</div>

				</div>


				<!-- TOTAL CREDIT -->

				<div class="col-md-3 mb-2">

					<div
						style="border: 1px solid #dee2e6; border-radius: 5px; padding: 15px;">

						<small class="text-muted"> TOTAL CREDIT </small>

						<h5 id="totalCredit"
							style="margin-top: 7px; margin-bottom: 0; font-weight: 700;">
							₹ 0.00</h5>

					</div>

				</div>


				<!-- TOTAL DEBIT -->

				<div class="col-md-3 mb-2">

					<div
						style="border: 1px solid #dee2e6; border-radius: 5px; padding: 15px;">

						<small class="text-muted"> TOTAL DEBIT </small>

						<h5 id="totalDebit"
							style="margin-top: 7px; margin-bottom: 0; font-weight: 700;">
							₹ 0.00</h5>

					</div>

				</div>


				<!-- CLOSING BALANCE -->

				<div class="col-md-3 mb-2">

					<div
						style="border: 1px solid #dee2e6; border-radius: 5px; padding: 15px;">

						<small class="text-muted"> CLOSING BALANCE </small>

						<h5 id="closingBalance"
							style="margin-top: 7px; margin-bottom: 0; font-weight: 700;">
							₹ 0.00</h5>

					</div>

				</div>

			</div>


			<!-- ================================================= -->
			<!-- TRANSACTION TABLE                                -->
			<!-- ================================================= -->

			<div class="table-responsive">

				<table class="table table-bordered datatable"
					style="width: 100%; margin-bottom: 0;">

					<thead>

						<tr>

							<th class="text-center" style="white-space: nowrap;">S.NO.</th>


							<th style="white-space: nowrap; text-align: center;">DATE</th>


							<th style="white-space: nowrap; text-align: center;">NARRATION
								/ PARTICULARS</th>


							<th style="white-space: nowrap; text-align: center;">REFERENCE
								NO.</th>


							<th class="text-end"
								style="white-space: nowrap; text-align: center;">CREDIT
								(&#8377;)</th>


							<th class="text-end"
								style="white-space: nowrap; text-align: center;">DEBIT
								(&#8377;)</th>


							<th class="text-end"
								style="white-space: nowrap; text-align: center;">BALANCE
								(&#8377;)</th>

						</tr>

					</thead>


					<tbody>

						<!-- AJAX WILL LOAD TRANSACTIONS HERE -->

					</tbody>

				</table>

			</div>


			<!-- ================================================= -->

			<!-- STATEMENT FOOTER                                  -->

			<!-- ================================================= -->

			<div class="row mt-3"
				style="border-top: 1px solid #dee2e6; padding-top: 15px;">

				```
				<div class="col-md-12 text-center">
					<small class="text-muted"> THIS IS A SYSTEM GENERATED BANK
						ACCOUNT STATEMENT. </small>
				</div>
				

			</div>

			<!-- ================================================= -->

			<!-- PRINT BUTTON                                      -->

			<!-- ================================================= -->

			<div class="row mt-3 print-button-section">

				<div class="col-md-12 text-center">

					<button type="button" class="btn btn-primary px-4"
						onclick="printBankStatement()">

						<i class="bi bi-printer"></i> &nbsp; Print Statement

					</button>

				</div>
				
			</div>
			
		</div>

	</div>

</div>


<script
	src="${pageContext.request.contextPath}/js/account-management/bankStatement.js"></script>