// APPROVE MANUAL PAYMENT ENTRIES

let allManualPaymentData = [];

$(document).ready(function() {
    loadBranchDropdown();
    loadManualPaymentEntries();

    $('#findBtn, #saveBtn').on('click', function(e) {
        e.preventDefault();
        filterManualPaymentData();
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
            alert("PLEASE SELECT AT LEAST ONE RECEIPT ENTRY TO APPROVE.");
            return;
        }

        const requests = selectedIds.map(function(id) {
            return $.ajax({
                url: "api/requestapproval/approveManualPaymentEntry",
                type: "POST",
                data: {
                    id: id,
                    isApproved: true
                }
            });
        });

        $.when.apply($, requests)
            .done(function() {
                alert("MANUAL PAYMENT ENTRIES APPROVED SUCCESSFULLY!");
                location.reload();
            })
            .fail(function(xhr) {
                console.error("ERROR APPROVING MANUAL ENTRIES:", xhr);
                alert("FAILED TO APPROVE SELECTED PAYMENT ENTRIES.");
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
            console.error("FAILED TO LOAD BRANCHES:", xhr);
        }
    });
}

function loadManualPaymentEntries() {
    $.ajax({
        url: "api/requestapproval/getUnapprovedManualPaymentEntries",
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            if (response && response.status === "OK" && Array.isArray(response.data)) {
                allManualPaymentData = response.data;
                renderTable(allManualPaymentData);
            } else {
                renderTable([]);
            }
        },
        error: function(xhr) {
            console.error("ERROR LOADING MANUAL ENTRIES:", xhr);
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

    data.forEach(function(item, index) {
        const isApproved = item.remarks && item.remarks.toUpperCase().includes("APPROVED");
        const row = `
            <tr style="font-family: 'Poppins', sans-serif;">
                <td>
                    <input type="checkbox" class="approval-checkbox" data-id="${item.id}" ${isApproved ? 'checked disabled' : ''} />
                </td>
                <td>${index + 1}</td>
                <td>${(item.voucherID || '-').toUpperCase()}</td>
                <td>${(item.dateOfEntry || '-').toUpperCase()}</td>
                <td>${(item.branchName || '-').toUpperCase()}</td>
                <td>${(item.creditLedger || '-').toUpperCase()}</td>
                <td>${(item.debitLedger || '-').toUpperCase()}</td>
                <td>${(item.transactionAmount || '0.00')}</td>
                <td>${(item.transferMode || '-').toUpperCase()}</td>
                <td>${(item.bankName || '-').toUpperCase()}</td>
                <td>${(item.chequeNo || item.transactionRef || '-').toUpperCase()}</td>
                <td>${(item.remarks || 'PENDING').toUpperCase()}</td>
            </tr>
        `;
        tbody.append(row);
    });
}

function filterManualPaymentData() {
    const selectedBranch = ($('#branchName').val() || '').trim().toUpperCase();
    const fromDateVal = $('#fromDate').val();
    const toDateVal = $('#toDate').val();

    const fromDate = fromDateVal ? new Date(fromDateVal) : null;
    const toDate = toDateVal ? new Date(toDateVal) : null;

    const filtered = allManualPaymentData.filter(function(item) {
        const branch = (item.branchName || '').trim().toUpperCase();
        const dateStr = item.dateOfEntry;
        const itemDate = dateStr ? new Date(dateStr) : null;

        const matchesBranch = selectedBranch ? branch === selectedBranch : true;

        let matchesFrom = true;
        let matchesTo = true;

        if (fromDate && itemDate) {
            matchesFrom = itemDate.getTime() >= fromDate.getTime();
        }
        if (toDate && itemDate) {
            const nextDay = new Date(toDate);
            nextDay.setDate(nextDay.getDate() + 1);
            matchesTo = itemDate.getTime() < nextDay.getTime();
        }

        return matchesBranch && matchesFrom && matchesTo;
    });

    renderTable(filtered);
}

