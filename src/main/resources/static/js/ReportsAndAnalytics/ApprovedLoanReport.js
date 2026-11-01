$(document).ready(function() {
	let allApprovedData = [];

	// Fetch all approved loan applications on page load
	$.ajax({
		url: "api/datacorrection/fetchAllApprovedLoanApplications",
		method: "GET",
		success: function(response) {
			if (response && response.data && Array.isArray(response.data)) {
				allApprovedData = response.data;

				// Fill branch dropdown
				let branches = new Set();
				allApprovedData.forEach(loan => {
					if (loan.branchName) branches.add(loan.branchName.trim().toUpperCase());
				});
				let $branchSelect = $('#branchName1');
				$branchSelect.empty().append('<option value="">ALL BRANCHES</option>');
				branches.forEach(branch => {
					$branchSelect.append(`<option value="${branch}">${branch}</option>`);
				});

				renderTable(allApprovedData);
			} else {
				$(".datatable tbody").html("<tr><td colspan='10' class='text-center text-muted'>NO APPROVED LOANS FOUND.</td></tr>");
			}
		},
		error: function() {
			$(".datatable tbody").html("<tr><td colspan='10' class='text-center text-danger'>ERROR WHILE FETCHING LOAN DATA.</td></tr>");
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

		renderTable(filtered);
	});

	$('#resetBtn').click(function(e) {
		e.preventDefault();
		$('#formid')[0].reset();
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
					<td>${index + 1}</td>
					<td><strong>${(loan.loanId || '').toUpperCase()}</strong></td>
					<td>${(loan.loanPlanName || '').toUpperCase()}</td>
					<td>${(loan.interestType || '').toUpperCase()}</td>
					<td>${loan.loanDate || ''}</td>
					<td>₹${parseFloat(loan.loanAmount || 0).toFixed(2)}</td>
					<td>${loan.contactNo || ''}</td>
					<td>${(loan.branchName || '').toUpperCase()}</td>
					<td><span class="badge bg-success">APPROVED</span></td>
					<td class="no-print">
						<button class="btn btn-sm btn-outline-success printPopupBtn" data-id="${loan.id}" title="PRINT SANCTION LETTER">
							<i class="bi bi-printer"></i>
						</button>
					</td>
				</tr>
			`;
			tableBody.append(row);
		});
	}

	// Single Sanction Letter Modal
	$(document).on("click", ".printPopupBtn", function() {
		const id = $(this).data("id");
		const loan = allApprovedData.find(p => p.id === id);
		if (!loan) return;

		ReportPrintUtil.getCompanyDetails(function(company) {
			let html = `
				<div style="font-family: Arial, sans-serif;">
					<div style="text-align: center; margin-bottom: 20px;">
						<h4 style="color: #002147; font-weight: bold; text-transform: uppercase; margin-bottom: 3px;">
							${company.companyName}
						</h4>
						<p style="margin: 0; font-size: 12px; text-transform: uppercase;">
							${company.address}, ${company.city}, ${company.state} - ${company.pinCode}
						</p>
						<p style="margin: 2px 0 0 0; font-size: 11px; text-transform: uppercase; color: #555;">
							CIN: ${company.cinNo} | HELPLINE: ${company.helplineNo} | EMAIL: ${company.emailId}
						</p>
						<hr style="margin: 15px 0;">
						<h5 style="color: #002147; font-weight: bold; text-transform: uppercase;">
							LOAN SANCTION & APPROVAL DOSSIER
						</h5>
					</div>

					<table style="width: 100%; border-collapse: collapse; font-size: 13px;">
						<tr style="background: #0d6efd; color: #fff;">
							<th colspan="4" style="padding: 8px; border: 1px solid #333; text-transform: uppercase;">
								LOAN APPLICATION & BORROWER DETAILS
							</th>
						</tr>
						<tr>
							<th style="border: 1px solid #333; padding: 8px; width: 25%; background: #f2f2f2; text-transform: uppercase;">LOAN ID</th>
							<td style="border: 1px solid #333; padding: 8px; width: 25%;"><strong>${(loan.loanId || '-').toUpperCase()}</strong></td>
							<th style="border: 1px solid #333; padding: 8px; width: 25%; background: #f2f2f2; text-transform: uppercase;">BORROWER NAME</th>
							<td style="border: 1px solid #333; padding: 8px; width: 25%;"><strong>${(loan.memberName || loan.customerName || '-').toUpperCase()}</strong></td>
						</tr>
						<tr>
							<th style="border: 1px solid #333; padding: 8px; background: #f2f2f2; text-transform: uppercase;">LOAN PLAN NAME</th>
							<td style="border: 1px solid #333; padding: 8px;">${(loan.loanPlanName || '-').toUpperCase()}</td>
							<th style="border: 1px solid #333; padding: 8px; background: #f2f2f2; text-transform: uppercase;">INTEREST TYPE</th>
							<td style="border: 1px solid #333; padding: 8px;">${(loan.interestType || '-').toUpperCase()}</td>
						</tr>
						<tr>
							<th style="border: 1px solid #333; padding: 8px; background: #f2f2f2; text-transform: uppercase;">SANCTION AMOUNT</th>
							<td style="border: 1px solid #333; padding: 8px;"><strong>₹${parseFloat(loan.loanAmount || 0).toFixed(2)}</strong></td>
							<th style="border: 1px solid #333; padding: 8px; background: #f2f2f2; text-transform: uppercase;">SANCTION DATE</th>
							<td style="border: 1px solid #333; padding: 8px;">${loan.loanDate || '-'}</td>
						</tr>
						<tr>
							<th style="border: 1px solid #333; padding: 8px; background: #f2f2f2; text-transform: uppercase;">BRANCH</th>
							<td style="border: 1px solid #333; padding: 8px;">${(loan.branchName || '-').toUpperCase()}</td>
							<th style="border: 1px solid #333; padding: 8px; background: #f2f2f2; text-transform: uppercase;">CONTACT NUMBER</th>
							<td style="border: 1px solid #333; padding: 8px;">${loan.contactNo || '-'}</td>
						</tr>
						<tr>
							<th style="border: 1px solid #333; padding: 8px; background: #f2f2f2; text-transform: uppercase;">APPROVAL STATUS</th>
							<td style="border: 1px solid #333; padding: 8px; color: green; font-weight: bold;">APPROVED</td>
							<th style="border: 1px solid #333; padding: 8px; background: #f2f2f2; text-transform: uppercase;">TERM / TENURE</th>
							<td style="border: 1px solid #333; padding: 8px;">${loan.loanTerm || '-'} MONTHS</td>
						</tr>
					</table>
				</div>
			`;

			$("#modalDataContainer").html(html);
			const modalEl = document.getElementById("printModal");
			const bsModal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
			bsModal.show();
		});
	});

	// Print single loan sanction letter
	$("#printBtn").click(function() {
		const printContent = document.getElementById("modalDataContainer").innerHTML;
		ReportPrintUtil.printHtml("LOAN SANCTION LETTER", printContent);
	});

});
