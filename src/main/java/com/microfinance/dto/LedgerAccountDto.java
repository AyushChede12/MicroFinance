package com.microfinance.dto;

import java.math.BigDecimal;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class LedgerAccountDto {
	
	private Long accountId; // Hidden in JSP for edit mode

    @NotBlank(message = "Account code is required")
    @Size(max = 20, message = "Account code must be at most 20 characters")
    private String accountCode;

    @NotBlank(message = "Account title is required")
    @Size(max = 100, message = "Account title must be at most 100 characters")
    private String accountTitle;

    @NotBlank(message = "Group Name is required")
    private String groupName; // e.g., ASSETS, LIABILITIES, INCOME...

    @NotBlank(message = "Account Type is required")
    private String accountType; // e.g., Cash, Bank, Loan

    @DecimalMin(value = "0.00", inclusive = true, message = "Opening balance cannot be negative")
    private BigDecimal openingBalance = BigDecimal.ZERO;
    
    
    @Size(min = 2, max = 2, message = "Opening balance type must be exactly 2 characters")
    private String openingBalanceType;


    @DecimalMin(value = "0.00", inclusive = true)
    private BigDecimal currentBalance = BigDecimal.ZERO; // System-updated

    @NotBlank(message = "Status is required")
    private String status; // e.g., Active, Inactive

    @NotBlank(message = "Branch name is required")
    private String branchName;

    // ===== Getters & Setters =====
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
