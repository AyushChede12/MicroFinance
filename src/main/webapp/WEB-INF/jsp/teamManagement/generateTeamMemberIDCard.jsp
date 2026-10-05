
<div class="pagetitle">
	<h1>TEAM MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-person-workspace"></i>
			</a></li>
			<li class="breadcrumb-item action"> GENERATE TEAM ID CARD </li>
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

				<div class="col-lg-3 mb-3">
					<div class="d-flex flex-column formFields">
						<label for="">TEAM MEMBER</label> <select id="teamMemberCode"
							name="teamMemberCode" required="required"
							onchange="fetchTeamMemberDataByCode();"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT TEAM MEMBER</option>
						</select>
					</div>
				</div>
			</div>

			<!-- <div class="row">
						<div class="col-4 text-start mt-3">
							<button id="searchBtn" class="btnStyle bg-warning" onclick="showTeamMemberDetailsByCode();">Search</button>
						</div>
					</div> -->

		</div>

	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">SEARCH RESULT </h5>

					<table class="table table-borderless datatable overflow-scroll">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">ID</th>
								<th scope="col">Team Member Name</th>
								<th scope="col">Branch Name</th>
								<th scope="col">Sign-Up Date</th>
								<th scope="col">Date Of Birth</th>
								<th scope="col">Contact No.</th>
								<th scope="col">Address</th>
								<th scope="col">Department</th>
							</tr>
						</thead>
						<tbody id="tabelBody">

						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

</div>



<script>
	$(document).ready(function() {
		teamMemberCodeDropdown();
	});
</script>
<script>
	$(document).ready(function() {

		// Convert all labels inside #formid to uppercase
		$("#formid label").each(function() {
			$(this).text($(this).text().toUpperCase());
		});

		// Convert all placeholders inside #formid to uppercase
		$("#formid input, #formid textarea, #formid select").each(function() {
			let ph = $(this).attr("placeholder");
			if (ph) {
				$(this).attr("placeholder", ph.toUpperCase());
			}
		});

	});
</script>
<script
	src="${pageContext.request.contextPath}/js/teamManagement/generateTeamMemberID.js"></script>