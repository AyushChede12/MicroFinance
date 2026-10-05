$(document).ready(function() {

	let allData = [];

	// ✅ Only run this on the listing page
	if (window.location.pathname !== "/updateFinacialConsultant") {
		// Fetch all data once on page load
		$.ajax({
			url: "api/financialconsultant/getAllFinancialConsultantDetails",
			type: "POST",
			contentType: "application/json",
			success: function(response) {
				if (response.status === "OK" && response.data.length > 0) {
					allData = response.data;
					renderTable(allData); // Initial full load
				} else {
					$(".datatable tbody").html(`<tr><td colspan="11" class="text-center">No data available</td></tr>`);
				}
			},
			error: function(xhr, status, error) {
				console.error("Error fetching financial consultants:", error);
				alert("Failed to load financial consultant data.");
			}
		});

		// Function to render table
		function renderTable(data) {
			const tbody = $(".datatable tbody");
			tbody.empty();

			if (data.length === 0) {
				tbody.html(`<tr><td colspan="11" class="text-center">No matching data found</td></tr>`);
				return;
			}

			$.each(data, function(index, item) {
				const row = `
                    <tr style="font-family: 'Poppins', sans-serif;">
                        <td>${index + 1}</td>
                        <td>${item.financialName || ''}</td>
                        <td>${item.financialCode || ''}</td>
                        <td>${item.contactNo || ''}</td>
                        <td>${item.joiningDate || ''}</td>
                        <td>${item.address || ''}</td>
                        <td>${item.branchName || ''}</td>
						<td>${item.financialStatus == 0 ? 'Active' : 'Inactive'}</td>

                        <td>
                            <button class="iconbutton editBtn" data-id="${item.id}" title="Edit">
                                <i class="fa-solid fa-pen-to-square text-primary"></i>
                            </button>
                        </td>
                        <td>
                            <button class="iconbutton deleteBtn" data-id="${item.id}" title="Delete">
                                <i class="fa-solid fa-trash text-danger"></i>
                            </button>
                        </td>
                    </tr>`;
				tbody.append(row);
			});
		}

		// ✅ Live search on typing
		$('#searchKeyword').on('keyup', function() {
			const keyword = $(this).val().trim().toLowerCase();

			if (keyword === "") {
				renderTable(allData); // Show all if nothing typed
				return;
			}

			const filteredData = allData.filter(item =>
				(item.financialName && item.financialName.toLowerCase().includes(keyword)) ||
				(item.financialCode && item.financialCode.toLowerCase().includes(keyword))
			);

			renderTable(filteredData);
		});

		// ✅ Edit button redirect
		$(document).on('click', '.editBtn', function() {
			const id = $(this).data('id');
			if (id) {
				window.location.href = `/updateFinacialConsultant?id=${id}`;
			}
		});
	}

	// ✅ Only run this on the edit page
	if (window.location.pathname.includes("/updateFinacialConsultant")) {
		const urlParams = new URLSearchParams(window.location.search);
		const id = urlParams.get("id");

		if (id) {
			$.ajax({
				url: "api/financialconsultant/getFinancialConsultantById",
				type: "GET",
				data: { id: id },
				success: function(response) {
					if (response.status === "OK" && response.data) {
						const data = response.data;

						$("#id").val(data.id);
						$("#joiningDate").val(data.joiningDate || '');
						$("#financialCode1").val(data.financialCode || '');
						$("#financialName").val(data.financialName || '');
						$("#dob").val(data.dob || '');
						$("#age").val(data.age || '');
						$("#contactNo").val(data.contactNo || '');
						$("#branchName").val(data.branchName || '');
						$("#address").val(data.address || '');
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
						document.getElementById("financialStatus").checked = data.financialStatus === true || data.financialStatus === '0';
						document.getElementById("smsSend").checked = data.smsSend === true || data.smsSend === '0';

						if (data.financialPhoto) {
							const img = `Uploads/${data.financialPhoto}`;
							$("#photoPreview").attr("src", img);
							$("#photoHidden").val(img);
						}

						if (data.finnacialSignature) {
							const img = `Uploads/${data.finnacialSignature}`;
							$("#signaturePreview").attr("src", img);
							$("#signatureHidden").val(img);
						}

						hideShowPayment(data.modeofPayment);

						// Scroll to form (optional)
						if ($("#formid").length > 0) {
							$('html, body').animate({
								scrollTop: $("#formid").offset().top
							}, 500);
						}
					} else {
						alert("No data found for the selected financial consultant.");
					}
				},
				error: function() {
					alert("Failed to fetch data for editing.");
				}
			});
		} else {
			alert("No ID found in URL.");
		}
	}

	$('#updateBtn').click(function(e) {
		e.preventDefault();

		let formData = new FormData();

		// Append regular text fields
		formData.append("id", $('#id').val());
		formData.append("joiningDate", $('#joiningDate').val());
		formData.append("financialCode", $('#financialCode1').val());
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
		formData.append("chequeNo", $('#chequeNo').val());
		formData.append("chequeDate", $('#chequeDate').val());
		formData.append("depositAccount", $('#depositAccount').val());
		formData.append("refNo", $('#refNo').val());
		formData.append("comments", $('#comments').val());
		formData.append("financialStatus", $('#financialStatus').is(':checked') ? 0 : 1);
		formData.append("smsSend", $('#smsSend').is(':checked') ? 0 : 1);

		// Append image paths or Base64 values

		const photoFile = $('#photo')[0].files[0];
		const signatureFile = $('#signature')[0].files[0];

		if (photoFile) {
			formData.append("financialPhoto", photoFile);
		}
		if (signatureFile) {
			formData.append("finnacialSignature", signatureFile);
		}

		/*formData.append("financialPhoto", $('#photoHidden').val());
		formData.append("finnacialSignature", $('#signatureHidden').val());*/

		$.ajax({
			url: "api/financialconsultant/saveOrUpdateFinancialConsultant",
			type: "POST",
			data: formData,
			enctype: 'multipart/form-data',
			contentType: false,
			processData: false,
			cache: false,
			success: function(response) {
				if (response.status === "OK") {
					alert("Updated Successfully");
					location.reload();
					location.assign('consultantDownlineView');
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


	$(document).on('click', '.deleteBtn', function() {
		var id = $(this).data('id');

		// Optional: Confirmation prompt
		if (confirm("Are you sure you want to delete this Financial Consultant?")) {
			$.ajax({
				url: 'api/financialconsultant/deleteFinancialConsultantById',
				type: 'POST',
				data: { id: id },
				success: function(response) {
					if (response.status === 'OK') {
						alert(response.message);
						// Reload or update the table after deletion
						location.reload(); // or call a function to refresh table via AJAX
					} else {
						alert("Error: " + response.message);
					}
				},
				error: function(xhr) {
					alert("Deletion failed. Please try again.");
				}
			});
		}
	});

});
function hideShowPayment(modeofPayment) {
	if (modeofPayment === 'Cash') {
		$('#displayCheque').hide();
		$('#displaycheqdate').hide();
		$('#displaydeposit').hide();
		$('#displayRef').hide();
	} else if (modeofPayment === 'Cheque') {
		$('#displayCheque').show();
		$('#displaycheqdate').show();
		$('#displaydeposit').show();
		$('#displayRef').hide();
	} else if (modeofPayment === 'Online' || modeofPayment === 'NEFT') {
		$('#displayCheque').hide();
		$('#displaycheqdate').hide();
		$('#displaydeposit').show();
		$('#displayRef').show();
	}
}

function displayDetails() {
	var modeofPayment=$('#modeofPayment').val();
	if (modeofPayment === 'Cash') {
		$('#displayCheque').hide();
		$('#displaycheqdate').hide();
		$('#displaydeposit').hide();
		$('#displayRef').hide();
	} else if (modeofPayment === 'Cheque') {
		$('#displayCheque').show();
		$('#displaycheqdate').show();
		$('#displaydeposit').show();
		$('#displayRef').hide();
	} else if (modeofPayment === 'Online' || modeofPayment === 'NEFT') {
		$('#displayCheque').hide();
		$('#displaycheqdate').hide();
		$('#displaydeposit').show();
		$('#displayRef').show();
	}
}