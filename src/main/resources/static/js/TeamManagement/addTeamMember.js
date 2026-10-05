
$(document).ready(function() {

	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: 'api/preference/getAllRelativeModule',
		success: function(response) {

			console.log(response);

			// Access the actual list from response.data
			var list = response.data;

			var appenddata1 = "<option value=''>Select</option>";

			if (list && list.length > 0) {
				for (var i = 0; i < list.length; i++) {
					appenddata1 += "<option value='" + list[i].relation + "'>"
						+ list[i].relation +
						"</option>";
				}
			}

			$("#relationWithNominee").html(appenddata1);
			$("#relationToApplicant").html(appenddata1);
		},
		error: function(xhr, status, error) {
			console.error("Error:", error);
			alert("Failed to load relatives");
		}
	});

	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: 'api/teammember/getDepartmentList', // Update the URL if necessary
		async: true, // Correct spelling
		success: function(data) {
			console.log(data); // Debug the response
			var appenddata1 = "<option value=''>Select</option>";
			for (var i = 0; i < data.length; i++) {
				appenddata1 += "<option value='" + data[i].departmentName + "'>" + data[i].departmentName + "</option>";
			}
			$("#department").html(appenddata1); // Clear and populate
		},
		error: function() {
			alert("Failed to load departments");
		}
	});

	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: 'api/teammember/getDesignationList', // Update the URL if necessary
		async: true, // Correct spelling
		success: function(data) {
			console.log(data); // Debug the response
			var appenddata1 = "<option value=''>Select</option>";
			for (var i = 0; i < data.length; i++) {
				appenddata1 += "<option value='" + data[i].designationName + "'>" + data[i].designationName + "</option>";
			}
			$("#designation").html(appenddata1); // Clear and populate
		},
		error: function() {
			alert("Failed to load designations");
		}
	});

	// Helper function to validate the form
	function validateForm() {
		let isValid = true;
		let errorMessages = [];

		// Validate required fields
		const requiredFields = [
			{ id: '#teamMemberCode', message: 'TeamMember Code is required.' },
			{ id: '#signUpDate', message: 'SignUp Date is required.' },
			{ id: '#teamMemberName', message: 'TeamMember Name is required.' },
			{ id: '#dateOfBirth', message: 'Date of Birth is required.' },
			{ id: '#contactNo', message: 'Contact Number is required.' },
			{ id: '#salary', message: 'Salary is required.' }
		];

		requiredFields.forEach(field => {
			const value = $(field.id).val();
			if (!value) {
				isValid = false;
				errorMessages.push(field.message);
				$(field.id).addClass('error'); // Add a red border or some indicator
			} else {
				$(field.id).removeClass('error'); // Remove the error indicator if fixed
			}
		});

		// Validate mobile number format
		const contactNo = $('#contactNo').val();
		if (contactNo && !/^\d{10}$/.test(contactNo)) {
			isValid = false;
			errorMessages.push('contact Number must be a 10-digit number.');
			$('#contactNo').addClass('error');
		} else {
			$('#contactNo').removeClass('error');
		}

		// Validate salary is a positive number
		const salary = $('#salary').val();
		if (salary && (isNaN(salary) || salary <= 0)) {
			isValid = false;
			errorMessages.push('Salary must be a positive number.');
			$('#salary').addClass('error');
		} else {
			$('#salary').removeClass('error');
		}

		// Validate joining date (cannot be in the future)
		const signUpDate = $('#signUpDate').val();
		if (signUpDate && new Date(signUpDate) > new Date()) {
			isValid = false;
			errorMessages.push('SignUp Date cannot be in the future.');
			$('#signUpDate').addClass('error');
		} else {
			$('#signUpDate').removeClass('error');
		}

		// Display error messages
		if (!isValid) {
			alert('Please fix the following errors:\n' + errorMessages.join('\n'));
		}

		return isValid;
	}

	$('#TeamMemberSaveBtn').on('click', function(e) {
		e.preventDefault(); // Prevent default form submission

		// Validate the form before proceeding
		if (!validateForm()) {
			return; // Stop if the form is invalid
		}

		// Get the status of the checkbox (checked or unchecked)
		const customerStatus = $('#customerStatus').prop('checked'); // True if checked, false if unchecked

		const teamMemberData = {
			// Employee Details
			teamMemberCode: $('#teamMemberCode').val(),
			signUpDate: $('#signUpDate').val(),
			branchName: $('#branchName').val(),
			teamMemberName: $('#teamMemberName').val(),
			dateOfBirth: $('#dateOfBirth').val(),
			age: $('#age').val(),
			familyMemberName: $('#familyMemberName').val(),
			relationToApplicant: $('#relationToApplicant').val(),
			contactNo: $('#contactNo').val(),
			nomineeName: $('#nomineeName').val(),
			nomineeAge: $('#nomineeAge').val(),
			relationWithNominee: $('#relationWithNominee').val(),
			address: $('#address').val(),
			pan: $('#pan').val(),
			bankAC: $('#bankAC').val(),
			ifscCode: $('#ifscCode').val(),
			expDetails: $('#expDetails').val(),
			educationalBackground: $('#educationalBackground').val(),

			// Designation Details
			designation: $('#designation').val(),
			department: $('#department').val(),

			// Payment Details
			salary: $('#salary').val(),
			savingAccNo: $('#savingAccNo').val(),
			fees: $('#fees').val(),
			modeofpayment: $('#modeofpayment').val(),
			chequeNo: $('#chequeNo').val(),
			chequeDate: $('#chequeDate').val(),
			depositAcc1: $('#depositAcc1').val(),
			refNumber1: $('#refNumber1').val(),
			depositAcc2: $('#depositAcc2').val(),
			refNumber2: $('#refNumber2').val(),
			depositAcc3: $('#depositAcc3').val(),
			comments: $('#comments').val(),

			// Employee Status
			customerStatus: customerStatus ? 1 : 0 // Send 1 if checked, 0 if unchecked
		};

		$.ajax({
			url: 'api/teammember/saveTeamMember',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(teamMemberData),
			success: function(response) {
				alert("TeamMember saved successfully: " + response.teamMemberCode);

				// Reload the page to reset the form and fetch the next employee code
				location.reload();
			},
			error: function(error) {
				console.error('Error:', error);
				alert("Failed to save TeamMember. Please check the input data.");
			}
		});
	});
});

//TeamMemberCode Dropdown
function teamMemberCodeDropdown() {
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: 'api/teammember/getAllteamMember', // Update the URL if necessary
		async: true, // Correct spelling
		success: function(data) {
			alert("dd");
			console.log(data); // Debug the response
			var appenddata = "<option value=''>Select</option>";
			for (var i = 0; i < data.length; i++) {
				appenddata += "<option value='" + data[i].teamMemberCode + "'>" + data[i].teamMemberCode + "</option>";
			}
			$("#teamMemberCode").html(appenddata); // Clear and populate
		},
		error: function() {
			alert("Failed to load departments");
		}
	});
}

//show team member details
function fetchTeamMemberDataByCode() {
	var teamMemberCode = document.getElementById("teamMemberCode").value;

	$.ajax({
		type: "POST",
		contentType: "application/json", // Make sure we're sending JSON
		url: 'api/teammember/fetchTeamMemberDataByCode',
		data: JSON.stringify({ teamMemberCode: teamMemberCode }), // 🔥 Must stringify!
		success: function(data) {
			if (!data || data.length === 0) {
				alert("No team member data found.");
				return;
			}

			const tableData = data.map(function(value) {
				return (
					`<tr>
                        <td>${value.id}</td>
                        <td>${value.teamMemberName}</td>
                        <td>${value.branchName}</td>
                        <td>${value.signUpDate}</td>
                        <td>${value.dateOfBirth}</td>
                        <td>${value.contactNo}</td>
                        <td>${value.address}</td>
                        <td>${value.department}</td>
                    </tr>`
				);
			}).join('');

			document.querySelector("#tabelBody").innerHTML = tableData;
		},
		error: function(xhr, status, error) {
			console.error("Error fetching data:", error);
			alert("Something went wrong while fetching team member data.");
		}
	});
}

//search team member
let allTeamMemberData = [];
// Global array to store all team member data

function searchInTheTeamMember() {
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: 'api/teammember/getAllteamMember',
		data: {},
		async: false,
		success: function(data) {
			if (data.length === 0) {
				alert("No data found!");
				return;
			}

			allTeamMemberData = data; // store for filtering
			renderTable(data);
		},
		error: function() {
			alert("Failed to fetch data. Please try again.");
		}
	});
}

function renderTable(data) {
	let j = 1;

	const tableData = data.map(function(value) {
		return (
			`<tr>
                <td>${j++}</td>
                <td>${value.teamMemberName}</td>
                <td>${value.dateOfBirth}</td>
                <td>${value.bankAC}</td>
                <td>${value.signUpDate}</td>
                <td>${value.contactNo}</td>  
                <td>${value.branchName}</td>    
                <td>${value.teamMemberCode}</td> 
                <td>${value.designation}</td> 
                <td>${value.department}</td>                        

            </tr>`
		);
	}).join('');
	$('#searchTeamMember').html(tableData);
}

/*// Applicant name Filter (Column 2)
const inputaccHolderName = document.getElementById("empName");
inputaccHolderName.addEventListener("input", function() {
	filterTableByColumn(1, inputaccHolderName.value);
});

function filterTableByColumn(index, keyword) {
	const rows = document.querySelectorAll("#searchTeamMember tr");
	keyword = keyword.toLowerCase();

	rows.forEach(row => {
		const cell = row.cells[index];
		if (cell) {
			const text = cell.textContent.toLowerCase();
			row.style.display = text.includes(keyword) ? "" : "none";
		}
	});
} */
