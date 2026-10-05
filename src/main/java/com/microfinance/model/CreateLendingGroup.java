package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class CreateLendingGroup {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	// Loan Plan Details
	private Long id;
	private String planCode;
    private String loanSchemeName;
    private String minimumAge;
    private String term;
    
    private String branchName;
    private String maximumAge;
    private String minLoanAmt;
    private String rateOfInterest; 
    private String emiFrequency;
    private String interestType;
    private String maximumLoanAmount;
    private String securityType;
    private String emiType;
    private String planActivationStatus;
    private String totalAmount;

    // Payment Deductions
    private String processingFeePercent;
    private String legalChargesPercent;
    private String gstPercent;
    private String insuranceFeePercent;
    private String valuationFeePercent;

    // Late Fee Information
    private String lateAllowanceDays;
    private String penaltyMode;
    private String monthlyPenalty;
    
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getLoanSchemeName() {
		return loanSchemeName;
	}
	public void setLoanSchemeName(String loanSchemeName) {
		this.loanSchemeName = loanSchemeName;
	}
	public String getMinimumAge() {
		return minimumAge;
	}
	public void setMinimumAge(String minimumAge) {
		this.minimumAge = minimumAge;
	}
	
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	public String getMaximumAge() {
		return maximumAge;
	}
	public void setMaximumAge(String maximumAge) {
		this.maximumAge = maximumAge;
	}
	public String getMinLoanAmt() {
		return minLoanAmt;
	}
	public void setMinLoanAmt(String minLoanAmt) {
		this.minLoanAmt = minLoanAmt;
	}
	public String getRateOfInterest() {
		return rateOfInterest;
	}
	public void setRateOfInterest(String rateOfInterest) {
		this.rateOfInterest = rateOfInterest;
	}
	public String getEmiFrequency() {
		return emiFrequency;
	}
	public void setEmiFrequency(String emiFrequency) {
		this.emiFrequency = emiFrequency;
	}
	public String getInterestType() {
		return interestType;
	}
	public void setInterestType(String interestType) {
		this.interestType = interestType;
	}
	public String getMaximumLoanAmount() {
		return maximumLoanAmount;
	}
	public void setMaximumLoanAmount(String maximumLoanAmount) {
		this.maximumLoanAmount = maximumLoanAmount;
	}
	public String getSecurityType() {
		return securityType;
	}
	public void setSecurityType(String securityType) {
		this.securityType = securityType;
	}
	public String getEmiType() {
		return emiType;
	}
	public void setEmiType(String emiType) {
		this.emiType = emiType;
	}
	public String getPlanActivationStatus() {
		return planActivationStatus;
	}
	public void setPlanActivationStatus(String planActivationStatus) {
		this.planActivationStatus = planActivationStatus;
	}
	public String getProcessingFeePercent() {
		return processingFeePercent;
	}
	public void setProcessingFeePercent(String processingFeePercent) {
		this.processingFeePercent = processingFeePercent;
	}
	public String getLegalChargesPercent() {
		return legalChargesPercent;
	}
	public void setLegalChargesPercent(String legalChargesPercent) {
		this.legalChargesPercent = legalChargesPercent;
	}
	public String getGstPercent() {
		return gstPercent;
	}
	public void setGstPercent(String gstPercent) {
		this.gstPercent = gstPercent;
	}
	public String getInsuranceFeePercent() {
		return insuranceFeePercent;
	}
	public void setInsuranceFeePercent(String insuranceFeePercent) {
		this.insuranceFeePercent = insuranceFeePercent;
	}
	public String getValuationFeePercent() {
		return valuationFeePercent;
	}
	public void setValuationFeePercent(String valuationFeePercent) {
		this.valuationFeePercent = valuationFeePercent;
	}
	public String getLateAllowanceDays() {
		return lateAllowanceDays;
	}
	public void setLateAllowanceDays(String lateAllowanceDays) {
		this.lateAllowanceDays = lateAllowanceDays;
	}
	public String getPenaltyMode() {
		return penaltyMode;
	}
	public void setPenaltyMode(String penaltyMode) {
		this.penaltyMode = penaltyMode;
	}
	public String getMonthlyPenalty() {
		return monthlyPenalty;
	}
	public void setMonthlyPenalty(String monthlyPenalty) {
		this.monthlyPenalty = monthlyPenalty;
	}
	public String getPlanCode() {
		return planCode;
	}
	public void setPlanCode(String planCode) {
		this.planCode = planCode;
	}
	public String getTerm() {
		return term;
	}
	public void setTerm(String term) {
		this.term = term;
	}
	public String getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(String totalAmount) {
		this.totalAmount = totalAmount;
	}
	

}
