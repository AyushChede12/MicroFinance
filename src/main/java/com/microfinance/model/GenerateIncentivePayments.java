package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class GenerateIncentivePayments {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String teamCode;
	private String teamName;
	private String designation;
	private String incentiveMonth;
	private String dateFrom;
	private String dateTo;
	private String personalSales;
	private String groupSales;
	private String overallSales;
	private String totalEarnings;
	private String taxDeducted;
	private String serviceDeduction;
	private String extraAllowance;
	private String finalPayout;
	private String branchName;
	private String status; // GENERATED, PAID
	private String generatedDate;
	private String paymentDate;
	private String paymentMode;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTeamCode() {
		return teamCode;
	}

	public void setTeamCode(String teamCode) {
		this.teamCode = teamCode;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getIncentiveMonth() {
		return incentiveMonth;
	}

	public void setIncentiveMonth(String incentiveMonth) {
		this.incentiveMonth = incentiveMonth;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getGeneratedDate() {
		return generatedDate;
	}

	public void setGeneratedDate(String generatedDate) {
		this.generatedDate = generatedDate;
	}

	public String getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(String paymentDate) {
		this.paymentDate = paymentDate;
	}

	public String getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}

}
