package com.microfinance.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import com.microfinance.dto.ApiResponse;
import com.microfinance.dto.LoanDeductionDetailsDto;
import com.microfinance.model.ApplyForGold;
import com.microfinance.model.LoanApplication;
import com.microfinance.model.LoanClosure;
import com.microfinance.model.LoanPayment;
import com.microfinance.model.LoanSchemCatalog;
import com.microfinance.model.addCustomer;
import com.microfinance.service.LoanManagementService;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/loanmanegment")
public class LoanManagementController {

	@Value("${upload.directory}")
	private String uploadDirectory;

	@Autowired
	private LoanManagementService loanServices;

	// data Fetch from name and id from customer model
	@GetMapping("/getByMemberCodeNewLoanApplication")
	public ResponseEntity<ApiResponse<List<addCustomer>>> getLoanByMemberCode(@RequestParam String memberCode) {
		try {
			List<addCustomer> customerList = loanServices.getLoanApplicationById(memberCode);

			if (customerList == null || customerList.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(new ApiResponse<>(HttpStatus.NOT_FOUND, "No customer found for member code", null));
			}

			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Customer(s) found", customerList));
		} catch (RuntimeException ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), null));
		}
	}

	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/Uploads/**").addResourceLocations("file:///" + uploadDirectory);
	}

	// fetch all data loan scheme catalog
	@GetMapping("/fetchLoanSchemeCatalog")
	public ResponseEntity<ApiResponse<List<LoanSchemCatalog>>> getSchemeCatalog() {
		List<LoanSchemCatalog> loanschemCodeList = loanServices.getSchemeCatalog();

		ApiResponse<List<LoanSchemCatalog>> response = new ApiResponse<>(HttpStatus.FOUND,
				"Loan Schem fetched successfully", loanschemCodeList);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/allfetchdataLoanPlanName")
	public ResponseEntity<ApiResponse<List<LoanSchemCatalog>>> getLoanPlanName(@RequestParam String loanPlanName) {
		List<LoanSchemCatalog> loanschemCodeList = loanServices.getLoanPlanName(loanPlanName);

		ApiResponse<List<LoanSchemCatalog>> response = new ApiResponse<>(HttpStatus.FOUND,
				"Loan Schem fetched successfully", loanschemCodeList);

		return ResponseEntity.ok(response);
	}

	// New Loan Application scheme loan code

	@GetMapping("/getBySchemLoanCode")
	public ResponseEntity<ApiResponse<LoanSchemCatalog>> getLoanByCode(@RequestParam String code) {
		try {
			LoanSchemCatalog loanScheme = loanServices.getLoanByCode(code);
			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Loan Scheme found", loanScheme));
		} catch (RuntimeException ex) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse<>(HttpStatus.NOT_FOUND, ex.getMessage(), null));
		}
	}

	// save loan application details
	@PostMapping("/saveloanapplication")
	public ResponseEntity<ApiResponse<LoanApplication>> saveSchemeCatalog(
			@RequestBody LoanApplication loanApplication) {

		try {
			loanApplication.syncDynamicFields();
			if (loanApplication.getLoanTypeSpecificDetails() != null && !loanApplication.getLoanTypeSpecificDetails().trim().isEmpty()) {
				try {
					Map<String, Object> map = new com.fasterxml.jackson.databind.ObjectMapper().readValue(
						loanApplication.getLoanTypeSpecificDetails(),
						new com.fasterxml.jackson.core.type.TypeReference<Map<String, Object>>() {}
					);
					String err = LoanApplyController.validateDynamicFields(loanApplication.getTypeOfLoan(), map);
					if (err != null) {
						return ResponseEntity.status(HttpStatus.BAD_REQUEST)
								.body(ApiResponse.error(HttpStatus.BAD_REQUEST, err));
					}
				} catch (Exception ignored) {}
			}

			boolean isSaved = loanServices.saveLoanApplicationData(loanApplication);

			if (isSaved) {
				ApiResponse<LoanApplication> response = ApiResponse.success(HttpStatus.CREATED,
						"Loan Application saved successfully.", loanApplication);
				return ResponseEntity.ok(response);
			} else {
				ApiResponse<LoanApplication> response = ApiResponse.error(HttpStatus.BAD_REQUEST, "Failed to save loan application.");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
			}
		} catch (IllegalArgumentException ex) {
			ApiResponse<LoanApplication> response = ApiResponse.error(HttpStatus.BAD_REQUEST, ex.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
	}

	@PostMapping("/validateDeductions")
	public ResponseEntity<ApiResponse<?>> validateDeductions(@RequestBody LoanDeductionDetailsDto dto) {
		try {
			if (dto.getLoanAmount() == null || dto.getLoanAmount().compareTo(java.math.BigDecimal.ZERO) <= 0) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(ApiResponse.error(HttpStatus.BAD_REQUEST, "Loan Amount must be greater than 0."));
			}

			com.microfinance.model.LoanDeductionDetails details = new com.microfinance.model.LoanDeductionDetails();
			details.setProcessingFee(dto.getProcessingFee());
			details.setLegalCharges(dto.getLegalCharges());
			details.setGst(dto.getGst());
			details.setInsuranceFee(dto.getInsuranceFee());
			details.setValuationFees(dto.getValuationFees());
			details.setStationaryChargesFee(dto.getStationaryChargesFee());
			details.setEmployeeId(dto.getEmployeeId());
			details.setEmployeeName(dto.getEmployeeName());

			details = loanServices.validateAndCalculateDeductions(dto.getLoanAmount(), details);

			dto.setProcessingFee(details.getProcessingFee());
			dto.setLegalCharges(details.getLegalCharges());
			dto.setGst(details.getGst());
			dto.setInsuranceFee(details.getInsuranceFee());
			dto.setValuationFees(details.getValuationFees());
			dto.setStationaryChargesFee(details.getStationaryChargesFee());
			dto.setTotalDeductions(details.getTotalDeductions());
			dto.setNetDisbursementAmount(details.getNetDisbursementAmount());
			dto.setEmployeeName(details.getEmployeeName());

			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Deductions calculated successfully", dto));
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(ApiResponse.error(HttpStatus.BAD_REQUEST, e.getMessage()));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "Calculation error: " + e.getMessage()));
		}
	}

	// Api for fetching Active Loan Id In the dropdown (Vaibhav)
	@GetMapping("/getAllActiveLoanIds")
	public ResponseEntity<ApiResponse<List<String>>> getAllLoanIds() {
		List<String> loanIds = loanServices.fetchAllLoanIds();

		if (loanIds != null && !loanIds.isEmpty()) {
			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Loan IDs fetched successfully", loanIds));
		} else {
			return ResponseEntity.status(HttpStatus.NO_CONTENT)
					.body(new ApiResponse<>(HttpStatus.NO_CONTENT, "No Loan IDs found", null));
		}
	}

	// Api for fething the details on the textfiled (Vaibhav)
	@GetMapping("/getLoanById")
	public ResponseEntity<ApiResponse<LoanApplication>> getLoanById(@RequestParam String loanId) {
		LoanApplication loan = loanServices.getLoanById(loanId);

		if (loan != null) {
			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Loan found", loan));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse<>(HttpStatus.NOT_FOUND, "Loan not found", null));
		}
	}

	// Api for approving the loan application (Vaibhav)
	@PostMapping("/approve")
	public ResponseEntity<ApiResponse<LoanApplication>> approveLoan(@RequestBody LoanApplication approval) {
		System.out.println("Approval request received for Loan ID: " + approval.getLoanId());
		String result = loanServices.updateApproval(approval);

		switch (result) {
			case "already_approved":
				return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Loan is already approved.", null));

			case "success":
				return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Loan approved successfully.", approval));

			default:
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(new ApiResponse<>(HttpStatus.BAD_REQUEST, "Unknown result", null));
		}
	}

	// API to fetch all approved and active loan id's loan IDs (Vaibhav)
	@GetMapping("/getApprovedLoanIds")
	public ResponseEntity<ApiResponse<List<String>>> getApprovedLoanIds() {
		List<String> approvedLoanIds = loanServices.getApprovedLoanIds();

		if (!approvedLoanIds.isEmpty()) {
			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Approved & Active loan IDs fetched successfully",
					approvedLoanIds));
		} else {
			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "No approved and active loans found",
					java.util.Collections.emptyList()));
		}
	}

	// API for Paying Emi (Vaibhav)
	@PostMapping("/payEmi")
	public ResponseEntity<ApiResponse<Map<String, Object>>> payEmi(@RequestBody LoanPayment request) {
		try {
			boolean isClosed = loanServices.processEmiPayment(request, "1");

			Map<String, Object> data = new HashMap<>();
			data.put("loanStatus", isClosed ? "CLOSED" : "ACTIVE");

			String message;
			if (isClosed) {
				message = "Loan is closed.";
			} else if ("Saving Account".equalsIgnoreCase(request.getPaymentMode())
					|| "Savings Account".equalsIgnoreCase(request.getPaymentMode())) {
				message = "Loan disbursed successfully and transferred to Customer's Savings Account.";
			} else {
				message = "Loan disbursed successfully in Cash.";
			}

			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, message, data));
		} catch (RuntimeException e) {
			// e.g. Insufficient balance
			Map<String, Object> data = new HashMap<>();
			data.put("error", e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse<>(HttpStatus.BAD_REQUEST, e.getMessage(), data));
		}
	}

	// API for fetching all data of loan payment
	@GetMapping("/fetchLoanPaymentsByLoanId")
	public ResponseEntity<ApiResponse<List<LoanPayment>>> fetchLoanPaymentsByLoanId(
			@RequestParam String loanId) {

		List<LoanPayment> list = loanServices.fetchLoanPaymentsByLoanId(loanId);

		if (list != null && !list.isEmpty()) {
			ApiResponse<List<LoanPayment>> response = new ApiResponse<>(
					HttpStatus.OK,
					"Loan Payments fetched successfully",
					list);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<LoanPayment>> response = new ApiResponse<>(
					HttpStatus.OK,
					"No payments yet for Loan ID: " + loanId,
					java.util.Collections.emptyList());
			return ResponseEntity.ok(response);
		}
	}

	// Api for fetching all the loan id's for loan statement(Vaibhav)
	@GetMapping("/getStatementLoanId")
	public ResponseEntity<ApiResponse<List<String>>> getStatementLoanId() {
		List<String> loanIds = loanServices.getStatementLoanId();

		if (loanIds != null && !loanIds.isEmpty()) {
			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Loan IDs fetched successfully", loanIds));
		} else {
			return ResponseEntity.status(HttpStatus.NO_CONTENT)
					.body(new ApiResponse<>(HttpStatus.NO_CONTENT, "No Loan IDs found", null));
		}
	}

	// Api for fetching the loan details by loan id(Vaibhav)
	@GetMapping("/fetchLoanStatement")
	public ResponseEntity<ApiResponse<List<LoanPayment>>> fetchLoanStatement(@RequestParam String loanId) {
		List<LoanPayment> loanPayments = loanServices.fetchLoanStatement(loanId);

		if (loanPayments != null && !loanPayments.isEmpty()) {
			return ResponseEntity.ok(
					new ApiResponse<>(HttpStatus.OK, "Loan payments found", loanPayments));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse<>(HttpStatus.NOT_FOUND, "No loan payments found for this Loan ID", null));
		}
	}

	// API for fetching single installment data by loanId and installment number
	@GetMapping("/fetchLoanPaymentByLoanIdAndInst")
	public ResponseEntity<ApiResponse<LoanPayment>> fetchLoanPaymentByLoanIdAndInst(
			@RequestParam String loanId,
			@RequestParam String remarks) {

		String normalizedRemarks = remarks.trim().toLowerCase();
		List<LoanPayment> payments = loanServices.fetchLoanPaymentsByLoanId(loanId);
		LoanPayment payment = payments.stream()
				.filter(p -> {
					if (p == null) return false;
					String r = p.getRemarks() != null ? p.getRemarks().trim().toLowerCase() : "";
					String n = p.getNoOfInst() != null ? p.getNoOfInst().trim().toLowerCase() : "";
					String idStr = String.valueOf(p.getId());
					return r.equals(normalizedRemarks)
							|| n.equals(normalizedRemarks)
							|| idStr.equals(normalizedRemarks)
							|| (normalizedRemarks.matches("\\d+") && (n.equals(normalizedRemarks) || r.endsWith(" " + normalizedRemarks)))
							|| r.contains(normalizedRemarks)
							|| (!r.isEmpty() && normalizedRemarks.contains(r));
				})
				.findFirst()
				.orElse(null);

		if (payment != null) {
			if (payment.getDueDate() == null || payment.getDueDate().trim().isEmpty()) {
				try {
					int instNo = 1;
					if (payment.getRemarks() != null && payment.getRemarks().matches(".*\\d+.*")) {
						String digits = payment.getRemarks().replaceAll("\\D+", "");
						if (!digits.isEmpty()) instNo = Integer.parseInt(digits);
					} else if (payment.getNoOfInst() != null && payment.getNoOfInst().matches("\\d+")) {
						instNo = Integer.parseInt(payment.getNoOfInst());
					}
					int periodDays = 30;
					String mode = payment.getLoanMode();
					if ("Daily".equalsIgnoreCase(mode)) periodDays = 1;
					else if ("Weekly".equalsIgnoreCase(mode)) periodDays = 7;
					else if ("Fortnightly".equalsIgnoreCase(mode)) periodDays = 14;
					else if ("Quarterly".equalsIgnoreCase(mode)) periodDays = 91;

					String baseDate = payment.getLoanDate();
					if (baseDate != null && !baseDate.trim().isEmpty()) {
						java.time.LocalDate emiDue = java.time.LocalDate.parse(baseDate.trim()).plusDays((long) instNo * periodDays);
						payment.setDueDate(emiDue.toString());
					}
				} catch (Exception ignored) {}
			}

			ApiResponse<LoanPayment> response = new ApiResponse<>(
					HttpStatus.OK,
					"Loan Installment fetched successfully",
					payment);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<LoanPayment> response = new ApiResponse<>(
					HttpStatus.NOT_FOUND,
					"No installment found for Loan ID: " + loanId + " and Installment: " + remarks,
					null);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// API for calculating foreclosure settlement breakdown server-side
	@GetMapping("/calculateForeclosure")
	public ResponseEntity<ApiResponse<com.microfinance.dto.ForeclosureSettlementDto>> calculateForeclosure(@RequestParam("loanId") String loanId) {
		try {
			com.microfinance.dto.ForeclosureSettlementDto dto = loanServices.calculateForeclosureSettlement(loanId);
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Foreclosure settlement calculated successfully", dto));
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(ApiResponse.error(HttpStatus.BAD_REQUEST, e.getMessage()));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()));
		}
	}

	// Api for closing the loan and saving the data in the loan closure
	@PostMapping("/closeLoan")
	public ResponseEntity<ApiResponse<Map<String, Object>>> closeLoan(@RequestBody LoanClosure paymentDetails) {
		try {
			Map<String, Object> result = loanServices.closeLoan(paymentDetails);
			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, (String) result.getOrDefault("message", "Loan closed successfully"), result));
		} catch (IllegalArgumentException | IllegalStateException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse<>(HttpStatus.BAD_REQUEST, e.getMessage(), null));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), null));
		}
	}

	// --------------------------Settled Loan Records--------------------
	// API to fetch all closed loan record IDs
	@GetMapping("/getClosedLoanIds")
	public ResponseEntity<ApiResponse<List<String>>> getClosedLoanIds() {
		List<String> closedLoanIds = loanServices.getClosedLoanIds();

		if (closedLoanIds != null && !closedLoanIds.isEmpty()) {
			return ResponseEntity
					.ok(new ApiResponse<>(HttpStatus.OK, "Closed loan IDs fetched successfully", closedLoanIds));
		} else {
			return ResponseEntity.status(HttpStatus.NO_CONTENT)
					.body(new ApiResponse<>(HttpStatus.NO_CONTENT, "No closed loan records found", null));
		}
	}

	// API to fetch all loan closure records
	@GetMapping("/getLoanClosuresByLoanId")
	public ResponseEntity<ApiResponse<List<LoanClosure>>> getLoanClosuresByLoanId(@RequestParam String loanId) {
		List<LoanClosure> closures = loanServices.getLoanClosuresByLoanId(loanId);

		if (closures != null && !closures.isEmpty()) {
			return ResponseEntity
					.ok(new ApiResponse<>(HttpStatus.OK, "Loan closure records fetched successfully", closures));
		} else {
			return ResponseEntity.status(HttpStatus.NO_CONTENT)
					.body(new ApiResponse<>(HttpStatus.NO_CONTENT, "No loan closure records found for this loan ID",
							null));
		}
	}

	@GetMapping("/getAllNotApprovedLoanCustomer")
	public ResponseEntity<ApiResponse<List<LoanApplication>>> getNotApprovedLoanCustomer() {
		List<LoanApplication> loan = loanServices.getNotApprovedLoanCustomer();
		if (loan != null && !loan.isEmpty()) {

			ApiResponse<List<LoanApplication>> response = new ApiResponse<>(HttpStatus.OK,
					"UnApproved Loan Data fetched successfully.", loan);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<LoanApplication>> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"No Unapproved Loan Customer found.", null);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// ── Penalty Preview API ───────────────────────────────────────────────────
	/**
	 * Returns penalty details for a given loanId + proposed paymentDate.
	 * Used by the UI for real-time penalty display before submission.
	 * GET /api/loanmanegment/calculatePenaltyPreview?loanId=LA00001&paymentDate=2026-09-20
	 */
	@GetMapping("/calculatePenaltyPreview")
	public ResponseEntity<ApiResponse<java.util.Map<String, Object>>> calculatePenaltyPreview(
			@RequestParam String loanId,
			@RequestParam String paymentDate) {
		try {
			if (loanId == null || loanId.trim().isEmpty() || paymentDate == null || paymentDate.trim().isEmpty()) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(ApiResponse.error(HttpStatus.BAD_REQUEST, "loanId and paymentDate are required."));
			}
			java.util.Map<String, Object> result = loanServices.calculatePenaltyPreview(loanId.trim(), paymentDate.trim());
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Penalty preview calculated", result));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "Error: " + e.getMessage()));
		}
	}

	@PostMapping("/payRegularInstallment")
	public ResponseEntity<ApiResponse<java.util.Map<String, Object>>> payRegularInstallment(@RequestBody java.util.Map<String, Object> req) {
		try {
			java.util.Map<String, Object> result = loanServices.payRegularInstallment(req);
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, (String) result.get("message"), result));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(ApiResponse.error(HttpStatus.BAD_REQUEST, e.getMessage()));
		}
	}

	@PostMapping("/resetLoanInstallments")
	public ResponseEntity<ApiResponse<java.util.Map<String, Object>>> resetLoanInstallments(@RequestParam String loanId) {
		try {
			java.util.Map<String, Object> result = loanServices.resetLoanInstallments(loanId);
			return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, (String) result.get("message"), result));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(ApiResponse.error(HttpStatus.BAD_REQUEST, e.getMessage()));
		}
	}

}
