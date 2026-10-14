$(document).ready(function() {
    $.ajax({
        url: "api/joinliability/viewgrouploans",
        type: "GET",
        success: function(response) {
            console.log("API response:", response);
            var dropdown1 = $('#groupcode');
            dropdown1.empty();
            dropdown1.append('<option value="">SELECT</option>');

            if (response.status === "OK" && response.data) {
                $.each(response.data, function(index, customer) {
                    dropdown1.append('<option value="' + customer.groupCode + '">' + customer.groupCode + '</option>');
                });
            } else {
                dropdown1.append('<option value="">NO GROUPS FOUND</option>');
            }
        },
        error: function() {
            alert("FAILED TO FETCH GROUP LIST.");
        }
    });

    $('#groupcode').on('change', function() {
        let selectedCode = $(this).val();

        if (selectedCode !== "") {
            $.ajax({
                url: 'api/joinliability/fetchByGroupCode',
                type: 'GET',
                data: { groupCode: selectedCode },
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
                            $('#approvalStatus').val("APPROVED").css('color', 'green');
                        } else {
                            $('#approvalStatus').val("NOT APPROVED").css('color', 'red');
                        }

                    } else {
                        alert('NO CUSTOMER DATA FOUND!');
                        clearFields();
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Error:', xhr.responseText);
                    alert('ERROR WHILE FETCHING CUSTOMER DATA!');
                    clearFields();
                }
            });
        }
    });

    $('#approveBtn').click(function(event) {
        event.preventDefault();

        const groupCode = $('#groupcode').val();
        const approvalDate = $('#approvalDate').val();

        const requestData = {
            groupCode: groupCode,
            approvalStatus: true,
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
                alert("ERROR: " + xhr.responseText);
            }
        });
    });
});