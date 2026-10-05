package com.microfinance.service;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
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
import com.microfinance.model.CreateLendingGroup;
import com.microfinance.model.CreateSavingsAccount;
import com.microfinance.model.GroupDirectory;
import com.microfinance.model.GroupInstallmentRepayment;
import com.microfinance.model.GroupLoanPayment;
import com.microfinance.model.InstallmentRepayment;
import com.microfinance.model.LoanApplication;
import com.microfinance.model.LoanAprroval;
import com.microfinance.repository.ApplyForGroupLoanRepo;
import com.microfinance.repository.CreateLendingGroupRepo;
import com.microfinance.repository.CreateSavingAccountRepo;
import com.microfinance.repository.GroupDirectoryRepo;
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
	
	@Value("${upload.directory}")
	private String uploadDirectory;

	public boolean saveLendingGroup(CreateLendingGroup createLendingGroup) {
		// TODO Auto-generated method stub
		try {
			createLendingGroupRepo.save(createLendingGroup);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public List<CreateLendingGroup> getAlllendinggroup() {
		// TODO Auto-generated method stub
		return createLendingGroupRepo.findAll();
	}

	public CreateLendingGroup getLendingGroupById(Long id) {
		// TODO Auto-generated method stub
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
	// Group Directory Service code

	public GroupDirectory updateGroupDirectory(Long id, GroupDirectory updatedDirectory) {
		Optional<GroupDirectory> optional = groupDirectoryRepo.findById(id);
		if (optional.isPresent()) {
			GroupDirectory existing = optional.get();

			// Update all fields
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

			// existing.setUploadPhoto(updatedDirectory.getUploadPhoto());
			// existing.setUploadSignature(updatedDirectory.getUploadSignature());

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

	// Service for saving group directory
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
				System.out.println("Directory created: " + uploadDirectory);
			} else {
				System.err.println("Failed to create directory: " + uploadDirectory);
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
		// TODO Auto-generated method stub
		return groupDirectoryRepo.findAll();
	}

	// Service for group laon application
	public boolean saveGroupLoan(ApplyForGroupLoan applyGroupLoan) {
		try {
			// force values before saving
			applyGroupLoan.setGroupLoanStatus("ACTIVE"); // default: active loan

			applyForGroupLoanRepo.save(applyGroupLoan);
			return true;
		} catch (Exception e) {
			e.printStackTrace(); // helpful for debugging
			return false;
		}
	}

	public List<ApplyForGroupLoan> getAllApplyForGroupLoan() {
		// TODO Auto-generated method stub
		return applyForGroupLoanRepo.findAll();
	}

	public List<GroupDirectory> fetchByGroupID(String groupID) {
		// TODO Auto-generated method stub
		return groupDirectoryRepo.findByGroupID(groupID);
	}

	public List<CreateLendingGroup> fetchByPlanCode(String planCode) {
		return createLendingGroupRepo.findByPlanCode(planCode);
	}

	public List<ApplyForGroupLoan> getAllgroupdata() {
		// TODO Auto-generated method stub
		return applyForGroupLoanRepo.findAll();
	}

	public boolean saveLoanApproval(LoanAprroval loanAprroval) {
		// TODO Auto-generated method stub
		try {
			loanApprovalRepo.save(loanAprroval);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	// Service for approving the group loan application
	public String approveGroupLoan(ApplyForGroupLoan approvalRequest) {

		// Step 1: Find the existing group loan by groupCode
		ApplyForGroupLoan existingLoan = applyForGroupLoanRepo.findSingleByGroupCode(approvalRequest.getGroupCode());

		if (existingLoan != null) {

			// ✅ Check if already approved
			if (existingLoan.isApprovalStatus()) {
				return "already_approved";
			}

			// Step 2: Update approval status and date
			existingLoan.setApprovalStatus(true); // approved
			existingLoan.setApprovalDate(approvalRequest.getApprovalDate()); // today's date

			// Step 3: Save updated group loan
			applyForGroupLoanRepo.save(existingLoan);

			return "success";
		} else {
			return "not_found"; // group loan not found
		}
	}

	public List<ApplyForGroupLoan> fetchApplyGroupLoanByGroupcode(String groupCode) {
		// 1️⃣ Fetch all loans for this group
		List<ApplyForGroupLoan> loans = applyForGroupLoanRepo.findByGroupCode(groupCode);

		// 2️⃣ Fetch the group directory for this group
		List<GroupDirectory> directories = groupDirectoryRepo.findByGroupID(groupCode);

		// 3️⃣ If directory exists, set photo/signature in each loan
		if (directories != null && !directories.isEmpty()) {
			GroupDirectory dir = directories.get(0); // assuming one directory per group
			for (ApplyForGroupLoan loan : loans) {
				loan.setPhoto(dir.getPhoto());
				loan.setSignature(dir.getSignature());
			}
		}

		return loans;
	}

	public List<ApplyForGroupLoan> fetchBygroupCode(String groupCode) {
		// TODO Auto-generated method stub
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

	// Service for getting Approved & Active loan Ids( Vaibhav)
	public List<String> getApprovedGroupLoanIds() {
		List<ApplyForGroupLoan> approvedActiveLoans = applyForGroupLoanRepo
				.findByApprovalStatusTrueAndGroupLoanStatus("ACTIVE");
		return approvedActiveLoans.stream().map(ApplyForGroupLoan::getGroupCode).collect(Collectors.toList());
	}

	// Service for paying members in the create saving account balance
	public boolean saveGroupLoanPayment(GroupLoanPayment groupLoan) {
		try {
			System.out.println("Received GroupLoanPayment: " + groupLoan);

			if (groupLoan.getGroupID() == null || groupLoan.getGroupID().isEmpty()) {
				throw new IllegalArgumentException("Group ID is missing in request");
			}

			double loanAmount = parseDoubleSafe(groupLoan.getLoanAmount());
			double legalFee = parseDoubleSafe(groupLoan.getLegalCharges());
			double processingFee = parseDoubleSafe(groupLoan.getProcessingFee());
			double gst = parseDoubleSafe(groupLoan.getGstPercentage());
			double valuation = parseDoubleSafe(groupLoan.getValuationFee());

			double totalDeduction = legalFee + processingFee + gst + valuation;
			double netAmount = loanAmount - totalDeduction;
			// groupLoan.setSanctionedAmount(netAmount);

			if (netAmount <= 0) {
				throw new IllegalArgumentException("Net amount is not sufficient to distribute");
			}

			List<GroupDirectory> groups = groupDirectoryRepo.findByGroupID(groupLoan.getGroupID());
			if (groups.isEmpty()) {
				throw new IllegalArgumentException("Group not found with ID: " + groupLoan.getGroupID());
			}

			GroupDirectory group = groups.get(0);
			String selectedMembers = group.getSelectedMember();

			if (selectedMembers == null || selectedMembers.trim().isEmpty()) {
				throw new IllegalArgumentException("No members found in the group");
			}

			String[] memberIds = selectedMembers.split(",");
			double sharePerMember = netAmount / memberIds.length;

			// ✅ Update balance in CreateSavingsAccount for each member
			for (String memberId : memberIds) {
				memberId = memberId.trim();

				List<CreateSavingsAccount> existingAccounts = createSavingRepo.findBySelectByCustomer(memberId);

				if (!existingAccounts.isEmpty()) {
					CreateSavingsAccount existingAccount = existingAccounts.get(0);

					double currentBalance = 0.0;
					try {
						currentBalance = Double.parseDouble(existingAccount.getBalance());
					} catch (NumberFormatException e) {
						currentBalance = 0.0;
					}

					double newBalance = currentBalance + sharePerMember;
					existingAccount.setBalance(String.valueOf(newBalance));
					createSavingRepo.save(existingAccount);

				} else {
					System.out.println("⚠️ No savings account found for member: " + memberId);
				}
			}

			groupLoanpaymentrepo.save(groupLoan);
			System.out.println("Group loan payment saved successfully.");
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
		return Double.parseDouble(value.replace("%", "").trim());
	}

	public List<GroupLoanPayment> fetchGroupLoanPayment(String groupID) {
		return groupLoanpaymentrepo.findByGroupID(groupID);
	}
	
	
	public boolean saveLoanRepayment(GroupInstallmentRepayment repayment) {
	    try {
	        // --- Step 1: Parse numeric fields safely ---
	        double loanAmount = parseDoubleSafe(repayment.getTotalPayable());
	        double emi = parseDoubleSafe(repayment.getLoanEmi());
	        double prevAmountDue = parseDoubleSafe(repayment.getAmountDue());

	        // --- Step 2: Calculate new amount due ---
	        double newAmountDue = loanAmount - emi;

	        // --- Step 3: Update repayment object with new amount due ---
	        repayment.setAmountDue(String.valueOf(newAmountDue));
	        repayment.setPaymentDate(LocalDate.now().toString()); // Optional: store current date

	        // --- Step 4: Save repayment record ---
	        groupRepaymentRepo.save(repayment);

	        // --- Step 5: If the loan is fully paid, update loan status ---
	        if (newAmountDue <= 0) {
	            // ✅ Get the corresponding loan record
	            List<ApplyForGroupLoan> loanOpt = applyForGroupLoanRepo.findByGroupCode(repayment.getGroupID());
	            if (loanOpt.isEmpty()) {
	                ApplyForGroupLoan loan = loanOpt.get(0);
	                loan.setGroupLoanStatus(uploadDirectory);
	                applyForGroupLoanRepo.save(loan);
	                System.out.println("✅ Loan fully repaid. Status updated to Closed.");
	            }
	        } 

	        // --- Step 6: Log details ---
	        System.out.println("Loan Amount: " + loanAmount);
	        System.out.println("EMI Paid: " + emi);
	        System.out.println("New Amount Due: " + newAmountDue);

	        return true;

	    } catch (Exception e) {
	        e.printStackTrace();
	        return false;
	    }
	}


}
