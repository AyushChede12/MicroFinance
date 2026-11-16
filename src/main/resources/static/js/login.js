$(document).ready(function() {

    // 1. Enforce UPPERCASE typing in username
    $("#username").on("input", function() {
        const start = this.selectionStart;
        const end = this.selectionEnd;
        this.value = this.value.toUpperCase();
        if (start !== null && end !== null) {
            this.setSelectionRange(start, end);
        }
    });

    // 2. Interactive Password Show/Hide Toggle
    $("#togglePasswordBtn").on("click", function(e) {
        e.preventDefault();
        const pwdInput = $("#password");
        const eyeIcon = $("#eyeIcon");

        if (pwdInput.attr("type") === "password") {
            pwdInput.attr("type", "text");
            eyeIcon.removeClass("fa-eye-slash").addClass("fa-eye");
        } else {
            pwdInput.attr("type", "password");
            eyeIcon.removeClass("fa-eye").addClass("fa-eye-slash");
        }
        pwdInput.focus();
    });

    // 3. Caps Lock Indicator Detection
    $("#password").on("keyup keydown", function(e) {
        if (typeof e.originalEvent !== "undefined" && typeof e.originalEvent.getModifierState === "function") {
            const isCapsLock = e.originalEvent.getModifierState("CapsLock");
            if (isCapsLock) {
                $("#capsNotice").fadeIn(150);
            } else {
                $("#capsNotice").fadeOut(150);
            }
        }
    });

    // 4. Form Submission & Authentication
    $("#form1").on("submit", function(e) {
        e.preventDefault();

        const username = $("#username").val().trim();
        const password = $("#password").val();

        if (!username || !password) {
            showError("USERNAME AND PASSWORD ARE REQUIRED");
            return;
        }

        // Set Loading State on Button
        setButtonLoading(true);
        hideError();

        $.ajax({
            url: "api/loginPage/loginValidate",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                username: username,
                password: password
            }),
            success: function(response) {
                if (response && response.status === "OK") {
                    const authenticatedUser = response.data ? response.data.username : username;
                    sessionStorage.setItem("username", String(authenticatedUser).toUpperCase());

                    $("#btnSpinner").html('<i class="fa-solid fa-check me-1"></i> ACCESS GRANTED');
                    
                    const base = window.contextPath || (window.location.pathname.startsWith("/MicroFinance") ? "/MicroFinance" : "");
                    setTimeout(function() {
                        window.location.href = (base ? base : "") + "/openDashboard";
                    }, 400);

                } else {
                    setButtonLoading(false);
                    const msg = (response && response.message) ? response.message : "INVALID USERNAME OR PASSWORD";
                    showError(msg);
                }
            },
            error: function(xhr) {
                setButtonLoading(false);
                let errorMsg = "INVALID USERNAME OR PASSWORD";
                
                try {
                    if (xhr.responseJSON && xhr.responseJSON.message) {
                        errorMsg = xhr.responseJSON.message;
                    } else if (xhr.status === 400) {
                        errorMsg = "USERNAME AND PASSWORD ARE REQUIRED";
                    } else if (xhr.status === 401) {
                        errorMsg = "INVALID USERNAME OR PASSWORD";
                    } else if (xhr.status === 403) {
                        errorMsg = "ACCESS FORBIDDEN. PLEASE CONTACT ADMINISTRATOR";
                    } else if (xhr.status === 500) {
                        errorMsg = "SERVER COMMUNICATION ERROR. PLEASE TRY AGAIN";
                    }
                } catch (e) {
                    errorMsg = "SOMETHING WENT WRONG. TRY AGAIN";
                }

                showError(errorMsg);
            }
        });
    });

    // Helper: Show Alert Message
    function showError(msg) {
        const text = String(msg || "").toUpperCase();
        if ($("#errorText").length > 0) {
            $("#errorText").text(text);
        } else {
            $("#errorMsg").text(text);
        }
        $("#errorMsg").css("display", "flex").hide().fadeIn(200);
    }

    // Helper: Hide Alert Message
    function hideError() {
        $("#errorMsg").fadeOut(150);
    }

    // Helper: Toggle Button State
    function setButtonLoading(isLoading) {
        if (isLoading) {
            $("#btnText").hide();
            $("#btnSpinner").html('<i class="fa-solid fa-circle-notch fa-spin me-1"></i> AUTHENTICATING...').show();
            $("#submitBtn").prop("disabled", true);
        } else {
            $("#btnSpinner").hide();
            $("#btnText").show();
            $("#submitBtn").prop("disabled", false);
        }
    }
});
