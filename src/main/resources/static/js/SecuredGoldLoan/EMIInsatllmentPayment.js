$(document).ready(function() {

	$.ajax({
		url: 'api/securedGoldLoan/getAllActive',
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
					distinctMap.set(goldId.trim(), item.customerName.toUpperCase());
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
				placeholder: '-- Search Gold ID or Name --',
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
						$("#loanDate").val(data.loanDate);
						$("#customerCode").val(data.memberCode);
						$("#customerName").val(data.customerName.toUpperCase());
						$("#contactNo").val(data.contactNo);
						$("#branchName").val(data.branchName.toUpperCase());
						$("#loanPlanName").val(data.loanPlanName.toUpperCase());
						$("#typeOfLoan").val(data.typeOfLoan.toUpperCase());
						$("#loanMode").val(data.loanMode.toUpperCase());
						$("#loanTerm").val(data.loanTerm.toUpperCase());
						$("#rateOfInterest").val(data.rateOfInterest);
						$("#loanAmount").val(data.loanAmount);
						$("#interestType").val(data.interestType.toUpperCase());
						$("#emiPayment").val(data.emiPayment.toUpperCase());
						let term = data.loanTerm;

						let installmentDropdown = $("#installment");

						installmentDropdown.empty(); // Clear previous options
						installmentDropdown.append(`<option value="">-SELECT INSTALLMENT-</option>`);

						if (!isNaN(term) && term > 0) {
							for (let i = 1; i <= term; i++) {
								installmentDropdown.append(
									`<option value="${i}">INSTALLMENT ${i}</option>`
								);
							}
						}

					} else {
						alert("No customer found for this member code.");
					}
				},
				error: function() {
					alert("Member not found or server error.");
				}
			});
		}
	});

	// ---------------- INSTALLMENT CHANGE ----------------
	$("#installment").change(function() {

		let installmentNo = Number($(this).val());
		if (!installmentNo) return;
		
		let paidInstallments = Number($("#paidInstallments").val());

		if (installmentNo <= paidInstallments) {

		    $("#dueAmount").val("PAID");
		    $("#pendingInterest").val("PAID");
		    $("#pendingPrincipal").val("PAID");

		    return;
		}

		let loanAmount = Number($("#loanAmount").val());
		let rateOfInterest = Number($("#rateOfInterest").val());
		let loanTerm = Number($("#loanTerm").val());
		let loanDate = $("#loanDate").val();
		let interestType = $("#interestType").val();

		if (installmentNo > loanTerm) return;

		let pendingPrincipal = loanAmount;
		let pendingInterest = 0;
		let emi = 0;

		// ---------------- FLAT INTEREST ----------------
		if (interestType === "FLAT INTEREST") {

			let totalInterest = (loanAmount * rateOfInterest * loanTerm) / (100 * 12);
			let monthlyInterest = totalInterest / loanTerm;

			emi = (loanAmount + totalInterest) / loanTerm;
			emi = Number(emi.toFixed(2));

			let principalPart = emi - monthlyInterest;

			let totalInterestPaid = monthlyInterest * installmentNo;
			let totalPrincipalPaid = principalPart * installmentNo;

			pendingInterest = totalInterest - totalInterestPaid;
			pendingPrincipal = loanAmount - totalPrincipalPaid;
			sessionStorage.setItem("pendingPrincipal", pendingPrincipal);
			sessionStorage.setItem("monthlyInterest", monthlyInterest);
			sessionStorage.setItem("installmentNo", installmentNo);
			sessionStorage.setItem("loanAmount", loanAmount);
		}

		// ---------------- REDUCING INTEREST ----------------
		else if (interestType === "REDUCING INTEREST") {

			let monthlyInterestRate = (rateOfInterest / 100) / 12;

			emi = loanAmount * monthlyInterestRate *
				Math.pow(1 + monthlyInterestRate, loanTerm) /
				(Math.pow(1 + monthlyInterestRate, loanTerm) - 1);

			emi = Number(emi.toFixed(2));

			let remainingPrincipal = loanAmount;
			let totalInterestPaid = 0;

			for (let i = 1; i <= installmentNo; i++) {

				let interestForMonth = remainingPrincipal * monthlyInterestRate;
				let principalForMonth = emi - interestForMonth;

				totalInterestPaid += interestForMonth;
				remainingPrincipal -= principalForMonth;

				if (remainingPrincipal < 0) remainingPrincipal = 0;
			}

			pendingPrincipal = remainingPrincipal;

			let totalInterest = (emi * loanTerm) - loanAmount;
			pendingInterest = totalInterest - totalInterestPaid;
		}

		// ---------------- RULE OF 78 ----------------
		else if (interestType === "RULE 78") {

			let totalInterest = (loanAmount * rateOfInterest * loanTerm) / (100 * 12);

			emi = (loanAmount + totalInterest) / loanTerm;
			emi = Number(emi.toFixed(2));

			let sumOfDigits = (loanTerm * (loanTerm + 1)) / 2;

			let interestPaid = 0;

			for (let i = 1; i <= installmentNo; i++) {

				let weight = loanTerm - i + 1;
				let interestForMonth = (totalInterest * weight) / sumOfDigits;

				interestPaid += interestForMonth;
			}

			pendingInterest = totalInterest - interestPaid;

			let principalPaid = (emi * installmentNo) - interestPaid;
			pendingPrincipal = loanAmount - principalPaid;
		}

		// ---------------- NEGATIVE PROTECTION ----------------
		if (pendingInterest < 0) pendingInterest = 0;
		if (pendingPrincipal < 0) pendingPrincipal = 0;

		// ---------------- REGISTRATION DATE ----------------
		let d = new Date(loanDate);
		d.setMonth(d.getMonth() + installmentNo);

		let formattedDate = d.toISOString().split("T")[0];

		// ---------------- SET VALUES ----------------
		$("#registrationDate").val(formattedDate);
		$("#dueAmount").val(emi.toFixed(2));
		$("#pendingInterest").val(pendingInterest.toFixed(2));
		$("#pendingPrincipal").val(pendingPrincipal.toFixed(2));

	});

	$("#saveBtn").click(function() {

		// Collect data from your form fields
		let emiData = {
			goldID: $("#findByGoldLoanId").val(),
			loanDate: $("#loanDate").val(),
			customerCode: $("#customerCode").val(),
			customerName: $("#customerName").val(),
			loanPlanName: $("#loanPlanName").val(),
			interestType: $("#interestType").val(),
			loanMode: $("#loanMode").val(),
			loanTerm: $("#loanTerm").val(),
			emiPayment: $("#emiPayment").val(),
			typeOfLoan: $("#typeOfLoan").val(),
			rateOfInterest: $("#rateOfInterest").val(),
			contactNo: $("#contactNo").val(),
			loanAmount: $("#loanAmount").val(),
			branchName: $("#branchName").val(),

			//Payment Details
			installment: $("#installment").val(),
			registrationDate: $("#registrationDate").val(),
			dueAmount: $("#dueAmount").val(),
			pendingInterest: $("#pendingInterest").val(),
			pendingPrincipal: $("#pendingPrincipal").val(),
			totalDue: $("#totalDue").val(),
			paymentAmount: $("#paymentAmount").val(),
			paymentDate: $("#PaymentDate").val(),
			netAmount: $("#netAmount").val(),
			paymentMode: $("#modeofPayment").val(),
			financialCode: $("#financialConsultantId").val(),
			financialName: $("#financialConsultantName").val(),
			remarks: $("#remarks").val(),
		};

		console.log("Sending EMI Data: ", emiData);

		$.ajax({
			url: "api/securedGoldLoan/saveEMIInstallmentData",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(emiData),
			success: function(res) {
				if (res.status === "OK") {
					alert(res.data);
					location.reload();
				} else {
					alert(res.data);
				}
			},

			error: function(xhr) {
				alert(xhr);
				console.error(xhr);
			}
		});

	});



});