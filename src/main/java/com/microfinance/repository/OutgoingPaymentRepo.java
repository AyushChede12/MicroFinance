package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microfinance.model.OutgoingPaymentEntry;

public interface OutgoingPaymentRepo extends JpaRepository<OutgoingPaymentEntry, Long> {
	
	List<OutgoingPaymentEntry> findByBranchNameAndDateOfEntryBetween(String branchName, String startDate, String endDate);
	
	




}
