package com.microfinance.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.SavingsInterestTransfer;

@Repository
public interface SavingsInterestTransferRepo extends JpaRepository<SavingsInterestTransfer, Long> {

	boolean existsByAccountNumberAndFromDateAndToDate(String accountNumber, LocalDate fromDate, LocalDate toDate);

}
