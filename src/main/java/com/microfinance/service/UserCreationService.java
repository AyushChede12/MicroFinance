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

	@Autowired(required = false)
	private com.microfinance.repository.UserRepository userRepository;

	public void save(UserCreation userCreation) {
		userCreationRepo.save(userCreation);
		syncToUserRepository(userCreation);
	}

	public List<UserCreation> getAllUsers() {
		return userCreationRepo.findAll();
	}

	public void deleteUserManageById(long id) {
		userCreationRepo.findById(id).ifPresent(uc -> {
			if (userRepository != null && uc.getUserId() != null) {
				com.microfinance.model.User u = userRepository.findByUsername(uc.getUserId());
				if (u != null) {
					try {
						userRepository.delete(u);
					} catch (Exception ignored) {}
				}
			}
		});
		userCreationRepo.deleteById(id);
	}

	public boolean updateUser(Long id, UserCreation user) {
		if (userCreationRepo.existsById(id)) {
			user.setId(id); // Ensure the ID is set to the existing user ID
			userCreationRepo.save(user);
			syncToUserRepository(user);
			return true;
		} else {
			return false;
		}
	}

	private void syncToUserRepository(UserCreation userCreation) {
		if (userRepository != null && userCreation != null && userCreation.getUserId() != null) {
			try {
				com.microfinance.model.User u = userRepository.findByUsername(userCreation.getUserId());
				if (u == null) {
					u = new com.microfinance.model.User();
					u.setUsername(userCreation.getUserId());
				}
				u.setPassword(userCreation.getPassword());
				userRepository.save(u);
			} catch (Exception ignored) {}
		}
	}
}