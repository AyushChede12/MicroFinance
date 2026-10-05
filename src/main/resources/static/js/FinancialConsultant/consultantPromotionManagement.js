$(document).ready(function() {
	$.ajax({
		url: "api/financialconsultant/getAllFinancialConsultantDetails",
		type: "POST",
		success: function(response) {
			if (response && response.data) {
				// Find first entry where selectPosition is MANAGER
				const manager = response.data.find(item => item.selectPosition === "MANAGER");

				if (manager) {
					$('#newseniorCode').val(manager.financialCode);
					$('#newseniorname').val(manager.financialName);
					$('#newseniorposition').val(manager.selectPosition); // Always "MANAGER"
				} else {
					alert("No manager found.");
				}
			}
		},
		error: function() {
			alert("Error fetching data.");
		}
	});
	
	$.ajax({
	    url: "api/financialconsultant/getAllFinancialConsultantDetails",
	    type: 'POST',
	    contentType: 'application/json',
	    success: function(response) {
	        const data = response.data;
	        const $dropdown = $('#financialCode');

	        // Clear existing options
	        $dropdown.empty().append('<option value="">Select Code</option>');

	        // Populate dropdown with code-name (excluding MANAGERs)
	        data.forEach(function(item) {
	            if (item.selectPosition && item.selectPosition.toUpperCase() !== 'MANAGER') {
	                const displayText = item.financialCode + ' - ' + item.financialName;
	                $dropdown.append('<option value="' + item.financialCode + '">' + displayText + '</option>');
	            }
	        });

	        // Listen for selection
	        $dropdown.on('change', function () {
	            const selectedCode = $(this).val();
	            const selectedItem = data.find(item => item.financialCode === selectedCode);

	            if (selectedItem) {
					$('#id').val(selectedItem.id || '');
	                $('#Branch').val(selectedItem.branchName || '');
	                $('#oldPosition').val(selectedItem.selectPosition || '');
	            } else {
	                $('#Branch').val('');
	                $('#oldPosition').val('');
	            }
	        });
	    },
	    error: function(xhr, status, error) {
	        console.error("Error fetching data:", error);
	    }
	});

	
	
	$('#updateBtn').click(function (e) {
	    e.preventDefault();

	    // Create formData object to send as multipart/form-data
	    let formData = new FormData();

	    // Append consultant ID
	    formData.append("id", $('#id').val());

	    // Append promotion fields
	    formData.append("financialCode", $('#financialCode').val());
	    formData.append("branchName", $('#Branch').val());
	    formData.append("oldPosition", $('#oldPosition').val());
	    formData.append("newPosition", $('#newPosition').val());
	    formData.append("promotionDate", $('#promotionDate').val());
	    formData.append("seniorCode", $('#newseniorCode').val());
	    formData.append("seniorName", $('#newseniorname').val());
	    formData.append("seniorPosition", $('#newseniorposition').val());

	    $.ajax({
	        url: "api/financialconsultant/saveOrUpdatePromotionData",
	        type: "POST",
	        data: formData,
	        processData: false,  // Don't process as query string
	        contentType: false,  // Let browser set correct content-type (multipart/form-data)
	        success: function (response) {
	            alert(response.message); // Or show success toast
	            // Optionally reset form or refresh data
	        },
	        error: function (xhr) {
	            console.error("Error:", xhr.responseText);
	            alert("Something went wrong while saving promotion.");
	        }
	    });
	});

	$.ajax({
			url: "api/financialconsultant/getAllPromotionManagementDetails",
			type: "POST",
			contentType: "application/json",
			success: function(response) {
				if (response.status === "OK" && response.data.length > 0) {
					var tbody = $(".datatable tbody");
					tbody.empty();
					$.each(response.data, function(index, item) {
						var row = `
							<tr style="font-family: 'Poppins', sans-serif;">
								<td>${index + 1}</td>
								<td>${item.financialCode || ''}</td>
								<td>${item.branchName || ''}</td>
								<td>${item.oldPosition || ''}</td>
								<td>${item.newPosition || ''}</td>
								<td>${item.promotionDate || ''}</td>
								<td>${item.seniorCode || ''}</td>
								<td>${item.seniorPosition || ''}</td>
							</tr>`;
						tbody.append(row);
					});
				} else {
					$(".datatable tbody").html(`<tr><td colspan="11" class="text-center">No data available</td></tr>`);
				}
			},
			error: function(xhr, status, error) {
				console.error("Error fetching financial consultants:", error);
				alert("Failed to load Promotion Management data.");
			}
		});
});

