package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.PolicyPayment;

@Repository
public interface PolicyPaymentRepository extends JpaRepository<PolicyPayment, Long>{

	List<PolicyPayment> findByPolicyCodeOrderByIdAsc(String policyCode);

}
