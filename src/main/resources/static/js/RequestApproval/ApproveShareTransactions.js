//all unprove data

let allTransferShareData = [];

$(document).ready(function() {
	// Load all member data on page load
	loadTransferShareData();

	// Button click filter
	$('#saveBtn').on('click', function(e) {
		e.preventDefault(); // Prevent form submission
		filterTransferShareData();
	});
});
//

function loadTransferShareData() {
	$.ajax({
		url: "api/requestapproval/getUnapprovedTransferShare",
		type: "GET",
		contentType: "application/json",
		success: function(response) {
			if (response.status === "OK" && Array.isArray(response.data)) {
				allTransferShareData = response.data;
				//populateMemberCodeDropdown(allKYCData);
				renderTable(allTransferShareData); // Initially show all
			} else {
				alert("No member data found.");
			}
		},
		error: function(xhr, status, error) {
			console.error("Error fetching data:", error);
			alert("Failed to load data.");
		}
	});
}

function populateMemberCodeDropdown(data) {
	const dropdown = $('#branchName');
	dropdown.empty().append('<option value="">Select Branch</option>');
	const uniqueCodes = [...new Set(data.map(item => item.branch))];
	uniqueCodes.forEach(code => {
		dropdown.append(`<option value="${code}">${code}</option>`);
	});
}

function renderTable(data) {
	const tbody = $(".datatable tbody");
	tbody.empty();

	if (!data || data.length === 0) {
		const noDataRow = `
            <tr>
                <td colspan="12" style="text-align:center; font-family: 'Poppins', sans-serif;">
                    No data found
                </td>
            </tr>
        `;
		tbody.append(noDataRow); 0
		return; // Exit the function early
	}

	data.forEach((item, index) => {
		const row = `
            <tr style="font-family: 'Poppins', sans-serif;">
                <td>
                    <input type="checkbox" class="approval-checkbox"
                        data-id="${item.id}" ${item.isApproved ? 'checked' : ''} />
                </td>   
				<td>${index + 1}</td>
				                  
				                   <td>${item.customerName || '-'}</td>
				                   <td>${item.branch || '-'}</td>
								   <td>${item.startDate || '-'}</td>
								   <td>${item.shareIssuedBy || '-'}</td>
								   <td>${item.noOfShare || '-'}</td>
								   <td>${item.dateOfTransfer || '-'}</td>
								   <td>${item.modeOfPayment || '-'}</td>
								  
								   
								   
            </tr>
        `;
		tbody.append(row);
	});
}


//approve data anjali

$(document).ready(function() {
	// Handle Approve button click
	$('#approvedBtn').on('click', function() {
		// Collect all checked checkboxes
		const selectedIds = [];

		$('.approval-checkbox:checked').each(function() {
			const id = $(this).data('id');
			selectedIds.push(id);
		});

		if (selectedIds.length === 0) {
			alert("Please select at least one row to approve.");
			return;
		}

		// Approve each selected investment
		selectedIds.forEach(function(id) {
			$.ajax({
				url: "api/requestapproval/approveShareTransaction",
				type: "POST",
				data: {
					id: id,
					isApproved: true // Sends 1 to the DB
				},
				success: function(response) {
					if (response.status === "OK") {
						alert("Approved Successfully!");
						location.reload();
					}
				},
				error: function(xhr) {
					alert("Error approving ID " + id);
					console.error(xhr);
				}
			});
		});
	});

	// Optional: reload after approval

});

//filter Data
function filterTransferShareData() {
	const selectedBranch = $('#branchName').val();
	const fromDateVal = $('#fromDate').val();
	const toDateVal = $('#toDate').val();


	const fromDate = fromDateVal ? new Date(fromDateVal) : null;
	const toDate = toDateVal ? new Date(toDateVal) : null;

	const filtered = allTransferShareData.filter(item => {
		const itemBranch = item.branch;
		const transferDate = item.dateOfTransfer ? new Date(item.dateOfTransfer) : null;

		const matchesBranch = selectedBranch ? itemBranch === selectedBranch : true;
		const matchesFrom = fromDate && transferDate ? transferDate >= fromDate : true;
		const matchesTo = toDate && transferDate ? transferDate <= toDate : true;

		return matchesBranch && matchesFrom && matchesTo;
	});

	renderTable(filtered);
}
