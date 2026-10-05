package com.microfinance.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class SavingAccountActivity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String selectSavingTransactionId;
	private String transactionDate;
	private String selectBranchName;
	private String accountNumber;
	private String customerCode;
	private String customerName;
	private String contactNumber;
	private String jointHolderName;
	private String savingPlanName;
	private String averageBalance;
	private String transactionFor;
	private String comments;
	private String transactionType;
	private String transactionAmount;
	private String payBy;
	private String chequeNo;
	private String chequeDate;
	private String depositAcc1;
	private String depositAcc2;
	private String refNumber1;
	private String depositAcc3;
	private String refNumber2;

	@Column(name = "is_approved")
	private boolean isApproved;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSelectSavingTransactionId() {
		return selectSavingTransactionId;
	}

	public void setSelectSavingTransactionId(String selectSavingTransactionId) {
		this.selectSavingTransactionId = selectSavingTransactionId;
	}

	public String getTransactionDate() {
		return transactionDate;
	}

	public void setTransactionDate(String transactionDate) {
		this.transactionDate = transactionDate;
	}

	public String getSelectBranchName() {
		return selectBranchName;
	}

	public void setSelectBranchName(String selectBranchName) {
		this.selectBranchName = selectBranchName;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
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

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getJointHolderName() {
		return jointHolderName;
	}

	public void setJointHolderName(String jointHolderName) {
		this.jointHolderName = jointHolderName;
	}

	public String getSavingPlanName() {
		return savingPlanName;
	}

	public void setSavingPlanName(String savingPlanName) {
		this.savingPlanName = savingPlanName;
	}

	public String getAverageBalance() {
		return averageBalance;
	}

	public void setAverageBalance(String averageBalance) {
		this.averageBalance = averageBalance;
	}

	public String getTransactionFor() {
		return transactionFor;
	}

	public void setTransactionFor(String transactionFor) {
		this.transactionFor = transactionFor;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}

	public String getTransactionAmount() {
		return transactionAmount;
	}

	public void setTransactionAmount(String transactionAmount) {
		this.transactionAmount = transactionAmount;
	}

	public String getPayBy() {
		return payBy;
	}

	public void setPayBy(String payBy) {
		this.payBy = payBy;
	}

	public String getChequeNo() {
		return chequeNo;
	}

	public void setChequeNo(String chequeNo) {
		this.chequeNo = chequeNo;
	}

	public String getChequeDate() {
		return chequeDate;
	}

	public void setChequeDate(String chequeDate) {
		this.chequeDate = chequeDate;
	}

	public String getDepositAcc1() {
		return depositAcc1;
	}

	public void setDepositAcc1(String depositAcc1) {
		this.depositAcc1 = depositAcc1;
	}

	public String getDepositAcc2() {
		return depositAcc2;
	}

	public void setDepositAcc2(String depositAcc2) {
		this.depositAcc2 = depositAcc2;
	}

	public String getRefNumber1() {
		return refNumber1;
	}

	public void setRefNumber1(String refNumber1) {
		this.refNumber1 = refNumber1;
	}

	public String getDepositAcc3() {
		return depositAcc3;
	}

	public void setDepositAcc3(String depositAcc3) {
		this.depositAcc3 = depositAcc3;
	}

	public String getRefNumber2() {
		return refNumber2;
	}

	public void setRefNumber2(String refNumber2) {
		this.refNumber2 = refNumber2;
	}

	public boolean isApproved() {
		return isApproved;
	}

	public void setApproved(boolean isApproved) {
		this.isApproved = isApproved;
	}

}
