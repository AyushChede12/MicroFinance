package com.microfinance.model;

import javax.persistence.*;

@Entity
@Table(name = "add_customer")
public class addCustomer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// Customer Details
	@Column(name = "member_code", length = 50)
	private String memberCode;

	@Column(name = "authenticate_for", length = 50)
	private String authenticateFor;

	@Column(name = "signup_date", length = 20)
	private String signupDate;

	@Column(name = "major", length = 10)
	private String major;

	@Column(name = "customer_name", length = 100)
	private String customerName;

	@Column(name = "minor", length = 10)
	private String minor;

	@Column(name = "customer_gender", length = 10)
	private String customerGender;

	@Column(name = "guardian_name", length = 100)
	private String guardianName;

	@Column(name = "guardian_account_no", length = 30)
	private String guardianAccountNo;

	@Column(name = "relation_to_applicant", length = 50)
	private String relationToApplicant;

	@Column(name = "dob", length = 20)
	private String dob;

	@Column(name = "customer_age", length = 5)
	private String customerAge;

	@Column(name = "relationship_status", length = 20)
	private String relationshipStatus;

	@Column(name = "customer_address", columnDefinition = "TEXT")
	private String customerAddress;

	@Column(name = "category", length = 30)
	private String category;

	@Column(name = "caste", length = 50)
	private String caste;

	@Column(name = "state", length = 50)
	private String state;

	@Column(name = "district", length = 50)
	private String district;

	@Column(name = "aadhar_no", length = 20)
	private String aadharNo;

	@Column(name = "pin_code", length = 10)
	private String pinCode;

	@Column(name = "branch_name", length = 100)
	private String branchName;

	@Column(name = "pan_no", length = 20)
	private String panNo;

	@Column(name = "voter_no", length = 20)
	private String voterNo;

	@Column(name = "driving_licence_no", length = 30)
	private String drivingLicenceNo;

	@Column(name = "referral_code", length = 50)
	private String referralCode;

	@Column(name = "referral_name", length = 100)
	private String referralName;

	@Column(name = "contact_no", length = 15)
	private String contactNo;

	@Column(name = "email_id", length = 100)
	private String emailId;

	@Column(name = "profession", length = 100)
	private String profession;

	@Column(name = "light_bill", length = 100)
	private String lightBill;

	@Column(name = "share_amount", length = 20)
	private String shareAmount;

	@Column(name = "no_of_share", length = 10)
	private String noOfShare;

	@Column(name = "share_value", length = 20)
	private String shareValue;

	@Column(name = "tax_bill", length = 100)
	private String taxBill;

	@Column(name = "academic_background", length = 100)
	private String academicBackground;

	@Column(name = "customer_photo")
	private String customerPhoto;

	@Column(name = "customer_signature")
	private String customerSignature;

	@Column(name = "customer_voter")
	private String customerVoter;

	@Column(name = "customer_driving")
	private String customerDriving;

	@Column(name = "newly_added_image")
	private String newlyAddedImage;

	@Column(name = "customer_extra_image", length = 3000)
	private String customerExtraImage;

	@Column(name = "first_name", length = 50)
	private String firstName;

	@Column(name = "middle_name", length = 50)
	private String middleName;

	@Column(name = "last_name", length = 50)
	private String lastName;

	// Nominee Details
	@Column(name = "nominee_name", length = 100)
	private String nomineeName;

	@Column(name = "nominee_relation_to_applicant", length = 50)
	private String nomineeRelationToApplicant;

	@Column(name = "nominee_age", length = 5)
	private String nomineeAge;

	@Column(name = "nominee_address", columnDefinition = "TEXT")
	private String nomineeAddress;

	@Column(name = "nominee_pan_no", length = 20)
	private String nomineePanNo;

	@Column(name = "nominee_kyc_no", length = 50)
	private String nomineeKycNo;

	@Column(name = "nominee_kyc_type", length = 50)
	private String nomineeKycType;

	@Column(name = "nominee_mobile_no", length = 15)
	private String nomineeMobileNo;

	@Column(name = "nominee_dob", length = 20)
	private String nomineeDOB;

	@Column(name = "nominee_signature")
	private String nomineSignature;

	@Column(name = "nominee_aadhar")
	private String nomineAadhar;

	// Fees Details
	@Column(name = "member_fees", length = 20)
	private String memberFees;

	@Column(name = "building_fund", length = 20)
	private String buildingFund;

	@Column(name = "admin_charge", length = 20)
	private String adminCharge;

	@Column(name = "document_charge", length = 20)
	private String documentCharge;

	@Column(name = "other_charge", length = 20)
	private String otherCharge;

	@Column(name = "entry_fee", length = 20)
	private String entryFee;

	@Column(name = "cheque_no", length = 30)
	private String chequeNo;

	@Column(name = "cheque_date", length = 20)
	private String chequeDate;

	@Column(name = "deposit_ac_no", length = 30)
	private String depositAcNo;

	@Column(name = "reference_no", length = 50)
	private String referenceNo;

	@Column(name = "remarks", columnDefinition = "TEXT")
	private String remarks;

	@Column(name = "payment_by", length = 20)
	private String paymentBy;

	@Column(name = "member_status")
	private Integer memberStatus;

	@Column(name = "mobile_banking")
	private Integer mobileBanking;

	@Column(name = "net_banking")
	private Integer netBanking;

	@Column(name = "member_banking")
	private Integer memberBanking = 0;

	@Column(name = "sms_send")
	private Integer smsSend;

	@Column(name = "f_date", length = 20)
	private String fDate;

	@Column(name = "t_date", length = 20)
	private String tDate;

	@Column(name = "is_verified")
	private Boolean isVerified = false;

	@Column(name = "is_approved")
	private Boolean isApproved = false;

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

	public String getRelationToApplicant() {
		return relationToApplicant;
	}

	public void setRelationToApplicant(String relationToApplicant) {
		this.relationToApplicant = relationToApplicant;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getGuardianAccountNo() {
		return guardianAccountNo;
	}

	public void setGuardianAccountNo(String guardianAccountNo) {
		this.guardianAccountNo = guardianAccountNo;
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

	public String getShareValue() {
		return shareValue;
	}

	public void setShareValue(String shareValue) {
		this.shareValue = shareValue;
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

	public String getLightBill() {
		return lightBill;
	}

	public void setLightBill(String lightBill) {
		this.lightBill = lightBill;
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

	public String getTaxBill() {
		return taxBill;
	}

	public void setTaxBill(String taxBill) {
		this.taxBill = taxBill;
	}

	public String getAcademicBackground() {
		return academicBackground;
	}

	public void setAcademicBackground(String academicBackground) {
		this.academicBackground = academicBackground;
	}

	public String getCustomerPhoto() {
		return customerPhoto;
	}

	public void setCustomerPhoto(String customerPhoto) {
		this.customerPhoto = customerPhoto;
	}

	public String getCustomerSignature() {
		return customerSignature;
	}

	public void setCustomerSignature(String customerSignature) {
		this.customerSignature = customerSignature;
	}

	public String getCustomerVoter() {
		return customerVoter;
	}

	public void setCustomerVoter(String customerVoter) {
		this.customerVoter = customerVoter;
	}

	public String getCustomerDriving() {
		return customerDriving;
	}

	public void setCustomerDriving(String customerDriving) {
		this.customerDriving = customerDriving;
	}

	public String getNewlyAddedImage() {
		return newlyAddedImage;
	}

	public void setNewlyAddedImage(String newlyAddedImage) {
		this.newlyAddedImage = newlyAddedImage;
	}

	public String getCustomerExtraImage() {
		return customerExtraImage;
	}

	public void setCustomerExtraImage(String customerExtraImage) {
		this.customerExtraImage = customerExtraImage;
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

	public String getNomineSignature() {
		return nomineSignature;
	}

	public void setNomineSignature(String nomineSignature) {
		this.nomineSignature = nomineSignature;
	}

	public String getNomineAadhar() {
		return nomineAadhar;
	}

	public void setNomineAadhar(String nomineAadhar) {
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

	public Integer getMemberStatus() {
		return memberStatus;
	}

	public void setMemberStatus(Integer memberStatus) {
		this.memberStatus = memberStatus;
	}

	public Integer getMobileBanking() {
		return mobileBanking;
	}

	public void setMobileBanking(Integer mobileBanking) {
		this.mobileBanking = mobileBanking;
	}

	public Integer getNetBanking() {
		return netBanking;
	}

	public void setNetBanking(Integer netBanking) {
		this.netBanking = netBanking;
	}

	public Integer getMemberBanking() {
		return memberBanking;
	}

	public void setMemberBanking(Integer memberBanking) {
		this.memberBanking = memberBanking;
	}

	public Integer getSmsSend() {
		return smsSend;
	}

	public void setSmsSend(Integer smsSend) {
		this.smsSend = smsSend;
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

	public Boolean isVerified() {
		return isVerified;
	}

	public void setVerified(Boolean isVerified) {
		this.isVerified = isVerified;
	}

	public Boolean isApproved() {
		return isApproved;
	}

	public void setApproved(Boolean isApproved) {
		this.isApproved = isApproved;
	}

	// Getters and Setters (Omitted for brevity, add all your previous ones here)
}