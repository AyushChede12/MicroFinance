
<div class="pagetitle">
	<h1>LOAN MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-cash-coin"></i>
			</a></li>
			<li class="breadcrumb-item action">REGULAR INSTALLMENT PAYMENT</li>
		</ol>
	</nav>
</div>

<div class="row">
	<div class="col-lg-3">
		<div class="d-flex flex-column formFields mb-4">
			<label for="">SELECT LOAN ID</label> <select id="loanID"
				name="loanID" required="required" class="form-control selectField"
				style="height: 30px;">
				<option value="">SELECT LOAN ID</option>

			</select>
		</div>
	</div>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH DETAILS</li>
				</ol>
			</nav>
			<div class="row">

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="vehicalNo">DATE OF LOAN</label> <input type="date"
							name="date" id="date" required="required"
							placeholder="ENTER DATE OF LOAN"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CUSTOMER CODE</label> <input type="text"
							name="customercode" id="customercode" required="required"
							placeholder="ENTER CUSTOMER CODE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN PLAN NAME </label> <input type="text"
							name="loanplanname" id="loanplanname" required="required"
							placeholder="ENTER PLAN NAME" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">INTEREST TYPE</label> <input type=""
							name="intesteType" id="intesteType" required="required"
							placeholder="ENTER INTEREST TYPE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN MODE</label> <input type="text" name="loanmode"
							id="loanmode" required="required"
							placeholder="ENTER LOAN CATEGORY " />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">TERM</label> <input type="text" name="term"
							id="term" required="required" placeholder="ENTER TERM" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">EMI PAYMENT</label> <input type="text"
							name="paymnetEmi" id="paymnetEmi" required="required"
							placeholder="ENTER EMI PAYMENT" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">FAMILY MEMBER NAME</label> <input type="text"
							name="familyMembername" id="familyMembername" required="required"
							placeholder="ENTER FAMILY MEMBER NAME" />
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">RATE OF INTEREST(%)</label> <input type="text"
							name="rateofinterest" id="rateofinterest" required="required"
							placeholder="ENTER RATE OF INTEREST" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CONTACT NO.</label> <input type="text"
							name="contact" id="contact" required="required"
							placeholder="ENTER CONTACT NO" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">AMOUNT OF LOAN</label> <input type="text"
							name="amountLoan" id="amountLoan" required="required"
							placeholder="ENTER AMOUNT OF LOAN" />
					</div>
				</div>

				<!-- <div class="col-lg-3">
							<div class="d-flex flex-column formFields mb-4">
								<label for="">Total Principle Of Loan</label> <input type="text"
									name="totalPrincipalloan" id="totalPrincipalloan"
									required="required" placeholder="Enter Total Principle Of Loan" />
							</div>
						</div> -->

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">BRANCH ADDRESS</label> <input type="text"
							name="BranchAddress" id="BranchAddress" required="required"
							placeholder="ENTER BRANCH ADDRESS" />
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

				<div class="col-lg-3">

					<div class="d-flex flex-column formFields mb-4">
						<label for=""> INSTALLMENT</label> <select id="installment"
							name="installment" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">-SELECT INSTALLMENT-</option>

						</select>
					</div>
				</div>

				<!-- <div class="col-lg-3">
							<div class="d-flex flex-column formFields mb-4">
								<label for="">Interest Due </label> <input type="text"
									name="dueInterest" id="dueInterest" required="required"
									placeholder="Enter Location" />
							</div>
						</div> -->


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="vehicalNo">REGISTRATION DATE</label> <input
							type="date" name="registrationDate" id="registrationDate"
							required="required" placeholder="ENTER REGISTRATION DATE"
							style="text-transform: uppercase;" />
					</div>
				</div>



				<!-- <div class="col-lg-3">
							<div class="d-flex flex-column formFields mb-4">
								<label for=""> Principle Due </label> <input type="text"
									name="duePrincipal" id="duePrincipal" required="required"
									placeholder="Enter Location" />
							</div>
						</div> -->


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">TOTAL AMOUNT DUE</label> <input type="text"
							name="dueAmounttotal" id="dueAmounttotal" required="required"
							placeholder="ENTER TOTAL AMOUNT DUE" />
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">PAYMENT AMOUNT</label> <input type="text"
							name="paymentAmount" id="paymentAmount" required="required"
							placeholder="ENTER PAYMENT AMOUNT" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="vehicalNo">PAYMENT DATE</label> <input type="date"
							name="PaymentDate" id="PaymentDate" required="required"
							placeholder="ENTER PAYMENT DATE" style="text-transform: uppercase;" />
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">NET AMOUNT</label> <input type="text"
							name="netAmount" id="netAmount" required="required"
							placeholder="ENTER NET AMOUNT" />
					</div>
				</div>



				<div class="col-lg-3">

					<div class="d-flex flex-column formFields mb-4">
						<label for=""> PAYMENT SOURCE</label> <select id="sourcePayment"
							name="sourcePayment" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT TYPE</option>
							<option value="Blue">BLUE</option>
						</select>
					</div>
				</div>


				<!-- <div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">Down Payment</label>
								<textarea name="downPayment" id="downPayment"
									style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"></textarea>
							</div>
						</div> -->

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">FINANCIAL CONSULTANT ID</label> <input type="text"
							name="financialConsultantId" id="financialConsultantId"
							required="required" placeholder="ENTER FINANCIAL CONSULTANT ID" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">FINANCIAL CONSULTANT NAME</label> <input type="text"
							name="financialConsultantName" id="financialConsultantName"
							required="required" placeholder="ENTER FINANCIAL CONSULTANT NAME" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">REMARK SECTION</label> <input type="text"
							name="sectionRemARK" id="sectionRemARK" required="required"
							placeholder="ENTER REMARK SECTION" />
					</div>
				</div>
			</div>
		</div>

		<!-- <div class="row mt-4">
					<div class="col-12 text-center">
						<button id="saveBtn" class="btnStyle bg-success">Save</button>
						<button id="saveBtn" class="btnStyle"
							style="background-color: #FFA500;">Update</button>
						<button id="saveBtn" class="btnStyle bg-primary">Print</button>
					</div>
				</div> -->
	</form>

</div>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script
	src="${pageContext.request.contextPath}/js/LoanManagment/RegularInsatllmentPayment.js"></script>
