package com.microfinance.controller;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.microfinance.dto.ApiResponse;
import com.microfinance.dto.RegularLoanStatementResponse;
import com.microfinance.model.LoanApplication;
import com.microfinance.service.LoanDocumentService;
import com.microfinance.service.LoanManagementService;

@RestController
@RequestMapping("/api/loans")
public class LoanApplyController {

	@Autowired
	private LoanManagementService loanServices;

	@Autowired
	private LoanDocumentService loanDocumentService;

	private static final ObjectMapper objectMapper = new ObjectMapper();

	public static String validateDynamicFields(String typeOfLoan, Map<String, Object> details) {
		if (typeOfLoan == null || typeOfLoan.trim().isEmpty()) {
			return "TYPE OF LOAN IS REQUIRED";
		}

		Map<String, List<String>> requiredMap = new HashMap<>();
		requiredMap.put("Personal Loan",
				Arrays.asList("employerName", "employeeId", "monthlyNetSalary", "salarySlipUpload"));
		requiredMap.put("Business Loan",
				Arrays.asList("businessName", "businessType", "yearsInBusiness", "monthlyTurnover", "tradeLicenseNo"));
		requiredMap.put("TW Loan",
				Arrays.asList("vehicleModel", "onRoadPrice", "downPayment", "dealerName", "chassisNo", "engineNo"));
		requiredMap.put("TW Refinance Loan",
				Arrays.asList("existingRcNo", "vehicleRegNo", "purchaseDate", "currentValuation", "vehicleAge"));
		requiredMap.put("CDL Loan", Arrays.asList("productName", "dealerShopName", "invoiceNo", "productPrice"));
		requiredMap.put("Loan Against FD/RD/DRD",
				Arrays.asList("depositAccountNo", "depositAmount", "maturityDate", "marginPercent", "lienConfirmed"));

		List<String> requiredFields = requiredMap.get(typeOfLoan.trim());
		if (requiredFields != null) {
			if (details == null || details.isEmpty()) {
				return "DYNAMIC LOAN DETAILS ARE REQUIRED FOR " + typeOfLoan;
			}
			for (String field : requiredFields) {
				Object val = details.get(field);
				if (val == null) {
					return "REQUIRED FIELD '" + field + "' IS MISSING FOR " + typeOfLoan;
				}
				String strVal = val.toString().trim();
				if (strVal.isEmpty() || "false".equalsIgnoreCase(strVal)) {
					return "REQUIRED FIELD '" + field + "' IS EMPTY OR NOT CONFIRMED FOR " + typeOfLoan;
				}
			}
		}
		return null;
	}

	@PostMapping({ "/apply", "/saveloanapplication" })
	public ResponseEntity<ApiResponse<?>> applyLoan(@RequestBody Map<String, Object> payload) {
		try {
			String typeOfLoan = (String) payload.get("typeOfLoan");

			// Extract loanTypeSpecificDetails which may be a nested Map or JSON String
			Map<String, Object> specificDetails = null;
			Object dynObj = payload.get("loanTypeSpecificDetails");
			if (dynObj instanceof Map) {
				specificDetails = (Map<String, Object>) dynObj;
			} else if (dynObj instanceof String && !((String) dynObj).trim().isEmpty()) {
				specificDetails = objectMapper.readValue((String) dynObj, new TypeReference<Map<String, Object>>() {
				});
			}

			// If not in loanTypeSpecificDetails, collect from root payload keys
			if (specificDetails == null || specificDetails.isEmpty()) {
				Map<String, Object> rootCollected = new HashMap<>();
				String[] allPossibleFields = new String[] { "employerName", "employeeId", "monthlyNetSalary",
						"salarySlipUpload", "bankStatementUpload", "businessName", "businessType", "yearsInBusiness",
						"monthlyTurnover", "tradeLicenseNo", "gstNo", "vehicleModel", "onRoadPrice", "downPayment",
						"dealerName", "chassisNo", "engineNo", "existingRcNo", "vehicleRegNo", "purchaseDate",
						"currentValuation", "vehicleAge", "productName", "dealerShopName", "invoiceNo", "productPrice",
						"depositAccountNo", "depositAmount", "maturityDate", "marginPercent", "lienConfirmed" };
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
				return ResponseEntity
						.ok(ApiResponse.success(HttpStatus.CREATED, "LOAN APPLICATION SAVED SUCCESSFULLY.", loanApp));
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "FAILED TO SAVE LOAN APPLICATION."));
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "ERROR: " + e.getMessage()));
		}
	}

	@GetMapping("/printable-loan-ids")
	public ResponseEntity<ApiResponse<List<String>>> getPrintableLoanIds() {
		List<String> ids = loanDocumentService.getPrintableLoanIds();
		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "PRINTABLE LOAN IDS FETCHED", ids));
	}

	@GetMapping("/{loanId}/details")
	public ResponseEntity<ApiResponse<Map<String, Object>>> getLoanDetails(@PathVariable("loanId") String loanId) {
		try {
			Map<String, Object> details = loanDocumentService.getLoanDetails(loanId);
			if (details == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(ApiResponse.error(HttpStatus.NOT_FOUND, "LOAN APPLICATION NOT FOUND FOR ID: " + loanId));
			}
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "LOAN DETAILS FETCHED SUCCESSFULLY", details));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, "NO LOAN FOUND FOR ID: " + loanId));
		}
	}

	@GetMapping("/{loanId}/available-documents")
	public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getAvailableDocuments(@PathVariable("loanId") String loanId) {
		List<Map<String, Object>> docs = loanDocumentService.getAvailableDocuments(loanId);
		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "AVAILABLE DOCUMENTS FETCHED SUCCESSFULLY", docs));
	}

	@GetMapping("/{loanId}/document-logs")
	public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getDocumentLogs(@PathVariable("loanId") String loanId) {
		List<Map<String, Object>> logs = loanDocumentService.getDocumentLogs(loanId);
		return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "DOCUMENT LOGS FETCHED SUCCESSFULLY", logs));
	}

	@GetMapping(value = "/{loanId}/documents/{docType}/preview", produces = MediaType.TEXT_HTML_VALUE)
	public ResponseEntity<String> previewDocument(@PathVariable("loanId") String loanId, @PathVariable("docType") String docType) {
		try {
			String html = loanDocumentService.generateDocumentHtml(loanId, docType);
			return ResponseEntity.ok(html);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("<div class='alert alert-danger'>ERROR GENERATING PREVIEW: " + e.getMessage() + "</div>");
		}
	}

	@PostMapping("/{loanId}/documents/{docType}/generate")
	public ResponseEntity<?> generateDocumentPdf(@PathVariable("loanId") String loanId, @PathVariable("docType") String docType) {
		try {
			byte[] pdfBytes = loanDocumentService.generateDocumentPdf(loanId, docType);
			return ResponseEntity.ok()
					.contentType(MediaType.APPLICATION_PDF)
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + docType + "_" + loanId + ".pdf\"")
					.body(pdfBytes);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("ERROR GENERATING PDF: " + e.getMessage());
		}
	}

	@GetMapping("/statement/regular")
	public ResponseEntity<?> getRegularLoanStatement(@RequestParam("loanCode") String loanCode) {
		try {
			RegularLoanStatementResponse resp = loanServices.getRegularLoanStatement(loanCode);
			if (resp == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(Collections.singletonMap("message", "LOAN STATEMENT NOT FOUND FOR CODE: " + loanCode));
			}
			return ResponseEntity.ok(resp);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(Collections.singletonMap("message", "NO LOAN FOUND FOR CODE: " + loanCode));
		}
	}
}
