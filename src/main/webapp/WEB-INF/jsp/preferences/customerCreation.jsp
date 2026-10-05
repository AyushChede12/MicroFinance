
<%@page import="java.util.List"%>
<body onload="loadSidebar(sessionUser);">

	<div class="pagetitle">
		<h1>Preferences</h1>
		<nav>
			<ol class="breadcrumb">
				<li class="breadcrumb-item"><a href="openDashboard"> <i
						class="bi bi-gear text-blue"></i>
				</a></li>
				<li class="breadcrumb-item action">User Creation</li>
			</ol>
		</nav>
	</div>

	<div>
		<form id="formid">
			<div>
				<nav>
					<ol class="breadcrumb breadcrumb-title">
						<li class="breadcrumb-item action">User Information</li>
					</ol>
				</nav>
				<div class="row">
					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">

							<label for="">User ID</label> <input type="text" name="UserId"
								id="UserId" required="required" placeholder="Enter User ID" />

						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">
							<label for="password">Password</label> <input type="password"
								name="password" id="password" required="required"
								placeholder="Enter password" style="text-transform: uppercase;" />
						</div>
					</div>



					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>Full Name</label> <input type="text" name="fullName"
								id="fullName" required="required"
								placeholder="Enter customer Name" id="fullName"
								required="required" placeholder="Enter Full Name"
								style="text-transform: uppercase;" />
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">

							<label for="">Email ID </label> <input type="text" name="emailId"
								id="emailId" required="required" placeholder="Enter email" />

						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields">

							<label for="contactNo">Contact No.</label> <input type="text"
								name="contactNo" id="contactNo" required="required"
								placeholder="Enter Contact No" />
						</div>
					</div>


					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">

							<label>Sign In Branch</label> <select id="branchName"
								name="branchName" required="required"
								class="form-control selectField" style="height: 30px;">

							</select>
						</div>
					</div>

					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px;">
							<label for="pastDate">Past Date</label> <select id="pastDate"
								name="pastDate" required class="form-control selectField"
								style="height: 30px;">
								<option value="Yes">Select</option>
								<option value="Yes">Yes</option>
								<option value="No">No</option>
							</select>
						</div>
					</div>



					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>Re Print</label> <select id="rePrint" name="rePrint"
								required="required" class="form-control selectField"
								style="height: 30px;">

								<option value="">Select</option>
								<option value="Yes">Yes</option>
								<option value="No">No</option>

							</select>
						</div>
					</div>



					<div class="col-lg-3">
						<div class="d-flex flex-column formFields"
							style="margin-bottom: 30px">
							<label>Delete Access</label> <select id="deleteAccess"
								name="deleteAccess" required="required"
								class="form-control selectField" style="height: 30px;">
								<option value="">Select</option>
								<option value="Yes">Yes</option>
								<option value="No">No</option>


							</select>
						</div>
					</div>


					<div class="col-lg-3">
						<div
							class=" h-100 d-flex justify-content-start align-items-center">
							<div
								class="d-flex justify-content-start align-items-center  formFields">

								<label style="margin-left: 20px;" class="mb-2">User
									Status</label>

								<div class="cont">
									<div class="toggle">
										<input type="checkbox" id="toggle-user-status"
											class="toggle__input" data-toggle-type="user-status">
										<label for="toggle-user-status" class="toggle__label"></label>
									</div>
								</div>
							</div>
						</div>
					</div>


					<div class="row">
						<div class="col-12 text-center mt-4" style="margin-left: 300px;">

							<button id="saveBtn" class="btnStyle bg-warning" type="button">Save</button>
							<button id="updateBtn" type="button" class="btnStyle"
								style="background-color: #FFA500; display: none;">Update</button>


						</div>
					</div>



				</div>


				<div class="mt-5">
					<nav>
						<ol class="breadcrumb breadcrumb-title">
							<li class="breadcrumb-item action">User Access</li>
						</ol>
					</nav>

					<div class="row mt-5">
						<div class="col-12">
							<div class="card recent-sales">

								<div class="card-body table-responsive">
									<h5 class="card-title">User Access View</h5>

									<table class="table table-borderless datatable overflow-scroll"
										id="userTable">
										<thead class="table-light">
											<tr>
												<th>#</th>
												<th>User ID</th>
												<th>Full Name</th>
												<th>Email ID</th>
												<th>Contact Number</th>
												<th>Sign In Branch</th>
												<th>Past Date</th>
												<th>Re Print</th>
												<th>Delete Access</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>

											<!-- 	<tr style="font-family: 'Poppins', sans-serif;">

								<button type="button" id="saveUserBtn"
									class="btnStyle bg-warning">Save</button>

							</div>
						</div>



					</div>
				</div>
			</form>




			<div class="mt-5">
				<nav>
					<ol class="breadcrumb breadcrumb-title">
						<li class="breadcrumb-item action">Branch Access</li>
					</ol>
				</nav>

				<div class="row mt-5">
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

									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>


			<div class="mt-5">
				<nav>
					<ol class="breadcrumb breadcrumb-title">
						<li class="breadcrumb-item action">Plan Access</li>
					</ol>
				</nav>

				<div class="row mt-5">
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


			<div class="mt-5">
				<nav>
					<ol class="breadcrumb breadcrumb-title">
						<li class="breadcrumb-item action">Loan Access</li>
					</ol>
				</nav>

				<div class="row mt-5">
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

										</tr> -->

										</tbody>
									</table>
								</div>
							</div>

							</tr>
							</tbody>
							</table>

						</div>
					</div>
				</div>
			</div>

		</form>

	</div>

	<script type="text/javascript">
        // Fetch session data from JSP and pass it to JavaScript
        var sessionUser = [];

        <%List<String> userList = (List<String>) session.getAttribute("user");
if (userList != null) {
	for (String user : userList) {%>
                    sessionUser.push("<%=user%>
		");
	<%}
}%>
		
	</script>

	<script
		src="${pageContext.request.contextPath}/js/preferences/userCreation.js"></script>