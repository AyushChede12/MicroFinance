
<div class="pagetitle">
	<h1>Reports & Analytics</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-file-earmark-text"></i>
			</a></li>
			<li class="breadcrumb-item action">EMI Irregularity Statement</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">Find Box</li>
				</ol>
			</nav>
			<div class="row">


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px;">
						<label for="">Branch </label> <select id="branch" name="branch"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">Select Branch</option>
							<option value="Blue">Umrer</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">From Date</label> <input type="date" name="fDate"
							id="fDate" required="required" placeholder="Enter tDate"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">To Date</label> <input type="date" name="tDate"
							id="tDate" required="required" placeholder="Enter tDate"
							style="text-transform: uppercase;" />
					</div>
				</div>

			</div>

			<div class="row">
				<div class="col-4 text-start mt-3">
					<button id="findBtn" class="btn btn-dark">Find</button>
				</div>
			</div>

		</div>

	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">Find Result</h5>

					<h6 class="card-title" style="text-align: center; color: black;">
						EMI Status Report</h6>



					<div style="overflow-x: auto; white-space: nowrap;">
						<table class="table table-borderless datatable">
							<thead class="table-light">
								<tr style="font-family: 'Poppins', sans-serif;">
									<th scope="col">SN</th>
									<th scope="col">Loan ID</th>
									<th scope="col">Member Code</th>
									<th scope="col">Member Name</th>
									<th scope="col">Branch</th>
									<th scope="col">Pay Date</th>
									<th scope="col">Pay Amount</th>
									<th scope="col">Principal</th>
									<th scope="col">Interest</th>
									<th scope="col">Pay Mode</th>
									<th scope="col">Cheque No</th>
									<th scope="col">SB Account</th>
									<th scope="col">Collector Code</th>

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
