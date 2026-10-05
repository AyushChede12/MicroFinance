
<div class="pagetitle">
	<h1>JOINT LIABILITY LOAN</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-person-bounding-box"></i>
			</a></li>
			<li class="breadcrumb-item action">STATEMENT OF ACCOUNT</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH DETAILS FOR PRINT</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="groupCode">FIND BY GROUP CODE *</label> <select
							id="groupCode" name="groupCode" required
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT CUSTOMER NAME</option>
						</select>
					</div>
				</div>



			</div>


		</div>




	</form>
	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">
				<div class="card-body table-responsive">
					<h5 class="card-title">DETAILS SEARCH LIST </h5>
					<table class="table table-bordered">
						<thead class="thead-light">
							<tr>
								<th>GROUP ID</th>
								<th>COMMUNITY NAME</th>
								<th>OPENING DATE</th>
								<th>BRANCH NAME</th>
								<th>COMMUNITY LEADER</th>
								<th>COMMUNITY ADDRESS</th>
								<th>CONTACT NO</th>
								<th>SCHEDULED COLLECTION DAYS</th>
								<th>SCHEDULED TIME</th>





							</tr>
						</thead>
						<tbody id="InstallmentLoanBody">


							<!-- More rows -->
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

</div>

<script
	src="${pageContext.request.contextPath}/js/Joinlibiliy/statementOfAccount.js"></script>

