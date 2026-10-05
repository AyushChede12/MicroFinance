let allMaturityData = [];

$(document).ready(function () {

    loadBranchDropdown();
    loadAllData();

    $("#findBtn").click(function () {
        applyFilters();
    });

});


// ===============================
// LOAD BRANCH DROPDOWN
// ===============================
function loadBranchDropdown() {

    $.ajax({
        url: "api/Maturitymanagement/getApplymaturitydetails",
        type: "GET",
        success: function (response) {

            if (response.status === "OK") {

                const uniqueBranches = new Set();

                response.data.forEach(item => {
                    if (item.branchName) {
                        uniqueBranches.add(item.branchName.trim());
                    }
                });

                $("#branchName").empty();
                $("#branchName").append("<option value=''>-- Select Branch --</option>");

                uniqueBranches.forEach(branch => {
                    $("#branchName").append(
                        `<option value="${branch}">${branch}</option>`
                    );
                });

            } else {

                alert("Error : " + response.message);

            }

        },
        error: function () {
            alert("Branch loading failed");
        }
    });

}


// ===============================
// LOAD ALL DATA
// ===============================
function loadAllData() {

    $.ajax({
        url: "api/Maturitymanagement/getApplymaturitydetails",
        type: "GET",

        success: function (response) {

            if (response.status === "OK") {

                allMaturityData = response.data;
                renderTable(allMaturityData);

            } else {

                alert("⚠️ " + response.message);

            }

        },
        error: function () {

            alert("Failed to load maturity data.");

        }
    });

}


// ===============================
// TABLE RENDER
// ===============================
function renderTable(data) {

    let tbody = $(".datatable tbody");
    tbody.empty();

    if (data.length === 0) {

        tbody.append(`<tr>
            <td colspan="10" class="text-center">No Records Found</td>
        </tr>`);

        return;
    }

    data.forEach(function (item, index) {

        let row = `
        <tr>
            <td>${index + 1}</td>
            <td>${item.customerName || ''}</td>
            <td>${item.branchName || ''}</td>
            <td>${item.policyCode || ''}</td>
            <td>${item.policyAmount || ''}</td>
            <td>${item.maturityDate || ''}</td>
            <td>${item.maturityAmount || ''}</td>
            <td>${item.depositAmount || ''}</td>
            <td>${item.schemeName || ''}</td>
            <td>
                <button class="iconbutton" onclick="viewData(${index})">
                    <i class="bi bi-printer" style="color:green;"></i>
                </button>
            </td>
        </tr>
        `;

        tbody.append(row);

    });

}


// ===============================
// FILTER FUNCTION
// ===============================
function applyFilters() {

    let branchName = $("#branchName").val();
    let fromDate = $("#fromDate").val();
    let toDate = $("#toDate").val();

    let filteredData = allMaturityData.filter(item => {

        let match = true;

        if (branchName && item.branchName !== branchName) {
            match = false;
        }

        if (fromDate) {

            let itemDate = new Date(item.maturityDate);
            let startDate = new Date(fromDate);

            if (itemDate < startDate) {
                match = false;
            }

        }

        if (toDate) {

            let itemDate = new Date(item.maturityDate);
            let endDate = new Date(toDate);

            if (itemDate > endDate) {
                match = false;
            }

        }

        return match;

    });

    renderTable(filteredData);

}


// ===============================
// PRINT FUNCTION
// ===============================
function viewData(index) {

    let data = allMaturityData[index];

    let printWindow = window.open('', '', 'width=900,height=700');

    printWindow.document.write(`

        <html>

        <head>

            <title>Maturity Status Report</title>

            <style>

                body{
                    font-family:Arial;
                    padding:20px;
                }

                h2{
                    text-align:center;
                    margin-bottom:5px;
                }

                p{
                    text-align:center;
                    margin:2px;
                }

                table{
                    width:100%;
                    border-collapse:collapse;
                    margin-top:20px;
                }

                th,td{
                    border:1px solid #000;
                    padding:8px;
                    text-align:left;
                }

            </style>

        </head>

        <body>

            <h2>CO OPERATIVE SOCIETY LTD NAGPUR</h2>
            <p>PLOT NO 497 NEW NANDANWAN</p>
            <p>MAHARASHTRA - 440024</p>
            <p>CIN : ASJ#567 | Email : example@gmail.com | Helpline : 9566200223</p>

            <h3 style="text-align:center;margin-top:20px;">
                MATURITY STATUS REPORT
            </h3>

            <table>

                <tr>
                    <th>Customer Name</th>
                    <td>${data.customerName}</td>
                </tr>

                <tr>
                    <th>Branch</th>
                    <td>${data.branchName}</td>
                </tr>

                <tr>
                    <th>Policy Code</th>
                    <td>${data.policyCode}</td>
                </tr>

                <tr>
                    <th>Policy Amount</th>
                    <td>${data.policyAmount}</td>
                </tr>

                <tr>
                    <th>Maturity Date</th>
                    <td>${data.maturityDate}</td>
                </tr>

                <tr>
                    <th>Maturity Amount</th>
                    <td>${data.maturityAmount}</td>
                </tr>

                <tr>
                    <th>Total Deposit</th>
                    <td>${data.depositAmount}</td>
                </tr>

                <tr>
                    <th>Scheme Name</th>
                    <td>${data.schemeName}</td>
                </tr>

            </table>

        </body>

        </html>

    `);

    printWindow.document.close();
    printWindow.print();

}