package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TransferShare {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private Long id;
	private String findByCode;
	private String customerName;
	private String startDate;
	private String previousAccountBalance;
	private String previousShareCount;
	private String baseValue;
	private String branch;
	private String dateOfTransfer;
	private String shareIssuedBy;
	private String noOfShare;
	private String amountTransferred;
	private String balanceShares;
	private String modeOfPayment;
	private String comments;
	private String certificateNo;
	private boolean isApproved;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getFindByCode() {
		return findByCode;
	}
	public void setFindByCode(String findByCode) {
		this.findByCode = findByCode;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getPreviousAccountBalance() {
		return previousAccountBalance;
	}
	public void setPreviousAccountBalance(String previousAccountBalance) {
		this.previousAccountBalance = previousAccountBalance;
	}
	public String getPreviousShareCount() {
		return previousShareCount;
	}
	public void setPreviousShareCount(String previousShareCount) {
		this.previousShareCount = previousShareCount;
	}
	public String getBaseValue() {
		return baseValue;
	}
	public void setBaseValue(String baseValue) {
		this.baseValue = baseValue;
	}
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
	public String getDateOfTransfer() {
		return dateOfTransfer;
	}
	public void setDateOfTransfer(String dateOfTransfer) {
		this.dateOfTransfer = dateOfTransfer;
	}
	public String getShareIssuedBy() {
		return shareIssuedBy;
	}
	public void setShareIssuedBy(String shareIssuedBy) {
		this.shareIssuedBy = shareIssuedBy;
	}
	public String getNoOfShare() {
		return noOfShare;
	}
	public void setNoOfShare(String noOfShare) {
		this.noOfShare = noOfShare;
	}
	public String getAmountTransferred() {
		return amountTransferred;
	}
	public void setAmountTransferred(String amountTransferred) {
		this.amountTransferred = amountTransferred;
	}
	public String getBalanceShares() {
		return balanceShares;
	}
	public void setBalanceShares(String balanceShares) {
		this.balanceShares = balanceShares;
	}
	public String getModeOfPayment() {
		return modeOfPayment;
	}
	public void setModeOfPayment(String modeOfPayment) {
		this.modeOfPayment = modeOfPayment;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public String getCertificateNo() {
		return certificateNo;
	}
	public void setCertificateNo(String certificateNo) {
		this.certificateNo = certificateNo;
	}
	public boolean isApproved() {
		return isApproved;
	}
	public void setApproved(boolean isApproved) {
		this.isApproved = isApproved;
	}
	
	
}
