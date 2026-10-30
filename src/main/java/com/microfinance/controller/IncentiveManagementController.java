package com.microfinance.controller;

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
import com.microfinance.model.BranchModule;
import com.microfinance.model.GenerateIncentivePayments;
import com.microfinance.model.IncentiveSchemeMaster;
import com.microfinance.model.TeamMember;
import com.microfinance.service.IncentiveManagementService;

@RestController
@RequestMapping("/api/incentive")
public class IncentiveManagementController {

	@Autowired
	private IncentiveManagementService incentiveSchemeMasterService;

	// =========================================================
	// 1. INCENTIVE SCHEME MASTER ENDPOINTS
	// =========================================================

	@PostMapping("/saveIncentive")
	public ResponseEntity<ApiResponse<IncentiveSchemeMaster>> saveIncentiveScheme(@RequestBody IncentiveSchemeMaster incentive) {
		IncentiveSchemeMaster savedData = incentiveSchemeMasterService.saveIncentive(incentive);
		if (savedData != null) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "INCENTIVE SCHEME SAVED SUCCESSFULLY", savedData));
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "FAILED TO SAVE INCENTIVE SCHEME"));
		}
	}

	@GetMapping("/getAllIncentives")
	public ResponseEntity<ApiResponse<List<IncentiveSchemeMaster>>> getAllIncentives() {
		List<IncentiveSchemeMaster> list = incentiveSchemeMasterService.getAllIncentives();
		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "INCENTIVES FETCHED SUCCESSFULLY", list));
	}

	@GetMapping("/getIncentiveById")
	public ResponseEntity<ApiResponse<IncentiveSchemeMaster>> getIncentiveById(@RequestParam("id") Long id) {
		IncentiveSchemeMaster item = incentiveSchemeMasterService.getIncentiveById(id);
		if (item != null) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "INCENTIVE SCHEME FOUND", item));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "INCENTIVE SCHEME NOT FOUND"));
		}
	}

	@PostMapping("/updateIncentive")
	public ResponseEntity<ApiResponse<IncentiveSchemeMaster>> updateIncentive(@RequestBody IncentiveSchemeMaster incentive) {
		IncentiveSchemeMaster updated = incentiveSchemeMasterService.updateIncentive(incentive);
		if (updated != null) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "INCENTIVE SCHEME UPDATED SUCCESSFULLY", updated));
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(ApiResponse.error(HttpStatus.BAD_REQUEST, "FAILED TO UPDATE INCENTIVE SCHEME"));
		}
	}

	@PostMapping("/deleteIncentiveById")
	public ResponseEntity<ApiResponse<String>> deleteIncentiveById(@RequestParam("id") Long id) {
		boolean deleted = incentiveSchemeMasterService.deleteIncentiveById(id);
		if (deleted) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "INCENTIVE SCHEME DELETED SUCCESSFULLY", null));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "INCENTIVE SCHEME NOT FOUND OR FAILED TO DELETE"));
		}
	}

	// =========================================================
	// 2. MASTER LOOKUPS
	// =========================================================

	@GetMapping("/getAllTeamMember")
	public ResponseEntity<ApiResponse<List<TeamMember>>> getAllTeamMember() {
		List<TeamMember> list = incentiveSchemeMasterService.getAllTeamMember();
		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "TEAM MEMBERS FETCHED SUCCESSFULLY", list));
	}

	@GetMapping("/getAllBranchModules")
	public ResponseEntity<ApiResponse<List<BranchModule>>> getAllBranchModules() {
		List<BranchModule> list = incentiveSchemeMasterService.getAllBranchModules();
		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "BRANCHES FETCHED SUCCESSFULLY", list));
	}

	// =========================================================
	// 3. GENERATE INCENTIVE PAYMENTS
	// =========================================================

	@PostMapping("/generateIncentives")
	public ResponseEntity<ApiResponse<List<GenerateIncentivePayments>>> generateIncentives(
			@RequestBody Map<String, String> request) {

		String teamCode = request.get("teamCode");
		String incentiveMonth = request.get("incentiveMonth");
		String dateFrom = request.get("dateFrom");
		String dateTo = request.get("dateTo");

		if (incentiveMonth == null || incentiveMonth.trim().isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(ApiResponse.error(HttpStatus.BAD_REQUEST, "PLEASE SELECT INCENTIVE MONTH"));
		}

		List<GenerateIncentivePayments> generated = incentiveSchemeMasterService.generateIncentives(teamCode, incentiveMonth, dateFrom, dateTo);
		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "INCENTIVES GENERATED SUCCESSFULLY", generated));
	}

	@PostMapping("/saveDataInGenerateIncentivePayments")
	public ResponseEntity<ApiResponse<GenerateIncentivePayments>> saveIncentivePayment(
			@RequestBody GenerateIncentivePayments incentivepayment) {

		boolean isSaved = incentiveSchemeMasterService.saveIncentivePayment(incentivepayment);
		if (isSaved) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "INCENTIVE PAYMENT SAVED SUCCESSFULLY", incentivepayment));
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(ApiResponse.error(HttpStatus.BAD_REQUEST, "FAILED TO SAVE INCENTIVE PAYMENT"));
		}
	}

	@GetMapping("/getAllGeneratedPayments")
	public ResponseEntity<ApiResponse<List<GenerateIncentivePayments>>> getAllGeneratedPayments() {
		List<GenerateIncentivePayments> list = incentiveSchemeMasterService.getAllGeneratedPayments();
		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "GENERATED INCENTIVES FETCHED SUCCESSFULLY", list));
	}

	// =========================================================
	// 4. INCENTIVE PAYMENT DETAILS & SUMMARY REPORT
	// =========================================================

	@GetMapping("/getIncentivePaymentDetails")
	public ResponseEntity<ApiResponse<List<GenerateIncentivePayments>>> getIncentivePaymentDetails(
			@RequestParam(value = "incentiveMonth", required = false) String incentiveMonth,
			@RequestParam(value = "code", required = false) String code) {

		List<GenerateIncentivePayments> list = incentiveSchemeMasterService.getIncentivePaymentDetails(incentiveMonth, code);
		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "PAYMENT DETAILS FETCHED SUCCESSFULLY", list));
	}

	@GetMapping("/getIncentiveSummaryReport")
	public ResponseEntity<ApiResponse<List<GenerateIncentivePayments>>> getIncentiveSummaryReport(
			@RequestParam(value = "incentiveMonth", required = false) String incentiveMonth,
			@RequestParam(value = "branchName", required = false) String branchName,
			@RequestParam(value = "code", required = false) String code) {

		List<GenerateIncentivePayments> list = incentiveSchemeMasterService.getIncentiveSummaryReport(incentiveMonth, branchName, code);
		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "SUMMARY REPORT FETCHED SUCCESSFULLY", list));
	}

	@GetMapping("/getIncentiveSummaryStats")
	public ResponseEntity<ApiResponse<Map<String, Object>>> getIncentiveSummaryStats(
			@RequestParam(value = "incentiveMonth", required = false) String incentiveMonth,
			@RequestParam(value = "branchName", required = false) String branchName,
			@RequestParam(value = "code", required = false) String code) {

		Map<String, Object> stats = incentiveSchemeMasterService.getIncentiveSummaryStats(incentiveMonth, branchName, code);
		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "SUMMARY STATISTICS FETCHED SUCCESSFULLY", stats));
	}

	@PostMapping("/payIncentive")
	public ResponseEntity<ApiResponse<GenerateIncentivePayments>> payIncentive(
			@RequestParam("id") Long id,
			@RequestParam(value = "paymentMode", required = false) String paymentMode,
			@RequestParam(value = "paymentBranch", required = false) String paymentBranch,
			@RequestParam(value = "paymentDate", required = false) String paymentDate) {

		GenerateIncentivePayments paid = incentiveSchemeMasterService.payIncentive(id, paymentMode, paymentBranch, paymentDate);
		if (paid != null) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "INCENTIVE PAYMENT MARKED AS PAID SUCCESSFULLY", paid));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "INCENTIVE RECORD NOT FOUND FOR PAYMENT"));
		}
	}

}
