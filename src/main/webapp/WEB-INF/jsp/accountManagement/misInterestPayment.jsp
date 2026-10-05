
<div class="pagetitle">
	<h1>ACCOUNT MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="home"> <i
					class="bi bi-wallet2"></i>
			</a></li>
			<li class="breadcrumb-item action">MIS INTEREST PAYMENT</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div class="row">
			<div class="col-lg-12">
				<nav>
					<ol class="breadcrumb breadcrumb-title">
						<li class="breadcrumb-item action mt-3">MIS POLICY DETAILS</li>
					</ol>
				</nav>
			</div>

			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="">POLICY CODE</label> <input type="text"
						name="policyID" id="policyID" required="required"
						placeholder="ENTER POLICY CODE" />
				</div>
			</div>

			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="">POLICY HOLDER</label> <input type="text"
						name="policyHolder" id="policyHolder" required="required"
						placeholder="ENTER POLICY HOLDER NAME" disabled />
				</div>
			</div>

			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for=""> ISSUE DATE</label> <input type="date"
						name="issueDate" id="issueDate" required="required" placeholder="" />
				</div>
			</div>

			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="">INSURED AMOUNT</label> <input type="text"
						name="insuredAmount" id="insuredAmount" required="required"
						placeholder="ENTER INSURED AMOUNT" disabled />
				</div>
			</div>

			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="">ACCURED INTEREST</label> <input type="text"
						name="accruedInterest" id="accruedInterest" required="required"
						placeholder="ENTER ACCURED AMOUNT" disabled />
				</div>
			</div>


			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="">SCHEME TITLE</label> <input type="schemeTitle"
						name="schemeTitle" id="age" required="required"
						placeholder="ENTER SCHEME TITLE" disabled />
				</div>
			</div>

			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="">BRANCH NAME </label> <input type="text"
						name="branchName" id="branchName" required="required"
						placeholder="ENTER BRANCH NAME" disabled />
				</div>
			</div>

			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="">CUSTOMER CODE </label> <input type="text"
						name="clientCode" id="clientCode" required="required"
						placeholder="ENTER CUSTOMER CODE" disabled />
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-12">
				<nav>
					<ol class="breadcrumb breadcrumb-title">
						<li class="breadcrumb-item action mt-3">MIS PAYMENT DETAILS</li>
					</ol>
				</nav>
			</div>

			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="">PAY AMOUNT</label> <input type="text"
						name="payAmount" id="payAmount" required="required"
						placeholder="ENTER PAY AMOUNT" disabled />
				</div>
			</div>

			<div class="col-lg-3">
				<div class="d-flex flex-column formFields">
					<label for="">PAYING BRANCH</label> <select id="branchName"
						name="branchName" required="required"
						class="form-control selectField" style="height: 30px;">
						<option value="">--SELECT BRANCH NAME--</option>
					</select>
				</div>
			</div>

			<div class="col-lg-3">
				<div class="d-flex flex-column formFields mb-4">
					<label for="">DATE OF PAYMENT</label> <input type="date"
						name="paymentDate" id="paymentDate" required="required" />
				</div>
			</div>

			<div class="col-lg-3">
				<div class="d-flex flex-column formFields">
					<label for="">PAYMENT MODE </label> <select id="paymentMode"
						name="paymentMode" required="required"
						class="form-control selectField" style="height: 30px;">
						<option value="">--SELECT PAYMENT MODE--</option>
						<option value="Cash">CASH</option>
						<option value="Online">ONLINE</option>
						<option value="Cheque">CHEQUE</option>
						<option value="NEFT">NEFT</option>
					</select>
				</div>
			</div>

		</div>
		<div class="row">
			<div class="col-6 text-right mt-3">
				<button id="payBtn" class="btnStyle"
					style="background-color: #FFA500;">PAY</button>
			</div>
		</div>
	</form>

</div>
