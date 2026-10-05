package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microfinance.dto.ManualJournalDto;
import com.microfinance.model.ManualJournalEntry;

public interface ManualJournalRepo extends JpaRepository<ManualJournalEntry, Long> {

	List<ManualJournalEntry> findByBranchNameAndDateOfEntryBetween(String branchName, String startDate, String endDate);
	boolean existsByBranchNameIgnoreCaseAndDateOfEntryAndDebitLedgerIgnoreCaseAndCreditLedgerIgnoreCaseAndTransactionAmount(
		    String branchName,
		    String dateOfEntry,
		    String debitLedger,
		    String creditLedger,
		    String transactionAmount
		);
	
}
