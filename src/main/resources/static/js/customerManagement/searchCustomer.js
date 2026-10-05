var allCustomers = []; // store full data

$(document).ready(function() {

	// 1️⃣ Load all customers once
	$.ajax({
		url: "api/customermanagement/getAllCustomer",
		type: "GET",
		success: function(data) {
			allCustomers = data;
			renderTable(allCustomers);
		},
		error: function() {
			alert("Failed to fetch customer data.");
		}
	});

	// 2️⃣ Filter on branch change
	$('#branchName').on('change', function() {
		filterCustomers();
	});

	// 3️⃣ Filter on customer name typing
	$('#customerName').on('keyup', function() {
		filterCustomers();
	});

});

// 🔍 Filtering Logic
function filterCustomers() {

    var selectedBranch = $('#branchName').val().toLowerCase();
    var searchName = $('#customerName').val().toLowerCase();

    var filteredData = allCustomers.filter(function(customer) {

        // Branch match
        var branchMatch = !selectedBranch ||
            (customer.branchName &&
             customer.branchName.toLowerCase().includes(selectedBranch));

        // 🔑 Full name build
        var fullName = [
            customer.firstName,
            customer.middleName,
            customer.lastName
        ].filter(Boolean).join(" ").toLowerCase();

        // Name match
        var nameMatch = !searchName || fullName.includes(searchName);

        return branchMatch && nameMatch;
    });

    renderTable(filteredData);
}


// 📋 Table Rendering
function renderTable(data) {

	var tbody = $("table tbody");
	tbody.empty();

	if (data.length === 0) {
		tbody.append("<tr><td colspan='9' class='text-center'>No Records Found</td></tr>");
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
			"<td>" + (customer.dob || '') + "</td>" +
			"<td>" + (customer.branchName || '').toUpperCase() + "</td>" +
			"<td>" + (customer.contactNo || '') + "</td>" +
			"<td>" + (customer.nomineeName || '').toUpperCase() + "</td>" +
			"<td>" + (customer.customerAddress || '').toUpperCase() + "</td>" +
			"</tr>";

		tbody.append(row);
	});
}
