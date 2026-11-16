<style>
	body {
		font-family: 'Segoe UI', Arial, sans-serif;
		background-color: #f5f6fa;
	}

	.modal-content {
		border-radius: 10px;
		overflow: hidden;
	}

	.modal-header {
		background: linear-gradient(45deg, #0d6efd, #004aad);
	}

	.modal-title {
		font-weight: 600;
	}

	.table th,
	.table td {
		vertical-align: middle;
	}

	.formFields input,
	.formFields select {
		text-transform: uppercase;
	}

	@media print {

		.pagetitle,
		#formid,
		.btnStyle,
		.modal-footer,
		.no-print {
			display: none !important;
		}
	}
</style>

<div class="pagetitle no-print">
	<h1>REPORTS & ANALYTICS</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i class="bi bi-file-earmark-text"></i></a></li>
			<li class="breadcrumb-item action">FINANCIAL CONSULTANT REPORT</li>
		</ol>
	</nav>
</div>

<div class="no-print">
	<form id="formid" autocomplete="off">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH FINANCIAL CONSULTANTS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 20px;">
						<label for="branchName2">BRANCH NAME</label>
						<select id="branchName2" name="branchName2" class="form-control selectField"
							style="height: 30px; text-transform: uppercase;">
							<option value="">-- ALL BRANCHES --</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="fromDate">FROM DATE :</label>
						<input type="date" name="fromDate" id="fromDate" placeholder="ENTER FROM DATE"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="toDate">TO DATE :</label>
						<input type="date" name="toDate" id="toDate" placeholder="ENTER TO DATE"
							style="text-transform: uppercase;" />
					</div>
				</div>
			</div>

			<div class="row mt-3 mb-2">
				<div class="col-12 text-start">
					<button type="submit" id="findFinancialAdvisorBtn" class="btnStyle bg-warning">
						<i class="bi bi-search"></i> FIND CONSULTANTS
					</button>
					<button type="button" id="resetBtn" class="btnStyle bg-secondary text-white ms-2">
						<i class="bi bi-arrow-counterclockwise"></i> RESET
					</button>
					<button type="button" id="printFullReportBtn" class="btnStyle bg-primary text-white ms-2">
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
				<h5 class="card-title text-uppercase" style="font-weight: 700;">FINANCIAL CONSULTANT RECORDS</h5>

				<table class="table table-bordered table-hover datatable align-middle">
					<thead class="table-light">
						<tr style="font-family: 'Poppins', sans-serif;">
							<th style="white-space: nowrap;">SR</th>
							<th style="white-space: nowrap;">FINANCIAL CODE</th>
							<th style="white-space: nowrap;">FINANCIAL NAME</th>
							<th style="white-space: nowrap;">JOINING DATE</th>
							<th style="white-space: nowrap;">BRANCH</th>
							<th style="white-space: nowrap;">DOB</th>
							<th style="white-space: nowrap;">CONTACT NUMBER</th>
							<th style="white-space: nowrap;">POSITION</th>
							<th style="white-space: nowrap;">ADDRESS</th>
							<th style="white-space: nowrap;">STATUS</th>
							<th class="no-print text-center">ACTION</th>
						</tr>
					</thead>
					<tbody class='tablebody' id="fetchFinancialConsultants">
						<tr>
							<td colspan="11" class="text-center text-muted">LOADING CONSULTANTS...</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="bankReportModal" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog modal-xl modal-dialog-scrollable">
		<div class="modal-content shadow-lg border-0">

			<!-- Header -->
			<div class="modal-header text-white">
				<h5 class="modal-title text-uppercase">
					<i class="bi bi-person-vcard me-2"></i> FINANCIAL CONSULTANT DOSSIER / REPORT
				</h5>
				<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
					aria-label="Close"></button>
			</div>

			<!-- Body -->
			<div class="modal-body" id="bankReportContent">
				<div class="p-4" style="background-color: #f8fafc;">

					<!-- Bank Header -->
					<div class="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
						<div>
							<h4 id="bankName" class="mb-0 fw-bold text-primary text-uppercase"></h4>
							<div id="bankAddress" class="text-muted small text-uppercase mt-1"></div>
							<div id="bankContact" class="text-muted small text-uppercase"></div>
						</div>
						<div class="text-end">
							<p class="mb-0">
								<strong class="text-uppercase">CONSULTANT CODE:</strong> <span
									id="financialCode"></span>
							</p>
							<p class="mb-0">
								<strong class="text-uppercase">JOINING DATE:</strong> <span id="joiningDate"></span>
							</p>
						</div>
					</div>

					<!-- Consultant Info -->
					<div class="row mb-3">
						<div class="col-md-6">
							<div class="border p-3 bg-white rounded shadow-sm">
								<h6 class="fw-bold mb-3 text-primary text-uppercase">CONSULTANT DETAILS</h6>
								<p><strong>NAME:</strong> <span id="financialName" class="text-uppercase"></span></p>
								<p><strong>DOB / AGE:</strong> <span id="dob"></span> (<span id="age"></span> YRS)</p>
								<p><strong>CONTACT NO:</strong> <span id="contactNo"></span></p>
								<p><strong>BRANCH:</strong> <span id="branchName" class="text-uppercase"></span></p>
								<p><strong>POSITION:</strong> <span id="selectPosition" class="text-uppercase"></span>
								</p>
							</div>
						</div>

						<div class="col-md-6">
							<div class="border p-3 bg-white rounded shadow-sm">
								<h6 class="fw-bold mb-3 text-primary text-uppercase">ADDRESS & QUALIFICATIONS</h6>
								<p><strong>ADDRESS:</strong> <span id="address" class="text-uppercase"></span></p>
								<p><strong>DISTRICT:</strong> <span id="district" class="text-uppercase"></span></p>
								<p><strong>STATE:</strong> <span id="state" class="text-uppercase"></span> - <span
										id="pinCode"></span></p>
								<p><strong>PROFESSION:</strong> <span id="profession" class="text-uppercase"></span></p>
								<p><strong>ACADEMIC BACKGROUND:</strong> <span id="academicBackground"
										class="text-uppercase"></span></p>
							</div>
						</div>
					</div>

					<!-- Payment Info -->
					<div class="border p-3 bg-white rounded shadow-sm mb-4">
						<h6 class="fw-bold text-primary mb-3 text-uppercase">PAYMENT INFORMATION</h6>
						<div class="row">
							<div class="col-md-6">
								<p><strong>FEES:</strong> &#8377;<span id="fees"></span></p>
								<p><strong>MODE OF PAYMENT:</strong> <span id="modeofPayment"
										class="text-uppercase"></span></p>
								<p><strong>CHEQUE NO:</strong> <span id="chequeNo" class="text-uppercase"></span></p>
							</div>
							<div class="col-md-6">
								<p><strong>CHEQUE DATE:</strong> <span id="chequeDate"></span></p>
								<p><strong>DEPOSIT ACCOUNT:</strong> <span id="depositAccount"
										class="text-uppercase"></span></p>
								<p><strong>REF NO:</strong> <span id="refNo" class="text-uppercase"></span></p>
							</div>
						</div>
					</div>

					<!-- Referral -->
					<div class="border p-3 bg-white rounded shadow-sm mb-4">
						<h6 class="fw-bold text-primary mb-3 text-uppercase">REFERRAL & REPORTING DETAILS</h6>
						<p><strong>REFERRAL CODE:</strong> <span id="referralCode" class="text-uppercase"></span></p>
						<p><strong>REFERRAL NAME:</strong> <span id="referralName" class="text-uppercase"></span></p>
						<p><strong>REPORTING TEAM MEMBER CODE:</strong> <span id="teamMemberCode"
								class="text-uppercase"></span></p>
					</div>

					<!-- Comments & Status -->
					<div class="border p-3 bg-white rounded shadow-sm">
						<h6 class="fw-bold text-primary mb-3 text-uppercase">STATUS & REMARKS</h6>
						<p><strong>REMARKS / COMMENTS:</strong> <span id="comments" class="text-uppercase"></span></p>
						<p><strong>FINANCIAL STATUS:</strong> <span id="financialStatus" class="text-uppercase"></span>
						</p>
						<p><strong>SMS NOTIFICATION:</strong> <span id="smsSend" class="text-uppercase"></span></p>
						<p><strong>APPROVAL STATUS:</strong> <span id="isApproved" class="text-uppercase"></span></p>
					</div>

				</div>
			</div>

			<!-- Footer -->
			<div class="modal-footer bg-light">
				<button id="printBankReportBtn" type="button" class="btn btn-success text-uppercase">
					<i class="bi bi-printer"></i> PRINT DOSSIER
				</button>
				<button type="button" class="btn btn-secondary text-uppercase" data-bs-dismiss="modal">CLOSE</button>
			</div>
		</div>
	</div>
</div>

<script src="${pageContext.request.contextPath}/js/ReportsAndAnalytics/ReportPrintUtil.js"></script>
<script src="${pageContext.request.contextPath}/js/ReportsAndAnalytics/FinancialAdvisorReport.js"></script>