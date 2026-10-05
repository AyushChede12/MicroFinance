
<div class="pagetitle">
	<h1>POLICY MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-piggy-bank"></i>
			</a></li>
			<li class="breadcrumb-item action">INVESTMENT DATA SEARCH</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">PRINT SEARCH RESULTS </li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-5">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 20px;">
						<label for="policyCode" id="policySelection">POLICY CODE </label>
						<select id="policyCode" name="policyCode"
							class="form-control selectField" style="width: 100%;">
							<option value="">-- SEARCH POLICY NUMBER --</option>
						</select>
					</div>
				</div>

				<div class="row" style="margin-top: 20px;">
					<div class="col-12 text-center">
						<button type="button" id="findBtn" class="btn btn-dark">FIND</button>
					</div>
				</div>

			</div>

			<!-- <div class="mt-5">
						<div class="row" id="policyDataRow">
							<div class="col-lg-12">
								Scrollable table wrapper
								<div style="overflow-x: auto; max-height: 400px;">
									<table class="table table-bordered table-striped"
										id="policyTable">
										<thead class="thead-dark"
											style="position: sticky; top: 0; background-color: #343a40; color: white;">
											<tr>
												<th>Sr No.</th>
												<th>Policy Code</th>
												<th>Customer Name</th>
												<th>Start Date</th>
												<th>Contact No</th>
												<th>Address</th>
												<th>District</th>
												<th>State</th>
												<th>Branch</th>
												<th>Policy Type</th>
												<th>Policy Amount</th>
												<th>Maturity Amount</th>
												<th>Payment Mode</th>
												<th>Approved Status</th>
											</tr>
										</thead>
										<tbody id="policyTableBody">
											Data will be inserted here
										</tbody>
									</table>
								</div>
								Certificate Template (hidden, will be cloned for print)

							</div>
						</div>
					</div> -->

			<div class="row mt-5" id="policyDataRow">
				<div class="col-12">
					<div class="card recent-sales">
						<div class="card-body table-responsive">
							<h5 class="card-title">
								POLICY DETAILS <span>| DATA</span>
							</h5>

							<table class="table table-bordered">
								<thead class="table-light">
									<tr>
										<th style="white-space: nowrap;">SR. NO</th>
										<th style="white-space: nowrap;">POLICY CODE</th>
										<th style="white-space: nowrap;">CUSTOMER NAME</th>
										<th style="white-space: nowrap;">START DATE</th>
										<th style="white-space: nowrap;">CONTACT NO</th>
										<th style="white-space: nowrap;">ADDRESS</th>
										<th style="white-space: nowrap;">DISTRICT</th>
										<th style="white-space: nowrap;">STATE</th>
										<th style="white-space: nowrap;">BRANCH</th>
										<th style="white-space: nowrap;">POLICY TYPE</th>
										<th style="white-space: nowrap;">POLICY AMOUNT</th>
										<th style="white-space: nowrap;">MATURITY AMOUNT</th>
										<th style="white-space: nowrap;">PAYMENT MODE</th>
										<th style="white-space: nowrap;">APPROVED STATUS</th>
									</tr>
								</thead>
								<tbody id="policyTableBody">
									<!-- Dynamic rows will be injected here -->
								</tbody>
							</table>

						</div>
					</div>
					<!-- <div class="mt-2 text-center">
						<button id="prevBtnDD" class="btn btn-sm btn-primary">
							<i class="bi bi-chevron-double-left"></i>
						</button>
						<span id="pageInfoDD" class="mx-2"></span>
						<button id="nextBtnDD" class="btn btn-sm btn-primary">
							<i class="bi bi-chevron-double-right"></i>
						</button>
					</div> -->
				</div>
			</div>
		</div>

	</form>

</div>

<script
	src="${pageContext.request.contextPath}/js/PolicyManagment/investmentSearch.js"></script>
