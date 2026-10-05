
<div class="pagetitle">
	<h1>REPORTS & ANALYTICS</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-file-earmark-text"></i>
			</a></li>
			<li class="breadcrumb-item action">CHEQUE TRANSACTION REPORT</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">FIND BOX</li>
				</ol>
			</nav>
			<div class="row">

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px;">
						<label for="">TYPE </label><select id="type" name="type"
							class="form-control selectField" style="height: 30px;">
							<option value="">ALL TYPE</option>
							<option value="ISSUED">CHEQUE ISSUED</option>
							<option value="RECEIVED">CHEQUE RECEIVED</option>
							<option value="CLEARED">CLEARED CHEQUE</option>
							<option value="BOUNCED">BOUNCED CHEQUE</option>
							<option value="PENDING">PENDING CHEQUE</option>
							<option value="CANCELLED">CANCELLED CHEQUE</option>
							<option value="TRANSFERRED">TRANSFERRED CHEQUE</option>
						</select>

					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px;">
						<label for="branchName">ALL BRANCH</label> <select id="branchName"
							name="branchName" required="required"
							class="form-control selectField" style="height: 30px;">
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">FROM DATE :</label> <input type="date" name="fDate"
							id="fDate" required="required" placeholder="Enter fDate"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">TO DATE :</label> <input type="date" name="tDate"
							id="tDate" required="required" placeholder="Enter tDate"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px;">
						<label for="">CHECK NUMBER.</label> <input type="text"
							id="chequeNo" name="chequeNo" required="required"
							style="height: 30px;" placeholder="ENTER CHEQUE NO.">

					</div>
				</div>



			</div>

			<div class="row">
				<div class="col-4 text-start mt-3">
					<button type="button" id="findBtn" class="btn btn-dark">FIND</button>
				</div>
			</div>

		</div>

	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">CHEQUE DETAILS</h5>

					<div style="overflow-x: auto; white-space: nowrap;">
						<table class="table table-borderless datatable"
							style="text-align: center;">
							<thead class="table-light">
								<tr style="font-family: 'Poppins', sans-serif;">
									<th scope="col">SR.NO</th>
									<th scope="col">ACCOUNT HOLDER NAME</th>
									<th scope="col">TXN DATE</th>
									<th scope="col">CHEQUE NO.</th>
									<th scope="col">PAYMENT STATUS</th>
									<th scope="col">PRINT</th>

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

</div>

<script>
	var contextPath = "${pageContext.request.contextPath}";
	console.log("JSP contextPath =", contextPath);
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script
	src="${pageContext.request.contextPath}/js/ReportsAndAnalytics/ChequeTransactionReport.js"></script>

