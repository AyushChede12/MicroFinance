<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="pagetitle">
	<h1>REPORTS & ANALYTICS</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"><i class="bi bi-file-earmark-text"></i></a></li>
			<li class="breadcrumb-item action">INCENTIVE PAYMENT SUMMARY</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH FILTERS</li>
				</ol>
			</nav>

			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="branch">BRANCH</label>
						<select id="branch" name="branch" class="form-control selectField" style="height: 30px;">
							<option value="">-- ALL BRANCHES --</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="fDate">FROM DATE</label>
						<input type="date" name="fDate" id="fDate" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="tDate">TO DATE</label>
						<input type="date" name="tDate" id="tDate" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3 d-flex align-items-center mb-4">
					<button type="button" id="findBtn" class="btn btn-dark mr-2" style="height: 35px; margin-top: 10px;">FIND</button>
					<button type="button" id="resetBtn" class="btn btn-secondary mr-2" style="height: 35px; margin-top: 10px;">RESET</button>
					<button type="button" id="printBtn" class="btn btn-warning" style="height: 35px; margin-top: 10px;">PRINT</button>
				</div>
			</div>
		</div>
	</form>

	<div class="row mt-4">
		<div class="col-12">
			<div class="card recent-sales">
				<div class="card-body table-responsive">
					<h5 class="card-title">INCENTIVE PAYMENT STATEMENT <span>| TABLE VIEW</span></h5>

					<div style="overflow-x: auto; white-space: nowrap;">
						<table class="table table-bordered table-striped">
							<thead class="table-light">
								<tr style="font-family: 'Poppins', sans-serif;">
									<th scope="col">S/N</th>
									<th scope="col">BRANCH</th>
									<th scope="col">MONTH</th>
									<th scope="col">ADVISOR CODE</th>
									<th scope="col">ADVISOR NAME</th>
									<th scope="col">DESIGNATION</th>
									<th scope="col">EARNINGS</th>
									<th scope="col">DEDUCTIONS</th>
									<th scope="col">NET AMOUNT</th>
									<th scope="col">STATUS</th>
								</tr>
							</thead>
							<tbody id="summaryTableBody">
								<tr><td colspan="10" class="text-center">NO RECORDS FOUND</td></tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script src="${pageContext.request.contextPath}/js/ReportsAndAnalytics/incentivePaymentSummary.js?v=<%=System.currentTimeMillis()%>"></script>
