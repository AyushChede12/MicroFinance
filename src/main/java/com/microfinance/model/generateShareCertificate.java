package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity

public class generateShareCertificate {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	private long id;
	private String referralCodeEntry;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getReferralCodeEntry() {
		return referralCodeEntry;
	}
	public void setReferralCodeEntry(String referralCodeEntry) {
		this.referralCodeEntry = referralCodeEntry;
	}
	
	

}
