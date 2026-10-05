$(document).ready(function () {

    let allLoans = [];

    // ==========================
    // Load Loan Plan Dropdown
    // ==========================
    $.ajax({
        url: "api/datacorrection/fetchAllApprovedLoanApplications",
        type: "GET",
        success: function (response) {

            if (response.status === "OK") {

                allLoans = response.data;

                const uniquePlans = new Set();

                allLoans.forEach(item => {
                    if (item.loanPlanName) {
                        uniquePlans.add(item.loanPlanName.trim());
                    }
                });

                $("#loanPlanName").empty();
                $("#loanPlanName").append("<option value=''>-- Select Loan Name --</option>");

                uniquePlans.forEach(plan => {
                    $("#loanPlanName").append(
                        `<option value="${plan}">${plan}</option>`
                    );
                });

                // First time table load
                bindTable(allLoans);

            } else {
                alert("Error : " + response.message);
            }

        },
        error: function () {
            alert("API Error");
        }
    });


    // ==========================
    // FIND BUTTON
    // ==========================
    $("#findBtn").click(function (e) {

        e.preventDefault();

        let plan = $("#loanPlanName").val();
        let financialCode = $("#financialCode").val().trim().toUpperCase();
        let toDate = $("#toDate").val();

        let filtered = allLoans.filter(item => {

            let loanDate = new Date(item.loanDate);

            return (
                (!plan || item.loanPlanName === plan) &&
                (!financialCode || (item.financialConsultantId && item.financialConsultantId.toUpperCase().includes(financialCode))) &&
                (!toDate || loanDate <= new Date(toDate))
            );

        });

        bindTable(filtered);

    });

});


// ==========================
// TABLE BIND FUNCTION
// ==========================
function bindTable(data) {

    let tbody = $(".datatable tbody");
    tbody.empty();

    if (!data.length) {
        tbody.append("<tr><td colspan='13'>No Data Found</td></tr>");
        return;
    }

    data.forEach(function (loan, index) {

        let loanAmount = parseFloat(loan.loanAmount || 0);
        let disbursedAmount = parseFloat(loan.disbursedAmount || 0);
        let totalPaid = parseFloat(loan.totalPaidAmount || 0);

        let outstanding = (disbursedAmount - totalPaid).toFixed(2);

        let row = `
        <tr>
            <td>${index + 1}</td>
            <td>${loan.loanId || ""}</td>
            <td>${loan.memberName || ""}</td>
            <td>${loan.loanPlanName || ""}</td>
            <td>${loanAmount}</td>
            <td>${disbursedAmount}</td>
            <td>${loan.rateOfInterest || ""}</td>
            <td>${loan.loanTerm || ""}</td>
            <td>${loan.loanStartDate || ""}</td>
            <td>${loan.loanEndDate || ""}</td>
            <td>${totalPaid}</td>
            <td>${outstanding}</td>
            <td>${loan.confirmationStatus || "Pending"}</td>
        </tr>
        `;

        tbody.append(row);

    });

}