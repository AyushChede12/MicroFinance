
<div class="pagetitle">
	<h1>FINANCIAL CONSULTANT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-briefcase text-blue"></i>
			</a></li>
			<li class="breadcrumb-item action">CONSULTANT PROMOTION MANAGEMENT</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">FINANCIAL CONSULTANT PROMOTION MANAGEMENT</li>
				</ol>
			</nav>
			<div class="row">
				<input type="hidden" id="id" name="id">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label>SELECT FINANCIAL CODE <span class="star">*</span></label> <select id="financialCode"
							name="financialCode" required="required"
							class="form-control selectField" style="height: 30px; text-transform: uppercase;">
							<option value="">-- SELECT CODE --</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="Branch">BRANCH</label> <input type="text" id="Branch"
							name="branchName" required="required"
							class="form-control selectField"
							style="height: 30px; background-color: #fff; text-transform: uppercase;" readonly="readonly">
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>OLD POSITION</label> <input type="text" id="oldPosition"
							name="oldPosition" required="required"
							class="form-control selectField"
							style="height: 30px; background-color: #fff; text-transform: uppercase;" readonly="readonly">
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>NEW POSITION <span class="star">*</span></label> <select id="newPosition"
							name="newPosition" required="required"
							class="form-control selectField" style="height: 30px; text-transform: uppercase;">
							<option value="">-- SELECT NEW POSITION --</option>
							<option value="L1 - JUNIOR CONSULTANT">L1 - JUNIOR CONSULTANT</option>
							<option value="L2 - SENIOR CONSULTANT">L2 - SENIOR CONSULTANT</option>
							<option value="L3 - TEAM LEADER">L3 - TEAM LEADER</option>
							<option value="L4 - ASSISTANT MANAGER">L4 - ASSISTANT MANAGER</option>
							<option value="L5 - BRANCH MANAGER">L5 - BRANCH MANAGER</option>
							<option value="SENIOR ADVISOR">SENIOR ADVISOR</option>
							<option value="MANAGER">MANAGER</option>
							<option value="GENERAL MANAGER">GENERAL MANAGER</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="promotionDate">PROMOTION DATE <span class="star">*</span></label> <input type="date"
							name="promotionDate" id="promotionDate" required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="newseniorCode">SENIOR CODE <span class="star">*</span></label> <input type="text"
							name="seniorCode" id="newseniorCode" required="required"
							placeholder="ENTER SENIOR CODE"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>SENIOR NAME</label> <input type="text" name="seniorName"
							id="newseniorname" required="required"
							placeholder="ENTER SENIOR NAME"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="newseniorposition">SENIOR POSITION</label> <input type="text"
							name="seniorPosition" id="newseniorposition" required="required"
							placeholder="ENTER SENIOR POSITION"
							style="text-transform: uppercase;" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12 text-center">
					<button type="button" id="updateBtn" class="btnStyle"
						style="background-color: #FFA500;">UPDATE PROMOTION</button>
				</div>
			</div>

		</div>

	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">PROMOTION MANAGEMENT DETAILS</h5>

					<div style="overflow-x: auto; white-space: nowrap;">
						<table class="table table-borderless datatable" id="tabl">
							<thead class="table-light">
								<tr style="font-family: 'Poppins', sans-serif;">
									<th scope="col">SL NO.</th>
									<th scope="col">FINANCIAL CODE</th>
									<th scope="col">BRANCH</th>
									<th scope="col">OLD POSITION</th>
									<th scope="col">NEW POSITION</th>
									<th scope="col">PROMOTION DATE</th>
									<th scope="col">SENIOR CODE</th>
									<th scope="col">SENIOR NAME</th>
									<th scope="col">SENIOR POSITION</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script
	src="${pageContext.request.contextPath}/js/FinancialConsultant/consultantPromotionManagement.js"></script>
