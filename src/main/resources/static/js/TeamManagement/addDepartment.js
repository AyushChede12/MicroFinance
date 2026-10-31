$(document).ready(function() {
	loadDepartmentList();
});

// Load Department List
function loadDepartmentList() {
	$.ajax({
		url: "api/teammember/getDepartmentList",
		type: "GET",
		contentType: "application/json",
		success: function(data) {
			const list = data || [];
			if (list.length === 0) {
				$("#departmentTableBody").html('<tr><td colspan="3" class="text-center text-muted">NO DEPARTMENTS FOUND</td></tr>');
				return;
			}

			let rows = "";
			$.each(list, function(index, item) {
				const depName = (item.departmentName || "").toUpperCase();
				rows += `
					<tr style="font-family: 'Poppins', sans-serif;">
						<th scope="row">${index + 1}</th>
						<td><strong>${depName}</strong></td>
						<td>
							<button type="button" class="btn btn-sm btn-outline-danger" 
								onclick="deleteDepartment(${item.id}, '${depName}')" title="DELETE DEPARTMENT">
								<i class="bi bi-trash"></i> DELETE
							</button>
						</td>
					</tr>
				`;
			});
			$("#departmentTableBody").html(rows);
		},
		error: function(xhr, status, error) {
			console.error("Error fetching departments:", error);
			$("#departmentTableBody").html('<tr><td colspan="3" class="text-center text-danger">FAILED TO LOAD DEPARTMENT DATA</td></tr>');
		}
	});
}

// Save Department
function saveDepartment() {
	$("#chkdepartmentname").text("");
	const depName = $("#departmentName").val().trim().toUpperCase();

	if (!depName) {
		$("#chkdepartmentname").text("* DEPARTMENT NAME IS REQUIRED");
		$("#departmentName").focus();
		return false;
	}

	const namePattern = /^[A-Za-z0-9 ]+$/;
	if (!namePattern.test(depName)) {
		$("#chkdepartmentname").text("* ONLY ALPHANUMERIC CHARACTERS AND SPACES ALLOWED");
		$("#departmentName").focus();
		return false;
	}

	const formData = {
		departmentName: depName
	};

	$.ajax({
		type: "POST",
		url: "api/teammember/saveDepartment",
		contentType: "application/json",
		data: JSON.stringify(formData),
		success: function(response) {
			alert("DEPARTMENT SAVED SUCCESSFULLY");
			$("#departmentName").val("");
			$("#chkdepartmentname").text("");
			loadDepartmentList();
		},
		error: function(xhr, status, error) {
			alert("ERROR: " + (xhr.responseText || "FAILED TO SAVE DEPARTMENT"));
		}
	});
}

// Delete Department
function deleteDepartment(id, name) {
	if (confirm("ARE YOU SURE YOU WANT TO DELETE DEPARTMENT: " + name + "?")) {
		$.ajax({
			url: "api/teammember/deleteDepartment?id=" + encodeURIComponent(id),
			type: "DELETE",
			success: function(res) {
				alert("DEPARTMENT DELETED SUCCESSFULLY");
				loadDepartmentList();
			},
			error: function() {
				alert("FAILED TO DELETE DEPARTMENT.");
			}
		});
	}
}
