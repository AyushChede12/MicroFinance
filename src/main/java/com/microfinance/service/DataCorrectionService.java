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
import com.microfinance.dto.PolicyManagementDto;
import com.microfinance.model.AddnewinvestmentPM;
import com.microfinance.model.ApplyForGroupLoan;
import com.microfinance.model.CompanyAdministration;
import com.microfinance.model.CreateSavingsAccount;
import com.microfinance.model.DailyPremiumRenewalPM;
import com.microfinance.model.FlexibleRenewal;
import com.microfinance.model.FlexiblepremiumrenewalPM;
import com.microfinance.model.LoanApplication;
import com.microfinance.model.PolicyRenewal;
import com.microfinance.model.SavingAccountActivity;
import com.microfinance.model.TransferShare;
import com.microfinance.model.addCustomer;
import com.microfinance.model.addFinancialConsultant;
import com.microfinance.repository.AddCustomerRepo;
import com.microfinance.repository.AddInvestmentRepo;
import com.microfinance.repository.ApplyForGroupLoanRepo;
import com.microfinance.repository.CreateSavingAccountRepo;
import com.microfinance.repository.CustomerRepo;
import com.microfinance.repository.DailyPremiumRenewalRepo;
import com.microfinance.repository.FinancialConsultantRepo;
import com.microfinance.repository.FlexibleRenewalRepo;
import com.microfinance.repository.LoanApplicationRepo;
import com.microfinance.repository.PolicyRenewalRepo;
import com.microfinance.repository.SavingAccountActivityRepo;
import com.microfinance.repository.TransferShareRepo;

@Service
public class DataCorrectionService {

	@Autowired
	CustomerRepo customerRepo;

	@Autowired
	SavingAccountActivityRepo savingAccountActivityRepo;

	@Autowired
	AddInvestmentRepo addInvestmentRepo;

	@Autowired
	CreateSavingAccountRepo createSavingAccountRepo;

	@Autowired
	LoanApplicationRepo loanApplicationRepo;

	@Autowired
	PolicyRenewalRepo policyRenewalRepo;

	@Autowired
	DailyPremiumRenewalRepo dailyPremiumRenewalRepo;

	@Autowired
	FlexibleRenewalRepo flexibleRenewalRepo;

	@Autowired
	ApplyForGroupLoanRepo applyForGroupLoanRepo;

	@Value("${upload.directory}")
	private String uploadDirectory;

	public boolean deleteCustomerData(Long id) {
		// TODO Auto-generated method stub
		if (customerRepo.existsById(id)) {
			customerRepo.deleteById(id);
			return true;
		} else {
			return false;
		}
	}

//	public boolean deleteFinancialData(Long id) {
//		// TODO Auto-generated method stub
//		if (financialConsultantRepo.existsById(id)) {
//			financialConsultantRepo.deleteById(id);
//			return true;
//		} else {
//			return false;
//		}
//	}

	public List<SavingAccountActivity> fetchAllSavingAccountActivity() {
		// TODO Auto-generated method stub
		return savingAccountActivityRepo.findAll();
	}

	public boolean deleteSavingTransaction(Long id) {
		// TODO Auto-generated method stub
		if (savingAccountActivityRepo.existsById(id)) {
			savingAccountActivityRepo.deleteById(id);
			return true;
		} else {
			return false;
		}
	}

//	public ApiResponse<AddnewinvestmentPM> saveOrUpdatePolicyManagement(PolicyManagementDto policyManagementDto,
//			MultipartFile image1, MultipartFile image2) {
//		// TODO Auto-generated method stub
//		AddnewinvestmentPM addnewinvestmentpm = new AddnewinvestmentPM();
//		boolean isNew = true;
//
//		if (policyManagementDto.getId() != null) {
//			addnewinvestmentpm = addInvestmentRepo.findById(policyManagementDto.getId())
//					.orElse(new AddnewinvestmentPM());
//			isNew = false;
//		}
//
//		// Map fields from DTO to entity
//		addnewinvestmentpm.setPolicyCode(policyManagementDto.getPolicyCode());
//		addnewinvestmentpm.setPolicyStartDate(policyManagementDto.getPolicyStartDate());
//		addnewinvestmentpm.setMemberSelection(policyManagementDto.getMemberSelection());
//		addnewinvestmentpm.setCustomerName(policyManagementDto.getCustomerName());
//		addnewinvestmentpm.setDateofBirth(policyManagementDto.getDateofBirth());
//		addnewinvestmentpm.setRelationDetails(policyManagementDto.getRelationDetails());
//		addnewinvestmentpm.setContactNo(policyManagementDto.getContactNo());
//		addnewinvestmentpm.setSuggestedNominee(policyManagementDto.getSuggestedNominee());
//		addnewinvestmentpm.setAgeOfNominee(policyManagementDto.getAgeOfNominee());
//		addnewinvestmentpm.setRelation(policyManagementDto.getRelation());
//		addnewinvestmentpm.setAddress(policyManagementDto.getAddress());
//		addnewinvestmentpm.setDistrict(policyManagementDto.getDistrict());
//		addnewinvestmentpm.setState(policyManagementDto.getState());
//		addnewinvestmentpm.setPinCode(policyManagementDto.getPinCode());
//		addnewinvestmentpm.setTds(policyManagementDto.getTds());
//		addnewinvestmentpm.setBranchName(policyManagementDto.getBranchName());
//		addnewinvestmentpm.setModeOfOperation(policyManagementDto.getModeOfOperation());
//		addnewinvestmentpm.setJointMemCode(policyManagementDto.getJointMemCode());
//		addnewinvestmentpm.setJointName(policyManagementDto.getJointName());
//		addnewinvestmentpm.setMaturityDate(policyManagementDto.getMaturityDate());
//		addnewinvestmentpm.setSchemeType(policyManagementDto.getSchemeType());
//		addnewinvestmentpm.setSchemeTerm(policyManagementDto.getSchemeTerm());
//		addnewinvestmentpm.setSchemeMode(policyManagementDto.getSchemeMode());
//		addnewinvestmentpm.setPolicyAmount(policyManagementDto.getPolicyAmount());
//		addnewinvestmentpm.setDepositAmount(policyManagementDto.getDepositAmount());
//		addnewinvestmentpm.setIntroMCode(policyManagementDto.getIntroMCode());
//		addnewinvestmentpm.setMaturityAmount(policyManagementDto.getMaturityAmount());
//		addnewinvestmentpm.setMISInterest(policyManagementDto.getMISInterest());
//		addnewinvestmentpm.setPaymentBy(policyManagementDto.getPaymentBy());
//		addnewinvestmentpm.setRemark(policyManagementDto.getRemark());
//		addnewinvestmentpm.setAgent(policyManagementDto.getAgent());
//		addnewinvestmentpm.setSmsSend(policyManagementDto.getSmsSend());
//		
//		//Image1
//		if (image1 != null && !image1.isEmpty()) {
//			try {
//				String fileName = saveFile(image1);
//				addnewinvestmentpm.setImage1(fileName);
//			} catch (IOException e) {
//				return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "File upload failed");
//			}
//		}
//
//		//Image2
//		if (image2 != null && !image2.isEmpty()) {
//			try {
//				String fileName = saveFile1(image2); // Save the signature
//				addnewinvestmentpm.setImage2(fileName); // ✅ Correctly set it in entity
//			} catch (IOException e) {
//				return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "File upload failed");
//			}
//		}
//
//		// Save entity to the database
//		AddnewinvestmentPM savedPolicyManagement = addInvestmentRepo.save(addnewinvestmentpm);
//
//		// Return response
//		if (isNew) {
//			return ApiResponse.success(HttpStatus.CREATED,
//					"Saved successfully. Policy Code: " + savedPolicyManagement.getPolicyCode(), savedPolicyManagement);
//		} else {
//			return ApiResponse.success(HttpStatus.OK,
//					"Updated successfully. Policy Code: " + savedPolicyManagement.getPolicyCode(), savedPolicyManagement);
//		}
//	}
//	
//	private String saveFile(MultipartFile file) throws IOException {
//		if (file != null && !file.isEmpty()) {
//			ensureUploadDirectoryExists();
//			String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
//			File destinationFile = new File(uploadDirectory + File.separator + fileName);
//
//			try {
//				file.transferTo(destinationFile);
//				System.out.println("File successfully saved at: " + destinationFile.getAbsolutePath());
//				return fileName;
//			} catch (IOException e) {
//				System.err.println("File saving failed: " + e.getMessage());
//				throw e;
//			}
//		}
//		return null;
//	}
//	
//	private String saveFile1(MultipartFile image2) throws IOException {
//		// TODO Auto-generated method stub
//		if (image2 != null && !image2.isEmpty()) {
//			ensureUploadDirectoryExists(); // Ensure the upload directory exists
//			String fileName = System.currentTimeMillis() + "_" + image2.getOriginalFilename(); // Generate a
//																											// unique
//																											// filename
//			File destinationFile = new File(uploadDirectory + File.separator + fileName);
//
//			try {
//				image2.transferTo(destinationFile); // Save the file to the destination path
//				System.out.println("File successfully saved at: " + destinationFile.getAbsolutePath());
//				return fileName; // Return the saved file's name
//			} catch (IOException e) {
//				System.err.println("File saving failed: " + e.getMessage());
//				throw e; // Rethrow the exception to handle errors
//			}
//		}
//		return null;
//	}
//
//	
//
//	private void ensureUploadDirectoryExists() {
//		File uploadDir = new File(uploadDirectory);
//		if (!uploadDir.exists()) {
//			boolean created = uploadDir.mkdirs();
//			if (created) {
//				System.out.println("Upload directory created at: " + uploadDirectory);
//			} else {
//				System.err.println("Failed to create upload directory: " + uploadDirectory);
//			}
//		}
//	}

	public boolean deletePolicyData(Long id) {
		// TODO Auto-generated method stub
		if (addInvestmentRepo.existsById(id)) {
			addInvestmentRepo.deleteById(id);
			return true;
		} else {
			return false;
		}
	}

	public int updatePolicyManagement(AddnewinvestmentPM adddnewinvestmentPM) {
		// TODO Auto-generated method stub
		Optional<AddnewinvestmentPM> optional = addInvestmentRepo.findById(adddnewinvestmentPM.getId());

		if (optional.isPresent()) {
			AddnewinvestmentPM company = optional.get();

			company.setPolicyCode(adddnewinvestmentPM.getPolicyCode());
			company.setMemberSelection(adddnewinvestmentPM.getMemberSelection());
			company.setCustomerName(adddnewinvestmentPM.getCustomerName());
			company.setDateofBirth(adddnewinvestmentPM.getDateofBirth());
			company.setRelationDetails(adddnewinvestmentPM.getRelationDetails());
			company.setContactNo(adddnewinvestmentPM.getContactNo());
			company.setSuggestedNominee(adddnewinvestmentPM.getSuggestedNominee());
			company.setRelation(adddnewinvestmentPM.getRelation());
			company.setAddress(adddnewinvestmentPM.getAddress());
			company.setDistrict(adddnewinvestmentPM.getDistrict());
			company.setState(adddnewinvestmentPM.getState());
			company.setPinCode(adddnewinvestmentPM.getPinCode());
			company.setBranchName(adddnewinvestmentPM.getBranchName());
			company.setModeOfOperation(adddnewinvestmentPM.getModeOfOperation());
			company.setMaturityDate(adddnewinvestmentPM.getMaturityDate());
			company.setSchemeType(adddnewinvestmentPM.getSchemeType());
			company.setSchemeTerm(adddnewinvestmentPM.getSchemeTerm());
			company.setSchemeMode(adddnewinvestmentPM.getSchemeMode());
			company.setPolicyAmount(adddnewinvestmentPM.getPolicyAmount());
			company.setDepositAmount(adddnewinvestmentPM.getDepositAmount());
			company.setMaturityAmount(adddnewinvestmentPM.getMaturityAmount());
			company.setPaymentBy(adddnewinvestmentPM.getPaymentBy());
			company.setRemark(adddnewinvestmentPM.getRemark());
			company.setSmsSend(adddnewinvestmentPM.getSmsSend());

			addInvestmentRepo.save(company);
			return 1;
		} else {
			return 0;
		}
	}

	public List<LoanApplication> getApprovedLoanApplications() {
		return loanApplicationRepo.findByApprovalStatusTrue();
	}

	public List<LoanApplication> fetchAllLoanApplication() {
		// TODO Auto-generated method stub
		return loanApplicationRepo.findAll();
	}

	public List<PolicyRenewal> getApprovedPolicyRenewal() {
		// TODO Auto-generated method stub
		return policyRenewalRepo.findByIsApprovedTrue();
	}

	public boolean deleteLoanApplication(Long id) {
		// TODO Auto-generated method stub
		if (loanApplicationRepo.existsById(id)) {
			loanApplicationRepo.deleteById(id);
			return true;
		} else {
			return false;
		}
	}

	public boolean updateLoanApplication(LoanApplication loanapplication) {
		// TODO Auto-generated method stub
		Optional<LoanApplication> optionalExisting = loanApplicationRepo.findById(loanapplication.getId());

		if (optionalExisting.isPresent()) {
			LoanApplication existing = optionalExisting.get();

			// Copy fields manually
			existing.setLoanId(loanapplication.getLoanId());
			existing.setLoanDate(loanapplication.getLoanDate());
			existing.setMemberId(loanapplication.getMemberId());
			existing.setRelativeDetails(loanapplication.getRelativeDetails());
			existing.setDateOfBirth(loanapplication.getDateOfBirth());
			existing.setAge(loanapplication.getAge());
			existing.setContactNo(loanapplication.getContactNo());
			existing.setMessageStatus(loanapplication.getMessageStatus());
			existing.setAddress(loanapplication.getAddress());
			existing.setPinCode(loanapplication.getPinCode());
			existing.setBranchName(loanapplication.getBranchName());
			existing.setLoanPlanName(loanapplication.getLoanPlanName());
			existing.setTypeOfLoan(loanapplication.getTypeOfLoan());
			existing.setLoanMode(loanapplication.getLoanMode());
			existing.setLoanTerm(loanapplication.getLoanTerm());
			existing.setRateOfInterest(loanapplication.getRateOfInterest());
			existing.setLoanAmount(loanapplication.getLoanAmount());
			existing.setInterestType(loanapplication.getInterestType());
			existing.setEmiPayment(loanapplication.getEmiPayment());
			existing.setPurposeOfLoan(loanapplication.getPurposeOfLoan());

			// Guarantor
			existing.setGuarantorMemberId(loanapplication.getGuarantorMemberId());
			existing.setGuarantorIdentity(loanapplication.getGuarantorIdentity());
			existing.setGuarantorAddress(loanapplication.getGuarantorAddress());
			existing.setGuarantorPinCode(loanapplication.getGuarantorPinCode());
			existing.setGuarantorContactNo(loanapplication.getGuarantorContactNo());
			existing.setGuarantorSecurityType(loanapplication.getGuarantorSecurityType());

			// Co-Applicant
			existing.setCoApplicantMemberId(loanapplication.getCoApplicantMemberId());
			existing.setCoApplicantIdentity(loanapplication.getCoApplicantIdentity());
			existing.setCoApplicantAddress(loanapplication.getCoApplicantAddress());
			existing.setCoApplicantPinCode(loanapplication.getCoApplicantPinCode());
			existing.setCoApplicantContactNo(loanapplication.getCoApplicantContactNo());
			existing.setCoApplicantSecurityType(loanapplication.getCoApplicantSecurityType());

			// Deduction
			existing.setProcessingFee(loanapplication.getProcessingFee());
			existing.setLegalCharges(loanapplication.getLegalCharges());
			existing.setGst(loanapplication.getGst());
			existing.setInsuranceFee(loanapplication.getInsuranceFee());
			existing.setValuationFees(loanapplication.getValuationFees());
			existing.setStationaryFee(loanapplication.getStationaryFee());

			// Financial Consultant
			existing.setFinancialConsultantId(loanapplication.getFinancialConsultantId());
			existing.setFinancialConsultantName(loanapplication.getFinancialConsultantName());

			// Approval
			// existing.setApprovalDate(loanapplication.getApprovalDate());
			// existing.setApprovalStatus(loanapplication.getApprovalStatus());

			loanApplicationRepo.save(existing);
			return true;
		} else {
			return false;
		}
	}

//	public Optional<PolicyRenewal> fetchPolicyRenewalByPolicyCode(String policyCode) {
//		// TODO Auto-generated method stub
//		return policyRenewalRepo.findByPolicyCode(policyCode);
//	}

	public List<PolicyRenewal> fetchPolicyRenewalByPolicyCode(String policyCode) {
		// TODO Auto-generated method stub return
		return policyRenewalRepo.findByPolicyCode(policyCode);
	}

//	public Optional<PolicyRenewal> fetchPolicyRenewalByPolicyCode(String policyCode) {
//		// TODO Auto-generated method stub
//		return policyRenewalRepo.findByPolicyCode(policyCode);
//	}

	/*
	 * public Optional<PolicyRenewal> fetchPolicyRenewalByPolicyCode(String
	 * policyCode) { // TODO Auto-generated method stub return
	 * policyRenewalRepo.findByPolicyCode(policyCode); }
	 */

	public boolean deletePolicyRenewalData(Long id) {
		// TODO Auto-generated method stub
		if (policyRenewalRepo.existsById(id)) {
			policyRenewalRepo.deleteById(id);
			return true;
		} else {
			return false;
		}
	}

	public List<DailyPremiumRenewalPM> getApprovedDailyRenewal() {
		// TODO Auto-generated method stub
		return dailyPremiumRenewalRepo.findByIsApprovedTrue();
	}

//	public Optional<DailyPremiumRenewalPM> fetchDailyRenewalByPolicyCode(String policyCode) {
//		// TODO Auto-generated method stub
//		return dailyPremiumRenewalRepo.findByPolicyCode(policyCode);
//	}

	public List<DailyPremiumRenewalPM> fetchDailyRenewalByPolicyCode(String policyCode) {
		// TODO Auto-generated method stub return
		return dailyPremiumRenewalRepo.findByPolicyCode(policyCode);
	}

//	public Optional<DailyPremiumRenewalPM> fetchDailyRenewalByPolicyCode(String policyCode) {
//		// TODO Auto-generated method stub
//		return dailyPremiumRenewalRepo.findByPolicyCode(policyCode);
//	}

	/*
	 * public Optional<DailyPremiumRenewalPM> fetchDailyRenewalByPolicyCode(String
	 * policyCode) { // TODO Auto-generated method stub return
	 * dailyPremiumRenewalRepo.findByPolicyCode(policyCode); }
	 */

	public boolean deleteDailyRenewal(Long id) {
		// TODO Auto-generated method stub
		if (dailyPremiumRenewalRepo.existsById(id)) {
			dailyPremiumRenewalRepo.deleteById(id);
			return true;
		} else {
			return false;
		}
	}

	public List<FlexibleRenewal> getApprovedFlexibleRenewal() {
		// TODO Auto-generated method stub
		return flexibleRenewalRepo.findByIsApprovedTrue();
	}

	public List<FlexibleRenewal> fetchFlexibleRenewalByPolicyCode(String policyCode) {
		// TODO Auto-generated method stub
		return flexibleRenewalRepo.findByPolicyCode(policyCode);
	}

	public boolean deleteFlexibleRenewal(Long id) {
		// TODO Auto-generated method stub
		if (flexibleRenewalRepo.existsById(id)) {
			flexibleRenewalRepo.deleteById(id);
			return true;
		} else {
			return false;
		}
	}

	public int updateCompanyAdministration(LoanApplication loanApplication) {
		// TODO Auto-generated method stub
		Optional<LoanApplication> optional = loanApplicationRepo.findById(loanApplication.getId());

		if (optional.isPresent()) {
			LoanApplication loan = optional.get();

			loan.setLoanId(loanApplication.getLoanId());
			loan.setLoanDate(loanApplication.getLoanDate());
			loan.setMemberId(loanApplication.getMemberId());
			loan.setRelativeDetails(loanApplication.getRelativeDetails());
			loan.setDateOfBirth(loanApplication.getDateOfBirth());
			loan.setAge(loanApplication.getAge());
			loan.setContactNo(loanApplication.getContactNo());
			loan.setAddress(loanApplication.getAddress());
			loan.setPinCode(loanApplication.getPinCode());
			loan.setBranchName(loanApplication.getBranchName());
			loan.setLoanPlanName(loanApplication.getLoanPlanName());
			loan.setTypeOfLoan(loanApplication.getTypeOfLoan());
			loan.setLoanMode(loanApplication.getLoanMode());
			loan.setLoanTerm(loanApplication.getLoanTerm());
			loan.setRateOfInterest(loanApplication.getRateOfInterest());
			loan.setLoanAmount(loanApplication.getLoanAmount());
			loan.setInterestType(loanApplication.getInterestType());
			loan.setEmiPayment(loanApplication.getEmiPayment());
			loan.setPurposeOfLoan(loanApplication.getPurposeOfLoan());
			loan.setMessageStatus(loanApplication.getMessageStatus());

			// Guarantor Details
			loan.setGuarantorMemberId(loanApplication.getGuarantorMemberId());
			loan.setGuarantorIdentity(loanApplication.getGuarantorIdentity());
			loan.setGuarantorAddress(loanApplication.getGuarantorAddress());
			loan.setPinCode(loanApplication.getPinCode());
			loan.setGuarantorContactNo(loanApplication.getGuarantorContactNo());
			loan.setGuarantorSecurityType(loanApplication.getGuarantorSecurityType());

			// CoApplicant Details
			loan.setCoApplicantMemberId(loanApplication.getCoApplicantMemberId());
			loan.setCoApplicantIdentity(loanApplication.getCoApplicantIdentity());
			loan.setCoApplicantAddress(loanApplication.getCoApplicantAddress());
			loan.setCoApplicantPinCode(loanApplication.getCoApplicantPinCode());
			loan.setCoApplicantContactNo(loanApplication.getCoApplicantContactNo());
			loan.setCoApplicantSecurityType(loanApplication.getCoApplicantSecurityType());

			// Deduction Details
			loan.setProcessingFee(loanApplication.getProcessingFee());
			loan.setLegalCharges(loanApplication.getLegalCharges());
			loan.setGst(loanApplication.getGst());
			loan.setInsuranceFee(loanApplication.getInsuranceFee());
			loan.setValuationFees(loanApplication.getValuationFees());
			loan.setStationaryFee(loanApplication.getStationaryFee());
			loan.setFinancialConsultantId(loanApplication.getFinancialConsultantId());
			loan.setFinancialConsultantName(loanApplication.getFinancialConsultantName());

			loanApplicationRepo.save(loan);
			return 1;
		} else {
			return 0;
		}
	}

	public List<ApplyForGroupLoan> getApprovedJointLiability() {
		// TODO Auto-generated method stub
		return applyForGroupLoanRepo.findAll();
	}

	public List<ApplyForGroupLoan> fetchJointLiabilityByGroupCode(String groupCode) {
		// TODO Auto-generated method stub
		return applyForGroupLoanRepo.findByGroupCode(groupCode);
	}

	public int updateJointLiability(ApplyForGroupLoan applyForGroupLoan) {
		// TODO Auto-generated method stub
		Optional<ApplyForGroupLoan> optional = applyForGroupLoanRepo.findById(applyForGroupLoan.getId());

		if (optional.isPresent()) {
			ApplyForGroupLoan group = optional.get();

			group.setGroupCode(applyForGroupLoan.getGroupCode());
			group.setOpeningDate(applyForGroupLoan.getOpeningDate());
			group.setSelectedMember(applyForGroupLoan.getSelectedMember());
			group.setCustomerName(applyForGroupLoan.getCustomerName());
			group.setCommunityName(applyForGroupLoan.getCommunityName());
			group.setAllocatedStaff(applyForGroupLoan.getAllocatedStaff());
			group.setBranchName(applyForGroupLoan.getBranchName());
			group.setCollectionDays(applyForGroupLoan.getCollectionDays());
			group.setCommunityLeader(applyForGroupLoan.getCommunityLeader());
			group.setContactNumber(applyForGroupLoan.getContactNumber());
			group.setLoanPurpose(applyForGroupLoan.getLoanPurpose());
			group.setPlanCode(applyForGroupLoan.getPlanCode());
			group.setLoanSchemeName(applyForGroupLoan.getLoanSchemeName());
			group.setProcessingFee(applyForGroupLoan.getProcessingFee());
			group.setLegalCharges(applyForGroupLoan.getLegalCharges());
			group.setGstPercentage(applyForGroupLoan.getGstPercentage());
			group.setInsuranceFee(applyForGroupLoan.getInsuranceFee());
			group.setValuationFee(applyForGroupLoan.getValuationFee());
			group.setPenaltyMode(applyForGroupLoan.getPenaltyMode());
			group.setMonthlyPenalty(applyForGroupLoan.getMonthlyPenalty());
			group.setEmiFrequency(applyForGroupLoan.getEmiFrequency());
			group.setRateOfInterest(applyForGroupLoan.getRateOfInterest());
			group.setTerm(applyForGroupLoan.getTerm());
			group.setTotalAmount(applyForGroupLoan.getTotalAmount());
			group.setInterestType(applyForGroupLoan.getInterestType());
			group.setEmiType(applyForGroupLoan.getEmiType());
			group.setApprovalDate(applyForGroupLoan.getApprovalDate());

			applyForGroupLoanRepo.save(group);
			return 1;
		} else {
			return 0;
		}
	}

	public boolean deleteJointLiability(Long id) {
		// TODO Auto-generated method stub
		if (applyForGroupLoanRepo.existsById(id)) {
			applyForGroupLoanRepo.deleteById(id);
			return true;
		} else {
			return false;
		}
	}

	public List<LoanApplication> getApprovedLoan() {
		// TODO Auto-generated method stub
		return loanApplicationRepo.findByApprovalStatusTrue();
	}

}
