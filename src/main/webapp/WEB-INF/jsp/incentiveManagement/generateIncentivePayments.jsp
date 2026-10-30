<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="pagetitle">
	<h1>INCENTIVE MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"><i class="bi bi-award"></i></a></li>
			<li class="breadcrumb-item action">GENERATE INCENTIVE PAYMENTS</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">GENERATE INCENTIVE PAYMENTS</li>
				</ol>
			</nav>

			<input type="hidden" id="teamCode" name="teamCode" value="" />
			<input type="hidden" id="teamName" name="teamName" value="" />

			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="teamValue">TEAM MEMBER NAME</label>
						<select id="teamValue" name="teamValue" class="form-control selectField" style="height: 30px;">
							<option value="">-- ALL TEAM MEMBERS --</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="incentiveMonth">INCENTIVE MONTH</label>
						<select id="incentiveMonth" name="incentiveMonth" required="required" class="form-control selectField" style="height: 30px;">
							<option value="">-- SELECT INCENTIVE MONTH --</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="dateFrom">DATE FROM</label>
						<input type="date" name="dateFrom" id="dateFrom" required="required" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="dateTo">DATE TO</label>
						<input type="date" name="dateTo" id="dateTo" required="required" style="text-transform: uppercase;" />
					</div>
				</div>
			</div>

			<div class="row mb-4">
				<div class="col-12 text-center">
					<button type="button" id="generateBtn" class="btn btn-danger">
						<i class="bi bi-gear-fill me-1"></i> GENERATE INCENTIVES
					</button>
					<button type="button" id="refreshBtn" class="btn btn-secondary ms-2">
						<i class="bi bi-arrow-clockwise me-1"></i> REFRESH LIST
					</button>
				</div>
			</div>

			<!-- Summary Stats Bar -->
			<div class="row mb-3">
				<div class="col-md-4">
					<div class="card p-2 text-center bg-light border">
						<small class="text-muted fw-bold">TOTAL ELIGIBLE RECORDS</small>
						<h5 class="mb-0 text-primary fw-bold" id="totalRecordsCount">0</h5>
					</div>
				</div>
				<div class="col-md-4">
					<div class="card p-2 text-center bg-light border">
						<small class="text-muted fw-bold">TOTAL OVERALL BUSINESS (₹)</small>
						<h5 class="mb-0 text-success fw-bold" id="totalBusinessAmount">0.00</h5>
					</div>
				</div>
				<div class="col-md-4">
					<div class="card p-2 text-center bg-light border">
						<small class="text-muted fw-bold">TOTAL NET PAYOUT (₹)</small>
						<h5 class="mb-0 text-danger fw-bold" id="totalPayoutAmount">0.00</h5>
					</div>
				</div>
			</div>

			<div class="card recent-sales">
				<div class="card-body table-responsive">
					<div class="d-flex justify-content-between align-items-center mb-3">
						<h5 class="card-title mb-0">GENERATED INCENTIVE PAYMENTS <span>| TABLE VIEW</span></h5>
						<div class="d-flex align-items-center" style="gap: 10px;">
							<label for="tableMonthFilter" class="mb-0 fw-bold"><small>FILTER MONTH:</small></label>
							<select id="tableMonthFilter" class="form-control selectField" style="height: 30px; width: 180px;">
								<option value="">-- ALL MONTHS --</option>
							</select>
						</div>
					</div>

					<table class="table table-bordered table-striped" style="margin-top: 10px; font-size: 13px;">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">S/N</th>
								<th scope="col">TEAM CODE</th>
								<th scope="col">TEAM MEMBER NAME</th>
								<th scope="col">DESIGNATION</th>
								<th scope="col">BRANCH</th>
								<th scope="col">MONTH</th>
								<th scope="col" class="text-end">PERSONAL SALES (₹)</th>
								<th scope="col" class="text-end">GROUP SALES (₹)</th>
								<th scope="col" class="text-end">OVERALL SALES (₹)</th>
								<th scope="col" class="text-end">TOTAL EARNINGS (₹)</th>
								<th scope="col" class="text-end">TAX DED. (₹)</th>
								<th scope="col" class="text-end">SERVICE DED. (₹)</th>
								<th scope="col" class="text-end">EXTRA ALLOW. (₹)</th>
								<th scope="col" class="text-end">FINAL PAYOUT (₹)</th>
								<th scope="col" class="text-center">STATUS</th>
								<th scope="col" class="text-center">ACTIONS</th>
							</tr>
						</thead>
						<tbody id="generatedIncentiveTableBody">
							<tr><td colspan="16" class="text-center">NO GENERATED INCENTIVES FOUND. CLICK "GENERATE INCENTIVES" TO COMPUTE.</td></tr>
						</tbody>
						<tfoot class="table-secondary fw-bold" id="tableSummaryFooter" style="display: none;">
							<tr>
								<td colspan="6" class="text-center">TOTAL</td>
								<td class="text-end" id="footPersonalSales">0.00</td>
								<td class="text-end" id="footGroupSales">0.00</td>
								<td class="text-end" id="footOverallSales">0.00</td>
								<td class="text-end" id="footTotalEarnings">0.00</td>
								<td class="text-end" id="footTaxDed">0.00</td>
								<td class="text-end" id="footServiceDed">0.00</td>
								<td class="text-end" id="footExtraAllow">0.00</td>
								<td class="text-end" id="footFinalPayout">0.00</td>
								<td colspan="2"></td>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		</div>
	</form>
</div>

<!-- Modal for Incentive Pay Slip Voucher -->
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

<script src="${pageContext.request.contextPath}/js/incentive/generateIncentive.js?v=<%=System.currentTimeMillis()%>"></script>
