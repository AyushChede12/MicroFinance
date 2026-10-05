package com.microfinance.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class BranchModule {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String branchCode;
	private String branchName;
	private String openingDate;
	private String address;
	private String pin;
	private String state;
	private String branchManagerContactNo;
	private String accountDepartmentContactNo;

	@ManyToOne
	@JoinColumn(name = "bank_id")
	@JsonIgnore
	private BankModule bank;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBranchCode() {
		return branchCode;
	}

	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	public String getOpeningDate() {
		return openingDate;
	}

	public void setOpeningDate(String openingDate) {
		this.openingDate = openingDate;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPin() {
		return pin;
	}

	public void setPin(String pin) {
		this.pin = pin;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getBranchManagerContactNo() {
		return branchManagerContactNo;
	}

	public void setBranchManagerContactNo(String branchManagerContactNo) {
		this.branchManagerContactNo = branchManagerContactNo;
	}

	public String getAccountDepartmentContactNo() {
		return accountDepartmentContactNo;
	}

	public void setAccountDepartmentContactNo(String accountDepartmentContactNo) {
		this.accountDepartmentContactNo = accountDepartmentContactNo;
	}

	public BankModule getBank() {
		return bank;
	}

	public void setBank(BankModule bank) {
		this.bank = bank;
	}

}
