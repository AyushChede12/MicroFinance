
<div class="pagetitle">
	<h1>FINANCIAL CONSULTANT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-briefcase text-blue"></i>
			</a></li>
			<li class="breadcrumb-item action">CONSULTANT ID CARD GENERATOR</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH FINANCIAL CONSULTANT</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="searchKeyword">FINANCIAL CONSULTANT CODE / NAME</label> <input type="text"
							id="searchKeyword"
							placeholder="ENTER FINANCIAL CODE OR NAME"
							style="text-transform: uppercase;" />
					</div>
				</div>
			</div>
		</div>

	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">
						TABLE VIEW <span>| CONSULTANT ID CARD RECORDS</span>
					</h5>

					<div style="overflow-x: auto; white-space: nowrap;">
						<table class="table table-borderless datatable overflow-scroll">
							<thead class="table-light">
								<tr style="font-family: 'Poppins', sans-serif;">
									<th scope="col">SL NO.</th>
									<th scope="col">SELECT</th>
									<th scope="col">FINANCIAL CODE</th>
									<th scope="col">FINANCIAL NAME</th>
									<th scope="col">CONTACT NO.</th>
									<th scope="col">BRANCH</th>
									<th scope="col">ADDRESS</th>
									<th scope="col">DISTRICT</th>
									<th scope="col">STATE</th>
									<th scope="col">PIN CODE</th>
									<th scope="col">POSITION</th>
									<th scope="col">FINANCIAL STATUS</th>
									<th scope="col">GENERATE ID CARD</th>
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
