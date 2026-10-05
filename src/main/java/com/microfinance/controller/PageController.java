package com.microfinance.controller;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.microfinance.model.GoldDirectory;
import com.microfinance.repository.AddInvestmentRepo;
import com.microfinance.repository.ApplyForGoldRepo;
import com.microfinance.repository.CreateLendingGroupRepo;
import com.microfinance.repository.CreateSavingAccountRepo;
import com.microfinance.repository.CustomerRepo;
import com.microfinance.service.TeamManagementService;

import com.microfinance.repository.LoanMangmentSchemeRepo;

import com.microfinance.repository.FinancialConsultantRepo;
import com.microfinance.repository.DailyDepositPMRepo;
import com.microfinance.repository.FixedDepositPMRepo;
import com.microfinance.repository.GoldDirectoryRepo;
import com.microfinance.repository.GroupDirectoryRepo;
import com.microfinance.repository.LoanApplicationRepo;
import com.microfinance.repository.MisDepositePMRepo;
import com.microfinance.repository.RecurringDepositRepo;
import com.microfinance.repository.TransferShareRepo;

@Controller
public class PageController {

	@Autowired
	CustomerRepo customerRepo;

	@Autowired
	LoanMangmentSchemeRepo loanMangmentSchemeRepo;

	@Autowired
	FinancialConsultantRepo financialConsultantRepo;

	@Autowired
	DailyDepositPMRepo dailyDepositRepo;

	@Autowired
	RecurringDepositRepo recurringDepositRepo;

	@Autowired
	FixedDepositPMRepo fixedDepositPMRepo;

	@Autowired
	MisDepositePMRepo misDepositePMRepo;

	@Autowired
	TransferShareRepo transferShareRepo;

	@Autowired
	CreateSavingAccountRepo createSavingAccountRepo;

	@Autowired
	TeamManagementService teamService;

	@Autowired
	CreateLendingGroupRepo createLendingGroupRepo;

	@Autowired
	GroupDirectoryRepo groupDirectoryRepo;

	@Autowired
	AddInvestmentRepo addInvestmentRepo;

	@Autowired
	LoanApplicationRepo loanApplicationRepo;

	@Autowired
	ApplyForGoldRepo applyForGoldRepo;

	@Autowired
	GoldDirectoryRepo goldDirectoryRepo;

	@GetMapping("/")
	public String getIndex() {
		return "index";
	}

	// Dashboard Cards
	@GetMapping("/openDashboard")
	public String getDashboard() {
		return "dashboardPage/dashboard";
	}

	@GetMapping("/admin/activity")
	public String adminActivityPage() {
		return "admin/activity";
	}

	
	@GetMapping("/helpmanual")
	public String getHelpPage(Model model) {
		model.addAttribute("contentPage", "helpPage.jsp");
		return "main";
	}

	// Financial Consultant
	@GetMapping("/addFinancialConsultant")
	public String getAddFinancialConsultant(Model model) {
		long maxId = financialConsultantRepo.getMaxId();
		String financialCode = "FC" + "0000" + (maxId + 1);
		model.addAttribute("financialCode", financialCode);
		model.addAttribute("contentPage", "financialConsultant/addFinancialConsultant.jsp");
		return "main";
	}

	@GetMapping("/financialConsultantHierarchy")
	public String getFinancialConsultantHierarchy(Model model) {
		model.addAttribute("contentPage", "financialConsultant/financialConsultantHierarchy.jsp");
		return "main";
	}

	@GetMapping("/consultantDownlineView")
	public String getConsultantDownlineView(Model model) {
		model.addAttribute("contentPage", "financialConsultant/consultantDownlineView.jsp");
		return "main";
	}

	@GetMapping("/consultantPromotionManagement")
	public String getConsultantPromotionManagement(Model model) {
		model.addAttribute("contentPage", "financialConsultant/consultantPromotionManagement.jsp");
		return "main";
	}

	@GetMapping("/consultantIDCardGenerator")
	public String getConsultantIDCardGenerator(Model model) {
		model.addAttribute("contentPage", "financialConsultant/consultantIDCardGenerator.jsp");
		return "main";
	}

	@GetMapping("/updateFinacialConsultant")
	public String financialConsultantUpdate(Model model) {
		model.addAttribute("contentPage", "financialConsultant/financialConsultantUpdate.jsp");
		return "main";
	}

	@GetMapping("/IDCardFinancial")
	public String IDCardFinancial(Model model) {
		model.addAttribute("contentPage", "financialConsultant/IDCard.jsp");
		return "main";
	}

	// Data Rectification
	@GetMapping("/customerDataUpdate")
	public String getCustomerDataUpdate(Model model) {
		model.addAttribute("contentPage", "dataCorrection/customerDataUpdate.jsp");
		return "main";
	}

	@GetMapping("/shareholdingAdjustment")
	public String getShareholdingAdjustment(Model model) {
		model.addAttribute("contentPage", "dataCorrection/shareholdingAdjustment.jsp");
		return "main";
	}

	@GetMapping("/financialEntryCorrection")
	public String getFinancialEntryCorrection(Model model) {
		model.addAttribute("contentPage", "dataCorrection/financialEntryCorrection.jsp");
		return "main";
	}

	@GetMapping("/policyDetailsUpdate")
	public String getPolicyDetailsUpdate(Model model) {
		model.addAttribute("contentPage", "dataCorrection/policyDetailsUpdate.jsp");
		return "main";
	}

	@GetMapping("/renewalDataCorrection")
	public String getRenewalDataCorrection(Model model) {
		model.addAttribute("contentPage", "dataCorrection/renewalDataCorrection.jsp");
		return "main";
	}

	@GetMapping("/dailyRenewalUpdate")
	public String getDailyRenewalUpdate(Model model) {
		model.addAttribute("contentPage", "dataCorrection/dailyRenewalUpdate.jsp");
		return "main";
	}

	@GetMapping("/flexibleTransactionRemoval")
	public String getFlexibleTransactionRemoval(Model model) {
		model.addAttribute("contentPage", "dataCorrection/flexibleTransactionRemoval.jsp");
		return "main";
	}

	@GetMapping("/savingsAccountCorrection")
	public String getSavingsAccountCorrection(Model model) {
		model.addAttribute("contentPage", "dataCorrection/savingsAccountCorrection.jsp");
		return "main";
	}

	@GetMapping("/savingsTransactionRemoval")
	public String getSavingsTransactionRemoval(Model model) {
		model.addAttribute("contentPage", "dataCorrection/savingsTransactionRemoval.jsp");
		return "main";
	}

	@GetMapping("/loanAccountCorrection")
	public String getLoanAccountCorrection(Model model) {
		model.addAttribute("contentPage", "dataCorrection/loanAccountCorrection.jsp");
		return "main";
	}

	@GetMapping("/groupLoanDataUpdate")
	public String getGroupLoanDataUpdate(Model model) {
		model.addAttribute("contentPage", "dataCorrection/groupLoanDataUpdate.jsp");
		return "main";
	}

	// Team Management
	@GetMapping("/manageDesignations")
	public String getManageDesignations(Model model) {
		model.addAttribute("contentPage", "teamManagement/manageDesignations.jsp");
		return "main";
	}

	@GetMapping("/manageDepartments")
	public String getManageDepartments(Model model) {
		model.addAttribute("contentPage", "teamManagement/manageDepartments.jsp");
		return "main";
	}

	@GetMapping("/addTeamMember")
	public String getAddTeamMember(Model model) {
		long maxId = teamService.getMaxId();
		String teamMemberUniqueNo = "TM" + "00" + (maxId + 1);
		model.addAttribute("teamMemberUniqueNo", teamMemberUniqueNo);
		model.addAttribute("contentPage", "teamManagement/addTeamMember.jsp");
		return "main";
	}

	@GetMapping("/generateTeamMemberIDCard")
	public String getGenerateTeamMemberIDCard(Model model) {
		model.addAttribute("contentPage", "teamManagement/generateTeamMemberIDCard.jsp");
		return "main";
	}

	@GetMapping("/searchTeamMember")
	public String getSearchTeamMember(Model model) {
		model.addAttribute("contentPage", "teamManagement/searchTeamMember.jsp");
		return "main";
	}

	// Report & Analytics
	@GetMapping("/investmentTransactionReport")
	public String getInvestmentTransactionReport(Model model) {
		model.addAttribute("contentPage", "reportAndAnalytics/investmentTransactionReport.jsp");
		return "main";
	}

	@GetMapping("/investmentSummaryStatement")
	public String getInvestmentSummaryStatement(Model model) {
		model.addAttribute("contentPage", "reportAndAnalytics/investmentSummaryStatement.jsp");
		return "main";
	}

	@GetMapping("/financialAdvisorReport")
	public String getFinancialAdvisorReport(Model model) {
		model.addAttribute("contentPage", "reportAndAnalytics/financialAdvisorReport.jsp");
		return "main";
	}

	@GetMapping("/financialConsultantTeamCollectionReport")
	public String getFinancialConsultantTeamCollectionReport(Model model) {
		model.addAttribute("contentPage", "reportAndAnalytics/financialConsultantTeamCollectionReport.jsp");
		return "main";
	}

	@GetMapping("/chequeTransactionReport")
	public String getChequeTransactionReport(Model model) {
		model.addAttribute("contentPage", "reportAndAnalytics/chequeTransactionReport.jsp");
		return "main";
	}

	@GetMapping("/incentivePaymentSummary")
	public String getIncentivePaymentSummary(Model model) {
		model.addAttribute("contentPage", "reportAndAnalytics/incentivePaymentSummary.jsp");
		return "main";
	}

	@GetMapping("/recurringInstallmentDueReport")
	public String getRecurringInstallmentDueReport(Model model) {
		model.addAttribute("contentPage", "reportAndAnalytics/recurringInstallmentDueReport.jsp");
		return "main";
	}

	@GetMapping("/unApprovedLoanApplications")
	public String getUnApprovedLoanApplications(Model model) {
		model.addAttribute("contentPage", "reportAndAnalytics/unApprovedLoanApplications.jsp");
		return "main";
	}

	@GetMapping("/approvedLoanReport")
	public String getApprovedLoanReport(Model model) {
		model.addAttribute("contentPage", "reportAndAnalytics/approvedLoanReport.jsp");
		return "main";
	}

	@GetMapping("/loanRePaymentReport")
	public String getLoanRePaymentReport(Model model) {
		model.addAttribute("contentPage", "reportAndAnalytics/loanRePaymentReport.jsp");
		return "main";
	}

	@GetMapping("/upcomingEMIDueReport")
	public String getUpcomingEMIDueReport(Model model) {
		model.addAttribute("contentPage", "reportAndAnalytics/upcomingEMIDueReport.jsp");
		return "main";
	}

	@GetMapping("/overdueRepaymentAnalysis")
	public String getOverdueRepaymentAnalysis(Model model) {
		model.addAttribute("contentPage", "reportAndAnalytics/overdueRepaymentAnalysis.jsp");
		return "main";
	}

	@GetMapping("/loanInstallmentPendingReport")
	public String getLoanInstallmentPendingReport(Model model) {
		model.addAttribute("contentPage", "reportAndAnalytics/loanInstallmentPendingReport.jsp");
		return "main";
	}

	@GetMapping("/emiCollectionSummary")
	public String getEmiCollectionSummary(Model model) {
		model.addAttribute("contentPage", "reportAndAnalytics/emiCollectionSummary.jsp");
		return "main";
	}

	@GetMapping("/emiIrregularityStatement")
	public String getEmiIrregularityStatement(Model model) {
		model.addAttribute("contentPage", "reportAndAnalytics/emiIrregularityStatement.jsp");
		return "main";
	}

	@GetMapping("/loanConfirmationDocument")
	public String getLoanConfirmationDocument(Model model) {
		model.addAttribute("contentPage", "reportAndAnalytics/loanConfirmationDocument.jsp");
		return "main";
	}

	@GetMapping("/maturityStatusReport")
	public String getMaturityStatusReport(Model model) {
		model.addAttribute("contentPage", "reportAndAnalytics/maturityStatusReport.jsp");
		return "main";
	}

	@GetMapping("/investmentProjectionReport")
	public String getInvestmentProjectionReport(Model model) {
		model.addAttribute("contentPage", "reportAndAnalytics/investmentProjectionReport.jsp");
		return "main";
	}

	@GetMapping("/maturityObligationReport")
	public String getMaturityObligationReport(Model model) {
		model.addAttribute("contentPage", "reportAndAnalytics/maturityObligationReport.jsp");
		return "main";
	}

	@GetMapping("/taxDeductedAtSourceSummary")
	public String getTaxDeductedAtSourceSummary(Model model) {
		model.addAttribute("contentPage", "reportAndAnalytics/taxDeductedAtSourceSummary.jsp");
		return "main";
	}

	@GetMapping("/policyPerformanceReport")
	public String getPolicyPerformanceReport(Model model) {
		model.addAttribute("contentPage", "reportAndAnalytics/policyPerformanceReport.jsp");
		return "main";
	}

	// Joint Liability Loan
	@GetMapping("/createLendingGroup")
	public String getCreateLendingGroup(Model model) {
		long maxIdDD = createLendingGroupRepo.getMaxId();
		String memberCodePI = "PI" + "000" + (maxIdDD + 1);
		model.addAttribute("memberCodePI", memberCodePI);
		model.addAttribute("contentPage", "jointLiabilityLoan/createLendingGroup.jsp");
		return "main";
	}

	@GetMapping("/groupDirectory")
	public String getGroupDirectory(Model model) {
		long maxIdGD = groupDirectoryRepo.getMaxId();
		String memberCodeGD = "GD" + "000" + (maxIdGD + 1);
		model.addAttribute("memberCodeGD", memberCodeGD);
		model.addAttribute("contentPage", "jointLiabilityLoan/groupDirectory.jsp");
		return "main";
	}

	@GetMapping("/applyForGroupLoan")
	public String getApplyForGroupLoan(Model model) {
		model.addAttribute("contentPage", "jointLiabilityLoan/applyForGroupLoan.jsp");
		return "main";
	}

	@GetMapping("/loanApproval")
	public String getLoanApproval(Model model) {
		model.addAttribute("contentPage", "jointLiabilityLoan/loanApproval.jsp");
		return "main";
	}

	@GetMapping("/loanRepaymentPortal")
	public String getLoanRepaymentPortal(Model model) {
		model.addAttribute("contentPage", "jointLiabilityLoan/grouploanPayment.jsp");
		return "main";
	}

	@GetMapping("/installmentRepayment")
	public String getInstallmentRepayment(Model model) {
		model.addAttribute("contentPage", "jointLiabilityLoan/installmentRepayment.jsp");
		return "main";
	}

	@GetMapping("/statementOfAccount")
	public String getStatementOfAccount(Model model) {
		model.addAttribute("contentPage", "jointLiabilityLoan/statementOfAccount.jsp");
		return "main";
	}

	@GetMapping("/earlyLoanClosureJointLiability")
	public String getEarlyLoanClosure(Model model) {
		model.addAttribute("contentPage", "jointLiabilityLoan/LoanClosure.jsp");
		return "main";
	}
	

	@GetMapping("/completedLoansRecord")
	public String getClosedLoanDetails(Model model) {
		model.addAttribute("contentPage", "jointLiabilityLoan/completedLoansRecord.jsp");
		return "main";
	}

	@GetMapping("/findLoanRecord")
	public String getFindLoanRecord(Model model) {
		model.addAttribute("contentPage", "jointLiabilityLoan/findLoanRecord.jsp");
		return "main";
	}

	// Customer ShareHolding
	@GetMapping("/transferShares")
	public String getShareTransfer(Model model) {
		// ✅ Generate certificate number (demo only)
		String year = String.valueOf(LocalDate.now().getYear());
		long count = transferShareRepo.count(); // total rows in DB
		String certNo = "SCF/MICROFINANCE/" + year + "/" + String.format("%06d", count + 1);
		// ✅ You can pass this to frontend (JSP or HTML) using model
		model.addAttribute("generatedCertificateNo", certNo);
		model.addAttribute("contentPage", "customerShareHolding/transferShares.jsp");
		return "main";
	}

	@GetMapping("/unallotedShares")
	public String getUnAllotedShare(Model model) {
		model.addAttribute("contentPage", "customerShareHolding/unAllotedShares.jsp");
		return "main";
	}

	@GetMapping("/generateShareCertificate")
	public String getShareCertificate(Model model) {
		model.addAttribute("contentPage", "customerShareHolding/generateShareCertificate.jsp");
		return "main";
	}

	@GetMapping("/regenerateDNO")
	public String getDnoReGenerate(Model model) {
		model.addAttribute("contentPage", "customerShareHolding/regenerateDNO.jsp");
		return "main";
	}

	// Customer Management
	@GetMapping("/addCustomer")
	public String getAddClient(Model model) {
		long maxId = customerRepo.getMaxId();
		String memberCode = "M" + "0000" + (maxId + 1);
		model.addAttribute("memberCode", memberCode);
		model.addAttribute("contentPage", "customerManagement/addCustomer.jsp");
		return "main";
	}

	@GetMapping("/addCustomerKYC")
	public String getAddClientKYC(Model model) {
		model.addAttribute("contentPage", "customerManagement/addCustomerKYC.jsp");
		return "main";
	}

	@GetMapping("/customerSummary")
	public String getClientSummary(Model model) {
		model.addAttribute("contentPage", "customerManagement/customerSummary.jsp");
		return "main";
	}

	@GetMapping("/customerReport")
	public String getClientReport(Model model) {
		model.addAttribute("contentPage", "customerManagement/customerReport.jsp");
		return "main";
	}

	@GetMapping("/searchCustomer")
	public String getSearchClient(Model model) {
		model.addAttribute("contentPage", "customerManagement/searchCustomer.jsp");
		return "main";
	}

	// Request Approval
	@GetMapping("/approveNewCustomer")
	public String getCustomerApproval(Model model) {
		model.addAttribute("contentPage", "requestApprovals/approveNewClientRequest.jsp");
		return "main";
	}

	@GetMapping("/approveShare")
	public String getShareApproval(Model model) {
		model.addAttribute("contentPage", "requestApprovals/approveShareTransactions.jsp");
		return "main";
	}

	@GetMapping("/approveFinance")
	public String getFinancialApproval(Model model) {
		model.addAttribute("contentPage", "requestApprovals/approveFinanceOnboarding.jsp");
		return "main";
	}

	@GetMapping("/approvePolicy")
	public String getPolicyApproval(Model model) {
		model.addAttribute("contentPage", "requestApprovals/approvePolicy.jsp");
		return "main";
	}

	@GetMapping("/approveRD")
	public String getRDApproval(Model model) {
		model.addAttribute("contentPage", "requestApprovals/approveRD.jsp");
		return "main";
	}

	@GetMapping("/approveFD")
	public String getFDApproval(Model model) {
		model.addAttribute("contentPage", "requestApprovals/approveFD.jsp");
		return "main";
	}

	@GetMapping("/approveDD")
	public String getDDApproval(Model model) {
		model.addAttribute("contentPage", "requestApprovals/approveDD.jsp");
		return "main";
	}

	@GetMapping("/approveRecurring")
	public String getRecurringApproval(Model model) {
		model.addAttribute("contentPage", "requestApprovals/approveRecurringDeposits.jsp");
		return "main";
	}

	@GetMapping("/approveSaving")
	public String getSavingTransactionApproval(Model model) {
		model.addAttribute("contentPage", "requestApprovals/approveSavingTransactions.jsp");
		return "main";
	}

	@GetMapping("/approveSavingAccount")
	public String getSBTransferApproval(Model model) {
		model.addAttribute("contentPage", "requestApprovals/approveSavingAccountTransfer.jsp");
		return "main";
	}

	@GetMapping("/approveRegularEMI")
	public String getRegularEMIInApprovalSection(Model model) {
		model.addAttribute("contentPage", "requestApprovals/approveRegularEmiPayments.jsp");
		return "main";
	}

	@GetMapping("/approveIrregularEMI")
	public String getIrregularEMIInApprovalSection(Model model) {
		model.addAttribute("contentPage", "requestApprovals/approveIrregularEmiPayments.jsp");
		return "main";
	}

	@GetMapping("/approveManualPayment")
	public String getPaymentEntryApproval(Model model) {
		model.addAttribute("contentPage", "requestApprovals/approveManualPaymentEntries.jsp");
		return "main";
	}

	@GetMapping("/approveMaturityApp")
	public String getMaturityApplicationApproval(Model model) {
		model.addAttribute("contentPage", "requestApprovals/approveMaturityApplications.jsp");
		return "main";
	}

	@GetMapping("/deleteMaturityApp")
	public String getMaturityApplicationDelete(Model model) {
		model.addAttribute("contentPage", "requestApprovals/deleteMaturityApplicationsRequest.jsp");
		return "main";
	}

	@GetMapping("/approveInterBranchCashTransfer")
	public String getBranchCashTransferApproval(Model model) {
		model.addAttribute("contentPage", "requestApprovals/approveInterBranchCashTransfer.jsp");
		return "main";
	}

	// Account Management
	@GetMapping("/ledgerAccountMaster")
	public String getLedgerMasterAccount(Model model) {
		model.addAttribute("contentPage", "accountManagement/ledgerAccountMaster.jsp");
		return "main";
	}

	@GetMapping("/outgoingPaymentEntry")
	public String getPaymentEntryAccountSection(Model model) {
		model.addAttribute("contentPage", "accountManagement/outgoingPaymentEntry.jsp");
		return "main";
	}

	@GetMapping("/incomingReceiptEntry")
	public String getReceiveEntryAccountSection(Model model) {
		model.addAttribute("contentPage", "accountManagement/incomingReceiptEntry.jsp");
		return "main";
	}

	@GetMapping("/bankCashTransferEntry")
	public String getContraEntryAccountSection(Model model) {
		model.addAttribute("contentPage", "accountManagement/bankCashTransferEntry.jsp");
		return "main";
	}

	@GetMapping("/manualJournalEntry")
	public String getJournalEntryAccountSection(Model model) {
		model.addAttribute("contentPage", "accountManagement/manualJournalEntry.jsp");
		return "main";
	}

	@GetMapping("/incentivePayment")
	public String getIncentivePaymentAccountSection(Model model) {
		model.addAttribute("contentPage", "accountManagement/incentivePayment.jsp");
		return "main";
	}

	@GetMapping("/misInterestPaymentAccountSection")
	public String getmisIntPaymentAccountSection(Model model) {
		model.addAttribute("contentPage", "accountManagement/misInterestPayment.jsp");
		return "main";
	}

	@GetMapping("/chequeClearingProcessing")
	public String getChequeClearingAccountSection(Model model) {
		model.addAttribute("contentPage", "accountManagement/chequeClearingProcessing.jsp");
		return "main";
	}

	@GetMapping("/mandateDepositToBank")
	public String getMandateDepositToBank(Model model) {
		model.addAttribute("contentPage", "accountManagement/mandateDepositToBank.jsp");
		return "main";
	}

	@GetMapping("/bankStatement")
	public String getBankStatementAccountSection(Model model) {
		model.addAttribute("contentPage", "accountManagement/bankStatement.jsp");
		return "main";
	}

	@GetMapping("/cashBook")
	public String getCashBookAccountSection(Model model) {
		model.addAttribute("contentPage", "accountManagement/cashbook.jsp");
		return "main";
	}

	@GetMapping("/fundstransferRegister")
	public String getTransferBookAccountSection(Model model) {
		model.addAttribute("contentPage", "accountManagement/fundsTransferRegister.jsp");
		return "main";
	}

	@GetMapping("/dailyTransactionBook")
	public String getDayBookAccountSection(Model model) {
		model.addAttribute("contentPage", "accountManagement/dailyTransactionBook.jsp");
		return "main";
	}

	@GetMapping("/ledgerSummaryReport")
	public String getLedgerReportAccountSection(Model model) {
		model.addAttribute("contentPage", "accountManagement/ledgerSummaryReport.jsp");
		return "main";
	}

	@GetMapping("/journalEntryReport")
	public String getJournalReportAccountSection(Model model) {
		model.addAttribute("contentPage", "accountManagement/journalEntryReport.jsp");
		return "main";
	}

	@GetMapping("/trailBalanceReport")
	public String getTrailBalanceAccountSection(Model model) {
		model.addAttribute("contentPage", "accountManagement/trailBalanceReport.jsp");
		return "main";
	}

	@GetMapping("/pLStatement")
	public String getPLStatementAccountSection(Model model) {
		model.addAttribute("contentPage", "accountManagement/p&lStatement.jsp");
		return "main";
	}

	@GetMapping("/balanceSheet")
	public String getBalanceSheetAccountSection(Model model) {
		model.addAttribute("contentPage", "accountManagement/balanceSheet.jsp");
		return "main";
	}

	@GetMapping("/interbranchCashTransfer")
	public String getBranchCashTransferAccountSection(Model model) {
		model.addAttribute("contentPage", "accountManagement/interBranchCashTransfer.jsp");
		return "main";
	}

	// incentive Management
	@GetMapping("/incentiveSchemeMaster")
	public String getIncentiveSchemeMaster(Model model) {
		model.addAttribute("contentPage", "incentiveManagement/incentiveSchemeMaster.jsp");
		return "main";
	}

	@GetMapping("/generateIncentivePayments")
	public String getGenerateIncentivePayments(Model model) {
		model.addAttribute("contentPage", "incentiveManagement/generateIncentivePayments.jsp");
		return "main";
	}

	@GetMapping("/incentivePaymentDetails")
	public String getIncentivePaymentDetails(Model model) {
		model.addAttribute("contentPage", "incentiveManagement/incentivePaymentDetails.jsp");
		return "main";
	}

	@GetMapping("/incentiveSummaryReport")
	public String getIncentiveSummaryReport(Model model) {
		model.addAttribute("contentPage", "incentiveManagement/incentiveSummaryReport.jsp");
		return "main";
	}

	// Policy Management
	@GetMapping("/planManagement")
	public String getPlanManagement(Model model) {

		// Daily Deposit Code
		long maxIdDD = dailyDepositRepo.getMaxId();
		String memberCodeDD = "DD" + "000" + (maxIdDD + 1);
		model.addAttribute("memberCodeDD", memberCodeDD);

		long maxIdRD = recurringDepositRepo.getMaxId();
		String memberCodeRD = "RD" + "000" + (maxIdRD + 1);
		model.addAttribute("memberCodeRD", memberCodeRD);

		long maxIdFD = fixedDepositPMRepo.getMaxId();
		String memberCodeFD = "FD" + "000" + (maxIdFD + 1);
		model.addAttribute("memberCodeFD", memberCodeFD);

		long maxIdMD = misDepositePMRepo.getMaxId();
		String memberCodeMD = "MD" + "000" + (maxIdMD + 1);
		model.addAttribute("memberCodeMD", memberCodeMD);

		model.addAttribute("contentPage", "policyManagement/planManagement.jsp");
		return "main";
	}

	@GetMapping("/addNewInvestment")
	public String getAddNewInvestment(Model model) {
		model.addAttribute("contentPage", "policyManagement/addNewInvestment.jsp");
		return "main";
	}

	@GetMapping("/policyRenewalFee")
	public String getPolicyRenewalFee(Model model) {
		model.addAttribute("contentPage", "policyManagement/policyRenewalFee.jsp");
		return "main";
	}

	@GetMapping("/dailyPremiumRenewal")
	public String getDailyPremiumRenewal(Model model) {
		model.addAttribute("contentPage", "policyManagement/dailyPremiumRenewal.jsp");
		return "main";
	}

	@GetMapping("/flexiblePremiumRenewal")
	public String getFlexiblePremiumRenewal(Model model) {
		model.addAttribute("contentPage", "policyManagement/flexiblePremiumRenewal.jsp");
		return "main";
	}

	@GetMapping("/installmentRecordBook")
	public String getInstallmentRecordBook(Model model) {
		model.addAttribute("contentPage", "policyManagement/installmentRecordBook.jsp");
		return "main";
	}

	@GetMapping("/InvestmentTransactionSlip")
	public String getInvestmentTransactionSlip(Model model) {
		model.addAttribute("contentPage", "policyManagement/InvestmentTransactionSlip.jsp");
		return "main";
	}

	@GetMapping("/recurringPaymentReceipt")
	public String getRecurringPaymentReceipt(Model model) {
		model.addAttribute("contentPage", "policyManagement/recurringPaymentReceipt.jsp");
		return "main";
	}

	@GetMapping("/issueCertificate")
	public String getIssueCertificate(Model model) {
		model.addAttribute("contentPage", "policyManagement/issueCertificate.jsp");
		return "main";
	}

	@GetMapping("/reissueCertificate")
	public String getReissueCertificate(Model model) {
		model.addAttribute("contentPage", "policyManagement/reissueCertificate.jsp");
		return "main";
	}

	@GetMapping("/interestDetails")
	public String getInterestDetails(Model model) {
		model.addAttribute("contentPage", "policyManagement/interestDetails.jsp");
		return "main";
	}

	@GetMapping("/interestPayable")
	public String getInterestPayable(Model model) {
		model.addAttribute("contentPage", "policyManagement/interestPayable.jsp");
		return "main";
	}

	@GetMapping("/investmentDataSearch")
	public String getInvestmentDataSearch(Model model) {
		model.addAttribute("contentPage", "policyManagement/investmentDataSearch.jsp");
		return "main";
	}

	// Maturity Management
	@GetMapping("/maturitySchemeMaster")
	public String getMaturitySchemeMaster(Model model) {
		model.addAttribute("contentPage", "maturityManagement/maturitySchemeMaster.jsp");
		return "main";
	}

	@GetMapping("/applyForMaturity")
	public String getApplyForMaturity(Model model) {
		model.addAttribute("contentPage", "maturityManagement/applyForMaturity.jsp");
		return "main";
	}

	@GetMapping("/partialPaymentStatusMaturityApplication")
	public String getullMaturityPayment(Model model) {
		model.addAttribute("contentPage", "maturityManagement/partialMaturityStatus.jsp");
		return "main";
	}

	@GetMapping("/partialMaturityPayment")
	public String getMaturityPaymentPartly(Model model) {
		model.addAttribute("contentPage", "maturityManagement/partialMaturityPayment.jsp");
		return "main";
	}

	@GetMapping("/maturityApplicationStatus")
	public String getMaturityApplicationStatus(Model model) {
		model.addAttribute("contentPage", "maturityManagement/maturityApplicationStatus.jsp");
		return "main";
	}

	@GetMapping("/approvedStatusMaturityManagement")
	public String getApprovedStatusMaturityManagement(Model model) {
		model.addAttribute("contentPage", "maturityManagement/approvedStatus.jsp");
		return "main";
	}

	@GetMapping("/fullPaymentStatus")
	public String getfullPaymentStatus(Model model) {
		model.addAttribute("contentPage", "maturityManagement/fullPaymentStatus.jsp");
		return "main";
	}

	@GetMapping("/fullMaturityPayment")
	public String getPartialPaymentStatusMaturityApplication(Model model) {
		model.addAttribute("contentPage", "maturityManagement/fullMaturity.jsp");
		return "main";
	}

	// Loan Management
	@GetMapping("/loanSchemeCatalog")
	public String getLoanSchemeCatalog(Model model) {
		model.addAttribute("contentPage", "loanManagement/loanSchemeCatalog.jsp");
		return "main";
	}

	@GetMapping("/emiLoanCalculator")
	public String getEmiLoanCalculator(Model model) {
		model.addAttribute("contentPage", "loanManagement/emiLoanCalculator.jsp");
		return "main";
	}

	@GetMapping("/newLoanApplication")
	public String getNewLoanApplication(Model model) {
		long maxId = loanApplicationRepo.getMaxId();
		String loanCode = "LP" + "0000" + (maxId + 1);
		model.addAttribute("loanCode", loanCode);
		model.addAttribute("contentPage", "loanManagement/newLoanApplication.jsp");
		return "main";
	}

	@GetMapping("/loanApprovalLoanManagement")
	public String getLoanApprovalLoanManagement(Model model) {
		model.addAttribute("contentPage", "loanManagement/loanApproval.jsp");
		return "main";
	}

	@GetMapping("/loanPaymentLoanManagement")
	public String getLoanPaymentLoanManagement(Model model) {
		model.addAttribute("contentPage", "loanManagement/loanPayment.jsp");
		return "main";
	}

	@GetMapping("/regularEmiRePaymentLoanManagement")
	public String getRegularEmiRePaymentLoanManagement(Model model) {
		model.addAttribute("contentPage", "loanManagement/regularInstallmentPayment.jsp");
		return "main";
	}

	@GetMapping("/irrregularEmiRePaymentLoanManagement")
	public String getIrregularEmiRePaymentLoanManagement(Model model) {
		model.addAttribute("contentPage", "loanManagement/irregularInstallmentPayment.jsp");
		return "main";
	}

	@GetMapping("/regularLoanStatementLoanManagement")
	public String getRegularLoanStatementLoanSection(Model model) {
		model.addAttribute("contentPage", "loanManagement/regularLoanStatement.jsp");
		return "main";
	}

	@GetMapping("/irregularLoanStatementLoanManagement")
	public String getIrregularLoanStatementLoanSection(Model model) {
		model.addAttribute("contentPage", "loanManagement/irregularLoanStatement.jsp");
		return "main";
	}

	@GetMapping("/earlyLoanClosureLoan")
	public String getEarlyLoanClosureLoan(Model model) {
		model.addAttribute("contentPage", "loanManagement/EarlyLoanClosure.jsp");
		return "main";
	}
	
	@GetMapping("/LoanClosureLoan")
	public String getLoanClosureLoan(Model model) {
		model.addAttribute("contentPage", "loanManagement/LoanClosure.jsp");
		return "main";
	}

	@GetMapping("/preSettlementLoanManagement")
	public String getPreSettlementLoanSection(Model model) {
		model.addAttribute("contentPage", "loanManagement/preSettlement.jsp");
		return "main";
	}

	@GetMapping("/settleLoanRecords")
	public String getSettleLoanRecords(Model model) {
		model.addAttribute("contentPage", "loanManagement/settleLoanRecords.jsp");
		return "main";
	}

	@GetMapping("/generateNOCCertificateLoanManagement")
	public String getGenerateNOCCertificateLoanManagement(Model model) {
		model.addAttribute("contentPage", "loanManagement/generateNOCCertificate.jsp");
		return "main";
	}

	@GetMapping("/loanDocumentPrintLoanManagement")
	public String getloanDocumentPrintSection(Model model) {
		model.addAttribute("contentPage", "loanManagement/loanDocumentPrint.jsp");
		return "main";
	}

	@GetMapping("/searchLoanAccounts")
	public String getSearchLoanAccounts(Model model) {
		model.addAttribute("contentPage", "loanManagement/searchLoanAccounts.jsp");
		return "main";
	}

	// Customer Savings

	@GetMapping("/createSavingsAccount")
	public String getCreateSavingsAccount(Model model) {
		long maxId = createSavingAccountRepo.getMaxId();
		String savingaccountnumber = String.format("2025%08d", maxId + 1);
//		//String savingaccountnumber = String.format("%012d", 202500000000L + maxId);
//		String savingaccountnumber = "2025" + "000000" + (maxId + 1);
		model.addAttribute("savingaccountnumber", savingaccountnumber);
		model.addAttribute("contentPage", "customerSavings/createSavingsAccount.jsp");
		return "main";
	}

	@GetMapping("/createCurrentAccount")
	public String getCreateCurrentAccount(Model model) {
		model.addAttribute("contentPage", "customerSavings/createCurrentAccount.jsp");
		return "main";
	}

	@GetMapping("/savingsAccountActivity")
	public String getSavingsAccountActivity(Model model) {
		String prefix = "TXN";
		String timestamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
		int randomNumber = new Random().nextInt(9000) + 1000; // 4-digit random number
		String transactionCode = prefix + timestamp + randomNumber;

		model.addAttribute("transactionCode", transactionCode);
		model.addAttribute("contentPage", "customerSavings/savingsAccountActivity.jsp");
		return "main";
	}

	@GetMapping("/savingsAccountFundTransfer")
	public String getSavingsAccountFundTransfer(Model model) {
		model.addAttribute("contentPage", "customerSavings/savingsAccountFundTransfer.jsp");
		return "main";
	}

	@GetMapping("/savingAccountInterestTransfer")
	public String getSavingAccountInterestTransfer(Model model) {
		model.addAttribute("contentPage", "customerSavings/savingAccountInterestTransfer.jsp");
		return "main";
	}

	@GetMapping("/savingsRecordBook")
	public String getSavingsRecordBook(Model model) {
		model.addAttribute("contentPage", "customerSavings/savingsRecordBook.jsp");
		return "main";
	}

	@GetMapping("/currentAccountRecordBook")
	public String getCurrentAccountRecordBook(Model model) {
		model.addAttribute("contentPage", "customerSavings/currentAccountRecordBook.jsp");
		return "main";
	}

	@GetMapping("/savingsAccountStatement")
	public String getSavingsAccountStatement(Model model) {
		model.addAttribute("contentPage", "customerSavings/savingsAccountStatement.jsp");
		return "main";
	}

	@GetMapping("/savingsAccountCloser")
	public String getSavingsAccountCloser(Model model) {
		model.addAttribute("contentPage", "customerSavings/savingsAccountCloser.jsp");
		return "main";
	}

	@GetMapping("/savingsAccountInquiry")
	public String getSavingsAccountInquiry(Model model) {
		model.addAttribute("contentPage", "customerSavings/savingsAccountInquiry.jsp");
		return "main";
	}

	@GetMapping("/smsServiceFee")
	public String getSmsServiceFee(Model model) {
		model.addAttribute("contentPage", "customerSavings/smsServiceFee.jsp");
		return "main";
	}

	@GetMapping("/accountMaintenanceCharges")
	public String getAccountMaintenanceCharges(Model model) {
		model.addAttribute("contentPage", "customerSavings/accountMaintenanceCharges.jsp");
		return "main";
	}

	// Preferences
	@GetMapping("/companyAdministration")
	public String getCompanyAdministration(Model model) {
		model.addAttribute("contentPage", "preferences/companyAdministration.jsp");
		return "main";
	}

	@GetMapping("/financialYear")
	public String getFinancialYear(Model model) {
		model.addAttribute("contentPage", "preferences/financialYear.jsp");
		return "main";
	}

	@GetMapping("/createBranch")
	public String getCreateBranch(Model model) {
		model.addAttribute("contentPage", "preferences/createBranch.jsp");
		return "main";
	}

	@GetMapping("/bankModule")
	public String getBankModule(Model model) {
		model.addAttribute("contentPage", "preferences/bankModule.jsp");
		return "main";
	}

	@GetMapping("/relativeModule")
	public String getRelativeModule(Model model) {
		model.addAttribute("contentPage", "preferences/relativeModule.jsp");
		return "main";
	}

	@GetMapping("/casteModule")
	public String getCasteModule(Model model) {
		model.addAttribute("contentPage", "preferences/casteModule.jsp");
		return "main";
	}

	@GetMapping("/categoryModule")
	public String getCategoryModule(Model model) {
		model.addAttribute("contentPage", "preferences/categoryModule.jsp");
		return "main";
	}

	@GetMapping("/codeModule")
	public String getCodeModule(Model model) {
		model.addAttribute("contentPage", "preferences/codeModule.jsp");
		return "main";
	}

	@GetMapping("/executivePromoter")
	public String getExecutivePromoter(Model model) {
		model.addAttribute("contentPage", "preferences/executivePromoter.jsp");
		return "main";
	}

	@GetMapping("/customerCreation")
	public String getCustomerCreation(Model model) {
		model.addAttribute("contentPage", "preferences/customerCreation.jsp");
		return "main";
	}

	@GetMapping("/customerMenuAccess")
	public String getCustomerMenu(Model model) {
		model.addAttribute("contentPage", "preferences/customerMenuAccess.jsp");
		return "main";
	}

	@GetMapping("/customerBalanceReport")
	public String getCustomerBalanceReport(Model model) {
		model.addAttribute("contentPage", "preferences/customerBalanceReport.jsp");
		return "main";
	}

	@GetMapping("/lockerManagement")
	public String getLockerManagement(Model model) {
		model.addAttribute("contentPage", "preferences/lockerManagement.jsp");
		return "main";
	}

	@GetMapping("/ViewAdvisorData")
	public String ViewAdvisorData(Model model) {
		model.addAttribute("contentPage", "preferences/ReportAdvisor.jsp");
		return "main";
	}

	//Secured Gold Loan
	@GetMapping("/applyforGold")
	public String getapplyforGold(Model model) {
		Long maxId = applyForGoldRepo.getMaxId();
		String goldID = "GL" + "0000" + (maxId + 1);
		model.addAttribute("goldID", goldID);
		model.addAttribute("contentPage", "goldLoan/applyforGold.jsp");
		return "main";
	}

	@GetMapping("/emiInstallmentPayment")
	public String getemiInstallmentPayment(Model model) {
		model.addAttribute("contentPage", "goldLoan/emiInstallmentPayment.jsp");
		return "main";
	}

	@GetMapping("/goldLoanDocument")
	public String getGoldLoanDocument(Model model) {
		model.addAttribute("contentPage", "goldLoan/goldLoanDocument.jsp");
		return "main";
	}

	@GetMapping("/goldDirectory")
	public String getgoldDirectory(Model model) {
		long maxId = goldDirectoryRepo.getMaxId();
		Long lockerNo = maxId + 1;
		model.addAttribute("lockerNo", lockerNo);
		model.addAttribute("contentPage", "goldLoan/goldDirectory.jsp");
		return "main";
	}

	@GetMapping("/goldLoanApproval")
	public String getgoldLoanApproval(Model model) {
		model.addAttribute("contentPage", "goldLoan/goldLoanApproval.jsp");
		return "main";
	}

	@GetMapping("/goldLoanPayment")
	public String getgoldLoanPayment(Model model) {
		model.addAttribute("contentPage", "goldLoan/goldLoanPayment.jsp");
		return "main";
	}

	@GetMapping("/goldLoanStatement")
	public String getgoldLoanStatement(Model model) {
		model.addAttribute("contentPage", "goldLoan/goldLoanStatement.jsp");
		return "main";
	}

	@GetMapping("/goldSecurePlan")
	public String getgoldSecurePlan(Model model) {
		model.addAttribute("contentPage", "goldLoan/goldSecurePlan.jsp");
		return "main";
	}

	@GetMapping("/goldLoanClosure")
	public String getgoldLoanClosure(Model model) {
		model.addAttribute("contentPage", "goldLoan/goldLoanClosure.jsp");
		return "main";
	}

	@GetMapping("/printNOC")
	public String getprintNOC(Model model) {
		model.addAttribute("contentPage", "goldLoan/printNOC.jsp");
		return "main";
	}

	@GetMapping("/GoldLoanSearch")
	public String getsearchGoldLoan(Model model) {
		model.addAttribute("contentPage", "goldLoan/searchGoldLoan.jsp");
		return "main";
	}

}
