$(document).ready(function() {

	//dropdown with search
	$.ajax({
		url: 'api/reports/getApprovedSavingAccount',
		type: 'GET',
		success: function(response) {
			if (response.status === "OK") {
				let savingOptions = response.data.map(function(item) {
					return {
						id: item.accountNumber,
						text: item.accountNumber + " - " + item.enterCustomerName
					};
				});

				// Initialize Select2 with full data and custom search matcher
				$('#accountNumber').select2({
					placeholder: '-- Search Account Number or Name --',
					data: savingOptions,
					matcher: function(params, data) {
						// If no search term, return all
						if ($.trim(params.term) === '') {
							return data;
						}

						if (typeof data.text === 'undefined') {
							return null;
						}

						// Case-insensitive match on memberCode or customerName
						const term = params.term.toLowerCase();
						const text = data.text.toLowerCase();

						if (text.includes(term)) {
							return data;
						}

						return null;
					}
				});

			} else {
				alert("No Account Number found.");
			}
		},
		error: function() {
			alert("Failed to load Account Number.");
		}
	});

	$.ajax({
		url: "api/customersavings/getAllSavingAccountData",
		type: "GET",
		success: function(response) {
			if (response.status === "FOUND") {
				$("#selectByCustomer").empty().append("<option value=''>-- Select Customer Code --</option>");
				response.data.forEach(function(item) {
					$("#selectByCustomer").append(`<option value='${item.selectByCustomer}'>${item.selectByCustomer}</option>`);
				});
			} else {
				alert("No Account Number found.");
			}
		},
		error: function() {
			alert("Failed to load Account Numbers.");
		}
	});

	$.ajax({
		url: "api/customersavings/getAllSavingAccountData",
		type: "GET",
		success: function(response) {
			if (response.status === "FOUND") {
				$("#financialConsultantCode").empty().append("<option value=''>-- Select Financial Code --</option>");
				response.data.forEach(function(item) {
					$("#financialConsultantCode").append(`<option value='${item.financialConsultantCode}'>${item.financialConsultantCode}</option>`);
				});
			} else {
				alert("No Account Number found.");
			}
		},
		error: function() {
			alert("Failed to load Account Numbers.");
		}
	});

	$("#accountNumber").on("change", function() {
		let accountNumber = $(this).val();

		$.ajax({
			type: "GET",
			url: "api/customersavings/getallbyaccountnumber", // ✅ Update to your actual API path
			data: { accountNumber: accountNumber },
			success: function(response) {
				if (response.status === "OK") {
					const data = response.data[0]; // assuming single entry

					// Now bind each field to your input elements
					$("#id").val(data.id);
					$("#typeofaccount").val(data.typeofaccount);
					$("#openingDate").val(data.openingDate);
					$("#selectByCustomer").val(data.selectByCustomer);
					$("#enterCustomerName").val(data.enterCustomerName);
					$("#dateOfBirth").val(data.dateOfBirth);
					$("#familyDetails").val(data.familyDetails);
					$("#contactNumber").val(data.contactNumber);
					$("#suggestedNomineeName").val(data.suggestedNomineeName);
					$("#suggestedNomineeAge").val(data.suggestedNomineeAge);
					$("#suggestedNomineeRelation").val(data.suggestedNomineeRelation);
					$("#address").val(data.address);
					$("#district").val(data.district);
					$("#branchName").val(data.branchName);
					$("#state").val(data.state);
					$("#pinCode").val(data.pinCode);
					$("#operationType").val(data.operationType);
					$("#jointOperationCode").val(data.jointOperationCode);
					$("#jointSurvivorCode").val(data.jointSurvivorCode);
					$("#familyRelation").val(data.familyRelation);
					$("#selectPlan").val(data.selectPlan);
					$("#openingAmount").val(data.openingAmount);
					$("#financialConsultantCode").val(data.financialConsultantCode);
					$("#financialConsultantName").val(data.financialConsultantName);
					$("#openingFees").val(data.openingFees);
					$("#authenticateWith").val(data.authenticateWith);
					$("#modeOfPayment").val(data.modeOfPayment);
					$("#comment").val(data.comment);
					$("#accountNumber").val(data.accountNumber);

					/*if (data.photo) {
						const photoPath = `Uploads/${data.photo}`;
						$("#photoPreview").attr("src", photoPath);
						$("#photoHidden").val(photoPath);
						const fakePhotoEvent = { target: { result: photoPath } };
						photoSizeEdit(fakePhotoEvent);

					} else {
						$("#photoPreview").attr("src", "Uploads/default-placeholder.jpg");
						$("#photoHidden").val("");
					}

					if (data.signature) {
						const photoPath = `Uploads/${data.signature}`;
						$("#signaturePreview").attr("src", photoPath);
						$("#signatureHidden").val(photoPath);
						const fakePhotoEvent = { target: { result: photoPath } };
						signatureSizeEdit(fakePhotoEvent);

					} else {
						$("#signaturePreview").attr("src", "Uploads/default-placeholder.jpg");
						$("#signatureHidden").val("");
					}

					if (data.jointPhoto) {
						const photoPath = `Uploads/${data.jointPhoto}`;
						$("#JointPhotoPreview").attr("src", photoPath);
						$("#JointPhotoHidden").val(photoPath);
						const fakePhotoEvent = { target: { result: photoPath } };
						jointPhotoSizeEdit(fakePhotoEvent);

					} else {
						$("#JointPhotoPreview").attr("src", "Uploads/default-placeholder.jpg");
						$("#JointPhotoHidden").val("");
					}*/
					// Photo
					if (data.photo) {
						const imagePath = `Uploads/${data.photo}`;
						document.getElementById("photoPreview").src = imagePath; // ✅ Correct: update preview image
						document.getElementById("photoHidden").value = data.photo;
						const fakePhotoEvent = { target: { result: imagePath } };
						photoSizeEdit(fakePhotoEvent);
					} else {
						document.getElementById("photoPreview").src = 'Uploads/upload.jpg';
						document.getElementById("photoHidden").value = '';
					}

					// Signature
					if (data.signature) {
						const imagePath = `Uploads/${data.signature}`;
						document.getElementById("signaturePreview").src = imagePath; // ✅ Correct
						document.getElementById("signatureHidden").value = data.signature;
						const fakePhotoEvent = { target: { result: imagePath } };
						signatureSizeEdit(fakePhotoEvent);
					} else {
						document.getElementById("signaturePreview").src = 'Uploads/upload.jpg';
						document.getElementById("signatureHidden").value = '';
					}

					// Joint Photo
					if (data.jointPhoto) {
						const imagePath = `Uploads/${data.jointPhoto}`;
						document.getElementById("jointPhotoPreview").src = imagePath; // ✅ Correct
						document.getElementById("jointPhotoHidden").value = data.jointPhoto;
						const fakePhotoEvent = { target: { result: imagePath } };
						jointPhotoSizeEdit(fakePhotoEvent);
					} else {
						document.getElementById("jointPhotoPreview").src = 'Uploads/upload.jpg';
						document.getElementById("jointPhotoHidden").value = '';
					}


					if (parseInt(data.accountStatus) === 1) {
						$('#toggle-account-status').prop('checked', true);
					} else {
						$('#toggle-account-status').prop('checked', false);
					}

					if (parseInt(data.messageSend) === 1) {
						$('#toggle-sms-send').prop('checked', true);
					} else {
						$('#toggle-sms-send').prop('checked', false);
					}

					if (parseInt(data.debitCardIssue) === 1) {
						$('#toggle-debit-card').prop('checked', true);
					} else {
						$('#toggle-debit-card').prop('checked', false);
					}

					updateToggleColor(document.getElementById('toggle-account-status'));
					updateToggleColor(document.getElementById('toggle-sms-send'));
					updateToggleColor(document.getElementById('toggle-debit-card'));

				} else {
					alert("Failed");
				}
			},
			error: function(xhr) {
				alert("Error: " + xhr.responseJSON.message);
			}
		});
	});



	$('#updateBtn').click(function(e) {
		e.preventDefault();
		const accountNumber = $('#accountNumber').val();
		if (!accountNumber) {
			alert("First select the data, then proceed to update.");
			return;
		}

		let savingData = new FormData();

		// Append regular text fields
		savingData.append("id", $('#id').val());
		savingData.append("accountNumber", accountNumber);
		savingData.append("openingDate", $('#openingDate').val());
		savingData.append("selectByCustomer", $('#selectByCustomer').val());
		savingData.append("enterCustomerName", $('#enterCustomerName').val());
		savingData.append("dateOfBirth", $('#dateOfBirth').val());
		savingData.append("familyDetails", $('#familyDetails').val());
		savingData.append("contactNumber", $('#contactNumber').val());
		savingData.append("suggestedNomineeName", $('#suggestedNomineeName').val());
		savingData.append("suggestedNomineeAge", $('#suggestedNomineeAge').val());
		savingData.append("suggestedNomineeRelation", $('#suggestedNomineeRelation').val());
		savingData.append("address", $('#address').val());
		savingData.append("district", $('#district').val());
		savingData.append("branchName", $('#branchName').val());
		savingData.append("state", $('#state').val());
		savingData.append("pinCode", $('#pinCode').val());
		savingData.append("operationType", $('#operationType').val());
		savingData.append("jointOperationCode", $('#jointOperationCode').val());
		savingData.append("jointSurvivorCode", $('#jointSurvivorCode').val());
		savingData.append("familyRelation", $('#familyRelation').val());
		savingData.append("selectPlan", $('#selectPlan').val());
		savingData.append("openingAmount", $('#openingAmount').val());
		savingData.append("financialConsultantCode", $('#financialConsultantCode').val());
		savingData.append("financialConsultantName", $('#financialConsultantName').val());
		savingData.append("openingFees", $('#openingFees').val());
		savingData.append("modeOfPayment", $('#modeOfPayment').val());
		savingData.append("comment", $('#comment').val());

		savingData.append("accountStatus", $('#toggle-account-status').is(':checked') ? 1 : 0);
		savingData.append("messageSend", $('#toggle-sms-send').is(':checked') ? 1 : 0);
		savingData.append("debitCardIssue", $('#toggle-debit-card').is(':checked') ? 1 : 0);

		$.ajax({
			url: "api/customersavings/saveandupdatesavingaccount",
			type: "POST",
			data: savingData,
			enctype: 'multipart/form-data',
			contentType: false,
			processData: false,
			cache: false,
			success: function(response) {
				if (response.status === "OK") {
					alert("Saving Account Updated Successfully");
					location.reload();
					// Optionally refresh the table or UI
				} else {
					alert("Something went wrong: " + response.message);
				}
			},
			error: function(xhr) {
				alert("Error while saving data: " + xhr.responseText);
			}
		});
	});


	$('#deleteBtn').click(function(event) {
		var id = $("#id").val();
		let accountNumber = $("#accountNumber").val();
		if (accountNumber !== "") {
			if (confirm("Are you sure you want to delete this Saving Data?")) {
				$.ajax({
					url: "api/customersavings/deleteSavingAccountDataById",
					type: "POST",
					data: { id: id },
					success: function(response) {
						if (response.status == "OK") {
							alert("Customer Savings Data Deleted Successfully");
							location.reload();
						} else {
							alert("Delete failed: " + response.message);
						}
					},
					error: function(xhr, status, error) {
						alert("Failed to delete Saving Data.");
						console.error("Error:", error);
					}
				});
			}
		}
		else {
			alert("First Select Any One Data Then Proceed To Delete!");
		}

	});

	$('#jointOperationCode').blur(function(event) {
		let jointOperationCode = $("#jointOperationCode").val();
		$.ajax({
			type: "GET",
			url: "api/customersavings/getallbyaccountnumber",
			data: { accountNumber: jointOperationCode },
			success: function(response, e) {
				if (response.status == "FOUND") {
					let data = response.data[0];
					$("#id").val(data.id);
				} else {
					alert("Transfer Share Details Not Found For Customer");
				}
			},
			error: function() {
				alert("Shares not found or server error");
			}
		});



	});

	$('#newBtn').click(function(event) {
		event.preventDefault();
		location.reload();
	});


});

document.addEventListener('DOMContentLoaded', function() {
	const toggles = document.querySelectorAll('.toggle__input');

	toggles.forEach((toggle) => {
		updateToggleColor(toggle);

		toggle.addEventListener('change', () => {
			updateToggleColor(toggle);
			console.log(`${toggle.dataset.toggleType} is now ${toggle.checked}`);
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

function fetchByFinancialCode() {
	var financialConsultantCode = $("#financialConsultantCode").val();

	$.ajax({
		type: "POST",
		url: "api/financialconsultant/getfinancialHierarchyByFinancialCode",
		data: { financialCode: financialConsultantCode },
		success: function(response) {
			alert("success");
			if (response.status == "OK") {
				alert("if condition");
				let data = response.data[0];
				$("#financialConsultantName").val(data.customerName);
			} else {
				alert("Transfer Share Details Not Found For Customer");
			}
		},
		error: function() {
			alert("Shares not found or server error");
		}
	});


}
//Ayush
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


//Ayush
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

function JointPhotoUpload() {
	const file = document.getElementById("jointPhoto").files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function(e) {
			jointPhotoSizeEdit(e);
			$("#jointPhotoHidden").val("");
		};
		reader.readAsDataURL(file);
	} else {
		alert("Please upload a valid image file for Joint photo.");
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

function jointPhotoSizeEdit(e) {
	const previewimg = document.getElementById("jointPhotoPreview");
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
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