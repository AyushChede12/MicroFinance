$(document).ready(function() {
	let collectionData = [];

	function fetchCollection(code, fDate, tDate) {
		let tbody = $("#collectionTableBody");
		tbody.html("<tr><td colspan='13' class='text-center text-muted'>SEARCHING COLLECTION DATA...</td></tr>");

		$.ajax({
			url: "api/reports/investment-transactions",
			type: "GET",
			success: function(response) {
				let txns = response && response.data ? response.data : (Array.isArray(response) ? response : []);
				let filtered = txns.filter(t => {
					let fcCode = (t.advisorCode || t.agentCode || t.collectorCode || "").toUpperCase();
					let matchCode = !code || fcCode.includes(code);
					let tDateVal = t.date || t.transactionDate || "";
					let matchFrom = !fDate || tDateVal >= fDate;
					let matchTo = !tDate || tDateVal <= tDate;
					return matchCode && matchFrom && matchTo;
				});

				collectionData = filtered;
				renderCollection(collectionData);
			},
			error: function() {
				tbody.html("<tr><td colspan='13' class='text-center text-danger fw-bold'>NO COLLECTION RECORDS FOUND</td></tr>");
			}
		});
	}

	function renderCollection(data) {
		let tbody = $("#collectionTableBody");
		tbody.empty();

		if (!data || !data.length) {
			tbody.html("<tr><td colspan='13' class='text-center text-danger fw-bold'>NO MATCHING COLLECTION RECORDS FOUND</td></tr>");
			return;
		}

		data.forEach((item, idx) => {
			let amt = parseFloat(item.amount || item.collectedAmount || 0);
			let cleared = parseFloat(item.clearedAmount || amt);
			let uncleared = parseFloat(item.unclearedAmount || 0);

			let row = `
				<tr>
					<td class="text-center font-monospace">${idx + 1}</td>
					<td class="fw-bold">${(item.type || 'SELF').toUpperCase()}</td>
					<td>${(item.date || item.transactionDate || '-').toUpperCase()}</td>
					<td class="fw-bold">${(item.policyCode || item.policyNo || '-').toUpperCase()}</td>
					<td class="text-center">${item.installmentNo || '01'}</td>
					<td class="fw-semibold">${(item.applicantName || item.customerName || '-').toUpperCase()}</td>
					<td>${(item.planCode || '-').toUpperCase()}</td>
					<td class="fw-bold">${(item.advisorCode || item.agentCode || $('#advisorCode').val() || '-').toUpperCase()}</td>
					<td class="text-success fw-bold">₹${amt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td class="text-primary fw-bold">₹${cleared.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td class="text-danger">₹${uncleared.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td><span class="badge bg-secondary">${(item.paymentMode || 'CASH').toUpperCase()}</span></td>
					<td>${(item.chequeNo || '-').toUpperCase()}</td>
				</tr>
			`;
			tbody.append(row);
		});
	}

	$("#findBtn").click(function(e) {
		e.preventDefault();
		let code = ($("#advisorCode").val() || "").trim().toUpperCase();
		let fDate = $("#fDate").val();
		let tDate = $("#tDate").val();
		fetchCollection(code, fDate, tDate);
	});

	$("#resetBtn").click(function(e) {
		e.preventDefault();
		$("#advisorCode").val("");
		$("#fDate").val("");
		$("#tDate").val("");
		$("#collectionTableBody").html("<tr><td colspan='13' class='text-center text-muted'>ENTER FINANCIAL CONSULTANT CODE TO VIEW COLLECTION RECORDS</td></tr>");
	});

	$("#printFullReportBtn").click(function(e) {
		e.preventDefault();
		let code = ($("#advisorCode").val() || "ALL ADVISORS").toUpperCase();
		let fDate = $("#fDate").val() || "START";
		let tDate = $("#tDate").val() || "TODAY";
		let subTitle = `FILTERS: ADVISOR: ${code} | PERIOD: ${fDate} TO ${tDate}`;
		ReportPrintUtil.printTable('.datatable', 'FINANCIAL CONSULTANT TEAM COLLECTION REPORT', subTitle);
	});
});
