//all unprove data

let allKYCData = [];

$(document).ready(function() {
	// Load all member data on page load
	loadCustomerKYCData();

	// Button click filter
	$('#saveBtn').on('click', function(e) {
		e.preventDefault(); // Prevent form submission
		filterKYCData();
	});
});
//

function loadCustomerKYCData() {
	$.ajax({	
		url: "api/requestapproval/unapprovedAddNewInvestment",
		type: "GET",
		contentType: "application/json",
		success: function(response) {
			if (response.status === "OK" && Array.isArray(response.data)) {
				allKYCData = response.data;
				//populateMemberCodeDropdown(allKYCData);
				renderTable(allKYCData); // Initially show all
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
	const uniqueCodes = [...new Set(data.map(item => item.branchName))];
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
        tbody.append(noDataRow);
        return;
    }

    data.forEach((item, index) => {

        // 🔹 Build customer full name using array
		const customerFullName =
		    item.customerName ||
		    [item.firstName, item.middleName, item.lastName]
		        .filter(Boolean)
		        .join(' ') ||
		    '-';


        const row = `
            <tr style="font-family: 'Poppins', sans-serif;">
                <td>
                    <input type="checkbox" class="approval-checkbox"
                        data-id="${item.id}" ${item.isApproved ? 'checked' : ''} />
                </td>
                <td>${index + 1}</td>
                <td>${item.policyCode || '-'}</td>
                <td>${item.policyStartDate || '-'}</td>
                <td>${customerFullName || '-'}</td>
                <td>${item.contactNo || '-'}</td>
                <td>${item.branchName || '-'}</td>
                <td>${item.suggestedNominee || '-'}</td>
                <td>${item.schemeType || '-'}</td>
                <td>${item.schemeTerm || '-'}</td>
            </tr>
        `;

        tbody.append(row);
    });
}


//approve data anjali

$(document).ready(function () {
    // Handle Approve button click
    $('#approvedBtn').on('click', function () {
        // Collect all checked checkboxes
        const selectedIds = [];

        $('.approval-checkbox:checked').each(function () {
            const id = $(this).data('id');
            selectedIds.push(id);
        });

        if (selectedIds.length === 0) {
            alert("Please select at least one row to approve.");
            return;
        }

        // Approve each selected investment
        selectedIds.forEach(function (id) {
            $.ajax({
                url: "api/requestapproval/approveInvestmentData",
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
function filterKYCData() {
	const selectedCode = $('#branchName').val();
	const fromDateVal = $('#fromDate').val();
	const toDateVal = $('#toDate').val();

	const fromDate = fromDateVal ? new Date(fromDateVal) : null;
	const toDate = toDateVal ? new Date(toDateVal) : null;

	const filtered = allKYCData.filter(item => {

		const branchName = item.branchName;
		const dob = item.dob ? new Date(item.dob) : null;

		const matchesCode = selectedCode ? branchName === selectedCode : true;
		const matchesFrom = fromDate && dob ? dob >= fromDate : true;
		const matchesTo = toDate && dob ? dob <= toDate : true;
		


		return matchesCode && matchesFrom && matchesTo;
	});

	renderTable(filtered);
}
