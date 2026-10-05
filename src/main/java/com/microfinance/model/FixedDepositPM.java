package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class FixedDepositPM {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	private  long id;
	private String fd;
	private String planCodeFD;
	private String planNameFD;
	private String minimumAmountFD;
	private String rateOfInterestFD;
	private String fdterm;
	private String installmentTypeFD;
	private String commissionOnNewFD;
	private String componentIntervalFD;
	private String totalPaidFD;
	private String flexiblePlanFD;
	private String maturityAmountFD;
	private String renewalCommissionFD;
	private String graceDaysFD;
	private String penltyfineFD;
	private String statusOfPlanFD;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getPlanCodeFD() {
		return planCodeFD;
	}
	public void setPlanCodeFD(String planCodeFD) {
		this.planCodeFD = planCodeFD;
	}
	public String getPlanNameFD() {
		return planNameFD;
	}
	public void setPlanNameFD(String planNameFD) {
		this.planNameFD = planNameFD;
	}
	public String getMinimumAmountFD() {
		return minimumAmountFD;
	}
	public void setMinimumAmountFD(String minimumAmountFD) {
		this.minimumAmountFD = minimumAmountFD;
	}
	public String getRateOfInterestFD() {
		return rateOfInterestFD;
	}
	public void setRateOfInterestFD(String rateOfInterestFD) {
		this.rateOfInterestFD = rateOfInterestFD;
	}
	public String getFdterm() {
		return fdterm;
	}
	public void setFdterm(String fdterm) {
		this.fdterm = fdterm;
	}
	public String getInstallmentTypeFD() {
		return installmentTypeFD;
	}
	public void setInstallmentTypeFD(String installmentTypeFD) {
		this.installmentTypeFD = installmentTypeFD;
	}
	public String getCommissionOnNewFD() {
		return commissionOnNewFD;
	}
	public void setCommissionOnNewFD(String commissionOnNewFD) {
		this.commissionOnNewFD = commissionOnNewFD;
	}
	public String getComponentIntervalFD() {
		return componentIntervalFD;
	}
	public void setComponentIntervalFD(String componentIntervalFD) {
		this.componentIntervalFD = componentIntervalFD;
	}
	public String getTotalPaidFD() {
		return totalPaidFD;
	}
	public void setTotalPaidFD(String totalPaidFD) {
		this.totalPaidFD = totalPaidFD;
	}
	public String getFlexiblePlanFD() {
		return flexiblePlanFD;
	}
	public void setFlexiblePlanFD(String flexiblePlanFD) {
		this.flexiblePlanFD = flexiblePlanFD;
	}
	public String getMaturityAmountFD() {
		return maturityAmountFD;
	}
	public void setMaturityAmountFD(String maturityAmountFD) {
		this.maturityAmountFD = maturityAmountFD;
	}
	public String getRenewalCommissionFD() {
		return renewalCommissionFD;
	}
	public void setRenewalCommissionFD(String renewalCommissionFD) {
		this.renewalCommissionFD = renewalCommissionFD;
	}
	public String getGraceDaysFD() {
		return graceDaysFD;
	}
	public void setGraceDaysFD(String graceDaysFD) {
		this.graceDaysFD = graceDaysFD;
	}
	public String getPenltyfineFD() {
		return penltyfineFD;
	}
	public void setPenltyfineFD(String penltyfineFD) {
		this.penltyfineFD = penltyfineFD;
	}
	public String getStatusOfPlanFD() {
		return statusOfPlanFD;
	}
	public void setStatusOfPlanFD(String statusOfPlanFD) {
		this.statusOfPlanFD = statusOfPlanFD;
	}
	public String getFd() {
		return fd;
	}
	public void setFd(String fd) {
		this.fd = fd;
	}
	



}

