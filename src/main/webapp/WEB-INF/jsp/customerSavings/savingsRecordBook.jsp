<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<style>
	@media print {
		body * {
			visibility: hidden !important;
		}

		#passbookSection,
		#passbookSection *,
		#TransactionSection,
		#TransactionSection *,
		#headingSection,
		#headingSection *,
		#tableSection,
		#tableSection * {
			visibility: visible !important;
		}

		#passbookSection:not([style*="display: none"]),
		#TransactionSection:not([style*="display: none"]),
		#headingSection:not([style*="display: none"]),
		#tableSection:not([style*="display: none"]) {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			margin: 0;
			padding: 0;
		}

		/* Hide sidebar, navbar, buttons during print */
		.sidebar,
		.navbar,
		.print-button,
		.download-button,
		.footer,
		.header,
		.btn,
		.action-buttons,
		#printbtnSection,
		.pagetitle,
		.breadcrumb,
		#searchCardSection {
			display: none !important;
		}

		@page {
			margin: 12mm;
			size: auto;
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
		margin: 0 6px;
	}
</style>

<div class="pagetitle">
	<h1>SAVING / CURRENT ACCOUNT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i class="bi bi-bank text-blue"></i>
				</a></li>
			<li class="breadcrumb-item action">SAVINGS RECORD BOOK</li>
		</ol>
	</nav>
</div>

<div id="searchCardSection">
	<nav>
		<ol class="breadcrumb breadcrumb-title">
			<li class="breadcrumb-item action">SEARCH DETAILS</li>
		</ol>
	</nav>
	<div class="row">
		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="accountType">ACCOUNT TYPE</label>
				<select id="accountType" class="form-control selectField" style="height: 30px;">
					<option value="">--SELECT ACCOUNT TYPE--</option>
					<option value="savingaccount">SAVING ACCOUNT</option>
					<option value="currentaccount">CURRENT ACCOUNT</option>
				</select>
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="accountNumber">ACCOUNT NO</label>
				<select id="accountNumber" class="form-control selectField" style="height: 30px;">
					<option value="">--SELECT ACCOUNT NO--</option>
				</select>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-12 text-center">
			<button id="btnSearchTransactionData" class="btn btn-success me-1" onclick="displayTransactionDataList()">
				<span class="fa fa-search"></span> SEARCH
			</button>
			<button id="btnFrontPageOnSavingPassbook" class="btn btn-success me-1" onclick="displaySavingfrontPage()">
				FRONT PAGE
			</button>
			<button id="btnTransactionPageOnSavingPassbook" class="btn btn-success me-1" onclick="displaySavingTransaction()">
				TRANSACTION
			</button>
			<button id="btnHeadingOnSavingPassbook" onclick="displayHeadingSA()" class="btn btn-success">
				HEADING
			</button>
		</div>
	</div>
</div>

<div class="row mt-4">
	<div class="col-12 d-flex justify-content-end" id="printbtnSection" style="display: none;">
		<button type="button" class="btn btn-primary px-3 shadow-sm" id="printBtn" onclick="printTransactionSection1()">
			<i class="fa-solid fa-print me-1"></i> PRINT
		</button>
	</div>
</div>

<!-- ===== RECORD BOOK / ACCOUNT DETAILS SEARCH SECTION ===== -->
<div class="row mt-4" id="tableSection" style="display: none;">
	<div class="col-12">
		<div class="card shadow-sm border recent-sales">
			<div class="card-body p-4 table-responsive">
				<!-- Company Details Header -->
				<div class="company-header-box text-center">
					<div class="d-flex justify-content-center align-items-center flex-wrap mb-2">
						<div class="company-logo-wrapper me-3" style="display: none;">
							<img class="company-logo-img" src="" alt="Company Logo"
								onerror="this.parentElement.style.display='none';" />
						</div>
						<div class="text-center">
							<h3 class="company-name-val text-uppercase"></h3>
							<div class="badge bg-primary text-white fw-bold text-uppercase px-3 py-1"
								style="font-size: 11px; letter-spacing: 1px;">
								SAVINGS RECORD BOOK - ACCOUNT HOLDER DETAILS
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
				</div>

				<h5 class="card-title pt-0 mb-3 fw-bold" style="color: #0d47a1;">ACCOUNT HOLDER DETAILS</h5>
				<table class="table table-bordered table-hover align-middle">
					<thead class="table-dark text-nowrap" style="font-size: 13px;">
						<tr>
							<th style="white-space: nowrap;">SR NO</th>
							<th style="white-space: nowrap;">BRANCH NAME</th>
							<th style="white-space: nowrap;">ACCOUNT NO</th>
							<th style="white-space: nowrap;">CUSTOMER NAME</th>
							<th style="white-space: nowrap;">CUSTOMER CODE</th>
							<th style="white-space: nowrap;">MOBILE NO</th>
							<th style="white-space: nowrap;">ADDRESS</th>
							<th style="white-space: nowrap;">OPENING DATE</th>
							<th style="white-space: nowrap;">OPENING BALANCE</th>
						</tr>
					</thead>
					<tbody id="customerDetails" style="font-size: 13px;">
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<!-- ===== PASSBOOK SECTION ===== -->
<div class="row mt-4" id="passbookId">
	<div class="col-12">
		<div id="passbookSection" class="passbookSection card recent-sales" style="display: none;">
			<div class="card-body p-4 table-responsive" style="width: 100%; margin: auto;">

				<!-- Company Details Header -->
				<div class="company-header-box text-center">
					<div class="d-flex justify-content-center align-items-center flex-wrap mb-2">
						<div class="company-logo-wrapper me-3" style="display: none;">
							<img class="company-logo-img" src="" alt="Company Logo"
								onerror="this.parentElement.style.display='none';" />
						</div>
						<div class="text-center">
							<h2 class="company-name-val text-uppercase" style="font-size: 24px;"></h2>
							<div class="text-uppercase fw-bold text-secondary mb-1"
								style="font-size: 12px; letter-spacing: 1.5px;">
								CUSTOMER SAVINGS PASSBOOK
							</div>
						</div>
					</div>
					<div class="company-address-val text-dark fw-semibold mb-1" style="font-size: 13px;"></div>
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
				</div>

				<!-- ROW 1 -->
				<div class="row mb-2">
					<div class="col-6">
						<strong>CUSTOMER NO. :</strong> <span id="customerNo"></span>
					</div>
					<div class="col-6">
						<strong>ACCOUNT NO. :</strong> <span id="accountNo"></span>
					</div>
				</div>

				<!-- ROW 2 -->
				<div class="row mb-2">
					<div class="col-6">
						<strong>ACCOUNT HOLDER NAME :</strong> <span id="customerName"></span>
					</div>
					<div class="col-6">
						<strong>S/D/W/H/O :</strong> <span id="familyDetails"></span>
					</div>
				</div>

				<!-- ROW 3 -->
				<div class="row mb-2">
					<div class="col-6">
						<strong>DATE OF BIRTH :</strong> <span id="dateOfBirth"></span>
					</div>
					<div class="col-6">
						<strong>CONTACT NO. :</strong> <span id="contactNo"></span>
					</div>
				</div>

				<!-- ROW 4 -->
				<div class="row mb-2">
					<div class="col-6">
						<strong>EMAIL ID :</strong> <span id="emailId"></span>
					</div>
					<div class="col-6">
						<strong>MODE OF OPERATION :</strong> <span id="operationType"></span>
					</div>
				</div>

				<!-- ROW 5 -->
				<div class="row mb-2">
					<div class="col-6">
						<strong>AADHAR NO. :</strong> <span id="aadharNo"></span>
					</div>
					<div class="col-6">
						<strong>ADDRESS :</strong> <span id="address"></span>
					</div>
				</div>

				<!-- ROW 6 -->
				<div class="row mb-2">
					<div class="col-6">
						<strong>ACCOUNT TYPE :</strong> <span id="typeofaccount"></span>
					</div>
					<div class="col-6">
						<strong>DATE OF ISSUE :</strong> <span id="dateOfIssue"></span>
					</div>
				</div>

				<!-- ROW 7 -->
				<div class="row mb-4">
					<div class="col-6">
						<strong>BRANCH :</strong> <span id="branchName"></span>
					</div>
					<div class="col-6">
						<strong>UPI :</strong> <span id="upi"></span>
					</div>
				</div>

				<!-- SIGNATURE -->
				<div class="row mt-5">
					<div class="col-12 text-end">
						<hr style="border-color: black; width: 20vw; margin-left: auto;">
						<p class="fw-bold">AUTHORIZED SIGNATURE</p>
					</div>
				</div>

			</div>
		</div>
	</div>
</div>

<!-- ===== HEADING SECTION ===== -->
<div class="row mt-4" id="headingSection" style="display: none;">
	<div class="col-12">
		<div class="card shadow-sm border recent-sales" id="headingId">
			<div class="card-body p-4 table-responsive">

				<!-- Company Details Header -->
				<div class="company-header-box text-center">
					<div class="d-flex justify-content-center align-items-center flex-wrap mb-2">
						<div class="company-logo-wrapper me-3" style="display: none;">
							<img class="company-logo-img" src="" alt="Company Logo"
								onerror="this.parentElement.style.display='none';" />
						</div>
						<div class="text-center">
							<h3 class="company-name-val text-uppercase"></h3>
							<div class="badge bg-danger text-white fw-bold text-uppercase px-3 py-1"
								style="font-size: 11px; letter-spacing: 1px;">
								PASSBOOK PRINT HEADER
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
				</div>

				<table class="table table-bordered align-middle" id="heading-tabl">
					<thead class="table-dark text-nowrap" style="font-size: 13px;">
						<tr>
							<th style="text-align: center; width: 60px;">SR NO</th>
							<th style="text-align: center; width: 110px;">TXN DATE</th>
							<th style="text-align: left;">PARTICULARS / NARRATION</th>
							<th style="text-align: center; width: 110px;">PAY MODE</th>
							<th style="text-align: right; width: 140px;">DEPOSIT / CR (&#8377;)</th>
							<th style="text-align: right; width: 140px;">WITHDRAWAL / DR (&#8377;)</th>
							<th style="text-align: right; width: 150px;">BALANCE (&#8377;)</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<!-- ===== TRANSACTION TABLE ===== -->
<div class="row mt-4" id="TransactionSection" style="display: none;">
	<div class="col-12">
		<div class="card shadow-sm border recent-sales" id="transactionId">
			<div class="card-body p-4 table-responsive">

				<!-- Bank & Account Header for View & Print -->
				<div class="company-header-box" id="txnCustomerHeader">
					<div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-2">
						<div class="d-flex align-items-center flex-wrap gap-3">
							<div class="company-logo-wrapper" style="display: none;">
								<img class="company-logo-img" src="" alt="Company Logo"
									onerror="this.parentElement.style.display='none';" />
							</div>
							<div>
								<h3 class="company-name-val text-uppercase" style="color: #b02a37;"></h3>
								<div class="company-address-val text-muted small mb-1"></div>
								<div class="d-flex flex-wrap gap-2 text-secondary small" style="font-size: 11px;">
									<span class="company-meta-badge"><strong>CIN:</strong> <span
											class="company-cin-val">-</span></span>
									<span>|</span>
									<span class="company-meta-badge"><strong>GSTIN:</strong> <span
											class="company-gstin-val">-</span></span>
									<span>|</span>
									<span class="company-meta-badge"><strong>HELPLINE:</strong> <span
											class="company-helpline-val">-</span></span>
								</div>
							</div>
						</div>
						<div class="text-end">
							<span class="badge bg-primary fs-6 px-3 py-2" id="txnHdrAccountNo">A/C: -</span>
							<p class="text-muted small mb-0 mt-1">CUSTOMER SAVINGS PASSBOOK / TRANSACTION LEDGER</p>
						</div>
					</div>
					<div class="row g-2 mt-2 pt-2 bg-light rounded p-2 text-dark small" id="txnCustDetailsGrid">
						<div class="col-md-4 col-sm-6">
							<strong>CUSTOMER NAME:</strong> <span id="txnHdrCustName">-</span>
						</div>
						<div class="col-md-4 col-sm-6">
							<strong>MEMBER CODE:</strong> <span id="txnHdrMemberCode">-</span>
						</div>
						<div class="col-md-4 col-sm-6">
							<strong>BRANCH:</strong> <span id="txnHdrBranch">-</span>
						</div>
						<div class="col-md-4 col-sm-6">
							<strong>MOBILE NO:</strong> <span id="txnHdrMobile">-</span>
						</div>
						<div class="col-md-4 col-sm-6">
							<strong>ACCOUNT TYPE:</strong> <span id="txnHdrAccType">SAVINGS</span>
						</div>
						<div class="col-md-4 col-sm-6">
							<strong>CURRENT BALANCE:</strong> <span id="txnHdrCurrentBal" class="fw-bold text-success">&#8377; 0.00</span>
						</div>
					</div>
				</div>

				<table class="table table-bordered table-hover align-middle" id="transaction-tabl">
					<thead class="table-dark text-nowrap" style="font-size: 13px;">
						<tr>
							<th style="text-align: center; width: 60px;">SR NO</th>
							<th style="text-align: center; width: 110px;">TXN DATE</th>
							<th style="text-align: left;">PARTICULARS / NARRATION</th>
							<th style="text-align: center; width: 110px;">PAY MODE</th>
							<th style="text-align: right; width: 140px;">DEPOSIT / CR (&#8377;)</th>
							<th style="text-align: right; width: 140px;">WITHDRAWAL / DR (&#8377;)</th>
							<th style="text-align: right; width: 150px;">BALANCE (&#8377;)</th>
						</tr>
					</thead>
					<tbody id="tableBody1" style="font-size: 13px;"></tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<script src="${pageContext.request.contextPath}/js/customerSavings/passbook.js"></script>