$(document).ready(function() {
	loadDesignationList();
});

// Load Designation List
function loadDesignationList() {
	$.ajax({
		url: "api/teammember/getDesignationList",
		type: "GET",
		contentType: "application/json",
		success: function(data) {
			const list = data || [];
			if (list.length === 0) {
				$("#tableBody").html('<tr><td colspan="3" class="text-center text-muted">NO DESIGNATIONS FOUND</td></tr>');
				return;
			}

			let rows = "";
			$.each(list, function(index, item) {
				const dName = (item.designationName || "").toUpperCase();
				rows += `
					<tr style="font-family: 'Poppins', sans-serif;">
						<th scope="row">${index + 1}</th>
						<td><strong>${dName}</strong></td>
						<td>
							<button type="button" class="btn btn-sm btn-outline-danger" 
								onclick="deleteDesignation(${item.id}, '${dName}')" title="DELETE DESIGNATION">
								<i class="bi bi-trash"></i> DELETE
							</button>
						</td>
					</tr>
				`;
			});
			$("#tableBody").html(rows);
		},
		error: function(xhr, status, error) {
			console.error("Error fetching designations:", error);
			$("#tableBody").html('<tr><td colspan="3" class="text-center text-danger">FAILED TO LOAD DESIGNATION DATA</td></tr>');
		}
	});
}

// Save Designation
function saveDesignation() {
	if (!validateDesignationForm()) {
		return false;
	}

	const desigName = $("#designationName").val().trim().toUpperCase();
	const formData = {
		designationName: desigName
	};

	$.ajax({
		type: "POST",
		url: "api/teammember/saveDesignation",
		contentType: "application/json",
		data: JSON.stringify(formData),
		success: function(response) {
			alert("DESIGNATION SAVED SUCCESSFULLY");
			$("#designationName").val("");
			$("#chkdesignationname").text("");
			loadDesignationList();
		},
		error: function(xhr) {
			alert("ERROR: " + (xhr.responseText || "FAILED TO SAVE DESIGNATION"));
		}
	});
}

// Delete Designation
function deleteDesignation(id, name) {
	if (confirm("ARE YOU SURE YOU WANT TO DELETE DESIGNATION: " + name + "?")) {
		$.ajax({
			url: "api/teammember/deleteDesignation?id=" + encodeURIComponent(id),
			type: "DELETE",
			success: function(res) {
				alert("DESIGNATION DELETED SUCCESSFULLY");
				loadDesignationList();
			},
			error: function() {
				alert("FAILED TO DELETE DESIGNATION.");
			}
		});
	}
}

// Validation Function
function validateDesignationForm() {
	$("#chkdesignationname").text("");
	let designationName = $("#designationName").val().trim();

	if (designationName === "") {
		$("#chkdesignationname").text("* DESIGNATION NAME IS REQUIRED");
		$("#designationName").focus();
		return false;
	}

	let namePattern = /^[A-Za-z0-9 ]+$/;
	if (!namePattern.test(designationName)) {
		$("#chkdesignationname").text("* ONLY ALPHANUMERIC CHARACTERS AND SPACES ALLOWED");
		$("#designationName").focus();
		return false;
	}

	return true;
}
