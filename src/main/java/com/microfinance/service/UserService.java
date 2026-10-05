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

	public User save(User user) {
		return repo.save(user);
	}

	public User validateUser(String username, String password) {
		// Fetch user by username & password
		return repo.findByUsernameAndPassword(username, password).orElse(null);
	}

}