package com.microfinance.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.IncentivePayment;

@Repository
public interface IncentiveRepo extends JpaRepository<IncentivePayment, Long> {

	boolean existsByAgentCodeAndMonthAndPaymentStatus(String agentCode, String month, String paymentStatus);

}
