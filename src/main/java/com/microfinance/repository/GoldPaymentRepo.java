package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.GoldLoanPayment;

@Repository
public interface GoldPaymentRepo extends JpaRepository<GoldLoanPayment, Long>{

	List<GoldLoanPayment> findByGoldID(String goldID);

}
