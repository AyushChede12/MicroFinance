package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class IrregulaInstallmentPayment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private long id;

	private String irragulaterLoanId;
	private String irragularLoanDate;
	private String irragularPlanName;
	private String irragularTypeIntrest;
	private String irragularFullNume;
	private String irragularPaymentEmi;
	private String irragularMemmberName;
	private String irragularLaonCategory;
	private String irragularTotalIntrestLoan;
	private String irragularLoanAmount;
	private String irragularPrincipalLoan;
	private String irragularBranchAddress;
	private String irragularRateIntrestLoan;
	private String irragularTotalLoanPayable;
	
	//Payment Details
	
	private String irragularDueIntrest;
	private String irragularRegistrationDate;
	private String irragularDuePrinciple;
	private String irragularDueTotalAmount;
	private String irragularAmountPayment;
	private String irragularDuedate;
	private String irragularAmountNet;
	private String irragularLoanIdName;
	private String irragularPaymentSource;
	private String irragularDownPayment;
	private String irragularAdvisorId;
	private String irragularFullNameAdvisor;
	private String irragularSectionRemark;
	
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getIrragulaterLoanId() {
		return irragulaterLoanId;
	}
	public void setIrragulaterLoanId(String irragulaterLoanId) {
		this.irragulaterLoanId = irragulaterLoanId;
	}
	public String getIrragularLoanDate() {
		return irragularLoanDate;
	}
	public void setIrragularLoanDate(String irragularLoanDate) {
		this.irragularLoanDate = irragularLoanDate;
	}
	public String getIrragularPlanName() {
		return irragularPlanName;
	}
	public void setIrragularPlanName(String irragularPlanName) {
		this.irragularPlanName = irragularPlanName;
	}
	public String getIrragularTypeIntrest() {
		return irragularTypeIntrest;
	}
	public void setIrragularTypeIntrest(String irragularTypeIntrest) {
		this.irragularTypeIntrest = irragularTypeIntrest;
	}
	public String getIrragularFullNume() {
		return irragularFullNume;
	}
	public void setIrragularFullNume(String irragularFullNume) {
		this.irragularFullNume = irragularFullNume;
	}
	public String getIrragularPaymentEmi() {
		return irragularPaymentEmi;
	}
	public void setIrragularPaymentEmi(String irragularPaymentEmi) {
		this.irragularPaymentEmi = irragularPaymentEmi;
	}
	public String getIrragularMemmberName() {
		return irragularMemmberName;
	}
	public void setIrragularMemmberName(String irragularMemmberName) {
		this.irragularMemmberName = irragularMemmberName;
	}
	public String getIrragularLaonCategory() {
		return irragularLaonCategory;
	}
	public void setIrragularLaonCategory(String irragularLaonCategory) {
		this.irragularLaonCategory = irragularLaonCategory;
	}
	public String getIrragularTotalIntrestLoan() {
		return irragularTotalIntrestLoan;
	}
	public void setIrragularTotalIntrestLoan(String irragularTotalIntrestLoan) {
		this.irragularTotalIntrestLoan = irragularTotalIntrestLoan;
	}
	public String getIrragularLoanAmount() {
		return irragularLoanAmount;
	}
	public void setIrragularLoanAmount(String irragularLoanAmount) {
		this.irragularLoanAmount = irragularLoanAmount;
	}
	public String getIrragularPrincipalLoan() {
		return irragularPrincipalLoan;
	}
	public void setIrragularPrincipalLoan(String irragularPrincipalLoan) {
		this.irragularPrincipalLoan = irragularPrincipalLoan;
	}
	public String getIrragularBranchAddress() {
		return irragularBranchAddress;
	}
	public void setIrragularBranchAddress(String irragularBranchAddress) {
		this.irragularBranchAddress = irragularBranchAddress;
	}
	public String getIrragularRateIntrestLoan() {
		return irragularRateIntrestLoan;
	}
	public void setIrragularRateIntrestLoan(String irragularRateIntrestLoan) {
		this.irragularRateIntrestLoan = irragularRateIntrestLoan;
	}
	public String getIrragularTotalLoanPayable() {
		return irragularTotalLoanPayable;
	}
	public void setIrragularTotalLoanPayable(String irragularTotalLoanPayable) {
		this.irragularTotalLoanPayable = irragularTotalLoanPayable;
	}
	public String getIrragularDueIntrest() {
		return irragularDueIntrest;
	}
	public void setIrragularDueIntrest(String irragularDueIntrest) {
		this.irragularDueIntrest = irragularDueIntrest;
	}
	public String getIrragularRegistrationDate() {
		return irragularRegistrationDate;
	}
	public void setIrragularRegistrationDate(String irragularRegistrationDate) {
		this.irragularRegistrationDate = irragularRegistrationDate;
	}
	public String getIrragularDuePrinciple() {
		return irragularDuePrinciple;
	}
	public void setIrragularDuePrinciple(String irragularDuePrinciple) {
		this.irragularDuePrinciple = irragularDuePrinciple;
	}
	public String getIrragularDueTotalAmount() {
		return irragularDueTotalAmount;
	}
	public void setIrragularDueTotalAmount(String irragularDueTotalAmount) {
		this.irragularDueTotalAmount = irragularDueTotalAmount;
	}
	public String getIrragularAmountPayment() {
		return irragularAmountPayment;
	}
	public void setIrragularAmountPayment(String irragularAmountPayment) {
		this.irragularAmountPayment = irragularAmountPayment;
	}
	public String getIrragularDuedate() {
		return irragularDuedate;
	}
	public void setIrragularDuedate(String irragularDuedate) {
		this.irragularDuedate = irragularDuedate;
	}
	public String getIrragularAmountNet() {
		return irragularAmountNet;
	}
	public void setIrragularAmountNet(String irragularAmountNet) {
		this.irragularAmountNet = irragularAmountNet;
	}
	public String getIrragularLoanIdName() {
		return irragularLoanIdName;
	}
	public void setIrragularLoanIdName(String irragularLoanIdName) {
		this.irragularLoanIdName = irragularLoanIdName;
	}
	public String getIrragularPaymentSource() {
		return irragularPaymentSource;
	}
	public void setIrragularPaymentSource(String irragularPaymentSource) {
		this.irragularPaymentSource = irragularPaymentSource;
	}
	public String getIrragularDownPayment() {
		return irragularDownPayment;
	}
	public void setIrragularDownPayment(String irragularDownPayment) {
		this.irragularDownPayment = irragularDownPayment;
	}
	public String getIrragularAdvisorId() {
		return irragularAdvisorId;
	}
	public void setIrragularAdvisorId(String irragularAdvisorId) {
		this.irragularAdvisorId = irragularAdvisorId;
	}
	public String getIrragularFullNameAdvisor() {
		return irragularFullNameAdvisor;
	}
	public void setIrragularFullNameAdvisor(String irragularFullNameAdvisor) {
		this.irragularFullNameAdvisor = irragularFullNameAdvisor;
	}
	public String getIrragularSectionRemark() {
		return irragularSectionRemark;
	}
	public void setIrragularSectionRemark(String irragularSectionRemark) {
		this.irragularSectionRemark = irragularSectionRemark;
	}
	
	
	
	
	
}
