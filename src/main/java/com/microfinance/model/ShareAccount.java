package com.microfinance.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

@Entity
public class ShareAccount {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	/**
	 * BANK / CUSTOMER
	 */
	@Column(name = "holder_type", nullable = false)
	private String holderType;

	/**
	 * customer_id OR 0 for BANK
	 */
	@Column(name = "holder_id", nullable = false)
	private Long holderId;

	@Column(name = "total_shares", nullable = false)
	private Integer totalShares;

	@Column(name = "status", length = 10)
	private String status;

	@Column(name = "last_updated")
	private LocalDateTime lastUpdated;

	// 🔹 Auto update timestamp
	@PrePersist
	@PreUpdate
	protected void onUpdate() {
		this.lastUpdated = LocalDateTime.now();
	}

	// ================= GETTERS & SETTERS =================

	public Long getId() {
		return id;
	}

	public String getHolderType() {
		return holderType;
	}

	public void setHolderType(String holderType) {
		this.holderType = holderType;
	}

	public Long getHolderId() {
		return holderId;
	}

	public void setHolderId(Long holderId) {
		this.holderId = holderId;
	}

	public Integer getTotalShares() {
		return totalShares;
	}

	public void setTotalShares(Integer totalShares) {
		this.totalShares = totalShares;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getLastUpdated() {
		return lastUpdated;
	}

}
