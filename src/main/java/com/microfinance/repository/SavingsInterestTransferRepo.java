package com.microfinance.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.microfinance.model.SavingsInterestTransfer;

@Repository
public interface SavingsInterestTransferRepo extends JpaRepository<SavingsInterestTransfer, Long> {

	boolean existsByAccountNumberAndFromDateAndToDate(String accountNumber, LocalDate fromDate, LocalDate toDate);

	List<SavingsInterestTransfer> findByAccountNumberOrderByToDateDesc(String accountNumber);

	@Query("SELECT s.accountNumber, MAX(s.toDate) FROM SavingsInterestTransfer s GROUP BY s.accountNumber")
	List<Object[]> findLatestToDatePerAccount();

}
