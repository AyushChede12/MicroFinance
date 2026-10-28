// Customer Account No. list fetch & initialization
$(document).ready(function() {
	// Set default closing date to today
	if (!$('#closingDate').val()) {
		$('#closingDate').val(new Date().toISOString().split('T')[0]);
	}

	// Fetch approved savings accounts
	$.ajax({
		url: "api/reports/getApprovedSavingAccount",
		type: "GET",
		success: function(response) {
			var dropdown1 = $('#accountNumber');
			dropdown1.empty();
			dropdown1.append('<option value="">--SELECT ACCOUNT NO--</option>');

			if (response.status === "OK" && response.data) {
				$.each(response.data, function(index, item) {
					dropdown1.append('<option value="' + item.accountNumber + '">' + item.accountNumber + '</option>');
				});
			} else {
				dropdown1.append('<option value="">No Account Number found</option>');
			}
		},
		error: function() {
			console.warn("Failed to fetch approved accounts.");
		}
	});

	// Load branches into closingbranchName
	$.ajax({
		url: "api/preference/getAllBranchModule",
		type: "GET",
		success: function(res) {
			const branches = (res && res.data) ? res.data : (Array.isArray(res) ? res : []);
			const $sel = $('#closingbranchName');
			$sel.empty().append('<option value="">-- SELECT CLOSING BRANCH --</option>');
			branches.forEach(function(b) {
				const bName = b.branchName || b;
				if (bName) {
					$sel.append('<option value="' + bName.toString().toUpperCase() + '">' + bName.toString().toUpperCase() + '</option>');
				}
			});
		},
		error: function() {
			console.warn("Could not load branch modules list.");
		}
	});
});

// Fetch data by account no.
$('#accountNumber').on('change', function() {
	let accountNumber = ($(this).val() || '').trim();

	if (accountNumber !== "") {
		$.ajax({
			url: 'api/customersavings/getallbyaccountnumber',
			type: 'GET',
			data: { accountNumber: accountNumber },
			success: function(response) {
				if (response.data && response.data.length > 0) {
					let customer = response.data[0];
					$('#customerCode').val(customer.selectByCustomer || '');
					$('#customerName').val((customer.enterCustomerName || '').toUpperCase());
					$('#contactNumber').val(customer.contactNumber || '');
					$('#branchName').val(customer.branchName || '');
					if ($('#closingbranchName').val() === '') {
						$('#closingbranchName').val(customer.branchName || '');
					}
					$('#openingDate').val(customer.openingDate || '');
					$('#currentBalance').val(customer.balance || '0.00');

					// photo
					if (customer.photo) {
						const imagePath = `Uploads/${customer.photo}`;
						document.getElementById("photo").src = imagePath;
						document.getElementById("photoHidden").value = customer.photo;
					} else {
						document.getElementById("photo").src = 'Uploads/upload.jpg';
						document.getElementById("photoHidden").value = '';
					}

					// signature
					if (customer.signature) {
						const imagePath = `Uploads/${customer.signature}`;
						document.getElementById("signature").src = imagePath;
						document.getElementById("signatureHidden").value = customer.signature;
					} else {
						document.getElementById("signature").src = 'Uploads/upload.jpg';
						document.getElementById("signatureHidden").value = '';
					}
				} else {
					alert('NO ACCOUNT DETAILS FOUND FOR ' + accountNumber);
					clearCloserFields();
				}
			},
			error: function() {
				alert('ERROR WHILE FETCHING ACCOUNT DATA!');
				clearCloserFields();
			}
		});
	} else {
		clearCloserFields();
	}
});

function clearCloserFields() {
	$('#customerCode, #customerName, #contactNumber, #branchName, #openingDate, #currentBalance').val('');
	const photoElem = document.getElementById("photo");
	if (photoElem) photoElem.src = 'Uploads/upload.jpg';
	const sigElem = document.getElementById("signature");
	if (sigElem) sigElem.src = 'Uploads/upload.jpg';
	const photoH = document.getElementById("photoHidden");
	if (photoH) photoH.value = '';
	const sigH = document.getElementById("signatureHidden");
	if (sigH) sigH.value = '';
}

// Save Acc Closer Data
$('#saveAccountCloseBtn').click(function(event) {
	event.preventDefault();

	const accNo = ($('#accountNumber').val() || '').trim();
	if (!accNo) {
		alert("PLEASE SELECT AN ACCOUNT NUMBER TO CLOSE.");
		return;
	}

	const payBy = ($('#payBy').val() || '').trim();
	if (!payBy) {
		alert("PLEASE SELECT PAYMENT MODE FOR CLOSURE SETTLEMENT PAYOUT.");
		return;
	}

	const closingDate = $('#closingDate').val() || new Date().toISOString().split('T')[0];
	const effectiveBranch = $('#closingbranchName').val() || $('#branchName').val() || '';

	let updatedImageSrc = $('#photo').attr('src') || '';
	let updatedImageName = updatedImageSrc.split('/').pop();

	let updatedImageSrc1 = $('#signature').attr('src') || '';
	let updatedImageName1 = updatedImageSrc1.split('/').pop();

	let data = {
		accountNumber: accNo,
		customerCode: ($('#customerCode').val() || '').trim(),
		customerName: ($('#customerName').val() || '').trim().toUpperCase(),
		contactNumber: ($('#contactNumber').val() || '').trim(),
		branchName: effectiveBranch,
		openingDate: $('#openingDate').val(),
		currentBalance: $('#currentBalance').val() || '0.00',
		closingDate: closingDate,
		payBy: payBy,
		comments: ($('#comments').val() || '').trim(),
		photo: updatedImageName,
		signature: updatedImageName1
	};

	if (!confirm("ARE YOU SURE YOU WANT TO CLOSE ACCOUNT " + accNo + "? THIS WILL SETTLE BALANCE AND MARK ACCOUNT INACTIVE.")) {
		return;
	}

	const $btn = $('#saveAccountCloseBtn');
	$btn.prop('disabled', true).text('CLOSING ACCOUNT...');

	$.ajax({
		type: 'POST',
		url: 'api/customersavings/saveAccountCloseInfo',
		data: JSON.stringify(data),
		contentType: 'application/json',
		success: function(response) {
			alert("SUCCESSFULLY CLOSED SAVING ACCOUNT " + accNo + "!");
			location.reload();
		},
		error: function(xhr) {
			$btn.prop('disabled', false).text('CLOSE ACCOUNT');
			console.error("Error: ", xhr.responseText);
			alert('AN ERROR OCCURRED WHILE CLOSING ACCOUNT: ' + (xhr.responseText || 'UNKNOWN ERROR'));
		}
	});
});