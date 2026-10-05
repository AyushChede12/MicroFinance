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
	@PostMapping("/fetchCustomerCode")
	public ApiResponse<List<addCustomer>> fetchByCustomerCode(@RequestBody addCustomer addcustomer) {
		List<addCustomer> list = customersaving.fetchCustomerCode(addcustomer.getMemberCode());
		if (list != null && !list.isEmpty()) {
			return ApiResponse.success(HttpStatus.FOUND, "Fetching is Successfull", list);
		} else
			return ApiResponse.error(HttpStatus.NOT_FOUND, "Not Found fetching Data");

	}

	// fetching saving scheme catalog data
	/*
	 * @GetMapping("/fetchsavingchemecatalog") public
	 * ApiResponse<List<SavingSchemeCatalog>> findBySchemeType() {
	 * List<SavingSchemeCatalog> list = customersaving.findBySchemeType();
	 * if(list!=null && !list.isEmpty()) { return
	 * ApiResponse.success(HttpStatus.FOUND, "Fetching is Successfull", list); }else
	 * return ApiResponse.error(HttpStatus.NOT_FOUND, "Not Found fetching Data");
	 * 
	 * }
	 */
	@GetMapping("/fetchsavingchemecatalog")
	public ApiResponse<List<String>> findBySchemeType() {
		List<String> list = customersaving.findBySchemeType();
		if (list != null && !list.isEmpty()) {
			return ApiResponse.success(HttpStatus.FOUND, "Fetching is Successful", list);
		} else {
			return ApiResponse.error(HttpStatus.NOT_FOUND, "No Data Found");
		}
	}

	// find saving scheme catalog by id
	@GetMapping("/getSavingSchemeCatalogById")
	public ResponseEntity<ApiResponse<SavingSchemeCatalog>> findSavingSchmeCatalogById(@RequestParam("id") Long id) {
		Optional<SavingSchemeCatalog> savingscheme = customersaving.findSavingSchmeCatalogById(id);
		if (savingscheme.isPresent()) {
			ApiResponse<SavingSchemeCatalog> response = new ApiResponse<>(HttpStatus.FOUND,
					"Saving Scheme Catalog Data fetched successfully", savingscheme.get());
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<SavingSchemeCatalog> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"Saving Scheme Catalog Data not found for ID: " + id, null);
			return ResponseEntity.status(404).body(response);
		}
	}

	// delete saving scheme catalog by id
	@PostMapping("/deleteSavingSchemeCatalogDataById")
	public ResponseEntity<ApiResponse<String>> deleteSavingSchemeCatalog(@RequestParam("id") Long id) {
		boolean isDeleted = customersaving.deleteSavingSchemeCatalog(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK,
					"Saving Scheme Catalog Data deleted successfully", "success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, " deletion failed", "failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	// fetch policy name
	@GetMapping("/fetchpolicyname")
	public ApiResponse<List<SavingSchemeCatalog>> findByPolicyName(@RequestParam String policyName) {
		List<SavingSchemeCatalog> list = customersaving.findByPolicyName(policyName);
		if (list != null && !list.isEmpty()) {
			return ApiResponse.success(HttpStatus.FOUND, "Fetching is Successfull", list);
		} else {
			return ApiResponse.error(HttpStatus.NOT_FOUND, "Not Found fetching Data");
		}
	}

	// fetch financial code
	@GetMapping("/fetchfinancialcode")
	public ApiResponse<List<addFinancialConsultant>> findByFinancialCode(@RequestParam String financialCode) {
		List<addFinancialConsultant> list = customersaving.findByFinancialCode(financialCode);
		if (list != null && !list.isEmpty()) {
			return ApiResponse.success(HttpStatus.FOUND, "Fetching is Successfull", list);
		} else {
			return ApiResponse.error(HttpStatus.NOT_FOUND, "Not Found fetching Data");
		}
	}

//  	//save saving account data
//    @PostMapping("/saveandupdatesavingaccount") 
//	public ResponseEntity<ApiResponse<CreateSavingsAccount>> saveSavingAccountDetails(@RequestBody CreateSavingsAccount createSavingsAccount) {
//    	CreateSavingsAccount savedEntity = customersaving.saveSavingAccountDetails(createSavingsAccount);
//		String message = (createSavingsAccount.getId() == null) ? "Saving Account Details Save successfully"
//				: "Saving Account Details updated successfully";
//		ApiResponse<CreateSavingsAccount> response = new ApiResponse<>(HttpStatus.OK, message, savedEntity);
//		return ResponseEntity.ok(response);
//	}

	@PostMapping("/saveandupdatesavingaccount")
	public ResponseEntity<ApiResponse<CreateSavingsAccount>> saveSavingAccountDetails(
			@ModelAttribute SavingAccountDto savingAccountDto,
			@RequestParam(value = "photo", required = false) String photo,
			@RequestParam(value = "signature", required = false) String signature,
			@RequestParam(value = "jointPhoto", required = false) MultipartFile jointPhoto,
			@RequestParam(value = "newPhoto", required = false) MultipartFile newPhoto,
			@RequestParam(value = "newSignature", required = false) MultipartFile newSignature) throws IOException

	{

		String customerId = savingAccountDto.getSelectByCustomer(); // assuming it's Long

		// Check for existing record before saving (only for new entries)
		if (savingAccountDto.getId() == null) {
			if (customersaving.existsByCustomerId(customerId)) {
				return ResponseEntity.status(HttpStatus.CONFLICT).body(
						new ApiResponse<>(HttpStatus.CONFLICT, "Customer already exists in saving account", null));
			}
		}

		ApiResponse<CreateSavingsAccount> response = customersaving.saveSavingAccountDetails(savingAccountDto, photo,
				signature, jointPhoto, newPhoto, newSignature);
		// return new ResponseEntity<>(response, response.getStatus());
		return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK,
				savingAccountDto.getId() != null ? "Data updated successfully" : "Data saved successfully",
				response.getData()));
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
					"No saving account found for account number: " + accountNumber, null));
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

		return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Fetch account details by account number", accounts));
	}

	@GetMapping("/getSavingAccountDataById")
	public ResponseEntity<ApiResponse<CreateSavingsAccount>> findSavingAccountDataById(@RequestParam("id") Long id) {
		Optional<CreateSavingsAccount> fyear = customersaving.findSavingAccountDataById(id);
		if (fyear.isPresent()) {
			ApiResponse<CreateSavingsAccount> response = new ApiResponse<>(HttpStatus.FOUND,
					"Saving Account Data fetched successfully", fyear.get());
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<CreateSavingsAccount> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"Saving Account Data not found for ID: " + id, null);
			return ResponseEntity.status(404).body(response);
		}
	}

	@PostMapping("/deleteSavingAccountDataById")
	public ResponseEntity<ApiResponse<String>> deleteFinancialYear(@RequestParam("id") Long id) {
		boolean isDeleted = customersaving.deleteFinancialYear(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Saving Account Data deleted successfully",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, " deletion failed", "failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	@PostMapping("/savesavingaccountactivity")
	public ResponseEntity<ApiResponse<SavingAccountActivity>> saveSavingAccountActivityData(
			@RequestBody SavingAccountActivity savingAccountActivity) {

		SavingAccountActivity savedSavingActivity = customersaving.saveSavingAccountActivityData(savingAccountActivity);
		ApiResponse<SavingAccountActivity> response = new ApiResponse<>(HttpStatus.CREATED,
				"Saving Account Activit Data saved successfully", savedSavingActivity);
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
				"Saving Account Activity fetched successfully", members);
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
			ApiResponse<String> response = ApiResponse.success(HttpStatus.OK, "Average balance updated successfully.",
					"Updated account: " + accountNumber);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			ApiResponse<String> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"Account number not found or update failed.");
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
			String debitAccountNo = savingAccFundTransfer.getDebitAccountNumber();
			String creditAccountNo = savingAccFundTransfer.getCreditAccountNumber();
			double amount = Double.parseDouble(savingAccFundTransfer.getAmount());

			// Check if there are any unapproved transactions for the sender
			List<savingAccountFundTransfer> unapprovedTransfers = savingAccountFundTransferRepo
					.findByDebitAccountNumberAndIsApproved(debitAccountNo, false);

			if (!unapprovedTransfers.isEmpty()) {
				return new ResponseEntity<>(
						"Previous transaction is pending approval. Complete approval before proceeding.",
						HttpStatus.FORBIDDEN);
			}

			CreateSavingsAccount debitAccount = createSavingAccountRepo.findByAccountNumber(debitAccountNo)
					.orElseThrow(() -> new RuntimeException("Debit account not found"));

			CreateSavingsAccount creditAccount = createSavingAccountRepo.findByAccountNumber(creditAccountNo)
					.orElseThrow(() -> new RuntimeException("Credit account not found"));

			double debitBalance = Double.parseDouble(debitAccount.getBalance());
			double creditBalance = Double.parseDouble(creditAccount.getBalance());

			if (debitBalance < amount) {
				Map<String, String> response = new HashMap<>();
				response.put("message", "Insufficient balance in debit account");
				return ResponseEntity.badRequest().body(response);
			}

			// Update balances
			debitAccount.setBalance(String.valueOf(debitBalance - amount));
			creditAccount.setBalance(String.valueOf(creditBalance + amount));

			// Save updated accounts
			createSavingAccountRepo.save(debitAccount);
			createSavingAccountRepo.save(creditAccount);

			// Save the transfer record
			savingAccountFundTransfer savedEntry = customersaving.saveSavingAccountFundTransfer(savingAccFundTransfer);

			// Proactively record Debit Activity for sender
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
				drAct.setTransactionFor("Fund Transfer");
				String drDesc = "Fund Transfer to A/c " + creditAccount.getAccountNumber();
				if (savingAccFundTransfer.getComment() != null
						&& !savingAccFundTransfer.getComment().trim().isEmpty()) {
					drDesc += " (" + savingAccFundTransfer.getComment().trim() + ")";
				}
				drAct.setComments(drDesc);
				drAct.setTransactionType("Withdrawal");
				drAct.setTransactionAmount(String.format(java.util.Locale.US, "%.2f", amount));
				drAct.setAverageBalance(debitAccount.getBalance());
				drAct.setPayBy("Transfer");
				drAct.setApproved(true);
				savingAccountActivityRepo.save(drAct);

				// Proactively record Credit Activity for receiver
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
				crAct.setTransactionFor("Fund Transfer");
				String crDesc = "Fund Transfer from A/c " + debitAccount.getAccountNumber();
				if (savingAccFundTransfer.getComment() != null
						&& !savingAccFundTransfer.getComment().trim().isEmpty()) {
					crDesc += " (" + savingAccFundTransfer.getComment().trim() + ")";
				}
				crAct.setComments(crDesc);
				crAct.setTransactionType("Deposit");
				crAct.setTransactionAmount(String.format(java.util.Locale.US, "%.2f", amount));
				crAct.setAverageBalance(creditAccount.getBalance());
				crAct.setPayBy("Transfer");
				crAct.setApproved(true);
				savingAccountActivityRepo.save(crAct);
			} catch (Exception actEx) {
				System.err.println("Failed to record fund transfer activities: " + actEx.getMessage());
			}

			// Send response
			return new ResponseEntity<>(savedEntry, HttpStatus.CREATED);

		} catch (Exception e) {
			Map<String, String> response = new HashMap<>();
			response.put("message", "Transfer failed: " + e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
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
