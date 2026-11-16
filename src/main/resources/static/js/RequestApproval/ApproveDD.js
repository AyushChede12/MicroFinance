// ALL UNAPPROVED DD DATA (Daily Premium Renewal)
let allDailyPremiumRenewalPMData = [];

$(document).ready(function() {
    loadBranchDropdown();
    loadDailyPremiumRenewalPMData();

    $('#saveBtn, #findBtn').on('click', function(e) {
        e.preventDefault();
        filterDailyPremiumRenewalPMData();
    });

    $('#approvedBtn').on('click', function(e) {
        e.preventDefault();
        const selectedIds = [];
        $('.approval-checkbox:checked').each(function() {
            const id = $(this).data('id');
            if (id) selectedIds.push(id);
        });

        if (selectedIds.length === 0) {
            alert("PLEASE SELECT AT LEAST ONE ROW TO APPROVE.");
            return;
        }

        const requests = selectedIds.map(function(id) {
            return $.ajax({
                url: "api/requestapproval/approveDDFromDailyPremiumRenewalPM",
                type: "POST",
                data: {
                    id: id,
                    isApproved: true
                }
            });
        });

        $.when.apply($, requests)
            .done(function() {
                alert("DD POLICIES APPROVED SUCCESSFULLY!");
                location.reload();
            })
            .fail(function(xhr) {
                console.error("ERROR APPROVING DD POLICIES:", xhr);
                alert("FAILED TO APPROVE SELECTED DD POLICIES.");
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

function loadDailyPremiumRenewalPMData() {
    $.ajax({
        url: "api/requestapproval/getUnapprovedDailyPremiumRenewalPM",
        type: "GET",
        contentType: "application/json",
        success: function(response) {
            if (response && response.status === "OK" && Array.isArray(response.data)) {
                allDailyPremiumRenewalPMData = response.data;
                renderTable(allDailyPremiumRenewalPMData);
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
                <td>
                    <input type="checkbox" class="approval-checkbox"
                        data-id="${item.id}" ${item.isApproved ? 'checked disabled' : ''} />
                </td>  
                <td>${index + 1}</td>
                <td>${(item.policyCode || '-').toUpperCase()}</td>
                <td>${(item.policyDate || '-').toUpperCase()}</td>
                <td>${(item.customerCode || '-').toUpperCase()}</td>
                <td>${(item.policyAmount || '-')}</td>
                <td>${(item.maturityDate || '-').toUpperCase()}</td>
                <td>${(item.clientName || '-').toUpperCase()}</td>
                <td>${(item.contactNo || '-').toUpperCase()}</td>
                <td>${(item.renewalDate || '-').toUpperCase()}</td>
                <td>${(item.branchname || item.branchName || '-').toUpperCase()}</td>
            </tr>
        `;
        tbody.append(row);
    });
}

function filterDailyPremiumRenewalPMData() {
    const selectedCode = ($('#branchName').val() || '').trim().toUpperCase();
    const fromDateVal = $('#fromDate').val();
    const toDateVal = $('#toDate').val();

    const fromDate = fromDateVal ? new Date(fromDateVal) : null;
    const toDate = toDateVal ? new Date(toDateVal) : null;

    const filtered = allDailyPremiumRenewalPMData.filter(item => {
        const branchName = (item.branchname || item.branchName || '').trim().toUpperCase();
        const dateStr = item.renewalDate || item.policyDate;
        const policyDate = dateStr ? new Date(dateStr) : null;

        const matchesCode = selectedCode ? branchName === selectedCode : true;

        let matchesFrom = true;
        let matchesTo = true;

        if (fromDate && policyDate) {
            matchesFrom = policyDate.getTime() >= fromDate.getTime();
        }
        if (toDate && policyDate) {
            const nextDay = new Date(toDate);
            nextDay.setDate(nextDay.getDate() + 1);
            matchesTo = policyDate.getTime() < nextDay.getTime();
        }

        return matchesCode && matchesFrom && matchesTo;
    });

    renderTable(filtered);
}
