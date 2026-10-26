
package com.microfinance.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.microfinance.model.BankModule;
import com.microfinance.model.BankTransaction;
import com.microfinance.model.BranchModule;
import com.microfinance.repository.BankModuleRepo;
import com.microfinance.repository.BankTransactionRepo;

import com.microfinance.repository.BranchModuleRepo;

@Service
public class BankTransactionService {

	private final BankTransactionRepo bankTransactionRepo;
	private final BankModuleRepo bankModuleRepo;
	private final BranchModuleRepo branchModuleRepo;

	public BankTransactionService(BankTransactionRepo bankTransactionRepository, BankModuleRepo bankModuleRepository,
			BranchModuleRepo branchModuleRepository) {

		this.bankTransactionRepo = bankTransactionRepository;
		this.bankModuleRepo = bankModuleRepository;
		this.branchModuleRepo = branchModuleRepository;
	}

	@Transactional
	public BankTransaction saveTransaction(Long bankId, Long branchId, BankTransaction transaction) {

		// 1. Validate bank
		BankModule bank = bankModuleRepo.findById(bankId)
				.orElseThrow(() -> new RuntimeException("Bank not found: " + bankId));

		// 2. Validate branch
		BranchModule branch = branchModuleRepo.findById(branchId)
				.orElseThrow(() -> new RuntimeException("Branch not found: " + branchId));

		if (branch.getBank() == null || !branch.getBank().getId().equals(bankId)) {
			throw new RuntimeException("Selected branch does not belong to this bank");
		}

		// 3. Validate credit and debit
		BigDecimal credit = transaction.getCredit() == null ? BigDecimal.ZERO
				: BigDecimal.valueOf(transaction.getCredit());

		BigDecimal debit = transaction.getDebit() == null ? BigDecimal.ZERO
				: BigDecimal.valueOf(transaction.getDebit());

		if (credit.signum() < 0 || debit.signum() < 0) {
			throw new RuntimeException("Credit and debit cannot be negative");
		}

		if ((credit.signum() > 0 && debit.signum() > 0) || (credit.signum() == 0 && debit.signum() == 0)) {
			throw new RuntimeException("Enter either credit or debit amount");
		}

		// 4. Get latest transaction balance
		List<BankTransaction> transactions = bankTransactionRepo.findByBank_IdOrderByIdDesc(bankId);

		BigDecimal previousBalance;

		if (transactions.isEmpty()) {
			String openingBalance = bank.getOpeningBalance();

			previousBalance = openingBalance == null || openingBalance.trim().isEmpty() ? BigDecimal.ZERO
					: new BigDecimal(openingBalance.trim());
		} else {
			Double lastBalance = transactions.get(0).getBalance();

			previousBalance = lastBalance == null ? BigDecimal.ZERO : BigDecimal.valueOf(lastBalance);
		}

		// 5. Calculate new balance
		BigDecimal newBalance = previousBalance.add(credit).subtract(debit);

		if (newBalance.signum() < 0) {
			throw new RuntimeException("Insufficient bank balance");
		}

		// 6. Set relationships and transaction details
		transaction.setBank(bank);
		transaction.setBranch(branch);
		transaction.setAccountNumber(bank.getAccountNo());
		transaction.setBalance(newBalance.doubleValue());

		// 7. Save transaction
		return bankTransactionRepo.save(transaction);
	}
}
