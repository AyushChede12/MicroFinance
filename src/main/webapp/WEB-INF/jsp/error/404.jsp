<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>404 - PAGE NOT FOUND</title>
    <style>
        body {
            font-family: Tahoma, Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-transform: uppercase;
        }
        .error-container {
            max-width: 600px;
            margin: 80px auto;
            background: #ffffff;
            color: #333333;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            text-align: center;
            border-top: 5px solid #ffc107;
        }
        h1 { font-size: 24px; margin-bottom: 12px; color: #ff9800; }
        h2 { font-size: 16px; margin-bottom: 15px; color: #666666; }
        p { font-size: 13px; line-height: 1.6; color: #555555; }
        a { color: #007bff; text-decoration: none; font-weight: bold; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="error-container">
        <h1>404 - PAGE NOT FOUND</h1>
        <h2>${error != null ? error : 'THE REQUESTED RESOURCE COULD NOT BE FOUND'}</h2>
        <p><a href="${pageContext.request.contextPath}/openDashboard">RETURN TO DASHBOARD</a></p>
    </div>
</body>
</html>
