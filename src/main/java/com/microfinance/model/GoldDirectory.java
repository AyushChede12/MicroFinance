package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class GoldDirectory {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	// Customer Details
	private String customerCode;
	private String customerName;

	// Today's Rate
	private String karat;
	private String todayRate;
	private String custgoldRate;

	// Item Master
	private String itemMasterType;
	private String itemName;
	private String itemWeight;

	// Locker Master
	private String lockerBranch;
	private String lockerNumber;

	// Purity Master
	private String purityName;
	private String purity;
	private String itemPurityType;

	// Loan Details
	private String loanPlanName;
	private String typeOfLoan;
	private String loanMode;
	private String loanTerm;
	private String rateOfInterest;
	private String loanAmount;
	private String typeIntrest;
	private String emiPayment;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getKarat() {
		return karat;
	}

	public void setKarat(String karat) {
		this.karat = karat;
	}

	public String getItemMasterType() {
		return itemMasterType;
	}

	public void setItemMasterType(String itemMasterType) {
		this.itemMasterType = itemMasterType;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemWeight() {
		return itemWeight;
	}

	public void setItemWeight(String itemWeight) {
		this.itemWeight = itemWeight;
	}

	public String getPurityName() {
		return purityName;
	}

	public void setPurityName(String purityName) {
		this.purityName = purityName;
	}

	public String getPurity() {
		return purity;
	}

	public void setPurity(String purity) {
		this.purity = purity;
	}

	public String getItemPurityType() {
		return itemPurityType;
	}

	public void setItemPurityType(String itemPurityType) {
		this.itemPurityType = itemPurityType;
	}

	public String getCustomerCode() {
		return customerCode;
	}

	public void setCustomerCode(String customerCode) {
		this.customerCode = customerCode;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getLoanPlanName() {
		return loanPlanName;
	}

	public void setLoanPlanName(String loanPlanName) {
		this.loanPlanName = loanPlanName;
	}

	public String getTypeOfLoan() {
		return typeOfLoan;
	}

	public void setTypeOfLoan(String typeOfLoan) {
		this.typeOfLoan = typeOfLoan;
	}

	public String getLoanMode() {
		return loanMode;
	}

	public void setLoanMode(String loanMode) {
		this.loanMode = loanMode;
	}

	public String getLoanTerm() {
		return loanTerm;
	}

	public void setLoanTerm(String loanTerm) {
		this.loanTerm = loanTerm;
	}

	public String getRateOfInterest() {
		return rateOfInterest;
	}

	public void setRateOfInterest(String rateOfInterest) {
		this.rateOfInterest = rateOfInterest;
	}

	public String getLoanAmount() {
		return loanAmount;
	}

	public void setLoanAmount(String loanAmount) {
		this.loanAmount = loanAmount;
	}

	public String getTypeIntrest() {
		return typeIntrest;
	}

	public void setTypeIntrest(String typeIntrest) {
		this.typeIntrest = typeIntrest;
	}

	public String getEmiPayment() {
		return emiPayment;
	}

	public void setEmiPayment(String emiPayment) {
		this.emiPayment = emiPayment;
	}

	public String getTodayRate() {
		return todayRate;
	}

	public void setTodayRate(String todayRate) {
		this.todayRate = todayRate;
	}

	public String getCustgoldRate() {
		return custgoldRate;
	}

	public void setCustgoldRate(String custgoldRate) {
		this.custgoldRate = custgoldRate;
	}

	public String getLockerBranch() {
		return lockerBranch;
	}

	public void setLockerBranch(String lockerBranch) {
		this.lockerBranch = lockerBranch;
	}

	public String getLockerNumber() {
		return lockerNumber;
	}

	public void setLockerNumber(String lockerNumber) {
		this.lockerNumber = lockerNumber;
	}

}
