
<div class="pagetitle">
	<h1>DATA CORRECTION</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-pencil-square"></i>
			</a></li>
			<li class="breadcrumb-item action">RENEWAL DATA CORRECTION </li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH BOX </li>
				</ol>
			</nav>
			<div class="row">
				<input type="hidden" name="id" id="id">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 20px;">
						<label for="policyCode">POLICY CODE</label> <select
							id="policyCode" name="policyCode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">-- SERACH POLICY CODE --</option>

						</select>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="renewalDate">UPDATE DATE</label> <input type="date"
							name="renewalDate" id="renewalDate" required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>


			</div>
			<hr>
			<div class="row">
				<div class="col-lg-3">
					<!-- <div class="d-flex flex-column formFields" style="margin-bottom: 30px">
                <label>Verify With</label>
                <div class="position-relative">
                  <div class="select-btn1" style="cursor: pointer;">
                    <span name="cityName" id="cityNameId" style="font-size: 12px;">Select</span> <i
                      class="fa-solid fa-angle-down"></i>
                  </div>
                  <div class="content" id="contentCityName" style="display: none;">
                    <div class="search">
                      <input type="text" id="city-search" class="m-0" placeholder="Search City" />
                    </div>
                    <ul class="options" id="city-options">
                      <li>ABC</li>
                      <li>ABC</li>
                      <li>ABC</li>
                      <li>ABC</li>
                      <li>ABC</li>
                      <li>ABC</li>
                    </ul>
                  </div>
                </div>
              </div> -->
					<div class="d-flex flex-column formFields">
						<label for="policyDate">POLICY DATE</label> <input type="date"
							name="policyDate" id="policyDate" required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="maturityDate">PAYOFF DATE</label> <input type="date"
							name="maturityDate" id="maturityDate" required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>CUSTOMER CODE</label> <input type="text"
							name="customerCode" id="customerCode" required="required"
							placeholder="ENTER CUSTOMER CODE"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="clientName">CUSTOMER NAME  </label> <input type="text"
							name="clientName" id="clientName" required="required"
							placeholder="ENTER CUSTOMER NAME"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>BRANCH NAME</label> <input type="text" name="branchname"
							id="branchname" placeholder="ENTER BRANCH NAME"
							required="required" style="text-transform: uppercase;" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>CONTACT NO</label> <input type="text" name="contactNo"
							id="contactNo" placeholder="ENTER CONTACT NO." required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="policyAmount">POLICY AMOUNT</label> <input type="text"
							name="policyAmount" id="policyAmount" required="required"
							placeholder="ENTER POLICY AMONUT"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label> POLICY TYPE  </label> <input type="text" name="policyType"
							id="policyType" required="required"
							placeholder="ENTER POLICY TYPE "             "
							style="text-transform: uppercase;" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label for="policyTerm">POLICY TERM</label> <input type="text"
							name="policyTerm" id="policyTerm" required="required"
							placeholder="ENTER POLICY TERM "
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="maturityAmount">MATURITY AMOUNT </label> <input
							type="text" name="maturityAmount" id="maturityAmount"
							required="required" placeholder="ENTER MATURITY AMOUNT"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label> TOTAL DEPOSITS  </label> <input type="text"
							name="totalDeposit" id="totalDeposit" required="required"
							placeholder="ENTER TOTAL DEPOSITED" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="paymentDue"> PAYMENT DUE  </label> <input type="text"
							name="paymentDue" id="paymentDue" required="required"
							placeholder="ENTER PAYMENT DUE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="lastPaymentDate">LAST PAYMENT DATE  </label> <input
							type="text" name="lastPaymentDate" id="lastPaymentDate"
							required="required" placeholder="ENTER LAST INST. PAID " />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="dueDate">DEADLINE </label> <input type="date"
							name="dueDate" id="dueDate" required="required"
							placeholder="ENTER MEM CODE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="noOfInst">NO OF INSTALLMENTS </label> <input
							type="text" name="noOfInst" id="noOfInst" required="required"
							placeholder="ENTER INSTALLMENTS COMPLETED   " />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label for="noOfInstPaid">INSTALLMENT COMPLETED  </label> <input
							type="text" name="noOfInstPaid" id="noOfInstPaid"
							required="required" placeholder="ENTER INSTALLMENT COMPLETED  " />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="modeOfPayment">MODE OF PAYMENT </label> <select
							id="modeOfPayment" name="modeOfPayment" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT PAYMODE</option>
							<option value="Cash">CASH</option>
							<option value="Online">ONLINE</option>


						</select>
					</div>
				</div>

			</div>

		</div>


		<div class="mt-5">


			<div class="row">
				<div class="col-12 text-center" style="margin-top: 30px;">
					<button type="button" id="printBtn" class="btnStyle bg-primary">VIEW
						INSTALLMENT</button>
					<button type="button" id="deleteBtn" class="btnStyle bg-danger"
						style="background-color: #FFA500;">DELETE LAST ENTRY</button>
				</div>
			</div>

		</div>

	</form>

</div>

<script
	src="${pageContext.request.contextPath}/js/dataCorrection/renewalDataCorrection.js"></script>
