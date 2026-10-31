<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="pagetitle">
	<h1>INCENTIVE MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"><i class="bi bi-award"></i></a></li>
			<li class="breadcrumb-item action">INCENTIVE PAYMENT DETAILS</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH INCENTIVE PAYMENT DETAILS</li>
				</ol>
			</nav>

			<div class="row">
				<div class="col-lg-4">
					<div class="d-flex flex-column formFields mb-4">
						<label for="searchMonth">INCENTIVE MONTH</label>
						<select id="searchMonth" name="searchMonth" class="form-control selectField" style="height: 30px;">
							<option value="">-- ALL MONTHS --</option>
						</select>
					</div>
				</div>

				<div class="col-lg-4">
					<div class="d-flex flex-column formFields mb-4">
						<label for="searchCode">AGENT / TEAM MEMBER CODE</label>
						<input type="text" id="searchCode" name="searchCode" class="form-control" placeholder="ENTER AGENT / TEAM MEMBER CODE" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-4 d-flex align-items-end mb-4">
					<button type="button" id="searchBtn" class="btn btn-primary me-2">
						<i class="bi bi-search me-1"></i> SEARCH
					</button>
					<button type="button" id="resetBtn" class="btn btn-secondary me-2">
						<i class="bi bi-arrow-counterclockwise me-1"></i> RESET
					</button>
					<button type="button" id="printStatementBtn" class="btn btn-dark">
						<i class="bi bi-printer me-1"></i> PRINT STATEMENT
					</button>
				</div>
			</div>

			<div class="card recent-sales mt-3">
				<div class="card-body table-responsive" id="statementPrintSection">
					<div class="d-flex justify-content-between align-items-center mb-3">
						<h5 class="card-title mb-0">INCENTIVE PAYMENT DETAILS STATEMENT <span>| TABLE VIEW</span></h5>
						<span class="badge bg-secondary" id="totalRecordsBadge">TOTAL RECORDS: 0</span>
					</div>

					<table class="table table-bordered table-striped" style="margin-top: 10px; font-size: 13px;">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">S/N</th>
								<th scope="col">MEMBER CODE</th>
								<th scope="col">MEMBER NAME</th>
								<th scope="col">DESIGNATION</th>
								<th scope="col">BRANCH</th>
								<th scope="col">MONTH</th>
								<th scope="col" class="text-end">PERSONAL SALES (₹)</th>
								<th scope="col" class="text-end">GROUP SALES (₹)</th>
								<th scope="col" class="text-end">OVERALL SALES (₹)</th>
								<th scope="col" class="text-end">GROSS EARNINGS (₹)</th>
								<th scope="col" class="text-end">TDS (₹)</th>
								<th scope="col" class="text-end">SERVICE DED. (₹)</th>
								<th scope="col" class="text-end">EXTRA ALLOW. (₹)</th>
								<th scope="col" class="text-end">FINAL PAYOUT (₹)</th>
								<th scope="col" class="text-center">PAYMENT STATUS</th>
								<th scope="col" class="text-center no-print">ACTIONS</th>
							</tr>
						</thead>
						<tbody id="paymentDetailsTableBody">
							<tr><td colspan="16" class="text-center">LOADING INCENTIVE PAYMENT DETAILS...</td></tr>
						</tbody>
						<tfoot class="table-secondary fw-bold" id="detailsTableSummaryFooter" style="display: none;">
							<tr>
								<td colspan="6" class="text-center">TOTAL</td>
								<td class="text-end" id="detailsFootPersonalSales">0.00</td>
								<td class="text-end" id="detailsFootGroupSales">0.00</td>
								<td class="text-end" id="detailsFootOverallSales">0.00</td>
								<td class="text-end" id="detailsFootTotalEarnings">0.00</td>
								<td class="text-end" id="detailsFootTaxDed">0.00</td>
								<td class="text-end" id="detailsFootServiceDed">0.00</td>
								<td class="text-end" id="detailsFootExtraAllow">0.00</td>
								<td class="text-end" id="detailsFootFinalPayout">0.00</td>
								<td colspan="2"></td>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		</div>
	</form>
</div>

<!-- Modal for Individual Incentive Pay Slip Voucher -->
<div class="modal fade" id="paySlipModal" tabindex="-1" aria-labelledby="paySlipModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header bg-dark text-white">
				<h5 class="modal-title fw-bold" id="paySlipModalLabel">BANK INCENTIVE PAYMENT VOUCHER</h5>
				<button type="button" class="close text-white" data-dismiss="modal" data-bs-dismiss="modal" aria-label="CLOSE">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body" id="paySlipPrintArea">
				<div class="text-center mb-3 border-bottom pb-2">
					<h3 class="fw-bold mb-1">MICROFINANCE BANKING SYSTEM</h3>
					<h5 class="text-muted fw-bold mb-0">OFFICIAL INCENTIVE PAYMENT ADVICE & SLIP</h5>
				</div>
				<div class="row mb-3">
					<div class="col-6">
						<strong>EMPLOYEE / AGENT CODE:</strong> <span id="slipTeamCode"></span><br />
						<strong>NAME:</strong> <span id="slipTeamName"></span><br />
						<strong>DESIGNATION:</strong> <span id="slipDesignation"></span><br />
						<strong>BRANCH:</strong> <span id="slipBranchName"></span>
					</div>
					<div class="col-6 text-end">
						<strong>INCENTIVE MONTH:</strong> <span id="slipMonth"></span><br />
						<strong>PERIOD:</strong> <span id="slipPeriod"></span><br />
						<strong>PAYMENT STATUS:</strong> <span id="slipStatus" class="fw-bold"></span><br />
						<strong>DATE:</strong> <span id="slipGeneratedDate"></span>
					</div>
				</div>

				<table class="table table-bordered mb-3">
					<thead class="table-light">
						<tr>
							<th class="fw-bold">PARTICULAR / HEAD</th>
							<th class="text-end fw-bold">AMOUNT (₹)</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>PERSONAL SALES BUSINESS MOBILIZED</td>
							<td class="text-end" id="slipPersonalSales">0.00</td>
						</tr>
						<tr>
							<td>GROUP SALES BUSINESS MOBILIZED</td>
							<td class="text-end" id="slipGroupSales">0.00</td>
						</tr>
						<tr class="table-light fw-bold">
							<td>TOTAL OVERALL SALES BUSINESS</td>
							<td class="text-end" id="slipOverallSales">0.00</td>
						</tr>
						<tr>
							<td>GROSS INCENTIVE EARNINGS (COMMISSION)</td>
							<td class="text-end text-success fw-bold" id="slipTotalEarnings">0.00</td>
						</tr>
						<tr>
							<td>LESS: TAX DEDUCTED AT SOURCE (TDS)</td>
							<td class="text-end text-danger" id="slipTaxDed">0.00</td>
						</tr>
						<tr>
							<td>LESS: SERVICE DEDUCTION CHARGE</td>
							<td class="text-end text-danger" id="slipServiceDed">0.00</td>
						</tr>
						<tr>
							<td>ADD: EXTRA ALLOWANCE & PERFORMANCE BONUS</td>
							<td class="text-end text-success" id="slipExtraAllow">0.00</td>
						</tr>
						<tr class="table-primary fw-bold" style="font-size: 16px;">
							<td>NET PAYOUT AMOUNT DISBURSABLE</td>
							<td class="text-end text-primary" id="slipFinalPayout">0.00</td>
						</tr>
					</tbody>
				</table>

				<div class="row mt-5 pt-4 border-top text-center">
					<div class="col-3">
						<hr style="border-top: 1px solid #000;" />
						<small class="fw-bold">PREPARED BY</small>
					</div>
					<div class="col-3">
						<hr style="border-top: 1px solid #000;" />
						<small class="fw-bold">CHECKED BY</small>
					</div>
					<div class="col-3">
						<hr style="border-top: 1px solid #000;" />
						<small class="fw-bold">BRANCH MANAGER</small>
					</div>
					<div class="col-3">
						<hr style="border-top: 1px solid #000;" />
						<small class="fw-bold">EMPLOYEE SIGNATURE</small>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal" data-bs-dismiss="modal">CLOSE</button>
				<button type="button" class="btn btn-primary" onclick="printPaySlipArea()">
					<i class="bi bi-printer me-1"></i> PRINT VOUCHER
				</button>
			</div>
		</div>
	</div>
</div>

<script src="${pageContext.request.contextPath}/js/incentive/incentivePaymentDetails.js?v=<%=System.currentTimeMillis()%>"></script>
