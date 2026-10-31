package com.microfinance.service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.microfinance.model.ManageDepartment;
import com.microfinance.model.ManageDesignation;
import com.microfinance.model.TeamMember;
import com.microfinance.model.addFinancialConsultant;
import com.microfinance.repository.DepartmentRepo;
import com.microfinance.repository.DesignationRepo;
import com.microfinance.repository.FinancialConsultantRepo;
import com.microfinance.repository.TeamMemberRepo;

@Service
public class TeamManagementService {

	@Autowired
	private DesignationRepo designationRepo;

	@Autowired
	private DepartmentRepo departmentRepo;

	@Autowired
	private TeamMemberRepo teamMemberRepo;

	@Autowired
	private FinancialConsultantRepo financialConsultantRepo;

	private String toUpper(String val) {
		return (val != null) ? val.trim().toUpperCase() : null;
	}

	public ManageDesignation saveDesignation(ManageDesignation manageDesignation) {
		if (manageDesignation != null && manageDesignation.getDesignationName() != null) {
			manageDesignation.setDesignationName(toUpper(manageDesignation.getDesignationName()));
		}
		return designationRepo.save(manageDesignation);
	}

	public void deleteDesignation(Long id) {
		if (id != null && designationRepo.existsById(id)) {
			designationRepo.deleteById(id);
		}
	}

	public ManageDepartment saveDepartment(ManageDepartment manageDepartment) {
		if (manageDepartment != null && manageDepartment.getDepartmentName() != null) {
			manageDepartment.setDepartmentName(toUpper(manageDepartment.getDepartmentName()));
		}
		return departmentRepo.save(manageDepartment);
	}

	public void deleteDepartment(Long id) {
		if (id != null && departmentRepo.existsById(id)) {
			departmentRepo.deleteById(id);
		}
	}

	public List<ManageDesignation> fetchDesignationList() {
		return designationRepo.findAll();
	}

	public List<ManageDepartment> fetchDepartmentList() {
		return departmentRepo.findAll();
	}

	public TeamMember saveTeamMember(TeamMember tm) {
		if (tm != null) {
			tm.setTeamMemberCode(toUpper(tm.getTeamMemberCode()));
			tm.setBranchName(toUpper(tm.getBranchName()));
			tm.setTeamMemberName(toUpper(tm.getTeamMemberName()));
			tm.setFamilyMemberName(toUpper(tm.getFamilyMemberName()));
			tm.setRelationToApplicant(toUpper(tm.getRelationToApplicant()));
			tm.setNomineeName(toUpper(tm.getNomineeName()));
			tm.setRelationWithNominee(toUpper(tm.getRelationWithNominee()));
			tm.setAddress(toUpper(tm.getAddress()));
			tm.setPan(toUpper(tm.getPan()));
			tm.setBankAC(toUpper(tm.getBankAC()));
			tm.setIfscCode(toUpper(tm.getIfscCode()));
			tm.setExpDetails(toUpper(tm.getExpDetails()));
			tm.setEducationalBackground(toUpper(tm.getEducationalBackground()));
			tm.setDesignation(toUpper(tm.getDesignation()));
			tm.setDepartment(toUpper(tm.getDepartment()));
			tm.setModeofpayment(toUpper(tm.getModeofpayment()));
			tm.setComments(toUpper(tm.getComments()));
			tm.setChequeNo(toUpper(tm.getChequeNo()));
			tm.setDepositAcc1(toUpper(tm.getDepositAcc1()));
			tm.setDepositAcc2(toUpper(tm.getDepositAcc2()));
			tm.setDepositAcc3(toUpper(tm.getDepositAcc3()));
			tm.setRefNumber1(toUpper(tm.getRefNumber1()));
			tm.setRefNumber2(toUpper(tm.getRefNumber2()));
		}
		return teamMemberRepo.save(tm);
	}

	public void deleteTeamMember(Long id) {
		if (id != null && teamMemberRepo.existsById(id)) {
			teamMemberRepo.deleteById(id);
		}
	}

	public List<TeamMember> findByteamMemberCode(String teamMemberCode) {
		if (teamMemberCode == null || teamMemberCode.trim().isEmpty()) {
			return Collections.emptyList();
		}
		return teamMemberRepo.findByteamMemberCode(teamMemberCode.trim().toUpperCase());
	}

	public List<TeamMember> fetchAllteamMember() {
		return teamMemberRepo.findAll();
	}

	public long getMaxId() {
		return teamMemberRepo.getMaxId();
	}

	public List<addFinancialConsultant> getConsultantsByTeamMemberCode(String teamMemberCode) {
		if (teamMemberCode == null || teamMemberCode.trim().isEmpty()) {
			return Collections.emptyList();
		}
		String cleanCode = teamMemberCode.trim().toUpperCase();
		List<addFinancialConsultant> list = financialConsultantRepo.findByTeamMemberCode(cleanCode);
		if (list == null || list.isEmpty()) {
			List<addFinancialConsultant> all = financialConsultantRepo.findAll();
			if (all != null) {
				return all.stream()
						.filter(c -> c.getTeamMemberCode() != null && c.getTeamMemberCode().trim().equalsIgnoreCase(cleanCode))
						.collect(Collectors.toList());
			}
			return Collections.emptyList();
		}
		return list;
	}

	public List<TeamMember> searchTeamMember(TeamMember filter) {
		List<TeamMember> allMembers = teamMemberRepo.findAll();
		if (filter == null) {
			return allMembers;
		}

		final String bName = (filter.getBranchName() != null) ? filter.getBranchName().trim().toUpperCase() : "";
		final String mName = (filter.getTeamMemberName() != null) ? filter.getTeamMemberName().trim().toUpperCase() : "";
		final String mCode = (filter.getTeamMemberCode() != null) ? filter.getTeamMemberCode().trim().toUpperCase() : "";
		final String cNo = (filter.getContactNo() != null) ? filter.getContactNo().trim() : "";
		final String desig = (filter.getDesignation() != null) ? filter.getDesignation().trim().toUpperCase() : "";
		final String dept = (filter.getDepartment() != null) ? filter.getDepartment().trim().toUpperCase() : "";
		final String dateFrom = (filter.getDateFrom() != null) ? filter.getDateFrom().trim() : "";
		final String dateTo = (filter.getDateTo() != null) ? filter.getDateTo().trim() : "";

		return allMembers.stream().filter(tm -> {
			if (!bName.isEmpty() && (tm.getBranchName() == null || !tm.getBranchName().toUpperCase().contains(bName))) {
				return false;
			}
			if (!mName.isEmpty() && (tm.getTeamMemberName() == null || !tm.getTeamMemberName().toUpperCase().contains(mName))) {
				return false;
			}
			if (!mCode.isEmpty() && (tm.getTeamMemberCode() == null || !tm.getTeamMemberCode().toUpperCase().contains(mCode))) {
				return false;
			}
			if (!cNo.isEmpty() && (tm.getContactNo() == null || !tm.getContactNo().contains(cNo))) {
				return false;
			}
			if (!desig.isEmpty() && (tm.getDesignation() == null || !tm.getDesignation().toUpperCase().contains(desig))) {
				return false;
			}
			if (!dept.isEmpty() && (tm.getDepartment() == null || !tm.getDepartment().toUpperCase().contains(dept))) {
				return false;
			}
			if (!dateFrom.isEmpty() && tm.getSignUpDate() != null && tm.getSignUpDate().compareTo(dateFrom) < 0) {
				return false;
			}
			if (!dateTo.isEmpty() && tm.getSignUpDate() != null && tm.getSignUpDate().compareTo(dateTo) > 0) {
				return false;
			}
			return true;
		}).collect(Collectors.toList());
	}

}
