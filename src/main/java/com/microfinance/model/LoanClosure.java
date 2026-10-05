package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class LoanClosure {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String loanId;
	private String loanDate;
	private String memberId;
	private String memberName;
	private String relativeDetails;
	private String contactNo;
	private String address;

	private String branchName;
	private String loanPlanName;
	private String typeOfLoan;
	private String loanMode;
	private String loanTerm;
	private String rateOfInterest;
	private String loanAmount;
	private String interestType;
	private String emiPayment;
	private String totalinterestofLoan;
	private String sanctionedAmount;
	private String totalPayableofLoan;
	
	private String interestDue;
	private String principaldue;
	private String amountPaid;
	private String balanceLoanAmount;
	private String dueDate;
	private String paymentBranch;
	private String fine;
	private String netAmount;
	private String noOfInst;

	// Loan Payment
	private String paymentDate;
	private String paymentMode;
	private String ref_UpiId;
	private String charges;
	private String remarks;
	private String chequeDate;
	private String chequeNo;
	private String closureDate;

	private String financialConsultantId;
	private String financialConsultantName;
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
	public String getTypeOfLoan() {
		return typeOfLoan;
	}
	public void setTypeOfLoan(String typeOfLoan) {
		this.typeOfLoan = typeOfLoan;
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
	public String getTotalinterestofLoan() {
		return totalinterestofLoan;
	}
	public void setTotalinterestofLoan(String totalinterestofLoan) {
		this.totalinterestofLoan = totalinterestofLoan;
	}
	public String getSanctionedAmount() {
		return sanctionedAmount;
	}
	public void setSanctionedAmount(String sanctionedAmount) {
		this.sanctionedAmount = sanctionedAmount;
	}
	public String getTotalPayableofLoan() {
		return totalPayableofLoan;
	}
	public void setTotalPayableofLoan(String totalPayableofLoan) {
		this.totalPayableofLoan = totalPayableofLoan;
	}
	public String getInterestDue() {
		return interestDue;
	}
	public void setInterestDue(String interestDue) {
		this.interestDue = interestDue;
	}
	public String getPrincipaldue() {
		return principaldue;
	}
	public void setPrincipaldue(String principaldue) {
		this.principaldue = principaldue;
	}
	public String getAmountPaid() {
		return amountPaid;
	}
	public void setAmountPaid(String amountPaid) {
		this.amountPaid = amountPaid;
	}
	public String getBalanceLoanAmount() {
		return balanceLoanAmount;
	}
	public void setBalanceLoanAmount(String balanceLoanAmount) {
		this.balanceLoanAmount = balanceLoanAmount;
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
	public String getFine() {
		return fine;
	}
	public void setFine(String fine) {
		this.fine = fine;
	}
	public String getNetAmount() {
		return netAmount;
	}
	public void setNetAmount(String netAmount) {
		this.netAmount = netAmount;
	}
	public String getPaymentDate() {
		return paymentDate;
	}
	public void setPaymentDate(String paymentDate) {
		this.paymentDate = paymentDate;
	}
	public String getPaymentMode() {
		return paymentMode;
	}
	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
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
	public String getLoanStatus() {
		return loanStatus;
	}
	public void setLoanStatus(String loanStatus) {
		this.loanStatus = loanStatus;
	}
	public String getNoOfInst() {
		return noOfInst;
	}
	public void setNoOfInst(String noOfInst) {
		this.noOfInst = noOfInst;
	}
	public String getClosureDate() {
		return closureDate;
	}
	public void setClosureDate(String closureDate) {
		this.closureDate = closureDate;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	
	
	

	

}


