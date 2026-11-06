package com.microfinance.config;

import java.io.File;
import java.util.LinkedHashSet;
import java.util.Set;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import com.microfinance.interceptor.ActivityInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Autowired
	private ActivityInterceptor activityInterceptor;

	@Value("${upload.directory:}")
	private String uploadDirectory;

	@Autowired(required = false)
	private ServletContext servletContext;

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(activityInterceptor).addPathPatterns("/api/**");
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		Set<String> uploadLocations = new LinkedHashSet<>();

		// 1. Dynamic ServletContext real path (works on Tomcat/Jetty on any OS: Linux, Windows, etc.)
		try {
			if (servletContext != null) {
				String realPath = servletContext.getRealPath("/Uploads");
				if (realPath != null) {
					File dir = new File(realPath);
					String uriStr = dir.toURI().toString();
					if (!uriStr.endsWith("/")) {
						uriStr += "/";
					}
					uploadLocations.add(uriStr);
				}
			}
		} catch (Exception ignored) {
		}

		// 2. Configured upload.directory from application.properties or environment variable
		if (uploadDirectory != null && !uploadDirectory.trim().isEmpty()) {
			String configuredPath = uploadDirectory.trim().replace('\\', '/');
			if (!configuredPath.endsWith("/")) {
				configuredPath += "/";
			}
			if (configuredPath.startsWith("file:") || configuredPath.startsWith("classpath:")) {
				uploadLocations.add(configuredPath);
			} else if (configuredPath.matches("^[a-zA-Z]:/.*")) {
				// Windows absolute path: file:///D:/...
				uploadLocations.add("file:///" + configuredPath);
				uploadLocations.add("file:" + configuredPath);
			} else if (configuredPath.startsWith("/")) {
				// Linux / Unix absolute path: file:/opt/...
				uploadLocations.add("file:" + configuredPath);
			} else {
				uploadLocations.add("file:" + configuredPath);
			}
		}

		// 3. Fallback paths for Linux Live Server (Tomcat / opt)
		uploadLocations.add("file:/opt/tomcat/webapps/MicroFinance/Uploads/");
		uploadLocations.add("file:/opt/tomcat/webapps/ROOT/Uploads/");
		uploadLocations.add("file:/opt/uploads/");
		uploadLocations.add("file:/var/uploads/");

		// 4. Fallback paths for Local Windows Development
		uploadLocations.add("file:D:/Microfinance/MicroFinance/src/main/webapp/Uploads/");
		uploadLocations.add("file:///D:/Microfinance/MicroFinance/src/main/webapp/Uploads/");
		uploadLocations.add("file:C:/Microfinance/MicroFinance/src/main/webapp/Uploads/");

		// 5. Context path relative (WAR webapp root)
		uploadLocations.add("/Uploads/");

		// 6. Classpath static fallback (bundled inside WAR/JAR classes/static)
		uploadLocations.add("classpath:/static/Uploads/");
		uploadLocations.add("classpath:/static/images/");
		uploadLocations.add("classpath:/static/images/upload/");
		uploadLocations.add("classpath:/static/");

		// Register /Uploads/**
		registry.addResourceHandler("/Uploads/**")
				.addResourceLocations(uploadLocations.toArray(new String[0]));

		// Register /images/** for direct image lookups
		registry.addResourceHandler("/images/**")
				.addResourceLocations(
						"classpath:/static/images/",
						"classpath:/static/images/upload/",
						"classpath:/static/Uploads/",
						"/Uploads/",
						"file:/opt/tomcat/webapps/MicroFinance/Uploads/",
						"file:D:/Microfinance/MicroFinance/src/main/webapp/Uploads/"
				);

		// Register /static/**
		registry.addResourceHandler("/static/**")
				.addResourceLocations("classpath:/static/");
	}
	
}
