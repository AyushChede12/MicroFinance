
<div class="pagetitle">
	<h1>FINANCIAL CONUSLTANT </h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-briefcase text-blue"></i>
			</a></li>
			<li class="breadcrumb-item action">CONSULTANT ID CARD GENERATOR </li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">FINANCIAL CODE</label> <input type="text"
							id="searchKeyword" required="required"
							placeholder="Enter Advisor Code"
							style="text-transform: uppercase;" />
					</div>
				</div>
				<!-- <div class="row">
							<div class="col-1 text-center">
								<button id="saveBtn" class="btnStyle bg-success">Search</button>
							</div>
						</div> -->
			</div>
		</div>

	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">
						TABLE VIEW  <span>| RECORED</span>
					</h5>

					<div style="overflow-x: auto; white-space: nowrap;">
						<table class="table table-borderless datatable overflow-scroll">
							<thead class="table-light">
								<tr style="font-family: 'Poppins', sans-serif;">
									<th scope="col">Sl No.</th>
									<th scope="col"></th>
									<th scope="col">Financial Code</th>
									<th scope="col">Financial Name</th>
									<th scope="col">Contact No</th>
									<th scope="col">Branch</th>
									<th scope="col">Address</th>
									<th scope="col">District</th>
									<th scope="col">State</th>
									<th scope="col">Pin Code</th>
									<th scope="col">Profession</th>
									<th scope="col">Financial Status</th>
									<th scope="col">Generate</th>

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
	src="${pageContext.request.contextPath}/js/FinancialConsultant/ConsultantIDCardGenerator.js"></script>