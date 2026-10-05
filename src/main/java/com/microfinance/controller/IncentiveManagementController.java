package com.microfinance.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.microfinance.dto.ApiResponse;
import com.microfinance.model.IncentiveSchemeMaster;
import com.microfinance.model.TeamMember;
import com.microfinance.model.BranchModule;
import com.microfinance.model.GenerateIncentivePayments;
import com.microfinance.service.IncentiveManagementService;


import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/incentive")
public class IncentiveManagementController {

	@Autowired
	private IncentiveManagementService incentiveSchemeMasterService;
	
	
	
	//incentive save Data date:-13-6-25
	//Anjali

	@PostMapping("/saveIncentive")
	public ApiResponse<IncentiveSchemeMaster> saveIncentiveScheme(@RequestBody IncentiveSchemeMaster incentive) {
	    IncentiveSchemeMaster savedData = incentiveSchemeMasterService.saveIncentive(incentive);

	    if (savedData != null) {
	       return ApiResponse.success(HttpStatus.OK,"data saved", savedData);
	    }else
	    {
	    	return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR,"data not saved");
	    }
	}

	//fetch the data from table 
	//Anjali 14-6-25
	
	//save the data in the form list 
	
	@GetMapping("/getAllIncentives")
	public ApiResponse<List<IncentiveSchemeMaster>> getAllIncentives() {
	    List<IncentiveSchemeMaster> list = incentiveSchemeMasterService.getAllIncentives();

	    if (list != null && !list.isEmpty()) {
	    	 return ApiResponse.success(HttpStatus.OK,"data fetch succesfully", list);
	    }else
	    {
	    	return ApiResponse.error(HttpStatus.NO_CONTENT,"No incentive data found");
	    }
	}

	//fetch the team member name 
	//anjali 17-6-25

	@GetMapping("/getAllTeamMember")        
	public List<TeamMember> getAllTeamMember(){
		List<TeamMember> list = incentiveSchemeMasterService.getAllTeamMember();
		return list;
	}
	

	//save data in the database
	//anjali 18-6-25
    

	@PostMapping("/saveDataInGenerateIncentivePayments")
	public ResponseEntity<ApiResponse<GenerateIncentivePayments>> saveIncentivePayment(
	        @RequestBody GenerateIncentivePayments incentivepayment) {

	    boolean isSaved = incentiveSchemeMasterService.saveIncentivePayment(incentivepayment);

	    if (isSaved) {
	        ApiResponse<GenerateIncentivePayments> response = ApiResponse.success(
	                HttpStatus.OK, "Incentive payment saved successfully", incentivepayment);
	        return ResponseEntity.ok(response);
	    } else {
	        ApiResponse<GenerateIncentivePayments> response = ApiResponse.error(
	                HttpStatus.BAD_REQUEST, "Failed to save incentive payment");
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	    }
	}

	}


	

