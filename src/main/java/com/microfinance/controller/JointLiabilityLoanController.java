package com.microfinance.controller;

import java.util.List;
import java.util.Map;

import org.apache.xmlbeans.impl.store.CharUtil.CharJoin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.microfinance.dto.ApiResponse;
import com.microfinance.dto.ExecutiveFounderDto;
import com.microfinance.dto.GroupDirectoryDto;
import com.microfinance.model.ApplyForGroupLoan;
import com.microfinance.model.CreateLendingGroup;
import com.microfinance.model.ExecutiveFounder;
import com.microfinance.model.GroupDirectory;
import com.microfinance.model.GroupInstallmentRepayment;
import com.microfinance.model.GroupLoanPayment;
import com.microfinance.model.InstallmentRepayment;
import com.microfinance.model.LoanApplication;
import com.microfinance.model.LoanAprroval;
import com.microfinance.service.JointLiabilityLoanService;

@RestController
@RequestMapping("/api/joinliability")
public class JointLiabilityLoanController {

	@Value("${upload.directory}")
	private String uploadDirectory;

	@Autowired
	JointLiabilityLoanService jointLiabilityLoanService;

	@PostMapping("/createLendingGroupsave")
	public ResponseEntity<ApiResponse<CreateLendingGroup>> saveLendingGroup(
			@RequestBody CreateLendingGroup createLendingGroup) {
		boolean isSaved = jointLiabilityLoanService.saveLendingGroup(createLendingGroup);

		if (isSaved) {
			ApiResponse<CreateLendingGroup> response = ApiResponse.success(HttpStatus.CREATED,
					"Lending Group saved successfully", createLendingGroup);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} else {
			ApiResponse<CreateLendingGroup> response = ApiResponse.error(HttpStatus.BAD_REQUEST,
					"Failed to save Lending Group.");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
	}

	// View All createlending group
	@GetMapping("/viewlendinggroup")
	public ResponseEntity<ApiResponse<List<CreateLendingGroup>>> getAlllendinggroup() {
		List<CreateLendingGroup> plans = jointLiabilityLoanService.getAlllendinggroup();

		if (plans != null && !plans.isEmpty()) {
			ApiResponse<List<CreateLendingGroup>> response = ApiResponse.success(HttpStatus.OK,
					"Lending Group fetched successfully.", plans);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<CreateLendingGroup>> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"No Lending Group found.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	@GetMapping("/editLendingGroup/{id}")
	public ResponseEntity<ApiResponse<CreateLendingGroup>> getLendingGroupById(@PathVariable Long id) {
		CreateLendingGroup plan = jointLiabilityLoanService.getLendingGroupById(id);

		if (plan != null) {
			ApiResponse<CreateLendingGroup> response = ApiResponse.success(HttpStatus.OK,
					"Lending Group fetched successfully.", plan);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<CreateLendingGroup> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"Lending Group not found for ID: " + id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// Update Loan Plan
	@PostMapping("/updateLendingGroup/{id}")
	public ResponseEntity<ApiResponse<CreateLendingGroup>> updateLoanPlan(@PathVariable Long id,
			@RequestBody CreateLendingGroup updatedGroup) {

		CreateLendingGroup updated = jointLiabilityLoanService.updategroupLending(id, updatedGroup);

		if (updated != null) {
			ApiResponse<CreateLendingGroup> response = ApiResponse.success(HttpStatus.OK,
					"Lending Group updated successfully.", updated);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<CreateLendingGroup> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"Lending Group not found or failed to update.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// Delete Create group Lending
	@PostMapping("/deleteLendingGroup/{id}")
	public ResponseEntity<ApiResponse<Void>> deleteLoanPlan(@PathVariable Long id) {
		boolean deleted = jointLiabilityLoanService.deleteLendingGroup(id);

		if (deleted) {
			ApiResponse<Void> response = ApiResponse.success(HttpStatus.OK, "Lending Group deleted successfully.",
					null);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<Void> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"Lending Group not found for ID: " + id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// Api for Saving Group Directory details
	@PostMapping("/savegroupdirectory")
	public ResponseEntity<ApiResponse<GroupDirectory>> saveGroupDirectory(@RequestBody GroupDirectory groupDirectory) {

		boolean isSaved = jointLiabilityLoanService.saveGroupDirectoryData(groupDirectory);

		if (isSaved) {
			ApiResponse<GroupDirectory> response = ApiResponse.success(HttpStatus.CREATED,
					"Group Directory saved successfully.", groupDirectory);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<GroupDirectory> response = ApiResponse.error(HttpStatus.BAD_REQUEST,
					"Failed to save Group Directory.");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
	}

	// Fetch all the data from group directory
	@GetMapping("/viewGroupDirectories")
	public ResponseEntity<ApiResponse<List<GroupDirectory>>> getAllGroupDirectories() {
		List<GroupDirectory> groups = jointLiabilityLoanService.getAllGroupDirectories();

		if (groups != null && !groups.isEmpty()) {
			ApiResponse<List<GroupDirectory>> response = ApiResponse.success(HttpStatus.OK,
					"Group Directories fetched successfully.", groups);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<GroupDirectory>> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"No Group Directory found.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// Append the group directory in the form
	@GetMapping("/editGroupDirectory/{id}")
	public ResponseEntity<ApiResponse<GroupDirectory>> getGroupDirectoryById(@PathVariable Long id) {
		GroupDirectory group = jointLiabilityLoanService.getGroupDirectoryById(id);

		if (group != null) {
			ApiResponse<GroupDirectory> response = ApiResponse.success(HttpStatus.OK,
					"Group Directory fetched successfully.", group);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<GroupDirectory> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"Group Directory not found for ID: " + id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// UPDATE the group directory form data
	@PostMapping("/updateGroupDirectory/{id}")
	public ResponseEntity<ApiResponse<GroupDirectory>> updateGroupDirectory(@PathVariable Long id,
			@RequestBody GroupDirectory updatedDirectory) {

		GroupDirectory updated = jointLiabilityLoanService.updateGroupDirectory(id, updatedDirectory);

		if (updated != null) {
			ApiResponse<GroupDirectory> response = ApiResponse.success(HttpStatus.OK,
					"Group Directory updated successfully.", updated);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<GroupDirectory> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"Group Directory not found or failed to update.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// DELETE the group directory data
	@PostMapping("/deleteGroupDirectory/{id}")
	public ResponseEntity<ApiResponse<Void>> deleteGroupDirectory(@PathVariable Long id) {
		boolean deleted = jointLiabilityLoanService.deleteGroupDirectory(id);

		if (deleted) {
			ApiResponse<Void> response = ApiResponse.success(HttpStatus.OK, "Group Directory deleted successfully.",
					null);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<Void> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"Group Directory not found for ID: " + id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	@GetMapping("/feachdatagroupdirectory")
	public ResponseEntity<ApiResponse<List<GroupDirectory>>> getAllGroupDirectories1() {
		List<GroupDirectory> groups = jointLiabilityLoanService.getaddquedata();

		if (groups != null && !groups.isEmpty()) {
			ApiResponse<List<GroupDirectory>> response = ApiResponse.success(HttpStatus.OK,
					"Group Directories fetched successfully.", groups);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<GroupDirectory>> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"No Group Directory found.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// Apply For group loan
	@PostMapping("/saveGroupLoan")
	public ResponseEntity<ApiResponse<ApplyForGroupLoan>> saveGroupLoan(@RequestBody ApplyForGroupLoan applyGroupLoan) {
		boolean isSaved = jointLiabilityLoanService.saveGroupLoan(applyGroupLoan);

		if (isSaved) {
			ApiResponse<ApplyForGroupLoan> response = ApiResponse.success(HttpStatus.CREATED,
					"Group Loan saved successfully", applyGroupLoan);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} else {
			ApiResponse<ApplyForGroupLoan> response = ApiResponse.error(HttpStatus.BAD_REQUEST,
					"Failed to save Group Loan.");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
	}

	// fetch the group directory code
	@PostMapping("/fetchByGroupID")
	public ApiResponse<List<GroupDirectory>> fetchByGroupID(@RequestParam("groupID") String groupID) {
		List<GroupDirectory> list = jointLiabilityLoanService.fetchByGroupID(groupID);
		if (list != null && !list.isEmpty()) {
			return ApiResponse.success(HttpStatus.FOUND, "Group Directory Fetched Successfully", list);
		} else {
			return ApiResponse.error(HttpStatus.NOT_FOUND, "Group Directory Not Found");
		}
	}

	// fetch the property form lending group
	@PostMapping("/fetchByPlanCode")
	public ApiResponse<List<CreateLendingGroup>> fetchByPlanCode(@RequestParam("planCode") String planCode) {
		List<CreateLendingGroup> list = jointLiabilityLoanService.fetchByPlanCode(planCode);
		if (list != null && !list.isEmpty()) {
			return ApiResponse.success(HttpStatus.FOUND, "Lending Group Plan Fetched Successfully", list);
		} else {
			return ApiResponse.error(HttpStatus.NOT_FOUND, "Lending Group Plan Not Found");
		}
	}

	// feath group loan
	@GetMapping("/viewgrouploans")
	public ResponseEntity<ApiResponse<List<ApplyForGroupLoan>>> getAllGroupLoanApplications() {
		List<ApplyForGroupLoan> applications = jointLiabilityLoanService.getAllgroupdata();

		if (applications != null && !applications.isEmpty()) {
			ApiResponse<List<ApplyForGroupLoan>> response = ApiResponse.success(HttpStatus.OK,
					"Group loan applications fetched successfully.", applications);
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<ApplyForGroupLoan>> response = ApiResponse.error(HttpStatus.NOT_FOUND,
					"No group loan applications found.");
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	// Api for approving the group loan application
	@PostMapping("/approveGroupLoan")
	public ResponseEntity<ApiResponse<ApplyForGroupLoan>> approveGroupLoan(@RequestBody ApplyForGroupLoan approval) {

		System.out.println("Approval request received for Group Code: " + approval.getGroupCode());

		String result = jointLiabilityLoanService.approveGroupLoan(approval);

		switch (result) {
		case "already_approved":
			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Group Loan is already approved.", null));

		case "success":
			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Group Loan approved successfully.", approval));

		case "not_found":
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse<>(HttpStatus.NOT_FOUND, "Group Loan not found.", null));

		default:
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse<>(HttpStatus.BAD_REQUEST, "Unknown result", null));
		}
	}

	// This is the api for fetching the data from apply group loan
	@GetMapping("/fetchByGroupCode")
	public ApiResponse<List<ApplyForGroupLoan>> fetchApplyGroupLoanByGroupcode(
			@RequestParam("groupCode") String groupCode) {

		List<ApplyForGroupLoan> list = jointLiabilityLoanService.fetchApplyGroupLoanByGroupcode(groupCode);

		if (list != null && !list.isEmpty()) {
			return ApiResponse.success(HttpStatus.FOUND, "Group Loan & Directory Fetched Successfully", list);
		} else {
			return ApiResponse.error(HttpStatus.NOT_FOUND, "Group Loan Not Found for this Group Code");
		}
	}

	// API for fetching Approved & Active Group Loan IDs (Vaibhav)
	@GetMapping("/getApprovedGroupLoanIds")
	public ResponseEntity<ApiResponse<List<String>>> getApprovedGroupLoanIds() {
		List<String> approvedGroupLoanIds = jointLiabilityLoanService.getApprovedGroupLoanIds();

		if (!approvedGroupLoanIds.isEmpty()) {
			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK,
					"Approved & Active Group Loan IDs fetched successfully", approvedGroupLoanIds));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse<>(HttpStatus.NOT_FOUND, "No approved and active group loans found", null));
		}
	}

	// Api for saving the group loan payment to the group members
	@PostMapping("/saveloanPayment")
	public ResponseEntity<ApiResponse<GroupLoanPayment>> saveGroupLoanPayment(@RequestBody GroupLoanPayment groupLoan) {
		try {
			boolean isSaved = jointLiabilityLoanService.saveGroupLoanPayment(groupLoan);
			if (isSaved) {
				return ResponseEntity.status(HttpStatus.CREATED)
						.body(ApiResponse.success(HttpStatus.CREATED, "Loan Payment saved successfully", groupLoan));
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error(HttpStatus.BAD_REQUEST,
						"Failed to save Loan Payment (service returned false)"));
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "Error: " + e.getMessage()));
		}
	}

	@GetMapping("/fetchGroupLoanPayment")
	public ApiResponse<List<GroupLoanPayment>> fetchGroupLoanPayment(@RequestParam("groupID") String groupID) {

		List<GroupLoanPayment> list = jointLiabilityLoanService.fetchGroupLoanPayment(groupID);

		if (list != null && !list.isEmpty()) {
			return ApiResponse.success(HttpStatus.FOUND, "Group Loan Payments fetched successfully", list);
		} else {
			return ApiResponse.error(HttpStatus.NOT_FOUND, "No loan payments found for this Group ID");
		}
	}
//	
//	@PostMapping("/grpLoanRepayment")
//    public ResponseEntity<ApiResponse<GroupInstallmentRepayment>> payGroupLoanInstallment(@RequestBody GroupInstallmentRepayment request) {
//        ApiResponse<GroupInstallmentRepayment> response = jointLiabilityLoanService.payGroupLoanInstallment(request);
//        return ResponseEntity.ok(response);
//    }

	@PostMapping("/saveLoanRepayment")
	public ResponseEntity<ApiResponse<GroupInstallmentRepayment>> saveLoanRepayment(
			@RequestBody GroupInstallmentRepayment repayment) {
		try {
			boolean isSaved = jointLiabilityLoanService.saveLoanRepayment(repayment);
			if (isSaved) {
				return ResponseEntity.status(HttpStatus.CREATED)
						.body(ApiResponse.success(HttpStatus.CREATED, "Loan repayment saved successfully", repayment));
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.error(HttpStatus.BAD_REQUEST,
						"Failed to save loan repayment (service returned false)"));
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "Error: " + e.getMessage()));
		}
	}

}
