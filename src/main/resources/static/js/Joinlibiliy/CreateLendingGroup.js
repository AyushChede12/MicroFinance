// Dynamic Company Details integration & Lending Schemes Report Printing
let companyDetails = {};

function loadCompanyDetails() {
	$.ajax({
		url: "api/preference/getCompanyDetails",
		type: "GET",
		dataType: "json",
		success: function(resp) {
			const comp = (resp && resp.data) ? resp.data : resp;
			if (comp) {
				companyDetails = comp;
				const compName = (comp.companyName || "MICROFINANCE FINANCIAL SERVICES").toUpperCase();
				const compAddr = [comp.address, comp.city, comp.state, comp.pinCode].filter(Boolean).join(", ").toUpperCase();

				const regParts = [];
				if (comp.cinNo) regParts.push("CIN: " + comp.cinNo);
				if (comp.pan) regParts.push("PAN: " + comp.pan);
				if (comp.tan) regParts.push("TAN: " + comp.tan);
				if (comp.gstin) regParts.push("GSTIN: " + comp.gstin);
				const regLine = regParts.join(" | ").toUpperCase();

				const contactParts = [];
				if (comp.helplineNo) contactParts.push("HELPLINE: " + comp.helplineNo);
				if (comp.emailId) contactParts.push("EMAIL: " + comp.emailId);
				const contactLine = contactParts.join(" | ").toUpperCase();

				$("#compName").text(compName);
				$("#compAddress").text(compAddr);
				$("#compRegLine").text(regLine);
				$("#compContact").text(contactLine);
			}
		},
		error: function(err) {
			console.error("FAILED TO FETCH COMPANY DETAILS:", err);
		}
	});
}

function printSchemesReport() {
	const printCard = document.getElementById("printableSchemesArea").cloneNode(true);
	const header = printCard.querySelector("#companyHeader");
	if (header) header.style.display = "block";

	const printBtn = printCard.querySelector("#printSchemesBtn");
	if (printBtn) printBtn.remove();

	const signatures = printCard.querySelector(".print-signatures");
	if (signatures) signatures.style.display = "flex";

	// Remove action columns
	const actionCells = printCard.querySelectorAll("th:last-child, td:last-child");
	actionCells.forEach(cell => cell.remove());

	const printWindow = window.open("", "_blank", "width=1050,height=800");
	printWindow.document.write(`
		<!DOCTYPE html>
		<html>
		<head>
			<title>JOINT LIABILITY LENDING SCHEMES REPORT</title>
			<style>
				@page { size: A4 landscape; margin: 12mm; }
				body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; margin: 0; padding: 10px; color: #000; background: #fff; }
				table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 20px; font-size: 11px; }
				th, td { border: 1px solid #333; padding: 6px 8px; text-align: left; }
				th { background-color: #f2f2f2 !important; -webkit-print-color-adjust: exact; text-transform: uppercase; }
				.text-center { text-align: center; }
				.mb-4 { margin-bottom: 1.5rem; }
				.mt-5 { margin-top: 3rem; }
				.pt-4 { padding-top: 1.5rem; }
				.row { display: flex; flex-wrap: wrap; margin-right: -15px; margin-left: -15px; }
				.col-4 { flex: 0 0 33.333333%; max-width: 33.333333%; }
				.card-title { display: none; }
			</style>
		</head>
		<body>
			${printCard.innerHTML}
			<script>
				window.onload = function() {
					window.print();
					window.onafterprint = function() { window.close(); };
				};
			<\/script>
		</body>
		</html>
	`);
	printWindow.document.close();
}

$(document).ready(function() {
	loadCompanyDetails();

	$("#printSchemesBtn").on("click", function(e) {
		e.preventDefault();
		const rows = $("#LendingBody tr").length;
		if (rows === 0 || $("#LendingBody tr td.text-warning").length > 0) {
			alert("NO LENDING SCHEME DATA AVAILABLE TO PRINT.");
			return;
		}
		printSchemesReport();
	});
});

$(document).ready(function() {

    fetchLoanPlans();

    // Hide update button initially
    $('#updatelendingBtn').hide();
    $('#saveBtn').show();

    // Save button click event
    $('#saveBtn').on('click', function(e) {
        e.preventDefault();

        // Collect form data
        const loanData = {
            planCode: $('#planCode').val(),
            loanSchemeName: $('#loanSchemeName').val(),
            minimumAge: $('#minimumAge').val(),
            term: $('#term').val(),
            branchName: $('#branchName').val(),
            maximumAge: $('#maximumAge').val(),
            minLoanAmt: $('#minLoanAmt').val(),
            rateOfInterest: $('#rateOfInterest').val(),
            emiFrequency: $('#emiFrequency').val(),
            interestType: $('#interestType').val(),
            totalAmount: $('#totalAmount').val(),
            maximumLoanAmount: $('#maximumLoanAmount').val(),
            securityType: $('#securityType').val(),
            emiType: $('#emiType').val(),

            planActivationStatus: $('#planActivationStatus').is(':checked') ? "ACTIVE" : "INACTIVE",

            // Payment deductions
            processingFeePercent: $('#processingFeePercent').val(),
            legalChargesPercent: $('#legalChargesPercent').val(),
            gstPercent: $('#gstPercent').val(),
            insuranceFeePercent: $('#insuranceFeePercent').val(),
            valuationFeePercent: $('#valuationFeePercent').val(),

            // Late fee details
            lateAllowanceDays: $('#lateAllowanceDays').val(),
            penaltyMode: $('#penaltyMode').val(),
            monthlyPenalty: $('#monthlyPenalty').val()
        };

        // AJAX call
        $.ajax({
            url: 'api/joinliability/createLendingGroupsave',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(loanData),
            success: function(response) {
                alert("LENDING GROUP SAVED SUCCESSFULLY!");
                location.reload();
            },
            error: function(xhr, status, error) {
                console.error("SAVE FAILED:", xhr.responseText);
                alert("FAILED TO SAVE LENDING GROUP. CHECK CONSOLE FOR DETAILS.");
            }
        });

        return false;
    });
});


// Load loan data into table
function fetchLoanPlans() {
    $.ajax({
        url: "api/joinliability/viewlendinggroup",
        type: "GET",
        dataType: "json",
        success: function(response) {
            const data = response.data || [];
            const tableBody = $("#LendingBody").empty();

            if (data.length > 0) {
                $.each(data, function(index, item) {
                    const row = `
                        <tr>
                            <td>${item.planCode || ''}</td>
                            <td>${item.loanSchemeName || ''}</td>
                            <td>${item.branchName || ''}</td>
                            <td>${item.rateOfInterest || ''}</td>
                            <td>${item.interestType || ''}</td>
                            <td>${item.processingFeePercent || ''}</td>
                            <td>${item.legalChargesPercent || ''}</td>
                            <td>${item.gstPercent || ''}</td>
                            <td>${item.insuranceFeePercent || ''}</td>
                            <td>${item.valuationFeePercent || ''}</td>
                            <td class="d-flex" style="gap: .7rem;">
                                <button class="iconbutton edit-btn" data-id="${item.id}">
                                    <i class="fa-solid fa-pen-to-square text-success"></i>
                                </button>
                                <button class="iconbutton delete-loan-btn" data-id="${item.id}">
                                    <i class="fa-solid fa-trash text-danger"></i>
                                </button>
                            </td>
                        </tr>`;

                    tableBody.append(row);
                });
            } else {
                tableBody.html(`
                    <tr>
                        <td colspan="17" class="text-center text-warning">
                            NO LOAN PLAN DATA FOUND.
                        </td>
                    </tr>
                `);
            }
        },
        error: function() {
            $("#LendingBody").html(`
                <tr>
                    <td colspan="17" class="text-center text-danger">
                        FAILED TO LOAD LOAN DATA.
                    </td>
                </tr>
            `);
        }
    });
}


// Edit
$(document).on('click', '.edit-btn', function() {
    const id = $(this).data('id');

    $.ajax({
        url: `api/joinliability/editLendingGroup/${id}`,
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            const item = res.data;

            if (item) {
                $('#id').val(item.id);
                $('#planCode').val(item.planCode);
                $('#loanSchemeName').val(item.loanSchemeName);
                $('#minimumAge').val(item.minimumAge);
                $('#maximumAge').val(item.maximumAge);
                $('#Term').val(item.Term);

                $('#branchName').val(item.branchName);
                $('#minLoanAmt').val(item.minLoanAmt);
                $('#maximumLoanAmount').val(item.maximumLoanAmount);
                $('#rateOfInterest').val(item.rateOfInterest);
                $('#emiFrequency').val(item.emiFrequency);
                $('#interestType').val(item.interestType);
                $('#securityType').val(item.securityType);
                $('#emiType').val(item.emiType);
                $('#planActivationStatus').val(item.planActivationStatus);

                $('#processingFeePercent').val(item.processingFeePercent);
                $('#legalChargesPercent').val(item.legalChargesPercent);
                $('#gstPercent').val(item.gstPercent);
                $('#insuranceFeePercent').val(item.insuranceFeePercent);
                $('#valuationFeePercent').val(item.valuationFeePercent);

                $('#lateAllowanceDays').val(item.lateAllowanceDays);
                $('#penaltyMode').val(item.penaltyMode);
                $('#monthlyPenalty').val(item.monthlyPenalty);

                $('#updatelendingBtn').show();
                $('#savelendingBtn').hide();
            } else {
                alert('NO DATA FOUND FOR EDITING.');
            }
        },
        error: function(xhr) {
            console.error('EDIT FETCH ERROR:', xhr.responseText);
            alert('FAILED TO LOAD PLAN FOR EDITING.');
        }
    });
});


// Update
$('#updatelendingBtn').on('click', function() {
    const id = $('#id').val();

    console.log("UPDATING LENDING GROUP ID:", id);

    if (!id) {
        alert("ID IS MISSING. CANNOT UPDATE.");
        return;
    }

    // Gather form values
    const loanPlan = {
        loanSchemeName: $('#loanSchemeName').val()?.trim(),
        minimumAge: $('#minimumAge').val(),
        maximumAge: $('#maximumAge').val(),
        Term: $('#Term').val(),

        branchName: $('#branchName').val()?.trim(),
        minLoanAmt: $('#minLoanAmt').val(),
        maximumLoanAmount: $('#maximumLoanAmount').val(),
        rateOfInterest: $('#rateOfInterest').val(),
        emiFrequency: $('#emiFrequency').val(),
        interestType: $('#interestType').val(),
        securityType: $('#securityType').val(),
        emiType: $('#emiType').val(),
        planActivationStatus: $('#planActivationStatus').val(),

        processingFeePercent: $('#processingFeePercent').val(),
        legalChargesPercent: $('#legalChargesPercent').val(),
        gstPercent: $('#gstPercent').val(),
        insuranceFeePercent: $('#insuranceFeePercent').val(),
        valuationFeePercent: $('#valuationFeePercent').val(),

        lateAllowanceDays: $('#lateAllowanceDays').val(),
        penaltyMode: $('#penaltyMode').val(),
        monthlyPenalty: $('#monthlyPenalty').val()
    };

    // AJAX call to update the lending group
    $.ajax({
        url: `api/joinliability/updateLendingGroup/${id}`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(loanPlan),
        success: function(response) {
            alert("LENDING GROUP UPDATED SUCCESSFULLY!");
            $('#LendingIdForm')[0].reset();

            //$('#updatelendingBtn').hide();
            //$('#savelendingBtn').show();

            fetchLoanPlans();
        },
        error: function(xhr, status, error) {
            console.error("UPDATE ERROR:", xhr.responseText || error);
            alert("UPDATE FAILED. PLEASE CHECK THE CONSOLE FOR DETAILS.");
        }
    });
});


// Delete
$(document).on("click", ".delete-loan-btn", function() {
    const id = $(this).data("id");

    if (confirm("ARE YOU SURE YOU WANT TO DELETE THIS RECORD?")) {
        $.ajax({
            url: `api/joinliability/deleteLendingGroup/${id}`,
            type: "POST",
            success: function(response) {
                alert("RECORD DELETED SUCCESSFULLY!");
                fetchLoanPlans();
            },
            error: function(xhr) {
                console.error(xhr);
                alert("DELETE FAILED.");
            }
        });
    }
});