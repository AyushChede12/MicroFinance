
<div class="pagetitle">
	<h1>Reports & Analytics</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-file-earmark-text"></i>
			</a></li>
			<li class="breadcrumb-item action">Investment Summary Statement</li>
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
					<button id="searchBtn" class="btn btn-dark">Find</button>
				</div>
			</div>

		</div>

	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">Search Result</h5>

					<h6 class="card-title" style="text-align: center; color: black;">
						Outstanding EMI Report</h6>


					<table class="table table-borderless datatable overflow-scroll">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">Bcode</th>
								<th scope="col">Branch Name</th>
								<th scope="col">New Business</th>
								<th scope="col">Fees(If any)</th>
								<th scope="col">Renew Business</th>
								<th scope="col">Late Fine</th>
							</tr>
						</thead>
						<tbody>
							<tr style="font-family: 'Poppins', sans-serif;">
								<td>B0001</td>
								<td>Umrer</td>
								<td>business</td>
								<td>2000</td>
								<td>RB</td>
								<td>200</td>
							</tr>




						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

</div>