package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ManualJournalEntry {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

	private String branchName;
	private String voucherID;
    private String dateOfEntry;
    private String creditLedger;
    private String debitLedger;
    private String transactionAmount;
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
