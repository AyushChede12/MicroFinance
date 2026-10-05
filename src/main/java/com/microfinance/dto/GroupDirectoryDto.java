package com.microfinance.dto;

import org.springframework.web.multipart.MultipartFile;

public class GroupDirectoryDto {
	private Long id;
	private String groupID;
    private String communityName;
    private String openingDate;
    private String branchName;
    private String communityLeader;
    private String contactNo;
    private String communityAddress;
    private String allocatedStaff;
    private String collectionDay;
    private String collectionTime;

    // Group Member Link
    private String selectedMember;
    private String customerName;
    private String referralDetails;
    private String contact;
    

    // Uploads
    private MultipartFile uploadPhoto;        
    private MultipartFile uploadSignature;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getGroupID() {
		return groupID;
	}
	public void setGroupID(String groupID) {
		this.groupID = groupID;
	}
	public String getCommunityName() {
		return communityName;
	}
	public void setCommunityName(String communityName) {
		this.communityName = communityName;
	}
	public String getOpeningDate() {
		return openingDate;
	}
	public void setOpeningDate(String openingDate) {
		this.openingDate = openingDate;
	}
	
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	public String getCommunityLeader() {
		return communityLeader;
	}
	public void setCommunityLeader(String communityLeader) {
		this.communityLeader = communityLeader;
	}
	public String getContactNo() {
		return contactNo;
	}
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}
	public String getCommunityAddress() {
		return communityAddress;
	}
	public void setCommunityAddress(String communityAddress) {
		this.communityAddress = communityAddress;
	}
	public String getAllocatedStaff() {
		return allocatedStaff;
	}
	public void setAllocatedStaff(String allocatedStaff) {
		this.allocatedStaff = allocatedStaff;
	}
	public String getCollectionDay() {
		return collectionDay;
	}
	public void setCollectionDay(String collectionDay) {
		this.collectionDay = collectionDay;
	}
	public String getCollectionTime() {
		return collectionTime;
	}
	public void setCollectionTime(String collectionTime) {
		this.collectionTime = collectionTime;
	}
	public String getSelectedMember() {
		return selectedMember;
	}
	public void setSelectedMember(String selectedMember) {
		this.selectedMember = selectedMember;
	}
	
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getReferralDetails() {
		return referralDetails;
	}
	public void setReferralDetails(String referralDetails) {
		this.referralDetails = referralDetails;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public MultipartFile getUploadPhoto() {
		return uploadPhoto;
	}
	public void setUploadPhoto(MultipartFile uploadPhoto) {
		this.uploadPhoto = uploadPhoto;
	}
	public MultipartFile getUploadSignature() {
		return uploadSignature;
	}
	public void setUploadSignature(MultipartFile uploadSignature) {
		this.uploadSignature = uploadSignature;
	}

}
