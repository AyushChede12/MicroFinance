package com.microfinance.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.microfinance.dto.ApiResponse;
import com.microfinance.model.BranchModule;
import com.microfinance.model.ManageDepartment;
import com.microfinance.model.ManageDesignation;
import com.microfinance.model.RelativeModule;
import com.microfinance.model.TeamMember;
import com.microfinance.service.TeamManagementService;

@RestController
@RequestMapping("/api/teammember")
public class TeamManagementController {

	@Autowired
	TeamManagementService teamService;

	// ManageDesignation Module - Janvi
	@PostMapping("/saveDesignation")
	public ResponseEntity<String> saveDesignation(@RequestBody ManageDesignation manageDesignation) {
		ManageDesignation designation = teamService.saveDesignation(manageDesignation);
		if (designation != null)
			return ResponseEntity.ok("success");
		else
			return ResponseEntity.badRequest().body("Failure");
	}

	// Get Designation List - Janvi
	@GetMapping("/getDesignationList")
	public List<ManageDesignation> fetchDesignationList() {
		List<ManageDesignation> list = teamService.fetchDesignationList();
		return list;
	}

	// ManageDepartment Module - Janvi
	@PostMapping("/saveDepartment")
	public ResponseEntity<String> saveDepartment(@RequestBody ManageDepartment manageDepartment) {
		ManageDepartment department = teamService.saveDepartment(manageDepartment);
		if (department != null)
			return ResponseEntity.ok("success");
		else
			return ResponseEntity.badRequest().body("Failure");
	}

	// Get Department List - Janvi
	@GetMapping("/getDepartmentList")
	public List<ManageDepartment> fetchDepartmentList() {
		List<ManageDepartment> list = teamService.fetchDepartmentList();
		return list;
	}

	// Save Team Member - Janvi
	@PostMapping("/saveTeamMember")
	public ResponseEntity<TeamMember> saveTeamMember(@RequestBody TeamMember teamMember) {
		// The 'isActive' value is already passed as 1 or 0, so no need to convert
		// If it's not passed as expected, you can still set it as a fallback
		if (teamMember.getCustomerStatus() == 0 || teamMember.getCustomerStatus() == 1) {
			teamMember.setCustomerStatus(teamMember.getCustomerStatus()); // Set 1 for active, 0 for inactive
		} else {
			teamMember.setCustomerStatus(0); // Default to 0 if invalid value
		}

		TeamMember savedEntry = teamService.saveTeamMember(teamMember);
		return new ResponseEntity<>(savedEntry, HttpStatus.CREATED);
	}

	@PostMapping("/fetchTeamMemberDataByCode")
	public List<TeamMember> fetchAddMemberDataByCode(@RequestBody TeamMember teamMember) {
		List<TeamMember> list = teamService.findByteamMemberCode(teamMember.getTeamMemberCode());
		return list;
	}

	@GetMapping("/getAllteamMember") // Janvi
	public ResponseEntity<ApiResponse<List<TeamMember>>> fetchAllteamMember() {
		List<TeamMember> list = teamService.fetchAllteamMember();
		ApiResponse<List<TeamMember>> response = new ApiResponse<>(HttpStatus.FOUND, "Team Member fetched successfully",
				list);
		return ResponseEntity.ok(response);
	}

}
