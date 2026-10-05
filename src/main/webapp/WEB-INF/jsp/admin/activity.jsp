<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="baseUrl" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>System Administration Portal</title>
    <!-- CSS Dependencies -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --bg-color: #f3f4f6;
            --card-bg: #ffffff;
            --card-border: #e5e7eb;
            --text-main: #1f2937;
            --text-muted: #4b5563;
            --primary: #1e3a8a; /* Corporate Deep Blue */
            --primary-light: #eff6ff;
            --accent: #2563eb; /* Accent Blue */
            --success: #059669; /* Corporate Green */
            --success-light: #d1fae5;
            --danger: #dc2626; /* Corporate Red */
            --danger-light: #fee2e2;
            --warning: #d97706; /* Corporate Amber */
            --warning-light: #fef3c7;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-main);
            font-family: 'Poppins', sans-serif;
            min-height: 100vh;
            padding-bottom: 2rem;
        }

        /* Clean Enterprise Card Styles */
        .glass-card {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03);
            transition: all 0.2s ease;
        }

        .glass-card:hover {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
        }

        .header-title {
            font-weight: 700;
            color: var(--primary);
            letter-spacing: -0.5px;
        }

        /* Simple Tab Navigation */
        .admin-tabs {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 1.5rem;
            border-bottom: 2px solid var(--card-border);
            padding-bottom: 0.5rem;
        }

        .admin-tab-btn {
            background: #ffffff;
            border: 1px solid var(--card-border);
            color: var(--text-muted);
            padding: 0.55rem 1.1rem;
            border-radius: 6px;
            font-weight: 600;
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.15s ease;
        }

        .admin-tab-btn:hover {
            background: #f9fafb;
            color: var(--text-main);
        }

        .admin-tab-btn.active {
            background: var(--accent);
            border-color: var(--accent);
            color: #ffffff;
            box-shadow: 0 2px 4px rgba(37, 99, 235, 0.15);
        }

        .tab-content-panel {
            display: none;
        }

        .tab-content-panel.active {
            display: block;
        }

        /* Statistics Grid */
        .stat-card {
            padding: 1.25rem;
            position: relative;
            overflow: hidden;
            background: #ffffff;
        }

        .stat-icon {
            font-size: 2rem;
            position: absolute;
            right: 1.25rem;
            bottom: 0.5rem;
            opacity: 0.15;
            color: var(--text-muted);
        }

        .stat-value {
            font-size: 1.75rem;
            font-weight: 700;
            line-height: 1;
            margin: 0.4rem 0;
            color: #111827;
        }

        .stat-label {
            font-size: 0.75rem;
            color: var(--text-muted);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        /* Badges */
        .status-badge {
            display: inline-flex;
            align-items: center;
            padding: 0.25rem 0.6rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
        }

        .status-success {
            background-color: var(--success-light);
            color: var(--success);
            border: 1px solid #a7f3d0;
        }

        .status-failure {
            background-color: var(--danger-light);
            color: var(--danger);
            border: 1px solid #fca5a5;
        }

        .method-badge {
            font-size: 0.7rem;
            font-weight: 700;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            text-transform: uppercase;
        }

        .method-post { background-color: var(--primary-light); color: var(--accent); border: 1px solid #bfdbfe; }
        .method-put { background-color: var(--warning-light); color: var(--warning); border: 1px solid #fde047; }
        .method-delete { background-color: var(--danger-light); color: var(--danger); border: 1px solid #fca5a5; }
        .method-get { background-color: var(--success-light); color: var(--success); border: 1px solid #a7f3d0; }

        /* Form sections */
        .form-section-title {
            font-size: 0.9rem;
            font-weight: 700;
            color: var(--primary);
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 0.4rem;
            margin-bottom: 1.25rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .custom-input, .custom-select, .custom-textarea {
            background: #ffffff;
            border: 1px solid #d1d5db;
            color: #111827;
            border-radius: 6px;
            transition: all 0.15s ease;
            font-size: 0.85rem;
        }

        .custom-input:focus, .custom-select:focus, .custom-textarea:focus {
            background: #ffffff;
            border-color: var(--accent);
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
            color: #111827;
            outline: none;
        }

        label {
            font-size: 0.75rem;
            font-weight: 600;
            color: #4b5563;
            text-transform: uppercase;
            margin-bottom: 0.3rem;
            letter-spacing: 0.3px;
        }

        /* Asset Grid */
        .uploaded-img-card {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 0.75rem;
            text-align: center;
        }

        .uploaded-img-card img {
            max-width: 100%;
            height: 80px;
            object-fit: contain;
            border-radius: 4px;
            margin-bottom: 0.5rem;
            background: #f9fafb;
            border: 1px solid #f3f4f6;
            padding: 4px;
        }

        /* Table styles */
        .custom-table {
            color: #1f2937;
            margin-bottom: 0;
            background-color: #ffffff;
        }

        .custom-table th {
            border-top: none;
            border-bottom: 2px solid #e5e7eb;
            background-color: #f9fafb;
            color: #4b5563;
            font-weight: 600;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .custom-table td {
            border-top: 1px solid #f3f4f6;
            vertical-align: middle;
            font-size: 0.85rem;
            padding: 0.75rem;
        }

        .custom-table.logs-table tbody tr {
            cursor: pointer;
        }

        .custom-table tbody tr:hover {
            background-color: #f9fafb;
        }

        /* Operator Badge */
        .user-avatar {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #e0e7ff;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 0.75rem;
            color: #4f46e5;
            margin-right: 0.5rem;
            text-transform: uppercase;
        }

        /* Modal Styles */
        .modal-content.glass-modal {
            background: #ffffff;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            color: #111827;
        }

        .modal-header { border-bottom: 1px solid #e5e7eb; }
        .modal-footer { border-top: 1px solid #e5e7eb; }

        .live-indicator {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #10b981;
            margin-right: 6px;
            box-shadow: 0 0 6px #10b981;
        }
        .live-indicator.paused {
            background-color: #9ca3af;
            box-shadow: none;
        }
        .pulse { animation: pulse-animation 2s infinite; }

        @keyframes pulse-animation {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); }
            70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
    </style>
</head>
<body>

    <div class="container-fluid px-md-5 mt-4">
        <!-- TOP HEADER -->
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom" style="border-color: var(--card-border) !important;">
            <div>
                <h1 class="header-title mb-1">SYSTEM ADMINISTRATION</h1>
                <p class="text-muted mb-0">Standalone operations controller, company profile settings, registry oversight, and transactions audit.</p>
            </div>
            
            <div class="d-flex align-items-center mt-3 mt-md-0" style="gap: 10px;">
                <div class="d-flex align-items-center mr-3 px-3 py-2 glass-card" id="autoRefreshContainer">
                    <span id="liveStatusIndicator" class="live-indicator pulse"></span>
                    <span class="small font-weight-bold" id="liveStatusText" style="color: var(--text-muted);">LIVE AUTOREFRESH (5s)</span>
                    <div class="custom-control custom-switch ml-3">
                        <input type="checkbox" class="custom-control-input" id="autoRefreshToggle" checked>
                        <label class="custom-control-label" for="autoRefreshToggle"></label>
                    </div>
                </div>

                <button class="btn btn-outline-secondary px-3" id="manualRefreshBtn" style="border-radius: 6px; border: 1px solid var(--card-border); background: white;">
                    <i class="bi bi-arrow-clockwise"></i> Refresh
                </button>
                <button class="btn btn-danger px-3" id="clearLogsBtn" style="border-radius: 6px; background-color: var(--danger); border: none;">
                    <i class="bi bi-trash"></i> Clear Logs
                </button>
            </div>
        </div>

        <!-- NAVIGATION TABS -->
        <div class="admin-tabs">
            <button class="admin-tab-btn active" data-target="tab-activity-logs">
                <i class="bi bi-activity mr-2"></i>System Activity Logs
            </button>
            <button class="admin-tab-btn" data-target="tab-company-settings">
                <i class="bi bi-building-gear mr-2"></i>Company Configuration
            </button>
            <button class="admin-tab-btn" data-target="tab-branch-manager">
                <i class="bi bi-git-branch mr-2"></i>Branch Registry
            </button>
            <button class="admin-tab-btn" data-target="tab-user-manager">
                <i class="bi bi-people mr-2"></i>System Operators
            </button>
            <button class="admin-tab-btn" data-target="tab-customer-manager">
                <i class="bi bi-person-badge mr-2"></i>Customer Registry
            </button>
            <button class="admin-tab-btn" data-target="tab-savings-manager">
                <i class="bi bi-wallet2 mr-2"></i>Savings Portfolios
            </button>
            <button class="admin-tab-btn" data-target="tab-loan-manager">
                <i class="bi bi-cash-coin mr-2"></i>Loan Portfolios
            </button>
            <button class="admin-tab-btn" data-target="tab-transaction-manager">
                <i class="bi bi-journal-text mr-2"></i>Ledger Transactions
            </button>
        </div>

        <!-- ============================================== -->
        <!-- TAB 1: SYSTEM ACTIVITY LOGS PANEL -->
        <!-- ============================================== -->
        <div class="tab-content-panel active" id="tab-activity-logs">
            <!-- STATS CARDS ROW -->
            <div class="row mb-4">
                <div class="col-md-3 col-sm-6 mb-3 mb-md-0">
                    <div class="glass-card stat-card">
                        <div class="stat-label">Total Activities</div>
                        <div class="stat-value" id="totalActivitiesCount">-</div>
                        <div class="stat-icon"><i class="bi bi-activity"></i></div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 mb-3 mb-md-0">
                    <div class="glass-card stat-card" style="border-left: 3px solid var(--success) !important;">
                        <div class="stat-label">Success Rate</div>
                        <div class="stat-value text-success" id="successRateVal">-</div>
                        <div class="stat-icon"><i class="bi bi-check-circle"></i></div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 mb-3 mb-md-0">
                    <div class="glass-card stat-card" style="border-left: 3px solid var(--danger) !important;">
                        <div class="stat-label">Failure Rate</div>
                        <div class="stat-value text-danger" id="failureRateVal">-</div>
                        <div class="stat-icon"><i class="bi bi-x-circle"></i></div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="glass-card stat-card">
                        <div class="stat-label">Unique Operators</div>
                        <div class="stat-value text-info" id="uniqueUsersCount">-</div>
                        <div class="stat-icon"><i class="bi bi-people"></i></div>
                    </div>
                </div>
            </div>

            <!-- SEARCH AND FILTERS BAR -->
            <div class="glass-card p-3 mb-4" style="background: white;">
                <div class="row">
                    <div class="col-md-4 mb-2 mb-md-0">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text bg-transparent border-right-0" style="border-color: var(--card-border); color: var(--text-muted);"><i class="bi bi-search"></i></span>
                            </div>
                            <input type="text" class="form-control custom-input border-left-0 pl-0" id="searchFilter" placeholder="Search by Action, Details, User, URL...">
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-4 mb-2 mb-sm-0">
                        <select class="form-control custom-select" id="statusFilter">
                            <option value="ALL">All Statuses</option>
                            <option value="SUCCESS">Success Only</option>
                            <option value="FAILURE">Failure Only</option>
                        </select>
                    </div>
                    <div class="col-md-3 col-sm-4 mb-2 mb-sm-0">
                        <select class="form-control custom-select" id="userFilter">
                            <option value="ALL">All Operators</option>
                        </select>
                    </div>
                    <div class="col-md-2 col-sm-4">
                        <select class="form-control custom-select" id="methodFilter">
                            <option value="ALL">All Methods</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                            <option value="GET">GET</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- MAIN DATA TABLE CARD -->
            <div class="glass-card p-0" style="overflow: hidden; background: white;">
                <div class="table-responsive" style="max-height: 55vh;">
                    <table class="table custom-table logs-table" id="activityLogsTable">
                        <thead>
                            <tr>
                                <th style="width: 80px;">Log ID</th>
                                <th style="width: 180px;">Timestamp</th>
                                <th style="width: 180px;">Operator</th>
                                <th style="width: 250px;">Action</th>
                                <th style="width: 90px;">Method</th>
                                <th style="width: 100px;">Status</th>
                                <th>Details</th>
                                <th style="width: 140px;">Client IP</th>
                            </tr>
                        </thead>
                        <tbody id="logsTableBody">
                            <tr>
                                <td colspan="8" class="text-center py-5 text-muted">
                                    <div class="spinner-border text-primary mb-2" role="status"></div>
                                    <p class="mb-0">Loading activity logs...</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- ============================================== -->
        <!-- TAB 2: COMPANY CONFIGURATION PANEL -->
        <!-- ============================================== -->
        <div class="tab-content-panel" id="tab-company-settings">
            <div class="glass-card p-4" style="background: white;">
                <form id="companyConfigForm">
                    <input type="hidden" name="id" id="comp-id" value="1">
                    
                    <!-- Form Section: Basic Details -->
                    <div class="form-section-title">Company Identity</div>
                    <div class="row mb-3">
                        <div class="col-md-4 mb-3">
                            <label>Company Name <span class="text-danger">*</span></label>
                            <input type="text" class="form-control custom-input" id="comp-companyName" required placeholder="Enter Company Name">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label>Short Name <span class="text-danger">*</span></label>
                            <input type="text" class="form-control custom-input" id="comp-shortName" required placeholder="Enter Short Name">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label>Sign Up Date <span class="text-danger">*</span></label>
                            <input type="date" class="form-control custom-input" id="comp-signUpDate" required>
                        </div>
                    </div>

                    <!-- Form Section: Identifiers -->
                    <div class="form-section-title">Registration Identifiers</div>
                    <div class="row mb-3">
                        <div class="col-md-3 mb-3">
                            <label>CIN No</label>
                            <input type="text" class="form-control custom-input" id="comp-cinNo" placeholder="Enter CIN Number">
                        </div>
                        <div class="col-md-3 mb-3">
                            <label>PAN Card No</label>
                            <input type="text" class="form-control custom-input" id="comp-pan" placeholder="Enter PAN Number">
                        </div>
                        <div class="col-md-3 mb-3">
                            <label>TAN No</label>
                            <input type="text" class="form-control custom-input" id="comp-tan" placeholder="Enter TAN Number">
                        </div>
                        <div class="col-md-3 mb-3">
                            <label>GSTIN</label>
                            <input type="text" class="form-control custom-input" id="comp-gstin" placeholder="Enter GSTIN Number">
                        </div>
                    </div>

                    <!-- Form Section: Addresses & Contact -->
                    <div class="form-section-title">Contact & Addresses Details</div>
                    <div class="row mb-3">
                        <div class="col-md-6 mb-3">
                            <label>Full Address</label>
                            <textarea class="form-control custom-input" id="comp-address" rows="3" placeholder="Enter Address Details"></textarea>
                        </div>
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <label>City</label>
                                    <input type="text" class="form-control custom-input" id="comp-city" placeholder="City">
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label>State</label>
                                    <input type="text" class="form-control custom-input" id="comp-state" placeholder="State">
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label>Pin Code</label>
                                    <input type="text" class="form-control custom-input" id="comp-pinCode" placeholder="Pin Code">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label>Email ID</label>
                                    <input type="email" class="form-control custom-input" id="comp-emailId" placeholder="Email Address">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label>Helpline No</label>
                                    <input type="text" class="form-control custom-input" id="comp-helplineNo" placeholder="Helpline Number">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Form Section: Financial Details -->
                    <div class="form-section-title">Financial Profile Settings</div>
                    <div class="row mb-3">
                        <div class="col-md-3 mb-3">
                            <label>Authorized Capital</label>
                            <input type="text" class="form-control custom-input" id="comp-authorizedShareCapital" placeholder="Authorized Capital">
                        </div>
                        <div class="col-md-3 mb-3">
                            <label>Paid-up Capital</label>
                            <input type="text" class="form-control custom-input" id="comp-paidUpCapital" placeholder="Paid-up Capital">
                        </div>
                        <div class="col-md-3 mb-3">
                            <label>NOF Value</label>
                            <input type="text" class="form-control custom-input" id="comp-nof" placeholder="NOF Value" readonly>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label>Declared Value</label>
                            <input type="text" class="form-control custom-input" id="comp-declaredValue" placeholder="Declared Value" readonly>
                        </div>
                    </div>

                    <!-- Form Section: Tax & Operations -->
                    <div class="form-section-title">Taxation & Operations</div>
                    <div class="row mb-4">
                        <div class="col-md-3 mb-3">
                            <label>TDS (With PAN) %</label>
                            <input type="text" class="form-control custom-input" id="comp-tdsWithPan" placeholder="TDS % With PAN">
                        </div>
                        <div class="col-md-3 mb-3">
                            <label>TDS (Without PAN) %</label>
                            <input type="text" class="form-control custom-input" id="comp-tdsWithoutPan" placeholder="TDS % Without PAN">
                        </div>
                        <div class="col-md-3 mb-3">
                            <label>Tax Deduction</label>
                            <input type="text" class="form-control custom-input" id="comp-taxDeduction" placeholder="Tax Deduction">
                        </div>
                        <div class="col-md-3 mb-3">
                            <label>Manager Contact No</label>
                            <input type="text" class="form-control custom-input" id="comp-branchManagerContactNo" placeholder="Manager Contact No">
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary px-5 py-2 font-weight-bold" style="border-radius: 6px; background-color: var(--accent); border: none;">
                        <i class="bi bi-save mr-2"></i> Save Company Settings
                    </button>
                </form>

                <!-- Dynamic Image Uploads Section -->
                <div class="form-section-title mt-5">Company Media & Uploads</div>
                <div class="row">
                    <!-- Upload Input Card -->
                    <div class="col-md-4 mb-4">
                        <div class="glass-card p-3 h-100" style="background: #f9fafb;">
                            <h6 class="font-weight-bold text-indigo mb-3" style="color: var(--primary);"><i class="bi bi-upload mr-2"></i>Upload Image Asset</h6>
                            <form id="companyUploadForm" enctype="multipart/form-data">
                                <div class="form-group">
                                    <label>Asset Label Name</label>
                                    <input type="text" class="form-control custom-input" id="uploadImageName" required placeholder="e.g. LOGO, REG_CERTIFICATE...">
                                </div>
                                <div class="form-group">
                                    <label>Choose File</label>
                                    <input type="file" class="form-control-file text-muted" id="uploadImageFile" required>
                                </div>
                                <button type="submit" class="btn btn-primary btn-block mt-3" style="background-color: var(--accent); border: none; border-radius: 6px;">
                                    <i class="bi bi-cloud-arrow-up mr-2"></i> Upload Asset
                                </button>
                            </form>
                        </div>
                    </div>

                    <!-- Stored Images View -->
                    <div class="col-md-8 mb-4">
                        <div class="glass-card p-3 h-100">
                            <h6 class="font-weight-bold text-indigo mb-3" style="color: var(--primary);"><i class="bi bi-images mr-2"></i>Registered Assets Preview</h6>
                            <div class="row" id="companyImagesGrid">
                                <div class="col-12 text-center text-muted py-4">No asset images uploaded yet.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ============================================== -->
        <!-- TAB 3: BRANCH REGISTRY & MANAGEMENT PANEL -->
        <!-- ============================================== -->
        <div class="tab-content-panel" id="tab-branch-manager">
            <!-- MAIN BRANCHES TABLE CARD -->
            <div class="glass-card p-0" style="overflow: hidden; background: white;">
                <div class="table-responsive">
                    <table class="table custom-table" id="adminBranchTable">
                        <thead>
                            <tr>
                                <th style="width: 80px;">SR No</th>
                                <th>Branch Code</th>
                                <th>Branch Name</th>
                                <th>Opening Date</th>
                                <th>Address</th>
                                <th>Pin Code</th>
                                <th>State</th>
                                <th>Branch Manager Contact</th>
                                <th>Account Dept Contact</th>
                                <th style="width: 120px; text-align: center;">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="branchTableBody">
                            <tr>
                                <td colspan="10" class="text-center py-5 text-muted">
                                    <div class="spinner-border text-primary mb-2" role="status"></div>
                                    <p class="mb-0">Loading branches registry...</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- ============================================== -->
        <!-- TAB 4: SYSTEM OPERATORS (USERS) PANEL -->
        <!-- ============================================== -->
        <div class="tab-content-panel" id="tab-user-manager">
            <div class="glass-card p-0" style="overflow: hidden; background: white;">
                <div class="table-responsive">
                    <table class="table custom-table" id="adminUserTable">
                        <thead>
                            <tr>
                                <th style="width: 80px;">SR No</th>
                                <th>Full Name</th>
                                <th>User ID</th>
                                <th>Email ID</th>
                                <th>Contact Number</th>
                                <th>Sign-in Branch</th>
                                <th>Delete Access</th>
                                <th style="width: 120px; text-align: center;">Status</th>
                            </tr>
                        </thead>
                        <tbody id="userTableBody">
                            <tr>
                                <td colspan="8" class="text-center py-5 text-muted">
                                    <div class="spinner-border text-primary mb-2" role="status"></div>
                                    <p class="mb-0">Loading system operators...</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- ============================================== -->
        <!-- TAB 5: CUSTOMER REGISTRY PANEL -->
        <!-- ============================================== -->
        <div class="tab-content-panel" id="tab-customer-manager">
            <div class="glass-card p-0" style="overflow: hidden; background: white;">
                <div class="table-responsive" style="max-height: 60vh;">
                    <table class="table custom-table" id="adminCustomerTable">
                        <thead>
                            <tr>
                                <th style="width: 80px;">SR No</th>
                                <th>Member Code</th>
                                <th>Customer Name</th>
                                <th>Mobile Number</th>
                                <th>Signup Date</th>
                                <th>PAN Card</th>
                                <th>Aadhar Number</th>
                                <th style="width: 150px; text-align: center;">Verification</th>
                            </tr>
                        </thead>
                        <tbody id="customerTableBody">
                            <tr>
                                <td colspan="8" class="text-center py-5 text-muted">
                                    <div class="spinner-border text-primary mb-2" role="status"></div>
                                    <p class="mb-0">Loading customer registry...</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- ============================================== -->
        <!-- TAB 6: SAVINGS PORTFOLIOS PANEL -->
        <!-- ============================================== -->
        <div class="tab-content-panel" id="tab-savings-manager">
            <div class="glass-card p-0" style="overflow: hidden; background: white;">
                <div class="table-responsive" style="max-height: 60vh;">
                    <table class="table custom-table" id="adminSavingsTable">
                        <thead>
                            <tr>
                                <th style="width: 80px;">SR No</th>
                                <th>Account Number</th>
                                <th>Customer Name</th>
                                <th>Member Code</th>
                                <th>Branch Name</th>
                                <th>Opening Date</th>
                                <th style="text-align: right;">Opening Balance (Rs.)</th>
                            </tr>
                        </thead>
                        <tbody id="savingsTableBody">
                            <tr>
                                <td colspan="7" class="text-center py-5 text-muted">
                                    <div class="spinner-border text-primary mb-2" role="status"></div>
                                    <p class="mb-0">Loading savings accounts...</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- ============================================== -->
        <!-- TAB 7: LOAN PORTFOLIOS PANEL -->
        <!-- ============================================== -->
        <div class="tab-content-panel" id="tab-loan-manager">
            <div class="glass-card p-0" style="overflow: hidden; background: white;">
                <div class="table-responsive" style="max-height: 60vh;">
                    <table class="table custom-table" id="adminLoanTable">
                        <thead>
                            <tr>
                                <th style="width: 80px;">SR No</th>
                                <th>Loan Application No</th>
                                <th>Member Code</th>
                                <th>Customer Name</th>
                                <th style="text-align: right;">Loan Amount (Rs.)</th>
                                <th style="text-align: right;">Interest Rate (%)</th>
                                <th>Loan Scheme</th>
                                <th style="width: 140px; text-align: center;">Status</th>
                            </tr>
                        </thead>
                        <tbody id="loanTableBody">
                            <tr>
                                <td colspan="8" class="text-center py-5 text-muted">
                                    <div class="spinner-border text-primary mb-2" role="status"></div>
                                    <p class="mb-0">Loading loan applications...</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- ============================================== -->
        <!-- TAB 8: GENERAL LEDGER TRANSACTIONS PANEL -->
        <!-- ============================================== -->
        <div class="tab-content-panel" id="tab-transaction-manager">
            <div class="glass-card p-0" style="overflow: hidden; background: white;">
                <div class="table-responsive" style="max-height: 60vh;">
                    <table class="table custom-table" id="adminTransactionTable">
                        <thead>
                            <tr>
                                <th style="width: 80px;">SR No</th>
                                <th>Voucher No</th>
                                <th>Transaction Date</th>
                                <th>Ledger Account Head</th>
                                <th style="text-align: right;">Debit (Rs.)</th>
                                <th style="text-align: right;">Credit (Rs.)</th>
                                <th>Narration / Remarks</th>
                                <th>Branch Location</th>
                            </tr>
                        </thead>
                        <tbody id="transactionTableBody">
                            <tr>
                                <td colspan="8" class="text-center py-5 text-muted">
                                    <div class="spinner-border text-primary mb-2" role="status"></div>
                                    <p class="mb-0">Loading general ledger transactions...</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>

    <!-- LOG DETAIL VIEW MODAL -->
    <div class="modal fade" id="logDetailsModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content glass-modal">
                <div class="modal-header">
                    <h5 class="modal-title font-weight-bold text-indigo" style="color: var(--primary) !important;"><i class="bi bi-info-circle-fill mr-2 text-primary"></i>Log Detailed Audit</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label>Log Record ID</label>
                            <div class="font-weight-bold h5 text-primary" id="modalLogId"></div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>Timestamp</label>
                            <div class="font-weight-bold" id="modalTimestamp"></div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>Operator</label>
                            <div class="font-weight-bold" id="modalOperator"></div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>Client IP Address</label>
                            <div class="font-weight-bold" id="modalIpAddress"></div>
                        </div>
                        <div class="col-md-12 mb-3">
                            <hr style="border-top: 1px solid var(--card-border)">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>Action Type</label>
                            <div class="font-weight-bold" id="modalAction"></div>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label>Request Method</label>
                            <div id="modalMethod"></div>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label>Execution Status</label>
                            <div id="modalStatus"></div>
                        </div>
                        <div class="col-md-12 mb-3">
                            <label>Request URL</label>
                            <div class="p-2 bg-light border rounded text-monospace small" id="modalUrl" style="word-break: break-all; color: var(--text-main);"></div>
                        </div>
                        <div class="col-md-12">
                            <label>Log Payload & Details</label>
                            <pre class="p-3 bg-light border text-dark rounded text-monospace small" id="modalDetails" style="white-space: pre-wrap; word-break: break-all; max-height: 200px; overflow-y: auto;"></pre>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- CLEAR LOGS CONFIRMATION MODAL -->
    <div class="modal fade" id="clearConfirmModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content glass-modal">
                <div class="modal-header">
                    <h5 class="modal-title font-weight-bold text-danger"><i class="bi bi-exclamation-triangle-fill mr-2"></i>Clear Audit Log History?</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="mb-0">This action is irreversible. It will delete all stored audit logs and activities from the database. Are you sure?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" id="confirmClearBtn">Delete Logs Permanently</button>
                </div>
            </div>
        </div>
    </div>

    <!-- BRANCH DELETION CONFIRMATION MODAL -->
    <div class="modal fade" id="branchDeleteConfirmModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content glass-modal">
                <div class="modal-header">
                    <h5 class="modal-title font-weight-bold text-danger"><i class="bi bi-exclamation-triangle-fill mr-2"></i>Delete Branch Registry?</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="mb-0">This action is irreversible. It will permanently delete the branch module registry from the database. Are you sure you want to delete this branch?</p>
                    <input type="hidden" id="deleteTargetBranchId">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" id="confirmBranchDeleteBtn">Delete Branch Registry</button>
                </div>
            </div>
        </div>
    </div>

    <!-- JS Dependencies -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

    <script>
        const baseUrl = '${baseUrl}';
        let logsData = [];
        let autoRefreshTimer = null;
        const targetCompanyId = 1; // Default dynamic company ID

        // ==============================================
        // TAB CONTROLLER LOGIC
        // ==============================================
        $('.admin-tab-btn').on('click', function() {
            const targetId = $(this).attr('data-target');
            
            // Switch navigation tab active class
            $('.admin-tab-btn').removeClass('active');
            $(this).addClass('active');
            
            // Switch panel active class
            $('.tab-content-panel').removeClass('active');
            $('#' + targetId).addClass('active');

            // Toggle refresh controllers based on active tab
            if (targetId === 'tab-activity-logs') {
                $('#autoRefreshContainer').show();
                if ($('#autoRefreshToggle').is(':checked')) {
                    startAutoRefresh();
                }
            } else {
                $('#autoRefreshContainer').hide();
                stopAutoRefresh();
            }

            // Fetch contextual panel data
            if (targetId === 'tab-company-settings') {
                loadAdminCompanyDetails();
                loadAdminCompanyImages();
            } else if (targetId === 'tab-branch-manager') {
                loadAdminBranches();
            } else if (targetId === 'tab-user-manager') {
                loadAdminUsers();
            } else if (targetId === 'tab-customer-manager') {
                loadAdminCustomers();
            } else if (targetId === 'tab-savings-manager') {
                loadAdminSavings();
            } else if (targetId === 'tab-loan-manager') {
                loadAdminLoans();
            } else if (targetId === 'tab-transaction-manager') {
                loadAdminTransactions();
            }
        });

        // ==============================================
        // TAB 1: SYSTEM ACTIVITY LOGS LOGIC
        // ==============================================
        function fetchLogsData() {
            $.ajax({
                url: baseUrl + '/api/admin/activities',
                method: 'GET',
                success: function(data) {
                    logsData = data;
                    renderLogsTable();
                    populateUserFilter();
                    fetchStats();
                },
                error: function(err) {
                    console.error("Error loading logs", err);
                    $('#logsTableBody').html(`
                        <tr>
                            <td colspan="8" class="text-center py-5 text-danger">
                                <i class="bi bi-x-octagon-fill h2 mb-2 d-block"></i>
                                <p class="mb-0">Failed to fetch activities from server</p>
                            </td>
                        </tr>
                    `);
                }
            });
        }

        function fetchStats() {
            $.ajax({
                url: baseUrl + '/api/admin/stats',
                method: 'GET',
                success: function(stats) {
                    $('#totalActivitiesCount').text(stats.totalActivities);
                    if (stats.totalActivities > 0) {
                        const successPct = Math.round((stats.successCount / stats.totalActivities) * 100);
                        const failurePct = 100 - successPct;
                        $('#successRateVal').text(successPct + '%');
                        $('#failureRateVal').text(failurePct + '%');
                    } else {
                        $('#successRateVal').text('0%');
                        $('#failureRateVal').text('0%');
                    }
                    const uniqueUsers = Object.keys(stats.userStats).length;
                    $('#uniqueUsersCount').text(uniqueUsers);
                }
            });
        }

        function populateUserFilter() {
            const currentSelected = $('#userFilter').val();
            const uniqueUsers = [...new Set(logsData.map(log => log.username))].sort();
            let html = '<option value="ALL">All Operators</option>';
            uniqueUsers.forEach(user => {
                const selected = user === currentSelected ? 'selected' : '';
                html += `<option value="${user}" ${selected}>${user}</option>`;
            });
            $('#userFilter').html(html);
        }

        function formatTimestamp(tsArray) {
            if (!tsArray) return '-';
            if (Array.isArray(tsArray)) {
                const [year, month, day, hour, minute, second] = tsArray;
                const d = new Date(year, month - 1, day, hour, minute, second);
                return d.toLocaleString();
            }
            try {
                const d = new Date(tsArray);
                return d.toLocaleString();
            } catch(e) {
                return tsArray;
            }
        }

        function renderLogsTable() {
            const searchQuery = $('#searchFilter').val().toLowerCase();
            const statusFilter = $('#statusFilter').val();
            const userFilter = $('#userFilter').val();
            const methodFilter = $('#methodFilter').val();

            const filteredLogs = logsData.filter(log => {
                const matchesSearch = 
                    log.action.toLowerCase().includes(searchQuery) ||
                    log.username.toLowerCase().includes(searchQuery) ||
                    log.details.toLowerCase().includes(searchQuery) ||
                    log.url.toLowerCase().includes(searchQuery) ||
                    String(log.id).includes(searchQuery);
                const matchesStatus = statusFilter === 'ALL' || log.status === statusFilter;
                const matchesUser = userFilter === 'ALL' || log.username === userFilter;
                const matchesMethod = methodFilter === 'ALL' || log.method === methodFilter;
                return matchesSearch && matchesStatus && matchesUser && matchesMethod;
            });

            let tableHtml = '';
            if (filteredLogs.length === 0) {
                tableHtml = `<tr><td colspan="8" class="text-center py-5 text-muted"><i class="bi bi-folder-x h2 mb-2 d-block"></i>No matching activities found</td></tr>`;
            } else {
                filteredLogs.forEach(log => {
                    const initials = log.username ? log.username.substring(0, 2).toUpperCase() : 'AN';
                    const timestampStr = formatTimestamp(log.timestamp);
                    const statusClass = log.status === 'SUCCESS' ? 'status-success' : 'status-failure';
                    const methodClass = 'method-' + log.method.toLowerCase();
                    tableHtml += `
                        <tr onclick="showDetails(\${log.id})">
                            <td class="font-weight-bold text-primary">#\${log.id}</td>
                            <td class="text-muted small">\${timestampStr}</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <div class="user-avatar">\dots \${initials}</div>
                                    <span>\${log.username}</span>
                                </div>
                            </td>
                            <td class="font-weight-bold">\${log.action}</td>
                            <td><span class="method-badge \${methodClass}">\${log.method}</span></td>
                            <td><span class="status-badge \${statusClass}">\${log.status}</span></td>
                            <td class="text-truncate text-muted small" style="max-width: 230px;">\${log.details}</td>
                            <td class="text-muted text-monospace small">\${log.ipAddress}</td>
                        </tr>
                    `;
                });
            }
            // Fix double backslash rendering in avatar loop initials
            tableHtml = tableHtml.replace(/\\dots /g, '');
            $('#logsTableBody').html(tableHtml);
        }

        window.showDetails = function(id) {
            const log = logsData.find(l => l.id === id);
            if (!log) return;
            $('#modalLogId').text('#' + log.id);
            $('#modalTimestamp').text(formatTimestamp(log.timestamp));
            $('#modalOperator').text(log.username);
            $('#modalIpAddress').text(log.ipAddress);
            $('#modalAction').text(log.action);
            $('#modalUrl').text(log.url);
            $('#modalMethod').html(`<span class="method-badge method-\${log.method.toLowerCase()}">\${log.method}</span>`);
            $('#modalStatus').html(`<span class="status-badge \${log.status === 'SUCCESS' ? 'status-success' : 'status-failure'}">\${log.status}</span>`);
            $('#modalDetails').text(log.details);
            $('#logDetailsModal').modal('show');
        }

        // ==============================================
        // TAB 2: COMPANY CONFIGURATION LOGIC
        // ==============================================
        function calculateAdminNoOfShares() {
            var paidUpCapital = parseFloat($('#comp-paidUpCapital').val()) || 0;
            var declaredValue = parseFloat($('#comp-declaredValue').val()) || 0;
            if (declaredValue > 0) {
                var noOfShares = paidUpCapital / declaredValue;
                if (noOfShares % 1 === 0) {
                    $('#comp-nof').val(noOfShares);
                } else {
                    $('#comp-nof').val(noOfShares.toFixed(2));
                }
            } else {
                $('#comp-nof').val(0);
            }
        }

        $(document).on('input', '#comp-paidUpCapital, #comp-declaredValue', function() {
            calculateAdminNoOfShares();
        });

        function loadAdminCompanyDetails() {
            $.ajax({
                url: baseUrl + "/api/preference/" + targetCompanyId,
                type: "GET",
                success: function(data) {
                    $('#comp-id').val(data.id);
                    $('#comp-companyName').val(data.companyName);
                    $('#comp-shortName').val(data.shortName);
                    $('#comp-signUpDate').val(data.signUpDate);
                    $('#comp-cinNo').val(data.cinNo);
                    $('#comp-pan').val(data.pan);
                    $('#comp-tan').val(data.tan);
                    $('#comp-gstin').val(data.gstin);
                    $('#comp-declaredValue').val(100);
                    $('#comp-address').val(data.address);
                    $('#comp-state').val(data.state);
                    $('#comp-city').val(data.city);
                    $('#comp-pinCode').val(data.pinCode);
                    $('#comp-emailId').val(data.emailId);
                    $('#comp-authorizedShareCapital').val(data.authorizedShareCapital);
                    $('#comp-paidUpCapital').val(data.paidUpCapital);
                    $('#comp-nof').val(data.nof);
                    $('#comp-helplineNo').val(data.helplineNo);
                    $('#comp-tdsWithPan').val(data.tdsWithPan);
                    $('#comp-tdsWithoutPan').val(data.tdsWithoutPan);
                    $('#comp-taxDeduction').val(data.taxDeduction);
                    $('#comp-branchManagerContactNo').val(data.branchManagerContactNo);
                    calculateAdminNoOfShares();
                },
                error: function(err) {
                    console.error("Error loading company details", err);
                }
            });
        }

        function loadAdminCompanyImages() {
            $.ajax({
                url: baseUrl + "/api/preference/images/" + targetCompanyId,
                type: "GET",
                success: function(images) {
                    let gridHtml = '';
                    if (images && images.length > 0) {
                        images.forEach(img => {
                            gridHtml += `
                                <div class="col-md-3 col-sm-6 mb-3">
                                    <div class="uploaded-img-card">
                                        <img src="${baseUrl}/Uploads/\${img.imageName}" alt="\${img.imageFieldName}">
                                        <div class="small font-weight-bold text-truncate">\${img.imageFieldName}</div>
                                        <button class="btn btn-outline-danger btn-xs btn-block mt-2 py-1" onclick="deleteCompanyImage(\${img.id})" style="font-size:0.75rem; border-radius:4px;">
                                            <i class="bi bi-trash"></i> Delete
                                        </button>
                                    </div>
                                </div>
                            `;
                        });
                    } else {
                        gridHtml = '<div class="col-12 text-center text-muted py-4"><i class="bi bi-images h2 d-block"></i>No asset images uploaded yet.</div>';
                    }
                    $('#companyImagesGrid').html(gridHtml);
                }
            });
        }

        // Save company details form
        $('#companyConfigForm').on('submit', function(e) {
            e.preventDefault();
            calculateAdminNoOfShares();
            const configData = {
                id: targetCompanyId,
                companyName: $('#comp-companyName').val(),
                shortName: $('#comp-shortName').val(),
                signUpDate: $('#comp-signUpDate').val(),
                cinNo: $('#comp-cinNo').val(),
                pan: $('#comp-pan').val(),
                tan: $('#comp-tan').val(),
                gstin: $('#comp-gstin').val(),
                declaredValue: $('#comp-declaredValue').val(),
                address: $('#comp-address').val(),
                state: $('#comp-state').val(),
                city: $('#comp-city').val(),
                pinCode: $('#comp-pinCode').val(),
                emailId: $('#comp-emailId').val(),
                authorizedShareCapital: $('#comp-authorizedShareCapital').val(),
                paidUpCapital: $('#comp-paidUpCapital').val(),
                nof: $('#comp-nof').val(),
                helplineNo: $('#comp-helplineNo').val(),
                tdsWithPan: $('#comp-tdsWithPan').val(),
                tdsWithoutPan: $('#comp-tdsWithoutPan').val(),
                taxDeduction: $('#comp-taxDeduction').val(),
                branchManagerContactNo: $('#comp-branchManagerContactNo').val()
            };

            $.ajax({
                url: baseUrl + "/api/preference/update",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(configData),
                success: function() {
                    alert("Company Settings configuration saved successfully!");
                    loadAdminCompanyDetails();
                },
                error: function(err) {
                    alert("Failed to save company settings: " + err.responseText);
                }
            });
        });

        // Upload company image
        $('#companyUploadForm').on('submit', function(e) {
            e.preventDefault();
            const label = $('#uploadImageName').val().trim().toUpperCase();
            const fileInput = $('#uploadImageFile')[0];
            
            if (fileInput.files.length === 0) {
                alert("Please select a file to upload.");
                return;
            }

            const formData = new FormData();
            formData.append("fieldName", label);
            formData.append("file", fileInput.files[0]);

            $.ajax({
                url: baseUrl + `/api/preference/upload/\${targetCompanyId}`,
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function() {
                    alert("Asset image uploaded successfully!");
                    $('#companyUploadForm')[0].reset();
                    loadAdminCompanyImages();
                },
                error: function(err) {
                    alert("Asset upload failed: " + err.responseText);
                }
            });
        });

        window.deleteCompanyImage = function(id) {
            if (confirm("Are you sure you want to delete this company image asset?")) {
                $.ajax({
                    url: baseUrl + `/api/preference/delete/\${id}`,
                    type: "POST",
                    success: function() {
                        alert("Asset image deleted successfully.");
                        loadAdminCompanyImages();
                    },
                    error: function(err) {
                        alert("Failed to delete asset: " + err.responseText);
                    }
                });
            }
        };

        // ==============================================
        // TAB 3: BRANCH REGISTRY MANAGEMENT LOGIC
        // ==============================================
        function loadAdminBranches() {
            $.ajax({
                url: baseUrl + "/api/preference/getAllBranchModule",
                type: "GET",
                success: function(response) {
                    let branches = [];
                    if (response.data && Array.isArray(response.data)) {
                        branches = response.data;
                    } else if (Array.isArray(response)) {
                        branches = response;
                    }
                    
                    let tableHtml = '';
                    if (branches.length === 0) {
                        tableHtml = '<tr><td colspan="10" class="text-center py-5 text-muted"><i class="bi bi-diagram-3 h2 d-block"></i>No branches registered in the database.</td></tr>';
                    } else {
                        branches.forEach((branch, index) => {
                            tableHtml += `
                                <tr>
                                    <td>\${index + 1}</td>
                                    <td class="font-weight-bold text-primary">\${branch.branchCode}</td>
                                    <td>\${branch.branchName}</td>
                                    <td>\${branch.openingDate}</td>
                                    <td class="small text-muted" style="max-width: 150px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">\${branch.address}</td>
                                    <td>\${branch.pin}</td>
                                    <td>\${branch.state}</td>
                                    <td>\${branch.branchManagerContactNo}</td>
                                    <td>\${branch.accountDepartmentContactNo}</td>
                                    <td style="text-align: center;">
                                        <button class="btn btn-danger btn-sm px-3" onclick="requestDeleteBranch(\${branch.id})" style="border-radius: 4px;">
                                            <i class="bi bi-trash-fill"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            `;
                        });
                    }
                    $('#branchTableBody').html(tableHtml);
                },
                error: function(err) {
                    console.error("Error loading branches", err);
                    $('#branchTableBody').html('<tr><td colspan="10" class="text-center py-5 text-danger"><i class="bi bi-exclamation-triangle h2 d-block"></i>Failed to load branches from database</td></tr>');
                }
            });
        }

        window.requestDeleteBranch = function(id) {
            $('#deleteTargetBranchId').val(id);
            $('#branchDeleteConfirmModal').modal('show');
        };

        $('#confirmBranchDeleteBtn').on('click', function() {
            const id = $('#deleteTargetBranchId').val();
            $.ajax({
                url: baseUrl + `/api/preference/deleteBranchModuleById?id=\${id}`,
                type: "POST",
                success: function() {
                    $('#branchDeleteConfirmModal').modal('hide');
                    alert("Branch Registry deleted successfully.");
                    loadAdminBranches();
                },
                error: function(err) {
                    alert("Failed to delete branch: " + err.responseText);
                }
            });
        });

        // ==============================================
        // TAB 4: SYSTEM OPERATORS LOGIC
        // ==============================================
        function loadAdminUsers() {
            $.ajax({
                url: baseUrl + "/api/userCreation/getAllUsers",
                type: "GET",
                success: function(users) {
                    let tableHtml = '';
                    if (users && users.length > 0) {
                        users.forEach((user, index) => {
                            tableHtml += `
                                <tr>
                                    <td>\${index + 1}</td>
                                    <td class="font-weight-bold">\${user.fullName || '-'}</td>
                                    <td class="text-primary font-weight-bold">\${user.userId || '-'}</td>
                                    <td>\${user.emailId || '-'}</td>
                                    <td>\${user.contactNumber || '-'}</td>
                                    <td>\${user.singInBranch || '-'}</td>
                                    <td>\${user.deleteAccess || 'No'}</td>
                                    <td style="text-align: center;">
                                        <span class="status-badge \${user.userStatus === 'Active' ? 'status-success' : 'status-failure'}">\${user.userStatus || 'Inactive'}</span>
                                    </td>
                                </tr>
                            `;
                        });
                    } else {
                        tableHtml = '<tr><td colspan="8" class="text-center py-5 text-muted"><i class="bi bi-people h2 d-block"></i>No operators registered.</td></tr>';
                    }
                    $('#userTableBody').html(tableHtml);
                },
                error: function(err) {
                    console.error("Error loading users", err);
                    $('#userTableBody').html('<tr><td colspan="8" class="text-center py-5 text-danger"><i class="bi bi-exclamation-triangle h2 d-block"></i>Failed to fetch users</td></tr>');
                }
            });
        }

        // ==============================================
        // TAB 5: CUSTOMERS REGISTRY LOGIC
        // ==============================================
        function loadAdminCustomers() {
            $.ajax({
                url: baseUrl + "/api/customermanagement/getAllCustomer",
                type: "GET",
                success: function(customers) {
                    let tableHtml = '';
                    if (customers && customers.length > 0) {
                        customers.forEach((cust, index) => {
                            tableHtml += `
                                <tr>
                                    <td>\${index + 1}</td>
                                    <td class="font-weight-bold text-primary">\${cust.memberCode || '-'}</td>
                                    <td>\${cust.customerName || '-'}</td>
                                    <td>\${cust.contactNo || '-'}</td>
                                    <td>\${cust.signupDate || '-'}</td>
                                    <td>\${cust.pan || '-'}</td>
                                    <td>\${cust.aadharNo || '-'}</td>
                                    <td style="text-align: center;">
                                        <span class="status-badge \${cust.verified ? 'status-success' : 'status-failure'}">\${cust.verified ? 'VERIFIED' : 'UNVERIFIED'}</span>
                                    </td>
                                </tr>
                            `;
                        });
                    } else {
                        tableHtml = '<tr><td colspan="8" class="text-center py-5 text-muted"><i class="bi bi-person-badge h2 d-block"></i>No customers registered.</td></tr>';
                    }
                    $('#customerTableBody').html(tableHtml);
                },
                error: function(err) {
                    console.error("Error loading customers", err);
                    $('#customerTableBody').html('<tr><td colspan="8" class="text-center py-5 text-danger"><i class="bi bi-exclamation-triangle h2 d-block"></i>Failed to fetch customers</td></tr>');
                }
            });
        }

        // ==============================================
        // TAB 6: SAVINGS ACCOUNTS LOGIC
        // ==============================================
        function loadAdminSavings() {
            $.ajax({
                url: baseUrl + "/api/reports/getApprovedSavingAccount",
                type: "GET",
                success: function(response) {
                    let accounts = [];
                    if (response.data && Array.isArray(response.data)) {
                        accounts = response.data;
                    } else if (Array.isArray(response)) {
                        accounts = response;
                    }

                    let tableHtml = '';
                    if (accounts && accounts.length > 0) {
                        accounts.forEach((acc, index) => {
                            tableHtml += `
                                <tr>
                                    <td>\${index + 1}</td>
                                    <td class="font-weight-bold text-primary">\${acc.accountNo || '-'}</td>
                                    <td>\${acc.customerName || '-'}</td>
                                    <td>\${acc.memberCode || '-'}</td>
                                    <td>\${acc.branchName || '-'}</td>
                                    <td>\${acc.openingDate || '-'}</td>
                                    <td style="text-align: right;" class="font-weight-bold">\${acc.openingBalance || '0.00'}</td>
                                </tr>
                            `;
                        });
                    } else {
                        tableHtml = '<tr><td colspan="7" class="text-center py-5 text-muted"><i class="bi bi-wallet2 h2 d-block"></i>No savings accounts registered.</td></tr>';
                    }
                    $('#savingsTableBody').html(tableHtml);
                },
                error: function(err) {
                    console.error("Error loading savings", err);
                    $('#savingsTableBody').html('<tr><td colspan="7" class="text-center py-5 text-danger"><i class="bi bi-exclamation-triangle h2 d-block"></i>Failed to fetch savings</td></tr>');
                }
            });
        }

        // ==============================================
        // TAB 7: LOAN PORTFOLIOS LOGIC
        // ==============================================
        function loadAdminLoans() {
            $.ajax({
                url: baseUrl + "/api/reports/getAllLoanApplication",
                type: "GET",
                success: function(response) {
                    let loans = [];
                    if (response.data && Array.isArray(response.data)) {
                        loans = response.data;
                    } else if (Array.isArray(response)) {
                        loans = response;
                    }

                    let tableHtml = '';
                    if (loans && loans.length > 0) {
                        loans.forEach((loan, index) => {
                            tableHtml += `
                                <tr>
                                    <td>\${index + 1}</td>
                                    <td class="font-weight-bold text-primary">\${loan.applicationNo || '-'}</td>
                                    <td>\${loan.memberCode || '-'}</td>
                                    <td>\${loan.customerName || '-'}</td>
                                    <td style="text-align: right;" class="font-weight-bold">\${loan.loanAmount || '0.00'}</td>
                                    <td style="text-align: right;">\${loan.interestRate || '0'}%</td>
                                    <td>\${loan.loanScheme || '-'}</td>
                                    <td style="text-align: center;">
                                        <span class="status-badge \${loan.loanStatus === 'APPROVED' ? 'status-success' : 'status-failure'}">\${loan.loanStatus || 'PENDING'}</span>
                                    </td>
                                </tr>
                            `;
                        });
                    } else {
                        tableHtml = '<tr><td colspan="8" class="text-center py-5 text-muted"><i class="bi bi-cash-coin h2 d-block"></i>No loan applications registered.</td></tr>';
                    }
                    $('#loanTableBody').html(tableHtml);
                },
                error: function(err) {
                    console.error("Error loading loans", err);
                    $('#loanTableBody').html('<tr><td colspan="8" class="text-center py-5 text-danger"><i class="bi bi-exclamation-triangle h2 d-block"></i>Failed to fetch loans</td></tr>');
                }
            });
        }

        // ==============================================
        // TAB 8: BOOKKEEPING LEDGER TRANSACTIONS LOGIC
        // ==============================================
        function loadAdminTransactions() {
            $.ajax({
                url: baseUrl + "/api/preference/fetchAllTransactions",
                type: "GET",
                success: function(response) {
                    let txs = [];
                    if (response.data && Array.isArray(response.data)) {
                        txs = response.data;
                    } else if (Array.isArray(response)) {
                        txs = response;
                    }

                    let tableHtml = '';
                    if (txs && txs.length > 0) {
                        txs.forEach((tx, index) => {
                            tableHtml += `
                                <tr>
                                    <td>\${index + 1}</td>
                                    <td class="font-weight-bold text-primary">\${tx.voucherNo || '-'}</td>
                                    <td class="text-muted small">\${tx.transactionDate || '-'}</td>
                                    <td>\${tx.ledgerHead || '-'}</td>
                                    <td style="text-align: right;" class="text-success font-weight-bold">\${tx.debit || '0.00'}</td>
                                    <td style="text-align: right;" class="text-danger font-weight-bold">\${tx.credit || '0.00'}</td>
                                    <td class="small text-muted" style="max-width: 250px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;" title="\${tx.narration || ''}">\${tx.narration || '-'}</td>
                                    <td>\${tx.branchName || '-'}</td>
                                </tr>
                            `;
                        });
                    } else {
                        tableHtml = '<tr><td colspan="8" class="text-center py-5 text-muted"><i class="bi bi-journal-text h2 d-block"></i>No recent general ledger entries found.</td></tr>';
                    }
                    $('#transactionTableBody').html(tableHtml);
                },
                error: function(err) {
                    console.error("Error loading transactions", err);
                    $('#transactionTableBody').html('<tr><td colspan="8" class="text-center py-5 text-danger"><i class="bi bi-exclamation-triangle h2 d-block"></i>Failed to fetch ledger transactions</td></tr>');
                }
            });
        }

        // ==============================================
        // REFRESH & TICKER LOGIC
        // ==============================================
        function startAutoRefresh() {
            if (autoRefreshTimer) clearInterval(autoRefreshTimer);
            autoRefreshTimer = setInterval(fetchLogsData, 5000);
            $('#liveStatusIndicator').addClass('pulse').removeClass('paused');
            $('#liveStatusText').text('LIVE AUTOREFRESH (5s)');
        }

        function stopAutoRefresh() {
            if (autoRefreshTimer) clearInterval(autoRefreshTimer);
            autoRefreshTimer = null;
            $('#liveStatusIndicator').removeClass('pulse').addClass('paused');
            $('#liveStatusText').text('AUTOREFRESH PAUSED');
        }

        $(document).ready(function() {
            // Initial activity load
            fetchLogsData();
            startAutoRefresh();

            // Refresh Switch Trigger
            $('#autoRefreshToggle').on('change', function() {
                if (this.checked) {
                    startAutoRefresh();
                } else {
                    stopAutoRefresh();
                }
            });

            // Manual Refresh btn click
            $('#manualRefreshBtn').on('click', function() {
                const activeTab = $('.admin-tab-btn.active').attr('data-target');
                if (activeTab === 'tab-activity-logs') {
                    fetchLogsData();
                } else if (activeTab === 'tab-company-settings') {
                    loadAdminCompanyDetails();
                    loadAdminCompanyImages();
                } else if (activeTab === 'tab-branch-manager') {
                    loadAdminBranches();
                } else if (activeTab === 'tab-user-manager') {
                    loadAdminUsers();
                } else if (activeTab === 'tab-customer-manager') {
                    loadAdminCustomers();
                } else if (activeTab === 'tab-savings-manager') {
                    loadAdminSavings();
                } else if (activeTab === 'tab-loan-manager') {
                    loadAdminLoans();
                } else if (activeTab === 'tab-transaction-manager') {
                    loadAdminTransactions();
                }
                
                // Refresh animation rotate
                const icon = $(this).find('i');
                icon.css('transition', 'transform 0.5s ease');
                icon.css('transform', 'rotate(360deg)');
                setTimeout(() => {
                    icon.css('transition', 'none');
                    icon.css('transform', 'rotate(0deg)');
                }, 500);
            });

            // Logs clear triggers
            $('#clearLogsBtn').on('click', function() {
                $('#clearConfirmModal').modal('show');
            });

            // Confirm clear
            $('#confirmClearBtn').on('click', function() {
                $.ajax({
                    url: baseUrl + '/api/admin/activities/clear',
                    method: 'DELETE',
                    success: function() {
                        $('#clearConfirmModal').modal('hide');
                        fetchLogsData();
                    },
                    error: function(err) {
                        alert("Error clearing logs: " + err.responseText);
                    }
                });
            });

            // Filtering
            $('#searchFilter').on('input', renderLogsTable);
            $('#statusFilter').on('change', renderLogsTable);
            $('#userFilter').on('change', renderLogsTable);
            $('#methodFilter').on('change', renderLogsTable);
        });
    </script>
</body>
</html>
