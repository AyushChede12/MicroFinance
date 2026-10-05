
<div class="pagetitle">
	<h1>MATURITY MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-calendar-check"></i>
			</a></li>
			<li class="breadcrumb-item action">PARTIAL MATURITY PAYMENT</li>
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
				<div class="col-lg-3">

					<div class="d-flex flex-column formFields">
						<label for="">PLAN TYPE :<span id="star"> *</span></label> <select
							id="plantype" name="plantype" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="Select">SELECT</option>
							<option value="RD">RD</option>
							<option value="FD">FD</option>
							<option value="MIS">MIS</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<input type="hidden" name="id" id="id">
					<div class="d-flex flex-column formFields">
						<label for="policyCode">POLICY CODE</label> <select
							id="policyCode" name="policyCode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">-- POLICY CODE --</option>

						</select>
					</div>
				</div>



			</div>
			<div class="mt-5">
				<nav>
					<ol class="breadcrumb breadcrumb-title">
						<li class="breadcrumb-item action">POLICY DEATILS </li>
					</ol>
				</nav>
				<div class="row">
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="vehicalNo">PLAN CODE:</label> <input type="text"
								name="planCode" id="planCode" required="required" placeholder="ENTER PLAN CODE"
								style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="vehicalNo">CUSTOMER NAME :</label> <input type="text"
								name="customerName" id="customerName" required="required"
								placeholder="ENTER CUSTOMER NAME" style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>POLICY NAME :</label> <input type="text" name="policyName"
								id="policyName" required="required" placeholder="ENTER POLICY NAME"
								style="text-transform: uppercase;" />
						</div>
					</div>




					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>DURATION:</label> <input type="text" name="duration"
								id="duration" required="required" placeholder="" />

						</div>

					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>POLICY AMOUNT :</label> <input type="text"
								name="policyAmount" id="policyAmount" required="required"
								placeholder="ENTER POLICY AMOUNT" />

						</div>

					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>ACTUAL MATURITY:</label> <input type="text"
								name="maturityAmount" id="maturityAmount" required="required"
								placeholder="" />

						</div>

					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>MATURITY DATE:</label> <input type="text"
								name="maturityDate" id="maturityDate" required="required"
								placeholder="" />

						</div>

					</div>
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>SYS.PAYABLE:</label> <input type="text" name="sysPayable"
								id="sysPayable" required="required" placeholder="SYSPAYABLE"
								value="sysPayable" />

						</div>

					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>DEDUCTION(-):</label> <input type="text" name="deduction"
								id="deduction" required="required" placeholder="DEDUCTION"
								value="deduction " />

						</div>

					</div>


					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>NET PAYABLE :</label> <input type="text" name="netPayable"
								id="netPayable" required="required" placeholder="" />

						</div>

					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>APPROVAL BRANCH  NAME:</label> <input type="text"
								name="Approvebranch" id="Approvebranch" required="required" />

						</div>

					</div>



					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>APPROVE STATUS :</label> <input type="text"
								name="approveStatus" id="approveStatus" required="required"
								value="NotApproved" readonly="readonly" />

						</div>

					</div>


					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<input type="hidden" name="id" id="id">
							<div class="d-flex flex-column formFields">
								<label> USER APPROVER :</label> <select id="userApprover"
									name="userApprover" required="required"
									class="form-control selectField" style="height: 30px;">
									<option value="">TEAM MEMBER</option>

								</select>
							</div>

						</div>

					</div>

				</div>
			</div>


			<div class="mt-5">
				<nav>
					<ol class="breadcrumb breadcrumb-title">
						<li class="breadcrumb-item action">PAYABLE DETAILS</li>
					</ol>
				</nav>
				<div class="row">
					<div class="col-lg-3">

						<div class="d-flex flex-column formFields">
							<label for="">CLOSING DATE : <span id="star"> *</span></label> <input
								type="date" name="closingDate" id="closingDate"
								required="required" placeholder=""
								style="text-transform: uppercase;" />
						</div>
					</div>


					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="vehicalNo">PAID AMOUNT: <span id="star">
									*</span></label> <input type="text" name="depositAmount" id="depositAmount"
								required="required" placeholder=""
								style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>DUE AMOUNT :</label> <input type="text" name="dueAmount"
								id="dueAmount" required="required" placeholder=""
								style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>COMMEMT :</label> <input type="text" name="Comment"
								id="Comment" required="required" placeholder="" />
						</div>
					</div>
				</div>

			</div>



			<div class="row">
				<div class="col-12 text-center">
					<button id="saveBtn" class="btn btn-danger">BREAK</button>
				</div>
			</div>
		</div>
	</form>

</div>

<script
	src="${pageContext.request.contextPath}/js/MaturityManagement/partialmaturity.js"></script>