<style>
input[type="text"] {
	text-transform: uppercase;
}
</style>
<div class="pagetitle">
	<h1>ACCOUNT MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="home"> <i
					class="bi bi-wallet2"></i>
			</a></li>
			<li class="breadcrumb-item action">LEDGER ACCOUNT MASTER</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">NEW LEDGER ENTRY</li>
				</ol>
			</nav>
			<!-- Hidden fields -->
			<input type="hidden" name="accountId" id="accountId" /> <input
				type="hidden" name="currentBalance" id="currentBalance" value="0.00" />
			<div class="row mb-3">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">ACCOUNT CODE <span class="star">*</span></label> <input
							type="text" name="accountCode" id="accountCode"
							placeholder="ENTER CODE" /> <span id="accountCodeError"
							style="color: red; font-size: 12px;"></span>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">ACCOUNT TITLE <span class="star">*</span></label> <input
							type="text" name="accountTitle" id="accountTitle"
							placeholder="ENTER LEDGER NAME" /> <span id="accountTitleError"
							style="color: red; font-size: 12px;"></span>

					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="groupName">ACCOUNT GROUP <span class="star">*</span></label>
						<select id="groupName" name="groupName"
							class="form-control selectField" style="height: 30px;">
							<option value="">--SELECT GROUP--</option>
							<!-- Groups (Assets, Liabilities, Income, Equity, Expenses) 
			     will be loaded dynamically from JS/backend -->
						</select> <span id="groupNameError" style="color: red; font-size: 12px;"></span>
					</div>
				</div>

				<!-- Account Type -->
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="accountType">ACCOUNT TYPE <span class="star">*</span></label>
						<select id="accountType" name="accountType"
							class="form-control selectField" style="height: 30px;">
							<option value="">--SELECT TYPE--</option>
							<option value="SHARE CAPITAL">SHARE CAPITAL</option>
							<option value="CASH IN HAND">CASH IN HAND</option>
							<option value="FUNDS AND RESERVE">FUNDS AND RESERVE</option>
							<option value="DEPOSITS">DEPOSITS</option>
							<option value="BANKS PAYABLE">BANKS PAYABLE</option>
							<option value="INTEREST PAYABLE">INTEREST PAYABLE</option>
							<option value="OTHER PAYABLE">OTHER PAYABLE</option>
							<option value="PROFIT AND LOSS">PROFIT AND LOSS</option>
							<option value="BANK ACCOUNT">BANK ACCOUNT</option>
							<option value="BANK INVESTMENT">BANK INVESTMENT</option>
							<option value="BANK SHARES">BANK SHARES</option>
							<option value="LOANS">LOANS</option>
							<option value="FIXED ASSETS">FIXED ASSETS</option>
							<option value="DEAD STOCK">DEAD STOCK</option>
							<option value="INTEREST RECEIVALE">INTEREST RECEIVALE</option>
							<option value="OTHER RECEIVABLE">OTHER RECEIVABLE</option>
							<option value="BANK INTEREST">BANK INTEREST</option>
							<option value="OTHER INCOMES">OTHER INCOMES</option>
							<option value="INTEREST PAID">INTEREST PAID</option>
							<option value="OTHER EXPENSES">OTHER EXPENSES</option>
							<option value="OTHER">OTHER</option>
							<!-- Sub-types will be injected dynamically based on group selection -->
						</select> <span id="accountTypeError" style="color: red; font-size: 12px;"></span>
					</div>
				</div>
			</div>

			<!-- Opening Balance -->
			<div class="row mb-3">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label>OPENING BALANCE</label> <input type="number"
							name="openingBalance" id="openingBalance"
							placeholder="ENTER OPENING BALANCE" step="0.01" min="0"
							value="0.00" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="openingBalanceType">BALANCE TYPE</label> <select
							id="openingBalanceType" name="openingBalanceType"
							class="form-control selectField" style="height: 30px;" disabled>
							<option value="DR">DR</option>
							<option value="CR">CR</option>
						</select>
					</div>
				</div>


				<!-- Status -->
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">STATUS</label> <select id="status" name="status"
							class="form-control selectField" style="height: 30px;">
							<option value="Active">ACTIVE</option>
							<option value="Inactive">INACTIVE</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">BRANCH NAME <span class="star">*</span>
						</label> <select id="branchName" name="branchName"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT BRANCH NAME</option>
						</select> <span id="branchNameError" style="color: red; font-size: 12px;"></span>

					</div>



					<div class="d-flex justify-content-start gap-3 mt-4">
						<button id="saveBtn" type="submit" class="btnStyle"
							style="background-color: #FFA500;">SAVE</button>
						<button id="clearBtn" type="reset" class="btnStyle bg-primary">CLEAR</button>

						<button type="button" id="toggleBtn" class="btnStyle bg-success"
							onclick="showTableData()">SHOW</button>


					</div>

				</div>
			</div>
		</div>


	</form>

	<div class="mt-5">
		<div class="row mt-5">
			<div class="col-12">

				<div class="card recent-sales">

					<div class="card-body">

						<!-- HEADER ROW - FIXED -->
						<div
							class="d-flex justify-content-between align-items-center mb-3">

							<!-- LEFT SIDE TITLE -->
							<h5 class="card-title mb-0">
								LEDGER LIST <span>| TABLE VIEW</span>
							</h5>

							<!-- RIGHT SIDE SEARCH - FIXED -->
							<div style="width: 280px; flex-shrink: 0;">

								<div class="input-group">

									<span class="input-group-text bg-white"> <i
										class="fa-solid fa-magnifying-glass text-primary"></i>
									</span> <input type="text" id="ledgerSearch" class="form-control"
										placeholder="Search Ledger..." autocomplete="off">

								</div>

							</div>

						</div>


						<!-- ONLY TABLE WILL SCROLL -->
						<div class="table-responsive">

							<table class="table table-borderless datatable">

								<thead class="table-light">

									<tr style="font-family: 'Poppins', sans-serif;">

										<th style="white-space: nowrap;">ID</th>

										<th style="white-space: nowrap;">ACCOUNT CODE</th>

										<th style="white-space: nowrap;">ACCOUNT TITLE</th>

										<th style="white-space: nowrap;">ACCOUNT GROUP</th>

										<th style="white-space: nowrap;">ACCOUNT TYPE</th>

										<th style="white-space: nowrap;">OPENING BALANCE</th>

										<th style="white-space: nowrap;">OPENING BALANCE TYPE</th>

										<th style="white-space: nowrap;">CURRENT BALANCE</th>

										<th style="white-space: nowrap;">STATUS</th>

										<th style="white-space: nowrap;">BRANCH NAME</th>

										<th style="white-space: nowrap;">VIEW</th>

										<th style="white-space: nowrap;">DELETE</th>

									</tr>

								</thead>

								<tbody id="tableBody">
								</tbody>

							</table>

						</div>

					</div>

				</div>

			</div>
		</div>
	</div>
</div>

<script
	src="${pageContext.request.contextPath}/js/account-management/ledgeraccountmaster.js"></script>
<script>
	$(document).ready(function() {
		BranchNameDropdown();
	});
</script>
