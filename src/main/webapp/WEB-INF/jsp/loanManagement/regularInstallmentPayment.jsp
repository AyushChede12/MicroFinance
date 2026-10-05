<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<div class="pagetitle">
	<h1>LOAN MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-cash-coin"></i>
			</a></li>
			<li class="breadcrumb-item action">REGULAR INSTALLMENT PAYMENT</li>
		</ol>
	</nav>
</div>

<div class="row">
	<div class="col-lg-3">
		<div class="d-flex flex-column formFields mb-4">
			<label for="">SELECT LOAN ID</label> <select id="loanID"
				name="loanID" required="required" class="form-control selectField"
				style="height: 30px;">
				<option value="">SELECT LOAN ID</option>

			</select>
		</div>
	</div>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH DETAILS</li>
				</ol>
			</nav>
			<div class="row">

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="date">DATE OF LOAN</label> <input type="date"
							name="date" id="date" readonly
							style="background: #f9f9f9; text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="customercode">CUSTOMER CODE</label> <input type="text"
							name="customercode" id="customercode" readonly
							placeholder="CUSTOMER CODE" style="background: #f9f9f9;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="customerName">CUSTOMER NAME</label> <input type="text"
							name="customerName" id="customerName" readonly
							placeholder="CUSTOMER NAME" style="background: #f9f9f9; font-weight: bold;" />
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="typeOfLoan">TYPE OF LOAN</label> <input type="text"
							name="typeOfLoan" id="typeOfLoan" readonly
							placeholder="TYPE OF LOAN" style="background: #f9f9f9;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="intesteType">INTEREST TYPE</label> <input type="text"
							name="intesteType" id="intesteType" readonly
							placeholder="INTEREST TYPE" style="background: #f9f9f9;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="loanmode">LOAN MODE</label> <input type="text" name="loanmode"
							id="loanmode" readonly
							placeholder="LOAN MODE" style="background: #f9f9f9;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="term">TERM</label> <input type="text" name="term"
							id="term" readonly placeholder="TERM" style="background: #f9f9f9;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="paymnetEmi">EMI PAYMENT (&#8377;)</label> <input type="text"
							name="paymnetEmi" id="paymnetEmi" readonly
							placeholder="EMI PAYMENT" style="background: #f9f9f9; font-weight: bold;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="rateofinterest">RATE OF INTEREST (%)</label> <input type="text"
							name="rateofinterest" id="rateofinterest" readonly
							placeholder="RATE OF INTEREST" style="background: #f9f9f9;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="contact">CONTACT NO.</label> <input type="text"
							name="contact" id="contact" readonly
							placeholder="CONTACT NO" style="background: #f9f9f9;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="amountLoan">AMOUNT OF LOAN (&#8377;)</label> <input type="text"
							name="amountLoan" id="amountLoan" readonly
							placeholder="AMOUNT OF LOAN" style="background: #f9f9f9;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="branchName">BRANCH NAME</label> <input type="text"
							name="branchName" id="branchName" readonly
							placeholder="BRANCH NAME" style="background: #f9f9f9;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="BranchAddress">BRANCH ADDRESS</label> <input type="text"
							name="BranchAddress" id="BranchAddress" readonly
							placeholder="BRANCH ADDRESS" style="background: #f9f9f9;" />
					</div>
				</div>

			</div>
		</div>





		<div class="mt-5">
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">PAYMENT DETAILS</li>
				</ol>
			</nav>
			<div class="row">

				<div class="col-lg-3">

					<div class="d-flex flex-column formFields mb-4">
						<label for=""> INSTALLMENT</label> <select id="installment"
							name="installment" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">-SELECT INSTALLMENT-</option>

						</select>
					</div>
				</div>

				<!-- <div class="col-lg-3">
							<div class="d-flex flex-column formFields mb-4">
								<label for="">Interest Due </label> <input type="text"
									name="dueInterest" id="dueInterest" required="required"
									placeholder="Enter Location" />
							</div>
						</div> -->


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="emiDueDate">EMI DUE DATE</label> <input
							type="date" name="emiDueDate" id="emiDueDate" readonly
							placeholder="EMI DUE DATE"
							style="background: #f0f7ff; font-weight: bold; color: #0d47a1; text-transform: uppercase;" />
						<input type="hidden" name="registrationDate" id="registrationDate" />
					</div>
				</div>



				<!-- <div class="col-lg-3">
							<div class="d-flex flex-column formFields mb-4">
								<label for=""> Principle Due </label> <input type="text"
									name="duePrincipal" id="duePrincipal" required="required"
									placeholder="Enter Location" />
							</div>
						</div> -->


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">TOTAL AMOUNT DUE</label> <input type="text"
							name="dueAmounttotal" id="dueAmounttotal" required="required"
							placeholder="ENTER TOTAL AMOUNT DUE" />
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">PAYMENT AMOUNT</label> <input type="text"
							name="paymentAmount" id="paymentAmount" required="required"
							placeholder="ENTER PAYMENT AMOUNT" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="vehicalNo">PAYMENT DATE</label> <input type="date"
							name="PaymentDate" id="PaymentDate" required="required"
							placeholder="ENTER PAYMENT DATE" style="text-transform: uppercase;" />
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">NET AMOUNT</label> <input type="text"
							name="netAmount" id="netAmount" required="required"
							placeholder="ENTER NET AMOUNT" />
					</div>
				</div>



				<div class="col-lg-3">

					<div class="d-flex flex-column formFields mb-4">
						<label for="sourcePayment">PAYMENT MODE</label> <select id="sourcePayment"
							name="sourcePayment" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="" selected>-SELECT PAYMENT MODE-</option>
							<option value="Cash">CASH</option>
							<option value="Saving Account">SAVING ACCOUNT</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3" id="savingAccountWrapper" style="display: none;">
					<div class="d-flex flex-column formFields mb-4">
						<label for="savingAccountNo">SAVINGS ACCOUNT NO <span style="color:red;">*</span></label>
						<select id="savingAccountNo" name="accountNo"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT ACCOUNT</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3" id="savingBalanceWrapper" style="display: none;">
					<div class="d-flex flex-column formFields mb-4">
						<label for="savingBalance">AVAILABLE BALANCE</label> <input type="text"
							name="savingBalance" id="savingBalance" readonly
							placeholder="&#8377; 0.00"
							style="background: #e8f5e9; color: #1b5e20; font-weight: bold;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="penaltyAmount">PENALTY AMOUNT</label> <input type="text"
							name="penaltyAmount" id="penaltyAmount" readonly
							placeholder="&#8377; 0.00" style="background: #fff8f8; font-weight: bold; color: #c62828;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="daysLate">DAYS LATE</label> <input type="text"
							name="daysLate" id="daysLate" readonly
							placeholder="0" style="background: #f9f9f9; font-weight: bold;" />
					</div>
				</div>


				<!-- <div class="col-lg-3">
							<div class="d-flex flex-column formFields">
								<label for="">Down Payment</label>
								<textarea name="downPayment" id="downPayment"
									style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px;"></textarea>
							</div>
						</div> -->

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="financialConsultantId">FINANCIAL CONSULTANT CODE</label>
						<select id="financialConsultantId" name="financialConsultantId"
							class="form-control selectField" style="height: 30px;">
							<option value="">-- SELECT FINANCIAL CONSULTANT --</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="financialConsultantName">FINANCIAL CONSULTANT NAME</label>
						<input type="text" name="financialConsultantName" id="financialConsultantName"
							readonly="readonly" placeholder="FINANCIAL CONSULTANT NAME" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">REMARK SECTION</label> <input type="text"
							name="sectionRemARK" id="sectionRemARK" required="required"
							placeholder="ENTER REMARK SECTION" />
					</div>
				</div>

				<!-- CASH NOTE DENOMINATION SECTION -->
				<div class="col-12" id="cashDenominationWrapper" style="display: none; margin-top: 15px; margin-bottom: 20px;">
					<div style="background: #ffffff; border: 1px solid #cbd5e1; border-left: 4px solid #059669; border-radius: 8px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
						<div class="d-flex justify-content-between align-items-center mb-3">
							<div style="font-weight: 700; color: #1e293b; font-size: 14px;">
								<i class="bi bi-cash-stack" style="color: #059669; margin-right: 6px; font-size: 16px;"></i>
								CASH NOTE DENOMINATION
							</div>
							<div class="d-flex align-items-center gap-3">
								<span style="font-size: 12px; color: #64748b;">Total Notes: <b id="totalNotesCount" style="color: #1e293b;">0</b></span>
								<span style="font-size: 13px; font-weight: 700; color: #059669;">Total Cash: <span id="denominationGrandTotal">&#8377; 0.00</span></span>
								<span id="denominationMatchBadge" style="display: none; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold;"></span>
							</div>
						</div>

						<div class="row g-2">
							<div class="col-lg-2 col-md-4 col-6">
								<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; text-align: center;">
									<div style="font-weight: bold; color: #334155; font-size: 13px;">&#8377; 500</div>
									<div class="d-flex align-items-center justify-content-center gap-1 mt-1">
										<span style="font-size: 11px; color: #64748b;">×</span>
										<input type="number" min="0" id="denom500" class="form-control form-control-sm denom-count" placeholder="0" style="width: 75px; text-align: center; height: 28px; font-weight: bold;" />
									</div>
									<div id="denomSub500" style="font-size: 11px; color: #059669; margin-top: 4px; font-weight: bold;">&#8377; 0</div>
								</div>
							</div>

							<div class="col-lg-2 col-md-4 col-6">
								<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; text-align: center;">
									<div style="font-weight: bold; color: #334155; font-size: 13px;">&#8377; 200</div>
									<div class="d-flex align-items-center justify-content-center gap-1 mt-1">
										<span style="font-size: 11px; color: #64748b;">×</span>
										<input type="number" min="0" id="denom200" class="form-control form-control-sm denom-count" placeholder="0" style="width: 75px; text-align: center; height: 28px; font-weight: bold;" />
									</div>
									<div id="denomSub200" style="font-size: 11px; color: #059669; margin-top: 4px; font-weight: bold;">&#8377; 0</div>
								</div>
							</div>

							<div class="col-lg-2 col-md-4 col-6">
								<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; text-align: center;">
									<div style="font-weight: bold; color: #334155; font-size: 13px;">&#8377; 100</div>
									<div class="d-flex align-items-center justify-content-center gap-1 mt-1">
										<span style="font-size: 11px; color: #64748b;">×</span>
										<input type="number" min="0" id="denom100" class="form-control form-control-sm denom-count" placeholder="0" style="width: 75px; text-align: center; height: 28px; font-weight: bold;" />
									</div>
									<div id="denomSub100" style="font-size: 11px; color: #059669; margin-top: 4px; font-weight: bold;">&#8377; 0</div>
								</div>
							</div>

							<div class="col-lg-2 col-md-4 col-6">
								<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; text-align: center;">
									<div style="font-weight: bold; color: #334155; font-size: 13px;">&#8377; 50</div>
									<div class="d-flex align-items-center justify-content-center gap-1 mt-1">
										<span style="font-size: 11px; color: #64748b;">×</span>
										<input type="number" min="0" id="denom50" class="form-control form-control-sm denom-count" placeholder="0" style="width: 75px; text-align: center; height: 28px; font-weight: bold;" />
									</div>
									<div id="denomSub50" style="font-size: 11px; color: #059669; margin-top: 4px; font-weight: bold;">&#8377; 0</div>
								</div>
							</div>

							<div class="col-lg-2 col-md-4 col-6">
								<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; text-align: center;">
									<div style="font-weight: bold; color: #334155; font-size: 13px;">&#8377; 20</div>
									<div class="d-flex align-items-center justify-content-center gap-1 mt-1">
										<span style="font-size: 11px; color: #64748b;">×</span>
										<input type="number" min="0" id="denom20" class="form-control form-control-sm denom-count" placeholder="0" style="width: 75px; text-align: center; height: 28px; font-weight: bold;" />
									</div>
									<div id="denomSub20" style="font-size: 11px; color: #059669; margin-top: 4px; font-weight: bold;">&#8377; 0</div>
								</div>
							</div>

							<div class="col-lg-2 col-md-4 col-6">
								<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; text-align: center;">
									<div style="font-weight: bold; color: #334155; font-size: 13px;">&#8377; 10</div>
									<div class="d-flex align-items-center justify-content-center gap-1 mt-1">
										<span style="font-size: 11px; color: #64748b;">×</span>
										<input type="number" min="0" id="denom10" class="form-control form-control-sm denom-count" placeholder="0" style="width: 75px; text-align: center; height: 28px; font-weight: bold;" />
									</div>
									<div id="denomSub10" style="font-size: 11px; color: #059669; margin-top: 4px; font-weight: bold;">&#8377; 0</div>
								</div>
							</div>

							<div class="col-lg-2 col-md-4 col-6">
								<div style="background: #fff8e1; border: 1px solid #ffe082; border-radius: 6px; padding: 8px; text-align: center;">
									<div style="font-weight: bold; color: #5d4037; font-size: 13px;">&#8377; 5 <span style="font-size:10px; color:#795548;">(Coin)</span></div>
									<div class="d-flex align-items-center justify-content-center gap-1 mt-1">
										<span style="font-size: 11px; color: #64748b;">×</span>
										<input type="number" min="0" id="denom5" class="form-control form-control-sm denom-count" placeholder="0" style="width: 75px; text-align: center; height: 28px; font-weight: bold;" />
									</div>
									<div id="denomSub5" style="font-size: 11px; color: #795548; margin-top: 4px; font-weight: bold;">&#8377; 0</div>
								</div>
							</div>

							<div class="col-lg-2 col-md-4 col-6">
								<div style="background: #fff8e1; border: 1px solid #ffe082; border-radius: 6px; padding: 8px; text-align: center;">
									<div style="font-weight: bold; color: #5d4037; font-size: 13px;">&#8377; 2 <span style="font-size:10px; color:#795548;">(Coin)</span></div>
									<div class="d-flex align-items-center justify-content-center gap-1 mt-1">
										<span style="font-size: 11px; color: #64748b;">×</span>
										<input type="number" min="0" id="denom2" class="form-control form-control-sm denom-count" placeholder="0" style="width: 75px; text-align: center; height: 28px; font-weight: bold;" />
									</div>
									<div id="denomSub2" style="font-size: 11px; color: #795548; margin-top: 4px; font-weight: bold;">&#8377; 0</div>
								</div>
							</div>

							<div class="col-lg-2 col-md-4 col-6">
								<div style="background: #fff8e1; border: 1px solid #ffe082; border-radius: 6px; padding: 8px; text-align: center;">
									<div style="font-weight: bold; color: #5d4037; font-size: 13px;">&#8377; 1 <span style="font-size:10px; color:#795548;">(Coin)</span></div>
									<div class="d-flex align-items-center justify-content-center gap-1 mt-1">
										<span style="font-size: 11px; color: #64748b;">×</span>
										<input type="number" min="0" id="denom1" class="form-control form-control-sm denom-count" placeholder="0" style="width: 75px; text-align: center; height: 28px; font-weight: bold;" />
									</div>
									<div id="denomSub1" style="font-size: 11px; color: #795548; margin-top: 4px; font-weight: bold;">&#8377; 0</div>
								</div>
							</div>
						</div>

						<!-- Denomination Alert Box -->
						<div id="denominationAlertMsg" style="display: none; margin-top: 12px; padding: 10px 14px; border-radius: 6px; font-size: 13px; font-weight: 600;"></div>
					</div>
				</div>
			</div>
		</div>

		<div class="row mt-4 mb-4">
			<div class="col-12 text-center">
				<button type="button" id="payEmiBtn" class="btn btn-success px-4 py-2" style="font-weight: 600; font-size: 14px; border-radius: 6px; box-shadow: 0 2px 6px rgba(16,185,129,0.3);">
					<i class="bi bi-credit-card-2-front" style="margin-right: 6px;"></i> PAY EMI
				</button>
				<button type="button" id="resetBtn" class="btn btn-secondary px-4 py-2" style="font-weight: 600; font-size: 14px; border-radius: 6px; margin-left: 12px;">
					<i class="bi bi-arrow-counterclockwise" style="margin-right: 6px;"></i> RESET
				</button>
			</div>
		</div>
	</form>

</div>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script
	src="${pageContext.request.contextPath}/js/LoanManagment/RegularInsatllmentPayment.js?v=<%= System.currentTimeMillis() %>"></script>
