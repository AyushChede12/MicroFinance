
<div class="pagetitle">
	<h1>POLICY MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-piggy-bank"></i>
			</a></li>
			<li class="breadcrumb-item action">ISSUE CERTIFICATE</li>
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
							<label for="">FIND bB POLICY CODE <span class="star">*</span></label>
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

			<div class="mt-5">
				<div class="row" id="policyDataRow">
					<div class="col-lg-12">
						<!-- Scrollable table wrapper -->
						<div style="overflow-x: auto; max-height: 400px;">
							<table class="table table-bordered table-striped"
								id="policyTable">
								<thead class="thead-dark"
									style="position: sticky; top: 0; background-color: #343a40; color: white;">
									<tr>
										<th>POLICY CODE</th>
										<th>CUSTOMER NAME</th>
										<th>POLICY AMOUNT</th>
										<th>MATURITY DATE</th>
										<th>MATURITY AMOUNT</th>
										<th>CONTACT NO.</th>
										<th>NOMINEE</th>
										<th>ADDRESS</th>
										<th>ACTION</th>
									</tr>
								</thead>
								<tbody id="policyTableBody">
									<!-- Data will be inserted here -->
								</tbody>
							</table>
						</div>
						<!-- Certificate Template (hidden, will be cloned for print) -->

					</div>
				</div>
			</div>

			<div id="certificateTemplate"
				style="font-family: Arial, Helvetica, sans-serif; padding: 25px; background: #f4f7f9;">

				<div
					style="max-width: 900px; margin: auto; background: #ffffff; border: 8px double #1b5e20; padding: 10px; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);">

					<div
						style="border: 2px solid #d4af37; padding: 35px 45px; position: relative; background: linear-gradient(135deg, #ffffff 85%, #f3f8f4 100%);">

						<div
							style="display: flex; align-items: center; justify-content: center; gap: 18px; border-bottom: 2px solid #1b5e20; padding-bottom: 18px; margin-bottom: 25px;">

							<div>
								<img id="certCompanyLogo" src="images/logo.png"
									alt="Company Logo"
									style="width: 85px; height: 85px; object-fit: contain;">
							</div>

							<div style="text-align: left;">

								<div id="certCompanyName"
									style="font-size: 27px; font-weight: bold; color: #1b5e20; letter-spacing: 1px; text-transform: uppercase;">
									COMPANY NAME</div>

								<div style="font-size: 13px; color: #555; margin-top: 5px;">
									<span id="certCompanyAddress">YOUR COMPANY ADDRESS</span>
									&nbsp;|&nbsp; <span id="certCompanyContact">CONTACT NO.</span>
									&nbsp;|&nbsp; GSTIN: <span id="certCompanyGstin">GSTIN</span>
								</div>

								<div style="font-size: 11px; color: #777; margin-top: 4px;">
									AUTHORIZED FINANCIAL SERVICES PROVIDER</div>

								<div style="display: none;">
									<span id="certCompanyCin"></span> <span id="certCompanyPan"></span>
								</div>

							</div>
						</div>

						<div style="text-align: center;">

							<h2
								style="margin: 0; color: #1b5e20; font-size: 30px; letter-spacing: 2px; font-weight: bold; text-transform: uppercase;">
								POLICY ISSUE CERTIFICATE</h2>

							<div
								style="width: 90px; height: 3px; background: #d4af37; margin: 12px auto 25px auto;">
							</div>

							<p
								style="font-size: 15px; color: #555; margin-bottom: 10px; letter-spacing: 1px;">
								THIS IS TO CERTIFY THAT</p>

							<h3 id="certClientName"
								style="margin: 8px 0 18px 0; font-size: 26px; color: #222; text-transform: uppercase; letter-spacing: 1px;">
							</h3>

							<p
								style="font-size: 15px; color: #444; line-height: 1.7; margin-bottom: 25px;">
								IS THE REGISTERED HOLDER OF POLICY CODE <strong
									id="certPolicyCode" style="color: #1b5e20;"></strong> AND IS
								HEREBY ISSUED THIS POLICY CERTIFICATE IN ACCORDANCE WITH THE
								APPLICABLE SCHEME TERMS.
							</p>

						</div>

						<div
							style="border: 1px solid #d9d9d9; border-radius: 8px; overflow: hidden; margin-top: 20px; background: #fafafa;">

							<div
								style="background: #1b5e20; color: white; padding: 11px 15px; font-size: 15px; font-weight: bold; text-align: left; letter-spacing: 1px;">
								POLICY DETAILS</div>

							<div style="padding: 5px 20px 10px 20px;">

								<p
									style="display: flex; justify-content: space-between; border-bottom: 1px solid #e5e5e5; padding: 12px 0; margin: 0; font-size: 14px;">
									<span style="color: #666;">POLICY AMOUNT</span> <strong
										id="certPolicyAmount" style="color: #222;"></strong>
								</p>

								<p
									style="display: flex; justify-content: space-between; border-bottom: 1px solid #e5e5e5; padding: 12px 0; margin: 0; font-size: 14px;">
									<span style="color: #666;">MATURITY AMOUNT</span> <strong
										id="certMaturityAmount" style="color: #1b5e20;"></strong>
								</p>

								<p
									style="display: flex; justify-content: space-between; border-bottom: 1px solid #e5e5e5; padding: 12px 0; margin: 0; font-size: 14px;">
									<span style="color: #666;">MATURITY DATE</span> <strong
										id="certMaturityDate" style="color: #222;"></strong>
								</p>

								<p
									style="display: flex; justify-content: space-between; padding: 12px 0; margin: 0; font-size: 14px;">
									<span style="color: #666;">CONTACT NO.</span> <strong
										id="certContact" style="color: #222;"></strong>
								</p>

							</div>
						</div>

						<div
							style="margin-top: 20px; border: 1px solid #d9d9d9; border-radius: 8px; padding: 18px 20px; background: #ffffff;">

							<div
								style="font-size: 15px; font-weight: bold; color: #1b5e20; margin-bottom: 12px; border-bottom: 1px solid #d4af37; padding-bottom: 7px;">
								ACCOUNT INFORMATION</div>

							<p style="margin: 10px 0; font-size: 14px; color: #444;">
								<strong style="color: #666;">NOMINEE :</strong> <span
									id="certNominee"></span>
							</p>

							<p
								style="margin: 10px 0; font-size: 14px; color: #444; line-height: 1.6;">
								<strong style="color: #666;">ADDRESS :</strong> <span
									id="certAddress"></span>
							</p>

						</div>

						<div id="jointMemberSection"
							style="display: none; margin-top: 20px; border: 1px solid #d9d9d9; border-radius: 8px; padding: 18px 20px; background: #ffffff;">

							<div
								style="font-size: 15px; font-weight: bold; color: #1b5e20; margin-bottom: 12px; border-bottom: 1px solid #d4af37; padding-bottom: 7px;">
								JOINT MEMBER INFORMATION</div>

							<p style="margin: 10px 0; font-size: 14px; color: #444;">
								<strong style="color: #666;">JOINT MEMBER CODE:</strong> <span
									id="certJointMemberCode"></span>
							</p>

							<p style="margin: 10px 0; font-size: 14px; color: #444;">
								<strong style="color: #666;">JOINT MEMBER NAME:</strong> <span
									id="certJointName"></span>
							</p>

						</div>

						<div style="display: none;">

							<span id="certPolicyStartDate"></span> <span id="certDateOfBirth"></span>
							<span id="certMemberSelection"></span> <span id="certRelation"></span>
							<span id="certAgeOfNominee"></span> <span
								id="certNomineeRelation"></span> <span id="certDistrict"></span>
							<span id="certState"></span> <span id="certPinCode"></span> <span
								id="certBranchName"></span> <span id="certSchemeType"></span> <span
								id="certSchemeName"></span> <span id="certSchemeCode"></span> <span
								id="certSchemeTerm"></span> <span id="certSchemeMode"></span> <span
								id="certROI"></span> <span id="certDepositAmount"></span> <span
								id="certPaymentBy"></span> <span id="certModeOfPayment"></span>
							<span id="certNoOfInstallments"></span> <span
								id="certMISInterest"></span> <span id="certRemark"></span> <span
								id="certAgent"></span>

						</div>

						<div
							style="margin-top: 25px; text-align: center; color: #777; font-size: 11px; line-height: 1.6;">

							<p style="margin: 0;">THIS CERTIFICATE IS ISSUED AS AN
								OFFICIAL RECORD OF THE POLICY MENTIONED ABOVE.</p>

							<p style="margin: 4px 0 0 0;">PLEASE RETAIN THIS CERTIFICATE
								FOR YOUR FUTURE REFERENCE.</p>

						</div>

						<div
							style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 45px;">

							<div style="text-align: center; width: 180px;">

								<div
									style="border-top: 1px solid #555; padding-top: 8px; font-size: 12px; color: #555;">
									DATE OF ISSUE</div>

							</div>

							<div style="text-align: center; width: 200px;">

								<div
									style="height: 35px; margin-bottom: 5px; font-size: 13px; font-style: italic; color: #777;">
									AUTHORIZED SIGNATURE</div>

								<div
									style="border-top: 1px solid #333; padding-top: 8px; font-size: 12px; font-weight: bold; color: #333;">
									AUTHORIZED SIGNATURE</div>

							</div>

						</div>

						<div
							style="margin-top: 30px; padding-top: 12px; border-top: 1px solid #ddd; text-align: center; font-size: 10px; color: #888;">

							<div id="certFooterCompanyName" style="color: #1b5e20;">
								&nbsp; VALID WITHOUT SEAL ONLY WHERE DIGITALLY VERIFIED</div>
						</div>

					</div>
				</div>
			</div>
			```

		</div>

	</form>

</div>

<script
	src="${pageContext.request.contextPath}/js/PolicyManagment/issueCertificate.js"></script>
