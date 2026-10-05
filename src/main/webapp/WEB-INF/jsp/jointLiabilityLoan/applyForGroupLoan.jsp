
<div class="pagetitle">
	<h1>JOINT LIABILITY LOAN</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"><i
					class="bi bi-person-bounding-box"></i></a></li>
			<li class="breadcrumb-item action">APPLY FOR GROUP LOAN</li>
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
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="groupCode">FIND BY GROUP CODE*</label> <select
							id="groupCode" name="groupCode" required
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT CUSTOMER NAME</option>
						</select>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">GROUP PROFILE</li>
				</ol>
			</nav>
			<div class="col-lg-3" style="display: none;">
				<div class="d-flex flex-column formFields">
					<label>SELECTED MEMBER*</label> <input type="hidden"
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
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="openingDate">OPENING DATE*</label> <input type="date"
							name="openingDate" id="openingDate" required
							placeholder="ENTER OPENING DATE"
							style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="communityName">COMMUNITY NAME*</label> <input
							type="text" name="communityName" id="communityName" required
							placeholder="ENTER COMMUNITY NAME" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="communityName">COMMUNITY ADDRESS*</label> <input
							type="text" name="communityaddress" id="communityaddress"
							required placeholder="ENTER COMMUNITY NAME" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="allocatedStaff">ALLOCATED STAFF*</label> <input
							type="text" name="allocatedStaff" id="allocatedStaff" required
							placeholder="ENTER ALLOCATED STAFF" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
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
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="communityLeader">COMMUNITY LEADER*</label> <input
							type="text" name="communityLeader" id="communityLeader" required
							placeholder="ENTER COMMUNITY LEADER" />
					</div>
				</div>


				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label>COMMUNITY ADDRESS*</label> <input type="text"
							id="communityAddress" name="communityAddress"
							class="form-control" required placeholder="ENTER ADDRESS" />
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
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanSchemeName"> LOAN SCHEME NAME </label> <input
							type="text" name="loanSchemeName" id="loanSchemeName" required
							placeholder="ENTER LOAN SCHEME" />
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
							name="planCode" value="${memberCodePI}" class="form-control"
							required />
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
						<label for="insuranceFee">INSURENCE.FEE(%)*</label> <input
							type="text" name="insuranceFee" id="insuranceFee" required
							placeholder="ENTER INSURANCE FEE" />
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
						<label for="penaltyMode">PENALTY MODE*</label> <input type="text"
							name="penaltyMode" id="penaltyMode" required
							placeholder="ENTER PENALTY MODE" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="monthlyPenalty">MONTHLY PENALTY*</label> <input
							type="text" name="monthlyPenalty" id="monthlyPenalty" required
							placeholder="ENTER MONTHLY PENALTY" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="emiFrequency">EMI FREQUENCY*</label> <input
							type="text" name="emiFrequency" id="emiFrequency" required
							placeholder="ENTER EMI FREQUENCY" />
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
							type="text" name="term" id="term" required
							placeholder="ENTER TERM" />


					</div>
				</div>

				<!-- Hidden fields to store min/max loan limits (you can fill them dynamically) -->
				<input type="hidden" id="minLoanAmt" name="minLoanAmt"> <input
					type="hidden" id="maximumLoanAmount" name="maximumLoanAmount">


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="interestType">INTEREST TYPE*</label> <input
							type="text" name="interestType" id="interestType" required
							placeholder="ENTER TERM" />

					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="emiType">EMI MODE*</label> <input type="text"
							name="emiType" id="emiType" required placeholder="ENTER TERM" />


					</div>
				</div>



			</div>

			<div class="row">
				<div class="col-12 text-center">
					<button id="saveBtn" name="saveBtn" class="btnStyle bg-success"
						style="margin-left: 80%">SAVE</button>
				</div>
			</div>
		</div>
	</form>
</div>
<div class="row mt-5">
	<div class="col-12">
		<div class="card recent-sales">
			<div class="card-body table-responsive">
				<h5 class="card-title">DETAILS SEARCH LIST</h5>
				<table class="table table-bordered">
					<thead class="thead-light">
						<tr>
							<th>GROP ID</th>
							<th>PLAN CODE</th>
							<th>GROUP LEADER</th>
							<th>LOAN PLAN NAME </th>
							<th>GROUP MEMBER ID'S</th>
							<th>GROUP MEMBER NAME</th>
							<th>EMI TYPE</th>
							<th>GL CONTACT NO</th>

						</tr>
					</thead>
					<tbody id="groupLoanBody">


						<!-- More rows -->
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<script
	src="${pageContext.request.contextPath}/js/Joinlibiliy/ApplyForGroupLoan.js"></script>
