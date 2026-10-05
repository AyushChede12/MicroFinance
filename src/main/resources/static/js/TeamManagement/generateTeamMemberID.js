$(document).ready(function() {
	teamMemberCodeDropdown();

});
function teamMemberCodeDropdown() {

	$.ajax({
		type: "GET",
		url: "api/teammember/getAllteamMember",
		contentType: "application/json",

		success: function(response) {

			console.log(response);

			if (response.status == "FOUND") {

				var appenddata = "<option value=''>Select</option>";

				$.each(response.data, function(index, item) {

					appenddata += "<option value='" + item.teamMemberCode + "'>" +
						item.teamMemberCode +
						"</option>";

				});

				$("#teamMemberCode").html(appenddata);
			}

		},

		error: function(xhr) {
			console.log(xhr);
			alert("Failed to load Team Members");
		}

	});

}

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