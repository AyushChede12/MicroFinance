package com.microfinance.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.microfinance.dto.ApiResponse;
import com.microfinance.dto.CustomerDto;
import com.microfinance.dto.FinancialConsultantDto;
import com.microfinance.dto.PolicyManagementDto;
import com.microfinance.model.AddnewinvestmentPM;
import com.microfinance.model.ApplyForGroupLoan;
import com.microfinance.model.CompanyAdministration;
import com.microfinance.model.CreateSavingsAccount;
import com.microfinance.model.DailyPremiumRenewalPM;
import com.microfinance.model.ExecutiveFounder;
import com.microfinance.model.FlexibleRenewal;
import com.microfinance.model.FlexiblepremiumrenewalPM;
import com.microfinance.model.LoanApplication;
import com.microfinance.model.PolicyRenewal;
import com.microfinance.model.SavingAccountActivity;
import com.microfinance.model.TransferShare;
import com.microfinance.model.addCustomer;
import com.microfinance.model.addFinancialConsultant;
import com.microfinance.repository.CustomerRepo;
import com.microfinance.repository.SavingAccountActivityRepo;
import com.microfinance.service.DataCorrectionService;

@RestController
@RequestMapping("/api/datacorrection")
public class DataCorrectionController {

	@Autowired
	DataCorrectionService dataCorrectionService;

	// Ayush
	@PostMapping("/deleteCustomerDataByForm")
	public ResponseEntity<ApiResponse<String>> deleteCustomerData(@RequestParam("id") Long id) {
		boolean isDeleted = dataCorrectionService.deleteCustomerData(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "CUSTOMER DATA DELETED SUCCESSFULLY",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "CUSTOMER DATA DELETION FAILED",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	// Ayush
	@GetMapping("/fetchAllSavingAccountActivity")
	public ResponseEntity<ApiResponse<List<SavingAccountActivity>>> fetchAllSavingAccountActivity() {
		List<SavingAccountActivity> list = dataCorrectionService.fetchAllSavingAccountActivity();
		ApiResponse<List<SavingAccountActivity>> response = new ApiResponse<>(HttpStatus.FOUND,
				"SAVING ACCOUNT ACTIVITY FETCHED SUCCESSFULLY", list);
		return ResponseEntity.ok(response);
	}

	// Ayush
	@PostMapping("/deleteSavingTransactionRemoval")
	public ResponseEntity<ApiResponse<String>> deleteSavingTransaction(@RequestParam("id") Long id) {
		boolean isDeleted = dataCorrectionService.deleteSavingTransaction(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "SAVING TRANSACTION DELETED SUCCESSFULLY",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "SAVING TRANSACTION DELETION FAILED",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	// Ayush
	@PostMapping("/deletePolicyDataByForm")
	public ResponseEntity<ApiResponse<String>> deletePolicyData(@RequestParam("id") Long id) {
		boolean isDeleted = dataCorrectionService.deletePolicyData(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "POLICY DATA DELETED SUCCESSFULLY",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "POLICY DATA DELETION FAILED",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	// Ayush
	@PostMapping("/updateDataOfPolicyManagement")
	public ResponseEntity<ApiResponse<String>> updatePolicyManagement(
			@RequestBody AddnewinvestmentPM adddnewinvestmentPM) {

		int result = dataCorrectionService.updatePolicyManagement(adddnewinvestmentPM);

		if (result > 0) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "POLICY DATA UPDATED SUCCESSFULLY.",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.BAD_REQUEST, "FAILED TO UPDATE POLICY DATA.",
					"failure");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
	}

	// Ayush
	@PostMapping("/updateDataOfLoanApplication")
	public ResponseEntity<ApiResponse<String>> updateLoanApplication(@RequestBody LoanApplication loanApplication) {

		int result = dataCorrectionService.updateCompanyAdministration(loanApplication);

		if (result > 0) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "LOAN DATA UPDATED SUCCESSFULLY.",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.BAD_REQUEST, "FAILED TO UPDATE LOAN DATA.",
					"failure");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
	}

	// Ayush
	@GetMapping("/fetchAllApprovedPolicyRenewal")
	public ResponseEntity<ApiResponse<List<PolicyRenewal>>> getApprovedPolicyRenewal() {
		List<PolicyRenewal> policy = dataCorrectionService.getApprovedPolicyRenewal();
		if (policy != null && !policy.isEmpty()) {

			ApiResponse<List<PolicyRenewal>> response = new ApiResponse<>(HttpStatus.OK,
					"POLICY RENEWAL DATA FETCHED SUCCESSFULLY.", policy);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<PolicyRenewal>> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"NO APPROVED POLICY RENEWAL FOUND.", null);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// Ayush
	@GetMapping("/fetchAllApprovedLoanApplications")
	public ResponseEntity<ApiResponse<List<LoanApplication>>> getApprovedLoanApplication() {

		List<LoanApplication> loan = dataCorrectionService.getApprovedLoan();

		if (loan != null && !loan.isEmpty()) {

			ApiResponse<List<LoanApplication>> response = new ApiResponse<>(HttpStatus.OK,
					"LOAN APPLICATION DATA FETCHED SUCCESSFULLY.", loan);

			return ResponseEntity.ok(response);

		} else {

			ApiResponse<List<LoanApplication>> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"NO APPROVED LOAN FOUND.", null);

			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// Ayush
	@PostMapping("/deleteLoanApplicationDataById")
	public ResponseEntity<ApiResponse<String>> deleteLoanApplication(@RequestParam("id") Long id) {
		boolean isDeleted = dataCorrectionService.deleteLoanApplication(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "LOAN APPLICATION DELETED SUCCESSFULLY",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "LOAN APPLICATION DELETION FAILED",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	// Ayush
	@GetMapping("/getPolicyRenewalByPolicyCode")
	public ResponseEntity<ApiResponse<List<PolicyRenewal>>> getPolicyRenewalDataByPolicyCode(
			@RequestParam String policyCode) {

		List<PolicyRenewal> renewalList = dataCorrectionService.fetchPolicyRenewalByPolicyCode(policyCode);

		if (renewalList != null && !renewalList.isEmpty()) {
			ApiResponse<List<PolicyRenewal>> response = ApiResponse.success(HttpStatus.FOUND,
					"POLICY RENEWAL(S) FOUND FOR POLICY CODE: " + policyCode, renewalList);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<PolicyRenewal>> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"NO POLICY RENEWAL FOUND WITH POLICY CODE: " + policyCode);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// Ayush
	@PostMapping("/deletePolicyRenewalDataById")
	public ResponseEntity<ApiResponse<String>> deletePolicyRenewal(@RequestParam("id") Long id) {
		boolean isDeleted = dataCorrectionService.deletePolicyRenewalData(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "POLICY RENEWAL DELETED SUCCESSFULLY",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "POLICY RENEWAL DELETION FAILED",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	// Ayush
	@GetMapping("/fetchAllApprovedDailyRenewal")
	public ResponseEntity<ApiResponse<List<DailyPremiumRenewalPM>>> getApprovedDailyRenewalData() {
		List<DailyPremiumRenewalPM> dailyrenewal = dataCorrectionService.getApprovedDailyRenewal();
		if (dailyrenewal != null && !dailyrenewal.isEmpty()) {

			ApiResponse<List<DailyPremiumRenewalPM>> response = new ApiResponse<>(HttpStatus.FOUND,
					"DAILY RENEWAL DATA FETCHED SUCCESSFULLY.", dailyrenewal);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<DailyPremiumRenewalPM>> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"NO APPROVED DAILY RENEWAL FOUND.", null);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// Ayush
	@GetMapping("/getDailyRenewalByPolicyCode")
	public ResponseEntity<ApiResponse<List<DailyPremiumRenewalPM>>> getDailyRenewalDataByPolicyCode(
			@RequestParam String policyCode) {

		List<DailyPremiumRenewalPM> renewalList = dataCorrectionService.fetchDailyRenewalByPolicyCode(policyCode);

		if (renewalList != null && !renewalList.isEmpty()) {
			ApiResponse<List<DailyPremiumRenewalPM>> response = ApiResponse.success(HttpStatus.FOUND,
					"DAILY RENEWAL(S) FOUND FOR POLICY CODE: " + policyCode, renewalList);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			ApiResponse<List<DailyPremiumRenewalPM>> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"NO DAILY RENEWAL FOUND WITH POLICY CODE: " + policyCode);
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}
	}

	// Ayush
	@PostMapping("/deleteDailyRenewalDataById")
	public ResponseEntity<ApiResponse<String>> deleteDailyRenewalData(@RequestParam("id") Long id) {
		boolean isDeleted = dataCorrectionService.deleteDailyRenewal(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "DAILY RENEWAL DELETED SUCCESSFULLY",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "DAILY RENEWAL DELETION FAILED",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	// Ayush
	@GetMapping("/fetchAllApprovedFlexibleRenewal")
	public ResponseEntity<ApiResponse<List<FlexibleRenewal>>> getApprovedFlexibleRenewalData() {
		List<FlexibleRenewal> dailyrenewal = dataCorrectionService.getApprovedFlexibleRenewal();
		if (dailyrenewal != null && !dailyrenewal.isEmpty()) {

			ApiResponse<List<FlexibleRenewal>> response = new ApiResponse<>(HttpStatus.FOUND,
					"FLEXIBLE RENEWAL DATA FETCHED SUCCESSFULLY.", dailyrenewal);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<FlexibleRenewal>> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"NO APPROVED FLEXIBLE RENEWAL FOUND.", null);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// Ayush
	@GetMapping("/getFlexibleRenewalByPolicyCode")
	public ResponseEntity<ApiResponse<List<FlexibleRenewal>>> getFlexibleRenewalDataByPolicyCode(
			@RequestParam String policyCode) {

		List<FlexibleRenewal> flexibleList = dataCorrectionService.fetchFlexibleRenewalByPolicyCode(policyCode);

		if (flexibleList != null && !flexibleList.isEmpty()) {
			ApiResponse<List<FlexibleRenewal>> response = ApiResponse.success(HttpStatus.FOUND,
					"FLEXIBLE RENEWAL(S) FOUND FOR POLICY CODE: " + policyCode, flexibleList);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			ApiResponse<List<FlexibleRenewal>> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"NO FLEXIBLE RENEWAL FOUND WITH POLICY CODE: " + policyCode);
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}
	}

	// Ayush
	@PostMapping("/deleteFlexibleRenewalDataById")
	public ResponseEntity<ApiResponse<String>> deleteFlexibleRenewalData(@RequestParam("id") Long id) {
		boolean isDeleted = dataCorrectionService.deleteFlexibleRenewal(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "FLEXIBLE RENEWAL DELETED SUCCESSFULLY",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "FLEXIBLE RENEWAL DELETION FAILED",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	// Ayush
	@GetMapping("/fetchAllApprovedJointLiabilityData")
	public ResponseEntity<ApiResponse<List<ApplyForGroupLoan>>> getApprovedJointLiabilityData() {
		List<ApplyForGroupLoan> group = dataCorrectionService.getApprovedJointLiability();
		if (group != null && !group.isEmpty()) {

			ApiResponse<List<ApplyForGroupLoan>> response = new ApiResponse<>(HttpStatus.FOUND,
					"GROUP LOAN APPLICATION DATA FETCHED SUCCESSFULLY.", group);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<ApplyForGroupLoan>> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"NO APPROVED GROUP LOAN APPLICATION FOUND.", null);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// Ayush
	@PostMapping("/updateDataOfJointLiability")
	public ResponseEntity<ApiResponse<String>> updateJointLiability(@RequestBody ApplyForGroupLoan applyForGroupLoan) {

		int result = dataCorrectionService.updateJointLiability(applyForGroupLoan);

		if (result > 0) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK,
					"JOINT LIABILITY DATA UPDATED SUCCESSFULLY.", "success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.BAD_REQUEST,
					"FAILED TO UPDATE JOINT LIABILITY DATA.", "failure");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
	}

	// Ayush
	@PostMapping("/deleteJointLiabilityDataById")
	public ResponseEntity<ApiResponse<String>> deleteJointLiabilityData(@RequestParam("id") Long id) {
		boolean isDeleted = dataCorrectionService.deleteJointLiability(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "JOINT LIABILITY DELETED SUCCESSFULLY",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "JOINT LIABILITY DELETION FAILED",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

}