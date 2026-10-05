
<div class="pagetitle">
	<h1>ACCOUNT MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="home"> <i
					class="bi bi-wallet2"></i>
			</a></li>
			<li class="breadcrumb-item action">CASH BOOK</li>
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
						<label for="">BRANCH NAME</label> <select id="branchName"
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
			<button type="button" onclick="getCashBook()" id="showDetilsBtn"
				class="btnStyle" style="background-color: #ff8400;">SHOW
				DETAILS</button>
		</div>
	</div>
</form>

<div class="row mt-5">

	<div class="col-12">

		<div class="card recent-sales">

			<div class="card-body table-responsive">

				<div
					class="card-header d-flex justify-content-between align-items-center">

					<h5 class="mb-0">SEARCH RESULT</h5>

					<div style="width: 250px;">

						<input type="text" id="cashBookSearch" class="form-control"
							placeholder="Search customer..." style="text-transform: uppercase;">

					</div>

				</div>



				<table class="table table-borderless datatable overflow-scroll">

					<thead class="table-light">

						<tr style="font-family: 'Poppins', sans-serif;">

							<th class="text-center" style="white-space: nowrap;">S.NO.</th>

							<th class="text-center" style="white-space: nowrap;">DATE</th>

							<th class="text-center" style="white-space: nowrap;">CUSTOMER
								NAME</th>

							<th class="text-center" style="white-space: nowrap;">REFERENCE
								NO.</th>

							<th class="text-center" style="white-space: nowrap;">ACCOUNT
								NO.</th>

							<th class="text-center" style="white-space: nowrap;">NARRATION</th>

							<th class="text-end" style="white-space: nowrap;">DEBIT
								(&#8377;)</th>

							<th class="text-end" style="white-space: nowrap;">CREDIT
								(&#8377;)</th>

							<th class="text-end" style="white-space: nowrap;">BALANCE
								(&#8377;)</th>

						</tr>

					</thead>

					<tbody id="cashBookTableBody">

						<tr>

							<td colspan="8" class="text-center">NO RECORDS FOUND</td>

						</tr>

					</tbody>

					<tfoot>

						<tr>

							<th colspan="5" class="text-end">TOTAL</th>

							<th class="text-end" id="totalDebit">&#8377;0.00</th>

							<th class="text-end" id="totalCredit">&#8377;0.00</th>

							<th class="text-end" id="closingBalance">&#8377;0.00</th>

						</tr>

					</tfoot>

				</table>

			</div>

		</div>

	</div>

</div>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
<script
	src="${pageContext.request.contextPath}/js/account-management/cashBook.js"></script>
