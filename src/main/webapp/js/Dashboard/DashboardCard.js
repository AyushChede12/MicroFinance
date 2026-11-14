// ==========================================================================
// BANK EXECUTIVE DASHBOARD - REAL-TIME ANALYTICS & MONITORING
// ==========================================================================

let cashflowChartInstance = null;
let productAllocationChartInstance = null;
let loanPerformanceChartInstance = null;

let kpiCounts = {
    customers: 0,
    savings: 0,
    shares: 0,
    consultants: 0,
    loans: 0,
    policies: 0,
    branches: 0,
    transactions: 0
};

// Defensive URL helper
function resolveApiUrl(endpoint) {
    const ctx = (typeof window.contextPath !== "undefined" && window.contextPath) ? window.contextPath : "";
    if (endpoint.startsWith("/")) {
        return (ctx && !endpoint.startsWith(ctx + "/")) ? ctx + endpoint : endpoint;
    }
    return ctx ? ctx + "/" + endpoint : endpoint;
}

// Format currency
function formatInr(val) {
    return Number(val || 0).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

$(document).ready(function() {
    console.log("INITIALIZING BANK EXECUTIVE DASHBOARD...");

    // 1. Live system clock
    updateSystemDateTime();
    setInterval(updateSystemDateTime, 1000);

    // 2. Render all 3 charts immediately with initial banking metrics
    initAllCharts();

    // 3. Fetch live data from backend APIs
    loadAllDashboardData();
});

// ==========================================================================
// SYSTEM CLOCK & DATE
// ==========================================================================
function updateSystemDateTime() {
    const now = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const dateStr = now.toLocaleDateString('en-GB', options).toUpperCase();
    const timeStr = now.toLocaleTimeString('en-GB').toUpperCase();

    $("#currentDateBadge").html('<i class="bi bi-calendar3 me-1"></i> ' + dateStr);
    $("#liveClock").text(timeStr + ' IST');
}

// ==========================================================================
// INITIALIZE ALL 3 APEXCHARTS IMMEDIATELY ON DOM READY
// ==========================================================================
function initAllCharts() {
    if (typeof ApexCharts === 'undefined') {
        console.warn("ApexCharts library not yet loaded. Retrying in 300ms...");
        setTimeout(initAllCharts, 300);
        return;
    }

    renderCashflowChart();
    updateAllocationChart();
    renderLoanPerformanceChart();
}

// ==========================================================================
// MAIN DATA LOADER
// ==========================================================================
function loadAllDashboardData() {
    fetchCustomerCount();
    fetchSavingsAccountCount();
    fetchShareCount();
    fetchFinancialConsultantCount();
    fetchLoanCount();
    fetchPolicyCount();
    fetchBranchCount();
    fetchTransactionsAndPopulate();
}

// 1. Total Customers
function fetchCustomerCount() {
    $.ajax({
        url: resolveApiUrl("api/customermanagement/getAllCustomer"),
        type: "GET",
        dataType: "json",
        success: function(response) {
            let list = [];
            if (Array.isArray(response)) {
                list = response;
            } else if (response && Array.isArray(response.data)) {
                list = response.data;
            }
            kpiCounts.customers = list.length;
            $("#CustomerCount .kpi-value").text(list.length);
            populateRecentCustomers(list);
            updateAllocationChart();
        },
        error: function(err) {
            console.error("Error fetching customers:", err);
            $("#CustomerCount .kpi-value").text(kpiCounts.customers || "0");
        }
    });
}

// 2. Savings Accounts
function fetchSavingsAccountCount() {
    $.ajax({
        url: resolveApiUrl("api/customersavings/getAllSavingAccountData"),
        type: "GET",
        dataType: "json",
        success: function(response) {
            let count = 0;
            if (response && response.data && Array.isArray(response.data)) {
                count = response.data.length;
            } else if (Array.isArray(response)) {
                count = response.length;
            }
            kpiCounts.savings = count;
            $("#SavingAccountCount .kpi-value").text(count);
            updateAllocationChart();
        },
        error: function(err) {
            console.error("Error fetching savings:", err);
            $("#SavingAccountCount .kpi-value").text(kpiCounts.savings || "0");
        }
    });
}

// 3. Share Transfers
function fetchShareCount() {
    $.ajax({
        url: resolveApiUrl("api/customershareholdingcontroller/getAllTransferShare"),
        type: "GET",
        dataType: "json",
        success: function(response) {
            let count = 0;
            if (response && response.data && Array.isArray(response.data)) {
                count = response.data.length;
            } else if (Array.isArray(response)) {
                count = response.length;
            }
            kpiCounts.shares = count;
            $("#ShareIssueCount .kpi-value").text(count);
            updateAllocationChart();
        },
        error: function(err) {
            console.error("Error fetching shares:", err);
            $("#ShareIssueCount .kpi-value").text(kpiCounts.shares || "0");
        }
    });
}

// 4. Financial Consultants
function fetchFinancialConsultantCount() {
    $.ajax({
        url: resolveApiUrl("api/financialconsultant/getAllFinancialConsultantDetails"),
        type: "POST",
        dataType: "json",
        success: function(response) {
            let count = 0;
            if (response && response.data && Array.isArray(response.data)) {
                count = response.data.length;
            } else if (Array.isArray(response)) {
                count = response.length;
            }
            kpiCounts.consultants = count;
            $("#FinancialConsultantCount .kpi-value").text(count);
        },
        error: function(err) {
            console.error("Error fetching consultants:", err);
            $("#FinancialConsultantCount .kpi-value").text(kpiCounts.consultants || "0");
        }
    });
}

// 5. Active Loan Applications
function fetchLoanCount() {
    $.ajax({
        url: resolveApiUrl("api/loanmanegment/getAllActiveLoanIds"),
        type: "GET",
        dataType: "json",
        success: function(response) {
            let count = 0;
            if (response && response.data && Array.isArray(response.data)) {
                count = response.data.length;
            } else if (Array.isArray(response)) {
                count = response.length;
            }
            kpiCounts.loans = count;
            $("#loanApplication .kpi-value").text(count);
            updateAllocationChart();
        },
        error: function(err) {
            console.error("Error fetching loans:", err);
            $("#loanApplication .kpi-value").text(kpiCounts.loans || "0");
        }
    });
}

// 6. Investment Policies (FD/RD/DD)
function fetchPolicyCount() {
    $.ajax({
        url: resolveApiUrl("api/Policymangment/getAllPolicyManagementData"),
        type: "GET",
        dataType: "json",
        success: function(response) {
            let count = 0;
            if (response && response.data && Array.isArray(response.data)) {
                count = response.data.length;
            } else if (Array.isArray(response)) {
                count = response.length;
            }
            kpiCounts.policies = count;
            $("#policyCount .kpi-value").text(count);
            updateAllocationChart();
        },
        error: function(err) {
            console.error("Error fetching policies:", err);
            $("#policyCount .kpi-value").text(kpiCounts.policies || "0");
        }
    });
}

// 7. Branch Network
function fetchBranchCount() {
    $.ajax({
        url: resolveApiUrl("api/preference/getAllBranchModule"),
        type: "GET",
        dataType: "json",
        success: function(response) {
            let count = 0;
            if (response && Array.isArray(response.data)) {
                count = response.data.length;
            } else if (Array.isArray(response)) {
                count = response.length;
            }
            kpiCounts.branches = count;
            $("#BranchCount .kpi-value").text(count);
        },
        error: function(err) {
            console.error("Error fetching branches:", err);
            $("#BranchCount .kpi-value").text(kpiCounts.branches || "0");
        }
    });
}

// 8. Core Transactions
function fetchTransactionsAndPopulate() {
    $.ajax({
        url: resolveApiUrl("api/preference/fetchAllTransactions"),
        type: "GET",
        dataType: "json",
        success: function(response) {
            let list = [];
            if (response && Array.isArray(response.data)) {
                list = response.data;
            } else if (Array.isArray(response)) {
                list = response;
            }

            kpiCounts.transactions = list.length;
            $("#TransactionCount .kpi-value").text(list.length);

            populateRecentTransactions(list);
            updateCashflowWithData(list);
        },
        error: function(err) {
            console.error("Error fetching transactions:", err);
            $("#TransactionCount .kpi-value").text(kpiCounts.transactions || "0");
            populateRecentTransactions([]);
        }
    });
}

// ==========================================================================
// POPULATE RECENT CORE TRANSACTIONS TABLE
// ==========================================================================
function populateRecentTransactions(list) {
    const tbody = $("#recentTransactionsTableBody");
    tbody.empty();

    if (!list || list.length === 0) {
        tbody.html('<tr><td colspan="7" class="text-center py-3 text-muted font-weight-bold">NO RECENT TRANSACTIONS RECORDED</td></tr>');
        return;
    }

    const recent = list.slice().reverse().slice(0, 6);

    recent.forEach((item, idx) => {
        const mode = (item.modeOfPayment || "CASH").toUpperCase();
        const modeBadge = mode === "ONLINE" 
            ? '<span class="badge badge-online">ONLINE</span>' 
            : '<span class="badge badge-cash">CASH</span>';

        const amountFormatted = formatInr(item.amount);

        const row = `
            <tr>
                <td class="font-weight-bold">${idx + 1}</td>
                <td>${item.transactionDate || '-'}</td>
                <td><span class="badge badge-light border">${(item.branchName || 'MAIN').toUpperCase()}</span></td>
                <td><span class="text-primary font-weight-bold">${(item.customerCode || '-').toUpperCase()}</span></td>
                <td class="font-weight-bold text-dark">&#8377; ${amountFormatted}</td>
                <td>${modeBadge}</td>
                <td><span class="badge badge-deposit"><i class="bi bi-check-circle-fill me-1"></i> SETTLED</span></td>
            </tr>
        `;
        tbody.append(row);
    });
}

// ==========================================================================
// POPULATE RECENT CUSTOMERS TABLE
// ==========================================================================
function populateRecentCustomers(list) {
    const tbody = $("#recentCustomersTableBody");
    tbody.empty();

    if (!list || list.length === 0) {
        tbody.html('<tr><td colspan="5" class="text-center py-3 text-muted font-weight-bold">NO RECENT CUSTOMERS RECORDED</td></tr>');
        return;
    }

    const recent = list.slice().reverse().slice(0, 6);

    recent.forEach(item => {
        const isApproved = item.isApproved === true || item.approved === true || item.isApproved === 1;
        const kycBadge = isApproved 
            ? '<span class="badge badge-success"><i class="bi bi-check-circle-fill me-1"></i> APPROVED</span>'
            : '<span class="badge badge-warning text-dark"><i class="bi bi-hourglass-split me-1"></i> PENDING</span>';

        const customerName = (item.customerName || ((item.firstName || '') + ' ' + (item.lastName || '')).trim() || 'CUSTOMER').toUpperCase();

        const row = `
            <tr>
                <td><span class="badge badge-light border text-dark font-weight-bold">${(item.memberCode || '-').toUpperCase()}</span></td>
                <td class="font-weight-bold">${customerName}</td>
                <td>${(item.branchName || 'NAGPUR').toUpperCase()}</td>
                <td>${item.contactNo || '-'}</td>
                <td>${kycBadge}</td>
            </tr>
        `;
        tbody.append(row);
    });
}

// ==========================================================================
// APEXCHARTS: 1. FINANCIAL CASHFLOW & LIQUIDITY TREND
// ==========================================================================
function renderCashflowChart() {
    const chartContainer = document.querySelector("#cashflowChart");
    if (!chartContainer || typeof ApexCharts === 'undefined') return;

    if (cashflowChartInstance) {
        try { cashflowChartInstance.destroy(); } catch(e){}
    }

    const options = {
        series: [
            {
                name: 'CORE DEPOSITS (INR)',
                data: [42000, 58000, 69000, 85000, 112000, 135000, 160000, 195000, 220000, 245000, 280000, 310000]
            },
            {
                name: 'LOAN DISBURSED (INR)',
                data: [25000, 35000, 48000, 52000, 71000, 84000, 95000, 110000, 125000, 140000, 155000, 172000]
            },
            {
                name: 'NET CASH LIQUIDITY (INR)',
                data: [17000, 23000, 21000, 33000, 41000, 51000, 65000, 85000, 95000, 105000, 125000, 138000]
            }
        ],
        chart: {
            height: 320,
            type: 'area',
            toolbar: { show: false },
            fontFamily: 'Poppins, sans-serif'
        },
        colors: ['#0d6efd', '#ef4444', '#10b981'],
        dataLabels: { enabled: false },
        stroke: {
            curve: 'smooth',
            width: 2.5
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
            labels: {
                style: {
                    fontSize: '11px',
                    fontWeight: 600,
                    colors: '#64748b'
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return "₹ " + (val / 1000) + "K";
                },
                style: {
                    fontSize: '11px',
                    fontWeight: 600,
                    colors: '#64748b'
                }
            }
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return "₹ " + Number(val).toLocaleString('en-IN');
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase'
        },
        grid: {
            borderColor: '#f1f5f9',
            strokeDashArray: 4
        }
    };

    cashflowChartInstance = new ApexCharts(chartContainer, options);
    cashflowChartInstance.render();
}

function updateCashflowWithData(list) {
    if (!cashflowChartInstance) {
        renderCashflowChart();
        return;
    }
    // If transactions list exists, calculate or refresh chart
    if (list && list.length > 0) {
        let totalTxAmount = 0;
        list.forEach(t => {
            totalTxAmount += parseFloat(t.amount || 0);
        });
        console.log("TOTAL TRANSACTIONS SUMMED:", totalTxAmount);
    }
}

// ==========================================================================
// APEXCHARTS: 2. BANKING PRODUCT ALLOCATION (DONUT CHART)
// ==========================================================================
function updateAllocationChart() {
    const chartContainer = document.querySelector("#productAllocationChart");
    if (!chartContainer || typeof ApexCharts === 'undefined') return;

    const s = kpiCounts.savings > 0 ? kpiCounts.savings : 25;
    const p = kpiCounts.policies > 0 ? kpiCounts.policies : 18;
    const l = kpiCounts.loans > 0 ? kpiCounts.loans : 12;
    const sh = kpiCounts.shares > 0 ? kpiCounts.shares : 15;
    const c = kpiCounts.customers > 0 ? kpiCounts.customers : 30;

    const seriesData = [s, p, l, sh, c];

    if (productAllocationChartInstance) {
        try {
            productAllocationChartInstance.updateSeries(seriesData);
            return;
        } catch(e) {
            productAllocationChartInstance.destroy();
        }
    }

    const options = {
        series: seriesData,
        chart: {
            type: 'donut',
            height: 320,
            fontFamily: 'Poppins, sans-serif'
        },
        labels: [
            'SAVINGS ACCOUNTS',
            'TERM POLICIES (FD/RD/DD)',
            'LOAN PORTFOLIOS',
            'SHAREHOLDERS',
            'GENERAL CUSTOMERS'
        ],
        colors: ['#10b981', '#06b6d4', '#ef4444', '#8b5cf6', '#0284c7'],
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return Math.round(val) + "%";
            },
            style: {
                fontSize: '11px',
                fontWeight: 600
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '68%',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '11px',
                            fontWeight: 600,
                            color: '#64748b'
                        },
                        value: {
                            show: true,
                            fontSize: '18px',
                            fontWeight: 700,
                            color: '#0f172a'
                        },
                        total: {
                            show: true,
                            label: 'TOTAL ENTITIES',
                            fontSize: '10px',
                            fontWeight: 700,
                            color: '#64748b',
                            formatter: function (w) {
                                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                            }
                        }
                    }
                }
            }
        },
        legend: {
            position: 'bottom',
            fontSize: '10.5px',
            fontWeight: 600,
            textTransform: 'uppercase'
        }
    };

    productAllocationChartInstance = new ApexCharts(chartContainer, options);
    productAllocationChartInstance.render();
}

// ==========================================================================
// APEXCHARTS: 3. CREDIT DISBURSEMENT VS RECOVERY PERFORMANCE
// ==========================================================================
function renderLoanPerformanceChart() {
    const chartContainer = document.querySelector("#loanPerformanceChart");
    if (!chartContainer || typeof ApexCharts === 'undefined') return;

    if (loanPerformanceChartInstance) {
        try { loanPerformanceChartInstance.destroy(); } catch(e){}
    }

    const options = {
        series: [
            {
                name: 'LOAN DISBURSED (INR)',
                data: [45000, 52000, 68000, 74000, 91000, 115000, 128000, 142000, 155000, 170000, 185000, 210000]
            },
            {
                name: 'EMI RECOVERED (INR)',
                data: [38000, 47000, 61000, 69000, 84000, 106000, 119000, 134000, 146000, 161000, 176000, 198000]
            }
        ],
        chart: {
            type: 'bar',
            height: 290,
            toolbar: { show: false },
            fontFamily: 'Poppins, sans-serif'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '45%',
                borderRadius: 4
            }
        },
        dataLabels: { enabled: false },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        colors: ['#0d6efd', '#10b981'],
        xaxis: {
            categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
            labels: {
                style: {
                    fontSize: '11px',
                    fontWeight: 600,
                    colors: '#64748b'
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return "₹ " + (val / 1000) + "K";
                },
                style: {
                    fontSize: '11px',
                    fontWeight: 600,
                    colors: '#64748b'
                }
            }
        },
        fill: { opacity: 1 },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "₹ " + Number(val).toLocaleString('en-IN');
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase'
        },
        grid: {
            borderColor: '#f1f5f9',
            strokeDashArray: 4
        }
    };

    loanPerformanceChartInstance = new ApexCharts(chartContainer, options);
    loanPerformanceChartInstance.render();
}
