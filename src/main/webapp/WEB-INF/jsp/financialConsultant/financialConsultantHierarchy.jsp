
<div class="pagetitle">
	<h1>FINANCIAL CONSULTANT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-briefcase text-blue"></i>
			</a></li>
			<li class="breadcrumb-item action">FINANCIAL CONSULTANT HIERARCHY
			</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SERACH</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">

					<div class="d-flex flex-column formFields">
						<label for="">FINANCIAL CONSULTANT CODE <span id="star">*</span></label>
						<input type="text" name="financialCode" id="financialCode"
							required="required" placeholder="Enter FinancialCode"
							style="text-transform:" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="customerName">FINANCIAL NAME</label> <input
							type="text" name="financialName" id="financialName"
							required="required" placeholder="Enter Financial Consultant Name"
							style="text-transform: uppercase;" readonly />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>POSITION</label> <input type="text" name="selectPosition"
							id="selectPosition" required="required"
							placeholder="Enter Position" style="text-transform: uppercase;"
							readonly />
					</div>
				</div>


			</div>
			<div class="row">
				<div class="col-1 text-center">
					<button type="button" id="searchBtn" class="btnStyle bg-success">SERACH</button>
				</div>
			</div>
		</div>

	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">
						TABLE VIEW <span>| RECORD</span>
					</h5>

					<table class="table table-borderless datatable overflow-scroll">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">Sr No.</th>
								<th scope="col">Financial Name</th>
								<th scope="col">Financial Code</th>
								<th scope="col">Contact No</th>
								<th scope="col">Joining Date</th>
								<th scope="col">Address</th>
								<th scope="col">Branch</th>
								<th scope="col">Financial Status</th>

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
<script
	src="${pageContext.request.contextPath}/js/FinancialConsultant/financialConsultantHierarchy.js"></script>