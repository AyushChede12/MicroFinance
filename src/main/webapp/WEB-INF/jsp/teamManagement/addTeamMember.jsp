
	<script type="text/javascript">
   function calculateAge() {
	   const dob = new Date(document.getElementById("dateOfBirth").value); // get DOB from the date input field
	   const age = Math.floor((Date.now() - dob) / (365.25 * 24 * 60 * 60 * 1000)); // calculate age
	   document.getElementById("age").value = age; // set the calculated age in the age input field
	 }
</script>

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
			<form id="formid">
				<div>
					<nav>
						<ol class="breadcrumb breadcrumb-title">
							<li class="breadcrumb-item action">TEAM MEMBER DETAILS</li>
						</ol>
					</nav>
					<div class="row">
						<div class="col-lg-3">
							<!-- <div class="d-flex flex-column formFields" style="margin-bottom: 30px">
                <label>Verify With</label>
                <div class="position-relative">
                  <div class="select-btn1" style="cursor: pointer;">
                    <span name="cityName" id="cityNameId" style="font-size: 12px;">Select</span> <i
                      class="fa-solid fa-angle-down"></i>
                  </div>
                  <div class="content" id="contentCityName" style="display: none;">
                    <div class="search">
                      <input type="text" id="city-search" class="m-0" placeholder="Search City" />
                    </div>
                    <ul class="options" id="city-options">
                      <li>ABC</li>
                      <li>ABC</li>
                      <li>ABC</li>
                      <li>ABC</li>
                      <li>ABC</li>
                      <li>ABC</li>
                    </ul>
                  </div>
                </div>
              </div> -->
							<div class="d-flex flex-column formFields"
								style="margin-bottom: 30px;">
								<label for="">TEAM MAMBER CODE</label> <input type="text"
									id="teamMemberCode" name="teamMemberCode"
									value="${teamMemberUniqueNo}" required="required"
									placeholder="ENTER TEAM MAMBER COD">
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="joiningDate">SIGN-UP BRANCH</label> <input type="date"
									name="signUpDate" id="signUpDate" required="required"
									placeholder="Enter Sign-Up Date"
									style="text-transform: uppercase;" />
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">BRANCH NAME </label> <select id="branchName"
									name="branchName" required="required"
									class="form-control selectField" style="height: 30px;">
									<option value="">SELECT BRANCH NAME</option>
								</select>
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">TEAM MEMBER NAME</label> <input type="text"
									name="teamMemberName" id="teamMemberName" required="required"
									placeholder="Enter Team Member Name" />
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields"
								style="margin-bottom: 30px;">
								<label for="dob">DATE OF BIRTH </label> <input type="date"
									name="dateOfBirth" onchange="calculateAge()" id="dateOfBirth"
									required="required" placeholder="ENTER DATEOFBIRTH"
									style="text-transform: uppercase;" />
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">AGE</label> <input type="text" name="age" id="age"
									required="required" placeholder="ENTER AGE" />
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">FAMILY MEMBER NAME </label> <input type="text"
									name="familyMemberName" id="familyMemberName"
									required="required" placeholder="ENTER FAMILY MEMBER NAME" />
							</div>
						</div>


						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">RELATION TO APPLICATION </label> <select
									id="relationToApplicant" name="relationToApplicant"
									required="required" class="form-control selectField"
									style="height: 30px;">
									<option value="">SELECT RELATION TO APPLICANT <option>
								</select>
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields"
								style="margin-bottom: 30px;">
								<label for="">CONTACT NO </label> <input type="text"
									name="contactNo" id="contactNo" required="required"
									placeholder="ENTER CONTACT NO." />
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">NOMINEE NAME </label> <input type="text"
									name="nomineeName" id="nomineeName" required="required"
									placeholder="ENTER NOMINEE NAME" />
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">NOMINEE AGE</label> <input type="text"
									name="nomineeAge" id="nomineeAge" required="required"
									placeholder="ENTER NOMINEE AGE" />
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">RETATION WITH NOMINEE  </label> <select
									id="relationWithNominee" name="relationWithNominee"
									required="required" class="form-control selectField"
									style="height: 30px;">
									<option value="">SELECT RELATION</option>
								</select>
							</div>
						</div>


						<div class="col-lg-3">
							<div class="d-flex flex-column formFields"
								style="margin-bottom: 30px;">
								<label for="">ADDRESS</label>
								<textarea name="address" id="address"
									style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"></textarea>
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">PAN</label> <input type="text" name="pan" id="pan"
									required="required" placeholder="ENTER PAN" />
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">BANK A/C</label> <input type="text" name="bankAC"
									id="bankAC" required="required" placeholder="ENTER BANK A/C" />
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">IFSC CODE</label> <input type="text"
									name="ifscCode" id="ifscCode" required="required"
									placeholder="ENTER IFSC CODE" />
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">EXP. DETAILS</label> <input type="text"
									name="expDetails" id="expDetails" required="required"
									placeholder="ENTER EXP. DETAILS" />
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">EDUCATIONAL BACKGROUND</label> <input type="text"
									name="educationalBackground" id="educationalBackground"
									required="required" placeholder="ENTER EDUCATIONAL BACKGROUND" />
							</div>
						</div>


					</div>
				</div>







				<div class="mt-5">
					<nav>
						<ol class="breadcrumb breadcrumb-title">
							<li class="breadcrumb-item action">DESIGNATION DETAILS </li>
						</ol>
					</nav>
					<div class="row">
						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">DESIGNATION </label> <select id="designation"
									name="designation" required="required"
									class="form-control selectField" style="height: 30px;">
									<option value="">SELECT</option>
								</select>
							</div>
						</div>



						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">DEPARTMENT </label> <select id="department"
									name="department" required="required"
									class="form-control selectField" style="height: 30px;">
									<option value="">SELECT</option>
								</select>
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">SALARY </label> <input type="text" name="salary"
									id="salary" required="required" placeholder="ENTER SALARY" />
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">SAVING ACCOUNT NO. </label> <input type="text"
									name="savingAccNo" id="savingAccNo" required="required"
									placeholder="ENTER SB ACCOUNT NO." />
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
							<div class="d-flex flex-column formFields mb-4">
								<label for="">FEES(IF ANY) </label> <input type="text"
									name="fees" id="fees" required="required"
									placeholder="ENTER FEES" />
							</div>
						</div>



						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">MODE OF PAYMENT </label> <select
									id="modeofpayment" name="modeofpayment" required="required"
									class="form-control selectField" style="height: 30px;">
									<option selected="selected" value="">SELECT</option>
									<option value="Cash">CASH</option>
									<option value="Cheque">CHEQUE</option>
									<option value="Online">ONLINE</option>
									<option value="NEFT">NEFT</option>
								</select>
							</div>
						</div>

						<div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">COMMENT </label> <input type="text"
									name="comments" id="comments" required="required"
									placeholder="ENTER REMARKS" />
							</div>
						</div>

						<div class="col-lg-3">
							<div
								class=" h-100 d-flex justify-content-start align-items-center">
								<div
									class="d-flex justify-content-start align-items-center formFields">
									<label style="margin-left: 20px;" class="mb-2">CUSTOMER
										STATUS</label>
									<div class="cont">
										<div class="toggle">
											<input type="checkbox" id="customerStatus"
												name="customerStatus" class="toggle__input"
												data-toggle-type="member-status"> <label
												for="customerStatus" class="toggle__label"></label>


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
									<label for="">CHEQUE NO. </label> <input type="text"
										name="chequeNo" id="chequeNo" required="required"
										placeholder="ENTER CHEQUE NO." />
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-3">
								<div class="d-flex flex-column formFields">
									<label for="">Cheque Date </label> <input type="Date"
										name="chequeDate" id="chequeDate" required="required"
										placeholder="ENTER CHEQUE DATE" />
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-3">
								<div class="d-flex flex-column formFields">
									<label for="">SEPOSIT A/C </label> <input type="text"
										name="depositAcc1" id="depositAcc1" required="required"
										placeholder="ENTER SEPOSITE A/C No." />
								</div>
							</div>
						</div>
					</div>

					<!-- Online input fields -->
					<div id="onlineInputs" style="display: none;">
						<div class="row">
							<div class="col-lg-3">
								<div class="d-flex flex-column formFields">
									<label for="">DEPOSIT A/C </label> <input type="text"
										name="depositAcc2" id="depositAcc2" required="required"
										placeholder="ENTER DEPOSITE A/C NO." />
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-3">
								<div class="d-flex flex-column formFields">
									<label for="">REF. NUMBER </label> <input type="text"
										name="refNumber1" id="refNumber1" required="required"
										placeholder="ENTER DEPOSITE REF NO." />
								</div>
							</div>
						</div>
					</div>

					<!-- NEFT input fields -->
					<div id="neftInputs" style="display: none;">
						<div class="row">
							<div class="col-lg-3">
								<div class="d-flex flex-column formFields">
									<label for="">DEPOSIT A/C </label> <input type="text"
										name="depositAcc3" id="depositAcc3" required="required"
										placeholder="ENTER DEPOSITE A/C NO." />
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-3">
								<div class="d-flex flex-column formFields">
									<label for="">REF NUMBER </label> <input type="text"
										name="refNumber2" id="refNumber2" required="required"
										placeholder="ENTER DEPOSITE RREFef No." />
								</div>
							</div>
						</div>
					</div>

				</div>


				<div class="row">
					<div class="col-12">
						<button id="TeamMemberSaveBtn" class="btnStyle bg-success">SAVE</button>
						<button id="newBtn" class="btnStyle"
							style="background-color: #FFA500;">NEW	</button>
					</div>
				</div>
			</form>
		</div>

	<script>
document.addEventListener('DOMContentLoaded', function () {
	
	const toggles = document.querySelectorAll('.toggle__input');	
	toggles.forEach((toggle) => {
		updateToggleColor(toggle);

		toggle.addEventListener('change', () => {
			updateToggleColor(toggle);
			//console.log(${toggle.dataset.toggleType} is now ${toggle.checked});
			console.log(`${toggle.dataset.toggleType} is now ${toggle.checked}`);

		});
	});

	function updateToggleColor(input) {
		const label = input.nextElementSibling;
		if (label) {
			label.style.backgroundColor = input.checked ? '#2830a7' : '#ccc';
		}
	}
});
</script>

	<script>
    
document.getElementById('modeofpayment').addEventListener('change', function () {
    // Get the selected payment mode
    let mode = this.value;

    // Define all input field sections
    const chequeInputs = document.getElementById('chequeInputs');
    const onlineInputs = document.getElementById('onlineInputs');
    const neftInputs = document.getElementById('neftInputs');

    // Reset the display of all sections
    chequeInputs.style.display = 'none';
    onlineInputs.style.display = 'none';
    neftInputs.style.display = 'none';

    // Show the section corresponding to the selected payment mode
    if (mode === 'Cheque') {
        chequeInputs.style.display = 'block';
    } else if (mode === 'Online') {
        onlineInputs.style.display = 'block';
    } else if (mode === 'NEFT') {
        neftInputs.style.display = 'block';
    }
});
</script>
<script
	src="${pageContext.request.contextPath}/js/teamManagement/addTeamMember.js"></script>
	