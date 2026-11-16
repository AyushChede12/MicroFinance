
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
					<li class="breadcrumb-item action">SEARCH CONSULTANT DOWNLINE</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-4">
					<input type="hidden" id="id" name="name">
					<div class="d-flex flex-column formFields">
						<label for="searchKeyword">SEARCH BY NAME OR CONSULTANT CODE <span
							id="star">*</span></label> <input type="text" id="searchKeyword"
							placeholder="ENTER NAME OR FINANCIAL CODE"
							class="form-control d-inline w-auto"
							style="text-transform: uppercase;" />
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
						TABLE VIEW <span>| DOWNLINE RECORDS</span>
					</h5>

					<div style="overflow-x: auto; white-space: nowrap;">
						<table class="table table-borderless datatable"
							style="min-width: 1000px;">
							<thead class="table-light"
								style="position: sticky; top: 0; background: #f8f9fa; z-index: 2;">
								<tr style="font-family: 'Poppins', sans-serif;">
									<th scope="col">SR NO.</th>
									<th scope="col">FINANCIAL NAME</th>
									<th scope="col">FINANCIAL CODE</th>
									<th scope="col">CONTACT NO.</th>
									<th scope="col">JOINING DATE</th>
									<th scope="col">ADDRESS</th>
									<th scope="col">BRANCH</th>
									<th scope="col">FINANCIAL STATUS</th>
									<th scope="col">EDIT</th>
									<th scope="col">DELETE</th>
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
