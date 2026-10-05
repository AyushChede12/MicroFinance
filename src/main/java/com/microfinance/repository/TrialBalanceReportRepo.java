package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.microfinance.model.ManualJournalEntry;

@Repository
public interface TrialBalanceReportRepo extends JpaRepository<ManualJournalEntry, Long>{

    @Query(value = "SELECT ledger AS ledgerName, " +
            "SUM(CASE WHEN type = 'DEBIT' THEN amount ELSE 0 END) AS totalDebit, " +
            "SUM(CASE WHEN type = 'CREDIT' THEN amount ELSE 0 END) AS totalCredit " +
            "FROM (" +
            "   SELECT debit_ledger AS ledger, transaction_amount AS amount, 'DEBIT' AS type, branch_name AS branchName, date_of_entry AS date " +
            "   FROM outgoing_payment_entry " +
            "   UNION ALL " +
            "   SELECT credit_ledger AS ledger, transaction_amount AS amount, 'CREDIT' AS type, branch_name AS branchName, date_of_entry AS date " +
            "   FROM outgoing_payment_entry " +
            "   UNION ALL " +
            "   SELECT debit_ledger AS ledger, transaction_amount AS amount, 'DEBIT' AS type, branch_name AS branchName, date_of_entry AS date " +
            "   FROM incoming_receipt_entry " +
            "   UNION ALL " +
            "   SELECT credit_ledger AS ledger, transaction_amount AS amount, 'CREDIT' AS type, branch_name AS branchName, date_of_entry AS date " +
            "   FROM incoming_receipt_entry " +
            "   UNION ALL " +
            "   SELECT debit_ledger AS ledger, transaction_amount AS amount, 'DEBIT' AS type, branch_name AS branchName, date_of_entry AS date " +
            "   FROM bank_cash_transfer_entry " +
            "   UNION ALL " +
            "   SELECT credit_ledger AS ledger, transaction_amount AS amount, 'CREDIT' AS type, branch_name AS branchName, date_of_entry AS date " +
            "   FROM bank_cash_transfer_entry " +
            "   UNION ALL " +
            "   SELECT debit_ledger AS ledger, transaction_amount AS amount, 'DEBIT' AS type, branch_name AS branchName, date_of_entry AS date " +
            "   FROM manual_journal_entry " +
            "   UNION ALL " +
            "   SELECT credit_ledger AS ledger, transaction_amount AS amount, 'CREDIT' AS type, branch_name AS branchName, date_of_entry AS date " +
            "   FROM manual_journal_entry " +
            ") AS x " +
            "WHERE ledger IS NOT NULL AND ledger <> '' " +
            "AND x.branchName = :branchName " +
            "AND x.date BETWEEN :startDate AND :endDate " +
            "GROUP BY ledger", nativeQuery = true)
    List<Object[]> fetchTrialBalanceEntries(String branchName, String startDate, String endDate);
}

