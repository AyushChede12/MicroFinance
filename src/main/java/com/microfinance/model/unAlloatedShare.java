package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity

public class unAlloatedShare {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private long id;
	private String selectDecisionMaker;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getSelectDecisionMaker() {
		return selectDecisionMaker;
	}
	public void setSelectDecisionMaker(String selectDecisionMaker) {
		this.selectDecisionMaker = selectDecisionMaker;
	}
	

}
