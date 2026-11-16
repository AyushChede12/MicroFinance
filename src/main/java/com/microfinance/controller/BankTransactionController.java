package com.microfinance.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.microfinance.dto.ApiResponse;
import com.microfinance.model.BankTransaction;
import com.microfinance.service.BankTransactionService;

@RestController
@RequestMapping("/api/bank-transactions")
public class BankTransactionController {

	private final BankTransactionService bankTransactionService;

	public BankTransactionController(BankTransactionService bankTransactionService) {
		this.bankTransactionService = bankTransactionService;
	}

	@PostMapping("/saveBankTransaction")
	public ResponseEntity<ApiResponse<BankTransaction>> saveBankTransaction(@RequestParam Long bankId,
			@RequestParam Long branchId, @RequestBody BankTransaction transaction) {

		try {
			BankTransaction saved = bankTransactionService.saveTransaction(bankId, branchId, transaction);

			return ResponseEntity.status(HttpStatus.CREATED)
					.body(ApiResponse.success(HttpStatus.CREATED, "BANK TRANSACTION SAVED SUCCESSFULLY", saved));

		} catch (RuntimeException e) {
			String msg = e.getMessage() != null ? e.getMessage().toUpperCase() : "FAILED TO SAVE BANK TRANSACTION";
			return ResponseEntity.badRequest().body(ApiResponse.error(HttpStatus.BAD_REQUEST, msg));
		}
	}
}
