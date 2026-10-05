package com.microfinance.dto;

public class InterBranchTransferDTO {

	private String transactionDate;
	private String sourceBranch;
	private String receivingBranch;
	private String accountCode;
	private Double amount;

	public String getTransactionDate() {
		return transactionDate;
	}

	public void setTransactionDate(String transactionDate) {
		this.transactionDate = transactionDate;
	}

	public String getSourceBranch() {
		return sourceBranch;
	}

	public void setSourceBranch(String sourceBranch) {
		this.sourceBranch = sourceBranch;
	}

	public String getReceivingBranch() {
		return receivingBranch;
	}

	public void setReceivingBranch(String receivingBranch) {
		this.receivingBranch = receivingBranch;
	}

	public String getAccountCode() {
		return accountCode;
	}

	public void setAccountCode(String accountCode) {
		this.accountCode = accountCode;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

}
