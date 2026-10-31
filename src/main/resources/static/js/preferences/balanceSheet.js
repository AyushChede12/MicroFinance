let allTransactions = [];

$(document).ready(function() {
	loadBranchDropdown();
});

function loadBranchDropdown() {
	$.ajax({
		type: "GET",
		url: "api/preference/getAllBranchModule",
		success: function(response) {
			if (response && response.status === "OK" && Array.isArray(response.data)) {
				let $branch = $("#branchName");
				$branch.empty().append('<option value="">-- SELECT BRANCH --</option>');
				response.data.forEach(function(b) {
					if (b && b.branchName) {
						let name = b.branchName.toUpperCase();
						$branch.append('<option value="' + name + '">' + name + '</option>');
					}
				});
			}
		}
	});
}

$("#searchAllBranch").click(function() {
	$.ajax({
		type: "GET",
		url: "api/preference/fetchAllTransactions",
		success: function(response) {
			if (response && response.status === "FOUND") {
				allTransactions = response.data || [];
				renderTable(allTransactions);
			} else {
				renderTable([]);
			}
		},
		error: function() {
			renderTable([]);
		}
	});
});

$("#searchBranch").click(function() {
	let branchName = ($("#branchName").val() || "").trim().toUpperCase();
	if (branchName === "") {
		alert("PLEASE SELECT A BRANCH TO SEARCH.");
		return;
	}

	let filtered = allTransactions.filter(tx =>
		(tx.branchName || "").toUpperCase().includes(branchName)
	);
	renderTable(filtered);
});

function renderTable(data) {
	let tableBody = $(".datatable tbody");
	tableBody.empty();

	if (!data || data.length === 0) {
		tableBody.append(`<tr><td colspan="6" class="text-center">NO RECORDS FOUND</td></tr>`);
		return;
	}

	data.slice().reverse().forEach((item, index) => {
		let row = `<tr>
            <td>${index + 1}</td>
            <td>${(item.branchName || '').toUpperCase()}</td>
            <td>${(item.transactionDate || '').toUpperCase()}</td>
            <td>${(item.customerCode || '').toUpperCase()}</td>
            <td>${item.amount || ''}</td>
            <td>${(item.modeOfPayment || '').toUpperCase()}</td>
        </tr>`;
		tableBody.append(row);
	});
}