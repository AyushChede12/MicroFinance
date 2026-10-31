package com.microfinance.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.microfinance.dto.ApiResponse;
import com.microfinance.dto.DateRangeRequest;
import com.microfinance.dto.ExecutiveFounderDto;
import com.microfinance.dto.FinancialConsultantDto;
import com.microfinance.dto.SavingAccountDto;
import com.microfinance.model.CategoryModule;
import com.microfinance.model.CreateSavingsAccount;
import com.microfinance.model.BranchModule;
import com.microfinance.model.ExecutiveFounder;
import com.microfinance.model.FinancialYear;
import com.microfinance.model.ManageDepartment;
import com.microfinance.model.SavingAccountActivity;
import com.microfinance.model.SavingSchemeCatalog;
import com.microfinance.model.SavingsInterestTransfer;
import com.microfinance.model.states;
import com.microfinance.repository.CreateSavingAccountRepo;
import com.microfinance.repository.SavingAccountFundTransferRepo;
import com.microfinance.repository.SavingsInterestTransferRepo;
import com.microfinance.model.addCustomer;
import com.microfinance.model.addFinancialConsultant;
import com.microfinance.model.savingAccountFundTransfer;
import com.microfinance.model.savingsAccountCloser;
import com.microfinance.model.BranchModule;
import com.microfinance.repository.CustomerRepo;
import com.microfinance.repository.BranchModuleRepo;
import com.microfinance.service.CustomerSavingsService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customersavings")
public class CustomerSavingsController {

	@Autowired
	CustomerSavingsService customersaving;

	@Autowired
	CreateSavingAccountRepo createSavingAccountRepo;

	@Autowired
	CreateSavingAccountRepo creSavingAccountRepo;

	@Autowired
	CustomerRepo customerRepo;

	@Autowired
	BranchModuleRepo branchModuleRepo;

	@Autowired
	SavingAccountFundTransferRepo savingAccountFundTransferRepo;

	@Autowired
	SavingsInterestTransferRepo savingsInterestTransferRepo;

	@Autowired
	com.microfinance.repository.SavingAccountActivityRepo savingAccountActivityRepo;

	@Value("${upload.directory}")
	private String uploadDirectory;

	// Save Saving Scheme Catalog
	@PostMapping("/savescheme")
	public ResponseEntity<ApiResponse<SavingSchemeCatalog>> saveSchemeCatalog(
			@RequestBody SavingSchemeCatalog savingSchemeCatalog) {
		boolean isSaved = customersaving.saveSavingScheme(savingSchemeCatalog);

		if (isSaved) {
			ApiResponse<SavingSchemeCatalog> response = ApiResponse.success(HttpStatus.OK,
					"Saving Scheme saved successfully.", savingSchemeCatalog);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<SavingSchemeCatalog> response = ApiResponse.error(HttpStatus.BAD_REQUEST,
					"Failed to save scheme.");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
	}

	// Fetching CustomerCode
	@RequestMapping(value = "/fetchCustomerCode", method = { org.springframework.web.bind.annotation.RequestMethod.POST, org.springframework.web.bind.annotation.RequestMethod.GET })
	public ApiResponse<List<addCustomer>> fetchByCustomerCode(
			@RequestBody(required = false) addCustomer addcustomer,
			@RequestParam(value = "memberCode", required = false) String memberCodeParam) {

		String memberCode = null;
		if (addcustomer != null && addcustomer.getMemberCode() != null && !addcustomer.getMemberCode().trim().isEmpty()) {
			memberCode = addcustomer.getMemberCode();
		} else if (memberCodeParam != null && !memberCodeParam.trim().isEmpty()) {
			memberCode = memberCodeParam;
		}

		if (memberCode == null || memberCode.trim().isEmpty()) {
			return ApiResponse.error(HttpStatus.BAD_REQUEST, "MEMBER CODE IS REQUIRED");
		}

		List<addCustomer> list = customersaving.fetchCustomerCode(memberCode.trim());
		if (list != null && !list.isEmpty()) {
			return ApiResponse.success(HttpStatus.FOUND, "FETCHING IS SUCCESSFUL", list);
		} else {
			return ApiResponse.error(HttpStatus.NOT_FOUND, "NO DATA FOUND FOR MEMBER CODE: " + memberCode);
		}
	}

	// Fetch Customers Filtered by Account Type (Saving vs Current)
	@GetMapping("/fetchCustomersByAccountType")
	public ResponseEntity<ApiResponse<List<addCustomer>>> fetchCustomersByAccountType(
			@RequestParam(value = "accountType", required = false) String accountType) {
		List<addCustomer> list = customersaving.fetchCustomersByAccountType(accountType);
		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "CUSTOMERS FETCHED SUCCESSFULLY", list));
	}

	// fetching saving scheme catalog data
	@GetMapping("/fetchsavingchemecatalog")
	public ApiResponse<List<String>> findBySchemeType() {
		List<String> list = customersaving.findBySchemeType();
		if (list != null && !list.isEmpty()) {
			return ApiResponse.success(HttpStatus.FOUND, "FETCHING IS SUCCESSFUL", list);
		} else {
			return ApiResponse.error(HttpStatus.NOT_FOUND, "NO DATA FOUND");
		}
	}

	// find saving scheme catalog by id
	@GetMapping("/getSavingSchemeCatalogById")
	public ResponseEntity<ApiResponse<SavingSchemeCatalog>> findSavingSchmeCatalogById(@RequestParam("id") Long id) {
		Optional<SavingSchemeCatalog> savingscheme = customersaving.findSavingSchmeCatalogById(id);
		if (savingscheme.isPresent()) {
			ApiResponse<SavingSchemeCatalog> response = new ApiResponse<>(HttpStatus.FOUND,
					"SAVING SCHEME CATALOG DATA FETCHED SUCCESSFULLY", savingscheme.get());
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<SavingSchemeCatalog> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"SAVING SCHEME CATALOG DATA NOT FOUND FOR ID: " + id, null);
			return ResponseEntity.status(404).body(response);
		}
	}

	// delete saving scheme catalog by id
	@PostMapping("/deleteSavingSchemeCatalogDataById")
	public ResponseEntity<ApiResponse<String>> deleteSavingSchemeCatalog(@RequestParam("id") Long id) {
		boolean isDeleted = customersaving.deleteSavingSchemeCatalog(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK,
					"SAVING SCHEME CATALOG DATA DELETED SUCCESSFULLY", "SUCCESS");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "DELETION FAILED", "FAILURE");
			return ResponseEntity.badRequest().body(response);
		}
	}

	// fetch policy name
	@GetMapping("/fetchpolicyname")
	public ApiResponse<List<SavingSchemeCatalog>> findByPolicyName(@RequestParam String policyName) {
		List<SavingSchemeCatalog> list = customersaving.findByPolicyName(policyName);
		if (list != null && !list.isEmpty()) {
			return ApiResponse.success(HttpStatus.FOUND, "FETCHING IS SUCCESSFUL", list);
		} else {
			return ApiResponse.error(HttpStatus.NOT_FOUND, "NO DATA FOUND");
		}
	}

	// fetch financial code
	@GetMapping("/fetchfinancialcode")
	public ApiResponse<List<addFinancialConsultant>> findByFinancialCode(@RequestParam String financialCode) {
		List<addFinancialConsultant> list = customersaving.findByFinancialCode(financialCode);
		if (list != null && !list.isEmpty()) {
			return ApiResponse.success(HttpStatus.FOUND, "FETCHING IS SUCCESSFUL", list);
		} else {
			return ApiResponse.error(HttpStatus.NOT_FOUND, "NO DATA FOUND");
		}
	}

	@PostMapping("/saveandupdatesavingaccount")
	public ResponseEntity<ApiResponse<CreateSavingsAccount>> saveSavingAccountDetails(
			@ModelAttribute SavingAccountDto savingAccountDto,
			@RequestParam(value = "photo", required = false) String photo,
			@RequestParam(value = "signature", required = false) String signature,
			@RequestParam(value = "jointPhoto", required = false) MultipartFile jointPhoto,
			@RequestParam(value = "newPhoto", required = false) MultipartFile newPhoto,
			@RequestParam(value = "newSignature", required = false) MultipartFile newSignature) throws IOException {

		// Nominee Age Validation: Must be more than 20 years to create/save Saving Account
		boolean isCurrent = "CURRENT".equalsIgnoreCase(savingAccountDto.getAccountType())
				|| "currentaccount".equalsIgnoreCase(savingAccountDto.getTypeofaccount());

		String nomineeAgeStr = savingAccountDto.getSuggestedNomineeAge();
		if (!isCurrent) {
			if (nomineeAgeStr == null || nomineeAgeStr.trim().isEmpty()) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(new ApiResponse<>(HttpStatus.BAD_REQUEST, "NOMINEE AGE IS REQUIRED AND MUST BE MORE THAN 20 YEARS", null));
			}
			try {
				double age = Double.parseDouble(nomineeAgeStr.trim());
				if (age <= 20) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST)
							.body(new ApiResponse<>(HttpStatus.BAD_REQUEST, "NOMINEE AGE MUST BE MORE THAN 20 YEARS (ENTER 21 OR ABOVE)", null));
				}
			} catch (NumberFormatException e) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(new ApiResponse<>(HttpStatus.BAD_REQUEST, "INVALID NOMINEE AGE ENTERED", null));
			}
		} else if (nomineeAgeStr != null && !nomineeAgeStr.trim().isEmpty()) {
			try {
				double age = Double.parseDouble(nomineeAgeStr.trim());
				if (age <= 20) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST)
							.body(new ApiResponse<>(HttpStatus.BAD_REQUEST, "NOMINEE AGE MUST BE MORE THAN 20 YEARS", null));
				}
			} catch (NumberFormatException e) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(new ApiResponse<>(HttpStatus.BAD_REQUEST, "INVALID NOMINEE AGE ENTERED", null));
			}
		}

		ApiResponse<CreateSavingsAccount> response = customersaving.saveSavingAccountDetails(savingAccountDto, photo,
				signature, jointPhoto, newPhoto, newSignature);

		if (response != null && response.getStatus() != null && response.getStatus().isError()) {
			return ResponseEntity.status(response.getStatus()).body(response);
		}

		boolean isUpdate = (savingAccountDto.getId() != null && savingAccountDto.getId() > 0);
		HttpStatus status = isUpdate ? HttpStatus.OK : HttpStatus.CREATED;
		String message = isUpdate ? "ACCOUNT DETAILS UPDATED SUCCESSFULLY" : "ACCOUNT DETAILS SAVED SUCCESSFULLY";

		return ResponseEntity.status(status).body(new ApiResponse<>(status, message, response.getData()));
	}

	// fetch all saving account data (with branch enrichment - batch optimized)
	@GetMapping("/getAllSavingAccountData")
	public ResponseEntity<ApiResponse<List<CreateSavingsAccount>>> fetchAllSavingAccountData() {
		List<CreateSavingsAccount> list = customersaving.fetchAllSavingAccountData();

		// Collect all member codes to enrich interestPercent, joining date, and branch
		List<String> memberCodes = list.stream()
				.filter(acc -> acc.getSelectByCustomer() != null && !acc.getSelectByCustomer().trim().isEmpty())
				.map(acc -> acc.getSelectByCustomer().trim()).distinct().collect(java.util.stream.Collectors.toList());

		// Look up latest interest transfer date for each account
		Map<String, LocalDate> latestTransferMap = new java.util.HashMap<>();
		try {
			List<Object[]> latestTransfers = savingsInterestTransferRepo.findLatestToDatePerAccount();
			for (Object[] row : latestTransfers) {
				if (row != null && row.length >= 2 && row[0] != null && row[1] != null) {
					Object rawDate = row[1];
					LocalDate dateVal = null;
					if (rawDate instanceof LocalDate) {
						dateVal = (LocalDate) rawDate;
					} else if (rawDate instanceof java.sql.Date) {
						dateVal = ((java.sql.Date) rawDate).toLocalDate();
					} else {
						try {
							dateVal = LocalDate.parse(rawDate.toString().trim());
						} catch (Exception ignored) {
						}
					}
					if (dateVal != null) {
						latestTransferMap.put(row[0].toString().trim(), dateVal);
					}
				}
			}
		} catch (Exception e) {
			System.err.println("Error fetching latest transfer dates: " + e.getMessage());
		}

		if (!memberCodes.isEmpty()) {
			// ONE query for all customers needed
			List<addCustomer> customers = customerRepo.findByMemberCodeIn(memberCodes);
			// ONE query for all branches
			List<BranchModule> allBranches = branchModuleRepo.findAll();

			// Build lookup map: memberCode -> customer
			Map<String, addCustomer> customerMap = new java.util.HashMap<>();
			for (addCustomer c : customers) {
				if (c.getMemberCode() != null) {
					customerMap.put(c.getMemberCode().trim(), c);
				}
			}

			// Build lookup map: branchName(lowercase) -> BranchModule
			Map<String, BranchModule> branchMap = new java.util.HashMap<>();
			for (BranchModule b : allBranches) {
				if (b.getBranchName() != null) {
					branchMap.put(b.getBranchName().trim().toLowerCase(), b);
				}
			}

			// Enrich in-memory - interestPercent, openingDate (joining date), branch, and
			// cycle dates
			for (CreateSavingsAccount acc : list) {
				String accNo = acc.getAccountNumber() != null ? acc.getAccountNumber().trim() : "";
				LocalDate lastDate = latestTransferMap.get(accNo);
				if (lastDate != null) {
					acc.setLastInterestTransferDate(lastDate.toString());
				}

				if (acc.getSelectByCustomer() != null) {
					addCustomer cust = customerMap.get(acc.getSelectByCustomer().trim());
					if (cust != null) {
						String interestPct = cust.getInterestPercent();
						if (interestPct == null || interestPct.trim().isEmpty()) {
							interestPct = "0";
						}
						acc.setInterestPercent(interestPct.trim());

						if (acc.getOpeningDate() == null || acc.getOpeningDate().trim().isEmpty()) {
							acc.setOpeningDate(cust.getSignupDate());
						}

						if (acc.getBranchName() == null && cust.getBranchName() != null
								&& !cust.getBranchName().trim().isEmpty()) {
							BranchModule matched = branchMap.get(cust.getBranchName().trim().toLowerCase());
							if (matched != null) {
								acc.setBranchName(matched);
							}
						}
					} else {
						acc.setInterestPercent("0");
					}
				} else {
					acc.setInterestPercent("0");
				}

				// Calculate next quarterly due date based on customer's individual cycle
				try {
					LocalDate cycleStart = null;
					if (lastDate != null) {
						cycleStart = lastDate;
					} else if (acc.getOpeningDate() != null && !acc.getOpeningDate().trim().isEmpty()) {
						String rawDate = acc.getOpeningDate().trim();
						if (rawDate.matches("^\\d{4}-\\d{2}-\\d{2}$")) {
							cycleStart = LocalDate.parse(rawDate);
						} else if (rawDate.matches("^\\d{2}-\\d{2}-\\d{4}$")) {
							String[] parts = rawDate.split("-");
							cycleStart = LocalDate.of(Integer.parseInt(parts[2]), Integer.parseInt(parts[1]),
									Integer.parseInt(parts[0]));
						} else if (rawDate.matches("^\\d{2}/\\d{2}/\\d{4}$")) {
							String[] parts = rawDate.split("/");
							cycleStart = LocalDate.of(Integer.parseInt(parts[2]), Integer.parseInt(parts[1]),
									Integer.parseInt(parts[0]));
						}
					}
					if (cycleStart != null) {
						LocalDate nextDue = cycleStart.plusMonths(3);
						acc.setNextInterestDueDate(nextDue.toString());
					}
				} catch (Exception ignored) {
				}
			}
		}

		ApiResponse<List<CreateSavingsAccount>> response = new ApiResponse<>(HttpStatus.FOUND,
				"Saving Account Data fetched successfully", list);
		return ResponseEntity.ok(response);
	}

	/*
	 * //fetch all saving account data by account number
	 * 
	 * @GetMapping("/getallbyaccountnumber") public
	 * ResponseEntity<ApiResponse<List<CreateSavingsAccount>>>
	 * findAllByAccountNumber(@RequestParam String accountNumber) {
	 * List<CreateSavingsAccount> list =
	 * customersaving.findAllByAccountNumber(accountNumber);
	 * ApiResponse<List<CreateSavingsAccount>> response = new
	 * ApiResponse<>(HttpStatus.FOUND, "Fetch account details by account number",
	 * list); return ResponseEntity.ok(response); }
	 */
	@GetMapping("/getallbyaccountnumber")
	public ResponseEntity<ApiResponse<List<CreateSavingsAccount>>> findAllByAccountNumber(
			@RequestParam String accountNumber) {

		List<CreateSavingsAccount> accounts = customersaving.findAllApprovedByAccountNumber(accountNumber);

		// Fallback: if not approved yet or empty, fetch by account number directly
		if (accounts == null || accounts.isEmpty()) {
			Optional<CreateSavingsAccount> accOpt = createSavingAccountRepo.findByAccountNumber(accountNumber);
			if (accOpt.isPresent()) {
				accounts = new ArrayList<>();
				accounts.add(accOpt.get());
			}
		}

		if (accounts == null || accounts.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(HttpStatus.NOT_FOUND,
					"NO SAVING / CURRENT ACCOUNT FOUND FOR ACCOUNT NUMBER: " + accountNumber, null));
		}

		// Enrich each account with customer master details if fields are missing
		for (CreateSavingsAccount acc : accounts) {
			if (acc.getSelectByCustomer() != null && !acc.getSelectByCustomer().trim().isEmpty()) {
				List<addCustomer> custs = customerRepo.findBymemberCode(acc.getSelectByCustomer().trim());
				if (custs != null && !custs.isEmpty()) {
					addCustomer cust = custs.get(0);
					if (acc.getEnterCustomerName() == null || acc.getEnterCustomerName().trim().isEmpty()) {
						acc.setEnterCustomerName(cust.getCustomerName());
					}
					if (acc.getContactNumber() == null || acc.getContactNumber().trim().isEmpty()) {
						acc.setContactNumber(cust.getContactNo());
					}
					if (acc.getBranchName() == null && cust.getBranchName() != null
							&& !cust.getBranchName().trim().isEmpty()) {
						String bName = cust.getBranchName().trim();
						List<BranchModule> allBranches = branchModuleRepo.findAll();
						BranchModule matched = allBranches.stream()
								.filter(b -> bName.equalsIgnoreCase(b.getBranchName())).findFirst()
								.orElseGet(() -> allBranches.stream()
										.filter(b -> b.getBranchName() != null
												&& b.getBranchName().toLowerCase().contains(bName.toLowerCase()))
										.findFirst().orElse(null));
						if (matched != null) {
							acc.setBranchName(matched);
						}
					}
				}
			}
		}

		return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "FETCH ACCOUNT DETAILS BY ACCOUNT NUMBER", accounts));
	}

	@GetMapping("/getSavingAccountDataById")
	public ResponseEntity<ApiResponse<CreateSavingsAccount>> findSavingAccountDataById(@RequestParam("id") Long id) {
		Optional<CreateSavingsAccount> fyear = customersaving.findSavingAccountDataById(id);
		if (fyear.isPresent()) {
			ApiResponse<CreateSavingsAccount> response = new ApiResponse<>(HttpStatus.FOUND,
					"SAVING ACCOUNT DATA FETCHED SUCCESSFULLY", fyear.get());
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<CreateSavingsAccount> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"SAVING ACCOUNT DATA NOT FOUND FOR ID: " + id, null);
			return ResponseEntity.status(404).body(response);
		}
	}

	@PostMapping("/deleteSavingAccountDataById")
	public ResponseEntity<ApiResponse<String>> deleteFinancialYear(@RequestParam("id") Long id) {
		boolean isDeleted = customersaving.deleteFinancialYear(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "SAVING ACCOUNT DATA DELETED SUCCESSFULLY",
					"SUCCESS");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "DELETION FAILED", "FAILURE");
			return ResponseEntity.badRequest().body(response);
		}
	}

	@PostMapping("/savesavingaccountactivity")
	public ResponseEntity<ApiResponse<SavingAccountActivity>> saveSavingAccountActivityData(
			@RequestBody SavingAccountActivity savingAccountActivity) {

		SavingAccountActivity savedSavingActivity = customersaving.saveSavingAccountActivityData(savingAccountActivity);
		ApiResponse<SavingAccountActivity> response = new ApiResponse<>(HttpStatus.CREATED,
				"SAVING ACCOUNT ACTIVITY DATA SAVED SUCCESSFULLY", savedSavingActivity);
		return ResponseEntity.ok(response);
	}

	// fetch all saving account Activity by account number

	@GetMapping("/getsavingaccountactivity")
	public ResponseEntity<ApiResponse<List<SavingAccountActivity>>> findAllByAccountNumberSavingActivity(
			@RequestParam String accountNumber) {

		List<SavingAccountActivity> members = customersaving.findAllByAccountNumberSavingActivity(accountNumber);
		if (members == null) {
			members = new ArrayList<>();
		}

		ApiResponse<List<SavingAccountActivity>> response = ApiResponse.success(HttpStatus.OK,
				"SAVING ACCOUNT ACTIVITY FETCHED SUCCESSFULLY", members);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	// update average balance of saving account by account number
	@PostMapping("/updateaveragebalance")
	public ResponseEntity<ApiResponse<String>> updateAverageBalance(
			@RequestBody CreateSavingsAccount createSavingsAccount) {
		String accountNumber = createSavingsAccount.getAccountNumber();
		String newBalance = createSavingsAccount.getBalance();

		boolean isUpdated = customersaving.updateAverageBalance(accountNumber, newBalance);

		if (isUpdated) {
			ApiResponse<String> response = ApiResponse.success(HttpStatus.OK, "AVERAGE BALANCE UPDATED SUCCESSFULLY",
					"UPDATED ACCOUNT: " + accountNumber);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			ApiResponse<String> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"ACCOUNT NUMBER NOT FOUND OR UPDATE FAILED");
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}
	}

	/*
	 * @PostMapping("/transferAmount")
	 * 
	 * @Transactional public ResponseEntity<?> transferAmount(
	 * 
	 * @RequestParam("debitAccountNo") String debitAccountNo,
	 * 
	 * @RequestParam("creditAccountNo") String creditAccountNo,
	 * 
	 * @RequestParam("amount") double amount,
	 * 
	 * @RequestBody savingAccountFundTransfer savingAccFundTransfer) { try {
	 * 
	 * CreateSavingsAccount debitAccount =
	 * createSavingAccountRepo.findByAccountNumber(debitAccountNo) .orElseThrow(()
	 * -> new RuntimeException("Debit account not found"));
	 * 
	 * CreateSavingsAccount creditAccount =
	 * createSavingAccountRepo.findByAccountNumber(creditAccountNo) .orElseThrow(()
	 * -> new RuntimeException("Credit account not found"));
	 * 
	 * double debitBalance = Double.parseDouble(debitAccount.getOpeningAmount());
	 * System.out.println("debitBalance" +debitBalance); double creditBalance =
	 * Double.parseDouble(creditAccount.getOpeningAmount());
	 * System.out.println("-creditBalance" +creditBalance);
	 * 
	 * 
	 * if (debitBalance < amount) { Map<String, String> response = new HashMap<>();
	 * response.put("message", "Insufficient balance in debit account"); return
	 * ResponseEntity.badRequest().body(response); }
	 * 
	 * // Update balances debitAccount.setOpeningAmount(String.valueOf(debitBalance
	 * - amount)); creditAccount.setOpeningAmount(String.valueOf(creditBalance +
	 * amount));
	 * 
	 * // Save changes createSavingAccountRepo.save(debitAccount);
	 * createSavingAccountRepo.save(creditAccount); Map<String, String> response =
	 * new HashMap<>(); response.put("message", "Amount transferred successfully");
	 * return ResponseEntity.ok(response);
	 * 
	 * } catch (Exception e) { Map<String, String> response = new HashMap<>();
	 * response.put("message", "Transfer failed: " + e.getMessage()); return
	 * ResponseEntity.badRequest().body(response); }
	 * 
	 * // Save the intra-transfer record savingAccountFundTransfer savedEntry =
	 * customersaving.saveSavingAccountFundTransfer(savingAccFundTransfer);
	 * 
	 * return new ResponseEntity<>(savedEntry, HttpStatus.CREATED); }
	 */

	/*
	 * @PostMapping("/transferAmount")
	 * 
	 * @Transactional public ResponseEntity<?> transferAmount(
	 * 
	 * @RequestParam("debitAccountNo") String debitAccountNo,
	 * 
	 * @RequestParam("creditAccountNo") String creditAccountNo,
	 * 
	 * @RequestParam("amount") double amount,
	 * 
	 * @RequestBody savingAccountFundTransfer savingAccFundTransfer) {
	 * 
	 * try { CreateSavingsAccount debitAccount =
	 * createSavingAccountRepo.findByAccountNumber(debitAccountNo) .orElseThrow(()
	 * -> new RuntimeException("Debit account not found"));
	 * 
	 * CreateSavingsAccount creditAccount =
	 * createSavingAccountRepo.findByAccountNumber(creditAccountNo) .orElseThrow(()
	 * -> new RuntimeException("Credit account not found"));
	 * 
	 * double debitBalance = Double.parseDouble(debitAccount.getOpeningAmount());
	 * double creditBalance = Double.parseDouble(creditAccount.getOpeningAmount());
	 * 
	 * if (debitBalance < amount) { Map<String, String> response = new HashMap<>();
	 * response.put("message", "Insufficient balance in debit account"); return
	 * ResponseEntity.badRequest().body(response); }
	 * 
	 * // Update balances debitAccount.setOpeningAmount(String.valueOf(debitBalance
	 * - amount)); creditAccount.setOpeningAmount(String.valueOf(creditBalance +
	 * amount));
	 * 
	 * // Save updated accounts createSavingAccountRepo.save(debitAccount);
	 * createSavingAccountRepo.save(creditAccount);
	 * 
	 * // Save the transfer record savingAccountFundTransfer savedEntry =
	 * customersaving.saveSavingAccountFundTransfer(savingAccFundTransfer);
	 * 
	 * // Send response return new ResponseEntity<>(savedEntry, HttpStatus.CREATED);
	 * 
	 * } catch (Exception e) { Map<String, String> response = new HashMap<>();
	 * response.put("message", "Transfer failed: " + e.getMessage()); return
	 * ResponseEntity.badRequest().body(response); } }
	 */

	// janvi 21/07
	@PostMapping("/transferAmount")
	@Transactional
	public ResponseEntity<?> transferAmount(@RequestBody savingAccountFundTransfer savingAccFundTransfer) {
		try {
			String debitAccountNo = savingAccFundTransfer.getDebitAccountNumber() != null
					? savingAccFundTransfer.getDebitAccountNumber().trim()
					: "";
			String creditAccountNo = savingAccFundTransfer.getCreditAccountNumber() != null
					? savingAccFundTransfer.getCreditAccountNumber().trim()
					: "";

			if (debitAccountNo.isEmpty()) {
				Map<String, String> response = new HashMap<>();
				response.put("message", "PLEASE SELECT A VALID DEBIT ACCOUNT NUMBER.");
				return ResponseEntity.badRequest().body(response);
			}

			if (creditAccountNo.isEmpty()) {
				Map<String, String> response = new HashMap<>();
				response.put("message", "PLEASE SELECT A VALID CREDIT ACCOUNT NUMBER.");
				return ResponseEntity.badRequest().body(response);
			}

			if (debitAccountNo.equalsIgnoreCase(creditAccountNo)) {
				Map<String, String> response = new HashMap<>();
				response.put("message", "DEBIT ACCOUNT AND CREDIT ACCOUNT CANNOT BE THE SAME.");
				return ResponseEntity.badRequest().body(response);
			}

			double amount = 0.0;
			try {
				amount = Double.parseDouble(savingAccFundTransfer.getAmount() != null ? savingAccFundTransfer.getAmount().trim() : "0");
			} catch (Exception e) {
				Map<String, String> response = new HashMap<>();
				response.put("message", "PLEASE ENTER A VALID NUMERIC TRANSFER AMOUNT.");
				return ResponseEntity.badRequest().body(response);
			}

			if (amount <= 0) {
				Map<String, String> response = new HashMap<>();
				response.put("message", "TRANSFER AMOUNT MUST BE GREATER THAN ZERO (₹ 0.00).");
				return ResponseEntity.badRequest().body(response);
			}

			// Fetch Debit Account
			CreateSavingsAccount debitAccount = createSavingAccountRepo.findByAccountNumber(debitAccountNo)
					.orElseThrow(() -> new RuntimeException("DEBIT ACCOUNT NOT FOUND: " + debitAccountNo));

			// Fetch Credit Account
			CreateSavingsAccount creditAccount = createSavingAccountRepo.findByAccountNumber(creditAccountNo)
					.orElseThrow(() -> new RuntimeException("CREDIT ACCOUNT NOT FOUND: " + creditAccountNo));

			// Status validations
			if ("0".equals(debitAccount.getAccountStatus())) {
				Map<String, String> response = new HashMap<>();
				response.put("message", "DEBIT ACCOUNT IS INACTIVE. TRANSACTIONS ARE NOT PERMITTED.");
				return ResponseEntity.badRequest().body(response);
			}
			if ("1".equals(debitAccount.getAccountFreeze())) {
				Map<String, String> response = new HashMap<>();
				response.put("message", "DEBIT ACCOUNT IS FROZEN. DEBIT TRANSACTIONS ARE STRICTLY BLOCKED.");
				return ResponseEntity.badRequest().body(response);
			}

			if ("0".equals(creditAccount.getAccountStatus())) {
				Map<String, String> response = new HashMap<>();
				response.put("message", "CREDIT ACCOUNT IS INACTIVE. TRANSACTIONS ARE NOT PERMITTED.");
				return ResponseEntity.badRequest().body(response);
			}
			if ("1".equals(creditAccount.getAccountFreeze())) {
				Map<String, String> response = new HashMap<>();
				response.put("message", "CREDIT ACCOUNT IS FROZEN. CREDIT TRANSACTIONS ARE STRICTLY BLOCKED.");
				return ResponseEntity.badRequest().body(response);
			}

			// Parse Balances
			double debitBalance = 0.0;
			try {
				debitBalance = Double.parseDouble(debitAccount.getBalance() != null ? debitAccount.getBalance().trim() : "0");
			} catch (Exception ignored) {}

			double creditBalance = 0.0;
			try {
				creditBalance = Double.parseDouble(creditAccount.getBalance() != null ? creditAccount.getBalance().trim() : "0");
			} catch (Exception ignored) {}

			// Determine Account Types (Saving vs Current)
			boolean isDebitCurrent = "CURRENT".equalsIgnoreCase(debitAccount.getAccountType())
					|| "currentaccount".equalsIgnoreCase(debitAccount.getTypeofaccount());
			boolean isCreditCurrent = "CURRENT".equalsIgnoreCase(creditAccount.getAccountType())
					|| "currentaccount".equalsIgnoreCase(creditAccount.getTypeofaccount());

			// Overdraft limit calculation for Current accounts
			double odLimit = 0.0;
			if (isDebitCurrent && debitAccount.getOverdraftLimit() != null && !debitAccount.getOverdraftLimit().trim().isEmpty()) {
				try {
					odLimit = Double.parseDouble(debitAccount.getOverdraftLimit().trim());
				} catch (Exception ignored) {}
			}

			double maxAvailable = isDebitCurrent ? (debitBalance + odLimit) : debitBalance;

			if (amount > maxAvailable) {
				Map<String, String> response = new HashMap<>();
				if (isDebitCurrent) {
					response.put("message", "INSUFFICIENT FUNDS IN CURRENT ACCOUNT. MAXIMUM AVAILABLE (INCLUDING OVERDRAFT LIMIT ₹ "
							+ String.format(java.util.Locale.US, "%.2f", odLimit) + ") IS ₹ "
							+ String.format(java.util.Locale.US, "%.2f", maxAvailable));
				} else {
					response.put("message", "INSUFFICIENT BALANCE IN SAVING ACCOUNT. AVAILABLE BALANCE IS ₹ "
							+ String.format(java.util.Locale.US, "%.2f", debitBalance) + ". OVERDRAFT IS NOT ALLOWED FOR SAVING ACCOUNTS.");
				}
				return ResponseEntity.badRequest().body(response);
			}

			// Update balances in both accounts
			double newDebitBalance = debitBalance - amount;
			double newCreditBalance = creditBalance + amount;

			debitAccount.setBalance(String.format(java.util.Locale.US, "%.2f", newDebitBalance));
			creditAccount.setBalance(String.format(java.util.Locale.US, "%.2f", newCreditBalance));

			createSavingAccountRepo.save(debitAccount);
			createSavingAccountRepo.save(creditAccount);

			// Enrich transfer record
			savingAccFundTransfer.setDebitAccountType(isDebitCurrent ? "CURRENT" : "SAVING");
			savingAccFundTransfer.setCreditAccountType(isCreditCurrent ? "CURRENT" : "SAVING");
			savingAccFundTransfer.setDebitAverageBalance(String.format(java.util.Locale.US, "%.2f", newDebitBalance));
			savingAccFundTransfer.setCreditAverageBalance(String.format(java.util.Locale.US, "%.2f", newCreditBalance));
			savingAccFundTransfer.setApproved(true);

			savingAccountFundTransfer savedEntry = customersaving.saveSavingAccountFundTransfer(savingAccFundTransfer);

			// Record Debit Activity for sender
			try {
				com.microfinance.model.SavingAccountActivity drAct = new com.microfinance.model.SavingAccountActivity();
				drAct.setSelectSavingTransactionId(
						"TXNFT_DR_" + (savedEntry != null ? savedEntry.getId() : System.currentTimeMillis()));
				drAct.setTransactionDate(
						savingAccFundTransfer.getTransferDate() != null ? savingAccFundTransfer.getTransferDate()
								: java.time.LocalDate.now().toString());
				drAct.setSelectBranchName(
						debitAccount.getBranchName() != null ? debitAccount.getBranchName().getBranchName() : "");
				drAct.setAccountNumber(debitAccount.getAccountNumber());
				drAct.setCustomerCode(debitAccount.getSelectByCustomer());
				drAct.setCustomerName(debitAccount.getEnterCustomerName());
				drAct.setContactNumber(debitAccount.getContactNumber());
				drAct.setTransactionFor("FUND TRANSFER");

				String drTypeLabel = isDebitCurrent ? "CURRENT A/C" : "SAVING A/C";
				String crTypeLabel = isCreditCurrent ? "CURRENT A/C" : "SAVING A/C";
				String drDesc = "FUND TRANSFER TO [" + crTypeLabel + "] A/C " + creditAccount.getAccountNumber();
				if (savingAccFundTransfer.getComment() != null && !savingAccFundTransfer.getComment().trim().isEmpty()) {
					drDesc += " (" + savingAccFundTransfer.getComment().trim().toUpperCase() + ")";
				}
				drAct.setComments(drDesc);
				drAct.setTransactionType("WITHDRAWAL");
				drAct.setTransactionAmount(String.format(java.util.Locale.US, "%.2f", amount));
				drAct.setAverageBalance(debitAccount.getBalance());
				drAct.setPayBy("TRANSFER");
				drAct.setApproved(true);
				savingAccountActivityRepo.save(drAct);

				// Record Credit Activity for receiver
				com.microfinance.model.SavingAccountActivity crAct = new com.microfinance.model.SavingAccountActivity();
				crAct.setSelectSavingTransactionId(
						"TXNFT_CR_" + (savedEntry != null ? savedEntry.getId() : System.currentTimeMillis()));
				crAct.setTransactionDate(
						savingAccFundTransfer.getTransferDate() != null ? savingAccFundTransfer.getTransferDate()
								: java.time.LocalDate.now().toString());
				crAct.setSelectBranchName(
						creditAccount.getBranchName() != null ? creditAccount.getBranchName().getBranchName() : "");
				crAct.setAccountNumber(creditAccount.getAccountNumber());
				crAct.setCustomerCode(creditAccount.getSelectByCustomer());
				crAct.setCustomerName(creditAccount.getEnterCustomerName());
				crAct.setContactNumber(creditAccount.getContactNumber());
				crAct.setTransactionFor("FUND TRANSFER");

				String crDesc = "FUND TRANSFER FROM [" + drTypeLabel + "] A/C " + debitAccount.getAccountNumber();
				if (savingAccFundTransfer.getComment() != null && !savingAccFundTransfer.getComment().trim().isEmpty()) {
					crDesc += " (" + savingAccFundTransfer.getComment().trim().toUpperCase() + ")";
				}
				crAct.setComments(crDesc);
				crAct.setTransactionType("DEPOSIT");
				crAct.setTransactionAmount(String.format(java.util.Locale.US, "%.2f", amount));
				crAct.setAverageBalance(creditAccount.getBalance());
				crAct.setPayBy("TRANSFER");
				crAct.setApproved(true);
				savingAccountActivityRepo.save(crAct);

				// Record AccountTransaction for Debit Account
				customersaving.recordAccountTransaction(
						debitAccount.getAccountNumber(),
						debitAccount.getEnterCustomerName(),
						debitAccount.getBranchName() != null ? debitAccount.getBranchName().getBranchName() : "",
						isDebitCurrent ? "CURRENT" : "SAVING",
						drAct.getTransactionDate(),
						"TRANSFER",
						0.0,
						amount,
						drDesc,
						"TRANSFER",
						drAct.getSelectSavingTransactionId(),
						newDebitBalance,
						"ADMIN"
				);

				// Record AccountTransaction for Credit Account
				customersaving.recordAccountTransaction(
						creditAccount.getAccountNumber(),
						creditAccount.getEnterCustomerName(),
						creditAccount.getBranchName() != null ? creditAccount.getBranchName().getBranchName() : "",
						isCreditCurrent ? "CURRENT" : "SAVING",
						crAct.getTransactionDate(),
						"TRANSFER",
						amount,
						0.0,
						crDesc,
						"TRANSFER",
						crAct.getSelectSavingTransactionId(),
						newCreditBalance,
						"ADMIN"
				);
			} catch (Exception actEx) {
				System.err.println("Failed to record fund transfer activities: " + actEx.getMessage());
			}

			return new ResponseEntity<>(savedEntry, HttpStatus.CREATED);

		} catch (Exception e) {
			Map<String, String> response = new HashMap<>();
			response.put("message", "TRANSFER FAILED: " + e.getMessage().toUpperCase());
			return ResponseEntity.badRequest().body(response);
		}
	}

	// Fetch all Fund Transfer history
	@GetMapping("/getAllFundTransfers")
	public ResponseEntity<ApiResponse<List<savingAccountFundTransfer>>> getAllFundTransfers() {
		List<savingAccountFundTransfer> list = savingAccountFundTransferRepo.findAll();
		if (list != null && list.size() > 1) {
			java.util.Collections.reverse(list);
		}
		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "FETCHED FUND TRANSFERS SUCCESSFULLY",
				list != null ? list : java.util.Collections.emptyList()));
	}

	// Api For fetching account numbers (Vaibhav)
	@GetMapping("/fetchAccountNumbers")
	public ResponseEntity<ApiResponse<List<String>>> getAccountNumbersByType(
			@RequestParam(required = false) String accountType) {
		List<String> accountNumbers = customersaving.getAccountNumbersByType(accountType);

		if (accountNumbers.isEmpty()) {
			ApiResponse<List<String>> response = ApiResponse.success(HttpStatus.OK, "No account numbers found.",
					new ArrayList<>());
			return ResponseEntity.ok(response);
		}

		ApiResponse<List<String>> response = ApiResponse.success(HttpStatus.OK, "Account numbers fetched successfully.",
				accountNumbers);
		return ResponseEntity.ok(response);
	}

	// Api for fetching the account details with the help of account number
	// (vaibhav)
	@GetMapping("/getDataByAccountNumber")
	public ResponseEntity<ApiResponse<CreateSavingsAccount>> getAccountByNumber(@RequestParam String accountNumber) {
		Optional<CreateSavingsAccount> account = customersaving.getAccountByNumber(accountNumber);

		// ✔️ Correct null check for Optional:
		if (!account.isPresent()) {
			ApiResponse<CreateSavingsAccount> response = ApiResponse.error(HttpStatus.NOT_FOUND, "Account not found.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}

		// ✔️ Use account.get() not Optional itself
		CreateSavingsAccount acc = account.get();
		if (acc.getSelectByCustomer() != null && !acc.getSelectByCustomer().trim().isEmpty()) {
			List<addCustomer> custs = customerRepo.findBymemberCode(acc.getSelectByCustomer().trim());
			if (custs != null && !custs.isEmpty()) {
				addCustomer cust = custs.get(0);
				if (acc.getEnterCustomerName() == null || acc.getEnterCustomerName().trim().isEmpty()) {
					acc.setEnterCustomerName(cust.getCustomerName());
				}
				if (acc.getContactNumber() == null || acc.getContactNumber().trim().isEmpty()) {
					acc.setContactNumber(cust.getContactNo());
				}
				if (acc.getAddress() == null || acc.getAddress().trim().isEmpty()) {
					acc.setAddress(cust.getCustomerAddress());
				}
				if (acc.getFamilyDetails() == null || acc.getFamilyDetails().trim().isEmpty()) {
					acc.setFamilyDetails(cust.getGuardianName());
				}
				if (acc.getBranchName() == null && cust.getBranchName() != null
						&& !cust.getBranchName().trim().isEmpty()) {
					String bName = cust.getBranchName().trim();
					List<BranchModule> allBranches = branchModuleRepo.findAll();
					BranchModule matched = allBranches.stream().filter(b -> bName.equalsIgnoreCase(b.getBranchName()))
							.findFirst()
							.orElseGet(() -> allBranches.stream()
									.filter(b -> b.getBranchName() != null
											&& b.getBranchName().toLowerCase().contains(bName.toLowerCase()))
									.findFirst().orElse(null));
					if (matched != null) {
						acc.setBranchName(matched);
					}
				}
			}
		}

		ApiResponse<CreateSavingsAccount> response = ApiResponse.success(HttpStatus.OK, "Account fetched successfully.",
				acc);
		return ResponseEntity.ok(response);
	}

	// Janvi : save fund transfer entry
	/*
	 * @PostMapping("/saveSavingAccountFundTransfer")
	 * 
	 * @ResponseBody public ResponseEntity<String>
	 * saveSavingAccountFundTransfer(@RequestBody savingAccountFundTransfer
	 * savingAccFundTransfer) { savingAccountFundTransfer fund =
	 * customersaving.saveSavingAccountFundTransfer(savingAccFundTransfer); if (fund
	 * != null) return ResponseEntity.ok("success"); else return
	 * ResponseEntity.badRequest().body("Failure"); }
	 */

	// janvi : Save Saving Acc Closer Data
	/*
	 * @PostMapping("/saveAccountCloseInfo") public
	 * ResponseEntity<savingsAccountCloser> saveAccountCloseInfo(@RequestBody
	 * savingsAccountCloser accountCloser) { // 1. Save the account close record
	 * savingsAccountCloser savedAccCloseEntry =
	 * customersaving.saveAccountCloseInfo(accountCloser);
	 * 
	 * return new ResponseEntity<>(savedAccCloseEntry, HttpStatus.CREATED); }
	 */

	@PostMapping("/saveAccountCloseInfo")
	public ResponseEntity<savingsAccountCloser> saveAccountCloseInfo(@RequestBody savingsAccountCloser accountCloser) {
		// 1. Save to savingsAccountCloser table
		savingsAccountCloser savedEntry = customersaving.saveAccountCloseInfo(accountCloser);

		// 2. Fetch the CreateSavingsAccount using Optional
		Optional<CreateSavingsAccount> optionalAccount = createSavingAccountRepo
				.findByAccountNumber(accountCloser.getAccountNumber());

		// 3. Delete if present
		if (optionalAccount.isPresent()) {
			createSavingAccountRepo.delete(optionalAccount.get());
		} else {
			// Optional: log or notify that account was not found for deletion
			System.out.println("No CreateSavingsAccount found for account number: " + accountCloser.getAccountNumber());
		}

		// 4. Return the saved entry
		return new ResponseEntity<>(savedEntry, HttpStatus.CREATED);
	}

	@PostMapping("/getSavingAccountDataSMSEnable")
	public ResponseEntity<ApiResponse<List<CreateSavingsAccount>>> fetchSavingAccountDataSMSEnable(
			@RequestBody DateRangeRequest request) {

		List<CreateSavingsAccount> list = customersaving.fetchSavingAccountDataSMSEnable(request.getStartDate(),
				request.getEndDate());

		ApiResponse<List<CreateSavingsAccount>> response = ApiResponse.success(HttpStatus.OK,
				"Data fetched successfully", list);

		return ResponseEntity.ok(response);
	}

	@PostMapping("/deduct-sms-charges")
	public Map<String, Object> deductSmsCharges(@RequestBody Map<String, Object> payload) {

		Long id = Long.valueOf(payload.get("id").toString());
		double balance = Double.parseDouble(payload.get("balance").toString());
		double smsCharge = Double.parseDouble(payload.get("smsCharge").toString());

		double newBalance = customersaving.deductSmsCharges(id, balance, smsCharge);

		Map<String, Object> res = new HashMap<>();
		res.put("newBalance", newBalance);
		return res;
	}

	@PostMapping("/getServiceChargeData")
	public ResponseEntity<ApiResponse<List<CreateSavingsAccount>>> getServiceChargeData(
			@RequestBody DateRangeRequest request) {

		List<CreateSavingsAccount> list = customersaving.getServiceChargeData(request.getStartDate(),
				request.getEndDate());

		ApiResponse<List<CreateSavingsAccount>> response = ApiResponse.success(HttpStatus.OK,
				"Data fetched successfully", list);

		return ResponseEntity.ok(response);
	}

	@PostMapping("/deduct-service-charges")
	public ResponseEntity<Map<String, Object>> deductServiceCharges(@RequestBody Map<String, Object> payload) {

		Long id = Long.valueOf(payload.get("id").toString());
		double newBalance = customersaving.deductServiceCharges(id);

		Map<String, Object> res = new HashMap<>();
		res.put("status", "OK");
		res.put("newBalance", newBalance);
		res.put("message", "Service Charge Successfully Deducted!");
		return ResponseEntity.ok(res);
	}

	@GetMapping("/getAccountNumbers")
	public ResponseEntity<ApiResponse<Map<String, List<String>>>> getAccountNumbers(
			@RequestParam List<String> selectByCustomer) {

		Map<String, List<String>> accountNumbersMap = customersaving.getAccountNumbersByCustomers(selectByCustomer);

		System.out.println("API Response for customers " + selectByCustomer + ": " + accountNumbersMap);

		ApiResponse<Map<String, List<String>>> response = new ApiResponse<>(HttpStatus.OK,
				"Account numbers fetched successfully", accountNumbersMap);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/getAccountNumbersByCode")
	public ApiResponse<List<CreateSavingsAccount>> getAccountNumbersByCode(@RequestParam String selectByCustomer) {

		List<CreateSavingsAccount> list = customersaving.getAccountNumbersByCustomerCode(selectByCustomer);
		if (list != null && !list.isEmpty()) {
			return ApiResponse.success(HttpStatus.FOUND, "Fetching is Successfull", list);
		} else {
			return ApiResponse.error(HttpStatus.NOT_FOUND, "Not Found fetching Data");
		}
	}

	@GetMapping("/fetchalllll")
	public ApiResponse<List<SavingSchemeCatalog>> fetchSavingSchemeCatalog() {
		List<SavingSchemeCatalog> list = customersaving.fetchAllSavingSchemeCatalog();
		if (list != null && !list.isEmpty()) {
			return ApiResponse.success(HttpStatus.FOUND, "Fetching is Successful", list);
		} else {
			return ApiResponse.error(HttpStatus.NOT_FOUND, "No Data Found");
		}
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateSavingAccount(@PathVariable Long id, @RequestBody Map<String, Object> payload) {

		customersaving.updateSavingAccount(id, payload);

		return ResponseEntity.ok("UPDATED");
	}

	@PostMapping("/transferInterest")
	public ResponseEntity<ApiResponse<SavingsInterestTransfer>> transferInterest(
			@RequestBody SavingsInterestTransfer interest) {

		ApiResponse<SavingsInterestTransfer> response = customersaving.transferInterest(interest);

		return ResponseEntity.status(response.getStatus()).body(response);
	}

	@PostMapping("/transferInterestBatch")
	public ResponseEntity<ApiResponse<Map<String, Object>>> transferInterestBatch(
			@RequestBody List<SavingsInterestTransfer> interestList) {

		ApiResponse<Map<String, Object>> response = customersaving.transferInterestBatch(interestList);

		return ResponseEntity.status(response.getStatus()).body(response);
	}

}