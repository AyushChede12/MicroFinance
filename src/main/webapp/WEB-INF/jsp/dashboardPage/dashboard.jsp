<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="baseUrl" value="${pageContext.request.contextPath}" scope="request" />

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BANK EXECUTIVE DASHBOARD | MICROFINANCE</title>

    <!-- FontAwesome & Bootstrap Icons -->
    <script src="https://kit.fontawesome.com/ae73087723.js" crossorigin="anonymous"></script>
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />

    <!-- Bootstrap 4.0 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" />

    <!-- Google Fonts: Poppins -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- ApexCharts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.46.0/apexcharts.min.js"></script>

    <!-- jQuery & Bootstrap Scripts -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"></script>

    <!-- Project Stylesheet -->
    <link rel="stylesheet" href="${baseUrl}/css/admin.css" />

    <!-- Sidebar and Header Includes -->
    <jsp:include page="../sidebar.jsp"></jsp:include>
    <jsp:include page="../header.jsp"></jsp:include>

    <style>
        /* Modern Compact Banking Dashboard Styling */
        body {
            font-family: 'Poppins', sans-serif !important;
            font-size: 13px !important;
            background-color: #f8fafc;
        }

        .dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 1px solid #e2e8f0;
        }

        .dashboard-header h1 {
            font-size: 18px !important;
            font-weight: 700 !important;
            color: #0f172a;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .dashboard-header p {
            font-size: 11.5px;
            color: #64748b;
            margin: 2px 0 0 0;
            text-transform: uppercase;
        }

        /* KPI Cards */
        .kpi-card {
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            background: #ffffff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            margin-bottom: 18px;
            position: relative;
            overflow: hidden;
        }

        .kpi-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
        }

        .kpi-card-body {
            padding: 16px 18px;
        }

        .kpi-icon-box {
            width: 44px;
            height: 44px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: #ffffff;
        }

        .kpi-title {
            font-size: 11.5px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }

        .kpi-value {
            font-size: 22px;
            font-weight: 700;
            color: #0f172a;
            line-height: 1.2;
            margin: 0;
        }

        .kpi-subtext {
            font-size: 10.5px;
            color: #10b981;
            font-weight: 600;
            margin-top: 4px;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            gap: 4px;
        }

        /* Quick Action Bar */
        .quick-actions-bar {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 12px;
            margin-bottom: 22px;
        }

        .quick-action-btn {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 12px 14px;
            display: flex;
            align-items: center;
            gap: 10px;
            text-decoration: none !important;
            color: #1e293b !important;
            font-size: 11.5px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.3px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
            transition: all 0.2s ease;
        }

        .quick-action-btn:hover {
            border-color: #0d6efd;
            background: #f0f7ff;
            color: #0d6efd !important;
            transform: translateY(-1px);
        }

        .quick-action-btn i {
            font-size: 16px;
            color: #0d6efd;
        }

        /* Chart Cards */
        .chart-card {
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            background: #ffffff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            margin-bottom: 22px;
        }

        .chart-card-header {
            padding: 14px 18px;
            border-bottom: 1px solid #f1f5f9;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .chart-card-title {
            font-size: 13px !important;
            font-weight: 700 !important;
            color: #0f172a;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .chart-card-body {
            padding: 16px;
        }

        /* Table Styling */
        .dashboard-table {
            width: 100%;
            margin: 0;
            font-size: 12px;
        }

        .dashboard-table thead th {
            font-size: 11.5px;
            font-weight: 700;
            text-transform: uppercase;
            color: #475569;
            background: #f8fafc;
            border-bottom: 2px solid #e2e8f0;
            padding: 9px 12px;
            white-space: nowrap;
        }

        .dashboard-table tbody td {
            font-size: 12px;
            padding: 8px 12px;
            vertical-align: middle;
            border-bottom: 1px solid #f1f5f9;
            white-space: nowrap;
            text-transform: uppercase;
        }

        .badge-deposit {
            background-color: #dcfce7;
            color: #15803d;
            font-weight: 600;
        }

        .badge-withdraw {
            background-color: #fee2e2;
            color: #b91c1c;
            font-weight: 600;
        }

        .badge-online {
            background-color: #e0e7ff;
            color: #4338ca;
            font-weight: 600;
        }

        .badge-cash {
            background-color: #fef3c7;
            color: #b45309;
            font-weight: 600;
        }

        /* Dropdown custom */
        .kpi-dropdown-btn {
            position: absolute;
            top: 12px;
            right: 12px;
            color: #94a3b8;
            background: none;
            border: none;
            font-size: 14px;
            cursor: pointer;
        }

        .kpi-dropdown-btn:hover {
            color: #0f172a;
        }
    </style>
</head>

<body>
    <main id="main" class="main">
        <!-- Dashboard Top Header Bar -->
        <div class="dashboard-header">
            <div>
                <h1><i class="bi bi-speedometer2 me-1"></i> BANK EXECUTIVE DASHBOARD</h1>
                <p>REAL-TIME CORE BANKING OVERVIEW, CASHFLOW & ANALYTICS PORTAL</p>
            </div>
            <div class="d-flex align-items-center gap-2 mt-2 mt-md-0">
                <span class="badge badge-success px-2 py-1" style="font-size: 11px;">
                    <i class="bi bi-shield-check"></i> SYSTEM ONLINE
                </span>
                <span class="badge badge-light border text-dark px-2 py-1" id="currentDateBadge" style="font-size: 11px;">
                    <i class="bi bi-calendar3"></i> LOADING DATE...
                </span>
                <button type="button" class="btn btn-sm btn-outline-primary ml-2" onclick="loadAllDashboardData();" title="REFRESH DASHBOARD DATA">
                    <i class="bi bi-arrow-clockwise"></i> REFRESH
                </button>
            </div>
        </div>

        <!-- Quick Banking Action Shortcuts -->
        <div class="quick-actions-bar">
            <a href="${baseUrl}/addCustomer" class="quick-action-btn">
                <i class="fa-solid fa-user-plus"></i>
                <span>NEW CUSTOMER</span>
            </a>
            <a href="${baseUrl}/createSavingAccount" class="quick-action-btn">
                <i class="fa-solid fa-piggy-bank"></i>
                <span>OPEN SAVINGS A/C</span>
            </a>
            <a href="${baseUrl}/SavingAccountFundTransfer" class="quick-action-btn">
                <i class="fa-solid fa-money-bill-transfer"></i>
                <span>FUND TRANSFER</span>
            </a>
            <a href="${baseUrl}/newLoanApplication" class="quick-action-btn">
                <i class="fa-solid fa-hand-holding-dollar"></i>
                <span>NEW LOAN APPLY</span>
            </a>
            <a href="${baseUrl}/addNewInvestment" class="quick-action-btn">
                <i class="fa-solid fa-file-contract"></i>
                <span>CREATE POLICY</span>
            </a>
            <a href="${baseUrl}/bankStatement" class="quick-action-btn">
                <i class="fa-solid fa-file-lines"></i>
                <span>BANK STATEMENT</span>
            </a>
        </div>

        <!-- 8 Core Banking KPI Summary Cards -->
        <div class="row">
            <!-- Card 1: Total Customers -->
            <div class="col-xl-3 col-lg-4 col-md-6">
                <div class="kpi-card">
                    <div class="dropdown">
                        <button class="kpi-dropdown-btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="bi bi-three-dots"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <h6 class="dropdown-header">CUSTOMER ACTIONS</h6>
                            <a class="dropdown-item" href="${baseUrl}/addCustomer"><i class="fa-solid fa-user-plus me-1"></i> ADD CUSTOMER</a>
                            <a class="dropdown-item" href="${baseUrl}/customerReport"><i class="fa-solid fa-file-pdf me-1"></i> CUSTOMER REPORT</a>
                        </div>
                    </div>
                    <div class="kpi-card-body d-flex align-items-center">
                        <div class="kpi-icon-box" style="background: linear-gradient(135deg, #0284c7, #0284c7);">
                            <i class="fa-solid fa-users"></i>
                        </div>
                        <div class="ml-3" id="CustomerCount">
                            <div class="kpi-title">TOTAL CUSTOMERS</div>
                            <h3 class="kpi-value"><span class="spinner-border spinner-border-sm" role="status"></span></h3>
                            <div class="kpi-subtext"><i class="bi bi-graph-up-arrow"></i> ACTIVE REPOSITORY</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 2: Savings Accounts -->
            <div class="col-xl-3 col-lg-4 col-md-6">
                <div class="kpi-card">
                    <div class="dropdown">
                        <button class="kpi-dropdown-btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="bi bi-three-dots"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <h6 class="dropdown-header">SAVINGS ACTIONS</h6>
                            <a class="dropdown-item" href="${baseUrl}/createSavingAccount"><i class="fa-solid fa-plus me-1"></i> OPEN ACCOUNT</a>
                            <a class="dropdown-item" href="${baseUrl}/savingsAccountStatement"><i class="fa-solid fa-file-lines me-1"></i> STATEMENT</a>
                        </div>
                    </div>
                    <div class="kpi-card-body d-flex align-items-center">
                        <div class="kpi-icon-box" style="background: linear-gradient(135deg, #059669, #10b981);">
                            <i class="fa-solid fa-building-columns"></i>
                        </div>
                        <div class="ml-3" id="SavingAccountCount">
                            <div class="kpi-title">SAVINGS ACCOUNTS</div>
                            <h3 class="kpi-value"><span class="spinner-border spinner-border-sm" role="status"></span></h3>
                            <div class="kpi-subtext"><i class="bi bi-check-circle-fill"></i> DEPOSIT ACCOUNTS</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 3: Share Capital & Members -->
            <div class="col-xl-3 col-lg-4 col-md-6">
                <div class="kpi-card">
                    <div class="dropdown">
                        <button class="kpi-dropdown-btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="bi bi-three-dots"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <h6 class="dropdown-header">SHARE ACTIONS</h6>
                            <a class="dropdown-item" href="${baseUrl}/transferShares"><i class="fa-solid fa-share-nodes me-1"></i> TRANSFER SHARE</a>
                            <a class="dropdown-item" href="${baseUrl}/generateShareCertificate"><i class="fa-solid fa-certificate me-1"></i> CERTIFICATE</a>
                        </div>
                    </div>
                    <div class="kpi-card-body d-flex align-items-center">
                        <div class="kpi-icon-box" style="background: linear-gradient(135deg, #7c3aed, #8b5cf6);">
                            <i class="fa-solid fa-chart-pie"></i>
                        </div>
                        <div class="ml-3" id="ShareIssueCount">
                            <div class="kpi-title">SHARE TRANSFERS</div>
                            <h3 class="kpi-value"><span class="spinner-border spinner-border-sm" role="status"></span></h3>
                            <div class="kpi-subtext"><i class="bi bi-award-fill"></i> SHARE CAPITAL</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 4: Financial Consultants -->
            <div class="col-xl-3 col-lg-4 col-md-6">
                <div class="kpi-card">
                    <div class="dropdown">
                        <button class="kpi-dropdown-btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="bi bi-three-dots"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <h6 class="dropdown-header">CONSULTANT ACTIONS</h6>
                            <a class="dropdown-item" href="${baseUrl}/addFinancialConsultant"><i class="fa-solid fa-user-tie me-1"></i> ADD CONSULTANT</a>
                            <a class="dropdown-item" href="${baseUrl}/consultantIDCardGenerator"><i class="fa-solid fa-id-card me-1"></i> ID CARD</a>
                        </div>
                    </div>
                    <div class="kpi-card-body d-flex align-items-center">
                        <div class="kpi-icon-box" style="background: linear-gradient(135deg, #d97706, #f59e0b);">
                            <i class="fa-solid fa-briefcase"></i>
                        </div>
                        <div class="ml-3" id="FinancialConsultantCount">
                            <div class="kpi-title">FINANCIAL CONSULTANTS</div>
                            <h3 class="kpi-value"><span class="spinner-border spinner-border-sm" role="status"></span></h3>
                            <div class="kpi-subtext"><i class="bi bi-person-lines-fill"></i> FIELD ADVISORS</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 5: Active Loan Applications -->
            <div class="col-xl-3 col-lg-4 col-md-6">
                <div class="kpi-card">
                    <div class="dropdown">
                        <button class="kpi-dropdown-btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="bi bi-three-dots"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <h6 class="dropdown-header">LOAN ACTIONS</h6>
                            <a class="dropdown-item" href="${baseUrl}/newLoanApplication"><i class="fa-solid fa-file-invoice-dollar me-1"></i> APPLY LOAN</a>
                            <a class="dropdown-item" href="${baseUrl}/approvedLoanReport"><i class="fa-solid fa-check-double me-1"></i> APPROVED LOANS</a>
                        </div>
                    </div>
                    <div class="kpi-card-body d-flex align-items-center">
                        <div class="kpi-icon-box" style="background: linear-gradient(135deg, #dc2626, #ef4444);">
                            <i class="fa-solid fa-hand-holding-dollar"></i>
                        </div>
                        <div class="ml-3" id="loanApplication">
                            <div class="kpi-title">LOAN APPLICATIONS</div>
                            <h3 class="kpi-value"><span class="spinner-border spinner-border-sm" role="status"></span></h3>
                            <div class="kpi-subtext" style="color: #ef4444;"><i class="bi bi-clock-history"></i> CREDIT PORTFOLIO</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 6: Investment Policies (FD/RD/DD) -->
            <div class="col-xl-3 col-lg-4 col-md-6">
                <div class="kpi-card">
                    <div class="dropdown">
                        <button class="kpi-dropdown-btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="bi bi-three-dots"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <h6 class="dropdown-header">POLICY ACTIONS</h6>
                            <a class="dropdown-item" href="${baseUrl}/addNewInvestment"><i class="fa-solid fa-plus me-1"></i> NEW POLICY</a>
                            <a class="dropdown-item" href="${baseUrl}/policyReport"><i class="fa-solid fa-chart-line me-1"></i> POLICY REPORT</a>
                        </div>
                    </div>
                    <div class="kpi-card-body d-flex align-items-center">
                        <div class="kpi-icon-box" style="background: linear-gradient(135deg, #0891b2, #06b6d4);">
                            <i class="fa-solid fa-vault"></i>
                        </div>
                        <div class="ml-3" id="policyCount">
                            <div class="kpi-title">INVESTMENT POLICIES</div>
                            <h3 class="kpi-value"><span class="spinner-border spinner-border-sm" role="status"></span></h3>
                            <div class="kpi-subtext"><i class="bi bi-shield-lock-fill"></i> TERM DEPOSITS</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 7: Branch Network -->
            <div class="col-xl-3 col-lg-4 col-md-6">
                <div class="kpi-card">
                    <div class="dropdown">
                        <button class="kpi-dropdown-btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="bi bi-three-dots"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <h6 class="dropdown-header">BRANCH ACTIONS</h6>
                            <a class="dropdown-item" href="${baseUrl}/createBranch"><i class="fa-solid fa-code-branch me-1"></i> MANAGE BRANCH</a>
                        </div>
                    </div>
                    <div class="kpi-card-body d-flex align-items-center">
                        <div class="kpi-icon-box" style="background: linear-gradient(135deg, #4f46e5, #6366f1);">
                            <i class="fa-solid fa-diagram-project"></i>
                        </div>
                        <div class="ml-3" id="BranchCount">
                            <div class="kpi-title">BRANCH NETWORK</div>
                            <h3 class="kpi-value"><span class="spinner-border spinner-border-sm" role="status"></span></h3>
                            <div class="kpi-subtext"><i class="bi bi-geo-alt-fill"></i> ACTIVE LOCATIONS</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 8: Total Transactions -->
            <div class="col-xl-3 col-lg-4 col-md-6">
                <div class="kpi-card">
                    <div class="dropdown">
                        <button class="kpi-dropdown-btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="bi bi-three-dots"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <h6 class="dropdown-header">TRANSACTION ACTIONS</h6>
                            <a class="dropdown-item" href="${baseUrl}/bankStatement"><i class="fa-solid fa-receipt me-1"></i> STATEMENT</a>
                        </div>
                    </div>
                    <div class="kpi-card-body d-flex align-items-center">
                        <div class="kpi-icon-box" style="background: linear-gradient(135deg, #0d9488, #14b8a6);">
                            <i class="fa-solid fa-arrows-rotate"></i>
                        </div>
                        <div class="ml-3" id="TransactionCount">
                            <div class="kpi-title">CORE TRANSACTIONS</div>
                            <h3 class="kpi-value"><span class="spinner-border spinner-border-sm" role="status"></span></h3>
                            <div class="kpi-subtext"><i class="bi bi-cash-stack"></i> PROCESSED ENTRIES</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Interactive Banking Charts Section -->
        <div class="row">
            <!-- Chart 1: Cashflow & Liquidity Trend (Area Spline Chart) -->
            <div class="col-lg-8">
                <div class="chart-card">
                    <div class="chart-card-header">
                        <h5 class="chart-card-title"><i class="bi bi-graph-up text-primary me-1"></i> FINANCIAL CASHFLOW & LIQUIDITY TREND</h5>
                        <div class="badge badge-light border text-primary">MONTHLY AUDIT</div>
                    </div>
                    <div class="chart-card-body">
                        <div id="cashflowChart" style="min-height: 320px;"></div>
                    </div>
                </div>
            </div>

            <!-- Chart 2: Banking Asset Allocation (Donut Chart) -->
            <div class="col-lg-4">
                <div class="chart-card">
                    <div class="chart-card-header">
                        <h5 class="chart-card-title"><i class="bi bi-pie-chart text-success me-1"></i> PRODUCT ALLOCATION</h5>
                        <div class="badge badge-light border text-muted">PORTFOLIO</div>
                    </div>
                    <div class="chart-card-body">
                        <div id="productAllocationChart" style="min-height: 320px;"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Second Row of Banking Charts & Performance Ratios -->
        <div class="row">
            <!-- Chart 3: Loan Disbursement vs Recovery Performance -->
            <div class="col-lg-8">
                <div class="chart-card">
                    <div class="chart-card-header">
                        <h5 class="chart-card-title"><i class="bi bi-bar-chart-line text-info me-1"></i> CREDIT DISBURSEMENT VS RECOVERY PERFORMANCE</h5>
                        <div class="badge badge-light border text-info">COLLECTION AUDIT</div>
                    </div>
                    <div class="chart-card-body">
                        <div id="loanPerformanceChart" style="min-height: 290px;"></div>
                    </div>
                </div>
            </div>

            <!-- Quick Banking Metrics & Ratios -->
            <div class="col-lg-4">
                <div class="chart-card">
                    <div class="chart-card-header">
                        <h5 class="chart-card-title"><i class="bi bi-shield-check text-primary me-1"></i> FINANCIAL HEALTH & RATIOS</h5>
                        <div class="badge badge-light border text-success">HEALTHY</div>
                    </div>
                    <div class="chart-card-body p-3">
                        <div class="mb-3">
                            <div class="d-flex justify-content-between mb-1" style="font-size: 11px; font-weight: 600;">
                                <span>CREDIT DEPOSIT RATIO (CDR)</span>
                                <span class="text-primary font-weight-bold">68.4%</span>
                            </div>
                            <div class="progress" style="height: 6px; border-radius: 3px;">
                                <div class="progress-bar bg-primary" role="progressbar" style="width: 68.4%"></div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <div class="d-flex justify-content-between mb-1" style="font-size: 11px; font-weight: 600;">
                                <span>COLLECTION & RECOVERY RATE</span>
                                <span class="text-success font-weight-bold">94.2%</span>
                            </div>
                            <div class="progress" style="height: 6px; border-radius: 3px;">
                                <div class="progress-bar bg-success" role="progressbar" style="width: 94.2%"></div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <div class="d-flex justify-content-between mb-1" style="font-size: 11px; font-weight: 600;">
                                <span>CAPITAL ADEQUACY RATIO (CAR)</span>
                                <span class="text-info font-weight-bold">18.5%</span>
                            </div>
                            <div class="progress" style="height: 6px; border-radius: 3px;">
                                <div class="progress-bar bg-info" role="progressbar" style="width: 75%"></div>
                            </div>
                        </div>

                        <div class="mb-1">
                            <div class="d-flex justify-content-between mb-1" style="font-size: 11px; font-weight: 600;">
                                <span>NET NPA LEVEL</span>
                                <span class="text-danger font-weight-bold">1.8%</span>
                            </div>
                            <div class="progress" style="height: 6px; border-radius: 3px;">
                                <div class="progress-bar bg-danger" role="progressbar" style="width: 18%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Real Core Banking Data Tables -->
        <div class="row">
            <!-- Table 1: Recent Banking Transactions -->
            <div class="col-lg-7">
                <div class="chart-card">
                    <div class="chart-card-header">
                        <h5 class="chart-card-title"><i class="bi bi-clock-history text-primary me-1"></i> RECENT CORE TRANSACTIONS</h5>
                        <a href="${baseUrl}/bankStatement" class="btn btn-sm btn-outline-primary" style="font-size: 11px;">
                            VIEW STATEMENT <i class="bi bi-arrow-right"></i>
                        </a>
                    </div>
                    <div class="table-responsive" style="max-height: 340px; overflow-y: auto;">
                        <table class="table dashboard-table table-hover">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>DATE</th>
                                    <th>BRANCH</th>
                                    <th>CUSTOMER CODE</th>
                                    <th>AMOUNT (&#8377;)</th>
                                    <th>PAYMENT MODE</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody id="recentTransactionsTableBody">
                                <tr>
                                    <td colspan="7" class="text-center py-4 text-muted">
                                        <div class="spinner-border spinner-border-sm text-primary" role="status"></div>
                                        <span class="ml-2">LOADING BANK TRANSACTIONS...</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Table 2: Recent Customer Enrollments -->
            <div class="col-lg-5">
                <div class="chart-card">
                    <div class="chart-card-header">
                        <h5 class="chart-card-title"><i class="bi bi-person-check text-success me-1"></i> LATEST CUSTOMERS</h5>
                        <a href="${baseUrl}/customerReport" class="btn btn-sm btn-outline-success" style="font-size: 11px;">
                            ALL CUSTOMERS <i class="bi bi-arrow-right"></i>
                        </a>
                    </div>
                    <div class="table-responsive" style="max-height: 340px; overflow-y: auto;">
                        <table class="table dashboard-table table-hover">
                            <thead>
                                <tr>
                                    <th>MEMBER CODE</th>
                                    <th>CUSTOMER NAME</th>
                                    <th>BRANCH</th>
                                    <th>CONTACT NO.</th>
                                    <th>KYC STATUS</th>
                                </tr>
                            </thead>
                            <tbody id="recentCustomersTableBody">
                                <tr>
                                    <td colspan="5" class="text-center py-4 text-muted">
                                        <div class="spinner-border spinner-border-sm text-success" role="status"></div>
                                        <span class="ml-2">LOADING RECENT CUSTOMERS...</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Institutional Compliance & Audit Footer -->
        <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top text-muted" style="font-size: 11px; text-transform: uppercase;">
            <div>
                <i class="bi bi-lock-fill text-success"></i> 256-BIT ENCRYPTED CORE BANKING SYSTEM &nbsp;|&nbsp; PERSISTENT AUDIT ACTIVE
            </div>
            <div id="systemTimeDisplay">
                SERVER TIME: <span id="liveClock"></span>
            </div>
        </div>
    </main>

    <!-- Context & Script Inclusion -->
    <script>
        window.contextPath = '${pageContext.request.contextPath}';
    </script>
    <script src="${baseUrl}/js/adminscript.js"></script>
    <script src="${baseUrl}/js/Dashboard/DashboardCard.js"></script>
</body>
</html>
