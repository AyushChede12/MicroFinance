<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="pagetitle">
	<h1>MATURITY MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-calendar-check"></i>
			</a></li>
			<li class="breadcrumb-item action">FULL MATURITY PAYMENT</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH BOX</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="plantype">PLAN TYPE : <span id="star">*</span></label>
						<select id="plantype" name="plantype" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">-- SELECT PLAN TYPE --</option>
							<option value="DRD">DRD</option>
							<option value="RD">RD</option>
							<option value="FD">FD</option>
							<option value="MIS">MIS</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<input type="hidden" name="id" id="id">
					<div class="d-flex flex-column formFields">
						<label for="policyCode">POLICY CODE : <span id="star">*</span></label>
						<select id="policyCode" name="policyCode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">-- SELECT POLICY CODE --</option>
						</select>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">POLICY DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="planCode">PLAN CODE :</label>
						<input type="text" name="planCode" id="planCode" readonly="readonly"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="policyName">POLICY NAME :</label>
						<input type="text" name="policyName" id="policyName" readonly="readonly"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="customerName">CUSTOMER NAME :</label>
						<input type="text" name="customerName" id="customerName" readonly="readonly"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="duration">DURATION :</label>
						<input type="text" name="duration" id="duration" readonly="readonly"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="policyAmount">POLICY AMOUNT :</label>
						<input type="text" name="policyAmount" id="policyAmount" readonly="readonly"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="maturityAmount">ACTUAL MATURITY :</label>
						<input type="text" name="maturityAmount" id="maturityAmount" readonly="readonly"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="maturityDate">MATURITY DATE :</label>
						<input type="text" name="maturityDate" id="maturityDate" readonly="readonly"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="sysPayable">SYS. PAYABLE :</label>
						<input type="text" name="sysPayable" id="sysPayable" readonly="readonly"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="deduction">DEDUCTION (-) :</label>
						<input type="text" name="deduction" id="deduction"
							placeholder="ENTER DEDUCTION" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="netPayable">NET PAYABLE :</label>
						<input type="text" name="netPayable" id="netPayable" readonly="readonly"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="Approvebranch">APPROVAL BRANCH :</label>
						<input type="text" name="Approvebranch" id="Approvebranch" readonly="readonly"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="approveStatus">APPROVE STATUS :</label>
						<input type="text" name="approveStatus" id="approveStatus" readonly="readonly"
							value="NOT APPROVED" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="userApprover">USER APPROVER : <span id="star">*</span></label>
						<select id="userApprover" name="userApprover" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">-- SELECT TEAM MEMBER --</option>
						</select>
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
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="panelty">PENALTY (IF ANY) :</label>
						<input type="text" name="panelty" id="panelty" value="0.00"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="amount">AMOUNT : <span id="star">*</span></label>
						<input type="text" name="amount" id="amount" required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="depositAmount">TOTAL PAID AMOUNT : <span id="star">*</span></label>
						<input type="text" name="depositAmount" id="depositAmount" required="required"
							readonly="readonly" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="dueAmount">DUE AMOUNT :</label>
						<input type="text" name="dueAmount" id="dueAmount" required="required"
							readonly="readonly" style="text-transform: uppercase;" />
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
					<div class="d-flex flex-column formFields">
						<label for="paymentDate">PAYMENT DATE : <span id="star">*</span></label>
						<input type="date" name="paymentDate" id="paymentDate" required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="branchName">PAY BRANCH : <span id="star">*</span></label>
						<select id="branchName" name="branchName" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">-- SELECT BRANCH --</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="payRemark">PAY REMARK :</label>
						<input type="text" name="payRemark" id="payRemark"
							placeholder="ENTER REMARK" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="modeofPayment">MODE OF PAYMENT : <span id="star">*</span></label>
						<select id="modeofPayment" name="modeofPayment" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">-- SELECT MODE --</option>
							<option value="CASH">CASH</option>
							<option value="ONLINE">ONLINE</option>
							<option value="NEFT">NEFT</option>
							<option value="RTGS">RTGS</option>
							<option value="CHEQUE">CHEQUE</option>
						</select>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-12 text-center">
					<button type="submit" id="saveBtn" class="btn btn-success">PROCEED TO PAY</button>
				</div>
			</div>
		</div>
	</form>
</div>

<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLongTitle">TOTAL PAYMENT CONFIRMATION</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">YOU HAVE TO PAY :</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">CANCEL</button>
				<button type="button" id="Pay" class="btn btn-primary" data-dismiss="modal">CONFIRM &amp; PAY</button>
			</div>
		</div>
	</div>
</div>

<script src="${pageContext.request.contextPath}/js/MaturityManagement/maturitypayment.js"></script>
