// ALL UNAPPROVED SAVING ACCOUNT TRANSFERS
let allSavingAccountFundTransfer = [];

$(document).ready(function() {
    loadBranchDropdown();
    loadSavingAccountFundTransfer();

    $('#saveBtn, #findBtn').on('click', function(e) {
        e.preventDefault();
        filterSavingAccountFundTransfer();
    });

    $('#approvedBtn').on('click', function(e) {
        e.preventDefault();
        const selectedIds = $('.approval-checkbox:checked').map(function() {
            return $(this).data('id');
        }).get();

        if (selectedIds.length === 0) {
            alert("PLEASE SELECT AT LEAST ONE ROW TO APPROVE.");
            return;
        }

        const requests = selectedIds.map(function(id) {
            return $.ajax({
                url: "api/requestapproval/approvesavingAccountFundTransfer",
                type: "POST",
                data: {
                    id: id,
                    isApproved: true
                }
            });
        });

        $.when.apply($, requests)
            .done(function() {
                alert("SAVING ACCOUNT TRANSFERS APPROVED SUCCESSFULLY!");
                location.reload();
            })
            .fail(function(xhr) {
                console.error("ERROR APPROVING TRANSFERS:", xhr);
                alert("FAILED TO APPROVE SELECTED TRANSFERS.");
            });
    });

    $(document).on('change', '#selectAll', function() {
        $('.approval-checkbox').prop('checked', $(this).prop('checked'));
    });
});

function loadBranchDropdown() {
    $.ajax({
        url: "api/preference/getAllBranchModule",
        type: "GET",
        dataType: "json",
        success: function(response) {
            if (response && response.status === "OK" && Array.isArray(response.data)) {
                const dropdown = $('#branchName');
                dropdown.empty().append('<option value="">SELECT BRANCH</option>');
                response.data.forEach(function(item) {
                    if (item.branchName) {
                        dropdown.append(`<option value="${item.branchName}">${item.branchName.toUpperCase()}</option>`);
                    }
                });
            }
        },
        error: function(xhr) {
            console.error("ERROR LOADING BRANCHES:", xhr);
        }
    });
}

function loadSavingAccountFundTransfer() {
    $.ajax({
        url: "api/requestapproval/getUnapprovedsavingAccountFundTransfer",
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            if (response && response.status === "OK" && Array.isArray(response.data)) {
                allSavingAccountFundTransfer = response.data;
                renderTable(allSavingAccountFundTransfer);
            } else {
                renderTable([]);
            }
        },
        error: function(xhr) {
            console.error("ERROR FETCHING DATA:", xhr);
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
                <td><input type="checkbox" class="approval-checkbox" data-id="${item.id}" ${item.isApproved ? 'checked disabled' : ''} /></td>
                <td>${index + 1}</td>
                <td>${(item.transferDate || '-').toUpperCase()}</td>
                <td>${(item.debitAccountNumber || '-').toUpperCase()}</td>
                <td>${(item.debitCustomerCode || '-').toUpperCase()}</td>
                <td>${(item.debitAccountBranch || '-').toUpperCase()}</td>
                <td>${(item.debitContactNumber || '-').toUpperCase()}</td>
                <td>${(item.creditAccountNumber || '-').toUpperCase()}</td>
                <td>${(item.creditCustomerCode || '-').toUpperCase()}</td>
                <td>${(item.creditAccountBranch || '-').toUpperCase()}</td>
            </tr>
        `;
        tbody.append(row);
    });
}

function filterSavingAccountFundTransfer() {
    const selectedCode = ($('#branchName').val() || '').trim().toUpperCase();
    const fromDateVal = $('#fromDate').val();
    const toDateVal = $('#toDate').val();

    const fromDate = fromDateVal ? new Date(fromDateVal) : null;
    const toDate = toDateVal ? new Date(toDateVal) : null;

    const filtered = allSavingAccountFundTransfer.filter(item => {
        const branchName = (item.debitAccountBranch || '').trim().toUpperCase();
        const dateStr = item.transferDate || item.date;
        const transferDate = dateStr ? new Date(dateStr) : null;

        const matchesCode = selectedCode ? branchName === selectedCode : true;

        let matchesFrom = true;
        let matchesTo = true;

        if (fromDate && transferDate) {
            matchesFrom = transferDate.getTime() >= fromDate.getTime();
        }
        if (toDate && transferDate) {
            const nextDay = new Date(toDate);
            nextDay.setDate(nextDay.getDate() + 1);
            matchesTo = transferDate.getTime() < nextDay.getTime();
        }

        return matchesCode && matchesFrom && matchesTo;
    });

    renderTable(filtered);
}
