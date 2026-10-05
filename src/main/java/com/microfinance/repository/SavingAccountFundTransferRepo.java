package com.microfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microfinance.model.savingAccountFundTransfer;

public interface SavingAccountFundTransferRepo extends JpaRepository<savingAccountFundTransfer, Long>{


	List<savingAccountFundTransfer> findByDebitAccountNumberAndIsApproved(String debitAccountNo, boolean b);

	List<savingAccountFundTransfer> findByIsApprovedFalse();


}
