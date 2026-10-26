<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<style>
.interest-card {
	background: #fff;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	padding: 14px 18px;
	border-left: 4px solid #0d6efd;
	transition: all 0.2s ease;
}

.interest-card:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.interest-card .card-title {
	font-size: 11px;
	font-weight: 600;
	color: #6c757d;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	margin-bottom: 4px;
}

.interest-card .card-value {
	font-size: 19px;
	font-weight: 700;
	color: #212529;
}

.badge-due {
	background-color: #198754;
	color: white;
	font-weight: 600;
	padding: 4px 8px;
	border-radius: 4px;
	font-size: 11px;
}

.badge-upcoming {
	background-color: #0dcaf0;
	color: #000;
	font-weight: 600;
	padding: 4px 8px;
	border-radius: 4px;
	font-size: 11px;
}

.badge-cycle {
	background-color: #e9ecef;
	color: #495057;
	font-weight: 600;
	padding: 3px 6px;
	border-radius: 4px;
	font-size: 11px;
	font-family: monospace;
}

.interest-rate-input {
	width: 70px;
	text-align: center;
	padding: 2px 4px;
	font-weight: 600;
	border: 1px solid #ced4da;
	border-radius: 4px;
}

.highlight-interest {
	color: #198754;
	font-weight: 700;
}

.highlight-newbalance {
	color: #0d6efd;
	font-weight: 700;
}
</style>

<div class="pagetitle">
	<h1>SAVING / CURRENT ACCOUNT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-bank text-blue"></i>
			</a></li>
			<li class="breadcrumb-item action">SAVINGS ACCOUNT INTEREST
				TRANSFER</li>
		</ol>
	</nav>
</div>

<div>
	<div>
		<div class="d-flex justify-content-between align-items-center mb-3">
			<nav>
				<ol class="breadcrumb breadcrumb-title mb-0">
					<li class="breadcrumb-item action">QUARTERLY INTEREST TRANSFER</li>
				</ol>
			</nav>
			<button type="button" class="btn btn-outline-secondary btn-sm px-3"
				id="refreshBtn" title="Reload from server">
				<i class="bi bi-arrow-clockwise me-1"></i> REFRESH DATA
			</button>
		</div>

		<!-- Information banner -->
		<div
			class="alert alert-primary py-2 px-3 mb-3 d-flex align-items-center"
			style="font-size: 13px;">
			<i class="bi bi-calendar-check-fill me-2 fs-5"></i>
			<div>
				<strong>Quarterly Interest Transfer:</strong> Interest is calculated
				every 3 months individually for each customer based on their own
				account opening / joining date (e.g. 1 July &rarr; 1 Oct; 3 July
				&rarr; 3 Oct). Formula:
				<code>(Balance &times; Interest % &times; Days) &divide;
					36,500</code>
				.
			</div>
		</div>

		<!-- Summary Statistics Cards -->
		<div class="row g-3 mb-3">
			<div class="col-lg-3 col-sm-6">
				<div class="interest-card" style="border-left-color: #0d6efd;">
					<div class="card-title">Total Accounts</div>
					<div class="card-value" id="statTotalAccounts">0</div>
				</div>
			</div>
			<div class="col-lg-3 col-sm-6">
				<div class="interest-card" style="border-left-color: #198754;">
					<div class="card-title">Selected Accounts</div>
					<div class="card-value text-success" id="statSelectedAccounts">0</div>
				</div>
			</div>
			<div class="col-lg-3 col-sm-6">
				<div class="interest-card" style="border-left-color: #fd7e14;">
					<div class="card-title">Selected Accounts Balance</div>
					<div class="card-value" id="statSelectedBalance">₹ 0.00</div>
				</div>
			</div>
			<div class="col-lg-3 col-sm-6">
				<div class="interest-card" style="border-left-color: #6f42c1;">
					<div class="card-title">Total Interest to Credit</div>
					<div class="card-value text-primary" id="statTotalInterest">₹
						0.00</div>
				</div>
			</div>
		</div>

		<!-- Customer Table -->
		<div class="table-responsive">
			<table class="table table-bordered table-hover align-middle"
				id="interestCustomerTable">
				<thead class="table-dark text-nowrap" style="font-size: 12px;">
					<tr>
						<th class="text-center" style="width: 40px;"><input
							type="checkbox" id="selectAll" /></th>
						<th class="text-center">S.NO</th>
						<th>ACCOUNT NUMBER</th>
						<th>CUSTOMER NAME</th>
						<th class="text-center">JOINING DATE</th>
						<th class="text-center">QUARTER CYCLE (FROM &rarr; TO)</th>
						<th class="text-center">QUARTER DUE DATE</th>
						<th class="text-end">BALANCE (₹)</th>
						<th class="text-center">INTEREST %</th>
						<th class="text-center">DAYS</th>
						<th class="text-end">INTEREST AMOUNT (₹)</th>
						<th class="text-end">NEW BALANCE (₹)</th>
						<th class="text-center">STATUS</th>
					</tr>
				</thead>
				<tbody id="interestCustomerBody" style="font-size: 13px;">
					<tr>
						<td colspan="13" class="text-center py-4"><span
							class="spinner-border spinner-border-sm me-2"></span>Loading
							customer accounts...</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- Transfer Interest Button at Bottom of Table -->
		<div class="row mt-4 mb-4">
			<div class="col-12 text-center">
				<button type="button"
					class="btn btn-success btn-lg px-5 py-2 fw-bold shadow"
					id="transferInterestBtn"
					style="font-size: 16px; border-radius: 6px;" disabled>
					<i class="bi bi-check2-circle me-2"></i> TRANSFER INTEREST (<span
						id="selectedCount">0</span> SELECTED)
				</button>
			</div>
		</div>
	</div>
</div>

<script
	src="${pageContext.request.contextPath}/js/customerSavings/SBInterestTransfer.js"></script>