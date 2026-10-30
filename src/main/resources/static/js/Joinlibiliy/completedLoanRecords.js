let jlgCompletedCompanyDetails = null;

$(document).ready(function() {
    loadCompanyDetails();
    populateBranches();
    fetchCompletedLoans();

    $('#searchBtn').on('click', function(e) {
        e.preventDefault();
        fetchCompletedLoans();
    });

    $('#printReportBtn').on('click', function(e) {
        e.preventDefault();
        printCompletedReport();
    });
});

function loadCompanyDetails() {
    $.ajax({
        url: 'api/preference/getCompanyDetails',
        type: 'GET',
        dataType: 'json',
        success: function(resp) {
            const comp = (resp && resp.data) ? resp.data : resp;
            if (comp) {
                jlgCompletedCompanyDetails = comp;
                bindCompanyHeader(comp);
            }
        },
        error: function(err) {
            console.warn('COULD NOT LOAD COMPANY DETAILS', err);
        }
    });
}

function bindCompanyHeader(comp) {
    if (!comp) return;
    const name = (comp.companyName || comp.name || 'CO OPERATIVE SOCIETY LTD NAGPUR').trim().toUpperCase();
    const addr = (comp.address || '').trim().toUpperCase();
    const city = (comp.city || '').trim().toUpperCase();
    const state = (comp.state || '').trim().toUpperCase();
    const pin = (comp.pinCode || comp.pincode || '').trim().toUpperCase();
    const fullAddr = [addr, city, state, pin].filter(Boolean).join(', ');

    const cin = comp.cinNo ? ('CIN: ' + comp.cinNo.trim().toUpperCase()) : '';
    const pan = comp.pan ? ('PAN: ' + comp.pan.trim().toUpperCase()) : '';
    const tan = comp.tan ? ('TAN: ' + comp.tan.trim().toUpperCase()) : '';
    const gstin = comp.gstin ? ('GSTIN: ' + comp.gstin.trim().toUpperCase()) : '';
    const regLine = [cin, pan, tan, gstin].filter(Boolean).join(' | ');

    const helpline = comp.helplineNo ? ('HELPLINE: ' + comp.helplineNo.trim().toUpperCase()) : '';
    const email = comp.emailId ? ('EMAIL: ' + comp.emailId.trim().toUpperCase()) : '';
    const contactLine = [helpline, email].filter(Boolean).join(' | ');

    $('#reportCompName').text(name);
    $('#reportCompAddress').text(fullAddr || addr);
    $('#reportCompReg').text(regLine);
    $('#reportCompContact').text(contactLine);
}

function populateBranches() {
    $.ajax({
        url: 'api/preference/getAllBranchModule',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            const $branch = $('#branchName');
            $branch.empty();
            $branch.append('<option value="ALL">ALL BRANCHES</option>');

            if (response && Array.isArray(response.data)) {
                response.data.forEach(function(b) {
                    if (b.branchName) {
                        $branch.append(`<option value="${b.branchName}">${b.branchName.toUpperCase()}</option>`);
                    }
                });
            }
        },
        error: function() {
            console.warn('ERROR FETCHING BRANCH LIST');
        }
    });
}

function fetchCompletedLoans() {
    const branch = $('#branchName').val() || 'ALL';
    const startDate = $('#startDate').val() || '';
    const endDate = $('#endDate').val() || '';

    let filterMeta = `BRANCH: ${branch.toUpperCase()}`;
    if (startDate || endDate) {
        filterMeta += ` | PERIOD: ${startDate || 'START'} TO ${endDate || 'CURRENT'}`;
    }
    $('#reportFilterMeta').text(filterMeta);

    let url = `api/joinliability/getCompletedLoans?branch=${encodeURIComponent(branch)}`;
    if (startDate) {
        url += `&startDate=${encodeURIComponent(startDate)}`;
    }
    if (endDate) {
        url += `&endDate=${encodeURIComponent(endDate)}`;
    }

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            const $tbody = $('#completedLoansTableBody');
            $tbody.empty();

            if (jlgCompletedCompanyDetails) {
                bindCompanyHeader(jlgCompletedCompanyDetails);
            }

            if (response && response.status === 'OK' && Array.isArray(response.data) && response.data.length > 0) {
                let html = '';
                response.data.forEach(function(item, index) {
                    html += `<tr>
                        <td>${index + 1}</td>
                        <td class="fw-bold">${(item.groupCode || '--').toUpperCase()}</td>
                        <td>${(item.communityName || '--').toUpperCase()}</td>
                        <td>${(item.communityLeader || '--').toUpperCase()}</td>
                        <td>${(item.branchName || '--').toUpperCase()}</td>
                        <td>${(item.loanSchemeName || '--').toUpperCase()}</td>
                        <td class="text-end fw-bold">${parseFloat(item.loanAmount || 0).toFixed(2)}</td>
                        <td>${item.openingDate || '--'}</td>
                        <td>${item.closedDate || '--'}</td>
                        <td><span class="badge bg-danger">${(item.status || 'CLOSED').toUpperCase()}</span></td>
                    </tr>`;
                });
                $tbody.html(html);
            } else {
                $tbody.html('<tr><td colspan="10">NO COMPLETED LOANS FOUND</td></tr>');
            }
        },
        error: function(xhr) {
            console.error('ERROR FETCHING COMPLETED LOANS', xhr);
            $('#completedLoansTableBody').html('<tr><td colspan="10">ERROR LOADING COMPLETED LOANS</td></tr>');
        }
    });
}

function printCompletedReport() {
    $('.print-signatures').show();
    const printContents = document.getElementById('printableCompletedLoansReportArea').innerHTML;
    $('.print-signatures').hide();

    const printWindow = window.open('', '', 'height=850,width=1000');
    printWindow.document.write('<html><head><title>COMPLETED JOINT LIABILITY LOANS REPORT</title>');
    printWindow.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">');
    printWindow.document.write(`
        <style>
            body { padding: 30px; font-family: "Segoe UI", Arial, sans-serif; color: #111; }
            .table td, .table th { font-size: 11px; text-transform: uppercase; padding: 6px; }
            .badge { border: 1px solid #dc3545; color: #dc3545 !important; background: transparent !important; }
            @media print {
                button { display: none !important; }
            }
        </style>
    `);
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    setTimeout(function() {
        printWindow.print();
        printWindow.close();
    }, 600);
}
