$(document).ready(function() {

	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: 'api/preference/getAllRelativeModule',
		success: function(response) {

			console.log(response);

			// Access the actual list from response.data
			var list = response.data;

			var appenddata1 = "<option value=''>--SELECT RELATION--</option>";

			if (list && list.length > 0) {
				for (var i = 0; i < list.length; i++) {
					appenddata1 += "<option value='" + list[i].relation + "'>"
						+ list[i].relation.toUpperCase() +
						"</option>";
				}
			}

			$("#relationWithNominee").html(appenddata1);
			$("#relationToApplicant").html(appenddata1);
		},
		error: function(xhr, status, error) {
			console.error("Error:", error);
			alert("FAILED TO LOAD RELATIVES");
		}
	});

	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: 'api/teammember/getDepartmentList', // Update the URL if necessary
		async: true, // Correct spelling
		success: function(data) {
			console.log(data); // Debug the response
			var appenddata1 = "<option value=''>--SELECT DEPARTMENT--</option>";
			for (var i = 0; i < data.length; i++) {
				appenddata1 += "<option value='" + data[i].departmentName.toUpperCase() + "'>" + data[i].departmentName.toUpperCase() + "</option>";
			}
			$("#department").html(appenddata1); // Clear and populate
		},
		error: function() {
			alert("FAILED TO LOAD DEPARTMENTS");
		}
	});

	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: 'api/teammember/getDesignationList', // Update the URL if necessary
		async: true, // Correct spelling
		success: function(data) {
			console.log(data); // Debug the response
			var appenddata1 = "<option value=''>--SELECT DESIGNATION--</option>";
			for (var i = 0; i < data.length; i++) {
				appenddata1 += "<option value='" + data[i].designationName.toUpperCase() + "'>" + data[i].designationName.toUpperCase() + "</option>";
			}
			$("#designation").html(appenddata1); // Clear and populate
		},
		error: function() {
			alert("FAILED TO LOAD DESIGNATIONS");
		}
	});

	// Helper function to validate the form
	function validateForm() {
		let isValid = true;
		let errorMessages = [];

		// Validate required fields
		const requiredFields = [
			{ id: '#teamMemberCode', message: 'TEAMMEMBER CODE IS REQUIRED.' },
			{ id: '#signUpDate', message: 'SIGNUP DATE IS REQUIRED.' },
			{ id: '#teamMemberName', message: 'TEAMMEMBER NAME IS REQUIRED.' },
			{ id: '#dateOfBirth', message: 'DATE OF BIRTH IS REQUIRED.' },
			{ id: '#contactNo', message: 'CONTACT NUMBER IS REQUIRED.' },
			{ id: '#salary', message: 'SALARY IS REQUIRED.' }
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
			errorMessages.push('CONTACT NUMBER MUST BE A 10-DIGIT NUMBER.');
			$('#contactNo').addClass('error');
		} else {
			$('#contactNo').removeClass('error');
		}

		// Validate salary is a positive number
		const salary = $('#salary').val();
		if (salary && (isNaN(salary) || salary <= 0)) {
			isValid = false;
			errorMessages.push('SALARY MUST BE A POSITIVE NUMBER.');
			$('#salary').addClass('error');
		} else {
			$('#salary').removeClass('error');
		}

		// Validate joining date (cannot be in the future)
		const signUpDate = $('#signUpDate').val();
		if (signUpDate && new Date(signUpDate) > new Date()) {
			isValid = false;
			errorMessages.push('SIGNUP DATE CANNOT BE IN THE FUTURE.');
			$('#signUpDate').addClass('error');
		} else {
			$('#signUpDate').removeClass('error');
		}

		// Display error messages
		if (!isValid) {
			alert('PLEASE FIX THE FOLLOWING ERRORS:\n' + errorMessages.join('\n'));
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
				alert("TEAMMEMBER SAVED SUCCESSFULLY: " + response.teamMemberCode);

				// Reload the page to reset the form and fetch the next employee code
				location.reload();
			},
			error: function(error) {
				console.error('Error:', error);
				alert("FAILED TO SAVE TEAMMEMBER. PLEASE CHECK THE INPUT DATA.");
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
			alert("DD");
			console.log(data); // Debug the response
			var appenddata = "<option value=''>--SELECT CODE--</option>";
			for (var i = 0; i < data.length; i++) {
				appenddata += "<option value='" + data[i].teamMemberCode + "'>" + data[i].teamMemberCode.toUpperCase() + "</option>";
			}
			$("#teamMemberCode").html(appenddata); // Clear and populate
		},
		error: function() {
			alert("FAILED TO LOAD DEPARTMENTS");
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
				alert("NO TEAM MEMBER DATA FOUND.");
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
			alert("SOMETHING WENT WRONG WHILE FETCHING TEAM MEMBER DATA.");
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
				alert("NO DATA FOUND!");
				return;
			}

			allTeamMemberData = data; // store for filtering
			renderTable(data);
		},
		error: function() {
			alert("FAILED TO FETCH DATA. PLEASE TRY AGAIN.");
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