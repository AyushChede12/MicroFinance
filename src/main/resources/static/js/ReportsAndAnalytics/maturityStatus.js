let allMaturityData = [];

$(document).ready(function() {
	loadBranchDropdown();
	loadAllData();

	$("#findBtn").click(function(e) {
		e.preventDefault();
		applyFilters();
	});

	$("#resetBtn").click(function(e) {
		e.preventDefault();
		$("#branchName").val('');
		$("#fromDate").val('');
		$("#toDate").val('');
		renderTable(allMaturityData);
	});

	$("#printFullReportBtn").click(function(e) {
		e.preventDefault();
		const branch = $("#branchName").val() || 'ALL BRANCHES';
		const fromDate = $("#fromDate").val() || 'START';
		const toDate = $("#toDate").val() || 'TODAY';
		const subTitle = `FILTERS: BRANCH: ${branch} | PERIOD: ${fromDate} TO ${toDate}`;
		ReportPrintUtil.printTable('.datatable', 'POLICY MATURITY STATUS REPORT', subTitle);
	});
});

// ===============================
// LOAD BRANCH DROPDOWN
// ===============================
function loadBranchDropdown() {
	$.ajax({
		url: "api/Maturitymanagement/getApplymaturitydetails",
		type: "GET",
		success: function(response) {
			if (response.status === "OK" || response.status === "SUCCESS" || Array.isArray(response.data)) {
				const uniqueBranches = new Set();
				let data = response.data || [];

				data.forEach(item => {
					if (item.branchName) {
						uniqueBranches.add(item.branchName.trim().toUpperCase());
					}
				});

				$("#branchName").html("<option value=''>ALL BRANCHES</option>");
				uniqueBranches.forEach(branch => {
					$("#branchName").append(`<option value="${branch}">${branch}</option>`);
				});
			}
		},
		error: function() {
			console.error("BRANCH LOADING FAILED");
		}
	});
}

// ===============================
// LOAD ALL DATA
// ===============================
function loadAllData() {
	$.ajax({
		url: "api/Maturitymanagement/getApplymaturitydetails",
		type: "GET",
		success: function(response) {
			if (response.status === "OK" || response.status === "SUCCESS" || Array.isArray(response.data)) {
				allMaturityData = response.data || [];
				renderTable(allMaturityData);
			} else {
				$(".datatable tbody").html("<tr><td colspan='10' class='text-center text-muted'>NO MATURITY RECORDS FOUND</td></tr>");
			}
		},
		error: function() {
			alert("FAILED TO LOAD MATURITY DATA.");
		}
	});
}

// ===============================
// TABLE RENDER
// ===============================
function renderTable(data) {
	let tbody = $(".datatable tbody");
	tbody.empty();

	if (!data || data.length === 0) {
		tbody.append(`<tr><td colspan="10" class="text-center text-danger fw-bold">NO MATURITY RECORDS FOUND</td></tr>`);
		return;
	}

	data.forEach(function(item, index) {
		let policyAmt = parseFloat(item.policyAmount || 0);
		let maturityAmt = parseFloat(item.maturityAmount || 0);
		let depositAmt = parseFloat(item.depositAmount || 0);

		let row = `
		<tr>
			<td class="text-center font-monospace">${index + 1}</td>
			<td class="fw-semibold">${(item.customerName || '').toUpperCase()}</td>
			<td>${(item.branchName || '').toUpperCase()}</td>
			<td class="fw-bold">${(item.policyCode || '').toUpperCase()}</td>
			<td class="fw-bold">₹${policyAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
			<td class="fw-bold">${(item.maturityDate || '').toUpperCase()}</td>
			<td class="text-success fw-bold">₹${maturityAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
			<td>₹${depositAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
			<td>${(item.schemeName || '').toUpperCase()}</td>
			<td class="text-center no-print">
				<button class="btn btn-sm btn-outline-primary" onclick="viewData(${index})">
					<i class="bi bi-printer"></i> PRINT
				</button>
			</td>
		</tr>
		`;
		tbody.append(row);
	});
}

// ===============================
// FILTER FUNCTION
// ===============================
function applyFilters() {
	let branchName = ($("#branchName").val() || '').trim().toUpperCase();
	let fromDate = $("#fromDate").val();
	let toDate = $("#toDate").val();

	let filteredData = allMaturityData.filter(item => {
		let itemBranch = (item.branchName || '').toUpperCase();
		let matchBranch = !branchName || itemBranch === branchName;

		let matchDate = true;
		if (fromDate || toDate) {
			let itemDate = new Date(item.maturityDate);
			if (fromDate && itemDate < new Date(fromDate)) matchDate = false;
			if (toDate && itemDate > new Date(toDate)) matchDate = false;
		}

		return matchBranch && matchDate;
	});

	renderTable(filteredData);
}

// ===============================
// PRINT SINGLE RECORD
// ===============================
function viewData(index) {
	let data = allMaturityData[index];
	if (!data) return;

	let policyAmt = parseFloat(data.policyAmount || 0);
	let maturityAmt = parseFloat(data.maturityAmount || 0);
	let depositAmt = parseFloat(data.depositAmount || 0);

	let html = `
		<table class="table table-bordered text-uppercase">
			<thead class="table-dark">
				<tr><th style="width:40%;">PARAMETER</th><th style="width:60%;">DETAILS</th></tr>
			</thead>
			<tbody>
				<tr><td class="fw-bold">CUSTOMER NAME</td><td class="fw-bold">${(data.customerName || '').toUpperCase()}</td></tr>
				<tr><td>BRANCH NAME</td><td>${(data.branchName || '').toUpperCase()}</td></tr>
				<tr><td class="fw-bold">POLICY CODE</td><td class="fw-bold">${(data.policyCode || '').toUpperCase()}</td></tr>
				<tr><td>POLICY SANCTION AMOUNT</td><td class="fw-bold">₹${policyAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
				<tr><td class="fw-bold">MATURITY DATE</td><td class="fw-bold">${(data.maturityDate || '').toUpperCase()}</td></tr>
				<tr><td class="fw-bold">NET MATURITY AMOUNT PAYABLE</td><td class="text-success fw-bold">₹${maturityAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
				<tr><td>TOTAL DEPOSIT PAID</td><td>₹${depositAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
				<tr><td>SCHEME / PLAN NAME</td><td>${(data.schemeName || '').toUpperCase()}</td></tr>
				<tr><td>MEMBER ID</td><td>${(data.memberId || '-').toUpperCase()}</td></tr>
				<tr><td>PAYOUT STATUS</td><td><span class="badge bg-success">${(data.status || 'MATURED / APPROVED').toUpperCase()}</span></td></tr>
			</tbody>
		</table>
	`;

	ReportPrintUtil.printHtml("POLICY MATURITY STATUS STATEMENT", html);
}
