
<div class="pagetitle">
	<h1>INCENTIVE MANAGEMENT </h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-award"></i>
			</a></li>
			<li class="breadcrumb-item action">INCENTIVE SCHEME MASTER </li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">INCENTIVE MASTER </li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">INCENTIVE MONTH </label> <select id="incentiveMonth"
							name="incentiveMonth" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT</option>

						</select>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="vehicalNo">DATE FROM </label> <input type="date"
							name="dateFrom" id="dateFrom" required="required"
							placeholder="ENTER DATE FROM " style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="vehicalNo">DATE TO </label> <input type="date"
							name="dateTo" id="dateTo" required="required"
							placeholder="ENTER DATE TO " style="text-transform: uppercase;" />
					</div>
				</div>

				<!-- <div class="col-lg-3">
              <div class="d-flex flex-column formFields" style="margin-bottom: 30px">
                <label for="vehicalNo">To Date</label>
                <div class="position-relative">
                  <input type="date" name="vehicalNo" id="vehicalNo" required="required" placeholder="Enter Vehicle No"
                  style="text-transform: uppercase;" />
                </div>
              </div>
            </div> -->

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="">COMMENTS </label> <input type="text" name="comments"
							id="comments" required="required" placeholder="ENTER COMMENTS" />
					</div>

				</div>



				<div class="row" style="margin-left: 45%;">
					<div class="col-12 text-center">
						<button id="saveBtn" class="btn btn-info ">SAVE</button>
					</div>
				</div>



				<table class="table table-borderless datatable overflow-scroll"
					style="margin-top: 30px;">
					<thead class="table-light">
						<tr style="font-family: 'Poppins', sans-serif;">
							<th scope="col">S/N</th>
							<th scope="col">INCENTIVE MONTH</th>
							<th scope="col">DATE FROM</th>
							<th scope="col">DATE T</th>
							<th scope="col">COMMENTS</th>

						</tr>
					</thead>
					<tbody id="incentiveTableBody">

					</tbody>
				</table>
			</div>
		</div>
	</form>
</div>
<script
	src="${pageContext.request.contextPath}/js/incentive/incentiveSchemeMaster.js"></script>

