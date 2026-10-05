
<div class="pagetitle">
	<h1>ACCOUNT MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="home"> <i
					class="bi bi-wallet2"></i>
			</a></li>
			<li class="breadcrumb-item action">TRAIL BALANCE REPORT</li>
		</ol>
	</nav>
</div>

<form id="formid">
	<div>
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH INFORMATION</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for=""> BRANCH NAME</label> <select id="branchName"
							name="branchName" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">--SELECT BRANCH--</option>
						</select>
					</div>
				</div>

				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">START DATE</label> <input type="date"
							name="startDate" id="startDate" required="required" />
					</div>
				</div>

				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">END DATE</label> <input type="date"
							name="endDate" id="endDate" required="required" />
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-12 text-center mt-3">
			<button id="viewBtn" class="btnStyle"
				style="background-color: #FFA500;">VIEW</button>
		</div>
	</div>
</form>

<div class="row mt-5">
	<div class="col-12 text-center">

		<!-- 🔥 Center Heading -->
		<h4>
			<b><u>TRIAL BALANCE</u></b>
		</h4>

		<!-- 🔥 Center Branch -->
		<p>
			<b>BRANCH :</b> <span id="branchLabel"></span>
		</p>

		<!-- 🔥 Center Date -->
		<p>
			<b>DATE :</b> <span id="dateLabel"></span>
		</p>

		<div class="card recent-sales mt-3">
			<div class="card-body table-responsive">

				<table class="table table-borderless datatable text-center">
					<thead class="table-light text-center">
						<tr style="font-family: 'Poppins', sans-serif;">
							<th>LEDGER NAME</th>
							<th>OPENING DR</th>
							<th>OPENING CR</th>
							<th>DEBIT</th>
							<th>CREDIT</th>
							<th>CLOSING DR</th>
							<th>CLOSING CR</th>
						</tr>
					</thead>

					<tbody>
					</tbody>

				</table>

			</div>
		</div>
	</div>
</div>

<script
	src="${pageContext.request.contextPath}/js/account-management/trialBalanceReport.js"></script>

