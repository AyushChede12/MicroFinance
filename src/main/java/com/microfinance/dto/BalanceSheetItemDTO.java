package com.microfinance.dto;

public class BalanceSheetItemDTO {

	private String name;
	private String amount;

	public BalanceSheetItemDTO() {
	}

	public BalanceSheetItemDTO(String name, String amount) {
		this.name = name;
		this.amount = amount;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}
}
