
<div class="pagetitle">
	<h1>POLICY MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-piggy-bank"></i>
			</a></li>
			<li class="breadcrumb-item action">RECURRING PAYMENT RECEIPT</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">PRINT SEARCH RESULTS</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<!-- <div class="d-flex flex-column formFields" style="margin-bottom: 30px">
                <label>Verify With</label>
                <div class="position-relative">
                  <div class="select-btn1" style="cursor: pointer;">
                    <span name="cityName" id="cityNameId" style="font-size: 12px;">Select</span> <i
                      class="fa-solid fa-angle-down"></i>
                  </div>
                  <div class="content" id="contentCityName" style="display: none;">
                    <div class="search">
                      <input type="text" id="city-search" class="m-0" placeholder="Search City" />
                    </div>
                    <ul class="options" id="city-options">
                      <li>ABC</li>
                      <li>ABC</li>
                      <li>ABC</li>
                      <li>ABC</li>
                      <li>ABC</li>
                      <li>ABC</li>
                    </ul>
                  </div>
                </div>
              </div> -->


					<div class="col-lg-12 mb-4 ">
						<div class="d-flex flex-column formFields">
							<label for="">FIND BY POLICY CODE <span class="star">*</span></label>
							<select id="policyCode" name="policyCode" required="required"
								class="form-control selectField" style="height: 30px;">
								<option value="">SELECT POLICY CODE</option>

							</select>
						</div>
					</div>






				</div>

				<div class="row" style="margin-top: 20px; margin-left: 750px;">
					<div class="col-12 text-center">
						<button type="button" id="findBtn" class="btn btn-dark">FIND</button>
					</div>
				</div>

			</div>

			<div class="row mt-5" id="policyDataRow">
				<div class="col-12">
					<div class="card recent-sales">
						<div class="card-body table-responsive">
							<h5 class="card-title">
								RECURRING POLICY DETAILS <span>| TABLE VIEW</span>
							</h5>

							<table class="table table-bordered" style="text-align: center;">
								<thead class="table-light">
									<tr>
										<th style="white-space: nowrap;">SR. NO</th>
										<th style="white-space: nowrap;">POLICY CODE</th>
										<th style="white-space: nowrap;">CUSTOMER NAME</th>
										<th style="white-space: nowrap;">PAYMENT DATE</th>
										<th style="white-space: nowrap;">POLICY AMOUNT</th>
										<th style="white-space: nowrap;">PLAN CODE</th>
										<th style="white-space: nowrap;">MATURITY DATE</th>
										<th style="white-space: nowrap;">MATURITY AMOUNT</th>
										<th style="white-space: nowrap;">TIME DURATION</th>
										<th style="white-space: nowrap;">BRANCH</th>
										<th style="white-space: nowrap;">PAYMENT MODE</th>
										<th style="white-space: nowrap;">PRINT RECEIPT</th>
									</tr>
								</thead>
								<tbody id="policyTableBody">
									<!-- Dynamic rows will be injected here -->
								</tbody>
							</table>

						</div>
					</div>

				</div>
			</div>

			<!-- RD Receipt Template -->
			<div id="receiptTemplate"
				style="display: none; font-family: 'Poppins', Arial, sans-serif; background: #f5f7fa; padding: 25px;">

				<div
					style="width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #d9dee5; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);">

					<!-- Company Header -->
					<div
						style="background: linear-gradient(135deg, #0b5d3b, #087f5b); padding: 22px 25px; color: #ffffff;">

						<div
							style="display: flex; align-items: center; justify-content: space-between;">

							<div style="width: 70%;">

								<div
									style="font-size: 25px; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 6px;">
									COMPANY NAME</div>

								<div style="font-size: 12px; line-height: 1.7; opacity: 0.95;">
									Company Address, City, State - PIN</div>

								<div style="font-size: 12px; margin-top: 3px; opacity: 0.95;">
									Phone: +91 XXXXX XXXXX &nbsp; | &nbsp; Email: company@email.com
								</div>

								<div style="font-size: 11px; margin-top: 3px; opacity: 0.9;">
									GSTIN: XXXXXXXXXXXXXXX</div>

							</div>

							<div
								style="width: 80px; height: 80px; background: #ffffff; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #0b5d3b; font-size: 12px; font-weight: 700; text-align: center;">
								LOGO</div>

						</div>

					</div>

					<!-- Receipt Title -->
					<div style="padding: 22px 28px 10px; text-align: center;">

						<div
							style="display: inline-block; background: #e8f5ef; color: #087f5b; padding: 6px 18px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 1px; margin-bottom: 10px;">
							PAYMENT RECEIPT</div>

						<h2
							style="margin: 0; color: #1f2937; font-size: 23px; font-weight: 700; letter-spacing: 0.5px;">
							RECURRING DEPOSIT (RD)</h2>

						<div style="font-size: 12px; color: #7b8490; margin-top: 5px;">
							Official Recurring Deposit Payment Receipt</div>

					</div>

					<div style="padding: 8px 28px 25px;">

						<!-- Policy Information -->
						<div
							style="background: #f8fafb; border: 1px solid #e4e8ec; border-radius: 9px; padding: 15px 18px; margin-bottom: 16px;">

							<div
								style="font-size: 12px; color: #087f5b; font-weight: 700; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.7px;">
								Policy Information</div>

							<div style="display: flex; margin-bottom: 12px;">

								<div style="width: 50%;">
									<div style="font-size: 10px; color: #8a929c;">POLICY CODE</div>
									<div id="rPolicyCode"
										style="font-size: 13px; font-weight: 600; color: #263238; margin-top: 3px;">
									</div>
								</div>

								<div style="width: 50%;">
									<div style="font-size: 10px; color: #8a929c;">PLAN CODE</div>
									<div id="rPlanCode"
										style="font-size: 13px; font-weight: 600; color: #263238; margin-top: 3px;">
									</div>
								</div>

							</div>

							<div style="display: flex;">

								<div style="width: 50%;">
									<div style="font-size: 10px; color: #8a929c;">CUSTOMER
										NAME</div>
									<div id="rCustomerName"
										style="font-size: 13px; font-weight: 600; color: #263238; margin-top: 3px;">
									</div>
								</div>

								<div style="width: 50%;">
									<div style="font-size: 10px; color: #8a929c;">BRANCH</div>
									<div id="rBranchName"
										style="font-size: 13px; font-weight: 600; color: #263238; margin-top: 3px;">
									</div>
								</div>

							</div>

						</div>

						<!-- Payment Details -->
						<div
							style="background: #ffffff; border: 1px solid #e4e8ec; border-radius: 9px; padding: 15px 18px; margin-bottom: 16px;">

							<div
								style="font-size: 12px; color: #087f5b; font-weight: 700; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.7px;">
								Payment Details</div>

							<div style="display: flex; margin-bottom: 14px;">

								<div style="width: 50%;">
									<div style="font-size: 10px; color: #8a929c;">PAYMENT
										DATE</div>
									<div id="rPaymentDate"
										style="font-size: 13px; font-weight: 600; color: #263238; margin-top: 3px;">
									</div>
								</div>

								<div style="width: 50%;">
									<div style="font-size: 10px; color: #8a929c;">MODE OF
										PAYMENT</div>
									<div id="rModeOfPayment"
										style="font-size: 13px; font-weight: 600; color: #263238; margin-top: 3px;">
									</div>
								</div>

							</div>

							<div style="display: flex;">

								<div style="width: 50%;">
									<div style="font-size: 10px; color: #8a929c;">POLICY
										AMOUNT</div>
									<div
										style="font-size: 16px; font-weight: 700; color: #263238; margin-top: 3px;">
										₹ <span id="rPolicyAmount"></span>
									</div>
								</div>

								<div style="width: 50%;">
									<div style="font-size: 10px; color: #8a929c;">DURATION</div>
									<div id="rDuration"
										style="font-size: 13px; font-weight: 600; color: #263238; margin-top: 3px;">
									</div>
								</div>

							</div>

						</div>

						<!-- Maturity Highlight -->
						<div
							style="background: linear-gradient(135deg, #e9f8f1, #f4fbf8); border: 1px solid #bfe4d2; border-radius: 10px; padding: 18px 20px; margin-bottom: 18px;">

							<div
								style="display: flex; align-items: center; justify-content: space-between;">

								<div>

									<div
										style="font-size: 10px; color: #6b7b73; font-weight: 600; text-transform: uppercase; letter-spacing: 0.7px;">
										Maturity Date</div>

									<div id="rMaturityDate"
										style="font-size: 14px; color: #263238; font-weight: 600; margin-top: 4px;">
									</div>

								</div>

								<div style="text-align: right;">

									<div
										style="font-size: 10px; color: #6b7b73; font-weight: 600; text-transform: uppercase; letter-spacing: 0.7px;">
										Maturity Amount</div>

									<div
										style="font-size: 22px; color: #087f5b; font-weight: 800; margin-top: 3px;">
										₹ <span id="rMaturityAmount"></span>
									</div>

								</div>

							</div>

						</div>

						<!-- Declaration -->
						<div
							style="font-size: 10px; line-height: 1.6; color: #7a828b; border-top: 1px dashed #d5dbe0; padding-top: 12px;">

							This receipt is issued as an acknowledgement of the recurring
							deposit payment. Please retain this receipt for your records.</div>

						<!-- Signature -->
						<div
							style="display: flex; justify-content: flex-end; margin-top: 35px;">

							<div style="width: 180px; text-align: center;">

								<div
									style="border-top: 1px solid #4b5563; padding-top: 7px; font-size: 11px; font-weight: 700; color: #263238;">
									AUTHORIZED SIGNATURE</div>

								<div style="font-size: 9px; color: #8a929c; margin-top: 3px;">
									For Company</div>

							</div>

						</div>

					</div>

					<!-- Footer -->
					<div
						style="background: #f5f7f8; border-top: 1px solid #e1e5e8; padding: 10px 20px; text-align: center;">

						<div style="font-size: 9px; color: #8a929c;">This is a
							computer-generated receipt and does not require a physical stamp.
						</div>

					</div>

				</div>

			</div>

		</div>

	</form>

</div>

<script
	src="${pageContext.request.contextPath}/js/PolicyManagment/recurringPaymentReceipt.js"></script>