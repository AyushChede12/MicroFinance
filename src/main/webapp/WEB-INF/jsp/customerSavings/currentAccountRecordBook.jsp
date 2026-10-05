
<div class="pagetitle">
	<h1>Customer Saving</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-bank text-blue"></i>
			</a></li>
			<li class="breadcrumb-item action">Current Account PassBook</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">Search Details</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">Select Account Number</label> <select id="colour"
							name="colour" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">Select Colour</option>
							<option value="Blue">Blue</option>
						</select>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12 text-center">
					<button id="saveBtn" class="btn btn-warning">Search</button>
					<button id="saveBtn" class="btnStyle"
						style="background-color: #FFA500;">Front Page</button>
					<button id="saveBtn" class="btn btn-primary">Transacton</button>
					<button id="saveBtn" class="btn btn-danger">Heading</button>
				</div>
			</div>
		</div>

		<div class="row mt-5">
			<div class="col-12">
				<div class="card recent-sales">

					<div class="card-body table-responsive">
						<h5 class="card-title">
							Recent Sales <span>| Today</span>
						</h5>

						<table class="table table-borderless datatable overflow-scroll">

						</table>
					</div>
				</div>
			</div>
		</div>
	</form>

</div>
