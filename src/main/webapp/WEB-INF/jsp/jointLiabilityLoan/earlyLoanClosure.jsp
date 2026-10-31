<div class="pagetitle">
	<h1>JOINT LIABILITY LOAN</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-person-bounding-box"></i>
			</a></li>
			<li class="breadcrumb-item action">EARLY LOAN CLOSURE</li>
		</ol>
	</nav>
</div>

<div>
	<form id="closureForm">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">LOAN PRE SETTLEMENT</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="groupCode">SELECT GROUP ID*</label>
						<select id="groupCode" name="groupCode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT GROUP ID</option>
						</select>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-4">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">LOAN DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="loanStartDate">LOAN START DATE*</label>
						<input type="date" name="loanStartDate" id="loanStartDate" readonly="readonly"
							style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="loanScheme">LOAN SCHEMES*</label>
						<input type="text" name="loanScheme" id="loanScheme" readonly="readonly"
							placeholder="ENTER LOAN SCHEMES" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="interestType">INTEREST RATE TYPE*</label>
						<input type="text" name="interestType" id="interestType" readonly="readonly"
							placeholder="ENTER INTEREST RATE TYPE" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="agentCodeAndName">AGENT CODE &amp; NAME*</label>
						<input type="text" name="agentCodeAndName" id="agentCodeAndName" readonly="readonly"
							placeholder="AGENT CODE AND NAME" style="text-transform: uppercase;" />
						<input type="hidden" name="agentCode" id="agentCode" />
						<input type="hidden" name="agentName" id="agentName" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="loanTenure">LOAN TENURE*</label>
						<input type="text" name="loanTenure" id="loanTenure" readonly="readonly"
							placeholder="ENTER LOAN TENURE" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="monthlyInstallment">MONTHLY INSTALLMENT*</label>
						<input type="text" name="monthlyInstallment" id="monthlyInstallment" readonly="readonly"
							placeholder="ENTER MONTHLY INSTALLMENT" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="nomineeDetails">NOMINEE / LEADER DETAILS*</label>
						<input type="text" name="nomineeDetails" id="nomineeDetails" readonly="readonly"
							placeholder="ENTER DETAILS" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="interestAmount">INTEREST AMOUNT*</label>
						<input type="text" name="interestAmount" id="interestAmount" readonly="readonly"
							placeholder="ENTER INTEREST AMOUNT" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="contactNo">CONTACT NO*</label>
						<input type="text" name="contactNo" id="contactNo" readonly="readonly"
							placeholder="ENTER CONTACT NO" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="principalAmount">PRINCIPAL AMOUNT*</label>
						<input type="text" name="principalAmount" id="principalAmount" readonly="readonly"
							placeholder="ENTER PRINCIPAL AMOUNT" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="totalLoanPrincipal">TOTAL LOAN PRINCIPAL*</label>
						<input type="text" name="totalLoanPrincipal" id="totalLoanPrincipal" readonly="readonly"
							placeholder="ENTER TOTAL LOAN PRINCIPAL" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="loanBranch">LOAN BRANCH*</label>
						<input type="text" name="loanBranch" id="loanBranch" readonly="readonly"
							placeholder="ENTER BRANCH" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="rateOfInterest">RATE OF INTEREST (%)*</label>
						<input type="text" name="rateOfInterest" id="rateOfInterest" readonly="readonly"
							placeholder="ENTER RATE OF INTEREST" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="totalPayableAmount">TOTAL PAYABLE AMOUNT*</label>
						<input type="text" name="totalPayableAmount" id="totalPayableAmount" readonly="readonly"
							placeholder="ENTER TOTAL PAYABLE AMOUNT" style="text-transform: uppercase;" />
					</div>
				</div>
			</div>
		</div>

		<div class="mt-4">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">PAYMENT DETAILS &amp; SETTLEMENT</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="settledInterest">SETTLED INTEREST*</label>
						<input type="text" name="settledInterest" id="settledInterest" readonly="readonly"
							placeholder="SETTLED INTEREST" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="interestPending">INTEREST PENDING*</label>
						<input type="text" name="interestPending" id="interestPending" readonly="readonly"
							placeholder="INTEREST PENDING" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="settledPrincipal">SETTLED PRINCIPAL*</label>
						<input type="text" name="settledPrincipal" id="settledPrincipal" readonly="readonly"
							placeholder="SETTLED PRINCIPAL" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="outstandingPrincipal">OUTSTANDING PRINCIPAL*</label>
						<input type="text" name="outstandingPrincipal" id="outstandingPrincipal" readonly="readonly"
							placeholder="OUTSTANDING PRINCIPAL" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="totalAmountPaid">TOTAL AMOUNT PAID*</label>
						<input type="text" name="totalAmountPaid" id="totalAmountPaid" readonly="readonly"
							placeholder="TOTAL AMOUNT PAID" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="totalOutstanding">TOTAL OUTSTANDING*</label>
						<input type="text" name="totalOutstanding" id="totalOutstanding" readonly="readonly"
							placeholder="TOTAL OUTSTANDING" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="loanRemark">LOAN REMARK*</label>
						<input type="text" name="loanRemark" id="loanRemark" required="required"
							placeholder="ENTER REMARK" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="paymentBranch">PAYMENT BRANCH*</label>
						<select id="paymentBranch" name="paymentBranch" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT BRANCH</option>
						</select>
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="paymentDate">DATE OF PAYMENT*</label>
						<input type="date" name="paymentDate" id="paymentDate" required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="paidBy">PAID BY*</label>
						<select id="paidBy" name="paidBy" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="CASH">CASH</option>
							<option value="ONLINE">ONLINE</option>
							<option value="CHEQUE">CHEQUE</option>
							<option value="NEFT">NEFT</option>
							<option value="SAVINGS ACCOUNT">SAVINGS ACCOUNT</option>
						</select>
					</div>
				</div>
				<div class="col-lg-3 mb-4" id="displaySavingsAccount" style="display: none;">
					<div class="d-flex flex-column formFields">
						<label for="accountNo">SAVINGS ACCOUNT NO*</label>
						<input type="text" name="accountNo" id="accountNo"
							placeholder="ENTER SAVINGS ACCOUNT NO" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="loanClosureFee">LOAN CLOSURE FEE*</label>
						<input type="number" step="0.01" name="loanClosureFee" id="loanClosureFee"
							value="0.00" required="required" placeholder="ENTER CLOSURE FEE"
							style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="netClosurePayable">NET CLOSURE PAYABLE*</label>
						<input type="text" name="netClosurePayable" id="netClosurePayable" readonly="readonly"
							placeholder="NET CLOSURE AMOUNT" style="text-transform: uppercase; font-weight: bold; color: #28a745;" />
					</div>
				</div>
			</div>
			<div class="row mt-3">
				<div class="col-12 text-end">
					<button type="button" id="resetBtn" class="btn btn-secondary me-2">RESET</button>
					<button type="button" id="saveBtn" class="btnStyle bg-success me-2">CLOSE LOAN</button>
					<button type="button" id="printNocBtn" class="btn btn-primary" style="display: none;">
						<i class="bi bi-printer"></i> PRINT NOC / CLEARANCE
					</button>
				</div>
			</div>
		</div>
	</form>

	<!-- Printable NOC Area -->
	<div id="printableNocArea" style="display: none;">
		<div style="padding:35px; font-family:'Times New Roman', serif; border:2px solid #111; background:#fff; line-height:1.7;">
			<!-- Dynamic Letterhead -->
			<div style="text-align:center; border-bottom:2px solid #0d6efd; padding-bottom:12px; margin-bottom:20px;">
				<h2 id="nocCompanyName" style="margin:0; font-size:22px; font-weight:bold; color:#0d6efd; letter-spacing:0.5px; text-transform:uppercase;"></h2>
				<p id="nocCompanyAddress" style="margin:4px 0 2px 0; font-size:12px; color:#444; text-transform:uppercase;"></p>
				<p id="nocCompanyReg" style="margin:2px 0; font-size:11px; color:#555; text-transform:uppercase;"></p>
				<p id="nocCompanyContact" style="margin:2px 0; font-size:11px; color:#555; text-transform:uppercase;"></p>
				<h4 id="nocBranch" style="margin:6px 0 0 0; font-size:13px; font-weight:600; color:#333; text-transform:uppercase;"></h4>
			</div>

			<h3 style="text-align:center; margin:18px 0; text-decoration:underline; font-size:18px; font-weight:bold; letter-spacing:0.5px; text-transform:uppercase;">NO OBJECTION CERTIFICATE (NOC) / LOAN CLEARANCE</h3>

			<div style="display:flex; justify-content:space-between; margin-bottom:15px; font-size:13px;">
				<div><b>REF NO:</b> <span id="nocRefNo"></span></div>
				<div><b>DATE:</b> <span id="nocDate"></span></div>
			</div>

			<p style="font-size:14px; text-transform:uppercase;">TO,<br>
			   <b><span id="nocBorrowerName"></span></b><br>
			   COMMUNITY / GROUP: <b><span id="nocGroupName"></span></b><br>
			   CONTACT NUMBER: <b><span id="nocContact"></span></b>
			</p>

			<p style="font-size:14px; margin-top:15px; text-transform:uppercase;"><b>SUBJECT: NO OBJECTION CERTIFICATE &amp; FULL SETTLEMENT OF JOINT LIABILITY GROUP LOAN</b></p>

			<p style="font-size:13.5px; text-align:justify; text-transform:uppercase;">DEAR MEMBERS / COMMUNITY LEADER,</p>

			<p style="font-size:13.5px; text-align:justify; text-transform:uppercase;">THIS IS TO CERTIFY THAT THE JOINT LIABILITY GROUP (JLG) WITH GROUP ID 
			<b><span id="nocGroupIdText"></span></b> AVAILED A GROUP LOAN FACILITY FROM 
			<b><span id="nocCompanyBodyName"></span></b> UNDER LOAN SCHEME <b><span id="nocSchemeText"></span></b>, 
			COMMENCED ON <b><span id="nocStartDateText"></span></b> FOR A PRINCIPAL SANCTIONED AMOUNT OF <b>&#8377; <span id="nocPrincipalText"></span></b>.
			</p>

			<p style="font-size:13.5px; text-align:justify; text-transform:uppercase;">THE GROUP HAS SATISFACTORILY REPAID THE ENTIRE OUTSTANDING LOAN BALANCE ALONG WITH ALL APPLICABLE INTEREST AND CHARGES IN FULL AS PER THE CLOSURE SETTLEMENT. 
			ACCORDINGLY, THE AFORESAID JOINT LIABILITY GROUP LOAN ACCOUNT STANDS <b>SUCCESSFULLY CLOSED &amp; SETTLED</b> ON <b><span id="nocClosedDateText"></span></b>. 
			AS ON DATE, THERE ARE <b>NIL OUTSTANDING DUES</b> PAYABLE TOWARDS THE SAID LOAN ACCOUNT IN THE RECORDS OF <b><span id="nocCompanyBodyName2"></span></b>.
			</p>

			<p style="font-size:13.5px; text-align:justify; text-transform:uppercase;">
			WE HEREBY ISSUE THIS <b>NO OBJECTION CERTIFICATE (NOC)</b> CONFIRMING THAT 
			<b><span id="nocBorrowerName2"></span></b> AND ALL ASSOCIATED GROUP MEMBERS ARE FULLY RELEASED AND DISCHARGED FROM ALL LIABILITIES 
			PERTAINING TO THIS JOINT LIABILITY LOAN.
			</p>

			<p style="margin-top:20px; font-size:13px; text-transform:uppercase;">
			THANK YOU FOR BANKING WITH US. WE APPRECIATE YOUR ASSOCIATION WITH <b><span id="nocCompanyBodyName3"></span></b>.
			</p>

			<table style="width:100%; margin-top:50px; border:none;">
				<tr>
					<td style="width:50%; text-align:left; vertical-align:bottom; border:none; font-size:13px; text-transform:uppercase;">
						____________________________<br>
						<b>GROUP LEADER / BORROWER SIGNATURE</b><br>
						<small>(ACCEPTED &amp; ACKNOWLEDGED)</small>
					</td>
					<td style="width:50%; text-align:right; vertical-align:bottom; border:none; font-size:13px; text-transform:uppercase;">
						FOR <b><span id="nocCompanyBodyName4"></span></b><br><br><br>
						____________________________<br>
						<b>AUTHORIZED SIGNATORY &amp; BANK SEAL</b>
					</td>
				</tr>
			</table>
		</div>
	</div>
</div>

<script src="${pageContext.request.contextPath}/js/Joinlibiliy/earlyLoanClosure.js"></script>
