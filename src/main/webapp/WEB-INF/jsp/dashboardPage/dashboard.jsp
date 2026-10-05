<!-- <%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%> -->
<!DOCTYPE html>
<%@page import="java.util.List"%>
<html>

<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="https://kit.fontawesome.com/ae73087723.js"
	crossorigin="anonymous"></script>
<link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
	rel="stylesheet" />
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.46.0/apexcharts.min.js"></script>
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
	integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
	crossorigin="anonymous" />
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
	integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
	crossorigin="anonymous"></script>
<script
	src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
	integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
	crossorigin="anonymous"></script>
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
	integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
	crossorigin="anonymous"></script>
<title>Admin Dashboard</title>
<link rel="stylesheet" href="./css/admin.css" />
<jsp:include page="../sidebar.jsp"></jsp:include>
<jsp:include page="../header.jsp"></jsp:include>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>


<body>

	<main id="main" class="main">
		<div class="pagetitle">
			<h1>Dashboard</h1>
			<nav>
				<ol class="breadcrumb">
					<li class="breadcrumb-item"><a href="openDashboard"> <i
							class="bi bi-house-door"></i>
					</a></li>
					<li class="breadcrumb-item action">Dashboard</li>
				</ol>
			</nav>
		</div>

		<div class="dashboard">
			<div class="row">
				<div class="col-lg-12">
					<div class="row">
						<div class="col-xxl-4 col-md-3">
							<div class="card info-card sales-card">
								<div class="filter dropdown-center">
									<a href="#" class="icon dropdown-toggle" data-toggle="dropdown"
										id="dropdownMenuButton"> <i class="bi bi-three-dots"></i>
									</a>
									<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
										<li class="dropdown-header text-start">
											<h6>Customer</h6>
										</li>
										<li><a href="addCustomer" class="dropdown-item"> <i
												class="fa-solid fa-eye"></i> <span>Manage</span>
										</a></li>
										<li><a href="searchCustomer" class="dropdown-item"> <i
												class="fa-solid fa-search"></i> <span>Search</span>
										</a></li>
									</ul>
								</div>
								<div class="card-body">
									<h5 class="card-title">Customer</h5>

									<div class="d-flex align-items-center" style="gap: 0.6rem">
										<div
											class="card-icon rounded-circle d-flex align-items-center justify-content-center">
											<i class="fa-solid fa-users"></i>
										</div>

										<div class="ps-3" id="CustomerCount">
											<h6></h6>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xxl-4 col-md-3">
							<div class="card info-card sales-card">
								<div class="filter dropdown-center">
									<a href="#" class="icon dropdown-toggle" data-toggle="dropdown"
										id="dropdownMenuButton"> <i class="bi bi-three-dots"></i>
									</a>
									<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
										<li class="dropdown-header text-start">
											<h6>Share</h6>
										</li>
										<li><a href="transferShares" class="dropdown-item"> <i
												class="fa-solid fa-plus"></i> <span>Transfer</span>
										</a></li>
										<li><a href="generateShareCertificate"
											class="dropdown-item"> <i class="fa-solid fa-eye"></i> <span>Generate
													Certificate</span>
										</a></li>
									</ul>
								</div>
								<div class="card-body">
									<h5 class="card-title">Share Issue</h5>

									<div class="d-flex align-items-center" style="gap: 0.6rem">
										<div
											class="card-icon rounded-circle d-flex align-items-center justify-content-center">
											<i class="fa-solid fa-file-invoice"></i>
										</div>

										<div class="ps-3" id="ShareIssueCount">
											<h6></h6>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xxl-4 col-md-3">
							<div class="card info-card sales-card">
								<div class="filter dropdown-center">
									<a href="#" class="icon dropdown-toggle" data-toggle="dropdown"
										id="dropdownMenuButton"> <i class="bi bi-three-dots"></i>
									</a>
									<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
										<li class="dropdown-header text-start">
											<h6>Finance</h6>
										</li>
										<li><a href="addFinancialConsultant"
											class="dropdown-item"> <i class="fa-solid fa-plus"></i> <span>Add
													Finance</span>
										</a></li>
										<li><a href="consultantIDCardGenerator"
											class="dropdown-item"> <i class="fa-solid fa-eye"></i> <span>Generate
													ID Card</span>
										</a></li>
									</ul>
								</div>
								<div class="card-body">
									<h5 class="card-title">Financial Consultant</h5>

									<div class="d-flex align-items-center" style="gap: 0.6rem">
										<div
											class="card-icon rounded-circle d-flex align-items-center justify-content-center">
											<i class="fa-solid fa-money-check-dollar"></i>
										</div>

										<div class="ps-3" id="FinancialConsultantCount">
											<h6></h6>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xxl-4 col-md-3">
							<div class="card info-card sales-card">
								<div class="filter dropdown-center">
									<a href="#" class="icon dropdown-toggle" data-toggle="dropdown"
										id="dropdownMenuButton"> <i class="bi bi-three-dots"></i>
									</a>
									<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
										<li class="dropdown-header text-start">
											<h6>Account</h6>
										</li>
										<li><a href="incomingReceiptEntry" class="dropdown-item">
												<i class="fa-solid fa-plus"></i> <span>Receipt</span>
										</a></li>
										<li><a href="incentivePayment" class="dropdown-item">
												<i class="fa-solid fa-eye"></i> <span>Payment</span>
										</a></li>
									</ul>
								</div>
								<div class="card-body">
									<h5 class="card-title">Saving Account</h5>

									<div class="d-flex align-items-center" style="gap: 0.6rem">
										<div
											class="card-icon rounded-circle d-flex align-items-center justify-content-center">
											<i class="fa-solid fa-user"></i>
										</div>

										<div class="ps-3" id="SavingAccountCount">
											<h6></h6>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xxl-4 col-md-3">
							<div class="card info-card sales-card">
								<div class="filter dropdown-center">
									<a href="#" class="icon dropdown-toggle" data-toggle="dropdown"
										id="dropdownMenuButton"> <i class="bi bi-three-dots"></i>
									</a>
									<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
										<li class="dropdown-header text-start">
											<h6>Loan</h6>
										</li>
										<li><a href="newLoanApplication" class="dropdown-item">
												Apply </a></li>
										<li><a href="emiLoanCalculator" class="dropdown-item">
												Calculator </a></li>
										<li><a href="generateNOCCertificateLoanManagement"
											class="dropdown-item"> NOC Certificate </a></li>
									</ul>
								</div>
								<div class="card-body">
									<h5 class="card-title">Loan Application</h5>

									<div class="d-flex align-items-center" style="gap: 0.6rem">
										<div
											class="card-icon rounded-circle d-flex align-items-center justify-content-center">
											<i class="fa-solid fa-tags"></i>
										</div>

										<div class="ps-3" id="loanApplication">
											<h6></h6>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xxl-4 col-md-3">
							<div class="card info-card sales-card">
								<div class="filter dropdown-center">
									<a href="#" class="icon dropdown-toggle" data-toggle="dropdown"
										id="dropdownMenuButton"> <i class="bi bi-three-dots"></i>
									</a>
									<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
										<li class="dropdown-header text-start">
											<h6>Report</h6>
										</li>
										<li><a href="investmentTransactionReport"
											class="dropdown-item"> Investment </a></li>
										<li><a href="chequeTransactionReport"
											class="dropdown-item"> Cheque Transaction </a></li>
										<li><a href="approvedLoanReport" class="dropdown-item">
												Approved Loan </a></li>
									</ul>
								</div>
								<div class="card-body">
									<h5 class="card-title">Report</h5>

									<div class="d-flex align-items-center" style="gap: 0.6rem">
										<div
											class="card-icon rounded-circle d-flex align-items-center justify-content-center">
											<i class="bi bi-cart"></i>
										</div>

										<div class="ps-3">
											<h6>145</h6>
											<span class="text-success small pt-1"
												style="font-weight: 700">12%</span> <span
												class="text-muted small pt-2 ps-1">increase</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xxl-4 col-md-3">
							<div class="card info-card sales-card">
								<div class="filter dropdown-center">
									<a href="#" class="icon dropdown-toggle" data-toggle="dropdown"
										id="dropdownMenuButton"> <i class="bi bi-three-dots"></i>
									</a>
									<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
										<li class="dropdown-header text-start">
											<h6>Policy</h6>
										</li>
										<li><a href="addNewInvestment" class="dropdown-item">
												New Policy </a></li>
										<li><a href="installmentRecordBook" class="dropdown-item">
												Policy Passbook </a></li>
										<li><a href="investmentDataSearch" class="dropdown-item">
												Search Policy </a></li>
									</ul>
								</div>
								<div class="card-body">
									<h5 class="card-title">Policy</h5>

									<div class="d-flex align-items-center" style="gap: 0.6rem">
										<div
											class="card-icon rounded-circle d-flex align-items-center justify-content-center">
											<i class="fa-solid fa-wallet"></i>
										</div>

										<div class="ps-3" id="policyCount">
											<h6></h6>
										</div>
									</div>
								</div>
							</div>
						</div>


						<div class="col-6">
							<div class="card recent-sales overflow-auto">
								<div class="filter dropdown-center">
									<a href="#" class="icon" data-bs-toggle="dropdown"> <i
										class="bi bi-three-dots"></i>
									</a>
									<ul class="dropdown-menu">
										<li class="dropdown-header text-start">
											<h6>Filter</h6>
										</li>
										<li><a href="#" class="dropdown-item"> Today </a></li>
										<li><a href="#" class="dropdown-item"> This Month </a></li>
										<li><a href="#" class="dropdown-item"> This Year </a></li>
									</ul>
								</div>

								<div class="card-body">
									<h5 class="card-title">
										Recent Sales <span>| Today</span>
									</h5>

									<table class="table table-borderless datatable">
										<thead class="table-light">
											<tr>
												<th scope="col">#</th>
												<th scope="col">Customer</th>
												<th scope="col">Product</th>
												<th scope="col">Price</th>
												<th scope="col">Status</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<th scope="row"><a href="#">1</a></th>
												<td>Arun Kumar</td>
												<td><a href="#" className="text-primary">Milk</a></td>
												<td>$29</td>
												<td><span class="badge bg-success text-white">Approved</span>
												</td>
											</tr>

											<tr>
												<th scope="row"><a href="#">2</a></th>
												<td>Deepak Dalwe</td>
												<td><a href="#" className="text-primary">Ghee</a></td>
												<td>$16.5</td>
												<td><span class="badge bg-danger text-white">Rejected</span>
												</td>
											</tr>
											<tr>
												<th scope="row"><a href="#">2</a></th>
												<td>Deepak Dalwe</td>
												<td><a href="#" className="text-primary">Ghee</a></td>
												<td>$16.5</td>
												<td><span class="badge bg-danger text-white">Rejected</span>
												</td>
											</tr>
											<tr>
												<th scope="row"><a href="#">2</a></th>
												<td>Deepak Dalwe</td>
												<td><a href="#" className="text-primary">Ghee</a></td>
												<td>$16.5</td>
												<td><span class="badge bg-danger text-white">Rejected</span>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div class="col-6">
							<div class="card recent-sales overflow-auto">
								<div class="filter dropdown-center">
									<a href="#" class="icon" data-bs-toggle="dropdown"> <i
										class="bi bi-three-dots"></i>
									</a>
									<ul class="dropdown-menu">
										<li class="dropdown-header text-start">
											<h6>Filter</h6>
										</li>
										<li><a href="#" class="dropdown-item"> Today </a></li>
										<li><a href="#" class="dropdown-item"> This Month </a></li>
										<li><a href="#" class="dropdown-item"> This Year </a></li>
									</ul>
								</div>

								<div class="card-body">
									<h5 class="card-title">
										Recent Sales <span>| Today</span>
									</h5>

									<table class="table table-borderless datatable">
										<thead class="table-light">
											<tr>
												<th scope="col">#</th>
												<th scope="col">Customer</th>
												<th scope="col">Product</th>
												<th scope="col">Price</th>
												<th scope="col">Status</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<th scope="row"><a href="#">1</a></th>
												<td>Arun Kumar</td>
												<td><a href="#" className="text-primary">Milk</a></td>
												<td>$29</td>
												<td><span class="badge bg-success text-white">Approved</span>
												</td>
											</tr>

											<tr>
												<th scope="row"><a href="#">2</a></th>
												<td>Deepak Dalwe</td>
												<td><a href="#" className="text-primary">Ghee</a></td>
												<td>$16.5</td>
												<td><span class="badge bg-danger text-white">Rejected</span>
												</td>
											</tr>
											<tr>
												<th scope="row"><a href="#">2</a></th>
												<td>Deepak Dalwe</td>
												<td><a href="#" className="text-primary">Ghee</a></td>
												<td>$16.5</td>
												<td><span class="badge bg-danger text-white">Rejected</span>
												</td>
											</tr>
											<tr>
												<th scope="row"><a href="#">2</a></th>
												<td>Deepak Dalwe</td>
												<td><a href="#" className="text-primary">Ghee</a></td>
												<td>$16.5</td>
												<td><span class="badge bg-danger text-white">Rejected</span>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- <div class="col-lg-4">
          <div class="card">
            <div class="filter dropdown-center">
              <a href="#" class="icon" data-bs-toggle="dropdown">
                <i class="bi bi-three-dots"></i>
              </a>
              <ul class="dropdown-menu">
                <li class="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>
                <li>
                  <a href="#" class="dropdown-item"> Today </a>
                </li>
                <li>
                  <a href="#" class="dropdown-item"> This Month </a>
                </li>
                <li>
                  <a href="#" class="dropdown-item"> This Year </a>
                </li>
              </ul>
            </div>

            <div class="card-body">
              <h5 class="card-title">Recent Activity <span>| Today</span></h5>
              <div class="activity">
                <div class="activity-item d-flex">
                  <div class="activite-label">32 min</div>
                  <i class="bi bi-circle-fill activity-badge text-success align-self-start"></i>
                  <div class="activity-content">
                    ascascascasckl las
                    <a href="#" class="fw-bold text-dark">as as jkasnk</a>
                  </div>
                </div>
                <div class="activity-item d-flex">
                  <div class="activite-label">45 min</div>
                  <i class="bi bi-circle-fill activity-badge text-warning align-self-start"></i>
                  <div class="activity-content">
                    ascascascasckl lkmaxklas
                    <a href="#" class="fw-bold text-dark">as as jka</a>
                  </div>
                </div>
                <div class="activity-item d-flex">
                  <div class="activite-label">1 hr</div>
                  <i class="bi bi-circle-fill activity-badge text-danger align-self-start"></i>
                  <div class="activity-content">
                    ascascascasckl lkmaxklas
                    <a href="#" class="fw-bold text-dark">as as jka</a>
                  </div>
                </div>
                <div class="activity-item d-flex">
                  <div class="activite-label">2 hr</div>
                  <i class="bi bi-circle-fill activity-badge text-info align-self-start"></i>
                  <div class="activity-content">
                    ascascascasckl lkmaxklas
                    <a href="#" class="fw-bold text-dark">as as jka</a>
                  </div>
                </div>
                <div class="activity-item d-flex">
                  <div class="activite-label">3 hr</div>
                  <i class="bi bi-circle-fill activity-badge text-dark align-self-start"></i>
                  <div class="activity-content">
                    ascascascasckl lkmaxklas
                    <a href="#" class="fw-bold text-dark">as as jka</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
			</div>
		</div>
	</main>


	<!-- <script src="js/chartScript.js"></script> -->
	<script src="./js/adminscript.js"></script>
	<script src="./js/Dashboard/DashboardCard.js"></script>

</body>

</html>