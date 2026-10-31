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
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "APPROVED FINANCIAL CONSULTANTS FETCHED SUCCESSFULLY", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "NO APPROVED FINANCIAL CONSULTANTS FOUND"));
		}
	}

	@GetMapping("/getApprovedSavingAccount")
	public ResponseEntity<ApiResponse<List<CreateSavingsAccount>>> getApprovedSavingAccount() {
		List<CreateSavingsAccount> list = reportsAndAnalyticsService.getApprovedSavingAccount();
		if (!list.isEmpty()) {
			return ResponseEntity
					.ok(ApiResponse.success(HttpStatus.OK, "APPROVED SAVING ACCOUNT CUSTOMERS FETCHED", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "NO APPROVED FINANCIAL CONSULTANTS FOUND"));
		}
	}

	@GetMapping("/getUnapprovedLoanApplication")
	public ResponseEntity<ApiResponse<List<LoanApplication>>> getUnapprovedLoanApplication() {
		List<LoanApplication> list = reportsAndAnalyticsService.getUnapprovedLoanApplication();

		if (!list.isEmpty()) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "UNAPPROVED LOAN FETCHED", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "NO UNAPPROVED INVESTMENTS FOUND"));
		}
	}

	@GetMapping("/getLoanPaymentReport")
	public ResponseEntity<ApiResponse<List<LoanPayment>>> getLoanPaymentReport() {
		List<LoanPayment> list = reportsAndAnalyticsService.getLoanPaymentReport();
		if (!list.isEmpty()) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "LOAN PAYMENT FETCHED SUCCESFULLY", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "NO LOAN PAYMENT FOUND"));
		}
	}

	@GetMapping("/getLoanConfirmationDocument")
	public ResponseEntity<ApiResponse<List<LoanApplication>>> getLoanConfirmationDocument() {
		List<LoanApplication> list = reportsAndAnalyticsService.getLoanConfirmationDocument();
		if (!list.isEmpty()) {
			return ResponseEntity
					.ok(ApiResponse.success(HttpStatus.OK, "LOAN CONFIRMATION DOCUMENT FETCH SUCCESFULLY", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "NO LOAN CONFIRMATION DOCUMENT FOUND"));
		}
	}

	@GetMapping("/getPayByFromSavingAccountActivity")
	public ResponseEntity<ApiResponse<List<SavingAccountActivity>>> getPayByFromSavingAccountActivity() {
		List<SavingAccountActivity> list = reportsAndAnalyticsService.fetchPayByFromSavingAccountActivity();
		if (!list.isEmpty()) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "CHEQUE DATA FETCHED SUCCESSFULLY", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "CHEQUE DATA NOT FOUND"));
		}
	}

	@GetMapping("/getCheckDataFromLoanPayment")
	public ResponseEntity<ApiResponse<List<LoanPayment>>> getCheckDataFromLoanPayment() {
		List<LoanPayment> list = reportsAndAnalyticsService.fetchCheckDataFromLoanPayment();
		if (!list.isEmpty()) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "LOAN CHEQUE DATA FETCHED SUCCESSFULLY", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "LOAN CHEQUE DATA NOT FOUND"));
		}
	}

	@GetMapping("/getCheckDataFromCreateSavings")
	public ResponseEntity<ApiResponse<List<CreateSavingsAccount>>> getCheckDataFromCreateSavings() {
		List<CreateSavingsAccount> list = reportsAndAnalyticsService.fetchCheckDataFromCreateSavings();

		if (!list.isEmpty()) {
			return ResponseEntity
					.ok(ApiResponse.success(HttpStatus.OK, "SAVING CHEQUE DATA FETCHED SUCCESSFULLY", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "SAVING CHEQUE DATA NOT FOUND"));
		}
	}

	@GetMapping("/getCheckDataFromFinancialConsultant")
	public ResponseEntity<ApiResponse<List<addFinancialConsultant>>> getCheckDataFromFinancialConsultant() {
		List<addFinancialConsultant> list = reportsAndAnalyticsService.fetchCheckDataFromFinancialConsultant();

		if (!list.isEmpty()) {
			return ResponseEntity
					.ok(ApiResponse.success(HttpStatus.OK, "FINANCIAL CHEQUE DATA FETCHED SUCCESSFULLY", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "FINANCIAL CHEQUE DATA NOT FOUND"));
		}
	}

	@GetMapping("/getCheckDataFromTeamMember")
	public ResponseEntity<ApiResponse<List<TeamMember>>> getCheckDataFromTeamMember() {
		List<TeamMember> list = reportsAndAnalyticsService.fetchCheckDataFromTeamMember();

		if (!list.isEmpty()) {
			return ResponseEntity
					.ok(ApiResponse.success(HttpStatus.OK, "TEAM MEMBER CHEQUE DATA FETCHED SUCCESSFULLY", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "TEAM MEMBER CHEQUE DATA NOT FOUND"));
		}
	}

	@GetMapping("/getAllLoanApplication")
	public ResponseEntity<ApiResponse<List<LoanApplication>>> fetchAllLoanApplication() {
		List<LoanApplication> list = reportsAndAnalyticsService.getAllLoanApplication();

		if (!list.isEmpty()) {
			return ResponseEntity
					.ok(ApiResponse.success(HttpStatus.OK, "LOAN APPLICATION DATA FETCHED SUCCESSFULLY", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "LOAN APPLICATION DATA NOT FOUND"));
		}
	}

	@GetMapping("/getPolicyForPrint/{id}")
	public ResponseEntity<?> getPolicyForPrint(@PathVariable Long id) {

		Optional<AddnewinvestmentPM> policy = reportsAndAnalyticsService.getPolicyById(id);

		if (policy != null) {
			return ResponseEntity.ok(policy);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("POLICY NOT FOUND");
		}
	}

}
