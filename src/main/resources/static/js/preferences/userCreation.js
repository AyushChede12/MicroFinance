let editUserId = null;

$(document).ready(function() {

	loadBranches();
	loadUserTable();

	// ================= Save New User =================
	$("#saveBtn").click(function(e) {
		e.preventDefault();

		const userId = $("#UserId").val().trim();
		const password = $("#password").val().trim();
		const fullName = $("#fullName").val().trim();
		const emailId = $("#emailId").val().trim();
		const contactNumber = $("#contactNo").val().trim();
		const singInBranch = $("#branchName").val();
		const pastDate = $("#pastDate").val();
		const rePrint = $("#rePrint").val();
		const deleteAccess = $("#deleteAccess").val();
		const userStatus = $("#toggle-user-status").is(":checked") ? "Active" : "Inactive";

		if (!userId) {
			alert("⚠️ PLEASE ENTER USER ID.");
			$("#UserId").focus();
			return;
		}

		if (!password) {
			alert("⚠️ PLEASE ENTER PASSWORD.");
			$("#password").focus();
			return;
		}

		if (!fullName) {
			alert("⚠️ PLEASE ENTER FULL NAME.");
			$("#fullName").focus();
			return;
		}

		if (!singInBranch) {
			alert("⚠️ PLEASE SELECT SIGN IN BRANCH.");
			$("#branchName").focus();
			return;
		}

		const userData = {
			userId: userId.toUpperCase(),
			password: password,
			fullName: fullName.toUpperCase(),
			emailId: emailId.toUpperCase(),
			contactNumber: contactNumber,
			singInBranch: singInBranch ? singInBranch.toUpperCase() : "",
			pastDate: pastDate ? pastDate.toUpperCase() : "NO",
			rePrint: rePrint ? rePrint.toUpperCase() : "NO",
			deleteAccess: deleteAccess ? deleteAccess.toUpperCase() : "NO",
			userStatus: userStatus
		};

		$.ajax({
			url: "api/userCreation/saveUser",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(userData),
			success: function(res) {
				alert(typeof res === "string" ? res.toUpperCase() : "USER SAVED SUCCESSFULLY!");
				$("#formid")[0].reset();
				$("#toggle-user-status").prop("checked", true);
				loadUserTable();
			},
			error: function(xhr) {
				console.error(xhr);
				alert("❌ ERROR SAVING USER!");
			}
		});
	});

	// ================= Update Existing User =================
	$("#updateBtn").click(function(e) {
		e.preventDefault();
		if (!editUserId) {
			alert("NO USER SELECTED TO UPDATE!");
			return;
		}

		const userId = $("#UserId").val().trim();
		const password = $("#password").val().trim();
		const fullName = $("#fullName").val().trim();
		const emailId = $("#emailId").val().trim();
		const contactNumber = $("#contactNo").val().trim();
		const singInBranch = $("#branchName").val();
		const pastDate = $("#pastDate").val();
		const rePrint = $("#rePrint").val();
		const deleteAccess = $("#deleteAccess").val();
		const userStatus = $("#toggle-user-status").is(":checked") ? "Active" : "Inactive";

		if (!userId || !password || !fullName) {
			alert("⚠️ PLEASE FILL ALL REQUIRED FIELDS BEFORE UPDATING.");
			return;
		}

		const userData = {
			id: editUserId,
			userId: userId.toUpperCase(),
			password: password,
			fullName: fullName.toUpperCase(),
			emailId: emailId.toUpperCase(),
			contactNumber: contactNumber,
			singInBranch: singInBranch ? singInBranch.toUpperCase() : "",
			pastDate: pastDate ? pastDate.toUpperCase() : "NO",
			rePrint: rePrint ? rePrint.toUpperCase() : "NO",
			deleteAccess: deleteAccess ? deleteAccess.toUpperCase() : "NO",
			userStatus: userStatus
		};

		$.ajax({
			url: `api/userCreation/updateUserManage/${editUserId}`,
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(userData),
			success: function(res) {
				alert(typeof res === "string" ? res.toUpperCase() : "USER UPDATED SUCCESSFULLY!");
				$("#formid")[0].reset();
				$("#toggle-user-status").prop("checked", true);
				editUserId = null;

				$("#updateBtn").hide();
				$("#saveBtn").show();
				loadUserTable();
			},
			error: function(xhr) {
				console.error(xhr);
				alert("ERROR UPDATING USER!");
			}
		});
	});

});

// ================= Load Branch Dropdown =================
function loadBranches() {
	$.ajax({
		url: "api/preference/getAllBranchModule",
		type: "GET",
		success: function(response) {
			if (response && response.status === "OK" && Array.isArray(response.data)) {
				const branchSelect = $("#branchName");
				branchSelect.empty().append("<option value=''>-- SELECT BRANCH --</option>");
				response.data.forEach(branch => {
					if (branch && branch.branchName) {
						const name = branch.branchName.toUpperCase();
						branchSelect.append(`<option value="${name}">${name}</option>`);
					}
				});
			}
		},
		error: function(xhr) {
			console.error("Failed to load branches:", xhr);
		}
	});
}

// ================= Load Table =================
function loadUserTable() {
	$.ajax({
		url: "api/userCreation/getAllUsers",
		type: "GET",
		dataType: "json",
		success: function(users) {
			let rows = "";
			if (users && users.length > 0) {
				users.forEach(function(user, index) {
					rows += `<tr>
                               <td>${index + 1}</td>
                               <td>${(user.userId || '').toUpperCase()}</td>
                               <td>${(user.fullName || '').toUpperCase()}</td>
                               <td>${(user.emailId || '').toUpperCase()}</td>
                               <td>${(user.contactNumber || '').toUpperCase()}</td>
                               <td>${(user.singInBranch || '').toUpperCase()}</td>
                               <td>${(user.pastDate || '').toUpperCase()}</td>
                               <td>${(user.rePrint || '').toUpperCase()}</td>
                               <td>${(user.deleteAccess || '').toUpperCase()}</td>
                               <td class="d-flex" style="gap:0.7rem;">
                                   <button class="iconbutton" onclick="editUser('${user.id}')" title="EDIT">
                                       <i class="fa-solid fa-pen-to-square text-success"></i>
                                   </button>
                                   <button class="iconbutton" onclick="deleteUser('${user.id}')" title="DELETE">
                                       <i class="fa-solid fa-trash text-danger"></i>
                                   </button>
                               </td>
                           </tr>`;
				});
			} else {
				rows = "<tr><td colspan='10' class='text-center'>NO USERS FOUND</td></tr>";
			}
			$("#userTable tbody").html(rows);
		},
		error: function(xhr) {
			console.error(xhr);
			alert("❌ ERROR LOADING USER TABLE!");
		}
	});
}

// ================= Edit User =================
function editUser(id) {
	$.ajax({
		url: `api/userCreation/editUserManageById/${id}`,
		type: "GET",
		success: function(user) {
			if (user) {
				$("#UserId").val((user.userId || '').toUpperCase());
				$("#password").val(user.password || '');
				$("#fullName").val((user.fullName || '').toUpperCase());
				$("#emailId").val((user.emailId || '').toUpperCase());
				$("#contactNo").val(user.contactNumber || '');
				$("#branchName").val((user.singInBranch || '').toUpperCase());
				$("#pastDate").val(user.pastDate ? user.pastDate.toUpperCase() : '');
				$("#rePrint").val(user.rePrint ? user.rePrint.toUpperCase() : '');
				$("#deleteAccess").val(user.deleteAccess ? user.deleteAccess.toUpperCase() : '');
				$("#toggle-user-status").prop("checked", user.userStatus === "Active");

				editUserId = user.id;
				$("#updateBtn").show();
				$("#saveBtn").hide();
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		},
		error: function(xhr) {
			console.error(xhr);
			alert("ERROR FETCHING USER DATA!");
		}
	});
}

// ================= Delete User =================
function deleteUser(id) {
	if (!confirm("ARE YOU SURE YOU WANT TO DELETE THIS USER?")) {
		return;
	}

	$.ajax({
		type: "POST",
		url: "api/userCreation/deleteUserManageById",
		contentType: "application/json",
		data: JSON.stringify({ id: id }),
		success: function(response) {
			alert(typeof response === "string" ? response.toUpperCase() : "USER DELETED SUCCESSFULLY!");
			loadUserTable();
		},
		error: function(err) {
			alert("ERROR DELETING USER!");
		}
	});
}