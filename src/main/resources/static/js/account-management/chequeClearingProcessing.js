$(document).ready(function() {

    // 🔹 Loan Type Dropdown
    $.ajax({
        url: "api/datacorrection/fetchAllApprovedLoanApplications",
        type: "GET",
        success: function(response) {
            console.log("API response:", response);
            var dropdown1 = $('#typeOfLoan');
            dropdown1.empty();
            dropdown1.append('<option value="">--SELECT LOAN TYPE--</option>');

            if (response.status === "OK" && response.data) {
                $.each(response.data, function(index, item) {
                    dropdown1.append('<option value="' + item.typeOfLoan + '">' + item.typeOfLoan.toUpperCase() + '</option>');
                });
            } else {
                dropdown1.append('<option value="">NO LOAN TYPE FOUND</option>');
            }
        },
        error: function() {
            alert("FAILED TO FETCH LOAN TYPE.");
        }
    });

    // 🔹 Page load: Pending Cheques
    loadPendingCheques();

    // 🔹 Search Button Click
    $("#searchBtn").click(function() {

        if (!$("#typeOfLoan").val() || !$("#branchName").val() || !$("#startDate").val()
            || !$("#endDate").val() || !$("#chequeNo").val()) {
            alert("⚠️ PLEASE FILL ALL FIELDS BEFORE SEARCHING.");
            return;
        }

        $.ajax({
            url: "accountManagement/search",
            type: "POST",
            data: {
                typeOfLoan: $("#typeOfLoan").val(),
                branchName: $("#branchName").val(),
                startDate: $("#startDate").val(),
                endDate: $("#endDate").val(),
                chequeNo: $("#chequeNo").val()
            },
            success: function(response) {
                console.log("Search Response:", response);
                bindChequeTable(response);
            },
            error: function() {
                alert("SERVER ERROR WHILE SEARCHING CHEQUE.");
            }
        });
    });

});

// 🔹 Load Pending Cheques (On Page Load)
function loadPendingCheques() {
    $.ajax({
        url: "accountManagement/allPendingCheques",
        type: "GET",
        success: function(response) {
            console.log("Pending Cheques:", response);
            bindChequeTable(response);
        },
        error: function() {
            alert("ERROR WHILE LOADING PENDING CHEQUES.");
        }
    });
}

// 🔹 Clear Cheque (Pending → Paid)
function clearCheque(id) {
    if (!confirm("ARE YOU SURE YOU WANT TO CLEAR THIS CHEQUE?")) return;

    $.ajax({
        url: "accountManagement/clear",
        type: "POST",
        data: { id: id },
        success: function(res) {
            if (res.status === "OK") {
                alert(res.message);

                // 🔁 Refresh Pending List after clear
                loadPendingCheques();
            } else {
                alert(res.message);
            }
        },
        error: function() {
            alert("SERVER ERROR WHILE CLEARING CHEQUE.");
        }
    });
}

// 🔹 Bind Table
function bindChequeTable(response) {
    let tbody = $(".datatable tbody");
    tbody.empty();

    if (response.status === "FOUND" || response.status === "OK") {

        if (!response.data || response.data.length === 0) {
            tbody.append(`
                <tr>
                    <td colspan="11" class="text-center text-danger">
                        NO CHEQUE RECORDS FOUND.
                    </td>
                </tr>
            `);
            return;
        }

        $.each(response.data, function(i, item) {

            let disableBtn = item.paymentStatus === "PAID" ? "disabled" : "";

            let row = `
                <tr>
                    <td>${item.id}</td>
                    <td>${(item.memberName || '').toUpperCase()}</td>
                    <td>${(item.loanMode || '').toUpperCase()}</td>
                    <td>${item.chequeNo || ''}</td>
                    <td>${item.chequeDate || ''}</td>
                    <td>${item.amountDue || ''}</td>
                    <td>${(item.branchName || '').toUpperCase()}</td>
                    <td>${(item.typeOfLoan || '').toUpperCase()}</td>
                    <td>${(item.paymentStatus || '').toUpperCase()}</td>
                    <td>
                        <div class="d-flex">
                            <button class="btn btn-success btn-sm" ${disableBtn} onclick="clearCheque(${item.id})">CLEAR</button>
                            <button class="btn btn-danger btn-sm ml-2" ${disableBtn} onclick="bounceCheque(${item.id})">BOUNCE</button>
                        </div>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });

    } else {
        tbody.append(`
            <tr>
                <td colspan="11" class="text-center text-danger">
                    NO CHEQUE RECORDS FOUND.
                </td>
            </tr>
        `);
    }
}

function bounceCheque(id) {
    if (!confirm("ARE YOU SURE YOU WANT TO BOUNCE THIS CHEQUE?")) return;

    $.ajax({
        url: "accountManagement/bounce",
        type: "POST",
        data: { id: id },
        success: function(res) {
            if (res.status === "OK") {
                alert(res.message);

                // 🔁 Refresh Pending List after bounce
                loadPendingCheques();
            } else {
                alert(res.message);
            }
        },
        error: function() {
            alert("SERVER ERROR WHILE BOUNCING CHEQUE.");
        }
    });
}