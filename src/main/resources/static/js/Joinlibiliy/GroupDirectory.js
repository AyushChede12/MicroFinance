// Dynamic Company Details integration & Report Printing
let companyDetails = {};

function loadCompanyDetails() {
	$.ajax({
		url: "api/preference/getCompanyDetails",
		type: "GET",
		dataType: "json",
		success: function(resp) {
			const comp = (resp && resp.data) ? resp.data : resp;
			if (comp) {
				companyDetails = comp;
				const compName = (comp.companyName || "MICROFINANCE FINANCIAL SERVICES").toUpperCase();
				const compAddr = [comp.address, comp.city, comp.state, comp.pinCode].filter(Boolean).join(", ").toUpperCase();

				const regParts = [];
				if (comp.cinNo) regParts.push("CIN: " + comp.cinNo);
				if (comp.pan) regParts.push("PAN: " + comp.pan);
				if (comp.tan) regParts.push("TAN: " + comp.tan);
				if (comp.gstin) regParts.push("GSTIN: " + comp.gstin);
				const regLine = regParts.join(" | ").toUpperCase();

				const contactParts = [];
				if (comp.helplineNo) contactParts.push("HELPLINE: " + comp.helplineNo);
				if (comp.emailId) contactParts.push("EMAIL: " + comp.emailId);
				const contactLine = contactParts.join(" | ").toUpperCase();

				$("#compName").text(compName);
				$("#compAddress").text(compAddr);
				$("#compRegLine").text(regLine);
				$("#compContact").text(contactLine);
			}
		},
		error: function(err) {
			console.error("FAILED TO FETCH COMPANY DETAILS:", err);
		}
	});
}

function printGroupDirectoryReport() {
	const printCard = document.getElementById("printableGroupDirectoryArea").cloneNode(true);
	const header = printCard.querySelector("#companyHeader");
	if (header) header.style.display = "block";

	const signatures = printCard.querySelector(".print-signatures");
	if (signatures) signatures.style.display = "flex";

	// Hide action buttons in printed report
	const actionCells = printCard.querySelectorAll("th:last-child, td:last-child");
	actionCells.forEach(cell => cell.remove());

	const printWindow = window.open("", "_blank", "width=1100,height=800");
	printWindow.document.write(`
		<!DOCTYPE html>
		<html>
		<head>
			<title>JOINT LIABILITY GROUP DIRECTORY REPORT</title>
			<style>
				@page { size: A4 landscape; margin: 12mm; }
				body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; margin: 0; padding: 10px; color: #000; background: #fff; }
				table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 20px; font-size: 11px; }
				th, td { border: 1px solid #333; padding: 6px 8px; text-align: left; }
				th { background-color: #f2f2f2 !important; -webkit-print-color-adjust: exact; text-transform: uppercase; }
				.text-center { text-align: center; }
				.mb-4 { margin-bottom: 1.5rem; }
				.mt-5 { margin-top: 3rem; }
				.pt-4 { padding-top: 1.5rem; }
				.row { display: flex; flex-wrap: wrap; margin-right: -15px; margin-left: -15px; }
				.col-4 { flex: 0 0 33.333333%; max-width: 33.333333%; }
				.card-title { display: none; }
			</style>
		</head>
		<body>
			${printCard.innerHTML}
			<script>
				window.onload = function() {
					window.print();
					window.onafterprint = function() { window.close(); };
				};
			<\/script>
		</body>
		</html>
	`);
	printWindow.document.close();
}

$(document).ready(function() {
	loadCompanyDetails();

	$("#printGroupDirectoryBtn").on("click", function(e) {
		e.preventDefault();
		const rows = $("#groupDirectoryBody tr").length;
		if (rows === 0 || $("#groupDirectoryBody tr td.text-warning").length > 0) {
			alert("NO GROUP DIRECTORY DATA AVAILABLE TO PRINT. PLEASE CLICK 'SHOW TABLE' FIRST.");
			return;
		}
		printGroupDirectoryReport();
	});
});

$(document).ready(function() {
	console.log("DOCUMENT READY");

	$.ajax({
		url: 'api/customermanagement/approved',
		type: 'GET',
		success: function(response) {
			console.log("API RESPONSE:", response);

			// Extract the actual customer list from response.data
			const customers = response.data;

			if (Array.isArray(customers) && customers.length > 0) {
				const communityLeader = $('#communityLeader');
				const selectedMember = $('#selectedMember');

				communityLeader.empty();
				selectedMember.empty();

				const defaultOption = '<option value="">SELECT MEMBER</option>';
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
				alert('NO MEMBER DATA FOUND');
			}
		},

		error: function(xhr, status, error) {
			console.error('AJAX ERROR:', status, error);
			alert('FAILED TO FETCH MEMBERS');
		}
	});
});


// JS FOR FETCHING THE MEMBERS IN THE DROPDOWN
$(document).ready(function() {
	$('#communityLeader,#selectedMember').on('change', function() {
		const selectedCode = $(this).val();
		const changedId = $(this).attr('id');

		if (selectedCode !== "") {
			$.ajax({
				url: 'api/loanmanegment/getByMemberCodeNewLoanApplication',
				type: 'GET',
				data: { memberCode: selectedCode },
				success: function(response) {
					console.log("RESPONSE:", response);

					if (response.status === "OK") {

						// Your API returns a list
						const dataList = response.data;

						if (Array.isArray(dataList) && dataList.length > 0) {
							// Get the first customer in the list
							const d = dataList[0];

							if (changedId === 'communityLeader') {
								$('#contactNo').val(d.contactNo || '');

								if (d.customerPhoto) {
									const fileName = d.customerPhoto;
									const photoPath = `/Uploads/${encodeURIComponent(fileName)}`;

									$("#photoPreview").attr("src", photoPath);
									$("#photoHidden").val(fileName);
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
									$('#signatureHidden').val(fileName);
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
							alert("NO CUSTOMER FOUND FOR THIS MEMBER CODE!");
						}

					} else {
						alert("CUSTOMER NOT FOUND!");
					}
				},
				error: function(xhr) {
					console.error("AJAX ERROR:", xhr.responseText);
					alert("SOMETHING WENT WRONG WHILE FETCHING DATA.");
				}
			});
		} else {
			$('input, textarea').not('#findMember').val('');
		}
	});
});


// JS FOR ADDING MEMBER IN THE GROUP
$("#addque").click(function(e) {
	e.preventDefault();

	// Get selected member ID from select
	var selectedMember = $("#selectedMember").val().trim();
	var customerName = $("#customerName").val().trim();
	var referralDetails = $("#referralDetails").val().trim();
	var contact = $("#contact").val().trim();

	if (!selectedMember || !customerName || !referralDetails || !contact) {
		alert("PLEASE FILL IN ALL FIELDS BEFORE ADDING TO QUEUE.");
		return;
	}

	// Prevent duplicate
	var isDuplicate = false;
	$("#tab1 tbody tr").each(function() {
		var memberCode = $(this).find("td:first").text().trim();
		if (memberCode === selectedMember) {
			isDuplicate = true;
			return false;
		}
	});

	if (isDuplicate) {
		alert("THIS MEMBER IS ALREADY ADDED TO THE QUEUE.");
		return;
	}

	// Append row
	let newRow = `
        <tr>
            <td>${selectedMember}</td>
            <td>${customerName}</td>
            <td>${referralDetails}</td>
            <td>${contact}</td>
            <td>
                <button class="btn btn-danger btn-sm remove-btn" type="button">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </td>
        </tr>
    `;

	$("#tab1 tbody").append(newRow);

	// Clear inputs
	$("#selectedMember").val("");
	$("#customerName").val("");
	$("#referralDetails").val("");
	$("#contact").val("");
});


// JS FOR SAVING THE GROUP DIRECTORY
$(document).ready(function() {
	$('#savegroupdirectory').on('click', function(e) {
		e.preventDefault();

		// 1. Collect all queued member data
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

		// 2. Validate queue
		if (memberIds.length === 0) {
			alert("PLEASE ADD AT LEAST ONE MEMBER TO THE QUEUE BEFORE SAVING.");
			return;
		}

		// 3. Create group directory object
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

			// Queue data
			selectedMember: memberIds.join(","),
			customerName: customerNames.join(","),
			referralDetails: referralDetails.join(","),
			contact: contacts.join(",")
		};

		// 4. AJAX request
		$.ajax({
			url: 'api/joinliability/savegroupdirectory',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(groupDirectory),
			success: function(response) {
				console.log('RESPONSE:', response);
				if (response.status === 'CREATED') {
					alert("GROUP DIRECTORY SAVED SUCCESSFULLY!\n" + (response.message ? response.message.toUpperCase() : ""));
					location.reload();
				} else {
					alert("FAILED: " + (response.message ? response.message.toUpperCase() : "PLEASE CHECK INPUTS."));
				}
			},
			error: function(xhr, status, error) {
				console.error('ERROR:', error);
				alert('❌ ERROR WHILE SAVING GROUP DIRECTORY.');
			}
		});
	});
});


$(document).ready(function() {

	// When "Show" button is clicked, fetch and show data
	$('#showGroupDirectory').on('click', function() {
		fetchGroupDirectory();
	});

	// Function to fetch and render Group Directory data
	function fetchGroupDirectory() {
		$.ajax({
			url: "api/joinliability/viewGroupDirectories",
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
						`<tr><td colspan="15" class="text-center text-warning">NO DATA FOUND.</td></tr>`
					);
				}
			},
			error: function() {
				$("#groupDirectoryBody").html(
					`<tr><td colspan="15" class="text-center text-danger">❌ SOMETHING WENT WRONG WHILE FETCHING DATA.</td></tr>`
				);
			}
		});
	}

});


// JS FOR SIZING THE PHOTOS
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

		// Collect table members
		let memberCodes = [];
		let customerName = [];

		$('#tab1 tr').each(function() {
			let code = $(this).find('td').eq(0).text().trim();
			let name = $(this).find('td').eq(1).text().trim();
			if (code) memberCodes.push(code);
			if (name) customerName.push(name);
		});

		if (memberCodes.length === 0 && memberNames.length === 0) {
			alert("⚠️ NO MEMBERS TO SAVE.");
			return;
		}


		// FETCH GROUP DIRECTORY DATA
		function fetchGroupDirectory() {
			$.ajax({
				url: "api/joinliability/viewGroupDirectories",
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
						tableBody.html(`<tr><td colspan="18" class="text-center text-warning">NO DATA FOUND.</td></tr>`);
					}
				},
				error: function() {
					$("#groupDirectoryBody").html(`<tr><td colspan="18" class="text-center text-danger">SOMETHING WENT WRONG.</td></tr>`);
				}
			});
		}

		fetchGroupDirectory();

		// Edit the group directory
		$(document).on("click", ".edit-btn", function() {
			var id = $(this).data("id");

			$.ajax({
				url: `api/joinliability/editGroupDirectory/${id}`,
				type: "GET",
				dataType: "json",
				success: function(res) {
					const item = res.data;
					if (item) {
						$("#id").val(item.id);

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
						alert("NO DATA FOUND FOR EDITING.");
					}
				},
				error: function(xhr) {
					console.error("EDIT FETCH ERROR:", xhr.responseText);
					alert("FAILED TO LOAD GROUP DIRECTORY FOR EDITING.");
				}
			});
		});

		// Update group directory
		$('#updategroupdirectory').on('click', function() {
			const id = $('#id').val();

			if (!id || isNaN(id)) {
				alert("❌ INVALID ID. CANNOT UPDATE.");
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
					alert("✅ GROUP DIRECTORY UPDATED SUCCESSFULLY!");
					$('#groupdirectordform')[0].reset();

					fetchGroupDirectory();
				},
				error: function(xhr) {
					console.error("UPDATE ERROR:", xhr.responseText);
					alert("❌ FAILED TO UPDATE. CHECK CONSOLE FOR DETAILS.");
				}
			});
		});


		// Delete Group Directory
		$(document).on("click", ".delete-group-btn", function() {
			const id = $(this).data("id");

			if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS GROUP?")) {
				$.ajax({
					url: `api/joinliability/deleteGroupDirectory/${id}`,
					type: "POST",
					success: function(response) {
						alert("GROUP DIRECTORY DELETED SUCCESSFULLY!");

						if (typeof fetchGroupDirectories === "function") {
							fetchGroupDirectory();
						}
					},
					error: function(xhr) {
						console.error("DELETE FAILED:", xhr.responseText || xhr.statusText);
						alert("FAILED TO DELETE GROUP DIRECTORY.");
					}
				});
			}
		});

		// Add queue
		$(document).ready(function() {
			$.ajax({
				url: "api/customershareholdingcontroller/findAllCustomerCode",
				type: "GET",
				success: function(response) {
					console.log("API RESPONSE:", response);

					var dropdown1 = $('#selectedMember');

					dropdown1.empty();

					dropdown1.append('<option value="">SELECT</option>');

					if (response.status === "OK" && response.data) {
						$.each(response.data, function(index, customer) {
							dropdown1.append('<option value="' + customer.memberCode + '">' + customer.memberCode + ' - ' + customer.customerName + '</option>');
						});
					} else {
						dropdown1.append('<option value="">NO CUSTOMERS FOUND</option>');
					}
				},
				error: function() {
					alert("FAILED TO FETCH CUSTOMER LIST.");
				}
			});
		});


		$('#selectedMember').on('change', function() {
			let selectedCode = $(this).val();

			if (selectedCode !== "") {
				$.ajax({
					url: 'api/customershareholdingcontroller/fetchByCustomerCode?memberCode=' + selectedCode,
					type: 'POST',
					success: function(response) {
						if (response.status === "FOUND") {
							let customer = response.data[0];
							$('#customerName').val(customer.customerName);
							$('#referralDetails').val(customer.referralName);
							$('#contact').val(customer.contactNo);
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
});
*/