$(document).ready(function() {

	if (window.financialConsultantInitialized) {
		console.warn("FINANCIAL CONSULTANT JS ALREADY INITIALIZED");
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
		email: "EXAMPLE@GMAIL.COM",
		helpline: "9566200223",
		branchManager: "9558712001"
	};

	/* ================= FETCH DATA ================= */

	$.ajax({
		url: "api/reports/getApprovedFinancialConsultant",
		method: "GET",
		contentType: "application/json; charset=ISO-8859-1",
		success: function(response) {
			if (response && Array.isArray(response.data) && response.data.length > 0) {
				allFinancialConsultants = response.data;
				populateBranchDropdown(allFinancialConsultants);
				renderTable(allFinancialConsultants);
			} else {
				// Fallback to fetch all consultants so table is populated
				fetchAllConsultantsFallback();
			}
		},
		error: function() {
			fetchAllConsultantsFallback();
		}
	});

	function fetchAllConsultantsFallback() {
		$.ajax({
			url: "api/financialconsultant/getAllFinancialConsultantDetails",
			type: "POST",
			contentType: "application/json",
			success: function(response) {
				if (response && Array.isArray(response.data) && response.data.length > 0) {
					allFinancialConsultants = response.data;
					populateBranchDropdown(allFinancialConsultants);
					renderTable(allFinancialConsultants);
				} else {
					$("#fetchFinancialConsultants")
						.html("<tr><td colspan='10' class='text-center'>NO FINANCIAL CONSULTANTS FOUND.</td></tr>");
				}
			},
			error: function() {
				alert("ERROR WHILE FETCHING FINANCIAL CONSULTANT DATA.");
			}
		});
	}

	function normalize(text) {
		return text ? text.toString().replace(/\s+/g, " ").trim().toUpperCase() : "";
	}

	/* ================= BRANCH DROPDOWN ================= */

	function populateBranchDropdown(data) {
		var select = $("#branchName2");
		select.empty().append('<option value="">-- ALL BRANCHES --</option>');

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
			tbody.append("<tr><td colspan='10' class='text-center'>NO MATCHING CONSULTANTS FOUND.</td></tr>");
			return;
		}

		$.each(data, function(i, f) {
			let approvedStatus = '-';
			if (f.approved === true) {
				approvedStatus = '<span class="badge bg-success text-white">APPROVED</span>';
			} else {
				approvedStatus = '<span class="badge bg-warning text-dark">PENDING APPROVAL</span>';
			}

			tbody.append(`
                <tr style="font-family: 'Poppins', sans-serif;">
                    <td>${i + 1}</td>
                    <td><strong>${f.financialCode || '-'}</strong></td>
                    <td>${(f.financialName || '-').toUpperCase()}</td>
                    <td>${f.joiningDate || '-'}</td>
                    <td>${(f.branchName || '-').toUpperCase()}</td>
                    <td>${f.dob || '-'}</td>
                    <td>${f.contactNo || '-'}</td>
                    <td>${(f.address || '-').toUpperCase()}</td>
                    <td>${approvedStatus}</td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm viewReportBtn"
                            data-id="${f.id}" title="VIEW DOSSIER">
                            <i class="bi bi-printer"></i> VIEW
                        </button>
                    </td>
                </tr>
            `);
		});

		bindModalEvents();
	}

	/* ================= MODAL DATA SET ================= */

	function bindModalEvents() {
		$(".viewReportBtn").off("click").on("click", function() {
			var id = $(this).data("id");
			var f = allFinancialConsultants.find(x => x.id == id);
			if (!f) return;

			$("#financialCode").text(f.financialCode || "-");
			$("#joiningDate").text(f.joiningDate || "-");
			$("#financialName").text((f.financialName || "-").toUpperCase());
			$("#dob").text(f.dob || "-");
			$("#age").text(f.age || "-");
			$("#contactNo").text(f.contactNo || "-");
			$("#branchName").text((f.branchName || "-").toUpperCase());

			$("#selectPosition").text((f.selectPosition || "-").toUpperCase());

			$("#address").text((f.address || "-").toUpperCase());
			$("#district").text((f.district || "-").toUpperCase());
			$("#state").text((f.state || "-").toUpperCase());
			$("#pinCode").text(f.pinCode || "-");
			$("#profession").text((f.profession || "-").toUpperCase());
			$("#academicBackground").text((f.academicBackground || "-").toUpperCase());

			$("#fees").text(f.fees || "0");
			$("#modeofPayment").text((f.modeofPayment || "-").toUpperCase());
			$("#chequeNo").text((f.chequeNo || "-").toUpperCase());
			$("#chequeDate").text(f.chequeDate || "-");
			$("#depositAccount").text((f.depositAccount || "-").toUpperCase());
			$("#refNo").text((f.refNo || "-").toUpperCase());

			$("#referralCode").text((f.referralCode || "-").toUpperCase());
			$("#referralName").text((f.referralName || "-").toUpperCase());

			$("#comments").text((f.comments || "-").toUpperCase());
			let statusStr = (f.financialStatus === "1" || f.financialStatus === "ACTIVE" || f.financialStatus === true) ? "ACTIVE" : "INACTIVE";
			$("#financialStatus").text(statusStr);
			$("#smsSend").text(f.smsSend === "1" || f.smsSend === "YES" ? "YES" : "NO");
			$("#isApproved").text(f.approved ? "APPROVED" : "PENDING APPROVAL");

			// Show modal
			try {
				$('#bankReportModal').modal('show');
			} catch (e) {
				var modalEl = document.getElementById('bankReportModal');
				if (window.bootstrap && bootstrap.Modal) {
					new bootstrap.Modal(modalEl).show();
				}
			}
		});
	}

	/* ================= FILTER ================= */

	$("#findFinancialAdvisorBtn").on("click", function(e) {
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

	$(document).off("click", "#printBankReportBtn").on("click", "#printBankReportBtn", function() {
		var newWindow = window.open('', '', 'width=900,height=700');

		let getText = (id) => {
			let el = document.getElementById(id);
			return el ? (el.innerText || '-').toUpperCase() : '-';
		};

		newWindow.document.write(`
        <html>
        <head>
            <title>FINANCIAL CONSULTANT REPORT</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                }

                h2, h4 {
                    text-align: center;
                    margin: 5px;
                }

                .company {
                    font-size: 20px;
                    font-weight: bold;
                    text-align: center;
                }

                .company-sub {
                    text-align: center;
                    font-size: 12px;
                    color: #555;
                    margin-bottom: 15px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 15px;
                }

                th, td {
                    border: 1px solid #000;
                    padding: 6px 10px;
                    font-size: 13px;
                    text-align: left;
                }

                th {
                    background: #f2f2f2;
                    width: 25%;
                }

                .section-title {
                    background: #002147;
                    color: #fff;
                    font-weight: bold;
                    text-align: center;
                    font-size: 14px;
                }
            </style>
        </head>

        <body>

            <!-- Company Header -->
            <div class="company">${companyDetails.name}</div>
            <div class="company-sub">${companyDetails.address}, ${companyDetails.state} - ${companyDetails.pin} | EMAIL: ${companyDetails.email} | HELPLINE: ${companyDetails.helpline}</div>

            <h4>FINANCIAL CONSULTANT DOSSIER</h4>

            <!-- Table -->
            <table>

                <tr class="section-title"><td colspan="4">CONSULTANT DETAILS</td></tr>
                <tr>
                    <th>FINANCIAL CODE</th><td>${getText("financialCode")}</td>
                    <th>FULL NAME</th><td>${getText("financialName")}</td>
                </tr>
                <tr>
                    <th>JOINING DATE</th><td>${getText("joiningDate")}</td>
                    <th>DATE OF BIRTH</th><td>${getText("dob")}</td>
                </tr>
                <tr>
                    <th>AGE</th><td>${getText("age")} YRS</td>
                    <th>CONTACT NO.</th><td>${getText("contactNo")}</td>
                </tr>
                <tr>
                    <th>BRANCH</th><td>${getText("branchName")}</td>
                    <th>POSITION</th><td>${getText("selectPosition")}</td>
                </tr>

                <tr class="section-title"><td colspan="4">ADDRESS & BACKGROUND DETAILS</td></tr>
                <tr>
                    <th>ADDRESS</th><td colspan="3">${getText("address")}</td>
                </tr>
                <tr>
                    <th>DISTRICT</th><td>${getText("district")}</td>
                    <th>STATE & PIN</th><td>${getText("state")} - ${getText("pinCode")}</td>
                </tr>
                <tr>
                    <th>PROFESSION</th><td>${getText("profession")}</td>
                    <th>ACADEMIC BACKGROUND</th><td>${getText("academicBackground")}</td>
                </tr>

                <tr class="section-title"><td colspan="4">PAYMENT DETAILS</td></tr>
                <tr>
                    <th>FEES</th><td>INR ${getText("fees")}</td>
                    <th>MODE OF PAYMENT</th><td>${getText("modeofPayment")}</td>
                </tr>
                <tr>
                    <th>CHEQUE NO.</th><td>${getText("chequeNo")}</td>
                    <th>CHEQUE DATE</th><td>${getText("chequeDate")}</td>
                </tr>
                <tr>
                    <th>DEPOSIT ACCOUNT</th><td>${getText("depositAccount")}</td>
                    <th>REF NO / UPI</th><td>${getText("refNo")}</td>
                </tr>

                <tr class="section-title"><td colspan="4">REFERRAL / INTRODUCER DETAILS</td></tr>
                <tr>
                    <th>REFERRAL CODE</th><td>${getText("referralCode")}</td>
                    <th>REFERRAL NAME</th><td>${getText("referralName")}</td>
                </tr>

                <tr class="section-title"><td colspan="4">STATUS & APPROVAL</td></tr>
                <tr>
                    <th>COMMENTS</th><td colspan="3">${getText("comments")}</td>
                </tr>
                <tr>
                    <th>FINANCIAL STATUS</th><td>${getText("financialStatus")}</td>
                    <th>APPROVAL STATUS</th><td>${getText("isApproved")}</td>
                </tr>

            </table>

            <div style="margin-top: 50px; display: flex; justify-content: space-between;">
                <div style="text-align: center; border-top: 1px solid #333; width: 200px; padding-top: 5px;">
                    CONSULTANT SIGNATURE
                </div>
                <div style="text-align: center; border-top: 1px solid #333; width: 200px; padding-top: 5px;">
                    AUTHORISED OFFICER
                </div>
            </div>

        </body>
        </html>
        `);

		newWindow.document.close();
		newWindow.focus();
		newWindow.print();
	});
});
