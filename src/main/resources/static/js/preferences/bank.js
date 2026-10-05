function photoUpload() {
	const file = document.getElementById("cancelledCheque").files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function(e) {
			const previewimg = document.getElementById("photoPreview");
			document.getElementById("photoPreview").src = e.target.result;
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

$(document).ready(function() {
	$("#tableBody").hide();
	$("#updateBtn").hide();
	$("#prevBtn").hide();
	$("#nextBtn").hide();
	$("#pageInfo").hide();

	$("#saveBtn").click(function() {

		convertFormToUpperCase();

		// Clear previous errors
		$('#chkbankname, #chkaccountno, #chkifsccode, #chkmicrcode, #chkcontactno, #chkaddress, #chkopeningdate, #chkopeningbalance, #chkclosingdate').text('');

		// Collect values
		var bankName = $('#bankName').val().trim();
		var accountNo = $('#accountNo').val().trim();
		var ifscCode = $('#ifscCode').val().trim();
		var micrCode = $('#micrCode').val().trim();
		var contactNo = $('#contactNo').val().trim();
		var address = $('#address').val().trim();
		var openingDate = $('#openingDate').val().trim();
		var openingBalance = $('#openingBalance').val().trim();
		var closingDate = $('#closingDate').val().trim();
		var cancelledCheque = $('#cancelledCheque')[0].files[0]; // ✅ File input

		var contactPattern = /^[6-9][0-9]{9}$/;
		var accountNoPattern = /^[0-9]+$/
		let isValid = true;

		function validateImageSize(file, labelId, fieldName) {
			if (file) {
				let fileSizeKB = file.size / 1024; // Convert to KB
				if (fileSizeKB < 10 || fileSizeKB > 900) {
					$('#' + labelId).text(`* ${fieldName} size must be between in KB`);
					isValid = false;
				}
			}
		}

		// Validation
		if (bankName === '') { $('#chkbankname').text('* This field is required'); isValid = false; }
		if (accountNo === '') {
			$('#chkaccountno').text('* This field is required');
			isValid = false;
		} else if (!accountNoPattern.test(accountNo)) {
			$('#chkaccountno').text('* Account number must contain only digits');
			$('#accountNo').focus();
			isValid = false;
		}
		if (address === '') { $('#chkaddress').text('* This field is required'); isValid = false; }
		if (ifscCode === '') { $('#chkifsccode').text('* This field is required'); isValid = false; }
		if (micrCode === '') { $('#chkmicrcode').text('* This field is required'); isValid = false; }
		if (openingDate === '') { $('#chkopeningdate').text('* This field is required'); isValid = false; }
		if (openingBalance === '') { $('#chkopeningbalance').text('* This field is required'); isValid = false; }
		if (closingDate === '') { $('#chkclosingdate').text('* This field is required'); isValid = false; }
		if (contactNo === '') {
			$('#chkcontactno').text('* This field is required'); isValid = false;
		} else if (!contactPattern.test(contactNo)) {
			alert("Please enter a valid 10-digit mobile number starting from 6 to 9.");
			isValid = false;
		}

		// Validate file
		if (!cancelledCheque) {
			$('#chkphoto').text('* Please upload Cancelled Cheque');
			isValid = false;
		} else {
			$('#chkphoto').text('');
		}
		validateImageSize(cancelledCheque, 'chkphoto', 'Cheque');

		if (!isValid) return false; // Stop AJAX call if invalid

		// ✅ Use FormData for file + text
		let formData = new FormData();
		formData.append("bankName", bankName);
		formData.append("accountNo", accountNo);
		formData.append("ifscCode", ifscCode);
		formData.append("micrCode", micrCode);
		formData.append("contactNo", contactNo);
		formData.append("address", address);
		formData.append("openingDate", openingDate);
		formData.append("openingBalance", openingBalance);
		formData.append("closingDate", closingDate);
		formData.append("cancelledCheque", cancelledCheque); // ✅ Image file

		$.ajax({
			url: 'api/preference/saveAndUpdateAllBankModule',
			type: 'POST',
			data: formData,
			contentType: false,       // ✅ Important for FormData
			processData: false,       // ✅ Important for FormData
			success: function(response) {
				if (response.status === 'OK' || response.status === 'CREATED') {
					alert(response.message || "Bank saved successfully!");
					location.reload();
				} else {
					alert("Unexpected response format");
					console.log(response);
				}
			},
			error: function(xhr) {
				console.error('Error:', xhr.responseText);
				alert('Failed to save bank data.');
			}
		});
	});
});




var totalDataMISD = [];
var currentPageMISD = 1;
var pageSizeMISD = 5;

// Load data once
function loadMISData() {
	$.ajax({
		type: "GET",
		url: "api/preference/getAllBankModule",
		contentType: "application/json",
		success: function(response) {
			if (response.status === "FOUND") {
				totalDataMISD = response.data;
				renderTable(currentPageMISD);
				togglePageNavigationMISD();
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

	let startIndex = (page - 1) * pageSizeMISD;
	let endIndex = Math.min(startIndex + pageSizeMISD, totalDataMISD.length);

	for (let i = startIndex; i < endIndex; i++) {
		let person = totalDataMISD[i];
		let chequePath = person.cancelledCheque
			? person.cancelledCheque
			: 'images/upload/no-image.png';
		let row = `<tr>
				<td>${i + 1}</td>
                <td>${(person.bankName || '').toUpperCase()}</td>
                <td>${(person.accountNo || '').toUpperCase()}</td>
				<td>${(person.ifscCode || '').toUpperCase()}</td>
				<td>${(person.micrCode || '').toUpperCase()}</td>
                <td>${(person.contactNo || '').toUpperCase()}</td>
                <td>${(person.address || '').toUpperCase()}</td>
                <td>${(person.openingDate || '').toUpperCase()}</td>
                <td>${(person.openingBalance || '').toUpperCase()}</td>
				<td>${(person.closingDate || '').toUpperCase()}</td>
				<td>
				                <img src="Uploads/${chequePath}" 
				                     alt="Cheque" 
				                     class="cheque-thumb" 
				                     onclick="showChequePreview('Uploads/${chequePath}')">
				            </td>
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
	$("#pageInfo").text(`Page ${currentPageMISD} of ${Math.ceil(totalDataMISD.length / pageSizeMISD)}`);
}

// Button state toggling
function togglePageNavigationMISD() {
	let totalPages = Math.ceil(totalDataMISD.length / pageSizeMISD);
	$("#prevBtn").prop("disabled", currentPageMISD === 1);
	$("#nextBtn").prop("disabled", currentPageMISD === totalPages || totalPages === 0);
}

// Button click handlers
$("#prevBtn").click(function() {
	if (currentPageMISD > 1) {
		currentPageMISD--;
		renderTable(currentPageMISD);
		togglePageNavigationMISD();
	}
});

$("#nextBtn").click(function() {
	let totalPages = Math.ceil(totalDataMISD.length / pageSizeMISD);
	if (currentPageMISD < totalPages) {
		currentPageMISD++;
		renderTable(currentPageMISD);
		togglePageNavigationMISD();
	}
});

// Call on page load
$(document).ready(function() {
	loadMISData();
});


function showTableData() {
	$("#tableBody").show();
	$("#prevBtn").show();
	$("#nextBtn").show();
	$("#pageInfo").show();
}

function hideTableData() {
	$("#tableBody").hide();
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
		url: "api/preference/getBankModuleById",
		type: "GET",
		data: { id: id },
		success: function(response) {
			if (response.status = "FOUND") {
				const bank = response.data;
				$("#id").val(bank.id);
				$("#bankName").val(bank.bankName);
				$("#accountNo").val(bank.accountNo);
				$("#ifscCode").val(bank.ifscCode);
				$("#micrCode").val(bank.micrCode);
				$("#contactNo").val(bank.contactNo);
				$("#address").val(bank.address);
				$("#openingDate").val(bank.openingDate);
				$("#openingBalance").val(bank.openingBalance);
				$("#closingDate").val(bank.closingDate);
				if (bank.cancelledCheque) {
					const photoPath = `Uploads/${bank.cancelledCheque}`;
					$("#photoPreview").attr("src", photoPath);
					$("#photoHidden").val(photoPath);
					const fakePhotoEvent = { target: { result: photoPath } };
					photoSizeEdit(fakePhotoEvent);

				} else {
					$("#photoPreview").attr("src", "Uploads/default-placeholder.jpg");
					$("#photoHidden").val("");
				}
			} else {
				alert("Branch not found: " + response.message);
			}
		},
		error: function(xhr) {
			alert("Request failed: " + xhr.responseText);
		}
	});

}

function deleteData(id) {
	if (confirm("Are you sure you want to delete this bank?")) {
		$.ajax({
			url: "api/preference/deleteBankModuleById",
			type: "POST",
			data: { id: id },
			success: function(response) {
				if (response.status = "OK") {
					alert(response.message);
					location.reload();
				} else {
					alert("Delete failed: " + response.message);
				}
			},
			error: function(xhr, status, error) {
				alert("Failed to delete bank.");
				console.error("Error:", error);
			}
		});
	}
}

function updateBank() {
	convertFormToUpperCase();

	$('#chkbankname, #chkaccountno, #chkifsccode, #chkmicrcode, #chkcontactno, #chkaddress, #chkopeningdate, #chkopeningbalance, #chkclosingdate').text('');

	// Collect values
	var bankName = $('#bankName').val().trim();
	var accountNo = $('#accountNo').val().trim();
	var ifscCode = $('#ifscCode').val().trim();
	var micrCode = $('#micrCode').val().trim();
	var contactNo = $('#contactNo').val().trim();
	var address = $('#address').val().trim();
	var openingDate = $('#openingDate').val().trim();
	var openingBalance = $('#openingBalance').val().trim();
	var closingDate = $('#closingDate').val().trim();
	var cancelledCheque = $('#cancelledCheque')[0].files[0]; // ✅ File input

	var contactPattern = /^[6-9][0-9]{9}$/;
	let isValid = true;

	function validateImageSize(file, labelId, fieldName) {
		if (file) {
			let fileSizeKB = file.size / 1024; // Convert to KB
			if (fileSizeKB < 10 || fileSizeKB > 900) {
				$('#' + labelId).text(`* ${fieldName} size must be between in KB`);
				isValid = false;
			}
		}
	}

	// Validation
	if (bankName === '') { $('#chkbankname').text('* This field is required'); isValid = false; }
	if (accountNo === '') { $('#chkaccountno').text('* This field is required'); isValid = false; }
	if (address === '') { $('#chkaddress').text('* This field is required'); isValid = false; }
	if (ifscCode === '') { $('#chkifsccode').text('* This field is required'); isValid = false; }
	if (micrCode === '') { $('#chkmicrcode').text('* This field is required'); isValid = false; }
	if (openingDate === '') { $('#chkopeningdate').text('* This field is required'); isValid = false; }
	if (openingBalance === '') { $('#chkopeningbalance').text('* This field is required'); isValid = false; }
	if (closingDate === '') { $('#chkclosingdate').text('* This field is required'); isValid = false; }
	if (contactNo === '') {
		$('#chkcontactno').text('* This field is required'); isValid = false;
	} else if (!contactPattern.test(contactNo)) {
		alert("Please enter a valid 10-digit mobile number starting from 6–9.");
		isValid = false;
	}

	// Validate file
	if (!cancelledCheque) {
		$('#chkphoto').text('* Please upload Cancelled Cheque');
		isValid = false;
	} else {
		$('#chkphoto').text('');
	}
	validateImageSize(cancelledCheque, 'chkphoto', 'Cheque');

	if (!isValid) {
		return false; // Stop AJAX call
	}

	let formData = new FormData();

	formData.append("id", $("#id").val());
	formData.append("bankName", $("#bankName").val());
	formData.append("accountNo", $("#accountNo").val());
	formData.append("ifscCode", $("#ifscCode").val());
	formData.append("micrCode", $("#micrCode").val());
	formData.append("contactNo", $("#contactNo").val());
	formData.append("openingDate", $("#openingDate").val());
	formData.append("openingBalance", $("#openingBalance").val());
	formData.append("closingDate", $("#closingDate").val());
	formData.append("address", $("#address").val());
	

	// 👇 add file if selected
	let chequeFile = $("#cancelledCheque")[0].files[0];
	if (chequeFile) {
		formData.append("cancelledCheque", chequeFile);
	}

	$.ajax({
		url: "api/preference/saveAndUpdateAllBankModule",
		type: "POST",
		data: formData,
		processData: false,       // important: prevent automatic processing
		contentType: false,       // important: allow multipart/form-data
		success: function(response) {
			if (response.status === "OK") {
				alert("Bank Updated Successfully");
				location.reload();
			} else {
				alert("Operation failed: " + response.message);
			}
		},
		error: function(xhr) {
			alert("Update failed: " + xhr.responseText);
		}
	});
}



$(document).ready(function() {
	const rowsPerPage = 10;
	let currentPage = 1;

	function showPage(page) {
		let rows = $("#tableBody tr");
		let totalRows = rows.length;
		let totalPages = Math.ceil(totalRows / rowsPerPage);

		// Boundary check
		if (page < 1) page = 1;
		if (page > totalPages) page = totalPages;

		// Hide all rows initially
		rows.hide();

		// Show only the relevant rows
		let start = (page - 1) * rowsPerPage;
		let end = start + rowsPerPage;
		rows.slice(start, end).show();

		// Disable/Enable buttons
		$("#prevBtn").prop("disabled", page === 1);
		$("#nextBtn").prop("disabled", page === totalPages);

		currentPage = page;
	}

	// Button click handlers
	$("#prevBtn").click(function() {
		if (currentPage > 1) {
			showPage(currentPage - 1);
		}
	});

	$("#nextBtn").click(function() {
		let rows = $("#tableBody tr").length;
		if (currentPage * rowsPerPage < rows) {
			showPage(currentPage + 1);
		}
	});

	// Initialize the table on page load
	showPage(currentPage);
});

function showChequePreview(imageSrc) {
	document.getElementById("modalChequeImage").src = imageSrc;
	document.getElementById("imagePreviewModal").style.display = "flex";
}

function closeChequePreview() {
	document.getElementById("imagePreviewModal").style.display = "none";
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

function convertFormToUpperCase() {
	$("#formid").find("input[type=text], input[type=date], textarea").each(function() {
		if ($(this).val()) {
			$(this).val($(this).val().toUpperCase());
		}
	});
}
