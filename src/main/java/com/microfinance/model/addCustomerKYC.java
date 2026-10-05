package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class addCustomerKYC {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private long id;
	private String selectByCode;
	private String customerName;
	private String customerCode;
	private String contactNo;
	private String singupDate;
	private String aadharNo;
	private String pan;
	private String voterNo;
	private String rationCardNo;
	private String drivingLicenseNo;
	private String customerPhoto;	
	private String customerSignature;
	private String aadharFrontPhoto;
	private String aadharBackPhoto;
	private String panPhoto;
	private String bankName;
	private String bankBranch;
	private String acountNo;
	private String ifscCode;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getSelectByCode() {
		return selectByCode;
	}
	public void setSelectByCode(String selectByCode) {
		this.selectByCode = selectByCode;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getCustomerCode() {
		return customerCode;
	}
	public void setCustomerCode(String customerCode) {
		this.customerCode = customerCode;
	}
	public String getContactNo() {
		return contactNo;
	}
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}
	public String getSingupDate() {
		return singupDate;
	}
	public void setSingupDate(String singupDate) {
		this.singupDate = singupDate;
	}
	public String getAadharNo() {
		return aadharNo;
	}
	public void setAadharNo(String aadharNo) {
		this.aadharNo = aadharNo;
	}
	public String getPan() {
		return pan;
	}
	public void setPan(String pan) {
		this.pan = pan;
	}
	public String getVoterNo() {
		return voterNo;
	}
	public void setVoterNo(String voterNo) {
		this.voterNo = voterNo;
	}
	public String getRationCardNo() {
		return rationCardNo;
	}
	public void setRationCardNo(String rationCardNo) {
		this.rationCardNo = rationCardNo;
	}
	public String getDrivingLicenseNo() {
		return drivingLicenseNo;
	}
	public void setDrivingLicenseNo(String drivingLicenseNo) {
		this.drivingLicenseNo = drivingLicenseNo;
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
	public String getAadharFrontPhoto() {
		return aadharFrontPhoto;
	}
	public void setAadharFrontPhoto(String aadharFrontPhoto) {
		this.aadharFrontPhoto = aadharFrontPhoto;
	}
	public String getAadharBackPhoto() {
		return aadharBackPhoto;
	}
	public void setAadharBackPhoto(String aadharBackPhoto) {
		this.aadharBackPhoto = aadharBackPhoto;
	}
	public String getPanPhoto() {
		return panPhoto;
	}
	public void setPanPhoto(String panPhoto) {
		this.panPhoto = panPhoto;
	}
	public String getBankName() {
		return bankName;
	}
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
	public String getBankBranch() {
		return bankBranch;
	}
	public void setBankBranch(String bankBranch) {
		this.bankBranch = bankBranch;
	}
	public String getAcountNo() {
		return acountNo;
	}
	public void setAcountNo(String acountNo) {
		this.acountNo = acountNo;
	}
	public String getIfscCode() {
		return ifscCode;
	}
	public void setIfscCode(String ifscCode) {
		this.ifscCode = ifscCode;
	}
	
}
