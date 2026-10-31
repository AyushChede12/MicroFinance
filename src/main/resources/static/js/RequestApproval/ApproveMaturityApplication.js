$(document).ready(function() {
    loadPolicyCodes();

    function loadPolicyCodes() {
        $.ajax({
            url: "api/requestapproval/getAllPolicyCodes",
            type: "GET",
            success: function(response) {
                if (response.status === "OK" && response.data && response.data.length > 0) {
                    $('#policyCode').empty().append('<option value="">SELECT POLICY CODE</option>');
                    response.data.forEach(function(item) {
                        if (item.policyCode) {
                            $('#policyCode').append(
                                `<option value="${item.policyCode}">${item.policyCode.toUpperCase()}</option>`
                            );
                        }
                    });
                } else {
                    $('#policyCode').empty().append('<option value="">NO POLICY CODES FOUND</option>');
                }
            },
            error: function(xhr) {
                console.error("ERROR LOADING POLICY CODES:", xhr.responseJSON?.message || "Unknown error");
            }
        });
    }

    // On FIND button click
    $('#saveBtn, #findBtn').click(function(e) {
        e.preventDefault();

        const selectedPolicyCode = $('#policyCode').val();
        if (!selectedPolicyCode) {
            alert('PLEASE SELECT A POLICY CODE.');
            return;
        }

        $.ajax({
            url: 'api/requestapproval/getDetailsByPolicyCode',
            type: 'GET',
            data: { policyCode: selectedPolicyCode },
            success: function(response) {
                if (response && response.data) {
                    const data = response.data;

                    $('#policyId').val(data.id || '');
                    $('#clientName').val((data.customerName || '').toUpperCase());
                    $('#policyType').val((data.policyName || '').toUpperCase());
                    $('#modeOfOperation').val((data.modeofPayment || '').toUpperCase());
                    $('#schemeTerm').val((data.duration || '').toUpperCase());
                    $('#policyDate').val(data.paymentDate || '');
                    $('#payoffDate').val(data.maturityDate || '');
                    $('#planAmount').val(data.policyAmount || '');
                    $('#maturityAmount').val(data.maturityAmount || '');
                    $('#InstPaid').val(data.amount || '');
                    $('#totalDeposits').val(data.depositAmount || '');
                    $('#reqUser').val((data.teamMemberName || '').toUpperCase());
                    $('#SysPayable').val(data.sysPayable || '');
                    $('#deduction').val(data.deduction || '0.00');
                    $('#Adjustment').val(data.adjustment || '0.00');
                    $('#netPayable').val(data.netPayable || '');
                    $('#applicationBranch').val((data.branchName || '').toUpperCase());
                    $('#ApproveDate').val(new Date().toISOString().split("T")[0]);
                    $('#Branch').val((data.approveBranch || data.branchName || '').toUpperCase());
                    $('#ApproveComments').val((data.payComment || 'APPROVED').toUpperCase());
                    $('#ApproveStatus').val(data.approveStatus ? 'APPROVED' : 'PENDING');
                } else {
                    alert('NO DATA FOUND FOR SELECTED POLICY CODE.');
                }
            },
            error: function() {
                alert('SERVER ERROR: COULD NOT FETCH DATA.');
            }
        });
    });

    $('#approvedBtn').click(function(e) {
        e.preventDefault();

        let id = $('#policyId').val();
        if (!id) {
            alert("PLEASE SELECT A POLICY CODE FIRST.");
            return;
        }

        $.ajax({
            url: 'api/requestapproval/approveMaturityApplication1',
            method: 'POST',
            data: {
                id: id,
                approveStatus: true
            },
            success: function(response) {
                if (response.status === "OK") {
                    alert("MATURITY APPLICATION APPROVED SUCCESSFULLY!");
                    location.reload();
                } else {
                    alert("APPROVAL FAILED.");
                }
            },
            error: function(xhr) {
                alert("ERROR OCCURRED DURING APPROVAL.");
                console.error(xhr);
            }
        });
    });
});
