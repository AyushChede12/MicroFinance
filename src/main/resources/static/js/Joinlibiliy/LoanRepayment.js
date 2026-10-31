let jlgRepaymentCompanyDetails = null;

$(document).ready(function() {
    loadCompanyDetails();
    setTodayDate();
    populateDropdown();

    // Hide payment fields initially
    $('#displayCheque, #displaycheqdate, #displaydeposit, #displayRef').hide();

    $('#paymentMode').on('change', function() {
        const mode = ($(this).val() || '').toUpperCase();
        $('#displayCheque, #displaycheqdate, #displaydeposit, #displayRef').hide();

        if (mode === 'CHEQUE') {
            $('#displayCheque').show();
            $('#displaycheqdate').show();
            $('#displaydeposit').show();
        } else if (mode === 'ONLINE' || mode === 'NEFT') {
            $('#displaydeposit').show();
            $('#displayRef').show();
        }
    });

    $('#groupid').on('change', function() {
        const selectedCode = $(this).val();
        if (selectedCode) {
            loadGroupLoanDetails(selectedCode);
        } else {
            clearFields();
            $('#printReceiptBtn').hide();
        }
    });

    $('#saveBtn').on('click', function(e) {
        e.preventDefault();
        saveRepayment();
    });

    $('#printReceiptBtn').on('click', function(e) {
        e.preventDefault();
        printRepaymentReceipt();
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
                jlgRepaymentCompanyDetails = comp;
            }
        },
        error: function(err) {
            console.warn('COULD NOT LOAD COMPANY DETAILS', err);
        }
    });
}

function setTodayDate() {
    const today = new Date().toISOString().split('T')[0];
    $('#transactionDate').val(today);
    $('#paymentStatus').val('PAID');
}

function populateDropdown() {
    $.ajax({
        url: 'api/joinliability/getApprovedGroupLoanIds',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            const $dropdown = $('#groupid');
            $dropdown.empty();
            $dropdown.append('<option value="" disabled selected>SELECT LOAN ID</option>');

            let list = [];
            if (response && response.status === 'OK' && Array.isArray(response.data) && response.data.length > 0) {
                list = response.data;
            }

            if (list.length > 0) {
                list.forEach(function(id) {
                    $dropdown.append(`<option value="${id}">${id.toUpperCase()}</option>`);
                });
            } else {
                $.ajax({
                    url: 'api/joinliability/getAllGroupCodes',
                    type: 'GET',
                    dataType: 'json',
                    success: function(res) {
                        if (res && res.status === 'OK' && Array.isArray(res.data)) {
                            res.data.forEach(function(id) {
                                $dropdown.append(`<option value="${id}">${id.toUpperCase()}</option>`);
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
                    const $dropdown = $('#groupid');
                    $dropdown.empty();
                    $dropdown.append('<option value="" disabled selected>SELECT LOAN ID</option>');
                    if (res && res.status === 'OK' && Array.isArray(res.data)) {
                        res.data.forEach(function(id) {
                            $dropdown.append(`<option value="${id}">${id.toUpperCase()}</option>`);
                        });
                    }
                }
            });
        }
    });
}

function loadGroupLoanDetails(selectedCode) {
    $.ajax({
        url: `api/joinliability/fetchGroupLoanPayment?groupID=${encodeURIComponent(selectedCode)}`,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response && response.status === 'FOUND' && Array.isArray(response.data) && response.data.length > 0) {
                const loan = response.data[0];

                $('#loanDate').val(loan.openingDate || '');
                $('#communityName').val((loan.communityName || '').toUpperCase());
                $('#branchName').val((loan.branchName || '').toUpperCase());
                $('#loanSchemeName').val((loan.loanSchemeName || '').toUpperCase());
                $('#communityAddress').val((loan.communityAddress || '').toUpperCase());
                $('#contactNumber').val(loan.contactNumber || '');
                $('#loanpurpose').val((loan.loanPurpose || '').toUpperCase());
                $('#emiType').val((loan.emiType || '').toUpperCase());
                $('#term').val(loan.term || '');
                $('#rateOfInterest').val(loan.rateOfInterest || '');
                $('#interestType').val((loan.interestType || '').toUpperCase());
                $('#loanAmount').val(loan.loanAmount || '');
                $('#loanEmi').val(loan.loanEmi || '');

                const loanEmi = parseFloat(loan.loanEmi) || 0;
                const loanAmount = parseFloat(loan.loanAmount) || 0;
                const term = parseFloat(loan.term) || 0;
                let totalPayable = loanAmount;
                let totalInterest = 0;
                if (emiTypeCalc(loanEmi, term, loanAmount)) {
                    totalPayable = loanEmi * term;
                    totalInterest = Math.max(0, totalPayable - loanAmount);
                } else if (loanEmi > 0) {
                    totalPayable = loanAmount + loanEmi;
                    totalInterest = loanEmi;
                }
                $('#totalPayable').val(totalPayable.toFixed(2));
                $('#totalInterest').val(totalInterest.toFixed(2));

                $('#financialConsultantName').val((loan.financialConsultantName || '').toUpperCase());
                $('#financialConsultantId').val(loan.financialConsultantId || '');

                $.ajax({
                    url: `api/joinliability/getStatementByGroupId?groupID=${encodeURIComponent(selectedCode)}`,
                    type: 'GET',
                    dataType: 'json',
                    success: function(stmtRes) {
                        if (stmtRes && stmtRes.status === 'OK' && stmtRes.data) {
                            const data = stmtRes.data;
                            const pastRepayments = data.repayments || [];
                            const nextInstNo = pastRepayments.length + 1;
                            $('#installmentNo').val(nextInstNo);
                            $('#noOfInst').val(nextInstNo);

                            const amountDue = parseFloat(data.amountDue || 0);
                            $('#amountDue').val(amountDue > 0 ? amountDue.toFixed(2) : totalPayable.toFixed(2));

                            if (data.directory && data.directory.communityLeader) {
                                $('#communityLeader').val(data.directory.communityLeader.toUpperCase());
                            }
                        } else {
                            $('#installmentNo').val('1');
                            $('#noOfInst').val('1');
                            $('#amountDue').val(totalPayable.toFixed(2));
                        }
                    },
                    error: function() {
                        $('#installmentNo').val('1');
                        $('#noOfInst').val('1');
                        $('#amountDue').val(totalPayable.toFixed(2));
                    }
                });

            } else {
                alert('GROUP LOAN PAYMENT DETAILS NOT FOUND FOR THIS GROUP ID');
                clearFields();
            }
        },
        error: function(xhr, status, error) {
            console.error('ERROR FETCHING GROUP LOAN DATA:', error);
            alert('ERROR FETCHING GROUP LOAN DATA');
            clearFields();
        }
    });
}

function emiTypeCalc(emi, term, principal) {
    return emi > 0 && term > 0;
}

function clearFields() {
    $('#loanDate').val('');
    $('#communityName').val('');
    $('#communityLeader').val('');
    $('#branchName').val('');
    $('#loanSchemeName').val('');
    $('#communityAddress').val('');
    $('#contactNumber').val('');
    $('#loanpurpose').val('');
    $('#emiType').val('');
    $('#term').val('');
    $('#rateOfInterest').val('');
    $('#interestType').val('');
    $('#loanAmount').val('');
    $('#loanEmi').val('');
    $('#totalInterest').val('');
    $('#totalPayable').val('');
    $('#amountDue').val('');
    $('#installmentNo').val('');
    $('#noOfInst').val('');
    $('#financialConsultantId').val('');
    $('#financialConsultantName').val('');
    $('#paymentRemarks').val('');
    $('#accountNo').val('');
    $('#chequeNo').val('');
    $('#chequeDate').val('');
    $('#ref_UpiId').val('');
}

function bindReceiptData(repayment) {
    const c = jlgRepaymentCompanyDetails || {};
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

    $('#receiptCompName').text(compName);
    $('#receiptCompAddress').text(fullAddress || addr);
    $('#receiptCompReg').text(regLine);
    $('#receiptCompContact').text(contactLine);
    $('#receiptBranch').text('BRANCH: ' + (repayment.branchName || 'MAIN BRANCH').toUpperCase());

    const receiptNo = 'RCPT-JLG-' + repayment.groupID + '-' + (repayment.noOfInst || '1');
    $('#lblReceiptNo').text(receiptNo);
    $('#lblReceiptDate').text(repayment.paymentDate || new Date().toISOString().split('T')[0]);

    $('#lblRcptGroupId').text(repayment.groupID);
    $('#lblRcptCommunity').text(repayment.communityName || '--');
    $('#lblRcptLeader').text(repayment.communityLeader || '--');
    $('#lblRcptContact').text(repayment.contactNumber || '--');
    $('#lblRcptScheme').text(repayment.loanSchemeName || '--');
    $('#lblRcptBranch').text(repayment.branchName || '--');
    $('#lblRcptSanctioned').text(parseFloat(repayment.loanAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 }));
    $('#lblRcptTotalPayable').text(parseFloat(repayment.totalPayable || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 }));

    $('#lblRcptInstNo').text(repayment.noOfInst || '1');
    $('#lblRcptPayMode').text((repayment.paymentMode || 'CASH').toUpperCase());
    $('#lblRcptPaidAmount').text(parseFloat(repayment.loanEmi || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 }));
    $('#lblRcptRemainingDue').text(parseFloat(repayment.amountDue || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 }));

    $('#lblRcptRemarks').text((repayment.remarks || 'REGULAR EMI PAYMENT').toUpperCase());
    $('#lblRcptCollector').text((repayment.financialConsultantName ? `${repayment.financialConsultantId || ''} - ${repayment.financialConsultantName}` : 'BRANCH CASHIER').toUpperCase());
}

function saveRepayment() {
    const groupID = $('#groupid').val();
    if (!groupID) {
        alert('PLEASE SELECT A GROUP ID FIRST');
        return;
    }

    const paymentMode = $('#paymentMode').val();
    if (!paymentMode) {
        alert('PLEASE SELECT MODE OF PAYMENT');
        return;
    }

    const payload = {
        groupID: groupID,
        openingDate: $('#loanDate').val(),
        communityName: ($('#communityName').val() || '').toUpperCase(),
        communityLeader: ($('#communityLeader').val() || '').toUpperCase(),
        branchName: ($('#branchName').val() || '').toUpperCase(),
        loanSchemeName: ($('#loanSchemeName').val() || '').toUpperCase(),
        communityAddress: ($('#communityAddress').val() || '').toUpperCase(),
        contactNumber: $('#contactNumber').val(),
        emiType: ($('#emiType').val() || '').toUpperCase(),
        term: $('#term').val(),
        rateOfInterest: $('#rateOfInterest').val(),
        interestType: ($('#interestType').val() || '').toUpperCase(),
        loanAmount: $('#loanAmount').val(),
        loanEmi: $('#loanEmi').val(),
        totalInterest: $('#totalInterest').val(),
        totalPayable: $('#totalPayable').val(),
        amountDue: $('#amountDue').val(),
        noOfInst: $('#installmentNo').val(),
        remarks: ($('#paymentRemarks').val() || 'EMI PAYMENT').toUpperCase(),
        paymentDate: $('#transactionDate').val(),
        paymentStatus: ($('#paymentStatus').val() || 'PAID').toUpperCase(),
        paymentMode: paymentMode.toUpperCase(),
        chequeNo: $('#chequeNo').val(),
        chequeDate: $('#chequeDate').val(),
        accountNo: $('#accountNo').val(),
        ref_UpiId: $('#ref_UpiId').val(),
        charges: $('#charges').val(),
        financialConsultantId: $('#financialConsultantId').val(),
        financialConsultantName: ($('#financialConsultantName').val() || '').toUpperCase()
    };

    $.ajax({
        url: 'api/joinliability/saveLoanRepayment',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function(response) {
            if (response && (response.status === 'CREATED' || response.status === 'OK')) {
                alert(response.message ? response.message.toUpperCase() : 'LOAN REPAYMENT SAVED SUCCESSFULLY');
                bindReceiptData(payload);
                $('#printReceiptBtn').show();
                if (confirm('WOULD YOU LIKE TO PRINT THE REPAYMENT RECEIPT NOW?')) {
                    printRepaymentReceipt();
                }
                populateDropdown();
            } else {
                alert(response.message ? response.message.toUpperCase() : 'FAILED TO SAVE LOAN REPAYMENT');
            }
        },
        error: function(xhr) {
            let msg = 'FAILED TO SAVE LOAN REPAYMENT';
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

function printRepaymentReceipt() {
    const printContents = document.getElementById('printableReceiptArea').innerHTML;
    const printWindow = window.open('', '', 'height=800,width=900');
    printWindow.document.write('<html><head><title>JOINT LIABILITY GROUP LOAN REPAYMENT RECEIPT</title>');
    printWindow.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">');
    printWindow.document.write(`
        <style>
            body { padding: 30px; font-family: "Segoe UI", Arial, sans-serif; color: #111; }
            .table td, .table th { font-size: 11px; text-transform: uppercase; padding: 6px; }
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
