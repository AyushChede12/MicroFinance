package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class NewLoanApplication {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	private Long id;
	private String dateloan;
	private String findMember;
	private String relativeDetail;
	private String newloanApplicationDOB;
	private String newApplictionAge;
	private String phoneNo;
	private String noficationStatus;
	private String newAplicationAddress;
	private String newAppicationPinCode;
	private String branchName;
	private String newApplicationLoanCode;
	private String newApplicationLoanPlaneName;
	private String newLoanTypeofloan;
	private String newLoanApplicationCategoryLoan;
	private String newApplicationDurationPlan;
	private String newApplicationROI;
	private String newApplicationLoanAmount;
	private String newApplicationTypeIntrest;
	private String newLoanApplicationPaymnetEMI;
	private String newApplicationLoanPurpose;
	
	//Gurantor Details
	
	private String memberId;
	private String identifyGurantor;
	private String gurantorAddress;
	private String gurantorPinCode;
	private String guarantorContactno;
	private String guarantorSecurityType;
	
	//Co-Application
	private String coApplictionMemberID;
	private String coApplictionGuarantorIdentity;
	private String coApplictionAdress;
	private String coAppicationPinCode;
	private String coApplictionguarantorContactNo;
	private String coAappictionSecurityType;
	
	//Deduction Details
	private String deductionProcessingFee;
	private String deductionLegakCharges;
	private String deductionStampBuildingFund;
	private String deductionStationaryCharges;
	private String deductionInsuranaceFee;
	private String deductionOverdueIntrestCharge;
	private String deductionAdvisorCollectorId;
	private String deductionCollectorName;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDateloan() {
		return dateloan;
	}
	public void setDateloan(String dateloan) {
		this.dateloan = dateloan;
	}
	public String getFindMember() {
		return findMember;
	}
	public void setFindMember(String findMember) {
		this.findMember = findMember;
	}
	public String getRelativeDetail() {
		return relativeDetail;
	}
	public void setRelativeDetail(String relativeDetail) {
		this.relativeDetail = relativeDetail;
	}
	public String getNewloanApplicationDOB() {
		return newloanApplicationDOB;
	}
	public void setNewloanApplicationDOB(String newloanApplicationDOB) {
		this.newloanApplicationDOB = newloanApplicationDOB;
	}
	public String getNewApplictionAge() {
		return newApplictionAge;
	}
	public void setNewApplictionAge(String newApplictionAge) {
		this.newApplictionAge = newApplictionAge;
	}
	public String getPhoneNo() {
		return phoneNo;
	}
	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}
	public String getNoficationStatus() {
		return noficationStatus;
	}
	public void setNoficationStatus(String noficationStatus) {
		this.noficationStatus = noficationStatus;
	}
	public String getNewAplicationAddress() {
		return newAplicationAddress;
	}
	public void setNewAplicationAddress(String newAplicationAddress) {
		this.newAplicationAddress = newAplicationAddress;
	}
	public String getNewAppicationPinCode() {
		return newAppicationPinCode;
	}
	public void setNewAppicationPinCode(String newAppicationPinCode) {
		this.newAppicationPinCode = newAppicationPinCode;
	}
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	public String getNewApplicationLoanCode() {
		return newApplicationLoanCode;
	}
	public void setNewApplicationLoanCode(String newApplicationLoanCode) {
		this.newApplicationLoanCode = newApplicationLoanCode;
	}
	public String getNewApplicationLoanPlaneName() {
		return newApplicationLoanPlaneName;
	}
	public void setNewApplicationLoanPlaneName(String newApplicationLoanPlaneName) {
		this.newApplicationLoanPlaneName = newApplicationLoanPlaneName;
	}
	public String getNewLoanTypeofloan() {
		return newLoanTypeofloan;
	}
	public void setNewLoanTypeofloan(String newLoanTypeofloan) {
		this.newLoanTypeofloan = newLoanTypeofloan;
	}
	public String getNewLoanApplicationCategoryLoan() {
		return newLoanApplicationCategoryLoan;
	}
	public void setNewLoanApplicationCategoryLoan(String newLoanApplicationCategoryLoan) {
		this.newLoanApplicationCategoryLoan = newLoanApplicationCategoryLoan;
	}
	public String getNewApplicationDurationPlan() {
		return newApplicationDurationPlan;
	}
	public void setNewApplicationDurationPlan(String newApplicationDurationPlan) {
		this.newApplicationDurationPlan = newApplicationDurationPlan;
	}
	public String getNewApplicationROI() {
		return newApplicationROI;
	}
	public void setNewApplicationROI(String newApplicationROI) {
		this.newApplicationROI = newApplicationROI;
	}
	public String getNewApplicationLoanAmount() {
		return newApplicationLoanAmount;
	}
	public void setNewApplicationLoanAmount(String newApplicationLoanAmount) {
		this.newApplicationLoanAmount = newApplicationLoanAmount;
	}
	public String getNewApplicationTypeIntrest() {
		return newApplicationTypeIntrest;
	}
	public void setNewApplicationTypeIntrest(String newApplicationTypeIntrest) {
		this.newApplicationTypeIntrest = newApplicationTypeIntrest;
	}
	public String getNewLoanApplicationPaymnetEMI() {
		return newLoanApplicationPaymnetEMI;
	}
	public void setNewLoanApplicationPaymnetEMI(String newLoanApplicationPaymnetEMI) {
		this.newLoanApplicationPaymnetEMI = newLoanApplicationPaymnetEMI;
	}
	public String getNewApplicationLoanPurpose() {
		return newApplicationLoanPurpose;
	}
	public void setNewApplicationLoanPurpose(String newApplicationLoanPurpose) {
		this.newApplicationLoanPurpose = newApplicationLoanPurpose;
	}
	public String getMemberId() {
		return memberId;
	}
	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}
	public String getIdentifyGurantor() {
		return identifyGurantor;
	}
	public void setIdentifyGurantor(String identifyGurantor) {
		this.identifyGurantor = identifyGurantor;
	}
	public String getGurantorAddress() {
		return gurantorAddress;
	}
	public void setGurantorAddress(String gurantorAddress) {
		this.gurantorAddress = gurantorAddress;
	}
	public String getGurantorPinCode() {
		return gurantorPinCode;
	}
	public void setGurantorPinCode(String gurantorPinCode) {
		this.gurantorPinCode = gurantorPinCode;
	}
	public String getGuarantorContactno() {
		return guarantorContactno;
	}
	public void setGuarantorContactno(String guarantorContactno) {
		this.guarantorContactno = guarantorContactno;
	}
	public String getGuarantorSecurityType() {
		return guarantorSecurityType;
	}
	public void setGuarantorSecurityType(String guarantorSecurityType) {
		this.guarantorSecurityType = guarantorSecurityType;
	}
	public String getCoApplictionMemberID() {
		return coApplictionMemberID;
	}
	public void setCoApplictionMemberID(String coApplictionMemberID) {
		this.coApplictionMemberID = coApplictionMemberID;
	}
	public String getCoApplictionGuarantorIdentity() {
		return coApplictionGuarantorIdentity;
	}
	public void setCoApplictionGuarantorIdentity(String coApplictionGuarantorIdentity) {
		this.coApplictionGuarantorIdentity = coApplictionGuarantorIdentity;
	}
	public String getCoApplictionAdress() {
		return coApplictionAdress;
	}
	public void setCoApplictionAdress(String coApplictionAdress) {
		this.coApplictionAdress = coApplictionAdress;
	}
	public String getCoAppicationPinCode() {
		return coAppicationPinCode;
	}
	public void setCoAppicationPinCode(String coAppicationPinCode) {
		this.coAppicationPinCode = coAppicationPinCode;
	}
	public String getCoApplictionguarantorContactNo() {
		return coApplictionguarantorContactNo;
	}
	public void setCoApplictionguarantorContactNo(String coApplictionguarantorContactNo) {
		this.coApplictionguarantorContactNo = coApplictionguarantorContactNo;
	}
	public String getCoAappictionSecurityType() {
		return coAappictionSecurityType;
	}
	public void setCoAappictionSecurityType(String coAappictionSecurityType) {
		this.coAappictionSecurityType = coAappictionSecurityType;
	}
	public String getDeductionProcessingFee() {
		return deductionProcessingFee;
	}
	public void setDeductionProcessingFee(String deductionProcessingFee) {
		this.deductionProcessingFee = deductionProcessingFee;
	}
	public String getDeductionLegakCharges() {
		return deductionLegakCharges;
	}
	public void setDeductionLegakCharges(String deductionLegakCharges) {
		this.deductionLegakCharges = deductionLegakCharges;
	}
	public String getDeductionStampBuildingFund() {
		return deductionStampBuildingFund;
	}
	public void setDeductionStampBuildingFund(String deductionStampBuildingFund) {
		this.deductionStampBuildingFund = deductionStampBuildingFund;
	}
	public String getDeductionStationaryCharges() {
		return deductionStationaryCharges;
	}
	public void setDeductionStationaryCharges(String deductionStationaryCharges) {
		this.deductionStationaryCharges = deductionStationaryCharges;
	}
	public String getDeductionInsuranaceFee() {
		return deductionInsuranaceFee;
	}
	public void setDeductionInsuranaceFee(String deductionInsuranaceFee) {
		this.deductionInsuranaceFee = deductionInsuranaceFee;
	}
	public String getDeductionOverdueIntrestCharge() {
		return deductionOverdueIntrestCharge;
	}
	public void setDeductionOverdueIntrestCharge(String deductionOverdueIntrestCharge) {
		this.deductionOverdueIntrestCharge = deductionOverdueIntrestCharge;
	}
	public String getDeductionAdvisorCollectorId() {
		return deductionAdvisorCollectorId;
	}
	public void setDeductionAdvisorCollectorId(String deductionAdvisorCollectorId) {
		this.deductionAdvisorCollectorId = deductionAdvisorCollectorId;
	}
	public String getDeductionCollectorName() {
		return deductionCollectorName;
	}
	public void setDeductionCollectorName(String deductionCollectorName) {
		this.deductionCollectorName = deductionCollectorName;
	}
	
}
