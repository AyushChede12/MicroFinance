// ALL UNAPPROVED SHARE TRANSFER DATA
let allTransferShareData = [];

$(document).ready(function() {
    loadBranchDropdown();
    loadTransferShareData();

    $('#findBtn, #saveBtn').on('click', function(e) {
        e.preventDefault();
        filterTransferShareData();
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
            alert("PLEASE SELECT AT LEAST ONE ROW TO APPROVE.");
            return;
        }

        const requests = selectedIds.map(function(id) {
            return $.ajax({
                url: "api/requestapproval/approveShareTransaction",
                type: "POST",
                data: {
                    id: id,
                    isApproved: true
                }
            });
        });

        $.when.apply($, requests)
            .done(function() {
                alert("SHARE TRANSACTIONS APPROVED SUCCESSFULLY!");
                location.reload();
            })
            .fail(function(xhr) {
                console.error("ERROR APPROVING SHARE TRANSACTIONS:", xhr);
                alert("FAILED TO APPROVE SELECTED SHARE TRANSACTIONS.");
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

function loadTransferShareData() {
    $.ajax({
        url: "api/requestapproval/getUnapprovedTransferShare",
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            if (response && response.status === "OK" && Array.isArray(response.data)) {
                allTransferShareData = response.data;
                renderTable(allTransferShareData);
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
                <td colspan="10" style="text-align:center; font-family: 'Poppins', sans-serif;">
                    NO DATA FOUND
                </td>
            </tr>
        `);
        return;
    }

    data.forEach(function(item, index) {
        const isApproved = item.isApproved;
        const row = `
            <tr style="font-family: 'Poppins', sans-serif;">
                <td>
                    <input type="checkbox" class="approval-checkbox" data-id="${item.id}" ${isApproved ? 'checked disabled' : ''} />
                </td>
                <td>${index + 1}</td>
                <td>${(item.customerName || '-').toUpperCase()}</td>
                <td>${(item.branch || item.branchName || '-').toUpperCase()}</td>
                <td>${(item.startDate || '-').toUpperCase()}</td>
                <td>${(item.shareIssuedBy || item.memberCode || '-').toUpperCase()}</td>
                <td>${(item.noOfShare != null ? item.noOfShare : '-')}</td>
                <td>${(item.dateOfTransfer || '-').toUpperCase()}</td>
                <td>${(item.modeOfPayment || '-').toUpperCase()}</td>
            </tr>
        `;
        tbody.append(row);
    });
}

function filterTransferShareData() {
    const selectedBranch = ($('#branchName').val() || '').trim().toUpperCase();
    const fromDateVal = $('#fromDate').val();
    const toDateVal = $('#toDate').val();

    const fromDate = fromDateVal ? new Date(fromDateVal) : null;
    const toDate = toDateVal ? new Date(toDateVal) : null;

    const filtered = allTransferShareData.filter(function(item) {
        const itemBranch = (item.branch || item.branchName || '').trim().toUpperCase();
        const dateStr = item.dateOfTransfer || item.startDate;
        const transferDate = dateStr ? new Date(dateStr) : null;

        const matchesBranch = selectedBranch ? itemBranch === selectedBranch : true;

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

        return matchesBranch && matchesFrom && matchesTo;
    });

    renderTable(filtered);
}
