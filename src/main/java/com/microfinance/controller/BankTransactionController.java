
package com.microfinance.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.microfinance.model.BankTransaction;
import com.microfinance.service.BankTransactionService;

@RestController
@RequestMapping("/api/bank-transactions")
public class BankTransactionController {

    private final BankTransactionService bankTransactionService;

    public BankTransactionController(
            BankTransactionService bankTransactionService) {
        this.bankTransactionService = bankTransactionService;
    }

    @PostMapping("/saveBankTransaction")
    public ResponseEntity<?> saveBankTransaction(
            @RequestParam Long bankId,
            @RequestParam Long branchId,
            @RequestBody BankTransaction transaction) {

        try {
            BankTransaction saved =
                    bankTransactionService.saveTransaction(
                            bankId, branchId, transaction);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(saved);

        } catch (RuntimeException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}
