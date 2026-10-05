package com.microfinance.service;




import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.microfinance.model.ApplyForMaturity;
import com.microfinance.model.FullMaturity;
import com.microfinance.model.MaturitySchemeMaster;
import com.microfinance.model.partialMaturityPayment;
import com.microfinance.repository.ApplyForMaturityRepo;
import com.microfinance.repository.FullMaturityRepo;
import com.microfinance.repository.MaturitySchemeMasterRepo;
import com.microfinance.repository.PartialMaturitypaymentRepo;

@Service
public class MaturitySchemeMasterService {
	
	@Autowired
	MaturitySchemeMasterRepo maturityschemerepo;
	
	@Autowired
	ApplyForMaturityRepo Applymaturityrepo;
	
	@Autowired
	PartialMaturitypaymentRepo partialmaturityrepo;
	
	@Autowired
	FullMaturityRepo fullmaturityrepo;

	public MaturitySchemeMaster saveAllDailyDeposit(MaturitySchemeMaster maturityscheme) {
		// TODO Auto-generated method stub
		return maturityschemerepo.save(maturityscheme);
	}

	public ApplyForMaturity saveApplymaturity(ApplyForMaturity applymaturity) {
		// TODO Auto-generated method stub
		return Applymaturityrepo.save(applymaturity);
	}

	public List<ApplyForMaturity> getApplyMaturityDetails() {
		// TODO Auto-generated method stub
		return Applymaturityrepo.findAll();
	}
	

	public Page<ApplyForMaturity> getApplyMaturityDetailsWithPage(int page, int size) {
	    PageRequest pageable = PageRequest.of(page, size);
	    return Applymaturityrepo.findWithPage(pageable);
	}

	public List<ApplyForMaturity> getMaturityDetailsByBranchAndDate(String branchName, String fromDate, String toDate) {
		// TODO Auto-generated method stub
		return Applymaturityrepo.findByBranchToDateFromDate(branchName,fromDate,toDate);
	}

	public partialMaturityPayment savePartialmaturity(partialMaturityPayment partialmaturity) {
		// TODO Auto-generated method stub
		return partialmaturityrepo.save(partialmaturity) ;
		
	}

	public FullMaturity saveFullmaturity(FullMaturity fullmaturity) {
		// TODO Auto-generated method stub
		return fullmaturityrepo.save(fullmaturity);
	}

	public List<partialMaturityPayment> getPartialMaturityDetails() {
		// TODO Auto-generated method stub
		return partialmaturityrepo.findAll();
	}

	public List<FullMaturity> getFullMaturityDetails() {
		// TODO Auto-generated method stub
		return fullmaturityrepo.findAll();
	}

	

	
	

	
	}


