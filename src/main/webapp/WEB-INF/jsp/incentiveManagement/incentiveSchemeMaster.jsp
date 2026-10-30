<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="pagetitle">
	<h1>INCENTIVE MANAGEMENT</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"><i class="bi bi-award"></i></a></li>
			<li class="breadcrumb-item action">INCENTIVE SCHEME MASTER</li>
		</ol>
	</nav>
</div>

<div>
	<form id="formid">
		<div>
			<nav>
				<ol class="breadcrumb breadcrumb-title">
					<li class="breadcrumb-item action">INCENTIVE MASTER</li>
				</ol>
			</nav>

			<input type="hidden" id="id" name="id" value="" />

			<div class="row">
				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="incentiveMonth">INCENTIVE MONTH</label>
						<select id="incentiveMonth" name="incentiveMonth" required="required" class="form-control selectField" style="height: 30px;">
							<option value="">SELECT INCENTIVE MONTH</option>
						</select>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="dateFrom">DATE FROM</label>
						<input type="date" name="dateFrom" id="dateFrom" required="required" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="dateTo">DATE TO</label>
						<input type="date" name="dateTo" id="dateTo" required="required" style="text-transform: uppercase;" />
					</div>
				</div>

				<div class="col-lg-3">
					<div class="d-flex flex-column formFields mb-4">
						<label for="comments">COMMENTS</label>
						<input type="text" name="comments" id="comments" required="required" placeholder="ENTER COMMENTS" style="text-transform: uppercase;" />
					</div>
				</div>
			</div>

			<div class="row mb-4">
				<div class="col-12 text-center">
					<button type="submit" id="saveBtn" class="btn btn-info">SAVE</button>
					<button type="button" id="updateBtn" class="btn btn-success" style="display: none;">UPDATE</button>
					<button type="button" id="resetBtn" class="btn btn-secondary">RESET</button>
				</div>
			</div>

			<div class="card recent-sales">
				<div class="card-body table-responsive">
					<h5 class="card-title">INCENTIVE SCHEME LIST <span>| TABLE VIEW</span></h5>
					<table class="table table-bordered table-striped" style="margin-top: 15px;">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">S/N</th>
								<th scope="col">INCENTIVE MONTH</th>
								<th scope="col">DATE FROM</th>
								<th scope="col">DATE TO</th>
								<th scope="col">COMMENTS</th>
								<th scope="col" class="text-center">ACTIONS</th>
							</tr>
						</thead>
						<tbody id="incentiveTableBody">
							<tr><td colspan="6" class="text-center">LOADING INCENTIVES...</td></tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</form>
</div>

<script src="${pageContext.request.contextPath}/js/incentive/incentiveSchemeMaster.js?v=<%=System.currentTimeMillis()%>"></script>
