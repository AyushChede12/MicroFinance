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
				placeholder: '-- SEARCH GOLD ID OR NAME --',
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
						$("#goldLoanDate").val(data.loanDate);
						$("#customerCode").val(data.memberCode);
						$("#customerName").val(data.customerName.toUpperCase());
						$("#dateOfBirth").val(data.dateOfBirth);
						$("#age").val(data.age);
						$("#contactNo").val(data.contactNo);
						$("#address").val(data.address);
						$("#pinCode").val(data.pinCode);
						$("#branchName").val(data.branchName.toUpperCase());
						$("#loanPlanName").val(data.loanPlanName.toUpperCase());
						$("#typeOfLoan").val(data.typeOfLoan.toUpperCase());
						$("#loanMode").val(data.loanMode.toUpperCase());
						$("#loanTerm").val(data.loanTerm.toUpperCase());
						$("#rateOfInterest").val(data.rateOfInterest);
						$("#loanAmount").val(data.loanAmount);
						$("#interestType").val(data.interestType.toUpperCase());
						$("#emiPayment").val(data.emiPayment.toUpperCase());
						$("#purposeOfLoan").val(data.purposeOfLoan);

						//Gold Details
						$("#karat").val(data.karat.toUpperCase());
						$("#itemType").val(data.itemType);
						$("#custgoldRate").val(data.custgoldRate.toUpperCase());
						$("#itemName").val(data.itemName.toUpperCase());
						$("#lockerBranch").val(data.lockerBranch.toUpperCase());
						$("#purity").val(data.purity);
						$("#itemQty").val(data.itemQty);
						$("#itemWt").val(data.itemWt);
						$("#grossWt").val(data.grossWt);
						$("#stoneWt").val(data.stoneWt);
						$("#netWt").val(data.netWt);
						$("#marketValuation").val(data.marketValuation);
						$("#eligibleLoan").val(data.eligibleLoan);

						//Guarantor Details
						$("#guarantorcustomerCode").val(data.guarantorcustomerCode);
						$("#guarantorIdentity").val(data.guarantorIdentity);
						$("#guarantorAddress").val(data.guarantorAddress);
						$("#guarantorPinCode").val(data.guarantorPinCode);
						$("#guarantorContactNo").val(data.guarantorContactNo);
						$("#guarantorSecurityType").val(data.guarantorSecurityType);

						//CoApplicant Details
						$("#coApplicantMemberId").val(data.coApplicantMemberId);
						$("#coApplicantIdentity").val(data.coApplicantIdentity);
						$("#coApplicantAddress").val(data.coApplicantAddress);
						$("#coAge").val(data.coAge);
						$("#coApplicantContactNo").val(data.coApplicantContactNo);
						$("#securityDetails").val(data.securityDetails);

						//Deduction Details
						$("#processingFee").val(data.processingFee);
						$("#legalCharges").val(data.legalCharges);
						$("#stampDuty").val(data.stampDuty);
						$("#smsCharges").val(data.smsCharges);
						$("#mainCharges").val(data.mainCharges);
						$("#stationaryFee").val(data.stationaryFee);
						$("#gst").val(data.gst);
						$("#insuFee").val(data.insuFee);
						$("#penaltyCharge").val(data.penaltyCharge);
						$("#valuationFees").val(data.valuationFees);
						$("#overCharge").val(data.overCharge);
						$("#collectionCharge").val(data.collectionCharge);
						$("#financialConsultantId").val(data.financialConsultantId);
						$("#financialConsultantName").val(data.financialConsultantName);

						if (data.approvalStatus === true || data.approvalStatus === 1 || data.approvalStatus === "1") {
							$('#approvalStatus').val("APPROVED").css('color', 'green');
						} else {
							$('#approvalStatus').val("NOT APPROVED").css('color', 'red');
						}

						fetchEMIValues();

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

	$("#paymentBtn").click(function(e) {
		e.preventDefault();

		let requestData = {

			// ---------- Customer Details ----------
			goldID: $("#findByGoldLoanId").val(),
			customerCode: $("#customerCode").val(),
			customerName: $("#customerName").val(),
			dateOfBirth: $("#dateOfBirth").val(),
			age: $("#age").val(),
			contactNo: $("#contactNo").val(),
			address: $("#address").val(),
			pinCode: $("#pinCode").val(),
			branchName: $("#branchName").val(),

			// ---------- Loan Details ----------
			goldLoanDate: $("#goldLoanDate").val(),
			loanPlanName: $("#loanPlanName").val(),
			typeOfLoan: $("#typeOfLoan").val(),
			loanTerm: $("#loanTerm").val(),
			loanMode: $("#loanMode").val(),
			rateOfInterest: $("#rateOfInterest").val(),
			loanAmount: $("#loanAmount").val(),
			interestType: $("#interestType").val(),
			emiPayment: $("#emiPayment").val(),
			purposeOfLoan: $("#purposeOfLoan").val(),

			// ---------- Gold/Silver Details ----------
			karat: $("#karat").val(),
			itemType: $("#itemType").val(),
			custgoldRate: $("#custgoldRate").val(),
			itemName: $("#itemName").val(),
			lockerBranch: $("#lockerBranch").val(),
			purity: $("#purity").val(),
			itemQty: $("#itemQty").val(),
			itemWt: $("#itemWt").val(),
			grossWt: $("#grossWt").val(),
			stoneWt: $("#stoneWt").val() || $("#stoneWeight").val() || "",
			netWt: $("#netWt").val(),
			marketValuation: $("#marketValuation").val(),
			eligibleLoan: $("#eligibleLoan").val(),

			// ---------- Guarantor Details ----------
			guarantorcustomerCode: $("#guarantorcustomerCode").val(),
			guarantorIdentity: $("#guarantorIdentity").val(),
			guarantorAddress: $("#guarantorAddress").val(),
			guarantorPinCode: $("#guarantorPinCode").val(),
			guarantorContactNo: $("#guarantorContactNo").val(),
			guarantorSecurityType: $("#guarantorSecurityType").val(),

			// ---------- Co-Applicant Details ----------
			coApplicantMemberId: $("#coApplicantMemberId").val(),
			coApplicantIdentity: $("#coApplicantIdentity").val(),
			coApplicantAddress: $("#coApplicantAddress").val(),
			coAge: $("#coAge").val(),
			coApplicantContactNo: $("#coApplicantContactNo").val(),
			securityDetails: $("#securityDetails").val(),

			// ---------- Deduction Details ----------
			processingFee: $("#processingFee").val(),
			legalCharges: $("#legalCharges").val(),
			stampDuty: $("#stampDuty").val(),
			smsCharges: $("#smsCharges").val(),
			mainCharges: $("#mainCharges").val(),
			stationaryFee: $("#stationaryFee").val(),
			gst: $("#gst").val(),
			insuFee: $("#insuFee").val(),
			penaltyCharge: $("#penaltyCharge").val(),
			valuationFees: $("#valuationFees").val(),
			overdueInterestCharge: $("#overdueInterestCharge").val(),
			collectionCharge: $("#collectionCharge").val(),
			financialCode: $("#financialConsultantId").val() || $("#financialCode").val() || "",
			financialName: $("#financialConsultantName").val() || $("#financialName").val() || "",

			// ---------- Payment Details ----------
			paymentAmount: $("#paymentAmount").val() || $("#emiPayment").val() || "0",
			paymentDate: $("#paymentDate").val() || new Date().toISOString().split('T')[0],
			paymentStatus: $("#paymentStatus").val() || "PAID",
			modeOfPayment: $("#modeofPayment").val() || $("#modeOfPayment").val() || "CASH",
			chargeDeductCash: $("#chargeDeductCash").val() || "0",
			remarks: $("#remarks").val() || "LOAN EMI PAYMENT",
			amountDue: $("#amountDue").val() || "0",
			chequeNo: $("#chequeNo").val(),
			chequeDate: $("#chequeDate").val(),
			depositAccount: $("#depositAccount").val(),
			upiID: $("#refNo").val()
		};

		// ---- VALIDATION ----
		if (!requestData.goldID || requestData.goldID.trim() === "") {
			alert("PLEASE SELECT A GOLD ID FIRST!");
			$("#findByGoldLoanId").focus();
			return;
		}

		if (!requestData.customerCode || requestData.customerCode.trim() === "") {
			alert("CUSTOMER CODE IS MISSING FOR THIS GOLD LOAN!");
			return;
		}

		let emiVal = parseFloat(requestData.emiPayment) || 0;
		if (emiVal <= 0) {
			emiVal = parseFloat(requestData.paymentAmount) || 0;
			if (emiVal > 0) {
				requestData.emiPayment = String(emiVal);
				$("#emiPayment").val(emiVal);
			} else {
				alert("PLEASE ENTER A VALID EMI PAYMENT AMOUNT!");
				$("#paymentAmount").focus();
				return;
			}
		}

		$.ajax({
			url: "api/securedGoldLoan/payEmi",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(requestData),
			success: function(response) {
				if (response.status === "OK" || response.status === "SUCCESS") {
					alert(response.message ? response.message.toUpperCase() : "PAYMENT PROCESSED SUCCESSFULLY!");
					location.reload();
				} else {
					alert("WARNING: " + (response.message ? response.message.toUpperCase() : "FAILED TO PROCESS PAYMENT"));
				}
			},
			error: function(xhr, status, error) {
				let msg = "FAILED TO PROCESS GOLD LOAN PAYMENT";
				try {
					const res = JSON.parse(xhr.responseText);
					msg = res.message || (res.data && res.data.error) || msg;
				} catch(e) {
					msg = xhr.responseText || msg;
				}
				alert("ERROR: " + msg.toUpperCase());
			}
		});
	});

});

function fetchEMIValues() {

	var goldID = $("#findByGoldLoanId").val();
	if (!goldID) return;

	var loanAmount = Number($("#loanAmount").val()) || 0;
	var rateOfInterest = Number($("#rateOfInterest").val()) || 0;

	let monthlyInterest = (loanAmount * rateOfInterest) / (100 * 12);

	$.ajax({
		url: "api/securedGoldLoan/getEMIInstallmentDataByGoldID",
		type: "GET",
		data: { goldID: goldID },
		success: function(response) {
			console.log(response);

			if (response && response.data && response.data.length > 0) {
				var lastEmi = response.data[response.data.length - 1];
				var pendingPrincipal = lastEmi.pendingPrincipal || 0;

				$("#pendingPrincipal").val(pendingPrincipal);
				$("#paymentAmount").val(pendingPrincipal);
				if (!$("#emiPayment").val()) {
					$("#emiPayment").val(pendingPrincipal);
				}
			} else {
				var paymentAmount = loanAmount + monthlyInterest;
				$("#paymentAmount").val(paymentAmount.toFixed(2));
				if (!$("#emiPayment").val()) {
					$("#emiPayment").val(paymentAmount.toFixed(2));
				}
			}
		},
		error: function() {
			var paymentAmount = loanAmount + monthlyInterest;
			$("#paymentAmount").val(paymentAmount.toFixed(2));
			if (!$("#emiPayment").val()) {
				$("#emiPayment").val(paymentAmount.toFixed(2));
			}
		}
	});
}