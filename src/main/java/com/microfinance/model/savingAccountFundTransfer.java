package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class savingAccountFundTransfer {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String debitAccountNumber;
	private String debitCustomerCode;
	private String debitAccountBranch;
	private String debitAverageBalance;
	private String debitContactNumber;
	private String creditAccountNumber;
	private String creditCustomerCode;
	private String creditAccountBranch;
	private String creditAverageBalance;
	private String creditContactNumber;
	private String transferDate;
	private String amount;
	private String comment;
	private boolean isApproved;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDebitAccountNumber() {
		return debitAccountNumber;
	}
	public void setDebitAccountNumber(String debitAccountNumber) {
		this.debitAccountNumber = debitAccountNumber;
	}
	public String getDebitCustomerCode() {
		return debitCustomerCode;
	}
	public void setDebitCustomerCode(String debitCustomerCode) {
		this.debitCustomerCode = debitCustomerCode;
	}
	public String getDebitAccountBranch() {
		return debitAccountBranch;
	}
	public void setDebitAccountBranch(String debitAccountBranch) {
		this.debitAccountBranch = debitAccountBranch;
	}
	public String getDebitAverageBalance() {
		return debitAverageBalance;
	}
	public void setDebitAverageBalance(String debitAverageBalance) {
		this.debitAverageBalance = debitAverageBalance;
	}
	public String getDebitContactNumber() {
		return debitContactNumber;
	}
	public void setDebitContactNumber(String debitContactNumber) {
		this.debitContactNumber = debitContactNumber;
	}
	public String getCreditAccountNumber() {
		return creditAccountNumber;
	}
	public void setCreditAccountNumber(String creditAccountNumber) {
		this.creditAccountNumber = creditAccountNumber;
	}
	public String getCreditCustomerCode() {
		return creditCustomerCode;
	}
	public void setCreditCustomerCode(String creditCustomerCode) {
		this.creditCustomerCode = creditCustomerCode;
	}
	public String getCreditAccountBranch() {
		return creditAccountBranch;
	}
	public void setCreditAccountBranch(String creditAccountBranch) {
		this.creditAccountBranch = creditAccountBranch;
	}
	public String getCreditAverageBalance() {
		return creditAverageBalance;
	}
	public void setCreditAverageBalance(String creditAverageBalance) {
		this.creditAverageBalance = creditAverageBalance;
	}
	public String getCreditContactNumber() {
		return creditContactNumber;
	}
	public void setCreditContactNumber(String creditContactNumber) {
		this.creditContactNumber = creditContactNumber;
	}
	public String getTransferDate() {
		return transferDate;
	}
	public void setTransferDate(String transferDate) {
		this.transferDate = transferDate;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public boolean isApproved() {
		return isApproved;
	}
	public void setApproved(boolean isApproved) {
		this.isApproved = isApproved;
	}
	
	
}
