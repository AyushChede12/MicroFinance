
<style>
.kyc-modal-dialog {
	width: calc(100% - 30px);
	max-width: 1400px;
}

.kyc-modal-body {
	background: #eef2f6;
	overflow-x: auto;
	padding: 20px;
}

.bank-report-page {
	background: #fff;
	color: #243449;
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	padding: 22px;
	box-sizing: border-box;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	line-height: 1.35;
}

.kyc-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
	padding-bottom: 12px;
}

.kyc-company {
	flex: 1;
	min-width: 0;
}

.kyc-company h1 {
	font-size: 23px;
	font-weight: 800;
	color: #123b68;
	margin: 0 0 5px;
	overflow-wrap: anywhere;
}

.kyc-company p, .kyc-report-heading p {
	margin: 3px 0;
	color: #596579;
	font-size: 10px;
	overflow-wrap: anywhere;
}

.kyc-report-heading {
	text-align: right;
	min-width: 210px;
}

.kyc-report-heading h2 {
	color: #147d68;
	font-size: 16px;
	margin: 0 0 5px;
	font-weight: 800;
}

.kyc-top-line {
	height: 4px;
	background: linear-gradient(90deg, #123b68 0%, #147d68 100%);
	margin-bottom: 14px;
}

.kyc-profile {
	display: grid;
	grid-template-columns: 105px minmax(0, 1fr);
	gap: 14px;
	margin-bottom: 12px;
	align-items: stretch;
}

.kyc-photo-box {
	border: 1px solid #d7e0e9;
	padding: 5px;
	text-align: center;
	border-radius: 4px;
	align-self: start;
}

.kyc-photo-box img {
	width: 90px;
	height: 100px;
	object-fit: contain;
	display: block;
	margin: auto;
}

.kyc-photo-caption {
	margin-top: 4px;
	font-size: 8px;
	font-weight: bold;
	color: #526174;
}

.kyc-section {
	margin-top: 11px;
	page-break-inside: avoid;
	break-inside: avoid;
}

.kyc-section-title {
	background: #eaf1f7;
	border-left: 4px solid #147d68;
	color: #123b68;
	padding: 7px 9px;
	font-size: 11px;
	font-weight: 800;
	margin-bottom: 7px;
}

.kyc-summary-grid, .kyc-grid {
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	gap: 7px;
}

.kyc-summary-grid {
	grid-template-columns: repeat(3, minmax(0, 1fr));
}

.kyc-item {
	border: 1px solid #dce4ec;
	border-radius: 3px;
	padding: 6px 7px;
	min-width: 0;
	box-sizing: border-box;
	background: #fff;
}

.kyc-item span, .kyc-label {
	display: block;
	font-size: 8px;
	color: #66758a;
	font-weight: 700;
	margin-bottom: 3px;
}

.kyc-item strong {
	display: block;
	font-size: 10px;
	color: #243449;
	font-weight: 700;
	overflow-wrap: anywhere;
	word-break: break-word;
}

.kyc-item-wide {
	grid-column: span 2;
}

.kyc-bottom {
	display: grid;
	grid-template-columns: 180px minmax(0, 1fr);
	gap: 18px;
	align-items: end;
	margin-top: 13px;
}

.kyc-signature-area {
	border: 1px solid #dce4ec;
	padding: 7px;
	min-height: 80px;
	border-radius: 3px;
}

.kyc-signature-area img {
	display: block;
	width: 150px;
	height: 48px;
	object-fit: contain;
	margin: 3px auto 0;
}

.kyc-declaration {
	border: 1px solid #dce4ec;
	padding: 9px;
	border-radius: 3px;
	color: #526174;
	font-size: 9px;
}

.kyc-declaration strong {
	color: #123b68;
	font-size: 9px;
}

.kyc-declaration p {
	margin: 5px 0 0;
}

.kyc-footer {
	display: flex;
	justify-content: space-between;
	gap: 12px;
	border-top: 1px solid #cbd5df;
	margin-top: 12px;
	padding-top: 7px;
	color: #66758a;
	font-size: 8px;
	font-weight: bold;
}

@media ( max-width : 767px) {
	.kyc-header {
		align-items: flex-start;
		flex-direction: column;
	}
	.kyc-report-heading {
		text-align: left;
	}
	.kyc-summary-grid, .kyc-grid {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
	.kyc-profile {
		grid-template-columns: 90px minmax(0, 1fr);
	}
	.kyc-bottom {
		grid-template-columns: 1fr;
	}
}
</style>

<div class="pagetitle">
	<h1>CUSTOMER MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-people-fill"></i>
			</a></li>
			<li class="breadcrumb-item action">CUSTOMER REPORT</li>
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
				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="">BRANCH</label> <select id="branchName"
							name="branchName" required="required"
							class="form-control selectField">
							<option value="">SELECT BRANCH</option>
						</select>
					</div>
				</div>

				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">DATE FROM</label> <input type="date"
							name="fromDate" id="fromDate" required="required"
							placeholder="Enter From Date" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">DATE TO</label> <input type="date"
							name="toDate" id="toDate" required="required"
							placeholder="Enter To Date" style="text-transform: uppercase;" />
					</div>
				</div>
			</div>
		</div>
	</form>
</div>

<div class="row">
	<div class="col-12 text-center mt-3">
		<button id="searchBtn" class="btnStyle"
			style="background-color: #FFA500;">Search</button>
	</div>
</div>
</form>

<div class="row mt-5">
	<div class="col-12">
		<div class="card recent-sales">

			<div class="card-body table-responsive">
				<h5 class="card-title">SEARCH RESULT</h5>


				<div style="overflow-x: auto; white-space: nowrap;">
					<table class="table table-borderless datatable">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">SL NO</th>
								<th scope="col">CUSTOMER CODE</th>
								<th scope="col">CUSTOMER NAME</th>
								<th scope="col">BRANCH NAME</th>
								<th scope="col">DATE OF BIRTH</th>
								<th scope="col">FAMILY MEMBER NAME</th>
								<th scope="col">ADDRESS</th>
								<th scope="col">CONTACT NO</th>
								<th scope="col">AADHAR NO</th>
								<th scope="col">PAN</th>
								<th scope="col">REGISTRATION DATE</th>
								<th scope="col">APPROVAL STATUS</th>
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

<div class="modal fade" id="bankReportModal" tabindex="-1" role="dialog"
	aria-labelledby="bankReportModalTitle" aria-hidden="true">

	<div class="modal-dialog modal-xl kyc-modal-dialog" role="document">
		<div class="modal-content">

			<div class="modal-header">
				<h5 class="modal-title" id="bankReportModalTitle">CUSTOMER KYC
					REPORT</h5>
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body kyc-modal-body">

				<!-- THIS SECTION IS EXPORTED -->
				<div id="bankReportContent">
					<div class="bank-report-page" id="customerKycReport">

						<!-- COMPANY HEADER -->
						<div class="kyc-header">
							<div class="kyc-company">
								<h1 id="bankName">COMPANY NAME</h1>
								<p id="companyAddress">OFFICIAL CUSTOMER RECORD</p>
							</div>

							<div class="kyc-report-heading">
								<h2>CUSTOMER KYC PROFILE</h2>
								<p id="reportTitle">CUSTOMER KYC PROFILE</p>
								<p>
									GENERATED: <span id="reportGeneratedDate">N/A</span>
								</p>
							</div>
						</div>

						<div class="kyc-top-line"></div>

						<!-- PROFILE SUMMARY -->
						<div class="kyc-profile">
							<div class="kyc-photo-box">
								<img id="photoPreviewLarge"
									src="https://placehold.co/120x140?text=PHOTO"
									alt="CUSTOMER PHOTO">
								<div class="kyc-photo-caption">CUSTOMER PHOTO</div>
							</div>

							<div class="kyc-profile-info">
								<div class="kyc-section-title">CUSTOMER PROFILE</div>

								<div class="kyc-summary-grid">
									<div class="kyc-item">
										<span>MEMBER / CUSTOMER CODE</span> <strong id="customerCode">N/A</strong>
									</div>
									<div class="kyc-item">
										<span>CUSTOMER NAME</span> <strong id="customerName">N/A</strong>
									</div>
									<div class="kyc-item">
										<span>BRANCH</span> <strong id="detailBranch">N/A</strong>
									</div>
									<div class="kyc-item">
										<span>REGISTRATION DATE</span> <strong id="signupDate">N/A</strong>
									</div>
									<div class="kyc-item">
										<span>APPROVAL STATUS</span> <strong
											id="customerApprovalStatus">N/A</strong>
									</div>
									<div class="kyc-item">
										<span>DATE OF BIRTH</span> <strong id="dob">N/A</strong>
									</div>
								</div>
							</div>
						</div>

						<!-- PERSONAL DETAILS -->
						<div class="kyc-section">
							<div class="kyc-section-title">01. PERSONAL INFORMATION</div>
							<div class="kyc-grid">
								<div class="kyc-item">
									<span>FULL NAME</span> <strong id="detailCustomerName">N/A</strong>
								</div>
								<div class="kyc-item">
									<span>MEMBER CODE</span> <strong id="detailCustomerCode">N/A</strong>
								</div>
								<div class="kyc-item">
									<span>GENDER</span> <strong id="detailGender">N/A</strong>
								</div>
								<div class="kyc-item">
									<span>DATE OF BIRTH</span> <strong id="detailDob">N/A</strong>
								</div>
								<div class="kyc-item">
									<span>AGE</span> <strong id="detailAge">N/A</strong>
								</div>
								<div class="kyc-item">
									<span>MARITAL STATUS</span> <strong id="detailMaritalStatus">N/A</strong>
								</div>
								<div class="kyc-item">
									<span>NOMINEE NAME</span> <strong id="detailNominee">N/A</strong>
								</div>
								<div class="kyc-item">
									<span>BRANCH NAME</span> <strong id="detailBranchName">N/A</strong>
								</div>
							</div>
						</div>

						<!-- CONTACT DETAILS -->
						<div class="kyc-section">
							<div class="kyc-section-title">02. CONTACT INFORMATION</div>
							<div class="kyc-grid">
								<div class="kyc-item">
									<span>MOBILE NUMBER</span> <strong id="detailContactNo">N/A</strong>
								</div>
								<div class="kyc-item">
									<span>EMAIL ADDRESS</span> <strong id="detailEmail">N/A</strong>
								</div>
								<div class="kyc-item kyc-item-wide">
									<span>RESIDENTIAL ADDRESS</span> <strong id="detailAddress">N/A</strong>
								</div>
								<div class="kyc-item">
									<span>STATE</span> <strong id="detailState">N/A</strong>
								</div>
								<div class="kyc-item">
									<span>DISTRICT</span> <strong id="detailDistrict">N/A</strong>
								</div>
								<div class="kyc-item">
									<span>PIN CODE</span> <strong id="detailPincode">N/A</strong>
								</div>
							</div>
						</div>

						<!-- KYC DETAILS -->
						<div class="kyc-section">
							<div class="kyc-section-title">03. KYC DOCUMENT DETAILS</div>
							<div class="kyc-grid">
								<div class="kyc-item">
									<span>AADHAAR NUMBER</span> <strong id="detailAadhar">N/A</strong>
								</div>
								<div class="kyc-item">
									<span>PAN NUMBER</span> <strong id="detailPan">N/A</strong>
								</div>
								<div class="kyc-item">
									<span>VOTER ID</span> <strong id="detailVoter">N/A</strong>
								</div>
								<div class="kyc-item">
									<span>DRIVING LICENCE</span> <strong id="detailDriving">N/A</strong>
								</div>
							</div>
						</div>

						<!-- SIGNATURE AND FOOTER -->
						<div class="kyc-bottom">
							<div class="kyc-signature-area">
								<span class="kyc-label">CUSTOMER SIGNATURE</span> <img
									id="signaturePreview"
									src="https://placehold.co/220x70?text=SIGNATURE"
									alt="CUSTOMER SIGNATURE">
							</div>

							<div class="kyc-declaration">
								<strong>DECLARATION</strong>
								<p>This report contains customer information available in
									the system as of the report generation date. Please verify the
									details against the original documents.</p>
							</div>
						</div>

						<div class="kyc-footer">
							<span>CONFIDENTIAL — FOR OFFICIAL USE ONLY</span> <span>CUSTOMER
								KYC RECORD</span>
						</div>

					</div>
				</div>
				<!-- END EXPORT SECTION -->

			</div>

			<div class="modal-footer">
				<button type="button" class="btn btn-outline-danger"
					id="downloadPDF">
					<i class="fa fa-file-pdf-o"></i> SAVE PDF
				</button>

				<button type="button" class="btn btn-outline-primary"
					id="downloadWord">
					<i class="fa fa-file-word-o"></i> EXPORT WORD
				</button>

				<button type="button" class="btn btn-outline-success"
					id="downloadExcel">
					<i class="fa fa-file-excel-o"></i> EXPORT EXCEL
				</button>

				<button type="button" class="btn btn-secondary" data-dismiss="modal">
					CLOSE</button>
			</div>

		</div>
	</div>
</div>


<script
	src="${pageContext.request.contextPath}/js/customerManagement/customerReport.js"></script>