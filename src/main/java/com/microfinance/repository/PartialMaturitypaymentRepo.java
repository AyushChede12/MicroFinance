package com.microfinance.repository;




import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.microfinance.model.partialMaturityPayment;

@Repository
public interface PartialMaturitypaymentRepo extends JpaRepository<partialMaturityPayment, Long> {

	partialMaturityPayment findByPolicyCode(String policyCode);

	

}
