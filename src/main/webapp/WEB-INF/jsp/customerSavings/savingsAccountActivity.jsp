<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="pagetitle">
	<h1>SAVINGS &amp; CURRENT ACCOUNT ACTIVITY</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-bank text-blue"></i>
			</a></li>
			<li class="breadcrumb-item">CUSTOMER SAVINGS</li>
			<li class="breadcrumb-item active">DEPOSIT / WITHDRAWAL TRANSACTIONS</li>
		</ol>
	</nav>
</div>

<style>
/* ---- Modern Banking UI System ---- */
.activity-card {
	border-radius: 12px;
	border: 1px solid #e2e8f0;
	box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04);
	margin-bottom: 24px;
	background: #ffffff;
}

.activity-header {
	padding: 14px 20px;
	border-bottom: 1px solid #edf2f7;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #fafbfc;
	border-radius: 12px 12px 0 0;
	text-transform: uppercase;
}

.activity-header h5 {
	margin: 0;
	font-family: 'Poppins', sans-serif;
	font-weight: 700;
	font-size: 15px;
	color: #1e293b;
	display: flex;
	align-items: center;
	gap: 8px;
	text-transform: uppercase;
}

.section-divider {
	font-family: 'Poppins', sans-serif;
	font-size: 13px;
	font-weight: 700;
	color: #0f172a;
	padding: 8px 14px;
	background: #f1f5f9;
	border-left: 4px solid #0d6efd;
	border-radius: 4px;
	margin: 18px 0 14px 0;
	display: flex;
	align-items: center;
	gap: 8px;
	text-transform: uppercase !important;
}

.section-divider.payment-accent {
	border-left-color: #10b981;
	background: #ecfdf5;
	color: #065f46;
}

.section-divider.details-accent {
	border-left-color: #6366f1;
	background: #eef2ff;
	color: #3730a3;
}

/* Account Overview Card */
.acc-overview-banner {
	background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
	color: #ffffff;
	border-radius: 12px;
	padding: 18px 22px;
	margin-bottom: 22px;
	display: none;
	align-items: center;
	justify-content: space-between;
	box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.25);
}

.acc-overview-info h4 {
	margin: 0 0 4px 0;
	font-size: 18px;
	font-weight: 700;
	letter-spacing: 0.5px;
	text-transform: uppercase;
}

.acc-overview-info p {
	margin: 0;
	font-size: 12px;
	color: #94a3b8;
	text-transform: uppercase;
}

.acc-overview-balance {
	text-align: right;
}

.acc-overview-balance .lbl {
	font-size: 11px;
	color: #94a3b8;
	text-transform: uppercase;
	margin-bottom: 2px;
}

.acc-overview-balance .val {
	font-size: 26px;
	font-weight: 800;
	color: #10b981;
	font-family: 'Poppins', sans-serif;
}

/* Form Fields */
.formFields label {
	font-family: 'Poppins', sans-serif;
	font-size: 12px;
	font-weight: 600;
	color: #334155;
	margin-bottom: 5px;
	text-transform: uppercase !important;
}

.formFields input,
.formFields select,
.formFields textarea {
	font-family: 'Poppins', sans-serif;
	font-size: 13px;
	border: 1px solid #cbd5e1;
	border-radius: 6px;
	padding: 6px 12px;
	height: 38px;
	color: #0f172a;
	transition: all 0.2s ease-in-out;
	text-transform: uppercase !important;
	background-color: #ffffff;
}

.formFields input:focus,
.formFields select:focus {
	border-color: #3b82f6;
	outline: none;
	box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.formFields input[readonly] {
	background-color: #f8fafc;
	color: #475569;
	cursor: not-allowed;
	border-color: #e2e8f0;
}

.formFields input::placeholder {
	text-transform: uppercase !important;
	color: #94a3b8;
	font-size: 12px;
}

/* Badges for Transaction Table */
.badge-credit {
	background-color: #d1fae5;
	color: #065f46;
	border: 1px solid #a7f3d0;
	font-weight: 700;
	padding: 5px 10px;
	border-radius: 6px;
	font-size: 11px;
	text-transform: uppercase;
	display: inline-flex;
	align-items: center;
	gap: 4px;
}

.badge-debit {
	background-color: #fee2e2;
	color: #991b1b;
	border: 1px solid #fecaca;
	font-weight: 700;
	padding: 5px 10px;
	border-radius: 6px;
	font-size: 11px;
	text-transform: uppercase;
	display: inline-flex;
	align-items: center;
	gap: 4px;
}

.badge-mode {
	background-color: #f1f5f9;
	color: #334155;
	border: 1px solid #e2e8f0;
	font-weight: 600;
	padding: 3px 8px;
	border-radius: 4px;
	font-size: 10px;
	text-transform: uppercase;
}

/* Denomination Box */
#memberFeesTable {
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;
	min-width: 290px;
	z-index: 1050;
	background: #ffffff;
	border-radius: 8px;
	box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
	border: 1px solid #cbd5e1;
	display: none;
	margin-top: 5px;
}

#memberFeesTable th {
	background-color: #f8fafc;
	font-weight: 700;
	color: #1e293b;
	text-transform: uppercase;
	padding: 6px 8px;
	font-size: 11px;
}

#memberFeesTable td {
	padding: 4px 6px;
	font-size: 12px;
	vertical-align: middle;
}

/* Table Card */
.txn-table-card {
	border-radius: 12px;
	border: 1px solid #e2e8f0;
	box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04);
	background: #ffffff;
	margin-top: 25px;
}

.txn-table-card .card-header {
	background: #ffffff;
	border-bottom: 1px solid #edf2f7;
	padding: 16px 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.txn-table-card .card-title {
	margin: 0;
	font-family: 'Poppins', sans-serif;
	font-weight: 700;
	font-size: 15px;
	color: #1e293b;
	text-transform: uppercase;
}
</style>

<!-- Live Account Summary Banner -->
<div id="accOverviewBanner" class="acc-overview-banner">
	<div class="acc-overview-info">
		<h4 id="overviewAccTitle"><i class="bi bi-person-circle"></i> <span id="bannerCustomerName">--</span></h4>
		<p>
			ACCOUNT: <span id="bannerAccountNo" class="text-white fw-bold">--</span> | 
			CUSTOMER CODE: <span id="bannerCustomerCode" class="text-white">--</span> | 
			BRANCH: <span id="bannerBranch" class="text-white">--</span> | 
			PLAN: <span id="bannerPlan" class="text-warning fw-bold">--</span>
		</p>
	</div>
	<div class="acc-overview-balance">
		<div class="lbl">CURRENT AVAILABLE BALANCE</div>
		<div class="val" id="bannerBalance">₹ 0.00</div>
	</div>
</div>

<div class="activity-card">
	<div class="activity-header">
		<h5><i class="bi bi-arrow-left-right text-primary"></i> DEPOSIT / WITHDRAWAL TRANSACTION FORM</h5>
		<span class="badge bg-primary" style="font-size: 11px; text-transform: uppercase;">
			<i class="bi bi-shield-check"></i> VERIFIED TRANSACTION CONSOLE
		</span>
	</div>

	<div class="card-body p-4">
		<form id="formid" autocomplete="off">

			<!-- SECTION 1: ACCOUNT SELECTION & DETAILS -->
			<div class="section-divider details-accent">
				<i class="bi bi-wallet2"></i> 1. ACCOUNT SELECTION &amp; MASTER DETAILS
			</div>

			<div class="row">
				<div class="col-lg-3 col-md-6">
					<div class="d-flex flex-column formFields mb-3">
						<label for="accountNumber">ACCOUNT NUMBER <span class="text-danger">*</span></label>
						<select id="accountNumber" name="accountNumber"
							class="form-control selectField account-select" required>
							<option value="">-- SELECT ACCOUNT NUMBER --</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="d-flex flex-column formFields mb-3">
						<label for="selectSavingTransactionId">SAVING TRANSACTION ID</label>
						<input type="text" name="selectSavingTransactionId" id="selectSavingTransactionId"
							readonly="readonly" required="required" value="${transactionCode}"
							placeholder="SYSTEM ASSIGNED TXN ID" />
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="d-flex flex-column formFields mb-3">
						<label for="transactionDate">TRANSACTION DATE <span class="text-danger">*</span></label>
						<input type="date" name="transactionDate" id="transactionDate" required="required" />
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="d-flex flex-column formFields mb-3">
						<label for="selectBranchName">BRANCH NAME</label>
						<input type="text" readonly="readonly" name="selectBranchName" id="selectBranchName"
							placeholder="BRANCH NAME" />
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="d-flex flex-column formFields mb-3">
						<label for="customerCode">CUSTOMER CODE</label>
						<input type="text" readonly="readonly" name="customerCode" id="customerCode"
							placeholder="CUSTOMER CODE" />
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="d-flex flex-column formFields mb-3">
						<label for="customerName">CUSTOMER NAME</label>
						<input type="text" readonly="readonly" name="customerName" id="customerName"
							placeholder="CUSTOMER NAME" />
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="d-flex flex-column formFields mb-3">
						<label for="contactNumber">CONTACT NUMBER</label>
						<input type="text" readonly="readonly" name="contactNumber" id="contactNumber"
							placeholder="CONTACT NUMBER" />
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="d-flex flex-column formFields mb-3">
						<label for="jointHolderName">JOINT HOLDER NAME</label>
						<input type="text" readonly="readonly" name="jointHolderName" id="jointHolderName"
							placeholder="JOINT HOLDER NAME" />
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="d-flex flex-column formFields mb-3">
						<label for="savingPlanName">ACCOUNT TYPE</label>
						<input type="text" readonly="readonly" name="savingPlanName" id="savingPlanName"
							placeholder="SAVING / CURRENT ACCOUNT" />
					</div>
				</div>
			</div>

			<!-- SECTION 2: TRANSACTION SPECIFICATIONS -->
			<div class="section-divider">
				<i class="bi bi-cash-stack"></i> 2. TRANSACTION SPECIFICATIONS &amp; AMOUNT
			</div>

			<div class="row">
				<div class="col-lg-3 col-md-6">
					<div class="d-flex flex-column formFields mb-3">
						<label for="averageBalance">CURRENT AVAILABLE BALANCE (₹)</label>
						<input type="text" name="averageBalance" id="averageBalance" readonly="readonly"
							placeholder="0.00" style="font-weight: 700; color: #0f172a;" />
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="d-flex flex-column formFields mb-3">
						<label for="transactionType">TRANSACTION TYPE <span class="text-danger">*</span></label>
						<select id="transactionType" name="transactionType" required="required"
							class="form-control selectField">
							<option value="">-- SELECT TRANSACTION TYPE --</option>
							<option value="Deposit">DEPOSIT (CREDIT)</option>
							<option value="Withdraw">WITHDRAWAL (DEBIT)</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3 col-md-6" style="position: relative;">
					<div class="d-flex flex-column formFields mb-3">
						<label for="transactionAmount">TRANSACTION AMOUNT (₹) <span class="text-danger">*</span></label>
						<div class="input-group">
							<input type="number" step="0.01" min="0" name="transactionAmount" id="transactionAmount"
								class="form-control" required="required" placeholder="ENTER AMOUNT"
								style="font-weight: 700; font-size: 14px;" />
							<button class="btn btn-outline-secondary" type="button" id="btnToggleDenomination"
								title="CALCULATE CASH DENOMINATIONS">
								<i class="bi bi-calculator"></i>
							</button>
						</div>
						<span id="balanceError" style="color: #dc2626; font-size: 12px; font-weight: 600; margin-top: 4px; text-transform: uppercase;"></span>
					</div>

					<!-- Floating Denomination Calculator Box -->
					<div id="memberFeesTable">
						<div class="p-2 border-bottom d-flex justify-content-between align-items-center bg-light">
							<span class="fw-bold" style="font-size: 11px; text-transform: uppercase;">
								<i class="bi bi-cash-coin"></i> CASH DENOMINATION SHEET
							</span>
							<button type="button" class="btn-close btn-sm" id="btnCloseDenomination" aria-label="Close" style="font-size: 10px;"></button>
						</div>
						<div class="p-2">
							<table class="table table-sm table-bordered mb-2">
								<thead>
									<tr>
										<th>NOTE</th>
										<th>QTY</th>
										<th>SUBTOTAL</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>₹2000</td>
										<td><input type="number" id="qty2000" min="0" value="0" class="form-control form-control-sm text-center" oninput="calcOpeningFees()"></td>
										<td>₹<span id="res2000">0</span></td>
									</tr>
									<tr>
										<td>₹500</td>
										<td><input type="number" id="qty500" min="0" value="0" class="form-control form-control-sm text-center" oninput="calcOpeningFees()"></td>
										<td>₹<span id="res500">0</span></td>
									</tr>
									<tr>
										<td>₹200</td>
										<td><input type="number" id="qty200" min="0" value="0" class="form-control form-control-sm text-center" oninput="calcOpeningFees()"></td>
										<td>₹<span id="res200">0</span></td>
									</tr>
									<tr>
										<td>₹100</td>
										<td><input type="number" id="qty100" min="0" value="0" class="form-control form-control-sm text-center" oninput="calcOpeningFees()"></td>
										<td>₹<span id="res100">0</span></td>
									</tr>
									<tr>
										<td>₹50</td>
										<td><input type="number" id="qty50" min="0" value="0" class="form-control form-control-sm text-center" oninput="calcOpeningFees()"></td>
										<td>₹<span id="res50">0</span></td>
									</tr>
									<tr>
										<td>₹20</td>
										<td><input type="number" id="qty20" min="0" value="0" class="form-control form-control-sm text-center" oninput="calcOpeningFees()"></td>
										<td>₹<span id="res20">0</span></td>
									</tr>
									<tr>
										<td>₹10</td>
										<td><input type="number" id="qty10" min="0" value="0" class="form-control form-control-sm text-center" oninput="calcOpeningFees()"></td>
										<td>₹<span id="res10">0</span></td>
									</tr>
									<tr>
										<td>₹5</td>
										<td><input type="number" id="qty5" min="0" value="0" class="form-control form-control-sm text-center" oninput="calcOpeningFees()"></td>
										<td>₹<span id="res5">0</span></td>
									</tr>
									<tr class="table-primary fw-bold">
										<td colspan="2">TOTAL CASH AMOUNT</td>
										<td>₹<span id="totalFee">0</span></td>
									</tr>
								</tbody>
							</table>
							<button type="button" class="btn btn-sm btn-primary w-100" id="btnApplyDenomination">
								<i class="bi bi-check-lg"></i> APPLY TOTAL TO AMOUNT
							</button>
						</div>
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="d-flex flex-column formFields mb-3">
						<label for="transactionFor">TRANSACTION FOR</label>
						<input type="text" name="transactionFor" id="transactionFor" required="required"
							placeholder="E.G. MONTHLY SAVINGS, CASH DEPOSIT" />
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="d-flex flex-column formFields mb-3">
						<label for="comments">TRANSACTION NARRATION / COMMENTS</label>
						<select id="comments" name="comments" required="required" class="form-control selectField">
							<option value="">-- SELECT NARRATION --</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="d-flex flex-column formFields mb-3">
						<label for="payBy">PAYMENT MODE <span class="text-danger">*</span></label>
						<select id="payBy" name="payBy" required="required" class="form-control selectField">
							<option value="">-- SELECT PAYMENT MODE --</option>
							<option value="Cash" selected>CASH</option>
							<option value="Cheque">CHEQUE</option>
							<option value="Online">ONLINE / UPI</option>
							<option value="NEFT">NEFT / RTGS</option>
						</select>
					</div>
				</div>
			</div>

			<!-- SECTION 3: INSTRUMENT CLEARANCE DETAILS -->
			<div id="paymentInstrumentSection">
				<!-- Cheque input fields -->
				<div id="chequeInputs" style="display: none;">
					<div class="section-divider payment-accent">
						<i class="bi bi-card-checklist"></i> 3. CHEQUE CLEARANCE DETAILS
					</div>
					<div class="row">
						<div class="col-lg-4 col-md-6">
							<div class="d-flex flex-column formFields mb-3">
								<label for="chequeNo">CHEQUE NO. <span class="text-danger">*</span></label>
								<input type="text" name="chequeNo" id="chequeNo" placeholder="ENTER 6-DIGIT CHEQUE NO." />
							</div>
						</div>
						<div class="col-lg-4 col-md-6">
							<div class="d-flex flex-column formFields mb-3">
								<label for="chequeDate">CHEQUE DATE <span class="text-danger">*</span></label>
								<input type="date" name="chequeDate" id="chequeDate" />
							</div>
						</div>
						<div class="col-lg-4 col-md-6">
							<div class="d-flex flex-column formFields mb-3">
								<label for="depositAcc1">DEPOSIT A/C NO. <span class="text-danger">*</span></label>
								<input type="text" name="depositAcc1" id="depositAcc1" placeholder="ENTER CLEARING BANK A/C" />
							</div>
						</div>
					</div>
				</div>

				<!-- Online input fields -->
				<div id="onlineInputs" style="display: none;">
					<div class="section-divider payment-accent">
						<i class="bi bi-globe2"></i> 3. ONLINE / UPI TRANSFER DETAILS
					</div>
					<div class="row">
						<div class="col-lg-6 col-md-6">
							<div class="d-flex flex-column formFields mb-3">
								<label for="depositAcc2">DEPOSIT A/C NO.</label>
								<input type="text" name="depositAcc2" id="depositAcc2" placeholder="ENTER BENEFICIARY A/C" />
							</div>
						</div>
						<div class="col-lg-6 col-md-6">
							<div class="d-flex flex-column formFields mb-3">
								<label for="refNumber1">UPI / TRANSACTION REF NO. <span class="text-danger">*</span></label>
								<input type="text" name="refNumber1" id="refNumber1" placeholder="ENTER 12-DIGIT UTR / REF NO." />
							</div>
						</div>
					</div>
				</div>

				<!-- NEFT input fields -->
				<div id="neftInputs" style="display: none;">
					<div class="section-divider payment-accent">
						<i class="bi bi-bank"></i> 3. NEFT / RTGS CLEARANCE DETAILS
					</div>
					<div class="row">
						<div class="col-lg-6 col-md-6">
							<div class="d-flex flex-column formFields mb-3">
								<label for="depositAcc3">DEPOSIT A/C NO.</label>
								<input type="text" name="depositAcc3" id="depositAcc3" placeholder="ENTER SETTLEMENT BANK A/C" />
							</div>
						</div>
						<div class="col-lg-6 col-md-6">
							<div class="d-flex flex-column formFields mb-3">
								<label for="refNumber2">NEFT / RTGS UTR NO. <span class="text-danger">*</span></label>
								<input type="text" name="refNumber2" id="refNumber2" placeholder="ENTER BANK UTR NUMBER" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- ACTION BUTTONS -->
			<div class="row mt-4 pt-3 border-top">
				<div class="col-12 d-flex justify-content-end gap-2">
					<button type="button" id="resetBtn" class="btn btn-light px-4" style="text-transform: uppercase;">
						<i class="bi bi-arrow-counterclockwise"></i> RESET FORM
					</button>
					<button type="button" id="saveBtn" class="btn btn-primary px-4 fw-bold" style="text-transform: uppercase;">
						<i class="bi bi-check-circle-fill"></i> POST TRANSACTION
					</button>
				</div>
			</div>
		</form>
	</div>
</div>

<!-- SECTION 4: RECENT ACCOUNT TRANSACTIONS TABLE -->
<div class="txn-table-card">
	<div class="card-header">
		<h5 class="card-title">
			<i class="bi bi-table text-primary"></i> ACCOUNT TRANSACTION LEDGER 
			<span id="recordCount" class="badge bg-secondary ms-2" style="font-size: 11px; text-transform: uppercase;">0 TRANSACTIONS</span>
		</h5>
		<button type="button" id="btnRefreshTable" class="btn btn-sm btn-outline-primary" style="text-transform: uppercase;">
			<i class="bi bi-arrow-repeat"></i> REFRESH LEDGER
		</button>
	</div>

	<div class="card-body p-3 table-responsive">
		<table class="table table-hover table-striped align-middle datatable mb-0">
			<thead class="table-light">
				<tr style="font-family: 'Poppins', sans-serif; font-size: 12px;">
					<th style="white-space: nowrap;">#</th>
					<th style="white-space: nowrap;">TXN ID</th>
					<th style="white-space: nowrap;">TXN DATE</th>
					<th style="white-space: nowrap;">BRANCH</th>
					<th style="white-space: nowrap;">ACCOUNT NO</th>
					<th style="white-space: nowrap;">TYPE</th>
					<th style="white-space: nowrap;">AMOUNT (₹)</th>
					<th style="white-space: nowrap;">RUNNING BALANCE (₹)</th>
					<th style="white-space: nowrap;">PAY MODE</th>
					<th style="white-space: nowrap;">NARRATION / REMARKS</th>
					<th style="white-space: nowrap;">POSTED BY</th>
				</tr>
			</thead>
			<tbody id="tbody">
				<tr>
					<td colspan="11" class="text-center py-4 text-muted" style="text-transform: uppercase;">
						<i class="bi bi-inbox fs-4 d-block mb-1"></i> SELECT AN ACCOUNT NUMBER TO VIEW TRANSACTION HISTORY.
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<script src="${pageContext.request.contextPath}/js/customerSavings/SavingAccountActivity.js"></script>