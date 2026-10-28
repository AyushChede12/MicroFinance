<div class="pagetitle">
	<h1>PREFERENCES</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-gear text-blue"></i>
			</a></li>
			<li class="breadcrumb-item action">CUSTOMER BALANCE REPORT</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="branchName">BRANCH:</label>
						<select id="branchName" name="branchName" required="required"
							class="form-control selectField" style="height: 30px; text-transform: uppercase;">
							<option value="">-- SELECT BRANCH --</option>
						</select>
					</div>
				</div>

				<div class="row mt-3" style="margin-left: 20px;">
					<div class="col-12 text-center">
						<button type="button" id="searchBranch" class="btnStyle bg-warning">SEARCH</button>
						<button type="button" id="searchAllBranch" class="btnStyle bg-danger">ALL BRANCH</button>
					</div>
				</div>
			</div>

			<div class="mt-5">
				<nav>
					<ol class="breadcrumb breadcrumb-title">
						<li class="breadcrumb-item action">BALANCE SHEET</li>
					</ol>
				</nav>
				<div class="row">
					<div class="col-12">
						<div class="card recent-sales">
							<div class="card-body table-responsive">
								<h5 class="card-title">
									TRANSACTIONS <span>| TODAY</span>
								</h5>

								<table class="table table-borderless datatable overflow-scroll">
									<thead class="table-light">
										<tr style="font-family: 'Poppins', sans-serif;">
											<th scope="col">#</th>
											<th scope="col">BRANCH</th>
											<th scope="col">TRANSACTION DATE</th>
											<th scope="col">CUSTOMER CODE</th>
											<th scope="col">AMOUNT</th>
											<th scope="col">PAYMENT MODE</th>
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
<script src="${pageContext.request.contextPath}/js/preferences/balanceSheet.js"></script>