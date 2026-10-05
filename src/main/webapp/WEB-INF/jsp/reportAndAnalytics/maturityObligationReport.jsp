
<div class="pagetitle">
	<h1>Reports & Analytics</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-file-earmark-text"></i>
			</a></li>
			<li class="breadcrumb-item action">Maturity Obligation Report</li>
		</ol>
	</nav>
</div>
<div>
	<nav>
		<ol class="breadcrumb breadcrumb-title">
			<li class="breadcrumb-item action">Find Box</li>
		</ol>
	</nav>
	<div class="row">
		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="">Branch:</label> <select id="colour" name="colour"
					required="required" class="form-control selectField mb-4"
					style="height: 30px;">
					<option value="">Select Colour</option>
					<option value="Blue">Blue</option>
				</select>
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="">Plan Name:</label> <select id="colour" name="colour"
					required="required" class="form-control selectField mb-4"
					style="height: 30px;">
					<option value="">Select Colour</option>
					<option value="Blue">Blue</option>
				</select>
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="vehicalNo">From Date</label> <input type="date"
					name="vehicalNo" id="vehicalNo" required="required"
					placeholder="Enter Vehicle No" style="text-transform: uppercase;" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="vehicalNo">To Date</label> <input type="date"
					name="vehicalNo" id="vehicalNo" required="required"
					placeholder="Enter Vehicle No" style="text-transform: uppercase;" />
			</div>
		</div>

	</div>
</div>
<div class="row">
	<div class="col-4 text-start mt-3">
		<button id="findBtn" class="btn btn-dark">Find</button>
	</div>
</div>

<div class="row mt-5">
	<div class="col-12">
		<div class="card recent-sales">
			<div class="card-body table-responsive">
				<div class="d-flex justify-content-between align-items-center">
					<h5 class="card-title">
						Search Result <span>|Maturity Liability Report</span>
					</h5>
				</div>
				<div style="overflow-x: auto; white-space: nowrap;">
					<table class="table table-borderless datatable">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">SR.NO.</th>
								<th scope="col">POLICY NO.</th>
								<th scope="col">APPLICANT NAME</th>
								<th scope="col">BRANCH</th>
								<th scope="col">ADVISOR</th>
								<th scope="col">MATURITY DATE</th>
								<th scope="col">PLAN NAME</th>
								<th scope="col">PLAN CODE</th>
								<th scope="col">POLICY AMT</th>
								<th scope="col">TOTAL PAID</th>
								<th scope="col">CALCULATE MATURITY</th>
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
