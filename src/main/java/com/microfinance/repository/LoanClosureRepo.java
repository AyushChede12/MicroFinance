package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.LoanClosure;

@Repository
public interface LoanClosureRepo extends JpaRepository<LoanClosure, Integer> {

	List<LoanClosure> findByLoanId(String loanId);
}
