
<div class="pagetitle">
	<h1>PREFERNCES</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-gear"></i>
			</a></li>
			<li class="breadcrumb-item action">CATEGORY-CASTE MODULE</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">CATEGORY</li>
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
					<input type="hidden" name="id" id="id">
					<div class="d-flex flex-column formFields">
						<label for="">ADD CATEGORY <span class="star">*</span></label> <input
							type="text" name="category" id="category"
							placeholder="ENTER CATEGORY" style="text-transform: uppercase;" />
						<small id="chkcategory" style="color: red;"></small>
					</div>
				</div>

				<div class="d-flex flex-column formFields">
					<label for="">ADD CASTE <span class="star">*</span></label> <input
						type="text" name="caste" id="caste" required="required"
						placeholder="ENTER CASTE" style="text-transform: uppercase;" /> <small
						id="chkcaste" style="color: red;"></small>
				</div>

				<div class="row" style="margin-top: 15px; margin-left: 10px;">
					<div class="col-12 text-center">
						<button id="saveBtn" class="btnStyle bg-warning"
							onclick="saveCategory()">ADD</button>
						<button type="button" id="updateBtn" class="btnStyle bg-success"
							onclick="updateCategory()">UPDATE</button>
					</div>
				</div>

				<!-- <div class="col-lg-3">
                            <div class="d-flex flex-column formFields" style="margin-bottom: 30px">

                                <button id="saveBtn" class="btnStyle bg-primary">Add</button>

                            </div>
                        </div> -->









			</div>


			<div class="mt-5">
				<div class="row mt-5">
					<div class="col-12">
						<div class="card recent-sales">
							<div class="card-body table-responsive">
								<!-- Title + Search bar in same line -->
								<div
									class="d-flex justify-content-between align-items-center mb-3">
									<h5 class="card-title mb-0"
										style="font-family: 'Poppins', sans-serif;">
										CATEGORY DETAILS <span>| TABLE VIEW</span>
									</h5>

									<!-- Search bar -->
									<div class="input-group" style="width: 250px;">
										<span class="input-group-text"><i class="bi bi-search"></i></span>
										<input type="text" id="searchCategory" class="form-control"
											placeholder="Search..." />
									</div>
								</div>

								<!-- Table -->
								<table class="table table-borderless datatable overflow-scroll">
									<thead class="table-light">
										<tr style="font-family: 'Poppins', sans-serif;">
											<th scope="col">SR NO</th>
											<th scope="col">CATEGORY</th>
											<th scope="col">CASTE</th>
											<th scope="col">EDIT</th>
											<th scope="col">DELETE</th>
										</tr>
									</thead>
									<tbody id="tableBody">
										<!-- Rows will be dynamically added here -->
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
	</form>



</div>

<script
	src="${pageContext.request.contextPath}/js/preferences/category.js"></script>