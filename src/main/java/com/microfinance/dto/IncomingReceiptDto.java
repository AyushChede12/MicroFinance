package com.microfinance.dto;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class IncomingReceiptDto {
	
	
	private long id;
	
    @NotBlank(message = "Branch name must not be blank")
	private String branchName;
    
    private String voucherID; 
    
    @NotBlank(message = "Date of entry is required")
    private String dateOfEntry;
    
    @NotBlank(message = "Credit Ledger account must not be blank")
    private String creditLedger;
    
    @NotBlank(message = "Debit Ledger account must not be blank")
    private String debitLedger;

    
    @NotBlank(message = "Transfer mode is required")
    private String transferMode;
    
    private LocalDate chequeDate;

    private String chequeNo;

    private String bankName;
    
    private String transactionRef;

    @NotBlank(message = "Transaction amount must not be blank")
    private String transactionAmount;
    
    @NotBlank(message = "Remarks must not be blank")
    @Size(max = 255, message = "Remarks should not exceed 255 characters")
    private String remarks;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}


	public String getVoucherID() {
		return voucherID;
	}

	public void setVoucherID(String voucherID) {
		this.voucherID = voucherID;
	}

	public String getDateOfEntry() {
		return dateOfEntry;
	}

	public void setDateOfEntry(String dateOfEntry) {
		this.dateOfEntry = dateOfEntry;
	}

	public String getCreditLedger() {
		return creditLedger;
	}

	public void setCreditLedger(String creditLedger) {
		this.creditLedger = creditLedger;
	}

	public String getDebitLedger() {
		return debitLedger;
	}

	public void setDebitLedger(String debitLedger) {
		this.debitLedger = debitLedger;
	}

	public String getTransferMode() {
		return transferMode;
	}

	public void setTransferMode(String transferMode) {
		this.transferMode = transferMode;
	}

	public LocalDate getChequeDate() {
		return chequeDate;
	}

	public void setChequeDate(LocalDate chequeDate) {
		this.chequeDate = chequeDate;
	}

	public String getChequeNo() {
		return chequeNo;
	}

	public void setChequeNo(String chequeNo) {
		this.chequeNo = chequeNo;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getTransactionRef() {
		return transactionRef;
	}

	public void setTransactionRef(String transactionRef) {
		this.transactionRef = transactionRef;
	}

	public String getTransactionAmount() {
		return transactionAmount;
	}

	public void setTransactionAmount(String transactionAmount) {
		this.transactionAmount = transactionAmount;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

    
	
    

}
