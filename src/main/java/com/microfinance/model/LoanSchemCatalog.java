package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class LoanSchemCatalog {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
    private String loanSchemeCode;
	private String loanPlaneName;
	private String typeLoan;
	private String age;
	private String loanTerm;
	private String emiType;
	private String loanAmount;
	private String loanMode;
	private String rateIntrestType;
	private String typeIntrest;
	private String typesecurity;
	
	
	//Deduction Details
	
	private String feeProcessing;
	private String chargesLegal;
	private String gst;
	private String feeInsurence;
	private String feeValuation;
	
	//Late Fine Details
	
	private String lateAllowanceday;
	private String modePanalty;
	private String pennaltyMonthly;
	private String planStatus;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getLoanSchemeCode() {
		return loanSchemeCode;
	}
	public void setLoanSchemeCode(String loanSchemeCode) {
		this.loanSchemeCode = loanSchemeCode;
	}
	public String getLoanPlaneName() {
		return loanPlaneName;
	}
	public void setLoanPlaneName(String loanPlaneName) {
		this.loanPlaneName = loanPlaneName;
	}
	
	public String getTypeLoan() {
		return typeLoan;
	}
	public void setTypeLoan(String typeLoan) {
		this.typeLoan = typeLoan;
	}
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
		this.age = age;
	}
	
	public String getLoanTerm() {
		return loanTerm;
	}
	public void setLoanTerm(String loanTerm) {
		this.loanTerm = loanTerm;
	}
	public String getEmiType() {
		return emiType;
	}
	public void setEmiType(String emiType) {
		this.emiType = emiType;
	}
	public String getLoanAmount() {
		return loanAmount;
	}
	public void setLoanAmount(String loanAmount) {
		this.loanAmount = loanAmount;
	}
	public String getLoanMode() {
		return loanMode;
	}
	public void setLoanMode(String loanMode) {
		this.loanMode = loanMode;
	}
	public String getRateIntrestType() {
		return rateIntrestType;
	}
	public void setRateIntrestType(String rateIntrestType) {
		this.rateIntrestType = rateIntrestType;
	}
	public String getTypeIntrest() {
		return typeIntrest;
	}
	public void setTypeIntrest(String typeIntrest) {
		this.typeIntrest = typeIntrest;
	}
	public String getTypesecurity() {
		return typesecurity;
	}
	public void setTypesecurity(String typesecurity) {
		this.typesecurity = typesecurity;
	}
	public String getFeeProcessing() {
		return feeProcessing;
	}
	public void setFeeProcessing(String feeProcessing) {
		this.feeProcessing = feeProcessing;
	}
	public String getChargesLegal() {
		return chargesLegal;
	}
	public void setChargesLegal(String chargesLegal) {
		this.chargesLegal = chargesLegal;
	}
	public String getGst() {
		return gst;
	}
	public void setGst(String gst) {
		this.gst = gst;
	}
	public String getFeeInsurence() {
		return feeInsurence;
	}
	public void setFeeInsurence(String feeInsurence) {
		this.feeInsurence = feeInsurence;
	}
	public String getFeeValuation() {
		return feeValuation;
	}
	public void setFeeValuation(String feeValuation) {
		this.feeValuation = feeValuation;
	}
	public String getLateAllowanceday() {
		return lateAllowanceday;
	}
	public void setLateAllowanceday(String lateAllowanceday) {
		this.lateAllowanceday = lateAllowanceday;
	}
	public String getModePanalty() {
		return modePanalty;
	}
	public void setModePanalty(String modePanalty) {
		this.modePanalty = modePanalty;
	}
	public String getPennaltyMonthly() {
		return pennaltyMonthly;
	}
	public void setPennaltyMonthly(String pennaltyMonthly) {
		this.pennaltyMonthly = pennaltyMonthly;
	}
	public String getPlanStatus() {
		return planStatus;
	}
	public void setPlanStatus(String planStatus) {
		this.planStatus = planStatus;
	}
	
	
	
	

}