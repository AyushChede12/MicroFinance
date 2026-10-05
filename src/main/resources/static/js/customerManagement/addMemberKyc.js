
function fetchBySelectedCustomer() {
	const memberCode = $("#selectByCode").val();

	if (!memberCode) return;

	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({ memberCode }),
		url: "api/customermanagement/fetchBySelectedCustomer",
		async: false,
		success: function(data) {

			if (data && data.length > 0) {
				const c = data[0];

				// Fill fields
				const fullName = [
					c.firstName || "",
					c.middleName || "",
					c.lastName || ""
				].filter(Boolean).join(" ");

				$("#customerName").val(fullName.toUpperCase());

				$("#memberCode").val((c.memberCode).toUpperCase() || "");
				$("#contactNo").val((c.contactNo).toUpperCase() || "");
				$("#singupDate").val(c.signupDate || "");
				$("#aadharNo").val(c.aadharNo || "");
				$("#pan").val(c.panNo || "");
				$("#state").val((c.state).toUpperCase() || "");
				$("#drivingLicenceNo").val((c.drivingLicenceNo).toUpperCase() || "");
				$("#voterNo").val((c.voterNo).toUpperCase() || "");
				$("#guardianName").val(c.guardianName || "");
				$("#customerAddress").val(c.customerAddress || "");
				$("#pinCode").val(c.pinCode || "");
				$("#nomineeName").val(c.nomineeName || "");
				$("#emailId").val(c.emailId || "");
				$("#dob").val(c.dob || "");
				$("#customerAge").val(c.customerAge || "");
				$("#branchName").val(c.branchName || "");
				$("#customerGender").val(c.customerGender || "");

				// Image preview
				const baseUrl = window.location.origin + "/Uploads/";
				//$("#photoPreview").attr("src", c.customerPhoto ? baseUrl + c.customerPhoto : baseUrl + "default-placeholder.jpg");
				//$("#signaturePreview").attr("src", c.customerSignature ? baseUrl + c.customerSignature : baseUrl + "default-placeholder.jpg");
				//$("#signaturePreview").attr("src", c.customerSignature ? baseUrl + c.customerSignature : baseUrl + "default-placeholder.jpg");
				//$("#signaturePreview").attr("src", c.customerSignature ? baseUrl + c.customerSignature : baseUrl + "default-placeholder.jpg");
				if (c.customerPhoto) {
					const photoPath = `Uploads/${c.customerPhoto}`;
					$("#photoPreview").attr("src", photoPath);
					$("#photoHidden").val(photoPath);
					const fakePhotoEvent = { target: { result: photoPath } };
					photoSizeEdit(fakePhotoEvent);

				} else {
					$("#photoPreview").attr("src", "Uploads/default-placeholder.jpg");
					$("#photoHidden").val("");
				}
				if (c.customerSignature) {
					const signPath = `Uploads/${c.customerSignature}`;
					$("#signaturePreview").attr("src", signPath);
					$("#signatureHidden").val(signPath);
					const fakeSignEvent = { target: { result: signPath } };
					signatureSizeEdit(fakeSignEvent);

				} else {
					$("#signaturePreview").attr("src", "Uploads/default-placeholder.jpg");
					$("#signatureHidden").val("");
				}
				// ⭐ BUTTON STATUS ⭐
				if (c.verified === true) {

					$("#saveBtn").css({
						"background-color": "green",
						"color": "white",
						"border": "none",
						"outline": "none",
						"font-weight": "600",
						"padding": "8px 15px",
						"border-radius": "6px",
						"cursor": "not-allowed"
					}).text("VERIFIED")
						.prop("disabled", true);

				} else {

					$("#saveBtn").css({
						"background-color": "red",
						"color": "white",
						"border": "none",
						"outline": "none",
						"font-weight": "600",
						"padding": "8px 15px",
						"border-radius": "6px",
						"cursor": "pointer"
					}).text("CLICK HERE TO AUTHENTICATE COMPLETE")
						.prop("disabled", false);
				}  // ← THIS CLOSING BRACE WAS MISSING!!

			} else {
				alert("No data found for the selected member.");
				clearCustomerFields();
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert("Failed to fetch data: " + textStatus + ", " + errorThrown);
		}
	});
}



$(document).ready(function() {

	// If already selected on load
	if ($("#selectByCode").val()) {
		fetchBySelectedCustomer();
	}

	// On dropdown change
	$("#selectByCode").on("change", function() {
		if ($(this).val()) {
			fetchBySelectedCustomer();
		} else {
			clearCustomerFields();
		}
	});
});








function verifyFetchedData() {
	const customerCode = $("#memberCode").val();

	const fetchedData = {
		memberCode: customerCode,
		customerName: $("#customerName").val(),
		contactNo: $("#contactNo").val(),
		signupDate: $("#singupDate").val(),
		aadharNo: $("#aadharNo").val(),
		pan: $("#pan").val(),
		voterNo: $("#voterNo").val(),
		drivingLicenceNo: $("#drivingLicenceNo").val()
	};

	fetch("api/customermanagement/verifyFetchedData", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(fetchedData)
	})
		.then(response => response.json())
		.then(data => {

			if (data.isVerified) {
				alert(data.message);

				$("#saveBtn").css({
					"background-color": "green",
					"color": "white",
					"border": "none",
					"outline": "none",
					"font-weight": "600",
					"padding": "8px 15px",
					"border-radius": "6px",
					"cursor": "not-allowed"
				})
					.text("Verified")
					.prop("disabled", true);

			} else {

				alert(data.message);

				$("#saveBtn").css({
					"background-color": "red",
					"color": "white",
					"border": "none",
					"outline": "none",
					"font-weight": "600",
					"padding": "8px 15px",
					"border-radius": "6px",
					"cursor": "pointer"
				})
					.text("Not Verified")
					.prop("disabled", false);
			}

		})
		.catch(error => {
			console.error("Error verifying data:", error);
			alert("Something went wrong while verifying.");
		});
}

$(document).ready(function() {
	$.ajax({
		url: "api/customermanagement/approved",
		method: "GET",
		success: function(response) {
			if (response.status === "OK") {

				let dropdown = $("#selectByCode");
				dropdown.empty(); // Clear old options
				dropdown.append(`<option value="">-- SELECT CUSTOMER --</option>`);

				response.data.forEach(function(item) {
					let fullName = [
						item.firstName,
						item.middleName,
						item.lastName
					].filter(Boolean).join(" ");

					let optionHtml = `
	                    <option value="${item.memberCode}">
	                        ${item.memberCode} - ${(fullName).toUpperCase()}
	                    </option>
	                `;

					dropdown.append(optionHtml);
				});
			} else {
				console.warn("Unexpected response:", response);
			}
		},
		error: function(err) {
			console.error("Error fetching customers:", err);
		}
	});
});

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