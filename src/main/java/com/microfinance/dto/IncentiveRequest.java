package com.microfinance.dto;

public class IncentiveRequest {

	private String teamMemberCode;

	/**
	 * Month number: 1 = January 2 = February ... 12 = December
	 */
	private int month;

	// Optional (future use)
	private int year;

	public String getTeamMemberCode() {
		return teamMemberCode;
	}

	public void setTeamMemberCode(String teamMemberCode) {
		this.teamMemberCode = teamMemberCode;
	}

	public int getMonth() {
		return month;
	}

	public void setMonth(int month) {
		this.month = month;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}
}
