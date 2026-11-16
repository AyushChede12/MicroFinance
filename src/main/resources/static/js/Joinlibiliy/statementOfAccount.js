let jlgStatementCompanyDetails = null;

$(document).ready(function() {
    loadCompanyDetails();
    populateGroupCodes();

    $('#groupCode').on('change', function() {
        const selectedCode = $(this).val();
        if (selectedCode) {
            loadStatement(selectedCode);
        } else {
            $('#statementContainer').hide();
        }
    });

    $('#searchBtn').on('click', function(e) {
        e.preventDefault();
        const selectedCode = $('#groupCode').val();
        if (!selectedCode) {
            alert('PLEASE SELECT A GROUP CODE');
            return;
        }
        loadStatement(selectedCode);
    });

    $('#printBtn').on('click', function(e) {
        e.preventDefault();
        if ($('#statementContainer').is(':hidden')) {
            alert('PLEASE SEARCH AND SELECT A GROUP FIRST BEFORE PRINTING');
            return;
        }
        printStatement();
    });
});

function loadCompanyDetails() {
    $.ajax({
        url: 'api/preference/getCompanyDetails',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            const comp = (response && response.data) ? response.data : response;
            if (comp) {
                jlgStatementCompanyDetails = comp;
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

    $('#compName').text(name);
    $('#compAddress').text(fullAddr || addr);
    $('#compRegLine').text(regLine);
    $('#compContact').text(contactLine);
}

function populateGroupCodes() {
    $.ajax({
        url: 'api/joinliability/getAllGroupCodes',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            const $dropdown = $('#groupCode');
            $dropdown.empty();
            $dropdown.append('<option value="" disabled selected>SELECT GROUP CODE</option>');

            let list = [];
            if (response && response.status === 'OK' && Array.isArray(response.data)) {
                list = response.data;
            }

            if (list.length === 0) {
                $.ajax({
                    url: 'api/joinliability/getApprovedGroupLoanIds',
                    type: 'GET',
                    dataType: 'json',
                    success: function(res) {
                        if (res && res.status === 'OK' && Array.isArray(res.data)) {
                            res.data.forEach(function(code) {
                                $dropdown.append(`<option value="${code}">${code.toUpperCase()}</option>`);
                            });
                        }
                    }
                });
            } else {
                list.forEach(function(code) {
                    $dropdown.append(`<option value="${code}">${code.toUpperCase()}</option>`);
                });
            }
        },
        error: function() {
            console.warn('ERROR FETCHING GROUP CODES');
        }
    });
}

function loadStatement(groupCode) {
    $.ajax({
        url: `api/joinliability/getStatementByGroupId?groupID=${encodeURIComponent(groupCode)}`,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response && response.status === 'OK' && response.data) {
                const data = response.data;
                const loan = data.groupLoan || {};
                const dir = data.directory || {};
                const repayments = data.repayments || [];
                const closures = data.closures || [];

                if (jlgStatementCompanyDetails) {
                    bindCompanyHeader(jlgStatementCompanyDetails);
                }

                // Loan & Group Summary
                $('#lblGroupCode').text((groupCode || '').toUpperCase());
                $('#lblCommunityName').text((loan.communityName || dir.communityName || '').toUpperCase());
                $('#lblCommunityLeader').text((dir.communityLeader || loan.communityLeader || loan.communityName || '').toUpperCase());
                $('#lblContactNo').text(loan.contactNumber || dir.contactNo || '--');
                $('#lblBranchName').text((loan.branchName || dir.branchName || '').toUpperCase());
                $('#lblAddress').text((loan.communityAddress || dir.address || '').toUpperCase());

                $('#lblLoanScheme').text((loan.loanSchemeName || '').toUpperCase());
                $('#lblOpeningDate').text(loan.openingDate || '--');
                $('#lblLoanAmount').text(parseFloat(loan.totalAmount || 0).toFixed(2));
                $('#lblRateOfInterest').text((loan.rateOfInterest || '0') + ' %');
                $('#lblEmi').text(parseFloat(loan.loanEmi || 0).toFixed(2));
                $('#lblTerm').text(loan.term || '--');

                const status = (data.status || 'ACTIVE').toUpperCase();
                $('#statusBadge').text(status);
                if (status === 'CLOSED') {
                    $('#statusBadge').removeClass('bg-success').addClass('bg-danger');
                } else {
                    $('#statusBadge').removeClass('bg-danger').addClass('bg-success');
                }

                // Financial Cards
                const totalDisbursed = parseFloat(data.totalDisbursed || 0);
                const totalPaid = parseFloat(data.totalPaid || 0);
                const amountDue = parseFloat(data.amountDue || 0);

                $('#cardTotalDisbursed').text(totalDisbursed.toFixed(2));
                $('#cardTotalPaid').text(totalPaid.toFixed(2));
                $('#cardAmountDue').text(amountDue.toFixed(2));

                // Table rows
                const $tbody = $('#statementTableBody');
                $tbody.empty();

                let rowsHtml = '';
                let index = 1;

                if (repayments.length > 0) {
                    repayments.forEach(function(r) {
                        rowsHtml += `<tr>
                            <td>${r.noOfInst || index}</td>
                            <td>${r.paymentDate || '--'}</td>
                            <td>${(r.paymentMode || 'CASH').toUpperCase()}</td>
                            <td>${(r.remarks || 'REGULAR EMI INSTALLMENT').toUpperCase()}</td>
                            <td>${(r.financialConsultantName || '--').toUpperCase()}</td>
                            <td class="text-end fw-bold text-success">${parseFloat(r.loanEmi || 0).toFixed(2)}</td>
                            <td class="text-end fw-bold">${parseFloat(r.amountDue || 0).toFixed(2)}</td>
                            <td><span class="badge bg-success">${(r.paymentStatus || 'PAID').toUpperCase()}</span></td>
                        </tr>`;
                        index++;
                    });
                }

                if (closures.length > 0) {
                    closures.forEach(function(c) {
                        rowsHtml += `<tr class="table-warning">
                            <td>CLOSURE</td>
                            <td>${c.paymentDate || '--'}</td>
                            <td>${(c.paidBy || 'CASH').toUpperCase()}</td>
                            <td>${(c.loanRemark || 'EARLY LOAN CLOSURE / SETTLEMENT').toUpperCase()}</td>
                            <td>${(c.agentName || '--').toUpperCase()}</td>
                            <td class="text-end fw-bold text-success">${parseFloat(c.totalOutstanding || 0).toFixed(2)}</td>
                            <td class="text-end fw-bold">0.00</td>
                            <td><span class="badge bg-danger">CLOSED</span></td>
                        </tr>`;
                    });
                }

                if (!rowsHtml) {
                    rowsHtml = '<tr><td colspan="8">NO TRANSACTIONS RECORDED YET</td></tr>';
                }

                $tbody.html(rowsHtml);
                $('#statementContainer').fadeIn(300);

            } else {
                alert('NO STATEMENT FOUND FOR THIS GROUP ID');
                $('#statementContainer').hide();
            }
        },
        error: function(xhr) {
            console.error('ERROR FETCHING STATEMENT', xhr);
            alert('FAILED TO FETCH STATEMENT OF ACCOUNT');
            $('#statementContainer').hide();
        }
    });
}

function printStatement() {
    const c = jlgStatementCompanyDetails || {};
    const companyName = (c.companyName || 'CO OPERATIVE SOCIETY LTD NAGPUR').trim().toUpperCase();
    const addr = (c.address || '').trim().toUpperCase();
    const city = (c.city || '').trim().toUpperCase();
    const state = (c.state || '').trim().toUpperCase();
    const pin = (c.pinCode || c.pincode || '').trim().toUpperCase();
    const fullAddress = [addr, city, state, pin].filter(Boolean).join(', ');

    const cin = c.cinNo ? ('CIN: ' + c.cinNo.trim().toUpperCase()) : '';
    const pan = c.pan ? ('PAN: ' + c.pan.trim().toUpperCase()) : '';
    const tan = c.tan ? ('TAN: ' + c.tan.trim().toUpperCase()) : '';
    const gstin = c.gstin ? ('GSTIN: ' + c.gstin.trim().toUpperCase()) : '';
    const regLine = [cin, pan, tan, gstin].filter(Boolean).join(' | ');

    const helpline = c.helplineNo ? ('HELPLINE: ' + c.helplineNo.trim().toUpperCase()) : '';
    const email = c.emailId ? ('EMAIL: ' + c.emailId.trim().toUpperCase()) : '';
    const contactLine = [helpline, email].filter(Boolean).join(' | ');

    const branch = $('#lblBranchName').text() || '';

    const printContents = document.getElementById('printableStatementArea').innerHTML;
    const printWindow = window.open('', '', 'height=850,width=1000');
    printWindow.document.write('<html><head><title>JOINT LIABILITY GROUP LOAN STATEMENT</title>');
    printWindow.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">');
    printWindow.document.write(`
        <style>
            body { padding: 30px; font-family: "Segoe UI", Arial, sans-serif; color: #111; }
            .table td, .table th { font-size: 11px; text-transform: uppercase; padding: 6px; }
            .badge { border: 1px solid #111; color: #111 !important; background: transparent !important; }
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
