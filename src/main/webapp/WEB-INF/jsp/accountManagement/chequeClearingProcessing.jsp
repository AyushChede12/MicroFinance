
<div class="pagetitle">
	<h1>ACCOUNT MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="home"> <i
					class="bi bi-wallet2"></i>
			</a></li>
			<li class="breadcrumb-item action">CHEQUE CLEARING PROCESSING</li>
		</ol>
	</nav>
</div>

<form id="formid">
	<div>
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">SEARCH BOX</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="">TYPE OF LOAN</label> <select id="typeOfLoan"
							name="typeOfLoan" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">--SELECT LOAN TYPE--</option>
						</select>
					</div>
				</div>

				<div class="col-lg-4">
					<div class="d-flex flex-column formFields">
						<label for="">BRANCH NAME</label> <select id="branchName"
							name="branchName" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">--SELECT BRANCH NAME--</option>
						</select>
					</div>
				</div>

				<div class="col-lg-4">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px;">
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

				<div class="col-lg-4">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">CHEQUE NO.</label> <input type="text"
							name="chequeNo" id="chequeNo" required="required"
							placeholder="ENTER CHEQUE NO." />
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-12 text-center mt-3">
			<button type="button" id="searchBtn" class="btnStyle"
				style="background-color: #FFA500;">SEARCH</button>
		</div>
	</div>
</form>

<div class="row mt-5">
	<div class="col-12">
		<div class="card recent-sales">

			<div class="card-body table-responsive">
				<h5 class="card-title">CHEQUE LIST</h5>

				<table class="table table-borderless datatable overflow-scroll">
					<thead class="table-light">
						<tr style="font-family: 'Poppins', sans-serif;">
							<th style="white-space: nowrap; text-align: center;">ID</th>
							<th style="white-space: nowrap; text-align: center;"">CUSTOMER NAME</th>
							<th style="white-space: nowrap; text-align: center;"">LOAN ACCOUNT TYPE</th>
							<th style="white-space: nowrap; text-align: center;"">CHEQUE NO</th>
							<th style="white-space: nowrap; text-align: center;"">CHEQUE DATE</th>
							<th style="white-space: nowrap; text-align: center;"">CHEQUE AMOUNT</th>
							<th style="white-space: nowrap; text-align: center;"">BRANCH</th>
							<th style="white-space: nowrap; text-align: center;"">LOAN TYPE</th>
							<th style="white-space: nowrap; text-align: center;"">STATUS</th>
							<th style="white-space: nowrap; text-align: center;"">ACTION</th>
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
	src="${pageContext.request.contextPath}/js/account-management/chequeClearingProcessing.js"></script>
