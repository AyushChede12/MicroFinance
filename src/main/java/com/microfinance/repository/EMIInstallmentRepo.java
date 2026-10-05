package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.EmiInstallmentPaymentGold;

@Repository
public interface EMIInstallmentRepo extends JpaRepository<EmiInstallmentPaymentGold, Long> {

	List<EmiInstallmentPaymentGold> findByGoldID(String goldID);

}
