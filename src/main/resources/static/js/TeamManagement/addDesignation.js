// ============================================
// ✅ DOCUMENT READY – LOAD DESIGNATION LIST
// ============================================
$(document).ready(function () {

    loadDesignationList();

});


// ============================================
// ✅ LOAD DESIGNATION LIST
// ============================================
function loadDesignationList() {

    $.ajax({
        url: "api/teammember/getDesignationList",
        type: "GET",
        contentType: "application/json",
        success: function (data) {

            var tbody = $(".datatable tbody");
            tbody.empty();

            $.each(data, function (index, item) {
                var row = `
                    <tr style="font-family: 'Poppins', sans-serif;">
                        <th scope="row">${index + 1}</th>
                        <td>${item.designationName || ''}</td>
                    </tr>`;
                tbody.append(row);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error fetching data:", error);
            alert("Failed to load Designation data");
        }
    });
}


// ============================================
// ✅ SAVE DESIGNATION
// ============================================
function saveDesignation() {

    // 🔴 IMPORTANT: Validation call
    if (!validateDesignationForm()) {
        return false;   // ⛔ Stop execution
    }

    const formData = {
        designationName: $("#designationName").val()
    };

    $.ajax({
        type: "POST",
        url: "api/teammember/saveDesignation",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (response) {

            alert("Designation Saved Successfully");

            // clear input
            $("#designationName").val("");

            // reload table
            loadDesignationList();
        },
        error: function (xhr) {
            alert("Error: " + xhr.responseText);
        }
    });
}


// ============================================
// ✅ DESIGNATION VALIDATION FUNCTION
// ============================================
function validateDesignationForm() {

    // clear error
    $("#chkdesignationname").text("");

    let designationName = $("#designationName").val();

    // ==========================
    // ✅ Required Validation
    // ==========================
    if (designationName === "") {
        $("#chkdesignationname").text("* Designation Name is required");
        $("#designationName").focus();
        return false;
    }

    // ==========================
    // ✅ Alphabets only
    // ==========================
    let namePattern = /^[A-Za-z ]+$/;
    if (!namePattern.test(designationName)) {
        $("#chkdesignationname").text("* Only alphabets allowed");
        $("#designationName").focus();
        return false;
    }

    return true;
}
