function saveDepartment() {
	const formData = {
		departmentName: $("#departmentName").val()
	};

	$.ajax({
		type: "POST",
		url: "api/teammember/saveDepartment", // Make sure the context path is correct
		contentType: "application/json",
		data: JSON.stringify(formData),
		success: function(response) {
			alert("Department Saved Successfully");
			location.reload();
		},
		error: function(xhr, status, error) {
			$('#responseMessage').text("Error: " + xhr.responseText);
		}
	});
}

//Janvi : Get All Data From Department table
$(document).ready(function() {
	$.ajax({
		url: "api/teammember/getDepartmentList",
		type: "GET",
		contentType: "application/json",
		success: function(data) {
			var tbody = $(".datatable tbody");
			tbody.empty(); // Clear existing rows

			$.each(data, function(index, item) {
				var row = `<tr style="font-family: 'Poppins', sans-serif;">
              <th scope="row"><a href="#">${index + 1}</a></th>
              <td>${item.departmentName || ''}</td>
            </tr>`;
				tbody.append(row);
			});
		},
		error: function(xhr, status, error) {
			console.error("Error fetching data:", error);
			alert("Failed to load Designation module data.");
		}
	});
});