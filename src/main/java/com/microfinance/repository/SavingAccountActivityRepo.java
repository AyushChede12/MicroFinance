package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.microfinance.model.SavingAccountActivity;

@Repository
public interface SavingAccountActivityRepo extends JpaRepository<SavingAccountActivity, Long> {

	List<SavingAccountActivity> findAllByAccountNumber(String accountNumber);

	List<SavingAccountActivity> findByIsApprovedTrue();

	List<SavingAccountActivity> findByPayBy(String string);

	@Query("SELECT COALESCE(SUM(CAST(sa.transactionAmount AS double)), 0) " + "FROM SavingAccountActivity sa "
			+ "WHERE sa.selectBranchName = :branch " + "AND sa.transactionDate BETWEEN :start AND :end "
			+ "AND sa.transactionType = 'CREDIT' " + "AND sa.isApproved = true")
	Double sumDeposits(@Param("branch") String branch, @Param("start") String start, @Param("end") String end);
}
