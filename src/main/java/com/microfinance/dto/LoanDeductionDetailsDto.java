package com.microfinance.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class LoanDeductionDetailsDto {

	private Long id;
	private Long loanApplicationId;
	private String loanId;
	private BigDecimal loanAmount;
	private BigDecimal processingFee;
	private BigDecimal legalCharges;
	private BigDecimal gst;
	private BigDecimal insuranceFee;
	private BigDecimal valuationFees;
	private BigDecimal stationaryChargesFee;
	private BigDecimal totalDeductions;
	private BigDecimal netDisbursementAmount;
	private String employeeId;
	private String employeeName;
	private LocalDateTime createdAt;

	public LoanDeductionDetailsDto() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getLoanApplicationId() {
		return loanApplicationId;
	}

	public void setLoanApplicationId(Long loanApplicationId) {
		this.loanApplicationId = loanApplicationId;
	}

	public String getLoanId() {
		return loanId;
	}

	public void setLoanId(String loanId) {
		this.loanId = loanId;
	}

	public BigDecimal getLoanAmount() {
		return loanAmount;
	}

	public void setLoanAmount(BigDecimal loanAmount) {
		this.loanAmount = loanAmount;
	}

	public BigDecimal getProcessingFee() {
		return processingFee;
	}

	public void setProcessingFee(BigDecimal processingFee) {
		this.processingFee = processingFee;
	}

	public BigDecimal getLegalCharges() {
		return legalCharges;
	}

	public void setLegalCharges(BigDecimal legalCharges) {
		this.legalCharges = legalCharges;
	}

	public BigDecimal getGst() {
		return gst;
	}

	public void setGst(BigDecimal gst) {
		this.gst = gst;
	}

	public BigDecimal getInsuranceFee() {
		return insuranceFee;
	}

	public void setInsuranceFee(BigDecimal insuranceFee) {
		this.insuranceFee = insuranceFee;
	}

	public BigDecimal getValuationFees() {
		return valuationFees;
	}

	public void setValuationFees(BigDecimal valuationFees) {
		this.valuationFees = valuationFees;
	}

	public BigDecimal getStationaryChargesFee() {
		return stationaryChargesFee;
	}

	public void setStationaryChargesFee(BigDecimal stationaryChargesFee) {
		this.stationaryChargesFee = stationaryChargesFee;
	}

	public BigDecimal getTotalDeductions() {
		return totalDeductions;
	}

	public void setTotalDeductions(BigDecimal totalDeductions) {
		this.totalDeductions = totalDeductions;
	}

	public BigDecimal getNetDisbursementAmount() {
		return netDisbursementAmount;
	}

	public void setNetDisbursementAmount(BigDecimal netDisbursementAmount) {
		this.netDisbursementAmount = netDisbursementAmount;
	}

	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
}
