let jlgClosureCompanyDetails = null;

$(document).ready(function() {
    loadCompanyDetails();
    setTodayDate();
    populateGroupCodes();
    populateBranches();

    $('#paidBy').on('change', function() {
        if ($(this).val() === 'SAVINGS ACCOUNT') {
            $('#displaySavingsAccount').show();
        } else {
            $('#displaySavingsAccount').hide();
            $('#accountNo').val('');
        }
    });

    $('#groupCode').on('change', function() {
        const selectedCode = $(this).val();
        if (selectedCode) {
            loadGroupLoanDetails(selectedCode);
        } else {
            clearLoanDetails();
            $('#printNocBtn').hide();
        }
    });

    $('#loanClosureFee').on('input change', function() {
        updateNetPayable();
    });

    $('#resetBtn').on('click', function() {
        $('#closureForm')[0].reset();
        setTodayDate();
        $('#displaySavingsAccount').hide();
        $('#printNocBtn').hide();
    });

    $('#saveBtn').on('click', function(e) {
        e.preventDefault();
        submitLoanClosure();
    });

    $('#printNocBtn').on('click', function(e) {
        e.preventDefault();
        printNoc();
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
                jlgClosureCompanyDetails = comp;
            }
        },
        error: function(err) {
            console.warn('COULD NOT LOAD COMPANY DETAILS', err);
        }
    });
}

function setTodayDate() {
    const today = new Date().toISOString().split('T')[0];
    $('#paymentDate').val(today);
}

function populateGroupCodes() {
    $.ajax({
        url: 'api/joinliability/getApprovedGroupLoanIds',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            const $dropdown = $('#groupCode');
            $dropdown.empty();
            $dropdown.append('<option value="" disabled selected>SELECT GROUP ID</option>');

            let list = [];
            if (response && response.status === 'OK' && Array.isArray(response.data) && response.data.length > 0) {
                list = response.data;
            }

            if (list.length > 0) {
                list.forEach(function(code) {
                    $dropdown.append(`<option value="${code}">${code.toUpperCase()}</option>`);
                });
            } else {
                $.ajax({
                    url: 'api/joinliability/getAllGroupCodes',
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
            }
        },
        error: function() {
            $.ajax({
                url: 'api/joinliability/getAllGroupCodes',
                type: 'GET',
                dataType: 'json',
                success: function(res) {
                    const $dropdown = $('#groupCode');
                    $dropdown.empty();
                    $dropdown.append('<option value="" disabled selected>SELECT GROUP ID</option>');
                    if (res && res.status === 'OK' && Array.isArray(res.data)) {
                        res.data.forEach(function(code) {
                            $dropdown.append(`<option value="${code}">${code.toUpperCase()}</option>`);
                        });
                    }
                }
            });
        }
    });
}

function populateBranches() {
    $.ajax({
        url: 'api/preference/getAllBranchModule',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            const $branch = $('#paymentBranch');
            $branch.empty();
            $branch.append('<option value="" disabled selected>SELECT BRANCH</option>');

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

function loadGroupLoanDetails(groupCode) {
    $.ajax({
        url: `api/joinliability/getStatementByGroupId?groupID=${encodeURIComponent(groupCode)}`,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response && response.status === 'OK' && response.data) {
                const data = response.data;
                const loan = data.groupLoan || {};
                const dir = data.directory || {};

                $('#loanStartDate').val(loan.openingDate || '');
                $('#loanScheme').val((loan.loanSchemeName || '').toUpperCase());
                $('#interestType').val((loan.interestType || '').toUpperCase());
                $('#agentCode').val(loan.financialConsultantId || '');
                $('#agentName').val((loan.financialConsultantName || '').toUpperCase());
                $('#agentCodeAndName').val(`${loan.financialConsultantId || ''} - ${(loan.financialConsultantName || '').toUpperCase()}`);
                $('#loanTenure').val(loan.term || '');
                $('#monthlyInstallment').val(loan.loanEmi || '');
                const leaderName = ((dir.communityLeader || loan.communityLeader || loan.communityName || '')).toUpperCase();
                $('#nomineeDetails').val(leaderName);
                $('#contactNo').val(loan.contactNumber || dir.contactNo || '');
                $('#principalAmount').val(loan.totalAmount || '');
                $('#totalLoanPrincipal').val(loan.totalAmount || '');
                $('#loanBranch').val((loan.branchName || '').toUpperCase());
                $('#rateOfInterest').val(loan.rateOfInterest || '');

                const totalPrincipal = parseFloat(loan.totalAmount || 0);
                const emi = parseFloat(loan.loanEmi || 0);
                const term = parseFloat(loan.term || 0);
                let totalPayable = totalPrincipal;
                let calculatedInterest = 0;
                if (emi > 0 && term > 0) {
                    totalPayable = emi * term;
                    calculatedInterest = Math.max(0, totalPayable - totalPrincipal);
                }
                $('#interestAmount').val(calculatedInterest.toFixed(2));
                $('#totalPayableAmount').val(totalPayable.toFixed(2));

                const totalPaid = parseFloat(data.totalPaid || 0);
                const totalOutstanding = parseFloat(data.amountDue || 0);

                $('#settledPrincipal').val(totalPaid.toFixed(2));
                $('#outstandingPrincipal').val(totalOutstanding.toFixed(2));
                $('#totalAmountPaid').val(totalPaid.toFixed(2));
                $('#totalOutstanding').val(totalOutstanding.toFixed(2));
                $('#settledInterest').val('0.00');
                $('#interestPending').val('0.00');

                if (loan.branchName) {
                    $('#paymentBranch').val(loan.branchName);
                }

                updateNetPayable();
                bindNocData(groupCode, loan, dir);
                $('#printNocBtn').show();
            } else {
                alert('NO DETAILS FOUND FOR SELECTED GROUP ID');
                clearLoanDetails();
                $('#printNocBtn').hide();
            }
        },
        error: function(xhr) {
            console.error('ERROR LOADING STATEMENT DETAILS', xhr);
            alert('FAILED TO LOAD GROUP LOAN DETAILS');
            clearLoanDetails();
            $('#printNocBtn').hide();
        }
    });
}

function bindNocData(groupCode, loan, dir) {
    const c = jlgClosureCompanyDetails || {};
    const compName = (c.companyName || 'CO OPERATIVE SOCIETY LTD NAGPUR').trim().toUpperCase();
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

    $('#nocCompanyName').text(compName);
    $('#nocCompanyAddress').text(fullAddress || addr);
    $('#nocCompanyReg').text(regLine);
    $('#nocCompanyContact').text(contactLine);
    $('#nocBranch').text('BRANCH: ' + ($('#paymentBranch').val() || loan.branchName || 'HEAD OFFICE').toUpperCase());

    $('#nocRefNo').text('NOC-JLG-' + groupCode.toUpperCase());
    $('#nocDate').text($('#paymentDate').val() || new Date().toISOString().split('T')[0]);

    const leader = ((dir.communityLeader || loan.communityLeader || loan.communityName || 'BORROWER')).toUpperCase();
    const community = ((loan.communityName || dir.communityName || '')).toUpperCase();
    const contact = loan.contactNumber || dir.contactNo || '--';

    $('#nocBorrowerName').text(leader);
    $('#nocBorrowerName2').text(leader);
    $('#nocGroupName').text(community);
    $('#nocContact').text(contact);

    $('#nocGroupIdText').text(groupCode.toUpperCase());
    $('#nocSchemeText').text((loan.loanSchemeName || 'JOINT LIABILITY GROUP LOAN').toUpperCase());
    $('#nocStartDateText').text(loan.openingDate || '--');
    $('#nocPrincipalText').text(parseFloat(loan.totalAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 }));
    $('#nocClosedDateText').text($('#paymentDate').val() || new Date().toISOString().split('T')[0]);

    $('#nocCompanyBodyName').text(compName);
    $('#nocCompanyBodyName2').text(compName);
    $('#nocCompanyBodyName3').text(compName);
    $('#nocCompanyBodyName4').text(compName);
}

function updateNetPayable() {
    const outstanding = parseFloat($('#totalOutstanding').val()) || 0;
    const closureFee = parseFloat($('#loanClosureFee').val()) || 0;
    const net = outstanding + closureFee;
    $('#netClosurePayable').val(net.toFixed(2));
}

function clearLoanDetails() {
    $('#loanStartDate').val('');
    $('#loanScheme').val('');
    $('#interestType').val('');
    $('#agentCodeAndName').val('');
    $('#agentCode').val('');
    $('#agentName').val('');
    $('#loanTenure').val('');
    $('#monthlyInstallment').val('');
    $('#nomineeDetails').val('');
    $('#contactNo').val('');
    $('#principalAmount').val('');
    $('#totalLoanPrincipal').val('');
    $('#loanBranch').val('');
    $('#rateOfInterest').val('');
    $('#totalPayableAmount').val('');
    $('#settledInterest').val('');
    $('#interestPending').val('');
    $('#settledPrincipal').val('');
    $('#outstandingPrincipal').val('');
    $('#totalAmountPaid').val('');
    $('#totalOutstanding').val('');
    $('#netClosurePayable').val('');
    $('#loanRemark').val('');
}

function submitLoanClosure() {
    const groupCode = $('#groupCode').val();
    if (!groupCode) {
        alert('PLEASE SELECT A GROUP ID FIRST');
        return;
    }

    const paymentBranch = $('#paymentBranch').val();
    if (!paymentBranch) {
        alert('PLEASE SELECT PAYMENT BRANCH');
        return;
    }

    const paidBy = $('#paidBy').val();
    if (!paidBy) {
        alert('PLEASE SELECT PAYMENT MODE');
        return;
    }

    const accountNo = $('#accountNo').val() ? $('#accountNo').val().trim() : '';
    if (paidBy === 'SAVINGS ACCOUNT' && !accountNo) {
        alert('PLEASE ENTER SAVINGS ACCOUNT NO FOR DEBIT');
        return;
    }

    const loanRemark = $('#loanRemark').val() ? $('#loanRemark').val().trim().toUpperCase() : 'EARLY LOAN CLOSURE';

    if (!confirm('ARE YOU SURE YOU WANT TO CLOSE THIS JOINT LIABILITY LOAN EARLY?')) {
        return;
    }

    const payload = {
        groupCode: groupCode,
        loanStartDate: $('#loanStartDate').val(),
        loanScheme: $('#loanScheme').val(),
        interestType: $('#interestType').val(),
        agentCode: $('#agentCode').val(),
        agentName: $('#agentName').val(),
        loanTenure: $('#loanTenure').val(),
        monthlyInstallment: $('#monthlyInstallment').val(),
        nomineeDetails: $('#nomineeDetails').val(),
        interestAmount: $('#interestAmount').val(),
        contactNo: $('#contactNo').val(),
        principalAmount: $('#principalAmount').val(),
        totalLoanPrincipal: $('#totalLoanPrincipal').val(),
        loanBranch: $('#loanBranch').val(),
        rateOfInterest: $('#rateOfInterest').val(),
        totalPayableAmount: $('#totalPayableAmount').val(),
        settledInterest: $('#settledInterest').val() || '0.00',
        interestPending: $('#interestPending').val() || '0.00',
        settledPrincipal: $('#settledPrincipal').val() || '0.00',
        outstandingPrincipal: $('#outstandingPrincipal').val() || '0.00',
        totalAmountPaid: $('#totalAmountPaid').val() || '0.00',
        totalOutstanding: $('#totalOutstanding').val() || '0.00',
        loanRemark: loanRemark,
        paymentBranch: paymentBranch,
        paymentDate: $('#paymentDate').val(),
        paidBy: paidBy,
        accountNo: accountNo,
        loanClosureFee: $('#loanClosureFee').val() || '0.00',
        status: 'CLOSED'
    };

    $.ajax({
        url: 'api/joinliability/earlyClosure',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function(response) {
            if (response && response.status === 'OK') {
                alert(response.message ? response.message.toUpperCase() : 'JOINT LIABILITY LOAN CLOSED SUCCESSFULLY');
                $('#printNocBtn').show();
                if (confirm('WOULD YOU LIKE TO PRINT THE NO OBJECTION CERTIFICATE (NOC) NOW?')) {
                    printNoc();
                }
                populateGroupCodes();
            } else {
                alert(response.message ? response.message.toUpperCase() : 'FAILED TO CLOSE GROUP LOAN');
            }
        },
        error: function(xhr) {
            let msg = 'FAILED TO CLOSE GROUP LOAN';
            try {
                const res = JSON.parse(xhr.responseText);
                if (res && res.message) {
                    msg = res.message.toUpperCase();
                }
            } catch (e) {}
            alert(msg);
        }
    });
}

function printNoc() {
    const printContents = document.getElementById('printableNocArea').innerHTML;
    const printWindow = window.open('', '', 'height=850,width=950');
    printWindow.document.write('<html><head><title>NO OBJECTION CERTIFICATE (NOC)</title>');
    printWindow.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">');
    printWindow.document.write(`
        <style>
            body { padding: 30px; font-family: "Times New Roman", Times, serif; color: #111; line-height: 1.6; }
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
