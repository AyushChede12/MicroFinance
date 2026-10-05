package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class DailyPremiumRenewalPM {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String policyCode;
	private String renewalDate;

	private String policyDate;
	private String maturityDate;

	private String customerCode;
	private String clientName;
	private String contactNo;

	private Double policyAmount;
	private String policyType;
	private String policyTerm;

	private Double maturityAmount;
	private Double totalDeposit;
	private Double paymentDue;

	private String lastPaymentDate; // can be Date if it's stored as date
	private String dueDate;

	private Integer noOfInst;
	private Integer noOfInstPaid;

	private String modeOfPayment;

	@JsonProperty("isApproved")
	private boolean isApproved;
	private String fees;
	private String branchname;
	private double netDeposit;

	// Getters and Setters

	public String getPolicyCode() {
		return policyCode;
	}

	public void setPolicyCode(String policyCode) {
		this.policyCode = policyCode;
	}

	public String getCustomerCode() {
		return customerCode;
	}

	public void setCustomerCode(String customerCode) {
		this.customerCode = customerCode;
	}

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}

	public String getContactNo() {
		return contactNo;
	}

	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	public Double getPolicyAmount() {
		return policyAmount;
	}

	public void setPolicyAmount(Double policyAmount) {
		this.policyAmount = policyAmount;
	}

	public String getPolicyType() {
		return policyType;
	}

	public void setPolicyType(String policyType) {
		this.policyType = policyType;
	}

	public String getPolicyTerm() {
		return policyTerm;
	}

	public void setPolicyTerm(String policyTerm) {
		this.policyTerm = policyTerm;
	}

	public Double getMaturityAmount() {
		return maturityAmount;
	}

	public void setMaturityAmount(Double maturityAmount) {
		this.maturityAmount = maturityAmount;
	}

	public Double getTotalDeposit() {
		return totalDeposit;
	}

	public void setTotalDeposit(Double totalDeposit) {
		this.totalDeposit = totalDeposit;
	}

	public Double getPaymentDue() {
		return paymentDue;
	}

	public void setPaymentDue(Double paymentDue) {
		this.paymentDue = paymentDue;
	}

	public String getLastPaymentDate() {
		return lastPaymentDate;
	}

	public void setLastPaymentDate(String lastPaymentDate) {
		this.lastPaymentDate = lastPaymentDate;
	}

	public Integer getNoOfInst() {
		return noOfInst;
	}

	public void setNoOfInst(Integer noOfInst) {
		this.noOfInst = noOfInst;
	}

	public Integer getNoOfInstPaid() {
		return noOfInstPaid;
	}

	public void setNoOfInstPaid(Integer noOfInstPaid) {
		this.noOfInstPaid = noOfInstPaid;
	}

	public String getModeOfPayment() {
		return modeOfPayment;
	}

	public void setModeOfPayment(String modeOfPayment) {
		this.modeOfPayment = modeOfPayment;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getRenewalDate() {
		return renewalDate;
	}

	public void setRenewalDate(String renewalDate) {
		this.renewalDate = renewalDate;
	}

	public String getPolicyDate() {
		return policyDate;
	}

	public void setPolicyDate(String policyDate) {
		this.policyDate = policyDate;
	}

	public String getMaturityDate() {
		return maturityDate;
	}

	public void setMaturityDate(String maturityDate) {
		this.maturityDate = maturityDate;
	}

	public String getDueDate() {
		return dueDate;
	}

	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}

	public boolean isApproved() {
		return isApproved;
	}

	public void setApproved(boolean isApproved) {
		this.isApproved = isApproved;
	}

	public String getFees() {
		return fees;
	}

	public void setFees(String fees) {
		this.fees = fees;
	}

	public String getBranchname() {
		return branchname;
	}

	public void setBranchname(String branchname) {
		this.branchname = branchname;
	}

	public double getNetDeposit() {
		return netDeposit;
	}

	public void setNetDeposit(double netDeposit) {
		this.netDeposit = netDeposit;
	}

}
