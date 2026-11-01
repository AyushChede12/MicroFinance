$(document).ready(function() {
	let allEmiPayments = [];

	$.ajax({
		url: "api/preference/getAllBranchModule",
		type: "GET",
		success: function(response) {
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
			success: function(response) {
				allEmiPayments = response && response.data ? response.data : [];
				renderTable(allEmiPayments);
			},
			error: function() {
				$("#emiTableBody").html("<tr><td colspan='13' class='text-center text-danger fw-bold'>NO EMI COLLECTION RECORDS FOUND</td></tr>");
			}
		});
	}

	function renderTable(data) {
		let tbody = $("#emiTableBody");
		tbody.empty();

		if (!data || !data.length) {
			tbody.html("<tr><td colspan='13' class='text-center text-danger fw-bold'>NO MATCHING EMI COLLECTIONS FOUND</td></tr>");
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
					<td class="text-success fw-bold">₹${amt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td>₹${principal.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td class="text-primary">₹${interest.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td><span class="badge bg-secondary">${(p.paymentMode || 'CASH').toUpperCase()}</span></td>
					<td>${(p.chequeNo || p.ref_UpiId || '-').toUpperCase()}</td>
					<td>${(p.accountNo || '-').toUpperCase()}</td>
					<td>${(p.financialConsultantName || p.collectorCode || '-').toUpperCase()}</td>
				</tr>
			`;
			tbody.append(row);
		});
	}

	$("#findBtn").click(function(e) {
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

		renderTable(filtered);
	});

	$("#resetBtn").click(function(e) {
		e.preventDefault();
		$("#branch").val("");
		$("#fDate").val("");
		$("#tDate").val("");
		renderTable(allEmiPayments);
	});

	$("#printFullReportBtn").click(function(e) {
		e.preventDefault();
		let branch = $("#branch").val() || "ALL BRANCHES";
		let fDate = $("#fDate").val() || "START";
		let tDate = $("#tDate").val() || "TODAY";
		let subTitle = `FILTERS: BRANCH: ${branch} | PERIOD: ${fDate} TO ${tDate}`;
		ReportPrintUtil.printTable('.datatable', 'EMI COLLECTION SUMMARY REPORT', subTitle);
	});

	loadEmiPayments();
});
