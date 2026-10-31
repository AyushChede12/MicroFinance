$(document).ready(function () {

	// 1. Load Company Details
	function loadCompanyAdministration() {
		$.ajax({
			type: "GET",
			url: "api/preference/fetchAllCompanyAdministration",
			contentType: "application/json",
			success: function (response) {
				if ((response.status === "FOUND" || response.status === "OK" || response.status == 200) && response.data && response.data.length > 0) {
					window.companyData = response.data[0];
				}
			},
			error: function (xhr) {
				console.error("FAILED TO LOAD COMPANY DETAILS:", xhr);
			}
		});
	}
	loadCompanyAdministration();

	// 2. Load Branch dropdown
	$.ajax({
		url: "api/preference/getAllBranchModule",
		type: "GET",
		success: function (response) {
			const branchDropdown = $('#branch');
			branchDropdown.empty().append('<option value="">-- ALL BRANCHES --</option>');

			let list = [];
			if (response && response.data && Array.isArray(response.data)) {
				list = response.data;
			} else if (Array.isArray(response)) {
				list = response;
			}

			list.forEach(function (b) {
				if (b && b.branchName) {
					const bName = b.branchName.toUpperCase();
					branchDropdown.append(`<option value="${bName}">${bName}</option>`);
				}
			});
		},
		error: function (xhr) {
			console.error("FAILED TO LOAD BRANCHES:", xhr);
		}
	});

	// Default Dates (First day of month to today)
	const now = new Date();
	const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
	const today = now.toISOString().split('T')[0];
	$('#fDate').val(firstDay);
	$('#tDate').val(today);

	// Initial load
	loadSummaryData();

	// Find button
	$('#findBtn').click(function () {
		const branch = $('#branch').val();
		loadSummaryData(branch);
	});

	// Reset button
	$('#resetBtn').click(function () {
		$('#branch').val('');
		$('#fDate').val(firstDay);
		$('#tDate').val(today);
		loadSummaryData();
	});

	// Print button
	$('#printBtn').click(function () {
		printReport();
	});

});

function loadSummaryData(branch) {
	let url = "api/incentive/getIncentiveSummaryReport";
	if (branch) {
		url += "?branchName=" + encodeURIComponent(branch);
	}

	$.ajax({
		url: url,
		type: "GET",
		success: function (response) {
			const data = (response && response.data) ? response.data : [];
			window.cachedSummaryList = data;
			renderTable(data);
		},
		error: function (xhr) {
			console.error("FAILED TO LOAD INCENTIVE SUMMARY:", xhr);
			$("#summaryTableBody").empty().append("<tr><td colspan='10' class='text-center text-danger'>ERROR LOADING INCENTIVE SUMMARY</td></tr>");
		}
	});
}

function renderTable(dataList) {
	const tbody = $("#summaryTableBody");
	tbody.empty();

	if (!dataList || dataList.length === 0) {
		tbody.append("<tr><td colspan='10' class='text-center'>NO INCENTIVE RECORDS FOUND</td></tr>");
		return;
	}

	$.each(dataList, function (index, item) {
		const statusBadge = (item.status === "PAID")
			? `<span class="badge badge-success">PAID</span>`
			: `<span class="badge badge-warning">GENERATED</span>`;

		const earnings = parseFloat(item.totalEarnings) || 0;
		const tax = parseFloat(item.taxDeducted) || 0;
		const service = parseFloat(item.serviceDeduction) || 0;
		const totalDed = tax + service;
		const payout = parseFloat(item.finalPayout) || 0;

		const row = `
			<tr>
				<td>${index + 1}</td>
				<td>${(item.branchName || "-").toUpperCase()}</td>
				<td>${(item.incentiveMonth || "").toUpperCase()}</td>
				<td>${(item.teamCode || "").toUpperCase()}</td>
				<td>${(item.teamName || "").toUpperCase()}</td>
				<td>${(item.designation || "-").toUpperCase()}</td>
				<td>₹ ${earnings.toFixed(2)}</td>
				<td>₹ ${totalDed.toFixed(2)}</td>
				<td><strong>₹ ${payout.toFixed(2)}</strong></td>
				<td>${statusBadge}</td>
			</tr>
		`;
		tbody.append(row);
	});
}

function printReport() {
	const data = window.cachedSummaryList || [];
	if (data.length === 0) {
		alert("NO RECORDS AVAILABLE TO PRINT!");
		return;
	}

	const c = window.companyData || {
		companyName: "MICROFINANCE BANK",
		shortName: "",
		address: "",
		city: "",
		state: "",
		pinCode: "",
		cinNo: "",
		emailId: "",
		helplineNo: ""
	};

	let totalEarnings = 0;
	let totalDeductions = 0;
	let totalPayout = 0;
	let rowsHtml = "";

	data.forEach((item, index) => {
		const earnings = parseFloat(item.totalEarnings) || 0;
		const tax = parseFloat(item.taxDeducted) || 0;
		const service = parseFloat(item.serviceDeduction) || 0;
		const totalDed = tax + service;
		const payout = parseFloat(item.finalPayout) || 0;

		totalEarnings += earnings;
		totalDeductions += totalDed;
		totalPayout += payout;

		rowsHtml += `
			<tr>
				<td>${index + 1}</td>
				<td>${(item.branchName || "-").toUpperCase()}</td>
				<td>${(item.incentiveMonth || "").toUpperCase()}</td>
				<td>${(item.teamCode || "").toUpperCase()}</td>
				<td>${(item.teamName || "").toUpperCase()}</td>
				<td>${(item.designation || "-").toUpperCase()}</td>
				<td style="text-align: right;">₹ ${earnings.toFixed(2)}</td>
				<td style="text-align: right;">₹ ${totalDed.toFixed(2)}</td>
				<td style="text-align: right;"><strong>₹ ${payout.toFixed(2)}</strong></td>
				<td>${(item.status || "GENERATED").toUpperCase()}</td>
			</tr>
		`;
	});

	const printContent = `
		<div style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px;">
			<h2 style="margin: 0;">${(c.companyName || "MICROFINANCE BANK").toUpperCase()} ${(c.shortName ? "(" + c.shortName + ")" : "").toUpperCase()}</h2>
			<p style="margin: 5px 0 0 0; font-size: 13px;">
				${(c.address || "").toUpperCase()}, ${(c.city || "").toUpperCase()}, ${(c.state || "").toUpperCase()} - ${c.pinCode || ""}<br>
				CIN: ${(c.cinNo || "").toUpperCase()} | EMAIL: ${(c.emailId || "").toUpperCase()} | HELPLINE: ${c.helplineNo || ""}
			</p>
		</div>

		<h3 style="text-align: center; text-transform: uppercase; margin-bottom: 15px;">INCENTIVE PAYMENT SUMMARY REPORT</h3>
		<p style="text-align: right; font-size: 12px; margin-bottom: 10px;"><b>PRINT DATE:</b> ${new Date().toLocaleDateString()}</p>

		<table style="width: 100%; border-collapse: collapse; font-size: 12px;" border="1">
			<thead style="background: #f2f2f2;">
				<tr>
					<th>S/N</th>
					<th>BRANCH</th>
					<th>MONTH</th>
					<th>CODE</th>
					<th>NAME</th>
					<th>DESIGNATION</th>
					<th>GROSS EARNINGS</th>
					<th>DEDUCTIONS</th>
					<th>NET PAYOUT</th>
					<th>STATUS</th>
				</tr>
			</thead>
			<tbody>
				${rowsHtml}
				<tr style="background: #e9ecef; font-weight: bold;">
					<td colspan="6" style="text-align: right;">TOTAL:</td>
					<td style="text-align: right;">₹ ${totalEarnings.toFixed(2)}</td>
					<td style="text-align: right;">₹ ${totalDeductions.toFixed(2)}</td>
					<td style="text-align: right;">₹ ${totalPayout.toFixed(2)}</td>
					<td></td>
				</tr>
			</tbody>
		</table>
	`;

	const printWindow = window.open("", "_blank");
	printWindow.document.write(`
		<html>
		<head>
			<title>INCENTIVE SUMMARY REPORT</title>
			<style>
				body { font-family: Arial, sans-serif; padding: 20px; text-transform: uppercase; }
				table { width: 100%; border-collapse: collapse; margin-top: 10px; }
				th, td { border: 1px solid #ccc; padding: 6px 8px; }
				th { background-color: #f4f4f4; text-align: left; }
			</style>
		</head>
		<body>
			${printContent}
		</body>
		</html>
	`);
	printWindow.document.close();
	setTimeout(() => {
		printWindow.focus();
		printWindow.print();
	}, 300);
}
