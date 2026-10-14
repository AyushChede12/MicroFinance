package com.microfinance.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.microfinance.dto.AccountTransactionRequest;
import com.microfinance.dto.ApiResponse;
import com.microfinance.dto.BalanceSheetDTO;
import com.microfinance.dto.BalanceSheetItemDTO;
import com.microfinance.dto.BankCashTransferDto;
import com.microfinance.dto.BankStatementDto;
import com.microfinance.dto.IncentiveRequest;
import com.microfinance.dto.IncomingReceiptDto;
import com.microfinance.dto.InterBranchTransferDTO;
import com.microfinance.dto.JournalEntryReportDto;
import com.microfinance.dto.LedgerAccountDto;
import com.microfinance.dto.LedgerSummaryDto;
import com.microfinance.dto.MandateDepositDto;
import com.microfinance.dto.ManualJournalDto;
import com.microfinance.dto.OutgoingPaymentDto;
import com.microfinance.dto.PLStatementDto;
import com.microfinance.dto.TrialBalanceDTO;
import com.microfinance.dto.TrialBalanceReportDto;
import com.microfinance.exception.BadRequestException;
import com.microfinance.exception.BusinessLogicException;
import com.microfinance.exception.ResourceNotFoundException;
import com.microfinance.model.AccountIncentivePayment;
import com.microfinance.model.AccountTransaction;
import com.microfinance.model.AddnewinvestmentPM;
import com.microfinance.model.ApplyForGold;
import com.microfinance.model.BankCashTransferEntry;
import com.microfinance.model.BankTransaction;
import com.microfinance.model.CreateSavingsAccount;
import com.microfinance.model.IncentivePayment;
import com.microfinance.model.IncomingReceiptEntry;
import com.microfinance.model.LedgerAccountMaster;
import com.microfinance.model.LoanApplication;
import com.microfinance.model.LoanPayment;
import com.microfinance.model.MandateDeposit;
import com.microfinance.model.ManualJournalEntry;
import com.microfinance.model.OutgoingPaymentEntry;
import com.microfinance.model.TeamMember;
import com.microfinance.model.addFinancialConsultant;
import com.microfinance.repository.AccountIcentivePaymentRepo;
import com.microfinance.repository.AccountTransactionRepo;
import com.microfinance.repository.AddInvestmentRepo;
import com.microfinance.repository.ApplyForGoldRepo;
import com.microfinance.repository.BankCashTransferRepo;
import com.microfinance.repository.BankTransactionRepo;
import com.microfinance.repository.BranchModuleRepo;
import com.microfinance.repository.CreateSavingAccountRepo;
import com.microfinance.repository.FinancialConsultantRepo;
import com.microfinance.repository.IncentiveRepo;
import com.microfinance.repository.IncomingReceiptRepo;
import com.microfinance.repository.JournalEntryReportRepo;
import com.microfinance.repository.LedgerAccountRepository;
import com.microfinance.repository.LedgerSummaryRepo;
import com.microfinance.repository.LoanApplicationRepo;
import com.microfinance.repository.LoanPaymentRepo;
import com.microfinance.repository.MandateDepositRepository;
import com.microfinance.repository.ManualJournalRepo;
import com.microfinance.repository.NewLoanAppicationRepo;
import com.microfinance.repository.OutgoingPaymentRepo;
import com.microfinance.repository.TeamMemberRepo;
import com.microfinance.repository.TrialBalanceReportRepo;

@Service
public class AccountManagementService {

	@Autowired
	private BranchModuleRepo branchModuleRepo;

	@Autowired
	private LedgerAccountRepository ledgerAccountRepository;

	@Autowired
	private OutgoingPaymentRepo outgoingPaymentRepo;

	@Autowired
	private IncomingReceiptRepo incomingReceiptRepo;

	@Autowired
	private BankCashTransferRepo bankCashTransferRepo;

	@Autowired
	private ManualJournalRepo manualJournalRepo;

	@Autowired
	private LedgerSummaryRepo ledgerSummaryRepo;

	@Autowired
	private JournalEntryReportRepo journalEntryReportRepo;

	@Autowired
	private TrialBalanceReportRepo trialBalanceReportRepo;

	@Autowired
	private FinancialConsultantRepo financialConsultantRepo;

	@Autowired
	private CreateSavingAccountRepo createSavingAccountRepo;

	@Autowired
	private LoanApplicationRepo loanAppicationRepo;

	@Autowired
	private AddInvestmentRepo addInvestmentRepo;

	@Autowired
	private ApplyForGoldRepo applyForGoldRepo;

	@Autowired
	private TeamMemberRepo teamMemberRepo;

	@Autowired
	private AccountIcentivePaymentRepo accountIcentivePaymentRepo;

	@Autowired
	private AccountTransactionRepo transactionRepository;

	@Autowired
	private LoanPaymentRepo loanPaymentRepo;

	@Autowired
	private IncentiveRepo incentiveRepo;

	@Autowired
	private MandateDepositRepository mandateDepositRepo;

	@Autowired
	private BankTransactionRepo bankTransactionRepo;

	@Autowired
	private CreateSavingAccountRepo createSavingsAccountRepo;

	@Autowired
	private AccountTransactionRepo accountTransactionRepo;

	/**
	 * Create a new Ledger Account. Business Logic: - Title must be unique per
	 * branch - Title must have at least 3 characters
	 */
	private static final Pattern ACCOUNT_CODE_PATTERN = Pattern.compile("^[1-5]\\d{2}$"); // 3 digits, 1-5 first digit

	@Transactional
	public LedgerAccountDto createLedger(LedgerAccountDto dto) {

		// =========================
		// BASIC VALIDATION
		// =========================

		validateLedgerData(dto);

		// =========================
		// ACCOUNT CODE VALIDATION
		// =========================

		if (!ACCOUNT_CODE_PATTERN.matcher(dto.getAccountCode().trim()).matches()) {

			throw new BusinessLogicException(
					"ACCOUNT CODE MUST BE A 3-DIGIT CODE STARTING WITH 1..5 (EXAMPLE: 101, 201, 501)");
		}

		// =========================
		// GROUP + ACCOUNT CODE VALIDATION
		// =========================

		validateGroupMatchesAccountCode(

				dto.getGroupName(),

				dto.getAccountCode());

		// =========================
		// BRANCH EXISTENCE CHECK
		// =========================

		boolean branchExists = branchModuleRepo.existsByBranchName(

				dto.getBranchName().trim());

		if (!branchExists) {

			throw new BusinessLogicException(

					"SELECTED BRANCH DOES NOT EXIST");
		}

		// =========================
		// ACCOUNT CODE + BRANCH CHECK
		// =========================

		boolean codeExists = ledgerAccountRepository.existsByAccountCodeIgnoreCaseAndBranchName(

				dto.getAccountCode().trim(),

				dto.getBranchName().trim());

		if (codeExists) {

			throw new BusinessLogicException(

					"LEDGER WITH THIS ACCOUNT CODE ALREADY EXISTS IN THIS BRANCH");
		}

		// =========================
		// ACCOUNT TITLE + BRANCH CHECK
		// =========================

		boolean titleExists = ledgerAccountRepository.existsByAccountTitleIgnoreCaseAndBranchNameTrimmed(

				dto.getAccountTitle().trim(),

				dto.getBranchName().trim());

		if (titleExists) {

			throw new BusinessLogicException(

					"LEDGER WITH THIS TITLE ALREADY EXISTS IN THIS BRANCH");
		}

		// =========================
		// GROUP + ACCOUNT TYPE VALIDATION
		// =========================

//			if (!isValidCombination(
		//
//					dto.getGroupName(),
		//
//					dto.getAccountType())) {
		//
//				throw new BusinessLogicException(
		//
//						"INVALID ACCOUNT TYPE FOR SELECTED GROUP");
//			}

		// =========================
		// OPENING BALANCE DEFAULT
		// =========================

		if (dto.getOpeningBalance() == null) {

			dto.setOpeningBalance(BigDecimal.ZERO);
		}

		// =========================
		// AUTO DR / CR SETTING
		// =========================

		String group = dto.getGroupName().trim().toUpperCase();

		if (group.equals("ASSETS") || group.equals("EXPENSES")) {

			dto.setOpeningBalanceType("DR");

		} else if (group.equals("LIABILITIES") || group.equals("EQUITY") || group.equals("INCOME")) {

			dto.setOpeningBalanceType("CR");

		} else {

			throw new BusinessLogicException(

					"INVALID ACCOUNT GROUP");
		}

		// =========================
		// CURRENT BALANCE SET
		// =========================

		dto.setCurrentBalance(dto.getOpeningBalance());

		// =========================
		// STATUS DEFAULT
		// =========================

		if (dto.getStatus() == null || dto.getStatus().trim().isEmpty()) {

			dto.setStatus("Active");
		}

		// =========================
		// SAVE ENTITY
		// =========================

		LedgerAccountMaster entity = mapToEntity(dto);

		LedgerAccountMaster savedEntity =

				ledgerAccountRepository.save(entity);

		// =========================
		// RETURN DTO
		// =========================

		return mapToDto(savedEntity);
	}

	// Minimal guardrail mapping (Java 8 version)
	private static final Map<String, List<String>> ALLOWED_COMBINATIONS;
	static {
		Map<String, List<String>> map = new HashMap<>();
		map.put("ASSETS", Arrays.asList("CASH", "BANK", "LOAN_TO_MEMBERS", "GOLD_LOANS", "JOINT_LOANS", "RECEIVABLE"));
		map.put("LIABILITIES", Arrays.asList("MEMBER_SAVINGS", "RD_PAYABLE", "FD_PAYABLE", "DAILY_DEPOSIT_PAYABLE",
				"MIS_PAYABLE", "LOAN_FROM_BANK", "PAYABLE"));
		map.put("INCOME", Arrays.asList("SERVICE_FEES", "INTEREST", "DIVIDEND", "MEMBER_CONTRIBUTION", "POLICY_FEES"));
		map.put("EQUITY", Arrays.asList("SHARE", "CAPITAL"));
		map.put("EXPENSES", Arrays.asList("SALARY", "RENT", "OFFICE", "UTILITIES", "CONSULTANT_INCENTIVES",
				"COMMISSIONS", "POLICY_ADMIN"));

		ALLOWED_COMBINATIONS = Collections.unmodifiableMap(map);
	}

	private boolean isValidCombination(String group, String type) {
		if (group == null || type == null) {
			return false;
		}

		group = group.trim().toUpperCase();
		type = type.trim().toUpperCase();

		List<String> allowedTypes = ALLOWED_COMBINATIONS.get(group);
		return allowedTypes != null && allowedTypes.contains(type);
	}

	/**
	 * Fetch all ledger accounts.
	 */

	public List<LedgerAccountDto> getAllLedgers() {
		return ledgerAccountRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
	}

	/**
	 * Fetch ledger account by ID.
	 * 
	 */
	public LedgerAccountDto getLedgerById(Long id) {
		LedgerAccountMaster entity = ledgerAccountRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Ledger", "id", id));
		return mapToDto(entity);
	}

	public List<String> groupNames() {
		return Arrays.asList("ASSETS", "LIABILITIES", "INCOME", "EQUITY", "EXPENSES");
	}

	public List<LedgerAccountDto> getLedgersByBranch(String branchName) {
		List<LedgerAccountMaster> ledgers = ledgerAccountRepository.findByBranchName(branchName);
		if (ledgers.isEmpty()) {
			throw new ResourceNotFoundException("NO LEDGERS FOUND FOR BRANCH '" + branchName + "'");
		}
		return ledgers.stream().map(this::mapToDto).collect(Collectors.toList());
	}

	// ====== Private util methods ======
	private void validateLedgerData(LedgerAccountDto dto) {
		if (dto.getAccountTitle().trim().length() < 3) {
			throw new BusinessLogicException("ACCOUNT TITLE MUST BE AT LEAST 3 CHARACTERS LONG");
		}
		if (dto.getAccountCode().trim().isEmpty()) {
			throw new BusinessLogicException("ACCOUNT CODE IS REQUIRED");
		}
	}

	private void validateGroupMatchesAccountCode(String group, String accountCode) {
		if (accountCode == null || accountCode.length() < 1)
			return;
		char first = accountCode.charAt(0);
		switch (group.toUpperCase(Locale.ROOT)) {
		case "ASSETS":
			if (first != '1')
				throw new BusinessLogicException("ASSETS MUST HAVE ACCOUNT CODES IN 1XX RANGE.");
			break;
		case "LIABILITIES":
			if (first != '2')
				throw new BusinessLogicException("LIABILITIES MUST HAVE ACCOUNT CODES IN 2XX RANGE.");
			break;
		case "INCOME":
			if (first != '3')
				throw new BusinessLogicException("INCOME MUST HAVE ACCOUNT CODES IN 3XX RANGE.");
			break;
		case "EQUITY":
			if (first != '4')
				throw new BusinessLogicException("EQUITY MUST HAVE ACCOUNT CODES IN 4XX RANGE.");
			break;
		case "EXPENSES":
			if (first != '5')
				throw new BusinessLogicException("EXPENSES MUST HAVE ACCOUNT CODES IN 5XX RANGE.");
			break;
		default:
			throw new BusinessLogicException("UNKNOWN GROUP: " + group);
		}
	}

	private LedgerAccountMaster mapToEntity(LedgerAccountDto dto) {
		LedgerAccountMaster entity = new LedgerAccountMaster();
		entity.setAccountId(dto.getAccountId());
		entity.setAccountCode(dto.getAccountCode());
		entity.setAccountTitle(dto.getAccountTitle());
		entity.setGroupName(dto.getGroupName());
		entity.setAccountType(dto.getAccountType());
		entity.setOpeningBalance(dto.getOpeningBalance());
		entity.setOpeningBalanceType(dto.getOpeningBalanceType()); // <-- NEW
		entity.setCurrentBalance(dto.getCurrentBalance());
		entity.setStatus(dto.getStatus());
		entity.setBranchName(dto.getBranchName());
		return entity;
	}

	private void updateLedgerBalances(String branchName, String debitLedgerTitle, String creditLedgerTitle,
			BigDecimal amount) {

		// Debit Ledger (DR)
		LedgerAccountMaster debitLedger = ledgerAccountRepository
				.findByBranchNameAndAccountTitleIgnoreCase(branchName, debitLedgerTitle)
				.orElseThrow(() -> new BadRequestException("DEBIT LEDGER NOT FOUND: " + debitLedgerTitle));

		// Credit Ledger (CR)
		LedgerAccountMaster creditLedger = ledgerAccountRepository
				.findByBranchNameAndAccountTitleIgnoreCase(branchName, creditLedgerTitle)
				.orElseThrow(() -> new BadRequestException("CREDIT LEDGER NOT FOUND: " + creditLedgerTitle));

		// DR Ledger: Increase
		debitLedger.setCurrentBalance(debitLedger.getCurrentBalance().add(amount));

		// CR Ledger: Decrease
		creditLedger.setCurrentBalance(creditLedger.getCurrentBalance().subtract(amount));

		// Save both ledgers
		ledgerAccountRepository.save(debitLedger);
		ledgerAccountRepository.save(creditLedger);
	}

	private LedgerAccountDto mapToDto(LedgerAccountMaster entity) {
		LedgerAccountDto dto = new LedgerAccountDto();
		dto.setAccountId(entity.getAccountId());
		dto.setAccountCode(entity.getAccountCode());
		dto.setAccountTitle(entity.getAccountTitle());
		dto.setGroupName(entity.getGroupName());
		dto.setAccountType(entity.getAccountType());
		dto.setOpeningBalance(entity.getOpeningBalance());
		dto.setOpeningBalanceType(entity.getOpeningBalanceType()); // <-- NEW
		dto.setCurrentBalance(entity.getCurrentBalance());
		dto.setStatus(entity.getStatus());
		dto.setBranchName(entity.getBranchName());
		return dto;
	}

	/**
	 * Searches for outgoing payment entries by branch name and date range.
	 *
	 * @param branchName The name of the branch to search payments for.
	 * @param startDate  The start date of the range in yyyy-MM-dd format.
	 * @param endDate    The end date of the range in yyyy-MM-dd format.
	 * @return List of {@link OutgoingPaymentEntry} matching the search criteria.
	 * @throws BadRequestException if the date format is invalid, if the end date is
	 *                             before the start date, or if the end date is in
	 *                             the future.
	 */
	public List<OutgoingPaymentDto> searchPayments(String branchName, String startDate, String endDate) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate start;
		LocalDate end;

		try {
			start = LocalDate.parse(startDate, formatter);
			end = LocalDate.parse(endDate, formatter);
		} catch (DateTimeParseException e) {
			throw new BadRequestException("INVALID DATE FORMAT. EXPECTED YYYY-MM-DD.");
		}

		if (!branchModuleRepo.existsByBranchNameIgnoreCase(branchName)) {
			throw new BadRequestException("INVALID BRANCH NAME: " + branchName);
		}

		if (end.isBefore(start)) {
			throw new BadRequestException("END DATE CANNOT BE BEFORE START DATE.");
		}

		if (end.isAfter(LocalDate.now())) {
			throw new BadRequestException("END DATE CANNOT BE IN THE FUTURE.");
		}

		// If your repository expects LocalDate range
		// If your repository still expects String format, then:
		List<OutgoingPaymentEntry> entries = outgoingPaymentRepo.findByBranchNameAndDateOfEntryBetween(branchName,
				start.format(formatter), end.format(formatter));
		return entries.stream().map(this::mapToDto).collect(Collectors.toList());
	}

	/**
	 * Create a new Outgoing Payment Entry.
	 * 
	 * Business Logic: - Branch and Ledger must exist (validated with
	 * case-insensitive match, but saved with original DB casing) - Date must be in
	 * 'yyyy-MM-dd' format and cannot be in the future - Duplicate entries are
	 * prevented using branch, ledger, date, amount, mode, and remarks - Receipt ID
	 * is auto-generated in the format: RCPT-{BRANCH}-{DATE}-{UUID}
	 */
	@Transactional
	public OutgoingPaymentDto createOutgoingPayment(OutgoingPaymentDto dto) {
		// Trimming & Normalization
		dto.setBranchName(dto.getBranchName() != null ? dto.getBranchName().trim() : null);
		dto.setDebitLedger(dto.getDebitLedger() != null ? dto.getDebitLedger().trim() : null);
		dto.setCreditLedger(dto.getCreditLedger() != null ? dto.getCreditLedger().trim() : null);
		dto.setRemarks(dto.getRemarks() != null ? dto.getRemarks().replaceAll("\\s+", " ").trim().toLowerCase() : null);

		validateOutgoingPayment(dto);
		OutgoingPaymentEntry entity = mapToEntity(dto);

		// 📌 Auto-generate Receipt ID
		String branch = dto.getBranchName().toUpperCase();
		String dateStr = dto.getDateOfEntry().replace("-", "");
		String shortUUID = UUID.randomUUID().toString().substring(0, 8);
		String voucherId = "PMT-" + branch + "-" + dateStr + "-" + shortUUID;
		entity.setVoucherID(voucherId);

		BigDecimal amount = new BigDecimal(dto.getTransactionAmount());
		updateLedgerBalances(dto.getBranchName(), dto.getDebitLedger(), dto.getCreditLedger(), amount);
		return mapToDto(outgoingPaymentRepo.save(entity));
	}

	/**
	 * Validates the fields of an outgoing payment DTO.
	 *
	 * Checks include:
	 * <ul>
	 * <li>Branch must exist in DB.</li>
	 * <li>Date format must be 'yyyy-MM-dd' and not in the future.</li>
	 * <li>Ledger account must exist.</li>
	 * <li>Transfer mode must be from allowed values.</li>
	 * <li>Transaction amount must be numeric.</li>
	 * </ul>
	 *
	 * @param dto The {@link OutgoingPaymentDto} to validate.
	 * @throws BadRequestException if any validation rule fails.
	 */
	private void validateOutgoingPayment(OutgoingPaymentDto dto) {

		// 1. Validate Branch
		if (!branchModuleRepo.existsByBranchNameIgnoreCase(dto.getBranchName())) {
			throw new BadRequestException("INVALID BRANCH NAME: " + dto.getBranchName());
		}

		// 2. Validate Date Format
		LocalDate parsedDate;

		try {

			parsedDate = LocalDate.parse(dto.getDateOfEntry(), DateTimeFormatter.ofPattern("yyyy-MM-dd"));

			if (parsedDate.isAfter(LocalDate.now())) {
				throw new BadRequestException("DATE OF ENTRY CANNOT BE IN THE FUTURE.");
			}

			dto.setDateOfEntry(parsedDate.toString());

		} catch (DateTimeParseException e) {

			throw new BadRequestException("INVALID DATE FORMAT. EXPECTED YYYY-MM-DD.");
		}

		// 3. Validate Credit Ledger
		// Credit Ledger = Source of Payment
		// Must be under Assets
		// Allowed Account Types:
		// 1. CASH IN HAND
		// 2. BANK ACCOUNT

		LedgerAccountMaster creditLedger = ledgerAccountRepository
				.findByBranchNameAndAccountTitleIgnoreCase(dto.getBranchName(), dto.getCreditLedger())
				.orElseThrow(() -> new BadRequestException("INVALID CREDIT LEDGER FOR BRANCH: " + dto.getBranchName()));

		String creditGroup = creditLedger.getGroupName();
		String creditType = creditLedger.getAccountType();

		boolean validCreditLedger = "Assets".equalsIgnoreCase(creditGroup)
				&& ("CASH IN HAND".equalsIgnoreCase(creditType) || "BANK ACCOUNT".equalsIgnoreCase(creditType));

		if (!validCreditLedger) {

			throw new BadRequestException("INVALID CREDIT LEDGER. CREDIT LEDGER MUST BE "
					+ "CASH IN HAND OR BANK ACCOUNT UNDER ASSETS GROUP.");
		}

		// 4. Validate Debit Ledger
		// Debit Ledger = Loan / Payment Destination
		// LOANS is maintained under Assets group
		//
		// Allowed:
		// Assets -> LOANS

		LedgerAccountMaster debitLedger = ledgerAccountRepository
				.findByBranchNameAndAccountTitleIgnoreCase(dto.getBranchName(), dto.getDebitLedger())
				.orElseThrow(() -> new BadRequestException("INVALID DEBIT LEDGER FOR BRANCH: " + dto.getBranchName()));

		String debitGroup = debitLedger.getGroupName();
		String debitType = debitLedger.getAccountType();

		boolean validDebitLedger = "Assets".equalsIgnoreCase(debitGroup) && "LOANS".equalsIgnoreCase(debitType);

		if (!validDebitLedger) {

			throw new BadRequestException("INVALID DEBIT LEDGER. DEBIT LEDGER MUST BE " + "LOANS UNDER ASSETS GROUP.");
		}

		// 5. Validate Transfer Mode

		List<String> validModes = Arrays.asList("Cash", "Bank", "UPI", "Cheque", "Online Transfer");

		boolean validTransferMode = validModes.stream().anyMatch(mode -> mode.equalsIgnoreCase(dto.getTransferMode()));

		if (!validTransferMode) {

			throw new BadRequestException("INVALID TRANSFER MODE: " + dto.getTransferMode());
		}

		// 6. Validate Cheque Details

		if ("Cheque".equalsIgnoreCase(dto.getTransferMode())) {

			if (dto.getChequeNo() == null || dto.getChequeNo().trim().isEmpty()) {

				throw new BadRequestException("CHEQUE NO IS REQUIRED.");
			}

			if (dto.getChequeDate() == null) {

				throw new BadRequestException("CHEQUE DATE IS REQUIRED.");
			}

			if (dto.getBankName() == null || dto.getBankName().trim().isEmpty()) {

				throw new BadRequestException("BANK NAME IS REQUIRED.");
			}
		}

		// 7. Validate Online Transfer Details
		// Handles "Online Transfer" correctly

		if ("Online Transfer".equalsIgnoreCase(dto.getTransferMode())) {

			if (dto.getTransactionRef() == null || dto.getTransactionRef().trim().isEmpty()) {

				throw new BadRequestException("TRANSACTION REF IS REQUIRED.");
			}
		}

		// 8. Validate Transaction Amount

		if (dto.getTransactionAmount() == null || dto.getTransactionAmount().trim().isEmpty()) {

			throw new BadRequestException("TRANSACTION AMOUNT IS REQUIRED.");
		}

		try {

			BigDecimal amount = new BigDecimal(dto.getTransactionAmount().trim());

			if (amount.compareTo(BigDecimal.ZERO) <= 0) {

				throw new BadRequestException("TRANSACTION AMOUNT MUST BE GREATER THAN ZERO.");
			}

		} catch (NumberFormatException e) {

			throw new BadRequestException("INVALID TRANSACTION AMOUNT.");
		}
	}

	/**
	 * Retrieves all outgoing payment entries from the database.
	 *
	 * @return List of {@link OutgoingPaymentDto} representing all outgoing
	 *         payments.
	 */
	public List<OutgoingPaymentDto> getAllOutgoingPayment() {
		return outgoingPaymentRepo.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
	}

	/**
	 * Retrieves a specific outgoing payment by its unique identifier.
	 *
	 * @param id The ID of the outgoing payment to retrieve.
	 * @return {@link OutgoingPaymentDto} representing the found outgoing payment.
	 * @throws ResourceNotFoundException if no payment is found with the given ID.
	 */
	public OutgoingPaymentDto getOutgoingPayment(Long id) {
		OutgoingPaymentEntry entity = outgoingPaymentRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("OutgoingPayment", "id", id));
		return mapToDto(entity);
	}

	private OutgoingPaymentEntry mapToEntity(OutgoingPaymentDto dto) {
		OutgoingPaymentEntry entity = new OutgoingPaymentEntry();
		entity.setId(dto.getId());
		entity.setBranchName(dto.getBranchName());
		entity.setDateOfEntry(dto.getDateOfEntry());
		entity.setCreditLedger(dto.getCreditLedger());
		entity.setDebitLedger(dto.getDebitLedger());
		entity.setTransferMode(dto.getTransferMode());
		entity.setChequeDate(dto.getChequeDate());
		entity.setChequeNo(dto.getChequeNo());
		entity.setBankName(dto.getBankName());
		entity.setTransactionRef(dto.getTransactionRef());
		entity.setTransactionAmount(dto.getTransactionAmount());
		entity.setRemarks(dto.getRemarks());
		return entity;
	}

	private OutgoingPaymentDto mapToDto(OutgoingPaymentEntry entity) {
		OutgoingPaymentDto dto = new OutgoingPaymentDto();
		dto.setId(entity.getId());
		dto.setBranchName(entity.getBranchName());
		dto.setVoucherID(entity.getVoucherID());
		dto.setDateOfEntry(entity.getDateOfEntry());
		dto.setCreditLedger(entity.getCreditLedger());
		dto.setDebitLedger(entity.getDebitLedger());
		dto.setTransferMode(entity.getTransferMode());
		dto.setChequeDate(entity.getChequeDate());
		dto.setChequeNo(entity.getChequeNo());
		dto.setBankName(entity.getBankName());
		dto.setTransactionRef(entity.getTransactionRef());
		dto.setTransactionAmount(entity.getTransactionAmount());
		dto.setRemarks(entity.getRemarks());
		return dto;
	}

	/**
	 * Searches for Incoming Receipt entries by branch name and date range.
	 *
	 * @param branchName The name of the branch to search payments for.
	 * @param startDate  The start date of the range in yyyy-MM-dd format.
	 * @param endDate    The end date of the range in yyyy-MM-dd format.
	 * @return List of {@link OutgoingPaymentEntry} matching the search criteria.
	 * @throws BadRequestException if the date format is invalid, if the end date is
	 *                             before the start date, or if the end date is in
	 *                             the future.
	 */

	public List<IncomingReceiptDto> searchIncomingReceipt(String branchName, String startDate, String endDate) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate start;
		LocalDate end;

		try {
			start = LocalDate.parse(startDate, formatter);
			end = LocalDate.parse(endDate, formatter);
		} catch (DateTimeParseException e) {
			throw new BadRequestException("INVALID DATE FORMAT. EXPECTED YYYY-MM-DD.");
		}
		if (!branchModuleRepo.existsByBranchNameIgnoreCase(branchName)) {
			throw new BadRequestException("INVALID BRANCH NAME: " + branchName);
		}

		if (end.isBefore(start)) {
			throw new BadRequestException("END DATE CANNOT BE BEFORE START DATE.");
		}

		if (end.isAfter(LocalDate.now())) {
			throw new BadRequestException("END DATE CANNOT BE IN THE FUTURE.");
		}

		List<IncomingReceiptEntry> entries = incomingReceiptRepo.findByBranchNameAndDateOfEntryBetween(branchName,
				start.format(formatter), end.format(formatter));

		return entries.stream().map(this::mapToDto).collect(Collectors.toList());

	}

	/**
	 * Create a new Incoming Receipt Entry.
	 * 
	 * Business Logic: - Branch and Ledger must exist (validated with
	 * case-insensitive match, but saved with original DB casing) - Date must be in
	 * 'yyyy-MM-dd' format and cannot be in the future - Duplicate entries are
	 * prevented using branch, ledger, date, amount, mode, and remarks - Receipt ID
	 * is auto-generated in the format: RCPT-{BRANCH}-{DATE}-{UUID}
	 */

	@Transactional
	public IncomingReceiptDto createIncomingReceipt(IncomingReceiptDto dto) {

		// Trimming & Normalization
		dto.setBranchName(dto.getBranchName() != null ? dto.getBranchName().trim() : null);
		dto.setDebitLedger(dto.getDebitLedger() != null ? dto.getDebitLedger().trim() : null);
		dto.setCreditLedger(dto.getCreditLedger() != null ? dto.getCreditLedger().trim() : null);
		dto.setRemarks(dto.getRemarks() != null ? dto.getRemarks().replaceAll("\\s+", " ").trim().toLowerCase() : null);

		// Branch validation
		branchModuleRepo.findByBranchNameIgnoreCase(dto.getBranchName()).map(branch -> {
			dto.setBranchName(branch.getBranchName());
			return branch;
		}).orElseThrow(() -> new BadRequestException("INVALID BRANCH NAME: " + dto.getBranchName()));

		validateIncomingReceipt(dto);

		IncomingReceiptEntry entity = mapToEntity(dto);

		// 📌 Auto-generate Receipt ID
		String branch = dto.getBranchName().toUpperCase();
		String dateStr = dto.getDateOfEntry().replace("-", "");
		String shortUUID = UUID.randomUUID().toString().substring(0, 8);
		String voucherID = "RCPT-" + branch + "-" + dateStr + "-" + shortUUID;

		entity.setVoucherID(voucherID);

		// Update ledger balances
		BigDecimal amount = new BigDecimal(dto.getTransactionAmount());
		updateLedgerBalances(dto.getBranchName(), dto.getDebitLedger(), dto.getCreditLedger(), amount);

		return mapToDto(incomingReceiptRepo.save(entity));
	}

	private void validateIncomingReceipt(IncomingReceiptDto dto) {

		// 1. Validate branch
		if (!branchModuleRepo.existsByBranchNameIgnoreCase(dto.getBranchName())) {
			throw new BadRequestException("INVALID BRANCH NAME: " + dto.getBranchName());
		}

		// 2. Validate date format
		LocalDate parsedDate;
		try {
			parsedDate = LocalDate.parse(dto.getDateOfEntry(), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
			if (parsedDate.isAfter(LocalDate.now())) {
				throw new BadRequestException("DATE OF ENTRY CANNOT BE IN THE FUTURE.");
			}
			dto.setDateOfEntry(parsedDate.toString());
		} catch (DateTimeParseException e) {
			throw new BadRequestException("INVALID DATE FORMAT. EXPECTED YYYY-MM-DD.");
		}

		// 3. Validate Debit Ledger (Destination → Cash/Bank under Assets)
		LedgerAccountMaster debitLedger = ledgerAccountRepository
				.findByBranchNameAndAccountTitleIgnoreCase(dto.getBranchName(), dto.getDebitLedger())
				.orElseThrow(() -> new BadRequestException("INVALID DEBIT LEDGER FOR BRANCH: " + dto.getBranchName()));

		if (!"Assets".equalsIgnoreCase(debitLedger.getGroupName())
				|| !(debitLedger.getAccountType().equalsIgnoreCase("Cash In Hand")
						|| debitLedger.getAccountType().equalsIgnoreCase("Bank Account"))) {
			throw new BadRequestException("DEBIT LEDGER MUST BE CASH/BANK UNDER ASSETS GROUP.");
		}

		// 4. Validate Credit Ledger (Source → Liabilities, Equity, or Income)
		LedgerAccountMaster creditLedger = ledgerAccountRepository
				.findByBranchNameAndAccountTitleIgnoreCase(dto.getBranchName(), dto.getCreditLedger())
				.orElseThrow(() -> new BadRequestException("INVALID CREDIT LEDGER FOR BRANCH: " + dto.getBranchName()));

		if (!(creditLedger.getGroupName().equalsIgnoreCase("Liabilities")
				|| creditLedger.getGroupName().equalsIgnoreCase("Equity")
				|| creditLedger.getGroupName().equalsIgnoreCase("Income")
				|| (creditLedger.getGroupName().equalsIgnoreCase("Assets")
						&& (creditLedger.getAccountType().equalsIgnoreCase("LOANS"))))) {
			throw new BadRequestException("CREDIT LEDGER MUST BELONG TO LIABILITIES, EQUITY, OR INCOME.");
		}

		// 5. Validate transfer mode
		List<String> validModes = Arrays.asList("Cash", "Bank", "UPI", "Cheque", "Online Transfer");
		if (!validModes.contains(dto.getTransferMode())) {
			throw new BadRequestException("INVALID TRANSFER MODE: " + dto.getTransferMode());

		}
		if ("CHEQUE".equalsIgnoreCase(dto.getTransferMode())) {
			if (dto.getChequeNo() == null || dto.getChequeNo().trim().isEmpty()) {
				throw new BadRequestException("CHEQUE NO IS REQUIRED");
			}
			if (dto.getChequeDate() == null) {
				throw new BadRequestException("CHEQUE DATE IS REQUIRED");
			}
			if (dto.getBankName() == null || dto.getBankName().trim().isEmpty()) {
				throw new BadRequestException("BANK NAME IS REQUIRED");
			}
		}

		if ("ONLINE_TRANSFER".equalsIgnoreCase(dto.getTransferMode())) {
			if (dto.getTransactionRef() == null || dto.getTransactionRef().trim().isEmpty()) {
				throw new BadRequestException("TRANSACTION REF IS REQUIRED");
			}
		}

		if ("ONLINE_TRANSFER".equalsIgnoreCase(dto.getTransferMode())) {
			if (dto.getTransactionRef() == null || dto.getTransactionRef().trim().isEmpty()) {
				throw new BadRequestException("TRANSACTION REF IS REQUIRED");
			}
		}

		// 6. Validate amount
		try {
			BigDecimal amount = new BigDecimal(dto.getTransactionAmount());
			if (amount.compareTo(BigDecimal.ZERO) <= 0) {
				throw new BadRequestException("TRANSACTION AMOUNT MUST BE GREATER THAN ZERO.");
			}
		} catch (NumberFormatException e) {
			throw new BadRequestException("INVALID TRANSACTION AMOUNT.");
		}

	}

	public List<IncomingReceiptDto> getAllIncomingReceipt() {
		return incomingReceiptRepo.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
	}

	public IncomingReceiptDto getIncomingReceipt(Long id) {
		IncomingReceiptEntry entity = incomingReceiptRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("IncomingReceipt", "id", id));
		return mapToDto(entity);
	}

	private IncomingReceiptEntry mapToEntity(IncomingReceiptDto dto) {
		IncomingReceiptEntry entity = new IncomingReceiptEntry();
		entity.setId(dto.getId());
		entity.setBranchName(dto.getBranchName());
		entity.setDateOfEntry(dto.getDateOfEntry());
		entity.setCreditLedger(dto.getCreditLedger());
		entity.setDebitLedger(dto.getDebitLedger());
		entity.setTransferMode(dto.getTransferMode());
		entity.setChequeDate(dto.getChequeDate());
		entity.setChequeNo(dto.getChequeNo());
		entity.setBankName(dto.getBankName());
		entity.setTransactionRef(dto.getTransactionRef());
		entity.setTransactionAmount(dto.getTransactionAmount());
		entity.setRemarks(dto.getRemarks());
		return entity;
	}

	private IncomingReceiptDto mapToDto(IncomingReceiptEntry entity) {
		IncomingReceiptDto dto = new IncomingReceiptDto();
		dto.setId(entity.getId());
		dto.setBranchName(entity.getBranchName());
		dto.setVoucherID(entity.getVoucherID());
		dto.setDateOfEntry(entity.getDateOfEntry());
		dto.setCreditLedger(entity.getCreditLedger());
		dto.setDebitLedger(entity.getDebitLedger());
		dto.setTransferMode(entity.getTransferMode());
		dto.setChequeDate(entity.getChequeDate());
		dto.setChequeNo(entity.getChequeNo());
		dto.setBankName(entity.getBankName());
		dto.setTransactionRef(entity.getTransactionRef());
		dto.setTransactionAmount(entity.getTransactionAmount());
		dto.setRemarks(entity.getRemarks());
		return dto;
	}

	// BankCashTransferEntry

	public List<BankCashTransferDto> searchBankCashTransfer(String branchName, String startDate, String endDate) {

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate start;
		LocalDate end;

		try {
			start = LocalDate.parse(startDate, formatter);
			end = LocalDate.parse(endDate, formatter);
		} catch (DateTimeParseException e) {
			throw new BadRequestException("INVALID DATE FORMAT. EXPECTED YYYY-MM-DD.");
		}
		if (!branchModuleRepo.existsByBranchNameIgnoreCase(branchName)) {
			throw new BadRequestException("INVALID BRANCH NAME: " + branchName);
		}

		if (end.isBefore(start)) {
			throw new BadRequestException("END DATE CANNOT BE BEFORE START DATE.");
		}

		if (end.isAfter(LocalDate.now())) {
			throw new BadRequestException("END DATE CANNOT BE IN THE FUTURE.");
		}
		System.out.println("Searching for Branch: [" + branchName + "], Start: " + start + ", End: " + end);

		// ✅ Main repo call
		List<BankCashTransferEntry> entries = bankCashTransferRepo.findByBranchNameIgnoreCaseAndDateOfEntryBetween(
				branchName, start.format(formatter), end.format(formatter));
		if (entries.isEmpty()) {
			throw new BadRequestException("NO TRANSFERS FOUND FOR GIVEN SEARCH CRITERIA.");
		}

		// ✅ DEBUG LOG AFTER QUERY
		System.out.println("Records found: " + entries.size());

		return entries.stream().map(this::mapToDto).collect(Collectors.toList());

	}

	@Transactional
	public BankCashTransferDto createBankCashTransfer(BankCashTransferDto dto) {
		BankCashTransferEntry entity = mapToEntity(dto);

		validateBankCashTransfer(dto);
		System.out.println("Duplicate Check (Bank Cash): " + dto.getBranchName() + ", " + dto.getDateOfEntry() + ", "
				+ dto.getDebitLedger() + ", " + dto.getCreditLedger() + ", " + dto.getTransactionAmount());

		boolean exists = bankCashTransferRepo
				.existsByBranchNameIgnoreCaseAndDateOfEntryAndDebitLedgerIgnoreCaseAndCreditLedgerIgnoreCaseAndTransactionAmount(
						dto.getBranchName().trim(), dto.getDateOfEntry().trim(), dto.getDebitLedger().trim(),
						dto.getCreditLedger().trim(), dto.getTransactionAmount().trim());

		if (exists) {
			throw new BadRequestException(
					"DUPLICATE BANK/CASH TRANSFER ENTRY DETECTED FOR THE SAME BRANCH, DATE, LEDGERS, AND AMOUNT.");
		}

		String branch = dto.getBranchName().toUpperCase();
		String dateStr = dto.getDateOfEntry().replace("-", "");
		String shortUUID = UUID.randomUUID().toString().substring(0, 8);
		String voucherId = "CNTR-" + branch + "-" + dateStr + "-" + shortUUID;

		entity.setVoucherID(voucherId);

		// Update ledger balances
		BigDecimal amount = new BigDecimal(dto.getTransactionAmount());
		updateLedgerBalances(dto.getBranchName(), dto.getDebitLedger(), dto.getCreditLedger(), amount);

		return mapToDto(bankCashTransferRepo.save(entity));

	}

	private void validateBankCashTransfer(BankCashTransferDto dto) {

		// A. Validate Branch
		if (!branchModuleRepo.existsByBranchNameIgnoreCase(dto.getBranchName())) {
			throw new BadRequestException("INVALID BRANCH NAME: " + dto.getBranchName());
		}

		// B. Validate Date Format and Future Date
		LocalDate parsedDate;
		try {
			parsedDate = LocalDate.parse(dto.getDateOfEntry(), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
			dto.setDateOfEntry(parsedDate.toString()); // normalize
		} catch (DateTimeParseException e) {
			throw new BadRequestException("INVALID DATE FORMAT. EXPECTED YYYY-MM-DD.");
		}

		if (parsedDate.isAfter(LocalDate.now())) {
			throw new BadRequestException("DATE OF ENTRY CANNOT BE IN THE FUTURE.");
		}

		// C. Validate Amount
		try {
			BigDecimal amount = new BigDecimal(dto.getTransactionAmount());

			if (amount.compareTo(BigDecimal.ZERO) <= 0) {
				throw new BadRequestException("TRANSACTION AMOUNT MUST BE GREATER THAN ZERO.");
			}
		} catch (NumberFormatException e) {
			throw new BadRequestException("INVALID TRANSACTION AMOUNT FORMAT.");
		}

		// D. Validate Ledgers & Groups (re-use existing method)
		validateLedgerGroups(dto.getDebitLedger(), dto.getCreditLedger(), dto.getBranchName());

		// E. Validate transfer mode
		List<String> validModes = Arrays.asList("Cash Deposit", "Cash Withdrawal", "Cheque", "Online Transfer");
		if (!validModes.contains(dto.getTransferMode())) {
			throw new BadRequestException("INVALID TRANSFER MODE: " + dto.getTransferMode());

		}
		if ("Cheque".equalsIgnoreCase(dto.getTransferMode())) {
			if (dto.getChequeNo() == null || dto.getChequeNo().trim().isEmpty()) {
				throw new BadRequestException("CHEQUE NO IS REQUIRED");
			}
			if (dto.getChequeDate() == null) {
				throw new BadRequestException("CHEQUE DATE IS REQUIRED");
			}
			if (dto.getBankName() == null || dto.getBankName().trim().isEmpty()) {
				throw new BadRequestException("BANK NAME IS REQUIRED");
			}
		}

		if ("Online transfer".equalsIgnoreCase(dto.getTransferMode())) {
			if (dto.getTransactionRef() == null || dto.getTransactionRef().trim().isEmpty()) {
				throw new BadRequestException("TRANSACTION REF IS REQUIRED");
			}
		}

	}

	private void validateLedgerGroups(String debitLedger, String creditLedger, String branchName) {
		LedgerAccountMaster debit = ledgerAccountRepository.findByAccountTitleAndBranchName(debitLedger, branchName)
				.orElseThrow(() -> new BadRequestException("INVALID DEBIT LEDGER: " + debitLedger));

		LedgerAccountMaster credit = ledgerAccountRepository.findByAccountTitleAndBranchName(creditLedger, branchName)
				.orElseThrow(() -> new BadRequestException("INVALID CREDIT LEDGER: " + creditLedger));

		// ✅ Both must be Assets group
		if (!"Assets".equalsIgnoreCase(debit.getGroupName())
				|| !("Cash In Hand".equalsIgnoreCase(debit.getAccountType())
						|| "Bank Account".equalsIgnoreCase(debit.getAccountType()))) {
			throw new BadRequestException("DEBIT LEDGER MUST BE CASH/BANK UNDER ASSETS GROUP.");
		}

		if (!"Assets".equalsIgnoreCase(credit.getGroupName())
				|| !("Cash In Hand".equalsIgnoreCase(credit.getAccountType())
						|| "Bank Account".equalsIgnoreCase(credit.getAccountType()))) {
			throw new BadRequestException("CREDIT LEDGER MUST BE CASH/BANK UNDER ASSETS GROUP.");
		}

		// ✅ Prevent Cash→Cash or Bank→Bank same ledger
		if (debitLedger.equalsIgnoreCase(creditLedger)) {
			throw new BadRequestException("DEBIT AND CREDIT LEDGERS CANNOT BE THE SAME.");
		}

		// ✅ Branch consistency
		if (!debit.getBranchName().equalsIgnoreCase(credit.getBranchName())) {
			throw new BadRequestException("BOTH LEDGERS MUST BELONG TO THE SAME BRANCH.");
		}
	}

	public List<BankCashTransferDto> getAllBankCashTransfer() {
		return bankCashTransferRepo.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
	}

	public BankCashTransferDto getBankCashTransfer(Long id) {
		BankCashTransferEntry entity = bankCashTransferRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("BankCashTransfer", "id", id));
		return mapToDto(entity);
	}

	/*
	 * public List<LedgerAccountMaster> getBankCashLedgersByBranch(String
	 * branchName) { List<String> groups = Arrays.asList("Bank", "Cash"); return
	 * ledgerAccountRepository.findByBranchNameIgnoreCaseAndGroupNameIn(branchName,
	 * groups); }
	 */

	private BankCashTransferEntry mapToEntity(BankCashTransferDto dto) {
		BankCashTransferEntry entity = new BankCashTransferEntry();
		entity.setId(dto.getId());
		entity.setBranchName(dto.getBranchName());
		entity.setDateOfEntry(dto.getDateOfEntry());
		entity.setCreditLedger(dto.getCreditLedger());
		entity.setDebitLedger(dto.getDebitLedger());
		entity.setTransferMode(dto.getTransferMode());
		// entity.setChequeDate(dto.getChequeDate());
		entity.setChequeNo(dto.getChequeNo());
		entity.setBankName(dto.getBankName());
		entity.setTransactionRef(dto.getTransactionRef());
		entity.setTransactionAmount(dto.getTransactionAmount());
		entity.setRemarks(dto.getRemarks());
		return entity;
	}

	private BankCashTransferDto mapToDto(BankCashTransferEntry entity) {
		BankCashTransferDto dto = new BankCashTransferDto();
		dto.setId(entity.getId());
		dto.setBranchName(entity.getBranchName());
		dto.setVoucherID(entity.getVoucherID());
		dto.setDateOfEntry(entity.getDateOfEntry());
		dto.setCreditLedger(entity.getCreditLedger());
		dto.setDebitLedger(entity.getDebitLedger());
		dto.setTransferMode(entity.getTransferMode());
		dto.setChequeDate(entity.getChequeDate());
		dto.setChequeNo(entity.getChequeNo());
		dto.setBankName(entity.getBankName());
		dto.setTransactionRef(entity.getTransactionRef());
		dto.setTransactionAmount(entity.getTransactionAmount());
		dto.setRemarks(entity.getRemarks());
		return dto;
	}

	/**
	 * Searches Manual Journal entries for a given branch and date range.
	 * 
	 * Business Logic: - Validates date format and range. - Validates branch
	 * existence. - Prevents future end dates and end date before start date.
	 * 
	 * @param branchName The branch to search in.
	 * @param startDate  Start date in yyyy-MM-dd format.
	 * @param endDate    End date in yyyy-MM-dd format.
	 * @return List of ManualJournalDto objects matching criteria.
	 * @throws BadRequestException if validation fails.
	 */
	public List<ManualJournalDto> searchManualJournal(String branchName, String startDate, String endDate) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate start;
		LocalDate end;

		try {
			start = LocalDate.parse(startDate, formatter);
			end = LocalDate.parse(endDate, formatter);
		} catch (DateTimeParseException e) {
			throw new BadRequestException("INVALID DATE FORMAT. EXPECTED YYYY-MM-DD.");
		}

		if (!branchModuleRepo.existsByBranchNameIgnoreCase(branchName)) {
			throw new BadRequestException("INVALID BRANCH NAME: " + branchName);
		}

		if (end.isBefore(start)) {
			throw new BadRequestException("END DATE CANNOT BE BEFORE START DATE.");
		}

		if (end.isAfter(LocalDate.now())) {
			throw new BadRequestException("END DATE CANNOT BE IN THE FUTURE.");
		}

		List<ManualJournalEntry> entries = manualJournalRepo.findByBranchNameAndDateOfEntryBetween(branchName,
				start.format(formatter), end.format(formatter));

		return entries.stream().map(this::mapToDto).collect(Collectors.toList());
	}

	/**
	 * Retrieves all eligible ledgers for Manual Journal entry for a branch.
	 * 
	 * Business Logic: - Only ledgers belonging to allowed groups are eligible.
	 * 
	 * @param branchName Branch name.
	 * @return List of LedgerAccountMaster objects in allowed groups for that
	 *         branch.
	 */

	public List<LedgerAccountMaster> getEligibleLedgersForManualJournal(String branchName) {
		List<String> allowedGroups = Arrays.asList("ASSETS", "LIABILITIES", "INCOME", "EXPENSES", "EQUITY");

		return ledgerAccountRepository.findByBranchNameIgnoreCaseAndGroupNameIn(branchName, allowedGroups);
	}

	/**
	 * Creates a new Manual Journal entry.
	 * 
	 * Business Logic: - Validates input via validateManualJournal. - Prevents
	 * duplicate entries based on branch, date, ledgers, and amount. -
	 * Auto-generates receipt ID.
	 * 
	 * @param dto ManualJournalDto containing entry data.
	 * @return ManualJournalDto for the created entry.
	 * @throws BadRequestException if business validation fails or duplicate exists.
	 */
	@Transactional
	public ManualJournalDto createManualJournal(ManualJournalDto dto) {
		ManualJournalEntry entity = mapToEntity(dto);

		validateManualJournal(dto);
		System.out.println("Duplicate Check (Manual Journal): " + dto.getBranchName() + ", " + dto.getDateOfEntry()
				+ ", " + dto.getDebitLedger() + ", " + dto.getCreditLedger() + ", " + dto.getTransactionAmount());

		boolean exists = manualJournalRepo
				.existsByBranchNameIgnoreCaseAndDateOfEntryAndDebitLedgerIgnoreCaseAndCreditLedgerIgnoreCaseAndTransactionAmount(
						dto.getBranchName().trim(), dto.getDateOfEntry().trim(), dto.getDebitLedger().trim(),
						dto.getCreditLedger().trim(), dto.getTransactionAmount().trim());

		if (exists) {
			throw new BadRequestException(
					"DUPLICATE BANK/CASH TRANSFER ENTRY DETECTED FOR THE SAME BRANCH, DATE, LEDGERS, AND AMOUNT.");
		}

		// 📌 Auto-generate Receipt ID
		String branch = dto.getBranchName().toUpperCase();
		String dateStr = dto.getDateOfEntry().replace("-", "");
		String shortUUID = UUID.randomUUID().toString().substring(0, 8);
		String voucherId = "JV-" + branch + "-" + dateStr + "-" + shortUUID;

		entity.setVoucherID(voucherId);

		// Update ledger balances
		BigDecimal amount = new BigDecimal(dto.getTransactionAmount());
		updateLedgerBalances(dto.getBranchName(), dto.getDebitLedger(), dto.getCreditLedger(), amount);

		return mapToDto(manualJournalRepo.save(entity));
	}

	/**
	 * Validates Manual Journal entry business rules.
	 * 
	 * Checks: - Branch existence. - Date format and future date prevention. -
	 * Positive numeric transaction amount. - Ledgers are valid and belong to
	 * allowed groups and same branch.
	 * 
	 * @param dto ManualJournalDto to validate.
	 * @throws BadRequestException if any validation fails.
	 */
	private void validateManualJournal(ManualJournalDto dto) {

		// A. Validate Branch
		if (!branchModuleRepo.existsByBranchNameIgnoreCase(dto.getBranchName().trim())) {
			throw new BadRequestException("INVALID BRANCH NAME: " + dto.getBranchName());
		}

		// B. Validate Date Format and Future Date
		LocalDate parsedDate;
		try {
			parsedDate = LocalDate.parse(dto.getDateOfEntry().trim(), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
			dto.setDateOfEntry(parsedDate.toString()); // normalize
		} catch (DateTimeParseException e) {
			throw new BadRequestException("INVALID DATE FORMAT. EXPECTED YYYY-MM-DD.");
		}

		if (parsedDate.isAfter(LocalDate.now())) {
			throw new BadRequestException("DATE OF ENTRY CANNOT BE IN THE FUTURE.");
		}

		// C. Validate Amount
		try {
			BigDecimal amount = new BigDecimal(dto.getTransactionAmount().trim());

			if (amount.compareTo(BigDecimal.ZERO) <= 0) {
				throw new BadRequestException("TRANSACTION AMOUNT MUST BE GREATER THAN ZERO.");
			}
		} catch (NumberFormatException e) {
			throw new BadRequestException("INVALID TRANSACTION AMOUNT FORMAT.");
		}

		// D. Validate Ledgers & Groups (re-use existing method)
		validateLedgerGroupsManual(dto.getDebitLedger(), dto.getCreditLedger(), dto.getBranchName());
	}

	/**
	 * Validates selected ledgers for Manual Journal entry.
	 * 
	 * Checks: - Both ledgers exist for branch. - Both ledgers belong to allowed
	 * groups. - Debit/Credit ledgers are not the same. - Both ledgers are for the
	 * same branch.
	 * 
	 * @param debitLedger  Debit ledger account title.
	 * @param creditLedger Credit ledger account title.
	 * @param branchName   Branch name.
	 * @throws IllegalArgumentException if any validation fails.
	 */
	private void validateLedgerGroupsManual(String debitLedger, String creditLedger, String branchName) {

		List<String> allowedGroups = Arrays.asList("ASSETS", "LIABILITIES", "INCOME", "EXPENSES", "EQUITY");

		String sanitizedDebitLedger = debitLedger.trim();
		String sanitizedCreditLedger = creditLedger.trim();
		String sanitizedBranch = branchName.trim();

		LedgerAccountMaster debit = ledgerAccountRepository
				.findByAccountTitleAndBranchName(sanitizedDebitLedger, sanitizedBranch)
				.orElseThrow(() -> new IllegalArgumentException("INVALID DEBIT LEDGER: " + sanitizedDebitLedger));

		LedgerAccountMaster credit = ledgerAccountRepository
				.findByAccountTitleAndBranchName(sanitizedCreditLedger, sanitizedBranch)
				.orElseThrow(() -> new IllegalArgumentException("INVALID CREDIT LEDGER: " + sanitizedCreditLedger));

		// 1. Ledger groups must be valid
		if (!allowedGroups.contains(debit.getGroupName())) {
			throw new BadRequestException("INVALID GROUP FOR DEBIT LEDGER '" + debit.getAccountTitle()
					+ "'. ALLOWED GROUPS: " + allowedGroups);
		}
		if (!allowedGroups.contains(credit.getGroupName())) {
			throw new BadRequestException("INVALID GROUP FOR CREDIT LEDGER '" + credit.getAccountTitle()
					+ "'. ALLOWED GROUPS: " + allowedGroups);
		}

		// 2. Debit and Credit ledger cannot be the same
		if (sanitizedDebitLedger.equalsIgnoreCase(sanitizedCreditLedger)) {
			throw new BadRequestException("DEBIT AND CREDIT LEDGERS CANNOT BE THE SAME.");
		}

		// 3. Branch validation
		if (!debit.getBranchName().equalsIgnoreCase(credit.getBranchName())) {
			throw new BadRequestException("DEBIT AND CREDIT LEDGERS MUST BELONG TO THE SAME BRANCH.");
		}

		// 4. JV-specific validation: Do not allow BOTH debit or credit as Cash/Bank
		if ("Cash".equalsIgnoreCase(debit.getAccountType()) || "Bank".equalsIgnoreCase(debit.getAccountType())
				|| "Cash".equalsIgnoreCase(credit.getAccountType())
				|| "Bank".equalsIgnoreCase(credit.getAccountType())) {
			throw new BadRequestException(
					"CASH/BANK LEDGERS ARE NOT ALLOWED IN JOURNAL VOUCHER. USE PAYMENT/RECEIPT/CONTRA FOR SUCH ENTRIES.");
		}

	}

	public List<ManualJournalDto> getAllManualJournal() {
		return manualJournalRepo.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
	}

	public ManualJournalDto getManualJournal(Long id) {
		ManualJournalEntry entity = manualJournalRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ManualJournal", "id", id));
		return mapToDto(entity);
	}

	private ManualJournalEntry mapToEntity(ManualJournalDto dto) {
		ManualJournalEntry entity = new ManualJournalEntry();
		entity.setId(dto.getId());
		entity.setBranchName(dto.getBranchName());
		entity.setDateOfEntry(dto.getDateOfEntry());
		entity.setCreditLedger(dto.getCreditLedger());
		entity.setDebitLedger(dto.getDebitLedger());
		entity.setTransactionAmount(dto.getTransactionAmount());
		entity.setRemarks(dto.getRemarks());
		return entity;
	}

	private ManualJournalDto mapToDto(ManualJournalEntry entity) {
		ManualJournalDto dto = new ManualJournalDto();
		dto.setId(entity.getId());
		dto.setBranchName(entity.getBranchName());
		dto.setVoucherID(entity.getVoucherID());
		dto.setDateOfEntry(entity.getDateOfEntry());
		dto.setCreditLedger(entity.getCreditLedger());
		dto.setDebitLedger(entity.getDebitLedger());
		dto.setTransactionAmount(entity.getTransactionAmount());
		dto.setRemarks(entity.getRemarks());
		return dto;
	}

	public List<LedgerSummaryDto> getLedgerSummary(String branch, String ledger, LocalDate startDate,
			LocalDate endDate) {
		List<LedgerSummaryDto> summaryList = new ArrayList<>();

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		String startDateStr = startDate.format(formatter);
		String endDateStr = endDate.format(formatter);

		// Fetch all types of transactions
		List<OutgoingPaymentEntry> outgoing = ledgerSummaryRepo.findOutgoingTransactions(branch, ledger, startDateStr,
				endDateStr);
		List<IncomingReceiptEntry> incoming = ledgerSummaryRepo.findIncomingTransactions(branch, ledger, startDateStr,
				endDateStr);
		List<BankCashTransferEntry> transfer = ledgerSummaryRepo.findTransferTransactions(branch, ledger, startDateStr,
				endDateStr);
		List<ManualJournalEntry> journal = ledgerSummaryRepo.findJournalTransactions(branch, ledger, startDateStr,
				endDateStr);

		String accountCode = "";
		Optional<LedgerAccountMaster> ledgerMaster = ledgerAccountRepository.findByAccountTitleAndBranchName(ledger,
				branch);
		if (ledgerMaster.isPresent()) {
			accountCode = ledgerMaster.get().getAccountCode();
		}
		// Combine all into one list
		for (OutgoingPaymentEntry o : outgoing) {
			LedgerSummaryDto dto = new LedgerSummaryDto();
			dto.setDateOfEntry(o.getDateOfEntry());
			dto.setVoucherId(o.getVoucherID());
			dto.setRemarks(o.getRemarks());
			dto.setAccountCode(accountCode);

			if (ledger.equalsIgnoreCase(o.getCreditLedger())) {
				dto.setCredit(new BigDecimal(o.getTransactionAmount()).toPlainString());
				dto.setDebit(BigDecimal.ZERO.toPlainString());
			} else if (ledger.equalsIgnoreCase(o.getDebitLedger())) {
				dto.setDebit(new BigDecimal(o.getTransactionAmount()).toPlainString());
				dto.setCredit(BigDecimal.ZERO.toPlainString());
			}
			summaryList.add(dto);
		}

		for (IncomingReceiptEntry i : incoming) {
			LedgerSummaryDto dto = new LedgerSummaryDto();
			dto.setDateOfEntry(i.getDateOfEntry());
			dto.setVoucherId(i.getVoucherID());
			dto.setRemarks(i.getRemarks());
			dto.setAccountCode(accountCode);

			if (ledger.equalsIgnoreCase(i.getCreditLedger())) {
				dto.setCredit(new BigDecimal(i.getTransactionAmount()).toPlainString());
				dto.setDebit(BigDecimal.ZERO.toPlainString());
			} else if (ledger.equalsIgnoreCase(i.getDebitLedger())) {
				dto.setDebit(new BigDecimal(i.getTransactionAmount()).toPlainString());
				dto.setCredit(BigDecimal.ZERO.toPlainString());
			}
			summaryList.add(dto);
		}

		for (BankCashTransferEntry t : transfer) {
			LedgerSummaryDto dto = new LedgerSummaryDto();
			dto.setDateOfEntry(t.getDateOfEntry());
			dto.setVoucherId(t.getVoucherID());
			dto.setRemarks(t.getRemarks());
			dto.setAccountCode(accountCode);

			if (ledger.equalsIgnoreCase(t.getCreditLedger())) {
				dto.setCredit(new BigDecimal(t.getTransactionAmount()).toPlainString());
				dto.setDebit(BigDecimal.ZERO.toPlainString());
			} else if (ledger.equalsIgnoreCase(t.getDebitLedger())) {
				dto.setDebit(new BigDecimal(t.getTransactionAmount()).toPlainString());
				dto.setCredit(BigDecimal.ZERO.toPlainString());
			}
			summaryList.add(dto);
		}

		for (ManualJournalEntry j : journal) {
			LedgerSummaryDto dto = new LedgerSummaryDto();
			dto.setDateOfEntry(j.getDateOfEntry());
			dto.setVoucherId(j.getVoucherID());
			dto.setRemarks(j.getRemarks());
			dto.setAccountCode(accountCode);

			if (ledger.equalsIgnoreCase(j.getCreditLedger())) {
				dto.setCredit(new BigDecimal(j.getTransactionAmount()).toPlainString());
				dto.setDebit(BigDecimal.ZERO.toPlainString());
			} else if (ledger.equalsIgnoreCase(j.getDebitLedger())) {
				dto.setDebit(new BigDecimal(j.getTransactionAmount()).toPlainString());
				dto.setCredit(BigDecimal.ZERO.toPlainString());
			}

			summaryList.add(dto);
		}

		// Add Opening & Closing Balances
		// --- Add Opening and Closing Balances ---
		Optional<LedgerAccountMaster> ledgerAccount = ledgerAccountRepository.findByAccountTitleAndBranchName(ledger,
				branch);
		ledgerAccount.ifPresent(account -> {
			final BigDecimal opening = account.getOpeningBalance();
			final BigDecimal current = account.getCurrentBalance();

			for (LedgerSummaryDto s : summaryList) {
				s.setOpeningBalance(opening);
				s.setClosingBalance(current);
			}
		});

		return summaryList;
	}

	public Map<String, Object> getJournalEntryReport(String branch, String voucherType, LocalDate startDate,
			LocalDate endDate) {

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		String startDateStr = startDate.format(formatter);
		String endDateStr = endDate.format(formatter);

		List<JournalEntryReportDto> entries = new ArrayList<>();
		BigDecimal totalDebit = BigDecimal.ZERO;
		BigDecimal totalCredit = BigDecimal.ZERO;

		switch (voucherType.toLowerCase()) {
		case "payment":
			List<OutgoingPaymentEntry> outgoing = journalEntryReportRepo.findAllOutgoing(branch, startDateStr,
					endDateStr);
			for (OutgoingPaymentEntry o : outgoing) {
				BigDecimal amount = o.getTransactionAmount() != null ? new BigDecimal(o.getTransactionAmount())
						: BigDecimal.ZERO;
				// Debit entry
				if (o.getDebitLedger() != null && !o.getDebitLedger().isEmpty()) {
					JournalEntryReportDto debitDto = mapEntryToDto(o.getDateOfEntry(), o.getVoucherID(), o.getRemarks(),
							branch, o.getDebitLedger(), null, amount);
					entries.add(debitDto);
					totalDebit = totalDebit.add(amount);
				}

				// Credit entry
				if (o.getCreditLedger() != null && !o.getCreditLedger().isEmpty()) {
					JournalEntryReportDto creditDto = mapEntryToDto(o.getDateOfEntry(), o.getVoucherID(),
							o.getRemarks(), branch, null, o.getCreditLedger(), amount);
					entries.add(creditDto);
					totalCredit = totalCredit.add(amount);
				}
			}
			break;

		case "receipt":
			List<IncomingReceiptEntry> incoming = journalEntryReportRepo.findAllIncoming(branch, startDateStr,
					endDateStr);
			for (IncomingReceiptEntry i : incoming) {
				BigDecimal amount = i.getTransactionAmount() != null ? new BigDecimal(i.getTransactionAmount())
						: BigDecimal.ZERO;
				if (i.getDebitLedger() != null && !i.getDebitLedger().isEmpty()) {
					JournalEntryReportDto debitDto = mapEntryToDto(i.getDateOfEntry(), i.getVoucherID(), i.getRemarks(),
							branch, i.getDebitLedger(), null, amount);
					entries.add(debitDto);
					totalDebit = totalDebit.add(amount);
				}

				if (i.getCreditLedger() != null && !i.getCreditLedger().isEmpty()) {
					JournalEntryReportDto creditDto = mapEntryToDto(i.getDateOfEntry(), i.getVoucherID(),
							i.getRemarks(), branch, null, i.getCreditLedger(), amount);
					entries.add(creditDto);
					totalCredit = totalCredit.add(amount);
				}
			}
			break;

		case "contra":
			List<BankCashTransferEntry> transfers = journalEntryReportRepo.findAllTransfers(branch, startDateStr,
					endDateStr);
			for (BankCashTransferEntry t : transfers) {
				BigDecimal amount = t.getTransactionAmount() != null ? new BigDecimal(t.getTransactionAmount())
						: BigDecimal.ZERO;
				if (t.getDebitLedger() != null && !t.getDebitLedger().isEmpty()) {
					JournalEntryReportDto debitDto = mapEntryToDto(t.getDateOfEntry(), t.getVoucherID(), t.getRemarks(),
							branch, t.getDebitLedger(), null, amount);
					entries.add(debitDto);
					totalDebit = totalDebit.add(amount);
				}

				if (t.getCreditLedger() != null && !t.getCreditLedger().isEmpty()) {
					JournalEntryReportDto creditDto = mapEntryToDto(t.getDateOfEntry(), t.getVoucherID(),
							t.getRemarks(), branch, null, t.getCreditLedger(), amount);
					entries.add(creditDto);
					totalCredit = totalCredit.add(amount);
				}
			}
			break;

		case "manual journal":
			List<ManualJournalEntry> journals = journalEntryReportRepo.findJournalEntryReport(branch, startDateStr,
					endDateStr);
			for (ManualJournalEntry j : journals) {
				BigDecimal amount = j.getTransactionAmount() != null ? new BigDecimal(j.getTransactionAmount())
						: BigDecimal.ZERO;
				if (j.getDebitLedger() != null && !j.getDebitLedger().isEmpty()) {
					JournalEntryReportDto debitDto = mapEntryToDto(j.getDateOfEntry(), j.getVoucherID(), j.getRemarks(),
							branch, j.getDebitLedger(), null, amount);
					entries.add(debitDto);
					totalDebit = totalDebit.add(amount);
				}

				if (j.getCreditLedger() != null && !j.getCreditLedger().isEmpty()) {
					JournalEntryReportDto creditDto = mapEntryToDto(j.getDateOfEntry(), j.getVoucherID(),
							j.getRemarks(), branch, null, j.getCreditLedger(), amount);
					entries.add(creditDto);
					totalCredit = totalCredit.add(amount);
				}
			}
			break;

		default:
			// Unknown type
			break;
		}

		Map<String, Object> response = new LinkedHashMap<>();
		response.put("branchName", branch);
		response.put("voucherType", voucherType);
		response.put("startDate", startDateStr);
		response.put("endDate", endDateStr);
		response.put("entries", entries);

		Map<String, String> totals = new LinkedHashMap<>();
		totals.put("totalDebit", totalDebit.setScale(2, RoundingMode.HALF_UP).toPlainString());
		totals.put("totalCredit", totalCredit.setScale(2, RoundingMode.HALF_UP).toPlainString());
		response.put("totals", totals);

		return response;
	}

	private JournalEntryReportDto mapEntryToDto(String date, String voucherID, String remarks, String branch,
			String debitLedger, String creditLedger, BigDecimal transactionAmount) {

		JournalEntryReportDto dto = new JournalEntryReportDto();
		dto.setDateOfEntry(date);
		dto.setVoucherID(voucherID);
		dto.setRemarks(remarks);

// pick correct ledger name
		String ledgerName = debitLedger != null ? debitLedger : creditLedger;

// fetch account code from master
		String accountCode = ledgerAccountRepository.findByAccountTitleAndBranchName(ledgerName, branch)
				.map(LedgerAccountMaster::getAccountCode).orElse("");

		dto.setAccountCode(accountCode);

		if (debitLedger != null) {
			dto.setDebit(transactionAmount.setScale(2, RoundingMode.HALF_UP).toPlainString());
			dto.setCredit("0.00");
		} else {
			dto.setDebit("0.00");
			dto.setCredit(transactionAmount.setScale(2, RoundingMode.HALF_UP).toPlainString());
		}

		return dto;
	}

	public List<TrialBalanceReportDto> getTrialBalance(String branch, LocalDate startDate, LocalDate endDate) {

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		String start = startDate.format(formatter);
		String end = endDate.format(formatter);

		List<Object[]> rows = trialBalanceReportRepo.fetchTrialBalanceEntries(branch, start, end);

		List<TrialBalanceReportDto> result = new ArrayList<>();

		for (Object[] r : rows) {

			String ledgerName = (String) r[0];
			String debit = r[1] != null ? r[1].toString() : "0";
			String credit = r[2] != null ? r[2].toString() : "0";

			// Fetch opening & closing from Ledger Master
			LedgerAccountMaster master = ledgerAccountRepository.findByAccountTitleAndBranchName(ledgerName, branch)
					.orElse(null);

			String opening = master != null ? master.getOpeningBalance().toPlainString() : "0";
			String closing = master != null ? master.getCurrentBalance().toPlainString() : "0";
			String accountCode = master != null ? master.getAccountCode() : "";

			TrialBalanceReportDto dto = new TrialBalanceReportDto();

			dto.setLedgerName(ledgerName);
			dto.setAccountCode(accountCode);
			dto.setOpening(opening);
			dto.setDebit(debit);
			dto.setCredit(credit);
			dto.setClosing(closing);

			result.add(dto);
		}

		return result;
	}

	public boolean deleteLedger(Long id) {
		// TODO Auto-generated method stub
		if (ledgerAccountRepository.existsById(id)) {
			ledgerAccountRepository.deleteById(id);
			return true;
		}
		return false;
	}

	public boolean deleteOutgoingPayment(Long id) {
		// TODO Auto-generated method stub
		if (outgoingPaymentRepo.existsById(id)) {
			outgoingPaymentRepo.deleteById(id);
			return true;
		}
		return false;
	}

	public boolean deleteIncomingPayment(Long id) {
		// TODO Auto-generated method stub
		if (incomingReceiptRepo.existsById(id)) {
			incomingReceiptRepo.deleteById(id);
			return true;
		}
		return false;
	}

	public boolean deleteBankCashTransfer(Long id) {
		// TODO Auto-generated method stub
		if (bankCashTransferRepo.existsById(id)) {
			bankCashTransferRepo.deleteById(id);
			return true;
		}
		return false;
	}

	public boolean deleteManualJournalEntry(Long id) {
		// TODO Auto-generated method stub
		if (manualJournalRepo.existsById(id)) {
			manualJournalRepo.deleteById(id);
			return true;
		}
		return false;
	}

	public long calculatePersonalSales(String teamMemberCode, int month, int year) {

		List<addFinancialConsultant> consultants = financialConsultantRepo.findByTeamMemberCode(teamMemberCode);

		if (consultants == null || consultants.isEmpty()) {
			return 0;
		}

		// 2️⃣ Extract financial codes (Java 1.8 way)
		List<String> financialConsultantCode = consultants.stream().map(addFinancialConsultant::getFinancialCode)
				.collect(Collectors.toList());

		// 3️⃣ Prepare year-month (YYYY-MM)
		String monthStr = (month < 10) ? "0" + month : String.valueOf(month);
		String yearMonth = year + "-" + monthStr;

		// 4️⃣ Count sales
		long saving = createSavingAccountRepo
				.countByFinancialConsultantCodeInAndOpeningDateContaining(financialConsultantCode, yearMonth);

		long loan = loanAppicationRepo.countByFinancialConsultantIdInAndLoanDateContaining(financialConsultantCode,
				yearMonth);

		long policy = addInvestmentRepo.countByAgentInAndPolicyStartDateContaining(financialConsultantCode, yearMonth);

		long gold = applyForGoldRepo.countByFinancialConsultantIdInAndLoanDateContaining(financialConsultantCode,
				yearMonth);

		return saving + loan + policy + gold;
	}

	public Map<String, Object> getFullIncentiveDetails(IncentiveRequest request) {

		Map<String, Object> response = new HashMap<>();

		String teamMemberCode = request.getTeamMemberCode();
		int month = request.getMonth();
		int year = request.getYear();

		// 🔹 1️⃣ Fetch Team Member
		TeamMember tm = teamMemberRepo.findByTeamMemberCode(teamMemberCode);

		if (tm == null) {
			return response;
		}

		response.put("fullName", tm.getTeamMemberName());
		response.put("designation", tm.getDesignation());

		// 🔹 2️⃣ Personal Sales
		double personalSales = calculatePersonalSalesAmount(teamMemberCode, month, year);

		// 🔹 3️⃣ Group Sales
		double groupSales = calculateGroupSalesAmount(teamMemberCode, month, year);

		double overallSales = personalSales + groupSales;

		// 🔹 4️⃣ Incentive Calculation
		double totalEarnings = overallSales * 0.10;
		double taxDeducted = totalEarnings * 0.05;
		double serviceDeduction = totalEarnings * 0.02;
		double extraAllowance = 1000;

		double finalPayout = totalEarnings - taxDeducted - serviceDeduction + extraAllowance;

		// 🔹 5️⃣ Put Values
		response.put("teamMemberCode", teamMemberCode);
		response.put("month", month);
		response.put("year", year);

		response.put("personalSales", personalSales);
		response.put("groupSales", groupSales);
		response.put("overallSales", overallSales);

		response.put("totalEarnings", totalEarnings);
		response.put("taxDeducted", taxDeducted);
		response.put("serviceDeduction", serviceDeduction);
		response.put("extraAllowance", extraAllowance);
		response.put("finalPayout", finalPayout);

		return response;
	}

	public double calculateGroupSalesAmount(String teamMemberCode, int month, int year) {

		TeamMember tm = teamMemberRepo.findByTeamMemberCode(teamMemberCode);
		if (tm == null)
			return 0;

		// 1️⃣ Branch based group
		String branch = tm.getBranchName();

		// 2️⃣ All team members in branch
		List<String> teamCodes = teamMemberRepo.findByBranchName(branch).stream().map(TeamMember::getTeamMemberCode)
				.collect(Collectors.toList());

		if (teamCodes.isEmpty())
			return 0;

		// 3️⃣ All financial consultants under group
		List<String> financialCodes = financialConsultantRepo.findByTeamMemberCodeIn(teamCodes).stream()
				.map(addFinancialConsultant::getFinancialCode).collect(Collectors.toList());

		if (financialCodes.isEmpty())
			return 0;

		// 4️⃣ Calculate business
		double savingAmount = createSavingAccountRepo.findByFinancialConsultantCodeIn(financialCodes).stream()
				.filter(s -> isSameMonth(s.getOpeningDate(), month, year))
				.mapToDouble(s -> parseAmount(s.getOpeningFees())).sum();

		double policyAmount = addInvestmentRepo.findByAgentIn(financialCodes).stream()
				.filter(p -> isSameMonth(p.getPolicyStartDate(), month, year))
				.mapToDouble(p -> parseAmount(p.getDepositAmount())).sum();

		double loanAmount = loanAppicationRepo.findByFinancialConsultantIdIn(financialCodes).stream()
				.filter(l -> isSameMonth(l.getLoanDate(), month, year)).mapToDouble(l -> parseAmount(l.getLoanAmount()))
				.sum();

		double goldAmount = applyForGoldRepo.findByFinancialConsultantIdIn(financialCodes).stream()
				.filter(g -> isSameMonth(g.getLoanDate(), month, year)).mapToDouble(g -> parseAmount(g.getLoanAmount()))
				.sum();

		return savingAmount + policyAmount + loanAmount + goldAmount;
	}

	// ================= HELPERS =================

	private boolean isSameMonth(String dateStr, int month, int year) {
		if (dateStr == null || dateStr.isEmpty())
			return false;

		LocalDate date = LocalDate.parse(dateStr); // yyyy-MM-dd
		return date.getMonthValue() == month && date.getYear() == year;
	}

	private double parseAmount(String amount) {
		if (amount == null || amount.trim().isEmpty())
			return 0.0;
		try {
			return Double.parseDouble(amount.trim());
		} catch (Exception e) {
			return 0.0;
		}
	}

	public double calculatePersonalSalesAmount(String teamMemberCode, int month, int year) {

		List<String> financialCodes = financialConsultantRepo.findByTeamMemberCode(teamMemberCode).stream()
				.map(addFinancialConsultant::getFinancialCode).collect(Collectors.toList());

		if (financialCodes.isEmpty())
			return 0.0;

		double savingAmount = createSavingAccountRepo.findByFinancialConsultantCodeIn(financialCodes).stream()
				.filter(s -> isSameMonth(s.getOpeningDate(), month, year))
				.mapToDouble(s -> parseAmount(s.getOpeningFees())).sum();

		double policyAmount = addInvestmentRepo.findByAgentIn(financialCodes).stream()
				.filter(p -> isSameMonth(p.getPolicyStartDate(), month, year))
				.mapToDouble(p -> parseAmount(p.getDepositAmount())).sum();

		double loanAmount = loanAppicationRepo.findByFinancialConsultantIdIn(financialCodes).stream()
				.filter(l -> isSameMonth(l.getLoanDate(), month, year)).mapToDouble(l -> parseAmount(l.getLoanAmount()))
				.sum();

		double goldAmount = applyForGoldRepo.findByFinancialConsultantIdIn(financialCodes).stream()
				.filter(g -> isSameMonth(g.getLoanDate(), month, year)).mapToDouble(g -> parseAmount(g.getLoanAmount()))
				.sum();

		return savingAmount + policyAmount + loanAmount + goldAmount;
	}

	public String saveIncentivePayment(AccountIncentivePayment request) {

		// 🔴 Duplicate Check
		boolean alreadyPaid = accountIcentivePaymentRepo
				.existsByTeamMemberCodeAndIncentiveMonth(request.getTeamMemberCode(), request.getIncentiveMonth());

		if (alreadyPaid) {
			return "ALREADY_PAID";
		}

		AccountIncentivePayment payment = new AccountIncentivePayment();

		payment.setIncentiveMonth(request.getIncentiveMonth());
		payment.setTeamMemberCode(request.getTeamMemberCode());
		payment.setFullName(request.getFullName());
		payment.setDesignation(request.getDesignation());

		payment.setPersonalSales(String.valueOf(request.getPersonalSales()));
		payment.setGroupSales(String.valueOf(request.getGroupSales()));
		payment.setOverallSales(String.valueOf(request.getOverallSales()));

		payment.setTotalEarnings(String.valueOf(request.getTotalEarnings()));
		payment.setTaxDeducted(String.valueOf(request.getTaxDeducted()));
		payment.setServiceDeduction(String.valueOf(request.getServiceDeduction()));
		payment.setExtraAllowance(String.valueOf(request.getExtraAllowance()));
		payment.setFinalPayout(String.valueOf(request.getFinalPayout()));

		payment.setBranchName(request.getBranchName());
		payment.setPaymentDate(request.getPaymentDate());
		payment.setModeOfPayment(request.getModeOfPayment());

		accountIcentivePaymentRepo.save(payment);

		return "SUCCESS";
	}

	@Transactional
	public void depositAmount(String accountNumber, Double amount) {

		// 1️⃣ Account fetch karo
		CreateSavingsAccount account = createSavingAccountRepo.findByAccountNumber(accountNumber)
				.orElseThrow(() -> new RuntimeException("ACCOUNT NOT FOUND WITH NUMBER: " + accountNumber));

		// 2️⃣ Current balance nikalo (null safe)
		Double currentBalance = 0.0;

		if (account.getBalance() != null && !account.getBalance().isEmpty()) {
			currentBalance = Double.parseDouble(account.getBalance());
		}

		// 3️⃣ New balance calculate karo
		Double newBalance = currentBalance + amount;

		// 4️⃣ Transaction object banao
		AccountTransaction txn = new AccountTransaction();
		txn.setAccountNumber(accountNumber);
		txn.setTransactionDate(LocalDate.now().toString());
		txn.setNarration("Cash Deposit");
		txn.setCredit(amount);
		txn.setDebit(0.0);
		txn.setBalance(newBalance);
		txn.setTransactionType("DEPOSIT");
		txn.setStatus("SUCCESS");

		// 5️⃣ Transaction save karo
		transactionRepository.save(txn);

		// 6️⃣ Master table balance update karo
		account.setBalance(String.valueOf(newBalance));
		createSavingAccountRepo.save(account);
	}

	public List<LoanPayment> searchCheque(String typeOfLoan, String branchName, String startDate, String endDate,
			String chequeNo) {
		// TODO Auto-generated method stub
		return loanPaymentRepo.searchCheque(typeOfLoan, branchName, startDate, endDate, chequeNo);
	}

	public LoanPayment clearCheque(Long id) {
		LoanPayment payment = loanPaymentRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("LOANPAYMENT NOT FOUND"));

		if (!"CHEQUE".equalsIgnoreCase(payment.getPaymentMode())) {
			throw new RuntimeException("THIS PAYMENT IS NOT A CHEQUE.");
		}

		payment.setPaymentStatus("PAID"); // ✅ clear hone ke baad PAID
		return loanPaymentRepo.save(payment);
	}

	public List<LoanPayment> findAllPendingCheques() {
		// TODO Auto-generated method stub
		return loanPaymentRepo.findAllPendingCheques();
	}

	public LoanPayment bounceCheque(Long id) {
		LoanPayment payment = loanPaymentRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("LOANPAYMENT NOT FOUND"));

		payment.setPaymentStatus("BOUNCED"); // ❌ cheque bounce
		return loanPaymentRepo.save(payment);
	}

	public List<LedgerAccountMaster> getAssetsLedgers() {
		return ledgerAccountRepository.findByGroupNameIgnoreCase("ASSETS");
	}

	@Transactional
	public IncentivePayment saveAndPay(IncentivePayment request) {

		// =========================================================
		// 1. BASIC VALIDATION
		// =========================================================

		if (request == null) {
			throw new RuntimeException("INVALID INCENTIVE PAYMENT REQUEST");
		}

		if (request.getFinalPayout() == null || request.getFinalPayout().compareTo(BigDecimal.ZERO) <= 0) {
			throw new RuntimeException("INVALID PAYOUT AMOUNT");
		}

		if (request.getPaymentFromLedgerId() == null) {
			throw new RuntimeException("PAYMENT FROM LEDGER IS REQUIRED");
		}

		// =========================================================
		// 2. DUPLICATE INCENTIVE PAYMENT VALIDATION
		// =========================================================

		if (request.getAgentCode() == null || request.getAgentCode().trim().isEmpty()) {
			throw new RuntimeException("EMPLOYEE / AGENT CODE IS REQUIRED");
		}

		if (request.getMonth() == null || request.getMonth().trim().isEmpty()) {
			throw new RuntimeException("INCENTIVE MONTH IS REQUIRED");
		}

		boolean alreadyPaid = incentiveRepo.existsByAgentCodeAndMonthAndPaymentStatus(request.getAgentCode().trim(),
				request.getMonth().trim(), "PAID");

		if (alreadyPaid) {
			throw new RuntimeException(
					"INCENTIVE PAYMENT ALREADY PAID FOR " + request.getFullName() + " FOR " + request.getMonth());
		}

		BigDecimal amount = request.getFinalPayout();

		// =========================================================
		// 3. FETCH PAYMENT FROM LEDGER
		// =========================================================

		LedgerAccountMaster paymentLedger = ledgerAccountRepository.findById(request.getPaymentFromLedgerId())
				.orElseThrow(() -> new RuntimeException("PAYMENT FROM LEDGER NOT FOUND"));

		// =========================================================
		// 4. VALIDATE PAYMENT LEDGER
		// =========================================================

		if (!"ASSETS".equalsIgnoreCase(paymentLedger.getGroupName())) {
			throw new RuntimeException("PAYMENT FROM MUST BE AN ASSET LEDGER");
		}

		String accountType = paymentLedger.getAccountType();

		if (!"Bank Account".equalsIgnoreCase(accountType)) {
			throw new RuntimeException("PAYMENT FROM MUST BE A BANK ACCOUNT");
		}

		if (!"Active".equalsIgnoreCase(paymentLedger.getStatus())) {
			throw new RuntimeException("SELECTED PAYMENT FROM LEDGER IS INACTIVE");
		}

		// =========================================================
		// 5. BALANCE VALIDATION
		// =========================================================

		if (paymentLedger.getCurrentBalance() == null) {
			throw new RuntimeException("CURRENT BALANCE IS NOT AVAILABLE FOR SELECTED PAYMENT FROM LEDGER");
		}

		if (paymentLedger.getCurrentBalance().compareTo(amount) < 0) {
			throw new RuntimeException("INSUFFICIENT BALANCE IN SELECTED PAYMENT FROM ACCOUNT");
		}

		// =========================================================
		// 6. FETCH INCENTIVE EXPENSE LEDGER
		// =========================================================

		LedgerAccountMaster expenseLedger = ledgerAccountRepository
				.findFirstByAccountTitleIgnoreCaseAndGroupNameIgnoreCase("INCENTIVE EXPENSE", "EXPENSES")
				.orElseThrow(() -> new RuntimeException("INCENTIVE EXPENSE LEDGER NOT FOUND"));

		// =========================================================
		// 7. VALIDATE EXPENSE LEDGER
		// =========================================================

		if (!"Active".equalsIgnoreCase(expenseLedger.getStatus())) {
			throw new RuntimeException("INCENTIVE EXPENSE LEDGER IS INACTIVE");
		}

		// =========================================================
		// 8. SET PAYMENT STATUS
		// =========================================================

		request.setPaymentStatus("PAID");

		// =========================================================
		// 9. PAYMENT ACCOUNT BALANCE
		// =========================================================

		BigDecimal oldPaymentBalance = paymentLedger.getCurrentBalance();

		BigDecimal newPaymentBalance = oldPaymentBalance.subtract(amount);

		paymentLedger.setCurrentBalance(newPaymentBalance);

		// =========================================================
		// 10. INCENTIVE EXPENSE BALANCE
		// =========================================================

		BigDecimal oldExpenseBalance = expenseLedger.getCurrentBalance() != null ? expenseLedger.getCurrentBalance()
				: BigDecimal.ZERO;

		BigDecimal newExpenseBalance = oldExpenseBalance.add(amount);

		expenseLedger.setCurrentBalance(newExpenseBalance);

		// =========================================================
		// 11. SAVE LEDGER BALANCES
		// =========================================================

		ledgerAccountRepository.save(paymentLedger);
		ledgerAccountRepository.save(expenseLedger);

		// =========================================================
		// 12. SAVE INCENTIVE PAYMENT
		// =========================================================

		IncentivePayment saved = incentiveRepo.save(request);

		// =========================================================
		// 13. RETURN RESPONSE
		// =========================================================

		return saved;
	}

	public ApiResponse<MandateDepositDto> saveMandateDeposit(MandateDepositDto dto) {
		// TODO Auto-generated method stub
		try {
			MandateDeposit entity = new MandateDeposit();

			entity.setId(dto.getId());

			entity.setFixedDeposit(dto.getFixedDeposit());
			entity.setRecurringDeposit(dto.getRecurringDeposit());
			entity.setSavingDeposit(dto.getSavingDeposit());

			entity.setSavingPayout(dto.getSavingPayout());
			entity.setFlexibleDeposit(dto.getFlexibleDeposit());
			entity.setFlexibleWithdrawal(dto.getFlexibleWithdrawal());
			entity.setMaturityCapital(dto.getMaturityCapital());

			entity.setLastFdAmount(dto.getLastFdAmount());

			entity.setBankName(dto.getBankName());
			entity.setBranchName(dto.getBranchName());

			entity.setFdNumber(dto.getFdNumber());
			entity.setFixedDepositAmount(dto.getFixedDepositAmount());
			entity.setAmountOnMaturity(dto.getAmountOnMaturity());
			entity.setFdInstallationDate(dto.getFdInstallationDate());

			entity.setMaturityDueDate(dto.getMaturityDueDate());
			entity.setModeOfPayment(dto.getModeOfPayment());
			entity.setRemarks(dto.getRemarks());

			entity.setStartDate(dto.getStartDate());
			entity.setEndDate(dto.getEndDate());

			// ===== Calculation =====
			double fd = parse(dto.getFixedDeposit());
			double rd = parse(dto.getRecurringDeposit());
			double sd = parse(dto.getSavingDeposit());
			double flexDep = parse(dto.getFlexibleDeposit());

			double payout = parse(dto.getSavingPayout());
			double flexWith = parse(dto.getFlexibleWithdrawal());

			double totalDeposit = fd + rd + sd + flexDep;
			double totalWithdraw = payout + flexWith;
			double net = totalDeposit - totalWithdraw;

			double available = net * 0.10;

			entity.setAggregateDeposit(String.valueOf(totalDeposit));
			entity.setAggregateWithdrawal(String.valueOf(totalWithdraw));
			entity.setNetBalance(String.valueOf(net));
			entity.setAvailableFunds(String.valueOf(available));
			entity.setUnpledgedFunds(String.valueOf(available));

			MandateDeposit saved = mandateDepositRepo.save(entity);

			return new ApiResponse<>(HttpStatus.OK, "SAVED SUCCESSFULLY", mapToDto(saved));

		} catch (Exception e) {
			return new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, "ERROR: " + e.getMessage(), null);
		}
	}

	private double parse(String val) {
		try {
			return (val == null || val.trim().isEmpty()) ? 0 : Double.parseDouble(val);
		} catch (Exception e) {
			return 0;
		}
	}

	private MandateDepositDto mapToDto(MandateDeposit e) {
		if (e == null)
			return null;

		MandateDepositDto dto = new MandateDepositDto();

		dto.setId(e.getId());
		dto.setFixedDeposit(e.getFixedDeposit());
		dto.setRecurringDeposit(e.getRecurringDeposit());
		dto.setSavingDeposit(e.getSavingDeposit());

		dto.setSavingPayout(e.getSavingPayout());
		dto.setFlexibleDeposit(e.getFlexibleDeposit());
		dto.setFlexibleWithdrawal(e.getFlexibleWithdrawal());
		dto.setMaturityCapital(e.getMaturityCapital());

		dto.setAggregateDeposit(e.getAggregateDeposit());
		dto.setAggregateWithdrawal(e.getAggregateWithdrawal());
		dto.setNetBalance(e.getNetBalance());
		dto.setAvailableFunds(e.getAvailableFunds());
		dto.setUnpledgedFunds(e.getUnpledgedFunds());

		dto.setLastFdAmount(e.getLastFdAmount());

		dto.setBankName(e.getBankName());
		dto.setBranchName(e.getBranchName());

		dto.setFdNumber(e.getFdNumber());
		dto.setFixedDepositAmount(e.getFixedDepositAmount());
		dto.setAmountOnMaturity(e.getAmountOnMaturity());
		dto.setFdInstallationDate(e.getFdInstallationDate());

		dto.setMaturityDueDate(e.getMaturityDueDate());
		dto.setModeOfPayment(e.getModeOfPayment());
		dto.setRemarks(e.getRemarks());

		dto.setStartDate(e.getStartDate());
		dto.setEndDate(e.getEndDate());

		return dto;
	}

	public List<BankStatementDto> getBankStatement(String accountNumber, String startDate, String endDate) {

		// =====================================================
		// 1. BASIC VALIDATION
		// =====================================================

		if (accountNumber == null || accountNumber.trim().isEmpty()) {
			throw new RuntimeException("ACCOUNT NUMBER IS REQUIRED");
		}

		if (startDate == null || startDate.trim().isEmpty()) {
			throw new RuntimeException("START DATE IS REQUIRED");
		}

		if (endDate == null || endDate.trim().isEmpty()) {
			throw new RuntimeException("END DATE IS REQUIRED");
		}

		// =====================================================
		// 2. CREATE CLEAN VARIABLES
		// =====================================================
		// Do NOT reassign method parameters because they are
		// used inside lambda expressions below.

		final String cleanAccountNumber = accountNumber.trim();
		final String cleanStartDate = startDate.trim();
		final String cleanEndDate = endDate.trim();

		// =====================================================
		// 3. VALIDATE DATE RANGE
		// =====================================================

		if (cleanStartDate.compareTo(cleanEndDate) > 0) {
			throw new RuntimeException("START DATE CANNOT BE GREATER THAN END DATE");
		}

		// =====================================================
		// 4. CHECK SAVING ACCOUNT
		// =====================================================

		CreateSavingsAccount acc = createSavingsAccountRepo.findByAccountNumber(cleanAccountNumber)
				.orElseThrow(() -> new RuntimeException("ACCOUNT NOT FOUND: " + cleanAccountNumber));

		// =====================================================
		// 5. GET BANK / BRANCH DETAILS
		// =====================================================

		String bankName = "";
		String branchName = "";

		if (acc.getBranchName() != null) {

			branchName = acc.getBranchName().getBranchName();

			if (acc.getBranchName().getBank() != null) {

				bankName = acc.getBranchName().getBank().getBankName();
			}
		}

		// =====================================================
		// 6. GET PREVIOUS TRANSACTION
		// =====================================================
		// This transaction is BEFORE selected start date.
		//
		// Its balance becomes Opening Balance.
		//
		// Example:
		//
		// 31-08-2026 -> Balance = 50,000
		// Start Date = 01-09-2026
		//
		// Opening Balance = 50,000
		// =====================================================

		List<BankTransaction> previousTransactions = bankTransactionRepo.findPreviousTransactions(cleanAccountNumber,
				cleanStartDate);

		BankTransaction previousTxn = null;

		if (previousTransactions != null && !previousTransactions.isEmpty()) {

			// Repository must return latest transaction first
			previousTxn = previousTransactions.get(0);
		}

		// =====================================================
		// 7. CALCULATE OPENING BALANCE
		// =====================================================

		Double openingBalance = 0.0;

		if (previousTxn != null && previousTxn.getBalance() != null) {

			openingBalance = previousTxn.getBalance();
		}

		// =====================================================
		// 8. GET TRANSACTIONS FOR SELECTED DATE RANGE
		// =====================================================

		List<BankTransaction> txnList = bankTransactionRepo.findBankStatement(cleanAccountNumber, cleanStartDate,
				cleanEndDate);

		// =====================================================
		// 9. DEBUG LOG
		// =====================================================

		System.out.println("======================================");
		System.out.println("BANK STATEMENT");
		System.out.println("Account Number   = " + cleanAccountNumber);
		System.out.println("Bank Name        = " + bankName);
		System.out.println("Branch Name      = " + branchName);
		System.out.println("Start Date       = " + cleanStartDate);
		System.out.println("End Date         = " + cleanEndDate);
		System.out.println("Opening Balance  = " + openingBalance);

		System.out.println("Transaction Size = " + (txnList != null ? txnList.size() : 0));

		System.out.println("======================================");

		// =====================================================
		// 10. NO TRANSACTION CASE
		// =====================================================

		if (txnList == null || txnList.isEmpty()) {

			return new ArrayList<>();
		}

		// =====================================================
		// 11. GET CLOSING BALANCE
		// =====================================================

		BankTransaction lastTxn = txnList.get(txnList.size() - 1);

		Double closingBalance = openingBalance;

		if (lastTxn.getBalance() != null) {

			closingBalance = lastTxn.getBalance();
		}

		// =====================================================
		// 12. CONVERT ENTITY -> DTO
		// =====================================================

		List<BankStatementDto> result = new ArrayList<>();

		for (BankTransaction txn : txnList) {

			BankStatementDto dto = new BankStatementDto();

			// =================================================
			// BANK DETAILS
			// =================================================

			dto.setBankName(bankName);

			dto.setBranchName(branchName);

			// =================================================
			// ACCOUNT NUMBER
			// =================================================

			dto.setAccountNumber(cleanAccountNumber);

			// =================================================
			// TRANSACTION DATE
			// =================================================

			dto.setDate(txn.getDate());

			// =================================================
			// NARRATION
			// =================================================

			dto.setNarration(txn.getNarration() != null ? txn.getNarration() : "-");

			// =================================================
			// CREDIT
			// =================================================

			dto.setCredit(txn.getCredit() != null ? txn.getCredit() : 0.0);

			// =================================================
			// DEBIT
			// =================================================

			dto.setDebit(txn.getDebit() != null ? txn.getDebit() : 0.0);

			// =================================================
			// RUNNING BALANCE
			// =================================================

			dto.setBalance(txn.getBalance() != null ? txn.getBalance() : 0.0);

			// =================================================
			// TRANSACTION TYPE
			// =================================================

			dto.setTransactionType(txn.getTransactionType() != null ? txn.getTransactionType() : "-");

			// =================================================
			// REFERENCE NUMBER
			// =================================================

			dto.setReferenceNo(txn.getReferenceNo() != null ? txn.getReferenceNo() : "-");

			// =================================================
			// OPENING BALANCE
			// =================================================

			dto.setOpeningBalance(openingBalance);

			// =================================================
			// CLOSING BALANCE
			// =================================================

			dto.setClosingBalance(closingBalance);

			// =================================================
			// ADD TO RESULT
			// =================================================

			result.add(dto);
		}

		// =====================================================
		// 13. RETURN RESULT
		// =====================================================

		return result;
	}

	// CashBook
	public List<AccountTransaction> getCashBookTransaction(String branchName, String startDate, String endDate) {

		return accountTransactionRepo.getCashBook(branchName, startDate, endDate);
	}

	// Fund Transfer Register
	public List<AccountTransaction> getFundTransfers(String branchName, String startDate, String endDate) {
		// TODO Auto-generated method stub
		return accountTransactionRepo.getFundTransfers(branchName, startDate, endDate);
	}

	// Daily Transactions Book
	public List<AccountTransaction> getDailyTransactions(String branchName, String accountCode, String startDate,
			String endDate) {

		if (branchName == null || branchName.trim().isEmpty() || accountCode == null || accountCode.trim().isEmpty()) {

			throw new RuntimeException("BRANCH AND LEDGER REQUIRED");
		}

		return accountTransactionRepo.getDailyTransactions(branchName, accountCode, startDate, endDate);
	}

	public List<TrialBalanceDTO> getTrialBalance(String branchName, String startDate, String endDate) {

		List<Object[]> results = accountTransactionRepo.getTrialBalance(branchName, startDate, endDate);

		List<TrialBalanceDTO> list = new ArrayList<>();

		for (Object[] row : results) {

			String ledgerName = row[0] != null ? row[0].toString() : "-";

			Double opening = row[1] != null ? ((Number) row[1]).doubleValue() : 0.0;
			Double debit = row[2] != null ? ((Number) row[2]).doubleValue() : 0.0;
			Double credit = row[3] != null ? ((Number) row[3]).doubleValue() : 0.0;

			// 🔥 DTO already calculating closing
			TrialBalanceDTO dto = new TrialBalanceDTO(ledgerName, opening, debit, credit);

			list.add(dto);
		}

		return list;
	}

	public List<PLStatementDto> getPLStatement(String branchName, String startDate, String endDate) {

		List<Object[]> results = accountTransactionRepo.getPLData(branchName, startDate, endDate);

		List<PLStatementDto> list = new ArrayList<>();

		for (Object[] row : results) {

			Double income = row[2] != null ? ((Number) row[2]).doubleValue() : 0.0;
			Double expense = row[3] != null ? ((Number) row[3]).doubleValue() : 0.0;
			System.out.println(income);
			System.out.println(expense);

			PLStatementDto pl = new PLStatementDto();

			pl.setDate(row[0].toString());
			pl.setBranchName(row[1].toString());
			pl.setTotalIncome(BigDecimal.valueOf(income));
			pl.setTotalExpense(BigDecimal.valueOf(expense));

			// 🔥 Profit / Loss
			pl.setProfitOrLoss(BigDecimal.valueOf(income - expense));

			list.add(pl);
		}

		return list;
	}

	public BalanceSheetDTO getBalanceSheet(String branchName, String startDate, String endDate) {

		// ✅ Directly use parameter (NO hardcoding)
		List<AccountTransaction> transactions = accountTransactionRepo
				.findByBranchNameAndTransactionDateBetween(branchName, startDate, endDate);

		Map<String, List<AccountTransaction>> grouped = transactions.stream()
				.collect(Collectors.groupingBy(AccountTransaction::getAccountCode));

		List<BalanceSheetItemDTO> assets = new ArrayList<>();
		List<BalanceSheetItemDTO> liabilities = new ArrayList<>();

		double totalAssets = 0;
		double totalLiabilities = 0;

		for (Map.Entry<String, List<AccountTransaction>> entry : grouped.entrySet()) {

			String accountCode = entry.getKey();
			List<AccountTransaction> txList = entry.getValue();

			// 🔥 IMPORTANT: branchName add करो यहाँ भी
			Optional<LedgerAccountMaster> optionalLedger = ledgerAccountRepository
					.findByAccountCodeAndBranchName(accountCode, branchName);

			if (!optionalLedger.isPresent())
				continue;

			LedgerAccountMaster ledger = optionalLedger.get();

			double debit = txList.stream().mapToDouble(tx -> tx.getDebit() != null ? tx.getDebit() : 0).sum();

			double credit = txList.stream().mapToDouble(tx -> tx.getCredit() != null ? tx.getCredit() : 0).sum();

			double balance;

			if ("ASSETS".equalsIgnoreCase(ledger.getGroupName())) {
				balance = debit - credit;
			} else {
				balance = credit - debit;
			}

			// 🔥 Opening Balance
			BigDecimal opening = ledger.getOpeningBalance() != null ? ledger.getOpeningBalance() : BigDecimal.ZERO;

			if ("DR".equalsIgnoreCase(ledger.getOpeningBalanceType())) {
				balance += opening.doubleValue();
			} else {
				balance -= opening.doubleValue();
			}

			String amount = String.format("%.2f", Math.abs(balance));

			if ("ASSETS".equalsIgnoreCase(ledger.getGroupName())) {

				assets.add(new BalanceSheetItemDTO(ledger.getAccountTitle(), amount));
				totalAssets += Math.abs(balance);

			} else if ("LIABILITIES".equalsIgnoreCase(ledger.getGroupName())) {

				liabilities.add(new BalanceSheetItemDTO(ledger.getAccountTitle(), amount));
				totalLiabilities += Math.abs(balance);
			}
		}

		return new BalanceSheetDTO(branchName, startDate, endDate, assets, liabilities,
				String.format("%.2f", totalAssets), String.format("%.2f", totalLiabilities));
	}

	public String transferCash(InterBranchTransferDTO dto) {

		// =========================
		// SOURCE BRANCH CHECK
		// =========================

		boolean sourceExists = branchModuleRepo.existsByBranchName(dto.getSourceBranch());

		if (!sourceExists) {

			throw new RuntimeException("SOURCE BRANCH DOES NOT EXIST");
		}

		// =========================
		// RECEIVING BRANCH CHECK
		// =========================

		boolean receivingExists = branchModuleRepo.existsByBranchName(dto.getReceivingBranch());

		if (!receivingExists) {

			throw new RuntimeException("RECEIVING BRANCH DOES NOT EXIST");
		}

		// =========================
		// SAME BRANCH CHECK
		// =========================

		if (dto.getSourceBranch().equalsIgnoreCase(dto.getReceivingBranch())) {

			throw new RuntimeException(

					"SOURCE AND RECEIVING BRANCH CANNOT BE SAME");
		}

		// =========================
		// AMOUNT VALIDATION
		// =========================

		if (dto.getAmount() == null || dto.getAmount() <= 0) {

			throw new RuntimeException(

					"AMOUNT MUST BE GREATER THAN ZERO");
		}

		// =========================
		// SOURCE LEDGER CHECK
		// =========================
		Optional<LedgerAccountMaster> sourceLedgerOptional = ledgerAccountRepository
				.findByAccountCodeAndBranchName(dto.getAccountCode(), dto.getSourceBranch());

		if (!sourceLedgerOptional.isPresent()) {

			throw new RuntimeException(

					"CASH LEDGER NOT FOUND IN SOURCE BRANCH");
		}

		LedgerAccountMaster sourceLedger = sourceLedgerOptional.get();

		// =========================
		// GROUP VALIDATION
		// =========================

		if (!"ASSETS".equalsIgnoreCase(sourceLedger.getGroupName())) {

			throw new RuntimeException(

					"SELECTED LEDGER IS NOT AN ASSET LEDGER");
		}

		// =========================
		// ACCOUNT TYPE VALIDATION
		// =========================
//			if (!"Cash In Hand".equalsIgnoreCase(sourceLedger.getAccountType())) {
		//
//				throw new RuntimeException(
		//
//						"Selected Ledger is not a CASH Ledger");
//			}

		// =========================
		// RECEIVING LEDGER CHECK
		// =========================
		Optional<LedgerAccountMaster> receivingLedgerOptional = ledgerAccountRepository
				.findByAccountCodeAndBranchName(dto.getAccountCode(), dto.getReceivingBranch());

		if (!receivingLedgerOptional.isPresent()) {

			throw new RuntimeException(

					"CASH LEDGER NOT FOUND IN RECEIVING BRANCH");
		}

		LedgerAccountMaster receivingLedger = receivingLedgerOptional.get();

		// =========================
		// INSUFFICIENT BALANCE CHECK
		// =========================

		Double availableBalance = sourceLedger.getCurrentBalance().doubleValue();

		if (availableBalance < dto.getAmount()) {

			throw new RuntimeException(

					"INSUFFICIENT CASH BALANCE. AVAILABLE BALANCE : "

							+ availableBalance);
		}

		// =========================
		// REFERENCE NUMBER
		// =========================

		String referenceNo =

				"IBT-" +

						UUID.randomUUID().toString().substring(0, 8);

		// =========================
		// SOURCE ENTRY
		// =========================

		AccountTransaction sourceEntry = new AccountTransaction();

		sourceEntry.setBranchName(dto.getSourceBranch());

		sourceEntry.setTransactionDate(dto.getTransactionDate());

		sourceEntry.setAccountCode(dto.getAccountCode());

		sourceEntry.setAccountNumber("NA");

		sourceEntry.setNarration(

				"Cash Transfer To "

						+ dto.getReceivingBranch());

		sourceEntry.setDebit(0.0);

		sourceEntry.setCredit(dto.getAmount());

		sourceEntry.setTransactionType("INTER_BRANCH_TRANSFER");

		sourceEntry.setReferenceNo(referenceNo);

		sourceEntry.setStatus("SUCCESS");

		sourceEntry.setCreatedBy("ADMIN");

		// =========================
		// RECEIVING ENTRY
		// =========================

		AccountTransaction receivingEntry = new AccountTransaction();

		receivingEntry.setBranchName(dto.getReceivingBranch());

		receivingEntry.setTransactionDate(dto.getTransactionDate());

		receivingEntry.setAccountCode(dto.getAccountCode());

		receivingEntry.setAccountNumber("NA");

		receivingEntry.setNarration(

				"Cash Received From "

						+ dto.getSourceBranch());

		receivingEntry.setDebit(dto.getAmount());

		receivingEntry.setCredit(0.0);

		receivingEntry.setTransactionType("INTER_BRANCH_RECEIVE");

		receivingEntry.setReferenceNo(referenceNo);

		receivingEntry.setStatus("SUCCESS");

		receivingEntry.setCreatedBy("ADMIN");

		// =========================
		// SAVE TRANSACTIONS
		// =========================

		accountTransactionRepo.save(sourceEntry);

		accountTransactionRepo.save(receivingEntry);

		// =========================
		// UPDATE SOURCE BALANCE
		// =========================

		sourceLedger.setCurrentBalance(

				BigDecimal.valueOf(

						availableBalance - dto.getAmount()));

		ledgerAccountRepository.save(sourceLedger);

		// =========================
		// UPDATE RECEIVING BALANCE
		// =========================

		BigDecimal receivingCurrentBalance =

				receivingLedger.getCurrentBalance();

		if (receivingCurrentBalance == null) {

			receivingCurrentBalance = BigDecimal.ZERO;
		}

		receivingLedger.setCurrentBalance(

				receivingCurrentBalance.add(

						BigDecimal.valueOf(dto.getAmount())));

		ledgerAccountRepository.save(receivingLedger);

		// =========================
		// SUCCESS
		// =========================

		return "INTER BRANCH CASH TRANSFER SUCCESSFUL";
	}

	public List<AccountTransaction> getInterBranchTransfers() {
		return accountTransactionRepo.findByTransactionTypeOrderByIdDesc("INTER_BRANCH_TRANSFER");
	}

	public List<Map<String, Object>> getUniqueLedgerDropdown() {
		List<Object[]> list = ledgerAccountRepository.getUniqueLedgerDropdown();
		return list.stream().map(data -> {
			Map<String, Object> map = new HashMap<>();
			map.put("accountCode", data[0]);
			map.put("accountTitle", data[1]);
			return map;
		}).collect(Collectors.toList());
	}

	public List<LedgerAccountMaster> getExpenseLedgers() {
		// TODO Auto-generated method stub
		return null;
	}

	public List<LedgerAccountMaster> getBankAccountLedgers() {

		return ledgerAccountRepository.findByGroupNameIgnoreCaseAndAccountTypeIgnoreCaseAndStatusIgnoreCase("ASSETS",
				"Bank Account", "Active");
	}

	@Transactional
	public AccountTransaction saveTransaction(AccountTransactionRequest request) {

		if (request == null) {
			throw new RuntimeException("TRANSACTION REQUEST CANNOT BE NULL");
		}

		if (request.getAccountNumber() == null || request.getAccountNumber().trim().isEmpty()) {

			throw new RuntimeException("ACCOUNT NUMBER IS REQUIRED");
		}

		if (request.getCredit() == null) {
			request.setCredit(0.0);
		}

		if (request.getDebit() == null) {
			request.setDebit(0.0);
		}

		if (request.getCredit() < 0 || request.getDebit() < 0) {
			throw new RuntimeException("CREDIT/DEBIT AMOUNT CANNOT BE NEGATIVE");
		}

		if (request.getCredit() > 0 && request.getDebit() > 0) {
			throw new RuntimeException("BOTH CREDIT AND DEBIT CANNOT BE GREATER THAN ZERO");
		}

		if (request.getCredit() == 0 && request.getDebit() == 0) {
			throw new RuntimeException("EITHER CREDIT OR DEBIT AMOUNT IS REQUIRED");
		}

		AccountTransaction transaction = new AccountTransaction();

		transaction.setBranchName(request.getBranchName());
		transaction.setAccountCode(request.getAccountCode());
		transaction.setCustomerName(request.getCustomerName());
		transaction.setAccountNumber(request.getAccountNumber());

		/*
		 * Transaction Date
		 */
		if (request.getTransactionDate() != null && !request.getTransactionDate().trim().isEmpty()) {

			transaction.setTransactionDate(request.getTransactionDate());

		} else {

			transaction.setTransactionDate(LocalDate.now().toString());
		}

		transaction.setNarration(request.getNarration());

		transaction.setCredit(request.getCredit());
		transaction.setDebit(request.getDebit());

		transaction.setTransactionType(request.getTransactionType());

		transaction.setReferenceNo(request.getReferenceNo());

		/*
		 * Default status
		 */
		if (request.getStatus() != null && !request.getStatus().trim().isEmpty()) {

			transaction.setStatus(request.getStatus());

		} else {

			transaction.setStatus("SUCCESS");
		}

		transaction.setLoanId(request.getLoanId());
		transaction.setPolicyId(request.getPolicyId());

		transaction.setCreatedAt(LocalDateTime.now());

		transaction.setCreatedBy(request.getCreatedBy());

		/*
		 * Calculate Running Balance
		 *
		 * Previous Balance + Credit - Debit
		 */
		Double previousBalance = getCurrentBalance(request.getAccountNumber());

		Double newBalance = previousBalance + request.getCredit() - request.getDebit();

		transaction.setBalance(newBalance);

		return transactionRepository.save(transaction);
	}

	public Double getCurrentBalance(String accountNumber) {

		List<AccountTransaction> transactions = transactionRepository.findByAccountNumberOrderByIdAsc(accountNumber);

		if (transactions == null || transactions.isEmpty()) {
			return 0.0;
		}

		AccountTransaction lastTransaction = transactions.get(transactions.size() - 1);

		if (lastTransaction.getBalance() == null) {
			return 0.0;
		}

		return lastTransaction.getBalance();
	}

	/**
	 * Get transactions by Account Number
	 */
	public List<AccountTransaction> getTransactions(String accountNumber) {

		return transactionRepository.findByAccountNumberOrderByIdAsc(accountNumber);
	}
}
