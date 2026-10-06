package com.microfinance.dto;

import java.io.Serializable;

public class StatementTotalsDto implements Serializable {
    private static final long serialVersionUID = 1L;

    private double totalPaid;
    private double totalInterestPaid;
    private double totalPenaltyPaid;
    private double currentOutstanding;

    public StatementTotalsDto() {
    }

    public StatementTotalsDto(double totalPaid, double totalInterestPaid, double totalPenaltyPaid, double currentOutstanding) {
        this.totalPaid = totalPaid;
        this.totalInterestPaid = totalInterestPaid;
        this.totalPenaltyPaid = totalPenaltyPaid;
        this.currentOutstanding = currentOutstanding;
    }

    public double getTotalPaid() {
        return totalPaid;
    }

    public void setTotalPaid(double totalPaid) {
        this.totalPaid = totalPaid;
    }

    public double getTotalInterestPaid() {
        return totalInterestPaid;
    }

    public void setTotalInterestPaid(double totalInterestPaid) {
        this.totalInterestPaid = totalInterestPaid;
    }

    public double getTotalPenaltyPaid() {
        return totalPenaltyPaid;
    }

    public void setTotalPenaltyPaid(double totalPenaltyPaid) {
        this.totalPenaltyPaid = totalPenaltyPaid;
    }

    public double getCurrentOutstanding() {
        return currentOutstanding;
    }

    public void setCurrentOutstanding(double currentOutstanding) {
        this.currentOutstanding = currentOutstanding;
    }
}
