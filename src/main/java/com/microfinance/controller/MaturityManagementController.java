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

import com.microfinance.model.partialMaturityPayment;
import com.microfinance.service.MaturitySchemeMasterService;
import com.microfinance.service.PolicyManagementService;


@RestController
@RequestMapping("/api/Maturitymanagement")
public class MaturityManagementController {
	
	
	@Autowired
	MaturitySchemeMasterService maturityservice;
	
	@Autowired
	PolicyManagementService policyManagementService;
	
	
	//Save Apply Maturity
	//Ashwini

	@PostMapping("/saveApplymaturity")
	@ResponseBody
	public ApiResponse<ApplyForMaturity> saveApplymaturity(@RequestBody ApplyForMaturity Applymaturity) {
		ApplyForMaturity maturity = maturityservice.saveApplymaturity(Applymaturity);
		
		if (maturity != null) {
			return ApiResponse.success(HttpStatus.OK,"Data saved successfully",maturity);
	    } 
		else {
			return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR,"Data could not be saved");
	       
	    }

	}
	
	
	//view Apply Maturity Details
	
	@GetMapping("/getApplymaturitydetails")
 	public ResponseEntity<ApiResponse<List<ApplyForMaturity>>> getApplyMaturityDetails() {
 		 List<ApplyForMaturity> invest = maturityservice.getApplyMaturityDetails();
 		 
 		 if (invest != null && !invest.isEmpty()) {
 	            ApiResponse<List<ApplyForMaturity>> response = ApiResponse.success(HttpStatus.OK,
 	                "Investment Details fetched successfully.",
 	                invest
 	            );
 	            return new ResponseEntity<>(response, HttpStatus.OK);
 	        } else {
 	            ApiResponse<List<ApplyForMaturity>> response = ApiResponse.error(HttpStatus.NOT_FOUND,
 	                "No Details found."
 	            );
 	            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
 	        }
 	}
	
	@GetMapping("/getApplymaturitydetailswithPage")
	public ResponseEntity<ApiResponse<Map<String, Object>>> getApplyMaturityDetailsWithPage(
	        @RequestParam(defaultValue = "0") int page,
	        @RequestParam(defaultValue = "5") int size) {

	    Page<ApplyForMaturity> invest = maturityservice.getApplyMaturityDetailsWithPage(page, size);

	    if (invest != null && !invest.isEmpty()) {

	        Map<String, Object> responseData = new HashMap<>();
	        responseData.put("content", invest.getContent());
	        responseData.put("currentPage", invest.getNumber());
	        responseData.put("totalPages", invest.getTotalPages());

	        ApiResponse<Map<String, Object>> response = ApiResponse.success(
	                HttpStatus.OK,
	                "Investment details fetched successfully.",
	                responseData
	        );

	        return ResponseEntity.ok(response);

	    } else {
	        ApiResponse<Map<String, Object>> response = ApiResponse.error(
	                HttpStatus.NOT_FOUND,
	                "No details found."
	        );
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	    }
	}


	
	// view data of apply maturity by branch name and todate - fromdate
	
	@GetMapping("/getMaturityByBranchAndDate")
	public ResponseEntity<ApiResponse<List<ApplyForMaturity>>> getMaturityByBranchAndDate(
	        @RequestParam String branchName,
	        @RequestParam String fromDate,
	        @RequestParam String toDate) {

	    
	    List<ApplyForMaturity> data = maturityservice.getMaturityDetailsByBranchAndDate(branchName, fromDate, toDate);

	    if (data != null && !data.isEmpty()) {
	        ApiResponse<List<ApplyForMaturity>> response = ApiResponse.success(HttpStatus.OK,
	                "Filtered maturity details fetched successfully.", data);
	        return ResponseEntity.ok(response);
	    } else {
	        ApiResponse<List<ApplyForMaturity>> response = ApiResponse.error(HttpStatus.NOT_FOUND,
	                "No data found for the given branch and date range.");
	        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	    }
	}
	
	//save and Update Partial Maturity Payment
	//Ashwini
	@PostMapping("/savePartialmaturity")
	@ResponseBody
	public ApiResponse<partialMaturityPayment> savePartialmaturity(@RequestBody partialMaturityPayment partialmaturity) {
		partialMaturityPayment maturity = maturityservice.savePartialmaturity(partialmaturity);
		
		if (maturity != null) {
			return ApiResponse.success(HttpStatus.OK,"Data saved successfully",maturity);
	    } 
		else {
			return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR,"Data could not be saved");
	       
	    }

	}
	
	@GetMapping("/getPartialmaturitydetails")
 	public ResponseEntity<ApiResponse<List<partialMaturityPayment>>> getPartialMaturityDetails() {
 		 List<partialMaturityPayment> invest = maturityservice.getPartialMaturityDetails();
 		 
 		 if (invest != null && !invest.isEmpty()) {
 	            ApiResponse<List<partialMaturityPayment>> response = ApiResponse.success(HttpStatus.OK,
 	                "Investment Details fetched successfully.",
 	                invest
 	            );
 	            return new ResponseEntity<>(response, HttpStatus.OK);
 	        } else {
 	            ApiResponse<List<partialMaturityPayment>> response = ApiResponse.error(HttpStatus.NOT_FOUND,
 	                "No Details found."
 	            );
 	            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
 	        }
 	}
	
	//save and Update Full Maturity Payment
		//Ashwini
		@PostMapping("/saveFullmaturity")
		@ResponseBody
		public ApiResponse<FullMaturity> saveFullmaturity(@RequestBody FullMaturity fullmaturity) {
			FullMaturity maturity = maturityservice.saveFullmaturity(fullmaturity);
			
			if (maturity != null) {
				return ApiResponse.success(HttpStatus.OK,"Data saved successfully",maturity);
		    } 
			else {
				return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR,"Data could not be saved");
		       
		    }

		}
		
		

		@GetMapping("/getFullmaturitydetails")
	 	public ResponseEntity<ApiResponse<List<FullMaturity>>> getFullMaturityDetails() {
	 		 List<FullMaturity> invest = maturityservice.getFullMaturityDetails();
	 		 
	 		 if (invest != null && !invest.isEmpty()) {
	 	            ApiResponse<List<FullMaturity>> response = ApiResponse.success(HttpStatus.OK,
	 	                "Investment Details fetched successfully.",
	 	                invest
	 	            );
	 	            return new ResponseEntity<>(response, HttpStatus.OK);
	 	        } else {
	 	            ApiResponse<List<FullMaturity>> response = ApiResponse.error(HttpStatus.NOT_FOUND,
	 	                "No Details found."
	 	            );
	 	            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	 	        }
	 	}
	
	
}
