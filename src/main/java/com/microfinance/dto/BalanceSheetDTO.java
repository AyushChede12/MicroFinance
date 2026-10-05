package com.microfinance.dto;

import java.util.List;

public class BalanceSheetDTO {

	private String branchName;
	private String startDate;
	private String endDate;

	private List<BalanceSheetItemDTO> assets;
	private List<BalanceSheetItemDTO> liabilities;

	private String totalAssets;
	private String totalLiabilities;

	// Constructors
	public BalanceSheetDTO() {
	}

	public BalanceSheetDTO(String branchName, String startDate, String endDate, List<BalanceSheetItemDTO> assets,
			List<BalanceSheetItemDTO> liabilities, String totalAssets, String totalLiabilities) {
		this.branchName = branchName;
		this.startDate = startDate;
		this.endDate = endDate;
		this.assets = assets;
		this.liabilities = liabilities;
		this.totalAssets = totalAssets;
		this.totalLiabilities = totalLiabilities;
	}

	// Getters and Setters
	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public List<BalanceSheetItemDTO> getAssets() {
		return assets;
	}

	public void setAssets(List<BalanceSheetItemDTO> assets) {
		this.assets = assets;
	}

	public List<BalanceSheetItemDTO> getLiabilities() {
		return liabilities;
	}

	public void setLiabilities(List<BalanceSheetItemDTO> liabilities) {
		this.liabilities = liabilities;
	}

	public String getTotalAssets() {
		return totalAssets;
	}

	public void setTotalAssets(String totalAssets) {
		this.totalAssets = totalAssets;
	}

	public String getTotalLiabilities() {
		return totalLiabilities;
	}

	public void setTotalLiabilities(String totalLiabilities) {
		this.totalLiabilities = totalLiabilities;
	}
}