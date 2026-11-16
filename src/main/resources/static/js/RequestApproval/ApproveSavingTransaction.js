// ALL UNAPPROVED SAVING TRANSACTIONS
let allSavingTransactionData = [];

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

function searchInTheSavingTransaction() {
    $.ajax({
        url: "api/requestapproval/getUnapprovedSavingTransaction",
        type: "POST",
        contentType: "application/json",
        success: function(response) {
            if (response && response.status === "OK" && Array.isArray(response.data)) {
                allSavingTransactionData = response.data;
                renderTable(allSavingTransactionData);
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
                <td>${(item.accountNumber || '-').toUpperCase()}</td>
                <td>${(item.enterCustomerName || '-').toUpperCase()}</td>
                <td>${(item.openingDate || '-').toUpperCase()}</td>
                <td>${(item.contactNumber || '-').toUpperCase()}</td>
                <td>${(item.selectByCustomer || '-').toUpperCase()}</td>
                <td>${(item.branchName || '-').toUpperCase()}</td>
                <td>${(item.openingAmount || '0.00')}</td>
                <td>${(item.modeOfPayment || '-').toUpperCase()}</td>
            </tr>
        `;
        tbody.append(row);
    });
}

function filterByBranchName() {
    const selectedBranchName = ($('#branchName').val() || '').trim().toUpperCase();
    const fromDateVal = $('#fromDate').val();
    const toDateVal = $('#toDate').val();

    const fromDate = fromDateVal ? new Date(fromDateVal) : null;
    const toDate = toDateVal ? new Date(toDateVal) : null;

    const filtered = allSavingTransactionData.filter(item => {
        const branchName = (item.branchName || '').trim().toUpperCase();
        const dateStr = item.openingDate || item.joiningDate;
        const openingDate = dateStr ? new Date(dateStr) : null;

        const matchesBranch = selectedBranchName ? branchName === selectedBranchName : true;

        let matchesFrom = true;
        let matchesTo = true;

        if (fromDate && openingDate) {
            matchesFrom = openingDate.getTime() >= fromDate.getTime();
        }

        if (toDate && openingDate) {
            const nextDay = new Date(toDate);
            nextDay.setDate(nextDay.getDate() + 1);
            matchesTo = openingDate.getTime() < nextDay.getTime();
        }

        return matchesBranch && matchesFrom && matchesTo;
    });

    renderTable(filtered);
}

function updateSavingTransactionApprovalStatus(id, isApproved) {
    $.ajax({
        url: "api/requestapproval/approvedSavingTransactionData",
        type: "POST",
        data: {
            id: id,
            isApproved: isApproved
        },
        success: function(response) {
            alert("APPROVAL STATUS UPDATED SUCCESSFULLY FOR ID: " + id);
            location.reload();
        },
        error: function(xhr) {
            console.error("ERROR APPROVING:", xhr);
            alert("COULD NOT UPDATE APPROVAL STATUS FOR ID: " + id);
        }
    });
}
