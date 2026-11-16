// APPROVE INTER-BRANCH CASH TRANSFER

let allInterBranchData = [];

$(document).ready(function() {
    loadBranchDropdown();
    loadInterBranchTransfers();

    $('#findBtn, #saveBtn').on('click', function(e) {
        e.preventDefault();
        filterInterBranchData();
    });

    $('#approvedBtn').on('click', function(e) {
        e.preventDefault();

        const selectedIds = [];
        $('.approval-checkbox:checked').each(function() {
            const id = $(this).data('id');
            if (id) {
                selectedIds.push(id);
            }
        });

        if (selectedIds.length === 0) {
            alert("PLEASE SELECT AT LEAST ONE TRANSACTION TO APPROVE.");
            return;
        }

        const requests = selectedIds.map(function(id) {
            return $.ajax({
                url: "api/requestapproval/approveInterBranchTransfer",
                type: "POST",
                data: {
                    id: id,
                    isApproved: true
                }
            });
        });

        $.when.apply($, requests)
            .done(function() {
                alert("INTER-BRANCH CASH TRANSFERS APPROVED SUCCESSFULLY!");
                location.reload();
            })
            .fail(function(xhr) {
                console.error("ERROR APPROVING TRANSFERS:", xhr);
                alert("FAILED TO APPROVE SELECTED TRANSFERS.");
            });
    });

    // Select all checkbox support
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
            console.error("FAILED TO LOAD BRANCHES:", xhr);
        }
    });
}

function loadInterBranchTransfers() {
    $.ajax({
        url: "api/requestapproval/getUnapprovedInterBranchTransfers",
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            if (response && response.status === "OK" && Array.isArray(response.data)) {
                allInterBranchData = response.data;
                renderTable(allInterBranchData);
            } else {
                renderTable([]);
            }
        },
        error: function(xhr) {
            console.error("ERROR LOADING INTER-BRANCH TRANSFERS:", xhr);
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
                <td colspan="10" style="text-align:center; font-family: 'Poppins', sans-serif;">
                    NO DATA FOUND
                </td>
            </tr>
        `);
        return;
    }

    data.forEach(function(item, index) {
        const isApproved = item.status && item.status.toUpperCase() === "APPROVED";
        const row = `
            <tr style="font-family: 'Poppins', sans-serif;">
                <td>
                    <input type="checkbox" class="approval-checkbox" data-id="${item.id}" ${isApproved ? 'checked disabled' : ''} />
                </td>
                <td>${index + 1}</td>
                <td>${(item.accountCode || '-').toUpperCase()}</td>
                <td>${(item.customerName || item.narration || '-').toUpperCase()}</td>
                <td>${(item.accountNumber || '-').toUpperCase()}</td>
                <td>${(item.debit != null ? item.debit : '0.00')}</td>
                <td>${(item.credit != null ? item.credit : '0.00')}</td>
                <td>${(item.branchName || '-').toUpperCase()}</td>
                <td>${(item.transactionDate || '-').toUpperCase()}</td>
                <td>${(item.status || 'PENDING').toUpperCase()}</td>
            </tr>
        `;
        tbody.append(row);
    });
}

function filterInterBranchData() {
    const selectedBranch = ($('#branchName').val() || '').trim().toUpperCase();
    const fromDateVal = $('#fromDate').val();
    const toDateVal = $('#toDate').val();

    const fromDate = fromDateVal ? new Date(fromDateVal) : null;
    const toDate = toDateVal ? new Date(toDateVal) : null;

    const filtered = allInterBranchData.filter(function(item) {
        const branch = (item.branchName || '').trim().toUpperCase();
        const txnDate = item.transactionDate ? new Date(item.transactionDate) : null;

        const matchesBranch = selectedBranch ? branch === selectedBranch : true;

        let matchesFrom = true;
        let matchesTo = true;

        if (fromDate && txnDate) {
            matchesFrom = txnDate.getTime() >= fromDate.getTime();
        }
        if (toDate && txnDate) {
            const nextDay = new Date(toDate);
            nextDay.setDate(nextDay.getDate() + 1);
            matchesTo = txnDate.getTime() < nextDay.getTime();
        }

        return matchesBranch && matchesFrom && matchesTo;
    });

    renderTable(filtered);
}

