
<div class="pagetitle">
	<h1>REPORTS & ANALYTICS</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-file-earmark-text"></i>
			</a></li>
			<li class="breadcrumb-item action">Finicial Consultant Team
				Collection Report</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">Find Information</li>
				</ol>
			</nav>
			<div class="row">

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px;">
						<label for="">Finicial Code </label> <input type="text"
							id="advisorCode" name="advisorCode" required="required"
							class="form-control selectField" style="height: 30px;"
							placeholder="Enter Advisor Code">

					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">From Date :</label> <input type="date" name="fDate"
							id="fDate" required="required" placeholder="Enter fDate"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">TO Date :</label> <input type="date" name="tDate"
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
						Advisor Team Collection Report</h6>


					<div style="overflow-x: auto; white-space: nowrap;">
						<table class="table table-borderless datatable">
							<thead class="table-light">
								<tr style="font-family: 'Poppins', sans-serif;">
									<th scope="col">Team/Self Summary</th>
									<th scope="col">Date</th>
									<th scope="col">Policy No.</th>
									<th scope="col">INO</th>
									<th scope="col">Application Name</th>
									<th scope="col">Plan Code</th>
									<th scope="col">Advisor Code</th>
									<th scope="col">Amount</th>
									<th scope="col">Cleared Amount</th>
									<th scope="col">Un-Cleared Amount</th>
									<th scope="col">Pay Mode</th>
									<th scope="col">Chq No</th>

								</tr>
							</thead>
							<tbody>
								<tr style="font-family: 'Poppins', sans-serif;">
									<td>Team</td>
									<td>13-05-2025</td>
									<td>pk001</td>
									<td>ino</td>
									<td>Poonam</td>
									<td>P001</td>
									<td>A001</td>
									<td>500</td>
									<td>600</td>
									<td>700</td>
									<td>Cash</td>
									<td>ch001</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>

</div>