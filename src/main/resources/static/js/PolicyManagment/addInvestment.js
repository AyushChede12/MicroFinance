$(document).ready(function() {

	$("#fdSplitSection").hide();

	$.ajax({

		url: 'api/customermanagement/approved',
		type: 'GET',

		success: function(response) {

			if (response.status === "OK" && Array.isArray(response.data)) {

				const $select = $('#selectCustomer');

				$select.empty().append(
					'<option value="">SELECT CUSTOMER</option>'
				);

				response.data.forEach(customer => {

					const fullName = [
						customer.firstName,
						customer.middleName,
						customer.lastName
					]
						.filter(name => name && name.trim() !== "")
						.join(" ");

					if (fullName && customer.memberCode) {

						const optionText =
							`${fullName.toUpperCase()} - ${customer.memberCode}`;

						const optionValue =
							customer.memberCode;

						$select.append(
							`<option value="${optionValue}">
								${optionText}
							</option>`
						);
					}
				});

			} else {

				alert("No approved customers found.");

			}
		},

		error: function() {

			alert("Failed to fetch approved customers.");

		}
	});

});



function fetchBySelectedCustomer() {

	const memberCode = $("#selectCustomer").val();

	if (!memberCode)
		return;

	const input = {
		memberCode
	};

	$.ajax({

		type: "POST",

		contentType: "application/json",

		data: JSON.stringify(input),

		url: "api/customermanagement/fetchBySelectedCustomer",

		success: function(data) {

			if (data && data.length > 0) {

				const c = data[0];

				$("#customerName").val(
					[
						c.firstName,
						c.middleName,
						c.lastName
					]
						.filter(name => name && name.trim() !== "")
						.join(" ")
				);

				$("#memberCode").val(c.memberCode || "");
				$("#contactNo").val(c.contactNo || "");
				$("#singupDate").val(c.signupDate || "");
				$("#aadharNo").val(c.aadharNo || "");
				$("#pan").val(c.panNo || "");
				$("#state").val(c.state || "");
				$("#district").val(c.district || "");
				$("#drivingLicenceNo").val(c.drivingLicenceNo || "");
				$("#voterNo").val(c.voterNo || "");
				$("#relationDetails").val(c.guardianName || "");
				$("#address").val(c.customerAddress || "");
				$("#pinCode").val(c.pinCode || "");
				$("#suggestedNominee").val(c.nomineeName || "");
				$("#emailId").val(c.emailId || "");
				$("#dateofBirth").val(c.dob || "");
				$("#ageOfNominee").val(c.nomineeAge || "");
				$("#branchName").val(c.branchName || "");
				$("#relation").val(c.relationToApplicant || "");

				// Photo

				if (c.customerPhoto) {

					const photoPath =
						`Uploads/${c.customerPhoto}`;

					$("#photoPreview")
						.attr("src", photoPath);

					$("#photoHidden")
						.val(photoPath);

					photoSizeEdit({
						target: {
							result: photoPath
						}
					});

				} else {

					$("#photoPreview")
						.attr(
							"src",
							"Uploads/default-placeholder.jpg"
						);

					$("#photoHidden").val("");
				}

				// Signature

				if (c.customerSignature) {

					const signPath =
						`Uploads/${c.customerSignature}`;

					$("#signaturePreview")
						.attr("src", signPath);

					$("#signatureHidden")
						.val(signPath);

					signatureSizeEdit({
						target: {
							result: signPath
						}
					});

				} else {

					$("#signaturePreview")
						.attr(
							"src",
							"Uploads/default-placeholder.jpg"
						);

					$("#signatureHidden").val("");
				}

			} else {

				alert(
					"No data found for the selected member."
				);

				clearCustomerFields();
			}
		},

		error: function(
			jqXHR,
			textStatus,
			errorThrown
		) {

			alert(
				"Failed to fetch data: " +
				textStatus +
				", " +
				errorThrown
			);
		}
	});
}



$(document).ready(function() {

	if ($("#selectCustomer").val()) {

		fetchBySelectedCustomer();

	}

	$("#selectCustomer").on(
		"change",
		function() {

			if ($(this).val()) {

				fetchBySelectedCustomer();

			} else {

				clearCustomerFields();

			}
		}
	);

});



/*
 * SCHEME TYPE
 *
 * IMPORTANT:
 * Only ONE change event is registered here.
 * Duplicate handler removed.
 */

$(document).ready(function() {

	$("#schemeType").on(
		"change",
		function() {

			getSchemeNameBySchemeType();

			updateSchemeMode();

		}
	);

	if ($("#schemeType").val()) {

		getSchemeNameBySchemeType();

		updateSchemeMode();

	}

});



function getSchemeNameBySchemeType() {

	var selectedSchemeType =
		$("#schemeType").val();

	console.log(
		"Selected Scheme Type:",
		selectedSchemeType
	);

	var requestData = {};

	if (selectedSchemeType === "DRD") {

		$("#fdSplitSection").hide();

		requestData.drd =
			selectedSchemeType;

	} else if (selectedSchemeType === "RD") {

		$("#fdSplitSection").hide();

		requestData.rd =
			selectedSchemeType;

	} else if (selectedSchemeType === "FD") {

		$("#fdSplitSection").show();

		requestData.fd =
			selectedSchemeType;

	}

	$.ajax({

		type: "GET",

		url:
			"api/Policymangment/getSchemeNameBySchemeType",

		data: requestData,

		success: function(response) {

			console.log(
				"Response received:",
				response
			);

			$("#schemeName")
				.empty()
				.append(
					`<option value="">
						SELECT SCHEME MODE
					</option>`
				);

			if (response.allBrands) {

				response.allBrands.forEach(
					function(planNameDD) {

						$("#schemeName").append(
							`<option value="${planNameDD}">
								${planNameDD.toUpperCase()}
							</option>`
						);

					}
				);
			}

			if (response.allRds) {

				response.allRds.forEach(
					function(planNameRD) {

						$("#schemeName").append(
							`<option value="${planNameRD}">
								${planNameRD.toUpperCase()}
							</option>`
						);

					}
				);
			}

			if (response.allFRDs) {

				response.allFRDs.forEach(
					function(planNameFD) {

						$("#schemeName").append(
							`<option value="${planNameFD}">
								${planNameFD.toUpperCase()}
							</option>`
						);

					}
				);
			}

			if (response.allMISRDs) {

				response.allMISRDs.forEach(
					function(planNameMD) {

						$("#schemeName").append(
							`<option value="${planNameMD}">
								${planNameMD.toUpperCase()}
							</option>`
						);

					}
				);
			}
		},

		error: function(
			xhr,
			status,
			error
		) {

			console.error(
				`Error fetching schemes (Status: ${status}):`,
				error
			);

			alert(
				"An error occurred while fetching scheme data. Please try again."
			);
		}
	});
}



function updateSchemeMode() {

	var schemeType =
		$("#schemeType").val();

	var schemeModeDropdown =
		$("#schemeMode");

	var schemeModes = {

		"RD": "MONTHLY",

		"FD": "YEARLY",

		"DRD": "DAILY"

	};

	schemeModeDropdown.empty();

	if (
		schemeType &&
		schemeModes[schemeType]
	) {

		schemeModeDropdown.append(
			new Option(
				schemeModes[schemeType],
				schemeModes[schemeType]
			)
		);

	} else {

		schemeModeDropdown.append(
			new Option(
				"Select",
				""
			)
		);
	}

}



$(document).ready(function() {

	const today = new Date();

	const formattedToday =
		today.toISOString()
			.split("T")[0];

	$("#policyStartDate")
		.val(formattedToday);

	$("#schemeName").on(
		"change",
		function() {

			fetchTermBySchemeName();

		}
	);

	$("#policyStartDate").on(
		"change",
		function() {

			displayMaturityDate();

		}
	);

});



function fetchTermBySchemeName() {

	const selectedSchemeName =
		$("#schemeName").val();

	const schemeType =
		$("#schemeType").val();

	if (!selectedSchemeName) {

		$("#schemeTerm").val("");
		$("#roi").val("");
		$("#depositAmount").val("");
		$("#maturityAmount").val("");
		$("#maturityDate").val("");

		return;
	}

	let apiUrl = "";

	let dataParam = {};

	let termField = "";

	let interestRateField = "";

	let planCodeField = "";

	switch (schemeType) {

		case "DRD":

			apiUrl =
				"api/Policymangment/ddterm";

			dataParam = {
				planNameDD:
					selectedSchemeName
			};

			termField =
				"ddterm";

			interestRateField =
				"rateOfInterest";

			planCodeField =
				"planCodeDD";

			break;


		case "RD":

			apiUrl =
				"api/Policymangment/rdterm";

			dataParam = {
				planNameRD:
					selectedSchemeName
			};

			termField =
				"rdterm";

			interestRateField =
				"rateOfInterestRD";

			planCodeField =
				"planCodeRD";

			break;


		case "FD":

			apiUrl =
				"api/Policymangment/fdterm";

			dataParam = {
				planNameFD:
					selectedSchemeName
			};

			termField =
				"fdterm";

			interestRateField =
				"rateOfInterestFD";

			planCodeField =
				"planCodeFD";

			break;


		case "MIS":

			apiUrl =
				"api/Policymangment/misterm";

			dataParam = {
				planNameMD:
					selectedSchemeName
			};

			termField =
				"misterm";

			interestRateField =
				"rateOfInterestMD";

			planCodeField =
				"planCodeMD";

			break;


		default:

			alert(
				"Invalid scheme type selected."
			);

			return;
	}

	$.ajax({

		type: "GET",

		url: apiUrl,

		data: dataParam,

		dataType: "json",

		success: function(response) {

			let data =
				response.data ||
				response;

			if (data) {

				const term =
					data[termField] || "";

				const roi =
					data[interestRateField] || "";

				const hiddenSchemeCode =
					data[planCodeField] || "";

				$("#schemeTerm")
					.val(term);

				$("#roi")
					.val(roi);

				$("#hiddenSchemeCode")
					.val(hiddenSchemeCode);

				updateSchemeMode();

				setTimeout(
					() => {

						displayMaturityDate();

						calculateDepositAndMaturity();

					},
					100
				);

			} else {

				alert(
					"No scheme data found."
				);
			}
		},

		error: function(
			xhr,
			status,
			error
		) {

			console.error(
				"Error fetching scheme data:",
				error
			);

			alert(
				"Error fetching scheme data. Please try again."
			);
		}
	});
}



// Determine schemeMode from schemeType

function getSchemeMode(schemeType) {

	switch (schemeType) {

		case "DRD":
			return "DAILY";

		case "RD":
			return "MONTHLY";

		case "FD":
			return "YEARLY";

		default:
			return "";
	}
}



function displayMaturityDate() {

	const start =
		$("#policyStartDate").val();

	const mode =
		$("#schemeMode").val();

	const term =
		parseInt(
			$("#schemeTerm").val()
		);

	console.log(
		"Maturity Calculation Triggered",
		{
			start,
			mode,
			term
		}
	);

	if (
		!start ||
		!mode ||
		isNaN(term)
	) {

		$("#maturityDate").val("");

		return;
	}

	const startDate =
		new Date(start);

	let maturityDate =
		new Date(startDate);


	/*
	 * IMPORTANT:
	 * Values are uppercase because
	 * updateSchemeMode() creates
	 * DAILY / MONTHLY / YEARLY.
	 */

	if (mode === "DAILY") {

		maturityDate.setDate(
			maturityDate.getDate() +
			term
		);

	} else if (mode === "MONTHLY") {

		maturityDate.setMonth(
			maturityDate.getMonth() +
			term
		);

	} else if (mode === "YEARLY") {

		maturityDate.setFullYear(
			maturityDate.getFullYear() +
			term
		);
	}

	const yyyy =
		maturityDate.getFullYear();

	const mm =
		String(
			maturityDate.getMonth() + 1
		).padStart(2, '0');

	const dd =
		String(
			maturityDate.getDate()
		).padStart(2, '0');

	const finalDate =
		`${yyyy}-${mm}-${dd}`;

	$("#maturityDate")
		.val(finalDate);
}



$(document).ready(function() {

	$("#policyAmount, #schemeTerm, #schemeMode, #roi")
		.on(
			"change keyup",
			function() {

				calculateDepositAndMaturity();

			}
		);

});



function calculateDepositAndMaturity() {

	const policyAmount =
		parseFloat(
			$("#policyAmount").val()
		);

	const term =
		parseInt(
			$("#schemeTerm").val()
		);

	const schemeMode =
		$("#schemeMode").val();

	const roi =
		parseFloat(
			$("#roi").val()
		);

	if (
		isNaN(policyAmount) ||
		isNaN(term) ||
		!schemeMode ||
		isNaN(roi)
	) {

		$("#depositAmount").val("");

		$("#maturityAmount").val("");

		return;
	}

	let maturityAmount = 0;

	let totalDepositAmount = 0;

	let n = 0;

	let r = roi / 100;


	// ------------------------------------
	// DAILY DEPOSIT
	// ------------------------------------

	if (schemeMode === "DAILY") {

		const days = term;

		totalDepositAmount =
			policyAmount * days;

		const interest =
			policyAmount *
			((days * (days + 1)) / 2) *
			(roi / (365 * 100));

		maturityAmount =
			totalDepositAmount +
			interest;
	}


	// ------------------------------------
	// RECURRING DEPOSIT
	// ------------------------------------

	else if (schemeMode === "MONTHLY") {

		const months = term;

		totalDepositAmount =
			policyAmount * months;

		const interest =
			policyAmount *
			((months * (months + 1)) / 2) *
			(roi / (12 * 100));

		maturityAmount =
			totalDepositAmount +
			interest;
	}


	// ------------------------------------
	// FD
	// ------------------------------------

	else if (schemeMode === "YEARLY") {

		/*
		 * FD = single deposit
		 */

		n = 1;

		totalDepositAmount =
			policyAmount;

		const maturity =
			policyAmount *
			Math.pow(
				1 + (r / n),
				(n * term)
			);

		maturityAmount =
			maturity;
	}


	// ------------------------------------
	// Other FD modes
	// ------------------------------------

	else {

		switch (schemeMode) {

			case "Quarterly":

				n = 4;

				break;

			case "Half-Yearly":

				n = 2;

				break;

			case "Yearly":

				n = 1;

				break;

			default:

				n = 1;

				break;
		}

		totalDepositAmount =
			policyAmount;

		const maturity =
			policyAmount *
			Math.pow(
				1 + (r / n),
				(n * term)
			);

		maturityAmount =
			maturity;
	}


	$("#depositAmount")
		.val(
			totalDepositAmount.toFixed(2)
		);

	$("#maturityAmount")
		.val(
			maturityAmount.toFixed(2)
		);
}



$("#saveBtn").click(function(e) {

	e.preventDefault();

	var c =
		$("#schemeName").val();

	console.log(
		"Selected Scheme:",
		c
	);

	const schemeType =
		$("#schemeType").val();

	if (!schemeType) {

		alert(
			"Please select a Scheme Type first."
		);

		return;
	}



	/*
	 * FD VALIDATION
	 *
	 * Only FD requires split validation.
	 */
	if (
		schemeType === "FD" &&
		typeof isFDSplitValid === "function"
	) {

		if (!isFDSplitValid()) {

			alert(
				"Please complete the FD split allocation before saving."
			);

			return;
		}
	}



	// Photo
	let imageSrc =
		$('#photoPreview').attr('src');

	let imageName =
		imageSrc ?
			imageSrc.split('/').pop() :
			"";

	$('#photoHidden')
		.val(imageName);



	// Signature
	let imageSrc1 =
		$('#signaturePreview').attr('src');

	let imageName1 =
		imageSrc1 ?
			imageSrc1.split('/').pop() :
			"";

	$('#signatureHidden')
		.val(imageName1);



	// Step 1:
	// Get next policy code
	$.ajax({

		url:
			"api/Policymangment/getNextPolicyCode",

		type: "GET",

		data: {
			schemeType:
				schemeType
		},

		success: function(policyCode) {

			$("#policyCode")
				.val(policyCode);



			// Step 2:
			// Prepare FormData
			let formData =
				new FormData();

			formData.append(
				"policyCode",
				policyCode
			);

			formData.append(
				"policyStartDate",
				$("#policyStartDate").val()
			);

			formData.append(
				"memberSelection",
				$("#selectCustomer").val()
			);

			formData.append(
				"customerName",
				$("#customerName").val()
			);

			formData.append(
				"dateofBirth",
				$("#dateofBirth").val()
			);

			formData.append(
				"relationDetails",
				$("#relationDetails").val()
			);

			formData.append(
				"contactNo",
				$("#contactNo").val()
			);

			formData.append(
				"suggestedNominee",
				$("#suggestedNominee").val()
			);

			formData.append(
				"ageOfNominee",
				$("#ageOfNominee").val()
			);

			formData.append(
				"relation",
				$("#relation").val()
			);

			formData.append(
				"address",
				$("#address").val()
			);

			formData.append(
				"district",
				$("#district").val()
			);

			formData.append(
				"state",
				$("#state").val()
			);

			formData.append(
				"pinCode",
				$("#pinCode").val()
			);

			formData.append(
				"tds",
				$("#tds").val()
			);

			formData.append(
				"branchName",
				$("#branchName").val()
			);

			formData.append(
				"modeOfOperation",
				$("#ModeOfOperation").val()
			);

			formData.append(
				"jointName",
				$("#jointName").val()
			);

			formData.append(
				"jointMemCode",
				$("#jointMemCode").val()
			);

			formData.append(
				"schemeType",
				$("#schemeType").val()
			);

			formData.append(
				"schemeTerm",
				$("#schemeTerm").val()
			);

			formData.append(
				"schemeName",
				$("#schemeName").val()
			);

			formData.append(
				"schemeMode",
				$("#schemeMode").val()
			);

			formData.append(
				"schemeCode",
				$("#hiddenSchemeCode").val()
			);

			formData.append(
				"roi",
				$("#roi").val()
			);

			formData.append(
				"maturityDate",
				$("#maturityDate").val()
			);

			formData.append(
				"policyAmount",
				$("#policyAmount").val()
			);

			formData.append(
				"depositAmount",
				$("#depositAmount").val()
			);

			formData.append(
				"fdSplitAmounts",
				$("#schemeType").val() === "FD"
					? getFDSplitJSON()
					: ""
			);



			// =====================================================
			// PAID AMOUNT
			// =====================================================
			// Policy Creation ke time payment nahi hua hai.
			// Isliye RD / DRD / FD tino ke liye 0.00.
			// Actual payment Payment Form se update hoga.
			// =====================================================

			formData.append(
				"paidAmount",
				"0.00"
			);



			// =====================================================
			// AMOUNT DUE
			// =====================================================

			const depositAmount =
				parseFloat(
					$("#depositAmount").val()
				) || 0;

			const policyAmount =
				parseFloat(
					$("#policyAmount").val()
				) || 0;



			if (schemeType === "FD") {	

				// =============================================
				// FD
				// =============================================
				// First FD split is the first payment due.
				//
				// Example:
				// [300000, 300000, 300000, 100000]
				//
				// Initial Amount Due = 300000
				// =============================================

				let fdSplitJSON =
					getFDSplitJSON();

				let fdSplitAmounts = [];

				try {

					fdSplitAmounts =
						JSON.parse(fdSplitJSON);

				} catch (error) {

					alert(
						"Invalid FD split allocation."
					);

					return;
				}



				if (
					!Array.isArray(fdSplitAmounts) ||
					fdSplitAmounts.length === 0
				) {

					alert(
						"FD split amounts are required."
					);

					return;
				}



				const firstFDSplit =
					parseFloat(
						fdSplitAmounts[0]
					) || 0;



				if (firstFDSplit <= 0) {

					alert(
						"Invalid first FD split amount."
					);

					return;
				}

				formData.append(
					"amountDue",
					firstFDSplit.toFixed(2)
				);

			} else {

				// =============================================
				// RD / DRD
				// =============================================

				formData.append(
					"amountDue",
					(
						depositAmount -
						policyAmount
					).toFixed(2)
				);
			}



			formData.append(
				"introMCode",
				$("#introMCode").val()
			);

			formData.append(
				"maturityAmount",
				$("#maturityAmount").val()
			);

			formData.append(
				"paymentBy",
				$("#paymentBy").val()
			);

			formData.append(
				"remark",
				$("#remark").val()
			);

			formData.append(
				"agent",
				$("#Agent").val()
			);

			formData.append(
				"smsSend",
				$('#toggle-sms-send')
					.is(':checked')
					? "1"
					: "0"
			);



			// =====================================================
			// INITIAL INSTALLMENT PAID
			// =====================================================
			// Policy Creation ke time koi installment paid nahi hai.
			// =====================================================

			formData.append(
				"lastInstPaid",
				"0"
			);



			formData.append(
				"image1",
				$('#photoHidden').val()
			);

			formData.append(
				"image2",
				$('#signatureHidden').val()
			);



			/*
			 * FD SPLIT DATA
			 *
			 * Only added for FD.
			 * Other schemes remain unchanged.
			 */

			if (
				schemeType === "FD" &&
				typeof getFDSplitJSON === "function"
			) {

				formData.append(
					"fdSplitJSON",
					getFDSplitJSON()
				);
			}
			
			// Step 3:
			// Send POST request
			$.ajax({

				url:
					"api/Policymangment/saveandupdateAddInvestment",

				type: "POST",

				data: formData,

				processData: false,

				contentType: false,

				success: function(response) {

					alert(
						"✅ " +
						response.message
					);

					location.reload();
				},

				error: function(xhr) {

					alert(
						"❌ Error: " +
						(
							xhr.responseJSON?.message ||
							"Something went wrong."
						)
					);

					location.reload();
				}
			});
		},

		error: function() {

			alert(
				"❌ Failed to generate policy code."
			);
		}
	});

});



$(document).ready(function() {

	$.ajax({

		url:
			"api/financialconsultant/getAllFinancialConsultantDetails",

		type: "POST",

		success: function(response) {

			const consultants =
				response.data;

			const $agentDropdown =
				$("#Agent");

			$agentDropdown.empty();

			$agentDropdown.append(
				'<option value="">SELECT AGENT</option>'
			);

			const addedCodes =
				new Set();

			consultants.forEach(
				consultant => {

					const code =
						consultant.financialCode;

					const name =
						consultant.financialName.toUpperCase();

					if (
						code &&
						code.trim() !== "" &&
						code.trim()
							.toLowerCase() !==
						"undefined"
					) {

						if (
							!addedCodes.has(code)
						) {

							$agentDropdown.append(
								`<option value="${code}">
									${code} - ${name}
								</option>`
							);

							addedCodes.add(code);
						}
					}
				}
			);
		},

		error: function(
			xhr,
			status,
			error
		) {

			console.error(
				"Failed to fetch financial consultant details:",
				error
			);
		}
	});

});



function photopreview() {

	const file =
		document.getElementById("photo")
			.files[0];

	if (
		file &&
		file.type.startsWith("image/")
	) {

		const reader =
			new FileReader();

		reader.onload =
			function(e) {

				const previewimg =
					document.getElementById(
						"bike1imagePreview"
					);

				document.getElementById(
					"bike1imagePreview"
				).src =
					e.target.result;

				previewimg.style.width =
					"100%";

				previewimg.style.height =
					"100%";

				previewimg.style.objectFit =
					"cover";

				previewimg.style.overflow =
					"hidden";

				previewimg.style.borderRadius =
					"20px";
			};

		reader.readAsDataURL(file);

	} else {

		alert(
			"Please upload a valid image file for photo."
		);
	}
}



function signpreview() {

	const file =
		document.getElementById("signature")
			.files[0];

	if (
		file &&
		file.type.startsWith("image/")
	) {

		const reader =
			new FileReader();

		reader.onload =
			function(e) {

				const previevimg =
					document.getElementById(
						"bike2imagePreview"
					);

				document.getElementById(
					"bike2imagePreview"
				).src =
					e.target.result;

				previevimg.style.width =
					"100%";

				previevimg.style.height =
					"100%";

				previevimg.style.objectFit =
					"cover";

				previevimg.style.overflow =
					"hidden";

				previevimg.style.borderRadius =
					"20px";
			};

		reader.readAsDataURL(file);

	} else {

		alert(
			"Please upload a valid image file for signature."
		);
	}
}



function photoUpload() {

	const file =
		document.getElementById("photo")
			.files[0];

	if (
		file &&
		file.type.startsWith("image/")
	) {

		const reader =
			new FileReader();

		reader.onload =
			function(e) {

				photoSizeEdit(e);

				$("#photoHidden")
					.val("");
			};

		reader.readAsDataURL(file);

	} else {

		alert(
			"Please upload a valid image file for photo."
		);
	}
}



function signatureUpload() {

	const file =
		document.getElementById("signature")
			.files[0];

	if (
		file &&
		file.type.startsWith("image/")
	) {

		const reader =
			new FileReader();

		reader.onload =
			function(e) {

				signatureSizeEdit(e);

				$("#signatureHidden")
					.val("");
			};

		reader.readAsDataURL(file);

	} else {

		alert(
			"Please upload a valid image file for signature."
		);
	}
}



function photoSizeEdit(e) {

	const previewimg =
		document.getElementById(
			"photoPreview"
		);

	previewimg.src =
		e.target.result;

	previewimg.style.width =
		"100%";

	previewimg.style.height =
		"100%";

	previewimg.style.objectFit =
		"cover";

	previewimg.style.overflow =
		"hidden";

	previewimg.style.borderRadius =
		"20px";
}



function signatureSizeEdit(e) {

	const previewimg =
		document.getElementById(
			"signaturePreview"
		);

	previewimg.src =
		e.target.result;

	previewimg.style.width =
		"100%";

	previewimg.style.height =
		"100%";

	previewimg.style.objectFit =
		"cover";

	previewimg.style.overflow =
		"hidden";

	previewimg.style.borderRadius =
		"20px";
}



document.addEventListener(
	'DOMContentLoaded',
	function() {

		const toggles =
			document.querySelectorAll(
				'.toggle__input'
			);

		toggles.forEach(
			(toggle) => {

				updateToggleColor(toggle);

				toggle.addEventListener(
					'change',
					() => {

						updateToggleColor(
							toggle
						);

						console.log(
							`${toggle.dataset.toggleType} is now ${toggle.checked}`
						);
					}
				);
			}
		);


		function updateToggleColor(input) {

			const label =
				input.nextElementSibling;

			if (label) {

				label.style.backgroundColor =
					input.checked
						? '#28a745'
						: '#ccc';
			}
		}

	}
);



// ============================================================
// FD SPLIT LOGIC
// ============================================================

$(document).ready(function() {


	// --------------------------------------------------------
	// Scheme Type Change
	// --------------------------------------------------------

	$("#schemeType").on(
		"change.fdSplit",
		function() {

			const schemeType =
				$(this).val();

			if (schemeType === "FD") {

				$("#fdSplitSection").show();

				updateFDTotal();

			} else {

				$("#fdSplitSection").hide();

			}
		}
	);


	// --------------------------------------------------------
	// Policy Amount Change
	// --------------------------------------------------------

	$("#policyAmount").on(
		"input.fdSplit",
		function() {

			if (
				$("#schemeType").val() ===
				"FD"
			) {

				updateFDTotal();

			}
		}
	);


	// --------------------------------------------------------
	// Add FD
	// --------------------------------------------------------

	$("#addFDButton").on(
		"click.fdSplit",
		function() {

			const row = `

				<div class="row fd-split-row mb-2">

					<div class="col-lg-8">

						<label>
							FD AMOUNT
						</label>

						<input
							type="number"
							class="form-control fd-amount"
							placeholder="ENTER FD AMOUNT"
							min="1"
							step="0.01"
						/>

					</div>

					<div class="col-lg-4 d-flex align-items-end">

						<button
							type="button"
							class="btn btn-danger remove-fd"
						>
							REMOVE
						</button>

					</div>

				</div>

			`;

			$("#fdSplitContainer")
				.append(row);

			calculateFDSplit();
		}
	);


	// --------------------------------------------------------
	// Remove FD
	// --------------------------------------------------------

	$(document).on(
		"click.fdSplit",
		".remove-fd",
		function() {

			const totalRows =
				$(".fd-split-row").length;

			if (totalRows <= 1) {

				alert(
					"At least one FD amount is required."
				);

				return;
			}

			$(this)
				.closest(".fd-split-row")
				.remove();

			calculateFDSplit();
		}
	);


	// --------------------------------------------------------
	// FD Amount Change
	// --------------------------------------------------------

	$(document).on(
		"input.fdSplit",
		".fd-amount",
		function() {

			calculateFDSplit();

		}
	);


	// --------------------------------------------------------
	// Update FD Total
	// --------------------------------------------------------

	function updateFDTotal() {

		const totalAmount =
			parseFloat(
				$("#policyAmount").val()
			) || 0;

		$("#fdTotalPolicyAmount")
			.val(
				totalAmount.toFixed(2)
			);

		$("#fdSplitTotalAmount")
			.val(
				totalAmount.toFixed(2)
			);

		calculateFDSplit();
	}


	// --------------------------------------------------------
	// Calculate FD Split
	// --------------------------------------------------------

	function calculateFDSplit() {

		if (
			$("#schemeType").val() !==
			"FD"
		) {

			return false;
		}

		const totalAmount =
			parseFloat(
				$("#policyAmount").val()
			) || 0;

		let allocatedAmount = 0;


		$(".fd-amount").each(
			function() {

				const amount =
					parseFloat(
						$(this).val()
					) || 0;

				allocatedAmount +=
					amount;
			}
		);


		const remainingAmount =
			totalAmount -
			allocatedAmount;


		// Display

		$("#fdTotalPolicyAmount")
			.val(
				totalAmount.toFixed(2)
			);

		$("#fdSplitTotalAmount")
			.val(
				totalAmount.toFixed(2)
			);

		$("#fdAllocatedAmount")
			.val(
				allocatedAmount.toFixed(2)
			);

		$("#fdRemainingAmount")
			.val(
				Math.max(
					remainingAmount,
					0
				).toFixed(2)
			);


		// No Policy Amount

		if (totalAmount <= 0) {

			showFDStatus(
				"Please enter Policy Amount first.",
				"warning"
			);

			$("#depositAmount").val("");

			return false;
		}


		// No FD Allocation

		if (allocatedAmount <= 0) {

			showFDStatus(
				"Please enter FD split amount.",
				"warning"
			);

			$("#depositAmount").val("");

			return false;
		}


		// Exceeded

		if (
			allocatedAmount >
			totalAmount
		) {

			const exceeded =
				allocatedAmount -
				totalAmount;

			showFDStatus(
				"FD allocation exceeds total amount by ₹" +
				exceeded.toFixed(2),
				"danger"
			);

			$("#depositAmount").val("");

			return false;
		}


		// Remaining

		if (
			allocatedAmount <
			totalAmount
		) {

			showFDStatus(
				"₹" +
				remainingAmount.toFixed(2) +
				" amount is still remaining.",
				"warning"
			);

			$("#depositAmount").val("");

			return false;
		}


		// Valid

		if (
			Math.abs(
				allocatedAmount -
				totalAmount
			) < 0.01
		) {

			showFDStatus(
				"FD split is valid. Total amount is fully allocated.",
				"success"
			);


			/*
			 * Deposit Amount =
			 * Total FD Amount
			 */

			$("#depositAmount")
				.val(
					totalAmount.toFixed(2)
				);

			return true;
		}

		return false;
	}


	// --------------------------------------------------------
	// Status Message
	// --------------------------------------------------------

	function showFDStatus(
		message,
		type
	) {

		$("#fdSplitMessage")

			.removeClass(
				"alert-success " +
				"alert-warning " +
				"alert-danger"
			)

			.addClass(
				"alert-" + type
			)

			.text(message)

			.show();
	}


	// --------------------------------------------------------
	// Get FD Split Data
	// --------------------------------------------------------

	window.getFDSplitData =
		function() {

			const splitData = [];

			$(".fd-amount").each(
				function() {

					const amount =
						parseFloat(
							$(this).val()
						) || 0;

					if (amount > 0) {

						splitData.push(
							amount
						);
					}
				}
			);

			return splitData;
		};


	// --------------------------------------------------------
	// Get FD Split JSON
	// --------------------------------------------------------

	window.getFDSplitJSON =
		function() {

			return JSON.stringify(
				getFDSplitData()
			);
		};


	// --------------------------------------------------------
	// Check FD Split Valid
	// --------------------------------------------------------

	window.isFDSplitValid =
		function() {

			if (
				$("#schemeType").val() !==
				"FD"
			) {

				return true;
			}

			const totalAmount =
				parseFloat(
					$("#policyAmount").val()
				) || 0;

			let allocatedAmount = 0;


			$(".fd-amount").each(
				function() {

					allocatedAmount +=
						parseFloat(
							$(this).val()
						) || 0;

				}
			);


			return (

				totalAmount > 0 &&

				Math.abs(
					allocatedAmount -
					totalAmount
				) < 0.01

			);
		};


	// --------------------------------------------------------
	// INITIAL LOAD
	// --------------------------------------------------------

	if (
		$("#schemeType").val() ===
		"FD"
	) {

		$("#fdSplitSection").show();

		updateFDTotal();

	}

});