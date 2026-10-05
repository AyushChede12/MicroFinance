
<div class="pagetitle">
	<h1>MATURITY MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-calendar-check"></i>
			</a></li>
			<li class="breadcrumb-item action">FULL MATURITY PAYMENT </li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SERACH BOX </li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">

					<div class="d-flex flex-column formFields">
						<label for="">PLAN TYPE  :<span id="star"> *</span></label> <select
							id="plantype" name="plantype" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="Select">SELECT</option>
							<option value="DRD">DRD</option>
							<option value="RD">RD</option>
							<option value="FD">FD</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<input type="hidden" name="id" id="id">
					<div class="d-flex flex-column formFields">
						<label for="policyCode">POLICY CODE </label> <select
							id="policyCode" name="policyCode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">-- POLICY CODE --</option>

						</select>
					</div>
				</div>

			</div>

		</div>


		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">POLICY DETAILS </li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">PLAN CODE :</label> <input type="text"
							name="planCode" id="planCode" required="required" placeholder="" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>POLICY NAME :</label> <input type="text" name="policyName"
							id="policyName" required="required" placeholder=""
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">CUSTOMER NAME  :</label> <input type="text"
							name="customerName" id="customerName" required="required"
							placeholder="" style="text-transform: uppercase;" />
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
							placeholder="" />

					</div>

				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>ACTUAL MATURITY :</label> <input type="text"
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
						<label>SYS.PAYABLE :</label> <input type="text" name="sysPayable"
							id="sysPayable" required="required" placeholder="" />

					</div>

				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>DEDUCTION(-):</label> <input type="text" name="deduction"
							id="deduction" required="required" placeholder="" />

					</div>

				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label> PAYABLE:</label> <input type="text" name="netPayable"
							id="netPayable" required="required" placeholder="" />

					</div>

				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>APPROVAL BRANCH :</label> <input type="text"
							name="Approvebranch" id="Approvebranch" required="required"
							placeholder="" />

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
								<option value="">--SELECT--</option>

							</select>
						</div>

					</div>

				</div>


			</div>
		</div>


		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">PAYABLE DETAIL</li>
				</ol>
			</nav>
			<div class="row">

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>PANELTY (IF ANY):</label> <input type="text" name="panelty"
							id="panelty" required="required" placeholder=""
							style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3">

					<div class="d-flex flex-column formFields">
						<label for="">AMOUNT: <span id="star"> *</span></label> <input
							type="text" name="amount" id="amount" required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">PAID AMOUNT : <span id="star">
								*</span></label> <input type="text" name="depositAmount" id="depositAmount"
							required="required" placeholder=""
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>DUE AMOUNT:</label> <input type="text" name="dueAmount"
							id="dueAmount" required="required" placeholder=""
							style="text-transform: uppercase;" />
					</div>
				</div>
			</div>
		</div>








		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">PAYMENT DEYTAIL </li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">

					<div class="d-flex flex-column formFields">
						<label for="">PAYMENT DATE : <span id="star"> *</span></label> <input
							type="date" name="paymentDate" id="paymentDate"
							required="required" placeholder=""
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">PAY BRANCH :<span id="star">
								*</span></label> <select id="branchName" name="branchName" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT</option>

						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>PAY REMARK:</label> <input type="text" name="payRemark"
							id="payRemark" required="required" placeholder=""
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">MODE OF PAYMENT <span id="star"> *</span></label> <select
							id="modeofPayment" name="modeofPayment" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="Select">SELECT</option>
							<option value="Online">ONLINE</option>
							<option value="Cash">CASH</option>

						</select>
					</div>
				</div>





			</div>

			<div class="row">
				<div class="col-12 text-center">
					<button id="saveBtn" class="btn btn-success">PAYMENT</button>
				</div>
			</div>
		</div>








	</form>


</div>

<div class="modal fade" id="exampleModalLong" tabindex="-1"
	role="dialog" aria-labelledby="exampleModalLongTitle"
	aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLongTitle">TOTAL
					PAYMENT</h5>
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">YOU HAVE TO PAY :</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				<button type="submit" id="Pay" class="btn btn-primary"
					data-dismiss="modal">PAY</button>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	function totalPayment() {
		let amount = parseFloat($('#amount').val()) || 0;
		let panelty = parseFloat($('#panelty').val()) || 0;
		let total = amount + panelty;

		$(".modal-body").html(
				"You Have to Pay : <strong>" + total
						+ "</strong><br>( Amount: " + amount + ", Penalty: "
						+ panelty + " )");
	}
</script>

<script
	src="${pageContext.request.contextPath}/js/MaturityManagement/maturitypayment.js"></script>