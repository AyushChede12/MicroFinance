package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microfinance.model.MandateDeposit;

public interface MandateDepositRepository extends JpaRepository<MandateDeposit, Long> {

	List<MandateDeposit> findByStartDateBetween(String startDate, String endDate);

}
