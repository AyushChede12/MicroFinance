package com.microfinance.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpSession;
import javax.websocket.Session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.microfinance.dto.ApiResponse;
import com.microfinance.dto.BankModuleDto;
import com.microfinance.dto.ExecutiveFounderDto;
import com.microfinance.model.BankModule;
import com.microfinance.model.BranchModule;
import com.microfinance.model.CategoryModule;
import com.microfinance.model.CodeModule;
import com.microfinance.model.CompanyAdministration;
import com.microfinance.model.ExecutiveFounder;
import com.microfinance.model.RelativeModule;
import com.microfinance.model.Statedistricts;
import com.microfinance.model.Transactions;
import com.microfinance.model.UserMenuAccess;
import com.microfinance.model.states;
import com.microfinance.repository.CategoryModuleRepo;
import com.microfinance.repository.StateDistrictRepo;
import com.microfinance.model.FinancialYear;
import com.microfinance.service.PreferenceService;

@RestController
@RequestMapping("/api/preference")
public class PreferenceController {

	@Autowired
	PreferenceService preferenceService;

	@Autowired
	StateDistrictRepo stateDistrictRepo;

	@Value("${upload.directory}")
	private String uploadDirectory;

	@PostMapping("/saveAndUpdateAllBranchModule") // Ayush (without DTO)
	public ResponseEntity<ApiResponse<BranchModule>> saveBranch(@RequestBody BranchModule branchModule) {
		boolean isCreate = (branchModule.getId() == null); // Check BEFORE saving

		BranchModule savedEntity = preferenceService.saveBranchModule(branchModule);

		ApiResponse<BranchModule> response;

		if (isCreate) {
			response = new ApiResponse<>(HttpStatus.CREATED, "Branch created successfully", savedEntity);
			return new ResponseEntity<>(response, HttpStatus.CREATED);
		} else {
			response = new ApiResponse<>(HttpStatus.OK, "Branch updated successfully", savedEntity);
			return new ResponseEntity<>(response, HttpStatus.OK);
		}
	}

	@GetMapping("/getAllBranchModule")
	public ResponseEntity<ApiResponse<List<BranchModule>>> fetchAllBranchModule() {

		Optional<List<BranchModule>> optionalList = preferenceService.fetchAllBranchModule();

		if (optionalList.isPresent()) {

			ApiResponse<List<BranchModule>> response = new ApiResponse<>(HttpStatus.OK,
					"Branch modules fetched successfully", optionalList.get());

			return ResponseEntity.ok(response);
		} else {
			ApiResponse<List<BranchModule>> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"No branch modules found", null);

			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		}
	}

	@GetMapping("/getBranchModuleById") // Ayush
	public ResponseEntity<ApiResponse<BranchModule>> findBranchModuleById(@RequestParam("id") Long id) {
		Optional<BranchModule> branch = preferenceService.findBranchDataById(id);
		if (branch.isPresent()) {
			ApiResponse<BranchModule> response = new ApiResponse<>(HttpStatus.FOUND,
					"BranchModule fetched successfully", branch.get());
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<BranchModule> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"BranchModule not found for ID: " + id, null);
			return ResponseEntity.status(404).body(response);
		}
	}

	@PostMapping("/deleteBranchModuleById") // Ayush
	public ResponseEntity<ApiResponse<String>> deleteBranchModule(@RequestParam("id") Long id) {
		boolean isDeleted = preferenceService.deleteBranchModule(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Branch module deleted successfully",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.BAD_REQUEST, "Branch module deletion failed",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	// Bank Module - Ayush
//	@PostMapping("/saveAndUpdateAllBankModule") // Ayush (without DTO)
//	public ResponseEntity<ApiResponse<BankModule>> saveBank(@RequestBody BankModule bankModule) {
//		boolean isCreate = (bankModule.getId() == null); // Check BEFORE saving
//		BankModule savedEntity = preferenceService.saveBankModule(bankModule);
//		ApiResponse<BankModule> response;
//		if (isCreate) {
//			response = new ApiResponse<>(HttpStatus.CREATED, "Bank created successfully", savedEntity);
//			return new ResponseEntity<>(response, HttpStatus.CREATED);
//		} else {
//			response = new ApiResponse<>(HttpStatus.OK, "Bank updated successfully", savedEntity);
//			return new ResponseEntity<>(response, HttpStatus.OK);
//		}
//	}

	@PostMapping("/saveAndUpdateAllBankModule")
	public ResponseEntity<ApiResponse<BankModule>> saveBank(@ModelAttribute BankModuleDto bankModuleDto,
			@RequestParam(value = "cancelledCheque", required = false) MultipartFile cancelledCheque) {

		if (cancelledCheque != null) {
			System.out.println("Received photo: " + cancelledCheque.getOriginalFilename());
		}

		ApiResponse<BankModule> response = preferenceService.saveBankModule(bankModuleDto, cancelledCheque);
		// return new ResponseEntity<>(response, response.getStatus());
		return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK,
				bankModuleDto.getId() != null ? "Bank updated successfully" : "Bank saved successfully",
				response.getData()));
	}

	@GetMapping("/getAllBankModule") // Ayush (without DTO)
	public ResponseEntity<ApiResponse<List<BankModule>>> fetchAllBankModule() {
		List<BankModule> list = preferenceService.fetchAllBankModule();
		ApiResponse<List<BankModule>> response = new ApiResponse<>(HttpStatus.FOUND,
				"Bank modules fetched successfully", list);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/getBankModuleById") // Ayush
	public ResponseEntity<ApiResponse<BankModule>> findBankModuleById(@RequestParam("id") Long id) {
		Optional<BankModule> bank = preferenceService.findBankDataById(id);
		if (bank.isPresent()) {
			ApiResponse<BankModule> response = new ApiResponse<>(HttpStatus.FOUND, "Bank Module fetched successfully",
					bank.get());
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<BankModule> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"Bank Module not found for ID: " + id, null);
			return ResponseEntity.status(404).body(response);
		}
	}

	@PostMapping("/deleteBankModuleById") // Ayush
	public ResponseEntity<ApiResponse<String>> deleteBankModule(@RequestParam("id") Long id) {
		boolean isDeleted = preferenceService.deleteBankModule(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Bank module deleted successfully",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "Bank module deletion failed",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	// Relative Module - Ayush
	@PostMapping("/saveRelativeModule") // Ayush (without DTO)
	public ResponseEntity<ApiResponse<RelativeModule>> saveRelative(@RequestBody RelativeModule relativeModule) {
		boolean isCreate = (relativeModule.getId() == null); // Check BEFORE saving
		RelativeModule savedEntity = preferenceService.saveRelativeModule(relativeModule);
		ApiResponse<RelativeModule> response;
		if (isCreate) {
			response = new ApiResponse<>(HttpStatus.CREATED, "Relative created successfully", savedEntity);
			return new ResponseEntity<>(response, HttpStatus.CREATED);
		} else {
			response = new ApiResponse<>(HttpStatus.OK, "Relative updated successfully", savedEntity);
			return new ResponseEntity<>(response, HttpStatus.OK);
		}
	}

	@GetMapping("/getAllRelativeModule") // Ayush (without DTO)
	public ResponseEntity<ApiResponse<List<RelativeModule>>> fetchAllRelativeModule() {
		List<RelativeModule> list = preferenceService.fetchAllRelativeModule();
		ApiResponse<List<RelativeModule>> response = new ApiResponse<>(HttpStatus.FOUND,
				"Relative modules fetched successfully", list);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/getRelativeModuleById") // Ayush
	public ResponseEntity<ApiResponse<RelativeModule>> getRelativeModuleById(@RequestParam("id") Long id) {
		Optional<RelativeModule> branch = preferenceService.fetchRelativeModuleById(id);
		if (branch.isPresent()) {
			ApiResponse<RelativeModule> response = new ApiResponse<>(HttpStatus.FOUND,
					"Relative Module fetched successfully", branch.get());
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<RelativeModule> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"Relative Module not found for ID: " + id, null);
			return ResponseEntity.status(404).body(response);
		}
	}

	@PostMapping("/deleteRelativeModuleById") // Ayush
	public ResponseEntity<ApiResponse<String>> deleteRelativeModule(@RequestParam("id") Long id) {
		boolean isDeleted = preferenceService.deleteRelativeModule(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.FOUND, "Relative module deleted successfully",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "Relative module deletion failed",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	@GetMapping("/getAllStates") // Niraj
	public ResponseEntity<ApiResponse<List<states>>> getAllStates() {
		List<states> list = preferenceService.getAllStates();

		ApiResponse<List<states>> response;

		if (list.isEmpty()) {
			response = new ApiResponse<>(HttpStatus.NOT_FOUND, "No states found", null);
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		} else {
			response = new ApiResponse<>(HttpStatus.FOUND, "States fetched successfully", list);
			return ResponseEntity.ok(response); // or new ResponseEntity<>(response, HttpStatus.FOUND)
		}
	}

	@GetMapping("/getAllDistrictsByStateId") // Niraj
	public Map<String, List<Statedistricts>> getAllDistrictsByStateId(@RequestParam("stateId") int stateId) {
		List<Statedistricts> data = stateDistrictRepo.findBystateId(stateId);
		Map<String, List<Statedistricts>> response = new HashMap<>();
		response.put("allDistricts", data);
		return response;
	}

	@GetMapping("/getAllCasteByCategory")
	public ResponseEntity<ApiResponse<List<CategoryModule>>> getAllCasteByCategory(@RequestParam String category) {

		List<CategoryModule> casteList = preferenceService.findCasteByCategory(category);
		ApiResponse<List<CategoryModule>> response;
		if (casteList.isEmpty()) {
			response = new ApiResponse<>(HttpStatus.NOT_FOUND, "No Caste found in this category", null);
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		} else {
			response = new ApiResponse<>(HttpStatus.FOUND, "Caste fetched successfully", casteList);
			return ResponseEntity.ok(response); // or new ResponseEntity<>(response, HttpStatus.FOUND)
		}
	}

	// Category Module - Ayush
	@PostMapping("/saveCategoryModule")
	public ResponseEntity<ApiResponse<CategoryModule>> saveCategory(@RequestBody CategoryModule categoryModule) {
		boolean isCreate = (categoryModule.getId() == null); // Check BEFORE saving
		CategoryModule savedEntity = preferenceService.saveCategoryModule(categoryModule);
		ApiResponse<CategoryModule> response;
		if (isCreate) {
			response = new ApiResponse<>(HttpStatus.CREATED, "Category and Caste created successfully", savedEntity);
			return new ResponseEntity<>(response, HttpStatus.CREATED);
		} else {
			response = new ApiResponse<>(HttpStatus.OK, "Category and Caste updated successfully", savedEntity);
			return new ResponseEntity<>(response, HttpStatus.OK);
		}
	}

	@GetMapping("/getAllCategoryModule")
	public ResponseEntity<ApiResponse<List<CategoryModule>>> fetchAllCategoryModule() {
		List<CategoryModule> list = preferenceService.fetchAllCategoryModule();
		ApiResponse<List<CategoryModule>> response = new ApiResponse<>(HttpStatus.FOUND,
				"Category modules fetched successfully", list);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/getCategoryById") // Ayush
	public ResponseEntity<ApiResponse<CategoryModule>> findCategoryModuleById(@RequestParam("id") Long id) {
		Optional<CategoryModule> category = preferenceService.findCategoryModuleById(id);
		if (category.isPresent()) {
			ApiResponse<CategoryModule> response = new ApiResponse<>(HttpStatus.FOUND,
					"Category Module fetched successfully", category.get());
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<CategoryModule> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"Category Module not found for ID: " + id, null);
			return ResponseEntity.status(404).body(response);
		}
	}

	@PostMapping("/deleteCategoryModuleById") // Ayush
	public ResponseEntity<ApiResponse<String>> deleteCategoryModule(@RequestParam("id") Long id) {
		boolean isDeleted = preferenceService.deleteCategoryModule(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Category module deleted successfully",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "Category module deletion failed",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	// Financial Year - Ayush
	@PostMapping("/saveAndUpdateAllFinancialYear") // Ayush (without DTO)
	public ResponseEntity<ApiResponse<FinancialYear>> saveFinancialYear(@RequestBody FinancialYear financialYear) {
		boolean isCreate = (financialYear.getId() == null); // Check BEFORE saving
		FinancialYear savedEntity = preferenceService.saveFinancialYear(financialYear);
		ApiResponse<FinancialYear> response;
		if (isCreate) {
			response = new ApiResponse<>(HttpStatus.CREATED, "Financial Year created successfully", savedEntity);
			return new ResponseEntity<>(response, HttpStatus.CREATED);
		} else {
			response = new ApiResponse<>(HttpStatus.OK, "Financial Year updated successfully", savedEntity);
			return new ResponseEntity<>(response, HttpStatus.OK);
		}
	}

	@GetMapping("/getAllFinancialYear")
	public ResponseEntity<ApiResponse<List<FinancialYear>>> fetchAllFinancialYear() {
		List<FinancialYear> list = preferenceService.fetchAllFinancialYear();
		ApiResponse<List<FinancialYear>> response = new ApiResponse<>(HttpStatus.FOUND,
				"Financial Year fetched successfully", list);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/getFinancialYearById") // Ayush
	public ResponseEntity<ApiResponse<FinancialYear>> findFinancialYearById(@RequestParam("id") Long id) {
		Optional<FinancialYear> fyear = preferenceService.findFinancialYearById(id);
		if (fyear.isPresent()) {
			ApiResponse<FinancialYear> response = new ApiResponse<>(HttpStatus.FOUND,
					"Financial Year fetched successfully", fyear.get());
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<FinancialYear> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"Financial Year not found for ID: " + id, null);
			return ResponseEntity.status(404).body(response);
		}
	}

	@PostMapping("/deleteFinancialYearById") // Ayush
	public ResponseEntity<ApiResponse<String>> deleteFinancialYear(@RequestParam("id") Long id) {
		boolean isDeleted = preferenceService.deleteFinancialYear(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Financial Year deleted successfully",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "Financial Year deletion failed",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	// Executive Founder(With DTO) - Ayush
	@PostMapping("/saveExecutiveFounder")
	public ResponseEntity<ApiResponse<ExecutiveFounder>> saveExecutiveFounderData(
			@ModelAttribute ExecutiveFounderDto executiveFounderDto,
			@RequestParam(value = "photo", required = false) MultipartFile photo,
			@RequestParam(value = "signature", required = false) MultipartFile signature,
			@RequestParam(value = "aadharCard", required = false) MultipartFile aadharCard,
			@RequestParam(value = "panCard", required = false) MultipartFile panCard,
			@RequestParam(value = "cheque", required = false) MultipartFile cheque, Model model) {

		if (photo != null) {
			System.out.println("Received photo: " + photo.getOriginalFilename());
		}
		if (signature != null) {
			System.out.println("Received signature: " + signature.getOriginalFilename());
		}
		if (aadharCard != null) {
			System.out.println("Received Aadhar Card: " + aadharCard.getOriginalFilename());
		}
		if (panCard != null) {
			System.out.println("Received Pan Card: " + panCard.getOriginalFilename());
		}
		if (cheque != null) {
			System.out.println("Received Cheque: " + cheque.getOriginalFilename());
		}

		ApiResponse<ExecutiveFounder> response = preferenceService.saveExecutiveFounder(executiveFounderDto, photo,
				signature, aadharCard, panCard, cheque);

		// return new ResponseEntity<>(response, response.getStatus());
		return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK,
				executiveFounderDto.getId() != null ? "Data updated successfully" : "Data saved successfully",
				response.getData()));
	}

	@GetMapping("/fetchAllExecutiveFounder")
	public ResponseEntity<ApiResponse<List<ExecutiveFounder>>> fetchAllExecutiveFounder() {
		List<ExecutiveFounder> list = preferenceService.fetchAllExecutiveFounder();
		ApiResponse<List<ExecutiveFounder>> response = new ApiResponse<>(HttpStatus.FOUND,
				"Executive Founder fetched successfully", list);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/deleteExecutiveFounder") // Ayush
	public ResponseEntity<ApiResponse<String>> deleteExecutiveFounder(@RequestParam("id") Long id) {
		boolean isDeleted = preferenceService.deleteExecutiveFounder(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Executive Founder deleted successfully",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "Executive Founder deletion failed",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	@GetMapping("/fetchExecutiveFounderById") // Ayush
	public ResponseEntity<ApiResponse<ExecutiveFounder>> findExecutiveFounderById(@RequestParam("id") Long id,
			Model model) {
		Optional<ExecutiveFounder> executive = preferenceService.findExecutiveFounderById(id);
		model.addAttribute("executive", executive);
		if (executive.isPresent()) {
			ApiResponse<ExecutiveFounder> response = new ApiResponse<>(HttpStatus.FOUND,
					"Executive Founder fetched successfully", executive.get());
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<ExecutiveFounder> response = new ApiResponse<>(HttpStatus.NOT_FOUND,
					"Executive Founder not found for ID: " + id, null);
			return ResponseEntity.status(404).body(response);
		}
	}

	// Customer Administration - Ayush
	@GetMapping("/fetchAllCompanyAdministration") // Ayush (without DTO)
	public ResponseEntity<ApiResponse<List<CompanyAdministration>>> fetchAllCompanyAdministration() {
		List<CompanyAdministration> list = preferenceService.fetchAllCompanyAdministration();
		ApiResponse<List<CompanyAdministration>> response = new ApiResponse<>(HttpStatus.FOUND,
				"Company Administration fetched successfully", list);
		return ResponseEntity.ok(response);
	}

//	@PostMapping("/updateDataOfCompanyAdministration")
//	public ResponseEntity<ApiResponse<String>> updateCompanyAdministration(
//			@RequestBody CompanyAdministration companyAdministration) {
//
//		int result = preferenceService.updateCompanyAdministration(companyAdministration);
//
//		if (result > 0) {
//			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK,
//					"Company administration data updated successfully.", "success");
//			return ResponseEntity.ok(response);
//		} else {
//			ApiResponse<String> response = new ApiResponse<>(HttpStatus.BAD_REQUEST,
//					"Failed to update company administration data.", "failure");
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
//		}
//	}

	// Ayush
	@PostMapping("/saveOrUpdateCodeModules")
	public ResponseEntity<ApiResponse> saveOrUpdateCodeModule(@RequestBody CodeModule module) {
		try {
			CodeModule code = preferenceService.saveOrUpdateCodeModule(module);
			return ResponseEntity.ok(new ApiResponse(HttpStatus.OK, "Code Module saved successfully", code));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse("error", "Failed to save Code Module", null));
		}
	}

	@GetMapping("/getAllCodeModule") // Ayush (without DTO)
	public ResponseEntity<ApiResponse<List<CodeModule>>> fetchAllCodeModule() {
		List<CodeModule> list = preferenceService.fetchAllCodeModule();
		ApiResponse<List<CodeModule>> response = new ApiResponse<>(HttpStatus.FOUND,
				"Code modules fetched successfully", list);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/deleteCodeModuleById") // Ayush
	public ResponseEntity<ApiResponse<String>> deleteCodeModule(@RequestParam("id") Long id) {
		boolean isDeleted = preferenceService.deleteCodeModule(id);
		if (isDeleted) {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.OK, "Code Module deleted successfully",
					"success");
			return ResponseEntity.ok(response);
		} else {
			ApiResponse<String> response = new ApiResponse<>(HttpStatus.NOT_FOUND, "Code Module deletion failed",
					"failure");
			return ResponseEntity.badRequest().body(response);
		}
	}

	@GetMapping("/fetchAllTransactions")
	public ResponseEntity<ApiResponse<List<Transactions>>> fetchAllTransactions(
			@RequestParam(required = false) String branchName) {

		List<Transactions> list;
		if (branchName != null && !branchName.isEmpty()) {
			list = preferenceService.fetchTransactionsByBranch(branchName);
		} else {
			list = preferenceService.fetchAllTransactions();
		}

		ApiResponse<List<Transactions>> response = new ApiResponse<>(HttpStatus.FOUND,
				"Transactions fetched successfully", list);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getCompany(@PathVariable Long id) {
		CompanyAdministration c = preferenceService.fetchCompanyById(id);
		if (c == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Company not found");
		return ResponseEntity.ok(c);
	}

	// UPDATE COMPANY DETAILS
	@PostMapping("/update")
	public ResponseEntity<?> updateCompanyAdministration(@RequestBody CompanyAdministration companyAdministration) {
		return ResponseEntity.ok(preferenceService.saveOrUpdateCompany(companyAdministration));
	}

	// UPLOAD IMAGE
	@PostMapping(value = "/upload/{companyId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> uploadCompanyImage(@PathVariable Long companyId, @RequestParam String fieldName,
			@RequestParam MultipartFile file) {
		try {
			return ResponseEntity.ok(preferenceService.saveOrUpdateCompanyImage(companyId, fieldName, file));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed: " + e.getMessage());
		}
	}

	// GET ALL IMAGES
	@GetMapping("/images/{companyId}")
	public ResponseEntity<?> getCompanyImages(@PathVariable Long companyId) {
		return ResponseEntity.ok(preferenceService.getCompanyImages(companyId));
	}

	@PostMapping("/delete/{id}")
	public ResponseEntity<?> deleteImage(@PathVariable Long id) {

		boolean deleted = preferenceService.deleteCompanyImage(id);

		if (!deleted) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image not found");
		}

		return ResponseEntity.ok("Image deleted successfully");
	}

	@GetMapping("/getCompanyDetails")
	public ResponseEntity<?> getCompanyDetails() {

		try {

			CompanyAdministration company = preferenceService.getCompanyDetails();

			if (company == null) {

				return ResponseEntity.notFound().build();

			}

			return ResponseEntity.ok(company);

		} catch (Exception e) {

			e.printStackTrace();

			return ResponseEntity.internalServerError().body("Error while fetching company details");

		}

	}

}
