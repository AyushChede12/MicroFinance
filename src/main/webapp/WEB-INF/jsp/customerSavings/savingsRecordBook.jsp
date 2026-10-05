
<style>
@media print {
	body * {
		visibility: hidden !important;
	}
	#passbookSection, #TransactionSection {
		visibility: visible !important;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
	}

	/* Hide sidebar, navbar, buttons during print */
	.sidebar, .navbar, .print-button, .download-button, .footer, .header,
		.btn, .action-buttons {
		display: none !important;
	}

	/* Optional: Remove page margins */
	@page {
		margin: 20mm;
	}
}
</style>
<div class="pagetitle">
	<h1>SAVING / CURRENT ACCOUNT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-bank text-blue"></i>
			</a></li>
			<li class="breadcrumb-item action">SAVINGS RECORD BOOK</li>
		</ol>
	</nav>
</div>


<div>
	<nav>
		<ol class="breadcrumb breadcrumb-title">
			<li class="breadcrumb-item action">SEARCH DETAILS</li>
		</ol>
	</nav>
	<div class="row">
		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="">ACCOUNT TYPE</label> <select id="accountType"
					class="form-control selectField" style="height: 30px;">
					<option value="">--SELECT ACCOUNT TYPE--</option>
					<option value="savingaccount">SAVING ACCOUNT</option>
					<option value="currentaccount">CURRENT ACCOUNT</option>

				</select>
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="">ACCOUNT NO</label> <select id=accountNumber
					class="form-control selectField" style="height: 30px;">
					<option value="">--SELECT ACCOUNT NO--</option>

				</select>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-12 text-center">
			<button id="btnSearchTransactionData" class="btn btn-success"
				onclick="displayTransactionDataList()">
				<span class="fa fa-search"></span> SEARCH
			</button>
			<button id="btnFrontPageOnSavingPassbook" class="btn btn-success"
				onclick="displaySavingfrontPage()">FRONT PAGE</button>
			<button id="btnTransactionPageOnSavingPassbook"
				class="btn btn-success" onclick="displaySavingTransaction()">TRANSACTION</button>
			<button id="btnHeadingOnSavingPassbook" onclick="displayHeadingSA()"
				class="btn btn-success">HEADING</button>
		</div>
	</div>
</div>

<div class="row mt-5">
	<div class="col-12" id="tableSection" style="display: none;">
		<div class="card recent-sales">
			<div class="card-body table-responsive">
				<h5 class="card-title">ACCOUNT HOLDER DETAILS</h5>

				<table class="table table-bordered">
					<thead class="table-light">
						<tr>
							<th style="white-space: nowrap;">SR NO</th>
							<th style="white-space: nowrap;">BRANCH NAME</th>
							<th style="white-space: nowrap;">ACCOUNT NO</th>
							<th style="white-space: nowrap;">CUSTOMER NAME</th>
							<th style="white-space: nowrap;">CUSTOMER CODE</th>
							<th style="white-space: nowrap;">MOBILE NO</th>
							<th style="white-space: nowrap;">ADDRESS</th>
							<th style="white-space: nowrap;">OPENING DATE</th>
							<th style="white-space: nowrap;">OPENING BALANCE</th>
						</tr>
					</thead>
					<tbody id="customerDetails">
						<!-- Rows will be appended dynamically or statically here
 -->
					</tbody>
				</table>

			</div>
		</div>
	</div>
</div>

<div class="row mt-4">
	<div class="col-12 d-flex justify-content-end"
		id="printbtnSection" style="display: none;">
		<button type="button" class="btn btn-success"
			id="printBtn" onclick="printTransactionSection1()">
			<i class="fa-solid fa-print"></i>
		</button>
	</div>
</div>


<!-- ===== PASSBOOK SECTION ===== -->
<div class="row mt-5" id="passbookId">
	<div class="col-12">
		<div id="passbookSection" class="passbookSection card recent-sales"
			style="display: none;">
			<div class="card-body table-responsive" style="width: 100%; margin: auto;">

				<h1 style="margin-top: 35px; text-align: center;">
					MICROFINANCE SERVICES
				</h1>
				<p style="text-align: center;">
					ADDRESS : NAGPUR(440024) - MAHARASHTRA
				</p>
				<hr />

				<!-- ROW 1 -->
				<div class="row mb-2">
					<div class="col-6">
						<strong>CUSTOMER NO. :</strong>
						<span id="customerNo"></span>
					</div>
					<div class="col-6">
						<strong>ACCOUNT NO. :</strong>
						<span id="accountNo"></span>
					</div>
				</div>

				<!-- ROW 2 -->
				<div class="row mb-2">
					<div class="col-6">
						<strong>ACCOUNT HOLDER NAME :</strong>
						<span id="customerName"></span>
					</div>
					<div class="col-6">
						<strong>S/D/W/H/O :</strong>
						<span id="familyDetails"></span>
					</div>
				</div>

				<!-- ROW 3 -->
				<div class="row mb-2">
					<div class="col-6">
						<strong>DATE OF BIRTH :</strong>
						<span id="dateOfBirth"></span>
					</div>
					<div class="col-6">
						<strong>CONTACT NO. :</strong>
						<span id="contactNo"></span>
					</div>
				</div>

				<!-- ROW 4 -->
				<div class="row mb-2">
					<div class="col-6">
						<strong>EMAIL ID :</strong>
						<span id="emailId"></span>
					</div>
					<div class="col-6">
						<strong>MODE OF OPERATION :</strong>
						<span id="operationType"></span>
					</div>
				</div>

				<!-- ROW 5 -->
				<div class="row mb-2">
					<div class="col-6">
						<strong>AADHAR NO. :</strong>
						<span id="aadharNo"></span>
					</div>
					<div class="col-6">
						<strong>ADDRESS :</strong>
						<span id="address"></span>
					</div>
				</div>

				<!-- ROW 6 -->
				<div class="row mb-2">
					<div class="col-6">
						<strong>ACCOUNT TYPE :</strong>
						<span id="typeofaccount"></span>
					</div>
					<div class="col-6">
						<strong>DATE OF ISSUE :</strong>
						<span id="dateOfIssue"></span>
					</div>
				</div>

				<!-- ROW 7 -->
				<div class="row mb-4">
					<div class="col-6">
						<strong>BRANCH :</strong>
						<span id="branchName"></span>
					</div>
					<div class="col-6">
						<strong>UPI :</strong>
						<span id="upi"></span>
					</div>
				</div>

				<!-- SIGNATURE -->
				<div class="row mt-5">
					<div class="col-12 text-end">
						<hr style="border-color: black; width: 20vw; margin-left: auto;">
						<p>AUTHORIZED SIGNATURE</p>
					</div>
				</div>

			</div>
		</div>
	</div>
</div>


<!-- ===== HEADING SECTION ===== -->
<div class="row mt-5">
	<div class="col-12" id="headingSection" style="display: none;">
		<div class="card recent-sales" id="headingId">
			<div class="card-body table-responsive">
				<table class="table" id="heading-tabl">
					<thead>
						<tr style="color: Black; margin: 20px;">
							<th style="text-align: center; width: 100px; font-weight: 400; white-space: nowrap;">TXN
								DATE</th>
							<th style="text-align: center; width: 160px; font-weight: 400; white-space: nowrap;"">PARTICULARS</th>
							<th style="text-align: center; width: 160px; font-weight: 400; white-space: nowrap;"">TRANSACTION
								TYPE</th>
							<th style="text-align: center; width: 160px; font-weight: 400; white-space: nowrap;"">DEBIT/CREDIT</th>
							<th style="text-align: center; width: 160px; font-weight: 400; white-space: nowrap;"">BALANCE</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<!-- ===== TRANSACTION TABLE ===== -->
<div class="row mt-5">
	<div class="col-12" id="TransactionSection" style="display: none;">
		<div class="card recent-sales" id="transactionId">
			<div class="card-body table-responsive">
				<table class="table" id="transaction-tabl">
					<thead>
						<tr>
							<th style="text-align: center; width: 100px"></th>
							<th style="text-align: center; width: 100px"></th>
							<th style="text-align: center; width: 100px"></th>
							<th style="text-align: center; width: 100px"></th>
							<th style="text-align: center; width: 100px"></th>
						</tr>
					</thead>
					<tbody id="tableBody1"></tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<script
	src="${pageContext.request.contextPath}/js/customerSavings/passbook.js"></script>

