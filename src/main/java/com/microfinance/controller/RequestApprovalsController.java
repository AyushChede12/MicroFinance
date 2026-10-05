
package com.microfinance.controller;

import java.security.Policy;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.microfinance.dto.ApiResponse;
import com.microfinance.model.AddnewinvestmentPM;
import com.microfinance.model.CreateSavingsAccount;
import com.microfinance.model.DailyPremiumRenewalPM;
import com.microfinance.model.FlexibleRenewal;
import com.microfinance.model.PolicyRenewal;
import com.microfinance.model.TransferShare;
import com.microfinance.model.addCustomer;
import com.microfinance.model.addFinancialConsultant;
import com.microfinance.model.partialMaturityPayment;
import com.microfinance.model.savingAccountFundTransfer;
import com.microfinance.service.RequestApprovalsService;

@RestController
@RequestMapping("/api/requestapproval")
public class RequestApprovalsController {

	@Autowired
	RequestApprovalsService requestApprovalsService;
	
	//anjali
	
	@GetMapping("/findAllMemberCode")
	public ApiResponse<List<addCustomer>> findAllMemberCode() {
	    List<addCustomer> list = requestApprovalsService.findAllMemberCode();
	    
	    if (list != null && !list.isEmpty()) {
	        return ApiResponse.success(HttpStatus.OK, "Filtered customers fetched successfully", list);
	    } else {
	        return ApiResponse.error(HttpStatus.NOT_FOUND, "No unapproved customers found");
	    }
	}

	
	//anjali (30/06/25)
	@PostMapping("/approvedCustomerData")
	public ResponseEntity<ApiResponse<addCustomer>> updateIsApprovedStatus(
	        @RequestParam Long id,
	        @RequestParam boolean isApproved) {

	    Optional<addCustomer> optionalCustomer = requestApprovalsService.findByIdShowStatus(id);

	    if (!optionalCustomer.isPresent()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                .body(ApiResponse.error(HttpStatus.NOT_FOUND, "Customer with ID " + id + " not found."));
	    }

	    addCustomer customer = optionalCustomer.get();
	    customer.setApproved(isApproved); // ✅ Use a proper setter method
	    addCustomer updated = requestApprovalsService.save(customer);

	    return ResponseEntity.ok(
	            ApiResponse.success(HttpStatus.OK, "isApproved status updated for ID " + id, updated));
	}
	

	//anjali (2/07/25)
   
	
    @GetMapping("/unapproved")
    public ResponseEntity<ApiResponse<List<addCustomer>>> getAllUnapprovedCustomers() {
        List<addCustomer> list = requestApprovalsService.getUnapprovedCustomers();
        if (!list.isEmpty()) {
            return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Unapproved customers fetched", list));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(HttpStatus.NOT_FOUND, "No unapproved customers found"));
        }
    }


	//Janvi : get Unapproved Savings Data 01/07/2025
  	@PostMapping("/getUnapprovedSavingTransaction")
      public ResponseEntity<ApiResponse<List<CreateSavingsAccount>>> getUnapprovedSavingTransaction() {
          List<CreateSavingsAccount> list = requestApprovalsService.getUnapprovedSavingTransaction();
          ApiResponse<List<CreateSavingsAccount>> response = ApiResponse.success(
              HttpStatus.OK, 
              "Unapproved Saving Transaction fetched successfully", 
              list
          );
          return new ResponseEntity<>(response, HttpStatus.OK);
      }
  	
  //janvi: Approved Financial Consultant 30/06/2025
  	@PostMapping("/approvedSavingTransactionData")
  	public ResponseEntity<ApiResponse<CreateSavingsAccount>> updateSavingIsApprovedStatus(
  	        @RequestParam Long id,
  	        @RequestParam boolean isApproved) {

  	    Optional<CreateSavingsAccount> optionalCustomer = requestApprovalsService.SavingTransactionById(id);

  	    if (!optionalCustomer.isPresent()) {
  	        return ResponseEntity.status(HttpStatus.NOT_FOUND)
  	                .body(ApiResponse.error(HttpStatus.NOT_FOUND, "Customer with ID " + id + " not found."));
  	    }

  	  CreateSavingsAccount customer = optionalCustomer.get();
  	    customer.setApproved(isApproved); // ✅ Use a proper setter method
  	  CreateSavingsAccount updated = requestApprovalsService.save(customer);

  	    return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "isApproved status updated for ID " + id, updated));
  	}


  	//anjali :unapprove data AddNewInvestment 14/07/2025

  	@GetMapping("/unapprovedAddNewInvestment")
  	public ResponseEntity<ApiResponse<List<AddnewinvestmentPM>>> getAllUnapprovedAddNewInvestment() {
  	    List<AddnewinvestmentPM> list = requestApprovalsService.getAllUnapprovedAddNewInvestment();

  	    if (!list.isEmpty()) {
  	        return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Unapproved investments fetched", list));
  	    } else {
  	        return ResponseEntity.status(HttpStatus.NOT_FOUND)
  	                .body(ApiResponse.error(HttpStatus.NOT_FOUND, "No unapproved investments found"));
  	    }
  	}
  	
  	// anjali:: approve add invetment data 14/07/25
        
  	@PostMapping("/approveInvestmentData")
  	public ResponseEntity<ApiResponse<AddnewinvestmentPM>> updateIsApprovedStatusInvestment(
  	        @RequestParam("id") Long id,
  	        @RequestParam("isApproved") boolean isApproved) {

  	    Optional<AddnewinvestmentPM> optionalInvestment = requestApprovalsService.findByIdShowStatusInvestment(id);

  	    if (!optionalInvestment.isPresent()) {
  	        return ResponseEntity.status(HttpStatus.NOT_FOUND)
  	                .body(ApiResponse.error(HttpStatus.NOT_FOUND, "Investment with ID " + id + " not found."));
  	    }

  	    AddnewinvestmentPM investment = optionalInvestment.get();
  	    investment.setApproved(isApproved);

  	    AddnewinvestmentPM updatedInvestment = requestApprovalsService.save(investment);

  	    return ResponseEntity.ok(
  	            ApiResponse.success(HttpStatus.OK, "Approval status updated for ID " + id, updatedInvestment)
  	    );
  	}
  
  	//ANJALI (16/7/25)
  	//	get policy renewal data
  	@GetMapping("/getUnapprovedPolicyRenewals")
  	public ResponseEntity<ApiResponse<List<PolicyRenewal>>> getAllUnapprovedPolicyRenewalData() {
  	    List<PolicyRenewal> list = requestApprovalsService.getAllUnapprovedPolicyRenewalData();

  	    if (!list.isEmpty()) {
  	        return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Unapproved investments fetched", list));
  	    } else {
  	        return ResponseEntity.status(HttpStatus.NOT_FOUND)
  	                .body(ApiResponse.error(HttpStatus.NOT_FOUND, "No unapproved investments found"));
  	    }
  	}

  	//anjali (16/7/25)
  	//approve RD data from approve renewql
  	@PostMapping("/approveRDFromPolicyRenewal")
  	public ResponseEntity<ApiResponse<PolicyRenewal>> approveRDFromPolicyRenewal(
  	        @RequestParam("id") Long id,
  	        @RequestParam("isApproved") boolean isApproved) {

  	    Optional<PolicyRenewal> optionalInvestment = requestApprovalsService.approveRDFromPolicyRenewal(id);

  	    if (!optionalInvestment.isPresent()) {
  	        return ResponseEntity.status(HttpStatus.NOT_FOUND)
  	                .body(ApiResponse.error(HttpStatus.NOT_FOUND, "Investment with ID " + id + " not found."));
  	    }

  	  PolicyRenewal Renewal = optionalInvestment.get();
  	Renewal.setApproved(isApproved);

  	  PolicyRenewal updatedInvestment = requestApprovalsService.saveRenewal(Renewal);

  	    return ResponseEntity.ok(
  	            ApiResponse.success(HttpStatus.OK, "Approval status updated for ID " + id, updatedInvestment)
  	    );
  	}
  	
  	//anjali (17/7/25)
  	//get flexible renewal data
  	 @GetMapping("/getAllUnapproveFlexibleRenewals")
     public ResponseEntity<ApiResponse<List<FlexibleRenewal>>> getUnapprovedFlexibleRenewalData() {
         List<FlexibleRenewal> list = requestApprovalsService.getUnapprovedFlexibleRenewalData();

         if (!list.isEmpty()) {
             return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Unapproved investments fetched", list));
         } else {
             return ResponseEntity.status(HttpStatus.NOT_FOUND)
                     .body(ApiResponse.error(HttpStatus.NOT_FOUND, "No unapproved investments found"));
         }
     }
	
	//anjali (16/7/25)
  	//approve FD data from flexible renewql
	
	@PostMapping("/approveFDFromFlexibleRenewal")
	public ResponseEntity<ApiResponse<FlexibleRenewal>> approveFDFromFlexibleRenewalInApproval(
	        @RequestParam("id") Long id,
	        @RequestParam("isApproved") boolean isApproved) {

	    Optional<FlexibleRenewal> optionalRenewal = requestApprovalsService.approveFDFromFlexibleRenewalInApproval(id);

	    if (!optionalRenewal.isPresent()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                .body(ApiResponse.error(HttpStatus.NOT_FOUND, "Flexible Renewal with ID " + id + " not found."));
	    }

	    FlexibleRenewal renewals = optionalRenewal.get();
	    renewals.setApproved(isApproved);

	    FlexibleRenewal updatedRenewal = requestApprovalsService.saveRenewal(renewals);

	    return ResponseEntity.ok(
	            ApiResponse.success(HttpStatus.OK, "Approval status updated for ID " + id, updatedRenewal)
	    );
	}
	
	//anjali (17/7/25)
  	//get DailyPremiumRenewalPM data
	@GetMapping("/getUnapprovedDailyPremiumRenewalPM")
  	public ResponseEntity<ApiResponse<List<DailyPremiumRenewalPM>>> getUnapprovedDailyPremiumRenewalPMData() {
  	    List<DailyPremiumRenewalPM> list = requestApprovalsService.getUnapprovedDailyPremiumRenewalPMData();

  	    if (!list.isEmpty()) {
  	        return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Unapproved investments fetched", list));
  	    } else {
  	        return ResponseEntity.status(HttpStatus.NOT_FOUND)
  	                .body(ApiResponse.error(HttpStatus.NOT_FOUND, "No unapproved investments found"));
  	    }
  	}

	//anjali (16/7/25)
  	//approve DD data from DailyPremiumRenewalPM 
	
	@PostMapping("/approveDDFromDailyPremiumRenewalPM")
	public ResponseEntity<ApiResponse<DailyPremiumRenewalPM>> approveDDFromDailyPremiumRenewalPMData(
	        @RequestParam("id") Long id,
	        @RequestParam("isApproved") boolean isApproved) {

	    Optional<DailyPremiumRenewalPM> optionalRenewal = requestApprovalsService.approveDDFromDailyPremiumRenewalPMData(id);

	    if (!optionalRenewal.isPresent()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                .body(ApiResponse.error(HttpStatus.NOT_FOUND, "Flexible Renewal with ID " + id + " not found."));
	    }

	    DailyPremiumRenewalPM DailyRenewal = optionalRenewal.get();
	    DailyRenewal.setApproved(isApproved);

	    DailyPremiumRenewalPM updatedRenewal = requestApprovalsService.saveRenewal(DailyRenewal);

	    return ResponseEntity.ok(
	            ApiResponse.success(HttpStatus.OK, "Approval status updated for ID " + id, updatedRenewal)
	    );
	}
	
	//anjali  (21/7/25)
	//get  savingAccountFundTransfer data
		@GetMapping("/getUnapprovedsavingAccountFundTransfer")
	  	public ResponseEntity<ApiResponse<List<savingAccountFundTransfer>>> getUnapprovedsavingAccountFundTransferData() {
	  	    List<savingAccountFundTransfer> list = requestApprovalsService.getUnapprovedsavingAccountFundTransferData();

	  	    if (!list.isEmpty()) {
	  	        return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Unapproved investments fetched", list));
	  	    } else {
	  	        return ResponseEntity.status(HttpStatus.NOT_FOUND)
	  	                .body(ApiResponse.error(HttpStatus.NOT_FOUND, "No unapproved investments found"));
	  	    }
	  	}

		//anjali  (21/7/25)
	  	//approve Saving Account transfer
		
		 @PostMapping("/approvesavingAccountFundTransfer")
		    public ResponseEntity<ApiResponse<savingAccountFundTransfer>> approveSavingAccountFundTransfer(
		            @RequestParam("id") Long id,
		            @RequestParam("isApproved") boolean isApproved) {

		        Optional<savingAccountFundTransfer> optionalTransfer = requestApprovalsService.approvesavingAccountFundTransferData(id);

		        if (!optionalTransfer.isPresent()) {
		            return ResponseEntity.status(HttpStatus.NOT_FOUND)
		                    .body(ApiResponse.error(HttpStatus.NOT_FOUND, "Fund Transfer with ID " + id + " not found."));
		        }

		        savingAccountFundTransfer transfer = optionalTransfer.get();
		        transfer.setApproved(isApproved);

		        savingAccountFundTransfer updated = requestApprovalsService.saveAccount(transfer);

		        return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Updated successfully", updated));
		    }
		 
		 
		 //ANJALI (23/7/25)
		 //get Transfer Share data
		 @GetMapping("/getUnapprovedTransferShare")
		  	public ResponseEntity<ApiResponse<List<TransferShare>>> getUnapprovedTransferShareData() {
		  	    List<TransferShare> list = requestApprovalsService.getUnapprovedTransferShareData();

		  	    if (!list.isEmpty()) {
		  	        return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Unapproved investments fetched", list));
		  	    } else {
		  	        return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "No unapproved investments found", java.util.Collections.emptyList()));
		  	    }
		 }
		 
		//ANJALI (23/7/25)
		 //approve share Transaction Data
		 @PostMapping("/approveShareTransaction")
		    public ResponseEntity<ApiResponse<TransferShare>> approveShareTransactionData(
		            @RequestParam("id") Long id,
		            @RequestParam("isApproved") boolean isApproved) {

		        Optional<TransferShare> optionalTransfer = requestApprovalsService.approveShareTransactionData(id);

		        if (!optionalTransfer.isPresent()) {
		            return ResponseEntity.status(HttpStatus.NOT_FOUND)
		                    .body(ApiResponse.error(HttpStatus.NOT_FOUND, "Fund Transfer with ID " + id + " not found."));
		        }

		        TransferShare share = optionalTransfer.get();
		        share.setApproved(isApproved);

		        TransferShare updated = requestApprovalsService.saveTransferShare(share);

		        return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Updated successfully", updated));
		    }
		 
		 //anjali on (26/7/25)
		 //get all policy code
		 @GetMapping("/getAllPolicyCodes")
		 public ResponseEntity<ApiResponse<List<partialMaturityPayment>>> getAllPolicyCodes() {
		     List<partialMaturityPayment> policyCodes = requestApprovalsService.getAllPolicyCodes();

		     if (policyCodes != null && !policyCodes.isEmpty()) {
		         return ResponseEntity.ok(
		             ApiResponse.success(HttpStatus.OK, "Policy codes fetched successfully", policyCodes)
		         );
		     } else {
		         return ResponseEntity.status(HttpStatus.NO_CONTENT)
		             .body(ApiResponse.error(HttpStatus.NO_CONTENT, "No policy codes found"));
		     }
		 }

		 
		 
		 //anjali on (26/7/25)
		 //find all partialMaturitydata 
		 @GetMapping("/getDetailsByPolicyCode")
		    public ResponseEntity<ApiResponse<partialMaturityPayment>> getDetailsByPolicyCode(@RequestParam String policyCode) {
		        partialMaturityPayment data = requestApprovalsService.findByPolicyCode(policyCode);

		        if (data != null) {
		            return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Details found", data));
		        } else {
		            return ResponseEntity.status(HttpStatus.NOT_FOUND)
		                .body(ApiResponse.error(HttpStatus.NOT_FOUND, "No data found for policy code"));
		        }
		    }
		//ANJALI (28/7/25)
		 //approve Maturity Application
		 @PostMapping("/approveMaturityApplication1")
		    public ResponseEntity<ApiResponse<partialMaturityPayment>> approveMaturityApplication(
		            @RequestParam("id") Long id,
		            @RequestParam("approveStatus") boolean approveStatus) {

		        Optional<partialMaturityPayment> optionalTransfer = requestApprovalsService.approveMaturityApplication(id);

		        if (!optionalTransfer.isPresent()) {
		            return ResponseEntity.status(HttpStatus.NOT_FOUND)
		                    .body(ApiResponse.error(HttpStatus.NOT_FOUND, "Fund Transfer with ID " + id + " not found."));
		        }

		        partialMaturityPayment maturity = optionalTransfer.get();
		        maturity.setApproveStatus(approveStatus);

		        partialMaturityPayment updated = requestApprovalsService.saveMaturity(maturity);

		        return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK, "Updated successfully", updated));
		    }
		
		

//		     @GetMapping("/approved")
//		     public Map<String, Object> getApprovedCustomers() {
//		         List<addCustomer> list = requestApprovalsService.getApprovedCustomers();
//
//		         Map<String, Object> response = new HashMap<>();
//		         response.put("success", true);
//		         response.put("data", list);
//
//		         return response;
//		     }
		 }


