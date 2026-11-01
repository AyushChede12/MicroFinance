let allChequeData = [];
let rowIndex = 0;

$(document).ready(function() {

	loadBranchDropdown();
	loadSavingActivity();

	$("#findBtn").on("click", function(e) {
		e.preventDefault();
		applyFilters();
	});

	$("#resetBtn").on("click", function(e) {
		e.preventDefault();
		$("#formid")[0].reset();
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
	allChequeData = [];
	$.ajax({
		url: contextPath + "/api/reports/getPayByFromSavingAccountActivity",
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
	$.ajax({
		url: contextPath + "/api/reports/getCheckDataFromLoanPayment",
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
	$.ajax({
		url: contextPath + "/api/reports/getCheckDataFromCreateSavings",
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
	$.ajax({
		url: contextPath + "/api/reports/getCheckDataFromFinancialConsultant",
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
	$.ajax({
		url: contextPath + "/api/reports/getCheckDataFromTeamMember",
		type: "GET",
		success: function(res) {
			let data = extractData(res);
			data.forEach(item => {
				allChequeData.push({
					id: "TM_" + (item.id || Math.random()),
					name: (item.teamMemberName || "-").toUpperCase(),
					date: item.signUpDate,
					chequeNo: (item.chequeNo || "-").toUpperCase(),
					type: "ISSUED",
					branch: (item.branchName || "-").toUpperCase(),
					source: "TEAM MEMBER ONBOARDING"
				});
			});
			renderTable(allChequeData);
		},
		error: function() {
			renderTable(allChequeData);
		}
	});
}

/* ================= FILTER ================= */

function applyFilters() {
	let fDate = $("#fDate").val();
	let tDate = $("#tDate").val();
	let chequeNo = $("#chequeNo").val().trim().toUpperCase();
	let type = $("#type").val();
	let branch = $("#branchName").val();

	let fromDate = parseInputDate(fDate);
	let toDate = parseInputDate(tDate);

	let filtered = allChequeData.filter(item => {
		let itemDate = parseDate(item.date);

		if (fromDate && itemDate && itemDate < fromDate) return false;
		if (toDate && itemDate && itemDate > toDate) return false;

		if (chequeNo && !String(item.chequeNo).toUpperCase().includes(chequeNo)) return false;

		if (type && item.type.toUpperCase() !== type.toUpperCase()) return false;

		if (branch && item.branch && item.branch.toUpperCase() !== branch.toUpperCase()) return false;

		return true;
	});

	renderTable(filtered);
}

/* ================= TABLE ================= */

function renderTable(data) {
	let tbody = $(".datatable tbody");
	tbody.empty();
	rowIndex = 0;

	if (!data || data.length === 0) {
		tbody.append(`<tr><td colspan="8" class="text-center text-muted">NO CHEQUE TRANSACTIONS FOUND MATCHING CRITERIA</td></tr>`);
		return;
	}

	data.forEach(item => {
		rowIndex++;
		let statusBadge = (item.type === "CLEARED" || item.type === "ISSUED")
			? '<span class="badge bg-success">CLEARED</span>'
			: (item.type === "BOUNCED" || item.type === "CANCELLED")
				? '<span class="badge bg-danger">BOUNCED</span>'
				: '<span class="badge bg-warning text-dark">' + item.type + '</span>';

		tbody.append(`
			<tr style="font-family: 'Poppins', sans-serif;">
				<td>${rowIndex}</td>
				<td><strong>${item.name}</strong></td>
				<td>${formatDate(item.date)}</td>
				<td>${item.chequeNo}</td>
				<td>${item.branch || "-"}</td>
				<td>${item.source || "-"}</td>
				<td>${statusBadge}</td>
				<td class="no-print">
					<button class="btn btn-sm btn-outline-success printChequeBtn" data-id="${item.id}" title="PRINT CHEQUE VOUCHER">
						<i class="bi bi-printer"></i>
					</button>
				</td>
			</tr>
		`);
	});
}

$(document).on("click", ".printChequeBtn", function() {
	let id = $(this).data("id");
	viewData(id);
});

/* ================= PRINT SINGLE VOUCHER ================= */

function viewData(id) {
	let item = allChequeData.find(x => x.id == id);
	if (!item) {
		alert("CHEQUE RECORD NOT FOUND");
		return;
	}

	let content = `
		<table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
			<tr>
				<th colspan="2" style="background:#f2f2f2; padding: 10px; font-size: 14px; text-transform: uppercase;">
					CHEQUE TRANSACTION CLEARANCE VOUCHER
				</th>
			</tr>
			<tr>
				<td style="width: 35%; font-weight: bold; padding: 8px;">ACCOUNT HOLDER / PAYEE</td>
				<td style="padding: 8px;">${item.name}</td>
			</tr>
			<tr>
				<td style="font-weight: bold; padding: 8px;">TRANSACTION DATE</td>
				<td style="padding: 8px;">${formatDate(item.date)}</td>
			</tr>
			<tr>
				<td style="font-weight: bold; padding: 8px;">CHEQUE NUMBER</td>
				<td style="padding: 8px;"><strong>${item.chequeNo}</strong></td>
			</tr>
			<tr>
				<td style="font-weight: bold; padding: 8px;">BRANCH</td>
				<td style="padding: 8px;">${item.branch || "-"}</td>
			</tr>
			<tr>
				<td style="font-weight: bold; padding: 8px;">SOURCE TRANSACTION MODULE</td>
				<td style="padding: 8px;">${item.source}</td>
			</tr>
			<tr>
				<td style="font-weight: bold; padding: 8px;">CLEARANCE STATUS</td>
				<td style="padding: 8px;"><strong>${item.type}</strong></td>
			</tr>
		</table>
	`;

	ReportPrintUtil.printHtml("CHEQUE TRANSACTION VOUCHER", content);
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
