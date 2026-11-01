<style>
#bankReportModal .modal-dialog {
    max-width: 1100px;
}
#bankReportModal .modal-body {
    max-height: 75vh;
    overflow-y: auto;
}
.bank-report {
    font-family: Arial, sans-serif;
}
body.modal-open {
    overflow: hidden;
}
.formFields input, .formFields select {
	text-transform: uppercase;
}
@media print {
	.pagetitle, #formid, .btnStyle, .modal-footer, .no-print {
		display: none !important;
	}
}
</style>

<div class="pagetitle no-print">
	<h1>REPORTS & ANALYTICS</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i class="bi bi-file-earmark-text"></i></a></li>
			<li class="breadcrumb-item action">INVESTMENT TRANSACTION REPORT</li>
		</ol>
	</nav>
</div>

<div class="no-print">
	<form id="formid" autocomplete="off">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH FILTERS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="branchName2">BRANCH NAME</label> 
						<select id="branchName2" name="branchName" class="form-control selectField">
							<option value="">ALL BRANCHES</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="fromDate">FROM DATE :</label> 
						<input type="date" name="fromDate" id="fromDate" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="toDate">TO DATE :</label> 
						<input type="date" name="toDate" id="toDate" style="text-transform: uppercase;" />
					</div>
				</div>
			</div>

			<div class="row mt-3">
				<div class="col-12 text-start">
					<button type="button" id="findBtn" class="btn btn-dark">
						<i class="bi bi-search"></i> FIND
					</button>
					<button type="button" id="resetBtn" class="btn btn-secondary ms-2">
						<i class="bi bi-arrow-counterclockwise"></i> RESET
					</button>
					<button type="button" id="printFullReportBtn" class="btn btn-primary ms-2">
						<i class="bi bi-printer"></i> PRINT FULL REPORT
					</button>
				</div>
			</div>
		</div>
	</form>
</div>

<div class="row mt-4">
	<div class="col-12">
		<div class="card recent-sales">
			<div class="card-body table-responsive">
				<h5 class="card-title text-uppercase" style="font-weight: 700;">INVESTMENT TRANSACTION REPORT</h5>
				<div style="overflow-x: auto; white-space: nowrap;">
					<table class="table table-bordered table-hover datatable align-middle">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">SR NO.</th>
								<th scope="col">POLICY CODE</th>
								<th scope="col">CUSTOMER NAME</th>
								<th scope="col">SCHEME TYPE</th>
								<th scope="col">POLICY DATE</th>
								<th scope="col">POLICY AMOUNT</th>
								<th scope="col">CONTACT NUMBER</th>
								<th scope="col">BRANCH</th>
								<th scope="col">APPROVED</th>
								<th scope="col" class="no-print">PRINT</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td colspan="10" class="text-center text-muted">LOADING APPROVED POLICIES...</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Bank Report Modal -->
<div class="modal fade" id="bankReportModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content shadow-lg rounded-3">

            <!-- HEADER -->
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title fw-bold text-uppercase">
                    <i class="bi bi-file-earmark-check me-2"></i>POLICY INVESTMENT TRANSACTION STATEMENT
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>

            <!-- BODY -->
            <div class="modal-body p-0" id="bankReportContent">
                <div class="bank-report p-4 bg-light">

                    <!-- BANK HEADER -->
                    <div class="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                        <div>
                            <h4 id="bankName" class="mb-0 fw-bold text-primary text-uppercase"></h4>
                            <div id="bankAddress" class="text-muted small text-uppercase mt-1"></div>
                            <div id="bankContact" class="text-muted small text-uppercase"></div>
                        </div>

                        <div class="text-end">
                            <p class="mb-1">
                                <strong class="text-uppercase">CUSTOMER CODE:</strong>
                                <span id="accountNumber"></span>
                            </p>
                            <p class="mb-0">
                                <strong class="text-uppercase">DATE GENERATED:</strong>
                                <span id="periodCovered"></span>
                            </p>
                        </div>
                    </div>

                    <!-- CUSTOMER + SUMMARY -->
                    <div class="row g-3 mb-4">
                        <div class="col-md-6">
                            <div class="bg-white border rounded p-3 h-100 shadow-sm">
                                <h6 class="fw-bold text-primary mb-2 text-uppercase">CUSTOMER DETAILS</h6>
                                <p id="customerName" class="fw-bold mb-1 text-uppercase"></p>
                                <p id="customerAddress1" class="mb-1 text-uppercase"></p>
                                <p id="customerAddress2" class="mb-0 text-uppercase"></p>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="bg-white border rounded p-3 h-100 shadow-sm">
                                <h6 class="fw-bold text-primary mb-2 text-uppercase">INVESTMENT SUMMARY</h6>
                                <table class="table table-sm table-borderless mb-0">
                                    <tr>
                                        <td class="text-uppercase">POLICY CODE</td>
                                        <td id="modalPolicyCode" class="text-end fw-bold"></td>
                                    </tr>
                                    <tr>
                                        <td class="text-uppercase">SCHEME TYPE</td>
                                        <td id="modalSchemeType" class="text-end fw-bold text-success"></td>
                                    </tr>
                                    <tr>
                                        <td class="text-uppercase">PAYMENT MODE</td>
                                        <td id="modalPaymentMode" class="text-end fw-bold"></td>
                                    </tr>
                                    <tr class="border-top">
                                        <td class="fw-bold text-uppercase">TOTAL POLICY AMOUNT</td>
                                        <td id="modalPolicyAmount" class="text-end fw-bold text-primary"></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- TRANSACTION TABLE -->
                    <div>
                        <h6 class="fw-bold text-primary mb-3 text-uppercase">TRANSACTION STATEMENT</h6>
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped text-center align-middle mb-0">
                                <thead class="table-primary">
                                    <tr>
                                        <th class="text-uppercase">POLICY CODE</th>
                                        <th class="text-uppercase">POLICY DATE</th>
                                        <th class="text-uppercase">POLICY AMOUNT</th>
                                        <th class="text-uppercase">POLICY TYPE</th>
                                        <th class="text-uppercase">PAYMENT MODE</th>
                                    </tr>
                                </thead>
                                <tbody id="transactionTableBody"></tbody>
                            </table>
                        </div>
                    </div>

                    <!-- SIGNATURE AREA -->
                    <div class="row mt-5 pt-4">
                        <div class="col-6 text-center">
                            <div style="border-top: 1px solid #333; display: inline-block; width: 220px; padding-top: 5px; font-weight: bold; font-size: 12px; text-transform: uppercase;">
                                BRANCH MANAGER
                            </div>
                        </div>
                        <div class="col-6 text-center">
                            <div style="border-top: 1px solid #333; display: inline-block; width: 220px; padding-top: 5px; font-weight: bold; font-size: 12px; text-transform: uppercase;">
                                AUTHORIZED SIGNATORY
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- FOOTER -->
            <div class="modal-footer">
                <button type="button" id="printBankReportBtn" class="btn btn-success">
                    <i class="bi bi-printer"></i> PRINT STATEMENT
                </button>
                <button type="button" class="btn btn-secondary text-uppercase" data-bs-dismiss="modal">CLOSE</button>
            </div>

        </div>
    </div>
</div>

<script src="${pageContext.request.contextPath}/js/ReportsAndAnalytics/ReportPrintUtil.js"></script>
<script src="${pageContext.request.contextPath}/js/ReportsAndAnalytics/InvestmentTransactionReport.js"></script>
