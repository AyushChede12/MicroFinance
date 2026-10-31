$(document).ready(function() {

	// ✅ Load Branches
	$.ajax({
		url: "api/financialconsultant/getAllBranch",
		type: "POST",
		success: function(response) {
			if (response.status === "OK" && response.data) {
				$("#branchName").empty().append("<option value=''>-- SELECT BRANCH --</option>");
				response.data.forEach(function(item) {
					if (item.branchName) {
						$("#branchName").append(`<option value='${item.branchName.toUpperCase()}'>${item.branchName.toUpperCase()}</option>`);
					}
				});
			} else {
				alert("NO BRANCHES FOUND.");
			}
		},
		error: function() {
			alert("FAILED TO LOAD BRANCH NAMES.");
		}
	});

	// ✅ Load Team Members
	$.ajax({
		url: "api/teammember/getAllteamMember",
		type: "GET",
		success: function(response) {
			if (response.status === "FOUND" && response.data) {
				$("#teamMemberCode").empty().append("<option value=''>-- SELECT TEAM MEMBER CODE --</option>");
				response.data.forEach(function(item) {
					$("#teamMemberCode").append(`<option value='${item.teamMemberCode}'>${item.teamMemberCode} - ${(item.memberName || '').toUpperCase()}</option>`);
				});
			} else {
				$("#teamMemberCode").empty().append("<option value=''>-- NO TEAM MEMBER FOUND --</option>");
			}
		},
		error: function() {
			alert("FAILED TO LOAD TEAM MEMBER NAMES.");
		}
	});

	// ✅ Set Today's Date
	let today = new Date().toISOString().split('T')[0];
	$("#joiningDate").val(today);

	// ✅ Fetch and Display All Financial Consultant Details
	loadConsultantTable();

	function loadConsultantTable() {
		$.ajax({
			url: "api/financialconsultant/getAllFinancialConsultantDetails",
			type: "POST",
			contentType: "application/json",
			success: function(response) {
				if (response.status === "OK" && response.data && response.data.length > 0) {
					var tbody = $(".datatable tbody");
					tbody.empty();
					$.each(response.data, function(index, item) {
						let statusText = (item.financialStatus === "1" || item.financialStatus === "ACTIVE" || item.financialStatus === true) ? "ACTIVE" : "INACTIVE";
						let statusBadge = statusText === "ACTIVE" 
							? '<span class="badge bg-success text-white">ACTIVE</span>' 
							: '<span class="badge bg-danger text-white">INACTIVE</span>';

						var row = `
	                        <tr style="font-family: 'Poppins', sans-serif;">
	                            <td>${index + 1}</td>
	                            <td>${item.financialCode || ''}</td>
	                            <td>${(item.financialName || '').toUpperCase()}</td>
	                            <td>${item.contactNo || ''}</td>
	                            <td>${(item.branchName || '').toUpperCase()}</td>
	                            <td>${(item.address || '').toUpperCase()}</td>
	                            <td>${(item.district || '').toUpperCase()}</td>
	                            <td>${(item.state || '').toUpperCase()}</td>
	                            <td>${item.pinCode || ''}</td>
	                            <td>${(item.profession || '').toUpperCase()}</td>
	                            <td>${statusBadge}</td>
	                        </tr>`;
						tbody.append(row);
					});
				} else {
					$(".datatable tbody").html(`<tr><td colspan="11" class="text-center">NO DATA AVAILABLE</td></tr>`);
				}
			},
			error: function(xhr, status, error) {
				console.error("ERROR FETCHING FINANCIAL CONSULTANTS:", error);
				alert("FAILED TO LOAD FINANCIAL CONSULTANT DATA.");
			}
		});
	}

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
			$('#chkjoiningDate').text('* THIS FIELD IS REQUIRED');
			$('#joiningDate').focus();
			isValid = false;
		}

		if (financialName === '') {
			$('#chkfinancialName').text('* THIS FIELD IS REQUIRED');
			$('#financialName').focus();
			isValid = false;
		}

		if (dob === '') {
			$('#chkdob').text('* THIS FIELD IS REQUIRED');
			$('#dob').focus();
			isValid = false;
		}

		if (age === '') {
			$('#chkage').text('* THIS FIELD IS REQUIRED');
			$('#age').focus();
			isValid = false;
		}

		if (contactNo === '') {
			$('#chkcontactNo').text('* THIS FIELD IS REQUIRED');
			$('#contactNo').focus();
			isValid = false;
		}

		if (branchName === '') {
			$('#chkbranchName').text('* THIS FIELD IS REQUIRED');
			$('#branchName').focus();
			isValid = false;
		}

		if (address === '') {
			$('#chkaddress').text('* THIS FIELD IS REQUIRED');
			$('#address').focus();
			isValid = false;
		}

		if (district === '') {
			$('#chkdistict').text('* THIS FIELD IS REQUIRED');
			$('#district').focus();
			isValid = false;
		}

		if (state === '') {
			$('#chkstate').text('* THIS FIELD IS REQUIRED');
			$('#state').focus();
			isValid = false;
		}

		if (pinCode === '') {
			$('#chkpinCode').text('* THIS FIELD IS REQUIRED');
			$('#pinCode').focus();
			isValid = false;
		}

		if (profession === '') {
			$('#chkprofession').text('* THIS FIELD IS REQUIRED');
			$('#profession').focus();
			isValid = false;
		}

		if (academicBackground === '') {
			$('#chkacademicBackground').text('* THIS FIELD IS REQUIRED');
			$('#academicBackground').focus();
			isValid = false;
		}

		if (teamMemberCode === '') {
			$('#chkteammembercode').text('* THIS FIELD IS REQUIRED');
			$('#teamMemberCode').focus();
			isValid = false;
		}

		if (!photo) {
			$('#chkphoto').text('* PHOTO IS REQUIRED');
			$('#photo').focus();
			isValid = false;
		}

		if (!signature) {
			$('#chksignature').text('* SIGNATURE IS REQUIRED');
			$('#signature').focus();
			isValid = false;
		}

		if (selectPosition === '') {
			$('#chkposition').text('* THIS FIELD IS REQUIRED');
			$('#selectPosition').focus();
			isValid = false;
		}

		if (referralCode === '') {
			$('#chkreferralCode').text('* THIS FIELD IS REQUIRED');
			$('#referralCode').focus();
			isValid = false;
		}

		if (referralName === '') {
			$('#chkrefferalName').text('* THIS FIELD IS REQUIRED');
			$('#referralName').focus();
			isValid = false;
		}

		if (modeofPayment === '') {
			$('#chkmodeofPayment').text('* THIS FIELD IS REQUIRED');
			$('#modeofPayment').focus();
			isValid = false;
		}

		if (!isValid) {
			return false;
		}

		var financialCode = $('#financialCode').val();

		const formData = new FormData();
		formData.append("joiningDate", $('#joiningDate').val());
		formData.append("financialCode", financialCode.toUpperCase());
		formData.append("financialName", $('#financialName').val().toUpperCase());
		formData.append("dob", $('#dob').val());
		formData.append("age", $('#age').val());
		formData.append("contactNo", $('#contactNo').val());
		formData.append("branchName", $('#branchName').val().toUpperCase());
		formData.append("address", $('#address').val().toUpperCase());
		formData.append("district", $('#district').val().toUpperCase());
		formData.append("state", $('#state').val().toUpperCase());
		formData.append("pinCode", $('#pinCode').val());
		formData.append("profession", $('#profession').val().toUpperCase());
		formData.append("academicBackground", $('#academicBackground').val().toUpperCase());
		formData.append("selectPosition", $('#selectPosition').val().toUpperCase());
		formData.append("referralCode", $('#referralCode').val().toUpperCase());
		formData.append("referralName", $('#referralName').val().toUpperCase());
		formData.append("fees", $('#fees').val());
		formData.append("modeofPayment", $('#modeofPayment').val().toUpperCase());
		formData.append("teamMemberCode", $('#teamMemberCode').val().toUpperCase());
		formData.append("chequeNo", ($('#chequeNo').val() || '').toUpperCase());
		formData.append("chequeDate", $('#chequeDate').val() || '');
		formData.append("depositAccount", ($('#depositAccount').val() || '').toUpperCase());
		formData.append("refNo", ($('#refNo').val() || '').toUpperCase());
		formData.append("comments", ($('#comments').val() || '').toUpperCase());
		formData.append("financialStatus", $('#financialStatus').is(':checked') ? "1" : "0");
		formData.append("smsSend", $('#smsSend').is(':checked') ? "1" : "0");

		if (photo) {
			formData.append("financialPhoto", photo);
		}
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
					alert("FINANCIAL CONSULTANT SAVED SUCCESSFULLY.\nFINANCIAL CODE: " + financialCode.toUpperCase());
					location.reload();
				} else {
					alert("ERROR: " + (response.message || "COULD NOT SAVE CONSULTANT").toUpperCase());
				}
			},
			error: function(xhr) {
				console.error("ERROR:", xhr.responseText);
				alert("AN ERROR OCCURRED WHILE SAVING THE DATA.");
			}
		});
	});

	// ✅ Payment Mode Display
	$('#displayCheque').hide();
	$('#displaycheqdate').hide();
	$('#displaydeposit').hide();
	$('#displayRef').hide();

	$('#modeofPayment').change(function() {
		displayDetails();
	});

	// ✅ UPI ID verification
	$('#verifyUpiBtn').click(function() {
		const upi = $('#refNo').val().trim();
		const upiPattern = /^[\w.\\-]{2,256}@[a-zA-Z]{2,64}$/;
		if (upiPattern.test(upi)) {
			$('#refNo').css('border', '2px solid green');
			$('#upiStatus').text('VALID UPI ID').css('color', 'green');
		} else {
			$('#refNo').css('border', '2px solid red');
			$('#upiStatus').text('INVALID UPI ID FORMAT').css('color', 'red');
		}
	});

	// ✅ Toggle button color update
	const toggles = document.querySelectorAll('.toggle__input');
	toggles.forEach((toggle) => {
		updateToggleColor(toggle);
		toggle.addEventListener('change', () => {
			updateToggleColor(toggle);
		});
	});

	function updateToggleColor(input) {
		const label = input.nextElementSibling;
		if (label) {
			label.style.backgroundColor = input.checked ? '#28a745' : '#ccc';
		}
	}

});

function displayDetails() {
	const paymentMode = ($('#modeofPayment').val() || '').toUpperCase();
	if (paymentMode === 'CASH') {
		$('#displayCheque').hide();
		$('#displaycheqdate').hide();
		$('#displaydeposit').hide();
		$('#displayRef').hide();
	} else if (paymentMode === 'CHEQUE') {
		$('#displayCheque').show();
		$('#displaycheqdate').show();
		$('#displaydeposit').show();
		$('#displayRef').hide();
	} else if (paymentMode === 'ONLINE' || paymentMode === 'NEFT') {
		$('#displayCheque').hide();
		$('#displaycheqdate').hide();
		$('#displaydeposit').show();
		$('#displayRef').show();
	} else {
		$('#displayCheque').hide();
		$('#displaycheqdate').hide();
		$('#displaydeposit').hide();
		$('#displayRef').hide();
	}
}

function printTable() {
	const printContent = document.getElementById('tabl').outerHTML;
	const printWindow = window.open('', '', 'height=500,width=800');

	printWindow.document.write('<html><head><title>PRINT FINANCIAL CONSULTANT DETAILS</title>');
	printWindow.document.write('<style>table {width:100%; border-collapse:collapse;} th, td {border:1px solid #333; padding:6px; font-size:12px; text-align:left;} th {background:#f0f0f0;}</style>');
	printWindow.document.write('</head><body>');
	printWindow.document.write('<h3 style="text-align:center;">FINANCIAL CONSULTANT REPORT</h3>');
	printWindow.document.write(printContent);
	printWindow.document.write('</body></html>');

	printWindow.document.close();
	printWindow.focus();
	printWindow.print();
}
