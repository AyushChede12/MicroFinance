<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="pagetitle">
	<h1>MATURITY MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-calendar-check"></i>
			</a></li>
			<li class="breadcrumb-item action">MATURITY SCHEME MASTER</li>
		</ol>
	</nav>
</div>

<div>
	<!-- DAILY DEPOSIT -->
	<form id="formdd">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">DAILY DEPOSIT</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="ddPolicyCode">POLICY CODE <span id="star">*</span></label>
						<select id="ddPolicyCode" name="ddPolicyCode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT POLICY CODE</option>
						</select>
						<small id="chkpolicycodeD" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="ddInstFrom">INST. FROM <span id="star">*</span></label>
						<select id="ddInstFrom" name="ddInstFrom" required="required"
							class="form-control selectField monthname" style="height: 30px;">
							<option value="">SELECT MONTH</option>
						</select>
						<small id="finstallD" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="ddInstTo">INST. TO <span id="star">*</span></label>
						<select id="ddInstTo" name="ddInstTo" required="required"
							class="form-control selectField monthname" style="height: 30px;">
							<option value="">SELECT MONTH</option>
						</select>
						<small id="tinstallD" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="ddInterestRate">INTEREST RATE (IN %) <span id="star">*</span></label>
						<input type="text" name="ddInterestRate" id="ddInterestRate"
							required="required" placeholder="ENTER ROI" style="text-transform: uppercase;" />
						<small id="chkintrestD" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="ddDeduction">DEDUCTION (IN %)</label>
						<input type="text" name="ddDeduction" id="ddDeduction" required="required"
							placeholder="ENTER DEDUCTION" style="text-transform: uppercase;" />
						<small id="chkdeductionD" style="color: red;"></small>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12 text-center">
					<button type="submit" id="ddsaveBtn" class="btn btn-info">SAVE</button>
				</div>
			</div>
		</div>
	</form>

	<!-- RECURRING DEPOSIT -->
	<form id="formrd">
		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">RECURRING DEPOSIT</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="rdPolicyCode">POLICY CODE <span id="star">*</span></label>
						<select id="rdPolicyCode" name="rdPolicyCode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT POLICY CODE</option>
						</select>
						<small id="chkpolicycodeR" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="rdInstFrom">INST. FROM <span id="star">*</span></label>
						<select id="rdInstFrom" name="rdInstFrom" required="required"
							class="form-control selectField monthname" style="height: 30px;">
							<option value="">SELECT MONTH</option>
						</select>
						<small id="finstallR" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="rdInstTo">INST. TO <span id="star">*</span></label>
						<select id="rdInstTo" name="rdInstTo" required="required"
							class="form-control selectField monthname" style="height: 30px;">
							<option value="">SELECT MONTH</option>
						</select>
						<small id="tinstallR" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="rdInterestRate">INTEREST RATE (IN %) <span id="star">*</span></label>
						<input type="text" name="rdInterestRate" id="rdInterestRate"
							required="required" placeholder="ENTER ROI" style="text-transform: uppercase;" />
						<small id="chkintrestR" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="rdDeduction">DEDUCTION (IN %)</label>
						<input type="text" name="rdDeduction" id="rdDeduction" required="required"
							placeholder="ENTER DEDUCTION" style="text-transform: uppercase;" />
						<small id="chkdeductionR" style="color: red;"></small>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-12 text-center">
					<button type="submit" id="rdsaveBtn" class="btn btn-info">SAVE</button>
				</div>
			</div>
		</div>
	</form>

	<!-- FIXED DEPOSIT -->
	<form id="formfd">
		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">FIXED DEPOSIT</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="fdPolicyCode">POLICY CODE <span id="star">*</span></label>
						<select id="fdPolicyCode" name="fdPolicyCode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT POLICY CODE</option>
						</select>
						<small id="chkpolicycodeF" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="fdInstFrom">MONTHS FROM <span id="star">*</span></label>
						<select id="fdInstFrom" name="fdInstFrom" required="required"
							class="form-control selectField monthname" style="height: 30px;">
							<option value="">SELECT MONTH</option>
						</select>
						<small id="finstallF" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="fdInstTo">MONTHS TO <span id="star">*</span></label>
						<select id="fdInstTo" name="fdInstTo" required="required"
							class="form-control selectField monthname" style="height: 30px;">
							<option value="">SELECT MONTH</option>
						</select>
						<small id="tinstallF" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="fdInterestRate">INTEREST RATE (IN %) <span id="star">*</span></label>
						<input type="text" name="fdInterestRate" id="fdInterestRate"
							required="required" placeholder="ENTER ROI" style="text-transform: uppercase;" />
						<small id="chkintrestF" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="fdDeduction">DEDUCTION (IN %)</label>
						<input type="text" name="fdDeduction" id="fdDeduction" required="required"
							placeholder="ENTER DEDUCTION" style="text-transform: uppercase;" />
						<small id="chkdeductionF" style="color: red;"></small>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-12 text-center">
					<button type="submit" id="fdsaveBtn" class="btn btn-info">SAVE</button>
				</div>
			</div>
		</div>
	</form>

	<!-- MIS DEPOSIT -->
	<form id="formmis">
		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">MIS DEPOSIT</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="mPolicyCode">POLICY CODE <span id="star">*</span></label>
						<select id="mPolicyCode" name="mPolicyCode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT POLICY CODE</option>
						</select>
						<small id="chkpolicycodeM" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="misInstFrom">MONTH FROM <span id="star">*</span></label>
						<select id="misInstFrom" name="misInstFrom" required="required"
							class="form-control selectField monthname" style="height: 30px;">
							<option value="">SELECT MONTH</option>
						</select>
						<small id="finstallM" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="misInstTo">MONTHS TO <span id="star">*</span></label>
						<select id="misInstTo" name="misInstTo" required="required"
							class="form-control selectField monthname" style="height: 30px;">
							<option value="">SELECT MONTH</option>
						</select>
						<small id="tinstallM" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="misInterestRate">INTEREST RATE (IN %) <span id="star">*</span></label>
						<input type="text" name="misInterestRate" id="misInterestRate"
							required="required" placeholder="ENTER ROI" style="text-transform: uppercase;" />
						<small id="chkintrestM" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="misDeduction">DEDUCTION (IN %)</label>
						<input type="text" name="misDeduction" id="misDeduction" required="required"
							placeholder="ENTER DEDUCTION" style="text-transform: uppercase;" />
						<small id="chkdeductionM" style="color: red;"></small>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-12 text-center">
					<button type="submit" id="missaveBtn" class="btn btn-info">SAVE</button>
				</div>
			</div>
		</div>
	</form>
</div>

<script src="${pageContext.request.contextPath}/js/MaturityManagement/maturityscheme.js"></script>
