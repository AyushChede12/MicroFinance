// APPROVE IRREGULAR EMI PAYMENTS

let allIrregularEmiData = [];

$(document).ready(function() {
    loadBranchDropdown();
    loadIrregularEmiPayments();

    $('#findBtn, #saveBtn').on('click', function(e) {
        e.preventDefault();
        filterIrregularEmiData();
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
            alert("PLEASE SELECT AT LEAST ONE EMI PAYMENT TO APPROVE.");
            return;
        }

        const requests = selectedIds.map(function(id) {
            return $.ajax({
                url: "api/requestapproval/approveIrregularEmiPayment",
                type: "POST",
                data: {
                    id: id,
                    isApproved: true
                }
            });
        });

        $.when.apply($, requests)
            .done(function() {
                alert("IRREGULAR EMI PAYMENTS APPROVED SUCCESSFULLY!");
                location.reload();
            })
            .fail(function(xhr) {
                console.error("ERROR APPROVING EMI PAYMENTS:", xhr);
                alert("FAILED TO APPROVE SELECTED EMI PAYMENTS.");
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

function loadIrregularEmiPayments() {
    $.ajax({
        url: "api/requestapproval/getUnapprovedIrregularEmiPayments",
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            if (response && response.status === "OK" && Array.isArray(response.data)) {
                allIrregularEmiData = response.data;
                renderTable(allIrregularEmiData);
            } else {
                renderTable([]);
            }
        },
        error: function(xhr) {
            console.error("ERROR LOADING IRREGULAR EMI PAYMENTS:", xhr);
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
                <td colspan="14" style="text-align:center; font-family: 'Poppins', sans-serif;">
                    NO DATA FOUND
                </td>
            </tr>
        `);
        return;
    }

    data.forEach(function(item, index) {
        const isApproved = item.paymentStatus && item.paymentStatus.toUpperCase() === "APPROVED";
        const row = `
            <tr style="font-family: 'Poppins', sans-serif;">
                <td>
                    <input type="checkbox" class="approval-checkbox" data-id="${item.id}" ${isApproved ? 'checked disabled' : ''} />
                </td>
                <td>${index + 1}</td>
                <td>${(item.loanId || '-').toUpperCase()}</td>
                <td>${(item.memberId || '-').toUpperCase()}</td>
                <td>${(item.memberName || '-').toUpperCase()}</td>
                <td>${(item.branchName || '-').toUpperCase()}</td>
                <td>${(item.paymentDate || item.loanDate || '-').toUpperCase()}</td>
                <td>${(item.emiPayment || item.loanAmount || '0.00')}</td>
                <td>${(item.loanAmount || '0.00')}</td>
                <td>${(item.totalInterest || item.rateOfInterest || '0.00')}</td>
                <td>${(item.paymentMode || '-').toUpperCase()}</td>
                <td>${(item.chequeNo || '-').toUpperCase()}</td>
                <td>${(item.accountNo || '-').toUpperCase()}</td>
                <td>${(item.paymentStatus || 'PENDING').toUpperCase()}</td>
            </tr>
        `;
        tbody.append(row);
    });
}

function filterIrregularEmiData() {
    const selectedBranch = ($('#branchName').val() || '').trim().toUpperCase();
    const fromDateVal = $('#fromDate').val();
    const toDateVal = $('#toDate').val();

    const fromDate = fromDateVal ? new Date(fromDateVal) : null;
    const toDate = toDateVal ? new Date(toDateVal) : null;

    const filtered = allIrregularEmiData.filter(function(item) {
        const branch = (item.branchName || '').trim().toUpperCase();
        const dateStr = item.paymentDate || item.loanDate;
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

