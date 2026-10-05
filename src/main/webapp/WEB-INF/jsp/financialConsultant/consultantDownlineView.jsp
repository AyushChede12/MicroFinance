
<div class="pagetitle">
	<h1>FINANCIAL CONSULTANT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-briefcase text-blue"></i>
			</a></li>
			<li class="breadcrumb-item action">CONSULTANT DOWNLINE VIEW</li>
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
					<input type="hidden" id="id" name="name">
					<div class="d-flex flex-column formFields">
						<label for="">SEARCH BY NAME OR CONUSLTANT CODE <span
							id="star">*</span></label> <input type="text" id="searchKeyword"
							placeholder="Search by Name or Code"
							class="form-control d-inline w-auto" />
					</div>
				</div>


			</div>

		</div>

	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">
				<div class="card-body">
					<h5 class="card-title">
						TABLE VIEW <span>| RECORED</span>
					</h5>

					<div style="overflow-x: auto; white-space: nowrap;">
						<table class="table table-borderless datatable"
							style="min-width: 1000px;">
							<thead class="table-light"
								style="position: sticky; top: 0; background: #f8f9fa; z-index: 2;">
								<tr style="font-family: 'Poppins', sans-serif;">
									<th scope="col">Sr No.</th>
									<th scope="col">Financial Name</th>
									<th scope="col">Financial Code</th>
									<th scope="col">Contact No</th>
									<th scope="col">Joining Date</th>
									<th scope="col">Address</th>
									<th scope="col">Branch</th>
									<th scope="col">Financial Status</th>
									<th scope="col">Edit</th>
									<th scope="col">Delete</th>
								</tr>
							</thead>
							<tbody>
								<!-- Table body will be populated via AJAX -->
							</tbody>
						</table>
					</div>

				</div>
			</div>
		</div>
	</div>

	<script
		src="${pageContext.request.contextPath}/js/FinancialConsultant/consultantDownlineView.js"></script>