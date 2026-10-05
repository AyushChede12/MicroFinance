package com.microfinance.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class partialMaturityPayment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private long id;
	private String policyCode;
	private String planCode;
	private String customerName;
	private String policyName;
	private String duration;
	private String policyAmount;
	private String maturityAmount;
	private String maturityDate;
	private String sysPayable;
	private String deduction;
	private String netPayable;
	private String approveBranch;
	private boolean approveStatus;
	private String teamMemberCode;
	private String teamMemberName;
	private String depositAmount;
	private String dueAmount;
	private LocalDate closingDate;
	private String Comment;
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
	public String getPlanCode() {
		return planCode;
	}
	public void setPlanCode(String planCode) {
		this.planCode = planCode;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getPolicyName() {
		return policyName;
	}
	public void setPolicyName(String policyName) {
		this.policyName = policyName;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	public String getPolicyAmount() {
		return policyAmount;
	}
	public void setPolicyAmount(String policyAmount) {
		this.policyAmount = policyAmount;
	}
	public String getMaturityAmount() {
		return maturityAmount;
	}
	public void setMaturityAmount(String maturityAmount) {
		this.maturityAmount = maturityAmount;
	}
	public String getMaturityDate() {
		return maturityDate;
	}
	public void setMaturityDate(String maturityDate) {
		this.maturityDate = maturityDate;
	}
	public String getSysPayable() {
		return sysPayable;
	}
	public void setSysPayable(String sysPayable) {
		this.sysPayable = sysPayable;
	}
	public String getDeduction() {
		return deduction;
	}
	public void setDeduction(String deduction) {
		this.deduction = deduction;
	}
	public String getNetPayable() {
		return netPayable;
	}
	public void setNetPayable(String netPayable) {
		this.netPayable = netPayable;
	}
	public String getApproveBranch() {
		return approveBranch;
	}
	public void setApproveBranch(String approveBranch) {
		this.approveBranch = approveBranch;
	}
	public boolean isApproveStatus() {
		return approveStatus;
	}
	public void setApproveStatus(boolean approveStatus) {
		this.approveStatus = approveStatus;
	}
	public String getTeamMemberCode() {
		return teamMemberCode;
	}
	public void setTeamMemberCode(String teamMemberCode) {
		this.teamMemberCode = teamMemberCode;
	}
	public String getTeamMemberName() {
		return teamMemberName;
	}
	public void setTeamMemberName(String teamMemberName) {
		this.teamMemberName = teamMemberName;
	}
	public String getDepositAmount() {
		return depositAmount;
	}
	public void setDepositAmount(String depositAmount) {
		this.depositAmount = depositAmount;
	}
	public String getDueAmount() {
		return dueAmount;
	}
	public void setDueAmount(String dueAmount) {
		this.dueAmount = dueAmount;
	}
	
	public String getComment() {
		return Comment;
	}
	public void setComment(String comment) {
		Comment = comment;
	}
	public LocalDate getClosingDate() {
		return closingDate;
	}
	public void setClosingDate(LocalDate closingDate) {
		this.closingDate = closingDate;
	}
	
	
	
	
}
