package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.microfinance.model.BankTransaction;

@Repository
public interface BankTransactionRepo extends JpaRepository<BankTransaction, Long> {

	@Query("SELECT b FROM BankTransaction b " + "WHERE b.accountNumber = :accountNumber " + "AND b.date < :startDate "
			+ "ORDER BY b.date DESC, b.id DESC")
	List<BankTransaction> findPreviousTransactions(@Param("accountNumber") String accountNumber,
			@Param("startDate") String startDate);

	@Query("SELECT b FROM BankTransaction b " + "WHERE b.accountNumber = :accountNumber " + "AND b.date >= :startDate "
			+ "AND b.date <= :endDate " + "ORDER BY b.date ASC, b.id ASC")
	List<BankTransaction> findBankStatement(@Param("accountNumber") String accountNumber,
			@Param("startDate") String startDate, @Param("endDate") String endDate);

}