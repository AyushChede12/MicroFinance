$(document).ready(function() {
	let allPaymentData = [];

	// ✅ 1. Fetch all approved loan applications on page load
	$.ajax({
		url: "api/reports/getLoanPaymentReport",
		method: "GET",
		success: function(response) {
			console.log("API Response:", response);

			if (response && response.data && Array.isArray(response.data)) {
				allPaymentData = response.data;

				// ✅ Fill loan dropdown
				let loanIdSet = new Set();
				$('#loanId').html('<option value="">ALL LOAN IDS</option>');
				allPaymentData.forEach(loan => {
					if (loan.loanId) loanIdSet.add(loan.loanId);
				});
				loanIdSet.forEach(id => {
					$('#loanId').append(`<option value="${id}">${String(id).toUpperCase()}</option>`);
				});

				// ✅ Render full table initially
				renderTable(allPaymentData);
			} else {
				$(".datatable tbody").html("<tr><td colspan='8' class='text-center'>NO LOAN PAYMENT FOUND.</td></tr>");
			}
		},
		error: function() {
			alert("ERROR WHILE FETCHING LOAN PAYMENT.");
		}
	});

	// ✅ 2. Filter on Find button click
	$('#findBtn').click(function(e) {
		e.preventDefault();

		const loanId = $('#loanId').val();
		const fromDate = $('#fromDate').val();
		const toDate = $('#toDate').val();

		const filtered = allPaymentData.filter(loan => {
			const paymentDate = loan.paymentDate || '';
			const matchesLoan = !loanId || loan.loanId === loanId;
			const matchesFrom = !fromDate || paymentDate >= fromDate;
			const matchesTo = !toDate || paymentDate <= toDate;
			return matchesLoan && matchesFrom && matchesTo;
		});

		renderTable(filtered);
	});

	// ✅ Reset button
	$('#resetBtn').click(function(e) {
		e.preventDefault();
		$('#loanId').val('');
		$('#fromDate').val('');
		$('#toDate').val('');
		renderTable(allPaymentData);
	});

	// ✅ Full Report Print
	$('#printFullReportBtn').click(function(e) {
		e.preventDefault();
		const loanId = $('#loanId').val() || 'ALL LOANS';
		const fromDate = $('#fromDate').val() || 'START';
		const toDate = $('#toDate').val() || 'TODAY';
		const subTitle = `FILTER: LOAN ID: ${loanId} | PERIOD: ${fromDate} TO ${toDate}`;
		ReportPrintUtil.printTable('.datatable', 'LOAN RE-PAYMENT TRANSACTION REPORT', subTitle);
	});

	// ✅ 3. Render the table and handle print popup
	function renderTable(data) {
		let tableBody = $(".datatable tbody");
		tableBody.empty();

		if (!data.length) {
			tableBody.append("<tr><td colspan='8' class='text-center'>NO MATCHING LOAN PAYMENTS FOUND.</td></tr>");
			return;
		}

		data.forEach((loan, index) => {
			let statusBadge = `<span class="badge bg-success">${(loan.paymentStatus || 'COMPLETED').toUpperCase()}</span>`;
			if (loan.paymentStatus && loan.paymentStatus.toUpperCase().includes('PEND')) {
				statusBadge = `<span class="badge bg-warning text-dark">${loan.paymentStatus.toUpperCase()}</span>`;
			} else if (loan.paymentStatus && loan.paymentStatus.toUpperCase().includes('FAIL')) {
				statusBadge = `<span class="badge bg-danger">${loan.paymentStatus.toUpperCase()}</span>`;
			}

			let row = `
				<tr>
					<td class="text-center font-monospace">${index + 1}</td>
					<td class="fw-bold">${(loan.loanId || '').toUpperCase()}</td>
					<td>${(loan.loanPlanName || '').toUpperCase()}</td>
					<td class="fw-semibold">₹${Number(loan.loanAmount || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td class="text-success fw-bold">₹${Number(loan.emiPayment || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
					<td>${(loan.paymentDate || '').toUpperCase()}</td>
					<td>${statusBadge}</td>
					<td class="text-center no-print">
						<button class="btn btn-sm btn-outline-primary printPopupBtn" data-id="${loan.id}" data-bs-toggle="modal" data-bs-target="#receiptModal">
							<i class="bi bi-printer"></i> RECEIPT
						</button>
					</td>
				</tr>
			`;
			tableBody.append(row);
		});

		// ✅ Handle print popup
		$(".printPopupBtn").click(function() {
			const id = $(this).data("id");
			const selectedPolicy = allPaymentData.find(p => p.id === id);

			if (selectedPolicy) {
				let html = `
					<div class="table-responsive">
						<table class="table table-bordered table-striped text-uppercase">
							<thead class="table-dark">
								<tr>
									<th style="width: 40%;">PARAMETER</th>
									<th style="width: 60%;">DETAILS</th>
								</tr>
							</thead>
							<tbody>
								<tr><td>LOAN ID</td><td class="fw-bold">${(selectedPolicy.loanId || '').toUpperCase()}</td></tr>
								<tr><td>LOAN DATE</td><td>${(selectedPolicy.loanDate || '').toUpperCase()}</td></tr>
								<tr><td>MEMBER ID</td><td>${(selectedPolicy.memberId || '').toUpperCase()}</td></tr>
								<tr><td>RELATIVE DETAILS</td><td>${(selectedPolicy.relativeDetails || '').toUpperCase()}</td></tr>
								<tr><td>DATE OF BIRTH</td><td>${(selectedPolicy.dateOfBirth || '').toUpperCase()}</td></tr>
								<tr><td>AGE</td><td>${(selectedPolicy.age || '')}</td></tr>
								<tr><td>CONTACT NO</td><td>${(selectedPolicy.contactNo || '').toUpperCase()}</td></tr>
								<tr><td>MESSAGE STATUS</td><td>${(selectedPolicy.messageStatus || '').toUpperCase()}</td></tr>
								<tr><td>ADDRESS</td><td>${(selectedPolicy.address || '').toUpperCase()}</td></tr>
								<tr><td>PIN CODE</td><td>${(selectedPolicy.pinCode || '').toUpperCase()}</td></tr>
								<tr><td>BRANCH NAME</td><td>${(selectedPolicy.branchName || '').toUpperCase()}</td></tr>

								<tr><td>LOAN PLAN NAME</td><td>${(selectedPolicy.loanPlanName || '').toUpperCase()}</td></tr>
								<tr><td>TYPE OF LOAN</td><td>${(selectedPolicy.typeOfLoan || '').toUpperCase()}</td></tr>
								<tr><td>LOAN MODE</td><td>${(selectedPolicy.loanMode || '').toUpperCase()}</td></tr>
								<tr><td>LOAN TERM</td><td>${(selectedPolicy.loanTerm || '').toUpperCase()}</td></tr>
								<tr><td>RATE OF INTEREST</td><td>${(selectedPolicy.rateOfInterest || '')}%</td></tr>
								<tr><td>LOAN AMOUNT</td><td class="fw-bold">₹${Number(selectedPolicy.loanAmount || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
								<tr><td>INTEREST TYPE</td><td>${(selectedPolicy.interestType || '').toUpperCase()}</td></tr>
								<tr><td>EMI PAYMENT</td><td class="text-success fw-bold">₹${Number(selectedPolicy.emiPayment || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>

								<tr><td>GUARANTOR MEMBER ID</td><td>${(selectedPolicy.guarantorMemberId || '').toUpperCase()}</td></tr>
								<tr><td>GUARANTOR IDENTITY</td><td>${(selectedPolicy.guarantorIdentity || '').toUpperCase()}</td></tr>
								<tr><td>GUARANTOR ADDRESS</td><td>${(selectedPolicy.guarantorAddress || '').toUpperCase()}</td></tr>
								<tr><td>GUARANTOR CONTACT</td><td>${(selectedPolicy.guarantorContactNo || '').toUpperCase()}</td></tr>

								<tr><td>CO-APPLICANT MEMBER ID</td><td>${(selectedPolicy.coApplicantMemberId || '').toUpperCase()}</td></tr>
								<tr><td>CO-APPLICANT IDENTITY</td><td>${(selectedPolicy.coApplicantIdentity || '').toUpperCase()}</td></tr>
								<tr><td>CO-APPLICANT ADDRESS</td><td>${(selectedPolicy.coApplicantAddress || '').toUpperCase()}</td></tr>

								<tr><td>PROCESSING FEE</td><td>₹${Number(selectedPolicy.processingFee || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
								<tr><td>LEGAL CHARGES</td><td>₹${Number(selectedPolicy.legalCharges || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>
								<tr><td>GST</td><td>₹${Number(selectedPolicy.gst || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}</td></tr>

								<tr><td>FINANCIAL CONSULTANT</td><td>${(selectedPolicy.financialConsultantName || '').toUpperCase()}</td></tr>

								<tr><td>PAYMENT DATE</td><td class="fw-bold">${(selectedPolicy.paymentDate || '').toUpperCase()}</td></tr>
								<tr><td>PAYMENT STATUS</td><td><span class="badge bg-success">${(selectedPolicy.paymentStatus || 'COMPLETED').toUpperCase()}</span></td></tr>
								<tr><td>PAYMENT MODE</td><td>${(selectedPolicy.paymentMode || 'CASH').toUpperCase()}</td></tr>

								<tr><td>ACCOUNT NO</td><td>${(selectedPolicy.accountNo || '').toUpperCase()}</td></tr>
								<tr><td>UPI REF</td><td>${(selectedPolicy.ref_UpiId || '').toUpperCase()}</td></tr>

								<tr><td>REMARKS</td><td>${(selectedPolicy.remarks || 'LOAN EMI RE-PAYMENT').toUpperCase()}</td></tr>
								<tr><td>CHEQUE DATE</td><td>${(selectedPolicy.chequeDate || '').toUpperCase()}</td></tr>
								<tr><td>CHEQUE NO</td><td>${(selectedPolicy.chequeNo || '').toUpperCase()}</td></tr>
							</tbody>
						</table>
					</div>
				`;
				$("#modalDataContainer").html(html);
			}
		});
	}

	// ✅ 4. Print modal data with dynamic bank letterhead
	$(document).off("click", "#printBtn").on("click", "#printBtn", function() {
		const content = document.getElementById("modalDataContainer").innerHTML;
		ReportPrintUtil.printHtml("LOAN EMI PAYMENT RECEIPT", content);
	});
});
