package com.microfinance.controller;

import java.io.IOException;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.microfinance.dto.ApiResponse;

import com.microfinance.dto.FinancialConsultantDto;
import com.microfinance.model.ConsultantPromotionManagement;
import com.microfinance.model.addCustomer;
import com.microfinance.model.addFinancialConsultant;

import com.microfinance.service.FinancialConsultantService;

@RestController
@RequestMapping("/api/financialconsultant")
public class FinancialConsultantController {
	@Autowired
	FinancialConsultantService financialConsultantService;

	/*
	 * @PostMapping("/getAllCustomerCodes") // Poonam 13-06-2025 public
	 * ResponseEntity<ApiResponse<List<addCustomer>>> getAllCustomerCodes() {
	 * List<addCustomer> list = financialConsultantService.getAllCustomerCodes();
	 * ApiResponse<List<addCustomer>> response =
	 * ApiResponse.success(HttpStatus.FOUND,"Customer codes fetched successfully"
	 * ,list); return new ResponseEntity<>(response, HttpStatus.OK); }
	 */

	@PostMapping("/getAllBranch") // poonam 13-06-2025
	public ResponseEntity<ApiResponse<List<addCustomer>>> getAllBranch() {
		List<addCustomer> list = financialConsultantService.getAllBranch();
		ApiResponse<List<addCustomer>> response= ApiResponse.success(HttpStatus.OK, "Branch Fetched Successfully", list);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}

	@PostMapping("/getAllRelationToApplicant")
	public ResponseEntity<ApiResponse<List<addCustomer>>> getAllRelationToApplicant() {
		List<addCustomer> list = financialConsultantService.getAllRelationToApplicant();
		ApiResponse<List<addCustomer>> response= ApiResponse.success(HttpStatus.OK, "Relation Fetched Successfully", list);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}

	/*@PostMapping("/getFinancialConsultantByMemberCode")
	public ResponseEntity<ApiResponse<List<addCustomer>>> getMemberByCode(@RequestParam String memberCode) {

	    List<addCustomer> members = financialConsultantService.getByMemberCode(memberCode);

	    if (members != null && !members.isEmpty()) {
	        ApiResponse<List<addCustomer>> response = ApiResponse.success(
	            HttpStatus.OK,
	            "Consultants found for memberCode: " + memberCode,
	            members
	        );
	        return new ResponseEntity<>(response, HttpStatus.OK);
	    } else {
	        ApiResponse<List<addCustomer>> response = ApiResponse.error(
	            HttpStatus.NOT_FOUND,
	            "No member found with this code"
	        );
	        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	    }
	}
	*/



	/*
	 * @PostMapping("/saveOrUpdateFinancialConsultant") public
	 * ResponseEntity<ApiResponse<addFinancialConsultant>>
	 * saveOrUpdateFinancialConsultant(
	 * 
	 * @ModelAttribute FinancialConsultantDto financialConsultantDto) {
	 * 
	 * ApiResponse<addFinancialConsultant> response = financialConsultantService
	 * .saveOrUpdateFinancialConsultant(financialConsultantDto);
	 * 
	 * return new ResponseEntity<>(response, response.getStatus()); }
	 */
	
	@PostMapping("/saveOrUpdateFinancialConsultant")
	public ResponseEntity<ApiResponse<addFinancialConsultant>> saveOrUpdateFinancialConsultant(
	        @ModelAttribute FinancialConsultantDto financialConsultantDto,
	        @RequestParam(value = "financialPhoto", required = false) MultipartFile financialPhoto, @RequestParam(value = "finnacialSignature", required = false) MultipartFile finnacialSignature) {
		
		 // System.out.println("Received file: " + (signature != null ? signature.getOriginalFilename() : "No file uploaded"));
		 
		
		System.out.println("Received financialPhoto: " + financialPhoto);
	    
	    System.out.println("Received Signature: " + finnacialSignature);	    
	    
	    ApiResponse<addFinancialConsultant> response = financialConsultantService.saveOrUpdateFinancialConsultant(financialConsultantDto, financialPhoto, finnacialSignature);
	    return new ResponseEntity<>(response, response.getStatus());
	}
	
	@PostMapping("/getAllFinancialConsultantDetails")
	public ResponseEntity<ApiResponse<List<addFinancialConsultant>>> getAllFinancialConsultantDetails() {
		List<addFinancialConsultant> list = financialConsultantService.getAllFinancialConsultantDetails();
		ApiResponse<List<addFinancialConsultant>> response= ApiResponse.success(HttpStatus.OK, "Details Fetched Successfully", list);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}


	
	@GetMapping("/getFinancialConsultantById")
	public ResponseEntity<ApiResponse<addFinancialConsultant>> findFinancialConsultantById(@RequestParam("id") Long id) {
	    Optional<addFinancialConsultant> financial = financialConsultantService.FinancialConsultantById(id);

	    if (financial.isPresent()) {
	        ApiResponse<addFinancialConsultant> response = ApiResponse.success(
	            HttpStatus.OK, "Financial Consultant data found successfully", financial.get());
	        return ResponseEntity.ok(response);
	    } else {
	        ApiResponse<addFinancialConsultant> response = ApiResponse.error(
	            HttpStatus.NOT_FOUND, "Financial Consultant data not found");
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	    }
	}
	
	
	@PostMapping("/deleteFinancialConsultantById")
	public ResponseEntity<ApiResponse<String>> deleteFinancialConsultant(@RequestParam("id") Long id) {
	    boolean isDeleted = financialConsultantService.deleteFinancialConsultant(id);
	    
	    if (isDeleted) {
	        ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Financial Consultant deleted successfully", "success");
	        return ResponseEntity.ok(response);
	    } else {
	        ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "Financial Consultant deletion failed", "failure");
	        return ResponseEntity.badRequest().body(response);
	    }
	}

// For financialConsultantHierarchy
	
	@GetMapping("/getfinancialHierarchyByFinancialCode")
	public ResponseEntity<ApiResponse<List<addFinancialConsultant>>> getfinancialHierarchyByFinancialCode(@RequestParam String financialCode) {

	    List<addFinancialConsultant> financialconsultant = financialConsultantService.fetchfinancialHierarchyByFinancialCode(financialCode);

	    if (financialconsultant != null && !financialconsultant.isEmpty()) {
	        ApiResponse<List<addFinancialConsultant>> response = ApiResponse.success(
	            HttpStatus.OK,
	            "Consultants found for financialCode: " + financialCode,
	            financialconsultant
	        );
	        return new ResponseEntity<>(response, HttpStatus.OK);
	    } else {
	        ApiResponse<List<addFinancialConsultant>> response = ApiResponse.error(
	            HttpStatus.NOT_FOUND,
	            "No member found with this code"
	        );
	        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	    }
	}
	

	//janvi: Approved Financial Consultant 30/06/2025
	@PostMapping("/approvedFinancialConsultantData")
	public ResponseEntity<ApiResponse<addFinancialConsultant>> updateIsApprovedStatus(
	        @RequestParam Long id,
	        @RequestParam boolean isApproved) {

	    Optional<addFinancialConsultant> optionalCustomer = financialConsultantService.FinancialConsultantById(id);

	    if (!optionalCustomer.isPresent()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                .body(ApiResponse.error(HttpStatus.NOT_FOUND, "Customer with ID " + id + " not found."));
	    }

	    addFinancialConsultant customer = optionalCustomer.get();
	    customer.setApproved(isApproved); // ✅ Use a proper setter method
	    addFinancialConsultant updated = financialConsultantService.save(customer);

	    return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "isApproved status updated for ID " + id, updated));
	}
	
	//Janvi : get Unapproved Financial Consultants 01/07/2025
	@PostMapping("/getUnapprovedFinancialConsultants")
    public ResponseEntity<ApiResponse<List<addFinancialConsultant>>> getUnapprovedFinancialConsultants() {
        List<addFinancialConsultant> list = financialConsultantService.getUnapprovedFinancialConsultants();
        ApiResponse<List<addFinancialConsultant>> response = ApiResponse.success(
            HttpStatus.OK, 
            "Unapproved Financial Consultants fetched successfully", 
            list
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
	
	
	//poonam : for financial promotion save and update on 16/07/2025
	
	@PostMapping("/saveOrUpdatePromotionData")
	public ResponseEntity<ApiResponse<String>> saveOrUpdatePromotionData(
	        @ModelAttribute ConsultantPromotionManagement promotionData,
	        @RequestParam("id") Long id) {

	    try {
	        String result = financialConsultantService.savePromotionAndUpdatePosition(promotionData, id);
	        return new ResponseEntity<>(ApiResponse.success(HttpStatus.OK, result, null), HttpStatus.OK);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return new ResponseEntity<>(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}


	@PostMapping("/getAllPromotionManagementDetails")
	public ResponseEntity<ApiResponse<List<ConsultantPromotionManagement>>> getAllPromotionManagementDetails() {
		List<ConsultantPromotionManagement> list = financialConsultantService.getAllPromotionManagementDetail();
		ApiResponse<List<ConsultantPromotionManagement>> response= ApiResponse.success(HttpStatus.OK, "Details Fetched Successfully", list);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}	
	
}
