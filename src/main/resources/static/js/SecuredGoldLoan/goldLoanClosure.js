$(document).ready(function() {
	$.ajax({
		url: 'api/securedGoldLoan/getAllActive',
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

	$("#findByGoldLoanId").change(function() {
		let findByGoldLoanId = $("#findByGoldLoanId").val();
		if (findByGoldLoanId !== "") {
			$.ajax({
				url: "api/securedGoldLoan/getByGoldIDforApproval",
				type: "POST",
				contentType: "application/json",
				data: JSON.stringify({
					goldID: findByGoldLoanId
				}),
				success: function(response) {
					if (response.status == "OK") {
						let data = response.data[0];
						$("#closeLoanDate").val(data.loanDate);
						$("#customerCode").val(data.memberCode);
						$("#customerName").val(data.customerName.toUpperCase());
						$("#contactNo").val(data.contactNo);
						$("#branchName").val(data.branchName.toUpperCase());
						$("#loanPlanName").val(data.loanPlanName.toUpperCase());
						$("#loanMode").val(data.loanMode.toUpperCase());
						$("#loanTerm").val(data.loanTerm.toUpperCase());
						$("#rateOfInterest").val(data.rateOfInterest);
						$("#loanAmount").val(data.loanAmount);
						$("#interestType").val(data.interestType.toUpperCase());
						$("#emiPayment").val(data.emiPayment.toUpperCase());
						$("#sanctionedAmount").val(data.sanctionedAmount);
						$("#paymentBranch").val(data.branchName);

						$("#financialConsultantId").val(data.financialConsultantId);
						$("#financialConsultantName").val(data.financialConsultantName);

						let loanAmount = parseFloat(data.loanAmount) || 0;
						let emi = parseFloat(data.emiPayment) || 0;
						let roi = parseFloat(data.rateOfInterest) || 0;
						let sanctioned = parseFloat(data.sanctionedAmount) || 0;

						// Existing payments (if your API returns)
						let interestPaid = parseFloat(data.interestPaid || 0);
						let principalPaid = parseFloat(data.principalPaid || 0);

						// Months passed from loan start
						let startDate = new Date(data.loanDate);
						let today = new Date();
						let monthsPassed = (today.getFullYear() - startDate.getFullYear()) * 12 +
							(today.getMonth() - startDate.getMonth());
						monthsPassed = monthsPassed < 0 ? 0 : monthsPassed;

						// 1️⃣ No of Installments Paid
						let noOfInstPaid = emi > 0 ? (principalPaid + interestPaid) / emi : 0;
						$("#noOfInst").val(Math.round(noOfInstPaid));

						// 2️⃣ Interest Due
						let totalInterestTillNow = (loanAmount * roi * monthsPassed) / 100;
						let interestDue = totalInterestTillNow - interestPaid;
						$("#interestDue").val(interestDue.toFixed(2));

						// 3️⃣ Principal Due
						let principalDue = loanAmount - principalPaid;
						$("#principaldue").val(principalDue.toFixed(2));

						// 4️⃣ Amount Paid Till Date
						let amountPaid = principalPaid + interestPaid;
						$("#amountPaid").val(amountPaid.toFixed(2));

						// 5️⃣ Balance Loan Amount
						let balanceAmount = sanctioned - amountPaid;
						$("#balanceLoanAmount").val(balanceAmount.toFixed(2));

						// 6️⃣ Payment Amount (default: balance amount)
						$("#paymentamount").val(balanceAmount.toFixed(2));

						// 7️⃣ Net Amount calculation (payment - fine)
						function calculateNetAmount() {
							let pay = parseFloat($("#paymentamount").val()) || 0;
							let fine = parseFloat($("#deductfineamount").val()) || 0;
							$("#netamount").val((pay - fine).toFixed(2));
						}

						// Trigger net amount calculation on input changes
						$("#paymentamount, #deductfineamount").off("input").on("input", calculateNetAmount);

						// Initial net amount
						calculateNetAmount();

					} else {
						alert("NO CUSTOMER FOUND FOR THIS MEMBER CODE.");
					}
				},
				error: function() {
					alert("MEMBER NOT FOUND OR SERVER ERROR.");
				}
			});
		}
	});

	$("#closeLoanBtn").click(function(e) {
		e.preventDefault();

		let requestData = {
			goldID: $("#findByGoldLoanId").val(),
			dateOfLoan: $("#closeLoanDate").val(),
			customerCode: $("#customerCode").val(),
			customerName: $("#customerName").val(),
			contactNo: $("#contactNo").val(),
			branchName: $("#branchName").val(),
			loanPlanName: $("#loanPlanName").val(),
			loanTerm: $("#loanTerm").val(),
			loanMode: $("#loanMode").val(),
			loanAmount: $("#loanAmount").val(),
			rateOfInterest: $("#rateOfInterest").val(),
			interestType: $("#interestType").val(),
			emiPayment: $("#emiPayment").val(),
			totalInterestOfLoan: $("#totalinterestofLoan").val(),
			sanctionedAmount: $("#sanctionedAmount").val(),
			totalPayableOfLoan: $("#totalPayableofLoan").val(),

			// Payment Details
			noOfInstPaid: $("#noOfInst").val(),
			interestDue: $("#interestDue").val(),
			principalDue: $("#principaldue").val(),
			amountPaidTillDate: $("#amountPaid").val(),
			loanBalanceAmount: $("#balanceLoanAmount").val(),
			dueDate: $("#dueDate").val(),
			paymentBranch: $("#paymentBranch").val(),
			paymentDate: $("#paymentDate").val(),
			deductFine: $("#deductfine").val(),
			deductFineAmount: $("#deductfineamount").val(),
			paymentAmount: $("#paymentamount").val(),
			netAmount: $("#netamount").val(),
			financialCode: $("#financialConsultantId").val(),
			financialName: $("#financialConsultantName").val(),
			remarks: $("#remark").val(),
			goldLoanStatus: "CLOSED"
		};

		$.ajax({
			url: "api/securedGoldLoan/closeGoldLoan",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(requestData),
			success: function(response) {
				alert("LOAN CLOSED SUCCESSFULLY!");
			},
			error: function(err) {
				console.log(err);
				alert("SOMETHING WENT WRONG!");
			}
		});
	});

});