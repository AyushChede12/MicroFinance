// =========================================================================
// IRREGULAR LOAN STATEMENT HANDLER
// BANKING STANDARD IMPLEMENTATION - ALL TEXT & ALERTS IN UPPERCASE
// =========================================================================

let irregularCompanyDetails = null;

$(document).ready(function() {
	loadCompanyDetails();
	populateLoanIdDropdown();
	initSearchHandler();
});

function loadCompanyDetails() {
	$.ajax({
		url: "api/preference/getCompanyDetails",
		type: "GET",
		dataType: "json",
		success: function(resp) {
			if (resp && resp.status === "OK" && resp.data) {
				irregularCompanyDetails = resp.data;
			} else if (resp && resp.companyName) {
				irregularCompanyDetails = resp;
			}
		},
		error: function(err) {
			console.warn("COULD NOT LOAD COMPANY DETAILS", err);
		}
	});
}

function populateLoanIdDropdown() {
	$.ajax({
		url: "api/loanmanegment/getStatementLoanId",
		type: "GET",
		dataType: "json",
		success: function(response) {
			if (response.status === "OK" && Array.isArray(response.data)) {
				const $dropdown = $("#loanid");
				$dropdown.empty();
				$dropdown.append('<option value="" disabled selected>SELECT LOAN ID</option>');

				response.data.forEach(function(id) {
					$dropdown.append(`<option value="${id}">${id}</option>`);
				});
			} else {
				console.warn("NO LOAN IDS FOUND IN RESPONSE.");
			}
		},
		error: function(xhr, status, error) {
			console.error("ERROR FETCHING LOAN IDS:", error);
		}
	});
}

function formatInr(val) {
	const num = Number(val) || 0;
	return '₹ ' + num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function initSearchHandler() {
	$("#searchLoanStatement").click(function(e) {
		e.preventDefault();

		let loanId = $("#loanid").val();
		if (!loanId || !loanId.trim()) {
			alert("PLEASE SELECT A LOAN ID FIRST.");
			return;
		}

		loanId = loanId.trim();

		$("#statementArea").html(`
            <div class="text-center p-5">
                <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                    <span class="visually-hidden">LOADING...</span>
                </div>
                <p class="mt-3 text-muted fw-semibold">FETCHING STATEMENT FOR ${loanId}...</p>
            </div>
        `);

		// Fetch statement
		$.ajax({
			url: "api/loans/statement/regular?loanCode=" + encodeURIComponent(loanId),
			method: "GET",
			dataType: "json",
			success: function(statement) {
				renderIrregularLoanStatement(statement);
			},
			error: function(xhr) {
				// Fallback to fetchLoanPaymentsByLoanId and getLoanById
				fallbackStatementFetch(loanId);
			}
		});
	});
}

function fallbackStatementFetch(loanId) {
	$.ajax({
		url: "api/loanmanegment/getLoanById",
		type: "GET",
		data: { loanId: loanId },
		dataType: "json",
		success: function(res) {
			if (res && res.data) {
				const loan = res.data;
				$.ajax({
					url: "api/loanmanegment/fetchLoanPaymentsByLoanId",
					type: "GET",
					data: { loanId: loanId },
					dataType: "json",
					success: function(payRes) {
						const payments = (payRes && Array.isArray(payRes.data)) ? payRes.data : [];
						buildAndRenderFallback(loan, payments);
					},
					error: function() {
						buildAndRenderFallback(loan, []);
					}
				});
			} else {
				showStatementError("NO LOAN FOUND FOR ID: " + loanId);
			}
		},
		error: function(err) {
			showStatementError("UNABLE TO LOAD STATEMENT FOR LOAN ID: " + loanId);
		}
	});
}

function showStatementError(msg) {
	$("#statementArea").html(`
        <div class="alert alert-danger m-3 p-4 shadow-sm" role="alert" style="border-radius: 8px;">
            <h5 class="alert-heading fw-bold mb-2">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>UNABLE TO LOAD STATEMENT
            </h5>
            <p class="mb-0 fs-6">${msg.toUpperCase()}</p>
        </div>
    `);
}

function buildAndRenderFallback(loan, payments) {
	const sanctioned = parseFloat(loan.sanctionedAmount || loan.loanAmount) || 0;
	const emi = parseFloat(loan.emiPayment) || 0;
	let totalPaid = 0;

	const rows = payments.map(function(p, idx) {
		const amt = parseFloat(p.paymentAmount) || 0;
		totalPaid += amt;
		return {
			installmentNumber: idx + 1,
			dueDate: p.dueDate || p.loanDate || "-",
			paidDate: p.paymentDate || "-",
			paymentMode: (p.paymentMode || "CASH").toUpperCase(),
			emiAmount: amt,
			principalComponent: amt * 0.7,
			interestComponent: amt * 0.3,
			penaltyAmount: parseFloat(p.charges || p.fine || 0),
			status: "PAID",
			runningBalance: Math.max(0, sanctioned - totalPaid)
		};
	});

	const statement = {
		loanSummary: {
			loanCode: loan.loanId,
			customerName: loan.memberName || "-",
			startDate: loan.loanDate || "-",
			interestRate: loan.rateOfInterest || "0",
			principalAmount: sanctioned,
			tenureMonths: loan.loanTerm || "0",
			emiAmount: emi,
			outstandingPrincipal: Math.max(0, sanctioned - totalPaid)
		},
		totals: {
			totalPaid: totalPaid,
			totalInterestPaid: totalPaid * 0.3,
			totalPenaltyPaid: 0,
			currentOutstanding: Math.max(0, sanctioned - totalPaid)
		},
		statementRows: rows
	};

	renderIrregularLoanStatement(statement);
}

function renderIrregularLoanStatement(data) {
	if (!data || !data.loanSummary) {
		$("#statementArea").html("<div class='alert alert-warning m-3'>NO STATEMENT DATA AVAILABLE FOR THIS LOAN ID.</div>");
		return;
	}

	const s = data.loanSummary;
	const t = data.totals || {};
	const rows = data.statementRows || [];

	let html = `
        <div class="p-4" style="background:#fff; border-radius:10px;">
            <!-- Header -->
            <div class="d-flex justify-content-between align-items-center pb-3 border-bottom mb-4">
                <div>
                    <h4 class="mb-0 fw-bold text-primary">IRREGULAR LOAN STATEMENT</h4>
                    <small class="text-muted">LOAN ACCOUNT TRANSACTION &amp; LEDGER SCHEDULE</small>
                </div>
                <button type="button" onclick="printIrregularStatement()" class="btn btn-outline-primary shadow-sm px-3 fw-bold">
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
                            <strong class="fs-6 text-dark">${s.interestRate}% P.A.</strong>
                        </div>
                        <div class="col-md-3 col-sm-6">
                            <span class="text-muted small d-block">PRINCIPAL SANCTIONED</span>
                            <strong class="fs-6 text-primary">${formatInr(s.principalAmount)}</strong>
                        </div>
                        <div class="col-md-3 col-sm-6">
                            <span class="text-muted small d-block">TENURE</span>
                            <strong class="fs-6 text-dark">${s.tenureMonths} MONTHS</strong>
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
                            <th>DUE DATE</th>
                            <th class="text-end">EMI (₹)</th>
                            <th class="text-end">PRINCIPAL (₹)</th>
                            <th class="text-end">INTEREST (₹)</th>
                            <th class="text-end">PENALTY (₹)</th>
                            <th class="text-center">PAID DATE</th>
                            <th class="text-center">STATUS</th>
                            <th class="text-end">RUNNING BALANCE (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

	if (rows.length === 0) {
		html += `<tr><td colspan="9" class="text-center py-4 text-muted">NO INSTALLMENT SCHEDULE OR PAYMENT RECORD FOUND.</td></tr>`;
	} else {
		rows.forEach(function(r) {
			let statusBadge = '<span class="badge bg-secondary">PENDING</span>';
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

	$("#statementArea").html(html);
}

function printIrregularStatement() {
	const printContents = document.getElementById("statementArea").innerHTML;
	const win = window.open('', '', 'height=750,width=950');
	const compName = (irregularCompanyDetails && irregularCompanyDetails.companyName ? irregularCompanyDetails.companyName : "CO OPERATIVE SOCIETY LTD NAGPUR").trim().toUpperCase();
	const compAddress = (irregularCompanyDetails && irregularCompanyDetails.address ? irregularCompanyDetails.address : "").trim().toUpperCase();
	const compCin = (irregularCompanyDetails && irregularCompanyDetails.cinNo ? "CIN: " + irregularCompanyDetails.cinNo : "").trim().toUpperCase();
	const compPhone = (irregularCompanyDetails && irregularCompanyDetails.helplineNo ? "HELPLINE: " + irregularCompanyDetails.helplineNo : "").trim().toUpperCase();

	win.document.write(`
        <html>
        <head>
            <title>IRREGULAR LOAN STATEMENT</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body { font-family: Arial, sans-serif; padding: 25px; color: #111; }
                button { display: none !important; }
                .table th, .table td { padding: 6px 10px; font-size: 12px; }
                .badge { border: 1px solid #666; color: #000 !important; background: transparent !important; }
                @media print {
                    button { display: none !important; }
                }
            </style>
        </head>
        <body>
            <div class="text-center mb-3">
                <h3 class="fw-bold m-0 text-primary">${compName}</h3>
                ${compAddress ? `<p class="text-muted small mb-0">${compAddress}</p>` : ''}
                ${(compCin || compPhone) ? `<small class="text-muted">${[compCin, compPhone].filter(Boolean).join(' | ')}</small>` : ''}
                <div class="mt-2"><span class="badge bg-secondary">LOAN REPAYMENT STATEMENT &amp; ACCOUNT LEDGER</span></div>
            </div>
            ${printContents}
        </body>
        </html>
    `);
	win.document.close();
	setTimeout(function() {
		win.print();
	}, 250);
}

