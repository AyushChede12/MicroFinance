 	<div class="pagetitle">
	<h1>TEAM MANAGEMENT </h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-person-workspace"></i>
			</a></li>
			<li class="breadcrumb-item action">MANAGE DEPARTMENT</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">ADD DEPARTMENT MASTER</li>
				</ol>
			</nav>
			<div class="row">

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">DEPARTMENT NAME </label> <input type="text"
							name="departmentName" id="departmentName" required="required"
							placeholder="ENETR DEPARTMENT" />
					</div>
				</div>
				<div class="row" style="margin-top: 15px; margin-left: 10px;">
					<div class="col-12 text-center">
						<button id="saveDepartmentBtn" class="btnStyle bg-warning"
							onclick="saveDepartment()">SAVE</button>
						<!-- <button id="clearBtn" class="btnStyle bg-secondary">Clear</button> -->
					</div>
				</div>
			</div>

		</div>

	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">DEPARTMENT LLIST</h5>

					<table class="table table-borderless datatable overflow-scroll">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">S/N</th>
								<th scope="col">DEPARTMENT NAME</th>
							</tr>
						</thead>
						<tbody id="tableBody">

						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

</div>

<script
	src="${pageContext.request.contextPath}/js/teamManagement/addDepartment.js"></script>

