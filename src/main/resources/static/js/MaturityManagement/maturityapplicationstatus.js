let allData = [];

$(document).ready(function() {
    loadedData();

    $('#searchBtn').on('click', function(e) {
        e.preventDefault();
        filterDailyData();
    });
});

function loadedData() {
    $.ajax({
        url: "api/Maturitymanagement/getApplymaturitydetails",
        type: "GET",
        success: function (response) {
            console.log("Response received:", response);

            if (response.status === "OK" && response.data) {
                allData = response.data;
                renderTable(allData);
            } else {
                alert("No maturity details found.");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error fetching maturity details:", error);
            console.log("XHR:", xhr.responseText);
            alert("Failed to load maturity details.");
        }
    });
}

function renderTable(data) {
    const tbody = $("#table tbody");
    tbody.empty();

    if (!data || data.length === 0) {
        const noDataRow = `
            <tr>
                <td colspan="12" style="text-align:center; font-family: 'Poppins', sans-serif;">
                    No data found
                </td>
            </tr>
        `;
        tbody.append(noDataRow);
        return;
    }

    data.forEach((item, index) => {
        const row = `
            <tr style="font-family: 'Poppins', sans-serif;">  
                <td>${index + 1}</td>
                <td>${item.branchName}</td>
                <td>${item.policyCode}</td>
                <td>${item.maturityDate}</td>
                <td>${item.customerName}</td>
                <td>${item.schemeName}</td>
                <td>${item.schemeType}</td>
                <td>${item.policyAmount}</td>
                <td>${item.depositAmount}</td>
            </tr>
        `;
        tbody.append(row);
    });
}

function filterDailyData() {
    const selectedCode = $('#branchName').val();
    const fromDateVal = $('#fromDate').val();
    const toDateVal = $('#toDate').val();

    const fromDate = fromDateVal ? new Date(fromDateVal) : null;
    const toDate = toDateVal ? new Date(toDateVal) : null;

    const filtered = allData.filter(item => {
        const branchName = item.branchName;
        const maturityDate = item.maturityDate ? new Date(item.maturityDate) : null;

        const matchesBranch = selectedCode ? branchName === selectedCode : true;
        const matchesFrom = fromDate && maturityDate ? maturityDate >= fromDate : true;
        const matchesTo = toDate && maturityDate ? maturityDate <= toDate : true;

        return matchesBranch && matchesFrom && matchesTo;
    });

    console.log("Filtered Data:", filtered);
    renderTable(filtered);
}
