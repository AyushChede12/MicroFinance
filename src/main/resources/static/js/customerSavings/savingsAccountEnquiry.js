/*******************************
 * DROPDOWNS
 *******************************/

// Account Number Dropdown
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
			alert("Failed to fetch Account Numbers.");
		}
	});
}

// Scheme Name Dropdown
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
			alert("Failed to fetch Scheme Name.");
		}
	});
}

/*******************************
 * DATA FETCH (ONCE)
 *******************************/
let allSavingAccData = [];

function loadAllSavingAccounts() {
	$.ajax({
		type: "GET",
		url: "api/customersavings/getAllSavingAccountData",
		success: function(response) {

			if (!response.data || response.data.length === 0) {
				$("#tableSavingAcc").html(
					"<tr><td colspan='14' class='text-center'>No Records Found</td></tr>"
				);
				return;
			}

			allSavingAccData = response.data;
			renderTable(allSavingAccData); // ✅ SHOW ALL DATA FIRST
		},
		error: function() {
			alert("Failed to load Saving Account Data.");
		}
	});
}


/*******************************
 * COMBINED FILTER LOGIC
 *******************************/

function applyAllFilters() {

	if (allSavingAccData.length === 0) return;

	const branch = $("#branchName").val();
	const fromDate = $("#fromDate").val(); // yyyy-MM-dd
	const toDate = $("#toDate").val();     // yyyy-MM-dd
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

		// Branch
		if (branch && branch?.toLowerCase() !== branch.toLowerCase()) return false;

		// Opening Date (STRING compare)
		if (fromDate || toDate) {
			const openDateStr = toYMD(item.openingDate);

			if (fromDate && openDateStr < fromDate) return false;
			if (toDate && openDateStr > toDate) return false;
		}

		// Customer Name
		if (customerName && !item.enterCustomerName.toLowerCase().includes(customerName))
			return false;

		// Account No
		if (accountNo && item.accountNumber !== accountNo)
			return false;

		// Customer Code
		if (customerCode && !item.selectByCustomer.toLowerCase().includes(customerCode))
			return false;

		// Financial Consultant Code
		if (financialCode && !item.financialConsultantCode.toLowerCase().includes(financialCode))
			return false;

		// Scheme / Plan
		if (planName && item.selectPlan !== planName)
			return false;

		return true; // sab conditions match
	});

	renderTable(filteredData);
}



/*******************************
 * INPUT EVENTS (NO BUTTON)
 *******************************/

$("#branchName").on("change", applyAllFilters);
$("#fromDate").on("input", applyAllFilters);
$("#toDate").on("input", applyAllFilters);
$("#customerName").on("input", applyAllFilters);
$("#accountNumber").on("change", applyAllFilters);
$("#customerCode").on("input", applyAllFilters);
$("#financialConsultantCode").on("input", applyAllFilters);
$("#schemename").on("change", applyAllFilters);

/*******************************
 * TABLE RENDER
 *******************************/

function renderTable(data) {
	if (data.length === 0) {
		$("#tableSavingAcc").html(
			"<tr><td colspan='14' class='text-center'>No Matching Records</td></tr>"
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
			? '<span class="badge bg-success">Approved</span>'
			: '<span class="badge bg-danger">Not Approved</span>';

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

	// already yyyy-MM-dd
	if (dateStr.includes("-") && dateStr.length === 10) {
		return dateStr;
	}

	// dd/MM/yyyy → yyyy-MM-dd
	const parts = dateStr.split("/");
	if (parts.length === 3) {
		return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
	}

	return "";
}
