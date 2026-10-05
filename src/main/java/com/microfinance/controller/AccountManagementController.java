package com.microfinance.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.microfinance.dto.AccountTransactionRequest;
import com.microfinance.dto.ApiResponse;
import com.microfinance.dto.BalanceSheetDTO;
import com.microfinance.dto.BankCashTransferDto;
import com.microfinance.dto.BankStatementDto;
import com.microfinance.dto.IncentiveRequest;
import com.microfinance.dto.IncomingReceiptDto;
import com.microfinance.dto.InterBranchTransferDTO;
import com.microfinance.dto.LedgerAccountDto;
import com.microfinance.dto.LedgerSummaryDto;
import com.microfinance.dto.MandateDepositDto;
import com.microfinance.dto.ManualJournalDto;
import com.microfinance.dto.OutgoingPaymentDto;
import com.microfinance.dto.PLStatementDto;
import com.microfinance.dto.TrialBalanceDTO;
import com.microfinance.dto.TrialBalanceReportDto;
import com.microfinance.model.AccountIncentivePayment;
import com.microfinance.model.AccountTransaction;
import com.microfinance.model.BankTransaction;
import com.microfinance.model.IncentivePayment;
import com.microfinance.model.LedgerAccountMaster;
import com.microfinance.model.LoanPayment;
import com.microfinance.model.TeamMember;
import com.microfinance.service.AccountManagementService;

@RestController
@RequestMapping("/accountManagement")
public class AccountManagementController {

	@Autowired
	private AccountManagementService accountManagementService;

	/**
	 * Create a new ledger account.
	 *
	 * @param dto LedgerAccountDto with input data
	 * @return Created LedgerAccountDto wrapped in ApiResponse
	 */
	@PostMapping("/create")
	public ResponseEntity<ApiResponse<LedgerAccountDto>> createLedger(@Valid @RequestBody LedgerAccountDto dto) {
		LedgerAccountDto created = accountManagementService.createLedger(dto);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(ApiResponse.success(HttpStatus.CREATED, "Ledger created successfully", created));
	}

	/**
	 * Fetch all ledger accounts.
	 *
	 * @return List of ledgers wrapped in ApiResponse
	 */
	@GetMapping("/all")
	public ResponseEntity<ApiResponse<List<LedgerAccountDto>>> getAllLedgers() {
		List<LedgerAccountDto> ledgers = accountManagementService.getAllLedgers();
		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Ledgers retrieved successfully", ledgers));
	}

	/**
	 * Fetch ledger account by ID.
	 *
	 * @param id the ledger ID
	 * @return ApiResponse with ledger details
	 */
	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<LedgerAccountDto>> getLedgerById(@PathVariable Long id) {
		LedgerAccountDto ledger = accountManagementService.getLedgerById(id);
		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Ledger retrieved successfully", ledger));
	}

	@GetMapping("/groupNames")
	public ResponseEntity<ApiResponse<List<String>>> getGroupNames() {
		List<String> groupNames = accountManagementService.groupNames();
		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Group names fetched", groupNames));
	}

	/**
	 * Fetch all ledger accounts associated with a specific branch name.
	 *
	 * @param branchName the name of the branch to filter ledger accounts
	 * @return ApiResponse containing a list of matching LedgerAccountDto objects
	 */
	@GetMapping("/ledgerByBranch/{branchName}")
	public ResponseEntity<ApiResponse<List<LedgerAccountDto>>> getLedgersByBranch(@PathVariable String branchName) {
		List<LedgerAccountDto> ledgers = accountManagementService.getLedgersByBranch(branchName);
		return ResponseEntity
				.ok(ApiResponse.success(HttpStatus.OK, "Ledgers for branch retrieved successfully", ledgers));
	}

	// Ayush
	@PostMapping("/deleteLedgerById") // Ayush
	public ResponseEntity<ApiResponse<String>> deleteLedger(@RequestParam("id") Long id) {
		boolean isDeleted = accountManagementService.deleteLedger(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Ledger Account deleted successfully",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.BAD_REQUEST, "Ledger Account deletion failed",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	// Search OutgoingPayment Entry
	@GetMapping("/search")
	public ResponseEntity<ApiResponse<List<OutgoingPaymentDto>>> searchPayments(@RequestParam String branchName,
			@RequestParam String startDate, @RequestParam String endDate) {
		List<OutgoingPaymentDto> results = accountManagementService.searchPayments(branchName, startDate, endDate);
		return ResponseEntity
				.ok(ApiResponse.success(HttpStatus.OK, "Outgoing Payments retrieved successfully", results));
	}

	// Create OutgoingPayment Entry
	@PostMapping("/createOutgoingPayment")
	public ResponseEntity<ApiResponse<OutgoingPaymentDto>> createOutgoingPayment(
			@Valid @RequestBody OutgoingPaymentDto dto) {
		OutgoingPaymentDto created = accountManagementService.createOutgoingPayment(dto);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(ApiResponse.success(HttpStatus.CREATED, "Outgoing payment created successfully", created));
	}

	// Get all OutgoingPayment Entries
	@GetMapping("/allOutgoingPayment")
	public ResponseEntity<ApiResponse<List<OutgoingPaymentDto>>> getAllOutgoingPayment() {
		List<OutgoingPaymentDto> payments = accountManagementService.getAllOutgoingPayment();

		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "All outgoing payments fetched", payments));
	}

	// Get OutgoingPayment by ID
	@GetMapping("/outgoingPayment/{id}")
	public ResponseEntity<ApiResponse<OutgoingPaymentDto>> getOutgoingPayment(@PathVariable Long id) {
		OutgoingPaymentDto dto = accountManagementService.getOutgoingPayment(id);

		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Outgoing payment retrieved successfully", dto));
	}

	@PostMapping("/deleteOutgoingPaymentById") // Ayush
	public ResponseEntity<ApiResponse<String>> deleteOutgoingPayment(@RequestParam("id") Long id) {
		boolean isDeleted = accountManagementService.deleteOutgoingPayment(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Outgoing Payment deleted successfully",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.BAD_REQUEST, "Outgoing Payment deletion failed",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	// SearchIncomingReceiptEntry

	@GetMapping("/searchIncomingReceipt")
	public ResponseEntity<ApiResponse<List<IncomingReceiptDto>>> searchIncomingReceipt(@RequestParam String branchName,
			@RequestParam String startDate, @RequestParam String endDate) {

		List<IncomingReceiptDto> results = accountManagementService.searchIncomingReceipt(branchName, startDate,
				endDate);
		return ResponseEntity
				.ok(ApiResponse.success(HttpStatus.OK, "Incoming Payments retrieved successfully", results));
	}

	// Create IncomingReceiptEntry
	@PostMapping("/createIncomingReceipt")
	public ResponseEntity<ApiResponse<IncomingReceiptDto>> createIncomingReceipt(
			@Valid @RequestBody IncomingReceiptDto dto) {
		IncomingReceiptDto created = accountManagementService.createIncomingReceipt(dto);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(ApiResponse.success(HttpStatus.CREATED, "Incoming Receipt Entry created successfully", created));

	}

	// Get all IncomingReceiptEntry
	@GetMapping("/allIncomingReceipt")
	public ResponseEntity<ApiResponse<List<IncomingReceiptDto>>> getAllIncomingReceipt() {
		List<IncomingReceiptDto> payments = accountManagementService.getAllIncomingReceipt();
		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "All Incoming Receipt Entry fetched", payments));
	}

	// Get IncomingReceiptEntry ID (for View)
	@GetMapping("/incomingReceipt/{id}")
	public ResponseEntity<ApiResponse<IncomingReceiptDto>> getIncomingReceipt(@PathVariable Long id) {
		IncomingReceiptDto dto = accountManagementService.getIncomingReceipt(id);

		return ResponseEntity
				.ok(ApiResponse.success(HttpStatus.OK, "Incoming Receipt Entry retrieved successfully", dto));
	}

	// Ayush
	@PostMapping("/deleteIncomingPaymentById") // Ayush
	public ResponseEntity<ApiResponse<String>> deleteIncomingPayment(@RequestParam("id") Long id) {
		boolean isDeleted = accountManagementService.deleteIncomingPayment(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Incoming Payment deleted successfully",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.BAD_REQUEST, "Incoming Payment deletion failed",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	// End Points for BankCashTransferEntry
	@GetMapping("/searchBankCashTransfer")
	public ResponseEntity<ApiResponse<List<BankCashTransferDto>>> searchBankCashTransfer(
			@RequestParam String branchName, @RequestParam String startDate, @RequestParam String endDate) {

		List<BankCashTransferDto> results = accountManagementService.searchBankCashTransfer(branchName, startDate,
				endDate);
		return ResponseEntity
				.ok(ApiResponse.success(HttpStatus.OK, " BankCashTransfer Entry retrieved successfully", results));

	}

	@PostMapping("/createBankCashTransfer")
	public ResponseEntity<ApiResponse<BankCashTransferDto>> createBankCashTransfer(
			@Valid @RequestBody BankCashTransferDto dto) {
		BankCashTransferDto created = accountManagementService.createBankCashTransfer(dto);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(ApiResponse.success(HttpStatus.CREATED, " BankCashTransfer Entry created successfully", created));
	}

	@GetMapping("/allBankCashTransfer")
	public ResponseEntity<ApiResponse<List<BankCashTransferDto>>> getAllBankCashTransfer() {
		List<BankCashTransferDto> entries = accountManagementService.getAllBankCashTransfer();
		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "All BankCashTransfer Entry fetched", entries));

	}

	@GetMapping("/bankCashTransfer/{id}")
	public ResponseEntity<ApiResponse<BankCashTransferDto>> getBankCashTransfer(@PathVariable Long id) {
		BankCashTransferDto dto = accountManagementService.getBankCashTransfer(id);
		return ResponseEntity
				.ok(ApiResponse.success(HttpStatus.OK, "BankCashTransfer Entry retrieved successfully With Id", dto));
	}

	// Ayush
	@PostMapping("/deleteBankCashTransferById")
	public ResponseEntity<ApiResponse<String>> deleteBankCashTransfer(@RequestParam("id") Long id) {
		boolean isDeleted = accountManagementService.deleteBankCashTransfer(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Bank Cash Transfer deleted successfully",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.BAD_REQUEST,
					"Bank Cash Transfer deletion failed", "failure");
			return ResponseEntity.badRequest().body(response);
		}
	}
	/*
	 * @GetMapping("/ledgerByBranchAndGroup/{branchName}") public
	 * ResponseEntity<ApiResponse<List<LedgerAccountMaster>>>
	 * getBankCashLedgersByBranch(
	 * 
	 * @PathVariable String branchName) { List<LedgerAccountMaster> ledgers =
	 * accountManagementService.getBankCashLedgersByBranch(branchName); return
	 * ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Filtered Ledgers",
	 * ledgers)); }
	 */

	// Account Management/Manual Journal Entry
	@GetMapping("/searchManualJournal")
	public ResponseEntity<ApiResponse<List<ManualJournalDto>>> searchManualJournal(@RequestParam String branchName,
			@RequestParam String startDate, @RequestParam String endDate) {
		List<ManualJournalDto> results = accountManagementService.searchManualJournal(branchName, startDate, endDate);
		return ResponseEntity
				.ok(ApiResponse.success(HttpStatus.OK, "Manual Journal Entry retrieved Succesfully", results));

	}

	@PostMapping("/createManualJournal")
	public ResponseEntity<ApiResponse<ManualJournalDto>> createManualJournal(@Valid @RequestBody ManualJournalDto dto) {
		ManualJournalDto created = accountManagementService.createManualJournal(dto);

		return ResponseEntity.status(HttpStatus.CREATED)
				.body(ApiResponse.success(HttpStatus.CREATED, "Manual Journal created successfully", created));
	}

	@GetMapping("/allManualJournal")
	public ResponseEntity<ApiResponse<List<ManualJournalDto>>> getAllManualJournal() {
		List<ManualJournalDto> entries = accountManagementService.getAllManualJournal();
		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "All ManualJournal Entry fetched", entries));
	}

	@GetMapping("/manualJournal/{id}")
	public ResponseEntity<ApiResponse<ManualJournalDto>> getManualJournal(@PathVariable Long id) {
		ManualJournalDto dto = accountManagementService.getManualJournal(id);
		return ResponseEntity
				.ok(ApiResponse.success(HttpStatus.OK, "Manual Journal retrieved successfully With Id", dto));
	}

	@PostMapping("/deleteManualJournalById") // Ayush
	public ResponseEntity<ApiResponse<String>> deleteManualJournalEntry(@RequestParam("id") Long id) {
		boolean isDeleted = accountManagementService.deleteManualJournalEntry(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Manual Journal Entry deleted successfully",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.BAD_REQUEST,
					"Manual Journal Entry deletion failed", "failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	@GetMapping("/eligibleLedgersForManualJournal/{branchName}")
	public ResponseEntity<ApiResponse<List<LedgerAccountMaster>>> getEligibleLedgersForManualJournal(
			@PathVariable String branchName) {
		List<LedgerAccountMaster> ledgers = accountManagementService.getEligibleLedgersForManualJournal(branchName);
		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Eligible ledgers fetched", ledgers));
	}

	@GetMapping("/ledger-summary")
	public ResponseEntity<ApiResponse<List<LedgerSummaryDto>>> getLedgerSummary(@RequestParam String branch,
			@RequestParam String ledger, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {

		List<LedgerSummaryDto> result = accountManagementService.getLedgerSummary(branch, ledger, startDate, endDate);

		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Fetched Successfully", result));
	}

	@GetMapping("/journal-entry-report")
	public ResponseEntity<ApiResponse<Map<String, Object>>> getJournalEntryReport(@RequestParam String branch,
			@RequestParam String voucherType, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {

		Map<String, Object> report = accountManagementService.getJournalEntryReport(branch, voucherType, startDate,
				endDate);

		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Journal Report Fetched Successfully", report));
	}

	@GetMapping("/trial-balance")
	public ResponseEntity<ApiResponse<List<TrialBalanceReportDto>>> getTrialBalance(@RequestParam String branch,
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {

		List<TrialBalanceReportDto> response = accountManagementService.getTrialBalance(branch, startDate, endDate);

		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Trial Balance Fetched Successfully", response));
	}

	// Ayush - Incentive Payment
	@PostMapping("/personal-sales")
	public ResponseEntity<Map<String, Object>> getPersonalSales(@RequestBody IncentiveRequest request) {

		long totalSales = accountManagementService.calculatePersonalSales(request.getTeamMemberCode(),
				request.getMonth(), request.getYear());

		Map<String, Object> response = new HashMap<>();
		response.put("teamMemberCode", request.getTeamMemberCode());
		response.put("personalSales", totalSales);

		return ResponseEntity.ok(response);
	}

	@PostMapping("/incentive-full-details")
	public ResponseEntity<ApiResponse> getFullIncentiveDetails(@RequestBody IncentiveRequest request) {

		Map<String, Object> response = accountManagementService.getFullIncentiveDetails(request);

		if (response == null || response.isEmpty()) {
			return ResponseEntity.ok(new ApiResponse(HttpStatus.NOT_FOUND, "No Incentive Data Found", null));
		}

		return ResponseEntity.ok(new ApiResponse(HttpStatus.FOUND, "Incentive Details Fetched Successfully", response));
	}

	@PostMapping("/save-incentive-payment")
	public ResponseEntity<ApiResponse> saveIncentivePayment(@RequestBody AccountIncentivePayment request) {

		String result = accountManagementService.saveIncentivePayment(request);

		if (result.equals("ALREADY_PAID")) {
			return ResponseEntity
					.ok(new ApiResponse(HttpStatus.CONFLICT, "Incentive Already Paid For This Month", null));
		}

		return ResponseEntity.ok(new ApiResponse(HttpStatus.OK, "Incentive Payment Saved Successfully", result));
	}

	@PostMapping("/deposit")
	public ResponseEntity<String> deposit(@RequestParam String accountNumber, @RequestParam Double amount) {

		accountManagementService.depositAmount(accountNumber, amount);

		return ResponseEntity.ok("Deposit Successful");
	}

	@GetMapping("/allPendingCheques")
	public ApiResponse<List<LoanPayment>> getAllPendingCheques() {
		List<LoanPayment> list = accountManagementService.findAllPendingCheques();
		return new ApiResponse<>(HttpStatus.OK, "All pending cheques", list);
	}

	@PostMapping("/search")
	public ApiResponse<List<LoanPayment>> searchCheque(@RequestParam String typeOfLoan, @RequestParam String branchName,
			@RequestParam String startDate, @RequestParam String endDate, @RequestParam String chequeNo) {

		try {
			List<LoanPayment> list = accountManagementService.searchCheque(typeOfLoan, branchName, startDate, endDate,
					chequeNo);

			if (list == null || list.isEmpty()) {
				return new ApiResponse<>(HttpStatus.NOT_FOUND, "No cheque records found.", list);
			}

			return new ApiResponse<>(HttpStatus.FOUND, "Cheque records fetched successfully.", list);

		} catch (Exception e) {
			e.printStackTrace();
			return new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, "Error while fetching cheque records.", null);
		}
	}

	@PostMapping("/clear")
	public ApiResponse<LoanPayment> clearCheque(@RequestParam Long id) {
		try {
			LoanPayment updated = accountManagementService.clearCheque(id);
			return new ApiResponse<>(HttpStatus.OK, "Cheque cleared. Payment marked as PAID.", updated);
		} catch (Exception e) {
			return new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to clear cheque.", null);
		}
	}

	@PostMapping("/bounce")
	public ApiResponse<LoanPayment> bounceCheque(@RequestParam Long id) {
		try {
			LoanPayment updated = accountManagementService.bounceCheque(id);
			return new ApiResponse<>(HttpStatus.OK, "Cheque bounced Successfully.", updated);
		} catch (Exception e) {
			return new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to bounce cheque.", null);
		}
	}

	// Incentive Payment
	@GetMapping("/assets")
	public ApiResponse<List<LedgerAccountMaster>> getAssetsLedgers() {

		List<LedgerAccountMaster> list = accountManagementService.getAssetsLedgers();

		if (list.isEmpty()) {
			return new ApiResponse<>(HttpStatus.NOT_FOUND, "No Assets Ledgers Found", list);
		}

		return new ApiResponse<>(HttpStatus.OK, "Assets Ledgers Fetched Successfully", list);
	}

	@GetMapping("/expenses")
	public ApiResponse<List<LedgerAccountMaster>> getExpenseLedgers() {

		List<LedgerAccountMaster> list = accountManagementService.getExpenseLedgers();

		if (list.isEmpty()) {
			return new ApiResponse<>(HttpStatus.NOT_FOUND, "No Expense Ledgers Found", list);
		}

		return new ApiResponse<>(HttpStatus.OK, "Expense Ledgers Fetched Successfully", list);
	}

	@PostMapping("/pay")
	public ApiResponse<IncentivePayment> payIncentive(@RequestBody IncentivePayment request) {
		try {
			IncentivePayment response = accountManagementService.saveAndPay(request);
			return new ApiResponse<>(HttpStatus.OK, "Incentive Paid Successfully", response);
		} catch (Exception e) {
			return new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, "Error: " + e.getMessage(), null);
		}
	}

	// Mandate Deposit to Bank
	@PostMapping("/saveMandateDeposit")
	public ResponseEntity<ApiResponse<MandateDepositDto>> save(@RequestBody MandateDepositDto dto) {

		ApiResponse<MandateDepositDto> response = accountManagementService.saveMandateDeposit(dto);

		return ResponseEntity.status(response.getStatus()) // HttpStatus directly use
				.body(response);
	}

//	// ================= SEARCH =================
//	@GetMapping("/listOfMandateDeposit")
//	public ResponseEntity<ApiResponse<List<MandateDepositDto>>> getByDateRange(@RequestParam String startDate,
//			@RequestParam String endDate) {
//
//		ApiResponse<List<MandateDepositDto>> response = accountManagementService.getByDateRange(startDate, endDate);
//
//		if (response.isStatus()) {
//			return new ResponseEntity<>(response, HttpStatus.OK); // 200
//		} else {
//			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST); // 400
//		}
//	}
//
//	// ================= GET BY ID =================
//	@GetMapping("/{id}")
//	public ResponseEntity<ApiResponse<MandateDepositDto>> getById(@PathVariable Long id) {
//
//		ApiResponse<MandateDepositDto> response = accountManagementService.getById(id);
//
//		if (response.isStatus()) {
//			return new ResponseEntity<>(response, HttpStatus.OK); // 200
//		} else {
//			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND); // 404
//		}
//	}

	// Bank Statement
	@GetMapping("/bank-statement")
	public ApiResponse<List<BankStatementDto>> getStatement(@RequestParam String accountNumber,
			@RequestParam String startDate, @RequestParam String endDate) {

		List<BankStatementDto> data = accountManagementService.getBankStatement(accountNumber, startDate, endDate);

		System.out.println(data);

		if (data.isEmpty()) {
			return new ApiResponse<>(HttpStatus.NOT_FOUND, "No Transactions Found", null);
		}

		return new ApiResponse<>(HttpStatus.OK, "Statement fetched successfully", data);
	}

	// Cash Book

	@PostMapping("/saveAccountTransaction")
	public ResponseEntity<ApiResponse<AccountTransaction>> saveTransaction(
			@RequestBody AccountTransactionRequest request) {

		try {

			AccountTransaction savedTransaction = accountManagementService.saveTransaction(request);

			ApiResponse<AccountTransaction> response = ApiResponse.success(HttpStatus.CREATED,
					"Account transaction saved successfully", savedTransaction);

			return ResponseEntity.status(HttpStatus.CREATED).body(response);

		} catch (RuntimeException e) {

			ApiResponse<AccountTransaction> response = ApiResponse.error(HttpStatus.BAD_REQUEST, e.getMessage());

			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

		} catch (Exception e) {

			ApiResponse<AccountTransaction> response = ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR,
					"Unable to save account transaction");

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@GetMapping("/getCashBookTransaction")
	public ApiResponse<List<AccountTransaction>> getCashBook(@RequestParam String branchName,
			@RequestParam String startDate, @RequestParam String endDate) {

		try {

			List<AccountTransaction> data = accountManagementService.getCashBookTransaction(branchName, startDate,
					endDate);

			if (data == null || data.isEmpty()) {
				return new ApiResponse<>(HttpStatus.NOT_FOUND, "No CashBook Transactions Found", null);
			}

			return new ApiResponse<>(HttpStatus.OK, "CashBook Data fetched successfully", data);

		} catch (Exception e) {

			return new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Error", null);
		}
	}

	// Funds Transfer Register
	@GetMapping("/fund-transfer")
	public ApiResponse<List<AccountTransaction>> getFundTransfer(@RequestParam String branchName,
			@RequestParam String startDate, @RequestParam String endDate) {

		try {
			List<AccountTransaction> data = accountManagementService.getFundTransfers(branchName, startDate, endDate);
			return new ApiResponse<>(HttpStatus.OK, "Fund Transfer fetched successfully", data);

		} catch (Exception e) {
			return new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Error", null);

		}
	}

	// Daily Transaction Book
	@GetMapping("/daily-transaction")
	public ApiResponse<List<AccountTransaction>> getDailyTransaction(@RequestParam String branchName,
			@RequestParam String accountCode, @RequestParam String startDate, @RequestParam String endDate) {

		try {

			List<AccountTransaction> data = accountManagementService.getDailyTransactions(branchName, accountCode,
					startDate, endDate);

			return new ApiResponse<>(HttpStatus.OK, "Daily Transaction fetched successfully", data);

		} catch (Exception e) {

			return new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Error", null);
		}
	}

	@GetMapping("/getUniqueLedgerDropdown")
	public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getLedgerDropdown() {
		List<Map<String, Object>> ledgers = accountManagementService.getUniqueLedgerDropdown();
		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Ledger dropdown retrieved successfully", ledgers));
	}

	// Trial Balance Report
	@GetMapping("/trial-balance-report")
	public ResponseEntity<ApiResponse<List<TrialBalanceDTO>>> getTrialBalance(@RequestParam String branchName,
			@RequestParam String startDate, @RequestParam String endDate) {

		// ✅ Validation
		if (branchName == null || branchName.trim().isEmpty()) {
			return ResponseEntity.badRequest().body(new ApiResponse<>("ERROR", "Branch is required", null));
		}

		if (startDate == null || endDate == null) {
			return ResponseEntity.badRequest().body(new ApiResponse<>("ERROR", "Date range is required", null));
		}

		List<TrialBalanceDTO> data = accountManagementService.getTrialBalance(branchName, startDate, endDate);

		return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Trial Balance fetched successfully", data));
	}

	// PL Statement
	@GetMapping("/pl-statementData")
	public ResponseEntity<ApiResponse<List<PLStatementDto>>> getPLStatement(
			@RequestParam(required = false) String branchName, @RequestParam String startDate,
			@RequestParam String endDate) {

		List<PLStatementDto> data = accountManagementService.getPLStatement(branchName, startDate, endDate);

		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "P&L data fetched successfully", data));
	}

	// Balance Sheet
	@GetMapping("/balance-sheet")
	public ResponseEntity<ApiResponse<BalanceSheetDTO>> getBalanceSheet(@RequestParam String branchName,
			@RequestParam String startDate, @RequestParam String endDate) {

		try {
			BalanceSheetDTO data = accountManagementService.getBalanceSheet(branchName, startDate, endDate);

			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Balance sheet fetched successfully", data));

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "Error: " + e.getMessage()));
		}
	}

	// Inter-Branch Cash Transfer
	@PostMapping("/inter-branch-transfer")
	public ResponseEntity<ApiResponse<String>> transferCash(@RequestBody InterBranchTransferDTO dto) {

		try {

			String response = accountManagementService.transferCash(dto);

			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, response, null));

		} catch (Exception e) {

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()));
		}
	}

	@GetMapping("/get-inter-branch-transfers")
	public ResponseEntity<ApiResponse<List<AccountTransaction>>> getInterBranchTransfers() {
		try {
			List<AccountTransaction> list = accountManagementService.getInterBranchTransfers();
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Transfer List Fetched Successfully", list));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()));
		}
	}

	@GetMapping("/bank-accounts")
	public ApiResponse<List<LedgerAccountMaster>> getBankAccountLedgers() {

		List<LedgerAccountMaster> list = accountManagementService.getBankAccountLedgers();

		if (list.isEmpty()) {
			return new ApiResponse<>(HttpStatus.NOT_FOUND, "No Active Bank Accounts Found", list);
		}

		return new ApiResponse<>(HttpStatus.OK, "Active Bank Accounts Fetched Successfully", list);
	}

}
