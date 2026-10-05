package com.microfinance.repository;

import java.time.LocalDate;
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
public interface LedgerSummaryRepo extends JpaRepository<OutgoingPaymentEntry, Long> {

    // Outgoing Payments
    @Query("SELECT o FROM OutgoingPaymentEntry o WHERE o.branchName = :branch AND " +
           "(o.creditLedger = :ledger OR o.debitLedger = :ledger) AND " +
           "o.dateOfEntry >= :startDate AND o.dateOfEntry <= :endDate")
    List<OutgoingPaymentEntry> findOutgoingTransactions(@Param("branch") String branch,
            @Param("ledger") String ledger,
            @Param("startDate") String startDate,
            @Param("endDate") String endDate);

    // Incoming Payments
    @Query("SELECT i FROM IncomingReceiptEntry i WHERE i.branchName = :branch AND " +
    	       "(i.creditLedger = :ledger OR i.debitLedger = :ledger) AND " +
    	       "i.dateOfEntry >= :startDate AND i.dateOfEntry <= :endDate")
    	List<IncomingReceiptEntry> findIncomingTransactions(@Param("branch") String branch,
    	                                                    @Param("ledger") String ledger,
    	                                                    @Param("startDate") String startDate,
    	                                                    @Param("endDate") String endDate);

    // Bank / Cash Transfer
    @Query("SELECT t FROM BankCashTransferEntry t WHERE t.branchName = :branch AND " +
           "(t.creditLedger = :ledger OR t.debitLedger = :ledger) AND " +
           "t.dateOfEntry >= :startDate AND t.dateOfEntry <= :endDate")
    List<BankCashTransferEntry> findTransferTransactions(@Param("branch") String branch,
            @Param("ledger") String ledger,
            @Param("startDate") String startDate,
            @Param("endDate") String endDate);

    // Manual Journal
    @Query("SELECT j FROM ManualJournalEntry j WHERE j.branchName = :branch AND " +
           "(j.creditLedger = :ledger OR j.debitLedger = :ledger) AND " +
           "j.dateOfEntry >= :startDate AND j.dateOfEntry <= :endDate")
    List<ManualJournalEntry> findJournalTransactions(@Param("branch") String branch,
            @Param("ledger") String ledger,
            @Param("startDate") String startDate,
            @Param("endDate") String endDate);
}
