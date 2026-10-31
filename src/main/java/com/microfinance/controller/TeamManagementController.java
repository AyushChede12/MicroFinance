package com.microfinance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.microfinance.dto.ApiResponse;
import com.microfinance.model.ManageDepartment;
import com.microfinance.model.ManageDesignation;
import com.microfinance.model.TeamMember;
import com.microfinance.model.addFinancialConsultant;
import com.microfinance.service.TeamManagementService;

@RestController
@RequestMapping("/api/teammember")
public class TeamManagementController {

	@Autowired
	private TeamManagementService teamService;

	// Manage Designation
	@PostMapping("/saveDesignation")
	public ResponseEntity<ApiResponse<ManageDesignation>> saveDesignation(@RequestBody ManageDesignation manageDesignation) {
		ManageDesignation saved = teamService.saveDesignation(manageDesignation);
		if (saved != null) {
			ApiResponse<ManageDesignation> res = new ApiResponse<>(HttpStatus.OK, "DESIGNATION SAVED SUCCESSFULLY", saved);
			return ResponseEntity.ok(res);
		} else {
			ApiResponse<ManageDesignation> res = new ApiResponse<>(HttpStatus.BAD_REQUEST, "FAILED TO SAVE DESIGNATION", null);
			return ResponseEntity.badRequest().body(res);
		}
	}

	@GetMapping("/getDesignationList")
	public List<ManageDesignation> fetchDesignationList() {
		return teamService.fetchDesignationList();
	}

	@DeleteMapping("/deleteDesignation")
	public ResponseEntity<ApiResponse<String>> deleteDesignation(@RequestParam("id") Long id) {
		teamService.deleteDesignation(id);
		ApiResponse<String> res = new ApiResponse<>(HttpStatus.OK, "DESIGNATION DELETED SUCCESSFULLY", "SUCCESS");
		return ResponseEntity.ok(res);
	}

	// Manage Department
	@PostMapping("/saveDepartment")
	public ResponseEntity<ApiResponse<ManageDepartment>> saveDepartment(@RequestBody ManageDepartment manageDepartment) {
		ManageDepartment saved = teamService.saveDepartment(manageDepartment);
		if (saved != null) {
			ApiResponse<ManageDepartment> res = new ApiResponse<>(HttpStatus.OK, "DEPARTMENT SAVED SUCCESSFULLY", saved);
			return ResponseEntity.ok(res);
		} else {
			ApiResponse<ManageDepartment> res = new ApiResponse<>(HttpStatus.BAD_REQUEST, "FAILED TO SAVE DEPARTMENT", null);
			return ResponseEntity.badRequest().body(res);
		}
	}

	@GetMapping("/getDepartmentList")
	public List<ManageDepartment> fetchDepartmentList() {
		return teamService.fetchDepartmentList();
	}

	@DeleteMapping("/deleteDepartment")
	public ResponseEntity<ApiResponse<String>> deleteDepartment(@RequestParam("id") Long id) {
		teamService.deleteDepartment(id);
		ApiResponse<String> res = new ApiResponse<>(HttpStatus.OK, "DEPARTMENT DELETED SUCCESSFULLY", "SUCCESS");
		return ResponseEntity.ok(res);
	}

	// Save Team Member
	@PostMapping("/saveTeamMember")
	public ResponseEntity<TeamMember> saveTeamMember(@RequestBody TeamMember teamMember) {
		if (teamMember.getCustomerStatus() != 0 && teamMember.getCustomerStatus() != 1) {
			teamMember.setCustomerStatus(0);
		}
		TeamMember savedEntry = teamService.saveTeamMember(teamMember);
		return new ResponseEntity<>(savedEntry, HttpStatus.CREATED);
	}

	@DeleteMapping("/deleteTeamMember")
	public ResponseEntity<ApiResponse<String>> deleteTeamMember(@RequestParam("id") Long id) {
		teamService.deleteTeamMember(id);
		ApiResponse<String> res = new ApiResponse<>(HttpStatus.OK, "TEAM MEMBER DELETED SUCCESSFULLY", "SUCCESS");
		return ResponseEntity.ok(res);
	}

	@PostMapping("/fetchTeamMemberDataByCode")
	public List<TeamMember> fetchAddMemberDataByCode(@RequestBody TeamMember teamMember) {
		return teamService.findByteamMemberCode(teamMember.getTeamMemberCode());
	}

	@GetMapping("/getTeamMemberByCode")
	public ResponseEntity<ApiResponse<TeamMember>> getTeamMemberByCode(@RequestParam("teamMemberCode") String teamMemberCode) {
		List<TeamMember> list = teamService.findByteamMemberCode(teamMemberCode);
		if (list != null && !list.isEmpty()) {
			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "TEAM MEMBER FOUND", list.get(0)));
		}
		return ResponseEntity.ok(new ApiResponse<>(HttpStatus.NOT_FOUND, "TEAM MEMBER NOT FOUND", null));
	}

	@GetMapping("/getAllteamMember")
	public ResponseEntity<ApiResponse<List<TeamMember>>> fetchAllteamMember() {
		List<TeamMember> list = teamService.fetchAllteamMember();
		ApiResponse<List<TeamMember>> response = new ApiResponse<>(HttpStatus.FOUND, "TEAM MEMBERS FETCHED SUCCESSFULLY", list);
		return ResponseEntity.ok(response);
	}

	// Connected Financial Consultants by Team Member Code
	@GetMapping("/getConsultantsByTeamMemberCode")
	public ResponseEntity<ApiResponse<List<addFinancialConsultant>>> getConsultantsByTeamMemberCode(
			@RequestParam("teamMemberCode") String teamMemberCode) {
		List<addFinancialConsultant> list = teamService.getConsultantsByTeamMemberCode(teamMemberCode);
		ApiResponse<List<addFinancialConsultant>> response = new ApiResponse<>(HttpStatus.OK,
				"CONNECTED FINANCIAL CONSULTANTS FETCHED SUCCESSFULLY", list);
		return ResponseEntity.ok(response);
	}

	// Search Team Members with Filters
	@PostMapping("/searchTeamMember")
	public ResponseEntity<ApiResponse<List<TeamMember>>> searchTeamMember(@RequestBody(required = false) TeamMember filter) {
		List<TeamMember> list = teamService.searchTeamMember(filter);
		ApiResponse<List<TeamMember>> response = new ApiResponse<>(HttpStatus.OK,
				"TEAM MEMBERS RETRIEVED SUCCESSFULLY", list);
		return ResponseEntity.ok(response);
	}

}
