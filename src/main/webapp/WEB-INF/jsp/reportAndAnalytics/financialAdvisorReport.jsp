
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

.table th, .table td {
	vertical-align: middle;
}
</style>

<div class="pagetitle">
	<h1>REPORTS & ANALYTICS</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-file-earmark-text"></i>
			</a></li>
			<li class="breadcrumb-item action">FINANCIAL CONSULTANT REPORT</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH FINANCIAL CONSULTANTS</li>
				</ol>
			</nav>
			<div class="row">

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px;">
						<label for="branchName2">BRANCH NAME</label> <select id="branchName2"
							name="branchName2" required="required"
							class="form-control selectField" style="height: 30px; text-transform: uppercase;">
							<option value="">-- ALL BRANCHES --</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="fromDate">FROM DATE :</label> <input type="date"
							name="fromDate" id="fromDate" required="required"
							placeholder="ENTER FROM DATE" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="toDate">TO DATE :</label> <input type="date" name="toDate"
							id="toDate" required="required" placeholder="ENTER TO DATE"
							style="text-transform: uppercase;" />
					</div>
				</div>

			</div>

			<div class="row">
				<div class="col-4 text-start mt-3">
					<button type="submit" id="findFinancialAdvisorBtn" class="btnStyle"
						style="background-color: #FFA500;">FIND CONSULTANTS</button>
				</div>
			</div>

		</div>

	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">FINANCIAL CONSULTANT RECORDS</h5>

					<table class="table table-borderless datatable overflow-scroll">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th style="white-space: nowrap;">SR</th>
								<th style="white-space: nowrap;">FINANCIAL CODE</th>
								<th style="white-space: nowrap;">FINANCIAL NAME</th>
								<th style="white-space: nowrap;">JOINING DATE</th>
								<th style="white-space: nowrap;">BRANCH</th>
								<th style="white-space: nowrap;">DOB</th>
								<th style="white-space: nowrap;">CONTACT NUMBER</th>
								<th style="white-space: nowrap;">ADDRESS</th>
								<th style="white-space: nowrap;">APPROVED STATUS</th>
								<th>ACTION</th>
							</tr>
						</thead>
						<tbody class='tablebody' id="fetchFinancialConsultants">
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

</div>

<div class="modal fade" id="bankReportModal" tabindex="-1"
	aria-hidden="true">
	<div class="modal-dialog modal-xl modal-dialog-scrollable">
		<div class="modal-content shadow-lg border-0">

			<!-- Header -->
			<div class="modal-header text-white">
				<h5 class="modal-title">
					<i class="bi bi-person-vcard me-2"></i> FINANCIAL CONSULTANT REPORT
				</h5>
				<button type="button" class="btn-close btn-close-white"
					data-bs-dismiss="modal" aria-label="Close"></button>
			</div>

			<!-- Body -->
			<div class="modal-body" id="bankReportContent">
				<div class="p-4" style="background-color: #f8fafc;">

					<!-- Bank Header -->
					<div
						class="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
						<div class="d-flex align-items-center">
							<div>
								<h4 id="bankName" class="mb-0 fw-bold text-primary">MICROFINANCE BANKING SYSTEM</h4>
								<small id="reportTitle" class="text-secondary">FINANCIAL ADVISOR / CONSULTANT DOSSIER</small>
							</div>
						</div>
						<div>
							<p class="mb-0">
								<strong>CONSULTANT CODE:</strong> <span id="financialCode"></span>
							</p>
							<p class="mb-0">
								<strong>JOINING DATE:</strong> <span id="joiningDate"></span>
							</p>
						</div>
					</div>

					<!-- Consultant Info -->
					<div class="row mb-3">
						<div class="col-md-6">
							<div class="border p-3 bg-white rounded shadow-sm">
								<h6 class="fw-bold mb-3 text-primary">CONSULTANT DETAILS</h6>
								<p>
									<strong>NAME:</strong> <span id="financialName"></span>
								</p>
								<p>
									<strong>DOB:</strong> <span id="dob"></span> (<span id="age"></span>
									YRS)
								</p>
								<p>
									<strong>CONTACT NO:</strong> <span id="contactNo"></span>
								</p>
								<p>
									<strong>BRANCH:</strong> <span id="branchName"></span>
								</p>
								<p>
									<strong>POSITION:</strong> <span id="selectPosition"></span>
								</p>
							</div>
						</div>

						<div class="col-md-6">
							<div class="border p-3 bg-white rounded shadow-sm">
								<h6 class="fw-bold mb-3 text-primary">ADDRESS & OTHER INFO</h6>
								<p>
									<strong>ADDRESS:</strong> <span id="address"></span>
								</p>
								<p>
									<strong>DISTRICT:</strong> <span id="district"></span>
								</p>
								<p>
									<strong>STATE:</strong> <span id="state"></span> - <span
										id="pinCode"></span>
								</p>
								<p>
									<strong>PROFESSION:</strong> <span id="profession"></span>
								</p>
								<p>
									<strong>ACADEMIC BACKGROUND:</strong> <span
										id="academicBackground"></span>
								</p>
							</div>
						</div>
					</div>

					<!-- Payment Info -->
					<div class="border p-3 bg-white rounded shadow-sm mb-4">
						<h6 class="fw-bold text-primary mb-3">PAYMENT INFORMATION</h6>
						<div class="row">
							<div class="col-md-6">
								<p>
									<strong>FEES:</strong> &#8377;<span id="fees"></span>
								</p>
								<p>
									<strong>MODE OF PAYMENT:</strong> <span id="modeofPayment"></span>
								</p>
								<p>
									<strong>CHEQUE NO:</strong> <span id="chequeNo"></span>
								</p>
							</div>
							<div class="col-md-6">
								<p>
									<strong>CHEQUE DATE:</strong> <span id="chequeDate"></span>
								</p>
								<p>
									<strong>DEPOSIT ACCOUNT:</strong> <span id="depositAccount"></span>
								</p>
								<p>
									<strong>REF NO:</strong> <span id="refNo"></span>
								</p>
							</div>
						</div>
					</div>

					<!-- Referral -->
					<div class="border p-3 bg-white rounded shadow-sm mb-4">
						<h6 class="fw-bold text-primary mb-3">REFERRAL DETAILS</h6>
						<p>
							<strong>REFERRAL CODE:</strong> <span id="referralCode"></span>
						</p>
						<p>
							<strong>REFERRAL NAME:</strong> <span id="referralName"></span>
						</p>
					</div>

					<!-- Comments & Status -->
					<div class="border p-3 bg-white rounded shadow-sm">
						<h6 class="fw-bold text-primary mb-3">STATUS</h6>
						<p>
							<strong>COMMENTS:</strong> <span id="comments"></span>
						</p>
						<p>
							<strong>FINANCIAL STATUS:</strong> <span id="financialStatus"></span>
						</p>
						<p>
							<strong>SMS SEND:</strong> <span id="smsSend"></span>
						</p>
						<p>
							<strong>APPROVED:</strong> <span id="isApproved"></span>
						</p>
					</div>

				</div>
			</div>

			<!-- Footer -->
			<div class="modal-footer bg-light">
				<button id="printBankReportBtn"
					type="button"
					class="btn btn-success">
					<i class="bi bi-printer"></i> PRINT REPORT
				</button>
				<button type="button" class="btn btn-secondary"
					data-bs-dismiss="modal">CLOSE</button>
			</div>
		</div>
	</div>
</div>

<script src="${pageContext.request.contextPath}/js/ReportsAndAnalytics/FinancialAdvisorReport.js"></script>
