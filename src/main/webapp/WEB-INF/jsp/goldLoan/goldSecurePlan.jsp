
<div class="pagetitle">
	<h1>SECURED GOLD LOAN</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-coin"></i>
			</a></li>
			<li class="breadcrumb-item action">GOLD SECURE PLAN</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">GOLD LOAN DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">


					<input type="hidden" id="loanSchemeCode" name="loanSchemeCode"
						value="${loanSchemeCode}" />

					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">LOAN PLAN NAME</label> <input type="text"
							name="loanPlanName" id="loanPlanName" required="required"
							placeholder=="ENTER LOAN PLAN NAME"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">TYPE OF LOAN</label> <select id="typeOfLoan"
							name="typeOfLoan" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT TYPE OF LOAN</option>
							<option value="Gold Loan">GOLD LOAN</option>
							<option value="Silver Loan">SILVER LOAN</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN MODE</label> <select id="loanMode"
							name="loanMode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT LOAN MODE</option>
							<option value="Daily">DAILY</option>
							<option value="Weekly">WEEKLY</option>
							<option value="Fortnightly">FORTNIGHTLY</option>
							<option value="Monthly">MONTHLY</option>
							<option value="Quarterly">QUARTERLY</option>
						</select>
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for=""> INTEREST TYPE</label> <select id="interestType"
							name="interestType" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT ROI TYPE</option>
							<option value="Flat Interest">FLAT INTEREST</option>
							<option value="Reducing Interest">REDUCING INTEREST</option>
							<option value="Rule 78">RULE 78</option>

						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">EMI TYPE</label> <select id="emiType" name="emiType"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT EMI TYPE</option>
							<option value="Regular">REGULAR</option>
							<option value="Irregular">IRREGULAR</option>

						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="minage">MIN AGE</label> <input type="text"
							name="minAge" id="minAge" required="required"
							placeholder=="ENTER MINIMUM AGE"
							style="text-transform: uppercase;" /> <span id="message"></span>
					</div>

				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="maxage">MAX AGE</label> <input type="text"
							name="maxAge" id="maxAge" required="required"
							placeholder=="ENTER MAXIMUM AGE"
							style="text-transform: uppercase;" /> <span id="message"></span>
					</div>

				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="minamt">LOAN AMOUNT</label> <input type="text"
							name="loanAmt" id="loanAmt" required="required"
							placeholder=="ENTER LOAN AMOUNT"
							style="text-transform: uppercase;" />
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="minterm">LOANTERM</label> <input type="text"
							name="loanTerm" id="loanTerm" required="required"
							placeholder=="ENTER LOAN TERM" style="text-transform: uppercase;" />
					</div>
				</div>





				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px;">
						<label for="rateInteresttype">RATE INTEREST TYPE(%P.A.)</label> <input
							type="text" name="rateInterestType" id="rateInterestType"
							required="required" placeholder=="ENTER RATE INTEREST TYPE" />
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">SECURITY TYPE</label> <select id="securityType"
							name="securityType" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT SECURITY</option>
							<option value="Pledge">PLEDGE</option>
							<option value="Mortgage">GOLD BARS</option>
							<option value="Gold">GOLD</option>
						</select>
					</div>
				</div>



				<div class="col-lg-3">
					<div class=" h-100 d-flex justify-content-start align-items-center"
						style="margin-bottom: 30px;">
						<div
							class="d-flex justify-content-start align-items-center  formFields">
							<label style="margin-left: 20px;" class="mb-2">PLAN
								STATUS</label>
							<div class="cont">
								<div class="toggle">
									<input type="checkbox" id="toggle-plan-status"
										name="planStatus" class="toggle__input"
										data-toggle-type="plan-status"> <label
										for="toggle-plan-status" class="toggle__label"></label>
								</div>
							</div>
						</div>
					</div>
				</div>


			</div>
		</div>


		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">DEDUCTION DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="procfee">PROCESSING FEE(%) </label> <input type="text"
							name="procFee" id="procFee" required="required"
							placeholder=="ENTER PROCESSING FEE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="legalcharge"> LEGAL CHARGES(%)</label> <input
							type="text" name="legalCharge" id="legalCharge"
							required="required" placeholder=="ENTER LEGAL CHARGES" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="Gst">GST(%)</label> <input type="text" name="gst"
							id="gst" required="required" placeholder=="ENTER GST" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="insufee">INSURANCE FEE(%)</label> <input type="text"
							name="insuFee" id="insuFee" required="required"
							placeholder=="ENTER INSURANCE FEE" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="valufee">VALUATION FEE(%) </label> <input type="text"
							name="valuFee" id="valuFee" required="required"
							placeholder=="ENTER VALUATION FEE" />
					</div>
				</div>

			</div>


		</div>

		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">LATE FINE DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="lateallowanceDay">LATE ALLOWANCE DAYS</label> <input
							type="text" name="lateAllowanceDay" id="lateAllowanceDay"
							required="required" placeholder=="ENTER LATE ALLOWANCE DAYS" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="penaltymode">PENALTY MODE</label> <select
							id="penaltyMode" name="penaltyMode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT PENALTY TYPE</option>
							<option value="Percentage">PERCENTAGE</option>
							<option value="Amount">AMOUNT</option>
						</select>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="monthlypenalty"> MONTHLY PENALTY </label> <input
							type="text" name="monthlyPenalty" id="monthlyPenalty"
							required="required" placeholder="" />
					</div>
				</div>
			</div>


		</div>
		<input type="hidden" id="goldLoanId" value="" />
		<div class="row">
			<div class="col-12 text-center">
				<button id="saveBtn" class="btnStyle bg-success">SAVE</button>


				<button id="updateBtn" class="btnStyle"
					style="background-color: #FFA500;">UPDATE</button>

			</div>
		</div>
	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">
						Recent Sales <span>| Today</span>
					</h5>

					<table class="table table-borderless datatable overflow-scroll"
						onclick="loadLoanTable()" id="loanTableWrapper">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">ID</th>
								<th>Loan Plan Name</th>

								<th>Type Of Loan</th>
								<th>MinAge</th>
								<th>MaxAge</th>
								<th>EMI Type</th>
								<th>Edit</th>
								<th>Delete</th>
								<td>
							</tr>
						</thead>
						<tbody id="loanTableBody">

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
			console.log(`${toggle.dataset.toggleType} is now ${toggle.checked}`);
		});
	});

	function updateToggleColor(input) {
		const label = input.nextElementSibling;
		if (label) {
			label.style.backgroundColor = input.checked ? '#28a745' : '#ccc';
		}
	}
});
</script>

<script
	src="${pageContext.request.contextPath}/js/SecuredGoldLoan/GoldSecurePlan.js"></script>
