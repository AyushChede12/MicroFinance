package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class AddnewinvestmentPM {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String policyCode;
	private String policyStartDate;
	private String memberSelection;
	private String customerName;
	private String dateofBirth;
	private String relationDetails;
	private String contactNo;
	private String suggestedNominee;
	private String ageOfNominee;
	private String relation;
	private String address;
	private String district;
	private String state;
	private String pinCode;
	private String tds;
	private String branchName;
	private String ModeOfOperation;
	private String jointMemCode;
	private String jointName;
	private String maturityDate;
	private String schemeType;
	private String schemeTerm;
	private String schemeMode;
	private String roi;
	private String policyAmount;
	private String depositAmount;
	private String introMCode;
	private String maturityAmount;
	private String MISInterest;
	private String paymentBy;
	private String schemeCode;
	private String remark;
	private String agent;
	private String smsSend;
	private String image1;
	private String image2;
	private boolean isApproved;
	private String lastInstPaid;
	private String paidAmount;
	private String amountDue;
	private String schemeName;
	private String lastPaymentDate;
	private String dueDate;
	private String noOfInstallments;
	private String modeOfPayment;
	private String balance;
	private String fdSplitAmounts;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPolicyCode() {
		return policyCode;
	}

	public void setPolicyCode(String policyCode) {
		this.policyCode = policyCode;
	}

	public String getPolicyStartDate() {
		return policyStartDate;
	}

	public void setPolicyStartDate(String policyStartDate) {
		this.policyStartDate = policyStartDate;
	}

	public String getMemberSelection() {
		return memberSelection;
	}

	public void setMemberSelection(String memberSelection) {
		this.memberSelection = memberSelection;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getDateofBirth() {
		return dateofBirth;
	}

	public void setDateofBirth(String dateofBirth) {
		this.dateofBirth = dateofBirth;
	}

	public String getRelationDetails() {
		return relationDetails;
	}

	public void setRelationDetails(String relationDetails) {
		this.relationDetails = relationDetails;
	}

	public String getContactNo() {
		return contactNo;
	}

	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	public String getSuggestedNominee() {
		return suggestedNominee;
	}

	public void setSuggestedNominee(String suggestedNominee) {
		this.suggestedNominee = suggestedNominee;
	}

	public String getAgeOfNominee() {
		return ageOfNominee;
	}

	public void setAgeOfNominee(String ageOfNominee) {
		this.ageOfNominee = ageOfNominee;
	}

	public String getRelation() {
		return relation;
	}

	public void setRelation(String relation) {
		this.relation = relation;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getPinCode() {
		return pinCode;
	}

	public void setPinCode(String pinCode) {
		this.pinCode = pinCode;
	}

	public String getTds() {
		return tds;
	}

	public void setTds(String tds) {
		this.tds = tds;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	public String getModeOfOperation() {
		return ModeOfOperation;
	}

	public void setModeOfOperation(String modeOfOperation) {
		ModeOfOperation = modeOfOperation;
	}

	public String getJointMemCode() {
		return jointMemCode;
	}

	public void setJointMemCode(String jointMemCode) {
		this.jointMemCode = jointMemCode;
	}

	public String getJointName() {
		return jointName;
	}

	public void setJointName(String jointName) {
		this.jointName = jointName;
	}

	public String getMaturityDate() {
		return maturityDate;
	}

	public void setMaturityDate(String maturityDate) {
		this.maturityDate = maturityDate;
	}

	public String getSchemeType() {
		return schemeType;
	}

	public void setSchemeType(String schemeType) {
		this.schemeType = schemeType;
	}

	public String getSchemeTerm() {
		return schemeTerm;
	}

	public void setSchemeTerm(String schemeTerm) {
		this.schemeTerm = schemeTerm;
	}

	public String getSchemeMode() {
		return schemeMode;
	}

	public void setSchemeMode(String schemeMode) {
		this.schemeMode = schemeMode;
	}

	public String getPolicyAmount() {
		return policyAmount;
	}

	public void setPolicyAmount(String policyAmount) {
		this.policyAmount = policyAmount;
	}

	public String getDepositAmount() {
		return depositAmount;
	}

	public void setDepositAmount(String depositAmount) {
		this.depositAmount = depositAmount;
	}

	public String getIntroMCode() {
		return introMCode;
	}

	public void setIntroMCode(String introMCode) {
		this.introMCode = introMCode;
	}

	public String getMaturityAmount() {
		return maturityAmount;
	}

	public void setMaturityAmount(String maturityAmount) {
		this.maturityAmount = maturityAmount;
	}

	public String getMISInterest() {
		return MISInterest;
	}

	public void setMISInterest(String mISInterest) {
		MISInterest = mISInterest;
	}

	public String getPaymentBy() {
		return paymentBy;
	}

	public void setPaymentBy(String paymentBy) {
		this.paymentBy = paymentBy;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getAgent() {
		return agent;
	}

	public void setAgent(String agent) {
		this.agent = agent;
	}

	public String getSmsSend() {
		return smsSend;
	}

	public void setSmsSend(String smsSend) {
		this.smsSend = smsSend;
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

	public boolean isApproved() {
		return isApproved;
	}

	public void setApproved(boolean isApproved) {
		this.isApproved = isApproved;
	}

	public String getLastInstPaid() {
		return lastInstPaid;
	}

	public void setLastInstPaid(String lastInstPaid) {
		this.lastInstPaid = lastInstPaid;
	}

	public String getPaidAmount() {
		return paidAmount;
	}

	public void setPaidAmount(String paidAmount) {
		this.paidAmount = paidAmount;
	}

	public String getAmountDue() {
		return amountDue;
	}

	public void setAmountDue(String amountDue) {
		this.amountDue = amountDue;
	}

	public String getSchemeName() {
		return schemeName;
	}

	public void setSchemeName(String schemeName) {
		this.schemeName = schemeName;
	}

	public String getSchemeCode() {
		return schemeCode;
	}

	public void setSchemeCode(String schemeCode) {
		this.schemeCode = schemeCode;
	}

	// Add these getters
	public String getLastPaymentDate() {
		return lastPaymentDate;
	}

	public String getDueDate() {
		return dueDate;
	}

	public String getNoOfInstallments() {
		return noOfInstallments;
	}

	public String getModeOfPayment() {
		return modeOfPayment;
	}

	public void setLastPaymentDate(String lastPaymentDate) {
		this.lastPaymentDate = lastPaymentDate;
	}

	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}

	public void setNoOfInstallments(String noOfInstallments) {
		this.noOfInstallments = noOfInstallments;
	}

	public void setModeOfPayment(String modeOfPayment) {
		this.modeOfPayment = modeOfPayment;
	}

	public String getRoi() {
		return roi;
	}

	public void setRoi(String roi) {
		this.roi = roi;
	}

	public String getBalance() {
		return balance;
	}

	public void setBalance(String balance) {
		this.balance = balance;
	}

	public String getFdSplitAmounts() {
		return fdSplitAmounts;
	}

	public void setFdSplitAmounts(String fdSplitAmounts) {
		this.fdSplitAmounts = fdSplitAmounts;
	}

}
