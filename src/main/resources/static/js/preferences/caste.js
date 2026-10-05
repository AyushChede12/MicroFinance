$(document).ready(function() {

	$("#saveBtn").click(function() {

		$('#chkcaste').text('');

		var caste = $('#caste').val().trim();

		let isValid = true;

		if (caste === '') {
			$('#chkcaste').text('* This field is required');
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
					alert("Error: " + (response.message || "Unknown error occurred."));
				}
			},
			error: function(xhr) {
				console.error('Error:', xhr.responseText);
				alert('Failed to save Caste data.');
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
						<td>${item.caste}</td>
						<td>
							<button class="iconbutton" onclick="deleteData(${item.id})" title="Delete">
								<i class="fa-solid fa-trash text-danger"></i>
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
				alert("Failed to fetch Caste data: " + response.message);
			}
		},
		error: function() {
			alert("Error while calling the API.");
		}
	});

});

function deleteData(id) {
	if (confirm("Are you sure you want to delete this Caste?")) {
		$.ajax({
			url: "api/preference/deleteCasteModuleById",
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
				alert("Failed to delete Caste.");
				console.error("Error:", error);
			}
		});
	}
}