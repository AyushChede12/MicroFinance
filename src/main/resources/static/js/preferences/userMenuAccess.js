$(document).ready(function() {

	// ================= Load All User IDs Into Dropdown =================
	$.ajax({
		url: "api/userCreation/getAllUsers",
		type: "GET",
		contentType: "application/json",
		success: function(users) {
			const userSelect = $("#userName");
			userSelect.empty();
			userSelect.append('<option value="">-- SELECT USER ID --</option>');

			if (Array.isArray(users)) {
				users.forEach(function(user) {
					if (user && user.userId) {
						const uid = user.userId.trim();
						userSelect.append('<option value="' + uid + '">' + uid.toUpperCase() + '</option>');
					}
				});
			}
		},
		error: function(xhr) {
			console.error("Error fetching users:", xhr);
			alert("FAILED TO LOAD USERS!");
		}
	});

	// Trigger retrieval when user selection changes
	$("#userName").on("change", function() {
		retriveINCheckBox();
	});

});

// ================= Retrieve Checkboxes for Selected User =================
function retriveINCheckBox() {
	const userName = $("#userName").val();

	// Step 1: Uncheck all checkboxes first
	$("input[type='checkbox'][name='service']").prop("checked", false);

	if (!userName) {
		return;
	}

	$.ajax({
		type: "POST",
		url: 'api/userCreation/findTheUserIdByUserMasterService',
		contentType: "application/json",
		data: JSON.stringify({ userName: userName }),
		success: function(data) {
			if (!data || !data.service) {
				return;
			}

			const serviceArray = data.service.split(",").map(function(s) {
				return s.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
			});

			// Check matching checkboxes
			$("input[type='checkbox'][name='service']").each(function() {
				const rawVal = $(this).val().trim();
				const normalizedVal = rawVal.toUpperCase().replace(/[^A-Z0-9]/g, "");

				if (serviceArray.indexOf(normalizedVal) !== -1) {
					$(this).prop("checked", true);
				}
			});
		},
		error: function(xhr) {
			console.error("Error fetching access for user:", xhr);
			alert("FAILED TO FETCH USER MENU ACCESS!");
		}
	});
}

// ================= Save User Menu Access Permissions =================
function submitUserServiceMap() {
	const userName = $("#userName").val();

	if (!userName) {
		alert("PLEASE SELECT A USER ID!");
		return;
	}

	const selectedServices = [];
	$("input[name='service']:checked").each(function() {
		selectedServices.push($(this).val().trim());
	});

	$.ajax({
		type: "POST",
		url: "api/userCreation/userToServiceMap",
		data: {
			userName: userName,
			service: selectedServices.join(",")
		},
		success: function() {
			alert("ACCESS PERMISSIONS UPDATED SUCCESSFULLY FOR USER: " + userName.toUpperCase());
		},
		error: function() {
			alert("FAILED TO SAVE ACCESS PERMISSIONS!");
		}
	});
}