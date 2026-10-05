package com.microfinance.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.microfinance.model.UserCreation;
import com.microfinance.model.UserModuleList;
import com.microfinance.model.UserSubModule;
import com.microfinance.model.UserToServiceMap;
import com.microfinance.repository.UserCreationRepo;
import com.microfinance.repository.UserModuleListRepo;
import com.microfinance.repository.UserSubModuleRepo;
import com.microfinance.repository.UserToServiceMapRepo;
import com.microfinance.service.UserCreationService;

@RestController
@RequestMapping("/api/userCreation")
public class UserCreationController {

	@Autowired
	private UserCreationService userCreationService;

	@Autowired
	private UserSubModuleRepo userSubModuleRepo;

	@Autowired
	private UserModuleListRepo UserModuleListRepo;

	@Autowired
	private UserToServiceMapRepo userToServiceMapRepo;

	@Autowired
	private UserCreationRepo userCreationRepo;

	@PostMapping("/saveUser")
	public ResponseEntity<?> saveUser(@RequestBody UserCreation userCreation) {
		if (userCreation != null) {
			userCreationService.save(userCreation); // ✅ use instance here
			return ResponseEntity.ok("User saved successfully!");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to save user!");
		}
	}

	@GetMapping("/getAllUsers")
	public ResponseEntity<List<UserCreation>> getAllUsers() {
		List<UserCreation> users = userCreationService.getAllUsers();
		return ResponseEntity.ok(users);
	}

	@GetMapping("/getAllServiceMap")
	public List<UserSubModule> getAllUserToServiceMap1(Model model) {
		List<UserSubModule> newList = new ArrayList<>();
		List<UserModuleList> modList = UserModuleListRepo.findAll();
		List<UserSubModule> submodList = userSubModuleRepo.findAll();

		submodList.forEach(submod -> {
			modList.forEach(mod -> {
				if (mod.getId() == Integer.parseInt(submod.getModule())) {
					UserSubModule subModule = new UserSubModule();
					subModule.setId(submod.getId());
					subModule.setModule(mod.getName());
					subModule.setName(submod.getName());
					newList.add(subModule);
				}
			});
		});

		return newList;
	}

	@PostMapping("/userToServiceMap")
	public String saveuserToServiceMap(@ModelAttribute UserToServiceMap userToServiceMap, Model model,
			HttpSession session) {
		/* String createdBy = session.getAttribute("ID").toString(); */

		UserToServiceMap obj = userToServiceMapRepo.findByuserName(userToServiceMap.getUserName());

		if (obj != null) {
			System.out.println("if");
			/* obj.setCreatedBy(createdBy); */
			obj.setModule(userToServiceMap.getModule());
			obj.setService(userToServiceMap.getService());
			obj.setUserName(userToServiceMap.getUserName());
			userToServiceMapRepo.save(obj);

		} else {
			System.out.println("else");

			/* userServiceMap.setCreatedBy(createdBy); */
			userToServiceMapRepo.save(userToServiceMap);
		}

		/* session.setAttribute("createdBy", createdBy); */
		return "preferences/customerMenuAccess";
	}
//
//	@GetMapping("/getAllUserData")
//	public List<UserCreation> getAllUserData() {
//		return userCreationService.findAll();
//	}

	// Delete User Manage by id

	@PostMapping("/deleteUserManageById")
	public ResponseEntity<String> deleteUserManageById(@RequestBody UserCreation userCreation) {
		try {
			userCreationService.deleteUserManageById(userCreation.getId());
			return ResponseEntity.status(HttpStatus.OK).body("Data Deleted Successfully..!!");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error Deleting Data");
		}
	}

	@GetMapping("/editUserManageById/{id}")
	public ResponseEntity<?> editUserManageById(@PathVariable Long id) {
		Optional<UserCreation> user = userCreationRepo.findById(id);

		if (user.isPresent()) {
			return ResponseEntity.ok(user.get());
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		}
	}

	@PostMapping("/updateUserManage/{id}")
	public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody UserCreation user) {
		boolean isUpdated = userCreationService.updateUser(id, user);
		if (isUpdated) {
			return ResponseEntity.ok("User updated successfully!");
		} else {
			return ResponseEntity.status(500).body("Error updating user");
		}
	}

	@PostMapping("/findTheUserIdByUserMasterService")
	public UserToServiceMap findTheUserIdByUserMasterService(@RequestBody UserToServiceMap userToServiceMap) {
		return userToServiceMapRepo.findByuserName(userToServiceMap.getUserName());
	}

}