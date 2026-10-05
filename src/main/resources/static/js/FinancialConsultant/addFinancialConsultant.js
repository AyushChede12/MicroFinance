$(document).ready(function() {

	// ✅ Load Customer Codes
	/*$.ajax({
		url: "api/financialconsultant/getAllCustomerCodes",
		type: "POST",
		success: function (response) {
			if (response.status === "FOUND" && response.data) {
				$("#memberCode").empty().append("<option value=''>-- Select Code --</option>");
				response.data.forEach(function (item) {
					$("#memberCode").append(`<option value='${item.memberCode}'>${item.memberCode}</option>`);
				});
			} else {
				alert("No customer codes found.");
			}
		},
		error: function () {
			alert("Failed to load customer codes.");
		}
	});*/

	// ✅ Load Branches
	$.ajax({
		url: "api/financialconsultant/getAllBranch",
		type: "POST",
		success: function(response) {
			if (response.status === "OK" && response.data) {
				$("#branchName").empty().append("<option value=''>-- Select Branch --</option>");
				response.data.forEach(function(item) {
					$("#branchName").append(`<option value='${item.branchName}'>${item.branchName}</option>`);
				});
			} else {
				alert("No branches found.");
			}
		},
		error: function() {
			alert("Failed to load branch names.");
		}
	});

	$.ajax({
		url: "api/teammember/getAllteamMember",
		type: "GET",
		success: function(response) {
			if (response.status === "FOUND") {
				$("#teamMemberCode").empty().append("<option value=''>-- Select Team Member Code --</option>");
				response.data.forEach(function(item) {
					$("#teamMemberCode").append(`<option value='${item.teamMemberCode}'>${item.teamMemberCode}</option>`);
				});
			} else {
				alert("No Team Member found.");
			}
		},
		error: function() {
			alert("Failed to load Team Member names.");
		}
	});

	// ✅ Load Relation to Applicant
	$.ajax({
		url: "api/financialconsultant/getAllRelationToApplicant",
		type: "POST",
		success: function(response) {
			if (response.status === "OK" && response.data) {
				$("#relationToApplicant").empty().append("<option value=''>-- Select Relation --</option>");
				response.data.forEach(function(item) {
					$("#relationToApplicant").append(`<option value='${item.relationToApplicant}'>${item.relationToApplicant}</option>`);
				});
			} else {
				alert("No relations found.");
			}
		},
		error: function() {
			alert("Failed to load relation.");
		}
	});

	// ✅ Set Today's Date
	let today = new Date().toISOString().split('T')[0];
	$("#joiningDate").val(today);

	// ✅ Auto-fill on Member Code Change
	/*$("#memberCode").change(function() {
		let memberCode = $(this).val();
		if (memberCode !== "") {
			$.ajax({
				type: "POST",
				url: "api/financialconsultant/getFinancialConsultantByMemberCode",
				data: { memberCode: memberCode },
				success: function(response) {
					if (response.data && response.data.length > 0) {
						let data = response.data[0];
						$("#customerName").val(data.customerName);
						$("#dob").val(data.dob);
						$("#customerAge").val(data.customerAge);
						$("#guardianName").val(data.guardianName);
						$("#relationToApplicant").val(data.relationToApplicant);
						$("#contactNo").val(data.contactNo);
						$("#nomineeName").val(data.nomineeName);
						$("#branchName").val(data.branchName);
						$("#nomineeAge").val(data.nomineeAge);
						$("#customerAddress").val(data.customerAddress);
						$("#district").val(data.district);
						$("#state").val(data.state);
						$("#pinCode").val(data.pinCode);
						$("#profession").val(data.profession);
						$("#academicBackground").val(data.academicBackground);
						$("#referralCode").val(data.referralCode);
						$("#referralName").val(data.referralName);
						$("#financialPhotoPreview").attr("src", data.customerPhoto ? `Uploads/${data.customerPhoto}` : "Uploads/default-placeholder.jpg");
						$("#financialSignaturePreview").attr("src", data.customerSignature ? `Uploads/${data.customerSignature}` : "Uploads/default-signature.jpg");
					} else {
						alert("No customer found for this member code.");
					}
				},
				error: function() {
					alert("Member not found or server error.");
				}
			});
		}
	});*/

	// ✅ Fetch and Display All Financial Consultant Details
	//$("#updateBtn").hide();
	$.ajax({
		url: "api/financialconsultant/getAllFinancialConsultantDetails",
		type: "POST",
		contentType: "application/json",
		success: function(response) {
			if (response.status === "OK" && response.data.length > 0) {
				var tbody = $(".datatable tbody");
				tbody.empty();
				$.each(response.data, function(index, item) {
					var row = `
						<tr style="font-family: 'Poppins', sans-serif;">
							<td>${index + 1}</td>
							<td>${item.financialCode || ''}</td>
							<td>${item.financialName || ''}</td>
							<td>${item.contactNo || ''}</td>
							<td>${item.branchName || ''}</td>
							<td>${item.address || ''}</td>
							<td>${item.district || ''}</td>
							<td>${item.state || ''}</td>
							<td>${item.pinCode || ''}</td>
							<td>${item.profession || ''}</td>
							<td>${item.financialStatus || ''}</td>
							
							
						</tr>`;
					tbody.append(row);
				});
			} else {
				$(".datatable tbody").html(`<tr><td colspan="11" class="text-center">No data available</td></tr>`);
			}
		},
		error: function(xhr, status, error) {
			console.error("Error fetching financial consultants:", error);
			alert("Failed to load financial consultant data.");
		}
	});

	// ✅ Save Button Logic
	$('#saveBtnFinacial').click(function(event) {
		event.preventDefault();

		let isValid = true;

		// Clear all previous messages
		$('#chkjoiningDate').text('');
		$('#chkfinancialName').text('');
		$('#chkdob').text('');
		$('#chkage').text('');
		$('#chkcontactNo').text('');
		$('#chkbranchName').text('');
		$('#chkaddress').text('');
		$('#chkdistict').text('');
		$('#chkstate').text('');
		$('#chkpinCode').text('');
		$('#chkprofession').text('');
		$('#chkacademicBackground').text('');
		$('#chkphoto').text('');
		$('#chksignature').text('');
		$('#chkposition').text('');
		$('#chkreferralCode').text('');
		$('#chkrefferalName').text('');
		$('#chkmodeofPayment').text('');
		$('#chkteammembercode').text('');



		// Fetch input values
		var joiningDate = $('#joiningDate').val().trim();
		var financialName = $('#financialName').val().trim();
		var dob = $('#dob').val().trim();
		var age = $('#age').val().trim();
		var contactNo = $('#contactNo').val().trim();
		var branchName = $('#branchName').val().trim();
		var address = $('#address').val().trim();
		var district = $('#district').val().trim();
		var state = $('#state').val().trim();
		var pinCode = $('#pinCode').val().trim();
		var profession = $('#profession').val().trim();
		var academicBackground = $('#academicBackground').val().trim();
		var selectPosition = $('#selectPosition').val().trim();
		var referralCode = $('#referralCode').val().trim();
		var referralName = $('#referralName').val().trim();
		var modeofPayment = $('#modeofPayment').val().trim();
		var teamMemberCode = $('#teamMemberCode').val().trim();

		const photo = $('#photo')[0].files[0];
		const signature = $('#signature')[0].files[0];


		if (joiningDate === '') {
			$('#chkjoiningDate').text('* This field is required');
			$('#joiningDate').focus();
			isValid = false;
		}

		if (financialName === '') {
			$('#chkfinancialName').text('* This field is required');
			$('#financialName').focus();
			isValid = false;
		}

		if (dob === '') {
			$('#chkdob').text('* This field is required');
			$('#dob').focus();
			isValid = false;
		}

		if (age === '') {
			$('#chkage').text('* This field is required');
			$('#age').focus();
			isValid = false;
		}

		if (contactNo === '') {
			$('#chkcontactNo').text('* This field is required');
			$('#contactNo').focus();
			isValid = false;
		}

		if (branchName === '') {
			$('#chkbranchName').text('* This field is required');
			$('#branchName').focus();
			isValid = false;
		}

		if (address === '') {
			$('#chkaddress').text('* This field is required');
			$('#address').focus();
			isValid = false;
		}

		if (district === '') {
			$('#chkdistict').text('* This field is required');
			$('#district').focus();
			isValid = false;
		}

		if (state === '') {
			$('#chkstate').text('* This field is required');
			$('#state').focus();
			isValid = false;
		}

		if (pinCode === '') {
			$('#chkpinCode').text('* This field is required');
			$('#pinCode').focus();
			isValid = false;
		}

		if (profession === '') {
			$('#chkprofession').text('* This field is required');
			$('#profession').focus();
			isValid = false;
		}

		if (academicBackground === '') {
			$('#chkacademicBackground').text('* This field is required');
			$('#academicBackground').focus();
			isValid = false;
		}

		if (!photo) {
			$('#chkphoto').text('* Photo is required');
			$('#photo').focus();
			isValid = false;
		}
		if (!signature) {
			$('#chksignature').text('* Signature is required');
			$('#signature').focus();
			isValid = false;
		}

		if (selectPosition === '') {
			$('#chkposition').text('* This field is required');
			$('#selectPosition').focus();
			isValid = false;
		}

		if (referralCode === '') {
			$('#chkreferralCode').text('* This field is required');
			$('#referralCode').focus();
			isValid = false;
		}

		if (referralName === '') {
			$('#chkrefferalName').text('* This field is required');
			$('#referralName').focus();
			isValid = false;
		}

		if (modeofPayment === '') {
			$('#chkmodeofPayment').text('* This field is required');
			$('#modeofPayment').focus();
			isValid = false;
		}

		if (teamMemberCode === '') {
			$('#chkteammembercode').text('* This field is required');
			$('#teamMemberCode').focus();
			isValid = false;
		}



		if (!isValid) {
			return false; // Stop AJAX call
		}


		var financialCode = $('#financialCode').val();

		/*const financialPhotoSrc = $('#photoHidden').attr('src') || '';
		const financialSignatureSrc = $('#signatureHidden').attr('src') || '';
		const photo = financialPhotoSrc.split('/').pop();
		const signature = financialSignatureSrc.split('/').pop();
*/
		const formData = new FormData();
		formData.append("joiningDate", $('#joiningDate').val());
		formData.append("financialCode", financialCode);
		formData.append("financialName", $('#financialName').val());
		formData.append("dob", $('#dob').val());
		formData.append("age", $('#age').val());
		formData.append("contactNo", $('#contactNo').val());
		formData.append("branchName", $('#branchName').val());
		formData.append("address", $('#address').val());
		formData.append("district", $('#district').val());
		formData.append("state", $('#state').val());
		formData.append("pinCode", $('#pinCode').val());
		formData.append("profession", $('#profession').val());
		formData.append("academicBackground", $('#academicBackground').val());
		formData.append("selectPosition", $('#selectPosition').val());
		formData.append("referralCode", $('#referralCode').val());
		formData.append("referralName", $('#referralName').val());
		formData.append("fees", $('#fees').val());
		formData.append("modeofPayment", $('#modeofPayment').val());
		formData.append("teamMemberCode", $('#teamMemberCode').val());
		formData.append("chequeNo", $('#chequeNo').val());
		formData.append("chequeDate", $('#chequeDate').val());
		formData.append("depositAccount", $('#depositAccount').val());
		formData.append("refNo", $('#refNo').val());
		formData.append("comments", $('#comments').val());
		formData.append("financialStatus", $('#financialStatus').is(':checked') ? 1 : 0);
		formData.append("smsSend", $('#smsSend').is(':checked') ? 1 : 0);
		/*formData.append("financialPhoto", photo);
		formData.append("finnacialSignature", signature);*/
		if (photo) {
			formData.append("financialPhoto", photo);
		}

		// File upload: signature
		if (signature) {
			formData.append("finnacialSignature", signature);
		}


		$.ajax({
			type: 'POST',
			url: 'api/financialconsultant/saveOrUpdateFinancialConsultant',
			data: formData,
			processData: false,
			contentType: false,
			success: function(response) {
				if (response.status === "OK" || response.status === "CREATED") {
					alert("Saved Successfully \n Financial Code : " + financialCode);
					location.reload();
				} else {
					alert("Error: " + response.message);
				}
			},
			error: function(xhr) {
				console.error("Error:", xhr.responseText);
				alert("❌ An error occurred while saving the data.");
			}
		});
	});

	// ✅ Payment Mode Display
	$('#displayCheque').hide();
	$('#displaycheqdate').hide();
	$('#displaydeposit').hide();
	$('#displayRef').hide();

	$('#modeofPayment').change(function() {
		const paymentMode = $(this).val();
		if (paymentMode === 'Cash') {
			$('#displayCheque').hide();
			$('#displaycheqdate').hide();
			$('#displaydeposit').hide();
			$('#displayRef').hide();
		} else if (paymentMode === 'Cheque') {
			$('#displayCheque').show();
			$('#displaycheqdate').show();
			$('#displaydeposit').show();
			$('#displayRef').hide();
		} else if (paymentMode === 'Online' || paymentMode === 'NEFT') {
			$('#displayCheque').hide();
			$('#displaycheqdate').hide();
			$('#displaydeposit').show();
			$('#displayRef').show();
		}
	});

	// ✅ UPI ID verification
	$('#verifyUpiBtn').click(function() {
		const upi = $('#refNo').val().trim();
		const upiPattern = /^[\w.\-]{2,256}@[a-zA-Z]{2,64}$/;
		if (upiPattern.test(upi)) {
			$('#refNo').css('border', '2px solid green');
			$('#upiStatus').text('✅ Valid UPI ID').css('color', 'green');
		} else {
			$('#refNo').css('border', '2px solid red');
			$('#upiStatus').text('❌ Invalid UPI ID format').css('color', 'red');
		}
	});

	// ✅ Toggle button color update
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
		label.style.backgroundColor = input.checked ? '#28a745' : '#ccc';
	}

	// ✅ Edit Button Handler
	/*$(document).on("click", ".editBtn", function () {
		const id = $(this).data("id");
		$.ajax({
			url: "api/financialconsultant/getFinancialConsultantById",
			type: "GET",
			data: { id: id },
			success: function (response) {
				if (response.status === "OK" && response.data) {
					const data = response.data;
					$("#id").val(data.id);
					$("#joiningDate").val(data.joiningDate || '');
					$("#memberCode").val(data.memberCode || '');
					$("#customerName").val(data.customerName || '');
					$("#dob").val(data.dob || '');
					$("#customerAge").val(data.customerAge || '');
					$("#guardianName").val(data.guardianName || '');
					$("#relationToApplicant").val(data.relationToApplicant || '');
					$("#contactNo").val(data.contactNo || '');
					$("#nomineeName").val(data.nomineeName || '');
					$("#branchName").val(data.branchName || '');
					$("#nomineeAge").val(data.nomineeAge || '');
					$("#customerAddress").val(data.customerAddress || '');
					$("#district").val(data.district || '');
					$("#state").val(data.state || '');
					$("#pinCode").val(data.pinCode || '');
					$("#profession").val(data.profession || '');
					$("#academicBackground").val(data.academicBackground || '');
					$("#selectPosition").val(data.selectPosition || '');
					$("#referralCode").val(data.referralCode || '');
					$("#referralName").val(data.referralName || '');
					$("#fees").val(data.fees || '');
					$("#modeofPayment").val(data.modeofPayment || '');
					$("#chequeNo").val(data.chequeNo || '');
					$("#chequeDate").val(data.chequeDate || '');
					$("#depositAccount").val(data.depositAccount || '');
					$("#refNo").val(data.refNo || '');
					$("#comments").val(data.comments || '');
					document.getElementById("financialStatus").checked = data.financialStatus === '1';
					document.getElementById("smsSend").checked = data.smsSend === '1';
					if (data.customerPhoto) {
						const img = `Uploads/${data.customerPhoto}`;
						$("#financialPhotoPreview").attr("src", img);
						$("#photoHidden").val(img);
					}
					if (data.customerSignature) {
						const img = `Uploads/${data.customerSignature}`;
						$("#financialSignaturePreview").attr("src", img);
						$("#signatureHidden").val(img);
					}
					$("#updateBtn").show();
					$("#saveBtnFinacial").hide();
					$('html, body').animate({
						scrollTop: $("#yourFormId").offset().top
					}, 500);
				} else {
					alert("No data found for the selected financial consultant.");
				}
			},
			error: function () {
				alert("Failed to fetch data for editing.");
			}
		});
	});



	$('#updateBtn').click(function (e) {
		e.preventDefault();

		let formData = new FormData();

		// Append regular text fields
		formData.append("id", $('#id').val());
		formData.append("financialCode", $('#financialCode').val());
		formData.append("joiningDate", $('#joiningDate').val());
		formData.append("memberCode", $('#memberCode').val());
		formData.append("customerName", $('#customerName').val());
		formData.append("dob", $('#dob').val());
		formData.append("customerAge", $('#customerAge').val());
		formData.append("guardianName", $('#guardianName').val());
		formData.append("relationToApplicant", $('#relationToApplicant').val());
		formData.append("contactNo", $('#contactNo').val());
		formData.append("nomineeName", $('#nomineeName').val());
		formData.append("branchName", $('#branchName').val());
		formData.append("nomineeAge", $('#nomineeAge').val());
		formData.append("customerAddress", $('#customerAddress').val());
		formData.append("district", $('#district').val());
		formData.append("state", $('#state').val());
		formData.append("pinCode", $('#pinCode').val());
		formData.append("profession", $('#profession').val());
		formData.append("academicBackground", $('#academicBackground').val());
		formData.append("selectPosition", $('#selectPosition').val());
		formData.append("referralCode", $('#referralCode').val());
		formData.append("referralName", $('#referralName').val());
		formData.append("fees", $('#fees').val());
		formData.append("modeofPayment", $('#modeofPayment').val());
		formData.append("chequeNo", $('#chequeNo').val());
		formData.append("chequeDate", $('#chequeDate').val());
		formData.append("depositAccount", $('#depositAccount').val());
		formData.append("refNo", $('#refNo').val());
		formData.append("comments", $('#comments').val());
		formData.append("financialStatus", $('#financialStatus').is(':checked')? 1 : 0);
		formData.append("smsSend", $('#smsSend').is(':checked')? 1 : 0);

		// Append image paths or Base64 values
		formData.append("customerPhoto", $('#customerPhotoHidden').val());
		formData.append("customerSignature", $('#customerSignatureHidden').val());

		$.ajax({
			url: "api/financialconsultant/saveOrUpdateFinancialConsultant",
			type: "POST",
			data: formData,
			enctype: 'multipart/form-data',
			contentType: false,
			processData: false,
			cache: false,
			success: function (response) {
				if (response.status === "OK") {
					alert("Updated Successfully");
					location.reload();
					// Optionally refresh the table or UI
				} else {
					alert("Something went wrong: " + response.message);
				}
			},
			error: function (xhr) {
				alert("Error while saving data: " + xhr.responseText);
			}
		});
	});
	
	$(document).on('click', '.deleteBtn', function () {
			var id = $(this).data('id');

			// Optional: Confirmation prompt
			if (confirm("Are you sure you want to delete this Financial Consultant?")) {
				$.ajax({
					url: 'api/financialconsultant/deleteFinancialConsultantById',
					type: 'POST',
					data: { id: id },
					success: function (response) {
						if (response.status === 'OK') {
							alert(response.message);
							// Reload or update the table after deletion
							location.reload(); // or call a function to refresh table via AJAX
						} else {
							alert("Error: " + response.message);
						}
					},
					error: function (xhr) {
						alert("Deletion failed. Please try again.");
					}
				});
			}
		});*/

});

function printTable() {
	const printContent = document.getElementById('tabl').outerHTML;
	const printWindow = window.open('', '', 'height=500,width=800');

	printWindow.document
		.write('<html><head><title>Print Details</title></head><body>');
	printWindow.document.write(printContent);
	printWindow.document.write('</body></html>');

	printWindow.document.close();
	printWindow.focus();
	printWindow.print();
}




/*function photoUpload() {
	alert("function called");
	const file = document.getElementById("financialPhoto").files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function(e) {
			const previewimg = document.getElementById("financialPhotoPreview");
			document.getElementById("financialPhotoPreview").src = e.target.result;
			previewimg.style.width = "100%";
			previewimg.style.height = "100%";
			previewimg.style.objectFit = "cover"
			previewimg.style.overflow = "hidden"
			previewimg.style.borderRadius = "20px"
		};
		reader.readAsDataURL(file);
	} else {
		alert("Please upload a valid image file for photo.");
	}
}


function signatureUpload() {
	alert("function called");
	const file = document.getElementById("finnacialSignature").files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function(e) {
			const previewimg = document.getElementById("financialSignaturePreview");
			document.getElementById("financialSignaturePreview").src = e.target.result;
			previewimg.style.width = "100%";
			previewimg.style.height = "100%";
			previewimg.style.objectFit = "cover"
			previewimg.style.overflow = "hidden"
			previewimg.style.borderRadius = "20px"
		};
		reader.readAsDataURL(file);
	} else {
		alert("Please upload a valid image file for photo.");
	}
}
*/

// End of document.ready
