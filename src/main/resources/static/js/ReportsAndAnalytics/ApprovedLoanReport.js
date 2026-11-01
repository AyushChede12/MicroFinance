$(document).ready(function() {
	let allApprovedData = [];
	let currentFilteredData = [];

	// Load branches from branch module
	$.ajax({
		url: "api/preference/getAllBranchModule",
		type: "GET",
		success: function(response) {
			let list = response && response.data ? response.data : (Array.isArray(response) ? response : []);
			let sel = $("#branchName1");
			sel.html("<option value=''>ALL BRANCHES</option>");
			list.forEach(b => {
				if (b && b.branchName) {
					let name = b.branchName.trim().toUpperCase();
					sel.append(`<option value="${name}">${name}</option>`);
				}
			});
		}
	});

	// Fetch all approved loan applications on page load
	$.ajax({
		url: "api/datacorrection/fetchAllApprovedLoanApplications",
		method: "GET",
		success: function(response) {
			if (response && response.data && Array.isArray(response.data)) {
				allApprovedData = response.data;
				currentFilteredData = allApprovedData;
				renderTable(allApprovedData);
			} else {
				$(".datatable tbody").html("<tr><td colspan='10' class='text-center text-muted'>NO APPROVED LOANS FOUND.</td></tr>");
			}
		},
		error: function() {
			allApprovedData = [];
			$(".datatable tbody").html("<tr><td colspan='10' class='text-center text-muted'>NO APPROVED LOANS FOUND.</td></tr>");
		}
	});

	// Filter on Find button click
	$('#findBtn').click(function(e) {
		e.preventDefault();

		const selectedBranch = $('#branchName1').val();
		const fromDate = $('#fromDate').val();
		const toDate = $('#toDate').val();

		const filtered = allApprovedData.filter(loan => {
			const loanDate = loan.loanDate;
			let matchBranch = !selectedBranch || (loan.branchName && loan.branchName.toUpperCase() === selectedBranch.toUpperCase());
			let matchDate = true;
			if (fromDate && loanDate) matchDate = matchDate && (loanDate >= fromDate);
			if (toDate && loanDate) matchDate = matchDate && (loanDate <= toDate);
			return matchBranch && matchDate;
		});

		currentFilteredData = filtered;
		renderTable(filtered);
	});

	$('#resetBtn').click(function(e) {
		e.preventDefault();
		$('#formid')[0].reset();
		currentFilteredData = allApprovedData;
		renderTable(allApprovedData);
	});

	// Print Full Report Table
	$('#printFullReportBtn').click(function(e) {
		e.preventDefault();
		let branch = $('#branchName1').val() || "ALL BRANCHES";
		let subTitle = "BRANCH: " + branch.toUpperCase();
		if ($('#fromDate').val() && $('#toDate').val()) {
			subTitle += " | PERIOD: " + $('#fromDate').val() + " TO " + $('#toDate').val();
		}
		ReportPrintUtil.printTable('.datatable', 'APPROVED LOAN REPORT', subTitle);
	});

	// Render Table
	function renderTable(data) {
		let tableBody = $(".datatable tbody");
		tableBody.empty();

		if (!data || !data.length) {
			tableBody.append("<tr><td colspan='10' class='text-center text-muted'>NO MATCHING LOAN APPLICATIONS FOUND.</td></tr>");
			return;
		}

		data.forEach((loan, index) => {
			let row = `
				<tr style="font-family: 'Poppins', sans-serif;">
					<td class="text-center font-monospace">${index + 1}</td>
					<td><strong>${(loan.loanId || '').toUpperCase()}</strong></td>
					<td>${(loan.loanPlanName || loan.typeOfLoan || '').toUpperCase()}</td>
					<td>${(loan.interestType || 'FLAT').toUpperCase()}</td>
					<td>${loan.loanDate || loan.approvalDate || '-'}</td>
					<td class="fw-bold">₹${parseFloat(loan.loanAmount || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td>${loan.contactNo || '-'}</td>
					<td>${(loan.branchName || '-').toUpperCase()}</td>
					<td><span class="badge bg-success">APPROVED</span></td>
					<td class="text-center no-print">
						<button class="btn btn-sm btn-outline-success printPopupBtn" data-index="${index}" title="PRINT SANCTION LETTER">
							<i class="bi bi-printer"></i> PRINT
						</button>
					</td>
				</tr>
			`;
			tableBody.append(row);
		});
	}

	// Single Sanction Letter Direct Print & Modal
	$(document).off("click", ".printPopupBtn").on("click", ".printPopupBtn", function(e) {
		e.preventDefault();
		const idx = $(this).data("index");
		const loan = currentFilteredData[idx] || allApprovedData[idx];
		if (!loan) {
			alert("LOAN RECORD NOT FOUND");
			return;
		}

		let html = `
			<table class="table table-bordered text-uppercase" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
				<thead class="table-dark">
					<tr>
						<th colspan="4" style="padding: 10px; font-size: 14px; text-align: center;">
							OFFICIAL LOAN SANCTION & BORROWER DETAILS
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th style="width: 25%;">LOAN ID</th>
						<td style="width: 25%; font-weight: bold;">${(loan.loanId || '-').toUpperCase()}</td>
						<th style="width: 25%;">BORROWER NAME</th>
						<td style="width: 25%; font-weight: bold;">${(loan.memberName || loan.customerName || '-').toUpperCase()}</td>
					</tr>
					<tr>
						<th>LOAN PLAN NAME</th>
						<td>${(loan.loanPlanName || loan.typeOfLoan || '-').toUpperCase()}</td>
						<th>INTEREST TYPE</th>
						<td>${(loan.interestType || 'FLAT').toUpperCase()}</td>
					</tr>
					<tr>
						<th>SANCTION AMOUNT</th>
						<td style="font-weight: bold; color: green;">₹${parseFloat(loan.loanAmount || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
						<th>SANCTION DATE</th>
						<td>${loan.loanDate || loan.approvalDate || '-'}</td>
					</tr>
					<tr>
						<th>BRANCH</th>
						<td>${(loan.branchName || '-').toUpperCase()}</td>
						<th>CONTACT NUMBER</th>
						<td>${loan.contactNo || '-'}</td>
					</tr>
					<tr>
						<th>APPROVAL STATUS</th>
						<td style="color: green; font-weight: bold;">APPROVED / SANCTIONED</td>
						<th>TERM / TENURE</th>
						<td>${loan.loanTerm || '-'} MONTHS</td>
					</tr>
					<tr>
						<th>RATE OF INTEREST</th>
						<td>${loan.rateOfInterest || '0'}% P.A.</td>
						<th>MONTHLY EMI</th>
						<td style="font-weight: bold;">₹${parseFloat(loan.emiPayment || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					</tr>
					<tr>
						<th>GUARANTOR</th>
						<td>${(loan.guarantorIdentity || loan.guarantorMemberId || 'N/A').toUpperCase()}</td>
						<th>FINANCIAL ADVISOR</th>
						<td>${(loan.financialConsultantName || loan.financialConsultantId || 'DIRECT').toUpperCase()}</td>
					</tr>
				</tbody>
			</table>
		`;

		ReportPrintUtil.printHtml("LOAN SANCTION & APPROVAL LETTER", html);
	});
});
