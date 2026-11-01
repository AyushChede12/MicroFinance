let allChequeData = [];
let currentFilteredCheques = [];

$(document).ready(function() {
	const basePath = (typeof contextPath !== 'undefined' && contextPath) ? contextPath : "";

	loadBranchDropdown();
	loadSavingActivity();

	$("#findBtn").on("click", function(e) {
		e.preventDefault();
		applyFilters();
	});

	$("#resetBtn").on("click", function(e) {
		e.preventDefault();
		$("#formid")[0].reset();
		currentFilteredCheques = allChequeData;
		renderTable(allChequeData);
	});

	$("#printFullReportBtn").on("click", function(e) {
		e.preventDefault();
		let branch = $("#branchName").val() || "ALL BRANCHES";
		let subTitle = "BRANCH: " + branch.toUpperCase();
		if ($("#fDate").val() && $("#tDate").val()) {
			subTitle += " | PERIOD: " + $("#fDate").val() + " TO " + $("#tDate").val();
		}
		ReportPrintUtil.printTable('.datatable', 'CHEQUE TRANSACTION REPORT', subTitle);
	});

	// Table Print Button Handler
	$(document).off("click", ".printChequeBtn").on("click", ".printChequeBtn", function(e) {
		e.preventDefault();
		let idx = $(this).data("index");
		let item = currentFilteredCheques[idx] || allChequeData[idx];
		if (!item) {
			alert("CHEQUE RECORD NOT FOUND");
			return;
		}

		let content = `
			<table class="table table-bordered text-uppercase" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
				<thead class="table-dark">
					<tr>
						<th colspan="2" style="padding: 10px; font-size: 14px; text-align: center;">
							CHEQUE TRANSACTION CLEARANCE VOUCHER
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th style="width: 35%;">ACCOUNT HOLDER / PAYEE</th>
						<td><strong>${item.name}</strong></td>
					</tr>
					<tr>
						<th>TRANSACTION DATE</th>
						<td>${formatDate(item.date)}</td>
					</tr>
					<tr>
						<th>CHEQUE NUMBER</th>
						<td><strong style="color: #002147;">${item.chequeNo}</strong></td>
					</tr>
					<tr>
						<th>BRANCH</th>
						<td>${item.branch || "-"}</td>
					</tr>
					<tr>
						<th>SOURCE TRANSACTION MODULE</th>
						<td>${item.source}</td>
					</tr>
					<tr>
						<th>CLEARANCE STATUS</th>
						<td><span class="badge bg-success">${item.type}</span></td>
					</tr>
				</tbody>
			</table>
		`;

		ReportPrintUtil.printHtml("CHEQUE TRANSACTION VOUCHER", content);
	});
});

/* ================= BRANCH ================= */

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

/* ================= LOAD APIS ================= */

function loadSavingActivity() {
	const basePath = (typeof contextPath !== 'undefined' && contextPath) ? contextPath : "";
	allChequeData = [];
	$.ajax({
		url: basePath + "/api/reports/getPayByFromSavingAccountActivity",
		type: "GET",
		success: function(res) {
			let data = extractData(res);
			data.forEach(item => {
				allChequeData.push({
					id: "SA_" + (item.id || Math.random()),
					name: (item.accountHolderName || item.customerName || "-").toUpperCase(),
					date: item.transactionDate || item.date,
					chequeNo: (item.chequeNo || "-").toUpperCase(),
					type: (item.status || "CLEARED").toUpperCase(),
					branch: (item.branchName || "-").toUpperCase(),
					source: "SAVING ACCOUNT ACTIVITY"
				});
			});
			loadLoanPayment();
		},
		error: function() {
			loadLoanPayment();
		}
	});
}

function loadLoanPayment() {
	const basePath = (typeof contextPath !== 'undefined' && contextPath) ? contextPath : "";
	$.ajax({
		url: basePath + "/api/reports/getCheckDataFromLoanPayment",
		type: "GET",
		success: function(res) {
			let data = extractData(res);
			data.forEach(item => {
				allChequeData.push({
					id: "LP_" + (item.id || Math.random()),
					name: (item.applicantName || item.customerName || "-").toUpperCase(),
					date: item.paymentDate || item.date,
					chequeNo: (item.chequeNo || "-").toUpperCase(),
					type: (item.status || "CLEARED").toUpperCase(),
					branch: (item.branchName || "-").toUpperCase(),
					source: "LOAN REPAYMENT"
				});
			});
			loadCreateSaving();
		},
		error: function() {
			loadCreateSaving();
		}
	});
}

function loadCreateSaving() {
	const basePath = (typeof contextPath !== 'undefined' && contextPath) ? contextPath : "";
	$.ajax({
		url: basePath + "/api/reports/getCheckDataFromCreateSavings",
		type: "GET",
		success: function(res) {
			let data = extractData(res);
			data.forEach(item => {
				allChequeData.push({
					id: "CS_" + (item.id || Math.random()),
					name: (item.enterCustomerName || "-").toUpperCase(),
					date: item.openingDate,
					chequeNo: (item.chequeNo || "-").toUpperCase(),
					type: "ISSUED",
					branch: (item.branchName || "-").toUpperCase(),
					source: "CREATE SAVINGS ACCOUNT"
				});
			});
			loadFinancialConsultant();
		},
		error: function() {
			loadFinancialConsultant();
		}
	});
}

function loadFinancialConsultant() {
	const basePath = (typeof contextPath !== 'undefined' && contextPath) ? contextPath : "";
	$.ajax({
		url: basePath + "/api/reports/getCheckDataFromFinancialConsultant",
		type: "GET",
		success: function(res) {
			let data = extractData(res);
			data.forEach(item => {
				allChequeData.push({
					id: "FC_" + (item.id || Math.random()),
					name: (item.financialName || "-").toUpperCase(),
					date: item.joiningDate,
					chequeNo: (item.chequeNo || "-").toUpperCase(),
					type: "ISSUED",
					branch: (item.branchName || "-").toUpperCase(),
					source: "FINANCIAL CONSULTANT"
				});
			});
			loadTeamMember();
		},
		error: function() {
			loadTeamMember();
		}
	});
}

function loadTeamMember() {
	const basePath = (typeof contextPath !== 'undefined' && contextPath) ? contextPath : "";
	$.ajax({
		url: basePath + "/api/reports/getCheckDataFromTeamMember",
		type: "GET",
		success: function(res) {
			let data = extractData(res);
			data.forEach(item => {
				allChequeData.push({
					id: "TM_" + (item.id || Math.random()),
					name: (item.name || "-").toUpperCase(),
					date: item.doj,
					chequeNo: (item.chequeNo || "-").toUpperCase(),
					type: "ISSUED",
					branch: (item.branch || "-").toUpperCase(),
					source: "TEAM MEMBER"
				});
			});
			currentFilteredCheques = allChequeData;
			renderTable(allChequeData);
		},
		error: function() {
			currentFilteredCheques = allChequeData;
			renderTable(allChequeData);
		}
	});
}

/* ================= FILTER ================= */

function applyFilters() {
	let type = $("#type").val();
	let branch = $("#branchName").val();
	let fDate = parseInputDate($("#fDate").val());
	let tDate = parseInputDate($("#tDate").val());
	let chequeNo = $("#chequeNo").val().trim().toUpperCase();

	let filtered = allChequeData.filter(item => {
		let matchType = !type || item.type === type.toUpperCase();
		let matchBranch = !branch || item.branch === branch.toUpperCase();
		let matchCheque = !chequeNo || item.chequeNo.includes(chequeNo);

		let itemDate = parseDate(item.date);
		let matchFrom = !fDate || (itemDate && itemDate >= fDate);
		let matchTo = !tDate || (itemDate && itemDate <= tDate);

		return matchType && matchBranch && matchCheque && matchFrom && matchTo;
	});

	currentFilteredCheques = filtered;
	renderTable(filtered);
}

/* ================= RENDER ================= */

function renderTable(data) {
	let tbody = $(".datatable tbody");
	tbody.empty();

	if (!data || data.length === 0) {
		tbody.html("<tr><td colspan='8' class='text-center text-muted'>NO CHEQUE TRANSACTIONS FOUND MATCHING CRITERIA</td></tr>");
		return;
	}

	data.forEach((item, index) => {
		let statusBadge = `<span class="badge bg-success">${item.type}</span>`;
		if (item.type.includes("BOUN") || item.type.includes("FAIL")) {
			statusBadge = `<span class="badge bg-danger">${item.type}</span>`;
		} else if (item.type.includes("PEND")) {
			statusBadge = `<span class="badge bg-warning text-dark">${item.type}</span>`;
		}

		tbody.append(`
			<tr style="font-family: 'Poppins', sans-serif;">
				<td class="text-center font-monospace">${index + 1}</td>
				<td><strong>${item.name}</strong></td>
				<td>${formatDate(item.date)}</td>
				<td><strong>${item.chequeNo}</strong></td>
				<td>${item.branch || "-"}</td>
				<td>${item.source || "-"}</td>
				<td>${statusBadge}</td>
				<td class="text-center no-print">
					<button class="btn btn-sm btn-outline-success printChequeBtn" data-index="${index}" title="PRINT CHEQUE VOUCHER">
						<i class="bi bi-printer"></i> PRINT
					</button>
				</td>
			</tr>
		`);
	});
}

/* ================= HELPERS ================= */

function extractData(res) {
	if (!res) return [];
	if (Array.isArray(res.data)) return res.data;
	if (Array.isArray(res.response)) return res.response;
	if (Array.isArray(res.result)) return res.result;
	if (Array.isArray(res)) return res;
	return [];
}

function parseDate(d) {
	if (!d) return null;
	return new Date(d.split(" ")[0]);
}

function parseInputDate(d) {
	if (!d) return null;
	return new Date(d);
}

function formatDate(d) {
	if (!d) return "-";
	let date = new Date(d.split(" ")[0]);
	return date.toLocaleDateString("en-GB");
}
