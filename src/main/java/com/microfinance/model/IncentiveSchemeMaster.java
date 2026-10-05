package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity

public class IncentiveSchemeMaster {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private long id;
	private String incentiveMonth;
	private String dateFrom;
	private String dateTo;
	private String comments;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getIncentiveMonth() {
		return incentiveMonth;
	}
	public void setIncentiveMonth(String incentiveMonth) {
		this.incentiveMonth = incentiveMonth;
	}
	public String getDateFrom() {
		return dateFrom;
	}
	public void setDateFrom(String dateFrom) {
		this.dateFrom = dateFrom;
	}
	
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public String getDateTo() {
		return dateTo;
	}
	public void setDateTo(String dateTo) {
		this.dateTo = dateTo;
	}
	
		
}
	
