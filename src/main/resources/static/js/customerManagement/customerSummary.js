$(document).ready(function() {
	let currentCustomerId = null;
	/*$.ajax({
		url: 'api/customermanagement/approved',
		type: 'GET',
		success: function(response) {
			alert("SUCCESS");
			// RESPONSE IS A LIST OF ADDCUSTOMER OBJECTS
			let customerOptions = response.data.map(function(item) {
				let fullName = [
					item.firstName,
					item.middleName,
					item.lastName
				].filter(Boolean).join(" ");

				return {
					id: item.memberCode,
					text: item.memberCode + " - " + fullName.toUpperCase()
				};
			});

			$('#selectMember').select2({
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
		},
		error: function(xhr, status, error) {
			console.error("ERROR FETCHING CUSTOMERS:", error);
			alert("FAILED TO LOAD CUSTOMER CODES.");
		}
	});*/

	$.ajax({
		url: "api/customermanagement/approved",
		type: "GET",
		success: function(response) {
			if (response.status === "OK") {
				const customerList = response.data;
				$("#selectMember").empty(); // CLEAR EXISTING OPTIONS
				$("#selectMember").append("<option value=''>-- SELECT CODE --</option>");

				// BIND APPROVED CUSTOMERS TO DROPDOWN
				customerList.forEach(function(customer) {
					let fullName = [
						customer.firstName || '',
						customer.middleName || '',
						customer.lastName || ''
					].filter(Boolean).join(" ");

					let displayText = customer.memberCode + " - " + fullName.toUpperCase();
					let option = `<option value="${customer.memberCode}">${displayText}</option>`;
					$("#selectMember").append(option);
				});
			} else {
				alert(("ERROR: " + (response.message || "NO CUSTOMERS FOUND")).toUpperCase());
			}
		},
		error: function(xhr) {
			console.error("ERROR LOADING APPROVED CUSTOMERS:", xhr.responseText);
			alert("FAILED TO LOAD APPROVED CUSTOMERS.");
		}
	});

	$("#selectMember").change(function() {
		let customerCode = $("#selectMember").val();
		if (customerCode !== "") {
			$.ajax({
				type: "POST",
				url: "api/customershareholdingcontroller/fetchByCustomerCode",
				data: { memberCode: customerCode },
				success: function(response) {
					if (response.status == "FOUND") {
						let data = response.data[0];
						let fullName = [
							data.firstName || '',
							data.middleName || '',
							data.lastName || ''
						].filter(Boolean).join(" ");

						$("#id").val(data.id);
						$("#customerCode").val(data.memberCode);
						$("#customerName").val(fullName.toUpperCase());
						$("#singupDate").val(data.signupDate.toUpperCase());
						$("#guardianName").val(data.relationToApplicant.toUpperCase());
						$("#customerAddress").val(data.customerAddress.toUpperCase());
						$("#pinCode").val(data.pinCode.toUpperCase());
						$("#state").val(data.state.toUpperCase());
						$("#contactNo").val(data.contactNo.toUpperCase());
						$("#aadharNo").val(data.aadharNo.toUpperCase());
						$("#pan").val(data.panNo.toUpperCase());
						$("#nomineeName").val(data.nomineeName.toUpperCase());
						$("#emailId").val(data.emailId.toUpperCase());
						$("#dob").val(data.dob.toUpperCase());
						$("#customerAge").val(data.customerAge.toUpperCase());
						$("#branchName").val(data.branchName.toUpperCase());
						$("#customerGender").val(data.customerGender.toUpperCase());

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

						if (data.newlyAddedImage) {
							const newImgPath = `Uploads/${data.newlyAddedImage}`;
							$("#newlyAddedImagePreview").attr("src", newImgPath);
							$("#newlyAddedImageHidden").val(newImgPath);
							const fakeNewImgEvent = { target: { result: newImgPath } };
							newlyAddedImageSizeEdit(fakeNewImgEvent);
						} else {
							$("#newlyAddedImagePreview").attr("src", "Uploads/default-placeholder.jpg");
							$("#newlyAddedImageHidden").val("");
						}

						currentCustomerId = data.id;
						$("#customerImageUploadSection").show();
						loadCustomerImages(currentCustomerId);

					} else {
						alert("NO CUSTOMER FOUND FOR THIS MEMBER CODE.");
					}
				},
				error: function() {
					alert("MEMBER NOT FOUND OR SERVER ERROR.");
				}
			});
		} else {
			currentCustomerId = null;
			$("#customerImageUploadSection").hide();
		}
	});

	// =================================================
	// CUSTOMER IMAGE UPLOAD EVENT LISTENERS
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

	$("#uploadAllBtn").click(function() {
		if (!currentCustomerId) {
			alert("PLEASE SELECT A CUSTOMER FIRST.");
			return;
		}

		let uploadFields = $(".uploadField");
		let uploadCount = uploadFields.length;
		if (uploadCount === 0) {
			alert("NO FIELDS ADDED TO UPLOAD.");
			return;
		}

		let completed = 0;
		uploadFields.each(function() {
			const fieldName = $(this).find("label:first").text().replace("*", "").trim();
			const input = $(this).find("input[type=file]")[0];
			const file = input.files[0];

			if (!file) {
				alert(("SELECT FILE FOR " + fieldName).toUpperCase());
				return;
			}

			let fd = new FormData();
			fd.append("fieldName", fieldName);
			fd.append("file", file);

			$.ajax({
				url: "api/customermanagement/upload/" + currentCustomerId,
				type: "POST",
				data: fd,
				processData: false,
				contentType: false,
				success: function() {
					$(input).closest(".uploadField").css("border", "2px solid green");
					completed++;
					if (completed === uploadCount) {
						alert("ALL IMAGES UPLOADED SUCCESSFULLY!");
						loadCustomerImages(currentCustomerId);
					}
				},
				error: function() {
					$(input).closest(".uploadField").css("border", "2px solid red");
					alert(("FAILED TO UPLOAD " + fieldName).toUpperCase());
				}
			});
		});
	});

	$("#reloadDataBtn").click(function() {
		if (currentCustomerId) {
			loadCustomerImages(currentCustomerId);
		}
	});

	function loadCustomerImages(customerId) {
		$("#storedImages").html(`<h5>LOADING...</h5>`);

		$.ajax({
			url: "api/customermanagement/images/" + customerId,
			type: "GET",
			success: function(data) {
				let html = "<h4>STORED IMAGES</h4><div class='row'>";
				if (data.length === 0) {
					html += "<p class='col-12 text-muted'>NO STORED IMAGES FOR THIS CUSTOMER.</p>";
				} else {
					data.forEach(img => {
						html += `
							<div class="col-lg-3 text-center mb-4">
								<div class="img-box" style="position:relative; display:inline-block;">
									<img src="Uploads/customer/${customerId}/${img.fileName}" 
										 width="150" height="150" 
										 style="object-fit:contain;border:1px solid #ccc;border-radius:8px;padding:4px;">
									<button type="button" class="deleteImg btn btn-danger btn-sm" data-id="${customerId}-${img.id}" 
										style="position:absolute; top:5px; right:5px; border-radius:50%; width:24px; height:24px; padding:0; line-height:20px;">&times;</button>
								</div>
								<p class="mt-1 font-weight-bold">${(img.name || "").toUpperCase()}</p>
								<p class="text-muted small" style="font-size: 11px;">UPLOADED: ${img.uploadDate || 'N/A'}</p>
							</div>
						`;
					});
				}
				html += "</div>";
				$("#storedImages").html(html);
			},
			error: function() {
				$("#storedImages").html("<p class='text-danger'>FAILED TO LOAD STORED IMAGES.</p>");
			}
		});
	}

	$(document).on("click", ".deleteImg", function() {
		const id = $(this).data("id");
		if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS IMAGE?")) {
			$.ajax({
				url: "api/customermanagement/delete/" + id,
				type: "POST",
				success: function() {
					alert("IMAGE DELETED!");
					if (currentCustomerId) {
						loadCustomerImages(currentCustomerId);
					}
				},
				error: function() {
					alert("ERROR DELETING IMAGE.");
				}
			});
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

function newlyAddedImageSizeEdit(e) {
	const previewimg = document.getElementById("newlyAddedImagePreview");
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
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