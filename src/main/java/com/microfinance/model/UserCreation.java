package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class UserCreation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String userId;
	private String password;
	private String fullName;
	private String emailId;
	private String contactNumber;
	private String singInBranch;
	private String pastDate;
	private String rePrint;
	private String deleteAccess;
	private String userStatus;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getSingInBranch() {
		return singInBranch;
	}

	public void setSingInBranch(String singInBranch) {
		this.singInBranch = singInBranch;
	}

	public String getPastDate() {
		return pastDate;
	}

	public void setPastDate(String pastDate) {
		this.pastDate = pastDate;
	}

	public String getRePrint() {
		return rePrint;
	}

	public void setRePrint(String rePrint) {
		this.rePrint = rePrint;
	}

	public String getDeleteAccess() {
		return deleteAccess;
	}

	public void setDeleteAccess(String deleteAccess) {
		this.deleteAccess = deleteAccess;
	}

	public String getUserStatus() {
		return userStatus;
	}

	public void setUserStatus(String userStatus) {
		this.userStatus = userStatus;
	}

}