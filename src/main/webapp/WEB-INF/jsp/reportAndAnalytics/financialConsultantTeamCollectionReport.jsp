
<div class="pagetitle">
	<h1>REPORTS & ANALYTICS</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-file-earmark-text"></i>
			</a></li>
			<li class="breadcrumb-item action">FINANCIAL CONSULTANT TEAM COLLECTION REPORT</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH TEAM COLLECTION</li>
				</ol>
			</nav>
			<div class="row">

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px;">
						<label for="advisorCode">FINANCIAL CODE <span class="star">*</span></label> <input type="text"
							id="advisorCode" name="advisorCode" required="required"
							class="form-control selectField" style="height: 30px; text-transform: uppercase;"
							placeholder="ENTER FINANCIAL CODE">
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="fDate">FROM DATE :</label> <input type="date" name="fDate"
							id="fDate" required="required" placeholder="ENTER FROM DATE"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="tDate">TO DATE :</label> <input type="date" name="tDate"
							id="tDate" required="required" placeholder="ENTER TO DATE"
							style="text-transform: uppercase;" />
					</div>
				</div>

			</div>

			<div class="row">
				<div class="col-4 text-start mt-3">
					<button id="findBtn" type="button" class="btn btn-dark">FIND COLLECTION</button>
				</div>
			</div>

		</div>

	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">COLLECTION RECORDS</h5>

					<h6 class="card-title" style="text-align: center; color: black;">
						FINANCIAL CONSULTANT TEAM COLLECTION REPORT</h6>

					<div style="overflow-x: auto; white-space: nowrap;">
						<table class="table table-borderless datatable">
							<thead class="table-light">
								<tr style="font-family: 'Poppins', sans-serif;">
									<th scope="col">TEAM / SELF</th>
									<th scope="col">DATE</th>
									<th scope="col">POLICY NO.</th>
									<th scope="col">INST NO.</th>
									<th scope="col">APPLICANT NAME</th>
									<th scope="col">PLAN CODE</th>
									<th scope="col">ADVISOR CODE</th>
									<th scope="col">AMOUNT</th>
									<th scope="col">CLEARED AMOUNT</th>
									<th scope="col">UNCLEARED AMOUNT</th>
									<th scope="col">PAY MODE</th>
									<th scope="col">CHEQUE NO.</th>
								</tr>
							</thead>
							<tbody>
								<tr style="font-family: 'Poppins', sans-serif;">
									<td>TEAM</td>
									<td>13-05-2025</td>
									<td>PK001</td>
									<td>01</td>
									<td>POONAM SHARMA</td>
									<td>P001</td>
									<td>FC00001</td>
									<td>500.00</td>
									<td>500.00</td>
									<td>0.00</td>
									<td>CASH</td>
									<td>-</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>

</div>
