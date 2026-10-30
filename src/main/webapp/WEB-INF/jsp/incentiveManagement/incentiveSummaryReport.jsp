<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="pagetitle">
	<h1>INCENTIVE MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"><i class="bi bi-award"></i></a></li>
			<li class="breadcrumb-item action">INCENTIVE SUMMARY REPORT</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">INCENTIVE SUMMARY REPORT FILTER</li>
				</ol>
			</nav>

			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="reportMonth">INCENTIVE MONTH</label>
						<select id="reportMonth" name="reportMonth" class="form-control selectField" style="height: 30px;">
							<option value="">-- ALL MONTHS --</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="reportBranch">BRANCH NAME</label>
						<select id="reportBranch" name="reportBranch" class="form-control selectField" style="height: 30px;">
							<option value="">-- ALL BRANCHES --</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="reportCode">AGENT / MEMBER CODE</label>
						<input type="text" id="reportCode" name="reportCode" class="form-control" placeholder="ENTER AGENT / MEMBER CODE" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3 d-flex align-items-end mb-4">
					<button type="button" id="findBtn" class="btn btn-primary me-2">
						<i class="bi bi-search me-1"></i> FIND / SEARCH
					</button>
					<button type="button" id="resetBtn" class="btn btn-secondary">
						<i class="bi bi-arrow-counterclockwise me-1"></i> RESET
					</button>
				</div>
			</div>

			<!-- KPI Cards -->
			<div class="row mb-3">
				<div class="col-md-3">
					<div class="card p-3 text-center bg-light border shadow-sm">
						<small class="text-muted fw-bold">TOTAL ELIGIBLE ADVISORS</small>
						<h4 class="mb-0 text-primary fw-bold" id="kpiMembers">0</h4>
						<small class="text-muted"><span id="kpiPaid" class="text-success fw-bold">0</span> PAID / <span id="kpiPending" class="text-warning text-dark fw-bold">0</span> PENDING</small>
					</div>
				</div>
				<div class="col-md-3">
					<div class="card p-3 text-center bg-light border shadow-sm">
						<small class="text-muted fw-bold">TOTAL BUSINESS MOBILIZED</small>
						<h4 class="mb-0 text-success fw-bold">₹<span id="kpiSales">0.00</span></h4>
						<small class="text-muted">OVERALL SALES</small>
					</div>
				</div>
				<div class="col-md-3">
					<div class="card p-3 text-center bg-light border shadow-sm">
						<small class="text-muted fw-bold">TOTAL GROSS COMMISSION</small>
						<h4 class="mb-0 text-info fw-bold">₹<span id="kpiEarnings">0.00</span></h4>
						<small class="text-muted">COMMISSION BEFORE DEDUCTIONS</small>
					</div>
				</div>
				<div class="col-md-3">
					<div class="card p-3 text-center bg-light border shadow-sm">
						<small class="text-muted fw-bold">TOTAL NET INCENTIVE PAYOUT</small>
						<h4 class="mb-0 text-danger fw-bold">₹<span id="kpiPayout">0.00</span></h4>
						<small class="text-muted">NET PAYOUT AMOUNT</small>
					</div>
				</div>
			</div>

			<div class="card recent-sales">
				<div class="card-body table-responsive">
					<div class="d-flex justify-content-between align-items-center mb-3">
						<h5 class="card-title mb-0">INCENTIVE SUMMARY REPORT <span>| TABLE VIEW</span></h5>
						<div>
							<button type="button" id="printReportBtn" class="btn btn-sm btn-dark me-2">
								<i class="bi bi-printer me-1"></i> PRINT REPORT
							</button>
							<button type="button" id="exportCsvBtn" class="btn btn-sm btn-success">
								<i class="bi bi-file-earmark-spreadsheet me-1"></i> EXPORT TO CSV
							</button>
						</div>
					</div>

					<div id="summaryReportPrintArea">
						<table class="table table-bordered table-striped" style="margin-top: 10px; font-size: 13px;">
							<thead class="table-light">
								<tr style="font-family: 'Poppins', sans-serif;">
									<th scope="col">S/N</th>
									<th scope="col">MONTH</th>
									<th scope="col">BRANCH</th>
									<th scope="col">MEMBER CODE</th>
									<th scope="col">MEMBER NAME</th>
									<th scope="col">DESIGNATION</th>
									<th scope="col" class="text-end">PERSONAL SALES (₹)</th>
									<th scope="col" class="text-end">GROUP SALES (₹)</th>
									<th scope="col" class="text-end">TOTAL SALES (₹)</th>
									<th scope="col" class="text-end">GROSS EARNINGS (₹)</th>
									<th scope="col" class="text-end">TDS (₹)</th>
									<th scope="col" class="text-end">SERVICE DED. (₹)</th>
									<th scope="col" class="text-end">ALLOWANCE (₹)</th>
									<th scope="col" class="text-end">NET PAYOUT (₹)</th>
									<th scope="col" class="text-center">STATUS</th>
									<th scope="col" class="text-center">GENERATED DATE</th>
								</tr>
							</thead>
							<tbody id="summaryReportTableBody">
								<tr><td colspan="16" class="text-center">LOADING INCENTIVE SUMMARY REPORT...</td></tr>
							</tbody>
							<tfoot class="table-secondary fw-bold" id="summaryReportTableFooter" style="display: none;">
								<tr>
									<td colspan="6" class="text-center">GRAND TOTAL</td>
									<td class="text-end" id="repFootPersonalSales">0.00</td>
									<td class="text-end" id="repFootGroupSales">0.00</td>
									<td class="text-end" id="repFootOverallSales">0.00</td>
									<td class="text-end" id="repFootTotalEarnings">0.00</td>
									<td class="text-end" id="repFootTaxDed">0.00</td>
									<td class="text-end" id="repFootServiceDed">0.00</td>
									<td class="text-end" id="repFootAllowance">0.00</td>
									<td class="text-end" id="repFootNetPayout">0.00</td>
									<td colspan="2"></td>
								</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
		</div>
	</form>
</div>

<script src="${pageContext.request.contextPath}/js/incentive/IncentiveSummaryReport.js?v=<%=System.currentTimeMillis()%>"></script>
