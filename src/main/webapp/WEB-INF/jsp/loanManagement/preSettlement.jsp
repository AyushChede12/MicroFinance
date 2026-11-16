<div class="pagetitle">
	<h1>LOAN MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-cash-coin"></i>
			</a></li>
			<li class="breadcrumb-item action">PRE-SETTLEMENT &amp; FORECLOSURE QUOTATION</li>
		</ol>
	</nav>
</div>

<div>
	<form id="preSettlementForm">
		<div class="card p-4 border shadow-sm" style="border-radius: 8px;">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH ACTIVE LOAN ACCOUNT</li>
				</ol>
			</nav>
			<div class="row align-items-end">
				<div class="col-lg-4 col-md-6">
					<div class="d-flex flex-column formFields mb-3">
						<label for="preSettlementLoanId">SELECT ACTIVE LOAN ID <span style="color:red">*</span></label>
						<select id="preSettlementLoanId" name="preSettlementLoanId" required="required"
							class="form-control selectField" style="height: 35px;">
							<option value="">SELECT ACTIVE LOAN ID</option>
						</select>
					</div>
				</div>
				<div class="col-lg-3 col-md-6 mb-3">
					<button type="button" id="calcPreSettlementBtn" class="btnStyle bg-primary w-100 py-2 fw-bold">
						<i class="bi bi-calculator me-1"></i> CALCULATE PRE-SETTLEMENT
					</button>
				</div>
			</div>
		</div>
	</form>

	<div class="row mt-4" id="preSettlementResultsArea" style="display: none;">
		<div class="col-12">
			<div class="card p-4 border shadow-sm" style="background:#fff; border-radius:10px;">
				<div class="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
					<div>
						<h4 class="mb-0 fw-bold text-primary">PRE-SETTLEMENT FORECLOSURE QUOTATION</h4>
						<small class="text-muted">BANKING EARLY CLOSURE QUOTE &amp; LIABILITIES ASSESSMENT</small>
					</div>
					<div>
						<button type="button" id="printQuoteBtn" class="btn btn-outline-primary shadow-sm fw-bold px-3">
							<i class="bi bi-printer me-1"></i> PRINT QUOTATION
						</button>
						<a href="${baseUrl}/earlyLoanClosureLoan" class="btn btn-warning shadow-sm fw-bold px-3 ms-2">
							<i class="bi bi-box-arrow-up-right me-1"></i> PROCEED TO FORECLOSURE
						</a>
					</div>
				</div>

				<div class="row g-3 mb-4 p-3 rounded" style="background: #f8fafc; border: 1px solid #e2e8f0;">
					<div class="col-md-3 col-sm-6">
						<span class="text-muted small d-block">LOAN CODE / ID</span>
						<strong class="fs-6" id="quoteLoanCode">-</strong>
					</div>
					<div class="col-md-3 col-sm-6">
						<span class="text-muted small d-block">CUSTOMER NAME</span>
						<strong class="fs-6" id="quoteCustomerName">-</strong>
					</div>
					<div class="col-md-3 col-sm-6">
						<span class="text-muted small d-block">SANCTION DATE</span>
						<strong class="fs-6" id="quoteLoanDate">-</strong>
					</div>
					<div class="col-md-3 col-sm-6">
						<span class="text-muted small d-block">INTEREST RATE</span>
						<strong class="fs-6" id="quoteRoi">-</strong>
					</div>
				</div>

				<div class="table-responsive">
					<table class="table table-bordered table-hover align-middle mb-0" style="font-size: 0.95rem;">
						<thead class="table-light text-uppercase fw-semibold">
							<tr>
								<th>SETTLEMENT COMPONENT</th>
								<th class="text-end" style="width: 250px;">AMOUNT (&#8377;)</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>PRINCIPAL OUTSTANDING SETTLED</td>
								<td class="text-end fw-bold" id="quotePrincipal">&#8377; 0.00</td>
							</tr>
							<tr>
								<td>ACCRUED INTEREST TILL CLOSURE DATE</td>
								<td class="text-end" id="quoteInterest">&#8377; 0.00</td>
							</tr>
							<tr>
								<td>OVERDUE ARREARS / PENALTY CHARGES</td>
								<td class="text-end text-danger" id="quotePenalties">&#8377; 0.00</td>
							</tr>
							<tr>
								<td>FORECLOSURE CHARGES (EARLY SETTLEMENT FEE)</td>
								<td class="text-end" id="quoteFee">&#8377; 0.00</td>
							</tr>
							<tr>
								<td>LESS: CONCESSION / WAIVER APPLIED</td>
								<td class="text-end text-success" id="quoteWaiver">- &#8377; 0.00</td>
							</tr>
							<tr class="table-secondary fw-bold fs-6">
								<td>TOTAL NET PAYABLE TO CLOSE LOAN ACCOUNT</td>
								<td class="text-end text-primary" id="quoteNetPayable">&#8377; 0.00</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="mt-4 p-3 bg-light rounded text-muted small border">
					<i class="bi bi-info-circle me-1"></i> NOTE: THIS PRE-SETTLEMENT QUOTATION IS VALID FOR TODAY ONLY. SETTLEMENT INTEREST MAY ACCRUE DAILY UNTIL FINAL DISCHARGE.
				</div>
			</div>
		</div>
	</div>
</div>

<script>
let preSettlementCompanyInfo = null;

$(document).ready(function() {
	loadPreSettlementCompanyInfo();
	populateActiveLoanIds();
	bindPreSettlementEvents();
});

function loadPreSettlementCompanyInfo() {
	$.ajax({
		url: "api/preference/getCompanyDetails",
		type: "GET",
		dataType: "json",
		success: function(res) {
			preSettlementCompanyInfo = res.data || res;
		}
	});
}

function populateActiveLoanIds() {
	$.ajax({
		url: "api/loanmanegment/getApprovedLoanIds",
		type: "GET",
		dataType: "json",
		success: function(res) {
			const $dd = $("#preSettlementLoanId");
			$dd.empty().append('<option value="" disabled selected>SELECT ACTIVE LOAN ID</option>');
			if (res && res.status === "OK" && Array.isArray(res.data)) {
				res.data.forEach(function(id) {
					$dd.append(`<option value="${id}">${id}</option>`);
				});
			}
		}
	});
}

function bindPreSettlementEvents() {
	$("#calcPreSettlementBtn").on("click", function(e) {
		e.preventDefault();
		const loanId = $("#preSettlementLoanId").val();
		if (!loanId) {
			alert("PLEASE SELECT AN ACTIVE LOAN ID FIRST.");
			return;
		}

		$("#calcPreSettlementBtn").prop("disabled", true).text("CALCULATING...");

		$.ajax({
			url: "api/loanmanegment/calculateForeclosure?loanId=" + encodeURIComponent(loanId),
			type: "GET",
			dataType: "json",
			success: function(response) {
				$("#calcPreSettlementBtn").prop("disabled", false).html('<i class="bi bi-calculator me-1"></i> CALCULATE PRE-SETTLEMENT');
				if (response && response.status === "OK" && response.data) {
					renderPreSettlementQuote(response.data);
				} else {
					alert("FAILED TO CALCULATE PRE-SETTLEMENT: " + (response.message || "UNKNOWN ERROR").toUpperCase());
				}
			},
			error: function(xhr) {
				$("#calcPreSettlementBtn").prop("disabled", false).html('<i class="bi bi-calculator me-1"></i> CALCULATE PRE-SETTLEMENT');
				alert("ERROR CALCULATING PRE-SETTLEMENT: " + (xhr.responseJSON?.message || xhr.statusText || "SERVER ERROR").toUpperCase());
			}
		});
	});

	$("#printQuoteBtn").on("click", function() {
		const content = document.getElementById("preSettlementResultsArea").innerHTML;
		const win = window.open('', '', 'height=700,width=900');
		win.document.write(`
			<html>
			<head>
				<title>PRE-SETTLEMENT FORECLOSURE QUOTATION</title>
				<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
				<style>
					body { font-family: Arial, sans-serif; padding: 30px; color: #111; }
					button, a { display: none !important; }
					.table th, .table td { padding: 8px 12px; }
				</style>
			</head>
			<body>
				<div class="text-center mb-4">
					<h3 class="fw-bold m-0" style="color:#0d6efd;">${((preSettlementCompanyInfo && preSettlementCompanyInfo.companyName) ? preSettlementCompanyInfo.companyName : "CO OPERATIVE SOCIETY LTD NAGPUR").trim().toUpperCase()}</h3>
					<p style="margin:0; font-size:12px; color:#555;">${(preSettlementCompanyInfo ? [preSettlementCompanyInfo.address, preSettlementCompanyInfo.city, preSettlementCompanyInfo.state, preSettlementCompanyInfo.pinCode ? ("- " + preSettlementCompanyInfo.pinCode) : ""].filter(Boolean).join(", ") : "").toUpperCase()}</p>
					<small class="text-muted fw-bold">PRE-SETTLEMENT FORECLOSURE QUOTATION</small>
				</div>
				${content}
			</body>
			</html>
		`);
		win.document.close();
		setTimeout(function() { win.print(); }, 250);
	});
}

function fmtCurrency(val) {
	const n = Number(val) || 0;
	return '₹ ' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function renderPreSettlementQuote(d) {
	$("#quoteLoanCode").text(d.loanId || "-");
	$("#quoteCustomerName").text((d.customerName || "-").toUpperCase());
	$("#quoteLoanDate").text(d.loanDate || "-");
	$("#quoteRoi").text((d.annualInterestRate || "0") + "% P.A.");

	$("#quotePrincipal").text(fmtCurrency(d.principalOutstanding));
	$("#quoteInterest").text(fmtCurrency(d.accruedInterestTillDate));
	$("#quotePenalties").text(fmtCurrency(d.overdueFinesCharges));
	$("#quoteFee").text(fmtCurrency(d.foreclosureFeeAmount));
	$("#quoteWaiver").text("- " + fmtCurrency(d.waiverRebateAmount));
	$("#quoteNetPayable").text(fmtCurrency(d.netPayoffAmount));

	$("#preSettlementResultsArea").slideDown();
}
</script>

