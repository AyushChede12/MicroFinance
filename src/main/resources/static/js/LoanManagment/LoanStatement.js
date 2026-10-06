// Regular Loan Statement Handler

$(document).ready(function() {
	populateLoanIdDropdown();
	initSearchHandler();
});

// Populate Loan IDs in dropdown
function populateLoanIdDropdown() {
	$.ajax({
		url: "api/loanmanegment/getStatementLoanId",
		type: "GET",
		dataType: "json",
		success: function(response) {
			console.log("Loan ID response:", response);

			if (response.status === "OK" && Array.isArray(response.data)) {
				const $dropdown = $("#loanStatementID");
				$dropdown.empty();
				$dropdown.append('<option value="" disabled selected>SELECT LOAN ID</option>');

				response.data.forEach(function(id) {
					$dropdown.append(`<option value="${id}">${id}</option>`);
				});
			} else {
				console.warn("No Loan IDs found in response.");
			}
		},
		error: function(xhr, status, error) {
			console.error("Error fetching Loan IDs:", error);
		}
	});
}

function formatInr(val) {
	const num = Number(val) || 0;
	return '₹ ' + num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Search and Render Statement
function initSearchHandler() {
	$("#searchLoanStatement").click(function(e) {
		e.preventDefault();

		// Notice id contains & so we use attribute selector or escaped selector
		var loanType = $("select[name='loanId&Name']").val() || $("#loanId\\&Name").val();
		var loanId = $("#loanStatementID").val();

		if (!loanType) {
			alert("Please select Loan Type");
			return;
		}

		if (!loanId || !loanId.trim()) {
			alert("Please select a Loan ID");
			return;
		}

		loanId = loanId.trim();

		// Loading indicator
		$(".recent-sales").html(`
			<div class="text-center p-5">
				<div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
					<span class="visually-hidden">Loading...</span>
				</div>
				<p class="mt-3 text-muted fw-semibold">Fetching statement for ${loanId}...</p>
			</div>
		`);

		$.ajax({
			url: "api/loans/statement/regular?loanCode=" + encodeURIComponent(loanId),
			method: "GET",
			dataType: "json",
			success: function(statement) {
				console.log("Regular Loan Statement Response:", statement);
				renderRegularLoanStatement(statement);
			},
			error: function(xhr) {
				console.error("Statement fetch failed:", xhr);
				var errMsg = "Error fetching loan statement";
				if (xhr.responseJSON && xhr.responseJSON.message) {
					errMsg = xhr.responseJSON.message;
				} else if (xhr.responseText) {
					try {
						var parsed = JSON.parse(xhr.responseText);
						if (parsed.message) errMsg = parsed.message;
					} catch (e) { }
				}

				$(".recent-sales").html(`
					<div class="alert alert-danger m-3 p-4 shadow-sm" role="alert" style="border-radius: 8px;">
						<h5 class="alert-heading fw-bold mb-2">
							<i class="bi bi-exclamation-triangle-fill me-2"></i>Unable to Load Statement
						</h5>
						<p class="mb-0 fs-6">${errMsg}</p>
					</div>
				`);
			}
		});
	});
}

function renderRegularLoanStatement(data) {
	if (!data || !data.loanSummary) {
		$(".recent-sales").html("<div class='alert alert-warning m-3'>No statement data available for this Loan ID.</div>");
		return;
	}

	var s = data.loanSummary;
	var t = data.totals || {};
	var rows = data.statementRows || [];

	var html = `
		<div class="p-4" style="background:#fff; border-radius:10px;">
			<!-- Header -->
			<div class="d-flex justify-content-between align-items-center pb-3 border-bottom mb-4">
				<div>
					<h4 class="mb-0 fw-bold text-primary">REGULAR LOAN STATEMENT</h4>
					<small class="text-muted">Loan Account Statement & Amortization Schedule</small>
				</div>
				<button type="button" onclick="loanStatement()" class="btn btn-outline-primary shadow-sm px-3">
					<i class="bi bi-printer me-1"></i> PRINT STATEMENT
				</button>
			</div>

			<!-- Loan Summary Details -->
			<div class="card mb-4 border-0 shadow-sm" style="background: #f8f9fa;">
				<div class="card-body py-3">
					<div class="row g-3">
						<div class="col-md-3 col-sm-6">
							<span class="text-muted small d-block">LOAN CODE / ID</span>
							<strong class="fs-6 text-dark">${s.loanCode || '-'}</strong>
						</div>
						<div class="col-md-3 col-sm-6">
							<span class="text-muted small d-block">CUSTOMER NAME</span>
							<strong class="fs-6 text-dark">${(s.customerName || '-').toUpperCase()}</strong>
						</div>
						<div class="col-md-3 col-sm-6">
							<span class="text-muted small d-block">START DATE</span>
							<strong class="fs-6 text-dark">${s.startDate || '-'}</strong>
						</div>
						<div class="col-md-3 col-sm-6">
							<span class="text-muted small d-block">INTEREST RATE</span>
							<strong class="fs-6 text-dark">${s.interestRate}% p.a.</strong>
						</div>
						<div class="col-md-3 col-sm-6">
							<span class="text-muted small d-block">PRINCIPAL SANCTIONED</span>
							<strong class="fs-6 text-primary">${formatInr(s.principalAmount)}</strong>
						</div>
						<div class="col-md-3 col-sm-6">
							<span class="text-muted small d-block">TENURE</span>
							<strong class="fs-6 text-dark">${s.tenureMonths} Months</strong>
						</div>
						<div class="col-md-3 col-sm-6">
							<span class="text-muted small d-block">EMI AMOUNT</span>
							<strong class="fs-6 text-dark">${formatInr(s.emiAmount)}</strong>
						</div>
						<div class="col-md-3 col-sm-6">
							<span class="text-muted small d-block">OUTSTANDING PRINCIPAL</span>
							<strong class="fs-6 text-danger">${formatInr(s.outstandingPrincipal)}</strong>
						</div>
					</div>
				</div>
			</div>

			<!-- Totals Summary Cards -->
			<div class="row g-3 mb-4">
				<div class="col-md-3 col-sm-6">
					<div class="p-3 border rounded text-center bg-white shadow-sm">
						<small class="text-muted d-block fw-semibold">TOTAL PAID TILL DATE</small>
						<span class="fs-5 fw-bold text-success">${formatInr(t.totalPaid)}</span>
					</div>
				</div>
				<div class="col-md-3 col-sm-6">
					<div class="p-3 border rounded text-center bg-white shadow-sm">
						<small class="text-muted d-block fw-semibold">TOTAL INTEREST PAID</small>
						<span class="fs-5 fw-bold text-info">${formatInr(t.totalInterestPaid)}</span>
					</div>
				</div>
				<div class="col-md-3 col-sm-6">
					<div class="p-3 border rounded text-center bg-white shadow-sm">
						<small class="text-muted d-block fw-semibold">TOTAL PENALTY PAID</small>
						<span class="fs-5 fw-bold text-warning">${formatInr(t.totalPenaltyPaid)}</span>
					</div>
				</div>
				<div class="col-md-3 col-sm-6">
					<div class="p-3 border rounded text-center bg-white shadow-sm">
						<small class="text-muted d-block fw-semibold">CURRENT OUTSTANDING</small>
						<span class="fs-5 fw-bold text-danger">${formatInr(t.currentOutstanding)}</span>
					</div>
				</div>
			</div>

			<!-- Statement Rows Table -->
			<div class="table-responsive">
				<table class="table table-bordered table-hover align-middle mb-0" style="font-size: 0.9rem;">
					<thead class="table-light text-secondary text-uppercase fw-semibold">
						<tr>
							<th class="text-center" style="width: 50px;">#</th>
							<th>Due Date</th>
							<th class="text-end">EMI (₹)</th>
							<th class="text-end">Principal (₹)</th>
							<th class="text-end">Interest (₹)</th>
							<th class="text-end">Penalty (₹)</th>
							<th class="text-center">Paid Date</th>
							<th class="text-center">Status</th>
							<th class="text-end">Running Balance (₹)</th>
						</tr>
					</thead>
					<tbody>
	`;

	if (rows.length === 0) {
		html += `<tr><td colspan="9" class="text-center py-4 text-muted">No installment schedule found.</td></tr>`;
	} else {
		rows.forEach(function(r) {
			var statusBadge = '<span class="badge bg-secondary">PENDING</span>';
			if (r.status === 'PAID') {
				statusBadge = '<span class="badge bg-success">PAID</span>';
			} else if (r.status === 'OVERDUE') {
				statusBadge = '<span class="badge bg-danger">OVERDUE</span>';
			}

			html += `
				<tr>
					<td class="text-center fw-semibold">${r.installmentNumber}</td>
					<td>${r.dueDate || '-'}</td>
					<td class="text-end fw-semibold">${formatInr(r.emiAmount)}</td>
					<td class="text-end text-muted">${formatInr(r.principalComponent)}</td>
					<td class="text-end text-muted">${formatInr(r.interestComponent)}</td>
					<td class="text-end ${r.penaltyAmount > 0 ? 'text-danger fw-semibold' : 'text-muted'}">${formatInr(r.penaltyAmount)}</td>
					<td class="text-center text-muted">${r.paidDate || '-'}</td>
					<td class="text-center">${statusBadge}</td>
					<td class="text-end fw-semibold">${formatInr(r.runningBalance)}</td>
				</tr>
			`;
		});
	}

	html += `
					</tbody>
				</table>
			</div>
		</div>
	`;

	$(".recent-sales").html(html);
}

function loanStatement() {
	var printContents = document.getElementById("receiptArea").innerHTML;
	var printWindow = window.open('', '', 'height=700,width=900');
	printWindow.document.write(`
		<html>
		<head>
			<title>Loan Statement</title>
			<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
			<style>
				body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
				button { display: none !important; }
				.table th, .table td { padding: 6px 10px; font-size: 12px; }
				.badge { border: 1px solid #666; color: #000 !important; background: transparent !important; }
				@media print {
					button { display: none !important; }
				}
			</style>
		</head>
		<body>
			${printContents}
		</body>
		</html>
	`);
	printWindow.document.close();
	setTimeout(function() {
		printWindow.print();
	}, 250);
}