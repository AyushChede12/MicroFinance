$(document).ready(function() {
	$("#updateBtn").hide();
	$("#saveBtn").click(function() {
		convertFormToUpperCase();

		$('#chkcategory').text('');
		$('#chkcaste').text('');

		var category = $('#category').val().trim();
		var caste = $('#caste').val().trim();

		let isValid = true;

		if (category === '') {
			$('#chkcategory').text('* This field is required');
			$('#category').focus();
			isValid = false;
		}

		if (caste === '') {
			$('#chkcaste').text('* This field is required');
			$('#caste').focus();
			isValid = false;
		}

		if (!isValid) {
			return false; // Stop AJAX call
		}

		const formData = {
			category: $('input[name="category"]').val(),
			caste: $('input[name="caste"]').val()
		};

		$.ajax({
			url: 'api/preference/saveCategoryModule',
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
				alert('Failed to save Category data.');
			}
		});
	});


});

function deleteData(id) {
	if (confirm("Are you sure you want to delete this Category?")) {
		$.ajax({
			url: "api/preference/deleteCategoryModuleById",
			type: "POST",
			data: { id: id },
			success: function(response) {
				if (response.status = "OK") {
					alert("Category Deleted Successfully");
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

function viewData(id) {
	$("#updateBtn").show();
	$("#saveBtn").hide();
	$.ajax({
		url: "api/preference/getCategoryById",
		type: "GET",
		data: { id: id },
		success: function(response) {
			if (response.status == "FOUND") {
				const category = response.data;
				$("#id").val(category.id);
				$("#category").val(category.category);
				$("#caste").val(category.caste);
			} else {
				alert("Branch not found: " + response.message);
			}
		},
		error: function(xhr) {
			alert("Request failed: " + xhr.responseText);
		}
	});


}

function updateCategory() {
	convertFormToUpperCase();

	$('#chkcategory').text('');
	$('#chkcaste').text('');

	var category = $('#category').val().trim();
	var caste = $('#caste').val().trim();

	let isValid = true;

	if (category === '') {
		$('#chkcategory').text('* This field is required');
		$('#category').focus();
		isValid = false;
	}

	if (caste === '') {
		$('#chkcaste').text('* This field is required');
		$('#caste').focus();
		isValid = false;
	}

	if (!isValid) {
		return false; // Stop AJAX call
	}

	let payload = {
		id: $("#id").val(),
		category: $("#category").val(),
		caste: $("#caste").val()
	};

	$.ajax({
		url: "api/preference/saveCategoryModule",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(payload),
		success: function(response) {
			if (response.status == "OK") {
				alert("Category and Caste Updated Successfully");
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

let allCategoryData = []; // store all data globally after AJAX fetch

function loadCategoryData() {
	$.ajax({
		type: "GET",
		url: "api/preference/getAllCategoryModule",
		contentType: "application/json",
		success: function(response) {
			console.log("Full Response from API:", response);
			if (response.status == "FOUND") {
				allCategoryData = response.data || [];
				renderCategoryTable(allCategoryData);
			} else {
				alert("Failed to fetch Category data: " + response.message);
			}
		},
		error: function() {
			alert("Error while calling the API.");
		}
	});
}

function renderCategoryTable(data) {
	let tableBody = $(".datatable tbody");
	tableBody.empty();
	data.forEach((item, index) => {
		let row = `<tr>
                        <td>${index + 1}</td>
                        <td>${(item.category || '').toUpperCase()}</td>
                        <td>${(item.caste || '').toUpperCase()}</td>
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
}

// Live search
$('#searchCategory').on('keyup', function() {
	let searchValue = $(this).val().toLowerCase();
	let filteredData = allCategoryData.filter(item => {
		return (item.category || '').toLowerCase().includes(searchValue) ||
			(item.caste || '').toLowerCase().includes(searchValue);
	});
	renderCategoryTable(filteredData);
});

// Initial load
$(document).ready(function() {
	loadCategoryData();
});
