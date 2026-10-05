package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class AccountIncentivePayment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String incentiveMonth;
	private String teamMemberCode;

	private String fullName;
	private String designation;
	private String personalSales;
	private String groupSales;
	private String overallSales;

	private String totalEarnings;
	private String taxDeducted;
	private String serviceDeduction;
	private String extraAllowance;
	private String finalPayout;

	private String branchName;
	private String paymentDate; // yyyy-MM-dd
	private String modeOfPayment;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIncentiveMonth() {
		return incentiveMonth;
	}

	public void setIncentiveMonth(String incentiveMonth) {
		this.incentiveMonth = incentiveMonth;
	}

	public String getTeamMemberCode() {
		return teamMemberCode;
	}

	public void setTeamMemberCode(String teamMemberCode) {
		this.teamMemberCode = teamMemberCode;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getPersonalSales() {
		return personalSales;
	}

	public void setPersonalSales(String personalSales) {
		this.personalSales = personalSales;
	}

	public String getGroupSales() {
		return groupSales;
	}

	public void setGroupSales(String groupSales) {
		this.groupSales = groupSales;
	}

	public String getOverallSales() {
		return overallSales;
	}

	public void setOverallSales(String overallSales) {
		this.overallSales = overallSales;
	}

	public String getTotalEarnings() {
		return totalEarnings;
	}

	public void setTotalEarnings(String totalEarnings) {
		this.totalEarnings = totalEarnings;
	}

	public String getTaxDeducted() {
		return taxDeducted;
	}

	public void setTaxDeducted(String taxDeducted) {
		this.taxDeducted = taxDeducted;
	}

	public String getServiceDeduction() {
		return serviceDeduction;
	}

	public void setServiceDeduction(String serviceDeduction) {
		this.serviceDeduction = serviceDeduction;
	}

	public String getExtraAllowance() {
		return extraAllowance;
	}

	public void setExtraAllowance(String extraAllowance) {
		this.extraAllowance = extraAllowance;
	}

	public String getFinalPayout() {
		return finalPayout;
	}

	public void setFinalPayout(String finalPayout) {
		this.finalPayout = finalPayout;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	public String getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(String paymentDate) {
		this.paymentDate = paymentDate;
	}

	public String getModeOfPayment() {
		return modeOfPayment;
	}

	public void setModeOfPayment(String modeOfPayment) {
		this.modeOfPayment = modeOfPayment;
	}

}
