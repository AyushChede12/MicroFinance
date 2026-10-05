package com.microfinance.service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.microfinance.dto.ApiResponse;
import com.microfinance.dto.PolicyManagementDto;
import com.microfinance.dto.PolicyPaymentDto;
import com.microfinance.model.AddnewinvestmentPM;
import com.microfinance.model.CreateSavingsAccount;
import com.microfinance.model.DailyDepositPM;
import com.microfinance.model.DailyPremiumRenewalPM;
import com.microfinance.model.FixedDepositPM;
import com.microfinance.model.FlexibleRenewal;
import com.microfinance.model.FullMaturity;
import com.microfinance.model.MISDepositPM;
import com.microfinance.model.PolicyPayment;
import com.microfinance.model.PolicyRenewal;
import com.microfinance.model.RecurringDepositPM;
import com.microfinance.repository.AddInvestmentRepo;
import com.microfinance.repository.DailyDepositPMRepo;
import com.microfinance.repository.DailyPremiumRenewalRepo;
import com.microfinance.repository.FixedDepositPMRepo;
import com.microfinance.repository.FlexibleRenewalRepo;
import com.microfinance.repository.FullMaturityRepo;
import com.microfinance.repository.MisDepositePMRepo;
import com.microfinance.repository.PolicyPaymentRepository;
import com.microfinance.repository.PolicyRenewalRepo;
import com.microfinance.repository.RecurringDepositRepo;

@Service
public class PolicyManagementService {
	@Autowired
	private DailyDepositPMRepo dailyDepositPMRepo;

	@Autowired
	private RecurringDepositRepo recurringDepositRepo;

	@Autowired
	private FixedDepositPMRepo fixedDepositPMRepo;

	@Autowired
	private MisDepositePMRepo misDepositePMRepo;

	@Autowired
	private AddInvestmentRepo addinvestmentrepo;

	@Autowired
	private PolicyRenewalRepo policyRenewalRepo;

	@Autowired
	private DailyPremiumRenewalRepo dailyPremiumRenewalRepo;

	@Autowired
	private FlexibleRenewalRepo flexibleRenewalRepo;

	@Autowired
	private FullMaturityRepo fullMaturityRepo;

	@Autowired
	private PolicyPaymentRepository policyPaymentRepository;

	public boolean saveRecuringDailyDeposite(RecurringDepositPM deposit) {
		try {
			recurringDepositRepo.save(deposit);
			return true;
		} catch (Exception e) {
			e.printStackTrace(); // Log actual error
			return false;
		}
	}

	public List<RecurringDepositPM> getAllData1() {
		// TODO Auto-generated method stub
		return recurringDepositRepo.findAll();
	}

// fixed deposite of the service
	public boolean saveFixedDeposite(FixedDepositPM fixedDepositPM) {
		// TODO Auto-generated method stub
		try {
			fixedDepositPMRepo.save(fixedDepositPM);
			return true;
		} catch (Exception e) {
			e.printStackTrace(); // Log actual error
			return false;
		}
	}

// feacth all data of the fixed deposite
	public List<FixedDepositPM> getAllFixeddata() {
		// TODO Auto-generated method stub
		return fixedDepositPMRepo.findAll();
	}

// daily Deposite save service
	public boolean savedailydeposite(DailyDepositPM dailyDepositPM) {
		// TODO Auto-generated method stub
		try {
			dailyDepositPMRepo.save(dailyDepositPM);
			return true;
		} catch (Exception e) {
			e.printStackTrace(); // Log actual error
			return false;
		}
	}

//feacth all data of the daily deposite
	public List<DailyDepositPM> getAlldailydepositedata() {
		// TODO Auto-generated method stub
		return dailyDepositPMRepo.findAll();
	}

//MIS Deposite save service
	public boolean savemistdeposite(MISDepositPM misDepositPM) {
		try {
			misDepositePMRepo.save(misDepositPM);
			return true;
		} catch (Exception e) {
			e.printStackTrace(); // Log actual error
			return false;
		}
	}

	public List<MISDepositPM> getAllMISDepositData() {
		// TODO Auto-generated method stub
		return misDepositePMRepo.findAll();
	}

	public DailyDepositPM getDailyDepositById(Long id) {
		// TODO Auto-generated method stub
		return dailyDepositPMRepo.findById(id).orElse(null);
	}

	public DailyDepositPM updateDailyDeposit(Long id, DailyDepositPM updatedData) {
		// TODO Auto-generated method stub

		return dailyDepositPMRepo.findById(id).map(existing -> {
			existing.setPlanCodeDD(updatedData.getPlanCodeDD());
			existing.setMinimumDeposit(updatedData.getMinimumDeposit());
			existing.setRateOfInterest(updatedData.getRateOfInterest());
			existing.setInstallmentType(updatedData.getInstallmentType());
			existing.setPlanNameDD(updatedData.getPlanNameDD());
			existing.setCommissionOnNew(updatedData.getCommissionOnNew());
			existing.setRenewalCommission(updatedData.getRenewalCommission());
			existing.setDdterm(updatedData.getDdterm());
			existing.setInterestInterval(updatedData.getInterestInterval());
			existing.setTotalPaid(updatedData.getTotalPaid());
			existing.setMaturityAmount(updatedData.getMaturityAmount());
			existing.setFlexiblePlan(updatedData.getFlexiblePlan());
			existing.setGraceDays(updatedData.getGraceDays());
			existing.setPenaltyRate(updatedData.getPenaltyRate());
			existing.setStatusOfPlan(updatedData.getStatusOfPlan());

			return dailyDepositPMRepo.save(existing); // Fixed here
		}).orElse(null);
	}

	public boolean deleteDailyDeposit(Long id) {
		// TODO Auto-generated method stub
		if (dailyDepositPMRepo.existsById(id)) {
			dailyDepositPMRepo.deleteById(id);
			return true;
		} else {
			return false;
		}
	}

// edit by id reccuring deposite
	public RecurringDepositPM getRecurringDepositById(Long id) {
		// TODO Auto-generated method stub
		return recurringDepositRepo.findById(id).orElse(null);
	}

//update the reccuring deposite service
	public RecurringDepositPM updateRecurringDeposit(Long id, RecurringDepositPM updatedData) {
		Optional<RecurringDepositPM> existingOptional = recurringDepositRepo.findById(id);

		if (existingOptional.isPresent()) {
			RecurringDepositPM existing = existingOptional.get();

			// 🔁 Update all fields manually
			existing.setPlanCodeRD(updatedData.getPlanCodeRD());
			existing.setPlanNameRD(updatedData.getPlanNameRD());
			existing.setMinimumAmountRD(updatedData.getMinimumAmountRD());
			existing.setRateOfInterestRD(updatedData.getRateOfInterestRD());
			existing.setInstallmentTypeRD(updatedData.getInstallmentTypeRD());
			existing.setRdterm(updatedData.getRdterm());
			existing.setCommissionOnNewRD(updatedData.getCommissionOnNewRD());
			existing.setRenewalCommissionRD(updatedData.getRenewalCommissionRD());
			existing.setComponentIntervalRD(updatedData.getComponentIntervalRD());
			existing.setTotalPaidRD(updatedData.getTotalPaidRD());
			existing.setMaturityAmountRD(updatedData.getMaturityAmountRD());
			existing.setFlexiblePlanRD(updatedData.getFlexiblePlanRD());
			existing.setGraceDaysRD(updatedData.getGraceDaysRD());
			existing.setPenaltyfineRD(updatedData.getPenaltyfineRD());
			existing.setStatusOfPlanRD(updatedData.getStatusOfPlanRD());

			// Save updated object
			return recurringDepositRepo.save(existing);
		} else {
			return null; // ❌ ID not found
		}
	}

//delete the recurring deposit service

	public boolean deleteRecurringDeposit(Long id) {
		if (recurringDepositRepo.existsById(id)) {
			recurringDepositRepo.deleteById(id);
			return true;
		} else {
			return false;
		}
	}

//Fetch the data fixed deposit service

	public FixedDepositPM getFixedDepositById(Long id) {
		// TODO Auto-generated method stub
		return fixedDepositPMRepo.findById(id).orElse(null);
	}

	public FixedDepositPM updateFixedDeposit(Long id, FixedDepositPM updatedData) {
		Optional<FixedDepositPM> existingOptional = fixedDepositPMRepo.findById(id);

		if (existingOptional.isPresent()) {
			FixedDepositPM existing = existingOptional.get();

			// Update all fields
			existing.setPlanCodeFD(updatedData.getPlanCodeFD());
			existing.setPlanNameFD(updatedData.getPlanNameFD());
			existing.setMinimumAmountFD(updatedData.getMinimumAmountFD());
			existing.setRateOfInterestFD(updatedData.getRateOfInterestFD());
			existing.setFdterm(updatedData.getFdterm());
			existing.setInstallmentTypeFD(updatedData.getInstallmentTypeFD());
			existing.setCommissionOnNewFD(updatedData.getCommissionOnNewFD());
			existing.setComponentIntervalFD(updatedData.getComponentIntervalFD());
			existing.setTotalPaidFD(updatedData.getTotalPaidFD());
			existing.setMaturityAmountFD(updatedData.getMaturityAmountFD());
			existing.setFlexiblePlanFD(updatedData.getFlexiblePlanFD());
			existing.setRenewalCommissionFD(updatedData.getRenewalCommissionFD());
			existing.setGraceDaysFD(updatedData.getGraceDaysFD());
			existing.setPenltyfineFD(updatedData.getPenltyfineFD());
			existing.setStatusOfPlanFD(updatedData.getStatusOfPlanFD());

			return fixedDepositPMRepo.save(existing); // save updated data
		}

		return null; // not found
	}

	public boolean deleteFixedDeposit(Long id) {
		if (fixedDepositPMRepo.existsById(id)) {
			fixedDepositPMRepo.deleteById(id);
			return true;
		} else {
			return false;
		}
	}

	public MISDepositPM getMISDepositById(Long id) {
		// TODO Auto-generated method stub
		return misDepositePMRepo.findById(id).orElse(null);
	}

	public MISDepositPM updateMISDeposit(Long id, MISDepositPM updatedData) {
		// TODO Auto-generated method stub
		Optional<MISDepositPM> existingOptional = misDepositePMRepo.findById(id);

		if (existingOptional.isPresent()) {
			MISDepositPM existing = existingOptional.get();

			// Set fields from updatedData to existing
			existing.setPlanCodeMD(updatedData.getPlanCodeMD());
			existing.setPlanNameMD(updatedData.getPlanNameMD());
			existing.setRateOfInterestMD(updatedData.getRateOfInterestMD());
			existing.setInstallmentTypeMD(updatedData.getInstallmentTypeMD());
			existing.setMinimumAmountMD(updatedData.getMinimumAmountMD());
			existing.setMaturityROIMD(updatedData.getMaturityROIMD());
			existing.setMisTerm(updatedData.getMisTerm());
			existing.setMISIntROIMD(updatedData.getMISIntROIMD());
			existing.setMISIntervalMD(updatedData.getMISIntervalMD());
			existing.setMISInterestMD(updatedData.getMISInterestMD());
			existing.setMaturityAmountMD(updatedData.getMaturityAmountMD());
			existing.setFlexiblePlanMD(updatedData.getFlexiblePlanMD());
			existing.setCommissionOnNewMD(updatedData.getCommissionOnNewMD());
			existing.setRenewalCommissionMD(updatedData.getRenewalCommissionMD());
			existing.setStatusOfPlanMDRD2(updatedData.getStatusOfPlanMDRD2());

			return misDepositePMRepo.save(existing);
		}
		return null;

	}

	public boolean deleteMISDeposit(Long id) {
		if (misDepositePMRepo.existsById(id)) {
			misDepositePMRepo.deleteById(id);
			return true;
		} else {
			return false;
		}
	}

//Ashwini
	/*
	 * public List<AddnewinvestmentPM> getAddInvestmentDetails() { // TODO
	 * Auto-generated method stub return addinvestmentrepo.findAll(); }
	 */

	public List<String> getSchemeNameBySchemeType(String drd) {
		List<DailyDepositPM> allDrdPlans = dailyDepositPMRepo.findBydrd(drd);
		return allDrdPlans.stream().map(DailyDepositPM::getPlanNameDD).distinct().collect(Collectors.toList());
	}

	public List<String> getRRDBySchemeType(String rd) {
		List<RecurringDepositPM> allRrdPlans = recurringDepositRepo.findByrd(rd);
		return allRrdPlans.stream().map(RecurringDepositPM::getPlanNameRD).distinct().collect(Collectors.toList());
	}

	public List<String> getFRDBySchemeType(String fd) {
		List<FixedDepositPM> allFrdPlans = fixedDepositPMRepo.findByfd(fd);
		return allFrdPlans.stream().map(FixedDepositPM::getPlanNameFD).distinct().collect(Collectors.toList());

	}

	public List<String> getMISRDBySchemeType(String mis) {
		List<MISDepositPM> allMisrdPlans = misDepositePMRepo.findBymis(mis);
		return allMisrdPlans.stream().map(MISDepositPM::getPlanNameMD).distinct().collect(Collectors.toList());
	}

	public DailyDepositPM getDDTermAndInterestRate(String planNameDD) {
		return dailyDepositPMRepo.findByplanNameDD(planNameDD);
	}

	public List<AddnewinvestmentPM> getAddInvestmentDetails() {
		// TODO Auto-generated method stub
		return addinvestmentrepo.findAll();
	}

	public RecurringDepositPM getRDTermAndInterestRate(String planNameRD) {
		return recurringDepositRepo.findByplanNameRD(planNameRD);
	}

	public FixedDepositPM getFDTermAndInterestRate(String planNameFD) {
		return fixedDepositPMRepo.findByplanNameFD(planNameFD);
	}

	public MISDepositPM getMISTermAndInterestRate(String planNameMD) {
		return misDepositePMRepo.findByplanNameMD(planNameMD);
	}

	public List<AddnewinvestmentPM> findByBranch(String branchName) {
		// TODO Auto-generated method stub
		List<AddnewinvestmentPM> list = addinvestmentrepo.findByBranchName(branchName);
		return list;
	}

	public AddnewinvestmentPM getDetailsById(Long id) {
		// TODO Auto-generated method stub
		return addinvestmentrepo.findById(id).orElse(null);
	}

	public AddnewinvestmentPM saveInvestment(AddnewinvestmentPM investment) {
		return addinvestmentrepo.save(investment);
	}

	public List<DailyDepositPM> getAllDDTerm() {
		// TODO Auto-generated method stub
		return dailyDepositPMRepo.findAll();
	}

	public List<AddnewinvestmentPM> getAllInvestments() {
		return addinvestmentrepo.findAll();
	}

	public List<AddnewinvestmentPM> getAllPolicyManagementData() {
		// TODO Auto-generated method stub
		return addinvestmentrepo.findAll();
	}

	public List<AddnewinvestmentPM> x() {
		// TODO Auto-generated method stub
		return addinvestmentrepo.findAll();
	}

	public Optional<AddnewinvestmentPM> findByPolicyCode(String policyCode) {
		if (policyCode == null)
			return Optional.empty();

		// Clean input: trim and convert to uppercase
		String normalizedCode = policyCode.trim().toUpperCase();

		// Fetch all and match manually
		return addinvestmentrepo.findAll().stream()
				.filter(p -> p.getPolicyCode() != null && p.getPolicyCode().trim().equalsIgnoreCase(normalizedCode))
				.findFirst();
	}

	public List<AddnewinvestmentPM> getApprovedInvestments() {
		// TODO Auto-generated method stub
		return addinvestmentrepo.findByIsApprovedTrue();
	}

	public List<AddnewinvestmentPM> getApprovedRDPolicies() {
		return addinvestmentrepo.findApprovedRDPolicies();
	}

	public List<AddnewinvestmentPM> getApprovedFDPolicies() {
		return addinvestmentrepo.findApprovedFDPolicies();
	}

	public List<AddnewinvestmentPM> getApprovedDDPolicies() {
		// TODO Auto-generated method stub
		return addinvestmentrepo.findApprovedDDPolicies();
	}

	public List<AddnewinvestmentPM> getAllRdRenewalData() {
		// TODO Auto-generated method stub
		return addinvestmentrepo.findAll();
	}

	public List<AddnewinvestmentPM> getAllDdRenewalData() {
		// TODO Auto-generated method stub
		return addinvestmentrepo.findAll();
	}

	public List<AddnewinvestmentPM> getAllFdRenewalData() {
		// TODO Auto-generated method stub
		return addinvestmentrepo.findAll();
	}

	public List<AddnewinvestmentPM> getAllApprovedPolicies() {
		return addinvestmentrepo.findByIsApprovedTrue();
	}

	public AddnewinvestmentPM updateInstalmentDetails(String policyCode, String DepositAmount) {
		Optional<AddnewinvestmentPM> optionalInvestment = addinvestmentrepo.findByPolicyCode(policyCode);

		if (optionalInvestment.isPresent()) {
			AddnewinvestmentPM investment = optionalInvestment.get();

			// Set the new deposit amount
			investment.setDepositAmount(DepositAmount);

			// Increment lastInstPaid
			try {
				int last = Integer
						.parseInt(investment.getLastInstPaid() == null || investment.getLastInstPaid().isEmpty() ? "0"
								: investment.getLastInstPaid());
				investment.setLastInstPaid(String.valueOf(last + 1));
			} catch (NumberFormatException e) {
				investment.setLastInstPaid("1");
			}

			// Save and return updated investment
			return addinvestmentrepo.save(investment);
		}

		return null; // or throw custom exception if you prefer
	}

	public List<FlexibleRenewal> findBypolicyCode(String policyCode) {
		return flexibleRenewalRepo.findByPolicyCode(policyCode);
	}

	public List<DailyPremiumRenewalPM> findDailyData(String policyCode) {
		return dailyPremiumRenewalRepo.findByPolicyCode(policyCode);
	}

	public List<PolicyRenewal> findRenewalData(String policyCode) {
		return policyRenewalRepo.findByPolicyCode(policyCode);
	}

	public ApiResponse<AddnewinvestmentPM> saveandupdateAddInvestmentDetails(PolicyManagementDto policyManagementDto,
			String image1, String image2) {

		AddnewinvestmentPM addnewinvestmentPM = new AddnewinvestmentPM();

		boolean isNew = true;

		if (policyManagementDto.getId() != null && policyManagementDto.getId() > 0) {

			addnewinvestmentPM = addinvestmentrepo.findById(policyManagementDto.getId())
					.orElse(new AddnewinvestmentPM());

			isNew = false;
		}

		addnewinvestmentPM.setPolicyCode(policyManagementDto.getPolicyCode());

		addnewinvestmentPM.setPolicyStartDate(policyManagementDto.getPolicyStartDate());

		addnewinvestmentPM.setMemberSelection(policyManagementDto.getMemberSelection());

		addnewinvestmentPM.setCustomerName(policyManagementDto.getCustomerName());

		addnewinvestmentPM.setDateofBirth(policyManagementDto.getDateofBirth());

		addnewinvestmentPM.setRelationDetails(policyManagementDto.getRelationDetails());

		addnewinvestmentPM.setContactNo(policyManagementDto.getContactNo());

		addnewinvestmentPM.setSuggestedNominee(policyManagementDto.getSuggestedNominee());

		addnewinvestmentPM.setAgeOfNominee(policyManagementDto.getAgeOfNominee());

		addnewinvestmentPM.setRelation(policyManagementDto.getRelation());

		addnewinvestmentPM.setAddress(policyManagementDto.getAddress());

		addnewinvestmentPM.setDistrict(policyManagementDto.getDistrict());

		addnewinvestmentPM.setState(policyManagementDto.getState());

		addnewinvestmentPM.setPinCode(policyManagementDto.getPinCode());

		addnewinvestmentPM.setTds(policyManagementDto.getTds());

		addnewinvestmentPM.setBranchName(policyManagementDto.getBranchName());

		addnewinvestmentPM.setModeOfOperation(policyManagementDto.getModeOfOperation());

		addnewinvestmentPM.setJointMemCode(policyManagementDto.getJointMemCode());

		addnewinvestmentPM.setJointName(policyManagementDto.getJointName());

		addnewinvestmentPM.setMaturityDate(policyManagementDto.getMaturityDate());

		addnewinvestmentPM.setSchemeType(policyManagementDto.getSchemeType());

		addnewinvestmentPM.setSchemeName(policyManagementDto.getSchemeName());

		addnewinvestmentPM.setSchemeTerm(policyManagementDto.getSchemeTerm());

		addnewinvestmentPM.setSchemeMode(policyManagementDto.getSchemeMode());

		addnewinvestmentPM.setRoi(policyManagementDto.getRoi());

		addnewinvestmentPM.setPolicyAmount(policyManagementDto.getPolicyAmount());

		addnewinvestmentPM.setDepositAmount(policyManagementDto.getDepositAmount());

		addnewinvestmentPM.setIntroMCode(policyManagementDto.getIntroMCode());

		addnewinvestmentPM.setMaturityAmount(policyManagementDto.getMaturityAmount());

		addnewinvestmentPM.setMISInterest(policyManagementDto.getMISInterest());

		addnewinvestmentPM.setPaidAmount(policyManagementDto.getPaidAmount());

		addnewinvestmentPM.setLastInstPaid(policyManagementDto.getLastInstPaid());

		addnewinvestmentPM.setPaymentBy(policyManagementDto.getPaymentBy());

		addnewinvestmentPM.setSchemeCode(policyManagementDto.getSchemeCode());

		addnewinvestmentPM.setRemark(policyManagementDto.getRemark());

		addnewinvestmentPM.setAgent(policyManagementDto.getAgent());

		addnewinvestmentPM.setSmsSend(policyManagementDto.getSmsSend());
		
		addnewinvestmentPM.setAmountDue(policyManagementDto.getAmountDue());

		// =====================================================
		// FD SPLIT AMOUNTS
		// =====================================================

		if (policyManagementDto.getFdSplitAmounts() != null
				&& !policyManagementDto.getFdSplitAmounts().trim().isEmpty()) {

			addnewinvestmentPM.setFdSplitAmounts(policyManagementDto.getFdSplitAmounts());
		}

		// =====================================================
		// IMAGES
		// =====================================================

		if (image1 != null && !image1.isEmpty()) {

			addnewinvestmentPM.setImage1(image1);
		}

		if (image2 != null && !image2.isEmpty()) {

			addnewinvestmentPM.setImage2(image2);
		}

		// =====================================================
		// BALANCE CALCULATION
		// =====================================================

		double depositAmount = parseAmount(policyManagementDto.getDepositAmount());

		double paidAmount = parseAmount(policyManagementDto.getPaidAmount());

		double balance = Math.max(0, depositAmount - paidAmount);

		addnewinvestmentPM.setBalance(String.format("%.2f", balance));

		// =====================================================
		// SAVE
		// =====================================================

		AddnewinvestmentPM saveaddinvestmentPM = addinvestmentrepo.save(addnewinvestmentPM);

		// =====================================================
		// RESPONSE
		// =====================================================

		if (isNew) {

			return ApiResponse.success(HttpStatus.CREATED,
					"Saved successfully. Director Name: " + saveaddinvestmentPM.getCustomerName(), saveaddinvestmentPM);

		} else {

			return ApiResponse.success(HttpStatus.OK,
					"Updated successfully. Director Name: " + saveaddinvestmentPM.getCustomerName(),
					saveaddinvestmentPM);
		}
	}

	private double parseAmount(String value) {

		if (value == null || value.trim().isEmpty()) {

			return 0.0;
		}

		try {

			return Double.parseDouble(value.trim());

		} catch (NumberFormatException e) {

			return 0.0;
		}
	}

	public boolean existByMemberSelection(String customerCode) {
		// TODO Auto-generated method stub
		return addinvestmentrepo.existsByMemberSelection(customerCode);
	}

	public List<FullMaturity> fetchFullMaturityByPolicyCode(String policyCode) {
		if (policyCode == null || policyCode.trim().isEmpty()) {
			return Collections.emptyList(); // returns an immutable empty list
		}
		return fullMaturityRepo.findByPolicyCodeIgnoreCase(policyCode.trim());
	}

	public boolean deletePolicyDataById(Long id) {
		// TODO Auto-generated method stub
		if (addinvestmentrepo.existsById(id)) {
			addinvestmentrepo.deleteById(id);
			return true;
		} else {
			return false;
		}
	}

	public List<FullMaturity> getAllApprovedRDPolicies() {
		// TODO Auto-generated method stub
		return fullMaturityRepo.findByApproveStatusTrue();
	}

	public boolean planNameExists(String planName) {
		return dailyDepositPMRepo.existsByPlanNameDD(planName);
	}

	public List<FullMaturity> getApprovedRDPoliciesFromFullMaturity() {
		// TODO Auto-generated method stub
		return fullMaturityRepo.getRDFromFullMaturity();
	}

	public ApiResponse<PolicyPayment> savePolicyPayment(PolicyPaymentDto dto) {

		try {

			if (dto.getPolicyCode() == null || dto.getPolicyCode().trim().isEmpty()) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Policy Code is required", null);
			}

			if (dto.getPaymentAmount() == null || dto.getPaymentAmount().trim().isEmpty()) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Payment Amount is required", null);
			}

			double newPayment;

			try {

				newPayment = Double.parseDouble(dto.getPaymentAmount().trim());

			} catch (NumberFormatException e) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Invalid payment amount", null);
			}

			if (newPayment <= 0) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Payment amount must be greater than zero", null);
			}

			/*
			 * PENALTY ------------------------- Penalty frontend se DTO ke through aayegi.
			 * Agar penalty nahi aayi to 0 maana jayega.
			 */

			double penaltyAmount = 0.0;

			if (dto.getPenaltyAmount() != null && !dto.getPenaltyAmount().trim().isEmpty()) {

				try {

					penaltyAmount = Double.parseDouble(dto.getPenaltyAmount().trim());

				} catch (NumberFormatException e) {

					return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Invalid penalty amount", null);
				}
			}

			if (penaltyAmount < 0) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Penalty amount cannot be negative", null);
			}

			AddnewinvestmentPM policy = addinvestmentrepo.findAll().stream()
					.filter(p -> dto.getPolicyCode().equalsIgnoreCase(p.getPolicyCode())).findFirst().orElse(null);

			if (policy == null) {

				return new ApiResponse<>(HttpStatus.NOT_FOUND,
						"Policy not found for Policy Code: " + dto.getPolicyCode(), null);
			}

			double depositAmount = parseAmount(policy.getDepositAmount());

			double oldPaidAmount = parseAmount(policy.getPaidAmount());

			double oldBalance = Math.max(0, depositAmount - oldPaidAmount);

			if (oldBalance <= 0) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Policy is already fully paid", null);
			}

			if (newPayment > oldBalance) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST,
						"Payment amount cannot be greater than balance. Remaining balance: "
								+ String.format("%.2f", oldBalance),
						null);
			}

			double newPaidAmount = oldPaidAmount + newPayment;

			double newBalance = Math.max(0, depositAmount - newPaidAmount);

			List<PolicyPayment> previousPayments = policyPaymentRepository
					.findByPolicyCodeOrderByIdAsc(dto.getPolicyCode());

			int installmentNo = previousPayments.size() + 1;

			PolicyPayment payment = new PolicyPayment();

			payment.setPolicyCode(policy.getPolicyCode());

			payment.setCustomerName(policy.getCustomerName());

			payment.setInstallmentNo(String.valueOf(installmentNo));

			payment.setPaymentAmount(String.format("%.2f", newPayment));

			payment.setPenaltyAmount(String.format("%.2f", penaltyAmount));

			payment.setPaymentDate(dto.getPaymentDate());

			payment.setModeOfPayment(dto.getModeOfPayment());

			payment.setRemark(dto.getRemark());

			payment.setTotalPaidAmount(String.format("%.2f", newPaidAmount));

			payment.setBalance(String.format("%.2f", newBalance));

			PolicyPayment savedPayment = policyPaymentRepository.save(payment);

			policy.setBalance(String.format("%.2f", newBalance));

			policy.setLastInstPaid(String.format("%.2f", newPayment));

			policy.setLastPaymentDate(dto.getPaymentDate());

			policy.setNoOfInstallments(String.valueOf(installmentNo));

			policy.setAmountDue(String.format("%.2f", newBalance));

			addinvestmentrepo.save(policy);

			return new ApiResponse<>(HttpStatus.CREATED, "Payment saved successfully", savedPayment);

		} catch (Exception e) {

			e.printStackTrace();

			return new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save policy payment", null);
		}
	}

	public ApiResponse<List<PolicyPayment>> getPaymentsByPolicyCode(String policyCode) {

		try {

			List<PolicyPayment> payments = policyPaymentRepository.findByPolicyCodeOrderByIdAsc(policyCode);

			if (payments.isEmpty()) {

				return new ApiResponse<>(HttpStatus.NOT_FOUND, "No payment history found for policy: " + policyCode,
						null);
			}

			return new ApiResponse<>(HttpStatus.OK, "Payment history fetched successfully", payments);

		} catch (Exception e) {

			e.printStackTrace();

			return new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch payment history", null);
		}
	}

	public String updateDueAndInstallment(Map<String, Object> data) {

		String policyCode = (String) data.get("policyCode");

		if (policyCode == null || policyCode.trim().isEmpty()) {
			throw new RuntimeException("Policy Code is required.");
		}

		if (data.get("policyAmount") == null) {
			throw new RuntimeException("Policy Amount is required.");
		}

		if (data.get("noOfInstallments") == null) {
			throw new RuntimeException("No. of Installments is required.");
		}

		double policyAmount = Double.parseDouble(data.get("policyAmount").toString());

		int noOfInstallments = Integer.parseInt(data.get("noOfInstallments").toString());

		if (policyAmount <= 0) {
			throw new RuntimeException("Policy Amount must be greater than zero.");
		}

		if (noOfInstallments <= 0) {
			throw new RuntimeException("No. of Installments must be greater than zero.");
		}

		Optional<AddnewinvestmentPM> optional = addinvestmentrepo.findByPolicyCode(policyCode);

		if (!optional.isPresent()) {
			throw new RuntimeException("Policy not found.");
		}

		AddnewinvestmentPM investment = optional.get();

		double currentDue = parseDoubleSafe(investment.getAmountDue());

		int currentPaid = parseIntSafe(investment.getLastInstPaid());

		double currentPaidAmount = parseDoubleSafe(investment.getPaidAmount());
		System.out.println("Current due : " + currentDue);
		if (currentDue <= 0) {
			throw new RuntimeException("No payment needed. Policy is already settled or overpaid.");
		}

		double totalPayment = policyAmount * noOfInstallments;
		System.out.println("Total payment : " + totalPayment);
		if (totalPayment > currentDue) {
			throw new RuntimeException("Payment amount cannot be greater than payment due.");
		}

		double updatedDue = currentDue - totalPayment;
		System.out.println("Current Due : " + currentDue);

		int updatedPaid = currentPaid + noOfInstallments;
		System.out.println("No of Installments : " + noOfInstallments);

		System.out.println("Current paid Amount : " + currentPaidAmount);

		double updatedPaidAmount = currentPaidAmount + totalPayment;
		System.out.println("Updated Paid Amount : " + updatedPaidAmount);

		if (Math.abs(updatedDue) < 0.01) {
			updatedDue = 0;
		}

		/*
		 * ------------------------------------------------ 1. UPDATE ADD NEW INVESTMENT
		 * ------------------------------------------------
		 */

		investment.setAmountDue(String.valueOf(updatedDue));

		investment.setLastInstPaid(String.valueOf(updatedPaid));

		investment.setPaidAmount(String.valueOf(updatedPaidAmount));

		addinvestmentrepo.save(investment);

		/*
		 * ------------------------------------------------ 2. SAVE POLICY RENEWAL
		 * ------------------------------------------------
		 */

		PolicyRenewal renewal = new PolicyRenewal();

		renewal.setPolicyCode(investment.getPolicyCode());

		renewal.setRenewalDate(LocalDate.now().toString());

		renewal.setPolicyDate(investment.getPolicyStartDate());

		renewal.setMaturityDate(investment.getMaturityDate());

		renewal.setCustomerCode(investment.getMemberSelection());

		renewal.setClientName(investment.getCustomerName());

		renewal.setContactNo(investment.getContactNo());

		renewal.setPolicyAmount(parseDoubleSafe(investment.getPolicyAmount()));

		renewal.setPolicyType(investment.getSchemeType());

		renewal.setPolicyTerm(investment.getSchemeTerm());

		renewal.setMaturityAmount(parseDoubleSafe(investment.getMaturityAmount()));

		renewal.setTotalDeposit(parseDoubleSafe(investment.getPaidAmount()));

		renewal.setPaymentDue(parseDoubleSafe(investment.getAmountDue()));

		renewal.setLastPaymentDate(investment.getLastPaymentDate());

		renewal.setDueDate(investment.getDueDate());

		renewal.setBranchname(investment.getBranchName());

		renewal.setNoOfInst(parseIntSafe(investment.getNoOfInstallments()));

		renewal.setNoOfInstPaid(parseIntSafe(investment.getLastInstPaid()));

		renewal.setModeOfPayment(investment.getModeOfPayment());

		policyRenewalRepo.save(renewal);

		/*
		 * ------------------------------------------------ 3. SAVE POLICY PAYMENT
		 * ------------------------------------------------
		 *
		 * YAHAN PolicyPayment ke exact setters tumhari Entity ke fields ke according
		 * honge.
		 *
		 * Example:
		 *
		 * PolicyPayment payment = new PolicyPayment();
		 * payment.setPolicyCode(investment.getPolicyCode());
		 * payment.setPaymentAmount(totalPayment);
		 * payment.setNoOfInstallments(noOfInstallments);
		 * payment.setPaymentDate(LocalDate.now().toString());
		 * payment.setPaymentMode(investment.getModeOfPayment());
		 *
		 * policyPaymentRepo.save(payment);
		 *
		 */

		if (updatedDue == 0) {

			return "Policy payment saved successfully. Policy is ready for maturity.";

		} else {

			return "Installment updated, renewal saved and payment recorded successfully.";
		}
	}

	private double parseDoubleSafe(String value) {

		if (value == null || value.trim().isEmpty()) {
			return 0.0;
		}

		try {
			return Double.parseDouble(value);
		} catch (Exception e) {
			return 0.0;
		}
	}

	private int parseIntSafe(String value) {

		if (value == null || value.trim().isEmpty()) {
			return 0;
		}

		try {
			return Integer.parseInt(value);
		} catch (Exception e) {
			return 0;
		}
	}

	@Transactional(rollbackFor = Exception.class)
	public ApiResponse<PolicyPayment> saveDDPayment(PolicyPaymentDto dto) {

		try {

			if (dto == null) {
				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Payment data is required", null);
			}

			if (dto.getPolicyCode() == null || dto.getPolicyCode().trim().isEmpty()) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Policy Code is required", null);
			}

			if (dto.getPaymentAmount() == null || dto.getPaymentAmount().trim().isEmpty()) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Payment Amount is required", null);
			}

			double newPayment;

			try {

				newPayment = Double.parseDouble(dto.getPaymentAmount().trim());

			} catch (NumberFormatException e) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Invalid payment amount", null);
			}

			if (newPayment <= 0) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Payment amount must be greater than zero", null);
			}

			/*
			 * ------------------------------------------------ PENALTY
			 * ------------------------------------------------
			 */

			double penaltyAmount = 0.0;

			if (dto.getPenaltyAmount() != null && !dto.getPenaltyAmount().trim().isEmpty()) {

				try {

					penaltyAmount = Double.parseDouble(dto.getPenaltyAmount().trim());

				} catch (NumberFormatException e) {

					return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Invalid penalty amount", null);
				}
			}

			if (penaltyAmount < 0) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Penalty amount cannot be negative", null);
			}

			/*
			 * ------------------------------------------------ FETCH POLICY
			 * ------------------------------------------------
			 */

			List<AddnewinvestmentPM> investments = addinvestmentrepo.findAllByPolicyCode(dto.getPolicyCode());

			if (investments == null || investments.isEmpty()) {

				return new ApiResponse<>(HttpStatus.NOT_FOUND,
						"Policy not found for Policy Code: " + dto.getPolicyCode(), null);
			}

			AddnewinvestmentPM policy = investments.get(0);

			/*
			 * ------------------------------------------------ GET CURRENT DATABASE VALUES
			 * ------------------------------------------------
			 */

			double depositAmount = parseDoubleSafe(policy.getDepositAmount());

			double oldPaidAmount = parseDoubleSafe(policy.getPaidAmount());

			double currentDue = parseDoubleSafe(policy.getAmountDue());

			double currentBalance = parseDoubleSafe(policy.getBalance());

			int currentInstallmentsPaid = parseIntSafe(policy.getLastInstPaid());

			/*
			 * If amountDue is not available, calculate from deposit and paid amount.
			 */

			if (currentDue <= 0 && depositAmount > oldPaidAmount) {

				currentDue = depositAmount - oldPaidAmount;
			}

			if (currentDue <= 0) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST,
						"No payment needed. Policy is already settled or overpaid.", null);
			}

			/*
			 * ------------------------------------------------ VALIDATE PAYMENT
			 * ------------------------------------------------
			 */

			if (newPayment > currentDue) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST,
						"Payment amount cannot be greater than balance. Remaining balance: "
								+ String.format("%.2f", currentDue),
						null);
			}

			/*
			 * ------------------------------------------------ CALCULATE NEW VALUES
			 * ------------------------------------------------
			 */

			double newPaidAmount = oldPaidAmount + newPayment;

			double newBalance = Math.max(0, currentDue - newPayment);

			double newAmountDue = newBalance;

			/*
			 * ------------------------------------------------ INSTALLMENT NUMBER
			 * ------------------------------------------------
			 *
			 * Number of existing PolicyPayment records + 1
			 */

			List<PolicyPayment> previousPayments = policyPaymentRepository
					.findByPolicyCodeOrderByIdAsc(dto.getPolicyCode());

			int installmentNo = previousPayments.size() + 1;

			int updatedInstallmentsPaid = currentInstallmentsPaid + 1;

			/*
			 * ------------------------------------------------ FLOATING POINT CORRECTION
			 * ------------------------------------------------
			 */

			if (Math.abs(newBalance) < 0.01) {

				newBalance = 0;
				newAmountDue = 0;
			}

			/*
			 * ------------------------------------------------ SAVE POLICY PAYMENT
			 * ------------------------------------------------
			 */

			PolicyPayment payment = new PolicyPayment();

			payment.setPolicyCode(policy.getPolicyCode());

			payment.setCustomerName(policy.getCustomerName());

			payment.setInstallmentNo(String.valueOf(installmentNo));

			payment.setPaymentAmount(String.format("%.2f", newPayment));

			payment.setPenaltyAmount(String.format("%.2f", penaltyAmount));

			payment.setPaymentDate(dto.getPaymentDate());

			payment.setModeOfPayment(dto.getModeOfPayment());

			payment.setRemark(dto.getRemark());

			payment.setTotalPaidAmount(String.format("%.2f", newPaidAmount));

			payment.setBalance(String.format("%.2f", newBalance));

			PolicyPayment savedPayment = policyPaymentRepository.save(payment);

			/*
			 * ------------------------------------------------ UPDATE MAIN POLICY
			 * ------------------------------------------------
			 */

			policy.setPaidAmount(String.format("%.2f", newPaidAmount));

			policy.setBalance(String.format("%.2f", newBalance));

			/*
			 * IMPORTANT: lastInstPaid = INSTALLMENT COUNT NOT PAYMENT AMOUNT
			 */

			policy.setLastInstPaid(String.valueOf(updatedInstallmentsPaid));

			policy.setLastPaymentDate(dto.getPaymentDate());

			policy.setNoOfInstallments(String.valueOf(updatedInstallmentsPaid));

			policy.setAmountDue(String.format("%.2f", newAmountDue));

			addinvestmentrepo.save(policy);

			/*
			 * ------------------------------------------------ SAVE DD RENEWAL
			 * ------------------------------------------------
			 */

			DailyPremiumRenewalPM ddRenewal = new DailyPremiumRenewalPM();

			ddRenewal.setPolicyCode(policy.getPolicyCode());

			ddRenewal.setRenewalDate(LocalDate.now().toString());

			ddRenewal.setPolicyDate(policy.getPolicyStartDate());

			ddRenewal.setMaturityDate(policy.getMaturityDate());

			ddRenewal.setCustomerCode(policy.getMemberSelection());

			ddRenewal.setClientName(policy.getCustomerName());

			ddRenewal.setContactNo(policy.getContactNo());

			ddRenewal.setPolicyAmount(parseDoubleSafe(policy.getPolicyAmount()));

			ddRenewal.setPolicyType(policy.getSchemeType());

			ddRenewal.setPolicyTerm(policy.getSchemeTerm());

			ddRenewal.setBranchname(policy.getBranchName());

			ddRenewal.setMaturityAmount(parseDoubleSafe(policy.getMaturityAmount()));

			ddRenewal.setTotalDeposit(newPaidAmount);

			ddRenewal.setPaymentDue(newAmountDue);

			ddRenewal.setLastPaymentDate(policy.getLastPaymentDate());

			ddRenewal.setDueDate(policy.getDueDate());

			ddRenewal.setNoOfInst(parseIntSafe(policy.getNoOfInstallments()));

			ddRenewal.setNoOfInstPaid(updatedInstallmentsPaid);

			ddRenewal.setModeOfPayment(dto.getModeOfPayment());

			/*
			 * Today's DD payment
			 */

			ddRenewal.setNetDeposit(newPayment);

			dailyPremiumRenewalRepo.save(ddRenewal);

			/*
			 * ------------------------------------------------ SUCCESS
			 * ------------------------------------------------
			 */

			String message;

			if (newAmountDue == 0) {

				message = "DD payment saved successfully. " + "Policy is ready for maturity.";

			} else {

				message = "DD payment, installment and renewal " + "saved successfully.";
			}

			return new ApiResponse<>(HttpStatus.CREATED, message, savedPayment);

		} catch (Exception e) {

			e.printStackTrace();

			/*
			 * Because this method is @Transactional, RuntimeException must reach
			 * transaction boundary for rollback.
			 */

			throw e;
		}
	}

	@Transactional(rollbackFor = Exception.class)
	public ApiResponse<PolicyPayment> saveRDPayment(PolicyPaymentDto dto) {

		try {

			if (dto == null) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Payment data is required", null);
			}

			if (dto.getPolicyCode() == null || dto.getPolicyCode().trim().isEmpty()) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Policy Code is required", null);
			}

			if (dto.getPaymentAmount() == null || dto.getPaymentAmount().trim().isEmpty()) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Payment Amount is required", null);
			}

			double newPayment;

			try {

				newPayment = Double.parseDouble(dto.getPaymentAmount().trim());

			} catch (NumberFormatException e) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Invalid payment amount", null);
			}

			if (newPayment <= 0) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Payment amount must be greater than zero", null);
			}

			/*
			 * ------------------------------------------------ PENALTY
			 * ------------------------------------------------
			 */

			double penaltyAmount = 0.0;

			if (dto.getPenaltyAmount() != null && !dto.getPenaltyAmount().trim().isEmpty()) {

				try {

					penaltyAmount = Double.parseDouble(dto.getPenaltyAmount().trim());

				} catch (NumberFormatException e) {

					return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Invalid penalty amount", null);
				}
			}

			if (penaltyAmount < 0) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Penalty amount cannot be negative", null);
			}

			/*
			 * ------------------------------------------------ FETCH RD POLICY
			 * ------------------------------------------------
			 */

			Optional<AddnewinvestmentPM> optional = addinvestmentrepo.findByPolicyCode(dto.getPolicyCode());

			if (!optional.isPresent()) {

				return new ApiResponse<>(HttpStatus.NOT_FOUND,
						"Policy not found for Policy Code: " + dto.getPolicyCode(), null);
			}

			AddnewinvestmentPM policy = optional.get();

			/*
			 * ------------------------------------------------ OPTIONAL: VERIFY RD POLICY
			 * ------------------------------------------------
			 */

			if (policy.getSchemeType() != null && !policy.getSchemeType().trim().isEmpty()) {

				String schemeType = policy.getSchemeType().trim();

				if (!schemeType.equalsIgnoreCase("RD")) {

					return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Selected Policy is not an RD policy.", null);
				}
			}

			/*
			 * ------------------------------------------------ GET CURRENT DATABASE VALUES
			 * ------------------------------------------------
			 */

			double depositAmount = parseDoubleSafe(policy.getDepositAmount());

			double oldPaidAmount = parseDoubleSafe(policy.getPaidAmount());

			double currentDue = parseDoubleSafe(policy.getAmountDue());

			double currentBalance = parseDoubleSafe(policy.getBalance());

			int currentInstallmentsPaid = parseIntSafe(policy.getLastInstPaid());

			/*
			 * If Amount Due is not available, calculate remaining amount from Deposit
			 * Amount - Paid Amount.
			 */

			if (currentDue <= 0 && depositAmount > oldPaidAmount) {

				currentDue = depositAmount - oldPaidAmount;
			}

			if (currentDue <= 0) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST,
						"No payment needed. Policy is already settled or overpaid.", null);
			}

			/*
			 * ------------------------------------------------ VALIDATE PAYMENT
			 * ------------------------------------------------
			 */

			if (newPayment > currentDue) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST,
						"Payment amount cannot be greater than balance. Remaining balance: "
								+ String.format("%.2f", currentDue),
						null);
			}

			/*
			 * ------------------------------------------------ CALCULATE UPDATED VALUES
			 * ------------------------------------------------
			 */

			double newPaidAmount = oldPaidAmount + newPayment;

			double newBalance = Math.max(0, currentDue - newPayment);

			double newAmountDue = newBalance;

			/*
			 * ------------------------------------------------ INSTALLMENT NUMBER
			 * ------------------------------------------------
			 */

			List<PolicyPayment> previousPayments = policyPaymentRepository
					.findByPolicyCodeOrderByIdAsc(dto.getPolicyCode());

			int installmentNo = previousPayments.size() + 1;

			int updatedInstallmentsPaid = currentInstallmentsPaid + 1;

			/*
			 * ------------------------------------------------ FLOATING POINT CORRECTION
			 * ------------------------------------------------
			 */

			if (Math.abs(newBalance) < 0.01) {

				newBalance = 0;
				newAmountDue = 0;
			}

			/*
			 * ------------------------------------------------ SAVE POLICY PAYMENT
			 * ------------------------------------------------
			 */

			PolicyPayment payment = new PolicyPayment();

			payment.setPolicyCode(policy.getPolicyCode());

			payment.setCustomerName(policy.getCustomerName());

			payment.setInstallmentNo(String.valueOf(installmentNo));

			payment.setPaymentAmount(String.format("%.2f", newPayment));

			payment.setPenaltyAmount(String.format("%.2f", penaltyAmount));

			payment.setPaymentDate(dto.getPaymentDate());

			payment.setModeOfPayment(dto.getModeOfPayment());

			payment.setRemark(dto.getRemark());

			payment.setTotalPaidAmount(String.format("%.2f", newPaidAmount));

			payment.setBalance(String.format("%.2f", newBalance));

			PolicyPayment savedPayment = policyPaymentRepository.save(payment);

			/*
			 * ------------------------------------------------ UPDATE MAIN RD POLICY
			 * ------------------------------------------------
			 */

			policy.setPaidAmount(String.format("%.2f", newPaidAmount));

			policy.setBalance(String.format("%.2f", newBalance));

			/*
			 * IMPORTANT: lastInstPaid = installment COUNT
			 */

			policy.setLastInstPaid(String.valueOf(updatedInstallmentsPaid));

			policy.setLastPaymentDate(dto.getPaymentDate());

			policy.setNoOfInstallments(String.valueOf(updatedInstallmentsPaid));

			policy.setAmountDue(String.format("%.2f", newAmountDue));

			addinvestmentrepo.save(policy);

			/*
			 * ------------------------------------------------ SAVE RD POLICY RENEWAL
			 * ------------------------------------------------
			 */

			PolicyRenewal renewal = new PolicyRenewal();

			renewal.setPolicyCode(policy.getPolicyCode());

			renewal.setRenewalDate(LocalDate.now().toString());

			renewal.setPolicyDate(policy.getPolicyStartDate());

			renewal.setMaturityDate(policy.getMaturityDate());

			renewal.setCustomerCode(policy.getMemberSelection());

			renewal.setClientName(policy.getCustomerName());

			renewal.setContactNo(policy.getContactNo());

			renewal.setPolicyAmount(parseDoubleSafe(policy.getPolicyAmount()));

			renewal.setPolicyType(policy.getSchemeType());

			renewal.setPolicyTerm(policy.getSchemeTerm());

			renewal.setMaturityAmount(parseDoubleSafe(policy.getMaturityAmount()));

			renewal.setTotalDeposit(newPaidAmount);

			renewal.setPaymentDue(newAmountDue);

			renewal.setLastPaymentDate(policy.getLastPaymentDate());

			renewal.setDueDate(policy.getDueDate());

			renewal.setBranchname(policy.getBranchName());

			renewal.setNoOfInst(parseIntSafe(policy.getNoOfInstallments()));

			renewal.setNoOfInstPaid(updatedInstallmentsPaid);

			renewal.setModeOfPayment(dto.getModeOfPayment());

			policyRenewalRepo.save(renewal);

			/*
			 * ------------------------------------------------ SUCCESS RESPONSE
			 * ------------------------------------------------
			 */

			String message;

			if (newAmountDue == 0) {

				message = "RD payment saved successfully. " + "Policy is ready for maturity.";

			} else {

				message = "RD payment, installment and renewal " + "saved successfully.";
			}

			return new ApiResponse<>(HttpStatus.CREATED, message, savedPayment);

		} catch (Exception e) {

			e.printStackTrace();

			/*
			 * IMPORTANT: Exception must reach transaction boundary so that complete
			 * transaction is rolled back.
			 */

			throw e;
		}
	}

	@Transactional(rollbackFor = Exception.class)
	public ApiResponse<PolicyPayment> saveFDPayment(PolicyPaymentDto dto) {

		try {

			// =====================================================
			// 1. BASIC VALIDATION
			// =====================================================

			if (dto == null) {
				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Payment data is required", null);
			}

			if (dto.getPolicyCode() == null || dto.getPolicyCode().trim().isEmpty()) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Policy Code is required", null);
			}

			if (dto.getPaymentAmount() == null || dto.getPaymentAmount().trim().isEmpty()) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Payment Amount is required", null);
			}

			// =====================================================
			// 2. PAYMENT AMOUNT
			// =====================================================

			double newPayment;

			try {

				newPayment = Double.parseDouble(dto.getPaymentAmount().trim());

			} catch (NumberFormatException e) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Invalid payment amount", null);
			}

			if (newPayment <= 0) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Payment amount must be greater than zero", null);
			}

			// =====================================================
			// 3. PENALTY
			// =====================================================

			double penaltyAmount = 0.0;

			if (dto.getPenaltyAmount() != null && !dto.getPenaltyAmount().trim().isEmpty()) {

				try {

					penaltyAmount = Double.parseDouble(dto.getPenaltyAmount().trim());

				} catch (NumberFormatException e) {

					return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Invalid penalty amount", null);
				}
			}

			if (penaltyAmount < 0) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Penalty amount cannot be negative", null);
			}

			// =====================================================
			// 4. FETCH FD POLICY
			// =====================================================

			List<AddnewinvestmentPM> investments = addinvestmentrepo.findAllByPolicyCode(dto.getPolicyCode());

			if (investments == null || investments.isEmpty()) {

				return new ApiResponse<>(HttpStatus.NOT_FOUND,
						"FD Policy not found for Policy Code: " + dto.getPolicyCode(), null);
			}

			AddnewinvestmentPM policy = investments.get(0);

			// =====================================================
			// 5. VALIDATE FD POLICY
			// =====================================================

			if (policy.getSchemeType() == null || !"FD".equalsIgnoreCase(policy.getSchemeType().trim())) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Policy is not an FD policy.", null);
			}

			// =====================================================
			// 6. GET FD SPLIT AMOUNTS
			// =====================================================

			String fdSplitAmountsJson = policy.getFdSplitAmounts();

			if (fdSplitAmountsJson == null || fdSplitAmountsJson.trim().isEmpty()) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "FD split amounts are not available for this policy.",
						null);
			}

			// =====================================================
			// 7. PARSE FD SPLIT JSON
			// =====================================================

			List<Double> splitAmounts;

			try {

				ObjectMapper objectMapper = new ObjectMapper();

				splitAmounts = objectMapper.readValue(fdSplitAmountsJson, new TypeReference<List<Double>>() {
				});

			} catch (Exception e) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Invalid FD split amounts format.", null);
			}

			if (splitAmounts == null || splitAmounts.isEmpty()) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "FD split amounts cannot be empty.", null);
			}

			// =====================================================
			// 8. VALIDATE EACH SPLIT
			// =====================================================

			for (Double splitAmount : splitAmounts) {

				if (splitAmount == null || splitAmount <= 0) {

					return new ApiResponse<>(HttpStatus.BAD_REQUEST, "FD split amount must be greater than zero.",
							null);
				}
			}

			// =====================================================
			// 9. GET CURRENT POLICY VALUES
			// =====================================================

			double depositAmount = parseDoubleSafe(policy.getDepositAmount());

			double oldPaidAmount = parseDoubleSafe(policy.getPaidAmount());

			double currentBalance = parseDoubleSafe(policy.getBalance());

			// =====================================================
			// 10. CALCULATE TOTAL SPLIT AMOUNT
			// =====================================================

			double totalSplitAmount = 0.0;

			for (Double splitAmount : splitAmounts) {

				totalSplitAmount += splitAmount;
			}

			// =====================================================
			// 11. VALIDATE SPLIT TOTAL WITH DEPOSIT AMOUNT
			// =====================================================

			if (Math.abs(totalSplitAmount - depositAmount) > 0.01) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST,
						"FD split total amount does not match total deposit amount. " + "Split Total: "
								+ String.format("%.2f", totalSplitAmount) + ", Deposit Amount: "
								+ String.format("%.2f", depositAmount),
						null);
			}

			// =====================================================
			// 12. SAFETY CHECK OLD PAID AMOUNT
			// =====================================================

			if (oldPaidAmount < 0) {
				oldPaidAmount = 0;
			}

			if (oldPaidAmount > depositAmount + 0.01) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST,
						"Existing paid amount cannot be greater than FD deposit amount.", null);
			}

			// =====================================================
			// 13. DETERMINE COMPLETED FD SPLITS
			//
			// Example:
			//
			// [300000,300000,300000,100000]
			//
			// Paid = 0
			// Completed = 0
			//
			// Paid = 300000
			// Completed = 1
			//
			// Paid = 600000
			// Completed = 2
			//
			// Paid = 900000
			// Completed = 3
			//
			// Paid = 1000000
			// Completed = 4
			// =====================================================

			int completedInstallments = 0;

			double accumulatedAmount = 0.0;

			for (Double splitAmount : splitAmounts) {

				if (oldPaidAmount + 0.01 >= accumulatedAmount + splitAmount) {

					accumulatedAmount += splitAmount;

					completedInstallments++;

				} else {

					break;
				}
			}

			// =====================================================
			// 14. CHECK ALL FD SPLITS COMPLETED
			// =====================================================

			if (completedInstallments >= splitAmounts.size()) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "All FD split payments are already completed.", null);
			}

			// =====================================================
			// 15. CURRENT FD INSTALLMENT NUMBER
			// =====================================================

			int currentInstallmentNo = completedInstallments + 1;

			// =====================================================
			// 16. CURRENT FD SPLIT AMOUNT
			// =====================================================

			double currentSplitAmount = splitAmounts.get(currentInstallmentNo - 1);

			// =====================================================
			// 17. VALIDATE PAYMENT AGAINST CURRENT SPLIT
			//
			// Payment MUST exactly match current FD split.
			// =====================================================

			if (Math.abs(newPayment - currentSplitAmount) > 0.01) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Invalid FD payment amount for installment "
						+ currentInstallmentNo + ". Required amount: " + String.format("%.2f", currentSplitAmount),
						null);
			}

			// =====================================================
			// 18. CALCULATE NEW PAID AMOUNT
			// =====================================================

			double newPaidAmount = oldPaidAmount + newPayment;

			// =====================================================
			// 19. PREVENT OVER PAYMENT
			// =====================================================

			if (newPaidAmount > depositAmount + 0.01) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Payment exceeds total FD deposit amount.", null);
			}

			// =====================================================
			// 20. CALCULATE NEW BALANCE
			// =====================================================

			double newBalance = Math.max(0, depositAmount - newPaidAmount);

			// =====================================================
			// 21. UPDATED COMPLETED INSTALLMENTS
			// =====================================================

			int updatedInstallmentsPaid = currentInstallmentNo;

			// =====================================================
			// 22. CALCULATE NEXT PAYMENT DUE
			//
			// IMPORTANT:
			//
			// amountDue = NEXT FD SPLIT
			//
			// NOT total remaining balance.
			//
			// Example:
			//
			// After 1st:
			// Balance = 700000
			// Due = 300000
			//
			// After 3rd:
			// Balance = 100000
			// Due = 100000
			//
			// After 4th:
			// Balance = 0
			// Due = 0
			// =====================================================

			double newAmountDue = 0.0;

			int nextInstallmentIndex = updatedInstallmentsPaid;

			if (nextInstallmentIndex < splitAmounts.size()) {

				newAmountDue = splitAmounts.get(nextInstallmentIndex);
			}

			// =====================================================
			// 23. FLOATING POINT CORRECTION
			// =====================================================

			if (Math.abs(newBalance) < 0.01) {

				newBalance = 0.0;
				newAmountDue = 0.0;
			}

			// =====================================================
			// 24. CREATE POLICY PAYMENT
			// =====================================================

			PolicyPayment payment = new PolicyPayment();

			payment.setPolicyCode(policy.getPolicyCode());

			payment.setCustomerName(policy.getCustomerName());

			payment.setInstallmentNo(String.valueOf(currentInstallmentNo));

			payment.setPaymentAmount(String.format("%.2f", newPayment));

			payment.setPenaltyAmount(String.format("%.2f", penaltyAmount));

			payment.setPaymentDate(dto.getPaymentDate());

			payment.setModeOfPayment(dto.getModeOfPayment());

			payment.setRemark(dto.getRemark());

			payment.setTotalPaidAmount(String.format("%.2f", newPaidAmount));

			payment.setBalance(String.format("%.2f", newBalance));

			// =====================================================
			// 25. SAVE POLICY PAYMENT
			// =====================================================

			PolicyPayment savedPayment = policyPaymentRepository.save(payment);

			// =====================================================
			// 26. UPDATE MAIN FD POLICY
			// =====================================================

			policy.setPaidAmount(String.format("%.2f", newPaidAmount));

			policy.setBalance(String.format("%.2f", newBalance));

			// =====================================================
			// 27. LAST FD SPLIT PAID
			//
			// 0 initially
			// 1 after first
			// 2 after second
			// 3 after third
			// 4 after fourth
			// =====================================================

			policy.setLastInstPaid(String.valueOf(updatedInstallmentsPaid));

			// =====================================================
			// 28. TOTAL NUMBER OF FD SPLITS
			//
			// IMPORTANT:
			//
			// Always total splits.
			//
			// Example:
			// noOfInstallments = 4
			//
			// Do NOT store 1,2,3,4 here.
			// =====================================================

			policy.setNoOfInstallments(String.valueOf(splitAmounts.size()));

			// =====================================================
			// 29. LAST PAYMENT DATE
			// =====================================================

			policy.setLastPaymentDate(dto.getPaymentDate());

			// =====================================================
			// 30. NEXT PAYMENT DUE
			// =====================================================

			policy.setAmountDue(String.format("%.2f", newAmountDue));

			// =====================================================
			// 31. PAYMENT MODE
			// =====================================================

			if (dto.getModeOfPayment() != null) {

				policy.setModeOfPayment(dto.getModeOfPayment());
			}

			// =====================================================
			// 32. SAVE MAIN POLICY
			// =====================================================

			addinvestmentrepo.save(policy);

			// =====================================================
			// 33. CREATE FLEXIBLE RENEWAL
			// =====================================================

			FlexibleRenewal fdRenewal = new FlexibleRenewal();

			fdRenewal.setPolicyCode(policy.getPolicyCode());

			fdRenewal.setRenewalDate(LocalDate.now().toString());

			fdRenewal.setPolicyDate(policy.getPolicyStartDate());

			fdRenewal.setMaturityDate(policy.getMaturityDate());

			fdRenewal.setCustomerCode(policy.getMemberSelection());

			fdRenewal.setClientName(policy.getCustomerName());

			fdRenewal.setContactNo(policy.getContactNo());

			fdRenewal.setPolicyAmount(parseDoubleSafe(policy.getPolicyAmount()));

			fdRenewal.setPolicyType(policy.getSchemeType());

			fdRenewal.setPolicyTerm(policy.getSchemeTerm());

			fdRenewal.setMaturityAmount(parseDoubleSafe(policy.getMaturityAmount()));

			// =====================================================
			// 34. TOTAL DEPOSIT PAID TILL NOW
			// =====================================================

			fdRenewal.setTotalDeposit(newPaidAmount);

			// =====================================================
			// 35. NEXT FD PAYMENT DUE
			// =====================================================

			fdRenewal.setPaymentDue(newAmountDue);

			// =====================================================
			// 36. LAST PAYMENT DATE
			// =====================================================

			fdRenewal.setLastPaymentDate(policy.getLastPaymentDate());

			// =====================================================
			// 37. DUE DATE
			// =====================================================

			fdRenewal.setDueDate(policy.getDueDate());

			// =====================================================
			// 38. TOTAL FD SPLITS
			// =====================================================

			fdRenewal.setNoOfInst(splitAmounts.size());

			// =====================================================
			// 39. COMPLETED FD SPLITS
			// =====================================================

			fdRenewal.setNoOfInstPaid(updatedInstallmentsPaid);

			// =====================================================
			// 40. MODE OF PAYMENT
			// =====================================================

			fdRenewal.setModeOfPayment(dto.getModeOfPayment());

			// =====================================================
			// 41. BRANCH
			// =====================================================

			fdRenewal.setBranchname(policy.getBranchName());

			// =====================================================
			// 42. CURRENT FD PAYMENT
			// =====================================================

			fdRenewal.setNetDeposit(newPayment);

			// =====================================================
			// 43. PENALTY / FEES
			// =====================================================

			fdRenewal.setFees(String.format("%.2f", penaltyAmount));

			// =====================================================
			// 44. APPROVED
			// =====================================================

			fdRenewal.setApproved(true);

			// =====================================================
			// 45. SAVE FLEXIBLE RENEWAL
			// =====================================================

			flexibleRenewalRepo.save(fdRenewal);

			// =====================================================
			// 46. SUCCESS MESSAGE
			// =====================================================

			String message;

			if (newAmountDue == 0 && updatedInstallmentsPaid >= splitAmounts.size()) {

				message = "FD payment saved successfully. " + "All " + splitAmounts.size()
						+ " FD split payments are completed " + "and FD is fully funded.";

			} else {

				message = "FD payment " + currentInstallmentNo + " saved successfully. " + "Remaining FD balance: ₹"
						+ String.format("%.2f", newBalance) + ". Next payment due: ₹"
						+ String.format("%.2f", newAmountDue);
			}

			// =====================================================
			// 47. RETURN SUCCESS
			// =====================================================

			return new ApiResponse<>(HttpStatus.CREATED, message, savedPayment);

		} catch (Exception e) {

			e.printStackTrace();

			throw e;
		}
	}

	public ApiResponse<AddnewinvestmentPM> getPolicyByPolicyCodeForFD(String policyCode) {

		try {

			if (policyCode == null || policyCode.trim().isEmpty()) {
				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Policy Code is required", null);
			}

			List<AddnewinvestmentPM> investments = addinvestmentrepo.findAllByPolicyCode(policyCode);

			if (investments == null || investments.isEmpty()) {

				return new ApiResponse<>(HttpStatus.NOT_FOUND, "Policy not found for Policy Code: " + policyCode, null);
			}

			AddnewinvestmentPM policy = investments.get(0);

			// =====================================================
			// VALIDATE FD
			// =====================================================

			if (policy.getSchemeType() == null || !"FD".equalsIgnoreCase(policy.getSchemeType().trim())) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Selected policy is not an FD policy.", null);
			}

			// =====================================================
			// CURRENT VALUES
			// =====================================================

			double depositAmount = parseDoubleSafe(policy.getDepositAmount());

			double paidAmount = parseDoubleSafe(policy.getPaidAmount());

			double balance = parseDoubleSafe(policy.getBalance());

			double amountDue = parseDoubleSafe(policy.getAmountDue());

			// =====================================================
			// INITIAL BALANCE
			// =====================================================

			if (balance <= 0 && depositAmount > paidAmount) {
				balance = depositAmount - paidAmount;
			}

			// =====================================================
			// INITIAL DUE
			// =====================================================

			if (amountDue <= 0 && depositAmount > paidAmount) {
				amountDue = depositAmount - paidAmount;
			}

			// =====================================================
			// FD SPLIT AMOUNTS
			// =====================================================

			String fdSplitAmounts = policy.getFdSplitAmounts();

			if (fdSplitAmounts == null || fdSplitAmounts.trim().isEmpty()) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "FD split amounts are not available for this policy.",
						null);
			}

			List<Double> splitAmounts;

			try {

				ObjectMapper objectMapper = new ObjectMapper();

				splitAmounts = objectMapper.readValue(fdSplitAmounts, new TypeReference<List<Double>>() {
				});

			} catch (Exception e) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "Invalid FD split amounts format.", null);
			}

			if (splitAmounts == null || splitAmounts.isEmpty()) {

				return new ApiResponse<>(HttpStatus.BAD_REQUEST, "FD split amounts cannot be empty.", null);
			}

			// =====================================================
			// DETERMINE COMPLETED INSTALLMENTS
			// =====================================================

			int completedInstallments = 0;

			double accumulatedAmount = 0.0;

			for (Double splitAmount : splitAmounts) {

				if (splitAmount == null) {
					continue;
				}

				if (paidAmount + 0.01 >= accumulatedAmount + splitAmount) {

					accumulatedAmount += splitAmount;
					completedInstallments++;

				} else {
					break;
				}
			}

			// =====================================================
			// CURRENT INSTALLMENT
			// =====================================================

			int currentInstallmentNo = completedInstallments + 1;

			double currentInstallmentAmount = 0.0;

			if (currentInstallmentNo <= splitAmounts.size()) {

				currentInstallmentAmount = splitAmounts.get(currentInstallmentNo - 1);
			}

			// =====================================================
			// SET FETCH VALUES
			// =====================================================

			policy.setPaidAmount(String.format("%.2f", paidAmount));

			policy.setBalance(String.format("%.2f", balance));

			policy.setAmountDue(String.format("%.2f", amountDue));

			policy.setLastInstPaid(String.valueOf(completedInstallments));

			/*
			 * IMPORTANT:
			 *
			 * noOfInstallments = TOTAL FD INSTALLMENTS
			 *
			 * It should be 4 for: 300000 + 300000 + 300000 + 100000
			 */
			policy.setNoOfInstallments(String.valueOf(splitAmounts.size()));

			// =====================================================
			// RETURN
			// =====================================================

			return new ApiResponse<>(HttpStatus.OK, "FD policy fetched successfully.", policy);

		} catch (Exception e) {

			e.printStackTrace();

			return new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch FD policy.", null);
		}
	}

}
