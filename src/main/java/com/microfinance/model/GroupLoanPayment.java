package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class GroupLoanPayment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String groupID;

	private String openingDate;
	private String communityName;
	private String loanSchemeName;
	private String contactNumber;
	private String emiType;
	private String term;
	private String rateOfInterest;
	private String interestType;
	private String loanAmount;
	private String loanEmi;

	private String photo;
	private String signature;

	// Deduction details
	private String planCode;
	private String processingFee;
	private String legalCharges;
	private String gstPercentage;
	private String insuranceFee;
	private String valuationFee;

	private String financialConsultantId;
	private String financialConsultantName;

	// Payment Details
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
	private String communityAddress;
	private String branchName;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getGroupID() {
		return groupID;
	}

	public void setGroupID(String groupID) {
		this.groupID = groupID;
	}

	public String getOpeningDate() {
		return openingDate;
	}

	public void setOpeningDate(String openingDate) {
		this.openingDate = openingDate;
	}

	public String getCommunityName() {
		return communityName;
	}

	public void setCommunityName(String communityName) {
		this.communityName = communityName;
	}

	public String getLoanSchemeName() {
		return loanSchemeName;
	}

	public void setLoanSchemeName(String loanSchemeName) {
		this.loanSchemeName = loanSchemeName;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getEmiType() {
		return emiType;
	}

	public void setEmiType(String emiType) {
		this.emiType = emiType;
	}

	public String getTerm() {
		return term;
	}

	public void setTerm(String term) {
		this.term = term;
	}

	public String getRateOfInterest() {
		return rateOfInterest;
	}

	public void setRateOfInterest(String rateOfInterest) {
		this.rateOfInterest = rateOfInterest;
	}

	public String getInterestType() {
		return interestType;
	}

	public void setInterestType(String interestType) {
		this.interestType = interestType;
	}

	public String getLoanAmount() {
		return loanAmount;
	}

	public void setLoanAmount(String loanAmount) {
		this.loanAmount = loanAmount;
	}

	public String getLoanEmi() {
		return loanEmi;
	}

	public void setLoanEmi(String loanEmi) {
		this.loanEmi = loanEmi;
	}

	public String getPlanCode() {
		return planCode;
	}

	public void setPlanCode(String planCode) {
		this.planCode = planCode;
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

	public String getGstPercentage() {
		return gstPercentage;
	}

	public void setGstPercentage(String gstPercentage) {
		this.gstPercentage = gstPercentage;
	}

	public String getInsuranceFee() {
		return insuranceFee;
	}

	public void setInsuranceFee(String insuranceFee) {
		this.insuranceFee = insuranceFee;
	}

	public String getValuationFee() {
		return valuationFee;
	}

	public void setValuationFee(String valuationFee) {
		this.valuationFee = valuationFee;
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

	public String getSanctionedAmount() {
		return sanctionedAmount;
	}

	public void setSanctionedAmount(String sanctionedAmount) {
		this.sanctionedAmount = sanctionedAmount;
	}

	public String getCommunityAddress() {
		return communityAddress;
	}

	public void setCommunityAddress(String communityAddress) {
		this.communityAddress = communityAddress;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

}
