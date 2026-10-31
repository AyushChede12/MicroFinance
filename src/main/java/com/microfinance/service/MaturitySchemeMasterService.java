package com.microfinance.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.microfinance.model.AddnewinvestmentPM;
import com.microfinance.model.ApplyForMaturity;
import com.microfinance.model.BranchModule;
import com.microfinance.model.FullMaturity;
import com.microfinance.model.MaturitySchemeMaster;
import com.microfinance.model.partialMaturityPayment;
import com.microfinance.repository.AddInvestmentRepo;
import com.microfinance.repository.ApplyForMaturityRepo;
import com.microfinance.repository.BranchModuleRepo;
import com.microfinance.repository.FullMaturityRepo;
import com.microfinance.repository.MaturitySchemeMasterRepo;
import com.microfinance.repository.PartialMaturitypaymentRepo;

@Service
public class MaturitySchemeMasterService {

	@Autowired
	private MaturitySchemeMasterRepo maturityschemerepo;

	@Autowired
	private ApplyForMaturityRepo applymaturityrepo;

	@Autowired
	private PartialMaturitypaymentRepo partialmaturityrepo;

	@Autowired
	private FullMaturityRepo fullmaturityrepo;

	@Autowired
	private AddInvestmentRepo addInvestmentRepo;

	@Autowired
	private BranchModuleRepo branchModuleRepo;

	@Autowired
	private CustomerSavingsService customerSavingsService;

	// Save Maturity Scheme
	public MaturitySchemeMaster saveAllDailyDeposit(MaturitySchemeMaster maturityscheme) {
		return maturityschemerepo.save(maturityscheme);
	}

	public MaturitySchemeMaster saveMaturityScheme(MaturitySchemeMaster maturityscheme) {
		return maturityschemerepo.save(maturityscheme);
	}

	public List<MaturitySchemeMaster> getAllMaturitySchemes() {
		return maturityschemerepo.findAll();
	}

	public List<MaturitySchemeMaster> getMaturitySchemeByPolicyCode(String policyCode) {
		return maturityschemerepo.findByPolicyCode(policyCode);
	}

	// Apply for Maturity
	public ApplyForMaturity saveApplymaturity(ApplyForMaturity applymaturity) {
		if (applymaturity.getBranchName() != null) {
			applymaturity.setBranchName(applymaturity.getBranchName().trim().toUpperCase());
		}
		if (applymaturity.getCustomerName() != null) {
			applymaturity.setCustomerName(applymaturity.getCustomerName().trim().toUpperCase());
		}
		if (applymaturity.getSchemeType() != null) {
			applymaturity.setSchemeType(applymaturity.getSchemeType().trim().toUpperCase());
		}
		if (applymaturity.getRemark() != null) {
			applymaturity.setRemark(applymaturity.getRemark().trim().toUpperCase());
		}
		return applymaturityrepo.save(applymaturity);
	}

	public List<ApplyForMaturity> getApplyMaturityDetails() {
		return applymaturityrepo.findAll();
	}

	public Page<ApplyForMaturity> getApplyMaturityDetailsWithPage(int page, int size) {
		PageRequest pageable = PageRequest.of(page, size);
		return applymaturityrepo.findWithPage(pageable);
	}

	public List<ApplyForMaturity> getMaturityDetailsByBranchAndDate(String branchName, String fromDate, String toDate) {
		String bName = (branchName != null && !branchName.equalsIgnoreCase("ALL") && !branchName.trim().isEmpty())
				? branchName.trim()
				: null;
		String fDate = (fromDate != null && !fromDate.trim().isEmpty()) ? fromDate.trim() : null;
		String tDate = (toDate != null && !toDate.trim().isEmpty()) ? toDate.trim() : null;

		if (bName == null && fDate == null && tDate == null) {
			return applymaturityrepo.findAll();
		}
		return applymaturityrepo.findByBranchToDateFromDate(bName, fDate, tDate);
	}

	// Full Maturity Payment with Banking Transactions
	@Transactional
	public FullMaturity saveFullmaturity(FullMaturity fullmaturity) {
		if (fullmaturity.getCustomerName() != null) {
			fullmaturity.setCustomerName(fullmaturity.getCustomerName().trim().toUpperCase());
		}
		if (fullmaturity.getBranchName() != null) {
			fullmaturity.setBranchName(fullmaturity.getBranchName().trim().toUpperCase());
		}
		if (fullmaturity.getApproveBranch() != null) {
			fullmaturity.setApproveBranch(fullmaturity.getApproveBranch().trim().toUpperCase());
		}
		if (fullmaturity.getModeofPayment() != null) {
			fullmaturity.setModeofPayment(fullmaturity.getModeofPayment().trim().toUpperCase());
		}

		FullMaturity saved = fullmaturityrepo.save(fullmaturity);

		// Record AccountTransaction and BankTransaction for the payout
		try {
			double payoutAmount = 0.0;
			if (saved.getNetPayable() != null && !saved.getNetPayable().trim().isEmpty()) {
				payoutAmount = Double.parseDouble(saved.getNetPayable().trim());
			} else if (saved.getAmount() != null && !saved.getAmount().trim().isEmpty()) {
				payoutAmount = Double.parseDouble(saved.getAmount().trim());
			}

			if (payoutAmount > 0) {
				String txnDate = (saved.getPaymentDate() != null && !saved.getPaymentDate().trim().isEmpty())
						? saved.getPaymentDate().trim()
						: LocalDate.now().toString();

				String branchName = (saved.getBranchName() != null && !saved.getBranchName().trim().isEmpty())
						? saved.getBranchName().trim()
						: ((saved.getApproveBranch() != null) ? saved.getApproveBranch().trim() : "MAIN BRANCH");

				String paymentMode = (saved.getModeofPayment() != null && !saved.getModeofPayment().trim().isEmpty())
						? saved.getModeofPayment().trim().toUpperCase()
						: "CASH";

				String policyCode = saved.getPolicyCode() != null ? saved.getPolicyCode().trim() : "POLICY";
				String custName = saved.getCustomerName() != null ? saved.getCustomerName().trim() : "";

				BranchModule branchModule = branchModuleRepo.findByBranchName(branchName);

				// 1. If online / bank payment mode, record BankTransaction (outflow from bank)
				if (customerSavingsService.isBankPaymentMode(paymentMode)) {
					customerSavingsService.recordBankTransaction(
							null,
							branchModule,
							txnDate,
							"FULL MATURITY PAYOUT (" + paymentMode + ") - POLICY: " + policyCode + " - CUSTOMER: " + custName,
							0.0,
							payoutAmount,
							"MATURITY_PAYOUT",
							"MAT_FULL_" + policyCode + "_" + System.currentTimeMillis()
					);
				}

				// 2. Always record AccountTransaction for audit trail of the policy maturity payout
				customerSavingsService.recordAccountTransaction(
						policyCode,
						custName,
						branchName,
						"POLICY_MATURITY",
						txnDate,
						"DEBIT",
						0.0,
						payoutAmount,
						"FULL MATURITY PAYOUT (" + paymentMode + ") - POLICY: " + policyCode + " - NET PAYABLE: " + payoutAmount,
						paymentMode,
						"MAT_FULL_" + policyCode + "_" + System.currentTimeMillis(),
						null,
						saved.getTeamMemberName() != null ? saved.getTeamMemberName().trim().toUpperCase() : "ADMIN"
				);

				// 3. Update policy in AddnewinvestmentPM
				if (saved.getPolicyCode() != null) {
					Optional<AddnewinvestmentPM> optPolicy = addInvestmentRepo.findByPolicyCode(saved.getPolicyCode().trim());
					if (optPolicy.isPresent()) {
						AddnewinvestmentPM policy = optPolicy.get();
						policy.setAmountDue("0.00");
						policy.setRemark("FULL MATURITY PAID");
						addInvestmentRepo.save(policy);
					}
				}
			}
		} catch (Exception ex) {
			System.err.println("Error processing maturity transaction: " + ex.getMessage());
		}

		return saved;
	}

	public List<FullMaturity> getFullMaturityDetails() {
		return fullmaturityrepo.findAll();
	}

	public List<FullMaturity> getFullMaturityDetailsByBranchAndDate(String branchName, String fromDate, String toDate) {
		String bName = (branchName != null && !branchName.equalsIgnoreCase("ALL") && !branchName.trim().isEmpty())
				? branchName.trim()
				: null;
		String fDate = (fromDate != null && !fromDate.trim().isEmpty()) ? fromDate.trim() : null;
		String tDate = (toDate != null && !toDate.trim().isEmpty()) ? toDate.trim() : null;

		if (bName == null && fDate == null && tDate == null) {
			return fullmaturityrepo.findAll();
		}
		return fullmaturityrepo.findByBranchAndDate(bName, fDate, tDate);
	}

	// Partial Maturity Payment with Banking Transactions
	@Transactional
	public partialMaturityPayment savePartialmaturity(partialMaturityPayment partialmaturity) {
		if (partialmaturity.getCustomerName() != null) {
			partialmaturity.setCustomerName(partialmaturity.getCustomerName().trim().toUpperCase());
		}
		if (partialmaturity.getApproveBranch() != null) {
			partialmaturity.setApproveBranch(partialmaturity.getApproveBranch().trim().toUpperCase());
		}
		if (partialmaturity.getComment() != null) {
			partialmaturity.setComment(partialmaturity.getComment().trim().toUpperCase());
		}

		partialMaturityPayment saved = partialmaturityrepo.save(partialmaturity);

		// Record AccountTransaction and BankTransaction
		try {
			double payoutAmount = 0.0;
			if (saved.getNetPayable() != null && !saved.getNetPayable().trim().isEmpty()) {
				payoutAmount = Double.parseDouble(saved.getNetPayable().trim());
			} else if (saved.getDepositAmount() != null && !saved.getDepositAmount().trim().isEmpty()) {
				payoutAmount = Double.parseDouble(saved.getDepositAmount().trim());
			}

			if (payoutAmount > 0) {
				String txnDate = (saved.getClosingDate() != null)
						? saved.getClosingDate().toString()
						: LocalDate.now().toString();

				String branchName = (saved.getApproveBranch() != null && !saved.getApproveBranch().trim().isEmpty())
						? saved.getApproveBranch().trim()
						: "MAIN BRANCH";

				String policyCode = saved.getPolicyCode() != null ? saved.getPolicyCode().trim() : "POLICY";
				String custName = saved.getCustomerName() != null ? saved.getCustomerName().trim() : "";

				// Record AccountTransaction
				customerSavingsService.recordAccountTransaction(
						policyCode,
						custName,
						branchName,
						"POLICY_PARTIAL_MATURITY",
						txnDate,
						"DEBIT",
						0.0,
						payoutAmount,
						"PARTIAL MATURITY PAYOUT - POLICY: " + policyCode + " - NET PAYABLE: " + payoutAmount,
						"CASH",
						"MAT_PARTIAL_" + policyCode + "_" + System.currentTimeMillis(),
						null,
						saved.getTeamMemberName() != null ? saved.getTeamMemberName().trim().toUpperCase() : "ADMIN"
				);

				// Update policy status in AddnewinvestmentPM
				if (saved.getPolicyCode() != null) {
					Optional<AddnewinvestmentPM> optPolicy = addInvestmentRepo.findByPolicyCode(saved.getPolicyCode().trim());
					if (optPolicy.isPresent()) {
						AddnewinvestmentPM policy = optPolicy.get();
						policy.setRemark("PARTIAL MATURITY CLOSED");
						addInvestmentRepo.save(policy);
					}
				}
			}
		} catch (Exception ex) {
			System.err.println("Error processing partial maturity transaction: " + ex.getMessage());
		}

		return saved;
	}

	public List<partialMaturityPayment> getPartialMaturityDetails() {
		return partialmaturityrepo.findAll();
	}

	public List<partialMaturityPayment> getPartialMaturityDetailsByBranchAndDate(String branchName, String fromDate, String toDate) {
		String bName = (branchName != null && !branchName.equalsIgnoreCase("ALL") && !branchName.trim().isEmpty())
				? branchName.trim()
				: null;
		String fDate = (fromDate != null && !fromDate.trim().isEmpty()) ? fromDate.trim() : null;
		String tDate = (toDate != null && !toDate.trim().isEmpty()) ? toDate.trim() : null;

		if (bName == null && fDate == null && tDate == null) {
			return partialmaturityrepo.findAll();
		}
		return partialmaturityrepo.findByBranchAndDate(bName, fDate, tDate);
	}

	// Approved Maturity Details
	public List<Map<String, Object>> getApprovedMaturityDetails(String branchName, String fromDate, String toDate) {
		List<Map<String, Object>> result = new ArrayList<>();

		// 1. Full maturities with approveStatus == true
		List<FullMaturity> fullList = fullmaturityrepo.findByApproveStatusTrue();
		for (FullMaturity f : fullList) {
			if (branchName != null && !branchName.equalsIgnoreCase("ALL") && !branchName.trim().isEmpty()) {
				String b = f.getBranchName() != null ? f.getBranchName() : f.getApproveBranch();
				if (b == null || !b.equalsIgnoreCase(branchName.trim())) {
					continue;
				}
			}
			String pDate = f.getPaymentDate() != null ? f.getPaymentDate() : f.getMaturityDate();
			if (fromDate != null && !fromDate.trim().isEmpty() && pDate != null && pDate.compareTo(fromDate) < 0) {
				continue;
			}
			if (toDate != null && !toDate.trim().isEmpty() && pDate != null && pDate.compareTo(toDate) > 0) {
				continue;
			}

			Map<String, Object> map = new HashMap<>();
			map.put("id", f.getId());
			map.put("type", "FULL MATURITY");
			map.put("policyCode", f.getPolicyCode());
			map.put("customerName", f.getCustomerName());
			map.put("approvalBranch", f.getApproveBranch() != null ? f.getApproveBranch() : f.getBranchName());
			map.put("approvalDate", f.getPaymentDate() != null ? f.getPaymentDate() : f.getMaturityDate());
			map.put("appUser", f.getTeamMemberName() != null ? f.getTeamMemberName() : "ADMIN");
			map.put("appRemark", f.getPayComment() != null ? f.getPayComment() : "APPROVED");
			map.put("netPay", f.getNetPayable() != null ? f.getNetPayable() : f.getAmount());
			result.add(map);
		}

		// 2. Partial maturities with approveStatus == true
		List<partialMaturityPayment> partialList = partialmaturityrepo.findByApproveStatusTrue();
		for (partialMaturityPayment p : partialList) {
			if (branchName != null && !branchName.equalsIgnoreCase("ALL") && !branchName.trim().isEmpty()) {
				String b = p.getApproveBranch();
				if (b == null || !b.equalsIgnoreCase(branchName.trim())) {
					continue;
				}
			}
			String cDate = p.getClosingDate() != null ? p.getClosingDate().toString() : p.getMaturityDate();
			if (fromDate != null && !fromDate.trim().isEmpty() && cDate != null && cDate.compareTo(fromDate) < 0) {
				continue;
			}
			if (toDate != null && !toDate.trim().isEmpty() && cDate != null && cDate.compareTo(toDate) > 0) {
				continue;
			}

			Map<String, Object> map = new HashMap<>();
			map.put("id", p.getId());
			map.put("type", "PARTIAL MATURITY");
			map.put("policyCode", p.getPolicyCode());
			map.put("customerName", p.getCustomerName());
			map.put("approvalBranch", p.getApproveBranch());
			map.put("approvalDate", cDate);
			map.put("appUser", p.getTeamMemberName() != null ? p.getTeamMemberName() : "ADMIN");
			map.put("appRemark", p.getComment() != null ? p.getComment() : "APPROVED");
			map.put("netPay", p.getNetPayable() != null ? p.getNetPayable() : p.getDepositAmount());
			result.add(map);
		}

		return result;
	}
}
