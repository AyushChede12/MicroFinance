/// Oshin Dongre 12-06-25


$(document).ready(function() {
	$("#fCustomer").hide();
	$("#availShare").hide();
	$("#updateBtn").hide();   // Hide update button initially
	$("#saveBtn").show();     // Show save button
});

function transferTypeFunc() {
	var tType = $("#transferType").val();
	if (tType == "C2C") {
		$("#fCustomer").show();
		$("#availShare").show();
		$("#pDetails").hide();
		$("#modeOfPayment").val("");
		$("#modeOfPayment").closest(".row").hide();
	}
	else {
		$("#fCustomer").hide();
		$("#availShare").hide();
		$("#pDetails").show();
		$("#modeOfPayment").closest(".row").show();
	}
}

// Customer List in Find By Code
$(document).ready(function() {
	/*  $.ajax({
		url: "api/customershareholdingcontroller/findAllCustomerCode", // make sure this endpoint returns customer list
		type: "GET",
		success: function(response) {
			console.log("API response:", response);
			var dropdown1 = $('#findByCode');
			dropdown1.empty();
			dropdown1.append('<option value="">SELECT</option>');
			var dropdown2 = $('#shareIssuedBy');
			dropdown2.empty();
			dropdown2.append('<option value="">SELECT</option>');


			if (response.status === "OK" && response.data) {
				$.each(response.data, function(index, customer) {
					dropdown1.append('<option value="' + customer.memberCode + '">' + customer.memberCode  + " - " + customer.customerName +'</option>');
					dropdown2.append('<option value="' + customer.memberCode + '">' + customer.memberCode  + " - " + customer.customerName +'</option>');

				});
			} else {
				dropdown1.append('<option value="">NO CUSTOMERS FOUND</option>');
				dropdown2.append('<option value="">NO CUSTOMERS FOUND</option>');

			}
		},
		error: function() {
			console.error("AJAX Error:", error);  // 🔍 Error logging
			alert("FAILED TO FETCH CUSTOMER LIST.");
		}
	});*/


	$(document).ready(function() {
		$.ajax({
			url: "api/customermanagement/approved",
			method: "GET",
			success: function(response) {
				if (response.status === "OK") {

					let dropdown = $("#findByCode");
					dropdown.empty(); // Clear old options
					dropdown.append(`<option value="">-- SELECT CUSTOMER --</option>`);

					response.data.forEach(function(item) {
						let fullName = [
							item.firstName,
							item.middleName,
							item.lastName
						].filter(Boolean).join(" ");

						let optionHtml = `
                            <option value="${item.memberCode}">
                                ${item.memberCode} - ${(fullName).toUpperCase()}
                            </option>
                        `;

						dropdown.append(optionHtml);
					});
				} else {
					console.warn("UNEXPECTED RESPONSE:", response);
				}
			},
			error: function(err) {
				console.error("ERROR FETCHING CUSTOMERS:", err);
			}
		});
	});
});

//Member Code fetch in Customer Name (@RequestParam)
$(document).ready(function() {
	$('#findByCode').on('change', function() {
		let selectedCode = $(this).val();

		if (selectedCode !== "") {
			$.ajax({
				url: 'api/customershareholdingcontroller/fetchByCustomerCode?memberCode=' + selectedCode, // ✅ send as query param
				type: 'POST',
				success: function(response) {
					if (response.status === "FOUND") {
						let customer = response.data[0];
						$('#customerName').val(customer.customerName);
						$('#startDate').val(customer.signupDate);
					} else {
						alert('NO CUSTOMER DATA FOUND!');
						$('#customerName').val('');
					}
				},
				error: function() {
					alert('ERROR WHILE FETCHING CUSTOMER DATA!');
				}
			});
		} else {
			$('#customerName').val('');
		}
	});
});


/*//Member Code fetch in Customer Name (@RequestBody)
$(document).ready(function () {
	$('#findByCode').on('change', function () {
		let selectedCode = $(this).val();

		if (selectedCode !== "") {
			$.ajax({
				url: 'api/customershareholdingcontroller/fetchByCustomerCode', // your endpoint
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({ memberCode: selectedCode }), // sending memberCode
				success: function (response) {
					if (response.status === "FOUND") {
						// Assuming one customer returned, use index 0
						let customer = response.data[0];
						$('#customerName').val(customer.customerName);
						$('#startDate').val(customer.signupDate);
						// You can fill other fields here if needed:
						// $('#previousShareCount').val(customer.previousShareCount);
					} else {
						alert('NO CUSTOMER DATA FOUND!');
						$('#customerName').val('');
					}
				},
				error: function () {
					alert('ERROR WHILE FETCHING CUSTOMER DATA!');
				}
			});
		} else {
			$('#customerName').val('');
		}
	});
});

*/
//Branch List in Branch Filed
$(document).ready(function() {
	//alert("BRANCH NAME");
	$.ajax({
		url: "api/customershareholdingcontroller/findAllBranch", // make sure this endpoint returns customer list
		type: "GET",
		success: function(response) {
			console.log("API response:", response);
			var dropdown = $('#branch');
			dropdown.empty();
			dropdown.append('<option value="">SELECT</option>');

			if (response.status === "FOUND" && response.data) {
				$.each(response.data, function(index, branch) {
					dropdown.append('<option value="' + branch.branchCode + '">' + branch.branchName + '</option>');

				});
			} else {
				dropdown.append('<option value="">NO BRANCH FOUND</option>');
			}
		},
		error: function() {
			alert("FAILED TO FETCH CUSTOMER LIST.");
		}
	});
});

//
/*$(document).ready(function() {
	//alert("WELCOME TO TRANSFER SHARE");
	$.ajax({
		url: "api/customershareholdingcontroller/findAllCustomerCode", // make sure this endpoint returns customer list
		type: "GET",
		success: function(response) {
			console.log("API response:", response);
			var dropdown = $('#modeOfPayment');
			dropdown.empty();
			dropdown.append('<option value="">SELECT</option>');

			if (response.status === "OK" && response.data) {
				$.each(response.data, function(index, customer) {
					console.log("Each customer item:", customer);
					dropdown.append('<option value="' + customer.memberCode + '">' + customer.paymentBy  + '</option>');

				});
			} else {
				dropdown.append('<option value="">NO PAYMENT MODE FOUND</option>');
			}
		},
		error: function() {
			console.error("AJAX Error:", error);  // Error logging
			alert("FAILED TO FETCH CUSTOMER LIST.");
	   }
});
});*/



// Save Code
$(document).ready(function() {
	TransferShareTable();
	$('#saveBtn').on('click', function(e) {
		e.preventDefault();
		// alert("oshin");

		const tranfershareData = {
			findByCode: $('#findByCode').val(),
			customerName: $('#customerName').val(),
			startDate: $('#startDate').val(),
			previousAccountBalance: $('#previousAccountBalance').val(),
			previousShareCount: $('#previousShareCount').val(),
			baseValue: $('#baseValue').val(),
			branch: $('#branch').val(),
			dateOfTransfer: $('#dateOfTransfer').val(),
			shareIssuedBy: $('#shareIssuedBy').val(),
			noOfShare: $('#noOfShare').val(),
			amountTransferred: $('#amountTransferred').val(),
			balanceShares: $('#balanceShares').val(),
			modeOfPayment: $('#modeOfPayment').val(),
			comments: $('#comments').val(),
			certificateNo: $('#certificateNo').val(),

		};

		console.log("SENDING:", tranfershareData);

		$.ajax({
			url: "api/customershareholdingcontroller/saveTransferShare",
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(tranfershareData),
			success: function(response) {
				console.log("✅ SUCCESS:", response);
				alert(response.message || "TRANSFERSHARE SAVED SUCCESSFULLY");
				alert("CERTIFICATE NO : " + tranfershareData.certificateNo);
				fetchLoanTable(); // agar defined hai
			},
			error: function(xhr, status, error) {
				console.error("❌ ERROR:", xhr.responseText);
				alert("SAVE FAILED. SERVER ERROR OR INCORRECT REQUEST.");
			}
		});
	});
});


// Show table code (view data in tables)
function TransferShareTable() {
	//alert("hill");

	$.ajax({
		url: "api/customershareholdingcontroller/allDataFetchTransferShareInTable", // ✅ FIXED: Added leading slash
		type: "GET",
		dataType: "json",
		success: function(response) {
			console.log("API Response:", response);

			let rows = "";

			// ✅ Check correct status and data
			if ((response.status === "OK" || response.status === "FOUND") && Array.isArray(response.data)) {
				response.data.forEach(function(share) {
					rows += `
                        <tr>
                            <td>${share.id}</td>
                            <td>${share.findByCode}</td>
                            <td>${share.customerName}</td>
                            <td>${share.startDate}</td>
                            <td>${share.branch}</td>
                            <td>${share.noOfShare}</td>
                            <td>${share.dateOfTransfer}</td>
                            <td>
                                <button class="iconbutton" onclick="EditTransfershare(${share.id})" title="VIEW">
                                    <i class="fa-solid fa-pen-to-square text-primary"></i>
                                </button>
                            </td>
                            <td>
                                <button class="iconbutton" onclick="deleteTransfershare(${share.id})" title="DELETE">
                                    <i class="fa-solid fa-trash text-danger"></i>
                                </button>
                            </td>
                        </tr>
                    `;
				});
			} else {
				rows = "<tr><td colspan='9'>NO DATA FOUND</td></tr>";
			}

			$("#transfersharetable").html(rows);
		},
		error: function(xhr, status, error) {
			console.error("AJAX Error:", xhr.status, xhr.responseText);
			alert("ERROR FETCHING DATA. STATUS: " + xhr.status);
		}
	});
}

/*// JS for saving and Updating the Group Plan
function saveOrUpdateLoanPlan() {
	const id = $("#id").val();

	const formData = {
		id: id !== "" ? parseInt(id) : null, // MUST include ID for update
		findByCode: $("#findByCode").val(),
		customerName: $("#customerName").val(),
		startDate: $("#startDate").val(),
		previousAccountBalance: $("#previousAccountBalance").val(),
		previousShareCount: $("#previousShareCount").val(),
		baseValue: $("#baseValue").val(),
		branch: $("#branch").val(),
		dateOfTransfer: $("#dateOfTransfer").val(),
		shareIssuedBy: $("#shareIssuedBy").val(),
		amountTransferred: $("#amountTransferred").val(),
		sharesCount: $("#sharesCount").val(),
		modeOfPayment: $("#modeOfPayment").val(),
		comments: $("#comments").val(),
		//planStatus: $("#planStatus").is(":checked"), // Boolean

	};

	$.ajax({
		type: "POST",
		url: "api/customershareholdingcontroller/saveandUpdateTransferShare",
		contentType: "application/json",
		dataType: "json",
		data: JSON.stringify(formData),
		success: function (response) {
			if (response.status === "OK") {
				alert(response.message);
				console.log("✅ RELOADING TABLE AFTER SAVE/UPDATE...");
				// TransferShareTable();
			} else {
				alert("ERROR: " + (response.message || "OPERATION FAILED"));
			}
		},
		error: function (xhr) {
			alert("ERROR: " + xhr.responseText);
		}
	});
}*/



//Edit Code in (view data in filed)
function EditTransfershare(id) {
	$("#updateBtn").show();
	$("#saveBtn").hide();
	//alert(id);
	$.ajax({
		url: "api/customershareholdingcontroller/getTransferShareIdEdite",
		type: "GET",
		data: { id: id }, // Send ID as query param
		success: function(response) {
			console.log("Response:", response);
			//alert(id);
			// ✅ Correct status check for your ApiResponse
			if (response.status === "OK") {
				const share = response.data;
				$('#id').val(id);
				$('#findByCode').val(share.findByCode);
				$('#customerName').val(share.customerName);
				$('#startDate').val(share.startDate);
				$('#previousAccountBalance').val(share.previousAccountBalance);
				$('#previousShareCount').val(share.previousShareCount);
				$('#baseValue').val(share.baseValue);
				$('#branch').val(share.branch);
				$('#dateOfTransfer').val(share.dateOfTransfer);
				$('#shareIssuedBy').val(share.shareIssuedBy);
				$('#noOfShare').val(share.noOfShare);
				$('#amountTransferred').val(share.amountTransferred);
				$('#balanceShares').val(share.balanceShares);
				$('#modeOfPayment').val(share.modeOfPayment);
				$('#comments').val(share.comments);
				//$('#certificateNo').val(share.certificateNo);

			} else {
				alert("TRANSFER SHARE NOT FOUND: " + response.message);
			}
		},
		error: function(xhr) {
			console.error("AJAX Error:", xhr.status, xhr.responseText);
			alert("ERROR FETCHING TRANSFER SHARE DETAILS: " + xhr.responseText);
		}
	});
}


//update Code
function updateShares() {

	// Get form data
	var transferData = {
		id: $("#id").val(),
		findByCode: $("#findByCode").val(),
		customerName: $("#customerName").val(),
		startDate: $("#startDate").val(),
		previousAccountBalance: $("#previousAccountBalance").val(),
		previousShareCount: $("#previousShareCount").val(),
		baseValue: $("#baseValue").val(),
		branch: $("#branch").val(),
		dateOfTransfer: $("#dateOfTransfer").val(),
		shareIssuedBy: $("#shareIssuedBy").val(),
		noOfShare: $("#noOfShare").val(),  // commented as per your code
		amountTransferred: $("#amountTransferred").val(),
		balanceShares: $("#balanceShares").val(),
		modeOfPayment: $("#modeOfPayment").val(),
		comments: $("#comments").val()
	};

	// AJAX call to update data
	$.ajax({
		url: "api/customershareholdingcontroller/updateTransferShare",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(transferData),
		success: function(response) {
			if (response.status === "OK") {
				alert("TRANSFERSHARE UPDATE SUCCESSFULLY");
				$("#formid")[0].reset(); // Reset form after update
				// Optionally reload table data
				TransferShareTable(); // function to reload table
			} else {
				alert(response.message);
			}
		},
		error: function(xhr) {
			alert("❌ ERROR WHILE UPDATING DATA!");
			console.log(xhr);
		}
	});
}



// Delete Code
function deleteTransfershare(id) {
	if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS LOAN?")) {
		$.ajax({
			url: "api/customershareholdingcontroller/deleteTransferShareById",
			type: "POST",
			contentType: "application/x-www-form-urlencoded",  // 🟢 Important
			data: { id: id },  // Sent as form data
			success: function(response) {
				console.log(response);

				// Instead of response.success, check the status
				if (response.status === "OK") {
					alert("TRANSFERSHARE DELETED SUCCESSFULLY");
					TransferShareTable(); // Refresh the table
				} else {
					alert("DELETE FAILED: " + response.message);
				}
			},
			error: function(xhr, status, error) {
				console.error("Error:", error);
				alert("ERROR DELETING SHARE: " + xhr.responseText);
			}
		});
	}
}