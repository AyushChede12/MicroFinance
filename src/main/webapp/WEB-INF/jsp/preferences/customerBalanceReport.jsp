
		<div class="pagetitle">
			<h1>Preferences</h1>
			<nav>
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="openDashboard"> <i
							class="bi bi-gear text-blue"></i>
					</a></li>
					<li class="breadcrumb-item action">Customer Balance Report</li>
				</ol>
			</nav>
		</div>

		<div>
			<form id="formid">
				<div>
					<nav>
						<ol class="breadcrumb breadcrumb-title">
							<li class="breadcrumb-item action">Search</li>
						</ol>
					</nav>
					<div class="row">
						<div class="col-lg-3">

							<div class="d-flex flex-column formFields">
								<label for="">Branch:</label> <select id="branchName"
									name="branchName" required="required"
									class="form-control selectField" style="height: 30px;">
								</select>
							</div>





						</div>

						<div class="row mt-3" style="margin-left: 20px;">
							<div class="col-12 text-center">
								<button type="button" id="searchBranch" class="btnStyle bg-warning">Search</button>
								<button type="button" id="searchAllBranch" class="btnStyle bg-danger">All
									Branch</button>
							</div>
						</div>

					</div>

					<div class="mt-5">

						<nav>
							<ol class="breadcrumb breadcrumb-title">
								<li class="breadcrumb-item action">Balance Sheet</li>
							</ol>
						</nav>
						<div class="row">


							<div class="col-12">
								<div class="card recent-sales">

									<div class="card-body table-responsive">
										<h5 class="card-title">
											Transactions <span>| Today</span>
										</h5>

										<table
											class="table table-borderless datatable overflow-scroll">
											<thead class="table-light">
												<tr style="font-family: 'Poppins', sans-serif;">
													<th scope="col">#</th>
													<th scope="col">Branch</th>
													<th scope="col">Transaction Date</th>
													<th scope="col">Customer Code</th>
													<th scope="col">Amount</th>
													<th scope="col">Payment Mode</th>
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


			</form>



		</div>
<script src="${pageContext.request.contextPath}/js/preferences/customerBalanceReport.js"></script>