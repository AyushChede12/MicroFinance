function getMonthNames() {
	return [
		"JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
		"JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
	];
}

function populateAllDropdownsWithMonths(className) {
	const dropdowns = document.querySelectorAll(`.${className}`);
	const months = getMonthNames();
	const currentMonthIndex = new Date().getMonth();

	dropdowns.forEach(dropdown => {
		dropdown.innerHTML = "";
		const defaultOpt = document.createElement("option");
		defaultOpt.value = "";
		defaultOpt.textContent = "-- SELECT MONTH --";
		dropdown.appendChild(defaultOpt);

		months.forEach((month, index) => {
			const option = document.createElement("option");
			option.value = month;
			option.textContent = month;
			if (index === currentMonthIndex) {
				option.selected = true;
			}
			dropdown.appendChild(option);
		});
	});
}

$(document).ready(function() {

	populateAllDropdownsWithMonths("monthname");

	// 1. Fixed Deposit Policy Codes
	$.ajax({
		url: "api/Policymangment/fixed-depositview",
		type: "GET",
		success: function(response) {
			var dropdown = $('#fdPolicyCode');
			dropdown.empty();
			dropdown.append('<option value="">-- SELECT POLICY CODE --</option>');

			if ((response.status === "OK" || response.status === "FOUND") && Array.isArray(response.data)) {
				$.each(response.data, function(index, plan) {
					var pCode = plan.planCodeFD || "";
					var pName = plan.planNameFD || "";
					var displayText = (pCode + " - " + pName).toUpperCase();
					dropdown.append('<option value="' + pCode + '">' + displayText + '</option>');
				});
			}
		},
		error: function() {
			console.warn("NO FIXED DEPOSIT POLICIES FOUND.");
		}
	});

	// Save Fixed Deposit Scheme
	$("#formfd").submit(function(event) {
		event.preventDefault();

		var data = {
			policyCode: $("#fdPolicyCode").val(),
			schemeType: "FIXED_DEPOSIT",
			instFrom: $("#fdInstFrom").val(),
			instTo: $("#fdInstTo").val(),
			interestRate: $("#fdInterestRate").val(),
			deduction: $("#fdDeduction").val()
		};

		if (!data.policyCode) {
			alert("PLEASE SELECT A POLICY CODE.");
			return;
		}

		$.ajax({
			url: "api/Maturitymanagement/savematurityscheme",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(response) {
				if (response.status === "OK" || response.status === "CREATED") {
					alert("FIXED DEPOSIT MATURITY SCHEME SAVED SUCCESSFULLY.");
					$("#formfd")[0].reset();
					populateAllDropdownsWithMonths("monthname");
				} else {
					alert("FAILED: " + (response.message || "COULD NOT SAVE").toUpperCase());
				}
			},
			error: function(xhr, status, error) {
				console.error("Error saving FD scheme:", error);
				alert("SOMETHING WENT WRONG WHILE SAVING THE DATA.");
			}
		});
	});

	// 2. Recurring Deposit Policy Codes
	$.ajax({
		url: "api/Policymangment/recurring-depositview",
		type: "GET",
		success: function(response) {
			var dropdown = $('#rdPolicyCode');
			dropdown.empty();
			dropdown.append('<option value="">-- SELECT POLICY CODE --</option>');

			if ((response.status === "OK" || response.status === "FOUND") && Array.isArray(response.data)) {
				$.each(response.data, function(index, plan) {
					var pCode = plan.planCodeRD || "";
					var pName = plan.planNameRD || "";
					var displayText = (pCode + " - " + pName).toUpperCase();
					dropdown.append('<option value="' + pCode + '">' + displayText + '</option>');
				});
			}
		},
		error: function() {
			console.warn("NO RECURRING DEPOSIT POLICIES FOUND.");
		}
	});

	// Save Recurring Deposit Scheme
	$("#formrd").submit(function(event) {
		event.preventDefault();

		var data = {
			policyCode: $("#rdPolicyCode").val(),
			schemeType: "RECURRING_DEPOSIT",
			instFrom: $("#rdInstFrom").val(),
			instTo: $("#rdInstTo").val(),
			interestRate: $("#rdInterestRate").val(),
			deduction: $("#rdDeduction").val()
		};

		if (!data.policyCode) {
			alert("PLEASE SELECT A POLICY CODE.");
			return;
		}

		$.ajax({
			url: "api/Maturitymanagement/savematurityscheme",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(response) {
				if (response.status === "OK" || response.status === "CREATED") {
					alert("RECURRING DEPOSIT MATURITY SCHEME SAVED SUCCESSFULLY.");
					$("#formrd")[0].reset();
					populateAllDropdownsWithMonths("monthname");
				} else {
					alert("FAILED: " + (response.message || "COULD NOT SAVE").toUpperCase());
				}
			},
			error: function(xhr, status, error) {
				console.error("Error saving RD scheme:", error);
				alert("SOMETHING WENT WRONG WHILE SAVING THE DATA.");
			}
		});
	});

	// 3. Daily Deposit Policy Codes
	$.ajax({
		url: "api/Policymangment/daily-deposit/view",
		type: "GET",
		success: function(response) {
			var dropdown = $('#ddPolicyCode');
			dropdown.empty();
			dropdown.append('<option value="">-- SELECT POLICY CODE --</option>');

			if ((response.status === "OK" || response.status === "FOUND") && Array.isArray(response.data)) {
				$.each(response.data, function(index, plan) {
					var pCode = plan.planCodeDD || "";
					var pName = plan.planNameDD || "";
					var displayText = (pCode + " - " + pName).toUpperCase();
					dropdown.append('<option value="' + pCode + '">' + displayText + '</option>');
				});
			}
		},
		error: function() {
			console.warn("NO DAILY DEPOSIT POLICIES FOUND.");
		}
	});

	// Save Daily Deposit Scheme
	$("#formdd").submit(function(event) {
		event.preventDefault();

		var data = {
			policyCode: $("#ddPolicyCode").val(),
			schemeType: "DAILY_DEPOSIT",
			instFrom: $("#ddInstFrom").val(),
			instTo: $("#ddInstTo").val(),
			interestRate: $("#ddInterestRate").val(),
			deduction: $("#ddDeduction").val()
		};

		if (!data.policyCode) {
			alert("PLEASE SELECT A POLICY CODE.");
			return;
		}

		$.ajax({
			url: "api/Maturitymanagement/savematurityscheme",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(response) {
				if (response.status === "OK" || response.status === "CREATED") {
					alert("DAILY DEPOSIT MATURITY SCHEME SAVED SUCCESSFULLY.");
					$("#formdd")[0].reset();
					populateAllDropdownsWithMonths("monthname");
				} else {
					alert("FAILED: " + (response.message || "COULD NOT SAVE").toUpperCase());
				}
			},
			error: function(xhr, status, error) {
				console.error("Error saving DD scheme:", error);
				alert("SOMETHING WENT WRONG WHILE SAVING THE DATA.");
			}
		});
	});

	// 4. MIS Deposit Policy Codes
	$.ajax({
		url: "api/Policymangment/mis-deposit/view",
		type: "GET",
		success: function(response) {
			var dropdown = $('#mPolicyCode');
			dropdown.empty();
			dropdown.append('<option value="">-- SELECT POLICY CODE --</option>');

			if ((response.status === "OK" || response.status === "FOUND") && Array.isArray(response.data)) {
				$.each(response.data, function(index, plan) {
					var pCode = plan.planCodeMD || "";
					var pName = plan.planNameMD || "";
					var displayText = (pCode + " - " + pName).toUpperCase();
					dropdown.append('<option value="' + pCode + '">' + displayText + '</option>');
				});
			}
		},
		error: function() {
			console.warn("NO MIS DEPOSIT POLICIES FOUND.");
		}
	});

	// Save MIS Deposit Scheme
	$("#formmis").submit(function(event) {
		event.preventDefault();

		var data = {
			policyCode: $("#mPolicyCode").val(),
			schemeType: "MIS_DEPOSIT",
			instFrom: $("#misInstFrom").val(),
			instTo: $("#misInstTo").val(),
			interestRate: $("#misInterestRate").val(),
			deduction: $("#misDeduction").val()
		};

		if (!data.policyCode) {
			alert("PLEASE SELECT A POLICY CODE.");
			return;
		}

		$.ajax({
			url: "api/Maturitymanagement/savematurityscheme",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(response) {
				if (response.status === "OK" || response.status === "CREATED") {
					alert("MIS DEPOSIT MATURITY SCHEME SAVED SUCCESSFULLY.");
					$("#formmis")[0].reset();
					populateAllDropdownsWithMonths("monthname");
				} else {
					alert("FAILED: " + (response.message || "COULD NOT SAVE").toUpperCase());
				}
			},
			error: function(xhr, status, error) {
				console.error("Error saving MIS scheme:", error);
				alert("SOMETHING WENT WRONG WHILE SAVING THE DATA.");
			}
		});
	});

});
