
<div class="pagetitle">
	<h1>CUSTOMER SHAREHOLDING</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-building-fill-down"></i>
			</a></li>
			<li class="breadcrumb-item action">GENERATE SHARE CERTIFICATE</li>
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
				<label for="referralCodeEntry">SELECT CUSTOMER / REFERRAL CODE :</label>
				<select id="referralCodeEntry" name="referralCodeEntry" required="required"
					class="form-control selectField mb-4" style="height: 30px;">
					<option value="">SELECT CUSTOMER</option>
				</select>
			</div>
		</div>
	</div>

	<div class="row mt-4">
		<div class="col-12">
			<div class="card recent-sales">
				<div class="card-body table-responsive">
					<div class="d-flex justify-content-between align-items-center">
						<h5 class="card-title">
							SEARCH RESULT <span>| SHARE DATA LIST</span>
						</h5>
					</div>
					<table class="table table-borderless datatable overflow-scroll">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col" style="width: 50px;">SELECT</th>
								<th scope="col">SR NO.</th>
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
			<div class="d-flex justify-content-end mt-2 mb-4">
				<button type="button" class="btn btn-warning fw-bold text-dark" id="printCertificateBtn">
					<i class="bi bi-eye"></i> VIEW CERTIFICATE
				</button>
			</div>
		</div>
	</div>

	<div class="row mt-4">
		<div id="certificateSection" style="display: none; width: 100%;">
			<div class="col-12 d-flex justify-content-end gap-2 mb-3">
				<button type="button" class="btn btn-primary fw-bold" id="printBtn">
					<i class="fa-solid fa-print"></i> PRINT CERTIFICATE
				</button>
				<button type="button" class="btn btn-success fw-bold" id="downloadBtn">
					<i class="fa-solid fa-download"></i> DOWNLOAD
				</button>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="card recent-sales border border-dark" id="cetificateId" style="border-width: 2px !important; border-radius: 8px;">
						<div class="card-body p-4">
							<!-- Certificate Form Starts Here -->
							<div class="p-4" style="border: 2px solid #856404; border-radius: 6px; background: #fffdf7;">
								<div class="text-center mb-4">
									<h3 style="font-weight: 800; color: #1a237e; letter-spacing: 1px;">
										MICROFINANCE PVT. LTD.
									</h3>
									<h6 style="color: #666; font-weight: 600; letter-spacing: 0.5px;">
										SHARE CERTIFICATE OF MEMBERSHIP
									</h6>
									<hr style="border-top: 2px solid #856404; width: 60%; margin: 10px auto;">
								</div>

								<!-- Applicant Information -->
								<div class="row mb-3">
									<div class="col-md-7">
										<p style="font-size: 14px; margin-bottom: 6px;">
											<strong>CUSTOMER ID & NAME:</strong> <span id="customeridandName" class="text-primary font-weight-bold"></span>
										</p>
									</div>
									<div class="col-md-5 text-md-end">
										<p style="font-size: 14px; margin-bottom: 6px;">
											<strong>CERTIFICATE NO.:</strong> <span id="certificateno" class="text-danger font-weight-bold"></span>
										</p>
									</div>
								</div>

								<!-- Policy Details Section -->
								<h6 class="mt-4 mb-2" style="font-size: 15px; font-weight: 700; color: #333;">
									SHARE DETAILS :-
								</h6>
								<div class="row border p-3 rounded" style="background-color: #ffffff; border-color: #ddd !important;">
									<div class="col-md-6">
										<p style="font-size: 13px; margin-bottom: 8px;">
											<strong>NUMBER OF SHARE :</strong> <span id="numberofshare"></span>
										</p>
										<p style="font-size: 13px; margin-bottom: 8px;">
											<strong>AMOUNT TRANSFERRED :</strong> <span id="amounttransferred"></span>
										</p>
										<p style="font-size: 13px; margin-bottom: 8px;">
											<strong>BRANCH :</strong> <span id="branchname"></span>
										</p>
										<p style="font-size: 13px; margin-bottom: 8px;">
											<strong>START DATE :</strong> <span id="startdate"></span>
										</p>
									</div>
									<div class="col-md-6">
										<p style="font-size: 13px; margin-bottom: 8px;">
											<strong>BALANCE SHARES :</strong> <span id="balanceshare"></span>
										</p>
										<p style="font-size: 13px; margin-bottom: 8px;">
											<strong>SHARE ISSUED BY :</strong> <span id="shareissuedby"></span>
										</p>
										<p style="font-size: 13px; margin-bottom: 8px;">
											<strong>DATE OF TRANSFER :</strong> <span id="dataoftransfer"></span>
										</p>
									</div>
								</div>

								<div class="row mt-3">
									<div class="col-md-6">
										<p style="font-size: 13px; margin-bottom: 4px;">
											<strong>MODE OF PAYMENT :</strong> <span id="modeofpayement"></span>
										</p>
									</div>
								</div>

								<div class="mt-4 pt-3 border-top d-flex justify-content-between align-items-end">
									<div>
										<p style="font-size: 12px; color: #555; margin-bottom: 0;">
											THIS IS AN OFFICIAL SHARE CERTIFICATE ISSUED UNDER THE COMMON SEAL OF THE INSTITUTION.
										</p>
									</div>
									<div class="text-center" style="min-width: 180px;">
										<br><br>
										<span style="border-top: 1px solid #333; display: block; font-weight: 600; font-size: 13px;">AUTHORIZED SIGNATORY</span>
									</div>
								</div>
							</div>
							<!-- Certificate Form Ends Here -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="${pageContext.request.contextPath}/js/CustomerShareHolding/GenerateShareCertificate.js"></script>