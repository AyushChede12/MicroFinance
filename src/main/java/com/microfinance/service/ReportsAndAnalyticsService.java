package com.microfinance.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.microfinance.model.AddnewinvestmentPM;
import com.microfinance.model.CreateSavingsAccount;
import com.microfinance.model.LoanApplication;
import com.microfinance.model.LoanPayment;
import com.microfinance.model.SavingAccountActivity;
import com.microfinance.model.TeamMember;
import com.microfinance.model.addFinancialConsultant;
import com.microfinance.repository.ReportsAndAnalyticsRepo;
import com.microfinance.repository.SavingAccountActivityRepo;
import com.microfinance.repository.TeamMemberRepo;
import com.microfinance.repository.AddInvestmentRepo;
import com.microfinance.repository.CreateSavingAccountRepo;
import com.microfinance.repository.FinancialConsultantRepo;
import com.microfinance.repository.LoanApplicationRepo;
import com.microfinance.repository.LoanPaymentRepo;



@Service
public class ReportsAndAnalyticsService {
	
	@Autowired
	ReportsAndAnalyticsRepo reportsAndAnalyticsRepo;
	
	@Autowired
	CreateSavingAccountRepo createSavingAccountRepo;
	
	@Autowired
	LoanApplicationRepo loanApplicationRepo;
	
	@Autowired
	LoanPaymentRepo loanPaymentRepo;
	
	@Autowired
	SavingAccountActivityRepo savingAccountActivityRepo;
	
	@Autowired
	FinancialConsultantRepo financialConsultantRepo;
	
	@Autowired
	TeamMemberRepo teamMemberRepo;
	
	@Autowired
	AddInvestmentRepo addInvestmentRepo;

	public List<addFinancialConsultant> getApprovedFinancialConsultant() {
		// TODO Auto-generated method stub
		return reportsAndAnalyticsRepo.findByIsApprovedTrue();
	}

	public List<CreateSavingsAccount> getApprovedSavingAccount() {
		// TODO Auto-generated method stub
		return createSavingAccountRepo.findByIsApprovedTrue();
	}

	public List<LoanApplication> getUnapprovedLoanApplication() {
		// TODO Auto-generated method stub
		return loanApplicationRepo.findByApprovalStatusFalse();
	}

	public List<LoanPayment> getLoanPaymentReport() {
		// TODO Auto-generated method stub
		return loanPaymentRepo.findAll();
	}

	public List<LoanApplication> getLoanConfirmationDocument() {
		// TODO Auto-generated method stub
		return loanApplicationRepo.findAll();
	}

	public List<SavingAccountActivity> fetchPayByFromSavingAccountActivity() {
		// TODO Auto-generated method stub
		return savingAccountActivityRepo.findByPayBy("Cheque");
	}

	public List<LoanPayment> fetchCheckDataFromLoanPayment() {
		// TODO Auto-generated method stub
		return loanPaymentRepo.findByPaymentMode("Cheque");
	}

	public List<CreateSavingsAccount> fetchCheckDataFromCreateSavings() {
        // Fetch only Cheque-based records
        return createSavingAccountRepo.findByModeOfPayment("Cheque");
    }

	public List<addFinancialConsultant> fetchCheckDataFromFinancialConsultant() {
        // Fetch only Cheque-based records
        return financialConsultantRepo.findByModeofPayment("Cheque");
    }

	public List<TeamMember> fetchCheckDataFromTeamMember() {
		// TODO Auto-generated method stub
		return teamMemberRepo.findByModeofpayment("Cheque");
	}

	public List<LoanApplication> getAllLoanApplication() {
		// TODO Auto-generated method stub
		return loanApplicationRepo.findAll();
	}

	public Optional<AddnewinvestmentPM> getPolicyById(Long id) {
		// TODO Auto-generated method stub
		return addInvestmentRepo.findById(id);
	}

	
	

}
