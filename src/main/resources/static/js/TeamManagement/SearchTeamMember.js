function searchTeamMember() {

	var filterData = {
		branchName: $("#branchName").val(),
		dateFrom: $("#dateFrom").val(),
		dateTo: $("#dateTo").val(),
		teamMemberName: $("#teamMemberName").val(),
		teamMemberCode: $("#teamMamberCode").val(),
		contactNo: $("#contactNo").val(),
		designation: $("#designation").val(),
		department: $("#department").val()
	};

	$.ajax({
		type: "POST",
		url: "api/teammember/searchTeamMember",
		contentType: "application/json",
		data: JSON.stringify(filterData),

		success: function(response) {

			if (response.status == "OK") {

				var tbody = "";

				$.each(response.data, function(index, item) {

					tbody += "<tr>";

					tbody += "<td>" + (index + 1) + "</td>";
					tbody += "<td>" + item.teamMemberName + "</td>";
					tbody += "<td>" + item.gender + "</td>";
					tbody += "<td>" + item.department + "</td>";
					tbody += "<td>" + item.registrationDate + "</td>";
					tbody += "<td>" + item.contactNo + "</td>";
					tbody += "<td>" + item.branchName + "</td>";
					tbody += "<td>" + item.teamMemberCode + "</td>";
					tbody += "<td>" + item.designation + "</td>";
					tbody += "<td>" + item.department + "</td>";

					tbody += "</tr>";

				});

				$("#searchTeamMember").html(tbody);

			}

		},

		error: function() {
			alert("Unable to fetch data");
		}

	});

}

$(document).ready(function() {
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
})