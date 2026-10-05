$(document).ready(function() {
	$.ajax({
		url: "api/joinliability/viewgrouploans",
		type: "GET",
		success: function(response) {
			console.log("API response:", response);
			var dropdown1 = $('#groupcode');
			dropdown1.empty();
			dropdown1.append('<option value="">Select</option>');

			if (response.status === "OK" && response.data) {
				$.each(response.data, function(index, customer) {
					dropdown1.append('<option value="' + customer.groupCode + '">' + customer.groupCode + '</option>');
				});
			} else {
				dropdown1.append('<option value="">No groups found</option>');
			}
		},
		error: function() {
			alert("Failed to fetch group list.");
		}
	});
$('#groupcode').on('change', function() {
    let selectedCode = $(this).val();

    if (selectedCode !== "") {
        $.ajax({
            url: 'api/joinliability/fetchByGroupCode',  // ✅ no query here
            type: 'GET', // ✅ Use GET since we are fetching data
            data: { groupCode: selectedCode }, // ✅ send param properly
            success: function(response) {
                if (response.status === "FOUND" && response.data && response.data.length > 0) {
                    let customer = response.data[0];

                    $('#openingDate').val(customer.openingDate || '');
                    $('#communityName').val(customer.communityName || '');
                    $('#allocatedStaff').val(customer.allocatedStaff || '');
                    $('#branchName').val(customer.branchName || '');
                    $('#collectionDays').val(customer.collectionDays || '');
                    $('#contactNumber').val(customer.contactNumber || '');
                    $('#purposeOfLoan').val(customer.loanPurpose || '');
                    $('#dateOfApproval').val(customer.approvalDate || '');

                    if (customer.approvalStatus === true || customer.approvalStatus === 1 || customer.approvalStatus === "1") {
                        $('#approvalStatus').val("Approved").css('color', 'green');
                    } else {
                        $('#approvalStatus').val("Not Approved").css('color', 'red');
                    }

                } else {
                    alert('No customer data found!');
                    clearFields();
                }
            },
            error: function(xhr, status, error) {
                console.error('Error:', xhr.responseText);
                alert('Error while fetching customer data!');
                clearFields();
            }
        });
    }
});



	$('#approveBtn').click(function(event) {
		event.preventDefault(); // Prevent the form from submitting

		const groupCode = $('#groupcode').val(); // match backend field name
		const approvalDate = $('#approvalDate').val();

		const requestData = {
			groupCode: groupCode,          // ✅ fixed: must match backend
			approvalStatus: true,          // not required, service sets it
			approvalDate: approvalDate
		};

		$.ajax({
			type: "POST",
			url: "api/joinliability/approveGroupLoan",
			contentType: "application/json",
			data: JSON.stringify(requestData),
			success: function(response) {
				alert(response.message);
				location.reload();
			},
			error: function(xhr) {
				alert("Error: " + xhr.responseText);
			}
		});
	});



});