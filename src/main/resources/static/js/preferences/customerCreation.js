$(document).ready(function() {

    $("#saveUserBtn").click(function(e) {
        e.preventDefault();

        // ✅ collect user data from form fields
        const user = {
            customerId: $("#customerId").val().trim(),
            password: $("#password").val().trim(),
            fullName: $("#fullName").val().trim(),
            email: $("#email").val().trim(),
            contactNo: $("#contactno").val().trim(),
            branchName: $("#branchName").val(),
            pastDate: $("#pastDate").val() === "1",
            rePrint: $("#rePrint").val() === "1",
            deleteAccess: $("#deleteAccess").val() === "1",
            userStatus: $("#toggle-user-status").is(":checked")
        };

        // ✅ Basic validation before sending
        if (!user.customerId || !user.password || !user.fullName) {
            alert("⚠️ Please fill all required fields before saving.");
            return;
        }

        // ✅ final payload as expected by backend
        const payload = {
            user: user,
            menuAccess: [] // keep empty for now; will add menus later
        };

        // ✅ AJAX request
        $.ajax({
            url: "api/preference/saveUserCreation",
            type: "POST",
            data: JSON.stringify(payload),
            contentType: "application/json",
            success: function(res) {
                console.log("Response:", res);
                if (res.status === "OK") {
                    alert("✅ User saved successfully! Now assign menu access.");
                    if (res.data && res.data.id) {
                        window.location.href = "customerMenuAccess?customerId=" + res.data.id;
                    }
                } else {
                    alert("⚠️ Error: " + (res.message || "Unknown error occurred."));
                }
            },
            error: function(xhr, status, error) {
                console.error("Error:", xhr.responseText);
                alert("❌ Server error occurred. Check console for details.");
            }
        });
    });

});