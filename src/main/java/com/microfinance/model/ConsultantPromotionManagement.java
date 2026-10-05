package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ConsultantPromotionManagement {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String financialCode;
	private String branchName;
	private String oldPosition;
	private String newPosition;
	private String promotionDate;
	private String seniorCode;
	private String seniorName;
	private String seniorPosition;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getFinancialCode() {
		return financialCode;
	}
	public void setFinancialCode(String financialCode) {
		this.financialCode = financialCode;
	}
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	public String getOldPosition() {
		return oldPosition;
	}
	public void setOldPosition(String oldPosition) {
		this.oldPosition = oldPosition;
	}
	public String getNewPosition() {
		return newPosition;
	}
	public void setNewPosition(String newPosition) {
		this.newPosition = newPosition;
	}
	public String getSeniorCode() {
		return seniorCode;
	}
	public void setSeniorCode(String seniorCode) {
		this.seniorCode = seniorCode;
	}
	public String getSeniorName() {
		return seniorName;
	}
	public void setSeniorName(String seniorName) {
		this.seniorName = seniorName;
	}
	public String getPromotionDate() {
		return promotionDate;
	}
	public void setPromotionDate(String promotionDate) {
		this.promotionDate = promotionDate;
	}
	public String getSeniorPosition() {
		return seniorPosition;
	}
	public void setSeniorPosition(String seniorPosition) {
		this.seniorPosition = seniorPosition;
	}

}
