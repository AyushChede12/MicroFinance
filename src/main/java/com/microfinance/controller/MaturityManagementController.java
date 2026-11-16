package com.microfinance.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.microfinance.dto.ApiResponse;
import com.microfinance.model.ApplyForMaturity;
import com.microfinance.model.FullMaturity;
import com.microfinance.model.MaturitySchemeMaster;
import com.microfinance.model.partialMaturityPayment;
import com.microfinance.service.MaturitySchemeMasterService;
import com.microfinance.service.PolicyManagementService;

@RestController
@RequestMapping("/api/Maturitymanagement")
public class MaturityManagementController {

	@Autowired
	private MaturitySchemeMasterService maturityservice;

	@Autowired
	private PolicyManagementService policyManagementService;

	// Save Maturity Scheme Master (Daily Deposit, Recurring, Fixed, MIS)
	@PostMapping("/savematurityscheme")
	@ResponseBody
	public ApiResponse<MaturitySchemeMaster> saveMaturityScheme(@RequestBody MaturitySchemeMaster maturityscheme) {
		MaturitySchemeMaster saved = maturityservice.saveMaturityScheme(maturityscheme);
		if (saved != null) {
			return ApiResponse.success(HttpStatus.OK, "MATURITY SCHEME SAVED SUCCESSFULLY.", saved);
		} else {
			return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "FAILED TO SAVE MATURITY SCHEME.");
		}
	}

	// Get All Maturity Schemes
	@GetMapping("/getAllMaturityScheme")
	public ResponseEntity<ApiResponse<List<MaturitySchemeMaster>>> getAllMaturityScheme() {
		List<MaturitySchemeMaster> list = maturityservice.getAllMaturitySchemes();
		if (list != null && !list.isEmpty()) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "MATURITY SCHEMES FETCHED SUCCESSFULLY.", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "NO MATURITY SCHEMES FOUND."));
		}
	}

	// Save Apply Maturity
	@PostMapping("/saveApplymaturity")
	@ResponseBody
	public ApiResponse<ApplyForMaturity> saveApplymaturity(@RequestBody ApplyForMaturity applymaturity) {
		ApplyForMaturity maturity = maturityservice.saveApplymaturity(applymaturity);
		if (maturity != null) {
			return ApiResponse.success(HttpStatus.OK, "MATURITY APPLICATION SAVED SUCCESSFULLY.", maturity);
		} else {
			return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "FAILED TO SAVE MATURITY APPLICATION.");
		}
	}

	// View Apply Maturity Details
	@GetMapping("/getApplymaturitydetails")
	public ResponseEntity<ApiResponse<List<ApplyForMaturity>>> getApplyMaturityDetails() {
		List<ApplyForMaturity> list = maturityservice.getApplyMaturityDetails();
		if (list != null && !list.isEmpty()) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "MATURITY APPLICATIONS FETCHED SUCCESSFULLY.", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "NO MATURITY DETAILS FOUND."));
		}
	}

	@GetMapping("/getApplymaturitydetailswithPage")
	public ResponseEntity<ApiResponse<Map<String, Object>>> getApplyMaturityDetailsWithPage(
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {

		Page<ApplyForMaturity> invest = maturityservice.getApplyMaturityDetailsWithPage(page, size);

		if (invest != null && !invest.isEmpty()) {
			Map<String, Object> responseData = new HashMap<>();
			responseData.put("content", invest.getContent());
			responseData.put("currentPage", invest.getNumber());
			responseData.put("totalPages", invest.getTotalPages());
			responseData.put("totalElements", invest.getTotalElements());

			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "MATURITY APPLICATIONS FETCHED SUCCESSFULLY.", responseData));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "NO MATURITY DETAILS FOUND."));
		}
	}

	// View data of apply maturity by branch name and date range
	@GetMapping("/getMaturityByBranchAndDate")
	public ResponseEntity<ApiResponse<List<ApplyForMaturity>>> getMaturityByBranchAndDate(
			@RequestParam(required = false) String branchName,
			@RequestParam(required = false) String fromDate,
			@RequestParam(required = false) String toDate) {

		List<ApplyForMaturity> data = maturityservice.getMaturityDetailsByBranchAndDate(branchName, fromDate, toDate);

		if (data != null && !data.isEmpty()) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "FILTERED MATURITY DETAILS FETCHED SUCCESSFULLY.", data));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "NO DATA FOUND FOR THE GIVEN CRITERIA."));
		}
	}

	// Save Full Maturity Payment (triggers AccountTransaction and BankTransaction)
	@PostMapping("/saveFullmaturity")
	@ResponseBody
	public ApiResponse<FullMaturity> saveFullmaturity(@RequestBody FullMaturity fullmaturity) {
		FullMaturity maturity = maturityservice.saveFullmaturity(fullmaturity);
		if (maturity != null) {
			return ApiResponse.success(HttpStatus.OK, "FULL MATURITY PAYMENT SAVED SUCCESSFULLY.", maturity);
		} else {
			return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "FAILED TO SAVE FULL MATURITY PAYMENT.");
		}
	}

	@GetMapping("/getFullmaturitydetails")
	public ResponseEntity<ApiResponse<List<FullMaturity>>> getFullMaturityDetails() {
		List<FullMaturity> list = maturityservice.getFullMaturityDetails();
		if (list != null && !list.isEmpty()) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "FULL MATURITY DETAILS FETCHED SUCCESSFULLY.", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "NO FULL MATURITY DETAILS FOUND."));
		}
	}

	@GetMapping("/getFullMaturityByBranchAndDate")
	public ResponseEntity<ApiResponse<List<FullMaturity>>> getFullMaturityByBranchAndDate(
			@RequestParam(required = false) String branchName,
			@RequestParam(required = false) String fromDate,
			@RequestParam(required = false) String toDate) {

		List<FullMaturity> list = maturityservice.getFullMaturityDetailsByBranchAndDate(branchName, fromDate, toDate);
		if (list != null && !list.isEmpty()) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "FILTERED FULL MATURITY DETAILS FETCHED SUCCESSFULLY.", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "NO DATA FOUND FOR THE GIVEN CRITERIA."));
		}
	}

	// Save Partial Maturity Payment (triggers AccountTransaction and BankTransaction)
	@PostMapping("/savePartialmaturity")
	@ResponseBody
	public ApiResponse<partialMaturityPayment> savePartialmaturity(
			@RequestBody partialMaturityPayment partialmaturity) {
		partialMaturityPayment maturity = maturityservice.savePartialmaturity(partialmaturity);
		if (maturity != null) {
			return ApiResponse.success(HttpStatus.OK, "PARTIAL MATURITY PAYMENT SAVED SUCCESSFULLY.", maturity);
		} else {
			return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "FAILED TO SAVE PARTIAL MATURITY PAYMENT.");
		}
	}

	@GetMapping("/getPartialmaturitydetails")
	public ResponseEntity<ApiResponse<List<partialMaturityPayment>>> getPartialMaturityDetails() {
		List<partialMaturityPayment> list = maturityservice.getPartialMaturityDetails();
		if (list != null && !list.isEmpty()) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "PARTIAL MATURITY DETAILS FETCHED SUCCESSFULLY.", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "NO PARTIAL MATURITY DETAILS FOUND."));
		}
	}

	@GetMapping("/getPartialMaturityByBranchAndDate")
	public ResponseEntity<ApiResponse<List<partialMaturityPayment>>> getPartialMaturityByBranchAndDate(
			@RequestParam(required = false) String branchName,
			@RequestParam(required = false) String fromDate,
			@RequestParam(required = false) String toDate) {

		List<partialMaturityPayment> list = maturityservice.getPartialMaturityDetailsByBranchAndDate(branchName, fromDate, toDate);
		if (list != null && !list.isEmpty()) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "FILTERED PARTIAL MATURITY DETAILS FETCHED SUCCESSFULLY.", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "NO DATA FOUND FOR THE GIVEN CRITERIA."));
		}
	}

	// Approved Maturity Applications for Approved Status Report
	@GetMapping("/getApprovedMaturityDetails")
	public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getApprovedMaturityDetails(
			@RequestParam(required = false) String branchName,
			@RequestParam(required = false) String fromDate,
			@RequestParam(required = false) String toDate) {

		List<Map<String, Object>> list = maturityservice.getApprovedMaturityDetails(branchName, fromDate, toDate);
		if (list != null && !list.isEmpty()) {
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "APPROVED MATURITY DETAILS FETCHED SUCCESSFULLY.", list));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "NO APPROVED MATURITY DETAILS FOUND."));
		}
	}
}
