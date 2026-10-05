package com.microfinance.dto;

public class TrialBalanceReportDto {
	
	 private String ledgerName;
	    private String accountCode;
	    private String opening;
	    private String debit;
	    private String credit;
	    private String closing;
		public String getLedgerName() {
			return ledgerName;
		}
		public void setLedgerName(String ledgerName) {
			this.ledgerName = ledgerName;
		}
		public String getAccountCode() {
			return accountCode;
		}
		public void setAccountCode(String accountCode) {
			this.accountCode = accountCode;
		}
		public String getOpening() {
			return opening;
		}
		public void setOpening(String opening) {
			this.opening = opening;
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
		public String getClosing() {
			return closing;
		}
		public void setClosing(String closing) {
			this.closing = closing;
		}

}
