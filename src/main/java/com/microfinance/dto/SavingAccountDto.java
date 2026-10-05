package com.microfinance.dto;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.web.multipart.MultipartFile;

public class SavingAccountDto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String typeofaccount;
	private String openingDate;
	private String selectByCustomer;
	private String enterCustomerName;
	private String dateOfBirth;
	private String familyDetails;
	private String contactNumber;
	private String suggestedNomineeName;
	private String suggestedNomineeAge;
	private String suggestedNomineeRelation;
	private String address;
	private String district;
	private String branchName;
	private String state;
	private String pinCode;
	private String operationType;
	private String jointOperationCode;
	private String jointSurvivorCode;
	private String familyRelation;
	private String selectPlan;
	private String balance;
	private String financialConsultantCode;
	private String financialConsultantName;
	private String openingFees;
	private String emailId;
	private String aadharNo;
	private String authenticateWith;
	private String modeOfPayment;
	private String comment;
	private String accountStatus;
	private String messageSend;
	private String debitCardIssue;
	private String accountFreeze;
	private String accountNumber;
	private boolean isApproved;
	private String isLocker;
	private String chequeNo;
	private String chequeDate;
	private String depositAcc1;
	private String depositAcc2;
	private String refNumber1;
	private String depositAcc3;
	private String refNumber2;

	private String photo;
	private String signature;
	private MultipartFile jointPhoto;
	private MultipartFile newPhoto;
	private MultipartFile newSignature;
	
	private String byDate;
	private String accountType;
	private String chargeType;
	private String amount;
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTypeofaccount() {
		return typeofaccount;
	}

	public void setTypeofaccount(String typeofaccount) {
		this.typeofaccount = typeofaccount;
	}

	public String getOpeningDate() {
		return openingDate;
	}

	public void setOpeningDate(String openingDate) {
		this.openingDate = openingDate;
	}

	public String getSelectByCustomer() {
		return selectByCustomer;
	}

	public void setSelectByCustomer(String selectByCustomer) {
		this.selectByCustomer = selectByCustomer;
	}

	public String getEnterCustomerName() {
		return enterCustomerName;
	}

	public void setEnterCustomerName(String enterCustomerName) {
		this.enterCustomerName = enterCustomerName;
	}

	public String getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getFamilyDetails() {
		return familyDetails;
	}

	public void setFamilyDetails(String familyDetails) {
		this.familyDetails = familyDetails;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getSuggestedNomineeName() {
		return suggestedNomineeName;
	}

	public void setSuggestedNomineeName(String suggestedNomineeName) {
		this.suggestedNomineeName = suggestedNomineeName;
	}

	public String getSuggestedNomineeAge() {
		return suggestedNomineeAge;
	}

	public void setSuggestedNomineeAge(String suggestedNomineeAge) {
		this.suggestedNomineeAge = suggestedNomineeAge;
	}

	public String getSuggestedNomineeRelation() {
		return suggestedNomineeRelation;
	}

	public void setSuggestedNomineeRelation(String suggestedNomineeRelation) {
		this.suggestedNomineeRelation = suggestedNomineeRelation;
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

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
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

	public String getOperationType() {
		return operationType;
	}

	public void setOperationType(String operationType) {
		this.operationType = operationType;
	}

	public String getJointOperationCode() {
		return jointOperationCode;
	}

	public void setJointOperationCode(String jointOperationCode) {
		this.jointOperationCode = jointOperationCode;
	}

	public String getJointSurvivorCode() {
		return jointSurvivorCode;
	}

	public void setJointSurvivorCode(String jointSurvivorCode) {
		this.jointSurvivorCode = jointSurvivorCode;
	}

	public String getFamilyRelation() {
		return familyRelation;
	}

	public void setFamilyRelation(String familyRelation) {
		this.familyRelation = familyRelation;
	}

	public String getSelectPlan() {
		return selectPlan;
	}

	public void setSelectPlan(String selectPlan) {
		this.selectPlan = selectPlan;
	}

	public String getBalance() {
		return balance;
	}

	public void setBalance(String balance) {
		this.balance = balance;
	}

	public String getFinancialConsultantCode() {
		return financialConsultantCode;
	}

	public void setFinancialConsultantCode(String financialConsultantCode) {
		this.financialConsultantCode = financialConsultantCode;
	}

	public String getFinancialConsultantName() {
		return financialConsultantName;
	}

	public void setFinancialConsultantName(String financialConsultantName) {
		this.financialConsultantName = financialConsultantName;
	}

	public String getOpeningFees() {
		return openingFees;
	}

	public void setOpeningFees(String openingFees) {
		this.openingFees = openingFees;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getAadharNo() {
		return aadharNo;
	}

	public void setAadharNo(String aadharNo) {
		this.aadharNo = aadharNo;
	}

	public String getAuthenticateWith() {
		return authenticateWith;
	}

	public void setAuthenticateWith(String authenticateWith) {
		this.authenticateWith = authenticateWith;
	}

	public String getModeOfPayment() {
		return modeOfPayment;
	}

	public void setModeOfPayment(String modeOfPayment) {
		this.modeOfPayment = modeOfPayment;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getAccountStatus() {
		return accountStatus;
	}

	public void setAccountStatus(String accountStatus) {
		this.accountStatus = accountStatus;
	}

	public String getMessageSend() {
		return messageSend;
	}

	public void setMessageSend(String messageSend) {
		this.messageSend = messageSend;
	}

	public String getDebitCardIssue() {
		return debitCardIssue;
	}

	public void setDebitCardIssue(String debitCardIssue) {
		this.debitCardIssue = debitCardIssue;
	}

	public String getAccountFreeze() {
		return accountFreeze;
	}

	public void setAccountFreeze(String accountFreeze) {
		this.accountFreeze = accountFreeze;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public boolean isApproved() {
		return isApproved;
	}

	public void setApproved(boolean isApproved) {
		this.isApproved = isApproved;
	}

	public String getIsLocker() {
		return isLocker;
	}

	public void setIsLocker(String isLocker) {
		this.isLocker = isLocker;
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

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getSignature() {
		return signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}

	public MultipartFile getJointPhoto() {
		return jointPhoto;
	}

	public void setJointPhoto(MultipartFile jointPhoto) {
		this.jointPhoto = jointPhoto;
	}

	public MultipartFile getNewPhoto() {
		return newPhoto;
	}

	public void setNewPhoto(MultipartFile newPhoto) {
		this.newPhoto = newPhoto;
	}

	public MultipartFile getNewSignature() {
		return newSignature;
	}

	public void setNewSignature(MultipartFile newSignature) {
		this.newSignature = newSignature;
	}

	public String getByDate() {
		return byDate;
	}

	public void setByDate(String byDate) {
		this.byDate = byDate;
	}

	public String getAccountType() {
		return accountType;
	}

	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}

	public String getChargeType() {
		return chargeType;
	}

	public void setChargeType(String chargeType) {
		this.chargeType = chargeType;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}
	
	

}