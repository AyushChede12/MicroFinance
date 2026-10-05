
<div class="pagetitle">
	<h1>Secured Gold Loan</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-coin"></i>
			</a></li>
			<li class="breadcrumb-item action">Gold Secure Plan</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">Gold Loan Details</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">


					<input type="hidden" id="loanSchemeCode" name="loanSchemeCode"
						value="${loanSchemeCode}" />

					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">Loan Plan Name</label> <input type="text"
							name="loanPlanName" id="loanPlanName" required="required"
							placeholder="Enter Loan Plan Name"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">Type Of Loan</label> <select id="typeOfLoan"
							name="typeOfLoan" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">Select Type Of Loan</option>
							<option value="Gold Loan">Gold Loan</option>
							<option value="Silver Loan">Silver Loan</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">Loan Mode</label> <select id="loanMode"
							name="loanMode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">Select Loan Mode</option>
							<option value="Daily">Daily</option>
							<option value="Weekly">Weekly</option>
							<option value="Fortnightly">Fortnightly</option>
							<option value="Monthly">Monthly</option>
							<option value="Quarterly">Quarterly</option>
						</select>
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for=""> Interest Type</label> <select id="interestType"
							name="interestType" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">Select ROI Type</option>
							<option value="Flat Interest">Flat Interest</option>
							<option value="Reducing Interest">Reducing Interest</option>
							<option value="Rule 78">Rule 78</option>

						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">EMI Type</label> <select id="emiType" name="emiType"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">Select EMI Type</option>
							<option value="Regular">Regular</option>
							<option value="Irregular">Irregular</option>

						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="minage">Min Age</label> <input type="text"
							name="minAge" id="minAge" required="required"
							placeholder="Enter Minimum Age"
							style="text-transform: uppercase;" /> <span id="message"></span>
					</div>

				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="maxage">Max Age</label> <input type="text"
							name="maxAge" id="maxAge" required="required"
							placeholder="Enter Maximum Age"
							style="text-transform: uppercase;" /> <span id="message"></span>
					</div>

				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="minamt">Loan Amount</label> <input type="text"
							name="loanAmt" id="loanAmt" required="required"
							placeholder="Enter Loan Amount"
							style="text-transform: uppercase;" />
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="minterm">loanTerm</label> <input type="text"
							name="loanTerm" id="loanTerm" required="required"
							placeholder="Enter Loan Term" style="text-transform: uppercase;" />
					</div>
				</div>





				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px;">
						<label for="rateInteresttype">Rate Interest Type(%p.a.)</label> <input
							type="text" name="rateInterestType" id="rateInterestType"
							required="required" placeholder="Enter Rate Interest Type" />
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">Security Type</label> <select id="securityType"
							name="securityType" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">Select Security</option>
							<option value="Pledge">Pledge</option>
							<option value="Mortgage">Gold Bars</option>
							<option value="Gold">Gold</option>
						</select>
					</div>
				</div>



				<div class="col-lg-3">
					<div class=" h-100 d-flex justify-content-start align-items-center"
						style="margin-bottom: 30px;">
						<div
							class="d-flex justify-content-start align-items-center  formFields">
							<label style="margin-left: 20px;" class="mb-2">Plan
								Status</label>
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
					<li class="breadcrumb-item action">Deduction Details</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="procfee">Processing Fee(%) </label> <input type="text"
							name="procFee" id="procFee" required="required"
							placeholder="Enter Processing Fee" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="legalcharge"> Legal Charges(%)</label> <input
							type="text" name="legalCharge" id="legalCharge"
							required="required" placeholder="Enter Legal Charges" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="Gst">GST(%)</label> <input type="text" name="gst"
							id="gst" required="required" placeholder="Enter GST" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="insufee">Insurance Fee(%)</label> <input type="text"
							name="insuFee" id="insuFee" required="required"
							placeholder="Enter Insurance Fee" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="valufee">Valuation Fee(%) </label> <input type="text"
							name="valuFee" id="valuFee" required="required"
							placeholder="Enter Valuation Fee" />
					</div>
				</div>

			</div>


		</div>

		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">Late Fine Details</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="lateallowanceDay">Late Allowance Days</label> <input
							type="text" name="lateAllowanceDay" id="lateAllowanceDay"
							required="required" placeholder="Enter Late Allowance Days" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="penaltymode">penalty mode</label> <select
							id="penaltyMode" name="penaltyMode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">Select Penalty Type</option>
							<option value="Percentage">Percentage</option>
							<option value="Amount">Amount</option>
						</select>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="monthlypenalty"> Monthly Penalty </label> <input
							type="text" name="monthlyPenalty" id="monthlyPenalty"
							required="required" placeholder="" />
					</div>
				</div>
			</div>


		</div>
		<input type="hidden" id="goldLoanId" value="" />
		<div class="row">
			<div class="col-12 text-center">
				<button id="saveBtn" class="btnStyle bg-success">Save</button>


				<button id="updateBtn" class="btnStyle"
					style="background-color: #FFA500;">Update</button>

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
