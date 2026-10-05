package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class LoanPayment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String memberName;
	private String memberId;
	private String loanId;
	private String loanPlanName;
	private String loanMode;
	private String loanTerm;
	private String rateOfInterest;
	private String loanAmount;
	private String interestType;
	private String emiPayment;
	private String loanDate;
	private String branchName;
	private String typeOfLoan;

	// Deduction Details
	private String processingFee;
	private String legalCharges;
	private String gst;
	private String insuranceFee;
	private String valuationFees;
	private String stationaryFee;

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
	private String noOfInst;
	private String amountDue;

	public String getMemberName() {
		return memberName;
	}

	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

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

	public String getLoanPlanName() {
		return loanPlanName;
	}

	public void setLoanPlanName(String loanPlanName) {
		this.loanPlanName = loanPlanName;
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

	public String getLoanDate() {
		return loanDate;
	}

	public void setLoanDate(String loanDate) {
		this.loanDate = loanDate;
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

	public String getInsuranceFee() {
		return insuranceFee;
	}

	public void setInsuranceFee(String insuranceFee) {
		this.insuranceFee = insuranceFee;
	}

	public String getValuationFees() {
		return valuationFees;
	}

	public void setValuationFees(String valuationFees) {
		this.valuationFees = valuationFees;
	}

	public String getStationaryFee() {
		return stationaryFee;
	}

	public void setStationaryFee(String stationaryFee) {
		this.stationaryFee = stationaryFee;
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

	public String getNoOfInst() {
		return noOfInst;
	}

	public void setNoOfInst(String noOfInst) {
		this.noOfInst = noOfInst;
	}

	public String getAmountDue() {
		return amountDue;
	}

	public void setAmountDue(String amountDue) {
		this.amountDue = amountDue;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	public String getTypeOfLoan() {
		return typeOfLoan;
	}

	public void setTypeOfLoan(String typeOfLoan) {
		this.typeOfLoan = typeOfLoan;
	}

}
