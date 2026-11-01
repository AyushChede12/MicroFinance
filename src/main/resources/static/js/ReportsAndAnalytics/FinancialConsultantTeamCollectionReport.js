$(document).ready(function() {
	let collectionData = [];
	let currentFilteredCollection = [];

	function fetchCollection(code, fDate, tDate) {
		let tbody = $("#collectionTableBody");
		tbody.html("<tr><td colspan='14' class='text-center text-muted'>SEARCHING COLLECTION DATA...</td></tr>");

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
				currentFilteredCollection = collectionData;
				renderCollection(collectionData);
			},
			error: function() {
				tbody.html("<tr><td colspan='14' class='text-center text-danger fw-bold'>NO COLLECTION RECORDS FOUND</td></tr>");
			}
		});
	}

	function renderCollection(data) {
		let tbody = $("#collectionTableBody");
		tbody.empty();

		if (!data || !data.length) {
			tbody.html("<tr><td colspan='14' class='text-center text-danger fw-bold'>NO MATCHING COLLECTION RECORDS FOUND</td></tr>");
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
					<td class="text-center no-print">
						<button class="btn btn-sm btn-outline-primary printCollectionBtn" data-index="${idx}" title="PRINT RECEIPT">
							<i class="bi bi-printer"></i> PRINT
						</button>
					</td>
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
		$("#collectionTableBody").html("<tr><td colspan='14' class='text-center text-muted'>ENTER FINANCIAL CONSULTANT CODE TO VIEW COLLECTION RECORDS</td></tr>");
	});

	$("#printFullReportBtn").click(function(e) {
		e.preventDefault();
		let code = ($("#advisorCode").val() || "ALL ADVISORS").toUpperCase();
		let fDate = $("#fDate").val() || "START";
		let tDate = $("#tDate").val() || "TODAY";
		let subTitle = `FILTERS: ADVISOR: ${code} | PERIOD: ${fDate} TO ${tDate}`;
		ReportPrintUtil.printTable('.datatable', 'FINANCIAL CONSULTANT TEAM COLLECTION REPORT', subTitle);
	});

	$(document).off("click", ".printCollectionBtn").on("click", ".printCollectionBtn", function(e) {
		e.preventDefault();
		let idx = $(this).data("index");
		let item = currentFilteredCollection[idx] || collectionData[idx];
		if (!item) {
			alert("COLLECTION RECORD NOT FOUND");
			return;
		}

		let amt = parseFloat(item.amount || item.collectedAmount || 0);

		let html = `
			<table class="table table-bordered text-uppercase" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
				<thead class="table-dark">
					<tr>
						<th colspan="4" style="padding: 10px; font-size: 14px; text-align: center;">
							FINANCIAL CONSULTANT COLLECTION RECEIPT
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th style="width: 25%;">POLICY / ACCOUNT NO.</th>
						<td style="width: 25%; font-weight: bold; color: #002147;">${(item.policyCode || item.policyNo || '-').toUpperCase()}</td>
						<th style="width: 25%;">COLLECTION DATE</th>
						<td style="width: 25%; font-weight: bold;">${(item.date || item.transactionDate || '-').toUpperCase()}</td>
					</tr>
					<tr>
						<th>APPLICANT NAME</th>
						<td><strong>${(item.applicantName || item.customerName || '-').toUpperCase()}</strong></td>
						<th>INST. NUMBER</th>
						<td>${item.installmentNo || '01'}</td>
					</tr>
					<tr>
						<th>ADVISOR CODE</th>
						<td>${(item.advisorCode || item.agentCode || $('#advisorCode').val() || '-').toUpperCase()}</td>
						<th>COLLECTION TYPE</th>
						<td>${(item.type || 'SELF').toUpperCase()}</td>
					</tr>
					<tr>
						<th>PAYMENT MODE</th>
						<td>${(item.paymentMode || 'CASH').toUpperCase()}</td>
						<th>CHEQUE / REF NO.</th>
						<td>${(item.chequeNo || '-').toUpperCase()}</td>
					</tr>
					<tr>
						<th>COLLECTED AMOUNT</th>
						<td colspan="3" style="font-size: 16px; font-weight: bold; color: green;">₹${amt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					</tr>
				</tbody>
			</table>
		`;

		ReportPrintUtil.printHtml("COLLECTION RECEIPT VOUCHER", html);
	});
});
