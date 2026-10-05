// JS for fetching the account number on the dropdown according to the account type (vaibhav)
$(document).ready(function() {
	$("#accountType").on("change", function() {
		const selectedType = $(this).val();

		if (selectedType) {
			fetchAccountNumbers(selectedType);
		} else {
			// Clear dropdown if no type is selected
			$("#accountNumber").empty().append('<option value="">-- Select Account Number --</option>');
		}
	});
});

//janvi : fetch account numbers on dropdown
function fetchAccountNumbers(accountType) {
	$.ajax({
		type: "GET",
		url: "api/customersavings/fetchAccountNumbers",
		data: { accountType: accountType },
		success: function(response) {
			const $dropdown = $("#accountNumber");
			$dropdown.empty().append('<option value="">--SELECT ACCOUNT NO--</option>');

			if (response.status === "OK" && Array.isArray(response.data)) {
				response.data.forEach(function(accNo) {
					$dropdown.append(`<option value="${accNo}">${accNo}</option>`);
				});
			} else {
				alert("No account numbers found for selected type.");
			}
		},
		error: function(xhr) {
			alert("Error fetching account numbers: " + xhr.responseText);
		}
	});
}



// Js for fetching the data on the tabel according to account number (All transactions)
$(document).ready(function() {
	$('#btnTransactionPageOnSavingPassbook').click(function() {
		let accountNumber = $("#accountNumber").val().trim(); // correct fetch

		if (accountNumber !== "") {
			$.ajax({
				type: "GET",
				url: "api/customersavings/getsavingaccountactivity",
				data: { accountNumber: accountNumber },
				success: function(response) {
					console.log("API Response:", response);

					if (response.status && response.status.toUpperCase() === "OK") {
						let data = response.data;
						let tableBody = $("#tableBody1"); // correct tbody ID
						tableBody.empty();

						if (data.length > 0) {
							$('#TransactionSection').show(); // show the hidden div

							data.forEach((item, index) => {
								let row = `<tr>
                                <td>${item.transactionDate || ''}</td>
                                <td>${item.accountNumber || ''}</td>
                                <td>${item.transactionType || ''}</td>
                                <td>${item.transactionAmount || ''}</td>
                                <td>${item.averageBalance || ''}</td>                                   
                                </tr>`;
								tableBody.append(row);
							});
							$("#tableSection").hide();
							$('#printbtnSection').show();
							$('#passbookSection').hide();
							$("#headingSection").hide();
							$("#TransactionSection").show();
						} else {
							alert("No transactions found.");
							$('#TransactionSection').hide();
						}
					} else {
						alert("No transactions found.");
						$('#TransactionSection').hide();
					}
				},

			});
		} else {
			alert("Please select an Account Number.");
			$('#TransactionSection').hide();
		}
	});
});


//janvi: Show saving acc details in table format
function displayTransactionDataList() {
	// const accountNumber = $(this).val();
	let accountNumber = document.getElementById("accountNumber").value; // Get the selected Account No.
	// $("#tabl").show();
	if (!accountNumber) {
		alert("Please select an Account Number.");
		return;
	}
	if (accountNumber !== "") {
		$.ajax({
			type: "GET",
			url: "api/customersavings/getDataByAccountNumber",
			data: { accountNumber: accountNumber },
			success: function(response) {
				if (response.status === "OK" && response.data) {
					const data = response.data;
					let branch = "";

					if (data.branchName != null) {
						branch = data.branchName.branchName || "";
					}

					// Inject table row dynamically
					$("#customerDetails").html(`
                            <tr>
                                <td>${data.id || ''}</td>
                                <td>${branch || ''}</td>
                                <td>${data.accountNumber || ''}</td>
                                <td>${(data.enterCustomerName || '').toUpperCase()}</td>
                                <td>${data.selectByCustomer || ''}</td>
                                <td>${data.contactNumber || ''}</td>
                                <td>${(data.address || '').toUpperCase()}</td>
                                <td>${data.openingDate || ''}</td>
                                <td>${data.balance || ''}</td>
                                <td></td>
                            </tr>
                        `);
					$("#tableSection").show();
					$('#printbtnSection').hide();
					$('#passbookSection').hide();
					$("#headingSection").hide();
					$("#TransactionSection").hide();
				} else {
					alert("No data found for this account.");
					$("#customerDetails").empty();
				}
			},
			error: function(xhr) {
				alert("Error: " + xhr.responseText);
				$("#customerDetails").empty();
			}
		});
	} else {
		$("#customerDetails").empty(); // Clear if no account selected
	}
}


function displaySavingfrontPage() {
	let accountNumber = document.getElementById("accountNumber").value;

	if (!accountNumber) {
		alert("Please select an account number!");
		return;
	}

	$.ajax({
		type: "GET",
		url: "api/customersavings/getDataByAccountNumber",
		data: { accountNumber: accountNumber },  // 🔥 make sure name matches @RequestParam
		success: function(response) {
			if (response.status === "OK" && response.data) {
				const data = response.data;
				let branch = "";

				if (data.branchName != null) {
					branch = data.branchName.branchName || "";
				}
				let fullAddress = `${data.address}, ${data.state}, ${data.pinCode}`;

				$("#customerNo").text(data.selectByCustomer);
				$("#accountNo").text(data.accountNumber);
				$("#customerName").text(data.enterCustomerName.toUpperCase());
				$("#familyDetails").text(data.familyDetails);
				$("#dateOfBirth").text(data.dateOfBirth);
				$("#contactNo").text(data.contactNumber);
				$("#emailId").text(data.emailId.toUpperCase());
				$("#operationType").text(data.operationType.toUpperCase());
				$("#aadharNo").text(data.aadharNo);
				$("#address").text(fullAddress.toUpperCase());
				$("#dateOfIssue").text(data.openingDate);
				$("#typeofaccount").text(data.typeofaccount.toUpperCase());
				$("#branchName").text(branch.toUpperCase());

				// If you have these fields in your data, else remove
				$("#IFSCCode").text(data.ifscCode || '');
				//$("#dateOfIssue").text(data.dateOfIssue || '');
				$("#nominationStatus").text(data.nominationStatus || '');
				$("#nominationName").text(data.nominationName || '');
				$("#upi").text(data.upi || '');
				$("#tableSection").hide();
				$('#printbtnSection').show();
				$('#passbookSection').show();
				$("#headingSection").hide();
				$("#TransactionSection").hide();

			} else {
				alert("No account data found.");
			}
		},
		error: function(xhr) {
			alert("Error fetching data: " + (xhr.responseJSON?.error || xhr.statusText));
		}
	});
}

//Janvi : Print Button
// print Code
/*$("#printBtn").on("click", function (e) {
		e.preventDefault();

		// Clone the form
		const $formClone = $("#passbookId").clone();

		// Optional: remove any row that holds the buttons
		$formClone.find(".text-center").each(function () {
			if ($(this).find("button").length > 0) {
				$(this).remove();
			}
		});

		// Open print window
		const printWindow = window.open("", "_blank");

		if (printWindow) {
			printWindow.document.open();
			printWindow.document.write(`
				<html>
				<head>
					<title>Print - Customer Form</title>
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">
					<style>
						body {
							font-family: Arial, sans-serif;
							padding: 20px;
						}
						.formFields {
							margin-bottom: 15px;
						}
						label {
							font-weight: bold;
						}
						input, select, textarea {
							border: 1px solid #ccc;
							border-radius: 5px;
							padding: 5px;
							width: 100%;
						}
						.toggle {
							pointer-events: none;
						}
					</style>
				</head>
				<body onload="window.print(); window.close();">
					<h3 class="text-center mb-4">Customer Information</h3>
					${$formClone[0].outerHTML}
				</body>
				</html>
			`);
			printWindow.document.close();
		} else {
			alert("Popup blocked. Please allow popups for this website.");
		}
	});*/

function displayHeadingSA() {
	$("#tableSection").hide();
	$('#printbtnSection').show();
	$('#passbookSection').hide();
	$("#headingSection").show();
	$("#TransactionSection").hide();
}

//janvi : print button code
function printTransactionSection1() {
	let visibleSection = null;

	if ($("#passbookSection").is(":visible")) {
		visibleSection = document.getElementById("passbookSection");
	} else if ($("#TransactionSection").is(":visible")) {
		visibleSection = document.getElementById("TransactionSection");
	}
	else if ($("#headingSection").is(":visible")) {
		visibleSection = document.getElementById("headingSection");
	} else {
		alert("No section visible to print.");
		return;
	}

	const printWindow = window.open('', '', 'width=1000,height=800');

	printWindow.document.write(`
        <html>
        <head>
            <title>Print Page</title>
            <!-- Include your main CSS and Bootstrap -->
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
            <style>
                body {
                    margin: 20px;
                    font-family: Arial, sans-serif;
                }
                .card {
                    box-shadow: none !important;
                    border: 1px solid #ccc;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #000;
                    padding: 6px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            ${visibleSection.outerHTML}
        </body>
        </html>
    `);

	printWindow.document.close();

	printWindow.onload = function() {
		setTimeout(() => {
			printWindow.print();
			printWindow.close();
		}, 500); // wait for styles to apply
	};
}

