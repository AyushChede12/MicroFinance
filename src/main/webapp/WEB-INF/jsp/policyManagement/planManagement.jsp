

<style>
table {
	width: 100%;
	border-collapse: collapse;
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	font-size: 14px;
	margin-top: 20px;
}

th, td {
	border: 1px solid #dee2e6;
	padding: 10px 12px;
	text-align: center;
	vertical-align: middle;
}

th {
	background-color: #f8f9fa;
	font-weight: bold;
	color: #343a40;
}

tr:nth-child(even) {
	background-color: #f2f2f2;
}

tr:hover {
	background-color: #e9ecef;
	cursor: pointer;
}

.table-wrapper {
	overflow-x: auto;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
	margin-bottom: 30px;
}

table thead {
	position: sticky;
	top: 0;
	z-index: 1;
}

<
style>.table-wrapper {
	width: 100%;
	overflow-x: auto;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	margin-top: 20px;
}

table {
	width: 100%;
	border-collapse: collapse;
	font-family: 'Segoe UI', sans-serif;
	font-size: 14px;
	min-width: 1200px; /* Force minimum width so columns look even */
}

thead {
	background: linear-gradient(to right, #7b2ff7, #f107a3);
	color: white;
	text-align: center;
}

th, td {
	border: 1px solid #dee2e6;
	padding: 10px 14px;
	text-align: center;
}

tbody tr:nth-child(even) {
	background-color: #f8f9fa;
}

tbody tr:hover {
	background-color: #e2e6ea;
	cursor: default;
}

th {
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.5px;
}

td {
	color: #333;
	white-space: nowrap;
}
</style>

<div class="pagetitle">
	<h1>POLICY MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-piggy-bank"></i>
			</a></li>
			<li class="breadcrumb-item action">PLAN MANAGEMENT</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">DAILY DEPOSIT</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<input type="hidden" value="DRD" name="drd" id="drd"
						required="required" />

					<div class="d-flex flex-column formFields mb-4">
						<label for="">PLAN CODE <span class="star">*</span></label> <input
							type="text" name="planCodeDD" id="planCodeDD"
							placeholder="ENTER PLAN CODE" value="${memberCodeDD}"
							readonly="readonly" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 ">
					<div class="d-flex flex-column formFields  mb-4 ">
						<label for="vehicalNo">PLAN NAME <span class="star">*</span></label>
						<input type="text" name="planNameDD" id="planNameDD" style="text-transform: uppercase;"
							placeholder="ENTER PLAN NAME" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields  mb-4">
						<label for="vehicalNo">MINIMUM DEPOSIT <span class="star">*</span></label>
						<input type="number" name="minimumDeposit" id="minimumDeposit"
							placeholder="ENTER MINIMUM AMOUNT"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields  mb-4">
						<label for="vehicalNo">RATE OF INTEREST (%) <span
							class="star">*</span></label> <input type="number" name="rateOfInterest"
							id="rateOfInterest" placeholder="ENTER RATE OF INTEREST"
							style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4 ">
					<div class="d-flex flex-column formFields">
						<label for="">INSTALLMENT TYPE <span class="star">*</span></label>
						<select id="installmentType" name="installmentType"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT INSTALLMENT TYPE</option>
							<option value="Cash">CASH</option>
							<option value="Cheque">CHEQUE</option>
							<option value="Online">ONLINE</option>
							<option value="UPI">UPI</option>

						</select>
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">TERM <span class="star">*</span></label> <input
							type="number" name="ddterm" id="ddterm" placeholder="ENTER TERM" />
					</div>
				</div>

				<!-- <div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">COMMISSION ON NEW <span class="star">*</span></label>
						<input type="text" name="commissionOnNew" id="commissionOnNew"
							required="required" placeholder="ENTER COMMISSION ON NEW" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">RENEWAL COMMISSION (%) <span class="star">*</span></label>
						<input type="text" name="renewalCommission" id="renewalCommission"
							required="required" placeholder="ENYTER RENEWAL COMMISSION " />
					</div>
				</div>
 -->
				<div class="col-lg-3 mb-4 ">
					<div class="d-flex flex-column formFields">
						<label for="">INTEREST INTERVAL <span class="star">*</span></label>
						<select id="interestInterval" name="interestInterval"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT INTEREST INTERVAL</option>
							<option value="Daily">DAILY</option>
							<option value="Monthly">MONTHLY</option>
							<option value="Quarterly">QUARTERLY</option>
							<option value="Half-Yearly">HALF-YEARLY</option>
							<option value="Yearly">YEARLY</option>
							<option value="On Maturity">ON MATURITY</option>

						</select>
					</div>
				</div>



				<!-- <div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">TOTAL PAID <span class="star">*</span></label> <input
							type="text" name="totalPaid" id="totalPaid" required="required"
							readonly="readonly" placeholder="ENTER TOTAL PAID" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">MATURITY AMOUNT<span class="star">*</span></label>
						<input type="text" name="maturityAmount" id="maturityAmount"
							readonly="readonly" required="required"
							placeholder="ENTER MATURITY AMOUNT" />
					</div>
				</div> -->

				<div class="col-lg-3 mb-4 ">
					<div class="d-flex flex-column formFields">
						<label for="">IS FLEXIBLE PLAN? <span class="star">*</span></label>
						<select id="flexiblePlan" name="flexiblePlan"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT FLEXIBLE PLAN</option>
							<option value="Yes">YES</option>
							<option value="No">NO</option>

						</select>
					</div>
				</div>





				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">GRACE DAYS <span class="star">*</span></label> <input
							type="number" name="graceDays" id="graceDays"
							placeholder="ENTER GRACE DAY" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">PENALTY RATE (%) <span class="star">*</span></label>
						<input type="number" name="penaltyRate" id="penaltyRate"
							placeholder="ENTER PENALTY RATE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class=" h-100 d-flex justify-content-start align-items-center"
						style="margin-bottom: 30px;">
						<div
							class="d-flex justify-content-start align-items-center  formFields">
							<label style="margin-left: 20px;" class="mb-2">STATUS
								PLAN</label>
							<div class="cont">
								<div class="toggle">
									<input type="checkbox" id="toggle-status-planDD"
										name="statusOfPlan" class="toggle__input"
										data-toggle-type="status-plan"> <label
										for="toggle-status-planDD" class="toggle__label"></label>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>

			<div class="row" style="margin-left: 80%;">
				<div class="col-12 text-center">
					<button type="button" id="saveBtn" class="btnStyle bg-warning ">SAVE</button>
					<button id="updateBtn" class="btnStyle bg-warning style="display:none;">UPDATE</button>

				</div>
			</div>

			<div class="row mt-5">
				<div class="col-12">
					<div class="card recent-sales">
						<div class="card-body table-responsive">
							<h5 class="card-title">
								DAILY DEPOSIT <span>| TABLE VIEW</span>
							</h5>

							<table class="table table-bordered">
								<thead class="table-light">
									<tr>
										<th style="white-space: nowrap;">Sr. No</th>
										<th style="white-space: nowrap;">Plan Code</th>
										<th style="white-space: nowrap;">Plan Name</th>
										<th style="white-space: nowrap;">Minimum Deposit</th>
										<th style="white-space: nowrap;">Rate of Interest</th>
										<th style="white-space: nowrap;">Installment Type</th>
										<th style="white-space: nowrap;">Term (Duration)</th>
										<!-- 										<th style="white-space: nowrap;">Maturity Amount</th> -->
										<th style="white-space: nowrap;">Status (Active/Inactive)</th>
										<th style="white-space: nowrap;">Action</th>
									</tr>
								</thead>
								<tbody id="depositTableBody">
									<!-- Dynamic rows will be injected here -->
								</tbody>
							</table>

						</div>
					</div>
					<div class="mt-2 text-center">
						<button type="button" id="prevBtnDD"
							class="btn btn-sm btn-primary">
							<i class="bi bi-chevron-double-left"></i>
						</button>
						<span id="pageInfoDD" class="mx-2"></span>
						<button type="button" id="nextBtnDD"
							class="btn btn-sm btn-primary">
							<i class="bi bi-chevron-double-right"></i>
						</button>
					</div>
				</div>
			</div>
	</form>
</div>
<br>
<br>


<div>
	<form id="recurringformid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">RECURRING DEPOSIT</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<input type="hidden" name="rd" id="rd" value="RD"
						required="required" style="text-transform: uppercase;" />

					<div class="d-flex flex-column formFields">
						<label for="">PLAN CODE <span class="star">*</span></label> <input
							type="text" name="planCodeRD" id="planCodeRD" required="required"
							placeholder="ENTER PLAN CODE" value="${memberCodeRD}"
							readonly="readonly" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 ">
					<div class="d-flex flex-column formFields  mb-4 ">
						<label for="vehicalNo">PLAN NAME <span class="star">*</span></label>
						<input type="text" name="planNameRD" id="planNameRD" style="text-transform: uppercase;"
							required="required" placeholder="ENTER PLAN NAME" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">MINIMUM AMOUNT <span class="star">*</span></label>
						<input type="number" name="minimumAmountRD" id="minimumAmountRD"
							required="required" placeholder="ENTER MINIMUM AMOUNT "
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">INTEREST RATE (%) <span
							class="star">*</span></label> <input type="number" name="rateOfInterestRD"
							id="rateOfInterestRD" required="required"
							placeholder="ENTER INTEREST RATE"
							style="text-transform: uppercase;" />
					</div>
				</div>




				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">TERM <span class="star">*</span></label> <input
							type="number" name="rdterm" id="rdterm" required="required"
							placeholder="ENTER TERM" />
					</div>
				</div>
				<div class="col-lg-3 mb-4 ">
					<div class="d-flex flex-column formFields">
						<label for="">INSTALLMENT TYPE <span class="star">*</span></label>
						<select id="installmentTypeRD" name="installmentTypeRD"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT INSTALLMENT TYPE</option>
							<option value="Cash">CASH</option>
							<option value="Cheque">CHEQUE</option>
							<option value="Online">ONLINE</option>
							<option value="UPI">UPI</option>

						</select>
					</div>
				</div>


				<!-- 	<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">NEW COMMISSION(%) <span class="star">*</span></label>
						<input type="text" name="commissionOnNewRD" id="commissionOnNewRD"
							required="required" placeholder="ENTER COMM.NEW(%)" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">RENEWAL COMMISION(%) <span class="star">*</span></label>
						<input type="text" name="renewalCommissionRD"
							id="renewalCommissionRD" required="required"
							placeholder="ENTER RENEW" />
					</div>
				</div> -->

				<div class="col-lg-3 mb-4 ">
					<div class="d-flex flex-column formFields">
						<label for="">INTEREST INTERVAL <span class="star">*</span></label>
						<select id="componentIntervalRD" name="componentIntervalRD"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT INTEREST INTERVAL</option>
							<option value="Monthly">MONTHLY</option>
							<option value="Quarterly">QUATERLY</option>
							<option value="Half-Yearly">HALF-YEARLY</option>
							<option value="Yearly">YEARLY</option>
							<option value="On Maturity">ON MATURITY</option>
						</select>
					</div>
				</div>



				<!-- <div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">TOTAL DEPOSIT <span class="star">*</span></label> <input
							type="text" name="totalPaidRD" id="totalPaidRD"
							readonly="readonly" required="required"
							placeholder="ENTER TOTAL DEPOSIT" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">MATURITY AMOUNT <span class="star">*</span></label>
						<input type="text" name="maturityAmountRD" id="maturityAmountRD"
							readonly="readonly" required="required"
							placeholder="ENTER MATURITY AMOUNT" />
					</div>
				</div> -->

				<div class="col-lg-3 mb-4 ">
					<div class="d-flex flex-column formFields">
						<label for="">IS FLEXIBLE PLAN? <span class="star">*</span></label>
						<select id="flexiblePlanRD" name="flexiblePlanRD"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT FLEXIBLE PLAN</option>
							<option value="Yes">YES</option>
							<option value="No">NO</option>

						</select>
					</div>
				</div>




				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>GRACE PERIOD <span class="star">*</span></label> <input
							type="number" name="graceDaysRD" id="graceDaysRD"
							required="required" placeholder="ENTER GRACE PERIOD" />
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">PENALTY FINE(%) <span class="star">*</span></label>
						<input type="number" name="penaltyfineRD" id="penaltyfineRD"
							required="required" placeholder="ENTER PENALTY FINE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class=" h-100 d-flex justify-content-start align-items-center"
						style="margin-bottom: 30px;">
						<div
							class="d-flex justify-content-start align-items-center  formFields">
							<label style="margin-left: 20px;" class="mb-2">STATUS
								PLAN</label>
							<div class="cont">
								<div class="toggle">
									<input type="checkbox" id="toggle-status-planRD"
										name="statusOfPlanRD" class="toggle__input"
										data-toggle-type="status-plan"> <label
										for="toggle-status-planRD" class="toggle__label"></label>
								</div>
							</div>
						</div>
					</div>
				</div>


			</div>

			<div class="row" style="margin-left: 80%;">
				<div class="col-12 text-center">
					<button id="ReccuringsaveBtn" class="btnStyle bg-warning ">SAVE</button>
					<button id="ReccuringupdateBtn" class="btnStyle bg-warning style="display:none;">UPDATE</button>

				</div>
			</div>

			<div class="row mt-5">
				<div class="col-12">
					<div class="card recent-sales">
						<div class="card-body table-responsive">
							<h5 class="card-title">
								RECURRING DEPOSIT <span>| TABLE VIEW</span>
							</h5>

							<table class="table table-bordered">
								<thead class="table-light">
									<tr>
										<th style="white-space: nowrap;">Sr. No</th>
										<th style="white-space: nowrap;">Plan Code</th>
										<th style="white-space: nowrap;">Plan Name</th>
										<th style="white-space: nowrap;">Minimum Deposit</th>
										<th style="white-space: nowrap;">Rate of Interest</th>
										<th style="white-space: nowrap;">Installment Type</th>
										<th style="white-space: nowrap;">Term (Duration)</th>
										<!-- 	<th style="white-space: nowrap;">Maturity Amount</th> -->
										<th style="white-space: nowrap;">Status (Active/Inactive)</th>
										<th style="white-space: nowrap;">Action</th>
									</tr>
								</thead>
								<tbody id="recurringTableBody">
									<!-- Dynamic rows will be injected here -->
								</tbody>
							</table>

						</div>
					</div>
					<div class="mt-2 text-center">
						<button type="button" id="prevBtnRD"
							class="btn btn-sm btn-primary">
							<i class="bi bi-chevron-double-left"></i>
						</button>
						<span id="pageInfoRD" class="mx-2"></span>
						<button type="button" id="nextBtnRD"
							class="btn btn-sm btn-primary">
							<i class="bi bi-chevron-double-right"></i>
						</button>
					</div>
				</div>
			</div>
	</form>
</div>
<br>
<br>


<div>
	<form id="fixedformid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">FIXED DEPOSIT</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<input type="hidden" name="fd" id="fd" value="FD"
						required="required" style="text-transform: uppercase;" />

					<div class="d-flex flex-column formFields">
						<label for="">PLAN CODE <span class="star">*</span></label> <input
							type="text" name="planCodeFD" id="planCodeFD" required="required"
							value="${memberCodeFD}" readonly="readonly"
							placeholder="ENTER PLAN CODE" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 ">
					<div class="d-flex flex-column formFields  mb-4 ">
						<label for="vehicalNo">PLAN NAME <span class="star">*</span></label>
						<input type="text" name="planNameFD" id="planNameFD" style="text-transform: uppercase;"
							required="required" placeholder="ENTER PLAN NAME" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">MINIMUM AMOUNT <span class="star">*</span></label>
						<input type="number" name="minimumAmountFD" id="minimumAmountFD"
							required="required" placeholder="ENTER MINIMUM AMOUNT"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">INTEREST RATE(%) <span class="star">*</span></label>
						<input type="number" name="rateOfInterestFD" id="rateOfInterestFD"
							required="required" placeholder="ENTER INTEREST RATE"
							style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4 ">
					<div class="d-flex flex-column formFields">
						<label for="">INSTALLMENT TYPE<span class="star">*</span></label>
						<select id="installmentTypeFD" name="installmentTypeFD"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT INSTALLMENT TYPE</option>
							<option value="Cash">CASH</option>
							<option value="Cheque">CHEQUE</option>
							<option value="Online">ONLINE</option>
							<option value="UPI">UPI</option>

						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">TERM <span class="star">*</span></label> <input
							type="number" name="fdterm" id="fdterm" required="required"
							placeholder="ENTER TERM" />
					</div>
				</div>

				<!-- <div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">RENEWAL COMMISSION (%) <span class="star">*</span></label>
						<input type="text" name="renewalCommissionFD"
							id="renewalCommissionFD" required="required"
							placeholder="ENTER COMM.RENEW(%)" />
					</div>
				</div> -->

				<div class="col-lg-3 mb-4 ">
					<div class="d-flex flex-column formFields">
						<label for="">INTEREST INTERVAL <span class="star">*</span></label>
						<select id="componentIntervalFD" name="componentIntervalFD"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT INTEREST INTERVAL</option>
							<option value="Monthly">MONTHLY</option>
							<option value="Quarterly">QUARTERLY</option>
							<option value="Half-Yearly">HALF-YEARLY</option>
							<option value="Yearly">YEARLY</option>
							<option value="On Maturity">ON MATURITY</option>

						</select>
					</div>
				</div>

				<!-- <div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">TOTAL DEPOSIT <span class="star">*</span></label> <input
							type="text" name="totalPaidFD" id="totalPaidFD"
							readonly="readonly" required="required"
							placeholder="ENTER TOTAL DEPOSITE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">MATURITY AMOUNT <span class="star">*</span></label>
						<input type="text" name="maturityAmountFD" id="maturityAmountFD"
							readonly="readonly" required="required"
							placeholder="ENTER MATURITYAMOUNTFD " />
					</div>
				</div> -->

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px;">
						<label for="">INTEREST EARNED <span class="star">*</span></label>
						<input type="number" name="interestEarnedFD" id="interestEarnedFD" required="required" placeholder=" ENTER INTREST EARNED" />
					</div>
				</div>

				<!-- New field: Interest Per Interval -->
				<!-- <div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">Interest Per Interval <span class="star">*</span></label>
								<input type="text" name="interestPerIntervalFD"
									id="interestPerIntervalFD" readonly="readonly"
									required="required" placeholder="Interest Per Interval" />
							</div>
						</div> -->

				<!-- <div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">NEW COMMISSION(%) <span class="star">*</span></label>
						<input type="text" name="commissionOnNewFD" id="commissionOnNewFD"
							required="required" placeholder="ENTER COMM.NEW(%)" />
					</div>
				</div> -->

				<div class="col-lg-3 mb-4 ">
					<div class="d-flex flex-column formFields">
						<label for="">IS FLEXIBLE PLAN? <span class="star">*</span></label>
						<select id="flexiblePlanFD" name="flexiblePlanFD"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT FLEXIBLE PLAN</option>
							<option value="Yes">YES</option>
							<option value="No">NO</option>

						</select>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>GRACE PERIOD <span class="star">*</span></label> <input
							type="number" name="graceDaysFD" id="graceDaysFD"
							required="required" placeholder="ENTER GRACE PERIOD" />
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">PENALTY FINE(%) <span class="star">*</span></label>
						<input type="number" name="penltyfineFD" id="penltyfineFD"
							required="required" placeholder="ENTER PENALTY FINE" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class=" h-100 d-flex justify-content-start align-items-center"
						style="margin-bottom: 30px;">
						<div
							class="d-flex justify-content-start align-items-center  formFields">
							<label style="margin-left: 20px;" class="mb-2">STATUS
								PLAN</label>
							<div class="cont">
								<div class="toggle">
									<input type="checkbox" id="toggle-status-planFD"
										name="statusOfPlanFD" class="toggle__input"
										data-toggle-type="status-plan"> <label
										for="toggle-status-planFD" class="toggle__label"></label>
								</div>
							</div>
						</div>
					</div>
				</div>


			</div>


		</div>

		<div class="row" style="margin-left: 80%;">
			<div class="col-12 text-center">
				<button type="button" id="FixedsaveBtn" class="btnStyle bg-warning ">SAVE</button>
				<button id="FixedupdateBtn" class="btnStyle bg-warning style="display:none;">UPDATE</button>
			</div>
		</div>

		<div class="row mt-5">
			<div class="col-12">
				<div class="card recent-sales">
					<div class="card-body table-responsive">
						<h5 class="card-title">
							FIXED DEPOSIT <span>| TABLE VIEW</span>
						</h5>

						<table class="table table-bordered">
							<thead class="table-light">
								<tr>
									<th style="white-space: nowrap;">Sr. No</th>
									<th style="white-space: nowrap;">Plan Code</th>
									<th style="white-space: nowrap;">Plan Name</th>
									<th style="white-space: nowrap;">Minimum Deposit</th>
									<th style="white-space: nowrap;">Rate of Interest</th>
									<th style="white-space: nowrap;">Installment Type</th>
									<th style="white-space: nowrap;">Term (Duration)</th>
									<!-- <th style="white-space: nowrap;">Maturity Amount</th> -->
									<th style="white-space: nowrap;">Status (Active/Inactive)</th>
									<th style="white-space: nowrap;">Action</th>
								</tr>
							</thead>
							<tbody id="fixedTableBody">
								<!-- Dynamic rows will be injected here -->
							</tbody>
						</table>

					</div>
				</div>
				<div class="mt-2 text-center">
					<button type="button" id="prevBtnFD" class="btn btn-sm btn-primary">
						<i class="bi bi-chevron-double-left"></i>
					</button>
					<span id="pageInfoFD" class="mx-2"></span>
					<button type="button" id="nextBtnFD" class="btn btn-sm btn-primary">
						<i class="bi bi-chevron-double-right"></i>
					</button>
				</div>
			</div>
		</div>
	</form>
</div>
<br>
<br>


<div>
	<form id="misdepositeid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">MIS DEPOSIT</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<input type="hidden" name="mis" id="mis" value="MIS"
						required="required" style="text-transform: uppercase;" />

					<div class="d-flex flex-column formFields">
						<label for="">PLAN CODE <span class="star">*</span></label> <input
							type="text" name="planCodeMD" id="planCodeMD" required="required"
							placeholder="ENTER PLAN CODE" value="${memberCodeMD}"
							readonly="readonly" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 ">
					<div class="d-flex flex-column formFields  mb-4 ">
						<label for="vehicalNo">PLAN NAME <span class="star">*</span></label>
						<input type="text" name="planNameMD" id="planNameMD" style="text-transform: uppercase;"
							required="required" placeholder="ENTER PLAN NAME" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">MINIMUM AMOUNT <span class="star">*</span></label>
						<input type="number" name="minimumAmountMD" id="minimumAmountMD"
							required="required" placeholder=" ENTER MINIMUM AMOUNT"
							style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">INTEREST RATE(%) <span class="star">*</span></label>
						<input type="number" name="rateOfInterestMD" id="rateOfInterestMD"
							required="required" placeholder="ENTER INTEREST RATE"
							style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4 ">
					<div class="d-flex flex-column formFields">
						<label for="">INSTALLMENT TYPE <span class="star">*</span></label>
						<select id="installmentTypeMD" name="installmentTypeMD"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT INSTALLMENT TYPE</option>
							<option value="Cash">CASH</option>
							<option value="Cheque">CHEQUE</option>
							<option value="Online">ONLINE</option>
							<option value="UPI">UPI</option>

						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">TERM <span class="star">*</span></label> <input
							type="number" name="misTerm" id="misTerm" required="required"
							placeholder="ENTER TERM" />
					</div>
				</div>

				<!-- <div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">TOTAL DEPOSITE <span class="star">*</span></label> <input
							type="text" name="totalPaidMD" id="totalPaidMD"
							readonly="readonly" required="required"
							placeholder="ENTER TOTAL DEPOSIT" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">MATURITY AMOUNT <span class="star">*</span></label>
						<input type="text" name="maturityAmountMD" id="maturityAmountMD"
							readonly="readonly" required="required"
							placeholder="ENTER MATURITY AMOUNT" />
					</div>
				</div> -->

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px;">
						<label for="">INTEREST EARNED <span class="star">*</span></label>
						<input type="number" name="interestEarnedMD" id="interestEarnedMD"
							 required="required"
							placeholder=" ENTER INTEREST EARNED" />
					</div>
				</div>

				<!-- <div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">NEW COMMISSION(%) <span class="star">*</span></label>
						<input type="text" name="commissionOnNewMD" id="commissionOnNewMD"
							required="required" placeholder="ENTER COMM.NEW(%)" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">RENEWAL COMMISSION(%) <span class="star">*</span></label>
						<input type="text" name="renewalCommissionMD"
							id="renewalCommissionMD" required="required"
							placeholder="ENTER COMM.RENW(%)" />
					</div>
				</div> -->

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>GRACE PERIOD <span class="star">*</span></label> <input
							type="number" name="graceDaysMD" id="graceDaysMD"
							required="required" placeholder="ENTER GRACE PERIOD " />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">PENALTY FINE(%) <span class="star">*</span></label>
						<input type="number" name="penltyfineMD" id="penltyfineMD"
							required="required" placeholder="ENTER PENALTY FINE" />
					</div>
				</div>

				<div class="col-lg-3 mb-4 ">
					<div class="d-flex flex-column formFields">
						<label for="">IS FLEXIBLE PLAN? <span class="star">*</span></label>
						<select id="flexiblePlanMD" name="flexiblePlanMD"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT FLEXIBLE PLAN</option>
							<option value="Yes">YES</option>
							<option value="No">NO</option>

						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class=" h-100 d-flex justify-content-start align-items-center"
						style="margin-bottom: 30px;">
						<div
							class="d-flex justify-content-start align-items-center  formFields">
							<label style="margin-left: 20px;" class="mb-2">STATUS
								PLAN</label>
							<div class="cont">
								<div class="toggle">
									<input type="checkbox" id="toggle-status-planMIS"
										name="statusOfPlanMDRD2" class="toggle__input"
										data-toggle-type="status-plan"> <label
										for="toggle-status-planMIS" class="toggle__label"></label>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>

		<div class="row" style="margin-left: 80%;">
			<div class="col-12 text-center">
				<button id="missaveBtn" class="btnStyle bg-warning ">SAVE</button>
				<button id="misdupdateBtn" class="btnStyle bg-warning style="display:none;">UPDATE</button>
			</div>
		</div>

		<div class="row mt-5">
			<div class="col-12">
				<div class="card recent-sales">
					<div class="card-body table-responsive">
						<h5 class="card-title">
							MIS DEPOSIT <span>| TABLE VIEW</span>
						</h5>

						<table class="table table-bordered">
							<thead class="table-light">
								<tr>
									<th style="white-space: nowrap;">Sr. No</th>
									<th style="white-space: nowrap;">Plan Code</th>
									<th style="white-space: nowrap;">Plan Name</th>
									<th style="white-space: nowrap;">Minimum Deposit</th>
									<th style="white-space: nowrap;">Rate of Interest</th>
									<th style="white-space: nowrap;">Installment Type</th>
									<th style="white-space: nowrap;">Term (Duration)</th>
									<!-- <th style="white-space: nowrap;">Maturity Amount</th> -->
									<th style="white-space: nowrap;">Status (Active/Inactive)</th>
									<th style="white-space: nowrap;">Action</th>
								</tr>
							</thead>
							<tbody id="misdepositeTableBody">
								<!-- Dynamic rows will be injected here -->
							</tbody>
						</table>

					</div>
				</div>
				<div class="mt-2 text-center">
					<button type="button" id="prevBtnMIS"
						class="btn btn-sm btn-primary">
						<i class="bi bi-chevron-double-left"></i>
					</button>
					<span id="pageInfoMIS" class="mx-2"></span>
					<button type="button" id="nextBtnMIS"
						class="btn btn-sm btn-primary">
						<i class="bi bi-chevron-double-right"></i>
					</button>
				</div>
			</div>
		</div>
	</form>
</div>
<%--  <button class="btn btn-sm btn-primary" onclick="editPlan(${item.id})">
	                    <i class="fa fa-edit"></i>
	                  </button>
 --%>

<script
	src="${pageContext.request.contextPath}/js/PolicyManagment/PlanMangement.js"></script>
