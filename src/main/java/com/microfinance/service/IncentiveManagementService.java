package com.microfinance.service;



import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.microfinance.model.GenerateIncentivePayments;
import com.microfinance.model.IncentiveSchemeMaster;
import com.microfinance.model.TeamMember;

import com.microfinance.repository.IncentiveSchemeMasterRepo;
import com.microfinance.repository.TeamMemberRepo;
import com.microfinance.repository.GenerateIncentivePaymentsRepo;


@Service
public class IncentiveManagementService {
	
	@Autowired 
	IncentiveSchemeMasterRepo incentiveschemerepo;
	
	@Autowired
	GenerateIncentivePaymentsRepo generateIncentivePaymentsRepo;
	
	@Autowired
	TeamMemberRepo teamMemberRepo;

	public IncentiveSchemeMaster saveIncentive(IncentiveSchemeMaster incentive) {
		// TODO Auto-generated method stub
		return incentiveschemerepo.save(incentive);
	}

	public List<IncentiveSchemeMaster> getAllIncentives() {
		// TODO Auto-generated method stub
		return incentiveschemerepo.findAll();
	}

	

	public boolean saveIncentivePayment(GenerateIncentivePayments incentivepayment) {
		try {
			generateIncentivePaymentsRepo.save(incentivepayment);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public List<TeamMember> getAllTeamMember() {
		// TODO Auto-generated method stub
		return teamMemberRepo.findAll();
	}

}