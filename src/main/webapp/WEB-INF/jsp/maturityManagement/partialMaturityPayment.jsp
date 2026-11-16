<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
								placeholder="PLAN CODE" style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="customerName">CUSTOMER NAME :</label>
							<input type="text" name="customerName" id="customerName" readonly="readonly"
								placeholder="CUSTOMER NAME" style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
							<label for="policyName">POLICY NAME :</label>
							<input type="text" name="policyName" id="policyName" readonly="readonly"
								placeholder="POLICY NAME" style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
							<label for="duration">DURATION :</label>
							<input type="text" name="duration" id="duration" readonly="readonly"
								placeholder="DURATION" style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
							<label for="policyAmount">POLICY AMOUNT :</label>
							<input type="text" name="policyAmount" id="policyAmount" readonly="readonly"
								placeholder="POLICY AMOUNT" style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
							<label for="maturityAmount">ACTUAL MATURITY :</label>
							<input type="text" name="maturityAmount" id="maturityAmount" readonly="readonly"
								placeholder="MATURITY AMOUNT" style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
							<label for="maturityDate">MATURITY DATE :</label>
							<input type="text" name="maturityDate" id="maturityDate" readonly="readonly"
								placeholder="MATURITY DATE" style="text-transform: uppercase;" />
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
								placeholder="DEDUCTION" style="text-transform: uppercase;" />
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
						<div class="d-flex flex-column formFields">
							<label for="closingDate">CLOSING DATE : <span id="star">*</span></label>
							<input type="date" name="closingDate" id="closingDate" required="required"
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

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
							<label for="Comment">COMMENT : <span id="star">*</span></label>
							<input type="text" name="Comment" id="Comment" required="required"
								placeholder="ENTER COMMENT" style="text-transform: uppercase;" />
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-12 text-center">
					<button type="submit" id="saveBtn" class="btn btn-danger">PROCESS PARTIAL MATURITY</button>
				</div>
			</div>
		</div>
	</form>
</div>

<script src="${pageContext.request.contextPath}/js/MaturityManagement/partialmaturity.js"></script>
