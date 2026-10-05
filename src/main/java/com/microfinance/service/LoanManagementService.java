package com.microfinance.service;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.microfinance.dto.ApiResponse;
import com.microfinance.dto.RegularLoanStatementResponse;
import com.microfinance.dto.LoanSummaryDto;
import com.microfinance.dto.StatementRowDto;
import com.microfinance.dto.StatementTotalsDto;
import com.microfinance.enums.LoanModeConfig;
import com.microfinance.dto.ForeclosureSettlementDto;
import com.microfinance.model.ActivityLog;
import com.microfinance.repository.ActivityLogRepository;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Locale;
import com.microfinance.model.BranchModule;
import com.microfinance.model.CreateSavingsAccount;
import com.microfinance.model.LoanApplication;
import com.microfinance.model.LoanClosure;
import com.microfinance.model.LoanDeductionDetails;
import com.microfinance.model.LoanPayment;
import com.microfinance.model.LoanSchemCatalog;
import com.microfinance.model.NewLoanApplication;
import com.microfinance.model.addCustomer;
import com.microfinance.repository.AddCustomerRepo;
import com.microfinance.repository.BranchModuleRepo;
import com.microfinance.repository.CreateSavingAccountRepo;
import com.microfinance.repository.FinancialConsultantRepo;
import com.microfinance.repository.LoanApplicationRepo;
import com.microfinance.repository.LoanClosureRepo;
import com.microfinance.repository.LoanDeductionDetailsRepo;
import com.microfinance.repository.LoanMangmentSchemeRepo;
import com.microfinance.repository.LoanPaymentRepo;
import com.microfinance.repository.NewLoanAppicationRepo;

@Service
public class LoanManagementService implements org.springframework.beans.factory.InitializingBean {

	@Autowired
	private javax.sql.DataSource dataSource;

	@Override
	public void afterPropertiesSet() throws Exception {
		if (dataSource != null) {
			try (java.sql.Connection conn = dataSource.getConnection();
				 java.sql.Statement stmt = conn.createStatement()) {
				try {
					stmt.executeUpdate("ALTER TABLE loan_application ADD COLUMN total_interest VARCHAR(255) NULL");
				} catch (Exception ignored) {}
				try {
					stmt.executeUpdate("ALTER TABLE loan_application ADD COLUMN total_payable_amount VARCHAR(255) NULL");
				} catch (Exception ignored) {}
				try {
					stmt.executeUpdate("ALTER TABLE loan_payment ADD COLUMN total_interest VARCHAR(255) NULL");
				} catch (Exception ignored) {}
				try {
					stmt.executeUpdate("ALTER TABLE loan_payment ADD COLUMN total_payable_amount VARCHAR(255) NULL");
				} catch (Exception ignored) {}
			} catch (Exception e) {
				System.err.println("Column initialization note: " + e.getMessage());
			}
		}
	}

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

	@org.springframework.beans.factory.annotation.Value("${loan.deduction.gst-rate:18.0}")
	private double gstRate;

	@Autowired
	private LoanDeductionDetailsRepo loanDeductionDetailsRepo;

	@Autowired
	private FinancialConsultantRepo financialConsultantRepo;

	@Autowired
	private LoanNotificationService loanNotificationService;

	@Autowired
	private com.microfinance.repository.SavingAccountActivityRepo savingAccountActivityRepo;

	@Autowired
	private com.microfinance.repository.ActivityLogRepository activityLogRepository;

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

	public LoanDeductionDetails validateAndCalculateDeductions(
			java.math.BigDecimal loanAmount, com.microfinance.model.LoanDeductionDetails details) {

		if (details == null) {
			details = new com.microfinance.model.LoanDeductionDetails();
		}

		if (loanAmount == null || loanAmount.compareTo(java.math.BigDecimal.ZERO) <= 0) {
			throw new IllegalArgumentException("Loan Amount must be greater than 0 before calculating deductions.");
		}

		java.math.BigDecimal processingFee = details.getProcessingFee() != null
				? details.getProcessingFee().setScale(2, java.math.RoundingMode.HALF_UP)
				: java.math.BigDecimal.ZERO.setScale(2, java.math.RoundingMode.HALF_UP);
		java.math.BigDecimal legalCharges = details.getLegalCharges() != null
				? details.getLegalCharges().setScale(2, java.math.RoundingMode.HALF_UP)
				: java.math.BigDecimal.ZERO.setScale(2, java.math.RoundingMode.HALF_UP);
		java.math.BigDecimal insuranceFee = details.getInsuranceFee() != null
				? details.getInsuranceFee().setScale(2, java.math.RoundingMode.HALF_UP)
				: java.math.BigDecimal.ZERO.setScale(2, java.math.RoundingMode.HALF_UP);
		java.math.BigDecimal valuationFees = details.getValuationFees() != null
				? details.getValuationFees().setScale(2, java.math.RoundingMode.HALF_UP)
				: java.math.BigDecimal.ZERO.setScale(2, java.math.RoundingMode.HALF_UP);
		java.math.BigDecimal stationaryFee = details.getStationaryChargesFee() != null
				? details.getStationaryChargesFee().setScale(2, java.math.RoundingMode.HALF_UP)
				: java.math.BigDecimal.ZERO.setScale(2, java.math.RoundingMode.HALF_UP);

		// a. All fee fields must be >= 0
		if (processingFee.compareTo(java.math.BigDecimal.ZERO) < 0
				|| legalCharges.compareTo(java.math.BigDecimal.ZERO) < 0
				|| insuranceFee.compareTo(java.math.BigDecimal.ZERO) < 0
				|| valuationFees.compareTo(java.math.BigDecimal.ZERO) < 0
				|| stationaryFee.compareTo(java.math.BigDecimal.ZERO) < 0) {
			throw new IllegalArgumentException("Deduction fee values cannot be negative.");
		}

		// c. GST calculated server-side as configurable rate of processing fee if not manually supplied > 0
		java.math.BigDecimal gst = details.getGst();
		if (gst == null || gst.compareTo(java.math.BigDecimal.ZERO) <= 0) {
			gst = processingFee.multiply(java.math.BigDecimal.valueOf(gstRate))
					.divide(java.math.BigDecimal.valueOf(100), 2, java.math.RoundingMode.HALF_UP);
		} else {
			gst = gst.setScale(2, java.math.RoundingMode.HALF_UP);
		}

		if (gst.compareTo(java.math.BigDecimal.ZERO) < 0) {
			throw new IllegalArgumentException("GST amount cannot be negative.");
		}

		// Sum of all deductions
		java.math.BigDecimal totalDeductions = processingFee.add(legalCharges).add(gst).add(insuranceFee)
				.add(valuationFees).add(stationaryFee).setScale(2, java.math.RoundingMode.HALF_UP);

		// b. Sum of all deductions must NOT exceed Loan Amount
		if (totalDeductions.compareTo(loanAmount) > 0) {
			throw new IllegalArgumentException(
					"Total deductions (" + totalDeductions + ") must not exceed the Loan Amount (" + loanAmount + ").");
		}

		// d. Net Disbursement Amount = Loan Amount - Total Deductions
		java.math.BigDecimal netDisbursement = loanAmount.subtract(totalDeductions).setScale(2, java.math.RoundingMode.HALF_UP);

		// Employee validation
		if (details.getEmployeeId() != null && !details.getEmployeeId().trim().isEmpty()) {
			List<com.microfinance.model.addFinancialConsultant> staffList = financialConsultantRepo
					.findByFinancialCode(details.getEmployeeId().trim());
			if (staffList != null && !staffList.isEmpty()) {
				com.microfinance.model.addFinancialConsultant staff = staffList.get(0);
				if (details.getEmployeeName() == null || details.getEmployeeName().trim().isEmpty()) {
					details.setEmployeeName(staff.getFinancialName());
				}
			}
		}

		details.setProcessingFee(processingFee);
		details.setLegalCharges(legalCharges);
		details.setGst(gst);
		details.setInsuranceFee(insuranceFee);
		details.setValuationFees(valuationFees);
		details.setStationaryChargesFee(stationaryFee);
		details.setTotalDeductions(totalDeductions);
		details.setNetDisbursementAmount(netDisbursement);

		return details;
	}

	public boolean saveLoanApplicationData(LoanApplication loanApplication) {
		try {
			if (loanApplication.getLoanId() == null || loanApplication.getLoanId().trim().isEmpty()) {
				long nextId = loanApplicationRepo.getMaxId() + 1;
				loanApplication.setLoanId("LA" + String.format("%05d", nextId));
			}
			loanApplication.syncDynamicFields();
			checkLoanModeRangeOverride(loanApplication);

			// Parse loan amount and deduction details
			java.math.BigDecimal loanAmt = java.math.BigDecimal.ZERO;
			try {
				if (loanApplication.getLoanAmount() != null) {
					loanAmt = new java.math.BigDecimal(loanApplication.getLoanAmount().trim());
				}
			} catch (Exception ignored) {}

			if (loanAmt.compareTo(java.math.BigDecimal.ZERO) > 0) {
				com.microfinance.model.LoanDeductionDetails deduction = loanApplication.getDeductionDetails();
				if (deduction == null) {
					deduction = new com.microfinance.model.LoanDeductionDetails();
				}
				if (deduction.getProcessingFee() == null || deduction.getProcessingFee().compareTo(java.math.BigDecimal.ZERO) == 0) {
					try { if (loanApplication.getProcessingFee() != null) deduction.setProcessingFee(new java.math.BigDecimal(loanApplication.getProcessingFee().trim())); } catch (Exception ignored) {}
				}
				if (deduction.getLegalCharges() == null || deduction.getLegalCharges().compareTo(java.math.BigDecimal.ZERO) == 0) {
					try { if (loanApplication.getLegalCharges() != null) deduction.setLegalCharges(new java.math.BigDecimal(loanApplication.getLegalCharges().trim())); } catch (Exception ignored) {}
				}
				if (deduction.getGst() == null || deduction.getGst().compareTo(java.math.BigDecimal.ZERO) == 0) {
					try { if (loanApplication.getGst() != null) deduction.setGst(new java.math.BigDecimal(loanApplication.getGst().trim())); } catch (Exception ignored) {}
				}
				if (deduction.getInsuranceFee() == null || deduction.getInsuranceFee().compareTo(java.math.BigDecimal.ZERO) == 0) {
					try { if (loanApplication.getInsuranceFee() != null) deduction.setInsuranceFee(new java.math.BigDecimal(loanApplication.getInsuranceFee().trim())); } catch (Exception ignored) {}
				}
				if (deduction.getValuationFees() == null || deduction.getValuationFees().compareTo(java.math.BigDecimal.ZERO) == 0) {
					try { if (loanApplication.getValuationFees() != null) deduction.setValuationFees(new java.math.BigDecimal(loanApplication.getValuationFees().trim())); } catch (Exception ignored) {}
				}
				if (deduction.getStationaryChargesFee() == null || deduction.getStationaryChargesFee().compareTo(java.math.BigDecimal.ZERO) == 0) {
					try { if (loanApplication.getStationaryFee() != null) deduction.setStationaryChargesFee(new java.math.BigDecimal(loanApplication.getStationaryFee().trim())); } catch (Exception ignored) {}
				}
				if (deduction.getEmployeeId() == null || deduction.getEmployeeId().trim().isEmpty()) {
					deduction.setEmployeeId(loanApplication.getFinancialConsultantId());
				}
				if (deduction.getEmployeeName() == null || deduction.getEmployeeName().trim().isEmpty()) {
					deduction.setEmployeeName(loanApplication.getFinancialConsultantName());
				}

				validateAndCalculateDeductions(loanAmt, deduction);

				loanApplication.setProcessingFee(deduction.getProcessingFee().toPlainString());
				loanApplication.setLegalCharges(deduction.getLegalCharges().toPlainString());
				loanApplication.setGst(deduction.getGst().toPlainString());
				loanApplication.setInsuranceFee(deduction.getInsuranceFee().toPlainString());
				loanApplication.setValuationFees(deduction.getValuationFees().toPlainString());
				loanApplication.setStationaryFee(deduction.getStationaryChargesFee().toPlainString());
				loanApplication.setNetDisbursementAmount(deduction.getNetDisbursementAmount().toPlainString());
				loanApplication.setDeductionDetails(deduction);
			}

			if (loanApplication.getPaymentStatus() == null || loanApplication.getPaymentStatus().trim().isEmpty()) {
				loanApplication.setPaymentStatus("UNPAID");
			}

			LoanApplication savedApp = loanApplicationRepo.save(loanApplication);
			if (savedApp.getDeductionDetails() != null) {
				savedApp.getDeductionDetails().setLoanApplication(savedApp);
				loanDeductionDetailsRepo.save(savedApp.getDeductionDetails());
			}
			loanNotificationService.sendLoanApplicationNotification(savedApp);
			return true; // Saved successfully
		} catch (Exception e) {
			e.printStackTrace();
			if (e instanceof IllegalArgumentException) {
				throw (IllegalArgumentException) e;
			}
			return false; // Something went wrong
		}
	}

	public LoanApplication saveLoanApplication(LoanApplication loanApplication) {
		if (loanApplication.getLoanId() == null || loanApplication.getLoanId().trim().isEmpty()) {
			long nextId = loanApplicationRepo.getMaxId() + 1;
			loanApplication.setLoanId("LA" + String.format("%05d", nextId));
		}
		loanApplication.syncDynamicFields();
		checkLoanModeRangeOverride(loanApplication);
		LoanApplication saved = loanApplicationRepo.save(loanApplication);
		loanNotificationService.sendLoanApplicationNotification(saved);
		return saved;
	}

	private void checkLoanModeRangeOverride(LoanApplication loanApplication) {
		if (loanApplication == null || loanApplication.getLoanMode() == null) return;
		LoanModeConfig modeConfig = LoanModeConfig.fromMode(loanApplication.getLoanMode());
		if (modeConfig != null) {
			boolean termOverride = false;
			boolean rateOverride = false;
			int termVal = 0;
			double rateVal = 0.0;

			try {
				if (loanApplication.getLoanTerm() != null && !loanApplication.getLoanTerm().trim().isEmpty()) {
					termVal = Integer.parseInt(loanApplication.getLoanTerm().trim());
					if (!modeConfig.isTermInRange(termVal)) {
						termOverride = true;
					}
				}
			} catch (Exception ignored) {}

			try {
				if (loanApplication.getRateOfInterest() != null && !loanApplication.getRateOfInterest().trim().isEmpty()) {
					rateVal = Double.parseDouble(loanApplication.getRateOfInterest().trim());
					if (!modeConfig.isRateInRange(rateVal)) {
						rateOverride = true;
					}
				}
			} catch (Exception ignored) {}

			if (termOverride || rateOverride) {
				loanApplication.setIsRangeOverride(true);
				if (loanApplication.getRangeOverrideReason() == null || loanApplication.getRangeOverrideReason().trim().isEmpty()) {
					StringBuilder reason = new StringBuilder();
					if (termOverride) {
						reason.append("Term (").append(termVal).append(" ").append(modeConfig.getTermUnit())
							  .append(") outside typical range [").append(modeConfig.getMinTerm()).append("-").append(modeConfig.getMaxTerm()).append("]. ");
					}
					if (rateOverride) {
						reason.append("Rate (").append(rateVal).append("%) outside typical range [")
							  .append(modeConfig.getMinInterestRate()).append("%-").append(modeConfig.getMaxInterestRate()).append("%].");
					}
					loanApplication.setRangeOverrideReason(reason.toString().trim());
				}
			}
		}
	}

	// ── Penalty Calculation ──────────────────────────────────────────────────

	/**
	 * Calculates penalty for a late EMI payment based on the installment's own due date.
	 *
	 * Rule:
	 *   emiDueDate  = loanDate + (installmentNo × periodDays)
	 *   deadline    = emiDueDate + graceDays  (grace from scheme, default 5 days)
	 *   daysLate    = max(0, paymentDate − deadline)
	 *   penaltyAmt  = Flat | Percentage-of-EMI | PerDay
	 *
	 * @param loanDate        ISO disbursement date (yyyy-MM-dd)
	 * @param installmentNo   1-based EMI number (1 = first EMI, 2 = second, ...)
	 * @param loanMode        Daily / Weekly / Fortnightly / Monthly / Quarterly
	 * @param paymentDateStr  Actual payment date (yyyy-MM-dd)
	 * @param emiAmount       EMI amount in ₹
	 * @param scheme          LoanSchemCatalog with penalty settings
	 * @return double[2] { penaltyAmount, daysLate }
	 */
	private double[] calculatePenalty(String loanDate, int installmentNo,
			String loanMode, String paymentDateStr,
			double emiAmount, LoanSchemCatalog scheme) {

		double penaltyAmt = 0.0;
		int daysLate = 0;

		try {
			if (loanDate == null || paymentDateStr == null) return new double[]{0, 0};

			// --- Grace period from scheme, default 5 days ---
			int graceDays = 5;
			if (scheme != null) {
				try {
					String ld = scheme.getLateAllowanceday();
					if (ld != null && !ld.trim().isEmpty()) graceDays = Integer.parseInt(ld.trim());
				} catch (Exception ignored) {}
			}

			// --- Period per installment in days ---
			int periodDays;
			switch (loanMode == null ? "" : loanMode) {
				case "Daily":       periodDays = 1;  break;
				case "Weekly":      periodDays = 7;  break;
				case "Fortnightly": periodDays = 14; break;
				case "Quarterly":   periodDays = 91; break;
				default:            periodDays = 30; break; // Monthly
			}

			// --- EMI due date = disbursement date + installmentNo × period ---
			java.time.LocalDate disbDate  = java.time.LocalDate.parse(loanDate.trim());
			java.time.LocalDate emiDue    = disbDate.plusDays((long) installmentNo * periodDays);
			java.time.LocalDate deadline  = emiDue.plusDays(graceDays);
			java.time.LocalDate payDate   = java.time.LocalDate.parse(paymentDateStr.trim());

			// --- Days late: positive only if past deadline ---
			long rawLate = java.time.temporal.ChronoUnit.DAYS.between(deadline, payDate);
			daysLate = (int) Math.max(0, rawLate);

			if (daysLate <= 0) return new double[]{0, 0};

			// --- Penalty rate from scheme (default 2% of EMI if not configured) ---
			double rate = 2.0;
			String mode = "Percentage";
			if (scheme != null) {
				if (scheme.getModePanalty() != null && !scheme.getModePanalty().trim().isEmpty()) {
					mode = scheme.getModePanalty().trim();
				}
				if (scheme.getPennaltyMonthly() != null && !scheme.getPennaltyMonthly().trim().isEmpty()) {
					try {
						rate = Double.parseDouble(scheme.getPennaltyMonthly().trim());
					} catch (Exception ignored) {}
				}
			}

			if (rate <= 0) return new double[]{0, daysLate};

			switch (mode) {
				case "Flat":
					penaltyAmt = rate; // Fixed rupee amount
					break;
				case "Percentage":
					penaltyAmt = (rate / 100.0) * emiAmount; // % of EMI
					break;
				case "PerDay":
					penaltyAmt = (rate / 100.0) * emiAmount * daysLate; // % of EMI per day
					break;
				default:
					penaltyAmt = (rate / 100.0) * emiAmount;
			}

			penaltyAmt = Math.round(penaltyAmt * 100.0) / 100.0;

		} catch (Exception e) {
			System.err.println("Penalty calculation error: " + e.getMessage());
		}

		return new double[]{penaltyAmt, daysLate};
	}

	private double[] calculatePenalty(String loanDate, String paymentDateStr,
			double emiAmount, LoanSchemCatalog scheme) {
		return calculatePenalty(loanDate, 1, "Monthly", paymentDateStr, emiAmount, scheme);
	}

	/**
	 * Preview API — returns penalty details for a given loanId + payment date
	 * without saving anything. Uses the NEXT installment's due date.
	 *
	 * emiDueDate = loanDate + (nextInstNo × periodDays)
	 * deadline   = emiDueDate + graceDays
	 * daysLate   = max(0, paymentDate − deadline)
	 */
	public java.util.Map<String, Object> calculatePenaltyPreview(String loanId, String paymentDateStr) {
		java.util.Map<String, Object> result = new java.util.LinkedHashMap<>();
		result.put("penaltyAmount", "0.00");
		result.put("daysLate", 0);
		result.put("penaltyMode", "-");
		result.put("dueDate", "-");
		result.put("emiDueDate", "-");
		result.put("deadline", "-");
		result.put("emiAmount", "0.00");
		result.put("totalPayable", "0.00");

		try {
			LoanApplication loanApp = loanApplicationRepo.findFirstByLoanIdOrderByIdDesc(loanId);
			if (loanApp == null) return result;

			double emiAmount = 0.0;
			try { emiAmount = Double.parseDouble(loanApp.getEmiPayment()); } catch (Exception ignored) {}

			// Next installment number = paid count + 1
			int nextInstNo = loanPaymentRepo.findByLoanId(loanId).size() + 1;

			LoanSchemCatalog scheme = loanRepository.findByLoanPlaneName(loanApp.getLoanPlanName()).orElse(null);

			// Grace days
			int graceDays = 5;
			if (scheme != null) {
				try {
					String ld = scheme.getLateAllowanceday();
					if (ld != null && !ld.trim().isEmpty()) graceDays = Integer.parseInt(ld.trim());
				} catch (Exception ignored) {}
			}

			// Period per installment
			int periodDays;
			switch (loanApp.getLoanMode() == null ? "" : loanApp.getLoanMode()) {
				case "Daily":       periodDays = 1;  break;
				case "Weekly":      periodDays = 7;  break;
				case "Fortnightly": periodDays = 14; break;
				case "Quarterly":   periodDays = 91; break;
				default:            periodDays = 30; break;
			}

			// EMI due date and deadline
			try {
				java.time.LocalDate emiDue   = java.time.LocalDate.parse(loanApp.getLoanDate().trim()).plusDays((long) nextInstNo * periodDays);
				java.time.LocalDate deadline = emiDue.plusDays(graceDays);
				result.put("emiDueDate", emiDue.toString());
				result.put("dueDate", emiDue.toString());
				result.put("deadline", deadline.toString() + " (" + graceDays + "d grace)");
			} catch (Exception ignored) {}

			result.put("emiAmount", String.format(java.util.Locale.US, "%.2f", emiAmount));

			// Run penalty
			double[] penaltyResult = calculatePenalty(
					loanApp.getLoanDate(), nextInstNo,
					loanApp.getLoanMode(), paymentDateStr,
					emiAmount, scheme);

			double penaltyAmt = penaltyResult[0];
			int daysLate      = (int) penaltyResult[1];
			String mode       = (scheme != null && scheme.getModePanalty() != null && !scheme.getModePanalty().trim().isEmpty())
					? scheme.getModePanalty().trim() : "Percentage (2%)";

			result.put("penaltyAmount", String.format(java.util.Locale.US, "%.2f", penaltyAmt));
			result.put("daysLate",      daysLate);
			result.put("penaltyMode",   mode);
			result.put("totalPayable",  String.format(java.util.Locale.US, "%.2f", emiAmount + penaltyAmt));

		} catch (Exception e) {
			System.err.println("calculatePenaltyPreview error: " + e.getMessage());
		}
		return result;
	}

	public List<addCustomer> getLoanApplicationById(String memberCode) {
		return addCustomerRepo.findByMemberCode(memberCode);
	}

	// Service for fetching Active Loan Id's In the dropdown (Vaibhav)
	public List<String> fetchAllLoanIds() {
		return loanApplicationRepo.findActiveLoanIds();
	}

	// Service for fetching the data in the textfields (Vaibhav)
	public LoanApplication getLoanById(String loanId) {
		return loanApplicationRepo.findFirstByLoanIdOrderByIdDesc(loanId);
	}

	// Service for approving the loan application (Vaibhav)
	public String updateApproval(LoanApplication approval) {
		LoanApplication loan = loanApplicationRepo.findFirstByLoanIdOrderByIdDesc(approval.getLoanId());

		if (loan != null) {
			if (loan.isApprovalStatus()) {
				return "already_approved";
			}

			double loanAmount = 0.0;
			try {
				loanAmount = Double.parseDouble(loan.getLoanAmount());
			} catch (Exception ignored) {
			}
			double processingFee = 0.0;
			try {
				processingFee = Double.parseDouble(loan.getProcessingFee());
			} catch (Exception ignored) {
			}
			double gst = 0.0;
			try {
				gst = Double.parseDouble(loan.getGst());
			} catch (Exception ignored) {
			}
			double legalCharge = 0.0;
			try {
				legalCharge = Double.parseDouble(loan.getLegalCharges());
			} catch (Exception ignored) {
			}
			double extraCharges = processingFee + gst + legalCharge;
			double sanctionedAmount = loanAmount - extraCharges;

			loan.setSanctionedAmount(String.format(java.util.Locale.US, "%.2f", sanctionedAmount));
			loan.setApprovalStatus(approval.isApprovalStatus());
			loan.setApprovalDate(approval.getApprovalDate());
			LoanApplication savedLoan = loanApplicationRepo.save(loan);
			if (approval.isApprovalStatus()) {
				loanNotificationService.sendLoanApprovalNotification(savedLoan);
			}
			return "success";
		} else {
			return "not_found";
		}
	}

	// Service for getting Approved & Active loan Ids( Vaibhav)
	public List<String> getApprovedLoanIds() {
		return loanApplicationRepo.findApprovedActiveLoanIds();
	}

	// Service for paying the payment
	@Autowired
	private CreateSavingAccountRepo savingAccountRepo; // Add repo for savings account

	public boolean processEmiPayment(LoanPayment request, String noOfInst) {
		String loanId = request.getLoanId();

		LoanApplication loanApp = loanApplicationRepo.findFirstByLoanIdOrderByIdDesc(loanId);
		if (loanApp == null) {
			throw new RuntimeException("Loan ID not found");
		}

		String mode = request.getPaymentMode() != null ? request.getPaymentMode().trim() : "Cash";

		// ✅ Compute netDisbursementAmount (gross loan amount minus deductions)
		double netDisbursedAmt = 0.0;
		if (loanApp.getNetDisbursementAmount() != null && !loanApp.getNetDisbursementAmount().trim().isEmpty()) {
			try {
				netDisbursedAmt = Double.parseDouble(loanApp.getNetDisbursementAmount().trim());
			} catch (Exception ignored) {}
		}
		if (netDisbursedAmt <= 0 && loanApp.getDeductionDetails() != null && loanApp.getDeductionDetails().getNetDisbursementAmount() != null) {
			netDisbursedAmt = loanApp.getDeductionDetails().getNetDisbursementAmount().doubleValue();
		}
		if (netDisbursedAmt <= 0 && loanApp.getId() > 0 && loanDeductionDetailsRepo != null) {
			try {
				com.microfinance.model.LoanDeductionDetails ded = loanDeductionDetailsRepo.findByLoanApplicationId(loanApp.getId()).orElse(null);
				if (ded != null && ded.getNetDisbursementAmount() != null) {
					netDisbursedAmt = ded.getNetDisbursementAmount().doubleValue();
				}
			} catch (Exception ignored) {}
		}
		if (netDisbursedAmt <= 0) {
			double gross = 0.0;
			try { gross = Double.parseDouble(loanApp.getLoanAmount()); } catch (Exception ignored) {}
			double totalDed = 0.0;
			try { totalDed += Double.parseDouble(request.getProcessingFee() != null ? request.getProcessingFee() : loanApp.getProcessingFee()); } catch (Exception ignored) {}
			try { totalDed += Double.parseDouble(request.getLegalCharges() != null ? request.getLegalCharges() : loanApp.getLegalCharges()); } catch (Exception ignored) {}
			try { totalDed += Double.parseDouble(request.getGst() != null ? request.getGst() : loanApp.getGst()); } catch (Exception ignored) {}
			try { totalDed += Double.parseDouble(request.getInsuranceFee() != null ? request.getInsuranceFee() : loanApp.getInsuranceFee()); } catch (Exception ignored) {}
			try { totalDed += Double.parseDouble(request.getValuationFees() != null ? request.getValuationFees() : loanApp.getValuationFees()); } catch (Exception ignored) {}
			try { totalDed += Double.parseDouble(request.getStationaryFee() != null ? request.getStationaryFee() : loanApp.getStationaryFee()); } catch (Exception ignored) {}
			netDisbursedAmt = (totalDed > 0 && gross > totalDed) ? (gross - totalDed) : gross;
		}

		// ✅ Mode of disbursement: Cash or Saving Account
		// If Saving Account -> Transfer net disbursement amount to customer savings account
		if ("Saving Account".equalsIgnoreCase(mode) || "Savings Account".equalsIgnoreCase(mode)) {
			List<CreateSavingsAccount> accounts = createSavingRepo.findBySelectByCustomer(request.getMemberId());
			if (accounts == null || accounts.isEmpty()) {
				accounts = createSavingRepo.findBySelectByCustomerIgnoreCase(request.getMemberId());
			}

			if (accounts == null || accounts.isEmpty()) {
				throw new RuntimeException("Saving account not found for Member ID: " + request.getMemberId()
						+ ". Cannot transfer loan disbursement to Saving Account.");
			}

			CreateSavingsAccount savingAcc = accounts.get(0);

			double currentBalance = 0.0;
			try {
				currentBalance = Double.parseDouble(savingAcc.getBalance());
			} catch (Exception e) {
				currentBalance = 0.0;
			}

			double updatedBalance = currentBalance + netDisbursedAmt;
			savingAcc.setBalance(String.format(java.util.Locale.US, "%.2f", updatedBalance));
			savingAccountRepo.save(savingAcc);

			// Proactively record Loan Disbursement activity (idempotent - avoid duplicate)
			try {
				String txnId = "TXNLOAN_" + loanId;
				List<com.microfinance.model.SavingAccountActivity> existingActs = savingAccountActivityRepo.findAllByAccountNumber(savingAcc.getAccountNumber());
				boolean alreadyExists = false;
				if (existingActs != null) {
					for (com.microfinance.model.SavingAccountActivity ea : existingActs) {
						String comm = ea.getComments() != null ? ea.getComments() : "";
						String tid = ea.getSelectSavingTransactionId() != null ? ea.getSelectSavingTransactionId() : "";
						if (tid.equals(txnId) || comm.contains(loanId) || tid.contains(loanId)) {
							alreadyExists = true;
							ea.setTransactionAmount(String.format(java.util.Locale.US, "%.2f", netDisbursedAmt));
							savingAccountActivityRepo.save(ea);
							break;
						}
					}
				}

				if (!alreadyExists) {
					com.microfinance.model.SavingAccountActivity loanAct = new com.microfinance.model.SavingAccountActivity();
					loanAct.setSelectSavingTransactionId(txnId);
					loanAct.setTransactionDate(request.getPaymentDate() != null && !request.getPaymentDate().trim().isEmpty() ? request.getPaymentDate() : java.time.LocalDate.now().toString());
					loanAct.setSelectBranchName(loanApp.getBranchName() != null ? loanApp.getBranchName() : (savingAcc.getBranchName() != null ? savingAcc.getBranchName().getBranchName() : ""));
					loanAct.setAccountNumber(savingAcc.getAccountNumber());
					loanAct.setCustomerCode(savingAcc.getSelectByCustomer());
					loanAct.setCustomerName(savingAcc.getEnterCustomerName());
					loanAct.setContactNumber(savingAcc.getContactNumber());
					loanAct.setTransactionFor("Loan Disbursement");
					String desc = "Loan Disbursed Credited - Loan ID: " + loanId;
					if (loanApp.getTypeOfLoan() != null && !loanApp.getTypeOfLoan().trim().isEmpty()) {
						desc += " (" + loanApp.getTypeOfLoan().trim() + ")";
					}
					loanAct.setComments(desc);
					loanAct.setTransactionType("Deposit");
					loanAct.setTransactionAmount(String.format(java.util.Locale.US, "%.2f", netDisbursedAmt));
					loanAct.setAverageBalance(String.format(java.util.Locale.US, "%.2f", updatedBalance));
					loanAct.setPayBy("Loan Transfer");
					loanAct.setApproved(true);
					savingAccountActivityRepo.save(loanAct);
					System.out.println("✅ Recorded loan disbursement activity of " + netDisbursedAmt + " for " + savingAcc.getAccountNumber());
				}
			} catch (Exception actEx) {
				System.err.println("Failed to record loan disbursement activity: " + actEx.getMessage());
			}

			if (request.getAccountNo() == null || request.getAccountNo().trim().isEmpty()) {
				request.setAccountNo(savingAcc.getAccountNumber());
			}
		}

		// ✅ Continue existing loan payment / disbursement tracking logic
		String loanDate = loanApp.getLoanDate();
		double policyAmount = Double.parseDouble(loanApp.getLoanAmount()); // Principal
		double roi = Double.parseDouble(loanApp.getRateOfInterest()); // Annual ROI
		double term = Double.parseDouble(loanApp.getLoanTerm());
		String frequency = loanApp.getLoanMode();
		String interestType = loanApp.getInterestType(); // "Flat" or "Reducing"

		double emiAmount = 0.0;
		try {
			emiAmount = Double.parseDouble(loanApp.getEmiPayment());
		} catch (Exception e) {
			emiAmount = 0.0;
		}

		int numberOfInstallments = 1;
		try {
			if (noOfInst != null && !noOfInst.trim().isEmpty()) {
				numberOfInstallments = Integer.parseInt(noOfInst.trim());
			}
		} catch (Exception e) {
			numberOfInstallments = 1;
		}

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
		boolean isFlat = interestType != null && interestType.toLowerCase().contains("flat");
		boolean isReducing = interestType != null && interestType.toLowerCase().contains("reduc");
		boolean isRule78 = interestType != null && (interestType.toLowerCase().contains("78") || interestType.toLowerCase().contains("rule"));

		if (!allPayments.isEmpty()) {
			LoanPayment lastPayment = allPayments.get(allPayments.size() - 1);
			lastAmountDue = Double.parseDouble(lastPayment.getAmountDue());
			if (isReducing) {
				remainingPrincipal = Double.parseDouble(lastPayment.getAmountDue());
			}
		} else {
			if (isFlat) {
				double interest = (policyAmount * roi * term) / (100 * periodDivisor);
				lastAmountDue = policyAmount + interest;
			} else if (isRule78) {
				double totalInterest = (policyAmount * (roi / periodDivisor / 100.0) * term);
				lastAmountDue = policyAmount + totalInterest;
			} else {
				lastAmountDue = policyAmount;
			}
		}

		boolean isLoanClosed = false;

		for (int i = 1; i <= numberOfInstallments; i++) {
			if (lastAmountDue <= 0)
				break;

			double interestThisPeriod = 0;

			if (isReducing) {
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
			payment.setNetDisbursementAmount(String.format(java.util.Locale.US, "%.2f", netDisbursedAmt));

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
			payment.setRemarks("Loan Disbursement");
			payment.setChequeDate(request.getChequeDate());
			payment.setChequeNo(request.getChequeNo());
			payment.setNoOfInst("0");
			payment.setAmountDue(loanApp.getLoanAmount());

			// ── Penalty calculation ────────────────────────────────────────────
			try {
				LoanSchemCatalog scheme = loanRepository.findByLoanPlaneName(loanApp.getLoanPlanName()).orElse(null);
				int currentInstNo = allPayments.size() + i;
				double[] penResult = calculatePenalty(
						loanDate, currentInstNo,
						loanApp.getLoanMode(), request.getPaymentDate(),
						emiAmount, scheme);
				payment.setPenaltyAmount(String.format(java.util.Locale.US, "%.2f", penResult[0]));
				payment.setDaysLate(String.valueOf((int) penResult[1]));
				payment.setPenaltyMode((scheme != null && scheme.getModePanalty() != null && !scheme.getModePanalty().trim().isEmpty())
						? scheme.getModePanalty().trim() : "Percentage (2%)");

				// Store the EMI due date
				try {
					int periodDays;
					switch (loanApp.getLoanMode() == null ? "" : loanApp.getLoanMode()) {
						case "Daily":       periodDays = 1;  break;
						case "Weekly":      periodDays = 7;  break;
						case "Fortnightly": periodDays = 14; break;
						case "Quarterly":   periodDays = 91; break;
						default:            periodDays = 30; break;
					}
					java.time.LocalDate emiDue = java.time.LocalDate.parse(loanDate.trim()).plusDays((long) currentInstNo * periodDays);
					payment.setDueDate(emiDue.toString());
				} catch (Exception ignored) {}
			} catch (Exception penEx) {
				System.err.println("Penalty wiring error: " + penEx.getMessage());
			}

			loanPaymentRepo.save(payment);
			loanApp.setPaymentStatus("PAID");
			loanApplicationRepo.save(loanApp);
			loanNotificationService.sendLoanDisbursementNotification(loanApp, payment);

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

	public RegularLoanStatementResponse getRegularLoanStatement(String loanCode) {
		if (loanCode == null || loanCode.trim().isEmpty()) {
			throw new RuntimeException("Loan code cannot be empty");
		}
		loanCode = loanCode.trim();

		LoanApplication loanApp = loanApplicationRepo.findFirstByLoanIdOrderByIdDesc(loanCode);
		if (loanApp == null) {
			throw new RuntimeException("No loan found for code " + loanCode);
		}

		String customerName = loanApp.getMemberName() != null ? loanApp.getMemberName() : "";

		double principal = 0.0;
		if (loanApp.getLoanAmount() != null) {
			try {
				principal = Double.parseDouble(loanApp.getLoanAmount().replaceAll("[^0-9.]", "").trim());
			} catch (Exception ignored) {}
		}

		double roi = 0.0;
		if (loanApp.getRateOfInterest() != null) {
			try {
				roi = Double.parseDouble(loanApp.getRateOfInterest().replaceAll("[^0-9.]", "").trim());
			} catch (Exception ignored) {}
		}

		int tenure = 12;
		if (loanApp.getLoanTerm() != null) {
			try {
				tenure = Integer.parseInt(loanApp.getLoanTerm().replaceAll("[^0-9]", "").trim());
			} catch (Exception ignored) {}
		}
		if (tenure <= 0) tenure = 12;

		double emi = 0.0;
		if (loanApp.getEmiPayment() != null) {
			try {
				emi = Double.parseDouble(loanApp.getEmiPayment().replaceAll("[^0-9.]", "").trim());
			} catch (Exception ignored) {}
		}

		String loanDateStr = loanApp.getLoanDate();
		LocalDate startDate;
		try {
			if (loanDateStr != null && !loanDateStr.trim().isEmpty()) {
				String rawDate = loanDateStr.trim();
				if (rawDate.length() >= 10) {
					startDate = LocalDate.parse(rawDate.substring(0, 10));
				} else {
					startDate = LocalDate.now();
				}
			} else {
				startDate = LocalDate.now();
			}
		} catch (Exception e) {
			startDate = LocalDate.now();
		}

		String mode = loanApp.getLoanMode() != null ? loanApp.getLoanMode().trim().toLowerCase() : "monthly";
		int periodsPerYear = 12;
		if (mode.contains("daily")) periodsPerYear = 365;
		else if (mode.contains("week")) periodsPerYear = 52;
		else if (mode.contains("month")) periodsPerYear = 12;
		else if (mode.contains("quarter")) periodsPerYear = 4;
		else if (mode.contains("half") || mode.contains("semi")) periodsPerYear = 2;
		else if (mode.contains("year") || mode.contains("annual")) periodsPerYear = 1;

		String interestType = loanApp.getInterestType() != null ? loanApp.getInterestType().trim().toLowerCase() : "flat";
		boolean isFlat = interestType.contains("flat");

		// If EMI was not recorded or is 0, compute standard EMI
		if (emi <= 0 && principal > 0) {
			if (isFlat) {
				double totalInterest = principal * (roi / 100.0) * (tenure / (double) periodsPerYear);
				emi = (principal + totalInterest) / tenure;
			} else {
				double r = (roi / 100.0) / periodsPerYear;
				if (r > 0) {
					double factor = Math.pow(1 + r, tenure);
					emi = (principal * r * factor) / (factor - 1);
				} else {
					emi = principal / tenure;
				}
			}
		}

		// Retrieve all recorded payments for this loan
		List<LoanPayment> existingPayments = loanPaymentRepo.findByLoanId(loanCode);
		Map<Integer, LoanPayment> paymentByInst = new HashMap<>();
		if (existingPayments != null) {
			int seq = 1;
			for (LoanPayment p : existingPayments) {
				Integer instNum = null;
				if (p.getNoOfInst() != null) {
					String digits = p.getNoOfInst().replaceAll("[^0-9]", "");
					if (!digits.isEmpty()) {
						try { instNum = Integer.parseInt(digits); } catch (Exception ignored) {}
					}
				}
				if (instNum == null && p.getRemarks() != null) {
					String digits = p.getRemarks().replaceAll("[^0-9]", "");
					if (!digits.isEmpty()) {
						try { instNum = Integer.parseInt(digits); } catch (Exception ignored) {}
					}
				}
				if (instNum == null) {
					instNum = seq;
				}
				if (!paymentByInst.containsKey(instNum)) {
					paymentByInst.put(instNum, p);
				}
				seq++;
			}
		}

		List<StatementRowDto> statementRows = new ArrayList<>();
		double currentPrincipal = principal;
		double periodicRate = (roi / 100.0) / periodsPerYear;
		double flatInterestPerPeriod = (principal * (roi / 100.0)) / periodsPerYear;

		double totalPaid = 0.0;
		double totalInterestPaid = 0.0;
		double totalPenaltyPaid = 0.0;
		LocalDate today = LocalDate.now();

		double lastPaidBalance = principal;
		boolean hasPaidInstallments = false;

		for (int i = 1; i <= tenure; i++) {
			LocalDate dueDate;
			if (mode.contains("daily")) dueDate = startDate.plusDays(i);
			else if (mode.contains("week")) dueDate = startDate.plusWeeks(i);
			else if (mode.contains("quarter")) dueDate = startDate.plusMonths(i * 3L);
			else if (mode.contains("half") || mode.contains("semi")) dueDate = startDate.plusMonths(i * 6L);
			else if (mode.contains("year") || mode.contains("annual")) dueDate = startDate.plusYears(i);
			else dueDate = startDate.plusMonths(i);

			double interestComp;
			double principalComp;
			double rowEmi = emi;

			if (isFlat) {
				interestComp = Math.round(flatInterestPerPeriod * 100.0) / 100.0;
				principalComp = Math.round((rowEmi - interestComp) * 100.0) / 100.0;
			} else {
				interestComp = Math.round((currentPrincipal * periodicRate) * 100.0) / 100.0;
				principalComp = Math.round((rowEmi - interestComp) * 100.0) / 100.0;
			}

			if (i == tenure || principalComp > currentPrincipal) {
				principalComp = currentPrincipal;
				rowEmi = principalComp + interestComp;
			}

			currentPrincipal = Math.max(0.0, Math.round((currentPrincipal - principalComp) * 100.0) / 100.0);
			double runningBal = currentPrincipal;

			LoanPayment payment = paymentByInst.get(i);
			String status;
			String paidDate = null;
			double penalty = 0.0;

			if (payment != null && ("PAID".equalsIgnoreCase(payment.getPaymentStatus()) || "SUCCESS".equalsIgnoreCase(payment.getPaymentStatus()) || payment.getPaymentDate() != null)) {
				status = "PAID";
				paidDate = payment.getPaymentDate();
				if (payment.getPenaltyAmount() != null) {
					try {
						penalty = Double.parseDouble(payment.getPenaltyAmount().replaceAll("[^0-9.]", "").trim());
					} catch (Exception ignored) {}
				}
				if (payment.getEmiPayment() != null) {
					try {
						rowEmi = Double.parseDouble(payment.getEmiPayment().replaceAll("[^0-9.]", "").trim());
					} catch (Exception ignored) {}
				}

				totalPaid += rowEmi;
				totalInterestPaid += interestComp;
				totalPenaltyPaid += penalty;
				lastPaidBalance = runningBal;
				hasPaidInstallments = true;
			} else {
				if (today.isAfter(dueDate)) {
					status = "OVERDUE";
				} else {
					status = "PENDING";
				}
			}

			StatementRowDto row = new StatementRowDto(
				i,
				dueDate.toString(),
				Math.round(rowEmi * 100.0) / 100.0,
				Math.round(principalComp * 100.0) / 100.0,
				Math.round(interestComp * 100.0) / 100.0,
				Math.round(penalty * 100.0) / 100.0,
				paidDate,
				status,
				Math.round(runningBal * 100.0) / 100.0
			);
			statementRows.add(row);
		}

		double currentOutstanding = hasPaidInstallments ? lastPaidBalance : principal;
		currentOutstanding = Math.round(currentOutstanding * 100.0) / 100.0;

		LoanSummaryDto summary = new LoanSummaryDto(
			loanCode,
			customerName,
			Math.round(principal * 100.0) / 100.0,
			Math.round(roi * 100.0) / 100.0,
			tenure,
			Math.round(emi * 100.0) / 100.0,
			currentOutstanding,
			startDate.toString()
		);

		StatementTotalsDto totals = new StatementTotalsDto(
			Math.round(totalPaid * 100.0) / 100.0,
			Math.round(totalInterestPaid * 100.0) / 100.0,
			Math.round(totalPenaltyPaid * 100.0) / 100.0,
			currentOutstanding
		);

		return new RegularLoanStatementResponse(summary, statementRows, totals);
	}

	// Service for fetching loan details from loan id(Vaibhav)
	public List<LoanPayment> fetchLoanStatement(String loanId) {
		return loanPaymentRepo.findByLoanId(loanId); // Make sure this method exists
	}

	public List<LoanPayment> fetchLoanPaymentsByLoanId(String loanId) {

		return loanPaymentRepo.findByLoanId(loanId);
	}

	public LoanPayment fetchLoanPaymentByLoanIdAndInst(String loanId, String remarks) {
		LoanPayment payment = loanPaymentRepo.findByLoanIdAndNoOfInst(loanId, remarks);
		if (payment == null) {
			List<LoanPayment> payments = loanPaymentRepo.findByLoanId(loanId);
			if (payments != null) {
				for (LoanPayment p : payments) {
					if ((p.getRemarks() != null && p.getRemarks().equalsIgnoreCase(remarks))
							|| (p.getNoOfInst() != null && p.getNoOfInst().equalsIgnoreCase(remarks))
							|| String.valueOf(p.getId()).equals(remarks)) {
						return p;
					}
				}
			}
		}
		return payment;
	}

	// Foreclosure settlement calculation (Server-Side)
	public ForeclosureSettlementDto calculateForeclosureSettlement(String loanId) {
		if (loanId == null || loanId.trim().isEmpty()) {
			throw new IllegalArgumentException("Loan ID must not be empty.");
		}

		LoanApplication loan = loanApplicationRepo.findFirstByLoanIdOrderByIdDesc(loanId.trim());
		if (loan == null) {
			throw new RuntimeException("Loan application not found for Loan ID: " + loanId);
		}

		ForeclosureSettlementDto dto = new ForeclosureSettlementDto();
		dto.setLoanId(loan.getLoanId());
		dto.setMemberId(loan.getMemberId());
		dto.setMemberName(loan.getMemberName());

		// Relative Details with fallback to Guardian Name from Customer table
		String rel = loan.getRelativeDetails();
		if (rel == null || rel.trim().isEmpty()) {
			if (loan.getMemberId() != null) {
				try {
					List<addCustomer> custs = addCustomerRepo.findByMemberCode(loan.getMemberId().trim());
					if (custs != null && !custs.isEmpty() && custs.get(0).getGuardianName() != null && !custs.get(0).getGuardianName().trim().isEmpty()) {
						rel = custs.get(0).getGuardianName().trim();
					}
				} catch (Exception ignored) {}
			}
		}
		if (rel == null || rel.trim().isEmpty()) {
			rel = "--";
		}
		dto.setRelativeDetails(rel);

		dto.setContactNo(loan.getContactNo());
		dto.setBranchName(loan.getBranchName());

		// Loan Plan Name with fallback to Loan Type Plan
		String plan = loan.getLoanPlanName();
		if (plan == null || plan.trim().isEmpty()) {
			plan = loan.getTypeOfLoan() != null && !loan.getTypeOfLoan().trim().isEmpty() 
					? (loan.getTypeOfLoan().trim() + " Plan") : "Standard Loan Plan";
		}
		dto.setLoanPlanName(plan);

		dto.setTypeOfLoan(loan.getTypeOfLoan());
		dto.setLoanMode(loan.getLoanMode());
		dto.setLoanTerm(loan.getLoanTerm());
		dto.setRateOfInterest(loan.getRateOfInterest());
		dto.setLoanAmount(loan.getLoanAmount());
		dto.setInterestType(loan.getInterestType());
		dto.setEmiPayment(loan.getEmiPayment());
		dto.setLoanDate(loan.getLoanDate());
		dto.setFinancialConsultantId(loan.getFinancialConsultantId());
		dto.setFinancialConsultantName(loan.getFinancialConsultantName());

		double principal = 0.0;
		try {
			if (loan.getLoanAmount() != null) {
				principal = Double.parseDouble(loan.getLoanAmount().replaceAll("[^0-9.]", "").trim());
			}
		} catch (Exception ignored) {}
		dto.setSanctionedPrincipal(principal);

		double roi = 0.0;
		try {
			if (loan.getRateOfInterest() != null) {
				roi = Double.parseDouble(loan.getRateOfInterest().replaceAll("[^0-9.]", "").trim());
			}
		} catch (Exception ignored) {}

		double emi = 0.0;
		try {
			if (loan.getEmiPayment() != null) {
				emi = Double.parseDouble(loan.getEmiPayment().replaceAll("[^0-9.]", "").trim());
			}
		} catch (Exception ignored) {}

		int term = 12;
		try {
			if (loan.getLoanTerm() != null) {
				term = Integer.parseInt(loan.getLoanTerm().replaceAll("[^0-9]", "").trim());
			}
		} catch (Exception ignored) {}
		if (term <= 0) term = 12;
		dto.setTotalInstallments(term);

		// Total Payable and Total Interest calculation
		double totalPayable = 0.0;
		if (loan.getTotalPayableAmount() != null && !loan.getTotalPayableAmount().trim().isEmpty()) {
			try {
				totalPayable = Double.parseDouble(loan.getTotalPayableAmount().replaceAll("[^0-9.]", "").trim());
			} catch (Exception ignored) {}
		}
		if (totalPayable <= 0 && emi > 0 && term > 0) {
			totalPayable = emi * term;
		}

		double totalInt = 0.0;
		if (loan.getTotalInterest() != null && !loan.getTotalInterest().trim().isEmpty()) {
			try {
				totalInt = Double.parseDouble(loan.getTotalInterest().replaceAll("[^0-9.]", "").trim());
			} catch (Exception ignored) {}
		}
		if (totalInt <= 0 && totalPayable > principal) {
			totalInt = totalPayable - principal;
		}
		dto.setTotalPayableAmount(String.format(Locale.US, "%.2f", totalPayable));
		dto.setTotalInterest(String.format(Locale.US, "%.2f", totalInt));

		String mode = loan.getLoanMode() != null ? loan.getLoanMode().trim() : "Monthly";
		String interestType = loan.getInterestType() != null ? loan.getInterestType().trim() : "Reducing";

		// 1. Fetch payment history from loan_payment
		List<LoanPayment> payments = loanPaymentRepo.findByLoanId(loan.getLoanId());
		List<LoanPayment> paidInstallmentsList = new ArrayList<>();
		double totalPenalties = 0.0;
		String lastPaymentDateStr = loan.getLoanDate();

		if (payments != null) {
			for (LoanPayment p : payments) {
				boolean isDisbursement = "0".equals(p.getNoOfInst()) || "Loan Disbursement".equalsIgnoreCase(p.getRemarks());
				if (!isDisbursement && "PAID".equalsIgnoreCase(p.getPaymentStatus())) {
					paidInstallmentsList.add(p);
					if (p.getPaymentDate() != null && !p.getPaymentDate().trim().isEmpty()) {
						lastPaymentDateStr = p.getPaymentDate().trim();
					}
				}
				if (p.getPenaltyAmount() != null) {
					try {
						totalPenalties += Double.parseDouble(p.getPenaltyAmount().replaceAll("[^0-9.]", "").trim());
					} catch (Exception ignored) {}
				}
			}
		}

		int paidCount = paidInstallmentsList.size();
		dto.setPaidInstallments(paidCount);
		dto.setLastPaymentDate(lastPaymentDateStr);

		double periodDivisor = 12.0;
		if ("Daily".equalsIgnoreCase(mode)) periodDivisor = 365.0;
		else if ("Weekly".equalsIgnoreCase(mode)) periodDivisor = 52.0;
		else if ("Fortnightly".equalsIgnoreCase(mode)) periodDivisor = 26.0;
		else if ("Quarterly".equalsIgnoreCase(mode)) periodDivisor = 4.0;
		else periodDivisor = 12.0;

		double totalPrincipalPaid = 0.0;
		double outstandingPrincipal = principal;
		double unearnedRebate = 0.0;
		boolean isFlat = interestType != null && interestType.toLowerCase().contains("flat");
		if (isFlat) {
			double totalInterest = principal * (roi / 100.0) * (term / periodDivisor);
			double principalPerInst = term > 0 ? (principal / term) : 0.0;
			double interestPerInst = term > 0 ? (totalInterest / term) : 0.0;

			totalPrincipalPaid = Math.min(principal, paidCount * principalPerInst);
			outstandingPrincipal = Math.max(0.0, principal - totalPrincipalPaid);

			int remainingInst = Math.max(0, term - paidCount);
			unearnedRebate = remainingInst * interestPerInst;
		} else {
			// Reducing Balance
			double periodRate = (roi / 100.0) / periodDivisor;
			double runningBalance = principal;
			for (int i = 1; i <= paidCount; i++) {
				double interestComponent = runningBalance * periodRate;
				double principalComponent = emi - interestComponent;
				if (principalComponent > runningBalance) {
					principalComponent = runningBalance;
				}
				if (principalComponent < 0) principalComponent = 0;
				totalPrincipalPaid += principalComponent;
				runningBalance -= principalComponent;
				if (runningBalance <= 0) {
					runningBalance = 0;
					break;
				}
			}
			outstandingPrincipal = Math.max(0.0, runningBalance);
			unearnedRebate = 0.0;
		}

		dto.setTotalPrincipalPaid(roundTwoDecimals(totalPrincipalPaid));
		dto.setPrincipalOutstanding(roundTwoDecimals(outstandingPrincipal));
		dto.setUnearnedInterestRebate(roundTwoDecimals(unearnedRebate));

		// 2. Accrued Interest till Today using actual/365 convention explicitly
		// Daily rate = annual rate / 365, multiplied by actual days elapsed
		LocalDate today = LocalDate.now();
		LocalDate lastPayDate = today;
		try {
			if (lastPaymentDateStr != null && lastPaymentDateStr.trim().length() >= 10) {
				lastPayDate = LocalDate.parse(lastPaymentDateStr.trim().substring(0, 10));
			} else {
				lastPayDate = today;
			}
		} catch (Exception e) {
			lastPayDate = today;
		}

		long elapsedDays = 0;
		if (today.isAfter(lastPayDate)) {
			elapsedDays = ChronoUnit.DAYS.between(lastPayDate, today);
		}
		dto.setElapsedDaysSinceLastPayment(elapsedDays);

		double dailyRate = (roi / 100.0) / 365.0;
		double accruedInterest = outstandingPrincipal * dailyRate * elapsedDays;
		dto.setAccruedInterestTillDate(roundTwoDecimals(accruedInterest));

		// 3. Overdue arrears check
		LocalDate startDate = today;
		try {
			if (loan.getLoanDate() != null && loan.getLoanDate().trim().length() >= 10) {
				startDate = LocalDate.parse(loan.getLoanDate().trim().substring(0, 10));
			}
		} catch (Exception ignored) {}

		int expectedMaturedInstallments = calculateElapsedInstallments(startDate, today, mode, term);
		int arrearsCount = Math.max(0, expectedMaturedInstallments - paidCount);
		double overdueArrears = arrearsCount * emi;
		dto.setOverdueArrears(roundTwoDecimals(overdueArrears));
		dto.setPendingPenalties(roundTwoDecimals(totalPenalties));

		// 4. Foreclosure fee (configurable per scheme/type, default 0% if not configured)
		double feePercent = 0.0;
		try {
			LoanSchemCatalog scheme = loanRepository.findByLoanPlaneName(loan.getLoanPlanName()).orElse(null);
			// scheme specific foreclosure fee if configured
		} catch (Exception ignored) {}
		dto.setForeclosureFeePercent(feePercent);
		double feeAmount = roundTwoDecimals(outstandingPrincipal * (feePercent / 100.0));
		dto.setForeclosureFeeAmount(feeAmount);

		// 5. Net Payoff Amount = Principal Outstanding + Accrued Interest + Penalties + Foreclosure Fee - Rebates
		double netPayoff = Math.max(0.0, outstandingPrincipal + accruedInterest + totalPenalties + feeAmount - unearnedRebate);
		dto.setNetPayoffAmount(roundTwoDecimals(netPayoff));

		// 6. Check Collateral/Security
		boolean hasCollateral = false;
		StringBuilder colInfo = new StringBuilder();
		if (loan.getLienConfirmed() != null && loan.getLienConfirmed()) {
			hasCollateral = true;
			colInfo.append("Lien on Deposit A/C: ").append(loan.getDepositAccountNo() != null ? loan.getDepositAccountNo() : "Active").append("; ");
		}
		if (loan.getGuarantorSecurityType() != null && !loan.getGuarantorSecurityType().trim().isEmpty()) {
			hasCollateral = true;
			colInfo.append("Guarantor Security: ").append(loan.getGuarantorSecurityType()).append("; ");
		}
		if (loan.getVehicleRegNo() != null && !loan.getVehicleRegNo().trim().isEmpty()) {
			hasCollateral = true;
			colInfo.append("Vehicle Reg No: ").append(loan.getVehicleRegNo()).append("; ");
		}
		if (loan.getChassisNo() != null && !loan.getChassisNo().trim().isEmpty()) {
			hasCollateral = true;
			colInfo.append("Chassis No: ").append(loan.getChassisNo()).append("; ");
		}
		dto.setHasCollateral(hasCollateral);
		dto.setCollateralDetails(colInfo.toString().trim());

		// 7. Savings Account Lookup
		if (loan.getMemberId() != null) {
			List<CreateSavingsAccount> accList = createSavingRepo.findBySelectByCustomer(loan.getMemberId());
			if (accList == null || accList.isEmpty()) {
				accList = createSavingRepo.findBySelectByCustomerIgnoreCase(loan.getMemberId());
			}
			if (accList != null && !accList.isEmpty()) {
				CreateSavingsAccount sa = accList.get(0);
				dto.setSavingsAccountNumber(sa.getAccountNumber());
				try {
					dto.setSavingsAccountBalance(Double.parseDouble(sa.getBalance()));
				} catch (Exception ignored) {
					dto.setSavingsAccountBalance(0.0);
				}
			}
		}

		return dto;
	}

	private double roundTwoDecimals(double val) {
		return Math.round(val * 100.0) / 100.0;
	}

	private int calculateElapsedInstallments(LocalDate startDate, LocalDate today, String mode, int maxTerm) {
		if (today.isBefore(startDate) || startDate.isEqual(today)) {
			return 0;
		}
		long days = ChronoUnit.DAYS.between(startDate, today);
		int elapsed = 0;
		if ("Daily".equalsIgnoreCase(mode)) {
			elapsed = (int) days;
		} else if ("Weekly".equalsIgnoreCase(mode)) {
			elapsed = (int) (days / 7);
		} else if ("Fortnightly".equalsIgnoreCase(mode)) {
			elapsed = (int) (days / 14);
		} else if ("Quarterly".equalsIgnoreCase(mode)) {
			long months = ChronoUnit.MONTHS.between(startDate, today);
			elapsed = (int) (months / 3);
		} else {
			// Monthly
			long months = ChronoUnit.MONTHS.between(startDate, today);
			elapsed = (int) months;
		}
		return Math.min(maxTerm, Math.max(0, elapsed));
	}

	// Service for closing the loan (Transactional with Full Audit & Accounting)
	@Transactional
	public Map<String, Object> closeLoan(LoanClosure paymentDetails) {
		if (paymentDetails == null || paymentDetails.getLoanId() == null || paymentDetails.getLoanId().trim().isEmpty()) {
			throw new IllegalArgumentException("Loan ID is required to close loan.");
		}

		String loanId = paymentDetails.getLoanId().trim();
		LoanApplication loan = loanApplicationRepo.findFirstByLoanIdOrderByIdDesc(loanId);
		if (loan == null) {
			throw new RuntimeException("Loan not found for loanId: " + loanId);
		}

		if ("CLOSED".equalsIgnoreCase(loan.getLoanStatus())) {
			throw new IllegalStateException("Loan " + loanId + " is already CLOSED.");
		}

		// 1. Calculate settlement server-side to validate submitted payment
		ForeclosureSettlementDto settlement = calculateForeclosureSettlement(loanId);

		double waiverAmount = 0.0;
		if (paymentDetails.getWaiver() != null && !paymentDetails.getWaiver().trim().isEmpty()) {
			try {
				waiverAmount = Double.parseDouble(paymentDetails.getWaiver().replaceAll("[^0-9.]", "").trim());
			} catch (Exception ignored) {}
		}

		double fineAmount = 0.0;
		if (paymentDetails.getFine() != null && !paymentDetails.getFine().trim().isEmpty()) {
			try {
				fineAmount = Double.parseDouble(paymentDetails.getFine().replaceAll("[^0-9.]", "").trim());
			} catch (Exception ignored) {}
		}

		double feeAmount = 0.0;
		if (paymentDetails.getForeclosureFee() != null && !paymentDetails.getForeclosureFee().trim().isEmpty()) {
			try {
				feeAmount = Double.parseDouble(paymentDetails.getForeclosureFee().replaceAll("[^0-9.]", "").trim());
			} catch (Exception ignored) {}
		}

		// Expected net payoff
		double expectedPayoff = Math.max(0.0, (settlement.getPrincipalOutstanding() + settlement.getAccruedInterestTillDate() + settlement.getOverdueArrears() + fineAmount + feeAmount) - waiverAmount);

		double submittedPayment = 0.0;
		String rawPayment = paymentDetails.getNetAmount() != null && !paymentDetails.getNetAmount().trim().isEmpty()
				? paymentDetails.getNetAmount() : paymentDetails.getPaymentAmount();
		if (rawPayment != null && !rawPayment.trim().isEmpty()) {
			try {
				submittedPayment = Double.parseDouble(rawPayment.replaceAll("[^0-9.]", "").trim());
			} catch (Exception ignored) {}
		}

		// Validation check: short payment rejected (with tolerance of 0.50)
		if (submittedPayment < (expectedPayoff - 0.50)) {
			throw new IllegalArgumentException("Submitted payment amount (Rs. " + String.format(Locale.US, "%.2f", submittedPayment)
					+ ") is less than required settlement amount (Rs. " + String.format(Locale.US, "%.2f", expectedPayoff) + ").");
		}

		String paymentMode = paymentDetails.getPaymentMode() != null ? paymentDetails.getPaymentMode().trim() : "Cash";
		String paymentDate = paymentDetails.getPaymentDate() != null && !paymentDetails.getPaymentDate().trim().isEmpty()
				? paymentDetails.getPaymentDate().trim() : LocalDate.now().toString();

		// 2. Savings Account auto-debit if selected
		String savingsAccountNo = paymentDetails.getAccountNo();
		if ("Saving Account".equalsIgnoreCase(paymentMode) || "Savings Account".equalsIgnoreCase(paymentMode)) {
			CreateSavingsAccount savingAcc = null;
			if (savingsAccountNo != null && !savingsAccountNo.trim().isEmpty()) {
				savingAcc = createSavingRepo.findByAccountNumber(savingsAccountNo.trim()).orElse(null);
			}
			if (savingAcc == null) {
				List<CreateSavingsAccount> accList = createSavingRepo.findBySelectByCustomer(loan.getMemberId());
				if (accList == null || accList.isEmpty()) {
					accList = createSavingRepo.findBySelectByCustomerIgnoreCase(loan.getMemberId());
				}
				if (accList != null && !accList.isEmpty()) {
					savingAcc = accList.get(0);
				}
			}

			if (savingAcc == null) {
				throw new RuntimeException("No active savings account found for borrower " + loan.getMemberId() + " to execute debit.");
			}

			double curBal = 0.0;
			try {
				curBal = Double.parseDouble(savingAcc.getBalance());
			} catch (Exception e) {
				curBal = 0.0;
			}

			if (curBal < submittedPayment) {
				throw new RuntimeException("Insufficient balance in Savings Account (" + savingAcc.getAccountNumber()
						+ ")! Required: Rs. " + String.format(Locale.US, "%.2f", submittedPayment)
						+ ", Available: Rs. " + String.format(Locale.US, "%.2f", curBal));
			}

			double newBal = curBal - submittedPayment;
			savingAcc.setBalance(String.format(Locale.US, "%.2f", newBal));
			createSavingRepo.save(savingAcc);

			savingsAccountNo = savingAcc.getAccountNumber();
			paymentDetails.setAccountNo(savingsAccountNo);

			try {
				com.microfinance.model.SavingAccountActivity act = new com.microfinance.model.SavingAccountActivity();
				act.setSelectSavingTransactionId("TXN_FORECLOSURE_" + loanId + "_" + System.currentTimeMillis());
				act.setTransactionDate(paymentDate);
				act.setSelectBranchName(loan.getBranchName() != null ? loan.getBranchName() : "");
				act.setAccountNumber(savingAcc.getAccountNumber());
				act.setCustomerCode(savingAcc.getSelectByCustomer());
				act.setCustomerName(savingAcc.getEnterCustomerName());
				act.setContactNumber(savingAcc.getContactNumber());
				act.setTransactionFor("Early Loan Foreclosure Settlement");
				act.setComments("Early Foreclosure Settlement for Loan " + loanId);
				act.setTransactionType("Withdrawal");
				act.setTransactionAmount(String.format(Locale.US, "%.2f", submittedPayment));
				act.setAverageBalance(String.format(Locale.US, "%.2f", newBal));
				act.setPayBy("Saving Account");
				act.setApproved(true);
				savingAccountActivityRepo.save(act);
			} catch (Exception actEx) {
				System.err.println("Saving account activity log error: " + actEx.getMessage());
			}
		}

		// 3. Insert final closing record into loan_payment to balance ledger
		List<LoanPayment> existingPayments = loanPaymentRepo.findByLoanId(loanId);
		int nextInstNo = (existingPayments != null ? existingPayments.size() : 0) + 1;

		LoanPayment closingPayment = new LoanPayment();
		closingPayment.setLoanId(loanId);
		closingPayment.setMemberId(loan.getMemberId());
		closingPayment.setMemberName(loan.getMemberName());
		closingPayment.setBranchName(loan.getBranchName());
		closingPayment.setTypeOfLoan(loan.getTypeOfLoan());
		closingPayment.setLoanMode(loan.getLoanMode());
		closingPayment.setLoanTerm(loan.getLoanTerm());
		closingPayment.setRateOfInterest(loan.getRateOfInterest());
		closingPayment.setLoanAmount(loan.getLoanAmount());
		closingPayment.setInterestType(loan.getInterestType());
		closingPayment.setEmiPayment(String.format(Locale.US, "%.2f", submittedPayment));
		closingPayment.setLoanDate(loan.getLoanDate());
		closingPayment.setPaymentDate(paymentDate);
		closingPayment.setPaymentMode(paymentMode);
		closingPayment.setPaymentStatus("PAID");
		closingPayment.setAccountNo(savingsAccountNo);
		closingPayment.setRef_UpiId(paymentDetails.getRef_UpiId());
		closingPayment.setChequeNo(paymentDetails.getChequeNo());
		closingPayment.setChequeDate(paymentDetails.getChequeDate());
		closingPayment.setCharges(paymentDetails.getCharges());
		closingPayment.setRemarks("FORECLOSURE - Early Settlement: " + (paymentDetails.getReasonForClosure() != null ? paymentDetails.getReasonForClosure() : "Voluntary Prepayment"));
		closingPayment.setNoOfInst(String.valueOf(nextInstNo));
		closingPayment.setAmountDue("0.00");
		closingPayment.setPenaltyAmount(String.format(Locale.US, "%.2f", fineAmount));
		closingPayment.setTotalPayableAmount(String.format(Locale.US, "%.2f", submittedPayment));
		loanPaymentRepo.save(closingPayment);

		// 4. Save LoanClosure entity with full breakdown
		paymentDetails.setMemberName(loan.getMemberName());
		paymentDetails.setMemberId(loan.getMemberId());
		paymentDetails.setLoanStatus("CLOSED");
		paymentDetails.setClosureDate(paymentDate);
		paymentDetails.setPrincipaldue(String.format(Locale.US, "%.2f", settlement.getPrincipalOutstanding()));
		paymentDetails.setInterestDue(String.format(Locale.US, "%.2f", settlement.getAccruedInterestTillDate()));
		paymentDetails.setNetAmount(String.format(Locale.US, "%.2f", submittedPayment));
		paymentDetails.setBalanceLoanAmount("0.00");
		if (paymentDetails.getReasonForClosure() == null || paymentDetails.getReasonForClosure().trim().isEmpty()) {
			paymentDetails.setReasonForClosure("Voluntary Prepayment");
		}
		LoanClosure savedClosure = loanClosurerepo.save(paymentDetails);

		// 5. Update LoanApplication status
		loan.setLoanStatus("CLOSED");
		loan.setPaymentStatus("PAID");
		loan.setPaymentDate(paymentDate);

		// 6. Check and release linked collateral/security
		boolean collateralReleased = false;
		String collateralMsg = "No linked collateral to release";
		if (loan.getLienConfirmed() != null && loan.getLienConfirmed()) {
			loan.setLienConfirmed(false);
			collateralReleased = true;
		}
		if (loan.getGuarantorSecurityType() != null && !loan.getGuarantorSecurityType().trim().isEmpty()) {
			collateralReleased = true;
		}
		if (collateralReleased) {
			collateralMsg = "Collateral / Lien successfully discharged and released";
			try {
				ActivityLog log = new ActivityLog();
				log.setTimestamp(LocalDateTime.now());
				log.setUsername(paymentDetails.getFinancialConsultantName() != null ? paymentDetails.getFinancialConsultantName() : "STAFF");
				log.setAction("COLLATERAL_RELEASE");
				log.setDetails("Collateral released for Loan " + loanId + " upon early foreclosure. Reason: " + paymentDetails.getReasonForClosure());
				log.setStatus("SUCCESS");
				log.setUrl("/api/loanmanegment/closeLoan");
				log.setMethod("POST");
				activityLogRepository.save(log);
			} catch (Exception ex) {
				System.err.println("Collateral release activity log error: " + ex.getMessage());
			}
		}

		loanApplicationRepo.save(loan);

		// 7. Return structured response
		String receiptId = "REC-FC-" + loanId + "-" + System.currentTimeMillis();
		Map<String, Object> response = new HashMap<>();
		response.put("receiptId", receiptId);
		response.put("loanId", loanId);
		response.put("closureStatus", "CLOSED");
		response.put("collateralReleased", collateralReleased);
		response.put("collateralMessage", collateralMsg);
		response.put("closureDetails", savedClosure);
		response.put("message", "Loan " + loanId + " closed and settled successfully.");

		return response;
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

	public Map<String, Object> payRegularInstallment(Map<String, Object> req) {
		String loanId = req.get("loanId") != null ? req.get("loanId").toString().trim() : "";
		if (loanId.isEmpty()) {
			throw new RuntimeException("Loan ID is required");
		}

		LoanApplication loanApp = loanApplicationRepo.findFirstByLoanIdOrderByIdDesc(loanId);
		if (loanApp == null) {
			throw new RuntimeException("Loan not found for Loan ID: " + loanId);
		}

		String paymentMode = req.get("paymentMode") != null ? req.get("paymentMode").toString().trim() : "Cash";
		String paymentDate = req.get("paymentDate") != null ? req.get("paymentDate").toString().trim() : java.time.LocalDate.now().toString();
		String accountNo = req.get("accountNo") != null ? req.get("accountNo").toString().trim() : "";

		double paymentAmount = 0.0;
		try {
			paymentAmount = Double.parseDouble(req.get("paymentAmount").toString().trim());
		} catch (Exception e) {
			try {
				paymentAmount = Double.parseDouble(loanApp.getEmiPayment());
			} catch (Exception ignored) {}
		}

		double penaltyAmount = 0.0;
		if (req.get("penaltyAmount") != null) {
			try {
				penaltyAmount = Double.parseDouble(req.get("penaltyAmount").toString().replaceAll("[^0-9.]", "").trim());
			} catch (Exception ignored) {}
		}

		double totalPayable = paymentAmount + penaltyAmount;

		// Deduct from savings account if paymentMode is Saving Account
		if ("Saving Account".equalsIgnoreCase(paymentMode) || "Savings Account".equalsIgnoreCase(paymentMode)) {
			CreateSavingsAccount savingAcc = null;
			if (!accountNo.isEmpty()) {
				savingAcc = createSavingRepo.findByAccountNumber(accountNo).orElse(null);
			}
			if (savingAcc == null) {
				List<CreateSavingsAccount> accList = createSavingRepo.findBySelectByCustomer(loanApp.getMemberId());
				if (accList == null || accList.isEmpty()) {
					accList = createSavingRepo.findBySelectByCustomerIgnoreCase(loanApp.getMemberId());
				}
				if (accList != null && !accList.isEmpty()) {
					savingAcc = accList.get(0);
				}
			}

			if (savingAcc == null) {
				throw new RuntimeException("No savings account found for customer " + loanApp.getMemberId());
			}

			double curBal = 0.0;
			try {
				curBal = Double.parseDouble(savingAcc.getBalance());
			} catch (Exception e) {
				curBal = 0.0;
			}

			if (curBal < totalPayable) {
				throw new RuntimeException("Insufficient balance in Savings Account (" + savingAcc.getAccountNumber() + ")! Required: Rs. " + String.format(java.util.Locale.US, "%.2f", totalPayable) + ", Available: Rs. " + String.format(java.util.Locale.US, "%.2f", curBal));
			}

			double newBal = curBal - totalPayable;
			savingAcc.setBalance(String.format(java.util.Locale.US, "%.2f", newBal));
			createSavingRepo.save(savingAcc);

			// Record withdrawal in SavingAccountActivity
			try {
				com.microfinance.model.SavingAccountActivity act = new com.microfinance.model.SavingAccountActivity();
				act.setSelectSavingTransactionId("TXNEMI_" + loanId + "_" + System.currentTimeMillis());
				act.setTransactionDate(paymentDate);
				act.setSelectBranchName(loanApp.getBranchName() != null ? loanApp.getBranchName() : "");
				act.setAccountNumber(savingAcc.getAccountNumber());
				act.setCustomerCode(savingAcc.getSelectByCustomer());
				act.setCustomerName(savingAcc.getEnterCustomerName());
				act.setContactNumber(savingAcc.getContactNumber());
				act.setTransactionFor("Loan EMI Repayment");
				act.setComments("EMI Installment Repayment for Loan " + loanId);
				act.setTransactionType("Withdrawal");
				act.setTransactionAmount(String.format(java.util.Locale.US, "%.2f", totalPayable));
				act.setAverageBalance(String.format(java.util.Locale.US, "%.2f", newBal));
				act.setPayBy("Saving Account");
				act.setApproved(true);
				savingAccountActivityRepo.save(act);
			} catch (Exception actEx) {
				System.err.println("Saving account activity error: " + actEx.getMessage());
			}

			accountNo = savingAcc.getAccountNumber();
		}

		List<LoanPayment> existingPayments = loanPaymentRepo.findByLoanId(loanId);
		int instNo = existingPayments.size() + 1;
		if (req.get("installmentNo") != null) {
			String rawInst = req.get("installmentNo").toString().replaceAll("[^0-9]", "");
			if (!rawInst.isEmpty()) {
				try {
					instNo = Integer.parseInt(rawInst);
				} catch (Exception ignored) {}
			}
		}

		// Calculate updated remaining amount due
		double lastDue = 0.0;
		if (!existingPayments.isEmpty()) {
			try {
				lastDue = Double.parseDouble(existingPayments.get(existingPayments.size() - 1).getAmountDue());
			} catch (Exception ignored) {
				lastDue = Double.parseDouble(loanApp.getLoanAmount());
			}
		} else {
			try {
				lastDue = Double.parseDouble(loanApp.getLoanAmount());
			} catch (Exception ignored) {}
		}

		double newAmountDue = Math.max(0.0, lastDue - paymentAmount);

		LoanPayment payment = new LoanPayment();
		payment.setLoanId(loanId);
		payment.setMemberId(loanApp.getMemberId());
		payment.setMemberName(loanApp.getMemberName());
		payment.setBranchName(loanApp.getBranchName());
		payment.setTypeOfLoan(loanApp.getTypeOfLoan());
		payment.setLoanMode(loanApp.getLoanMode());
		payment.setLoanTerm(loanApp.getLoanTerm());
		payment.setRateOfInterest(loanApp.getRateOfInterest());
		payment.setLoanAmount(loanApp.getLoanAmount());
		payment.setInterestType(loanApp.getInterestType());
		payment.setEmiPayment(String.format(java.util.Locale.US, "%.2f", paymentAmount));
		payment.setLoanDate(loanApp.getLoanDate());
		payment.setPaymentDate(paymentDate);
		payment.setPaymentMode(paymentMode);
		payment.setPaymentStatus("PAID");
		payment.setAccountNo(accountNo);
		payment.setRemarks("Installment " + instNo);
		payment.setNoOfInst(String.valueOf(instNo));
		payment.setAmountDue(String.format(java.util.Locale.US, "%.2f", newAmountDue));
		payment.setPenaltyAmount(String.format(java.util.Locale.US, "%.2f", penaltyAmount));
		if (req.get("daysLate") != null) {
			payment.setDaysLate(req.get("daysLate").toString());
		}
		if (req.get("emiDueDate") != null) {
			payment.setDueDate(req.get("emiDueDate").toString());
		}

		loanPaymentRepo.save(payment);

		// Check closure
		int term = 0;
		try {
			term = Integer.parseInt(loanApp.getLoanTerm());
		} catch (Exception ignored) {}

		boolean isClosed = (newAmountDue <= 0.01) || (term > 0 && instNo >= term);
		if (isClosed) {
			loanApp.setLoanStatus("CLOSED");
			loanApplicationRepo.save(loanApp);

			LoanClosure closure = new LoanClosure();
			closure.setLoanId(loanApp.getLoanId());
			closure.setMemberName(loanApp.getMemberName());
			closure.setMemberId(loanApp.getMemberId());
			closure.setLoanStatus("CLOSED");
			closure.setPaymentDate(paymentDate);
			closure.setRemarks("Loan closed after Installment " + instNo);
			closure.setLoanAmount(loanApp.getLoanAmount());
			closure.setTypeOfLoan(loanApp.getTypeOfLoan());
			closure.setBranchName(loanApp.getBranchName());
			closure.setContactNo(loanApp.getContactNo());
			closure.setNoOfInst(String.valueOf(instNo));
			closure.setPaymentMode(paymentMode);
			loanClosurerepo.save(closure);
		}

		Map<String, Object> resp = new java.util.HashMap<>();
		resp.put("status", "OK");
		resp.put("message", "Installment " + instNo + " of Rs. " + String.format(java.util.Locale.US, "%.2f", totalPayable) + " paid successfully!");
		resp.put("installmentNo", instNo);
		resp.put("remainingDue", String.format(java.util.Locale.US, "%.2f", newAmountDue));
		resp.put("isLoanClosed", isClosed);
		return resp;
	}

	public Map<String, Object> resetLoanInstallments(String loanId) {
		if (loanId == null || loanId.trim().isEmpty()) {
			throw new RuntimeException("Loan ID is required");
		}
		loanId = loanId.trim();

		LoanApplication loanApp = loanApplicationRepo.findFirstByLoanIdOrderByIdDesc(loanId);
		if (loanApp == null) {
			throw new RuntimeException("Loan not found for ID: " + loanId);
		}

		List<LoanPayment> existingPayments = loanPaymentRepo.findByLoanId(loanId);
		int removedCount = 0;
		if (existingPayments != null && !existingPayments.isEmpty()) {
			removedCount = existingPayments.size();
			loanPaymentRepo.deleteAll(existingPayments);
		}

		loanApp.setLoanStatus("ACTIVE");
		loanApplicationRepo.save(loanApp);

		Map<String, Object> res = new HashMap<>();
		res.put("status", "OK");
		res.put("message", "Loan " + loanId + " installments reset successfully. Removed " + removedCount + " premature payment records.");
		res.put("loanId", loanId);
		res.put("loanAmount", loanApp.getLoanAmount());
		res.put("loanDate", loanApp.getLoanDate());
		return res;
	}

	public List<LoanApplication> getNotApprovedLoanCustomer() {
		// TODO Auto-generated method stub
		return loanApplicationRepo.findByApprovalStatusFalse();
	}
}