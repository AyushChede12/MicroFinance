
<div class="pagetitle">
	<h1>POLICY MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-piggy-bank"></i>
			</a></li>
			<li class="breadcrumb-item action">INTEREST DETAILS</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">:PRINT SEARCH RESULT</li>
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
							<label for="">FIND BY POLICY CODE*</label> <select
								id="findByPolicyNumber" name="findByPolicyNumber"
								required="required" class="form-control selectField"
								style="height: 30px;">
								<option value="">SELECT POLICY CODE</option>

							</select>
						</div>
					</div>





				</div>

				<div class="row" style="margin-top: 20px; margin-left: 750px;">
					<div class="col-12 text-center">
						<button id="saveBtn" class="btnStyle bg-warning">FIND</button>
					</div>
				</div>

			</div>

			<div class="mt-5">

				<div class="row">


					<div class="col-12">
						<div class="card recent-sales">

							<div class="card-body table-responsive">
								<h5 class="card-title">
									Recent Sales <span>| Today</span>
								</h5>

								<table class="table table-borderless datatable overflow-scroll">
									<thead class="table-light">
										<tr style="font-family: 'Poppins', sans-serif;">
											<th scope="col">#</th>
											<th scope="col">Customer</th>
											<th scope="col">Product</th>
											<th scope="col">Price</th>
											<th scope="col">Status</th>
											<th scope="col">Action</th>
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
		</div>


	</form>

</div>

	<script
	src="${pageContext.request.contextPath}/js/PolicyManagment/interestDetails.js"></script>
