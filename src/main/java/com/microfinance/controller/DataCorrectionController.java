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
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Customer Data deleted successfully",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "Customer Data deletion failed",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	// Ayush
	@GetMapping("/fetchAllSavingAccountActivity")
	public ResponseEntity<ApiResponse<List<SavingAccountActivity>>> fetchAllSavingAccountActivity() {
		List<SavingAccountActivity> list = dataCorrectionService.fetchAllSavingAccountActivity();
		ApiResponse<List<SavingAccountActivity>> response = new ApiResponse<>(HttpStatus.FOUND,
				"Saving Account Activity fetched successfully", list);
		return ResponseEntity.ok(response);
	}

	// Ayush
	@PostMapping("/deleteSavingTransactionRemoval")
	public ResponseEntity<ApiResponse<String>> deleteSavingTransaction(@RequestParam("id") Long id) {
		boolean isDeleted = dataCorrectionService.deleteSavingTransaction(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Saving Transaction deleted successfully",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "Saving Transaction deletion failed",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	// Ayush
	@PostMapping("/deletePolicyDataByForm")
	public ResponseEntity<ApiResponse<String>> deletePolicyData(@RequestParam("id") Long id) {
		boolean isDeleted = dataCorrectionService.deletePolicyData(id);
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

	//Ayush
	@PostMapping("/updateDataOfPolicyManagement")
	public ResponseEntity<ApiResponse<String>> updatePolicyManagement(
			@RequestBody AddnewinvestmentPM adddnewinvestmentPM) {

		int result = dataCorrectionService.updatePolicyManagement(adddnewinvestmentPM);

		if (result > 0) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Policy Data updated successfully.",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.BAD_REQUEST, "Failed to update Policy Data.",
					"failure");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
	}

	// Ayush
	@PostMapping("/updateDataOfLoanApplication")
	public ResponseEntity<ApiResponse<String>> updateLoanApplication(@RequestBody LoanApplication loanApplication) {

		int result = dataCorrectionService.updateCompanyAdministration(loanApplication);

		if (result > 0) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Loan data updated successfully.",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.BAD_REQUEST, "Failed to update Loan Data.",
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
					"Policy Renewal Data fetched successfully.", policy);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<PolicyRenewal>> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"No approved Policy Renewal found.", null);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	//Ayush
	@GetMapping("/fetchAllApprovedLoanApplications")
	public ResponseEntity<ApiResponse<List<LoanApplication>>> getApprovedLoanApplication() {
		List<LoanApplication> loan = dataCorrectionService.getApprovedLoan();
		if (loan != null && !loan.isEmpty()) {

			ApiResponse<List<LoanApplication>> response = new ApiResponse<>(HttpStatus.OK,
					"Loan Application Data fetched successfully.", loan);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<LoanApplication>> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"No approved Loan found.", null);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}
	
	// Ayush
	@PostMapping("/deleteLoanApplicationDataById")
	public ResponseEntity<ApiResponse<String>> deleteLoanApplication(@RequestParam("id") Long id) {
		boolean isDeleted = dataCorrectionService.deleteLoanApplication(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Loan Application deleted successfully",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "Loan Application deletion failed",
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
					"Policy Renewal(s) found for Policy Code: " + policyCode, renewalList);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<PolicyRenewal>> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"No Policy Renewal found with Policy Code: " + policyCode);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// Ayush
	@PostMapping("/deletePolicyRenewalDataById")
	public ResponseEntity<ApiResponse<String>> deletePolicyRenewal(@RequestParam("id") Long id) {
		boolean isDeleted = dataCorrectionService.deletePolicyRenewalData(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Policy Renewal deleted successfully",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "Policy Renewal deletion failed",
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
					"Daily Renewal Data fetched successfully.", dailyrenewal);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<DailyPremiumRenewalPM>> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"No approved Daily Renewal found.", null);
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
					"Daily Renewal(s) found for Policy Code: " + policyCode, renewalList);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			ApiResponse<List<DailyPremiumRenewalPM>> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"No Daily Renewal found with Policy Code: " + policyCode);
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}
	}

	// Ayush
	@PostMapping("/deleteDailyRenewalDataById")
	public ResponseEntity<ApiResponse<String>> deleteDailyRenewalData(@RequestParam("id") Long id) {
		boolean isDeleted = dataCorrectionService.deleteDailyRenewal(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Daily Renewal deleted successfully",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "Daily Renewal deletion failed",
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
					"Flexible Renewal Data fetched successfully.", dailyrenewal);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<FlexibleRenewal>> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"No approved Flexible Renewal found.", null);
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
					"Flexible Renewal(s) found for Policy Code: " + policyCode, flexibleList);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			ApiResponse<List<FlexibleRenewal>> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"No Flexible Renewal found with Policy Code: " + policyCode);
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}
	}

	// Ayush
	@PostMapping("/deleteFlexibleRenewalDataById")
	public ResponseEntity<ApiResponse<String>> deleteFlexibleRenewalData(@RequestParam("id") Long id) {
		boolean isDeleted = dataCorrectionService.deleteFlexibleRenewal(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Flexible Renewal deleted successfully",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "Flexible Renewal deletion failed",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	//Ayush
	@GetMapping("/fetchAllApprovedJointLiabilityData")
	public ResponseEntity<ApiResponse<List<ApplyForGroupLoan>>> getApprovedJointLiabilityData() {
		List<ApplyForGroupLoan> group = dataCorrectionService.getApprovedJointLiability();
		if (group != null && !group.isEmpty()) {

			ApiResponse<List<ApplyForGroupLoan>> response = new ApiResponse<>(HttpStatus.FOUND,
					"Group Loan Application Data fetched successfully.", group);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<ApplyForGroupLoan>> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"No approved Group Loan Application found.", null);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	//Ayush
	@PostMapping("/updateDataOfJointLiability")
	public ResponseEntity<ApiResponse<String>> updateJointLiability(@RequestBody ApplyForGroupLoan applyForGroupLoan) {

		int result = dataCorrectionService.updateJointLiability(applyForGroupLoan);

		if (result > 0) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK,
					"Joint Liability data updated successfully.", "success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.BAD_REQUEST,
					"Failed to update Joint Liability Data.", "failure");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
	}

	//Ayush
	@PostMapping("/deleteJointLiabilityDataById")
	public ResponseEntity<ApiResponse<String>> deleteJointLiabilityData(@RequestParam("id") Long id) {
		boolean isDeleted = dataCorrectionService.deleteJointLiability(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Joint Liability deleted successfully",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "Joint Liability deletion failed",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

}
