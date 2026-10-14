$(document).ready(function() {
	// Load all policy codes on page load
	loadPolicyCodes();

	function loadPolicyCodes() {
		$.ajax({
			url: "api/requestapproval/getAllPolicyCodes",
			type: "GET",
			success: function(response) {
				if (response.status === "OK" && response.data && response.data.length > 0) {
					response.data.forEach(function(item) {
						// Assuming 'policyCode' is a field in partialMaturityPayment
						$('#policyCode').append(
							`<option value="${item.policyCode}">${item.policyCode}</option>`
						);
					});
				} else {
					alert("NO POLICY CODES FOUND.");
				}
			},
			error: function(xhr) {
				console.error("Error loading policy codes:", xhr.responseJSON?.message || "Unknown error");
			}
		});
	}
});

$(document).ready(function() {
	// On FIND button click
	$('#saveBtn').click(function(e) {
		e.preventDefault(); // Prevent form submission

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

					// Fill all fields on page
					$('#policyId').val(data.id);
					$('#clientName').val(data.customerName);
					$('#policyType').val(data.policyName);
					$('#policyCode').val(data.policyCode);
					$('#modeOfOperation').val(data.modeofPayment);
					$('#schemeTerm').val(data.duration);
					$('#policyDate').val(data.paymentDate);
					$('#payoffDate').val(data.maturityDate);
					$('#planAmount').val(data.policyAmount);
					$('#maturityAmount').val(data.maturityAmount);
					$('#InstPaid').val(data.amount);
					$('#totalDeposits').val(data.depositAmount);
					$('#reqUser').val(data.teamMemberName);
					$('#SysPayable').val(data.sysPayable);
					$('#deduction').val(data.deduction);
					$('#netPayable').val(data.netPayable);
					$('#applicationBranch').val(data.branchName);
					$('#ApproveDate').val(new Date().toISOString().split("T")[0]); // today's date
					$('#Branch').val(data.approveBranch);
					$('#ApproveComments').val(data.payComment);
					$('#ApproveStatus').val(data.approveStatus ? 'APPROVED' : 'PENDING');

					// Optional fields (add if you have them in your form)
					$('#rateOfInterest').val(''); // Add actual field if exists
					$('#fine').val('');           // Add actual field if exists
					$('#Adjustment').val('');     // Add actual field if exists
				} else {
					alert('NO DATA FOUND FOR SELECTED POLICY CODE.');
				}
			},
			error: function() {
				alert('SERVER ERROR: COULD NOT FETCH DATA.');
			}
		});
	});
});

$(document).ready(function() {
	$('#approvedBtn').click(function(e) {
		e.preventDefault();

		let id = $('#policyId').val();
		let approveStatus = true;

		if (!id) {
			alert("PLZ SELECT POLICY CODE");
			return;
		}

		$.ajax({
			url: 'api/requestapproval/approveMaturityApplication1',
			method: 'POST',
			data: {
				id: id,
				approveStatus: approveStatus
			},
			success: function(response) {
				if (response.status === "OK") {
					if (response.data.approveStatus === true) {
						alert("THIS MATURITY IS ALREADY APPROVED.");
						location.reload();
					} else {
						alert("MATURITY APPROVED SUCCESSFULLY!");
						location.reload();
					}
					console.log("Response:", response.data);
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