package com.microfinance.model;

import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class MaturitySchemeMaster {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	private long id;
	private String PolicyCode;
	private String InstFrom;
	private String InstTo;
	private String InterestRate;
	private String Deduction;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getPolicyCode() {
		return PolicyCode;
	}
	public void setPolicyCode(String policyCode) {
		PolicyCode = policyCode;
	}
	public String getInstFrom() {
		return InstFrom;
	}
	public void setInstFrom(String instFrom) {
		InstFrom = instFrom;
	}
	public String getInstTo() {
		return InstTo;
	}
	public void setInstTo(String instTo) {
		InstTo = instTo;
	}
	public String getInterestRate() {
		return InterestRate;
	}
	public void setInterestRate(String interestRate) {
		InterestRate = interestRate;
	}
	public String getDeduction() {
		return Deduction;
	}
	public void setDeduction(String deduction) {
		Deduction = deduction;
	}
	
	
	
	
	
	
	
}
