$(document).ready(function() {

	// Load branches into dropdown
	function loadBranches() {
		$.ajax({
			url: "api/preference/getAllBranchModule",
			type: "GET",
			success: function(response) {
				if ((response.status === "OK" || response.status === "FOUND" || response.status == 200) && Array.isArray(response.data)) {
					const $branch = $('#branchName');
					$branch.empty().append('<option value="">-- SELECT BRANCH --</option>');
					response.data.forEach(function(branch) {
						if (branch && branch.branchName) {
							const bName = branch.branchName.toUpperCase();
							$branch.append(`<option value="${bName}">${bName}</option>`);
						}
					});
				}
			},
			error: function() {
				console.warn("FAILED TO LOAD BRANCHES.");
			}
		});
	}

	loadBranches();

	// When branch changes, fetch policies for that branch
	$('#branchName').on('change', function() {
		let branchName = $(this).val();

		if (branchName !== "") {
			$.ajax({
				url: 'api/Policymangment/getinvestmentdetails?branchName=' + encodeURIComponent(branchName),
				type: 'GET',
				success: function(response) {
					var dropdown = $('#policyCode');
					dropdown.empty();
					dropdown.append('<option value="">-- SELECT POLICY CODE --</option>');

					if (response.data && response.data.length > 0) {
						$.each(response.data, function(index, policy) {
							dropdown.append('<option value="' + policy.policyCode + '">' + policy.policyCode + ' - ' + (policy.customerName || '').toUpperCase() + '</option>');
						});
					} else {
						dropdown.append('<option value="">NO POLICIES FOUND</option>');
					}
				},
				error: function() {
					console.warn("ERROR FETCHING POLICY NUMBERS.");
				}
			});
		} else {
			$('#policyCode').empty().append('<option value="">-- SELECT POLICY CODE --</option>');
		}
	});

	// When policy code changes, auto-populate details
	$('#policyCode').on('change', function() {
		let policyCode = $(this).val();

		if (policyCode !== "") {
			$.ajax({
				url: 'api/Policymangment/getPolicyByPolicyCode?policyCode=' + encodeURIComponent(policyCode),
				type: 'GET',
				success: function(response) {
					if (response.data) {
						let data = response.data;

						$('#customerName').val((data.customerName || '').toUpperCase());
						$('#schemeMode').val((data.schemeMode || '').toUpperCase());
						$('#schemeType').val((data.schemeType || '').toUpperCase());
						$('#policyAmount').val(data.policyAmount || '');
						$('#depositAmount').val(data.depositAmount || '');
						$('#maturityAmount').val(data.maturityAmount || '');
						$('#maturityDate').val(data.maturityDate || '');
					} else {
						alert("NO DATA FOUND FOR THIS POLICY.");
					}
				},
				error: function() {
					alert("ERROR FETCHING POLICY DETAILS.");
				}
			});
		} else {
			$('#customerName, #schemeMode, #schemeType, #policyAmount, #depositAmount, #maturityAmount, #maturityDate').val('');
		}
	});

	// Save Apply Maturity data
	$("#formid").submit(function(event) {
		event.preventDefault();

		var branchName = $("#branchName").val();
		var policyCode = $("#policyCode").val();
		var remark = $("#remark").val();

		if (!branchName) {
			$('#chkbranch').text('PLEASE SELECT BRANCH');
			return;
		} else {
			$('#chkbranch').text('');
		}

		if (!policyCode) {
			$('#chkpolicycode').text('PLEASE SELECT POLICY CODE');
			return;
		} else {
			$('#chkpolicycode').text('');
		}

		if (!remark) {
			$('#chkremark').text('PLEASE ENTER REMARK');
			return;
		} else {
			$('#chkremark').text('');
		}

		var data = {
			branchName: branchName.toUpperCase(),
			policyCode: policyCode,
			maturityDate: $("#maturityDate").val(),
			customerName: ($("#customerName").val() || '').toUpperCase(),
			schemeType: ($("#schemeType").val() || '').toUpperCase(),
			schemeMode: ($("#schemeMode").val() || '').toUpperCase(),
			policyAmount: $("#policyAmount").val(),
			depositAmount: $("#depositAmount").val(),
			maturityAmount: $("#maturityAmount").val(),
			remark: remark.toUpperCase()
		};

		$.ajax({
			url: "api/Maturitymanagement/saveApplymaturity",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			success: function(response) {
				if (response.status === "OK" || response.status === "CREATED") {
					alert("MATURITY APPLICATION SAVED SUCCESSFULLY.");
					$("#formid")[0].reset();
					if (typeof window.loadMaturityTableData === "function") {
						window.loadMaturityTableData(0, 5);
					}
				} else {
					alert("FAILED: " + (response.message || "COULD NOT SAVE").toUpperCase());
				}
			},
			error: function(xhr, status, error) {
				console.error("Error saving maturity application:", error);
				alert("SOMETHING WENT WRONG WHILE SAVING THE DATA.");
			}
		});
	});

	// View policy detail button
	$('#viewBtn').on('click', function(e) {
		e.preventDefault();
		if (typeof window.loadMaturityTableData === "function") {
			window.loadMaturityTableData(0, 5);
		}
	});

	$("#Add").click(function() {
		$('#chkbranch').text('');
		$('#chkpolicycode').text('');
		$('#chkremark').text('');
	});

});
