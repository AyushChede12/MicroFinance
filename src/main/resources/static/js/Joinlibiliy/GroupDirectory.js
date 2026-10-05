$(document).ready(function() {
	console.log("Document ready");

	$.ajax({
		url: 'api/customermanagement/approved',
		type: 'GET',
		success: function(response) {
			console.log("API response:", response);

			// Extract the actual customer list from response.data
			const customers = response.data;

			if (Array.isArray(customers) && customers.length > 0) {
				const communityLeader = $('#communityLeader');
				const selectedMember = $('#selectedMember');

				communityLeader.empty();
				selectedMember.empty();

				const defaultOption = '<option value="">Select Member</option>';
				communityLeader.append(defaultOption);
				selectedMember.append(defaultOption);

				customers.forEach(function(customer) {
					if (customer.memberCode && customer.customerName) {
						const option = `<option value="${customer.memberCode}" data-name="${customer.customerName}">
				                            ${customer.customerName} - ${customer.memberCode}
				                        </option>`;
						communityLeader.append(option);
						selectedMember.append(option);
					}
				});
			} else {
				alert('No member data found');
			}
		},

		error: function(xhr, status, error) {
			console.error('AJAX Error:', status, error);
			alert('Failed to fetch members');
		}
	});
});

// js for fetching the members in the dropdown
$(document).ready(function() {
	$('#communityLeader,#selectedMember').on('change', function() {
		const selectedCode = $(this).val(); // This is your memberCode now!
		const changedId = $(this).attr('id'); // ✅ Correct

		if (selectedCode !== "") {
			$.ajax({
				url: 'api/loanmanegment/getByMemberCodeNewLoanApplication',
				type: 'GET',
				data: { memberCode: selectedCode },
				success: function(response) {
					console.log("Response:", response);

					if (response.status === "OK") {

						// ✅ Your API returns a list
						const dataList = response.data;

						if (Array.isArray(dataList) && dataList.length > 0) {
							// ✅ Get the first customer in the list
							const d = dataList[0];

							if (changedId === 'communityLeader') {
								$('#contactNo').val(d.contactNo || '');

								if (d.customerPhoto) {
									const fileName = d.customerPhoto; // This should be JUST the name
									const photoPath = `/Uploads/${encodeURIComponent(fileName)}`;

									$("#photoPreview").attr("src", photoPath);
									$("#photoHidden").val(fileName); // ✅ Only file name!
									photoSizeEdit({ target: { result: photoPath } });
								} else {
									$("#photoPreview").attr("src", "/Uploads/default-placeholder.jpg");
									$("#photoHidden").val("");
									photoSizeEdit({ target: { result: "/Uploads/default-placeholder.jpg" } });
								}

								if (d.customerSignature) {
									const fileName = d.customerSignature;
									const signPath = `/Uploads/${encodeURIComponent(fileName)}`;

									$('#signaturePreview').attr('src', signPath);
									$('#signatureHidden').val(fileName); // ✅ Only file name!
									signatureSizeEdit({ target: { result: signPath } });
								} else {
									$('#signaturePreview').attr('src', '/Uploads/default-placeholder.jpg');
									$('#signatureHidden').val("");
									signatureSizeEdit({ target: { result: "/Uploads/default-placeholder.jpg" } });
								}



							} else if (changedId === 'selectedMember') {

								$('#customerName').val(d.customerName);
								$('#referralDetails').val(d.referralName);
								$('#contact').val(d.contactNo);

							}
						} else {
							alert("No customer found for this member code!");
						}

					} else {
						alert("Customer not found!");
					}
				},
				error: function(xhr) {
					console.error("AJAX Error:", xhr.responseText);
					alert("Something went wrong while fetching data.");
				}
			});
		} else {
			$('input, textarea').not('#findMember').val('');
		}
	});
});

// js for adding member in the group
$("#addque").click(function(e) {
	e.preventDefault();

	// ✅ Get selected member ID from <select>
	var selectedMember = $("#selectedMember").val().trim();
	var customerName = $("#customerName").val().trim();
	var referralDetails = $("#referralDetails").val().trim();
	var contact = $("#contact").val().trim();

	if (!selectedMember || !customerName || !referralDetails || !contact) {
		alert("Please fill in all fields before adding to queue.");
		return;
	}

	// ✅ Prevent duplicate
	var isDuplicate = false;
	$("#tab1 tbody tr").each(function() {
		var memberCode = $(this).find("td:first").text().trim();
		if (memberCode === selectedMember) {
			isDuplicate = true;
			return false;
		}
	});

	if (isDuplicate) {
		alert("This member is already added to the queue.");
		return;
	}

	// ✅ Append row
	let newRow = `
        <tr>
            <td>${selectedMember}</td>
            <td>${customerName}</td>
            <td>${referralDetails}</td>
            <td>${contact}</td>
            <td><button class="btn btn-danger btn-sm remove-btn" type="button">
                <i class="fa-solid fa-xmark"></i>
            </button></td>
        </tr>
    `;

	$("#tab1 tbody").append(newRow);

	// Clear inputs
	$("#selectedMember").val("");
	$("#customerName").val("");
	$("#referralDetails").val("");
	$("#contact").val("");
});


// Js for saving the group directory
$(document).ready(function() {
	$('#savegroupdirectory').on('click', function(e) {
		e.preventDefault();

		// 1️⃣ Collect all queued member data
		let memberIds = [];
		let customerNames = [];
		let referralDetails = [];
		let contacts = [];

		$("#tab1 tbody tr").each(function() {
			let memberId = $(this).find("td:eq(0)").text().trim();
			let customerName = $(this).find("td:eq(1)").text().trim();
			let referral = $(this).find("td:eq(2)").text().trim();
			let contact = $(this).find("td:eq(3)").text().trim();

			if (memberId) memberIds.push(memberId);
			if (customerName) customerNames.push(customerName);
			if (referral) referralDetails.push(referral);
			if (contact) contacts.push(contact);
		});

		// 2️⃣ Validate queue
		if (memberIds.length === 0) {
			alert("Please add at least one member to the queue before saving.");
			return;
		}

		// 3️⃣ Create group directory object
		const groupDirectory = {
			groupID: $('#groupID').val(),
			communityName: $('#communityName').val(),
			openingDate: $('#openingDate').val(),
			branchName: $('#branchName').val(),
			communityLeader: $('#communityLeader').val(),
			contactNo: $('#contactNo').val(),
			communityAddress: $('#communityAddress').val(),
			allocatedStaff: $('#allocatedStaff').val(),
			collectionDay: $('#collectionDay').val(),
			collectionTime: $('#collectionTime').val(),
			photo: $('#photoHidden').val(),
			signature: $('#signatureHidden').val(),

			// ✅ Queue data
			selectedMember: memberIds.join(","),      // e.g. "M101,M102,M103"
			customerName: customerNames.join(","),    // e.g. "John,Jane,Smith"
			referralDetails: referralDetails.join(","),
			contact: contacts.join(",")
		};

		// 4️⃣ AJAX request
		$.ajax({
			url: 'api/joinliability/savegroupdirectory',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(groupDirectory),
			success: function(response) {
				console.log('Response:', response);
				if (response.status === 'CREATED') {
					alert("Group Directory saved successfully!\n" + response.message);
					location.reload();
				} else {
					alert("❌ Failed: " + response.message);
				}
			},
			error: function(xhr, status, error) {
				console.error('Error:', error);
				alert('❌ Error while saving group directory.');
			}
		});
	});
});

$(document).ready(function() {

	// 🔘 When "Show" button is clicked, fetch and show data
	$('#showGroupDirectory').on('click', function() {
		fetchGroupDirectory();
	});

	// 📌 Function to fetch and render Group Directory data
	function fetchGroupDirectory() {
		$.ajax({
			url: "api/joinliability/viewGroupDirectories", // ✅ ensure endpoint is correct
			type: "GET",
			dataType: "json",
			success: function(response) {
				const data = response.data || [];
				const tableBody = $("#groupDirectoryBody").empty();

				if (data.length > 0) {
					$.each(data, function(index, item) {
						const row = `
              <tr>
                <td>${item.groupID || ''}</td>
                <td>${item.communityName || ''}</td>
                <td>${item.openingDate || ''}</td>
                <td>${item.branchName || ''}</td>
                <td>${item.communityLeader || ''}</td>
                <td>${item.contactNo || ''}</td>
                <td>${item.communityAddress || ''}</td>
                <td>${item.allocatedStaff || ''}</td>
                <td>${item.collectionDay || ''}</td>
                <td>${item.collectionTime || ''}</td>
                <td>${item.selectedMember || '-'}</td>
                <td>${item.customerName || '-'}</td>
                <td class="d-flex" style="gap:.5rem;">
                  <button class="iconbutton edit-btn" data-id="${item.id}">
                    <i class="fa-solid fa-pen-to-square text-success"></i>
                  </button>
                  <button class="iconbutton delete-group-btn" data-id="${item.id}">
                    <i class="fa-solid fa-trash text-danger"></i>
                  </button>
                </td>
              </tr>`;
						tableBody.append(row);
					});
				} else {
					tableBody.html(
						`<tr><td colspan="15" class="text-center text-warning">No data found.</td></tr>`
					);
				}
			},
			error: function() {
				$("#groupDirectoryBody").html(
					`<tr><td colspan="15" class="text-center text-danger">❌ Something went wrong while fetching data.</td></tr>`
				);
			},
		});
	}

});



// js for sizing the photos
function photoSizeEdit(e) {
	const previewimg = document.getElementById("photoPreview");
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
}

function signatureSizeEdit(e) {
	const previewimg = document.getElementById("signaturePreview");
	previewimg.src = e.target.result;
	previewimg.style.width = "100%";
	previewimg.style.height = "100%";
	previewimg.style.objectFit = "cover";
	previewimg.style.overflow = "hidden";
	previewimg.style.borderRadius = "20px";
}

















/*
$(document).ready(function() {
	$("#savegroupdirectory").show();
	$("#updategroupdirectory").hide();

	$('#savegroupdirectory').on('click', function(e) {
		e.preventDefault();

		const formData = new FormData();

		// 👥 Collect table members
		let memberCodes = [];
		let customerName = [];

		$('#tab1 tr').each(function() {
			let code = $(this).find('td').eq(0).text().trim();
			let name = $(this).find('td').eq(1).text().trim();
			if (code) memberCodes.push(code);
			if (name) customerName.push(name);

		});

		if (memberCodes.length === 0 && memberNames.length === 0) {
			alert("⚠️ No members to save.");
			return;
		}


		

	// feach the group directory
	// FETCH GROUP DIRECTORY DATA
	function fetchGroupDirectory() {
		$.ajax({
			url: "api/joinliability/viewGroupDirectories",  // your GET endpoint
			type: "GET",
			dataType: "json",
			success: function(response) {
				const data = response.data || [];
				const tableBody = $("#groupDirectoryBody").empty();

				if (data.length > 0) {
					$.each(data, function(index, item) {
						const row = `
						<tr>
						    
							<td>${item.groupID || ''}</td>
							<td>${item.communityName || ''}</td>
							<td>${item.openingDate || ''}</td>
							<td>${item.branchName || ''}</td>
							<td>${item.communityLeader || ''}</td>
							<td>${item.contactNo || ''}</td>
							<td>${item.communityAddress || ''}</td>
							<td>${item.allocatedStaff || ''}</td>
							<td>${item.collectionDay || ''}</td>
							<td>${item.collectionTime || ''}</td>
							
									    
									   <td class="d-flex" style="gap:.5rem;">
									   <button class="iconbutton edit-btn" data-id="${item.id}">
														  <i class="fa-solid fa-pen-to-square text-success"></i>
														</button>
														<button class="iconbutton delete-group-btn" data-id="${item.id}">
														  <i class="fa-solid fa-trash text-danger"></i>
														</button>
									   </td>
						</tr>`;
						tableBody.append(row);
					});
				} else {
					tableBody.html(`<tr><td colspan="18" class="text-center text-warning">No data found.</td></tr>`);
				}
			},
			error: function() {
				$("#groupDirectoryBody").html(`<tr><td colspan="18" class="text-center text-danger">Something went wrong.</td></tr>`);
			}
		});
	}
	fetchGroupDirectory();
	// edit the group directory 
	$(document).on("click", ".edit-btn", function() {
		var id = $(this).data("id");

		$.ajax({
			url: `api/joinliability/editGroupDirectory/${id}`,
			type: "GET",
			dataType: "json",
			success: function(res) {
				const item = res.data;
				if (item) {
					// Use 'item' instead of 'data'
					$("#id").val(item.id); // Hidden field to track ID while updating
					
					$("#groupID").val(item.groupID);
					$("#communityName").val(item.communityName);
					$("#openingDate").val(item.openingDate);
					$("#branchName").val(item.branchName);
					$("#communityLeader").val(item.communityLeader);
					$("#contactNo").val(item.contactNo);
					$("#communityAddress").val(item.communityAddress);
					$("#allocatedStaff").val(item.allocatedStaff);
					$("#collectionDay").val(item.collectionDay);
					$("#collectionTime").val(item.collectionTime);

					$("#savegroupdirectory").hide();
					$("#updategroupdirectory").show();
				} else {
					alert("No data found for editing.");
				}
			},
			error: function(xhr) {
				console.error("Edit fetch error:", xhr.responseText);
				alert("Failed to load group directory for editing.");
			}
		});
	});
	// update group directry
	$('#updategroupdirectory').on('click', function() {
		const id = $('#id').val();

		if (!id || isNaN(id)) {
			alert("❌ Invalid ID. Cannot update.");
			return;
		}

		const groupData = {
			groupID: $('#groupID').val()?.trim(),
			communityName: $('#communityName').val()?.trim(),
			openingDate: $('#openingDate').val(),
			branchName: $('#branchName').val(),
			communityLeader: $('#communityLeader').val()?.trim(),
			contactNo: $('#contactNo').val()?.trim(),
			communityAddress: $('#communityAddress').val()?.trim(),
			allocatedStaff: $('#allocatedStaff').val()?.trim(),
			collectionDay: $('#collectionDay').val(),
			collectionTime: $('#collectionTime').val()
		};

		$.ajax({
			url: `api/joinliability/updateGroupDirectory/${id}`,
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(groupData),
			success: function(response) {
				alert("✅ Group Directory updated successfully!");
				$('#groupdirectordform')[0].reset();

				fetchGroupDirectory(); // Make sure this function is defined
			},
			error: function(xhr) {
				console.error("Update error:", xhr.responseText);
				alert("❌ Failed to update. Check console for details.");
			}
		});
	});




	// Delete Group Directory
	$(document).on("click", ".delete-group-btn", function() {
		const id = $(this).data("id");

		if (confirm("Are you sure you want to delete this group?")) {
			$.ajax({
				url: `api/joinliability/deleteGroupDirectory/${id}`, // तुमचं backend endpoint
				type: "POST", // POST आहे तर backend सुद्धा POST expect करतं का हे पाहा (else use DELETE)
				success: function(response) {
					alert("Group Directory deleted successfully!");

					// Optional: Refresh list
					if (typeof fetchGroupDirectories === "function") {
						fetchGroupDirectory();
					}
				},
				error: function(xhr) {
					console.error("Delete failed:", xhr.responseText || xhr.statusText);
					alert("Failed to delete Group Directory.");
				}
			});
		}
	});

	// add que
	$(document).ready(function() {
		$.ajax({
			url: "api/customershareholdingcontroller/findAllCustomerCode",
			type: "GET",
			success: function(response) {
				console.log("API response:", response);

				var dropdown1 = $('#selectedMember');       // shows: memberCode - customerName
				// var dropdown2 = $('#jointOperationCode');     // shows: memberCode only

				dropdown1.empty();
				// dropdown2.empty();

				dropdown1.append('<option value="">Select</option>');
				//  dropdown2.append('<option value="">Select</option>');

				if (response.status === "OK" && response.data) {
					$.each(response.data, function(index, customer) {
						dropdown1.append('<option value="' + customer.memberCode + '">' + customer.memberCode + ' - ' + customer.customerName + '</option>');
						//dropdown2.append('<option value="' + customer.memberCode + '">' + customer.memberCode + '</option>');
					});
				} else {
					dropdown1.append('<option value="">No customers found</option>');
					// dropdown2.append('<option value="">No customers found</option>');
				}
			},
			error: function() {
				alert("Failed to fetch customer list.");
			}
		});
	});


	$('#selectedMember').on('change', function() {
		let selectedCode = $(this).val();

		if (selectedCode !== "") {
			$.ajax({
				url: 'api/customershareholdingcontroller/fetchByCustomerCode?memberCode=' + selectedCode, // ✅ send as query param
				type: 'POST',
				success: function(response) {
					if (response.status === "FOUND") {
						let customer = response.data[0];
						$('#customerName').val(customer.customerName);
						$('#referralDetails').val(customer.referralName);
						$('#contact').val(customer.contactNo);
					} else {
						alert('No customer data found!');
						$('#customerName').val('');
					}
				},
				error: function() {
					alert('Error while fetching customer data!');
				}
			});
		} else {
			$('#customerName').val('');
		}
	});


	


});

*/
