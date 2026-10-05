package com.microfinance.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.microfinance.model.ManageDepartment;
import com.microfinance.model.ManageDesignation;
import com.microfinance.model.TeamMember;
import com.microfinance.repository.DepartmentRepo;
import com.microfinance.repository.DesignationRepo;
import com.microfinance.repository.TeamMemberRepo;

@Service
public class TeamManagementService {
	@Autowired
	DesignationRepo designationRepo;
	
	@Autowired
	DepartmentRepo departmentRepo;
	
	@Autowired
	TeamMemberRepo teamMemberRepo;

	public ManageDesignation saveDesignation(ManageDesignation manageDesignation) {
		// TODO Auto-generated method stub
		return designationRepo.save(manageDesignation);
	}

	public ManageDepartment saveDepartment(ManageDepartment manageDepartment) {
		// TODO Auto-generated method stub
		return departmentRepo.save(manageDepartment);
	}

	public List<ManageDesignation> fetchDesignationList() {
		// TODO Auto-generated method stub
		return designationRepo.findAll();
	}

	public List<ManageDepartment> fetchDepartmentList() {
		// TODO Auto-generated method stub
		return departmentRepo.findAll();
	}

	public TeamMember saveTeamMember(TeamMember teamMember) {
		// TODO Auto-generated method stub
		return teamMemberRepo.save(teamMember);
	}

	public List<TeamMember> findByteamMemberCode(String teamMemberCode) {
		// TODO Auto-generated method stub
		return teamMemberRepo.findByteamMemberCode(teamMemberCode);
	}

	public List<TeamMember> fetchAllteamMember() {
		// TODO Auto-generated method stub
		return teamMemberRepo.findAll();
	}

	public long getMaxId() {
		// TODO Auto-generated method stub
		return teamMemberRepo.getMaxId();
	}

	

}
