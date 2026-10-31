<style>
.formFields input {
	text-transform: uppercase;
}
.formFields input::placeholder {
	text-transform: uppercase;
}
</style>

<div class="pagetitle">
	<h1>TEAM MANAGEMENT</h1>
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
	<form id="formid" autocomplete="off">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">ADD DEPARTMENT MASTER</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="departmentName">DEPARTMENT NAME <span class="text-danger">*</span></label> 
						<input type="text" name="departmentName" id="departmentName" required="required"
							placeholder="ENTER DEPARTMENT NAME" style="text-transform: uppercase;" />
						<small id="chkdepartmentname" style="color: red;"></small>
					</div>
				</div>
				<div class="col-lg-3 d-flex align-items-end mb-2">
					<button type="button" id="saveDepartmentBtn" class="btnStyle bg-warning" onclick="saveDepartment()">
						SAVE DEPARTMENT
					</button>
				</div>
			</div>
		</div>
	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">
				<div class="card-body table-responsive">
					<h5 class="card-title" style="font-weight: 700; text-transform: uppercase;">DEPARTMENT MASTER LIST</h5>

					<table class="table table-bordered table-hover align-middle">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col" style="width: 10%;">S/N</th>
								<th scope="col" style="width: 70%;">DEPARTMENT NAME</th>
								<th scope="col" style="width: 20%;">ACTION</th>
							</tr>
						</thead>
						<tbody id="departmentTableBody">
							<tr>
								<td colspan="3" class="text-center text-muted">LOADING DEPARTMENTS...</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<script src="${pageContext.request.contextPath}/js/TeamManagement/addDepartment.js"></script>
