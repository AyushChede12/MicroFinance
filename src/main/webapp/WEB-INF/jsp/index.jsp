<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Login Page</title>
<script src="https://kit.fontawesome.com/ae73087723.js"
	crossorigin="anonymous"></script>
<!-- Only one jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<style>
body {
	font-family: 'Poppins', sans-serif;
	background: linear-gradient(rgba(0, 0, 50, 0.8), rgba(0, 0, 50, 0.8)),
		url('Uploads/bgimageLogin.png') no-repeat center
		center;
	background-size: cover;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}

.form-box {
	width: 90%;
	max-width: 450px;
	background: #fff;
	padding: 50px 60px 70px;
	text-align: center;
	border-radius: 10px;
}

.form-box h1 {
	font-size: 30px;
	margin-bottom: 50px;
	color: #3c00a0;
	position: relative;
}

.form-box h1::after {
	content: "";
	width: 30px;
	height: 4px;
	border-radius: 3px;
	background: #3c00a0;
	position: absolute;
	bottom: -12px;
	left: 50%;
	transform: translate(-50%);
}

.textfield {
	position: relative;
	border-bottom: 2px solid #adabad;
	margin: 20px 0;
	width: 270px;
}

.inputfield {
	width: 270px;
	padding: 0 5px;
	height: 40px;
	font-size: 16px;
	border: none;
	background: none;
	outline: none;
}

.inputlabels {
	position: absolute;
	top: 50%;
	left: 5px;
	color: #adadad;
	transform: translateY(-50%);
	font-size: 16px;
	pointer-events: none;
	transition: .4s;
}

.inputfield:focus ~ .inputlabels, .inputfield:valid ~ .inputlabels {
	top: -5px;
	color: #3c00a0;
}

.textfield span::before {
	content: '';
	position: absolute;
	top: 40px;
	left: 0;
	width: 0%;
	height: 2px;
	background: #3c00a0;
	transition: .4s;
}

.inputfield:focus ~ span::before, .inputfield:valid ~ span::before {
	width: 100%;
}

.enquirybtn {
	width: 120px;
	height: 40px;
	background-color: #3c00a0;
	color: white;
	cursor: pointer;
	border: none;
	font-size: 16.5px;
	font-weight: 500;
	border-radius: 8px;
	margin-top: 10px;
	letter-spacing: 1.2px;
}

.iconstyles {
	position: absolute;
	right: 0;
	font-size: 20px;
	cursor: pointer;
	transition: all .5s;
}

#errorMsg {
	color: red;
	margin-bottom: 10px;
}
</style>
</head>

<body>
	<div class="container">
		<div class="form-box">
			<h1>Login</h1>
			<div id="errorMsg"></div>
			<form id="form1">
				<div
					style="display: flex; justify-content: space-between; align-items: center;">
					<div class="textfield">
						<input class="inputfield" type="text" id="username"
							name="username" required> <span></span> <label
							class="inputlabels">USERNAME</label>
					</div>
					<div style="position: relative; margin-bottom: 10px;">
						<i class="fa-solid fa-user iconstyles"></i>
					</div>
				</div>

				<div
					style="display: flex; justify-content: space-between; align-items: center;">
					<div class="textfield">
						<input class="inputfield" type="password" required id="password"
							name="password"> <span></span> <label class="inputlabels">PASSWORD</label>
					</div>
					<div style="position: relative; margin-bottom: 10px;">
						<i class="fa-solid fa-eye-slash iconstyles" id="eyeicon"></i>
					</div>
				</div>

				<div
					style="margin-top: 20px; display: flex; align-items: center; justify-content: center;">
					<button type="submit" class="enquirybtn">SUBMIT</button>
				</div>
			</form>
		</div>
	</div>

	<script>
		$(document).ready(function() {
			// Password toggle
			$("#eyeicon").click(function() {
				let password = $("#password");
				let icon = $(this);
				if (password.attr("type") === "password") {
					password.attr("type", "text");
					icon.removeClass("fa-eye-slash").addClass("fa-eye");
				} else {
					password.attr("type", "password");
					icon.removeClass("fa-eye").addClass("fa-eye-slash");
				}
			});

			// AJAX login
		});
	</script>
	<script src="./js/login.js"></script>
</body>
</html>