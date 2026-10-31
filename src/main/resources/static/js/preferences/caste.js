$(document).ready(function() {

	$("#saveBtn").click(function() {

		$('#chkcaste').text('');

		var caste = $('#caste').val().trim();

		let isValid = true;

		if (caste === '') {
			$('#chkcaste').text('* THIS FIELD IS REQUIRED');
			$('#caste').focus();
			isValid = false;
		}

		if (!isValid) {
			return false; // Stop AJAX call
		}

		const formData = {
			caste: $('input[name="caste"]').val()
		};

		$.ajax({
			url: 'api/preference/saveCasteModule',
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
				alert('FAILED TO SAVE CASTE DATA.');
			}
		});
	});

	$.ajax({
		type: "GET",
		url: "api/preference/getAllCasteModule",
		contentType: "application/json",
		success: function(response) {
			console.log("Full Response from API:", response);
			if (response.status == "FOUND") {
				let data = response.data;

				// Reverse the array to show latest items on top
				data.reverse(); // 🔁 This makes sure latest is first

				let tableBody = $(".datatable tbody");
				tableBody.empty();

				data.forEach((item, index) => {
					let row = `<tr>
						<td>${index + 1}</td>
						<td>${(item.caste || '').toUpperCase()}</td>
						<td>
							<button type="button" class="iconbutton" onclick="editData('${item.caste}')" title="EDIT">
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
				alert("FAILED TO FETCH CASTE DATA: " + response.message);
			}
		},
		error: function() {
			alert("ERROR WHILE CALLING THE API.");
		}
	});

});

function editData(casteVal) {
	$("#caste").val((casteVal || '').toUpperCase());
	$("#caste").focus();
}

function deleteData(id) {
	if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS CASTE?")) {
		$.ajax({
			url: "api/preference/deleteCasteModuleById",
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
				alert("FAILED TO DELETE CASTE.");
				console.error("Error:", error);
			}
		});
	}
}