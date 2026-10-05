

<div class="pagetitle">
	<h1>SAVING / CURRENT ACCOUNT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-bank text-blue"></i>
			</a></li>
			<li class="breadcrumb-item action">SAVINGS ACCOUNT INQUIRY</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SERACH BOX</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px;">
						<label for="">BRANCH NAME</label> <select id="branchName"
							name="branchName" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT BRANCH</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">FROM DATE</label> <input type="date"
							name="fromDate" id="fromDate" required="required"
							placeholder="Enter Vehicle No" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">TO DATE</label> <input type="date"
							name="toDate" id="toDate" required="required"
							placeholder="Enter Vehicle No" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CUSTOMER NAME</label> <input type="text"
							name="customerName" id="customerName" required="required"
							style="text-transform: uppercase;"
							placeholder="ENTER CUSTOMER NAME" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">ACCOUNT NUMBER</label> <select id="accountNumber"
							name="accountNumber" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">--SELECT ACCOUNT NO--</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CUSTOMER CODE</label> <input type="text"
							style="text-transform: uppercase;" name="customerCode"
							id="customerCode" required="required"
							placeholder="ENTER CUSTOMER CODE" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">FINANCIAL CONSULTANT CODE</label> <input type="text"
							name="financialConsultantCode" id="financialConsultantCode" style="text-transform: uppercase;"	
							required="required" placeholder="ENTER FINANCIAL CONSULTANT CODE" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">PLAN NAME</label> <select id="schemename"
							name="schemename" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">--SELECT PLAN NAME--</option>
						</select>
					</div>
				</div>
			</div>
			<!-- <div class="row">
                        <div class="col-12 text-center">
                            <button id="saveBtn" class="btn btn-warning" style="margin-left: 80%;">Search</button>
                            <button id="saveBtn" class="btn btn-warning" style="background-color: orangered;">Print</button>
                        </div>
                    </div> -->
		</div>

		<div class="row mt-5">
			<div class="col-12">
				<div class="card recent-sales">

					<div class="card-body table-responsive">
						<h5 class="card-title">
							SAVING/CURRENT DATA <span>| TABLE VIEW</span>
						</h5>

						<table class="table table-borderless datatable overflow-scroll">
							<thead class="table-light">
								<tr style="font-family: 'Poppins', sans-serif;">
									<th style="white-space: nowrap;">SR NO</th>
									<th style="white-space: nowrap;">ACCOUNT NUMBER</th>
									<th style="white-space: nowrap;">ACCOUNT TYPE</th>
									<th style="white-space: nowrap;">CUSTOMER CODE</th>
									<th style="white-space: nowrap;">CUSTOMER NAME</th>
									<th style="white-space: nowrap;">MOBILE</th>
									<th style="white-space: nowrap;">BRANCH NAME</th>
									<th style="white-space: nowrap;">ADDRESS</th>
									<th style="white-space: nowrap;">CITY</th>
									<th style="white-space: nowrap;">STATE</th>
									<th style="white-space: nowrap;">OPENING DATE</th>
									<th style="white-space: nowrap;">FINANCIAL CODE</th>
									<th style="white-space: nowrap;">PLAN NAME</th>
									<th style="white-space: nowrap;">APPROVE STATUS</th>
								</tr>
							</thead>
							<tbody id="tableSavingAcc">

							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</form>

</div>
<script>
	$(document).ready(function() {
		loadAllSavingAccounts();
		AccNoDropdown();
		schemeNameDropdown();
	});
</script>
<script
	src="${pageContext.request.contextPath}/js/customerSavings/savingsAccountEnquiry.js"></script>