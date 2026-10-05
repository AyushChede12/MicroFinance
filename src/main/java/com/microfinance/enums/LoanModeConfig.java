package com.microfinance.enums;

public enum LoanModeConfig {
    DAILY("Daily", "Days", 30, 180, 24.0, 36.0),
    WEEKLY("Weekly", "Weeks", 8, 52, 20.0, 30.0),
    FORTNIGHTLY("Fortnightly", "Fortnights", 6, 24, 18.0, 28.0),
    MONTHLY("Monthly", "Months", 6, 60, 12.0, 24.0),
    QUARTERLY("Quarterly", "Quarters", 4, 20, 12.0, 20.0),
    HALF_YEARLY("Half-Yearly", "Half-Years", 2, 10, 12.0, 18.0);

    private final String modeName;
    private final String termUnit;
    private final int minTerm;
    private final int maxTerm;
    private final double minInterestRate;
    private final double maxInterestRate;

    LoanModeConfig(String modeName, String termUnit, int minTerm, int maxTerm, double minInterestRate, double maxInterestRate) {
        this.modeName = modeName;
        this.termUnit = termUnit;
        this.minTerm = minTerm;
        this.maxTerm = maxTerm;
        this.minInterestRate = minInterestRate;
        this.maxInterestRate = maxInterestRate;
    }

    public String getModeName() {
        return modeName;
    }

    public String getTermUnit() {
        return termUnit;
    }

    public int getMinTerm() {
        return minTerm;
    }

    public int getMaxTerm() {
        return maxTerm;
    }

    public double getMinInterestRate() {
        return minInterestRate;
    }

    public double getMaxInterestRate() {
        return maxInterestRate;
    }

    public static LoanModeConfig fromMode(String mode) {
        if (mode == null) return null;
        String normalized = mode.trim().toLowerCase().replace("-", "").replace(" ", "").replace("_", "");
        for (LoanModeConfig config : values()) {
            String enumNormalized = config.name().toLowerCase().replace("_", "");
            String modeNormalized = config.modeName.toLowerCase().replace("-", "").replace(" ", "").replace("_", "");
            if (normalized.equals(enumNormalized) || normalized.equals(modeNormalized)) {
                return config;
            }
        }
        return null;
    }

    public boolean isTermInRange(int term) {
        return term >= minTerm && term <= maxTerm;
    }

    public boolean isRateInRange(double rate) {
        return rate >= minInterestRate && rate <= maxInterestRate;
    }
}
