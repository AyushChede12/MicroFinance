package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class FlexiblepremiumrenewalPM {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String txnDate;
	private String branchName;
	private String selectPolicyId;
	private String empCode;
	private String memberCode;
	private String name;
	private String contactNumber;
	private String policyCode;
	private String maturityAmountRD;
	private String planBalance;
	private String paymentReason;
	private String comments;
	private String txnType;
	private String amount;
	private String modeOfPayment;
	private boolean isApproved;
	private String image1;
	private String image2;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getTxnDate() {
		return txnDate;
	}
	public void setTxnDate(String txnDate) {
		this.txnDate = txnDate;
	}
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	public String getSelectPolicyId() {
		return selectPolicyId;
	}
	public void setSelectPolicyId(String selectPolicyId) {
		this.selectPolicyId = selectPolicyId;
	}
	public String getEmpCode() {
		return empCode;
	}
	public void setEmpCode(String empCode) {
		this.empCode = empCode;
	}
	public String getMemberCode() {
		return memberCode;
	}
	public void setMemberCode(String memberCode) {
		this.memberCode = memberCode;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public String getPolicyCode() {
		return policyCode;
	}
	public void setPolicyCode(String policyCode) {
		this.policyCode = policyCode;
	}
	public String getMaturityAmountRD() {
		return maturityAmountRD;
	}
	public void setMaturityAmountRD(String maturityAmountRD) {
		this.maturityAmountRD = maturityAmountRD;
	}
	public String getPlanBalance() {
		return planBalance;
	}
	public void setPlanBalance(String planBalance) {
		this.planBalance = planBalance;
	}
	public String getPaymentReason() {
		return paymentReason;
	}
	public void setPaymentReason(String paymentReason) {
		this.paymentReason = paymentReason;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public String getTxnType() {
		return txnType;
	}
	public void setTxnType(String txnType) {
		this.txnType = txnType;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	public String getModeOfPayment() {
		return modeOfPayment;
	}
	public void setModeOfPayment(String modeOfPayment) {
		this.modeOfPayment = modeOfPayment;
	}
	public boolean isApproved() {
		return isApproved;
	}
	public void setApproved(boolean isApproved) {
		this.isApproved = isApproved;
	}
	public String getImage1() {
		return image1;
	}
	public void setImage1(String image1) {
		this.image1 = image1;
	}
	public String getImage2() {
		return image2;
	}
	public void setImage2(String image2) {
		this.image2 = image2;
	}
	
	

}