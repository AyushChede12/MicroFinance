$(document).ready(function () {

    /* -------------------------------
       FETCH COMPANY ADMINISTRATION
    --------------------------------*/
    function loadCompanyAdministration() {
        $.ajax({
            type: "GET",
            url: "api/preference/fetchAllCompanyAdministration",
            contentType: "application/json",
            success: function (response) {
                if (response.status === "FOUND" && response.data.length > 0) {
                    let c = response.data[0];

                    // Save for print use later
                    window.companyData = c;

                    // Show on screen (add your own div in JSP)
                    $("#companyNameHeading").text(c.companyName + " (" + c.shortName + ")");
                    $("#companyDetails").html(`
                        <b>Sign Up Date:</b> ${c.signUpDate} <br>
                        <b>CIN No:</b> ${c.cinNo} <br>
                        <b>Address:</b> ${c.address}, ${c.city}, ${c.state} - ${c.pinCode} <br>
                        <b>Email:</b> ${c.emailId} <br>
                        <b>Helpline:</b> ${c.helplineNo} <br>
                        <b>Branch Manager No:</b> ${c.branchManagerContactNo}
                    `);
                }
            }
        });
    }

    loadCompanyAdministration();



    /* ------------------------------------------
       YOUR EXISTING AJAX — DO NOT TOUCH
    -------------------------------------------*/

    $.ajax({
        url: 'api/customershareholdingcontroller/findAllTransferShare',
        type: 'GET',
        success: function (response) {
            if (response.status === "OK") {
                let transferOptions = response.data.map(function (item) {
                    return {
                        id: item.findByCode,
                        text: item.findByCode + " - " + item.customerName
                    };
                });

                $('#findByCode').select2({
                    placeholder: '-- Search Customer Code or Name --',
                    data: transferOptions,
                    matcher: function (params, data) {
                        if ($.trim(params.term) === '') return data;
                        if (typeof data.text === 'undefined') return null;

                        const term = params.term.toLowerCase();
                        const text = data.text.toLowerCase();

                        return text.includes(term) ? data : null;
                    }
                });

            } else {
                alert("No customer codes found.");
            }
        },
        error: function () {
            alert("Failed to load customer codes.");
        }
    });


    $.ajax({
        url: "api/preference/getAllBranchModule",
        type: "GET",
        success: function (response) {
            if (response.status == "FOUND") {
                const branchList = response.data;
                $("#branchName").empty().append("<option value=''>-- Select Branch --</option>");
                branchList.forEach(branch => {
                    $("#branchName").append(`<option value="${branch.branchName}">${branch.branchName}</option>`);
                });
            } else {
                alert("Error: " + response.message);
            }
        },
        error: function (xhr) {
            alert("Failed to load dropdown data.");
        }
    });


    $("#findByCode").change(function () {
        let findByCode = $("#findByCode").val();
        $.ajax({
            type: "POST",
            url: "api/customershareholdingcontroller/fetchByFindByCode",
            data: { findByCode: findByCode },
            success: function (response) {
                if (response.status == "FOUND") {
                    let data = response.data[0];

                    $("#id").val(data.id);
                    $("#customerName").val(data.customerName);
                    $("#startDate").val(data.startDate);
                    $("#previousAccountBalance").val(data.previousAccountBalance);
                    $("#previousShareCount").val(data.previousShareCount);
                    $("#baseValue").val(data.baseValue);
                    $("#branchName").val(data.branch);
                    $("#dateOfTransfer").val(data.dateOfTransfer);
                    $("#shareIssuedBy").val(data.shareIssuedBy);
                    $("#noOfShare").val(data.noOfShare);
                    $("#amountTransferred").val(data.amountTransferred);
                    $("#balanceShares").val(data.balanceShares);
                    $("#modeOfPayment").val(data.modeOfPayment);
                    $("#comments").val(data.comments);

                } else {
                    alert("Transfer Share Details Not Found For Customer");
                }
            },
            error: function () {
                alert("Shares not found or server error");
            }
        });
    });


    $('#updateBtn').click(function (e) {
        e.preventDefault();

        let transferData = {
            id: $('#id').val(),
            findByCode: $('#findByCode').val(),
            customerName: $('#customerName').val(),
            startDate: $('#startDate').val(),
            previousAccountBalance: $('#previousAccountBalance').val(),
            previousShareCount: $('#previousShareCount').val(),
            baseValue: $('#baseValue').val(),
            branch: $('#branchName').val(),
            dateOfTransfer: $('#dateOfTransfer').val(),
            shareIssuedBy: $('#shareIssuedBy').val(),
            noOfShare: $('#noOfShare').val(),
            amountTransferred: $('#amountTransferred').val(),
            balanceShares: $('#balanceShares').val(),
            modeOfPayment: $('#modeOfPayment').val(),
            comments: $('#comments').val()
        };

        $.ajax({
            url: 'api/customershareholdingcontroller/updateTransferShare',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(transferData),
            success: function (response) {
                if (response.status === "FOUND") {
                    alert("Transfer Data Updated Successfully");
                    location.reload();
                } else {
                    alert("Something went wrong: " + response.message);
                }
            },
            error: function (xhr) {
                alert("Error while saving data: " + xhr.responseText);
            }
        });
    });


    $('#deleteBtn').click(function (event) {
        var id = $("#id").val();
        let findByCode = $("#findByCode").val();

        if (findByCode !== "") {
            if (confirm("Are you sure you want to delete this Transfer Share Data Of Customer?")) {
                $.ajax({
                    url: "api/customershareholdingcontroller/deleteTransferShareById",
                    type: "POST",
                    data: { id: id },
                    success: function (response) {
                        if (response.status == "OK") {
                            alert("Transfer Data Deleted Successfully");
                            location.reload();
                        } else {
                            alert("Delete failed: " + response.message);
                        }
                    },
                    error: function () {
                        alert("Failed to delete Transfer Share Data.");
                    }
                });
            }
        }
        else {
            alert("First Select Any One Data Then Proceed To Delete!");
        }

    });



    /* -------------------------------
       PRINT WITH COMPANY HEADER
    --------------------------------*/
	$("#printBtn").on("click", function () {

	    const findByCode = $("#findByCode").val();
	    if (!findByCode) {
	        alert("Please select atleast one data then proceed to print!");
	        return;
	    }

	    const c = window.companyData;

	    let companyHeader = `
	        <h1 style="text-align:center; margin-bottom:0;">${c.companyName}</h1>
	        <h3 style="text-align:center; margin-top:5px;">(${c.shortName})</h3>
	        <p style="text-align:center;">
	            ${c.address}, ${c.city}, ${c.state} - ${c.pinCode}<br>
	            CIN: ${c.cinNo} | Email: ${c.emailId.toLowerCase()} | Helpline: ${c.helplineNo}
	        </p>
	        <hr>
	    `;

	    // 👉 GET VALUE FUNCTION (Improved to split code-name)
	    function getVal(id) {
	        let el = $("#" + id);

	        if (el.is("select")) {
	            let txt = el.find("option:selected").text();

	            // If Select2 is used
	            if (el.data("select2")) {
	                let s2 = el.select2("data");
	                if (s2.length > 0) txt = s2[0].text;
	            }

	            // 👉 Only for Customer Code dropdown:
	            // Convert "M00002-AYUSH" → "M00002"
	            if (id === "findByCode" && txt.includes("-")) {
	                txt = txt.split("-")[0].trim();
	            }

	            return txt;
	        }

	        return el.val() ? el.val() : "";
	    }

	    const printContent = `
	        ${companyHeader}

	        <h2 style="text-align:center;margin-bottom:20px;">Customer Shareholding Details</h2>

	        <table class="print-table">
	            <tr><th>Customer Code</th><td>${getVal("findByCode")}</td></tr>
	            <tr><th>Customer Name</th><td>${getVal("customerName")}</td></tr>
	            <tr><th>Start Date</th><td>${getVal("startDate")}</td></tr>
	            <tr><th>Previous Account Balance</th><td>${getVal("previousAccountBalance")}</td></tr>
	            <tr><th>Previous Share Count</th><td>${getVal("previousShareCount")}</td></tr>
	            <tr><th>Base Value</th><td>${getVal("baseValue")}</td></tr>
	            <tr><th>Branch</th><td>${getVal("branchName")}</td></tr>
	            <tr><th>Date of Transfer</th><td>${getVal("dateOfTransfer")}</td></tr>
	            <tr><th>Shares Issued By</th><td>${getVal("shareIssuedBy")}</td></tr>
	            <tr><th>Share Count</th><td>${getVal("noOfShare")}</td></tr>
	            <tr><th>Transfer Amount</th><td>${getVal("amountTransferred")}</td></tr>
	            <tr><th>Balance Shares</th><td>${getVal("balanceShares")}</td></tr>
	            <tr><th>Mode of Payment</th><td>${getVal("modeOfPayment")}</td></tr>
	            <tr><th>Comments</th><td>${getVal("comments")}</td></tr>
	        </table>
	    `;

	    const printWindow = window.open("", "_blank");

	    printWindow.document.write(`
	        <html>
	        <head>
	            <title>Customer Details</title>
	            <style>
	                body { font-family: Arial; padding: 25px; }
	                .print-table { width: 100%; border-collapse: collapse; }
	                .print-table th, .print-table td {
	                    padding: 8px; border: 1px solid #ccc; font-size: 14px;
	                }
	                .print-table th { background: #f2f2f2; width:30%; }
	            </style>
	        </head>
	        <body>
	            ${printContent}
	        </body>
	        </html>
	    `);

	    printWindow.document.close();

	    setTimeout(() => {
	        printWindow.focus();
	        printWindow.print();
	    }, 300);
	});


});
