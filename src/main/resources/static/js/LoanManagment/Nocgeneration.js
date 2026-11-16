// =========================================================================
// NOC CERTIFICATE GENERATION HANDLER
// DYNAMIC HEADINGS & COMPANY DETAILS FROM api/preference/getCompanyDetails
// (CompanyAdministration Entity Class)
// STRICTLY ALL MESSAGES & DISPLAY IN UPPERCASE
// =========================================================================

let globalCompanyDetails = null;

$(document).ready(function() {
	loadCompanyDetails();
	populateDropdown();
	bindNocEvents();
});

function loadCompanyDetails(callback) {
	$.ajax({
		url: "api/preference/getCompanyDetails",
		type: "GET",
		dataType: "json",
		success: function(response) {
			globalCompanyDetails = response.data || response;
			if (callback && typeof callback === "function") {
				callback(globalCompanyDetails);
			}
		},
		error: function(xhr) {
			console.warn("COULD NOT FETCH COMPANY DETAILS, USING FALLBACK:", xhr.statusText);
			if (callback && typeof callback === "function") {
				callback(null);
			}
		}
	});
}

function getCompanyHeaderInfo() {
	const c = globalCompanyDetails;
	const name = ((c && c.companyName) ? c.companyName : "CO OPERATIVE SOCIETY LTD NAGPUR").trim().toUpperCase();
	let addrParts = [];
	if (c && c.address) addrParts.push(c.address);
	if (c && c.city) addrParts.push(c.city);
	if (c && c.state) addrParts.push(c.state);
	if (c && c.pinCode) addrParts.push("- " + c.pinCode);

	const address = addrParts.join(", ").toUpperCase();
	const cin = (c && c.cinNo) ? ("CIN: " + c.cinNo.toUpperCase()) : "";
	const pan = (c && c.pan) ? ("PAN: " + c.pan.toUpperCase()) : "";
	const contact = (c && c.helplineNo) ? ("HELPLINE: " + c.helplineNo) : "";
	const email = (c && c.emailId) ? ("EMAIL: " + c.emailId.toUpperCase()) : "";

	return {
		name: name,
		address: address,
		cin: cin,
		pan: pan,
		contact: contact,
		email: email
	};
}

function populateDropdown() {
	$.ajax({
		url: "api/loanmanegment/getClosedLoanIds",
		type: "GET",
		dataType: "json",
		success: function(response) {
			const $dropdown = $("#closedLoanIds");
			$dropdown.empty();

			if (response.status === "OK" && Array.isArray(response.data) && response.data.length > 0) {
				$dropdown.append('<option value="" disabled selected>SELECT LOAN ID</option>');
				response.data.forEach(function(id) {
					$dropdown.append(`<option value="${id}">${id}</option>`);
				});
			} else {
				$dropdown.append('<option value="" disabled selected>NO CLOSED LOANS AVAILABLE</option>');
			}
		},
		error: function(xhr) {
			console.error("ERROR FETCHING CLOSED LOAN IDS:", xhr.statusText);
			const $dropdown = $("#closedLoanIds");
			$dropdown.empty();
			$dropdown.append('<option value="" disabled selected>ERROR LOADING LOAN IDS</option>');
		}
	});
}

function bindNocEvents() {
	$("#generateNoc").click(function(e) {
		e.preventDefault();

		const loanId = $("#closedLoanIds").val();
		if (!loanId) {
			alert("PLEASE SELECT A LOAN ID FIRST.");
			return;
		}

		if (!globalCompanyDetails) {
			loadCompanyDetails(function() {
				fetchLoanAndRenderNoc(loanId);
			});
		} else {
			fetchLoanAndRenderNoc(loanId);
		}
	});
}

function fetchLoanAndRenderNoc(loanId) {
	$.ajax({
		url: "api/loanmanegment/getLoanClosuresByLoanId",
		method: "GET",
		data: { loanId: loanId },
		success: function(result) {
			if (result && result.data && result.data.length > 0) {
				const loanData = result.data[0];
				const comp = getCompanyHeaderInfo();

				let metaLine = [];
				if (comp.cin) metaLine.push(comp.cin);
				if (comp.pan) metaLine.push(comp.pan);
				if (comp.contact) metaLine.push(comp.contact);
				if (comp.email) metaLine.push(comp.email);

				let content = `
				   <div style="padding:35px 30px; font-family:'Times New Roman', serif; border:2px solid #000; background:#fff; line-height:1.6; color:#000;">
				       <!-- Dynamic Company Letterhead from CompanyAdministration -->
				       <div style="text-align:center; border-bottom:2px solid #000; padding-bottom:12px; margin-bottom:18px;">
				           <h2 style="margin:0 0 4px 0; color:#0d6efd; font-weight:800; font-size:24px; letter-spacing:0.5px;">${comp.name}</h2>
				           ${comp.address ? `<p style="margin:0 0 3px 0; font-size:12px; font-weight:bold; color:#333;">${comp.address}</p>` : ''}
				           ${metaLine.length > 0 ? `<p style="margin:0; font-size:11px; color:#555;">${metaLine.join(' &nbsp;|&nbsp; ')}</p>` : ''}
				       </div>

				       <div style="display:flex; justify-content:space-between; margin-bottom:15px; font-size:13px;">
				           <span><b>BRANCH:</b> ${(loanData.branchName || "-").toUpperCase()}</span>
				           <span><b>DATE:</b> <b>${loanData.closureDate || new Date().toISOString().split('T')[0]}</b></span>
				       </div>

				       <h3 style="text-align:center; margin:15px 0 20px 0; text-decoration:underline; font-weight:bold; font-size:18px;">
				           NO OBJECTION CERTIFICATE (NOC)
				       </h3>

				       <p style="margin-bottom:15px; font-size:13px;">
				          <b>TO,</b><br>
				          <b>${(loanData.memberName || "-").toUpperCase()}</b><br>
				          ${(loanData.address || "-").toUpperCase()}<br>
				          <b>CONTACT NO:</b> ${loanData.contactNo || "-"}
				       </p>

				       <p style="font-size:13px; font-weight:bold; margin-bottom:15px;">
				           SUBJECT: NO OBJECTION CERTIFICATE FOR LOAN CLOSURE (LOAN REF: ${loanData.loanId})
				       </p>

				       <p style="font-size:13px; margin-bottom:12px;">DEAR <b>${(loanData.memberName || "-").toUpperCase()}</b>,</p>

				       <p style="text-align:justify; font-size:13px; margin-bottom:12px;">
				           THIS IS TO CERTIFY THAT YOU HAD AVAILED A LOAN FROM <b>${comp.name}</b> FOR THE LOAN PLAN <b>${(loanData.loanPlanName || "").toUpperCase()}</b>, 
				           UNDER LOAN REFERENCE NUMBER <b>${loanData.loanId}</b>, SANCTIONED ON <b>${loanData.loanDate || "-"}</b> 
				           FOR A PRINCIPAL AMOUNT OF <b>${loanData.loanAmount ? "₹ " + loanData.loanAmount : "-"}</b>.
				       </p>

				       <p style="text-align:justify; font-size:13px; margin-bottom:12px;">
				           WE HEREBY CONFIRM THAT YOU HAVE SUCCESSFULLY REPAID THE ENTIRE LOAN AMOUNT ALONG WITH ALL 
				           APPLICABLE INTEREST AND CHARGES. YOUR LOAN ACCOUNT HAS BEEN DULY CLOSED ON <b>${loanData.closureDate || "-"}</b>, 
				           AND AS OF THIS DATE, THERE ARE NO OUTSTANDING DUES PAYABLE UNDER THE SAID LOAN ACCOUNT.
				       </p>

				       <p style="text-align:justify; font-size:13px; margin-bottom:12px;">
				           ACCORDINGLY, WE HEREBY ISSUE THIS <b>NO OBJECTION CERTIFICATE (NOC)</b> TO DECLARE THAT 
				           <b>${(loanData.memberName || "-").toUpperCase()}</b> IS FULLY RELEASED AND DISCHARGED FROM ALL LIABILITIES AND OBLIGATIONS RELATED 
				           TO THE ABOVE-MENTIONED LOAN ACCOUNT. <b>${comp.name}</b> HAS NO OBJECTION IF YOU CHOOSE TO AVAIL FINANCIAL 
				           FACILITIES FROM ANY OTHER INSTITUTION IN THE FUTURE.
				       </p>

				       <p style="margin-bottom:40px; font-size:13px;">
				           WE THANK YOU FOR YOUR VALUED ASSOCIATION WITH <b>${comp.name}</b> AND LOOK FORWARD TO SERVING YOU AGAIN.
				       </p>

				       <div style="display:flex; justify-content:space-between; margin-top:50px; font-size:13px;">
				           <div>
				               <p style="margin:0;">__________________________</p>
				               <p style="margin:0; font-weight:bold;">BORROWER SIGNATURE</p>
				           </div>
				           <div style="text-align:right;">
				               <p style="margin:0;">__________________________</p>
				               <p style="margin:0; font-weight:bold;">AUTHORIZED SIGNATORY</p>
				               <p style="margin:0; font-weight:bold; color:#0d6efd;">${comp.name}</p>
				           </div>
				       </div>
				   </div>
				`;

				$("#receiptArea").html(content);
				document.getElementById("printBtn").style.display = "inline-block";
			} else {
				alert("NO DATA FOUND FOR THIS LOAN ID.");
			}
		},
		error: function(err) {
			console.error(err);
			alert("ERROR FETCHING LOAN DATA");
		}
	});
}

function printDocument() {
	var content = document.getElementById("receiptArea").innerHTML;
	var printWindow = window.open("", "", "height=750,width=950");
	printWindow.document.write("<html><head><title>NO OBJECTION CERTIFICATE (NOC)</title>");
	printWindow.document.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">');
	printWindow.document.write("<style>body { font-family: 'Times New Roman', serif; padding: 25px; color: #000; } button { display: none !important; } @media print { button { display: none !important; } }</style>");
	printWindow.document.write("</head><body>");
	printWindow.document.write(content);
	printWindow.document.write("</body></html>");
	printWindow.document.close();
	setTimeout(function() {
		printWindow.print();
	}, 250);
}
