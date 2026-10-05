
<div class="pagetitle">
	<h1>CUSTOMER SHAREHOLDING </h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-building-fill-down"></i>
			</a></li>
			<li class="breadcrumb-item action">GENERATE SHARE CERTIFICATE </li>
		</ol>
	</nav>
</div>
<div>
	<nav>
		<ol class="breadcrumb breadcrumb-title">
			<li class="breadcrumb-item action">CUSTOMER DETAILS</li>
		</ol>
	</nav>
	<div class="row">
		<div class="col-lg-6">
			<div class="d-flex flex-column formFields">
				<label for="">REFERRAL CODE ENTRY :</label> <select
					id="referralCodeEntry" name="referralCodeEntry" required="required"
					class="form-control selectField mb-4" style="height: 30px;">
					<option value="">SELECT</option>
				</select>
			</div>
		</div>
	</div>

	<!-- <div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for=""></label> <select
							id="referralCodeEntry" name="referralCodeEntry"
							required="required" onchange="fetchShareDataByCode()"
							class="form-control selectField" style="height: 30px;">
							<option value="">Select</option>
						</select>
					</div>
				</div>
			</div> -->


	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">
				<div class="card-body table-responsive">
					<div class="d-flex justify-content-between align-items-center">
						<h5 class="card-title">
							SEARCH RESULT <span>|SHARE DATA LIST</span>
						</h5>
					</div>
					<table class="table table-borderless datatable overflow-scroll">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col"></th>
								<th scope="col">SR.NO</th>
								<th scope="col">CUSTOMER CODE</th>
								<th scope="col">CUSTOMER NAME</th>
								<th scope="col">SHARE AMOUNT</th>
								<th scope="col">NO. OF SHARE</th>
								<th scope="col">CERTIFICATE NO.</th>
							</tr>
						</thead>
						<tbody id="shareholdingTableBody">
						</tbody>
					</table>
				</div>



			</div>
			<button type="button" class="btn btn-warning"
				id="printCertificateBtn" style="float: right;">VIEW
				Certificate</button>


		</div>




	</div>

	<div class="row mt-4">
		<div id="certificateSection" style="display: none;">
			<div class="col-12 d-flex justify-content-end gap-2">
				<button type="button" class="btn btn-success" id="printBtn">
					<i class="fa-solid fa-print"></i>
				</button>
				<button type="button" class="btn btn-success" id="downloadBtn">
					<i class="fa-solid fa-download"></i>
				</button>
			</div>
			<div class="row mt-5">
				<div class="col-12">
					<div class="card recent-sales" id="cetificateId">
						<div class="card-body table-responsive">
							<!-- Certificate Form Starts Here -->
							<div class="p-3">
								<h5 class="text-center mb-3" style="font-size: 20px;">
									<strong>MICROFINACE PVT.LTD </strong>
								</h5>

								<!-- Applicant Information -->
								<p style="font-size: 14px;">
									<strong>CUSTOMER ID OF CUSTOMER NAME:</strong> <span
										id="customeridandName"></span>
								</p>
								<p style="font-size: 14px;">
									<strong>CERTIFICATE NO.:</strong> <span id="certificateno"></span>
								</p>

								<!-- Policy Details Section -->
								<h6 class="mt-4" style="font-size: 16px;">
									<strong>SHARE DETAILS :- </strong> <span></span>
								</h6>
								<div class="row border">
									<div class="col-md-6" style="padding-top: 15px;">
										<p style="font-size: 13px;">
											<strong>NUMBER OF SHARE :</strong> <span id="numberofshare"></span>
										</p>
										<p style="font-size: 13px;">
											<strong>AMOUNT TRANSFERRED  :</strong> <span
												id="amounttransferred"></span>
										</p>
										<p style="font-size: 13px;">
											<strong>BRANCH :</strong> <span id="branchname"></span>
										</p>
										<p style="font-size: 13px;">
											<strong>START DATE :</strong> <span id="startdate"></span>
										</p>
									</div>
									<div class="col-md-6" style="padding-top: 15px;">
										<p style="font-size: 13px;">
											<strong>BALANCE SHARES :</strong> <span id="balanceshare"></span>
										</p>
										<p style="font-size: 13px;">
											<strong>SHARE ISSUE BY:</strong> <span id="shareissuedby"></span>
										</p>
										<p style="font-size: 13px;">
											<strong>DATE OF TRANSFER :</strong> <span id="dataoftransfer"></span>
										</p>
									</div>
								</div>

								<!-- Maturity Payment Instructions -->
								<h6 class="mt-3" style="font-size: 16px;">
									<strong>MODE OF PAYMENT :</strong> <span id="modeofpayement"></span>
								</h6>
								<p style="font-size: 13px;">(CONTENT CAN BE ADDED HERE IF NEEDED )
									</p>
							</div>
							<!-- Certificate Form Ends Here -->

						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</div>
<script
	src="${pageContext.request.contextPath}/js/customerManagement/GenerateShareCertificate.js"></script>