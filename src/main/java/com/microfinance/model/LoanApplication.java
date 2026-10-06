package com.microfinance.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Table;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "loan_application", indexes = {
	@Index(name = "idx_la_loanid", columnList = "loanId"),
	@Index(name = "idx_la_status", columnList = "loanStatus"),
	@Index(name = "idx_la_approval", columnList = "approvalStatus"),
	@Index(name = "idx_la_member", columnList = "memberId")
})
@JsonIgnoreProperties(ignoreUnknown = true)
public class LoanApplication {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String loanId;
    private String loanDate;
    private String memberId;
    private String memberName;
    private String relativeDetails;
    private String dateOfBirth;
    private String age;
    private String contactNo;
    private String messageStatus;
    private String address;
    private String pinCode;
    private String branchName;
    private String loanPlanName;
    private String typeOfLoan;
    private String loanMode;
    private String loanTerm;
    private String rateOfInterest;
    private String loanAmount;
    private String interestType;
    private String emiPayment;
    private String purposeOfLoan;

    // Guarantor Details
    private String guarantorMemberId;
    private String guarantorIdentity;
    private String guarantorIdentityNo;
    private String guarantorAadharNo;
    private String guarantorPanNo;
    private String guarantorAddress;
    private String guarantorPinCode;
    private String guarantorContactNo;
    private String guarantorSecurityType;

    // Co-Applicant Details
    private String coApplicantMemberId;
    private String coApplicantIdentity;
    private String coApplicantIdentityNo;
    private String coApplicantAadharNo;
    private String coApplicantPanNo;
    private String coApplicantAddress;
    private String coApplicantPinCode;
    private String coApplicantContactNo;
    private String coApplicantSecurityType;

    // Deduction Details
    private String processingFee;
    private String legalCharges;
    private String gst;
    private String insuranceFee;
    private String valuationFees;
    private String stationaryFee;
    private String netDisbursementAmount;
    private String financialConsultantId;
    private String financialConsultantName;

    @javax.persistence.OneToOne(mappedBy = "loanApplication", cascade = javax.persistence.CascadeType.ALL, fetch = javax.persistence.FetchType.LAZY)
    @com.fasterxml.jackson.annotation.JsonManagedReference
    private LoanDeductionDetails deductionDetails;

    private String approvalDate;
    private boolean approvalStatus;
    private String photo;
    private String signature;
    
    // Loan Payment
    private String paymentDate;
    private String paymentStatus;
    private String paymentMode;
    private String accountNo;
    private String ref_UpiId;
    private String charges;
    private String remarks;
    private String chequeDate;
    private String chequeNo;
    private String sanctionedAmount;
    private String loanStatus;
    private String totalInterest;
    private String totalPayableAmount;
    
    @Column(name = "is_range_override")
    private Boolean isRangeOverride = false;

    @Column(name = "range_override_reason")
    private String rangeOverrideReason;
    
    @Column(columnDefinition = "TEXT")
    private String loanTypeSpecificDetails;

    // Dynamic Loan Type Specific Fields
    // 1. Personal Loan
    private String employerName;
    private String employeeId;
    private String monthlyNetSalary;
    private String salarySlipUpload;
    private String bankStatementUpload;

    // 2. Business Loan
    private String businessName;
    private String businessType;
    private String yearsInBusiness;
    private String monthlyTurnover;
    private String tradeLicenseNo;
    private String gstNo;

    // 3. TW Loan
    private String vehicleModel;
    private String onRoadPrice;
    private String downPayment;
    private String dealerName;
    private String chassisNo;
    private String engineNo;

    // 4. TW Refinance Loan
    private String existingRcNo;
    private String vehicleRegNo;
    private String purchaseDate;
    private String currentValuation;
    private String vehicleAge;

    // 5. CDL Loan
    private String productName;
    private String dealerShopName;
    private String invoiceNo;
    private String productPrice;

    // 6. Loan Against FD/RD/DRD
    private String depositAccountNo;
    private String depositAmount;
    private String maturityDate;
    private String marginPercent;
    private Boolean lienConfirmed;
    
    
    
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
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
	public String getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
		this.age = age;
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
	public String getCoApplicantSecurityType() {
		return coApplicantSecurityType;
	}
	public void setCoApplicantSecurityType(String coApplicantSecurityType) {
		this.coApplicantSecurityType = coApplicantSecurityType;
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
	public String getValuationFees() {
		return valuationFees;
	}
	public void setValuationFees(String valuationFees) {
		this.valuationFees = valuationFees;
	}
	public String getInsuranceFee() {
		return insuranceFee;
	}
	public void setInsuranceFee(String insuranceFee) {
		this.insuranceFee = insuranceFee;
	}
	
	public String getStationaryFee() {
		return stationaryFee;
	}
	public void setStationaryFee(String stationaryFee) {
		this.stationaryFee = stationaryFee;
	}
	public String getNetDisbursementAmount() {
		return netDisbursementAmount;
	}
	public void setNetDisbursementAmount(String netDisbursementAmount) {
		this.netDisbursementAmount = netDisbursementAmount;
	}
	public LoanDeductionDetails getDeductionDetails() {
		return deductionDetails;
	}
	public void setDeductionDetails(LoanDeductionDetails deductionDetails) {
		this.deductionDetails = deductionDetails;
		if (deductionDetails != null) {
			deductionDetails.setLoanApplication(this);
		}
	}
	
	public String getFinancialConsultantId() {
		return financialConsultantId;
	}
	public void setFinancialConsultantId(String financialConsultantId) {
		this.financialConsultantId = financialConsultantId;
	}
	public String getFinancialConsultantName() {
		return financialConsultantName;
	}
	public void setFinancialConsultantName(String financialConsultantName) {
		this.financialConsultantName = financialConsultantName;
	}
	
	public boolean isApprovalStatus() {
		return approvalStatus;
	}
	public void setApprovalStatus(boolean approvalStatus) {
		this.approvalStatus = approvalStatus;
	}
	public String getMessageStatus() {
		return messageStatus;
	}
	public void setMessageStatus(String messageStatus) {
		this.messageStatus = messageStatus;
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
	public String getApprovalDate() {
		return approvalDate;
	}
	public void setApprovalDate(String approvalDate) {
		this.approvalDate = approvalDate;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public String getSignature() {
		return signature;
	}
	public void setSignature(String signature) {
		this.signature = signature;
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
	public String getCharges() {
		return charges;
	}
	public void setCharges(String charges) {
		this.charges = charges;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getChequeDate() {
		return chequeDate;
	}
	public void setChequeDate(String chequeDate) {
		this.chequeDate = chequeDate;
	}
	public String getChequeNo() {
		return chequeNo;
	}
	public void setChequeNo(String chequeNo) {
		this.chequeNo = chequeNo;
	}
	public String getSanctionedAmount() {
		return sanctionedAmount;
	}
	public void setSanctionedAmount(String sanctionedAmount) {
		this.sanctionedAmount = sanctionedAmount;
	}
	public String getLoanStatus() {
		return loanStatus;
	}
	public void setLoanStatus(String loanStatus) {
		this.loanStatus = loanStatus;
	}
	
	public String getLoanTypeSpecificDetails() {
		return loanTypeSpecificDetails;
	}
	public void setLoanTypeSpecificDetails(String loanTypeSpecificDetails) {
		this.loanTypeSpecificDetails = loanTypeSpecificDetails;
	}

	// 1. Personal Loan Getters/Setters
	public String getEmployerName() { return employerName; }
	public void setEmployerName(String employerName) { this.employerName = employerName; }
	public String getEmployeeId() { return employeeId; }
	public void setEmployeeId(String employeeId) { this.employeeId = employeeId; }
	public String getMonthlyNetSalary() { return monthlyNetSalary; }
	public void setMonthlyNetSalary(String monthlyNetSalary) { this.monthlyNetSalary = monthlyNetSalary; }
	public String getSalarySlipUpload() { return salarySlipUpload; }
	public void setSalarySlipUpload(String salarySlipUpload) { this.salarySlipUpload = salarySlipUpload; }
	public String getBankStatementUpload() { return bankStatementUpload; }
	public void setBankStatementUpload(String bankStatementUpload) { this.bankStatementUpload = bankStatementUpload; }

	// 2. Business Loan Getters/Setters
	public String getBusinessName() { return businessName; }
	public void setBusinessName(String businessName) { this.businessName = businessName; }
	public String getBusinessType() { return businessType; }
	public void setBusinessType(String businessType) { this.businessType = businessType; }
	public String getYearsInBusiness() { return yearsInBusiness; }
	public void setYearsInBusiness(String yearsInBusiness) { this.yearsInBusiness = yearsInBusiness; }
	public String getMonthlyTurnover() { return monthlyTurnover; }
	public void setMonthlyTurnover(String monthlyTurnover) { this.monthlyTurnover = monthlyTurnover; }
	public String getTradeLicenseNo() { return tradeLicenseNo; }
	public void setTradeLicenseNo(String tradeLicenseNo) { this.tradeLicenseNo = tradeLicenseNo; }
	public String getGstNo() { return gstNo; }
	public void setGstNo(String gstNo) { this.gstNo = gstNo; }

	// 3. TW Loan Getters/Setters
	public String getVehicleModel() { return vehicleModel; }
	public void setVehicleModel(String vehicleModel) { this.vehicleModel = vehicleModel; }
	public String getOnRoadPrice() { return onRoadPrice; }
	public void setOnRoadPrice(String onRoadPrice) { this.onRoadPrice = onRoadPrice; }
	public String getDownPayment() { return downPayment; }
	public void setDownPayment(String downPayment) { this.downPayment = downPayment; }
	public String getDealerName() { return dealerName; }
	public void setDealerName(String dealerName) { this.dealerName = dealerName; }
	public String getChassisNo() { return chassisNo; }
	public void setChassisNo(String chassisNo) { this.chassisNo = chassisNo; }
	public String getEngineNo() { return engineNo; }
	public void setEngineNo(String engineNo) { this.engineNo = engineNo; }

	// 4. TW Refinance Loan Getters/Setters
	public String getExistingRcNo() { return existingRcNo; }
	public void setExistingRcNo(String existingRcNo) { this.existingRcNo = existingRcNo; }
	public String getVehicleRegNo() { return vehicleRegNo; }
	public void setVehicleRegNo(String vehicleRegNo) { this.vehicleRegNo = vehicleRegNo; }
	public String getPurchaseDate() { return purchaseDate; }
	public void setPurchaseDate(String purchaseDate) { this.purchaseDate = purchaseDate; }
	public String getCurrentValuation() { return currentValuation; }
	public void setCurrentValuation(String currentValuation) { this.currentValuation = currentValuation; }
	public String getVehicleAge() { return vehicleAge; }
	public void setVehicleAge(String vehicleAge) { this.vehicleAge = vehicleAge; }

	// 5. CDL Loan Getters/Setters
	public String getProductName() { return productName; }
	public void setProductName(String productName) { this.productName = productName; }
	public String getDealerShopName() { return dealerShopName; }
	public void setDealerShopName(String dealerShopName) { this.dealerShopName = dealerShopName; }
	public String getInvoiceNo() { return invoiceNo; }
	public void setInvoiceNo(String invoiceNo) { this.invoiceNo = invoiceNo; }
	public String getProductPrice() { return productPrice; }
	public void setProductPrice(String productPrice) { this.productPrice = productPrice; }

	// 6. Loan Against FD/RD/DRD Getters/Setters
	public String getDepositAccountNo() { return depositAccountNo; }
	public void setDepositAccountNo(String depositAccountNo) { this.depositAccountNo = depositAccountNo; }
	public String getDepositAmount() { return depositAmount; }
	public void setDepositAmount(String depositAmount) { this.depositAmount = depositAmount; }
	public String getMaturityDate() { return maturityDate; }
	public void setMaturityDate(String maturityDate) { this.maturityDate = maturityDate; }
	public String getMarginPercent() { return marginPercent; }
	public void setMarginPercent(String marginPercent) { this.marginPercent = marginPercent; }
	public Boolean getLienConfirmed() { return lienConfirmed; }
	public void setLienConfirmed(Boolean lienConfirmed) { this.lienConfirmed = lienConfirmed; }

	public Boolean getIsRangeOverride() { return isRangeOverride; }
	public void setIsRangeOverride(Boolean isRangeOverride) { this.isRangeOverride = isRangeOverride; }
	public String getRangeOverrideReason() { return rangeOverrideReason; }
	public void setRangeOverrideReason(String rangeOverrideReason) { this.rangeOverrideReason = rangeOverrideReason; }

	@PrePersist
	@PreUpdate
	public void syncDynamicFields() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			// Case 1: JSON is provided -> populate individual properties if empty
			if (loanTypeSpecificDetails != null && !loanTypeSpecificDetails.trim().isEmpty()) {
				Map<String, Object> map = mapper.readValue(loanTypeSpecificDetails, new TypeReference<Map<String, Object>>() {});
				if (map != null) {
					if (employerName == null && map.containsKey("employerName")) employerName = String.valueOf(map.get("employerName"));
					if (employeeId == null && map.containsKey("employeeId")) employeeId = String.valueOf(map.get("employeeId"));
					if (monthlyNetSalary == null && map.containsKey("monthlyNetSalary")) monthlyNetSalary = String.valueOf(map.get("monthlyNetSalary"));
					if (salarySlipUpload == null && map.containsKey("salarySlipUpload")) salarySlipUpload = String.valueOf(map.get("salarySlipUpload"));
					if (bankStatementUpload == null && map.containsKey("bankStatementUpload")) bankStatementUpload = String.valueOf(map.get("bankStatementUpload"));

					if (businessName == null && map.containsKey("businessName")) businessName = String.valueOf(map.get("businessName"));
					if (businessType == null && map.containsKey("businessType")) businessType = String.valueOf(map.get("businessType"));
					if (yearsInBusiness == null && map.containsKey("yearsInBusiness")) yearsInBusiness = String.valueOf(map.get("yearsInBusiness"));
					if (monthlyTurnover == null && map.containsKey("monthlyTurnover")) monthlyTurnover = String.valueOf(map.get("monthlyTurnover"));
					if (tradeLicenseNo == null && map.containsKey("tradeLicenseNo")) tradeLicenseNo = String.valueOf(map.get("tradeLicenseNo"));
					if (gstNo == null && map.containsKey("gstNo")) gstNo = String.valueOf(map.get("gstNo"));

					if (vehicleModel == null && map.containsKey("vehicleModel")) vehicleModel = String.valueOf(map.get("vehicleModel"));
					if (onRoadPrice == null && map.containsKey("onRoadPrice")) onRoadPrice = String.valueOf(map.get("onRoadPrice"));
					if (downPayment == null && map.containsKey("downPayment")) downPayment = String.valueOf(map.get("downPayment"));
					if (dealerName == null && map.containsKey("dealerName")) dealerName = String.valueOf(map.get("dealerName"));
					if (chassisNo == null && map.containsKey("chassisNo")) chassisNo = String.valueOf(map.get("chassisNo"));
					if (engineNo == null && map.containsKey("engineNo")) engineNo = String.valueOf(map.get("engineNo"));

					if (existingRcNo == null && map.containsKey("existingRcNo")) existingRcNo = String.valueOf(map.get("existingRcNo"));
					if (vehicleRegNo == null && map.containsKey("vehicleRegNo")) vehicleRegNo = String.valueOf(map.get("vehicleRegNo"));
					if (purchaseDate == null && map.containsKey("purchaseDate")) purchaseDate = String.valueOf(map.get("purchaseDate"));
					if (currentValuation == null && map.containsKey("currentValuation")) currentValuation = String.valueOf(map.get("currentValuation"));
					if (vehicleAge == null && map.containsKey("vehicleAge")) vehicleAge = String.valueOf(map.get("vehicleAge"));

					if (productName == null && map.containsKey("productName")) productName = String.valueOf(map.get("productName"));
					if (dealerShopName == null && map.containsKey("dealerShopName")) dealerShopName = String.valueOf(map.get("dealerShopName"));
					if (invoiceNo == null && map.containsKey("invoiceNo")) invoiceNo = String.valueOf(map.get("invoiceNo"));
					if (productPrice == null && map.containsKey("productPrice")) productPrice = String.valueOf(map.get("productPrice"));

					if (depositAccountNo == null && map.containsKey("depositAccountNo")) depositAccountNo = String.valueOf(map.get("depositAccountNo"));
					if (depositAmount == null && map.containsKey("depositAmount")) depositAmount = String.valueOf(map.get("depositAmount"));
					if (maturityDate == null && map.containsKey("maturityDate")) maturityDate = String.valueOf(map.get("maturityDate"));
					if (marginPercent == null && map.containsKey("marginPercent")) marginPercent = String.valueOf(map.get("marginPercent"));
					if (lienConfirmed == null && map.containsKey("lienConfirmed")) {
						Object lc = map.get("lienConfirmed");
						lienConfirmed = Boolean.valueOf(String.valueOf(lc));
					}
				}
			} else {
				// Case 2: Individual properties are present -> build JSON
				Map<String, Object> map = new HashMap<>();
				if ("Personal Loan".equalsIgnoreCase(typeOfLoan)) {
					if (employerName != null) map.put("employerName", employerName);
					if (employeeId != null) map.put("employeeId", employeeId);
					if (monthlyNetSalary != null) map.put("monthlyNetSalary", monthlyNetSalary);
					if (salarySlipUpload != null) map.put("salarySlipUpload", salarySlipUpload);
					if (bankStatementUpload != null) map.put("bankStatementUpload", bankStatementUpload);
				} else if ("Business Loan".equalsIgnoreCase(typeOfLoan)) {
					if (businessName != null) map.put("businessName", businessName);
					if (businessType != null) map.put("businessType", businessType);
					if (yearsInBusiness != null) map.put("yearsInBusiness", yearsInBusiness);
					if (monthlyTurnover != null) map.put("monthlyTurnover", monthlyTurnover);
					if (tradeLicenseNo != null) map.put("tradeLicenseNo", tradeLicenseNo);
					if (gstNo != null) map.put("gstNo", gstNo);
				} else if ("TW Loan".equalsIgnoreCase(typeOfLoan)) {
					if (vehicleModel != null) map.put("vehicleModel", vehicleModel);
					if (onRoadPrice != null) map.put("onRoadPrice", onRoadPrice);
					if (downPayment != null) map.put("downPayment", downPayment);
					if (dealerName != null) map.put("dealerName", dealerName);
					if (chassisNo != null) map.put("chassisNo", chassisNo);
					if (engineNo != null) map.put("engineNo", engineNo);
				} else if ("TW Refinance Loan".equalsIgnoreCase(typeOfLoan)) {
					if (existingRcNo != null) map.put("existingRcNo", existingRcNo);
					if (vehicleRegNo != null) map.put("vehicleRegNo", vehicleRegNo);
					if (purchaseDate != null) map.put("purchaseDate", purchaseDate);
					if (currentValuation != null) map.put("currentValuation", currentValuation);
					if (vehicleAge != null) map.put("vehicleAge", vehicleAge);
				} else if ("CDL Loan".equalsIgnoreCase(typeOfLoan)) {
					if (productName != null) map.put("productName", productName);
					if (dealerShopName != null) map.put("dealerShopName", dealerShopName);
					if (invoiceNo != null) map.put("invoiceNo", invoiceNo);
					if (productPrice != null) map.put("productPrice", productPrice);
				} else if ("Loan Against FD/RD/DRD".equalsIgnoreCase(typeOfLoan)) {
					if (depositAccountNo != null) map.put("depositAccountNo", depositAccountNo);
					if (depositAmount != null) map.put("depositAmount", depositAmount);
					if (maturityDate != null) map.put("maturityDate", maturityDate);
					if (marginPercent != null) map.put("marginPercent", marginPercent);
					if (lienConfirmed != null) map.put("lienConfirmed", lienConfirmed);
				}
				if (!map.isEmpty()) {
					loanTypeSpecificDetails = mapper.writeValueAsString(map);
				}
			}

			// Synchronize identity numbers
			if (guarantorIdentityNo != null && !guarantorIdentityNo.trim().isEmpty()) {
				if (guarantorIdentity != null && guarantorIdentity.toLowerCase().contains("pan")) {
					if (guarantorPanNo == null) guarantorPanNo = guarantorIdentityNo;
				} else {
					if (guarantorAadharNo == null) guarantorAadharNo = guarantorIdentityNo;
				}
			} else {
				if (guarantorAadharNo != null && !guarantorAadharNo.trim().isEmpty()) {
					guarantorIdentityNo = guarantorAadharNo;
				} else if (guarantorPanNo != null && !guarantorPanNo.trim().isEmpty()) {
					guarantorIdentityNo = guarantorPanNo;
				}
			}

			if (coApplicantIdentityNo != null && !coApplicantIdentityNo.trim().isEmpty()) {
				if (coApplicantIdentity != null && coApplicantIdentity.toLowerCase().contains("pan")) {
					if (coApplicantPanNo == null) coApplicantPanNo = coApplicantIdentityNo;
				} else {
					if (coApplicantAadharNo == null) coApplicantAadharNo = coApplicantIdentityNo;
				}
			} else {
				if (coApplicantAadharNo != null && !coApplicantAadharNo.trim().isEmpty()) {
					coApplicantIdentityNo = coApplicantAadharNo;
				} else if (coApplicantPanNo != null && !coApplicantPanNo.trim().isEmpty()) {
					coApplicantIdentityNo = coApplicantPanNo;
				}
			}
		} catch (Exception ignored) {}
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
}