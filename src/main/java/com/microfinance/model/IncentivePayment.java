package com.microfinance.model;

import java.math.BigDecimal;
import javax.persistence.*;

@Entity
public class IncentivePayment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String month;
	private String agentCode;

	private String fullName;
	private String designation;

	private BigDecimal personalSales;
	private BigDecimal groupSales;
	private BigDecimal overallSales;

	private BigDecimal totalEarnings;
	private BigDecimal taxDeducted;
	private BigDecimal serviceDeduction;
	private BigDecimal extraAllowance;
	private BigDecimal finalPayout;

	private String paymentDate;
	private String paymentBranch;

	private String paymentMode; // CASH
	private String paymentStatus; // PENDING / PAID

	private Long paymentFromLedgerId; // CASH LEDGER ID

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public String getAgentCode() {
		return agentCode;
	}

	public void setAgentCode(String agentCode) {
		this.agentCode = agentCode;
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

	public BigDecimal getPersonalSales() {
		return personalSales;
	}

	public void setPersonalSales(BigDecimal personalSales) {
		this.personalSales = personalSales;
	}

	public BigDecimal getGroupSales() {
		return groupSales;
	}

	public void setGroupSales(BigDecimal groupSales) {
		this.groupSales = groupSales;
	}

	public BigDecimal getOverallSales() {
		return overallSales;
	}

	public void setOverallSales(BigDecimal overallSales) {
		this.overallSales = overallSales;
	}

	public BigDecimal getTotalEarnings() {
		return totalEarnings;
	}

	public void setTotalEarnings(BigDecimal totalEarnings) {
		this.totalEarnings = totalEarnings;
	}

	public BigDecimal getTaxDeducted() {
		return taxDeducted;
	}

	public void setTaxDeducted(BigDecimal taxDeducted) {
		this.taxDeducted = taxDeducted;
	}

	public BigDecimal getServiceDeduction() {
		return serviceDeduction;
	}

	public void setServiceDeduction(BigDecimal serviceDeduction) {
		this.serviceDeduction = serviceDeduction;
	}

	public BigDecimal getExtraAllowance() {
		return extraAllowance;
	}

	public void setExtraAllowance(BigDecimal extraAllowance) {
		this.extraAllowance = extraAllowance;
	}

	public BigDecimal getFinalPayout() {
		return finalPayout;
	}

	public void setFinalPayout(BigDecimal finalPayout) {
		this.finalPayout = finalPayout;
	}

	public String getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(String paymentDate) {
		this.paymentDate = paymentDate;
	}

	public String getPaymentBranch() {
		return paymentBranch;
	}

	public void setPaymentBranch(String paymentBranch) {
		this.paymentBranch = paymentBranch;
	}

	public String getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}

	public String getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public Long getPaymentFromLedgerId() {
		return paymentFromLedgerId;
	}

	public void setPaymentFromLedgerId(Long paymentFromLedgerId) {
		this.paymentFromLedgerId = paymentFromLedgerId;
	}

}
