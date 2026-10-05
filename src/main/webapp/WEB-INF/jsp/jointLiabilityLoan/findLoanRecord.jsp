
<div class="pagetitle">
	<h1>JOINT LIABILITY LOAN</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-person-bounding-box"></i>
			</a></li>
			<li class="breadcrumb-item action">FIND LOAN RECORD</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">LOAN SEARCH FOR PRINT</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>LOAN BRANCH*</label>
						<div class="position-relative">
							<div class="select-btn1" style="cursor: pointer;">
								<span name="loanName" id="loanNameId" style="font-size: 12px;">SELECT
									GROUPID</span> <i class="fa-solid fa-angle-down"></i>
							</div>
							<div class="content" id="contentCityName" style="display: none;">
								<div class="search">
									<input type="text" id="city-search" class="m-0"
										placeholder="Search" />
								</div>
								<ul class="options" id="city-options">
									<!-- Options will be dynamically added here -->

								</ul>
							</div>
						</div>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">START DATE:</label> <input type="date"
							name="vehicalNo" id="vehicalNo" required="required"
							placeholder="" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">END DATE :</label> <input type="date"
							name="vehicalNo" id="vehicalNo" required="required"
							placeholder="Enter Vehicle No" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">CUSTOMER NAME:</label> <input type="date"
							name="vehicalNo" id="vehicalNo" required="required"
							placeholder="Enter CUSTOMER NAME" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>LOAN REFFERNCE NO.*</label>
						<div class="position-relative">
							<div class="select-btn1" style="cursor: pointer;">
								<span name="loanName" id="loanNameId" style="font-size: 12px;">SELECT
									GROUPID</span> <i class="fa-solid fa-angle-down"></i>
							</div>
							<div class="content" id="contentCityName" style="display: none;">
								<div class="search">
									<input type="text" id="city-search" class="m-0"
										placeholder="Search" />
								</div>
								<ul class="options" id="city-options">
									<!-- Options will be dynamically added here -->

								</ul>
							</div>
						</div>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">CUSTOMER CODE:</label> <input type="text"
							name="membercode" id="vehicalNo" required="required"
							placeholder="Enter CUSTOMER CODE" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">SCHEME NAME:</label> <input type="text"
							name="vehicalNo" id="vehicalNo" required="required"
							placeholder="ENTER SCHEME NAM" style="text-transform: uppercase;" />
					</div>
				</div>
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="vehicalNo">AGENT CODE:</label> <input type="text"
							name="vehicalNo" id="vehicalNo" required="required"
							placeholder="ENTER AGENT CODE "
							style="text-transform: uppercase;" />
					</div>
				</div>



			</div>
			<div class="row">
				<div class="col-12 text-center">

					<button id="saveBtn" class="btnStyle"
						style="background-color: #FFA500;">
						<i class="bi bi-search"></i>SEARCH
					</button>

				</div>
			</div>


		</div>




	</form>
	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">
					<h5 class="card-title">SEARCH RESULT</h5>

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
<script
	src="${pageContext.request.contextPath}/js/Joinlibiliy/findLoanRecords.js"></script>