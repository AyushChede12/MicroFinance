let allData = [];

$(document).ready(function() {
	loadBranches();
	loadedData();

	$('#searchBtn').on('click', function(e) {
		e.preventDefault();
		filterDailyData();
	});
});

function loadBranches() {
	$.ajax({
		url: "api/preference/getAllBranchModule",
		type: "GET",
		success: function(response) {
			if ((response.status === "OK" || response.status === "FOUND" || response.status == 200) && Array.isArray(response.data)) {
				const $branch = $('#branchName');
				$branch.empty().append('<option value="">ALL BRANCHES</option>');
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

function loadedData() {
	$.ajax({
		url: "api/Maturitymanagement/getPartialmaturitydetails",
		type: "GET",
		success: function(response) {
			if ((response.status === "OK" || response.status === "FOUND") && Array.isArray(response.data)) {
				allData = response.data;
				renderTable(allData);
			} else {
				renderTable([]);
			}
		},
		error: function(xhr, status, error) {
			console.error("Error fetching partial maturity details:", error);
			renderTable([]);
		}
	});
}

function renderTable(data) {
	const tbody = $("#table tbody");
	tbody.empty();

	if (!data || data.length === 0) {
		const noDataRow = `
            <tr>
                <td colspan="9" style="text-align:center; font-family: 'Poppins', sans-serif;">
                    NO DATA FOUND
                </td>
            </tr>
        `;
		tbody.append(noDataRow);
		return;
	}

	data.forEach((item, index) => {
		const bName = item.approveBranch || item.branchName || "-";
		const row = `
            <tr style="font-family: 'Poppins', sans-serif;"> 
                <td>${index + 1}</td>
                <td>${(item.policyCode || "-").toUpperCase()}</td>
                <td>${bName.toUpperCase()}</td>
                <td>${item.closingDate || item.maturityDate || "-"}</td>
                <td>${(item.customerName || "-").toUpperCase()}</td>
                <td>${(item.planCode || "-").toUpperCase()}</td>
                <td>${item.depositAmount || "-"}</td>
                <td>${item.netPayable || "-"}</td>
                <td>${(item.comment || item.Comment || "-").toUpperCase()}</td>
            </tr>
        `;
		tbody.append(row);
	});
}

function filterDailyData() {
	const selectedBranch = $('#branchName').val();
	const fromDateVal = $('#fromDate').val();
	const toDateVal = $('#toDate').val();

	const filtered = allData.filter(item => {
		const bName = (item.approveBranch || item.branchName || "").toUpperCase();
		const cDate = item.closingDate ? item.closingDate.toString() : (item.maturityDate || "");

		const matchesBranch = selectedBranch ? bName === selectedBranch.toUpperCase() : true;
		const matchesFrom = fromDateVal ? cDate >= fromDateVal : true;
		const matchesTo = toDateVal ? cDate <= toDateVal : true;

		return matchesBranch && matchesFrom && matchesTo;
	});

	renderTable(filtered);
}
