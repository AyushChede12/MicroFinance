package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class RegularInstallmentPayment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private long id ;
	private String regularLoanIdname;
	private String regularDate;
	private String regularPlanName;
	private String regulatrIntesteType;
	private String regularDuration;
	private String regularPaymnetEmi;
	private String familyMembername;
	private String loanCategory;
	private String regularPhoneNo;
	private String regularAmountLoan;
	private String totalPrincipalLoan;
	private String BranchAddress;
	private String rateOfIntrest;
	private String totalPaybleLoan;
	
	//Payment Details
	
	private String dueInterest;
	private String registrationDate;
	private String duePrincipal;
	private String dueAmounttotal;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getRegularLoanIdname() {
		return regularLoanIdname;
	}
	public void setRegularLoanIdname(String regularLoanIdname) {
		this.regularLoanIdname = regularLoanIdname;
	}
	public String getRegularDate() {
		return regularDate;
	}
	public void setRegularDate(String regularDate) {
		this.regularDate = regularDate;
	}
	public String getRegularPlanName() {
		return regularPlanName;
	}
	public void setRegularPlanName(String regularPlanName) {
		this.regularPlanName = regularPlanName;
	}
	public String getRegulatrIntesteType() {
		return regulatrIntesteType;
	}
	public void setRegulatrIntesteType(String regulatrIntesteType) {
		this.regulatrIntesteType = regulatrIntesteType;
	}
	public String getRegularDuration() {
		return regularDuration;
	}
	public void setRegularDuration(String regularDuration) {
		this.regularDuration = regularDuration;
	}
	public String getRegularPaymnetEmi() {
		return regularPaymnetEmi;
	}
	public void setRegularPaymnetEmi(String regularPaymnetEmi) {
		this.regularPaymnetEmi = regularPaymnetEmi;
	}
	public String getFamilyMembername() {
		return familyMembername;
	}
	public void setFamilyMembername(String familyMembername) {
		this.familyMembername = familyMembername;
	}
	public String getLoanCategory() {
		return loanCategory;
	}
	public void setLoanCategory(String loanCategory) {
		this.loanCategory = loanCategory;
	}
	public String getRegularPhoneNo() {
		return regularPhoneNo;
	}
	public void setRegularPhoneNo(String regularPhoneNo) {
		this.regularPhoneNo = regularPhoneNo;
	}
	public String getRegularAmountLoan() {
		return regularAmountLoan;
	}
	public void setRegularAmountLoan(String regularAmountLoan) {
		this.regularAmountLoan = regularAmountLoan;
	}
	public String getTotalPrincipalLoan() {
		return totalPrincipalLoan;
	}
	public void setTotalPrincipalLoan(String totalPrincipalLoan) {
		this.totalPrincipalLoan = totalPrincipalLoan;
	}
	public String getBranchAddress() {
		return BranchAddress;
	}
	public void setBranchAddress(String branchAddress) {
		BranchAddress = branchAddress;
	}
	public String getRateOfIntrest() {
		return rateOfIntrest;
	}
	public void setRateOfIntrest(String rateOfIntrest) {
		this.rateOfIntrest = rateOfIntrest;
	}
	public String getTotalPaybleLoan() {
		return totalPaybleLoan;
	}
	public void setTotalPaybleLoan(String totalPaybleLoan) {
		this.totalPaybleLoan = totalPaybleLoan;
	}
	public String getDueInterest() {
		return dueInterest;
	}
	public void setDueInterest(String dueInterest) {
		this.dueInterest = dueInterest;
	}
	public String getRegistrationDate() {
		return registrationDate;
	}
	public void setRegistrationDate(String registrationDate) {
		this.registrationDate = registrationDate;
	}
	public String getDuePrincipal() {
		return duePrincipal;
	}
	public void setDuePrincipal(String duePrincipal) {
		this.duePrincipal = duePrincipal;
	}
	public String getDueAmounttotal() {
		return dueAmounttotal;
	}
	public void setDueAmounttotal(String dueAmounttotal) {
		this.dueAmounttotal = dueAmounttotal;
	}
	public String getPaymentAmount() {
		return paymentAmount;
	}
	public void setPaymentAmount(String paymentAmount) {
		this.paymentAmount = paymentAmount;
	}
	public String getRegularDueDate() {
		return regularDueDate;
	}
	public void setRegularDueDate(String regularDueDate) {
		this.regularDueDate = regularDueDate;
	}
	public String getNetAmount() {
		return netAmount;
	}
	public void setNetAmount(String netAmount) {
		this.netAmount = netAmount;
	}
	public String getRegularLoanID() {
		return regularLoanID;
	}
	public void setRegularLoanID(String regularLoanID) {
		this.regularLoanID = regularLoanID;
	}
	public String getRegularPaymentSource() {
		return regularPaymentSource;
	}
	public void setRegularPaymentSource(String regularPaymentSource) {
		this.regularPaymentSource = regularPaymentSource;
	}
	public String getRegularDownPayment() {
		return regularDownPayment;
	}
	public void setRegularDownPayment(String regularDownPayment) {
		this.regularDownPayment = regularDownPayment;
	}
	public String getAdvisorFullName() {
		return advisorFullName;
	}
	public void setAdvisorFullName(String advisorFullName) {
		this.advisorFullName = advisorFullName;
	}
	public String getRegularRemarkSection() {
		return regularRemarkSection;
	}
	public void setRegularRemarkSection(String regularRemarkSection) {
		this.regularRemarkSection = regularRemarkSection;
	}
	private String paymentAmount;
	private String regularDueDate;
	private String netAmount;
	private String regularLoanID;
	private String regularPaymentSource;
	private String regularDownPayment;
	private String advisorFullName;
	private String regularRemarkSection;
	
	
	
	
	
	
	
	

}
