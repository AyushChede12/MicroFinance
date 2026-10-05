package com.microfinance.service;

import java.io.File;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.microfinance.dto.ApiResponse;
import com.microfinance.dto.SavingAccountDto;
import com.microfinance.model.BranchModule;
import com.microfinance.model.CreateSavingsAccount;
import com.microfinance.model.ManageDepartment;
import com.microfinance.model.SavingAccountActivity;
import com.microfinance.model.SavingSchemeCatalog;
import com.microfinance.model.SavingsInterestTransfer;
import com.microfinance.model.addCustomer;
import com.microfinance.model.addFinancialConsultant;
import com.microfinance.model.savingAccountFundTransfer;
import com.microfinance.model.savingsAccountCloser;
import com.microfinance.repository.AddCustomerRepo;
import com.microfinance.repository.BranchModuleRepo;
import com.microfinance.repository.CreateSavingAccountRepo;
import com.microfinance.repository.FinancialConsultantRepo;
import com.microfinance.repository.SavingAccountActivityRepo;
import com.microfinance.repository.SavingAccountCloserRepo;
import com.microfinance.repository.SavingAccountFundTransferRepo;
import com.microfinance.repository.SavingSchmeCatalogRepo;
import com.microfinance.repository.SavingsInterestTransferRepo;
import com.microfinance.model.LoanPayment;
import com.microfinance.repository.LoanPaymentRepo;
import com.microfinance.model.LoanApplication;
import com.microfinance.model.LoanDeductionDetails;
import com.microfinance.repository.LoanApplicationRepo;
import com.microfinance.repository.LoanDeductionDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;

@Service
@RequiredArgsConstructor
public class CustomerSavingsService {

	private SavingSchmeCatalogRepo savingSchmeCatalogRepo;
	private AddCustomerRepo addcustomerRepo;
	private FinancialConsultantRepo financialConsultantRepo;
	private CreateSavingAccountRepo createSavingAccountRepo;
	private SavingAccountActivityRepo savingAccountActivityRepo;
	private SavingAccountFundTransferRepo savingAccFundTransferRepo;
	private SavingAccountCloserRepo savingAccCloserRepo;
	private SavingsInterestTransferRepo savingsInterestTransferRepo;
	private BranchModuleRepo branchModuleRepo;
	private LoanPaymentRepo loanPaymentRepo;

	@Autowired(required = false)
	private LoanApplicationRepo loanApplicationRepo;

	@Autowired(required = false)
	private LoanDeductionDetailsRepo loanDeductionDetailsRepo;

	@Value("${upload.directory}")
	private String uploadDirectory;

	public boolean saveSavingScheme(SavingSchemeCatalog savingSchemeCatalog) {
		try {
			savingSchmeCatalogRepo.save(savingSchemeCatalog);
			return true;
		} catch (Exception e) {
			e.printStackTrace(); // Log actual error
			return false;
		}
	}

	public List<addCustomer> findCustomerCode() {
		List<addCustomer> list = addcustomerRepo.findAll();
		return list;
	}

	public List<addCustomer> fetchCustomerCode(String memberCode) {
		List<addCustomer> list = addcustomerRepo.findByMemberCode(memberCode);
		return list;
	}

	/*
	 * public List<SavingSchemeCatalog> findBySchemeType() {
	 * List<SavingSchemeCatalog> list = savingSchmeCatalogRepo.findAll(); return
	 * list; }
	 */

	public List<SavingSchemeCatalog> findByPolicyName(String policyName) {
		List<SavingSchemeCatalog> list = savingSchmeCatalogRepo.findByPolicyName(policyName);
		return list;
	}

	public List<addFinancialConsultant> findByFinancialCode(String financialCode) {
		List<addFinancialConsultant> list = financialConsultantRepo.findByFinancialCode(financialCode);
		return list;
	}

//	public boolean saveSavingAccountDetails(CreateSavingsAccount createSavingsAccount) {
//		try {
//			createSavingAccountRepo.save(createSavingsAccount);
//		        return true;
//		    } catch (Exception e) {
//		        e.printStackTrace(); // Log actual error
//		        return false;
//		    }
//	}

//	public CreateSavingsAccount saveSavingAccountDetails(CreateSavingsAccount createSavingsAccount) {
//		// TODO Auto-generated method stub
//		return createSavingAccountRepo.save(createSavingsAccount);
//	}

	public ApiResponse<CreateSavingsAccount> saveSavingAccountDetails(SavingAccountDto savingAccountDto, String photo,
			String signature, MultipartFile jointPhoto, MultipartFile newPhoto, MultipartFile newSignature)
			throws IOException {
		// TODO Auto-generated method stub
		CreateSavingsAccount createSavingsAccount = new CreateSavingsAccount();
		boolean isNew = true;

		// Check if the ClientMaster is being updated
		if (savingAccountDto.getId() != null && savingAccountDto.getId() > 0) {
			createSavingsAccount = createSavingAccountRepo.findById(savingAccountDto.getId())
					.orElse(new CreateSavingsAccount());
			isNew = false;
		}

		// Map fields from DTO to entity
		createSavingsAccount.setTypeofaccount(savingAccountDto.getTypeofaccount());
		createSavingsAccount.setOpeningDate(savingAccountDto.getOpeningDate());
		createSavingsAccount.setSelectByCustomer(savingAccountDto.getSelectByCustomer());
		createSavingsAccount.setEnterCustomerName(savingAccountDto.getEnterCustomerName());
		createSavingsAccount.setDateOfBirth(savingAccountDto.getDateOfBirth());
		createSavingsAccount.setFamilyDetails(savingAccountDto.getFamilyDetails());
		createSavingsAccount.setContactNumber(savingAccountDto.getContactNumber());
		createSavingsAccount.setSuggestedNomineeName(savingAccountDto.getSuggestedNomineeName());
		createSavingsAccount.setSuggestedNomineeAge(savingAccountDto.getSuggestedNomineeAge());
		createSavingsAccount.setSuggestedNomineeRelation(savingAccountDto.getSuggestedNomineeRelation());
		createSavingsAccount.setAddress(savingAccountDto.getAddress());
		createSavingsAccount.setDistrict(savingAccountDto.getDistrict());
		BranchModule branch = branchModuleRepo.findByBranchName(savingAccountDto.getBranchName());
		createSavingsAccount.setBranchName(branch);
		createSavingsAccount.setState(savingAccountDto.getState());
		createSavingsAccount.setPinCode(savingAccountDto.getPinCode());
		createSavingsAccount.setOperationType(savingAccountDto.getOperationType());
		createSavingsAccount.setJointOperationCode(savingAccountDto.getJointOperationCode());
		createSavingsAccount.setJointSurvivorCode(savingAccountDto.getJointSurvivorCode());
		createSavingsAccount.setFamilyRelation(savingAccountDto.getFamilyRelation());
		createSavingsAccount.setSelectPlan(savingAccountDto.getSelectPlan());
		createSavingsAccount.setBalance(savingAccountDto.getBalance());
		createSavingsAccount.setFinancialConsultantCode(savingAccountDto.getFinancialConsultantCode());
		createSavingsAccount.setFinancialConsultantName(savingAccountDto.getFinancialConsultantName());
		createSavingsAccount.setOpeningFees(savingAccountDto.getOpeningFees());
		createSavingsAccount.setEmailId(savingAccountDto.getEmailId());
		createSavingsAccount.setAadharNo(savingAccountDto.getAadharNo());
		createSavingsAccount.setAuthenticateWith(savingAccountDto.getAuthenticateWith());
		createSavingsAccount.setModeOfPayment(savingAccountDto.getModeOfPayment());

		createSavingsAccount.setChequeNo(savingAccountDto.getChequeNo());
		createSavingsAccount.setChequeDate(savingAccountDto.getChequeDate());
		createSavingsAccount.setDepositAcc1(savingAccountDto.getDepositAcc1());
		createSavingsAccount.setDepositAcc2(savingAccountDto.getDepositAcc2());
		createSavingsAccount.setRefNumber1(savingAccountDto.getRefNumber1());
		createSavingsAccount.setDepositAcc3(savingAccountDto.getDepositAcc3());
		createSavingsAccount.setRefNumber2(savingAccountDto.getRefNumber2());

		createSavingsAccount.setComment(savingAccountDto.getComment());
		createSavingsAccount.setAccountStatus(savingAccountDto.getAccountStatus());
		createSavingsAccount.setMessageSend(savingAccountDto.getMessageSend());
		createSavingsAccount.setDebitCardIssue(savingAccountDto.getDebitCardIssue());
		createSavingsAccount.setIsLocker(savingAccountDto.getIsLocker());
		createSavingsAccount.setAccountFreeze(savingAccountDto.getAccountFreeze());
		createSavingsAccount.setAccountNumber(savingAccountDto.getAccountNumber());
		// Set photo path (already fetched)
		if (photo != null && !photo.isEmpty()) {
			createSavingsAccount.setPhoto(photo);
		}

		// Handle signature upload
		if (signature != null && !signature.isEmpty()) {
			createSavingsAccount.setSignature(signature);
		}

		if (jointPhoto != null && !jointPhoto.isEmpty()) {
			String jointPhotoFileName = saveFile(jointPhoto);
			createSavingsAccount.setJointPhoto(jointPhotoFileName);
		}

		if (newPhoto != null && !newPhoto.isEmpty()) {
			String newPhotoFileName = saveFile(newPhoto);
			createSavingsAccount.setNewPhoto(newPhotoFileName);
		}

		if (newSignature != null && !newSignature.isEmpty()) {
			String newSignatureFileName = saveFile(newSignature);
			createSavingsAccount.setNewSignature(newSignatureFileName);
			;
		}
		// Handle photo upload
		/*
		 * if (photo != null && !photo.isEmpty()) { try { String fileName1 =
		 * saveFile(photo); // Save the signature
		 * createSavingsAccount.setPhoto(fileName1); } catch (IOException e) { return
		 * ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "File upload failed"); }
		 * }
		 */

		// Handle signature upload
		/*
		 * if (signature != null && !signature.isEmpty()) { try { String fileName1 =
		 * saveFile1(signature); // Save the signature
		 * createSavingsAccount.setSignature(fileName1); } catch (IOException e) {
		 * return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR,
		 * "File upload failed"); } }
		 */

		// Save entity to the database
		CreateSavingsAccount saveSavingAccountDetails = createSavingAccountRepo.save(createSavingsAccount);

		if (isNew) {
			return ApiResponse.success(HttpStatus.CREATED,
					"Saved successfully. Director Name: " + saveSavingAccountDetails.getEnterCustomerName(),
					saveSavingAccountDetails);
		} else {
			return ApiResponse.success(HttpStatus.OK,
					"Updated successfully. Director Name: " + saveSavingAccountDetails.getEnterCustomerName(),
					saveSavingAccountDetails);
		}
	}

	private String saveFile(MultipartFile photo) throws IOException {
		// TODO Auto-generated method stub
		if (photo != null && !photo.isEmpty()) {
			ensureUploadDirectoryExists(); // Ensure the upload directory exists
			String fileName = System.currentTimeMillis() + "_" + photo.getOriginalFilename(); // Generate a unique //
																								// filename
			File destinationFile = new File(uploadDirectory + File.separator + fileName);

			try {
				photo.transferTo(destinationFile); // Save the file to the destination path
				System.out.println("File successfully saved at: " + destinationFile.getAbsolutePath());
				return fileName; // Return the saved file's name
			} catch (IOException e) {
				System.err.println("File saving failed: " + e.getMessage());
				throw e; // Rethrow the exception to handle errors
			}
		}
		return null;
	}

	/*
	 * private String saveFile1(MultipartFile signature) throws IOException { //
	 * TODO Auto-generated method stub if (signature != null &&
	 * !signature.isEmpty()) { ensureUploadDirectoryExists(); // Ensure the upload
	 * directory exists String fileName = System.currentTimeMillis() + "_" +
	 * signature.getOriginalFilename(); // Generate a unique // filename File
	 * destinationFile = new File(uploadDirectory + File.separator + fileName);
	 * 
	 * try { signature.transferTo(destinationFile); // Save the file to the
	 * destination path System.out.println("File successfully saved at: " +
	 * destinationFile.getAbsolutePath()); return fileName; // Return the saved
	 * file's name } catch (IOException e) {
	 * System.err.println("File saving failed: " + e.getMessage()); throw e; //
	 * Rethrow the exception to handle errors } } return null; }
	 */

	private void ensureUploadDirectoryExists() {
		File uploadDir = new File(uploadDirectory);
		if (!uploadDir.exists()) {
			boolean created = uploadDir.mkdirs();
			if (created) {
				System.out.println("Upload directory created at: " + uploadDirectory);
			} else {
				System.err.println("Failed to create upload directory: " + uploadDirectory);
			}
		}
	}

	public List<CreateSavingsAccount> fetchAllSavingAccountData() {
		// TODO Auto-generated method stub
		return createSavingAccountRepo.findAll();
	}

	public Optional<CreateSavingsAccount> findSavingAccountDataById(Long id) {
		// TODO Auto-generated method stub
		return createSavingAccountRepo.findById(id);
	}

	public boolean deleteFinancialYear(Long id) {
		if (createSavingAccountRepo.existsById(id)) {
			createSavingAccountRepo.deleteById(id);
			return true;
		}
		return false;
	}

	public Optional<SavingSchemeCatalog> findSavingSchmeCatalogById(Long id) {
		return savingSchmeCatalogRepo.findById(id);
	}

	public boolean deleteSavingSchemeCatalog(Long id) {
		if (savingSchmeCatalogRepo.existsById(id)) {
			savingSchmeCatalogRepo.deleteById(id);
			return true;
		}
		return false;
	}

	/*
	 * public List<CreateSavingsAccount> findAllByAccountNumber(String
	 * accountNumber) { List<CreateSavingsAccount> list =
	 * createSavingAccountRepo.findAllByAccountNumber(accountNumber); return list; }
	 */

	public SavingAccountActivity saveSavingAccountActivityData(SavingAccountActivity savingAccountActivity) {
		return savingAccountActivityRepo.save(savingAccountActivity);
	}

	public Optional<SavingAccountActivity> findSavingAccountActivityById(Long id) {
		return savingAccountActivityRepo.findById(id);
	}

	public List<SavingAccountActivity> findAllByAccountNumberSavingActivity(String accountNumber) {
		if (accountNumber == null || accountNumber.trim().isEmpty()) {
			return new ArrayList<>();
		}
		accountNumber = accountNumber.trim();

		Optional<CreateSavingsAccount> optAcc = createSavingAccountRepo.findByAccountNumber(accountNumber);
		if (!optAcc.isPresent()) {
			return savingAccountActivityRepo.findAllByAccountNumber(accountNumber);
		}
		CreateSavingsAccount acc = optAcc.get();

		// 1. Existing activities recorded in savingAccountActivityRepo
		List<SavingAccountActivity> existingActivities = savingAccountActivityRepo
				.findAllByAccountNumber(accountNumber);
		if (existingActivities == null) {
			existingActivities = new ArrayList<>();
		}

		// Clean up any duplicate loan disbursement activities recorded for the same
		// loan
		java.util.Map<String, SavingAccountActivity> seenLoanActivities = new java.util.HashMap<>();
		List<SavingAccountActivity> duplicateActivities = new ArrayList<>();
		for (SavingAccountActivity act : existingActivities) {
			String tFor = act.getTransactionFor() != null ? act.getTransactionFor().trim() : "";
			String comm = act.getComments() != null ? act.getComments().trim() : "";
			String tid = act.getSelectSavingTransactionId() != null ? act.getSelectSavingTransactionId().trim() : "";

			String loanKey = null;
			if (tFor.equalsIgnoreCase("Loan Disbursement") || comm.contains("Loan Disbursed")
					|| tid.startsWith("TXNLOAN_")) {
				java.util.regex.Matcher m = java.util.regex.Pattern.compile("LP\\d+").matcher(comm + " " + tid);
				if (m.find()) {
					loanKey = m.group();
				} else if (tid.startsWith("TXNLOAN_")) {
					loanKey = tid;
				}
			}
			if (loanKey != null) {
				if (seenLoanActivities.containsKey(loanKey)) {
					duplicateActivities.add(act);
				} else {
					seenLoanActivities.put(loanKey, act);
				}
			}
		}

		if (!duplicateActivities.isEmpty()) {
			for (SavingAccountActivity dup : duplicateActivities) {
				existingActivities.remove(dup);
				try {
					savingAccountActivityRepo.delete(dup);
					System.out.println(
							"Deleted duplicate loan activity ID " + dup.getId() + " for account " + accountNumber);
				} catch (Exception ex) {
					System.err.println("Error deleting duplicate loan activity: " + ex.getMessage());
				}
			}
		}

		// Ensure retained loan disbursement activities reflect netDisbursementAmount
		for (Map.Entry<String, SavingAccountActivity> entry : seenLoanActivities.entrySet()) {
			String loanKey = entry.getKey();
			SavingAccountActivity act = entry.getValue();
			if (loanKey.startsWith("LP")) {
				double netDisb = getNetDisbursementAmountForLoan(loanKey);
				if (netDisb > 0) {
					String expectedAmtStr = String.format(java.util.Locale.US, "%.2f", netDisb);
					double currentAmt = 0.0;
					try {
						currentAmt = Double.parseDouble(act.getTransactionAmount().trim());
					} catch (Exception ignored) {
					}
					if (Math.abs(currentAmt - netDisb) > 0.01) {
						act.setTransactionAmount(expectedAmtStr);
						try {
							savingAccountActivityRepo.save(act);
						} catch (Exception ignored) {
						}
					}
				}
			}
		}

		java.util.Set<String> existingTxnIds = new java.util.HashSet<>();
		for (SavingAccountActivity act : existingActivities) {
			if (act.getSelectSavingTransactionId() != null) {
				existingTxnIds.add(act.getSelectSavingTransactionId().trim());
			}
		}

		boolean newCreated = false;

		// 2. Check Member Registration / Account Opening Deposit
		boolean hasRegActivity = false;
		for (SavingAccountActivity act : existingActivities) {
			String c = act.getComments() != null ? act.getComments().toLowerCase() : "";
			String t = act.getTransactionFor() != null ? act.getTransactionFor().toLowerCase() : "";
			if (c.contains("member") || c.contains("opening") || c.contains("registration") || t.contains("member")
					|| t.contains("opening") || t.contains("registration")) {
				hasRegActivity = true;
				break;
			}
		}

		if (!hasRegActivity) {
			double openingAmt = 0.0;
			// Check member fees from customer master
			if (acc.getSelectByCustomer() != null && !acc.getSelectByCustomer().trim().isEmpty()) {
				List<addCustomer> custs = addcustomerRepo.findByMemberCode(acc.getSelectByCustomer().trim());
				if (custs != null && !custs.isEmpty() && custs.get(0).getMemberFees() != null) {
					try {
						openingAmt = Double.parseDouble(custs.get(0).getMemberFees().trim());
					} catch (Exception ignored) {
					}
				}
			}
			// If not from memberFees, check openingFees
			if (openingAmt <= 0 && acc.getOpeningFees() != null && !acc.getOpeningFees().trim().isEmpty()) {
				try {
					openingAmt = Double.parseDouble(acc.getOpeningFees().trim());
				} catch (Exception ignored) {
				}
			}
			// If still 0, check if account balance exists and no activities exist
			if (openingAmt <= 0 && existingActivities.isEmpty() && acc.getBalance() != null
					&& !acc.getBalance().trim().isEmpty()) {
				try {
					openingAmt = Double.parseDouble(acc.getBalance().trim());
				} catch (Exception ignored) {
				}
			}

			if (openingAmt > 0) {
				SavingAccountActivity regAct = new SavingAccountActivity();
				regAct.setSelectSavingTransactionId("TXN_REG_" + acc.getAccountNumber());
				regAct.setTransactionDate(acc.getOpeningDate() != null && !acc.getOpeningDate().trim().isEmpty()
						? acc.getOpeningDate().trim()
						: LocalDate.now().toString());
				regAct.setSelectBranchName(acc.getBranchName() != null ? acc.getBranchName().getBranchName() : "");
				regAct.setAccountNumber(accountNumber);
				regAct.setCustomerCode(acc.getSelectByCustomer());
				regAct.setCustomerName(acc.getEnterCustomerName());
				regAct.setContactNumber(acc.getContactNumber());
				regAct.setTransactionFor("Member Registration");
				regAct.setComments("Member Registration Fees / Opening Deposit");
				regAct.setTransactionType("Deposit");
				regAct.setTransactionAmount(String.format(java.util.Locale.US, "%.2f", openingAmt));
				regAct.setAverageBalance(String.format(java.util.Locale.US, "%.2f", openingAmt));
				regAct.setPayBy(acc.getModeOfPayment() != null ? acc.getModeOfPayment() : "Cash");
				regAct.setApproved(true);
				savingAccountActivityRepo.save(regAct);
				existingTxnIds.add(regAct.getSelectSavingTransactionId());
				newCreated = true;
			}
		}

		// 3. Fund Transfers: Debit (outflow)
		try {
			List<savingAccountFundTransfer> debitTransfers = savingAccFundTransferRepo
					.findByDebitAccountNumber(accountNumber);
			if (debitTransfers != null) {
				for (savingAccountFundTransfer ft : debitTransfers) {
					String txnId = "TXNFT_DR_" + ft.getId();
					if (!existingTxnIds.contains(txnId)) {
						SavingAccountActivity drAct = new SavingAccountActivity();
						drAct.setSelectSavingTransactionId(txnId);
						drAct.setTransactionDate(
								ft.getTransferDate() != null ? ft.getTransferDate() : LocalDate.now().toString());
						drAct.setSelectBranchName(ft.getDebitAccountBranch() != null ? ft.getDebitAccountBranch()
								: (acc.getBranchName() != null ? acc.getBranchName().getBranchName() : ""));
						drAct.setAccountNumber(accountNumber);
						drAct.setCustomerCode(ft.getDebitCustomerCode() != null ? ft.getDebitCustomerCode()
								: acc.getSelectByCustomer());
						drAct.setCustomerName(acc.getEnterCustomerName());
						drAct.setContactNumber(ft.getDebitContactNumber() != null ? ft.getDebitContactNumber()
								: acc.getContactNumber());
						drAct.setTransactionFor("Fund Transfer");
						String comm = "Fund Transfer to A/c "
								+ (ft.getCreditAccountNumber() != null ? ft.getCreditAccountNumber() : "");
						if (ft.getComment() != null && !ft.getComment().trim().isEmpty()) {
							comm += " (" + ft.getComment().trim() + ")";
						}
						drAct.setComments(comm);
						drAct.setTransactionType("Withdrawal");
						drAct.setTransactionAmount(ft.getAmount() != null ? ft.getAmount() : "0.00");
						drAct.setPayBy("Transfer");
						drAct.setApproved(true);
						savingAccountActivityRepo.save(drAct);
						existingTxnIds.add(txnId);
						newCreated = true;
					}
				}
			}
		} catch (Exception ex) {
			System.err.println("Error synchronizing debit fund transfers: " + ex.getMessage());
		}

		// 4. Fund Transfers: Credit (inflow)
		try {
			List<savingAccountFundTransfer> creditTransfers = savingAccFundTransferRepo
					.findByCreditAccountNumber(accountNumber);
			if (creditTransfers != null) {
				for (savingAccountFundTransfer ft : creditTransfers) {
					String txnId = "TXNFT_CR_" + ft.getId();
					if (!existingTxnIds.contains(txnId)) {
						SavingAccountActivity crAct = new SavingAccountActivity();
						crAct.setSelectSavingTransactionId(txnId);
						crAct.setTransactionDate(
								ft.getTransferDate() != null ? ft.getTransferDate() : LocalDate.now().toString());
						crAct.setSelectBranchName(ft.getCreditAccountBranch() != null ? ft.getCreditAccountBranch()
								: (acc.getBranchName() != null ? acc.getBranchName().getBranchName() : ""));
						crAct.setAccountNumber(accountNumber);
						crAct.setCustomerCode(ft.getCreditCustomerCode() != null ? ft.getCreditCustomerCode()
								: acc.getSelectByCustomer());
						crAct.setCustomerName(acc.getEnterCustomerName());
						crAct.setContactNumber(ft.getCreditContactNumber() != null ? ft.getCreditContactNumber()
								: acc.getContactNumber());
						crAct.setTransactionFor("Fund Transfer");
						String comm = "Fund Transfer from A/c "
								+ (ft.getDebitAccountNumber() != null ? ft.getDebitAccountNumber() : "");
						if (ft.getComment() != null && !ft.getComment().trim().isEmpty()) {
							comm += " (" + ft.getComment().trim() + ")";
						}
						crAct.setComments(comm);
						crAct.setTransactionType("Deposit");
						crAct.setTransactionAmount(ft.getAmount() != null ? ft.getAmount() : "0.00");
						crAct.setPayBy("Transfer");
						crAct.setApproved(true);
						savingAccountActivityRepo.save(crAct);
						existingTxnIds.add(txnId);
						newCreated = true;
					}
				}
			}
		} catch (Exception ex) {
			System.err.println("Error synchronizing credit fund transfers: " + ex.getMessage());
		}

		// 5. Loan Disbursements into Savings Account
		try {
			List<LoanPayment> loanPayments = loanPaymentRepo.findByAccountNo(accountNumber);
			if (loanPayments != null) {
				for (LoanPayment lp : loanPayments) {
					String pMode = lp.getPaymentMode() != null ? lp.getPaymentMode().trim() : "";
					if ("Saving Account".equalsIgnoreCase(pMode) || "Savings Account".equalsIgnoreCase(pMode)) {
						String loanId = lp.getLoanId() != null ? lp.getLoanId().trim() : "";
						String txnId = "TXNLOAN_" + (!loanId.isEmpty() ? loanId : lp.getId());

						boolean alreadyRecorded = false;
						for (SavingAccountActivity act : existingActivities) {
							String comm = act.getComments() != null ? act.getComments() : "";
							String tid = act.getSelectSavingTransactionId() != null ? act.getSelectSavingTransactionId()
									: "";
							if (!loanId.isEmpty() && (comm.contains(loanId) || tid.contains(loanId))) {
								alreadyRecorded = true;
								break;
							}
							if (tid.equals("TXNLOAN_" + lp.getId()) || tid.equals(txnId)) {
								alreadyRecorded = true;
								break;
							}
						}

						if (!alreadyRecorded && !existingTxnIds.contains(txnId)) {
							double netAmt = getNetDisbursementAmountForLoan(loanId);
							if (netAmt <= 0 && lp.getNetDisbursementAmount() != null
									&& !lp.getNetDisbursementAmount().trim().isEmpty()) {
								try {
									netAmt = Double.parseDouble(lp.getNetDisbursementAmount().trim());
								} catch (Exception ignored) {
								}
							}
							if (netAmt <= 0) {
								double gross = 0.0;
								try {
									gross = Double.parseDouble(lp.getLoanAmount());
								} catch (Exception ignored) {
								}
								double deds = 0.0;
								try {
									deds += Double.parseDouble(lp.getProcessingFee());
								} catch (Exception ignored) {
								}
								try {
									deds += Double.parseDouble(lp.getLegalCharges());
								} catch (Exception ignored) {
								}
								try {
									deds += Double.parseDouble(lp.getGst());
								} catch (Exception ignored) {
								}
								try {
									deds += Double.parseDouble(lp.getInsuranceFee());
								} catch (Exception ignored) {
								}
								try {
									deds += Double.parseDouble(lp.getValuationFees());
								} catch (Exception ignored) {
								}
								try {
									deds += Double.parseDouble(lp.getStationaryFee());
								} catch (Exception ignored) {
								}
								netAmt = (deds > 0 && gross > deds) ? (gross - deds) : gross;
							}

							SavingAccountActivity loanAct = new SavingAccountActivity();
							loanAct.setSelectSavingTransactionId(txnId);
							loanAct.setTransactionDate(
									lp.getPaymentDate() != null && !lp.getPaymentDate().trim().isEmpty()
											? lp.getPaymentDate()
											: (lp.getLoanDate() != null ? lp.getLoanDate()
													: LocalDate.now().toString()));
							loanAct.setSelectBranchName(lp.getBranchName() != null ? lp.getBranchName()
									: (acc.getBranchName() != null ? acc.getBranchName().getBranchName() : ""));
							loanAct.setAccountNumber(accountNumber);
							loanAct.setCustomerCode(
									lp.getMemberId() != null ? lp.getMemberId() : acc.getSelectByCustomer());
							loanAct.setCustomerName(
									lp.getMemberName() != null ? lp.getMemberName() : acc.getEnterCustomerName());
							loanAct.setContactNumber(acc.getContactNumber());
							loanAct.setTransactionFor("Loan Disbursement");
							String desc = "Loan Disbursed Credited - Loan ID: " + loanId;
							if (lp.getTypeOfLoan() != null && !lp.getTypeOfLoan().trim().isEmpty()) {
								desc += " (" + lp.getTypeOfLoan().trim() + ")";
							}
							loanAct.setComments(desc);
							loanAct.setTransactionType("Deposit");
							loanAct.setTransactionAmount(String.format(java.util.Locale.US, "%.2f", netAmt));
							loanAct.setPayBy("Loan Transfer");
							loanAct.setApproved(true);
							savingAccountActivityRepo.save(loanAct);
							existingTxnIds.add(txnId);
							existingActivities.add(loanAct);
							newCreated = true;
						}
					}
				}
			}
		} catch (Exception ex) {
			System.err.println("Error synchronizing loan disbursements: " + ex.getMessage());
		}

		// 6. SB Interest Credits
		try {
			List<SavingsInterestTransfer> interests = savingsInterestTransferRepo
					.findByAccountNumberOrderByToDateDesc(accountNumber);
			if (interests != null) {
				for (SavingsInterestTransfer sit : interests) {
					String txnId = "TXNINT_" + sit.getId();
					if (!existingTxnIds.contains(txnId)) {
						SavingAccountActivity intAct = new SavingAccountActivity();
						intAct.setSelectSavingTransactionId(txnId);
						intAct.setTransactionDate(sit.getToDate() != null ? sit.getToDate().toString()
								: (sit.getFromDate() != null ? sit.getFromDate().toString()
										: LocalDate.now().toString()));
						intAct.setSelectBranchName(
								acc.getBranchName() != null ? acc.getBranchName().getBranchName() : "");
						intAct.setAccountNumber(accountNumber);
						intAct.setCustomerCode(acc.getSelectByCustomer());
						intAct.setCustomerName(
								sit.getCustomerName() != null ? sit.getCustomerName() : acc.getEnterCustomerName());
						intAct.setContactNumber(acc.getContactNumber());
						intAct.setTransactionFor("Interest Credit");
						intAct.setComments(
								"SB Interest Credited (" + (sit.getFromDate() != null ? sit.getFromDate() : "") + " to "
										+ (sit.getToDate() != null ? sit.getToDate() : "") + ")");
						intAct.setTransactionType("Deposit");
						intAct.setTransactionAmount(
								sit.getInterestAmount() != null ? sit.getInterestAmount().toPlainString() : "0.00");
						intAct.setPayBy("System Interest");
						intAct.setApproved(true);
						savingAccountActivityRepo.save(intAct);
						existingTxnIds.add(txnId);
						newCreated = true;
					}
				}
			}
		} catch (Exception ex) {
			System.err.println("Error synchronizing SB interests: " + ex.getMessage());
		}

		// Re-fetch all activities if new ones were added
		List<SavingAccountActivity> allList;
		if (newCreated) {
			allList = savingAccountActivityRepo.findAllByAccountNumber(accountNumber);
		} else {
			allList = existingActivities;
		}

		if (allList == null) {
			allList = new ArrayList<>();
		}

		// Sort chronologically by transactionDate ascending, registration first on same
		// date, then id ascending
		allList.sort((a, b) -> {
			String d1 = a.getTransactionDate() != null ? a.getTransactionDate().trim() : "";
			String d2 = b.getTransactionDate() != null ? b.getTransactionDate().trim() : "";
			int dateCmp = d1.compareTo(d2);
			if (dateCmp != 0) {
				return dateCmp;
			}
			boolean aIsReg = (a.getSelectSavingTransactionId() != null
					&& a.getSelectSavingTransactionId().startsWith("TXN_REG_"))
					|| "Member Registration".equalsIgnoreCase(a.getTransactionFor());
			boolean bIsReg = (b.getSelectSavingTransactionId() != null
					&& b.getSelectSavingTransactionId().startsWith("TXN_REG_"))
					|| "Member Registration".equalsIgnoreCase(b.getTransactionFor());
			if (aIsReg && !bIsReg)
				return -1;
			if (!aIsReg && bIsReg)
				return 1;

			Long id1 = a.getId() != null ? a.getId() : 0L;
			Long id2 = b.getId() != null ? b.getId() : 0L;
			return id1.compareTo(id2);
		});

		// Calculate sequential running balance
		double runningBal = 0.0;
		for (SavingAccountActivity act : allList) {
			double amt = 0.0;
			try {
				if (act.getTransactionAmount() != null) {
					amt = Double.parseDouble(act.getTransactionAmount().trim());
				}
			} catch (Exception ignored) {
			}

			String tType = act.getTransactionType() != null ? act.getTransactionType().trim().toUpperCase() : "";
			if (tType.contains("DEPOSIT") || tType.contains("CREDIT")) {
				runningBal += amt;
			} else if (tType.contains("WITHDRAW") || tType.contains("DEBIT")) {
				runningBal -= amt;
			}
			act.setAverageBalance(String.format(java.util.Locale.US, "%.2f", runningBal));
		}

		// Keep CreateSavingsAccount balance in sync with verified running balance
		String calculatedBal = String.format(java.util.Locale.US, "%.2f", runningBal);
		if (!calculatedBal.equals(acc.getBalance())) {
			acc.setBalance(calculatedBal);
			createSavingAccountRepo.save(acc);
		}

		return allList;
	}

	public boolean updateAverageBalance(String accountNumber, String newBalance) {
		Optional<CreateSavingsAccount> optionalAccount = createSavingAccountRepo.findByAccountNumber(accountNumber);
		if (optionalAccount.isPresent()) {
			CreateSavingsAccount account = optionalAccount.get();
			account.setBalance(newBalance); // or use `setAverageBalance()` if that's your actual field
			createSavingAccountRepo.save(account);
			return true;
		}
		return false;
	}

	// Service for fetching the account numbers for passbook (vaibhav)
	public List<String> getAccountNumbersByType(String accountType) {
		List<CreateSavingsAccount> accounts;
		if (accountType != null && !accountType.trim().isEmpty()) {
			accounts = createSavingAccountRepo.findByTypeofaccountContainingIgnoreCaseAndIsApproved(accountType.trim(), false);
			if (accounts.isEmpty()) {
				String cleanType = accountType.replaceAll("\\s+", "").toLowerCase();
				accounts = createSavingAccountRepo.findAll().stream()
						.filter(acc -> acc.getTypeofaccount() != null
								&& acc.getTypeofaccount().replaceAll("\\s+", "").toLowerCase().contains(cleanType))
						.collect(Collectors.toList());
			}
		} else {
			accounts = createSavingAccountRepo.findAll();
		}

		return accounts.stream().map(CreateSavingsAccount::getAccountNumber).filter(Objects::nonNull).map(String::trim)
				.filter(s -> !s.isEmpty()).distinct().collect(Collectors.toList());
	}

	// Service for fetching the data according to the account number (vaibhav)
	public Optional<CreateSavingsAccount> getAccountByNumber(String accountNumber) {
		return createSavingAccountRepo.findByAccountNumber(accountNumber);
	}

	// janvi
	public List<CreateSavingsAccount> findAllApprovedByAccountNumber(String accountNumber) {
		// TODO Auto-generated method stub
		return createSavingAccountRepo.findAllByAccountNumberAndIsApprovedTrue(accountNumber);
	}

	public boolean existsByCustomerId(String customerId) {
		// TODO Auto-generated method stub
		return createSavingAccountRepo.existsBySelectByCustomer(customerId);
	}

	public savingAccountFundTransfer saveSavingAccountFundTransfer(savingAccountFundTransfer savingAccFundTransfer) {
		// TODO Auto-generated method stub
		return savingAccFundTransferRepo.save(savingAccFundTransfer);
	}

	public List<String> findBySchemeType() {
		// TODO Auto-generated method stub
		return savingSchmeCatalogRepo.findDistinctPolicyNames();
	}

	public savingsAccountCloser saveAccountCloseInfo(savingsAccountCloser accountCloser) {
		// TODO Auto-generated method stub
		return savingAccCloserRepo.save(accountCloser);
	}

	public List<CreateSavingsAccount> fetchSavingAccountDataSMSEnable(String startDate, String endDate) {
		return createSavingAccountRepo.findByIsApprovedTrueAndMessageSendAndOpeningDateBetween("1", startDate, endDate);
	}

//	private static final double SMS_CHARGE_PER_MONTH = 10.0; // Example charge
//	private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//
//	public double calculateBalanceAfterSmsCharges(CreateSavingsAccount account) {
//		try {
//			// Parse openingDate (String → LocalDate)
//			LocalDate openingDate = LocalDate.parse(account.getOpeningDate(), DATE_FORMAT);
//			LocalDate today = LocalDate.now();
//
//			// Calculate months passed
//			Period period = Period.between(openingDate, today);
//			int monthsPassed = period.getYears() * 12 + period.getMonths();
//
//			// Parse balance (String → double)
//			double balance = Double.parseDouble(account.getBalance());
//
//			// Deduct SMS charges
//			double totalCharges = monthsPassed * SMS_CHARGE_PER_MONTH;
//			double newBalance = balance - totalCharges;
//
//			return Math.max(newBalance, 0); // Prevent negative balance
//		} catch (Exception e) {
//			throw new RuntimeException("Invalid date or balance format", e);
//		}
//	}

	public Map<String, List<String>> getAccountNumbersByCustomers(List<String> customerCodes) {

		Map<String, List<String>> result = new HashMap<>();
		if (customerCodes == null || customerCodes.isEmpty())
			return result;

		for (String code : customerCodes) {
			// Remove spaces and newlines
			String cleanedCode = code.trim();
			if (cleanedCode.isEmpty())
				continue;

			List<CreateSavingsAccount> accounts = createSavingAccountRepo.findBySelectByCustomerIgnoreCase(cleanedCode);
			List<String> accountNumbers = accounts.stream().map(CreateSavingsAccount::getAccountNumber)
					.collect(Collectors.toList());

			// Put only if key not already present
			if (!result.containsKey(cleanedCode)) {
				result.put(cleanedCode, accountNumbers);
			}

			System.out.println("Accounts for " + cleanedCode + ": " + accountNumbers);
		}

		return result;
	}

	public List<CreateSavingsAccount> getAccountNumbersByCustomerCode(String selectByCustomer) {
		// TODO Auto-generated method stub
		return createSavingAccountRepo.findBySelectByCustomerIgnoreCase(selectByCustomer);
	}

	public List<SavingSchemeCatalog> fetchAllSavingSchemeCatalog() {
		try {
			List<SavingSchemeCatalog> list = savingSchmeCatalogRepo.findAll();
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public void updateSavingAccount(Long id, Map<String, Object> payload) {

		// 1️⃣ Existing record fetch karo
		SavingSchemeCatalog entity = savingSchmeCatalogRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("Saving account not found with id : " + id));

		// 2️⃣ JS payload ke fields set karo
		entity.setPolicyName((String) payload.get("policyName"));
		entity.setYearlyROI((String) payload.get("yearlyROI"));
		entity.setCustomerName((String) payload.get("customerName"));
		entity.setInitialDeposite((String) payload.get("initialDeposite"));
		entity.setMonthlyMinimumBalance((String) payload.get("monthlyMinimumBalance"));
		entity.setReservedFunds((String) payload.get("reservedFunds"));
		entity.setMessagingFees((String) payload.get("messagingFees"));
		entity.setMessagingInterval((String) payload.get("messagingInterval"));
		entity.setMonthlyFreeIFSCTransactions((String) payload.get("monthlyFreeIFSCTransactions"));
		entity.setFreeMoneyTransfers((String) payload.get("freeMoneyTransfers"));
		entity.setLimitperTransaction((String) payload.get("limitperTransaction"));
		entity.setDailyLimit((String) payload.get("dailyLimit"));
		entity.setWeeklyLimit((String) payload.get("weeklyLimit"));
		entity.setMonthlyLimit((String) payload.get("monthlyLimit"));
		entity.setServiceFee((String) payload.get("serviceFee"));
		entity.setBillingCycle((String) payload.get("billingCycle"));
		entity.setCardFee((String) payload.get("cardFee"));
		entity.setMonthlyCardLimit((String) payload.get("monthlyCardLimit"));
		entity.setYearlyCardLimit((String) payload.get("yearlyCardLimit"));

		// 3️⃣ Save → UPDATE
		savingSchmeCatalogRepo.save(entity);
	}

	public double deductSmsCharges(Long id, double balance, double smsCharge) {

		double newBalance = balance - smsCharge;

		CreateSavingsAccount acc = createSavingAccountRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("Account not found"));

		acc.setBalance(String.valueOf(newBalance));
		createSavingAccountRepo.save(acc);

		return newBalance;
	}

	public ApiResponse<SavingsInterestTransfer> transferInterest(SavingsInterestTransfer interest) {
		if (interest.getAccountNumber() == null || interest.getAccountNumber().trim().isEmpty()) {
			return ApiResponse.error(HttpStatus.BAD_REQUEST, "Account number is required");
		}

		// ===== DUPLICATE CHECK =====
		if (interest.getFromDate() != null && interest.getToDate() != null) {
			boolean alreadyTransferred = savingsInterestTransferRepo.existsByAccountNumberAndFromDateAndToDate(
					interest.getAccountNumber(), interest.getFromDate(), interest.getToDate());

			if (alreadyTransferred) {
				return ApiResponse.error(HttpStatus.CONFLICT, "Interest already transferred for account "
						+ interest.getAccountNumber() + " for this date range");
			}
		}

		// ===== FETCH MAIN SAVINGS ACCOUNT =====
		Optional<CreateSavingsAccount> optAcc = createSavingAccountRepo
				.findByAccountNumber(interest.getAccountNumber());
		if (!optAcc.isPresent()) {
			return ApiResponse.error(HttpStatus.NOT_FOUND, "Savings account not found: " + interest.getAccountNumber());
		}
		CreateSavingsAccount savingsAccount = optAcc.get();

		// Populate customerName / accountType if null
		if (interest.getCustomerName() == null || interest.getCustomerName().trim().isEmpty()) {
			interest.setCustomerName(savingsAccount.getEnterCustomerName());
		}
		if (interest.getAccountType() == null || interest.getAccountType().trim().isEmpty()) {
			interest.setAccountType(
					savingsAccount.getTypeofaccount() != null ? savingsAccount.getTypeofaccount() : "Saving Account");
		}

		// ===== CURRENT BALANCE (MAIN ACCOUNT) =====
		BigDecimal currentBalance = BigDecimal.ZERO;
		try {
			if (savingsAccount.getBalance() != null && !savingsAccount.getBalance().trim().isEmpty()) {
				currentBalance = new BigDecimal(savingsAccount.getBalance().trim());
			}
		} catch (Exception e) {
			currentBalance = BigDecimal.ZERO;
		}

		// ===== INTEREST RATE LOOKUP IF MISSING =====
		BigDecimal interestRate = interest.getInterestRate();
		if (interestRate == null || interestRate.compareTo(BigDecimal.ZERO) <= 0) {
			if (savingsAccount.getSelectByCustomer() != null) {
				List<addCustomer> custList = addcustomerRepo
						.findByMemberCode(savingsAccount.getSelectByCustomer().trim());
				if (!custList.isEmpty() && custList.get(0).getInterestPercent() != null) {
					try {
						interestRate = new BigDecimal(custList.get(0).getInterestPercent().trim());
					} catch (Exception ignored) {
						interestRate = BigDecimal.ZERO;
					}
				}
			}
		}
		if (interestRate == null) {
			interestRate = BigDecimal.ZERO;
		}
		interest.setInterestRate(interestRate);

		// ===== TOTAL DAYS CALCULATION =====
		Integer totalDays = interest.getTotalDays();
		if (totalDays == null || totalDays <= 0) {
			if (interest.getFromDate() != null && interest.getToDate() != null) {
				totalDays = (int) java.time.temporal.ChronoUnit.DAYS.between(interest.getFromDate(),
						interest.getToDate());
			}
			if (totalDays == null || totalDays <= 0) {
				totalDays = 90; // Default quarterly
			}
		}
		interest.setTotalDays(totalDays);

		// ===== INTEREST CALCULATION =====
		BigDecimal interestAmount = currentBalance.multiply(interestRate).multiply(BigDecimal.valueOf(totalDays))
				.divide(BigDecimal.valueOf(36500), 2, RoundingMode.HALF_UP);
		BigDecimal newBalance = currentBalance.add(interestAmount);
		interest.setCurrentBalance(currentBalance);
		interest.setInterestAmount(interestAmount);
		interest.setNewBalance(newBalance);

		SavingsInterestTransfer savedInterest = savingsInterestTransferRepo.save(interest);

		// ===== UPDATE MAIN ACCOUNT BALANCE =====
		savingsAccount.setBalance(newBalance.toString());
		createSavingAccountRepo.save(savingsAccount);

		// Proactively record interest in saving_account_activity
		try {
			SavingAccountActivity intAct = new SavingAccountActivity();
			intAct.setSelectSavingTransactionId("TXNINT_" + savedInterest.getId());
			intAct.setTransactionDate(savedInterest.getToDate() != null ? savedInterest.getToDate().toString()
					: (savedInterest.getFromDate() != null ? savedInterest.getFromDate().toString()
							: LocalDate.now().toString()));
			intAct.setSelectBranchName(
					savingsAccount.getBranchName() != null ? savingsAccount.getBranchName().getBranchName() : "");
			intAct.setAccountNumber(savingsAccount.getAccountNumber());
			intAct.setCustomerCode(savingsAccount.getSelectByCustomer());
			intAct.setCustomerName(savingsAccount.getEnterCustomerName());
			intAct.setContactNumber(savingsAccount.getContactNumber());
			intAct.setTransactionFor("Interest Credit");
			intAct.setComments(
					"SB Interest Credited (" + savedInterest.getFromDate() + " to " + savedInterest.getToDate() + ")");
			intAct.setTransactionType("Deposit");
			intAct.setTransactionAmount(interestAmount.toPlainString());
			intAct.setAverageBalance(newBalance.toString());
			intAct.setPayBy("System Interest");
			intAct.setApproved(true);
			savingAccountActivityRepo.save(intAct);
		} catch (Exception ex) {
			System.err.println("Failed to log interest activity: " + ex.getMessage());
		}

		return ApiResponse.success(HttpStatus.OK, "Interest transferred & main account balance updated successfully",
				savedInterest);
	}

	public ApiResponse<Map<String, Object>> transferInterestBatch(List<SavingsInterestTransfer> interestList) {
		if (interestList == null || interestList.isEmpty()) {
			return ApiResponse.error(HttpStatus.BAD_REQUEST, "No accounts selected for interest transfer");
		}

		int successCount = 0;
		int failedCount = 0;
		List<String> messages = new ArrayList<>();
		BigDecimal totalInterest = BigDecimal.ZERO;

		for (SavingsInterestTransfer item : interestList) {
			try {
				ApiResponse<SavingsInterestTransfer> res = transferInterest(item);
				if (res.getStatus() == HttpStatus.OK) {
					successCount++;
					if (res.getData() != null && res.getData().getInterestAmount() != null) {
						totalInterest = totalInterest.add(res.getData().getInterestAmount());
					}
				} else {
					failedCount++;
					messages.add(item.getAccountNumber() + ": " + res.getMessage());
				}
			} catch (Exception e) {
				failedCount++;
				messages.add(item.getAccountNumber() + ": " + e.getMessage());
			}
		}

		Map<String, Object> data = new HashMap<>();
		data.put("successCount", successCount);
		data.put("failedCount", failedCount);
		data.put("totalInterestTransferred", totalInterest);
		data.put("errors", messages);

		return ApiResponse.success(HttpStatus.OK,
				"Interest transfer completed: " + successCount + " successful, " + failedCount + " skipped/failed",
				data);
	}

	private double getNetDisbursementAmountForLoan(String loanId) {
		if (loanId == null || loanId.trim().isEmpty())
			return 0.0;
		try {
			if (loanApplicationRepo != null) {
				LoanApplication la = loanApplicationRepo.findFirstByLoanIdOrderByIdDesc(loanId.trim());
				if (la != null) {
					if (la.getNetDisbursementAmount() != null && !la.getNetDisbursementAmount().trim().isEmpty()) {
						try {
							return Double.parseDouble(la.getNetDisbursementAmount().trim());
						} catch (Exception ignored) {
						}
					}
					if (la.getDeductionDetails() != null
							&& la.getDeductionDetails().getNetDisbursementAmount() != null) {
						return la.getDeductionDetails().getNetDisbursementAmount().doubleValue();
					}
					if (la.getId() > 0 && loanDeductionDetailsRepo != null) {
						LoanDeductionDetails ded = loanDeductionDetailsRepo.findByLoanApplicationId(la.getId())
								.orElse(null);
						if (ded != null && ded.getNetDisbursementAmount() != null) {
							return ded.getNetDisbursementAmount().doubleValue();
						}
					}
					// Calculate gross - deductions
					double gross = 0.0;
					try {
						gross = Double.parseDouble(la.getLoanAmount());
					} catch (Exception ignored) {
					}
					double deds = 0.0;
					try {
						deds += Double.parseDouble(la.getProcessingFee());
					} catch (Exception ignored) {
					}
					try {
						deds += Double.parseDouble(la.getLegalCharges());
					} catch (Exception ignored) {
					}
					try {
						deds += Double.parseDouble(la.getGst());
					} catch (Exception ignored) {
					}
					try {
						deds += Double.parseDouble(la.getInsuranceFee());
					} catch (Exception ignored) {
					}
					try {
						deds += Double.parseDouble(la.getValuationFees());
					} catch (Exception ignored) {
					}
					try {
						deds += Double.parseDouble(la.getStationaryFee());
					} catch (Exception ignored) {
					}
					if (deds > 0 && gross > deds) {
						return gross - deds;
					} else if (gross > 0) {
						return gross;
					}
				}
			}
		} catch (Exception e) {
			System.err.println("Error resolving net disbursement amount for " + loanId + ": " + e.getMessage());
		}
		return 0.0;
	}

}