package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.microfinance.model.BankCashTransferEntry;
import com.microfinance.model.IncomingReceiptEntry;
import com.microfinance.model.ManualJournalEntry;
import com.microfinance.model.OutgoingPaymentEntry;

@Repository
public interface JournalEntryReportRepo extends JpaRepository<ManualJournalEntry, Long> {

	 @Query("SELECT o FROM OutgoingPaymentEntry o WHERE o.branchName = :branch "
	         + "AND o.dateOfEntry >= :startDate AND o.dateOfEntry <= :endDate")
	    List<OutgoingPaymentEntry> findAllOutgoing(
	            @Param("branch") String branch,
	            @Param("startDate") String startDate,
	            @Param("endDate") String endDate);

	    @Query("SELECT i FROM IncomingReceiptEntry i WHERE i.branchName = :branch "
	         + "AND i.dateOfEntry >= :startDate AND i.dateOfEntry <= :endDate")
	    List<IncomingReceiptEntry> findAllIncoming(
	            @Param("branch") String branch,
	            @Param("startDate") String startDate,
	            @Param("endDate") String endDate);

	    @Query("SELECT t FROM BankCashTransferEntry t WHERE t.branchName = :branch "
	         + "AND t.dateOfEntry >= :startDate AND t.dateOfEntry <= :endDate")
	    List<BankCashTransferEntry> findAllTransfers(
	            @Param("branch") String branch,
	            @Param("startDate") String startDate,
	            @Param("endDate") String endDate);

	    @Query("SELECT j FROM ManualJournalEntry j WHERE j.branchName = :branch "
	         + "AND j.dateOfEntry >= :startDate AND j.dateOfEntry <= :endDate")
	    List<ManualJournalEntry> findJournalEntryReport(
	            @Param("branch") String branch,
	            @Param("startDate") String startDate,
	            @Param("endDate") String endDate);

}
