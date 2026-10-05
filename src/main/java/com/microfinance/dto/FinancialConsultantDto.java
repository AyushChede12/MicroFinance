package com.microfinance.dto;

import org.springframework.web.multipart.MultipartFile;

public class FinancialConsultantDto {

	private Long id;
	private String financialCode;
	private String joiningDate;
	private String financialName;
	private String dob;
	private String age;
	private String teamMemberCode;
	private String contactNo;
	private String branchName;
	private String Address;
	private String district;
	private String state;
	private String pinCode;
	private String profession;
	private String academicBackground;
	private MultipartFile financialPhoto;
	private MultipartFile finnacialSignature;
	private String selectPosition;
	private String referralCode;
	private String referralName;
	private String fees;
	private String modeofPayment;
	private String chequeNo;
	private String chequeDate;
	private String depositAccount;
	private String refNo;
	private String comments;
	private String financialStatus;
	private String smsSend;
	private boolean isApproved;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFinancialCode() {
		return financialCode;
	}

	public void setFinancialCode(String financialCode) {
		this.financialCode = financialCode;
	}

	public String getJoiningDate() {
		return joiningDate;
	}

	public void setJoiningDate(String joiningDate) {
		this.joiningDate = joiningDate;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
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

	public String getProfession() {
		return profession;
	}

	public void setProfession(String profession) {
		this.profession = profession;
	}

	public String getAcademicBackground() {
		return academicBackground;
	}

	public void setAcademicBackground(String academicBackground) {
		this.academicBackground = academicBackground;
	}

	public String getSelectPosition() {
		return selectPosition;
	}

	public void setSelectPosition(String selectPosition) {
		this.selectPosition = selectPosition;
	}

	public String getReferralCode() {
		return referralCode;
	}

	public void setReferralCode(String referralCode) {
		this.referralCode = referralCode;
	}

	public String getReferralName() {
		return referralName;
	}

	public void setReferralName(String referralName) {
		this.referralName = referralName;
	}

	public String getFees() {
		return fees;
	}

	public void setFees(String fees) {
		this.fees = fees;
	}

	public String getModeofPayment() {
		return modeofPayment;
	}

	public void setModeofPayment(String modeofPayment) {
		this.modeofPayment = modeofPayment;
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

	public String getDepositAccount() {
		return depositAccount;
	}

	public void setDepositAccount(String depositAccount) {
		this.depositAccount = depositAccount;
	}

	public String getRefNo() {
		return refNo;
	}

	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getFinancialStatus() {
		return financialStatus;
	}

	public void setFinancialStatus(String financialStatus) {
		this.financialStatus = financialStatus;
	}

	public String getSmsSend() {
		return smsSend;
	}

	public void setSmsSend(String smsSend) {
		this.smsSend = smsSend;
	}

	public String getFinancialName() {
		return financialName;
	}

	public void setFinancialName(String financialName) {
		this.financialName = financialName;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getTeamMemberCode() {
		return teamMemberCode;
	}

	public void setTeamMemberCode(String teamMemberCode) {
		this.teamMemberCode = teamMemberCode;
	}

	public String getAddress() {
		return Address;
	}

	public void setAddress(String address) {
		Address = address;
	}

	public MultipartFile getFinancialPhoto() {
		return financialPhoto;
	}

	public void setFinancialPhoto(MultipartFile financialPhoto) {
		this.financialPhoto = financialPhoto;
	}

	public MultipartFile getFinnacialSignature() {
		return finnacialSignature;
	}

	public void setFinnacialSignature(MultipartFile finnacialSignature) {
		this.finnacialSignature = finnacialSignature;
	}

	public boolean isApproved() {
		return isApproved;
	}

	public void setApproved(boolean isApproved) {
		this.isApproved = isApproved;
	}

}
