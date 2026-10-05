$(document).ready(function () {

    if (window.financialConsultantInitialized) {
        console.warn("Financial Consultant JS already initialized");
        return;
    }
    window.financialConsultantInitialized = true;

    var allFinancialConsultants = [];

    /* ================= COMPANY DETAILS ================= */

    const companyDetails = {
        name: "CO OPERATIVE SOCIETY LTD NAGPUR",
        address: "PLOT NO 497 NEW NANDANWAN",
        state: "MAHARASHTRA",
        pin: "440024",
        cin: "ASJ#567",
        email: "example@gmail.com",
        helpline: "9566200223",
        branchManager: "9558712001"
    };

    /* ================= FETCH DATA ================= */

    $.ajax({
        url: "api/reports/getApprovedFinancialConsultant",
        method: "GET",
        contentType: "application/json; charset=ISO-8859-1",
        success: function (response) {

            if (response && Array.isArray(response.data)) {
                allFinancialConsultants = response.data;
                populateBranchDropdown(allFinancialConsultants);
                renderTable(allFinancialConsultants);
            } else {
                $("#fetchFinancialConsultants")
                    .html("<tr><td colspan='10'>No approved consultants found.</td></tr>");
            }
        },
        error: function () {
            alert("Error while fetching Financial Consultant data.");
        }
    });

    function normalize(text) {
        return text?.toString().replace(/\s+/g, " ").trim().toUpperCase();
    }

    /* ================= BRANCH DROPDOWN ================= */

    function populateBranchDropdown(data) {

        var select = $("#branchName2");

        select.empty().append('<option value="">SELECT</option>');

        let branchSet = new Set();

        data.forEach(f => {
            if (f.branchName) {
                branchSet.add(normalize(f.branchName));
            }
        });

        branchSet.forEach(branch => {
            select.append(`<option value="${branch}">${branch}</option>`);
        });
    }

    /* ================= TABLE ================= */

    function renderTable(data) {

        var tbody = $("#fetchFinancialConsultants");
        tbody.empty();

        if (!data || data.length === 0) {
            tbody.append("<tr><td colspan='10'>No matching consultants found.</td></tr>");
            return;
        }

        $.each(data, function (i, f) {

            let approvedStatus = '-';

            if (f.approved === true) {
                approvedStatus = '<span style="color: green; font-weight:600;">APPROVED</span>';
            } else if (f.approved === false) {
                approvedStatus = '<span style="color:red; font-weight:600;">NOT APPROVED</span>';
            }

            tbody.append(`
                <tr>
                    <td>${i + 1}</td>
                    <td>${f.financialCode || '-'}</td>
                    <td>${(f.financialName || '-').toUpperCase()}</td>
                    <td>${f.joiningDate || '-'}</td>
                    <td>${(f.branchName || '-').toUpperCase()}</td>
                    <td>${f.dob || '-'}</td>
                    <td>${f.contactNo || '-'}</td>
                    <td>${(f.address || '-').toUpperCase()}</td>
                    <td>${approvedStatus}</td>
                    <td>
                        <button class="btn btn-outline-success btn-sm viewReportBtn"
                            data-id="${f.id}"
                            data-bs-toggle="modal"
                            data-bs-target="#bankReportModal">
                            <i class="bi bi-printer"></i>
                        </button>
                    </td>
                </tr>
            `);
        });

        bindModalEvents();
    }

    /* ================= MODAL DATA SET ================= */

    function bindModalEvents() {

        $(".viewReportBtn").off("click").on("click", function () {

            var id = $(this).data("id");
            var f = allFinancialConsultants.find(x => x.id === id);
            if (!f) return;

            $("#financialCode").text(f.financialCode || "N/A");
            $("#joiningDate").text(f.joiningDate || "N/A");
            $("#financialName").text(f.financialName || "N/A");
            $("#dob").text(f.dob || "N/A");
            $("#age").text(f.age || "N/A");
            $("#contactNo").text(f.contactNo || "N/A");
            $("#branchName").text(f.branchName || "N/A");

            $("#selectPosition").text(f.selectPosition || "N/A");

            $("#address").text(f.address || "N/A");
            $("#district").text(f.district || "N/A");
            $("#state").text(f.state || "N/A");
            $("#pinCode").text(f.pinCode || "N/A");
            $("#profession").text(f.profession || "N/A");
            $("#academicBackground").text(f.academicBackground || "N/A");

            $("#fees").text(f.fees || "0");
            $("#modeofPayment").text(f.modeofPayment || "N/A");
            $("#chequeNo").text(f.chequeNo || "N/A");
            $("#chequeDate").text(f.chequeDate || "N/A");
            $("#depositAccount").text(f.depositAccount || "N/A");
            $("#refNo").text(f.refNo || "N/A");

            $("#referralCode").text(f.referralCode || "N/A");
            $("#referralName").text(f.referralName || "N/A");

            $("#comments").text(f.comments || "N/A");
            $("#financialStatus").text(f.financialStatus || "N/A");
            $("#smsSend").text(f.smsSend || "N/A");
            $("#isApproved").text(f.approved ? "APPROVED" : "NOT APPROVED");
        });
    }

    /* ================= FILTER ================= */

    $("#findFinancialAdvisorBtn").on("click", function (e) {

        e.preventDefault();

        var branch = $("#branchName2").val();
        var fromDate = $("#fromDate").val();
        var toDate = $("#toDate").val();

        let filtered = allFinancialConsultants;

        if (branch) {
            filtered = filtered.filter(f =>
                normalize(f.branchName) === normalize(branch)
            );
        }

        if (fromDate && toDate) {
            filtered = filtered.filter(f => {
                if (!f.joiningDate) return false;
                let d = new Date(f.joiningDate);
                return d >= new Date(fromDate) && d <= new Date(toDate);
            });
        }

        renderTable(filtered);
    });
	/* ================= PRINT ================= */

	$(document).off("click", "#printBankReportBtn").on("click", "#printBankReportBtn", function () {

	    var newWindow = window.open('', '', 'width=900,height=700');

	    // Fetch values from modal
	    let getText = (id) => document.getElementById(id).innerText || '-';

	    newWindow.document.write(`
	    <html>
	    <head>
	        <title>Consultant Report</title>

	        <style>
	            body{
	                font-family: Arial;
	                padding:20px;
	            }

	            h2, h4{
	                text-align:center;
	                margin:5px;
	            }

	            .company{
	                font-size:20px;
	                font-weight:bold;
	            }

	            table{
	                width:100%;
	                border-collapse: collapse;
	                margin-top:20px;
	            }

	            th, td{
	                border:1px solid #000;
	                padding:8px;
	                font-size:14px;
	                text-align:left;
	            }

	            th{
	                background:#f2f2f2;
	            }

	            .section-title{
	                background:#0d6efd;
	                color:#fff;
	                font-weight:bold;
	                text-align:center;
	            }
	        </style>
	    </head>

	    <body>

	        <!-- Company Header -->
	        <div class="company">${companyDetails.name}</div>
	        <div>${companyDetails.address}, ${companyDetails.state} - ${companyDetails.pin}</div>
	        <div>Email: ${companyDetails.email} | Helpline: ${companyDetails.helpline}</div>

	        <h4>Financial Consultant Report</h4>

	        <!-- Table -->
	        <table>

	            <tr class="section-title"><td colspan="4">CONSULTANT DETAILS</td></tr>
	            <tr>
	                <th>Code</th><td>${getText("financialCode")}</td>
	                <th>Name</th><td>${getText("financialName")}</td>
	            </tr>
	            <tr>
	                <th>Joining Date</th><td>${getText("joiningDate")}</td>
	                <th>DOB</th><td>${getText("dob")}</td>
	            </tr>
	            <tr>
	                <th>Age</th><td>${getText("age")}</td>
	                <th>Contact</th><td>${getText("contactNo")}</td>
	            </tr>
	            <tr>
	                <th>Branch</th><td>${getText("branchName")}</td>
	                <th>Position</th><td>${getText("selectPosition")}</td>
	            </tr>

	            <tr class="section-title"><td colspan="4">ADDRESS DETAILS</td></tr>
	            <tr>
	                <th>Address</th><td colspan="3">${getText("address")}</td>
	            </tr>
	            <tr>
	                <th>District</th><td>${getText("district")}</td>
	                <th>State</th><td>${getText("state")} - ${getText("pinCode")}</td>
	            </tr>

	            <tr class="section-title"><td colspan="4">PAYMENT DETAILS</td></tr>
	            <tr>
	                <th>Fees</th><td>₹${getText("fees")}</td>
	                <th>Mode</th><td>${getText("modeofPayment")}</td>
	            </tr>
	            <tr>
	                <th>Cheque No</th><td>${getText("chequeNo")}</td>
	                <th>Cheque Date</th><td>${getText("chequeDate")}</td>
	            </tr>
	            <tr>
	                <th>Deposit Account</th><td>${getText("depositAccount")}</td>
	                <th>Ref No</th><td>${getText("refNo")}</td>
	            </tr>

	            <tr class="section-title"><td colspan="4">REFERRAL</td></tr>
	            <tr>
	                <th>Referral Code</th><td>${getText("referralCode")}</td>
	                <th>Referral Name</th><td>${getText("referralName")}</td>
	            </tr>

	            <tr class="section-title"><td colspan="4">STATUS</td></tr>
	            <tr>
	                <th>Comments</th><td colspan="3">${getText("comments")}</td>
	            </tr>
	            <tr>
	                <th>Status</th><td>${getText("financialStatus")}</td>
	                <th>Approved</th><td>${getText("isApproved")}</td>
	            </tr>

	        </table>

	    </body>
	    </html>
	    `);

	    newWindow.document.close();
	    newWindow.focus();
	    newWindow.print();
	});
	});