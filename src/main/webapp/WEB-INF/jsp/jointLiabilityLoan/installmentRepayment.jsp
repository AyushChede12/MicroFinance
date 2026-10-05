
<div class="pagetitle">
	<h1>JOINT LIABILITY LOAN</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-person-bounding-box"></i></a></li>
			<li class="breadcrumb-item action">INSTALLMENT RE-PAYMENT</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">LOAN INFO</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">

					<div class="d-flex flex-column formFields">
						<label for="groupCodeid">FIND BY GROUP *</label> <select
							id=groupid name="groupid" required
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT CUSTOMER NAME </option>
						</select>
					</div>

				</div>

			</div>
		</div>

		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">LOAN DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="openingDate">LOAN OPENING DATE</label> <input
							type="text" name="" id="loanDate" required
							placeholder="ENTER LOAN OPENING DATE" />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="communityName">COMMUNITY NAME*</label> <input
							type="text" name="communityName" id="communityName" required
							placeholder="ENTER COMMUNITY NAME" />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="paymentMode">GROUP LEADER*</label> <input type="text"
							name="communityLeader" id="communityLeader"
							placeholder="ENTER GROUP LEADER NAME " />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="branchName">BRANCH NAME*</label> <input type="text"
							name="branchName" id="branchName" required
							placeholder="ENTER BRANCH NAME" />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="loanSchemeName">LOAN SCHEME NAME *</label> <input
							type="text" name="loanSchemeName" id="loanSchemeName" required
							placeholder="ENTER LOAN SCHEME NAME" />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="communityAddress">COMMUNITY ADDRESS*</label> <input
							type="text" name="communityAddress" id="communityAddress"
							required placeholder="ENTER COMMUNITY ADDRESS" />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="contactNumber">CONTACT NUMBER*</label> <input
							type="text" name="contactNumber" id="contactNumber" required
							placeholder="ENTER CONTACT NUMBER" />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="term">TERM*</label> <input type="text" name="term"
							id="term" required placeholder="ENTER LOAN TERM" />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="rateOfInterest">RATE OF INTEREST(%) *</label> <input
							type="text" name="rateOfInterest" id="rateOfInterest" required
							placeholder="ENTER RATE OF INTEREST (%)" />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="interestType">INTEREST TYPE*</label> <input
							type="text" name="interestType" id="interestType" required
							placeholder="ENTER INTEREST TYPE" />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="loanAmount">LOAN AMOUNT *</label> <input type="text"
							name="loanAmount" id="loanAmount" required
							placeholder="ENTER LOAN AMOUNT" />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="emiAmount">EMI AMOUNT*</label> <input type="text"
							name="loanEmi" id="loanEmi" required
							placeholder="ENTER EMI AMOUNT" />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="emiAmount">TOTAL INTERET *</label> <input type="text"
							name="loanEmi" id="" required placeholder="ENTER TOTAL INTEREST " />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="emiAmount">TOTAL PAYABLE</label> <input type="text"
							name="totalPayable" id="totalPayable" required
							placeholder="ENTER TOTAL PAYABLE AMOUNT " />
					</div>
				</div>

			</div>
		</div>

		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">PAYMENT DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="valuationCharges">AMOUNT DUE*</label> <input
							type="text" name="valuationCharges" id="valuationCharges"
							required />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="valuationCharges">NO OF INSTALLMENT *</label> <input
							type="text" name="valuationCharges" id="valuationCharges"
							required />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="paymentRemarks">PAYMENT REMARKS*</label> <input
							type="text" name="paymentRemarks" id="paymentRemarks" required />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="transactionDate">TRANSACTION DATE </label> <input
							type="date" name="transactionDate" id="transactionDate" required />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="paymentStatus">PAYMENT STATUS*</label> <input
							type="text" name="paymentStatus" id="paymentStatus" required />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="referenceCode">MODE OF PAYMENT <span id="star">*</span></label>
						<select id="paymentMode" name="paymentMode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">ENTER MODE OF PAYMENT</option>
							<option value="Cash">CASH</option>
							<option value="Online">ONLINE</option>
							<option value="Cheque">CHEQUE</option>
							<option value="NEFT">NEFT</option>


						</select>
					</div>
				</div>


				<div class="col-lg-3" id="displayCheque">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>CHEQUE NUMBER <span id="star">*</span></label> <input
							type="text" name="chequeNo" id="chequeNo" required="required"
							placeholder="ENTER INTEREST NUMBER" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3" id="displaycheqdate">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>CHEQUE DATE <span id="star">*</span></label> <input
							type="date" name="chequeDate" id="chequeDate" required="required"
							placeholder="ENTER CHEQUE DATE"
							style="text-transform: uppercase;" />
					</div>
				</div>


				<div class="col-lg-3" id="displaydeposit">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>DEPOSITE ACCOUNT <span id="star">*</span></label> <input
							type="text" name="accountNo" id="accountNo" required="required"
							placeholder="ENTER DEPOSIT ACCOUNT "
							style="text-transform: uppercase;" />
					</div>
				</div>
				<input type="hidden" id="noOfInst" name="noOfInst">

				<div class="col-lg-3" id="displayRef">
					<div class="d-flex flex-column formFields">
						<label for="">REF NUMBER/UPI ID</label> <input type="text"
							name="ref_UpiId" id="ref_UpiId" required="required"
							placeholder="ENTER DEPOSITE ACCOUNT"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CHRG. DEDUCT CASH</label> <select id="charges"
							name=charges required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT YES/NO</option>
							<option value="YES">YES</option>
							<option value="NO">NO</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="financialConsultantCode">FINANCIAL CONSULTANT
							CODE*</label> <input id="financialConsultantId"
							name="financialConsultantId" required
							class="form-control selectField" style="height: 30px;"
							placeholder="FINANCIAL CONSULTANT ID" />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="financialConsultantName">FINANCIAL CONSULTANT
							NAME*</label> <input type="text" name="financialConsultantName"
							id="financialConsultantName" required
							placeholder="FINANCIAL CONSULTANT NAME" />
					</div>
				</div>


			</div>
			<div class="row">
				<div class="col-12 text-center">
					<button id="saveBtn" class="btnStyle bg-success"
						style="margin-left: 80%">SAVE</button>
				</div>
			</div>
		</div>
	</form>
</div>

<script
	src="${pageContext.request.contextPath}/js/Joinlibiliy/LoanRepayment.js"></script>

