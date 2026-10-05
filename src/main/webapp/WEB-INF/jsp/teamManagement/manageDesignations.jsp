
<div class="pagetitle">
	<h1>TEAM MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-person-workspace"></i>
			</a></li>
			<li class="breadcrumb-item action">MANAGE DESIGNATION</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">ADD DESIGNATION</li>
				</ol>
			</nav>
			<div class="row">

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">DESIGNATION NAME <span class="star">*</span></label>
						<input type="text" name="designationName"id="designationName" required="required"
							placeholder="ENTER DESIGNATION " /> <small
							id="chkdesignationname" style="color: red;"></small>
					</div>
				</div>

				<div class="row" style="margin-top: 15px; margin-left: 10px;">
					<div class="col-12 text-center">
						<button type="button" id="saveDesignationBtn"
							class="btnStyle bg-warning" onclick="saveDesignation()">SAVE</button>
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
					<h5 class="card-title">DESIGNATION LIST</h5>

					<table class="table table-borderless datatable overflow-scroll">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">S/N</th>
								<th scope="col">DESIGNATION</th>
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
	src="${pageContext.request.contextPath}/js/teamManagement/addDesignation.js"></script>