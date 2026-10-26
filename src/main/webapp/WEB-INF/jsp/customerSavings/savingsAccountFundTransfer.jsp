<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="pagetitle">
	<h1>SAVING &amp; CURRENT FUND TRANSFER</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"><i class="bi bi-bank text-blue"></i></a></li>
			<li class="breadcrumb-item">CUSTOMER SAVINGS</li>
			<li class="breadcrumb-item active">FUND TRANSFER</li>
		</ol>
	</nav>
</div>

<style>
/* ---- Styling System: Unified Bank Fund Transfer Module ---- */
.transfer-card {
	border-radius: 12px;
	border: 1px solid #e0e6ed;
	box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05);
	margin-bottom: 24px;
	background: #ffffff;
}

.transfer-card-header {
	padding: 14px 20px;
	border-bottom: 1px solid #edf2f7;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #fafbfc;
	border-radius: 12px 12px 0 0;
	text-transform: uppercase;
}

.transfer-card-header h5 {
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
	padding: 8px 14px;
	border-radius: 4px;
	margin: 18px 0 14px 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	text-transform: uppercase !important;
}

.section-debit {
	border-left: 4px solid #0d6efd;
	background: #eff6ff;
	color: #1e40af;
}

.section-credit {
	border-left: 4px solid #16a34a;
	background: #f0fdf4;
	color: #166534;
}

.section-payment {
	border-left: 4px solid #f59e0b;
	background: #fffbeb;
	color: #92400e;
}

/* Global uppercase for all Customer and Account form controls */
.formFields label {
	font-family: 'Poppins', sans-serif;
	font-size: 11px;
	font-weight: 600;
	color: #475569;
	margin-bottom: 4px;
	text-transform: uppercase !important;
	letter-spacing: 0.3px;
}

.formFields input, 
.formFields select, 
.formFields textarea,
.form-control,
.selectField {
	font-family: 'Poppins', sans-serif;
	font-size: 12px;
	border-radius: 6px;
	border: 1px solid #cbd5e1;
	padding: 6px 10px;
	width: 100%;
	transition: all 0.2s ease;
	outline: none;
	text-transform: uppercase !important;
}

.formFields input::placeholder, 
.formFields textarea::placeholder,
.form-control::placeholder {
	text-transform: uppercase !important;
	color: #94a3b8;
}

.formFields input:focus, .formFields select:focus, .formFields textarea:focus {
	border-color: #0d6efd;
	box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.15);
}

.formFields input[readonly], .formFields textarea[readonly] {
	background-color: #f8fafc;
	color: #334155;
	border-color: #e2e8f0;
	cursor: default;
}

/* ---- Account Type & Status Badges ---- */
.badge-saving {
	background: #e0f2fe;
	color: #0369a1;
	border: 1px solid #7dd3fc;
	font-size: 10px;
	font-weight: 700;
	padding: 3px 8px;
	border-radius: 20px;
	display: inline-flex;
	align-items: center;
	gap: 4px;
	text-transform: uppercase !important;
}

.badge-current {
	background: #dcfce7;
	color: #15803d;
	border: 1px solid #86efac;
	font-size: 10px;
	font-weight: 700;
	padding: 3px 8px;
	border-radius: 20px;
	display: inline-flex;
	align-items: center;
	gap: 4px;
	text-transform: uppercase !important;
}

.transfer-route-pill {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 5px 14px;
	border-radius: 20px;
	font-size: 12px;
	font-weight: 800;
	letter-spacing: 0.5px;
	text-transform: uppercase !important;
	background: #fef3c7;
	color: #92400e;
	border: 1px solid #fde68a;
}

/* ---- Summary Stats Badges ---- */
.stat-badge {
	border-radius: 10px;
	padding: 12px 16px;
	display: flex;
	align-items: center;
	gap: 14px;
	color: #fff;
	box-shadow: 0 4px 12px rgba(0,0,0,0.06);
	text-transform: uppercase;
}

.stat-transfers { background: linear-gradient(135deg, #475569, #334155); }
.stat-volume    { background: linear-gradient(135deg, #0284c7, #0369a1); }
.stat-saving    { background: linear-gradient(135deg, #0f766e, #115e59); }
.stat-current   { background: linear-gradient(135deg, #16a34a, #15803d); }

.stat-num {
	font-size: 20px;
	font-weight: 800;
	font-family: 'Poppins', sans-serif;
	line-height: 1;
}

.stat-lbl {
	font-size: 10px;
	font-weight: 600;
	letter-spacing: 0.5px;
	opacity: 0.9;
	text-transform: uppercase !important;
}

/* Projected Balance Preview Box */
.preview-box {
	background: #f8fafc;
	border: 1px dashed #cbd5e1;
	border-radius: 8px;
	padding: 10px 14px;
	margin-top: 10px;
	font-family: 'Poppins', sans-serif;
	font-size: 11px;
	text-transform: uppercase;
}

.preview-box strong {
	font-weight: 700;
}

/* ---- Table Styles ---- */
#fundTransferTable,
#fundTransferTable th,
#fundTransferTable td {
	text-transform: uppercase !important;
}

.action-btn {
	border: none;
	background: transparent;
	padding: 4px 8px;
	border-radius: 4px;
	cursor: pointer;
	transition: background 0.2s;
}

.action-btn:hover { background: #f1f5f9; }

/* Printable Receipt Modal */
@media print {
	body * {
		visibility: hidden;
	}
	#printableReceiptArea, #printableReceiptArea * {
		visibility: visible;
	}
	#printableReceiptArea {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
	}
}
</style>

<!-- ===== SUMMARY STATS COUNTERS ===== -->
<div class="row mb-3" id="transferSummaryStats">
	<div class="col-lg-3 col-6 mb-2">
		<div class="stat-badge stat-transfers">
			<i class="bi bi-arrow-left-right" style="font-size: 26px;"></i>
			<div>
				<div class="stat-num" id="statTotalTransfers">—</div>
				<div class="stat-lbl">TOTAL FUND TRANSFERS</div>
			</div>
		</div>
	</div>
	<div class="col-lg-3 col-6 mb-2">
		<div class="stat-badge stat-volume">
			<i class="bi bi-currency-rupee" style="font-size: 26px;"></i>
			<div>
				<div class="stat-num" id="statTotalVolume">₹ 0.00</div>
				<div class="stat-lbl">TOTAL TRANSFERRED VOLUME</div>
			</div>
		</div>
	</div>
	<div class="col-lg-3 col-6 mb-2">
		<div class="stat-badge stat-saving">
			<i class="bi bi-piggy-bank" style="font-size: 26px;"></i>
			<div>
				<div class="stat-num" id="statSavingTransfers">—</div>
				<div class="stat-lbl">SAVING A/C TRANSFERS</div>
			</div>
		</div>
	</div>
	<div class="col-lg-3 col-6 mb-2">
		<div class="stat-badge stat-current">
			<i class="bi bi-briefcase" style="font-size: 26px;"></i>
			<div>
				<div class="stat-num" id="statCurrentTransfers">—</div>
				<div class="stat-lbl">CURRENT A/C TRANSFERS</div>
			</div>
		</div>
	</div>
</div>

<!-- ===== MAIN TRANSFER FORM CARD ===== -->
<div class="card transfer-card" id="transferFormCard">
	<div class="transfer-card-header">
		<h5>
			<i class="bi bi-arrow-left-right text-primary"></i>
			ACCOUNT-TO-ACCOUNT FUND TRANSFER (SAVING &amp; CURRENT)
		</h5>
		<div class="d-flex align-items-center gap-2">
			<span class="transfer-route-pill" id="transferRouteDisplay">
				<i class="bi bi-arrow-repeat"></i> SELECT ACCOUNTS
			</span>
			<button type="button" class="btn btn-sm btn-outline-secondary" onclick="resetTransferForm()">
				<i class="bi bi-arrow-counterclockwise"></i> RESET
			</button>
		</div>
	</div>

	<div class="card-body p-4">
		<form id="formid" autocomplete="off">

			<!-- ===== SECTION 1: DEBIT ACCOUNT (SOURCE) ===== -->
			<div class="section-divider section-debit">
				<span><i class="bi bi-box-arrow-up-right me-1"></i> 1. DEBIT ACCOUNT DETAILS (TRANSFEROR / SENDER)</span>
				<span id="debitAccountTypeBadge"></span>
			</div>

			<div class="row g-3">
				<div class="col-lg-3 col-md-6">
					<div class="formFields">
						<label>SELECT DEBIT ACCOUNT <span class="text-danger">*</span></label>
						<select id="debitAccountNumber" name="debitAccountNumber" required="required"
							class="form-control selectField" style="height: 34px; font-weight: 600;">
							<option value="">-- SELECT DEBIT ACCOUNT --</option>
						</select>
						<small id="chkdebitAccountNumber" class="text-danger" style="font-size: 11px; font-weight: 600;"></small>
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="formFields">
						<label>CUSTOMER CODE</label>
						<input type="text" name="debitCustomerCode" id="debitCustomerCode"
							readonly="readonly" placeholder="AUTO-POPULATED" />
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="formFields">
						<label>CUSTOMER FULL NAME</label>
						<input type="text" id="debitCustomerName" name="debitCustomerName"
							readonly="readonly" placeholder="AUTO-POPULATED" style="font-weight: 600;" />
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="formFields">
						<label>ACCOUNT BRANCH</label>
						<input type="text" name="debitAccountBranch" id="debitAccountBranch"
							readonly="readonly" placeholder="AUTO-POPULATED" />
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="formFields">
						<label>CURRENT BALANCE (₹)</label>
						<input type="text" name="debitAverageBalance" id="debitAverageBalance"
							readonly="readonly" placeholder="₹ 0.00"
							style="font-weight: 700; color: #0d6efd;" />
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="formFields">
						<label>OVERDRAFT LIMIT (₹)</label>
						<input type="text" id="debitOverdraftLimit" readonly="readonly"
							placeholder="N/A (SAVING A/C)"
							style="font-weight: 700; color: #16a34a;" />
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="formFields">
						<label>TOTAL AVAILABLE FUNDS (₹)</label>
						<input type="text" id="debitMaxAvailable" readonly="readonly"
							placeholder="₹ 0.00"
							style="font-weight: 800; color: #047857;" />
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="formFields">
						<label>CONTACT NUMBER / STATUS</label>
						<div class="d-flex gap-2">
							<input type="text" name="debitContactNumber" id="debitContactNumber"
								readonly="readonly" placeholder="CONTACT NO" />
							<span id="debitStatusBadge" class="align-self-center"></span>
						</div>
					</div>
				</div>
			</div>

			<!-- ===== SECTION 2: CREDIT ACCOUNT (BENEFICIARY) ===== -->
			<div class="section-divider section-credit mt-4">
				<span><i class="bi bi-box-arrow-in-down-left me-1"></i> 2. CREDIT ACCOUNT DETAILS (BENEFICIARY / RECEIVER)</span>
				<span id="creditAccountTypeBadge"></span>
			</div>

			<div class="row g-3">
				<div class="col-lg-3 col-md-6">
					<div class="formFields">
						<label>SELECT CREDIT ACCOUNT <span class="text-danger">*</span></label>
						<select id="creditAccountNumber" name="creditAccountNumber" required="required"
							class="form-control selectField" style="height: 34px; font-weight: 600;">
							<option value="">-- SELECT CREDIT ACCOUNT --</option>
						</select>
						<small id="chkcreditAccountNumber" class="text-danger" style="font-size: 11px; font-weight: 600;"></small>
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="formFields">
						<label>CUSTOMER CODE</label>
						<input type="text" name="creditCustomerCode" id="creditCustomerCode"
							readonly="readonly" placeholder="AUTO-POPULATED" />
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="formFields">
						<label>CUSTOMER FULL NAME</label>
						<input type="text" id="creditCustomerName" name="creditCustomerName"
							readonly="readonly" placeholder="AUTO-POPULATED" style="font-weight: 600;" />
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="formFields">
						<label>ACCOUNT BRANCH</label>
						<input type="text" name="creditAccountBranch" id="creditAccountBranch"
							readonly="readonly" placeholder="AUTO-POPULATED" />
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="formFields">
						<label>CURRENT BALANCE (₹)</label>
						<input type="text" name="creditAverageBalance" id="creditAverageBalance"
							readonly="readonly" placeholder="₹ 0.00"
							style="font-weight: 700; color: #16a34a;" />
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="formFields">
						<label>CONTACT NUMBER / STATUS</label>
						<div class="d-flex gap-2">
							<input type="text" name="creditContactNumber" id="creditContactNumber"
								readonly="readonly" placeholder="CONTACT NO" />
							<span id="creditStatusBadge" class="align-self-center"></span>
						</div>
					</div>
				</div>
			</div>

			<!-- ===== SECTION 3: PAYMENT & TRANSACTION DETAILS ===== -->
			<div class="section-divider section-payment mt-4">
				<span><i class="bi bi-cash-stack me-1"></i> 3. PAYMENT &amp; TRANSACTION INSTRUCTIONS</span>
			</div>

			<div class="row g-3">
				<div class="col-lg-3 col-md-6">
					<div class="formFields">
						<label>TRANSFER DATE <span class="text-danger">*</span></label>
						<input type="date" name="transferDate" id="transferDate" required="required"
							style="height: 34px;" />
						<small id="chktransferDate" class="text-danger" style="font-size: 11px; font-weight: 600;"></small>
					</div>
				</div>

				<div class="col-lg-3 col-md-6">
					<div class="formFields">
						<label>TRANSFER AMOUNT (₹) <span class="text-danger">*</span></label>
						<input type="number" step="0.01" min="1" name="amount" id="amount" required="required"
							placeholder="ENTER TRANSFER AMOUNT"
							style="font-weight: 700; height: 34px; font-size: 14px; color: #b45309;" />
						<small id="chkamount" class="text-danger" style="font-size: 11px; font-weight: 600;"></small>
					</div>
				</div>

				<div class="col-lg-6 col-md-12">
					<div class="formFields">
						<label>COMMENT / TRANSACTION REMARKS</label>
						<textarea name="comment" id="comment" rows="1"
							placeholder="E.G. INTERNAL FUND TRANSFER / INVOICE SETTLEMENT"
							style="resize: none; text-transform: uppercase; height: 34px;"></textarea>
					</div>
				</div>
			</div>

			<!-- Real-time Dynamic Balance Preview -->
			<div class="preview-box mt-3" id="balancePreviewCard" style="display: none;">
				<div class="row align-items-center">
					<div class="col-md-6">
						<i class="bi bi-box-arrow-up-right text-danger"></i>
						<span>SENDER (DEBIT) PROJECTED BALANCE: </span>
						<strong id="previewDebitAfter" class="ms-1">₹ 0.00</strong>
					</div>
					<div class="col-md-6 text-md-end">
						<i class="bi bi-box-arrow-in-down-left text-success"></i>
						<span>BENEFICIARY (CREDIT) PROJECTED BALANCE: </span>
						<strong id="previewCreditAfter" class="ms-1 text-success">₹ 0.00</strong>
					</div>
				</div>
			</div>

			<!-- Submission Actions -->
			<div class="row mt-4">
				<div class="col-12 text-end">
					<button type="button" class="btn btn-outline-secondary me-2" onclick="resetTransferForm()"
						style="font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600; padding: 8px 20px; text-transform: uppercase;">
						<i class="bi bi-x-circle"></i> CANCEL / CLEAR
					</button>
					<button type="button" id="saveBtn" class="btn btn-primary"
						style="font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600; padding: 8px 28px; text-transform: uppercase;">
						<i class="bi bi-send-check"></i> PROCESS FUND TRANSFER
					</button>
				</div>
			</div>
		</form>
	</div>
</div>

<!-- ===== SECTION 4: RECENT FUND TRANSFERS DATATABLE ===== -->
<div class="card transfer-card">
	<div class="transfer-card-header">
		<h5>
			<i class="bi bi-clock-history text-primary"></i>
			RECENT FUND TRANSFER RECORDS &amp; AUDIT LOG
		</h5>
		<span class="badge bg-secondary" id="transferRecordCount" style="font-size: 11px; text-transform: uppercase;">0 TRANSFERS FOUND</span>
	</div>

	<div class="card-body p-3">
		<!-- Search & Filter Bar -->
		<div class="row g-2 mb-3">
			<div class="col-lg-5 col-md-6">
				<input type="text" id="searchTransferInput" class="form-control"
					placeholder="SEARCH BY ACCOUNT NO / CUSTOMER / REF ID..."
					style="height: 34px; font-size: 12px;" oninput="filterTransfersTable()">
			</div>
			<div class="col-lg-3 col-md-3 col-6">
				<select id="filterTransferType" class="form-control selectField" style="height: 34px; font-size: 12px;"
					onchange="filterTransfersTable()">
					<option value="">ALL TRANSFER TYPES</option>
					<option value="SAVING_TO_SAVING">SAVING ➔ SAVING</option>
					<option value="SAVING_TO_CURRENT">SAVING ➔ CURRENT</option>
					<option value="CURRENT_TO_SAVING">CURRENT ➔ SAVING</option>
					<option value="CURRENT_TO_CURRENT">CURRENT ➔ CURRENT</option>
				</select>
			</div>
			<div class="col-lg-2 col-md-3 col-6">
				<input type="date" id="filterTransferDate" class="form-control" style="height: 34px; font-size: 12px;"
					onchange="filterTransfersTable()">
			</div>
			<div class="col-lg-2 col-12 text-end">
				<button type="button" class="btn btn-outline-secondary btn-sm w-100" style="height: 34px; font-weight: 600; text-transform: uppercase;"
					onclick="clearTransferFilters()">
					<i class="bi bi-x-circle"></i> CLEAR FILTERS
				</button>
			</div>
		</div>

		<!-- Table -->
		<div class="table-responsive">
			<table class="table table-bordered table-hover align-middle mb-0" id="fundTransferTable"
				style="font-size: 12px; font-family: 'Poppins', sans-serif;">
				<thead class="table-light" style="font-size: 11px; font-weight: 700; text-transform: uppercase;">
					<tr>
						<th class="text-center" style="width: 45px;">#</th>
						<th>DATE</th>
						<th>DEBIT ACCOUNT (SENDER)</th>
						<th>CREDIT ACCOUNT (RECEIVER)</th>
						<th>TRANSFER TYPE</th>
						<th class="text-end">AMOUNT (₹)</th>
						<th class="text-end">DEBIT BAL AFTER</th>
						<th class="text-end">CREDIT BAL AFTER</th>
						<th class="text-center">STATUS</th>
						<th>REMARKS</th>
						<th class="text-center" style="width: 70px;">ACTION</th>
					</tr>
				</thead>
				<tbody id="fundTransferTableBody">
					<tr>
						<td colspan="11" class="text-center py-4" style="color: #94a3b8; text-transform: uppercase;">
							<i class="bi bi-hourglass-split"></i> LOADING TRANSFER RECORDS...
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>

<!-- ===== TRANSFER RECEIPT / ADVICE MODAL ===== -->
<div class="modal fade" id="receiptModal" tabindex="-1" aria-labelledby="receiptModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content" style="border-radius: 12px;">
			<div class="modal-header py-3" style="background: #fafbfc; border-bottom: 1px solid #e2e8f0;">
				<h6 class="modal-title fw-bold" id="receiptModalLabel" style="font-family: 'Poppins', sans-serif; text-transform: uppercase;">
					<i class="bi bi-receipt-cutoff text-primary me-2"></i> BANK FUND TRANSFER ADVICE / RECEIPT
				</h6>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body p-4" id="printableReceiptArea">
				<!-- Injected dynamically by JS -->
			</div>
			<div class="modal-footer py-2" style="background: #fafbfc; border-top: 1px solid #e2e8f0;">
				<button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal"
					style="font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600; text-transform: uppercase;">
					<i class="bi bi-x"></i> CLOSE
				</button>
				<button type="button" class="btn btn-primary btn-sm" onclick="printReceipt()"
					style="font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600; text-transform: uppercase;">
					<i class="bi bi-printer"></i> PRINT ADVICE
				</button>
			</div>
		</div>
	</div>
</div>

<script src="${pageContext.request.contextPath}/js/customerSavings/SavingAccountFundTransfer.js?v=<%= System.currentTimeMillis() %>"></script>