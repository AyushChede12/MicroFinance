$(document).ready(function() {

	$.ajax({
		url: 'api/financialconsultant/getAllFinancialConsultantDetails',
		type: 'POST',
		success: function(response) {
			console.log("API Response:", response); // ✅ Debug to check!

			const consultantDropdown = $('#financialConsultantId');
			consultantDropdown.empty();
			consultantDropdown.append('<option value="">SELECT CONSULTANT</option>');

			response.data.forEach(function(customer) {
				// ✅ Only the code
				const option = `<option value="${customer.financialCode}">${customer.financialCode}</option>`;
				consultantDropdown.append(option);
			});
		},
		error: function(xhr, status, error) {
			console.error('AJAX Error:', status, error);
			alert('Failed to fetch consultant data.');
		}
	});
	$.ajax({
		url: "api/securedGoldLoan/getAllGoldDirectories",
		type: "GET",
		data: { memberCode: "" },
		success: function(response) {
			var select = $("#memberCode");
			select.empty();
			select.append('<option value="">SELECT CUSTOMER CODE</option>');

			if (response && response.data && response.data.length > 0) {
				response.data.forEach(function(customer) {
					var name = (customer.customerName || "").toUpperCase();
					var optionText = customer.customerCode + "-" + name;
					var optionValue = customer.customerCode;
					select.append(
						'<option value="' + optionValue + '">' + optionText + "</option>"
					);
				});
			} else {
				console.log("No members found");
			}
		},
		error: function(err) {
			console.error("Error fetching members", err);
		},
	});

	$.ajax({
		url: "api/securedGoldLoan/getAllCustomers",
		type: "GET",
		success: function(response) {
			var select = $("#guarantorcustomerCode,#coApplicantMemberId");
			select.empty().append('<option value="">SELECT CUSTOMER CODE</option>');
			response.data.forEach(function(c) {
				select.append('<option value="' + c.memberCode + '">' + c.memberCode + '</option>');
			});
			// Value set karo yahan par
			select.val(cust.memberCode || "");
		}
	});

	let goldDirectories = [];
	let customers = [];

	// Fetch GoldDirectory list
	$.ajax({
		url: "api/securedGoldLoan/getAllGoldDirectories",
		type: "GET",
		success: function(response) {
			if (response && response.data) {
				goldDirectories = response.data;
			}
		}
	});

	// Fetch addCustomer list
	$.ajax({
		url: "api/securedGoldLoan/getAllCustomers",
		type: "GET",
		success: function(response) {
			if (response && response.data) {
				customers = response.data;
			}
		}
	});

	// Jab user customerCode select kare
	$("#memberCode").on("change", function() {
		var selectedCode = $(this).val();

		// GoldDirectory me match check
		var gold = goldDirectories.find(g => g.customerCode === selectedCode);

		// addCustomer me match check
		var cust = customers.find(c => c.memberCode === selectedCode);

		if (gold && cust) {
			
			const fullName = [
				cust.firstName || "",
				cust.middleName || "",
				cust.lastName || ""
			].filter(Boolean).join(" ");
			
			// Populate fields from addCustomer
			$("#customerName").val(fullName.toUpperCase() || "");
			$("#dateOfBirth").val(cust.dob.toUpperCase() || "");
			$("#age").val(cust.customerAge.toUpperCase() || "");
			$("#contactNo").val(cust.contactNo || "");
			$("#address").val(cust.customerAddress.toUpperCase() || "");
			$("#pinCode").val(cust.pinCode.toUpperCase() || "");
			$("#branchName").val(cust.branchName.toUpperCase() || "");
			$("#loanPlanName").val(gold.loanPlanName.toUpperCase() || "");
			$("#typeOfLoan").val(gold.typeOfLoan.toUpperCase() || "");
			$("#loanMode").val(gold.loanMode.toUpperCase() || "");
			$("#loanTerm").val(gold.loanTerm.toUpperCase() || "");
			$("#rateOfInterest").val(gold.rateOfInterest.toUpperCase() || "");
			$("#loanAmount").val(gold.loanAmount.toUpperCase() || "");
			$("#interestType").val(gold.typeIntrest.toUpperCase() || "");
			$("#emiPayment").val(gold.emiPayment.toUpperCase() || "");
			$("#karat").val(gold.karat.toUpperCase() || "");
			$("#itemType").val(gold.itemMasterType.toUpperCase() || "");
			$("#custgoldRate").val(gold.custgoldRate.toUpperCase() || "");
			$("#itemName").val(gold.itemName.toUpperCase() || "");
			$("#lockerBranch").val(gold.lockerBranch.toUpperCase() || "");
			$("#purity").val(gold.purity.toUpperCase() || "");
			$("#guarantorcustomerCode").val(cust.memberCode.toUpperCase() || "");
			$("#guarantorAddress").val(cust.customerAddress.toUpperCase() || "");
			$("#guarantorPinCode").val(cust.pinCode.toUpperCase() || "");
			$("#guarantorContactNo").val(cust.contactNo.toUpperCase() || "");
			$("#coApplicantMemberId").val(cust.memberCode || "");
			$("#coApplicantAddress").val(cust.nomineeAddress || "");
			$("#coAge").val(cust.nomineeAge || "");
			$("#coApplicantContactNo").val(cust.nomineeMobileNo || "");
			if (parseInt(cust.smsSend) === 1) {
				$('#toggle-sms-send').prop('checked', true);
			} else {
				$('#toggle-sms-send').prop('checked', false);
			}									// Photo
			if (cust.customerPhoto) {
				const photoPath = "Uploads/" + cust.customerPhoto; // ya jo bhi aapka folder path ho
				$("#photoPreview").attr("src", photoPath);
				$("#photoHidden").val(photoPath);
				photoSizeEdit({ target: { result: photoPath } });
			} else {
				$("#photoPreview").attr("src", "Uploads/default-placeholder.jpg");
				$("#photoHidden").val("");
			}

			if (cust.customerSignature) {
				const signPath = "Uploads/" + cust.customerSignature; // ya jo bhi folder path ho
				$("#signaturePreview").attr("src", signPath);
				$("#signatureHidden").val(signPath);
				signatureSizeEdit({ target: { result: signPath } });
			} else {
				$("#signaturePreview").attr("src", "Uploads/default-placeholder.jpg");
				$("#signatureHidden").val("");
			}


			updateToggleColor(document.getElementById('toggle-sms-send'));


		} else {
			alert("No matching data found!");
		}
	});


	/*$.ajax({
			url: "api/securedGoldLoan/getAllCustomers",
			type: "GET",
			data: { memberCode: "" },
			success: function(response) {
				var select = $("#guarantorcustomerCode,#coApplicantMemberId");
				select.empty();
				select.append('<option value="">Select member Code</option>');

				if (response && response.data && response.data.length > 0) {
					response.data.forEach(function(customer) {
						var optionText = customer.memberCode + "-" + customer.customerName;
						var optionValue = customer.memberCode;
						select.append(
							'<option value="' + optionValue + '">' + optionText + "</option>"
						);
					});
				} else {
					console.log("No members found");
				}
			},
			error: function(err) {
				console.error("Error fetching members", err);
			},
		});
		
		$("#guarantorcustomerCode").on("change", function() {
					var memberCode = $(this).val();
					if (memberCode) {
						$.ajax({
							url: "api/securedGoldLoan/getByMemberCodeGoldLoan",
							type: "GET",
							data: { memberCode: memberCode },
							success: function(response) {
								if (response && response.data && response.data.length > 0) {
									var code = response.data[0]; // assuming first record

									// Populate form fields
									$("#guarantorAddress").val(code.customerAddress || "");
									$("#guarantorPinCode").val(code.pinCode || "");
									$("#guarantorContactNo").val(code.contactNo || "");
									
									

								} else {
									alert("No details found for this member");
								}
							},
							error: function(err) {
								console.error("Error fetching customer details", err);
							},
						});
					} else {
						// clear fields if no member selected
						$("#customerName, #dateOfBirth, #age, #contactNo, #address, #pinCode, #branchName").val("");
					}
				});*/


	// 75% Loan to Value fixed

	$.ajax({
		url: 'api/financialconsultant/getAllFinancialConsultantDetails',
		type: 'POST',
		success: function(response) {
			var select = $('#financialConsultantId');
			select.empty(); // Clear existing options
			select.append('<option value="">Select Financial Consultant</option>');

			if (response && response.data && response.data.length > 0) {
				response.data.forEach(function(fc) {
					// Use financialCode as value, financialConsultantName as text
					select.append('<option value="' + fc.financialCode + '">' + fc.financialCode + "-" + fc.financialName + '</option>');
				});
			} else {
				console.log("No financial consultants found");
			}
		},
		error: function(err) {
			console.error("Error fetching financial consultants", err);
		}
	});

	$("#financialConsultantId").on("change", function() {
		var financialCode = $(this).val();
		if (financialCode) {
			$.ajax({
				url: "api/financialconsultant/getfinancialHierarchyByFinancialCode",
				type: "GET",
				data: { financialCode: financialCode },
				success: function(response) {
					if (response && response.data && response.data.length > 0) {
						var code = response.data[0]; // assuming first record

						// Populate form fields
						$("#financialConsultantName").val(code.financialName || "");
					} else {
						alert("No details found for this member");
					}
				},
				error: function(err) {
					console.error("Error fetching Financial details", err);
				},
			});
		}
	});

	// Jab bhi user input kare to calculation trigger ho
	$("#itemWt, #itemQty, #stoneWt, #purity, #custgoldRate").on("input", function() {
		calculateValuation();
	});

});

function saveGoldapplication() {

	let isValid = true;

	$('#vmemberCode').text('');
	$('#vpurposeOfLoan').text('');
	$('#vitemQty').text('');
	$('#vitemWt').text('');
	$('#vstoneWt').text('');
	$('#vgurantorIdentity').text('');
	$('#vcoApplicantIdentity').text('');
	$('#vprocessingFee').text('');
	$('#vlegalCharges').text('');
	$('#vstampDuty').text('');
	$('#vsmsCharges').text('');
	$('#vmainCharges').text('');
	$('#vstationaryFee').text('');
	$('#vgst').text('');
	$('#vinsuFee').text('');
	$('#vpenaltyCharge').text('');
	$('#vvaluationFees').text('');
	$('#voverCharge').text('');
	$('#vcollectionCharge').text('');
	$('#vfinancialConsultantId').text('');


	var memberCode = $('#memberCode').val();
	var purposeOfLoan = $('#purposeOfLoan').val().trim();
	var itemQty = $('#itemQty').val().trim();
	var itemWt = $('#itemWt').val().trim();
	var stoneWt = $('#stoneWt').val().trim();
	var gurantorIdentity = $('#gurantorIdentity').val().trim();
	var coApplicantIdentity = $('#coApplicantIdentity').val().trim();
	var processingFee = $('#processingFee').val().trim();
	var legalCharges = $('#legalCharges').val().trim();
	var stampDuty = $('#stampDuty').val().trim();
	var smsCharges = $('#smsCharges').val().trim();
	var mainCharges = $('#mainCharges').val().trim();
	var stationaryFee = $('#stationaryFee').val().trim();
	var gst = $('#gst').val().trim();
	var insuFee = $('#insuFee').val().trim();
	var penaltyCharge = $('#penaltyCharge').val().trim();
	var valuationFees = $('#valuationFees').val().trim();
	var overCharge = $('#overCharge').val().trim();
	var collectionCharge = $('#collectionCharge').val().trim();
	var financialConsultantId = $('#financialConsultantId').val().trim();



	if (memberCode === "") {
		$('#vmemberCode').text('*please select customer code');
		$('#memberCode').focus();
		isValid = false;
	}
	if (purposeOfLoan === "") {
		$('#vpurposeOfLoan').text('*this field is required');
		$('#purposeOfLoan').focus();
		isValid = false;
	}
	if (itemQty === "") {
		$('#vitemQty').text('*this field is required');
		$('#itemQty').focus();
		isValid = false;
	}
	if (itemWt === "") {
		$('#vitemWt').text('*this field is required');
		$('#itemWt').focus();
		isValid = false;
	}
	if (stoneWt === "") {
		$('#vstoneWt').text('*this field is required');
		$('#stoneWt').focus();
		isValid = false;
	}
	if (gurantorIdentity === "") {
		$('#vgurantorIdentity').text('*please select guarantor identity');
		$('#gurantorIdentity').focus();
		isValid = false;
	}
	if (coApplicantIdentity === "") {
		$('#vcoApplicantIdentity').text('*please select coapplicant identity');
		$('#coApplicantIdentity').focus();
		isValid = false;
	}
	if (processingFee === "") {
		$('#vprocessingFee').text('*this field is required');
		$('#processingFee').focus();
		isValid = false;
	}
	if (legalCharges === "") {
		$('#vlegalCharges').text('*this field is required');
		$('#legalCharges').focus();
		isValid = false;
	}
	if (stampDuty === "") {
		$('#vstampDuty').text('*this field is required');
		$('#stampDuty').focus();
		isValid = false;
	}
	if (smsCharges === "") {
		$('#vsmsCharges').text('*this field is required');
		$('#smsCharges').focus();
		isValid = false;
	}
	if (mainCharges === "") {
		$('#vmainCharges').text('*this field is required');
		$('#mainCharges').focus();
		isValid = false;
	}
	if (stationaryFee === "") {
		$('#vstationaryFee').text('*this field is required');
		$('#stationaryFee').focus();
		isValid = false;
	}
	if (gst === "") {
		$('#vgst').text('*this field is required');
		$('#gst').focus();
		isValid = false;
	}
	if (insuFee === "") {
		$('#vinsuFee').text('*this field is required');
		$('#insuFee').focus();
		isValid = false;
	}
	if (penaltyCharge === "") {
		$('#vpenaltyCharge').text('*this field is required');
		$('#penaltyCharge').focus();
		isValid = false;
	}
	if (valuationFees === "") {
		$('#vvaluationFees').text('*this field is required');
		$('#valuationFees').focus();
		isValid = false;
	}
	if (overCharge === "") {
		$('#voverCharge').text('*this field is required');
		$('#overCharge').focus();
		isValid = false;
	}
	if (collectionCharge === "") {
		$('#vcollectionCharge').text('*this field is required');
		$('#collectionCharge').focus();
		isValid = false;
	}
	if (financialConsultantId === "") {
		$('#vfinancialConsultantId').text('*please select financial consultant id');
		$('#financialConsultantId').focus();
		isValid = false;
	}

	if (!isValid) {
		return;
	}

	var applyForGold = {
		goldID: $('#goldID').val(),
		loanDate: $('#loanDate').val(),
		memberCode: $('#memberCode').val(),
		customerName: $('#customerName').val(),
		dateOfBirth: $('#dateOfBirth').val(),
		age: $('#age').val(),
		contactNo: $('#contactNo').val(),
		address: $('#address').val(),
		pinCode: $('#pinCode').val(),
		branchName: $('#branchName').val(),
		loanPlanName: $('#loanPlanName').val(),
		typeOfLoan: $('#typeOfLoan').val(),
		loanMode: $('#loanMode').val(),
		loanTerm: $('#loanTerm').val(),
		rateOfInterest: $('#rateOfInterest').val(),
		loanAmount: $('#loanAmount').val(),
		interestType: $('#interestType').val(),
		emiPayment: $('#emiPayment').val(),
		purposeOfLoan: $('#purposeOfLoan').val(),
		smsSend: $('#toggle-sms-send').val(),

		// Gold Details
		karat: $('#karat').val(),
		itemType: $('#itemType').val(),
		custgoldRate: $('#custgoldRate').val(),
		itemName: $('#itemName').val(),
		lockerBranch: $('#lockerBranch').val(),
		purity: $('#purity').val(),
		itemQty: $('#itemQty').val(),
		itemWt: $('#itemWt').val(),
		grossWt: $('#grossWt').val(),
		stoneWt: $('#stoneWt').val(),
		netWt: $('#netWt').val(),
		marketValuation: $('#marketValuation').val(),
		eligibleLoan: $('#eligibleLoan').val(),

		// Guarantor Details
		guarantorcustomerCode: $('#guarantorcustomerCode').val(),
		guarantorIdentity: $('#gurantorIdentity').val(),
		guarantorAddress: $('#guarantorAddress').val(),
		guarantorPinCode: $('#guarantorPinCode').val(),
		guarantorContactNo: $('#guarantorContactNo').val(),
		guarantorSecurityType: $('#guarantorSecurityType').val(),

		// Co-Applicant Details
		coApplicantMemberId: $('#coApplicantMemberId').val(),
		coApplicantIdentity: $('#coApplicantIdentity').val(),
		coApplicantAddress: $('#coApplicantAddress').val(),
		coAge: $('#coAge').val(),
		coApplicantContactNo: $('#coApplicantContactNo').val(),
		securityDetails: $('#securityDetails').val(),

		// Deduction / Charges
		processingFee: $('#processingFee').val(),
		legalCharges: $('#legalCharges').val(),
		stampDuty: $('#stampDuty').val(),
		smsCharges: $('#smsCharges').val(),
		mainCharges: $('#mainCharges').val(),
		stationaryFee: $('#stationaryFee').val(),
		financialConsultantId: $('#financialConsultantId').val(),
		gst: $('#gst').val(),
		insuFee: $('#insuFee').val(),
		penaltyCharge: $('#penaltyCharge').val(),
		valuationFees: $('#valuationFees').val(),
		overCharge: $('#overCharge').val(),
		collectionCharge: $('#collectionCharge').val(),
		financialConsultantName: $('#financialConsultantName').val(),

		// Image Fields
		photo: $('#photoHidden').val(),
		signature: $('#signatureHidden').val()
	};


	$.ajax({
		url: 'api/securedGoldLoan/saveApplyForGold',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(applyForGold),
		success: function(response) {
			if (response.status === 'CREATED') {
				alert("Gold Application Saved Successfully! " + "\n" + "GoldID : " + applyForGold.goldID);
				location.reload();
			} else {
				alert('❌ Failed: ' + response.message);
			}
		},
		error: function(xhr, status, error) {
			console.error('Error:', error);
			alert('⚠️ Error while saving Gold Loan Application.');
		}
	});

}


function calculateValuation() {

	let itemQuantity = parseFloat($("#itemQty").val()) || 0;
	let itemWeight = parseFloat($("#itemWt").val()) || 0;
	let stoneWeight = parseFloat($("#stoneWt").val()) || 0;
	let karat = parseFloat($("#karat").val()) || 0;  // example: 91.6
	let customerKaratRate = parseFloat($("#custgoldRate").val()) || 0;

	// Gross Weight
	let grossWeight = itemQuantity * itemWeight;

	// Net Weight
	let netWeight = grossWeight - stoneWeight;
	netWeight = Math.max(netWeight, 0);


	let purity = karat / 24;

	// Market Valuation
	let marketValuation = netWeight * purity * customerKaratRate;

	// Eligible Loan (75% LTV)
	const LTV = 0.75;
	let eligibleLoan = marketValuation * LTV;

	// Set values
	$("#grossWt").val(grossWeight.toFixed(2));
	$("#netWt").val(netWeight.toFixed(2));
	$("#marketValuation").val(marketValuation.toFixed(2));
	$("#eligibleLoan").val(eligibleLoan.toFixed(2));
}

function photoSizeEdit(e) {
	const previewimg = document.getElementById("photoPreview");
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
}

function signatureSizeEdit(e) {
	const previewimg = document.getElementById("signaturePreview");
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
}

function photoUpload() {
	const file = document.getElementById("photo").files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function(e) {
			photoSizeEdit(e);
			$("#photoHidden").val("");

		};
		reader.readAsDataURL(file);
	} else {
		alert("Please upload a valid image file for photo.");
	}
}



function signatureUpload() {
	const file = document.getElementById("signature").files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function(e) {
			signatureSizeEdit(e);
			$("#signatureHidden").val("");
		};
		reader.readAsDataURL(file);
	} else {
		alert("Please upload a valid image file for signature.");
	}
}

function updateToggleColor(input) {
	const label = input.nextElementSibling;
	if (input.checked) {
		label.style.backgroundColor = "#4caf50";  // green
		label.style.borderColor = "#4caf50";
	} else {
		label.style.backgroundColor = "#ccc";  // gray
		label.style.borderColor = "#ccc";
	}
}
