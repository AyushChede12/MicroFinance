let allRecurringData = [];

$(document).ready(function() {

	loadBranchDropdown();
	loadDuePolicies();

	$("#findBtn").click(function(e) {
		e.preventDefault();
		filterData();
	});

	$("#resetBtn").click(function(e) {
		e.preventDefault();
		$("#formid")[0].reset();
		renderTable(allRecurringData);
	});

	$("#printFullReportBtn").click(function(e) {
		e.preventDefault();
		let branch = $("#branchName").val() || "ALL BRANCHES";
		let subTitle = "BRANCH: " + branch.toUpperCase();
		if ($("#fromDate").val() && $("#toDate").val()) {
			subTitle += " | PERIOD: " + $("#fromDate").val() + " TO " + $("#toDate").val();
		}
		ReportPrintUtil.printTable('.datatable', 'RECURRING INSTALLMENT DUE REPORT', subTitle);
	});

	// Print single notice button in modal
	$("#printBtn").click(function() {
		let printContent = document.getElementById("modalDataContainer").innerHTML;
		ReportPrintUtil.printHtml("RECURRING INSTALLMENT DUE NOTICE", printContent);
	});

});

// ================= BRANCH DROPDOWN =================
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
		},
		error: function() {
			console.warn("FAILED TO LOAD BRANCHES");
		}
	});
}

// ================= LOAD DUE POLICIES =================
function loadDuePolicies() {
	$.ajax({
		url: "api/Policymangment/getApprovedPolicies",
		type: "GET",
		success: function(response) {
			if (response && Array.isArray(response.data)) {
				allRecurringData = response.data;
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
				<td>${index + 1}</td>
				<td><strong>${(policy.policyCode || "-").toUpperCase()}</strong></td>
				<td>${(policy.clientName || policy.customerName || "-").toUpperCase()}</td>
				<td>₹${parseFloat(policy.policyAmount || 0).toFixed(2)}</td>
				<td>${policy.lastPaymentDate || "-"}</td>
				<td>${dueDate}</td>
				<td>${status.days} DAYS</td>
				<td style="color:${status.color};font-weight:bold;">${status.text}</td>
				<td class="no-print">
					<button class="btn btn-sm btn-outline-primary printPopupBtn" data-id="${policy.id}" title="PRINT NOTICE">
						<i class="bi bi-printer"></i>
					</button>
				</td>
			</tr>
		`;
		tbody.append(row);
	});
}

// ================= SINGLE PRINT POPUP =================
$(document).on("click", ".printPopupBtn", function() {
	let id = $(this).data("id");
	let policy = allRecurringData.find(p => p.id === id);
	if (!policy) return;

	let dueDate = policy.renewalDate || policy.policyEndDate || policy.lastPaymentDate || "-";
	let status = getDueStatus(dueDate);

	ReportPrintUtil.getCompanyDetails(function(company) {
		let html = `
			<div style="font-family: Arial, sans-serif;">
				<div style="text-align: center; margin-bottom: 20px;">
					<h4 style="color: #002147; font-weight: bold; text-transform: uppercase; margin-bottom: 3px;">
						${company.companyName}
					</h4>
					<p style="margin: 0; font-size: 12px; text-transform: uppercase;">
						${company.address}, ${company.city}, ${company.state} - ${company.pinCode}
					</p>
					<p style="margin: 2px 0 0 0; font-size: 11px; text-transform: uppercase; color: #555;">
						CIN: ${company.cinNo} | HELPLINE: ${company.helplineNo} | EMAIL: ${company.emailId}
					</p>
					<hr style="margin: 15px 0;">
					<h5 style="color: #002147; font-weight: bold; text-transform: uppercase;">
						RECURRING INSTALLMENT DUE NOTICE
					</h5>
				</div>

				<table style="width: 100%; border-collapse: collapse; font-size: 13px;">
					<tr style="background: #0d6efd; color: #fff;">
						<th colspan="4" style="padding: 8px; border: 1px solid #333; text-transform: uppercase;">
							POLICY & INSTALLMENT DUE DETAILS
						</th>
					</tr>
					<tr>
						<th style="border: 1px solid #333; padding: 8px; width: 25%; background: #f2f2f2; text-transform: uppercase;">POLICY CODE</th>
						<td style="border: 1px solid #333; padding: 8px; width: 25%;"><strong>${(policy.policyCode || "-").toUpperCase()}</strong></td>
						<th style="border: 1px solid #333; padding: 8px; width: 25%; background: #f2f2f2; text-transform: uppercase;">CUSTOMER NAME</th>
						<td style="border: 1px solid #333; padding: 8px; width: 25%;"><strong>${(policy.clientName || policy.customerName || "-").toUpperCase()}</strong></td>
					</tr>
					<tr>
						<th style="border: 1px solid #333; padding: 8px; background: #f2f2f2; text-transform: uppercase;">BRANCH</th>
						<td style="border: 1px solid #333; padding: 8px;">${(policy.branchname || policy.branchName || "-").toUpperCase()}</td>
						<th style="border: 1px solid #333; padding: 8px; background: #f2f2f2; text-transform: uppercase;">INSTALLMENT AMOUNT</th>
						<td style="border: 1px solid #333; padding: 8px;">₹${parseFloat(policy.policyAmount || 0).toFixed(2)}</td>
					</tr>
					<tr>
						<th style="border: 1px solid #333; padding: 8px; background: #f2f2f2; text-transform: uppercase;">LAST PAYMENT DATE</th>
						<td style="border: 1px solid #333; padding: 8px;">${policy.lastPaymentDate || "-"}</td>
						<th style="border: 1px solid #333; padding: 8px; background: #f2f2f2; text-transform: uppercase;">DUE DATE</th>
						<td style="border: 1px solid #333; padding: 8px;"><strong>${dueDate}</strong></td>
					</tr>
					<tr>
						<th style="border: 1px solid #333; padding: 8px; background: #f2f2f2; text-transform: uppercase;">STATUS</th>
						<td style="border: 1px solid #333; padding: 8px; color: ${status.color}; font-weight: bold;">${status.text}</td>
						<th style="border: 1px solid #333; padding: 8px; background: #f2f2f2; text-transform: uppercase;">OVERDUE DAYS</th>
						<td style="border: 1px solid #333; padding: 8px;">${status.days} DAYS</td>
					</tr>
				</table>
			</div>
		`;
		$("#modalDataContainer").html(html);

		const modalEl = document.getElementById("printModal");
		const bsModal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
		bsModal.show();
	});
});

// ================= DUE STATUS =================
function getDueStatus(dateStr) {
	if (!dateStr || dateStr === "-") {
		return { text: "PENDING", color: "#fd7e14", days: 0 };
	}
	let due = new Date(dateStr);
	let today = new Date();
	today.setHours(0, 0, 0, 0);

	let diffTime = due - today;
	let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays < 0) {
		return { text: "OVERDUE", color: "red", days: Math.abs(diffDays) };
	} else if (diffDays === 0) {
		return { text: "DUE TODAY", color: "orange", days: 0 };
	} else {
		return { text: "UPCOMING", color: "green", days: diffDays };
	}
}
