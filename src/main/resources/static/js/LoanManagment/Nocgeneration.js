$(document).ready(function() {
	populateDropdown();
});

function populateDropdown() {
	$.ajax({
		url: "api/loanmanegment/getClosedLoanIds",
		type: "GET",
		dataType: "json",
		success: function(response) {
			console.log("Loan ID response:", response);

			const $dropdown = $("#closedLoanIds");
			$dropdown.empty(); // Clear previous entries

			if (response.status === "OK" && Array.isArray(response.data) && response.data.length > 0) {
				$dropdown.append('<option value="" disabled selected>SELECT LOAN ID</option>');
				response.data.forEach(function(id) {
					$dropdown.append(`<option value="${id}">${id}</option>`);
				});
			} else {
				$dropdown.append('<option value="" disabled selected>No closed loans available</option>');
				console.warn("No closed loan IDs found.");
			}
		},
		error: function(xhr, status, error) {
			console.error("Error fetching closed loan IDs:", error);
			const $dropdown = $("#closedLoanIds");
			$dropdown.empty();
			$dropdown.append('<option value="" disabled selected>Error loading loan IDs</option>');
		}
	});
}



/*
//js for generating the laon documents(Vaibhav)
$(document).ready(function() {
	$("#generateDoc").click(function(e) {
		e.preventDefault();
		const loanId = $("#loanId").val();       // get from input field
		const docType = $("#loanDocument").val(); // get from dropdown

		//alert(docType);

		if (!loanId) {
			alert("Please select a Loan ID");
			return;
		}

		$.ajax({
			method: "GET",
			data: { loanId: loanId }, // request param
			success: function(result) {
				if (result && result.data) {
					const loanData = result.data;
					let content = "";

			
					 if (docType === "sanctionLetter") {
						content = `
		<div style="padding:20px; font-family:Arial; border:2px solid #000; background:#f9f9f9;">
			<h2 style="text-align:center; margin:0;">Microfinance Cooperative Bank Ltd.</h2>
			<h4 style="text-align:center; margin:0;">Branch: ${loanData.branchName || "-"}</h4>
			<h3 style="text-align:center; margin:15px 0; text-decoration:underline;">Loan Sanction Letter</h3>

			<p><b>Loan Approval Date:</b> ${loanData.approvalDate || "-"}</p>
			<p><b>Loan Reference No:</b> ${loanData.loanId}</p>

			<p><b>To,</b><br>
			   ${loanData.applicantName || "-"}<br>
			   ${loanData.address || "-"}<br>
			   Contact: ${loanData.contactNo || "-"}
			</p>

		   <p style="font-size:18px; font-weight:bold; text-decoration:underline; margin-top:20px;">
   Subject: Sanction of Loan
</p>

			<p>Dear ${loanData.memberName || "Applicant"},</p>
		   <p style="font-size:15px; text-align:justify;">
   We are pleased to inform you that your loan application has been carefully reviewed and successfully approved. 
   This sanction has been granted after considering your eligibility, repayment capacity, and the rules and policies 
   of the Microfinance Cooperative Bank Ltd. The sanctioned loan will help you meet your financial requirements, 
   and it will be governed by the terms and conditions as mentioned below. Please find the key details of your 
   sanctioned loan for your reference:
</p>

			<table style="width:100%; border-collapse:collapse;" border="1">
				<tr>
					<td><b>Loan Amount</b></td>
					<td style="color:red; font-weight:bold;">${loanData.loanAmount || "-"}</td>
				</tr>
				<tr>
					<td><b>Loan Term</b></td>
					<td>${loanData.loanTerm || "-"}</td>
				</tr>
				<tr>
					<td><b>Interest Type</b></td>
					<td>${loanData.interestType || "-"}</td>
				</tr>
				<tr>
					<td><b>Rate of Interest</b></td>
					<td>${loanData.rateOfInterest || "-"}</td>
				</tr>
				<tr>
					<td><b>EMI Amount</b></td>
					<td>${loanData.emiPayment || "-"}</td>
				</tr>
				<tr>
					<td><b>Processing Fee</b></td>
					<td>${loanData.processingFee || "-"}</td>
				</tr>
				<tr>
					<td><b>Legal Fee</b></td>
					<td>${loanData.legalCharges || "-"}</td>
				</tr>
			    
				<tr>
					<td><b>GST</b></td>
					<td>${loanData.gst || "-"}</td>
				</tr>
			    
				 <tr>
					<td><b>Sanctioned Loan Amount</b></td>
					<td style="color:red; font-weight:bold;">${loanData.sanctionedAmount || "-"}</td>
				</tr>
			</table>

			<p style="margin-top:20px;">
				Kindly acknowledge and sign a copy of this letter as your acceptance of the terms. 
			</p>

			<p style="margin-top:20px;">
   <b>Date:</b> ${new Date().toLocaleDateString('en-GB')}
</p>
			<br><br>
			<div style="display:flex; justify-content:space-between; margin-top:40px;">
				<div>
					<p>________________________</p>
					<p>Applicant Signature</p>
				</div>
				<div>
					<p>________________________</p>
					<p>Manager/Officer Signature</p>
				</div>
			</div>
		</div>
	`;
					} 

					// Inject into receipt area
					$("#receiptArea").html(content);

					// Show the print button after generating document
					document.getElementById("printBtn").style.display = "inline-block";

				} else {
					alert("Loan not found");
					$("#receiptArea").html("");
				}
			},
			error: function(xhr, status, error) {
				console.error("Error fetching loan data:", error);
				$("#receiptArea").html("<p style='color:red;'>Error fetching data</p>");
			}


		});
	});
});*/
/*

$(document).ready(function() {
	$("#generateNoc").click(function(e) {
		e.preventDefault();
	    
		const loanId = $("#closedLoanIds").val();

		if (!loanId) {
			alert("Please enter a Loan ID");
			return;
		}

		$.ajax({
			url: "api/loanmanegment/getLoanClosuresByLoanId",
			method: "GET",
			data: { loanId: loanId }, // request param
			success: function(result) {
				if (result && result.data) {
					const loanData = result.data;
					let content = "";

				   
					if (docType === "nocCertificate") {
						content = `
						<div style="padding:20px; font-family:Arial; border:2px solid #000; background:#f9f9f9;">
							<h2 style="text-align:center; margin:0;">Microfinance Cooperative Bank Ltd.</h2>
							<h4 style="text-align:center; margin:0;">Branch: ${loanData.branchName || "-"}</h4>
							<h3 style="text-align:center; margin:15px 0; text-decoration:underline;">No Objection Certificate (NOC)</h3>

							<p><b>Loan Reference No:</b> ${loanData.loanId}</p>
							<p><b>Applicant Name:</b> ${loanData.applicantName || "-"}</p>
							<p><b>Address:</b> ${loanData.address || "-"}</p>
							<p><b>Contact No:</b> ${loanData.contactNo || "-"}</p>
							<p><b>Loan Amount:</b> ${loanData.policyAmount || "-"}</p>
							<p><b>Loan Closure Date:</b> ${loanData.closureDate || "-"}</p>

							<p>This is to certify that the above-mentioned applicant has fully repaid the loan 
							with reference number <b>${loanData.loanId}</b> and the bank has no objection in 
							issuing further loans or engaging in other financial transactions.</p>

							<br><br>
							<p style="text-align:right; margin-top:50px;">
								Authorized Signatory<br>
								Microfinance Cooperative Bank Ltd.
							</p>
						</div>`;
					}

					$("#receiptArea").html(content); // render the document
				} else {
					alert("Loan data not found for this ID");
				}
			},
			error: function(err) {
				console.error(err);
				alert("Error fetching loan data");
			}
		});
	});
});

*/
$(document).ready(function() {
	$("#generateNoc").click(function(e) {
		e.preventDefault();

		const loanId = $("#closedLoanIds").val();

		if (!loanId) {
			alert("Please select a Loan ID");
			return;
		}

		$.ajax({
			url: "api/loanmanegment/getLoanClosuresByLoanId",
			method: "GET",
			data: { loanId: loanId },
			success: function(result) {
				if (result && result.data && result.data.length > 0) {
					const loanData = result.data[0]; // if data is an array
	let content = `
    <div style="padding:30px; font-family:'Times New Roman', serif; border:2px solid #000; background:#fff; line-height:1.6;">
        <h2 style="text-align:center; margin:0; color:#FFA500;">Microfinance Cooperative Bank Ltd.</h2>
        <h4 style="text-align:center; margin:0;">Branch: ${loanData.branchName || "-"}</h4>
        <h3 style="text-align:center; margin:15px 0; text-decoration:underline;">No Objection Certificate (NOC)</h3>

        <p>Date: <b>${loanData.closureDate || new Date().toLocaleDateString()}</b></p>

        <p>To,<br>
           <b>${loanData.memberName || "-"}</b><br>
           ${loanData.address || "-"}<br>
           Contact: ${loanData.contactNo || "-"}
        </p>

        <p>Subject: <b>No Objection Certificate for Loan Closure</b></p>

        <p>Dear <b>${loanData.memberName || "-"}</b>,</p>

        <p>This is to certify that you had availed a loan from <b>Microfinance Cooperative Bank Ltd.</b> For the Loan Plan <b>${loanData.loanPlanName}</b>, 
        under Loan Reference Number <b>${loanData.loanId}</b>, sanctioned on <b>${loanData.loanDate || "-"}</b> 
        for an amount of <b>${loanData.loanAmount || "-"}</b>.</p>

        <p>We hereby confirm that you have successfully repaid the entire loan amount along with all 
        applicable interest and charges. Your loan account has been duly closed on <b>${loanData.closureDate || "-"}</b>, 
        and as of this date, there are no outstanding dues payable to the bank under the said loan account.</p>

        <p>Accordingly, we hereby issue this <b>No Objection Certificate (NOC)</b> to declare that 
        <b>${loanData.memberName || "-"}</b> is released from all liabilities and obligations related 
        to the above-mentioned loan account. The bank has no objection if you choose to avail financial 
        facilities from any other institution in the future.</p>

        <p style="margin-bottom:40px;">We thank you for your association with <b>Microfinance Cooperative Bank Ltd.</b> and look forward 
        to serving you again.</p>

        <p style="text-align:right; margin-top:20px;">
            Authorized Signatory<br>
            <b>Microfinance Cooperative Bank Ltd.</b>
        </p>
    </div>
`;


					$("#receiptArea").html(content);

					// Show the print button after generating document
					document.getElementById("printBtn").style.display = "inline-block";
				} else {
					alert("No data found for this loan ID.");
				}
			},
			error: function(err) {
				console.error(err);
				alert("Error fetching loan data");
			}
		});
	});
});



//Js for printing the loan document(Vaibhav)
function printDocument() {

	var content = document.getElementById("receiptArea").innerHTML;

	var printWindow = window.open("", "", "height=700,width=900");
	printWindow.document.write("<html><head><title>Print Document</title>");
	printWindow.document.write("</head><body >");
	printWindow.document.write(content);
	printWindow.document.write("</body></html>");
	printWindow.document.close();

	printWindow.print();
}
