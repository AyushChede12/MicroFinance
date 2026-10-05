package com.microfinance.model;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "ledger_account_master", uniqueConstraints = {
		@UniqueConstraint(columnNames = { "accountCode", "branchName" }) })
public class LedgerAccountMaster {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long accountId; // Auto PK, hidden in form

	@Column(length = 20, nullable = false)
	private String accountCode; // Required, Unique

	@Column(length = 100, nullable = false)
	private String accountTitle; // Required

	@Column(length = 30, nullable = false)
	private String groupName; // "ASSETS", "LIABILITIES", etc.

	@Column(length = 30, nullable = false)
	private String accountType; // "Cash", "Bank", "Member", "Loan"

	@Column(precision = 15, scale = 2)
	private BigDecimal openingBalance = BigDecimal.ZERO; // Default 0

	@Column(nullable = false, length = 2)
	private String openingBalanceType = "DR"; // ("DR" / "CR")

	@Column(precision = 15, scale = 2, nullable = false)
	private BigDecimal currentBalance = BigDecimal.ZERO; // System updated

	@Column(length = 15, nullable = false)
	private String status = "Active"; // "Active" or "Inactive"

	@Column(length = 100, nullable = false)
	private String branchName; // Branch Name, required

	// ===== Getters and Setters =====

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public String getAccountCode() {
		return accountCode;
	}

	public void setAccountCode(String accountCode) {
		this.accountCode = accountCode;
	}

	public String getAccountTitle() {
		return accountTitle;
	}

	public void setAccountTitle(String accountTitle) {
		this.accountTitle = accountTitle;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getAccountType() {
		return accountType;
	}

	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}

	public BigDecimal getOpeningBalance() {
		return openingBalance;
	}

	public void setOpeningBalance(BigDecimal openingBalance) {
		this.openingBalance = openingBalance;
	}

	public String getOpeningBalanceType() {
		return openingBalanceType;
	}

	public void setOpeningBalanceType(String openingBalanceType) {
		this.openingBalanceType = openingBalanceType;
	}

	public BigDecimal getCurrentBalance() {
		return currentBalance;
	}

	public void setCurrentBalance(BigDecimal currentBalance) {
		this.currentBalance = currentBalance;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

}
