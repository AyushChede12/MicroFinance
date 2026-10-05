package com.microfinance.service;

import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.microfinance.model.AddnewinvestmentPM;
import com.microfinance.model.CreateSavingsAccount;
import com.microfinance.model.DailyPremiumRenewalPM;
import com.microfinance.model.FlexibleRenewal;
import com.microfinance.model.PolicyRenewal;
import com.microfinance.model.TransferShare;
import com.microfinance.model.addCustomer;
import com.microfinance.model.partialMaturityPayment;
import com.microfinance.model.savingAccountFundTransfer;
import com.microfinance.repository.AddCustomerRepo;
import com.microfinance.repository.AddInvestmentRepo;
import com.microfinance.repository.CreateSavingAccountRepo;
import com.microfinance.repository.DailyPremiumRenewalRepo;
import com.microfinance.repository.FlexibleRenewalRepo;
import com.microfinance.repository.PartialMaturitypaymentRepo;
import com.microfinance.repository.PolicyRenewalRepo;
import com.microfinance.repository.SavingAccountFundTransferRepo;
import com.microfinance.repository.TransferShareRepo;



@Service
public class RequestApprovalsService {
	
	@Autowired
	AddCustomerRepo addCustomerRepo;
	
	@Autowired
	CreateSavingAccountRepo createSavingAccountRepo;
	
	@Autowired
	AddInvestmentRepo addInvestmentRepo;
	
	@Autowired
	PolicyRenewalRepo policyRenewalRepo;
	
	@Autowired
	FlexibleRenewalRepo flexibleRenewalRepo;
	
	@Autowired
	DailyPremiumRenewalRepo dailyPremiumRenewalRepo;
	
	@Autowired
	SavingAccountFundTransferRepo savingAccountFundTransferRepo;
	
	@Autowired
	TransferShareRepo transferShareRepo;
	
	@Autowired
	PartialMaturitypaymentRepo partialMaturitypaymentRepo;
	
	public List<addCustomer> findAllMemberCode() {
		// TODO Auto-generated method stub
		List<addCustomer> list = addCustomerRepo.findAll();
		return list;

	}


	public Optional<addCustomer> findByIdShowStatus(Long id) {
		// TODO Auto-generated method stub
		return addCustomerRepo.findById(id);
	}

	public addCustomer save(addCustomer customer) {
		// TODO Auto-generated method stub
		return addCustomerRepo.save(customer);
	}

	public List<addCustomer> getUnapprovedCustomersByMemberCode(String branchName) {
		// TODO Auto-generated method stub
		return addCustomerRepo.findByIsApprovedFalseAndMemberCode(branchName);
	}

	public List<addCustomer> getUnapprovedCustomers() {
	    return addCustomerRepo.findByIsApprovedFalse();
	}

	public List<CreateSavingsAccount> getUnapprovedSavingTransaction() {
		// TODO Auto-generated method stub
		return createSavingAccountRepo.findByIsApprovedFalse();
	}

	public Optional<CreateSavingsAccount> SavingTransactionById(Long id) {
		// TODO Auto-generated method stub
		return createSavingAccountRepo.findById(id);
	}

	public CreateSavingsAccount save(CreateSavingsAccount customer) {
		// TODO Auto-generated method stub
		return createSavingAccountRepo.save(customer);
	}

	public List<AddnewinvestmentPM> getAllUnapprovedAddNewInvestment() {
		// TODO Auto-generated method stub
		return addInvestmentRepo.findByIsApprovedFalse();
	}

	public Optional<AddnewinvestmentPM> findByIdShowStatusInvestment(Long id) {
		// TODO Auto-generated method stub
		return addInvestmentRepo.findById(id);
	}


	public AddnewinvestmentPM save(AddnewinvestmentPM investment) {
		// TODO Auto-generated method stub
		return addInvestmentRepo.save(investment);
	}


	public List<PolicyRenewal> getAllUnapprovedPolicyRenewalData() {
		// TODO Auto-generated method stub
	 return policyRenewalRepo.findByIsApprovedFalse();
	}


	public PolicyRenewal saveRenewal(PolicyRenewal renewal) {
		// TODO Auto-generated method stub
		return policyRenewalRepo.save(renewal); 
	}


	public Optional<PolicyRenewal> approveRDFromPolicyRenewal(Long id) {
		// TODO Auto-generated method stub
		return policyRenewalRepo.findById(id);
	}


	public List<FlexibleRenewal> getUnapprovedFlexibleRenewalData() {
		// TODO Auto-generated method stub
		return flexibleRenewalRepo.findByIsApprovedFalse();
	}

	public Optional<FlexibleRenewal> findFlexibleRenewalById(Long id) {
		// TODO Auto-generated method stub
		return flexibleRenewalRepo.findById(id);
	}


	public Optional<FlexibleRenewal> approveFDFromFlexibleRenewalInApproval(Long id) {
		// TODO Auto-generated method stub
		return flexibleRenewalRepo.findById(id);
	}


	public FlexibleRenewal saveRenewal(FlexibleRenewal renewals) {
		// TODO Auto-generated method stub
		 return flexibleRenewalRepo.save(renewals);
	}


	public List<DailyPremiumRenewalPM> getUnapprovedDailyPremiumRenewalPMData() {
		// TODO Auto-generated method stub
		return dailyPremiumRenewalRepo.findByIsApprovedFalse();
	}


	public Optional<DailyPremiumRenewalPM> approveDDFromDailyPremiumRenewalPMData(Long id) {
		// TODO Auto-generated method stub
		return dailyPremiumRenewalRepo.findById(id);
	}


	public DailyPremiumRenewalPM saveRenewal(DailyPremiumRenewalPM dailyRenewal) {
		// TODO Auto-generated method stub
		return dailyPremiumRenewalRepo.save(dailyRenewal);
	}


	public List<savingAccountFundTransfer> getUnapprovedsavingAccountFundTransferData() {
		// TODO Auto-generated method stub
		return savingAccountFundTransferRepo.findByIsApprovedFalse();
	}

	public Optional<savingAccountFundTransfer> approvesavingAccountFundTransferData(Long id) {
		// TODO Auto-generated method stub
        return savingAccountFundTransferRepo.findById(id);
    }

    public savingAccountFundTransfer saveAccount(savingAccountFundTransfer transfer) {
    	// TODO Auto-generated method stub
        return savingAccountFundTransferRepo.save(transfer);
    }


	public List<TransferShare> getUnapprovedTransferShareData() {
		// TODO Auto-generated method stub
		return transferShareRepo.findByIsApprovedFalse();
	}


	public Optional<TransferShare> approveShareTransactionData(Long id) {
		// TODO Auto-generated method stub
		return transferShareRepo.findById(id);
	}


	public TransferShare saveTransferShare(TransferShare share) {
		// TODO Auto-generated method stub
		return transferShareRepo.save(share);
	}


	public List<partialMaturityPayment> getAllPolicyCodes() {
		// TODO Auto-generated method stub
		return partialMaturitypaymentRepo.findAll();
	}


	public partialMaturityPayment findByPolicyCode(String policyCode) {
		// TODO Auto-generated method stub
		return partialMaturitypaymentRepo.findByPolicyCode(policyCode);
	}


	public Optional<partialMaturityPayment> approveMaturityApplication(Long id) {
		// TODO Auto-generated method stub
		return partialMaturitypaymentRepo.findById(id);
	}


	public partialMaturityPayment saveMaturity(partialMaturityPayment maturity) {
		// TODO Auto-generated method stub
		return partialMaturitypaymentRepo.save(maturity);
	}


	public List<addCustomer> getApprovedCustomers() {
	    return addCustomerRepo.findByIsApprovedTrue();
	}



}
