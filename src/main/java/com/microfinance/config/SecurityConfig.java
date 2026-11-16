package com.microfinance.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 1. Enable CORS & Disable CSRF so existing AJAX operations execute seamlessly in Live Mode
            .cors().and()
            .csrf().disable()

            // 2. Allow X-Frame-Options sameOrigin so document printing, modals, and previews operate smoothly
            .headers()
                .frameOptions().sameOrigin()
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

