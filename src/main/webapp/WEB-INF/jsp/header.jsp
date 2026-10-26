
<style>
.header-right-buttons {
	position: absolute;
	right: 20px;
}

.header-btn {
	padding: 8px 18px;
	border-radius: 25px;
	text-decoration: none;
	font-size: 14px;
	font-weight: 600;
	margin-left: 10px;
	transition: 0.3s;
}

/* HELP BUTTON */
.help-btn {
	background: white;
	color: #7b2ff7;
}

.help-btn:hover {
	background: #7b2ff7;
	color: white;
}

/* LOGOUT BUTTON */
.logout-btn {
	background: #ff4b5c;
	color: white;
}

.logout-btn:hover {
	background: #d63031;
}
</style>
<header id="header" class="header fixed-top d-flex align-items-center">
	<div class="d-flex align-items-center justify-content-between w-100">

		<!-- LEFT -->
		<div class="d-flex align-items-center">
			<a href="/" class="logo d-flex align-items-center">
				<p id="bindUserName"
					style="color: white; margin: 0; font-size: 25px; font-weight: 600; margin-left: 10px;">
				</p>
			</a> <i class="bi bi-list toggle-sidebar-btn ms-3"></i>
		</div>

		<!-- RIGHT -->
		<div class="header-right-buttons">

			<a href="helpmanual" class="header-btn help-btn"> <i
				class="fa fa-question-circle"></i> HELP
			</a> <a href="#" class="header-btn logout-btn" onclick="logoutUser()">
				<i class="fa fa-sign-out"></i> LOGOUT
			</a>

		</div>

	</div>
	<script>
		function logoutUser() {

			var confirmLogout = confirm("ARE YOU SURE YOU WANT TO LOGOUT?");

			if (confirmLogout) {
				alert("LOGOUT SUCCESSFUL!");
				window.location.href = "/";
			}

		}
	</script>
</header>
