package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class DailyDepositPM {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String drd;
	private String planCodeDD;

	private String planNameDD;
	private String minimumDeposit;
	private String rateOfInterest;
	private String installmentType;
	private String ddterm;
	private String commissionOnNew;
	private String renewalCommission;
	private String interestInterval;
	private String totalPaid;
	private String maturityAmount;
	private String flexiblePlan;
	private String graceDays;
	private String  penaltyRate;
	private String statusOfPlan;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDrd() {
		return drd;
	}
	public void setDrd(String drd) {
		this.drd = drd;
	}
	public String getPlanCodeDD() {
		return planCodeDD;
	}
	public void setPlanCodeDD(String planCodeDD) {
		this.planCodeDD = planCodeDD;
	}
	public String getPlanNameDD() {
		return planNameDD;
	}
	public void setPlanNameDD(String planNameDD) {
		this.planNameDD = planNameDD;
	}
	public String getMinimumDeposit() {
		return minimumDeposit;
	}
	public void setMinimumDeposit(String minimumDeposit) {
		this.minimumDeposit = minimumDeposit;
	}
	public String getRateOfInterest() {
		return rateOfInterest;
	}
	public void setRateOfInterest(String rateOfInterest) {
		this.rateOfInterest = rateOfInterest;
	}
	public String getInstallmentType() {
		return installmentType;
	}
	public void setInstallmentType(String installmentType) {
		this.installmentType = installmentType;
	}
	public String getDdterm() {
		return ddterm;
	}
	public void setDdterm(String ddterm) {
		this.ddterm = ddterm;
	}
	public String getCommissionOnNew() {
		return commissionOnNew;
	}
	public void setCommissionOnNew(String commissionOnNew) {
		this.commissionOnNew = commissionOnNew;
	}
	public String getRenewalCommission() {
		return renewalCommission;
	}
	public void setRenewalCommission(String renewalCommission) {
		this.renewalCommission = renewalCommission;
	}
	public String getInterestInterval() {
		return interestInterval;
	}
	public void setInterestInterval(String interestInterval) {
		this.interestInterval = interestInterval;
	}
	public String getTotalPaid() {
		return totalPaid;
	}
	public void setTotalPaid(String totalPaid) {
		this.totalPaid = totalPaid;
	}
	public String getMaturityAmount() {
		return maturityAmount;
	}
	public void setMaturityAmount(String maturityAmount) {
		this.maturityAmount = maturityAmount;
	}
	public String getFlexiblePlan() {
		return flexiblePlan;
	}
	public void setFlexiblePlan(String flexiblePlan) {
		this.flexiblePlan = flexiblePlan;
	}
	public String getGraceDays() {
		return graceDays;
	}
	public void setGraceDays(String graceDays) {
		this.graceDays = graceDays;
	}
	public String getPenaltyRate() {
		return penaltyRate;
	}
	public void setPenaltyRate(String penaltyRate) {
		this.penaltyRate = penaltyRate;
	}
	public String getStatusOfPlan() {
		return statusOfPlan;
	}
	public void setStatusOfPlan(String statusOfPlan) {
		this.statusOfPlan = statusOfPlan;
	}
	
}