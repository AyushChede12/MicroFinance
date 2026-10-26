<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <c:set var="baseUrl" value="${pageContext.request.contextPath}" />
 --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="baseUrl" value="${pageContext.request.contextPath}"
	scope="request" />

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin Dashboard</title>

<script src="https://kit.fontawesome.com/ae73087723.js"
	crossorigin="anonymous"></script>
<link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
	rel="stylesheet" />
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
	rel="stylesheet">

<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/admin.css">

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<link
	href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css"
	rel="stylesheet" />
<script
	src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
<!-- SweetAlert2 CDN -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script>
	// =========================================================
	// GLOBAL UPPERCASE ALERT & DIALOG INTERCEPTOR
	// Enforces uppercase text across all alerts, confirms,
	// SweetAlert2 popups, AJAX responses, and user inputs.
	// =========================================================
	(function() {
		// 1. Intercept native window.alert
		const _nativeAlert = window.alert;
		window.alert = function(message) {
			if (message !== undefined && message !== null) {
				message = String(message).toUpperCase();
			}
			return _nativeAlert.call(window, message);
		};

		// 2. Intercept native window.confirm
		const _nativeConfirm = window.confirm;
		window.confirm = function(message) {
			if (message !== undefined && message !== null) {
				message = String(message).toUpperCase();
			}
			return _nativeConfirm.call(window, message);
		};

		// 3. Intercept native window.prompt
		const _nativePrompt = window.prompt;
		window.prompt = function(message, defaultVal) {
			if (message !== undefined && message !== null) {
				message = String(message).toUpperCase();
			}
			return _nativePrompt.call(window, message, defaultVal);
		};

		// 4. Intercept SweetAlert2 (Swal.fire)
		function hookSwal() {
			if (window.Swal && !window.Swal._isUppercaseHooked) {
				const _originalSwalFire = window.Swal.fire;
				window.Swal.fire = function(...args) {
					if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null) {
						const opts = Object.assign({}, args[0]);
						if (opts.title && typeof opts.title === 'string') opts.title = opts.title.toUpperCase();
						if (opts.text && typeof opts.text === 'string') opts.text = opts.text.toUpperCase();
						if (opts.html && typeof opts.html === 'string') opts.html = opts.html.toUpperCase();
						if (opts.confirmButtonText && typeof opts.confirmButtonText === 'string') opts.confirmButtonText = opts.confirmButtonText.toUpperCase();
						if (opts.cancelButtonText && typeof opts.cancelButtonText === 'string') opts.cancelButtonText = opts.cancelButtonText.toUpperCase();
						if (opts.denyButtonText && typeof opts.denyButtonText === 'string') opts.denyButtonText = opts.denyButtonText.toUpperCase();
						return _originalSwalFire.call(window.Swal, opts);
					} else if (args.length >= 1) {
						const mapped = args.map((arg, idx) => {
							if (idx < 2 && typeof arg === 'string') {
								return arg.toUpperCase();
							}
							return arg;
						});
						return _originalSwalFire.apply(window.Swal, mapped);
					}
					return _originalSwalFire.apply(window.Swal, args);
				};
				window.Swal._isUppercaseHooked = true;
			}
		}
		hookSwal();
		$(document).ready(hookSwal);

		// 5. Global AJAX interceptor to ensure all backend JSON response messages are UPPERCASE
		$(document).ajaxSuccess(function(event, xhr, settings) {
			try {
				if (xhr.responseJSON) {
					const r = xhr.responseJSON;
					if (r.message && typeof r.message === 'string') {
						r.message = r.message.toUpperCase();
					}
					if (r.msg && typeof r.msg === 'string') {
						r.msg = r.msg.toUpperCase();
					}
					if (r.error && typeof r.error === 'string') {
						r.error = r.error.toUpperCase();
					}
				}
			} catch (e) {}
		});

		// 6. Project-wide automatic input typing conversion to UPPERCASE (excludes passwords)
		$(document).on('input', 'input[type="text"]:not([type="password"]), input[type="search"], textarea', function() {
			if (this.dataset.keepcase !== "true") {
				const start = this.selectionStart;
				const end = this.selectionEnd;
				this.value = this.value.toUpperCase();
				if (start !== null && end !== null) {
					this.setSelectionRange(start, end);
				}
			}
		});
	})();
</script>

<meta name="baseUrl" content="${baseUrl}">
</head>

<body>

	<jsp:include page="header.jsp" />
	<jsp:include page="sidebar.jsp" />

	<main id="main" class="main">
		<jsp:include page="${contentPage}" />
	</main>

	<script
		src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.46.0/apexcharts.min.js"></script>

	<script src="${pageContext.request.contextPath}/js/adminscript.js"></script>
	<script>
		$(document).ready(function() {
			let username = sessionStorage.getItem("username");

			if (username) {
				$("#bindUserName").text(username);
			} else {
				window.location.href = "${baseUrl}/";
			}
		});
	</script>

</body>
</html>