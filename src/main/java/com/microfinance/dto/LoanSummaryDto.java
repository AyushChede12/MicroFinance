package com.microfinance.dto;

import java.io.Serializable;

public class LoanSummaryDto implements Serializable {
    private static final long serialVersionUID = 1L;

    private String loanCode;
    private String customerName;
    private double principalAmount;
    private double interestRate;
    private int tenureMonths;
    private double emiAmount;
    private double outstandingPrincipal;
    private String startDate;

    public LoanSummaryDto() {
    }

    public LoanSummaryDto(String loanCode, String customerName, double principalAmount, double interestRate,
                          int tenureMonths, double emiAmount, double outstandingPrincipal, String startDate) {
        this.loanCode = loanCode;
        this.customerName = customerName;
        this.principalAmount = principalAmount;
        this.interestRate = interestRate;
        this.tenureMonths = tenureMonths;
        this.emiAmount = emiAmount;
        this.outstandingPrincipal = outstandingPrincipal;
        this.startDate = startDate;
    }

    public String getLoanCode() {
        return loanCode;
    }

    public void setLoanCode(String loanCode) {
        this.loanCode = loanCode;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public double getPrincipalAmount() {
        return principalAmount;
    }

    public void setPrincipalAmount(double principalAmount) {
        this.principalAmount = principalAmount;
    }

    public double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(double interestRate) {
        this.interestRate = interestRate;
    }

    public int getTenureMonths() {
        return tenureMonths;
    }

    public void setTenureMonths(int tenureMonths) {
        this.tenureMonths = tenureMonths;
    }

    public double getEmiAmount() {
        return emiAmount;
    }

    public void setEmiAmount(double emiAmount) {
        this.emiAmount = emiAmount;
    }

    public double getOutstandingPrincipal() {
        return outstandingPrincipal;
    }

    public void setOutstandingPrincipal(double outstandingPrincipal) {
        this.outstandingPrincipal = outstandingPrincipal;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }
}
