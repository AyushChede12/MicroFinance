
<div class="pagetitle">
	<h1>LOAN MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-cash-coin"></i>
			</a></li>
			<li class="breadcrumb-item action">LOAN DOCUMENT PRINT</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div class="">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH DETAILS FOR PRINT</li>
				</ol>
			</nav>
			<div class="row">

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">FIND BY LOAN ID</label> <select id="loanId"
							name="loanId" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT LOAN ID</option>

						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">SELECT LOAN DOCUMENT</label> <select
							id="loanDocument" name="loanDocument" required="required"
							class="form-control selectField" style="height: 30px;">
							<option>SELECT DOCUMENT</option>
							<option value="applicantForm">APPLICANT FORM</option>
							<option value="sanctionLetter">SANCTION LETTER</option>
							<option value="loanAgreement">LOAN AGREEMENT</option>

						</select> <span id="docTypeError"
							style="color: red; font-size: 13px; display: none;">
							PLEASE SELECT A DOCUMENT TYPE TO PRINT</span>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="col-12 text-center mb-4 mt-3">
						<button class="btnStyle bg-warning" id="generateDoc">GENERATE
							DOC</button>

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
							readonly="readonly" name="loanDate" id="loanDate"
							required="required" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN PLAN NAME</label> <input type="text"
							readonly="readonly" name="loanPlanName" id="loanPlanName"
							required="required" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">RATE OF INTEREST</label> <input type="text"
							name="rateOfInterest" id="rateOfInterest" readonly="readonly"
							required="required" placeholder="ENTER RATE OF INTEREST"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">MEMBER ID & NAME</label> <input type="text"
							name="memberId" id="memberId" required="required"
							readonly="readonly" placeholder=""
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">LOAN TERM</label> <input type="text"
							name="loanTerm" readonly="readonly" id="loanTerm"
							required="required" placeholder="" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">INTEREST TYPE</label> <input type="text"
							name="interestType" id="interestType" required="required"
							placeholder="ENTER INTEREST TYPE." />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">RELATIVE DETAILS</label> <input type="text"
							readonly="readonly" name="relativeDetails" id="relativeDetails"
							required="required" placeholder=" RELATIVE DETAILS" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">LOAN MODE</label> <input type="text"
							readonly="readonly" name="loanMode" id="loanMode"
							required="required" placeholder="ENTER LOAN MODE" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="loanName">EMI PAYMENT</label> <input type="text"
							name="emiPayment" id="emiPayment" required="required"
							readonly="readonly" placeholder="ENTER EMI PAYMENT"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CONTACT NO.</label> <input type="text"
							readonly="readonly" name="contactNo" id="contactNo"
							required="required" placeholder="ENTER CONTACT NO."
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN AMOUNT</label> <input type="text"
							readonly="readonly" name="loanAmount" id="loanAmount"
							required="required" placeholder="ENTER LOAN AMOUNT"
							style="text-transform: uppercase;" />
					</div>
				</div>

			</div>
		</div>
	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales" id="receiptArea"></div>
		</div>
	</div>

	<!-- Print Button (hidden by default) -->
	<div style="text-align: center; margin-top: 20px;">
		<button id="printBtn" onclick="printDocument()"
			style="display: none; padding: 8px 20px; font-size: 16px; font-weight: bold; background: #007bff; color: #fff; border: none; border-radius: 6px; cursor: pointer;">
			PRINT</button>
	</div>

</div>

<script
	src="${pageContext.request.contextPath}/js/LoanManagment/LoanDocumentPrint.js"></script>