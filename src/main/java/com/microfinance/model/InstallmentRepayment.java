package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class InstallmentRepayment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
		private long id;
		private String groupCodeid;
	    private String openingDate;
	    private String communityName;
	    private String branchName;
	    private String loanSchemeName;
	    private String communityAddress;
	    private String contactNumber;
	    private String paymentMode;
	    private String loanPurpose;
	    private String term;
	    private String rateOfInterest;
	    private String interestType;
	    private String loanAmount;
	    private String emiAmount;

	    private String processingCharges;
	    private String gstValue;
	    private String legalCharges;
	    private String insuranceAmount;
	    private String valuationCharges;

	    private String financialConsultantCode;
	    private String financialConsultantName;
	    private String chequeDeductedInCash;
	    private String paymentRemarks;
	    private String transactionDate;
	    private String paymentStatus;
	    private String paidBy;
		
	    
		public String getGroupCodeid() {
			return groupCodeid;
		}
		public void setGroupCodeid(String groupCodeid) {
			this.groupCodeid = groupCodeid;
		}
		public String getOpeningDate() {
			return openingDate;
		}
		public void setOpeningDate(String openingDate) {
			this.openingDate = openingDate;
		}
		public long getId() {
			return id;
		}
		public void setId(long id) {
			this.id = id;
		}
		public String getCommunityName() {
			return communityName;
		}
		public void setCommunityName(String communityName) {
			this.communityName = communityName;
		}
		public String getBranchName() {
			return branchName;
		}
		public void setBranchName(String branchName) {
			this.branchName = branchName;
		}
		public String getLoanSchemeName() {
			return loanSchemeName;
		}
		public void setLoanSchemeName(String loanSchemeName) {
			this.loanSchemeName = loanSchemeName;
		}
		public String getCommunityAddress() {
			return communityAddress;
		}
		public void setCommunityAddress(String communityAddress) {
			this.communityAddress = communityAddress;
		}
		public String getContactNumber() {
			return contactNumber;
		}
		public void setContactNumber(String contactNumber) {
			this.contactNumber = contactNumber;
		}
		public String getPaymentMode() {
			return paymentMode;
		}
		public void setPaymentMode(String paymentMode) {
			this.paymentMode = paymentMode;
		}
		public String getLoanPurpose() {
			return loanPurpose;
		}
		public void setLoanPurpose(String loanPurpose) {
			this.loanPurpose = loanPurpose;
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
		public String getEmiAmount() {
			return emiAmount;
		}
		public void setEmiAmount(String emiAmount) {
			this.emiAmount = emiAmount;
		}
		public String getProcessingCharges() {
			return processingCharges;
		}
		public void setProcessingCharges(String processingCharges) {
			this.processingCharges = processingCharges;
		}
		public String getGstValue() {
			return gstValue;
		}
		public void setGstValue(String gstValue) {
			this.gstValue = gstValue;
		}
		public String getLegalCharges() {
			return legalCharges;
		}
		public void setLegalCharges(String legalCharges) {
			this.legalCharges = legalCharges;
		}
		public String getInsuranceAmount() {
			return insuranceAmount;
		}
		public void setInsuranceAmount(String insuranceAmount) {
			this.insuranceAmount = insuranceAmount;
		}
		public String getValuationCharges() {
			return valuationCharges;
		}
		public void setValuationCharges(String valuationCharges) {
			this.valuationCharges = valuationCharges;
		}
		public String getFinancialConsultantCode() {
			return financialConsultantCode;
		}
		public void setFinancialConsultantCode(String financialConsultantCode) {
			this.financialConsultantCode = financialConsultantCode;
		}
		public String getFinancialConsultantName() {
			return financialConsultantName;
		}
		public void setFinancialConsultantName(String financialConsultantName) {
			this.financialConsultantName = financialConsultantName;
		}
		public String getChequeDeductedInCash() {
			return chequeDeductedInCash;
		}
		public void setChequeDeductedInCash(String chequeDeductedInCash) {
			this.chequeDeductedInCash = chequeDeductedInCash;
		}
		public String getPaymentRemarks() {
			return paymentRemarks;
		}
		public void setPaymentRemarks(String paymentRemarks) {
			this.paymentRemarks = paymentRemarks;
		}
		public String getTransactionDate() {
			return transactionDate;
		}
		public void setTransactionDate(String transactionDate) {
			this.transactionDate = transactionDate;
		}
		public String getPaymentStatus() {
			return paymentStatus;
		}
		public void setPaymentStatus(String paymentStatus) {
			this.paymentStatus = paymentStatus;
		}
		public String getPaidBy() {
			return paidBy;
		}
		public void setPaidBy(String paidBy) {
			this.paidBy = paidBy;
		}
	    
	    

}
