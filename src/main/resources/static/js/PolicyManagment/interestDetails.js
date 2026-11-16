$(document).ready(function() {

	function safeUpper(val) {
		if (val === null || val === undefined) {
			return "";
		}
		return String(val).toUpperCase();
	}

	function loadAllPolicies() {
		$.ajax({
			url: "api/Policymangment/getAllPolicyManagementData",
			type: "GET",
			contentType: "application/json",
			success: function(response) {
				if (response && response.status === "OK" && Array.isArray(response.data) && response.data.length > 0) {
					renderTable(response.data);
				} else {
					$("#interestTableBody").html(
						'<tr><td colspan="13" class="text-center font-weight-bold">NO POLICY INTEREST RECORDS FOUND</td></tr>'
					);
				}
			},
			error: function() {
				alert("FAILED TO LOAD POLICY INTEREST DETAILS.");
				$("#interestTableBody").html(
					'<tr><td colspan="13" class="text-center text-danger font-weight-bold">FAILED TO LOAD DATA</td></tr>'
				);
			}
		});
	}

	function populateDropdown() {
		$.ajax({
			url: "api/Policymangment/getAllPolicyManagementData",
			type: "GET",
			contentType: "application/json",
			success: function(response) {
				if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
					var $dropdown = $("#policyCode");
					$dropdown.empty();
					$dropdown.append('<option value="">SELECT POLICY CODE</option>');

					$.each(response.data, function(index, item) {
						var code = item.policyCode || "";
						var name = item.customerName || "";
						if (code) {
							$dropdown.append(
								$("<option>", {
									value: code,
									text: code + " - " + safeUpper(name)
								})
							);
						}
					});
				}
			},
			error: function() {
				alert("FAILED TO LOAD POLICY CODES.");
			}
		});
	}

	function renderTable(dataList) {
		var $tbody = $("#interestTableBody");
		$tbody.empty();

		if (!dataList || dataList.length === 0) {
			$tbody.html('<tr><td colspan="13" class="text-center font-weight-bold">NO POLICY INTEREST RECORDS FOUND</td></tr>');
			return;
		}

		$.each(dataList, function(index, item) {
			var statusText = (item.approved === true || item.approved === "true" || item.approved === 1) ? "APPROVED" : "PENDING";
			var badgeClass = statusText === "APPROVED" ? "badge bg-success text-white" : "badge bg-warning text-dark";

			var row = `
				<tr style="font-family: 'Poppins', sans-serif;">
					<td>${index + 1}</td>
					<td><strong>${item.policyCode || ''}</strong></td>
					<td>${safeUpper(item.customerName)}</td>
					<td>${safeUpper(item.branchName)}</td>
					<td>${safeUpper(item.schemeType)}</td>
					<td>${safeUpper(item.schemeName)}</td>
					<td>₹ ${item.policyAmount || '0.00'}</td>
					<td>${item.roi || '0.00'} %</td>
					<td>${safeUpper(item.schemeMode || '-')}</td>
					<td>₹ ${item.misinterest || item.misInterest || '0.00'}</td>
					<td>₹ ${item.maturityAmount || '0.00'}</td>
					<td>${item.maturityDate || '-'}</td>
					<td><span class="${badgeClass}">${statusText}</span></td>
				</tr>
			`;
			$tbody.append(row);
		});
	}

	// Initial load
	populateDropdown();
	loadAllPolicies();

	// Search button click
	$("#findBtn").click(function() {
		var selectedCode = $("#policyCode").val();

		if (!selectedCode) {
			alert("PLEASE SELECT A POLICY CODE.");
			return;
		}

		$.ajax({
			url: "api/Policymangment/getPolicyByPolicyCode",
			type: "GET",
			data: { policyCode: selectedCode },
			dataType: "json",
			success: function(response) {
				if (response && response.status === "OK" && response.data) {
					renderTable([response.data]);
				} else {
					alert("NO INTEREST DETAILS FOUND FOR THE SELECTED POLICY.");
					$("#interestTableBody").empty();
				}
			},
			error: function() {
				alert("ERROR WHILE FETCHING POLICY INTEREST DATA.");
			}
		});
	});

	// Show All button click
	$("#showAllBtn").click(function() {
		$("#policyCode").val("");
		loadAllPolicies();
	});

});

