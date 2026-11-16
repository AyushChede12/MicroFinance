// ALL UNAPPROVED FINANCIAL CONSULTANTS
let allFinancialConsultantData = [];

function searchInTheFinanceOnboarding() {
    $.ajax({
        url: "api/financialconsultant/getUnapprovedFinancialConsultants",
        type: "POST",
        contentType: "application/json",
        success: function(response) {
            if (response && response.status === "OK" && Array.isArray(response.data)) {
                allFinancialConsultantData = response.data;
                renderTable(allFinancialConsultantData);
            } else {
                renderTable([]);
            }
        },
        error: function(xhr, status, error) {
            console.error("ERROR FETCHING DATA:", error);
            renderTable([]);
        }
    });
}

function renderTable(data) {
    const tbody = $(".datatable tbody");
    tbody.empty();

    if (!data || data.length === 0) {
        tbody.append(`
            <tr>
                <td colspan="12" style="text-align:center; font-family: 'Poppins', sans-serif;">
                    NO DATA FOUND
                </td>
            </tr>
        `);
        return;
    }

    data.forEach((item, index) => {
        const row = `
            <tr style="font-family: 'Poppins', sans-serif;">
                <td><input type="checkbox" class="member-checkbox" value="${item.id}"></td>
                <td>${index + 1}</td>
                <td>${(item.financialName || '-').toUpperCase()}</td>
                <td>${(item.financialCode || '-').toUpperCase()}</td>
                <td>${(item.dob || '-').toUpperCase()}</td>
                <td>${(item.academicBackground || '-').toUpperCase()}</td>
                <td>${(item.contactNo || '-').toUpperCase()}</td>
                <td>${(item.profession || '-').toUpperCase()}</td>
                <td>${(item.joiningDate || '-').toUpperCase()}</td>
                <td>${(item.modeofPayment || '-').toUpperCase()}</td>
                <td>${(item.branchName || '-').toUpperCase()}</td>
            </tr>
        `;
        tbody.append(row);
    });
}

// Branch Name Dropdown
function branchNameDropdown() {
    $.ajax({
        url: "api/preference/getAllBranchModule",
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            if (response && response.status === "OK" && Array.isArray(response.data)) {
                $("#branchName").empty().append("<option value=''>SELECT BRANCH</option>");
                response.data.forEach(function(item) {
                    if (item.branchName) {
                        $("#branchName").append(`<option value='${item.branchName}'>${item.branchName.toUpperCase()}</option>`);
                    }
                });
            }
        },
        error: function(xhr) {
            console.error("ERROR LOADING BRANCHES:", xhr);
        }
    });
}

// Apply filter
function filterBranchNameData() {
    const selectedBranchName = ($('#branchName').val() || '').trim().toUpperCase();
    const fromDateVal = $('#fromDate').val();
    const toDateVal = $('#toDate').val();

    const fromDate = fromDateVal ? new Date(fromDateVal) : null;
    const toDate = toDateVal ? new Date(toDateVal) : null;

    const filtered = allFinancialConsultantData.filter(item => {
        const branchName = (item.branchName || '').trim().toUpperCase();
        const dateStr = item.joiningDate || item.signupDate || item.dob;
        const joiningDate = dateStr ? new Date(dateStr) : null;

        const matchesBranch = selectedBranchName ? branchName === selectedBranchName : true;

        let matchesFrom = true;
        let matchesTo = true;

        if (fromDate && joiningDate) {
            matchesFrom = joiningDate.getTime() >= fromDate.getTime();
        }

        if (toDate && joiningDate) {
            const nextDay = new Date(toDate);
            nextDay.setDate(nextDay.getDate() + 1);
            matchesTo = joiningDate.getTime() < nextDay.getTime();
        }

        return matchesBranch && matchesFrom && matchesTo;
    });

    renderTable(filtered);
}

function updateMemberApprovalStatus(id, isApproved) {
    $.ajax({
        url: "api/financialconsultant/approvedFinancialConsultantData",
        type: "POST",
        data: {
            id: id,
            isApproved: isApproved
        },
        success: function(response) {
            alert("APPROVAL STATUS UPDATED SUCCESSFULLY FOR ID: " + id);
            location.reload();
        },
        error: function(xhr, status, error) {
            console.error("ERROR UPDATING APPROVAL FOR ID:", id, error);
            alert("COULD NOT UPDATE APPROVAL STATUS FOR ID: " + id);
        }
    });
}
