package com.microfinance.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.LoanDeductionDetails;

@Repository
public interface LoanDeductionDetailsRepo extends JpaRepository<LoanDeductionDetails, Long> {

	Optional<LoanDeductionDetails> findByLoanApplicationId(Long loanApplicationId);
}
