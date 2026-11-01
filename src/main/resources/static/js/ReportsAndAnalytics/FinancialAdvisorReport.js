let allFinancialConsultants = [];
let currentFilteredConsultants = [];

$(document).ready(function() {
	loadBranchDropdown();
	loadFinancialConsultants();

	$("#resetBtn").on("click", function(e) {
		e.preventDefault();
		$("#formid")[0].reset();
		currentFilteredConsultants = allFinancialConsultants;
		renderTable(allFinancialConsultants);
	});

	// Print Full Report Table
	$("#printFullReportBtn").on("click", function(e) {
		e.preventDefault();
		const branch = $("#branchName2").val() || "ALL BRANCHES";
		let subTitle = "BRANCH: " + branch.toUpperCase();
		if ($("#fromDate").val() && $("#toDate").val()) {
			subTitle += " | PERIOD: " + $("#fromDate").val() + " TO " + $("#toDate").val();
		}
		ReportPrintUtil.printTable('.datatable', 'FINANCIAL CONSULTANT REPORT', subTitle);
	});

	// Table Print Button Handler
	$(document).off("click", ".viewDetailsBtn").on("click", ".viewDetailsBtn", function(e) {
		e.preventDefault();
		const index = $(this).data("index");
		const data = currentFilteredConsultants[index] || allFinancialConsultants[index];
		if (!data) {
			alert("FINANCIAL CONSULTANT RECORD NOT FOUND");
			return;
		}

		let html = `
			<table class="table table-bordered text-uppercase" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
				<thead class="table-dark">
					<tr>
						<th colspan="4" style="padding: 10px; font-size: 14px; text-align: center;">
							FINANCIAL CONSULTANT PROFILE & DOSSIER
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th style="width: 25%;">CONSULTANT CODE</th>
						<td style="width: 25%; font-weight: bold; color: #002147;">${(data.financialCode || "-").toUpperCase()}</td>
						<th style="width: 25%;">JOINING DATE</th>
						<td style="width: 25%; font-weight: bold;">${data.joiningDate || "-"}</td>
					</tr>
					<tr>
						<th>FULL NAME</th>
						<td><strong>${(data.financialName || "-").toUpperCase()}</strong></td>
						<th>DESIGNATION</th>
						<td>${(data.selectPosition || "-").toUpperCase()}</td>
					</tr>
					<tr>
						<th>DATE OF BIRTH</th>
						<td>${data.dob || "-"}</td>
						<th>AGE</th>
						<td>${data.age || "-"}</td>
					</tr>
					<tr>
						<th>CONTACT NUMBER</th>
						<td>${data.contactNo || "-"}</td>
						<th>BRANCH</th>
						<td>${(data.branchName || "-").toUpperCase()}</td>
					</tr>
					<tr>
						<th>RESIDENTIAL ADDRESS</th>
						<td colspan="3">${(data.address || "-").toUpperCase()}, ${(data.district || "-").toUpperCase()}, ${(data.state || "-").toUpperCase()} - ${data.pinCode || "-"}</td>
					</tr>
					<tr>
						<th>PAN NUMBER</th>
						<td>${(data.pan || "MFCAS1245W").toUpperCase()}</td>
						<th>AADHAAR NUMBER</th>
						<td>${data.aadharNo || "-"}</td>
					</tr>
					<tr>
						<th>BANK NAME</th>
						<td>${(data.bankName || "-").toUpperCase()}</td>
						<th>BANK ACCOUNT NO.</th>
						<td>${data.accountNo || "-"}</td>
					</tr>
					<tr>
						<th>IFSC CODE</th>
						<td>${(data.ifsc || "-").toUpperCase()}</td>
						<th>STATUS</th>
						<td><span class="badge bg-success">APPROVED & ACTIVE</span></td>
					</tr>
				</tbody>
			</table>
		`;

		ReportPrintUtil.printHtml("FINANCIAL CONSULTANT DOSSIER", html);
	});
});

/* ================= BRANCH DROPDOWN ================= */

function loadBranchDropdown() {
	$.ajax({
		url: "api/preference/getAllBranchModule",
		type: "GET",
		success: function(response) {
			const select = $("#branchName2");
			select.empty().append('<option value="">ALL BRANCHES</option>');

			let branchList = [];
			if (response && response.data && Array.isArray(response.data)) {
				branchList = response.data;
			} else if (Array.isArray(response)) {
				branchList = response;
			}

			branchList.forEach(function(branch) {
				if (branch && branch.branchName) {
					const name = branch.branchName.trim().toUpperCase();
					select.append(`<option value="${name}">${name}</option>`);
				}
			});
		},
		error: function() {
			console.warn("FAILED TO LOAD BRANCHES");
		}
	});
}

/* ================= LOAD CONSULTANTS ================= */

function loadFinancialConsultants() {
	$.ajax({
		url: "api/reports/getApprovedFinancialConsultant",
		type: "GET",
		success: function(response) {
			allFinancialConsultants = (response && response.data) ? response.data : [];
			currentFilteredConsultants = allFinancialConsultants;
			renderTable(allFinancialConsultants);
		},
		error: function() {
			$(".datatable tbody").html("<tr><td colspan='9' class='text-center text-muted'>NO APPROVED FINANCIAL CONSULTANTS FOUND</td></tr>");
		}
	});
}

/* ================= RENDER TABLE ================= */

function renderTable(data) {
	const tableBody = $(".datatable tbody");
	tableBody.empty();

	if (!data || data.length === 0) {
		tableBody.html("<tr><td colspan='9' class='text-center text-muted'>NO CONSULTANTS MATCHING CRITERIA</td></tr>");
		return;
	}

	data.forEach(function(item, index) {
		const row = `
			<tr style="font-family: 'Poppins', sans-serif;">
				<td class="text-center font-monospace">${index + 1}</td>
				<td><strong>${(item.financialCode || "-").toUpperCase()}</strong></td>
				<td>${(item.financialName || "-").toUpperCase()}</td>
				<td>${item.joiningDate || "-"}</td>
				<td>${(item.branchName || "-").toUpperCase()}</td>
				<td>${item.contactNo || "-"}</td>
				<td>${(item.selectPosition || "-").toUpperCase()}</td>
				<td><span class="badge bg-success">APPROVED</span></td>
				<td class="text-center no-print">
					<button class="btn btn-sm btn-outline-primary viewDetailsBtn" data-index="${index}" title="PRINT DOSSIER">
						<i class="bi bi-printer"></i> PRINT
					</button>
				</td>
			</tr>
		`;
		tableBody.append(row);
	});
}

/* ================= FILTER FORM ================= */

$("#formid").on("submit", function(e) {
	e.preventDefault();

	const selectedBranch = $("#branchName2").val();
	const fromDate = $("#fromDate").val();
	const toDate = $("#toDate").val();

	const filtered = allFinancialConsultants.filter(function(item) {
		let matchesBranch = true;
		let matchesDate = true;

		if (selectedBranch && selectedBranch.trim() !== "") {
			matchesBranch = (item.branchName || "").trim().toUpperCase() === selectedBranch.trim().toUpperCase();
		}

		if (item.joiningDate) {
			const joiningDate = new Date(item.joiningDate);
			if (fromDate) matchesDate = matchesDate && (joiningDate >= new Date(fromDate));
			if (toDate) matchesDate = matchesDate && (joiningDate <= new Date(toDate));
		}

		return matchesBranch && matchesDate;
	});

	currentFilteredConsultants = filtered;
	renderTable(filtered);
});
