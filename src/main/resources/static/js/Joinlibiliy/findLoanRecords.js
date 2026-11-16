let jlgSearchCompanyDetails = null;

$(document).ready(function() {
    loadCompanyDetails();
    populateBranches();
    populateGroupCodes();
    searchLoanRecords();

    $('#searchBtn').on('click', function(e) {
        e.preventDefault();
        searchLoanRecords();
    });

    $('#printReportBtn').on('click', function(e) {
        e.preventDefault();
        printSearchReport();
    });

    $('#resetBtn').on('click', function(e) {
        e.preventDefault();
        $('#findLoanFilterForm')[0].reset();
        searchLoanRecords();
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
                jlgSearchCompanyDetails = comp;
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

    $('#searchReportCompName').text(name);
    $('#searchReportCompAddress').text(fullAddr || addr);
    $('#searchReportCompReg').text(regLine);
    $('#searchReportCompContact').text(contactLine);
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

function populateGroupCodes() {
    $.ajax({
        url: 'api/joinliability/getAllGroupCodes',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            const $dropdown = $('#groupCode');
            $dropdown.empty();
            $dropdown.append('<option value="">ALL GROUP CODES</option>');

            if (response && response.status === 'OK' && Array.isArray(response.data)) {
                response.data.forEach(function(code) {
                    $dropdown.append(`<option value="${code}">${code.toUpperCase()}</option>`);
                });
            }
        },
        error: function() {
            console.warn('ERROR FETCHING GROUP CODES');
        }
    });
}

function searchLoanRecords() {
    const branch = $('#branchName').val() || 'ALL';
    const groupCode = $('#groupCode').val() || '';
    const memberCode = $('#memberCode').val() || '';
    const startDate = $('#startDate').val() || '';
    const endDate = $('#endDate').val() || '';

    let filterMeta = `BRANCH: ${branch.toUpperCase()}`;
    if (groupCode) filterMeta += ` | GROUP: ${groupCode.toUpperCase()}`;
    if (memberCode) filterMeta += ` | MEMBER: ${memberCode.toUpperCase()}`;
    if (startDate || endDate) filterMeta += ` | PERIOD: ${startDate || 'START'} TO ${endDate || 'CURRENT'}`;
    $('#searchReportFilterMeta').text(filterMeta);

    let url = `api/joinliability/searchLoanRecords?branch=${encodeURIComponent(branch)}`;
    if (groupCode) {
        url += `&groupCode=${encodeURIComponent(groupCode)}`;
    }
    if (memberCode) {
        url += `&memberCode=${encodeURIComponent(memberCode)}`;
    }
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
            const $tbody = $('#loanRecordsTableBody');
            $tbody.empty();

            if (jlgSearchCompanyDetails) {
                bindCompanyHeader(jlgSearchCompanyDetails);
            }

            if (response && response.status === 'OK' && Array.isArray(response.data) && response.data.length > 0) {
                let html = '';
                response.data.forEach(function(item, index) {
                    const status = (item.status || 'ACTIVE').toUpperCase();
                    const badgeClass = status === 'CLOSED' ? 'bg-danger' : 'bg-success';

                    html += `<tr>
                        <td>${index + 1}</td>
                        <td class="fw-bold">${(item.groupCode || '--').toUpperCase()}</td>
                        <td>${(item.communityName || '--').toUpperCase()}</td>
                        <td>${(item.communityLeader || '--').toUpperCase()}</td>
                        <td>${(item.branchName || '--').toUpperCase()}</td>
                        <td>${(item.loanSchemeName || '--').toUpperCase()}</td>
                        <td class="text-end fw-bold">${parseFloat(item.loanAmount || 0).toFixed(2)}</td>
                        <td>${item.interestRate || '0'} %</td>
                        <td>${item.term || '--'}</td>
                        <td>${item.openingDate || '--'}</td>
                        <td><span class="badge ${badgeClass}">${status}</span></td>
                        <td class="action-col">
                            <a href="statementOfAccount" class="btn btn-sm btn-outline-primary" title="VIEW STATEMENT">
                                <i class="bi bi-file-earmark-text"></i> STATEMENT
                            </a>
                        </td>
                    </tr>`;
                });
                $tbody.html(html);
            } else {
                $tbody.html('<tr><td colspan="12">NO GROUP LOAN RECORDS FOUND</td></tr>');
            }
        },
        error: function(xhr) {
            console.error('ERROR SEARCHING LOAN RECORDS', xhr);
            $('#loanRecordsTableBody').html('<tr><td colspan="12">ERROR LOADING LOAN RECORDS</td></tr>');
        }
    });
}

function printSearchReport() {
    $('.action-col').hide();
    $('.print-signatures').show();
    const printContents = document.getElementById('printableLoanRecordsReportArea').innerHTML;
    $('.action-col').show();
    $('.print-signatures').hide();

    const printWindow = window.open('', '', 'height=850,width=1000');
    printWindow.document.write('<html><head><title>JOINT LIABILITY GROUP LOANS REPORT</title>');
    printWindow.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">');
    printWindow.document.write(`
        <style>
            body { padding: 30px; font-family: "Segoe UI", Arial, sans-serif; color: #111; }
            .table td, .table th { font-size: 11px; text-transform: uppercase; padding: 6px; }
            .badge { border: 1px solid #111; color: #111 !important; background: transparent !important; }
            @media print {
                button { display: none !important; }
                .action-col { display: none !important; }
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
