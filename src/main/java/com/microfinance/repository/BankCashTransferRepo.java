package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microfinance.model.BankCashTransferEntry;


public interface BankCashTransferRepo extends JpaRepository<BankCashTransferEntry, Long> {

	List<BankCashTransferEntry> findByBranchNameIgnoreCaseAndDateOfEntryBetween(String branchName, String startDate, String endDate);

	boolean existsByBranchNameIgnoreCaseAndDateOfEntryAndDebitLedgerIgnoreCaseAndCreditLedgerIgnoreCaseAndTransactionAmount(
		    String branchName,
		    String dateOfEntry,
		    String debitLedger,
		    String creditLedger,
		    String transactionAmount
		);

	

	

}
