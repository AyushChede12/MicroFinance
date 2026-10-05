package com.microfinance.dto;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import org.springframework.web.multipart.MultipartFile;

public class CustomerDto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// Customer Details
	private String memberCode;
	private String authenticateFor;
	private String signupDate;
	private String major;
	private String customerName;
	private String minor;
	private String customerGender;
	private String guardianName;
	private String guardianAccountNo;
	private String relationToApplicant;
	private String dob;
	private String customerAge;
	private String relationshipStatus;
	private String customerAddress;
	private String category;
	private String caste;
	private String state;
	private String district;
	private String aadharNo;
	private String pinCode;
	private String branchName;
	private String panNo;
	private String voterNo;
	private String drivingLicenceNo;
	private String referralCode;
	private String referralName;
	private String contactNo;
	private String emailId;
	private String profession;
	private String academicBackground;
	private String shareAmount;
	private String noOfShare;
	private String shareValue;
	private String lightBill;
	private String taxBill;

	private MultipartFile customerPhoto;
	private MultipartFile customerSignature;
	private MultipartFile customerDriving;
	private MultipartFile customerVoter;
	private MultipartFile newlyAddedImage;

	private String firstName;
	private String middleName;
	private String lastName;

	private Integer accountFreeze;

	// Nominee Details
	private String nomineeName;
	private String nomineeRelationToApplicant;
	private String nomineeAge;
	private String nomineeAddress;
	private String nomineePanNo;
	private String nomineeKycNo;
	private String nomineeKycType;
	private String nomineeMobileNo;
	private String nomineeDOB;

	private MultipartFile nomineSignature;
	private MultipartFile nomineAadhar;

	// Fees Details
	private String memberFees;
	private String buildingFund;
	private String adminCharge;
	private String documentCharge;
	private String otherCharge;
	private String entryFee;
	private String chequeNo;
	private String chequeDate;
	private String depositAcNo;
	private String referenceNo;

	private int memberStatus;
	private int mobileBanking;
	private int netBanking;
	private int smsSend;

	private String remarks;
	private String paymentBy;
	private String fDate;
	private String tDate;

	private boolean isVerified;
	private boolean isApproved;

	// ---------------- GETTERS AND SETTERS ----------------

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMemberCode() {
		return memberCode;
	}

	public void setMemberCode(String memberCode) {
		this.memberCode = memberCode;
	}

	public String getAuthenticateFor() {
		return authenticateFor;
	}

	public void setAuthenticateFor(String authenticateFor) {
		this.authenticateFor = authenticateFor;
	}

	public String getSignupDate() {
		return signupDate;
	}

	public void setSignupDate(String signupDate) {
		this.signupDate = signupDate;
	}

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getMinor() {
		return minor;
	}

	public void setMinor(String minor) {
		this.minor = minor;
	}

	public String getCustomerGender() {
		return customerGender;
	}

	public void setCustomerGender(String customerGender) {
		this.customerGender = customerGender;
	}

	public String getGuardianName() {
		return guardianName;
	}

	public void setGuardianName(String guardianName) {
		this.guardianName = guardianName;
	}

	public String getGuardianAccountNo() {
		return guardianAccountNo;
	}

	public void setGuardianAccountNo(String guardianAccountNo) {
		this.guardianAccountNo = guardianAccountNo;
	}

	public String getRelationToApplicant() {
		return relationToApplicant;
	}

	public void setRelationToApplicant(String relationToApplicant) {
		this.relationToApplicant = relationToApplicant;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getCaste() {
		return caste;
	}

	public void setCaste(String caste) {
		this.caste = caste;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getCustomerAge() {
		return customerAge;
	}

	public void setCustomerAge(String customerAge) {
		this.customerAge = customerAge;
	}

	public String getRelationshipStatus() {
		return relationshipStatus;
	}

	public void setRelationshipStatus(String relationshipStatus) {
		this.relationshipStatus = relationshipStatus;
	}

	public String getCustomerAddress() {
		return customerAddress;
	}

	public void setCustomerAddress(String customerAddress) {
		this.customerAddress = customerAddress;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getAadharNo() {
		return aadharNo;
	}

	public void setAadharNo(String aadharNo) {
		this.aadharNo = aadharNo;
	}

	public String getPinCode() {
		return pinCode;
	}

	public void setPinCode(String pinCode) {
		this.pinCode = pinCode;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	public String getPanNo() {
		return panNo;
	}

	public void setPanNo(String panNo) {
		this.panNo = panNo;
	}

	public String getVoterNo() {
		return voterNo;
	}

	public void setVoterNo(String voterNo) {
		this.voterNo = voterNo;
	}

	public String getDrivingLicenceNo() {
		return drivingLicenceNo;
	}

	public void setDrivingLicenceNo(String drivingLicenceNo) {
		this.drivingLicenceNo = drivingLicenceNo;
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

	public String getContactNo() {
		return contactNo;
	}

	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
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

	public String getShareAmount() {
		return shareAmount;
	}

	public void setShareAmount(String shareAmount) {
		this.shareAmount = shareAmount;
	}

	public String getNoOfShare() {
		return noOfShare;
	}

	public void setNoOfShare(String noOfShare) {
		this.noOfShare = noOfShare;
	}

	public String getShareValue() {
		return shareValue;
	}

	public void setShareValue(String shareValue) {
		this.shareValue = shareValue;
	}

	public String getLightBill() {
		return lightBill;
	}

	public void setLightBill(String lightBill) {
		this.lightBill = lightBill;
	}

	public String getTaxBill() {
		return taxBill;
	}

	public void setTaxBill(String taxBill) {
		this.taxBill = taxBill;
	}

	public MultipartFile getCustomerPhoto() {
		return customerPhoto;
	}

	public void setCustomerPhoto(MultipartFile customerPhoto) {
		this.customerPhoto = customerPhoto;
	}

	public MultipartFile getCustomerSignature() {
		return customerSignature;
	}

	public void setCustomerSignature(MultipartFile customerSignature) {
		this.customerSignature = customerSignature;
	}

	public MultipartFile getCustomerDriving() {
		return customerDriving;
	}

	public void setCustomerDriving(MultipartFile customerDriving) {
		this.customerDriving = customerDriving;
	}

	public MultipartFile getCustomerVoter() {
		return customerVoter;
	}

	public void setCustomerVoter(MultipartFile customerVoter) {
		this.customerVoter = customerVoter;
	}

	public MultipartFile getNewlyAddedImage() {
		return newlyAddedImage;
	}

	public void setNewlyAddedImage(MultipartFile newlyAddedImage) {
		this.newlyAddedImage = newlyAddedImage;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Integer getAccountFreeze() {
		return accountFreeze;
	}

	public void setAccountFreeze(Integer accountFreeze) {
		this.accountFreeze = accountFreeze;
	}

	public String getNomineeName() {
		return nomineeName;
	}

	public void setNomineeName(String nomineeName) {
		this.nomineeName = nomineeName;
	}

	public String getNomineeRelationToApplicant() {
		return nomineeRelationToApplicant;
	}

	public void setNomineeRelationToApplicant(String nomineeRelationToApplicant) {
		this.nomineeRelationToApplicant = nomineeRelationToApplicant;
	}

	public String getNomineeAge() {
		return nomineeAge;
	}

	public void setNomineeAge(String nomineeAge) {
		this.nomineeAge = nomineeAge;
	}

	public String getNomineeAddress() {
		return nomineeAddress;
	}

	public void setNomineeAddress(String nomineeAddress) {
		this.nomineeAddress = nomineeAddress;
	}

	public String getNomineePanNo() {
		return nomineePanNo;
	}

	public void setNomineePanNo(String nomineePanNo) {
		this.nomineePanNo = nomineePanNo;
	}

	public String getNomineeKycNo() {
		return nomineeKycNo;
	}

	public void setNomineeKycNo(String nomineeKycNo) {
		this.nomineeKycNo = nomineeKycNo;
	}

	public String getNomineeKycType() {
		return nomineeKycType;
	}

	public void setNomineeKycType(String nomineeKycType) {
		this.nomineeKycType = nomineeKycType;
	}

	public String getNomineeMobileNo() {
		return nomineeMobileNo;
	}

	public void setNomineeMobileNo(String nomineeMobileNo) {
		this.nomineeMobileNo = nomineeMobileNo;
	}

	public String getNomineeDOB() {
		return nomineeDOB;
	}

	public void setNomineeDOB(String nomineeDOB) {
		this.nomineeDOB = nomineeDOB;
	}

	public MultipartFile getNomineSignature() {
		return nomineSignature;
	}

	public void setNomineSignature(MultipartFile nomineSignature) {
		this.nomineSignature = nomineSignature;
	}

	public MultipartFile getNomineAadhar() {
		return nomineAadhar;
	}

	public void setNomineAadhar(MultipartFile nomineAadhar) {
		this.nomineAadhar = nomineAadhar;
	}

	public String getMemberFees() {
		return memberFees;
	}

	public void setMemberFees(String memberFees) {
		this.memberFees = memberFees;
	}

	public String getBuildingFund() {
		return buildingFund;
	}

	public void setBuildingFund(String buildingFund) {
		this.buildingFund = buildingFund;
	}

	public String getAdminCharge() {
		return adminCharge;
	}

	public void setAdminCharge(String adminCharge) {
		this.adminCharge = adminCharge;
	}

	public String getDocumentCharge() {
		return documentCharge;
	}

	public void setDocumentCharge(String documentCharge) {
		this.documentCharge = documentCharge;
	}

	public String getOtherCharge() {
		return otherCharge;
	}

	public void setOtherCharge(String otherCharge) {
		this.otherCharge = otherCharge;
	}

	public String getEntryFee() {
		return entryFee;
	}

	public void setEntryFee(String entryFee) {
		this.entryFee = entryFee;
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

	public String getDepositAcNo() {
		return depositAcNo;
	}

	public void setDepositAcNo(String depositAcNo) {
		this.depositAcNo = depositAcNo;
	}

	public String getReferenceNo() {
		return referenceNo;
	}

	public void setReferenceNo(String referenceNo) {
		this.referenceNo = referenceNo;
	}

	public int getMemberStatus() {
		return memberStatus;
	}

	public void setMemberStatus(int memberStatus) {
		this.memberStatus = memberStatus;
	}

	public int getMobileBanking() {
		return mobileBanking;
	}

	public void setMobileBanking(int mobileBanking) {
		this.mobileBanking = mobileBanking;
	}

	public int getNetBanking() {
		return netBanking;
	}

	public void setNetBanking(int netBanking) {
		this.netBanking = netBanking;
	}

	public int getSmsSend() {
		return smsSend;
	}

	public void setSmsSend(int smsSend) {
		this.smsSend = smsSend;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getPaymentBy() {
		return paymentBy;
	}

	public void setPaymentBy(String paymentBy) {
		this.paymentBy = paymentBy;
	}

	public String getfDate() {
		return fDate;
	}

	public void setfDate(String fDate) {
		this.fDate = fDate;
	}

	public String gettDate() {
		return tDate;
	}

	public void settDate(String tDate) {
		this.tDate = tDate;
	}

	public boolean isVerified() {
		return isVerified;
	}

	public void setVerified(boolean verified) {
		isVerified = verified;
	}

	public boolean isApproved() {
		return isApproved;
	}

	public void setApproved(boolean approved) {
		isApproved = approved;
	}

}