var companyDetails = null;

$(document).ready(function() {

	// Load dynamic company details
	$.ajax({
		url: 'api/preference/getCompanyDetails',
		type: 'GET',
		success: function(response) {
			if (response && response.data) {
				companyDetails = response.data;
			}
		},
		error: function(err) {
			console.warn("FAILED TO FETCH COMPANY DETAILS", err);
		}
	});

	$.ajax({
		url: 'api/securedGoldLoan/getAllGoldLoanCustomer',
		type: 'GET',
		success: function(response) {
			if (!(response && response.data && Array.isArray(response.data))) {
				alert("NO GOLD DATA FOUND.");
				return;
			}

			let distinctMap = new Map();
			response.data.forEach(function(item) {
				let goldId = item.goldID || item.goldId;
				if (goldId && goldId.trim() !== "") {
					distinctMap.set(goldId.trim(), item.customerName);
				}
			});

			let customerOptions = [];
			distinctMap.forEach((customerName, goldId) => {
				customerOptions.push({
					id: goldId,
					text: (goldId + " - " + customerName).toUpperCase()
				});
			});

			$('#findByGoldLoanId').select2({
				placeholder: '-- SEARCH GOLD ID OR NAME --',
				data: customerOptions,
				matcher: function(params, data) {
					if ($.trim(params.term) === '') return data;
					if (typeof data.text === 'undefined') return null;

					const term = params.term.toLowerCase();
					const text = data.text.toLowerCase();
					return text.includes(term) ? data : null;
				}
			});
		},
		error: function(xhr, status, error) {
			console.error("ERROR FETCHING GOLD DATA:", error);
			alert("FAILED TO LOAD GOLD ID.");
		}
	});

	$("#searchGoldStatement").click(function(e) {
		e.preventDefault();

		var goldId = $("#findByGoldLoanId").val();
		if (!goldId || !goldId.trim()) {
			alert("PLEASE ENTER A GOLD ID");
			return;
		}
		goldId = goldId.trim();

		$.ajax({
			url: "api/securedGoldLoan/getGoldPaymentByGoldId?goldID=" + encodeURIComponent(goldId),
			method: "GET",
			success: function(response) {
				console.log("Response:", response);

				if (response.data && response.data.length > 0) {
					var first = response.data[0];

					var compName = (companyDetails && companyDetails.companyName) ? companyDetails.companyName.toUpperCase() : "MICROFINANCE FINANCIAL SERVICES";
					var compAddr = (companyDetails && companyDetails.address) ? companyDetails.address.toUpperCase() : "";
					var compCin = (companyDetails && companyDetails.cinNo) ? companyDetails.cinNo.toUpperCase() : "-";
					var compPhone = (companyDetails && companyDetails.helplineNo) ? companyDetails.helplineNo : "-";
					var compEmail = (companyDetails && companyDetails.emailId) ? companyDetails.emailId.toUpperCase() : "-";

					var detailsHtml = `
	    <div style="border:1px dashed #333; padding:20px; border-radius:10px; background:#fff;">
	        <!-- Dynamic Company Header -->
	        <div style="text-align:center; border-bottom:2px solid #222; padding-bottom:10px; margin-bottom:15px;">
	            <h3 style="margin:0; font-size:20px; font-weight:bold; letter-spacing:1px; color:#1a237e;">${compName}</h3>
	            <div style="font-size:12px; margin-top:3px; color:#333;">${compAddr}</div>
	            <div style="font-size:11px; margin-top:2px; color:#555;">CIN: ${compCin} | HELPLINE: ${compPhone} | EMAIL: ${compEmail}</div>
	        </div>

	        <!-- Header with Loan Statement + Print Button -->
	        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
	            <h4 style="margin:0; font-weight:bold; color:#333;">SECURED GOLD LOAN STATEMENT</h4>
	            <button type="button" onclick="loanStatement()" class="no-print"
	                style="padding:6px 14px; border:none; background:#007bff; color:#fff; border-radius:6px; cursor:pointer; font-weight:bold;">
	                PRINT STATEMENT
	            </button>
	        </div>

	        <!-- Customer Name and Loan Type in same row -->
	        <div style="display:flex; justify-content:space-between; margin-top:10px; font-size:13px;">
	            <p style="margin:0;"><b>CUSTOMER NAME:</b> ${(first.customerName || '').toUpperCase()}</p>
	            <p style="margin:0;"><b>INTEREST TYPE:</b> ${(first.interestType || '').toUpperCase()}</p>
	        </div>

	        <div style="display:flex; justify-content:space-between; margin-top:8px; font-size:13px;">
	           <p style="margin:0;"><b>GOLD ID:</b> ${(first.goldID || '').toUpperCase()}</p>
	           <p style="margin:0;"><b>PLAN NAME:</b> ${(first.loanPlanName || '').toUpperCase()}</p>
	        </div>
	        <hr style="margin:12px 0; border:0; border-top:1px solid #ccc;"/>

	        <h5 style="margin:10px 0; font-weight:bold;">TRANSACTION HISTORY</h5>
	        <div style="display:grid; grid-template-columns: 1.2fr 1.5fr 1fr 1fr 1fr; font-weight:bold; border-bottom:2px solid #000; padding:8px 0; font-size:12px; background:#f8f9fa;">
	            <div>PAYMENT DATE</div>
				<div>INSTALLMENT / REMARKS</div>
	            <div>AMOUNT PAID (RS.)</div>
	            <div>AMOUNT DUE (RS.)</div>
	            <div>PAYMENT STATUS</div>
	        </div>
	        `;

					// Add data rows
					response.data.forEach(function(txn) {
						var dateStr = (txn.paymentDate || '-').toUpperCase();
						var remarksStr = (txn.remarks || '-').toUpperCase();
						var paidStr = txn.emiPayment !== undefined && txn.emiPayment !== null ? Number(txn.emiPayment).toFixed(2) : '0.00';
						var dueStr = txn.amountDue !== undefined && txn.amountDue !== null ? Number(txn.amountDue).toFixed(2) : '0.00';
						var statusStr = (txn.paymentStatus || 'PAID').toUpperCase();

						detailsHtml += `
	        <div style="display:grid; grid-template-columns: 1.2fr 1.5fr 1fr 1fr 1fr; border-bottom:1px solid #e0e0e0; padding:8px 0; font-size:12px;">
	            <div>${dateStr}</div>
	            <div>${remarksStr}</div>
	            <div>${paidStr}</div>
	            <div>${dueStr}</div>
	            <div><span style="font-weight:bold; color:${statusStr === 'PAID' ? 'green' : 'red'};">${statusStr}</span></div>
	        </div>
	    `;
					});

					detailsHtml += `
	        <div style="margin-top:25px; padding-top:10px; border-top:1px dashed #aaa; display:flex; justify-content:space-between; font-size:11px; color:#555;">
	            <div>GENERATED ON: ${new Date().toLocaleString().toUpperCase()}</div>
	            <div>THIS IS A COMPUTER GENERATED STATEMENT AND DOES NOT REQUIRE A PHYSICAL SIGNATURE</div>
	        </div>
	    </div>`;
					$(".recent-sales").html(detailsHtml);

				} else {
					$(".recent-sales").html("<div class='alert alert-warning text-center font-weight-bold'>NO TRANSACTION DATA FOUND FOR THIS GOLD LOAN ID</div>");
				}
			},
			error: function(xhr, status, error) {
				$(".recent-sales").html("<div class='alert alert-danger text-center font-weight-bold'>ERROR FETCHING STATEMENT DATA</div>");
			}
		});
	});

});

function loanStatement() {
	var printContents = document.getElementById("receiptArea").innerHTML;
	var printWindow = window.open('', '', 'height=750,width=950');
	printWindow.document.write('<!DOCTYPE html><html><head><title>SECURED GOLD LOAN STATEMENT</title>');
	printWindow.document.write('<style>@media print { .no-print { display: none !important; } } body { font-family: Arial, sans-serif; padding: 20px; }</style>');
	printWindow.document.write('</head><body>');
	printWindow.document.write(printContents);
	printWindow.document.write('</body></html>');
	printWindow.document.close();
	printWindow.focus();
	setTimeout(function() {
		printWindow.print();
	}, 500);
}
