$(document).ready(function() {

	let consultantList = [];

	// Set default date to today
	let today = new Date().toISOString().split('T')[0];
	$('#promotionDate').val(today);

	// Load all consultants for dropdowns and auto-filling
	$.ajax({
		url: "api/financialconsultant/getAllFinancialConsultantDetails",
		type: 'POST',
		contentType: 'application/json',
		success: function(response) {
			if (response && response.data) {
				consultantList = response.data;
				const $dropdown = $('#financialCode');
				$dropdown.empty().append('<option value="">-- SELECT FINANCIAL CODE --</option>');

				consultantList.forEach(function(item) {
					const displayText = item.financialCode + ' - ' + (item.financialName || '').toUpperCase();
					$dropdown.append('<option value="' + item.financialCode + '">' + displayText + '</option>');
				});

				// Auto-suggest default senior if MANAGER exists
				const manager = consultantList.find(item => (item.selectPosition || '').toUpperCase().includes("MANAGER"));
				if (manager) {
					$('#newseniorCode').val(manager.financialCode);
					$('#newseniorname').val((manager.financialName || '').toUpperCase());
					$('#newseniorposition').val((manager.selectPosition || '').toUpperCase());
				}

				// Consultant selection change
				$dropdown.on('change', function() {
					const selectedCode = $(this).val();
					const selectedItem = consultantList.find(item => item.financialCode === selectedCode);

					if (selectedItem) {
						$('#id').val(selectedItem.id || '');
						$('#Branch').val((selectedItem.branchName || '').toUpperCase());
						$('#oldPosition').val((selectedItem.selectPosition || '').toUpperCase());
					} else {
						$('#id').val('');
						$('#Branch').val('');
						$('#oldPosition').val('');
					}
				});
			}
		},
		error: function(xhr, status, error) {
			console.error("ERROR FETCHING CONSULTANTS:", error);
			alert("FAILED TO LOAD CONSULTANTS LIST.");
		}
	});

	// Auto-lookup senior details when typing senior code
	$('#newseniorCode').on('keyup blur', function() {
		const sCode = $(this).val().trim().toUpperCase();
		if (sCode && consultantList.length > 0) {
			const senior = consultantList.find(item => (item.financialCode || '').toUpperCase() === sCode);
			if (senior) {
				$('#newseniorname').val((senior.financialName || '').toUpperCase());
				$('#newseniorposition').val((senior.selectPosition || '').toUpperCase());
			}
		}
	});

	// Update promotion button click
	$('#updateBtn').click(function(e) {
		e.preventDefault();

		let id = $('#id').val();
		let financialCode = $('#financialCode').val();
		let newPosition = $('#newPosition').val();
		let promotionDate = $('#promotionDate').val();
		let seniorCode = $('#newseniorCode').val();

		if (!financialCode) {
			alert("PLEASE SELECT A FINANCIAL CONSULTANT.");
			$('#financialCode').focus();
			return;
		}

		if (!newPosition) {
			alert("PLEASE SELECT A NEW POSITION.");
			$('#newPosition').focus();
			return;
		}

		if (!promotionDate) {
			alert("PLEASE SELECT A PROMOTION DATE.");
			$('#promotionDate').focus();
			return;
		}

		if (!seniorCode) {
			alert("PLEASE ENTER A SENIOR CODE.");
			$('#newseniorCode').focus();
			return;
		}

		let formData = new FormData();
		formData.append("id", id);
		formData.append("financialCode", financialCode.toUpperCase());
		formData.append("branchName", ($('#Branch').val() || '').toUpperCase());
		formData.append("oldPosition", ($('#oldPosition').val() || '').toUpperCase());
		formData.append("newPosition", newPosition.toUpperCase());
		formData.append("promotionDate", promotionDate);
		formData.append("seniorCode", seniorCode.toUpperCase());
		formData.append("seniorName", ($('#newseniorname').val() || '').toUpperCase());
		formData.append("seniorPosition", ($('#newseniorposition').val() || '').toUpperCase());

		$.ajax({
			url: "api/financialconsultant/saveOrUpdatePromotionData",
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			success: function(response) {
				alert(response.message ? response.message.toUpperCase() : "PROMOTION SAVED AND CONSULTANT POSITION UPDATED SUCCESSFULLY.");
				loadPromotionTable();
			},
			error: function(xhr) {
				console.error("ERROR:", xhr.responseText);
				alert("SOMETHING WENT WRONG WHILE SAVING PROMOTION: " + (xhr.responseJSON && xhr.responseJSON.message ? xhr.responseJSON.message.toUpperCase() : "FAILED"));
			}
		});
	});

	// Load promotion history table
	loadPromotionTable();

	function loadPromotionTable() {
		$.ajax({
			url: "api/financialconsultant/getAllPromotionManagementDetails",
			type: "POST",
			contentType: "application/json",
			success: function(response) {
				if (response.status === "OK" && response.data && response.data.length > 0) {
					var tbody = $(".datatable tbody");
					tbody.empty();
					$.each(response.data, function(index, item) {
						var row = `
	                        <tr style="font-family: 'Poppins', sans-serif;">
	                            <td>${index + 1}</td>
	                            <td><strong>${item.financialCode || ''}</strong></td>
	                            <td>${(item.branchName || '').toUpperCase()}</td>
	                            <td>${(item.oldPosition || '').toUpperCase()}</td>
	                            <td><span class="badge bg-success text-white">${(item.newPosition || '').toUpperCase()}</span></td>
	                            <td>${item.promotionDate || ''}</td>
	                            <td>${(item.seniorCode || '').toUpperCase()}</td>
	                            <td>${(item.seniorName || '').toUpperCase()}</td>
	                            <td>${(item.seniorPosition || '').toUpperCase()}</td>
	                        </tr>`;
						tbody.append(row);
					});
				} else {
					$(".datatable tbody").html(`<tr><td colspan="9" class="text-center">NO PROMOTION RECORDS AVAILABLE</td></tr>`);
				}
			},
			error: function(xhr, status, error) {
				console.error("ERROR FETCHING PROMOTION RECORDS:", error);
				alert("FAILED TO LOAD PROMOTION MANAGEMENT DATA.");
			}
		});
	}

});
