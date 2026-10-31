<div class="pagetitle">
	<h1>JOINT LIABILITY LOAN</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-person-bounding-box"></i>
			</a></li>
			<li class="breadcrumb-item action">STATEMENT OF ACCOUNT</li>
		</ol>
	</nav>
</div>

<div>
	<form id="statementFilterForm">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH DETAILS FOR STATEMENT</li>
				</ol>
			</nav>
			<div class="row align-items-end">
				<div class="col-lg-4 mb-3">
					<div class="d-flex flex-column formFields">
						<label for="groupCode">SELECT GROUP CODE*</label>
						<select id="groupCode" name="groupCode" required
							class="form-control selectField" style="height: 35px;">
							<option value="">SELECT GROUP CODE</option>
						</select>
					</div>
				</div>
				<div class="col-lg-4 mb-3">
					<button type="button" id="searchBtn" class="btn btn-primary me-2" style="height: 35px; min-width: 120px;">
						<i class="bi bi-search"></i> SEARCH
					</button>
					<button type="button" id="printBtn" class="btn btn-success" style="height: 35px; min-width: 120px;">
						<i class="bi bi-printer"></i> PRINT STATEMENT
					</button>
				</div>
			</div>
		</div>
	</form>

	<div class="row mt-4" id="statementContainer" style="display: none;">
		<div class="col-12">
			<div class="card p-4" id="printableStatementArea">
				<!-- Dynamic Company Header -->
				<div class="text-center mb-4 border-bottom pb-3">
					<h3 id="compName" class="fw-bold mb-1" style="text-transform: uppercase;"></h3>
					<div id="compAddress" class="text-muted small" style="text-transform: uppercase;"></div>
					<div id="compRegLine" class="text-muted small" style="text-transform: uppercase;"></div>
					<div id="compContact" class="text-muted small" style="text-transform: uppercase;"></div>
					<h4 class="mt-3 fw-bold text-decoration-underline" style="text-transform: uppercase;">JOINT LIABILITY GROUP LOAN STATEMENT OF ACCOUNT</h4>
				</div>

				<!-- Group & Loan Summary -->
				<div class="row mb-4">
					<div class="col-md-6">
						<table class="table table-sm table-borderless">
							<tbody>
								<tr>
									<th style="width: 40%;">GROUP CODE:</th>
									<td id="lblGroupCode" class="fw-bold"></td>
								</tr>
								<tr>
									<th>COMMUNITY NAME:</th>
									<td id="lblCommunityName"></td>
								</tr>
								<tr>
									<th>COMMUNITY LEADER:</th>
									<td id="lblCommunityLeader"></td>
								</tr>
								<tr>
									<th>CONTACT NO:</th>
									<td id="lblContactNo"></td>
								</tr>
								<tr>
									<th>BRANCH NAME:</th>
									<td id="lblBranchName"></td>
								</tr>
								<tr>
									<th>COMMUNITY ADDRESS:</th>
									<td id="lblAddress"></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="col-md-6">
						<table class="table table-sm table-borderless">
							<tbody>
								<tr>
									<th style="width: 45%;">LOAN SCHEME:</th>
									<td id="lblLoanScheme"></td>
								</tr>
								<tr>
									<th>OPENING DATE:</th>
									<td id="lblOpeningDate"></td>
								</tr>
								<tr>
									<th>LOAN AMOUNT:</th>
									<td id="lblLoanAmount" class="fw-bold"></td>
								</tr>
								<tr>
									<th>RATE OF INTEREST:</th>
									<td id="lblRateOfInterest"></td>
								</tr>
								<tr>
									<th>MONTHLY EMI:</th>
									<td id="lblEmi"></td>
								</tr>
								<tr>
									<th>TENURE (MONTHS):</th>
									<td id="lblTerm"></td>
								</tr>
								<tr>
									<th>LOAN STATUS:</th>
									<td id="lblStatus"><span class="badge bg-success" id="statusBadge"></span></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<!-- Financial Summary Cards -->
				<div class="row text-center mb-4">
					<div class="col-md-4">
						<div class="border rounded p-3 bg-light">
							<div class="text-muted small fw-bold">TOTAL DISBURSED</div>
							<div class="h4 text-primary fw-bold mb-0" id="cardTotalDisbursed">0.00</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="border rounded p-3 bg-light">
							<div class="text-muted small fw-bold">TOTAL REPAID</div>
							<div class="h4 text-success fw-bold mb-0" id="cardTotalPaid">0.00</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="border rounded p-3 bg-light">
							<div class="text-muted small fw-bold">OUTSTANDING DUE</div>
							<div class="h4 text-danger fw-bold mb-0" id="cardAmountDue">0.00</div>
						</div>
					</div>
				</div>

				<!-- Detailed Transaction History -->
				<h5 class="fw-bold mb-3 border-bottom pb-2">TRANSACTION REPAYMENT HISTORY</h5>
				<div class="table-responsive">
					<table class="table table-bordered table-striped text-center">
						<thead class="table-light">
							<tr>
								<th>INST #</th>
								<th>PAYMENT DATE</th>
								<th>PAYMENT MODE</th>
								<th>PARTICULARS / REMARKS</th>
								<th>COLLECTED BY</th>
								<th>EMI / AMOUNT PAID</th>
								<th>REMAINING BALANCE</th>
								<th>STATUS</th>
							</tr>
						</thead>
						<tbody id="statementTableBody">
							<tr>
								<td colspan="8">NO TRANSACTIONS RECORDED YET</td>
							</tr>
						</tbody>
					</table>
				</div>

				<!-- Signatures -->
				<div class="row mt-5 pt-4 text-center">
					<div class="col-4">
						<div class="border-top pt-2 fw-bold">PREPARED BY</div>
					</div>
					<div class="col-4">
						<div class="border-top pt-2 fw-bold">CHECKED BY</div>
					</div>
					<div class="col-4">
						<div class="border-top pt-2 fw-bold">AUTHORIZED SIGNATURE &amp; SEAL</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script src="${pageContext.request.contextPath}/js/Joinlibiliy/statementOfAccount.js"></script>
