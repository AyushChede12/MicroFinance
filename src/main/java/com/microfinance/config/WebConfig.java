package com.microfinance.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import com.microfinance.interceptor.ActivityInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Autowired
	private ActivityInterceptor activityInterceptor;

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(activityInterceptor).addPathPatterns("/api/**");
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/Uploads/**")
				.addResourceLocations("file:D:/UpdatedMicroFinance/UpdatedMicroFinance/src/main/webapp/Uploads/");
	}
	
}
