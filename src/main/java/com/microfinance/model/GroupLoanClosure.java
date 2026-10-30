package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class GroupLoanClosure {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String groupCode;
	private String loanStartDate;
	private String loanScheme;
	private String interestType;
	private String agentCode;
	private String agentName;
	private String loanTenure;
	private String monthlyInstallment;
	private String nomineeDetails;
	private String interestAmount;
	private String contactNo;
	private String principalAmount;
	private String totalLoanPrincipal;
	private String loanBranch;
	private String rateOfInterest;
	private String totalPayableAmount;

	// Settlement / Payment Details
	private String settledInterest;
	private String interestPending;
	private String settledPrincipal;
	private String outstandingPrincipal;
	private String totalAmountPaid;
	private String totalOutstanding;
	private String loanRemark;
	private String paymentBranch;
	private String paymentDate;
	private String paidBy;
	private String loanClosureFee;
	private String accountNo;
	private String status;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getGroupCode() {
		return groupCode;
	}

	public void setGroupCode(String groupCode) {
		this.groupCode = groupCode;
	}

	public String getLoanStartDate() {
		return loanStartDate;
	}

	public void setLoanStartDate(String loanStartDate) {
		this.loanStartDate = loanStartDate;
	}

	public String getLoanScheme() {
		return loanScheme;
	}

	public void setLoanScheme(String loanScheme) {
		this.loanScheme = loanScheme;
	}

	public String getInterestType() {
		return interestType;
	}

	public void setInterestType(String interestType) {
		this.interestType = interestType;
	}

	public String getAgentCode() {
		return agentCode;
	}

	public void setAgentCode(String agentCode) {
		this.agentCode = agentCode;
	}

	public String getAgentName() {
		return agentName;
	}

	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}

	public String getLoanTenure() {
		return loanTenure;
	}

	public void setLoanTenure(String loanTenure) {
		this.loanTenure = loanTenure;
	}

	public String getMonthlyInstallment() {
		return monthlyInstallment;
	}

	public void setMonthlyInstallment(String monthlyInstallment) {
		this.monthlyInstallment = monthlyInstallment;
	}

	public String getNomineeDetails() {
		return nomineeDetails;
	}

	public void setNomineeDetails(String nomineeDetails) {
		this.nomineeDetails = nomineeDetails;
	}

	public String getInterestAmount() {
		return interestAmount;
	}

	public void setInterestAmount(String interestAmount) {
		this.interestAmount = interestAmount;
	}

	public String getContactNo() {
		return contactNo;
	}

	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	public String getPrincipalAmount() {
		return principalAmount;
	}

	public void setPrincipalAmount(String principalAmount) {
		this.principalAmount = principalAmount;
	}

	public String getTotalLoanPrincipal() {
		return totalLoanPrincipal;
	}

	public void setTotalLoanPrincipal(String totalLoanPrincipal) {
		this.totalLoanPrincipal = totalLoanPrincipal;
	}

	public String getLoanBranch() {
		return loanBranch;
	}

	public void setLoanBranch(String loanBranch) {
		this.loanBranch = loanBranch;
	}

	public String getRateOfInterest() {
		return rateOfInterest;
	}

	public void setRateOfInterest(String rateOfInterest) {
		this.rateOfInterest = rateOfInterest;
	}

	public String getTotalPayableAmount() {
		return totalPayableAmount;
	}

	public void setTotalPayableAmount(String totalPayableAmount) {
		this.totalPayableAmount = totalPayableAmount;
	}

	public String getSettledInterest() {
		return settledInterest;
	}

	public void setSettledInterest(String settledInterest) {
		this.settledInterest = settledInterest;
	}

	public String getInterestPending() {
		return interestPending;
	}

	public void setInterestPending(String interestPending) {
		this.interestPending = interestPending;
	}

	public String getSettledPrincipal() {
		return settledPrincipal;
	}

	public void setSettledPrincipal(String settledPrincipal) {
		this.settledPrincipal = settledPrincipal;
	}

	public String getOutstandingPrincipal() {
		return outstandingPrincipal;
	}

	public void setOutstandingPrincipal(String outstandingPrincipal) {
		this.outstandingPrincipal = outstandingPrincipal;
	}

	public String getTotalAmountPaid() {
		return totalAmountPaid;
	}

	public void setTotalAmountPaid(String totalAmountPaid) {
		this.totalAmountPaid = totalAmountPaid;
	}

	public String getTotalOutstanding() {
		return totalOutstanding;
	}

	public void setTotalOutstanding(String totalOutstanding) {
		this.totalOutstanding = totalOutstanding;
	}

	public String getLoanRemark() {
		return loanRemark;
	}

	public void setLoanRemark(String loanRemark) {
		this.loanRemark = loanRemark;
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

	public String getPaidBy() {
		return paidBy;
	}

	public void setPaidBy(String paidBy) {
		this.paidBy = paidBy;
	}

	public String getLoanClosureFee() {
		return loanClosureFee;
	}

	public void setLoanClosureFee(String loanClosureFee) {
		this.loanClosureFee = loanClosureFee;
	}

	public String getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}

