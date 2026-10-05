package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class GoldLoanClose {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String goldID;
	private String dateOfLoan;
	private String customerCode;
	private String customerName;
	private String contactNo;
	private String branchName;
	private String loanPlanName;
	private String loanTerm;
	private String loanMode;
	private String loanAmount;
	private String rateOfInterest;
	private String interestType;
	private String emiPayment;
	private String totalInterestOfLoan;
	private String sanctionedAmount;
	private String totalPayableOfLoan;

	// Payment Details
	private String noOfInstPaid;
	private String interestDue;
	private String principalDue;
	private String amountPaidTillDate;
	private String loanBalanceAmount;
	private String dueDate;
	private String paymentBranch;
	private String paymentDate;
	private String deductFine;
	private String deductFineAmount;
	private String paymentAmount;
	private String netAmount;
	private String financialCode;
	private String financialName;
	private String remarks;
	private String goldLoanStatus;

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

	public String getDateOfLoan() {
		return dateOfLoan;
	}

	public void setDateOfLoan(String dateOfLoan) {
		this.dateOfLoan = dateOfLoan;
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

	public String getContactNo() {
		return contactNo;
	}

	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
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

	public String getLoanTerm() {
		return loanTerm;
	}

	public void setLoanTerm(String loanTerm) {
		this.loanTerm = loanTerm;
	}

	public String getLoanMode() {
		return loanMode;
	}

	public void setLoanMode(String loanMode) {
		this.loanMode = loanMode;
	}

	public String getLoanAmount() {
		return loanAmount;
	}

	public void setLoanAmount(String loanAmount) {
		this.loanAmount = loanAmount;
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

	public String getEmiPayment() {
		return emiPayment;
	}

	public void setEmiPayment(String emiPayment) {
		this.emiPayment = emiPayment;
	}

	public String getTotalInterestOfLoan() {
		return totalInterestOfLoan;
	}

	public void setTotalInterestOfLoan(String totalInterestOfLoan) {
		this.totalInterestOfLoan = totalInterestOfLoan;
	}

	public String getSanctionedAmount() {
		return sanctionedAmount;
	}

	public void setSanctionedAmount(String sanctionedAmount) {
		this.sanctionedAmount = sanctionedAmount;
	}

	public String getTotalPayableOfLoan() {
		return totalPayableOfLoan;
	}

	public void setTotalPayableOfLoan(String totalPayableOfLoan) {
		this.totalPayableOfLoan = totalPayableOfLoan;
	}

	public String getNoOfInstPaid() {
		return noOfInstPaid;
	}

	public void setNoOfInstPaid(String noOfInstPaid) {
		this.noOfInstPaid = noOfInstPaid;
	}

	public String getInterestDue() {
		return interestDue;
	}

	public void setInterestDue(String interestDue) {
		this.interestDue = interestDue;
	}

	public String getPrincipalDue() {
		return principalDue;
	}

	public void setPrincipalDue(String principalDue) {
		this.principalDue = principalDue;
	}

	public String getAmountPaidTillDate() {
		return amountPaidTillDate;
	}

	public void setAmountPaidTillDate(String amountPaidTillDate) {
		this.amountPaidTillDate = amountPaidTillDate;
	}

	public String getLoanBalanceAmount() {
		return loanBalanceAmount;
	}

	public void setLoanBalanceAmount(String loanBalanceAmount) {
		this.loanBalanceAmount = loanBalanceAmount;
	}

	public String getDueDate() {
		return dueDate;
	}

	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}

	public String getPaymentBranch() {
		return paymentBranch;
	}

	public void setPaymentBranch(String paymentBranch) {
		this.paymentBranch = paymentBranch;
	}

	public String getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(String paymentDate) {
		this.paymentDate = paymentDate;
	}

	public String getDeductFine() {
		return deductFine;
	}

	public void setDeductFine(String deductFine) {
		this.deductFine = deductFine;
	}

	public String getDeductFineAmount() {
		return deductFineAmount;
	}

	public void setDeductFineAmount(String deductFineAmount) {
		this.deductFineAmount = deductFineAmount;
	}

	public String getPaymentAmount() {
		return paymentAmount;
	}

	public void setPaymentAmount(String paymentAmount) {
		this.paymentAmount = paymentAmount;
	}

	public String getNetAmount() {
		return netAmount;
	}

	public void setNetAmount(String netAmount) {
		this.netAmount = netAmount;
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

	public String getGoldLoanStatus() {
		return goldLoanStatus;
	}

	public void setGoldLoanStatus(String goldLoanStatus) {
		this.goldLoanStatus = goldLoanStatus;
	}

}
