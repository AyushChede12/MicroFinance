package com.microfinance.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.nio.file.Path;
import java.nio.file.Files;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.microfinance.dto.ApiResponse;
import com.microfinance.dto.CustomerDto;
import com.microfinance.model.CreateSavingsAccount;
import com.microfinance.model.addCustomer;
import com.microfinance.model.addCustomerKYC;
import com.microfinance.model.BranchModule;
import com.microfinance.repository.AddCustomerKycRepo;
import com.microfinance.repository.CustomerRepo;
import com.microfinance.repository.CreateSavingAccountRepo;
import com.microfinance.repository.BranchModuleRepo;
import org.springframework.util.StringUtils;
import java.util.Optional;
import java.util.ArrayList;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

@Service
public class CustomerManagementService {

	@Autowired
	CustomerRepo customerRepo;

	@Autowired
	AddCustomerKycRepo addCustomerKycRepo;

	@Autowired
	CreateSavingAccountRepo createSavingAccountRepo;

	@Autowired
	BranchModuleRepo branchModuleRepo;

	@Value("${upload.directory}")

	private String uploadDirectory;

	public ApiResponse<addCustomer> saveOrUpdateCustomer(CustomerDto clientMasterDto, MultipartFile customerPhoto,
			MultipartFile customerSignature, MultipartFile customerDriving, MultipartFile customerVoter,
			MultipartFile nomineAadhar, MultipartFile nomineSignature, MultipartFile newlyAddedImage) {
		addCustomer addcustomer = new addCustomer();
		boolean isNew = true;

// Update path
		if (clientMasterDto.getId() != null) {
			addcustomer = customerRepo.findById(clientMasterDto.getId()).orElse(new addCustomer());
			isNew = false;
		}

// Mapping fields
// You already did this correctly
		addcustomer.setMemberCode(clientMasterDto.getMemberCode());
		addcustomer.setAuthenticateFor(clientMasterDto.getAuthenticateFor());
		addcustomer.setSignupDate(clientMasterDto.getSignupDate());
		addcustomer.setMajor(clientMasterDto.getMajor());
		addcustomer.setCustomerName(clientMasterDto.getCustomerName());
		addcustomer.setGuardianName(clientMasterDto.getGuardianName());
		addcustomer.setRelationToApplicant(clientMasterDto.getRelationToApplicant());
		addcustomer.setCustomerGender(clientMasterDto.getCustomerGender());
		addcustomer.setDob(clientMasterDto.getDob());
		addcustomer.setCustomerAge(clientMasterDto.getCustomerAge());
		addcustomer.setRelationshipStatus(clientMasterDto.getRelationshipStatus());
		addcustomer.setCustomerAddress(clientMasterDto.getCustomerAddress());
		addcustomer.setDistrict(clientMasterDto.getDistrict());
		addcustomer.setState(clientMasterDto.getState());
		addcustomer.setBranchName(clientMasterDto.getBranchName());
		addcustomer.setPinCode(clientMasterDto.getPinCode());
		addcustomer.setAadharNo(clientMasterDto.getAadharNo());
		addcustomer.setPanNo(clientMasterDto.getPanNo());
		addcustomer.setVoterNo(clientMasterDto.getVoterNo());
		addcustomer.setContactNo(clientMasterDto.getContactNo());
		addcustomer.setMinor(clientMasterDto.getMinor());
		addcustomer.setEmailId(clientMasterDto.getEmailId());
		addcustomer.setProfession(clientMasterDto.getProfession());
		addcustomer.setAcademicBackground(clientMasterDto.getAcademicBackground());
		addcustomer.setReferralCode(clientMasterDto.getReferralCode());
		addcustomer.setReferralName(clientMasterDto.getReferralName());
		addcustomer.setDrivingLicenceNo(clientMasterDto.getDrivingLicenceNo());
		addcustomer.setShareAmount(clientMasterDto.getShareAmount());
		addcustomer.setNoOfShare(clientMasterDto.getNoOfShare());
		addcustomer.setLightBill(clientMasterDto.getLightBill());
		addcustomer.setTaxBill(clientMasterDto.getTaxBill());
		addcustomer.setFirstName(clientMasterDto.getFirstName());
		addcustomer.setMiddleName(clientMasterDto.getMiddleName());
		addcustomer.setLastName(clientMasterDto.getLastName());
		addcustomer.setGuardianAccountNo(clientMasterDto.getGuardianAccountNo());
		addcustomer.setCategory(clientMasterDto.getCategory());
		addcustomer.setCaste(clientMasterDto.getCaste());
		addcustomer.setShareValue(clientMasterDto.getShareValue());

// Nominee Details
		addcustomer.setNomineeName(clientMasterDto.getNomineeName());
		addcustomer.setNomineeRelationToApplicant(clientMasterDto.getNomineeRelationToApplicant());
		addcustomer.setNomineeAddress(clientMasterDto.getNomineeAddress());
		addcustomer.setNomineeKycNo(clientMasterDto.getNomineeKycNo());
		addcustomer.setNomineeMobileNo(clientMasterDto.getNomineeMobileNo());
		addcustomer.setNomineeAge(clientMasterDto.getNomineeAge());
		addcustomer.setNomineePanNo(clientMasterDto.getNomineePanNo());
		addcustomer.setNomineeKycType(clientMasterDto.getNomineeKycType());
		addcustomer.setNomineeDOB(clientMasterDto.getNomineeDOB());

// Payment details
		addcustomer.setMemberFees(clientMasterDto.getMemberFees());
		addcustomer.setBuildingFund(clientMasterDto.getBuildingFund());
		addcustomer.setAdminCharge(clientMasterDto.getAdminCharge());
		addcustomer.setDocumentCharge(clientMasterDto.getDocumentCharge());
		addcustomer.setEntryFee(clientMasterDto.getEntryFee());
		addcustomer.setOtherCharge(clientMasterDto.getOtherCharge());
		addcustomer.setChequeNo(clientMasterDto.getChequeNo());
		addcustomer.setChequeDate(clientMasterDto.getChequeDate());
		addcustomer.setDepositAcNo(clientMasterDto.getDepositAcNo());
		addcustomer.setReferenceNo(clientMasterDto.getReferenceNo());
		addcustomer.setRemarks(clientMasterDto.getRemarks());
		addcustomer.setPaymentBy(clientMasterDto.getPaymentBy());

// Additional
		addcustomer.setMobileBanking(clientMasterDto.getMobileBanking());
		addcustomer.setSmsSend(clientMasterDto.getSmsSend());
		addcustomer.setMemberStatus(clientMasterDto.getMemberStatus());
		addcustomer.setNetBanking(clientMasterDto.getNetBanking());

// Handle File Uploads
		try {
			if (customerPhoto != null && !customerPhoto.isEmpty()) {
				String photoFileName = saveFile(customerPhoto);
				addcustomer.setCustomerPhoto(photoFileName);
			}

			if (customerSignature != null && !customerSignature.isEmpty()) {
				String signFileName = saveFile(customerSignature);
				addcustomer.setCustomerSignature(signFileName);
			}

			if (customerVoter != null && !customerVoter.isEmpty()) {
				String voterFileName = saveFile(customerVoter);
				addcustomer.setCustomerVoter(voterFileName);
			}

			if (customerDriving != null && !customerDriving.isEmpty()) {
				String drivingFileName = saveFile(customerDriving);
				addcustomer.setCustomerDriving(drivingFileName);
			}

			if (nomineAadhar != null && !nomineAadhar.isEmpty()) {
				String nomineAadharFileName = saveFile(nomineAadhar);
				addcustomer.setNomineAadhar(nomineAadharFileName);
			}

			if (nomineSignature != null && !nomineSignature.isEmpty()) {
				String nomineSignatureFileName = saveFile(nomineSignature);
				addcustomer.setNomineSignature(nomineSignatureFileName);
				;
			}

			if (newlyAddedImage != null && !newlyAddedImage.isEmpty()) {
				String newlyAddedImageFileName = saveFile(newlyAddedImage);
				addcustomer.setNewlyAddedImage(newlyAddedImageFileName);
			}
		} catch (IOException e) {
			return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "File upload failed: " + e.getMessage());
		}

// Save entity
		addCustomer saved = customerRepo.save(addcustomer);

		if (isNew) {
			autoCreateSavingsAccount(saved);
			return ApiResponse.success(HttpStatus.CREATED,
					"Customer saved successfully. Member Code: " + saved.getMemberCode(), saved);
		} else {
			return ApiResponse.success(HttpStatus.OK,
					"Customer updated successfully. Member Code: " + saved.getMemberCode(), saved);
		}
	}

	private void autoCreateSavingsAccount(addCustomer savedCustomer) {
		try {
			// Guard: skip if member code is missing
			if (savedCustomer.getMemberCode() == null || savedCustomer.getMemberCode().trim().isEmpty()) {
				System.err.println("Skipping auto savings account creation: memberCode is null for customer ID " + savedCustomer.getId());
				return;
			}
			// Guard: skip if savings account already exists for this member
			if (createSavingAccountRepo.existsBySelectByCustomer(savedCustomer.getMemberCode())) {
				System.out.println("Savings account already exists for memberCode: " + savedCustomer.getMemberCode());
				return;
			}
			CreateSavingsAccount account = new CreateSavingsAccount();
			account.setTypeofaccount("savingaccount");
			account.setOpeningDate(savedCustomer.getSignupDate());
			account.setSelectByCustomer(savedCustomer.getMemberCode());
			account.setEnterCustomerName(savedCustomer.getCustomerName());
			account.setDateOfBirth(savedCustomer.getDob());
			account.setFamilyDetails(savedCustomer.getGuardianName());
			account.setContactNumber(savedCustomer.getContactNo());
			account.setSuggestedNomineeName(savedCustomer.getNomineeName());
			account.setSuggestedNomineeAge(savedCustomer.getNomineeAge());
			account.setSuggestedNomineeRelation(savedCustomer.getNomineeRelationToApplicant());
			account.setAddress(savedCustomer.getCustomerAddress());
			account.setDistrict(savedCustomer.getDistrict());
			account.setState(savedCustomer.getState());
			account.setPinCode(savedCustomer.getPinCode());
			account.setEmailId(savedCustomer.getEmailId());
			account.setAadharNo(savedCustomer.getAadharNo());
			account.setAuthenticateWith(savedCustomer.getAuthenticateFor());
			
			if (savedCustomer.getBranchName() != null) {
				try {
					Optional<BranchModule> branchOpt = branchModuleRepo.findByBranchNameIgnoreCase(savedCustomer.getBranchName());
					if (branchOpt.isPresent()) {
						account.setBranchName(branchOpt.get());
					} else {
						// Try a list-based fallback if Optional is empty
						List<BranchModule> allBranches = branchModuleRepo.findAll();
						allBranches.stream()
							.filter(b -> savedCustomer.getBranchName().equalsIgnoreCase(b.getBranchName()))
							.findFirst()
							.ifPresent(account::setBranchName);
					}
				} catch (Exception branchEx) {
					System.err.println("Branch lookup failed (non-unique or not found): " + branchEx.getMessage());
				}
			}
			
			account.setOperationType("Single");
			account.setBalance("0");
			account.setOpeningFees("0");
			account.setAccountStatus("1");
			account.setAccountFreeze("0");
			account.setModeOfPayment("Cash");
			account.setApproved(false);
			
			account.setPhoto(savedCustomer.getCustomerPhoto());
			account.setSignature(savedCustomer.getCustomerSignature());
			
			long maxId = createSavingAccountRepo.getMaxId();
			String accountNumber = String.format("2025%08d", maxId + 1);
			account.setAccountNumber(accountNumber);
			
			createSavingAccountRepo.save(account);
		} catch (Exception e) {
			System.err.println("Failed to auto-create savings account for customer: " + e.getMessage());
			e.printStackTrace();
		}
	}

	private String saveFile(MultipartFile file) throws IOException {
		if (file != null && !file.isEmpty()) {
			ensureUploadDirectoryExists();
			String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
			File destination = new File(uploadDirectory + File.separator + fileName);
			file.transferTo(destination);
			return fileName;
		}
		return null;
	}

	private void ensureUploadDirectoryExists() {
		File uploadDir = new File(uploadDirectory);
		if (!uploadDir.exists()) {
			boolean created = uploadDir.mkdirs();
			if (created) {
				System.out.println("Upload directory created at: " + uploadDirectory);
			} else {
				System.err.println("Failed to create upload directory: " + uploadDirectory);
			}
		}
	}

	public List<addCustomer> getAllCustomer() {
		// TODO Auto-generated method stub
		return customerRepo.findAll();
	}

	public List<addCustomer> fetchBySelectedMember(String memberCode) {
		// TODO Auto-generated method stub
		return customerRepo.findBymemberCode(memberCode);
	}

	/*
	 * public ApiResponse<addCustomerKYC> saveOrUpdateCustomerKYC(addCustomerKYC
	 * kyc, MultipartFile customerPhoto, MultipartFile customerSignature,
	 * MultipartFile aadharFrontPhoto, MultipartFile aadharBackPhoto, MultipartFile
	 * panPhoto) {
	 * 
	 * boolean isNew = true;
	 * 
	 * // Step 1: Check if the base customer exists addCustomer baseCustomer =
	 * customerRepo.findById(kyc.getId()).orElse(null);
	 * 
	 * if (baseCustomer == null) { return ApiResponse.error(HttpStatus.NOT_FOUND,
	 * "Customer ID not found in master table."); }
	 * 
	 * // Step 2: Check if KYC already exists addCustomerKYC entity =
	 * addCustomerKycRepo.findById(kyc.getId()).orElse(new addCustomerKYC());
	 * 
	 * if (entity.getId() > 0) { isNew = false; }
	 * 
	 * // Step 3: Copy fields from form to entity
	 * entity.setSelectByCode(kyc.getSelectByCode());
	 * entity.setCustomerName(kyc.getCustomerName());
	 * entity.setCustomerCode(kyc.getCustomerCode());
	 * entity.setContactNo(kyc.getContactNo());
	 * entity.setSingupDate(kyc.getSingupDate());
	 * entity.setAadharNo(kyc.getAadharNo()); entity.setPan(kyc.getPan());
	 * entity.setVoterNo(kyc.getVoterNo());
	 * entity.setRationCardNo(kyc.getRationCardNo());
	 * entity.setDrivingLicenseNo(kyc.getDrivingLicenseNo());
	 * entity.setBankName(kyc.getBankName());
	 * entity.setBankBranch(kyc.getBankBranch());
	 * entity.setAcountNo(kyc.getAcountNo()); entity.setIfscCode(kyc.getIfscCode());
	 * 
	 * try { if (customerPhoto != null && !customerPhoto.isEmpty()) {
	 * entity.setCustomerPhoto(saveFile2(customerPhoto)); } if (customerSignature !=
	 * null && !customerSignature.isEmpty()) {
	 * entity.setCustomerSignature(saveFile2(customerSignature)); } if
	 * (aadharFrontPhoto != null && !aadharFrontPhoto.isEmpty()) {
	 * entity.setAadharFrontPhoto(saveFile2(aadharFrontPhoto)); } if
	 * (aadharBackPhoto != null && !aadharBackPhoto.isEmpty()) {
	 * entity.setAadharBackPhoto(saveFile2(aadharBackPhoto)); } if (panPhoto != null
	 * && !panPhoto.isEmpty()) { entity.setPanPhoto(saveFile2(panPhoto)); } } catch
	 * (IOException e) { return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR,
	 * "File upload failed: " + e.getMessage()); }
	 * 
	 * addCustomerKYC saved = addCustomerKycRepo.save(entity);
	 * 
	 * return ApiResponse.success(isNew ? HttpStatus.CREATED : HttpStatus.OK, (isNew
	 * ? "KYC saved" : "KYC updated") + " successfully for customer code: " +
	 * saved.getCustomerCode(), saved); }
	 * 
	 * private String saveFile2(MultipartFile file) throws IOException { if (file !=
	 * null && !file.isEmpty()) { ensureUploadDirectoryExists1(); String fileName =
	 * System.currentTimeMillis() + "_" + file.getOriginalFilename(); File
	 * destinationFile = new File(uploadDirectory + File.separator + fileName);
	 * file.transferTo(destinationFile); System.out.println("Saved at: " +
	 * destinationFile.getAbsolutePath()); return fileName; } return null; }
	 * 
	 * private void ensureUploadDirectoryExists1() { File dir = new
	 * File(uploadDirectory); if (!dir.exists()) { boolean created = dir.mkdirs();
	 * if (created) { System.out.println("Upload directory created: " +
	 * uploadDirectory); } else {
	 * System.err.println("Failed to create upload directory: " + uploadDirectory);
	 * } } }
	 */

	public List<addCustomer> getApprovedCustomers() {
		return customerRepo.findByIsApprovedTrue();
	}

	public static class ExtraImageDto {
		private Long id;
		private String name;
		private String fileName;
		private String originalFileName;
		private String uploadDate;

		public ExtraImageDto() {}

		public ExtraImageDto(Long id, String name, String fileName, String originalFileName, String uploadDate) {
			this.id = id;
			this.name = name;
			this.fileName = fileName;
			this.originalFileName = originalFileName;
			this.uploadDate = uploadDate;
		}

		public Long getId() { return id; }
		public void setId(Long id) { this.id = id; }
		public String getName() { return name; }
		public void setName(String name) { this.name = name; }
		public String getFileName() { return fileName; }
		public void setFileName(String fileName) { this.fileName = fileName; }
		public String getOriginalFileName() { return originalFileName; }
		public void setOriginalFileName(String originalFileName) { this.originalFileName = originalFileName; }
		public String getUploadDate() { return uploadDate; }
		public void setUploadDate(String uploadDate) { this.uploadDate = uploadDate; }
	}

	private List<ExtraImageDto> parseExtraImages(String json) {
		if (json == null || json.trim().isEmpty()) {
			return new ArrayList<>();
		}
		try {
			ObjectMapper mapper = new ObjectMapper();
			return mapper.readValue(json, new TypeReference<List<ExtraImageDto>>() {});
		} catch (Exception e) {
			e.printStackTrace();
			return new ArrayList<>();
		}
	}

	private String serializeExtraImages(List<ExtraImageDto> list) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			return mapper.writeValueAsString(list);
		} catch (Exception e) {
			e.printStackTrace();
			return "[]";
		}
	}

	public ExtraImageDto saveOrUpdateCustomerImage(Long customerId, String fieldName, MultipartFile file)
			throws Exception {

		addCustomer customer = customerRepo.findById(customerId)
				.orElseThrow(() -> new IllegalArgumentException("Invalid Customer ID: " + customerId));

		Path customerDir = Paths.get(uploadDirectory, "customer", customerId.toString());
		Files.createDirectories(customerDir);

		String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
		String storedFileName = System.currentTimeMillis() + "_" + originalFilename;

		Path target = customerDir.resolve(storedFileName);
		Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

		List<ExtraImageDto> images = parseExtraImages(customer.getCustomerExtraImage());
		
		ExtraImageDto targetImg = null;
		for (ExtraImageDto img : images) {
			if (img.getName().equalsIgnoreCase(fieldName)) {
				targetImg = img;
				break;
			}
		}

		String currentDateTime = java.time.LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

		if (targetImg != null) {
			if (targetImg.getFileName() != null) {
				Files.deleteIfExists(customerDir.resolve(targetImg.getFileName()));
			}
			targetImg.setFileName(storedFileName);
			targetImg.setOriginalFileName(originalFilename);
			targetImg.setUploadDate(currentDateTime);
		} else {
			long newId = System.currentTimeMillis();
			targetImg = new ExtraImageDto(newId, fieldName, storedFileName, originalFilename, currentDateTime);
			images.add(targetImg);
		}

		customer.setCustomerExtraImage(serializeExtraImages(images));
		customerRepo.save(customer);

		return targetImg;
	}

	public List<ExtraImageDto> getCustomerImages(Long customerId) {
		addCustomer customer = customerRepo.findById(customerId).orElse(null);
		if (customer == null) {
			return new ArrayList<>();
		}
		return parseExtraImages(customer.getCustomerExtraImage());
	}

	public boolean deleteCustomerImage(String compositeId) {
		if (compositeId == null || !compositeId.contains("-")) {
			return false;
		}
		String[] parts = compositeId.split("-");
		if (parts.length < 2) {
			return false;
		}
		Long customerId;
		Long imageId;
		try {
			customerId = Long.parseLong(parts[0]);
			imageId = Long.parseLong(parts[1]);
		} catch (NumberFormatException e) {
			return false;
		}

		Optional<addCustomer> opt = customerRepo.findById(customerId);
		if (!opt.isPresent()) {
			return false;
		}

		addCustomer customer = opt.get();
		List<ExtraImageDto> images = parseExtraImages(customer.getCustomerExtraImage());
		
		ExtraImageDto targetImg = null;
		int targetIndex = -1;
		for (int i = 0; i < images.size(); i++) {
			if (images.get(i).getId().equals(imageId)) {
				targetImg = images.get(i);
				targetIndex = i;
				break;
			}
		}

		if (targetIndex == -1) {
			return false;
		}

		Path customerDir = Paths.get(uploadDirectory, "customer", customerId.toString());
		try {
			if (targetImg.getFileName() != null) {
				Files.deleteIfExists(customerDir.resolve(targetImg.getFileName()));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		images.remove(targetIndex);
		customer.setCustomerExtraImage(serializeExtraImages(images));
		customerRepo.save(customer);

		return true;
	}
}