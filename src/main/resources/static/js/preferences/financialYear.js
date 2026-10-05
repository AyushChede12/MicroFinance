$(document).ready(function() {

	$("#formid").find("input[type=text], input[type=date]").each(function() {
		if ($(this).val()) {
			$(this).val($(this).val().toUpperCase());
		}
	});

	$('#addBtn').click(function(event) {
		event.preventDefault();

		// Clear all previous messages
		$('#chkfyname').text('');
		$('#chkdatefrom').text('');
		$('#chkdateto').text('');

		// Fetch input values
		var fyName = $('#financialYearName').val().trim();
		var dateFrom = $('#fromDate').val().trim();
		var dateTo = $('#toDate').val().trim();

		let isValid = true;

		// Validation: Financial Year Name
		// Validation: Financial Year Name
		if (fyName === '') {
			$('#chkfyname').text('* This field is required');
			$('#financialYearName').focus();
			isValid = false;
		} else {
			const fyPattern = /^[0-9]{4}-[0-9]{4}$/;
			if (!fyPattern.test(fyName)) {
				$('#chkfyname').text('* Please enter proper financial year (e.g., 2021-2022)');
				$('#financialYearName').focus();
				isValid = false;
			} else {
				const parts = fyName.split('-');
				const startYear = parseInt(parts[0]);
				const endYear = parseInt(parts[1]);
				if (endYear - startYear !== 1) {
					$('#chkfyname').text('* Financial year should be consecutive years (e.g., 2021-2022)');
					$('#financialYearName').focus();
					isValid = false;
				}
			}
		}


		// Validation: Date From
		if (dateFrom === '') {
			$('#chkdatefrom').text('* This field is required');
			if (isValid) $('#dateFrom').focus();
			isValid = false;
		}

		// Validation: Date To
		if (dateTo === '') {
			$('#chkdateto').text('* This field is required');
			if (isValid) $('#dateTo').focus();
			isValid = false;
		}

		// Optional: Additional Date Range Validation
		if (dateFrom !== '' && dateTo !== '') {
			if (new Date(dateFrom) > new Date(dateTo)) {
				$('#chkdateto').text('* Date To must be after Date From');
				if (isValid) $('#dateTo').focus();
				isValid = false;
			}
		}

		if (!isValid) {
			return false; // Stop AJAX call
		}

		// Prepare Data
		const branchData = {
			financialYearName: fyName.toUpperCase(),
			dateFrom: dateFrom,
			dateTo: dateTo
		};

		// AJAX Call
		$.ajax({
			url: 'api/preference/saveAndUpdateAllFinancialYear',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(branchData),
			success: function(response) {
				if (response.status == 'CREATED') {
					alert("Financial Year Saved Successfully"); // Show custom message from controller
					location.reload(); // Reload page or update table
				} else {
					alert('Something went wrong. Please try again.');
				}
			},
			error: function(xhr) {
				console.error('Error:', xhr.responseText);
				alert('Failed to save financial data.');
			}
		});
	});


	$.ajax({
	    type: "GET",
	    url: "api/preference/getAllFinancialYear",
	    contentType: "application/json",
	    success: function(response) {
	        console.log("Full Response from API:", response);

	        if (response.status == "FOUND") {
	            let data = response.data;

	            // Sort by first year numerically (DESCENDING)
	            data.sort((a, b) => {
	                const aYear = parseInt(a.financialYearName.split('-')[0]);
	                const bYear = parseInt(b.financialYearName.split('-')[0]);
	                return bYear - aYear;   // DESCENDING
	            });

	            let tableBody = $(".datatable tbody");
	            tableBody.empty();

	            data.forEach((item, index) => {
	                let row = `<tr>
	                    <td>${index + 1}</td>
	                    <td>${item.financialYearName}</td>
	                    <td>${item.dateFrom}</td>
	                    <td>${item.dateTo}</td>
	                    <td>
	                        <button class="iconbutton" onclick="viewData(${item.id})" title="View">
	                            <i class="fa-solid fa-pen-to-square text-primary"></i>
	                        </button>
	                    </td>
	                </tr>`;
	                tableBody.append(row);
	            });

	        } else {
	            alert("Failed to fetch branch data: " + response.message);
	        }
	    },
	    error: function() {
	        alert("Error while calling the API.");
	    }
	});


});

function viewData(id) {

	$.ajax({
		url: "api/preference/getFinancialYearById",
		type: "GET",
		data: { id: id },
		success: function(response) {
			if (response.status == "FOUND") {
				const branch = response.data;
				$("#id").val(branch.id);
				$("#financialYearName").val(branch.financialYearName);
				$("#fromDate").val(branch.dateFrom);
				$("#toDate").val(branch.dateTo);
			} else {
				alert("Branch not found: " + response.message);
			}
		},
		error: function(xhr) {
			alert("Request failed: " + xhr.responseText);
		}
	});
}

function deleteData(id) {
	if (confirm("Are you sure you want to delete this branch?")) {
		$.ajax({
			url: "api/preference/deleteFinancialYearById",
			type: "POST",
			data: { id: id },
			success: function(response) {
				if (response.status == "OK") {
					alert(response.message);
					location.reload();
				} else {
					alert("Delete failed: " + response.message);
				}
			},
			error: function(xhr, status, error) {
				alert("Failed to delete financial Year.");
				console.error("Error:", error);
			}
		});
	}

}

function updateFY() {
	// Clear all previous messages
	$('#chkfyname').text('');
	$('#chkdatefrom').text('');
	$('#chkdateto').text('');

	// Fetch input values
	var fyName = $('#financialYearName').val().trim();
	var dateFrom = $('#fromDate').val().trim();
	var dateTo = $('#toDate').val().trim();

	let isValid = true;

	if (fyName === '') {
		$('#chkfyname').text('* This field is required');
		$('#financialYearName').focus();
		isValid = false;
	} else {
		const fyPattern = /^[0-9]{4}-[0-9]{4}$/;
		if (!fyPattern.test(fyName)) {
			$('#chkfyname').text('* Please enter proper financial year (e.g., 2021-2022)');
			$('#financialYearName').focus();
			isValid = false;
		} else {
			const parts = fyName.split('-');
			const startYear = parseInt(parts[0]);
			const endYear = parseInt(parts[1]);
			if (endYear - startYear !== 1) {
				$('#chkfyname').text('* Financial year should be consecutive years (e.g., 2021-2022)');
				$('#financialYearName').focus();
				isValid = false;
			}
		}
	}


	// Validation: Date From
	if (dateFrom === '') {
		$('#chkdatefrom').text('* This field is required');
		if (isValid) $('#dateFrom').focus();
		isValid = false;
	}

	// Validation: Date To
	if (dateTo === '') {
		$('#chkdateto').text('* This field is required');
		if (isValid) $('#dateTo').focus();
		isValid = false;
	}

	// Optional: Additional Date Range Validation
	if (dateFrom !== '' && dateTo !== '') {
		if (new Date(dateFrom) > new Date(dateTo)) {
			$('#chkdateto').text('* Date To must be after Date From');
			if (isValid) $('#dateTo').focus();
			isValid = false;
		}
	}

	if (!isValid) {
		return false; // Stop AJAX call
	}

	let payload = {
		id: $("#id").val(),
		financialYearName: $("#financialYearName").val(),
		dateFrom: $("#fromDate").val(),
		dateTo: $("#toDate").val(),
	};

	$.ajax({
		url: "api/preference/saveAndUpdateAllFinancialYear",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(payload),
		success: function(response) {
			if (response.status = "OK") {
				alert(response.message);
				location.reload();
			} else {
				alert("Operation failed: " + response.message);
			}
		},
		error: function(xhr) {
			alert("Update failed: " + xhr.responseText);
		}
	});
}
