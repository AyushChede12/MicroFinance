//anjali (AddCustmer Count)
$(document).ready(function() {
	$.ajax({
		url: "api/customermanagement/getAllCustomer",
		type: "GET",
		dataType: "json",
		success: function(response) {
			if (response && Array.isArray(response)) {
				let count = response.length;
				console.log("TOTAL CUSTOMERS:", count);
				$("#CustomerCount h6").text(count);
			} else {
				$("#CustomerCount h6").text("0");
			}
		},
		error: function(xhr, status, error) {
			console.error("ERROR FETCHING ALL CUSTOMERS:", error);
			$("#CustomerCount h6").text("0");
		}
	});
});

//anjali (saving acount count)
$(document).ready(function() {
	$.ajax({
		url: "api/customersavings/getAllSavingAccountData", // ✅ API endpoint
		type: "GET",
		dataType: "json",
		success: function(response) {
			if (response && response.data && Array.isArray(response.data)) {
				let count = response.data.length;
				console.log("TOTAL SAVING ACCOUNTS:", count);
				$("#SavingAccountCount h6").text(count); // Update card value
			} else {
				$("#SavingAccountCount h6").text("0");
			}
		},
		error: function(xhr, status, error) {
			console.error("ERROR FETCHING SAVING ACCOUNT:", error);
			$("#SavingAccountCount h6").text("0");
		}
	});
});

//anjali (financial consultant count)
$(document).ready(function() {
	$.ajax({
		url: "api/financialconsultant/getAllFinancialConsultantDetails", // ✅ match controller mapping
		type: "POST", // ✅ because you used @PostMapping
		dataType: "json",
		success: function(response) {
			if (response && response.data && Array.isArray(response.data)) {
				let count = response.data.length;
				console.log("TOTAL FINANCIAL CONSULTANTS:", count);
				$("#FinancialConsultantCount h6").text(count); // Update in card
			} else {
				$("#FinancialConsultantCount h6").text("0");


			}
		},
		error: function(xhr, status, error) {
			console.error("ERROR FETCHING FINANCIAL CONSULTANT DETAILS:", error);
			$("#FinancialConsultantCount h6").text("0");
		}
	});
});

//anjali (policy count)
$(document).ready(function() {
	$.ajax({
		url: "api/Policymangment/getAllPolicyManagementData",  // ✅ Matches @GetMapping
		type: "GET",
		dataType: "json",
		success: function(response) {
			if (response && response.data && Array.isArray(response.data)) {
				let count = response.data.length;
				console.log("TOTAL POLICIES:", count);
				$("#policyCount h6").text(count);  // Update <h6> inside policy card
			} else {
				$("#policyCount h6").text("0");
			}
		},
		error: function(xhr, status, error) {
			console.error("ERROR FETCHING POLICY DATA:", error);
			$("#policyCount h6").text("0");
		}
	});
});

//anjali (loan Application)
$(document).ready(function() {
	$.ajax({
		url: "api/loanmanegment/getAllLoanIds",  // your API endpoint
		type: "GET",
		dataType: "json",
		success: function(response) {
			if (response && response.data && Array.isArray(response.data)) {
				let count = response.data.length;
				console.log("TOTAL LOAN APPLICATIONS:", count);
				$("#loanApplication h6").text(count); // ✅ fixed selector
			} else {
				$("#loanApplication h6").text("0");
			}
		},
		error: function(xhr, status, error) {
			console.error("ERROR FETCHING LOAN IDS:", error);
			$("#loanApplication h6").text("0");
		}
	});
});