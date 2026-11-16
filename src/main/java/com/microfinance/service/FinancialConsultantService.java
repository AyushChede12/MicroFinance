package com.microfinance.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.microfinance.dto.ApiResponse;
import com.microfinance.dto.FinancialConsultantDto;
import com.microfinance.model.ConsultantPromotionManagement;
import com.microfinance.model.addCustomer;
import com.microfinance.model.addFinancialConsultant;
import com.microfinance.repository.AddCustomerRepo;
import com.microfinance.repository.ConsultantPromotionRepo;
import com.microfinance.repository.FinancialConsultantRepo;

@Service
public class FinancialConsultantService {

	@Autowired
	FinancialConsultantRepo financialConsultationRepo;

	@Autowired
	AddCustomerRepo addCustomerRepo;

	@Autowired
	ConsultantPromotionRepo consultantpromotionRepo;

	@Value("${upload.directory}")
	private String uploadDirectory;

	public List<addCustomer> getAllCustomerCodes() {
		return addCustomerRepo.findAll();
	}

	public List<addCustomer> getAllBranch() {
		return addCustomerRepo.findAll();
	}

	public List<addCustomer> getByMemberCode(String memberCode) {
		return addCustomerRepo.findByMemberCodeIgnoreCase(memberCode);
	}

	public List<addCustomer> getAllRelationToApplicant() {
		return addCustomerRepo.findAll();
	}

	public ApiResponse<addFinancialConsultant> saveOrUpdateFinancialConsultant(
			FinancialConsultantDto financialConsultantDto, MultipartFile financialPhoto,
			MultipartFile finnacialSignature) {

		addFinancialConsultant addFinancialConsultant = new addFinancialConsultant();
		boolean isNew = true;

		if (financialConsultantDto.getId() != null) {
			addFinancialConsultant = financialConsultationRepo.findById(financialConsultantDto.getId())
					.orElse(new addFinancialConsultant());
			isNew = false;
		}

		// Map fields from DTO to entity with uppercase normalization
		addFinancialConsultant.setFinancialCode(financialConsultantDto.getFinancialCode() != null ? financialConsultantDto.getFinancialCode().trim().toUpperCase() : null);
		addFinancialConsultant.setJoiningDate(financialConsultantDto.getJoiningDate());
		addFinancialConsultant.setFinancialName(financialConsultantDto.getFinancialName() != null ? financialConsultantDto.getFinancialName().trim().toUpperCase() : null);
		addFinancialConsultant.setDob(financialConsultantDto.getDob());
		addFinancialConsultant.setAge(financialConsultantDto.getAge());
		addFinancialConsultant.setTeamMemberCode(financialConsultantDto.getTeamMemberCode() != null ? financialConsultantDto.getTeamMemberCode().trim().toUpperCase() : null);
		addFinancialConsultant.setContactNo(financialConsultantDto.getContactNo());
		addFinancialConsultant.setBranchName(financialConsultantDto.getBranchName() != null ? financialConsultantDto.getBranchName().trim().toUpperCase() : null);
		addFinancialConsultant.setAddress(financialConsultantDto.getAddress() != null ? financialConsultantDto.getAddress().trim().toUpperCase() : null);
		addFinancialConsultant.setDistrict(financialConsultantDto.getDistrict() != null ? financialConsultantDto.getDistrict().trim().toUpperCase() : null);
		addFinancialConsultant.setState(financialConsultantDto.getState() != null ? financialConsultantDto.getState().trim().toUpperCase() : null);
		addFinancialConsultant.setPinCode(financialConsultantDto.getPinCode());
		addFinancialConsultant.setProfession(financialConsultantDto.getProfession() != null ? financialConsultantDto.getProfession().trim().toUpperCase() : null);
		addFinancialConsultant.setAcademicBackground(financialConsultantDto.getAcademicBackground() != null ? financialConsultantDto.getAcademicBackground().trim().toUpperCase() : null);
		addFinancialConsultant.setSelectPosition(financialConsultantDto.getSelectPosition() != null ? financialConsultantDto.getSelectPosition().trim().toUpperCase() : null);
		addFinancialConsultant.setReferralCode(financialConsultantDto.getReferralCode() != null ? financialConsultantDto.getReferralCode().trim().toUpperCase() : null);
		addFinancialConsultant.setReferralName(financialConsultantDto.getReferralName() != null ? financialConsultantDto.getReferralName().trim().toUpperCase() : null);
		addFinancialConsultant.setFees(financialConsultantDto.getFees());
		addFinancialConsultant.setModeofPayment(financialConsultantDto.getModeofPayment() != null ? financialConsultantDto.getModeofPayment().trim().toUpperCase() : null);
		addFinancialConsultant.setChequeNo(financialConsultantDto.getChequeNo() != null ? financialConsultantDto.getChequeNo().trim().toUpperCase() : null);
		addFinancialConsultant.setChequeDate(financialConsultantDto.getChequeDate());
		addFinancialConsultant.setDepositAccount(financialConsultantDto.getDepositAccount() != null ? financialConsultantDto.getDepositAccount().trim().toUpperCase() : null);
		addFinancialConsultant.setRefNo(financialConsultantDto.getRefNo() != null ? financialConsultantDto.getRefNo().trim().toUpperCase() : null);
		addFinancialConsultant.setComments(financialConsultantDto.getComments() != null ? financialConsultantDto.getComments().trim().toUpperCase() : null);

		String status = financialConsultantDto.getFinancialStatus();
		if (status != null && (status.equals("1") || status.equalsIgnoreCase("true") || status.equalsIgnoreCase("ACTIVE"))) {
			addFinancialConsultant.setFinancialStatus("1");
		} else {
			addFinancialConsultant.setFinancialStatus("0");
		}

		String sms = financialConsultantDto.getSmsSend();
		if (sms != null && (sms.equals("1") || sms.equalsIgnoreCase("true") || sms.equalsIgnoreCase("YES"))) {
			addFinancialConsultant.setSmsSend("1");
		} else {
			addFinancialConsultant.setSmsSend("0");
		}

		if (financialPhoto != null && !financialPhoto.isEmpty()) {
			try {
				String fileName = saveFile(financialPhoto);
				addFinancialConsultant.setFinancialPhoto(fileName);
			} catch (IOException e) {
				return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "FILE UPLOAD FAILED. PLEASE TRY AGAIN.");
			}
		}

		if (finnacialSignature != null && !finnacialSignature.isEmpty()) {
			try {
				String fileName1 = saveFile1(finnacialSignature);
				addFinancialConsultant.setFinnacialSignature(fileName1);
			} catch (IOException e) {
				return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "FILE UPLOAD FAILED. PLEASE TRY AGAIN.");
			}
		}

		addFinancialConsultant addfinancialConsultant = financialConsultationRepo.save(addFinancialConsultant);

		if (isNew) {
			return ApiResponse.success(HttpStatus.CREATED,
					"FINANCIAL CONSULTANT SAVED SUCCESSFULLY. FINANCIAL CODE: " + addfinancialConsultant.getFinancialCode(),
					addfinancialConsultant);
		} else {
			return ApiResponse.success(HttpStatus.OK,
					"FINANCIAL CONSULTANT UPDATED SUCCESSFULLY. FINANCIAL CODE: " + addfinancialConsultant.getFinancialCode(),
					addfinancialConsultant);
		}
	}

	private String saveFile1(MultipartFile finnacialSignature) throws IOException {
		if (finnacialSignature != null && !finnacialSignature.isEmpty()) {
			ensureUploadDirectoryExists();
			String fileName = System.currentTimeMillis() + "_" + finnacialSignature.getOriginalFilename();
			File destinationFile = new File(uploadDirectory + File.separator + fileName);
			try {
				finnacialSignature.transferTo(destinationFile);
				System.out.println("FILE SUCCESSFULLY SAVED AT: " + destinationFile.getAbsolutePath());
				return fileName;
			} catch (IOException e) {
				System.err.println("FILE SAVING FAILED: " + e.getMessage());
				throw e;
			}
		}
		return null;
	}

	private String saveFile(MultipartFile file) throws IOException {
		if (file != null && !file.isEmpty()) {
			ensureUploadDirectoryExists();
			String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
			File destinationFile = new File(uploadDirectory + File.separator + fileName);
			try {
				file.transferTo(destinationFile);
				System.out.println("FILE SUCCESSFULLY SAVED AT: " + destinationFile.getAbsolutePath());
				return fileName;
			} catch (IOException e) {
				System.err.println("FILE SAVING FAILED: " + e.getMessage());
				throw e;
			}
		}
		return null;
	}

	private void ensureUploadDirectoryExists() {
		File uploadDir = new File(uploadDirectory);
		if (!uploadDir.exists()) {
			boolean created = uploadDir.mkdirs();
			if (created) {
				System.out.println("UPLOAD DIRECTORY CREATED AT: " + uploadDirectory);
			} else {
				System.err.println("FAILED TO CREATE UPLOAD DIRECTORY: " + uploadDirectory);
			}
		}
	}

	public List<addFinancialConsultant> getAllFinancialConsultantDetails() {
		return financialConsultationRepo.findAll();
	}

	public Optional<addFinancialConsultant> FinancialConsultantById(Long id) {
		return financialConsultationRepo.findById(id);
	}

	public boolean deleteFinancialConsultant(Long id) {
		if (financialConsultationRepo.existsById(id)) {
			financialConsultationRepo.deleteById(id);
			return true;
		}
		return false;
	}

	public List<addFinancialConsultant> fetchfinancialHierarchyByFinancialCode(String financialCode) {
		if (financialCode == null || financialCode.trim().isEmpty()) {
			return new ArrayList<>();
		}
		String code = financialCode.trim().toUpperCase();
		Set<addFinancialConsultant> resultSet = new LinkedHashSet<>();
		
		// 1. Primary consultant matching code
		List<addFinancialConsultant> selfList = financialConsultationRepo.findByFinancialCode(code);
		resultSet.addAll(selfList);
		
		// 2. Direct downline team (referrals where referralCode == code)
		List<addFinancialConsultant> downlineList = financialConsultationRepo.findByReferralCode(code);
		resultSet.addAll(downlineList);
		
		return new ArrayList<>(resultSet);
	}

	public addFinancialConsultant save(addFinancialConsultant customer) {
		return financialConsultationRepo.save(customer);
	}

	public List<addFinancialConsultant> getUnapprovedFinancialConsultants() {
		return financialConsultationRepo.findByIsApprovedFalse();
	}

	public String savePromotionAndUpdatePosition(ConsultantPromotionManagement promotionData, Long id) {
		if (promotionData != null) {
			if (promotionData.getBranchName() != null) promotionData.setBranchName(promotionData.getBranchName().trim().toUpperCase());
			if (promotionData.getOldPosition() != null) promotionData.setOldPosition(promotionData.getOldPosition().trim().toUpperCase());
			if (promotionData.getNewPosition() != null) promotionData.setNewPosition(promotionData.getNewPosition().trim().toUpperCase());
			if (promotionData.getSeniorCode() != null) promotionData.setSeniorCode(promotionData.getSeniorCode().trim().toUpperCase());
			if (promotionData.getSeniorName() != null) promotionData.setSeniorName(promotionData.getSeniorName().trim().toUpperCase());
			if (promotionData.getSeniorPosition() != null) promotionData.setSeniorPosition(promotionData.getSeniorPosition().trim().toUpperCase());
			consultantpromotionRepo.save(promotionData);
		}

		// Step 2: Find consultant and update position
		Optional<addFinancialConsultant> optional = financialConsultationRepo.findById(id);
		if (optional.isPresent()) {
			addFinancialConsultant consultant = optional.get();
			consultant.setSelectPosition(promotionData != null ? promotionData.getNewPosition() : null);
			financialConsultationRepo.save(consultant);
			return "PROMOTION RECORD SAVED AND CONSULTANT POSITION UPDATED SUCCESSFULLY.";
		} else {
			throw new RuntimeException("FINANCIAL CONSULTANT NOT FOUND WITH ID: " + id);
		}
	}

	public List<ConsultantPromotionManagement> getAllPromotionManagementDetail() {
		return consultantpromotionRepo.findAll();
	}
}