
<div class="pagetitle">
	<h1>LOAN MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-cash-coin"></i>
			</a></li>
			<li class="breadcrumb-item action">LOAN CLOSURE</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div class="">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">FIND BY LOAN ID</label> <select
							id="earlyLoanclosureId" name="earlyLoanclosureId"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT LOAN ID</option>

						</select>
					</div>
				</div>



			</div>


		</div>
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">LOAN DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">DATE OF LOAN</label> <input type="date"
							name="dateofLoan" id="dateofLoan" required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">ID & NAME</label> <input type="text"
							name="memberId" id="memberId" required="required"
							placeholder="ENTER ID & NAME" style="text-transform: uppercase;" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">FAMILY MEMBER NAME</label> <input
							type="text" name="relativeDetails" id="relativeDetails"
							required="required" placeholder=" ENTER FAMILY MEMBER NAME
"
							style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">CONTACT NO.</label> <input type="text"
							name="contactNo" id="contactNo" required="required"
							placeholder="ENTER CONTACT NO."
							style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">BRANCH ADDRESS</label> <input type="text"
							name="branchName" id="branchName" required="required"
							placeholder="ENTER BRANCH ADDRESS"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN PLAN NAME</label> <input type="text"
							name="loanPlanName" id="loanPlanName" required="required"
							placeholder="ENTER LOAN PLAN NAME" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN TERM</label> <input type="text" name="loanTerm"
							id="loanTerm" required="required" placeholder="ENTER LOAN TERM" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN MODE</label> <input type="text" name="loanMode"
							id="loanMode" required="required"
							placeholder="ENTER LOAN MODE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">AMOUNT OF LOAN</label> <input type="text"
							name="loanAmount" id="loanAmount" required="required"
							placeholder="ENTER AMOUNT OF LOAN" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">RATE OF INTEREST(%) </label> <input
							type="text" name="rateOfInterest" id="rateOfInterest"
							required="required" placeholder="ENTER ROI OF LOAN"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">INTEREST TYPE</label> <input type="text"
							name="interestType" id="interestType" required="required"
							placeholder="Enter Interest Type"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">EMI PAYMENT</label> <input type="text"
							name="emiPayment" id="emiPayment" required="required"
							placeholder="Enter EMI PAYMENT" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">TOTAL INTEREST OF LOAN</label> <input
							type="text" name="totalinterestofLoan" id="totalinterestofLoan"
							required="required" placeholder="ENTER TOTAL INTEREST OF LOAN"
							style="text-transform: uppercase;" />
					</div>
				</div>
				<input type="hidden" id="memberName" name="memberName">

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">SANCTIONED AMOUNT</label> <input type="text"
							name="sanctionedAmount" id="sanctionedAmount" required="required"
							placeholder="ENTER SANCTIONED AMOUNT"
							style="text-transform: uppercase;" />
					</div>
				</div>
				
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">TOTAL PAYABLE OF LOAN</label> <input type="text"
							name="totalPayableofLoan" id="totalPayableofLoan"
							required="required" placeholder="ENTER TOTAL PAYABLE OF LOAN"
							style="text-transform: uppercase;" />
					</div>
				</div>


			</div>

		</div>
	</form>
</div>


<div class="mt-5">
	<nav>
		<ol class="breadcrumb breadcrumb-title">
			<li class="breadcrumb-item action">PAYMENT DETAILS</li>
		</ol>
	</nav>
	<div class="row">
		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="">NO OF INST PAID</label><input type="text"
					name="noOfInst" id="noOfInst" required="required"
					placeholder="ENTER INTEREST DUE" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="">INTEREST DUE</label> <input type="text"
					name="interestDue" id="interestDue" required="required"
					placeholder="ENTER INTEREST DUE" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="">PRINCIPAL DUE</label> <input type="text"
					name="principaldue" id="principaldue" required="required"
					placeholder="ENTER TOTAL PRINCIPAL DUE" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="">AMOUNT PAID TILL DATE</label> <input type="text"
					name="amountPaid" id="amountPaid" required="required"
					placeholder="ENTER TOTAL PAID AMOUNT" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="">LOAN BALANCE AMOUNT</label> <input type="text"
					name="balanceLoanAmount" id="balanceLoanAmount" required="required"
					placeholder="ENTER LOAN BALANCE AMOUNT" />
			</div>
		</div>


		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="">DUE DATE</label> <input type="date" name="dueDate"
					id="dueDate" required="required" placeholder="" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="">PAYMENT BRANCH</label> <input type="text"
					name="paymentBranch" id="paymentBranch" required="required"
					placeholder="" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="">PAYMENT DATE</label> <input type="date"
					name="paymentDate" id="paymentDate" placeholder="" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="">DEDUCT FINE</label> <select id="deductfine"
					name="deductfine" required="required"
					class="form-control selectField" style="height: 30px;">
					<option value="">NO</option>
					<option value="Blue">YES</option>
				</select>
			</div>
		</div>
		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="">DEDUCT FINE AMOUNT</label> <input type="text"
					name="deeductfienamount" id="deeductfienamount" required="required"
					Value="0" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="">PAYMENT AMOUNT</label> <input type="text"
					name="paymentamount" id="paymentamount" required="required"
					placeholder="ENTER PAYMENT AMOUNT" />
			</div>
		</div>
		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="">NET AMOUNT</label> <input type="text" name="netamount"
					id="netamount" required="required"
					placeholder="ENTER NET AMOUNT" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="referenceCode">MODE OF PAYMENT<span id="star">*</span></label>
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
					placeholder="ENTER CHEQUE NO" style="text-transform: uppercase;" />
			</div>
		</div>

		<div class="col-lg-3" id="displaycheqdate">
			<div class="d-flex flex-column formFields"
				style="margin-bottom: 30px">
				<label>CHEQUE DATE <span id="star">*</span></label> <input
					type="date" name="chequeDate" id="chequeDate" required="required"
					placeholder="ENTER CHEQUE DATE" style="text-transform: uppercase;" />
			</div>
		</div>


		<div class="col-lg-3" id="displaydeposit">
			<div class="d-flex flex-column formFields"
				style="margin-bottom: 30px">
				<label>DEPOSIT ACCOUNT <span id="star">*</span></label> <input
					type="text" name="depositAccount" id="depositAccount"
					required="required" placeholder="ENTER DEPOSIT ACCOUNT"
					style="text-transform: uppercase;" />
			</div>
		</div>


		<div class="col-lg-3" id="displayRef">
			<div class="d-flex flex-column formFields">
				<label for="">REF NUMBER/UPI ID</label> <input type="text"
					name="refNo" id="refNo" required="required"
					placeholder="ENTER UPI ID"
					style="text-transform: uppercase;" />
			</div>
		</div>


		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4"
				style="margin-bottom: 30px">
				<label> FINANCIAL CONSULTANT ID</label>
				<div class="d-flex flex-column formFields mb-4">
					<input type="text" name="financialConsultantId"
						id="financialConsultantId" required="required"
						placeholder="ENTER CONSULTANT ID" />
				</div>
			</div>
		</div>
		<div class="col-lg-3">
			<div class="d-flex flex-column formFields mb-4">
				<label for="">FINANCIAL CONSULTANT NAME</label> <input type="text"
					name="financialConsultantName" id="financialConsultantName"
					required="required" placeholder="ENTER CONSULTANT NAME"
					style="text-transform: uppercase;" />
			</div>
		</div>


		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="">REMARKS SECTION</label>
				<textarea name="remark" id="remark"
					style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"
					placeholder="ENTER REMARKS IF ANY"></textarea>
			</div>
		</div>

		<div class="col-12 text-center">
			<button id="closeLoanBtn" class="btnStyle"
				style="background-color: #FFA500;">CLOSE LOAN</button>

		</div>
	</div>
</div>

<script
	src="${pageContext.request.contextPath}/js/LoanManagment/LoanClosure.js"></script>
