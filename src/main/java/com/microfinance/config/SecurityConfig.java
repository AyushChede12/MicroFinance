package com.microfinance.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.web.filter.ForwardedHeaderFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Extracts X-Forwarded-Proto, X-Forwarded-Host, X-Forwarded-Port
     * so Spring Boot transparently recognizes HTTPS when behind Nginx/Cloudflare reverse proxies.
     */
    @Bean
    public ForwardedHeaderFilter forwardedHeaderFilter() {
        return new ForwardedHeaderFilter();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 1. Enable CORS & Disable CSRF so existing AJAX operations execute seamlessly across Localhost & Live Mode
            .cors().and()
            .csrf().disable()

            // 2. Comprehensive Security Headers for HTTPS & Safe Browsing
            .headers()
                // Prevent clickjacking while supporting same-origin frames, modals, and report printing
                .frameOptions().sameOrigin()
                // Enforce HTTPS Strict Transport Security (HSTS) - 1 year duration
                .httpStrictTransportSecurity()
                    .includeSubDomains(true)
                    .maxAgeInSeconds(31536000)
                    .and()
                // Prevent MIME-sniffing
                .contentTypeOptions()
                    .and()
                // Enable browser XSS protection filter
                .xssProtection()
                    .and()
                // Referrer-Policy header
                .referrerPolicy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN)
                    .and()
            .and()

            // 3. Session Management - Maintain session states across local and live environments
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            .and()

            // 4. Request Authorization - Permit static assets, login flows, and banking controllers
            .authorizeRequests()
                .antMatchers(
                    "/",
                    "/loginPage",
                    "/index.jsp",
                    "/api/loginPage/**",
                    "/css/**",
                    "/js/**",
                    "/images/**",
                    "/Uploads/**",
                    "/static/**",
                    "/fonts/**",
                    "/webjars/**",
                    "/favicon.ico",
                    "/**"
                ).permitAll()
                .anyRequest().permitAll()
            .and()

            // 5. Clean session logout
            .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/loginPage")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .permitAll();

        return http.build();
    }
}
