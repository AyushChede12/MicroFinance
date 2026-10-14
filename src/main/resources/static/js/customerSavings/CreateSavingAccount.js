function updateToggleColor(toggleElement) {
	if (!toggleElement) return;

	const label = toggleElement.nextElementSibling; // ASSUMES LABEL IS JUST AFTER INPUT
	if (label) {
		if (toggleElement.checked) {
			label.classList.add('active'); // CHECKBOX CHECKED HONE PAR CLASS ADD
		} else {
			label.classList.remove('active'); // UNCHECKED HONE PAR CLASS REMOVE
		}
	}
}

// AUR OPTIONAL: CLICK/CHANGE PAR AUTOMATICALLY UPDATE
document.querySelectorAll('.toggle__input').forEach(function(toggle) {
	toggle.addEventListener('change', function() {
		updateToggleColor(toggle);
	});
});




//SHUBHAM KEWAT
//FETCH POLICY NAME
/*document.getElementById("newPhoto").addEventListener("click", function() {
	document.getElementById("newPhotoFile").click();
});

document.getElementById("newPhoto").addEventListener("change", function() {
	const file = this.files[0];
	const error = document.getElementById("chknewPhoto");

	if (!file) {
		error.innerText = "PLEASE SELECT PHOTO";
		return;
	}

	if (!file.type.startsWith("image/")) {
		error.innerText = "ONLY IMAGE FILES ALLOWED";
		this.value = "";
		return;
	}

	const reader = new FileReader();
	reader.onload = function(e) {
		document.getElementById("newPhoto").src = e.target.result;
		error.innerText = "";
	};
	reader.readAsDataURL(file);
});


// -------- SIGNATURE --------
document.getElementById("newSignature").addEventListener("click", function() {
	document.getElementById("newSignatureFile").click();
});

document.getElementById("newSignatureFile").addEventListener("change", function() {
	const file = this.files[0];
	const error = document.getElementById("chknewSignature");

	if (!file) {
		error.innerText = "PLEASE SELECT SIGNATURE";
		return;
	}

	if (!file.type.startsWith("image/")) {
		error.innerText = "ONLY IMAGE FILES ALLOWED";
		this.value = "";
		return;
	}

	const reader = new FileReader();
	reader.onload = function(e) {
		document.getElementById("newSignature").src = e.target.result;
		error.innerText = "";
	};
	reader.readAsDataURL(file);
});
document.getElementById("jointPhoto").addEventListener("click", function() {
	document.getElementById("jointPhotoFile").click();
});

 WHEN FILE SELECTED
document.getElementById("jointPhotoFile").addEventListener("change", function() {
	const file = this.files[0];
	const errorMsg = document.getElementById("chkjointPhoto");

	if (!file) {
		errorMsg.innerText = "PLEASE SELECT JOINT PHOTO";
		return;
	}

	 VALIDATE IMAGE TYPE
	if (!file.type.startsWith("image/")) {
		errorMsg.innerText = "ONLY IMAGE FILES ARE ALLOWED";
		this.value = "";
		return;
	}

	 VALIDATE IMAGE SIZE (2MB)
	if (file.size > 2 * 1024 * 1024) {
		errorMsg.innerText = "IMAGE SIZE MUST BE LESS THAN 2MB";
		this.value = "";
		return;
	}

	 PREVIEW IMAGE
	const reader = new FileReader();
	reader.onload = function(e) {
		document.getElementById("jointPhoto").src = e.target.result;
		errorMsg.innerText = "";
	};
	reader.readAsDataURL(file);
});*/
$(document).ready(function() {
	$("#myJointPhoto").hide();
	$.ajax({
		url: "api/customersavings/fetchsavingchemecatalog",
		type: "GET",
		success: function(response) {
			console.log("API RESPONSE:", response);
			var dropdown = $('#selectPlan');
			dropdown.empty();
			dropdown.append('<option value="">--SELECT PLAN NAME--</option>');

			if (response.status === "FOUND" && response.data) {
				$.each(response.data, function(index, item) {
					dropdown.append('<option value="' + item + '">' + item.toUpperCase() + '</option>');
				});
			} else {
				dropdown.append('<option value="">NO POLICY FOUND</option>');
			}
		},
		error: function() {
			alert("FAILED TO FETCH POLICY NAME.");
		}
	});
});

//FETCH MINIMUM OPENING BALANCE
$('#selectPlan').on('change', function() {
	let selectedName = $(this).val();

	if (selectedName !== "") {
		$.ajax({
			url: 'api/customersavings/fetchpolicyname?policyName=' + encodeURIComponent(selectedName), // PASS AS QUERY PARAM
			type: 'GET',
			success: function(response) {
				if (response.status === "FOUND") {
					let customer = response.data[0];
					$('#balance').val(customer.monthlyMinimumBalance);
				} else {
					alert('NO DATA FOUND!');
					$('#balance').val('');
				}
			},
			error: function() {
				alert('ERROR WHILE FETCHING DATA!');
				$('#balance').val('');
			}
		});
	} else {
		$('#balance').val('');
	}
});


$(document).ready(function() {

	$.ajax({
		url: 'api/customermanagement/approved',
		type: 'GET',
		success: function(response) {
			if (response.status === "OK" && Array.isArray(response.data)) {

				const $select = $('#selectByCustomer');
				const $select1 = $('#jointOperationCode');

				$select.empty().append('<option value="">SELECT</option>');
				$select1.empty().append('<option value="">SELECT</option>');

				response.data.forEach(customer => {

					// BUILD CUSTOMER FULL NAME
					const fullName = [
						customer.firstName,
						customer.middleName,
						customer.lastName
					].filter(Boolean).join(" ");

					// ONLY ADD IF NAME & CODE EXIST
					if (fullName && customer.memberCode) {
						const optionText = `${(fullName).toUpperCase()} - ${customer.memberCode}`;
						const optionValue = customer.memberCode;

						$select.append(`<option value="${optionValue}">${optionText}</option>`);
						$select1.append(`<option value="${optionValue}">${customer.memberCode}</option>`);
					}
				});

			} else {
				alert("NO APPROVED CUSTOMERS FOUND.");
			}
		},
		error: function() {
			alert("FAILED TO FETCH APPROVED CUSTOMERS.");
		}
	});
});



//MEMBER CODE FETCH IN CUSTOMER NAME

$('#selectByCustomer').on('change', function() {
	let selectedCode = $(this).val();

	if (selectedCode !== "") {
		$.ajax({
			url: 'api/customersavings/fetchCustomerCode',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({ memberCode: selectedCode }),
			success: function(response) {
				if (response.status === "FOUND") {
					let customer = response.data[0];
					// BUILD FULL NAME
					const fullName = [
						customer.firstName,
						customer.middleName,
						customer.lastName
					].filter(Boolean).join(" ");
					$('#enterCustomerName').val(fullName.toUpperCase());
					$('#familyDetails').val(customer.guardianName.toUpperCase());
					$('#contactNumber').val(customer.contactNo.toUpperCase());
					$('#suggestedNomineeName').val(customer.nomineeName.toUpperCase());
					$('#suggestedNomineeAge').val(customer.nomineeAge);
					$('#suggestedNomineeRelation').val(customer.nomineeRelationToApplicant.toUpperCase());
					$('#address').val(customer.customerAddress.toUpperCase());
					$('#district').val(customer.district.toUpperCase());
					$('#branchName').val(customer.branchName.toUpperCase());
					$('#pinCode').val(customer.pinCode);
					$('#district').val(customer.district.toUpperCase());
					$('#state').val(customer.state.toUpperCase());
					$('#dateOfBirth').val(customer.dob);
					$('#emailId').val(customer.emailId.toUpperCase());
					$('#aadharNo').val(customer.aadharNo.toUpperCase());
					//PHOTO
					/*if (customer.customerPhoto) {
						const imagePath = `Uploads/${customer.customerPhoto}`; // CONSTRUCT FULL IMAGE PATH
						document.getElementById("photo").src = imagePath; // SET IMAGE SOURCE
						document.getElementById("photoHidden").value = customer.customerPhoto; // SET HIDDEN INPUT VALUE
					} else {
						document.getElementById("photo").src = 'Uploads/upload.jpg'; // DEFAULT PLACEHOLDER
						document.getElementById("photoHidden").value = ''; // CLEAR HIDDEN INPUT VALUE
					}*/
					if (customer.customerPhoto) {
						const imagePath = `Uploads/${customer.customerPhoto}`;
						$("#photoPreview").attr("src", imagePath);
						$("#photoHidden").val(imagePath);
						const fakePhotoEvent = { target: { result: imagePath } };
						photoSizeEdit(fakePhotoEvent);

					} else {
						$("#photoPreview").attr("src", "Uploads/default-placeholder.jpg");
						$("#photoHidden").val("");
					}

					if (customer.customerSignature) {
						const imagePath = `Uploads/${customer.customerSignature}`;
						$("#signaturePreview").attr("src", imagePath);
						$("#signatureHidden").val(imagePath);
						const fakePhotoEvent = { target: { result: imagePath } };
						photoSizeEdit(fakePhotoEvent);

					} else {
						$("#signaturePreview").attr("src", "Uploads/default-placeholder.jpg");
						$("#signatureHidden").val("");
					}
					//SIGNATURE
					/*if (customer.customerSignature) {
						const imagePath = `Uploads/${customer.customerSignature}`; // CONSTRUCT FULL IMAGE PATH
						document.getElementById("signature").src = imagePath; // SET IMAGE SOURCE
						document.getElementById("signatureHidden").value = customer.customerSignature; // SET HIDDEN INPUT VALUE
					} else {
						document.getElementById("signature").src = 'Uploads/upload.jpg'; // DEFAULT PLACEHOLDER
						document.getElementById("signatureHidden").value = ''; // CLEAR HIDDEN INPUT VALUE
					}*/

				} else {
					alert('NO CUSTOMER DATA FOUND!');
					$('#enterCustomerName').val('');
					$('#previousShareCount').val('');
					//$('#panCardNumber').val('');
				}
			},
			error: function() {
				alert('ERROR WHILE FETCHING CUSTOMER DATA!');
			}
		});
	} else {
		$('#enterCustomerName').val('');
		$('#previousShareCount').val('');
		$('#panCardNumber').val('');
	}
});

function newPhotoUpload() {
	const file = document.getElementById("newPhoto").files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function(e) {
			newPhotoSizeEdit(e);
			$("#newPhotoHidden").val("");
		};
		reader.readAsDataURL(file);
	} else {
		alert("PLEASE UPLOAD A VALID IMAGE FILE FOR PHOTO.");
	}
}

function newSignatureUpload() {
	const file = document.getElementById("newSignature").files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function(e) {
			newSignatureSizeEdit(e);
			$("#newSignatureHidden").val("");
		};
		reader.readAsDataURL(file);
	} else {
		alert("PLEASE UPLOAD A VALID IMAGE FILE FOR PHOTO.");
	}
}

function jointPhotoUpload() {
	const file = document.getElementById("jointPhoto").files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function(e) {
			jointPhotoSizeEdit(e);
			$("#jointPhotoHidden").val("");
		};
		reader.readAsDataURL(file);
	} else {
		alert("PLEASE UPLOAD A VALID IMAGE FILE FOR PHOTO.");
	}
}

//AYUSH
/*function signatureUpload() {
	const file = document.getElementById("signature").files[0];
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
}*/

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

function newPhotoSizeEdit(e) {
	const previewimg = document.getElementById("newPhotoPreview");
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
}


function newSignatureSizeEdit(e) {
	const previewimg = document.getElementById("newSignaturePreview");
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
}

function jointPhotoSizeEdit(e) {
	const previewimg = document.getElementById("jointPhotoPreview");
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
}




//FETCH ONLY CUSTOMER NAME ON CHANGE IN DROPDOWN
$('#jointOperationCode').on('change', function() {
	let selectedCode = $(this).val();

	if (selectedCode !== "") {
		$.ajax({
			url: 'api/customersavings/fetchCustomerCode',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({ memberCode: selectedCode }),
			success: function(response) {
				if (response.status === "FOUND") {
					let customer = response.data[0];
					$('#jointSurvivorCode').val(customer.customerName.toUpperCase());
					//JOINT PHOTO
					if (customer.customerPhoto) {
						const imagePath = `Uploads/${customer.customerPhoto}`; // CONSTRUCT FULL IMAGE PATH
						document.getElementById("jointPhoto").src = imagePath; // SET IMAGE SOURCE
						document.getElementById("jointPhotoHidden").value = customer.customerPhoto; // SET HIDDEN INPUT VALUE
					} else {
						document.getElementById("jointPhoto").src = 'Uploads/upload.jpg'; // DEFAULT PLACEHOLDER
						document.getElementById("jointPhotoHidden").value = ''; // CLEAR HIDDEN INPUT VALUE
					}
				} else {
					alert('NO CUSTOMER DATA FOUND!');
					$('#jointSurvivorCode').val('');
				}
			},
			error: function() {
				alert('ERROR WHILE FETCHING CUSTOMER DATA!');
				$('#jointSurvivorCode').val('');
			}
		});
	} else {
		$('#jointSurvivorCode').val('');
	}
});

//FETCH FINANCIAL NAME FROM FINANCIALCONSULTANTCONTROLLER
$('#financialConsultantCode').on('blur', function() {

	let selectedCode = $(this).val();

	if (selectedCode !== "") {
		$.ajax({
			url: 'api/customersavings/fetchfinancialcode?financialCode=' + encodeURIComponent(selectedCode), // PASS AS QUERY PARAM
			type: 'GET',
			success: function(response) {
				if (response.status === "FOUND") {
					let customer = response.data[0];
					$('#financialConsultantName').val(customer.financialName.toUpperCase());
				} else {
					alert('NO DATA FOUND!');
					$('#financialConsultantName').val('');
				}
			},
			error: function() {
				alert('ERROR WHILE FETCHING DATA!');
				$('#financialConsultantName').val('');
			}
		});
	} else {
		$('#financialConsultantName').val('');
	}
});



// SAVE SAVING ACCOUNT DETAILS
$(document).ready(function() {

	$.ajax({
		type: "GET",
		url: "api/customersavings/getAllSavingAccountData",
		dataType: "json",

		success: function(response) {
			console.log("FULL RESPONSE:", response);

			let tableBody = $(".datatable tbody");
			tableBody.empty();

			if (response.status === "FOUND" && response.data && response.data.length > 0) {

				let rows = "";

				response.data.forEach(function(item, index) {

					let branch = "";
					if (item.branchName != null) {
						branch = item.branchName.branchName || "";
					}

					rows += `
	                    <tr>
	                        <td>${index + 1}</td>
	                        <td>${item.accountNumber || ""}</td>
	                        <td>${(item.typeofaccount || "").toUpperCase()}</td>
	                        <td>${(item.selectByCustomer || "").toUpperCase()}</td>
	                        <td>${item.enterCustomerName ? item.enterCustomerName.toUpperCase() : ""}</td>
	                        <td>${(item.contactNumber || "").toUpperCase()}</td>
	                        <td>${branch.toUpperCase()}</td>
	                        <td>${item.address ? item.address.toUpperCase() : ""}</td>
	                        <td>${item.district ? item.district.toUpperCase() : ""}</td>
	                        <td>${item.state ? item.state.toUpperCase() : ""}</td>
	                        <td>
	                            <button class="iconbutton" onclick="viewData(${item.id})">
	                                <i class="fa-solid fa-pen-to-square text-primary"></i>
	                            </button>
	                        </td>
	                        <td>
	                            <button class="iconbutton" onclick="deleteData(${item.id})">
	                                <i class="fa-solid fa-trash text-danger"></i>
	                            </button>
	                        </td>
	                    </tr>`;
				});

				tableBody.html(rows);

			} else {
				tableBody.html(`
	                <tr>
	                    <td colspan="12" class="text-center">NO DATA FOUND</td>
	                </tr>
	            `);
			}
		},

		error: function(xhr) {
			console.log("API ERROR:", xhr.responseText);
			alert("ERROR WHILE CALLING API");
		}
	});
	// ENSURE THE HIDDEN INPUT IS UPDATED WITH THE IMAGE FILE NAME
	/*	let imageSrc = $('#photo').attr('src');
		let imageName = imageSrc.split('/').pop(); // EXTRACT THE FILE NAME
		$('#photoHidden').val(imageName);

		// ENSURE THE HIDDEN INPUT IS UPDATED WITH THE IMAGE FILE NAME
		let imageSrc1 = $('#signature').attr('src');
		let imageName1 = imageSrc1.split('/').pop(); // EXTRACT THE FILE NAME
		$('#signatureHidden').val(imageName1);*/

	// ENSURE THE HIDDEN INPUT IS UPDATED WITH THE IMAGE FILE NAME
	/*let imageSrc2 = $('#jointPhoto').attr('src');
	let imageName2 = imageSrc2.split('/').pop(); // EXTRACT THE FILE NAME
	$('#jointPhotoHidden').val(imageName2);

	let imageSrc3 = $('#newPhoto').attr('src');
	let imageName3 = imageSrc2.split('/').pop(); // EXTRACT THE FILE NAME
	$('#newPhotoHidden').val(imageName3);

	let imageSrc4 = $('#newSignature').attr('src');
	let imageName4 = imageSrc2.split('/').pop(); // EXTRACT THE FILE NAME
	$('#newSignatureHidden').val(imageName4);*/
	$('#saveBtn').click(function(event) {
		event.preventDefault();
		$('#chktypeofaccount, #chkselectcustomer, #chkselectplan, #chkfinancialcode, #chkopeningfees').text('');
		var typeofaccount = $('#typeofaccount').val().trim();
		var selectByCustomer = $('#selectByCustomer').val().trim();
		var selectPlan = $('#selectPlan').val().trim();
		var financialConsultantCode = $('#financialConsultantCode').val().trim();
		var openingFees = $('#openingFees').val().trim();

		let isValid = true;

		if (typeofaccount === '') { $('#chktypeofaccount').text('* PLEASE SELECT ACCOUNT TYPE'); isValid = false; }
		if (selectByCustomer === '') { alert("FIRST SELECT ANY CUSTOMER"); isValid = false; }
		if (selectPlan === '') { $('#chkselectplan').text('* PLEASE SELECT PLAN'); isValid = false; }
		if (financialConsultantCode === '') { $('#chkfinancialcode').text('* PLEASE ENTER FINANCIAL CODE'); isValid = false; }
		if (openingFees === '') { $('#chkopeningfees').text('* OPENING FEES IS MANDATORY'); isValid = false; }

		if (!isValid) return false;

		const formData = new FormData();

		/* ================= DTO FIELDS ================= */
		formData.append("id", $('#id').val());
		formData.append("typeofaccount", $('#typeofaccount').val());
		formData.append("openingDate", $('#openingDate').val());
		formData.append("selectByCustomer", $('#selectByCustomer').val());
		formData.append("enterCustomerName", $('#enterCustomerName').val());
		formData.append("dateOfBirth", $('#dateOfBirth').val());
		formData.append("familyDetails", $('#familyDetails').val());
		formData.append("contactNumber", $('#contactNumber').val());
		formData.append("suggestedNomineeName", $('#suggestedNomineeName').val());
		formData.append("suggestedNomineeAge", $('#suggestedNomineeAge').val());
		formData.append("suggestedNomineeRelation", $('#suggestedNomineeRelation').val());
		formData.append("address", $('#address').val());
		formData.append("district", $('#district').val());
		formData.append("branchName", $('#branchName').val());
		formData.append("state", $('#state').val());
		formData.append("pinCode", $('#pinCode').val());
		formData.append("operationType", $('#operationType').val());
		formData.append("jointOperationCode", $('#jointOperationCode').val());
		formData.append("jointSurvivorCode", $('#jointSurvivorCode').val());
		formData.append("familyRelation", $('#familyRelation').val());
		formData.append("selectPlan", $('#selectPlan').val());
		formData.append("balance", $('#openingFees').val());
		formData.append("financialConsultantCode", $('#financialConsultantCode').val());
		formData.append("financialConsultantName", $('#financialConsultantName').val());
		formData.append("openingFees", $('#openingFees').val());
		formData.append("emailId", $('#emailId').val());
		formData.append("aadharNo", $('#aadharNo').val());
		formData.append("authenticateWith", $('#authenticateWith').val());
		formData.append("modeOfPayment", $('#modeOfPayment').val());
		formData.append("chequeNo", $('#chequeNo').val());
		formData.append("chequeDate", $('#chequeDate').val());
		formData.append("depositAcc1", $('#depositAcc1').val());
		formData.append("refNumber1", $('#refNumber1').val());
		formData.append("depositAcc2", $('#depositAcc2').val());
		formData.append("refNumber2", $('#refNumber2').val());
		formData.append("depositAcc3", $('#depositAcc3').val());
		formData.append("comment", $('#comment').val());
		formData.append("accountNumber", $('#accountNumber').val());

		formData.append("accountStatus", $('#toggle-member-status').is(':checked') ? 1 : 0);
		formData.append("messageSend", $('#toggle-member-status1').is(':checked') ? 1 : 0);
		formData.append("debitCardIssue", $('#toggle-member-status2').is(':checked') ? 1 : 0);
		formData.append("isLocker", $('#toggle-member-status3').is(':checked') ? 1 : 0);
		formData.append("accountFreeze", $('#toggle-member-status4').is(':checked') ? 1 : 0);
		/* ================= STRING IMAGES ================= */
		// EXISTING IMAGES (ALREADY SAVED)
		function getFileName(path) {
			if (!path) return "";
			return path.substring(path.lastIndexOf('/') + 1);
		}

		var photoPath = $('#photoHidden').val();
		var signaturePath = $('#signatureHidden').val();

		var photoName = getFileName(photoPath);
		var signatureName = getFileName(signaturePath);

		formData.append("photo", photoName);
		formData.append("signature", signatureName);

		/* ================= MULTIPART FILES ================= */
		const jointPhoto = $('#jointPhoto')[0]?.files[0];
		const newPhoto = $('#newPhoto')[0]?.files[0];
		const newSignature = $('#newSignature')[0]?.files[0];

		if (jointPhoto) formData.append("jointPhoto", jointPhoto);
		if (newPhoto) formData.append("newPhoto", newPhoto);
		if (newSignature) formData.append("newSignature", newSignature);

		/* ================= DEBUG ================= */
		for (let pair of formData.entries()) {
			console.log(pair[0], pair[1]);
		}

		/* ================= AJAX ================= */
		$.ajax({
			type: "POST",
			url: "api/customersavings/saveandupdatesavingaccount",
			data: formData,
			processData: false,
			contentType: false,
			success: function(response) {
				if (response.status == 'OK') {
					alert((response.message + "\nACCOUNT NO: " + $('#accountNumber').val()).toUpperCase());
					location.reload();
				}
				else {
					alert("ELSE");
					alert("CUSTOMER ALREADY EXISTS!");
				}
			},
			error: function(xhr) {
				alert("CUSTOMER ALREADY EXISTS!");
			}
		});
	});


});

function viewData(id) {
	$.ajax({
		url: "api/customersavings/getSavingAccountDataById",
		type: "GET",
		data: { id: id },
		success: function(response) {
			if (response.status == "FOUND") {
				const data = response.data;

				// ---------- FILL INPUT FIELDS ----------
				$("#id").val(data.id);
				$("#openingDate").val(data.openingDate);
				$("#selectByCustomer").val(data.selectByCustomer);
				$("#enterCustomerName").val(data.enterCustomerName.toUpperCase());
				$("#dateOfBirth").val(data.dateOfBirth);
				$("#familyDetails").val(data.familyDetails.toUpperCase());
				$("#contactNumber").val(data.contactNumber.toUpperCase());
				$("#suggestedNomineeName").val(data.suggestedNomineeName.toUpperCase());
				$("#suggestedNomineeAge").val(data.suggestedNomineeAge);
				$("#suggestedNomineeRelation").val(data.suggestedNomineeRelation.toUpperCase());
				$("#address").val(data.address.toUpperCase());
				$("#district").val(data.district.toUpperCase());
				$("#branchName").val(data.branchName.toUpperCase());
				$("#state").val(data.state.toUpperCase());
				$("#pinCode").val(data.pinCode);
				$("#operationType").val(data.operationType);
				$("#jointOperationCode").val(data.jointOperationCode);
				$("#jointSurvivorCode").val(data.jointSurvivorCode.toUpperCase());
				$("#familyRelation").val(data.familyRelation.toUpperCase());
				$("#selectPlan").val(data.selectPlan);
				$("#balance").val(data.balance);
				$("#financialConsultantCode").val(data.financialConsultantCode);
				$("#financialConsultantName").val(data.financialConsultantName.toUpperCase());
				$("#openingFees").val(data.openingFees);
				$("#emailId").val(data.emailId.toUpperCase());
				$("#aadharNo").val(data.aadharNo);
				$("#authenticateWith").val(data.authenticateWith.toUpperCase());
				$("#modeOfPayment").val(data.modeOfPayment.toUpperCase());
				$("#chequeNo").val(data.chequeNo);
				$("#chequeDate").val(data.chequeDate);
				$("#depositAcc1").val(data.depositAcc1);
				$("#depositAcc2").val(data.depositAcc2);
				$("#refNumber1").val(data.refNumber1);
				$("#depositAcc3").val(data.depositAcc3);
				$("#refNumber2").val(data.refNumber2);
				$("#comment").val(data.comment.toUpperCase());
				$("#accountNumber").val(data.accountNumber);

				// ---------- PHOTOS ----------
				const setPhoto = (fieldId, value, sizeFunc) => {
					if (value) {
						const path = `Uploads/${value}`;
						$(`#${fieldId}Preview`).attr("src", path);
						$(`#${fieldId}Hidden`).val(path);
						sizeFunc({ target: { result: path } });
					} else {
						$(`#${fieldId}Preview`).attr("src", "Uploads/default-placeholder.jpg");
						$(`#${fieldId}Hidden`).val("");
					}
				};

				setPhoto("photo", data.photo, photoSizeEdit);
				setPhoto("signature", data.signature, signatureSizeEdit);
				setPhoto("newPhoto", data.newPhoto, newPhotoSizeEdit);
				setPhoto("newSignature", data.newSignature, newSignatureSizeEdit);

				// JOINT PHOTO FOR JOINT ACCOUNT
				if ($("#operationType").val() === "Joint") {
					$("#myJointPhoto").show();
					setPhoto("jointPhoto", data.jointPhoto, jointPhotoSizeEdit);
				}

				// ---------- TOGGLE BUTTONS ----------
				const toggles = [
					{ id: "toggle-member-status", value: data.accountStatus },
					{ id: "toggle-member-status1", value: data.messageSend },
					{ id: "toggle-member-status2", value: data.debitCardIssue },
					{ id: "toggle-member-status3", value: data.isLocker },
					{ id: "toggle-member-status4", value: data.accountFreeze }
				];

				toggles.forEach(function(t) {
					const toggle = document.getElementById(t.id);
					const label = toggle.nextElementSibling; // LABEL MUST BE NEXT TO INPUT
					toggle.checked = t.value === true || t.value === '1';

					// JS-ONLY GREEN COLOR FOR ON, KEEP SIZE INTACT
					if (label) {
						label.style.backgroundColor = toggle.checked ? "green" : "";
					}
				});

			} else {
				alert(("ACCOUNT NOT FOUND: " + response.message).toUpperCase());
			}
		},
		error: function(xhr) {
			alert(("REQUEST FAILED: " + xhr.responseText).toUpperCase());
		}
	});
}


function deleteData(id) {
	if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS SAVING ACCOUNT?")) {
		$.ajax({
			url: "api/customersavings/deleteSavingAccountDataById",
			type: "POST",
			data: { id: id },
			success: function(response) {
				if (response.status == "OK") {
					alert((response.message || "").toUpperCase());
					location.reload();
				} else {
					alert(("DELETE FAILED: " + response.message).toUpperCase());
				}
			},
			error: function(xhr, status, error) {
				alert("FAILED TO DELETE FINANCIAL YEAR.");
				console.error("ERROR:", error);
			}
		});
	}

}

$(document).ready(function() {

	$('#updateBtn').click(function(event) {
		event.preventDefault();

		const formData = new FormData();

		// ================= SAFE FILE INPUTS =================
		const newPhotoInput = document.getElementById("newPhoto");
		const newSignatureInput = document.getElementById("newSignature");
		const jointPhotoInput = document.getElementById("jointPhoto");

		const newPhotoFile =
			newPhotoInput && newPhotoInput.files.length > 0
				? newPhotoInput.files[0]
				: null;

		const newSignatureFile =
			newSignatureInput && newSignatureInput.files.length > 0
				? newSignatureInput.files[0]
				: null;

		const newJointPhotoFile =
			jointPhotoInput && jointPhotoInput.files.length > 0
				? jointPhotoInput.files[0]
				: null;

		// ================= NORMAL FIELDS =================
		formData.append("id", $('#id').val());
		formData.append("typeofaccount", $('#typeofaccount').val());
		formData.append("openingDate", $('#openingDate').val());
		formData.append("selectByCustomer", $('#selectByCustomer').val());
		formData.append("enterCustomerName", $('#enterCustomerName').val());
		formData.append("dateOfBirth", $('#dateOfBirth').val());
		formData.append("familyDetails", $('#familyDetails').val());
		formData.append("contactNumber", $('#contactNumber').val());
		formData.append("suggestedNomineeName", $('#suggestedNomineeName').val());
		formData.append("suggestedNomineeAge", $('#suggestedNomineeAge').val());
		formData.append("suggestedNomineeRelation", $('#suggestedNomineeRelation').val());
		formData.append("address", $('#address').val());
		formData.append("district", $('#district').val());
		formData.append("branchName", $('#branchName').val());
		formData.append("state", $('#state').val());
		formData.append("pinCode", $('#pinCode').val());
		formData.append("operationType", $('#operationType').val());
		formData.append("jointOperationCode", $('#jointOperationCode').val());
		formData.append("jointSurvivorCode", $('#jointSurvivorCode').val());
		formData.append("familyRelation", $('#familyRelation').val());
		formData.append("selectPlan", $('#selectPlan').val());
		formData.append("balance", $('#balance').val());
		formData.append("financialConsultantCode", $('#financialConsultantCode').val());
		formData.append("financialConsultantName", $('#financialConsultantName').val());
		formData.append("openingFees", $('#openingFees').val());
		formData.append("emailId", $('#emailId').val());
		formData.append("aadharNo", $('#aadharNo').val());
		formData.append("authenticateWith", $('#authenticateWith').val());
		formData.append("modeOfPayment", $('#modeOfPayment').val());
		formData.append("chequeNo", $('#chequeNo').val());
		formData.append("chequeDate", $('#chequeDate').val());
		formData.append("depositAcc1", $('#depositAcc1').val());
		formData.append("refNumber1", $('#refNumber1').val());
		formData.append("depositAcc2", $('#depositAcc2').val());
		formData.append("refNumber2", $('#refNumber2').val());
		formData.append("depositAcc3", $('#depositAcc3').val());
		formData.append("comment", $('#comment').val());
		formData.append("accountNumber", $('#accountNumber').val());

		formData.append("accountStatus", $('#toggle-member-status').is(':checked') ? 1 : 0);
		formData.append("messageSend", $('#toggle-member-status1').is(':checked') ? 1 : 0);
		formData.append("debitCardIssue", $('#toggle-member-status2').is(':checked') ? 1 : 0);
		formData.append("isLocker", $('#toggle-member-status3').is(':checked') ? 1 : 0);
		formData.append("accountFreeze", $('#toggle-member-status4').is(':checked') ? 1 : 0);

		// ================= FILE APPEND (VERY IMPORTANT) =================
		// NOTE: MULTIPARTFILE KE LIYE STRING KABHI MAT BHEJO

		if (newPhotoFile) {
			formData.append("newPhoto", newPhotoFile); // THIS SHOULD MATCH CONTROLLER PARAM
		}

		if (newSignatureFile) {
			formData.append("newSignature", newSignatureFile);
		}

		if (newJointPhotoFile) {
			formData.append("jointPhoto", newJointPhotoFile);
		}

		// ================= DEBUG =================
		for (let pair of formData.entries()) {
			console.log(pair[0], pair[1]);
		}

		// ================= AJAX =================
		$.ajax({
			type: "POST",
			url: "api/customersavings/saveandupdatesavingaccount",
			data: formData,
			processData: false,
			contentType: false,
			success: function() {
				alert(("SAVING ACCOUNT DATA UPDATED SUCCESSFULLY!\nACCOUNT NO : " + $('#accountNumber').val()).toUpperCase());
				location.reload();
			},
			error: function(xhr) {
				console.error(xhr.responseText);
				alert("UPDATE FAILED");
			}
		});
	});

});



function operationTypeFunc() {
	var operationType = $("#operationType").val();
	if (operationType === 'Single') {
		$("#myJointPhoto").hide();
	}
	else {
		$("#myJointPhoto").show();
	}
}

document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("memberFeesTable").style.display = "none";
});

document.getElementById("openingFees").addEventListener("click", function(event) {
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
	document.getElementById("openingFees").value = total;
}

function operationTypeFunc() {

	var operationType = $("#operationType").val();

	if (operationType === 'Joint') {

		// SHOW JOINT SECTION
		$("#myJointPhoto").show();

		// SHOW JOINT OPERATION CODE FIELD
		$("#jointOperationCode").closest(".col-lg-3").show();

		// SHOW MEMBER CODE FIELD
		$("#memberCode").closest(".col-lg-3").show();

	} else {

		// HIDE ALL JOINT FIELDS
		$("#myJointPhoto").hide();
		$("#jointOperationCode").closest(".col-lg-3").hide();
		$("#memberCode").closest(".col-lg-3").hide();
	}
}

$('#jointOperationCode').on('change', function() {

	let selectedCode = $(this).val();

	if (selectedCode !== "") {

		$.ajax({
			url: 'api/customersavings/fetchCustomerCode',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({ memberCode: selectedCode }),

			success: function(response) {

				if (response.status === "FOUND") {

					let customer = response.data[0];

					// ✅ MEMBER CODE
					$("#memberCode").val(customer.memberCode);

					// ✅ MEMBER FULL NAME
					const fullName = [
						customer.firstName,
						customer.middleName,
						customer.lastName
					].filter(Boolean).join(" ");

					$("#memberName").val(fullName.toUpperCase());

					// ✅ PHOTO (OPTIONAL)
					if (customer.customerPhoto) {
						const imagePath = `Uploads/${customer.customerPhoto}`;
						$("#jointPhotoPreview").attr("src", imagePath);
						$("#jointPhotoHidden").val(customer.customerPhoto);
					}

				} else {
					$("#memberCode").val("");
					$("#memberName").val("");
				}
			},

			error: function() {
				alert("ERROR FETCHING MEMBER");
				$("#memberCode").val("");
				$("#memberName").val("");
			}
		});

	} else {
		$("#memberCode").val("");
		$("#memberName").val("");
	}
});