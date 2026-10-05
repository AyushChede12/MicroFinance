package com.microfinance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microfinance.model.LoanAprroval;

public interface LoanApprovalRepo extends JpaRepository<LoanAprroval, Long>{

}
