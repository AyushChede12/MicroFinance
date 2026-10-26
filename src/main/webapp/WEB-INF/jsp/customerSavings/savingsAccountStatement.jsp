<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<style>
@media print {
	body * {
		visibility: hidden !important;
	}
	#printableStatement, #printableStatement * {
		visibility: visible !important;
	}
	#printableStatement {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		margin: 0;
		padding: 15px !important;
		box-shadow: none !important;
		border: none !important;
	}
	.sidebar, .navbar, .pagetitle, #searchBoxContainer, .btn, footer, header {
		display: none !important;
	}
	* {
		-webkit-print-color-adjust: exact !important;
		print-color-adjust: exact !important;
	}
}

.company-header-box {
	border-bottom: 2px solid #0d6efd;
	padding-bottom: 12px;
	margin-bottom: 18px;
}

.company-logo-img {
	max-height: 70px;
	max-width: 130px;
	object-fit: contain;
}

.company-name-val {
	font-weight: 800;
	letter-spacing: 0.5px;
	color: #1a237e;
	margin-bottom: 2px;
}

.company-meta-badge {
	display: inline-block;
	margin: 0 4px;
}

.stat-summary-box {
	background: #f8f9fa;
	border-radius: 8px;
	padding: 12px;
	border: 1px solid #e9ecef;
	transition: all 0.2s ease;
}

.stat-summary-box:hover {
	background: #f1f3f5;
}
</style>

<div class="pagetitle">
	<h1>SAVING / CURRENT ACCOUNT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-bank text-blue"></i>
			</a></li>
			<li class="breadcrumb-item action">CUSTOMER SAVINGS STATEMENT</li>
		</ol>
	</nav>
</div>

<div>
	<!-- SEARCH BOX -->
	<div class="card shadow-sm mb-4" id="searchBoxContainer">
		<div class="card-body pt-3">
			<nav>
				<ol class="breadcrumb breadcrumb-title mb-3">
					<li class="breadcrumb-item action">STATEMENT SEARCH</li>
				</ol>
			</nav>

			<form id="formid" onsubmit="return false;">
				<div class="row g-3 align-items-end">
					<div class="col-lg-4 col-md-6">
						<div class="d-flex flex-column formFields">
							<label for="accountNumber" class="fw-semibold mb-1">ACCOUNT
								NUMBER <span class="text-danger">*</span>
							</label> <select id="accountNumber" name="accountNumber"
								required="required" class="form-control selectField"
								style="height: 36px;">
								<option value="">--SELECT ACCOUNT NO--</option>
							</select>
						</div>
					</div>

					<div class="col-lg-3 col-md-3">
						<div class="d-flex flex-column formFields">
							<label for="startDate" class="fw-semibold mb-1">START
								DATE</label> <input type="date" name="startDate" id="startDate"
								class="form-control" style="height: 36px;" />
						</div>
					</div>

					<div class="col-lg-3 col-md-3">
						<div class="d-flex flex-column formFields">
							<label for="endDate" class="fw-semibold mb-1">END DATE</label> <input
								type="date" name="endDate" id="endDate" class="form-control"
								style="height: 36px;" />
						</div>
					</div>

					<div class="col-lg-2 col-md-12 text-md-start text-center">
						<button type="button" id="searchByAccNo"
							class="btn btn-warning w-100 fw-bold shadow-sm"
							style="height: 36px;">
							<i class="bi bi-search me-1"></i> SEARCH
						</button>
					</div>
				</div>

				<div class="row mt-3">
					<div
						class="col-12 d-flex justify-content-between align-items-center flex-wrap gap-2">
						<div>
							<button type="button" id="resetBtn"
								class="btn btn-outline-secondary btn-sm px-3">
								<i class="bi bi-arrow-counterclockwise me-1"></i> RESET
							</button>
						</div>
						<div class="d-flex gap-2">
							<button type="button" id="downloadPdfBtn"
								class="btn btn-danger btn-sm px-3 fw-bold shadow-sm"
								style="display: none;">
								<i class="bi bi-file-earmark-pdf-fill me-1"></i> DOWNLOAD PDF
							</button>
							<button type="button" id="printStatementBtn"
								class="btn btn-primary btn-sm px-3 fw-bold shadow-sm"
								style="display: none;">
								<i class="bi bi-printer-fill me-1"></i> PRINT STATEMENT
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>

	<!-- STATEMENT REPORT SECTION -->
	<div class="row mt-3" id="statementCard" style="display: none;">
		<div class="col-12">
			<div class="card shadow-sm border" id="printableStatement">
				<div class="card-body p-4">

					<!-- Dynamic Company Details Header -->
					<div class="company-header-box text-center">
						<div class="d-flex justify-content-center align-items-center flex-wrap mb-2">
							<div class="company-logo-wrapper me-3" style="display: none;">
								<img class="company-logo-img" src="" alt="Company Logo"
									onerror="this.parentElement.style.display='none';" />
							</div>
							<div class="text-center">
								<h2 class="company-name-val text-uppercase" style="font-size: 24px;"></h2>
								<div class="d-inline-block bg-primary text-white fw-bold px-4 py-1 rounded"
									style="font-size: 12px; letter-spacing: 1px;">
									SAVINGS ACCOUNT STATEMENT
								</div>
							</div>
						</div>
						<div class="company-address-val text-dark small fw-semibold mb-1"></div>
						<div class="d-flex justify-content-center flex-wrap gap-2 small text-secondary">
							<span class="company-meta-badge"><strong>CIN:</strong> <span
									class="company-cin-val">-</span></span>
							<span>|</span>
							<span class="company-meta-badge"><strong>GSTIN:</strong> <span
									class="company-gstin-val">-</span></span>
							<span>|</span>
							<span class="company-meta-badge"><strong>HELPLINE:</strong> <span
									class="company-helpline-val">-</span></span>
							<span>|</span>
							<span class="company-meta-badge"><strong>EMAIL:</strong> <span
									class="company-email-val">-</span></span>
						</div>
						<p class="mt-2 text-muted" id="statementPeriodDisplay"
							style="font-size: 12px; margin-bottom: 0;"></p>
					</div>

					<!-- Customer Details Grid -->
					<div class="row g-2 mb-4 p-3 bg-light rounded border"
						style="font-size: 13px;">
						<div class="col-md-6 col-sm-12">
							<p class="mb-1">
								<strong>ACCOUNT NO:</strong> <span id="accountNoDisplay"
									class="text-primary fw-bold"></span>
							</p>
							<p class="mb-1">
								<strong>A/C HOLDER NAME:</strong> <span id="memberName"
									class="fw-bold"></span>
							</p>
							<p class="mb-1">
								<strong>S/D/W/H/O:</strong> <span id="relativeDetails"></span>
							</p>
							<p class="mb-1">
								<strong>ADDRESS:</strong> <span id="address"></span>
							</p>
						</div>
						<div class="col-md-6 col-sm-12">
							<p class="mb-1">
								<strong>CUSTOMER CODE:</strong> <span id="selectMember"></span>
							</p>
							<p class="mb-1">
								<strong>OPENING DATE:</strong> <span id="opDate"></span>
							</p>
							<p class="mb-1">
								<strong>MODE OF OPERATION:</strong> <span id="modeOfOp"></span>
							</p>
							<p class="mb-1">
								<strong>BRANCH:</strong> <span id="BranchName"></span>
							</p>
						</div>
					</div>

					<!-- Summary Statistics -->
					<div class="row g-3 mb-4 text-center">
						<div class="col-md-3 col-6">
							<div class="stat-summary-box">
								<small class="text-muted d-block text-uppercase fw-semibold"
									style="font-size: 11px;">Opening Balance</small> <span
									class="fw-bold fs-6" id="summaryOpeningBal">&#8377; 0.00</span>
							</div>
						</div>
						<div class="col-md-3 col-6">
							<div class="stat-summary-box">
								<small class="text-muted d-block text-uppercase fw-semibold"
									style="font-size: 11px;">Total Deposits (CR)</small> <span
									class="fw-bold fs-6 text-success" id="summaryTotalDeposit">&#8377; 0.00</span>
							</div>
						</div>
						<div class="col-md-3 col-6">
							<div class="stat-summary-box">
								<small class="text-muted d-block text-uppercase fw-semibold"
									style="font-size: 11px;">Total Withdrawals (DR)</small> <span
									class="fw-bold fs-6 text-danger" id="summaryTotalWithdraw">&#8377; 0.00</span>
							</div>
						</div>
						<div class="col-md-3 col-6">
							<div class="stat-summary-box">
								<small class="text-muted d-block text-uppercase fw-semibold"
									style="font-size: 11px;">Closing Balance</small> <span
									class="fw-bold fs-6 text-primary" id="summaryClosingBal">&#8377; 0.00</span>
							</div>
						</div>
					</div>

					<!-- Transactions Table -->
					<div class="table-responsive">
						<table class="table table-bordered table-hover align-middle"
							id="statementTable">
							<thead class="table-dark text-nowrap" style="font-size: 12px;">
								<tr>
									<th class="text-center" style="width: 50px;">SR NO</th>
									<th class="text-center" style="width: 100px;">TXN DATE</th>
									<th>PARTICULARS / REMARKS</th>
									<th class="text-center" style="width: 90px;">PAY MODE</th>
									<th class="text-end" style="width: 120px;">DEPOSIT (&#8377;)</th>
									<th class="text-end" style="width: 120px;">WITHDRAWAL (&#8377;)</th>
									<th class="text-end" style="width: 130px;">BALANCE (&#8377;)</th>
								</tr>
							</thead>
							<tbody id="tableSavingAcc" style="font-size: 13px;">
							</tbody>
						</table>
					</div>

					<!-- Statement Footer & Authorized Signatory -->
					<div class="row mt-5 pt-4">
						<div class="col-7">
							<p class="text-muted"
								style="font-size: 11px; margin-bottom: 2px;">* This is a
								computer-generated account statement and does not require
								signature unless certified.</p>
							<p class="text-muted" style="font-size: 11px; margin-bottom: 0;">
								Generated on: <span id="generatedTimestamp"></span>
							</p>
						</div>
						<div class="col-5 text-end">
							<div style="display: inline-block; text-align: center;">
								<div
									style="width: 190px; border-bottom: 1px solid #000; margin-bottom: 6px;"></div>
								<strong style="font-size: 12px; letter-spacing: 0.5px;">AUTHORIZED
									SIGNATURE</strong>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</div>

<!-- html2pdf.js CDN for clean client-side PDF download -->
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

<script
	src="${pageContext.request.contextPath}/js/customerSavings/savingsAccountStatement.js"></script>