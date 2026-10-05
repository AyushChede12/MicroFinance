
<style>
.report-container {
	font-family: 'Segoe UI', Arial, sans-serif;
	color: #222;
	padding: 30px;
	background: #fff;
	border-radius: 12px;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.report-header {
	text-align: center;
	border-bottom: 3px solid #007bff;
	margin-bottom: 20px;
}

.report-header h2 {
	font-weight: 700;
	color: #007bff;
}

.report-header p {
	margin: 0;
	font-size: 14px;
}

.section-title {
	font-size: 16px;
	margin-top: 25px;
	margin-bottom: 10px;
	font-weight: bold;
	border-left: 4px solid #007bff;
	padding-left: 10px;
}

.report-table {
	width: 100%;
	border-collapse: collapse;
	margin-bottom: 20px;
}

.report-table th, .report-table td {
	border: 1px solid #ccc;
	padding: 8px 12px;
	font-size: 14px;
}

.report-table th {
	background: #f7f9fc;
	width: 30%;
}

.signature-section {
	margin-top: 40px;
	text-align: right;
}

.signature-section hr {
	width: 200px;
	border-top: 2px solid #000;
	margin-bottom: 5px;
}

/* Table Container */
.policy-table-wrapper {
	max-height: 400px;
	overflow: auto;
	border: 1px solid #dee2e6;
	border-radius: 10px;
	background: #fff;
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

/* Table */
#policyTable {
	margin-bottom: 0;
	min-width: 1800px;
	border-collapse: separate;
	border-spacing: 0;
	font-size: 13px;
	color: #343a40;
}

/* Header */
#policyTable thead th {
	position: sticky;
	top: 0;
	z-index: 10;
	background: linear-gradient(135deg, #343a40, #212529);
	color: #fff;
	font-weight: 600;
	text-transform: uppercase;
	font-size: 12px;
	letter-spacing: 0.3px;
	padding: 13px 12px;
	border: none;
	white-space: nowrap;
	vertical-align: middle;
}

/* Header rounded corners */
#policyTable thead th:first-child {
	border-top-left-radius: 8px;
}

#policyTable thead th:last-child {
	border-top-right-radius: 8px;
}

/* Table Body */
#policyTable tbody td {
	padding: 11px 12px;
	vertical-align: middle;
	white-space: nowrap;
	border-bottom: 1px solid #e9ecef;
	border-left: none;
	border-right: none;
}

/* Alternate rows */
#policyTable tbody tr:nth-child(even) {
	background-color: #f8f9fa;
}

/* Hover effect */
#policyTable tbody tr {
	transition: all 0.2s ease;
}

#policyTable tbody tr:hover {
	background-color: #eef5ff;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Policy Code */
#policyTable tbody td:first-child {
	font-weight: 700;
	color: #007bff;
}

/* Amount columns */
#policyTable tbody td:nth-child(3), #policyTable tbody td:nth-child(6),
	#policyTable tbody td:nth-child(7), #policyTable tbody td:nth-child(13)
	{
	font-weight: 600;
	color: #198754;
}

/* Approved column */
#policyTable tbody td:nth-child(16) {
	text-align: center;
}

/* Action column */
#policyTable tbody td:last-child {
	text-align: center;
}

/* Buttons inside Action */
#policyTable .btn {
	border-radius: 6px;
	font-size: 12px;
	padding: 5px 10px;
	margin: 2px;
	transition: all 0.2s ease;
}

#policyTable .btn:hover {
	transform: translateY(-1px);
}

/* Scrollbar */
.policy-table-wrapper::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}

.policy-table-wrapper::-webkit-scrollbar-track {
	background: #f1f1f1;
	border-radius: 10px;
}

.policy-table-wrapper::-webkit-scrollbar-thumb {
	background: #adb5bd;
	border-radius: 10px;
}

.policy-table-wrapper::-webkit-scrollbar-thumb:hover {
	background: #6c757d;
}
</style>

<div class="pagetitle">
	<h1>POLICY MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-piggy-bank"></i>
			</a></li>
			<li class="breadcrumb-item action">INVESTMENT TRANSACTION SLIP</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">PRINT SEARCH RESULTS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="col-lg-12 mb-4 ">
						<div class="d-flex flex-column formFields">
							<label for="">FIND BY POLICY CODE <span class="star">*</span></label>
							<select id="findPolicyNumber" name="findPolicyNumber"
								required="required" class="form-control selectField"
								style="height: 30px;">
								<option value="">SELECT POLICY CODE</option>

							</select>
						</div>
					</div>





				</div>

				<div class="row" style="margin-top: 20px; margin-left: 750px;">
					<div class="col-12 text-center">
						<button type="button" id="findBtn" class="btn btn-dark">FIND</button>
					</div>
				</div>

			</div>

			<div class="mt-5">
				<div class="row" id="policyDataRow">
					<div class="col-lg-12">

						<div class="policy-table-wrapper">

							<table class="table" id="policyTable">

								<thead>
									<tr>
										<th>Policy Code</th>
										<th>Customer Name</th>
										<th>Policy Amount</th>
										<th>Renewal Date</th>
										<th>Policy Type</th>
										<th>Maturity Amount</th>
										<th>Deposit Amount</th>
										<th>Start Date</th>
										<th>Policy Term</th>
										<th>Maturity Date</th>
										<th>Customer Code</th>
										<th>Contact No</th>
										<th>Total Deposit</th>
										<th>Payment Due</th>
										<th>Total Installments</th>
										<th>Installments Paid</th>
										<th>Approved</th>
										<th>Branch Name</th>
										<th>Action</th>
									</tr>
								</thead>

								<tbody id="policyTableBody">
									<!-- Data will be inserted here -->
								</tbody>

							</table>

						</div>

					</div>
				</div>
			</div>


			<!-- <div id="transactionSection" class="transaction-section">
						<div style="width: 70%; margin: auto">
							<h1>Microfinance Services</h1>
							<p>Address : Nagpur(440024) - Maharashtra</p>
							<hr />

							<div class="d-flex justify-content-between">
								<p>
									Branch Name: <span id="branchCodeSpan"
										style="width: 12vw; display: inline-block;"></span>
								</p>
								<p>
									Start Date: <span id="docSpan"
										style="width: 15vw; display: inline-block;"></span>
								</p>
							</div>

							<div class="d-flex justify-content-between">
								<p>
									Policy Code: <span id="policyNoSpan"
										style="width: 12vw; display: inline-block;"></span>
								</p>
								<p>
									Customer Code: <span id="memberCodeSpan"
										style="width: 12vw; display: inline-block;"></span>
								</p>
							</div>

							<p>
								Customer Name: <span id="applicantNameSpan"
									style="width: 12vw; display: inline-block;"></span>
							</p>
							<p>
								Contact No: <span id="mobileSpan"
									style="width: 12vw; display: inline-block;"></span>
							</p>

							<div class="d-flex justify-content-between">
								<p>
									Policy Type: <span id="planSpan"
										style="width: 12vw; display: inline-block;"></span>
								</p>
								<p>
									Policy Term: <span id="termSpan"
										style="width: 12vw; display: inline-block;"></span>
								</p>
								<p>
									Approved: <span id="approvedSpan"
										style="width: 12vw; display: inline-block;"></span>
								</p>
							</div>

							<div class="d-flex justify-content-between">
								<p>
									Policy Amount: <span id="renewalAmountSpan"
										style="width: 12vw; display: inline-block;"></span>
								</p>
								<p>
									Total Deposit: <span id="totalValueSpan"
										style="width: 12vw; display: inline-block;"></span>
								</p>
								<p>
									Payment Due: <span id="paymentDueSpan"
										style="width: 12vw; display: inline-block;"></span>
								</p>
							</div>

							<div class="d-flex justify-content-between">
								<p>
									Maturity Amount: <span id="maturitySpan"
										style="width: 12vw; display: inline-block;"></span>
								</p>
								<p>
									Maturity Date: <span id="maturityDateSpan"
										style="width: 12vw; display: inline-block;"></span>
								</p>
								<p>
									No. of Installments Paid: <span id="installmentsPaidSpan"
										style="width: 12vw; display: inline-block;"></span>
								</p>
							</div>

							<div class="d-flex justify-content-end">
								<hr style="border-color: black; width: 20vw;">
								<p style="position: relative; top: 23px; right: 17rem">Authorized
									Signature</p>
							</div>
						</div>
					</div> -->
					<br><br><br><br>
			<!-- <div class="mb-4"
				style="display: flex; justify-content: center; margin-top: -55px;">
				<button id="printBtn" class="btn btn-success">Print</button>
			</div> -->


		</div>

		<!-- ✅ Modal for Report Preview -->
		<div class="modal fade" id="printModal" tabindex="-1"
			aria-labelledby="printModalLabel" aria-hidden="true">
			<div
				class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
				<div class="modal-content">
					<div class="modal-header bg-primary text-white">
						<h5 class="modal-title" id="printModalLabel">POLICY REPORT
							PREVIEW</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
					</div>

					<div class="modal-body">
						<div id="modalDataContainer"></div>
					</div>

					<div class="modal-footer">
						<button id="printBtn" class="btn btn-success">
							<i class="bi bi-printer"></i> PRINT
						</button>
						<button id="downloadBtn" class="btn btn-danger">
							<i class="bi bi-file-earmark-pdf"></i> PDF
						</button>
					</div>
				</div>
			</div>
		</div>

	</form>
</div>

<!-- Load html2pdf -->
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

<script>
    document.getElementById("printBtn").addEventListener("click", function () {
        const printContent = document.getElementById("transactionSection").innerHTML;

        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('<style>');
        printWindow.document.write(`
            body {
                font-family: Arial, sans-serif;
                padding: 20px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
            }
            table, th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
            }
        `);
        printWindow.document.write('</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();

        // Wait for new window to load before printing
        printWindow.onload = function () {
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        };
    });
</script>

<script
	src="${pageContext.request.contextPath}/js/PolicyManagment/policyReport.js"></script>
