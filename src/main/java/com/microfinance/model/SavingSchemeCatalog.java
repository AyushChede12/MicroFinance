package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class SavingSchemeCatalog {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String policyName;
	private String yearlyROI;
	private String customerName;
	private String initialDeposite;
	private String monthlyMinimumBalance;
	private String reservedFunds;
	private String messagingFees;
	private String messagingInterval;
	private String monthlyFreeIFSCTransactions;
	private String FreeMoneyTransfers;
	private String limitperTransaction;
	private String dailyLimit;
	private String weeklyLimit;
	private String monthlyLimit;
	private String serviceFee;
	private String billingCycle;
	private String cardFee;
	private String monthlyCardLimit;
	private String yearlyCardLimit;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getPolicyName() {
		return policyName;
	}
	public void setPolicyName(String policyName) {
		this.policyName = policyName;
	}
	public String getYearlyROI() {
		return yearlyROI;
	}
	public void setYearlyROI(String yearlyROI) {
		this.yearlyROI = yearlyROI;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getInitialDeposite() {
		return initialDeposite;
	}
	public void setInitialDeposite(String initialDeposite) {
		this.initialDeposite = initialDeposite;
	}
	public String getMonthlyMinimumBalance() {
		return monthlyMinimumBalance;
	}
	public void setMonthlyMinimumBalance(String monthlyMinimumBalance) {
		this.monthlyMinimumBalance = monthlyMinimumBalance;
	}
	public String getReservedFunds() {
		return reservedFunds;
	}
	public void setReservedFunds(String reservedFunds) {
		this.reservedFunds = reservedFunds;
	}
	public String getMessagingFees() {
		return messagingFees;
	}
	public void setMessagingFees(String messagingFees) {
		this.messagingFees = messagingFees;
	}
	public String getMessagingInterval() {
		return messagingInterval;
	}
	public void setMessagingInterval(String messagingInterval) {
		this.messagingInterval = messagingInterval;
	}
	public String getMonthlyFreeIFSCTransactions() {
		return monthlyFreeIFSCTransactions;
	}
	public void setMonthlyFreeIFSCTransactions(String monthlyFreeIFSCTransactions) {
		this.monthlyFreeIFSCTransactions = monthlyFreeIFSCTransactions;
	}
	public String getFreeMoneyTransfers() {
		return FreeMoneyTransfers;
	}
	public void setFreeMoneyTransfers(String freeMoneyTransfers) {
		FreeMoneyTransfers = freeMoneyTransfers;
	}
	public String getLimitperTransaction() {
		return limitperTransaction;
	}
	public void setLimitperTransaction(String limitperTransaction) {
		this.limitperTransaction = limitperTransaction;
	}
	public String getDailyLimit() {
		return dailyLimit;
	}
	public void setDailyLimit(String dailyLimit) {
		this.dailyLimit = dailyLimit;
	}
	public String getWeeklyLimit() {
		return weeklyLimit;
	}
	public void setWeeklyLimit(String weeklyLimit) {
		this.weeklyLimit = weeklyLimit;
	}
	public String getMonthlyLimit() {
		return monthlyLimit;
	}
	public void setMonthlyLimit(String monthlyLimit) {
		this.monthlyLimit = monthlyLimit;
	}
	public String getServiceFee() {
		return serviceFee;
	}
	public void setServiceFee(String serviceFee) {
		this.serviceFee = serviceFee;
	}
	public String getBillingCycle() {
		return billingCycle;
	}
	public void setBillingCycle(String billingCycle) {
		this.billingCycle = billingCycle;
	}
	public String getCardFee() {
		return cardFee;
	}
	public void setCardFee(String cardFee) {
		this.cardFee = cardFee;
	}
	public String getMonthlyCardLimit() {
		return monthlyCardLimit;
	}
	public void setMonthlyCardLimit(String monthlyCardLimit) {
		this.monthlyCardLimit = monthlyCardLimit;
	}
	public String getYearlyCardLimit() {
		return yearlyCardLimit;
	}
	public void setYearlyCardLimit(String yearlyCardLimit) {
		this.yearlyCardLimit = yearlyCardLimit;
	}
	
	
	
	
}
