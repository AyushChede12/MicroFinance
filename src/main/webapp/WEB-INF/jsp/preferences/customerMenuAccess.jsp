
<style>
body {
	font-family: Arial, sans-serif;
	background: #f2f2f2;
	margin: 0;
	padding: 0;
}

.container {
	max-width: 1000px;
	margin: 40px auto;
	padding: 60px;
	background: white;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
}

h2 {
	color: #444;
	margin-bottom: 20px;
	border-bottom: 2px solid #ddd;
	padding-bottom: 10px;
}

.user-id-section {
	background-color: #f9f9f9;
	border: 1px solid #ccc;
	padding: 20px;
	margin-bottom: 30px;
	border-radius: 8px;
	box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.05);
}

.user-id-box {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.user-id-box label {
	font-weight: bold;
}

select {
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid #ccc;
	font-size: 14px;
}

.box-group {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	justify-content: space-between;
}

.user-box {
	flex: 0 1 calc(50% - 10px);
	background: #fff;
	padding: 15px;
	border: 1px solid #ddd;
	border-radius: 6px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.user-box label {
	font-weight: bold;
	margin-bottom: 8px;
}

.member-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #fafafa;
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid #eee;
	gap: 10px;
}

.checkbox-col {
	flex: 0 0 20px;
}

.bold-text {
	flex: 1;
	font-weight: bold;
	text-align: center;
}

.normal-text {
	flex: 1;
	font-weight: normal;
	text-align: right;
}

@media ( max-width : 768px) {
	.user-box {
		flex: 1 1 100%;
	}
}
</style>
<div class="pagetitle">
	<h1>User Menu Access</h1>

</div>

<div>
	<div class="user-id-section">
	<div class="user-id-box">

		<!-- User Selection -->
		<div class="form-group">
			<label for="userName">Select User ID:</label>
			<select id="userName" name="userName" class="form-control selectField" style="width: 100%;">
				<option value="">-- Select User --</option>
			</select>
		</div>

	</div>
</div>


	<!-- Box Group -->
	<div class="box-group">

		<!-- Member Section -->
		<div class="user-box">
			<label>Preferences</label>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myCompanyAdministration" name="service"
						value="Company Administration">
				</div>
				<div class="bold-text">Preferences =></div>
				<div class="normal-text">Company Administration</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myFinancialYear" name="service"
						value="Financial Year">
				</div>
				<div class="bold-text">Preferences =></div>
				<div class="normal-text">Financial Year</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myCreateBranch" name="service"
						value="Create Branch">
				</div>
				<div class="bold-text">Preferences =></div>
				<div class="normal-text">Create Branch</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myRelativeModule" name="service"
						value="Relative Module">
				</div>
				<div class="bold-text">Preferences =></div>
				<div class="normal-text">Relative Module</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myCategoryCasteModule" name="service"
						value="Category Caste Module">
				</div>
				<div class="bold-text">Preferences =></div>
				<div class="normal-text">Category/Caste Module</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myCode_Module" name="service"
						value="Code Module">
				</div>
				<div class="bold-text">Preferences =></div>
				<div class="normal-text">Code Module</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myExecutiveFounder" name="service"
						value="Executive Founder">
				</div>
				<div class="bold-text">Preferences =></div>
				<div class="normal-text">Executive Founder</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myUserCreation" name="service"
						value="User Creation">
				</div>
				<div class="bold-text">Preferences =></div>
				<div class="normal-text">User Creation</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myUserMenuAccess" name="service"
						value="User Menu Access">
				</div>
				<div class="bold-text">Preferences =></div>
				<div class="normal-text">User Menu Access</div>
			</div>
		</div>

		<div class="user-box">
			<label>Customer Management</label>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myAddCustomerMenu" name="service"
						value="Add Customer">
				</div>
				<div class="bold-text">Customer Management =></div>
				<div class="normal-text">Add Customer</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myAddCustomerKycMenu" name="service"
						value="Add Customer KYC">
				</div>
				<div class="bold-text">Customer Management =></div>
				<div class="normal-text">Add Customer KYC</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myCustomerSummaryMenu" name="service"
						value="Customer Summary">
				</div>
				<div class="bold-text">Customer Management =></div>
				<div class="normal-text">Customer Summary</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myCustomerReportMenu" name="service"
						value="Customer Report">
				</div>
				<div class="bold-text">Customer Management =></div>
				<div class="normal-text">Customer Report</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="mySearchCustomerMenu" name="service"
						value="Search Customer">
				</div>
				<div class="bold-text">Customer Management =></div>
				<div class="normal-text">Search Customer</div>
			</div>
		</div>

		<div class="user-box">
			<label>Customer Shareholding</label>
			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myTransferShares" name="service"
						value="Transfer Shares">
				</div>
				<div class="bold-text">Customer Shareholding =></div>
				<div class="normal-text">Transfer Shares</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myUnallottedShares" name="service"
						value="Unallotted Shares">
				</div>
				<div class="bold-text">Customer Shareholding =></div>
				<div class="normal-text">Unallotted Shares</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myGenerateShareCertificate"
						name="service" value="Generate Share Certificate">
				</div>
				<div class="bold-text">Customer Shareholding =></div>
				<div class="normal-text">Generate Share Certificate</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myRegenerateDNO" name="service"
						value="Regenerate DNO">
				</div>
				<div class="bold-text">Customer Shareholding =></div>
				<div class="normal-text">Regenerate DNO</div>
			</div>

		</div>

		<!-- Data Entry -->
		<div class="user-box">
			<label>Account Management</label>
			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myLedgerAccountMaster" name="service"
						value="Ledger Account Master">
				</div>
				<div class="bold-text">Account Management =></div>
				<div class="normal-text">Ledger Account Master</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myOutgoingPaymentEntry" name="service"
						value="Outgoing Payment Entry">
				</div>
				<div class="bold-text">Account Management =></div>
				<div class="normal-text">Outgoing Payment Entry</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myIncomingReceiptEntry" name="service"
						value="Incoming Receipt Entry">
				</div>
				<div class="bold-text">Account Management =></div>
				<div class="normal-text">Incoming Receipt Entry</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myBankCashTransferEntry" name="service"
						value="Bank Cash Transfer Entry">
				</div>
				<div class="bold-text">Account Management =></div>
				<div class="normal-text">Bank Cash Transfer Entry</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myManualJournalEntry" name="service"
						value="Manual Journal Entry">
				</div>
				<div class="bold-text">Account Management =></div>
				<div class="normal-text">Manual Journal Entry</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myIncentivePayment" name="service"
						value="Incentive Payment">
				</div>
				<div class="bold-text">Account Management =></div>
				<div class="normal-text">Incentive Payment</div>
			</div>



			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox">
				</div>
				<div class="bold-text">Account Management =></div>
				<div class="normal-text">Incentive Payment</div>
			</div>


			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myMISInterestPayment" name="service"
						value="MIS Interest Payment">
				</div>
				<div class="bold-text">Account Management =></div>
				<div class="normal-text">MIS Interest Payment</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myChequeClearanceProcessing"
						name="service" value="Cheque Clearance Processing">
				</div>
				<div class="bold-text">Account Management =></div>
				<div class="normal-text">Cheque Clearance Processing</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myMandateDepositToBank" name="service"
						value="Mandate Deposit To Bank">
				</div>
				<div class="bold-text">Account Management =></div>
				<div class="normal-text">Mandate Deposit To Bank</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myBankStatement" name="service"
						value="Bank Statement">
				</div>
				<div class="bold-text">Account Management =></div>
				<div class="normal-text">Bank Statement</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myCashBook" name="service"
						value="Cash Book">
				</div>
				<div class="bold-text">Account Management =></div>
				<div class="normal-text">Cash Book</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myFundsTransferRegister" name="service"
						value="Funds Transfer Register">
				</div>
				<div class="bold-text">Account Management =></div>
				<div class="normal-text">Funds Transfer Register</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myDailyTransactionBook" name="service"
						value="Daily Transaction Book">
				</div>
				<div class="bold-text">Account Management =></div>
				<div class="normal-text">Daily Transaction Book</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myLedgerSummaryReport" name="service"
						value="Ledger Summary Report">
				</div>
				<div class="bold-text">Account Management =></div>
				<div class="normal-text">Ledger Summary Report</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myJournalEntryReport" name="service"
						value="Journal Entry Report">
				</div>
				<div class="bold-text">Account Management =></div>
				<div class="normal-text">Journal Entry Report</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myTrialBalanceReport" name="service"
						value="Trial Balance Report">
				</div>
				<div class="bold-text">Account Management =></div>
				<div class="normal-text">Trial Balance Report</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myPLStatement" name="service"
						value="PL Statement">
				</div>
				<div class="bold-text">Account Management =></div>
				<div class="normal-text">PL Statement</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myBalanceSheet" name="service"
						value="Balance Sheet">
				</div>
				<div class="bold-text">Account Management =></div>
				<div class="normal-text">Balance Sheet</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myInterBranchCashTransfer"
						name="service" value="Inter Branch Cash Transfer">
				</div>
				<div class="bold-text">Account Management =></div>
				<div class="normal-text">Inter Branch Cash Transfer</div>
			</div>


		</div>

		<!-- Report Access -->
		<div class="user-box">
			<label>Customer Savings</label>
			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="mySavingsSchemeCatalog" name="service"
						value="Savings Scheme Catalog">
				</div>
				<div class="bold-text">Customer Savings =></div>
				<div class="normal-text">Savings Scheme Catalog</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myCreateSavingsAccount" name="service"
						value="Create Savings Account">
				</div>
				<div class="bold-text">Customer Savings =></div>
				<div class="normal-text">Create Savings Account</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="mySavingAccountActivity" name="service"
						value="Saving Account Activity">
				</div>
				<div class="bold-text">Customer Savings =></div>
				<div class="normal-text">Saving Account Activity</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="mySavingsAccountFundTransfer"
						name="service" value="Savings Account Fund Transfer">
				</div>
				<div class="bold-text">Customer Savings =></div>
				<div class="normal-text">Savings Account Fund Transfer</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="mySavingsAccountInterestTransfer"
						name="service" value="Savings Account Interest Transfer">
				</div>
				<div class="bold-text">Customer Savings =></div>
				<div class="normal-text">Savings Account Interest Transfer</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="mySavingsRecordBook" name="service"
						value="Savings Record Book">
				</div>
				<div class="bold-text">Customer Savings =></div>
				<div class="normal-text">Savings Record Book</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myCustomerSavingStatement"
						name="service" value="Customer Savings Statement">
				</div>
				<div class="bold-text">Customer Savings =></div>
				<div class="normal-text">Customer Savings Statement</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="mySavingAccountCloser" name="service"
						value="Saving Account Closer">
				</div>
				<div class="bold-text">Customer Savings =></div>
				<div class="normal-text">Saving Account Closer</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="mySavingsAccountInquiry" name="service"
						value="Savings Account Inquiry">
				</div>
				<div class="bold-text">Customer Savings =></div>
				<div class="normal-text">Savings Account Inquiry</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="mySMSServiceFee" name="service"
						value="SMS Service Fee">
				</div>
				<div class="bold-text">Customer Savings =></div>
				<div class="normal-text">SMS Service Fee</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myAccountMaintenanceCharges"
						name="service" value="Account Maintenance Charges">
				</div>
				<div class="bold-text">Customer Savings =></div>
				<div class="normal-text">Account Maintenance Charges</div>
			</div>
		</div>

		<!-- Extra Role -->
		<div class="user-box">
			<label>Policy Management</label>
			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myPlanManagement" name="service"
						value="Plan Management">
				</div>
				<div class="bold-text">Policy Management =></div>
				<div class="normal-text">Plan Management</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myAddNewInvestment" name="service"
						value="Add New Investment">
				</div>
				<div class="bold-text">Policy Management =></div>
				<div class="normal-text">Add New Investment</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myPolicyRenewalFee" name="service"
						value="Policy Renewal Fee">
				</div>
				<div class="bold-text">Policy Management =></div>
				<div class="normal-text">Policy Renewal Fee</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="DailyPremiumRenewal" name="service"
						value="Daily Premium Renewal">
				</div>
				<div class="bold-text">Policy Management =></div>
				<div class="normal-text">Daily Premium Renewal</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myFlexiblePremiumRenewal" name="service"
						value="Flexible Premium Renewal">
				</div>
				<div class="bold-text">Policy Management =></div>
				<div class="normal-text">Flexible Premium Renewal</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myInstallmentRecordBook" name="service"
						value="Installment Record Book">
				</div>
				<div class="bold-text">Policy Management =></div>
				<div class="normal-text">Installment Record Book</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myInvestmentTransactionSlip"
						name="service" value="Investment Transaction Slip">
				</div>
				<div class="bold-text">Policy Management =></div>
				<div class="normal-text">Investment Transaction Slip</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myRecurringPaymentReceipt"
						name="service" value="Recurring Payment Receipt">
				</div>
				<div class="bold-text">Policy Management =></div>
				<div class="normal-text">Recurring Payment Receipt</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myIssueCertificate" name="service"
						value="Issue Certificate">
				</div>
				<div class="bold-text">Policy Management =></div>
				<div class="normal-text">Issue Certificate</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myReIssueCertificate" name="service"
						value="ReIssue Certificate">
				</div>
				<div class="bold-text">Policy Management =></div>
				<div class="normal-text">ReIssue Certificate</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myInterestDetails" name="service"
						value="Interest Details">
				</div>
				<div class="bold-text">Policy Management =></div>
				<div class="normal-text">Interest Details</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myInterestPayable" name="service"
						value="Interest Payable">
				</div>
				<div class="bold-text">Policy Management =></div>
				<div class="normal-text">Interest Payable</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="mySearchPolicy" name="service"
						value="Search Policy">
				</div>
				<div class="bold-text">Policy Management =></div>
				<div class="normal-text">Search Policy</div>
			</div>
		</div>

		<div class="user-box">
			<label>Loan Management</label>
			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myLoanSchemeCatalog" name="service"
						value="Loan Scheme Catalog">
				</div>
				<div class="bold-text">Loan Management =></div>
				<div class="normal-text">Loan Scheme Catalog</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myEMILoanCalculator" name="service"
						value="EMI Loan Calculator">
				</div>
				<div class="bold-text">Loan Management =></div>
				<div class="normal-text">EMI Loan Calculator</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myNewLoanApplication" name="service"
						value="New Loan Application">
				</div>
				<div class="bold-text">Loan Management =></div>
				<div class="normal-text">New Loan Application</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myLoanApproval" name="service"
						value="Loan Approval">
				</div>
				<div class="bold-text">Loan Management =></div>
				<div class="normal-text">Loan Approval</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myLoanPayment" name="service"
						value="Loan Payment">
				</div>
				<div class="bold-text">Loan Management =></div>
				<div class="normal-text">Loan Payment</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myRegularInstallmentPayment"
						name="service" value="Regular Installment Payment">
				</div>
				<div class="bold-text">Loan Management =></div>
				<div class="normal-text">Regular Installment Payment</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myIrregularInstallmentPayment"
						name="service" value="Irregular Installment Payment">
				</div>
				<div class="bold-text">Loan Management =></div>
				<div class="normal-text">Irregular Installment Payment</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myRegularLoanStatement" name="service"
						value="Regular Loan Statement">
				</div>
				<div class="bold-text">Loan Management =></div>
				<div class="normal-text">Regular Loan Statement</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myIrregularLoanStatement" name="service"
						value="Irregular Loan Statement">
				</div>
				<div class="bold-text">Loan Management =></div>
				<div class="normal-text">Irregular Loan Statement</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myGenerateLoanDocuments" name="service"
						value="Generate Loan Documents">
				</div>
				<div class="bold-text">Loan Management =></div>
				<div class="normal-text">Generate Loan Documents</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myEarlyLoanClosure" name="service"
						value="Early Loan Closure">
				</div>
				<div class="bold-text">Loan Management =></div>
				<div class="normal-text">Early Loan Closure</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="mySettledLoanRecords" name="service"
						value="Settled Loan Records">
				</div>
				<div class="bold-text">Loan Management =></div>
				<div class="normal-text">Settled Loan Records</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myGenerateNOCCertificate" name="service"
						value="Generate NOC Certificate">
				</div>
				<div class="bold-text">Loan Management =></div>
				<div class="normal-text">Generate NOC Certificate</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="mySearchLoanAccounts" name="service"
						value="Search Loan Accounts">
				</div>
				<div class="bold-text">Loan Management =></div>
				<div class="normal-text">Search Loan Accounts</div>
			</div>
		</div>

		<div class="user-box">
			<label>Joint Liability Loan</label>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myCreateLendingGroup" name="service"
						value="Create Lending Group">
				</div>
				<div class="bold-text">Joint Liability Loan =></div>
				<div class="normal-text">Create Lending Group</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myGroupDirectory" name="service"
						value="Group Directory">
				</div>
				<div class="bold-text">Joint Liability Loan =></div>
				<div class="normal-text">Group Directory</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myApplyForGroupLoan" name="service"
						value="Apply For Group Loan">
				</div>
				<div class="bold-text">Joint Liability Loan =></div>
				<div class="normal-text">Apply For Group Loan</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myLoanApproval" name="service"
						value="Loan Approval">
				</div>
				<div class="bold-text">Joint Liability Loan =></div>
				<div class="normal-text">Loan Approval</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myGroupLoanPayment" name="service"
						value="Group Loan Payment">
				</div>
				<div class="bold-text">Joint Liability Loan =></div>
				<div class="normal-text">Group Loan Payment</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myInstallmentRepayment" name="service"
						value="Installment Re-payment">
				</div>
				<div class="bold-text">Joint Liability Loan =></div>
				<div class="normal-text">Installment Re-payment</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myStatementofAccount" name="service"
						value="Statement of Account">
				</div>
				<div class="bold-text">Joint Liability Loan =></div>
				<div class="normal-text">Statement of Account</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myEarlyLoanClosure" name="service"
						value="Early Loan Closure">
				</div>
				<div class="bold-text">Joint Liability Loan =></div>
				<div class="normal-text">Early Loan Closure</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myCompletedLoansRecord" name="service"
						value="Completed Loans Record">
				</div>
				<div class="bold-text">Joint Liability Loan =></div>
				<div class="normal-text">Completed Loans Record</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myFindLoanRecord" name="service"
						value="Find Loan Record">
				</div>
				<div class="bold-text">Joint Liability Loan =></div>
				<div class="normal-text">Find Loan Record</div>
			</div>
		</div>

		<div class="user-box">
			<label>Request Approvals</label>
			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myApproveNewClientRequest"
						name="service" value="Approve New Client Request">
				</div>
				<div class="bold-text">Request Approvals =></div>
				<div class="normal-text">Approve New Client Request</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myApproveShareTransactions"
						name="service" value="Approve Share Transactions">
				</div>
				<div class="bold-text">Request Approvals =></div>
				<div class="normal-text">Approve Share Transactions</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myApproveFinanceOnboarding"
						name="service" value="Approve Finance Onboarding">
				</div>
				<div class="bold-text">Request Approvals =></div>
				<div class="normal-text">Approve Finance Onboarding</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myApprovePolicy" name="service"
						value="Approve Policy">
				</div>
				<div class="bold-text">Request Approvals =></div>
				<div class="normal-text">Approve Policy</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myApproveRD" name="service"
						value="Approve RD">
				</div>
				<div class="bold-text">Request Approvals =></div>
				<div class="normal-text">Approve RD</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myApproveFD" name="service"
						value="Approve FD">
				</div>
				<div class="bold-text">Request Approvals =></div>
				<div class="normal-text">Approve FD</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myApproveDD" name="service"
						value="Approve DD">
				</div>
				<div class="bold-text">Request Approvals =></div>
				<div class="normal-text">Approve DD</div>
			</div>


			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myApproveSavingTransactions"
						name="service" value="Approve Saving Transactions">
				</div>
				<div class="bold-text">Request Approvals =></div>
				<div class="normal-text">Approve Saving Transactions</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myApproveSavingsAccountTransfers"
						name="service" value="Approve Savings Account Transfers">
				</div>
				<div class="bold-text">Request Approvals =></div>
				<div class="normal-text">Approve Savings Account Transfers</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myApproveRegularEMIPayments"
						name="service" value="Approve Regular EMI Payments">
				</div>
				<div class="bold-text">Request Approvals =></div>
				<div class="normal-text">Approve Regular EMI Payments</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myApproveIrregularEMIPayments"
						name="service" value="Approve Irregular EMI Payments">
				</div>
				<div class="bold-text">Request Approvals =></div>
				<div class="normal-text">Approve Irregular EMI Payments</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myApproveManualPaymentEntries"
						name="service" value="Approve Manual Payment Entries">
				</div>
				<div class="bold-text">Request Approvals =></div>
				<div class="normal-text">Approve Manual Payment Entries</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myApproveMaturityApplications"
						name="service" value="Approve Maturity Applications">
				</div>
				<div class="bold-text">Request Approvals =></div>
				<div class="normal-text">Approve Maturity Applications</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myDeleteMaturityApplicationRequest"
						name="service" value="Delete Maturity Application Request">
				</div>
				<div class="bold-text">Request Approvals =></div>

				<div class="normal-text">Delete Maturity Application Request</div>

				<div class="normal-text">Delete Maturity Applications Request</div>

			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myApproveInterBranchCashTransfer"
						name="service" value="Approve Inter Branch Cash Transfer">
				</div>
				<div class="bold-text">Request Approvals =></div>
				<div class="normal-text">Approve Inter Branch Cash Transfer</div>
			</div>

		</div>

		<div class="user-box">
			<label>Data Correction</label>
			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myCustomerDataUpdate" name="service"
						value="Customer Data Update">
				</div>
				<div class="bold-text">Data Correction =></div>
				<div class="normal-text">Customer Data Update</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myShareholdingAdjustment" name="service"
						value="Shareholding Adjustment">
				</div>
				<div class="bold-text">Data Correction =></div>
				<div class="normal-text">Shareholding Adjustment</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myFinancialEntryCorrection"
						name="service" value="Financial Entry Correction">
				</div>
				<div class="bold-text">Data Correction =></div>
				<div class="normal-text">Financial Entry Correction</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myPolicyDetailsUpdate" name="service"
						value="Policy Details Update">
				</div>
				<div class="bold-text">Data Correction =></div>
				<div class="normal-text">Policy Details Update</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myRenewalDataCorrection" name="service"
						value="Renewal Data Correction">
				</div>
				<div class="bold-text">Data Correction =></div>
				<div class="normal-text">Renewal Data Correction</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myDailyRenewalUpdate" name="service"
						value="Daily Renewal Update">
				</div>
				<div class="bold-text">Data Correction =></div>
				<div class="normal-text">Daily Renewal Update</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myFlexibleTransactionRemoval"
						name="service" value="Flexible Transaction Removal">
				</div>
				<div class="bold-text">Data Correction =></div>
				<div class="normal-text">Flexible Transaction Removal</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="mySavingsAccountCorrection"
						name="service" value="Savings Account Correction">
				</div>
				<div class="bold-text">Data Correction =></div>
				<div class="normal-text">Savings Account Correction</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="mySavingsTransactionRemoval"
						name="service" value="Savings Transaction Removal">
				</div>
				<div class="bold-text">Data Correction =></div>
				<div class="normal-text">Savings Transaction Removal</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myLoanAccountCorrection" name="service"
						value="Loan Account Correction">
				</div>
				<div class="bold-text">Data Correction =></div>
				<div class="normal-text">Loan Account Correction</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myJointLiabilityUpdate" name="service"
						value="Joint Liability Update">
				</div>
				<div class="bold-text">Data Correction =></div>
				<div class="normal-text">Joint Liability Update</div>
			</div>

		</div>

		<div class="user-box">
			<label>Maturity Management</label>
			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myMaturitySchemeMaster" name="service"
						value="Maturity Scheme Master">
				</div>
				<div class="bold-text">Maturity Management =></div>
				<div class="normal-text">Maturity Scheme Master</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myApplyForMaturity" name="service"
						value="Apply For Maturity">
				</div>
				<div class="bold-text">Maturity Management =></div>
				<div class="normal-text">Apply For Maturity</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myMaturityApplicationStatus"
						name="service" value="Maturity Application Status">
				</div>
				<div class="bold-text">Maturity Management =></div>
				<div class="normal-text">Maturity Application Status</div>
			</div>


			<div class="member-row">
				<div class="checkbox-col">

					<input type="checkbox" id="myFullMaturityPayment" name="service"
						value="Full Maturity Payment"> <input type="checkbox">
				</div>
				<div class="bold-text">Maturity Management =></div>
				<div class="normal-text">Partial Maturity Payment</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox">

				</div>
				<div class="bold-text">Maturity Management =></div>
				<div class="normal-text">Full Maturity Payment</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myFullPaymentStatus" name="service"
						value="Full Payment Status">
				</div>
				<div class="bold-text">Maturity Management =></div>
				<div class="normal-text">Full Payment Status</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myPartialMaturityPayment" name="service"
						value="Partial Maturity Payment">
				</div>
				<div class="bold-text">Maturity Management =></div>
				<div class="normal-text">Partial Maturity Payment</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myPartialPaymentStatus" name="service"
						value="Partial Payment Status">
				</div>
				<div class="bold-text">Maturity Management =></div>
				<div class="normal-text">Partial Payment Status</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myApprovedStatus" name="service"
						value="Approved Status">
				</div>
				<div class="bold-text">Maturity Management =></div>
				<div class="normal-text">Approved Status</div>
			</div>

		</div>

		<div class="user-box">
			<label>Incentive Management</label>
			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myIncentiveSchemeMaster" name="service"
						value="Incentive Scheme Master">
				</div>
				<div class="bold-text">Incentive Management =></div>
				<div class="normal-text">Incentive Scheme Master</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myGenerateIncentivePayments"
						name="service" value="Generate Incentive Payments">
				</div>
				<div class="bold-text">Incentive Management =></div>
				<div class="normal-text">Generate Incentive Payments</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myIncentivePaymentDetails"
						name="service" value="Incentive Payment Details">
				</div>
				<div class="bold-text">Incentive Management =></div>
				<div class="normal-text">Incentive Payment Details</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myIncentiveSummaryReport" name="service"
						value="Incentive Summary Report">
				</div>
				<div class="bold-text">Incentive Management =></div>
				<div class="normal-text">Incentive Summary Report</div>
			</div>

		</div>

		<div class="user-box">
			<label>Financial Consultant</label>
			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myAddFinancialConsultant" name="service"
						value="Add Financial Consultant">
				</div>
				<div class="bold-text">Financial Consultant =></div>
				<div class="normal-text">Add Financial Consultant</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myFinancialConsultantHierarchy"
						name="service" value="Financial Consultant Hierarchy">
				</div>
				<div class="bold-text">Financial Consultant =></div>
				<div class="normal-text">Financial Consultant Hierarchy</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myConsultantDownlineView" name="service"
						value="Consultant Downline View">
				</div>
				<div class="bold-text">Financial Consultant =></div>
				<div class="normal-text">Consultant Downline View</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myConsultantPromotionManagement"
						name="service" value="Consultant Promotion Management">
				</div>
				<div class="bold-text">Financial Consultant =></div>
				<div class="normal-text">Consultant Promotion Management</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myConsultantIDCardGenerator"
						name="service" value="Consultant ID Card Generator">
				</div>
				<div class="bold-text">Financial Consultant =></div>
				<div class="normal-text">Consultant ID Card Generator</div>
			</div>

		</div>

		<div class="user-box">
			<label>Team Management</label>
			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myManageDesignations" name="service"
						value="Manage Designations">
				</div>
				<div class="bold-text">Team Management =></div>
				<div class="normal-text">Manage Designations</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myManageDepartments" name="service"
						value="Manage Departments">
				</div>
				<div class="bold-text">Team Management =></div>
				<div class="normal-text">Manage Departments</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myAddTeamMember" name="service"
						value="Add Team Member">
				</div>
				<div class="bold-text">Team Management =></div>
				<div class="normal-text">Add Team Member</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myGenerateTeamMemberIDCard"
						name="service" value="Generate Team Member ID Card">
				</div>
				<div class="bold-text">Team Management =></div>
				<div class="normal-text">Generate Team Member ID Card</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="mySearchTeamMember" name="service"
						value="Search Team Member">
				</div>
				<div class="bold-text">Team Management =></div>
				<div class="normal-text">Search Team Member</div>
			</div>

		</div>

		<div class="user-box">
			<label>Reports & Analytics</label>
			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myInvestmentTransactionReport"
						name="service" value="Investment Transaction Report">
				</div>
				<div class="bold-text">Reports and Analytics =></div>
				<div class="normal-text">Investment Transaction Report</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myInvestmentSummaryStatement"
						name="service" value="Investment Summary Statement">
				</div>
				<div class="bold-text">Reports and Analytics =></div>
				<div class="normal-text">Investment Summary Statement</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myFinancialConsultantReport"
						name="service" value="Financial Consultant Report">
				</div>
				<div class="bold-text">Reports and Analytics =></div>
				<div class="normal-text">Financial Consultant Report</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox"
						id="myFinancialConsultantTeamCollectionSummary" name="service"
						value="Financial Consultant Team Collection Summary">
				</div>

				<div class="bold-text">Reports and Analytics =></div>

				<div class="bold-text">Reports & Analytics =></div>

				<div class="normal-text">Financial Consultant Team Collection
					Summary</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myChequeTransactionReport"
						name="service" value="Cheque Transaction Report">
				</div>
				<div class="bold-text">Reports and Analytics =></div>
				<div class="normal-text">Cheque Transaction Report</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myIncentivePaymentSummary"
						name="service" value="Incentive Payment Summary">
				</div>
				<div class="bold-text">Reports and Analytics =></div>
				<div class="normal-text">Incentive Payment Summary</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myRecurringInstallmentDueReport"
						name="service" value="Recurring Installment Due Report">
				</div>
				<div class="bold-text">Reports and Analytics =></div>
				<div class="normal-text">Recurring Installment Due Report</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myUnapprovedLoanApplications"
						name="service" value="Unapproved Loan Applications">
				</div>
				<div class="bold-text">Reports and Analytics =></div>
				<div class="normal-text">Unapproved Loan Applications</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myLoanReport" name="service"
						value="Loan Report">
				</div>
				<div class="bold-text">Reports and Analytics =></div>
				<div class="normal-text">Loan Report</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myLoanPaymentReport" name="service"
						value="Loan Payment Report">
				</div>
				<div class="bold-text">Reports and Analytics =></div>
				<div class="normal-text">Loan Payment Report</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myUpcomingEMIDueReport" name="service"
						value="Upcoming EMI Due Report">
				</div>
				<div class="bold-text">Reports and Analytics =></div>
				<div class="normal-text">Upcoming EMI Due Report</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myOverdueRepaymentAnalysis"
						name="service" value="Overdue Repayment Analysis">
				</div>
				<div class="bold-text">Reports and Analytics =></div>
				<div class="normal-text">Overdue Repayment Analysis</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myLoanInstallmentPendingReport"
						name="service" value="Loan Installment Pending Report">
				</div>
				<div class="bold-text">Reports and Analytics =></div>
				<div class="normal-text">Loan Installment Pending Report</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myEMICollectionSummary" name="service"
						value="EMI Collection Summary">
				</div>
				<div class="bold-text">Reports and Analytics =></div>
				<div class="normal-text">EMI Collection Summary</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myEMIIrregularityStatement"
						name="service" value="EMI Irregularity Statement">
				</div>
				<div class="bold-text">Reports and Analytics =></div>
				<div class="normal-text">EMI Irregularity Statement</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myLoanConfirmationDocument"
						name="service" value="Loan Confirmation Document">
				</div>
				<div class="bold-text">Reports and Analytics =></div>
				<div class="normal-text">Loan Confirmation Document</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myMaturityStatusReport" name="service"
						value="Maturity Status Report">
				</div>
				<div class="bold-text">Reports and Analytics =></div>
				<div class="normal-text">Maturity Status Report</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myInvestmentProjectionReport"
						name="service" value="Investment Projection Report">
				</div>
				<div class="bold-text">Reports and Analytics =></div>
				<div class="normal-text">Investment Projection Report</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myMaturityObligationReport"
						name="service" value="Maturity Obligation Report">
				</div>
				<div class="bold-text">Reports and Analytics =></div>
				<div class="normal-text">Maturity Obligation Report</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myTaxDeductedatSourceSummary"
						name="service" value="Tax Deducted at Source Summary">
				</div>
				<div class="bold-text">Reports and Analytics =></div>
				<div class="normal-text">Tax Deducted at Source Summary</div>
			</div>

			<div class="member-row">
				<div class="checkbox-col">
					<input type="checkbox" id="myPolicyPerformanceReport"
						name="service" value="Policy Performance Report">
				</div>
				<div class="bold-text">Reports and Analytics =></div>
				<div class="normal-text">Policy Performance Report</div>
			</div>


		</div>

	</div>


	<div class="row">
		<div class="col-12 text-center mt-4" style="margin-center: 300px;">
			<button type="button" id="saveAccessBtn" class="btnStyle bg-warning"
				onclick="submitUserServiceMap()">Save</button>

		</div>
	</div>


</div>
<div class="row">
	<div class="col-12 text-center mt-4" style="margin-left: 300px;">
		<button type="button" id="saveAccessBtn" class="btnStyle bg-warning">Save</button>

	</div>
</div>

<script
	src="${pageContext.request.contextPath}/js/preferences/userMenuAccess.js"></script>
