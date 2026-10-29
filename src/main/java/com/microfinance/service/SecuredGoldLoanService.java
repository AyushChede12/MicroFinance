package com.microfinance.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.microfinance.dto.ApiResponse;
import com.microfinance.model.ApplyForGold;
import com.microfinance.model.BranchModule;
import com.microfinance.model.CreateSavingsAccount;
import com.microfinance.model.EmiInstallmentPaymentGold;
import com.microfinance.model.GoldDirectory;
import com.microfinance.model.GoldLoanClose;
import com.microfinance.model.GoldLoanPayment;
import com.microfinance.model.SecuredGoldPlan;
import com.microfinance.model.addCustomer;
import com.microfinance.repository.AddCustomerRepo;
import com.microfinance.repository.ApplyForGoldRepo;
import com.microfinance.repository.BranchModuleRepo;
import com.microfinance.repository.CreateSavingAccountRepo;
import com.microfinance.repository.EMIInstallmentRepo;
import com.microfinance.repository.GoldCloseRepo;
import com.microfinance.repository.GoldDirectoryRepo;
import com.microfinance.repository.GoldLoanApprovalRepo;
import com.microfinance.repository.GoldPaymentRepo;
import com.microfinance.repository.GoldSecurePlanRepo;

@Service
public class SecuredGoldLoanService {

	@Autowired
	GoldSecurePlanRepo goldSecurePlanRepo;

	@Autowired
	GoldDirectoryRepo goldDirectoryRepo;

	@Autowired
	ApplyForGoldRepo applyForGoldRepo;

	@Autowired
	AddCustomerRepo addCustomerRepo;

	@Autowired
	GoldLoanApprovalRepo goldApprovalRepo;

	@Autowired
	CreateSavingAccountRepo createSavingRepo;

	@Autowired
	GoldCloseRepo goldCloseRepo;

	@Autowired
	GoldPaymentRepo goldPaymentRepo;

	@Autowired
	EMIInstallmentRepo emiRepo;

	@Autowired
	private CustomerSavingsService customerSavingsService;

	@Autowired
	private BranchModuleRepo branchModuleRepo;

	private BranchModule resolveBranch(String branchName) {
		if (branchName == null || branchName.trim().isEmpty()) {
			return null;
		}
		BranchModule bm = branchModuleRepo.findByBranchNameIgnoreCase(branchName.trim()).orElse(null);
		if (bm == null) {
			bm = branchModuleRepo.findByBranchName(branchName.trim());
		}
		return bm;
	}

	public SecuredGoldPlan saveLoanManagmentData(SecuredGoldPlan goldLoan) {
		if (goldLoan.getId() != null && goldSecurePlanRepo.existsById(goldLoan.getId())) {
			SecuredGoldPlan existingGoldLoan = goldSecurePlanRepo.findById(goldLoan.getId()).get();

			existingGoldLoan.setLoanPlanName(goldLoan.getLoanPlanName());
			existingGoldLoan.setTypeOfLoan(goldLoan.getTypeOfLoan());
			existingGoldLoan.setLoanMode(goldLoan.getLoanMode());
			existingGoldLoan.setInterestType(goldLoan.getInterestType());
			existingGoldLoan.setEmiType(goldLoan.getEmiType());
			existingGoldLoan.setMinAge(goldLoan.getMinAge());
			existingGoldLoan.setMaxAge(goldLoan.getMaxAge());
			existingGoldLoan.setLoanAmt(goldLoan.getLoanAmt());
			existingGoldLoan.setLoanTerm(goldLoan.getLoanTerm());
			existingGoldLoan.setRateInterestType(goldLoan.getRateInterestType());
			existingGoldLoan.setSecurityType(goldLoan.getSecurityType());
			existingGoldLoan.setPlanStatus(goldLoan.getPlanStatus());

			existingGoldLoan.setProcFee(goldLoan.getProcFee());
			existingGoldLoan.setLegalCharge(goldLoan.getLegalCharge());
			existingGoldLoan.setGst(goldLoan.getGst());
			existingGoldLoan.setInsuFee(goldLoan.getInsuFee());
			existingGoldLoan.setValuFee(goldLoan.getValuFee());

			existingGoldLoan.setLateAllowanceDay(goldLoan.getLateAllowanceDay());
			existingGoldLoan.setPenaltyMode(goldLoan.getPenaltyMode());
			existingGoldLoan.setMonthlyPenalty(goldLoan.getMonthlyPenalty());

			return goldSecurePlanRepo.save(existingGoldLoan);
		} else {
			return goldSecurePlanRepo.save(goldLoan);
		}
	}

	public List<SecuredGoldPlan> allDataFetchGoldSecurePlan() {
		return goldSecurePlanRepo.findAll();
	}

	public SecuredGoldPlan getGoldLoanById(Long id) {
		return goldSecurePlanRepo.findById(id).orElse(null);
	}

	public boolean deleteGoldLoanLoanById(Long id) {
		if (goldSecurePlanRepo.existsById(id)) {
			goldSecurePlanRepo.deleteById(id);
			return true;
		}
		return false;
	}

	public List<GoldDirectory> getAllGoldDirectories() {
		return goldDirectoryRepo.findAll();
	}

	public List<addCustomer> getgoldApplicationById(String memberCode) {
		return addCustomerRepo.findByMemberCode(memberCode);
	}

	public List<addCustomer> getAllCustomers() {
		return addCustomerRepo.findAll();
	}

	public List<GoldDirectory> getLoanPlanNameApplyForGoldByLoanPlan(String loanPlanName) {
		return goldDirectoryRepo.findByloanPlanName(loanPlanName);
	}

	public GoldDirectory saveGoldDirectory(GoldDirectory goldDirectory) {
		return goldDirectoryRepo.save(goldDirectory);
	}

	public List<GoldDirectory> getByMemberCodeApplyForGoldByLoanPlan(String customerCode) {
		return goldDirectoryRepo.findBycustomerCode(customerCode);
	}

	public boolean saveApplyForGoldData(ApplyForGold applyForGold) {
		try {
			applyForGoldRepo.save(applyForGold);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public List<ApplyForGold> getAllGoldLoanCustomer() {
		return applyForGoldRepo.findAll();
	}

	public List<ApplyForGold> getByGoldIDforApproval(String goldID) {
		return applyForGoldRepo.findByGoldID(goldID);
	}

	public String approveGoldLoan(ApplyForGold approval) {
		ApplyForGold goldLoan = applyForGoldRepo.findSingleByGoldID(approval.getGoldID());

		if (goldLoan == null) {
			return "not_found";
		}

		if (goldLoan.isApprovalStatus()) {
			return "already_approved";
		}

		// Step 1: Calculate deductions
		double loanAmount = Double.parseDouble(goldLoan.getLoanAmount());
		double processingFee = goldLoan.getProcessingFee() != null ? Double.parseDouble(goldLoan.getProcessingFee()) : 0;
		double legalCharge = goldLoan.getLegalCharges() != null ? Double.parseDouble(goldLoan.getLegalCharges()) : 0;
		double gst = goldLoan.getGst() != null ? Double.parseDouble(goldLoan.getGst()) : 0;
		double stampDuty = goldLoan.getStampDuty() != null ? Double.parseDouble(goldLoan.getStampDuty()) : 0;
		double smsCharges = goldLoan.getSmsCharges() != null ? Double.parseDouble(goldLoan.getSmsCharges()) : 0;
		double mainCharges = goldLoan.getMainCharges() != null ? Double.parseDouble(goldLoan.getMainCharges()) : 0;
		double stationaryFee = goldLoan.getStationaryFee() != null ? Double.parseDouble(goldLoan.getStationaryFee()) : 0;
		double insuFee = goldLoan.getInsuFee() != null ? Double.parseDouble(goldLoan.getInsuFee()) : 0;
		double penaltyCharge = goldLoan.getPenaltyCharge() != null ? Double.parseDouble(goldLoan.getPenaltyCharge()) : 0;
		double valuationFees = goldLoan.getValuationFees() != null ? Double.parseDouble(goldLoan.getValuationFees()) : 0;
		double overCharge = goldLoan.getOverCharge() != null ? Double.parseDouble(goldLoan.getOverCharge()) : 0;
		double collectionCharge = goldLoan.getCollectionCharge() != null ? Double.parseDouble(goldLoan.getCollectionCharge()) : 0;

		double totalDeductions = processingFee + legalCharge + gst + stampDuty + smsCharges + mainCharges
				+ stationaryFee + insuFee + penaltyCharge + valuationFees + overCharge + collectionCharge;

		double sanctionedAmount = loanAmount - totalDeductions;
		String today = LocalDate.now().toString();

		// Step 2: Update linked savings account balance & record AccountTransaction
		List<CreateSavingsAccount> accounts = createSavingRepo.findBySelectByCustomer(goldLoan.getMemberCode());
		if (accounts != null && !accounts.isEmpty()) {
			CreateSavingsAccount account = accounts.get(0);
			double existingBalance = 0.0;
			try {
				existingBalance = Double.parseDouble(account.getBalance());
			} catch (Exception ignored) {}
			double updatedBalance = existingBalance + sanctionedAmount;
			account.setBalance(String.valueOf(updatedBalance));
			createSavingRepo.save(account);

			try {
				customerSavingsService.recordAccountTransaction(
					account.getAccountNumber(),
					account.getEnterCustomerName() != null ? account.getEnterCustomerName() : goldLoan.getCustomerName(),
					goldLoan.getBranchName(),
					"SAVING",
					today,
					"CREDIT",
					sanctionedAmount,
					0.0,
					"GOLD LOAN DISBURSEMENT - " + goldLoan.getGoldID(),
					goldLoan.getLoanMode() != null ? goldLoan.getLoanMode().toUpperCase() : "TRANSFER",
					goldLoan.getGoldID(),
					updatedBalance,
					"ADMIN"
				);
			} catch (Exception ex) {
				System.err.println("FAILED TO RECORD DISBURSEMENT ACCOUNT TRANSACTION: " + ex.getMessage());
			}
		}

		// Record BankTransaction for disbursement
		try {
			BranchModule bm = resolveBranch(goldLoan.getBranchName());
			customerSavingsService.recordBankTransaction(
				null,
				bm,
				today,
				"GOLD LOAN DISBURSEMENT - " + goldLoan.getGoldID(),
				0.0,
				sanctionedAmount,
				"DEBIT",
				goldLoan.getGoldID()
			);
		} catch (Exception ex) {
			System.err.println("FAILED TO RECORD DISBURSEMENT BANK TRANSACTION: " + ex.getMessage());
		}

		// Step 3: Update gold loan approval
		goldLoan.setApprovalStatus(true);
		goldLoan.setSanctionedAmount(String.valueOf(sanctionedAmount));
		goldLoan.setApprovalDate(today);
		goldLoan.setGoldLoanStatus("ACTIVE");
		applyForGoldRepo.save(goldLoan);

		return "success";
	}

	public List<ApplyForGold> getApprovedGoldCustomer() {
		return applyForGoldRepo.findByApprovalStatusTrue();
	}

	public GoldLoanClose closeGoldLoan(GoldLoanClose goldLoanCloseRequest) {
		goldLoanCloseRequest.setGoldLoanStatus("CLOSED");
		GoldLoanClose savedCloseData = goldCloseRepo.save(goldLoanCloseRequest);

		// UPDATE ApplyForGold Table Status = CLOSED
		ApplyForGold applyLoan = applyForGoldRepo.findSingleByGoldID(goldLoanCloseRequest.getGoldID());
		if (applyLoan != null) {
			applyLoan.setGoldLoanStatus("CLOSED");
			applyForGoldRepo.save(applyLoan);
		}

		// Process settlement payment & transactions if settlement amount paid
		double settlementAmount = 0.0;
		String rawAmount = goldLoanCloseRequest.getNetAmount() != null && !goldLoanCloseRequest.getNetAmount().trim().isEmpty()
				? goldLoanCloseRequest.getNetAmount()
				: goldLoanCloseRequest.getPaymentAmount();
		if (rawAmount != null && !rawAmount.trim().isEmpty()) {
			try {
				settlementAmount = Double.parseDouble(rawAmount.replaceAll("[^0-9.]", "").trim());
			} catch (Exception ignored) {}
		}

		if (settlementAmount > 0) {
			String today = goldLoanCloseRequest.getPaymentDate() != null && !goldLoanCloseRequest.getPaymentDate().trim().isEmpty()
					? goldLoanCloseRequest.getPaymentDate()
					: LocalDate.now().toString();

			// Debit savings account if customer has savings
			List<CreateSavingsAccount> accounts = createSavingRepo.findBySelectByCustomer(goldLoanCloseRequest.getCustomerCode());
			if (accounts != null && !accounts.isEmpty()) {
				CreateSavingsAccount account = accounts.get(0);
				double bal = 0.0;
				try {
					bal = Double.parseDouble(account.getBalance());
				} catch (Exception ignored) {}

				if (bal >= settlementAmount) {
					bal -= settlementAmount;
					account.setBalance(String.valueOf(bal));
					createSavingRepo.save(account);
				}

				try {
					customerSavingsService.recordAccountTransaction(
						account.getAccountNumber(),
						account.getEnterCustomerName() != null ? account.getEnterCustomerName() : goldLoanCloseRequest.getCustomerName(),
						goldLoanCloseRequest.getBranchName() != null ? goldLoanCloseRequest.getBranchName() : (account.getBranchName() != null ? account.getBranchName().getBranchName() : ""),
						"SAVING",
						today,
						"DEBIT",
						0.0,
						settlementAmount,
						"GOLD LOAN CLOSURE SETTLEMENT - " + goldLoanCloseRequest.getGoldID(),
						"CLOSURE",
						goldLoanCloseRequest.getGoldID() + "_CLOSE",
						bal,
						"ADMIN"
					);
				} catch (Exception ex) {
					System.err.println("FAILED TO RECORD CLOSURE ACCOUNT TRANSACTION: " + ex.getMessage());
				}
			}

			// Record BankTransaction
			try {
				BranchModule bm = resolveBranch(goldLoanCloseRequest.getPaymentBranch() != null ? goldLoanCloseRequest.getPaymentBranch() : goldLoanCloseRequest.getBranchName());
				customerSavingsService.recordBankTransaction(
					null,
					bm,
					today,
					"GOLD LOAN CLOSURE SETTLEMENT - " + goldLoanCloseRequest.getGoldID(),
					settlementAmount,
					0.0,
					"CREDIT",
					goldLoanCloseRequest.getGoldID()
				);
			} catch (Exception ex) {
				System.err.println("FAILED TO RECORD CLOSURE BANK TRANSACTION: " + ex.getMessage());
			}
		}

		return savedCloseData;
	}

	public List<GoldLoanClose> getAllGoldClosure() {
		return goldCloseRepo.findAll();
	}

	public List<GoldLoanClose> getGoldClosuresByGoldId(String goldID) {
		return goldCloseRepo.findByGoldID(goldID);
	}

	public GoldLoanPayment savePaymentForGold(GoldLoanPayment request) {
		return goldPaymentRepo.save(request);
	}

	public boolean processEmiPayment(GoldLoanPayment request, String string) {
		return false;
	}

	public boolean processGoldLoanEmi(GoldLoanPayment request, int noOfInst) {

		String goldID = request.getGoldID();

		// Step 1: Get Loan
		ApplyForGold goldApp = applyForGoldRepo.findSingleByGoldID(goldID);
		if (goldApp == null) {
			throw new RuntimeException("GOLD LOAN ID NOT FOUND: " + goldID);
		}

		// Step 2: Check if member has savings account
		List<CreateSavingsAccount> accounts = createSavingRepo.findBySelectByCustomer(request.getCustomerCode());
		if (accounts.isEmpty()) {
			throw new RuntimeException("SAVING ACCOUNT NOT FOUND FOR CUSTOMER: " + request.getCustomerCode());
		}

		CreateSavingsAccount savingAcc = accounts.get(0);

		double accountBalance = Double.parseDouble(savingAcc.getBalance());
		double emiAmount = Double.parseDouble(request.getEmiPayment());

		// Check balance for all installments
		if (accountBalance < (emiAmount * noOfInst)) {
			throw new RuntimeException(
					"INSUFFICIENT BALANCE! AVAILABLE: " + accountBalance + ", REQUIRED: " + (emiAmount * noOfInst));
		}

		// Deduct balance
		accountBalance -= (emiAmount * noOfInst);
		savingAcc.setBalance(String.valueOf(accountBalance));
		createSavingRepo.save(savingAcc);

		String txnDate = request.getPaymentDate() != null && !request.getPaymentDate().trim().isEmpty() ? request.getPaymentDate() : LocalDate.now().toString();

		// Record AccountTransaction
		try {
			customerSavingsService.recordAccountTransaction(
				savingAcc.getAccountNumber(),
				savingAcc.getEnterCustomerName() != null ? savingAcc.getEnterCustomerName() : request.getCustomerName(),
				savingAcc.getBranchName() != null ? savingAcc.getBranchName().getBranchName() : goldApp.getBranchName(),
				"SAVING",
				txnDate,
				"DEBIT",
				0.0,
				emiAmount * noOfInst,
				"GOLD LOAN EMI PAYMENT - " + goldID + " (" + noOfInst + " INST)",
				request.getModeOfPayment() != null ? request.getModeOfPayment().toUpperCase() : "SAVINGS",
				goldID + "_EMI_" + System.currentTimeMillis(),
				accountBalance,
				"ADMIN"
			);
		} catch (Exception ex) {
			System.err.println("FAILED TO RECORD EMI ACCOUNT TRANSACTION: " + ex.getMessage());
		}

		// Record BankTransaction
		try {
			BranchModule bm = resolveBranch(goldApp.getBranchName());
			customerSavingsService.recordBankTransaction(
				null,
				bm,
				txnDate,
				"GOLD LOAN EMI PAYMENT - " + goldID,
				emiAmount * noOfInst,
				0.0,
				"CREDIT",
				goldID
			);
		} catch (Exception ex) {
			System.err.println("FAILED TO RECORD EMI BANK TRANSACTION: " + ex.getMessage());
		}

		// Step 3: Fetch previous payments
		List<GoldLoanPayment> allPayments = goldPaymentRepo.findByGoldID(goldID);

		double lastAmountDue;
		double remainingPrincipal = Double.parseDouble(goldApp.getLoanAmount());
		double roi = Double.parseDouble(goldApp.getRateOfInterest());
		double term = Double.parseDouble(goldApp.getLoanTerm());
		String interestType = goldApp.getInterestType();

		if (!allPayments.isEmpty()) {
			GoldLoanPayment lastPayment = allPayments.get(allPayments.size() - 1);
			lastAmountDue = Double.parseDouble(lastPayment.getAmountDue());
			if ("Reducing Interest".equalsIgnoreCase(interestType)) {
				remainingPrincipal = lastAmountDue;
			}
		} else {
			if ("Flat Interest".equalsIgnoreCase(interestType)) {
				lastAmountDue = remainingPrincipal + (remainingPrincipal * roi * term) / 100;
			} else {
				lastAmountDue = remainingPrincipal;
			}
		}

		boolean isLoanClosed = false;

		// Step 4: Process installments
		for (int i = 1; i <= noOfInst; i++) {
			if (lastAmountDue <= 0)
				break;

			double interestThisPeriod = 0;

			if ("Reducing Interest".equalsIgnoreCase(interestType)) {
				interestThisPeriod = (remainingPrincipal * roi) / 100;
				remainingPrincipal = remainingPrincipal - (emiAmount - interestThisPeriod);
				if (remainingPrincipal < 0)
					remainingPrincipal = 0;
				lastAmountDue = remainingPrincipal;
			} else {
				lastAmountDue -= emiAmount;
				if (lastAmountDue < 0)
					lastAmountDue = 0;
			}

			GoldLoanPayment payment = new GoldLoanPayment();

			// -------------------- Customer Details --------------------
			payment.setGoldID(request.getGoldID());
			payment.setCustomerCode(request.getCustomerCode());
			payment.setCustomerName(request.getCustomerName());
			payment.setDateOfBirth(goldApp.getDateOfBirth());
			payment.setAge(goldApp.getAge());
			payment.setContactNo(goldApp.getContactNo());
			payment.setAddress(goldApp.getAddress());
			payment.setPinCode(goldApp.getPinCode());
			payment.setBranchName(goldApp.getBranchName());

			// -------------------- Loan Details --------------------
			payment.setGoldLoanDate(goldApp.getLoanDate());
			payment.setLoanPlanName(goldApp.getLoanPlanName());
			payment.setTypeOfLoan(goldApp.getTypeOfLoan());
			payment.setLoanTerm(goldApp.getLoanTerm());
			payment.setLoanMode(goldApp.getLoanMode());
			payment.setRateOfInterest(goldApp.getRateOfInterest());
			payment.setLoanAmount(goldApp.getLoanAmount());
			payment.setInterestType(goldApp.getInterestType());
			payment.setEmiPayment(String.valueOf(emiAmount));
			payment.setPurposeOfLoan(goldApp.getPurposeOfLoan());

			// -------------------- Gold/Silver Details --------------------
			payment.setKarat(goldApp.getKarat());
			payment.setItemType(goldApp.getItemType());
			payment.setCustgoldRate(goldApp.getCustgoldRate());
			payment.setItemName(goldApp.getItemName());
			payment.setLockerBranch(goldApp.getLockerBranch());
			payment.setPurity(goldApp.getPurity());
			payment.setItemQty(goldApp.getItemQty());
			payment.setItemWt(goldApp.getItemWt());
			payment.setGrossWt(goldApp.getGrossWt());
			payment.setStoneWt(goldApp.getStoneWt());
			payment.setNetWt(goldApp.getNetWt());
			payment.setMarketValuation(goldApp.getMarketValuation());
			payment.setEligibleLoan(goldApp.getEligibleLoan());

			// -------------------- Guarantor Details --------------------
			payment.setGuarantorcustomerCode(goldApp.getGuarantorcustomerCode());
			payment.setGuarantorIdentity(goldApp.getGuarantorIdentity());
			payment.setGuarantorAddress(goldApp.getGuarantorAddress());
			payment.setGuarantorPinCode(goldApp.getGuarantorPinCode());
			payment.setGuarantorContactNo(goldApp.getGuarantorContactNo());
			payment.setGuarantorSecurityType(goldApp.getGuarantorSecurityType());

			// -------------------- Co-Applicant Details --------------------
			payment.setCoApplicantMemberId(goldApp.getCoApplicantMemberId());
			payment.setCoApplicantIdentity(goldApp.getCoApplicantIdentity());
			payment.setCoApplicantAddress(goldApp.getCoApplicantAddress());
			payment.setCoAge(goldApp.getCoAge());
			payment.setCoApplicantContactNo(goldApp.getCoApplicantContactNo());
			payment.setSecurityDetails(goldApp.getSecurityDetails());

			// -------------------- Deduction Details --------------------
			payment.setProcessingFee(request.getProcessingFee());
			payment.setLegalCharges(request.getLegalCharges());
			payment.setStampDuty(goldApp.getStampDuty());
			payment.setSmsCharges(goldApp.getSmsCharges());
			payment.setMainCharges(goldApp.getMainCharges());
			payment.setStationaryFee(request.getStationaryFee());
			payment.setGst(request.getGst());
			payment.setInsuFee(goldApp.getInsuFee());
			payment.setPenaltyCharge(goldApp.getPenaltyCharge());
			payment.setValuationFees(request.getValuationFees());
			payment.setOverdueInterestCharge(request.getOverdueInterestCharge());
			payment.setCollectionCharge(goldApp.getCollectionCharge());
			payment.setFinancialCode(request.getFinancialCode());
			payment.setFinancialName(request.getFinancialName());

			// -------------------- Payment Details --------------------
			payment.setPaymentDate(request.getPaymentDate());
			payment.setPaymentStatus("Paid");
			payment.setModeOfPayment(request.getModeOfPayment());
			payment.setChargeDeductCash("0");
			payment.setRemarks("Installment " + (allPayments.size() + i));
			payment.setAmountDue(String.valueOf(lastAmountDue));

			goldPaymentRepo.save(payment);

			// Close loan if final installment
			if (lastAmountDue <= 0) {
				goldApp.setGoldLoanStatus("CLOSED");
				applyForGoldRepo.save(goldApp);
				isLoanClosed = true;
				break;
			}
		}

		return isLoanClosed;
	}

	public List<addCustomer> getLoanApplicationById(String memberCode) {
		return addCustomerRepo.findByMemberCode(memberCode);
	}

	public List<ApplyForGold> getAllActiveGoldLoans() {
		return applyForGoldRepo.findByGoldLoanStatus("ACTIVE");
	}

	public List<ApplyForGold> getNotApprovedGoldCustomer() {
		return applyForGoldRepo.findByApprovalStatusFalse();
	}

	public List<GoldLoanPayment> getGoldPaymentByGoldId(String goldID) {
		return goldPaymentRepo.findByGoldID(goldID);
	}

	public ApiResponse saveInstallmentAndUpdateSavings(EmiInstallmentPaymentGold emi) {

		// 1. Save EMI installment
		emiRepo.save(emi);

		// 2. Fetch Savings Account
		List<CreateSavingsAccount> optionalAcc = createSavingRepo.findBySelectByCustomer(emi.getCustomerCode());
		if (optionalAcc == null || optionalAcc.isEmpty()) {
			return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, "FAILED", "SAVINGS ACCOUNT NOT FOUND!");
		}

		CreateSavingsAccount acc = optionalAcc.get(0);

		double oldBalance = 0.0;
		try {
			oldBalance = Double.parseDouble(acc.getBalance());
		} catch (Exception e) {
			oldBalance = 0.0;
		}

		double payAmount = Double.parseDouble(emi.getPaymentAmount());

		if (oldBalance < payAmount) {
			return new ApiResponse(HttpStatus.BAD_REQUEST, "FAILED", "INSUFFICIENT BALANCE IN SAVINGS ACCOUNT!");
		}

		double newBalance = oldBalance - payAmount;
		acc.setBalance(String.valueOf(newBalance));
		createSavingRepo.save(acc);

		String date = emi.getPaymentDate() != null && !emi.getPaymentDate().trim().isEmpty() ? emi.getPaymentDate() : LocalDate.now().toString();

		// Record AccountTransaction
		try {
			customerSavingsService.recordAccountTransaction(
				acc.getAccountNumber(),
				acc.getEnterCustomerName() != null ? acc.getEnterCustomerName() : emi.getCustomerName(),
				acc.getBranchName() != null ? acc.getBranchName().getBranchName() : emi.getBranchName(),
				"SAVING",
				date,
				"DEBIT",
				0.0,
				payAmount,
				"GOLD LOAN INSTALLMENT PAYMENT - " + emi.getGoldID() + (emi.getInstallment() != null ? " INST #" + emi.getInstallment() : ""),
				emi.getPaymentMode() != null ? emi.getPaymentMode().toUpperCase() : "SAVINGS",
				emi.getGoldID() + "_INST_" + (emi.getInstallment() != null ? emi.getInstallment() : System.currentTimeMillis()),
				newBalance,
				"ADMIN"
			);
		} catch (Exception ex) {
			System.err.println("FAILED TO RECORD INSTALLMENT ACCOUNT TRANSACTION: " + ex.getMessage());
		}

		// Record BankTransaction
		try {
			BranchModule bm = acc.getBranchName() != null ? acc.getBranchName() : resolveBranch(emi.getBranchName());
			customerSavingsService.recordBankTransaction(
				null,
				bm,
				date,
				"GOLD LOAN INSTALLMENT PAYMENT - " + emi.getGoldID(),
				payAmount,
				0.0,
				"CREDIT",
				emi.getGoldID()
			);
		} catch (Exception ex) {
			System.err.println("FAILED TO RECORD INSTALLMENT BANK TRANSACTION: " + ex.getMessage());
		}

		return new ApiResponse(HttpStatus.OK, "SUCCESS", "INSTALLMENT SAVED & BALANCE UPDATED");
	}

	public List<EmiInstallmentPaymentGold> getEMIInstallmentGoldByID(String goldID) {
		return emiRepo.findByGoldID(goldID);
	}

}
