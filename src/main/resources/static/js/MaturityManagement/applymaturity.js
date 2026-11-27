$(document).ready(function() {

	let allPolicies = [];

	// Load branches into dropdown
	function loadBranches() {
		$.ajax({
			url: "api/preference/getAllBranchModule",
			type: "GET",
			success: function(response) {
				if ((response.status === "OK" || response.status === "FOUND" || response.status == 200) && Array.isArray(response.data)) {
					const $branch = $('#branchName');
					const currentVal = $branch.val();
					$branch.empty().append('<option value="">-- SELECT BRANCH --</option>');
					response.data.forEach(function(branch) {
						if (branch && branch.branchName) {
							const bName = branch.branchName.toUpperCase().trim();
							$branch.append(`<option value="${bName}">${bName}</option>`);
						}
					});
					if (currentVal) {
						$branch.val(currentVal);
					}
				}
			},
			error: function() {
				console.warn("FAILED TO LOAD BRANCHES.");
			}
		});
	}

	// Render policy codes into dropdown based on selected branch (with safe fallback)
	function renderPolicyDropdown(selectedBranch) {
		const dropdown = $('#policyCode');
		const currentSelected = dropdown.val();
		dropdown.empty();
		dropdown.append('<option value="">-- SELECT POLICY CODE --</option>');

		if (!allPolicies || allPolicies.length === 0) {
			dropdown.append('<option value="">NO POLICIES FOUND</option>');
			return;
		}

		const cleanBranch = (selectedBranch || '').trim().toUpperCase();

		if (cleanBranch !== "") {
			// Find policies matching this branch (case-insensitive, trimming, substring)
			const branchMatches = allPolicies.filter(function(p) {
				if (!p.branchName) return false;
				const pb = p.branchName.trim().toUpperCase();
				return pb === cleanBranch || pb.includes(cleanBranch) || cleanBranch.includes(pb);
			});

			const otherPolicies = allPolicies.filter(function(p) {
				return !branchMatches.includes(p);
			});

			if (branchMatches.length > 0) {
				const $grp1 = $('<optgroup label="POLICIES IN ' + cleanBranch + '"></optgroup>');
				branchMatches.forEach(function(policy) {
					const text = policy.policyCode + ' - ' + (policy.customerName || '').toUpperCase();
					$grp1.append('<option value="' + policy.policyCode + '">' + text + '</option>');
				});
				dropdown.append($grp1);

				if (otherPolicies.length > 0) {
					const $grp2 = $('<optgroup label="OTHER POLICIES"></optgroup>');
					otherPolicies.forEach(function(policy) {
						const bInfo = policy.branchName ? ' (' + policy.branchName.toUpperCase() + ')' : '';
						const text = policy.policyCode + ' - ' + (policy.customerName || '').toUpperCase() + bInfo;
						$grp2.append('<option value="' + policy.policyCode + '">' + text + '</option>');
					});
					dropdown.append($grp2);
				}
			} else {
				// No direct branch match: list all policies so user is never blocked
				const $grpAll = $('<optgroup label="ALL AVAILABLE POLICIES"></optgroup>');
				allPolicies.forEach(function(policy) {
					const bInfo = policy.branchName ? ' (' + policy.branchName.toUpperCase() + ')' : '';
					const text = policy.policyCode + ' - ' + (policy.customerName || '').toUpperCase() + bInfo;
					$grpAll.append('<option value="' + policy.policyCode + '">' + text + '</option>');
				});
				dropdown.append($grpAll);
			}
		} else {
			// No branch filter -> list all policies directly
			allPolicies.forEach(function(policy) {
				const bInfo = policy.branchName ? ' (' + policy.branchName.toUpperCase() + ')' : '';
				const text = policy.policyCode + ' - ' + (policy.customerName || '').toUpperCase() + bInfo;
				dropdown.append('<option value="' + policy.policyCode + '">' + text + '</option>');
			});
		}

		if (currentSelected) {
			dropdown.val(currentSelected);
		}
	}

	// Fetch all investment policies
	function loadAllPolicies() {
		$.ajax({
			url: 'api/Policymangment/getaddinvestmentdetails',
			type: 'GET',
			success: function(response) {
				if ((response.status === "OK" || response.status === "FOUND" || response.status == 200 || response.status === "CREATED") && Array.isArray(response.data)) {
					// Deduplicate by policyCode
					const seen = new Set();
					allPolicies = [];
					response.data.forEach(function(item) {
						if (item && item.policyCode && !seen.has(item.policyCode)) {
							seen.add(item.policyCode);
							allPolicies.push(item);
						}
					});
				} else {
					allPolicies = [];
				}
				renderPolicyDropdown($('#branchName').val());
			},
			error: function() {
				console.warn("FAILED TO LOAD ALL INVESTMENT POLICIES.");
				allPolicies = [];
				renderPolicyDropdown($('#branchName').val());
			}
		});
	}

	// Initialize branches and all policies on page load
	loadBranches();
	loadAllPolicies();

	// When branch changes, re-filter the policy codes
	$('#branchName').on('change', function() {
		const branchName = $(this).val();
		renderPolicyDropdown(branchName);
	});

	// Function to fetch and bind single policy details
	function populatePolicyDetails(policyCode) {
		if (!policyCode || policyCode.trim() === "") {
			$('#customerName, #schemeMode, #schemeType, #policyAmount, #depositAmount, #maturityAmount, #maturityDate').val('');
			return;
		}

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
					$('#depositAmount').val(data.depositAmount || data.policyAmount || '');
					$('#maturityAmount').val(data.maturityAmount || '');
					$('#maturityDate').val(data.maturityDate || '');

					// Sync branch if not yet selected
					if (data.branchName) {
						const targetBranch = data.branchName.trim().toUpperCase();
						const $branch = $('#branchName');
						let optionExists = false;
						$branch.find('option').each(function() {
							if ($(this).val().toUpperCase() === targetBranch) {
								optionExists = true;
								return false;
							}
						});

						if (!optionExists && targetBranch) {
							$branch.append(`<option value="${targetBranch}">${targetBranch}</option>`);
						}

						if (!$branch.val() || $branch.val() === "") {
							$branch.val(targetBranch);
						}
					}
				} else {
					alert("NO DATA FOUND FOR THIS POLICY.");
				}
			},
			error: function() {
				alert("ERROR FETCHING POLICY DETAILS.");
			}
		});
	}

	// When policy code changes, auto-populate details
	$('#policyCode').on('change', function() {
		populatePolicyDetails($(this).val());
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
					renderPolicyDropdown($('#branchName').val());
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
		const pCode = $('#policyCode').val();
		if (!pCode) {
			alert("PLEASE SELECT A POLICY CODE FIRST.");
			$('#policyCode').focus();
			return;
		}
		populatePolicyDetails(pCode);
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
