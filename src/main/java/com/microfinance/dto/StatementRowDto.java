package com.microfinance.dto;

import java.io.Serializable;

public class StatementRowDto implements Serializable {
    private static final long serialVersionUID = 1L;

    private int installmentNumber;
    private String dueDate;
    private double emiAmount;
    private double principalComponent;
    private double interestComponent;
    private double penaltyAmount;
    private String paidDate;
    private String status; // PAID, PENDING, OVERDUE
    private double runningBalance;

    public StatementRowDto() {
    }

    public StatementRowDto(int installmentNumber, String dueDate, double emiAmount, double principalComponent,
                           double interestComponent, double penaltyAmount, String paidDate, String status,
                           double runningBalance) {
        this.installmentNumber = installmentNumber;
        this.dueDate = dueDate;
        this.emiAmount = emiAmount;
        this.principalComponent = principalComponent;
        this.interestComponent = interestComponent;
        this.penaltyAmount = penaltyAmount;
        this.paidDate = paidDate;
        this.status = status;
        this.runningBalance = runningBalance;
    }

    public int getInstallmentNumber() {
        return installmentNumber;
    }

    public void setInstallmentNumber(int installmentNumber) {
        this.installmentNumber = installmentNumber;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public double getEmiAmount() {
        return emiAmount;
    }

    public void setEmiAmount(double emiAmount) {
        this.emiAmount = emiAmount;
    }

    public double getPrincipalComponent() {
        return principalComponent;
    }

    public void setPrincipalComponent(double principalComponent) {
        this.principalComponent = principalComponent;
    }

    public double getInterestComponent() {
        return interestComponent;
    }

    public void setInterestComponent(double interestComponent) {
        this.interestComponent = interestComponent;
    }

    public double getPenaltyAmount() {
        return penaltyAmount;
    }

    public void setPenaltyAmount(double penaltyAmount) {
        this.penaltyAmount = penaltyAmount;
    }

    public String getPaidDate() {
        return paidDate;
    }

    public void setPaidDate(String paidDate) {
        this.paidDate = paidDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getRunningBalance() {
        return runningBalance;
    }

    public void setRunningBalance(double runningBalance) {
        this.runningBalance = runningBalance;
    }
}
