$(document).ready(function() {
	$("#guardianDetails").hide();
	$("#guardianAccountNo").hide();
	loadCustomerTable();

	// Hide Aadhar field initially
	$("#aadharNo").closest(".col-lg-3").hide();

	$("#authenticateFor").on("change", function() {
		const val = $(this).val();

		if (val === "aadhar") {
			$("#aadharNo").closest(".col-lg-3").show();
			$("#aadharNo").prop("required", true);
		} else {
			$("#aadharNo").closest(".col-lg-3").hide();
			$("#aadharNo").prop("required", false).val("");
		}
	});

	$('#saveBtn').click(function(event) {
		event.preventDefault();

		var authenticate = $("#authenticateFor").val();
		var minor = $("#minor").val();
		var accountNumber = $("#accountNumber").val();
		var accountCode = $("#accountCode").val();

		$("[id^='chk']").text('');

		let isValid = true;

		function validateText(fieldId, chkId, message) {
			const value = $('#' + fieldId).val()?.trim();

			if (!value) {
				$('#' + chkId).text(message.toUpperCase());
				isValid = false;
			}

			return value;
		}

		function validateFile(fieldId, chkId, message, allowedTypes = [], maxSizeMB = 2) {
			const input = $('#' + fieldId)[0];

			// File is optional — only validate if a file was actually selected
			if (!input || input.files.length === 0) {
				return null;
			}

			const file = input.files[0];

			if (allowedTypes.length && !allowedTypes.includes(file.type)) {
				$('#' + chkId).text('ONLY JPG / PNG ALLOWED');
				isValid = false;
				return null;
			}

			if (file.size > maxSizeMB * 1024 * 1024) {
				$('#' + chkId).text(`FILE SIZE MUST BE < ${maxSizeMB}MB`);
				isValid = false;
				return null;
			}

			return file;
		}

		// ----------- VALIDATION ------------

		validateText(
			'authenticateFor',
			'chkauthenticatefor',
			'PLEASE SELECT AUTHENTICATE FOR'
		);

		if (authenticate == 'aadhar') {
			validateText(
				'aadharNo',
				'chkaadharno',
				'PLEASE ENTER AADHAR NUMBER'
			);
		}

		validateText(
			'signupDate',
			'chksignupdate',
			'PLEASE SELECT SIGNUP DATE'
		);

		validateText(
			'firstName',
			'chkfirstname',
			'PLEASE ENTER FIRST NAME'
		);

		validateText(
			'middleName',
			'chkmiddlename',
			'PLEASE ENTER MIDDLE NAME'
		);

		validateText(
			'lastName',
			'chklastname',
			'PLEASE ENTER LAST NAME'
		);

		validateText(
			'dob',
			'chkdob',
			'PLEASE SELECT DOB'
		);

		if (minor == 'Yes') {
			validateText(
				'guardianName',
				'chkguardianname',
				'ENTER GUARDIAN NAME'
			);

			validateText(
				'guardianAccNo',
				'chkguardianaccno',
				'ENTER GUARDIAN ACCOUNT NO'
			);
		}

		validateText(
			'relationToApplicant',
			'chkrelationtoapplicant',
			'SELECT RELATION'
		);

		validateText(
			'customerGender',
			'chkgender',
			'SELECT GENDER'
		);

		// customerAge is auto-calculated from DOB (readonly field) - skip strict validation
		// validateText('customerAge', 'chkage', 'Enter age');

		validateText(
			'customerAddress',
			'chkaddress',
			'ENTER ADDRESS'
		);

		validateText(
			'state',
			'chkstate',
			'SELECT STATE'
		);

		validateText(
			'district',
			'chkdistrict',
			'SELECT DISTRICT'
		);

		validateText(
			'pinCode',
			'chkpincode',
			'ENTER PINCODE'
		);

		validateText(
			'branchName',
			'chkbranch',
			'SELECT BRANCH'
		);

		validateText(
			'contactNo',
			'chkcontactno',
			'ENTER CONTACT NO'
		);

		// ---------- FILE VALIDATION ----------

		const customerPhoto = validateFile(
			'customerPhoto',
			'chkaadharimage',
			'SELECT AADHAR IMAGE',
			['image/jpeg', 'image/png'],
			2
		);

		const customerSignature = validateFile(
			'customerSignature',
			'chkpanimage',
			'SELECT SIGNATURE',
			['image/jpeg', 'image/png'],
			1
		);

		const customerVoter = validateFile(
			'customerVoter',
			'chkvoterimage',
			'SELECT VOTER IMAGE',
			['image/jpeg', 'image/png'],
			2
		);

		const customerDriving = validateFile(
			'customerDriving',
			'chklicenseimage',
			'SELECT LICENSE IMAGE',
			['image/jpeg', 'image/png'],
			2
		);

		const nomineAadhar = validateFile(
			'nomineAadhar',
			'chknomineeaadhar',
			'SELECT NOMINEE AADHAR',
			['image/jpeg', 'image/png'],
			2
		);

		const nomineSignature = validateFile(
			'nomineSignature',
			'chknomineesignature',
			'SELECT NOMINEE SIGNATURE',
			['image/jpeg', 'image/png'],
			2
		);

		const newlyAddedImage = validateFile(
			'newlyAddedImage',
			'chknewlyaddedimage',
			'SELECT NEWLY ADDED IMAGE',
			['image/jpeg', 'image/png'],
			2
		);

		if (!isValid) return false;

		// ----------- FORM DATA -----------

		var formData = new FormData();

		// Customer Basic

		formData.append(
			"memberCode",
			$('#memberCode').val()
		);

		formData.append(
			"accountNumber",
			$('#accountNumber').val()
		);

		formData.append(
			"authenticateFor",
			$('#authenticateFor').val()
		);

		formData.append(
			"signupDate",
			$('#signupDate').val()
		);

		formData.append(
			"major",
			$('#major').val()
		);

		formData.append(
			"firstName",
			$('#firstName').val()
		);

		formData.append(
			"middleName",
			$('#middleName').val()
		);

		formData.append(
			"lastName",
			$('#lastName').val()
		);

		formData.append(
			"customerName",
			$('#firstName').val() + " " +
			$('#middleName').val() + " " +
			$('#lastName').val()
		);

		formData.append(
			"dob",
			$('#dob').val()
		);

		formData.append(
			"minor",
			$('#minor').val()
		);

		formData.append(
			"guardianName",
			$('#guardianName').val()
		);

		formData.append(
			"guardianAccountNo",
			$('#guardianAccNo').val()
		);

		formData.append(
			"relationToApplicant",
			$('#relationToApplicant').val()
		);

		formData.append(
			"customerGender",
			$('#customerGender').val()
		);

		formData.append(
			"customerAge",
			$('#customerAge').val()
		);

		formData.append(
			"relationshipStatus",
			$('#relationshipStatus').val()
		);

		formData.append(
			"customerAddress",
			$('#customerAddress').val()
		);

		formData.append(
			"category",
			$('#category').val()
		);

		formData.append(
			"caste",
			$('#caste').val()
		);

		formData.append(
			"state",
			$('#state').val()
		);

		formData.append(
			"district",
			$('#district').val()
		);

		formData.append(
			"pinCode",
			$('#pinCode').val()
		);

		formData.append(
			"branchName",
			$('#branchName').val()
		);

		formData.append(
			"aadharNo",
			$('#aadharNo').val()
		);

		formData.append(
			"panNo",
			$('#panNo').val()
		);

		formData.append(
			"voterNo",
			$('#voterNo').val()
		);

		formData.append(
			"drivingLicenceNo",
			$('#drivingLicenceNo').val()
		);

		formData.append(
			"contactNo",
			$('#contactNo').val()
		);

		formData.append(
			"emailId",
			$('#emailId').val()
		);

		formData.append(
			"profession",
			$('#profession').val()
		);

		formData.append(
			"academicBackground",
			$('#academicBackground').val()
		);

		// Referral

		//		formData.append("referralCode", $('#referralCode').val());
		//		formData.append("referralName", $('#referralName').val());

		// Share

		//		formData.append("shareAmount", $('#shareAmount').val());
		//		formData.append("noOfShare", $('#noOfShare').val());
		//		formData.append("shareValue", $('#shareValue').val());
		//		formData.append("lightBill", $('#lightBill').val());
		//		formData.append("taxBill", $('#taxBill').val());

		// Nominee

		formData.append(
			"nomineeName",
			$('#nomineeName').val()
		);

		formData.append(
			"nomineeRelationToApplicant",
			$('#nomineeRelationToApplicant').val()
		);

		formData.append(
			"nomineeAge",
			$('#nomineeAge').val()
		);

		formData.append(
			"nomineeAddress",
			$('#nomineeAddress').val()
		);

		formData.append(
			"nomineePanNo",
			$('#nomineePanNo').val()
		);

		formData.append(
			"nomineeKycNo",
			$('#nomineeKycNo').val()
		);

		formData.append(
			"nomineeKycType",
			$('#nomineeKycType').val()
		);

		formData.append(
			"nomineeMobileNo",
			$('#nomineeMobileNo').val()
		);

		formData.append(
			"nomineeDOB",
			$('#nomineeDOB').val()
		);

		//Charges
		formData.append(
			"memberFees",
			$('#memberFees').val()
		);

		formData.append(
			"buildingFund",
			$('#buildingFund').val()
		);

		formData.append(
			"adminCharge",
			$('#adminCharge').val()
		);

		formData.append(
			"documentCharge",
			$('#documentCharge').val()
		);

		formData.append(
			"entryFee",
			$('#entryFee').val()
		);

		formData.append(
			"paymentBy",
			$('#paymentBy').val()
		);

		formData.append(
			"remarks",
			$('#remarks').val()
		);

		formData.append(
			"otherCharge",
			$('#otherCharge').val()
		);

		// Fees

		//		formData.append("memberFees", $('#memberFees').val());
		//		formData.append("buildingFund", $('#buildingFund').val());
		//		formData.append("adminCharge", $('#adminCharge').val());
		//		formData.append("documentCharge", $('#documentCharge').val());
		//		formData.append("otherCharge", $('#otherCharge').val());
		//		formData.append("entryFee", $('#entryFee').val());
		//		formData.append("chequeNo", $('#chequeNo').val());
		//		formData.append("chequeDate", $('#chequeDate').val());
		//		formData.append("depositAcNo", $('#depositAccount').val());
		//		formData.append("referenceNo", $('#referenceNo').val());
		//		formData.append("remarks", $('#remarks').val());
		//		formData.append("paymentBy", $('#paymentBy').val());
		//		formData.append("fDate", $('#fDate').val());
		//		formData.append("tDate", $('#tDate').val());

		// Toggles

		formData.append(
			"memberStatus",
			$('#toggle-member-status').is(":checked") ? "1" : "0"
		);

		formData.append(
			"mobileBanking",
			$('#toggle-banking-status').is(":checked") ? "1" : "0"
		);

		formData.append(
			"netBanking",
			$('#toggle-netbanking-status').is(":checked") ? "1" : "0"
		);

		formData.append(
			"smsSend",
			$('#toggle-sms-status').is(":checked") ? "1" : "0"
		);

		// Files

		if (customerPhoto)
			formData.append("customerPhoto", customerPhoto);

		if (customerSignature)
			formData.append("customerSignature", customerSignature);

		if (customerVoter)
			formData.append("customerVoter", customerVoter);

		if (customerDriving)
			formData.append("customerDriving", customerDriving);

		if (nomineAadhar)
			formData.append("nomineAadhar", nomineAadhar);

		if (nomineSignature)
			formData.append("nomineSignature", nomineSignature);

		if (newlyAddedImage)
			formData.append("newlyAddedImage", newlyAddedImage);

		// -------- AJAX --------

		$.ajax({
			type: 'POST',
			url: 'api/customermanagement/saveOrUpdateCustomer',
			data: formData,
			processData: false,
			contentType: false,

			success: function(response) {
				if (response.data) {
					const customerId = response.data.id;

					Swal.fire({
						icon: "success",
						title: "REGISTRATION SUCCESSFUL",
						html:
							"CUSTOMER REGISTRATION COMPLETED SUCCESSFULLY!<br><br>" +
							"<b>ACCOUNT NUMBER: " + accountNumber + "</b><br><br>" +
							"THANK YOU FOR REGISTERING WITH US.",
						confirmButtonText: "OK"
					});

					// =====================================================
					// ACCOUNT TRANSACTION
					// =====================================================

					/*
					 * Read Payment Mode
					 */
					const paymentBy =
						($('#paymentBy').val() || '')
							.toString()
							.trim()
							.toUpperCase();

					/*
					 * Read Customer Fees
					 */
					const memberFees =
						parseFloat($('#memberFees').val()) || 0;

					const buildingFund =
						parseFloat($('#buildingFund').val()) || 0;

					const adminCharge =
						parseFloat($('#adminCharge').val()) || 0;

					const documentCharge =
						parseFloat($('#documentCharge').val()) || 0;

					const entryFee =
						parseFloat($('#entryFee').val()) || 0;

					/*
					 * Calculate Total Customer Registration Fees
					 */
					const totalFee =
						memberFees +
						buildingFund +
						adminCharge +
						documentCharge +
						entryFee;

					var firstName = $('#firstName').val();
					var middleName = $('#middleName').val();
					var lastName = $('#lastName').val();

					const customerName = [
						firstName,
						middleName,
						lastName
					].filter(Boolean).join(" ");

					var transactionType = "";

					if ((paymentBy || "").toUpperCase() === "CASH") {
						transactionType = "CUSTOMER_FEES_CASH";
					} else {
						transactionType = "TRANSFER";
					}

					const accountTransactionData = {
						branchName:
							$('#branchName').val(),

						paymentBy:
							paymentBy,

						accountCode:
							accountCode,

						customerName:
							customerName,

						accountNumber:
							accountNumber,

						transactionDate:
							$('#signupDate').val(),

						narration:
							"CUSTOMER REGISTRATION FEES - " +
							(
								$('#memberCode').val() ||
								customerId
							),

						credit:
							totalFee,

						debit:
							0,

						transactionType:
							transactionType,

						referenceNo:
							$('#memberCode').val(),

						status:
							"SUCCESS",

						loanId:
							null,

						policyId:
							null,

						createdBy:
							"ADMIN"
					};

					// -------------------------------------------------
					// SAVE ACCOUNT TRANSACTION
					// -------------------------------------------------

					$.ajax({
						type: 'POST',
						url: 'accountManagement/saveAccountTransaction',
						contentType: 'application/json',
						data: JSON.stringify(accountTransactionData),
						dataType: 'json',
						success: function(transactionResponse) {

							console.log(
								"AccountTransaction saved successfully:",
								transactionResponse
							);
							

							/*
							 * Existing Customer flow
							 * remains exactly same.
							 */
							uploadExtraImages(
								customerId,
								saveMsg
							);
						},

						error: function(xhr) {
							console.error(
								"AccountTransaction Error:",
								xhr
							);

							/*
							 * Customer is already saved.
							 * Do not save customer again.
							 *
							 * Continue existing flow.
							 */
							alert(
								"CUSTOMER SAVED SUCCESSFULLY, BUT CASH TRANSACTION COULD NOT BE SAVED."
							);

							uploadExtraImages(
								customerId,
								saveMsg
							);
						}
					});

				} else {
					/*
					 * No AccountTransaction for:
					 *
					 * CHEQUE
					 * NEFT
					 * ONLINE
					 * UPI
					 *
					 * OR
					 *
					 * Total Fee = 0
					 *
					 * Continue existing flow.
					 */
					uploadExtraImages(
						customerId,
						saveMsg
					);
				}
			},

			error: function(xhr) {
				console.error(xhr);

				alert(
					(xhr.responseJSON?.message || "SOMETHING WENT WRONG").toUpperCase()
				);
			}
		});
	});

	/*$('#saveBtn').click(function(e) {
		e.preventDefault();

		// ✅ Create FormData
		var formData = new FormData();

		// 🔹 Append all text fields (from your model)
		const fields = [
			// --- Customer Basic Details ---
			"memberCode", "authenticateFor", "signupDate", "major", "customerName",
			"minor", "customerGender", "guardianName", "relationToApplicant", "dob",
			"customerAge", "relationshipStatus", "customerAddress", "state", "district",
			"aadharNo", "pinCode", "branchName", "panNo", "voterNo", "drivingLicenceNo",
			"referralCode", "referralName", "contactNo", "emailId", "profession",
			"lightBill", "shareAmount", "noOfShare", "taxBill", "academicBackground",

			// --- Nominee Details ---
			"nomineeName", "nomineeRelationToApplicant", "nomineeAge", "nomineeAddress",
			"nomineePanNo", "nomineeKycNo", "nomineeKycType", "nomineeMobileNo", "nomineeDOB",

			// --- Fees & Payment Details ---
			"memberFees", "buildingFund", "adminCharge", "documentCharge", "otherCharge",
			"entryFee", "chequeNo", "chequeDate", "depositAcNo", "referenceNo", "remarks", "paymentBy",

			// --- Optional Filters / Flags ---
			"fDate", "tDate", "isVerified", "isApproved"
		];

		// Append all text inputs
		fields.forEach(id => {
			const value = $('#' + id).val();
			if (value !== undefined && value !== null && value !== '') {
				formData.append(id, value);
			}
		});

		// 🔹 Append file fields
		const files = {
			"customerPhoto": $('#customerPhoto')[0]?.files[0],
			"customerSignature": $('#customerSignature')[0]?.files[0],
			"customerVoter": $('#customerVoter')[0]?.files[0],
			"customerDriving": $('#customerDriving')[0]?.files[0]
		};

		Object.entries(files).forEach(([key, file]) => {
			if (file) formData.append(key, file);
		});

		// 🔹 Append toggle switches (boolean flags)
		formData.append("memberStatus", $('#toggle-member-status').is(":checked") ? "1" : "0");
		formData.append("memberBanking", $('#toggle-banking-status').is(":checked") ? "1" : "0");
		formData.append("netBanking", $('#toggle-netbanking-status').is(":checked") ? "1" : "0");
		formData.append("smsSend", $('#toggle-sms-status').is(":checked") ? "1" : "0");

		// 🪵 Debug log
		console.log("📦 FormData prepared:");
		for (let [key, value] of formData.entries()) {
			console.log(`${key}:`, value);
		}

		// ✅ AJAX request
		$.ajax({
			url: "api/customermanagement/saveOrUpdateCustomer",
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			success: function(response) {
				console.log("✅ Success:", response);
				alert((response.message || "CUSTOMER SAVED SUCCESSFULLY!").toUpperCase());
				$('#customerForm')[0].reset();
			},
			error: function(xhr) {
				console.error("❌ Error:", xhr.responseText);
				alert("❌ SOMETHING WENT WRONG WHILE SAVING DATA!");
			}
		});
	});*/

	// =================================================
	// CUSTOMER IMAGE UPLOAD EVENT LISTENERS & FUNCTIONS
	// =================================================

	$("#addFieldBtn").click(function(e) {
		e.preventDefault();
		createNewField();
	});

	function createNewField() {
		const fieldHtml = `
            <div class="textUploadSet mb-4">
                <input style="text-transform: uppercase;" type="text" class="form-control nameField" placeholder="ENTER IMAGE NAME...">
                <div class="uploadContainer"></div>
            </div>`;
		$("#fieldContainer").append(fieldHtml);
	}

	$(document).on("input", ".nameField", function() {
		const val = $(this).val().trim();
		const box = $(this).closest(".textUploadSet").find(".uploadContainer");

		if (val.length === 0) {
			box.html("");
			return;
		}

		const uniqueId = "file-" + Date.now();

		const html = `
            <div class="uploadField mt-2">
                <label>${val.toUpperCase()} *</label>
                <div>
                    <input type="file" id="${uniqueId}" class="form-control mb-2" accept="image/*" onchange="previewImage('${uniqueId}')">
                    <label for="${uniqueId}">
                        <div>
                            <img src="Uploads/upload.png" id="preview-${uniqueId}" style="width:120px; cursor:pointer;">
                        </div>
                    </label>
                </div>
            </div>
        `;

		box.html(html);
	});

	$("#uploadAllBtn").click(function(e) {
		e.preventDefault();
		alert("PLEASE CLICK THE SAVE BUTTON AT THE BOTTOM OF THE PAGE TO SAVE THE CUSTOMER DETAILS AND AUTOMATICALLY UPLOAD ALL ADDED IMAGES.");
	});

	function uploadExtraImages(customerId, saveMsg) {
		let uploadFields = $(".uploadField");
		let uploadCount = uploadFields.length;

		if (uploadCount === 0) {
			alert((saveMsg || "CUSTOMER SAVED SUCCESSFULLY!").toUpperCase());
			location.reload();
			return;
		}

		let completed = 0;
		let hasFailed = false;

		uploadFields.each(function() {
			const fieldName = $(this).find("label:first").text().replace("*", "").trim();
			const input = $(this).find("input[type=file]")[0];
			const file = input.files[0];

			if (!file) {
				completed++;

				if (completed === uploadCount) {
					alert(
						hasFailed
							? "SOME EXTRA IMAGES FAILED TO UPLOAD."
							: (saveMsg || "CUSTOMER AND ALL IMAGES SAVED SUCCESSFULLY!").toUpperCase()
					);
					location.reload();
				}

				return;
			}

			let fd = new FormData();
			fd.append("fieldName", fieldName);
			fd.append("file", file);

			$.ajax({
				url: "api/customermanagement/upload/" + customerId,
				type: "POST",
				data: fd,
				processData: false,
				contentType: false,

				success: function() {
					completed++;

					if (completed === uploadCount) {
						alert(
							hasFailed
								? "SOME EXTRA IMAGES FAILED TO UPLOAD."
								: (saveMsg || "CUSTOMER AND ALL IMAGES SAVED SUCCESSFULLY!").toUpperCase()
						);
						location.reload();
					}
				},

				error: function() {
					hasFailed = true;
					completed++;

					if (completed === uploadCount) {
						alert("SOME EXTRA IMAGES FAILED TO UPLOAD.");
						location.reload();
					}
				}
			});
		});
	}

});

function photopreview() {
	const file = document.getElementById("customerPhoto").files[0];

	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();

		reader.onload = function(e) {
			const previewimg = document.getElementById("bike1imagePreview");
			document.getElementById("bike1imagePreview").src = e.target.result;
			previewimg.style.width = "100%";
			previewimg.style.height = "100%";
			previewimg.style.objectFit = "cover";
			previewimg.style.overflow = "hidden";
			previewimg.style.borderRadius = "20px";
		};

		reader.readAsDataURL(file);
	} else {
		alert("PLEASE UPLOAD A VALID IMAGE FILE FOR PHOTO.");
	}
}


//Ayush
function signpreview() {
	const file = document.getElementById("customerSignature").files[0];

	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();

		reader.onload = function(e) {
			const previevimg = document.getElementById("bike2imagePreview");
			document.getElementById("bike2imagePreview").src = e.target.result;
			previevimg.style.width = "100%";
			previevimg.style.height = "100%";
			previevimg.style.objectFit = "cover";
			previevimg.style.overflow = "hidden";
			previevimg.style.borderRadius = "20px";
		};

		reader.readAsDataURL(file);
	} else {
		alert("PLEASE UPLOAD A VALID IMAGE FILE FOR SIGNATURE.");
	}
}

function voterpreview() {
	const file = document.getElementById("customerVoter").files[0];

	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();

		reader.onload = function(e) {
			const previevimg = document.getElementById("bike3imagePreview");
			document.getElementById("bike3imagePreview").src = e.target.result;
			previevimg.style.width = "100%";
			previevimg.style.height = "100%";
			previevimg.style.objectFit = "cover";
			previevimg.style.overflow = "hidden";
			previevimg.style.borderRadius = "20px";
		};

		reader.readAsDataURL(file);
	} else {
		alert("PLEASE UPLOAD A VALID IMAGE FILE FOR SIGNATURE.");
	}
}

function drivingpreview() {
	const file = document.getElementById("customerDriving").files[0];

	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();

		reader.onload = function(e) {
			const previevimg = document.getElementById("bike4imagePreview");
			document.getElementById("bike4imagePreview").src = e.target.result;
			previevimg.style.width = "100%";
			previevimg.style.height = "100%";
			previevimg.style.objectFit = "cover";
			previevimg.style.overflow = "hidden";
			previevimg.style.borderRadius = "20px";
		};

		reader.readAsDataURL(file);
	} else {
		alert("PLEASE UPLOAD A VALID IMAGE FILE FOR SIGNATURE.");
	}
}

function loadCustomerTable() {
	$.ajax({
		url: "api/customermanagement/getAllCustomer",
		type: "GET",
		dataType: "json",

		success: function(response) {
			console.log("Customer API Response:", response);

			let tbody = $("#customerTableBody");
			tbody.empty();

			// Handle direct array or wrapped API response
			let data = Array.isArray(response)
				? response
				: Array.isArray(response.data)
					? response.data
					: Array.isArray(response.body)
						? response.body
						: Array.isArray(response.content)
							? response.content
							: null;

			if (!data) {
				console.error("Customer data is not an array:", response);
				tbody.append(
					$("<tr>").append(
						$("<td>", {
							colspan: 8,
							text: "UNABLE TO LOAD CUSTOMER DATA"
						})
					)
				);
				return;
			}

			data.forEach(function(cust, idx) {

				// Build FULL NAME from first, middle, last
				const fullName = [
					cust.firstName,
					cust.middleName,
					cust.lastName
				]
					.filter(name => name && name.trim())
					.join(" ");

				// Convert values to uppercase safely
				const memberCode = String(cust.memberCode || "").toUpperCase();
				const customerName = String(fullName || "").toUpperCase();
				const contactNo = String(cust.contactNo || "").toUpperCase();
				const aadharNo = String(cust.aadharNo || "").toUpperCase();
				const district = String(cust.district || "").toUpperCase();
				const branchName = String(cust.branchName || "").toUpperCase();
				const dob = String(cust.dob || "").toUpperCase();

				tbody.append(`
					<tr>
						<td>${idx + 1}</td>
						<td>${memberCode}</td>
						<td>${customerName}</td>
						<td>${contactNo}</td>
						<td>${aadharNo}</td>
						<td>${district}</td>
						<td>${branchName}</td>
						<td>${dob}</td>
					</tr>
				`);
			});
		},

		error: function(err) {
			console.log("Error loading table:", err);
		}
	});
}

function nomineeSignaturePreview() {
	const file = document.getElementById("nomineSignature").files[0];

	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();

		reader.onload = function(e) {
			const previewImg = document.getElementById("nomineeSignatureImg");
			document.getElementById("nomineeSignatureImg").src = e.target.result;
			previewImg.style.width = "100%";
			previewImg.style.height = "100%";
			previewImg.style.objectFit = "cover";
			previewImg.style.borderRadius = "20px";
		};

		reader.readAsDataURL(file);
	} else {
		alert("PLEASE UPLOAD A VALID IMAGE FILE FOR SIGNATURE.");
	}
}

function nomineeAadharPreview() {
	const file = document.getElementById("nomineAadhar").files[0];

	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();

		reader.onload = function(e) {
			const previewImg = document.getElementById("nomineeAadharImg");
			document.getElementById("nomineeAadharImg").src = e.target.result;
			previewImg.style.width = "100%";
			previewImg.style.height = "100%";
			previewImg.style.objectFit = "cover";
			previewImg.style.overflow = "hidden";
			previewImg.style.borderRadius = "20px";
		};

		reader.readAsDataURL(file);
	} else {
		alert("PLEASE UPLOAD A VALID IMAGE FOR NOMINEE AADHAR.");
	}
}

function newlyaddedpreview() {
	const file = document.getElementById("newlyAddedImage").files[0];

	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();

		reader.onload = function(e) {
			const previewImg = document.getElementById("newlyAddedImagePreview");
			previewImg.src = e.target.result;
			previewImg.style.width = "100%";
			previewImg.style.height = "100%";
			previewImg.style.objectFit = "cover";
			previewImg.style.overflow = "hidden";
			previewImg.style.borderRadius = "20px";
		};

		reader.readAsDataURL(file);
	} else {
		alert("PLEASE UPLOAD A VALID IMAGE.");
	}
}

$(document).ready(function() {
	// Load States
	$.ajax({
		url: 'api/preference/getAllStates',
		method: "GET",

		success: function(response) {
			if (response && response.data && Array.isArray(response.data)) {
				console.log("Fetched states:", response.data);

				response.data.forEach(function(state) {
					$('#state').append(
						$('<option>', {
							value: state.stateName,
							text: state.stateName.toUpperCase(),
							'data-id': state.stateId
						})
					);
				});
			} else {
				console.warn("NO STATE DATA AVAILABLE.");
			}
		},

		error: function(err) {
			console.error("Error fetching states:", err);
		}
	});
});


// Load Districts when state is selected
$('#state').on('change', function() {
	const selectedStateId = $(this).find(':selected').data('id');
	$('#district').empty().append('<option value="">SELECT DISTRICT</option>');

	if (selectedStateId) {
		$.ajax({
			url: 'api/preference/getAllDistrictsByStateId',
			method: 'GET',
			data: { stateId: selectedStateId },

			success: function(response) {
				console.log("Fetched districts:", response);
				const districts = response.allDistricts;

				districts.forEach(function(district) {
					$('#district').append(
						$('<option>', {
							value: district.districtName,
							text: district.districtName.toUpperCase()
						})
					);
				});
			},

			error: function(err) {
				console.error("Error fetching districts:", err);
			}
		});
	}
});

$(document).ready(function() {
	const dropdownIds = ["relationToApplicant", "nomineeRelationToApplicant"];

	$.ajax({
		url: "api/preference/getAllRelativeModule",
		method: "GET",

		success: function(data) {
			console.log("Received relation data:", data);

			dropdownIds.forEach(function(id) {
				const $select = $("#" + id);

				if ($select.length === 0) {
					console.warn(`Dropdown with ID '${id}' not found.`);
					return;
				}

				// Clear old options except the first placeholder
				$select.find("option:not(:first)").remove();

				// Loop through data.data array
				data.data.forEach(function(item) {
					$select.append(
						$("<option>", {
							value: item.relation,
							text: item.relation.toUpperCase()
						})
					);
				});
			});
		},

		error: function(err) {
			console.error("Error loading relations:", err);
		}
	});
});

$(document).ready(function() {
	// Fetch all branches and populate the dropdown
	$.ajax({
		url: "api/preference/getAllBranchModule",
		method: "GET",

		success: function(data) {
			console.log("Fetched Branches:", data);

			const $branchDropdown = $('#branchName');
			const addedBranches = new Set();

			// Clear existing options
			$branchDropdown.empty();

			// Add default option
			$branchDropdown.append('<option value="">-- SELECT BRANCH --</option>');

			// Loop through and add only unique branch names
			if (Array.isArray(data.data)) {
				data.data.forEach(function(branch) {
					const branchName = branch.branchName;

					if (branchName && !addedBranches.has(branchName)) {
						$branchDropdown.append(
							$('<option>', {
								value: branchName,
								text: branchName.toUpperCase()
							})
						);

						addedBranches.add(branchName);
					}
				});
			} else {
				console.warn("Unexpected data format:", data);
			}
		},

		error: function(err) {
			console.error("Error fetching branches:", err);
		}
	});
});

document.addEventListener("DOMContentLoaded", function() {
	const paymentBy = document.getElementById("paymentBy");

	const chequeNoDiv = document.getElementById("chequeNoDiv");
	const chequeDateDiv = document.getElementById("chequeDateDiv");
	const depositAccountDiv = document.getElementById("depositAccountDiv");
	const refNoDiv = document.getElementById("refNoDiv");

	function resetAndHideAll() {
		chequeNoDiv.style.display = "none";
		chequeDateDiv.style.display = "none";
		depositAccountDiv.style.display = "none";
		refNoDiv.style.display = "none";

		// Optional: clear values
		document.getElementById("chequeNo").value = "";
		document.getElementById("chequeDate").value = "";
		document.getElementById("depositAccount").value = "";
		document.getElementById("referenceNo").value = "";
	}

	function handlePaymentChange() {
		const selected = paymentBy.value;
		resetAndHideAll();

		if (selected === "cheque") {
			chequeNoDiv.style.display = "block";
			chequeDateDiv.style.display = "block";
			depositAccountDiv.style.display = "block";
		} else if (selected === "neft" || selected === "online") {
			depositAccountDiv.style.display = "block";
			refNoDiv.style.display = "block";
		}
		// Cash: show nothing extra
	}

	paymentBy.addEventListener("change", handlePaymentChange);

	// Initialize (in case a value is pre-selected)
	handlePaymentChange();
});

document.addEventListener("DOMContentLoaded", function() {
	// Function to fetch and bind bank accounts
	function loadBankAccounts() {
		fetch("api/preference/getAllBankModule")
			.then(response => {
				if (!response.ok) {
					throw new Error("NETWORK RESPONSE WAS NOT OK");
				}

				return response.json();
			})
			.then(response => {
				console.log("Bank API response:", response);

				const depositAccount = document.getElementById("depositAccount");
				depositAccount.innerHTML = '<option value="">SELECT</option>';

				// ✅ Adjust based on actual API structure
				const banks = response.data || response;

				if (Array.isArray(banks)) {
					banks.forEach(bank => {
						const option = document.createElement("option");
						option.value = bank.accountNo;
						option.textContent = `${bank.accountNo} (${bank.bankName.toUpperCase()})`;
						depositAccount.appendChild(option);
					});
				} else {
					console.error("Expected array but got:", banks);
				}
			})
			.catch(error => {
				console.error("Error fetching bank accounts:", error);
			});
	}

	// Load on page load
	loadBankAccounts();
});

$(document).ready(function() {
	// Fetch all customers and populate the "select by code" dropdown
	$.ajax({
		url: "api/customermanagement/getAllCustomer",
		method: "GET",
		dataType: "json",

		success: function(response) {
			console.log("Fetched Members:", response);

			// Handle different API response structures
			var data = Array.isArray(response)
				? response
				: Array.isArray(response.data)
					? response.data
					: Array.isArray(response.body)
						? response.body
						: null;

			if (!data) {
				console.error("Customer list is not an array:", response);
				alert("INVALID CUSTOMER DATA RECEIVED FROM SERVER.");
				return;
			}

			$('#selectMember').empty();
			$('#selectMember').append(
				$('<option>', {
					value: '',
					text: 'SELECT MEMBER'
				})
			);

			data.forEach(function(customer) {
				const optionText = `${customer.memberCode} - ${customer.customerName}`;

				$('#selectMember').append(
					$('<option>', {
						value: customer.memberCode,
						text: optionText.toUpperCase()
					})
				);
			});
		},

		error: function(err) {
			console.error("ERROR FETCHING CUSTOMERS:", err);
			alert("INTERNAL SERVER ERROR");
		}
	});
});

$(document).ready(function() {
	// If already selected on load
	if ($("#selectMember").val()) {
		fetchBySelectedCustomer();
	}

	// On dropdown change
	$("#selectMember").on("change", function() {
		if ($(this).val()) {
			fetchBySelectedCustomer();
		} else {
			clearCustomerFields();
		}
	});
});

function fetchBySelectedCustomer() {
	const memberCode = $("#selectMember").val();
	if (!memberCode) return;

	const input = { memberCode };

	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(input),
		url: 'fetchBySelectedCustomer',
		async: false,

		success: function(data) {
			if (data && data.length > 0) {
				const c = data[0];

				$("#customerName").val((c.customerName || "").toUpperCase());
				$("#customerCode").val((c.memberCode || "").toUpperCase());
				$("#contactNo").val((c.contactNo || "").toUpperCase());
				$("#singupDate").val(c.signupDate || "");
				$("#aadharNo").val((c.aadharNo || "").toUpperCase());
				$("#pan").val((c.panNo || "").toUpperCase());
				$("#voterNo").val((c.voterNo || "").toUpperCase());
				$("#rationCardNo").val((c.rationCardNo || "").toUpperCase());
				$("#drivingLicenseNo").val((c.drivingLicenceNo || "").toUpperCase());

				// Customer Photo
				if (c.customerPhoto) {
					const photoPath = `Uploads/${c.customerPhoto}`;
					$("#photoPreview").attr("src", photoPath);
					$("#photoHidden").val(photoPath);
				} else {
					$("#photoPreview").attr("src", 'Uploads/default-placeholder.jpg');
					$("#photoHidden").val('');
				}

				// Signature
				if (c.customerSignature) {
					const signaturePath = `Uploads/${c.customerSignature}`;
					$("#signaturePreview").attr("src", signaturePath);
					$("#signatureHidden").val(signaturePath);
				} else {
					$("#signaturePreview").attr("src", 'Uploads/default-placeholder.jpg');
					$("#signatureHidden").val('');
				}

			} else {
				alert("NO DATA FOUND FOR THE SELECTED MEMBER.");
				clearCustomerFields();
			}
		},

		error: function(jqXHR, textStatus, errorThrown) {
			alert(("FAILED TO FETCH DATA: " + textStatus + ", " + errorThrown).toUpperCase());
		}
	});
}

function ifMinor() {
	var minor = $("#minor").val();

	if (minor === 'Yes') {
		$("#guardianDetails").show();
		$("#guardianAccount").show();
		$("#guardianAccNo").prop("required", true);
	} else {
		$("#guardianDetails").hide();
		$("#guardianAccount").hide();
		$("#guardianAccNo").prop("required", false).val('');
		$("#guardianName").val('');
	}

	var minor = $("#minor").val();

	if (minor === 'Yes') {
		$("#guardianDetails").show();
		$("#guardianAccountNo").show();
	} else {
		$("#guardianDetails").hide();
		$("#guardianAccountNo").hide();
		$("#guardianAccNo").val('');
		$("#guardianDetails").val('');
	}
}


// Auto-calculate Age and Minor detection
$(document).ready(function() {
	$('#dob').on('change', function() {
		const dobVal = $(this).val();
		if (!dobVal) return;

		const dob = new Date(dobVal);
		const today = new Date();

		let age = today.getFullYear() - dob.getFullYear();
		const m = today.getMonth() - dob.getMonth();

		if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
			age--;
		}

		$('#customerAge').val(age);

		if (age < 18) {
			$('#minor').val('Yes');
			$('#guardianDetails').show();
			$('#guardianAccountNo').show();
		} else {
			$('#minor').val('No');
			$('#guardianDetails').hide();
			$('#guardianAccountNo').hide();
		}
	});

	$('#nomineeDOB').on('change', function() {
		const dobVal = $(this).val();
		if (!dobVal) return;

		const dob = new Date(dobVal);
		const today = new Date();

		let age = today.getFullYear() - dob.getFullYear();
		const m = today.getMonth() - dob.getMonth();

		if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
			age--;
		}

		$('#nomineeAge').val(age);

		/*if (age < 18) {
			$('#minor').val('Yes');
			$('#guardianDetails').show();
			$('#guardianAccount').show();
		} else {
			$('#minor').val('No');
			$('#guardianDetails').hide();
			$('#guardianAccount').hide();
		}*/
	});
});

$(document).ready(function() {
	// 1️⃣ Fetch all customers for dropdown
	$.ajax({
		url: "api/customersavings/getAllSavingAccountData",
		method: "GET",

		success: function(response) {
			console.log("Fetched Members:", response);

			const customers = response.data || response;

			// Clear old options
			$('#guardianName').empty();

			// Add default option
			$('#guardianName').append(
				$('<option>', {
					value: '',
					text: 'SELECT GUARDIAN NAME'
				})
			);

			// Populate dropdown
			if (Array.isArray(customers) && customers.length > 0) {
				customers.forEach(function(customer) {
					const guardianValue = customer.selectByCustomer
						? customer.selectByCustomer.trim()
						: '';

					const optionText = `${customer.enterCustomerName || ''} - ${guardianValue}`;

					$('#guardianName').append(
						$('<option>', {
							value: guardianValue,
							text: optionText.toUpperCase()
						})
					);
				});
			}
		},

		error: function(err) {
			console.error("❌ Error fetching customers:", err);
		}
	});

	$('#guardianName').on('change', function() {
		const selectedCode = $(this).val().trim();

		if (selectedCode === "") {
			$('#guardianAccountNo').hide();
			$('#guardianAccNo').prop('required', false).val('');
		} else {
			$('#guardianAccountNo').show();
			$('#guardianAccNo').prop('required', true);

			// Fetch account number from backend
			$.ajax({
				url: `api/customersavings/getAccountNumbersByCode?selectByCustomer=${encodeURIComponent(selectedCode)}`,
				method: "GET",

				success: function(res) {
					console.log("Account number response:", res);

					// Access account number using the selected code as key
					if (res.data && res.data.length > 0) {
						$('#guardianAccNo').val(res.data[0].accountNumber);
					} else {
						$('#guardianAccNo').val('');

						if (res.data && res.data[selectedCode] && res.data[selectedCode].length > 0) {
							$('#guardianAccNo').val(res.data[selectedCode][0]);
						} else {
							$('#guardianAccNo').val('');
						}
					}
				},

				error: function(err) {
					console.error("❌ Error fetching account number:", err);
					$('#guardianAccNo').val('');
				}
			});
		}
	}).trigger('change');

	// trigger on load

	/*	$.ajax({
			url: 'api/preference/getAllCategoryModule',
			method: "GET",
			success: function(response) {
				if (response.status === 'FOUND') {
					console.log("Fetched Category:", response.data);
					response.data.forEach(function(category) {
						$('#category').append(
							$('<option>', {
								value: category.category,
								text: category.category,
								'data-id': category.stateId
							})
						);
					});
				} else {
					console.warn("No Category data available.");
				}
			},
			error: function(err) {
				console.error("Error fetching Categories:", err);
			}
		});*/

	$.ajax({
		url: 'api/preference/getAllCategoryModule',
		method: "GET",

		success: function(response) {
			if (response.status === 'FOUND') {
				console.log("Fetched Category:", response.data);

				$('#category').empty().append('<option value="">--SELECT CATEGORY--</option>');

				// Set to store unique category names
				const uniqueCategories = new Set();

				response.data.forEach(function(category) {
					if (category.category) {
						uniqueCategories.add(category.category.trim());
					}
				});

				// Append unique categories
				uniqueCategories.forEach(function(categoryName) {
					$('#category').append(
						$('<option>', {
							value: categoryName,
							text: categoryName.toUpperCase()
						})
					);
				});

			} else {
				console.warn("NO CATEGORY DATA AVAILABLE.");
			}
		},

		error: function(err) {
			console.error("Error fetching Categories:", err);
		}
	});

	$('#category').on('change', function() {
		const selectedCategory = $("#category").val();
		$('#caste').empty().append('<option value="">--SELECT CASTE--</option>');

		if (selectedCategory) {
			$.ajax({
				url: 'api/preference/getAllCasteByCategory',
				method: 'GET',
				data: { category: selectedCategory },

				success: function(response) {
					console.log("Fetched caste:", response);
					const casteList = response.data;

					casteList.forEach(function(caste) {
						$('#caste').append(
							$('<option>', {
								value: caste.caste,
								text: caste.caste.toUpperCase()
							})
						);
					});
				},

				error: function(err) {
					console.error("Error fetching caste:", err);
				}
			});
		}
	});
});

document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("memberFeesTable").style.display = "none";
});

document.getElementById("memberFees").addEventListener("click", function(event) {
	event.stopPropagation();

	let table = document.getElementById("memberFeesTable");

	table.style.display = (table.style.display === "none" || table.style.display === "")
		? "block" : "none";
});

document.getElementById("memberFeesTable").addEventListener("click", function(event) {
	event.stopPropagation();
});

document.addEventListener("click", function() {
	document.getElementById("memberFeesTable").style.display = "none";
});

function calcOpeningFees() {
	let n2000 = (document.getElementById("qty2000").value || 0) * 2000;
	let n500 = (document.getElementById("qty500").value || 0) * 500;
	let n200 = (document.getElementById("qty200").value || 0) * 200;
	let n100 = (document.getElementById("qty100").value || 0) * 100;
	let n50 = (document.getElementById("qty50").value || 0) * 50;
	let n20 = (document.getElementById("qty20").value || 0) * 20;
	let n10 = (document.getElementById("qty10").value || 0) * 10;
	let n5 = (document.getElementById("qty5").value || 0) * 5;

	document.getElementById("res2000").innerText = n2000;
	document.getElementById("res500").innerText = n500;
	document.getElementById("res200").innerText = n200;
	document.getElementById("res100").innerText = n100;
	document.getElementById("res50").innerText = n50;
	document.getElementById("res20").innerText = n20;
	document.getElementById("res10").innerText = n10;
	document.getElementById("res5").innerText = n5;

	let total = n2000 + n500 + n200 + n100 + n50 + n20 + n10 + n5;

	document.getElementById("totalFee").innerText = total;
	document.getElementById("memberFees").value = total;
}

function previewImage(id) {
	const file = document.getElementById(id).files[0];
	const preview = document.getElementById("preview-" + id);

	if (file) {
		const reader = new FileReader();
		reader.onload = e => preview.src = e.target.result;
		reader.readAsDataURL(file);
	}
}