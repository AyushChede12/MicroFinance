$(document).ready(function () {
	let allEmiPayments = [];
	let currentFilteredEmi = [];

	$.ajax({
		url: "api/preference/getAllBranchModule",
		type: "GET",
		success: function (response) {
			let list = response && response.data ? response.data : (Array.isArray(response) ? response : []);
			let sel = $("#branch");
			sel.html("<option value=''>ALL BRANCHES</option>");
			list.forEach(b => {
				if (b && b.branchName) {
					let name = b.branchName.trim().toUpperCase();
					sel.append(`<option value="${name}">${name}</option>`);
				}
			});
		}
	});

	function loadEmiPayments() {
		$.ajax({
			url: "api/reports/getLoanPaymentReport",
			type: "GET",
			success: function (response) {
				allEmiPayments = response && response.data ? response.data : [];
				currentFilteredEmi = allEmiPayments;
				renderTable(allEmiPayments);
			},
			error: function () {
				$("#emiTableBody").html("<tr><td colspan='14' class='text-center text-danger fw-bold'>NO EMI COLLECTION RECORDS FOUND</td></tr>");
			}
		});
	}

	function renderTable(data) {
		let tbody = $("#emiTableBody");
		tbody.empty();

		if (!data || !data.length) {
			tbody.html("<tr><td colspan='14' class='text-center text-danger fw-bold'>NO MATCHING EMI COLLECTIONS FOUND</td></tr>");
			return;
		}

		data.forEach((p, idx) => {
			let amt = parseFloat(p.emiPayment || p.loanAmount || 0);
			let roi = parseFloat(p.rateOfInterest || 0);
			let interest = (amt * roi / 100);
			let principal = amt - interest;
			if (principal < 0) principal = amt;

			let row = `
				<tr>
					<td class="text-center font-monospace">${idx + 1}</td>
					<td class="fw-bold">${(p.loanId || '-').toUpperCase()}</td>
					<td>${(p.memberId || '-').toUpperCase()}</td>
					<td class="fw-semibold">${(p.memberName || p.customerName || '-').toUpperCase()}</td>
					<td>${(p.branchName || '-').toUpperCase()}</td>
					<td>${(p.paymentDate || '-').toUpperCase()}</td>
					<td class="text-success fw-bold">₹${amt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
					<td>₹${principal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
					<td class="text-primary">₹${interest.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
					<td><span class="badge bg-secondary">${(p.paymentMode || 'CASH').toUpperCase()}</span></td>
					<td>${(p.chequeNo || p.ref_UpiId || '-').toUpperCase()}</td>
					<td>${(p.accountNo || '-').toUpperCase()}</td>
					<td>${(p.financialConsultantName || p.collectorCode || '-').toUpperCase()}</td>
					<td class="text-center no-print">
						<button class="btn btn-sm btn-outline-primary printEmiReceiptBtn" data-index="${idx}" title="PRINT RECEIPT">
							<i class="bi bi-printer"></i> PRINT
						</button>
					</td>
				</tr>
			`;
			tbody.append(row);
		});
	}

	$("#findBtn").click(function (e) {
		e.preventDefault();
		let branch = ($("#branch").val() || "").toUpperCase();
		let fDate = $("#fDate").val();
		let tDate = $("#tDate").val();

		let filtered = allEmiPayments.filter(p => {
			let bMatch = !branch || (p.branchName || "").toUpperCase().includes(branch);
			let pDate = p.paymentDate || "";
			let matchFrom = !fDate || pDate >= fDate;
			let matchTo = !tDate || pDate <= tDate;
			return bMatch && matchFrom && matchTo;
		});

		currentFilteredEmi = filtered;
		renderTable(filtered);
	});

	$("#resetBtn").click(function (e) {
		e.preventDefault();
		$("#branch").val("");
		$("#fDate").val("");
		$("#tDate").val("");
		currentFilteredEmi = allEmiPayments;
		renderTable(allEmiPayments);
	});

	$("#printFullReportBtn").click(function (e) {
		e.preventDefault();
		let branch = $("#branch").val() || "ALL BRANCHES";
		let fDate = $("#fDate").val() || "START";
		let tDate = $("#tDate").val() || "TODAY";
		let subTitle = `FILTERS: BRANCH: ${branch} | PERIOD: ${fDate} TO ${tDate}`;
		ReportPrintUtil.printTable('.datatable', 'EMI COLLECTION SUMMARY REPORT', subTitle);
	});

	$(document).off("click", ".printEmiReceiptBtn").on("click", ".printEmiReceiptBtn", function (e) {
		e.preventDefault();
		let idx = $(this).data("index");
		let p = currentFilteredEmi[idx] || allEmiPayments[idx];
		if (!p) {
			alert("EMI PAYMENT RECORD NOT FOUND");
			return;
		}

		let amt = parseFloat(p.emiPayment || p.loanAmount || 0);

		let html = `
			<table class="table table-bordered text-uppercase" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
				<thead class="table-dark">
					<tr>
						<th colspan="4" style="padding: 10px; font-size: 14px; text-align: center;">
							LOAN EMI COLLECTION RECEIPT
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th style="width: 25%;">LOAN ACCOUNT ID</th>
						<td style="width: 25%; font-weight: bold; color: #002147;">${(p.loanId || '-').toUpperCase()}</td>
						<th style="width: 25%;">PAYMENT DATE</th>
						<td style="width: 25%; font-weight: bold;">${(p.paymentDate || '-').toUpperCase()}</td>
					</tr>
					<tr>
						<th>MEMBER CODE</th>
						<td>${(p.memberId || '-').toUpperCase()}</td>
						<th>BORROWER NAME</th>
						<td><strong>${(p.memberName || p.customerName || '-').toUpperCase()}</strong></td>
					</tr>
					<tr>
						<th>BRANCH</th>
						<td>${(p.branchName || '-').toUpperCase()}</td>
						<th>PAYMENT MODE</th>
						<td>${(p.paymentMode || 'CASH').toUpperCase()}</td>
					</tr>
					<tr>
						<th>CHEQUE / UPI REF</th>
						<td>${(p.chequeNo || p.ref_UpiId || '-').toUpperCase()}</td>
						<th>COLLECTOR / ADVISOR</th>
						<td>${(p.financialConsultantName || p.collectorCode || '-').toUpperCase()}</td>
					</tr>
					<tr>
						<th>COLLECTED EMI AMOUNT</th>
						<td colspan="3" style="font-size: 16px; font-weight: bold; color: green;">₹${amt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
					</tr>
				</tbody>
			</table>
		`;

		ReportPrintUtil.printHtml("LOAN EMI PAYMENT RECEIPT", html);
	});

	loadEmiPayments();
});
