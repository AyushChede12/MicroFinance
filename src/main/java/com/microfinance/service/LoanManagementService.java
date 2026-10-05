package com.microfinance.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.microfinance.dto.ApiResponse;
import com.microfinance.model.BranchModule;
import com.microfinance.model.CreateSavingsAccount;
import com.microfinance.model.LoanApplication;
import com.microfinance.model.LoanClosure;
import com.microfinance.model.LoanPayment;
import com.microfinance.model.LoanSchemCatalog;
import com.microfinance.model.NewLoanApplication;
import com.microfinance.model.addCustomer;
import com.microfinance.repository.AddCustomerRepo;
import com.microfinance.repository.BranchModuleRepo;
import com.microfinance.repository.CreateSavingAccountRepo;

import com.microfinance.repository.LoanApplicationRepo;
import com.microfinance.repository.LoanClosureRepo;
import com.microfinance.repository.LoanMangmentSchemeRepo;
import com.microfinance.repository.LoanPaymentRepo;
import com.microfinance.repository.NewLoanAppicationRepo;

@Service
public class LoanManagementService {

	@Autowired

	private LoanMangmentSchemeRepo loanRepository;
	@Autowired
	private AddCustomerRepo addCustomerRepo;

	@Autowired
	LoanApplicationRepo loanApplicationRepo;

	@Autowired
	LoanPaymentRepo loanPaymentRepo;

	@Autowired
	CreateSavingAccountRepo createSavingRepo;

	@Autowired
	LoanClosureRepo loanClosurerepo;

	// Service fo saving and updating the loan scheme data
	public LoanSchemCatalog saveLoanManagmentData(LoanSchemCatalog loan) {
		if (loan.getId() != null && loanRepository.existsById(loan.getId())) {
			// Perform update
			LoanSchemCatalog existingLoan = loanRepository.findById(loan.getId()).get();

			// Copy all fields from input to existing
			existingLoan.setLoanSchemeCode(loan.getLoanSchemeCode());
			existingLoan.setLoanPlaneName(loan.getLoanPlaneName());
			existingLoan.setTypeLoan(loan.getTypeLoan());
			existingLoan.setAge(loan.getAge());
			existingLoan.setLoanTerm(loan.getLoanTerm());
			existingLoan.setEmiType(loan.getEmiType());
			existingLoan.setLoanAmount(loan.getLoanAmount());
			existingLoan.setLoanMode(loan.getLoanMode());
			existingLoan.setRateIntrestType(loan.getRateIntrestType());
			existingLoan.setTypeIntrest(loan.getTypeIntrest());
			existingLoan.setTypesecurity(loan.getTypesecurity());
			existingLoan.setPlanStatus(loan.getPlanStatus());

			// Deductions
			existingLoan.setFeeProcessing(loan.getFeeProcessing());
			existingLoan.setChargesLegal(loan.getChargesLegal());
			existingLoan.setGst(loan.getGst());
			existingLoan.setFeeInsurence(loan.getFeeInsurence());
			existingLoan.setFeeValuation(loan.getFeeValuation());

			// Late fee
			existingLoan.setLateAllowanceday(loan.getLateAllowanceday());
			existingLoan.setModePanalty(loan.getModePanalty());
			existingLoan.setPennaltyMonthly(loan.getPennaltyMonthly());

			return loanRepository.save(existingLoan);
		} else {
			// Save new record
			return loanRepository.save(loan);
		}
	}

	// Fetch data On Table

	public List<LoanSchemCatalog> allDataFetchLoanSchemCatelog() {
		// TODO Auto-generated method stub
		return loanRepository.findAll();
	}

// Append the data on Text Field
	public LoanSchemCatalog getLoanById(Long id) {
		// TODO Auto-generated method stub
		return loanRepository.findById(id).orElse(null);
	}

// Delete By ID
	public boolean deleteLoanLoanById(Long id) {
		// TODO Auto-generated method stub
		if (loanRepository.existsById(id)) {
			loanRepository.deleteById(id);
			return true;
		}
		return false;
	}

	public List<addCustomer> getAllLoanApplication() {
		// TODO Auto-generated method stub
		return addCustomerRepo.findAll();
	}

	// Loan schem Code Name Dropdrawn

	public List<LoanSchemCatalog> getLoanSchemCode() {
		// TODO Auto-generated method stub
		return loanRepository.findAll();
	}

	// fetching in new loan application by schem loan Code

	public LoanSchemCatalog getLoanByCode(String code) {
		return loanRepository.findByLoanSchemeCode(code)
				.orElseThrow(() -> new RuntimeException("Loan Scheme not found for code: " + code));
	}

	public List<LoanSchemCatalog> getLoanPlanName(String loanPlanName) {
		// Example: find by plan name (case-insensitive match)
		return loanRepository.findByLoanPlaneNameContainingIgnoreCase(loanPlanName);
	}

	public List<LoanSchemCatalog> getSchemeCatalog() {

		return loanRepository.findAll();
	}

	public boolean saveLoanApplicationData(LoanApplication loanApplication) {
		try {
			loanApplicationRepo.save(loanApplication);
			return true; // Saved successfully
		} catch (Exception e) {
			e.printStackTrace();
			return false; // Something went wrong
		}
	}

	public List<addCustomer> getLoanApplicationById(String memberCode) {
		return addCustomerRepo.findByMemberCode(memberCode);
	}

	// Service for fetching Active Loan Id's In the dropdown (Vaibhav)
	public List<String> fetchAllLoanIds() {
		return loanApplicationRepo.findAll().stream().filter(loan -> "ACTIVE".equalsIgnoreCase(loan.getLoanStatus()))
				.map(LoanApplication::getLoanId).filter(Objects::nonNull).collect(Collectors.toList());
	}

	// Service for fetching the data in the textfields (Vaibhav)
	public LoanApplication getLoanById(String loanId) {
		return loanApplicationRepo.findByLoanId(loanId); // Make sure this method exists
	}

	// Service for approving the loan application (Vaibhav)
	public String updateApproval(LoanApplication approval) {
		LoanApplication loan = loanApplicationRepo.findByLoanId(approval.getLoanId());

		if (loan != null) {
			if (loan.isApprovalStatus()) {
				return "already_approved";
			}

			// Step 1: Add loan amount to openingFees in CreateSavingsAccount
			List<CreateSavingsAccount> accounts = createSavingRepo.findBySelectByCustomer(loan.getMemberId());

			if (accounts != null && !accounts.isEmpty()) {
				CreateSavingsAccount account = accounts.get(0); // assuming one account per member
				double existingBalance = Double.parseDouble(account.getBalance()); // current amount like 3000
				System.out.println("Balance fees :" + existingBalance);
				double loanAmount = Double.parseDouble(loan.getLoanAmount()); // loan amount like 500000
				double processingFee = Double.parseDouble(loan.getProcessingFee());
				double gst = Double.parseDouble(loan.getGst());
				double legalCharge = Double.parseDouble(loan.getLegalCharges());
				double extraCharges = processingFee + gst + legalCharge;
				double updatedBalance = existingBalance + (loanAmount - extraCharges);
				double sanctionedAmount = loanAmount - extraCharges;

				account.setBalance(String.valueOf(updatedBalance)); // update the balance

				createSavingRepo.save(account); // save changes

				// Step 2: Approve the loan

				loan.setSanctionedAmount(String.valueOf(sanctionedAmount));
			}
			loan.setApprovalStatus(approval.isApprovalStatus());
			loan.setApprovalDate(approval.getApprovalDate());
			loanApplicationRepo.save(loan);
			return "success";
		} else {
			return "not_found";
		}
	}

	// Service for getting Approved & Active loan Ids( Vaibhav)
	public List<String> getApprovedLoanIds() {
		List<LoanApplication> approvedActiveLoans = loanApplicationRepo.findByApprovalStatusTrueAndLoanStatus("ACTIVE");
		return approvedActiveLoans.stream().map(LoanApplication::getLoanId).collect(Collectors.toList());
	}

	// Service for paying the payment
	@Autowired
	private CreateSavingAccountRepo savingAccountRepo; // Add repo for savings account

	public boolean processEmiPayment(LoanPayment request, String noOfInst) {
		String loanId = request.getLoanId();

		LoanApplication loanApp = loanApplicationRepo.findByLoanId(loanId);
		if (loanApp == null) {
			throw new RuntimeException("Loan ID not found");
		}

		List<CreateSavingsAccount> accounts = createSavingRepo.findBySelectByCustomer(request.getMemberId());

		if (accounts.isEmpty()) {
			throw new RuntimeException("Saving account not found for Member ID: " + request.getMemberId());
		}

		CreateSavingsAccount savingAcc = accounts.get(0); // take the first account

		double accountBalance = Double.parseDouble(savingAcc.getBalance());
		double emiAmount = Double.parseDouble(loanApp.getEmiPayment());

		int numberOfInstallments = Integer.parseInt(noOfInst);

		// ✅ Step 2: Check if balance is enough
		if (accountBalance < (emiAmount * numberOfInstallments)) {
			throw new RuntimeException("Insufficient balance! Available: " + accountBalance + ", Required: "
					+ (emiAmount * numberOfInstallments));
		}

		// ✅ Step 3: Deduct balance before EMI processing
		accountBalance -= (emiAmount * numberOfInstallments);
		savingAcc.setBalance(String.valueOf(accountBalance));
		savingAccountRepo.save(savingAcc);

		// ✅ Continue your existing EMI processing logic
		String loanDate = loanApp.getLoanDate();
		double policyAmount = Double.parseDouble(loanApp.getLoanAmount()); // Principal
		double roi = Double.parseDouble(loanApp.getRateOfInterest()); // Annual ROI
		double term = Double.parseDouble(loanApp.getLoanTerm());
		String frequency = loanApp.getLoanMode();
		String interestType = loanApp.getInterestType(); // "Flat" or "Reducing"

		double periodDivisor;
		switch (frequency) {
		case "Daily":
			periodDivisor = 365;
			break;
		case "Weekly":
			periodDivisor = 52;
			break;
		case "Fortnightly":
			periodDivisor = 26;
			break;
		case "Monthly":
			periodDivisor = 12;
			break;
		case "Quarterly":
			periodDivisor = 4;
			break;
		default:
			throw new IllegalArgumentException("Invalid frequency: " + frequency);
		}

		List<LoanPayment> allPayments = loanPaymentRepo.findByLoanId(loanId);

		double lastAmountDue;
		double remainingPrincipal = policyAmount;

		if (!allPayments.isEmpty()) {
			LoanPayment lastPayment = allPayments.get(allPayments.size() - 1);
			lastAmountDue = Double.parseDouble(lastPayment.getAmountDue());
			if ("Reducing Interest".equalsIgnoreCase(interestType)) {
				remainingPrincipal = Double.parseDouble(lastPayment.getAmountDue());
			}
		} else {
			if ("Flat Interest".equalsIgnoreCase(interestType)) {
				double interest = (policyAmount * roi * term) / (100 * periodDivisor);
				lastAmountDue = policyAmount + interest;
			} else {
				lastAmountDue = policyAmount;
			}
		}

		boolean isLoanClosed = false;

		for (int i = 1; i <= numberOfInstallments; i++) {
			if (lastAmountDue <= 0)
				break;

			double interestThisPeriod = 0;

			if ("Reducing Interest".equalsIgnoreCase(interestType)) {
				interestThisPeriod = (remainingPrincipal * roi) / (100 * periodDivisor);
				remainingPrincipal = remainingPrincipal - (emiAmount - interestThisPeriod);
				if (remainingPrincipal < 0)
					remainingPrincipal = 0;

				lastAmountDue = remainingPrincipal;
			} else {
				lastAmountDue -= emiAmount;
				if (lastAmountDue < 0)
					lastAmountDue = 0;
			}

			LoanPayment payment = new LoanPayment();
			payment.setLoanId(request.getLoanId());
			payment.setLoanPlanName(request.getLoanPlanName());
			payment.setLoanMode(request.getLoanMode());
			payment.setLoanTerm(request.getLoanTerm());
			payment.setTypeOfLoan(request.getTypeOfLoan());
			payment.setRateOfInterest(request.getRateOfInterest());
			payment.setLoanAmount(request.getLoanAmount());
			payment.setInterestType(request.getInterestType());
			payment.setEmiPayment(String.valueOf(emiAmount));
			payment.setLoanDate(loanDate);
			payment.setMemberId(request.getMemberId());
			payment.setMemberName(request.getMemberName());

			// Deductions
			payment.setProcessingFee(request.getProcessingFee());
			payment.setLegalCharges(request.getLegalCharges());
			payment.setGst(request.getGst());
			payment.setInsuranceFee(request.getInsuranceFee());
			payment.setValuationFees(request.getValuationFees());
			payment.setStationaryFee(request.getStationaryFee());

			payment.setPaymentDate(request.getPaymentDate());
			payment.setPaymentMode(request.getPaymentMode());
			if (payment.getPaymentMode() == "Cheque") {
				payment.setPaymentStatus("PENDING");
			} else {
				payment.setPaymentStatus("PAID");
			}
			payment.setAccountNo(request.getAccountNo());
			payment.setRef_UpiId(request.getRef_UpiId());
			payment.setCharges(request.getCharges());
			payment.setRemarks("Installment " + (allPayments.size() + i));
			payment.setChequeDate(request.getChequeDate());
			payment.setChequeNo(request.getChequeNo());
			payment.setNoOfInst("1");
			payment.setAmountDue(String.valueOf(lastAmountDue));

			loanPaymentRepo.save(payment);

			double instCount = allPayments.size() + i;

			if (term == instCount) {
				loanApp.setLoanStatus("CLOSED");
				loanApplicationRepo.save(loanApp);

				LoanClosure closure = new LoanClosure();
				closure.setLoanId(loanApp.getLoanId());
				closure.setLoanPlanName(loanApp.getLoanPlanName());
				closure.setLoanMode(loanApp.getLoanMode());
				closure.setLoanTerm(loanApp.getLoanTerm());
				closure.setRateOfInterest(loanApp.getRateOfInterest());
				closure.setLoanAmount(loanApp.getLoanAmount());
				closure.setInterestType(loanApp.getInterestType());
				closure.setLoanDate(loanApp.getLoanDate());
				closure.setLoanStatus("CLOSED");
				closure.setFinancialConsultantName(loanApp.getFinancialConsultantName());
				closure.setMemberId(loanApp.getMemberId());
				closure.setMemberName(loanApp.getMemberName());
				closure.setBranchName(loanApp.getBranchName());
				closure.setContactNo(loanApp.getContactNo());
				closure.setRelativeDetails(loanApp.getRelativeDetails());
				closure.setTypeOfLoan(loanApp.getTypeOfLoan());
				closure.setEmiPayment(loanApp.getEmiPayment());
				closure.setNoOfInst(payment.getNoOfInst());
				closure.setFinancialConsultantId(loanApp.getFinancialConsultantId());
				closure.setPaymentDate(loanApp.getPaymentDate());
				closure.setPaymentMode(loanApp.getPaymentMode());
				closure.setRemarks("Loan closed after final EMI");
				closure.setCharges(loanApp.getCharges());
				closure.setChequeNo(loanApp.getChequeNo());
				closure.setRef_UpiId(loanApp.getRef_UpiId());

				loanClosurerepo.save(closure);

				isLoanClosed = true;
				break;
			}
		}

		return isLoanClosed;
	}

	// Service for getting loan id's for loan payment statement(Vaibhav)
	public List<String> getStatementLoanId() {
		return loanApplicationRepo.findAll().stream().map(LoanApplication::getLoanId) // adjust class name if needed
				.filter(Objects::nonNull).collect(Collectors.toList());
	}

	// Service for fetching loan details from loan id(Vaibhav)
	public List<LoanPayment> fetchLoanStatement(String loanId) {
		return loanPaymentRepo.findByLoanId(loanId); // Make sure this method exists
	}

	public List<LoanPayment> fetchLoanPaymentsByLoanId(String loanId) {

		return loanPaymentRepo.findByLoanId(loanId);
	}

	public LoanPayment fetchLoanPaymentByLoanIdAndInst(String loanId, String remarks) {
		return loanPaymentRepo.findByLoanIdAndNoOfInst(loanId, remarks);
	}

	// Service for closing the loan (Vaibhav)
	public LoanClosure closeLoan(LoanClosure paymentDetails) {

		// Ensure loanId is present
		if (paymentDetails.getLoanId() == null) {
			throw new RuntimeException("Loan ID is required to update LoanApplication status");
		}

		// Retrieve the loan application from the database
		LoanApplication loan = loanApplicationRepo.findByLoanId(paymentDetails.getLoanId());
		if (loan == null) {
			throw new RuntimeException("Loan not found for loanId: " + paymentDetails.getLoanId());
		}

		// Set memberName from the retrieved loan application
		paymentDetails.setMemberName(loan.getMemberName());
		paymentDetails.setLoanStatus("CLOSED");

		// Save the closure details in the LoanClosure table
		LoanClosure savedClosure = loanClosurerepo.save(paymentDetails);

		// Update the loan status in the LoanApplication table
		loan.setLoanStatus("CLOSED");
		loanApplicationRepo.save(loan);

		return savedClosure;
	}

	// Api for getting closed loan ids
	public List<String> getClosedLoanIds() {
		return loanClosurerepo.findAll().stream().map(LoanClosure::getLoanId).filter(Objects::nonNull).distinct()
				.collect(Collectors.toList());
	}

	//
	public List<LoanClosure> getLoanClosuresByLoanId(String loanId) {
		return loanClosurerepo.findByLoanId(loanId);
	}

	public List<LoanApplication> getNotApprovedLoanCustomer() {
		// TODO Auto-generated method stub
		return loanApplicationRepo.findByApprovalStatusFalse();
	}
}