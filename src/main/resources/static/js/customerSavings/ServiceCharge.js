
let allServiceData = [];


function getDateRange(option) {
    let today = new Date();
    let startDate, endDate;

    switch (option) {
        case "today":
            startDate = endDate = today;
            break;

        case "yesterday":
            let y = new Date();
            y.setDate(today.getDate() - 1);
            startDate = endDate = y;
            break;

        case "last7":
            let s7 = new Date();
            s7.setDate(today.getDate() - 6); 
            startDate = s7;
            endDate = today;
            break;

        case "last30":
            let s30 = new Date();
            s30.setDate(today.getDate() - 29); 
            startDate = s30;
            endDate = today;
            break;

        case "thisMonth":
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            endDate = today;
            break;

        case "lastMonth":
            startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            endDate = new Date(today.getFullYear(), today.getMonth(), 0);
            break;

        default:
            startDate = endDate = today;
    }

    return {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0]
    };
}


$("#searchServiceChargeBtn").click(function () {

    const selected = $("#byDate").val();

    if (!selected) {
        alert("Please select a date range!");
        return;
    }

    const { startDate, endDate } = getDateRange(selected);

    const reqBody = { startDate, endDate };

    $.ajax({
        url: "api/customersavings/getServiceChargeData",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(reqBody),

        success: function (resp) {
            if (resp.status === "OK" && Array.isArray(resp.data) && resp.data.length > 0) {
                allServiceData = resp.data;
                loadServiceTable(allServiceData);
            } else {
                $("#serviceTableBody").html(`
                    <tr><td colspan="6" class="text-center">No Records Found</td></tr>
                `);
            }
        },

        error: function (xhr) {
            alert("Error fetching records: " + xhr.responseText);
        }
    });
});


function loadServiceTable(data) {
    let rows = "";
    let index = 1;

    data.forEach(acc => {
        rows += `
            <tr>
                <td>${index}</td>
                <td>${acc.accountNumber}</td>
                <td>${acc.openingDate}</td>
                <td class="balance">${acc.balance}</td>
                <td>${acc.messageSend === "1" ? "Enabled" : "Disabled"}</td>
                <td>
                    <button class="apply-service-btn btn btn-sm btn-warning" data-id="${acc.id}">
                        Apply
                    </button>
                </td>
            </tr>
        `;
        index++;  // <-- Yaha increment karna jaruri hai
    });

    $("#serviceTableBody").html(rows);
}


   

$(document).on("click", ".apply-service-btn", function () {

    const row = $(this).closest("tr");
    const id = $(this).data("id");

    console.log("CLICKED ID:", id);

    if (!confirm("Are you sure you want to deduct service charges?")) return;

    $.ajax({
        url: "api/customersavings/deduct-service-charges",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ id: id }),

        success: function (response) {

            console.log("API RESPONSE:", response);

            if (response.status === "OK" && response.newBalance !== undefined) {

                const newBalance = response.newBalance;

                row.find(".balance").text(newBalance.toFixed(2));

               
                alert("Service Charge Successfully Deducted!\nNew Balance: " + newBalance);

                return;
            }

            alert("Failed: " + (response.message || "Unknown error"));
        },

        error: function (xhr) {
            console.error("ERROR:", xhr.responseText);
            alert("Error applying service charges");
        }
    });
});
