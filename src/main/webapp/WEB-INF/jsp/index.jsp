<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SECURE LOGIN | MICROFINANCE BANKING SYSTEM</title>

    <!-- Google Fonts: Poppins -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- FontAwesome & Bootstrap Icons -->
    <script src="https://kit.fontawesome.com/ae73087723.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #0a192f;
            background-image: 
                radial-gradient(circle at 15% 20%, rgba(56, 189, 248, 0.15) 0%, transparent 40%),
                radial-gradient(circle at 85% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 40%),
                url('${pageContext.request.contextPath}/images/login-bg.svg'),
                url('images/login-bg.svg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            padding: 20px;
            font-size: 13px;
            color: #1e293b;
        }

        .login-wrapper {
            width: 100%;
            max-width: 390px;
            animation: fadeInScale 0.45s ease-out;
        }

        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.97) translateY(12px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }

        .login-card {
            background: rgba(255, 255, 255, 0.97);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-radius: 14px;
            padding: 32px 30px 26px;
            box-shadow: 
                0 25px 50px -12px rgba(2, 6, 23, 0.55),
                0 0 0 1px rgba(255, 255, 255, 0.35);
            border: 1px solid rgba(226, 232, 240, 0.8);
        }

        /* Bank Emblem & Header */
        .brand-header {
            text-align: center;
            margin-bottom: 24px;
        }

        .bank-badge {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #002147 0%, #0d6efd 100%);
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-size: 20px;
            box-shadow: 0 8px 18px rgba(13, 110, 253, 0.3);
            margin-bottom: 12px;
        }

        .brand-title {
            font-size: 16px;
            font-weight: 700;
            color: #002147;
            letter-spacing: 0.8px;
            text-transform: uppercase;
            line-height: 1.3;
        }

        .brand-subtitle {
            font-size: 11px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            margin-top: 3px;
        }

        .header-divider {
            height: 2px;
            width: 38px;
            background: #0d6efd;
            border-radius: 2px;
            margin: 10px auto 0;
        }

        /* Error Alert Box */
        .login-alert {
            display: none;
            background: #fef2f2;
            border: 1px solid #fecaca;
            color: #b91c1c;
            border-radius: 8px;
            padding: 9px 12px;
            font-size: 11.5px;
            font-weight: 600;
            text-transform: uppercase;
            margin-bottom: 16px;
            align-items: center;
            gap: 8px;
            animation: shake 0.3s ease-in-out;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            75% { transform: translateX(4px); }
        }

        /* Input Groups */
        .form-group {
            margin-bottom: 16px;
            text-align: left;
        }

        .form-label {
            display: block;
            font-size: 11.5px;
            font-weight: 600;
            color: #334155;
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 0.4px;
        }

        .input-box {
            position: relative;
            display: flex;
            align-items: center;
        }

        .input-icon {
            position: absolute;
            left: 12px;
            color: #94a3b8;
            font-size: 13px;
            pointer-events: none;
            transition: color 0.2s ease;
        }

        .input-field {
            width: 100%;
            height: 38px;
            padding: 0 38px 0 36px;
            font-size: 12.5px;
            font-weight: 500;
            color: #0f172a;
            background: #ffffff;
            border: 1.5px solid #cbd5e1;
            border-radius: 8px;
            outline: none;
            transition: all 0.2s ease;
        }

        .input-field:focus {
            border-color: #0d6efd;
            box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.12);
            background: #ffffff;
        }

        .input-box:focus-within .input-icon {
            color: #0d6efd;
        }

        .input-field#username {
            text-transform: uppercase;
        }

        .toggle-password-btn {
            position: absolute;
            right: 10px;
            background: none;
            border: none;
            color: #94a3b8;
            cursor: pointer;
            padding: 6px;
            font-size: 13px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            transition: color 0.2s ease;
        }

        .toggle-password-btn:hover {
            color: #0d6efd;
        }

        .caps-notice {
            display: none;
            color: #d97706;
            font-size: 10.5px;
            font-weight: 600;
            margin-top: 4px;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }

        /* Submit Button */
        .submit-btn {
            width: 100%;
            height: 40px;
            background: linear-gradient(135deg, #002147 0%, #0d6efd 100%);
            color: #ffffff;
            border: none;
            border-radius: 8px;
            font-size: 12.5px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            cursor: pointer;
            box-shadow: 0 6px 16px rgba(13, 110, 253, 0.28);
            transition: all 0.25s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-top: 20px;
        }

        .submit-btn:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 8px 20px rgba(13, 110, 253, 0.38);
            background: linear-gradient(135deg, #001a38 0%, #0b5ed7 100%);
        }

        .submit-btn:active:not(:disabled) {
            transform: translateY(1px);
            box-shadow: 0 4px 10px rgba(13, 110, 253, 0.2);
        }

        .submit-btn:disabled {
            opacity: 0.75;
            cursor: not-allowed;
        }

        /* Card Footer */
        .login-footer {
            margin-top: 22px;
            padding-top: 16px;
            border-top: 1px dashed #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            font-size: 10.5px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.4px;
        }

        .login-footer i {
            color: #10b981;
            font-size: 12px;
        }
    </style>
</head>

<body>
    <div class="login-wrapper">
        <div class="login-card">
            <!-- Brand Crest & Header -->
            <div class="brand-header">
                <div class="bank-badge">
                    <i class="fa-solid fa-building-columns"></i>
                </div>
                <div class="brand-title">MICROFINANCE BANKING</div>
                <div class="brand-subtitle">SECURE CORE PORTAL ACCESS</div>
                <div class="header-divider"></div>
            </div>

            <!-- Error Notification Alert Box -->
            <div id="errorMsg" class="login-alert">
                <i class="fa-solid fa-circle-exclamation"></i>
                <span id="errorText"></span>
            </div>

            <!-- Login Form -->
            <form id="form1" autocomplete="off">
                <!-- Username Field -->
                <div class="form-group">
                    <label for="username" class="form-label">USERNAME</label>
                    <div class="input-box">
                        <i class="fa-solid fa-user input-icon"></i>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            class="input-field" 
                            placeholder="ENTER YOUR USERNAME" 
                            required 
                            autofocus 
                            autocomplete="username"
                        />
                    </div>
                </div>

                <!-- Password Field -->
                <div class="form-group">
                    <label for="password" class="form-label">PASSWORD</label>
                    <div class="input-box">
                        <i class="fa-solid fa-lock input-icon"></i>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            class="input-field" 
                            placeholder="ENTER YOUR PASSWORD" 
                            required 
                            autocomplete="current-password"
                        />
                        <button type="button" class="toggle-password-btn" id="togglePasswordBtn" title="SHOW/HIDE PASSWORD" tabindex="-1">
                            <i class="fa-solid fa-eye-slash" id="eyeIcon"></i>
                        </button>
                    </div>
                    <div id="capsNotice" class="caps-notice">
                        <i class="fa-solid fa-triangle-exclamation"></i> CAPS LOCK IS ON
                    </div>
                </div>

                <!-- Submit Button -->
                <button type="submit" id="submitBtn" class="submit-btn">
                    <span id="btnText">
                        <i class="fa-solid fa-arrow-right-to-bracket me-1"></i> SECURE SIGN IN
                    </span>
                    <span id="btnSpinner" style="display: none;">
                        <i class="fa-solid fa-circle-notch fa-spin me-1"></i> AUTHENTICATING...
                    </span>
                </button>
            </form>

            <!-- Security Footer -->
            <div class="login-footer">
                <i class="fa-solid fa-shield-halved"></i>
                <span>256-BIT SSL ENCRYPTED CONNECTION</span>
            </div>
        </div>
    </div>

    <!-- Script Configuration -->
    <script>
        window.contextPath = '${pageContext.request.contextPath}';

        $(document).ready(function() {
            // Global AJAX Prefilter: Resolves API URLs across root ('/') and context paths ('/MicroFinance')
            if (window.jQuery) {
                jQuery.ajaxPrefilter(function(options) {
                    const ctx = "${pageContext.request.contextPath}";
                    let url = options.url;
                    if (url && typeof url === "string") {
                        if (url.startsWith("api/")) {
                            options.url = (ctx ? ctx : "") + "/" + url;
                        } else if (url.startsWith("./api/")) {
                            options.url = (ctx ? ctx : "") + "/" + url.substring(2);
                        } else if (url.startsWith("/api/") && ctx && !url.startsWith(ctx + "/api/")) {
                            options.url = ctx + url;
                        }
                    }
                });
            }

            // Fallback for background image in live server environments
            var testBg = new Image();
            testBg.onerror = function() {
                var fallbacks = [
                    '${pageContext.request.contextPath}/Uploads/login-bg.svg',
                    '${pageContext.request.contextPath}/Uploads/bgimageLogin.png',
                    'Uploads/login-bg.svg',
                    'images/login-bg.svg'
                ];
                function tryNext(i) {
                    if (i >= fallbacks.length) return;
                    var img = new Image();
                    img.onload = function() {
                        $('body').css('background-image', 'url(' + fallbacks[i] + ')');
                    };
                    img.onerror = function() { tryNext(i + 1); };
                    img.src = fallbacks[i];
                }
                tryNext(0);
            };
            testBg.src = '${pageContext.request.contextPath}/images/login-bg.svg';
        });
    </script>
    <script src="${pageContext.request.contextPath}/js/login.js"></script>
</body>
</html>
