/* =====================================================
   CHEQUE TRANSACTION REPORT – FINAL JS
   ===================================================== */

$(document).ready(function () {

    console.log("Cheque Transaction Report Loaded");
    console.log("Context Path =", contextPath);

    loadChequeData();

    $("#findBtn").on("click", function () {
        applyFilters();
    });

});


/* ================= GLOBAL ================= */

let allChequeData = [];
let rowIndex = 0;


/* ================= LOAD START ================= */

function loadChequeData() {

    allChequeData = [];
    rowIndex = 0;
    $(".datatable tbody").empty();

    loadLoanPayment();
}


/* ================= API 1 ================= */

function loadLoanPayment() {

    $.ajax({
        url: contextPath + "/api/reports/getCheckDataFromLoanPayment",
        type: "GET",

        success: function (res) {

            let data = extractData(res);

            data.forEach(item => {

                allChequeData.push({
                    id: item.id,
                    name: item.memberName || "-",
                    date: item.paymentDate,
                    chequeNo: item.chequeNo || "-",
                    type: "RECEIVED",
                    branch: item.branchName || "",
                    source: "Loan Payment"
                });

            });

            loadSavingActivity();
        },

        error: function () {
            loadSavingActivity();
        }

    });
}


/* ================= API 2 ================= */

function loadSavingActivity() {

    $.ajax({
        url: contextPath + "/api/reports/getPayByFromSavingAccountActivity",
        type: "GET",

        success: function (res) {

            let data = extractData(res);

            data.forEach(item => {

                allChequeData.push({
                    id: item.id,
                    name: item.customerName || "-",
                    date: item.transactionDate,
                    chequeNo: item.chequeNo || "-",
                    type: "ISSUED",
                    branch: item.branchName || "",
                    source: "Saving Activity"
                });

            });

            loadCreateSaving();
        },

        error: function () {
            loadCreateSaving();
        }

    });
}


/* ================= API 3 ================= */

function loadCreateSaving() {

    $.ajax({
        url: contextPath + "/api/reports/getCheckDataFromCreateSavings",
        type: "GET",

        success: function (res) {

            let data = extractData(res);

            data.forEach(item => {

                allChequeData.push({
                    id: item.id,
                    name: item.enterCustomerName || "-",
                    date: item.openingDate,
                    chequeNo: item.chequeNo || "-",
                    type: "ISSUED",
                    branch: item.branchName || "",
                    source: "Create Savings"
                });

            });

            loadFinancialConsultant();
        },

        error: function () {
            loadFinancialConsultant();
        }

    });
}


/* ================= API 4 ================= */

function loadFinancialConsultant() {

    $.ajax({
        url: contextPath + "/api/reports/getCheckDataFromFinancialConsultant",
        type: "GET",

        success: function (res) {

            let data = extractData(res);

            data.forEach(item => {

                allChequeData.push({
                    id: item.id,
                    name: item.financialName || "-",
                    date: item.joiningDate,
                    chequeNo: item.chequeNo || "-",
                    type: "ISSUED",
                    branch: item.branchName || "",
                    source: "Financial Consultant"
                });

            });

            loadTeamMember();
        },

        error: function () {
            loadTeamMember();
        }

    });
}


/* ================= API 5 ================= */

function loadTeamMember() {

    $.ajax({
        url: contextPath + "/api/reports/getCheckDataFromTeamMember",
        type: "GET",

        success: function (res) {

            let data = extractData(res);

            data.forEach(item => {

                allChequeData.push({
                    id: item.id,
                    name: item.teamMemberName || "-",
                    date: item.signUpDate,
                    chequeNo: item.chequeNo || "-",
                    type: "ISSUED",
                    branch: item.branchName || "",
                    source: "Team Member"
                });

            });

            loadApprovedCustomers();
        },

        error: function () {
            loadApprovedCustomers();
        }

    });
}


/* ================= API 6 ================= */

function loadApprovedCustomers() {

    $.ajax({
        url: contextPath + "/api/customermanagement/approved",
        type: "GET",

        success: function (res) {

            let data = extractData(res);

            data.forEach(item => {

                allChequeData.push({
                    id: item.id,
                    name: item.customerName || "-",
                    date: item.signupDate,
                    chequeNo: item.chequeNo || "-",
                    type: "ISSUED",
                    branch: item.branchName || "",
                    source: "Customer"
                });

            });

            renderTable(allChequeData);
        },

        error: function () {
            renderTable(allChequeData);
        }

    });
}


/* ================= FILTER ================= */

function applyFilters() {

    let fDate = $("#fDate").val();
    let tDate = $("#tDate").val();
    let chequeNo = $("#chequeNo").val().trim();
    let type = $("#type").val();
    let branch = $("#branchName").val();

    let fromDate = parseInputDate(fDate);
    let toDate = parseInputDate(tDate);

    let filtered = allChequeData.filter(item => {

        let itemDate = parseDate(item.date);

        if (fromDate && itemDate && itemDate < fromDate) return false;
        if (toDate && itemDate && itemDate > toDate) return false;

        if (chequeNo && !String(item.chequeNo).includes(chequeNo)) return false;

        if (type && item.type !== type) return false;

        if (branch && item.branch &&
            item.branch.toLowerCase() !== branch.toLowerCase()) return false;

        return true;
    });

    renderTable(filtered);
}


/* ================= TABLE ================= */

function renderTable(data) {

    let tbody = $(".datatable tbody");
    tbody.empty();
    rowIndex = 0;

    if (!data || data.length === 0) {

        tbody.append(`
            <tr>
                <td colspan="6">No Data Found</td>
            </tr>
        `);

        return;
    }

    data.forEach(item => {

        rowIndex++;

        tbody.append(`
            <tr>
                <td>${rowIndex}</td>
                <td>${item.name}</td>
                <td>${formatDate(item.date)}</td>
                <td>${item.chequeNo}</td>
                <td>${item.type}</td>
                <td>
                    <button class="btn btn-sm btn-success" onclick="viewData(${item.id})">
                        <i class="bi bi-printer"></i>
                    </button>
                </td>
            </tr>
        `);

    });
}


/* ================= PRINT ================= */

function viewData(id) {

    let item = allChequeData.find(x => x.id == id);

    if (!item) {
        alert("Data not found");
        return;
    }

    let win = window.open('', '', 'width=900,height=700');

    win.document.write(`
        <html>
        <head>
            <title>Cheque Print</title>
        </head>
        <body style="font-family:Arial;padding:30px">

            <h2>Cheque Transaction</h2>
            <hr>

            <p><b>Name :</b> ${item.name}</p>
            <p><b>Date :</b> ${formatDate(item.date)}</p>
            <p><b>Cheque No :</b> ${item.chequeNo}</p>
            <p><b>Status :</b> ${item.type}</p>
            <p><b>Source :</b> ${item.source}</p>

            <br>

            <button onclick="window.print()">Print</button>

        </body>
        </html>
    `);

    win.document.close();
}


/* ================= HELPERS ================= */

function extractData(res) {

    if (!res) return [];

    if (Array.isArray(res.data)) return res.data;

    if (Array.isArray(res.response)) return res.response;

    if (Array.isArray(res.result)) return res.result;

    if (Array.isArray(res)) return res;

    return [];
}


function parseDate(d) {

    if (!d) return null;

    return new Date(d.split(" ")[0]);
}


function parseInputDate(d) {

    if (!d) return null;

    return new Date(d);
}


function formatDate(d) {

    if (!d) return "-";

    let date = new Date(d.split(" ")[0]);

    return date.toLocaleDateString("en-GB");
}
function viewData(id) {

    let item = allChequeData.find(x => x.id == id);

    if (!item) {
        alert("Data not found");
        return;
    }

    let win = window.open('', '', 'width=900,height=700');

    win.document.write(`
    <html>
    <head>
        <title>Cheque Transaction Report</title>

        <style>

            body{
                font-family: Arial;
                padding:40px;
            }

            .header{
                text-align:center;
                margin-bottom:25px;
            }

            .company{
                font-size:22px;
                font-weight:bold;
            }

            .report{
                font-size:18px;
                margin-top:5px;
            }

            table{
                width:100%;
                border-collapse:collapse;
                margin-top:20px;
            }

            table, th, td{
                border:1px solid #000;
            }

            th, td{
                padding:8px;
                text-align:left;
            }

            th{
                background:#f2f2f2;
            }

            .footer{
                margin-top:30px;
                font-size:13px;
            }

            @media print{
                button{
                    display:none;
                }
            }

        </style>

    </head>

    <body>

        <div class="header">
            <div class="company">CO OPERATIVE SOCIETY LTD NAGPUR</div>
            <div>Nagpur, Maharashtra</div>
            <div class="report">Cheque Transaction Report</div>
        </div>

        <table>

            <tr>
                <th>Account Holder</th>
                <td>${item.name}</td>
            </tr>

            <tr>
                <th>Transaction Date</th>
                <td>${formatDate(item.date)}</td>
            </tr>

            <tr>
                <th>Cheque Number</th>
                <td>${item.chequeNo}</td>
            </tr>

            <tr>
                <th>Status</th>
                <td>${item.type}</td>
            </tr>

            <tr>
                <th>Source</th>
                <td>${item.source}</td>
            </tr>

        </table>

        <div class="footer">
            Printed On : ${new Date().toLocaleDateString()}
        </div>

        <br>
        <button onclick="window.print()">Print</button>

    </body>
    </html>
    `);

    win.document.close();
}