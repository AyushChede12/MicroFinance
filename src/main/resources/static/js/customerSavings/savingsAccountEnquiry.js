/****************************************************
 * DROPDOWNS
 ****************************************************/

// ACCOUNT NUMBER DROPDOWN
function AccNoDropdown() {
	$.ajax({
		url: "api/customersavings/getAllSavingAccountData",
		type: "GET",
		success: function(response) {
			const dropdown = $('#accountNumber');
			dropdown.empty().append('<option value="">--SELECT ACCOUNT NO--</option>');

			if (response.status === "FOUND" && response.data) {
				response.data.forEach(item => {
					dropdown.append(
						`<option value="${item.accountNumber}">${item.accountNumber}</option>`
					);
				});
			}
		},
		error: function() {
			alert("FAILED TO FETCH ACCOUNT NUMBERS.");
		}
	});
}

// SCHEME NAME DROPDOWN
function schemeNameDropdown() {
	$.ajax({
		url: "api/customersavings/fetchsavingchemecatalog",
		type: "GET",
		success: function(response) {
			const dropdown = $('#schemename');
			dropdown.empty().append('<option value="">--SELECT PLAN NAME--</option>');

			if (response.status === "FOUND" && response.data) {
				response.data.forEach(item => {
					dropdown.append(`<option value="${item}">${item}</option>`);
				});
			}
		},
		error: function() {
			alert("FAILED TO FETCH SCHEME NAME.");
		}
	});
}

/****************************************************
 * DATA FETCH (ONCE)
 ****************************************************/
let allSavingAccData = [];

function loadAllSavingAccounts() {
	$.ajax({
		type: "GET",
		url: "api/customersavings/getAllSavingAccountData",
		success: function(response) {

			if (!response.data || response.data.length === 0) {
				$("#tableSavingAcc").html(
					"<tr><td colspan='14' class='text-center'>NO RECORDS FOUND</td></tr>"
				);
				return;
			}

			allSavingAccData = response.data;
			renderTable(allSavingAccData); // ✅ SHOW ALL DATA FIRST
		},
		error: function() {
			alert("FAILED TO LOAD SAVING ACCOUNT DATA.");
		}
	});
}


/****************************************************
 * COMBINED FILTER LOGIC
 ****************************************************/

function applyAllFilters() {

	if (allSavingAccData.length === 0) return;

	const branch = $("#branchName").val();
	const fromDate = $("#fromDate").val(); // YYYY-MM-DD
	const toDate = $("#toDate").val();     // YYYY-MM-DD
	const customerName = $("#customerName").val().toLowerCase();
	const accountNo = $("#accountNumber").val();
	const customerCode = $("#customerCode").val().toLowerCase();
	const financialCode = $("#financialConsultantCode").val().toLowerCase();
	const planName = $("#schemename").val();

	const filteredData = allSavingAccData.filter(item => {
		let branch = "";

		if (item.branchName != null) {
			branch = item.branchName.branchName || "";
		}

		// BRANCH
		if (branch && branch?.toLowerCase() !== branch.toLowerCase()) return false;

		// OPENING DATE (STRING COMPARE)
		if (fromDate || toDate) {
			const openDateStr = toYMD(item.openingDate);

			if (fromDate && openDateStr < fromDate) return false;
			if (toDate && openDateStr > toDate) return false;
		}

		// CUSTOMER NAME
		if (customerName && !item.enterCustomerName.toLowerCase().includes(customerName))
			return false;

		// ACCOUNT NO
		if (accountNo && item.accountNumber !== accountNo)
			return false;

		// CUSTOMER CODE
		if (customerCode && !item.selectByCustomer.toLowerCase().includes(customerCode))
			return false;

		// FINANCIAL CONSULTANT CODE
		if (financialCode && !item.financialConsultantCode.toLowerCase().includes(financialCode))
			return false;

		// SCHEME / PLAN
		if (planName && item.selectPlan !== planName)
			return false;

		return true; // SAB CONDITIONS MATCH
	});

	renderTable(filteredData);
}


/****************************************************
 * INPUT EVENTS (NO BUTTON)
 ****************************************************/

$("#branchName").on("change", applyAllFilters);
$("#fromDate").on("input", applyAllFilters);
$("#toDate").on("input", applyAllFilters);
$("#customerName").on("input", applyAllFilters);
$("#accountNumber").on("change", applyAllFilters);
$("#customerCode").on("input", applyAllFilters);
$("#financialConsultantCode").on("input", applyAllFilters);
$("#schemename").on("change", applyAllFilters);

/****************************************************
 * TABLE RENDER
 ****************************************************/

function renderTable(data) {
	if (data.length === 0) {
		$("#tableSavingAcc").html(
			"<tr><td colspan='14' class='text-center'>NO MATCHING RECORDS</td></tr>"
		);
		return;
	}

	let i = 1;
	const rows = data.map(item => {
		let branch = "";

		if (item.branchName != null) {
			branch = item.branchName.branchName || "";
		}

		const approvalStatus = item.approved
			? '<span class="badge bg-success">APPROVED</span>'
			: '<span class="badge bg-danger">NOT APPROVED</span>';

		return `
			<tr>
				<td>${i++}</td>
				<td>${item.accountNumber}</td>
				<td>${item.typeofaccount.toUpperCase()}</td>
				<td>${item.selectByCustomer.toUpperCase()}</td>
				<td>${item.enterCustomerName.toUpperCase()}</td>
				<td>${item.contactNumber}</td>
				<td>${branch.toUpperCase()}</td>
				<td>${item.address.toUpperCase()}</td>
				<td>${item.district.toUpperCase()}</td>
				<td>${item.state.toUpperCase()}</td>
				<td>${item.openingDate}</td>
				<td>${item.financialConsultantCode}</td>
				<td>${item.selectPlan.toUpperCase()}</td>
				<td>${approvalStatus}</td>
			</tr>
		`;
	}).join("");

	$("#tableSavingAcc").html(rows);
}

function toYMD(dateStr) {
	if (!dateStr) return "";

	// ALREADY YYYY-MM-DD
	if (dateStr.includes("-") && dateStr.length === 10) {
		return dateStr;
	}

	// DD/MM/YYYY → YYYY-MM-DD
	const parts = dateStr.split("/");
	if (parts.length === 3) {
		return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
	}

	return "";
}