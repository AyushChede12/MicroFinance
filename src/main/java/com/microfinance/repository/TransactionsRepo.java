package com.microfinance.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.Transactions;

@Repository
public interface TransactionsRepo extends JpaRepository<Transactions, Long>{

	@Transactional
	List<Transactions> findByBranchNameIgnoreCase(String branchName);

}
