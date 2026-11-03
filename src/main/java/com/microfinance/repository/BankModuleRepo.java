package com.microfinance.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.microfinance.model.BankModule;

@Repository
public interface BankModuleRepo extends JpaRepository<BankModule, Long> {

	Optional<BankModule> findByAccountNo(String accountNo);

	Optional<BankModule> findByBankNameIgnoreCase(String bankName);

}
