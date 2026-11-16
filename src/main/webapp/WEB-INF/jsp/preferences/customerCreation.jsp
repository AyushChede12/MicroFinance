<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="pagetitle">
	<h1>PREFERENCES</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-gear text-blue"></i>
			</a></li>
			<li class="breadcrumb-item action">USER CREATION</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">USER INFORMATION</li>
				</ol>
			</nav>
			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="UserId">USER ID <span class="star">*</span></label>
						<input type="text" name="UserId" id="UserId" required="required"
							placeholder="ENTER USER ID" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="password">PASSWORD <span class="star">*</span></label>
						<input type="password" name="password" id="password" required="required"
							placeholder="ENTER PASSWORD" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="fullName">FULL NAME <span class="star">*</span></label>
						<input type="text" name="fullName" id="fullName" required="required"
							placeholder="ENTER FULL NAME" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="emailId">EMAIL ID <span class="star">*</span></label>
						<input type="text" name="emailId" id="emailId" required="required"
							placeholder="ENTER EMAIL ID" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields">
						<label for="contactNo">CONTACT NO <span class="star">*</span></label>
						<input type="text" name="contactNo" id="contactNo" required="required"
							placeholder="ENTER CONTACT NO" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="branchName">SIGN IN BRANCH <span class="star">*</span></label>
						<select id="branchName" name="branchName" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">-- SELECT BRANCH --</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px;">
						<label for="pastDate">PAST DATE <span class="star">*</span></label>
						<select id="pastDate" name="pastDate" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT</option>
							<option value="YES">YES</option>
							<option value="NO">NO</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="rePrint">RE PRINT <span class="star">*</span></label>
						<select id="rePrint" name="rePrint" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT</option>
							<option value="YES">YES</option>
							<option value="NO">NO</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields" style="margin-bottom: 30px">
						<label for="deleteAccess">DELETE ACCESS <span class="star">*</span></label>
						<select id="deleteAccess" name="deleteAccess" required="required"
							class="form-control selectField" style="height: 30px;">
							<option value="">SELECT</option>
							<option value="YES">YES</option>
							<option value="NO">NO</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="h-100 d-flex justify-content-start align-items-center">
						<div class="d-flex justify-content-start align-items-center formFields">
							<label style="margin-left: 20px;" class="mb-2">USER STATUS</label>
							<div class="cont">
								<div class="toggle">
									<input type="checkbox" id="toggle-user-status"
										class="toggle__input" data-toggle-type="user-status" checked="checked">
									<label for="toggle-user-status" class="toggle__label"></label>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="row w-100">
					<div class="col-12 text-center mt-4">
						<button id="saveBtn" class="btnStyle bg-warning" type="button">SAVE</button>
						<button id="updateBtn" type="button" class="btnStyle"
							style="background-color: #FFA500; display: none;">UPDATE</button>
					</div>
				</div>
			</div>

			<div class="mt-5">
				<nav>
					<ol class="breadcrumb breadcrumb-title">
						<li class="breadcrumb-item action">USER ACCESS</li>
					</ol>
				</nav>

				<div class="row mt-4">
					<div class="col-12">
						<div class="card recent-sales">
							<div class="card-body table-responsive">
								<h5 class="card-title">USER ACCESS VIEW</h5>
								<table class="table table-borderless datatable overflow-scroll" id="userTable">
									<thead class="table-light">
										<tr style="font-family: 'Poppins', sans-serif;">
											<th>#</th>
											<th>USER ID</th>
											<th>FULL NAME</th>
											<th>EMAIL ID</th>
											<th>CONTACT NUMBER</th>
											<th>SIGN IN BRANCH</th>
											<th>PAST DATE</th>
											<th>RE PRINT</th>
											<th>DELETE ACCESS</th>
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
			</div>
		</div>
	</form>
</div>

<script src="${pageContext.request.contextPath}/js/preferences/userCreation.js"></script>