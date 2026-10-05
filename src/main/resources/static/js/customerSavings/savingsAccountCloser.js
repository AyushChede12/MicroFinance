//janvi : Customer Account No. list fetch
$(document).ready(function() {
    $.ajax({
        url: "api/reports/getApprovedSavingAccount",
        type: "GET",
        success: function(response) {
			console.log("API response:", response);
            var dropdown1 = $('#accountNumber');
            dropdown1.empty();
            dropdown1.append('<option value="">--SELECT ACCOUNT NO--</option>');


            if (response.status === "OK" && response.data) {
                $.each(response.data, function(index, item) {
                   dropdown1.append('<option value="' + item.accountNumber+ '">' + item.accountNumber + '</option>');
                });
            } else {
                dropdown1.append('<option value="">No Account Number found</option>');
            }
        },
        error: function() {
            alert("Failed to fetch Policyname.");
        }
    });
});

//Janvi : fetch data by account no.
$('#accountNumber').on('change', function () {
    let accountNumber = $(this).val();

    if (accountNumber !== "") {
        $.ajax({
            url: 'api/customersavings/getallbyaccountnumber', // Pass as query param
            type: 'GET',
            data: { accountNumber: accountNumber },
            success: function (response) {
                if (response.data && response.data.length > 0) {
                    let customer = response.data[0];
                    $('#customerCode').val(customer.selectByCustomer);
                    $('#customerName').val(customer.enterCustomerName);
					$('#contactNumber').val(customer.contactNumber);
					$('#branchName').val(customer.branchName);
					$('#openingDate').val(customer.openingDate);
					$('#currentBalance').val(customer.balance);
					//photo
                    if (customer.photo) {
						const imagePath = `Uploads/${customer.photo}`; // Construct full image path
						document.getElementById("photo").src = imagePath; // Set image source
						document.getElementById("photoHidden").value = customer.photo; // Set hidden input value
					} else {
						document.getElementById("photo").src = 'Uploads/upload.jpg'; // Default placeholder
						document.getElementById("photoHidden").value = ''; // Clear hidden input value
					}
					//signature
					if (customer.signature) {
						const imagePath = `Uploads/${customer.signature}`; // Construct full image path
						document.getElementById("signature").src = imagePath; // Set image source
						document.getElementById("signatureHidden").value = customer.signature; // Set hidden input value
					} else {
						document.getElementById("signature").src = 'Uploads/upload.jpg'; // Default placeholder
						document.getElementById("signatureHidden").value = ''; // Clear hidden input value
					}
                } else {
                    alert('No data found!');
                    $('#customerCode').val('');
                }
            },
            error: function () {
                alert('Error while fetching data!');
                $('#customerCode').val('');
            }
        });
    } else {
        $('#customerCode').val('');
    }
});

//janvi : Save Acc Closer Data
$('#saveAccountCloseBtn').click(function(event) {
    event.preventDefault();

    let updatedImageSrc = $('#photo').attr('src');
    let updatedImageName = updatedImageSrc.split('/').pop(); 
    
    let updatedImageSrc1 = $('#signature').attr('src');
    let updatedImageName1 = updatedImageSrc1.split('/').pop(); 

    let data = {
        accountNumber: $('#accountNumber').val(),
        customerCode: $('#customerCode').val(),
        customerName: $('#customerName').val(),
        contactNumber: $('#contactNumber').val(),
        branchName: $('#branchName').val(),
        openingDate: $('#openingDate').val(),
        currentBalance: $('#currentBalance').val(),
        closingDate: $('#closingDate').val(),
        payBy: $('#payBy').val(),
        comments: $('#comments').val(),       
        photo: updatedImageName,
        signature: updatedImageName1
    };

    $.ajax({
        type: 'POST',
        url: 'api/customersavings/saveAccountCloseInfo',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(response) {
            alert("Successfully closed Saving Account!");
            location.reload();
        },
        error: function(xhr) {
            console.error("Error: ", xhr.responseText);
            alert('An error occurred. Please try again.');
        }
    });
});
