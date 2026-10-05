package com.microfinance.service;

import java.io.File;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
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

@Service
public class CustomerSavingsService {

	@Autowired
	SavingSchmeCatalogRepo savingSchmeCatalogRepo;

	@Autowired
	AddCustomerRepo addcustomerRepo;

	@Autowired
	FinancialConsultantRepo financialConsultantRepo;

	@Autowired
	CreateSavingAccountRepo createSavingAccountRepo;

	@Autowired
	SavingAccountActivityRepo savingAccountActivityRepo;

	@Autowired
	SavingAccountFundTransferRepo savingAccFundTransferRepo;

	@Autowired
	SavingAccountCloserRepo savingAccCloserRepo;

	@Autowired
	SavingsInterestTransferRepo savingsInterestTransferRepo;

	@Autowired
	BranchModuleRepo branchModuleRepo;

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
			boolean created = uploadDir.mkdirs(); // Create directories if they don't exist if (created) {
			System.out.println("Upload directory created at: " + uploadDirectory);
		} else {
			System.err.println("Failed to create upload directory: " + uploadDirectory);
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
		List<SavingAccountActivity> list = savingAccountActivityRepo.findAllByAccountNumber(accountNumber);
		return list;
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
		return createSavingAccountRepo.findByTypeofaccountContainingIgnoreCaseAndIsApproved(accountType.trim(), true)
				.stream().map(CreateSavingsAccount::getAccountNumber).filter(Objects::nonNull)
				.collect(Collectors.toList());
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
		// TODO Auto-generated method stub
		if (interest.getAccountNumber() == null || interest.getInterestRate() == null
				|| interest.getTotalDays() == null) {

			return ApiResponse.error(HttpStatus.BAD_REQUEST, "Required interest details are missing");
		}

		// ===== DUPLICATE CHECK =====
		boolean alreadyTransferred = savingsInterestTransferRepo.existsByAccountNumberAndFromDateAndToDate(
				interest.getAccountNumber(), interest.getFromDate(), interest.getToDate());

		if (alreadyTransferred) {
			return ApiResponse.error(HttpStatus.CONFLICT, "Interest already transferred for this date range");
		}

		// ===== FETCH MAIN SAVINGS ACCOUNT =====
		CreateSavingsAccount savingsAccount = createSavingAccountRepo.findByAccountNumber(interest.getAccountNumber())
				.orElseThrow(() -> new RuntimeException("Savings account not found"));

		// ===== CURRENT BALANCE (MAIN ACCOUNT) =====
		BigDecimal currentBalance = new BigDecimal(savingsAccount.getBalance());

		// ===== INTEREST CALCULATION =====
		BigDecimal interestAmount = currentBalance.multiply(interest.getInterestRate())
				.multiply(BigDecimal.valueOf(interest.getTotalDays()))
				.divide(BigDecimal.valueOf(36500), 2, RoundingMode.HALF_UP);
		BigDecimal newBalance = currentBalance.add(interestAmount);
		interest.setCurrentBalance(currentBalance);
		interest.setInterestAmount(interestAmount);
		interest.setNewBalance(newBalance);

		SavingsInterestTransfer savedInterest = savingsInterestTransferRepo.save(interest);

		// ===== UPDATE MAIN ACCOUNT BALANCE =====
		savingsAccount.setBalance(newBalance.toString());
		createSavingAccountRepo.save(savingsAccount);

		return ApiResponse.success(HttpStatus.OK, "Interest transferred & main account balance updated successfully",
				savedInterest);
	}

}