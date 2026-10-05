package com.microfinance.controller;

import java.io.IOException;
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
import com.microfinance.model.ExecutiveFounder;
import com.microfinance.model.FinancialYear;
import com.microfinance.model.ManageDepartment;
import com.microfinance.model.SavingAccountActivity;
import com.microfinance.model.SavingSchemeCatalog;
import com.microfinance.model.SavingsInterestTransfer;
import com.microfinance.model.states;
import com.microfinance.repository.CreateSavingAccountRepo;
import com.microfinance.repository.SavingAccountFundTransferRepo;
import com.microfinance.model.addCustomer;
import com.microfinance.model.addFinancialConsultant;
import com.microfinance.model.savingAccountFundTransfer;
import com.microfinance.model.savingsAccountCloser;
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
	SavingAccountFundTransferRepo savingAccountFundTransferRepo;

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

	// fetch all saving accouunt data
	@GetMapping("/getAllSavingAccountData")
	public ResponseEntity<ApiResponse<List<CreateSavingsAccount>>> fetchAllSavingAccountData() {
		List<CreateSavingsAccount> list = customersaving.fetchAllSavingAccountData();
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
	// janvi
	@GetMapping("/getallbyaccountnumber")
	public ResponseEntity<ApiResponse<List<CreateSavingsAccount>>> findAllByAccountNumber(
			@RequestParam String accountNumber) {

		List<CreateSavingsAccount> approvedAccounts = customersaving.findAllApprovedByAccountNumber(accountNumber);

		if (approvedAccounts == null || approvedAccounts.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse<>(HttpStatus.BAD_REQUEST, "First approve account", null));
		}

		return ResponseEntity
				.ok(new ApiResponse<>(HttpStatus.OK, "Fetch account details by account number", approvedAccounts));

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

		if (members != null && !members.isEmpty()) {
			ApiResponse<List<SavingAccountActivity>> response = ApiResponse.success(HttpStatus.OK,
					"Savings found for Customer Code: " + accountNumber, members);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			ApiResponse<List<SavingAccountActivity>> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"No saving customer found with this code");
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}
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

	//Ayush
	@PostMapping("/transferAmount")
	@Transactional
	public ResponseEntity<?> transferAmount(@RequestBody savingAccountFundTransfer savingAccFundTransfer) {

		try {

			// ==============================
			// 1. Basic Validation
			// ==============================

			if (savingAccFundTransfer == null) {
				Map<String, String> response = new HashMap<>();
				response.put("message", "Transfer data is required");
				return ResponseEntity.badRequest().body(response);
			}

			String debitAccountNo = savingAccFundTransfer.getDebitAccountNumber();

			String creditAccountNo = savingAccFundTransfer.getCreditAccountNumber();

			if (debitAccountNo == null || debitAccountNo.trim().isEmpty()) {
				Map<String, String> response = new HashMap<>();
				response.put("message", "Debit account number is required");
				return ResponseEntity.badRequest().body(response);
			}

			if (creditAccountNo == null || creditAccountNo.trim().isEmpty()) {
				Map<String, String> response = new HashMap<>();
				response.put("message", "Credit account number is required");
				return ResponseEntity.badRequest().body(response);
			}

			if (debitAccountNo.equals(creditAccountNo)) {
				Map<String, String> response = new HashMap<>();
				response.put("message", "Debit account and Credit account cannot be same");
				return ResponseEntity.badRequest().body(response);
			}

			// ==============================
			// 2. Validate Amount
			// ==============================

			if (savingAccFundTransfer.getAmount() == null || savingAccFundTransfer.getAmount().trim().isEmpty()) {

				Map<String, String> response = new HashMap<>();
				response.put("message", "Transfer amount is required");
				return ResponseEntity.badRequest().body(response);
			}

			double amount;

			try {

				amount = Double.parseDouble(savingAccFundTransfer.getAmount());

			} catch (NumberFormatException e) {

				Map<String, String> response = new HashMap<>();
				response.put("message", "Invalid transfer amount");
				return ResponseEntity.badRequest().body(response);
			}

			if (amount <= 0) {

				Map<String, String> response = new HashMap<>();
				response.put("message", "Transfer amount must be greater than zero");

				return ResponseEntity.badRequest().body(response);
			}

			// ==============================
			// 3. Find Debit Account
			// ==============================

			CreateSavingsAccount debitAccount = createSavingAccountRepo.findByAccountNumber(debitAccountNo)
					.orElseThrow(() -> new RuntimeException("Debit account not found"));

			// ==============================
			// 4. Find Credit Account
			// ==============================

			CreateSavingsAccount creditAccount = createSavingAccountRepo.findByAccountNumber(creditAccountNo)
					.orElseThrow(() -> new RuntimeException("Credit account not found"));

			// ==============================
			// 5. Get Current Balances
			// ==============================

			double debitBalance;

			double creditBalance;

			try {

				debitBalance = Double.parseDouble(debitAccount.getBalance());

			} catch (Exception e) {

				throw new RuntimeException("Invalid balance in debit account");
			}

			try {

				creditBalance = Double.parseDouble(creditAccount.getBalance());

			} catch (Exception e) {

				throw new RuntimeException("Invalid balance in credit account");
			}

			// ==============================
			// 6. Check Sufficient Balance
			// ==============================

			if (debitBalance < amount) {

				Map<String, String> response = new HashMap<>();

				response.put("message", "Insufficient balance in debit account");

				return ResponseEntity.badRequest().body(response);
			}

			// ==============================
			// 7. Calculate New Balances
			// ==============================

			double newDebitBalance = debitBalance - amount;

			double newCreditBalance = creditBalance + amount;

			// ==============================
			// 8. Update Debit Account
			// ==============================

			debitAccount.setBalance(String.valueOf(newDebitBalance));

			// ==============================
			// 9. Update Credit Account
			// ==============================

			creditAccount.setBalance(String.valueOf(newCreditBalance));

			// ==============================
			// 10. Save Updated Accounts
			// ==============================

			createSavingAccountRepo.save(debitAccount);

			createSavingAccountRepo.save(creditAccount);

			// ==============================
			// 11. Save Fund Transfer Record
			// ==============================

			savingAccountFundTransfer savedEntry = customersaving.saveSavingAccountFundTransfer(savingAccFundTransfer);

			// ==============================
			// 12. Success Response
			// ==============================

			Map<String, Object> response = new HashMap<>();

			response.put("message", "Fund transfer successful");

			response.put("debitAccount", debitAccountNo);

			response.put("creditAccount", creditAccountNo);

			response.put("amount", amount);

			response.put("debitBalance", newDebitBalance);

			response.put("creditBalance", newCreditBalance);

			response.put("transfer", savedEntry);

			return ResponseEntity.status(HttpStatus.CREATED).body(response);

		} catch (RuntimeException e) {

			Map<String, String> response = new HashMap<>();

			response.put("message", e.getMessage() != null ? e.getMessage() : "Transfer failed");

			return ResponseEntity.badRequest().body(response);

		} catch (Exception e) {

			Map<String, String> response = new HashMap<>();

			response.put("message", "Transfer failed: " + e.getMessage());

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	// Api For fetching account numbers (Vaibhav)
	@GetMapping("/fetchAccountNumbers")
	public ResponseEntity<ApiResponse<List<String>>> getAccountNumbersByType(@RequestParam String accountType) {
		List<String> accountNumbers = customersaving.getAccountNumbersByType(accountType);

		if (accountNumbers.isEmpty()) {
			ApiResponse<List<String>> response = ApiResponse.error(HttpStatus.NOT_FOUND, "No account numbers found.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
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
		ApiResponse<CreateSavingsAccount> response = ApiResponse.success(HttpStatus.OK, "Account fetched successfully.",
				account.get());
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

}
