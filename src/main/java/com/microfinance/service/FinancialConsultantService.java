package com.microfinance.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.microfinance.dto.ApiResponse;
import com.microfinance.dto.CustomerDto;
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
		// TODO Auto-generated method stub
		return addCustomerRepo.findAll();
	}

	public List<addCustomer> getAllBranch() {
		// TODO Auto-generated method stub
		return addCustomerRepo.findAll();
	}

	public List<addCustomer> getByMemberCode(String memberCode) {
		// TODO Auto-generated method stub
		return addCustomerRepo.findByMemberCodeIgnoreCase(memberCode);
	}

	public List<addCustomer> getAllRelationToApplicant() {
		// TODO Auto-generated method stub
		return addCustomerRepo.findAll();
	}

	public ApiResponse<addFinancialConsultant> saveOrUpdateFinancialConsultant(
			FinancialConsultantDto financialConsultantDto, MultipartFile financialPhoto, MultipartFile finnacialSignature) {
		// TODO Auto-generated method stub

		addFinancialConsultant addFinancialConsultant = new addFinancialConsultant();
		boolean isNew = true;

		// Check if the ClientMaster is being updated
		if (financialConsultantDto.getId() != null) {
			addFinancialConsultant = financialConsultationRepo.findById(financialConsultantDto.getId())
					.orElse(new addFinancialConsultant());
			isNew = false;
		}

		// Map fields from DTO to entity
		addFinancialConsultant.setFinancialCode(financialConsultantDto.getFinancialCode());
		addFinancialConsultant.setJoiningDate(financialConsultantDto.getJoiningDate());
		addFinancialConsultant.setFinancialName(financialConsultantDto.getFinancialName());
		// advisorCollectorDetails.setMemberId(advisorCollectorDto.getMemberId());
		addFinancialConsultant.setDob(financialConsultantDto.getDob());
		addFinancialConsultant.setAge(financialConsultantDto.getAge());
		addFinancialConsultant.setTeamMemberCode(financialConsultantDto.getTeamMemberCode());
		addFinancialConsultant.setContactNo(financialConsultantDto.getContactNo());
		addFinancialConsultant.setBranchName(financialConsultantDto.getBranchName());
		addFinancialConsultant.setAddress(financialConsultantDto.getAddress());
		addFinancialConsultant.setDistrict(financialConsultantDto.getDistrict());
		addFinancialConsultant.setState(financialConsultantDto.getState());
		addFinancialConsultant.setPinCode(financialConsultantDto.getPinCode());
		addFinancialConsultant.setProfession(financialConsultantDto.getProfession());
		addFinancialConsultant.setAcademicBackground(financialConsultantDto.getAcademicBackground());
		addFinancialConsultant.setSelectPosition(financialConsultantDto.getSelectPosition());
		addFinancialConsultant.setReferralCode(financialConsultantDto.getReferralCode());
		addFinancialConsultant.setReferralName(financialConsultantDto.getReferralName());
		addFinancialConsultant.setFees(financialConsultantDto.getFees());
		addFinancialConsultant.setModeofPayment(financialConsultantDto.getModeofPayment());
		addFinancialConsultant.setChequeNo(financialConsultantDto.getChequeNo());
		addFinancialConsultant.setChequeDate(financialConsultantDto.getChequeDate());
		addFinancialConsultant.setDepositAccount(financialConsultantDto.getDepositAccount());
		addFinancialConsultant.setRefNo(financialConsultantDto.getRefNo());
		addFinancialConsultant.setComments(financialConsultantDto.getComments());
		addFinancialConsultant.setFinancialStatus(financialConsultantDto.getFinancialStatus());
		addFinancialConsultant.setSmsSend(financialConsultantDto.getSmsSend());

		if (financialPhoto != null && !financialPhoto.isEmpty()) {
			try {
				String fileName = saveFile(financialPhoto);
				addFinancialConsultant.setFinancialPhoto(fileName);
			} catch (IOException e) {
				return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "File upload failed");
			}
		}

		if (finnacialSignature != null && !finnacialSignature.isEmpty()) {
			try {
				String fileName1 = saveFile1(finnacialSignature); // Save the signature
				addFinancialConsultant.setFinnacialSignature(fileName1); // ✅ Correctly set it in entity
			} catch (IOException e) {
				return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "File upload failed");
			}
		}
		
		

		// Save entity to the database
		addFinancialConsultant addfinancialConsultant = financialConsultationRepo.save(addFinancialConsultant);

		// Return response
		if (isNew) {
			return ApiResponse.success(HttpStatus.CREATED,
					"Saved successfully. Financial Code: " + addfinancialConsultant.getFinancialCode(), addfinancialConsultant);
		} else {
			return ApiResponse.success(HttpStatus.OK,
					"Updated successfully. Finnacial Code: " + addfinancialConsultant.getFinancialCode(), addfinancialConsultant);
		}
	}
	private String saveFile1(MultipartFile finnacialSignature) throws IOException {
		// TODO Auto-generated method stub
		if (finnacialSignature != null && !finnacialSignature.isEmpty()) {
			ensureUploadDirectoryExists(); // Ensure the upload directory exists
			String fileName = System.currentTimeMillis() + "_" + finnacialSignature.getOriginalFilename(); // Generate a
																											// unique
																											// filename
			File destinationFile = new File(uploadDirectory + File.separator + fileName);

			try {
				finnacialSignature.transferTo(destinationFile); // Save the file to the destination path
				System.out.println("File successfully saved at: " + destinationFile.getAbsolutePath());
				return fileName; // Return the saved file's name
			} catch (IOException e) {
				System.err.println("File saving failed: " + e.getMessage());
				throw e; // Rethrow the exception to handle errors
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
				System.out.println("File successfully saved at: " + destinationFile.getAbsolutePath());
				return fileName;
			} catch (IOException e) {
				System.err.println("File saving failed: " + e.getMessage());
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
				System.out.println("Upload directory created at: " + uploadDirectory);
			} else {
				System.err.println("Failed to create upload directory: " + uploadDirectory);
			}
		}
	}
	

	public List<addFinancialConsultant> getAllFinancialConsultantDetails() {
		// TODO Auto-generated method stub
		return financialConsultationRepo.findAll();
	}

	public Optional<addFinancialConsultant> FinancialConsultantById(Long id) {
		// TODO Auto-generated method stub
		return financialConsultationRepo.findById(id);
	}

	public boolean deleteFinancialConsultant(Long id) {
		// TODO Auto-generated method stub
		if (financialConsultationRepo.existsById(id)) {
			financialConsultationRepo.deleteById(id);
			return true;
		}
		return false;
    }

	public List<addFinancialConsultant> fetchfinancialHierarchyByFinancialCode(String financialCode) {
		// TODO Auto-generated method stub
		return financialConsultationRepo.findByFinancialCode(financialCode);
	}
	

	public addFinancialConsultant save(addFinancialConsultant customer) {
		// TODO Auto-generated method stub
		return financialConsultationRepo.save(customer);
	}

	public List<addFinancialConsultant> getUnapprovedFinancialConsultants() {
		// TODO Auto-generated method stub
		return financialConsultationRepo.findByIsApprovedFalse();
	}

	public String savePromotionAndUpdatePosition(ConsultantPromotionManagement promotionData, Long id) {
		// TODO Auto-generated method stub
		consultantpromotionRepo.save(promotionData);

        // Step 2: Find consultant and update position
        Optional<addFinancialConsultant> optional = financialConsultationRepo.findById(id);
        if (optional.isPresent()) {
            addFinancialConsultant consultant = optional.get();
            consultant.setSelectPosition(promotionData.getNewPosition());
            financialConsultationRepo.save(consultant);
            return "Promotion saved and consultant position updated.";
        } else {
            throw new RuntimeException("Consultant not found with ID: " + id);
        }
    }

	public List<ConsultantPromotionManagement> getAllPromotionManagementDetail() {
		// TODO Auto-generated method stub
		return consultantpromotionRepo.findAll();
	}
	

	

	
	
}
