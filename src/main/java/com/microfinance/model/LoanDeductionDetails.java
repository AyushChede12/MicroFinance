package com.microfinance.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "loan_deduction_details")
@JsonIgnoreProperties(ignoreUnknown = true)
public class LoanDeductionDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "loan_application_id", foreignKey = @ForeignKey(javax.persistence.ConstraintMode.NO_CONSTRAINT))
	@JsonBackReference
	private LoanApplication loanApplication;

	@Column(name = "processing_fee", precision = 10, scale = 2)
	private BigDecimal processingFee = BigDecimal.ZERO;

	@Column(name = "legal_charges", precision = 10, scale = 2)
	private BigDecimal legalCharges = BigDecimal.ZERO;

	@Column(name = "gst", precision = 10, scale = 2)
	private BigDecimal gst = BigDecimal.ZERO;

	@Column(name = "insurance_fee", precision = 10, scale = 2)
	private BigDecimal insuranceFee = BigDecimal.ZERO;

	@Column(name = "valuation_fees", precision = 10, scale = 2)
	private BigDecimal valuationFees = BigDecimal.ZERO;

	@Column(name = "stationary_charges_fee", precision = 10, scale = 2)
	private BigDecimal stationaryChargesFee = BigDecimal.ZERO;

	@Column(name = "total_deductions", precision = 10, scale = 2)
	private BigDecimal totalDeductions = BigDecimal.ZERO;

	@Column(name = "net_disbursement_amount", precision = 10, scale = 2)
	private BigDecimal netDisbursementAmount = BigDecimal.ZERO;

	@Column(name = "employee_id", length = 50)
	private String employeeId;

	@Column(name = "employee_name", length = 100)
	private String employeeName;

	@Column(name = "created_at", updatable = false)
	private LocalDateTime createdAt;

	@PrePersist
	public void prePersist() {
		if (this.createdAt == null) {
			this.createdAt = LocalDateTime.now();
		}
	}

	public LoanDeductionDetails() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LoanApplication getLoanApplication() {
		return loanApplication;
	}

	public void setLoanApplication(LoanApplication loanApplication) {
		this.loanApplication = loanApplication;
	}

	public BigDecimal getProcessingFee() {
		return processingFee;
	}

	public void setProcessingFee(BigDecimal processingFee) {
		this.processingFee = processingFee != null ? processingFee : BigDecimal.ZERO;
	}

	public BigDecimal getLegalCharges() {
		return legalCharges;
	}

	public void setLegalCharges(BigDecimal legalCharges) {
		this.legalCharges = legalCharges != null ? legalCharges : BigDecimal.ZERO;
	}

	public BigDecimal getGst() {
		return gst;
	}

	public void setGst(BigDecimal gst) {
		this.gst = gst != null ? gst : BigDecimal.ZERO;
	}

	public BigDecimal getInsuranceFee() {
		return insuranceFee;
	}

	public void setInsuranceFee(BigDecimal insuranceFee) {
		this.insuranceFee = insuranceFee != null ? insuranceFee : BigDecimal.ZERO;
	}

	public BigDecimal getValuationFees() {
		return valuationFees;
	}

	public void setValuationFees(BigDecimal valuationFees) {
		this.valuationFees = valuationFees != null ? valuationFees : BigDecimal.ZERO;
	}

	public BigDecimal getStationaryChargesFee() {
		return stationaryChargesFee;
	}

	public void setStationaryChargesFee(BigDecimal stationaryChargesFee) {
		this.stationaryChargesFee = stationaryChargesFee != null ? stationaryChargesFee : BigDecimal.ZERO;
	}

	public BigDecimal getTotalDeductions() {
		return totalDeductions;
	}

	public void setTotalDeductions(BigDecimal totalDeductions) {
		this.totalDeductions = totalDeductions != null ? totalDeductions : BigDecimal.ZERO;
	}

	public BigDecimal getNetDisbursementAmount() {
		return netDisbursementAmount;
	}

	public void setNetDisbursementAmount(BigDecimal netDisbursementAmount) {
		this.netDisbursementAmount = netDisbursementAmount != null ? netDisbursementAmount : BigDecimal.ZERO;
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
