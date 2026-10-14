//JANVI : CUSTOMER ACCOUNT NO. LIST FETCH
$(document).ready(function() {
	$.ajax({
		url: "api/reports/getApprovedSavingAccount",
		type: "GET",
		success: function(response) {
			console.log("API RESPONSE:", response);
			var dropdown1 = $('#accountNumber');
			dropdown1.empty();
			dropdown1.append('<option value="">--SELECT ACCOUNT NO--</option>');

			if (response.status === "OK" && response.data) {
				$.each(response.data, function(index, item) {
					dropdown1.append('<option value="' + item.accountNumber + '">' + item.accountNumber + '</option>');
				});
			} else {
				dropdown1.append('<option value="">NO ACCOUNT NUMBER FOUND</option>');
			}
		},
		error: function() {
			alert("FAILED TO FETCH POLICYNAME.");
		}
	});
});

//JANVI : FETCH DATA BY ACCOUNT NO.
$('#accountNumber').on('change', function() {
	let accountNumber = $(this).val();

	if (accountNumber !== "") {
		$.ajax({
			url: 'api/customersavings/getallbyaccountnumber', // PASS AS QUERY PARAM
			type: 'GET',
			data: { accountNumber: accountNumber },
			success: function(response) {
				if (response.data && response.data.length > 0) {
					let customer = response.data[0];
					$('#customerCode').val(customer.selectByCustomer);
					$('#customerName').val(customer.enterCustomerName);
					$('#contactNumber').val(customer.contactNumber);
					$('#branchName').val(customer.branchName);
					$('#openingDate').val(customer.openingDate);
					$('#currentBalance').val(customer.balance);
					//PHOTO
					if (customer.photo) {
						const imagePath = `Uploads/${customer.photo}`; // CONSTRUCT FULL IMAGE PATH
						document.getElementById("photo").src = imagePath; // SET IMAGE SOURCE
						document.getElementById("photoHidden").value = customer.photo; // SET HIDDEN INPUT VALUE
					} else {
						document.getElementById("photo").src = 'Uploads/upload.jpg'; // DEFAULT PLACEHOLDER
						document.getElementById("photoHidden").value = ''; // CLEAR HIDDEN INPUT VALUE
					}
					//SIGNATURE
					if (customer.signature) {
						const imagePath = `Uploads/${customer.signature}`; // CONSTRUCT FULL IMAGE PATH
						document.getElementById("signature").src = imagePath; // SET IMAGE SOURCE
						document.getElementById("signatureHidden").value = customer.signature; // SET HIDDEN INPUT VALUE
					} else {
						document.getElementById("signature").src = 'Uploads/upload.jpg'; // DEFAULT PLACEHOLDER
						document.getElementById("signatureHidden").value = ''; // CLEAR HIDDEN INPUT VALUE
					}
				} else {
					alert('NO DATA FOUND!');
					$('#customerCode').val('');
				}
			},
			error: function() {
				alert('ERROR WHILE FETCHING DATA!');
				$('#customerCode').val('');
			}
		});
	} else {
		$('#customerCode').val('');
	}
});

//JANVI : SAVE ACC CLOSER DATA
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
			alert("SUCCESSFULLY CLOSED SAVING ACCOUNT!");
			location.reload();
		},
		error: function(xhr) {
			console.error("ERROR: ", xhr.responseText);
			alert('AN ERROR OCCURRED. PLEASE TRY AGAIN.');
		}
	});
});