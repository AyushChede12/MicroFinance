package com.microfinance.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.IncentivePayment;

@Repository
public interface IncentiveRepo extends JpaRepository<IncentivePayment, Long> {

	boolean existsByAgentCodeAndMonthAndPaymentStatus(String agentCode, String month, String paymentStatus);

	List<IncentivePayment> findByMonth(String month);

	List<IncentivePayment> findByAgentCode(String agentCode);

	List<IncentivePayment> findByMonthAndAgentCode(String month, String agentCode);

	List<IncentivePayment> findByPaymentBranch(String paymentBranch);

	List<IncentivePayment> findByMonthAndPaymentBranch(String month, String paymentBranch);

	Optional<IncentivePayment> findFirstByAgentCodeAndMonth(String agentCode, String month);

}
