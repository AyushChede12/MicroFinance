package com.microfinance.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class LedgerSummaryDto {
	
    private String dateOfEntry;
    private String voucherId;        // Voucher ID or Reference No.
    private String remarks;        // Remarks
    private String accountCode;      // Ledger Account Code (e.g. 106)
    private String debit;        // Debit Amount
    private String credit;       // Credit Amount

    // Optional: opening & closing balance (for report header)
    private BigDecimal openingBalance;
    private BigDecimal closingBalance;
	public String getDateOfEntry() {
		return dateOfEntry;
	}
	public void setDateOfEntry(String dateOfEntry) {
		this.dateOfEntry = dateOfEntry;
	}
	public String getVoucherId() {
		return voucherId;
	}
	public void setVoucherId(String voucherId) {
		this.voucherId = voucherId;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getAccountCode() {
		return accountCode;
	}
	public void setAccountCode(String accountCode) {
		this.accountCode = accountCode;
	}
	
	
	public String getDebit() {
		return debit;
	}
	public void setDebit(String debit) {
		this.debit = debit;
	}
	public String getCredit() {
		return credit;
	}
	public void setCredit(String credit) {
		this.credit = credit;
	}
	public BigDecimal getOpeningBalance() {
		return openingBalance;
	}
	public void setOpeningBalance(BigDecimal openingBalance) {
		this.openingBalance = openingBalance;
	}
	public BigDecimal getClosingBalance() {
		return closingBalance;
	}
	public void setClosingBalance(BigDecimal closingBalance) {
		this.closingBalance = closingBalance;
	}
    
    
    
    
}