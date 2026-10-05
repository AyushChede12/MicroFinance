
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


</style>

<div class="pagetitle">
	<h1>REPORTS & ANALYTICS</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-file-earmark-text"></i>
			</a></li>
			<li class="breadcrumb-item action">INVESTMENT TRANSACTION REPORT </li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH BOX</li>
				</ol>
			</nav>
			<div class="row">

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">BRANCH NAME </label> <select id="branchName2"
							name="branchName" required="required"
							class="form-control selectField">
							
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="fromDate">FROM DATE :</label> <input type="date"
							name="fromDate" id="fromDate" required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="toDate">TO DATE :</label> <input type="date"
							name="toDate" id="toDate" required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>





			</div>

			<div class="row">
				<div class="col-4 text-start mt-3">
					<button id="findBtn" class="btn btn-dark">FIND</button>
				</div>
			</div>

		</div>

	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">SEARCH RESULT </h5>

					<h6 class="card-title" style="text-align: center; color: black;">
						INVESTMENT REPORT</h6>


					<div style="overflow-x: auto; white-space: nowrap;">
						<table class="table table-borderless datatable">
							<thead class="table-light">
								<tr style="font-family: 'Poppins', sans-serif;">
									<th scope="col">SR NO.</th>
									<th scope="col">POLICY CODE</th>
									<th scope="col">CUSTOMER NAME</th>
									<th scope="col">SCHEME TYPE</th>
									<th scope="col">POLICY DATE</th>
									<th scope="col">POLICY AMOUNT</th>
									<th scope="col">CONTACT NUMBER</th>
									<th scope="col">BRANCH </th>
									<th scope="col">APPROVED </th>
									<th scope="col">PRINT</th>

								</tr>
							</thead>
							<tbody>
							</tbody>

						</table>
					</div>
				</div>
			</div>
		</div>
	</div>

</div>
<!-- Bank Report Modal -->
<div class="modal fade" id="bankReportModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content shadow-lg rounded-3">

            <!-- ================= HEADER ================= -->
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title fw-bold">Microfinance Transaction Report</h5>
                <button type="button" class="btn-close btn-close-white"
                        data-bs-dismiss="modal"></button>
            </div>

            <!-- ================= BODY ================= -->
            <div class="modal-body p-0" id="bankReportContent">

                <div class="bank-report p-4 bg-light">

                    <!-- ===== BANK HEADER ===== -->
                    <div class="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                        <div class="d-flex align-items-center">
                            <img id="bankLogo"
                                 src=""
                                 alt="Logo"
                                 style="height:50px;width:50px;object-fit:contain;margin-right:12px;">

                            <div>
                                <h4 id="bankName" class="mb-0 fw-bold text-primary"></h4>
                                <small id="reportTitle" class="text-muted"></small>
                            </div>
                        </div>

                        <div class="text-end">
                            <p class="mb-1">
                                <strong>Customer Code:</strong>
                                <span id="accountNumber"></span>
                            </p>
                            <p class="mb-0">
                                <strong>Period Covered:</strong>
                                <span id="periodCovered"></span>
                            </p>
                        </div>
                    </div>

                    <!-- ===== CUSTOMER + SUMMARY ===== -->
                    <div class="row g-3 mb-4">

                        <!-- CUSTOMER -->
                        <div class="col-md-6">
                            <div class="bg-white border rounded p-3 h-100 shadow-sm">
                                <h6 class="fw-bold text-primary mb-2">CUSTOMER</h6>
                                <p id="customerName" class="fw-bold mb-1"></p>
                                <p id="customerAddress1" class="mb-1"></p>
                                <p id="customerAddress2" class="mb-0"></p>
                            </div>
                        </div>

                        <!-- SUMMARY -->
                        <div class="col-md-6">
                            <div class="bg-white border rounded p-3 h-100 shadow-sm">
                                <h6 class="fw-bold text-primary mb-2">SUMMARY</h6>

                                <table class="table table-sm table-borderless mb-0">
                                    <tr>
                                        <td>Starting Balance</td>
                                        <td id="startingBalance" class="text-end fw-bold"></td>
                                    </tr>
                                    <tr>
                                        <td>Income</td>
                                        <td id="incomeAmount" class="text-end fw-bold text-success"></td>
                                    </tr>
                                    <tr>
                                        <td>Expenses</td>
                                        <td id="expensesAmount" class="text-end fw-bold text-danger"></td>
                                    </tr>
                                    <tr class="border-top">
                                        <td class="fw-bold">Closing Balance</td>
                                        <td id="closingBalance" class="text-end fw-bold text-primary"></td>
                                    </tr>
                                </table>

                            </div>
                        </div>

                    </div>

                    <!-- ===== TRANSACTION TABLE ===== -->
                    <div>
                        <h6 class="fw-bold text-primary mb-3">TRANSACTIONS</h6>

                        <div class="table-responsive">
                            <table class="table table-bordered table-striped text-center align-middle mb-0">
                                <thead class="table-primary">
                                    <tr>
                                        <th>Policy Code</th>
                                        <th>Policy Date</th>
                                        <th>Policy Amount</th>
                                        <th>Policy Type</th>
                                        <th>Policy Mode</th>
                                    </tr>
                                </thead>
                                <tbody id="transactionTableBody"></tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

            <!-- ================= FOOTER ================= -->
            <div class="modal-footer">
                <button id="printBankReportBtn" class="btn btn-success">
                    <i class="bi bi-printer"></i> Print
                </button>
                <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>

        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script
	src="${pageContext.request.contextPath}/js/ReportsAndAnalytics/InvestmentTransactionReport.js"></script>
	
