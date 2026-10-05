
<div class="pagetitle">
	<h1>CUSTOMER SHAREHOLDING</h1>
	<nav>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a href="openDashboard"> <i
					class="bi bi-building-fill-down"></i>
			</a></li>
			<li class="breadcrumb-item action">REGENERATE DNO/li>
		</ol>
	</nav>
</div>
<div>
	<nav>
		<ol class="breadcrumb breadcrumb-title">
			<li class="breadcrumb-item action">SEARCH BOX</li>
		</ol>
	</nav>
	<div class="row">
		<div class="col-lg-6">
			<div class="d-flex flex-column formFields">
				<label for="">SELECT DECISION MAKER :</label> <select
					id="selectDecisionMaker" name="selectDecisionMaker"
					required="required" class="form-control selectField mb-4"
					style="height: 30px;">
					<option value="">SELECT Colour</option>
					<option value="Blue">Blue</option>
				</select>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-3">
			<button id="saveBtn" class="btnStyle"
				style="background-color: #FFA500;">
				<i class="bi bi-search"></i> SEARCH
			</button>
		</div>
	</div>

	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">
				<div class="card-body table-responsive">
					<div class="d-flex justify-content-between align-items-center">
						<h5 class="card-title">
							SEARCH RESULT <span>|SHARE DATA LIST</span>
						</h5>
					</div>
					<table class="table table-borderless datatable overflow-scroll">
						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<th scope="col">SR.NO</th>
								<th scope="col">M.NAME</th>
								<th scope="col">Share DATE</th>
								<th scope="col">NO. OF SHARE</th>
								<th scope="col">SHARE AMT</th>


							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
			<button type="button" class="btn btn-warning" id="printbtn"
				style="float: right;">PRINT</button>
		</div>
	</div>
</div>
<script
	src="${pageContext.request.contextPath}/js/CustomerShareHolding/regenerateDNO.js"></script>