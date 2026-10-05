package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TeamMember {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	
	private long id;
	private String teamMemberCode;
	private String signUpDate;
	private String branchName;
	private String teamMemberName;
	private String dateOfBirth;
	private String age;
	private String familyMemberName;
	private String relationToApplicant;
	private String contactNo;
	private String nomineeName;
	private String nomineeAge;
	private String relationWithNominee;
	private String address;
	private String pan;
	private String bankAC;
	private String ifscCode;
	private String expDetails;
	private String educationalBackground;
	private String designation;
	private String department;
	private String salary;
	private String savingAccNo;
	private String fees;
	private String modeofpayment;
	private String comments;
	private int customerStatus;
	private String dateFrom;
	private String dateTo;
	private String chequeNo;
    private String chequeDate;
    private String depositAcc1;
    private String depositAcc2;
    private String refNumber1;
    private String depositAcc3;
    private String refNumber2;
	
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getTeamMemberCode() {
		return teamMemberCode;
	}
	public void setTeamMemberCode(String teamMemberCode) {
		this.teamMemberCode = teamMemberCode;
	}
	public String getSignUpDate() {
		return signUpDate;
	}
	public void setSignUpDate(String signUpDate) {
		this.signUpDate = signUpDate;
	}
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	public String getTeamMemberName() {
		return teamMemberName;
	}
	public void setTeamMemberName(String teamMemberName) {
		this.teamMemberName = teamMemberName;
	}
	public String getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
		this.age = age;
	}
	public String getFamilyMemberName() {
		return familyMemberName;
	}
	public void setFamilyMemberName(String familyMemberName) {
		this.familyMemberName = familyMemberName;
	}
	public String getRelationToApplicant() {
		return relationToApplicant;
	}
	public void setRelationToApplicant(String relationToApplicant) {
		this.relationToApplicant = relationToApplicant;
	}
	public String getContactNo() {
		return contactNo;
	}
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}
	public String getNomineeName() {
		return nomineeName;
	}
	public void setNomineeName(String nomineeName) {
		this.nomineeName = nomineeName;
	}
	public String getNomineeAge() {
		return nomineeAge;
	}
	public void setNomineeAge(String nomineeAge) {
		this.nomineeAge = nomineeAge;
	}
	public String getRelationWithNominee() {
		return relationWithNominee;
	}
	public void setRelationWithNominee(String relationWithNominee) {
		this.relationWithNominee = relationWithNominee;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPan() {
		return pan;
	}
	public void setPan(String pan) {
		this.pan = pan;
	}
	public String getBankAC() {
		return bankAC;
	}
	public void setBankAC(String bankAC) {
		this.bankAC = bankAC;
	}
	public String getIfscCode() {
		return ifscCode;
	}
	public void setIfscCode(String ifscCode) {
		this.ifscCode = ifscCode;
	}
	public String getExpDetails() {
		return expDetails;
	}
	public void setExpDetails(String expDetails) {
		this.expDetails = expDetails;
	}
	public String getEducationalBackground() {
		return educationalBackground;
	}
	public void setEducationalBackground(String educationalBackground) {
		this.educationalBackground = educationalBackground;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getSalary() {
		return salary;
	}
	public void setSalary(String salary) {
		this.salary = salary;
	}
	public String getSavingAccNo() {
		return savingAccNo;
	}
	public void setSavingAccNo(String savingAccNo) {
		this.savingAccNo = savingAccNo;
	}
	public String getFees() {
		return fees;
	}
	public void setFees(String fees) {
		this.fees = fees;
	}
	public String getModeofpayment() {
		return modeofpayment;
	}
	public void setModeofpayment(String modeofpayment) {
		this.modeofpayment = modeofpayment;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public int getCustomerStatus() {
		return customerStatus;
	}
	public void setCustomerStatus(int customerStatus) {
		this.customerStatus = customerStatus;
	}
	public String getDateFrom() {
		return dateFrom;
	}
	public void setDateFrom(String dateFrom) {
		this.dateFrom = dateFrom;
	}
	public String getDateTo() {
		return dateTo;
	}
	public void setDateTo(String dateTo) {
		this.dateTo = dateTo;
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
		
}
