package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class MISDepositPM {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String mis;
	private String planCodeMD;
	private String planNameMD;
	private String rateOfInterestMD;
	private String installmentTypeMD;
	private String minimumAmountMD;
	private String maturityROIMD;
	private String misTerm;
	private String MISIntROIMD;
	private String MISIntervalMD;
	private String MISInterestMD;
	private String componentIntervalMD;
	private String totalPaidMD;
	private String graceDaysMD;
	private String penltyfineMD;
	private String maturityAmountMD;
	private String flexiblePlanMD;
	private String commissionOnNewMD;
	private String renewalCommissionMD;
	private String statusOfPlanMDRD2;

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getPlanCodeMD() {
		return planCodeMD;
	}
	public void setPlanCodeMD(String planCodeMD) {
		this.planCodeMD = planCodeMD;
	}
	public String getPlanNameMD() {
		return planNameMD;
	}
	public void setPlanNameMD(String planNameMD) {
		this.planNameMD = planNameMD;
	}
	public String getRateOfInterestMD() {
		return rateOfInterestMD;
	}
	public void setRateOfInterestMD(String rateOfInterestMD) {
		this.rateOfInterestMD = rateOfInterestMD;
	}
	public String getInstallmentTypeMD() {
		return installmentTypeMD;
	}
	public void setInstallmentTypeMD(String installmentTypeMD) {
		this.installmentTypeMD = installmentTypeMD;
	}
	public String getMinimumAmountMD() {
		return minimumAmountMD;
	}
	public void setMinimumAmountMD(String minimumAmountMD) {
		this.minimumAmountMD = minimumAmountMD;
	}
	public String getMaturityROIMD() {
		return maturityROIMD;
	}
	public void setMaturityROIMD(String maturityROIMD) {
		this.maturityROIMD = maturityROIMD;
	}
	public String getMisTerm() {
		return misTerm;
	}
	public void setMisTerm(String misTerm) {
		this.misTerm = misTerm;
	}
	public String getMISIntROIMD() {
		return MISIntROIMD;
	}
	public void setMISIntROIMD(String mISIntROIMD) {
		MISIntROIMD = mISIntROIMD;
	}
	public String getMISIntervalMD() {
		return MISIntervalMD;
	}
	public void setMISIntervalMD(String mISIntervalMD) {
		MISIntervalMD = mISIntervalMD;
	}
	public String getMISInterestMD() {
		return MISInterestMD;
	}
	public void setMISInterestMD(String mISInterestMD) {
		MISInterestMD = mISInterestMD;
	}
	public String getMaturityAmountMD() {
		return maturityAmountMD;
	}
	public void setMaturityAmountMD(String maturityAmountMD) {
		this.maturityAmountMD = maturityAmountMD;
	}
	public String getFlexiblePlanMD() {
		return flexiblePlanMD;
	}
	public void setFlexiblePlanMD(String flexiblePlanMD) {
		this.flexiblePlanMD = flexiblePlanMD;
	}
	public String getCommissionOnNewMD() {
		return commissionOnNewMD;
	}
	public void setCommissionOnNewMD(String commissionOnNewMD) {
		this.commissionOnNewMD = commissionOnNewMD;
	}
	public String getStatusOfPlanMDRD2() {
		return statusOfPlanMDRD2;
	}
	public void setStatusOfPlanMDRD2(String statusOfPlanMDRD2) {
		this.statusOfPlanMDRD2 = statusOfPlanMDRD2;
	}
	public String getRenewalCommissionMD() {
		return renewalCommissionMD;
	}
	public void setRenewalCommissionMD(String renewalCommissionMD) {
		this.renewalCommissionMD = renewalCommissionMD;
	}
	public String getComponentIntervalMD() {
		return componentIntervalMD;
	}
	public void setComponentIntervalMD(String componentIntervalMD) {
		this.componentIntervalMD = componentIntervalMD;
	}
	public String getTotalPaidMD() {
		return totalPaidMD;
	}
	public void setTotalPaidMD(String totalPaidMD) {
		this.totalPaidMD = totalPaidMD;
	}
	public String getGraceDaysMD() {
		return graceDaysMD;
	}
	public void setGraceDaysMD(String graceDaysMD) {
		this.graceDaysMD = graceDaysMD;
	}
	public String getPenltyfineMD() {
		return penltyfineMD;
	}
	public void setPenltyfineMD(String penltyfineMD) {
		this.penltyfineMD = penltyfineMD;
	}
	public String getMis() {
		return mis;
	}
	public void setMis(String mis) {
		this.mis = mis;
	}

	

}
