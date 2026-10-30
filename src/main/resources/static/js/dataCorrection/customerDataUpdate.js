$(document).ready(function() {

	$.ajax({
		url: 'api/preference/getAllCategoryModule',
		method: "GET",
		success: function(response) {

			if (response.status === 'FOUND') {

				console.log("FETCHED CATEGORY:", response.data);

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
							text: categoryName
						})
					);
				});

			} else {
				console.warn("NO CATEGORY DATA AVAILABLE.");
			}
		},
		error: function(err) {
			console.error("ERROR FETCHING CATEGORIES:", err);
		}
	});

	//With Search in Dropdown
	$.ajax({
		url: 'api/customermanagement/getAllCustomer',
		type: 'GET',
		success: function(response) {
			// Check if response has data array inside `data`
			if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
				let customerOptions = response.data.map(function(item) {
					return {
						id: item.memberCode,
						text: item.memberCode + " - " + item.customerName.toUpperCase()
					};
				});

				$('#customerCode').select2({
					placeholder: '-- SEARCH CUSTOMER CODE OR NAME --',
					data: customerOptions,
					matcher: function(params, data) {
						if ($.trim(params.term) === '') return data;
						if (typeof data.text === 'undefined') return null;

						const term = params.term.toLowerCase();
						const text = data.text.toLowerCase();
						return text.includes(term) ? data : null;
					}
				});
			} else {
				alert("NO APPROVED CUSTOMERS FOUND.");
			}
		},
		error: function(xhr, status, error) {
			console.error("ERROR FETCHING CUSTOMERS:", error);
			alert("FAILED TO LOAD CUSTOMER CODES.");
		}
	});

	$("#customerCode").change(function() {
		let customerCode = $("#customerCode").val();
		if (customerCode !== "") {
			$.ajax({
				type: "POST",
				url: "api/customershareholdingcontroller/fetchByCustomerCode",
				data: { memberCode: customerCode },
				success: function(response) {
					if (response.status == "FOUND") {
						let data = response.data[0];
						var firstName = data.firstName || "";
						var middleName = data.middleName || "";
						var lastName = data.lastName || "";
						const customerName = [
							firstName,
							middleName,
							lastName
						].filter(Boolean).join(" ");
						$("#id").val(data.id);
						$("#signupDate").val(data.signupDate);
						$("#authenticateFor").val(data.authenticateFor);
						$("#major").val(data.major || "SELECT");
						$("#firstName").val(firstName.toUpperCase());
						$("#middleName").val(middleName.toUpperCase());
						$("#lastName").val(lastName.toUpperCase());
						$("#customerName").val(customerName);
						$("#accountType").val(data.accountType || "");
						$("#chequeNo").val(data.chequeNo || "");
						$("#chequeDate").val(data.chequeDate || "");
						$("#depositAccount").val(data.depositAcNo || "");
						$("#referenceNo").val(data.referenceNo || "");
						if (data.paymentBy === "online" || data.paymentBy === "Online") {
							$("#paymentBy").val("online");
							$("#chequeNoDiv").hide();
							$("#chequeDateDiv").hide();
							$("#depositAccountDiv").show();
							$("#refNoDiv").show();
						} else if (data.paymentBy === "cheque" || data.paymentBy === "Cheque") {
							$("#paymentBy").val("cheque");
							$("#chequeNoDiv").show();
							$("#chequeDateDiv").show();
							$("#depositAccountDiv").show();
							$("#refNoDiv").show();
						} else {
							$("#paymentBy").val("cash");
							$("#chequeNoDiv").hide();
							$("#chequeDateDiv").hide();
							$("#depositAccountDiv").hide();
							$("#refNoDiv").hide();
						}
						$("#guardianName").val(data.guardianName.toUpperCase());
						$("#relationToApplicant").val(data.relationToApplicant.toUpperCase());
						$("#customerGender").val(data.customerGender);
						$("#dob").val(data.dob);
						$("#customerAge").val(data.customerAge);
						$("#relationshipStatus").val(data.relationshipStatus.toUpperCase());
						$("#customerAddress").val(data.customerAddress.toUpperCase());
						$("#category").val(data.category);
						$("#caste").val(data.caste);
						$("#district").val(data.district.toUpperCase());
						$("#state").val(data.state.toUpperCase());
						$("#branchName").val(data.branchName.toUpperCase());
						$("#pinCode").val(data.pinCode);
						$("#aadharNo").val(data.aadharNo);
						$("#panNo").val(data.panNo.toUpperCase());
						$("#voterNo").val(data.voterNo.toUpperCase());
						$("#drivingLicenceNo").val(data.drivingLicenceNo);
						$("#contactNo").val(data.contactNo);
						$("#emailId").val(data.emailId.toUpperCase());
						$("#profession").val(data.profession.toUpperCase());
						$("#academicBackground").val(data.academicBackground.toUpperCase());
						$("#referralCode").val(data.referralCode.toUpperCase());
						$("#referralName").val(data.referralName.toUpperCase());
						$("#shareValue").val(data.shareValue.toUpperCase());
						$("#noOfShare").val(data.noOfShare.toUpperCase());
						$("#shareAmount").val(data.shareAmount.toUpperCase());
						$("#lightBill").val(data.lightBill.toUpperCase());
						$("#taxBill").val(data.taxBill.toUpperCase());
						$("#minor").val(data.minor);
						//$("#photoPreview").attr("src", data.customerPhoto ? `Uploads/${data.customerPhoto}` : "Uploads/default-placeholder.jpg");

						//Nominee 
						$("#nomineeName").val(data.nomineeName.toUpperCase());
						$("#nomineeRelationToApplicant").val(data.nomineeRelationToApplicant.toUpperCase());
						$("#nomineeDOB").val(data.nomineeDOB);
						$("#nomineeAddress").val(data.nomineeAddress.toUpperCase());
						$("#nomineeKycNo").val(data.nomineeKycNo.toUpperCase());
						$("#nomineeMobileNo").val(data.nomineeMobileNo);
						$("#nomineeAge").val(data.nomineeAge);
						$("#nomineePanNo").val(data.nomineePanNo.toUpperCase());
						$("#nomineeKycType").val(data.nomineeKycType.toUpperCase());

						if (data.customerPhoto) {
							const photoPath = `Uploads/${data.customerPhoto}`;
							$("#photoPreview").attr("src", photoPath);
							$("#photoHidden").val(photoPath);
							const fakePhotoEvent = { target: { result: photoPath } };
							photoSizeEdit(fakePhotoEvent);

						} else {
							$("#photoPreview").attr("src", "Uploads/default-placeholder.jpg");
							$("#photoHidden").val("");
						}

						// Image: Signature
						if (data.customerSignature) {
							const signPath = `Uploads/${data.customerSignature}`;
							$("#signaturePreview").attr("src", signPath);
							$("#signatureHidden").val(signPath);
							const fakeSignEvent = { target: { result: signPath } };
							signatureSizeEdit(fakeSignEvent);

						} else {
							$("#signaturePreview").attr("src", "Uploads/default-placeholder.jpg");
							$("#signatureHidden").val("");
						}

						if (data.customerVoter) {
							const voterPath = `Uploads/${data.customerVoter}`;
							$("#voterPreview").attr("src", voterPath);
							$("#voterHidden").val(voterPath);
							const fakeVoterEvent = { target: { result: voterPath } };
							voterSizeEdit(fakeVoterEvent);

						} else {
							$("#voterPreview").attr("src", "Uploads/default-placeholder.jpg");
							$("#voterHidden").val("");
						}

						if (data.customerDriving) {
							const drivingPath = `Uploads/${data.customerDriving}`;
							$("#drivingPreview").attr("src", drivingPath);
							$("#drivingHidden").val(drivingPath);
							const fakeDrivingEvent = { target: { result: drivingPath } };
							drivingSizeEdit(fakeDrivingEvent);

						} else {
							$("#drivingPreview").attr("src", "Uploads/default-placeholder.jpg");
							$("#drivingHidden").val("");
						}

						if (data.newlyAddedImage) {
							const newlyAddedPath = `Uploads/${data.newlyAddedImage}`;
							$("#newlyAddedPreview").attr("src", newlyAddedPath);
							$("#newlyAddedHidden").val(newlyAddedPath);
							const fakeNewlyAddedEvent = { target: { result: newlyAddedPath } };
							newlyAddedSizeEdit(fakeNewlyAddedEvent);

						} else {
							$("#newlyAddedPreview").attr("src", "Uploads/default-placeholder.jpg");
							$("#newlyAddedHidden").val("");
						}

						if (data.nomineAadhar) {
							const nomineAadharPath = `Uploads/${data.nomineAadhar}`;
							$("#nomineAadharPreview").attr("src", nomineAadharPath);
							$("#nomineAadharHidden").val(nomineAadharPath);
							const fakeNomineAadharEvent = { target: { result: nomineAadharPath } };
							nomineAadharSizeEdit(fakeNomineAadharEvent);

						} else {
							$("#nomineAadharPreview").attr("src", "Uploads/default-placeholder.jpg");
							$("#nomineAadharHidden").val("");
						}

						if (data.nomineSignature) {
							const nomineSignaturePath = `Uploads/${data.nomineSignature}`;
							$("#nomineSignaturePreview").attr("src", nomineSignaturePath);
							$("#nomineSignatureHidden").val(nomineSignaturePath);
							const fakeNomineSignatureEvent = { target: { result: nomineSignaturePath } };
							nomineSignatureSizeEdit(fakeNomineSignatureEvent);

						} else {
							$("#nomineSignaturePreview").attr("src", "Uploads/default-placeholder.jpg");
							$("#nomineSignatureHidden").val("");
						}

						if (parseInt(data.memberStatus) === 1) {
							$('#toggle-member-status').prop('checked', true);
						} else {
							$('#toggle-member-status').prop('checked', false);
						}

						if (parseInt(data.memberBanking) === 1) {
							$('#toggle-mobile-banking').prop('checked', true);
						} else {
							$('#toggle-mobile-banking').prop('checked', false);
						}

						if (parseInt(data.netBanking) === 1) {
							$('#toggle-net-banking').prop('checked', true);
						} else {
							$('#toggle-net-banking').prop('checked', false);
						}

						if (parseInt(data.smsSend) === 1) {
							$('#toggle-sms-send').prop('checked', true);
						} else {
							$('#toggle-sms-send').prop('checked', false);
						}

						updateToggleColor(document.getElementById('toggle-member-status'));
						updateToggleColor(document.getElementById('toggle-mobile-banking'));
						updateToggleColor(document.getElementById('toggle-net-banking'));
						updateToggleColor(document.getElementById('toggle-sms-send'));

						//Fees Details
						$("#memberFees").val(data.memberFees);
						$("#buildingFund").val(data.buildingFund);
						$("#adminCharge").val(data.adminCharge);
						$("#documentCharge").val(data.documentCharge);
						$("#entryFee").val(data.entryFee);
						$("#otherCharge").val(data.otherCharge);
						$("#paymentBy").val(data.paymentBy);
						$("#remarks").val(data.remarks);

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

	$.ajax({
		url: "api/preference/getAllRelativeModule", // Add base path if needed like /api/preference/getAllBranchModule
		type: "GET",
		success: function(response) {
			if (response.status == "FOUND") {
				const relativeList = response.data;
				$("#nomineeRelationToApplicant").empty(); // Clear existing options
				$("#nomineeRelationToApplicant").append("<option value=''>-- SELECT RELATIVE --</option>");

				for (let i = 0; i < relativeList.length; i++) {
					let relative = relativeList[i];
					let option = `<option value="${relative.relation}">${relative.relation}</option>`;
					$("#nomineeRelationToApplicant").append(option);
				}
			} else {
				// handled without alert
			}
		},
		error: function(xhr) {
			console.error("ERROR LOADING BRANCHES:", xhr.responseText);
			alert("FAILED TO LOAD DROPDOWN DATA.");
		}
	});



	$('#updateBtn').click(async function(event) {
		event.preventDefault();
		const customerCode = $('#customerCode').val();
		if (!customerCode) {
			alert("FIRST SELECT THE DATA, THEN PROCEED TO UPDATE.");
			return;
		}
		var customerData = new FormData();
		var id = $('#id').val();

		const firstName = ($('#firstName').val() || "").trim().toUpperCase();
		const middleName = ($('#middleName').val() || "").trim().toUpperCase();
		const lastName = ($('#lastName').val() || "").trim().toUpperCase();
		const customerName = [firstName, middleName, lastName].filter(Boolean).join(" ");

		customerData.append("id", id);
		customerData.append("memberCode", customerCode);
		customerData.append("signupDate", $('#signupDate').val());
		customerData.append("authenticateFor", $('#authenticateFor').val());
		customerData.append("major", $('#major').val());
		customerData.append("customerName", customerName);
		customerData.append("firstName", firstName);
		customerData.append("middleName", middleName);
		customerData.append("lastName", lastName);
		customerData.append("customerGender", ($('#customerGender').val() || "").toUpperCase());
		customerData.append("guardianName", ($('#guardianName').val() || "").toUpperCase());
		customerData.append("guardianAccountNo", ($('#guardianAccNo').val() || "").toUpperCase());
		customerData.append("relationToApplicant", ($('#relationToApplicant').val() || "").toUpperCase());
		customerData.append("dob", $('#dob').val());
		customerData.append("customerAge", $('#customerAge').val());
		customerData.append("relationshipStatus", ($('#relationshipStatus').val() || "").toUpperCase());
		customerData.append("customerAddress", ($('#customerAddress').val() || "").toUpperCase());
		customerData.append("category", ($('#category').val() || "").toUpperCase());
		customerData.append("caste", ($('#caste').val() || "").toUpperCase());
		customerData.append("state", ($('#state').val() || "").toUpperCase());
		customerData.append("district", ($('#district').val() || "").toUpperCase());
		customerData.append("aadharNo", $('#aadharNo').val());
		customerData.append("pinCode", $('#pinCode').val());
		customerData.append("branchName", ($('#branchName').val() || "").toUpperCase());
		customerData.append("panNo", ($('#panNo').val() || "").toUpperCase());
		customerData.append("voterNo", ($('#voterNo').val() || "").toUpperCase());
		customerData.append("drivingLicenceNo", ($('#drivingLicenceNo').val() || "").toUpperCase());
		customerData.append("referralCode", ($('#referralCode').val() || "").toUpperCase());
		customerData.append("referralName", ($('#referralName').val() || "").toUpperCase());
		customerData.append("contactNo", $('#contactNo').val());
		customerData.append("emailId", ($('#emailId').val() || "").toUpperCase());
		customerData.append("profession", ($('#profession').val() || "").toUpperCase());
		customerData.append("academicBackground", ($('#academicBackground').val() || "").toUpperCase());
		customerData.append("shareValue", $('#shareValue').val());
		customerData.append("noOfShare", $('#noOfShare').val());
		customerData.append("shareAmount", $('#shareAmount').val());
		customerData.append("lightBill", ($('#lightBill').val() || "").toUpperCase());
		customerData.append("taxBill", ($('#taxBill').val() || "").toUpperCase());
		customerData.append("minor", ($('#minor').val() || "").toUpperCase());
		customerData.append("accountType", $('#accountType').val());

		// Nominee
		customerData.append("nomineeName", ($('#nomineeName').val() || "").toUpperCase());
		customerData.append("nomineeRelationToApplicant", ($('#nomineeRelationToApplicant').val() || "").toUpperCase());
		customerData.append("nomineeAddress", ($('#nomineeAddress').val() || "").toUpperCase());
		customerData.append("nomineeKycNo", ($('#nomineeKycNo').val() || "").toUpperCase());
		customerData.append("nomineeMobileNo", $('#nomineeMobileNo').val());
		customerData.append("nomineeAge", $('#nomineeAge').val());
		customerData.append("nomineePanNo", ($('#nomineePanNo').val() || "").toUpperCase());
		customerData.append("nomineeKycType", ($('#nomineeKycType').val() || "").toUpperCase());
		customerData.append("nomineeDOB", $('#nomineeDOB').val());

		// Fees Details
		customerData.append("memberFees", $('#memberFees').val());
		customerData.append("buildingFund", $('#buildingFund').val());
		customerData.append("adminCharge", $('#adminCharge').val());
		customerData.append("documentCharge", $('#documentCharge').val());
		customerData.append("entryFee", $('#entryFee').val());
		customerData.append("otherCharge", $('#otherCharge').val());
		customerData.append("paymentBy", $('#paymentBy').val());
		customerData.append("chequeNo", ($('#chequeNo').val() || "").toUpperCase());
		customerData.append("chequeDate", $('#chequeDate').val());
		customerData.append("depositAcNo", ($('#depositAccount').val() || "").toUpperCase());
		customerData.append("referenceNo", ($('#referenceNo').val() || "").toUpperCase());
		customerData.append("remarks", ($('#remarks').val() || "").toUpperCase());

		// Toggles
		customerData.append("memberStatus", $('#toggle-member-status').is(':checked') ? 1 : 0);
		customerData.append("memberBanking", $('#toggle-mobile-banking').is(':checked') ? 1 : 0);
		customerData.append("netBanking", $('#toggle-net-banking').is(':checked') ? 1 : 0);
		customerData.append("smsSend", $('#toggle-sms-send').is(':checked') ? 1 : 0);

		const photoFile = $('#customerPhoto')[0].files[0];
		const signatureFile = $('#customerSignature')[0].files[0];
		const votingFile = $('#customerVoter')[0].files[0];
		const drivingFile = $('#customerDriving')[0].files[0];
		const newlyAddedFile = $('#newlyAddedImage')[0].files[0];
		const nomineAadharFile = $('#nomineAadhar')[0] ? $('#nomineAadhar')[0].files[0] : null;
		const nomineSignatureFile = $('#nomineSignature')[0] ? $('#nomineSignature')[0].files[0] : null;

		if (photoFile) {
			customerData.append("customerPhoto", photoFile);
		}

		if (signatureFile) {
			customerData.append("customerSignature", signatureFile);
		}

		if (votingFile) {
			customerData.append("customerVoter", votingFile);
		}

		if (drivingFile) {
			customerData.append("customerDriving", drivingFile);
		}

		if (newlyAddedFile) {
			customerData.append("newlyAddedImage", newlyAddedFile);
		}

		if (nomineAadharFile) {
			customerData.append("nomineAadhar", nomineAadharFile);
		}

		if (nomineSignatureFile) {
			customerData.append("nomineSignature", nomineSignatureFile);
		}

		$.ajax({
			type: 'POST',
			url: 'api/customermanagement/saveOrUpdateCustomer',
			data: customerData,
			contentType: false,
			processData: false,
			cache: false,
			success: function(response) {
				if (response.status === "OK") {
					alert("CUSTOMER DATA UPDATED SUCCESSFULLY");
					location.reload();
				} else {
					alert("SOMETHING WENT WRONG: " + response.message);
				}
			},
			error: function(xhr) {
				alert("ERROR WHILE SAVING DATA: " + xhr.responseText);
			}
		});
	});

	$('#deleteBtn').click(function(event) {
		var id = $("#id").val();
		let customerCode = $("#customerCode").val();
		if (customerCode !== "") {
			if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS CUSTOMER DATA?")) {
				$.ajax({
					url: "api/datacorrection/deleteCustomerDataByForm",
					type: "POST",
					data: { id: id },
					success: function(response) {
						if (response.status == "OK") {
							alert("CUSTOMER DATA DELETED SUCCESSFULLY");
							location.reload();
						} else {
							alert("DELETE FAILED: " + response.message);
						}
					},
					error: function(xhr, status, error) {
						alert("FAILED TO DELETE CUSTOMER.");
						console.error("ERROR:", error);
					}
				});
			}
		}
		else {
			alert("FIRST SELECT ANY ONE DATA THEN PROCEED TO DELETE!");
		}

	});

	$("#printBtn").on("click", function() {

		const customerCode = $("#customerCode").val();
		if (!customerCode) {
			alert("PLEASE SELECT ATLEAST ONE DATA THEN PROCEED TO PRINT!");
			return;
		}

		const c = window.companyData;

		let companyHeader = `
	        <h1 style="text-align:center; margin-bottom:0;">${c.companyName}</h1>
	        <h3 style="text-align:center; margin-top:5px;">(${c.shortName})</h3>
	        <p style="text-align:center;">
	            ${c.address}, ${c.city}, ${c.state} - ${c.pinCode}<br>
	            CIN: ${c.cinNo} | EMAIL: ${c.emailId.toLowerCase()} | HELPLINE: ${c.helplineNo}
	        </p>
	        <hr>
	    `;

		function getVal(id) {
			let el = $("#" + id);
			if (el.is("select")) {
				let txt = el.find("option:selected").text();
				if (el.data("select2")) {
					let s2 = el.select2("data");
					if (s2.length > 0) txt = s2[0].text;
				}
				if (id === "customerCode" && txt.includes("-")) {
					txt = txt.split("-")[0].trim();
				}
				return txt;
			}
			return el.val() ? el.val() : "";
		}

		const photo = $("#photoPreview").attr("src");
		const sign = $("#signaturePreview").attr("src");

		const printContent = `
	        ${companyHeader}

	        <h2 style="text-align:center;margin-bottom:20px;">CUSTOMER DETAILS</h2>

	        <table class="print-table">

	            <tr><th>CUSTOMER CODE</th><td>${getVal("customerCode")}</td></tr>
	            <tr><th>CUSTOMER NAME</th><td>${getVal("customerName")}</td></tr>
	            <tr><th>GENDER</th><td>${getVal("customerGender")}</td></tr>
	            <tr><th>DATE OF BIRTH</th><td>${getVal("dob")}</td></tr>
	            <tr><th>AGE</th><td>${getVal("customerAge")}</td></tr>
	            <tr><th>RELATIONSHIP STATUS</th><td>${getVal("relationshipStatus")}</td></tr>
	            <tr><th>ADDRESS</th><td>${getVal("customerAddress")}</td></tr>
	            <tr><th>DISTRICT</th><td>${getVal("district")}</td></tr>
	            <tr><th>STATE</th><td>${getVal("state")}</td></tr>
	            <tr><th>BRANCH</th><td>${getVal("branchName")}</td></tr>
	            <tr><th>PIN CODE</th><td>${getVal("pinCode")}</td></tr>
	            <tr><th>AADHAR NO</th><td>${getVal("aadharNo")}</td></tr>
	            <tr><th>PAN NO</th><td>${getVal("panNo")}</td></tr>
	            <tr><th>VOTER ID</th><td>${getVal("voterNo")}</td></tr>
	            <tr><th>CONTACT NO</th><td>${getVal("contactNo")}</td></tr>
	            <tr><th>EMAIL ID</th><td>${getVal("emailId")}</td></tr>
	            <tr><th>PROFESSION</th><td>${getVal("profession")}</td></tr>
	            <tr><th>ACADEMIC BACKGROUND</th><td>${getVal("academicBackground")}</td></tr>
	            <tr><th>REFERRAL CODE</th><td>${getVal("referralCode")}</td></tr>
	            <tr><th>REFERRAL NAME</th><td>${getVal("referralName")}</td></tr>

				<tr><th colspan="2" style="background:#f1f1f1;text-align:center;">CUSTOMER IMAGES</th></tr>
	            <tr>
	                <th>CUSTOMER PHOTO</th>
	                <td><img src="${photo}" style="width:120px;height:120px;object-fit:cover;border-radius:10px;"></td>
	            </tr>

	            <tr>
	                <th>CUSTOMER SIGNATURE</th>
	                <td><img src="${sign}" style="width:150px;height:70px;object-fit:contain;"></td>
	            </tr>

	            <tr><th colspan="2" style="background:#f1f1f1;text-align:center;">NOMINEE DETAILS</th></tr>
	            <tr><th>NOMINEE NAME</th><td>${getVal("nomineeName")}</td></tr>
	            <tr><th>RELATION</th><td>${getVal("nomineeRelationToApplicant")}</td></tr>
	            <tr><th>ADDRESS</th><td>${getVal("nomineeAddress")}</td></tr>
	            <tr><th>KYC NO</th><td>${getVal("nomineeKycNo")}</td></tr>
	            <tr><th>NOMINEE MOBILE</th><td>${getVal("nomineeMobileNo")}</td></tr>
	            <tr><th>NOMINEE AGE</th><td>${getVal("nomineeAge")}</td></tr>
	            <tr><th>NOMINEE PAN</th><td>${getVal("nomineePanNo")}</td></tr>
	            <tr><th>KYC TYPE</th><td>${getVal("nomineeKycType")}</td></tr>

	        </table>
	    `;

		const printWindow = window.open("", "_blank");

		printWindow.document.write(`
	        <html>
	        <head>
	            <title>CUSTOMER DETAILS</title>
	            <style>
	                body { font-family: Arial; padding: 25px; }
	                .print-table { width: 100%; border-collapse: collapse; }
	                .print-table th, .print-table td {
	                    padding: 8px; border: 1px solid #ccc; font-size: 14px;
	                }
	                .print-table th { background: #f2f2f2; width:30%; }
	            </style>
	        </head>
	        <body>
	            ${printContent}
	        </body>
	        </html>
	    `);

		printWindow.document.close();

		setTimeout(() => {
			printWindow.focus();
			printWindow.print();
		}, 300);
	});


});

document.addEventListener('DOMContentLoaded', function() {
	const toggles = document.querySelectorAll('.toggle__input');

	toggles.forEach((toggle) => {
		updateToggleColor(toggle);

		toggle.addEventListener('change', () => {
			updateToggleColor(toggle);
			console.log(`${toggle.dataset.toggleType} IS NOW ${toggle.checked}`);
		});
	});

	function updateToggleColor(input) {
		const label = input.nextElementSibling;
		if (label) {
			label.style.backgroundColor = input.checked ? '#28a745' : '#ccc';
		}
	}
});

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

document.addEventListener('DOMContentLoaded', function() {
	const toggles = document.querySelectorAll('.toggle__input');

	toggles.forEach((toggle) => {
		updateToggleColor(toggle); // initial state
		toggle.addEventListener('change', function() {
			updateToggleColor(this);
		});
	});
});

function photoUpload() {
	const file = document.getElementById("customerPhoto").files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function(e) {
			photoSizeEdit(e);
			$("#photoHidden").val("");

		};
		reader.readAsDataURL(file);
	} else {
		alert("PLEASE UPLOAD A VALID IMAGE FILE FOR PHOTO.");
	}
}


//Ayush
function signatureUpload() {
	const file = document.getElementById("customerSignature").files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function(e) {
			signatureSizeEdit(e);
			$("#signatureHidden").val("");
		};
		reader.readAsDataURL(file);
	} else {
		alert("PLEASE UPLOAD A VALID IMAGE FILE FOR SIGNATURE.");
	}
}

function voterUpload() {
	const file = document.getElementById("customerVoter").files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function(e) {
			voterSizeEdit(e);
			$("#voterHidden").val("");
		};
		reader.readAsDataURL(file);
	} else {
		alert("PLEASE UPLOAD A VALID IMAGE FILE FOR VOTER.");
	}
}

function drivingUpload() {
	const file = document.getElementById("customerDriving").files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function(e) {
			drivingSizeEdit(e);
			$("#drivingHidden").val("");
		};
		reader.readAsDataURL(file);
	} else {
		alert("PLEASE UPLOAD A VALID IMAGE FILE FOR DRIVING LICENSE.");
	}
}

function newlyAddedUpload() {
	const file = document.getElementById("newlyAddedImage").files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function(e) {
			newlyAddedSizeEdit(e);
			$("#newlyAddedHidden").val("");
		};
		reader.readAsDataURL(file);
	} else {
		alert("PLEASE UPLOAD A VALID IMAGE FILE FOR THIS IMAGE.");
	}
}

function nomineAadharUpload() {
	const file = document.getElementById("nomineAadhar").files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function(e) {
			nomineAadharSizeEdit(e);
			$("#nomineAadharHidden").val("");
		};
		reader.readAsDataURL(file);
	} else {
		alert("PLEASE UPLOAD A VALID IMAGE FILE FOR NOMINEE AADHAR.");
	}
}

function nomineSignatureUpload() {
	const file = document.getElementById("nomineSignature").files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function(e) {
			nomineAadharSizeEdit(e);
			$("#nomineSignatureHidden").val("");
		};
		reader.readAsDataURL(file);
	} else {
		alert("PLEASE UPLOAD A VALID IMAGE FILE FOR NOMINEE AADHAR.");
	}
}

function nomineSignatureUpload() {
	const file = document.getElementById("nomineSignature").files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function(e) {
			nomineAadharSizeEdit(e);
			$("#nomineSignatureHidden").val("");
		};
		reader.readAsDataURL(file);
	} else {
		alert("PLEASE UPLOAD A VALID IMAGE FILE FOR NOMINEE SIGNATURE.");
	}
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

function voterSizeEdit(e) {
	const previewimg = document.getElementById("voterPreview");
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
}

function drivingSizeEdit(e) {
	const previewimg = document.getElementById("drivingPreview");
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
}

function newlyAddedSizeEdit(e) {
	const previewimg = document.getElementById("newlyAddedPreview");
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
}

function nomineAadharSizeEdit(e) {
	const previewimg = document.getElementById("nomineAadharPreview");
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
}

function nomineSignatureSizeEdit(e) {
	const previewimg = document.getElementById("nomineSignaturePreview");
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
}

function loadCompanyAdministration() {
	$.ajax({
		type: "GET",
		url: "api/preference/fetchAllCompanyAdministration",
		contentType: "application/json",
		success: function(response) {
			if (response.status === "FOUND" && response.data.length > 0) {
				let c = response.data[0];

				// Save for print use later
				window.companyData = c;

				// Show on screen (add your own div in JSP)
				$("#companyNameHeading").text(c.companyName + " (" + c.shortName + ")");
				$("#companyDetails").html(`
                        <b>SIGN UP DATE:</b> ${c.signUpDate} <br>
                        <b>CIN NO:</b> ${c.cinNo} <br>
                        <b>ADDRESS:</b> ${c.address}, ${c.city}, ${c.state} - ${c.pinCode} <br>
                        <b>EMAIL:</b> ${c.emailId} <br>
                        <b>HELPLINE:</b> ${c.helplineNo} <br>
                        <b>BRANCH MANAGER NO:</b> ${c.branchManagerContactNo}
                    `);
			}
		}
	});
}

loadCompanyAdministration();
