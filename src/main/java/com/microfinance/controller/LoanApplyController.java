package com.microfinance.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.microfinance.dto.ApiResponse;
import com.microfinance.model.LoanApplication;
import com.microfinance.service.LoanManagementService;

@RestController
@RequestMapping("/api/loans")
public class LoanApplyController {

	@Autowired
	private LoanManagementService loanServices;

	private static final ObjectMapper objectMapper = new ObjectMapper();

	public static String validateDynamicFields(String typeOfLoan, Map<String, Object> details) {
		if (typeOfLoan == null || typeOfLoan.trim().isEmpty()) {
			return "Type of Loan is required";
		}

		Map<String, List<String>> requiredMap = new HashMap<>();
		requiredMap.put("Personal Loan", Arrays.asList("employerName", "employeeId", "monthlyNetSalary", "salarySlipUpload"));
		requiredMap.put("Business Loan", Arrays.asList("businessName", "businessType", "yearsInBusiness", "monthlyTurnover", "tradeLicenseNo"));
		requiredMap.put("TW Loan", Arrays.asList("vehicleModel", "onRoadPrice", "downPayment", "dealerName", "chassisNo", "engineNo"));
		requiredMap.put("TW Refinance Loan", Arrays.asList("existingRcNo", "vehicleRegNo", "purchaseDate", "currentValuation", "vehicleAge"));
		requiredMap.put("CDL Loan", Arrays.asList("productName", "dealerShopName", "invoiceNo", "productPrice"));
		requiredMap.put("Loan Against FD/RD/DRD", Arrays.asList("depositAccountNo", "depositAmount", "maturityDate", "marginPercent", "lienConfirmed"));

		List<String> requiredFields = requiredMap.get(typeOfLoan.trim());
		if (requiredFields != null) {
			if (details == null || details.isEmpty()) {
				return "Dynamic loan details are required for " + typeOfLoan;
			}
			for (String field : requiredFields) {
				Object val = details.get(field);
				if (val == null) {
					return "Required field '" + field + "' is missing for " + typeOfLoan;
				}
				String strVal = val.toString().trim();
				if (strVal.isEmpty() || "false".equalsIgnoreCase(strVal)) {
					return "Required field '" + field + "' is empty or not confirmed for " + typeOfLoan;
				}
			}
		}
		return null;
	}

	@PostMapping({"/apply", "/saveloanapplication"})
	public ResponseEntity<ApiResponse<?>> applyLoan(@RequestBody Map<String, Object> payload) {
		try {
			String typeOfLoan = (String) payload.get("typeOfLoan");

			// Extract loanTypeSpecificDetails which may be a nested Map or JSON String
			Map<String, Object> specificDetails = null;
			Object dynObj = payload.get("loanTypeSpecificDetails");
			if (dynObj instanceof Map) {
				specificDetails = (Map<String, Object>) dynObj;
			} else if (dynObj instanceof String && !((String) dynObj).trim().isEmpty()) {
				specificDetails = objectMapper.readValue((String) dynObj, new TypeReference<Map<String, Object>>() {});
			}

			// If not in loanTypeSpecificDetails, collect from root payload keys
			if (specificDetails == null || specificDetails.isEmpty()) {
				Map<String, Object> rootCollected = new HashMap<>();
				String[] allPossibleFields = new String[]{
					"employerName", "employeeId", "monthlyNetSalary", "salarySlipUpload", "bankStatementUpload",
					"businessName", "businessType", "yearsInBusiness", "monthlyTurnover", "tradeLicenseNo", "gstNo",
					"vehicleModel", "onRoadPrice", "downPayment", "dealerName", "chassisNo", "engineNo",
					"existingRcNo", "vehicleRegNo", "purchaseDate", "currentValuation", "vehicleAge",
					"productName", "dealerShopName", "invoiceNo", "productPrice",
					"depositAccountNo", "depositAmount", "maturityDate", "marginPercent", "lienConfirmed"
				};
				for (String key : allPossibleFields) {
					if (payload.containsKey(key) && payload.get(key) != null) {
						rootCollected.put(key, payload.get(key));
					}
				}
				if (!rootCollected.isEmpty()) {
					specificDetails = rootCollected;
				}
			}

			// Server-side validation
			String error = validateDynamicFields(typeOfLoan, specificDetails);
			if (error != null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(ApiResponse.error(HttpStatus.BAD_REQUEST, error));
			}

			// Convert payload map to LoanApplication
			LoanApplication loanApp = objectMapper.convertValue(payload, LoanApplication.class);
			if (specificDetails != null) {
				loanApp.setLoanTypeSpecificDetails(objectMapper.writeValueAsString(specificDetails));
			}

			boolean isSaved = loanServices.saveLoanApplicationData(loanApp);
			if (isSaved) {
				return ResponseEntity.ok(ApiResponse.success(HttpStatus.CREATED, "Loan application saved successfully.", loanApp));
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save loan application."));
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "Error: " + e.getMessage()));
		}
	}
}
