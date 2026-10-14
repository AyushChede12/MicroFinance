
<div class="pagetitle">
	<h1>PREFERENCES</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-gear"></i>
			</a></li>
			<li class="breadcrumb-item action">CREATE BRANCH</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">BRANCH DETAILS</li>
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
						<label for="">BRANCH CODE <span class="star">*</span></label> <input
							type="text" name="branchCode" id="branchCode" required="required"
							placeholder="ENTER BRANCH CODE"
							style="text-transform: uppercase;" /> <small id="chkbranchcode"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>BRANCH NAME <span class="star">*</span></label> <input
							type="Text" name="branchName" id="branchName" required="required"
							placeholder="ENTER BRANCH NAME"
							style="text-transform: uppercase;" /> <small id="chkbranchName"
							style="color: red;"></small>
					</div>
				</div>



				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">OPENING DATE <span class="star">*</span></label> <input
							type="date" name="openingDate" id="openingDate"
							required="required" style="text-transform: uppercase;" /> <small
							id="chkopeningdate" style="color: red;"></small>
					</div>
				</div>


				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px;">
						<label for="">ADDRESS <span class="star">*</span></label>
						<textarea name="address" id="address"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px; text-transform: uppercase;"></textarea>
						<small id="chkaddress" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">PIN <span class="star">*</span></label> <input
							type="text" name="pin" id="pin" required="required"
							placeholder="ENTER PIN" style="text-transform: uppercase;" /> <small
							id="chkpin" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="state">STATE <span class="star">*</span></label> <select
							id="state" name="state" class="form-control selectField"
							style="height: 30px;">
							<option value="">SELECT STATE</option>
							<option value="MAHARASHTRA">MAHARASHTRA</option>
							<option value="RAJASTHAN">RAJASTHAN</option>
							<option value="PUNJAB">PUNJAB</option>
							<option value="GUJARAT">GUJARAT</option>
							<option value="ODISHA">ODISHA</option>
							<option value="ANDAMAN & NICOBAR">ANDAMAN & NICOBAR</option>
						</select> <small id="chkstate" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">BRANCH MANAGER CONTACT NO <span class="star">*</span></label>
						<input type="text" name="branchManagerContactNo"
							id="branchManagerContactNo" required="required"
							placeholder="ENTER BRANCH MANAGER CONTACT NO" /> <small
							id="chkbranchManager" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="">ACCOUNT DEPARTMENT CONTACT NO <span
							class="star">*</span></label> <input type="text"
							name="accountDepartmentContactNo" id="accountDepartmentContactNo"
							required="required"
							placeholder="ENTER ACCOUNT DEPARTMENT CONTACT NO" /> <small
							id="chkaccountDepartment" style="color: red;"></small>
					</div>
				</div>

			</div>



			<div class="row" style="margin-top: 30px;">
				<div class="col-12 text-center">
					<button type="button" id="showBtn" class="btnStyle bg-primary"
						onclick="showTableData()">SHOW</button>
					<button type="button" id="hideBtn" class="btnStyle bg-success"
						onclick="hideTableData()">HIDE</button>
					<button type="button" id="saveBtn" class="btnStyle bg-warning">SAVE</button>
					<button type="button" id="updateBtn" class="btnStyle bg-success"
						onclick="updateBranch()">UPDATE</button>
				</div>
			</div>
	</form>

</div>


<div class="row mt-5">
	<div class="col-12">
		<div class="card recent-sales">

			<div class="card-body table-responsive">
				<h5 class="card-title">
					BRANCH DATA <span>| TABLE VIEW</span>
				</h5>

				<table class="table table-borderless datatable overflow-scroll">
					<thead class="table-light">
						<tr style="font-family: 'Poppins', sans-serif;">
							<th scope="col" class="text-nowrap">SR NO</th>
							<th scope="col" class="text-nowrap">BRANCH CODE</th>
							<th scope="col" class="text-nowrap">BRANCH NAME</th>
							<th scope="col" class="text-nowrap">OPENING DATE</th>
							<th scope="col" class="text-nowrap">ADDRESS</th>
							<th scope="col" class="text-nowrap">PIN CODE</th>
							<th scope="col" class="text-nowrap">STATE</th>
							<th scope="col" class="text-nowrap">BRANCH CONTACT</th>
							<th scope="col" class="text-nowrap">ACCOUNT CONTACT</th>
							<th scope="col" class="text-nowrap">EDIT</th>
							<th scope="col" class="text-nowrap">DELETE</th>
						</tr>
					</thead>
					<tbody id="tableBody">

					</tbody>
				</table>
				<div class="mt-2 text-center">
					<button id="prevBtn" class="btn btn-sm btn-primary">
						<i class="bi bi-chevron-double-left"></i>
					</button>
					<span id="pageInfo" class="mx-2"></span>
					<button id="nextBtn" class="btn btn-sm btn-primary">
						<i class="bi bi-chevron-double-right"></i>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
<script
	src="${pageContext.request.contextPath}/js/preferences/branch.js"></script>