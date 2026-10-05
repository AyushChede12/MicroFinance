

<div class="pagetitle">
	<h1>SAVING / CURRENT ACCOUNT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-bank text-blue"></i>
			</a></li>
			<li class="breadcrumb-item action">CUSTOMER SAVINGS STATEMENT</li>
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
					<div class="d-flex flex-column formFields mb-4">
						<label for="">ACCOUNT NUMBER</label> <select id="accountNumber"
							name="accountNumber" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">--SELECT ACCOUNT NO--</option>
						</select>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-6 text-center">
					<button id="searchByAccNo" class="btn btn-warning"
						style="margin-left: 80%;">SEARCH</button>
				</div>
			</div>

		</div>

		<div class="row mt-5">
			<div class="col-12">
				<div class="card recent-sales">
					<div class="card-body">

						<h5 class="card-title">
							SAVING STATEMENT <span>| TODAY</span>
						</h5>

						<div id="form-div" class="mt-4">

							<!-- HEADER -->
							<div class="text-center mb-3">
								<h3 style="color: red; margin-bottom: 0;">MICROFINANCE
									SOFTWARE</h3>
								<p style="margin-top: -5px;">NAGPUR</p>
							</div>

							<div class="border-bottom text-center mb-3">
								<h4 class="mb-2">NEW RECEIPT</h4>
							</div>

							<!-- DETAILS SECTION -->
							<div class="row mb-3">
								<div class="col-md-7 col-sm-12">
									<p>
										<strong>ACCOUNT NO :</strong> <span id="accountNoDisplay"></span>
									</p>
									<p>
										<strong>A/C HOLDER NAME :</strong> <span id="memberName"></span>
									</p>
									<p>
										<strong>RELATIVE NAME/RELATION :</strong> <span
											id="relativeDetails"></span>
									</p>
									<p>
										<strong>ADDRESS :</strong> <span id="address"></span>
									</p>
								</div>

								<div class="col-md-5 col-sm-12">
									<p>
										<strong>OP. DATE :</strong> <span id="opDate"></span>
									</p>
									<p>
										<strong>CUSTOMER CODE :</strong> <span id="selectMember"></span>
									</p>
									<p>
										<strong>MODE OF OP. :</strong> <span id="modeOfOp"></span>
									</p>
									<p>
										<strong>OP. BRANCH :</strong> <span id="BranchName"></span>
									</p>
								</div>
							</div>

							<!-- TABLE SECTION -->
							<div class="table-responsive" style="overflow-x: auto;">
								<table class="table table-bordered table-striped">
									<thead class="table-light">
										<tr>
											<th>ACCOUNT NO.</th>
											<th>TXN DATE</th>
											<th>CREDIT</th>
											<th>DEBIT</th>
											<th>BALANCE</th>
											<th>PAYMODE</th>
											<th>BRANCH</th>
											<th>REMARKS</th>
										</tr>
									</thead>
									<tbody id="tableSavingAcc">
										<!-- dynamic rows -->
									</tbody>
								</table>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>

	</form>

</div>
<script
	src="${pageContext.request.contextPath}/js/customerSavings/savingsAccountStatement.js"></script>