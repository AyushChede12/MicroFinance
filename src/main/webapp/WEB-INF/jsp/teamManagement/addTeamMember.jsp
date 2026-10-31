<script type="text/javascript">
function calculateAge() {
	const dobVal = document.getElementById("dateOfBirth").value;
	if (dobVal) {
		const dob = new Date(dobVal);
		const age = Math.floor((Date.now() - dob) / (365.25 * 24 * 60 * 60 * 1000));
		document.getElementById("age").value = (age > 0) ? age : 0;
	}
}
</script>

<style>
.formFields input, .formFields select, .formFields textarea {
	text-transform: uppercase;
}
.formFields input::placeholder, .formFields textarea::placeholder {
	text-transform: uppercase;
}
.error {
	border-color: #dc3545 !important;
}
</style>

<div class="pagetitle">
	<h1>TEAM MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-person-workspace"></i>
			</a></li>
			<li class="breadcrumb-item action">ADD TEAM MEMBER</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid" autocomplete="off">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">TEAM MEMBER DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px;">
						<label for="teamMemberCode">TEAM MEMBER CODE</label> 
						<input type="text" readonly="readonly" id="teamMemberCode" name="teamMemberCode"
							value="${teamMemberUniqueNo}" required="required"
							placeholder="ENTER TEAM MEMBER CODE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="signUpDate">SIGN-UP DATE</label> 
						<input type="date" name="signUpDate" id="signUpDate" required="required"
							placeholder="ENTER SIGN-UP DATE" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="branchName">BRANCH NAME</label> 
						<select id="branchName" name="branchName" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT BRANCH NAME</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="teamMemberName">TEAM MEMBER NAME</label> 
						<input type="text" style="text-transform: uppercase;" name="teamMemberName"
							id="teamMemberName" required="required"
							placeholder="ENTER TEAM MEMBER NAME" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px;">
						<label for="dateOfBirth">DATE OF BIRTH</label> 
						<input type="date" name="dateOfBirth" onchange="calculateAge()" id="dateOfBirth"
							required="required" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="age">AGE</label> 
						<input type="number" name="age" id="age" required="required" placeholder="ENTER AGE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="familyMemberName">FAMILY MEMBER NAME</label> 
						<input type="text" style="text-transform: uppercase;" name="familyMemberName"
							id="familyMemberName" required="required"
							placeholder="ENTER FAMILY MEMBER NAME" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="relationToApplicant">RELATION TO APPLICANT</label> 
						<select id="relationToApplicant" name="relationToApplicant"
							required="required" class="form-control selectField" style="height: 30px;">
							<option value="">--SELECT RELATION--</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px;">
						<label for="contactNo">CONTACT NO.</label> 
						<input type="text" maxlength="10" name="contactNo" id="contactNo" required="required"
							placeholder="ENTER CONTACT NO." />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="nomineeName">NOMINEE NAME</label> 
						<input type="text" style="text-transform: uppercase;" name="nomineeName"
							id="nomineeName" required="required" placeholder="ENTER NOMINEE NAME" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="nomineeAge">NOMINEE AGE</label> 
						<input type="number" name="nomineeAge" id="nomineeAge" required="required"
							placeholder="ENTER NOMINEE AGE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="relationWithNominee">RELATION WITH NOMINEE</label> 
						<select id="relationWithNominee" name="relationWithNominee"
							required="required" class="form-control selectField" style="height: 30px;">
							<option value="">--SELECT RELATION--</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px;">
						<label for="address">ADDRESS</label>
						<textarea name="address" id="address" style="text-transform: uppercase; border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"></textarea>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="pan">PAN</label> 
						<input type="text" name="pan" id="pan" maxlength="10"
							style="text-transform: uppercase;" required="required" placeholder="ENTER PAN" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="bankAC">BANK A/C</label> 
						<input type="text" name="bankAC" style="text-transform: uppercase;" id="bankAC"
							required="required" placeholder="ENTER BANK A/C" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="ifscCode">IFSC CODE</label> 
						<input type="text" style="text-transform: uppercase;" name="ifscCode" id="ifscCode"
							required="required" placeholder="ENTER IFSC CODE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="expDetails">EXP. DETAILS (IN YEARS)</label> 
						<input type="number" name="expDetails" id="expDetails" required="required"
							placeholder="ENTER EXP. DETAILS" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="educationalBackground">EDUCATIONAL BACKGROUND</label> 
						<input type="text" style="text-transform: uppercase;" name="educationalBackground"
							id="educationalBackground" required="required"
							placeholder="ENTER EDUCATIONAL BACKGROUND" />
					</div>
				</div>
			</div>
		</div>

		<div class="mt-4">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">DESIGNATION & DEPARTMENT DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="designation">DESIGNATION</label> 
						<select id="designation" name="designation" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT DESIGNATION</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="department">DEPARTMENT</label> 
						<select id="department" name="department" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT DEPARTMENT</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="salary">SALARY</label> 
						<input type="text" name="salary" id="salary" required="required" placeholder="ENTER SALARY" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="savingAccNo">SAVING ACCOUNT NO.</label> 
						<input type="text" name="savingAccNo" id="savingAccNo" required="required"
							placeholder="ENTER SB ACCOUNT NO." />
					</div>
				</div>
			</div>
		</div>

		<div class="mt-4">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">PAYMENT DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="fees">FEES (IF ANY)</label> 
						<input type="text" name="fees" id="fees" required="required" placeholder="ENTER FEES" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="modeofpayment">MODE OF PAYMENT</label> 
						<select id="modeofpayment" name="modeofpayment" required="required"
							class="form-control selectField" style="height: 30px;">
							<option selected="selected" value="">SELECT MODE</option>
							<option value="Cash">CASH</option>
							<option value="Cheque">CHEQUE</option>
							<option value="Online">ONLINE</option>
							<option value="NEFT">NEFT</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="comments">COMMENT / REMARKS</label> 
						<input type="text" name="comments" style="text-transform: uppercase;"
							id="comments" required="required" placeholder="ENTER REMARKS" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="h-100 d-flex justify-content-start align-items-center">
						<div class="d-flex justify-content-start align-items-center formFields">
							<label style="margin-left: 20px;" class="mb-2">TEAM MEMBER STATUS</label>
							<div class="cont ms-3">
								<div class="toggle">
									<input type="checkbox" id="customerStatus" name="customerStatus" checked="checked"
										class="toggle__input" data-toggle-type="member-status" />
									<label for="customerStatus" class="toggle__label"></label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Cheque input fields -->
			<div id="chequeInputs" style="display: none;">
				<div class="row">
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="chequeNo">CHEQUE NO.</label> 
							<input type="text" name="chequeNo" id="chequeNo" placeholder="ENTER CHEQUE NO." />
						</div>
					</div>
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="chequeDate">CHEQUE DATE</label> 
							<input type="date" name="chequeDate" id="chequeDate" placeholder="ENTER CHEQUE DATE" />
						</div>
					</div>
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="depositAcc1">DEPOSIT A/C</label> 
							<input type="text" name="depositAcc1" id="depositAcc1" placeholder="ENTER DEPOSIT A/C NO." />
						</div>
					</div>
				</div>
			</div>

			<!-- Online input fields -->
			<div id="onlineInputs" style="display: none;">
				<div class="row">
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="depositAcc2">DEPOSIT A/C</label> 
							<input type="text" name="depositAcc2" id="depositAcc2" placeholder="ENTER DEPOSIT A/C NO." />
						</div>
					</div>
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="refNumber1">REF. NUMBER</label> 
							<input type="text" name="refNumber1" id="refNumber1" placeholder="ENTER DEPOSIT REF NO." />
						</div>
					</div>
				</div>
			</div>

			<!-- NEFT input fields -->
			<div id="neftInputs" style="display: none;">
				<div class="row">
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="depositAcc3">DEPOSIT A/C</label> 
							<input type="text" name="depositAcc3" id="depositAcc3" placeholder="ENTER DEPOSIT A/C NO." />
						</div>
					</div>
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="refNumber2">REF. NUMBER</label> 
							<input type="text" name="refNumber2" id="refNumber2" placeholder="ENTER DEPOSIT REF NO." />
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row mt-4">
			<div class="col-12 text-start">
				<button type="button" id="TeamMemberSaveBtn" class="btnStyle bg-success">SAVE TEAM MEMBER</button>
				<button type="button" id="newBtn" class="btnStyle" style="background-color: #FFA500;">NEW / RESET</button>
			</div>
		</div>
	</form>

	<!-- Connected Financial Consultants Hierarchy Section -->
	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">
				<div class="card-body table-responsive">
					<h5 class="card-title text-primary" style="font-weight: 700;">
						<i class="bi bi-diagram-3-fill me-2"></i>REPORTING FINANCIAL CONSULTANTS (TEAM HIERARCHY)
					</h5>
					<p class="text-muted small">LIST OF FINANCIAL CONSULTANTS ASSIGNED TO AND WORKING UNDER TEAM MEMBER (<span id="teamMemberCodeBadge" class="badge bg-primary">${teamMemberUniqueNo}</span>)</p>

					<table class="table table-bordered table-hover align-middle">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">S/N</th>
								<th scope="col">CONSULTANT CODE</th>
								<th scope="col">CONSULTANT NAME</th>
								<th scope="col">POSITION</th>
								<th scope="col">BRANCH</th>
								<th scope="col">CONTACT NUMBER</th>
								<th scope="col">JOINING DATE</th>
								<th scope="col">STATUS</th>
							</tr>
						</thead>
						<tbody id="consultantsTableBody">
							<tr>
								<td colspan="8" class="text-center text-muted">LOADING CONNECTED FINANCIAL CONSULTANTS...</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
	const toggles = document.querySelectorAll('.toggle__input');	
	toggles.forEach((toggle) => {
		updateToggleColor(toggle);
		toggle.addEventListener('change', () => {
			updateToggleColor(toggle);
		});
	});

	function updateToggleColor(input) {
		const label = input.nextElementSibling;
		if (label) {
			label.style.backgroundColor = input.checked ? '#2830a7' : '#ccc';
		}
	}
});

document.getElementById('modeofpayment').addEventListener('change', function () {
    let mode = this.value;
    const chequeInputs = document.getElementById('chequeInputs');
    const onlineInputs = document.getElementById('onlineInputs');
    const neftInputs = document.getElementById('neftInputs');

    chequeInputs.style.display = 'none';
    onlineInputs.style.display = 'none';
    neftInputs.style.display = 'none';

    if (mode === 'Cheque') {
        chequeInputs.style.display = 'block';
    } else if (mode === 'Online') {
        onlineInputs.style.display = 'block';
    } else if (mode === 'NEFT') {
        neftInputs.style.display = 'block';
    }
});
</script>
<script src="${pageContext.request.contextPath}/js/TeamManagement/addTeamMember.js"></script>
