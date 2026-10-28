package com.microfinance.service;

import com.microfinance.model.User;
import com.microfinance.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

	@Autowired
	private UserRepository repo;

	@Autowired(required = false)
	private com.microfinance.repository.UserCreationRepo userCreationRepo;

	public User save(User user) {
		return repo.save(user);
	}

	public User validateUser(String username, String password) {
		// 1. Check UserRepository
		User user = repo.findByUsernameAndPassword(username, password).orElse(null);
		if (user != null) {
			return user;
		}

		// 2. Also check UserCreation table for users created through UserCreation form
		if (userCreationRepo != null) {
			com.microfinance.model.UserCreation uc = userCreationRepo.fetchMatchedData(username, password);
			if (uc != null && (uc.getUserStatus() == null || !"Inactive".equalsIgnoreCase(uc.getUserStatus()))) {
				User createdUser = new User();
				createdUser.setId(uc.getId());
				createdUser.setUsername(uc.getUserId());
				createdUser.setPassword(uc.getPassword());
				try {
					repo.save(createdUser);
				} catch (Exception ignored) {}
				return createdUser;
			}
		}

		return null;
	}

}