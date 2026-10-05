$(document).ready(function() {

	$(document).on("click", "#editBtn", function() {
		$("#updateBtn").prop("disabled", false);
		$("#formid").find("input, textarea").prop("readonly", false);
		$("#declaredValue").prop("readonly", true);
		$("#nof").prop("readonly", true);
	});

	const companyId = 1;  // Change if company ID is dynamic
	loadCompanyDetails();
	loadCompanyImages();

	// ================================
	// 1️⃣ LOAD COMPANY DETAILS
	// ================================
	function loadCompanyDetails() {
		$.ajax({
			url: "api/preference/" + companyId,
			type: "GET",
			success: function(data) {
				$("#id").val(data.id);
				$("#companyName").val(data.companyName);
				$("#shortName").val(data.shortName);
				$("#signUpDate").val(data.signUpDate);
				$("#cinNo").val(data.cinNo);
				$("#pan").val(data.pan);
				$("#tan").val(data.tan);
				$("#gstin").val(data.gstin);
				$("#declaredValue").val(100);
				$("#address").val(data.address);
				$("#state").val(data.state);
				$("#city").val(data.city);
				$("#pinCode").val(data.pinCode);
				$("#emailId").val(data.emailId);
				$("#authorizedShareCapital").val(data.authorizedShareCapital);
				$("#paidUpCapital").val(data.paidUpCapital);
				$("#nof").val(data.nof);
				$("#helplineNo").val(data.helplineNo);
				$("#tdsWithPan").val(data.tdsWithPan);
				$("#tdsWithoutPan").val(data.tdsWithoutPan);
				$("#taxDeduction").val(data.taxDeduction);
				$("#branchManagerContactNo").val(data.branchManagerContactNo);
				calculateNoOfShares();
			}
		});
	}

	// ================================
	// 2️⃣ UPDATE COMPANY DETAILS (TEXT)
	// ================================
	$("#updateBtn").click(function(event) {

		event.preventDefault();

		// Convert text to uppercase
		$("#formid").find("input[type=text], textarea").each(function() {
			if ($(this).val()) {
				$(this).val($(this).val().toUpperCase());
			}
		});

		// Clear all error messages
		$('#chkcompanyname, #chkshortname, #chksignupdate, #chkcinno, #chkpan, #chktan, #chkgstin, #chkdeclaredvalue, #chkaddress, #chkstate, #chkcity, #chkpincode, #chkemailid, #chkauthorizedsharecapital, #chkpaidupcapital, #chknof, #chkhelplineNo, #chktdswithpan, #chktdswithoutpan, #chktaxdeduction, #chkbranchManagerContactNo').text('');

		// Get field values
		var companyName = $('#companyName').val().trim();
		var shortName = $('#shortName').val().trim();
		var signUpDate = $('#signUpDate').val().trim();
		var cinNo = $('#cinNo').val().trim();
		var pan = $('#pan').val().trim();
		var tan = $('#tan').val().trim();
		var gstin = $('#gstin').val().trim();
		var declaredValue = $('#declaredValue').val().trim();
		var address = $('#address').val().trim();
		var state = $('#state').val().trim();
		var city = $('#city').val().trim();
		var pinCode = $('#pinCode').val().trim();
		var emailId = $('#emailId').val().trim();
		var authorizedShareCapital = $('#authorizedShareCapital').val().trim();
		var paidUpCapital = $('#paidUpCapital').val().trim();
		var nof = $('#nof').val().trim();
		var helplineNo = $('#helplineNo').val().trim();
		var tdsWithPan = $('#tdsWithPan').val().trim();
		var tdsWithoutPan = $('#tdsWithoutPan').val().trim();
		var taxDeduction = $('#taxDeduction').val().trim();
		var branchManagerContactNo = $('#branchManagerContactNo').val().trim();

		// Regex patterns
		var contactPattern = /^[6-9][0-9]{9}$/;
		var panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
		var pinPattern = /^[1-9][0-9]{5}$/;
		var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const cinPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/; // Alpha + numeric + special char
		const tanPattern = /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/;

		let isValid = true;

		if (companyName === '') {
			$('#chkcompanyname').text('* This field is required');
			$('#companyName').focus();
			isValid = false;
		}
		if (shortName === '') {
			$('#chkshortname').text('* This field is required');
			$('#shortName').focus();
			isValid = false;
		}
		if (signUpDate === '') {
			$('#chksignupdate').text('* This field is required');
			$('#signUpDate').focus();
			isValid = false;
		}
		if (cinNo === '') {
			$('#chkcinno').text('* This field is required');
			$('#cinNo').focus();
			isValid = false;
		} else if (!cinPattern.test(cinNo)) {
			$('#chkcinno').text('CIN No must contain alphabets, numbers, and at least one special character.');
			$('#cinNo').focus();
			isValid = false;
		}
		if (pan === '') {
			$('#chkpan').text('* This field is required');
			$('#pan').focus();
			isValid = false;
		} else if (!panPattern.test(pan)) {
			alert("Please enter a valid PAN card number (e.g., ABCDE1234F).");
			$('#pan').focus();
			return false;
		}
		if (tan === '') {
			$('#chktan').text('* This field is required');
			if (isValid) $('#tan').focus();
			isValid = false;
		} else if (!tanPattern.test(tan)) {
			$('#chktan').text('TAN No must contain only alphabets and numbers (no special characters).');
			$('#tan').focus();
			isValid = false;
		}
		if (gstin === '') {
			$('#chkgstin').text('* This field is required');
			$('#gstin').focus();
			isValid = false;
		}
		if (declaredValue === '') {
			$('#chkdeclaredvalue').text('* This field is required');
			$('#declaredValue').focus();
			isValid = false;
		}
		if (address === '') {
			$('#chkaddress').text('* This field is required');
			$('#address').focus();
			isValid = false;
		}
		if (state === '') {
			$('#chkstate').text('* This field is required');
			$('#state').focus();
			isValid = false;
		}
		if (city === '') {
			$('#chkcity').text('* This field is required');
			$('#city').focus();
			isValid = false;
		}
		if (pinCode === '') {
			$('#chkpincode').text('* This field is required');
			$('#pinCode').focus();
			isValid = false;
		} else if (!pinPattern.test(pinCode)) {
			alert("Please enter a valid 6-digit PIN code (first digit cannot be 0).");
			$('#pinCode').focus();
			return false;
		}
		if (emailId === '') {
			$('#chkemailid').text('* This field is required');
			$('#emailId').focus();
			isValid = false;
		} else if (!emailPattern.test(emailId)) {
			alert('Please enter a valid email address (e.g., example@domain.com)');
			$('#emailId').focus();
			isValid = false;
		}
		if (authorizedShareCapital === '') {
			$('#chkauthorizedsharecapital').text('* This field is required');
			$('#authorizedShareCapital').focus();
			isValid = false;
		}
		if (paidUpCapital === '') {
			$('#chkpaidupcapital').text('* This field is required');
			$('#paidUpCapital').focus();
			isValid = false;
		}
		if (nof === '') {
			$('#chknof').text('* This field is required');
			$('#nof').focus();
			isValid = false;
		}
		if (helplineNo === '') {
			$('#chkhelplineno').text('* This field is required');
			$('#helplineNo').focus();
			isValid = false;
		} else if (!contactPattern.test(helplineNo)) {
			alert("Please enter a valid 10-digit HelpLine number.");
			$('#helplineNo').focus();
			return false;
		}
		if (tdsWithPan === '') {
			$('#chktdswithpan').text('* This field is required');
			$('#tdsWithPan').focus();
			isValid = false;
		}
		if (tdsWithoutPan === '') {
			$('#chktdswithoutpan').text('* This field is required');
			$('#tdsWithoutPan').focus();
			isValid = false;
		}
		if (taxDeduction === '') {
			$('#chktaxdeduction').text('* This field is required');
			$('#taxDeduction').focus();
			isValid = false;
		}
		if (branchManagerContactNo === '') {
			$('#chkbranchManagerContactNo').text('* This field is required');
			$('#branchManagerContactNo').focus();
			isValid = false;
		} else if (!contactPattern.test(branchManagerContactNo)) {
			alert("Please enter a valid 10-digit Branch Manager Contact Number.");
			$('#branchManagerContactNo').focus();
			return false;
		}

		if (!isValid) {
			return false;
		}

		var declaredValue = parseFloat($("#declaredValue").val()) || 100;
		var paidUpCapital = parseFloat($("#paidUpCapital").val()) || 0;
		var noOfShares = 0;
		if (declaredValue > 0) {
			noOfShares = paidUpCapital / declaredValue;
			if (noOfShares % 1 !== 0) {
				noOfShares = parseFloat(noOfShares.toFixed(2));
			}
		}
		$("#nof").val(noOfShares);

		let formData = {
			id: $("#id").val(),
			companyName: $("#companyName").val(),
			shortName: $("#shortName").val(),
			signUpDate: $("#signUpDate").val(),
			cinNo: $("#cinNo").val(),
			pan: $("#pan").val(),
			tan: $("#tan").val(),
			gstin: $("#gstin").val(),
			declaredValue: $("#declaredValue").val(),
			address: $("#address").val(),
			state: $("#state").val(),
			city: $("#city").val(),
			pinCode: $("#pinCode").val(),
			emailId: $("#emailId").val(),
			authorizedShareCapital: $("#authorizedShareCapital").val(),
			paidUpCapital: $("#paidUpCapital").val(),
			nof: $("#nof").val(),
			helplineNo: $("#helplineNo").val(),
			tdsWithPan: $("#tdsWithPan").val(),
			tdsWithoutPan: $("#tdsWithoutPan").val(),
			taxDeduction: $("#taxDeduction").val(),
			branchManagerContactNo: $("#branchManagerContactNo").val()
		};

		$.ajax({
			url: "api/preference/update",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(formData),
			success: function() {
				alert("Company details updated successfully!");
				location.reload();
			},
			error: function() {
				alert("Error updating company details");
			}
		});

	});

	// =================================================
	// 3️⃣ ADD TEXT FIELD + AUTO IMAGE PREVIEW FIELD
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

	// =================================================
	// 4️⃣ WHEN NAME TYPED → SHOW IMAGE UPLOAD
	// =================================================
	$(document).on("input", ".nameField", function() {
		const val = $(this).val().trim();
		const box = $(this).closest(".textUploadSet").find(".uploadContainer");

		if (val.length === 0) { box.html(""); return; }

		const uniqueId = "file-" + Date.now();

		const html = `
            <div class="uploadField mt-2">
                <label>${val.toUpperCase()} *</label>
                <label for="${uniqueId}">
                    <input type="file" id="${uniqueId}" hidden accept="image/*" onchange="previewImage('${uniqueId}')">
                    <div>
                        <img src="Uploads/upload.png" id="preview-${uniqueId}" style="width:120px;">
                    </div>
                </label>
            </div>
        `;

		box.html(html);
	});

	// =================================================
	// 5️⃣ UPLOAD ALL NEW IMAGES
	// =================================================
	$("#uploadAllBtn").click(function() {

		$(".uploadField").each(function() {

			const fieldName = $(this).find("label:first").text().replace("*", "").trim();
			const input = $(this).find("input[type=file]")[0];
			const file = input.files[0];

			if (!file) {
				alert("Select file for " + fieldName);
				return;
			}

			let fd = new FormData();
			fd.append("fieldName", fieldName);
			fd.append("file", file);

			$.ajax({
				url: "api/preference/upload/" + companyId,
				type: "POST",
				data: fd,
				processData: false,
				contentType: false,
				success: function() {
					$(input).closest(".uploadField").css("border", "2px solid green");
				},
				error: function() {
					$(input).closest(".uploadField").css("border", "2px solid red");
				}
			});
		});

		alert("Uploading Images...");
	});

	// =================================================
	// 6️⃣ RELOAD IMAGES FROM DATABASE
	// =================================================
	$("#reloadDataBtn").click(loadCompanyImages);

	function loadCompanyImages() {

		$("#storedImages").html(`<h5>Loading...</h5>`);

		$.ajax({
			url: "api/preference/images/" + companyId,
			type: "GET",

			success: function(data) {

				let html = "<h4>STORED IMAGES</h4><div class='row'>";

				data.forEach(img => {

					let imageUrl = "Uploads/company/" + companyId + "/" + img.fileName;

					html += `
	                    <div class="col-lg-3 text-center mb-4">
	                        <div class="img-box">
	                            <img src="${imageUrl}"
	                                 width="150"
	                                 height="150"
	                                 style="object-fit:contain;border:1px solid #ccc"
	                                 onerror="console.log('Image not found:', this.src)">
	                            <button class="deleteImg" data-id="${img.id}">&times;</button>
	                        </div>
	                        <p>${img.name.toUpperCase()}</p>
	                    </div>
	                `;
				});

				html += "</div>";

				$("#storedImages").html(html);
			},

			error: function(xhr) {
				console.log("Error:", xhr.status);
				console.log(xhr.responseText);
			}
		});
	}

	// =================================================
	// 7️⃣ DELETE IMAGE
	// =================================================
	$(document).on("click", ".deleteImg", function() {
		alert("hh");
		const id = $(this).data("id");
		alert(id);

		$.ajax({
			url: "api/preference/delete/" + id,
			type: "POST",
			success: function() {
				alert("Image Deleted Successfully!");
				loadCompanyImages();
			},
			error: function() {
				alert("error...");
			}
		});
	});

	function calculateNoOfShares() {
		var paidUpCapital = parseFloat($("#paidUpCapital").val()) || 0;
		var declaredValue = parseFloat($("#declaredValue").val()) || 0;
		if (declaredValue > 0) {
			var noOfShares = paidUpCapital / declaredValue;
			if (noOfShares % 1 === 0) {
				$("#nof").val(noOfShares);
			} else {
				$("#nof").val(noOfShares.toFixed(2));
			}
		} else {
			$("#nof").val(0);
		}
	}

	$(document).on("input", "#paidUpCapital, #declaredValue", function() {
		calculateNoOfShares();
	});

});

// =============================
// 8️⃣ IMAGE PREVIEW FUNCTION
// =============================
function previewImage(id) {
	const file = document.getElementById(id).files[0];
	const preview = document.getElementById("preview-" + id);

	if (file) {
		const reader = new FileReader();
		reader.onload = e => preview.src = e.target.result;
		reader.readAsDataURL(file);
	}
}

// Tooltip initialization
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function(tooltipTriggerEl) {
	return new bootstrap.Tooltip(tooltipTriggerEl);
});

