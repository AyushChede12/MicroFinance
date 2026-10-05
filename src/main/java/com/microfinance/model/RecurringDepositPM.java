package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class RecurringDepositPM {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String rd;
    private String planCodeRD;
    private String planNameRD;
    private String minimumAmountRD;
    private String rateOfInterestRD;
    
    private String installmentTypeRD;
    private String rdterm;
    private String commissionOnNewRD;
    private String renewalCommissionRD;
    private String componentIntervalRD;
    private String totalPaidRD;
    private String flexiblePlanRD;
    private String maturityAmountRD;
    private String penaltyfineRD;
    private String graceDaysRD;
    private String statusOfPlanRD;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getRd() {
		return rd;
	}
	public void setRd(String rd) {
		this.rd = rd;
	}
	public String getPlanCodeRD() {
		return planCodeRD;
	}
	public void setPlanCodeRD(String planCodeRD) {
		this.planCodeRD = planCodeRD;
	}
	public String getPlanNameRD() {
		return planNameRD;
	}
	public void setPlanNameRD(String planNameRD) {
		this.planNameRD = planNameRD;
	}
	public String getMinimumAmountRD() {
		return minimumAmountRD;
	}
	public void setMinimumAmountRD(String minimumAmountRD) {
		this.minimumAmountRD = minimumAmountRD;
	}
	public String getRateOfInterestRD() {
		return rateOfInterestRD;
	}
	public void setRateOfInterestRD(String rateOfInterestRD) {
		this.rateOfInterestRD = rateOfInterestRD;
	}
	public String getInstallmentTypeRD() {
		return installmentTypeRD;
	}
	public void setInstallmentTypeRD(String installmentTypeRD) {
		this.installmentTypeRD = installmentTypeRD;
	}
	public String getRdterm() {
		return rdterm;
	}
	public void setRdterm(String rdterm) {
		this.rdterm = rdterm;
	}
	public String getCommissionOnNewRD() {
		return commissionOnNewRD;
	}
	public void setCommissionOnNewRD(String commissionOnNewRD) {
		this.commissionOnNewRD = commissionOnNewRD;
	}
	public String getRenewalCommissionRD() {
		return renewalCommissionRD;
	}
	public void setRenewalCommissionRD(String renewalCommissionRD) {
		this.renewalCommissionRD = renewalCommissionRD;
	}
	public String getComponentIntervalRD() {
		return componentIntervalRD;
	}
	public void setComponentIntervalRD(String componentIntervalRD) {
		this.componentIntervalRD = componentIntervalRD;
	}
	public String getTotalPaidRD() {
		return totalPaidRD;
	}
	public void setTotalPaidRD(String totalPaidRD) {
		this.totalPaidRD = totalPaidRD;
	}
	public String getFlexiblePlanRD() {
		return flexiblePlanRD;
	}
	public void setFlexiblePlanRD(String flexiblePlanRD) {
		this.flexiblePlanRD = flexiblePlanRD;
	}
	public String getMaturityAmountRD() {
		return maturityAmountRD;
	}
	public void setMaturityAmountRD(String maturityAmountRD) {
		this.maturityAmountRD = maturityAmountRD;
	}
	public String getPenaltyfineRD() {
		return penaltyfineRD;
	}
	public void setPenaltyfineRD(String penaltyfineRD) {
		this.penaltyfineRD = penaltyfineRD;
	}
	public String getGraceDaysRD() {
		return graceDaysRD;
	}
	public void setGraceDaysRD(String graceDaysRD) {
		this.graceDaysRD = graceDaysRD;
	}
	public String getStatusOfPlanRD() {
		return statusOfPlanRD;
	}
	public void setStatusOfPlanRD(String statusOfPlanRD) {
		this.statusOfPlanRD = statusOfPlanRD;
	}
    
}