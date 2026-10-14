$(document).ready(function() {

	$.ajax({
		url: 'api/securedGoldLoan/getAllGoldClosure',
		type: 'GET',
		success: function(response) {
			// Check data
			if (!(response && response.data && Array.isArray(response.data))) {
				alert("NO GOLD DATA FOUND.");
				return;
			}

			// 👉 Step 1: Distinct Set banaye
			let distinctMap = new Map();
			// Map use kiya taaki GoldID ke hisab se latest/first customerName bhi mil jaye

			response.data.forEach(function(item) {
				let goldId = item.goldID || item.goldId;
				if (goldId && goldId.trim() !== "") {
					distinctMap.set(goldId.trim(), item.customerName);
				}
			});

			// 👉 Step 2: Select2 ke liye data convert
			let goldOptions = [];
			distinctMap.forEach((customerName, goldId) => {
				goldOptions.push({
					id: goldId,
					text: goldId + " - " + customerName
				});
			});

			// 👉 Step 3: Select2 Initialize (distinct data)
			$('#findByGoldLoanId').select2({
				placeholder: '-- SEARCH GOLD ID --',
				data: goldOptions,
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
			console.error("Error fetching Gold Data:", error);
			alert("FAILED TO LOAD GOLD ID.");
		}
	});

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

					let content = `
	        <div style="padding:30px; font-family:'Times New Roman', serif; border:2px solid #000; background:#fff; line-height:1.6;">

	            <h2 style="text-align:center; margin:0; color:#FFA500;">MICROFINANCE COOPERATIVE BANK LTD.</h2>
	            <h4 style="text-align:center; margin:0;">BRANCH: ${goldData.branchName || "-"}</h4>
	            <h3 style="text-align:center; margin:15px 0; text-decoration:underline;">NO OBJECTION CERTIFICATE (NOC)</h3>

	            <p>DATE: <b>${goldData.paymentDate || new Date().toLocaleDateString()}</b></p>

	            <p>TO,<br>
	               <b>${goldData.customerName || "-"}</b><br>
	               CUSTOMER CODE: ${goldData.customerCode || "-"}<br>
	               CONTACT: ${goldData.contactNo || "-"}
	            </p>

	            <p>SUBJECT: <b>NO OBJECTION CERTIFICATE FOR GOLD LOAN CLOSURE</b></p>

	            <p>DEAR <b>${goldData.customerName || "-"}</b>,</p>

	            <p>THIS IS TO CERTIFY THAT YOU AVAILED A GOLD LOAN FROM 
	            <b>MICROFINANCE COOPERATIVE BANK LTD.</b> UNDER THE LOAN PLAN 
	            <b>${goldData.loanPlanName || "-"}</b>, STARTING FROM 
	            <b>${goldData.dateOfLoan || "-"}</b> FOR AN AMOUNT OF 
	            <b>${goldData.loanAmount || "-"}</b>.
	            </p>

	            <p>YOU HAVE REPAID YOUR ENTIRE LOAN AMOUNT ALONG WITH ALL APPLICABLE 
	            INTEREST AND CHARGES. YOUR LOAN ACCOUNT HAS BEEN <b>SUCCESSFULLY CLOSED</b> ON 
	            <b>${goldData.paymentDate || "-"}</b>. AS ON TODAY'S DATE, THERE ARE 
	            <b>NO OUTSTANDING DUES</b> PAYABLE TO THE BANK FOR THE MENTIONED LOAN ACCOUNT.</p>

	            <p>
	            WE HEREBY ISSUE THIS <b>NO OBJECTION CERTIFICATE (NOC)</b> DECLARING THAT 
	            <b>${goldData.customerName || "-"}</b> IS FULLY RELEASED FROM ALL LIABILITIES 
	            ASSOCIATED WITH THE ABOVE-MENTIONED GOLD LOAN.
	            </p>

	            <p style="margin-bottom:40px;">
	            THANK YOU FOR BANKING WITH <b>MICROFINANCE COOPERATIVE BANK LTD.</b>.
	            WE LOOK FORWARD TO SERVING YOU AGAIN.
	            </p>

	            <p style="text-align:right; margin-top:20px;">
	                AUTHORIZED SIGNATORY<br>
	                <b>MICROFINANCE COOPERATIVE BANK LTD.</b>
	            </p>
	        </div>
	        `;

					$("#receiptArea").html(content);
					$("#printBtn").show();

				} else {
					alert("NO DATA FOUND FOR THIS GOLD LOAN ID.");
				}
			},
			error: function(err) {
				console.error(err);
				alert("ERROR FETCHING GOLD GOLD DATA.");
			}
		});
	});


});

//Js for printing the loan document(Vaibhav)
function printDocument() {

	var content = document.getElementById("receiptArea").innerHTML;

	var printWindow = window.open("", "", "height=700,width=900");
	printWindow.document.write("<html><head><title>PRINT DOCUMENT</title>");
	printWindow.document.write("</head><body >");
	printWindow.document.write(content);
	printWindow.document.write("</body></html>");
	printWindow.document.close();

	printWindow.print();
}