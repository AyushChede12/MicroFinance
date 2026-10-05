
<div class="pagetitle">
	<h1>SECURED GOLD LOAN</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-coin"></i></a></li>
			<li class="breadcrumb-item action">GOLD DIRECTORY</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<!-- ================= Customer Details ================= -->
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">CUSTOMER DETAILS</li>
				</ol>
			</nav>
			<div class="row">


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CUSTOMER CODE</label> <select id="customerCode"
							name="customerCode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT CUSTOMER CODE</option>

						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="customerName">CUSTOMER NAME</label> <input type="text"
							name="customerName" id="customerName" readonly="readnoly"
							required="required" placeholder="ENTER CUSTOMER NAME"
							style="text-transform: uppercase;" />
					</div>
				</div>


			</div>

		</div>

		<!-- ================= Today's Rate ================= -->
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">TODAY'S RATE</li>
				</ol>
			</nav>
			<div class="row">
				<input type="hidden" id="goldDirectoryId" name="id" value="">

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">KARAT</label> <select id="karat" name="karat"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT KARAT</option>
							<option value="24K">24K</option>
							<option value="22K">22K</option>
							<option value="20K">20K</option>
							<option value="18K">18K</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="silverrate">TODAY'S RATE / GM</label> <input
							type="text" name="todayRate" id="todayRate" required="required"
							placeholder="ENTER TODAY'S RATE"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="goldrate">CUSTOMER GOLD RATE / GM</label>
						<div class="d-flex">
							<input type="text" name="custgoldRate" id="custgoldRate"
								required="required" placeholder="ENTER RATE"
								class="form-control"
								style="text-transform: uppercase; margin-right: 10px;" />
							<!-- <button id="saveTodaysRateBtn" class="btnStyle bg-success">Save</button> -->
						</div>
					</div>
				</div>
			</div>




		</div>

		<!-- ================= Item Master ================= -->
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">ITEM MASTER</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">ITEM MASTER TYPE</label> <select id="itemMasterType"
							name="itemMasterType" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT ITEM TYPE</option>
							<option value="Gold">GOLD</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="itemName">ITEM NAME</label>
						<div class="d-flex">
							<input type="text" name="itemName" id="ItemName"
								required="required" placeholder="ENTER ITEM NAME"
								class="form-control"
								style="text-transform: uppercase; margin-right: 10px;" />
							<!-- <button id="saveItemMasterBtn" class="btnStyle bg-success">Save</button> -->
						</div>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="itemWeight">ITEM WEIGHT</label>
						<div class="d-flex">
							<input type="text" name="itemWeight" id="itemWeight"
								required="required" placeholder="ENTER ITEM WEIGHT"
								class="form-control"
								style="text-transform: uppercase; margin-right: 10px;" />
							<!-- <button id="saveItemMasterBtn" class="btnStyle bg-success">Save</button> -->
						</div>
					</div>
				</div>
			</div>



			<!-- <div class="row mt-5" id="policyDataRow">
						<div class="col-12">
							<div class="card recent-sales">
								<div class="card-body table-responsive">
									<h5 class="card-title">
										Item Master Details <span>| Data</span>
									</h5>

									<table class="table table-bordered">
										<thead class="table-light">
											<tr>
												<th style="white-space: nowrap;">ID</th>
												<th style="white-space: nowrap;">Item Type</th>
												<th style="white-space: nowrap;">Item Name</th>
												
											</tr>
										</thead>
										<tbody id="itemMasterTable">
											Dynamic rows will be injected here
										</tbody>
									</table>

								</div>
							</div>
							
						</div>
					</div> -->
		</div>

		<!-- ================= Locker Master ================= -->
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">LOCKER MASTER</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOCKER BRANCH</label> <select id="lockerBranch"
							name="lockerBranch" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT BRANCH</option>

						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="lockerAddress">LOCKER NUMBER</label>
						<div class="d-flex">
							<input type="text" name="lockerNo" id="lockerNo"
								value="${lockerNo }" required="required"
								placeholder="ENTER LOCKER NUMBER" readonly="readonly"
								class="form-control"
								style="text-transform: uppercase; margin-right: 10px;" />
							<!-- <button id="saveLockerMasterBtn" class="btnStyle bg-success">Save</button> -->
						</div>
					</div>
				</div>
			</div>



			<!-- <div class="row mt-5" id="policyDataRow">
						<div class="col-12">
							<div class="card recent-sales">
								<div class="card-body table-responsive">
									<h5 class="card-title">
										Locker Master Details <span>| Data</span>
									</h5>

									<table class="table table-bordered">
										<thead class="table-light">
											<tr>
												<th style="white-space: nowrap;">ID</th>
												<th style="white-space: nowrap;">Locker Location</th>
												<th style="white-space: nowrap;">Locker Address</th>
												
											</tr>
										</thead>
										<tbody id="lockerMasterTable">
											Dynamic rows will be injected here
										</tbody>
									</table>

								</div>
							</div>
							
						</div>
					</div> -->
		</div>

		<!-- ================= Purity Master ================= -->
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">PURITY MASTER</li>
				</ol>
			</nav>

			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="purityName">PURITY NAME</label> <input type="text"
							name="purityName" id="purityName" required="required"
							placeholder="ENTER PURITY NAME"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="purity">Purity (%)</label> <input type="text"
							name="purity" id="purity" required="required"
							placeholder="ENTER PURITY" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="itemType">ITEM PURITY TYPE</label>
						<div class="d-flex">
							<select id="itemPurityType" name="itemPurityType"
								required="required" class="form-control selectField"
								style="height: 30px; margin-right: 10px;">
								<option value="">ITEM TYPE</option>
								<option value="Gold">GOLD</option>
							</select>
							<!-- <button id="saveButtonforGoldDirectory" class="btnStyle bg-success">Save</button> -->
						</div>
					</div>
				</div>




				<!-- <div class="row mt-5" id="policyDataRow">
						<div class="col-12">
							<div class="card recent-sales">
								<div class="card-body table-responsive">
									<h5 class="card-title">
										Purity Master Details <span>| Data</span>
									</h5>

									<table class="table table-bordered">
										<thead class="table-light">
											<tr>
												<th style="white-space: nowrap;">ID</th>
												<th style="white-space: nowrap;">Purity Name</th>
												<th style="white-space: nowrap;">Type</th>
												
											</tr>
										</thead>
										<tbody id="purityMasterTable">
											Dynamic rows will be injected here
										</tbody>
									</table>

								</div>
							</div>
							
						</div>
					</div> -->
			</div>
		</div>
		<!-- ================= Loan Details ================= -->
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">LOAN DETAILS</li>
				</ol>
			</nav>
			<div class="row">


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN PLAN NAME</label> <input type="text"
							name="loanPlanName" id="loanPlanName" required="required"
							placeholder="LOAN PLAN NAME" style="text-transform: uppercase;" />

					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">TYPE OF LOAN</label> <select id="typeOfLoan"
							name="typeOfLoan" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT TYPE OF LOAN</option>
							<option value="Gold Loan">GOLD LOAN</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN MODE</label> <select id="loanMode"
							name="loanMode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT LOAN MODE</option>
							<option value="Monthly">MONTHLY</option>
						</select>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">LOAN TERM</label> <input type="text" name="loanTerm"
							id="loanTerm" required="required" placeholder="ENTER LOAN TERM"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">RATE OF INTEREST(%)</label> <input type="text"
							name="rateOfInterest" id="rateOfInterest" required="required"
							placeholder="ENTER RATE OF INTEREST"
							style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">AMOUNT OF LOAN </label> <input type="text"
							name="loanAmount" id="loanAmount" required="required"
							readonly="readonly" placeholder="ENTER AMOUNT OF LOAN"
							style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for=""> INTEREST TYPE</label> <select id="typeIntrest"
							name="typeIntrest" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT ROI TYPE</option>
							<option value="Flat Interest">FLAT INTEREST</option>
							<option value="Reducing Interest">REDUCING INTEREST</option>
							<option value="Rule 78">RULE 78</option>

						</select>
					</div>
				</div>
				<!-- EMI Payment -->
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">EMI PAYMENT</label> <input type="text"
							name="emiPayment" id="emiPayment" required="required"
							placeholder="Auto Calculated" readonly="readonly"
							style="text-transform: uppercase; background: #f5f5f5;" />
							<small id="vemipayment" style="color: red;"></small>
					</div>
				</div>



			</div>

		</div>

		<div class="row">
			<div class="col-12 text-center">
				<button id="saveButtonforGoldDirectory" class="btnStyle bg-success">SAVE</button>
			</div>
		</div>

		<input type="hidden" id="loanId" value="" />
	</form>


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
	src="${pageContext.request.contextPath}/js/SecuredGoldLoan/GoldDirectory.js"></script>
