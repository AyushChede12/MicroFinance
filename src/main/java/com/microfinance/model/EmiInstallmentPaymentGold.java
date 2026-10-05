package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class EmiInstallmentPaymentGold {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String goldID;
	private String paidInstallments;
	private String loanDate;
	private String customerCode;
	private String customerName;
	private String loanPlanName;
	private String interestType;
	private String loanMode;
	private String loanTerm;
	private String emiPayment;
	private String typeOfLoan;
	private String rateOfInterest;
	private String contactNo;
	private String loanAmount;
	private String branchName;

	// Payment Details
	private String installment;
	private String registrationDate;
	private String dueAmount;
	private String pendingInterest;
	private String pendingPrincipal;
	private String totalDue;
	private String paymentAmount;
	private String paymentDate;
	private String netAmount;
	private String paymentMode;
	private String financialCode;
	private String financialName;
	private String remarks;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getGoldID() {
		return goldID;
	}

	public void setGoldID(String goldID) {
		this.goldID = goldID;
	}

	public String getPaidInstallments() {
		return paidInstallments;
	}

	public void setPaidInstallments(String paidInstallments) {
		this.paidInstallments = paidInstallments;
	}

	public String getLoanDate() {
		return loanDate;
	}

	public void setLoanDate(String loanDate) {
		this.loanDate = loanDate;
	}

	public String getCustomerCode() {
		return customerCode;
	}

	public void setCustomerCode(String customerCode) {
		this.customerCode = customerCode;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getLoanPlanName() {
		return loanPlanName;
	}

	public void setLoanPlanName(String loanPlanName) {
		this.loanPlanName = loanPlanName;
	}

	public String getInterestType() {
		return interestType;
	}

	public void setInterestType(String interestType) {
		this.interestType = interestType;
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

	public String getEmiPayment() {
		return emiPayment;
	}

	public void setEmiPayment(String emiPayment) {
		this.emiPayment = emiPayment;
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

	public String getContactNo() {
		return contactNo;
	}

	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	public String getLoanAmount() {
		return loanAmount;
	}

	public void setLoanAmount(String loanAmount) {
		this.loanAmount = loanAmount;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	public String getInstallment() {
		return installment;
	}

	public void setInstallment(String installment) {
		this.installment = installment;
	}

	public String getRegistrationDate() {
		return registrationDate;
	}

	public void setRegistrationDate(String registrationDate) {
		this.registrationDate = registrationDate;
	}

	public String getDueAmount() {
		return dueAmount;
	}

	public void setDueAmount(String dueAmount) {
		this.dueAmount = dueAmount;
	}

	public String getPendingInterest() {
		return pendingInterest;
	}

	public void setPendingInterest(String pendingInterest) {
		this.pendingInterest = pendingInterest;
	}

	public String getPendingPrincipal() {
		return pendingPrincipal;
	}

	public void setPendingPrincipal(String pendingPrincipal) {
		this.pendingPrincipal = pendingPrincipal;
	}

	public String getTotalDue() {
		return totalDue;
	}

	public void setTotalDue(String totalDue) {
		this.totalDue = totalDue;
	}

	public String getPaymentAmount() {
		return paymentAmount;
	}

	public void setPaymentAmount(String paymentAmount) {
		this.paymentAmount = paymentAmount;
	}

	public String getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(String paymentDate) {
		this.paymentDate = paymentDate;
	}

	public String getNetAmount() {
		return netAmount;
	}

	public void setNetAmount(String netAmount) {
		this.netAmount = netAmount;
	}

	public String getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}

	public String getFinancialCode() {
		return financialCode;
	}

	public void setFinancialCode(String financialCode) {
		this.financialCode = financialCode;
	}

	public String getFinancialName() {
		return financialName;
	}

	public void setFinancialName(String financialName) {
		this.financialName = financialName;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

}
