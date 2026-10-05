
<div class="pagetitle">
	<h1>JOINT LIABILITY LOAN </h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-cash-coin"></i>
			</a></li>
			<li class="breadcrumb-item action">CREATE LENDING GROUP</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">LOAN PLAN DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">


					<input type="hidden" id="planCode" name="planCode"
						value="${memberCodePI}" />

					<div class="d-flex flex-column formFields mb-4">
						<label for="loanSchemeInformation"> LOAN SCHEME NAME </label> <input
							type="text" name="loanSchemeName" id="loanSchemeName" required
							placeholder="ENTER LOAN SCHEME" />
					</div>

				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="minimumAge"> MINIMUM AGE * </label> <input type="text"
							name="minimumAge" id="minimumAge" required
							placeholder="ENTER MINIMUM AGE" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="maximumAge"> MAXIMUM AGE* </label> <input type="text"
							name="maximumAge" id="maximumAge" required
							placeholder="ENTER MAXIMUM AGE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="minLoanDurationMonths">TERM * </label> <input
							type="text" name="term" id="term" required
							placeholder="ENTER TERM" />
					</div>
				</div>


				<div class="col-lg-3 ">
					<div class="d-flex flex-column formFields">
						<label for="branchName">BRANCH NAME</label> <select
							id="branchName" name="branchName" required
							class="form-control selectField" style="height: 30px;">

						</select>
					</div>
				</div>




				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="emiFrequency">EMI FREQUENCY*</label> <input
							type="text" name="emiFrequency" id="emiFrequency" required
							placeholder="ENTER EMI FREQUENCY " />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="minLoanAmount">MINIMUM LOAN AMOUNT * </label> <input
							type="text" name="minLoanAmt" id="minLoanAmt" required
							placeholder="ENTER AMOUNT" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="maximumLoanAmount"> MAXIMUM LOAN AMOUNT* </label> <input
							type="text" name="maximumLoanAmount" id="maximumLoanAmount"
							required placeholder="ENTER MAX LOAN " />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="rateOfInterest">RATE OF INTEREST (% P.A.)* </label> <input
							type="text" name="rateOfInterest" id="rateOfInterest" required
							placeholder="ENTER ROI" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="interestType">INTEREST TYPE*</label> <select
							name="interestType" id="interestType" required
							class="form-control selectField" style="height: 30px;">

							<option value="">-- SELECT INTEREST TYPE --</option>
							<option value="Flat Interest">FLAT INTEREST </option>
							<option value="Reducing Interest">REDUCING INTEREST</option>
							<option value="Rule 78">RULE 78</option>

						</select>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="emiType">EMI MODE*</label><select name="emiType"
							id="emiType" required class="form-control selectField"
							style="height: 30px;">
							<option value="">-- SELECT EMI MODE --</option>
							<option value="Daily">DAILY</option>
							<option value="Weekly">WEEKLY</option>
							<option value="Monthly">MONTHLY</option>
							<option value="Fortnightly">FORTNIGHTLY </option>
							<option value="Quarterly">QUARTERLY </option>
						</select>

					</div>
				</div>

			</div>
		</div>

		<!-- Payment Deductions Section -->
		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">PAYMENT DEDUCTIONS </li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">PROCESSING FEE(%) </label> <input type="text"
							name="processingFeePercent" id="processingFeePercent"
							required="required" placeholder="ENTER PROCESSING FEE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for=""> LEGAL CHARGES(%)</label> <input type="text"
							name="legalChargesPercent" id="legalChargesPercent"
							required="required" placeholder="ENTER LEGAL CHARGES " />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">GST(%)</label> <input type="text" name="gstPercent"
							id="gstPercent" required="required" placeholder="ENTER GST" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">INSURENCE FEE(%)</label> <input type="text"
							name="insuranceFeePercent" id="insuranceFeePercent"
							required="required" placeholder="ENTER INSURANCE FEE" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">VALUATION FEE(%) </label> <input type="text"
							name="valuationFeePercent" id="valuationFeePercent"
							required="required" placeholder="ENTER VALUATION FEE" />
					</div>
				</div>

			</div>
		</div>

		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">LATE FINE DETAILS </li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LATE ALLOWANCE DAYS</label> <input type="text"
							name="lateAllowanceday" id="lateAllowanceDays"
							required="required" placeholder="ENTER LATE ALLOWANCE DAYS" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">PENALTY MODE</label> <select id="penaltyMode"
							name="penaltyMode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT PENALTY TYPE </option>
							<option value="Percentage">PERCENTAGE </option>
							<option value="Amount">AMOUNT</option>
						</select>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for=""> MONTHLY PENALTY  </label> <input type="text"
							name="monthlyPenalty" id="monthlyPenalty" required="required"
							placeholder="" />
					</div>
				</div>
			</div>


		</div>
		<input type="hidden" id="loanId" value="" />
		<div class="row">
			<div class="col-12 text-center">
				<button id="saveBtn" class="btnStyle bg-success">SAVE</button>


				<button id="updatelendingBtn" class="updatelendingBtn"
					style="background-color: #FFA500;">UPDATE</button>

			</div>
		</div>
	</form>


	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">
						RECENT SALES <span>| TODAY</span>
					</h5>

					<table class="table table-borderless datatable overflow-scroll">

						<h5>LENDING GROUP LIST</h5>

						<thead>
							<tr>
								<th>PLAN ID</th>
								<th>LOAN SCHEME</th>
								<th>BRANCH</th>
								<th>ROI (%)</th>
								<th>ROI TYPE</th>
								<th>PROCESSING FEE</th>
								<th>LEGAL CHARGES</th>
								<th>GST</th>
								<th>INSURANCE FEE</th>
								<th>VALUATION FEE</th>
								<th>ACTIONS</th>
							</tr>
						</thead>

						<tbody id="LendingBody">
							<!-- Rows will be populated dynamically using JSTL or JavaScript -->
						</tbody>

					</table>
				</div>
			</div>
		</div>
	</div>

</div>


<script
	src="${pageContext.request.contextPath}/js/Joinlibiliy/CreateLendingGroup.js"></script>
