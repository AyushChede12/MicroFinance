package com.microfinance.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.microfinance.model.LoanApplication;
import com.microfinance.model.addCustomer;

@Repository
public interface LoanApplicationRepo extends JpaRepository<LoanApplication,Long> {
	@Transactional
	@Query("select coalesce(max(id), 0) from LoanApplication")
	long getMaxId();

	List<LoanApplication> findByApprovalStatusTrue();

	List<LoanApplication> findByApprovalStatusTrueAndLoanStatus(String loanStatus);
	
	LoanApplication findByLoanId(String loanId); // assumes loanId is unique

	List<LoanApplication> findByApprovalStatusFalse();

	long countByFinancialConsultantIdInAndLoanDateContaining(List<String> financialConsultantCode, String yearMonth);

	List<LoanApplication> findByFinancialConsultantIdIn(List<String> financialCodes);

}
