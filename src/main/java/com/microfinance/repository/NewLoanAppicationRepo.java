package com.microfinance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.NewLoanApplication;

@Repository
public interface NewLoanAppicationRepo  extends JpaRepository<NewLoanApplication, Long>{
	

}
