// GOLD LOAN NOC GENERATION HANDLER
// BANKING STANDARD IMPLEMENTATION - ALL TEXT & ALERTS IN UPPERCASE
// DYNAMIC COMPANY HEADINGS FROM CompanyAdministration

let goldNocCompanyDetails = null;

$(document).ready(function() {
	loadCompanyDetails();
	loadGoldClosureDropdown();
	bindNocEvents();
});

function loadCompanyDetails() {
	$.ajax({
		url: "api/preference/getCompanyDetails",
		type: "GET",
		dataType: "json",
		success: function(resp) {
			if (resp && resp.status === "OK" && resp.data) {
				goldNocCompanyDetails = resp.data;
			} else if (resp && resp.companyName) {
				goldNocCompanyDetails = resp;
			}
		},
		error: function(err) {
			console.warn("COULD NOT LOAD COMPANY DETAILS", err);
		}
	});
}

function loadGoldClosureDropdown() {
	$.ajax({
		url: "api/securedGoldLoan/getAllGoldClosure",
		type: "GET",
		success: function(response) {
			if (!(response && response.data && Array.isArray(response.data))) {
				alert("NO GOLD CLOSURE DATA FOUND.");
				return;
			}

			let distinctMap = new Map();
			response.data.forEach(function(item) {
				let goldId = item.goldID || item.goldId;
				if (goldId && goldId.trim() !== "") {
					distinctMap.set(goldId.trim(), (item.customerName || "-").toUpperCase());
				}
			});

			let goldOptions = [];
			distinctMap.forEach((customerName, goldId) => {
				goldOptions.push({
					id: goldId,
					text: goldId + " - " + customerName
				});
			});

			$("#findByGoldLoanId").select2({
				placeholder: "-- SEARCH GOLD ID --",
				data: goldOptions,
				matcher: function(params, data) {
					if ($.trim(params.term) === "") return data;
					if (typeof data.text === "undefined") return null;
					const term = params.term.toLowerCase();
					const text = data.text.toLowerCase();
					return text.includes(term) ? data : null;
				}
			});
		},
		error: function(xhr, status, error) {
			console.error("Error fetching Gold Data:", error);
			alert("FAILED TO LOAD GOLD CLOSURE ID.");
		}
	});
}

function bindNocEvents() {
	$("#generateNoc").click(function(e) {
		e.preventDefault();

		const goldId = $("#findByGoldLoanId").val();
		if (!goldId) {
			alert("PLEASE SELECT A GOLD ID");
			return;
		}

		$.ajax({
			url: "api/securedGoldLoan/getGoldClosuresByGoldId",
			method: "GET",
			data: { goldID: goldId },
			success: function(result) {
				if (result && result.data && result.data.length > 0) {
					const goldData = result.data[0];

					const c = goldNocCompanyDetails || {};
					const companyName = (c.companyName ? c.companyName : "CO OPERATIVE SOCIETY LTD NAGPUR").trim().toUpperCase();
					const address = (c.address ? c.address : "ADMINISTRATIVE HEAD OFFICE").trim().toUpperCase();
					const cin = (c.cinNo ? "CIN: " + c.cinNo : "").trim().toUpperCase();
					const helpline = (c.helplineNo ? "HELPLINE: " + c.helplineNo : "").trim().toUpperCase();
					const email = (c.emailId ? "EMAIL: " + c.emailId : "").trim().toUpperCase();
					const metaSub = [cin, helpline, email].filter(Boolean).join(" | ");

					let content = `
			<div style="padding:35px; font-family:'Times New Roman', serif; border:2px solid #111; background:#fff; line-height:1.7;">
				<!-- Dynamic Letterhead -->
				<div style="text-align:center; border-bottom:2px solid #0d6efd; padding-bottom:12px; margin-bottom:20px;">
					<h2 style="margin:0; font-size:22px; font-weight:bold; color:#0d6efd; letter-spacing:0.5px;">${companyName}</h2>
					<p style="margin:4px 0 2px 0; font-size:12px; color:#555;">${address}</p>
					${metaSub ? `<p style="margin:0; font-size:11px; color:#666;">${metaSub}</p>` : ""}
					<h4 style="margin:6px 0 0 0; font-size:13px; font-weight:600; color:#333;">BRANCH: ${(goldData.branchName || "HEAD OFFICE").toUpperCase()}</h4>
				</div>

				<h3 style="text-align:center; margin:18px 0; text-decoration:underline; font-size:18px; font-weight:bold; letter-spacing:0.5px;">NO OBJECTION CERTIFICATE (NOC) / LOAN CLEARANCE</h3>

				<div style="display:flex; justify-content:space-between; margin-bottom:15px; font-size:13px;">
					<div><b>REF NO:</b> NOC-${goldData.goldID || goldId}</div>
					<div><b>DATE:</b> ${goldData.paymentDate || new Date().toISOString().split("T")[0]}</div>
				</div>

				<p style="font-size:14px;">TO,<br>
				   <b>${(goldData.customerName || "-").toUpperCase()}</b><br>
				   CUSTOMER CODE: <b>${(goldData.customerCode || "-").toUpperCase()}</b><br>
				   CONTACT NUMBER: <b>${goldData.contactNo || "-"}</b>
				</p>

				<p style="font-size:14px; margin-top:15px;"><b>SUBJECT: NO OBJECTION CERTIFICATE FOR GOLD LOAN CLOSURE &amp; RETURN OF PLEDGED SECURITY</b></p>

				<p style="font-size:13.5px; text-align:justify;">DEAR <b>${(goldData.customerName || "-").toUpperCase()}</b>,</p>

				<p style="font-size:13.5px; text-align:justify;">THIS IS TO CERTIFY THAT YOU AVAILED A SECURED GOLD LOAN FACILITY FROM 
				<b>${companyName}</b> UNDER LOAN ACCOUNT REFERENCE <b>${goldData.goldID || goldId}</b> (PLAN: <b>${(goldData.loanPlanName || "GOLD LOAN").toUpperCase()}</b>), 
				COMMENCED ON <b>${goldData.dateOfLoan || "-"}</b> FOR A PRINCIPAL SANCTIONED AMOUNT OF <b>₹ ${Number(goldData.loanAmount || 0).toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2})}</b>.
				</p>

				<p style="font-size:13.5px; text-align:justify;">YOU HAVE SATISFACTORILY REPAID THE ENTIRE OUTSTANDING LOAN BALANCE ALONG WITH ALL APPLICABLE INTEREST, CHARGES, AND LIABILITIES IN FULL. 
				ACCORDINGLY, YOUR GOLD LOAN ACCOUNT STANDS <b>SUCCESSFULLY CLOSED &amp; LIQUIDATED</b> ON <b>${goldData.paymentDate || "-"}</b>. 
				AS ON DATE, THERE ARE <b>NIL OUTSTANDING DUES</b> PAYABLE TOWARDS THE AFORESAID LOAN ACCOUNT IN THE RECORDS OF <b>${companyName}</b>.
				</p>

				<p style="font-size:13.5px; text-align:justify;">
				WE HEREBY ISSUE THIS <b>NO OBJECTION CERTIFICATE (NOC)</b> DECLARING THAT 
				<b>${(goldData.customerName || "-").toUpperCase()}</b> IS FULLY RELEASED AND DISCHARGED FROM ALL LIABILITIES AND COVENANTS 
				ASSOCIATED WITH THE ABOVE-MENTIONED SECURED GOLD LOAN. ALL PLEDGED GOLD/SILVER ARTICLES HELD AS COLLATERAL ARE DULY RELEASED.
				</p>

				<p style="margin-top:20px; font-size:13px;">
				THANK YOU FOR CHOOSING <b>${companyName}</b>. WE LOOK FORWARD TO SERVING YOU IN THE FUTURE.
				</p>

				<table style="width:100%; margin-top:50px; border:none;">
					<tr>
						<td style="width:50%; text-align:left; vertical-align:bottom; border:none; font-size:13px;">
							____________________________<br>
							<b>BORROWER ACKNOWLEDGMENT</b><br>
							<small>(ARTICLES RECEIVED IN TACT)</small>
						</td>
						<td style="width:50%; text-align:right; vertical-align:bottom; border:none; font-size:13px;">
							FOR <b>${companyName}</b><br><br><br>
							____________________________<br>
							<b>AUTHORIZED SIGNATORY / BRANCH MANAGER</b>
						</td>
					</tr>
				</table>
			</div>
			`;

					$("#receiptArea").html(content);
					$("#printBtn").show();

				} else {
					alert("NO CLOSURE DATA FOUND FOR THIS GOLD LOAN ID.");
				}
			},
			error: function(err) {
				console.error(err);
				alert("ERROR FETCHING GOLD CLOSURE DATA.");
			}
		});
	});
}

function printDocument() {
	const content = document.getElementById("receiptArea").innerHTML;
	const win = window.open("", "", "height=750,width=950");
	win.document.write(`
        <html>
        <head>
            <title>GOLD LOAN NOC CERTIFICATE</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body { font-family: 'Times New Roman', serif; padding: 25px; color: #111; }
                button { display: none !important; }
                @media print {
                    button { display: none !important; }
                }
            </style>
        </head>
        <body>
            ${content}
        </body>
        </html>
    `);
	win.document.close();
	setTimeout(function() {
		win.print();
	}, 250);
}
