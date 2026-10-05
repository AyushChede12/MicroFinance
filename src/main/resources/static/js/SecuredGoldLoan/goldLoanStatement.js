$(document).ready(function() {

	$.ajax({
		url: 'api/securedGoldLoan/getAllGoldLoanCustomer',
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
			let customerOptions = [];
			distinctMap.forEach((customerName, goldId) => {
				customerOptions.push({
					id: goldId,
					text: goldId + " - " + customerName
				});
			});

			// 👉 Step 3: Select2 Initialize (distinct data)
			$('#findByGoldLoanId').select2({
				placeholder: '-- Search Gold ID or Name --',
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
			console.error("Error fetching Gold Data:", error);
			alert("Failed to load Gold ID.");
		}
	});


	$("#searchGoldStatement").click(function(e) {
		e.preventDefault();

		var goldId = $("#findByGoldLoanId").val().trim();
		if (!goldId) {
			alert("Please enter a Gold ID");
			return;
		}

		$.ajax({
			url: "api/securedGoldLoan/getGoldPaymentByGoldId?goldID=" + goldId,
			method: "GET",
			success: function(response) {
				console.log("Response:", response);  // ✅ Debugging

				if (response.data && response.data.length > 0) {
					var first = response.data[0];

					var detailsHtml = `
	    <div style="border:1px dashed #333; padding:15px; border-radius:10px;">
	        <!-- Header with Loan Statement + Print Button -->
	        <div style="display:flex; justify-content:space-between; align-items:center;">
	            <h4 style="margin:0;">Loan Statement</h4>
	            <button onclick="loanStatement()"  
	                style="padding:6px 12px; border:none; background:#007bff; color:#fff; border-radius:6px; cursor:pointer;">
	                Print
	            </button>
	        </div>

	        <!-- Customer Name and Loan Type in same row -->
	        <div style="display:flex; justify-content:space-between; margin-top:10px;">
	            <p><b>Customer Name:</b> ${first.customerName}</p>
	            <p><b>Interest Type:</b> ${first.interestType}</p>
	        </div>

	        <div style="display:flex; justify-content:space-between; margin-top:10px;">
	           <p><b>Gold ID:</b> ${first.goldID}</p>
	           <p style="margin-left:5px;"><b>Plan Name:</b> ${first.loanPlanName}</p>
	        </div>
	        <hr/>

	        <h5>Payments</h5>
	        <div style="display:grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr; font-weight:bold; border-bottom:2px solid #000; padding:6px 0;">
	            <div>Payment Date</div>
				<div>Installment No.</div>
	            <div>Amount Paid</div>
	            <div>Amount Due</div>
	            <div>Payment Status</div>
	        </div>
	   
	                    `;

					// Add data rows
					response.data.forEach(function(txn) {
						detailsHtml += `
	        <div style="display:grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr; border-bottom:1px solid #ccc; padding:5px 0;">
	            <div>${txn.paymentDate}</div>
	            <div>${txn.remarks}</div>
	            <div>${txn.emiPayment}</div>
	            <div>${Number(txn.amountDue).toFixed(2)}</div>
	            <div style="padding-left:50px;">${txn.paymentStatus}</div>
	        </div>
	    `;
					});

					detailsHtml += "</div>";
					$(".recent-sales").html(detailsHtml);

				} else {
					$(".recent-sales").html("<p style='color:red;'>No data found for this Loan ID</p>");
				}
			},
			error: function(xhr, status, error) {
				$(".recent-sales").html("<p style='color:red;'>Error fetching data</p>");
			}
		});
	});

});

function loanStatement() {
	var printContents = document.getElementById("receiptArea").innerHTML;
	var printWindow = window.open('', '', 'height=600,width=800');
	printWindow.document.write(printContents);
	printWindow.document.write('</body></html>');
	printWindow.document.close();
	printWindow.print();
}