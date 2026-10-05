
<style>
.cheque-thumb {
	width: 60px;
	height: 40px;
	object-fit: cover;
	border-radius: 5px;
	cursor: pointer;
	transition: transform 0.2s ease;
	border: 1px solid #ddd;
}

.cheque-thumb:hover {
	transform: scale(1.08);
	border-color: #999;
}

.modal {
	display: none;
	position: fixed;
	z-index: 10000;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	justify-content: center;
	align-items: center;
}

.modal-content {
	position: relative;
	text-align: center;
}

.modal-content img {
	max-width: 90%;
	max-height: 80vh;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.close {
	position: absolute;
	top: -30px;
	right: 10px;
	color: white;
	font-size: 30px;
	cursor: pointer;
}
</style>

<div class="pagetitle">
	<h1>PREFERENCES</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-gear"></i>
			</a></li>
			<li class="breadcrumb-item action">BANK MODULE</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">BANK DETAILS</li>
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
						<label for="">BANK NAME <span class="star">*</span></label> <input
							type="text" name="bankName" id="bankName" required="required"
							placeholder="ENTER BANK NAME" style="text-transform: uppercase;" />
						<small id="chkbankname" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>ACCOUNT NO <span class="star">*</span></label> <input
							type="text" name="accountNo" id="accountNo" required="required"
							placeholder="ENTER ACCOUNT NO" /> <small id="chkaccountno"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>IFSC CODE <span class="star">*</span></label> <input
							type="text" name="ifscCode" id="ifscCode" required="required"
							placeholder="ENTER IFSC CODE" style="text-transform: uppercase;" />
						<small id="chkifsccode" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>MICR CODE <span class="star">*</span></label> <input
							type="text" name="micrCode" id="micrCode" required="required"
							placeholder="ENTER MICR CODE" style="text-transform: uppercase;" />
						<small id="chkmicrcode" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>CONTACT NO <span class="star">*</span></label> <input
							type="text" name="contactNo" id="contactNo" required="required"
							placeholder="ENTER CONTACT NO" style="text-transform: uppercase;" />
						<small id="chkcontactno" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>ACCOUNT OPENING DATE <span class="star">*</span></label> <input
							type="date" name="openingDate" id="openingDate"
							required="required" style="text-transform: uppercase;" /> <small
							id="chkopeningdate" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>OPENING BALANCE <span class="star">*</span></label> <input
							type="text" name="openingBalance" id="openingBalance"
							required="required" placeholder="ENTER OPENING BALANCE" /> <small
							id="chkopeningbalance" style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>ACCOUNT CLOSING DATE <span class="star">*</span></label> <input
							type="date" name="closingDate" id="closingDate"
							required="required" /> <small id="chkclosingdate"
							style="color: red;"></small>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields"
						style="margin-bottom: 30px">
						<label>ADDRESS <span class="star">*</span></label>
						<textarea name="address" id="address"
							style="border: 1px solid rgb(224, 224, 224); border-radius: 5px; outline: none; padding: 5px; font-size: 12px; text-transform: uppercase;"></textarea>
						<small id="chkaddress" style="color: red;"></small>
					</div>
				</div>


			</div>

			<div class="mt-4">
				<div class="col-lg-3 mb-5">
					<label for=""
						style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">CANCELLED
						CHEQUE <span class="star">*</span>
					</label> <label for="cancelledCheque" id="drop-area"> <input
						type="file" accept="image/*" name="cancelledCheque"
						id="cancelledCheque" hidden="hidden" onchange="photoUpload();"
						style="background-size: cover; background-repeat: no-repeat" />
						<div id="img-view">
							<img src="Uploads/upload.png" alt="upload_icon"
								id="photoPreview" /><input type="hidden" name="photoHidden"
								id="photoHidden">

							<!-- <p id="upload-text"
                    style="font-size: 12px; margin-top: 15px"
                    class="text-muted"
                  >
                    Drag and drop or Choose File to upload the image
                  </p> -->
						</div>
					</label> <small id="chkphoto" style="color: red;"></small>
				</div>
			</div>

			<div class="row" style="margin-top: 30px;">
				<div class="col-12 text-center">
					<button type="button" id="showBtn" class="btnStyle bg-primary"
						onclick="showTableData()">SHOW</button>
					<button type="button" id="saveBtn" class="btnStyle bg-warning">SAVE</button>
					<button type="button" id="hideBtn" class="btnStyle bg-success"
						onclick="hideTableData()">HIDE</button>
					<button type="button" id="updateBtn" class="btnStyle bg-success"
						onclick="updateBank()">UPDATE</button>
				</div>
			</div>
		</div>


	</form>

	<div class="mt-5">
		<div class="row mt-5">
			<div class="col-12">
				<div class="card recent-sales">

					<div class="card-body table-responsive">
						<h5 class="card-title">
							BANK DATA <span>| TABLE VIEW</span>
						</h5>

						<table
							class="table table-bordered table-hover text-nowrap datatable"
							id="tableBody" style="text-align: center;">
							<thead class="table-light">
								<tr
									style="font-family: 'Poppins', sans-serif; white-space: nowrap;">
									<th scope="col">SR NO</th>
									<th scope="col">BANK NAME</th>
									<th scope="col">ACCOUNT NO</th>
									<th scope="col">IFSC CODE</th>
									<th scope="col">MICR CODE</th>
									<th scope="col">CONTACT NO</th>
									<th scope="col">ADDRESS</th>
									<th scope="col">OPENING DATE</th>
									<th scope="col">OPENING BALANCE</th>
									<th scope="col">ACCOUNT CLOSING DATE</th>
									<th scope="col">CHEQUE</th>
									<th scope="col">EDIT</th>
									<th scope="col">DELETE</th>
								</tr>
							</thead>
							<tbody id="tableBody">
								<!-- Data rows dynamically -->
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
	</div>
	<div id="imagePreviewModal" class="modal" style="display: none;">
		<div class="modal-content">
			<span class="close" onclick="closeChequePreview()">&times;</span> <img
				id="modalChequeImage" src="" alt="Cheque Preview">
		</div>
	</div>


</div>


<script src="${pageContext.request.contextPath}/js/preferences/bank.js"></script>
