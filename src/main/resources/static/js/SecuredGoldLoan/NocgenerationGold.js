$(document).ready(function() {

	$.ajax({
		url: 'api/securedGoldLoan/getAllGoldClosure',
		type: 'GET',
		success: function(response) {
			// Check data
			if (!(response && response.data && Array.isArray(response.data))) {
				alert("No Gold Data found.");
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
				placeholder: '-- Search Gold ID --',
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
			alert("Failed to load Gold ID.");
		}
	});

	$("#generateNoc").click(function(e) {
		e.preventDefault();

		const goldId = $("#findByGoldLoanId").val();

		if (!goldId) {
			alert("Please select a Gold ID");
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
	            
	            <h2 style="text-align:center; margin:0; color:#FFA500;">Microfinance Cooperative Bank Ltd.</h2>
	            <h4 style="text-align:center; margin:0;">Branch: ${goldData.branchName || "-"}</h4>
	            <h3 style="text-align:center; margin:15px 0; text-decoration:underline;">No Objection Certificate (NOC)</h3>

	            <p>Date: <b>${goldData.paymentDate || new Date().toLocaleDateString()}</b></p>

	            <p>To,<br>
	               <b>${goldData.customerName || "-"}</b><br>
	               Customer Code: ${goldData.customerCode || "-"}<br>
	               Contact: ${goldData.contactNo || "-"}
	            </p>

	            <p>Subject: <b>No Objection Certificate for Gold Loan Closure</b></p>

	            <p>Dear <b>${goldData.customerName || "-"}</b>,</p>

	            <p>This is to certify that you availed a Gold Loan from 
	            <b>Microfinance Cooperative Bank Ltd.</b> under the loan plan 
	            <b>${goldData.loanPlanName || "-"}</b>, starting from 
	            <b>${goldData.dateOfLoan || "-"}</b> for an amount of 
	            <b>${goldData.loanAmount || "-"}</b>.
	            </p>

	            <p>You have repaid your entire loan amount along with all applicable 
	            interest and charges. Your loan account has been <b>successfully closed</b> on 
	            <b>${goldData.paymentDate || "-"}</b>. As on today's date, there are 
	            <b>no outstanding dues</b> payable to the bank for the mentioned loan account.</p>

	            <p>
	            We hereby issue this <b>No Objection Certificate (NOC)</b> declaring that 
	            <b>${goldData.customerName || "-"}</b> is fully released from all liabilities 
	            associated with the above-mentioned gold loan.
	            </p>

	            <p style="margin-bottom:40px;">
	            Thank you for banking with <b>Microfinance Cooperative Bank Ltd.</b>.
	            We look forward to serving you again.
	            </p>

	            <p style="text-align:right; margin-top:20px;">
	                Authorized Signatory<br>
	                <b>Microfinance Cooperative Bank Ltd.</b>
	            </p>
	        </div>
	        `;

					$("#receiptArea").html(content);
					$("#printBtn").show();

				} else {
					alert("No data found for this Gold Loan ID.");
				}
			},
			error: function(err) {
				console.error(err);
				alert("Error fetching Gold gold data.");
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