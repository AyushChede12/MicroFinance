$(document).ready(function() {

	$("#tableBody").hide();
	$("#updateBtn").hide();
	$("#prevBtn").hide();
	$("#nextBtn").hide();
	$("#pageInfo").hide();

	$('#saveBtn').click(function(event) {
		event.preventDefault();
		convertFormToUpperCase();

		// Clear all previous messages
		$('#chkbranchcode').text('');
		$('#chkbranchName').text('');
		$('#chkopeningdate').text('');
		$('#chkaddress').text('');
		$('#chkpin').text('');
		$('#chkstate').text('');
		$('#chkbranchManager').text('');
		$('#chkaccountDepartment').text('');

		// Fetch input values
		var branchCode = $('#branchCode').val().trim();
		var branchName = $('#branchName').val().trim();
		var openingDate = $('#openingDate').val().trim();
		var address = $('#address').val().trim();
		var pin = $('#pin').val().trim();
		var state = $('#state').val().trim();
		var branchManagerContactNo = $('#branchManagerContactNo').val().trim();
		var accountDepartmentContactNo = $('#accountDepartmentContactNo').val().trim();

		var contactPattern = /^[6-9][0-9]{9}$/;
		var pinPattern = /^[1-9][0-9]{5}$/;

		let isValid = true;

		// Validation: Financial Year Name
		if (branchCode === '') {
			$('#chkbranchcode').text('* THIS FIELD IS REQUIRED');
			$('#branchCode').focus();
			isValid = false;
		}

		if (branchName === '') {
			$('#chkbranchName').text('* THIS FIELD IS REQUIRED');
			$('#branchName').focus();
			isValid = false;
		}

		if (openingDate === '') {
			$('#chkopeningdate').text('* THIS FIELD IS REQUIRED');
			$('#openingDate').focus();
			isValid = false;
		}

		if (address === '') {
			$('#chkaddress').text('* THIS FIELD IS REQUIRED');
			$('#address').focus();
			isValid = false;
		}

		if (pin === '') {
			$('#chkpin').text('* THIS FIELD IS REQUIRED');
			$('#pin').focus();
			isValid = false;
		}
		else if (!pinPattern.test(pin)) {
			alert("PLEASE ENTER A VALID 6-DIGIT PIN CODE (FIRST DIGIT CANNOT BE 0).");
			$('#pin').focus();
			isValid = false;
		}

		if (state === '') {
			$('#chkstate').text('* THIS FIELD IS REQUIRED');
			$('#state').focus();
			isValid = false;
		}

		if (branchManagerContactNo === '') {
			$('#chkbranchManager').text('* THIS FIELD IS REQUIRED');
			$('#branchManagerContactNo').focus();
			isValid = false;
		}
		else if (!contactPattern.test(branchManagerContactNo)) {
			alert("PLEASE ENTER A VALID 10-DIGIT BRANCH MANAGER CONTACT NUMBER.");
			$('#branchManagerContactNo').focus();
			isValid = false;
		}

		if (accountDepartmentContactNo === '') {
			$('#chkaccountDepartment').text('* THIS FIELD IS REQUIRED');
			$('#accountDepartmentContactNo').focus();
			isValid = false;
		}
		else if (!contactPattern.test(accountDepartmentContactNo)) {
			alert("PLEASE ENTER A VALID 10-DIGIT ACCOUNT DEPARTMENT CONTACT NUMBER.");
			$('#accountDepartmentContactNo').focus();
			isValid = false;
		}

		if (!isValid) {
			return false; // Stop AJAX call
		}

		const branchData = {
			branchCode: $('#branchCode').val(),
			branchName: $('#branchName').val(),
			openingDate: $('#openingDate').val(),
			address: $('#address').val(),
			pin: $('#pin').val(),
			state: $('#state').val(),
			branchManagerContactNo: $('#branchManagerContactNo').val(),
			accountDepartmentContactNo: $('#accountDepartmentContactNo').val()
		};

		$.ajax({
			url: 'api/preference/saveAndUpdateAllBranchModule',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(branchData),
			success: function(response) {
				if (response.status == 'CREATED') {
					alert("BRANCH SAVED SUCCESSFULLY");
					location.reload();
				}
				else {
					alert("BRANCH NOT SAVED");
					location.reload();
				}

			},
			error: function(xhr) {
				console.error('Error:', xhr.responseText);
				alert('FAILED TO SAVE BRANCH DATA.');
			}
		});
	});

});

var totalDataBranch = [];
var currentPageBranch = 1;
var pageSizeBranch = 5;

// Load all branch data initially
function loadBranchData() {
	$.ajax({
		type: "GET",
		url: "api/preference/getAllBranchModule",
		contentType: "application/json",
		success: function(response) {
			console.log("Response:", response);

			// If response has data property and it's array
			if (response.data && Array.isArray(response.data)) {
				totalDataBranch = response.data;
			}
			// If response itself is array
			else if (Array.isArray(response)) {
				totalDataBranch = response;
			}
			// If status is boolean true
			else if (response.status === true && response.data) {
				totalDataBranch = response.data;
			}
			else {
				alert("NO DATA FOUND FROM API");
				return;
			}

			currentPageBranch = 1;
			renderBranchTable(currentPageBranch);
			togglePageNavigationBranch();
		},
		error: function() {
			alert("ERROR WHILE CALLING THE API.");
		}
	});
}

// Function to add new branch data and refresh table
function addNewBranchData(newBranch) {
	totalDataBranch.unshift(newBranch); // Add new data at the top
	currentPageBranch = 1; // Show first page with new data
	renderBranchTable(currentPageBranch);
	togglePageNavigationBranch();
}

// Render paginated branch table
function renderBranchTable(page) {
	let tableBody = $(".datatable tbody");
	tableBody.empty();

	let startIndex = (page - 1) * pageSizeBranch;
	let endIndex = Math.min(startIndex + pageSizeBranch, totalDataBranch.length);

	for (let i = startIndex; i < endIndex; i++) {
		let branch = totalDataBranch[i];
		let row = `<tr>
		<td>${i + 1}</td>
	    <td>${(branch.branchCode || '').toUpperCase()}</td>
	    <td>${(branch.branchName || '').toUpperCase()}</td>
	    <td>${(branch.openingDate || '').toUpperCase()}</td>
	    <td>${(branch.address || '').toUpperCase()}</td>
	    <td>${(branch.pin || '').toUpperCase()}</td>
	    <td>${(branch.state || '').toUpperCase()}</td>
	    <td>${(branch.branchManagerContactNo || '').toUpperCase()}</td>
	    <td>${(branch.accountDepartmentContactNo || '').toUpperCase()}</td>
		<td>
			<button class="iconbutton" onclick="viewData(${branch.id})" title="VIEW">
				<i class="fa-solid fa-pen-to-square text-primary"></i>
			</button>
		</td>
		<td>
		    <button class="iconbutton" onclick="deleteData(${branch.id})" title="DELETE">
		        <i class="fa-solid fa-trash text-danger"></i>
		    </button>
		</td>
	</tr>`;
		tableBody.append(row);
	}

	// Update page info
	$("#pageInfo").text(`PAGE ${currentPageBranch} OF ${Math.ceil(totalDataBranch.length / pageSizeBranch)}`);
}

// Toggle page navigation buttons
function togglePageNavigationBranch() {
	let totalPages = Math.ceil(totalDataBranch.length / pageSizeBranch);
	$("#prevBtn").prop("disabled", currentPageBranch === 1);
	$("#nextBtn").prop("disabled", currentPageBranch >= totalPages || totalPages === 0);
}

// Previous button click
$("#prevBtn").click(function() {
	if (currentPageBranch > 1) {
		currentPageBranch--;
		renderBranchTable(currentPageBranch);
		togglePageNavigationBranch();
	}
});

// Next button click
$("#nextBtn").click(function() {
	let totalPages = Math.ceil(totalDataBranch.length / pageSizeBranch);
	if (currentPageBranch < totalPages) {
		currentPageBranch++;
		renderBranchTable(currentPageBranch);
		togglePageNavigationBranch();
	}
});

// Call on page load
$(document).ready(function() {
	loadBranchData();
});



function showTableData() {
	$("#tableBody").show();
	$("#prevBtn").show();
	$("#nextBtn").show();
	$("#pageInfo").show();
}

function hideTableData() {
	$("#tableBody").hide();
	$("#prevBtn").hide();
	$("#nextBtn").hide();
	$("#pageInfo").hide();
}

function viewData(id) {
	$("#updateBtn").show();
	$("#saveBtn").hide();
	$("#hideBtn").hide();
	$("#showBtn").hide();
	$.ajax({
		url: "api/preference/getBranchModuleById",
		type: "GET",
		data: { id: id },
		success: function(response) {
			if (response.status == "FOUND") {
				const branch = response.data;
				$("#id").val(branch.id);
				$("#branchCode").val(branch.branchCode);
				$("#branchName").val(branch.branchName);
				$("#openingDate").val(branch.openingDate);
				$("#address").val(branch.address);
				$("#pin").val(branch.pin);
				$("#state").val(branch.state);
				$("#branchManagerContactNo").val(branch.branchManagerContactNo);
				$("#accountDepartmentContactNo").val(branch.accountDepartmentContactNo);
			} else {
				alert("BRANCH NOT FOUND: " + response.message);
			}
		},
		error: function(xhr) {
			alert("REQUEST FAILED: " + xhr.responseText);
		}
	});


}

function deleteData(id) {
	if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS BRANCH?")) {
		$.ajax({
			url: "api/preference/deleteBranchModuleById",
			type: "POST",
			data: { id: id },
			success: function(response) {
				if (response.status == "OK") {
					alert(response.message);
					location.reload();
				} else {
					alert("DELETE FAILED: " + response.message);
				}
			},
			error: function(xhr, status, error) {
				alert("FAILED TO DELETE BRANCH.");
				console.error("Error:", error);
			}
		});
	}

}



function updateBranch() {
	convertFormToUpperCase();
	$('#chkbranchcode').text('');
	$('#chkbranchName').text('');
	$('#chkopeningdate').text('');
	$('#chkaddress').text('');
	$('#chkpin').text('');
	$('#chkstate').text('');
	$('#chkbranchManager').text('');
	$('#chkaccountDepartment').text('');

	var branchCode = $('#branchCode').val().trim();
	var branchName = $('#branchName').val().trim();
	var openingDate = $('#openingDate').val().trim();
	var address = $('#address').val().trim();
	var pin = $('#pin').val().trim();
	var state = $('#state').val().trim();
	var branchManagerContactNo = $('#branchManagerContactNo').val().trim();
	var accountDepartmentContactNo = $('#accountDepartmentContactNo').val().trim();

	var contactPattern = /^[6-9][0-9]{9}$/;
	var pinPattern = /^[1-9][0-9]{5}$/;

	let isValid = true;

	// Validation: Financial Year Name
	if (branchCode === '') {
		$('#chkbranchcode').text('* THIS FIELD IS REQUIRED');
		$('#branchCode').focus();
		isValid = false;
	}

	if (branchName === '') {
		$('#chkbranchName').text('* THIS FIELD IS REQUIRED');
		$('#branchName').focus();
		isValid = false;
	}

	if (openingDate === '') {
		$('#chkopeningdate').text('* THIS FIELD IS REQUIRED');
		$('#openingDate').focus();
		isValid = false;
	}

	if (address === '') {
		$('#chkaddress').text('* THIS FIELD IS REQUIRED');
		$('#address').focus();
		isValid = false;
	}

	if (pin === '') {
		$('#chkpin').text('* THIS FIELD IS REQUIRED');
		$('#pin').focus();
		isValid = false;
	}
	else if (!pinPattern.test(pin)) {
		alert("PLEASE ENTER A VALID 6-DIGIT PIN CODE (FIRST DIGIT CANNOT BE 0).");
		$('#pin').focus();
		isValid = false;
	}

	if (state === '') {
		$('#chkstate').text('* THIS FIELD IS REQUIRED');
		$('#state').focus();
		isValid = false;
	}

	if (branchManagerContactNo === '') {
		$('#chkbranchManager').text('* THIS FIELD IS REQUIRED');
		$('#branchManagerContactNo').focus();
		isValid = false;
	}
	else if (!contactPattern.test(branchManagerContactNo)) {
		alert("PLEASE ENTER A VALID 10-DIGIT BRANCH MANAGER CONTACT NUMBER.");
		$('#branchManagerContactNo').focus();
		isValid = false;
	}

	if (accountDepartmentContactNo === '') {
		$('#chkaccountDepartment').text('* THIS FIELD IS REQUIRED');
		$('#accountDepartmentContactNo').focus();
		isValid = false;
	}
	else if (!contactPattern.test(accountDepartmentContactNo)) {
		alert("PLEASE ENTER A VALID 10-DIGIT ACCOUNT DEPARTMENT CONTACT NUMBER.");
		$('#accountDepartmentContactNo').focus();
		isValid = false;
	}

	if (!isValid) {
		return false; // Stop AJAX call
	}

	let payload = {
		id: $("#id").val(),
		branchCode: $("#branchCode").val(),
		branchName: $("#branchName").val(),
		openingDate: $("#openingDate").val(),
		address: $("#address").val(),
		pin: $("#pin").val(),
		state: $("#state").val(),
		branchManagerContactNo: $("#branchManagerContactNo").val(),
		accountDepartmentContactNo: $("#accountDepartmentContactNo").val()
	};

	$.ajax({
		url: "api/preference/saveAndUpdateAllBranchModule",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(payload),
		success: function(response) {
			if (response.status == "OK") {
				alert(response.message);
				location.reload();
			} else {
				alert("OPERATION FAILED: " + response.message);
			}
		},
		error: function(xhr) {
			alert("UPDATE FAILED: " + xhr.responseText);
		}
	});
}

// Convert all form fields to uppercase before sending to backend
function convertFormToUpperCase() {
	$("#formid").find("input[type=text], input[type=date], textarea").each(function() {
		if ($(this).val()) {
			$(this).val($(this).val().toUpperCase());
		}
	});
}