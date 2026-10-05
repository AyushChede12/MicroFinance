// ✅ Js for populating the loanid in the dropdown (Vaibhav)
$(document).ready(function() {
	populateapprovedLoanIdDropdown();
});

function populateapprovedLoanIdDropdown() {

	$.ajax({
		url: "api/loanmanegment/getApprovedLoanIds",
		type: "GET",
		dataType: "json",
		success: function(response) {
			console.log("Loan ID response:", response); // for debugging

			if (response.status === "OK" && Array.isArray(response.data)) {
				const $dropdown = $("#loanId"); // Make sure this matches your HTML ID exactly
				$dropdown.empty(); // Clear existing options

				// ✅ Wrap your <option> in quotes!
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


// Js for binding data in textfields (Vaibhav)
$(document).ready(function() {
	$("#loanId").on("change", function() {
		const selectedLoanId = $(this).val();
		const docType = $("#loanDocument").val();

		if (docType != "applicantForm" || docType != "sanctionLetter" || docType != "loanAgreement") {
			alert("!!Plese Select The Document Type To Print !!")
		} 



		if (selectedLoanId) {
			$.ajax({
				url: "api/loanmanegment/getLoanById", // your GET API
				type: "GET",
				data: { loanId: selectedLoanId }, // sending as query param
				dataType: "json",
				success: function(response) {
					if (response.status === "OK" && response.data) {
						const data = response.data;

						// Now populate the form fields with received data
						$("#memberId").val(data.memberId);
						$("#relativeDetails").val(data.relativeDetails);
						$("#contactNo").val(data.contactNo);
						$("#loanPlanName").val(data.loanPlanName);
						$("#loanMode").val(data.loanMode);
						$("#loanTerm").val(data.loanTerm);
						$("#rateOfInterest").val(data.rateOfInterest);
						$("#loanAmount").val(data.loanAmount);
						$("#interestType").val(data.interestType);
						$("#emiPayment").val(data.emiPayment);

					} else {
						alert("Loan data not found.");
					}
				},
				error: function(xhr) {
					alert("Error fetching data: " + xhr.responseText);
				}
			});
		}


	});
});


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
			url: "api/loanmanegment/getLoanById",
			method: "GET",
			data: { loanId: loanId }, // request param
			success: function(result) {
				if (result && result.data) {
					const loanData = result.data;
					let content = "";

					if (docType === "applicantForm") {

						content = `
        <div style="padding:20px; font-family:Arial; border:2px solid #000;">
            <h2 style="text-align:center; margin:0;">Microfinance Cooperative Bank Ltd.</h2>
            <h4 style="text-align:center; margin:0;">Branch: ${loanData.branchName || "-"}</h4>
            <h3 style="text-align:center; margin:15px 0; text-decoration:underline;">Loan Application Form</h3>

            <h4>1. PERSONAL DETAILS</h4>
            <table style="width:100%; border-collapse:collapse ; table-layout: fixed;" border="1" cellpadding="8">
                <tr>
                    <td><b>Name</b></td><td>${loanData.memberName || "-"}</td>
                    <td><b>Member Id</b></td><td>${loanData.memberId || "-"}</td>
                </tr>
                <tr>
                    <td><b>Date of Birth</b></td><td>${loanData.dateOfBirth || "-"}</td>
                    <td><b>Age</b></td><td>${loanData.age || "-"}</td>
                </tr>
                <tr>
                    <td><b>Relative Details</b></td><td>${loanData.relativeDetails || "-"}</td>
                    <td><b>House No.</b></td><td>${loanData.houseNo || "-"}</td>
                </tr>
                <tr>
                    <td><b>Address</b></td><td>${loanData.address || "-"}</td>
                    <td><b>Pin Code</b></td><td>${loanData.pinCode || "-"}</td>
                </tr>
               
                <tr>
                    <td><b>Mobile No.</b></td><td>${loanData.contactNo || "-"}</td>
                    <td><b>Account No.</b></td><td>${loanData.accountNo || "-"}</td>
                </tr>
            </table>

            <br>
           
            <h4>2. LOAN DETAILS</h4>
            <table style="width:100%; border-collapse:collapse;table-layout: fixed;" border="1" cellpadding="8">
                <tr>
                    <td><b>Loan Plan Name</b></td><td>${loanData.loanPlanName || "-"}</td>
                    <td><b>Date of Loan</b></td><td>${loanData.loanDate || "-"}</td>
                </tr>
                <tr>
                    <td><b>Loan Mode</b></td><td>${loanData.loanMode || "-"}</td>
                    <td><b>Loan Term</b></td><td>${loanData.loanTerm || "-"}</td>
                    
                </tr>
               
                <tr>
                    <td><b>Loan Amount</b></td><td style="color:red; font-weight:bold;">${loanData.loanAmount || "-"}</td>
                    

                    <td><b>Rate of Interest</b></td><td>${loanData.rateOfInterest || "-"}</td>
                </tr>
                <tr>
                    <td><b>Interest Type</b></td><td>${loanData.interestType || "-"}</td>
                    <td><b>Loan EMI</b></td><td style="color:red; font-weight:bold;">${loanData.emiPayment || "-"}</td>
                </tr>
                <tr>
                
                <td><b>Type of Loan</b></td><td>${loanData.typeOfLoan || "-"}</td>
                    <td><b>Purpose of Loan</b></td><td>${loanData.purposeOfLoan || "-"}</td>
                    
                </tr>
             </table>
             <br>
                
            <h4>3. GUARANTOR DETAILS</h4>
            <table style="width:100%; border-collapse:collapse;table-layout: fixed;" border="1" cellpadding="8">
                <tr>
                    <td><b>Member Id</b></td><td>${loanData.guarantorMemberId || "-"}</td>
                    <td><b>Identity Proof</b></td><td>${loanData.guarantorIdentity || "-"}</td>
                </tr>
                <tr>
                    <td><b>Address</b></td><td>${loanData.guarantorAddress || "-"}</td>
                    <td><b>Pin Code</b></td><td>${loanData.guarantorPinCode || "-"}</td>
                    
                </tr>
               
                <tr>
                    <td><b>Contact No.</b></td><td>${loanData.guarantorContactNo || "-"}</td>
                    

                    <td><b>Guaranter Security</b></td><td>${loanData.guarantorSecurityType || "-"}</td>
                </tr>
                
            </table>
            
            <br>
                
            <h4>4. CO-APPLICANT DETAILS</h4>
            <table style="width:100%; border-collapse:collapse;table-layout: fixed;" border="1" cellpadding="8">
                <tr>
                    <td><b>Member Id</b></td><td>${loanData.coApplicantMemberId || "-"}</td>
                    <td><b>Identity Proof</b></td><td>${loanData.coApplicantIdentity || "-"}</td>
                </tr>
                <tr>
                    <td><b>Address</b></td><td>${loanData.coApplicantAddress || "-"}</td>
                    <td><b>Pin Code</b></td><td>${loanData.coApplicantPinCode || "-"}</td>
                    
                </tr>
               
                <tr>
                    <td><b>Contact No.</b></td><td>${loanData.coApplicantContactNo || "-"}</td>
                    

                    <td><b>Guaranter Security</b></td><td>${loanData.coApplicantSecurityType || "-"}</td>
                </tr>
                
            </table>
            
             <br>
                
            <h4>5.APPROVAL DETAILS</h4>
            <table style="width:100%; border-collapse:collapse;table-layout: fixed;" border="1" cellpadding="8">
            
                <tr>
                    <td><b>Financial Consultant Id</b></td><td>${loanData.financialConsultantId || "-"}</td>
                    <td><b>Financial Consultant Name</b></td><td>${loanData.financialConsultantName || "-"}</td>
                    
                </tr>
               
                <tr>
                    <td><b>Approval Date</b></td><td>${loanData.approvalDate || "-"}</td>
                    <td><b>Approval Status</b></td><td style="color:red; font-weight:bold;">
  ${loanData.approvalStatus == 1 ? "Approved" : "Not Approved"}
</td>
                </tr>
                
               
                
            </table>

            <br><br>
            <div style="display:flex; justify-content:space-between; margin-top:40px;">
                <div>
                    <p>________________________</p>
                    <p>Applicant Signature</p>
                </div>
                <div>
                    <p>________________________</p>
                    <p>Bank Officer Signature</p>
                </div>
            </div>
        </div>
    `;
					}
					else if (docType === "sanctionLetter") {
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
					} else if (docType === "loanAgreement") {
						content = `
        <div style="padding:20px; font-family:Arial; border:2px solid #000; background:#fdfdfd;">
            <h2 style="text-align:center; margin:0;">Microfinance Cooperative Bank Ltd.</h2>
            <h4 style="text-align:center; margin:0;">Branch: ${loanData.branchName || "-"}</h4>
            <h3 style="text-align:center; margin:15px 0; text-decoration:underline;">Loan Agreement</h3>

            <p><b>Date:</b> ${new Date().toLocaleDateString('en-GB')}</p>
            <p><b>Loan Reference No:</b> ${loanData.loanId}</p>

            <p><b>This Loan Agreement is executed on the date mentioned above, between the Microfinance Cooperative Bank Ltd. 
             and Mr./Ms. ${loanData.memberName || "________"}.</b></p>

            <p>
                <b>Lender:</b> Microfinance Cooperative Bank Ltd., having its registered office at ${loanData.branchName || "-"}.<br>
                <b>Borrower:</b> ${loanData.memberName || "-"}, residing at ${loanData.address || "-"}.
            </p>

            <h4 style="margin-top:20px; text-decoration:underline;">Terms & Conditions</h4>
            <ol style="padding-left:20px; margin-left:20px;">
                <li>The Borrower agrees to repay the loan amount of <b style="color:red">${loanData.loanAmount || "-"} Rs.</b> 
                    sanctioned on <b>${loanData.approvalDate || "-"}</b> within a tenure of 
                    <b>${loanData.loanTerm || "-"} months</b>.
                </li>
                <li>The loan shall carry an interest rate of <b>${loanData.rateOfInterest || "-"}%</b> per annum, 
                    calculated as per ${loanData.interestType || "the agreed"} method.
                </li>
                <li>The Borrower agrees to pay an EMI of <b style="color:red">${loanData.emiPayment || "-"} Rs.</b> on or before the due date every month.</li>
                <li>The Borrower agrees to pay applicable charges including Processing Fee: 
                    <b>${loanData.processingFee || "-"} Rs.</b> and Legal Fee: 
                    <b>${loanData.legalCharges || "-"} Rs.</b> and GST:
                    <b>${loanData.gst || "-"} Rs.</b>
                </li>
                <li>In case of default, the Bank shall have the right to take legal action and recover the dues.</li>
                <li>The Borrower declares that all information provided in the loan application is true and correct.</li>
            </ol>

            <p style="margin-top:20px;">
                Both parties hereby agree to abide by the terms and conditions mentioned above. This Agreement 
                is executed in duplicate, with one copy each for the Borrower and the Bank.
            </p>

            <br><br>
            <div style="display:flex; justify-content:space-between; margin-top:40px;">
                <div>
                    <p>________________________</p>
                    <p>Borrower Signature</p>
                </div>
                <div>
                    <p>________________________</p>
                    <p>Authorized Signatory (Bank)</p>
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
