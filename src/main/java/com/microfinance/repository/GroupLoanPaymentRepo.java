package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.GroupLoanPayment;

@Repository
public interface GroupLoanPaymentRepo extends JpaRepository<GroupLoanPayment, Long> {

	List<GroupLoanPayment> findByGroupID(String groupID);
	

}
