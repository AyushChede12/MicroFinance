
<div class="pagetitle">
	<h1>LOAN MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-cash-coin"></i>
			</a></li>
			<li class="breadcrumb-item action">LOAN SCHEME CATALOG</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">LOAN MANAGEMENT DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">


					<input type="hidden" id="loanSchemeCode" name="loanSchemeCode"
						value="${loanSchemeCode}" />

					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">LOAN PLAN NAME <span class="star">*</span></label>
						<input type="text" name="loanPlaneName" id="loanPlaneName"
							required="required" placeholder="ENTER LOAN PLAN NAME"
							style="text-transform: uppercase;" /><small id="chkloanplanname"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">TYPE OF LOAN <span class="star">*</span></label> <select
							id="typeLoan" name="typeLoan" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT TYPE OF LOAN</option>
							<option value="Business Loan">BUSINESS LOAN</option>
							<option value="Vehicle Loan">VEHICLE LOAN</option>
							<option value="Home Loan">HOME LOAN</option>
							<option value="personal Loan">PERSONAL LOAN</option>
						</select><small id="chkloantype"
							style="color: red;"></small>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanName">AGE <span class="star">*</span></label> <input type="text" name="age"
							id="age" required="required" placeholder="ENTER YOUR AGE"
							style="text-transform: uppercase;" /> <span id="message"></span><small id="chkage"
							style="color: red;"></small>
					</div>

				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for=""> INTEREST TYPE <span class="star">*</span></label> <select id="typeIntrest"
							name="typeIntrest" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT ROI TYPE</option>
							<option value="Flat Interest">FLAT INTEREST</option>
							<option value="Reducing Interest">REDUCING INTEREST</option>
							<option value="Rule 78">RULE 78</option>

						</select><small id="chkinteresttype"
							style="color: red;"></small>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for=""> LOAN TERM (IN MONTHS) <span class="star">*</span></label> <input type="text"
							name="loanTerm" id="loanTerm" onblur="validateLoanDuration()"
							required="required" placeholder="ENTER LOAN TERM " /><span
							id="durationMsg"></span><small id="chkloanterm"
							style="color: red;"></small>
					</div>
				</div>




				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="loanAmount">LOAN AMOUNT <span class="star">*</span></label> <input type="text"
							name="loanAmount" id="loanAmount" required
							placeholder="ENTER MINIMUM LOAN AMOUNT"
							oninput="validateLoanAmount()" style="text-transform: uppercase;" />
						<small id="loanAmountError" style="color: red; display: none;">
							Amount must be greater than or equal to 100000 </small><small id="chkloanamount"
							style="color: red;"></small>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN MODE <span class="star">*</span></label> <select id="loanMode"
							name="loanMode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT LOAN MODE</option>
							<option value="Daily">DAILY</option>
							<option value="Weekly">WEEKLY</option>
							<option value="Fortnightly">FORTNIGHTLY</option>
							<option value="Monthly">MONTHLY</option>
							<option value="Quarterly">QUARTERLY</option>
						</select><small id="chkloanmode"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">RATE INTEREST TYPE(%P.A.) <span class="star">*</span></label> <input type="text"
							name="rateIntrestType" id="rateIntrestType" required="required"
							placeholder="ENTER RATE INTEREST TYPE" /><small id="chkroi"
							style="color: red;"></small>
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">SECURITY TYPE <span class="star">*</span></label> <select id="typesecurity"
							name="typesecurity" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT SECURITY</option>
							<option value="Pledge">PLEDGE</option>
							<option value="Mortgage">MORTAGE</option>
							<option value="Property">PROPERTY</option>
							<option value="Gold">GOLD</option>
						</select><small id="chksecuritytype"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">EMI TYPE <span class="star">*</span></label> <select id="emiType" name="emiType"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT EMI TYPE</option>
							<option value="Regular">REGULAR</option>
							<option value="Irregular">IRREGULAR</option>

						</select><small id="chkemitype"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="h-100 d-flex justify-content-start align-items-center">
						<div
							class="d-flex justify-content-start align-items-center formFields">
							<label for="planStatus" style="margin-left: 20px;" class="mb-2">PLAN
								STATUS <span class="star">*</span></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <small id="chkplanstatus"
							style="color: red;"></small>
							<div class="cont">
								<div class="toggle">
									<input type="checkbox" id="planStatus" name="planStatus"
										class="toggle__input" data-toggle-type="member-status">
									<label for="planStatus" class="toggle__label"></label>
								</div>
							</div>
						</div>
					</div>
				</div>


			</div>
		</div>

		<!-- Payment Deductions Section -->
		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">PAYMENT DETAILS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">PROCESSING FEE(%) <span class="star">*</span></label> <input type="text"
							name="feeProcessing" id="feeProcessing" required="required"
							placeholder="ENTER PROCESSING FEE" /><small id="chkprocessingfee"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for=""> LEGAL CHARGES(%) <span class="star">*</span></label> <input type="text"
							name="chargesLegal" id="chargesLegal" required="required"
							placeholder="ENTER LEGAL CHARGES" /><small id="chklegalcharges"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">GST(%) <span class="star">*</span></label> <input type="text" name="gst"
							id="gst" required="required" placeholder="ENTER GST" /><small id="chkgst"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">INSURANCE FEE(%) <span class="star">*</span></label> <input type="text"
							name="feeInsurence" id="feeInsurence" required="required"
							placeholder="ENTER INSURANCE FEE" /><small id="chkinsurancefee"
							style="color: red;"></small>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">VALUATION FEE(%) <span class="star">*</span></label> <input type="text"
							name="feeValuation" id="feeValuation" required="required"
							placeholder="ENTER VALUATION FEE" /><small id="chkvaluationfee"
							style="color: red;"></small>
					</div>
				</div>

			</div>
		</div>

		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">LATE FINE DETAILS
					[4r +
					]</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LATE ALLOWANCE DAY <span class="star">*</span></label> <input type="text"
							name="lateAllowanceday" id="lateAllowanceday" required="required"
							placeholder="ENTER LATE ALLOWANCE DAYS" /><small id="chklateallowanceday"
							style="color: red;"></small>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">PENALTY MODE <span class="star">*</span></label> <select id="modePanalty"
							name="modePanalty" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT PENALTY TYPE</option>
							<option value="Percentage">PERCENTAGE</option>
							<option value="Amount">AMOUNT</option>
						</select>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for=""> MONTHLY PENALTY <span class="star">*</span></label> <input type="text"
							name="pennaltyMonthly" id="pennaltyMonthly" required="required"
							placeholder="ENTER MONTHLY PENALTY" /><small id="chkmonthlypenalty"
							style="color: red;"></small>
					</div>
				</div>
			</div>


		</div>
		<input type="hidden" id="loanId" value="" />
		<div class="row">
			<div class="col-12 text-center">
				<button type="button" id="saveBtn" class="btnStyle bg-success">SAVE</button>
				<button type="button" id="updateBtn" class="btnStyle"
					style="background-color: #FFA500;">UPDATE</button>

			</div>
		</div>
	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="c
			card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">
						LOAN SCHEME CATALOG <span>| TABLE VIEW</span>
					</h5>

					<table class="table table-borderless datatable overflow-scroll"
						onclick="loadLoanTable()" id="loanTableWrapper">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">ID</th>
								<th>LOAN PLAN NAME</th>

								<th>TYPE OF LOAN</th>
								<th>AGE</th>
								<th>LOAN TERM</th>
								<th>EMI TYPE</th>
								<th>EDIT</th>
								<th>DELETE</th>
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
	document.addEventListener('DOMContentLoaded', () => {
		const toggles = document.querySelectorAll('.toggle__input');

		toggles.forEach((toggle) => {
			// Initialize colors
			updateToggleColor(toggle);

			// console.log("updated toggle" , toggle)

			// Add change event listener
			toggle.addEventListener('change', () => {
				updateToggleColor(toggle);
				// console.log(${ toggle.dataset.toggleType } is now ${ toggle.checked });
			});
		});

		function updateToggleColor(input) {
			const label = input.nextElementSibling;
			if (input.checked) {
				label.style.backgroundColor = '#28a745'; // Green ON
			} else {
				label.style.backgroundColor = '#ccc'; // Gray OFF
			}
		}
	}); 
</script>

<script
	src="${pageContext.request.contextPath}/js/LoanManagment/LoanSchemCatalog.js"></script>
