package com.microfinance.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Normalizes requests when the application is hosted behind an Nginx reverse proxy
 * that forwards the root path '/' to '/MicroFinance/'.
 *
 * When clients request URLs like '/MicroFinance/openDashboard' or '/MicroFinance/css/admin.css'
 * on the live server, Nginx forwards them as '/MicroFinance/MicroFinance/...', resulting in a 404.
 * This filter detects the duplicated context path and transparently forwards to the correct handler,
 * guaranteeing 100% compatibility across both localhost (direct context path) and live HTTPS.
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ReverseProxyPathFilter extends OncePerRequestFilter {

    private static final String PREFIX = "/MicroFinance";
    private static final String PREFIX_LOWER = "/microfinance";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String servletPath = request.getServletPath();

        if (servletPath != null) {
            String lower = servletPath.toLowerCase();
            if (lower.startsWith(PREFIX_LOWER)) {
                String stripped = servletPath.substring(PREFIX.length());
                if (stripped.isEmpty() || stripped.equals("/")) {
                    stripped = "/";
                }
                if (request.getPathInfo() != null) {
                    stripped += request.getPathInfo();
                }
                if (request.getQueryString() != null && !request.getQueryString().trim().isEmpty()) {
                    stripped += "?" + request.getQueryString();
                }

                request.getRequestDispatcher(stripped).forward(request, response);
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}
