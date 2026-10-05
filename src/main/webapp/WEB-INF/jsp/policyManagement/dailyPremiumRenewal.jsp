
<div class="pagetitle">
	<h1>POLICY MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-piggy-bank"></i>
			</a></li>
			<li class="breadcrumb-item action">DAILY PREMIUM RENEWAL</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH BOX</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="Agent">POLICY CODE <span class="star">*</span></label>
						<select id="policyCode" name="policyCode" required
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT POLICY CODE</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>RENEWAL DATE<span class="star">*</span></label> <input
							type="date" name="fromDate" id="fromDate"
							required="required" placeholder="Enter Vehicle No"
							style="text-transform: uppercase;" />
					</div>
				</div>


			</div>


			<div class="mt-5">
				<nav>
					<ol class="breadcrumb breadcrumb-title">
						<li class="breadcrumb-item action">POLICY INFORMATION</li>
					</ol>
				</nav>
				<div class="row">
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>POLICY DATE<span class="star">*</span></label> <input
								type="date" name="policyDate" id="policyDate"
								required="required" style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="">MATURITY DATE <span class="star">*</span></label> <input
								type="date" name="maturityDate" id="maturityDate"
								required="required" style="text-transform: uppercase;" />
						</div>
					</div>


					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="">CUSTOMER CODE <span class="star">*</span></label> <input
								type="text" name="customerCode" id="customerCode"
								style="text-transform: uppercase;" readonly="readonly"
								required="required" placeholder="ENTER CUSTOMER CODE" />
						</div>
					</div>


					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="">CUSTOMER NAME <span class="star">*</span></label> <input
								type="text" name="clientName" id="clientName"
								style="text-transform: uppercase;" readonly="readonly"
								required="required" placeholder="ENTER CUSTOMER NAME" />
						</div>
					</div>


					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="">BRANCH NAME<span class="star">*</span></label> <input
								type="text" name="branchName" id="branchName"
								style="text-transform: uppercase;" readonly="readonly"
								required="required" placeholder="ENTER BRANCH NAME" />
						</div>
					</div>


					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="">CONTACT NO <span class="star">*</span></label> <input
								type="text" name="contactNo" id="contactNo" required="required"
								readonly="readonly" placeholder="ENTER CONTACT NO" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="">POLICY AMOUNT <span class="star">*</span></label> <input
								type="text" name="policyAmount" id="policyAmount"
								readonly="readonly" required="required"
								placeholder="ENTER POLICY AMOUNT" />
						</div>
					</div>


<!-- 					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>NET DEPOSIT<span class="star">*</span></label> <input
								type="text" name="netDeposite" id="netDeposite"
								readonly="readonly" required="required"
								placeholder="ENTER NET DEPOSIT" />
						</div>
					</div> -->



					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>POLICY TYPE <span class="star">*</span></label> <input
								type="text" name="policyType" id="policyType"
								style="text-transform: uppercase;" readonly="readonly"
								required="required" placeholder="ENTER POLICY TYPE" />
						</div>
					</div>



					<!-- in this two text fieldds are required -->
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="">POLICY TERM <span class="star">*</span></label> <input
								type="text" name="policyTerm" id="policyTerm"
								readonly="readonly" required="required"
								placeholder="ENTER POLICY TERM" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="">MATURITY AMOUNT <span class="star">*</span></label> <input type="text"
								name="maturityAmount" id="maturityAmount" required="required"
								readonly="readonly" placeholder="ENTER MATURITY AMOUNT" />
						</div>
					</div>


					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="">TOTAL DEPOSIT <span class="star">*</span></label> <input
								type="text" name="totalDeposit" id="totalDeposit"
								readonly="readonly" required="required"
								placeholder="ENTER TOTAL DEPOSIT" />
						</div>
					</div>


					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="">PAYMENT DUE <span class="star">*</span></label> <input
								type="text" name="paymentDue" id="paymentDue"
								readonly="readonly" required="required"
								placeholder="ENTER PAYMENT DUE" />
						</div>
					</div>


					<!-- <div class="col-lg-3">
						<div class="d-flex flex-column formFields mt-4">
							<label for="">Last Payment Date <span class="star">*</span></label>
							<input type="text" name="lastPaymentDate" id="lastPaymentDate"
								required="required" placeholder="Enter Education" />
						</div>
					</div> -->

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields mt-4">
							<label for="">DUE DATE<span class="star">*</span></label> <input
								type="date" name="dueDate" id="dueDate" required="required"
								style="text-transform: uppercase;" readonly="readonly" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields mt-4">
							<label for="">NO OF INSTALLMENT<span class="star">*</span></label>
							<input type="text" name="noOfInst" id="noOfInst"
								required="required" placeholder="ENTER NO OF INSTALLMENT"/>
						</div>
					</div>


					<div class="col-lg-3">
						<div class="d-flex flex-column formFields mt-4">
							<label for="">INSTALLMENT COMPLETED <span class="star">*</span></label>
							<input type="text" name="noOfInstPaid" id="noOfInstPaid" readonly="readonly"
								required="required" placeholder="ENTER INSTALLMENT COMPLETED" />
						</div>
					</div>
					
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields mt-4">
							<label for="">MODE OF PAYMENT <span class="star">*</span></label>
							<select id="modeOfPayment" name="modeOfPayment"
								required="required" class="form-control selectField"
								style="height: 30px;">
								<option value="">---SELECT PAYMENT MODE---</option>
								<option value="CASH">CASH</option>
								<option value="ONLINE">ONLINE</option>
							</select>
						</div>
					</div>

				</div>
			</div>

			<div class="row mt-4">
				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">UPLOAD
						PHOTO <span class="star">*</span>
					</label> <label for="customerPhoto" id="drop-area"> <input
						accept="image/*" name="customerPhoto" id="customerPhoto"
						hidden="hidden" onchange="photopreview();"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="Uploads/upload.png" alt="upload_icon" id="photoPreview" /><input
								type="hidden" name="photoHidden" id="photoHidden">

						</div>
					</label>
				</div>

				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">UPLOAD
						SIGNATURE <span class="star">*</span>
					</label> <label for="customerSignature" id="drop-area"> <input
						accept="image/*" name="customerSignature" id="customerSignature"
						hidden="hidden" onchange="signpreview();"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="Uploads/upload.png" alt="upload_icon"
								id="signaturePreview" /><input type="hidden"
								name="signatureHidden" id="signatureHidden">

						</div>
					</label>
				</div>

			</div>

		</div>

		<div class="row">
			<div class="col-12 text-center" style="display: flex;">
				<button id="viewBtn" type="button" class="btn btn-primary"
					data-toggle="modal" data-target="#installmentModal"
					style="margin-left: 450px;">VIEW INSTALLMENT</button>
				<button id="buttonSave" type="button" class="btn btn-info"
					style="margin-left: 5px;">SAVE</button>
			</div>
		</div>

	</form>



</div>


</main>

<!-- MODAL FOR VIEW INSTALLMENT -->
<div class="modal fade" id="installmentModal" tabindex="-1"
	role="dialog" aria-labelledby="installmentModalLabel"
	aria-hidden="true">
	<div class="modal-dialog modal-lg modal-dialog-centered"
		role="document">
		<div class="modal-content">
			<div class="modal-header bg-primary text-white">
				<h5 class="modal-title" id="installmentModalLabel">INSTALLMENT
					DETAILS</h5>
				<button type="button" class="close text-white" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-bordered table-hover text-center"
						id="installmentModal">
						<thead class="thead-dark">
							<tr>
								<th>INSTALLMENT NO</th>
								<th>DUE DATE</th>
								<th>AMOUNT</th>
								<th>PENALTY</th>
								<th>STATUS</th>
								<th>PAYMENT DATE</th>
							</tr>
						</thead>
						<tbody>

						</tbody>
					</table>
				</div>
			</div>

			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">CLOSE</button>
			</div>
		</div>
	</div>
</div>

<script
	src="${pageContext.request.contextPath}/js/PolicyManagment/DailyPolicy.js"></script>
