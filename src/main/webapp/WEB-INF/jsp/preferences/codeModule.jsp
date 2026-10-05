
<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: "Dosis", sans-serif;
	font-weight: 600;
}

body {
	background: url();
}

#head-logo {
	padding: 14px 16px;
}

#container {
	width: 96vw;
	margin: auto;
	font-size: 14px;
	background: transparent;
	box-shadow: 2px 4px 20px grey;
	border-radius: 7px;
}

table {
	background: transparent;
}

.text-left {
	text-align: left;
}

td {
	flex-grow: 1;
	font-weight: 500;
	font-size: 14px;
}

.ip-center {
	width: 12vw;
}

button {
	padding: 2px 6px;
	background-color: coral;
	border: none;
	font-weight: 500;
	border-radius: 3px;
}

.row {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
}

.row>* {
	flex: 1 1 150px;
	min-width: 120px;
}

/* Responsive CSS */
@media ( max-width : 768px) {
	table, thead, tbody, th, td, tr {
		display: block;
		width: 100%;
	}
	thead {
		display: none;
	}
	tr {
		margin-bottom: 20px;
		border: 1px solid #ccc;
		padding: 10px;
		border-radius: 8px;
		background-color: #f9f9f9;
	}
	td {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		border: none;
		border-bottom: 1px solid #eee;
		position: relative;
	}
	td::before {
		content: attr(data-label);
		font-weight: bold;
		flex: 1;
		color: #333;
		padding-right: 10px;
	}
	td input, td button {
		flex: 2;
		width: 100%;
	}
	td input[type="checkbox"] {
		flex: none;
		width: auto;
		transform: scale(1.2);
		margin-left: auto;
	}
}
</style>

<div class="pagetitle">
	<h1>CODE MODULE</h1>
</div>

<div>
	<div class="row mt-5">
		<div class="col-12">
			<div class="card recent-sales">

				<div class="card-body table-responsive">


					<table class="table table-borderless datatable overflow-scroll">

						<thead class="table-light">
							<tr style="font-family: 'Poppins', sans-serif;">
								<div class="row"></div>
								<th class="text-left">NAME</th>
								<th class="text-left">BRANCH PREFIX</th>
								<th>CODE PREFIX</th>
								<th>NO. OF DIGIT</th>
								<th>LAST NO (ID).</th>
								<th>PREVIEW</th>
								<th>ACTION</th>
							</tr>
						</thead>
						<tbody>
							<tr style="font-family: 'Poppins', sans-serif;" data-id="1">
								<td data-label="Name Customer" class="label-text">CUSTOMER
									CODE</td>
								<td data-label="Branch Prefix Customer"><input
									type="checkbox"></td>
								<td data-label="Code Prefix Customer"><input
									class="ip-center" type="text" value="CC"></td>
								<td data-label="No.of Digit Customer"><input
									class="ip-center" type="number" value="5"></td>
								<td data-label="Last No Customer"><input class="ip-center"
									type="number" value="1"></td>
								<td data-label="Preview Customer"><input class="ip-center"
									type="text"></td>
								<td data-label="Action"><button class="btn btn-success"
										id="saveCustomerCode">SAVE</button></td>
							</tr>
							<tr style="font-family: 'Poppins', sans-serif;" data-id="2">
								<td data-label="Name Financial">FINANCIAL CODE</td>
								<td data-label="Branch Prefix Financial"><input
									type="checkbox"></td>
								<td data-label="Code Prefix Financial"><input
									class="ip-center" type="text" value="FC"></td>
								<td data-label="No.of Digit Financial"><input
									class="ip-center" type="number" value="6"></td>
								<td data-label="Last No Financial"><input class="ip-center"
									type="number" value="1"></td>
								<td data-label="Preview Financial"><input class="ip-center"
									type="text"></td>
								<td data-label="Action"><button class="btn btn-success"
										id="saveFinancialCode">Save</button></td>
							</tr>
							<tr style="font-family: 'Poppins', sans-serif;" data-id="3">
								<td data-label="Name Team">TEAM MEMBER CODE</td>
								<td data-label="Branch Prefix Team"><input type="checkbox"></td>
								<td data-label="Code Prefix Team"><input class="ip-center"
									type="text" value="TM"></td>
								<td data-label="No.of Digit Team"><input class="ip-center"
									type="number" value="5"></td>
								<td data-label="Last No Team"><input class="ip-center"
									type="number" value="1"></td>
								<td data-label="Preview Team"><input class="ip-center"
									type="text" value="TM00001"></td>
								<td data-label="Action"><button class="btn btn-success"
										id="saveTeamMemberCode">SAVE</button></td>
							</tr>
							<!-- <tr style="font-family: 'Poppins', sans-serif;" data-id="4">
										<td data-label="Name RD">RD Policy No.</td>
										<td data-label="Branch Prefix RD"><input type="checkbox"></td>
										<td data-label="Code Prefix RD"><input class="ip-center"
											type="text" value="RD"></td>
										<td data-label="No.of Digit RD"><input class="ip-center"
											type="number" value="7"></td>
										<td data-label="Last No RD"><input class="ip-center"
											type="number" value="1"></td>
										<td data-label="Preview RD"><input class="ip-center"
											type="text" value="RD0000001"></td>
										<td data-label="Action"><button class="btn btn-success"
												id="saveRDPolicyNo">Save</button></td>
									</tr>
									<tr style="font-family: 'Poppins', sans-serif;" data-id="5">
										<td data-label="Name FD">FD Policy No.</td>
										<td data-label="Branch Prefix FD"><input type="checkbox"></td>
										<td data-label="Code Prefix FD"><input class="ip-center"
											type="text" value="FD"></td>
										<td data-label="No.of Digit FD"><input class="ip-center"
											type="number" value="7"></td>
										<td data-label="Last No FD"><input class="ip-center"
											type="number" value="1"></td>
										<td data-label="Preview FD"><input class="ip-center"
											type="text" value="FD0000001"></td>
										<td data-label="Action"><button class="btn btn-success"
												id="saveFDPolicyNo">Save</button></td>
									</tr>
									<tr style="font-family: 'Poppins', sans-serif;" data-id="6">
										<td data-label="Name DD">Daily Policy No.</td>
										<td data-label="Branch Prefix DD"><input type="checkbox"></td>
										<td data-label="Code Prefix DD"><input class="ip-center"
											type="text" value="DD"></td>
										<td data-label="No.of Digit DD"><input class="ip-center"
											type="number" value="7"></td>
										<td data-label="Last No DD"><input class="ip-center"
											type="number" value="1"></td>
										<td data-label="Preview DD"><input class="ip-center"
											type="text" value="DD0000001"></td>
										<td data-label="Action"><button class="btn btn-success"
												id="saveDDPolicyNo">Save</button></td>
									</tr>
									<tr style="font-family: 'Poppins', sans-serif;" data-id="7">
										<td data-label="Name MIS">MIS Policy No.</td>
										<td data-label="Branch Prefix MIS"><input type="checkbox"></td>
										<td data-label="Code Prefix MIS"><input class="ip-center"
											type="text" value="MIS"></td>
										<td data-label="No. of Digit MIS"><input
											class="ip-center" type="number" value="7"></td>
										<td data-label="Last No MIS"><input class="ip-center"
											type="number" value="1"></td>
										<td data-label="Preview MIS"><input class="ip-center"
											type="text" value="MIS0000001"></td>
										<td data-label="Action"><button class="btn btn-success"
												id="saveMISPolicyNo">Save</button></td>
									</tr> -->
							<tr style="font-family: 'Poppins', sans-serif;" data-id="8">
								<td data-label="Name ACC">SAVING ACCOUNT NO.</td>
								<td data-label="Branch Prefix ACC"><input type="checkbox"></td>
								<td data-label="Code Prefix ACC"><input class="ip-center"
									type="text" value="2025" readonly="readonly"></td>
								<td data-label="No. of Digit ACC"><input class="ip-center"
									type="number" value="12"></td>
								<td data-label="Last No ACC"><input class="ip-center"
									type="number" value="1"></td>
								<td data-label="Preview ACC"><input class="ip-center"
									type="text" value="202500000001"></td>
								<td data-label="Action"><button class="btn btn-success"
										id="saveSavingACCNo">SAVE</button></td>
							</tr>
							<tr style="font-family: 'Poppins', sans-serif;" data-id="9">
								<td data-label="Name LOAN">LOAN ID</td>
								<td data-label="Branch Prefix LOAN"><input type="checkbox"></td>
								<td data-label="Code Prefix LOAN"><input class="ip-center"
									type="text" value="LP" readonly="readonly"></td>
								<td data-label="No. of Digit LOAN"><input class="ip-center"
									type="number" value="4"></td>
								<td data-label="Last No LOAN"><input class="ip-center"
									type="number" value="1"></td>
								<td data-label="Preview LOAN"><input class="ip-center"
									type="text" value="LP0001"></td>
								<td data-label="Action"><button class="btn btn-success"
										id="saveLoanID">SAVE</button></td>
							</tr>
							<tr style="font-family: 'Poppins', sans-serif;" data-id="10">
								<td data-label="Name GROUP">GROUP CODE</td>
								<td data-label="Branch Prefix GROUP"><input type="checkbox"></td>
								<td data-label="Code Prefix GROUP"><input class="ip-center"
									type="text" value="GD" readonly="readonly"></td>
								<td data-label="No. of Digit GROUP"><input
									class="ip-center" type="number" value="5"></td>
								<td data-label="Last No GROUP"><input class="ip-center"
									type="number" value="1"></td>
								<td data-label="Preview GROUP"><input class="ip-center"
									type="text" value="GD00001"></td>
								<td data-label="Action"><button class="btn btn-success"
										id="saveGroupCode">SAVE</button></td>
							</tr>



						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

</div>
<script
	src="${pageContext.request.contextPath}/js/preferences/codeModule.js"></script>