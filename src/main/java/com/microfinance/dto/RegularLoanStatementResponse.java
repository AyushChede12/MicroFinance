package com.microfinance.dto;

import java.io.Serializable;
import java.util.List;

public class RegularLoanStatementResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private LoanSummaryDto loanSummary;
    private List<StatementRowDto> statementRows;
    private StatementTotalsDto totals;

    public RegularLoanStatementResponse() {
    }

    public RegularLoanStatementResponse(LoanSummaryDto loanSummary, List<StatementRowDto> statementRows, StatementTotalsDto totals) {
        this.loanSummary = loanSummary;
        this.statementRows = statementRows;
        this.totals = totals;
    }

    public LoanSummaryDto getLoanSummary() {
        return loanSummary;
    }

    public void setLoanSummary(LoanSummaryDto loanSummary) {
        this.loanSummary = loanSummary;
    }

    public List<StatementRowDto> getStatementRows() {
        return statementRows;
    }

    public void setStatementRows(List<StatementRowDto> statementRows) {
        this.statementRows = statementRows;
    }

    public StatementTotalsDto getTotals() {
        return totals;
    }

    public void setTotals(StatementTotalsDto totals) {
        this.totals = totals;
    }
}
