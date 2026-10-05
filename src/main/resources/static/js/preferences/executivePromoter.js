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

function aadharUpload() {
	const file = document.getElementById("aadharCard").files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function(e) {
			aadharSizeEdit(e);
			$("#aadharHidden").val("");
		};
		reader.readAsDataURL(file);
	} else {
		alert("Please upload a valid image file for aadhar.");
	}
}

function panUpload() {
	const file = document.getElementById("panCard").files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function(e) {
			panSizeEdit(e);
			$("#panHidden").val("");
		};
		reader.readAsDataURL(file);
	} else {
		alert("Please upload a valid image file for pan.");
	}
}

function chequeUpload() {
	const file = document.getElementById("cheque").files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function(e) {
			chequeSizeEdit(e);
			$("#chequeHidden").val("");
		};
		reader.readAsDataURL(file);
	} else {
		alert("Please upload a valid image file for cheque.");
	}
}

$(document).ready(function() {

	$(".datatable").hide();
	$("#updateBtn").hide();

	$.ajax({
		url: 'api/preference/getAllStates',
		method: "GET",
		success: function(response) {
			if (response && response.data && Array.isArray(response.data)) {
				console.log("Fetched states:", response.data);
				response.data.forEach(function(state) {
					$('#state').append(
						$('<option>', {
							value: state.stateName,  // What will be saved to DB
							text: (state.stateName).toUpperCase(),   // What user sees
							'data-id': state.stateId // Optional: internal use
						})
					);
				});
			} else {
				console.warn("No state data available.");
			}
		},
		error: function(err) {
			console.error("Error fetching states:", err);
		}
	});
	
	$('#state').on('change', function() {
		const selectedStateId = $(this).find(':selected').data('id'); // ✅ Get ID from selected option
		$('#district').empty().append('<option value="">Select District</option>');

		if (selectedStateId) {
			$.ajax({
				url: 'api/preference/getAllDistrictsByStateId',
				method: 'GET',
				data: { stateId: selectedStateId },  // ✅ Now correct ID passed
				success: function(response) {
					console.log("Fetched districts:", response);
					const districts = response.allDistricts;
					districts.forEach(function(district) {
						$('#district').append(
							$('<option>', {
								value: district.districtName,
								text: (district.districtName).toUpperCase()
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

	//Save Code - Ayush
	$('#saveBtn').click(function(event) {
		event.preventDefault();
		convertFormToUpperCase();

		// Clear previous error labels
		$('#chkexetype, #chkbranchname, #chkfullname, #chkdateofbirth, #chkpromoterno, #chkappointmentdate, #chkrelationname, #chkrelationtoapplicant, #chkaddress, #chkdistrict, #chkstate, #chkpincode, #chkaadharno, #chkpanno, #chkcontactno, #chkemailid, #chkphoto, #chksignature, #chkaadhar, #chkpan, #chkcheque, #chkbankname, #chkifsccode, #chkmicrcode, #chkaccountno').text('');

		// Collect form values
		var type = $('#type').val().trim();
		var branchName = $('#branchName').val().trim();
		var fullName = $('#fullName').val().trim();
		var dateOfBirth = $('#dateOfBirth').val().trim();
		var promoterNo = $('#promoterNo').val().trim();
		var appointmentDate = $('#appointmentDate').val().trim();
		var relationName = $('#relationName').val().trim();
		var relationToApplicant = $('#relationToApplicant').val().trim();
		var address = $('#address').val().trim();
		var district = $('#district').val().trim();
		var state = $('#state').val().trim();
		var pinCode = $('#pinCode').val().trim();
		var aadharNo = $('#aadharNo').val().trim();
		var panNo = $('#panNo').val().trim();
		var contactNo = $('#contactNo').val().trim();
		var emailId = $('#emailId').val().trim();
		var bankName = $('#bankName').val().trim();
		var ifscCode = $('#ifscCode').val().trim();
		var micrCode = $('#micrCode').val().trim();
		var accountNo = $('#accountNo').val().trim();

		// File inputs
		const photo = $('#photo')[0].files[0];
		const signature = $('#signature')[0].files[0];
		const aadharCard = $('#aadharCard')[0].files[0];
		const panCard = $('#panCard')[0].files[0];
		const cheque = $('#cheque')[0].files[0];

		// Regex patterns
		var pinPattern = /^[1-9][0-9]{5}$/;
		var panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
		var contactPattern = /^[6-9][0-9]{9}$/;
		var aadharPattern = /^\d{12}$/;
		var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		var accountNoPattern = /^[0-9]+$/;

		let isValid = true;

		// Helper function to check image size (between 10KB and 500KB)
		function validateImageSize(file, labelId, fieldName) {
			if (file) {
				let fileSizeKB = file.size / 1024; // Convert bytes to KB
				if (fileSizeKB < 10 || fileSizeKB > 500) {
					$('#' + labelId).text(`* ${fieldName} size must be in KB`);
					isValid = false;
				}
			}
		}

		// ===== Required field checks =====
		if (type === '') { $('#chkexetype').text('* This field is required'); isValid = false; }
		if (branchName === '') { $('#chkbranchname').text('* This field is required'); isValid = false; }
		if (fullName === '') { $('#chkfullname').text('* This field is required'); isValid = false; }
		if (dateOfBirth === '') { $('#chkdateofbirth').text('* This field is required'); isValid = false; }
		if (promoterNo === '') { $('#chkpromoterno').text('* This field is required'); isValid = false; }
		if (appointmentDate === '') { $('#chkappointmentdate').text('* This field is required'); isValid = false; }
		if (relationName === '') { $('#chkrelationname').text('* This field is required'); isValid = false; }
		if (relationToApplicant === '') { $('#chkrelationtoapplicant').text('* This field is required'); isValid = false; }
		if (address === '') { $('#chkaddress').text('* This field is required'); isValid = false; }
		if (district === '') { $('#chkdistrict').text('* This field is required'); isValid = false; }
		if (state === '') { $('#chkstate').text('* This field is required'); isValid = false; }

		if (pinCode === '') {
			$('#chkpincode').text('* This field is required');
			isValid = false;
		} else if (!pinPattern.test(pinCode)) {
			alert("Please enter a valid 6-digit PIN code (first digit cannot be 0).");
			isValid = false;
		}

		if (aadharNo === '') {
			$('#chkaadharno').text('* This field is required');
			isValid = false;
		} else if (!aadharPattern.test(aadharNo)) {
			alert("Please enter a valid 12-digit Aadhar number.");
			isValid = false;
		}

		if (panNo === '') {
			$('#chkpanno').text('* This field is required');
			isValid = false;
		} else if (!panPattern.test(panNo)) {
			alert("Please enter a valid PAN card number (e.g., ABCDE1234F).");
			isValid = false;
		}

		if (contactNo === '') {
			$('#chkcontactno').text('* This field is required');
			isValid = false;
		} else if (!contactPattern.test(contactNo)) {
			alert("Please enter a valid 10-digit mobile number.");
			isValid = false;
		}

		if (emailId === '') {
			$('#chkemailid').text('* This field is required');
			isValid = false;
		} else if (!emailPattern.test(emailId)) {
			alert('Please enter a valid email address (e.g., example@domain.com)');
			isValid = false;
		}

		// ===== Image required checks =====
		if (!photo) { $('#chkphoto').text('* Photo is required'); isValid = false; }
		if (!signature) { $('#chksignature').text('* Signature is required'); isValid = false; }
		if (!aadharCard) { $('#chkaadhar').text('* Aadhar Card is required'); isValid = false; }
		if (!panCard) { $('#chkpan').text('* PAN Card is required'); isValid = false; }
		if (!cheque) { $('#chkcheque').text('* Cheque is required'); isValid = false; }

		// ===== Image size checks (10KB–500KB) =====
		validateImageSize(photo, 'chkphoto', 'Photo');
		validateImageSize(signature, 'chksignature', 'Signature');
		validateImageSize(aadharCard, 'chkaadhar', 'Aadhar Card');
		validateImageSize(panCard, 'chkpan', 'PAN Card');
		validateImageSize(cheque, 'chkcheque', 'Cheque');

		// ===== Bank details validation =====
		if (bankName === '') { $('#chkbankname').text('* This field is required'); isValid = false; }
		if (ifscCode === '') { $('#chkifsccode').text('* This field is required'); isValid = false; }
		if (micrCode === '') { $('#chkmicrcode').text('* This field is required'); isValid = false; }

		if (accountNo === '') {
			$('#chkaccountno').text('* This field is required');
			isValid = false;
		} else if (!accountNoPattern.test(accountNo)) {
			$('#chkaccountno').text('* Account number must contain only digits');
			isValid = false;
		}

		if (!isValid) return false; // ❌ Stop if any validation fails

		// ===== Prepare FormData =====
		const formData = new FormData();
		formData.append("type", type);
		formData.append("branchName", branchName);
		formData.append("fullName", fullName);
		formData.append("dateOfBirth", dateOfBirth);
		formData.append("promoterNo", promoterNo);
		formData.append("appointmentDate", appointmentDate);
		formData.append("relationName", relationName);
		formData.append("relationToApplicant", relationToApplicant);
		formData.append("address", address);
		formData.append("district", district);
		formData.append("state", state);
		formData.append("pinCode", pinCode);
		formData.append("aadharNo", aadharNo);
		formData.append("panNo", panNo);
		formData.append("contactNo", contactNo);
		formData.append("emailId", emailId);
		formData.append("bankName", bankName);
		formData.append("ifscCode", ifscCode);
		formData.append("micrCode", micrCode);
		formData.append("accountNo", accountNo);

		if (photo) formData.append("photo", photo);
		if (signature) formData.append("signature", signature);
		if (aadharCard) formData.append("aadharCard", aadharCard);
		if (panCard) formData.append("panCard", panCard);
		if (cheque) formData.append("cheque", cheque);

		// Debug log
		for (let pair of formData.entries()) {
			console.log(pair[0] + ':', pair[1]);
		}

		// ===== AJAX Call =====
		$.ajax({
			type: 'POST',
			url: 'api/preference/saveExecutiveFounder',
			data: formData,
			processData: false,
			contentType: false,
			success: function(response) {
				if (response.status === 'OK') {
					alert("Executive Founder Saved Successfully");
					location.reload();
				} else {
					alert("Failed to save executive/founder data.");
				}
			},
			error: function(xhr) {
				console.error("Error: ", xhr.responseText);
				alert('An error occurred while saving the data. Please try again.');
			}
		});
	});



	/*$.ajax({
		url: "api/preference/fetchAllExecutiveFounder", // Updated path
		type: "GET",
		contentType: "application/json",
		success: function(response) {
			if (response.status = "FOUND") {
				var data = response.data;
				var tbody = $(".datatable tbody");
				tbody.empty();

				$.each(data, function(index, item) {
					var row = `<tr style="font-family: 'Poppins', sans-serif;">
							<th scope="row"><a href="#">${index + 1}</a></th>
							<td>${item.fullName || ''}</td>
							<td>${item.branchName || ''}</td>
							<td>${item.appointmentDate || ''}</td>
							<td>${item.address || ''}</td>
							<td>${item.emailId || ''}</td>
							<td>${item.contactNo || ''}</td>
							<td>
								<button class="iconbutton" onclick="viewData(${item.id})" title="View">
									<i class="fa-solid fa-pen-to-square text-primary"></i>
								</button>
							</td>
							<td>
								<button class="iconbutton" onclick="deleteData(${item.id})" title="Delete">
									<i class="fa-solid fa-trash text-danger"></i>
								</button>
							</td>
						</tr>`;
					tbody.append(row);
				});
			} else {
				alert("⚠️ " + response.message);
			}
		},
		error: function(xhr, status, error) {
			console.error("❌ Error fetching data:", error);
			alert("Failed to load executive founder data.");
		}
	});*/


});

function deleteData(id) {

	if (confirm("Are you sure you want to delete this Executive Data?")) {
		$.ajax({
			url: "api/preference/deleteExecutiveFounder",
			type: "POST",
			data: { id: id },
			success: function(response) {
				if (response.status == "OK") {
					alert("Executive Data Deleted Successfully");
					location.reload();
				} else {
					alert("Delete failed: " + response.message);
				}
			},
			error: function(xhr, status, error) {
				alert("Failed to delete Executive.");
				console.error("Error:", error);
			}
		});
	}
}

function showTableData() {
	$(".datatable").show();
	$("#prevBtn").show();
	$("#nextBtn").show();
	$("#pageInfo").show();
}

function hideTableData() {
	$(".datatable").hide();
	$("#prevBtn").hide();
	$("#nextBtn").hide();
	$("#pageInfo").hide();
}

function viewData(id) {
	$("#updateBtn").show();
	$("#saveBtn").hide();
	$("#hideBtn").hide();
	$("#showBtn").hide();

	$.ajax({
		url: "api/preference/fetchExecutiveFounderById",
		type: "GET",
		data: { id: id },
		success: function(response) {
			if (response.status == "FOUND") {
				const branch = response.data;

				$("#id").val(branch.id);
				$("#type").val(branch.type);
				$("#branchName").val(branch.branchName);
				$("#fullName").val(branch.fullName);
				$("#dateOfBirth").val(branch.dateOfBirth);
				$("#promoterNo").val(branch.promoterNo);
				$("#appointmentDate").val(branch.appointmentDate);
				$("#relationName").val(branch.relationName);
				$("#relationToApplicant").val(branch.relationToApplicant);
				$("#address").val(branch.address);
				$("#state").val(branch.state);
				$("#district").val(branch.district);
				$("#pinCode").val(branch.pinCode);
				$("#aadharNo").val(branch.aadharNo);
				$("#panNo").val(branch.panNo);
				$("#contactNo").val(branch.contactNo);
				$("#emailId").val(branch.emailId);
				$("#baseValue").val(branch.baseValue);
				$("#shareCount").val(branch.shareCount);
				$("#shareAmount").val(branch.shareAmount);
				$("#bankName").val(branch.bankName);
				$("#ifscCode").val(branch.ifscCode);
				$("#micrCode").val(branch.micrCode);
				$("#accountNo").val(branch.accountNo);
				if (branch.photo) {
					const photoPath = `Uploads/${branch.photo}`;
					$("#photoPreview").attr("src", photoPath);
					$("#photoHidden").val(photoPath);
					const fakePhotoEvent = { target: { result: photoPath } };
					photoSizeEdit(fakePhotoEvent);

				} else {
					$("#photoPreview").attr("src", "Uploads/default-placeholder.jpg");
					$("#photoHidden").val("");
				}

				// Image: Signature
				if (branch.signature) {
					const signPath = `Uploads/${branch.signature}`;
					$("#signaturePreview").attr("src", signPath);
					$("#signatureHidden").val(signPath);
					const fakeSignEvent = { target: { result: signPath } };
					signatureSizeEdit(fakeSignEvent);

				} else {
					$("#signaturePreview").attr("src", "Uploads/default-placeholder.jpg");
					$("#signatureHidden").val("");
				}

				// Image: aadhar
				if (branch.aadharCard) {
					const aadharPath = `Uploads/${branch.aadharCard}`;
					$("#aadharPreview").attr("src", aadharPath);
					$("#aadharHidden").val(aadharPath);
					const fakeAadharEvent = { target: { result: aadharPath } };
					aadharSizeEdit(fakeAadharEvent);

				} else {
					$("#aadharPreview").attr("src", "Uploads/default-placeholder.jpg");
					$("#aadharHidden").val("");
				}

				// Image: pan
				if (branch.panCard) {
					const panPath = `Uploads/${branch.panCard}`;
					$("#panPreview").attr("src", panPath);
					$("#panHidden").val(panPath);
					const fakePanEvent = { target: { result: panPath } };
					panSizeEdit(fakePanEvent);

				} else {
					$("#panPreview").attr("src", "Uploads/default-placeholder.jpg");
					$("#panHidden").val("");
				}

				// Image: pan
				if (branch.cheque) {
					const chequePath = `Uploads/${branch.cheque}`;
					$("#chequePreview").attr("src", chequePath);
					$("#chequeHidden").val(chequePath);
					const fakeChequeEvent = { target: { result: chequePath } };
					chequeSizeEdit(fakeChequeEvent);

				} else {
					$("#chequePreview").attr("src", "Uploads/default-placeholder.jpg");
					$("#chequeHidden").val("");
				}


			} else {
				alert("Executive founder not found: " + response.message);
			}
		},
		error: function(xhr) {
			alert("Request failed: " + xhr.responseText);
		}
	});
}

$('#updateBtn').click(function(event) {
	convertFormToUpperCase();

	$('#chkexetype').text('');
	$('#chkbranchname').text('');
	$('#chkfullname').text('');
	$('#chkdateofbirth').text('');
	$('#chkpromoterno').text('');
	$('#chkappointmentdate').text('');
	$('#chkrelationname').text('');
	$('#chkrelationtoapplicant').text('');
	$('#chkaddress').text('');
	$('#chkdistrict').text('');
	$('#chkstate').text('');
	$('#chkpincode').text('');
	$('#chkaadharno').text('');
	$('#chkpanno').text('');
	$('#chkcontactno').text('');
	$('#chkemailid').text('');
	$('#chkphoto').text('');
	$('#chksignature').text('');
	$('#chkaadhar').text('');
	$('#chkpan').text('');
	$('#chkcheque').text('');
	$('#chkbankname').text('');
	$('#chkifsccode').text('');
	$('#chkmicrcode').text('');
	$('#chkaccountno').text('');

	var type = $('#type').val().trim();
	var branchName = $('#branchName').val().trim();
	var fullName = $('#fullName').val().trim();
	var dateOfBirth = $('#dateOfBirth').val().trim();
	var promoterNo = $('#promoterNo').val().trim();
	var appointmentDate = $('#appointmentDate').val().trim();
	var relationName = $('#relationName').val().trim();
	var relationToApplicant = $('#relationToApplicant').val().trim();
	var address = $('#address').val().trim();
	var district = $('#district').val().trim();
	var state = $('#state').val().trim();
	var pinCode = $('#pinCode').val().trim();
	var aadharNo = $('#aadharNo').val().trim();
	var panNo = $('#panNo').val().trim();
	var contactNo = $('#contactNo').val().trim();
	var emailId = $('#emailId').val().trim();

	var bankName = $('#bankName').val().trim();
	var ifscCode = $('#ifscCode').val().trim();
	var micrCode = $('#micrCode').val().trim();
	var accountNo = $('#accountNo').val().trim();

	//Validations
	var pinPattern = /^[1-9][0-9]{5}$/;
	var panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
	var contactPattern = /^[6-9][0-9]{9}$/;
	var aadharPattern = /^\d{12}$/;
	var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	var accountNoPattern = /^[0-9]+$/

	let isValid = true;

	function validateImageSize(file, labelId, fieldName) {
		if (file) {
			let fileSizeKB = file.size / 1024; // Convert bytes to KB
			if (fileSizeKB < 10 || fileSizeKB > 500) {
				$('#' + labelId).text(`* ${fieldName} size must be in KB`);
				isValid = false;
			}
		}
	}

	if (type === '') {
		$('#chkexetype').text('* This field is required');
		$('#type').focus();
		isValid = false;
	}

	if (branchName === '') {
		$('#chkbranchname').text('* This field is required');
		$('#branchName').focus();
		isValid = false;
	}

	if (fullName === '') {
		$('#chkfullname').text('* This field is required');
		$('#fullName').focus();
		isValid = false;
	}

	if (fullName === '') {
		$('#chkopeningdate').text('* This field is required');
		$('#fullName').focus();
		isValid = false;
	}

	if (dateOfBirth === '') {
		$('#chkdateofbirth').text('* This field is required');
		$('#dateOfBirth').focus();
		isValid = false;
	}

	if (promoterNo === '') {
		$('#chkpromoterno').text('* This field is required');
		$('#promoterNo').focus();
		isValid = false;
	}

	if (appointmentDate === '') {
		$('#chkappointmentdate').text('* This field is required');
		$('#appointmentDate').focus();
		isValid = false;
	}
	if (relationName === '') {
		$('#chkrelationname').text('* This field is required');
		$('#relationName').focus();
		isValid = false;
	}
	if (relationToApplicant === '') {
		$('#chkrelationtoapplicant').text('* This field is required');
		$('#relationToApplicant').focus();
		isValid = false;
	}
	if (address === '') {
		$('#chkaddress').text('* This field is required');
		$('#address').focus();
		isValid = false;
	}
	if (district === '') {
		$('#chkdistrict').text('* This field is required');
		$('#district').focus();
		isValid = false;
	}
	if (state === '') {
		$('#chkstate').text('* This field is required');
		$('#state').focus();
		isValid = false;
	}
	if (pinCode === '') {
		$('#chkpincode').text('* This field is required');
		$('#pinCode').focus();
		isValid = false;
	}
	else if (!pinPattern.test(pinCode)) {
		alert("Please enter a valid 6-digit PIN code (first digit cannot be 0).");
		pinCode.focus();
		isValid = false;
	}
	if (aadharNo === '') {
		$('#chkaadharno').text('* This field is required');
		$('#aadharNo').focus();
		isValid = false;
	}
	else if (!aadharPattern.test(aadharNo)) {
		alert("Please enter a valid 12-digit Aadhar number.");
		$('#aadharNo').focus();
		isValid = false;
	}
	if (panNo === '') {
		$('#chkpanno').text('* This field is required');
		$('#panNo').focus();
		isValid = false;
	}
	else if (!panPattern.test(panNo)) {
		alert("Please enter a valid PAN card number (e.g., ABCDE1234F).");
		panNo.focus();
		isValid = false;
	}
	if (contactNo === '') {
		$('#chkcontactno').text('* This field is required');
		$('#contactNo').focus();
		isValid = false;
	}
	else if (!contactPattern.test(contactNo)) {
		alert("Please enter a valid 10-digit mobile number.");
		contactNo.focus();
		isValid = false;
	}
	if (emailId === '') {
		$('#chkemailid').text('* This field is required');
		$('#emailId').focus();
		isValid = false;
	}
	else if (!emailPattern.test(emailId)) {
		alert('Please enter a valid email address (e.g., example@domain.com)');
		$('#emailId').focus();
		isValid = false;
	}

	const photo = $('#photo')[0].files[0];
	const signature = $('#signature')[0].files[0];
	const aadharCard = $('#aadharCard')[0].files[0];
	const panCard = $('#panCard')[0].files[0];
	const cheque = $('#cheque')[0].files[0];

	if (bankName === '') {
		$('#chkbankname').text('* This field is required');
		$('#bankName').focus();
		isValid = false;
	}
	if (ifscCode === '') {
		$('#chkifsccode').text('* This field is required');
		$('#ifscCode').focus();
		isValid = false;
	}
	if (micrCode === '') {
		$('#chkmicrcode').text('* This field is required');
		$('#micrCode').focus();
		isValid = false;
	}
	if (accountNo === '') {
		$('#chkaccountno').text('* This field is required');
		isValid = false;
	} else if (!accountNoPattern.test(accountNo)) {
		$('#chkaccountno').text('* Account number must contain only digits');
		$('#accountNo').focus();
		isValid = false;
	}

	const existingPhoto = $('#existingPhoto').val();       // hidden input for already uploaded photo filename
	const existingSignature = $('#existingSignature').val();
	const existingAadhar = $('#existingAadhar').val();
	const existingPan = $('#existingPan').val();
	const existingCheque = $('#existingCheque').val();

	validateImageSize(photo, 'chkphoto', 'Photo');
	validateImageSize(signature, 'chksignature', 'Signature');
	validateImageSize(aadharCard, 'chkaadhar', 'Aadhar Card');
	validateImageSize(panCard, 'chkpan', 'PAN Card');
	validateImageSize(cheque, 'chkcheque', 'Cheque');

	if (!isValid) {
		return false; // Stop AJAX call
	}

	event.preventDefault();

	let formData = new FormData();

	// Append all fields from the form
	formData.append("id", $("#id").val()); // Hidden input for update
	formData.append("type", $("#type").val());
	formData.append("branchName", $("#branchName").val());
	formData.append("fullName", $("#fullName").val());
	formData.append("dateOfBirth", $("#dateOfBirth").val());
	formData.append("promoterNo", $("#promoterNo").val());
	formData.append("appointmentDate", $("#appointmentDate").val());
	formData.append("relationName", $("#relationName").val());
	formData.append("relationToApplicant", $("#relationToApplicant").val());
	formData.append("address", $("#address").val());
	formData.append("district", $("#district").val());
	formData.append("state", $("#state").val());
	formData.append("pinCode", $("#pinCode").val());
	formData.append("aadharNo", $("#aadharNo").val());
	formData.append("panNo", $("#panNo").val());
	formData.append("contactNo", $("#contactNo").val());
	formData.append("emailId", $("#emailId").val());
	formData.append("baseValue", $("#baseValue").val());
	formData.append("shareCount", $("#shareCount").val());
	formData.append("shareAmount", $("#shareAmount").val());
	formData.append("bankName", $('#bankName').val());
	formData.append("ifscCode", $('#ifscCode').val());
	formData.append("micrCode", $('#micrCode').val());
	formData.append("accountNo", $('#accountNo').val());

	if (photo) {
		formData.append("photo", photo);
	}

	if (signature) {
		formData.append("signature", signature);
	}

	if (aadharCard) {
		formData.append("aadharCard", aadharCard);
	}

	if (panCard) {
		formData.append("panCard", panCard);
	}

	if (cheque) {
		formData.append("cheque", cheque);
	}

	// Send the data via AJAX
	$.ajax({
		url: "api/preference/saveExecutiveFounder",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		success: function(response) {
			if (response.status == "OK") {
				alert("Executive Founder Saved Successfully");
				location.reload();
			} else {
				alert(response.message);
			}
		},
		error: function(xhr) {
			alert("Error: " + xhr.responseText);
		}
	});
});

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

function aadharSizeEdit(e) {
	const previewimg = document.getElementById("aadharPreview");
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
}

function panSizeEdit(e) {
	const previewimg = document.getElementById("panPreview");
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
}

function chequeSizeEdit(e) {
	const previewimg = document.getElementById("chequePreview");
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
}

var totalDataExecutive = [];
var currentPageExecutive = 1;
var pageSizeExecutive = 5;

// Load data once
function loadExecutiveData() {
	$.ajax({
		type: "GET",
		url: "api/preference/fetchAllExecutiveFounder",
		contentType: "application/json",
		success: function(response) {
			if (response.status === "FOUND") {
				totalDataExecutive = response.data;
				renderTable(currentPageExecutive);
				togglePageNavigationExecutive();
			} else {
				alert("Failed to fetch data: " + response.message);
			}
		},
		error: function() {
			alert("Error while calling the API.");
		}
	});
}

// Render paginated table
function renderTable(page) {
	let tableBody = $(".datatable tbody");
	tableBody.empty();

	let startIndex = (page - 1) * pageSizeExecutive;
	let endIndex = Math.min(startIndex + pageSizeExecutive, totalDataExecutive.length);

	for (let i = startIndex; i < endIndex; i++) {
		let person = totalDataExecutive[i];
		let row = `<tr>
				<td>${i + 1}</td>
                <td>${(person.fullName || '').toUpperCase()}</td>
                <td>${(person.branchName || '').toUpperCase()}</td>
                <td>${(person.appointmentDate || '').toUpperCase()}</td>
                <td>${(person.address || '').toUpperCase()}</td>
                <td>${(person.emailId || '').toUpperCase()}</td>
                <td>${(person.contactNo || '').toUpperCase()}</td>
                <td>
                  <button class="iconbutton" onclick="viewData(${person.id})" title="View">
                    <i class="fa-solid fa-pen-to-square text-primary"></i>
                  </button>
                </td>
                <td>
                  <button class="iconbutton" onclick="deleteData(${person.id})" title="Delete">
                    <i class="fa-solid fa-trash text-danger"></i>
                  </button>
                </td>
              </tr>`;
		tableBody.append(row);
	}

	// Update page info
	$("#pageInfo").text(`Page ${currentPageExecutive} of ${Math.ceil(totalDataExecutive.length / pageSizeExecutive)}`);
}

// Button state toggling
function togglePageNavigationExecutive() {
	let totalPages = Math.ceil(totalDataExecutive.length / pageSizeExecutive);
	$("#prevBtn").prop("disabled", currentPageExecutive === 1);
	$("#nextBtn").prop("disabled", currentPageExecutive === totalPages || totalPages === 0);
}

// Button click handlers
$("#prevBtn").click(function() {
	if (currentPageExecutive > 1) {
		currentPageExecutive--;
		renderTable(currentPageExecutive);
		togglePageNavigationExecutive();
	}
});

$("#nextBtn").click(function() {
	let totalPages = Math.ceil(totalDataExecutive.length / pageSizeExecutive);
	if (currentPageExecutive < totalPages) {
		currentPageExecutive++;
		renderTable(currentPageExecutive);
		togglePageNavigationExecutive();
	}
});

// Call on page load
$(document).ready(function() {
	$("#prevBtn").hide();
	$("#nextBtn").hide();
	$("#pageInfo").hide();
	loadExecutiveData();
});

// Function to calculate Share Amount
function calculateShareAmount() {
	let baseValue = parseFloat(document.getElementById("baseValue").value) || 0;
	let shareCount = parseFloat(document.getElementById("shareCount").value) || 0;
	let shareAmount = baseValue * shareCount;

	document.getElementById("shareAmount").value = shareAmount.toFixed(2); // 2 decimal places
}

// Event listeners for real-time calculation
document.getElementById("baseValue").addEventListener("input", calculateShareAmount);
document.getElementById("shareCount").addEventListener("input", calculateShareAmount);

function convertFormToUpperCase() {
	$("#formid").find("input[type=text], input[type=date], textarea").each(function() {
		if ($(this).val()) {
			$(this).val($(this).val().toUpperCase());
		}
	});
}