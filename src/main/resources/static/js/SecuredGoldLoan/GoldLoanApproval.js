$(document).ready(function() {

	$.ajax({
		url: 'api/securedGoldLoan/getAllNotApprovedGoldCustomer',
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
			//alert("Failed to load Gold ID.");
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
							$('#approvalStatus').val("Approved").css('color', 'green');
						} else {
							$('#approvalStatus').val("Not Approved").css('color', 'red');
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

	$('#approveBtn').click(function(event) {
	    event.preventDefault(); // Prevent the form from submitting
	    const findByGoldLoanId = $('#findByGoldLoanId').val();
	    const approvalDate = $('#approvalDate').val();

	    const requestData = {
	        goldID: findByGoldLoanId,
	        approvalStatus: true,
	        approvalDate: approvalDate
	    };

	    $.ajax({
	        type: "POST",
	        url: "api/securedGoldLoan/approveGold",
	        contentType: "application/json",
	        data: JSON.stringify(requestData),
	        success: function(response) {
	            alert(response.message);
	            location.reload();
	        },
	        error: function(xhr) {
	            alert("Error: " + xhr.responseText);
	        }
	    });
	});
});
