
<div class="pagetitle">
	<h1>Preferences</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="#member-section"> <i
					class="bi bi-gear text-blue"></i>
			</a></li>
			<li class="breadcrumb-item action">Locker Management</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">Locker Funds</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">


					<div class="d-flex flex-column formFields">
						<label for="">Locker Fee :</label> <input type="text" name="price"
							id="price" required="required" placeholder="Enter Occupation" />
					</div>


				</div>


			</div>

			<div class="mt-5">

				<nav>
					<ol class="breadcrumb breadcrumb-title">
						<li class="breadcrumb-item action">Locker Transaction</li>
					</ol>
				</nav>
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
	src="${pageContext.request.contextPath}/js/preferences/lockerManagement.js"></script>