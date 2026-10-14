$(document).ready(function() {

	$("#saveUserBtn").click(function(e) {
		e.preventDefault();

		// ✅ collect user data from form fields
		const user = {
			customerId: $("#customerId").val().trim(),
			password: $("#password").val().trim(),
			fullName: $("#fullName").val().trim(),
			email: $("#email").val().trim(),
			contactNo: $("#contactno").val().trim(),
			branchName: $("#branchName").val(),
			pastDate: $("#pastDate").val() === "1",
			rePrint: $("#rePrint").val() === "1",
			deleteAccess: $("#deleteAccess").val() === "1",
			userStatus: $("#toggle-user-status").is(":checked")
		};

		// ✅ Basic validation before sending
		if (!user.customerId || !user.password || !user.fullName) {
			alert("⚠️ PLEASE FILL ALL REQUIRED FIELDS BEFORE SAVING.");
			return;
		}

		// ✅ final payload as expected by backend
		const payload = {
			user: user,
			menuAccess: [] // keep empty for now; will add menus later
		};

		// ✅ AJAX request
		$.ajax({
			url: "api/preference/saveUserCreation",
			type: "POST",
			data: JSON.stringify(payload),
			contentType: "application/json",
			success: function(res) {
				console.log("Response:", res);
				if (res.status === "OK") {
					alert("✅ USER SAVED SUCCESSFULLY! NOW ASSIGN MENU ACCESS.");
					if (res.data && res.data.id) {
						window.location.href = "customerMenuAccess?customerId=" + res.data.id;
					}
				} else {
					alert("⚠️ ERROR: " + (res.message || "UNKNOWN ERROR OCCURRED."));
				}
			},
			error: function(xhr, status, error) {
				console.error("Error:", xhr.responseText);
				alert("❌ SERVER ERROR OCCURRED. CHECK CONSOLE FOR DETAILS.");
			}
		});
	});

});