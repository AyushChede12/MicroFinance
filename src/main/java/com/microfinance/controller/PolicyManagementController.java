package com.microfinance.controller;

import java.time.LocalDate;
import java.util.HashMap;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.microfinance.dto.ApiResponse;
import com.microfinance.dto.PolicyManagementDto;
import com.microfinance.dto.PolicyPaymentDto;
import com.microfinance.dto.SavingAccountDto;
import com.microfinance.model.AddnewinvestmentPM;
import com.microfinance.model.CreateSavingsAccount;
import com.microfinance.model.DailyDepositPM;
import com.microfinance.model.DailyPremiumRenewalPM;
import com.microfinance.model.FixedDepositPM;
import com.microfinance.model.FlexibleRenewal;
import com.microfinance.model.FullMaturity;
import com.microfinance.model.MISDepositPM;
import com.microfinance.model.PolicyPayment;
import com.microfinance.model.PolicyRenewal;
import com.microfinance.model.RecurringDepositPM;
import com.microfinance.model.addCustomer;
import com.microfinance.repository.AddInvestmentRepo;
import com.microfinance.repository.DailyPremiumRenewalRepo;
import com.microfinance.repository.FlexibleRenewalRepo;
import com.microfinance.repository.PolicyRenewalRepo;
import com.microfinance.service.PolicyManagementService;

@RestController
@RequestMapping("/api/Policymangment")
public class PolicyManagementController {

	@Autowired
	private PolicyManagementService policyManagementService;

	@Autowired
	private AddInvestmentRepo addinvestmentrepo;

	@Autowired
	private PolicyRenewalRepo policyRenewalRepo;

	@Autowired
	private FlexibleRenewalRepo flexibleRenewalRepo;

	@Autowired
	private DailyPremiumRenewalRepo dailyPremiumRenewalRepo;

	// save daily Deposite
	@PostMapping("daily-depositsave")
	public ResponseEntity<ApiResponse<DailyDepositPM>> savedailyDeposite(@RequestBody DailyDepositPM dailyDepositPM) {
		boolean isSaved = policyManagementService.savedailydeposite(dailyDepositPM);

		if (isSaved) {
			ApiResponse<DailyDepositPM> response = ApiResponse.success(HttpStatus.CREATED,
					"Daily Deposite saved successfully", dailyDepositPM);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);

		} else {
			ApiResponse<DailyDepositPM> response = ApiResponse.error(HttpStatus.BAD_REQUEST,
					"Failed to save fixed deposit.");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

		}
	}

	@GetMapping("check-plan-name")
	public boolean checkPlanName(@RequestParam String planName) {

		return policyManagementService.planNameExists(planName);

	}

	// View All daily Deposits
	@GetMapping("daily-deposit/view")
	public ResponseEntity<ApiResponse<List<DailyDepositPM>>> getAlldailyDeposits() {
		List<DailyDepositPM> deposits = policyManagementService.getAlldailydepositedata();

		if (deposits != null && !deposits.isEmpty()) {
			ApiResponse<List<DailyDepositPM>> response = ApiResponse.success(HttpStatus.OK,
					"Daily deposits fetched successfully.", deposits);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			ApiResponse<List<DailyDepositPM>> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"No daily deposits found.");
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}
	}

// feacth by id daily deposite
	@GetMapping("dailyedit/{id}")
	public ResponseEntity<ApiResponse<DailyDepositPM>> getDailyDepositById(@PathVariable Long id) {
		DailyDepositPM deposit = policyManagementService.getDailyDepositById(id);

		if (deposit != null) {
			ApiResponse<DailyDepositPM> response = ApiResponse.success(HttpStatus.OK,
					"Daily deposit fetched successfully.", deposit);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<DailyDepositPM> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"Daily deposit not found for ID: " + id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

// update the deposite daily data
	@PostMapping("/dailyupdate/{id}")
	public ResponseEntity<ApiResponse<DailyDepositPM>> updateDailyDeposit(@PathVariable Long id,
			@RequestBody DailyDepositPM updatedData) {

		DailyDepositPM updated = policyManagementService.updateDailyDeposit(id, updatedData);

		if (updated != null) {
			ApiResponse<DailyDepositPM> response = ApiResponse.success(HttpStatus.OK,
					"Daily deposit updated successfully.", updated);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<DailyDepositPM> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"Daily deposit not found or failed to update.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// delete the data of the daily deposite
	@PostMapping("/dailydelete/{id}")
	public ResponseEntity<ApiResponse<Void>> deleteDailyDeposit(@PathVariable Long id) {
		boolean deleted = policyManagementService.deleteDailyDeposit(id);

		if (deleted) {
			ApiResponse<Void> response = ApiResponse.success(HttpStatus.OK, "Daily deposit deleted successfully.",
					null);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<Void> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"Daily deposit not found for ID: " + id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// Save Recurring Deposit
	@PostMapping("/recurring-depositsave")
	public ResponseEntity<ApiResponse<RecurringDepositPM>> saveRecurringDeposit(
			@RequestBody RecurringDepositPM recurringDepositPM) {
		boolean isSaved = policyManagementService.saveRecuringDailyDeposite(recurringDepositPM);
		System.out.println("Received Term: " + recurringDepositPM.getRdterm());

		if (isSaved) {
			ApiResponse<RecurringDepositPM> response = ApiResponse.success(HttpStatus.CREATED,
					"Recurring deposit saved successfully.", recurringDepositPM);
			return new ResponseEntity<>(response, HttpStatus.CREATED);
		} else {
			ApiResponse<RecurringDepositPM> response = ApiResponse.error(HttpStatus.BAD_REQUEST,
					"Failed to save recurring deposit.");
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}
	}

	// View All Recurring Deposits
	@GetMapping("/recurring-depositview")
	public ResponseEntity<ApiResponse<List<RecurringDepositPM>>> getAllRecurringDeposits() {
		List<RecurringDepositPM> deposits = policyManagementService.getAllData1();

		if (deposits != null && !deposits.isEmpty()) {
			ApiResponse<List<RecurringDepositPM>> response = ApiResponse.success(HttpStatus.OK,
					"Recurring deposits fetched successfully.", deposits);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			ApiResponse<List<RecurringDepositPM>> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"No recurring deposits found.");
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}
	}

	// GET BY ID reccuring deposite
	@GetMapping("/recurringedit/{id}")
	public ResponseEntity<ApiResponse<RecurringDepositPM>> getRecurringDepositById(@PathVariable Long id) {
		RecurringDepositPM deposit = policyManagementService.getRecurringDepositById(id);

		if (deposit != null) {
			ApiResponse<RecurringDepositPM> response = ApiResponse.success(HttpStatus.OK,
					"Recurring deposit fetched successfully.", deposit);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<RecurringDepositPM> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"Recurring deposit not found for ID: " + id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// Update reccuring deposite
	@PostMapping("/recurringupdate/{id}")
	public ResponseEntity<ApiResponse<RecurringDepositPM>> updateRecurringDeposit(@PathVariable Long id,
			@RequestBody RecurringDepositPM updatedData) {

		RecurringDepositPM updated = policyManagementService.updateRecurringDeposit(id, updatedData);

		if (updated != null) {
			ApiResponse<RecurringDepositPM> response = ApiResponse.success(HttpStatus.OK,
					"Recurring deposit updated successfully.", updated);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<RecurringDepositPM> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"Recurring deposit not found or failed to update.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// delete reccuring deposite
	@PostMapping("/recurringdelete/{id}")
	public ResponseEntity<ApiResponse<Void>> deleteRecurringDeposit(@PathVariable Long id) {
		boolean deleted = policyManagementService.deleteRecurringDeposit(id);

		if (deleted) {
			ApiResponse<Void> response = ApiResponse.success(HttpStatus.OK, "Recurring deposit deleted successfully.",
					null);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<Void> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"Recurring deposit not found for ID: " + id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// Save Fixed Deposit
	@PostMapping("/fixed-depositsave")
	public ResponseEntity<ApiResponse<FixedDepositPM>> saveFixedDeposit(@RequestBody FixedDepositPM fixedDepositPM) {
		boolean isSaved = policyManagementService.saveFixedDeposite(fixedDepositPM);

		if (isSaved) {
			ApiResponse<FixedDepositPM> response = ApiResponse.success(HttpStatus.CREATED,
					"Fixed deposit saved successfully.", fixedDepositPM);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} else {
			ApiResponse<FixedDepositPM> response = ApiResponse.error(HttpStatus.BAD_REQUEST,
					"Failed to save fixed deposit.");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
	}

	// View All Fixed Deposits
	@GetMapping("/fixed-depositview")
	public ResponseEntity<ApiResponse<List<FixedDepositPM>>> getAllFixedDeposits() {
		List<FixedDepositPM> deposits = policyManagementService.getAllFixeddata();

		if (deposits != null && !deposits.isEmpty()) {
			ApiResponse<List<FixedDepositPM>> response = ApiResponse.success(HttpStatus.OK,
					"Fixed deposits fetched successfully.", deposits);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			ApiResponse<List<FixedDepositPM>> response = ApiResponse.success(HttpStatus.OK, "No fixed deposits found.",
					java.util.Collections.emptyList());
			return new ResponseEntity<>(response, HttpStatus.OK);
		}
	}

	// fetch by id fixed deposit
	@GetMapping("/fixededit/{id}")
	public ResponseEntity<ApiResponse<FixedDepositPM>> getFixedDepositById(@PathVariable Long id) {
		FixedDepositPM deposit = policyManagementService.getFixedDepositById(id);

		if (deposit != null) {
			ApiResponse<FixedDepositPM> response = ApiResponse.success(HttpStatus.OK,
					"Fixed deposit fetched successfully.", deposit);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<FixedDepositPM> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"Fixed deposit not found for ID: " + id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// Update Fixed deposit
	@PostMapping("/fixedupdate/{id}")
	public ResponseEntity<ApiResponse<FixedDepositPM>> updateFixedDeposit(@PathVariable Long id,
			@RequestBody FixedDepositPM updatedData) {

		FixedDepositPM updated = policyManagementService.updateFixedDeposit(id, updatedData);

		if (updated != null) {
			ApiResponse<FixedDepositPM> response = ApiResponse.success(HttpStatus.OK,
					"Fixed deposit updated successfully.", updated);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<FixedDepositPM> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"Fixed deposit not found or failed to update.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// Delete fixed deposit
	@PostMapping("/fixeddelete/{id}")
	public ResponseEntity<ApiResponse<Void>> deleteFixedDeposit(@PathVariable Long id) {
		boolean deleted = policyManagementService.deleteFixedDeposit(id);

		if (deleted) {
			ApiResponse<Void> response = ApiResponse.success(HttpStatus.OK, "Fixed deposit deleted successfully.",
					null);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<Void> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"Fixed deposit not found for ID: " + id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// MIS Deposit save

	@PostMapping("/mis-deposit/save")
	public ResponseEntity<ApiResponse<MISDepositPM>> savemisdeposite(@RequestBody MISDepositPM misDepositPM) {
		boolean isSaved = policyManagementService.savemistdeposite(misDepositPM);
		if (isSaved) {
			ApiResponse<MISDepositPM> response = ApiResponse.success(HttpStatus.CREATED,
					"The MIS Deposite saved succesfully", misDepositPM);
			return new ResponseEntity<>(response, HttpStatus.CREATED);

		} else {
			ApiResponse<MISDepositPM> response = ApiResponse.error(HttpStatus.BAD_REQUEST,
					"Failed to save MIS deposit.");
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

	}

	// View All MIS Deposits
	@GetMapping("/mis-deposit/view")
	public ResponseEntity<ApiResponse<List<MISDepositPM>>> getAllMISDeposits() {
		List<MISDepositPM> deposits = policyManagementService.getAllMISDepositData();

		if (deposits != null && !deposits.isEmpty()) {
			ApiResponse<List<MISDepositPM>> response = ApiResponse.success(HttpStatus.OK,
					"MIS deposits fetched successfully.", deposits);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			ApiResponse<List<MISDepositPM>> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"No MIS deposits found.");
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}
	}

	// Get MIS deposit by ID
	@GetMapping("/misedit/{id}")
	public ResponseEntity<ApiResponse<MISDepositPM>> getMISDepositById(@PathVariable Long id) {
		MISDepositPM deposit = policyManagementService.getMISDepositById(id);

		if (deposit != null) {
			ApiResponse<MISDepositPM> response = ApiResponse.success(HttpStatus.OK, "MIS deposit fetched successfully.",
					deposit);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<MISDepositPM> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"MIS deposit not found for ID: " + id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}
	// Update MIS deposit

	@PostMapping("/misupdate/{id}")
	public ResponseEntity<ApiResponse<MISDepositPM>> updateMISDeposit(@PathVariable Long id,
			@RequestBody MISDepositPM updatedData) {

		MISDepositPM updated = policyManagementService.updateMISDeposit(id, updatedData);

		if (updated != null) {
			ApiResponse<MISDepositPM> response = ApiResponse.success(HttpStatus.OK, "MIS deposit updated successfully.",
					updated);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<MISDepositPM> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"MIS deposit not found or failed to update.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// Delete MIS deposit
	@DeleteMapping("/misdelete/{id}")
	public ResponseEntity<ApiResponse<Void>> deleteMISDeposit(@PathVariable Long id) {
		boolean deleted = policyManagementService.deleteMISDeposit(id);

		if (deleted) {
			ApiResponse<Void> response = ApiResponse.success(HttpStatus.OK, "MIS deposit deleted successfully.", null);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<Void> response = ApiResponse.error(HttpStatus.NOT_FOUND, "MIS deposit not found for ID: " + id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// Get Scheme Name by Scheme Term

	@GetMapping("/getSchemeNameBySchemeType")
	public Map<String, List<String>> getSchemeNameBySchemeType(
			@RequestParam(value = "drd", required = false) String drd,
			@RequestParam(value = "rd", required = false) String rd,
			@RequestParam(value = "fd", required = false) String fd,
			@RequestParam(value = "mis", required = false) String mis) {

		Map<String, List<String>> response = new HashMap<>();

		if (drd != null) {
			response.put("allBrands", policyManagementService.getSchemeNameBySchemeType(drd));
		}
		if (rd != null) {
			response.put("allRds", policyManagementService.getRRDBySchemeType(rd));
		}
		if (fd != null) {
			response.put("allFRDs", policyManagementService.getFRDBySchemeType(fd));
		}
		if (mis != null) {
			response.put("allMISRDs", policyManagementService.getMISRDBySchemeType(mis));
		}

		return response;
	}

	// view add new Investment details
	// Ashwini
	@GetMapping("/getaddinvestmentdetails")
	public ResponseEntity<ApiResponse<List<AddnewinvestmentPM>>> getAddInvestmentDetails() {
		List<AddnewinvestmentPM> invest = policyManagementService.getAddInvestmentDetails();

		if (invest != null && !invest.isEmpty()) {
			ApiResponse<List<AddnewinvestmentPM>> response = ApiResponse.success(HttpStatus.OK,
					"Investment Details fetched successfully.", invest);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			ApiResponse<List<AddnewinvestmentPM>> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"No Details found.");
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}
	}

	// fetch new investment details by BranchName
	// Ashwini

	@GetMapping("/getinvestmentdetails")
	public ResponseEntity<ApiResponse<List<AddnewinvestmentPM>>> findByBranch(@RequestParam String branchName) {
		List<AddnewinvestmentPM> invest = policyManagementService.findByBranch(branchName);

		ApiResponse<List<AddnewinvestmentPM>> response = new ApiResponse<>(HttpStatus.FOUND,
				"investment fetched successfully.", invest);
		return ResponseEntity.ok(response);

	}

	@GetMapping("/ddterm")
	public ResponseEntity<ApiResponse<DailyDepositPM>> getDDTermAndInterestRate(
			@RequestParam(name = "planNameDD", required = true) String planNameDD) {

		DailyDepositPM response = policyManagementService.getDDTermAndInterestRate(planNameDD);
		if (response != null) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Daily Deposit plan details found", response));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "Daily Deposit plan not found"));
		}
	}

	@GetMapping("/rdterm")
	public ResponseEntity<ApiResponse<RecurringDepositPM>> getRDTermAndInterestRate(
			@RequestParam(name = "planNameRD", required = true) String planNameRD) {

		RecurringDepositPM response = policyManagementService.getRDTermAndInterestRate(planNameRD);
		if (response != null) {
			return ResponseEntity
					.ok(ApiResponse.success(HttpStatus.OK, "Recurring Deposit plan details found", response));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "Recurring Deposit plan not found"));
		}
	}

	@GetMapping("/fdterm")
	public ResponseEntity<ApiResponse<FixedDepositPM>> getFDTermAndInterestRate(
			@RequestParam(name = "planNameFD", required = true) String planNameFD) {

		FixedDepositPM response = policyManagementService.getFDTermAndInterestRate(planNameFD);
		if (response != null) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Fixed Deposit plan details found", response));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "Fixed Deposit plan not found"));
		}
	}

	@GetMapping("/misterm")
	public ResponseEntity<?> getMISTermAndInterestRate(
			@RequestParam(name = "planNameMD", required = true) String planNameMD) {
		MISDepositPM response = policyManagementService.getMISTermAndInterestRate(planNameMD);
		if (response != null) {
			return ResponseEntity.ok(response);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Data not found");
		}
	}

	@PostMapping("/saveInvestment")
	public ResponseEntity<ApiResponse<AddnewinvestmentPM>> saveInvestment(@RequestBody AddnewinvestmentPM investment) {
		try {
			AddnewinvestmentPM savedInvestment = policyManagementService.saveInvestment(investment);
			ApiResponse<AddnewinvestmentPM> response = new ApiResponse<>(HttpStatus.OK,
					"✅ Investment saved successfully", savedInvestment);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace(); // Debugging only
			ApiResponse<AddnewinvestmentPM> errorResponse = new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR,
					"❌ Failed to save investment", null);
			return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getAllDDTerm") // Niraj
	public List<DailyDepositPM> getAllDDTerm() {
		List<DailyDepositPM> list = policyManagementService.getAllDDTerm();
		return list;
	}

	@GetMapping("/getAllRDPolicies")
	public ResponseEntity<ApiResponse<List<AddnewinvestmentPM>>> getAllRDPolicies() {
		List<AddnewinvestmentPM> rdPolicies = policyManagementService.getApprovedRDPolicies();

		ApiResponse<List<AddnewinvestmentPM>> response = new ApiResponse<>(HttpStatus.OK,
				"Approved RD policies fetched successfully", rdPolicies);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/getAllFDPolicies")
	public ResponseEntity<ApiResponse<List<AddnewinvestmentPM>>> getAllFDPolicies() {
		List<AddnewinvestmentPM> fdPolicies = policyManagementService.getApprovedFDPolicies();

		ApiResponse<List<AddnewinvestmentPM>> response = new ApiResponse<>(HttpStatus.OK,
				"Approved FD policies fetched successfully", fdPolicies);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/getAllDDPolicies")
	public ResponseEntity<ApiResponse<List<AddnewinvestmentPM>>> getAllDDPolicies() {
		List<AddnewinvestmentPM> ddPolicies = policyManagementService.getApprovedDDPolicies();

		ApiResponse<List<AddnewinvestmentPM>> response = new ApiResponse<>(HttpStatus.OK,
				"Approved DD policies fetched successfully", ddPolicies);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/getPolicyByPolicyCode")
	public ResponseEntity<ApiResponse<AddnewinvestmentPM>> getPolicyByPolicyCode(
			@RequestParam("policyCode") String policyCode) {
		Optional<AddnewinvestmentPM> optionalPolicy = policyManagementService.findByPolicyCode(policyCode);

		if (optionalPolicy.isPresent()) {
			ApiResponse<AddnewinvestmentPM> response = new ApiResponse<>(HttpStatus.OK, "Policy found successfully",
					optionalPolicy.get());
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<AddnewinvestmentPM> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"Policy not found for code: " + policyCode, null);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	@GetMapping("/getAllPolicyManagementData")
	public ResponseEntity<ApiResponse<List<AddnewinvestmentPM>>> getAllPolicyManagementData() {
		List<AddnewinvestmentPM> allPolicies = policyManagementService.getAllPolicyManagementData();

		ApiResponse<List<AddnewinvestmentPM>> response = new ApiResponse<>(HttpStatus.OK,
				"All policy management data fetched successfully", allPolicies);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/getNextPolicyCode")
	public ResponseEntity<String> getNextPolicyCode(@RequestParam String schemeType) {
		String prefix = schemeType.toUpperCase(); // e.g., RD, FD, DRD

		// Get the highest ID in the table
		Long maxId = addinvestmentrepo.findMaxId(); // Custom method
		long nextId = (maxId != null) ? maxId + 1 : 1;

		// Generate a unique part (timestamp or 4-digit random)
		String uniquePart = String.valueOf((int) (Math.random() * 9000) + 1000); // Random 4-digit number
		// Alternative: String uniquePart =
		// String.valueOf(System.currentTimeMillis()).substring(8); // Last 5 digits of
		// timestamp

		// Final policy code: e.g., RD-7284-0004
		String nextPolicyCode = String.format("%s-%s-%04d", prefix, uniquePart, nextId);

		return ResponseEntity.ok(nextPolicyCode);
	}

	private Double parseDoubleSafe(String value) {
		if (value == null || value.trim().isEmpty())
			return 0.0;
		return Double.parseDouble(value);
	}

	private Integer parseIntSafe(String value) {
		if (value == null || value.trim().isEmpty())
			return 0;
		return Integer.parseInt(value);
	}

	@PostMapping("/updateFDDueAndInstallment")
	public ResponseEntity<ApiResponse<String>> updateFDDueAndInstallment(@RequestBody Map<String, Object> data) {
		try {
			String policyCode = (String) data.get("policyCode");
			double policyAmount = Double.parseDouble(data.get("policyAmount").toString());
			int noOfInstallments = Integer.parseInt(data.get("noOfInstallments").toString());
			double totalDeposit = Double.parseDouble(data.get("totalDeposit").toString());
			double paymentDue = Double.parseDouble(data.get("paymentDue").toString());
			int noOfInstPaid = Integer.parseInt(data.get("noOfInstPaid").toString());

			Optional<AddnewinvestmentPM> optional = addinvestmentrepo.findByPolicyCode(policyCode);
			if (!optional.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(new ApiResponse<>(HttpStatus.NOT_FOUND, "Policy not found", null));
			}

			AddnewinvestmentPM investment = optional.get();

			int oldLastInstPaid = parseIntSafe(investment.getLastInstPaid());
			int todayInstallments = noOfInstallments;
			int updatedLastInstPaid = oldLastInstPaid + todayInstallments;

			// If policy fully paid already
			if (paymentDue <= 0) {
				return ResponseEntity
						.ok(new ApiResponse<>(HttpStatus.OK, "No payment needed. Policy is already settled.", null));
			}

			// Today's deposit
			double NetDeposit = policyAmount * noOfInstallments;

			// Updated values
//		        int updatedPaid = currentPaid + noOfInstallments;
			double updatedTotalDeposit = totalDeposit + NetDeposit;
			double updatedDue = paymentDue - NetDeposit;

			System.out.println("Payment Due :" + updatedDue);
			System.out.println("Deposite :" + updatedTotalDeposit);
			System.out.println("Last : " + noOfInstPaid);

			// Save updated values to AddnewinvestmentPM
			investment.setAmountDue(String.valueOf(updatedDue));
			investment.setLastInstPaid(String.valueOf(updatedLastInstPaid));
			investment.setPaidAmount(String.valueOf(updatedTotalDeposit));
			addinvestmentrepo.save(investment);

			// Save to PolicyRenewal
			FlexibleRenewal fRenewal = new FlexibleRenewal();
			fRenewal.setPolicyCode(investment.getPolicyCode());
			fRenewal.setRenewalDate(LocalDate.now().toString());
			fRenewal.setPolicyDate(investment.getPolicyStartDate());
			fRenewal.setMaturityDate(investment.getMaturityDate());
			fRenewal.setCustomerCode(investment.getMemberSelection());
			fRenewal.setClientName(investment.getCustomerName());
			fRenewal.setContactNo(investment.getContactNo());
			fRenewal.setPolicyAmount(parseDoubleSafe(investment.getPolicyAmount()));
			fRenewal.setPolicyType(investment.getSchemeType());
			fRenewal.setPolicyTerm(investment.getSchemeTerm());
			fRenewal.setBranchname(investment.getBranchName());
			fRenewal.setMaturityAmount(parseDoubleSafe(investment.getMaturityAmount()));
			fRenewal.setTotalDeposit(parseDoubleSafe(investment.getPaidAmount()));
			fRenewal.setPaymentDue(parseDoubleSafe(investment.getAmountDue()));
			fRenewal.setLastPaymentDate(investment.getLastPaymentDate());
			fRenewal.setDueDate(investment.getDueDate());
			fRenewal.setNoOfInst(parseIntSafe(investment.getNoOfInstallments()));
			fRenewal.setNoOfInstPaid(parseIntSafe(investment.getLastInstPaid()));
			fRenewal.setModeOfPayment(investment.getModeOfPayment());

			// >>>>>> MOST IMPORTANT FIX <<<<<<
			fRenewal.setNetDeposit(NetDeposit); // today's deposit
			System.out.println("Net Deposite :" + NetDeposit);

			flexibleRenewalRepo.save(fRenewal);

			// Final message based on updatedDue
			if (updatedDue == 0) {
				return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Policy is ready for maturity.", null));
			} else if (updatedDue < 0) {
				return ResponseEntity
						.ok(new ApiResponse<>(HttpStatus.OK, "No payment needed. Policy is overpaid.", null));
			} else {
				return ResponseEntity.ok(
						new ApiResponse<>(HttpStatus.OK, "Installment updated and renewal saved successfully", null));
			}

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
					new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, "Update failed: " + e.getMessage(), null));
		}
	}

	@GetMapping("/getApprovedPolicies")
	public ResponseEntity<ApiResponse<List<AddnewinvestmentPM>>> getApprovedPolicies() {
		List<AddnewinvestmentPM> approvedList = policyManagementService.getAllApprovedPolicies();

		if (approvedList.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse<>(HttpStatus.NOT_FOUND, "No approved policies found", null));
		}

		return ResponseEntity
				.ok(new ApiResponse<>(HttpStatus.OK, "Approved policies fetched successfully", approvedList));

		// return ResponseEntity.ok(response);

		// return ResponseEntity.ok(response);

	}

	@PostMapping("/updateinvestment")
	public ResponseEntity<ApiResponse<AddnewinvestmentPM>> updateInvestment(@RequestBody AddnewinvestmentPM invest) {
		AddnewinvestmentPM updated = policyManagementService.updateInstalmentDetails(invest.getPolicyCode(),
				invest.getDepositAmount());

		// Niraj Code Above

		if (updated != null) {
			ApiResponse<AddnewinvestmentPM> response = ApiResponse.success(HttpStatus.OK,
					"MIS deposit updated successfully.", updated);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<AddnewinvestmentPM> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"MIS deposit not found or failed to update.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	@GetMapping("/findPolicyData")
	public ResponseEntity<ApiResponse<?>> findPolicyData(@RequestParam String policyCode) {

		List<FlexibleRenewal> fdData = policyManagementService.findBypolicyCode(policyCode);
		if (!fdData.isEmpty()) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "FD data found", fdData));
		}

		List<DailyPremiumRenewalPM> drdData = policyManagementService.findDailyData(policyCode);
		if (!drdData.isEmpty()) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "DRD data found", drdData));
		}

		List<PolicyRenewal> renewalData = policyManagementService.findRenewalData(policyCode);
		if (!renewalData.isEmpty()) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "RD/MIS data found", renewalData));
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(ApiResponse.error(HttpStatus.NOT_FOUND, "No policy data found for policyCode: " + policyCode));
	}

	// Ayush
//	@PostMapping("/saveandupdateAddInvestment")
//	public ResponseEntity<ApiResponse<AddnewinvestmentPM>> saveandupdateAddInvestmentDetails(
//			@ModelAttribute PolicyManagementDto policyManagementDto,
//			@RequestParam(value = "image1", required = false) String image1,
//			@RequestParam(value = "image2", required = false) String image2) {
//
//		String customerCode = policyManagementDto.getMemberSelection(); // assuming it's Long
//
//		// Check for existing record before saving (only for new entries)
//		if (policyManagementDto.getId() == null && policyManagementService.existByMemberSelection(customerCode)) {
//			return ResponseEntity.status(HttpStatus.CONFLICT)
//					.body(new ApiResponse<>(HttpStatus.CONFLICT, "Customer already exists in Policy", null));
//		}
//
//		System.out.println("Received photo: " + image1);
//
//		System.out.println("Received signature: " + image2);
//
//		ApiResponse<AddnewinvestmentPM> response = policyManagementService
//				.saveandupdateAddInvestmentDetails(policyManagementDto, image1, image2);
//		// return new ResponseEntity<>(response, response.getStatus());
//		return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK,
//				policyManagementDto.getId() != null ? "✅ Investment Updated successfully"
//						: "✅ Investment saved successfully",
//				response.getData()));
//	}

	@PostMapping("/saveandupdateAddInvestment")
	public ResponseEntity<ApiResponse<AddnewinvestmentPM>> saveandupdateAddInvestment(

			@ModelAttribute PolicyManagementDto policyManagementDto,

			@RequestParam(value = "image1", required = false) String image1,

			@RequestParam(value = "image2", required = false) String image2) {

		try {

			ApiResponse<AddnewinvestmentPM> response = policyManagementService
					.saveandupdateAddInvestmentDetails(policyManagementDto, image1, image2);

			return new ResponseEntity<>(response, response.getStatus());

		} catch (Exception e) {

			e.printStackTrace();

			ApiResponse<AddnewinvestmentPM> errorResponse = new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR,
					"❌ Failed to save investment", null);

			return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getFullMaturityByPolicyCode")
	public ResponseEntity<ApiResponse<List<FullMaturity>>> fetchFullMaturityByPolicyCode(
			@RequestParam("policyCode") String policyCode) {

		List<FullMaturity> policyList = policyManagementService.fetchFullMaturityByPolicyCode(policyCode);

		if (!policyList.isEmpty()) {
			ApiResponse<List<FullMaturity>> response = new ApiResponse<>(HttpStatus.OK,
					"Payment Data found successfully", policyList);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<FullMaturity>> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"Payment Data not found for code: " + policyCode, null);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	@PostMapping("/deletePolicyDataById")
	public ResponseEntity<ApiResponse<String>> deletePolicyDataById(@RequestParam("id") Long id) {
		boolean isDeleted = policyManagementService.deletePolicyDataById(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Policy Data deleted successfully",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "Policy Data deletion failed",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	@GetMapping("/getApprovedRDFromFullMaturity")
	public ResponseEntity<ApiResponse<List<FullMaturity>>> getApprovedRD() {
		List<FullMaturity> approvedList = policyManagementService.getAllApprovedRDPolicies();

		if (approvedList.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse<>(HttpStatus.NOT_FOUND, "No approved policies found", null));
		}

		return ResponseEntity
				.ok(new ApiResponse<>(HttpStatus.OK, "Approved RD policies fetched successfully", approvedList));

	}

	// Ayush
	@GetMapping("/getAllRDPoliciesFromFullMaturity")
	public ResponseEntity<ApiResponse<List<FullMaturity>>> getAllRDPoliciesFromFullMaturity() {
		List<FullMaturity> rdPolicies = policyManagementService.getApprovedRDPoliciesFromFullMaturity();

		ApiResponse<List<FullMaturity>> response = new ApiResponse<>(HttpStatus.OK,
				"RD policies fetched successfully From Full Maturity", rdPolicies);

		return ResponseEntity.ok(response);
	}

	// Ayush
	@GetMapping("/getPolicyPayments/{policyCode}")
	public ResponseEntity<ApiResponse<List<PolicyPayment>>> getPolicyPayments(@PathVariable String policyCode) {

		try {

			ApiResponse<List<PolicyPayment>> response = policyManagementService.getPaymentsByPolicyCode(policyCode);

			return new ResponseEntity<>(response, response.getStatus());

		} catch (Exception e) {

			e.printStackTrace();

			ApiResponse<List<PolicyPayment>> errorResponse = new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR,
					"❌ Failed to fetch payment history", null);

			return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// Ayush
	@PostMapping("/saveDDPayment")
	public ResponseEntity<ApiResponse<PolicyPayment>> saveDDPayment(@RequestBody PolicyPaymentDto dto) {

		ApiResponse<PolicyPayment> response = policyManagementService.saveDDPayment(dto);

		return ResponseEntity.status(response.getStatus()).body(response);
	}

	// Ayush
	@PostMapping("/saveRDPayment")
	public ResponseEntity<ApiResponse<PolicyPayment>> saveRDPayment(@RequestBody PolicyPaymentDto dto) {

		ApiResponse<PolicyPayment> response = policyManagementService.saveRDPayment(dto);

		return ResponseEntity.status(response.getStatus()).body(response);
	}

	// Ayush
	@PostMapping("/saveFDPayment")
	public ResponseEntity<ApiResponse<PolicyPayment>> saveFDPayment(@RequestBody PolicyPaymentDto dto) {

		ApiResponse<PolicyPayment> response = policyManagementService.saveFDPayment(dto);

		return ResponseEntity.status(response.getStatus()).body(response);
	}

	//Ayush
	@GetMapping("/getPolicyByPolicyCodeForFD")
	public ResponseEntity<ApiResponse<AddnewinvestmentPM>> getPolicyByPolicyCodeForFD(@RequestParam String policyCode) {

		ApiResponse<AddnewinvestmentPM> response = policyManagementService.getPolicyByPolicyCodeForFD(policyCode);

		return ResponseEntity.status(response.getStatus()).body(response);
	}

}
