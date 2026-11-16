
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
			<div class="row mt-4">
				<div class="col-12 text-center d-flex justify-content-end align-items-center gap-2">
					<button type="button" id="printSanctionBtn" class="btn btn-primary" style="display: none; height: 35px; min-width: 200px; font-weight: 600; text-transform: uppercase;">
						<i class="bi bi-printer"></i> PRINT SANCTION LETTER
					</button>
					<button type="button" id="approveBtn" class="btnStyle bg-success" style="height: 35px; min-width: 140px; font-weight: 600; text-transform: uppercase;">APPROVE</button>
				</div>
			</div>
		</div>

	</form>

	<!-- Printable Sanction Letter Area -->
	<div id="printableSanctionArea" style="display: none;">
		<div style="font-family: Arial, sans-serif; padding: 30px; color: #000; line-height: 1.5;">
			<div style="text-align: center; margin-bottom: 25px;">
				<h2 id="sanctionCompName" style="margin: 0; font-size: 22px; font-weight: bold; color: #0d6efd; letter-spacing: 0.5px; text-transform: uppercase;"></h2>
				<p id="sanctionCompAddress" style="margin: 4px 0 2px 0; font-size: 12px; color: #444; text-transform: uppercase;"></p>
				<p id="sanctionCompRegLine" style="margin: 2px 0; font-size: 11px; color: #555; text-transform: uppercase;"></p>
				<p id="sanctionCompContact" style="margin: 2px 0; font-size: 11px; color: #555; text-transform: uppercase;"></p>
				<hr style="border: 0; border-top: 2px solid #000; margin: 12px 0 18px 0;">
				<h3 style="margin: 5px 0; font-size: 16px; font-weight: bold; text-decoration: underline; text-transform: uppercase;">
					JOINT LIABILITY GROUP LOAN SANCTION / APPROVAL ADVICE
				</h3>
			</div>

			<table style="width: 100%; font-size: 12px; margin-bottom: 20px; border-collapse: collapse;">
				<tr>
					<td style="width: 20%; padding: 5px 0;"><b>GROUP CODE:</b></td>
					<td style="width: 30%; padding: 5px 0;"><span id="sanctGroupCode"></span></td>
					<td style="width: 20%; padding: 5px 0;"><b>DATE OF APPROVAL:</b></td>
					<td style="width: 30%; padding: 5px 0;"><span id="sanctApprovalDate"></span></td>
				</tr>
				<tr>
					<td style="padding: 5px 0;"><b>COMMUNITY / GROUP:</b></td>
					<td style="padding: 5px 0;"><span id="sanctCommunityName"></span></td>
					<td style="padding: 5px 0;"><b>APPLICATION DATE:</b></td>
					<td style="padding: 5px 0;"><span id="sanctOpeningDate"></span></td>
				</tr>
				<tr>
					<td style="padding: 5px 0;"><b>BRANCH NAME:</b></td>
					<td style="padding: 5px 0;"><span id="sanctBranchName"></span></td>
					<td style="padding: 5px 0;"><b>ALLOCATED OFFICER:</b></td>
					<td style="padding: 5px 0;"><span id="sanctAllocatedStaff"></span></td>
				</tr>
				<tr>
					<td style="padding: 5px 0;"><b>CONTACT NUMBER:</b></td>
					<td style="padding: 5px 0;"><span id="sanctContactNumber"></span></td>
					<td style="padding: 5px 0;"><b>COLLECTIONS SCHEDULE:</b></td>
					<td style="padding: 5px 0;"><span id="sanctCollectionDays"></span></td>
				</tr>
				<tr>
					<td style="padding: 5px 0;"><b>PURPOSE OF LOAN:</b></td>
					<td style="padding: 5px 0;" colspan="3"><span id="sanctPurpose"></span></td>
				</tr>
			</table>

			<div style="font-size: 12px; margin: 20px 0; text-align: justify; line-height: 1.6;">
				<p>DEAR BORROWERS,</p>
				<p>
					WE ARE PLEASED TO CONVEY THAT THE COMPETENT CREDIT SANCTIONING AUTHORITY OF <b><span id="sanctionCompBodyName"></span></b> 
					HAS APPROVED AND SANCTIONED THE JOINT LIABILITY GROUP LOAN FACILITY IN RESPECT OF GROUP CODE <b><span id="sanctGroupCode2"></span></b> 
					UNDER MUTUAL JOINT LIABILITY TERMS AND CONDITIONS OF THE SCHEME.
				</p>
				<p>
					THE SANCTION IS SUBJECT TO EXECUTION OF LOAN AGREEMENT, PROMISSORY NOTES, GROUP GUARANTEE, AND COMPLETION OF DISBURSEMENT DOCUMENTATION.
				</p>
			</div>

			<div style="margin-top: 60px; display: flex; justify-content: space-between; font-size: 12px; text-align: center; text-transform: uppercase;">
				<div style="width: 30%;">
					<div style="border-top: 1px solid #000; padding-top: 5px;">
						<b>GROUP REPRESENTATIVE</b><br>
						<span>SIGNATURE / THUMB</span>
					</div>
				</div>
				<div style="width: 30%;">
					<div style="border-top: 1px solid #000; padding-top: 5px;">
						<b>LOAN OFFICER / INSPECTOR</b><br>
						<span>VERIFIED & RECOMMENDED</span>
					</div>
				</div>
				<div style="width: 30%;">
					<div style="border-top: 1px solid #000; padding-top: 5px;">
						<b>BRANCH MANAGER</b><br>
						<span>SANCTIONING AUTHORITY</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script
	src="${pageContext.request.contextPath}/js/Joinlibiliy/LoanApproval.js"></script>
