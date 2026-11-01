$(document).ready(function() {

	if (window.financialConsultantInitialized) {
		console.warn("FINANCIAL CONSULTANT JS ALREADY INITIALIZED");
		return;
	}
	window.financialConsultantInitialized = true;

	var allFinancialConsultants = [];

	/* ================= FETCH DATA ================= */

	$.ajax({
		url: "api/reports/getApprovedFinancialConsultant",
		method: "GET",
		contentType: "application/json; charset=ISO-8859-1",
		success: function(response) {
			if (response && Array.isArray(response.data) && response.data.length > 0) {
				allFinancialConsultants = response.data;
				populateBranchDropdown(allFinancialConsultants);
				renderTable(allFinancialConsultants);
			} else {
				fetchAllConsultantsFallback();
			}
		},
		error: function() {
			fetchAllConsultantsFallback();
		}
	});

	function fetchAllConsultantsFallback() {
		$.ajax({
			url: "api/financialconsultant/getAllFinancialConsultantDetails",
			type: "POST",
			contentType: "application/json",
			success: function(response) {
				if (response && Array.isArray(response.data) && response.data.length > 0) {
					allFinancialConsultants = response.data;
					populateBranchDropdown(allFinancialConsultants);
					renderTable(allFinancialConsultants);
				} else {
					$("#fetchFinancialConsultants")
						.html("<tr><td colspan='10' class='text-center text-muted'>NO FINANCIAL CONSULTANTS FOUND.</td></tr>");
				}
			},
			error: function() {
				$("#fetchFinancialConsultants")
					.html("<tr><td colspan='10' class='text-center text-danger'>FAILED TO LOAD FINANCIAL CONSULTANTS.</td></tr>");
			}
		});
	}

	/* ================= BRANCH DROPDOWN ================= */

	function populateBranchDropdown(data) {
		const branchDropdown = $("#branchName2");
		branchDropdown.empty().append('<option value="">-- ALL BRANCHES --</option>');

		const uniqueBranches = new Set();
		data.forEach(function(item) {
			if (item.branchName && item.branchName.trim() !== "") {
				uniqueBranches.add(item.branchName.trim().toUpperCase());
			}
		});

		uniqueBranches.forEach(function(branch) {
			branchDropdown.append(`<option value="${branch}">${branch}</option>`);
		});
	}

	/* ================= RENDER TABLE ================= */

	function renderTable(data) {
		const tableBody = $("#fetchFinancialConsultants");
		tableBody.empty();

		if (!data || data.length === 0) {
			tableBody.html("<tr><td colspan='10' class='text-center text-muted'>NO FINANCIAL CONSULTANTS FOUND MATCHING CRITERIA.</td></tr>");
			return;
		}

		data.forEach(function(item, index) {
			const isApproved = (item.approved === true || item.isApproved === true || item.isApproved === "true" || item.isApproved === 1);
			const statusBadge = isApproved
				? '<span class="badge bg-success">APPROVED</span>'
				: '<span class="badge bg-warning text-dark">PENDING</span>';

			const row = `
				<tr style="font-family: 'Poppins', sans-serif;">
					<td>${index + 1}</td>
					<td><strong>${(item.financialCode || '').toUpperCase()}</strong></td>
					<td>${(item.financialName || '').toUpperCase()}</td>
					<td>${item.joiningDate || '-'}</td>
					<td>${(item.branchName || '-').toUpperCase()}</td>
					<td>${item.dob || '-'}</td>
					<td>${item.contactNo || '-'}</td>
					<td>${(item.address || '-').toUpperCase()}</td>
					<td>${statusBadge}</td>
					<td class="no-print">
						<button class="btn btn-sm btn-outline-primary viewDetailsBtn" data-index="${index}" title="VIEW DOSSIER">
							<i class="bi bi-eye"></i> DOSSIER
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

		renderTable(filtered);
	});

	$("#resetBtn").on("click", function(e) {
		e.preventDefault();
		$("#formid")[0].reset();
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

	/* ================= MODAL DETAILS POPULATION ================= */

	$(document).on("click", ".viewDetailsBtn", function() {
		const index = $(this).data("index");
		const data = allFinancialConsultants[index];
		if (!data) return;

		ReportPrintUtil.getCompanyDetails(function(company) {
			$("#bankName").text(company.companyName);
			$("#bankAddress").text(company.address + ", " + company.city + ", " + company.state + " - " + company.pinCode);
			$("#bankContact").text("CIN: " + company.cinNo + " | HELPLINE: " + company.helplineNo);

			$("#financialCode").text((data.financialCode || "-").toUpperCase());
			$("#joiningDate").text(data.joiningDate || "-");

			$("#financialName").text((data.financialName || "-").toUpperCase());
			$("#dob").text(data.dob || "-");
			$("#age").text(data.age || "-");
			$("#contactNo").text(data.contactNo || "-");
			$("#branchName").text((data.branchName || "-").toUpperCase());
			$("#selectPosition").text((data.selectPosition || "-").toUpperCase());

			$("#address").text((data.address || "-").toUpperCase());
			$("#district").text((data.district || "-").toUpperCase());
			$("#state").text((data.state || "-").toUpperCase());
			$("#pinCode").text(data.pinCode || "-");
			$("#profession").text((data.profession || "-").toUpperCase());
			$("#academicBackground").text((data.academicBackground || "-").toUpperCase());

			$("#fees").text(data.fees || "0");
			$("#modeofPayment").text((data.modeofPayment || "-").toUpperCase());
			$("#chequeNo").text((data.chequeNo || "-").toUpperCase());
			$("#chequeDate").text(data.chequeDate || "-");
			$("#depositAccount").text((data.depositAccount || "-").toUpperCase());
			$("#refNo").text((data.refNo || "-").toUpperCase());

			$("#referralCode").text((data.referralCode || "-").toUpperCase());
			$("#referralName").text((data.referralName || "-").toUpperCase());
			$("#teamMemberCode").text((data.teamMemberCode || "-").toUpperCase());

			$("#comments").text((data.comments || "-").toUpperCase());
			$("#financialStatus").text((data.financialStatus === "1" || data.financialStatus === "ACTIVE") ? "ACTIVE" : "INACTIVE");
			$("#smsSend").text(data.smsSend === "1" ? "ENABLED" : "DISABLED");
			$("#isApproved").text((data.approved || data.isApproved) ? "APPROVED" : "PENDING");

			const modalEl = document.getElementById("bankReportModal");
			const bsModal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
			bsModal.show();
		});
	});

	/* ================= PRINT MODAL DOSSIER ================= */

	$("#printBankReportBtn").on("click", function() {
		const content = document.getElementById("bankReportContent").innerHTML;
		ReportPrintUtil.printHtml("FINANCIAL CONSULTANT DOSSIER REPORT", content);
	});

});
