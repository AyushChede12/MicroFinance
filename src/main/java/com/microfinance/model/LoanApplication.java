package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class LoanApplication {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String loanId;
    private String loanDate;
    private String memberId;
    private String memberName;
    private String relativeDetails;
    private String dateOfBirth;
    private String age;
    private String contactNo;
    private String messageStatus;
    private String address;
    private String pinCode;
    private String branchName;
    private String loanPlanName;
    private String typeOfLoan;
    private String loanMode;
    private String loanTerm;
    private String rateOfInterest;
    private String loanAmount;
    private String interestType;
    private String emiPayment;
    private String purposeOfLoan;

    // Guarantor Details
    private String guarantorMemberId;
    private String guarantorIdentity;
    private String guarantorAddress;
    private String guarantorPinCode;
    private String guarantorContactNo;
    private String guarantorSecurityType;

    // Co-Applicant Details
    private String coApplicantMemberId;
    private String coApplicantIdentity;
    private String coApplicantAddress;
    private String coApplicantPinCode;
    private String coApplicantContactNo;
    private String coApplicantSecurityType;

    // Deduction Details
    private String processingFee;
    private String legalCharges;
    private String gst;
    private String insuranceFee;
    private String valuationFees;
    private String stationaryFee;
    private String financialConsultantId;
    private String financialConsultantName;
    private String approvalDate;
    private boolean approvalStatus;
    private String photo;
    private String signature;
    
    // Loan Payment
    private String paymentDate;
    private String paymentStatus;
    private String paymentMode;
    private String accountNo;
    private String ref_UpiId;
    private String charges;
    private String remarks;
    private String chequeDate;
    private String chequeNo;
    private String sanctionedAmount;
    private String loanStatus;
    
    
    
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getLoanId() {
		return loanId;
	}
	public void setLoanId(String loanId) {
		this.loanId = loanId;
	}
	public String getLoanDate() {
		return loanDate;
	}
	public void setLoanDate(String loanDate) {
		this.loanDate = loanDate;
	}
	public String getMemberId() {
		return memberId;
	}
	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}
	
	public String getMemberName() {
		return memberName;
	}
	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}
	public String getRelativeDetails() {
		return relativeDetails;
	}
	public void setRelativeDetails(String relativeDetails) {
		this.relativeDetails = relativeDetails;
	}
	public String getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
		this.age = age;
	}
	public String getContactNo() {
		return contactNo;
	}
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}
	
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPinCode() {
		return pinCode;
	}
	public void setPinCode(String pinCode) {
		this.pinCode = pinCode;
	}
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	public String getLoanPlanName() {
		return loanPlanName;
	}
	public void setLoanPlanName(String loanPlanName) {
		this.loanPlanName = loanPlanName;
	}
	public String getTypeOfLoan() {
		return typeOfLoan;
	}
	public void setTypeOfLoan(String typeOfLoan) {
		this.typeOfLoan = typeOfLoan;
	}
	
	public String getRateOfInterest() {
		return rateOfInterest;
	}
	public void setRateOfInterest(String rateOfInterest) {
		this.rateOfInterest = rateOfInterest;
	}
	public String getLoanAmount() {
		return loanAmount;
	}
	public void setLoanAmount(String loanAmount) {
		this.loanAmount = loanAmount;
	}
	public String getInterestType() {
		return interestType;
	}
	public void setInterestType(String interestType) {
		this.interestType = interestType;
	}
	public String getEmiPayment() {
		return emiPayment;
	}
	public void setEmiPayment(String emiPayment) {
		this.emiPayment = emiPayment;
	}
	public String getPurposeOfLoan() {
		return purposeOfLoan;
	}
	public void setPurposeOfLoan(String purposeOfLoan) {
		this.purposeOfLoan = purposeOfLoan;
	}
	public String getGuarantorMemberId() {
		return guarantorMemberId;
	}
	public void setGuarantorMemberId(String guarantorMemberId) {
		this.guarantorMemberId = guarantorMemberId;
	}
	public String getGuarantorIdentity() {
		return guarantorIdentity;
	}
	public void setGuarantorIdentity(String guarantorIdentity) {
		this.guarantorIdentity = guarantorIdentity;
	}
	public String getGuarantorAddress() {
		return guarantorAddress;
	}
	public void setGuarantorAddress(String guarantorAddress) {
		this.guarantorAddress = guarantorAddress;
	}
	public String getGuarantorPinCode() {
		return guarantorPinCode;
	}
	public void setGuarantorPinCode(String guarantorPinCode) {
		this.guarantorPinCode = guarantorPinCode;
	}
	public String getGuarantorContactNo() {
		return guarantorContactNo;
	}
	public void setGuarantorContactNo(String guarantorContactNo) {
		this.guarantorContactNo = guarantorContactNo;
	}
	public String getGuarantorSecurityType() {
		return guarantorSecurityType;
	}
	public void setGuarantorSecurityType(String guarantorSecurityType) {
		this.guarantorSecurityType = guarantorSecurityType;
	}
	public String getCoApplicantMemberId() {
		return coApplicantMemberId;
	}
	public void setCoApplicantMemberId(String coApplicantMemberId) {
		this.coApplicantMemberId = coApplicantMemberId;
	}
	public String getCoApplicantIdentity() {
		return coApplicantIdentity;
	}
	public void setCoApplicantIdentity(String coApplicantIdentity) {
		this.coApplicantIdentity = coApplicantIdentity;
	}
	public String getCoApplicantAddress() {
		return coApplicantAddress;
	}
	public void setCoApplicantAddress(String coApplicantAddress) {
		this.coApplicantAddress = coApplicantAddress;
	}
	public String getCoApplicantPinCode() {
		return coApplicantPinCode;
	}
	public void setCoApplicantPinCode(String coApplicantPinCode) {
		this.coApplicantPinCode = coApplicantPinCode;
	}
	public String getCoApplicantContactNo() {
		return coApplicantContactNo;
	}
	public void setCoApplicantContactNo(String coApplicantContactNo) {
		this.coApplicantContactNo = coApplicantContactNo;
	}
	public String getCoApplicantSecurityType() {
		return coApplicantSecurityType;
	}
	public void setCoApplicantSecurityType(String coApplicantSecurityType) {
		this.coApplicantSecurityType = coApplicantSecurityType;
	}
	public String getProcessingFee() {
		return processingFee;
	}
	public void setProcessingFee(String processingFee) {
		this.processingFee = processingFee;
	}
	public String getLegalCharges() {
		return legalCharges;
	}
	public void setLegalCharges(String legalCharges) {
		this.legalCharges = legalCharges;
	}
	
	
	public String getGst() {
		return gst;
	}
	public void setGst(String gst) {
		this.gst = gst;
	}
	public String getValuationFees() {
		return valuationFees;
	}
	public void setValuationFees(String valuationFees) {
		this.valuationFees = valuationFees;
	}
	public String getInsuranceFee() {
		return insuranceFee;
	}
	public void setInsuranceFee(String insuranceFee) {
		this.insuranceFee = insuranceFee;
	}
	
	public String getStationaryFee() {
		return stationaryFee;
	}
	public void setStationaryFee(String stationaryFee) {
		this.stationaryFee = stationaryFee;
	}
	
	public String getFinancialConsultantId() {
		return financialConsultantId;
	}
	public void setFinancialConsultantId(String financialConsultantId) {
		this.financialConsultantId = financialConsultantId;
	}
	public String getFinancialConsultantName() {
		return financialConsultantName;
	}
	public void setFinancialConsultantName(String financialConsultantName) {
		this.financialConsultantName = financialConsultantName;
	}
	
	public boolean isApprovalStatus() {
		return approvalStatus;
	}
	public void setApprovalStatus(boolean approvalStatus) {
		this.approvalStatus = approvalStatus;
	}
	public String getMessageStatus() {
		return messageStatus;
	}
	public void setMessageStatus(String messageStatus) {
		this.messageStatus = messageStatus;
	}
	public String getLoanMode() {
		return loanMode;
	}
	public void setLoanMode(String loanMode) {
		this.loanMode = loanMode;
	}
	public String getLoanTerm() {
		return loanTerm;
	}
	public void setLoanTerm(String loanTerm) {
		this.loanTerm = loanTerm;
	}
	public String getApprovalDate() {
		return approvalDate;
	}
	public void setApprovalDate(String approvalDate) {
		this.approvalDate = approvalDate;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public String getSignature() {
		return signature;
	}
	public void setSignature(String signature) {
		this.signature = signature;
	}
	public String getPaymentDate() {
		return paymentDate;
	}
	public void setPaymentDate(String paymentDate) {
		this.paymentDate = paymentDate;
	}
	public String getPaymentStatus() {
		return paymentStatus;
	}
	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}
	public String getPaymentMode() {
		return paymentMode;
	}
	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}
	public String getAccountNo() {
		return accountNo;
	}
	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}
	public String getRef_UpiId() {
		return ref_UpiId;
	}
	public void setRef_UpiId(String ref_UpiId) {
		this.ref_UpiId = ref_UpiId;
	}
	public String getCharges() {
		return charges;
	}
	public void setCharges(String charges) {
		this.charges = charges;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getChequeDate() {
		return chequeDate;
	}
	public void setChequeDate(String chequeDate) {
		this.chequeDate = chequeDate;
	}
	public String getChequeNo() {
		return chequeNo;
	}
	public void setChequeNo(String chequeNo) {
		this.chequeNo = chequeNo;
	}
	public String getSanctionedAmount() {
		return sanctionedAmount;
	}
	public void setSanctionedAmount(String sanctionedAmount) {
		this.sanctionedAmount = sanctionedAmount;
	}
	public String getLoanStatus() {
		return loanStatus;
	}
	public void setLoanStatus(String loanStatus) {
		this.loanStatus = loanStatus;
	}
	
	
	

	
   
}