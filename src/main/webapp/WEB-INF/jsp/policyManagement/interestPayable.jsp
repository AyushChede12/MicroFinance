<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div class="pagetitle">
	<h1>POLICY MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-piggy-bank"></i>
			</a></li>
			<li class="breadcrumb-item action">INTEREST PAYABLE</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH POLICY INTEREST PAYABLE</li>
				</ol>
			</nav>
			<div class="row align-items-center mb-4">
				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="policyCode">FIND BY POLICY CODE <span class="star">*</span></label>
						<select id="policyCode" name="policyCode"
							class="form-control selectField" style="height: 34px;">
							<option value="">SELECT POLICY CODE</option>
						</select>
					</div>
				</div>

				<div class="col-lg-4 d-flex" style="margin-top: 25px; gap: 10px;">
					<button type="button" id="findBtn" class="btn btn-dark">FIND</button>
					<button type="button" id="showAllBtn" class="btn btn-secondary">SHOW ALL</button>
				</div>
			</div>

			<div class="mt-4">
				<div class="row">
					<div class="col-12">
						<div class="card recent-sales">
							<div class="card-body table-responsive">
								<h5 class="card-title">
									POLICY INTEREST PAYABLE <span>| REPORT VIEW</span>
								</h5>

								<table class="table table-bordered table-striped datatable overflow-scroll" id="interestPayableTable">
									<thead class="thead-dark" style="background-color: #343a40; color: white;">
										<tr style="font-family: 'Poppins', sans-serif;">
											<th scope="col">SR. NO</th>
											<th scope="col">POLICY CODE</th>
											<th scope="col">CUSTOMER NAME</th>
											<th scope="col">BRANCH</th>
											<th scope="col">SCHEME TYPE</th>
											<th scope="col">POLICY AMOUNT</th>
											<th scope="col">TOTAL DEPOSIT</th>
											<th scope="col">PAYMENT DUE</th>
											<th scope="col">ROI (%)</th>
											<th scope="col">INTEREST PAYABLE</th>
											<th scope="col">MATURITY AMOUNT</th>
											<th scope="col">MATURITY DATE</th>
											<th scope="col">STATUS</th>
										</tr>
									</thead>
									<tbody id="interestPayableTableBody">
										<!-- Dynamic content loaded via interestPayable.js -->
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
	src="${pageContext.request.contextPath}/js/PolicyManagment/interestPayable.js"></script>
