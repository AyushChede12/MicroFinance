package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class MaturitySchemeMaster {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@JsonProperty("policyCode")
	private String policyCode;

	@JsonProperty("schemeType")
	private String schemeType;

	@JsonProperty("instFrom")
	private String instFrom;

	@JsonProperty("instTo")
	private String instTo;

	@JsonProperty("interestRate")
	private String interestRate;

	@JsonProperty("deduction")
	private String deduction;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getPolicyCode() {
		return policyCode;
	}

	public void setPolicyCode(String policyCode) {
		this.policyCode = policyCode;
	}

	public String getSchemeType() {
		return schemeType;
	}

	public void setSchemeType(String schemeType) {
		this.schemeType = schemeType;
	}

	public String getInstFrom() {
		return instFrom;
	}

	public void setInstFrom(String instFrom) {
		this.instFrom = instFrom;
	}

	public String getInstTo() {
		return instTo;
	}

	public void setInstTo(String instTo) {
		this.instTo = instTo;
	}

	public String getInterestRate() {
		return interestRate;
	}

	public void setInterestRate(String interestRate) {
		this.interestRate = interestRate;
	}

	public String getDeduction() {
		return deduction;
	}

	public void setDeduction(String deduction) {
		this.deduction = deduction;
	}
}
