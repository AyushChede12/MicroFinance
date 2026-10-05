<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<style>
.foreclosure-summary-card {
	background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
	color: #fff;
	border-radius: 12px;
	padding: 20px 25px;
	margin-bottom: 25px;
	box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
}
.foreclosure-stat-box {
	background: rgba(255, 255, 255, 0.07);
	backdrop-filter: blur(8px);
	border: 1px solid rgba(255, 255, 255, 0.12);
	border-radius: 8px;
	padding: 12px 16px;
	text-align: center;
}
.foreclosure-stat-label {
	font-size: 11px;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	color: #94a3b8;
	margin-bottom: 4px;
}
.foreclosure-stat-val {
	font-size: 18px;
	font-weight: 700;
	color: #f8fafc;
}
.foreclosure-stat-val.highlight {
	font-size: 22px;
	color: #38bdf8;
}
.foreclosure-badge {
	display: inline-block;
	font-size: 11px;
	font-weight: 600;
	padding: 4px 10px;
	border-radius: 20px;
}
.badge-collateral-active {
	background-color: #fef08a;
	color: #854d0e;
	border: 1px solid #facc15;
}
.badge-collateral-none {
	background-color: #f1f5f9;
	color: #64748b;
}
.settlement-modal-header {
	background: linear-gradient(135deg, #059669 0%, #047857 100%);
	color: white;
	border-radius: 12px 12px 0 0;
	padding: 18px 24px;
}
.printable-receipt {
	font-family: 'Courier New', Courier, monospace;
	background: #fff;
	color: #000;
	padding: 20px;
	border: 1px dashed #cbd5e1;
	border-radius: 8px;
}
</style>

<div class="pagetitle">
	<h1>LOAN MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-cash-coin"></i>
			</a></li>
			<li class="breadcrumb-item">LOAN MANAGEMENT</li>
			<li class="breadcrumb-item active">EARLY LOAN CLOSURE</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<input type="hidden" id="memberName" name="memberName">
		<input type="hidden" id="charges" name="charges" value="0.00">

		<!-- 1. SEARCH SECTION -->
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH ACTIVE LOAN</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-4">
					<div class="d-flex flex-column formFields mb-4">
						<label for="earlyLoanclosureId">FIND BY LOAN ID <span style="color:red">*</span></label>
						<select id="earlyLoanclosureId" name="earlyLoanclosureId"
							required="required" class="form-control selectField"
							style="height: 34px;">
							<option value="">SELECT LOAN ID</option>
						</select>
					</div>
				</div>
				<div class="col-lg-8 d-flex align-items-center mb-4">
					<div id="collateralStatusBadgeContainer" style="display: none;">
						<span class="foreclosure-badge" id="collateralStatusBadge"></span>
						<small id="collateralDetailText" class="text-muted ms-2"></small>
					</div>
				</div>
			</div>
		</div>

		<!-- 2. LOAN SUMMARY CARD (DYNAMIC SETTLEMENT BREAKDOWN) -->
		<div id="settlementSummaryCard" class="foreclosure-summary-card" style="display: none;">
			<div class="d-flex justify-content-between align-items-center mb-3">
				<div>
					<h5 class="m-0 fw-bold text-white"><i class="bi bi-calculator me-2"></i>FORECLOSURE SETTLEMENT STATEMENT</h5>
					<small class="text-slate-400" id="calculationConventionNote">Day-count: Actual/365 &bull; Server-Verified</small>
				</div>
				<span class="badge bg-primary px-3 py-2 fs-6" id="summaryLoanIdBadge"></span>
			</div>
			<div class="row g-3">
				<div class="col-md-2 col-sm-4 col-6">
					<div class="foreclosure-stat-box">
						<div class="foreclosure-stat-label">Sanctioned Loan</div>
						<div class="foreclosure-stat-val" id="summarySanctioned">₹0.00</div>
					</div>
				</div>
				<div class="col-md-2 col-sm-4 col-6">
					<div class="foreclosure-stat-box">
						<div class="foreclosure-stat-label">Principal Paid</div>
						<div class="foreclosure-stat-val text-success" id="summaryPrincipalPaid">₹0.00</div>
					</div>
				</div>
				<div class="col-md-2 col-sm-4 col-6">
					<div class="foreclosure-stat-box">
						<div class="foreclosure-stat-label">Principal Due</div>
						<div class="foreclosure-stat-val text-warning" id="summaryPrincipalDue">₹0.00</div>
					</div>
				</div>
				<div class="col-md-2 col-sm-4 col-6">
					<div class="foreclosure-stat-box">
						<div class="foreclosure-stat-label">Accrued Interest</div>
						<div class="foreclosure-stat-val" id="summaryAccruedInterest">₹0.00</div>
						<small class="text-info" style="font-size: 10px;" id="summaryElapsedDays">(0 days)</small>
					</div>
				</div>
				<div class="col-md-2 col-sm-4 col-6">
					<div class="foreclosure-stat-box">
						<div class="foreclosure-stat-label">Arrears / Fines</div>
						<div class="foreclosure-stat-val text-danger" id="summaryArrearsFines">₹0.00</div>
					</div>
				</div>
				<div class="col-md-2 col-sm-4 col-6">
					<div class="foreclosure-stat-box" style="background: rgba(56, 189, 248, 0.15); border-color: rgba(56, 189, 248, 0.4);">
						<div class="foreclosure-stat-label" style="color: #38bdf8; font-weight: 700;">NET PAYOFF AMOUNT</div>
						<div class="foreclosure-stat-val highlight" id="summaryNetPayoff">₹0.00</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 3. LOAN DETAILS (READ-ONLY) -->
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">LOAN ACCOUNT DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanDate">DATE OF LOAN</label> <input type="date"
							name="loanDate" id="loanDate" readonly="readonly" style="background-color: #f8f9fa;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="memberId">BORROWER ID & NAME</label> <input type="text"
							name="memberId" id="memberId" readonly="readonly"
							placeholder="BORROWER ID & NAME" style="text-transform: uppercase; background-color: #f8f9fa;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="relativeDetails">FAMILY MEMBER NAME</label> <input
							type="text" name="relativeDetails" id="relativeDetails"
							readonly="readonly" placeholder="FAMILY MEMBER NAME"
							style="text-transform: uppercase; background-color: #f8f9fa;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="contactNo">CONTACT NO.</label> <input type="text"
							name="contactNo" id="contactNo" readonly="readonly"
							placeholder="CONTACT NO." style="text-transform: uppercase; background-color: #f8f9fa;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="branchName">BRANCH NAME</label> <input type="text"
							name="branchName" id="branchName" readonly="readonly"
							placeholder="BRANCH NAME" style="text-transform: uppercase; background-color: #f8f9fa;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanPlanName">LOAN PLAN NAME</label> <input type="text"
							name="loanPlanName" id="loanPlanName" readonly="readonly"
							placeholder="LOAN PLAN NAME" style="background-color: #f8f9fa;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanTerm">LOAN TERM</label> <input type="text" name="loanTerm"
							id="loanTerm" readonly="readonly" placeholder="LOAN TERM" style="background-color: #f8f9fa;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanMode">LOAN MODE / FREQUENCY</label> <input type="text" name="loanMode"
							id="loanMode" readonly="readonly" placeholder="LOAN MODE" style="background-color: #f8f9fa;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanAmount">AMOUNT OF LOAN (₹)</label> <input type="text"
							name="loanAmount" id="loanAmount" readonly="readonly"
							placeholder="AMOUNT OF LOAN" style="background-color: #f8f9fa;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="rateOfInterest">RATE OF INTEREST (%)</label> <input
							type="text" name="rateOfInterest" id="rateOfInterest"
							readonly="readonly" placeholder="ROI"
							style="text-transform: uppercase; background-color: #f8f9fa;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="interestType">INTEREST TYPE</label> <input type="text"
							name="interestType" id="interestType" readonly="readonly"
							placeholder="INTEREST TYPE" style="text-transform: uppercase; background-color: #f8f9fa;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="emiPayment">EMI AMOUNT (₹)</label> <input type="text"
							name="emiPayment" id="emiPayment" readonly="readonly"
							placeholder="EMI PAYMENT" style="text-transform: uppercase; background-color: #f8f9fa;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="sanctionedAmount">SANCTIONED AMOUNT (₹)</label> <input type="text"
							name="sanctionedAmount" id="sanctionedAmount" readonly="readonly"
							placeholder="SANCTIONED AMOUNT"
							style="text-transform: uppercase; background-color: #f8f9fa;" />
					</div>
				</div>
				
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="totalinterestofLoan">TOTAL SANCTIONED INTEREST</label> <input
							type="text" name="totalinterestofLoan" id="totalinterestofLoan"
							readonly="readonly" placeholder="TOTAL INTEREST"
							style="text-transform: uppercase; background-color: #f8f9fa;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="totalPayableofLoan">TOTAL PAYABLE OF LOAN</label> <input type="text"
							name="totalPayableofLoan" id="totalPayableofLoan"
							readonly="readonly" placeholder="TOTAL PAYABLE"
							style="text-transform: uppercase; background-color: #f8f9fa;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="typeOfLoan">TYPE OF LOAN</label> <input type="text"
							name="typeOfLoan" id="typeOfLoan" readonly="readonly"
							placeholder="TYPE OF LOAN" style="text-transform: uppercase; background-color: #f8f9fa;" />
					</div>
				</div>
			</div>
		</div>

		<!-- 4. PAYMENT & SETTLEMENT CALCULATION -->
		<div class="mt-4">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SETTLEMENT & PAYMENT DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="noOfInst">INSTALLMENTS PAID</label> <input type="text"
							name="noOfInst" id="noOfInst" readonly="readonly"
							placeholder="NO OF INST PAID" style="background-color: #f8f9fa;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="principalDue">OUTSTANDING PRINCIPAL (₹)</label> <input type="text"
							name="principalDue" id="principalDue" readonly="readonly"
							placeholder="PRINCIPAL DUE" style="background-color: #f8f9fa; font-weight: bold;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="interestDue">ACCRUED INTEREST TILL TODAY (₹)</label> <input type="text"
							name="interestDue" id="interestDue" readonly="readonly"
							placeholder="INTEREST DUE" style="background-color: #f8f9fa; font-weight: bold;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="amountPaid">TOTAL PRINCIPAL PAID (₹)</label> <input type="text"
							name="amountPaid" id="amountPaid" readonly="readonly"
							placeholder="AMOUNT PAID TILL DATE" style="background-color: #f8f9fa;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="balanceLoanAmount">BALANCE LOAN AMOUNT (₹)</label> <input type="text"
							name="balanceLoanAmount" id="balanceLoanAmount" readonly="readonly"
							placeholder="BALANCE AMOUNT" style="background-color: #f8f9fa;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="dueDate">CLOSURE / DUE DATE</label> <input type="date" name="dueDate"
							id="dueDate" required="required" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="paymentBranch">PAYMENT BRANCH <span style="color:red">*</span></label> <input type="text"
							name="paymentBranch" id="paymentBranch" required="required"
							placeholder="ENTER BRANCH" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="paymentDate">PAYMENT DATE <span style="color:red">*</span></label> <input type="date"
							name="paymentDate" id="paymentDate" required="required" />
					</div>
				</div>

				<!-- Fine & Foreclosure Charges -->
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="deductfine">DEDUCT FINE / PENALTY <span style="color:red">*</span></label>
						<select id="deductfine" name="deductfine" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="NO">NO</option>
							<option value="YES">YES</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="deductFineAmount">FINE / PENALTY AMOUNT (₹)</label> <input type="number"
							step="0.01" name="deductFineAmount" id="deductFineAmount" required="required"
							value="0.00" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="foreclosureFee">FORECLOSURE FEE (₹)</label> <input type="text"
							name="foreclosureFee" id="foreclosureFee" readonly="readonly"
							value="0.00" style="background-color: #f8f9fa;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="waiver">WAIVER / REBATE CONCESSION (₹)</label> <input type="number"
							step="0.01" name="waiver" id="waiver" value="0.00"
							placeholder="ENTER WAIVER AMOUNT" />
					</div>
				</div>

				<!-- Amounts -->
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="paymentAmount">PAYMENT AMOUNT (₹) <span style="color:red">*</span></label> <input type="number"
							step="0.01" name="paymentAmount" id="paymentAmount" required="required"
							placeholder="ENTER PAYMENT AMOUNT" style="font-weight: bold;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="netAmount">NET PAYABLE AMOUNT (₹) <span style="color:red">*</span></label> <input type="number"
							step="0.01" name="netAmount" id="netAmount" required="required"
							readonly="readonly" placeholder="NET AMOUNT" style="background-color: #f0fdf4; color: #166534; font-weight: 800; font-size: 15px;" />
					</div>
				</div>

				<!-- Reason for Closure (New Field) -->
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="reasonForClosure">REASON FOR CLOSURE <span style="color:red">*</span></label>
						<select id="reasonForClosure" name="reasonForClosure" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="Voluntary Prepayment">Voluntary Prepayment</option>
							<option value="Society-Initiated Recovery">Society-Initiated Recovery</option>
							<option value="Restructuring/Transfer">Restructuring/Transfer</option>
							<option value="Other">Other</option>
						</select>
					</div>
				</div>

				<!-- Payment Mode -->
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="paymentMode">MODE OF PAYMENT <span style="color:red">*</span></label>
						<select id="paymentMode" name="paymentMode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT MODE OF PAYMENT</option>
							<option value="Cash">CASH</option>
							<option value="Saving Account">SAVINGS ACCOUNT (AUTO-DEBIT)</option>
							<option value="Online">ONLINE / UPI</option>
							<option value="Cheque">CHEQUE</option>
							<option value="NEFT">NEFT / RTGS</option>
						</select>
					</div>
				</div>

				<!-- Savings Account Container -->
				<div class="col-lg-3" id="displaySavingsAccount" style="display: none;">
					<div class="d-flex flex-column formFields mb-4">
						<label>MEMBER SAVINGS A/C (BAL)</label> <input
							type="text" name="accountNo" id="accountNo" readonly="readonly"
							style="background-color: #eff6ff; color: #1e40af; font-weight: bold;" />
					</div>
				</div>

				<!-- Cheque Details -->
				<div class="col-lg-3" id="displayCheque" style="display: none;">
					<div class="d-flex flex-column formFields mb-4">
						<label>CHEQUE NUMBER <span style="color:red">*</span></label> <input
							type="text" name="chequeNo" id="chequeNo"
							placeholder="ENTER CHEQUE NO" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3" id="displaycheqdate" style="display: none;">
					<div class="d-flex flex-column formFields mb-4">
						<label>CHEQUE DATE <span style="color:red">*</span></label> <input
							type="date" name="chequeDate" id="chequeDate"
							placeholder="ENTER CHEQUE DATE" style="text-transform: uppercase;" />
					</div>
				</div>

				<!-- Deposit Account (Bank Name for cheque/online) -->
				<div class="col-lg-3" id="displaydeposit" style="display: none;">
					<div class="d-flex flex-column formFields mb-4">
						<label>DEPOSIT ACCOUNT / BANK</label> <input
							type="text" name="depositAccount" id="depositAccount"
							placeholder="ENTER DEPOSIT ACCOUNT" style="text-transform: uppercase;" />
					</div>
				</div>

				<!-- UPI / Reference Details -->
				<div class="col-lg-3" id="displayRef" style="display: none;">
					<div class="d-flex flex-column formFields mb-4">
						<label for="ref_UpiId">REF NUMBER / UPI ID <span style="color:red">*</span></label> <input type="text"
							name="ref_UpiId" id="ref_UpiId"
							placeholder="ENTER REF NUMBER / UPI ID" style="text-transform: uppercase;" />
					</div>
				</div>

				<!-- Financial Consultant: Searchable Dropdown -->
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="financialConsultantId">FINANCIAL CONSULTANT ID <span style="color:red">*</span></label>
						<select id="financialConsultantId" name="financialConsultantId" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT CONSULTANT</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="financialConsultantName">FINANCIAL CONSULTANT NAME</label> <input type="text"
							name="financialConsultantName" id="financialConsultantName"
							readonly="readonly" placeholder="CONSULTANT NAME"
							style="text-transform: uppercase; background-color: #f8f9fa;" />
					</div>
				</div>

				<!-- Remarks -->
				<div class="col-lg-6">
					<div class="d-flex flex-column formFields mb-4">
						<label for="remarks">REMARKS / CLOSURE NOTES <span id="remarksReqStar" style="color:red; display:none;">*</span></label>
						<textarea name="remarks" id="remarks" rows="2"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 6px; font-size: 13px;"
							placeholder="ENTER REMARKS (REQUIRED IF REASON IS OTHER)"></textarea>
					</div>
				</div>

				<div class="col-12 text-center mt-3 mb-5">
					<button type="button" id="closeLoanBtn" class="btnStyle btn-lg"
						style="background-color: #FFA500; font-size: 16px; padding: 10px 40px; font-weight: 700; color: white;">
						<i class="bi bi-shield-check me-1"></i> CLOSE LOAN
					</button>
				</div>
			</div>
		</div>
	</form>
</div>

<!-- ========================================================================= -->
<!-- 5. CONFIRMATION MODAL -->
<!-- ========================================================================= -->
<div class="modal fade" id="closureConfirmModal" tabindex="-1" aria-hidden="true" data-backdrop="static" data-bs-backdrop="static">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content" style="border-radius: 12px; border: none; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2);">
			<div class="modal-header" style="background: #0f172a; color: #fff; border-radius: 12px 12px 0 0;">
				<h5 class="modal-title fw-bold"><i class="bi bi-exclamation-triangle text-warning me-2"></i>CONFIRM EARLY LOAN CLOSURE</h5>
				<button type="button" class="close text-white" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" style="background:transparent; border:none; font-size:24px; line-height:1;">&times;</button>
			</div>
			<div class="modal-body p-4">
				<p class="text-muted mb-3">You are about to foreclose and permanently settle this loan account. Please verify settlement summary:</p>
				<table class="table table-bordered table-sm mb-3">
					<tbody>
						<tr>
							<td class="text-muted fw-semibold">Loan ID</td>
							<td id="modalConfLoanId" class="fw-bold"></td>
						</tr>
						<tr>
							<td class="text-muted fw-semibold">Borrower Name</td>
							<td id="modalConfBorrower" class="fw-bold"></td>
						</tr>
						<tr>
							<td class="text-muted fw-semibold">Payment Mode</td>
							<td id="modalConfPayMode" class="fw-bold text-primary"></td>
						</tr>
						<tr>
							<td class="text-muted fw-semibold">Payoff Settlement Amount</td>
							<td id="modalConfPayoff" class="fw-bold text-success fs-5"></td>
						</tr>
						<tr>
							<td class="text-muted fw-semibold">Reason for Closure</td>
							<td id="modalConfReason" class="fst-italic"></td>
						</tr>
					</tbody>
				</table>
				<div class="alert alert-warning py-2 mb-0" style="font-size: 13px;">
					<i class="bi bi-info-circle me-1"></i> This action is non-reversible. It will mark the loan as <strong>CLOSED</strong>, discharge liabilities, and balance the ledger.
				</div>
			</div>
			<div class="modal-footer" style="background: #f8fafc; border-radius: 0 0 12px 12px;">
				<button type="button" class="btn btn-secondary" data-dismiss="modal" data-bs-dismiss="modal">Cancel</button>
				<button type="button" id="confirmProceedCloseBtn" class="btn btn-warning fw-bold px-4">
					<i class="bi bi-check-circle me-1"></i> YES, EXECUTE CLOSURE
				</button>
			</div>
		</div>
	</div>
</div>

<!-- ========================================================================= -->
<!-- 6. POST-CLOSURE SUCCESS & NOC MODAL -->
<!-- ========================================================================= -->
<div class="modal fade" id="closureSuccessModal" tabindex="-1" aria-hidden="true" data-backdrop="static" data-bs-backdrop="static">
	<div class="modal-dialog modal-lg modal-dialog-centered">
		<div class="modal-content" style="border-radius: 12px; border: none; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);">
			<div class="settlement-modal-header d-flex justify-content-between align-items-center">
				<div>
					<h4 class="m-0 fw-bold"><i class="bi bi-check2-circle me-2"></i>LOAN CLOSED SUCCESSFULLY!</h4>
					<small style="opacity: 0.9;">Early Foreclosure & Account Settlement Executed</small>
				</div>
				<button type="button" class="close text-white" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" style="background:transparent; border:none; font-size:24px; line-height:1;">&times;</button>
			</div>
			<div class="modal-body p-4">
				<div class="alert alert-success d-flex align-items-center mb-4" role="alert">
					<i class="bi bi-shield-check fs-3 me-3"></i>
					<div>
						<h6 class="mb-0 fw-bold" id="succModalMsg">Loan successfully foreclosed and closed.</h6>
						<small id="succModalCollateralMsg" class="text-success fw-semibold"></small>
					</div>
				</div>

				<!-- Printable Receipt Preview -->
				<div class="printable-receipt mb-4" id="printableReceiptArea">
					<div class="text-center pb-2 border-bottom mb-2">
						<h5 class="fw-bold mb-0">SAMITHA URBAN COOPERATIVE</h5>
						<small>EARLY LOAN CLOSURE & FORECLOSURE SETTLEMENT RECEIPT</small>
					</div>
					<div class="row g-2 mb-2" style="font-size: 13px;">
						<div class="col-6"><strong>Receipt No:</strong> <span id="recReceiptNo"></span></div>
						<div class="col-6 text-end"><strong>Date:</strong> <span id="recDate"></span></div>
						<div class="col-6"><strong>Loan ID:</strong> <span id="recLoanId"></span></div>
						<div class="col-6 text-end"><strong>Branch:</strong> <span id="recBranch"></span></div>
						<div class="col-6"><strong>Borrower:</strong> <span id="recBorrower"></span></div>
						<div class="col-6 text-end"><strong>Payment Mode:</strong> <span id="recMode"></span></div>
					</div>
					<table class="table table-sm table-bordered mb-2" style="font-size: 12px;">
						<thead>
							<tr class="table-light">
								<th>Description</th>
								<th class="text-end">Amount (₹)</th>
							</tr>
						</thead>
						<tbody>
							<tr><td>Principal Outstanding Settled</td><td class="text-end" id="recPrincipal">0.00</td></tr>
							<tr><td>Accrued Interest till Closure</td><td class="text-end" id="recInterest">0.00</td></tr>
							<tr><td>Overdue Arrears / Penalties</td><td class="text-end" id="recFines">0.00</td></tr>
							<tr><td>Foreclosure Charges</td><td class="text-end" id="recFee">0.00</td></tr>
							<tr><td>Less: Concession / Waiver</td><td class="text-end text-danger" id="recWaiver">-0.00</td></tr>
							<tr class="table-secondary fw-bold">
								<td>TOTAL NET SETTLEMENT AMOUNT RECEIVED</td>
								<td class="text-end" id="recTotal">₹0.00</td>
							</tr>
						</tbody>
					</table>
					<div class="d-flex justify-content-between mt-3 pt-2 border-top" style="font-size: 11px;">
						<div>Loan Status: <strong>CLOSED</strong> | Ledger: <strong>ZERO BALANCE</strong></div>
						<div>Authorized Signatory</div>
					</div>
				</div>

				<div class="row g-2">
					<div class="col-md-4">
						<button type="button" id="printReceiptBtn" class="btn btn-outline-primary w-100 py-2 fw-bold">
							<i class="bi bi-printer me-1"></i> Print Foreclosure Receipt
						</button>
					</div>
					<div class="col-md-4">
						<button type="button" id="downloadNocBtn" class="btn btn-success w-100 py-2 fw-bold">
							<i class="bi bi-file-earmark-check me-1"></i> Download NOC Certificate
						</button>
					</div>
					<div class="col-md-4">
						<button type="button" id="viewStatementBtn" class="btn btn-outline-secondary w-100 py-2 fw-bold">
							<i class="bi bi-receipt me-1"></i> View Loan Statement
						</button>
					</div>
				</div>
			</div>
			<div class="modal-footer" style="background: #f8fafc; border-radius: 0 0 12px 12px;">
				<button type="button" class="btn btn-primary" onclick="location.reload();">Done & Refresh</button>
			</div>
		</div>
	</div>
</div>

<script src="${pageContext.request.contextPath}/js/LoanManagment/EarlyLoanClosure.js?v=<%= System.currentTimeMillis() %>"></script>
