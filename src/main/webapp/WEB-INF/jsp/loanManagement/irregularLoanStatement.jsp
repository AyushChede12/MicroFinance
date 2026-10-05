
<div class="pagetitle">
	<h1>LOAN MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-cash-coin"></i>
			</a></li>
			<li class="breadcrumb-item action">IRREGULAR LOAN STATEMENT</li>
		</ol>
	</nav>
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
					<div class="d-flex flex-column formFields mb-4">
						<label for="">FIND LOAN ID & NAME</label> <select id="loanid"
							name="loanid" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT COLOR</option>
							<option value="Blue">BLUE</option>
						</select>
					</div>
				</div>



			</div>
		</div>







		<div class="row mt-4">
			<div class="col-12 text-center">
				<button id="saveBtn" class="btnStyle bg-success">SEARCH</button>

			</div>
		</div>
	</form>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">
						RECENT SALES <span>| TODAY</span>
					</h5>

					<table class="table table-borderless datatable overflow-scroll">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">#</th>
								<th scope="col">CUSTOMER</th>
								<th scope="col">PRODUCT</th>
								<th scope="col">PRICE</th>
								<th scope="col">STATUS</th>
								<th scope="col">ACTION</th>
							</tr>
						</thead>
						<tbody>
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="row"><a href="#">1</a></th>
								<td>Arun Kumar</td>
								<td><a href="#" className="text-primary">Milk</a></td>
								<td>$29</td>
								<td><span class="badge bg-success text-white">Approved</span>
								</td>
								<td class="d-flex" style="gap: .7rem;">
									<button class="iconbutton">
										<i class="fa-solid fa-pen-to-square text-success"></i>
									</button>
									<button class="iconbutton">
										<i class="fa-solid fa-eye text-primary"></i>
									</button>
									<button class="iconbutton">
										<i class="fa-solid fa-trash text-danger"></i>
									</button>
								</td>
							</tr>

							<tr>
								<th scope="row"><a href="#">2</a></th>
								<td>Deepak Dalwe</td>
								<td><a href="#" className="text-primary">Ghee</a></td>
								<td>$16.5</td>
								<td><span class="badge bg-danger text-white">Rejected</span>
								</td>
								<td class="d-flex" style="gap: .7rem;">
									<button class="iconbutton">
										<i class="fa-solid fa-pen-to-square text-success"></i>
									</button>
									<button class="iconbutton">
										<i class="fa-solid fa-eye text-primary"></i>
									</button>
									<button class="iconbutton">
										<i class="fa-solid fa-trash text-danger"></i>
									</button>
								</td>
							</tr>
							<tr>
								<th scope="row"><a href="#">2</a></th>
								<td>Deepak Dalwe</td>
								<td><a href="#" className="text-primary">Ghee</a></td>
								<td>$16.5</td>
								<td><span class="badge bg-danger text-white">Rejected</span>
								</td>
								<td class="d-flex" style="gap: .7rem;">
									<button class="iconbutton">
										<i class="fa-solid fa-pen-to-square text-success"></i>
									</button>
									<button class="iconbutton">
										<i class="fa-solid fa-eye text-primary"></i>
									</button>
									<button class="iconbutton">
										<i class="fa-solid fa-trash text-danger"></i>
									</button>
								</td>
							</tr>
							<tr>
								<th scope="row"><a href="#">2</a></th>
								<td>Deepak Dalwe</td>
								<td><a href="#" className="text-primary">Ghee</a></td>
								<td>$16.5</td>
								<td><span class="badge bg-danger text-white">Rejected</span>
								</td>
								<td class="d-flex" style="gap: .7rem;">
									<button class="iconbutton">
										<i class="fa-solid fa-pen-to-square text-success"></i>
									</button>
									<button class="iconbutton">
										<i class="fa-solid fa-eye text-primary"></i>
									</button>
									<button class="iconbutton">
										<i class="fa-solid fa-trash text-danger"></i>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

</div>
<script
	src="${pageContext.request.contextPath}/js/LoanManagment/irregularLoanStatement.js"></script>