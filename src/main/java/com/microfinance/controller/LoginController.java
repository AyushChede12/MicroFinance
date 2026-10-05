package com.microfinance.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.microfinance.dto.ApiResponse;
import com.microfinance.model.User;
import com.microfinance.service.UserService;

@RestController
@RequestMapping("/api/loginPage")
public class LoginController {

	@Autowired
	private UserService userService;

	@PostMapping("/loginValidate")
	public ApiResponse<User> login(@RequestBody User user, HttpSession session) {
		if (user.getUsername() == null || user.getPassword() == null) {
			return ApiResponse.error(HttpStatus.BAD_REQUEST, "Username and password are required");
		}

		User loginUser = userService.validateUser(user.getUsername(), user.getPassword());
		if (loginUser != null) {
			session.setAttribute("username", loginUser.getUsername()); // ✅ save in session
			return ApiResponse.success(HttpStatus.OK, "Login successful", loginUser);
		} else {
			return ApiResponse.error(HttpStatus.UNAUTHORIZED, "Invalid username or password");
		}
	}

	@GetMapping("/openDashboard")
	public String openDashboard(HttpSession session, Model model) {
		String username = (String) session.getAttribute("username");
		if (username == null) {
			return "redirect:/loginPage"; // not logged in → go back
		}
		model.addAttribute("customerUser", username); // ✅ pass to JSP
		return "dashboardPage/dashboard"; // dashboard.jsp
	}

}