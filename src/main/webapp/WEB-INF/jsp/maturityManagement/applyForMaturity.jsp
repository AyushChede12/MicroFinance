
<style>
.pagination {
	display: flex;
	position: relative;
	justify-content: space-between;
	align-items: center;
	margin: 20px 0;
	padding: 10px 20px;
	background-color: #f7f7f7;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pagination h6 {
	margin: 0;
	font-size: 16px;
}

.pagination-controls {
	display: flex;
	gap: 8px;
}

.page-btn {
	background-color: #1976d2;
	color: #fff;
	border: none;
	padding: 6px 12px;
	border-radius: 4px;
	cursor: pointer;
}

.page-btn:hover:not(.current-page) {
	background-color: #125ea2;
}

.page-btn:disabled {
	background-color: #ccc;
	cursor: not-allowed;
}

.current-page {
	background-color: #e0e0e0;
	color: #333;
	padding: 6px 12px;
	border-radius: 4px;
	font-weight: bold;
}

.loading-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(255, 255, 255, 0.8);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.table-responsive {
	position: relative;
}
</style>

<div class="pagetitle">
	<h1>MATURITY MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-calendar-check"></i>
			</a></li>
			<li class="breadcrumb-item action">APPLY FOR MATURITY</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH BOX </li>
				</ol>
			</nav>
			<div class="row">

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">BRANCH <span id="star"> *</span></label> <select
							id="branchName" name="branchName" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT BRANCH </option>
						</select> <small id="chkbranch" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">POLICY CODE <span id="star"> *</span></label> <select
							id="policyCode" name="policyCode" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT POLICY ID </option>
						</select> <small id="chkpolicycode" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>MATURITY DATE  </label> <input type="date"
							name="maturityDate" id="maturityDate" required="required"
							placeholder="" style="text-transform: uppercase;" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">CUSTOMER DATE </label> <input type="text"
							name="customerName" id="customerName" required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3 mb-4 ">
					<div class="d-flex flex-column formFields">
						<label for="">SCHEME TYPE </label> <input type="text"
							name="schemeType" id="schemeType" required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3 mb-4 ">
					<div class="d-flex flex-column formFields">
						<label for="">SCVHEME MODE</label> <input type="text"
							name="schemeMode" id="schemeMode" required="required"
							style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">POLICY AMOUNT</label> <input type="text"
							name="policyAmount" id="policyAmount" required="required"
							placeholder="ENTER VOTOR NO" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">DEPOSITE AMOUNT </label> <input type="text"
							name="depositAmount" id="depositAmount" required="required"
							placeholder="ENTER LICENCE NO " />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">MATURITY AMOUNT  </label> <input type="text"
							name="maturityAmount" id="maturityAmount" required="required"
							placeholder="ENTER INTRO MEMBRE NAME " />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">REMARK <span id="star"> *</span></label> <input
							type="text" name="remark" id="remark" required="required"
							placeholder="ENTER VOTOR NO " /> <small id="chkremark"
							style="color: red;"></small>
					</div>
				</div>

			</div>
			<div class="row">
				<div class="col-12 text-center">
					<button id="viewBtn" class="btn btn-primary">VIEW POLICY DETAIL
						</button>
					<button id="Add" class="btn btn-info">SAVE</button>
				</div>
			</div>
		</div>
	</form>
</div>


<div class="row mt-5">
	<div class="col-12">
		<div class="card recent-sales">

			<div class="card-body table-responsive">
				<h5 class="card-title">
					MATURITY APPLICATION <span>|</span>
				</h5>

				<table class="table table-borderless datatable overflow-scroll"
					id="table">
					<thead class="table-light">
						<tr style="font-family: 'Poppins', sans-serif;">

							<th scope="col">POLICY NO.</th>
							<th scope="col">BRANCH NAME </th>
							<th scope="col">MATURITY DATE</th>
							<th scope="col">CUSTOMER NAME</th>
							<th scope="col">SCHEME NAME</th>
							<th scope="col">SCHEME TYPE</th>
							<th scope="col">POLICY AMOUNT </th>
							<th scope="col">MATURITY AMOUNT </th>
							<th scope="col">REMARK</th>
						</tr>
					</thead>
					<tbody>

					</tbody>
				</table>
				<div class="pagination">
					<h6>
						PAGE <span id="page-info">1</span>
					</h6>
					<div class="pagination-controls"></div>
				</div>
			</div>
		</div>
	</div>
</div>

<script>
	$(document)
			.ready(
					function() {
						function loadTableData(page, size) {
							$('.table')
									.append(
											'<div class="loading-overlay">Loading...</div>');

							$
									.ajax({
										url : 'api/Maturitymanagement/getApplymaturitydetailswithPage',
										type : 'GET',
										data : {
											page : page,
											size : size
										},
										success : function(response) {
											if (response.status === "OK"
													&& response.data
													&& response.data.content.length > 0) {
												var tableBody = $("#table tbody");
												tableBody.empty();

												$
														.each(
																response.data.content,
																function(index,
																		item) {
																	var row = "<tr>"
																			+ "<td>"
																			+ item.policyCode
																			+ "</td>"
																			+ "<td>"
																			+ item.branchName
																			+ "</td>"
																			+ "<td>"
																			+ item.maturityDate
																			+ "</td>"
																			+ "<td>"
																			+ item.customerName
																			+ "</td>"
																			+ "<td>"
																			+ item.schemeName
																			+ "</td>"
																			+ "<td>"
																			+ item.schemeType
																			+ "</td>"
																			+ "<td>"
																			+ item.policyAmount
																			+ "</td>"
																			+ "<td>"
																			+ item.maturityAmount
																			+ "</td>"
																			+ "<td>"
																			+ item.remark
																			+ "</td>"
																			+ "</tr>";
																	tableBody
																			.append(row);
																});

												updatePagination(
														response.data.currentPage,
														response.data.totalPages);

											} else {
												alert("No maturity details found.");
											}
										},
										error : function(xhr, status, error) {
											console
													.error(
															"Error fetching maturity details:",
															error);
											alert("Failed to load maturity details.");
										},
										complete : function() {
											$('.loading-overlay').remove();
										}
									});
						}

						function updatePagination(currentPage, totalPages) {
							var pagination = $(".pagination-controls");
							pagination.empty();

							if (currentPage > 0) {
								pagination
										.append('<button class="page-btn" value="'
												+ (currentPage - 1)
												+ '">Previous</button>');
							}

							var start = Math.max(currentPage - 2, 0);
							var end = Math.min(currentPage + 3, totalPages);

							for (var i = start; i < end; i++) {
								if (i === currentPage) {
									pagination
											.append('<span class="page-btn current-page">'
													+ (i + 1) + '</span>');
								} else {
									pagination
											.append('<button class="page-btn" value="' + i + '">'
													+ (i + 1) + '</button>');
								}
							}

							if (currentPage < totalPages - 1) {
								pagination
										.append('<button class="page-btn" value="'
												+ (currentPage + 1)
												+ '">Next</button>');
							}

							$(".pagination h6").text(
									"Page " + (currentPage + 1) + " of "
											+ totalPages);
						}

						$(document).on('click',
								'.pagination .page-btn:not(.current-page)',
								function(e) {
									e.preventDefault();
									var page = parseInt($(this).val());
									var size = 5;
									loadTableData(page, size);
								});

						loadTableData(0, 5);
					});
</script>

<script
	src="${pageContext.request.contextPath}/js/MaturityManagement/applymaturity.js"></script>