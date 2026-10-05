package com.microfinance.model;

import java.math.BigDecimal;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "apply_for_gold_item")
public class ApplyForGoldItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "gold_loan_id")
	@JsonBackReference
	private ApplyForGold applyForGold;

	private String itemName;
	private String itemType;
	private Integer karat;

	@Column(precision = 12, scale = 2)
	private BigDecimal custgoldRate;

	private String lockerBranch;

	@Column(precision = 8, scale = 4)
	private BigDecimal purity;

	private Integer itemQty;

	@Column(precision = 10, scale = 3)
	private BigDecimal itemWt;

	@Column(precision = 10, scale = 3)
	private BigDecimal grossWt;

	@Column(precision = 10, scale = 3)
	private BigDecimal stoneWt;

	@Column(precision = 10, scale = 3)
	private BigDecimal netWt;

	@Column(precision = 14, scale = 2)
	private BigDecimal marketValuation;

	@Column(precision = 14, scale = 2)
	private BigDecimal eligibleLoan;

	@Column(columnDefinition = "LONGTEXT")
	private String itemPhoto;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ApplyForGold getApplyForGold() {
		return applyForGold;
	}

	public void setApplyForGold(ApplyForGold applyForGold) {
		this.applyForGold = applyForGold;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemType() {
		return itemType;
	}

	public void setItemType(String itemType) {
		this.itemType = itemType;
	}

	public Integer getKarat() {
		return karat;
	}

	public void setKarat(Integer karat) {
		this.karat = karat;
	}

	public BigDecimal getCustgoldRate() {
		return custgoldRate;
	}

	public void setCustgoldRate(BigDecimal custgoldRate) {
		this.custgoldRate = custgoldRate;
	}

	public String getLockerBranch() {
		return lockerBranch;
	}

	public void setLockerBranch(String lockerBranch) {
		this.lockerBranch = lockerBranch;
	}

	public BigDecimal getPurity() {
		return purity;
	}

	public void setPurity(BigDecimal purity) {
		this.purity = purity;
	}

	public Integer getItemQty() {
		return itemQty;
	}

	public void setItemQty(Integer itemQty) {
		this.itemQty = itemQty;
	}

	public BigDecimal getItemWt() {
		return itemWt;
	}

	public void setItemWt(BigDecimal itemWt) {
		this.itemWt = itemWt;
	}

	public BigDecimal getGrossWt() {
		return grossWt;
	}

	public void setGrossWt(BigDecimal grossWt) {
		this.grossWt = grossWt;
	}

	public BigDecimal getStoneWt() {
		return stoneWt;
	}

	public void setStoneWt(BigDecimal stoneWt) {
		this.stoneWt = stoneWt;
	}

	public BigDecimal getNetWt() {
		return netWt;
	}

	public void setNetWt(BigDecimal netWt) {
		this.netWt = netWt;
	}

	public BigDecimal getMarketValuation() {
		return marketValuation;
	}

	public void setMarketValuation(BigDecimal marketValuation) {
		this.marketValuation = marketValuation;
	}

	public BigDecimal getEligibleLoan() {
		return eligibleLoan;
	}

	public void setEligibleLoan(BigDecimal eligibleLoan) {
		this.eligibleLoan = eligibleLoan;
	}

	public String getItemPhoto() {
		return itemPhoto;
	}

	public void setItemPhoto(String itemPhoto) {
		this.itemPhoto = itemPhoto;
	}
}
