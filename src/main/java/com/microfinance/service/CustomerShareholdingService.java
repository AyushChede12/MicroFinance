package com.microfinance.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import com.microfinance.dto.ApiResponse;
import com.microfinance.model.BranchModule;
import com.microfinance.model.TransferShare;
import com.microfinance.model.addCustomer;
import com.microfinance.repository.AddCustomerRepo;
import com.microfinance.repository.BranchModuleRepo;
import com.microfinance.repository.TransferShareRepo;

@Service
public class CustomerShareholdingService {

	@Autowired
	AddCustomerRepo addcustomerRepo;
	
	@Autowired
	BranchModuleRepo branchmodulRepo;
	
	@Autowired
	TransferShareRepo transfershareRepo;

//Transfer Share - Oshin Dongre (12-06-2025)----------------------------------------------------------------------------------------	
	
//	Oshin Dongre - Transfer Share(12-06-2025)	 
	
	// Find CustomerCode of Transfer Share
	public List<addCustomer> findByCustomerCode() {
		List<addCustomer> list = addcustomerRepo.findAll();
		return list;
	}

	//Fetching CustomerCode of Transfer ShareT 
	public List<addCustomer> fetchByCustomerCode(String memberCode) {
		List<addCustomer> list = addcustomerRepo.findByMemberCode(memberCode);
		return list;
	}

	//Find Branch of Transfer Share
	public List<BranchModule> findByBranch() {
		List<BranchModule> list = branchmodulRepo.findAll();
		return list;
	}

	// Save Transfer Share
	public TransferShare saveAllTransferShare(TransferShare transfer) {	
		return  transfershareRepo.save(transfer);
		
	}

	//All Data Show in Table
	public List<TransferShare> allDataFetchTransferShareInTable() {
		return transfershareRepo.findAll();
	}

	//Edite Code	
	public TransferShare getTransferShareIdEdite(Long id) {
		// TODO Auto-generated method stub
		return transfershareRepo.findById(id).orElse(null);
	}

	// Delete Code
	public boolean deleteTransferShareById(Long id) {
		if(transfershareRepo.existsById(id)) {
			transfershareRepo.deleteById(id);
			return true;
		 }
			return false;
	}

	//update Code
	public TransferShare updateTransferShare(TransferShare transfer) {
			Optional<TransferShare> transfershare = transfershareRepo.findById(transfer.getId());			
				if(transfershare.isPresent()) {
					TransferShare existingTS = transfershare.get();
					existingTS.setFindByCode(transfer.getFindByCode());
					existingTS.setCustomerName(transfer.getCustomerName());
					existingTS.setStartDate(transfer.getStartDate());
					existingTS.setPreviousAccountBalance(transfer.getPreviousAccountBalance());
					existingTS.setPreviousShareCount(transfer.getPreviousShareCount());
					existingTS.setBaseValue(transfer.getBaseValue());
					existingTS.setBranch(transfer.getBranch());
					existingTS.setDateOfTransfer(transfer.getDateOfTransfer());
					existingTS.setShareIssuedBy(transfer.getShareIssuedBy());
					existingTS.setNoOfShare(transfer.getNoOfShare());
					existingTS.setAmountTransferred(transfer.getAmountTransferred());
					existingTS.setBalanceShares(transfer.getBalanceShares());
					existingTS.setModeOfPayment(transfer.getModeOfPayment());
					existingTS.setComments(transfer.getComments());
					
					return  transfershareRepo.save(existingTS);
				}else
					return null;
	}

	// Save And Update 
	public boolean saveOrUpdateTransferShare(TransferShare savets) {
		// TODO Auto-generated method stub
		try {
			transfershareRepo.save(savets);
			return true;
		}catch (Exception ex) {
			ex.printStackTrace();
			return false;
		}
		
	}

	

// End TransferShare Sub Model -----------------------------------------------------------------------------------------------------

//UnAllotedShare - Oshin Dongre (25-06-2025)----------------------------------------------------------------------------------------
	
	// Find List Of TransferShare
	public List<TransferShare> findByTransferShare() {
		List<TransferShare> list = transfershareRepo.findAll();
		return list;
	}

	// fetch on table UnAllotedShare
	public List<TransferShare> fetchByTransferShare(String findByCode) {
		List<TransferShare> list = transfershareRepo.findByFindByCode(findByCode);
		return list;
	}

// End UnAllotedShare Sub Model -----------------------------------------------------------------------------------------------------	
	
//Generate Share Certificate - Oshin Dongre (26-06-2025)----------------------------------------------------------------------------------------	
	
	// Find List Of TransferShare
	public List<TransferShare> getAllTransferShare() {
		List<TransferShare> list = transfershareRepo.findAll();
		return list;
	}

	// Generate Share Certificate 
	public List<TransferShare> fetchByCertificateNo(String findByCode) {
		List<TransferShare> list = transfershareRepo.findByFindByCode(findByCode);
		return list;
	}
	
// End Generate Share Certificate Sub Model -----------------------------------------------------------------------------------------------------
	
	
}
