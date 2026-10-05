<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="pagetitle">
	<h1>SAVINGS ACCOUNTS</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i class="bi bi-bank text-blue"></i>
			</a></li>
			<li class="breadcrumb-item action">SAVINGS ACCOUNT LIST</li>
		</ol>
	</nav>
</div>

<!-- Info Banner -->
<div class="alert alert-info d-flex align-items-center mb-4" style="border-radius: 8px; font-family: 'Poppins', sans-serif; font-size: 13px;">
	<i class="bi bi-info-circle-fill me-2" style="font-size: 18px;"></i>
	<span>Savings accounts are <strong>automatically created</strong> when a new customer is added. To open a new savings account, please use <strong>Add Customer</strong>.</span>
</div>

<!-- Search / Filter Bar -->
<div class="card mb-3" style="border-radius: 10px;">
	<div class="card-body py-3">
		<div class="row g-2 align-items-end">
			<div class="col-lg-3">
				<label style="font-size: 11px; font-weight: 600; font-family: 'Poppins', sans-serif;">SEARCH BY CUSTOMER CODE / NAME</label>
				<input type="text" id="searchInput" class="form-control" placeholder="Type to search..." style="height: 32px; font-size: 12px;" oninput="filterTable()">
			</div>
			<div class="col-lg-2">
				<label style="font-size: 11px; font-weight: 600; font-family: 'Poppins', sans-serif;">ACCOUNT TYPE</label>
				<select id="filterAccountType" class="form-control selectField" style="height: 32px; font-size: 12px;" onchange="filterTable()">
					<option value="">ALL</option>
					<option value="savingaccount">SAVING ACCOUNT</option>
					<option value="currentaccount">CURRENT ACCOUNT</option>
				</select>
			</div>
			<div class="col-lg-2">
				<label style="font-size: 11px; font-weight: 600; font-family: 'Poppins', sans-serif;">ACCOUNT STATUS</label>
				<select id="filterStatus" class="form-control selectField" style="height: 32px; font-size: 12px;" onchange="filterTable()">
					<option value="">ALL</option>
					<option value="1">ACTIVE</option>
					<option value="0">INACTIVE</option>
				</select>
			</div>
			<div class="col-lg-2">
				<button class="btn btn-secondary btn-sm" onclick="clearFilters()" style="font-size: 12px; font-family: 'Poppins', sans-serif;">
					<i class="bi bi-x-circle"></i> CLEAR
				</button>
			</div>
			<div class="col-lg-3 text-end">
				<span id="recordCount" style="font-size: 12px; font-family: 'Poppins', sans-serif; color: #666;">Loading...</span>
			</div>
		</div>
	</div>
</div>

<!-- Data Table -->
<div class="row">
	<div class="col-12">
		<div class="card recent-sales">
			<div class="card-body table-responsive">
				<h5 class="card-title" style="font-family: 'Poppins', sans-serif;">
					SAVINGS ACCOUNT DATA <span>| TABLE VIEW</span>
				</h5>

				<table class="table table-borderless datatable overflow-scroll" id="savingAccountTable">
					<thead class="table-light">
						<tr style="font-family: 'Poppins', sans-serif; font-size: 12px;">
							<th style="white-space: nowrap;">SR NO</th>
							<th style="white-space: nowrap;">ACCOUNT NUMBER</th>
							<th style="white-space: nowrap;">ACCOUNT TYPE</th>
							<th style="white-space: nowrap;">CUSTOMER CODE</th>
							<th style="white-space: nowrap;">CUSTOMER NAME</th>
							<th style="white-space: nowrap;">MOBILE</th>
							<th style="white-space: nowrap;">BRANCH</th>
							<th style="white-space: nowrap;">OPENING DATE</th>
							<th style="white-space: nowrap;">BALANCE</th>
							<th style="white-space: nowrap;">STATUS</th>
						</tr>
					</thead>
					<tbody id="savingAccountTableBody">
						<tr>
							<td colspan="10" class="text-center py-4" style="font-family: 'Poppins', sans-serif; font-size: 13px; color: #999;">
								<i class="bi bi-hourglass-split"></i> Loading data...
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<script>
let allAccountsData = [];

$(document).ready(function () {
	loadSavingsAccountTable();
});

function loadSavingsAccountTable() {
	$.ajax({
		url: "api/customersavings/getAllSavingAccountData",
		type: "GET",
		success: function (response) {
			allAccountsData = (response && response.data) ? response.data : (Array.isArray(response) ? response : []);
			renderTable(allAccountsData);
		},
		error: function (err) {
			console.error("Error loading savings accounts:", err);
			$('#savingAccountTableBody').html(
				'<tr><td colspan="10" class="text-center text-danger py-4" style="font-family:Poppins,sans-serif;font-size:13px;">' +
				'<i class="bi bi-exclamation-triangle"></i> Failed to load data. Please refresh.</td></tr>'
			);
		}
	});
}

function renderTable(data) {
	const tbody = $('#savingAccountTableBody');
	tbody.empty();

	if (!data || data.length === 0) {
		tbody.html(
			'<tr><td colspan="10" class="text-center py-4" style="font-family:Poppins,sans-serif;font-size:13px;color:#999;">' +
			'<i class="bi bi-inbox"></i> No savings accounts found.</td></tr>'
		);
		$('#recordCount').text('0 records');
		return;
	}

	data.forEach(function (acc, idx) {
		const statusBadge = acc.accountStatus == '1'
			? '<span class="badge bg-success" style="font-size:10px;">ACTIVE</span>'
			: '<span class="badge bg-danger" style="font-size:10px;">INACTIVE</span>';

		const accountTypeLabel = (acc.typeofaccount || '').toLowerCase() === 'savingaccount'
			? 'SAVING'
			: (acc.typeofaccount || '').toUpperCase();

		const branchName = acc.branchName
			? (typeof acc.branchName === 'object' ? (acc.branchName.branchName || '') : acc.branchName)
			: '';

		tbody.append(`
			<tr style="font-family:'Poppins',sans-serif; font-size:12px;">
				<td>${idx + 1}</td>
				<td><strong>${(acc.accountNumber || '').toUpperCase()}</strong></td>
				<td>${accountTypeLabel}</td>
				<td>${(acc.selectByCustomer || '').toUpperCase()}</td>
				<td>${(acc.enterCustomerName || '').toUpperCase()}</td>
				<td>${(acc.contactNumber || '').toUpperCase()}</td>
				<td>${branchName.toString().toUpperCase()}</td>
				<td>${(acc.openingDate || '').toUpperCase()}</td>
				<td>₹ ${(acc.balance || '0')}</td>
				<td>${statusBadge}</td>
			</tr>
		`);
	});

	$('#recordCount').text(data.length + ' record(s) found');
}

function filterTable() {
	const search = $('#searchInput').val().trim().toLowerCase();
	const accountType = $('#filterAccountType').val().toLowerCase();
	const status = $('#filterStatus').val();

	const filtered = allAccountsData.filter(function (acc) {
		const matchSearch = !search
			|| (acc.selectByCustomer || '').toLowerCase().includes(search)
			|| (acc.enterCustomerName || '').toLowerCase().includes(search)
			|| (acc.accountNumber || '').toLowerCase().includes(search);

		const matchType = !accountType || (acc.typeofaccount || '').toLowerCase() === accountType;
		const matchStatus = !status || (acc.accountStatus || '') == status;

		return matchSearch && matchType && matchStatus;
	});

	renderTable(filtered);
}

function clearFilters() {
	$('#searchInput').val('');
	$('#filterAccountType').val('');
	$('#filterStatus').val('');
	renderTable(allAccountsData);
}
</script>