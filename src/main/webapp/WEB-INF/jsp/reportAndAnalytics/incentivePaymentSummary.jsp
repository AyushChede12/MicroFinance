
<div class="pagetitle">
	<h1>REPORTS & ANALYTICS</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-file-earmark-text"></i>
			</a></li>
			<li class="breadcrumb-item action">INCENTIVE PAYMENT SUMMARY </li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">FIND BOX</li>
				</ol>
			</nav>
			<div class="row">


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px;">
						<label for="">BRANCH </label> <select id="branch" name="branch"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT BRANCH</option>
							<option value="Blue">Umrer</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">FROM DATE :</label> <input type="date" name="fDate"
							id="fDate" required="required" placeholder="ENTER FDATE"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">TO DATE :</label> <input type="date" name="tDate"
							id="tDate" required="required" placeholder="ENTER TDATE"
							style="text-transform: uppercase;" />
					</div>
				</div>

			</div>

			<div class="row">
				<div class="col-4 text-start mt-3">
					<button id="findBtn" class="btn btn-dark">FIND</button>
				</div>
			</div>

		</div>

	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">FIND RESULT</h5>

					<h6 class="card-title" style="text-align: center; color: black;">
						BOUNS PAYMENT STATEMENT</h6>



					<div style="overflow-x: auto; white-space: nowrap;">
						<table class="table table-borderless datatable">
							<thead class="table-light">
								<tr style="font-family: 'Poppins', sans-serif;">
									<th scope="col">BRANCH</th>
									<th scope="col">PAY DATE</th>
									<th scope="col">ADVISOR CODE </th>
									<th scope="col">ADVISOR NAME</th>
									<th scope="col">MONTH</th>
									<th scope="col">AMOUNT</th>
									<th scope="col">PAY MODE</th>
									<th scope="col">CHQ NO.</th>
									<th scope="col">SB ACCOUNT</th>


								</tr>
							</thead>
							<tbody>
								<tr style="font-family: 'Poppins', sans-serif;">
									<td>Umrer</td>
									<td>11-05-2025</td>
									<td>A0001</td>
									<td>poonam</td>
									<td>3</td>
									<td>400</td>
									<td>cash</td>
									<td>ch001</td>
									<td>sb</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>

</div>
