$(document).ready(function() {

	//Dropdown without search
	/*$.ajax({
		url: "api/financialconsultant/getAllFinancialConsultantDetails",
		type: "POST",
		success: function(response) {
			if (response.status === "OK") {
				$("#financialCode").empty().append("<option value=''>-- SELECT CODE --</option>");
				response.data.forEach(function(item) {
					$("#financialCode").append(`<option value='${item.financialCode}'>${item.financialCode}-${item.customerName}</option>`);
				});
			} else {
				alert("NO FINANCIAL CODES FOUND.");
			}
		},
		error: function() {
			alert("FAILED TO LOAD FINANCIAL CODES.");
		}
	});*/

	//Dropdowns with search
	$.ajax({
		url: 'api/reports/getApprovedFinancialConsultant',
		type: 'GET',
		success: function(response) {
			if (response.status === "OK") {
				let financialOptions = response.data.map(function(item) {
					return {
						id: item.financialCode,
						text: item.financialCode + " - " + item.financialName
					};
				});

				// Initialize Select2 with full data and custom search matcher
				$('#financialCode').select2({
					placeholder: '-- SEARCH FINANCIAL CODE OR NAME --',
					data: financialOptions,
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
				alert("NO FINANCIAL CODES FOUND.");
			}
		},
		error: function() {
			alert("FAILED TO LOAD FINANCIAL CODES.");
		}
	});

	$.ajax({
		url: "api/financialconsultant/getAllFinancialConsultantDetails",
		type: "POST",
		success: function(response) {
			if (response.status === "OK") {
				$("#memberCode").empty().append("<option value=''>-- SELECT CODE --</option>");
				response.data.forEach(function(item) {
					$("#memberCode").append(`<option value='${item.memberCode}'>${item.memberCode}</option>`);
				});
			} else {
				alert("NO CUSTOMER CODES FOUND.");
			}
		},
		error: function() {
			alert("FAILED TO LOAD CUSTOMER CODES.");
		}
	});

	$.ajax({
		url: "api/preference/getAllRelativeModule", // Add base path if needed like /api/preference/getAllBranchModule
		type: "GET",
		success: function(response) {
			if (response.status == "FOUND") {
				const relativeList = response.data;
				$("#relationToApplicant").empty(); // Clear existing options
				$("#relationToApplicant").append("<option value=''>-- SELECT RELATIVE TO APPLICANT --</option>");

				for (let i = 0; i < relativeList.length; i++) {
					let relative = relativeList[i];
					let option = `<option value="${relative.relation}">${relative.relation}</option>`;
					$("#relationToApplicant").append(option);
				}
			} else {
				alert("ERROR: " + response.message);
			}
		},
		error: function(xhr) {
			console.error("ERROR LOADING BRANCHES:", xhr.responseText);
			alert("FAILED TO LOAD DROPDOWN DATA.");
		}
	});

	$("#financialCode").change(function() {
		let financialCode = $("#financialCode").val();
		$.ajax({
			type: "GET",
			url: "api/financialconsultant/getfinancialHierarchyByFinancialCode",
			data: { financialCode: financialCode },
			success: function(response) {
				if (response.status == "OK") {
					let data = response.data[0];
					$("#id").val(data.id);
					$("#joiningDate").val(data.joiningDate);
					$("#financialName").val(data.financialName.toUpperCase());
					$("#dob").val(data.dob);
					$("#age").val(data.age);
					$("#contactNo").val(data.contactNo);
					$("#branchName").val(data.branchName.toUpperCase());
					$("#address").val(data.address.toUpperCase());
					$("#district").val(data.district.toUpperCase());
					$("#state").val(data.state.toUpperCase());
					$("#pinCode").val(data.pinCode);
					$("#profession").val(data.profession.toUpperCase());
					$("#academicBackground").val(data.academicBackground.toUpperCase());

					// Image bindings (photo and signature)
					if (data.financialPhoto) {
						const photoPath = `Uploads/${data.financialPhoto}`;
						$("#financialPhotoPreview").attr("src", photoPath);
						$("#financialphotoHidden").val(photoPath);
						const fakePhotoEvent = { target: { result: photoPath } };
						photoSizeEdit(fakePhotoEvent);
					} else {
						$("#financialPhotoPreview").attr("src", "Uploads/default-placeholder.jpg");
						$("#financialphotoHidden").val("");
					}

					if (data.finnacialSignature) {
						const signPath = `Uploads/${data.finnacialSignature}`;
						$("#financialSignaturePreview").attr("src", signPath);
						$("#financialsignatureHidden").val(signPath);
						const fakeSignEvent = { target: { result: signPath } };
						signatureSizeEdit(fakeSignEvent);
					} else {
						$("#financialSignaturePreview").attr("src", "Uploads/default-placeholder.jpg");
						$("#financialsignatureHidden").val("");
					}

					$("#selectPosition").val(data.selectPosition.toUpperCase());
					$("#referralCode").val(data.referralCode.toUpperCase());
					$("#referralName").val(data.referralName.toUpperCase());

					$("#fees").val(data.fees);
					$("#modeofPayment").val(data.modeofPayment);
					$("#comments").val(data.comments ? data.comments.toUpperCase() : "");
					$("#teamMemberCode").val((data.teamMemberCode || "").toUpperCase());
					$("#chequeNo").val((data.chequeNo || "").toUpperCase());
					$("#chequeDate").val(data.chequeDate || "");
					$("#depositAccount").val((data.depositAccount || "").toUpperCase());
					$("#refNo").val((data.refNo || "").toUpperCase());

					if (data.modeofPayment === "Cheque" || data.modeofPayment === "cheque") {
						$("#chequeNoDiv").show();
						$("#chequeDateDiv").show();
						$("#depositAccountDiv").show();
						$("#refNoDiv").show();
					} else if (data.modeofPayment === "Online" || data.modeofPayment === "online") {
						$("#chequeNoDiv").hide();
						$("#chequeDateDiv").hide();
						$("#depositAccountDiv").show();
						$("#refNoDiv").show();
					} else {
						$("#chequeNoDiv").hide();
						$("#chequeDateDiv").hide();
						$("#depositAccountDiv").hide();
						$("#refNoDiv").hide();
					}

					if (parseInt(data.financialStatus) === 1) {
						$('#toggle-financial-status').prop('checked', true);
					} else {
						$('#toggle-financial-status').prop('checked', false);
					}

					if (parseInt(data.smsSend) === 1) {
						$('#toggle-sms-send').prop('checked', true);
					} else {
						$('#toggle-sms-send').prop('checked', false);
					}

					updateToggleColor(document.getElementById('toggle-financial-status'));
					updateToggleColor(document.getElementById('toggle-sms-send'));

				} else {
					alert("FINANCIAL CONSULTANT DETAILS NOT FOUND FOR CODE");
				}
			},
			error: function() {
				alert("FINANCIAL CONSULTANT NOT FOUND OR SERVER ERROR");
			}
		});

	});

	$('#updateBtn').click(function(e) {
		e.preventDefault();

		const financialCode = $('#financialCode').val();
		if (!financialCode) {
			alert("FIRST SELECT THE DATA, THEN PROCEED TO UPDATE.");
			return;
		}

		let financialData = new FormData();

		// Append all form fields
		financialData.append("id", $('#id').val());
		financialData.append("financialCode", financialCode);
		financialData.append("joiningDate", $('#joiningDate').val());
		financialData.append("financialName", $('#financialName').val());
		financialData.append("dob", $('#dob').val());
		financialData.append("age", $('#age').val());
		financialData.append("contactNo", $('#contactNo').val());
		financialData.append("branchName", $('#branchName').val());
		financialData.append("address", $('#address').val());
		financialData.append("district", $('#district').val());
		financialData.append("state", $('#state').val());
		financialData.append("pinCode", $('#pinCode').val());
		financialData.append("profession", $('#profession').val());
		financialData.append("academicBackground", $('#academicBackground').val());
		financialData.append("selectPosition", $('#selectPosition').val());
		financialData.append("referralCode", $('#referralCode').val());
		financialData.append("referralName", $('#referralName').val());
		financialData.append("fees", $('#fees').val());
		financialData.append("modeofPayment", $('#modeofPayment').val());
		financialData.append("comments", ($('#comments').val() || "").toUpperCase());
		financialData.append("teamMemberCode", ($('#teamMemberCode').val() || "").toUpperCase());
		financialData.append("chequeNo", ($('#chequeNo').val() || "").toUpperCase());
		financialData.append("chequeDate", $('#chequeDate').val());
		financialData.append("depositAccount", ($('#depositAccount').val() || "").toUpperCase());
		financialData.append("refNo", ($('#refNo').val() || "").toUpperCase());

		// Checkbox/toggle fields
		financialData.append("financialStatus", $('#toggle-financial-status').is(':checked') ? 1 : 0);
		financialData.append("smsSend", $('#toggle-sms-send').is(':checked') ? 1 : 0);

		// File inputs
		const photoFile = $('#financialPhoto')[0]?.files[0];
		const signatureFile = $('#finnacialSignature')[0]?.files[0];

		if (photoFile) {
			financialData.append("financialPhoto", photoFile);
		}

		if (signatureFile) {
			financialData.append("finnacialSignature", signatureFile);
		}

		// AJAX call
		$.ajax({
			url: "api/financialconsultant/saveOrUpdateFinancialConsultant",
			type: "POST",
			data: financialData,
			enctype: 'multipart/form-data',
			contentType: false,
			processData: false,
			cache: false,
			success: function(response) {
				if (response.status === "OK" || response.status === "success") {
					alert("FINANCIAL DATA UPDATED SUCCESSFULLY.");
					location.reload();
				} else {
					alert("SOMETHING WENT WRONG: " + response.message);
				}
			},
			error: function(xhr) {
				const message = xhr.responseJSON?.message || xhr.responseText || "UNKNOWN ERROR";
				alert("ERROR WHILE SAVING DATA: " + message);
			}
		});
	});

	/*$("#printBtn").on("click", function(e) {
		e.preventDefault();

		var financialCode = $('#financialCode').val();
		if (financialCode && financialCode !== "") {

			const $formClone = $("#formid").clone();

			// Remove buttons and extra dropdowns
			$formClone.find("#editmember, #printBtn, #updateBtn, #deleteBtn, #customerCode, #customerSelection").remove();
			$formClone.find(".text-center").each(function() {
				if ($(this).find("button").length > 0) {
					$(this).remove();
				}
			});

			// Convert selects to plain text
			$formClone.find("select").each(function() {
				const selectedText = $(this).find("option:selected").text();
				$(this).replaceWith(`<span class="form-value">${selectedText}</span>`);
			});

			// Convert inputs to plain text
			$formClone.find("input[type='text'], input[type='date'], input[type='number'], input[type='email'], input[type='tel']").each(function() {
				const value = $(this).val();
				$(this).replaceWith(`<span class="form-value">${value}</span>`);
			});

			// Convert textareas
			$formClone.find("textarea").each(function() {
				const value = $(this).val();
				$(this).replaceWith(`<span class="form-value">${value}</span>`);
			});

			// Convert checkboxes and radios
			$formClone.find("input[type='checkbox'], input[type='radio']").each(function() {
				const isChecked = $(this).is(':checked') ? 'Yes' : 'No';
				$(this).replaceWith(`<span class="form-value">${isChecked}</span>`);
			});

			// Optional: Resize images if any
			$formClone.find("img").each(function() {
				$(this).css({
					width: "100px",
					height: "auto",
					border: "1px solid #ccc",
					marginBottom: "10px"
				});
			});

			// Open print window
			const printWindow = window.open("", "_blank");
			if (printWindow) {
				printWindow.document.open();
				printWindow.document.write(`
					<html>
					<head>
						<title>PRINT - FINANCIAL CONSULTANT FORM</title>
						<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">
						<style>
							body {
								font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
								padding: 30px;
								background: #fff;
								color: #333;
							}
							h3 {
								text-align: center;
								margin-bottom: 30px;
								border-bottom: 2px solid #444;
								padding-bottom: 10px;
							}
							.form-group, .form-row {
								margin-bottom: 20px;
								display: flex;
								flex-wrap: wrap;
								align-items: center;
							}
							label {
								width: 200px;
								font-weight: 600;
								margin-bottom: 5px;
								color: #000;
							}
							.form-value {
								flex: 1;
								padding: 8px 12px;
								border: 1px solid #ccc;
								border-radius: 5px;
								background-color: #f9f9f9;
								font-weight: 500;
								color: #222;
							}
							img {
								display: block;
								margin-top: 10px;
							}
							@media print {
								body {
									zoom: 95%;
								}
							}
						</style>
					</head>
					<body onload="window.print(); window.close();">
						<h3>FINANCIAL INFORMATION</h3>
						<div class="container">
							${$formClone[0].outerHTML}
						</div>
					</body>
					</html>
				`);
				printWindow.document.close();
			} else {
				alert("POPUP BLOCKED. PLEASE ALLOW POPUPS FOR THIS WEBSITE.");
			}
		}
		else {
			alert("FIRST SELECT ANY ONE DATA THEN PROCEED TO PRINT");
		}
	});*/

	$("#printBtn").on("click", function() {

		const financialCode = $("#financialCode").val();
		if (!financialCode) {
			alert("PLEASE SELECT AT LEAST ONE DATA THEN PROCEED TO PRINT!");
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
				if (id === "financialCode" && txt.includes("-")) {
					txt = txt.split("-")[0].trim();
				}
				return txt;
			}
			return el.val() ? el.val() : "";
		}

		const photo = $("#financialPhotoPreview").attr("src");
		const sign = $("#financialSignaturePreview").attr("src");

		const printContent = `
		        ${companyHeader}

		        <h2 style="text-align:center;margin-bottom:20px;">CUSTOMER DETAILS</h2>

		        <table class="print-table">

		            <tr><th>FINANCIAL CODE</th><td>${getVal("financialCode")}</td></tr>
		            <tr><th>JOINING DATE</th><td>${getVal("joiningDate")}</td></tr>
		            <tr><th>FINANCIAL NAME</th><td>${getVal("financialName")}</td></tr>
		            <tr><th>DATE OF BIRTH</th><td>${getVal("dob")}</td></tr>
		            <tr><th>AGE</th><td>${getVal("age")}</td></tr>
		            <tr><th>CONTACT NO</th><td>${getVal("contactNo")}</td></tr>
		            <tr><th>BRANCH</th><td>${getVal("branchName")}</td></tr>
		            <tr><th>ADDRESS</th><td>${getVal("address")}</td></tr>
		            <tr><th>DISTRICT</th><td>${getVal("district")}</td></tr>
		            <tr><th>STATE</th><td>${getVal("state")}</td></tr>
		            <tr><th>PIN CODE</th><td>${getVal("pinCode")}</td></tr>
		            <tr><th>PROFESSION</th><td>${getVal("profession")}</td></tr>
		            <tr><th>ACADEMIC BACKGROUND</th><td>${getVal("academicBackground")}</td></tr>
					<tr><th colspan="2" style="background:#f1f1f1;text-align:center;">FINANCIAL IMAGES</th></tr>

						            <tr>
						                <th>CUSTOMER PHOTO</th>
						                <td><img src="${photo}" style="width:120px;height:120px;object-fit:cover;border-radius:10px;"></td>
						            </tr>

						            <tr>
						                <th>CUSTOMER SIGNATURE</th>
						                <td><img src="${sign}" style="width:150px;height:70px;object-fit:contain;"></td>
						            </tr>

									<tr><th colspan="2" style="background:#f1f1f1;text-align:center;">INTRODUCER DETAILS</th></tr>
		            <tr><th>POSITION</th><td>${getVal("selectPosition")}</td></tr>
		            <tr><th>FREFERRAL CODE</th><td>${getVal("referralCode")}</td></tr>
		            <tr><th>REFERRAL NAME</th><td>${getVal("referralName")}</td></tr>

					<tr><th colspan="2" style="background:#f1f1f1;text-align:center;">PAYMENT DETAILS</th></tr>
		            <tr><th>FEES</th><td>${getVal("fees")}</td></tr>
		            <tr><th>PAYMENT MODE</th><td>${getVal("modeofPayment")}</td></tr>
		            <tr><th>COMMENTS</th><td>${getVal("comments")}</td></tr>

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

	$('#deleteBtn').click(function(event) {
		var id = $("#id").val();
		let financialCode = $("#financialCode").val();
		if (financialCode !== "") {
			if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS FINANCIAL DATA?")) {
				$.ajax({
					url: "api/financialconsultant/deleteFinancialConsultantById",
					type: "POST",
					data: { id: id },
					success: function(response) {
						if (response.status == "OK") {
							alert("FINANCIAL DATA DELETED SUCCESSFULLY");
							location.reload();
						} else {
							alert("DELETE FAILED: " + response.message);
						}
					},
					error: function(xhr, status, error) {
						alert("FAILED TO DELETE FINANCIAL DATA.");
						console.error("ERROR:", error);
					}
				});
			}
		}
		else {
			alert("FIRST SELECT ANY ONE DATA THEN PROCEED TO DELETE!");
		}

	});

});

//Colour Change After Binding - Ayush
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
	const file = document.getElementById("financialPhoto").files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function(e) {
			photoSizeEdit(e);
			$("#financialphotoHidden").val("");
		};
		reader.readAsDataURL(file);
	} else {
		alert("PLEASE UPLOAD A VALID IMAGE FILE FOR PHOTO.");
	}
}


//Ayush
function signatureUpload() {
	const file = document.getElementById("finnacialSignature").files[0];
	if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
		reader.onload = function(e) {
			signatureSizeEdit(e);
			$("#financialsignatureHidden").val("");
		};
		reader.readAsDataURL(file);
	} else {
		alert("PLEASE UPLOAD A VALID IMAGE FILE FOR SIGNATURE.");
	}
}

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

function photoSizeEdit(e) {
	const previewimg = document.getElementById("financialPhotoPreview");
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
}

function signatureSizeEdit(e) {
	const previewimg = document.getElementById("financialSignaturePreview");
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