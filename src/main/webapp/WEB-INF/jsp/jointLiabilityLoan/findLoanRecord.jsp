<div class="pagetitle">
	<h1>JOINT LIABILITY LOAN</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-person-bounding-box"></i>
			</a></li>
			<li class="breadcrumb-item action">FIND LOAN RECORD</li>
		</ol>
	</nav>
</div>

<div>
	<form id="findLoanFilterForm">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">LOAN SEARCH CRITERIA</li>
				</ol>
			</nav>
			<div class="row align-items-end">
				<div class="col-lg-3 mb-3">
					<div class="d-flex flex-column formFields">
						<label for="branchName">LOAN BRANCH</label>
						<select id="branchName" name="branchName" class="form-control selectField" style="height: 35px;">
							<option value="ALL">ALL BRANCHES</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3 mb-3">
					<div class="d-flex flex-column formFields">
						<label for="groupCode">GROUP CODE</label>
						<select id="groupCode" name="groupCode" class="form-control selectField" style="height: 35px;">
							<option value="">ALL GROUP CODES</option>
						</select>
					</div>
				</div>

				<div class="col-lg-2 mb-3">
					<div class="d-flex flex-column formFields">
						<label for="memberCode">MEMBER CODE</label>
						<input type="text" name="memberCode" id="memberCode" placeholder="ENTER MEMBER CODE"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-2 mb-3">
					<div class="d-flex flex-column formFields">
						<label for="startDate">START DATE</label>
						<input type="date" name="startDate" id="startDate" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-2 mb-3">
					<div class="d-flex flex-column formFields">
						<label for="endDate">END DATE</label>
						<input type="date" name="endDate" id="endDate" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-12 text-center mt-2 mb-3">
					<button type="button" id="searchBtn" class="btnStyle me-2" style="background-color: #FFA500; min-width: 140px; height: 35px;">
						<i class="bi bi-search"></i> SEARCH
					</button>
					<button type="button" id="printReportBtn" class="btn btn-success me-2" style="min-width: 140px; height: 35px;">
						<i class="bi bi-printer"></i> PRINT REPORT
					</button>
					<button type="button" id="resetBtn" class="btn btn-secondary" style="height: 35px;">
						RESET
					</button>
				</div>
			</div>
		</div>
	</form>

	<div class="row mt-4">
		<div class="col-12">
			<div class="card recent-sales p-4" id="printableLoanRecordsReportArea">
				<!-- Dynamic Company Header for Report -->
				<div id="compHeaderSearchReport" class="text-center mb-4 border-bottom pb-3">
					<h3 id="searchReportCompName" class="fw-bold mb-1" style="text-transform: uppercase;"></h3>
					<div id="searchReportCompAddress" class="text-muted small" style="text-transform: uppercase;"></div>
					<div id="searchReportCompReg" class="text-muted small" style="text-transform: uppercase;"></div>
					<div id="searchReportCompContact" class="text-muted small" style="text-transform: uppercase;"></div>
					<h4 class="mt-3 fw-bold text-decoration-underline" style="text-transform: uppercase;">JOINT LIABILITY GROUP LOANS SEARCH REPORT</h4>
					<div id="searchReportFilterMeta" class="small text-muted mt-1" style="text-transform: uppercase;"></div>
				</div>

				<div class="card-body table-responsive p-0">
					<table class="table table-bordered table-striped text-center">
						<thead class="table-light">
							<tr>
								<th>#</th>
								<th>GROUP CODE</th>
								<th>COMMUNITY NAME</th>
								<th>COMMUNITY LEADER</th>
								<th>BRANCH</th>
								<th>LOAN SCHEME</th>
								<th>LOAN AMOUNT</th>
								<th>ROI (%)</th>
								<th>TENURE</th>
								<th>OPENING DATE</th>
								<th>STATUS</th>
								<th class="action-col">ACTION</th>
							</tr>
						</thead>
						<tbody id="loanRecordsTableBody">
							<tr>
								<td colspan="12">CLICK SEARCH TO LOAD GROUP LOAN RECORDS</td>
							</tr>
						</tbody>
					</table>
				</div>

				<!-- Signature Section for Print -->
				<div class="row mt-5 pt-4 text-center print-signatures" style="display: none;">
					<div class="col-4">
						<div class="border-top pt-2 fw-bold">PREPARED BY</div>
					</div>
					<div class="col-4">
						<div class="border-top pt-2 fw-bold">CHECKED BY</div>
					</div>
					<div class="col-4">
						<div class="border-top pt-2 fw-bold">BRANCH MANAGER / SEAL</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script src="${pageContext.request.contextPath}/js/Joinlibiliy/findLoanRecords.js"></script>
