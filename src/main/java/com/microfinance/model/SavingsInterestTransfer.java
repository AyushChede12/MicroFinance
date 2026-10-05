package com.microfinance.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.*;

@Entity
public class SavingsInterestTransfer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// ===== CUSTOMER DETAILS =====
	@Column(name = "account_number", nullable = false)
	private String accountNumber;

	@Column(name = "customer_name")
	private String customerName;

	@Column(name = "account_type")
	private String accountType;

	@Column(name = "current_balance", precision = 15, scale = 2)
	private BigDecimal currentBalance;

	// ===== INTEREST DETAILS =====
	@Column(name = "interest_type")
	private String interestType; // monthly / quarterly / yearly

	@Column(name = "interest_rate", precision = 5, scale = 2)
	private BigDecimal interestRate;

	@Column(name = "from_date")
	private LocalDate fromDate;

	@Column(name = "to_date")
	private LocalDate toDate;

	@Column(name = "total_days")
	private Integer totalDays;

	// ===== CALCULATION PREVIEW =====
	@Column(name = "interest_amount", precision = 15, scale = 2)
	private BigDecimal interestAmount;

	@Column(name = "new_balance", precision = 15, scale = 2)
	private BigDecimal newBalance;

	// ===== AUDIT FIELDS (OPTIONAL BUT RECOMMENDED) =====
	@Column(name = "created_at")
	private LocalDate createdAt;

	@PrePersist
	protected void onCreate() {
		this.createdAt = LocalDate.now();
	}

	// ===== GETTERS & SETTERS =====

	public Long getId() {
		return id;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getAccountType() {
		return accountType;
	}

	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}

	public BigDecimal getCurrentBalance() {
		return currentBalance;
	}

	public void setCurrentBalance(BigDecimal currentBalance) {
		this.currentBalance = currentBalance;
	}

	public String getInterestType() {
		return interestType;
	}

	public void setInterestType(String interestType) {
		this.interestType = interestType;
	}

	public BigDecimal getInterestRate() {
		return interestRate;
	}

	public void setInterestRate(BigDecimal interestRate) {
		this.interestRate = interestRate;
	}

	public LocalDate getFromDate() {
		return fromDate;
	}

	public void setFromDate(LocalDate fromDate) {
		this.fromDate = fromDate;
	}

	public LocalDate getToDate() {
		return toDate;
	}

	public void setToDate(LocalDate toDate) {
		this.toDate = toDate;
	}

	public Integer getTotalDays() {
		return totalDays;
	}

	public void setTotalDays(Integer totalDays) {
		this.totalDays = totalDays;
	}

	public BigDecimal getInterestAmount() {
		return interestAmount;
	}

	public void setInterestAmount(BigDecimal interestAmount) {
		this.interestAmount = interestAmount;
	}

	public BigDecimal getNewBalance() {
		return newBalance;
	}

	public void setNewBalance(BigDecimal newBalance) {
		this.newBalance = newBalance;
	}

	public LocalDate getCreatedAt() {
		return createdAt;
	}
}
