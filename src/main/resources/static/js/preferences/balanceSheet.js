let allTransactions = [];

$("#searchAllBranch").click(function () {
    $.ajax({
        type: "GET",
        url: "api/preference/fetchAllTransactions",
        success: function (response) {
            if (response.status === "FOUND") {	
                allTransactions = response.data;
                renderTable(allTransactions);
            }
        }
    });
});

$("#searchBranch").click(function () {
    let branchName = $("#branchName").val().trim().toLowerCase();
    if (branchName === "") {
        alert("Please enter a branch name to search.");
        return;
    }

    let filtered = allTransactions.filter(tx =>
        tx.branchName.toLowerCase().includes(branchName)
    );
    renderTable(filtered);
});

function renderTable(data) {
    let tableBody = $(".datatable tbody");
    tableBody.empty();

    if (data.length === 0) {
        tableBody.append(`<tr><td colspan="6">No records found</td></tr>`);
        return;
    }

    data.reverse().forEach((item, index) => {
        let row = `<tr>
            <td>${index + 1}</td>
            <td>${item.branchName}</td>
            <td>${item.transactionDate}</td>
            <td>${item.customerCode}</td>
            <td>${item.amount}</td>
            <td>${item.modeOfPayment}</td>
        </tr>`;
        tableBody.append(row);
    });
}
