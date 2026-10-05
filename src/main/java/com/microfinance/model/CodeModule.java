package com.microfinance.model;

import javax.persistence.*;

@Entity
public class CodeModule {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private boolean branchPrefix;
	private String codePrefix;
	private int noOfDigit;
	private int lastNo;
	private String preview;

	// === Getters and Setters ===

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isBranchPrefix() {
		return branchPrefix;
	}

	public void setBranchPrefix(boolean branchPrefix) {
		this.branchPrefix = branchPrefix;
	}

	public String getCodePrefix() {
		return codePrefix;
	}

	public void setCodePrefix(String codePrefix) {
		this.codePrefix = codePrefix;
	}

	public int getNoOfDigit() {
		return noOfDigit;
	}

	public void setNoOfDigit(int noOfDigit) {
		this.noOfDigit = noOfDigit;
	}

	public int getLastNo() {
		return lastNo;
	}

	public void setLastNo(int lastNo) {
		this.lastNo = lastNo;
	}

	public String getPreview() {
		return preview;
	}

	public void setPreview(String preview) {
		this.preview = preview;
	}

	// === toString() if needed ===
	@Override
	public String toString() {
		return "CodeModule{" + "id=" + id + ", name='" + name + '\'' + ", branchPrefix=" + branchPrefix
				+ ", codePrefix='" + codePrefix + '\'' + ", noOfDigit=" + noOfDigit + ", lastNo=" + lastNo
				+ ", preview='" + preview + '\'' + '}';
	}
}
