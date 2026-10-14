// all data
let allSavingAccountFundTransfer = [];

$(document).ready(function() {
	// Load data on page load
	loadSavingAccountFundTransfer();

	// Filter button click
	$('#saveBtn').on('click', function(e) {
		e.preventDefault();
		filterSavingAccountFundTransfer();
	});

	// Approve button click
	$('#approvedBtn').on('click', function() {
		const selectedIds = $('.approval-checkbox:checked').map(function() {
			return $(this).data('id');
		}).get();

		if (selectedIds.length === 0) {
			alert("PLEASE SELECT AT LEAST ONE ROW TO APPROVE.");
			return;
		}

		// Approve each selected row
		selectedIds.forEach(function(id) {
			$.ajax({
				url: "api/requestapproval/approvesavingAccountFundTransfer",
				type: "POST",
				data: {
					id: id,
					isApproved: true
				},
				success: function(response) {
					if (response.status === "OK") {
						console.log("Approved:", id);
						// Optional: show success once, then reload
						location.reload();
					}
				},
				error: function(xhr) {
					alert("ERROR APPROVING ID " + id);
					console.error(xhr);
				}
			});
		});
	});
});

function loadSavingAccountFundTransfer() {
	$.ajax({
		url: "api/requestapproval/getUnapprovedsavingAccountFundTransfer",
		type: "GET",
		contentType: "application/json",
		success: function(response) {
			if (response.status === "OK" && Array.isArray(response.data)) {
				allSavingAccountFundTransfer = response.data;
				populateMemberCodeDropdown(allSavingAccountFundTransfer);
				renderTable(allSavingAccountFundTransfer);
			} else {
				alert("NO DATA FOUND.");
			}
		},
		error: function(xhr) {
			console.error("Error fetching data:", xhr);
			alert("FAILED TO LOAD DATA.");
		}
	});
}

function populateMemberCodeDropdown(data) {
	const dropdown = $('#branchName');
	dropdown.empty().append('<option value="">SELECT BRANCH</option>');

	const uniqueCodes = [...new Set(data.map(item => item.debitAccountBranch))];

	uniqueCodes.forEach(code => {
		if (code) {
			dropdown.append(`<option value="${code}">${code}</option>`);
		}
	});
}

function renderTable(data) {
	const tbody = $(".datatable tbody");
	tbody.empty();

	if (!data || data.length === 0) {
		tbody.append(`
			<tr>
				<td colspan="12" style="text-align:center; font-family: 'Poppins', sans-serif;">
					NO DATA FOUND
				</td>
			</tr>
		`);
		return;
	}

	data.forEach((item, index) => {
		const row = `
			<tr style="font-family: 'Poppins', sans-serif;">
				<td><input type="checkbox" class="approval-checkbox" data-id="${item.id}" ${item.isApproved ? 'checked' : ''} /></td>
				<td>${index + 1}</td>
				<td>${item.transferDate || '-'}</td>
				<td>${item.debitAccountNumber || '-'}</td>
				<td>${item.debitCustomerCode || '-'}</td>
				<td>${item.debitAccountBranch || '-'}</td>
				<td>${item.debitContactNumber || '-'}</td>
				<td>${item.creditAccountNumber || '-'}</td>
				<td>${item.creditCustomerCode || '-'}</td>
				<td>${item.creditAccountBranch || '-'}</td>


			</tr>
		`;
		tbody.append(row);
	});
}

//filter data
function filterSavingAccountFundTransfer() {
	const selectedCode = $('#branchName').val();
	const fromDateVal = $('#fromDate').val();
	const toDateVal = $('#toDate').val();


	const fromDate = fromDateVal ? new Date(fromDateVal) : null;
	const toDate = toDateVal ? new Date(toDateVal) : null;

	const filtered = allSavingAccountFundTransfer.filter(item => {
		const branchName = item.debitAccountBranch || '';
		const transferDate = item.transferDate ? new Date(item.transferDate) : null;

		const matchesCode = selectedCode ? branchName === selectedCode : true;
		const matchesFrom = fromDate && transferDate ? transferDate >= fromDate : true;
		const matchesTo = toDate && transferDate ? transferDate <= toDate : true;


		return matchesCode && matchesFrom && matchesTo;
	});

	renderTable(filtered);
}