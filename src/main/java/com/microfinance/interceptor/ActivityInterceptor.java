package com.microfinance.interceptor;

import java.time.LocalDateTime;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import com.microfinance.model.ActivityLog;
import com.microfinance.repository.ActivityLogRepository;

@Component
public class ActivityInterceptor implements HandlerInterceptor {

    @Autowired
    private ActivityLogRepository activityLogRepository;

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        String uri = request.getRequestURI();
        
        // Log API requests
        if (uri.startsWith("/api/")) {
            String method = request.getMethod();
            
            // Log mutating methods (POST, PUT, DELETE) and login validate
            boolean isMutating = "POST".equalsIgnoreCase(method) || "PUT".equalsIgnoreCase(method) || "DELETE".equalsIgnoreCase(method);
            boolean isLogin = uri.contains("/loginValidate");
            
            if (isMutating || isLogin) {
                HttpSession session = request.getSession(false);
                String username = "Anonymous";
                if (session != null && session.getAttribute("username") != null) {
                    username = (String) session.getAttribute("username");
                }
                
                String action = getActionName(uri, method);
                String details = getDetails(uri, method, request, response);
                
                ActivityLog log = new ActivityLog();
                log.setTimestamp(LocalDateTime.now());
                log.setUsername(username);
                log.setAction(action);
                log.setDetails(details);
                log.setIpAddress(request.getRemoteAddr());
                log.setStatus(response.getStatus() >= 200 && response.getStatus() < 300 ? "SUCCESS" : "FAILURE");
                log.setMethod(method);
                log.setUrl(uri);
                
                activityLogRepository.save(log);
            }
        }
    }

    private String getActionName(String uri, String method) {
        if (uri.contains("/loginValidate")) {
            return "User Login";
        }
        if (uri.contains("/customermanagement/saveOrUpdateCustomer")) {
            return "Save/Update Customer";
        }
        if (uri.contains("/customermanagement/verifyFetchedData")) {
            return "Verify Customer";
        }
        if (uri.contains("/customersavings/savescheme")) {
            return "Create/Update Savings Scheme";
        }
        if (uri.contains("/customersavings/fetchCustomerCode")) {
            return "Fetch Customer Code";
        }
        if (uri.contains("/customersavings/saveSavingAccountActivityData")) {
            return "Save Savings Activity";
        }
        if (uri.contains("/customersavings/saveSavingAccountCloser")) {
            return "Close Savings Account";
        }
        if (uri.contains("/customersavings/savesavingAccountFundTransfer")) {
            return "Transfer Savings Fund";
        }
        
        // General fallback
        String[] parts = uri.split("/");
        if (parts.length > 2) {
            String component = parts[parts.length - 2];
            String endpoint = parts[parts.length - 1];
            // Format nicer component names
            if (!component.isEmpty()) {
                component = component.substring(0, 1).toUpperCase() + component.substring(1);
            }
            if (!endpoint.isEmpty()) {
                endpoint = endpoint.substring(0, 1).toUpperCase() + endpoint.substring(1);
            }
            return component + " - " + endpoint;
        }
        return method + " " + uri;
    }

    private String getDetails(String uri, String method, HttpServletRequest request, HttpServletResponse response) {
        StringBuilder sb = new StringBuilder();
        sb.append("URL: ").append(uri).append(" (").append(method).append(")");
        
        if (request.getQueryString() != null) {
            sb.append("?").append(request.getQueryString());
        }
        
        // Spring MVC exception check
        Exception ex = (Exception) request.getAttribute("org.springframework.web.servlet.DispatcherServlet.EXCEPTION");
        if (ex != null) {
            sb.append(" | Exception: ").append(ex.getMessage());
        } else if (response.getStatus() >= 400) {
            sb.append(" | Status: ").append(response.getStatus());
        } else {
            sb.append(" | Processed successfully");
        }
        
        return sb.toString();
    }
}
