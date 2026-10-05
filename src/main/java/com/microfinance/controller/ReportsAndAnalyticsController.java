package com.microfinance.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.microfinance.dto.ApiResponse;
import com.microfinance.model.AddnewinvestmentPM;
import com.microfinance.model.CreateSavingsAccount;
import com.microfinance.model.DailyPremiumRenewalPM;
import com.microfinance.model.LoanApplication;
import com.microfinance.model.LoanPayment;
import com.microfinance.model.SavingAccountActivity;
import com.microfinance.model.TeamMember;
import com.microfinance.model.addFinancialConsultant;
import com.microfinance.service.ReportsAndAnalyticsService;

@RestController
@RequestMapping("/api/reports")
public class ReportsAndAnalyticsController {

	@Autowired
	ReportsAndAnalyticsService reportsAndAnalyticsService;

	// Janvi : Fetch Approved Financial Consultant Data
	@GetMapping("/getApprovedFinancialConsultant")
	public ResponseEntity<ApiResponse<List<addFinancialConsultant>>> getApprovedFinancialConsultant() {
		List<addFinancialConsultant> list = reportsAndAnalyticsService.getApprovedFinancialConsultant();
		if (!list.isEmpty()) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "approved customers fetched", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "No approved customers found"));
		}
	}

	@GetMapping("/getApprovedSavingAccount")
	public ResponseEntity<ApiResponse<List<CreateSavingsAccount>>> getApprovedSavingAccount() {
		List<CreateSavingsAccount> list = reportsAndAnalyticsService.getApprovedSavingAccount();
		if (!list.isEmpty()) {
			return ResponseEntity
					.ok(ApiResponse.success(HttpStatus.OK, "approved Saving Account customers fetched", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "No approved customers found"));
		}
	}

	@GetMapping("/getUnapprovedLoanApplication")
	public ResponseEntity<ApiResponse<List<LoanApplication>>> getUnapprovedLoanApplication() {
		List<LoanApplication> list = reportsAndAnalyticsService.getUnapprovedLoanApplication();

		if (!list.isEmpty()) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Unapproved loan fetched", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "No unapproved investments found"));
		}
	}

	@GetMapping("/getLoanPaymentReport")
	public ResponseEntity<ApiResponse<List<LoanPayment>>> getLoanPaymentReport() {
		List<LoanPayment> list = reportsAndAnalyticsService.getLoanPaymentReport();
		if (!list.isEmpty()) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Loan Payment Fetched Succesfully", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "No Loan Payment Found"));
		}
	}

	@GetMapping("/getLoanConfirmationDocument")
	public ResponseEntity<ApiResponse<List<LoanApplication>>> getLoanConfirmationDocument() {
		List<LoanApplication> list = reportsAndAnalyticsService.getLoanConfirmationDocument();
		if (!list.isEmpty()) {
			return ResponseEntity
					.ok(ApiResponse.success(HttpStatus.OK, "Loan Confirmation Document Fetch Succesfully", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "No Loan Confirmation Document Found"));
		}
	}

	@GetMapping("/getPayByFromSavingAccountActivity")
	public ResponseEntity<ApiResponse<List<SavingAccountActivity>>> getPayByFromSavingAccountActivity() {
		List<SavingAccountActivity> list = reportsAndAnalyticsService.fetchPayByFromSavingAccountActivity();
		if (!list.isEmpty()) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Cheque Data fetched Successfully", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "Cheque Data Not found"));
		}
	}

	@GetMapping("/getCheckDataFromLoanPayment")
	public ResponseEntity<ApiResponse<List<LoanPayment>>> getCheckDataFromLoanPayment() {
		List<LoanPayment> list = reportsAndAnalyticsService.fetchCheckDataFromLoanPayment();
		if (!list.isEmpty()) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Loan Cheque Data fetched Successfully", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "Loan Cheque Data Not found"));
		}
	}

	@GetMapping("/getCheckDataFromCreateSavings")
	public ResponseEntity<ApiResponse<List<CreateSavingsAccount>>> getCheckDataFromCreateSavings() {
		List<CreateSavingsAccount> list = reportsAndAnalyticsService.fetchCheckDataFromCreateSavings();

		if (!list.isEmpty()) {
			return ResponseEntity
					.ok(ApiResponse.success(HttpStatus.OK, "Saving Cheque Data fetched Successfully", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "Saving Cheque Data Not Found"));
		}
	}

	@GetMapping("/getCheckDataFromFinancialConsultant")
	public ResponseEntity<ApiResponse<List<addFinancialConsultant>>> getCheckDataFromFinancialConsultant() {
		List<addFinancialConsultant> list = reportsAndAnalyticsService.fetchCheckDataFromFinancialConsultant();

		if (!list.isEmpty()) {
			return ResponseEntity
					.ok(ApiResponse.success(HttpStatus.OK, "Financial Cheque Data fetched Successfully", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "Financial Cheque Data Not Found"));
		}
	}
	
	@GetMapping("/getCheckDataFromTeamMember")
	public ResponseEntity<ApiResponse<List<TeamMember>>> getCheckDataFromTeamMember() {
		List<TeamMember> list = reportsAndAnalyticsService.fetchCheckDataFromTeamMember();

		if (!list.isEmpty()) {
			return ResponseEntity
					.ok(ApiResponse.success(HttpStatus.OK, "Team Member Cheque Data fetched Successfully", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "Team Member Cheque Data Not Found"));
		}
	}
	
	@GetMapping("/getAllLoanApplication")
	public ResponseEntity<ApiResponse<List<LoanApplication>>> fetchAllLoanApplication() {
		List<LoanApplication> list = reportsAndAnalyticsService.getAllLoanApplication();

		if (!list.isEmpty()) {
			return ResponseEntity
					.ok(ApiResponse.success(HttpStatus.OK, "Loan Application Data fetched Successfully", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "Loan Application Data Not Found"));
		}
	}
	
	@GetMapping("/getPolicyForPrint/{id}")
	public ResponseEntity<?> getPolicyForPrint(@PathVariable Long id) {

	    Optional<AddnewinvestmentPM> policy = reportsAndAnalyticsService.getPolicyById(id);

	    if (policy != null) {
	        return ResponseEntity.ok(policy);
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Policy not found");
	    }
	}

}
