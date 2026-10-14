package com.microfinance.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.microfinance.dto.ApiResponse;
import com.microfinance.model.ApplyForGold;
import com.microfinance.model.EmiInstallmentPaymentGold;
import com.microfinance.model.GoldDirectory;
import com.microfinance.model.GoldLoanClose;
import com.microfinance.model.GoldLoanPayment;
import com.microfinance.model.LoanApplication;
import com.microfinance.model.LoanClosure;
import com.microfinance.model.LoanPayment;
import com.microfinance.model.LoanSchemCatalog;
import com.microfinance.model.PolicyRenewal;
import com.microfinance.model.SecuredGoldPlan;
import com.microfinance.model.addCustomer;
import com.microfinance.service.SecuredGoldLoanService;

@RestController
@RequestMapping("/api/securedGoldLoan")
public class SecuredGoldLoanController {

	@Autowired
	private SecuredGoldLoanService secureGoldLoanService;

	// by poonam for saving and updating Gold Secure Plan on 03/09/2025
	@PostMapping("/saveGoldSecurePlan")
	public ResponseEntity<ApiResponse<SecuredGoldPlan>> saveGoldSecurePlanData(@RequestBody SecuredGoldPlan goldLoan) {
		SecuredGoldPlan savedGoldLoan = secureGoldLoanService.saveLoanManagmentData(goldLoan);

		if (savedGoldLoan != null) {
			String message = (goldLoan.getId() != null) ? "DATA UPDATED SUCCESSFULLY" : "DATA SAVED SUCCESSFULLY";
			ApiResponse<SecuredGoldPlan> response = new ApiResponse<>(HttpStatus.OK, message, savedGoldLoan);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<SecuredGoldPlan> errorResponse = new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR,
					"FAILED TO SAVE OR UPDATE DATA", null);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
		}
	}

	@GetMapping("/allDataFetchGoldSecurePlan")
	public ResponseEntity<ApiResponse<List<SecuredGoldPlan>>> allDataFetchGoldSecurePlan() {
		List<SecuredGoldPlan> list = secureGoldLoanService.allDataFetchGoldSecurePlan();

		if (list != null && !list.isEmpty()) {
			ApiResponse<List<SecuredGoldPlan>> response = new ApiResponse<>(HttpStatus.OK,
					"GOLD SECURE PLAN FETCHED SUCCESSFULLY", list);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<SecuredGoldPlan>> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "NO DATA FOUND",
					null);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response);
		}
	}

	@GetMapping("/getGoldLoanByIdEdite")
	public ResponseEntity<ApiResponse<SecuredGoldPlan>> getLoanById(@RequestParam Long id) {
		SecuredGoldPlan goldLoan = secureGoldLoanService.getGoldLoanById(id);

		if (goldLoan != null) {
			// Success response
			ApiResponse<SecuredGoldPlan> response = new ApiResponse<>(

					HttpStatus.OK, "LOAN FETCHED SUCCESSFULLY", goldLoan);
			return ResponseEntity.ok(response);
		} else {
			// Failure response
			ApiResponse<SecuredGoldPlan> response = new ApiResponse<>(

					HttpStatus.NOT_FOUND, "GOLDLOAN NOT FOUND WITH ID: " + id, null);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	@PostMapping("/deleteGoldLoanById")
	public ResponseEntity<ApiResponse<SecuredGoldPlan>> deleteGoldLoan(@RequestParam Long id) {
		boolean deleted = secureGoldLoanService.deleteGoldLoanLoanById(id);

		if (deleted) {
			ApiResponse<SecuredGoldPlan> response = new ApiResponse<>(HttpStatus.OK, "GOLD LOAN DELETED SUCCESSFULLY",
					null);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<SecuredGoldPlan> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "GOLD LOAN NOT FOUND",
					null);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	@GetMapping("/getAllGoldDirectories")
	public ResponseEntity<ApiResponse<List<GoldDirectory>>> getAllGoldDirectories() {
		List<GoldDirectory> list = secureGoldLoanService.getAllGoldDirectories();

		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK,
				list.isEmpty() ? "NO RECORDS FOUND" : "RECORDS FETCHED SUCCESSFULLY", list));
	}

	@GetMapping("/getAllMembersForGoldLoan")
	public ResponseEntity<ApiResponse<List<addCustomer>>> getAllMembersforGold() {
		List<addCustomer> list = secureGoldLoanService.getAllCustomers();
		ApiResponse<List<addCustomer>> response = ApiResponse.success(HttpStatus.OK, "ALL MEMBERS FETCHED SUCCESSFULLY",
				list);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/getByMemberCodeGoldLoan")
	public ResponseEntity<ApiResponse<List<addCustomer>>> getGoldLoanByMemberCode(@RequestParam String memberCode) {
		try {
			List<addCustomer> customerList = secureGoldLoanService.getLoanApplicationById(memberCode);

			if (customerList == null || customerList.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(new ApiResponse<>(HttpStatus.NOT_FOUND, "NO CUSTOMER FOUND FOR MEMBER CODE", null));
			}

			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "CUSTOMER(S) FOUND", customerList));
		} catch (RuntimeException ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), null));
		}
	}

	// fetching data by using loanPlanName

	@GetMapping("/getLoanPlanNameApplyForGold")
	public ResponseEntity<ApiResponse<List<GoldDirectory>>> getLoanPlanNameApplyForGold(
			@RequestParam String loanPlanName) {
		try {
			List<GoldDirectory> goldLoanList = secureGoldLoanService
					.getLoanPlanNameApplyForGoldByLoanPlan(loanPlanName);

			if (goldLoanList == null || goldLoanList.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(new ApiResponse<>(HttpStatus.NOT_FOUND, "NO LOAN FOUND", null));
			}

			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "LOANPLAN FOUND", goldLoanList));
		} catch (RuntimeException ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), null));
		}
	}

	@PostMapping("/saveGoldDirectory")
	public ResponseEntity<ApiResponse<GoldDirectory>> saveGoldDirectory(@RequestBody GoldDirectory goldDirectory) {
		if (goldDirectory.getId() != 0) {
			return ResponseEntity.badRequest().body(
					ApiResponse.error(HttpStatus.BAD_REQUEST, "ID SHOULD NOT BE PROVIDED WHILE SAVING NEW RECORD"));
		}

		GoldDirectory saved = secureGoldLoanService.saveGoldDirectory(goldDirectory);

		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "DATA SAVED SUCCESSFULLY", saved));
	}

	@GetMapping("/getAllCustomers")
	public ResponseEntity<ApiResponse<List<addCustomer>>> getAllCustomers() {
		List<addCustomer> list = secureGoldLoanService.getAllCustomers();

		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK,
				list.isEmpty() ? "NO RECORDS FOUND" : "RECORDS FETCHED SUCCESSFULLY", list));
	}

	@GetMapping("/getByMemberCodeApplyForGold")
	public ResponseEntity<ApiResponse<List<GoldDirectory>>> getByMemberCodeApplyForGold(
			@RequestParam String customerCode) {
		try {
			List<GoldDirectory> goldLoanList = secureGoldLoanService
					.getByMemberCodeApplyForGoldByLoanPlan(customerCode);

			if (goldLoanList == null || goldLoanList.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(new ApiResponse<>(HttpStatus.NOT_FOUND, "NO LOAN FOUND", null));
			}

			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "LOANPLAN FOUND", goldLoanList));
		} catch (RuntimeException ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), null));
		}
	}

	@PostMapping("/saveApplyForGold")
	public ResponseEntity<ApiResponse<ApplyForGold>> saveApplyForGold(@RequestBody ApplyForGold applyForGold) {
		boolean isSaved = secureGoldLoanService.saveApplyForGoldData(applyForGold);

		if (isSaved) {
			ApiResponse<ApplyForGold> response = ApiResponse.success(HttpStatus.CREATED,
					"GOLD LOAN APPLICATION SAVED SUCCESSFULLY.", applyForGold);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<ApplyForGold> response = ApiResponse.error(HttpStatus.BAD_REQUEST,
					"FAILED TO SAVE GOLD LOAN APPLICATION.");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
	}

	@GetMapping("/getAllGoldLoanCustomer")
	public ResponseEntity<ApiResponse<List<ApplyForGold>>> getAllGoldLoanCustomer() {
		List<ApplyForGold> list = secureGoldLoanService.getAllGoldLoanCustomer();

		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK,
				list.isEmpty() ? "NO RECORDS FOUND" : "RECORDS FETCHED SUCCESSFULLY", list));
	}

	@PostMapping("/getByGoldIDforApproval")
	public ResponseEntity<ApiResponse<List<ApplyForGold>>> getByGoldIDforApproval(
			@RequestBody ApplyForGold applyForGold) {
		try {
			List<ApplyForGold> goldLoanList = secureGoldLoanService.getByGoldIDforApproval(applyForGold.getGoldID());

			if (goldLoanList == null || goldLoanList.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(new ApiResponse<>(HttpStatus.NOT_FOUND, "NO GOLD LOAN FOUND", null));
			}

			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "GOLDLOANPLAN FOUND", goldLoanList));
		} catch (RuntimeException ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), null));
		}
	}

	@PostMapping("/approveGold")
	public ResponseEntity<ApiResponse<ApplyForGold>> approveGoldLoan(@RequestBody ApplyForGold approval) {
		System.out.println("Approval request received for Gold Loan ID: " + approval.getGoldID());

		String result = secureGoldLoanService.approveGoldLoan(approval);

		switch (result) {
		case "already_approved":
			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "GOLD LOAN IS ALREADY APPROVED.", null));

		case "success":
			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "GOLD LOAN APPROVED SUCCESSFULLY.", approval));

		case "not_found":
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse<>(HttpStatus.NOT_FOUND, "GOLD LOAN NOT FOUND.", null));

		default:
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse<>(HttpStatus.BAD_REQUEST, "UNKNOWN ERROR OCCURRED.", null));
		}
	}

	@GetMapping("/getAllApprovedGoldCustomer")
	public ResponseEntity<ApiResponse<List<ApplyForGold>>> getApprovedGoldCustomer() {
		List<ApplyForGold> gold = secureGoldLoanService.getApprovedGoldCustomer();
		if (gold != null && !gold.isEmpty()) {

			ApiResponse<List<ApplyForGold>> response = new ApiResponse<>(HttpStatus.OK,
					"APPROVED GOLD DATA FETCHED SUCCESSFULLY.", gold);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<ApplyForGold>> response = new ApiResponse<>(HttpStatus.OK,
					"NO APPROVED POLICY RENEWAL FOUND.", java.util.Collections.emptyList());
			return ResponseEntity.ok(response);
		}
	}

	@GetMapping("/getAllNotApprovedGoldCustomer")
	public ResponseEntity<ApiResponse<List<ApplyForGold>>> getNotApprovedGoldCustomer() {
		List<ApplyForGold> gold = secureGoldLoanService.getNotApprovedGoldCustomer();
		if (gold != null && !gold.isEmpty()) {

			ApiResponse<List<ApplyForGold>> response = new ApiResponse<>(HttpStatus.OK,
					"APPROVED GOLD DATA FETCHED SUCCESSFULLY.", gold);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<ApplyForGold>> response = new ApiResponse<>(HttpStatus.OK,
					"NO UNAPPROVED GOLD CUSTOMER FOUND.", java.util.Collections.emptyList());
			return ResponseEntity.ok(response);
		}
	}

	@PostMapping("/closeGoldLoan")
	public ResponseEntity<ApiResponse<GoldLoanClose>> closeLoan(@RequestBody GoldLoanClose goldLoanCloseRequest) {

		try {
			GoldLoanClose savedData = secureGoldLoanService.closeGoldLoan(goldLoanCloseRequest);

			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "LOAN CLOSED SUCCESSFULLY", savedData));

		} catch (Exception e) {

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(
					HttpStatus.INTERNAL_SERVER_ERROR, "FAILED TO CLOSE LOAN: " + e.getMessage(), null));
		}
	}

	@GetMapping("/getAllGoldClosure")
	public ResponseEntity<ApiResponse<List<GoldLoanClose>>> getAllGoldLoanClosure() {
		List<GoldLoanClose> list = secureGoldLoanService.getAllGoldClosure();

		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK,
				list.isEmpty() ? "NO RECORDS FOUND" : "RECORDS FETCHED SUCCESSFULLY", list));
	}

	@GetMapping("/getGoldClosuresByGoldId")
	public ResponseEntity<ApiResponse<List<GoldLoanClose>>> getGoldLoanClosuresByGoldId(@RequestParam String goldID) {
		List<GoldLoanClose> closures = secureGoldLoanService.getGoldClosuresByGoldId(goldID);

		if (closures != null && !closures.isEmpty()) {
			return ResponseEntity
					.ok(new ApiResponse<>(HttpStatus.OK, "GOLD CLOSURE RECORDS FETCHED SUCCESSFULLY", closures));
		} else {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(
					new ApiResponse<>(HttpStatus.NO_CONTENT, "NO GOLD CLOSURE RECORDS FOUND FOR THIS GOLD ID", null));
		}
	}

	@PostMapping("/payEmi")
	public ResponseEntity<ApiResponse<Map<String, Object>>> payGoldLoanEmi(@RequestBody GoldLoanPayment request) {
		try {
			boolean isClosed = secureGoldLoanService.processGoldLoanEmi(request, 1); // default 1 installment

			Map<String, Object> data = new HashMap<>();
			data.put("loanStatus", isClosed ? "CLOSED" : "ACTIVE");

			String message = isClosed ? "EMI PAID SUCCESSFULLY. GOLD LOAN IS NOW CLOSED."
					: "EMI PAID SUCCESSFULLY. REMAINING BALANCE UPDATED.";

			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, message, data));

		} catch (RuntimeException e) {
			Map<String, Object> data = new HashMap<>();
			data.put("error", e.getMessage());
			return ResponseEntity.badRequest()
					.body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), data));
		}
	}

	@GetMapping("/getAllActive")
	public ApiResponse<List<ApplyForGold>> getAllActiveLoans() {
		List<ApplyForGold> activeLoans = secureGoldLoanService.getAllActiveGoldLoans();

		return new ApiResponse<>(HttpStatus.OK,
				activeLoans.isEmpty() ? "NO ACTIVE LOANS FOUND" : "ACTIVE LOANS LOADED SUCCESSFULLY", activeLoans);
	}

	@GetMapping("/getGoldPaymentByGoldId")
	public ResponseEntity<ApiResponse<List<GoldLoanPayment>>> getGoldPaymentByGoldId(@RequestParam String goldID) {
		List<GoldLoanPayment> closures = secureGoldLoanService.getGoldPaymentByGoldId(goldID);

		if (closures != null && !closures.isEmpty()) {
			return ResponseEntity
					.ok(new ApiResponse<>(HttpStatus.OK, "GOLD PAYMENT RECORDS FETCHED SUCCESSFULLY", closures));
		} else {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(
					new ApiResponse<>(HttpStatus.NO_CONTENT, "NO GOLD PAYMENT RECORDS FOUND FOR THIS GOLD ID", null));
		}
	}

	@PostMapping("/saveEMIInstallmentData")
	public ResponseEntity<ApiResponse> saveInstallment(@RequestBody EmiInstallmentPaymentGold emiPay) {

		ApiResponse response = secureGoldLoanService.saveInstallmentAndUpdateSavings(emiPay);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/getEMIInstallmentDataByGoldID")
	public ResponseEntity<ApiResponse<List<EmiInstallmentPaymentGold>>> getEMIInstallmentDataByGoldId(
			@RequestParam String goldID) {
		List<EmiInstallmentPaymentGold> installment = secureGoldLoanService.getEMIInstallmentGoldByID(goldID);

		if (installment != null && !installment.isEmpty()) {
			return ResponseEntity
					.ok(new ApiResponse<>(HttpStatus.OK, "EMI INSTALLMENT RECORDS FETCHED SUCCESSFULLY", installment));
		} else {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new ApiResponse<>(HttpStatus.NO_CONTENT,
					"NO EMI INSTALLMENT RECORDS FOUND FOR THIS GOLD ID", null));
		}
	}
}