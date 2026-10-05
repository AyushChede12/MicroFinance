package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.microfinance.model.AccountTransaction;

public interface AccountTransactionRepo extends JpaRepository<AccountTransaction, Long> {

	@Query("SELECT a FROM AccountTransaction a " + "WHERE a.branchName = :branchName "
			+ "AND a.transactionDate BETWEEN :startDate AND :endDate " + "AND a.accountCode = 'CASH' "
			+ "ORDER BY a.transactionDate ASC")
	List<AccountTransaction> getCashBook(@Param("branchName") String branchName, @Param("startDate") String startDate,
			@Param("endDate") String endDate);

	@Query("SELECT a FROM AccountTransaction a " + "WHERE a.transactionType = 'TRANSFER' "
			+ "AND a.branchName = :branchName " + "AND a.transactionDate BETWEEN :startDate AND :endDate "
			+ "ORDER BY a.transactionDate ASC")
	List<AccountTransaction> getFundTransfers(@Param("branchName") String branchName,
			@Param("startDate") String startDate, @Param("endDate") String endDate);

	@Query("SELECT a FROM AccountTransaction a " + "WHERE a.branchName = :branchName "
			+ "AND a.accountCode = :accountCode " + "AND a.transactionDate BETWEEN :startDate AND :endDate "
			+ "ORDER BY a.transactionDate ASC")
	List<AccountTransaction> getDailyTransactions(@Param("branchName") String branchName,
			@Param("accountCode") String accountCode, @Param("startDate") String startDate,
			@Param("endDate") String endDate);

	@Query(value = "SELECT " + "   t.account_code AS ledgerName, " +

			"   SUM(CASE "
			+ "       WHEN STR_TO_DATE(t.transaction_date, '%Y-%m-%d') < STR_TO_DATE(:startDate, '%Y-%m-%d') "
			+ "       THEN (t.debit - t.credit) " + "       ELSE 0 END) AS opening, " +

			"   SUM(CASE "
			+ "       WHEN STR_TO_DATE(t.transaction_date, '%Y-%m-%d') BETWEEN STR_TO_DATE(:startDate, '%Y-%m-%d') AND STR_TO_DATE(:endDate, '%Y-%m-%d') "
			+ "       THEN t.debit " + "       ELSE 0 END) AS debit, " +

			"   SUM(CASE "
			+ "       WHEN STR_TO_DATE(t.transaction_date, '%Y-%m-%d') BETWEEN STR_TO_DATE(:startDate, '%Y-%m-%d') AND STR_TO_DATE(:endDate, '%Y-%m-%d') "
			+ "       THEN t.credit " + "       ELSE 0 END) AS credit " +

			"FROM account_transaction t " + "WHERE t.branch_name = :branchName " + "GROUP BY t.account_code "
			+ "ORDER BY t.account_code",

			nativeQuery = true)
	List<Object[]> getTrialBalance(@Param("branchName") String branchName, @Param("startDate") String startDate,
			@Param("endDate") String endDate);

	@Query(value = "SELECT " + "t.transaction_date, " + "t.branch_name, " + "SUM(t.credit) as totalIncome, "
			+ "SUM(t.debit) as totalExpense " + "FROM account_transaction t "
			+ "WHERE (:branchName IS NULL OR t.branch_name = :branchName) "
			+ "AND STR_TO_DATE(t.transaction_date, '%Y-%m-%d') " + "BETWEEN STR_TO_DATE(:startDate, '%Y-%m-%d') "
			+ "AND STR_TO_DATE(:endDate, '%Y-%m-%d') " + "GROUP BY t.transaction_date, t.branch_name "
			+ "ORDER BY STR_TO_DATE(t.transaction_date, '%Y-%m-%d')", nativeQuery = true)
	List<Object[]> getPLData(@Param("branchName") String branchName, @Param("startDate") String startDate,
			@Param("endDate") String endDate);

	List<AccountTransaction> findByBranchNameAndTransactionDateBetween(String branchName, String startDate,
			String endDate);

	@Query("SELECT " + "COALESCE(SUM(a.debit),0) - " + "COALESCE(SUM(a.credit),0) " + "FROM AccountTransaction a "
			+ "WHERE a.branchName = :branchName " + "AND a.accountCode = :accountCode")
	Double getCashBalance(@Param("branchName") String branchName, @Param("accountCode") String accountCode);

	List<AccountTransaction> findByTransactionTypeOrderByIdDesc(String transactionType);

	List<AccountTransaction> findByAccountNumberOrderByIdAsc(String accountNumber);

	List<AccountTransaction> findByBranchNameOrderByIdAsc(String branchName);

}
