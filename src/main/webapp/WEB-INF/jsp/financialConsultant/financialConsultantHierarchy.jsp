
<div class="pagetitle">
	<h1>FINANCIAL CONSULTANT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-briefcase text-blue"></i>
			</a></li>
			<li class="breadcrumb-item action">FINANCIAL CONSULTANT HIERARCHY</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH CONSULTANT HIERARCHY</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="financialCode">FINANCIAL CONSULTANT CODE <span id="star">*</span></label>
						<input type="text" name="financialCode" id="financialCode"
							required="required" placeholder="ENTER FINANCIAL CODE"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="financialName">FINANCIAL NAME</label> <input
							type="text" name="financialName" id="financialName"
							placeholder="FINANCIAL CONSULTANT NAME"
							style="text-transform: uppercase;" readonly />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>POSITION</label> <input type="text" name="selectPosition"
							id="selectPosition"
							placeholder="DESIGNATION / POSITION" style="text-transform: uppercase;"
							readonly />
					</div>
				</div>

				<div class="col-lg-3 d-flex align-items-center">
					<button type="button" id="searchBtn" class="btnStyle bg-success mt-2">SEARCH</button>
				</div>
			</div>
		</div>

	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">
						TABLE VIEW <span>| HIERARCHY RECORDS</span>
					</h5>

					<table class="table table-borderless datatable overflow-scroll">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">SR NO.</th>
								<th scope="col">LEVEL / ROLE</th>
								<th scope="col">FINANCIAL NAME</th>
								<th scope="col">FINANCIAL CODE</th>
								<th scope="col">POSITION</th>
								<th scope="col">CONTACT NO.</th>
								<th scope="col">JOINING DATE</th>
								<th scope="col">BRANCH</th>
								<th scope="col">INTRODUCER CODE</th>
								<th scope="col">FINANCIAL STATUS</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td colspan="10" class="text-center text-muted">PLEASE ENTER FINANCIAL CONSULTANT CODE TO VIEW HIERARCHY</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

</div>
<script
	src="${pageContext.request.contextPath}/js/FinancialConsultant/financialConsultantHierarchy.js"></script>
