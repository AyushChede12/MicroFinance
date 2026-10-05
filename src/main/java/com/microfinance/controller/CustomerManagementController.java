package com.microfinance.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.microfinance.dto.ApiResponse;
import com.microfinance.dto.CustomerDto;
import com.microfinance.model.addCustomer;
import com.microfinance.model.addCustomerKYC;
import com.microfinance.model.states;
import com.microfinance.repository.CustomerRepo;
import com.microfinance.service.CustomerManagementService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.MediaType;

@RestController
@RequestMapping("/api/customermanagement")
public class CustomerManagementController {
	@Autowired
	CustomerManagementService customerService;

	@Autowired
	CustomerRepo customerRepo;

	@PostMapping("/saveOrUpdateCustomer")
	public ResponseEntity<ApiResponse<addCustomer>> saveOrUpdateCustomer(@ModelAttribute CustomerDto clientMasterDto,
			@RequestParam(value = "customerPhoto", required = false) MultipartFile customerPhoto,
			@RequestParam(value = "customerSignature", required = false) MultipartFile customerSignature,
			@RequestParam(value = "customerDriving", required = false) MultipartFile customerDriving,
			@RequestParam(value = "customerVoter", required = false) MultipartFile customerVoter,
			@RequestParam(value = "nomineAadhar", required = false) MultipartFile nomineAadhar,
			@RequestParam(value = "nomineSignature", required = false) MultipartFile nomineSignature,
			@RequestParam(value = "newlyAddedImage", required = false) MultipartFile newlyAddedImage)

	{

		try {

			ApiResponse<addCustomer> response = customerService.saveOrUpdateCustomer(clientMasterDto, customerPhoto,
					customerSignature, customerDriving, customerVoter, nomineAadhar, nomineSignature, newlyAddedImage);
			return new ResponseEntity<>(response, response.getStatus());

		} catch (Exception e) {
			e.printStackTrace(); // Log to console
			return new ResponseEntity<>(
					ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "Error saving customer: " + e.getMessage()),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getAllCustomer") // Niraj
	public ResponseEntity<ApiResponse<List<addCustomer>>> getAllCustomer() {

		List<addCustomer> list = customerService.getAllCustomer();

		return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Customer data fetched successfully", list));
	}

	// get Data by MemberCode
	@PostMapping("/fetchBySelectedCustomer")
	public List<addCustomer> fetchBySelectedMember(@RequestBody addCustomer customer) {
		List<addCustomer> list = customerService.fetchBySelectedMember(customer.getMemberCode());
		return list;
	}

	// Add Member Kyc //

	/*
	 * @PostMapping("/saveOrUpdateCustomerKYC") public
	 * ResponseEntity<ApiResponse<addCustomerKYC>> saveOrUpdateCustomerKYC(
	 * 
	 * @ModelAttribute addCustomerKYC kyc,
	 * 
	 * @RequestParam(value = "customerPhoto", required = false) MultipartFile
	 * customerPhoto,
	 * 
	 * @RequestParam(value = "customerSignature", required = false) MultipartFile
	 * customerSignature,
	 * 
	 * @RequestParam(value = "aadharFrontPhoto", required = false) MultipartFile
	 * aadharFrontPhoto,
	 * 
	 * @RequestParam(value = "aadharBackPhoto", required = false) MultipartFile
	 * aadharBackPhoto,
	 * 
	 * @RequestParam(value = "panPhoto", required = false) MultipartFile panPhoto) {
	 * 
	 * ApiResponse<addCustomerKYC> response =
	 * customerService.saveOrUpdateCustomerKYC( kyc, customerPhoto,
	 * customerSignature, aadharFrontPhoto, aadharBackPhoto, panPhoto);
	 * 
	 * return new ResponseEntity<>(response, response.getStatus()); }
	 */

	@PostMapping("/verifyFetchedData")
	public ResponseEntity<Map<String, Object>> verifyFetchedData(@RequestBody Map<String, Object> fetchedData) {
		String customerCode = (String) fetchedData.get("memberCode");

		Map<String, Object> response = new HashMap<>();

		// Fetch customer by code
		Optional<addCustomer> optionalCustomer = customerRepo.findByMemberCode(customerCode);

		if (!optionalCustomer.isPresent()) {
			response.put("isVerified", false);
			response.put("message", "Customer not found!");
			return ResponseEntity.ok(response);
		}

		addCustomer customer = optionalCustomer.get();

		if (customer.isVerified()) {
			response.put("isVerified", true);
			response.put("message", "This customer is already verified!");
			return ResponseEntity.ok(response);
		}

		// Required fields to validate
		String[] requiredFields = { "memberCode", "customerName", "contactNo", "signupDate", "aadharNo", "pan",
				"voterNo", "drivingLicenceNo" };

		boolean isVerified = true;
		StringBuilder missingFields = new StringBuilder();

		for (String field : requiredFields) {
			Object value = fetchedData.get(field);
			if (value == null || value.toString().trim().isEmpty()) {
				isVerified = false;
				missingFields.append(field).append(", ");
			}
		}

		if (!isVerified) {
			response.put("isVerified", false);
			response.put("message", "Verification failed. Missing fields: " + missingFields.toString());
		} else {
			customer.setVerified(true);
			customerRepo.save(customer);

			response.put("isVerified", true);
			response.put("message", "Verification successful!");
		}

		return ResponseEntity.ok(response);
	}

	@GetMapping("/approved")
	public ResponseEntity<ApiResponse<List<addCustomer>>> getApprovedCustomers() {
		List<addCustomer> customers = customerService.getApprovedCustomers();

		ApiResponse<List<addCustomer>> response = ApiResponse.success(HttpStatus.OK,
				"Approved customers fetched successfully.", customers);

		return ResponseEntity.ok(response);
	}

	// DYNAMIC MULTIPLE IMAGES UPLOAD
	@PostMapping(value = "/upload/{customerId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> uploadCustomerImage(@PathVariable Long customerId, @RequestParam String fieldName,
			@RequestParam MultipartFile file) {
		try {
			return ResponseEntity.ok(customerService.saveOrUpdateCustomerImage(customerId, fieldName, file));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed: " + e.getMessage());
		}
	}

	// GET ALL CUSTOMER IMAGES
	@GetMapping("/images/{customerId}")
	public ResponseEntity<?> getCustomerImages(@PathVariable Long customerId) {
		return ResponseEntity.ok(customerService.getCustomerImages(customerId));
	}

	// DELETE CUSTOMER IMAGE
	@PostMapping("/delete/{id}")
	public ResponseEntity<?> deleteCustomerImage(@PathVariable String id) {
		boolean deleted = customerService.deleteCustomerImage(id);
		if (!deleted) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image not found");
		}
		return ResponseEntity.ok("Image deleted successfully");
	}

}