package com.microfinance.dto;

public class TrialBalanceDTO {

	private String ledgerName;
	private Double opening;
	private Double debit;
	private Double credit;
	private Double closing;

	// 🔹 Default Constructor
	public TrialBalanceDTO() {
	}

	// 🔹 Parameterized Constructor
	public TrialBalanceDTO(String ledgerName, Double opening, Double debit, Double credit) {
		this.ledgerName = ledgerName;
		this.opening = opening != null ? opening : 0.0;
		this.debit = debit != null ? debit : 0.0;
		this.credit = credit != null ? credit : 0.0;

		// 🔥 Closing Calculation
		this.closing = this.opening + this.debit - this.credit;
	}

	// 🔹 Getters & Setters
	public String getLedgerName() {
		return ledgerName;
	}

	public void setLedgerName(String ledgerName) {
		this.ledgerName = ledgerName;
	}

	public Double getOpening() {
		return opening;
	}

	public void setOpening(Double opening) {
		this.opening = opening;
	}

	public Double getDebit() {
		return debit;
	}

	public void setDebit(Double debit) {
		this.debit = debit;
	}

	public Double getCredit() {
		return credit;
	}

	public void setCredit(Double credit) {
		this.credit = credit;
	}

	public Double getClosing() {
		return closing;
	}

	public void setClosing(Double closing) {
		this.closing = closing;
	}
}
