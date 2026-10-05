$(document).ready(function() {
	$("#financialCode").blur(function() {
		let financialCode = $(this).val().trim().toUpperCase();

		if (financialCode) {
			$.ajax({
				url: 'api/financialconsultant/getfinancialHierarchyByFinancialCode',
				type: 'GET',
				data: { financialCode: financialCode },
				success: function(response) {
					if (response.status === 'OK') {
						let data = response.data[0]; // taking the first consultant from list

						// Bind data to your form fields
						$('#financialName').val(data.financialName);
						$('#selectPosition').val(data.selectPosition);

					} else {
						alert("No data found for the given Financial Code.");
						clearFields(); // Optional: Clear form fields if no data
					}
				},
				error: function(xhr, status, error) {
					alert("Error: " + xhr.responseJSON.message || "Something went wrong.");
					clearFields();
				}
			});
		}

	});
});




$(document).ready(function () {
    $("#searchBtn").click(function () {
        let financialCode1 = $('#financialCode').val().trim().toUpperCase();

        if (financialCode1) {
            $.ajax({
                url: 'api/financialconsultant/getfinancialHierarchyByFinancialCode',
                type: 'GET',
                data: { financialCode: financialCode1 },
                success: function (response) {
                    if (response.status === 'OK' && response.data.length > 0) {
                        let tableBody = '';
                        response.data.forEach(function (item, index) {
                            tableBody += `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${item.financialName || ''}</td>
                                    <td>${item.financialCode || ''}</td>
                                    <td>${item.contactNo || ''}</td>
                                    <td>${item.joiningDate || ''}</td>
                                    <td>${item.address || ''}</td>
                                    <td>${item.branchName || ''}</td>
                                    <td>${item.financialStatus ==0 ? 'Active' : 'Inactive'}</td>
                                </tr>
                            `;
                        });
                        $(".datatable tbody").html(tableBody);
                    } else {
                        $(".datatable tbody").html(`<tr><td colspan="8" class="text-center text-danger">No data found for this Financial Code.</td></tr>`);
                    }
                },
                error: function (xhr) {
                    $(".datatable tbody").html(`<tr><td colspan="8" class="text-center text-danger">Error fetching data.</td></tr>`);
                }
            });
        } else {
            alert("Please enter a Financial Code.");
        }
    });
});
