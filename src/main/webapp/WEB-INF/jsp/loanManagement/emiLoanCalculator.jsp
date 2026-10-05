<div class="pagetitle">
	<h1>LOAN MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-cash-coin"></i>
			</a></li>
			<li class="breadcrumb-item action">EMI & LOAN CALCULATOR</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">EMI & LOAN DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">INTEREST TYPE <span class="star">*</span></label> <select
							name="intrestType" id="intrestType" onchange="calculateEMI()"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT INTEREST TYPE</option>
							<option value="FlatInterest">FLAT INTEREST</option>
							<option value=reducinginterest>REDUCED INTEREST</option>
							<option value="Rule78">RULE 78</option>

						</select><small id="chkemiloandetails" style="color: red;"></small>
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">LOAN AMOUNT <span class="star">*</span></label>
						<input type="text" name="loanAmount" id="loanAmount"
							required="required" placeholder="LOAN AMOUNT"
							style="text-transform: uppercase;" /> <small
							id="chkloanamount" style="color: red;"></small>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">YEARLY INTEREST (%)<span class="star">*</span></label>
						<input type="text" name="yearlyIntrest" id="yearlyIntrest"
							required="required" placeholder="YEARLY INTEREST"
							style="text-transform: uppercase;" /><small
							id="chkyearlyinterest" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">INTEREST MODE <span class="star">*</span></label>
						<select id="interestModeCalculater" name="interestModeCalculater"
							onchange="calculateEMI()" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT INTEREST MODE</option>
							<option value="Daily">DAILY</option>
							<option value="Weekly">WEEKLY</option>
							<option value="Fortnightly">FORTNIGHTLY</option>
							<option value="Monthly">MONTHLY</option>
							<option value="Quarterly">QUARTERLY</option>

						</select><small
							id="chkinterestmode" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">LOAN TENURE (MONTHS) <span class="star">*</span></label>
						<input type="text" name="monthlyTerm" id="monthlyTerm"
							required="required" placeholder="ENTER TERM IN MONTH"
							style="text-transform: uppercase;" /><small
							id="chkmonthlyterm" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">EMI </label> <input type="text" name="emi"
							id="emi" readonly="readonly" placeholder="ENTER TERM IN MONTH"
							style="text-transform: uppercase;" /><small
							id="chkemi" style="color: red;"></small>
					</div>
				</div>



			</div>

			<div class="row">
				<div class="col-12 text-center">
					<button type="button" id="saveBtn" class="btnStyle"
						onclick="calculateEMI()" style="background-color: #FFA500;">CALCULATE</button>
				</div>
			</div>
	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">
						LOAN CALCULATOR <span>| TABLE VIEW</span>
					</h5>

					<table class="table table-borderless datatable overflow-scroll">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">EMI NO.</th>
								<th scope="col">DUE DATE</th>
								<th scope="col">EMI</th>
								<th scope="col">PRINCIPLE</th>
								<th scope="col">INTEREST</th>
								<th scope="col">CURRENT BALANCE</th>

							</tr>
						</thead>
						<tbody id="tbody">


						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

</div>
<script
	src="${pageContext.request.contextPath}/js/LoanManagment/emiLoanCalculator.js"></script>

