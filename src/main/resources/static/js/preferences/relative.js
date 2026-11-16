$(document).ready(function() {
	$("#updateBtn").hide();

	$("#saveBtn").click(function() {
		convertFormToUpperCase();

		$('#chkrelation').text('');

		var relation = $('#relation').val().trim();

		let isValid = true;

		if (relation === '') {
			$('#chkrelation').text('* THIS FIELD IS REQUIRED');
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
					alert("ERROR: " + (response.message || "UNKNOWN ERROR OCCURRED."));
				}
			},
			error: function(xhr) {
				console.error('Error:', xhr.responseText);
				alert('FAILED TO SAVE RELATIVE DATA.');
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
									<button type="button" class="iconbutton" onclick="viewData(${item.id})" title="VIEW">
									<i class="fa-solid fa-pen-to-square text-primary"></i>
									</button>
								</td>
								<td>
									<button type="button" class="iconbutton ms-2" onclick="deleteData(${item.id})" title="DELETE">
										<i class="fa-solid fa-trash text-danger"></i>
									</button>
								</td>				                   
						</tr>`;
					tableBody.append(row);
				});
			} else {
				alert("FAILED TO FETCH RELATIVE DATA: " + response.message);
			}
		},
		error: function() {
			alert("ERROR WHILE CALLING THE API.");
		}
	});
});

function deleteData(id) {
	if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS RELATION?")) {
		$.ajax({
			url: "api/preference/deleteRelativeModuleById",
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
				alert("FAILED TO DELETE RELATIVE.");
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
				const rel = response.data;
				$("#id").val(rel.id);
				$("#relation").val(rel.relation);
			} else {
				alert("RELATIVE NOT FOUND: " + response.message);
			}
		},
		error: function(xhr) {
			alert("REQUEST FAILED: " + xhr.responseText);
		}
	});

}

function updateRelative() {
	convertFormToUpperCase();
	$('#chkrelation').text('');

	var relation = $('#relation').val().trim();

	let isValid = true;

	if (relation === '') {
		$('#chkrelation').text('* THIS FIELD IS REQUIRED');
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
				alert("RELATIVE UPDATED SUCCESSFULLY");
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

function convertFormToUpperCase() {
	$("#formid").find("input[type=text], input[type=date], textarea").each(function() {
		if ($(this).val()) {
			$(this).val($(this).val().toUpperCase());
		}
	});
}