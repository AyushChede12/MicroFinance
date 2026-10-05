
<div class="pagetitle">
	<h1>JOINT LIABILITY LOAN</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-person-bounding-box"></i>
			</a></li>
			<li class="breadcrumb-item action">LOAN APPROVAL</li>
		</ol>
	</nav>
</div>


<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">DATA SEARCH PANAL</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">

					<div class="d-flex flex-column formFields">
						<label for="groupCode">FIND BY GROUP CODE*</label> <select
							id="groupcode" name="groupcode" required
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
					<li class="breadcrumb-item action">LAON DETAILS </li>
				</ol>
			</nav>
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

				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for="allocatedStaff">ALLOCATED STAFF*</label> <input
							type="text" name="allocatedStaff" id="allocatedStaff" required
							placeholder="ENTER ALLOCATED STAFF" />
					</div>
				</div>


				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for=""> BRANCH NAME* </label> <input type="text"
							name="branchName" id="branchName" required="required"
							placeholder="ENTER  BRANCH NAME" />
					</div>
				</div>
				<div class="col-lg-3 mb-4">
					<div class="d-flex flex-column formFields">
						<label for=""> COLLECTIONS SCHEDULE* </label> <input type="text"
							name="collectionDays" id="collectionDays" required="required"
							placeholder="ENTER LOACTION" />
					</div>
				</div>

				<div class="col-lg-3  mb-4">
					<div class="d-flex flex-column formFields">
						<label for=""> CONTACT NUMBER* </label> <input type="text"
							name="contactNumber" id="contactNumber" required="required"
							placeholder="ENTER CONTACT NUMBER" />
					</div>
				</div>
				<div class="col-lg-3  mb-4">
					<div class="d-flex flex-column formFields">
						<label for=""> PURPOSE OF LOAN* </label> <input type="text"
							name="purposeOfLoan" id="purposeOfLoan" required="required"
							placeholder="ENTER PURPOSE OF LOAN " />
					</div>
				</div>



			</div>
		</div>

		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">LOAN APPROVAL INFO </li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">DATE OF APPROVAL*</label> <input
							type="date" name="approvalDate" id="approvalDate"
							required="required" placeholder=""
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">APPROVAL STATUS </label> <input type="text"
							id="approvalStatus" name="approvalStatus" class="form-control"
							readonly
							style="font-size: 12px; font-weight: bold; text-transform: uppercase;" />
					</div>
				</div>



			</div>
			<div class="row">
				<div class="col-12 text-center">
					<button type="button" id="approveBtn" class="btnStyle bg-success"
						style="margin-left: 80%">APPROVE</button>

				</div>
			</div>
		</div>


	</form>

</div>

<script
	src="${pageContext.request.contextPath}/js/Joinlibiliy/LoanApproval.js"></script>
