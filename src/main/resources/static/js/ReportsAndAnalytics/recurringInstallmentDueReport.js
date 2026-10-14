let allRecurringData = [];

$(document).ready(function() {

	// ================= TODAY DATE =================
	function getToday() {
		let today = new Date();
		today.setHours(0, 0, 0, 0);
		return today;
	}

	// ================= DUE STATUS =================
	function getDueStatus(dateStr) {

		if (!dateStr) {
			return { text: "-", color: "black", days: "-" };
		}

		let today = getToday();
		let dueDate = new Date(dateStr);
		dueDate.setHours(0, 0, 0, 0);

		let diffTime = dueDate - today;
		let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays < 0) {
			return { text: "OVERDUE", color: "red", days: Math.abs(diffDays) };
		} else if (diffDays === 0) {
			return { text: "DUE TODAY", color: "orange", days: "0" };
		} else {
			return { text: "UPCOMING", color: "green", days: diffDays };
		}
	}

	// ================= FETCH DATA =================
	$.ajax({
		url: "api/datacorrection/fetchAllApprovedPolicyRenewal",
		type: "GET",
		success: function(response) {

			if (response && response.data && Array.isArray(response.data)) {

				allRecurringData = response.data;

				let branches = new Set();

				allRecurringData.forEach(p => {
					if (p.branchname) {
						branches.add(p.branchname);
					}
				});

				branches.forEach(branch => {
					$("#branchName").append(`<option value="${branch}">${branch}</option>`);
				});

				renderTable(allRecurringData);
			}
		},
		error: function() {
			alert("DATA LOAD FAILED");
		}
	});

	// ================= FIND FILTER =================
	$("#findBtn").click(function(e) {

		e.preventDefault();

		let branch = $("#branchName").val();
		let fromDate = $("#fromDate").val();
		let toDate = $("#toDate").val();

		let filtered = allRecurringData.filter(policy => {

			let renewalDate = new Date(policy.renewalDate);

			return (
				(!branch || policy.branchname === branch) &&
				(!fromDate || renewalDate >= new Date(fromDate)) &&
				(!toDate || renewalDate <= new Date(toDate))
			);
		});

		renderTable(filtered);
	});

	// ================= RENDER TABLE =================
	function renderTable(data) {

		let tbody = $(".datatable tbody");
		tbody.empty();

		if (!data.length) {
			tbody.append("<tr><td colspan='9'>NO DATA FOUND</td></tr>");
			return;
		}

		data.forEach(function(policy, index) {

			let status = getDueStatus(policy.renewalDate);

			let row = `
            <tr>
                <td>${index + 1}</td>
                <td>${policy.policyCode || ""}</td>
                <td>${policy.clientName || ""}</td>
                <td>${policy.policyAmount || ""}</td>
                <td>${policy.lastPaymentDate || ""}</td>
                <td>${policy.renewalDate || ""}</td>
                <td>${status.days}</td>
                <td style="color:${status.color};font-weight:bold;">
                    ${status.text}
                </td>
                <td>
                    <button class="iconbutton printPopupBtn" 
                        data-id="${policy.id}" 
                        data-bs-toggle="modal" 
                        data-bs-target="#printModal">
                        <i class="bi bi-printer" style="color:green;"></i>
                    </button>
                </td>
            </tr>
            `;

			tbody.append(row);
		});

		// ================= PRINT POPUP DATA (TABLE FORMAT) =================
		$(".printPopupBtn").click(function() {

			let id = $(this).data("id");
			let policy = allRecurringData.find(p => p.id === id);
			if (!policy) return;

			let status = getDueStatus(policy.renewalDate);

			let html = `

            <div style="font-family:Arial;padding:20px;">

                <!-- Header -->
                <div style="text-align:center;">
                    <h3 style="margin:0;">CO OPERATIVE SOCIETY LTD NAGPUR</h3>
                    <p style="margin:2px;">PLOT NO 497 NEW NANDANWAN</p>
                    <p style="margin:2px;">MAHARASHTRA - 440024</p>
                    <p style="margin:2px;font-size:14px;">
                        CIN : ASJ#567 | EMAIL : example@gmail.com | HELPLINE : 9566200223
                    </p>
                </div>

                <hr>

                <h4 style="text-align:center;margin-bottom:20px;">
                    RECURRING INSTALLMENT DUE REPORT
                </h4>

                <!-- TABLE -->
                <table style="width:100%;border-collapse:collapse;">

                    <tr style="background:#0d6efd;color:#fff;">
                        <th colspan="4" style="padding:8px;border:1px solid #000;">
                            POLICY DETAILS
                        </th>
                    </tr>

                    <tr>
                        <th style="border:1px solid #000;padding:8px;">POLICY CODE</th>
                        <td style="border:1px solid #000;padding:8px;">${policy.policyCode}</td>

                        <th style="border:1px solid #000;padding:8px;">CUSTOMER NAME</th>
                        <td style="border:1px solid #000;padding:8px;">${policy.clientName}</td>
                    </tr>

                    <tr>
                        <th style="border:1px solid #000;padding:8px;">BRANCH</th>
                        <td style="border:1px solid #000;padding:8px;">${policy.branchname}</td>

                        <th style="border:1px solid #000;padding:8px;">POLICY AMOUNT</th>
                        <td style="border:1px solid #000;padding:8px;">₹${policy.policyAmount}</td>
                    </tr>

                    <tr>
                        <th style="border:1px solid #000;padding:8px;">LAST PAYMENT DATE</th>
                        <td style="border:1px solid #000;padding:8px;">${policy.lastPaymentDate}</td>

                        <th style="border:1px solid #000;padding:8px;">DUE DATE</th>
                        <td style="border:1px solid #000;padding:8px;">${policy.renewalDate}</td>
                    </tr>

                    <tr>
                        <th style="border:1px solid #000;padding:8px;">STATUS</th>
                        <td style="border:1px solid #000;padding:8px;color:${status.color};font-weight:bold;">
                            ${status.text}
                        </td>

                        <th style="border:1px solid #000;padding:8px;">DAYS</th>
                        <td style="border:1px solid #000;padding:8px;">
                            ${status.days}
                        </td>
                    </tr>

                </table>

                <br><br>

                <!-- Footer -->
                <div style="display:flex;justify-content:space-between;">
                    <span>GENERATED ON : ${new Date().toLocaleDateString()}</span>
                    <span>AUTHORIZED SIGNATURE</span>
                </div>

            </div>
            `;

			$("#modalDataContainer").html(html);
		});
	}

	// ================= PRINT BUTTON =================
	$("#printBtn").click(function() {

		let printContent = document.getElementById("modalDataContainer").innerHTML;

		let newWindow = window.open('', '', 'width=900,height=700');

		newWindow.document.write(`
            <html>
            <head>
                <title>PRINT</title>
            </head>
            <body>
                ${printContent}
            </body>
            </html>
        `);

		newWindow.document.close();
		newWindow.print();
	});

	// ================= DOWNLOAD PDF =================
	$("#downloadBtn").click(function() {

		let printContent = document.getElementById("modalDataContainer").innerHTML;

		let newWindow = window.open('', '', 'width=900,height=700');

		newWindow.document.write(`
            <html>
            <head>
                <title>PDF</title>
            </head>
            <body>
                ${printContent}
            </body>
            </html>
        `);

		newWindow.document.close();
		newWindow.print();
	});

});