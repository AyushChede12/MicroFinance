$(document).ready(function() {
	$.ajax({
		url: 'api/datacorrection/getApprovedLoanIds',
		type: 'GET',
		success: function(response) {
			if (response.status === "OK") {
				let loanOptions = response.data.map(function(item) {
					return {
						id: item.loanId,
						text: item.loanId
					};
				});

				// Initialize Select2 with full data and custom search matcher
				$('#loanId').select2({
					placeholder: '-- Search Loan ID --',
					data: loanOptions,
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
				alert("No Loan ID found.");
			}
		},
		error: function() {
			alert("Failed to load ID");
		}
	});

	$.ajax({
		url: "api/datacorrection/fetchAllApprovedLoanApplications",
		type: "GET",
		success: function(response) {
			if (response.status === "OK") {
				$("#memberId").empty().append("<option value=''>-- Select Code --</option>");
				$("#guarantorMemberId").empty().append("<option value=''>-- Select Code --</option>");
				$("#coApplicantMemberId").empty().append("<option value=''>-- Select Code --</option>");
				response.data.forEach(function(item) {
					$("#memberId").append(`<option value='${item.memberId}'>${item.memberId}</option>`);
					$("#guarantorMemberId").append(`<option value='${item.guarantorMemberId}'>${item.guarantorMemberId}</option>`);
					$("#coApplicantMemberId").append(`<option value='${item.coApplicantMemberId}'>${item.coApplicantMemberId}</option>`);
				});
			} else {
				alert("No Customer Code found.");
			}
		},
		error: function() {
			alert("Failed to load Data");
		}
	});

	$("#loanId").change(function() {
		let loanId = $("#loanId").val();

		if (loanId !== "") {
			$.ajax({
				type: "GET",
				url: "api/loanmanegment/getLoanById",
				data: { loanId: loanId },
				success: function(response) {
					if (response.status == "OK") {
						let data = response.data;
						$("#id").val(data.id);
						$("#loanDate").val(data.loanDate);
						$("#memberId").val(data.memberId);
						$("#relativeDetails").val(data.relativeDetails);
						$("#dateOfBirth").val(data.dateOfBirth);
						$("#age").val(data.age);
						$("#contactNo").val(data.contactNo);
						$("#address").val(data.address);
						$("#pinCode").val(data.pinCode);
						$("#branchName").val(data.branchName);
						$("#loanPlanName").val(data.loanPlanName);
						$("#typeOfLoan").val(data.typeOfLoan);
						$("#loanMode").val(data.loanMode);
						$("#loanTerm").val(data.loanTerm);
						$("#rateOfInterest").val(data.rateOfInterest);
						$("#loanAmount").val(data.loanAmount);
						$("#interestType").val(data.interestType);
						$("#emiPayment").val(data.emiPayment);
						$("#purposeOfLoan").val(data.purposeOfLoan);

						//Guaranter Details
						$("#guarantorMemberId").val(data.guarantorMemberId);
						$("#guarantorIdentity").val(data.guarantorIdentity);
						$("#guarantorAddress").val(data.guarantorAddress);
						$("#guarantorPinCode").val(data.guarantorPinCode);
						$("#guarantorContactNo").val(data.guarantorContactNo);
						$("#guarantorSecurityType").val(data.guarantorSecurityType);

						//CoApplicant Details
						$("#coApplicantMemberId").val(data.coApplicantMemberId);
						$("#coApplicantIdentity").val(data.coApplicantIdentity);
						$("#coApplicantAddress").val(data.coApplicantAddress);
						$("#coApplicantPinCode").val(data.coApplicantPinCode);
						$("#coApplicantContactNo").val(data.coApplicantContactNo);
						$("#coApplicantSecurityType").val(data.coApplicantSecurityType);

						//Deduction Details
						$("#processingFee").val(data.processingFee);
						$("#legalCharges").val(data.legalCharges);
						$("#gst").val(data.gst);
						$("#insuranceFee").val(data.insuranceFee);
						$("#valuationFees").val(data.valuationFees);
						$("#stationaryFee").val(data.stationaryFee);
						$("#financialConsultantId").val(data.financialConsultantId);
						$("#financialConsultantName").val(data.financialConsultantName);


						//$("#photoPreview").attr("src", data.customerPhoto ? `Uploads/${data.customerPhoto}` : "Uploads/default-placeholder.jpg");

						if (data.photo) {
							const photoPath = `Uploads/${data.photo}`;
							$("#photoPreview").attr("src", photoPath);
							$("#photoHidden").val(photoPath);
							const fakePhotoEvent = { target: { result: photoPath } };
							photoSizeEdit(fakePhotoEvent);

						} else {
							$("#photoPreview").attr("src", "Uploads/default-placeholder.jpg");
							$("#photoHidden").val("");
						}

						// Image: Signature
						if (data.signature) {
							const signPath = `Uploads/${data.signature}`;
							$("#signaturePreview").attr("src", signPath);
							$("#signatureHidden").val(signPath);
							const fakeSignEvent = { target: { result: signPath } };
							signatureSizeEdit(fakeSignEvent);

						} else {
							$("#signaturePreview").attr("src", "Uploads/default-placeholder.jpg");
							$("#signatureHidden").val("");
						}

						if (data.messageStatus === 'on') {
							$('#toggle-sms-send').prop('checked', true);
						} else {
							$('#toggle-sms-send').prop('checked', false);
						}

						updateToggleColor(document.getElementById('toggle-sms-send'));

					} else {
						alert("No customer found for this member code.");
					}
				},
				error: function() {
					alert("Member not found or server error.");
				}
			});
		}
	});

	$('#updateBtn').click(async function(event) {
		event.preventDefault();
		const loanId = $("#loanId").val();
		if (!loanId) {
			alert("First select the data, then proceed to update.");
			return;
		}

		const loanData = {
			id: $("#id").val(),
			loanId: loanId,
			loanDate: $("#loanDate").val(),
			memberId: $("#memberId").val(),
			relativeDetails: $("#relativeDetails").val(),
			dateOfBirth: $("#dateOfBirth").val(),
			age: $("#age").val(),
			contactNo: $("#contactNo").val(),
			address: $("#address").val(),
			pinCode: $("#pinCode").val(),
			branchName: $("#branchName").val(),
			loanPlanName: $("#loanPlanName").val(),
			typeOfLoan: $("#typeOfLoan").val(),
			loanMode: $("#loanMode").val(),
			loanTerm: $("#loanTerm").val(),
			rateOfInterest: $("#rateOfInterest").val(),
			loanAmount: $("#loanAmount").val(),
			interestType: $("#interestType").val(),
			emiPayment: $("#emiPayment").val(),
			purposeOfLoan: $("#purposeOfLoan").val(),
			guarantorMemberId: $("#guarantorMemberId").val(),
			guarantorIdentity: $("#guarantorIdentity").val(),
			guarantorAddress: $("#guarantorAddress").val(),
			guarantorPinCode: $("#guarantorPinCode").val(),
			guarantorContactNo: $("#guarantorContactNo").val(),
			guarantorSecurityType: $("#guarantorSecurityType").val(),
			coApplicantMemberId: $("#coApplicantMemberId").val(),
			coApplicantIdentity: $("#coApplicantIdentity").val(),
			coApplicantAddress: $("#coApplicantAddress").val(),
			coApplicantPinCode: $("#coApplicantPinCode").val(),
			coApplicantContactNo: $("#coApplicantContactNo").val(),
			coApplicantSecurityType: $("#coApplicantSecurityType").val(),
			processingFee: $("#processingFee").val(),
			legalCharges: $("#legalCharges").val(),
			gst: $("#gst").val(),
			insuranceFee: $("#insuranceFee").val(),
			valuationFees: $("#valuationFees").val(),
			stationaryFee: $("#stationaryFee").val(),
			financialConsultantId: $("#financialConsultantId").val(),
			financialConsultantName: $("#financialConsultantName").val()
		};

		$.ajax({
			type: 'POST',
			url: 'api/datacorrection/updateDataOfLoanApplication',
			contentType: "application/json",
			data: JSON.stringify(loanData),
			success: function(response) {
				if (response.status === "OK") {
					alert("Loan Data Updated Successfully");
					location.reload();
				} else {
					alert("Something went wrong: " + response.message);
				}
			},
			error: function(xhr) {
				alert("Error while Updating data: " + xhr.responseText);
			}
		});
	});

	$("#newBtn").click(function() {
		location.reload();
	});

	$('#deleteBtn').click(function(event) {
		var id = $("#id").val();
		let loanId = $("#loanId").val();
		if (loanId !== "") {
			if (confirm("Are you sure you want to delete this Loan Data?")) {
				$.ajax({
					url: "api/datacorrection/deleteLoanApplicationDataById",
					type: "POST",
					data: { id: id },
					success: function(response) {
						if (response.status == "OK") {
							alert("Loan Application Data Deleted Successfully");
							location.reload();
						} else {
							alert("Delete failed: " + response.message);
						}
					},
					error: function(xhr, status, error) {
						alert("Failed to delete Loan Data.");
						console.error("Error:", error);
					}
				});
			}
		}
		else {
			alert("First Select Any One Data Then Proceed To Delete!");
		}

	});

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