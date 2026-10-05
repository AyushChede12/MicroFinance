
<style type="text/css">
.upload-container {
	display: flex;
	gap: 40px;
	justify-content: flex-start;
	margin-top: 20px;
}

.upload-box {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 180px;
	font-family: 'Poppins', sans-serif;
}

.upload-box label.title {
	font-size: 14px;
	font-weight: 600;
	margin-bottom: 10px;
}

.upload-preview {
	width: 150px;
	height: 150px;
	border: 2px dashed #ccc;
	border-radius: 12px;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f9f9f9;
	cursor: pointer;
}

.upload-preview img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>

<div class="pagetitle">
	<h1>JOINT LIABILITY LOAN</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"><i
					class="bi bi-person-bounding-box"></i></a></li>
			<li class="breadcrumb-item active">GROUP DIRECTORY</li>
		</ol>
	</nav>
</div>

<form id="groupdirectordform">
	<div class="row">
		<div class="col-12">
			<h4 style="font-size: 20px;">GROUP INFO</h4>
		</div>
		<div class="col-lg-3" style="display: none;">
			<div class="d-flex flex-column formFields">
				<label>ID*</label> <input type="text" id="id" name="id"
					class="form-control" required />
			</div>
		</div>
		<div class="col-lg-3" style="display: none;">
			<div class="d-flex flex-column formFields">
				<label>GROUP ID*</label> <input type="text" id="groupID"
					name="groupID" value="${memberCodeGD}" class="form-control"
					required />
			</div>
		</div>

		<div class="col-lg-3 ">
			<div class="d-flex flex-column formFields">
				<label>COMMUNITY NAME*</label> <input type="text" id="communityName"
					name="communityName" class="form-control" required
					placeholder="ENTER COMMUNITY NAME" />
			</div>
		</div>

		<div class="col-lg-3 ">
			<div class="d-flex flex-column formFields">
				<label>OPENING DATE*</label> <input type="date" id="openingDate"
					name="openingDate" class="form-control" required />
			</div>
		</div>


		<div class="col-lg-3 mb-4 ">
			<div class="d-flex flex-column formFields">
				<label for="">BRANCH NAME*</label> <select id="branchName"
					name="branchName" required="required"
					class="form-control selectField" style="height: 30px;">
					<option value="">SELECT BRANCH</option>
					<option>BRANCH A</option>
					<option>BRANCH B</option>
				</select>
			</div>
		</div>

		<!-- <div class="col-lg-3 ">
					<div class="d-flex flex-column formFields">
						<label></label> <input type="text"
							id="communityLeader" name="communityLeader" class="form-control"
							required placeholder="Enter Leader Name" />
					</div>
				</div> -->

		<div class="col-lg-3 mb-4 ">
			<div class="d-flex flex-column formFields">
				<label for="">COMMMUNITY LEADER*</label> <select id="communityLeader"
					name="communityLeader" required="required"
					class="form-control selectField" style="height: 30px;">
					<option value="">SELECT MEMBER</option>
				</select>
			</div>
		</div>


		<div class="col-lg-3 ">
			<div class="d-flex flex-column formFields">
				<label>CONTACT NO.*</label> <input type="text" id="contactNo"
					name="contactNo" class="form-control" required maxlength="10"
					placeholder="ENTER CONTACT NO" />
			</div>
		</div>

		<div class="col-lg-3 ">
			<div class="d-flex flex-column formFields">
				<label>COMMUNITY ADDRESS *</label> <input type="text"
					id="communityAddress" name="communityAddress" class="form-control"
					required placeholder="ENTER ADDRESS" />
			</div>
		</div>


		<div class="col-lg-3 mb-4 ">
			<div class="d-flex flex-column formFields">
				<label for="">ALLOCATED STAFF*</label> <select id="allocatedStaff"
					name="allocatedStaff" required="required"
					class="form-control selectField" style="height: 30px;">
					<option value="">SELECT STAFF</option>
					<option>STAFF A</option>
					<option>STAFF B</option>

				</select>
			</div>
		</div>

		<div class="col-lg-3 mb-4 ">
			<div class="d-flex flex-column formFields">
				<label for="">SCHEDULED COLLECTION DAYS *</label> <select
					id="collectionDay" name="collectionDay" required="required"
					class="form-control selectField" style="height: 30px;">
					<option value="">SELECT DAY</option>
					<option>MONDAY</option>
					<option>WEDNESDAY</option>

				</select>
			</div>
		</div>

		<div class="col-lg-3 mb-4 ">
			<div class="d-flex flex-column formFields">
				<label for="">SCHEDULED TIME*</label> <select id="collectionTime"
					name="collectionTime" required="required"
					class="form-control selectField" style="height: 30px;">
					<option value="">SELECT TIME</option>
					<option>10:00 AM</option>
					<option>02:00 PM</option>
				</select>
			</div>
		</div>



	</div>

	<div class="row mt-4">
		<div class="col-lg-3 mb-5">
			<label for=""
				style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">UPLOAD
				PHOTO <span class="star">*</span>
			</label> <label for="uploadPhoto" id="drop-area"> <input type="file"
				accept="image/*" name="uploadPhoto" id="uploadPhoto" hidden="hidden"
				onchange="photoUpload();"
				style="background-size: cover; background-repeat: no-repeat" />
				<div id="img-view">
					<img src="Uploads/upload.png" alt="upload_icon"
						id="photoPreview" /><input type="hidden" name="photoHidden"
						id="photoHidden">

				</div>
			</label> <small id="chkphoto" style="color: red;"></small>
		</div>

		<div class="col-lg-3 mb-5">
			<label for=""
				style="font-size: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-bottom: 5px;">UPLOAD
				SIGNATURE  <span class="star">*</span>
			</label> <label for="uploadSignature" id="drop-area"> <input
				type="file" accept="image/*" name="uploadSignature"
				id="uploadSignature" hidden="hidden" onchange="signatureUpload();"
				style="background-size: cover; background-repeat: no-repeat" />
				<div id="img-view">
					<img src="Uploads/upload.png" alt="upload_icon"
						id="signaturePreview" /><input type="hidden"
						name="signatureHidden" id="signatureHidden">

				</div>
			</label> <small id="chksignature" style="color: red;"></small>
		</div>


	</div>


	<hr class="mt-5" />
	<div class="col-12">
		<h4>GROUP MEMBER LINK</h4>
	</div>

	<div class="row">
		<div class="col-lg-3 mb-4 ">
			<div class="d-flex flex-column formFields">
				<label for="">SELECT MEMBER*</label> <select id="selectedMember"
					name="selectedMember" required="required"
					class="form-control selectField" style="height: 30px;">
					<option value="">SELECT MEMBER</option>
				</select>
			</div>
		</div>


		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label>CUSTOMER NAME*</label> <input type="text" id="customerName"
					name="customerName" class="form-control" required
					placeholder="ENTER MEMBER NAME" />
			</div>
		</div>

		<div class="col-lg-3">
			<div class="d-flex flex-column formFields">
				<label>REFERRAL DETAILS*</label> <input type="text"
					id="referralDetails" name="referralDetails" class="form-control"
					required placeholder="ENTER REFERRAL DETAILS" />
			</div>
		</div>

		<div class="col-lg-3 ">
			<div class="d-flex flex-column formFields">
				<label>CONTACT*</label> <input type="text" id="contact"
					name="contact" class="form-control" maxlength="10" required
					placeholder="ENTER MOBILE NUMBER" />
			</div>
		</div>



	</div>

	<div class="col-12 text-right">
		<button type="button" id="addque" class="btn btn-success mt-3">ADD
			QUE</button>
	</div>
	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">
				<div class="card-body table-responsive">
					<h5 class="card-title">DETAILS SEARCH LIST</h5>
					<table class="table table-bordered" id="tab1">
						<thead class="thead-light">
							<tr>
								<th>ID</th>
								<th>CUSTOMER NAME</th>
								<th>REFFERAL DEATILS</th>
								<th>CONTACT</th>
								<th>ACTION</th>
							</tr>
						</thead>
						<tbody>


						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>


	<div class="col-12 text-right">
		<button id="savegroupdirectory" type="button"
			class="btn btn-success mt-3">SAVE</button>
		<!-- <button id="updategroupdirectory" type="button"
						class="btn btn-success mt-3">Update</button> -->
		<button id="showGroupDirectory" type="button"
			class="btn btn-warning mt-3">SHOW TABLE</button>
	</div>


	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">
				<div class="card-body table-responsive">
					<h5 class="card-title">DETAILS SEARCH LIST</h5>
					<table class="table table-bordered" id="">
						<thead class="thead-light">
							<tr>
								<th>GROUP ID</th>
								<th>GROUP NAME</th>
								<th>OPENING DATE </th>
								<th>ASSIGNED BRANCH</th>
								<th>GROUP LEADER</th>
								<th>GL CONTACT NO</th>
								<th>COMMUNITY ADDRESS</th>
								<th>ALLOCATED STAFF</th>
								<th>COLLECTION DAY</th>
								<th>COLLECTION TIME</th>
								<th>GROUP MEMBERS ID'S</th>
								<th>GROUP MEMBERS NAME</th>
								<th>ACTIONS</th>
							</tr>
						</thead>
						<tbody id="groupDirectoryBody">


							<!-- More rows -->
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</form>

<script
	src="${pageContext.request.contextPath}/js/Joinlibiliy/GroupDirectory.js"></script>