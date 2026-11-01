$(document).ready(function() {
	let allLoans = [];

	// ==========================
	// Load Loan Plan Dropdown & Data
	// ==========================
	$.ajax({
		url: "api/datacorrection/fetchAllApprovedLoanApplications",
		type: "GET",
		success: function(response) {
			if (response.status === "OK" || response.status === "SUCCESS" || Array.isArray(response.data)) {
				allLoans = response.data || [];

				const uniquePlans = new Set();
				allLoans.forEach(item => {
					if (item.loanPlanName) uniquePlans.add(item.loanPlanName.trim().toUpperCase());
					if (item.typeOfLoan) uniquePlans.add(item.typeOfLoan.trim().toUpperCase());
				});

				$("#loanPlanName").html("<option value=''>ALL PLANS</option>");
				uniquePlans.forEach(plan => {
					$("#loanPlanName").append(`<option value="${plan}">${plan}</option>`);
				});

				bindTable(allLoans);
			} else {
				bindTable([]);
			}
		},
		error: function() {
			allLoans = [];
			bindTable([]);
		}
	});

	// ==========================
	// FIND BUTTON
	// ==========================
	$("#findBtn").click(function(e) {
		e.preventDefault();
		filterLoans();
	});

	// ==========================
	// RESET BUTTON
	// ==========================
	$("#resetBtn").click(function(e) {
		e.preventDefault();
		$("#loanPlanName").val('');
		$("#financialCode").val('');
		$("#toDate").val('');
		bindTable(allLoans);
	});

	// ==========================
	// PRINT FULL REPORT
	// ==========================
	$("#printFullReportBtn").click(function(e) {
		e.preventDefault();
		const plan = $("#loanPlanName").val() || 'ALL PLANS';
		const finCode = $("#financialCode").val() || 'ALL';
		const toDate = $("#toDate").val() || 'ALL DATES';
		const subTitle = `FILTERS: PLAN: ${plan} | ADVISOR: ${finCode} | SANCTIONED BEFORE: ${toDate}`;
		ReportPrintUtil.printTable('.datatable', 'LOAN CONFIRMATION & SANCTION REGISTER', subTitle);
	});

	function filterLoans() {
		let plan = ($("#loanPlanName").val() || '').trim().toUpperCase();
		let financialCode = ($("#financialCode").val() || '').trim().toUpperCase();
		let toDate = $("#toDate").val();

		let filtered = allLoans.filter(item => {
			let itemPlan = (item.loanPlanName || item.typeOfLoan || '').toUpperCase();
			let itemFin = (item.financialConsultantId || item.financialConsultantName || '').toUpperCase();

			let matchesPlan = !plan || itemPlan.includes(plan);
			let matchesFin = !financialCode || itemFin.includes(financialCode);

			let matchesDate = true;
			if (toDate) {
				let loanDate = parseDate(item.loanDate || item.approvalDate || item.loanStartDate);
				let tDate = new Date(toDate);
				if (loanDate && !isNaN(loanDate.getTime())) {
					matchesDate = loanDate <= tDate;
				}
			}

			return matchesPlan && matchesFin && matchesDate;
		});

		bindTable(filtered);
	}

	// ==========================
	// TABLE BIND FUNCTION
	// ==========================
	function bindTable(data) {
		let tbody = $(".datatable tbody");
		tbody.empty();

		if (!data.length) {
			tbody.append("<tr><td colspan='15' class='text-center text-danger fw-bold'>NO LOAN CONFIRMATION DOCUMENTS FOUND</td></tr>");
			return;
		}

		data.forEach(function(loan, index) {
			let loanAmount = parseFloat(loan.loanAmount || 0);
			let disbursedAmount = parseFloat(loan.disbursedAmount || loan.sanctionedAmount || loan.loanAmount || 0);
			let totalPaid = parseFloat(loan.totalPaidAmount || loan.charges || 0);
			let outstanding = (disbursedAmount - totalPaid) > 0 ? (disbursedAmount - totalPaid) : 0;
			let status = (loan.confirmationStatus || loan.loanStatus || "CONFIRMED").toUpperCase();

			let statusBadge = `<span class="badge bg-success">${status}</span>`;
			if (status.includes("PEND")) {
				statusBadge = `<span class="badge bg-warning text-dark">${status}</span>`;
			}

			let row = `
			<tr>
				<td class="text-center font-monospace">${index + 1}</td>
				<td class="fw-bold">${(loan.loanId || "").toUpperCase()}</td>
				<td class="fw-semibold">${(loan.memberName || "").toUpperCase()}</td>
				<td>${(loan.branchName || "").toUpperCase()}</td>
				<td>${(loan.loanPlanName || loan.typeOfLoan || "").toUpperCase()}</td>
				<td class="fw-bold">₹${loanAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
				<td class="text-success fw-bold">₹${disbursedAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
				<td>${loan.rateOfInterest || 0}%</td>
				<td>${(loan.loanTerm || 0)} MONTHS</td>
				<td>${(loan.loanStartDate || loan.loanDate || "").toUpperCase()}</td>
				<td>${(loan.loanEndDate || "").toUpperCase()}</td>
				<td class="text-success fw-bold">₹${totalPaid.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
				<td class="text-danger fw-bold">₹${outstanding.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
				<td>${statusBadge}</td>
				<td class="text-center no-print">
					<button class="btn btn-sm btn-outline-primary printCertBtn" data-index="${index}">
						<i class="bi bi-file-earmark-check"></i> CERTIFICATE
					</button>
				</td>
			</tr>
			`;

			tbody.append(row);
		});

		// Attach print certificate button handler
		$(".printCertBtn").off("click").on("click", function() {
			let idx = $(this).data("index");
			let loan = data[idx];
			if (loan) {
				printLoanCertificate(loan);
			}
		});
	}

	// ==========================
	// PRINT CONFIRMATION CERTIFICATE
	// ==========================
	function printLoanCertificate(loan) {
		let loanAmount = parseFloat(loan.loanAmount || 0);
		let disbursedAmount = parseFloat(loan.disbursedAmount || loan.sanctionedAmount || loan.loanAmount || 0);
		let emiPayment = parseFloat(loan.emiPayment || 0);
		let totalPaid = parseFloat(loan.totalPaidAmount || loan.charges || 0);
		let outstanding = (disbursedAmount - totalPaid) > 0 ? (disbursedAmount - totalPaid) : 0;

		let content = `
			<div style="border: 2px solid #000; padding: 25px; margin-top: 10px; background-color: #fff;">
				<h4 class="text-center fw-bold text-uppercase mb-4" style="text-decoration: underline;">OFFICIAL LOAN SANCTION & CONFIRMATION DOCUMENT</h4>

				<p style="font-size: 14px; line-height: 1.8;">
					THIS IS TO OFFICIALLY CERTIFY AND CONFIRM THAT THE LOAN FACILITY DETAILED BELOW HAS BEEN SANCTIONED AND CONFIRMED BY THE SOCIETY UNDER THE APPROVED REGULATORY NORMS AND GUIDELINES.
				</p>

				<table class="table table-bordered text-uppercase mt-3 mb-4">
					<tbody>
						<tr><td style="width: 30%;" class="fw-bold">LOAN ACCOUNT ID</td><td class="fw-bold">${(loan.loanId || '').toUpperCase()}</td><td style="width: 25%;" class="fw-bold">CONFIRMATION DATE</td><td>${(loan.loanDate || loan.approvalDate || new Date().toISOString().split('T')[0]).toUpperCase()}</td></tr>
						<tr><td class="fw-bold">BORROWER / MEMBER CODE</td><td>${(loan.memberId || '').toUpperCase()}</td><td class="fw-bold">BORROWER NAME</td><td class="fw-bold">${(loan.memberName || '').toUpperCase()}</td></tr>
						<tr><td class="fw-bold">CONTACT NUMBER</td><td>${(loan.contactNo || '').toUpperCase()}</td><td class="fw-bold">HOME BRANCH</td><td>${(loan.branchName || '').toUpperCase()}</td></tr>
						<tr><td class="fw-bold">RESIDENTIAL ADDRESS</td><td colspan="3">${(loan.address || 'AS PER BANK RECORD').toUpperCase()}</td></tr>
						<tr><td class="fw-bold">SCHEME / PLAN NAME</td><td>${(loan.loanPlanName || loan.typeOfLoan || '').toUpperCase()}</td><td class="fw-bold">FACILITY TYPE</td><td>${(loan.typeOfLoan || 'TERM LOAN').toUpperCase()}</td></tr>
						<tr><td class="fw-bold">SANCTIONED AMOUNT</td><td class="fw-bold">₹${loanAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td><td class="fw-bold">DISBURSED AMOUNT</td><td class="text-success fw-bold">₹${disbursedAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
						<tr><td class="fw-bold">RATE OF INTEREST</td><td>${loan.rateOfInterest || 0}% P.A.</td><td class="fw-bold">TENURE / TERM</td><td>${(loan.loanTerm || 0)} MONTHS</td></tr>
						<tr><td class="fw-bold">MONTHLY EMI PAYABLE</td><td class="text-primary fw-bold">₹${emiPayment.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td><td class="fw-bold">OUTSTANDING PRINCIPAL</td><td class="text-danger fw-bold">₹${outstanding.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
						<tr><td class="fw-bold">GUARANTOR NAME</td><td>${(loan.guarantorIdentity || loan.guarantorMemberId || 'N/A').toUpperCase()}</td><td class="fw-bold">CONSULTANT / ADVISOR</td><td>${(loan.financialConsultantName || loan.financialConsultantId || 'DIRECT').toUpperCase()}</td></tr>
						<tr><td class="fw-bold">CONFIRMATION STATUS</td><td colspan="3"><span class="badge bg-success">${(loan.confirmationStatus || loan.loanStatus || 'SANCTIONED & CONFIRMED').toUpperCase()}</span></td></tr>
					</tbody>
				</table>

				<div class="mt-4 pt-3" style="font-size: 13px;">
					<p class="fw-bold mb-1">DECLARATION & TERMS:</p>
					<p class="mb-0">
						1. THE BORROWER AGREES TO REPAY THE OUTSTANDING DUES PROMPTLY AS PER THE AGREED REPAYMENT SCHEDULE.<br>
						2. ALL INTEREST AND CHARGES LEVIED ARE IN ACCORDANCE WITH THE BYLAWS AND COOPERATIVE SOCIETY BANKING RULES.<br>
						3. THIS CONFIRMATION SERVES AS VALID LEGAL PROOF OF SANCTION ISSUED FROM THE REGISTERED SOCIETY OFFICE.
					</p>
				</div>
			</div>
		`;

		ReportPrintUtil.printHtml("LOAN CONFIRMATION & SANCTION DOCUMENT", content);
	}

	function parseDate(dateStr) {
		if (!dateStr) return null;
		let str = String(dateStr).trim();
		if (str.includes('/')) {
			let parts = str.split('/');
			if (parts.length === 3) return new Date(parts[2], parts[1] - 1, parts[0]);
		} else if (str.includes('-')) {
			let parts = str.split('-');
			if (parts.length === 3) {
				if (parts[0].length === 4) return new Date(str);
				return new Date(parts[2], parts[1] - 1, parts[0]);
			}
		}
		return new Date(str);
	}
});
