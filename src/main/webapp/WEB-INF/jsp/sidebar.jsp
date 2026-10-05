<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="baseUrl" value="${pageContext.request.contextPath}" />
<aside id="sidebar" class="sidebar">

	<ul class="sidebar-nav" id="sidebar-nav">
		<li class="nav-item"><a href="${baseUrl}/openDashboard" class="nav-link"
			style="display: block"> <i class="bi bi-house-door"
				style="color: rgb(255, 255, 255);"></i> <span
				style="font-family: 'Poppins', sans-serif">DASHBOARD</span>
		</a></li>


		<!-- Preferences -->

		<li class="nav-item"><a class="nav-link collapsed"
			href="#member-section" data-toggle="collapse">
				<div class="d-flex">
					<i class="bi bi-gear text-white"></i> <span
						style="font-family: 'Poppins', sans-serif">PREFERENCES</span>
				</div> <i class="bi bi-chevron-down"></i>
		</a>

			<ul id="member-section" class="nav-content collapse">
				<li><a href="${baseUrl}/companyAdministration"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">COMPANY
							ADMINISTRATION</span>
				</a></li>

				<li><a href="${baseUrl}/financialYear"> <i class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">FINANCIAL YEAR</span>
				</a></li>

				<li><a href="${baseUrl}/createBranch"> <i class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">CREATE BRANCH</span>
				</a></li>

				<li><a href="${baseUrl}/bankModule"> <i class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">BANK MODULE</span>
				</a></li>

				<li><a href="${baseUrl}/relativeModule"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">RELATIVE
							MODULE</span>
				</a></li>

				<li><a href="${baseUrl}/categoryModule"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">CATEGORY/CASTE
							MODULE</span>
				</a></li>

				<li><a href="${baseUrl}/codeModule"> <i class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">CODE MODULE</span>
				</a></li>

				<li><a href="${baseUrl}/executivePromoter"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">EXECUTIVE/FOUNDER</span>
				</a></li>

				<li><a href="${baseUrl}/customerCreation"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">USER
							CREATION</span>
				</a></li>

				<li><a href="${baseUrl}/customerMenuAccess"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">USER MENU
							ACCESS</span>
				</a></li>
				<!-- 
					<li><a href="customerBalanceReport"> <i
							class="bi bi-circle"></i> <span
							style="font-family: 'Poppins', sans-serif">Balance Sheet</span>
					</a></li>

					<li><a href="lockerManagement"> <i class="bi bi-circle"></i>
							<span style="font-family: 'Poppins', sans-serif">Locker
								Management</span>
					</a></li> -->
			</ul></li>


		<!-- Customer Management -->

		<li class="nav-item"><a class="nav-link collapsed"
			href="#customer-management" data-toggle="collapse">
				<div class="d-flex">
					<i class="bi bi-people-fill text-white"></i> <span
						style="font-family: 'Poppins', sans-serif">CUSTOMER
						MANAGEMENT</span>
				</div> <i class="bi bi-chevron-down"></i>
		</a>

			<ul id="customer-management" class="nav-content collapse">
				<li><a href="${baseUrl}/addCustomer"> <i class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">ADD CUSTOMER</span>
				</a></li>

				<li><a href="${baseUrl}/addCustomerKYC"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">ADD
							CUSTOMER KYC</span>
				</a></li>

				<li><a href="${baseUrl}/customerSummary"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">CUSTOMER
							SUMMARY</span>
				</a></li>

				<li><a href="${baseUrl}/customerReport"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">CUSTOMER
							REPORT</span>
				</a></li>

				<li><a href="${baseUrl}/searchCustomer"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">SEARCH
							CUSTOMER</span>
				</a></li>
			</ul></li>


		<!-- Customer Shareholding -->
		<li class="nav-item"><a class="nav-link collapsed"
			href="#member-share" data-toggle="collapse">
				<div class="d-flex">
					<i class="bi bi-building-fill-down text-white"></i> <span
						style="font-family: 'Poppins', sans-serif">CUSTOMER
						SHAREHOLDING</span>
				</div> <i class="bi bi-chevron-down"></i>
		</a>

			<ul id="member-share" class="nav-content collapse">
				<li><a href="${baseUrl}/transferShares"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">TRANSFER
							SHARES</span>
				</a></li>

				<li><a href="${baseUrl}/unallotedShares"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">UNALLOTED
							SHARES</span>
				</a></li>

				<li><a href="${baseUrl}/generateShareCertificate"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">GENERATE SHARE
							CERTIFICATE</span>
				</a></li>

				<li><a href="${baseUrl}/regenerateDNO"> <i class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">REGENERATE DNO</span>
				</a></li>

			</ul></li>


		<!-- Account Management -->
		<li class="nav-item"><a class="nav-link collapsed"
			href="#account-section" data-toggle="collapse">
				<div class="d-flex">
					<i class="bi bi-wallet2 text-white"></i> <span
						style="font-family: 'Poppins', sans-serif">ACCOUNT
						MANAGEMENT</span>
				</div> <i class="bi bi-chevron-down"></i>
		</a>

			<ul id="account-section" class="nav-content collapse">
				<li><a href="${baseUrl}/ledgerAccountMaster"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">LEDGER
							ACCOUNT MASTER</span>
				</a></li>

				<li><a href="${baseUrl}/outgoingPaymentEntry"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">OUTGOING
							PAYMENT ENTRY</span>
				</a></li>

				<li><a href="${baseUrl}/incomingReceiptEntry"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">INCOMING
							RECEIPT ENTRY</span>
				</a></li>

				<li><a href="${baseUrl}/bankCashTransferEntry"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">BANK/CASH
							TRANSFER ENTRY</span>
				</a></li>

				<li><a href="${baseUrl}/manualJournalEntry"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">MANUAL
							JOURNAL ENTRY</span>
				</a></li>

				<li><a href="${baseUrl}/incentivePayment"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">INCENTIVE
							PAYMENT</span>
				</a></li>

				<%-- <li><a href="${baseUrl}/misInterestPaymentAccountSection"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">MIS INTEREST
							PAYMENT</span>
				</a></li> --%>

				<li><a href="${baseUrl}/chequeClearingProcessing"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">CHEQUE CLEARANCE
							PROCESSING</span>
				</a></li>

				<%-- <li><a href="${baseUrl}/mandateDepositToBank"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">MANDATE
							DEPOSIT TO BANK</span>
				</a></li> --%>

				<li><a href="${baseUrl}/bankStatement"> <i class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">BANK STATEMENT</span>
				</a></li>

				<li><a href="${baseUrl}/cashBook"> <i class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">CASH BOOK</span>
				</a></li>

				<li><a href="${baseUrl}/fundstransferRegister"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">FUNDS TRANSFER
							REGISTER</span>
				</a></li>

				<li><a href="${baseUrl}/dailyTransactionBook"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">DAILY
							TRANSACTION BOOK</span>
				</a></li>

				<li><a href="${baseUrl}/ledgerSummaryReport"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">LEDGER
							SUMMARY REPORT</span>
				</a></li>

				<li><a href="${baseUrl}/journalEntryReport"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">JOURNAL
							ENTRY REPORT</span>
				</a></li>

				<li><a href="${baseUrl}/trailBalanceReport"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">TRIAL
							BALANCE REPORT</span>
				</a></li>

				<li><a href="${baseUrl}/pLStatement"> <i class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">P&L STATEMENT</span>
				</a></li>

				<li><a href="${baseUrl}/balanceSheet"> <i class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">BALANCE SHEET</span>
				</a></li>

				<li><a href="${baseUrl}/interbranchCashTransfer"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">INTER-BRANCH
							CASH TRANSFER</span>
				</a></li>

			</ul></li>


		<!--  Customer Savings -->
		<li class="nav-item"><a class="nav-link collapsed"
			href="#saving-account" data-toggle="collapse">
				<div class="d-flex">
					<i class="bi bi-bank text-white"></i> <span
						style="font-family: 'Poppins', sans-serif">SAVING / CURRENT
						ACCOUNT</span>
				</div> <i class="bi bi-chevron-down"></i>
		</a>

			<ul id="saving-account" class="nav-content collapse">

				<li><a href="${baseUrl}/createSavingsAccount"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">CREATE
							SAVINGS ACCOUNT</span>
				</a></li>

				<!-- <li>
            <a href="createCurrentAccount">
              <i class="bi bi-circle"></i>
              <span style="font-family: 'Poppins', sans-serif">Create Current Account</span>
            </a>
          </li> -->

				<li><a href="${baseUrl}/savingsAccountActivity"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">SAVINGS ACCOUNT
							ACTIVITY</span>
				</a></li>

				<li><a href="${baseUrl}/savingsAccountFundTransfer"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">SAVINGS ACCOUNT
							FUND TRANSFER</span>
				</a></li>

				<li><a href="${baseUrl}/savingAccountInterestTransfer"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">SAVINGS ACCOUNT
							INTEREST TRANSFER</span>
				</a></li>

				<li><a href="${baseUrl}/savingsRecordBook"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">SAVINGS
							RECORD BOOK</span>
				</a></li>

				<!-- <li>
            <a href="currentAccountRecordBook">
              <i class="bi bi-circle"></i>
              <span style="font-family: 'Poppins', sans-serif">Current Account Record Book</span>
            </a>
          </li> -->

				<li><a href="${baseUrl}/savingsAccountStatement"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">CUSTOMER SAVINGS
							STATEMENT</span>
				</a></li>

				<li><a href="${baseUrl}/savingsAccountCloser"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">SAVING
							ACCOUNT CLOSER</span>
				</a></li>

				<li><a href="${baseUrl}/savingsAccountInquiry"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">SAVINGS ACCOUNT
							INQUIRY</span>
				</a></li>

				<li><a href="${baseUrl}/smsServiceFee"> <i class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">SMS SERVICE FEE</span>
				</a></li>

				<!-- <li><a href="accountMaintenanceCharges"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">ACCOUNT
							M Charges</span>
				</a></li> -->

			</ul></li>


		<!-- Policy Management -->
		<li class="nav-item"><a class="nav-link collapsed"
			href="#investment-section" data-toggle="collapse">
				<div class="d-flex">
					<i class="bi bi-piggy-bank text-white"></i> <span
						style="font-family: 'Poppins', sans-serif">POLICY
						MANAGEMENT</span>
				</div> <i class="bi bi-chevron-down"></i>
		</a>

			<ul id="investment-section" class="nav-content collapse">
				<li><a href="${baseUrl}/planManagement"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">PLAN
							MANAGEMENT</span>
				</a></li>

				<li><a href="${baseUrl}/addNewInvestment"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">ADD NEW
							INVESTMENT</span>
				</a></li>

				<li><a href="${baseUrl}/policyRenewalFee"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">POLICY
							RENEWAL FEE</span>
				</a></li>

				<li><a href="${baseUrl}/dailyPremiumRenewal"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">DAILY
							PREMIUM RENEWAL</span>
				</a></li>

				<li><a href="${baseUrl}/flexiblePremiumRenewal"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">FLEXIBLE PREMIUM
							RENEWAL</span>
				</a></li>

				<li><a href="${baseUrl}/installmentRecordBook"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">INSTALLMENT
							RECORD BOOK</span>
				</a></li>

				<li><a href="${baseUrl}/InvestmentTransactionSlip"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">INVESTMENT
							TRANSACTION SLIP</span>
				</a></li>

				<li><a href="${baseUrl}/recurringPaymentReceipt"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">RECURRING
							PAYMENT RECEIPT</span>
				</a></li>

				<li><a href="${baseUrl}/issueCertificate"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">ISSUE
							CERTIFICATE</span>
				</a></li>

				<!-- <li><a href="reissueCertificate"> <i class="bi bi-circle"></i>
							<span style="font-family: 'Poppins', sans-serif">ReIssue
								Certificate</span>
					</a></li>

					<li><a href="interestDetails"> <i class="bi bi-circle"></i>
							<span style="font-family: 'Poppins', sans-serif">Interest
								Details</span>
					</a></li>

					<li><a href="interestPayable"> <i class="bi bi-circle"></i>
							<span style="font-family: 'Poppins', sans-serif">Interest
								Payable</span>
					</a></li> -->

				<li><a href="${baseUrl}/investmentDataSearch"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">SEARCH
							POLICY </span>
				</a></li>

			</ul></li>


		<!--  Loan Management -->
		<li class="nav-item"><a class="nav-link collapsed"
			href="#loan-section" data-toggle="collapse">
				<div class="d-flex">
					<i class="bi bi-cash-coin text-white"></i> <span
						style="font-family: 'Poppins', sans-serif">LOAN MANAGEMENT</span>
				</div> <i class="bi bi-chevron-down"></i>
		</a>

			<ul id="loan-section" class="nav-content collapse">
				<li><a href="${baseUrl}/loanSchemeCatalog"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">LOAN
							SCHEME CATALOG</span>
				</a></li>

				<li><a href="${baseUrl}/emiLoanCalculator"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">EMI & LOAN
							CALCULATOR</span>
				</a></li>

				<li><a href="${baseUrl}/newLoanApplication"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">NEW LOAN
							APPLICATION</span>
				</a></li>

				<li><a href="${baseUrl}/loanApprovalLoanManagement"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">LOAN APPROVAL</span>
				</a></li>

				<li><a href="${baseUrl}/loanPaymentLoanManagement"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">LOAN PAYMENT</span>
				</a></li>

				<li><a href="${baseUrl}/regularEmiRePaymentLoanManagement"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">REGULAR
							INSTALLMENT PAYMENT</span>
				</a></li>

				<li><a href="${baseUrl}/irrregularEmiRePaymentLoanManagement"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">IRREGULAR
							INSTALLMENT PAYMENT</span>
				</a></li>

				<li><a href="${baseUrl}/regularLoanStatementLoanManagement"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">REGULAR LOAN
							STATEMENT</span>
				</a></li>

				<li><a href="${baseUrl}/irregularLoanStatementLoanManagement"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">IRREGULAR LOAN
							STATEMENT</span>
				</a></li>

				<li><a href="${baseUrl}/loanDocumentPrintLoanManagement"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">GENERATE LOAN
							DOCUMENTS</span>
				</a></li>

				<li><a href="${baseUrl}/earlyLoanClosureLoan"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">EARLY LOAN
							CLOSURE</span>
				</a></li>

				<li><a href="${baseUrl}/LoanClosureLoan"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">LOAN
							CLOSURE</span>
				</a></li>

				<li><a href="${baseUrl}/settleLoanRecords"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">SETTLED
							LOAN RECORDS</span>
				</a></li>

				<li><a href="${baseUrl}/generateNOCCertificateLoanManagement"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">GENERATE NOC
							CERTIFICATE</span>
				</a></li>

				<li><a href="${baseUrl}/searchLoanAccounts"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">SEARCH
							LOAN ACCOUNTS</span>
				</a></li>

			</ul></li>

		<!--  Secured Gold Loan  -->
		<li class="nav-item"><a class="nav-link collapsed"
			href="#Goldloan-section" data-toggle="collapse">
				<div class="d-flex">
					<i class="bi bi-coin text-white"></i> <span
						style="font-family: 'Poppins', sans-serif">SECURED GOLD
						LOAN</span>
				</div> <i class="bi bi-chevron-down"></i>
		</a>

			<ul id="Goldloan-section" class="nav-content collapse">

				<!-- <li><a href="goldSecurePlan"> <i class="bi bi-circle"></i>
							<span style="font-family: 'Poppins', sans-serif">Gold
								Secure Plan</span>
					</a></li> -->

				<li><a href="${baseUrl}/goldDirectory"> <i class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">GOLD DIRECTORY</span>
				</a></li>

				<li><a href="${baseUrl}/applyforGold"> <i class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">APPLY FOR GOLD</span>
				</a></li>

				<li><a href="${baseUrl}/goldLoanApproval"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">GOLD LOAN
							APPROVAL</span>
				</a></li>

				<li><a href="${baseUrl}/goldLoanPayment"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">GOLD LOAN
							PAYMENT</span>
				</a></li>

				<li><a href="${baseUrl}/emiInstallmentPayment"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">EMI INSTALLMENT
							PAYMENT</span>
				</a></li>

				<li><a href="${baseUrl}/goldLoanDocument"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">GOLD LOAN
							DOCUMENT</span>
				</a></li>





				<li><a href="${baseUrl}/goldLoanStatement"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">GOLD LOAN
							STATEMENT</span>
				</a></li>


				<li><a href="${baseUrl}/goldLoanClosure"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">GOLD LOAN
							CLOSURE</span>
				</a></li>




				<li><a href="${baseUrl}/printNOC"> <i class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">PRINT NOC</span>
				</a></li>

				<li><a href="${baseUrl}/GoldLoanSearch"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">SEARCH
							GOLD LOAN</span>
				</a></li>


			</ul></li>



		<!-- Joint Liability Loan -->
		<li class="nav-item"><a class="nav-link collapsed"
			href="#group-loan-section" data-toggle="collapse">
				<div class="d-flex">
					<i class="bi bi-person-bounding-box text-white"></i> <span
						style="font-family: 'Poppins', sans-serif">JOINT LIABILITY
						LOAN</span>
				</div> <i class="bi bi-chevron-down"></i>
		</a>

			<ul id="group-loan-section" class="nav-content collapse">
				<li><a href="${baseUrl}/createLendingGroup"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">CREATE
							LENDING GROUP</span>
				</a></li>

				<li><a href="${baseUrl}/groupDirectory"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">GROUP
							DIRECTORY</span>
				</a></li>

				<li><a href="${baseUrl}/applyForGroupLoan"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">APPLY FOR
							GROUP LOAN</span>
				</a></li>

				<li><a href="${baseUrl}/loanApproval"> <i class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">LOAN APPROVAL</span>
				</a></li>

				<li><a href="${baseUrl}/loanRepaymentPortal"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">GROUP LOAN
							PAYMENT </span>
				</a></li>

				<li><a href="${baseUrl}/installmentRepayment"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">INSTALLMENT
							RE-PAYMENT</span>
				</a></li>

				<li><a href="${baseUrl}/statementOfAccount"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">STATEMENT
							OF ACCOUNT</span>
				</a></li>

				<li><a href="${baseUrl}/earlyLoanClosure"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">EARLY LOAN
							CLOSURE</span>
				</a></li>

				<li><a href="${baseUrl}/completedLoansRecord"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">COMPLETED
							LOAN RECORD</span>
				</a></li>

				<li><a href="${baseUrl}/findLoanRecord"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">FIND LOAN
							RECORD</span>
				</a></li>

			</ul></li>


		<!-- Request Approvals -->
		<li class="nav-item"><a class="nav-link collapsed"
			href="#approval-section" data-toggle="collapse">
				<div class="d-flex">
					<i class="bi bi-check-circle text-white"></i> <span
						style="font-family: 'Poppins', sans-serif">REQUEST
						APPROVALS</span>
				</div> <i class="bi bi-chevron-down"></i>
		</a>

			<ul id="approval-section" class="nav-content collapse">
				<li><a href="${baseUrl}/approveNewCustomer"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">APPROVE
							CUSTOMER</span>
				</a></li>

				<li><a href="${baseUrl}/approveShare"> <i class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">APPROVE SHARE
							TRANSACTIONS</span>
				</a></li>

				<li><a href="${baseUrl}/approveFinance"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">APPROVE
							FINANCE ONBOARDING</span>
				</a></li>

				<li><a href="${baseUrl}/approvePolicy"> <i class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">APPROVE POLICY</span>
				</a></li>

				<li><a href="${baseUrl}/approveRD"> <i class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">APPROVE RD</span>
				</a></li>

				<li><a href="${baseUrl}/approveFD"> <i class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">APPROVE FD</span>
				</a></li>

				<li><a href="${baseUrl}/approveDD"> <i class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">APPROVE DD</span>
				</a></li>

				<!-- 			<li><a href="approveRecurring"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">APPROVE
							RECURRING DEPOSITS</span>
				</a></li> -->

				<li><a href="${baseUrl}/approveSaving"> <i class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">APPROVE SAVING
							TRANSACTIONS</span>
				</a></li>

				<li><a href="${baseUrl}/approveSavingAccount"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">APPROVE
							SAVINGS ACCOUNT TRANSFERS</span>
				</a></li>

				<li><a href="${baseUrl}/approveRegularEMI"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">APPROVE
							REGULAR EMI PAYMENTS</span>
				</a></li>

				<li><a href="${baseUrl}/approveIrregularEMI"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">APPROVE
							IRREGULAR EMI PAYMENTS</span>
				</a></li>

				<li><a href="${baseUrl}/approveManualPayment"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">APPROVE
							MANUAL PAYMENT ENTRIES</span>
				</a></li>

				<li><a href="${baseUrl}/approveMaturityApp"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">APPROVE
							MATURITY APPLICATIONS</span>
				</a></li>

				<!-- 				<li><a href="deleteMaturityApp"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">DELETE
							MATURITY APPLICATION REQUEST</span>
				</a></li> -->

				<li><a href="${baseUrl}/approveInterBranchCashTransfer"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">APPROVE
							INTER-BRANCH CASH TRANSFER</span>
				</a></li>

			</ul></li>


		<!--  Data Rectification -->
		<li class="nav-item"><a class="nav-link collapsed"
			href="#rectification-section" data-toggle="collapse">
				<div class="d-flex">
					<i class="bi bi-pencil-square text-white"></i> <span
						style="font-family: 'Poppins', sans-serif">DATA CORRECTION</span>
				</div> <i class="bi bi-chevron-down"></i>
		</a>

			<ul id="rectification-section" class="nav-content collapse">
				<li><a href="${baseUrl}/customerDataUpdate"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">CUSTOMER
							DATA UPDATE</span>
				</a></li>

				<li><a href="${baseUrl}/shareholdingAdjustment"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">SHAREHOLDING
							ADJUSTMENT</span>
				</a></li>

				<li><a href="${baseUrl}/financialEntryCorrection"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">FINANCIAL ENTRY
							CORRECTION</span>
				</a></li>

				<li><a href="${baseUrl}/policyDetailsUpdate"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">POLICY
							DETAILS UPDATE</span>
				</a></li>

				<li><a href="${baseUrl}/renewalDataCorrection"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">RENEWAL DATA
							CORRECTION</span>
				</a></li>

				<li><a href="${baseUrl}/dailyRenewalUpdate"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">DAILY
							RENEWAL UPDATE</span>
				</a></li>

				<li><a href="${baseUrl}/flexibleTransactionRemoval"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">FLEXIBLE
							TRANSACTION REMOVAL</span>
				</a></li>

				<li><a href="${baseUrl}/savingsAccountCorrection"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">SAVINGS ACCOUNT
							CORRECTION</span>
				</a></li>

				<li><a href="${baseUrl}/savingsTransactionRemoval"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">SAVINGS
							TRANSACTION REMOVAL</span>
				</a></li>

				<li><a href="${baseUrl}/loanAccountCorrection"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">LOAN ACCOUNT
							CORRECTION</span>
				</a></li>

				<li><a href="${baseUrl}/groupLoanDataUpdate"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">JOINT
							LIABILITY UPDATE</span>
				</a></li>

			</ul></li>


		<!-- Maturity Management -->
		<li class="nav-item"><a class="nav-link collapsed"
			href="#maturity-section" data-toggle="collapse">
				<div class="d-flex">
					<i class="bi bi-calendar-check text-white"></i> <span
						style="font-family: 'Poppins', sans-serif">MATURITY
						MANAGEMENT</span>
				</div> <i class="bi bi-chevron-down"></i>
		</a>

			<ul id="maturity-section" class="nav-content collapse">
				<li><a href="${baseUrl}/maturitySchemeMaster"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">MATURITY
							SCHEME MASTER</span>
				</a></li>

				<li><a href="${baseUrl}/applyForMaturity"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">APPLY FOR
							MATURITY</span>
				</a></li>

				<li><a href="${baseUrl}/maturityApplicationStatus"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">MATURITY
							APPLICATION STATUS</span>
				</a></li>

				<li><a href="${baseUrl}/fullMaturityPayment"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">FULL
							MATURITY PAYMENT</span>
				</a></li>

				<li><a href="${baseUrl}/fullPaymentStatus"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">FULL
							PAYMENT STATUS</span>
				</a></li>


				<li><a href="${baseUrl}/partialMaturityPayment"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">PARTIAL MATURITY
							PAYMENT</span>
				</a></li>

				<li><a href="${baseUrl}/partialPaymentStatusMaturityApplication"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">PARTIL PAYMENT
							STATUS</span>
				</a></li>


				<li><a href="${baseUrl}/approvedStatusMaturityManagement"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">APPROVED STATUS</span>
				</a></li>


			</ul></li>


		<!--  Incentive Management -->
		<li class="nav-item"><a class="nav-link collapsed"
			href="#incentive-section" data-toggle="collapse">
				<div class="d-flex">
					<i class="bi bi-award text-white"></i> <span
						style="font-family: 'Poppins', sans-serif">INCENTIVE
						MANAGEMENT</span>
				</div> <i class="bi bi-chevron-down"></i>
		</a>

			<ul id="incentive-section" class="nav-content collapse">
				<li><a href="${baseUrl}/incentiveSchemeMaster"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">INCENTIVE SCHEME
							MASTER</span>
				</a></li>

				<li><a href="${baseUrl}/generateIncentivePayments"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">GENERATE
							INCENTIVE PAYMENTS</span>
				</a></li>

				<li><a href="${baseUrl}/incentivePaymentDetails"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">INCENTIVE
							PAYMENT DETAILS</span>
				</a></li>

				<li><a href="${baseUrl}/incentiveSummaryReport"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">INCENTIVE
							SUMMARY REPORT</span>
				</a></li>

			</ul></li>


		<!-- Financial Consultant -->
		<li class="nav-item"><a class="nav-link collapsed"
			href="#collector-advisor" data-toggle="collapse">
				<div class="d-flex">
					<i class="bi bi-briefcase text-white"></i> <span
						style="font-family: 'Poppins', sans-serif">FINANCIAL
						CONSULTANT</span>
				</div> <i class="bi bi-chevron-down"></i>
		</a>

			<ul id="collector-advisor" class="nav-content collapse">
				<li><a href="${baseUrl}/addFinancialConsultant"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">ADD FINANCIAL
							CONSULTANT</span>
				</a></li>

				<li><a href="${baseUrl}/financialConsultantHierarchy"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">FINANCIAL
							CONSULTANT HIERARCHY</span>
				</a></li>

				<li><a href="${baseUrl}/consultantDownlineView"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">CONSULTANT
							DOWNLINE VIEW</span>
				</a></li>

				<li><a href="${baseUrl}/consultantPromotionManagement"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">CONSULTANT
							PROMOTION MANAGEMENT</span>
				</a></li>

				<li><a href="${baseUrl}/consultantIDCardGenerator"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">CONSULTANT ID
							CARD GENERATOR</span>
				</a></li>

			</ul></li>


		<!-- Team Management -->
		<li class="nav-item"><a class="nav-link collapsed"
			href="#employee-section" data-toggle="collapse">
				<div class="d-flex">
					<i class="bi bi-person-workspace text-white"></i> <span
						style="font-family: 'Poppins', sans-serif">TEAM MANAGEMENT</span>
				</div> <i class="bi bi-chevron-down"></i>
		</a>

			<ul id="employee-section" class="nav-content collapse">
				<li><a href="${baseUrl}/manageDesignations"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">MANAGE
							DESIGNATIONS</span>
				</a></li>

				<li><a href="${baseUrl}/manageDepartments"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">MANAGE
							DEPARTMENTS</span>
				</a></li>

				<li><a href="${baseUrl}/addTeamMember"> <i class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">ADD TEAM MEMBER</span>
				</a></li>

				<li><a href="${baseUrl}/generateTeamMemberIDCard"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">GENERATE TEAM
							MEMBER ID CARD</span>
				</a></li>

				<li><a href="${baseUrl}/searchTeamMember"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">SEARCH
							TEAM MEMBER</span>
				</a></li>

			</ul></li>


		<!--  Reports & Analytics -->
		<li class="nav-item"><a class="nav-link collapsed"
			href="#report-section" data-toggle="collapse">
				<div class="d-flex">
					<i class="bi bi-file-earmark-text text-white"></i> <span
						style="font-family: 'Poppins', sans-serif">REPORTS &
						ANALYTICS</span>
				</div> <i class="bi bi-chevron-down"></i>
		</a>

			<ul id="report-section" class="nav-content collapse">
				<li><a href="${baseUrl}/investmentTransactionReport"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">INVESTMENT
							TRANSACTION REPORT</span>
				</a></li>

				<!-- 					<li><a href="investmentSummaryStatement"> <i
							class="bi bi-circle"></i> <span
							style="font-family: 'Poppins', sans-serif">Investment
								Summary Statement</span>
					</a></li> -->

				<li><a href="${baseUrl}/financialAdvisorReport"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">FINANCIAL
							CONSULTANT REPORT</span>
				</a></li>

				<!-- 	<li><a href="financialConsultantTeamCollectionReport"> <i
							class="bi bi-circle"></i> <span
							style="font-family: 'Poppins', sans-serif">Financial
								Consultant Team Collection Summary</span>
					</a></li> -->

				<li><a href="${baseUrl}/chequeTransactionReport"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">CHEQUE
							TRANSACTION REPORT</span>
				</a></li>

				<li><a href="${baseUrl}/incentivePaymentSummary"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">INCENTIVE
							PAYMENT SUMMARY</span>
				</a></li>

				<li><a href="${baseUrl}/recurringInstallmentDueReport"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">RECURRING
							INSTALLMENT DUE REPORT</span>
				</a></li>

				<!-- <li><a href="unApprovedLoanApplications"> <i
							class="bi bi-circle"></i> <span
							style="font-family: 'Poppins', sans-serif">Unapproved Loan
								Applications</span>
					</a></li> -->

				<li><a href="${baseUrl}/approvedLoanReport"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif"> LOAN
							REPORT</span>
				</a></li>

				<li><a href="${baseUrl}/loanRePaymentReport"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">LOAN
							PAYMENT REPORT</span>
				</a></li>

				<li><a href="${baseUrl}/upcomingEMIDueReport"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">UPCOMING
							EMI DUE REPORT</span>
				</a></li>

				<li><a href="${baseUrl}/overdueRepaymentAnalysis"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">OVERDUE
							REPAYMENT ANALYSIS</span>
				</a></li>

				<li><a href="${baseUrl}/loanInstallmentPendingReport"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">LOAN INSTALLMENT
							PENDING REPORT</span>
				</a></li>

				<!-- <li><a href="emiCollectionSummary"> <i
							class="bi bi-circle"></i> <span
							style="font-family: 'Poppins', sans-serif">EMI Collection
								Summary</span>
					</a></li> -->

				<!-- <li><a href="emiIrregularityStatement"> <i
							class="bi bi-circle"></i> <span
							style="font-family: 'Poppins', sans-serif">EMI
								Irregularity Statement</span>
					</a></li> -->

				<li><a href="${baseUrl}/loanConfirmationDocument"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">LOAN
							CONFIRMATION DOCUMENT</span>
				</a></li>

				<li><a href="${baseUrl}/loanConfirmationDocument"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">GOLD LOAN
							DOCUMENT</span>
				</a></li>

				<li><a href="${baseUrl}/loanConfirmationDocument"> <i
						class="bi bi-circle"></i> <span
						style="font-family: 'Poppins', sans-serif">JOINT LIABILITY
							DOCUMENT</span>
				</a></li>

				<li><a href="${baseUrl}/maturityStatusReport"> <i class="bi bi-circle"></i>
						<span style="font-family: 'Poppins', sans-serif">MATURITY
							STATUS REPORT</span>
				</a></li>

				<!-- <li><a href="investmentProjectionReport"> <i
							class="bi bi-circle"></i> <span
							style="font-family: 'Poppins', sans-serif">Investment
								Projection Report</span>
					</a></li> -->

				<!-- <li><a href="maturityObligationReport"> <i
							class="bi bi-circle"></i> <span
							style="font-family: 'Poppins', sans-serif">Maturity
								Obligation Report</span>
					</a></li> -->

				<!-- <li><a href="taxDeductedAtSourceSummary"> <i
							class="bi bi-circle"></i> <span
							style="font-family: 'Poppins', sans-serif">Tax Deducted at
								Source Summary</span>
					</a></li> -->

				<!-- <li><a href="policyPerformanceReport"> <i
							class="bi bi-circle"></i> <span
							style="font-family: 'Poppins', sans-serif">Policy
								Performance Report</span>
					</a></li> -->

			</ul></li>

		<!-- <li class="nav-item">
        <p class="text-white">Developed by Infosai Software</p>
      </li> -->
	</ul>
</aside>