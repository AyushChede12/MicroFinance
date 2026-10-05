package com.microfinance.service;

import java.io.File;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.microfinance.dto.ApiResponse;
import com.microfinance.dto.BankModuleDto;
import com.microfinance.dto.ExecutiveFounderDto;
import com.microfinance.exception.BadRequestException;
import com.microfinance.model.BankModule;
import com.microfinance.model.BranchModule;
import com.microfinance.model.CategoryModule;
import com.microfinance.model.CodeModule;
import com.microfinance.model.CompanyAdministration;
import com.microfinance.model.CompanyImageUploads;
import com.microfinance.model.ExecutiveFounder;
import com.microfinance.model.FinancialYear;
import com.microfinance.model.RelativeModule;
import com.microfinance.model.Transactions;
import com.microfinance.model.UserMenuAccess;
import com.microfinance.model.states;
import com.microfinance.repository.BankModuleRepo;
import com.microfinance.repository.BranchModuleRepo;
import com.microfinance.repository.CategoryModuleRepo;
import com.microfinance.repository.CodeModuleRepo;
import com.microfinance.repository.CompanyAdministrationRepo;
import com.microfinance.repository.ExecutiveFounderRepo;
import com.microfinance.repository.FinancialYearRepo;
import com.microfinance.repository.RelativeModuleRepo;
import com.microfinance.repository.Staterepo;
import com.microfinance.repository.TransactionsRepo;
import com.microfinance.repository.UserCreationRepo;
import com.microfinance.repository.UserMenuAccessRepo;
import com.microfinance.repository.CompanyImageUploadsRepo;

@Service
public class PreferenceService {

	@Autowired
	BranchModuleRepo branchModuleRepo;

	@Autowired
	BankModuleRepo bankModuleRepo;

	@Autowired
	RelativeModuleRepo relativeModuleRepo;

	@Autowired
	CategoryModuleRepo categoryModuleRepo;

	@Autowired
	FinancialYearRepo financialYearRepo;

	@Autowired
	ExecutiveFounderRepo executiveFounderRepo;

	@Autowired
	CompanyAdministrationRepo companyAdministrationRepo;

	@Autowired
	Staterepo stateRepo;

	@Autowired
	CodeModuleRepo codeModuleRepo;

	@Autowired
	TransactionsRepo transactionsRepo;

	@Autowired
	UserCreationRepo userCreationRepo;

	@Autowired
	UserMenuAccessRepo userMenuAccessRepo;

	@Autowired
	CompanyImageUploadsRepo companyImageUploadsRepo;

	@Value("${upload.directory}")
	private String uploadDirectory;

	// Branch Module
	public BranchModule saveBranchModule(BranchModule branchModule) {
		// TODO Auto-generated method stub
		if (branchModule.getId() != null) {
			BranchModule existing = branchModuleRepo.findById(branchModule.getId())
					.orElseThrow(() -> new RuntimeException("Branch not found with ID: " + branchModule.getId()));

			existing.setBranchCode(branchModule.getBranchCode());
			existing.setBranchName(branchModule.getBranchName());
			existing.setOpeningDate(branchModule.getOpeningDate());
			existing.setAddress(branchModule.getAddress());
			existing.setPin(branchModule.getPin());
			existing.setState(branchModule.getState());
			existing.setBranchManagerContactNo(branchModule.getBranchManagerContactNo());
			existing.setAccountDepartmentContactNo(branchModule.getAccountDepartmentContactNo());

			return branchModuleRepo.save(existing);
		} else {
			return branchModuleRepo.save(branchModule);
		}
	}

	public Optional<List<BranchModule>> fetchAllBranchModule() {

		List<BranchModule> list = branchModuleRepo.findAll();

		if (list.isEmpty()) {
			return Optional.empty();
		}

		return Optional.of(list);
	}

	public Optional<BranchModule> findBranchDataById(Long id) {
		// TODO Auto-generated method stub
		return branchModuleRepo.findById(id);
	}

	public boolean deleteBranchModule(long id) {
		if (branchModuleRepo.existsById(id)) {
			branchModuleRepo.deleteById(id);
			return true;
		}
		return false;
	}

	public void validateBranchNameExists(String branchName) {
		if (branchName == null || branchName.trim().isEmpty()) {
			throw new BadRequestException("Branch name is required");
		}

		Optional<BranchModule> branchOpt = branchModuleRepo.findByBranchNameIgnoreCase(branchName.trim());

		if (branchOpt.isPresent()) {
			throw new BadRequestException("Invalid branch name: " + branchName);
		}
	}

	// Bank Module
//	public BankModule saveBankModule(BankModule bankModule) {
//		// TODO Auto-generated method stub
//		if (bankModule.getId() != null) {
//			BankModule existing = bankModuleRepo.findById(bankModule.getId())
//					.orElseThrow(() -> new RuntimeException("Bank not found with ID: " + bankModule.getId()));
//
//			existing.setBankName(bankModule.getBankName());
//			existing.setAccountNo(bankModule.getAccountNo());
//			existing.setContactNo(bankModule.getContactNo());
//			existing.setAddress(bankModule.getAddress());
//			existing.setOpeningDate(bankModule.getOpeningDate());
//			existing.setOpeningBalance(bankModule.getOpeningBalance());
//
//			return bankModuleRepo.save(existing);
//		} else {
//			return bankModuleRepo.save(bankModule);
//		}
//	}

	public List<BankModule> fetchAllBankModule() {
		// TODO Auto-generated method stub
		return bankModuleRepo.findAll();
	}

	public Optional<BankModule> findBankDataById(Long id) {
		// TODO Auto-generated method stub
		return bankModuleRepo.findById(id);
	}

	public boolean deleteBankModule(long id) {
		if (bankModuleRepo.existsById(id)) {
			bankModuleRepo.deleteById(id);
			return true;
		}
		return false;
	}

	// Relative Module
	public RelativeModule saveRelativeModule(RelativeModule relativeModule) {
		// TODO Auto-generated method stub
		if (relativeModule.getId() != null) {
			RelativeModule existing = relativeModuleRepo.findById(relativeModule.getId())
					.orElseThrow(() -> new RuntimeException("Relative not found with ID: " + relativeModule.getId()));

			existing.setRelation(relativeModule.getRelation());

			return relativeModuleRepo.save(existing);
		} else {
			return relativeModuleRepo.save(relativeModule);
		}
	}

	public List<RelativeModule> fetchAllRelativeModule() {
		// TODO Auto-generated method stub
		return relativeModuleRepo.findAll();
	}

	public boolean deleteRelativeModule(Long id) {
		// TODO Auto-generated method stub
		if (relativeModuleRepo.existsById(id)) {
			relativeModuleRepo.deleteById(id);
			return true;
		}
		return false;
	}

	// Category Module
	public CategoryModule saveCategoryModule(CategoryModule categorymodule) {
		// TODO Auto-generated method stub
		if (categorymodule.getId() != null) {
			CategoryModule existing = categoryModuleRepo.findById(categorymodule.getId())
					.orElseThrow(() -> new RuntimeException("Category not found with ID: " + categorymodule.getId()));

			existing.setCategory(categorymodule.getCategory());
			existing.setCaste(categorymodule.getCaste());

			return categoryModuleRepo.save(existing);
		} else {
			return categoryModuleRepo.save(categorymodule);
		}
	}

	public List<CategoryModule> fetchAllCategoryModule() {
		// TODO Auto-generated method stub
		return categoryModuleRepo.findAll();
	}

	public boolean deleteCategoryModule(Long id) {
		// TODO Auto-generated method stub
		if (categoryModuleRepo.existsById(id)) {
			categoryModuleRepo.deleteById(id);
			return true;
		}
		return false;
	}

	// Financial Year
	public FinancialYear saveFinancialYear(FinancialYear financialyear) {
		// TODO Auto-generated method stub
		if (financialyear.getId() != null) {
			FinancialYear existing = financialYearRepo.findById(financialyear.getId()).orElseThrow(
					() -> new RuntimeException("Financial Year not found with ID: " + financialyear.getId()));

			existing.setFinancialYearName(financialyear.getFinancialYearName());
			existing.setDateFrom(financialyear.getDateFrom());
			existing.setDateTo(financialyear.getDateTo());

			return financialYearRepo.save(existing);
		} else {
			return financialYearRepo.save(financialyear);
		}
	}

	public List<FinancialYear> fetchAllFinancialYear() {
		// TODO Auto-generated method stub
		return financialYearRepo.findAll();
	}

	public Optional<FinancialYear> findFinancialYearById(Long id) {
		// TODO Auto-generated method stub
		return financialYearRepo.findById(id);
	}

	public boolean deleteFinancialYear(Long id) {
		// TODO Auto-generated method stub
		if (financialYearRepo.existsById(id)) {
			financialYearRepo.deleteById(id);
			return true;
		}
		return false;
	}

//	public ExecutiveFounder saveExecutiveFounder(ExecutiveFounder founder) {
//		// TODO Auto-generated method stub
//		return executiveFounderRepo.save(founder);
//		
//	}

	public ApiResponse<ExecutiveFounder> saveExecutiveFounder(ExecutiveFounderDto executiveFounderDto,
			MultipartFile photo, MultipartFile signature, MultipartFile aadharCard, MultipartFile panCard,
			MultipartFile cheque) {
		// TODO Auto-generated method stub
		ExecutiveFounder executiveFounder = new ExecutiveFounder();
		boolean isNew = true;

		// Check if the ClientMaster is being updated
		if (executiveFounderDto.getId() > 0) {
			executiveFounder = executiveFounderRepo.findById(executiveFounderDto.getId())
					.orElse(new ExecutiveFounder());
			isNew = false;
		}

		// Map fields from DTO to entity
		executiveFounder.setType(executiveFounderDto.getType());
		executiveFounder.setBranchName(executiveFounderDto.getBranchName());
		executiveFounder.setFullName(executiveFounderDto.getFullName());
		executiveFounder.setDateOfBirth(executiveFounderDto.getDateOfBirth());

		executiveFounder.setPromoterNo(executiveFounderDto.getPromoterNo());
		executiveFounder.setAppointmentDate(executiveFounderDto.getAppointmentDate());
		executiveFounder.setRelationName(executiveFounderDto.getRelationName());
		executiveFounder.setRelationToApplicant(executiveFounderDto.getRelationToApplicant());
		executiveFounder.setAddress(executiveFounderDto.getAddress());
		executiveFounder.setDistrict(executiveFounderDto.getDistrict());
		executiveFounder.setState(executiveFounderDto.getState());
		executiveFounder.setPinCode(executiveFounderDto.getPinCode());
		executiveFounder.setAadharNo(executiveFounderDto.getAadharNo());
		executiveFounder.setPanNo(executiveFounderDto.getPanNo());
		executiveFounder.setContactNo(executiveFounderDto.getContactNo());
		executiveFounder.setEmailId(executiveFounderDto.getEmailId());
		executiveFounder.setBaseValue(executiveFounderDto.getBaseValue());
		executiveFounder.setShareCount(executiveFounderDto.getShareCount());
		executiveFounder.setShareAmount(executiveFounderDto.getShareAmount());

		executiveFounder.setBankName(executiveFounderDto.getBankName());
		executiveFounder.setIfscCode(executiveFounderDto.getIfscCode());
		executiveFounder.setMicrCode(executiveFounderDto.getMicrCode());
		executiveFounder.setAccountNo(executiveFounderDto.getAccountNo());

		// Handle photo upload
		if (photo != null && !photo.isEmpty()) {
			try {
				String fileName1 = saveFile(photo); // Save the signature
				executiveFounder.setPhoto(fileName1);
			} catch (IOException e) {
				return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "File upload failed");
			}
		}

		// Handle signature upload
		if (signature != null && !signature.isEmpty()) {
			try {
				String fileName1 = saveFile1(signature); // Save the signature
				executiveFounder.setSignature(fileName1);
			} catch (IOException e) {
				return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "File upload failed");
			}
		}

		if (aadharCard != null && !aadharCard.isEmpty()) {
			try {
				String fileName1 = saveFile1(aadharCard); // Save the signature
				executiveFounder.setAadharCard(fileName1);
			} catch (IOException e) {
				return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "File upload failed");
			}
		}

		if (panCard != null && !panCard.isEmpty()) {
			try {
				String fileName1 = saveFile1(panCard); // Save the signature
				executiveFounder.setPanCard(fileName1);
			} catch (IOException e) {
				return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "File upload failed");
			}
		}

		if (cheque != null && !cheque.isEmpty()) {
			try {
				String fileName1 = saveFile1(cheque); // Save the signature
				executiveFounder.setCheque(fileName1);
			} catch (IOException e) {
				return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "File upload failed");
			}
		}

		// Save entity to the database
		ExecutiveFounder savedExecutiveFounder = executiveFounderRepo.save(executiveFounder);

		if (isNew) {
			return ApiResponse.success(HttpStatus.CREATED,
					"Saved successfully. Director Name: " + savedExecutiveFounder.getFullName(), savedExecutiveFounder);
		} else {
			return ApiResponse.success(HttpStatus.OK,
					"Updated successfully. Director Name: " + savedExecutiveFounder.getFullName(),
					savedExecutiveFounder);
		}
	}

	private String saveFile(MultipartFile photo) throws IOException {
		// TODO Auto-generated method stub
		if (photo != null && !photo.isEmpty()) {
			ensureUploadDirectoryExists(); // Ensure the upload directory exists
			String fileName = System.currentTimeMillis() + "_" + photo.getOriginalFilename(); // Generate a unique
																								// filename
			File destinationFile = new File(uploadDirectory + File.separator + fileName);

			try {
				photo.transferTo(destinationFile); // Save the file to the destination path
				System.out.println("File successfully saved at: " + destinationFile.getAbsolutePath());
				return fileName; // Return the saved file's name
			} catch (IOException e) {
				System.err.println("File saving failed: " + e.getMessage());
				throw e; // Rethrow the exception to handle errors
			}
		}
		return null;
	}

	private String saveFile1(MultipartFile signature) throws IOException {
		// TODO Auto-generated method stub
		if (signature != null && !signature.isEmpty()) {
			ensureUploadDirectoryExists(); // Ensure the upload directory exists
			String fileName = System.currentTimeMillis() + "_" + signature.getOriginalFilename(); // Generate a unique
																									// filename
			File destinationFile = new File(uploadDirectory + File.separator + fileName);

			try {
				signature.transferTo(destinationFile); // Save the file to the destination path
				System.out.println("File successfully saved at: " + destinationFile.getAbsolutePath());
				return fileName; // Return the saved file's name
			} catch (IOException e) {
				System.err.println("File saving failed: " + e.getMessage());
				throw e; // Rethrow the exception to handle errors
			}
		}
		return null;
	}

	private void ensureUploadDirectoryExists() {
		File uploadDir = new File(uploadDirectory);
		if (!uploadDir.exists()) {
			boolean created = uploadDir.mkdirs(); // Create directories if they don't exist
			if (created) {
				System.out.println("Upload directory created at: " + uploadDirectory);
			} else {
				System.err.println("Failed to create upload directory: " + uploadDirectory);
			}
		}
	}

	public List<ExecutiveFounder> fetchAllExecutiveFounder() {
		// TODO Auto-generated method stub
		return executiveFounderRepo.findAll();
	}

	public boolean deleteExecutiveFounder(long id) {
		// TODO Auto-generated method stub
		if (executiveFounderRepo.existsById(id)) {
			executiveFounderRepo.deleteById(id);
			return true;
		} else {
			return false;
		}
	}

	public Optional<ExecutiveFounder> findExecutiveFounderById(long id) {
		// TODO Auto-generated method stub
		return executiveFounderRepo.findById(id);
	}

	// Company Administration - Ayush
	public List<CompanyAdministration> fetchAllCompanyAdministration() {
		// TODO Auto-generated method stub
		return companyAdministrationRepo.findAll();
	}

	public int updateCompanyAdministration(CompanyAdministration companyAdministration) {
		Optional<CompanyAdministration> optional = companyAdministrationRepo.findById(companyAdministration.getId());

		if (optional.isPresent()) {
			CompanyAdministration company = optional.get();

			company.setCompanyName(companyAdministration.getCompanyName());
			company.setShortName(companyAdministration.getShortName());
			company.setSignUpDate(companyAdministration.getSignUpDate());
			company.setCinNo(companyAdministration.getCinNo());
			company.setPan(companyAdministration.getPan());
			company.setTan(companyAdministration.getTan());
			company.setGstin(companyAdministration.getGstin());
			company.setDeclaredValue(companyAdministration.getDeclaredValue());
			company.setAddress(companyAdministration.getAddress());
			company.setState(companyAdministration.getState());
			company.setCity(companyAdministration.getCity());
			company.setPinCode(companyAdministration.getPinCode());
			company.setEmailId(companyAdministration.getEmailId());
			company.setAuthorizedShareCapital(companyAdministration.getAuthorizedShareCapital());
			company.setPaidUpCapital(companyAdministration.getPaidUpCapital());
			company.setNof(companyAdministration.getNof());
			company.setHelplineNo(companyAdministration.getHelplineNo());
			company.setTdsWithPan(companyAdministration.getTdsWithPan());
			company.setTdsWithoutPan(companyAdministration.getTdsWithoutPan());
			company.setTaxDeduction(companyAdministration.getTaxDeduction());
			company.setBranchManagerContactNo(companyAdministration.getBranchManagerContactNo());

			companyAdministrationRepo.save(company);
			return 1;
		} else {
			return 0;
		}
	}

	public List<states> getAllStates() {
		// TODO Auto-generated method stub
		return stateRepo.findAll();
	}

	public CodeModule saveOrUpdateCodeModule(CodeModule module) {
		CodeModule entity;

		// If ID is present and exists, fetch for update
		if (module.getId() != null && codeModuleRepo.existsById(module.getId())) {
			entity = codeModuleRepo.findById(module.getId()).get();
		} else {
			// Otherwise, create a new instance
			entity = new CodeModule();
		}

		entity.setName(module.getName());
		entity.setBranchPrefix(module.isBranchPrefix());
		entity.setCodePrefix(module.getCodePrefix());
		entity.setNoOfDigit(module.getNoOfDigit());
		entity.setLastNo(module.getLastNo());

		// Generate Preview Code like "EMP00012"
		String preview = generatePreviewCode(module.getCodePrefix(), module.getNoOfDigit(), module.getLastNo());
		entity.setPreview(preview);

		return codeModuleRepo.save(entity);
	}

	private String generatePreviewCode(String prefix, int digits, int number) {
		String format = "%0" + digits + "d";
		return prefix + String.format(format, number);
	}

	public boolean deleteCodeModule(Long id) {
		// TODO Auto-generated method stub
		if (codeModuleRepo.existsById(id)) {
			codeModuleRepo.deleteById(id);
			return true;
		} else {
			return false;
		}
	}

	public List<Transactions> fetchAllTransactions() {
		return transactionsRepo.findAll();
	}

	public List<Transactions> fetchTransactionsByBranch(String branchName) {
		if (branchName == null || branchName.trim().isEmpty()) {
			return transactionsRepo.findAll(); // return all if filter is empty
		}
		return transactionsRepo.findByBranchNameIgnoreCase(branchName);
	}

	public Optional<RelativeModule> fetchRelativeModuleById(Long id) {
		// TODO Auto-generated method stub
		return relativeModuleRepo.findById(id);
	}

	public List<CodeModule> fetchAllCodeModule() {
		// TODO Auto-generated method stub
		return codeModuleRepo.findAll();
	}

	public Optional<CategoryModule> findCategoryModuleById(Long id) {
		// TODO Auto-generated method stub
		return categoryModuleRepo.findById(id);
	}

	// UserCreation
//	public UserCreations saveUserCreation(UserCreations usercreations) {
//		// Auto-generate ID and password
//		return userCreationRepo.save(usercreations);
//	}
//
//	public Object getAllUserCreations() {
//		// TODO Auto-generated method stub
//		return userCreationRepo.findAll();
//	}

	public List<UserMenuAccess> getUserMenuAccess(String userId) {
		return userMenuAccessRepo.findByUserCreations_UserId(userId);
	}

	public ApiResponse<BankModule> saveBankModule(BankModuleDto bankModuleDto, MultipartFile cancelledCheque) {
		// TODO Auto-generated method stub
		BankModule bankModule = new BankModule();
		boolean isNew = true;

		// Check if the ClientMaster is being updated
		if (bankModuleDto.getId() != null && bankModuleDto.getId() > 0) {
			bankModule = bankModuleRepo.findById(bankModuleDto.getId()).orElse(new BankModule());
			isNew = false;
		}

		// Map fields from DTO to entity
		bankModule.setBankName(bankModuleDto.getBankName());
		bankModule.setAccountNo(bankModuleDto.getAccountNo());
		bankModule.setIfscCode(bankModuleDto.getIfscCode());
		bankModule.setMicrCode(bankModuleDto.getMicrCode());

		bankModule.setContactNo(bankModuleDto.getContactNo());
		bankModule.setOpeningDate(bankModuleDto.getOpeningDate());
		bankModule.setOpeningBalance(bankModuleDto.getOpeningBalance());
		bankModule.setClosingDate(bankModuleDto.getClosingDate());
		bankModule.setAddress(bankModuleDto.getAddress());

		// Handle photo upload
		if (cancelledCheque != null && !cancelledCheque.isEmpty()) {
			try {
				String fileName1 = saveFile(cancelledCheque); // Save the signature
				bankModule.setCancelledCheque(fileName1);
			} catch (IOException e) {
				return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "File upload failed");
			}
		}

		// Save entity to the database
		BankModule savedBankModule = bankModuleRepo.save(bankModule);

		if (isNew) {
			return ApiResponse.success(HttpStatus.CREATED,
					"Saved successfully. Bank Name: " + savedBankModule.getBankName(), savedBankModule);
		} else {
			return ApiResponse.success(HttpStatus.OK,
					"Updated successfully. Director Name: " + savedBankModule.getBankName(), savedBankModule);
		}
	}

	public CompanyAdministration fetchCompanyById(Long id) {
		return companyAdministrationRepo.findById(id).orElse(null);
	}

	// SAVE/UPDATE COMPANY
	public CompanyAdministration saveOrUpdateCompany(CompanyAdministration company) {
		return companyAdministrationRepo.save(company);
	}

	// SAVE/UPDATE COMPANY IMAGE
	public CompanyImageUploads saveOrUpdateCompanyImage(Long companyId, String fieldName, MultipartFile file)
			throws Exception {

		CompanyAdministration company = companyAdministrationRepo.findById(companyId)
				.orElseThrow(() -> new IllegalArgumentException("Invalid Company ID: " + companyId));

		Path companyDir = Paths.get(uploadDirectory, "company", companyId.toString());
		Files.createDirectories(companyDir);

		String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
		String storedFileName = System.currentTimeMillis() + "_" + originalFilename;

		Path target = companyDir.resolve(storedFileName);
		Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

		// Check existing image for this name
		Optional<CompanyImageUploads> existingOpt = companyImageUploadsRepo.findByCompanyAndName(company, fieldName);

		CompanyImageUploads img;

		if (existingOpt.isPresent()) {
			img = existingOpt.get();

			// Delete previous file
			if (img.getFileName() != null) {
				Files.deleteIfExists(companyDir.resolve(img.getFileName()));
			}

			img.setFileName(storedFileName);
			img.setOriginalFileName(originalFilename);
		} else {
			img = new CompanyImageUploads(fieldName, storedFileName, originalFilename, company);
		}

		return companyImageUploadsRepo.save(img);
	}

	// FETCH ALL IMAGES OF COMPANY
	public List<CompanyImageUploads> getCompanyImages(Long companyId) {
		CompanyAdministration company = companyAdministrationRepo.findById(companyId).orElse(null);
		return companyImageUploadsRepo.findByCompany(company);
	}

	public boolean deleteCompanyImage(Long id) {

		Optional<CompanyImageUploads> opt = companyImageUploadsRepo.findById(id);

		if (!opt.isPresent()) {
			return false;
		}

		// Delete file from folder
		CompanyImageUploads img = opt.get();
		File file = new File(uploadDirectory + img.getFileName());
		if (file.exists()) {
			file.delete();
		}

		// Delete DB record
		companyImageUploadsRepo.deleteById(id);

		return true;
	}

	public List<CategoryModule> findCasteByCategory(String category) {
		// TODO Auto-generated method stub
		return categoryModuleRepo.findByCategory(category);
	}

	public CompanyAdministration getCompanyDetails() {
		// TODO Auto-generated method stub
		return companyAdministrationRepo.findTopByOrderByIdAsc();
	}

}