package com.microfinance.dto;

import java.io.Serializable;
import java.util.Map;

public class LoanDocumentDetailDto implements Serializable {
    private static final long serialVersionUID = 1L;

    // Loan core info
    private String loanId;
    private String loanDate;
    private String loanPlanName;
    private String typeOfLoan;
    private String loanMode;
    private String loanTerm;
    private String rateOfInterest;
    private String loanAmount;
    private String interestType;
    private String emiPayment;
    private String purposeOfLoan;
    private String loanStatus;
    private boolean approvalStatus;
    private String approvalDate;
    private String totalInterest;
    private String totalPayableAmount;

    // Member / Borrower info
    private String memberId;
    private String memberName;
    private String relativeDetails;
    private String contactNo;
    private String address;
    private String pinCode;
    private String branchName;

    // Guarantor info
    private String guarantorMemberId;
    private String guarantorIdentity;
    private String guarantorIdentityNo;
    private String guarantorAadharNo;
    private String guarantorPanNo;
    private String guarantorAddress;
    private String guarantorPinCode;
    private String guarantorContactNo;
    private String guarantorSecurityType;

    // Co-applicant info
    private String coApplicantMemberId;
    private String coApplicantIdentity;
    private String coApplicantIdentityNo;
    private String coApplicantAadharNo;
    private String coApplicantPanNo;
    private String coApplicantAddress;
    private String coApplicantPinCode;
    private String coApplicantContactNo;

    // Deductions & Disbursement
    private String processingFee;
    private String legalCharges;
    private String gst;
    private String insuranceFee;
    private String valuationFees;
    private String stationaryFee;
    private String totalDeductions;
    private String netDisbursementAmount;
    private String paymentDate;
    private String paymentStatus;
    private String paymentMode;
    private String accountNo;
    private String ref_UpiId;
    private String chequeNo;
    private String chequeDate;

    // Closure info
    private String closureDate;
    private String closureRemarks;
    private String closureReceiptNo;

    // Dynamic details
    private Map<String, Object> dynamicDetails;

    public LoanDocumentDetailDto() {
    }

    public String getLoanId() {
        return loanId;
    }

    public void setLoanId(String loanId) {
        this.loanId = loanId;
    }

    public String getLoanDate() {
        return loanDate;
    }

    public void setLoanDate(String loanDate) {
        this.loanDate = loanDate;
    }

    public String getLoanPlanName() {
        return loanPlanName;
    }

    public void setLoanPlanName(String loanPlanName) {
        this.loanPlanName = loanPlanName;
    }

    public String getTypeOfLoan() {
        return typeOfLoan;
    }

    public void setTypeOfLoan(String typeOfLoan) {
        this.typeOfLoan = typeOfLoan;
    }

    public String getLoanMode() {
        return loanMode;
    }

    public void setLoanMode(String loanMode) {
        this.loanMode = loanMode;
    }

    public String getLoanTerm() {
        return loanTerm;
    }

    public void setLoanTerm(String loanTerm) {
        this.loanTerm = loanTerm;
    }

    public String getRateOfInterest() {
        return rateOfInterest;
    }

    public void setRateOfInterest(String rateOfInterest) {
        this.rateOfInterest = rateOfInterest;
    }

    public String getLoanAmount() {
        return loanAmount;
    }

    public void setLoanAmount(String loanAmount) {
        this.loanAmount = loanAmount;
    }

    public String getInterestType() {
        return interestType;
    }

    public void setInterestType(String interestType) {
        this.interestType = interestType;
    }

    public String getEmiPayment() {
        return emiPayment;
    }

    public void setEmiPayment(String emiPayment) {
        this.emiPayment = emiPayment;
    }

    public String getPurposeOfLoan() {
        return purposeOfLoan;
    }

    public void setPurposeOfLoan(String purposeOfLoan) {
        this.purposeOfLoan = purposeOfLoan;
    }

    public String getLoanStatus() {
        return loanStatus;
    }

    public void setLoanStatus(String loanStatus) {
        this.loanStatus = loanStatus;
    }

    public boolean isApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(boolean approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public String getApprovalDate() {
        return approvalDate;
    }

    public void setApprovalDate(String approvalDate) {
        this.approvalDate = approvalDate;
    }

    public String getTotalInterest() {
        return totalInterest;
    }

    public void setTotalInterest(String totalInterest) {
        this.totalInterest = totalInterest;
    }

    public String getTotalPayableAmount() {
        return totalPayableAmount;
    }

    public void setTotalPayableAmount(String totalPayableAmount) {
        this.totalPayableAmount = totalPayableAmount;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getRelativeDetails() {
        return relativeDetails;
    }

    public void setRelativeDetails(String relativeDetails) {
        this.relativeDetails = relativeDetails;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPinCode() {
        return pinCode;
    }

    public void setPinCode(String pinCode) {
        this.pinCode = pinCode;
    }

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public String getGuarantorMemberId() {
        return guarantorMemberId;
    }

    public void setGuarantorMemberId(String guarantorMemberId) {
        this.guarantorMemberId = guarantorMemberId;
    }

    public String getGuarantorIdentity() {
        return guarantorIdentity;
    }

    public void setGuarantorIdentity(String guarantorIdentity) {
        this.guarantorIdentity = guarantorIdentity;
    }

    public String getGuarantorIdentityNo() {
        return guarantorIdentityNo;
    }

    public void setGuarantorIdentityNo(String guarantorIdentityNo) {
        this.guarantorIdentityNo = guarantorIdentityNo;
    }

    public String getGuarantorAadharNo() {
        return guarantorAadharNo;
    }

    public void setGuarantorAadharNo(String guarantorAadharNo) {
        this.guarantorAadharNo = guarantorAadharNo;
    }

    public String getGuarantorPanNo() {
        return guarantorPanNo;
    }

    public void setGuarantorPanNo(String guarantorPanNo) {
        this.guarantorPanNo = guarantorPanNo;
    }

    public String getGuarantorAddress() {
        return guarantorAddress;
    }

    public void setGuarantorAddress(String guarantorAddress) {
        this.guarantorAddress = guarantorAddress;
    }

    public String getGuarantorPinCode() {
        return guarantorPinCode;
    }

    public void setGuarantorPinCode(String guarantorPinCode) {
        this.guarantorPinCode = guarantorPinCode;
    }

    public String getGuarantorContactNo() {
        return guarantorContactNo;
    }

    public void setGuarantorContactNo(String guarantorContactNo) {
        this.guarantorContactNo = guarantorContactNo;
    }

    public String getGuarantorSecurityType() {
        return guarantorSecurityType;
    }

    public void setGuarantorSecurityType(String guarantorSecurityType) {
        this.guarantorSecurityType = guarantorSecurityType;
    }

    public String getCoApplicantMemberId() {
        return coApplicantMemberId;
    }

    public void setCoApplicantMemberId(String coApplicantMemberId) {
        this.coApplicantMemberId = coApplicantMemberId;
    }

    public String getCoApplicantIdentity() {
        return coApplicantIdentity;
    }

    public void setCoApplicantIdentity(String coApplicantIdentity) {
        this.coApplicantIdentity = coApplicantIdentity;
    }

    public String getCoApplicantIdentityNo() {
        return coApplicantIdentityNo;
    }

    public void setCoApplicantIdentityNo(String coApplicantIdentityNo) {
        this.coApplicantIdentityNo = coApplicantIdentityNo;
    }

    public String getCoApplicantAadharNo() {
        return coApplicantAadharNo;
    }

    public void setCoApplicantAadharNo(String coApplicantAadharNo) {
        this.coApplicantAadharNo = coApplicantAadharNo;
    }

    public String getCoApplicantPanNo() {
        return coApplicantPanNo;
    }

    public void setCoApplicantPanNo(String coApplicantPanNo) {
        this.coApplicantPanNo = coApplicantPanNo;
    }

    public String getCoApplicantAddress() {
        return coApplicantAddress;
    }

    public void setCoApplicantAddress(String coApplicantAddress) {
        this.coApplicantAddress = coApplicantAddress;
    }

    public String getCoApplicantPinCode() {
        return coApplicantPinCode;
    }

    public void setCoApplicantPinCode(String coApplicantPinCode) {
        this.coApplicantPinCode = coApplicantPinCode;
    }

    public String getCoApplicantContactNo() {
        return coApplicantContactNo;
    }

    public void setCoApplicantContactNo(String coApplicantContactNo) {
        this.coApplicantContactNo = coApplicantContactNo;
    }

    public String getProcessingFee() {
        return processingFee;
    }

    public void setProcessingFee(String processingFee) {
        this.processingFee = processingFee;
    }

    public String getLegalCharges() {
        return legalCharges;
    }

    public void setLegalCharges(String legalCharges) {
        this.legalCharges = legalCharges;
    }

    public String getGst() {
        return gst;
    }

    public void setGst(String gst) {
        this.gst = gst;
    }

    public String getInsuranceFee() {
        return insuranceFee;
    }

    public void setInsuranceFee(String insuranceFee) {
        this.insuranceFee = insuranceFee;
    }

    public String getValuationFees() {
        return valuationFees;
    }

    public void setValuationFees(String valuationFees) {
        this.valuationFees = valuationFees;
    }

    public String getStationaryFee() {
        return stationaryFee;
    }

    public void setStationaryFee(String stationaryFee) {
        this.stationaryFee = stationaryFee;
    }

    public String getTotalDeductions() {
        return totalDeductions;
    }

    public void setTotalDeductions(String totalDeductions) {
        this.totalDeductions = totalDeductions;
    }

    public String getNetDisbursementAmount() {
        return netDisbursementAmount;
    }

    public void setNetDisbursementAmount(String netDisbursementAmount) {
        this.netDisbursementAmount = netDisbursementAmount;
    }

    public String getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(String paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public String getAccountNo() {
        return accountNo;
    }

    public void setAccountNo(String accountNo) {
        this.accountNo = accountNo;
    }

    public String getRef_UpiId() {
        return ref_UpiId;
    }

    public void setRef_UpiId(String ref_UpiId) {
        this.ref_UpiId = ref_UpiId;
    }

    public String getChequeNo() {
        return chequeNo;
    }

    public void setChequeNo(String chequeNo) {
        this.chequeNo = chequeNo;
    }

    public String getChequeDate() {
        return chequeDate;
    }

    public void setChequeDate(String chequeDate) {
        this.chequeDate = chequeDate;
    }

    public String getClosureDate() {
        return closureDate;
    }

    public void setClosureDate(String closureDate) {
        this.closureDate = closureDate;
    }

    public String getClosureRemarks() {
        return closureRemarks;
    }

    public void setClosureRemarks(String closureRemarks) {
        this.closureRemarks = closureRemarks;
    }

    public String getClosureReceiptNo() {
        return closureReceiptNo;
    }

    public void setClosureReceiptNo(String closureReceiptNo) {
        this.closureReceiptNo = closureReceiptNo;
    }

    public Map<String, Object> getDynamicDetails() {
        return dynamicDetails;
    }

    public void setDynamicDetails(Map<String, Object> dynamicDetails) {
        this.dynamicDetails = dynamicDetails;
    }
}
