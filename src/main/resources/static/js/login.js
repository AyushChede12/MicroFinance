$(document).ready(function() {
	$("#form1").submit(function(e) {
		e.preventDefault();

		let username = $("#username").val().trim();
		let password = $("#password").val().trim();

		if (!username || !password) {
			$("#errorMsg").text("USERNAME AND PASSWORD ARE REQUIRED").show();
			return;
		}

		$.ajax({
			url: 'api/loginPage/loginValidate',  // Make sure endpoint matches Spring Boot
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({ username: username, password: password }),
			success: function(response) {
				// Assuming ApiResponse has integer status and message
				if (response.status === 'OK') {
					sessionStorage.setItem("username", response.data.username);
					window.location.href = 'openDashboard'; // replace with your homepage

				} else {
					$("#errorMsg").text(response.message).show();
				}
			},
			error: function(xhr) {
				if (xhr.status === 401) {
					$("#errorMsg").text("INVALID USERNAME OR PASSWORD").show();
				} else {
					$("#errorMsg").text("SOMETHING WENT WRONG. TRY AGAIN!").show();
				}
			}
		});

		/*$.ajax({
			url: "api/preference/login",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify({
				customerId: $("#customerId").val(),
				password: $("#password").val()
			}),
			success: function(response) {
				if (response.status === "OK") {
					// Redirect to dashboard.jsp
					window.location.href = "openDashboard";
				} else {
					alert("INVALID CREDENTIALS");
				}
			},
			error: function() {
				alert("LOGIN FAILED!");
			}
		});*/
	});

});