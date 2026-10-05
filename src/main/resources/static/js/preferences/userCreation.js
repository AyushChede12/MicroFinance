$(document).ready(function() {

    loadUserTable(); // Load table on page load

    // ================= Save New User =================
    $("#saveBtn").click(function(e) {
        e.preventDefault();

        const userData = {
            userId: $("#UserId").val(),
            password: $("#password").val(),
            fullName: $("#fullName").val(),
            emailId: $("#emailId").val(),
            contactNumber: $("#contactNo").val(),
            singInBranch: $("#branchName").val(),
            pastDate: $("#pastDate").val(),
            rePrint: $("#rePrint").val(),
            deleteAccess: $("#deleteAccess").val(),
            userStatus: $("#toggle-member-status").is(":checked") ? "Active" : "Inactive"
        };

        $.ajax({
            url: "api/userCreation/saveUser",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(userData),
            success: function(res){
                alert(res);
                $("#formid")[0].reset();
                $("#toggle-member-status").prop("checked", true);
                loadUserTable(); // reload table
            },
            error: function(xhr){
                console.error(xhr);
                alert("❌ Error saving user!");
            }
        });
    });

    // ================= Update Existing User =================
    $("#updateBtn").click(function(e){
        e.preventDefault();
        if(!editUserId) return alert("No user selected to update!");

        const userData = {
            userId: $("#UserId").val(),
            password: $("#password").val(),
            fullName: $("#fullName").val(),
            emailId: $("#emailId").val(),
            contactNumber: $("#contactNo").val(),
            singInBranch: $("#branchName").val(),
            pastDate: $("#pastDate").val(),
            rePrint: $("#rePrint").val(),
            deleteAccess: $("#deleteAccess").val(),
            userStatus: $("#toggle-member-status").is(":checked") ? "Active" : "Inactive"
        };

        $.ajax({
            url: `api/userCreation/updateUserManage/${editUserId}`,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(userData),
            success: function(res){
                alert(res);
                $("#formid")[0].reset();
                $("#toggle-member-status").prop("checked", true);
                editUserId = null;

                $("#updateBtn").hide(); // hide Update button after update
                $("#saveBtn").show();   // show Save button for new users
                loadUserTable();
            },
            error: function(xhr){
                console.error(xhr);
                alert("Error updating user!");
            }
        });
    });

    // ================= Load Table =================
    function loadUserTable(){
        $.ajax({
            url: "api/userCreation/getAllUsers",
            type: "GET",
            dataType: "json",
            success: function(users){
                let rows = "";
                if(users && users.length > 0){
                    users.forEach(function(user,index){
                        rows += `<tr>
                                    <td>${index+1}</td>
                                    <td>${user.userId}</td>
                                    <td>${user.fullName}</td>
                                    <td>${user.emailId}</td>
                                    <td>${user.contactNumber}</td>
                                    <td>${user.singInBranch}</td>
                                    <td>${user.pastDate}</td>
                                    <td>${user.rePrint}</td>
                                    <td>${user.deleteAccess}</td>
                                    <td class="d-flex" style="gap:0.7rem;">
                                        <button class="iconbutton" onclick="deleteUser('${user.id}')" title="Delete">
                                            <i class="fa-solid fa-trash text-danger"></i>
                                        </button>
                                        <button class="iconbutton" onclick="editUser('${user.id}')" title="Edit">
                                            <i class="fa-solid fa-pen-to-square text-success"></i>
                                        </button>
                                    </td>
                                </tr>`;
                    });
                } else {
                    rows = "<tr><td colspan='10'>No users found</td></tr>";
                }
                $("#userTable tbody").html(rows);
            },
            error: function(xhr){
                console.error(xhr);
                alert("❌ Error loading user table!");
            }
        });
    }

    /*// ================= Load Branch Dropdown =================
    $.ajax({
        url: "api/preference/getAllBranchModule",
        type: "GET",
        success: function(response){
            if(response.status == "FOUND"){
                const branchList = response.data;
                $("#branchName1").empty().append("<option value=''>-- Select Branch --</option>");
                branchList.forEach(branch => {
                    $("#branchName1").append(`<option value="${branch.branchName}">${branch.branchName}</option>`);
                });
            } else {
                alert("Error: "+response.message);
            }
        },
        error: function(xhr){
            console.error(xhr.responseText);
            alert("Failed to load dropdown data.");
        }
    });*/

});

//edit the data
function editUser(id){
    $.ajax({
        url: `api/userCreation/editUserManageById/${id}`,
        type: "GET",
        success: function(user){
            $("#UserId").val(user.userId);
            $("#password").val(user.password);
            $("#fullName").val(user.fullName);
            $("#emailId").val(user.emailId);
            $("#contactNo").val(user.contactNumber);
            $("#branchName").val(user.singInBranch);
            $("#pastDate").val(user.pastDate);
            $("#rePrint").val(user.rePrint);
            $("#deleteAccess").val(user.deleteAccess);
            $("#toggle-member-status").prop("checked", user.userStatus === "Active");

            // Set edit ID and toggle buttons
            editUserId = user.id;
            $("#updateBtn").show();
            $("#saveBtn").hide();
			
        },
        error: function(xhr){
            console.error(xhr);
            alert("Error fetching user data!");
        }
    });
}

//delete data
function deleteUser(id) {
    if (!confirm("Are you sure you want to delete this user?")) {
        return;
    }

    $.ajax({
        type: "POST",
        url: "api/userCreation/deleteUserManageById",
        contentType: "application/json",
        data: JSON.stringify({ id: id }),
        success: function(response) {
            alert("User Deleted Successfully!");
             location.reload(); 
        },
        error: function(err) {
            alert("Error deleting user!");
        }
    });
}