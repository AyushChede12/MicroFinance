package com.microfinance.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.microfinance.model.UserCreation;
import com.microfinance.repository.UserCreationRepo;

@Service
public class UserCreationService {

	@Autowired
	private UserCreationRepo userCreationRepo;

	public void save(UserCreation userCreation) {
		// TODO Auto-generated method stub
		userCreationRepo.save(userCreation);
	}

	public List<UserCreation> getAllUsers() {
		// TODO Auto-generated method stub
		return userCreationRepo.findAll();
	}

	public void deleteUserManageById(long id) {
		// TODO Auto-generated method stub
		userCreationRepo.deleteById(id);

	}

	public boolean updateUser(Long id, UserCreation user) {
		if (userCreationRepo.existsById(id)) {
			user.setId(id); // Ensure the ID is set to the existing user ID
			userCreationRepo.save(user);
			return true;
		} else {
			return false;
		}
	}

}