
<div class="pagetitle">
	<h1>MATURITY MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-calendar-check"></i>
			</a></li>
			<li class="breadcrumb-item action">FULL PAYMENT STATUS</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH BOX</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">

					<div class="d-flex flex-column formFields">
						<label for="">BRANCH <span id="star"> *</span></label> <select
							value="branchName" id="branchName" name="branchName"
							required="required" class="form-control selectField"
							style="height: 30px;">
							<option value="">All BRANCH</option>

						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">FROM DATE <span id="star"> *</span>
							:
						</label> <input type="date" value="fromDate" name="fromDate" id="fromDate"
							required="required" placeholder="ENTER MEMBER NAME"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4"
						style="margin-bottom: 30px">
						<label>TO DATE <span id="star"> *</span> :
						</label> <input type="date" name="toDate" value="toDate" id="toDate"
							required="required" placeholder=""
							style="text-transform: uppercase;" />
					</div>
				</div>


			</div>
			<div class="row">
				<div class="col-12 text-center">
					<button type="submit" id="searchBtn" class="btn btn-dark">SEARCH</button>

				</div>
			</div>
		</div>

		<div class="row mt-5">
			<div class="col-12">
				<div class="card recent-sales">

					<div class="card-body table-responsive">
						<h5 class="card-title">
							<center>MATURITY PAYMENT REPORT</center>
							<span>|</span>
						</h5>

						<table class="table table-borderless datatable overflow-scroll"
							id="table">
							<thead class="table-light">
								<tr style="font-family: 'Poppins', sans-serif;">
									<th scope="col">S/N</th>
									<th scope="col">BRANCH</th>
									<th scope="col">POLICY NO.</th>
									<th scope="col">APPLICATION NAME</th>
									<th scope="col">MATURITY DATE</th>
									<th scope="col">SCHEME NAME </th>
									<th scope="col">SCHEME TYPE </th>
									<th scope="col">POLICY AMOUNT</th>
									<th scope="col">DEPOSITE AMOUNT </th>

								</tr>
							</thead>
							<tbody>

							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</form>
</div>


<script
	src="${pageContext.request.contextPath}/js/MaturityManagement/fullmaturitystatus.js"></script>