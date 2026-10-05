$(document).ready(function() {
	$("#updateBtn").hide();

	$("#saveBtn").click(function() {
		convertFormToUpperCase();

		$('#chkrelation').text('');

		var relation = $('#relation').val().trim();

		let isValid = true;

		if (relation === '') {
			$('#chkrelation').text('* This field is required');
			$('#relation').focus();
			isValid = false;
		}

		if (!isValid) {
			return false; // Stop AJAX call
		}

		const formData = {
			relation: $('input[name="relation"]').val()
		};

		$.ajax({
			url: 'api/preference/saveRelativeModule',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(formData),
			success: function(response) {
				if (response.status == 'CREATED') {
					alert(response.message);
					location.reload();
				} else {
					alert("Error: " + (response.message || "Unknown error occurred."));
				}
			},
			error: function(xhr) {
				console.error('Error:', xhr.responseText);
				alert('Failed to save Relative data.');
			}
		});
	});

	$.ajax({
		type: "GET",
		url: "api/preference/getAllRelativeModule",
		contentType: "application/json",
		success: function(response) {
			console.log("Full Response from API:", response);
			if (response.status == "FOUND") {
				let data = response.data;
				let tableBody = $(".datatable tbody");
				tableBody.empty();
				data.forEach((item, index) => {
					let row = `<tr>
			                        <td>${index + 1}</td>
			                        <td>${(item.relation || '').toUpperCase()}</td>
									<td>
										<button type="button" class="iconbutton" onclick="viewData(${item.id})" title="View">
										<i class="fa-solid fa-pen-to-square text-primary"></i>
										</button>
									</td>
									<td>
										<button type="button" class="iconbutton ms-2" onclick="deleteData(${item.id})" title="Delete">
											<i class="fa-solid fa-trash text-danger"></i>
										</button>
									</td>				                    
							</tr>`;
					tableBody.append(row);
				});
			} else {
				alert("Failed to fetch Relative data: " + response.message);
			}
		},
		error: function() {
			alert("Error while calling the API.");
		}
	});
});

function deleteData(id) {
	if (confirm("Are you sure you want to delete this Relation?")) {
		$.ajax({
			url: "api/preference/deleteRelativeModuleById",
			type: "POST",
			data: { id: id },
			success: function(response) {
				if (response.status = "OK") {
					alert(response.message);
					location.reload();
				} else {
					alert("Delete failed: " + response.message);
				}
			},
			error: function(xhr, status, error) {
				alert("Failed to delete Relative.");
				console.error("Error:", error);
			}
		});
	}


}

function viewData(id) {
	$("#updateBtn").show();
	$("#saveBtn").hide();
	$.ajax({
		url: "api/preference/getRelativeModuleById",
		type: "GET",
		data: { id: id },
		success: function(response) {
			if (response.status == "FOUND") {
				const branch = response.data;
				$("#id").val(branch.id);
				$("#relation").val(branch.relation);
			} else {
				alert("Branch not found: " + response.message);
			}
		},
		error: function(xhr) {
			alert("Request failed: " + xhr.responseText);
		}
	});


}

function updateRelative() {
	convertFormToUpperCase();
	$('#chkrelation').text('');

	var relation = $('#relation').val().trim();

	let isValid = true;

	if (relation === '') {
		$('#chkrelation').text('* This field is required');
		$('#relation').focus();
		isValid = false;
	}

	if (!isValid) {
		return false; // Stop AJAX call
	}
	let payload = {
		id: $("#id").val(),
		relation: $("#relation").val(),
	};

	$.ajax({
		url: "api/preference/saveRelativeModule",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(payload),
		success: function(response) {
			if (response.status == "OK") {
				alert("Relative Updated Successfully");
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

function convertFormToUpperCase() {
	$("#formid").find("input[type=text], input[type=date], textarea").each(function() {
		if ($(this).val()) {
			$(this).val($(this).val().toUpperCase());
		}
	});
}
