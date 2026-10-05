
<div class="pagetitle">
	<h1>Reports & Analytics</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-file-earmark-text"></i>
			</a></li>
			<li class="breadcrumb-item action">Policy Performance Report</li>
		</ol>
	</nav>
</div>
<div>
	<nav>
		<ol class="breadcrumb breadcrumb-title">
			<li class="breadcrumb-item action">Find Box</li>
		</ol>
	</nav>
	<div class="row">
		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label for="">select by policy no.:</label> <select id="colour"
					name="colour" required="required"
					class="form-control selectField mb-4" style="height: 30px;">
					<option value="">Select Colour</option>
					<option value="Blue">Blue</option>
				</select>
			</div>
		</div>


	</div>
</div>
<div class="row">
	<div class="col-4 text-start mt-3">
		<button id="findBtn" class="btn btn-dark">Find</button>
	</div>
</div>

<div class="row mt-5">
	<div class="col-12">
		<div class="card recent-sales">
			<div class="card-body table-responsive">
				<div class="d-flex justify-content-between align-items-center">
					<h5 class="card-title">
						Find Result <span></span>
					</h5>
				</div>
				<div style="overflow-x: auto; white-space: nowrap;">
					<table class="table table-borderless datatable">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">CSP NAME</th>
								<th scope="col">ADDRESS</th>
								<th scope="col">ADVISOR CODE</th>
								<th scope="col">ADVISOR NAME</th>
								<th scope="col">AGE</th>
								<th scope="col">CHKIS SMS</th>
								<th scope="col">SISTRICT</th>
								<th scope="col">DOB</th>
								<th scope="col">JOINT CODE</th>
								<th scope="col">JOINT NAME</th>
								<th scope="col">MATURITY DATE</th>
								<th scope="col">MIS INTEREST</th>
								<th scope="col">MATURITY AMOUNT</th>
								<th scope="col">MEMBER NAME</th>
								<th scope="col">MIS MODE</th>
								<th scope="col">MODE</th>
								<th scope="col">MODE OF OP</th>
								<th scope="col">NOMINEE AGE</th>
								<th scope="col">NOMINEE NAME</th>
								<th scope="col">NOMINEE RELATION</th>
								<th scope="col">PAYMODE</th>
								<th scope="col">PHONE NO.</th>
								<th scope="col">PIN</th>
								<th scope="col">POLICY AMOUNT</th>
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
