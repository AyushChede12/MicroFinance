
$(document).ready(function(){
	$.ajax({
			url: "api/userCreation/getAllUsers", // your GET API
			type: "GET",
			contentType: "application/json",
			success: function(users) {
				console.log("Fetched users:", users);
				var userSelect = $("#userName");
				userSelect.empty(); // clear existing options
				userSelect.append('<option value="">Select User</option>'); // default option

				// Populate dropdown with userIds
				users.forEach(function(user) {
					userSelect.append('<option value="' + user.userId + '">' + user.userId + '</option>');
				});
			},
			error: function(xhr) {
				console.error("Error fetching users:", xhr);
				alert("Failed to load users!");
			}
		});

});

function retriveINCheckBox() {
	const userName = document.getElementById("userName").value;

	$.ajax({
		type: "POST",
		url: 'api/userCreation/findTheUserIdByUserMasterService',
		contentType: "application/json",
		data: JSON.stringify({ userName: userName }),
		success: function(data) {

			if (!data || !data.service) {
				alert("No services found!");
				return;
			}

			const serviceArray = data.service.split(",");

			// STEP 1 ➜ Uncheck all checkboxes
			$("input[type='checkbox'][name='service']").prop("checked", false);

			// STEP 2 ➜ Check allowed services
			serviceArray.forEach(s => {
				const id = s.replace(/\s+/g, "_").trim();
				$("#" + id).prop("checked", true);
			});

			// STEP 3 ➜ Collect selected services
			const selectedServices = [];
			$("input[name='service']:checked").each(function() {
				selectedServices.push($(this).val());
			});

			// STEP 4 ➜ Call submit function WITH parameter
			submitUserServiceMap(selectedServices);
		},
		error: function() {
			alert("Device control failed");
		}
	});
}


function submitUserServiceMap() {

	const userName = $("#userName").val();
	const selectedServices = [];
	$("input[name='service']:checked").each(function() {
		selectedServices.push($(this).val());
	});
	$.ajax({
		type: "POST",
		url: "api/userCreation/userToServiceMap",
		data: {
			userName: userName,
			service: selectedServices.toString()
		},
		success: function() {
			alert("Access Updated Successfully!");
			location.reload();
		},
		error: function() {
			alert("Failed To Save Access!");
		}
	});
}

function loadSidebar(session) {

	if (!session || session.length === 0) {
		console.log("No Session Data Found");
		return;
	}

	// Hide everything first
	$(".sidebar-nav li, .nav-content li").hide();

	// PREFERENCES (NEW)
	if (session.includes("Company Administration")) $("#myCompanyAdministration").show();
	if (session.includes("Financial Year")) $("#myFinancialYear").show();
	if (session.includes("Create Branch")) $("#myCreateBranch").show();
	if (session.includes("Relative Module")) $("#myRelativeModule").show();
	if (session.includes("Category Caste Module")) $("#myCategoryCasteModule").show();
	if (session.includes("Code Module")) $("#myCode_Module").show();
	if (session.includes("Executive Founder")) $("#myExecutiveFounder").show();
	if (session.includes("User Creation")) $("#myUserCreation").show();
	if (session.includes("User Menu Access")) $("#myUserMenuAccess").show();

	// CUSTOMER MANAGEMENT (NEW)
	if (session.includes("Add Customer")) $("#myAddCustomerMenu").show();
	if (session.includes("Add Customer KYC")) $("#myAddCustomerKycMenu").show();
	if (session.includes("Customer Summary")) $("#myCustomerSummaryMenu").show();
	if (session.includes("Customer Report")) $("#myCustomerReportMenu").show();
	if (session.includes("Search Customer")) $("#mySearchCustomerMenu").show();

	// CUSTOMER SHAREHOLDING (NEW)
	if (session.includes("Transfer Shares")) $("#myTransferShares").show();
	if (session.includes("Unallotted Shares")) $("#myUnallottedShares").show();
	if (session.includes("Generate Share Certificate ")) $("#myAddCustomer").show();
	if (session.includes("Regenerate DNO")) $("#myRegenerateDNO").show();

	// ACCOUNT MANAGEMENT (NEW)

	if (session.includes("Ledger Account Master")) $("#myLedgerAccountMaster").show();
	if (session.includes("Outgoing Payment Entry")) $("#myOutgoingPaymentEntry").show();
	if (session.includes("Incoming Receipt Entry")) $("#myIncomingReceiptEntry").show();
	if (session.includes("Bank Cash Transfer Entry")) $("#myBankCashTransferEntry").show();
	if (session.includes("Manual Journal Entry")) $("#myManualJournalEntry").show();
	if (session.includes("Incentive Payment")) $("#myIncentivePayment").show();
	if (session.includes("MIS Interest Payment")) $("#myMISInterestPayment").show();
	if (session.includes("Cheque Clearance Processing")) $("#myChequeClearanceProcessing").show();
	if (session.includes("Mandate Deposit To Bank")) $("#myMandateDepositToBank").show();
	if (session.includes("Bank Statement")) $("#myBankStatement").show();
	if (session.includes("Cash Book")) $("#myCashBook").show();
	if (session.includes("Funds Transfer Register")) $("#myFundsTransferRegister").show();
	if (session.includes("Daily Transaction Book")) $("#myDailyTransactionBook").show();
	if (session.includes("Ledger Summary Report")) $("#myLedgerSummaryReport").show();
	if (session.includes("Journal Entry Report")) $("#myJournalEntryReport").show();
	if (session.includes("Trial Balance Report")) $("#myTrialBalanceReport").show();
	if (session.includes("PL Statement")) $("#myPLStatement").closest(".member-row").show();
	if (session.includes("Balance Sheet")) $("#myBalanceSheet").show();
	if (session.includes("Inter Branch Cash Transfer")) $("#myInterBranchCashTransfer").show();


	// CUSTOMER SAVINGS (NEW)
	if (session.includes("Savings Scheme Catalog")) $("#mySavingsSchemeCatalog").show();
	if (session.includes("Create Savings Account ")) $("#myCreateSavingsAccount").show();
	if (session.includes("Saving Account Activity")) $("#mySavingAccountActivity").show();
	if (session.includes("Savings Account Fund Transfer")) $("#mySavingsAccountFundTransfer").show();
	if (session.includes("Savings Account Interest Transfer")) $("#mySavingsAccountInterestTransfer").show();
	if (session.includes("Savings Record Book")) $("#mySavingsRecordBook").show();
	if (session.includes("Customer Savings Statement")) $("#myCustomerSavingStatement").show();
	if (session.includes("Saving Account Closer")) $("#mySavingAccountCloser").show();
	if (session.includes("Savings Account Inquiry")) $("#mySavingsAccountInquiry").show();
	if (session.includes("SMS Service Fee")) $("#mySMSServiceFee").show();
	if (session.includes("Account Maintenance Charges")) $("#myAccountMaintenanceCharges").show();

	// POLICY MANAGEMENT (NEW)
	if (session.includes("Plan Management")) $("#myPlanManagement").show();
	if (session.includes("Add New Investment")) $("#myAddNewInvestment").show();
	if (session.includes("Policy Renewal Fee")) $("#myPolicyRenewalFee").show();
	if (session.includes("Daily Premium Renewal")) $("#DailyPremiumRenewal").show();
	if (session.includes("Flexible Premium Renewal")) $("#myFlexiblePremiumRenewal").show();
	if (session.includes("Installment Record BooK")) $("#myInstallmentRecordBook").show();
	if (session.includes("Investment Transaction Slip")) $("#myInvestmentTransactionSlip").show();
	if (session.includes("Recurring Payment Receipt")) $("#myRecurringPaymentReceipt").show();
	if (session.includes("Issue Certificate")) $("#myIssueCertificate").show();
	if (session.includes("ReIssue Certificate")) $("#myReIssueCertificate").show();
	if (session.includes("Interest Details")) $("#myInterestDetails").show();
	if (session.includes("Interest Payable")) $("#myInterestPayable").show();
	if (session.includes("Search Policy")) $("#mySearchPolicy").show();

	// LOAN MANAGEMENT
	if (session.includes("Loan Scheme Catalog")) $("#myLoanSchemeCatalog").show();
	if (session.includes("EMI Loan Calculator")) $("#myEMILoanCalculator").show();
	if (session.includes("New Loan Application")) $("#myNewLoanApplication").show();
	if (session.includes("Loan Approval")) $("#myLoanApproval").show();
	if (session.includes("Loan Payment")) $("#myLoanPayment").show();
	if (session.includes("Regular Installment Payment")) $("#myRegularInstallmentPayment").show();
	if (session.includes("Irregular Installment Payment")) $("#myIrregularInstallmentPayment").show();
	if (session.includes("Regular Loan Statement")) $("#myRegularLoanStatement").show();
	if (session.includes("Irregular Loan Statement")) $("#myIrregularLoanStatement").show();
	if (session.includes("Generate Loan Documents")) $("#myGenerateLoanDocuments").show();
	if (session.includes("Early Loan Closure")) $("#myEarlyLoanClosure").show();
	if (session.includes("Settled Loan Records")) $("#mySettledLoanRecords").show();
	if (session.includes("Generate NOC Certificate")) $("#myGenerateNOCCertificate").show();
	if (session.includes("Search Loan Accounts")) $("#mySearchLoanAccounts").show();

	// JOIN LIABILITY LOAN
	if (session.includes("Create Lending Group")) $("#myCreateLendingGroup").show();
	if (session.includes("Group Directory")) $("#myGroupDirectory").show();
	if (session.includes("Apply For Group Loan")) $("#myApplyForGroupLoan").show();
	if (session.includes("Loan Approval")) $("#myLoanApproval").show();
	if (session.includes("Group Loan Payment")) $("#myGroupLoanPayment").show();
	if (session.includes("Installment Re-payment")) $("#myInstallmentRepayment").show();
	if (session.includes("Statement of Accoun")) $("#myStatementofAccount").show();
	if (session.includes("Early Loan Closure")) $("#myEarlyLoanClosure").show();
	if (session.includes("Completed Loans Record")) $("#myCompletedLoansRecord").show();
	if (session.includes("Find Loan Record")) $("#myFindLoanRecord").show();

	//REQUEST APPROVALS
	if (session.includes("Approve New Client Request")) $("#myApproveNewClientRequest").show();
	if (session.includes("Approve Share Transactions")) $("#myApproveShareTransactions").show();
	if (session.includes("Approve Finance Onboarding")) $("#myApproveFinanceOnboarding").show();
	if (session.includes("Approve Policy")) $("#myApprovePolicy").show();
	if (session.includes("Approve RD")) $("#myApproveRD").show();
	if (session.includes("Approve FD")) $("#myApproveFD").show();
	if (session.includes("Approve DD")) $("#myApproveDD").show();
	if (session.includes("Approve Saving Transactions")) $("#myApproveSavingTransactions").show();
	if (session.includes("Approve Savings Account Transfers")) $("#myApproveSavingsAccountTransfers").show();
	if (session.includes("Approve Regular EMI Payments")) $("#myApproveRegularEMIPayments").show();
	if (session.includes("Approve Irregular EMI Payments")) $("#myApproveIrregularEMIPayments").show();
	if (session.includes("Approve Manual Payment Entries")) $("#myApproveManualPaymentEntries").show();
	if (session.includes("Approve Maturity Applications")) $("#myApproveMaturityApplications").show();
	if (session.includes("Delete Maturity Applications Request")) $("#myDeleteMaturityApplicationsRequest").show();
	if (session.includes("Approve Inter Branch Cash Transfer")) $("#myApproveInterBranchCashTransfer").show();

	//DATA CORRECTION
	if (session.includes("Customer Data Update")) $("#myCustomerDataUpdate").show();
	if (session.includes("Shareholding Adjustment")) $("#myShareholdingAdjustment").show();
	if (session.includes("Financial Entry Correction")) $("#myFinancialEntryCorrection").show();
	if (session.includes("Policy Details Update")) $("#myPolicyDetailsUpdate").show();
	if (session.includes("Renewal Data Correction")) $("#myRenewalDataCorrection").show();
	if (session.includes("Daily Renewal Update")) $("#myDailyRenewalUpdate").show();
	if (session.includes("Flexible Transaction Removal")) $("#myFlexibleTransactionRemoval").show();
	if (session.includes("Savings Account Correction")) $("#mySavingsAccountCorrection").show();
	if (session.includes("Savings Transaction Removal")) $("#mySavingsTransactionRemoval").show();
	if (session.includes("Loan Account Correction")) $("#myLoanAccountCorrection").show();
	if (session.includes("Joint Liability Update")) $("#myJointLiabilityUpdate").show();

	// MATURITY MANAGEMNET
	if (session.includes("Maturity Scheme Master")) $("#myMaturitySchemeMaster").show();
	if (session.includes("Apply For Maturity")) $("#myApplyForMaturity").show();
	if (session.includes("Maturity Application Status")) $("#myMaturityApplicationStatus").show();
	if (session.includes("Full Maturity Payment")) $("#myFullMaturityPayment").show();
	if (session.includes("Full Payment Status")) $("#myFullPaymentStatus").show();
	if (session.includes("Partial Maturity Payment")) $("#myPartialMaturityPayment").show();
	if (session.includes("Partial Payment Status")) $("#myPartialPaymentStatus").show();
	if (session.includes("Approved Status")) $("#myApprovedStatus").show();


	// INCENTIVE MANAGEMENT
	if (session.includes("Incentive Scheme Master")) $("#myIncentiveSchemeMaster").show();
	if (session.includes("Generate Incentive Payments")) $("#myGenerateIncentivePayments").show();
	if (session.includes("Incentive Payment Details")) $("#myIncentivePaymentDetails").show();
	if (session.includes("Incentive Summary Report ")) $("#myIncentiveSummaryReport").show();

	// FINANCIAL CONSULTANT
	if (session.includes("Add Financial Consultant")) $("#myAddFinancialConsultant").show();
	if (session.includes("myFinancialConsultantHierarchy")) $("#myFinancialConsultantHierarchy").show();
	if (session.includes("myConsultantDownlineView")) $("#myConsultantDownlineView").show();
	if (session.includes("myConsultantPromotionManagement")) $("#myConsultantPromotionManagement").show();
	if (session.includes("myConsultantIDCardGenerator")) $("#myConsultantIDCardGenerator").show();

	// TEAM MANAGEMENT
	if (session.includes("Manage Designations")) $("#myManageDesignations").show();
	if (session.includes("Manage Departments")) $("#myManageDepartments").show();
	if (session.includes("Add Team Member")) $("#myAddTeamMember").show();
	if (session.includes("Generate Team Member ID Card")) $("#myGenerateTeamMemberIDCard").show();
	if (session.includes("Search Team Member")) $("#mySearchTeamMember").show();

	//REPORTS & ANALYTICS
	if (session.includes("Investment Transaction Report")) $("#myInvestmentTransactionReport").show();
	if (session.includes("Investment Summary Statement")) $("#myInvestmentSummaryStatement").show();
	if (session.includes("Financial Consultant Report")) $("#myFinancialConsultantReport").show();
	if (session.includes("Financial Consultant Team Collection Summary")) $("#myFinancialConsultantTeamCollectionSummary").show();
	if (session.includes("Cheque Transaction Report")) $("#myChequeTransactionReport").show();
	if (session.includes("Incentive Payment Summary")) $("#myIncentivePaymentSummary").show();
	if (session.includes("Recurring Installment Due Report")) $("#myRecurringInstallmentDueReport").show();
	if (session.includes("Unapproved Loan Applications")) $("#myUnapprovedLoanApplications").show();
	if (session.includes("Loan Report")) $("#myLoanReport").show();
	if (session.includes("Loan Payment Report")) $("#myLoanPaymentReport").show();
	if (session.includes("Upcoming EMI Due Report")) $("#myUpcomingEMIDueReport").show();
	if (session.includes("Overdue Repayment Analysis")) $("#myOverdueRepaymentAnalysis").show();
	if (session.includes("Loan Installment Pending Report")) $("#myLoanInstallmentPendingReport").show();
	if (session.includes("EMI Collection Summary")) $("#myEMICollectionSummary").show();
	if (session.includes("EMI Irregularity Statement")) $("#myEMIIrregularityStatement").show();
	if (session.includes("Loan Confirmation Document")) $("#myLoanConfirmationDocument").show();
	if (session.includes("Maturity Status Report")) $("#myMaturityStatusReport").show();
	if (session.includes("Investment Projection Report")) $("#myInvestmentProjectionReport").show();
	if (session.includes("Maturity Obligation Report")) $("#myMaturityObligationReport").show();
	if (session.includes("Tax Deducted at Source Summary")) $("#myTaxDeductedatSourceSummary").show();
	if (session.includes("Policy Performance Report")) $("#myPolicyPerformanceReport").show();

}