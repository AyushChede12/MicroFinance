package com.microfinance.service;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.microfinance.dto.ApiResponse;
import com.microfinance.dto.GroupDirectoryDto;
import com.microfinance.model.ApplyForGroupLoan;
import com.microfinance.model.BranchModule;
import com.microfinance.model.CreateLendingGroup;
import com.microfinance.model.CreateSavingsAccount;
import com.microfinance.model.GroupDirectory;
import com.microfinance.model.GroupInstallmentRepayment;
import com.microfinance.model.GroupLoanClosure;
import com.microfinance.model.GroupLoanPayment;
import com.microfinance.model.InstallmentRepayment;
import com.microfinance.model.LoanApplication;
import com.microfinance.model.LoanAprroval;
import com.microfinance.repository.ApplyForGroupLoanRepo;
import com.microfinance.repository.BranchModuleRepo;
import com.microfinance.repository.CreateLendingGroupRepo;
import com.microfinance.repository.CreateSavingAccountRepo;
import com.microfinance.repository.GroupDirectoryRepo;
import com.microfinance.repository.GroupLoanClosureRepo;
import com.microfinance.repository.GroupLoanPaymentRepo;
import com.microfinance.repository.GroupRepaymentRepo;
import com.microfinance.repository.InstallmentRepymentRepo;
import com.microfinance.repository.LoanApprovalRepo;

@Service
public class JointLiabilityLoanService {

	@Autowired
	CreateLendingGroupRepo createLendingGroupRepo;

	@Autowired
	GroupDirectoryRepo groupDirectoryRepo;

	@Autowired
	ApplyForGroupLoanRepo applyForGroupLoanRepo;

	@Autowired
	LoanApprovalRepo loanApprovalRepo;

	@Autowired
	InstallmentRepymentRepo installmentRepymentRepo;

	@Autowired
	ApplyForGroupLoanRepo grouploanpaymnt;

	@Autowired
	GroupLoanPaymentRepo groupLoanpaymentrepo;

	@Autowired
	CreateSavingAccountRepo createSavingRepo;

	@Autowired
	GroupRepaymentRepo groupRepaymentRepo;

	@Autowired
	GroupLoanClosureRepo groupLoanClosureRepo;

	@Autowired
	private CustomerSavingsService customerSavingsService;

	@Autowired
	private BranchModuleRepo branchModuleRepo;

	@Value("${upload.directory}")
	private String uploadDirectory;

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

	public boolean saveLendingGroup(CreateLendingGroup createLendingGroup) {
		try {
			createLendingGroupRepo.save(createLendingGroup);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public List<CreateLendingGroup> getAlllendinggroup() {
		return createLendingGroupRepo.findAll();
	}

	public CreateLendingGroup getLendingGroupById(Long id) {
		return createLendingGroupRepo.findById(id).orElse(null);
	}

	public CreateLendingGroup updategroupLending(Long id, CreateLendingGroup updatedGroup) {
		Optional<CreateLendingGroup> existingOpt = createLendingGroupRepo.findById(id);
		if (existingOpt.isPresent()) {
			CreateLendingGroup existing = existingOpt.get();
			existing.setPlanCode(updatedGroup.getPlanCode());
			existing.setLoanSchemeName(updatedGroup.getLoanSchemeName());
			existing.setMinimumAge(updatedGroup.getMinimumAge());

			existing.setTerm(updatedGroup.getTerm());
			existing.setBranchName(updatedGroup.getBranchName());
			existing.setMaximumAge(updatedGroup.getMaximumAge());
			existing.setMinLoanAmt(updatedGroup.getMinLoanAmt());
			existing.setRateOfInterest(updatedGroup.getRateOfInterest());
			existing.setEmiFrequency(updatedGroup.getEmiFrequency());
			existing.setInterestType(updatedGroup.getInterestType());
			existing.setMaximumLoanAmount(updatedGroup.getMaximumLoanAmount());
			existing.setSecurityType(updatedGroup.getSecurityType());
			existing.setEmiType(updatedGroup.getEmiType());
			existing.setPlanActivationStatus(updatedGroup.getPlanActivationStatus());
			existing.setProcessingFeePercent(updatedGroup.getProcessingFeePercent());
			existing.setLegalChargesPercent(updatedGroup.getLegalChargesPercent());
			existing.setGstPercent(updatedGroup.getGstPercent());
			existing.setInsuranceFeePercent(updatedGroup.getInsuranceFeePercent());
			existing.setValuationFeePercent(updatedGroup.getValuationFeePercent());
			existing.setLateAllowanceDays(updatedGroup.getLateAllowanceDays());
			existing.setPenaltyMode(updatedGroup.getPenaltyMode());
			existing.setMonthlyPenalty(updatedGroup.getMonthlyPenalty());

			return createLendingGroupRepo.save(existing);
		} else {
			return null;
		}
	}

	public boolean deleteLendingGroup(Long id) {
		Optional<CreateLendingGroup> existing = createLendingGroupRepo.findById(id);
		if (existing.isPresent()) {
			createLendingGroupRepo.deleteById(id);
			return true;
		}
		return false;
	}

	public GroupDirectory updateGroupDirectory(Long id, GroupDirectory updatedDirectory) {
		Optional<GroupDirectory> optional = groupDirectoryRepo.findById(id);
		if (optional.isPresent()) {
			GroupDirectory existing = optional.get();

			existing.setGroupID(updatedDirectory.getGroupID());
			existing.setCommunityName(updatedDirectory.getCommunityName());
			existing.setOpeningDate(updatedDirectory.getOpeningDate());
			existing.setBranchName(updatedDirectory.getBranchName());
			existing.setCommunityLeader(updatedDirectory.getCommunityLeader());
			existing.setContactNo(updatedDirectory.getContactNo());
			existing.setCommunityAddress(updatedDirectory.getCommunityAddress());
			existing.setAllocatedStaff(updatedDirectory.getAllocatedStaff());
			existing.setCollectionDay(updatedDirectory.getCollectionDay());
			existing.setCollectionTime(updatedDirectory.getCollectionTime());

			existing.setSelectedMember(updatedDirectory.getSelectedMember());
			existing.setCustomerName(updatedDirectory.getCustomerName());
			existing.setReferralDetails(updatedDirectory.getReferralDetails());
			existing.setContact(updatedDirectory.getContact());

			return groupDirectoryRepo.save(existing);
		} else {
			return null;
		}
	}

	public boolean deleteGroupDirectory(Long id) {
		if (groupDirectoryRepo.existsById(id)) {
			groupDirectoryRepo.deleteById(id);
			return true;
		}
		return false;
	}

	public boolean saveGroupDirectoryData(GroupDirectory groupDirectory) {
		try {
			groupDirectoryRepo.save(groupDirectory);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	private String saveFile(MultipartFile file) throws IOException {
		ensureUploadDirectoryExists();
		String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
		File dest = new File(uploadDirectory + File.separator + fileName);
		file.transferTo(dest);
		return fileName;
	}

	private void ensureUploadDirectoryExists() {
		File dir = new File(uploadDirectory);
		if (!dir.exists()) {
			boolean created = dir.mkdirs();
			if (created) {
				System.out.println("DIRECTORY CREATED: " + uploadDirectory);
			} else {
				System.err.println("FAILED TO CREATE DIRECTORY: " + uploadDirectory);
			}
		}
	}

	public List<GroupDirectory> getAllGroupDirectories() {
		return groupDirectoryRepo.findAll();
	}

	public GroupDirectory getGroupDirectoryById(Long id) {
		return groupDirectoryRepo.findById(id).orElse(null);
	}

	public List<GroupDirectory> getaddquedata() {
		return groupDirectoryRepo.findAll();
	}

	public boolean saveGroupLoan(ApplyForGroupLoan applyGroupLoan) {
		try {
			applyGroupLoan.setGroupLoanStatus("ACTIVE");
			applyForGroupLoanRepo.save(applyGroupLoan);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public List<ApplyForGroupLoan> getAllApplyForGroupLoan() {
		return applyForGroupLoanRepo.findAll();
	}

	public List<GroupDirectory> fetchByGroupID(String groupID) {
		return groupDirectoryRepo.findByGroupID(groupID);
	}

	public List<CreateLendingGroup> fetchByPlanCode(String planCode) {
		return createLendingGroupRepo.findByPlanCode(planCode);
	}

	public List<ApplyForGroupLoan> getAllgroupdata() {
		return applyForGroupLoanRepo.findAll();
	}

	public boolean saveLoanApproval(LoanAprroval loanAprroval) {
		try {
			loanApprovalRepo.save(loanAprroval);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public String approveGroupLoan(ApplyForGroupLoan approvalRequest) {
		ApplyForGroupLoan existingLoan = applyForGroupLoanRepo.findTopByGroupCodeOrderByIdDesc(approvalRequest.getGroupCode());

		if (existingLoan != null) {
			if (existingLoan.isApprovalStatus()) {
				return "already_approved";
			}

			existingLoan.setApprovalStatus(true);
			existingLoan.setApprovalDate(approvalRequest.getApprovalDate() != null ? approvalRequest.getApprovalDate() : LocalDate.now().toString());
			existingLoan.setGroupLoanStatus("ACTIVE");

			applyForGroupLoanRepo.save(existingLoan);
			return "success";
		} else {
			return "not_found";
		}
	}

	public List<ApplyForGroupLoan> fetchApplyGroupLoanByGroupcode(String groupCode) {
		List<ApplyForGroupLoan> loans = applyForGroupLoanRepo.findByGroupCode(groupCode);
		List<GroupDirectory> directories = groupDirectoryRepo.findByGroupID(groupCode);

		if (directories != null && !directories.isEmpty()) {
			GroupDirectory dir = directories.get(0);
			for (ApplyForGroupLoan loan : loans) {
				loan.setPhoto(dir.getPhoto());
				loan.setSignature(dir.getSignature());
			}
		}

		return loans;
	}

	public List<ApplyForGroupLoan> fetchBygroupCode(String groupCode) {
		return applyForGroupLoanRepo.findByGroupCode(groupCode);
	}

	public boolean saveRepayment(InstallmentRepayment repayment) {
		try {
			installmentRepymentRepo.save(repayment);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public List<InstallmentRepayment> getAllRepayments() {
		return installmentRepymentRepo.findAll();
	}

	public List<String> getApprovedGroupLoanIds() {
		List<ApplyForGroupLoan> approvedActiveLoans = applyForGroupLoanRepo
				.findByApprovalStatusTrueAndGroupLoanStatus("ACTIVE");
		return approvedActiveLoans.stream().map(ApplyForGroupLoan::getGroupCode).distinct().collect(Collectors.toList());
	}

	public List<String> getAllGroupCodes() {
		List<ApplyForGroupLoan> all = applyForGroupLoanRepo.findAll();
		return all.stream().map(ApplyForGroupLoan::getGroupCode).filter(c -> c != null && !c.trim().isEmpty()).distinct().collect(Collectors.toList());
	}

	public boolean saveGroupLoanPayment(GroupLoanPayment groupLoan) {
		try {
			if (groupLoan.getGroupID() == null || groupLoan.getGroupID().trim().isEmpty()) {
				throw new IllegalArgumentException("GROUP ID IS MISSING IN REQUEST");
			}

			double loanAmount = parseDoubleSafe(groupLoan.getLoanAmount());
			double legalFee = parseDoubleSafe(groupLoan.getLegalCharges());
			double processingFee = parseDoubleSafe(groupLoan.getProcessingFee());
			double gst = parseDoubleSafe(groupLoan.getGstPercentage());
			double valuation = parseDoubleSafe(groupLoan.getValuationFee());
			double insurance = parseDoubleSafe(groupLoan.getInsuranceFee());

			double totalDeduction = legalFee + processingFee + gst + valuation + insurance;
			double netAmount = loanAmount - totalDeduction;
			groupLoan.setSanctionedAmount(String.valueOf(netAmount));

			if (netAmount <= 0) {
				throw new IllegalArgumentException("NET AMOUNT IS NOT SUFFICIENT TO DISTRIBUTE");
			}

			List<GroupDirectory> groups = groupDirectoryRepo.findByGroupID(groupLoan.getGroupID());
			if (groups.isEmpty()) {
				throw new IllegalArgumentException("GROUP NOT FOUND WITH ID: " + groupLoan.getGroupID());
			}

			GroupDirectory group = groups.get(0);
			String selectedMembers = group.getSelectedMember();

			if (selectedMembers == null || selectedMembers.trim().isEmpty()) {
				throw new IllegalArgumentException("NO MEMBERS FOUND IN THE GROUP");
			}

			String[] memberIds = selectedMembers.split(",");
			double sharePerMember = netAmount / memberIds.length;
			String today = groupLoan.getPaymentDate() != null && !groupLoan.getPaymentDate().trim().isEmpty()
					? groupLoan.getPaymentDate()
					: LocalDate.now().toString();

			// Update balance in CreateSavingsAccount and record AccountTransaction for each member
			for (String memberId : memberIds) {
				memberId = memberId.trim();

				List<CreateSavingsAccount> existingAccounts = createSavingRepo.findBySelectByCustomer(memberId);

				if (!existingAccounts.isEmpty()) {
					CreateSavingsAccount existingAccount = existingAccounts.get(0);

					double currentBalance = 0.0;
					try {
						currentBalance = Double.parseDouble(existingAccount.getBalance());
					} catch (Exception e) {
						currentBalance = 0.0;
					}

					double newBalance = currentBalance + sharePerMember;
					existingAccount.setBalance(String.valueOf(newBalance));
					createSavingRepo.save(existingAccount);

					// Record AccountTransaction for each group member
					try {
						String branch = groupLoan.getBranchName() != null ? groupLoan.getBranchName()
								: (existingAccount.getBranchName() != null ? existingAccount.getBranchName().getBranchName() : "");
						customerSavingsService.recordAccountTransaction(
							existingAccount.getAccountNumber(),
							existingAccount.getEnterCustomerName(),
							branch,
							"SAVING",
							today,
							"CREDIT",
							sharePerMember,
							0.0,
							"JOINT LIABILITY GROUP LOAN DISBURSEMENT - " + groupLoan.getGroupID(),
							groupLoan.getPaymentMode() != null ? groupLoan.getPaymentMode().toUpperCase() : "TRANSFER",
							groupLoan.getGroupID() + "_" + memberId,
							newBalance,
							"ADMIN"
						);
					} catch (Exception ex) {
						System.err.println("FAILED TO RECORD JLG MEMBER ACCOUNT TRANSACTION: " + ex.getMessage());
					}

				} else {
					System.out.println("NO SAVINGS ACCOUNT FOUND FOR MEMBER: " + memberId);
				}
			}

			// Record BankTransaction for the disbursement payout
			try {
				BranchModule bm = resolveBranch(groupLoan.getBranchName());
				customerSavingsService.recordBankTransaction(
					groupLoan.getAccountNo(),
					bm,
					today,
					"JOINT LIABILITY GROUP LOAN DISBURSEMENT - " + groupLoan.getGroupID(),
					0.0,
					netAmount,
					"DEBIT",
					groupLoan.getGroupID()
				);
			} catch (Exception ex) {
				System.err.println("FAILED TO RECORD JLG DISBURSEMENT BANK TRANSACTION: " + ex.getMessage());
			}

			groupLoanpaymentrepo.save(groupLoan);
			return true;

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	private double parseDoubleSafe(String value) {
		if (value == null || value.trim().isEmpty()) {
			return 0.0;
		}
		try {
			return Double.parseDouble(value.replace("%", "").replaceAll("[^0-9.]", "").trim());
		} catch (Exception e) {
			return 0.0;
		}
	}

	public List<GroupLoanPayment> fetchGroupLoanPayment(String groupID) {
		return groupLoanpaymentrepo.findByGroupID(groupID);
	}

	public boolean saveLoanRepayment(GroupInstallmentRepayment repayment) {
		try {
			if (repayment.getGroupID() == null || repayment.getGroupID().trim().isEmpty()) {
				throw new IllegalArgumentException("GROUP ID IS MISSING");
			}

			double loanAmount = parseDoubleSafe(repayment.getTotalPayable());
			if (loanAmount <= 0) {
				loanAmount = parseDoubleSafe(repayment.getLoanAmount());
			}
			double emi = parseDoubleSafe(repayment.getLoanEmi());
			double prevAmountDue = parseDoubleSafe(repayment.getAmountDue());

			double baseDue = (prevAmountDue > 0) ? prevAmountDue : loanAmount;
			double newAmountDue = baseDue - emi;
			if (newAmountDue < 0) {
				newAmountDue = 0.0;
			}

			String today = repayment.getPaymentDate() != null && !repayment.getPaymentDate().trim().isEmpty()
					? repayment.getPaymentDate()
					: LocalDate.now().toString();

			repayment.setAmountDue(String.valueOf(newAmountDue));
			repayment.setPaymentDate(today);

			// If savings account provided, auto-debit the account
			if (repayment.getAccountNo() != null && !repayment.getAccountNo().trim().isEmpty()) {
				Optional<CreateSavingsAccount> optAcc = createSavingRepo.findByAccountNumber(repayment.getAccountNo().trim());
				if (optAcc.isPresent()) {
					CreateSavingsAccount acc = optAcc.get();
					double curBal = 0.0;
					try {
						curBal = Double.parseDouble(acc.getBalance());
					} catch (Exception ignored) {}

					if (curBal >= emi) {
						curBal -= emi;
						acc.setBalance(String.valueOf(curBal));
						createSavingRepo.save(acc);
					}

					try {
						String branch = repayment.getBranchName() != null ? repayment.getBranchName()
								: (acc.getBranchName() != null ? acc.getBranchName().getBranchName() : "");
						customerSavingsService.recordAccountTransaction(
							acc.getAccountNumber(),
							repayment.getCommunityLeader() != null ? repayment.getCommunityLeader() : acc.getEnterCustomerName(),
							branch,
							"SAVING",
							today,
							"DEBIT",
							0.0,
							emi,
							"JOINT LIABILITY EMI REPAYMENT - " + repayment.getGroupID(),
							repayment.getPaymentMode() != null ? repayment.getPaymentMode().toUpperCase() : "SAVINGS",
							repayment.getGroupID() + "_EMI_" + System.currentTimeMillis(),
							curBal,
							"ADMIN"
						);
					} catch (Exception ex) {
						System.err.println("FAILED TO RECORD JLG REPAYMENT ACCOUNT TRANSACTION: " + ex.getMessage());
					}
				}
			}

			// Record BankTransaction for receipt into bank ledger
			try {
				BranchModule bm = resolveBranch(repayment.getBranchName());
				customerSavingsService.recordBankTransaction(
					repayment.getAccountNo(),
					bm,
					today,
					"JOINT LIABILITY EMI REPAYMENT - " + repayment.getGroupID(),
					emi,
					0.0,
					"CREDIT",
					repayment.getGroupID()
				);
			} catch (Exception ex) {
				System.err.println("FAILED TO RECORD JLG REPAYMENT BANK TRANSACTION: " + ex.getMessage());
			}

			groupRepaymentRepo.save(repayment);

			// Update loan status if fully repaid
			if (newAmountDue <= 0.01) {
				List<ApplyForGroupLoan> loanOpt = applyForGroupLoanRepo.findByGroupCode(repayment.getGroupID());
				if (loanOpt != null && !loanOpt.isEmpty()) {
					ApplyForGroupLoan loan = loanOpt.get(0);
					loan.setGroupLoanStatus("CLOSED");
					applyForGroupLoanRepo.save(loan);
				}
			}

			return true;

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public boolean closeGroupLoanEarly(GroupLoanClosure closure) {
		try {
			if (closure.getGroupCode() == null || closure.getGroupCode().trim().isEmpty()) {
				throw new IllegalArgumentException("GROUP CODE IS MISSING");
			}

			double settlementAmount = parseDoubleSafe(closure.getTotalOutstanding());
			if (settlementAmount <= 0) {
				settlementAmount = parseDoubleSafe(closure.getPrincipalAmount());
			}

			String today = closure.getPaymentDate() != null && !closure.getPaymentDate().trim().isEmpty()
					? closure.getPaymentDate()
					: LocalDate.now().toString();

			closure.setPaymentDate(today);
			closure.setStatus("CLOSED");

			// If savings account debit
			if (closure.getAccountNo() != null && !closure.getAccountNo().trim().isEmpty()) {
				Optional<CreateSavingsAccount> optAcc = createSavingRepo.findByAccountNumber(closure.getAccountNo().trim());
				if (optAcc.isPresent()) {
					CreateSavingsAccount acc = optAcc.get();
					double curBal = 0.0;
					try {
						curBal = Double.parseDouble(acc.getBalance());
					} catch (Exception ignored) {}

					if (curBal >= settlementAmount) {
						curBal -= settlementAmount;
						acc.setBalance(String.valueOf(curBal));
						createSavingRepo.save(acc);
					}

					try {
						String branch = closure.getPaymentBranch() != null ? closure.getPaymentBranch() : closure.getLoanBranch();
						customerSavingsService.recordAccountTransaction(
							acc.getAccountNumber(),
							acc.getEnterCustomerName(),
							branch,
							"SAVING",
							today,
							"DEBIT",
							0.0,
							settlementAmount,
							"JOINT LIABILITY EARLY CLOSURE - " + closure.getGroupCode(),
							closure.getPaidBy() != null ? closure.getPaidBy().toUpperCase() : "CLOSURE",
							closure.getGroupCode() + "_CLOSE",
							curBal,
							"ADMIN"
						);
					} catch (Exception ex) {
						System.err.println("FAILED TO RECORD JLG CLOSURE ACCOUNT TRANSACTION: " + ex.getMessage());
					}
				}
			}

			// Record BankTransaction
			try {
				BranchModule bm = resolveBranch(closure.getPaymentBranch() != null ? closure.getPaymentBranch() : closure.getLoanBranch());
				customerSavingsService.recordBankTransaction(
					closure.getAccountNo(),
					bm,
					today,
					"JOINT LIABILITY EARLY CLOSURE - " + closure.getGroupCode(),
					settlementAmount,
					0.0,
					"CREDIT",
					closure.getGroupCode()
				);
			} catch (Exception ex) {
				System.err.println("FAILED TO RECORD JLG CLOSURE BANK TRANSACTION: " + ex.getMessage());
			}

			// Update status in ApplyForGroupLoan
			List<ApplyForGroupLoan> loanList = applyForGroupLoanRepo.findByGroupCode(closure.getGroupCode());
			if (loanList != null && !loanList.isEmpty()) {
				for (ApplyForGroupLoan l : loanList) {
					l.setGroupLoanStatus("CLOSED");
					applyForGroupLoanRepo.save(l);
				}
			}

			groupLoanClosureRepo.save(closure);
			return true;

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public Map<String, Object> getStatementOfAccount(String groupID) {
		Map<String, Object> result = new HashMap<>();

		if (groupID == null || groupID.trim().isEmpty()) {
			return result;
		}
		groupID = groupID.trim();

		ApplyForGroupLoan loan = applyForGroupLoanRepo.findTopByGroupCodeOrderByIdDesc(groupID);
		if (loan == null) {
			List<ApplyForGroupLoan> list = applyForGroupLoanRepo.findByGroupCode(groupID);
			if (list != null && !list.isEmpty()) {
				loan = list.get(0);
			}
		}

		List<GroupDirectory> directories = groupDirectoryRepo.findByGroupID(groupID);
		GroupDirectory directory = (directories != null && !directories.isEmpty()) ? directories.get(0) : null;

		List<GroupLoanPayment> disbursements = groupLoanpaymentrepo.findByGroupID(groupID);
		List<GroupInstallmentRepayment> repayments = groupRepaymentRepo.findByGroupIDOrderByIdAsc(groupID);
		List<GroupLoanClosure> closures = groupLoanClosureRepo.findByGroupCode(groupID);

		double totalDisbursed = 0.0;
		if (disbursements != null && !disbursements.isEmpty()) {
			for (GroupLoanPayment p : disbursements) {
				totalDisbursed += parseDoubleSafe(p.getSanctionedAmount() != null ? p.getSanctionedAmount() : p.getLoanAmount());
			}
		} else if (loan != null) {
			totalDisbursed = parseDoubleSafe(loan.getTotalAmount());
		}

		double totalPaid = 0.0;
		if (repayments != null) {
			for (GroupInstallmentRepayment r : repayments) {
				totalPaid += parseDoubleSafe(r.getLoanEmi());
			}
		}
		if (closures != null) {
			for (GroupLoanClosure c : closures) {
				totalPaid += parseDoubleSafe(c.getTotalOutstanding());
			}
		}

		double amountDue = Math.max(0.0, totalDisbursed - totalPaid);

		result.put("groupID", groupID);
		result.put("groupLoan", loan);
		result.put("directory", directory);
		result.put("disbursements", disbursements);
		result.put("repayments", repayments);
		result.put("closures", closures);
		result.put("totalDisbursed", totalDisbursed);
		result.put("totalPaid", totalPaid);
		result.put("amountDue", amountDue);
		result.put("status", (loan != null && loan.getGroupLoanStatus() != null) ? loan.getGroupLoanStatus().toUpperCase() : "ACTIVE");

		return result;
	}

	public List<Map<String, Object>> getCompletedGroupLoans(String branch, String startDate, String endDate) {
		List<Map<String, Object>> result = new ArrayList<>();

		List<ApplyForGroupLoan> closedLoans = applyForGroupLoanRepo.findByGroupLoanStatus("CLOSED");
		List<GroupLoanClosure> closures = groupLoanClosureRepo.findAll();

		Map<String, GroupLoanClosure> closureMap = new HashMap<>();
		for (GroupLoanClosure c : closures) {
			if (c.getGroupCode() != null) {
				closureMap.put(c.getGroupCode().trim().toUpperCase(), c);
			}
		}

		java.util.Set<String> processedCodes = new java.util.HashSet<>();
		for (ApplyForGroupLoan l : closedLoans) {
			if (branch != null && !branch.trim().isEmpty() && !branch.equalsIgnoreCase("ALL")
					&& l.getBranchName() != null && !l.getBranchName().trim().equalsIgnoreCase(branch.trim())) {
				continue;
			}

			GroupLoanClosure cl = closureMap.get(l.getGroupCode().trim().toUpperCase());
			Map<String, Object> row = new HashMap<>();
			row.put("groupCode", l.getGroupCode());
			row.put("communityName", l.getCommunityName());
			row.put("branchName", l.getBranchName());
			row.put("communityLeader", l.getCommunityLeader());
			row.put("loanSchemeName", l.getLoanSchemeName());
			row.put("loanAmount", l.getTotalAmount());
			row.put("openingDate", l.getOpeningDate());
			row.put("closedDate", cl != null && cl.getPaymentDate() != null ? cl.getPaymentDate() : (l.getApprovalDate() != null ? l.getApprovalDate() : "--"));
			row.put("status", "CLOSED");
			result.add(row);
			if (l.getGroupCode() != null) {
				processedCodes.add(l.getGroupCode().trim().toUpperCase());
			}
		}

		for (GroupLoanClosure c : closures) {
			if (c.getGroupCode() != null && !processedCodes.contains(c.getGroupCode().trim().toUpperCase())) {
				if (branch != null && !branch.trim().isEmpty() && !branch.equalsIgnoreCase("ALL")
						&& c.getPaymentBranch() != null && !c.getPaymentBranch().trim().equalsIgnoreCase(branch.trim())) {
					continue;
				}
				Map<String, Object> row = new HashMap<>();
				row.put("groupCode", c.getGroupCode());
				row.put("communityName", c.getNomineeDetails() != null ? c.getNomineeDetails() : "--");
				row.put("branchName", c.getPaymentBranch() != null ? c.getPaymentBranch() : (c.getLoanBranch() != null ? c.getLoanBranch() : "--"));
				row.put("communityLeader", c.getNomineeDetails() != null ? c.getNomineeDetails() : "--");
				row.put("loanSchemeName", c.getLoanScheme() != null ? c.getLoanScheme() : "--");
				row.put("loanAmount", c.getPrincipalAmount() != null ? c.getPrincipalAmount() : c.getTotalLoanPrincipal());
				row.put("openingDate", c.getLoanStartDate() != null ? c.getLoanStartDate() : "--");
				row.put("closedDate", c.getPaymentDate() != null ? c.getPaymentDate() : "--");
				row.put("status", "CLOSED");
				result.add(row);
				processedCodes.add(c.getGroupCode().trim().toUpperCase());
			}
		}

		return result;
	}

	public List<Map<String, Object>> searchGroupLoanRecords(String branch, String groupCode, String memberCode, String startDate, String endDate) {
		List<Map<String, Object>> result = new ArrayList<>();
		List<ApplyForGroupLoan> allLoans = applyForGroupLoanRepo.findAll();

		for (ApplyForGroupLoan l : allLoans) {
			if (branch != null && !branch.trim().isEmpty() && !branch.equalsIgnoreCase("ALL")
					&& l.getBranchName() != null && !l.getBranchName().trim().equalsIgnoreCase(branch.trim())) {
				continue;
			}
			if (groupCode != null && !groupCode.trim().isEmpty()
					&& l.getGroupCode() != null && !l.getGroupCode().trim().equalsIgnoreCase(groupCode.trim())) {
				continue;
			}
			if (memberCode != null && !memberCode.trim().isEmpty()
					&& l.getSelectedMember() != null && !l.getSelectedMember().trim().contains(memberCode.trim())) {
				continue;
			}

			Map<String, Object> row = new HashMap<>();
			row.put("groupCode", l.getGroupCode());
			row.put("communityName", l.getCommunityName());
			row.put("branchName", l.getBranchName());
			row.put("communityLeader", l.getCommunityLeader());
			row.put("loanSchemeName", l.getLoanSchemeName());
			row.put("loanAmount", l.getTotalAmount());
			row.put("interestRate", l.getRateOfInterest());
			row.put("term", l.getTerm());
			row.put("openingDate", l.getOpeningDate());
			row.put("status", l.getGroupLoanStatus() != null ? l.getGroupLoanStatus().toUpperCase() : "ACTIVE");
			result.add(row);
		}

		return result;
	}
}
