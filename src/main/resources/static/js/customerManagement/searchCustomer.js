var allCustomers = []; // STORE FULL DATA

$(document).ready(function() {

	// 1️⃣ LOAD ALL CUSTOMERS ONCE
	$.ajax({
		url: "api/customermanagement/getAllCustomer",
		type: "GET",
		success: function(data) {
			allCustomers = data;
			renderTable(allCustomers);
		},
		error: function() {
			alert("FAILED TO FETCH CUSTOMER DATA.");
		}
	});

	// 2️⃣ FILTER ON BRANCH CHANGE
	$('#branchName').on('change', function() {
		filterCustomers();
	});

	// 3️⃣ FILTER ON CUSTOMER NAME TYPING
	$('#customerName').on('keyup', function() {
		filterCustomers();
	});

});

// 🔍 FILTERING LOGIC
function filterCustomers() {

	var selectedBranch = $('#branchName').val().toLowerCase();
	var searchName = $('#customerName').val().toLowerCase();

	var filteredData = allCustomers.filter(function(customer) {

		// BRANCH MATCH
		var branchMatch = !selectedBranch ||
			(customer.branchName &&
				customer.branchName.toLowerCase().includes(selectedBranch));

		// 🔑 FULL NAME BUILD
		var fullName = [
			customer.firstName,
			customer.middleName,
			customer.lastName
		].filter(Boolean).join(" ").toLowerCase();

		// NAME MATCH
		var nameMatch = !searchName || fullName.includes(searchName);

		return branchMatch && nameMatch;
	});

	renderTable(filteredData);
}


// 📋 TABLE RENDERING
function renderTable(data) {

	var tbody = $("table tbody");
	tbody.empty();

	if (data.length === 0) {
		tbody.append("<tr><td colspan='9' class='text-center'>NO RECORDS FOUND</td></tr>");
		return;
	}

	$.each(data, function(i, customer) {
		let fullName = [
			customer.firstName,
			customer.middleName,
			customer.lastName
		].filter(Boolean).join(" ");

		var row = "<tr>" +
			"<td>" + (i + 1) + "</td>" +
			"<td>" + (customer.memberCode || '').toUpperCase() + "</td>" +
			"<td>" + (fullName || '').toUpperCase() + "</td>" +
			"<td>" + (customer.customerGender || '').toUpperCase() + "</td>" +
			"<td>" + (customer.dob || '').toUpperCase() + "</td>" +
			"<td>" + (customer.branchName || '').toUpperCase() + "</td>" +
			"<td>" + (customer.contactNo || '').toUpperCase() + "</td>" +
			"<td>" + (customer.nomineeName || '').toUpperCase() + "</td>" +
			"<td>" + (customer.customerAddress || '').toUpperCase() + "</td>" +
			"</tr>";

		tbody.append(row);
	});
}