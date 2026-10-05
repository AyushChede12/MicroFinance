<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Error</title>
    <style>
        body {
            font-family: Tahoma, Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .error-container {
            max-width: 600px;
            margin: 100px auto;
            background: #525D76;
            color: white;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
        }
        h1 { font-size: 32px; margin-bottom: 10px; }
        h2 { font-size: 20px; margin-bottom: 20px; }
        p { font-size: 14px; }
        a { color: #ffd700; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="error-container">
        <h1>Oops! Something went wrong.</h1>
        <h2>HTTP Status: <%= request.getAttribute("javax.servlet.error.status_code") %></h2>
        <p><b>Message:</b> <%= request.getAttribute("javax.servlet.error.message") %></p>
        <p><a href="<%= request.getContextPath() %>/">Go back to Home</a></p>
    </div>
</body>
</html>
