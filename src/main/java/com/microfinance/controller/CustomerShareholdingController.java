package com.microfinance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.microfinance.dto.ApiResponse;
import com.microfinance.model.BranchModule;
import com.microfinance.model.TransferShare;
import com.microfinance.model.addCustomer;
import com.microfinance.service.CustomerShareholdingService;

@RestController
@RequestMapping("/api/customershareholdingcontroller")
public class CustomerShareholdingController {

	@Autowired
	CustomerShareholdingService customershareholdingservice;

//Transfer Share - Oshin Dongre (12-06-2025)----------------------------------------------------------------------------------------

	// Find CustomerCode
	@GetMapping("/findAllCustomerCode")
	public ApiResponse<List<addCustomer>> findByCustomerCode() {
		List<addCustomer> list = customershareholdingservice.findByCustomerCode();
		if (list != null && !list.isEmpty()) {
			return ApiResponse.success(HttpStatus.OK, "TRANSFER SHARE LIST FOUND SUCCESSFULLY", list);
		} else
			return ApiResponse.error(HttpStatus.NOT_FOUND, "TRANSFER SHARE DATA LIST IS NOT FOUND");
	}

	// fetch Customer Code
	@PostMapping("/fetchByCustomerCode")
	public ApiResponse<List<addCustomer>> fetchByCustomerCode(@RequestParam("memberCode") String memberCode) {
		List<addCustomer> list = customershareholdingservice.fetchByCustomerCode(memberCode);
		if (list != null && !list.isEmpty()) {
			return ApiResponse.success(HttpStatus.FOUND, "TRANSFER SHARE FETCHED SUCCESSFULLY", list);
		} else {
			return ApiResponse.error(HttpStatus.NOT_FOUND, "TRANSFER SHARE NOT FOUND");
		}
	}

//	// Fetching CustomerCode
//	@PostMapping("/fetchByCustomerCode")
//	public ApiResponse<List<addCustomer>> fetchByCustomerCode(@RequestParam addCustomer addcustomer) {
//		List<addCustomer> list = customershareholdingservice.fetchByCustomerCode(addcustomer.getMemberCode());
//		if (list != null && !list.isEmpty()) {
//			return ApiResponse.success(HttpStatus.FOUND, "Transfer Share Fetcheding is Successfully", list);
//		} else
//			return ApiResponse.error(HttpStatus.NOT_FOUND, "Transfer Share Not Found fetching Data");
//
//	}

	// Find Branch
	@GetMapping("/findAllBranch")
	public ApiResponse<List<BranchModule>> findByBranch() {
		List<BranchModule> list = customershareholdingservice.findByBranch();
		if (list != null && !list.isEmpty()) {
			return ApiResponse.success(HttpStatus.FOUND, "TRANSFER SHARE LIST FIND SUCCESSFULY", list);
		} else
			return ApiResponse.error(HttpStatus.NOT_FOUND, "TRANSFER SHARE DATA LIST IS NOT FOUND");

	}

	/*
	 * // API for saving and updating the group loan data
	 * 
	 * @PostMapping("/saveandUpdateTransferShare") public
	 * ResponseEntity<ApiResponse<TransferShare>>
	 * saveOrUpdateTransferShare( @RequestBody TransferShare savets) { boolean
	 * isSaved = customershareholdingservice.saveOrUpdateTransferShare(savets);
	 * 
	 * if (isSaved) { String message = (savets.getId() != null) ?
	 * "Group Plan updated successfully." : "Group Plan saved successfully.";
	 * ApiResponse<TransferShare> response = ApiResponse.success(HttpStatus.OK,
	 * message, savets); return ResponseEntity.ok(response); } else {
	 * ApiResponse<TransferShare> response =
	 * ApiResponse.error(HttpStatus.BAD_REQUEST,
	 * "Failed to save or update Group Plan."); return
	 * ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response); } }
	 */

	// Save Code
	@PostMapping("/saveTransferShare")
	public ResponseEntity<ApiResponse<TransferShare>> saveTransferShare(@RequestBody TransferShare transfer) {
		transfer.setApproved(false);
		TransferShare saveTS = customershareholdingservice.saveAllTransferShare(transfer);
		if (saveTS != null) {
			ApiResponse<TransferShare> response = ApiResponse.success(HttpStatus.FOUND,
					"TRANSFER SHARE DATA SAVED SUCCESSFULLY", saveTS);
			return ResponseEntity.status(HttpStatus.CREATED).body(response); // 201 CREATED
		} else {
			ApiResponse<TransferShare> errorResponse = ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR,
					"TRANSFER SHARE DATA NOT SAVED");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
		}
	}

	// All Data Show in Table
	@GetMapping("/allDataFetchTransferShareInTable")
	public ResponseEntity<ApiResponse<List<TransferShare>>> allDataFetchLoanSchemCatelog() {
		List<TransferShare> list = customershareholdingservice.allDataFetchTransferShareInTable();

		if (list != null && !list.isEmpty()) {
			ApiResponse<List<TransferShare>> response = new ApiResponse<>(HttpStatus.OK,
					"TRANSFER SHARE All DATA SHOWN SUCCESSFULLY", list);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<TransferShare>> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"TRANSFER SHARE DATA IS NOT FOUND", null);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response);
		}
	}

	// Edit Code
	@GetMapping("/getTransferShareIdEdite")
	public ResponseEntity<ApiResponse<TransferShare>> getTransferShareIdEdite(@RequestParam Long id) {
		TransferShare ts = customershareholdingservice.getTransferShareIdEdite(id);

		if (ts != null) {
			ApiResponse<TransferShare> response = new ApiResponse<>(HttpStatus.OK,
					"TRANSFER SHARE DATA EDIT SUCCESSFULLY", ts);
			return ResponseEntity.ok(response);
		} else {
			// ❗ FIXED: Return the response object instead of null
			ApiResponse<TransferShare> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"TRANSFER SHARE DATA IS NOT EDIT, BECAUSE IT'S NOT FOUND  : " + id, null);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// update code
	@PostMapping("/updateTransferShare")
	public ResponseEntity<ApiResponse<TransferShare>> updateTransferShare(@RequestBody TransferShare transfer) {
		TransferShare updateTS = customershareholdingservice.updateTransferShare(transfer);
		if (updateTS != null) {
			ApiResponse<TransferShare> response = ApiResponse.success(HttpStatus.FOUND,
					"TRANSFER SHARE DATA UPDATE SUCCESSFULLY", updateTS);
			return ResponseEntity.status(HttpStatus.CREATED).body(response); // 201 CREATED
		} else {
			ApiResponse<TransferShare> errorResponse = ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR,
					"TRANSFER SHARE DATA NOT UPDATE");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
		}
	}

	// Delete By Id
	@PostMapping("/deleteTransferShareById")
	public ResponseEntity<ApiResponse<TransferShare>> deleteTransferShareById(@RequestParam Long id) {
		boolean deleted = customershareholdingservice.deleteTransferShareById(id);

		if (deleted) {
			ApiResponse<TransferShare> response = new ApiResponse<>(HttpStatus.OK,
					"TRANSFER SHARE DATA DELETED SUCCESSFULLY", null);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<TransferShare> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"TRANSFER SHARE DATA IS NOT DELETE, BECAUSE IT'S NOT FOUND ");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

// End TransferShare Sub Model -----------------------------------------------------------------------------------------------------

//UnAllotedShare - Oshin Dongre (25-06-2025)----------------------------------------------------------------------------------------

	// Find List Of TransferShare
	@GetMapping("/findAllTransferShare")
	public ApiResponse<List<TransferShare>> findByTransferShare() {
		List<TransferShare> list = customershareholdingservice.findByTransferShare();
		if (list != null && !list.isEmpty()) {
			return ApiResponse.success(HttpStatus.OK, "UNALLOTED SHARE LIST FOUND SUCCESSFULLY", list);
		} else
			return ApiResponse.error(HttpStatus.NOT_FOUND, "UNALLOTED SHARE DATA IS NOT FOUND");
	}

	// Fetch By Find By Code
	@PostMapping("/fetchByFindByCode")
	public ApiResponse<List<TransferShare>> fetchByTransferShare(@RequestParam("findByCode") String findByCode) {
		List<TransferShare> list = customershareholdingservice.fetchByTransferShare(findByCode);
		if (list != null && !list.isEmpty()) {
			return ApiResponse.success(HttpStatus.FOUND, "TRANSFER SHARE FETCHED SUCCESSFULLY", list);
		} else {
			return ApiResponse.error(HttpStatus.NOT_FOUND, "TRANSFER SHARE NOT FOUND");
		}
	}

// End UnAllotedShare Sub Model -----------------------------------------------------------------------------------------------------	

// Generate Share Certificate - Oshin Dongre (25-06-2025)---------------------------------------------------------------------------------------

	// Find List Of TransferShare
	@GetMapping("/getAllTransferShare")
	public ApiResponse<List<TransferShare>> getAllTransferShare() {
		List<TransferShare> list = customershareholdingservice.getAllTransferShare();
		if (list != null && !list.isEmpty()) {
			return ApiResponse.success(HttpStatus.OK, "UNALLOTED LIST FOUND SUCCESSFULLY", list);
		} else
			return ApiResponse.error(HttpStatus.NOT_FOUND, "UNALLOTED DATA LIST IS NOT FOUND");
	}

	// fetch A table
	@PostMapping("/fetchByCertificateNo")
	public ApiResponse<List<TransferShare>> fetchByCertificateNo(@RequestParam("findByCode") String findByCode) {
		List<TransferShare> list = customershareholdingservice.fetchByCertificateNo(findByCode);
		if (list != null && !list.isEmpty()) {
			return ApiResponse.success(HttpStatus.FOUND, "TRANSFER SHARE FETCHED SUCCESSFULLY", list);
		} else {
			return ApiResponse.error(HttpStatus.NOT_FOUND, "TRANSFER SHARE NOT FOUND");
		}

	}

// End Generate Share Certificate Sub Model -----------------------------------------------------------------------------------------------------
}