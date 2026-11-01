let allRecurringData = [];
let currentFilteredData = [];

$(document).ready(function() {
	loadBranchDropdown();
	loadApprovedPolicies();

	$("#findBtn").click(function(e) {
		e.preventDefault();
		filterData();
	});

	$("#resetBtn").click(function(e) {
		e.preventDefault();
		$("#branchName").val("");
		$("#fromDate").val("");
		$("#toDate").val("");
		currentFilteredData = allRecurringData;
		renderTable(allRecurringData);
	});

	// Print Full Report Table
	$("#printFullReportBtn").click(function(e) {
		e.preventDefault();
		let branch = $("#branchName").val() || "ALL BRANCHES";
		let subTitle = "BRANCH: " + branch.toUpperCase();
		if ($("#fromDate").val() && $("#toDate").val()) {
			subTitle += " | PERIOD: " + $("#fromDate").val() + " TO " + $("#toDate").val();
		}
		ReportPrintUtil.printTable('.datatable', 'RECURRING INSTALLMENT DUE REPORT', subTitle);
	});

	// Single Print Table Button Handler
	$(document).off("click", ".printRecurringBtn").on("click", ".printRecurringBtn", function(e) {
		e.preventDefault();
		let idx = $(this).data("index");
		let policy = currentFilteredData[idx] || allRecurringData[idx];
		if (!policy) {
			alert("POLICY RECORD NOT FOUND");
			return;
		}

		let dueDate = policy.renewalDate || policy.policyEndDate || policy.lastPaymentDate || "-";
		let status = getDueStatus(dueDate);

		let html = `
			<table class="table table-bordered text-uppercase" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
				<thead class="table-dark">
					<tr>
						<th colspan="4" style="padding: 10px; font-size: 14px; text-align: center;">
							RECURRING INSTALLMENT DUE NOTICE
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th style="width: 25%;">POLICY CODE</th>
						<td style="width: 25%; font-weight: bold;">${(policy.policyCode || "-").toUpperCase()}</td>
						<th style="width: 25%;">CUSTOMER NAME</th>
						<td style="width: 25%; font-weight: bold;">${(policy.clientName || policy.customerName || "-").toUpperCase()}</td>
					</tr>
					<tr>
						<th>BRANCH</th>
						<td>${(policy.branchname || policy.branchName || "-").toUpperCase()}</td>
						<th>POLICY AMOUNT</th>
						<td style="font-weight: bold;">₹${parseFloat(policy.policyAmount || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					</tr>
					<tr>
						<th>LAST PAYMENT DATE</th>
						<td>${policy.lastPaymentDate || "-"}</td>
						<th>RECURRING DUE DATE</th>
						<td style="font-weight: bold; color: #d9534f;">${dueDate}</td>
					</tr>
					<tr>
						<th>DUE STATUS</th>
						<td style="color:${status.color}; font-weight: bold;">${status.text}</td>
						<th>OVERDUE DAYS</th>
						<td>${status.days} DAYS</td>
					</tr>
					<tr>
						<th>PLAN / SCHEME</th>
						<td>${(policy.schemeType || policy.planName || "RECURRING DEPOSIT").toUpperCase()}</td>
						<th>ADVISOR CODE</th>
						<td>${(policy.advisorCode || policy.collectorCode || "DIRECT").toUpperCase()}</td>
					</tr>
				</tbody>
			</table>
		`;

		ReportPrintUtil.printHtml("RECURRING INSTALLMENT DEMAND NOTICE", html);
	});
});

// ================= DUE STATUS =================
function getDueStatus(dateStr) {
	if (!dateStr || dateStr === "-") {
		return { text: "NO DATE", color: "#6c757d", days: 0 };
	}

	let today = new Date();
	today.setHours(0, 0, 0, 0);

	let due = new Date(dateStr);
	due.setHours(0, 0, 0, 0);

	if (isNaN(due.getTime())) {
		return { text: "VALID", color: "#28a745", days: 0 };
	}

	let diffTime = due.getTime() - today.getTime();
	let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays < 0) {
		return { text: "OVERDUE", color: "#dc3545", days: Math.abs(diffDays) };
	} else if (diffDays === 0) {
		return { text: "DUE TODAY", color: "#ffc107", days: 0 };
	} else {
		return { text: "UPCOMING", color: "#28a745", days: diffDays };
	}
}

// ================= BRANCH =================
function loadBranchDropdown() {
	$.ajax({
		url: "api/preference/getAllBranchModule",
		type: "GET",
		success: function(response) {
			let branches = response.data || response || [];
			let options = "<option value=''>ALL BRANCHES</option>";
			branches.forEach(b => {
				let bName = (b.branchName || "").toUpperCase();
				if (bName) options += `<option value="${bName}">${bName}</option>`;
			});
			$("#branchName").html(options);
		}
	});
}

// ================= LOAD POLICIES =================
function loadApprovedPolicies() {
	$.ajax({
		url: "api/Policymangment/getApprovedPolicies",
		type: "GET",
		success: function(response) {
			if (response && Array.isArray(response.data)) {
				allRecurringData = response.data;
				currentFilteredData = allRecurringData;
				renderTable(allRecurringData);
			} else {
				$(".datatable tbody").html("<tr><td colspan='9' class='text-center text-muted'>NO RECURRING DUE POLICIES FOUND</td></tr>");
			}
		},
		error: function() {
			$(".datatable tbody").html("<tr><td colspan='9' class='text-center text-danger'>FAILED TO LOAD RECURRING DATA</td></tr>");
		}
	});
}

// ================= FILTER =================
function filterData() {
	let branch = $("#branchName").val();
	let fromDate = $("#fromDate").val();
	let toDate = $("#toDate").val();

	let filtered = allRecurringData.filter(item => {
		let matchBranch = true;
		let matchDate = true;

		if (branch) {
			let b = (item.branchname || item.branchName || "").toUpperCase();
			matchBranch = (b === branch.toUpperCase());
		}

		let due = item.renewalDate ? new Date(item.renewalDate) : (item.policyEndDate ? new Date(item.policyEndDate) : null);
		if (fromDate && due) matchDate = matchDate && (due >= new Date(fromDate));
		if (toDate && due) matchDate = matchDate && (due <= new Date(toDate));

		return matchBranch && matchDate;
	});

	currentFilteredData = filtered;
	renderTable(filtered);
}

// ================= RENDER TABLE =================
function renderTable(data) {
	let tbody = $(".datatable tbody");
	tbody.empty();

	if (!data || data.length === 0) {
		tbody.html("<tr><td colspan='9' class='text-center text-muted'>NO RECURRING DUE POLICIES FOUND MATCHING CRITERIA</td></tr>");
		return;
	}

	data.forEach((policy, index) => {
		let dueDate = policy.renewalDate || policy.policyEndDate || policy.lastPaymentDate || "-";
		let status = getDueStatus(dueDate);

		let row = `
			<tr style="font-family: 'Poppins', sans-serif;">
				<td class="text-center font-monospace">${index + 1}</td>
				<td><strong>${(policy.policyCode || "-").toUpperCase()}</strong></td>
				<td>${(policy.clientName || policy.customerName || "-").toUpperCase()}</td>
				<td class="fw-bold">₹${parseFloat(policy.policyAmount || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
				<td>${policy.lastPaymentDate || "-"}</td>
				<td>${dueDate}</td>
				<td>${status.days} DAYS</td>
				<td style="color:${status.color};font-weight:bold;">${status.text}</td>
				<td class="text-center no-print">
					<button class="btn btn-sm btn-outline-primary printRecurringBtn" data-index="${index}" title="PRINT NOTICE">
						<i class="bi bi-printer"></i> PRINT
					</button>
				</td>
			</tr>
		`;
		tbody.append(row);
	});
}
