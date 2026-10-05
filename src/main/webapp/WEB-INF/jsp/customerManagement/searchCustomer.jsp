
<div class="pagetitle">
	<h1>CUSTOMER MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-people-fill"></i>
			</a></li>
			<li class="breadcrumb-item action">SEARCH CUSTOMER</li>
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
						<label for="">BRANCH</label> <select id="branchName"
							name="branchName" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT BRANCH</option>

						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CUSTOMER NAME</label> <input type="text"
							name="customerName" id="customerName" required="required"
							placeholder="ENTER CUSTOMER NAME" style="text-transform: uppercase;"/>
					</div>
				</div>

			</div>
		</div>
	</form>
</div>

<div class="row mt-5">
	<div class="col-12">
		<div class="card recent-sales">

			<div class="card-body table-responsive">
				<table class="table table-borderless datatable"
					style="white-space: nowrap;">
					<thead class="table-light">
						<tr
							style="font-family: 'Poppins', sans-serif; white-space: nowrap;">
							<th scope="col">SR NO.</th>
							<th scope="col">CUSTOMER CODE</th>
							<th scope="col">CUSTOMER NAME</th>
							<th scope="col">GENDER</th>
							<th scope="col">DATE OF BIRTH</th>
							<th scope="col">BRANCH</th>
							<th scope="col">CONTACT NO.</th>
							<th scope="col">NOMINEE NAME</th>
							<th scope="col">ADDRESS</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<script
	src="${pageContext.request.contextPath}/js/customerManagement/searchCustomer.js"></script>
