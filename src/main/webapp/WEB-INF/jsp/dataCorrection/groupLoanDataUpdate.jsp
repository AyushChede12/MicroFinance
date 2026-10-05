
<div class="pagetitle">
	<h1>DATE CORRECTION</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"><i
					class="bi bi-person-bounding-box"></i></a></li>
			<li class="breadcrumb-item action">JOINT LIABILITY UPDATE</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">DATA SEARCH PANEL</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-5">
					<input type="hidden" name="id" id="id">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 20px;">
						<label for="groupCode">FIND BY GROUP CODE</label> <select
							id="groupCode" name="groupCode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">-- SEARCH GROUP CODE --</option>
						</select>
					</div>
				</div>

			</div>
		</div>

		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">GROUP PROFILS</li>
				</ol>
			</nav>
			<div class="col-lg-3" style="display: none;">
				<div class="d-flex flex-column formFields">
					<label>SELECTED MAMBER*</label> <input type="hidden"
						id="selectedMember" name="selectedMember" class="form-control"
						required />
				</div>
			</div>

			<div class="col-lg-3" style="display: none;">
				<div class="d-flex flex-column formFields">
					<label>CUSTOMER NAME*</label> <input type="hidden"
						id="customerName" name="customerName" class="form-control"
						required />
				</div>
			</div>

			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="openingDate">OPENING DATE*</label> <input type="date"
							name="openingDate" id="openingDate" required
							placeholder="ENTER OPENING DATE"
							style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="communityName">COMMUNITY NAME*</label> <input
							type="text" name="communityName" id="communityName" required
							placeholder="ENTER COMMUNITY NAME" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="allocatedStaff">ALLOCATED STAFF*</label> <input
							type="text" name="allocatedStaff" id="allocatedStaff" required
							placeholder="ENTER ALLOCATED STAFF" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="branchName">BRANCH NAME*</label> <select
							id="branchName" name="branchName" required
							class="form-control selectField" style="height: 30px;"></select>
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="collectionDays">SCHEDULED COLLECTION DAYS *</label> <input
							type="text" name="collectionDays" id="collectionDays" required
							placeholder="ENTER COLLECTION DAYS" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="communityLeader">COMMUNITY LEADER*</label> <input
							type="text" name="communityLeader" id="communityLeader" required
							placeholder="ENTER COMMUNITY LEADER" />
					</div>
				</div>
				<div class="col-lg-3  mb-4">
					<div class="d-flex flex-column formFields">
						<label for="contactNumber">CONTACT NUMBER*</label> <input
							type="text" name="contactNumber" id="contactNumber" required
							placeholder="ENTER CONTACT NUMBER" />
					</div>
				</div>
				<div class="col-lg-3  mb-4">
					<div class="d-flex flex-column formFields">
						<label for="loanPurpose">PURPOSE OF LOAN *</label> <input
							type="text" name="loanPurpose" id="loanPurpose" required
							placeholder="ENTER LOAN PURPOSE" />
					</div>
				</div>
			</div>
		</div>

		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">FINANCIAL DEDUCTIONS </li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3 ">
					<div class="d-flex flex-column formFields">
						<label for="planCode">FETCH BY PLAN CODE *</label> <select
							id="planCode" name="planCode" required
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT PLAN CODE</option>
						</select>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="communityLeader">LOAN SCHEME NAME*</label> <input
							type="text" name="loanSchemeName" id="loanSchemeName" required
							placeholder="ENTER COMMUNITY LEADER " />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="processingFee">PROCESSING FEE (%)*</label> <input
							type="text" name="processingFee" id="processingFee" required
							placeholder="ENTER PROCESSING FEE" />
					</div>
				</div>
				<div class="col-lg-3" style="display: none;">
					<div class="d-flex flex-column formFields">
						<label>PLAN ID*</label> <input type="hidden" id="planCode"
							name="planCode" class="form-control" required />
					</div>
				</div>


				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="legalCharges">LEGAL CHARGES (%)*</label> <input
							type="text" name="legalCharges" id="legalCharges" required
							placeholder="ENTER LEGAL CHARGES" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="gstPercentage">GST(%)*</label> <input type="text"
							name="gstPercentage" id="gstPercentage" required
							placeholder="ENTER GST" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="insuranceFee">INSURANENCE.FEE(%)*</label> <input
							type="text" name="insuranceFee" id="insuranceFee" required
							placeholder="ENTER INSURANENCE Fee" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="valuationFee">VALUATION FEE (%)*</label> <input
							type="text" name="valuationFee" id="valuationFee" required
							placeholder="ENTER VALUATION FEE" />
					</div>
				</div>

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="penaltyMode">PENATLY MODE*</label> <input type="text"
							name="penaltyMode" id="penaltyMode" required
							placeholder="ENTER PENALTY MODE" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="monthlyPenalty">MONTHLY PENATLY*</label> <input
							type="text" name="monthlyPenalty" id="monthlyPenalty" required
							placeholder="ENTER MONTHLY PENATLY" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="emiFrequency">EMI FREQUENCY*</label> <input
							type="text" name="emiFrequency" id="emiFrequency" required
							placeholder="ENTER EMI FREQUENCE" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="rateOfInterest">RATE OF INTEREST (% P.A.)*</label> <input
							type="text" name="rateOfInterest" id="rateOfInterest" required
							placeholder="ENTER RATE OF INTEREST" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="minLoanDurationMonths">TERM * </label> <input
							type="text" name="Term" id="Term" required
							placeholder="ENTER TERM" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="minLoanDurationMonths">TOTAL AMOUNT* </label> <input
							type="text" name="totalAmount" id="totalAmount" required
							placeholder="ENTER TERM" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="interestType">INTEREST TYPE*</label> <select
							name="interestType" id="interestType" required
							class="form-control selectField" style="height: 30px;">

							<option value="">-- SELECT INTEREST TYPE --</option>
							<option value="flatInterest">FLAT INTEREST</option>
							<option value="reducingInterest">REDUCING INTEREST</option>
							<option value="Rule78">RULE 78</option>

						</select>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="emiType">EMI MODE*</label><select name="emiType"
							id="emiType" required class="form-control selectField">
							<option value="">-- SELECT EMI MODE --</option>
							<option value="daily">DAILY</option>
							<option value="weekly">WEEKLY</option>
							<option value="monthly">MONTHLY</option>
							<option value="fortnightly">FORTNIGHTLY</option>
							<option value="quarterly">QUARTERLY </option>
						</select>

					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">DATE OF APPROVAL*</label> <input
							type="date" name="approvalDate" id="approvalDate"
							required="required" placeholder=""
							style="text-transform: uppercase;" />
					</div>
				</div>
			</div>

			<div class="mt-5">
				<div class="row">
					<div class="col-12 text-center" style="margin-top: 30px;">
						<button type="button" id="updateBtn" class="btnStyle bg-warning">UPDATE</button>
						<button type="button" id="newBtn" class="btnStyle bg-primary"
							style="background-color: #FFA500;">NEW</button>
						<button type="button" id="deleteBtn" class="btnStyle bg-danger">DELETE</button>
					</div>
				</div>
			</div>
		</div>
	</form>
</div>

<script
	src="${pageContext.request.contextPath}/js/dataCorrection/jointLiabiliyUpdate.js"></script>
