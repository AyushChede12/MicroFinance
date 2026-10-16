var allCustomers = []; // STORE FULL CUSTOMER DATA

$(document).ready(function() {

	// 1. LOAD ALL CUSTOMERS ONCE
	$.ajax({
		url: "api/customermanagement/getAllCustomer",
		type: "GET",

		success: function(data) {

			allCustomers = data;

			// EXTRACT CUSTOMER ARRAY
			var customers = getCustomerArray(allCustomers);

			// DISPLAY ALL CUSTOMERS
			renderTable(customers);
		},

		error: function() {
			alert("FAILED TO FETCH CUSTOMER DATA.");
		}
	});

	// 2. FILTER ON BRANCH CHANGE
	$("#branchName").on("change", function() {
		filterCustomers();
	});

	// 3. FILTER ON CUSTOMER NAME TYPING
	$("#customerName").on("input", function() {
		filterCustomers();
	});

});


// 4. EXTRACT CUSTOMER ARRAY FROM API RESPONSE
function getCustomerArray(response) {

	if (Array.isArray(response)) {
		return response;
	}

	if (response && Array.isArray(response.data)) {
		return response.data;
	}

	if (response && response.data &&
		Array.isArray(response.data.content)) {
		return response.data.content;
	}

	if (response && Array.isArray(response.content)) {
		return response.content;
	}

	console.error("INVALID CUSTOMER DATA:", response);

	return [];
}


// 5. FILTER CUSTOMERS
function filterCustomers() {

	var customers = getCustomerArray(allCustomers);

	var selectedBranch = String($("#branchName").val() || "")
		.trim()
		.toLowerCase();

	var searchName = String($("#customerName").val() || "")
		.trim()
		.toLowerCase();

	// FILTER CUSTOMER RECORDS
	var filteredData = customers.filter(function(customer) {

		if (!customer) {
			return false;
		}

		// BRANCH MATCH
		var branch = String(customer.branchName || "")
			.trim()
			.toLowerCase();

		var branchMatch = !selectedBranch ||
			branch === selectedBranch;

		// BUILD FULL CUSTOMER NAME
		var fullName = [
			customer.firstName,
			customer.middleName,
			customer.lastName
		]
			.filter(function(name) {
				return name !== null &&
					name !== undefined &&
					String(name).trim() !== "";
			})
			.map(function(name) {
				return String(name).trim();
			})
			.join(" ")
			.toLowerCase();

		// FALLBACK IF API RETURNS customerName
		if (!fullName) {
			fullName = String(customer.customerName || "")
				.trim()
				.toLowerCase();
		}

		// CUSTOMER NAME MATCH
		var nameMatch = !searchName ||
			fullName.includes(searchName);

		// BOTH FILTERS MUST MATCH
		return branchMatch && nameMatch;

	});

	// DISPLAY FILTERED CUSTOMERS
	renderTable(filteredData);
}


// 6. TABLE RENDERING
function renderTable(data) {

	var tbody = $("table tbody");

	tbody.empty();

	// NO RECORDS FOUND
	if (!Array.isArray(data) || data.length === 0) {

		tbody.append(
			"<tr>" +
			"<td colspan='9' class='text-center'>" +
			"NO RECORDS FOUND" +
			"</td>" +
			"</tr>"
		);

		return;
	}

	// DISPLAY CUSTOMER ROWS
	$.each(data, function(i, customer) {

		// BUILD FULL CUSTOMER NAME
		var fullName = [
			customer.firstName,
			customer.middleName,
			customer.lastName
		]
			.filter(function(name) {
				return name !== null &&
					name !== undefined &&
					String(name).trim() !== "";
			})
			.map(function(name) {
				return String(name).trim();
			})
			.join(" ");

		// FALLBACK CUSTOMER NAME
		if (!fullName) {
			fullName = customer.customerName || "";
		}

		// CONVERT ALL DISPLAY VALUES TO UPPERCASE
		var memberCode = String(customer.memberCode || "")
			.toUpperCase();

		fullName = String(fullName).toUpperCase();

		var gender = String(customer.customerGender || "")
			.toUpperCase();

		var dob = String(customer.dob || "")
			.toUpperCase();

		var branchName = String(customer.branchName || "")
			.toUpperCase();

		var contactNo = String(customer.contactNo || "")
			.toUpperCase();

		var nomineeName = String(customer.nomineeName || "")
			.toUpperCase();

		var address = String(customer.customerAddress || "")
			.toUpperCase();

		// CREATE TABLE ROW
		var row = $("<tr>");

		row.append($("<td>").text(i + 1));
		row.append($("<td>").text(memberCode));
		row.append($("<td>").text(fullName));
		row.append($("<td>").text(gender));
		row.append($("<td>").text(dob));
		row.append($("<td>").text(branchName));
		row.append($("<td>").text(contactNo));
		row.append($("<td>").text(nomineeName));
		row.append($("<td>").text(address));

		// APPEND ROW TO TABLE
		tbody.append(row);

	});

}