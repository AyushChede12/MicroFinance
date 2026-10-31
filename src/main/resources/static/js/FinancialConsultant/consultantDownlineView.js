$(document).ready(function() {

	let allData = [];

	// ✅ Only run this on the listing page
	if (!window.location.pathname.includes("/updateFinacialConsultant")) {
		// Fetch all data once on page load
		$.ajax({
			url: "api/financialconsultant/getAllFinancialConsultantDetails",
			type: "POST",
			contentType: "application/json",
			success: function(response) {
				if (response.status === "OK" && response.data && response.data.length > 0) {
					allData = response.data;
					renderTable(allData);
				} else {
					$(".datatable tbody").html(`<tr><td colspan="10" class="text-center">NO DATA AVAILABLE</td></tr>`);
				}
			},
			error: function(xhr, status, error) {
				console.error("ERROR FETCHING FINANCIAL CONSULTANTS:", error);
				alert("FAILED TO LOAD FINANCIAL CONSULTANT DATA.");
			}
		});

		// Function to render table
		function renderTable(data) {
			const tbody = $(".datatable tbody");
			tbody.empty();

			if (!data || data.length === 0) {
				tbody.html(`<tr><td colspan="10" class="text-center">NO MATCHING DATA FOUND</td></tr>`);
				return;
			}

			$.each(data, function(index, item) {
				let statusText = (item.financialStatus === "1" || item.financialStatus === "ACTIVE" || item.financialStatus === true) ? "ACTIVE" : "INACTIVE";
				let statusBadge = statusText === "ACTIVE" 
					? '<span class="badge bg-success text-white">ACTIVE</span>' 
					: '<span class="badge bg-danger text-white">INACTIVE</span>';

				const row = `
                    <tr style="font-family: 'Poppins', sans-serif;">
                        <td>${index + 1}</td>
                        <td>${(item.financialName || '').toUpperCase()}</td>
                        <td><strong>${item.financialCode || ''}</strong></td>
                        <td>${item.contactNo || ''}</td>
                        <td>${item.joiningDate || ''}</td>
                        <td>${(item.address || '').toUpperCase()}</td>
                        <td>${(item.branchName || '').toUpperCase()}</td>
                        <td>${statusBadge}</td>
                        <td>
                            <button class="iconbutton editBtn" data-id="${item.id}" title="EDIT">
                                <i class="fa-solid fa-pen-to-square text-primary"></i>
                            </button>
                        </td>
                        <td>
                            <button class="iconbutton deleteBtn" data-id="${item.id}" title="DELETE">
                                <i class="fa-solid fa-trash text-danger"></i>
                            </button>
                        </td>
                    </tr>`;
				tbody.append(row);
			});
		}

		// ✅ Live search on typing
		$('#searchKeyword').on('keyup input', function() {
			const keyword = $(this).val().trim().toUpperCase();

			if (keyword === "") {
				renderTable(allData);
				return;
			}

			const filteredData = allData.filter(item =>
				((item.financialName || '').toUpperCase().includes(keyword)) ||
				((item.financialCode || '').toUpperCase().includes(keyword))
			);

			renderTable(filteredData);
		});

		// ✅ Edit button redirect
		$(document).on('click', '.editBtn', function() {
			const id = $(this).data('id');
			if (id) {
				window.location.href = `updateFinacialConsultant?id=${id}`;
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
						$("#financialName").val((data.financialName || '').toUpperCase());
						$("#dob").val(data.dob || '');
						$("#age").val(data.age || '');
						$("#contactNo").val(data.contactNo || '');
						$("#branchName").val((data.branchName || '').toUpperCase());
						$("#address").val((data.address || '').toUpperCase());
						$("#district").val((data.district || '').toUpperCase());
						$("#state").val((data.state || '').toUpperCase());
						$("#pinCode").val(data.pinCode || '');
						$("#profession").val((data.profession || '').toUpperCase());
						$("#academicBackground").val((data.academicBackground || '').toUpperCase());
						$("#selectPosition").val((data.selectPosition || '').toUpperCase());
						$("#referralCode").val((data.referralCode || '').toUpperCase());
						$("#referralName").val((data.referralName || '').toUpperCase());
						$("#fees").val(data.fees || '');
						$("#modeofPayment").val(data.modeofPayment || '');
						$("#chequeNo").val((data.chequeNo || '').toUpperCase());
						$("#chequeDate").val(data.chequeDate || '');
						$("#depositAccount").val((data.depositAccount || '').toUpperCase());
						$("#refNo").val((data.refNo || '').toUpperCase());
						$("#comments").val((data.comments || '').toUpperCase());

						let isActive = (data.financialStatus === "1" || data.financialStatus === "ACTIVE" || data.financialStatus === true);
						let isSms = (data.smsSend === "1" || data.smsSend === "YES" || data.smsSend === true);

						document.getElementById("financialStatus").checked = isActive;
						document.getElementById("smsSend").checked = isSms;

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

					} else {
						alert("NO DATA FOUND FOR THE SELECTED FINANCIAL CONSULTANT.");
					}
				},
				error: function() {
					alert("FAILED TO FETCH DATA FOR EDITING.");
				}
			});
		} else {
			alert("NO CONSULTANT ID SPECIFIED.");
		}
	}

	$('#updateBtn').click(function(e) {
		e.preventDefault();

		let formData = new FormData();

		// Append regular text fields with UPPERCASE
		formData.append("id", $('#id').val());
		formData.append("joiningDate", $('#joiningDate').val());
		formData.append("financialCode", $('#financialCode1').val().trim().toUpperCase());
		formData.append("financialName", $('#financialName').val().trim().toUpperCase());
		formData.append("dob", $('#dob').val());
		formData.append("age", $('#age').val());
		formData.append("contactNo", $('#contactNo').val());
		formData.append("branchName", $('#branchName').val().trim().toUpperCase());
		formData.append("address", $('#address').val().trim().toUpperCase());
		formData.append("district", $('#district').val().trim().toUpperCase());
		formData.append("state", $('#state').val().trim().toUpperCase());
		formData.append("pinCode", $('#pinCode').val());
		formData.append("profession", $('#profession').val().trim().toUpperCase());
		formData.append("academicBackground", $('#academicBackground').val().trim().toUpperCase());
		formData.append("selectPosition", $('#selectPosition').val().trim().toUpperCase());
		formData.append("referralCode", $('#referralCode').val().trim().toUpperCase());
		formData.append("referralName", $('#referralName').val().trim().toUpperCase());
		formData.append("fees", $('#fees').val());
		formData.append("modeofPayment", ($('#modeofPayment').val() || '').trim().toUpperCase());
		formData.append("chequeNo", ($('#chequeNo').val() || '').trim().toUpperCase());
		formData.append("chequeDate", $('#chequeDate').val() || '');
		formData.append("depositAccount", ($('#depositAccount').val() || '').trim().toUpperCase());
		formData.append("refNo", ($('#refNo').val() || '').trim().toUpperCase());
		formData.append("comments", ($('#comments').val() || '').trim().toUpperCase());
		formData.append("financialStatus", $('#financialStatus').is(':checked') ? "1" : "0");
		formData.append("smsSend", $('#smsSend').is(':checked') ? "1" : "0");

		const photoFile = $('#photo')[0] ? $('#photo')[0].files[0] : null;
		const signatureFile = $('#signature')[0] ? $('#signature')[0].files[0] : null;

		if (photoFile) {
			formData.append("financialPhoto", photoFile);
		}
		if (signatureFile) {
			formData.append("finnacialSignature", signatureFile);
		}

		$.ajax({
			url: "api/financialconsultant/saveOrUpdateFinancialConsultant",
			type: "POST",
			data: formData,
			enctype: 'multipart/form-data',
			contentType: false,
			processData: false,
			cache: false,
			success: function(response) {
				if (response.status === "OK" || response.status === "CREATED") {
					alert("FINANCIAL CONSULTANT UPDATED SUCCESSFULLY.");
					window.location.href = 'consultantDownlineView';
				} else {
					alert("ERROR: " + (response.message || "UPDATE FAILED").toUpperCase());
				}
			},
			error: function(xhr) {
				alert("ERROR WHILE SAVING DATA: " + xhr.responseText);
			}
		});
	});

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

	$(document).on('click', '.deleteBtn', function() {
		var id = $(this).data('id');

		if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS FINANCIAL CONSULTANT?")) {
			$.ajax({
				url: 'api/financialconsultant/deleteFinancialConsultantById',
				type: 'POST',
				data: { id: id },
				success: function(response) {
					if (response.status === 'OK') {
						alert("FINANCIAL CONSULTANT DELETED SUCCESSFULLY.");
						location.reload();
					} else {
						alert("ERROR: " + (response.message || "DELETION FAILED").toUpperCase());
					}
				},
				error: function(xhr) {
					alert("DELETION FAILED. PLEASE TRY AGAIN.");
				}
			});
		}
	});

	// Toggle color update
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

function hideShowPayment(modeofPayment) {
	const mode = (modeofPayment || '').toUpperCase();
	if (mode === 'CASH') {
		$('#displayCheque').hide();
		$('#displaycheqdate').hide();
		$('#displaydeposit').hide();
		$('#displayRef').hide();
	} else if (mode === 'CHEQUE') {
		$('#displayCheque').show();
		$('#displaycheqdate').show();
		$('#displaydeposit').show();
		$('#displayRef').hide();
	} else if (mode === 'ONLINE' || mode === 'NEFT') {
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

function displayDetails() {
	var modeofPayment = $('#modeofPayment').val();
	hideShowPayment(modeofPayment);
}
